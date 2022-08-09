<template>
    <div class="row pt-4 gx-5" v-loading.fullscreen.lock="loading">
        <div class="col-7">
            <div class="row mb-5">
                <MainInfo :cid="cid" @load0="() => {loads[0] = false}" @load1="() => {loads[1] = false}">
                </MainInfo>
            </div>
            <div class="row mb-5">
                <Comment :cid="cid" :get-func="getCommentByPage" :save-func="saveComment" :remove-func="removeComment"
                @load2="() => {loads[2] = false}" @load3="() => {loads[3] = false}"></Comment>
            </div>
        </div>
        <div class="col-5">
            <div class="row mb-5">
                <WPPart :cid="cid" @load4="() => {loads[4] = false}"></WPPart>
            </div>
            <div class="row mb-5">
                <TRanking :cid="cid" @load5="() => {loads[5] = false}"></TRanking>
            </div>
        </div>
    </div>
</template>

<script>
    import MainInfo from "@/components/trouble/MainInfo";
    import WPPart from "@/components/trouble/WPPart";
    import TRanking from "../components/trouble/TRanking";
    import Comment from "@/components/trouble/Comment";
    import {getCommentByPage, saveComment, removeComment} from "@/api/chaComment";
    export default {
        name: "Trouble",
        components: {Comment, TRanking, WPPart, MainInfo},
        props: {
            cid: Number
        },
        data() {
            return {
                getCommentByPage,
                saveComment,
                removeComment,
                loads: [true, true, true, true, true],
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