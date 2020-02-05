var tools=require("../assets/tools/tools");
var Ima=require("../common/controller/img/ImageController");
var https=require("https");
var express = require('express');
var multer = require('multer');
var app = express();
app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // res.setHeader("Content-Type", "application/json;charset=utf-8");
    next();
});
//发送请求，获取客户端ip
app.get('/', function (req, res) {
    var clientIp = getIp(req);
    getIpInfo(clientIp, function (err, msg) {
        console.log('Address: ' + util.inspect(msg.data[0].location, true, 8));
        const logger = log.log.getLogger("[" + "地址：" + "]");
        logger.info(clientIp,util.inspect(msg.data[0].location, true, 8));
    });
});

//忘记密码 发送邮箱
 app.get('/image/email',async (req, res)=>{
    var email = req.query.code;
    var userName = req.query.userName;
    console.log(email,userName);
    var code = await tools.createSixNum();
    if (email.length>0){
        res.send(email)
    }
});

app.post('/image/getPicture',(req, res)=>{
    req.on('data', (data) => {
        console.log(data)
    });

    req.on('end', (a) => {
        console.log(a)
    });
    const query=(req.query.code).toLowerCase();
    var filepath=`../../resource/img/${query}/`;
    Ima.Image(req,res,filepath,function (data,err) {

    });
});
var onload=multer({ dest: './../../resource/img/androidpic/' })
var AndroidPic = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            console.log("file: ",req)
            cb(null, './../../resource/img/androidpic/');
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'-'+file.originalname;
            cb(null, changedName);
        }
    })
});
var gFilename = "";
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './../../resource/img/androidpic/');   //此目录是项目根目录下的tmp目录，一定要确保此目录存在，否则上传失败
    },
    filename: function (req, file, callback) {
        console.log(file)
        gFilename = file.originalname;
        callback(null, gFilename);
    }
});
var upload = multer({storage: storage}).any();
app.post('/upload/AndroidPic',(req,res)=>{
    // console.log(req);
    res.setTimeout(1000, function () {
        if (res.finished) {
            return;
        }
        var rtRes = {
            rstcode: "error",
            desc: "system timeout",
            data: {}
        };
        console.log("system response timeout");
        res.writeHead(501, {"Content-Type": "text/html"});
        res.write(JSON.stringify(rtRes));
        res.end();
    });
    upload(req, res, function (err) {
        if (res.finished) {
            return;
        }
        var rst = {
            rstcode: "error",
            desc: "上传失败",
            data: {filename: {}}
        };
        if (err) {
            return res.end(JSON.stringify(rst));
        }
        var file=[];
        rst.rstcode = "success";
        rst.desc = "上传成功";
        rst.data.filename =gFilename;
        file.push(rst)
        res.json(file);
    });
});

var IosPic = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../../resource/img/IosPic/');
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'-'+file.originalname;
            cb(null, changedName);
        }
    })
});
app.post('/upload/IosPic',IosPic.array('file'),(req,res)=>{
    console.log(req.files);
    let fileList = [];
    req.files.map((elem)=>{
        fileList.push({
            originalname: elem.originalname
        })
    });
    res.json({
        code: '0000',
        type:'multer',
        fileList:fileList
    });
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

var server = app.listen(8888, getIPAddress(), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务启动...',host ,port)
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

/**
 * 获取本机IP
 * @return {[string]} [IP地址]
 */
function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}