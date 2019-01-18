
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const mime = require('./model/getmimefromfile');

//test
//console.log(path.extname("index.html"));
//console.log(path.extname("index.css"));
//console.log(path.extname("index.js"));

http.createServer(function (request, response) {

    //response.write("Welcome to Alex's website");


    let pathName = url.parse(request.url).pathname;

    //默认加载首页
    if(pathName === '/'){
        pathName = 'index.html';
    }

    //过滤请求
    if(pathName !== '/favicon.ico'){

        let extname = path.extname(pathName);
        //console.log(mime.getMime(extname));

        //文件操作获取static下面的index.html
        fs.readFile('./nodejsWebStaticServer/static/' + pathName, function (err, data) {
            if(err){
                console.log("404");
                //return false;

                fs.readFile('./nodejsWebStaticServer/static/404.html', function (err, data404) {

                    if(err){
                        console.log(err);
                        return;
                    }

                    response.writeHead(200, {"Content-Type":"text/html; charset='utf-8'"});
                    response.write(data404);
                    response.end();
                } )

            }
            else {

                mime.getMime(fs, extname, function (model) {
                    response.writeHead(200, {"Content-Type":" "+model+" ; charset='utf-8'"});
                    response.write(data);
                    response.end();
                });


            }
        })
    }


    //console.log(pathName);


}).listen(8001);

