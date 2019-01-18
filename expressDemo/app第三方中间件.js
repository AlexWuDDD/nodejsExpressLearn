/*
* 中间件：就是匹配路由之前和匹配路由之后做的一系列的操作
*
* next()表示路由往下匹配
*
* 权限判断 没有登入 跳转到登入页面，登入以后就显示登入以后的界面
* */


//cookie, session, 获取post提交的数据
/*
* body-parser 中间件 第三方的 获取post提交的数据
* cnpm install body-parser --save
* var = bodyParse = require('body-parser')
* app.use(bodyParser.urlencoded({extended:false))
* app.use(bodyParser.json)
* req.body
* */


const bodyParser = require('body-parser');
const express = require('express');
const app = new express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.set('view engine', 'ejs');



app.get('/', function (req, res) {
   res.send("你好express");
});

app.get('/login', function (req, res) {
   res.render('login');
});

app.post('/doLogin', function (req, res) {
   console.log(req.body);//获取post提交的数据
});



app.listen(8001, '127.0.0.1');
