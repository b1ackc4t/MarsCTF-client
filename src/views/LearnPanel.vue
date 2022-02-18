<template>
    {{type}}
    <el-row class="pt-4" :gutter="20">
        <el-col :span="6">
            <LearnList v-model="currentType"></LearnList>
        </el-col>
        <el-col :span="18">
            <el-row class="mb-3">
                <el-col :span="24">
                    <LearnTag></LearnTag>
                </el-col>
            </el-row>

            <BodyCard>

                111
            </BodyCard>
        </el-col>
    </el-row>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import LearnList from "@/components/learning/LearnList";
    import LearnTag from "@/components/learning/LearnTag";
    import {ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue'
    export default {
        name: "LearnPanel",
        props: {
            type: String
        },
        components: {LearnTag, LearnList, BodyCard},
        computed: {
            whereInfo() {
                const {type} = this
                return {type}
            }
        },
        data() {
            return {
                ArrowLeftBold,
                ArrowRightBold,
                currentType: 'all'
            }
        },
        methods: {
            startup() {
                this.currentType = this.type
                if (this.currentType === 'all') {
                    console.log()
                } else {
                    console.log()
                }
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