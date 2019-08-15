'use strict';

define([  'customEvent', 'apworkbench/js/widgetlist/App'], function  () {
	var App = require('apworkbench/js/widgetlist/App');
	var AppGroupList = React.createClass({
		displayName: 'AppGroupList',

		render: function render() {
			var _this = this;

			var index = 0;
			var appGroup = $.map(this.props.appGroupList, function (v, i) {
				var apps = v.map(function (v, i) {
					return React.createElement(App, { key: i, id: v.id, appChinese: v.appChinese, appIcon: v.appIcon, appName: v.appName, userAppGroupList: _this.props.userAppGroupList });
				});
				return React.createElement(
					'div',
					{ key: index++, className: 'app-group' },
					React.createElement(
						'div',
						{ className: 'row outrow' },
						React.createElement(
							'div',
							{ className: 'col-sm-6 col-lg-3 outrowtitle' },
							i
						)
					),
					React.createElement(
						'div',
						{ className: 'row content xjtc' },
						apps
					)
				);
			});
			return React.createElement(
				'div',
				{ className: 'app-group-list' },
				appGroup
			);
		}
	});
	return AppGroupList;
});