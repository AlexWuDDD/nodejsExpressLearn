var http = require('http');
var url = require('url');

//create the http server through the "http"
//request 获取url信息
//response 游览器返回响应信息
http.createServer(function (request, response) {

    //输入http://localhost:8001/news?aid=123 拿到aid

    //request.url 获取游览器url输入的信息
    console.log(request.url);

    var query = url.parse(request.url, true); //true的返回对象
    console.log(query.query);

    //发送HTTP头部
    //HTTP状态值：200 OK
    //设置HTTP头部，状态码200，文件类型html, 字符集utf8

    response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    response.write("你好 nodejs\n");
    response.write("我是第一个nodejs程序");
    response.end()/*结束响应*/;

}).listen(8001);