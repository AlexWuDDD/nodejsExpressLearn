const http = require('http');
const url = require('url');
var  G = {};

//定义方法开始和结束
var app = function (req, res) {

    let pathname = url.parse(req.url).pathname;
    console.log("pathname is " + pathname);
    if(pathname.endsWith('/')){
        pathname = pathname + '/';
    }

    if(G[pathname]){
        G[pathname](req, res);
    }
    else{
        res.end('路由不存在');
    }

};

//定义一个方法， 类似注册一个方法到G中；
app.get = function (string, callback) {

    if(!string.endsWith('/')){
        string = string + '/';
    }

    if(!string.startsWith('/')){
        string = '/' + string;
    }


    G[string] = callback;
};



http.createServer(app).listen(8001);

//注册login这个路由
app.get('login', function (req, res) {
    console.log('login');
    res.end('login');
});

app.get('register', function (req, res) {
    console.log('register');
    res.end('register');
});