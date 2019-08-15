'use strict';

define([  'apworkbench/js/widgetlist/Nav', 'apworkbench/js/widgetlist/SearchArea', 'apworkbench/js/widgetlist/AppGroupList', 'customEvent'], function  () {
	var Nav = require('apworkbench/js/widgetlist/Nav');
	var SearchArea = require('apworkbench/js/widgetlist/SearchArea');
	var AppGroupList = require('apworkbench/js/widgetlist/AppGroupList');
	var customEvent = require('customEvent');
	var contextRoot = window.contextRoot==undefined?"/workbench":window.contextRoot;
	var WidgetList = React.createClass({
		displayName: 'WidgetList',

		getInitialState: function getInitialState() {
			return {
				appGroupList: {},
				userAppGroupList: []
			};
		},
		componentDidMount: function componentDidMount() {
			this.getAppGroupList();
			this.getUserAppGroupList();
			customEvent.on('search.WidgetList', this.search);
			customEvent.on('refreshUserAppGroupList.WidgetList', this.getUserAppGroupList);
		},
		search: function search(e, areaId, groupId, keyword) {
			var that = this;
			$.ajax({

				url: contextRoot+"/apEditGroups/queryApps",
				dataType: "json",
				data: {
					appname: keyword,
					area: areaId,
					group: groupId
				},
				type: "POST",
				contentType: "application/json",
				success: function success(result) {
					if (result.status) {
						that.setState({
							appGroupList: result.data
						});
					} else {
						result.msg ? alert(result.msg) : '';
					}
				},
				error: function error() {
					alert(e.message || "网络请求失败");
				}
			});
		},
		getAppGroupList: function getAppGroupList() {
			var that = this;
			// 获取所有授权应用
			
			$.get(contextRoot+'/apEditGroups/listWithGroup', function (result) {
				if (result.status) {
					that.setState({
						appGroupList: result.data
					});
				} else {
					result.msg ? alert(result.msg) : '';
				}
			}, 'json');
		},
		getUserAppGroupList: function getUserAppGroupList() {
			var that = this;
			//获取用户选了的应用
			$.get(contextRoot+'/apEditGroups/allApps', function (result) {
				if (result.status) {
					that.setState({
						userAppGroupList: result.data
					});
				} else {
					result.msg ? alert(result.msg) : '';
				}
			}, 'json');
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(Nav, null),
				React.createElement(SearchArea, null),
				React.createElement(AppGroupList, {
					appGroupList: this.state.appGroupList,
					userAppGroupList: this.state.userAppGroupList })
			);
		}
	});
	return WidgetList;
});