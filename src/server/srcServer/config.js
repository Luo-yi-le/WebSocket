//获取ip
var os = require('os');
var ifaces = os.networkInterfaces();
var hostAddress=[];
for (var dev in ifaces) {
    var alias = 0;
    ifaces[dev].forEach(function (details,index) {
        if (details.family == 'IPv4') {
            hostAddress.push(details.address);
            ++alias;
        }
    });
}

module.exports = {
    port: 9080, // 默认端口
    host: hostAddress[0], // 默认主机名
    dir: process.cwd(), // 默认读取目录
}