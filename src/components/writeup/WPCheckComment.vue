<template>
    <BodyCard class="text-start">
        <h5>管理员贴心留言:</h5>
        <p>{{comment}}</p>
    </BodyCard>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    export default {
        name: "WPCheckComment",
        components: {BodyCard},
        props: {
            comment: String
        }
    }
</script>

<style scoped>

</style>