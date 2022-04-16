<template>
    <div>
        <div class="card card-stats">

            <div :class="'card-header card-header-'+theme+' card-header-icon btn-div'" data-header-animation="true" @click="enterTrouble">
                <div class="card-icon">
                    <b>{{icon}}</b>
                </div>
                <p class="card-category my-title">{{info.cname}}</p>
                <div class="card-category myBetween">
                    <span class="score-cls">
                        <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"></path></svg>
                        {{info.score}}
                    </span>
                    <span>
                        已解决：<b>{{info.finishedNum}}</b>
                    </span>

                </div>
            </div>

            <div class="card-footer">
                <div class="stats">
                    ID: <span>{{info.cid}}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ChaCard",
        props: {
            info: Object
        },
        data() {
            return {
                checked: false
            }
        },
        computed: {
            theme() {
                switch (this.info.tname) {
                    case 'web':
                        return 'info'
                    case 'pwn':
                        return 'warning'
                    case 're':
                        return 'yellow'
                    case 'crypto':
                        return 'success'
                    case 'misc':
                        return 'primary'
                    case 'other':
                        return 'danger'
                    default:
                        return 'danger'
                }
            },
            icon() {
                switch (this.info.tname) {
                    case 'web':
                        return 'W'
                    case 'pwn':
                        return 'P'
                    case 're':
                        return 'R'
                    case 'crypto':
                        return 'C'
                    case 'misc':
                        return 'P'
                    case 'new':
                        return 'N'
                    default:
                        return 'O'
                }
            }
        },
        methods: {
            enterTrouble() {
                this.$router.push({ name: 'trouble', params: { cid: this.info.cid } })
            }
        }
    }
</script>

