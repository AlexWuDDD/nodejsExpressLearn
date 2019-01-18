
const fs = require('fs');

exports.getMime = function (fs, extname, callback) {
    //异步操作会有问题
    fs.readFile('./nodejsWebStaticServer/mime.json', function (err, data) {
        if(err){
            console.log(err);
            return false;
        }
        else{
            //console.log("Alex");
            //console.log(data.toString());

            let Mimes = JSON.parse(data.toString());

            let ret = Mimes[extname] || 'text.html';

            callback(ret);
        }
    })


    /*
    let data = fs.readFileSync('./nodejsWebStaticServer/mime.json');
    let Mimes = JSON.parse(data.toString());
    return Mimes[extname] || 'text/html';
    */
};