var adminQ = require("../../common/controller/admin/queryAdmin");
var userQ = require("../../common/controller/user/queryUser");
var adminA = require("../../common/controller/admin/actionAdminr");
var userA = require("../../common/controller/user/actionUser");

var ws = require('nodejs-websocket');
var Tips = require("../../../config/zh-Ch");
var WebSocket = require("../../../config/WebSocket").WebSocket;

//日志
var log = require("../../assets/log4js/log4js");

/**
 * @创建端口号
 * @type {string}
 */
var PORT = WebSocket.wsDrive.Port, HOST = WebSocket.wsDrive.Host;


var wsServer = ws.createServer(function (conn,res) {
    console.log(Tips.Setting.Success["204"]);
    conn.on(WebSocket.wsDrive.Text, function (str) {

        //前端传来的数据
        var data = JSON.parse(str);

        //用户权限 admin || user
        var Role = data.Role.toLowerCase();

        //状态码
        var Tag = data.Tag.toLowerCase();

        //控制器
        var Controller = data.Controller.toLowerCase();
        //循环权限
        switch (Role) {
            //判断管理员
            case Tips.Setting.Role.Admin:
                //循环Admin传来的Tag
                switch (Tag) {
                    //管理员登陆
                    case WebSocket.Tag.Admin.A:
                        adminQ.adminLoginController(Controller, data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    //管理员查询用户所有信息
                    case  WebSocket.Tag.Admin.S:
                        adminQ.selectUserInfo_admin(Controller,data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    //管理员修改
                    case WebSocket.Tag.Admin.U:
                        adminA.update_admin(Controller,data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    case WebSocket.Tag.Admin.D:
                        console.log("res :",Controller,data.param.obj);
                        adminA.delete_user(Controller,data.param.obj, function (err, res) {

                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    default:
                        break;
                }
                break;

            //判断用户
            case Tips.Setting.Role.User:

                //循环User传来的Tag
                switch (Tag) {
                    //用户登陆
                    case WebSocket.Tag.User.L:
                        userQ.userLoginController(Controller, data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    //用户查询
                    case WebSocket.Tag.User.S:
                        userQ.selectUserInfo_user(Controller, data.param.obj, async function (err, res) {
                            await conn.sendText(JSON.stringify(res))
                        });
                        break;
                    //用户修改
                    case WebSocket.Tag.User.U:
                        userA.update_user(Controller.data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;

                    default:
                        break;
                }
                break;

            //默认
            default:
                conn.sendText(JSON.stringify(data));//收到直接发回去
                break;
        }
    });

    conn.on(WebSocket.wsDrive.Close, function (code, reason) {
        var logger = log.log.getLogger("["+"WebSocket："+WebSocket.wsDrive.Close+"]");
        logger.off(Tips.Setting.Close.c1001);
    });
    conn.on(WebSocket.wsDrive.Error, function (err, reason) {
        var logger = log.log.getLogger("["+"WebSocket："+WebSocket.wsDrive.Error+"]");
        logger.error(Tips.Setting.Error["419"],err.code);
    });
    conn.on(WebSocket.wsDrive.Message, function (msg) {
        console.log(msg)
    })
}).listen(PORT);

var logger = log.log.getLogger("[WebSocket]");
logger.info('websocket wsServer listening on: ' + "ws://" + HOST + ":" + PORT);