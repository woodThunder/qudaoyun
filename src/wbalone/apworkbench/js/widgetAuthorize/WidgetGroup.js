define([
	'apworkbench/js/widgetAuthorize/WidgetGroupTitle',
	'apworkbench/js/widgetAuthorize/Widgets'
], function() {

	var WidgetGroupTitle = require('apworkbench/js/widgetAuthorize/WidgetGroupTitle');
	var Widgets = require('apworkbench/js/widgetAuthorize/Widgets');
	var WidgetGroup = React.createClass({displayName: "WidgetGroup",
		render: function () {
			var _props = this.props;
			var WidgetGroup = _props.WidgetGroup;
			var checkedWidgets = _props.checkedWidgets;
			var key = _props.key;
			var groupId = WidgetGroup.groupId;
			var groupName = WidgetGroup.groupName;
			var widgetList = WidgetGroup.widgetList;
			return (
				React.createElement("div", {className: "app-group"}, 
					React.createElement(WidgetGroupTitle, {key: key, groupId: groupId, groupName: groupName}), 
					React.createElement(Widgets, {key: key, widgets: widgetList, checkedWidgets: checkedWidgets})
				)
			)
		}
	});
	return WidgetGroup

});
