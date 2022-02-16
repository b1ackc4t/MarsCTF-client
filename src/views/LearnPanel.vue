<template>
    <el-row class="pt-4" :gutter="20">
        <el-col :span="6">
            <LearnList></LearnList>
        </el-col>
        <el-col :span="18">
            <BodyCard>
                111
            </BodyCard>
        </el-col>
    </el-row>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import LearnList from "@/components/learning/LearnList";
    export default {
        name: "LearnPanel",
        components: {LearnList, BodyCard},
    }
</script>

<style scoped>

</style>