/**
 * Created by huang on 2018/1/17.
 */
const Koa = require('koa');
const sha1 = require('sha1');
const path = require('path');
const utile = require('./libs/util');
let wechat_file = path.join(__dirname,'./config/wechat.txt')

const wechat = require('./wechat/g')
var app = new Koa();
config = {
    wechat:{
        appID:'wx307e6306bc311c22',
        appSecret:'494829aa2760113ab535dec50c909112',
        token:'huangweihuangwei32103210',
        getAccessToken:function () {
            return utile.readFileAsync(wechat_file)
        },
        saveAccessToken:function (data) {
            return utile.writeFileAsync(wechat_file,JSON.stringify(data))
        }
    }
};

app.use(wechat(config.wechat))

app.listen(3100);