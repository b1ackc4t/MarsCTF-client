<template>
    <div class="card mb-4 text-start">
        <div class="card-header wp-header" >
            <div class="wp-title" @click="enterWP">
                <h5 class="text-black">
                    {{wpInfo.title}}
                    <el-tag
                            :type="statusClass"
                    >
                        {{ statusMsg }}
                    </el-tag>
                </h5>
            </div>
            <div>
                <a href="javascript:" @click="updateWP">编辑</a>&nbsp;
                <a href="javascript:" @click="removeWP">删除</a>
            </div>
        </div>
        <div class="wp-body" @click="enterWP">
            <div>
                {{wpInfo.descr}}
            </div>
        </div>
        <div class="wp-footer">
            <span>
                <span class="me-1">{{getFormatTimeForArticle(wpInfo.creTime)}}</span>
                <span class="badge bg-gradient-warning me-1">{{wpInfo.tname}}</span>
                <span class="badge bg-gradient-secondary me-1">{{wpInfo.cname}}</span>
                <span class="badge bg-gradient-info me-1" v-for="tag in tags" :key="tag">{{tag}}</span>
            </span>
            <span>
                <span class="badge me-1" :class="{'bg-gradient-success': wpInfo.score>=60, 'bg-gradient-danger': wpInfo.score<60}">{{wpInfo.score}}</span>
                <span class="ms-1">{{wpInfo.uname}}</span>
            </span>

        </div>
    </div>
</template>

<script>
    import {getFormatTimeForArticle} from "@/utils/time";
    import {ElMessage, ElMessageBox} from "element-plus";
    import {removeWriteupForUser} from "@/api/writeup";

    var sep = ' '
    export default {
        name: "MySingleWP",
        props: {
            wpInfo: Object
        },
        emits: {
            updateData: null
        },
        data() {
            return {
                tags: [],
                statusMsg: '',
                statusClass: ''
            }
        },
        methods: {
            getFormatTimeForArticle(time) {
                return getFormatTimeForArticle(time)
            },
            enterWP() {
                this.$router.push({
                    name: 'myViewWP',
                    params: {
                        wid: this.wpInfo.wid
                    }
                })
            },
            removeWP() {
                ElMessageBox.confirm(
                    '确定要删除该Writeup吗？',
                    'Warning',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                    }
                ).then(() => {
                    removeWriteupForUser(this.wpInfo).then((res) => {
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
                        this.$emit("updateInfo")
                    }).catch((error) => {
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                    })
                })
            },
            updateWP() {
                this.$router.push({
                    name: 'updateWP',
                    params: {
                        wid: this.wpInfo.wid
                    }
                })
            }
        },
        mounted() {
            if (this.wpInfo.wpTags != null) {
                this.tags = this.wpInfo.wpTags.split(sep)
            }
            if (this.wpInfo.done) {
                if (this.wpInfo.status) {
                    this.statusClass = 'success'
                    this.statusMsg = '已通过'
                } else {
                    this.statusClass = 'danger'
                    this.statusMsg = '已驳回'
                }
            } else {
                this.statusClass = 'warning'
                this.statusMsg = '未审核'
            }

        },

    }
</script>

<style scoped>
    .wp-header {
        padding-top: 1rem;
        padding-bottom: 0rem;
        display: flex;
        justify-content: space-between;
    }
    .wp-title {
        cursor: pointer;
    }
    .wp-body {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-bottom: 0.2rem;
        cursor: pointer;
    }
    .wp-footer {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-bottom: 1rem;
        color: rgba(77, 83, 83, 0.6);
        display: flex;
        justify-content: space-between;
        /*align-items: center;*/
    }
</style>