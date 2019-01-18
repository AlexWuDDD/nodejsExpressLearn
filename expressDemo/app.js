


const express = require('express');
const app = new express();

/*配置ejs模板引擎*/
app.set('view engine', 'ejs');
//指定模板位置
//app.set('views', __dirname + '/views');

//中间件
app.use(express.static('public'));
//配置虚拟目录的静态目录
//http://localhost:8001/static/images/xxx.png

//images/xxx.去public目录找，
app.use('/static', express.static('public'));


app.get('/', function (req, res) {
    //res.send('ejs的演示');
   res.render('index');
});

app.get('/news', function (req, res) {
   //res.send('ejs的演示');
   var arr = ['111','222', '333'];
   res.render('news', {
      list:arr
   });
});

/*端口大于8001*/
app.listen('8001', '127.0.0.1');

//动态路由
app.get('/newscontent/:aid', function (req,res) {
   console.log(req.params);
   let aid = req.params.aid;
   res.send("newscontent----" + aid);
});

//获取get传值 xxxxx/product?aid=123
app.get('/product', function (req, res) {
   console.log(req.query);
   res.send('product' + req.query.aid + '----' + req.query.cid);

});