<style scoped>
    .svg-icon {
        width: 2.4rem;
        height: 2.4rem;
        fill: currentColor;
        color: black;
        overflow: hidden;
    }
    .card-header-yellow {
        box-shadow:0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(200, 255, 41, 0.62);
    }
    .score-cls {
        display: flex;
        align-items: center;
        font-weight: bolder;
        font-size: 20px;
    }
    .myBetween {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .card{font-size:.875rem;}
    *,*::before,*::after{box-sizing:border-box;}
    p{margin-top:0;margin-bottom:1rem;}
    b{font-weight:bolder;}
    @media print{
        *,*::before,*::after{text-shadow:none!important;box-shadow:none!important;}
        p{orphans:3;widows:3;}
    }
    *,*::before,*::after{box-sizing:border-box;}
    p{margin-top:0;margin-bottom:1rem;}
    b{font-weight:bolder;}
    .card{position:relative;display:flex;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:1px solid #eeeeee;border-radius:0.25rem;}
    .card-header{padding:0.75rem 1.25rem;margin-bottom:0;background-color:#fff;border-bottom:1px solid #eeeeee;}
    .card-header:first-child{border-radius:calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;}
    .card-footer:last-child{border-radius:0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);}
    html *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
    *{-webkit-tap-highlight-color:rgba(255, 255, 255, 0);-webkit-tap-highlight-color:transparent;}
    *:focus{outline:0;}
    .card{border:0;margin-bottom:30px;margin-top:30px;border-radius:6px;color:#333333;background:#fff;width:100%;box-shadow:0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);}
    .card .card-category:not([class*="text-"]){color:#000000;}
    .card .card-category{margin-top:10px;}
    .my-title{font-size: 1.3rem;height: 4.6rem;font-weight: bold;}
    .card .card-footer{display:flex;align-items:center;background-color:transparent;border:0;}
    .card .card-footer .stats{display:inline-flex;}
    .card .card-footer .stats{color:#000000;}
    .card .card-header{border-bottom:none;background:transparent;}
    .card .card-header-warning .card-icon{background:linear-gradient(60deg, #ffa726, #fb8c00);}
    .card .card-header-warning .card-icon{box-shadow:0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4);}
    .card [class*="card-header-"]{color:#fff;}
    .card [class*="card-header-"] .card-category{color:rgba(255, 255, 255, 0.8);}
    .card{box-shadow:0 1px 4px 0 rgba(0, 0, 0, 0.14);}
    .card .card-header{z-index:3!important;}
    .card .card-header .card-category{margin:0;}
    .card .card-footer{padding:0;padding-top:10px;margin:0 15px 10px;border-radius:0;justify-content:space-between;align-items:center;}
    .card .card-footer .stats{color:#000000;font-size:12px;line-height:22px;}
    .card [class*="card-header-"]{margin:0px 15px 0;padding:0;position:relative;}
    .card [class*="card-header-"] .card-icon{border-radius:3px;background-color: #efef02;padding:0;margin-top:-20px;margin-right:15px;float:left;width: 30%;height: 30%;text-align: center;}
    .card-stats .card-header.card-header-icon{text-align:right;}
    .card-stats .card-header .card-icon + .card-category{padding-top:10px;}
    .card-stats .card-header.card-header-icon .card-category{margin:0;}
    .card-stats .card-header .card-category{margin-bottom:0;margin-top:0;}
    .card-stats .card-header .card-category:not([class*="text-"]){color:#000000;}
    .card-stats .card-header + .card-footer{border-top:1px solid #eee;}
    p{margin-top:0;margin-bottom:1rem;}
    p{margin-bottom:1rem;}
    *,::after,::before{box-sizing:border-box;}
    .card{font-size:.875rem;}
    @media print{
        *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
        p{orphans:3;widows:3;}
    }
    .btn:focus,.btn:hover{text-decoration:none;}
    b{font-weight:bolder;}
    .card{position:relative;display:flex;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;}
    .card-header{padding:.75rem 1.25rem;background-color:#fff;}
    .card-header{margin-bottom:0;}
    .card-header{border-bottom:1px solid rgba(0, 0, 0, .12);}
    .card-header:first-child{border-radius:calc(.25rem - 1px) calc(.25rem - 1px) 0 0;}
    .card-footer{border-top:1px solid rgba(0, 0, 0, .12);}
    .card-footer:last-child{border-radius:0 0 calc(.25rem - 1px) calc(.25rem - 1px);}
    *{-webkit-tap-highlight-color:rgba(255, 255, 255, 0);-webkit-tap-highlight-color:transparent;}
    :focus{outline:0;}
    html *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
    p{font-size:14px;margin:0 0 10px;}
    b{font-weight:700;}
    .card{border:0;margin-bottom:30px;margin-top:30px;border-radius:6px;color:rgba(0, 0, 0, .87);background:#fff;width:100%;box-shadow:0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);}
    .card .card-category:not([class*=text-]),.card .card-footer .stats{color:#999;}
    .card .card-category{margin-top:10px;}
    .card .card-footer{display:flex;align-items:center;background-color:transparent;border:0;}
    .card .card-footer .stats{display:inline-flex;}
    .card [class*=header-]{color:#fff;}
    .card .card-header{border-radius:3px;padding:1rem 15px;margin-left:15px;margin-right:15px;margin-top:-30px;border:0;background:linear-gradient(60deg, #cee832, #e5f505);}
    .card .card-header-warning{background:linear-gradient(60deg, #ffa726, #f57c00);}
    .card .card-header-warning{box-shadow:0 5px 20px 0 rgba(0, 0, 0, .2), 0 13px 24px -11px rgba(255, 152, 0, .6);}
    .card [class*=header-] .card-category{color:rgba(255, 255, 255, .8);}
    .card-stats .card-header.card-header-icon b{font-size:1.5rem;text-align:center;}
    .card-stats .card-header.card-header-icon i{font-size:2rem;text-align:center;}
    .card .card-header-success {
        box-shadow: 0 5px 20px 0 rgb(0 0 0 / 20%), 0 13px 24px -11px rgb(76 175 80 / 60%);
    }
    .card .card-header-success {
        background: linear-gradient(
                60deg, #66bb6a, #388e3c);
    }
    .card .card-header-danger {
        box-shadow: 0 5px 20px 0 rgb(0 0 0 / 20%), 0 13px 24px -11px rgb(244 67 54 / 60%);
    }
    .card .card-header-danger {
        background: linear-gradient(
                60deg, #ef5350, #d32f2f);
    }
    .card .card-header-info {
        box-shadow: 0 5px 20px 0 rgb(0 0 0 / 20%), 0 13px 24px -11px rgb(0 188 212 / 60%);
    }
    .card .card-header-info {
        background: linear-gradient(
                60deg, #26c6da, #0097a7);
    }
    .card .card-header-info .card-icon {
        box-shadow: 0 4px 20px 0px rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 188 212 / 40%);
    }
    .card .card-header-info .card-icon {
        background: linear-gradient(
                60deg, #26c6da, #00acc1);
    }
    .card .card-header-success .card-icon {
        box-shadow: 0 4px 20px 0px rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(76 175 80 / 40%);
    }
    .card .card-header-success .card-icon {
        background: linear-gradient(
                60deg, #66bb6a, #43a047);
    }
    .card .card-header-danger .card-icon {
        box-shadow: 0 4px 20px 0px rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(244 67 54 / 40%);
    }
    .card .card-header-danger .card-icon {
        background: linear-gradient(
                60deg, #ef5350, #e53935);
    }
    .card .card-header-primary .card-icon {
        box-shadow: 0 4px 20px 0px rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 40%);
    }
    .card .card-header-primary .card-icon {
        background: linear-gradient(
                60deg, #ab47bc, #8e24aa);
    }
    .card .card-header-primary {
        box-shadow: 0 5px 20px 0 rgb(0 0 0 / 20%), 0 13px 24px -11px rgb(156 39 176 / 60%);
    }
    .card-header:first-child {
        border-radius: 0.75rem 0.75rem 0 0;
    }
    .card .card-header-primary {
        background: linear-gradient(
                60deg, #ab47bc, #7b1fa2);
    }
    .card [data-header-animation="true"] {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1);
    }
    .card:hover [data-header-animation="true"] {
        -webkit-transform: translate3d(0, -20px, 0);
        transform: translate3d(0, -20px, 0);
    }
    div >>> .btn-div {
        cursor: pointer;
    }
</style>