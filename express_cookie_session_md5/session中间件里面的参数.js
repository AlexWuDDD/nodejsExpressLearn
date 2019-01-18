const express = require('express');
const session = require('express-session');

const app = new express();

//配置中间件
app.use(session({
    secret:'keyboard cat', //一个string类型的字符串，作为服务器端生成session的签名 随便写
    name:'AlexSession',//返回客户端的key名称，默认为connect.sid也可以自己设置
    resave: false,//强制保存session即使它并没有变化，默认为ture。建议设置成false
    saveUninitialized:true,//强制将未初始化的session存储，默认值是true,建议设置成true
    cookie:{
        maxAge:10000,
    }, /*secure https这样的情况下才可以访问cookie*/
    rolling:true //在每次请求时强行设置cookie，这将重置cookie过期时间 默认：false
}));

app.get('/', function (req, res) {

    //获取session
    if(req.session.userinfo){
        res.send("你好" + req.session.userinfo + '欢迎回来');
    }
    else{
        res.send("未登录");
    }

});

app.get("/login", function (req, res) {
    req.session.userinfo="zhangsan111";
    res.send("登入成功");
});

app.get('/news', function (req, res) {
    //获取session
    if(req.session.userinfo){
        res.send("你好" + req.session.userinfo + '欢迎回来');
    }
    else{
        res.send("未登录 news");
    }
});




app.listen(8001, '127.0.0.1');