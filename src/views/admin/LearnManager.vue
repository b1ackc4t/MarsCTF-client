<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchLearnPage"></SearchItem>
            <el-form-item>
                <router-link :to="{name: 'addLearningView'}">
                    <el-button type="success" :icon="Plus" circle></el-button>
                </router-link>
            </el-form-item>
        </el-form>
    </el-row>

    <el-row>
        <el-table :data="learnsData" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="lid" label="ID" sortable />
            <el-table-column prop="title" label="名称" />
            <el-table-column prop="tname" label="类别" />
            <el-table-column prop="uname" label="作者" />
            <el-table-column prop="creTime" label="发表时间" />
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template #default="{row}">
                    <el-button type="success" size="mini" @click="enterEdit(row)">
                        Edit
                    </el-button>
                    <el-button size="mini" type="danger" @click="removeSubmit(row)">
                        Delete
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
    import {Plus} from "@element-plus/icons-vue";
    import {getLearningByPageForAdmin, removeLearning, searchLearnPage} from "@/api/learning";
    import {ElMessage, ElMessageBox} from "element-plus";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "LearnManager",
        components: {SearchItem},
        data() {
            return {
                Plus,
                pageSize: 10,
                total: 100,
                currentPage: 1,
                learnsData: [],
                options: [
                    {
                        value: 'lid',
                        label: 'ID'
                    },
                    {
                        value: 'uname',
                        label: '作者'
                    },
                    {
                        value: 'title',
                        label: '名称'
                    },
                    {
                        value: 'tname',
                        label: '类别'
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
            searchLearnPage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchLearnPage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.learnsData = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false })
            },
            getLearningByPageForAdmin() {
                this.loading = true
                getLearningByPageForAdmin(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.learnsData = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false })
            },
            removeSubmit(learning) {
                ElMessageBox.confirm(
                    '确定要删除该学习关卡吗？',
                    '危险',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                    }
                ).then(() => {
                    this.loading = true
                    removeLearning(learning).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                            })
                            this.getLearningByPageForAdmin()
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
            enterEdit(learning) {
                this.$router.push({name: 'editLearningView', params: {lid: learning.lid}})
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                if (this.value && this.key) {
                    this.searchLearnPage(this.key, this.value)
                } else {
                    this.getLearningByPageForAdmin()
                }

            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchLearnPage(this.key, this.value)
                } else {
                    this.getLearningByPageForAdmin()
                }
            }
        },
        mounted() {
            this.getLearningByPageForAdmin()
        }
    }
</script>

<style scoped>

</style>