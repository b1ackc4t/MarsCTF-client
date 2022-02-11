<template>
    <div class="alert alert-danger p-1" role="alert">
        <span class="alert-icon align-middle">
        </span>
        <span style="color: white"><strong>{{title}}</strong><slot></slot></span>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            title: String
        }
    }
</script>

<style scoped>

</style>