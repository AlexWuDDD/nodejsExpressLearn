/*
* 中间件：就是匹配路由之前和匹配路由之后做的一系列的操作
*
* next()表示路由往下匹配
*
* 权限判断 没有登入 跳转到登入页面，登入以后就显示登入以后的界面
* */

//

const express = require('express');
const app = new express();

//中间件 表示匹配任何路由
app.use(function (req, res,next) {
   console.log(new Date());
   next();
});


app.use('/news', function (req, res, next) {
   console.log('新闻路由中间件');
   next();
});

app.get('/', function (req, res) {
   res.send("你好express");
});

app.get('/news', function (req, res) {
   res.send('新闻路由');
});




app.listen(8001, '127.0.0.1');
