const ws = new WebSocket("ws://192.168.60.107:3003");
ws.onopen = function() {
    alert("连接成功")
};

var vm = new Vue({
    el: "#app",
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
                that.$Message.error("账号不能为空");
                that.noLogin();
                 flag = false;
                return;
            } else if (that.loginViewModel.password === "") {
                that.doLogin();
                that.$Message.error("密码不能为空");
                that.noLogin();
                 flag = false;
                return;
            }
            var par = {
                "ALoginID": that.loginViewModel.userName,
                "APassWord": that.loginViewModel.password
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
                    }, 2000);
                };
            }

        },
        doLogin: function() {
            this.loadingbar.show = true;
        },
        noLogin: function() {
            setTimeout(() => {
                this.loadingbar.show = false;
            }, 1000)
        },
        goHtml() {
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000)
        },
        completeLogin: function(data) {
            if (data.length > 0) {
                this.loadingbar.show = false;
                this.$Message.success("登录成功");
                this.getIpAddress();
                //设置用户TOKEN于localStorage中,系统首页依据此TOKEN来验证是否已登录
                localStorage.setItem("dnc_token", JSON.stringify(data));
                this.goHtml();
            } else if (data.length <= 0) {
                this.loadingbar.show = false;
                this.$Message.error("登录失败！请检查账号密码是否正确");
                return;
            }
        },
        enterClick() {
            const that = this;
            shortcut.add("Enter", function() {
                that.handleLogin();
            })
        },
        getIpAddress(){
            $.ajax({
                url:"http://192.168.60.107:8089/",
                type:"get",
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