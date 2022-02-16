<template>
    <div v-if="user != null">
        <el-tabs type="border-card" @tab-click="handleClick" v-model="tabName">
            <el-tab-pane name="history">
                <template #label >
                    <span>
                        <i class="material-icons align-middle">history</i>做题历史
                    </span>
                </template>
            </el-tab-pane>
            <el-tab-pane name="writeup">
                <template #label >
                    <span>
                        <i class="material-icons align-middle">edit_calendar</i>我的Writeup
                    </span>
                </template>
            </el-tab-pane>
            <el-tab-pane name="comment">
                <template #label >
                    <span>
                        <i class="material-icons align-middle">chat</i>评论互动
                    </span>
                </template>
            </el-tab-pane>
            <router-view :uid="user.uid"></router-view>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "TotalPanel",
        props: {
            user: Object
        },
        data() {
            return {
                tabName: ''
            }
        },
        methods: {
            handleClick(tab) {
                switch (tab.paneName) {
                    case 'history':
                        this.$router.push({
                            name: 'challengeHistory'
                        })
                        break
                    case 'writeup':
                        this.$router.push({
                            name: 'myWriteupPanel'
                        })
                        break
                    case 'comment':
                        break
                }
            },
            startup() {

            }
        },
        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>
    .el-table >>> .danger-row {
        --el-table-tr-bg-color: var(--el-color-danger-lighter);
    }
    .el-table >>> .success-row {
        --el-table-tr-bg-color: var(--el-color-success-lighter);
    }
</style>