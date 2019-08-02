var adminQ = require("../../common/controller/admin/queryAdmin");
var userQ = require("../../common/controller/user/queryUser");
var adminA = require("../../common/controller/admin/actionAdminr");
var userA = require("../../common/controller/user/actionUser");


var ws = require('nodejs-websocket');
var Tips = require("../../../config/zh-Ch");
var WebSocket=require("../../../config/WebSocket").WebSocket;
/**
 * @创建端口号
 * @type {string}
 */
var PORT = WebSocket.wsDrive.Port, HOST = WebSocket.wsDrive.Host;


var wsServer = ws.createServer(function (conn) {
    console.log(Tips.Setting.Success["204"])
    conn.on(WebSocket.Text, function (str) {

        //前端传来的数据
        var data = JSON.parse(str);

        //状态码
        var Tag = data.Tag.toLowerCase();

        //控制器
        var Controller = data.Controller.toLowerCase();

        //用户权限 admin || user
        var Role = data.Role.toLowerCase();
        //循环权限
        switch (Role) {
            //判断管理员
            case Tips.Setting.Role.Admin:
                //循环Admin传来的Tag
                switch (Tag) {
                    //管理员登陆
                    case Tips.Setting.Tag.Admin.A:
                        adminQ.adminLoginController(Controller, data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                        //管理员查询用户所有信息
                    case Tips.Setting.Tag.Admin.S:
                        adminQ.selectUserInfo_admin(Controller.data.param.obj,function (err,res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                        //管理员修改
                    case Tips.Setting.Tag.Admin.E:
                        adminA.update_admin(Controller.data.param.obj,function (err,res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    default:
                        break;
                }
                break;


            //判断用户
            case Role = Tips.Setting.Role.User:
                //循环User传来的Tag
                switch (Tag) {
                    //用户登陆
                    case Tips.Setting.Tag.User.U:
                        userQ.userLoginController(Controller, data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    //用户查询
                    case Tips.Setting.Tag.User.S:
                        userQ.selectUserInfo_user(Controller,data.param.obj,function (err,res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    //用户修改
                    case Tips.Setting.Tag.User.E:
                        userA.update_user(Controller.data.param.obj,function (err,res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    default:
                        break;
                }
                break;

            //默认
            default:
                conn.sendText(data);//收到直接发回去
                break;
        }
    });
    conn.on(WebSocket.Close, function (code, reason) {
        console.log(Tips.Setting.Close.c1001)
    })
    conn.on(WebSocket.Error, function (err) {
        console.log(Tips.Setting.Error["419"]);
        console.log(err)
    })
    conn.on(WebSocket.Message, function (msg) {
        console.log(msg)
    })
}).listen(PORT, HOST);

console.log('websocket wsServer listening on: ' + "ws://" + HOST + ":" + PORT);
