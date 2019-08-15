define(['Layout'], function (Layout, Toolbar) {
	/**
	 * 设计器脚本
	 */
	function getQueryString(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	}
	//初始化布局
	var layout = new Layout('#tool-panel',{
		viewId: getQueryString("viewid"),
		layoutId : getQueryString("id")
	});

	return {
		layout: layout,
		getQueryString: getQueryString
	}
});