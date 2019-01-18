
const http = require('http');
const fs = require('fs');


http.createServer(function (request, response) {

    //response.write("Welcome to Alex's website");


    let pathName = request.url;

    //默认加载首页
    if(pathName === '/'){
        pathName = 'index.html';
    }

    //过滤请求
    if(pathName !== '/favicon.ico'){
        //文件操作获取static下面的index.html
        fs.readFile('./nodejsWebStaticServer/static/' + pathName, function (err, data) {
            if(err){
                console.log(err);
                //return false;
            }
            else {
                response.writeHead(200, {"Content-Type":"text/html; charset='utf-8'"});
                response.write(data);
                response.end();
            }
        })
    }


    //console.log(pathName);


}).listen(8001);