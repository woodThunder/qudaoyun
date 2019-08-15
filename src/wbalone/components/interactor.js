;(function($) {
	var _ajax = $.ajax;
	$.ptAjax = function(opt) {
		var fn = {
			error : function(XMLHttpRequest, textStatus, errorThrown) {},
			success : function(data, textStatus) {}
		};
		if (opt.error) {
			fn.error = opt.error;
		}
		if (opt.success) {
			fn.success = opt.success;
		}
		var _opt = $.extend(opt, {
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				_wrapError(errorThrown,textStatus,XMLHttpRequest);
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success : function(data, state,xhr) {
				if(_processXHRError(data,state,xhr)){
					//notice: context must process 
					if(_opt.context){
						fn.success.call(_opt.context,data, state);
					}else
						fn.success(data, state);
					_wrapSuccess(data, state);
				}
			},
			beforeSend : function(XHR) {
				//显示等待
				$('#uLoadeBack').show();
				$('#uLoad').show();
			},
			complete : function(XHR, TS) {
				//requset success or failure also call
				//隐藏等待
				$('#uLoadeBack').hide();
				$('#uLoad').hide();
			}
		});
		var _processXHRError= function(rsl,state,xhr){
			if(xhr && xhr.getResponseHeader && xhr.getResponseHeader("X-Error")){
				alert(rsl["message"]);
				return false;
			}
			return true;
		};
		var _wrapSuccess = function(data, textStatus){
			//to do ...
		};
		var _wrapError = function (rsl,state,xhr) {
			_processXHRError(rsl,state,xhr);
			//to do ...
		};
		
		var _publishTopic = function(params){
			var topic ;
			if(params.topic){
				topic = params.topic;
			}
			else{
				//默认取url  url: "/demo/layout/set/save",
				var urlarys = params.url.split("?")[0].split("/");
				var nurl = [];
				$.each(urlarys,function(i,n){
					if(i != 0 && i != 1){
						nurl.push(n);
					}
				});
				topic = "/"+nurl.join("/");
			}
			Topic.publish(topic,params);
		};
		
		var _wrapParam = function(params){
			//to do
		};
		
		//platform process begin
		_wrapParam(_opt) ;
		
		_publishTopic(_opt);
		
		//adjust opt param
		opt.data = $.isEmptyObject(_opt.data)?null:_opt.data;
		
		//fire ajax request
		return _ajax(_opt);
	};
})(jQuery)