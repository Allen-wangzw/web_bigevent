$(function () {
    var layer = layui.layer
    //设置密码的校验规则
    var form = layui.form
    // 自定义密码校验规则
    form.verify({
        //密码格式
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //新密码与旧密码不能相同
        somepwd: function (value) {
            if (value === $('#oldPwd').val()) {
                return '新旧密码不能相同'
            }
        },
        //确认密码与新密码得一直
        repwd: function (value) {
            if (value !== $('#newpwd').val()) {
                return '两次输入密码不一致'
            }
        }
    })

    //修改密码发起提交的ajax请求
    $('.layui-form').on('submit', function (e) {
        //清除默认提交事件
        e.preventDefault()
        //提交ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码请求失败')
                }
                layer.msg('修改密码请求成功')
                //修改密码成功后要重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})