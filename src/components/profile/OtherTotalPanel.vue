<template>
    <div>
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane>
                <template #label >
                    <span>
                        <i class="material-icons align-middle">history</i>做题历史
                    </span>
                </template>
                <!--                <ChaHistory></ChaHistory> 做题历史记录-->
                <el-table
                        :data="challengeHistorys"
                        style="width: 100%"
                        :row-class-name="tableRowClassName"
                >
                    <el-table-column prop="finishTime" label="日期" width="180" />
                    <el-table-column prop="cname" label="题目名称" width="180" />
                    <el-table-column prop="tname" label="分类" />
                    <el-table-column prop="score" label="分值" />
                    <el-table-column prop="status" label="状态" />
                    <el-table-column prop="rank" label="排名" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <template #label >
                    <span>
                        <i class="material-icons align-middle">edit_calendar</i>我的Writeup
                    </span>
                </template>
            </el-tab-pane>
            <el-tab-pane>
                <template #label >
                    <span>
                        <i class="material-icons align-middle">chat</i>评论互动
                    </span>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getChallengeStatus} from "@/api/score";
    import {ElMessage} from "element-plus";

    export default {
        name: "OtherTotalPanel",
        props: {
            uid: Number
        },
        data() {
            return {
                challengeHistorys: []
            }
        },
        methods: {
            getChallengeStatus() {
                getChallengeStatus(this.uid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.challengeHistorys = res.data.data
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            },
            tableRowClassName(obj) {
                if (obj.row.status === 'success') {
                    return 'success-row'
                } else if (obj.row.status === 'fail') {
                    return 'danger-row'
                }
            },
            startup() {
                this.getChallengeStatus()
            }
        },
        mounted() {
            this.startup()
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
</style>