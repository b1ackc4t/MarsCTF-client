<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="row gx-4 mb-4 pt-4">
            <UserInfo :user="user"></UserInfo>
        </div>
        <div class="row mb-4">
            <OtherTotalPanel :uid="uid"></OtherTotalPanel>
        </div>

    </div>
</template>

<script>
    import {getUserByUidForUser} from "@/api/user";
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
                user: null,
                loads: [true],
            }
        },
        computed: {
            loading() {
                let tmp = false
                for (let index in this.loads) {
                    tmp |= this.loads[index]
                }
                return tmp
            }
        },
        methods: {
            getUserByWidForUser() {
                getUserByUidForUser(this.uid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.user = res.data.data
                    }
                    this.loads[0] = false
                }).catch((error) => {
                    console.log(error)
                    this.loads[0] = false
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