/**
 * 主要是管理员查询操作
 */


var Controller =require( "../../../../config/Controller").Controller;
var Mongodb= require ("../../../../config/Mongodb").Mongodb;
var db = require("../../../SQL/mongodb/db");


/**
 * 管理员登陆
 * @param controller
 * @param list
 * @param fn
 */
module.exports.adminLoginController = function (controller, list, fn) {
    if (Controller.Admin.Login === controller) {
        db.login(Mongodb.table.tbAdmin, list, function (err, res) {
            fn(err, res)
        });
    }
};

/**
 * 管理员查询用户所有信息
 * @param controller
 * @param list
 * @param fn
 */
module.exports.selectUserInfo_admin=function (controller,list,fn) {
    if (Controller.Admin.GetAllOrOne === controller) {
        db.login(Mongodb.table.tbUser, list, function (err, res) {
            fn(err, res)
        });
    }
};
