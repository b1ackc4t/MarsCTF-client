<template>
    <CheckedChaCard v-if="info.status === 'success'" :info="info"></CheckedChaCard>
    <ChaCard v-else :info="info"></ChaCard>
</template>

<script>
    import ChaCard from "@/components/card/ChaCard";
    import CheckedChaCard from "@/components/card/CheckedChaCard";
    export default {
        name: "MyChaCard",
        components: {
            CheckedChaCard,
            ChaCard,

        },
        props: {
            info: Object
        }
    }
</script>

<style scoped>

</style>