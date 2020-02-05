const redisDB=require("redis");
const config=require("redis.config.js").redisFig;
console.log(config)
const client=redisDB.createClient(config.host,config.host,config.opts);

client.on("ready",(err,res)=>{
    console.log("ready",err,res)
});

// var redis = require("redis"),
//     RDS_PORT = 6379, //端口号
//     RDS_HOST = '127.0.0.1', //服务器IP
//     RDS_PWD = '123456',
//     RDS_OPTS = {auth_pass:RDS_PWD},  //设置项 密码
//     client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
//
// client.on("ready",function(err){
//     if(err){
//         console.log("err : "+err);
//     }else{
//         console.log("redis start 2");
//     }
// });