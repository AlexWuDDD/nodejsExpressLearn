const cookieParser = require('cookie-parser');
const express = require('express');

const app = new express();

//配置中间件
app.use(cookieParser());

app.get("/", function (req, res) {
    console.log(req.cookies);
    res.send("您游览过的城市有" + req.cookies.cities);
});

/*您游览过的城市 /lvyou?city=北京 /lvyou?city=上海 /lvyou?city=杭州 /lvyou?city=重庆*/
app.get("/lvyou", function (req, res) {

    //写入数据要判断

   let city = req.query.city;

   let cities = req.cookies.cities;
   if(cities){
       cities.push(city);
   }
   else{
       cities=[];
       cities.push(city);
   }


   res.cookie('cities', cities, {maxAge:60*1000*10} );
   res.send("您游览过的城市是"+city);
});





app.listen(8001,'127.0.0.1');
