
const ejs = require('ejs');
const url = require('url');

var app = {
    //login
    login:function (req, res) {
        //console.log("login");
        //res.end('login');
        ejs.renderFile('./nodejsGetPostEjs/views/form.ejs', {}, function (err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.end(data);
            }
        })
    },

    register: function (req, res) {
        //console.log("register");
        res.end('register');
    },

    home: function (req, res) {
        res.end('home');
    },

    dologin: function (req, res) {
        let query = url.parse(req.url, true).query; //true的返回对象
        console.log(JSON.stringify(query));
        res.end("dologin Get");
    }
};

module.exports = app;