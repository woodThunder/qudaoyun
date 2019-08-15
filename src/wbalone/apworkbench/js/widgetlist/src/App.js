define([
	 
	'customEvent'
], function () {
	var customEvent = require('customEvent')
	var App = React.createClass({
		openDialog: function (e) {
			let dialogContent = this.getContent(this.props.appName)
			customEvent.trigger('openDialog.WidgetList',[e.target, dialogContent, this.props.appName])
		},
		getContent: function(appName) {
			var str = "";
			var allApps = this.props.userAppGroupList
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
		render: function () {
			let {id, appChinese, appIcon, userAppGroupList, appName} = this.props
			let isInUserGroup = false
			$.each(userAppGroupList, (i, v)=>{
				if (~v.groupApps.indexOf(appName)) {
					isInUserGroup = true
					return false
				}
			})
			let tempSrc = 'http://172.16.50.238:7406/fs/service/myapps/ufiles/a8a24782-0b1e-4a05-a27d-4eb3482fdfe6?isView=true'
			return (
				<div className={ isInUserGroup ? 'in-user-group col-sm-6 col-lg-3' : 'not-in-user-group col-sm-6 col-lg-3'}>
					<div className="panel panel-light-blue bg-light-white color-black" onClick={this.openDialog}>
						<div className="panel-body top">
							<p className="mg-top-0">{appChinese}</p>
						</div>
						<img className="rowimg" src={tempSrc}/>
					</div>
				</div>
			)
		}
	});
	return App;
})