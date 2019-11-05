var  log=require("../../assets/log4js/log4js");

var db = require("./db.js");
var Tips=require("../../../config/zh-Ch");
var tbUser = "dbo.tbUser";
var tbAdmin = "dbo.tbAdmin";
var Controller =require( "../../../config/Controller").Controller;

var mail=require("../../email/nodemailer");
// var dirname=require("../../assets/log4js/test_log")
// console.log(dirname.dirname())

// const log4js = require('log4js');
// log4js.configure((dirname.dirname()+'/log4js.json'));

//查询l
// var getallorone1=Controller.User.GetAllOrOne
// db.GetAllOrOne(tbUser,{},function (err,data) {
//     console.log(data)
// });

//登陆
// var whereStr = {"ALoginID":'zhangsan',"APassWord":"123456"};
// db.login(tbAdmin,whereStr,function (err,data) {
//     var logger=log.log.getLogger("["+tbAdmin+"]");
//     logger.info(JSON.stringify(data));
// });



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

// //添加
// var list={"ULoginId":'wangwu',"UPassWord":"123456","UName":"王五","Image":"wangwu.png"};
// db.registerUser(tbUser,list,function (err ,res,tip) {
//
// });

//1783913526@qq.com
var list={"ULoginId":'hemm',"Email":"316373083@qq.com"};
db.forget(tbUser,list,function (err,res,tip) {
    if (res.length>0){
        mail.emaileFun(res);
        console.log(res)
    }
});

