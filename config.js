
const path = require('path');
const utile = require('./libs/util');
let wechat_file = path.join(__dirname,'./config/wechat.txt')

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
module.exports = config;