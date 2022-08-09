<template>
    <el-header class="header-nav">

        <el-space :size="size" spacer="|">
            <el-button type="primary" :icon="saIcon" circle @click="switchAside"></el-button>
            <el-page-header content="" @back="goBack" />
        </el-space>

        <div class="right-info">
            <el-dropdown>
                <el-button type="primary" :icon="Avatar">
                    {{ this.$store.state.userStore.user.uname}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>


    </el-header>

</template>

<script>
    import { ArrowLeftBold, ArrowRightBold, Avatar } from '@element-plus/icons-vue'
    import { ArrowDown } from '@element-plus/icons-vue'
    import {logout} from "@/api/user";

    export default {
        name: "HeaderNav",
        components: {
            ArrowDown
        },
        data() {
            return {
                Avatar,
                username: ''
            }
        },
        computed: {
            saIcon() {
                return this.$store.state.AsideOpened ? ArrowLeftBold:ArrowRightBold
            }
        },
        methods: {
            switchAside() {
                this.$store.commit('switchAside')
            },
            goBack() {
                this.$router.go(-1)
            },
            logout() {
                logout().then(() => {
                    this.$router.go(0)
                }).catch((error) => {
                    console.log(error)
                })
            },
        },
        watch: {

        }
    }
</script>

<style scoped>
    .header-nav {
        display: flex;
        height: 56px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        align-items: center;
        justify-content: space-between;
    }
</style>