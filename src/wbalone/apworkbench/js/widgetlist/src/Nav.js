define([
	 
], function () {
	var Nav = React.createClass({
		goBack: function () {
			//返回应用清单
			window.location.href = "#roleapplication";
		},
		render: function () {
			return (
				<div className="nav-bar">
					<div className="backbutton" onClick={this.goBack}>
						<i className="fa fa-chevron-left"></i>返回
					</div>
				</div>
			)
		}
	});
	return Nav
});