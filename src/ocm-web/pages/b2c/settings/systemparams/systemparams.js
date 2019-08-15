/*****功能节点：系统参数设置****/
define(['ocm_simpleview', './meta.js'], function(simpleview, model) {
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
		},
		model: model,
		baseData: {
			baseurl: '/b2c/system-paramss',
			simpleList: new u.DataTable(model.options.metas.systemParamMeta),
			//buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			gridOption: model.options.grids.grid1,
			dialogWidth:'800px'
		},
		rendertype: {
			operation: function(obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";

				obj.element.innerHTML = '<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a href="#" ' +
					editfun +
					' title="编辑">编辑</a>' +
					'</span></div>';
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			}
		}
	});

	return view;
});