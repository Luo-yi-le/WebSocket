//重新处理页面字体大小
(function(doc, win) {
    //获得文档的根节点html
    var docEl = doc.documentElement;
    //如果window中存在orientationchange对象，则取orientationchange,否则取resize
    //为了事件绑定
    resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
    //定义一个方法，重新计算font-size大小
    var recall = function() {
        //页面的宽度
        var clientWidth = docEl.clientWidth;
        //如果没有宽度则退出
        if (!clientWidth) return;
        //重新计算font-size大小，假定320的宽度时字体大小为20;，当页面变化时重新设置字体大小
        //设定宽度为任何值时 fontSize=20px

        docEl.style.fontSize = 35 * (clientWidth / clientWidth) + 'px';
    };
    //如果浏览器不支持添加事件监听则结束
    if (!doc.addEventListener) return;
    //添加事件监听，指定事件处理函数的时期或阶段(boolean)true表示在捕获事件执行，false表示冒泡时执行
    win.addEventListener(resizeEvt, recall, false);
    //当Dom树加载完成时执行计算，DOMContentLoaded事件要在window.onload之前执行
    doc.addEventListener('DOMContentLoaded', recall, false);
})(document, window);