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
