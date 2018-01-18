/**
 * Created by huang on 2018/1/17.
 */
const sha1 = require('sha1');
const getRawBody = require('raw-body');
const Wechat = require('./wechat');
const util = require('./util');

module.exports = function (config) {
    var wechat = new Wechat(config);
    return function *(next) {
        var that = this;
        var token = config.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token,timestamp,nonce].sort().join('');
        var sha = sha1(str);

        if(this.method === 'GET'){
	        if(sha === signature){
		        this.body = echostr + '';
	        }else{
		        this.body = 'wrong';
	        }
        }else if(this.method === 'POST'){
	        if(sha !== signature){
		        this.body = 'wrong';
		        return false;
	        }
            var data = yield getRawBody(this.req,{
                length:this.length,
                limit:'1mb',
                encoding:this.charset
            })
            let content = yield util.parseXMLAsync(data);
	        let message = util.formatMessage(content.xml);
	        let now = new Date().getTime();
	        that.weixin = message;
            yield handler.call(this.next);

            wechat.reply.call(this);

        }else{
	        if(sha === signature){
		        this.body = echostr + '';
	        }else{
		        this.body = 'wrong';
	        }
        }

    }
}

