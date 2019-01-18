
const http = require('http');

const url = require('url');

const ejs = require('ejs');

http.createServer(function (request, response) {


    response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});

    //login 登入的一些功能 register 注册的一些功能
    console.log(request.url);

    //路由指的就是针对不同请求的URL，处理不同的业务逻辑

    let pathname =  url.parse(request.url).pathname;

    if(pathname === '/login'){

        let data = "你好我是后台数据";
        let list = ['1111', '2222', '3333'];

        ejs.renderFile('./nodejsGetPostEjs/views/login.ejs',{msg:data, list:list}, function (err, data) {
            if(err){
                console.log("Alex false");
                console.log(err);
            }
            else {
                console.log("Alex true");
                response.end(data);
            }
        });
    }
    else if(pathname === '/regist'){
        let msg = "这是注册页面，也是注册的路由";
        var h = "<h2>这是一个h2</h2>";

        ejs.renderFile('./nodejsGetPostEjs/views/regist.ejs',{msg:msg, h:h}, function (err, data) {
            if(err){
                console.log("Alex false");
                console.log(err);
            }
            else {
                console.log("Alex true");
                response.end(data);
            }
        });
    }

}).listen(8001);