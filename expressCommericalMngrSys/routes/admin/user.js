const express = require('express');
const router = new express.Router(); /*可以创建模块化 可挂载的路由句柄*/

router.get('/', function (req, res) {
    res.send('显示用户首页');
});


router.get('/user', function (req, res) {
    res.send("显示增加用户");
});




module.exports = router;/*暴露router模块*/