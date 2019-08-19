//即时通讯 WebSocket配置文件
export const WebSocket={
    //驱动
    "wsDrive":{
        "Host": "127.0.0.1",
        "Port": "3003",
        "Text": "text",
        "Close": "close",
        "Error": "error",
        "Message": "message"
    },
    //html驱动
    "htmlDrive":{
        "Host": "127.0.0.1",
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
            "E":"e",
        },
        "User": {
            "U": "u",
            "S": "s",
            "E":"e",
        },
    },
};