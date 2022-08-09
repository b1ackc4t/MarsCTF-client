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
    import types from "../store/types"
    import UserInfo from "@/components/profile/UserInfo";
    import TotalPanel from "@/components/profile/TotalPanel";
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
            this.$store.dispatch(types.GET_USER_INFO).then(() => {
                this.user = this.$store.state.userStore.user
            }).catch((error) => {
                console.log(error)
            }).finally(() => { this.loads[0] = false })
        }
    }
</script>

<style scoped>

</style>