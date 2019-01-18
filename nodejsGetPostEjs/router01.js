
const http = require('http');

const url = require('url');

const ejs = require('ejs');

const fs = require('fs');

const  model = require('./model/model');

http.createServer(function (request, response) {

    response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    let pathname = url.parse(request.url).pathname.replace('/','');
    console.log(pathname);

    if(pathname !== 'favicon.ico') {
        try {
            model[pathname](request, response);
        }catch (e) {
            model['home'](request, response);
        }

    }
}).listen(8001);