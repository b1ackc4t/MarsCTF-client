<template>
    <div>
        <Navbar :user="user"></Navbar>
        <main style="margin-top: 4rem">
            <div class="container">
                <router-view :user="user"></router-view>
            </div>
        </main>
    </div>


</template>

<script>
    import Navbar from '../components/Navbar'
    import {getMe} from '@/api/user'

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
            getMe().then((res) => {
                if (res.status === 200 && res.data.flag === true) {
                    this.user = res.data.data
                }
            }).catch((error) => {
                console.log(error)
            })
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