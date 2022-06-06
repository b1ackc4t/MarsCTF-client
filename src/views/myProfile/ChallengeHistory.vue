<template>
    <el-table
            :data="challengeHistorys"
            style="width: 100%; cursor: pointer"
            :row-class-name="tableRowClassName"
            @row-click="enterChallenge"
    >
        <el-table-column prop="finishTime" label="日期" width="180" />
        <el-table-column prop="cname" label="题目名称" width="180" />
        <el-table-column prop="tname" label="分类" />
        <el-table-column prop="score" label="分值" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="rank" label="排名" />
    </el-table>
</template>

<script>
    import {getChallengeStatus} from "@/api/score";
    import {ElMessage} from "element-plus";
    import {getMe} from "@/api/user";

    export default {
        name: "ChallengeHistory",
        props: {
            uid: Number
        },
        data() {
            return {
                challengeHistorys: [],
            }
        },
        methods: {
            enterChallenge(row) {
                this.$router.push({
                    name: 'trouble',
                    params: {
                        cid: row.cid
                    }
                })
            },
            getChallengeStatus() {
                if (this.uid == null) {
                    getMe().then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            this.user = res.data.data
                            getChallengeStatus(this.user.uid).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    this.challengeHistorys = res.data.data
                                }
                            }).catch((error) => {
                                ElMessage({
                                    message: error,
                                    type: 'error',
                                })
                            })
                        }
                    }).catch((error) => {
                        console.log(error)
                        this.loads[0] = false
                    })
                } else {
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
                }

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

</style>