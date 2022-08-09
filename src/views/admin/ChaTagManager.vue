<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchTagPage"></SearchItem>
            <el-form-item>
                <el-button type="success" :icon="Plus" circle @click="openSaveDialog"></el-button>
            </el-form-item>
        </el-form>

        <el-dialog
                v-model="dialogVisible"
                :title="dialogTitles[dialogStatus]"
                width="30%"
                custom-class="addDialog"
                destroy-on-close
        >
            <el-form
                    label-width="100px"
                    :rules="rules"
                    :model="newTag"
                    ref="dialogForm"
            >
                <el-form-item label="名称" prop="tgname">
                    <el-input v-model="newTag.tgname"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="tid" class="text-start">
                    <el-select class="m-2" size="large" v-model="newTag.tid">
                        <el-option
                                v-for="r in types"
                                :label="r.label"
                                :value="r.value"
                                :key="r.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="tagSubmit">Confirm</el-button>
              </span>
            </template>
        </el-dialog>

    </el-row>

    <el-row>
        <el-table :data="tagsData" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="tgid" label="ID" sortable/>
            <el-table-column prop="tgname" label="名称" />
            <el-table-column prop="tname" label="类型" />
            <el-table-column prop="chaNum" label="题目总数" />
            <el-table-column prop="learnNum" label="课程总数" />
            <el-table-column
                    label="操作"
                    align="center"
                    width="230"
                    class-name="small-padding fixed-width"
            >
                <template #default="{row}">
                    <el-button type="success" size="mini" @click="openUpdateDialog(row)">
                        Edit
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="removeTagSubmit(row)"
                    >
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>

    <el-row class="mt-3">
        <el-pagination
                background
                v-model:currentPage="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        >
        </el-pagination>
    </el-row>
</template>

<script>
    import {Plus} from '@element-plus/icons-vue'
    import {ElMessage, ElMessageBox} from "element-plus";
    import {getAllChaTagByPageForAdmin, saveChaTag, updateChaTag, removeChaTag, searchTagPage} from "@/api/chaTag";
    import {getAllType} from "@/api/chaType";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "ChaTagManager",
        components: {SearchItem},
        data() {
            return {
                Plus,
                dialogVisible: false,
                dialogTitles: {
                    save: '添加标签',
                    update: '修改标签'
                },
                dialogStatus: 'save',
                pageSize: 10,
                total: 100,
                currentPage: 1,
                tagsData: [],
                newTag: {
                    tgname: '',
                    tid: 1
                },
                types: [],
                rules: {
                    tgname: [
                        {
                            required: true,
                            message: '名称不能为空',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 20,
                            message: '长度需要在1-20之间',
                            trigger: 'blur',
                        },
                    ]
                },
                options: [
                    {
                        value: 'tgname',
                        label: '名称'
                    },
                    {
                        value: 'tname',
                        label: '类型'
                    },
                ],
                loading: false,
                key: "",
                value: ""
            }
        },
        methods: {
            searchTagPage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchTagPage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.tagsData = res.data.data.list
                    }
                    this.loading = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loading = false
                })
            },
            openSaveDialog() {
                this.flushTag()
                this.dialogStatus = 'save'
                this.dialogVisible = true
            },
            getChaTagPage() {
                this.loading = true
                getAllChaTagByPageForAdmin(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.tagsData = res.data.data.list
                    }
                    this.loading = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loading = false
                })
            },
            getAllTypeSubmit() {
                this.loading = true
                getAllType().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        for (let item in res.data.data) {
                            this.types.push({
                                label: res.data.data[item].tname,
                                value: res.data.data[item].tid
                            })
                        }
                    }
                }).finally(() => {
                    this.loading = false
                })
            },
            flushTag() {
                this.newTag = {
                    tgname: '',
                    tid: 1,
                }
            },
            tagSubmit() {
                this.$refs.dialogForm.validate((vRes) => {
                    if (vRes) {
                        this.loading = true
                        if (this.dialogStatus === 'save') {
                            saveChaTag(this.newTag).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                    this.getChaTagPage()
                                    this.flushTag()
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                    this.flushTag()
                                    this.loading = false
                                }
                            }).catch((error) => {
                                ElMessage({
                                    message: error,
                                    type: 'error',
                                })
                                this.flushTag()
                                this.loading = false
                            })
                        } else if (this.dialogStatus === 'update') {
                            updateChaTag(this.newTag).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                    this.getChaTagPage()
                                    this.flushTag()
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                    this.flushTag()
                                    this.loading = false
                                }
                            }).catch(() => { this.loading = false})
                        }
                        this.dialogVisible = false
                    }
                })
            },
            removeTagSubmit(tag) {
                ElMessageBox.confirm(
                    '确定要删除该标签吗？',
                    'Warning',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                    }
                ).then(() => {
                    this.loading = true
                    removeChaTag(tag).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                            })
                            this.getChaTagPage()
                        } else {
                            ElMessage({
                                message: res.data.msg,
                                type: 'warning',
                            })
                            this.loading = false
                        }
                    }).catch((error) => {
                        this.loading = false
                        console.log(error)
                    })
                })
            },
            openUpdateDialog(tag) {
                this.dialogStatus = 'update'
                this.dialogVisible = true
                this.newTag = tag
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                if (this.value && this.key) {
                    this.searchTagPage(this.key, this.value)
                } else {
                    this.getChaTagPage()
                }
                
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchTagPage(this.key, this.value)
                } else {
                    this.getChaTagPage()
                }
            }
        },
        mounted() {
            this.getChaTagPage()
            this.getAllTypeSubmit()
        }

    }
</script>

<style scoped>

</style>