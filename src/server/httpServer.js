var tools=require("../assets/tools/tools");
var https=require("https");
var express = require('express');
var app = express();
//发送请求，获取客户端ip
app.get('/', function (req, res) {
    var clientIp = getIp(req);
    getIpInfo(clientIp, function (err, msg) {
        console.log('Address: ' + util.inspect(msg.data[0].location, true, 8));
        const logger = log.log.getLogger("[" + "地址：" + "]");
        logger.info(clientIp,util.inspect(msg.data[0].location, true, 8));
    });
});

app.get('/image/email',async (req, res)=>{
    var email = req.query.code;
    var userName = req.query.userName;
    console.log(email,userName);
    var code = await tools.createSixNum();
    if (email.length>0){
        res.send(email)
    }
});

//通过req的hearers来获取客户端ip
var getIp = function (req) {
    var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    return ip;
};

// 指定ipv4格式
var server = app.listen(8089, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务启动...')
});


var getIpInfo = function (ip, cb) {
    var url = "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query="
        + ip + "&co=&resource_id=6006&t=1555898284898&ie=utf8&oe=utf8&format=json&tn=baidu";
    https.get(url, function (res) {
        var code = res.statusCode;
        if (code == 200) {
            res.on('data', function (data) {
                try {
                    cb(null, JSON.parse(data));
                } catch (err) {
                    cb(err);
                }
            });
        } else {
            cb({code: code});
        }
    }).on('error', function (e) {
        cb(e);
    });
};