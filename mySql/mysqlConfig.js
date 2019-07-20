var  Tips = require("./../config/zh-Ch");
//配置链接数据库参数
module.exports = {
    host : Tips.Setting.MySql.Host,
    port : Tips.Setting.MySql.Port,//端口号
    database :Tips.Setting.MySql.database,//数据库名
    user : Tips.Setting.MySql.user,//数据库用户名
    password : Tips.Setting.MySql.password,//数据库密码
    charset:Tips.Setting.MySql.charset
};
