'use strict';

define([  'customEvent'], function  () {
	var customEvent = require('customEvent');
	var App = React.createClass({
		displayName: 'App',

		openDialog: function openDialog(e) {
			var dialogContent = this.getContent(this.props.appName);
			customEvent.trigger('openDialog.WidgetList', [e.target, dialogContent, this.props.appName]);
		},
		getContent: function getContent(appName) {
			var str = "";
			var allApps = this.props.userAppGroupList;
			for (var i = 0; i < allApps.length; i++) {
				//判断当前点击的应用是否在分组中
				var isSel = false;
				var apps = allApps[i].groupApps;
				for (var j = 0; j < apps.length; j++) {
					if (appName == apps[j]) {
						isSel = true;
					}
				}
				if (isSel) {
					str += "<label><input type='checkbox' checked='true' id='" + allApps[i].groupId + "'>" + allApps[i].groupName + "</label>";
				} else {
					str += "<label><input type='checkbox' id='" + allApps[i].groupId + "'>" + allApps[i].groupName + "</label>";
				}
			}
			return str;
		},
		render: function render() {
			var _props = this.props;
			var id = _props.id;
			var appChinese = _props.appChinese;
			var appIcon = _props.appIcon;
			var userAppGroupList = _props.userAppGroupList;
			var appName = _props.appName;

			var isInUserGroup = false;
			$.each(userAppGroupList, function (i, v) {
				if (~v.groupApps.indexOf(appName)) {
					isInUserGroup = true;
					return false;
				}
			});
			var tempSrc = 'http://172.16.50.238:7406/fs/service/myapps/ufiles/a8a24782-0b1e-4a05-a27d-4eb3482fdfe6?isView=true';
			return React.createElement(
				'div',
				{ className: isInUserGroup ? 'in-user-group col-sm-6 col-lg-3' : 'not-in-user-group col-sm-6 col-lg-3' },
				React.createElement(
					'div',
					{ className: 'panel panel-light-blue bg-light-white color-black', onClick: this.openDialog },
					React.createElement(
						'div',
						{ className: 'panel-body top' },
						React.createElement(
							'p',
							{ className: 'mg-top-0' },
							appChinese
						)
					),
					React.createElement('img', { className: 'rowimg', src: tempSrc })
				)
			);
		}
	});
	return App;
});