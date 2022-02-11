<template>
    <div class="card mb-4 text-start">
        <div class="card-header wp-header" @click="enterWP">
            <div>
                <h5 class="text-black">{{wpInfo.title}}</h5>
            </div>
        </div>
        <div class="wp-body" @click="enterWP">
            <div>
                {{wpInfo.descr}}
            </div>
        </div>
        <div class="wp-footer">
            <span>
                <span class="me-1">{{getFormatTimeForArticle(wpInfo.creTime)}}</span>
                <span class="badge bg-gradient-warning me-1">{{wpInfo.tname}}</span>
                <span class="badge bg-gradient-secondary me-1">{{wpInfo.cname}}</span>
                <span class="badge bg-gradient-info me-1" v-for="tag in tags" :key="tag">{{tag}}</span>
            </span>
            <span>
                <span class="badge me-1" :class="{'bg-gradient-success': wpInfo.score>=60, 'bg-gradient-danger': wpInfo.score<60}">{{wpInfo.score}}</span>
                <span class="ms-1">{{wpInfo.uname}}</span>
            </span>

        </div>
    </div>
</template>

<script>
    import {getFormatTimeForArticle} from "@/utils/time";

    var sep = ' '
    export default {
        name: "SingleWP",
        props: {
            wpInfo: Object
        },
        data() {
            return {
                tags: []
            }
        },
        methods: {
            getFormatTimeForArticle(time) {
                return getFormatTimeForArticle(time)
            },
            enterWP() {
                this.$router.push({
                    name: 'viewWP',
                    params: {
                        wid: this.wpInfo.wid
                    }
                })
            },
        },
        mounted() {
            if (this.wpInfo.wpTags != null) {
                this.tags = this.wpInfo.wpTags.split(sep)
            }

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