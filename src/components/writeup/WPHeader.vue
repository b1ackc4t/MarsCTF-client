<template>
    <BodyCard>
        <el-row class="status">
            <span>
                <span class="me-1">{{getFormatTimeForArticle(wpInfo.creTime)}}</span>
                <span class="badge bg-gradient-warning me-1">{{wpInfo.tname}}</span>
                <span class="badge bg-gradient-secondary me-1">{{wpInfo.cname}}</span>
                <span class="badge bg-gradient-info me-1" v-for="tag in wpInfo.wpTags" :key="tag">{{tag}}</span>
            </span>
            <span>
                <span class="badge me-1" :class="{'bg-gradient-success': wpInfo.score>=60, 'bg-gradient-danger': wpInfo.score<60}">{{wpInfo.score}}</span>
                <span class="ms-1">{{wpInfo.uname}}</span>
            </span>
        </el-row>
        <el-row>
            <h2>
                {{wpInfo.title}}
                <el-tag
                        :type="statusClass"
                        v-if="isMe"
                >
                    {{ statusMsg }}
                </el-tag>
            </h2>

        </el-row>

    </BodyCard>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import {getFormatTimeForArticle} from "@/utils/time";

    export default {
        name: "WPHeader",
        components: {BodyCard},
        props: {
            wpInfo: Object,
            isMe: Boolean
        },
        data() {
            return {
                statusMsg: '',
                statusClass: ''
            }
        },
        methods: {
            getFormatTimeForArticle(time) {
                return getFormatTimeForArticle(time)
            },
        },
        mounted() {
            if (this.wpInfo.done) {
                if (this.wpInfo.status) {
                    this.statusClass = 'success'
                    this.statusMsg = '已通过'
                } else {
                    this.statusClass = 'danger'
                    this.statusMsg = '已驳回'
                }
            } else {
                this.statusClass = 'warning'
                this.statusMsg = '未审核'
            }
        }
    }
</script>

<style scoped>
    .status {
        display: flex;
        justify-content: space-between;
        color: rgba(77, 83, 83, 0.6);
    }
</style>