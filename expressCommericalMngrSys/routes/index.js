const express = require('express');
const router = new express.Router(); /*可以创建模块化 可挂载的路由句柄*/

router.get('/', function (req, res) {
    res.send('index');
});

router.get('/product', function (req, res) {
    res.send("product页面");
});



module.exports = router;/*暴露router模块*/