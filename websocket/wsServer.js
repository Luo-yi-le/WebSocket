var ws = require('nodejs-websocket');
var Tips=require("./../config/zh-Ch");
var db = require("./../mongodb/db.js");
/**
 * @创建端口号
 * @type {string}
 */
var PORT = Tips.Setting.WebSocket.Port, HOST = Tips.Setting.WebSocket.Host;


var wsServer = ws.createServer(function (conn) {
    console.log(Tips.Setting.Success["204"])
    conn.on(Tips.Setting.WebSocket.Text, function (str) {
        // var data = JSON.parse(str.toLowerCase());
        var data = JSON.parse(str);
        var code=data.code.toLowerCase();
        switch (code) {
            case code=Tips.Setting.Code.S:
                switch (data.controller) {
                    case "getAllOrOne":
                        db.GetAllOrOne(Tips.Setting.DB.table.tbUser, data.param.obj, function (err, res) {
                            conn.sendText(JSON.stringify(res))
                        });
                        break;
                    default:
                        break;
                }
                break;
            case code=Tips.Setting.Code.A:
                db.login(Tips.Setting.DB.table.tbAdmin, data.param.obj, function (err, res) {
                    conn.sendText(JSON.stringify(res))
                });
                break;
            case code=Tips.Setting.Code.U:
                db.login(Tips.Setting.DB.table.tbUser, data.param.obj, function (err, res) {
                    console.log(res);
                    conn.sendText(JSON.stringify(res))
                });
                break;
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