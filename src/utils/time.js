function fillZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

/**
 * 实时时间转换指令，大于一个月则返回具体的年月日
 * @param { string } timeStamp - 时间 格式：年-月-日 时:分:秒 或 时间戳
 * @returns { string }
 */
function getFormatTimeForRank(timeStamp){
    var dateTime = new Date(timeStamp);
    var no1new = dateTime.valueOf();
    // var year = dateTime.getFullYear();
    // var month = dateTime.getMonth() + 1;
    // var day = dateTime.getDate();
    // var hour = dateTime.getHours();
    // var minute = dateTime.getMinutes();
    // var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = now.valueOf();
    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - no1new;

    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
    }else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 30) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    }else if (milliseconds > 1000 * 60 * 60 * 24 * 30 && milliseconds <= 1000 * 60 * 60 * 24 * 30 * 12) {
        // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 30)) + '月前';
    }else {
        // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 30 * 12)) + '年前';
    }

    return timeSpanStr;
}

function getFormatTimeForArticle(timeStamp){
    var dateTime = new Date(timeStamp);
    var no1new = dateTime.valueOf();
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    month = fillZero(month, 2);
    var day = dateTime.getDate();
    day = fillZero(day, 2);
    var hour = dateTime.getHours();
    hour = fillZero(hour, 2);
    var minute = dateTime.getMinutes();
    minute = fillZero(minute, 2);
    var second = dateTime.getSeconds();
    second = fillZero(second, 2);
    var now = new Date();
    var now_new = now.valueOf();
    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - no1new;

    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
    }else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    return timeSpanStr;
}

export {getFormatTimeForRank, getFormatTimeForArticle}
