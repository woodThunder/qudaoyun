define([
	'apworkbench/js/widgetAuthorize/Widget'
], function () {
	var Widget = require('apworkbench/js/widgetAuthorize/Widget');
	var WidgetList = React.createClass({displayName: "WidgetList",
		render: function() {
			var _props = this.props;
			var widgets = _props.widgets;
			var checkedWidgets = _props.checkedWidgets;
            widgets = widgets.map(function (v, i) {
                var state =   !($.inArray(v.pkWidget, checkedWidgets)<0);
				return React.createElement(Widget, {key: i, widget: v, isCheck: state});
			});
			return (
				React.createElement("div", {className: "row content xjtc"}, 
					widgets
				)
			)
		}
	});
	return WidgetList
});
