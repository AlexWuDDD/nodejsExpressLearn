const cookieParser = require('cookie-parser');
const express = require('express');

const app = new express();

app.use(cookieParser());

app.get("/", function (req, res) {
    res.send("你好nodejs");
});

app.get('/news', function (req, res) {
   console.log(req.cookies);
   res.send("news");
});



app.get("/set", function (req, res) {
    //参数1 名字
    //参数2 cookie的值
    //参开3 cookie的配置信息
    //cookie保存在游览器本地，如果没有过期的话关闭游览器再打开cookie还是存在的

    res.cookie('usernmae', 'cookie的值', {maxAge:60000});

    res.send("设置cookie成功");

});

app.listen(8001,'127.0.0.1');
