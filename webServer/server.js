/*
 * @Author: Mer 沫儿
 * @Date: 2020-02-22 22:10:43
 * @LastEditTime: 2020-02-22 23:40:31
 * @LastEditors: Mer 沫儿
 * @Description: 用node实现live server插件功能.本文件有采用ES6语法不懂请自行百度.此文件为原生版本
 * @FilePath: \webServer\server.js
 * @致力于编程开发努力学习天天向上
 */
/*
 *服务器端要做的常规任务
 *  1.首先想干事情需要一个服务(创建服务: IIS/NGINX/APPACHE/NODE基于[HTTP/HTTPS]内置模块)
 *  2.接收客户端的请求信息(有请求静态资源文件的,也有请求数据的)
 *  3.查找到对应的资源文件或者对应的数据信息
 *  4.把找到的内容返回给客户端
 */
let http = require('http'),
    url = require('url'),
    path = require('path'),
    mime = require('mime');
let port = 2333;
let {
    readFile
} = require('./utils/promiseFS');
//=>SERVER.CREATR-SERVER创建服务
let server = http.createServer((req, res) => {
    //=>当客户端向当前服务器发送请求的时候触发此回调函数(请求N次触发N次回调函数)
    //req:request req对象中存储了客户端的请求信息
    //res:response res对象中提供了对应的属性和方法,可以让服务器返回给客户端信息
    //res.end()返回给客户端信息
    let {
        //=>请求参数路径名称
        pathname,
        //=>问号传参信息(键值对)
        query
    } = url.parse(req.url, true);
    //=>根据请求的路径和名称,让其去static目录下查找对应的资源文件内容
    pathname = path.resolve('./static') + pathname;
    let suffixREG = /\.([0-9a-zA-Z]+)$/,
        encodeREG = /^(PNG|GIF|JPG|WEBP|BMP|ICO|SVG|MP3|MP4|WAV|OGG|M3U8)$/i,
        encoding = '',
        suffix = suffixREG.test(pathname) ? suffixREG.exec(pathname)[1] : null;
    if (suffix !== null) {
        !encodeREG.test(suffix) ? encoding = 'charset=utf8' : null;
        suffix = mime.getType(suffix);
        readFile(pathname).then(result => {
            //=>返回的数据格式一般都是字符串或者buffer
            //write服务器返回信息(可执行多次[一般都直接写在end里面])
            //end告诉客户端返回的信息已经结束了(必须写)
            //res.end相当于基于响应主体返回信息,还需要掌握基于响应头的返回信息
            res.writeHead(200, {
                //=>告诉客户端返回的数据格式和编码方式,返回的格式类型是MIME类型.
                'Content-Type': `${suffix};${encoding}`
            })
            console.log(pathname);
            res.end(result);
        }).catch(err => {
            res.writeHead(404, {
                //=>告诉客户端返回的数据格式和编码方式,返回的格式类型是MIME类型.
                'Content-Type': `application/json;charset=utf8;`
            })
            res.end(JSON.stringify(err));
        });
        return;
    }
});
//=>server.listen监听端口号
server.listen(port, () => {
    //=>当服务创建成功,并且开启监听端口号,触发此回调函数执行
    console.log(`服务启动成功,基于${port}端口启动~ Ctrl+C 关闭运行`);
});
