<template>
    <Simple1 title="111111" head-color="success"></Simple1>
    <Simple2 title="1111111"></Simple2>
    <Simple3></Simple3>
</template>

<script>
    import Simple1 from "@/components/card/Simple1";
    import Simple2 from "@/components/card/Simple2";
    import Simple3 from "@/components/card/Simple3";
    export default {
        name: "LearnPanel",
        components: {Simple3, Simple2, Simple1}
    }
</script>

<style scoped>

</style>