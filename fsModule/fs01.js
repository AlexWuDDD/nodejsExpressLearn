var fs = require('fs');

//1. fs.stat 检测是文件还是目录

//fs.stat('./fsModule/html',function (err, stats) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//    console.log('文件 ' + stats.isFile());
//    console.log('目录 ' + stats.isDirectory());
//});
//
//fs.stat('./fsModule/index.txt',function (err, stats) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//    console.log('文件 ' + stats.isFile());
//    console.log('目录 ' + stats.isDirectory());
//});

//2. fs,mkdir 创建目录
//fs.mkdir('./fsModule/css', function (err) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//
//    console.log("创建目录成功");
//});
//

//3. fs.writeFile 创建写入文件
//fs.writeFile('./fsModule/t.txt', '你好 nodejs 覆盖', 'utf8', function (err) {
//    if(err){
//        console.log(err);
//        return  false;
//    }
//    console.log("写入成功");
//});

//4. fs.appendFile 追加文件

//fs.appendFile('./fsModule/t1.txt', '这是写入的内容\n', 'utf8', function (err) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//
//    console.log('追加文件成功');
//});

//5. fs.readFile 读取文件
//fs.readFile('./fsModule/t1.txt', function (err, data) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//
//    //console.log(data);
//    console.log(data.toString());
//})
//

//6. fs.readdir 读取目录
//fs.readdir('./fsModule', function (err, data) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//
//    console.log(data);
//});

//7. fs.rename 重命名
//改名
//剪切

//fs.rename('./fsModule/index2.txt', './fsModule/css/index2.txt', function (err) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//    console.log("剪切成功");
//})


//8. fs.rmdir 删除目录
//fs.rmdir('./fsModule/html', function (err) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//
//    console.log("删除目录成功");
//});

//9. fs.unlink 删除文件
fs.unlink('./fsModule/t.txt', function (err) {
    if(err){
        console.log(err);
        return false;
    }
    console.log("删除文件成功");
})

//拿到一个文件夹下的所有目录



