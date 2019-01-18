//异步IO = 非阻塞式IO

var fs = require('fs');


//非阻塞式IO
//console.log('1');

//fs.readFile('./nodejsCallbackAndEvent/mime.json', function (err, data) {
//   if(err){
//       console.log(err);
//       return false;
//   }
//
//   console.log(2);
//
//
//});
//
//console.log('3');


/*
function getMime() {
    //1
    fs.readFile('./nodejsCallbackAndEvent/mime.json', function (err, data) {
        if(err){
            console.log(err);
            return false;
        }
        //console.log(data.toString());

        return data.toString();//3
    });

    //2
    return "123";

}

console.log(getMime()); //有问题
*/

/*
//回调函数解决
function getMime(callback) {
    //1
    fs.readFile('./nodejsCallbackAndEvent/mime.json', function (err, data) {
        if(err){
            console.log(err);
            return false;
        }
        //console.log(data.toString());

        callback(data);
    });

    //2
    //return "123";

}

getMime(function (result) {
    console.log(result.toString());
});
*/

//events模块处理异步
const events = require('events');

const EventEmitter = new events.EventEmitter();

//广播和接收广播

//接听

//EventEmitter.on('to_mime', function (data) {
//    console.log("接收到了to_mime的广播");
//    console.log(data);
//});
//
//EventEmitter.on('to_parent', function (data) {
//    console.log("接收到了广播事件");
//    console.log(data);
//
//    EventEmitter.emit('to_mime', data);
//});
//
//setTimeout(function () {
//    EventEmitter.emit('to_parent', '发送的数据')
//},1000);

function getMime() {
    //1
    fs.readFile('./nodejsCallbackAndEvent/mime.json', function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }

        EventEmitter.emit('data', data);

    });
}

getMime();

//接听广播数据
EventEmitter.on('data', function (mime) {
    console.log(mime.toString());
});




