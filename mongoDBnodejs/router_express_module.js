const http = require('http');
const ejs = require('ejs');
const app = require('./model/expressRouter');

const MongoClient = require('mongodb').MongoClient;
const DBurl = 'mongodb://localhost:27017/';
const dbName = 'itying';

const url = require('url');

console.log(app);

http.createServer(app).listen(8001);

app.get("/add", function (req, res) {
    //增加数据
    MongoClient.connect(DBurl,{useNewUrlParser : true},function (err, client) {
        if(err){
            console.log(err);
            console.log("连接数据库失败");
            return;
        }
        //增加数据
        client.db(dbName).collection('user').insertOne({
            "name":"nodejs",
            "age" : 10
        }, function (error, result) {
            if(error){
                console.log("增加数据失败");
                return;
            }
            res.send('增加数据成功');
            client.close();
        })
    })
});

app.get("/edit", function (req, res) {
    //增加数据
    MongoClient.connect(DBurl,{useNewUrlParser : true},function (err, client) {
        if(err){
            console.log(err);
            console.log("连接数据库失败");
            return;
        }
        //增加数据
        client.db(dbName).collection('user').updateOne(
            {"name":"alex"},
            {$set:{"age":20}},
            function (error, data) {
                if(error){
                    console.log("修改数据失败");
                    return;
                }
                //console.log(data);
                res.send('修改数据成功');
                client.close();
            }
        )
    })
});


app.get("/delete", function (req, res) {
    //增加数据
    MongoClient.connect(DBurl,{useNewUrlParser : true},function (err, client) {
        if(err){
            console.log(err);
            console.log("连接数据库失败");
            return;
        }
        // /delete?name
        let query = url.parse(req.url,true).query;
        console.log(query);
        console.log(query.name);
        let name = query.name;
        //删除数据
        client.db(dbName).collection('user').deleteOne(
            {"name":name},
            function (error,data) {
                if(error){
                    console.log("删除数据失败");
                    return;
                }
                //console.log(data);
                res.send("删除数据成功");
                client.close();
            }
        )

    })
});

app.get("/", function (req, res) {
    MongoClient.connect(DBurl, {useNewUrlParser:true}, function (err, client) {
        if (err) {
            console.log(err);
            console.log("连接数据库失败");
            return;
        }

        let list = [];//
        let result = client.db(dbName).collection('user').find();
        //console.log(result);

        
        result.each(function(error,doc){


            //console.log(doc);
            if(error){
                console.log(error);
            }else{

                if(doc!=null){
                    list.push(doc);

                }else{  /*doc==null表示数据循环完成*/

                    /*获取数据以后*/
                    //console.log(list);

                    ejs.renderFile('./mongoDBnodejs/views/index.ejs',{list:list},function(err,data){

                        res.send(data);
                        client.close();
                    })

                }

            }

        })

    })

});

