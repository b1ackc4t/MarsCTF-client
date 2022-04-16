<template>
    <div>
        <el-scrollbar height="100vh">
        <el-menu
                :default-active="activePathFn"
                :collapse="!isCollapse"
                mode="vertical"
                class="menu"
                :router="true"
                :collapse-transition="false"
        >
            <a href="/">
                <el-menu-item>
                    <template #title>
                        <img class="" style="width: 40px; height: 40px;" :src="hubuIcon"/>
                        <b style="font-size: var(--el-font-size-extra-large)">MarsCTF</b>
                    </template>
                </el-menu-item>
            </a>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><avatar /></el-icon>
                    <span>用户模块</span>
                </template>
                <el-menu-item index="/admin/userManager">用户管理</el-menu-item>
                <el-menu-item index="/admin/userScore">用户积分</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/admin/challengeManager">
                <el-icon><chicken /></el-icon>
                <span>题目管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/chaTagManager">
                <el-icon><collection-tag /></el-icon>
                <span>标签管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/chaTypeManager">
                <el-icon><copy-document /></el-icon>
                <span>类别管理</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon><document /></el-icon>
                    <span>Writeup模块</span>
                </template>
                <el-menu-item index="/admin/writeupCheck">Writeup审核</el-menu-item>
                <el-menu-item index="/admin/writeupManager">Writeup管理</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/admin/learnManager">
                <el-icon><notebook /></el-icon>
                <span>学习管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/containerManager">
                <el-icon><box /></el-icon>
                <span>容器管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/noticeManager">
                <el-icon><notification /></el-icon>
                <span>公告管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/panelConfig">
                <el-icon><setting /></el-icon>
                <span>平台配置</span>
            </el-menu-item>

        </el-menu>
        </el-scrollbar>
    </div>

</template>

<script>
    import hubuIcon from '@/assets/img/hubu.jpg'
    import {Avatar, Chicken, CollectionTag, Document, CopyDocument, Notebook, Box, Setting, Notification} from '@element-plus/icons-vue'
    export default {
        name: "Aside",
        data() {
            return {
                hubuIcon: hubuIcon,
                // isCollapse: this.$store.AsideOpened,
            }
        },
        components: {
            Avatar,
            Chicken,
            CollectionTag,
            Document,
            CopyDocument,
            Notebook,
            Box,
            Setting,
            Notification
        },
        computed: {
            isCollapse() {
                return this.$store.state.AsideOpened
            },
            activePathFn(){
                return this.$route.path;
            }
        }
    }
</script>

<style scoped>
    /*设置侧边栏高度为浏览器高度*/
    .menu {
        height: 100vh;
    }
    /* 设置侧边栏选中后的背景色*/
    .el-menu-item.is-active {
        background-color: rgb(209, 242, 248) !important;
    }
</style>
