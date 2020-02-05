var ip = require('ip');

var hip = ip.address();
console.log(hip)
module.exports.redisFig={
    host:hip,
    port:6379,
    password:"123456",
    opts:{"auth_pass":123456}
};
