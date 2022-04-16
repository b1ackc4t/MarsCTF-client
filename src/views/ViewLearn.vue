<template>
    <div class="pt-3" v-loading.fullscreen.lock="loading">
        <BodyCard class="mb-3">
            <LearnNav :learn-info="learnInfo"></LearnNav>
        </BodyCard>
        <BodyCard>
            <el-row justify="space-between" align="middle" class="mb-3">
                <el-col :span="2">
                    <el-button :icon="ArrowLeftBold" circle @click="leftStep"></el-button>
                </el-col>
                <el-col :span="20">
                    <el-steps :active="activeNum" finish-status="success" simple>
                        <el-step title="理论"></el-step>
                        <el-step title="实战"></el-step>
                        <el-step title="评价"></el-step>
                    </el-steps>
                </el-col>
                <el-col :span="2">
                    <el-button :icon="ArrowRightBold" circle @click="rightStep"></el-button>
                </el-col>
            </el-row>
            <LearnViewMain :learn-info="learnInfo" :active-num="activeNum"></LearnViewMain>
        </BodyCard>

    </div>

</template>

<script>
    import {ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue'
    import LearnNav from "@/components/learning/LearnNav";
    import BodyCard from "@/components/card/BodyCard";
    import LearnViewMain from "@/components/learning/LearnViewMain";
    import {getLearningByLidForUser} from "@/api/learning";
    import {ElMessage} from "element-plus";

    export default {
        name: "ViewLearn",
        components: {LearnViewMain, BodyCard, LearnNav},
        props: {
            lid: Number,
        },
        data() {
            return {
                learnInfo: null,
                ArrowLeftBold,
                ArrowRightBold,
                activeNum: 0,
                loads: [true],
            }
        },
        computed: {
            loading() {
                let tmp = false
                for (let index in this.loads) {
                    tmp |= this.loads[index]
                }
                return tmp
            }
        },
        methods: {
            getLearningByLidForUser() {
                getLearningByLidForUser(this.lid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.learnInfo = res.data.data
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
            leftStep() {
                if (this.activeNum > 0) {
                    this.activeNum -= 1
                }
            },
            rightStep() {
                if (this.activeNum < 3) {
                    this.activeNum += 1
                }
            }
        },
        mounted() {
            this.getLearningByLidForUser()
        }
    }
</script>

<style scoped>

</style>