<template>
    <BodyCard>
        <el-row align="middle">
            <el-col :span="20">
                <el-select v-model="value" class="m-2 tag-select" placeholder="Select" size="large" style="width: 100%">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" >
                <el-button type="primary" @click="onSubmit" style="width: 100%">Query</el-button>
            </el-col>
        </el-row>

    </BodyCard>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";

    export default {
        name: "LearnTag",
        components: {BodyCard},
        props: {
            modelValue: String,
            options: []
        },
        computed: {
            value: {
                get() {
                    return this.modelValue
                },
                set(value) {
                    this.$emit('update:modelValue', value)
                }
            }
        },
        data() {
            return {
                formInline: {}
            }
        },
        methods: {
            onSubmit() {
                this.$emit('onSubmit')
            }
        }
    }
</script>

<style scoped>
    .tag-select >>> .el-input__inner {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        border-right: 0;
    }
</style>