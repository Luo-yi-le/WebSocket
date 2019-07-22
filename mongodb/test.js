var db = require("./db.js");
var Tips=require("./../config/zh-Ch");
var tbUser = "dbo.tbUser";
var tbAdmin = "dbo.tbAdmin";

const log4js = require('log4js');
log4js.configure('../log4js/log4js.json');

//查询l
// var getallorone1=Tips.Setting.Controller.GetAllOrOne
// db.GetAllOrOne(tbUser,"{}",function (err,data) {
//     console.logs(data)
// });

//登陆
var whereStr = {"ALoginID":'zhangsan',"APassWord":"123456"};
db.login(tbAdmin,whereStr,function (err,data) {
    const logger = log4js.getLogger("["+tbAdmin+"]");
    logger.info(JSON.stringify(data))
    //console.log(data)
})

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
