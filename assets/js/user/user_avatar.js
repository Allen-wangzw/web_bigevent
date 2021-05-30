$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //2.点击上传触发文件上传
    $('#btnchooseImage').on('click', function () {
        $('#file').click()
    })
    //3.为选择框绑定change事件
    $('#file').on('change', function (e) {
        //获取用户选择的文件
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择照片')
        }
        //拿到用户选择的文件
        var files = fileList[0]
        //根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(files)
        //先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
        //为确定按钮添加绑定事件
        $('#btnupload').on('click', function () {
            //  1.点击确定后要拿到用户裁剪之后的头像
            var dataURL = $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 100,
                    height: 100
                })
                .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            //2.调用接口把头像上传到服务器
            $.ajax({
                method: 'POST',
                url: '/my/update/avatar',
                data: {
                    avatar: dataURL
                },
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('上传头像失败')
                    }
                    layer.msg('上传头像成功')
                    // 上传成功后调用父页面的获取用户基本信息来更新头像
                    window.parent.getUserInfo()
                }
            })
        })
    })
})