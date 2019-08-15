define(function(require, module, exports) {
	// 引入相关的功能插件或模块
//	var html = require('text!./index.html');
//	var styles = require('css!./index.css');

	return {
		init: function(content) {
			// 插入内容
			content.innerHTML = '<h1>消息中心测试页面</h1>';
		
		}
	}
})