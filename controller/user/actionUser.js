/**
 * 用于用户的动作查询（增删改）
 */

var db=require("./../../mongodb/db")
var Tips=require("./../../config/zh-Ch");

/**
 * 用户修改
 * @param controller
 * @param list
 * @param fn
 */
//TODo 未完成
module.exports.update_user=function (controller,list,fn) {
    if (Tips.Setting.Controller.User.UpdateUser === controller) {
        db.updateUser(Tips.Setting.DB.table.tbUser, list, function (err, res) {
            fn(err, res)
        });
    }
};
