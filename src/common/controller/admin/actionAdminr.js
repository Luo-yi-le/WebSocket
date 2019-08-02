/**
 * 增删改
 */
var Controller =require( "../../../../config/Controller").Controller;
var Mongodb= require ("../../../../config/Mongodb").Mongodb;
var db = require("../../../SQL/mongodb/db");

/**
 * 管理员修改
 * @param controller
 * @param list
 * @param fn
 */
//var obj={sel:{ULoginId:"lisi"}, newParam:{UPassWord:"12345"}}
module.exports.update_admin=function (controller,list,fn) {
    if (Controller.Admin.UpdateAdmin === controller) {
        db.login(Mongodb.table.tbUser, list, function (err, res) {
            fn(err, res)
        });
    }
};

/**
 * 管理员删除用户
 * @param controller
 * @param list
 * @param fn
 */
module.exports.delete_user=function (controller,list,fn) {
    if (Controller.Admin.DeleteUser===controller) {
        db.deleteUser(Mongodb.table.tbUser,list,function (err,res) {
            fn(err,res)
        })
    }
};
