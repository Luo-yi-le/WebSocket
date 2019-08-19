//Mysql配置文件

export const MySql={
    "msDrive":{
        "Host":"localhost",
        "Port":"3306",
        "user":"root",
        "password" : '123456',
        "database" : 'websocket_sys',
        "charset":"UTF8_GENERAL_CI"
    },
    "Statement":{
        "linkApi":"select * from linkApi",
        "html_href":"select * from html_href"
    }
};