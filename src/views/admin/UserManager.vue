<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchUserPage"></SearchItem>
            <el-form-item>
                <el-button type="success" :icon="Plus" circle @click="openSaveDialog"></el-button>
            </el-form-item>
        </el-form>

        <el-dialog v-model="dialogVisible" :title="dialogTitles[dialogStatus]" width="30%" custom-class="addDialog"
            destroy-on-close>
            <el-form label-width="100px" :rules="rules" :model="newUser" ref="dialogForm">
                <el-form-item label="用户名" prop="uname">
                    <el-input v-model="newUser.uname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="upassword">
                    <el-input v-model="newUser.upassword" :placeholder="dialogStatus === 'update' ? '若不修改密码请置空':''">
                    </el-input>
                </el-form-item>
                <el-form-item label="性别" class="text-start">
                    <el-radio :label="false" size="large" v-model="newUser.sex">男</el-radio>
                    <el-radio :label="true" size="large" v-model="newUser.sex">女</el-radio>
                </el-form-item>
                <el-form-item label="角色/权限" class="text-start">
                    <el-select class="m-2" placeholder="role" size="large" v-model="newUser.role">
                        <el-option v-for="r in roles" :label="r.label" :value="r.value" :key="r.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="技能" class="text-start">
                    <el-checkbox-group size="small" v-model="newUser.skill">
                        <el-checkbox label="web" border></el-checkbox>
                        <el-checkbox label="pwn" border></el-checkbox>
                        <el-checkbox label="misc" border></el-checkbox>
                        <el-checkbox label="re" border></el-checkbox>
                        <el-checkbox label="crypto" border></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="newUser.email"></el-input>
                </el-form-item>
                <el-form-item label="学校/单位">
                    <el-input v-model="newUser.unit"></el-input>
                </el-form-item>
                <el-form-item label="签名">
                    <el-input v-model="newUser.sign"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="userSubmit">Confirm</el-button>
                </span>
            </template>
        </el-dialog>

    </el-row>

    <el-row>
        <el-table :data="usersData" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="uid" label="ID" sortable />
            <el-table-column prop="uname" label="用户名" />
            <el-table-column prop="skill" label="技能" />
            <el-table-column prop="unit" label="学校/单位" />
            <el-table-column prop="role" label="角色" />
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template #default="{row}">
                    <el-button type="success" size="mini" @click="openUpdateDialog(row)">
                        Edit
                    </el-button>
                    <el-button size="mini" type="danger" @click="removeUserSubmit(row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <el-row class="mt-3">
        <el-pagination background v-model:currentPage="currentPage" :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
    </el-row>

</template>

