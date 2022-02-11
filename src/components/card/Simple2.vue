<template>
    <div class="card my-4">
        <div class="card-header p-0 bg-transparent mt-n4 mx-3 z-index-2">
            <div :class="'bg-gradient-'+headColor+' shadow-'+headColor+' border-radius-lg py-3 pe-1'">
                <slot></slot>
            </div>

        </div>
        <div class="card-body">
            <h6>{{title}}</h6>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Simple2",
        props: {
            title: String,
            headColor: String
        }
    }
</script>

<style scoped>

</style>