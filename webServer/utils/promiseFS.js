/*
 * @Author: Mer 沫儿
 * @Date: 2020-02-22 20:26:35
 * @LastEditTime: 2020-02-22 20:57:48
 * @LastEditors: Mer 沫儿
 * @Description: 封装fs为promise版本为低版本node也可以正常使用
 * @FilePath: \webServer\utils\promiseFS.js
 * @致力于编程开发努力学习天天向上
 */
let fs = require('fs');
function readFile(pathname) {
    //=>富媒体资源在获取内容的时候不能使用UTF8编码格式
    let suffixREG = /\.([0-9a-zA-Z]+)$/,
        suffix = suffixREG.test(pathname) ? suffixREG.exec(pathname)[1] : '';
        encoding = 'utf8';
    /^(PNG|GIF|JPG|WEBP|BMP|ICO|SVG|MP3|MP4|WAV|OGG|M3U8)$/i.test(suffix) ? encoding = null : null;
    
    return new Promise((resolve, reject) => {
        fs.readFile(pathname, encoding, (err, result) => {
            if (err !== null) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
module.exports = {
    readFile
};
