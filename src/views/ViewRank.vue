<template>
    <div class="pt-4 mb-4" v-loading.fullscreen.lock="loading">
        <BodyCard>
                <UserTable :users="users" style="overflow-x: auto"></UserTable>

            <el-row class="mt-3" justify="center">
                <el-pagination
                        background
                        v-model:currentPage="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                >
                </el-pagination>
            </el-row>
        </BodyCard>
    </div>


</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import {getUserRankView} from "@/api/stat";
    import {ElMessage} from "element-plus";
    import UserTable from "@/components/table/UserTable";

    export default {
        name: "ViewRank",
        components: {UserTable, BodyCard},
        data() {
            return {
                users: null,
                pageSize: 20,
                total: 100,
                currentPage: 1,
                loads: [true],
            }
        },
        computed: {
            loading() {
                let tmp = false
                for (let index in this.loads) {
                    tmp |= this.loads[index]
                }
                return tmp
            }
        },
        methods: {
            getUserRankView() {
                this.loads[0] = true
                getUserRankView(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.users = res.data.data.list
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                    this.loads[0] = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loads[0] = false
                })
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                this.getUserRankView()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.getUserRankView()
            }
        },
        mounted() {
            this.getUserRankView()
        }
    }
</script>

<style scoped>

</style>