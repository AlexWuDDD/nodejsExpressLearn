
const url = require('url');

function changeRes(res) {
    res.send = function (data) {
        res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        res.end(data);
    }
}


//暴露的模块
var Server = function () {

    const G = this; //全局变量

    //处理 get post 请求
    this._get={};
    this._post={};

    const app = function (req, res) {

        changeRes(res);

        let pathname = url.parse(req.url).pathname;

        //获取请求方式
        let method= req.method.toLowerCase();

        if (!pathname.endsWith('/')) {
            pathname = pathname + '/';
        }
        console.log("pathname is " + pathname);
        if (G['_'+method][pathname]) {
            if(method === "post"){
                //post获取传值
                let data='';
                req.on('data', function (chunk) {
                    data += chunk;
                });
                req.on('end', function () {
                    req.body = data; //表示拿到post的值；
                    console.log(data);
                    G['_' + method][pathname](req, res);
                })
            }

            if(method === "get") {
                G['_' + method][pathname](req, res);
            }
        } else {
            res.end('no router');
        }
    };

    app.get = function (string, callback) {

        if(!string.endsWith('/')){
            string = string + '/';
        }

        if(!string.startsWith('/')){
            string = '/' + string;
        }
        G._get[string] = callback;
    };

    app.post = function (string, callback) {
        if(!string.endsWith('/')){
            string = string + '/';
        }

        if(!string.startsWith('/')){
            string = '/' + string;
        }
        G._post[string] = callback;
    };


    return app;
};

module.exports = Server();
