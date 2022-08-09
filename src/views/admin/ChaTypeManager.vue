<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchTypePage"></SearchItem>
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
                    :model="newType"
                    ref="dialogForm"
            >
                <el-form-item label="名称" prop="tgname">
                    <el-input v-model="newType.tname"></el-input>
                </el-form-item>

            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="typeSubmit">Confirm</el-button>
              </span>
            </template>
        </el-dialog>

    </el-row>

    <el-row>
        <el-table :data="typesData" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="tid" label="ID" sortable/>
            <el-table-column prop="tname" label="名称" />
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
                            @click="removeTypeSubmit(row)"
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
    import {getAllTypeByPageForAdmin, saveType, updateType, removeType, searchTypePage} from "@/api/chaType";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "ChaTypeManager",
        components: {SearchItem},
        data() {
            return {
                Plus,
                dialogVisible: false,
                dialogTitles: {
                    save: '添加类别',
                    update: '修改类别'
                },
                dialogStatus: 'save',
                pageSize: 10,
                total: 100,
                currentPage: 1,
                typesData: [],
                newType: {
                    tname: 'other'
                },
                types: [],
                rules: {
                    tname: [
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
            searchTypePage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchTypePage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.typesData = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => {
                    this.loading = false
                })
            },
            openSaveDialog() {
                this.flushType()
                this.dialogStatus = 'save'
                this.dialogVisible = true
            },
            getChaTypePage() {
                this.loading = true
                getAllTypeByPageForAdmin(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.typesData = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false})
            },
            flushType() {
                this.newType = {
                    tname: ''
                }
            },
            typeSubmit() {
                this.$refs.dialogForm.validate((vRes) => {
                    if (vRes) {
                        this.loading = true
                        if (this.dialogStatus === 'save') {
                            saveType(this.newType).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                    this.getChaTypePage()
                                    this.flushType()
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                    this.flushType()
                                    this.loading = false
                                }
                            }).catch((error) => {
                                ElMessage({
                                    message: error,
                                    type: 'error',
                                })
                                this.flushType()
                                this.loading = false
                            })
                        } else if (this.dialogStatus === 'update') {
                            updateType(this.newType).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                    this.getChaTypePage()
                                    this.flushType()
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                    this.flushType()
                                    this.loading = false
                                }
                            }).catch(() => { this.loading = false})
                        }
                        this.dialogVisible = false
                    }
                })
            },
            removeTypeSubmit(type) {
                ElMessageBox.confirm(
                    '确定要删除该类别吗？(此操作会删除该类别的所有题目、标签，包括题目的wp，请确保安全再操作)',
                    '危险',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                    }
                ).then(() => {
                    this.loading = true
                    removeType(type).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                            })
                            this.getChaTypePage()
                        } else {
                            ElMessage({
                                message: res.data.msg,
                                type: 'warning',
                            })
                            this.loading = false
                        }
                    }).catch((error) => {
                        console.log(error)
                        this.loading = false
                    })
                })
            },
            openUpdateDialog(type) {
                this.dialogStatus = 'update'
                this.dialogVisible = true
                this.newType = type
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                if (this.value && this.key) {
                    this.searchTypePage(this.key, this.value)
                } else {
                    this.getChaTypePage()
                }
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchTypePage(this.key, this.value)
                } else {
                    this.getChaTypePage()
                }
            }
        },
        mounted() {
            this.getChaTypePage()
        }

    }
</script>

<style scoped>

</style>