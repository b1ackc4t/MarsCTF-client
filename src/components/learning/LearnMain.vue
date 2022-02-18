<template>
        <el-row justify="space-between" align="middle">
            <el-col :span="2">
                <el-button :icon="ArrowLeftBold" circle></el-button>
            </el-col>
            <el-col :span="20">
                <el-steps :active="3" finish-status="success" simple>
                    <el-step title="理论"></el-step>
                    <el-step title="实战"></el-step>
                    <el-step title="评价"></el-step>
                </el-steps>
            </el-col>
            <el-col :span="2">
                <el-button :icon="ArrowRightBold" circle></el-button>
            </el-col>
        </el-row>
</template>

<script>
    import {ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue'
    export default {
        name: "LearnMain",
        data() {
            return {
                ArrowLeftBold,
                ArrowRightBold
            }
        }
    }
</script>

<style scoped>

</style>