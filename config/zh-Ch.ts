export const Setting = {
    "Error": {
        "301": "对象已永久移走，即永久重定向",
        "302": "对象已临时移动",
        "304": "未修改",
        "307": "临时重定向",
        "400": "错误的请求",
        "401": "访问被拒绝",
        "402": "登录失败",
        "403": "禁止访问",
        "403.4": "要求SSL证书",
        "403.5": "要求SSL128",
        "403.6": "IP地址被拒绝",
        "403.7": "要求客户端证书",
        "403.9": "用户数访问过多",
        "404": "未找到",
        "414": "请求URI太长",
        "415": "登陆失败",
        "416": "无该用户",
        "417": "注册失败",
        "418": "数据库连接失败",
        "419": "连接出错",
        "Update":{
            "420":"修改失败",
        },
        "Delete":{
            "421":"删除失败",
        },
        "Insert":{
            "422":"添加失败",
        }
    },
    "Close": {
        "c1001": "连接关闭",
    },
    "Success": {
        "200": "成功",
        "201": "登陆成功",
        "202": "查询成功",
        "203": "注册成功",
        "204": "连接创建成功",
        "Update":{
            "205":"修改成功",
        },
        "Delete":{
            "206":"删除成功",
        },
        "Insert":{
            "207":"添加成功",
        }
    },
    //即时通讯
    "WebSocket": {
        "Host": "127.0.0.1",
        "Port": "3003",
        "Text": "text",
        "Close": "close",
        "Error": "error",
        "Message": "message"

    },
    //数据库
    "DB": {
        "connStr": "mongodb://localhost:",
        "Port": "27017/",
        "database": "ProductSys",
        "table": {
            "tbUser": "dbo.tbUser",
            "tbAdmin": "dbo.tbAdmin",
        },
    },
    "Tip": {
        "tip1": "请输入账号和密码"
    },
    //接受的状态码
    "Tag": {
        "Admin": {
            "A": "a",
            "S": "s",
        },
        "User": {
            "U": "u",
            "S": "s",
        },
    },
    //控制器
    "Controller": {
        "Admin":{
            "Login": "login",
            "GetAllOrOne": "getallorone",
        },
        "User":{
            "Login": "login",
            "GetAllOrOne": "getallorone",
        },
    },
    //角色 权限
    "Role":{
        "Admin":"admin",
        "User":"user",
    }
};
