<template>
    <div v-loading="loading">
        <div class="formItem mb-3 text-start">
            <el-form
                    label-position="top"
                    label-width="100px"
                    :model="config"
            >

                <el-form-item label="容器返回IP/域名地址">
                    <el-input v-model="config.retDomain" />
                </el-form-item>
                <el-form-item label="Frp配置（用于多机部署）">
                    <el-switch
                            v-model="config.isMulti"
                            inline-prompt
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="是"
                            inactive-text="否"
                    />
                </el-form-item>
                <div v-if="config.isMulti">
                    <h2>Frp配置</h2>
                    <el-form-item label="frpc API地址">
                        <el-input v-model="config.frpcApiHost" />
                    </el-form-item>
                    <el-form-item label="frpc API端口">
                        <el-input v-model="config.frpcApiPort" />
                    </el-form-item>
                    <el-form-item label="frpc API用户名">
                        <el-input v-model="config.frpcApiUser" />
                    </el-form-item>
                    <el-form-item label="frpc API密码">
                        <el-input v-model="config.frpcApiPass" />
                    </el-form-item>
                    <el-form-item label="frpc 配置文件模板">
                        <el-input
                                v-model="config.frpcConfig"
                                :rows="4"
                                type="textarea"
                                placeholder="Please input"
                        />
                    </el-form-item>
                </div>

                <h2 class="mt-3">Docker配置</h2>
                <el-form-item label="docker API地址">
                    <el-input v-model="config.dockerHost" />
                </el-form-item>
                <el-form-item label="开启TLS（需要配置证书）">
                    <el-switch
                            v-model="config.isTls"
                            inline-prompt
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="是"
                            inactive-text="否"
                    />
                </el-form-item>
                <el-form-item label="docker Registry地址">
                    <el-input v-model="config.dockerRegistry" />
                </el-form-item>
                <el-form-item label="docker容器最小端口">
                    <el-input v-model="config.dockerMinPort" />
                </el-form-item>
                <el-form-item label="docker容器最大端口">
                    <el-input v-model="config.dockerMaxPort" />
                </el-form-item>
                <el-form-item label="docker容器启动时长（单位：秒）">
                    <el-input v-model="config.dockerTime" />
                </el-form-item>
                <el-form-item label="docker容器平台同时启动最大数量">
                    <el-input v-model="config.maxContainerCount" />
                </el-form-item>
                <el-form-item label="docker容器用户同时启动最大数量">
                    <el-input v-model="config.userMaxContainer" />
                </el-form-item>
                <el-form-item label="docker容器用户续期次数">
                    <el-input v-model="config.addTimeCount" />
                </el-form-item>
                <el-form-item label="docker容器用户续期时长">
                    <el-input v-model="config.addTimeNum" />
                </el-form-item>
            </el-form>
        </div>
        <div class="text-start">
            <el-button type="success" @click="getDefault">重置默认</el-button>
            <el-button type="primary" @click="updateConfig">应用</el-button>
        </div>
    </div>


</template>

<script>
    import {getPanelConfig, getDefault, updateConfig} from "@/api/panelConfig";
    import {ElMessage} from "element-plus";

    export default {
        name: "PanelConfig",
        data() {
            return {
                config: {
                    isMulti: false
                },
                loading: false
            }
        },
        methods: {
            getPanelConfig() {
                this.loading = true
                getPanelConfig().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.config = res.data.data
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
            getDefault() {
                this.loading = true
                getDefault().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.config = res.data.data
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
            updateConfig() {
                this.loading = true
                updateConfig(this.config).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        ElMessage({
                            message: res.data.msg,
                            type: 'success',

                        })
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: 'warning',

                        })
                    }
                    this.loading = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loading = false
                }).finally(() => { this.loading = false })
            }
        },
        mounted() {
            this.getPanelConfig()
        }
    }
</script>

<style scoped>
    .formItem >>> .el-form-item {
        margin-bottom: 0;
    }
    .formItem >>> .el-form-item__label {
        margin-bottom: 0;
        padding-bottom: 0;
    }
</style>