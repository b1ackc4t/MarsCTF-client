<template>
    <div>
        <el-row>
            <el-form :inline="true" class="demo-form-inline">
                <SearchItem :options="options" @searchHandle="searchChallengePage"></SearchItem>
                <el-form-item>
                    <router-link to="/admin/challenge/add">
                        <el-button type="success" :icon="Plus" circle></el-button>
                    </router-link>

                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-table :data="challengesData" style="width: 100%" stripe v-loading="loading">
                <el-table-column prop="cid" label="ID" sortable />
                <el-table-column prop="cname" label="名称" />
                <el-table-column prop="tname" label="类型" />
                <el-table-column label="是否公开">
                    <template #default="{row}">
                        <el-tag :type="row.exposed?'success':'danger'">{{row.exposed}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="提示">
                    <template #default="{row}">
                        <el-tag :type="getStatusStyle(row)">{{getStatusText(row)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                    <template #default="{row}">
                        <el-button type="success" size="mini" @click="editChallengeSubmit(row)">
                            Edit
                        </el-button>
                        <el-button size="mini" type="danger" @click="removeChallengeSubmit(row)">
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
    </div>
</template>

<script>
    import {Plus} from '@element-plus/icons-vue'
    import {getAllChallengeByPageForAdmin, removeChallenge, searchChallengePage} from "@/api/challenge";
    import {ElMessage, ElMessageBox} from "element-plus";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "ChallengeManger",
        components: {SearchItem},
        data() {
            return {
                Plus,
                pageSize: 10,
                total: 100,
                currentPage: 1,
                challengesData: [],
                options: [
                    {
                        value: "cid",
                        label: "ID",
                    },
                    {
                        value: 'cname',
                        label: '名称'
                    },
                    {
                        value: 'tname',
                        label: '类型'
                    },
                    {
                        value: 'uname',
                        label: '出题者'
                    }
                ],
                loading: false,
                key: "",
                value: ""
            }
        },
        methods: {
            searchChallengePage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchChallengePage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.challengesData = res.data.data.list
                    }
                    this.loading = false
                }).catch((error) => {
                    this.loading = false
                    console.log(error)
                })
            },
            getChallengePage() {
                this.loading = true
                getAllChallengeByPageForAdmin(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.challengesData = res.data.data.list


                    }
                    this.loading = false
                }).catch((error) => {
                    this.loading = false
                    console.log(error)
                })
            },
            editChallengeSubmit(challenge) {
                this.$router.push({name: 'editChallengeView', params: { id: challenge.cid }})
            },
            removeChallengeSubmit(challenge) {
                ElMessageBox.confirm(
                    '确定要删除该题吗？（此操作还会删除此题目所有wp以及learning中引用的该题目，请确保安全再操作）',
                    '危险',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                    }
                ).then(() => {
                    this.loading = true
                    removeChallenge(challenge).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                            })
                            this.getChallengePage()
                            // this.usersData.splice(this.usersData.findIndex((item) => item.uid === user.uid), 1)
                        } else {
                            ElMessage({
                                message: res.data.msg,
                                type: 'warning',
                            })
                            this.loading = false
                        }
                    }).catch((error) => {
                        console.log(error)
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
                    this.searchChallengePage(this.key, this.value)
                } else {
                    this.getChallengePage()
                }
                
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchChallengePage(this.key, this.value)
                } else {
                    this.getChallengePage()
                }
            },
            getStatusStyle(row) {
                if (row.isDynamic) {
                    if (row.downloadOk === 1) {
                        return "success"
                    } else if (row.downloadOk === 0) {
                        return "warning"
                    } else {
                        return "danger"
                    }
                } else {
                    return "info"
                }
            },
            getStatusText(row) {
                if (row.isDynamic) {
                    if (row.downloadOk === 1) {
                        return "镜像已部署"
                    } else if (row.downloadOk === 0) {
                        return "镜像下载中"
                    } else {
                        return "镜像不存在"
                    }
                } else {
                    return "无"
                }
            }
        },
        mounted() {
            this.getChallengePage()
        }
    }
</script>

<style scoped>

</style>