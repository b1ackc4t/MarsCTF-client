<template>
    <div class="edit-padding" style="width: 100%;">
        <v-md-editor
                v-model="value"
                height="500px"
                :disabled-menus="[]"
                @upload-image="uploadImage"
        >

        </v-md-editor>
    </div>

</template>

<script>
    import {inject} from 'vue'
    import {ElMessage} from "element-plus";

    export default {
        name: "MDEditor",
        props: {
            modelValue: Array,
            uploadImageFunc: Function

        },
        data() {
            return {
                server:null
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
            uploadImage(event, insertImage, files) {
                for (let index in files) {
                    this.uploadImageFunc(files[index]).then((res) => {
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