define(['text!./retailgoodsask.html', 'ocm_common', 'ocm_baseview', './meta.js', 'ocm_ordertrack', "../../flow/bpmapproveref/bpmopenbill.js"], function(tpl, common, baseview, model, ordertrack, bpmopenbill) {
	'use strict'
	var viewModel, appCtx = "/occ-b2c",
		allocateDialog, purchaseDialog, app;
	var BILLPANELSTATUS = {
		ADD: "add",
		EDIT: "edit",
		COPY: "copy",
		DETAIL: "detail",
		DEFAULT: "default"
	}
	var view = baseview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
			viewModel = _.extend(viewModel, bpmopenbill.model);
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/b2c/req-orders',
			complexList: new u.DataTable(model.options.metas.complex),
			complexItems: new u.DataTable(model.options.metas.complexItem),
			// purchasePartItems: new u.DataTable(model.options.metas.PartItem),
			//采购
			pushPurchaseList: new u.DataTable(model.options.metas.pushPurchaseMain),
			pushPurchaseItems: new u.DataTable(model.options.metas.pushPurchaseSub),
			goodsList: new u.DataTable(model.options.metas.goodsMeta),
			//商品参照
			ProductRef: new u.DataTable(model.options.metas.ProductRef),

			searchcomp: {},
			searchSource: model.options.searchs.search1,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button4Source: model.options.buttons.button4,

			purchaseCardSource: model.options.cards.purchaseCard,
			detail11Source: model.options.details.detail1,
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			purchaseOption: model.options.grids.purchaseGrid,
			allocateOption: model.options.grids.allocateGrid,
			checkpartinfo: model.options.grids.checkpartinfo,


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
			enableFmt: ko.pureComputed(function() {
				var enableStatus = viewModel.complexList.ref("billStatus")();
				switch (enableStatus) {
					case '01':
						return "待处理"
					case '02':
						return "已审批";
					case '03':
						return "已安排"
					case '04':
						return "已发货";
					case '05':
						return "门店已入库";
					default:
						return "待处理";
				}
			})
		},
		rendertype: {
			operation: common.rendertype.operation,
			enableStatusRender: common.rendertype.enableRender,
			detailRender: common.rendertype.detailRender,
			orderStatusRT: function(obj) {
				var showValue;
				if (viewModel.orderStatusSrc)
					for (var i = 0; i < viewModel.orderStatusSrc.length; i++) {
						if (viewModel.orderStatusSrc[i].value == obj.value) {
							showValue = viewModel.orderStatusSrc[i].name;
							break;
						}
					}
				obj.element.innerHTML = showValue;
			},
			closeSrc: function(obj) {
				var showValue;
				switch (obj.value) {
					case "0":
						showValue = "是";
						break;
					case "1":
						showValue = "否";
						break;

				}
				obj.element.innerHTML = showValue;
			},
			billStatesEm: function(obj) {
				var showName;
				console.log()
				switch (obj.value) {
					case "01":
						showName = "待处理"
						break;
					case "02":
						showName = "已审批"
						break;
					case '03':
						showName = "已安排"
						break;
					case "04":
						showName = "已发货"
						break;
					case '05':
						showName = "门店已入库"
						break;
				}
				obj.element.innerHTML = showName;
			}
		},
		events: {
			//进入新增单据页
			showEditBillPanel: function(index) {
				var self = this;
				var title;
				if (index >= 0) { //编辑
					viewModel.complexList.setRowFocus(index);
					var curRow = viewModel.complexList.getCurrentRow();
					var id = curRow.getValue("id"),
						source = curRow.getValue('source');
					var billStatus = curRow.getValue("billStatus"); //订单状态
					if ("01" != billStatus) {
						toastr.warning('不允许编辑除暂存状态以外的订单');
						return;
					}
					if (source) {
						var outOrg = viewModel.app.getComp("outOrg");
						var outWarehouse = viewModel.app.getComp("outWarehouse");
						var askWarehouse = viewModel.app.getComp("askWarehouse");
						var askShop = viewModel.app.getComp("askShop");
						outOrg.setEnable(false)
						outWarehouse.setEnable(false)
						askWarehouse.setEnable(false)
						askShop.setEnable(false)
					}
					//请求完整主子表信息
					viewModel.findByParentid(id);
					viewModel.goBillPanel();
					viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
				} else { //新增
					var row = viewModel.complexList.createEmptyRow();
					// row.setValue('source', '1')
					viewModel.complexList.setRowFocus(row);
					// viewModel.complexItems.removeAllRows();
					// row.setValue("orderSource", "2"); //补录
					// row.setValue("isException", "0");
					// row.setValue("isLock", "0");
					// row.setValue("isSplitDispatch", "0");
					// row.setValue("isUrgent", "0");
					// row.setValue("billStatus", "01");
					// row.setValue("bookTime", new Date().toString());
					// row.setValue("payTime", new Date().toString());
					// row.setValue("platformBillStatus", "01");
					// row.setValue("serviceMode", "0");
					// row.setValue("documentDate", common.tools.format(new Date()));
					viewModel.goBillPanel();
					viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
				}
			},
			//查询子表数据
			findByParentid: function(id) {
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + '/detail/' + id,
					// data: { id: id },
					success: function(data) {
						viewModel.complexList.setSimpleData(data);
						// viewModel.complexItems.removeAllRows();
						// viewModel.complexItems.setSimpleData(data.orderGoods, {
						// 	unSelect: true
						// });
						// var orderReceiverProvince = data.orderReceiverProvince;
						// var orderReceiverCity = data.orderReceiverCity;
						// var orderReceiverDistrict = data.orderReceiverDistrict;
						// $("#city").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"2","EQ_parent.id":"' + orderReceiverProvince + '"}');
						// $("#district").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"3","EQ_parent.id":"' + orderReceiverCity + '"}');
						// $("#town").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"4","EQ_parent.id":"' + orderReceiverDistrict + '"}');
					}
				})
			},
			//删除和批量删除
			del: function(index) {
				if (typeof(index) == 'number') {
					viewModel.complexList.setRowSelect(index);
				}
				var ids = [];
				var rows = viewModel.complexList.getSelectedRows();
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].getValue("id"));
						var billStatus = rows[i].getValue("billStatus"); //订单状态
						if ("01" != billStatus) {
							toastr.warning('不允许删除除暂存状态以外的订单');
							return;
						}
					}
					common.dialog.confirmDialog({
						msg1: '确认删除这些项？',
						msg2: '此操作不可逆',
						width: '400px',
						type: 'error',
						onOk: function() {
							$._ajax({
								url: appCtx + viewModel.baseurl + "/delete",
								type: "post",
								data: {
									ids: ids.join(",")
								},
								success: function(data) {
									viewModel.complexList.removeRows(rows);
								}
							});
						}
					});
				} else {
					toastr.warning("请先选择一行数据");
				}
			},
			//点击取消 单据页
			cancelBill: function() {
				viewModel.retListPanel();
			},
			floatTypeSetRendertype: function(obj) {
				common.rendertype.floatTypeSet(obj);
			},
			showAddItemsRef: function() {
				var newRow = viewModel.complexItems.createEmptyRow();
			},
			//删除子表项
			delItems: function() {
				var selectedRows = viewModel.complexItems.getSelectedRows();
				viewModel.complexItems.removeRows(selectedRows);
			},
			//保存单据
			saveBill: function() {
				var result = app.compsValidateMultiParam({
					element: ".ui-bill-panel",
					showMsg: true
				});
				if (!result.passed) {
					return;
				}
				viewModel.complexItems.setAllRowsUnSelect();
				// var cCurRow = viewModel.complexList.getCurrentRow();
				var allRows = viewModel.complexItems.getAllRows();
				if (allRows.length == 0 || allRows.every(function(row) {
						return row.status == u.Row.STATUS.FALSE_DELETE
					})) {

				}
				var complexData = viewModel.complexList.getCurrentRow().getSimpleData();
				var complexItemsData = viewModel.complexItems.getSimpleData();
				complexData.reqOrderItemList = complexItemsData;
				var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
				$._ajax({
					url: appCtx + viewModel.baseurl,
					type: _ajaxType,
					data: JSON.stringify(complexData),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						toastr.success();
						viewModel.search();
						// viewModel.complexList.getFocusRow().setSimpleData(data);
						viewModel.retListPanel();
					}
				})
			},
			// 审批流程的相关按钮点击事件 - start
			// 提交申请单
			submitBillBpm: function(data, rowId) {
				viewModel = _.extend(viewModel, bpmopenbill.model);
				if (typeof(data) == 'number') {
					viewModel.complexList.setRowSelectbyRowId(rowId);
				}
				var listCompId = "complexList";
				var nodeJs = "/ocm-web/pages/fee/retailgoodsask/retailgoodsask.js";
				var billTypeCode = "REQOrder";
				var tranTypeCode = null;
				var callback = null;
				viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
			},
			// 收回申请单
			unsubmitBillList: function(data, rowId) {
				viewModel = _.extend(viewModel, bpmopenbill.model);
				if (typeof(data) == 'number') {
					viewModel.complexList.setRowSelectbyRowId(rowId);
				}
				var listCompId = "complexList";
				var billTypeCode = "REQOrder";
				var tranTypeCode = null;
				var callback = null;
				viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
			},

			// 审批通过申请单
			approveBill: function(data, rowId) {
				viewModel = _.extend(viewModel, bpmopenbill.model);
				if (typeof(data) == 'number') {
					viewModel.complexList.setRowSelectbyRowId(rowId);
				}
				var listCompId = "complexList";
				var billTypeCode = "REQOrder";
				var tranTypeCode = null;

				var withBpmCallback = function() {
					var index = viewModel[listCompId].getSelectedIndex();
					var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
					var id = viewModel.complexList.getRow(index).getValue('id');
					viewModel.detail(index, rowId);
					viewModel.initBPMFromBill(id, viewModel);
				};
				var withoutBpmCallback = null;
				viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);

			},

			// 审批不通过申请单
			// disapproveCusReqForm: function() {
			//  viewModel = _.extend(viewModel, bpmopenbill.model);
			//  var listCompId = "complexList";
			//  var billTypeCode = "REQOrder";
			//  var tranTypeCode = null;
			//  var withBpmCallback = function() {
			//    var index = viewModel[listCompId].getSelectedIndex();
			//    var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
			//    var id = viewModel.complexList.getRow(index).getValue('id');
			//    viewModel.detail(index, rowId);
			//    viewModel.initBPMFromBill(id, viewModel);
			//  };
			//  var withoutBpmCallback = null;
			//  viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
			//    withoutBpmCallback);
			// },

			// 取消审批申请单
			unapproveBill: function(data, rowId) {
				viewModel = _.extend(viewModel, bpmopenbill.model);
				if (typeof(data) == 'number') {
					viewModel.complexList.setRowSelectbyRowId(rowId);
				}
				var listCompId = "complexList";
				var billTypeCode = "REQOrder";
				var tranTypeCode = null;
				var withBpmCallback = function() {
					var index = viewModel[listCompId].getSelectedIndex();
					var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
					var id = viewModel.complexList.getRow(index).getValue('id');
					viewModel.detail(index, rowId);
					viewModel.initBPMFromBill(id, viewModel);
				};
				var withoutBpmCallback = null;
				viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);
			},
			// 驳回
			rejectBillPanel: function() {
				var rows = viewModel.complexList.getSelectedRows();
				if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.REJECT)) {
					if (rows && rows.length > 0) {
						viewModel.batch_ajax("/reject-order", rows, "驳回");
					} else {
						toastr.warning("请至少选择一项");
					}
				}
			},
			// 操作订单前，检查订单状态是否正确
			checkStatus: function(rows, checker) {
				var msg = '';
				if (checker.needCode == '04') {
					for (var i = 0; i < rows.length; i++) {
						var row = rows[i];
						if (row.getValue("state") !== checker.needCode) {
							if (row.getValue("state") != '09' || row.getValue("orderStatusCode") != '07') {
								msg += '[' + row.getValue('code') + ']、';
							}
						}
					}
					if (msg.length > 0) {
						checker.errmsg(msg);
						return false;
					}
				} else {
					for (var i = 0; i < rows.length; i++) {
						var row = rows[i];
						if (row.getValue("orderStatusCode") !== checker.needCode) {
							msg += '[' + row.getValue('orderCode') + ']、';
						}
					}
					if (msg.length > 0) {
						checker.errmsg(msg);
						return false;
					}
				}
				return true;
			},
			// 审批流程的相关按钮点击事件 - end
			//门店发货
			deliveryFun: function() {
				var selectedRows = viewModel.complexList.getSelectedRows();
				if (selectedRows.length < 1) {
					toastr.warning("请至少选择一条订单进行操作");
					return false
				}
				var data = [];
				// case '01':
				//    return "待处理"
				//  case '02':
				//    return "已审批";
				//  case '03':
				//    return "已安排"
				//  case '04':
				//    return "已发货";
				//  case '05':
				//    return "门店已入库";
				for (var i = 0; i < selectedRows.length; i++) {
					if (selectedRows[i].getValue('billStatus') != "03") {
						continue;
					}
					data.push(selectedRows[i].getValue('id'));
				}
				if (!data.length) {
					toastr.warning("只有订单状态为已安排的订单可以门店发货!");
					return false
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + "/requisitionbill-send",
					type: "get",
					data: {
						ids: data.join(',')
					},
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						toastr.success();
						viewModel.search();
					}
				})
			},


			orderPurchase: function(ids) {
				var data = viewModel.goodsList.getSimpleData();
				$._ajax({
					url: appCtx + viewModel.baseurl + "/req-purchase/?ids=" + ids,
					type: "post",
					contentType: "application/json; charset=utf-8",
					success: function() {
						purchaseDialog.close();
						toastr.success("申购成功");
						viewModel.search();
					}
				})
			},

			orderAllocate: function() {
				var data = viewModel.goodsList.getSimpleData(),
					flag = false;
				for (var i = 0; i < data.length; i++) {
					if (data[i].transferNum && data[i].transferNum > 0) {} else {
						toastr.warning('调拨数量必填并且大于0！')
						var iRow = viewModel.goodsList.setRowSelect(i)
						flag = true;
						break;
					}
				}
				if (flag) {
					return
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + "/req-transfer",
					type: "post",
					data: JSON.stringify(data),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						allocateDialog.close();
						toastr.success();
						viewModel.search();
					}
				})
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function(reindex) {
				if (reindex) {
					viewModel.complexList.pageIndex(0);
				}
				viewModel.complexList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.complexList.pageSize();
				var pageNumber = viewModel.complexList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function(data) {
						viewModel.complexList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.complexList.totalRow(data.totalElements);
						viewModel.complexList.totalPages(data.totalPages);
					}
				})
			},
			//清空搜索条件
			cleanSearch: function() {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function(index) {
				viewModel.complexList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function(size) {
				viewModel.complexList.pageSize(size);
				viewModel.search(true);
			},
			//详情
			// 方案1：clone编辑态模板，设置只读，返回删除
			// 方案2：重新定义详情模板
			// 主要看差异，如果差异不大公用模板，差异大重新定义
			// detail: function() {
			//   //确保grid先将行设置为focus状态
			//   setTimeout(function(){
			//     var curRow = viewModel.complexList.getCurrentRow();
			//     var id = curRow.getValue("id");
			//     viewModel.findByParentid(id);
			//     var $detailWrap = $("#bill-detail-wrap");
			//     $detailWrap.empty();
			//     var $billPanel_cl = $(".ui-bill-panel").clone();
			//     $billPanel_cl.show();
			//     $detailWrap.append($billPanel_cl);
			//     viewModel.showBillDetail();
			//     u.compMgr.updateComp($detailWrap[0]);
			//   }, 0);
			// },
			detail: function(obj, index) {
				//确保grid先将行设置为focus状态
				// setTimeout(function() {
				viewModel.complexList.setRowSelect(obj.rowIndex);
				var curRow = viewModel.complexList.getCurrentRow();
				var id = curRow.getValue("id");
				viewModel.findByParentid(id);
				viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
				$(".ui-tabs .u-tabs__tab").eq(1).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
				$(".ui-tabs .u-tabs__panel").eq(1).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
				// viewModel.goDetailPanel();
				// }, 0);
			},
			//查询子表数据
			findByParentid: function(id) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/findByParentid?id=" + id,
					type: 'get',
					async: false,
					// data: {
					//   id: id
					// },
					success: function(data) {
						for (var i = 0; i < data.length; i++) {
							data[i].goodsCode = data.requisitionBillItemDtos[0].goodsCode;
							data[i].storageDate = data.requisitionBillItemDtos[0].storageDate;
							data[i].goodsNum = data.requisitionBillItemDtos[0].goodsNum;
						}
						viewModel.complexItems.setSimpleData(data.requisitionBillItemDtos[0]);
					}
				})
			},
			// 清除基类属性
			clearBaseProp: function(row) {
				row.setValue("id", "");
				row.setValue("code", "");
				row.setValue("name", "");
				row.setValue("creator", "");
				row.setValue("creationTime", "");
				row.setValue("modifier", "");
				row.setValue("modifiedTime", "");
			},
			//跳转单据详情页
			showBillDetail: function() {
				$(".ui-list-panel").addClass("animated slideInLeft");
				$(".ui-bill-panel").addClass("animated slideOutDown");
			},
			detail2bill: function() {
				if (!viewModel.canInEdit()) {
					return;
				}
				viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
				common.bill.detail2bill();
			},

			// 放回列表页
			retListPanel: function() {
				viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DEFAULT;
				common.bill.retListPanel();
			},
			// 点击grid产品参照 触发外部真实产品参照
			showRealProductRef: function() {
				viewModel.clearRealProductRef();
				$("#productRefer .refer").trigger("click");
			},
			// 清除参照之前的选择
			clearRealProductRef: function() {
				viewModel.ProductRef.setValue("productRefer", "");
				var refer = $("#refContainerproductRefer").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			//增行
			addRow: function() {

				viewModel.showRealProductRef();
			},
		},
		afterCreate: function() {
			app = viewModel.app;
			viewModel.complexList.on('close.valuechange', function(obj) {
				if (!obj.newValue) return;
				var subDatas = viewModel.complexItems.getAllRows();
				for (var i = 0; i < subDatas.length; i++) {
					subDatas[i].setValue('close', obj.newValue);
				}
			});
			viewModel.complexList.on('source.valuechange', function(obj) {
				if (!obj.newValue) return;
				var grid = app.getComp("grid_editItem").grid;
				var column1 = grid.getColumnByField("goodsCode").options;
				var column2 = grid.getColumnByField("goodsVersion").options;
				var column3 = grid.getColumnByField("reqNum").options;
				var column4 = grid.getColumnByField("expectedArrivalDate").options;
				column1.editable = false;
				column2.editable = false;
				column3.editable = false;
				column4.editable = false;
			});
			var productRow = viewModel.ProductRef.createEmptyRow();
			viewModel.ProductRef.setRowFocus(productRow);
			// 产品参照选择，为产品所在行增加多个包件行
			viewModel.ProductRef.on("productRefer.valuechange", function(obj) {
				if (!obj.newValue) {
					return;
				}
				var refValues = $("#refContainerproductRefer").data("uui.refer").values;
				var selecRows = [];
				if (refValues && refValues.length > 0) {
					var mainDatas = viewModel.complexList.getCurrentRow();
					var newRows = [];
					for (var i = 0; i < refValues.length; i++) {
						var newRow = undefined;
						newRow = new u.Row({
							parent: viewModel.complexItems
						});
						//判断是否存在row
						var row = viewModel.complexItems.getRowByField("goodsCode", refValues[i].refcode);
						if (!row || row.status == "fdel") {
							newRows.push(newRow);
							selecRows.push(newRow);
						}
						newRow.setValue("goodsName", refValues[i].refname);
						newRow.setValue("goodsCode", refValues[i].refcode);
						newRow.setValue("goodsId", refValues[i].refpk);
						newRow.setValue('reqNum', 1); //要货数量
						newRow.setValue('goodsVersion', refValues[i].version); //商品版本号
						newRow.setValue('approveNum', 1); //已批复数量
						newRow.setValue('expectedArrivalDate', mainDatas.getValue('expectedArrivalDate')); //期望要货时间
						newRow.setValue('unitName', refValues[i].unitName); //单位
						newRow.setValue('close', mainDatas.getValue('close')); //是否关闭
					}
					viewModel.complexItems.insertRows(0, newRows);
				}

			});
			viewModel.complexList.on('reqWarehouseId.valuechange', function(obj) {
				if (!obj.newValue) return;
				var refValues = $('div[id^="refContainerreqWarehouseId"]').data("uui.refer").values;
				if (refValues && refValues.length > 0) {
					obj.rowObj.setValue('reqInvOrgId', refValues[0].inventoryOrgId)
				}
			});
			viewModel.goodsList.on('transferNum.valuechange', function(obj) {
				if (!obj.newValue) return;
				var row = obj.rowObj;
				var gNum = row.getValue('goodsNum'),
					pNum = row.getValue('purchaseNum'),
					tNum = row.getValue('transferNumCopy'),
					nVal = obj.newValue;
				if (nVal <= 0) {
					toastr.warning('调拨数量需大于0!');
					row.setValue('transferNum', tNum);
					return;
				}
				if ((parseFloat(nVal) + parseFloat(pNum) + parseFloat(tNum)) > parseFloat(gNum)) {
					toastr.warning('申购数量和调拨数量的和不能大于申请数量!');
					row.setValue('transferNum', parseFloat(gNum) - parseFloat(pNum) - parseFloat(tNum))
				}
			});
		}
	});

	return view;
});