<template>
    <div v-if="wpInfo != null">
        <WPHeader class="mb-3" :wp-info="wpInfo" :is-me="isMe"></WPHeader>
        <BodyCard class="mb-3">
            <div class="text-start">
                <v-md-editor
                        v-model="wpInfo.text"
                        mode="preview"
                >
                </v-md-editor>
            </div>

        </BodyCard>
        <WPCheckComment v-if="isMe" :comment="wpInfo.comment"></WPCheckComment>
    </div>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import WPHeader from "@/components/writeup/WPHeader";
    import {getWriteupByWidForUser, getWriteupByWidForMe} from "@/api/writeup";
    import {ElMessage} from "element-plus";
    import WPCheckComment from "@/components/writeup/WPCheckComment";

    var sep = ' '
    export default {
        name: "WPUserViewCard",
        components: {WPCheckComment, WPHeader, BodyCard },
        props: {
            wid: Number,
            isMe: Boolean
        },
        data() {
            return {
                wpInfo: null
            }
        },
        methods: {
            getWriteupByWidForUser() {
                getWriteupByWidForUser(this.wid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.wpInfo = res.data.data
                        this.wpInfo.wpTags = this.wpInfo.wpTags.split(sep)
                    }
                    this.$emit("load0")
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.$emit("load0")
                })
            },
            getWriteupByWidForMe() {
                getWriteupByWidForMe(this.wid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.wpInfo = res.data.data
                        this.wpInfo.wpTags = this.wpInfo.wpTags.split(sep)
                    }
                    this.$emit("load0")
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.$emit("load0")
                })
            }
        },
        mounted() {
            if (this.isMe) {
                this.getWriteupByWidForMe()
            } else {
                this.getWriteupByWidForUser()
            }

        }
    }
</script>

<style scoped>

</style>