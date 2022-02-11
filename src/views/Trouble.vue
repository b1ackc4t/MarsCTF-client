<template>
    <div class="row pt-4 gx-5">
        <div class="col-7">
            <div class="row mb-5">
                <MainInfo :cid="cid">
                </MainInfo>
            </div>
            <div class="row mb-5">
                <Comment></Comment>
            </div>
        </div>
        <div class="col-5">
            <div class="row mb-5">
                <WPPart :cid="cid"></WPPart>
            </div>
            <div class="row mb-5">
                <Ranking :cid="cid"></Ranking>
            </div>
        </div>
    </div>
</template>

<script>
    import MainInfo from "@/components/trouble/MainInfo";
    import WPPart from "@/components/trouble/WPPart";
    import Ranking from "@/components/trouble/Ranking";
    import Comment from "@/components/trouble/Comment";
    export default {
        name: "Trouble",
        components: {Comment, Ranking, WPPart, MainInfo},
        props: {
            cid: Number
        }
    }
</script>

<style scoped>

</style>