<script>
    import {Plus} from '@element-plus/icons-vue'
    import {getAllUserByPage, saveUser, updateUser, removeUser, searchUserPage} from "@/api/user"
    import { ElMessage, ElMessageBox } from 'element-plus'
    import SearchItem from "@/components/smalltool/SearchItem";
    import { ROLES } from '../../utils/config';

    var sep = ' '
    export default {
        name: "UserManager",
        components: {SearchItem},
        data() {
            return {
                Plus,
                dialogVisible: false,
                newUser: {
                    uid: 0,
                    uname: "",
                    upassword: "",
                    sex: false,
                    role: "ROLE_user",
                    skill: [],
                    email: "",
                    unit: "",
                    sign: ""
                },
                usersData: [],
                rules: null,
                roles: [
                    {
                        value: ROLES.ROLE_USER,
                        label: ROLES.ROLE_USER,
                    },
                    {
                        value: ROLES.ROLE_ADMIN,
                        label: ROLES.ROLE_ADMIN
                    }
                ],
                dialogTitles: {
                    save: '添加用户',
                    update: '修改用户'
                },
                dialogStatus: 'save',
                pageSize: 10,
                total: 100,
                currentPage: 1,
                options: [
                    {
                        value: 'uid',
                        label: 'ID'
                    },
                    {
                        value: 'uname',
                        label: '用户名'
                    },
                    {
                        value: 'skill',
                        label: '技能'
                    },
                    {
                        value: 'unit',
                        label: '学校/单位'
                    },
                    {
                        value: 'role',
                        label: '角色'
                    }
                ],
                loading: false,
                key: "",
                value: ""
            }
        },
        methods: {
            searchUserPage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchUserPage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.usersData = res.data.data.list
                    }
                    this.loading = false
                }).catch((error) => {
                    this.loading = false
                    console.log(error)
                })
            },
            openSaveDialog() {
                this.flushNewUser()
                this.rules = {
                    uname: [
                        {
                            required: true,
                            message: '用户名不能为空',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 20,
                            message: '长度需要在1-20之间',
                            trigger: 'blur',
                        },
                    ],
                    upassword: [
                        {
                            required: true,
                            message: '密码不能为空',
                            trigger: 'blur',
                        },
                        {
                            min: 6,
                            max: 20,
                            message: '长度需要在6-20之间',
                            trigger: 'blur',
                        },
                    ]
                }
                this.dialogStatus = 'save'
                this.dialogVisible = true

            },
            openUpdateDialog(user) {
                this.rules = {
                    uname: [
                        {
                            required: true,
                            message: '用户名不能为空',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 20,
                            message: '长度需要在1-20之间',
                            trigger: 'blur',
                        },
                    ],
                }
                this.dialogStatus = 'update'
                this.dialogVisible = true
                this.newUser = JSON.parse(JSON.stringify(user))
                if (this.newUser.skill != null) {
                    let skill = this.newUser.skill + ''
                    this.newUser.skill = skill.split(sep)
                } else {
                    this.newUser.skill = []
                }
            },
            flushNewUser() {
                this.newUser = {
                    uid: 0,
                    uname: "",
                    upassword: "",
                    sex: false,
                    role: "ROLE_user",
                    skill: [],
                    email: "",
                    unit: "",
                    sign: ""
                }
            },
            userSubmit() {
                this.$refs.dialogForm.validate((vRes) => {
                    if (vRes) {
                        this.loading = true
                        this.newUser.skill = this.newUser.skill.join(sep)
                        if (this.dialogStatus === 'save') {
                            saveUser(this.newUser).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: '添加用户成功',
                                        type: 'success',
                                    })
                                    this.getUserPage()
                                    // this.usersData.splice(this.usersData.length, 0, res.data.data)
                                    this.flushNewUser()
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                    this.flushNewUser()
                                }
                                this.loading = false
                            }).catch((error) => {
                                this.loading = false
                                console.log(error)
                                this.flushNewUser()
                            })
                        } else if (this.dialogStatus === 'update') {
                            updateUser(this.newUser).then((res) => {
                                if (res.status === 200 && res.data.flag === true) {
                                    ElMessage({
                                        message: '修改用户成功',
                                        type: 'success',
                                    })
                                    this.getUserPage()
                                    // this.usersData.splice(this.usersData.findIndex((item) => item.uid === this.newUser.uid), 1, this.newUser)
                                    this.flushNewUser()
                                } else {
                                    ElMessage({
                                        message: res.data.msg,
                                        type: 'warning',
                                    })
                                    this.flushNewUser()
                                }
                                this.loading = false
                            }).catch((error) => {
                                this.loading = false
                                console.log(error)
                                this.flushNewUser()
                            })
                        }

                        this.dialogVisible = false
                    }
                })
            },
            removeUserSubmit(user) {
                ElMessageBox.confirm(
                    '确定要注销该用户吗？',
                    'Warning',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                    }
                ).then(() => {
                    this.loading = true
                    removeUser(user).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            ElMessage({
                                message: '注销用户成功',
                                type: 'success',
                            })
                            this.getUserPage()
                            // this.usersData.splice(this.usersData.findIndex((item) => item.uid === user.uid), 1)
                        } else {
                            ElMessage({
                                message: '操作失败，用户id不存在',
                                type: 'warning',
                            })
                            this.loading = false
                        }
                    }).catch((error) => {
                        console.log(error)
                        this.loading = false
                    })
                })
            },
            getUserPage() {
                this.loading = true
                getAllUserByPage(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.usersData = res.data.data.list
                    }
                    this.loading = false
                }).catch((error) => {
                    this.loading = false
                    console.log(error)
                })
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                if (this.value && this.key) {
                    this.searchUserPage(this.key, this.value)
                } else {
                    this.getUserPage()
                }
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchUserPage(this.key, this.value)
                } else {
                    this.getUserPage()
                }
            }

        },
        mounted() {
            this.getUserPage()
        }
    }
</script>

<style>
    .addDialog {
        margin-top: 5vh;
    }
</style>