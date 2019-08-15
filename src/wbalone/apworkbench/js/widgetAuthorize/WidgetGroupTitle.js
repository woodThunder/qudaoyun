define([
	'customEvent'
], function () {
	var customEvent = require('customEvent');
	var WidgetGroupTitle = React.createClass({displayName: "WidgetGroupTitle",
		render: function () {
			var _props = this.props;
			var groupName = _props.groupName;
			var groupId = _props.groupId;
			return (
				React.createElement("div", {className: "row outrow"}, 
                    React.createElement("div", {className: "col-sm-6 col-lg-3 outrowtitle"}, groupName)
				)
			)
		}
	});
	return WidgetGroupTitle
});
