/**
 * 主要是用户查询操作
 */


var Controller =require( "../../../../config/Controller").Controller;
var Mongodb= require ("../../../../config/Mongodb").Mongodb;
var db = require("../../../SQL/mongodb/db");

/**
 * 用户登陆
 * @param controller
 * @param list
 * @param fn
 */
 module.exports.userLoginController=function (controller,list,fn) {
    if (Controller.Admin.Login===controller){
        db.login(Mongodb.table.tbUser, list, function (err, res) {
            fn(err,res)
        });
    }
};

/**
 * 查询用户所有信息
 * @param controller
 * @param list
 * @param fun
 */
module.exports.selectUserInfo_user=function (controller,list,fun) {

    var data="";
    if (list=="{}"||list==undefined||list==""){
       data=list;
    } else{
        data={
            UName:{$regex:list.UName},
            ULoginId:{$regex:list.ULoginId}
        };
    }
    if (Controller.User.GetAllOrOne === controller) {
        db.login(Mongodb.table.tbUser, data, function (err, res) {
            fun(err, res)
        });
    }
};
