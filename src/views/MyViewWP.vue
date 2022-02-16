<template>
    <div class="pt-4">
        <WPUserViewCard :wid="wid" :is-me="true"></WPUserViewCard>
    </div>
</template>

<script>
    import WPUserViewCard from "@/components/writeup/WPUserViewCard";
    export default {
        name: "MyViewWP",
        components: {WPUserViewCard},
        props: {
            wid: Number
        }
    }
</script>

<style scoped>

</style>