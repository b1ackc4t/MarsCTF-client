<template>
    <WPAdminViewCard v-loading="loading" :wid="wid" class="mb-3"></WPAdminViewCard>

    <el-dialog v-model="dialogVisible" :title="dialogTitles[dialogStatus]" width="30%" custom-class="addDialog"
        destroy-on-close>
        <el-form label-width="100px" :rules="rules" :model="checkInfo" ref="dialogForm">
            <el-form-item label="分值" label-width="50px" prop="score">
                <el-input v-model.number="checkInfo.score"></el-input>
            </el-form-item>
            <el-form-item label="评价" label-width="50px" prop="remark">
                <el-input v-model="checkInfo.remark" :rows="2" type="textarea" placeholder="Please input" />
            </el-form-item>


        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submit">Confirm</el-button>
            </span>
        </template>
    </el-dialog>

    <el-row v-if="type==='check'">
        <el-button type="success" @click="openPassWP">
            通过
        </el-button>
        <el-button type="danger" @click="openRejectWP">
            驳回
        </el-button>
    </el-row>

    <el-row v-if="type==='manager'">

    </el-row>

</template>

<script>
    import WPAdminViewCard from "@/components/admin/writeup/WPAdminViewCard";
    import {passWriteup, rejectWriteup} from "@/api/writeup";
    import {ElMessage} from "element-plus";
    export default {
        name: "WriteupView",
        components: {WPAdminViewCard},
        props: {
            wid: Number,
            type: String
        },
        data() {
            return {
                checkInfo: {
                    wid: null,
                    score: null,
                    remark: ''
                },
                rules: {
                    score: [
                        {
                            required: true,
                            message: '分值不能为空',
                            trigger: 'blur',
                        },
                        {
                            type: 'number',
                            message: '分值必须是数字类型',
                            trigger: 'blur',
                        },
                        {
                            validator: this.checkScore,
                            trigger: 'blur',
                        }
                    ],
                },
                dialogVisible: false,
                dialogTitles: {
                    pass: '通过',
                    reject: '驳回'
                },
                dialogStatus: 'pass',
                loading: false
            }
        },
        methods: {
            openPassWP() {
                this.checkInfo = {}
                this.dialogStatus = 'pass'
                this.dialogVisible = true
                this.checkInfo.wid = this.wid
            },
            openRejectWP() {
                this.checkInfo = {}
                this.dialogStatus = 'reject'
                this.dialogVisible = true
                this.checkInfo.wid = this.wid
            },
            checkScore(rule, value, callback) {
                if (value < 0 || value > 100) {
                    callback(new Error('分值必须在0-100之间'))
                } else {
                    callback()
                }
            },
            submit() {
                this.$refs.dialogForm.validate((vRes) => {
                    if (vRes) {
                        this.loading = true
                        if (this.dialogStatus === 'pass') {
                            passWriteup(this.checkInfo.wid, this.checkInfo.score).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                }
                            }).catch((error) => {
                                ElMessage({
                                    message: error,
                                    type: 'error',
                                })
                            }).finally(() => { this.loading = false })
                        } else if (this.dialogStatus === 'reject') {
                            rejectWriteup(this.checkInfo.wid, this.checkInfo.score).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                }
                            }).catch((error) => {
                                ElMessage({
                                    message: error,
                                    type: 'error',
                                })
                            }).finally(() => { this.loading = false })
                        }
                        this.dialogVisible = false
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>