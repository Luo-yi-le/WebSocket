// var util = require('util');
//
// var mysql=require("./mysqlFun.js");
// var arr=[{"AId":1001,"AName":"user"},{"AId":1002,"AName":"user"}];
// arr.forEach(function (item,index) {
//     mysql.query("select * from tbAdmin  where AId = ?",[item.AId],function (res,fields) {
//         console.log(JSON.stringify(res));
//     })
// });
// mysql.query("select * from html_href",[],function (res,fields) {
//     console.log((JSON.stringify(res)));
// })


// var ip = require('ip');
//
// var myip = ip.address();
// console.log(myip);

var express = require('express');
var app = express();
app.listen(8800);

app.get('/', function(req, res) {
    res.send('Hello world');
});
console.log(app.listeners)

