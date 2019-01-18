const http = require('http');
const ejs = require('ejs');
const app = require('./model/expressRouter');

console.log(app);

http.createServer(app).listen(8001);

app.get('/login', function (req, res) {
    console.log('login');
    ejs.renderFile('./nodejsGetPostEjs/views/form.ejs',{}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});

app.get('/register', function (req, res) {
    console.log('register');
    res.end('register');
});

app.post('/dologin', function (req, res) {
    console.log(req.body);
    res.send("<script>alert('登入成功');history.back()</script>");
});