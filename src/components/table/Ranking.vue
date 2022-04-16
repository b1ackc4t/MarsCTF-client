<template>
    <div class="table-responsive">
        <table class="table align-items-center mb-0">
            <thead>
            <tr>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">排名</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">user</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">段位</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">积分</th>
                <th>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in usersData" :key="user.uid">
                <td>
                    <p class="font-weight-normal mb-0">{{user.rank}}</p>
                </td>
                <td>
                    <div class="d-flex px-2">
                        <div class="my-auto">
                            <span style="cursor: pointer" @click="enterUser(user.uid)">
                                <h6 class="mb-0">{{user.uname}}</h6>
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">
                        <el-tag class="ml-2" :type="getColor(user.level)"><span class="fw-bolder">{{user.title}}</span></el-tag>
                    </p>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">{{user.score}}</p>
                </td>
            </tr>


            </tbody>
        </table>
    </div>
</template>

<script>
    import {getUserRank} from "@/api/stat";
    import {ElMessage} from "element-plus";

    export default {
        name: "Ranking",
        data() {
            return {
                usersData: [],
            }
        },
        props: {
            user: Object
        },
        methods: {
            getColor(level) {
                switch (level) {
                    case 0:
                        return  "info"
                    case 1:
                        return  "success"
                    case 2:
                        return  "primary"
                    case 3:
                        return  "warning"
                    case 4:
                        return  "danger"
                    default:
                        return  "danger"
                }
            },
            getUserRank() {
                getUserRank().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.usersData = res.data.data

                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            },
            enterUser(uid) {
                if (this.user != null) {
                    this.$router.push({ name: 'profile', params: { uid: uid }})
                } else {
                    ElMessage({
                        message: "请先登录",
                        type: 'warning',
                    })
                }
            }
        },
        mounted() {
            this.getUserRank()
        }
    }
</script>

<style scoped>

</style>