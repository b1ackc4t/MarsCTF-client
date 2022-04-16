<template>
    <div>
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
            <router-view :uid="uid"></router-view>
        </el-tabs>
    </div>
</template>

<script>

    export default {
        name: "OtherTotalPanel",
        props: {
            uid: Number
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
                            name: 'otherChallengeHistory'
                        })
                        break
                    case 'writeup':
                        this.$router.push({
                            name: 'otherWriteupPanel'
                        })
                        break
                    // case 'comment':
                    //     break
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