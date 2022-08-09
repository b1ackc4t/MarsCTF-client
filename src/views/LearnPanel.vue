<template>
    <el-row class="pt-4 mb-4" :gutter="20" v-loading.fullscreen.lock="loading">
        <el-col :span="6">
            <LearnList v-model="currentType"></LearnList>
        </el-col>
        <el-col :span="18">
            <el-row class="mb-3">
                <el-col :span="24">
                    <LearnTag v-model="currentTag" :options="options" @onSubmit="onSubmit"></LearnTag>
                </el-col>
            </el-row>

            <BodyCard>

                <LearnCard v-for="learnInfo in learnsData" :key="learnInfo.lid" :learn-info="learnInfo"></LearnCard>
                <el-row class="mt-3">
                    <el-pagination
                            background
                            v-model:currentPage="currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </el-row>
            </BodyCard>
        </el-col>
    </el-row>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import LearnList from "@/components/learning/LearnList";
    import LearnTag from "@/components/learning/LearnTag";
    import {ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue'
    import LearnCard from "@/components/learning/LearnCard";
    import {getLearningByPageForUser, getLearningByTypePageForUser} from "@/api/learning";
    import {ElMessage} from "element-plus";
    import {getChaTags, getChaTagsByType} from "@/api/chaTag";
    import {getLearningByTagPageForUser} from "@/api/learning";

    export default {
        name: "LearnPanel",
        props: {
            type: String,
            tag: String
        },
        components: {LearnCard, LearnTag, LearnList, BodyCard},
        computed: {
            whereInfo() {
                const {type} = this
                return {type}
            },
            loading() {
                let tmp = false
                for (let index in this.loads) {
                    tmp |= this.loads[index]
                }
                return tmp
            }
        },
        data() {
            return {
                ArrowLeftBold,
                ArrowRightBold,
                currentType: 'all',
                currentTag: '--所有标签--',
                pageSize: 10,
                total: 100,
                currentPage: 1,
                learnsData: [],
                options: [],
                loads: [true, true],
            }
        },
        methods: {
            getChaTags(tag) {
                this.loads[0] = true
                getChaTags().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        let tags = res.data.data
                        let opt = [{value: '--所有标签--', label: '--所有标签--'}]
                        for (let index in tags) {
                            opt.push({
                                value: tags[index].tgname,
                                label: tags[index].tgname
                            })
                        }
                        if (tag == null) {
                            this.currentTag = '--所有标签--'
                        } else {
                            this.currentTag = tag
                        }

                        this.options = opt
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
            },
            getChaTagsByType() {
                this.loads[0] = true
                getChaTagsByType(this.currentType).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        let tags = res.data.data
                        let opt = [{value: '--所有标签--', label: '--所有标签--'}]
                        for (let index in tags) {
                            opt.push({
                                value: tags[index].tgname,
                                label: tags[index].tgname
                            })
                        }
                        this.currentTag = '--所有标签--'
                        this.options = opt
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
            },
            getLearningByPageForUser() {
                this.loads[1] = true
                getLearningByPageForUser(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.learnsData = res.data.data.list
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
            getLearningByTypePageForUser() {
                this.loads[1] = true
                getLearningByTypePageForUser(this.pageSize, this.currentPage, this.currentType).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.learnsData = res.data.data.list
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
            getLearningByTagPageForUser() {
                this.loads[1] = true
                getLearningByTagPageForUser(this.pageSize, this.currentPage, this.currentTag).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.learnsData = res.data.data.list
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
            onSubmit() {
                if (this.currentTag !== '--所有标签--') {
                    this.getLearningByTagPageForUser()
                } else {
                    this.startup()
                }
            },
            startup() {
                this.currentType = this.type
                this.currentTag = this.tag
                if (this.currentTag !== '--所有标签--' && this.currentTag != null) {
                    this.getChaTags(this.currentTag)
                    this.getLearningByTagPageForUser()
                } else {
                    if (this.currentType === 'all' || this.currentType == null) {
                        this.currentType = 'all'
                        this.getChaTags()
                        this.getLearningByPageForUser()
                    } else {
                        this.getChaTagsByType()
                        this.getLearningByTypePageForUser()
                    }
                }


            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                this.startup()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.startup()
            }
        },
        watch: {
            whereInfo() {
                this.startup()
            }
        },
        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>

</style>