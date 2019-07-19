/**
 * 主要是管理员查询操作
 */


var db = require("./../../mongodb/db")
var Tips = require("./../../config/zh-Ch");

/**
 * 管理员登陆
 * @param controller
 * @param list
 * @param fn
 */
module.exports.adminLoginController = function (controller, list, fn) {
    if (Tips.Setting.Controller.Admin.Login === controller) {
        db.login(Tips.Setting.DB.table.tbAdmin, list, function (err, res) {
            fn(err, res)
        });
    }
};

/**
 * 管理员查询用户所有信息
 * @param controller
 * @param list
 * @param fun
 */
module.exports.selectUserInfo_admin=function (controller,list,fun) {
    if (Tips.Setting.Controller.Admin.GetAllOrOne === controller) {
        db.login(Tips.Setting.DB.table.tbUser, list, function (err, res) {
            fn(err, res)
        });
    }
};
