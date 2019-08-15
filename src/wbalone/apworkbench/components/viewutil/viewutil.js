define([
	 
	'director',
	'contextRoot',
	'interactor'
],function(  Router, contextRoot){
	//路由信息
	var router = Router();
	var content = $('#content');

	function addRouter(path, func) {
		var root = contextRoot.get();
		var pos = path.indexOf('/:');
		var truePath = path;
		if (pos != -1) {
			truePath = path.substring(0, pos);
		}
		if (typeof func == 'undefined') {
			func = [];
		} else if (typeof func == 'function') {
			func = [func];
		} else if (typeof func != 'array') {
			throw('addRouter 参数不对！');
		}
		func.unshift(function() {
			var params = arguments;
			initLayout(root+'/data:layout' + truePath, params);
		});
		var tmparray = truePath.split("/");

		if (tmparray[1] in router.routes
			&& tmparray[2] in router.routes[tmparray[1]]
			&& tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
			return;
		} else {
			$.each(func, function (i, v){
				router.on(path, v);
			})
		}
	}

	//初始化layout
	function initLayout(p, params) {
		var module = p;
		params = params ? params : [];
		requirejs.undef(module);
		if (params.length == 1){
			params = params[0];
		}
		require([ module ], function(module) {
			content.empty();
			module.init(params);
		})
	}

	return {
		router : router,
		addRouter : addRouter,
		initLayout : initLayout
	}
})