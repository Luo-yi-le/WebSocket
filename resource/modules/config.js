export const config = {
    url: {
        _ws1: "ws://192.168.60.107:3003",
        _ws2: "",
        _http1: "http://192.168.60.107:8089/",
        $get: "get",
        $post: "post"
    },
    localStorage: {
        $dnc_token:"dnc_token"
    },
    shortcutKey:{
        $Enter:"Enter"
    },
    number:{
        thousand:1000
    },
    userFig: {
        $pageArr: [10, 20, 40, 50, 100],
        $dataCount: 0
    },
    loginFig: {
        admin:"管理员",
        user:"普通用户",
        A_LoginID: "ALoginID",
        A_PassWord: "APassWord",
        U_LoginID: "ULoginId",
        U_PassWord: "UPassWord",
        loginId_null: "账号不能为空",
        password_null: "密码不能为空",
        $success:"登录成功",
        $error:"登录失败！请检查账号密码是否正确!"
    }
};
