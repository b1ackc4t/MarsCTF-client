<template>
    <div class="col-3">
        <div class="card">
            <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                    <i class="material-icons opacity-10">account_circle</i>
                </div>
                <div class="text-end pt-1">
                    <router-link to="/editUserInfo"><a href="#"><i class="material-icons opacity-10">edit</i></a></router-link>
                </div>
            </div>
            <div class="card-body text-start">
                <h4>基本简介</h4>
                <p class="fw-normal">昵称：<span class="fw-bolder">{{uname}}</span></p>
                <p class="fw-normal">性别：<span class="fw-bolder">{{sex}}</span></p>
                <p class="fw-normal">技能：<span class="fw-bolder">{{skill}}</span></p>
                <p class="fw-normal">学校/单位：<span class="fw-bolder">{{unit}}</span></p>
                <p class="fw-normal">签名：<span class="fw-bolder">{{sign}}</span></p>

            </div>
        </div>
    </div>
    <div class="col-3">
        <div class="card">
            <div class="card-body p-3 pt-2 bg-transparent mx-3 z-index-2">
                <div id="chart1" style="height:300px;"></div>

            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="card">
            <div class="card-body p-3 pt-2 bg-transparent mx-3 z-index-2 h-100">
                <div class="chart h-100">
                    <div id="chart2" style="height:300px;"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: "UserInfo",
        props: {
            user: Object
        },
        data() {
            return {
                uname: "",
                sex: "",
                skill: "",
                unit: "",
                sign: ""
            }
        },
        watch: {
            user: function () {
                if (this.user != null) {
                    this.uname = "uname" in this.user ? this.user.uname : ""
                    if ("sex" in this.user) {
                        this.sex = this.user.sex ? "女" : "男"
                    }
                    this.skill = "skill" in this.user ? this.user.skill : ""
                    this.unit = "unit" in this.user ? this.user.unit : ""
                    this.sign = "sign" in this.user ? this.user.sign : ""
                }

            }
        },
        mounted() {
            var myChart = echarts.init(document.getElementById('chart1'))
            // 指定图表的配置项和数据
            var option = {
                color: ['#FFE434'],
                title: {
                    text: 'CTF技能雷达'
                },
                legend: {
                    top: "10%"
                },
                tooltip: {

                },
                radar: {
                    indicator: [
                        { text: 'Web',max: 100 },
                        { text: 'Pwn',max: 100 },
                        { text: 'Re',max: 100 },
                        { text: 'Crypto',max: 100 },
                        { text: 'Misc',max: 100 },
                        { text: 'New',max: 100 },
                    ],
                    center: ['50%', '60%'],
                    radius: 90,
                    splitNumber: 4,
                    // shape: 'circle',
                    axisName: {
                        formatter: '{value}',
                        color: '#428BD4'
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(211, 253, 250, 0.8)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(211, 253, 250, 0.8)'
                        }
                    }
                },
                series: {
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                            width: 4
                        }
                    },
                    data: [
                        {
                            value: [80, 40, 30, 40, 20, 39],
                            name: 'b1ackc4t',
                            areaStyle: {
                                color: 'rgba(255, 228, 52, 0.6)'
                            }
                        }
                    ]
                }
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            var myChart2 = echarts.init(document.getElementById('chart2'));
            var app = {};
            const posList = [
                'left',
                'right',
                'top',
                'bottom',
                'inside',
                'insideTop',
                'insideLeft',
                'insideRight',
                'insideBottom',
                'insideTopLeft',
                'insideTopRight',
                'insideBottomLeft',
                'insideBottomRight'
            ];
            app.configParameters = {
                rotate: {
                    min: -90,
                    max: 90
                },
                align: {
                    options: {
                        left: 'left',
                        center: 'center',
                        right: 'right'
                    }
                },
                verticalAlign: {
                    options: {
                        top: 'top',
                        middle: 'middle',
                        bottom: 'bottom'
                    }
                },
                position: {
                    options: posList.reduce(function (map, pos) {
                        map[pos] = pos;
                        return map;
                    }, {})
                },
                distance: {
                    min: 0,
                    max: 100
                }
            };
            app.config = {
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
                onChange: function () {
                    const labelOption = {
                        rotate: app.config.rotate,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        position: app.config.position,
                        distance: app.config.distance
                    };
                    myChart.setOption({
                        series: [
                            {
                                label: labelOption
                            },
                            {
                                label: labelOption
                            }
                        ]
                    });
                }
            };
            const labelOption = {
                show: true,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {}
                }
            };
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                title: {
                    text: '当前挑战情况统计'
                },
                grid: {
                    top: '15%',
                    bottom: '10%',
                },
                legend: {
                    data: ['已解决', '总挑战']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: { show: true },
                        magicType: { show: true, type: ['line', 'bar', 'stack'] },
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: { show: false },
                        data: ['Web', 'Pwn', 'Re', 'Crypto', 'Misc', 'New']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '已解决',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [320, 332, 301, 334, 390, 100]
                    },
                    {
                        name: '总挑战',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 182, 191, 234, 290, 200]
                    }
                ]
            };
            myChart2.setOption(option);

            if (this.user != null) {
                this.uname = "uname" in this.user ? this.user.uname : ""
                if ("sex" in this.user) {
                    this.sex = this.user.sex ? "女" : "男"
                }
                this.skill = "skill" in this.user ? this.user.skill : ""
                this.unit = "unit" in this.user ? this.user.unit : ""
                this.sign = "sign" in this.user ? this.user.sign : ""
            }
        }
    }
</script>

<style scoped>

</style>