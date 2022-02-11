<template>
    <div>
        <div class="card text-start">
            <div class="card-header">
                <div class="row">
                    <div class="col-8"><h3>{{challenge.cname}}</h3></div>
                    <div class="col-4 align-self-center"><h5 class="text-end">分数：{{challenge.score}}</h5></div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <p>
                        出题人：<span class="fw-bold">{{challenge.masterName}}</span>
                    </p>
                    <p>
                        涉及知识点：
                        <span v-if="challenge.tags != null && challenge.tags.length > 0">
                            <span class="badge bg-gradient-primary clickAble me-1" v-for="tag in challenge.tags" :key="tag" @click="clickTag(tag)">
                            {{tag}}
                            </span>
                        </span>
                        <span v-else>无</span>

                    </p>
                    <p>
                        已解决：<span class="fw-bold">{{challenge.finishedNum}}</span>
                    </p>
                    <p>
                        描述：<br>
                        <span class="fw-bold">{{challenge.descr}}</span>
                    </p>
                    <p>
                        附件：
                        <button v-if="challenge.fid != null" type="button" class="btn bg-gradient-info" @click="attachDownload">点击下载</button>
                        <span v-else>无</span>
                    </p>
                </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer d-flex">
                <div class="w-100">
                    <div class="input-group input-group-outline my-3">
<!--                        <label class="form-label">FLAG</label>-->
                        <input type="text" class="form-control" placeholder="FLAG" v-model="flag">
                        <button class="btn btn-primary mb-0" @click="submitFlag">Submit flag</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getChallengeByIdForUser} from "@/api/challenge";
    import {ElMessage} from "element-plus";
    import {submitFlag} from "@/api/challenge";
    import {download} from "@/api/file";

    export default {
        name: "MainInfo",
        props: {
            cid: Number
        },
        data() {
            return {
                challenge: {},
                flag: '',
            }
        },
        methods: {
            getChallengeInfo() {
                getChallengeByIdForUser(this.cid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.challenge = res.data.data
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
            submitFlag() {
                submitFlag(this.cid, this.flag).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.$router.push({name: 'result', params: {
                                title: `${this.challenge.cname} ${res.data.msg}`,
                        }})
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'error',
                        })
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            },
            attachDownload() {
                download(this.challenge.fid)
            },
            clickTag(tag) {
                this.$router.push({ name: 'challenge', query: { tag: tag }})
            }
        },
        mounted() {
            this.getChallengeInfo()
        }

    }
</script>

<style scoped>
    .clickAble {
        cursor:pointer
    }
</style>