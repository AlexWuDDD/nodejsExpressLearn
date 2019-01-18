const fs = require('fs');


//流的方式读取文件 大文件
//var readStream = fs.createReadStream('./fsModule/t1.txt');
//
//var str = '';//保存数据
//var count = 0;
//readStream.on('data', function (chunk) {
//    str += chunk;
//    ++count;
//    console.log("count: " +count);
//});
//
//readStream.on('end', function (chunk) {
//    console.log(str);
//});
//
//readStream.on('error', function (err) {
//    console.log(err);
//});

//流的方式写文件
//var data = "Alex is cool\n";
//var writeStream = fs.createWriteStream('./fsModule/output.txt');
//
//
//for(let i=0; i<100; ++i){
//    writeStream.write(data, 'utf8');
//}
//
////标记写入完成
//writeStream.end();
//
//writeStream.on('finish', function () {
//    console.log("写入完成");
//});
//
//writeStream.on('error', function () {
//    console.log("写入失败");
//});

// pipe stream

//创建一个可读流
var readStream = fs.createReadStream('./fsModule/t1.txt');
//创建一个可写流
var writeStream = fs.createWriteStream('./fsModule/output.txt');

//管道读写操作

readStream.pipe(writeStream);

console.log("程序执行完毕");






