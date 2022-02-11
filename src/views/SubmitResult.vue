<template>
    <el-result
            icon="success"
            :title="title"
            :sub-title="subTitle"
    >
        <template #extra>
            <el-button type="primary" @click="$router.go(-1)">Back</el-button>
        </template>
    </el-result>
</template>

<script>
    export default {
        name: "SubmitResult",
        props: {
            title: String,
            subTitle: String
        }
    }
</script>

<style scoped>

</style>