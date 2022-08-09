<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchUncheckWriteupPage"></SearchItem>
        </el-form>
    </el-row>

    <el-dialog v-model="dialogVisible" :title="dialogTitles[dialogStatus]" width="30%" custom-class="addDialog"
        destroy-on-close>
        <el-form label-width="100px" :rules="rules" :model="checkInfo" ref="dialogForm">
            <el-form-item label="分值" label-width="50px" prop="score">
                <el-input v-model.number="checkInfo.score"></el-input>
            </el-form-item>
            <el-form-item label="评价" label-width="50px" prop="remark">
                <el-input v-model="checkInfo.comment" :rows="2" type="textarea" placeholder="Please input" />
            </el-form-item>


        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submit">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <el-row>
        <el-table :data="wps" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="wid" label="ID" sortable />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="uname" label="作者" />
            <el-table-column prop="creTime" label="发表时间" />
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template #default="{row}">
                    <el-button type="warning" size="mini" @click="viewWP(row)">
                        查看
                    </el-button>
                    <el-button type="success" size="mini" @click="openPassWP(row)">
                        通过
                    </el-button>
                    <el-button size="mini" type="danger" @click="openRejectWP(row)">
                        驳回
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>

    <el-row class="mt-3">
        <el-pagination background v-model:currentPage="currentPage" :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
    </el-row>
</template>

<script>
    import {getUnCheckWriteupByPageForAdmin, passWriteup, rejectWriteup, searchUncheckWriteupPage} from "@/api/writeup";
    import {ElMessage} from "element-plus";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "WriteupCheck",
        components: {SearchItem},
        data() {
            return {
                pageSize: 10,
                total: 100,
                currentPage: 1,
                wps: [],
                checkInfo: {
                    wid: null,
                    score: null,
                    comment: ''
                },
                rules: {
                    score: [
                        {
                            required: true,
                            message: '分值不能为空',
                            trigger: 'blur',
                        },
                        {
                            type: 'number',
                            message: '分值必须是数字类型',
                            trigger: 'blur',
                        },
                        {
                            validator: this.checkScore,
                            trigger: 'blur',
                        }
                    ],
                },
                dialogVisible: false,
                dialogTitles: {
                    pass: '通过',
                    reject: '驳回'
                },
                dialogStatus: 'pass',
                options: [
                    {
                        value: 'wid',
                        label: 'ID'
                    },
                    {
                        value: 'uname',
                        label: '作者'
                    },
                    {
                        value: 'title',
                        label: '标题'
                    },
                    {
                        value: 'creTime',
                        label: '发表时间'
                    },
                ],
                loading: false,
                key: "",
                value: ""
            }
        },
        methods: {
            searchUncheckWriteupPage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchUncheckWriteupPage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.wps = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false})
            },
            viewWP(wpInfo) {
                this.$router.push({
                    name: 'writeupView',
                    params: {
                        wid: wpInfo.wid,
                    },
                    query: {
                        type: 'check'
                    }
                })
            },
            getUnCheckWriteupByPageForAdmin() {
                this.loading = true
                getUnCheckWriteupByPageForAdmin(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.wps = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false })
            },
            openPassWP(wpInfo) {
                this.checkInfo = {}
                this.dialogStatus = 'pass'
                this.dialogVisible = true
                this.checkInfo.wid = wpInfo.wid
            },
            openRejectWP(wpInfo) {
                this.checkInfo = {}
                this.dialogStatus = 'reject'
                this.dialogVisible = true
                this.checkInfo.wid = wpInfo.wid
            },
            checkScore(rule, value, callback) {
                if (value < 0 || value > 100) {
                    callback(new Error('分值必须在0-100之间'))
                } else {
                    callback()
                }
            },
            submit() {
                this.$refs.dialogForm.validate((vRes) => {
                    if (vRes) {
                        this.loading = true
                        if (this.dialogStatus === 'pass') {
                            passWriteup(this.checkInfo.wid, this.checkInfo.score, this.checkInfo.comment).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                }
                                this.getUnCheckWriteupByPageForAdmin()
                            }).catch((error) => {
                                ElMessage({
                                    message: error,
                                    type: 'error',
                                })
                                this.loading = false
                            })
                        } else if (this.dialogStatus === 'reject') {
                            rejectWriteup(this.checkInfo.wid, this.checkInfo.score, this.checkInfo.comment).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                }
                                this.getUnCheckWriteupByPageForAdmin()
                            }).catch((error) => {
                                ElMessage({
                                    message: error,
                                    type: 'error',
                                })
                                this.loading = false
                            })
                        }
                        this.dialogVisible = false
                    }
                })

            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                if (this.value && this.key) {
                    this.searchUncheckWriteupPage(this.key, this.value)
                } else {
                    this.getUnCheckWriteupByPageForAdmin()
                }
                
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchUncheckWriteupPage(this.key, this.value)
                } else {
                    this.getUnCheckWriteupByPageForAdmin()
                }
            }

        },
        mounted() {
            this.getUnCheckWriteupByPageForAdmin()
        }
    }
</script>

<style scoped>

</style>