
var Promise = require('bluebird');
var axios = require('axios');
var util = require('./util');
var tpl = require('./tpl');

const prefix = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
	accessToken:prefix+'token?grant_type=client_credential'
}

function Wechat(opts) {
	var that  = this;
	this.appID = opts.appID;
	this.appSecret = opts.appSecret;
	this.getAccessToken = opts.getAccessToken;
	this.saveAccessToken = opts.saveAccessToken;

	this.getAccessToken()
		.then(function (data) {
			try {
				data = JSON.parse(data);
			}catch (e){
				return that.updateAccessToken(data);
			}
			if(that.isValidAccessToken(data)){
				Promise.resolve(data);
			}else{
				return that.updateAccessToken(data);
			}
		})
		.then(data=>{
			that.access_token = data.access_token;
			that.expire_in = data.expire_in;
			that.saveAccessToken(data);
		})
}
Wechat.prototype.isValidAccessToken=function (data) {
	if(!data || !data.access_token || !data.expire_in){
		return false;
	}
	var access_token = data.access_token;
	var expires_in = data.expire_in;
	var now = (new Date())
	if(now < expires_in){
		return true;
	}else{
		return false;
	}
}
Wechat.prototype.updateAccessToken=function () {
	var appID = this.appID;
	var appSecret = this.appSecret;
	var url = api.accessToken+'&appid='+appID+'&secret='+appSecret;

	return new Promise(function (resolve, reject) {
		axios.get(url).then(function (res) {
			console.log(res.data);
			var data = res.data;
			var now = (new Date()).getTime();
			var expires_in = now + (data.expire_in-20)*1000;
			data.expire_in = expires_in;
			resolve(data);
		}).catch(e=>{
			console.log(e)
			reject(e);
		})
	})
};
Wechat.prototype.reply=function () {
	var content = this.body;
	var message = this.weixin;

	var xml = util.tpl(content,message);

	this.status = 200;
	this.type = 'application/xml';
	this.body = xml;
}

module.exports = Wechat;