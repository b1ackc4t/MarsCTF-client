<template>
    <div v-loading="loading">
        <el-form label-width="120px" :rules="rules" class="text-start" :model="currentChallenge" ref="myForm">
            <el-row>
                <el-col :span="18">
                    <el-form-item label="题目名称" prop="cname">
                        <el-input v-model="currentChallenge.cname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="分值" label-width="50px" prop="score">
                        <el-input v-model.number="currentChallenge.score"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="题目描述">
                        <el-input :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" placeholder="Please input"
                            v-model="currentChallenge.descr">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="题目附件">
                        <el-upload class="upload-demo" drag :action="inject('server') + '/api/admin/uploadCTFFile'"
                            :with-credentials="true" :limit="1" :on-remove="removeFileSubmit" :on-success="uploadFile"
                            :on-preview="previewFile" :headers="headers">
                            <el-icon class="el-icon--upload">
                                <upload-filled />
                            </el-icon>
                            <div class="el-upload__text">
                                拖动或点击上传<em>题目附件</em>
                            </div>
                            <template #tip>
                            </template>
                        </el-upload>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="动态靶机">
                        <el-switch v-model="currentChallenge.isDynamic" inline-prompt active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否" />
                    </el-form-item>
                    <div v-if="currentChallenge.isDynamic">
                        <el-form-item label="docker镜像名" prop="imageName">
                            <el-input v-model="currentChallenge.imageName"></el-input>
                        </el-form-item>
                        <el-form-item label="docker端口" prop="srcPort">
                            <el-input v-model="currentChallenge.srcPort" oninput="value=value.replace(/[^0-9.]/g,'')">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="cpu数量上限" prop="cpuLimit">
                            <el-input v-model="currentChallenge.cpuLimit" oninput="value=value.replace(/[^0-9.]/g,'')"
                                placeholder="0.5" />
                        </el-form-item>
                        <el-form-item label="内存数量上限" prop="memLimit">
                            <el-input v-model="currentChallenge.memLimit" oninput="value=value.replace(/[^0-9.]/g,'')"
                                placeholder="128(单位 Mb)" />
                        </el-form-item>
                        <el-form-item label="动态FLAG">
                            <el-switch v-model="currentChallenge.isDynamicFlag" inline-prompt active-color="#13ce66"
                                inactive-color="#ff4949" active-text="是" inactive-text="否" />
                        </el-form-item>
                        <div v-if="currentChallenge.isDynamicFlag">
                            <el-form-item label="FLAG前缀" prop="flagPrefix">
                                <el-input v-model="currentChallenge.flagPrefix"></el-input>
                            </el-form-item>
                        </div>
                        <div v-else>
                            <el-form-item label="FLAG" prop="flag">
                                <el-input v-model="currentChallenge.flag"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <el-form-item label="FLAG" prop="flag" v-else>
                        <el-input v-model="currentChallenge.flag"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="题目分类" prop="tid">
                        <el-select v-model="currentChallenge.tid" placeholder="Select">
                            <el-option v-for="item in challengeTypes" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否公开" label-width="85px">
                        <el-switch v-model="currentChallenge.exposed" inline-prompt active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否" />
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="技术标签">
                        <el-cascader-panel v-model="currentChallenge.tags" :options="tagOptions" class="tag-panel"
                            :props="props" :show-all-levels="false" />
                    </el-form-item>

                </el-col>
            </el-row>

            <el-row class="foot">
                <el-button @click="$router.go(-1)">Back</el-button>
                <el-button type="primary" @click="challengeSubmit">Confirm</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import {UploadFilled} from '@element-plus/icons-vue'
    import { saveChallenge } from "@/api/challenge";
    import {download, removeFile} from "@/api/file";
    import { ElMessage } from 'element-plus'
    import {getChaTagAndTypeForAdmin} from "@/api/chaTag";
    import {getAllType} from "@/api/chaType";
    import {inject} from 'vue'
    import { getToken } from '../../../utils/auth';

    export default {
        name: "AddChallengeView",
        components: {
            UploadFilled
        },
        data() {
            return {
                inject,
                props: {
                    multiple: true,
                    checkStrictly: true,
                },
                challengeTypes: [],
                currentChallenge: {
                    cname: '',
                    descr: '',
                    tid: 1,
                    exposed: true,
                    tags: [],
                    fid: null,
                    score: 0,
                    flag: '',
                    fname: null,
                    isDynamic: false,
                    imageName: null,
                    srcPort: null,
                    cpuLimit: null,
                    memLimit: null,
                    isDynamicFlag: false
                },
                rules: {
                    imageName: [
                        {
                            required: true,
                            message: '镜像名不能为空',
                            trigger: 'blur',
                        }
                    ],
                    srcPort: [
                        {
                            required: true,
                            message: '端口不能为空',
                            trigger: 'blur',
                        },
                    ],
                    cname: [
                        {
                            required: true,
                            message: '名称不能为空',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 20,
                            message: '长度需要在1-20之间',
                            trigger: 'blur',
                        },
                    ],
                    score: [
                        {
                            required: true,
                            message: '分值不能为空',
                            trigger: 'blur',
                        },
                        {
                            type: 'number',
                            message: '分值必须是数字类型',
                            trigger: 'blur',
                        },
                        {
                            validator: this.checkScore,
                            trigger: 'blur',
                        }
                    ],
                    flag: [
                        {
                            required: true,
                            message: 'flag不能为空',
                            trigger: 'blur',
                        }
                    ],
                    tid: [
                        {
                            required: true,
                            message: '类型不能为空',
                            trigger: 'change',
                        }
                    ],
                },
                tagOptions: [],
                loading: false,
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            }
        },
        methods: {
            challengeSubmit() {
                this.$refs.myForm.validate((vRes) => {
                    if (vRes) {
                        this.saveChallenge()
                    }
                })
            },
            saveChallenge() {
                this.loading = true
                let tags = this.currentChallenge.tags
                for (let index1 in tags) {
                    tags[index1] = tags[index1][tags[index1].length - 1]
                }
                saveChallenge(this.currentChallenge).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        ElMessage({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.$router.push({ name: 'challengeManager'})
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
                }).finally(() => { this.loading = false })
            },
            removeFileSubmit() {
                // 删除服务端文件后把文件id置为0
                removeFile(this.currentChallenge.fid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.flushFile()
                    } else {
                        this.flushFile()
                    }
                })
            },
            /**
             * 上传文件
             * @param res
             * @param file
             * @param fileList
             */
            uploadFile(res, file, fileList) {
                if (res.flag === true) {    //成功则存储文件id
                    this.currentChallenge.fid = res.data
                    this.currentChallenge.fname = file.name
                } else { // 失败则警告
                    this.flushFile()
                    ElMessage({
                        message: `${file.name} 上传失败 请重试`,
                        type: 'error',
                    })
                    fileList.splice(fileList.findIndex((item) => item === file), 1)
                }
            },
            /**
             * 填充标签选项
             */
            setTagOptions() {
                this.loading = true
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
                            }
                            this.tagOptions.push(item)
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                }).finally(() => { this.loading = false })
            },
            /**
             * 校验分值范围
             * @param rule
             * @param value
             * @param callback
             */
            checkScore(rule, value, callback) {
                if (value < 0 || value > 10000) {
                    callback(new Error('分值必须在0-10000之间'))
                } else {
                    callback()
                }
            },
            flushFile() {
                this.currentChallenge.fid = null;
                this.currentChallenge.fname = null
            },
            previewFile() {
                download(this.currentChallenge.fid).catch((error) => {
                    console.log(error)
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            },
            getTypes() {
                this.loading = true
                getAllType().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        let types = res.data.data
                        for (let index in types) {
                            this.challengeTypes.push({
                                label: this.toFirstUpper(types[index].tname),
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
            toFirstUpper(value) {
                return value.slice(0, 1).toUpperCase() + value.slice(1)
            }
        },
        mounted() {
            this.getTypes()
            this.setTagOptions()
        }
    }
</script>

<style scoped>
    .tag-panel {
        background-color: white;
    }
    .foot {
        margin-left: 104px;
    }
</style>
