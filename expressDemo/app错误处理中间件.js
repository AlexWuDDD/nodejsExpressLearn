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

app.get('/', function (req, res) {
   res.send("你好express");
});

app.get('news', function (req, res) {
   res.send('你好express news');
});

//匹配所有的路由 404
app.use(function (req, res) {
   res.status(404).send('这是404 表示路由没有匹配到');
});




app.listen(8001, '127.0.0.1');
