var nodemailer = require('nodemailer');
module.exports.emaileFun = function (obj) {
    // 开启一个 SMTP 连接池
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secureConnection: true,
        port: 465,
        secure: true,
        auth: {
            user: '2318927272@qq.com',
            pass: 'dcolsjfdzqaveaji'
        }
    });
    let mailOptions = {
        from: '<2318927272@qq.com>', // 发送人
        to: obj[0].Email,
        subject: obj[0].UName+" 请确认凭证",
        // 发送text或者html格式
        // text: 'Hello world?',
        html: `<a href='http://192.168.60.107:8089/user/email?userName=${obj[0].UName}&code=${obj[0].Email}'>请点击该链接确定凭证</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Message: ${info.messageId}`);
        console.log(`sent: ${info.response}`);
    });
};

