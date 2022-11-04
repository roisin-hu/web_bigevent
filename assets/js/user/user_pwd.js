$(function(){
    //表单输入校验
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samePwd:function(value){
            if(value == $('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }
                  
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致！'
            }
        }
    })
    //发起ajax请求重置密码
    //监听表单提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('重置密码失败！')
                }
                layer.msg('重置密码成功！')
                $('.layui-form')[0].reset()
            }
        })
    })
    
})