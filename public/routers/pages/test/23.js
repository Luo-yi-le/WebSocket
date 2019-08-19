var vs = new Vue({
    el: "#menu",
    data() {
    },
    methods: {
        userLogin1() {
            var ws = new ReconnectingWebSocket("ws://127.0.0.1:3003");
            ws.timeoutInterval=10000;
            var par = {"ULoginId": $("#ULoginId").val(), "UPassWord": $("#UPassWord").val()};
            var data = {
                Tag: "U",
                Controller: "login",
                Role: "user",
                param: {
                    obj: par
                }
            };

            ws.onopen = function (evt) {
                console.log("连接成功");
                //向服务端发送信息
                ws.send(JSON.stringify(data));
            };

            ws.onmessage = function (res) {
                console.log(res.data);
            };
        }
    },
    created() {

    }
});