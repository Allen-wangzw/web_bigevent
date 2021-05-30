$(function () {
    var layer = layui.layer
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo()
    //初始化用户的信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res.data);
                //使用form.val()快速赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //点击重置按钮重新回到修改前的数据
    $('#btnReset').on('click', function (e) {
        //清除默认重置清空所有事件
        e.preventDefault()
        //再调用initUserInfo()请求数据并赋值
        initUserInfo()
    })

    //监听用户的表单提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交事件
        e.preventDefault()
        //发起ajax的提交请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')
                //调用父页面的方法  把修改的用户名称渲染到个人中心去
                window.parent.getUserInfo()
            }
        })
    })
})