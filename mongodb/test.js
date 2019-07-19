var db = require("./db.js");
var Tips=require("./../config/zh-Ch");
var tbUser = "dbo.tbUser";
var tbAdmin = "dbo.tbAdmin";

//查询
// var getallorone1=Tips.Setting.Controller.GetAllOrOne
// db.GetAllOrOne(tbUser,"{}",function (err,data) {
//     console.log(data)
// });

//登陆
// var whereStr = {"ALoginID":'zhangsan',"APassWord":"123456"};
// db.login(tbAdmin,whereStr,function (err,data) {
//     console.log(data)
// })

//获取ip
// var os = require('os');
// var ifaces = os.networkInterfaces();
//
// for (var dev in ifaces) {
//     var alias = 0;
//     ifaces[dev].forEach(function (details) {
//         if (details.family == 'IPv4') {
//             console.log(details.address)
//             //console.log(dev + (alias ? ':' + alias : ''), details.address);
//             ++alias;
//         }
//     });
// }

//修改
// var obj={sel:{ULoginId:"lisi"}, newParam:{UPassWord:"12345"}};
// db.updateUser(tbUser,obj,function (err,res,tip) {
//     console.log(tip)
// });

//删除
// var obj={ULoginId:"zhangguorong"};
// db.deleteUser(tbUser,obj,function (err,res,tip) {
//     console.log(tip)
// });
