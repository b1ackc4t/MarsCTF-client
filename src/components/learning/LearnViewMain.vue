<template>
    <div class="text-start" v-if="learnInfo != null">

        <div v-if="activeNum === 0">
            <v-md-editor
                    v-model="text"
                    mode="preview"
            >
            </v-md-editor>
        </div>
        <div v-else-if="activeNum === 1">
            <el-table
                    :data="challenges"
                    style="width: 100%; cursor: pointer"
                    :row-class-name="tableRowClassName"
                    @row-click="enterChallenge"
            >
                <el-table-column prop="cid" label="ID" width="100" />
                <el-table-column prop="cname" label="题目名称"/>
                <el-table-column prop="tname" label="类型" />
                <el-table-column prop="score" label="分值" />
                <el-table-column prop="finishedNum" label="已完成人数" />
                <el-table-column label="状态">
                    <template #default="scope">
                        {{getStatusMsg(scope.row.status)}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-else>
            <Comment :lid="learnInfo.lid" :get-func="getCommentByPage" :save-func="saveComment" :remove-func="removeComment"></Comment>
        </div>

    </div>
</template>

<script>
    import {getChallengeByLidForUser} from "@/api/learning";
    import {ElMessage} from "element-plus";
    import Comment from "@/components/trouble/Comment";
    import {getCommentByPage, saveComment, removeComment} from "@/api/learnComment";

    export default {
        name: "LearnViewMain",
        components: {Comment},
        props: {
            learnInfo: Object,
            activeNum: Number
        },
        data() {
            return {
                text: '',
                challenges: [],
                getCommentByPage,
                saveComment,
                removeComment
            }
        },
        methods: {
            getChallengeByLidForUser() {
                getChallengeByLidForUser(this.learnInfo.lid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.challenges = res.data.data
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
            },
            tableRowClassName(obj) {
                if (obj.row.status == null) {
                    return 'warning-row'
                } else if (obj.row.status === "fail") {
                    return 'danger-row'
                } else {
                    return 'success-row'
                }
            },
            getStatusMsg(status) {
                if (status == null) {
                    return '未挑战'
                } else if (status === "fail") {
                    return '挑战失败'
                } else {
                    return '挑战成功'
                }
            },
            enterChallenge(row) {
                this.$router.push({
                    name: 'trouble',
                    params: {
                        cid: row.cid
                    }
                })
            }
        },
        watch: {
            learnInfo() {
                if (this.learnInfo != null) {
                    this.text = this.learnInfo.text
                }
            },
            activeNum() {
                switch (this.activeNum) {
                    case 0:
                        break
                    case 1:
                        this.getChallengeByLidForUser()
                        break

                }
            }
        },
        mounted() {
            if (this.learnInfo != null) {
                this.text = this.learnInfo.text
            }
        }
    }
</script>

<style scoped>
    .el-table >>> .danger-row {
        --el-table-tr-bg-color: var(--el-color-danger-lighter);
    }
    .el-table >>> .success-row {
        --el-table-tr-bg-color: var(--el-color-success-lighter);
    }
    .el-table >>> .warning-row {
        --el-table-tr-bg-color: var(--el-color-warning-lighter);
    }
</style>