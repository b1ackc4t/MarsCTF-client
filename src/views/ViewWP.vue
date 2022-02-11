<template>
    <div class="pt-4">
        <WPUserViewCard :wid="wid"></WPUserViewCard>
    </div>


</template>

<script>
    import WPUserViewCard from "@/components/writeup/WPUserViewCard";
    export default {
        name: "ViewWP",
        components: {WPUserViewCard},
        props: {
            wid: Number
        }
    }
</script>

<style scoped>

</style>