<template>
    <div class="card mb-4 text-start">
        <div class="card-header wp-header" @click="enterLearn">
            <div>
                <h5 class="text-black">{{learnInfo.title}}</h5>
            </div>
        </div>
        <div class="wp-body" @click="enterLearn">
            <div>
                {{learnInfo.descr}}
            </div>
        </div>
        <div class="wp-footer">
            <span>
                <span class="me-1">{{getFormatTimeForArticle(learnInfo.creTime)}}</span>
                <span class="badge bg-gradient-warning me-1" style="cursor: pointer" @click="()=>{this.$router.push({
                    name: 'learnPanel',
                    query: {
                        type: learnInfo.tname
                    }
                })}">{{learnInfo.tname}}</span>
                <span class="badge bg-gradient-info me-1" v-for="tag in learnInfo.tgnames" :key="tag" style="cursor: pointer" @click="()=>{this.$router.push({
                    name: 'learnPanel',
                    query: {
                        tag: tag
                    }
                })}">{{tag}}</span>
            </span>
            <span>
                <span class="ms-1">{{learnInfo.uname}}</span>
            </span>

        </div>
    </div>
</template>

<script>
    import {getFormatTimeForArticle} from "@/utils/time";

    export default {
        name: "LearnCard",
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
            enterLearn() {
                this.$router.push({
                    name: 'viewLearn',
                    params: {
                        lid: this.learnInfo.lid,
                    }
                })
            },
        },
        mounted() {


        },
        // watch: {
        //     wpInfo() {
        //         this.tags = this.wpInfo.wpTags.split(sep)
        //
        //     }
        // }
    }
</script>

<style scoped>
    .wp-header {
        padding-top: 1rem;
        padding-bottom: 0rem;
        cursor: pointer;
    }
    .wp-body {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-bottom: 0.2rem;
        cursor: pointer;
    }
    .wp-footer {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-bottom: 1rem;
        color: rgba(77, 83, 83, 0.6);
        display: flex;
        justify-content: space-between;
        /*align-items: center;*/
    }
</style>