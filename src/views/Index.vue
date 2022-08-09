<template>
    <div>
        <Navbar></Navbar>
        <main style="margin-top: 4rem">
            <div class="container">
                <router-view :user="user"></router-view>
            </div>
        </main>
    </div>


</template>

<script>
    import Navbar from '../components/Navbar'
    // import types from '../store/types'

    export default {
        name: 'Index',
        components: {
            Navbar
        },
        data() {
            return {
                user: null
            }
        },
        mounted() {
            this.user = this.$store.state.userStore.user
        }
    }
</script>

<style scoped>

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