<template>
    <BodyCard v-if="lid != null" v-loading="loading">
        <el-form ref="formRef" :model="learnInfo" label-width="100px" class="text-start" label-position="left">
            <el-row class="mb-3">
                <el-input v-model="learnInfo.title" minlength="4" maxlength="50" placeholder="请输入文章标题" show-word-limit
                    type="text">
                </el-input>
            </el-row>
            <el-row class="mb-3 text-start edit-padding">
                <MDEditor v-model="learnInfo.text" :upload-image-func="uploadImageForLearn"></MDEditor>
            </el-row>
            <el-form-item label="分类" prop="tid">
                <el-select v-model="learnInfo.tid" placeholder="Select">
                    <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="技术标签">
                <TagSelect v-model="learnInfo.tgids"></TagSelect>
            </el-form-item>
            <el-form-item label="添加实践">
                <el-switch v-model="learnInfo.hasTrain" inline-prompt active-color="#13ce66" inactive-color="#ff4949"
                    active-text="是" inactive-text="否" />
            </el-form-item>
            <el-form-item label="选择题目" v-if="learnInfo.hasTrain">
                <ChallengeSelect v-model="learnInfo.cids"></ChallengeSelect>
            </el-form-item>
        </el-form>
        <el-row class="foot">
            <el-button @click="$router.go(-1)">Back</el-button>
            <el-button type="primary" @click="updateLearning">Confirm</el-button>
        </el-row>
    </BodyCard>
</template>

<script>
    import TagSelect from "@/components/learning/TagSelect";
    import ChallengeSelect from "@/components/learning/ChallengeSelect";
    import BodyCard from "@/components/card/BodyCard";
    import {getAllType} from "@/api/chaType";
    import {toFirstUpper} from "@/utils/string";
    import {ElMessage} from "element-plus";
    import {getLearningByLidForAdminEdit, updateLearning} from "@/api/learning";
    import MDEditor from "@/components/smalltool/MDEditor";
    import {uploadImageForLearn} from "@/api/file";

    export default {
        name: "EditLearningView",
        components: {MDEditor, TagSelect, ChallengeSelect, BodyCard},
        props: {
            lid: Number
        },
        data() {
            return {
                learnInfo: {
                    title: '',
                    text: '',
                    tid: 1,
                    tgids: [],
                    hasTrain: false,
                    cids: []
                },
                types: [],
                uploadImageForLearn,
                loading: false
            }
        },
        methods: {
            getTypes() {
                this.loading = true
                getAllType().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        let types = res.data.data
                        for (let index in types) {
                            this.types.push({
                                label: toFirstUpper(types[index].tname),
                                value: types[index].tid
                            })
                        }
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
                }).finally(() => { this.loading = false })
            },
            updateLearning() {
                this.loading = true
                updateLearning(this.learnInfo).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        ElMessage({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.$router.go(-1)
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
                }).finally(() => { this.loading = false })
            },
            startup() {
                this.getTypes()
                this.getLearningByLidForAdminEdit()
            },
            getLearningByLidForAdminEdit() {
                this.loading = true
                getLearningByLidForAdminEdit(this.lid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.learnInfo = res.data.data
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
                }).finally(() => { this.loading = false })
            }
        },
        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>

</style>