require(['director'], function() {

	window.addRouter = function(path, func) {
		var pos = path.indexOf('/:');
		var truePath = path;
		if (pos != -1)
			truePath = path.substring(0,pos);
		func = func || function() {
			var params = arguments;
                initView('pages' + truePath,params);
		};
		var tmparray = truePath.split("/");
		if(tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]){
			return;
		}else{
			router.on(path, func);
		}
	};
	window.router = Router();
	$(function(){
        addRouter("/user/user/user");
		window.router.init();
		
	});

	function initView(p, id) {
		var module = p;
		requirejs.undef(module);
		require([module], function(module) {
			ko.cleanNode($('.content')[0]);
			$('.content').html('');
			$('.content').html(module.template);
			if(module.model){
				module.model.data.content = ko.observableArray([]);
				ko.applyBindings(module.model, $('.content')[0]);
				module.init(id);
			}else{
				module.init(id, $('.content')[0]);
			}
		}) ;
	}
    if($urlStatus==1){
        window.router.setRoute('/user/user/user') ;
    }else{

    }



    /*$.ajax({
        type : 'get',
        url : $ctx +"/user/user?userId="+$userId,
        //data : getUserInfodata,
        dataType : 'json',
        success : function(data) {
            if(data.status==1){
                $(".userName").html(data.user.userName);
                window.sessionStorage.userCode = data.user.userCode ;
            }

        }
    });*/
    
    window.console = window.console || (function(){ //ie兼容，兼容 console方法
    	var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){}; 
    	return c; 
    	})(); 
    
});



var DEFAULT_VERSION = "8.0";
var ua = navigator.userAgent.toLowerCase();
var isIE = ua.indexOf("msie")>-1;
var safariVersion;
if(isIE){
	safariVersion =  ua.match(/msie ([\d.]+)/)[1];
    if(safariVersion <= DEFAULT_VERSION ){
    	document.write("<script language='javascript' src='/tenantuser/trd/html5shiv.min.js'></script>");
    	document.write("<script language='javascript' src='/tenantuser/trd/respond.min.js'></script>");
    } 
}