const path = require('path');
var  Tips = require("../../../config/zh-Ch");
var MySql=require("../../../config/MySql").MySql.msDrive;
//配置链接数据库参数
module.exports.fig = {
    host : MySql.Host,
    port : MySql.Port,//端口号
    database :MySql.database,//数据库名
    user : MySql.user,//数据库用户名
    password :MySql.password,//数据库密码
};