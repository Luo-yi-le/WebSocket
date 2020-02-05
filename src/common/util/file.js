
var images = require('images');
var path = require('path');
// var a=require("../../../resource/img/userpic/photo_2019-10-25_09-45-29.jpg");
var watermarkImg = images('../../../resource/img/userpic/image.png');
var sourceImg = images('../../../resource/img/userpic/default.jpg');
// 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
var sWidth = sourceImg.width();
var sHeight = sourceImg.height();
var wmWidth = watermarkImg.width();
var wmHeight = watermarkImg.height();
images(sourceImg)
// 设置绘制的坐标位置，右下角距离 40px
    .draw(watermarkImg, sWidth - wmWidth - 40, sHeight - wmHeight - 40)
    // 保存格式会自动识别
    .save('../../../resource/img/userpic/saveimg.png');
