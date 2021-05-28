$(function () {
    $.ajaxPrefilter(function (options) {
        //发起ajax请求之前会统一拼接请求的根路径
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // console.log(options.url);
    })
})