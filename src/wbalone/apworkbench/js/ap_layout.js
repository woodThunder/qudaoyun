require([
	'jqueryui',
	'bootstrap',
	'viewutil',
	'layoutDesign',
	'Toolbar',
	'messenger',
	'contextRoot'
], function () {
	var Topic = require('messenger');
	var Toolbar = require('Toolbar');
	var layoutDesign = require('layoutDesign');
	var layout = layoutDesign.layout;
	var getQueryString = layoutDesign.getQueryString;
	var viewutil = require('viewutil');
	var router = viewutil.router;
	var viewid = getQueryString("viewid");
	var contextRoot = require('contextRoot').get();

	

	router.init();

	/*判断是否有无viewid*/
	if(viewid){
		viewutil.initLayout(contextRoot+"/data:layout/"+viewid,[]);
		// setTimeout(function(){
			layout.init();
		// },1000)
	} else {
		tools.setLayout();
	}

	$('#layoutCancel a').on('click',function(e){
		e.preventDefault();
		var parentbody= $('body',window.parent.document);
		window.parent.onLoadRoleList();
		parentbody.find('#iframeBox').remove();
		//修改为关闭iframe后刷新页面
	});

	

	
});