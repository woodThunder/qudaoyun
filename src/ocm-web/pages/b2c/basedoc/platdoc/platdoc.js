/*****功能节点：平台档案****/
define(['ocm_simpleview', './meta.js'], function(simpleview, model) {
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
		},
		model: model,
		baseData: {
			baseurl: '/b2c/platforms',
			simpleList: new u.DataTable(model.options.metas.logiCompanyMeta),
			//			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			gridOption: model.options.grids.grid1,

		},
	});

	return view;
});