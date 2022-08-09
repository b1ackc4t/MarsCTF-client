<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchNoticePage"></SearchItem>
            <el-form-item>
                <router-link to="/admin/notice/add">
                    <el-button type="success" :icon="Plus" circle></el-button>
                </router-link>
            </el-form-item>
        </el-form>
    </el-row>

    <el-row>
        <el-table :data="notices" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="nid" label="ID" sortable />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="uname" label="作者" />
            <el-table-column prop="createTime" label="发表时间" />
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template #default="{row}">
                    <el-button type="success" size="mini" @click="editNotice(row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="removeNotice(row)">
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
    import {Plus} from '@element-plus/icons-vue'
    import {getNoticePageForAdmin, removeNotice, searchNoticePage} from "@/api/notice";
    import {ElMessage, ElMessageBox} from "element-plus";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "NoticeManager",
        components: {SearchItem},
        data() {
            return {
                pageSize: 10,
                total: 100,
                currentPage: 1,
                notices: [],
                Plus,
                options: [
                    {
                        value: 'nid',
                        label: 'ID'
                    },
                    {
                        value: 'title',
                        label: '标题'
                    },
                    {
                        value: 'createTime',
                        label: '发表时间'
                    },
                    {
                        value: 'uname',
                        label: '作者'
                    },
                ],
                loading: false,
                key: "",
                value: ""
            }
        },
        methods: {
            searchNoticePage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchNoticePage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.notices = res.data.data.list
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false })
            },
            getNoticePageForAdmin() {
                this.loading = true
                getNoticePageForAdmin(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.notices = res.data.data.list
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false })
            },
            editNotice(notice) {
                this.$router.push({
                    name: 'editNotice',
                    params: { id: notice.nid }
                })
            },
            removeNotice(notice) {
                ElMessageBox.confirm(
                    '确定要删除该公告吗？',
                    '危险',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                    }
                ).then(() => {
                    this.loading = true
                    removeNotice(notice).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                            })
                            this.getNoticePageForAdmin()
                        } else {
                            ElMessage({
                                message: res.data.msg,
                                type: 'warning',
                            })
                            this.loading = false
                        }
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
                    this.searchNoticePage(this.key, this.value)
                } else {
                    this.getNoticePageForAdmin()
                }

            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchNoticePage(this.key, this.value)
                } else {
                    this.getNoticePageForAdmin()
                }
            }

        },
        mounted() {
            this.getNoticePageForAdmin()
        }
    }
</script>

<style scoped>

</style>