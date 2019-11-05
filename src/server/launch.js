#!/usr/bin/env node
//日志
var log = require("../assets/log4js/log4js");

var https = require('https');
var http = require('http');
var util = require('util');


var Tips = require("../../config/zh-Ch");
var html = require("./websocket/htmlServer");
var ws = require("./websocket/wsServer");
var hp = require("./httpServer");
if (html !== undefined && html !== null && ws !== undefined && ws !== null) {
    const logger = log.log.getLogger("[" + "launch：所有服务" + "]");
    logger.info(Tips.Setting.Success["208"]);
}






// getIpInfo("60.222.230.50", function(err, msg) {
//    // console.log('城市: ' + JSON.stringify(msg.data[0].location));
//     console.log('msg: ' + util.inspect(msg.data[0].location, true, 8));
// })

