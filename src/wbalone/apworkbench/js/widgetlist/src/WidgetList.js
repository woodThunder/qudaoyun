define([
	 
	'apworkbench/js/widgetlist/Nav',
	'apworkbench/js/widgetlist/SearchArea',
	'apworkbench/js/widgetlist/AppGroupList',
	'customEvent'
], function () {
	var Nav = require('apworkbench/js/widgetlist/Nav')
	var SearchArea = require('apworkbench/js/widgetlist/SearchArea')
	var AppGroupList = require('apworkbench/js/widgetlist/AppGroupList')
	var customEvent = require('customEvent')
	var contextRoot = window.contextRoot==undefined?"/workbench":window.contextRoot;
	var WidgetList = React.createClass({
		getInitialState: function() {
			return {
				appGroupList: {},
				userAppGroupList: []
			};
		},
		componentDidMount: function() {
			this.getAppGroupList();
			this.getUserAppGroupList();
			customEvent.on('search.WidgetList', this.search)
			customEvent.on('refreshUserAppGroupList.WidgetList', this.getUserAppGroupList)
		},
		search: function (e, areaId, groupId, keyword) {
			let that = this
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
				success: function(result) {
					if (result.status) {
						that.setState({
							appGroupList: result.data
						});
					} else {
						result.msg ? alert(result.msg) : '';
					}
				},
				error: function() {
					alert(e.message || "网络请求失败");
				}
			})
		},
		getAppGroupList: function () {
			var that = this;
			// 获取所有授权应用
			$.get(contextRoot+'/apEditGroups/listWithGroup',function(result){
				if (result.status) {
					that.setState({
						appGroupList:result.data
					});
				} else {
					result.msg ? alert(result.msg) : '';
				}
			},'json');
		},
		getUserAppGroupList: function () {
			var that = this;
			//获取用户选了的应用
			$.get(contextRoot+'/apEditGroups/allApps',function(result){
				if (result.status) {
					that.setState({
						userAppGroupList:result.data
					});
				} else {
					result.msg ? alert(result.msg) : '';
				}
			},'json');
		},
		render: function () {
			return (
				<div>
					<Nav/>
					<SearchArea />
					<AppGroupList 
						appGroupList={this.state.appGroupList} 
						userAppGroupList={this.state.userAppGroupList}/>
				</div>
			)
		}
	});
	return WidgetList
});
