<template>
    <div class="row align-items-end" v-loading.fullscreen.lock="loading">
        <div class="col-md-10">
            <div class="input-group input-group-static mb-4">
                <label for="exampleFormControlSelect1" class="ms-0">类型选择</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="selectedTag">
                    <option>--所有标签--</option>
                    <option v-for="tag in tags" :key="tag.tgid">{{tag.tgname}}</option>

                </select>
            </div>
        </div>
        <div class="col-md">
            <button type="button" class="btn btn-outline-primary" @click="submitSearch">查看</button>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6" v-for="cinfo in cinfos" :key="cinfo.cid">
            <MyChaCard :info="cinfo"></MyChaCard>
        </div>

    </div>
    <div>
        <el-pagination
                background
                v-model:currentPage="currentPage"
                :page-sizes="[12, 24, 48, 96]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>

</template>

<script>
    import {getChaTagsByType, getChaTags} from "@/api/chaTag";
    import MyChaCard from "@/components/card/MyChaCard";
    import {getAllChallengeByPageForAll, getChallengeByType, getChallengeByTag} from "@/api/challenge";
    import { ElMessage } from 'element-plus'

    export default {
        name: "ChaList",
        components: {
            MyChaCard,
        },
        props: {
            currentType: String,
            currentTag: String
        },
        data() {
            return {
                cinfos: [],
                pageSize: 12,
                total: 100,
                currentPage: 1,
                tags: [],
                selectedTag: '--所有标签--',
                loads: [true, true],
            }
        },
        computed: {
            whereInfo() {
                const {currentType, currentTag} = this
                return {currentType, currentTag}
            },
            loading() {
                let tmp = false
                for (let index in this.loads) {
                    tmp |= this.loads[index]
                }
                return tmp
            }
        },
        methods: {
            getChallengePage() {
                this.loads[1] = true
                if (this.currentType == null || this.currentType === "0") {
                    getAllChallengeByPageForAll(this.pageSize, this.currentPage).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            this.total = res.data.data.total
                            this.currentPage = res.data.data.pageNum
                            this.cinfos = res.data.data.list
                        }
                        this.loads[1] = false
                    }).catch((error) => {
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                        this.loads[1] = false
                    })
                } else {
                    getChallengeByType(this.pageSize, this.currentPage, this.currentType).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            this.total = res.data.data.total
                            this.currentPage = res.data.data.pageNum
                            this.cinfos = res.data.data.list
                        }
                        this.loads[1] = false
                    }).catch((error) => {
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                        this.loads[1] = false
                    })
                }

            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                this.getChallengePage()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.getChallengePage()
            },
            getTags() {
                this.loads[0] = true
                if (this.currentType != null && this.currentType !== "0") {
                    getChaTagsByType(this.currentType).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            this.tags = res.data.data
                        } else {
                            ElMessage({
                                message: res.data.msg,
                                type: 'warning',
                            })
                        }
                        this.loads[0] = false
                    }).catch((error) => {
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                        this.loads[0] = false
                    })
                } else {
                    getChaTags().then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            this.tags = res.data.data
                        } else {
                            ElMessage({
                                message: res.data.msg,
                                type: 'warning',

                            })
                        }
                        this.loads[0] = false
                    }).catch((error) => {
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                        this.loads[0] = false
                    })
                }

            },
            getChallengeByTag() {
                this.loads[1] = true
                getChallengeByTag(this.pageSize, this.currentPage, this.currentTag).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.cinfos = res.data.data.list
                    }
                    this.loads[1] = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loads[1] = false
                })
            },
            submitSearch() {
                this.$router.push({
                    name: 'challenge',
                    query: {
                        type: this.currentType,
                        tag: this.selectedTag
                    }
                })
            },
            flushUI() {
                this.getTags()
                this.selectedTag = this.currentTag
                if (this.selectedTag == null) this.selectedTag = '--所有标签--'
                if (this.currentTag !== '--所有标签--' && this.currentTag != null) {
                    this.getChallengeByTag()
                } else {
                    this.getChallengePage()
                }
            }
        },
        mounted() {
            this.flushUI()
        },

        watch: {
            whereInfo() {
                this.flushUI()
            }
        }
    }
</script>

<style scoped>

</style>