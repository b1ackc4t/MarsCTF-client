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
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="male" v-model="newSex" value="male">
                                    <label class="custom-control-label me-2" for="male">男</label>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="female" v-model="newSex" value="female">
                                    <label class="custom-control-label" for="female">女</label>
                                </div>
                            </div>
                            <div class="input-group input-group-dynamic my-3">
                                <input type="text" class="form-control" placeholder="学校/单位" v-model="newUnit">
                            </div>
                            <div class="input-group input-group-dynamic my-3">
                                <input type="text" class="form-control" placeholder="技能" v-model="newSkill">
                            </div>
                            <div class="input-group input-group-dynamic my-3">
                                <textarea class="form-control" placeholder="签名" v-model="newSign"></textarea>
                            </div>
                            <div class="float-end">
                                <button class="btn btn-primary mb-0" type="submit" @click="updateMe">commit</button>

                            </div>
                        </form>
                        <button class="btn btn-info mb-0 me-2" @click="back">back</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {updateUser} from "@/api/user";

    export default {
        name: "EditUserInfo",
        props: {
            user: Object
        },
        data() {
            return {
                uid: 0,
                newName: "",
                newSex: "",
                newUnit: "",
                newSkill: "",
                newSign: ""
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            updateMe() {
                updateUser({
                    uid: this.uid,
                    uname: this.newName,
                    sex: this.newSex !== 'male',
                    unit: this.newUnit,
                    skill: this.newSkill,
                    sign: this.newSign
                }).then((res) => {
                    if (res.status === 200) {
                        if (res.data.flag) {
                            this.$router.go(-1);
                        } else {
                            alert("你的名称已经存在了")
                        }
                    }
                }).catch((error) => {
                    alert(error)
                    console.log(error)
                })
            },
        },
        watch: {
        },
        mounted() {
            if (this.user != null) {
                this.uid = this.user.uid
                this.newName = "uname" in this.user ? this.user.uname : ""
                if ("sex" in this.user) {
                    this.newSex = this.user.sex ? "female" : "male"
                }
                this.newSkill = "skill" in this.user ? this.user.skill : ""
                this.newUnit = "unit" in this.user ? this.user.unit : ""
                this.newSign = "sign" in this.user ? this.user.sign : ""
            }
        }
    }
</script>

<style scoped>

</style>