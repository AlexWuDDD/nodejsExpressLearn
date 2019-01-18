const express=require('express');
const admin = require('./routes/admin');
const index = require('./routes/index');
const session = require('express-session');



const app = new express();

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*30
    }

}));

app.set('view engine', 'ejs');
app.set('views', './expressCommericalMngrSys' + '/views');
app.use(express.static('./expressCommericalMngrSys' + '/public'));
app.use('/admin/expressCommericalMngrSys/upload', express.static('./expressCommericalMngrSys/upload'));
app.use('/admin/product/expressCommericalMngrSys/upload', express.static('./expressCommericalMngrSys/upload'));



app.use('/', index);

app.use('/admin',admin);


app.listen(8001, '127.0.0.1');