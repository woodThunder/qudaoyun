define(['ocm_simpleview', './meta.js', 'ocm_common'], function(simpleview, model, common) {
	'use strict'
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
		},
		model: model,
		baseData: {
			baseurl: '/fee/customer-balances',
			// excelurl: '/potypes-Excel',单表档案支持导入导出时需配置此属性
			// dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
			// statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
			simpleList: new u.DataTable(model.options.metas.potypemeta),
			// buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			detailSource: model.options.details.detail,
			gridOption: model.options.grids.grid1,
			enableFmt: ko.pureComputed(function() {
				var status = viewModel.simpleList.ref("isEnable")();
				return status == 1 ? "启用" : "停用";
			}),
		},
		events: $.extend({}, simpleview.prototype.events, {
			getCurrency: function(id, mny, i) {
				if (id) {
					$._ajax({
						url: '/occ-base/api/base/currency/' + id,
						success: function(resp) {
							var newMny = mny.toFixed(resp.pricePrecision);
							viewModel.allRows[i].mny = newMny
							if (i == (viewModel.allRows.length - 1)) {
								viewModel.simpleList.setSimpleData(viewModel.allRows);
							}
						}
					});
				}
			},
			search: function(reindex) {
				if (reindex) {
					viewModel.simpleList.pageIndex(0);
				}
				viewModel.simpleList.removeAllRows();
				if (!viewModel.searchcomp) {
					var queryData = {};
				} else {
					var queryData = viewModel.searchcomp.getDataWithOpr ?
						viewModel.searchcomp.getDataWithOpr() : {};
				}
				queryData.size = viewModel.simpleList.pageSize();
				queryData.page = viewModel.simpleList.pageIndex();
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function(data) {
						var con = data.content
						viewModel.simpleList.setSimpleData(con, {
							unSelect: true
						});
						viewModel.allRows = viewModel.simpleList.getSimpleData();
						viewModel.simpleList.totalRow(data.totalElements);
						viewModel.simpleList.totalPages(data.totalPages);
						for (var key = 0; key < con.length; key++) {
							var currencyId = con[key].currencyId,
								mny = con[key].mny;
							viewModel.getCurrency(currencyId, mny, key);
						}
					}
				});
			},
		}),
		rendertype: $.extend({}, common.rendertype, {
			castTypeList: function(params) {
				switch (params.value) {
					case "pay01":
						params.element.innerHTML = "冲抵订单";
						break;
					case "pay02":
						params.element.innerHTML = "货补";
						break;
					case "pay03":
						params.element.innerHTML = "实物货补";
						break;
					case "pay04":
						params.element.innerHTML = "账扣";
						break;
					default:
						params.element.innerHTML = "冲抵订单";
				}
			},
		}),
		afterCreate: function() {
			viewModel.dialogcardcomp.viewModel.params.on('accountId.valuechange', function(obj) {
				if (!obj.newValue) return;
				var refer = $('div[id^="refContaineraccountId"]').data("uui.refer");
				var refValues = refer.values[0];
				viewModel.dialogcardcomp.viewModel.params.setValue('castTypeId', refValues.castTypeId);
				viewModel.dialogcardcomp.viewModel.params.setValue('saleOrgId', refValues.saleOrgId);
				viewModel.dialogcardcomp.viewModel.params.setValue('financeOrgId', refValues.financeOrgId);
			});
		}
	});

	return view;
});