const express = require('express');
const router = new express.Router(); /*可以创建模块化 可挂载的路由句柄*/
const dbclient = require('../../module/db');
//图片上传 表单上传
const multiparty = require('multiparty');
const fs = require('fs');

router.get('/', function (req, res) {

    dbclient.find('productitem', {}, function (err,data) {
        if(err){
            console.log(err);
            return;
        }

        res.render('./admin/product/index', {list:data});
    });

});


router.get('/add', function (req, res) {
    res.render('./admin/product/add');
});

router.post('/doAdd', function (req, res) {
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
            res.redirect('/admin/product');

        })


    })
});


router.get('/edit', function (req, res) {
    let id = req.query.id;
    //去数据库查询 对应的数据
    dbclient.find('productitem', {
        "_id": new dbclient.ObjectID(id)//!!!!!!!!!!!!!!!!!
    }, function (err, data) {
        if(err){
            console.log(err);
            return;
        }

        res.render('./admin/product/edit', {list:data[0]});
    });
});

router.post('/doEdit', function (req, res) {
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
                res.redirect('/admin/product');
            }
        );

    })

});



router.get('/delete', function (req, res) {
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
        res.redirect("/admin/product");

    });
});


router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/admin/login');
        }
    })

});

module.exports = router;/*暴露router模块*/