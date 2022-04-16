<template>
    <SingleWP v-for="wp in wps" :key="wp.wid" :wp-info="wp"></SingleWP>
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
    import SingleWP from "@/components/card/SingleWP";
    import {getWriteupByPageForUid} from "@/api/writeup";
    import {ElMessage} from "element-plus";
    export default {
        name: "WriteupPanel",
        props: {
            uid: Number
        },
        components: {SingleWP},
        data() {
            return {
                wps: [],
                pageSize: 10,
                total: 100,
                currentPage: 1,
            }
        },
        methods: {
            getWriteupByPageForUid() {
                getWriteupByPageForUid(this.uid, this.pageSize, this.currentPage).then((res) => {
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
                this.startup()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.startup()
            },
            startup() {
                this.getWriteupByPageForUid()
            },
        },
        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>

</style>