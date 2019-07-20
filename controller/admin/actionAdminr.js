/**
 * 增删改
 */

var db=require("./../../mongodb/db")
var Tips=require("./../../config/zh-Ch");
/**
 * 管理员修改
 * @param controller
 * @param list
 * @param fn
 */
//var obj={sel:{ULoginId:"lisi"}, newParam:{UPassWord:"12345"}}
module.exports.update_admin=function (controller,list,fn) {
    if (Tips.Setting.Controller.Admin.UpdateAdmin === controller) {
        db.login(Tips.Setting.DB.table.tbUser, list, function (err, res) {
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
    if (Tips.Setting.Controller.Admin.DeleteUser===controller) {
        db.deleteUser(Tips.Setting.DB.table.tbUser,list,function (err,res) {
            fn(err,res)
        })
    }
};
