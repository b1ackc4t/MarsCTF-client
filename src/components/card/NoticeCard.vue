<template>
    <div class="card mb-4 text-start">
        <div class="card-header wp-header" @click="enterNotice">
            <div>
                <h5 class="text-black">{{notice.title}}</h5>
            </div>
        </div>
        <div class="wp-body" @click="enterNotice">
            <div>
                {{notice.descr}}
            </div>
        </div>
        <div class="wp-footer">
            <span>
                <span class="me-1">{{getFormatTimeForArticle(notice.createTime)}}</span>
            </span>
            <span>
                <span class="ms-1">{{notice.uname}}</span>
            </span>

        </div>
    </div>
</template>

<script>
    import {getFormatTimeForArticle} from "@/utils/time";
    export default {
        name: "NoticeCard",
        props: {
            notice: Object
        },
        data() {
            return {

            }
        },
        methods: {
            getFormatTimeForArticle(time) {
                return getFormatTimeForArticle(time)
            },
            enterNotice() {
                this.$router.push({
                    name: 'viewNotice',
                    params: {
                        nid: this.notice.nid
                    }
                })
            }
        }
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