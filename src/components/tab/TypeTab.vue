<template>
    <div>
        <el-tabs type="card" @tab-click="handleClick">
            <el-tab-pane label="All">
<!--                <ChaList :current-type="currentType" :current-tag="currentTag"></ChaList>-->
            </el-tab-pane>
            <el-tab-pane v-for="type in types" :key="type.tid" :label="toFirstUpper(type.tname)" :name="type.tname" >
<!--                <ChaList :current-type="currentType" :current-tag="currentTag"></ChaList>-->
            </el-tab-pane>
            <ChaList :current-type="currentType" :current-tag="currentTag"></ChaList>
        </el-tabs>
    </div>
</template>

<script>
    import ChaList from "@/components/card/ChaList";
    import {getAllType} from "@/api/chaType";
    import { ElMessage } from 'element-plus'
    export default {
        name: "TypeTab",
        components: {
            ChaList,
        },
        props: {
            currentType: String,
            currentTag: String
        },
        data() {
            return {
                activeName: 'first',
                types: [],
            }
        },
        methods: {
            handleClick(tab) {
                this.$router.push({
                    name: 'challenge',
                    query: {
                        type: tab.paneName
                    }
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
            toFirstUpper(value) {
                return value.slice(0, 1).toUpperCase() + value.slice(1)
            }
        },
        mounted() {
            this.getTypes()
        }
    }
</script>

<style scoped>
    div >>> .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        background-color: white;
        font-weight: bolder;
    }
    div >>> .el-tabs--card>.el-tabs__header .el-tabs__item {
        font-weight: bold;
    }
</style>