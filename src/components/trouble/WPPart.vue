<template>
    <div>
        <div class="card text-start">
            <div class="card-header">
                <div class="row">
                    <div class="col-8"><h3>优秀Writeup</h3></div>
                    <div class="col-4 align-self-center">
                        <button type="button" class="btn btn-lg btn-primary float-end" @click="enterEdit">我也来写</button>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="table-responsive">
                    <table class="table align-items-center mb-0">
                        <thead>
                        <tr>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7">标题</th>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">用户名</th>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">得分</th>

                        </tr>
                        </thead>
                        <tbody v-if="wps.length > 0">
                            <tr v-for="wp in wps" :key="wp.wid">
                                <td>
                                    <div class="d-flex px-2">
                                        <div class="my-auto">
                                            <router-link :to="{ name: 'viewWP', params: { wid: wp.wid }}">
                                                <h6 class="mb-0">{{wp.title}}</h6>
                                            </router-link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <router-link :to="{ name: 'profile', params: { uid: wp.uid }}">
                                        <p class="font-weight-normal mb-0">{{wp.uname}}</p>
                                    </router-link>
                                </td>
                                <td>
                                    <p class="font-weight-normal mb-0">{{wp.score}}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="wps.length == 0" class="text-center">
                        <p class="mt-4"><b>沙发还空缺，快来分享你的思路吧！</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getWriteupRank} from "@/api/writeup";
    import {ElMessage} from "element-plus";

    export default {
        name: "WPPart",
        props: {
            cid: Number
        },
        data() {
            return {
                wps: []
            }
        },
        methods: {
            enterEdit() {
                this.$router.push({
                    name: 'editWP',
                    params: {
                        cid: this.cid
                    }
                })
            },
            getWriteupRank() {
                getWriteupRank(this.cid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.wps = res.data.data
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                    this.$emit("load4")
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.$emit("load4")
                })
            }
        },
        mounted() {
            this.getWriteupRank()
        }
    }
</script>

<style scoped>

</style>