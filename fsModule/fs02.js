var fs = require('fs');


//判断服务器上面有没有upload目录，没有创建这个目录（图片上传）
//fs.stat('./fsModule/upload', function (err, stats) {
//    if(err){
//        fs.mkdir('./fsModule/upload', function (err) {
//            if(err){
//                console.log(err);
//                return false;
//            }
//            console.log("创建成功");
//        })
//    }
//    else {
//        console.log("目录已经存在");
//        console.log(stats.isDirectory());
//    }
//})


//找出html下面的所有目录,然后打印出来
fs.readdir('./fsModule/html', function (err, files) {
    if(err){
        console.log(err);
        return false;
    }
    else{
        console.log(files);

        for(let i=0; i<files.length; ++i){
            (function checkWhetherIsDirectory(i){
                fs.stat('./fsModule/html/' + files[i], function (err, stats) { //fs.stat是异步的，所以要用闭包实现
                    //console.log(files[i]);
                    if(err){
                        console.log(err);
                        return false;
                    }
                    else{
                        if(stats.isDirectory()){
                            console.log(files[i]);
                        }
                    }
                })
            })(i)
        }
    }
});