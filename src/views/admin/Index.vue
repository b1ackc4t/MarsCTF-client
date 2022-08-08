<template>
    <el-container class="index-container" :class="{ hideAside: !isCollapse }">
        <el-aside :width="!isCollapse ? '65px':'250px'" class="aside">
            <Aside></Aside>
        </el-aside>
        <el-container class="main-container">
<!--            <el-affix :offset="0">-->
                <HeaderNav :user="user"></HeaderNav>
<!--            </el-affix>-->

            <el-main>
                <router-view></router-view>
            </el-main>

            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>

    </el-container>
</template>

<script>
    import Aside from "@/components/admin/nav/Aside";
    import HeaderNav from "@/components/admin/nav/HeaderNav";
    import Footer from "@/components/admin/Footer";

    export default {
        name: "Index",
        components: {Footer, HeaderNav, Aside},
        data() {
            return {
                user: {}
            }
        },
        computed: {
            isCollapse() {
                return this.$store.state.AsideOpened
            }
        },
        mounted() {
            this.user = this.$store.state.userStore.user
        }
    }
</script>

<style scoped>
    .aside {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
    }
    .main-container {
        margin-left: 250px;
    }
    .hideAside .main-container {
        margin-left: 64px;
    }
</style>

<style>
    .el-pagination.is-background .el-pager li:not(.disabled) {
        background-color: white;
    }
    .el-pagination.is-background .btn-next{
        background-color: white;
    }
    .el-pagination.is-background .btn-prev{
        background-color: white;

    }
    .badge, .btn {
        text-transform: none;
    }
</style>