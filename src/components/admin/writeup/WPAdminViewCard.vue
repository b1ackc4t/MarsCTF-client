<template>
    <div>
        <WPHeader class="mb-3" :wp-info="wpInfo"></WPHeader>
        <BodyCard>
            <div class="text-start">
                <v-md-editor
                        v-model="wpInfo.text"
                        mode="preview"
                >
                </v-md-editor>
            </div>
        </BodyCard>
    </div>
</template>

<script>
    import BodyCard from "@/components/card/BodyCard";
    import WPHeader from "@/components/writeup/WPHeader";
    import {getWriteupByWidForAdmin} from "@/api/writeup";
    import {ElMessage} from "element-plus";

    var sep = ' '
    export default {
        name: "WPAdminViewCard",
        components: {WPHeader, BodyCard},
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
            getWriteupByWidForAdmin() {
                getWriteupByWidForAdmin(this.wid).then((res) => {
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
            this.getWriteupByWidForAdmin()
        }
    }
</script>

<style scoped>

</style>