<template>
    <div class="col-3">
        <div class="card">
            <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute middle">
                    <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"></path></svg>
                </div>
                <div class="text-end pt-1">
                    <router-link to="/editUserInfo" v-if="isMe"><a href="#">
                        <svg class="svg-icon2" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z" fill="currentColor"></path></svg>
                    </a></router-link>
                    <a v-else>
                        <svg class="svg-icon2" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"></path></svg>
                    </a>
                </div>
            </div>
            <div class="card-body text-start">
                <h4>基本简介</h4>
                <div class="fw-normal">段位：<el-tag class="ml-2" :type="rankColor"><span class="fw-bolder">{{title}}</span></el-tag></div>
                <div class="fw-normal">昵称：<span class="fw-bolder">{{uname}}</span></div>
                <div class="fw-normal">性别：<span class="fw-bolder">{{sex}}</span></div>
                <div class="fw-normal">技能：<span class="fw-bolder">{{skill}}</span></div>
                <div class="fw-normal">学校/单位：<span class="fw-bolder">{{unit}}</span></div>
                <div class="fw-normal">积分：<span class="fw-bolder">{{score}}</span></div>
                <div class="fw-normal">签名：<span class="fw-bolder">{{sign}}</span></div>

            </div>
        </div>
    </div>
    <div class="col-3">
        <div class="card">
            <div class="card-body p-3 pt-2 bg-transparent mx-3 z-index-2" style="overflow-x: auto">
                <div id="chart1" style="height:300px;"></div>

            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="card">
            <div class="card-body p-3 pt-2 bg-transparent mx-3 z-index-2 h-100" style="overflow-x: auto">
                <div class="chart h-100">
                    <div id="chart2" style="height:300px;"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {init} from 'echarts';
    import {getScoreChart} from "@/api/score";
    import {ElMessage} from "element-plus";

    export default {
        name: "UserInfo",
        props: {
            user: Object,
            isMe: Boolean
        },
        data() {
            return {
                uname: "",
                sex: "",
                skill: "",
                unit: "",
                sign: "",
                userScore: [0, 0, 0, 0, 0, 0],
                allScore: [0, 0, 0, 0, 0, 0],
                myMax: 0,
                score: 0,
                rankColor: 'info',
                title: ""
            }
        },
        methods: {
            getIndex(tname) {
                switch (tname) {
                    case 'web':
                        return 0
                    case 'pwn':
                        return 1
                    case 're':
                        return 2
                    case 'crypto':
                        return 3
                    case 'misc':
                        return 4
                    default:
                        return 5
                }
            },
            getScoreChart() {
                getScoreChart(this.user.uid).then((res) => {
                    if (res.status === 200 && res.data.flag === true) {
                        let uScore = res.data.data[0]
                        let aScore = res.data.data[1]
                        for (let index in uScore) {
                            this.userScore[this.getIndex(uScore[index].tname)] += uScore[index].totalScore
                        }
                        for (let index in aScore) {
                            this.allScore[this.getIndex(aScore[index].tname)] += aScore[index].totalScore
                        }
                        this.myMax = Math.max.apply(null, this.userScore) + 100
                        this.drawChart()
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
            drawChart() {
                var myChart = init(document.getElementById('chart1'))
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
                            { text: 'Web',max: this.myMax },
                            { text: 'Pwn',max: this.myMax },
                            { text: 'Re',max: this.myMax },
                            { text: 'Crypto',max: this.myMax },
                            { text: 'Misc',max: this.myMax },
                            { text: 'Other',max: this.myMax },
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
                                value: this.userScore,
                                name: this.user.uname,
                                areaStyle: {
                                    color: 'rgba(255, 228, 52, 0.6)'
                                }
                            }
                        ]
                    }
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                var myChart2 = init(document.getElementById('chart2'));
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
                        data: ['总挑战', '已解决']
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
                            data: ['Web', 'Pwn', 'Re', 'Crypto', 'Misc', 'Other']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '总挑战',
                            type: 'bar',
                            barGap: 0,
                            label: labelOption,
                            emphasis: {
                                focus: 'series'
                            },
                            data: this.allScore
                        },
                        {
                            name: '已解决',
                            type: 'bar',
                            label: labelOption,
                            emphasis: {
                                focus: 'series'
                            },
                            data: this.userScore
                        }
                    ]
                };
                myChart2.setOption(option);
            },
            startup() {
                if (this.user != null) {
                    this.uname = "uname" in this.user ? this.user.uname : ""
                    if ("sex" in this.user) {
                        this.sex = this.user.sex ? "女" : "男"
                    }
                    this.skill = "skill" in this.user ? this.user.skill : ""
                    this.unit = "unit" in this.user ? this.user.unit : ""
                    this.sign = "sign" in this.user ? this.user.sign : ""
                    this.score = "score" in this.user ? this.user.score : ""
                    this.title = "title" in this.user ? this.user.title : ""
                    this.level = "level" in this.user ? this.user.level : ""
                    switch (this.level) {
                        case 0:
                            this.rankColor = "info"
                            break
                        case 1:
                            this.rankColor = "success"
                            break
                        case 2:
                            this.rankColor = "primary"
                            break
                        case 3:
                            this.rankColor = "warning"
                            break
                        case 4:
                            this.rankColor = "danger"
                            break
                        default:
                            this.rankColor = "danger"
                            break

                    }
                    this.getScoreChart()
                }

            }
        },
        watch: {
            user: function () {
                this.startup()
            }
        },
        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>
    .svg-icon {
        width: 1.6em;
        height: 1.6em;
        fill: currentColor;
        color: white;
        overflow: hidden;
    }
    .middle {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .svg-icon2 {
        width: 1.6em;
        height: 1.6em;
        fill: currentColor;
        color: black;
        overflow: hidden;
    }
</style>