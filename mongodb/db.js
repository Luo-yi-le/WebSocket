var MongoClient=require("mongodb").MongoClient;
var Tips=require("./../config/zh-Ch");

function _connect(callback){
    MongoClient.connect(Tips.Setting.DB.connStr+Tips.Setting.DB.Port,{ useNewUrlParser: true },function(err,client){
        if(err){
            console.log(Tips.Setting.Error["418"]);
        }else{
            //指定数据库的名字"ProductSys"
            var db=client.db(Tips.Setting.DB.database);
            callback(db);
        }
    })
}

module.exports.GetAllOrOne=function (table,obj,callback) {
    if (obj==undefined||obj==""||obj==null) {
        obj={}
        _connect(function (db) {
            db.collection(table).find(obj).toArray(function (err,res) {
                callback(err,res)
            })
        })
    }else{
        _connect(function (db) {
            //var whereStr = {"UName":obj};
            //console.log("obj"+)
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
    console.log(obj)
    if (obj===undefined||obj===""||obj==null||obj==={}) {
        return Tips.Setting.Tip.tip1;
    }else{
        _connect(function (db) {
            db.collection(table).find(obj).toArray(function (err,res) {
                callback(err,res)
            })
        })
    }
};
