import * as con from "../../modules/config.js"

let fig = con.config;

const ws = new ReconnectingWebSocket(fig.url._ws1);
ws.timeoutInterval = fig.number.thousand * 3;
// ws.onopen = function() {
//     alert("连接成功")
// };

var vm = new Vue({
    el: "#login",
    data: function () {
        return {
            loadingbar: {
                show: false
            },
            loginViewModel: {
                userName: "zhangsan",
                password: "123456",
                email: "2318927272@qq.com"
            },
            radioVal: fig.loginFig.admin,
            radioAdmin: fig.loginFig.admin,
            radioUser: fig.loginFig.user,
            role: "admin",
            tag: "A",
            loginID: fig.loginFig.A_LoginID,
            loginPad: fig.loginFig.A_PassWord,
            forget: false,
            loading :true,
        }
    },
    methods: {
        changeModel: function (value) {
            var that = this;
            if (value == fig.loginFig.admin) {
                that.role = "admin";
                that.tag = "A";
                that.loginID = fig.loginFig.A_LoginID;
                that.loginPad = fig.loginFig.A_PassWord;

                //模拟账号
                that.loginViewModel.userName = "zhangsan";
                that.loginViewModel.password = "123456";
            } else if (value == fig.loginFig.user) {
                that.role = "user";
                that.tag = "L";
                that.loginID = fig.loginFig.U_LoginID;
                that.loginPad = fig.loginFig.U_PassWord;

                //模拟账号
                that.loginViewModel.userName = "lisi13";
                that.loginViewModel.password = "12345";
            }
        },
        handleLogin: function () {
            var that = this;
            var flag = true;
            if (that.loginViewModel.userName === "") {
                that.doLogin();
                that.$Message.error(fig.loginFig.loginId_null);
                that.noLogin();
                flag = false;
                return;
            } else if (that.loginViewModel.password === "") {
                that.doLogin();
                that.$Message.error(fig.loginFig.password_null);
                that.noLogin();
                flag = false;
                return;
            }
            var par = {
                [that.loginID]: that.loginViewModel.userName,
                [that.loginPad]: that.loginViewModel.password
            };
            var data = {
                Tag: that.tag,
                Controller: "login",
                Role: that.role,
                param: {
                    obj: par
                }
            };
            if (flag) {
                ws.send(JSON.stringify(data));
                ws.onmessage = function (res) {
                    that.doLogin();
                    setTimeout(function () {
                        that.completeLogin(JSON.parse(res.data));
                    }, fig.number.thousand * 2);
                };
            }

        },
        doLogin: function () {
            this.loadingbar.show = true;
        },
        noLogin: function () {
            setTimeout(() => {
                this.loadingbar.show = false;
            }, fig.number.thousand)
        },
        goHtml() {
            var html = "";
            if (this.role == "admin") {
                html = "index.html";
            } else if (this.role == "user") {
                html = "user_page/index.html";
            }
            setTimeout(() => {
                window.location.href = html;
            }, fig.number.thousand)
        },
        completeLogin: function (data) {
            if (data.length > 0) {
                this.loadingbar.show = false;
                this.$Message.success(fig.loginFig.$success);
                this.getIpAddress();
                //设置用户TOKEN于localStorage中,系统首页依据此TOKEN来验证是否已登录
                localStorage.setItem(fig.localStorage.$dnc_token, JSON.stringify(data));
                this.goHtml();
            } else if (data.length <= 0) {
                this.loadingbar.show = false;
                this.$Message.error(fig.loginFig.$error);
                return;
            }
        },
        enterClick() {
            const that = this;
            shortcut.add(fig.shortcutKey.$Enter, function () {
                that.handleLogin();
            })
        },
        getIpAddress() {
            $.ajax({
                url: fig.url._http1,
                type: fig.url.$get,
                success: function (res) {
                    console.log(res, "success")
                }
            })
        },
        forgetPwd:function () {
            const that = this;
            var str= /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (str.test(that.loginViewModel.email)) {
                var  par = {
                    [that.loginID]: that.loginViewModel.userName,
                    Email: that.loginViewModel.email
                };

            var data = {
                Tag: "F",
                Controller: "forgetpass",
                Role: that.role,
                param: {
                    obj: par
                }
            };
            ws.send(JSON.stringify(data));
            ws.onmessage = function (res) {
                console.log(res.data)
                if (res.data=="[]"){
                    that.$Message.error("请确认账号、邮箱是否正确");
                    that.loading =true;
                }else{
                    that.$Message.success("密码已发送，请注意查看邮箱");
                    that.forget = false;
                }
            };

            }else{
                that.$Message.error("邮箱格式错误");
                that.loading =true;
                return;
            }
            // setTimeout(() => {
            //
            // }, 5000)
        }
    },
    created() {
        this.enterClick();
    }
});