define(['text!./creditrecalcula.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
	'use strict'
	var viewModel, appCtx = "/occ-cr";
	var BILLPANELSTATUS = {
		ADD: "add",
		EDIT: "edit",
		COPY: "copy",
		DETAIL: "detail",
		DEFAULT: "default"
	}
	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/cr/credit-recalculation-query',
			recaurl: "/cr/credit-recalculation/recalculationByCreditLimit",
			complexList: new u.DataTable(model.options.metas.complex),
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			button1Source: model.options.buttons.button1,
			grid1Option: model.options.grids.grid1,
			gPreKey: '',
			searchTime: 0,

			billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
			enableRadioSrc: [{
				value: "1",
				name: "启用"
			}, {
				value: "0",
				name: "停用"
			}, {
				value: CONST.DEFAULTOPTION,
				name: "全部"
			}],
			enableCheckSrc: [{
				value: "1",
				name: "是"
			}],
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//返回列表页
			// retListPanel: common.bill.retListPanel,
			//跳转详情页
			goDetailPanel: common.bill.goDetailPanel,
			// enableFmt: function() {
			//   var row = viewModel.complexList.getFocusRow();
			//   if(!row) {
			//     return;
			//   }
			//   var enableStatus = row.getValue("enableStatus");
			//   return enableStatus==1? "启用":"停用";
			// },
			enableFmt: ko.pureComputed(function () {
				var enableStatus = viewModel.complexList.ref("enableStatus")();
				return enableStatus == 1 ? "启用" : "停用";
			}),
			loading: function onLoading() {
				var centerContent = '';
				var opt1 = {
					hasback: true,
					hasDesc: true, //是否含有加载内容描述
					centerContent: centerContent
				};
				u.showLoader(opt1);
			},

			//关闭加载条
			closeLoading: function onCloseLoading() {
				u.hideLoader();
			},
		},
		rendertype: {
			operation: common.rendertype.operation,
			enableStatusRender: common.rendertype.enableRender,
			detailRender: common.rendertype.detailRender,
		},
		events: {
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = '/creditrecalcula-excel/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = '/creditrecalcula-excel/excelDataExport'; //导出数据地址参数
				var listData = viewModel.complexList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
			},
			//刷新
			refresh: function () {
				viewModel.complexList.removeAllRows();
				viewModel.search();
			},
			asycula: function (obj) {
				$._ajax({
					type: "post",
					url: appCtx + viewModel.recaurl,
					// dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(obj),
					success: function (data) {
						/*{"prefixKey":"bdab8f7a-54f7-4fba-b8d5-36f4900b9835","msg":"0","status":"重算中"}
						  Processing("0","重算中"),
						  Failed("1","失败"),
						  Finish("2","完成");
						*/
						if (data.prefixKey) {
							viewModel.gPreKey = data.prefixKey;
						}
						if (data.status == '0') {
							setTimeout(function () {
								viewModel.loading();
								obj.prefixKey = data.prefixKey;
								viewModel.asycula(obj);
							}, '3000')
						} else if (data.status == '1') {
							toastr.error(data.msg);
							viewModel.closeLoading()
						} else {
							viewModel.closeLoading()
							viewModel.reSearch(data.prefixKey);
						}
					}
				})
			},
			paramsFun: function () {
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var obj = {};

				for (var key in queryData) {
					var str = key.substring(10, key.length);
					switch (str) {
						case 'creditCtrlStrategy.id':
							obj.creditCtrlStrategyId = queryData[key];
							break;
						case 'customerCategoryId':
							obj.customerCategoryId = queryData[key];
							break;
						case 'productGroup':
							obj.productGroupId = queryData[key];
							break;
						case 'customer':
							obj.customerId = queryData[key];
							break;
						case 'organizationId':
							obj.organizationId = queryData[key];
							break;
						case 'saleOrgId':
							obj.saleOrgId = queryData[key];
							break;
						case 'customer':
							obj.customerId = queryData[key];
							break;
						default:
							if (key.indexOf('orderTypeName') > -1) {
								obj.orderTypeId = viewModel.orderTypeId;
							}
					}
				}
				if (!obj.creditCtrlStrategyId) {
					toastr.error('控制策略为必输项！');
					return;
				}
				return obj;
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				if (!queryData["search_EQ_creditCtrlStrategy.id"]) {
					toastr.warning("请选择控制策略");
					return;
				}
				if (viewModel.searchTime == 0) {
					viewModel.searchTime = 1;
					return;
				}
				if ($('div.ui-searchbox div.ui-searchbox-footer div.ui-search-btn a.ui-btn-green').html() != "重算") {
					return;
				}
				if (reindex) {
					viewModel.complexList.pageIndex(0);
				}
				viewModel.complexList.removeAllRows();
				var obj = viewModel.paramsFun();
				viewModel.asycula(obj)
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			reSearch: function (preKey) {
				viewModel.complexList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.complexList.pageSize();
				var pageNumber = viewModel.complexList.pageIndex();
				queryData.search_EQ_prefixKey = preKey;
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					// contentType: "application/json; charset=utf-8",
					data: queryData,
					success: function (data) {
						viewModel.complexList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.complexList.totalRow(data.totalElements);
						viewModel.complexList.totalPages(data.totalPages);
					}
				})
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.complexList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.complexList.pageSize(size);
				viewModel.search(true);
			},
			//结果更新
			update: function () {
				if (viewModel.gPreKey == '') {
					toastr.warning('请先点选重算！')
					return;
				}
				// var queryData = viewModel.paramsFun();
				var selectRows = viewModel.complexList.getSelectedRows();
				if (selectRows.length < 1) {
					toastr.warning('请选择至少一条数据');
					return;
				}
				var creditLimitIdList = selectRows.map(function (row) {
					return row.getValue('id');
				})
				var prefixKey = viewModel.gPreKey;
				$._ajax({
					type: "post",
					url: appCtx + '/cr/credit-recalculation/result-update',
					// dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify({ creditLimitIdList: creditLimitIdList, prefixKey: prefixKey }),
					success: function (data) {
						viewModel.complexList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.complexList.totalRow(data.totalElements);
						viewModel.complexList.totalPages(data.totalPages);
					}
				})
			},
			// 清除基类属性
			clearBaseProp: function (row) {
				row.setValue("id", "");
				row.setValue("code", "");
				row.setValue("name", "");
				row.setValue("creator", "");
				row.setValue("creationTime", "");
				row.setValue("modifier", "");
				row.setValue("modifiedTime", "");
			},
		},
		afterCreate: function () {

			// 列表查询数据(无查询条件)
			// viewModel.search();
			// 子表参照聚焦行，用于绑定子表参照组件
			// var refRow = viewModel.ItemRefList.createEmptyRow();
			// viewModel.ItemRefList.setRowFocus(refRow);
			$('div.ui-searchbox div.ui-searchbox-footer div.ui-search-btn a.ui-btn-green').html("重算");
			viewModel.searchcomp.viewModel.params.on("creditCtrlStrategy--id.valuechange", function (obj) {
				if (!obj.newValue) return;
				var refer = $("[id^='refContainercreditCtrlStrategy--id']").data("uui.refer");
				var refValues = refer.values[0];
				if (!refValues) return;
				viewModel.searchcomp.viewModel.params.setValue('saleOrgId', refValues.saleOrgId)
				viewModel.searchcomp.viewModel.params.setValue('organizationId', refValues.organizationId)
				viewModel.searchcomp.viewModel.params.setValue('orderTypeName', refValues.trantypeName)
				// viewModel.searchcomp.viewModel.params.setValue('orderTypeId', refValues.trantypeId)
				viewModel.orderTypeId = refValues.trantypeId;
			});
			// 确定销售产品参照，为产品组合子表增行
			// viewModel.ItemRefList.on("productref.valuechange", function(obj) {
			//   // 清空参照时不增行
			//   if (!obj.newValue) {
			//     return;
			//   }
			//   var refer = $("#refContainerproductref").data("uui.refer");
			//   var refValues = refer.values;
			//   if (refValues && refValues.length > 0) {
			//     for (var i = 0; i < refValues.length; i++) {
			//       var id = refValues[i].refpk;
			//       var row = viewModel.complexItems.getRowByField("productid", id);
			//       if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
			//         var newrow = viewModel.complexItems.createEmptyRow();
			//         newrow.setValue("productidCode", refValues[i].refcode);
			//         newrow.setValue("productidName", refValues[i].refname);
			//         newrow.setValue("productidStandardName", refValues[i].productModelName);
			//         newrow.setValue("productidSaleSeriesName", refValues[i].productSaleSeriesName);
			//         newrow.setValue("unitName", refValues[i].baseUnit);
			//         newrow.setValue("productid", id);
			//       }
			//     }
			//   }
			// });
		}
	});

	return view;
});