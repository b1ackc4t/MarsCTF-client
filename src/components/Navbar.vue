<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <h4 class="my-0"><img src="../assets/img/hubu.jpg" width="35rem" height="35rem"
                            class="navbar-brand-img">
                        MarsCTF</h4>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/"><a
                                    class="nav-link d-flex align-items-center justify-content-center fs-6 active"
                                    aria-current="page" href="#">
                                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                        data-v-ba633cb8="">
                                        <path fill="currentColor"
                                            d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z">
                                        </path>
                                    </svg>
                                    首页
                                </a>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <span @click="gotoLearn">
                                <a class="nav-link d-flex align-items-center justify-content-center fs-6"
                                    href="javascript:;">
                                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                        data-v-ba633cb8="">
                                        <path fill="currentColor"
                                            d="M576 128v288l96-96 96 96V128h128v768H320V128h256zm-448 0h128v768H128V128z">
                                        </path>
                                    </svg>
                                    学习
                                </a>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span @click="gotoChallenge">
                                <a class="nav-link d-flex align-items-center justify-content-center fs-6"
                                    href="javascript:;">
                                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                        data-v-ba633cb8="">
                                        <path fill="currentColor"
                                            d="M288 128h608L736 384l160 256H288v320h-96V64h96v64z"></path>
                                    </svg>
                                    挑战
                                </a>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span @click="gotoWriteup">
                                <a class="nav-link d-flex align-items-center justify-content-center fs-6"
                                    href="javascript:;">
                                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                        data-v-ba633cb8="">
                                        <path fill="currentColor"
                                            d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z">
                                        </path>
                                    </svg>
                                    Writeup
                                </a>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span @click="gotoNotice">
                                <a class="nav-link d-flex align-items-center justify-content-center fs-6"
                                    href="javascript:;">
                                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                        data-v-ba633cb8="">
                                        <path fill="currentColor"
                                            d="M640 832a128 128 0 0 1-256 0h256zm192-64H134.4a38.4 38.4 0 0 1 0-76.8H192V448c0-154.88 110.08-284.16 256.32-313.6a64 64 0 1 1 127.36 0A320.128 320.128 0 0 1 832 448v243.2h57.6a38.4 38.4 0 0 1 0 76.8H832z">
                                        </path>
                                    </svg>
                                    公告
                                </a>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span @click="gotoRank">
                                <a class="nav-link d-flex align-items-center justify-content-center fs-6"
                                    href="javascript:;">
                                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                        data-v-ba633cb8="">
                                        <path fill="currentColor"
                                            d="M416 896V128h192v768H416zm-288 0V448h192v448H128zm576 0V320h192v576H704z">
                                        </path>
                                    </svg>
                                    排行榜
                                </a>
                            </span>

                        </li>
                    </ul>

                    <ul class="navbar-nav ml-md-auto d-block d-sm-flex d-md-flex">
                        <li class="nav-item" v-if="!checkUser">
                            <a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#"
                                data-bs-toggle="modal" data-bs-target="#modal-form" @click="getCaptchaImage">
                                <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                    data-v-ba633cb8="">
                                    <path fill="currentColor"
                                        d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z">
                                    </path>
                                </svg>
                                登录
                            </a>
                        </li>
                        <li class="nav-item" v-if="!checkUser">
                            <a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#"
                                tabindex="-1" aria-disabled="true" data-bs-toggle="modal"
                                data-bs-target="#exampleModalSignUp" @click="getCaptchaImage">
                                <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                    data-v-ba633cb8="">
                                    <path fill="currentColor" d="M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z">
                                    </path>
                                    <path fill="currentColor" d="M480 672V352a32 32 0 1 1 64 0v320a32 32 0 0 1-64 0z">
                                    </path>
                                    <path fill="currentColor"
                                        d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z">
                                    </path>
                                </svg>
                                注册
                            </a>
                        </li>
                        <li class="nav-item" v-if="checkAdmin">
                            <router-link to="/admin"><a
                                    class="nav-link d-flex align-items-center justify-content-center fs-6"
                                    aria-current="page" href="#">
                                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                        data-v-ba633cb8="">
                                        <path fill="currentColor"
                                            d="M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z">
                                        </path>
                                    </svg>
                                    管理平台
                                </a></router-link>
                        </li>
                        <li class="nav-item" v-if="checkUser">
                            <router-link to="/myProfile"><a
                                    class="nav-link d-flex align-items-center justify-content-center fs-6"
                                    aria-current="page" href="#">
                                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                        data-v-ba633cb8="">
                                        <path fill="currentColor"
                                            d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z">
                                        </path>
                                    </svg>
                                    {{username}}
                                </a></router-link>
                        </li>
                        <li class="nav-item" v-if="checkUser">
                            <a class="nav-link d-flex align-items-center justify-content-center fs-6" href="#"
                                @click="logout">
                                <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                    data-v-ba633cb8="">
                                    <path fill="currentColor"
                                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z">
                                    </path>
                                </svg>
                                退出
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
        <!-- Modal -->
        <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form"
            aria-hidden="true" @mouseleave="leave">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="card card-plain">
                            <div class="card-header pb-0 text-left" style="background: none">
                                <h5 class="">欢迎回来</h5>
                                <p class="mb-0">请输入你的用户名和密码完成登录</p>
                            </div>
                            <div class="card-body">
                                <Alert v-if="checkError1">{{msg}}</Alert>
                                <form role="form text-left" autocomplete="new-password">
                                    <div class="input-group input-group-outline my-3">
                                        <input type="text" v-model="username" class="form-control"
                                            autocomplete="new-password" placeholder="用户名">
                                    </div>
                                    <div class="input-group input-group-outline my-3">
                                        <input type="password" v-model="password" class="form-control"
                                            autocomplete="new-password" placeholder="密码">
                                    </div>
                                    <div class="input-group input-group-outline my-3">
                                        <input type="text" v-model="captcha" class="form-control"
                                            autocomplete="new-password" placeholder="验证码">
                                        <div @click="getCaptchaImage">
                                            <el-image :src="'data:image/png;base64,' + captchaImg"
                                                style="cursor: pointer;height: 100%;" />
                                        </div>

                                    </div>

                                    <div class="form-check form-switch d-flex align-items-center">
                                        <input class="form-check-input" type="checkbox" id="rememberMe"
                                            name="remember-me" checked="" v-model="remember">
                                        <label class="form-check-label mb-0 ms-3" for="rememberMe"
                                            name="remember-me">记住账号</label>
                                    </div>
                                    <div class="text-center">
                                        <button type="button"
                                            class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
                                            @click="login">登录</button>
                                    </div>
                                </form>

                            </div>
                            <div class="card-footer text-center pt-0 px-lg-2 px-1">
                                <p class="mb-4 text-sm mx-auto">
                                    没有账号？
                                    <a href="javascript:;" class="text-info text-gradient font-weight-bold"
                                        data-bs-toggle="modal" data-bs-target="#exampleModalSignUp"
                                        @click="getCaptchaImage">注册</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModalSignUp" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalSignTitle" aria-hidden="true" @mouseleave="leave">
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
                                        <input type="text" class="form-control" autocomplete="new-password"
                                            v-model="newUsername" placeholder="用户名">
                                    </div>
                                    <div class="input-group input-group-outline my-3">
                                        <input type="password" class="form-control" autocomplete="new-password"
                                            v-model="newPassword" placeholder="密码">
                                    </div>
                                    <div class="input-group input-group-outline my-3">
                                        <input type="password" class="form-control" autocomplete="new-password"
                                            v-model="newPasswordR" placeholder="重复密码">
                                    </div>
                                    <div class="input-group input-group-outline my-3">
                                        <input type="text" v-model="captcha" class="form-control"
                                            autocomplete="new-password" placeholder="验证码">
                                        <div @click="getCaptchaImage">
                                            <el-image :src="'data:image/png;base64,' + captchaImg"
                                                style="cursor: pointer;height: 100%;" />
                                        </div>

                                    </div>
                                    <div class="form-check form-check-info text-left">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                            checked="">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            我同意 <a href="javascrpt:;" class="text-dark font-weight-bolder">相关事项和条款</a>
                                        </label>
                                    </div>
                                    <div class="text-center">
                                        <button type="button"
                                            class="btn bg-gradient-primary btn-lg btn-rounded w-100 mt-4 mb-0"
                                            @click="registerSubmit">注册</button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer text-center pt-0 px-sm-4 px-1">
                                <p class="mb-4 mx-auto">
                                    已经有账号？
                                    <a href="javascrpt:;" class="text-primary text-gradient font-weight-bold"
                                        data-bs-toggle="modal" data-bs-target="#modal-form"
                                        @click="getCaptchaImage">登录</a>
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
    import {register} from "@/api/user";
    import {ElMessage} from "element-plus";
    import types from "../store/types";
    import {ROLES} from "../utils/config"
    import {getCaptchaImage} from "../api/captcha"

    export default {
        name: "Navbar",
        components: {Alert},
        data() {
            return {
                username: "",
                password: "",
                captcha: "",
                captchaImg: "",
                captchaId: "",
                newUsername: "",
                newPassword: "",
                newPasswordR: "",
                checkError1: false,
                checkError2: false,
                checkUser: false,
                checkAdmin: false,
                msg: "",
                remember: true
            }
        },
        props: {
            user: Object
        },
        methods: {
            gotoChallenge() {
                this.$router.push('/challenge')
            },
            gotoWriteup() {
                this.$router.push('/writeupPanel')
            },
            gotoLearn() {
                this.$router.push('/learnPanel')
            },
            gotoNotice() {
                this.$router.push('/notice')
            },
            gotoRank() {
                this.$router.push('/viewRank')
            },
            login() {
                this.$store.dispatch(types.LOGIN, {
                    username: this.username,
                    password: this.password, 
                    captchaId: this.captchaId,
                    captcha: this.captcha,
                    remember: this.remember
                }).then((res) => {
                    if (res.data.flag === false) {
                        this.checkError1 = true
                        this.msg = res.data.msg
                        this.getCaptchaImage()
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
            registerSubmit() {
                register(this.newUsername, this.newPassword, this.newPasswordR, this.captcha, this.captchaId).then((res) => {
                    if (res.data.flag === false) {
                        this.msg = res.data.msg
                        this.checkError2 = true
                        this.getCaptchaImage()
                    } else {
                        this.checkError2 = false
                        ElMessage({
                            message: "注册成功",
                            type: 'success',
                        })
                        this.$store.dispatch(types.LOGIN, {
                            username: this.newUsername,
                            password: this.newPassword,
                            captchaId: this.captchaId,
                            captcha: this.captcha,
                            remember: true
                        }).then(() => {
                            this.$router.go(0)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })
            },
            logout() {
                this.$store.dispatch(types.LOGOUT).catch((error) => {
                    console.log(error)
                })
            },
            leave() {
                this.checkError1 = false;
                this.checkError2 = false;
            },
            getCaptchaImage() {
                getCaptchaImage().then((res) => {
                    if (res.data.flag === true) {
                        this.captchaImg = res.data.data.img
                        this.captchaId = res.data.data.captchaId
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        watch: {
            // 监听父组件传来的user 也就是当前用户信息
            user: function() {
                if (this.user != null) {
                    this.checkUser = true
                    this.username = this.user.uname
                    if (this.user.role === ROLES.ROLE_ADMIN) {
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
    .svg-icon {
        width: 1.6em;
        height: 1.6em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>