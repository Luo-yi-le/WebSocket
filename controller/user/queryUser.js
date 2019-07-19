/**
 * 主要是用户查询操作
 */


var db=require("./../../mongodb/db")
var Tips=require("./../../config/zh-Ch");

/**
 * 用户登陆
 * @param controller
 * @param list
 * @param fn
 */
 module.exports.userLoginController=function (controller,list,fn) {
    if (Tips.Setting.Controller.Admin.Login===controller){
        db.login(Tips.Setting.DB.table.tbUser, list, function (err, res) {
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
    if (Tips.Setting.Controller.User.GetAllOrOne === controller) {
        db.login(Tips.Setting.DB.table.tbUser, list, function (err, res) {
            fn(err, res)
        });
    }
};
