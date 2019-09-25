(function (root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.UMD_ROOT = factory(window, jQuery, document), (root.jQuery);
    }
}(this, function (win, $, doc) {
    const global = {
        init: function () {
            const that = this;
            return (function () {
                setInterval(function(){that.getTimeValue();},1000);
                that.supportWebSocket();
                that.JudgeOnLine("http://192.168.60.107:8080/json/menu/Menu_sotl.json");
                // win.iview.Message.error("你好");
                that.getToken();
                that.SignOut()
            })();
        }
        /**
         * @判断是否联网
         */
        , httpRequest: function () {
            return (function () {
                var xmlHttp;
                try {
                    xmlHttp = new XMLHttpRequest();
                } catch (e) {
                    try {
                        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                        alert("您的浏览器不支持AJAX！");
                        return false;
                    }
                }
                return xmlHttp;

            })()
        }
        , JudgeOnLine: function (url) {
            return (function () {
                var ajax = global.httpRequest();
                if (win.navigator.onLine === true) {
                    ajax.open("get", url, true);
                    ajax.onreadystatechange = function (res) {
                        if (res.target.readyState === 4) {
                            if (res.target.status === 200) {
                                var response = (res.target.responseText);
                                if (response === "" || response === "" || response === undefined) {
                                    alert("该网络不可用， 请切换网络！");
                                    return
                                }

                            }
                        }
                    };

                    ajax.send(url);
                } else {
                    alert("网络未连接");
                    return
                }
            })();
        }
        , supportWebSocket: function () {
            return (function () {
                if (typeof WebSocket !== "undefined") {
                    // alert('支持')
                } else {
                    alert("不支持")
                }
            })();
        }
        , getTimeValue: function () {
            return (function () {
                var week =['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = "00" + date.getHours();
                hour = hour.substr(hour.length - 2);
                var minute = "00" + date.getMinutes();
                minute = minute.substr(minute.length - 2);
                var second = "00" + date.getSeconds();
                second = second.substr(second.length - 2);
                $('[data-time="data-time"]').html(year + "-" + month + "-" + day + " " +" " +week[day-1]+" " + " " + hour + ":" + minute + ":" + second);
            })();
        }
        ,getToken:function(){
            return (function () {
                setTimeout(function () {
                    var token = localStorage.getItem("dnc_token");
                    if(!token) return;
                    var data_image='[data-user="user-image"]';

                    if(JSON.parse(token)[0].Image===""||JSON.parse(token)[0].Image===null){
                        return;
                    }else{
                        var image= $(data_image).css("background-image");
                        if (!image)return;
                        var url=image.substring(5,41)+JSON.parse(token)[0].Image;
                        $(data_image).attr("style","background-image: url('"+url+"')");
                    }
                },500)
            })();
        }
        ,SignOut:function () {
            setTimeout(function () {
                return (function () {
                    $('[data-close="signout"]').click(function () {
                        if(confirm("是否退出该账号？")){
                            win.iview.Message.success("退出成功！");
                            setTimeout(function () {
                                win.location.href = "login.html";
                                localStorage.clear();
                            },500)
                        }
                    })
                })()
            },500);

        }
    };

    //引用加载事件
    global.init()
}));

