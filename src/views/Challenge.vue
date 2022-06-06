<template>
    <div class="pt-3 mb-4">
        <TypeTab :current-type="currentType" :current-tag="currentTag"></TypeTab>
    </div>

</template>

<script>
    import TypeTab from '../components/tab/TypeTab'
    export default {
        name: "Challenge",
        components: {
            TypeTab,
        },
        props: {
            currentType: String,
            currentTag: String
        }
    }
</script>

<style scoped>

</style>