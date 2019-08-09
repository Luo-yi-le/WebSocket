var util = require('util');

var mysql=require("./mysqlFun.js");
// var arr=[{"AId":1001,"AName":"user"},{"AId":1002,"AName":"user"}];
// arr.forEach(function (item,index) {
//     mysql.query("select * from tbAdmin  where AId = ?",[item.AId],function (res,fields) {
//         console.log(JSON.stringify(res));
//     })
// });
mysql.query("select * from linkApi",[],function (res,fields) {
    console.log(JSON.stringify(res));
})
