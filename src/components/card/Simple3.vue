<template>
    <div class="card">
        <div class="card-header p-3 pt-2">
            <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute middle">
                <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M926.784 480H701.312A192.512 192.512 0 0 0 544 322.688V97.216A416.064 416.064 0 0 1 926.784 480zm0 64A416.064 416.064 0 0 1 544 926.784V701.312A192.512 192.512 0 0 0 701.312 544h225.472zM97.28 544h225.472A192.512 192.512 0 0 0 480 701.312v225.472A416.064 416.064 0 0 1 97.216 544zm0-64A416.064 416.064 0 0 1 480 97.216v225.472A192.512 192.512 0 0 0 322.688 480H97.216z"></path></svg>
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
    .svg-icon {
        width: 2em;
        height: 2em;
        fill: currentColor;
        color: white;
        overflow: hidden;
    }
    .middle {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>