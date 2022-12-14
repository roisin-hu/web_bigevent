$(function(){
    //点击“去注册账号”链接
    $("#link_reg").on('click',function(){
        $(".login-box").hide()
        $(".reg-box").show()
    })
    //点击“去登录”链接
    $("#link_login").on('click',function(){
        $(".login-box").show()
        $(".reg-box").hide()
    })

    //从 layui 中获取form
    var form = layui.form
    var layer = layui.layer
    //通过 form.verify()函数自定义校验规则
    form.verify({
        //定义了一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            //通过形参value拿到的是再次确认密码框的内容
            var pwd = $(".reg-box [name=password]").val()
            if(pwd !== value){
                return '两次密码不一致！'
            }

        } 
    })


    //监听注册表单的提交事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        var data = {username:$("#form-reg [name=username]").val(),password:$('#form-reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            //模拟人的点击行为
            $('#link_login').click();
        })
        
    })

    //监听登录表单的提交事件
    $('#form-login').submit(function(e){
        e.preventDefault()
        $.ajax({            
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // console.log(res.token);
                localStorage.setItem('token',res.token)
                //跳转后台首页
                location.href='/index.html'
            }
        })
    })

})