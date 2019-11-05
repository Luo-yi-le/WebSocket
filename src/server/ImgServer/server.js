var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('./mime');

function processRequest(request, response) {
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    response.setHeader('Access-User-Name', 'lonely');
    //request里面切出标识符字符串
    var requestUrl = request.url;
    //url模块的parse方法 接受一个字符串，返回一个url对象,切出来路径
    var pathName = url.parse(requestUrl).pathname;
    //对路径解码，防止中文乱码
    var pathName1 = decodeURI(pathName);
    //解决301重定向问题，如果pathname没以/结尾，并且没有扩展名
    if (!pathName1.endsWith('/') && path.extname(pathName1) === '') {
        pathName1 += '/';
        var redirect = "http://" + request.headers.host + (pathName1);

        response.writeHead(301, {
            location: redirect
        });
        //response.end方法用来回应完成后关闭本次对话，也可以写入HTTP回应的具体内容。
        response.end();
    }

    //获取资源文件的绝对路径
    var filePath = path.resolve("./../../../imgS" + pathName1);//__dirname + pathName1+"/img"
    //获取对应文件的文档类型
    //我们通过path.extname来获取文件的后缀名。由于extname返回值包含”.”，所以通过slice方法来剔除掉”.”，
    //对于没有后缀名的文件，我们一律认为是unknown。
    var ext = path.extname(pathName1);
    ext = ext ? ext.slice(1) : 'unknown';

    //未知的类型一律用"text/plain"类型
    var contentType = mime[ext] || "text/plain";

    fs.stat(filePath, (err, stats) => {

        if (err) {
            response.writeHead(404, {"content-type": "text/html"});
            response.end("<h1>404 Not Found</h1>");
        }
        //没出错 并且文件存在
        if (!err && stats.isFile()) {

            response.writeHead(200, {"content-type": contentType});
            //建立流对象，读文件
            var stream = fs.createReadStream(filePath);
            //错误处理
            stream.on('error', function () {

                response.writeHead(500, {"content-type": contentType});

                response.end("<h1>500 Server Error</h1>");

            });
            //读取文件
            stream.pipe(response);
            //response.end();  这个地方有坑，加了会关闭对话，看不到内容了
        }
        //如果路径是目录
        if (!err && stats.isDirectory()) {

            var html = " <head><meta charset = 'utf-8'/><title>图片路径</title></head>";
            //读取该路径下文件
            var reg= /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
            fs.readdir(filePath, (err, files) => {

                if (err) {
                    console.log("读取路径失败！");
                } else {
                    files.forEach((item,index)=>{
                        if (item === "index.html") {
                            response.writeHead(200, {"content-type": "text/html"});
                            response.end(item);
                            return;
                        }
                        if(reg.test(item)==true){
                            html += `<div style="position: relative;display: flex;height: 80px;width: 150px; border: 1px solid;justify-content: center;">
                                    <img src="${item}" style="width: 60px;height: 60px;" alt=""/>
                                    <a href='${item}' style="position: absolute;bottom: 0">${item}</a>
                                    </div>`;
                        }else {
                            html +=` <a href='${item}' style="position: relative;bottom: 0;width: 150px;height: 80px">${item}</a>`;
                        }

                    });

                    // for (var file of files) {
                    //     if (file === "index.html") {
                    //         response.writeHead(200, {"content-type": "text/html"});
                    //         response.end(file);
                    //         break;
                    //     }
                    //     if(reg.test(files)==true){
                    //         html += `<div style="position: relative;display: flex;height: 80px;width: 150px; border: 1px solid;justify-content: center;">
                    //                 <img src="${file}" style="width: 60px;height: 60px;" alt=""/>
                    //                 <a href='${file}' style="position: absolute;bottom: 0">${file}</a>
                    //                 </div>`;
                    //     }else{
                    //         html+=`<div><a href='${file}' style="position: absolute;bottom: 0">${file}</a></div>`
                    //     }
                    //
                    // }
                    response.writeHead(200, {"content-type": "text/html"});
                    response.end(html);
                }
            });
        }
    });
}

module.exports = processRequest;