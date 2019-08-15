"use strict";

define([ ], function  () {
	var Nav = React.createClass({
		displayName: "Nav",

		goBack: function goBack() {
			//返回应用清单
			window.location.href = "#roleapplication";
		},
		render: function render() {
			return React.createElement(
				"div",
				{ className: "nav-bar" },
				React.createElement(
					"div",
					{ className: "backbutton", onClick: this.goBack },
					React.createElement("i", { className: "fa fa-chevron-left" }),
					"返回"
				)
			);
		}
	});
	return Nav;
});