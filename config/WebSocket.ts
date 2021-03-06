//即时通讯 WebSocket配置文件
export const WebSocket={
    //驱动
    "wsDrive":{
        "Host": "192.168.60.107",
        "Port": "3003",
        "Text": "text",
        "Close": "close",
        "Error": "error",
        "Message": "message"
    },
    //html驱动
    "htmlDrive":{
        "Host": "192.168.60.107",
        "Port": "3099",
        "Text": "text",
        "Close": "close",
        "Error": "error",
        "Message": "message"
    },
    //接受的状态码
    "Tag": {
        "Admin": {
            "A": "a",
            "S": "s",
            "D":"d",
            "U":"u",
        },
        "User": {
            "L":"l",
            "U": "u",
            "S": "s",
            "D":"d",
            "F":"f",//忘记密码
        },
    },
};