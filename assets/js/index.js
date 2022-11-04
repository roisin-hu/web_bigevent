$(function(){
    getUserInfo()
    var layer = layui.layer
    //给退出按钮绑定点击事件
    $('#btnlogout').on('click',function(){
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //清除储存在内存的token
            localStorage.removeItem('token')
            //跳转回登录界面
            location.href = '/login.html'
            
            layer.close(index);
          });
    })
    
})

//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){           
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            // console.log(res.data);
            //调用renderAvatar渲染头像
            renderAvatar(res.data)            
        }
        //无论请求成功还是失败，最终都会调用 complete 回调函数
        // complete:function(res){
        //     // console.log(res)
        //     //在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的 数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //1、强制清除token
        //         localStorage.removeItem('token')
        //         //2、强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
 //定义渲染头像的函数
function renderAvatar(user){
    //获取用户名称
    var name = user.nickname || user.username
    //设置文本内容
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    //判断用户是否设置了头像
    if(user.user_pic !== null){
        //渲染已有的头像链接
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        //渲染文本头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()

    }

}
