<template>
    <div>
        <div class="row gx-4 mb-4 pt-4">
            <UserInfo :user="user"></UserInfo>
        </div>
        <div class="row mb-4">
            <OtherTotalPanel :uid="uid"></OtherTotalPanel>
        </div>
    </div>
</template>

<script>
    import {getUserByWidForUser} from "@/api/user";
    import UserInfo from "@/components/profile/UserInfo";
    import OtherTotalPanel from "@/components/profile/OtherTotalPanel";

    export default {
        name: "Profile",
        components: {OtherTotalPanel, UserInfo},
        props: {
            uid: Number
        },
        data() {
            return {
                user: null
            }
        },
        methods: {
            getUserByWidForUser() {
                getUserByWidForUser(this.uid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.user = res.data.data
                        console.log(this.user)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.getUserByWidForUser()
        }
    }
</script>

<style scoped>

</style>