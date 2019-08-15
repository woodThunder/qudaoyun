define([
	'customEvent'
], function () {
	var customEvent = require('customEvent');
	var WidgetGroupTitle = React.createClass({
		render: function () {
			var _props = this.props;
			var groupName = _props.groupName;
			var groupId = _props.groupId;
			return (
				<div className='row outrow'>
                    <div className='col-sm-6 col-lg-3 outrowtitle'>{groupName}</div>
				</div>
			)
		}
	});
	return WidgetGroupTitle
});
