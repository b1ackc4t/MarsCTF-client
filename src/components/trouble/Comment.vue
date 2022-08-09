<template>
    <div v-loading="loading">
        <div class="card text-start">
            <div class="card-header">
                <div class="row">
                    <h5>{{user.uname}}</h5>
                    <div class="input-group input-group-lg input-group-outline">
                        <!--                                        <label class="form-label">评论</label>-->
                        <textarea class="form-control" v-model="text"></textarea>
                        <button class="btn btn-primary mb-0" @click="saveComment">commit</button>
                    </div>
                </div>
            </div>

            <div v-for="comment in comments" :key="comment">
                <hr class="bg-dark horizontal my-0 border-3">
                <div class="card-body">
                    <el-row>
                        <el-col :span="3" class="avatar">
                            <el-avatar :size="50" :src="circleUrl" />
                        </el-col>
                        <el-col :span="21">
                            <div class="com-header">
                                <router-link :to="{ name: 'profile', params: { uid: comment.uid }}">
                                    <h6>{{comment.uname}}</h6>
                                </router-link>
                                <span style="color: rgba(77, 83, 83, 0.6);">{{comment.createTime}}</span>

                            </div>
                            <div style="white-space: pre">{{comment.text}}</div>
                            <div v-if="user != null">
                                <div class="comment-foot"
                                    v-if="user.uid === comment.uid || user.role === ROLES.ROLE_ADMIN"><a
                                        href="javascript:" @click="removeComment(comment)">删除</a></div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-row class="page" justify="center">
                <el-pagination background v-model:currentPage="currentPage" :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize" layout="prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </el-row>

        </div>
    </div>
</template>

<script>
    import userhead from '@/assets/img/userhead.png'
    import {ElMessage, ElMessageBox} from "element-plus";
    import { ROLES } from '../../utils/config';

    export default {
        name: "Comment",
        props: {
            cid: Number,
            wid: Number,
            lid: Number,
            getFunc: Function,
            saveFunc: Function,
            removeFunc: Function
        },
        data() {
            return {
                circleUrl: userhead,
                pageSize: 10,
                total: 100,
                currentPage: 1,
                comments: [],
                text: '',
                user: {},
                ROLES,
                loading: false
            }
        },
        methods: {
            getCommentByPage() {
                this.loading = true
                let id
                if (this.cid != null) {
                    id = this.cid
                } else if (this.wid != null) {
                    id = this.wid
                } else if (this.lid != null) {
                    id = this.lid
                }
                this.getFunc(id, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.comments = res.data.data.list
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                    this.$emit("load2")
                }).catch((error) => {
                    console.log(error)
                    this.$emit("load2")
                }).finally(() => { this.loading = false })
            },
            saveComment() {
                this.loading = true
                let obj
                if (this.cid != null) {
                    obj = {text: this.text, cid: this.cid}
                } else if (this.wid != null) {
                    obj = {text: this.text, wid: this.wid}
                } else if (this.lid != null) {
                    obj = {text: this.text, lid: this.lid}
                }
                this.saveFunc(obj).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        ElMessage({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.getCommentByPage()
                        this.text = ''
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
            },
            removeComment(comment) {
                let id
                if (comment.ccid != null) {
                    id = comment.ccid
                } else if (comment.wcid != null) {
                    id = comment.wcid
                } else if (comment.lcid != null) {
                    id = comment.lcid
                }
                ElMessageBox.confirm(
                    '确定要删除该回复吗？',
                    '危险',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                    }
                ).then(() => {
                    this.loading = true
                    this.removeFunc(id).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                            })
                            this.getCommentByPage()
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
            getMe() {
                this.user = this.$store.state.userStore.user
                this.$emit("load3")
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                this.getCommentByPage()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.getCommentByPage()
            }
        },
        mounted() {
            this.getCommentByPage()
            this.getMe()

        }
    }
</script>

<style scoped>
    .avatar {
        flex: 0 0 0;
        margin-right: 15px;
    }
    .com-header {
        display: flex;
        justify-content: space-between;
    }
    .page {
        padding: 0px 10px 15px 10px;
    }
    .comment-foot {
        display: flex;
        justify-content: flex-end;
    }
</style>