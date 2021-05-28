$(function () {
    //点击去注册账号的链接显示去登录
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    //点击去登录的链接显示去注册
    $('#link_login').on('click', function () {
        $('.reg_box').hide()
        $('.login_box').show()
    })

    //验证密码
    //声明表单
    var form = layui.form
    // 声明弹出提示
    var layer = layui.layer
    //通过form.verify()函数来自定义密码验证规则
    form.verify({
        //密码的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //确认密码的校验规则
        //通过形参拿到的是确认密码的值
        //还需要拿到密码框中输入密码的值
        //两者比较
        //如果不一样那就return提示消息即可
        repwd: function (value) {
            var pwd = $('#definePwd').val()
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    })

    //监听注册表单事件
    $('#from_reg').on('submit', function (e) {
        e.preventDefault()

        // var data = { username: $('#from_reg [name=username]').val(), password: $('#from_reg [name=password]').val(), }

        $.post('/api/reguser', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg('注册失败')
            }
            layer.msg('注册成功,请登录');
            //模拟点击事件 注册成功自动跳转到登录页面
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#from_login').submit(function (e) {
        //取消默认提交事件
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                //登录成功之后会返回一个token(令牌)的值,作用跟令牌一样,认证之后才可以跳转  先保存在本地
                localStorage.setItem('token', res.token)
                //登录成功之后要跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})