/**
 * 主要是管理员查询操作
 */


var db=require("./../../mongodb/db")
var Tips=require("./../../config/zh-Ch");

/**
 * 管理员登陆
 * @param controller
 * @param list
 * @param fn
 */
 module.exports.adminLoginController=function (controller,list,fn) {
    if (Tips.Setting.Controller.Admin.Login===controller){
        db.login(Tips.Setting.DB.table.tbAdmin, list, function (err, res) {
            fn(err,res)
        });
    }
};