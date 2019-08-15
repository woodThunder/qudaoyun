require.config({
	baseUrl: window.baseUrl==undefined?'/workbench/':window.baseUrl,
	paths: {
		'bdtpl': 'apworkbench/trd/baiduTemplate/baiduTemplate',
		'appconfig': 'apworkbench/config/app.config',
		'css': 'trd/requirejs/css',
		'text': 'trd/requirejs/text',
		'style': 'apworkbench/css',
		'myComponent': 'apworkbench/js/myComponent',
		'jquery.chosen': '/wbalone/trd/chosen/chosen.jquery',
		'customEvent': 'apworkbench/components/customEvent/customEvent',
		'userInfo' : 'apworkbench/components/userInfo/userInfo',
		'viewutil':"apworkbench/components/viewutil/viewutil",
		'contextRoot':'apworkbench/components/contextRoot/contextRoot',
		'layoutDesign':'apworkbench/components/layoutDesign/layoutDesign',
		'cookieOperation':'apworkbench/components/cookieOperation/cookieOperation',
		'dialog':'apworkbench/trd/dialog/dialog',
		'dialogmin':'apworkbench/js/dialogmin',
        'dealTopic'	:'apworkbench/components/dealTopic/dealTopic',
        'bootstrapValidator' : 'apworkbench/components/bootstrapvalidator/dist/js/bootstrapValidator',
        'knockout': "apworkbench/trd/ko/knockout-min",
        'dialogminBack': "apworkbench/js/dialogminBack",
        
    },
    waitSeconds: 0,
	shim: {
		
		'jquery.chosen': {
			deps: [ ]
		},
		'customEvent': {
			deps: [ ]
		},
		'bdtpl': {
			exports: 'baidu'
		},
		'viewutil' :{
			deps : [],
			exports : ''
		},
		'messenger': {
			exports: 'Topic'
		},
		'Toolbar' : {
			exports: 'Toolbar'
		},
		'director' : {
			exports: 'Router'
		},
		'interactor' : {
			exports: ''
		},
		'Layout' : {
			exports: 'Layout'
		},
		'dialog' : {
			deps: [ 'css!apworkbench/trd/dialog/ui-dialog.css'],
			exports: 'dialog'
		}
	}
});
