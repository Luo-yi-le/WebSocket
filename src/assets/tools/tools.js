/**
 * 设置随机数
 * @return {string|string}
 */
module.exports.createSixNum=function(){
    var Num="";
    for(var i=0;i<6;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
};

/**
 * Encryption 加密程序
 * @param {string} str 待加密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 * @return {string} 加密后的字符串
 * @constructor
 */
function Encryption( str, xor, hex ) {
    if ( typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
        return;
    }

    let resultList = [];
    hex = hex <= 25 ? hex : hex % 25;

    for ( let i=0; i<str.length; i++ ) {
        // 提取字符串每个字符的ascll码
        let charCode = str.charCodeAt(i);
        // 进行异或加密
        charCode = (charCode) ^ xor;
        // 异或加密后的字符转成 hex 位数的字符串
        charCode = charCode.toString(hex);
        resultList.push(charCode);
    }

    let splitStr = String.fromCharCode(hex + 97);
    return resultList.join(splitStr);
}
