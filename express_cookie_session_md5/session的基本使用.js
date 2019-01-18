const express = require('express');
const session = require('express-session');

const app = new express();

//配置中间件
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized:true,
    //cookie:{secure : true} /*secure https这样的情况下才可以访问cookie*/
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