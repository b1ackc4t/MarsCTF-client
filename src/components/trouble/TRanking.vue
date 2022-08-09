<template>
    <div>
        <div class="card text-start">
            <div class="card-header">
                <div class="row">
                    <div class="col-8"><h3>排行榜</h3></div>
                </div>
            </div>

            <div class="card-body">
                <div class="table-responsive">
                    <table class="table align-items-center mb-0">
                        <thead>
                        <tr>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7">排名</th>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7">用户名</th>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">时间</th>
                        </tr>
                        </thead>
                        <tbody v-if="ranks.length > 0">
                            <tr v-for="rank in ranks" :key="rank.uid">
                                <td class="rank-num">
                                    <p class="font-weight-normal mb-0">{{rank.rank}}</p>
                                </td>
                                <td>
                                    <div class="d-flex px-2">
                                        <div class="my-auto">
                                            <router-link :to="{ name: 'profile', params: { uid: rank.uid }}">
                                                <h6 class="mb-0">{{rank.uname}}</h6>
                                            </router-link>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="font-weight-normal mb-0">{{getFormatTime(rank.finishTime)}}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="ranks.length == 0" class="text-center">
                        <p class="mt-4"><b>一血还没诞生呢！会是谁呢？</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getRankForChallenge} from "@/api/score";
    import {getFormatTimeForRank} from "@/utils/time";
    import {ElMessage} from "element-plus";

    export default {
        name: "Ranking",
        props: {
            cid: Number
        },
        data() {
            return {
                ranks: []
            }
        },
        methods: {
            getRankForChallenge() {
                getRankForChallenge(this.cid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.ranks = res.data.data
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                    this.$emit("load5")
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.$emit("load5")
                })
            },
            getFormatTime(date) {
                return getFormatTimeForRank(date)
            }
        },
        mounted() {
            this.getRankForChallenge()
        }
    }
</script>

<style scoped>
    .rank-num {
        padding-left: 30px;
    }
</style>