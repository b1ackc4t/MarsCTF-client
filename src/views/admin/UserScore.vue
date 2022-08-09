<template>
    <el-row>
        <el-form :inline="true" class="demo-form-inline">
            <SearchItem :options="options" @searchHandle="searchUserScorePage"></SearchItem>
        </el-form>

    </el-row>

    <el-row>
        <el-table :data="userScoresData" style="width: 100%" stripe v-loading="loading">
            <el-table-column prop="uid" label="ID" sortable />
            <el-table-column prop="uname" label="用户名" />
            <el-table-column prop="web" label="Web" sortable />
            <el-table-column prop="pwn" label="Pwn" sortable />
            <el-table-column prop="re" label="Re" sortable />
            <el-table-column prop="crypto" label="Crypto" sortable />
            <el-table-column prop="misc" label="Misc" sortable />
            <el-table-column prop="other" label="Other" sortable />
            <el-table-column prop="score" label="总积分" sortable />
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template #default="{row}">
                    <el-button type="success" size="mini" @click="enterDetail(row)">
                        查看详情
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
    import {getScoreByPage, searchUserScorePage} from "@/api/score";
    import SearchItem from "@/components/smalltool/SearchItem";

    export default {
        name: "UserScore",
        components: {SearchItem},
        data() {
            return {
                pageSize: 10,
                total: 100,
                currentPage: 1,
                userScoresData: [],
                options: [
                    {
                        value: 'uid',
                        label: 'ID'
                    },
                    {
                        value: 'uname',
                        label: '用户名'
                    },
                ],
                loading: false,
                key: "",
                value: ""
            }
        },
        methods: {
            searchUserScorePage(key, value) {
                this.loading = true
                this.key = key
                this.value = value
                searchUserScorePage(key, value, this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.userScoresData = res.data.data.list
                    }
                    this.loading = false
                }).catch((error) => {
                    this.loading = false
                    console.log(error)
                })
            },
            getScoreInfo() {
                this.loading = true
                getScoreByPage(this.pageSize, this.currentPage).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.total = res.data.data.total
                        this.currentPage = res.data.data.pageNum
                        this.userScoresData = res.data.data.list
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
                    this.searchUserScorePage(this.key, this.value)
                } else {
                    this.getScoreInfo()
                }
                
            },
            handleSizeChange(currentS) {
                this.pageSize = currentS
                if (this.value && this.key) {
                    this.searchUserScorePage(this.key, this.value)
                } else {
                    this.getScoreInfo()
                }
            },
            enterDetail(row) {
                this.$router.push({ name: 'profile', params: { uid: row.uid } })
            }
        },
        mounted() {
            this.getScoreInfo()
        }
    }
</script>

<style scoped>

</style>