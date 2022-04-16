<template>
    <div v-if="users != null">
        <table class="table align-items-center mb-0">
            <thead>
            <tr>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">排名</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">user</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">单位</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">段位</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">web</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">pwn</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">re</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">crypto</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">misc</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7">other</th>
                <th class="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">总积分</th>
                <th>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.uid">
                <td>
                    <p class="font-weight-normal mb-0">{{user.rank}}</p>
                </td>
                <td>
                    <div class="d-flex px-2 justify-content-center">
                        <div class="my-auto">
                            <router-link :to="{ name: 'profile', params: { uid: user.uid }}">
                                <h6 class="mb-0">{{user.uname}}</h6>
                            </router-link>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">{{user.unit}}</p>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">
                        <el-tag class="ml-2" :type="getColor(user.level)"><span class="fw-bolder">{{user.title}}</span></el-tag>
                    </p>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">{{user.web}}</p>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">{{user.pwn}}</p>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">{{user.re}}</p>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">{{user.crypto}}</p>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">{{user.misc}}</p>
                </td>
                <td>
                    <p class="font-weight-normal mb-0">{{user.other}}</p>
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
    export default {
        name: "UserTable",
        props: {
            users: Array
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
        }

    }
</script>

<style scoped>

</style>