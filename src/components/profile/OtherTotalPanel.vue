<template>
    <div>
        <el-tabs type="border-card" @tab-click="handleClick" v-model="tabName">
            <el-tab-pane name="history">
                <template #label >
                    <span>
                                                <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path><path fill="currentColor" d="M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path></svg>
做题历史
                    </span>
                </template>
            </el-tab-pane>
            <el-tab-pane name="writeup">
                <template #label >
                    <span>
                                                <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"></path></svg>
我的Writeup
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
    .svg-icon {
        width: 1.6em;
        height: 1.6em;
        vertical-align: -0.4em;
        fill: currentColor;
        overflow: hidden;
    }
</style>