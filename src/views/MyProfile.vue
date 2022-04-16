<template>
    <div v-loading.fullscreen.lock="loading">
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
    import {getMe} from "@/api/user";
    export default {
        name: "MyProfile",
        components: {TotalPanel, UserInfo},
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
        mounted() {
            getMe().then((res) => {
                if (res.status === 200 && res.data.flag === true) {
                    this.user = res.data.data
                }
                this.loads[0] = false
            }).catch((error) => {
                console.log(error)
                this.loads[0] = false
            })
        }
    }
</script>

<style scoped>

</style>