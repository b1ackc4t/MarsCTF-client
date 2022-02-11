<template>
    <div class="row align-items-end">
        <div class="col-md-10">
            <div class="input-group input-group-static mb-4">
                <label for="exampleFormControlSelect1" class="ms-0">类型选择</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option v-for="tag in tags" :key="tag.tgid">{{tag.tgname}}</option>
                </select>
            </div>
        </div>
        <div class="col-md">
            <button type="button" class="btn btn-outline-primary">查看</button>
        </div>
    </div>
</template>

<script>
    import {getChaTagsByType, getChaTags} from "@/api/chaTag";
    import { ElMessage } from 'element-plus'

    export default {
        name: "SubTypeSelect",
        props: {
            type: String
        },
        data() {
            return {
                tags: {}
            }
        },
        methods: {
            getTags() {
                if (this.type != null) {
                    getChaTagsByType(this.type).then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            this.tags = res.data.data
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
                } else {
                    getChaTags().then((res) => {
                        if (res.status === 200 && res.data.flag === true) {
                            this.tags = res.data.data
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
                }

            }
        },
        mounted() {
            this.getTags()
        }
    }
</script>

<style scoped>

</style>