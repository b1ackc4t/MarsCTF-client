<template>
    <div class="pt-4">
        <BodyCard class="mb-3">
            <el-row class="status">
                <span class="me-1">{{getFormatTimeForArticle(notice.createTime)}}</span>
                <span class="ms-1">{{notice.uname}}</span>
            </el-row>
            <el-row>
                <h2>
                    {{notice.title}}
                </h2>
            </el-row>
        </BodyCard>
        <BodyCard class="mb-3">
            <div class="text-start">
                <v-md-editor
                        v-model="notice.text"
                        mode="preview"
                >
                </v-md-editor>
            </div>

        </BodyCard>
    </div>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import {getNoticeByIdForUser} from "@/api/notice";
    import {ElMessage} from "element-plus";
    import {getFormatTimeForArticle} from "@/utils/time";

    export default {
        name: "ViewNotice",
        components: {BodyCard},
        props: {
            nid: Number
        },
        data() {
            return {
                notice: {},
                getFormatTimeForArticle
            }
        },
        methods: {
            getNoticeByIdForUser() {
                getNoticeByIdForUser(this.nid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.notice = res.data.data
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
                })
            }
        },
        mounted() {
            this.getNoticeByIdForUser()
        }
    }
</script>

<style scoped>
    .status {
        display: flex;
        justify-content: space-between;
        color: rgba(77, 83, 83, 0.6);
    }
</style>