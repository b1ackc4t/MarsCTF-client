`<template>
    <div class="pt-4">
        <BodyCard>
            <el-form ref="formRef" :model="wpInfo" label-width="100px">
                <el-row class="mb-3">
                    <el-input
                            v-model="wpInfo.title"
                            minlength="4"
                            maxlength="50"
                            placeholder="请输入writeup标题"
                            show-word-limit
                            type="text"
                    >
                    </el-input>
                </el-row>
                <el-row class="mb-3 text-start edit-padding">
                    <v-md-editor
                            v-model="wpInfo.text"
                            height="500px"
                            :disabled-menus="[]"
                            @upload-image="uploadImage"
                    >

                    </v-md-editor>
                </el-row>
                <el-row class="mb-3">
                    <div class="text-start">
                        <span class="me-3">Writeup标签</span>
                        <el-tag
                                v-for="tag in tmpWpTags"
                                :key="tag"
                                class="mx-1 mb-2"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)"
                                effect="dark"
                                type="danger"
                        >
                            {{ tag }}
                        </el-tag>
                        <el-input
                                v-if="inputVisible"
                                ref="InputRef"
                                v-model="inputValue"
                                class="ml-1 w-20"
                                size="small"
                                @keyup.enter="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                            + New Tag
                        </el-button>

                    </div>
                </el-row>
                <el-row class="mb-3">
                    <el-button type="primary" round @click="submitWP">提交</el-button>
                </el-row>

            </el-form>
        </BodyCard>
    </div>

</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import {saveWriteup} from "@/api/writeup";
    import {ElMessage} from "element-plus";
    import {uploadImageForWP} from "@/api/file";
    import {inject} from 'vue'

    var sep = ' '
    export default {
        name: "editWP",
        components: {
            BodyCard,
        },
        props: {
            cid: Number
        },
        data() {
            return {
                wpInfo: {
                    title: '',
                    text: '',
                    // isLocal: true,   是否是平台内的题目
                    cid: this.cid,
                    wpTags: []
                },
                tmpWpTags: [],
                inputVisible: false,
                inputValue: '',
                server: null
            }
        },
        methods: {
            showInput() {
                this.inputVisible = true
                this.$nextTick(() => {
                    this.$refs.InputRef.input.focus()
                })
            },
            handleInputConfirm() {
                if (this.inputValue) {
                    this.tmpWpTags.push(this.inputValue)
                }
                this.inputVisible = false
                this.inputValue = ''
            },
            handleClose(tag) {
                this.tmpWpTags.splice(this.tmpWpTags.indexOf(tag), 1)
            },
            submitWP() {
                this.wpInfo.wpTags = this.tmpWpTags.join(sep)
                saveWriteup(this.wpInfo).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        ElMessage({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.$router.go(-1)
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            },
            uploadImage(event, insertImage, files) {
                for (let index in files) {
                    uploadImageForWP(files[index]).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            insertImage({
                                url: `${this.server}${res.data.data}`,
                                // desc: ' '
                            })
                        }
                    }).catch((error) => {
                        ElMessage({
                            message: error,
                            type: 'error',
                        })
                    })
                }

            }
        },
        mounted() {
            this.server = inject('server')
        }
    }
</script>

<style scoped>
    .edit-padding >>> .github-markdown-body {
        padding: 16px 32px 32px !important;
    }
</style>