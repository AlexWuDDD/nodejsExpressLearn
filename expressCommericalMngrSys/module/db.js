//操作数据库的模块
const MongoClient = require('mongodb').MongoClient;
const DBurl = 'mongodb://localhost:27017/';
const dbName = 'product';
const ObjectID = require('mongodb').ObjectID;

exports.ObjectID = ObjectID;

function __connectDB(callback) {
    MongoClient.connect(DBurl, {useNewUrlParser:true}, function (err, client) {
        if (err) {
            console.log(err);
            console.log("连接数据库失败");
            return;
        }
        //增加 修改 删除

        callback(err, client);


    })
}

exports.find=function (collectionname, json, callback) {
    __connectDB(function (err, client) {
        let result = client.db(dbName).collection(collectionname).find(json);
        result.toArray(function (err, data) {
            callback(err, data)
        });
        client.close();
    })
};

exports.insert=function (collectionname, json, callback) {
    __connectDB(function (err, client) {
        client.db(dbName).collection(collectionname).insertOne(json, function (error, data) {
            callback(error, data);
        });
        client.close();
    })
};

exports.update=function (collectionname, json1, json2, callback) {
    __connectDB(function (err, client) {
        client.db(dbName).collection(collectionname).updateOne(json1,
            {$set:json2},
            function (error, data) {
            callback(error, data);
        });
        client.close();
    })
};

exports.delete=function (collectionname, json, callback) {
    __connectDB(function (err, client) {
        client.db(dbName).collection(collectionname).deleteOne(json, function (error, data) {
            callback(error, data);
        });
        client.close();
    })
};