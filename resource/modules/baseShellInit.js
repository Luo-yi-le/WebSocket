//获取数据
window["getResults"] = getResults;

var infoM = "";

function getResults(msg, name, obj) {

    if (msg === "update") {
        infoM = "修改用户[" + name + "]";
        createElement(obj);
    } else if (msg === "create") {
        infoM = "新增";
        createElement("")
    }
    console.log(obj);
}

//创建dom
function createElement(result) {
    //创建父容器
    var modal_page = document.createElement("div");
    modal_page.setAttribute("modal-page", "modal-page");
    modal_page.className = "modal-page";
    var app = $('[data-page="data-page"]', parent.document).prepend(modal_page);
 //   var app =document.querySelector('[data-page="data-page"]',parent.document).prepend(modal_page);
    //创建遮罩层
    var mask = document.createElement("div");
    mask.setAttribute("id", "mask");
    mask.className = "mask";
    modal_page.appendChild(mask);

    var content = document.createElement("div");
    content.setAttribute("id", "content");
    content.className = "content";
    modal_page.appendChild(content);

    var cancel = document.createElement("button");
    //处理头部
    createHead(content,modal_page);

    createBody(result, content);
    //处理底部按钮

    createFooter(content,cancel);
    //点击取消

    removeElement(modal_page, cancel)
}

function createHead(content,modal_page) {
    var hear = document.createElement("div");
    hear.setAttribute("id", "content-head");
    hear.className = "content-head";
    content.appendChild(hear);

    var label = document.createElement("label");
    label.className = "";
    label.innerText = infoM;
    hear.appendChild(label);

    var closeBtn=document.createElement("div");
    closeBtn.setAttribute("modal-close", "modal-close");
    closeBtn.className = "closeBtn";
    hear.appendChild(closeBtn);
    $(closeBtn).click(function () {
        $(modal_page).remove();
    });
}

function createBody(result, content) {
    var body = document.createElement("div");
    body.setAttribute("id", "content-body");
    body.className = "content-body";
    content.appendChild(body);

    var inter=document.createElement("div");
    inter.className = "inter";
    body.appendChild(inter);
    var content_con = document.createElement("div");
    if (result == "" || result == undefined) {
        //处理中间内容
        content_con.innerText = "新增";
    } else {
        //处理中间内容
        content_con.innerText = JSON.stringify(result);
    }
    inter.appendChild(content_con);
}

function createFooter(content,cancel) {
    var footer = document.createElement("div");
    footer.setAttribute("id", "content-footer");
    footer.className = "content-footer";
    content.appendChild(footer);

    var footer_div = document.createElement("div");
    footer_div.className = "footer-div";
    footer.appendChild(footer_div);

    var confirm = document.createElement("button");
    confirm.className = "btn2 ivu-btn ivu-btn-primary ivu-btn-small";
    confirm.setAttribute("type", "button");
    // confirm.innerText="确认";
    footer_div.appendChild(confirm);

    var span1 = document.createElement("span");
    span1.innerText = "确认";
    confirm.appendChild(span1);

    cancel.className = "btn2 ivu-btn ivu-btn-warning ivu-btn-small";
    cancel.setAttribute("type", "button");
    cancel.setAttribute("data-cancel", "data-cancel");
    // cancel.innerText="取消";
    footer_div.appendChild(cancel);

    var span2 = document.createElement("span");
    span2.innerText = "取消";
    cancel.appendChild(span2);
}
//点击取消按钮
function removeElement(p1, p2) {
    $(p2).click(function () {
        $(p1).remove();
    });
}