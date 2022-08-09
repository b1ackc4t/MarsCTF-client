<template>
    <div class="pt-4 mb-4" v-loading.fullscreen.lock="loading">
        <div class="searchArea mb-3">
<!--            <el-row align="middle">-->
            <span>
                <span>类型:</span>
                <el-radio-group v-model="currentType" @change="typeChange">
                    <el-radio-button label="all"></el-radio-button>
                    <el-radio-button v-for="type in types" :key="type.tid" :label="type.tname"></el-radio-button>

                </el-radio-group>
            </span>
            <span class="text-end">
                <el-input class="w-60 searchInput" v-model="searchText"></el-input>
                <el-button :icon="Search" type="danger" class="searchBtn" @click="searchWriteupByPageForUser"></el-button>
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
    import {getWriteupByPageForUser, getWriteupByTypePageForUser, searchWriteupByPageForUser} from "@/api/writeup";
    import {ElMessage} from "element-plus";
    import {Search} from '@element-plus/icons-vue'
    import {getAllType} from "@/api/chaType";

    export default {
        name: "WriteupPanel",
        components: {
            SingleWP,
        },
        props: {
            type: String
        },
        data() {
            return {
                wps: [],
                pageSize: 10,
                total: 100,
                currentPage: 1,
                currentType: 'all',
                Search,
                types: [],
                searchText: '',
                loads: [true, true],
            }
        },
        computed: {
            whereInfo() {
                const {type} = this
                return {type}
            },
            loading() {
                let tmp = false
                for (let index in this.loads) {
                    tmp |= this.loads[index]
                }
                return tmp
            }
        },
        methods: {
            searchWriteupByPageForUser() {
                this.loads[1] = true
                searchWriteupByPageForUser(this.searchText, this.pageSize, this.currentPage).then((res) => {
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
                }).finally(() => { this.loads[1] = false })
            },
            getWriteupByPageForUser() {
                this.loads[1] = true
                getWriteupByPageForUser(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.wps = res.data.data.list
                    }
                    this.loads[1] = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loads[1] = false
                })
            },
            getWriteupByTypePageForUser() {
                this.loads[1] = true
                getWriteupByTypePageForUser(this.pageSize, this.currentPage, this.currentType).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.wps = res.data.data.list
                    }
                    this.loads[1] = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loads[1] = false
                })
            },
            getTypes() {
                this.loads[0] = true
                getAllType().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.types = res.data.data
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
                this.getWriteupByPageForUser()
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                this.getWriteupByPageForUser()
            },
            startup() {
                this.currentType = this.type
                if (this.currentType === 'all' || this.currentType == null) {
                    this.currentType = 'all'
                    this.getWriteupByPageForUser()
                } else {
                    this.getWriteupByTypePageForUser()
                }
            },
            typeChange(labelName) {
                this.$router.push({
                    name: 'writeupPanel',
                    query: {
                        type: labelName
                    }
                })
            },
        },
        watch: {
            whereInfo() {
                this.startup()
            }
        },
        mounted() {
            this.getTypes()
            this.startup()
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