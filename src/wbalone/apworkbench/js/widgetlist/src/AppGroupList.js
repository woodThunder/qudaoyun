define([
	 
	'customEvent',
	'apworkbench/js/widgetlist/App'
], function () {
	var App = require('apworkbench/js/widgetlist/App')
	var AppGroupList = React.createClass({
		render: function () {
			let index = 0
			let appGroup = $.map(
				this.props.appGroupList,
				(v, i)=>{
					let apps = v.map((v,i)=>{
						return <App key={i} id={v.id} appChinese={v.appChinese} appIcon={v.appIcon} appName={v.appName} userAppGroupList={this.props.userAppGroupList}/>
					})
					return (
						<div key={index++} className="app-group">
							<div className="row outrow">
								<div className="col-sm-6 col-lg-3 outrowtitle">
									{i}
								</div>
							</div>
							<div className="row content xjtc">
								{apps}
							</div>
						</div>
					)
				}
			)
			return (
				<div className="app-group-list">{appGroup}</div>
			)
		}
	});
	return AppGroupList
});
