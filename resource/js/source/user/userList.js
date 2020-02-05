import * as con from "../../../modules/config.js";
import * as load from "../../../modules/loading.js";
let fig = con.config;
var ws;
ws = new ReconnectingWebSocket(fig.url._ws1);
ws.timeoutInterval = fig.number.thousand * 3;
import * as baseShell from "../../../modules/baseShellInit.js"


var vm = new Vue({
    el: "#userList",
    data: function () {
        return {
            userList: [],
            userData: [],
            showBorder: true,
            showStripe: true,
            showHeader: true,
            showIndex: true,
            showCheckbox: false,
            fixedHeader: false,
            tableSize: 'default',
            updateInfo: "update",
            pageSize: 10,
            dataCount: fig.userFig.$dataCount,
            pageArr: fig.userFig.$pageArr,
            dataName: "",
            dataLoginId: "",
            file:null,
            action:"http://192.168.60.107:8089/image/getPicture?code=UserPic"
        }
    },
    computed: {
        tableColumns3() {
            let columns = [];
            if (this.showCheckbox) {
                columns.push({
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    resizable: true
                })
            }
            if (this.showIndex) {
                columns.push({
                    type: 'index',
                    width: 60,
                    align: 'center',
                    resizable: true
                })
            }
            columns.push({
                title: '用户编号',
                key: 'UId',
                sortable: true,
                align: 'center',
                resizable: true
            });
            columns.push({
                title: '用户名',
                key: 'UName',
                sortable: true,
                align: 'center',
                resizable: true
            });
            columns.push({
                title: '账号',
                key: 'ULoginId',
                align: 'center',
                resizable: true
            });
            // columns.push({
            // 	title: 'Age',
            // 	key: 'age',
            // 	sortable: true,
            // 	filters: [{
            // 			label: 'Greater than 25',
            // 			value: 1
            // 		},
            // 		{
            // 			label: 'Less than 25',
            // 			value: 2
            // 		}
            // 	],
            // 	filterMultiple: false,
            // 	filterMethod(value, row) {
            // 		if (value === 1) {
            // 			return row.age > 25;
            // 		} else if (value === 2) {
            // 			return row.age < 25;
            // 		}
            // 	}
            // });
            columns.push({
                title: '头像',
                key: 'Image',
                align: 'center',
                resizable: true,
                filters: [
                    {
                        label: 'z',
                        value: 'z'
                    },
                    {
                        label: 'l',
                        value: 'l'
                    },
                    {
                        label: 'c',
                        value: 'c'
                    }
                ],
                filterMethod(value, row) {
                    return row.Image.indexOf(value) > -1;
                },
            });
            columns.push({
                title: '操作',
                width: 150,
                align: 'center',
                resizable: true,
                render: (h, params) => {
                    return h('div', [
                        h('i-button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.show(this.updateInfo, params.row.UName, params.row)
                                }
                            }
                        }, "修改"),
                        h('i-button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.row.ULoginId)
                                }
                            }
                        }, '删除')
                    ]);
                }
            });
            return columns;
        },
    },
    methods: {
        show: function (h, name, item) {
            const result = _.omit(item, ['_index', '_rowKey', '_id', 'UPassWord']);
            getResults(h, name, result);
        },
        remove: function (item) {
            var that = this;
            var data = {
                Tag: "D",
                Controller: "DeleteUser",
                Role: "admin",
                param: {
                    obj: {"ULoginId": item}
                }
            };
            ws.send(JSON.stringify(data));
            ws.onmessage = function (res) {
                var count = JSON.parse(res.data);
                if (count.ok === 1) {
                    that.$Message.success("删除成功");
                    that.getAllUser();
                } else {
                    that.$Message.error("删除失败");
                    that.getAllUser();
                }
            };
        },
        getAllUser: function () {
            var that = this;
            load.loadingShow(that)
            var obj = "";
            if (that.dataName == "" && that.dataLoginId == "") {
                obj = "{}";
            } else {
                obj = {
                    UName: that.dataName,
                    ULoginId: that.dataLoginId
                }
            }
            var data = {
                Tag: "S",
                Controller: "GetAllOrOne",
                Role: "user",
                param: {
                    obj: obj
                }
            };
            ws.send(JSON.stringify(data));
            ws.onmessage = function (res) {
                if (res !== ""){
                    load.loadingHide(that);
                }
                load.loadingHide(that);
                that.userList = JSON.parse(res.data);
                that.dataCount = that.userList.length;

                if (JSON.parse(res.data).length < that.pageSize) {
                    that.userData = that.userList;
                } else {
                    that.userData = that.userList.slice(0, that.pageSize)
                }
            };

        },
        refresh: function () {
            var that = this;
            ws.onopen = function () {
                console.log("连接成功");
                that.getAllUser();
            };
            ws.refresh = function () {
                that.getAllUser();
            };
        },
        createUser: function () {
            getResults("create", "", "");
        },
        changepage: function (index) {
            var that = this;
            var start = (index - 1) * that.pageSize;
            var end = index * that.pageSize;
            that.userData = that.userList.slice(start, end);
        },
        changePageSize: function (pageSize) {
            var that = this;
            that.pageSize = pageSize;
            that.changepage(1);
            this.$emit('on-page-size-change', pageSize);
        },
        handleBeforeUpload(file){
            console.log(file)
        }
    },
    created() {
        var that = this;
        that.refresh();
    }
});


