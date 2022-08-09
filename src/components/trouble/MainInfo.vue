<template>
    <div v-loading="loading">
        <div class="card text-start" v-if="challenge != null">
            <div class="card-header">
                <div class="row">
                    <div class="col-8">
                        <h3>{{challenge.cname}}</h3>
                    </div>
                    <div class="col-4 align-self-center">
                        <h5 class="text-end">分数：{{challenge.score}}</h5>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <p>
                        出题人：
                        <router-link :to="{ name: 'profile', params: { uid: challenge.masterUid }}">
                            <span class="fw-bold">{{challenge.masterName}}</span>
                        </router-link>
                    </p>
                    <p>
                        涉及知识点：
                        <span v-if="challenge.tags != null && challenge.tags.length > 0">
                            <span class="badge bg-gradient-primary clickAble me-1" v-for="tag in challenge.tagsView"
                                :key="tag" @click="clickTag(tag)">
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
                        <button v-if="challenge.fid != null" type="button" class="btn bg-gradient-info"
                            @click="attachDownload">点击下载</button>
                        <span v-else>无</span>
                    </p>
                    <div v-if="challenge.isDynamic" class="text-center">

                        <div v-if="openContainer === 0">
                            <button type="button" class="btn bg-gradient-info" @click="startCreateContainer"
                                style="margin-bottom: 0">启动实例</button>

                        </div>
                        <div v-if="openContainer === 1" style="padding-top: 34px">
                            <el-progress :percentage="100" :format="format" :indeterminate="true" class="progress" />
                        </div>
                        <div v-if="openContainer === 2" style="padding-top: 34px">
                            <el-row justify="center" class="mb-1">
                                <a :href="containerInfo.url" target="_blank">
                                    <el-tag class="mx-1" size="large" style="font-size: 1.2rem">{{containerInfo.url}}
                                    </el-tag>
                                </a>
                                <el-button type="success" plain size="small" @click="addTimeContainer"
                                    style="margin-right: .25rem">增加时长</el-button>
                                <el-button type="danger" plain size="small" @click="destroyContainer" class="mx-0">销毁容器
                                </el-button>
                            </el-row>

                            <div style="font-weight: bold">{{date}}</div>

                        </div>
                    </div>
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
    import {ElMessage, ElMessageBox} from "element-plus";
    import {submitFlag} from "@/api/challenge";
    import {download} from "@/api/file";
    import {createContainer, getContainerForUser, destroyContainer, addTimeForUser} from "@/api/docker";

    export default {
        name: "MainInfo",
        props: {
            cid: Number
        },
        data() {
            return {
                challenge: null,
                flag: '',
                openContainer: 0,
                containerInfo: {
                    endTime: new Date(),
                    url: null,
                    count: null
                },
                date: null,
                hour: "00",
                min: '00',
                second: '00',
                loading: false,
            }
        },
        methods: {
            addTimeContainer() {
                if (this.containerInfo.count > 0) {
                    ElMessageBox.confirm(
                        `为靶机续期（您还有${this.containerInfo.count}次机会）`,
                        '提示',
                        {
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            type: 'success',
                        }
                    ).then(() => {
                        this.loading = true
                        addTimeForUser(this.cid).then((res) => {
                            if (res.status === 200 && res.data.flag === true) {
                                ElMessage({
                                    message: res.data.msg,
                                    type: 'success',
                                })
                                this.getContainerForUser()
                            } else {
                                ElMessage({
                                    message: res.data.msg,
                                    type: 'warning',
                                })
                                this.loading = false
                            }
                        }).catch((error) => {
                            ElMessage({
                                message: error,
                                type: 'error',
                            })
                            this.loading = false
                        })
                    })
                } else {
                    ElMessage({
                        message: "抱歉，您无法继续续期了",
                        type: 'warning',
                    })
                }

            },
            destroyContainer() {
                ElMessageBox.confirm(
                    '确定要销毁该容器吗？',
                    '危险',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                    }
                ).then(() => {
                    this.loading = true
                    destroyContainer(this.cid).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            this.containerInfo = null
                            this.openContainer = 0
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
                    }).catch((error) => {
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                    }).finally(() => { this.loading = false})
                })
            },
            timeCalc() {
                let time = new Date(this.containerInfo.endTime) - new Date()
                if (time <= 0) {
                    this.date = "00:00:00"
                    return
                } else {
                    let h = Math.floor(time / 1000 / 60 / 60 % 24)
                    this.hour = h < 10 ? '0' + h : h
                    // 分
                    let m = Math.floor(time / 1000 / 60 % 60)
                    this.min = m < 10 ? '0' + m : m
                    // 秒
                    let s = Math.floor(time / 1000 % 60)
                    this.second = s < 10 ? '0' + s : s
                    this.date = this.hour + ":" + this.min + ":" + this.second
                    setTimeout(this.timeCalc, 1000)
                }
            },
            createContainer() {
                createContainer(this.cid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.containerInfo = res.data.data
                        this.openContainer = 2
                        this.timeCalc()
                    } else {
                        this.openContainer = 0
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                }).catch((error) => {
                    this.openContainer = 0
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            },
            getContainerForUser() {
                getContainerForUser(this.cid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.containerInfo = res.data.data
                        this.openContainer = 2
                        this.timeCalc()
                    } else {
                        console.log(res.data.msg)
                    }
                    this.$emit("load1")
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.$emit("load1")
                })
            },
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
                    this.$emit("load0")
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.$emit("load0")
                })
            },
            submitFlag() {
                this.loading = true
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
                }).finally(() => { this.loading = false })
            },
            attachDownload() {
                download(this.challenge.fid)
            },
            clickTag(tag) {
                this.$router.push({ name: 'challenge', query: { tag: tag }})
            },
            startCreateContainer() {
                this.openContainer = 1
                this.createContainer()
            },
            format() {
                return ""
            }
        },
        mounted() {
            this.getChallengeInfo()
            this.getContainerForUser()
        }

    }
</script>

<style scoped>
    .clickAble {
        cursor:pointer
    }
    .progress >>> .el-progress__text {
        min-width: 0;
        margin-left: 0;
    }
</style>