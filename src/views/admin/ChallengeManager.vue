<template>
    <div>
        <el-row>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Query</el-button>
                </el-form-item>
                <el-form-item>
                    <router-link to="/admin/challenge/add">
                        <el-button type="success" :icon="Plus" circle></el-button>
                    </router-link>

                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-table :data="challengesData" style="width: 100%" stripe>
                <el-table-column prop="cid" label="ID" sortable/>
                <el-table-column prop="cname" label="名称" />
                <el-table-column prop="tname" label="类型" />
                <el-table-column label="是否公开">
                    <template #default="{row}">
                        <el-tag
                                :type="row.exposed?'success':'danger'"
                        >{{row.exposed}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="230"
                        class-name="small-padding fixed-width"
                >
                    <template #default="{row}">
                        <el-button type="success" size="mini" @click="editChallengeSubmit(row)">
                            Edit
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="removeChallengeSubmit(row)"
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
    </div>
</template>

<script>
    import {Plus} from '@element-plus/icons-vue'
    import {getAllChallengeByPageForAdmin, removeChallenge} from "@/api/challenge";
    import {ElMessage, ElMessageBox} from "element-plus";

    export default {
        name: "ChallengeManger",
        data() {
            return {
                Plus,
                pageSize: 10,
                total: 100,
                currentPage: 1,
                challengesData: [],

            }
        },
        methods: {
            getChallengePage() {
                getAllChallengeByPageForAdmin(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.challengesData = res.data.data.list


                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            editChallengeSubmit(challenge) {
                this.$router.push({name: 'editChallengeView', params: { id: challenge.cid }})
            },
            removeChallengeSubmit(challenge) {
                ElMessageBox.confirm(
                    '确定要删除该题吗？（此操作还会删除此题目所有wp，请确保安全再操作）',
                    '危险',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                    }
                ).then(() => {
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
                        }
                    }).catch((error) => {
                        console.log(error)
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                    })
                })
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                this.getChallengePage()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.getChallengePage()
            }
        },
        mounted() {
            this.getChallengePage()
        }
    }
</script>

<style scoped>

</style>