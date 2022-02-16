<template>
        <el-radio-group v-model="currentType" size="large" style="width: 100%" class="learn-list">
            <div class="type-select">
                <div v-for="(type, index) in types" :key="type.tid">
                    <el-radio-button :label="toFirstUpper(type.tname)" :class="getClass(index)"></el-radio-button>
                </div>
<!--                <div>-->
<!--                    <el-radio-button label="New York2" class="type-button"></el-radio-button>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <el-radio-button label="New York3" class="type-button"></el-radio-button>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <el-radio-button label="New York4" class="type-button"></el-radio-button>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <el-radio-button label="New York5" class="type-button-last"></el-radio-button>-->
<!--                </div>-->
            </div>
        </el-radio-group>
</template>

<script>
    import {getAllType} from "@/api/chaType";
    import {ElMessage} from "element-plus";

    export default {
        name: "LearnList",
        data() {
            return {
                currentType: 'Web',
                types: []
            }
        },
        methods: {
            getTypes() {
                getAllType().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.types = res.data.data
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