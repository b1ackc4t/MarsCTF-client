<template>
    <div v-if="learnInfo != null">
        <el-row class="status">
            <span>
                <span class="me-1">{{getFormatTimeForArticle(learnInfo.creTime)}}</span>
                <span class="badge bg-gradient-warning me-1" style="cursor: pointer" @click="()=>{this.$router.push({
                    name: 'learnPanel',
                    query: {
                        type: learnInfo.tname
                    }
                })}">{{learnInfo.tname}}</span>
                <!--                <span class="badge bg-gradient-secondary me-1">{{wpInfo.cname}}</span>-->
                <span class="badge bg-gradient-info me-1" v-for="tag in learnInfo.tgnames" :key="tag" style="cursor: pointer" @click="()=>{this.$router.push({
                    name: 'learnPanel',
                    query: {
                        tag: tag
                    }
                })}">{{tag}}</span>
            </span>
            <span>
<!--                <span class="badge me-1" :class="{'bg-gradient-success': wpInfo.score>=60, 'bg-gradient-danger': wpInfo.score<60}">{{wpInfo.score}}</span>-->
                <span class="ms-1">{{learnInfo.uname}}</span>
            </span>
        </el-row>
        <el-row justify="center">
            <h2>
                {{learnInfo.title}}
            </h2>

        </el-row>

    </div>

</template>

<script>
    import {getFormatTimeForArticle} from "@/utils/time";
    export default {
        name: "LearnMain",
        props: {
            learnInfo: Object
        },
        data() {
            return {

            }
        },
        methods: {
            getFormatTimeForArticle(time) {
                return getFormatTimeForArticle(time)
            },
        },
    }
</script>

<style scoped>
    .status {
        display: flex;
        justify-content: space-between;
        color: rgba(77, 83, 83, 0.6);
    }
</style>