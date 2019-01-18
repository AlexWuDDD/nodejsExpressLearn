var http = require('http');

var config = require("./config");

var app = http.createServer(function (request, response) {

    response.writeHead(200, {"Content-Type":"text/html; charset='utf-8'"});
    response.write("Hello");
    response.end();

    console.log(config.str);

}).listen(8001, '127.0.0.1');