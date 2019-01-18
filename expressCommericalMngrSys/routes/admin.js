const express = require('express');
const login = require('../routes/admin/login');
const product = require('../routes/admin/product');
const user = require('../routes/admin/user');

const router = express.Router();

//权限判断
router.use(function (req, res, next) {
   if(req.url==='/login' || req.url ==='/login/doLogin'){
       next();
   }
   else{
       if(req.session.userinfo && req.session.userinfo.username!==''){
           req.app.locals['userinfo'] = req.session.userinfo;
           next();
       }
       else{
           res.redirect('/admin/login');
       }
   }
});


router.use("/login", login);
router.use("/product", product);
router.use("/user", user);


module.exports = router;