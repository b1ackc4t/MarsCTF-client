<template>
    <el-form-item>
        <el-select v-model="key" placeholder="Select">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            />
        </el-select>
    </el-form-item>

    <el-form-item>
        <el-input placeholder="value" v-model="value"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
</template>

<script>
    export default {
        name: "SearchItem",
        props: {
            options: Array
        },
        data() {
            return {
                key: '',
                value: ''
            }
        },
        methods: {
            onSubmit() {
                this.$emit("searchHandle", this.key, this.value)
            }
        }
    }
</script>

<style scoped>

</style>