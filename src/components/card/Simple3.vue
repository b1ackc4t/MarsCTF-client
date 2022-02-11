<template>
    <div class="card">
        <div class="card-header p-3 pt-2">
            <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">group_work</i>
            </div>
            <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">{{title}}</p>
                <h4 class="mb-0">{{value}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Simple3",
        props: {
            title: String,
            value: String
        }
    }
</script>

<style scoped>

</style>