const fs = require('fs');
const path = require("path");
const url = require('url');

/*获取文件类型的方法 私有*/
function getMime (extname, callback) {
    fs.readFile('./nodejsGetPostEjs/mime.json', function (err, data) {
        if(err){
            console.log(err);
            return false;
        }
        else{
            let Mimes = JSON.parse(data.toString());

            let ret = Mimes[extname] || 'text/html';

            callback(ret);
        }
    })
}

exports.statics = function (request,response, staticpath) {

    let pathName = url.parse(request.url).pathname; /*获取url的值*/

    //默认加载首页
    if(pathName === '/'){
        pathName = 'index.html';
    }

    //过滤请求
    if(pathName !== '/favicon.ico'){

        let extname = path.extname(pathName);
        //console.log(mime.getMime(extname));

        //文件操作获取static下面的index.html
        fs.readFile(staticpath + '/' + pathName, function (err, data) {
            if(err){
                console.log("404");
                //return false;

                fs.readFile(staticpath + '/404.html', function (err, data404) {

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

                getMime(extname, function (model) {
                    response.writeHead(200, {"Content-Type":" "+model+" ; charset='utf-8'"});
                    response.write(data);
                    response.end();
                });
            }
        })
    }

};