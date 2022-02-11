<template>
    <div>
        <WPHeader class="mb-3" :wp-info="wpInfo"></WPHeader>
        <BodyCard>
            <md-editor class="text-start" v-model="wpInfo.text" preview-theme="github" previewOnly/>
        </BodyCard>
    </div>
</template>

<script>
    import MdEditor from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    import BodyCard from "@/components/card/BodyCard";
    import WPHeader from "@/components/writeup/WPHeader";
    import {getWriteupByWidForUser} from "@/api/writeup";
    import {ElMessage} from "element-plus";

    var sep = ' '
    export default {
        name: "WPUserViewCard",
        components: {WPHeader, BodyCard, MdEditor },
        props: {
            wid: Number
        },
        data() {
            return {
                wpInfo: {
                    wpTags: []
                }
            }
        },
        methods: {
            getWriteupByWidForUser() {
                getWriteupByWidForUser(this.wid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.wpInfo = res.data.data
                        this.wpInfo.wpTags = this.wpInfo.wpTags.split(sep)
                    }
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
            }
        },
        mounted() {
            this.getWriteupByWidForUser()
        }
    }
</script>

<style scoped>

</style>