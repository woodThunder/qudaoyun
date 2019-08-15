define([
	'apworkbench/js/widgetAuthorize/Widget'
], function () {
	var Widget = require('apworkbench/js/widgetAuthorize/Widget');
	var WidgetList = React.createClass({
		render: function() {
			var _props = this.props;
			var widgets = _props.widgets;
			var checkedWidgets = _props.checkedWidgets;
            widgets = widgets.map(function (v, i) {
                var state =   !($.inArray(v.pkWidget, checkedWidgets)<0);
				return <Widget key={i} widget={v} isCheck={state}/>;
			});
			return (
				<div className="row content xjtc">
					{widgets}
				</div>
			)
		}
	});
	return WidgetList
});
