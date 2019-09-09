import ws=require("nodejs-websocket");

import socket = require("../../../config/WebSocket");
import Tips = require("../../../config/zh-Ch");
//日志
import log = require("../../assets/log4js/log4js");

import mysql=require("../../SQL/mySqlH/mysqlFun");
import fig=require("../../../config/MySql");


/**
 * @创建端口号
 * @type {string}
 */
const PORT = socket.WebSocket.htmlDrive.Port, HOST = socket.WebSocket.htmlDrive.Host;

class HtmlServer {
    constructor(){
        this.init();
    }

    public init(){
        var server=ws.createServer((conn)=>{
            console.log(Tips.Setting.Success["204"]);
            conn.on(socket.WebSocket.htmlDrive.Text,function (str) {
                //前端传来的数据
                var data = JSON.parse(str);
                switch (data) {
                    case 1:
                        mysql.query(fig.MySql.Statement.html_href,[],function (res,fields) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    default:
                        break;
                }

                // conn.sendText(str)
            });
            conn.on(socket.WebSocket.wsDrive.Close, function (code, reason) {
                var logger = log.log.getLogger("["+"WebSocket："+socket.WebSocket.wsDrive.Close+"]");
                logger.off(Tips.Setting.Close.c1001);
            });
            conn.on(socket.WebSocket.wsDrive.Error, function (err, reason) {
                var logger = log.log.getLogger("["+"WebSocket："+socket.WebSocket.wsDrive.Error+"]");
                logger.error(Tips.Setting.Error["419"],err.code);
            });
            conn.on(socket.WebSocket.wsDrive.Message, function (msg) {
                console.log(msg)
            })
        }).listen(PORT);

        var logger = log.log.getLogger("[WebSocket]");
        logger.info('websocket HtmlServer listening on: ' + "ws://" + HOST + ":" + PORT);
    }
}
export=HtmlServer;
new HtmlServer();