<template>
    <div class="pt-4 mb-4" v-loading.fullscreen.lock="loading">
        <NoticeCard v-for="notice in notices" :key="notice.nid" :notice="notice"></NoticeCard>
        <el-row>
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
    </div>

</template>

<script>
    import NoticeCard from "@/components/card/NoticeCard";
    import {getNoticePage} from "@/api/notice";
    import {ElMessage} from "element-plus";

    export default {
        name: "Notice",
        components: {NoticeCard},
        data() {
            return {
                notices: [],
                pageSize: 10,
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
            getNoticePage() {
                this.loads[0] = true
                getNoticePage(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.notices = res.data.data.list
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
                this.getNoticePage()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.getNoticePage()
            }
        },
        mounted() {
            this.getNoticePage()
        }
    }
</script>

<style scoped>

</style>