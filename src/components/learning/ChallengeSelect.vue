<template>
    <div>
        <el-transfer
            v-model="value"
            class="cs"
            filterable
            :titles="['待选择', '已选择']"
            :button-texts="['To left', 'To right']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            :data="leftValue"
            @change="handleChange"
        >
            <template #default="{ option }">
                <span>{{ option.key }}-{{ option.label }}</span>
            </template>
        </el-transfer>
    </div>
</template>

<script>
    import {getSimpleAllChallenge} from "@/api/challenge";
    import {ElMessage} from "element-plus";

    export default {
        name: "ChallengeSelect",
        props: {
            modelValue: Array,
        },
        data() {
            return {
                leftValue: []
            }
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
        methods: {
            getSimpleAllChallenge() {
                getSimpleAllChallenge().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        let tmp = res.data.data
                        for (let index in tmp) {
                            this.leftValue.push({
                                key: tmp[index].cid,
                                label: tmp[index].cname
                            })
                        }
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            }
        },
        mounted() {
            this.getSimpleAllChallenge()
        }
    }
</script>

<style scoped>
    .cs >>> .el-transfer-panel__item {
        margin-left: 0;
    }
    .cs >>> .el-transfer-panel {
        width: 400px;
    }
</style>