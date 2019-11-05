//加载所需要的模块
var http = require('http');

var processRequest = require('./server');

//创建服务，这里很机智的把对response和request的处理封装成一个匿名函数，传入createServer中
//也可以直接在里面写，但是看起来不是很整洁
var httpServer = http.createServer((req, res) => {
    processRequest(req, res);
});

var port = 9980;

//指定一个监听的接口
httpServer.listen(port,'0.0.0.0', function() {
    console.log(`http://192.168.60.107:${port}`);
});