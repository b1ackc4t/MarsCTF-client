<template>
    <div class="row p-3">
        <div class="card">
            <div class="card-header p-3 pt-2">
                <h3 class="d-flex justify-content-center">基本信息编辑</h3>
            </div>
            <hr class="bg-gradient-dark">
            <div class="card-body">
                <div class="row justify-content-center">
                    <div class="col-6 text-start">
                        <form>
                            <div class="input-group input-group-dynamic my-3">
                                <input type="text" class="form-control" placeholder="用户名" v-model="newName">
                            </div>
                            <div class="my-3">
                                <div class="form-check ps-0">
                                    性别：
                                    <input class="form-check-input" type="radio" id="male" v-model="newSex" value="male">
                                    <label class="custom-control-label me-2" for="male">男</label>
                                    <input class="form-check-input" type="radio" id="female" v-model="newSex" value="female">
                                    <label class="custom-control-label" for="female">女</label>
                                </div>
                            </div>
                            <div class="input-group input-group-dynamic my-3">
                                <input type="text" class="form-control" placeholder="学校/单位" v-model="newUnit">
                            </div>
                            <div class="my-3">
                                <div class="form-check ps-0">
                                    技能：
                                    <input class="form-check-input" type="checkbox" value="web" id="customCheck1" v-model="newSkill">
                                    <label class="custom-control-label me-2" for="customCheck1">web</label>
                                    <input class="form-check-input" type="checkbox" value="pwn" id="customCheck2" v-model="newSkill">
                                    <label class="custom-control-label me-2" for="customCheck2">pwn</label>
                                    <input class="form-check-input" type="checkbox" value="re" id="customCheck3" v-model="newSkill">
                                    <label class="custom-control-label me-2" for="customCheck3">re</label>
                                    <input class="form-check-input" type="checkbox" value="crypto" id="customCheck4" v-model="newSkill">
                                    <label class="custom-control-label me-2" for="customCheck4">crypto</label>
                                    <input class="form-check-input" type="checkbox" value="misc" id="customCheck5" v-model="newSkill">
                                    <label class="custom-control-label me-2" for="customCheck5">misc</label>
                                </div>
                            </div>

                            <div class="input-group input-group-dynamic my-3">
                                <textarea class="form-control" placeholder="签名" v-model="newSign"></textarea>
                            </div>

                        </form>
                        <div class="float-end">
                            <button class="btn btn-primary mb-0" @click="updateMe">commit</button>
                        </div>
                        <button class="btn btn-info mb-0 me-2" @click="back">back</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {getMe, updateUser} from "@/api/user";

    var sep = ' '
    export default {
        name: "EditUserInfo",
        data() {
            return {
                user: null,
                uid: 0,
                newName: "",
                newSex: "",
                newUnit: "",
                newSkill: [],
                newSign: ""
            }
        },
        methods: {
            back() {
                this.$router.push("/myProfile")
            },
            updateMe() {
                let skill = this.newSkill.join(sep)
                updateUser({
                    uid: this.uid,
                    uname: this.newName,
                    sex: this.newSex !== 'male',
                    unit: this.newUnit,
                    skill: skill,
                    sign: this.newSign
                }).then((res) => {
                    if (res.status === 200) {
                        if (res.data.flag) {
                            this.$router.push('/myProfile');
                        } else {
                            alert("你的名称已经存在了")
                        }
                    }
                }).catch((error) => {
                    alert(error)
                    console.log(error)
                })
            },
            startup() {
                getMe().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.user = res.data.data
                        this.uid = this.user.uid
                        this.newName = "uname" in this.user ? this.user.uname : ""
                        if ("sex" in this.user) {
                            this.newSex = this.user.sex ? "female" : "male"
                        }
                        this.newSkill = "skill" in this.user ? this.user.skill.split(sep) : ""
                        this.newUnit = "unit" in this.user ? this.user.unit : ""
                        this.newSign = "sign" in this.user ? this.user.sign : ""
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>

</style>