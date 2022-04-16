<template>
    <div>
        <ul class="list-group">
            <li v-for="notice in notices" :key="notice.nid" class="list-group-item border-0 d-flex flex-column p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex bet">
                    <h5 class="mb-3">{{notice.title}}</h5>
                    <span>
                        <a class="btn btn-link text-info text-gradient px-3 py-0 mb-0" href="javascript:;" @click="enterNotice(notice.nid)">
                            <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"></path></svg>
                            查看详情
                        </a>
                    </span>
                </div>
                <div class="text-start">
                    <span class="text-dark font-weight-bold ms-sm-2">{{notice.descr.substr(0, 80)}}</span>

                </div>


            </li>

        </ul>
    </div>
</template>

<script>
    import {getNoticePage} from "@/api/notice";
    import {ElMessage} from "element-plus";

    export default {
        name: "NoticeList",
        data() {
            return {
                notices: []
            }
        },
        props: {
            user: Object
        },
        methods: {
            getNoticePage() {
                getNoticePage(4, 1).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.notices = res.data.data.list
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
            enterNotice(nid) {
                if (this.user != null) {
                    this.$router.push({
                        name: 'viewNotice',
                        params: {
                            nid: nid
                        }
                    })
                } else {
                    ElMessage({
                        message: "请先登录",
                        type: 'warning',
                    })
                }

            }
        },
        mounted() {
            this.getNoticePage()
        }
    }
</script>

<style scoped>
    .bet {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .svg-icon {
        width: 1.6em;
        height: 1.6em;
        fill: currentColor;
        color: deepskyblue;
        overflow: hidden;
    }
</style>