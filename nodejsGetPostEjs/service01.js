
const http = require('http');

const router = require('./model/router.');

http.createServer(function (request, response) {

    router.statics(request, response, './nodejsGetPostEjs/static');
    
}).listen(8001);