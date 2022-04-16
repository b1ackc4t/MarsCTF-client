<template>
    <div class="pt-4" v-loading.fullscreen.lock="loading">
        <WPUserViewCard :wid="wid" @load0="() => {loads[0] = false}"></WPUserViewCard>
        <Comment :wid="wid" :get-func="getCommentByPage" :save-func="saveComment" :remove-func="removeComment"
                 @load2="() => {loads[1] = false}"></Comment>
    </div>


</template>

<script>
    import WPUserViewCard from "@/components/writeup/WPUserViewCard";
    import Comment from "@/components/trouble/Comment";
    import {getCommentByPage, saveComment, removeComment} from "@/api/wpComment";

    export default {
        name: "ViewWP",
        components: {Comment, WPUserViewCard},
        props: {
            wid: Number
        },
        data() {
            return {
                getCommentByPage,
                saveComment,
                removeComment,
                loads: [true, true],
            }
        },
        computed: {
            loading() {
                let tmp = false
                for (let index in this.loads) {
                    tmp |= this.loads[index]
                }
                return tmp
            }
        },
    }
</script>

<style scoped>

</style>