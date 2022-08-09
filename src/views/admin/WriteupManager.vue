<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchWriteupPage"></SearchItem>
        </el-form>
    </el-row>

    <el-row>
        <el-table :data="wps" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="wid" label="ID" sortable />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="uname" label="作者" />
            <el-table-column prop="creTime" label="发表时间" />
            <el-table-column label="审核状态">
                <template #default="{row}">
                    <el-tag :type="wpStatus(row)">{{wpStatusText(row)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="分数">
                <template #default="{row}">
                    <el-tag v-if="row.done" :type="row.status?'success':'danger'">{{row.score}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template #default="{row}">
                    <el-button type="warning" size="mini" @click="viewWP(row)">
                        查看
                    </el-button>
                    <el-button v-if="row.done" type="success" size="mini" @click="reCheckForAdmin(row)">
                        重审
                    </el-button>
                    <el-button size="mini" type="danger" @click="removeWriteupForAdmin(row)">
                        删除
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
    import {getWriteupByPageForAdmin, removeWriteupForAdmin, reCheckForAdmin, searchWriteupPage} from "@/api/writeup";
    import {ElMessage, ElMessageBox} from "element-plus";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "WriteupManager",
        components: {SearchItem},
        data() {
            return {
                pageSize: 10,
                total: 100,
                currentPage: 1,
                wps: [],
                options: [
                    {
                        value: 'wid',
                        label: 'ID'
                    },
                    {
                        value: 'title',
                        label: '标题'
                    },
                    {
                        value: 'uname',
                        label: '作者'
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
            searchWriteupPage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchWriteupPage(key, value, this.pageSize, this.currentPage).then((res) => {
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
            getWriteupByPageForAdmin() {
                this.loading = true
                getWriteupByPageForAdmin(this.pageSize, this.currentPage).then((res) => {
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
            removeWriteupForAdmin(writeup) {
                ElMessageBox.confirm(
                    '确定要删除该Writeup吗？',
                    'Warning',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                    }
                ).then(() => {
                    this.loading = true
                    removeWriteupForAdmin(writeup).then((res) => {
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
                        this.getWriteupByPageForAdmin()
                    }).catch((error) => {
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                        this.loading = false
                    })
                })

            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                if (this.value && this.key) {
                    this.searchWriteupPage(this.key, this.value)
                } else {
                    this.getWriteupByPageForAdmin()
                }
                
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchWriteupPage(this.key, this.value)
                } else {
                    this.getWriteupByPageForAdmin()
                }
            },
            wpStatus(wp) {
                if (wp.done) {
                    if (wp.status) {
                        return "success"
                    } else {
                        return "danger"
                    }
                } else {
                    return "warning"
                }
            },
            wpStatusText(wp) {
                if (wp.done) {
                    if (wp.status) {
                        return "通过"
                    } else {
                        return "驳回"
                    }
                } else {
                    return "未审核"
                }
            },
            reCheckForAdmin(writeup) {
                this.loading = true
                reCheckForAdmin(writeup.wid, writeup.title).then((res) => {
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
                    this.getWriteupByPageForAdmin()
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loading = false
                })
            },
            viewWP(wpInfo) {
                this.$router.push({
                    name: 'writeupView',
                    params: {
                        wid: wpInfo.wid,
                    },
                    query: {
                        type: 'manager'
                    }
                })
            },
        },
        mounted() {
            this.getWriteupByPageForAdmin()
        }
    }
</script>

<style scoped>

</style>