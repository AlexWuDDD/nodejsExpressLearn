const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const md5 = require('md5-node');
const dbclient = require('./module/db');
const session = require('express-session');
//图片上传 表单上传
const multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');


var app = new express();
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*30
    }

}));

//配置body-parser中间件
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//设置ejs模板引擎
app.set('view engine', 'ejs');
//指定模板位置
app.set('views', './expressCommericalMngrSys' + '/views');
//使用静态资源文件夹的绝对路径
app.use(express.static('./expressCommericalMngrSys' + '/public'));
app.use('/expressCommericalMngrSys/upload', express.static('./expressCommericalMngrSys/upload'));
//app.use(express.static('public'));
app.get('/', function (req, res) {
    res.send('首页');
});

//登入
app.get('/login', function (req, res) {
    //res.send('login');
    res.render('login');
});

//获取登入提交的数据
app.post('/doLogin', function (req, res) {
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
            res.redirect('/product');
        }
        else{
            console.log("登入失败");
            res.send("<script>alert('登入失败');location.href='/login';</script>")
        }
    });
});

app.get('/product', function (req, res) {
    //res.send('product列表');
    dbclient.find('productitem',{}, function (err, data) {
        res.render('product', {list:data});
    })
    //res.render('product');
});

//显示增加商品页面
app.get('/productadd', function (req, res) {
    res.render('productadd');
});

//获取表单提交的数据，以及过来的图片
app.post("/doProductAdd", function (req, res) {

    let form = new multiparty.Form();
    form.uploadDir='./expressCommericalMngrSys/upload';//上传图片的地址，目录必须存在
    form.parse(req, function (err, fileds,files){
        //获取提交的数据以及图片上传成功返回的图片信息
        //console.log(fileds);/*获取表单的数据*/
        //console.log(files);/*图片上传成功返回的地址信息*/

        let title = fileds.title[0];
        let price = fileds.price[0];
        let fee = fileds.fee[0];
        let description = fileds.description[0];

        let pic = files.pic[0].path;
        console.log(pic);

        dbclient.insert('productitem', {
            title:title,
            price:price,
            fee:fee,
            pic:pic,
            description: description

        }, function (err, date) {
            if(err){
                console.log(err);
                console.log("增加产品失败");
                return;
            }

            console.log("增加产品成功");
            res.redirect('/product');

        })


    })
});


app.get('/productedit', function (req, res) {
    //res.send('编辑product');
    //过去get传值
    let id = req.query.id;
    //去数据库查询 对应的数据
    dbclient.find('productitem', {
        "_id": new dbclient.ObjectID(id)//!!!!!!!!!!!!!!!!!
        }, function (err, data) {
        if(err){
            console.log(err);
            return;
        }

        res.render('productedit', {list:data[0]});
    });


    //res.render('productedit');
});

//执行修改的路由
app.post('/doProductEdit', function (req, res) {
    let form = new multiparty.Form();
    form.uploadDir='./expressCommericalMngrSys/upload';//上传图片的地址，目录必须存在
    form.parse(req, function (err, fileds,files){
        //获取提交的数据以及图片上传成功返回的图片信息
        //console.log(fileds);/*获取表单的数据*/
        //console.log(files);/*图片上传成功返回的地址信息*/

        let _id = fileds._id[0];/*修改的条件*/

        let title = fileds.title[0];
        let price = fileds.price[0];
        let fee = fileds.fee[0];
        let description = fileds.description[0];

        let originalFilename = files.pic[0].originalFilename;
        let pic = files.pic[0].path;
        if(originalFilename) {

            var setData={
                title:title,
                price:price,
                fee:fee,
                description:description,
                pic:pic

            }
        }else{
            var setData={
                title:title,
                price:price,
                fee:fee,
                description:description
            }

        }

        //删除生成的临时文件
        fs.unlink(pic , function (err) {
            if(err){
                console.log(err);
            }
        });

        //console.log(pic);

        dbclient.update('productitem',
            {
                "_id": new dbclient.ObjectID(_id)
            },setData,function (err, data) {

                if(err){
                    console.log(err);
                    console.log("修改产品失败");
                    return;
                }

                console.log("修改产品成功");
                res.redirect('/product');
            }
        );

    })
});

app.get('/productdelete', function (req, res) {

    //获取id
    let id = req.query.id;
    dbclient.delete('productitem',{
        "_id": new dbclient.ObjectID(id)
    }, function (err, data) {
        if(err){
            console.log(err);
            console.log("删除产品失败");
        }
       console.log("删除产品成功");
        res.redirect("/product");

    });
    //res.send('删除product');
});

app.get('/delete', function (req, res) {
    dbclient.delete('productitem', {"title": "iphone4"}, function (err, data) {
        if(err){
            console.log(err);
            res.send("删除失败");
        }
        else{
            res.send("删除成功");
        }
    })
});

app.listen(8001, '127.0.0.1');