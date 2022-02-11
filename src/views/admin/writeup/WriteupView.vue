<template>
    <WPAdminViewCard :wid="wid"></WPAdminViewCard>
</template>

<script>
    import WPAdminViewCard from "@/components/admin/writeup/WPAdminViewCard";
    export default {
        name: "WriteupView",
        components: {WPAdminViewCard},
        props: {
            wid: Number
        },
    }
</script>

<style scoped>

</style>