<template>
    <div>
        <div class="row gx-4 mb-4 pt-4">
            <UserInfo :user="user" :is-me="true"></UserInfo>
        </div>
        <div class="row mb-4">
            <TotalPanel :user="user"></TotalPanel>
        </div>
    </div>
</template>

<script>

    import UserInfo from "@/components/profile/UserInfo";
    import TotalPanel from "@/components/profile/TotalPanel";
    export default {
        name: "MyProfile",
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