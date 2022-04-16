<template>
    <NoticeAdmin :operater-func="saveNotice"></NoticeAdmin>
</template>

<script>
    import NoticeAdmin from "@/components/admin/NoticeAdmin";
    import {saveNotice} from "@/api/notice";

    export default {
        name: "AddNotice",
        components: {NoticeAdmin},
        data() {
            return {
                saveNotice
            }
        }
    }
</script>

<style scoped>

</style>