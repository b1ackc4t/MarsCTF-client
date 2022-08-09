<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchContainerPage"></SearchItem>
        </el-form>

    </el-row>

    <el-row>
        <el-table :data="containersData" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="no" label="No" sortable />
            <el-table-column prop="uname" label="用户名" />
            <el-table-column prop="cname" label="题目" />
            <el-table-column prop="dstPort" label="端口" />
            <el-table-column prop="startTime" label="开启时间" />
            <el-table-column prop="endTime" label="结束时间" />
            <el-table-column label="动态FLAG">
                <template #default="{row}">
                    <span v-if="row.flag != null">{{row.flag}}</span>
                    <el-tag v-else type="info">静态flag</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template #default="{row}">
                    <el-button type="success" size="mini" @click="openAddTime(row)">
                        延时
                    </el-button>
                    <el-button size="mini" type="danger" @click="openDestory(row)">
                        销毁
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
    import {getContainerPageForAdmin, addTimeForAdmin, destroyContainerForAdmin, searchContainerPage} from "@/api/docker";
    import {ElMessage, ElMessageBox} from "element-plus";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "ContainerManager",
        components: {SearchItem},
        data() {
            return {
                pageSize: 10,
                total: 100,
                currentPage: 1,
                containersData: [],
                options: [
                    {
                        value: 'uname',
                        label: '用户名'
                    },
                    {
                        value: 'cname',
                        label: '题目'
                    },
                    {
                        value: 'dstPort',
                        label: '端口'
                    },
                    {
                        value: 'startTime',
                        label: '开启时间'
                    },
                    {
                        value: 'endTime',
                        label: '结束时间'
                    },
                    {
                        value: 'flag',
                        label: 'FLAG'
                    },
                ],
                loading: false,
                key: "",
                value: ""
            }
        },
        methods: {
            searchContainerPage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchContainerPage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.containersData = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false })
            },
            getContainerPageForAdmin() {
                this.loading = true
                getContainerPageForAdmin(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.containersData = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                }).finally(() => { this.loading = false })
            },
            openAddTime(dockerContainer) {
                ElMessageBox.prompt('请输入您要添加的时长（单位：秒）', 'Tip', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    inputPattern:
                        /\d?/,
                    inputErrorMessage: 'Invalid Time',
                }).then(({ value }) => {
                    this.loading = true
                    addTimeForAdmin(dockerContainer.uid, dockerContainer.cid, value).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                            })
                            this.getContainerPageForAdmin()
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
            openDestory(dockerContainer) {
                ElMessageBox.confirm(
                    '确定要删除该容器吗？',
                    '危险',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                    }
                ).then(() => {
                    this.loading = true
                    destroyContainerForAdmin(dockerContainer.uid, dockerContainer.cid).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                            })
                            this.getContainerPageForAdmin()
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
                    this.searchContainerPage(this.key, this.value)
                } else {
                    this.getContainerPageForAdmin()
                }
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchContainerPage(this.key, this.value)
                } else {
                    this.getContainerPageForAdmin()
                }
            }
        },
        mounted() {
            this.getContainerPageForAdmin()
        }
    }
</script>

<style scoped>

</style>