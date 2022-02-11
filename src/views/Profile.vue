<template>
    <div>
        <div class="row gx-4 mb-4 pt-4">
            <UserInfo :user="user"></UserInfo>
        </div>
        <div class="row mb-4">
            <TotalPanel></TotalPanel>
        </div>
    </div>
</template>

<script>

    import UserInfo from "@/components/profile/UserInfo";
    import TotalPanel from "@/components/profile/TotalPanel";
    export default {
        name: "Profile",
        components: {TotalPanel, UserInfo},
        props: {
            user: Object
        },
        data() {
            return {

            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>