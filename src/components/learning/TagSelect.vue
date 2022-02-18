<template>
    <el-cascader-panel
            v-model="value"
            :options="tagOptions"
            class="tag-panel"
            :props="props"
            :show-all-levels="false"
    />
</template>

<script>
    import {getChaTagAndTypeForAdmin} from "@/api/chaTag";

    export default {
        name: "TagSelect",
        props: {
            modelValue: Object
        },
        data() {
            return {
                props: {
                    multiple: true,
                    checkStrictly: true,
                },
                tagOptions: [],
                chaTagMap: new Map(),
                tagMap: new Map(),
            }
        },
        computed: {
            value: {
                get() {
                    let innerModel = []
                    for (let index in this.modelValue) {
                        innerModel[index]= [this.chaTagMap.get(this.tagMap.get(this.modelValue[index])), this.modelValue[index]]
                    }
                    return this.modelValue
                },
                set(value) {
                    for (let index in value) {
                        value[index] = value[index][value[index].length - 1]
                    }
                    this.$emit('update:modelValue', value)
                }
            }
        },
        methods: {
            setTagOptions() {
                getChaTagAndTypeForAdmin().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        let tagTypes = res.data.data
                        for (let type in tagTypes) {
                            let item = {
                                value: type,
                                label: type,
                                disabled: true,
                                children: []
                            }
                            for (let tag in tagTypes[type]) {
                                item.children.push({
                                    label: tagTypes[type][tag][1],
                                    value: tagTypes[type][tag][0]
                                })
                                this.tagMap.set(tagTypes[type][tag][0], tagTypes[type][tag][1])
                                this.chaTagMap.set(tagTypes[type][tag][1], type)
                            }
                            this.tagOptions.push(item)
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.setTagOptions()
        }
    }
</script>

<style scoped>

</style>