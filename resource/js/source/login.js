import * as con from "../../modules/config.js"
let fig=con.config;

const ws = new ReconnectingWebSocket(fig.url._ws1);
ws.timeoutInterval = fig.number.thousand*3;
// ws.onopen = function() {
//     alert("连接成功")
// };

var vm = new Vue({
    el: "#login",
    data: function() {
        return {
            loadingbar: {
                show: false
            },
            loginViewModel: {
                userName: "zhangsan",
                password: "123456"
            }
        }
    },
    methods: {
        handleLogin: function() {
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
                [fig.loginFig.A_LoginID]: that.loginViewModel.userName,
                [fig.loginFig.A_PassWord]: that.loginViewModel.password
            };
            var data = {
                Tag: "A",
                Controller: "login",
                Role: "admin",
                param: {
                    obj: par
                }
            };
            if (flag) {
                ws.send(JSON.stringify(data));
                ws.onmessage = function(res) {
                    that.doLogin();
                    setTimeout(function() {
                        that.completeLogin(JSON.parse(res.data));
                    }, fig.number.thousand*2);
                };
            }

        },
        doLogin: function() {
            this.loadingbar.show = true;
        },
        noLogin: function() {
            setTimeout(() => {
                this.loadingbar.show = false;
            }, fig.number.thousand)
        },
        goHtml() {
            setTimeout(() => {
                window.location.href = "index.html";
            }, fig.number.thousand)
        },
        completeLogin: function(data) {
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
            shortcut.add(fig.shortcutKey.$Enter, function() {
                that.handleLogin();
            })
        },
        getIpAddress(){
            $.ajax({
                url:fig.url._http1,
                type:fig.url.$get,
                success:function (res) {
                    console.log(res,"success")
                }
            })
        }

    },
    created() {
        this.enterClick();
    }
});