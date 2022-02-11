<template>
    <el-header class="header-nav">

        <el-space :size="size" spacer="|">
            <el-button type="primary" :icon="saIcon" circle @click="switchAside"></el-button>
            <el-page-header content="detail" @back="goBack" />
        </el-space>

        <div class="right-info">
            <el-dropdown>
                <el-button type="primary" :icon="Avatar">
<!--                    {{username}}-->
                    {{user.uname}}
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item>Action 4</el-dropdown-item>
                        <el-dropdown-item>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>


    </el-header>

</template>

<script>
    import { ArrowLeftBold, ArrowRightBold, Avatar } from '@element-plus/icons-vue'
    import { ArrowDown } from '@element-plus/icons-vue'

    export default {
        name: "HeaderNav",
        components: {
            ArrowDown
        },
        props: {
            user: Object
        },
        data() {
            return {
                Avatar,
                username: ''
            }
        },
        computed: {
            saIcon() {
                return this.$store.state.AsideOpened ? ArrowLeftBold:ArrowRightBold
            }
        },
        methods: {
            switchAside(event) {
                this.$store.commit('switchAside')
                console.log(event.currentTarget.getAttribute("icon"))

            },
            goBack() {
                this.$router.go(-1)
            }
        },
        watch: {

        }
    }
</script>

<style scoped>
    .header-nav {
        display: flex;
        height: 56px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        align-items: center;
        justify-content: space-between;
    }
</style>