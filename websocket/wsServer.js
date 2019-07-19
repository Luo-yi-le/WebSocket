var admin = require("../controller/admin/queryAdmin");
var user = require("../controller/user/queryUser");

var ws = require('nodejs-websocket');
var Tips = require("./../config/zh-Ch");
var db = require("./../mongodb/db.js");
/**
 * @创建端口号
 * @type {string}
 */
var PORT = Tips.Setting.WebSocket.Port, HOST = Tips.Setting.WebSocket.Host;


var wsServer = ws.createServer(function (conn) {
    console.log(Tips.Setting.Success["204"])
    conn.on(Tips.Setting.WebSocket.Text, function (str) {

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
                        admin.adminLoginController(Controller, data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    case Tips.Setting.Tag.Admin.S:break;
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
                        user.userLoginController(Controller, data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    case Tips.Setting.Tag.Admin.S:break;
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
    conn.on(Tips.Setting.WebSocket.Close, function (code, reason) {
        console.log(Tips.Setting.Close.c1001)
    })
    conn.on(Tips.Setting.WebSocket.Error, function (err) {
        console.log(Tips.Setting.Error["419"]);
        console.log(err)
    })
    conn.on(Tips.Setting.WebSocket.Message, function (msg) {
        console.log(msg)
    })
}).listen(PORT, HOST);

console.log('websocket wsServer listening on: ' + "ws://" + HOST + ":" + PORT);
