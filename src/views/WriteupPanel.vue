<template>
    <div class="pt-4">
        <div class="searchArea mb-3">
<!--            <el-row align="middle">-->
            <span>
                <span>类型:</span>
                <el-radio-group v-model="searchInfo.tname">
                    <el-radio-button label="all"></el-radio-button>
                    <el-radio-button v-for="type in types" :key="type.tid" :label="type.tname"></el-radio-button>

                </el-radio-group>
            </span>

            <span class="text-end">
                <el-input class="w-60 searchInput" v-model="searchInfo.key"></el-input>
                <el-button :icon="Search" type="danger" class="searchBtn"></el-button>
            </span>
        </div>
        <SingleWP v-for="wp in wps" :key="wp.wid" :wp-info="wp"></SingleWP>
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
    import SingleWP from "@/components/card/SingleWP";
    import {getWriteupByPageForUser} from "@/api/writeup";
    import {ElMessage} from "element-plus";
    import {Search} from '@element-plus/icons-vue'
    import {getAllType} from "@/api/chaType";

    export default {
        name: "WriteupPanel",
        components: {
            SingleWP,
        },
        data() {
            return {
                wps: [],
                pageSize: 10,
                total: 100,
                currentPage: 1,
                searchInfo: {
                    tname: 'all',
                    key: ''
                },
                Search,
                types: []
            }
        },
        methods: {
            getWriteupByPageForUser() {
                getWriteupByPageForUser(this.pageSize, this.currentPage).then((res) => {
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
            getTypes() {
                getAllType().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.types = res.data.data
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
                })
            },
            handleCurrentChange(currentP) {
                this.currentPage = currentP
                this.getWriteupByPageForUser()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.getWriteupByPageForUser()
            }
        },
        mounted() {
            this.getTypes()
            this.getWriteupByPageForUser()
        }
    }
</script>

<style scoped>
    .searchArea {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    .searchBtn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .searchInput >>> .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>