<template>
    <div>
        <div class="row mb-4 pt-4">
            <div class="col-3">
                <NumCard title="总题目数" value="100"></NumCard>
            </div>
            <div class="col-3">
                <NumCard title="被解决题目数" value="30"></NumCard>
            </div>
            <div class="col-3">
                <NumCard title="总注册人数" value="10086"></NumCard>
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
            <div class="col-6">
                <SimpleCard title="公告" head-color="info">
                    <Notice></Notice>
                </SimpleCard>
            </div>
            <div class="col-4">
                <SimpleCard title="排行榜" head-color="danger">
                    <Ranking></Ranking>
                </SimpleCard>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleCard from '../components/card/Simple1'
    import Ranking from '../components/table/Ranking'
    import ChartCard from '../components/card/Simple2'
    import * as echarts from 'echarts';
    import NumCard from '../components/card/Simple3'
    import Notice from '../components/table/NoticeList'

    export default {
        name: "Main",
        components: {
            SimpleCard,
            Ranking,
            ChartCard,
            NumCard,
            Notice
        },
        mounted() {
            var myChart = echarts.init(document.getElementById('myChart'));
            document.getElementById('myChart').setAttribute('_echarts_instance_', '')
            var option
            option = {
                tooltip: {
                },
                xAxis: {
                    type: 'category',
                    data: ['Web', 'Pwn', 'Re', 'Crypto', 'Misc', 'New'],
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
                        data: [120, 200, 150, 80, 70, 110],
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
    }
</script>

<style scoped>

</style>