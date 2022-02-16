<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <h4 class="my-0"><img src="../assets/img/hubu.jpg" width="35rem" height="35rem" class="navbar-brand-img">
                        MarsCTF</h4>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">

                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/"><a class="nav-link d-flex align-items-center justify-content-center fs-6 active" aria-current="page" href="#"><i class="material-icons opacity-10">dashboard</i>首页</a></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/challenge"><a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#"><i class="material-icons opacity-10">fitness_center</i>挑战</a></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/writeupPanel"><a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#"><i class="material-icons opacity-10">note_alt</i>Writeup</a></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/learnPanel"><a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#"><i class="material-icons opacity-10">book</i>学习</a></router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav ml-md-auto d-block d-sm-flex d-md-flex">
                        <li class="nav-item" v-if="!checkUser">
                            <a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#" data-bs-toggle="modal" data-bs-target="#modal-form"><i class="material-icons opacity-10">login</i>登录</a>
                        </li>
                        <li class="nav-item" v-if="!checkUser">
                            <a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#" tabindex="-1" aria-disabled="true" data-bs-toggle="modal" data-bs-target="#exampleModalSignUp"><i class="material-icons opacity-10">assignment</i>注册</a>
                        </li>
                        <li class="nav-item" v-if="checkAdmin">
                            <router-link to="/admin"><a class="nav-link d-flex align-items-center justify-content-center fs-6" aria-current="page" href="#"><i class="material-icons opacity-10">settings</i>管理平台</a></router-link>
                        </li>
                        <li class="nav-item" v-if="checkUser">
                            <router-link to="/myProfile"><a class="nav-link d-flex align-items-center justify-content-center fs-6" aria-current="page" href="#"><i class="material-icons opacity-10">person</i>{{username}}</a></router-link>
                        </li>
                        <li class="nav-item" v-if="checkUser">
                            <a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#" @click="logout"><i class="material-icons opacity-10">logout</i>退出</a>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
        <!-- Modal -->
        <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true" @mouseleave="leave">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="card card-plain">
                            <div class="card-header pb-0 text-left" style="background: none">
                                <h5 class="">欢迎回来</h5>
                                <p class="mb-0">请输入你的用户名和密码完成登录</p>
                            </div>
                            <div class="card-body">
                                <Alert v-if="checkError1">用户名或密码错误</Alert>
                                <form role="form text-left" autocomplete="new-password">
                                    <div class="input-group input-group-outline my-3">
                                        <label class="form-label">Username</label>
                                        <input type="text" v-model="username" class="form-control" autocomplete="new-password">
                                    </div>
                                    <div class="input-group input-group-outline my-3">
                                        <label class="form-label">Password</label>
                                        <input type="password" v-model="password" class="form-control" autocomplete="new-password">
                                    </div>
                                    <div class="form-check form-switch d-flex align-items-center">
                                        <input class="form-check-input" type="checkbox" id="rememberMe" checked="">
                                        <label class="form-check-label mb-0 ms-3" for="rememberMe">记住账号</label>
                                    </div>
                                    <div class="text-center">
                                        <button type="button" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" @click="login">登录</button>
                                    </div>
                                </form>

                            </div>
                            <div class="card-footer text-center pt-0 px-lg-2 px-1">
                                <p class="mb-4 text-sm mx-auto">
                                    没有账号？
                                    <a href="javascript:;" class="text-info text-gradient font-weight-bold" data-bs-toggle="modal" data-bs-target="#exampleModalSignUp">注册</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModalSignUp" tabindex="-1" role="dialog" aria-labelledby="exampleModalSignTitle" aria-hidden="true" @mouseleave="leave">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="card card-plain">
                            <div class="card-header pb-0 text-left" style="background: none">
                                <h5 class="">欢迎加入MarsCTF</h5>
                                <p class="mb-0">请输入你的用户名和密码完成注册</p>
                            </div>
                            <div class="card-body pb-3">
                                <Alert v-if="checkError2">{{msg}}</Alert>
                                <form role="form text-left" autocomplete="new-password">
                                    <div class="input-group input-group-outline my-3">
                                        <label class="form-label">Name</label>
                                        <input type="text" class="form-control" autocomplete="new-password" v-model="newUsername">
                                    </div>
                                    <div class="input-group input-group-outline my-3">
                                        <label class="form-label">Password</label>
                                        <input type="password" class="form-control" autocomplete="new-password" v-model="newPassword">
                                    </div>
                                    <div class="input-group input-group-outline my-3">
                                        <label class="form-label">Re-Password</label>
                                        <input type="password" class="form-control" autocomplete="new-password" v-model="newPasswordR">
                                    </div>
                                    <div class="form-check form-check-info text-left">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked="">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            我同意 <a href="javascrpt:;" class="text-dark font-weight-bolder">相关事项和条款</a>
                                        </label>
                                    </div>
                                    <div class="text-center">
                                        <button type="button" class="btn bg-gradient-primary btn-lg btn-rounded w-100 mt-4 mb-0" @click="register">注册</button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer text-center pt-0 px-sm-4 px-1">
                                <p class="mb-4 mx-auto">
                                    已经有账号？
                                    <a href="javascrpt:;" class="text-primary text-gradient font-weight-bold" data-bs-toggle="modal" data-bs-target="#modal-form">登录</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import Alert from "@/components/smalltool/Alert";
    import {login, register, logout} from "@/api/user";
    import {ElMessage} from "element-plus";

    export default {
        name: "Navbar",
        components: {Alert},
        data() {
            return {
                username: "",
                password: "",
                newUsername: "",
                newPassword: "",
                newPasswordR: "",
                checkError1: false,
                checkError2: false,
                checkUser: false,
                checkAdmin: false,
                msg: ""
            }
        },
        props: {
            user: Object
        },
        methods: {
            login() {
                login(this.username, this.password).then((res) => {
                    if (res.data.flag === false) {
                        this.checkError1 = true
                    } else {
                        this.checkError1 = false
                        ElMessage({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.$router.go(0)
                    }

                        
                }).catch((error) => {
                    console.log(error)
                })
            },
            register() {
                register(this.newUsername, this.newPassword, this.newPasswordR).then((res) => {
                    if (res.data.flag === false) {
                        if (res.data.msg === "Duplicate name") {
                            this.msg = "用户名已经存在了"
                        } else {
                            this.msg = "两次密码不一致"
                        }
                        this.checkError2 = true
                    } else {
                        this.checkError2 = false
                        login(this.newUsername, this.newPassword).then(() => {
                            this.$router.go(0)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })
            },
            logout() {
                logout().then(() => {
                    this.$router.go(0)
                }).catch((error) => {
                    console.log(error)
                })
            },
            leave() {
                this.checkError1 = false;
                this.checkError2 = false;
            }
        },
        watch: {
            // 监听父组件传来的user 也就是当前用户信息
            user: function() {
                if (this.user != null) {
                    this.checkUser = true
                    this.username = this.user.uname
                    if (this.user.role === 'ROLE_admin') {
                        this.checkAdmin = true
                    }
                }
            }
        }
    }
</script>

<style scoped>
    div >>> .navbar-toggler .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23344767' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
</style>