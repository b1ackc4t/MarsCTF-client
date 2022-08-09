<template>
    <el-form v-loading="loading" ref="formRef" :model="notice" label-width="100px">
        <el-row class="mb-3">
            <el-input v-model="notice.title" minlength="2" maxlength="50" placeholder="请输入公告标题" show-word-limit
                type="text">
            </el-input>
        </el-row>
        <el-row class="mb-3 text-start edit-padding">
            <MDEditor v-model="notice.text" :upload-image-func="uploadImageForNotice"></MDEditor>
        </el-row>


        <el-row class="mb-3">
            <el-button type="primary" round @click="submitNotice">提交</el-button>
        </el-row>

    </el-form>
</template>

<script>
    import MDEditor from "@/components/smalltool/MDEditor";
    import {ElMessage} from "element-plus";
    import {getNoticeByIdForAdmin} from "@/api/notice";
    import {uploadImageForNotice} from "@/api/file";

    export default {
        name: "NoticeAdmin",
        props: {
            operaterFunc: Function,
            nid: Number
        },
        components: {MDEditor},
        data() {
            return {
                notice: {},
                uploadImageForNotice,
                loading: false
            }
        },
        methods: {
            submitNotice() {
                this.loading = true
                this.operaterFunc(this.notice).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        ElMessage({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.$router.go(-1)
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
            }
        },
        mounted() {
            if (this.nid != null) {
                this.loading = true
                getNoticeByIdForAdmin(this.nid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.notice = res.data.data;
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
            }
        }
    }
</script>

<style scoped>
    .edit-padding >>> .github-markdown-body {
        padding: 16px 32px 32px !important;
    }
</style>