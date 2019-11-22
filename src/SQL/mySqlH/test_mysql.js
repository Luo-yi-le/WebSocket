// var util = require('util');
//
var mysql=require("./mysqlFun.js");
var arr=[{"AId":1001,"AName":"image"},{"AId":1002,"AName":"image"}];
arr.forEach(function (item,index) {

});

var u='user'
mysql.query("select * from linkApi where  role = ?","user",function (res,fields) {
    console.log(JSON.stringify(res));
})
// mysql.query("select * from html_href",[],function (res,fields) {
//     console.log((JSON.stringify(res)));
// })


// var ip = require('ip');
//
// var myip = ip.address();
// console.log(myip);
//
// var express = require('express');
// var app = express();
// app.listen(8800);
//
// app.get('/', function(req, res) {
//     res.send('Hello world');
// });
// console.log(app.listeners)

