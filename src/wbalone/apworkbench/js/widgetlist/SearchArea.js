'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define([  'customEvent'], function  () {
	var customEvent = require('customEvent');
	var contextRoot = window.contextRoot==undefined?"/workbench":window.contextRoot;
	//分组数据
	var SearchArea = React.createClass({
		displayName: 'SearchArea',

		getInitialState: function getInitialState() {
			return {
				value: '',
				groups: [{ id: 'all', name: '全部分组' }],
				areas: [{ id: 'all', areaName: '全部应用' }],
				groupSelected: 'all',
				areasSelected: 'all'
			};
		},
		componentDidMount: function componentDidMount() {
			this.getGroups();
			this.getAreas();
		},
		getGroups: function getGroups() {
			var that = this;
			//获取分组数据
			$.get(contextRoot+'/apEditGroups/group', function (result) {
				if (result.status) {
					that.allGroups = that.state.groups.concat(result.data);
					that.setState({
						groups: that.allGroups
					});
				} else {
					result.msg ? alert(result.msg) : '';
				}
			}, 'json');
		},
		getAreas: function getAreas() {
			var that = this;
			//获取领域数据
			$.get(contextRoot+'/apEditGroups/area', function (result) {
				if (result.status) {
					that.allAreas = that.state.areas.concat(result.data);
					that.setState({
						areas: that.allAreas
					});
				} else {
					result.msg ? alert(result.msg) : '';
				}
			}, 'json');
		},
		areaChange: function areaChange(e) {
			var option = e.target.selectedOptions[0];
			var groupOption = this.refs.groups.selectedOptions[0];
			var areaValue = option.value;
			var groupValue = groupOption.value;
			this.setState({
				areasSelected: areaValue
			});
			if (areaValue == 'all') {
				this.setState({
					groups: this.allGroups
				});
			} else if (groupOption.getAttribute('data-area-id') != areaValue) {
				var groups = $.map(this.allGroups, function (v, i) {
					if (v.areaId == areaValue || v.id == 'all') {
						return v;
					}
				});
				groupValue = groups[0].id;
				this.setState({
					groups: groups,
					groupSelected: groupValue
				});
			}
			customEvent.trigger('search.WidgetList', [areaValue, groupValue, '']);
		},
		groupChange: function groupChange(e) {
			var option = e.target.selectedOptions[0];
			var areaId = option.getAttribute('data-area-id');
			var value = option.value;
			this.setState({
				groupSelected: value
			});
			if ((typeof areaId === 'undefined' ? 'undefined' : _typeof(areaId)) == 'object' && String(null) == 'null') {
				areaId = this.state.areasSelected;
			}
			if (areaId != this.state.areasSelected) {
				var groups = $.map(this.allGroups, function (v, i) {
					if (v.areaId == areaId || v.id == 'all') {
						return v;
					}
				});
				this.setState({
					groups: groups,
					areasSelected: areaId
				});
			}
			customEvent.trigger('search.WidgetList', [areaId, value, '']);
		},
		inputHandler: function inputHandler(e) {
			this.setState({
				value: e.target.value
			});
		},
		queryApp: function queryApp() {
			var _state = this.state;
			var value = _state.value;
			var groupSelected = _state.groupSelected;
			var areasSelected = _state.areasSelected;

			if (value) {
				customEvent.trigger('search.WidgetList', [areasSelected, groupSelected, value]);
			}
		},
		render: function render() {
			var _state2 = this.state;
			var groups = _state2.groups;
			var areas = _state2.areas;
			var groupSelected = _state2.groupSelected;
			var areasSelected = _state2.areasSelected;

			var areaOptions = areas.map(function (v, i) {
				return React.createElement(
					'option',
					{ key: i, value: v.id },
					v.areaName
				);
			});
			var groupOptions = groups.map(function (v, i) {
				return React.createElement(
					'option',
					{ key: i, value: v.id, 'data-area-id': v.areaId },
					v.name
				);
			});

			return React.createElement(
				'div',
				{ className: 'container-fluid mtopcon' },
				React.createElement(
					'div',
					{ className: 'container-fluid ' },
					React.createElement(
						'div',
						{ className: 'row-fluid' },
						React.createElement(
							'div',
							{ className: 'fl' },
							React.createElement(
								'select',
								{ ref: 'areas', onChange: this.areaChange, className: 'form-inline app-select', value: areasSelected },
								areaOptions
							),
							React.createElement(
								'select',
								{ ref: 'groups', onChange: this.groupChange, className: 'form-inline app-select', value: groupSelected },
								groupOptions
							)
						),
						React.createElement(
							'div',
							{ className: 'col-sm-3 searchgroup' },
							React.createElement(
								'div',
								{ className: 'input-group' },
								React.createElement('input', { type: 'text', className: 'form-control', placeholder: '搜索...', value: this.state.value, onChange: this.inputHandler }),
								React.createElement(
									'span',
									{ className: 'input-group-btn' },
									React.createElement(
										'button',
										{ className: 'btn btn-default', type: 'button', onClick: this.queryApp },
										'查询'
									)
								)
							)
						)
					)
				)
			);
		}
	});
	return SearchArea;
});