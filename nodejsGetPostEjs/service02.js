
const http = require('http');

//const router = require('./model/router.');
const url = require('url');


http.createServer(function (request, response) {

    //router.statics(request, response, './nodejsGetPostEjs/static');
    //login 登入的一些功能 register 注册的一些功能
    console.log(request.url);

    //路由指的就是针对不同请求的URL，处理不同的业务逻辑

    let pathname =  url.parse(request.url).pathname;

    if(pathname === '/login'){
        response.end('login');
    }
    else if(pathname === '/register'){
        response.end('register');
    }
    else if(pathname === '/order'){
        response.end('order');
    }
    else{
        response.end('index');
    }
}).listen(8001);