/*****功能节点：服务商等级****/
define(['ocm_simpleview', './meta.js'], function(simpleview, model) {
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
		},
		model: model,
		baseData: {
			baseurl: '/sc/service-provider-grades',
			simpleList: new u.DataTable(model.options.metas.gradeMeta),
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			gridOption: model.options.grids.grid1,

		},
	});

	return view;
});
