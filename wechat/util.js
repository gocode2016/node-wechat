
const xml2js = require('xml2js');
const Promise = require('bluebird');

exports.parseXMLAsync = function (xml) {
	return new Promise(function (resolve, reject) {
			xml2js.parseString(xml,{trim:true},function (err,content) {
				if(err){
					reject(err);
				}else{
					resolve(content)
				}

			})
	})
};

exports.formatMessage=function(result) {
	var message = {};

	if(typeof result === 'object'){
		var keys = Object.keys(result);
		for(var i = 0; i < keys.length; i++){
			let item = result[keys[i]];
			let key = keys[i];
			if(!(item instanceof Array)|| item.length===0){
				continue
			}
			if(item.length===1){
				let val = item[0];
				if(typeof val ==='object'){
					message[key] = formatMessage(val)
				}else{
					message[key] = (val || '').trim();
				}
			}else{
				message[key] = []
				for(var j=0,k = item.length; j < k; j++){
					message[key].push(formatMessage((item[j])))
				}
			}
		}
	}
	return message;
};

exports.tpl = function (content, messgae) {
	var info = {};
	var type = 'text';
	var fromUserName = messgae.FromUserName;
	var toUserName = messgae.ToUserName;
	if(Array.isArray(content)){
		type='news'
	}
	type = content.type || type;
	info.content = content;
	info.createTime = (new Date()).getTime()
	info.msgType = type;
	info.toUserName = fromUserName;
	info.fromUserName = messgae.ToUserName;
	return tpl.compiled(info)
};