#!/usr/bin/env node
//日志
var log = require("../assets/log4js/log4js");
var Tips = require("../../config/zh-Ch");
var html = require("./websocket/htmlServer");
var ws = require("./websocket/wsServer");

if (html !== undefined && html !== null && ws !== undefined && ws !== null) {
    const logger = log.log.getLogger("[" + "launch：所有服务" + "]");
    logger.info(Tips.Setting.Success["208"]);
}

var express = require('express')
var app = express();
//发送请求，获取客户端ip
app.get('/', function (req, res) {
    var clientIp = getIp(req)
    console.log(clientIp)
})
//通过req的hearers来获取客户端ip
var getIp = function(req) {
    var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0];
    }
    return ip;
};
// 指定ipv4格式
var server = app.listen(8089, '0.0.0.0',function () {
    var host = server.address().address
    var port = server.address().port
    console.log('服务启动...')
})