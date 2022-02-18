<template>
        <el-radio-group v-model="value" size="large" style="width: 100%" class="learn-list" @change="typeChange">
            <div class="type-select">
                <div v-for="(type, index) in types" :key="type.tid">
                    <el-radio-button :label="type.tname" :class="getClass(index)">{{toFirstUpper(type.tname)}}</el-radio-button>
                </div>
            </div>
        </el-radio-group>
</template>

<script>
    import {getAllType} from "@/api/chaType";
    import {ElMessage} from "element-plus";

    export default {
        name: "LearnList",
        props: {
            modelValue: Array,
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
                types: [],
            }
        },
        methods: {
            getTypes() {
                getAllType().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.types = res.data.data
                        this.types.unshift({
                            tname: 'all',

                        })
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            },
            toFirstUpper(value) {
                return value.slice(0, 1).toUpperCase() + value.slice(1)
            },
            getClass(index) {
                if (index === 0) {
                    return 'type-button-first'
                } else if (index === this.types.length - 1) {
                    return 'type-button-last'
                } else {
                    return 'type-button'
                }
            },
            typeChange(labelName) {
                this.$router.push({
                    name: 'learnPanel',
                    query: {
                        type: labelName
                    }
                })
            },
            startup() {
                this.getTypes()
            }
        },
        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>
    .type-button {
        width: 100%;
        margin-bottom: 0;
        font-weight: bolder;
    }

    .type-button-first {
        width: 100%;
        margin-bottom: 0;
    }

    .type-button-last {
        width: 100%;
        margin-bottom: 0;
    }
    .type-button >>> .el-radio-button__inner {
        border-radius: 0 !important;
        border-bottom: 0;
    }

    .type-button-first >>> .el-radio-button__inner {
        border-radius: .75rem .75rem 0 0 !important;
        border-bottom: 0;
    }

    .type-button-last >>> .el-radio-button__inner {
        border-radius: 0 0 .75rem .75rem !important;
    }

    .type-select >>> .el-radio-button__inner {
        width: 100%;
        font-weight: bold;
        font-size: 1.1rem;
    }

</style>