'use strict';

require([  'css!apworkbench/css/Myapplist.css', 'css!apworkbench/css/widgetlist.css', 'apworkbench/js/widgetlist/WidgetList', 'dialog', 'customEvent'], function  () {
	var WidgetList = require('apworkbench/js/widgetlist/WidgetList');
	var customEvent = require('customEvent');
	var dialog = require('dialog');
	var contextRoot = require('contextRoot').get();

    ReactDOM.render(React.createElement(WidgetList, null), document.getElementById("widgetlist"));
	var selecteGroupDailog = dialog({
		id: 'toPdialog',
		title: '请为应用选择分组',
		content: '',
		okValue: '确 定',
		cancelValue: '',
		align: 'right top',
		width: 200,
		height: 150,
		focus: false,
		ok: function ok() {
			this.close();
			return false;
		}
	});
	selecteGroupDailog._popup.addClass('selecte-group-dailog').on('click', 'input[type="checkbox"]', function () {
		var $self = $(this);
		var url;
		if ($self.prop('checked') == true) {
			url = contextRoot+'/apEditGroups/addApp';
		} else {
			url = contextRoot+'/apEditGroups/deleApp';
		}
		$.ajax({
			url: url,
			data: {
				groupId: $self.attr('id'),
				appName: selecteGroupDailog._popup.data('appName')
			},
			type: "GET",
			contentType: "application/json",
			success: function success(result) {
				if (result.status) {
					customEvent.trigger('refreshUserAppGroupList.WidgetList');
				} else {
					result.msg ? alert(result.msg) : '';
				}
			},
			error: function error() {
				alert(e.message || "网络请求失败");
			}
		});
	});
	customEvent.on('openDialog.WidgetList', function (e, button, content, appName) {
		selecteGroupDailog.content(content).show(button)._popup.data('appName', appName);
	});
});