/**
*serverUri:服务端URI
*receiveUri:接收的URI
*json : 传入验证的json{"rentierid":"1001","appid":"","user":"","receiveuri":"identity+本地IP+登录用户名（如：1001-127.0.0.1-fjz）"}
*fn：回调函数
**/
function receive(host,port,serverUri,receiveUri,json,callback){
	var host = host || "localhost";
	var port = port || "8080";
	var json = json || {};
	
	if (typeof callback !== 'function') {
      return;
    }
	
	var url = "http://"+host+":"+port+"/eventbus";
	var eb = new EventBus(url);

	eb.onopen = function () {
				
		//消息处理
		eb.send(serverUri, json, function(err, reply) {
			console.log("start send msg");
			if (err) {
				console.error('Failed to retrieve albums: ' + err);
				//callback(err,reply);
				return;
			}
			var msg = reply.body;
			console.log(msg);
			
			//注册处理
			eb.registerHandler(receiveUri, function (err, msg) {
				if (err) {
					console.error('Failed to registerHandler: ' + err);
					callback(err,msg);
					return;
				}
				//回调函数调用							
				callback(err,msg);
			});
		});
	}
}

var Message = {};
(function(m){

	//var eb = null;

	m.subscribe_bak = function(host,port,serverUri,receiveUri,json,callback){
		var host = host || "localhost";
		var port = port || "8080";
		var json = json || {};
		if ((serverUri == null || serverUri == undefined || serverUri == '')
			|| (receiveUri == null || receiveUri == undefined || receiveUri == '')) {
			var err="传入的参数不正确";
			console.error('描述：' + err);
			return;
		}
		
		if (typeof callback !== 'function') {
		  return;
		}
		
		var url = "http://"+host+":"+port+"/eventbus";
		eb = new EventBus(url);

		eb.onopen = function () {
					
			//消息处理
			eb.send(serverUri, json, function(err, reply) {
				console.log("start send msg");
				if (err) {
					console.error('Failed to retrieve albums: ' + err);
					//callback(err,reply);
					return;
				}
				var msg = reply.body;
				console.log(msg);
				
				//注册处理
				eb.registerHandler(receiveUri, function (err, msg) {
					if (err) {
						console.error('Failed to registerHandler: ' + err);
						callback(err,msg);
						return;
					}
					//回调函数调用							
					callback(err,msg);
				});
			});
		}
	};
	
	//注销eventBus
	//"receiveuri":"identity+本地IP+登录用户名
	m.unregister_bak = function(receiveUri){
		if(eb==null){
			return;
		}
		//eb.unregisterHandler(receiveUri,{},function(err,msg){
		//	callback(err,msg);
		//});
		eb.unregisterHandler(receiveUri,{});	
	}
	
	m.subscribe = function(host,port,json,callback){
		//console.log("json="+json.userkey);
		var host = host || "172.16.72.14"; //20.12.25.129 20.1.85.71 172.20.14.138
		var port = port || "8081";
		var json = json || {};
		var serverUri = json.identity || "yonyou.vertx.server1";
		var user= json.userkey||"vertx";
		var receiveUri = serverUri+"-"+user;
		
		if ((serverUri == null || serverUri == undefined || serverUri == '')
			|| (receiveUri == null || receiveUri == undefined || receiveUri == '')) {
			var err="传入的参数不正确";
			console.error('描述：' + err);
			return;
		}
		
		if(typeof callback !== 'function') {
		  return;
		}
		
		var url = "http://"+host+":"+port+"/eventbus";
		var eb = null;  //测试用
		if(eb==null){
			eb = new EventBus(url);
		}

		eb.onopen = function () {
			//消息处理
			eb.send(serverUri, json, function(err, reply) {
				console.log("start send msg serverUri"+json.userkey);
				if (err) {
					console.error('Failed to retrieve albums: ' + err);
					return;
				}
				var msg = reply.body;
				console.log(msg);
								
				//注册处理
				eb.registerHandler(receiveUri, function (err, msg) {
					if (err) {
						console.error('Failed to registerHandler: ' + err);
						callback(err,msg);
						return;
					}
					//回调函数调用							
					callback(err,msg.body);
				});
							
			});		
		}
		
	};
	
	//注销eventBus
	//"receiveuri":"identity+本地IP+登录用户名
	m.unregister = function(json){
		if(eb==null){
			return;
		}
		
		var serverUri = json.identity || "yonyou.vertx.server1";
		var user= json.userkey||"vertx";
		var receiveUri = serverUri+"-"+user;
		
		eb.unregisterHandler(receiveUri,{});	
	}
		
}(Message));



  