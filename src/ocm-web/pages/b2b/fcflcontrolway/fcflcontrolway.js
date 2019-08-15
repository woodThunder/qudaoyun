define(["ocm_simpleview", "./meta.js", "ocm_common"], function (
	simpleview,
	model,
	common
) {
	var viewModel;
	var view = simpleview.extend({
		rendertype: Object.assign({
				// 规则类型
				ruleTypeRender: function (params) {
					params.element.innerHTML = "";
					/*默认1表示启用，0表示停用*/
					if (params.value != 0 && params.value != "1") {
						params.element.innerHTML = "满托规则";
					} else {
						params.element.innerHTML = "满车规则";
					}
				},
				// 控制方式
				controlFlagRender: function (params) {
					params.element.innerHTML = "";
					/*默认1表示启用，0表示停用*/
					if (params.value != 0 && params.value != "2") {
						params.element.innerHTML = "预警控制";
					} else {
						params.element.innerHTML = "刚性控制";
					}
				}
			},
			common.rendertype
		),
		beforeCreate: function () {
			viewModel = this.viewModel;
		},
		model: model,
		baseData: {
			baseurl: "/b2b/truck-tray-ctrls",
			simpleList: new u.DataTable(model.options.metas.poControlRulemeta),
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			gridOption: model.options.grids.grid1
		},
		afterCreate: function () {
			viewModel.dialogcardcomp.viewModel.params.on("orderTypeId.valuechange", function(obj){
				viewModel.dialogcardcomp.seteidtValue('tranTypeId', null);
				if (obj.newValue) {
					var parem = {
						EQ_isEnable: 1,
						EQ_billTypeId: obj.newValue
					}
				} else {
					var parem = {
						EQ_isEnable: 1,
						IN_billTypeId: "SaleOrder,DeliveryOrder"
					}
				}
				$("#tranTypeCls").parent().attr("data-refparam", JSON.stringify(parem))
			});
			viewModel.searchcomp.viewModel.params.on("orderType.valuechange", function(obj){
				viewModel.searchcomp.setSearchValue('tranType', null);
				if (obj.newValue) {
					var parem = {
						EQ_isEnable: 1,
						EQ_billTypeId: obj.newValue
					}
				} else {
					var parem = {
						EQ_isEnable: 1,
						IN_billTypeId: "SaleOrder,DeliveryOrder"
					}
				}
				$("#tranType_searchCls").parent().attr("data-refparam", JSON.stringify(parem))
			});
		}
	});
	return view;
});