exports.reply=function* (next) {
	var message = this.weixin;
	console.log(123,message);
	if(message.MsgType === 'event'){
		if(message.Event === 'subscribe'){
			if(message.EventKey){
				console.log('扫描二维码进来的：'+ message.EventKey+' '+message.ticket)
			}

			this.body = '哈哈，你订阅了我这个账号\r\n'+'消息ID:'+message.MsgId;
		}else if(message.Event === 'unsubscribe'){
			console.log('无情的取消了关注')
			this.body = '';
		}
	}else{

	}
	yield next;
}