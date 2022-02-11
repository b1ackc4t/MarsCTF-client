<template>
    <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div :class="'bg-gradient-'+headColor+' shadow-'+headColor+' border-radius-lg pt-4 pb-3 text-start'">
                <h6 class="text-white text-capitalize ps-3">{{title}}</h6>
            </div>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Simple1",
        props: {
            title: String,
            headColor: String
        }
    }
</script>

<style scoped>

</style>