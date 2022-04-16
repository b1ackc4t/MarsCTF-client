<template>
    <NoticeAdmin :nid="id" :operater-func="updateNotice"></NoticeAdmin>
</template>

<script>
    import NoticeAdmin from "@/components/admin/NoticeAdmin";
    import {updateNotice} from "@/api/notice";

    export default {
        name: "EditNotice",
        components: {NoticeAdmin},
        props: {
            id: Number
        },
        data() {
            return {
                updateNotice
            }
        }
    }
</script>

<style scoped>

</style>