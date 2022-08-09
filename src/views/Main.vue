<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="row mb-4 pt-4">
            <div class="col-3">
                <NumCard title="题目数" :value="infoCount.chaNum"></NumCard>
            </div>
            <div class="col-3">
                <NumCard title="教学数" :value="infoCount.learningNum"></NumCard>
            </div>
            <div class="col-3">
                <NumCard title="用户数" :value="infoCount.userNum"></NumCard>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <ChartCard title="平台题目分布情况" head-color="success">
                    <div id="myChart" class="chart" style="height:250px;">
                    </div>
                </ChartCard>
            </div>

        </div>
        <div class="row mb-3">
            <div class="col-7">
                <SimpleCard title="公告" head-color="info">
                    <Notice :user="user"></Notice>
                </SimpleCard>
            </div>
            <div class="col-5">
                <SimpleCard title="排行榜" head-color="danger">
                    <Ranking :user="user"></Ranking>
                </SimpleCard>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleCard from '../components/card/Simple1'
    import Ranking from '../components/table/Ranking'
    import ChartCard from '../components/card/Simple2'
    import {init} from 'echarts';
    import NumCard from '../components/card/Simple3'
    import Notice from '../components/table/NoticeList'
    import {getInfoCount, getChaCountByType} from "@/api/stat";
    import {ElMessage} from "element-plus";

    export default {
        name: "Main",
        components: {
            SimpleCard,
            Ranking,
            ChartCard,
            NumCard,
            Notice
        },
        props: {
            user: Object
        },
        data() {
            return {
                infoCount: {
                    chaNum: null,
                    learningNum: null,
                    userNum: null
                },
                type: ['Web', 'Pwn', 'Re', 'Crypto', 'Misc', 'Other'],
                typeNum: [],
                loads: [true, true],
            }
        },
        computed: {
            loading() {
                let tmp = false
                for (let index in this.loads) {
                    tmp |= this.loads[index]
                }
                return tmp
            }
        },
        methods: {
            getInfoCount() {
                this.loads[1] = true
                getInfoCount().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        this.infoCount = res.data.data
                    }
                    this.loads[1] = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loads[1] = false
                })
            },
            getChaCountByType() {
                this.loads[0] = true
                getChaCountByType().then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        let chaType = res.data.data
                        for (let index in this.type) {
                            this.typeNum.push(chaType[this.type[index].toLowerCase() + "Num"])
                        }
                        var myChart = init(document.getElementById('myChart'));
                        document.getElementById('myChart').setAttribute('_echarts_instance_', '')
                        var option
                        option = {
                            tooltip: {
                            },
                            xAxis: {
                                type: 'category',
                                data: this.type,
                                axisLabel: {
                                    textStyle: {
                                        show:true,
                                        fontFamily:'微软雅黑',
                                        color: "#fff",
                                        fontSize: '30',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: "rgba(255, 255, 255, 1)",
                                        width: 2
                                    }
                                }
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    textStyle: {
                                        show:true,
                                        fontFamily:'微软雅黑',
                                        color: "#fff",
                                        fontSize: '30',
                                    },
                                }
                            },
                            series: [
                                {
                                    data: this.typeNum,
                                    type: 'bar',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    barMaxWidth: '20%',
                                    itemStyle: {
                                        barBorderRadius: 5,
                                        borderWidth: 1,
                                        borderType: 'solid',
                                        borderColor: '#73c0de',
                                        shadowColor: '#5470c6',
                                        shadowBlur: 3
                                    }
                                }
                            ]
                        };

                        option && myChart.setOption(option);
                    }
                    this.loads[0] = false
                }).catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                    this.loads[0] = false
                })
            }
        },
        mounted() {
            this.getInfoCount()
            this.getChaCountByType()

        }
    }
</script>

<style scoped>

</style>