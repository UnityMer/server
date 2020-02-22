/*
 * @Author: Mer 沫儿
 * @Date: 2020-02-22 23:07:42
 * @LastEditTime: 2020-02-22 23:39:29
 * @LastEditors: Mer 沫儿
 * @Description: 用node实现live server插件功能,此文件为已经封装好的简化版.
 * @FilePath: \webServer\server1.js
 * @致力于编程开发努力学习天天向上
 */
let express = require('express'),
    app = express();
let port = 2333
app.listen(port, () =>{
    console.log(`服务器已启动,基于${port}端口启动,Ctrl+C 关闭运行`);
});
app.use(express.static('./static'));
app.use((req, res, next) => {
    res.status(404);
    res.send('not found!');
});