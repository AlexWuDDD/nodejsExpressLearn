const express = require('express');

const router = new express.Router(); /*可以创建模块化 可挂载的路由句柄*/

const dbclient = require('../../module/db');
const md5 = require('md5-node');

const bodyParser = require('body-parser');



router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get('/', function (req, res) {
    //res.send('登入页面');
    res.render('./admin/login');
});


router.post('/doLogin', function (req, res) {
    //res.send("处理登入11111");
    //res.send('login');
    //1. 获取数据
    console.log(req.body);
    //2. 连接数据库查询数据

    let username = req.body.username;
    let password = md5(req.body.password);


    dbclient.find('user', {
        username:username,
        password:password
    }, function (err, data) {
        console.log(data);
        if(data.length > 0){
            console.log("登入成功");
            //保存用户信息
            req.session.userinfo=data[0];
            res.redirect('/admin/product');
        }
        else{
            console.log("登入失败");
            res.send("<script>alert('登入失败');location.href='/admin/login';</script>")
        }
    });
});


module.exports = router;/*暴露router模块*/