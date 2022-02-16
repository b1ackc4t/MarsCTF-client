<template>
    <MySingleWP v-for="wp in wps" :key="wp.wid" :wp-info="wp" @updateInfo="startup"></MySingleWP>
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
</template>

<script>
    import MySingleWP from "@/components/card/MySingleWP";
    import {getWriteupByPageForMe} from "@/api/writeup";
    import {ElMessage} from "element-plus";
    export default {
        name: "MyWriteupPanel",
        components: {
            MySingleWP,
        },
        data() {
            return {
                wps: [],
                pageSize: 10,
                total: 100,
                currentPage: 1,
            }
        },
        methods: {
            getWriteupByPageForMe() {
                getWriteupByPageForMe(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.wps = res.data.data.list
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                this.getWriteupByPageForMe()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.getWriteupByPageForMe()
            },
            startup() {
                this.getWriteupByPageForMe()
            },
        },
        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>

</style>