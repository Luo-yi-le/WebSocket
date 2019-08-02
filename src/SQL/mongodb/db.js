var MongoClient=require("mongodb").MongoClient;
var Tips=require("../../../config/zh-Ch");

function _connect(callback){
    MongoClient.connect(Tips.Setting.DB.connStr+Tips.Setting.DB.Port,{useNewUrlParser: true },function(err,client){
        if(err){
            console.log(Tips.Setting.Error["418"]);
        }else{
            //指定数据库的名字"ProductSys"
            var db=client.db(Tips.Setting.DB.database);
            callback(db);
        }
    })
}

/**
 * 查询当然或全部
 * @param table
 * @param obj
 * @param callback
 * @constructor
 */
// todo 需要优化 ：模糊查询 分页查询
module.exports.GetAllOrOne=function (table,obj,callback) {
    if (obj==undefined||obj==""||obj==null) {
        obj={};
        _connect(function (db) {
            db.collection(table).find(obj).toArray(function (err,res) {
                callback(err,res)
            })
        })
    }else{
        _connect(function (db) {
            db.collection(table).find(JSON.stringify(obj)).toArray(function (err,res) {
                callback(err,res)
            })
        })
    }
};

/**
 * 登陆（用户和管理员合并在一起）
 * @param table
 * @param obj
 * @param callback
 */
module.exports.login=function (table,obj,callback) {
    console.log(obj);
    if (obj===undefined||obj===""||obj==null||obj==={}) {
        return Tips.Setting.Tip.tip1;
    }else{
        _connect(function (db) {
            db.collection(table).find(obj).toArray(function (err,res) {
                callback(err,res,Tips.Setting.Success["201"]);
            })
        })
    }
};

/**
 * @用户修改 2019-7-18 22:17
 * @param table
 * @param obj
 * @param callback
 */
module.exports.updateUser=function (table,obj,callback) {
    _connect(function (db) {
        db.collection(table).updateOne(obj.sel,{$set:obj.newParam},function (err,res) {
            if (res.result.n==1){
                callback(err,res,Tips.Setting.Success.Update["205"])
            }else{
                callback(err,res,Tips.Setting.Error.Update["420"])
            }
        })
    })
};

/**
 * @删除一条用户信息 2019-7-18 22：37
 * @param table
 * @param obj
 * @param callback
 */
module.exports.deleteUser=function (table,obj,callback) {
    _connect(function (db) {
        db.collection(table).deleteOne(obj,function (err,res) {
            if (res.result.n===1){
                callback(err,res,Tips.Setting.Success.Delete["206"])
            }else{
                callback(err,res,Tips.Setting.Error.Delete["421"])
            }
        })
    })
};

/**
 * @用户注册
 * @param table
 * @param obj
 * @param callback
 */
module.exports.registerUser=function (table,obj,callback) {
    db.collection(table).insertOne(obj,function (err,res) {
        if (res.result.n===1){
            callback(err,res,Tips.Setting.Success["203"])
        }else{
            callback(err,res,Tips.Setting.Error["417"])
        }
    })
};
