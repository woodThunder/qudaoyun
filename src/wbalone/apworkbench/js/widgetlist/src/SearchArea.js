define([
	 
	'customEvent'
], function () {
	var customEvent = require('customEvent')
	var contextRoot = window.contextRoot==undefined?"/workbench":window.contextRoot;
	//分组数据
	var SearchArea = React.createClass({
		getInitialState: function() {
			return {
				value: '',
				groups: [
					{id:'all',name:'全部分组'}
				],
				areas: [
					{id:'all',areaName:'全部应用'}
				],
				groupSelected: 'all',
				areasSelected: 'all'
			};
		},
		componentDidMount: function() {
			this.getGroups();
			this.getAreas();
		},
		getGroups: function () {
			var that = this;
			//获取分组数据
			$.get(contextRoot+'/apEditGroups/group',function(result){
				if (result.status) {
					that.allGroups = that.state.groups.concat(result.data)
					that.setState({
						groups: that.allGroups
					});
				} else {
					result.msg ? alert(result.msg) : '';
				}
			},'json');
		},
		getAreas: function () {
			var that = this;
			//获取领域数据
			$.get(contextRoot+'/apEditGroups/area',function(result){
				if (result.status) {
					that.allAreas = that.state.areas.concat(result.data)
					that.setState({
						areas: that.allAreas
					})
				} else {
					result.msg ? alert(result.msg) : '';
				}
			},'json');
		},
		areaChange: function (e) {
			let option = e.target.selectedOptions[0]
			let groupOption = this.refs.groups.selectedOptions[0]
			let areaValue = option.value
			let groupValue = groupOption.value
			this.setState({
				areasSelected: areaValue
			})
			if (areaValue == 'all') {
				this.setState({
					groups: this.allGroups
				})
			} else if (groupOption.getAttribute('data-area-id') != areaValue) {
				let groups = $.map(this.allGroups, (v, i) => {
					if (v.areaId == areaValue || v.id == 'all') {
						return v
					}
				})
				groupValue = groups[0].id
				this.setState({
					groups: groups,
					groupSelected: groupValue
				})
			}
			customEvent.trigger('search.WidgetList', [areaValue, groupValue, ''])
		},
		groupChange: function (e) {
			let option = e.target.selectedOptions[0]
			let areaId = option.getAttribute('data-area-id')
			let value = option.value
			this.setState({
				groupSelected: value
			})
			if (typeof areaId == 'object' && String(null) == 'null') {
				areaId = this.state.areasSelected
			}
			if (areaId != this.state.areasSelected) {
				let groups = $.map(this.allGroups, (v, i) => {
						if (v.areaId == areaId || v.id == 'all') {
							return v
						}
					})
				this.setState({
					groups: groups,
					areasSelected: areaId
				})
			}
			customEvent.trigger('search.WidgetList', [areaId, value, ''])
		},
		inputHandler: function (e) {
			this.setState({
				value: e.target.value
			})
		},
		queryApp: function () {
			let {value, groupSelected, areasSelected} = this.state
			if (value) {
				customEvent.trigger('search.WidgetList', [areasSelected, groupSelected,value])
			}
		},
		render: function () {
			let {groups, areas, groupSelected, areasSelected} = this.state
			let areaOptions = areas.map((v,i)=><option key={i} value={v.id}>{v.areaName}</option>)
			let groupOptions = groups.map((v,i)=><option key={i} value={v.id} data-area-id={v.areaId}>{v.name}</option>)
			
			return (
				<div className="container-fluid mtopcon">
					<div className="container-fluid ">
						<div className="row-fluid">
							<div className="fl">
								<select ref='areas' onChange={this.areaChange} className="form-inline app-select" value={areasSelected}>
									{areaOptions}
								</select>
								<select ref='groups' onChange={this.groupChange} className="form-inline app-select" value={groupSelected}>
									{groupOptions}
								</select>
							</div>
							<div className="col-sm-3 searchgroup">
								<div className="input-group">
									<input type="text" className="form-control" placeholder="搜索..." value={this.state.value} onChange={this.inputHandler}/>
									<span className="input-group-btn">
										<button className="btn btn-default" type="button" onClick={this.queryApp}>查询</button>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	});
	return SearchArea
});