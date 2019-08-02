/**
 * 用于用户的动作查询（增删改）
 */

var Controller =require( "../../../../config/Controller").Controller;
var Mongodb= require ("../../../../config/Mongodb").Mongodb;
var db = require("../../../SQL/mongodb/db");

/**
 * 用户修改
 * @param controller
 * @param list
 * @param fn
 */
//TODo 未完成
module.exports.update_user=function (controller,list,fn) {
    if (Controller.User.UpdateUser === controller) {
        db.updateUser(Mongodb.table.tbUser, list, function (err, res) {
            fn(err, res)
        });
    }
};
