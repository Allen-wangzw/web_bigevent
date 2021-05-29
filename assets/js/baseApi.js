$(function () {
    $.ajaxPrefilter(function (options) {
        //发起ajax请求之前会统一拼接请求的根路径
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // console.log(options.url);
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // options.complete = function (res) {
        //     if (res.responseJSON.status === 1 || res.responseJSON.message === "身份认证失败!") {
        //         //如果身份认证失败就强制返回登录模块并且清空本地存储令牌
        //         localStorage.removeItem('token')
        //         location.href = 'login.html'
        //     }
        // }
    })
})