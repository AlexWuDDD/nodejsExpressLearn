
const http = require('http');

const url = require('url');

const ejs = require('ejs');

const fs = require('fs');

http.createServer(function (request, response) {


    response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});

    //login 登入的一些功能 register 注册的一些功能
    console.log(request.url);
    console.log(request.method); //获取get还是post请求
    let method = request.method;

    //路由指的就是针对不同请求的URL，处理不同的业务逻辑

    let pathname =  url.parse(request.url,true).pathname;


    if(pathname === '/login'){ //显示登入页面
        ejs.renderFile('./nodejsGetPostEjs/views/form.ejs',{}, function (err, data) {
            if(err){
                console.log(err);
            }
            else {
                response.end(data);
            }
        });

    }
    else if(pathname === '/dologin'){ //执行登入操作

        if(method === 'GET') {
            //get获取传值
            let query = url.parse(request.url, true).query; //true的返回对象
            console.log(JSON.stringify(query));
            response.end("dologin Get")
        }
        else if(method === 'POST'){
            //post获取传值
            let data='';
            request.on('data', function (chunk) {
                data += chunk;
            });
            request.on('end', function () {
                console.log(data);
                fs.appendFile('login.txt', data + '\n', function (err) {
                    if(err){
                        console.log(err);
                        console.log("写入失败");
                    }
                    else{
                        console.log("写入成功")
                    }
                })
                response.end("<script>alert('登入成功');history.back()</script>");
            })
        }

    }
    else{
        ejs.renderFile('./nodejsGetPostEjs/views/index.ejs',{}, function (err, data) {
            if(err){
                console.log(err);
            }
            else {
                response.end(data);
            }
        });
    }

}).listen(8001);