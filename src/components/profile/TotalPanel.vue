<template>
    <div>
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane>
                <template #label >
                    <span>
                        <i class="material-icons align-middle">history</i>做题历史
                    </span>
                </template>
                <ChaHistory></ChaHistory>
            </el-tab-pane>
            <el-tab-pane>
                <template #label >
                    <span>
                        <i class="material-icons align-middle">edit_calendar</i>我的Writeup
                    </span>
                </template>
            </el-tab-pane>
            <el-tab-pane>
                <template #label >
                    <span>
                        <i class="material-icons align-middle">chat</i>评论互动
                    </span>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ChaHistory from "@/components/profile/ChaHistory";
    export default {
        name: "TotalPanel",
        components: {ChaHistory}
    }
</script>

<style scoped>

</style>