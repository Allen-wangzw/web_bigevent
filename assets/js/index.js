$(function () {
    var layer = layui.layer
    //调用获取用户基本信息函数
    getUserInfo()
    //用户点击退出返回登录页面
    $('#btnLogOut').on('click', function () {
        //弹出提示消息框
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
            //点击退出要做两件事情
            //1.清空本地存储令牌  就是token
            localStorage.removeItem('token')
            //2.返回到登录页面
            location.href = 'login.html'
            layer.close(index);
        });
    })
})
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvater获取用户头像
            renderAvater(res.data)
        },
        //无论成功还是失败都会执行这个complete函数
        complete: function (res) {
            // console.log('执行了complete回调函数');
            // console.log(res);
            //如果身份认证失败就强制返回登录模块并且清空本地存储令牌
            if (res.responseJSON.status === 1 || res.responseJSON.message === "身份认证失败!") {
                localStorage.removeItem('token')
                location.href = 'login.html'
            }
        }
    })
}

//渲染用户头像
function renderAvater(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    //2.渲染用户的名称
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    //3.渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2如果没有用户头像则显示文本头像
        $('.layui-nav-img').hide()
        //选出用户名第一个首字母
        var frist = name[0].toUpperCase()
        // console.log(frist);
        $('.text-avatar').html(frist).show()
    }
}