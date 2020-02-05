var fs=require("fs");
const multiparty=require("multiparty");
var images = require('images');




module.exports.Image=function (req,res,filepath,fn) {
    // console.log(req)
    var form = new multiparty.Form({uploadDir: filepath});
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files);

        if(err){
            console.log('parse error: ' + err);
        } else {
            testJson = eval("(" + filesTmp+ ")");
            // console.log(testJson)
            var file=testJson.file[0];
            var uploadedPath = file.path;
            var dstPath = filepath+ file.originalFilename;

            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    // var source="";
                    // var watermarkImg = images(dstPath);
                    // var sWidth = watermarkImg.width();
                    // var sHeight = watermarkImg.height();
                    // images(watermarkImg)
                    //     .draw(watermarkImg, sWidth - 40, sHeight - 40)
                    //     .save(dstPath);
                    console.log('rename ok');
                }
            });
        }
    });
};

module.exports.Files=function (req,res,filepath) {


}



