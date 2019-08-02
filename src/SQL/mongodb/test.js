var  log=require("../../assets/log4js/log4js");

var db = require("./db.js");
var Tips=require("../../../config/zh-Ch");
var tbUser = "dbo.tbUser";
var tbAdmin = "dbo.tbAdmin";

// var dirname=require("../../assets/log4js/test_log")
// console.log(dirname.dirname())

// const log4js = require('log4js');
// log4js.configure((dirname.dirname()+'/log4js.json'));

//查询l
// var getallorone1=Tips.Setting.Controller.GetAllOrOne
// db.GetAllOrOne(tbUser,"{}",function (err,data) {
//     console.logs(data)
// });

//登陆
var whereStr = {"ALoginID":'zhangsan',"APassWord":"123456"};
db.login(tbAdmin,whereStr,function (err,data) {
    var logger=log.log.getLogger("["+tbAdmin+"]");
    logger.info(JSON.stringify(data));
});

//获取ip
// var os = require('os');
// var ifaces = os.networkInterfaces();
//
// for (var dev in ifaces) {
//     var alias = 0;
//     ifaces[dev].forEach(function (details) {
//         if (details.family == 'IPv4') {
//             console.logs(details.address)
//             //console.logs(dev + (alias ? ':' + alias : ''), details.address);
//             ++alias;
//         }
//     });
// }

//修改
// var obj={sel:{ULoginId:"lisi"}, newParam:{UPassWord:"12345"}};
// db.updateUser(tbUser,obj,function (err,res,tip) {
//     console.logs(tip)
// });

//删除
// var obj={ULoginId:"zhangguorong"};
// db.deleteUser(tbUser,obj,function (err,res,tip) {
//     console.logs(tip)
// });



