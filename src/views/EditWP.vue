<template>
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
                <el-row class="mb-3">
                    <md-editor class="text-start mt-0 pt-0" v-model="wpInfo.text" theme="github"/>
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
<!--            <el-dialog-->
<!--                    v-model="dialogVisible"-->
<!--                    :title="dialogTitles[dialogStatus]"-->
<!--                    width="30%"-->
<!--                    destroy-on-close-->
<!--            >-->
<!--                <el-form ref="formRef" :model="wpInfo" label-width="100px">-->

<!--                </el-form>-->

<!--                <template #footer>-->
<!--              <span class="dialog-footer">-->
<!--                <el-button @click="dialogVisible = false">Cancel</el-button>-->
<!--                <el-button type="primary">Confirm</el-button>-->
<!--              </span>-->
<!--                </template>-->
<!--            </el-dialog>-->
        </BodyCard>
    </div>

</template>

<script>
    import MdEditor from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    import BodyCard from "@/components/card/BodyCard";
    import {saveWriteup} from "@/api/writeup";
    import {ElMessage} from "element-plus";

    var sep = ' '
    export default {
        name: "editWP",
        components: {
            BodyCard,
            MdEditor
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
                // dialogVisible: false,
                // dialogTitles: {
                //     save: '提交wp',
                //     update: '修改wp'
                // },
                // dialogStatus: 'save',
                inputVisible: false,
                inputValue: ''
            }
        },
        methods: {
            // openDialog() {
            //     this.dialogStatus = 'save'
            //     this.dialogVisible = true
            // },
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
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>