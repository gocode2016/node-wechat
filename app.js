/**
 * Created by huang on 2018/1/17.
 */
const Koa = require('koa');
const sha1 = require('sha1');
const config = require('./config');
const weixin = require('./weixin');
const wechat = require('./wechat/g')
var app = new Koa();


app.use(wechat(config.wechat),weixin.reply)

app.listen(3100);