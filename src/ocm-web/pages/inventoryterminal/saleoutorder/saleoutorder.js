define([
	"text!./saleoutorder.html",
	"ocm_common",
	"ocm_baseview",
	"./meta.js"
], function (tpl, common, baseview, model) {
	"use strict";
	var viewModel, app;
	var BILLPANELSTATUS = {
		ADD: "add",
		EDIT: "edit",
		COPY: "copy",
		DETAIL: "detail",
		DEFAULT: "default"
	};
	var billstatus = CONST.STOCKENUM.INITIN;
	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
			app = this.app;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: "/stock/sale-out-orders",
			saleoutList: new u.DataTable(model.options.metas.complex),
			saleoutCard: new u.DataTable(model.options.metas.complex),
			saleoutItems: new u.DataTable(model.options.metas.complexItem),
			ItemRefList: new u.DataTable(model.options.metas.ItemRef),

			// 拉单（销售订单）
			referDeliveryorderList: new u.DataTable(model.options.metas.order),
			referDeliveryorderitemList: new u.DataTable(
				model.options.metas.orderItems
			),
			//已选择（销售订单）
			selectedreferList: new u.DataTable(model.options.metas.order),
			selectedreferListItem: new u.DataTable(model.options.metas.orderItems),
			//功能区
			operateArea: new u.DataTable(model.options.metas.operateArea),

			searchcomp: {},
			searchcomp2: {},
			searchSource: model.options.searchs.search1,
			search2Source: model.options.searchs.search2,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button4Source: model.options.buttons.button4,

			card1Source: model.options.cards.card1,
			detail11Source: model.options.details.detail1,
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			grid4Option: model.options.grids.grid4,
			grid5Option: model.options.grids.grid5,
			grid6Option: model.options.grids.grid6,
			grid7Option: model.options.grids.grid7,

			dialogcardcomp1: {},
			dialogcard1Source: model.options.dialogs.dialog1,
			dialogcardcomp2: {},
			dialogcard2Source: model.options.dialogs.dialog2,

			billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//跳转详情页
			goDetailPanel: common.bill.goDetailPanel,
			// 行号池
			curRowNum: ko.observable(0),
			curDate: ko.observable(),
			formater: new u.NumberFormater(2),

			//记录列表当前的位置
			listIndex: null,
			pageAdd: ko.observableArray([]),
			pageModel: {
				totalPages: ko.observable(0),
				pageSize: ko.observable(0),
				pageIndex: ko.observable(0),
				totalRow: ko.observable(0),
				hasPage: ko.observable(0),
				setCurrentPage: ko.observable(0),
			},
		},
		rendertype: {
			detailRender: common.rendertype.detailRender,
			operation: function (obj) {
				var billStatusCode = obj.row.value.billStatusCode;
				var editfun, delfun;
				var dataTableRowId = obj.row.value["$_#_@_id"];
				// 未提交的订单才可以编辑和删除
				if (billStatusCode == billstatus.FREE) {
					editfun =
						"data-bind=click:showEditBillPanel.bind($data," +
						obj.rowIndex +
						"," +
						dataTableRowId +
						")";
					delfun =
						"data-bind=click:del.bind($data," +
						obj.rowIndex +
						"," +
						dataTableRowId +
						")";
				} else {
					delfun = 'class="disabled"';
					editfun = 'class="disabled"';
				}
				obj.element.innerHTML =
					'<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					"<a " +
					editfun +
					' title="编辑">编辑</a>' +
					"</span>    " +
					'<span class="ui-handle-word">' +
					"<a " +
					delfun +
					' title="删除">删除</a>' +
					"</span></div>";
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			canEdit: ko.pureComputed(function () {
				var billStatusCode = viewModel.saleoutList.ref("billStatusCode")();
				if (billStatusCode == billstatus.FREE) {
					return true;
				} else {
					return false;
				}
			}),
			billDateComputed: ko.pureComputed(function () {
				var truetime = viewModel.saleoutList.ref("billDate")();
				var showtime = u.date.format(truetime, "YYYY-MM-DD");
				return showtime;
			}),
			billDateFormat: function (value) {
				var showtime = u.date.format(value, "YYYY-MM-DD");
				return showtime;
			},
			interceptingStateFormat: function (value) {
				return viewModel.stateTrans(value);
			},
			interceptingStateComputed: ko.pureComputed(function () {
				var value = viewModel.saleoutList.ref("interceptingState")();
				return viewModel.stateTrans(value);
			}),
			interceptingStateRender: function (params) {
				params.element.innerHTML = viewModel.stateTrans(params.value);
			},
			stateTrans: function (state) {
				if (state == "1") {
					return "拦截成功";
				} else if (state == "0") {
					return "拦截失败";
				} else {
					return "";
				}
			}
		},
		events: {
			//删除和批量删除
			del: function (data, rowId) {
				if (typeof data == "number") {
					viewModel.saleoutList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.saleoutList.getSelectedRows();
				if (rows.length == 0) {
					toastr.warning("请至少选择一项");
					return;
				}
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].getValue("id"));
					}
				}
				common.dialog.confirmDialog({
					msg1: "确认删除这些项？",
					msg2: "此操作不可逆",
					width: "400px",
					type: "error",
					onOk: function () {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/delete",
							type: "post",
							// data: "ids=" + ids.join(","),
							data: {
								ids: ids.join(",")
							},
							success: function (data) {
								viewModel.saleoutList.removeRows(rows);
							}
						});
					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.saleoutList.pageIndex(0);
				}
				viewModel.saleoutList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ?
					viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.saleoutList.pageSize();
				var pageNumber = viewModel.saleoutList.pageIndex();
				var customer = JSON.parse(localStorage.getItem("_A_P_customer"));
				queryData.search_EQ_billType = "SaleOutTerminal";
				queryData.search_EQ_customerId = customer.id;

				// queryData.search_EQ_customerId = (customer && customer.id) ? customer.id : "";
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.saleoutList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.saleoutList.totalRow(data.totalElements);
						viewModel.saleoutList.totalPages(data.totalPages);
					}
				});
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.saleoutList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.saleoutList.pageSize(size);
				viewModel.search(true);
			},
			beforPageChangeFun: function (index) {
				var pagedataArr = viewModel.pageAdd();
				var flag = false;
				viewModel.curRowNum(0);
				var Row = viewModel.saleoutList.getCurrentRow();
				var status = Row.status;
				if (status != 'nrm' && status != 'new') {
					flag = true;
				}
				if (flag) {
					common.dialog.confirmDialog({
						msg1: '当前有修改，是否先保存后跳转？',
						msg2: '此操作不可逆',
						width: '400px',
						type: 'error',
						onOk: function () {
							viewModel.saveBill(index);
						},
						onCancel: function () {
							viewModel.pageModel.pageIndex(index);
							for (var i = 0; i < pagedataArr.length; i++) {
								if (i === index) {
									var nextRow = viewModel.saleoutList.createEmptyRowF();
									viewModel.index = index;
									viewModel.rowId = nextRow.rowId;
									viewModel.saleoutList.setRowFocus(nextRow);
									nextRow.setSimpleData(pagedataArr[i]);
									viewModel.saleoutItems.setSimpleData(pagedataArr[i].saleOutOrderItems, {
										status: "new"
									});
								}
							}
						}
					});
				} else {
					viewModel.pageModel.pageIndex(index);
					var curRow = viewModel.saleoutList.getCurrentRow();
					viewModel.saleoutList.removeRow(curRow);
					for (var j = 0; j < pagedataArr.length; j++) {
						if (j === index) {
							var nextRow = viewModel.saleoutList.createEmptyRowF();
							// viewModel.index = index;
							viewModel.rowId = nextRow.rowId;
							viewModel.saleoutList.setRowFocus(nextRow);
							nextRow.setSimpleData(pagedataArr[j]);
							viewModel.saleoutItems.setSimpleData(pagedataArr[j].saleOutOrderItems, {
								status: "new"
							});
							var itemrows = viewModel.saleoutItems.getAllRows();
							itemrows.forEach(function (item) {
								var rowNum = viewModel.generateRownum();
								item.setValue("rowNum", rowNum);
							})
						}
					}
				}
			},
			setDefaultValue: function (row) {
				row.setValue("billStatusCode", "01");
				row.setValue("billStatusName", "自由");
			},
			//进入修改单据页
			showEditBillPanel: function (index, rowId) {
				var row;
				if (index == -1) {
					//处理通过详情页编辑进入
					row = viewModel.saleoutList.getFocusRow();
					//通过改变index判断当前处于编辑态
					index = 0;
				} else {
					//行上的编辑按钮
					row = viewModel.saleoutList.getRowByRowId(rowId);
				}
				viewModel.index = index;
				viewModel.rowId = row.rowId;

				var id = row.getValue("id");
				//查询子表数据
				viewModel.findByParentid(id, function (data) {
					viewModel.saleoutList.setSimpleData(data);
					viewModel.saleoutItems.setSimpleData(data.saleOutOrderItems, {
						unSelect: true
					});
					// 获得当前最大行号
					viewModel.getCurRowNum();
					viewModel.goBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				});
			},
			detail: function () {
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.saleoutList.getCurrentRow();
					var id = curRow.getValue("id");
					viewModel.findByParentid(id, function (data) {
						curRow.setSimpleData(data);
						viewModel.saleoutItems.setSimpleData(data.saleOutOrderItems, {
							unSelect: true
						});
					});
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
					viewModel.goDetailPanel();
				}, 0);
			},
			detail2bill: function () {
				var row = viewModel.saleoutList.getCurrentRow();
				viewModel.showEditBillPanel(0, row.rowId);
			},
			//查询子表数据
			findByParentid: function (id, callback) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/findByParentid",
					type: "get",
					data: {
						id: id
					},
					success: function (data) {
						if (data) {
							if (typeof callback == "function") {
								callback(data);
							}
						} else {
							toastr.error();
						}
					}
				});
			},
			//新增子表项
			addItem: function () {
				viewModel.saleoutItems.createEmptyRow();
			},
			//删除子表项
			delItems: function () {
				var selectedRows = viewModel.saleoutItems.getSelectedRows();
				viewModel.saleoutItems.removeRows(selectedRows);
			},
			validateBill: function () {
				// 校验
				var validate = $(".ui-bill-panel")[0];
				var result = app.compsValidateMultiParam({
					element: validate,
					showMsg: true
				});
				if (result.passed) {
					var rows = viewModel.saleoutItems.getAllRealRows();
					if (rows && rows.length > 0) {} else {
						toastr.warning("至少添加一个商品");
						return false;
					}
					return true;
				} else {
					return false;
				}
			},
			//保存单据
			saveBill: function () {
				var result = viewModel.validateBill();
				if (result) {
					// 组装数据
					var currentRow, ajaxType;
					var index = viewModel.index;
					var saleoutorderData = viewModel.saleoutList.getSimpleData()[0];
					var saleoutItemsData = viewModel.saleoutItems.getSimpleData();
					saleoutorderData.saleOutOrderItems = saleoutItemsData;
					if (index >= 0) {
						ajaxType = "put";
					} else {
						ajaxType = "post";
					}
					// 提交
					$._ajax({
						url: appCtx + viewModel.baseurl,
						type: ajaxType,
						data: JSON.stringify(saleoutorderData),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							if (data) {
								viewModel.retListPanel();
								viewModel.search();
								toastr.success("保存成功");
							}
						}
					});
				}
			},
			//签字
			sign: function () {
				var selectedRows = viewModel.saleoutList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function (row) {
						return row.getValue("id");
					});
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/sign",
						data: {
							ids: ids.join(",")
						},
						success: function (data) {
							toastr.success();
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("billStatusCode", "02");
								selectedRows[i].setValue("billStatusName", "已签字");
								selectedRows[i].setValue("siger", data.name);
								selectedRows[i].setValue("signTime", data.time);
							}
						}
					});
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			//取消签字
			cancelsign: function () {
				var selectedRows = viewModel.saleoutList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function (row) {
						return row.getValue("id");
					});
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/cancelSign",
						data: {
							ids: ids.join(",")
						},
						success: function () {
							toastr.success();
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("billStatusCode", "01");
								selectedRows[i].setValue("billStatusName", "自由");
								selectedRows[i].setValue("siger", null);
								selectedRows[i].setValue("signTime", null);
							}
						}
					});
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			showLogistics: function () {
				var selectedRows = viewModel.saleoutList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					viewModel.dialogcardcomp1.show(
						"发运-录入物流单号",
						"500px",
						viewModel.saveLogistics
					);
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			saveLogistics: function () {
				var selectedRows = viewModel.saleoutList.getSelectedRows();
				var ids = selectedRows.map(function (row) {
					return row.getValue("id");
				});
				var postdata = viewModel.dialogcardcomp1.geteidtData();
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/fillLogisticsInfo",
					data: {
						ids: ids.join(","),
						company: postdata.logisticsId,
						code: postdata.logisticsBillCode
					},
					success: function () {
						toastr.success();
						viewModel.dialogcardcomp1.close();
					}
				});
			},
			showHoldResult: function () {
				var selectedRows = viewModel.saleoutList.getSelectedRows();
				if (selectedRows.length == 1) {
					viewModel.dialogcardcomp2.show(
						"拦截结果",
						"500px",
						viewModel.saveHoldResult
					);
				} else {
					if (selectedRows.length == 0) {
						toastr.warning("请先选择一项");
					} else {
						toastr.warning("只能选择一项");
					}
				}
			},
			saveHoldResult: function () {
				var selectedRows = viewModel.saleoutList.getSelectedRows();
				var id = selectedRows[0].getValue("id");
				var postdata = viewModel.dialogcardcomp2.geteidtData();
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/intercept",
					data: {
						id: id,
						state: postdata.interceptingState,
						reason: postdata.interceptingReason
					},
					success: function () {
						toastr.success();
						viewModel.dialogcardcomp2.close();
					}
				});
			},

			//参照选择批量新增子表（销售产品）
			showAddItemsRef: function () {
				viewModel.clearItemsRef();
				$("#addItemsRef .refer").trigger("click");
			},
			//清空已选销售产品参照
			clearItemsRef: function () {
				viewModel.ItemRefList.setValue("goodsref", "");
				var refer = $("#refContainergoodsref").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			// 返回列表页
			retListPanel: function () {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
				common.bill.retListPanel();
			},
			cancelBill: function () {
				viewModel.search();
				viewModel.retListPanel();
				viewModel.removeAllreferRows();
			},
			// 从行号池中拿到最新的行号
			generateRownum: function () {
				var latestnum = viewModel.curRowNum(),
					newnum = latestnum + 10;
				viewModel.curRowNum(newnum);
				return newnum;
			},
			getCurRowNum: function () {
				var data = viewModel.saleoutItems.getSimpleData();
				var maxRowNum = 0;
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].rowNum > maxRowNum) {
							maxRowNum = data[i].rowNum;
						}
					}
				}
				viewModel.curRowNum(maxRowNum);
			},
			getCurDate: function (row) {
				// 服务器时间获取
				$._ajax({
					type: "post",
					url: appCtx + "/stock/common/get-current-date",
					success: function (data) {
						var truetime = u.date.format(data, 'YYYY/MM/DD');
						truetime = new Date(truetime).getTime();
						if (row) {
							row.setValue("billDate", truetime);
						}
						viewModel.curDate(truetime);
					}
				});
			},
			// 选择发货单
			referSelectHandle: function (obj) {
				viewModel.referDeliveryorderitemList.removeAllRows();
				viewModel.selectedreferListItem.removeAllRows();
				var listArr = [];
				var selectedRows = viewModel.referDeliveryorderList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					for (var i = 0; i < selectedRows.length; i++) {
						var listData = selectedRows[i].getSimpleData();
						listArr.push(listData);
						viewModel.referDeliveryorderitemList.addSimpleData(listData.orderItems);
						viewModel.referDeliveryorderitemList.setAllRowsSelect();
						var subIds = listData.orderItems.map(function (item) {
							return item.id;
						})
						selectedRows[i].setValue("selectitemIds", subIds);
					}
				}
				viewModel.selectedreferList.removeAllRows();
				viewModel.selectedreferList.addSimpleData(listArr);
				viewModel.selectedreferList.setAllRowsSelect();
			},
			referUnSelectHandle: function (obj) {
				var id = obj.rowObj.value.id;
				var itemId = obj.rowObj.value.orderItems.getValue("id");
				var rows = viewModel.selectedreferList.getAllRows();
				var itemrows = viewModel.referDeliveryorderitemList.getAllRows();
				for (var j = rows.length - 1; j >= 0; j--) {
					if (rows[j].getValue("id") === id) {
						viewModel.selectedreferList.removeRows([j], {
							forceDel: true
						});
					}
				}
				for (var i = itemrows.length - 1; i >= 0; i--) {
					if (itemrows[i].getValue("orderId") === id) {
						viewModel.referDeliveryorderitemList.removeRows([i], {
							forceDel: true
						});
					}
				}
			},
			updateSelectedIndices: function () {
				var selectedRows = viewModel.selectedreferList.getAllRows(),
					selectedIds,
					selectedIndices = [],
					rows;
				if (selectedRows && selectedRows.length > 0) {
					selectedIds = selectedRows.map(function (row) {
						return row.getValue("id");
					});
					rows = viewModel.referDeliveryorderList.getAllRows();
					if (rows && rows.length > 0) {
						for (var i = 0; i < rows.length; i++) {
							var id = rows[i].getValue("id");
							if ($.inArray(id, selectedIds) > -1) {
								selectedIndices.push(i);
							}
						}
					}
					if (selectedIndices.length > 0) {
						viewModel.referDeliveryorderList.setRowsSelect(selectedIndices);
					}
				} else {
					return;
				}
			},

			//选择商品信息
			referSelectItemHandle: function (obj) {
				var id = obj.rowObj.value.id;
				var selectedRows = viewModel.referDeliveryorderitemList.getSelectedRows();
				for (var i = 0; i < selectedRows.length; i++) {
					var itemInfo = selectedRows[i].getSimpleData()
					if (selectedRows[i].getValue("id") === id) {
						viewModel.selectedreferListItem.addSimpleData(itemInfo);
					}
				}
			},
			//反选商品信息
			referUnSelectItemHandle: function (obj) {
				function removeByValue(arr, val) {
					for (var i = 0; i < arr.length; i++) {
						if (arr[i] == val) {
							arr.splice(i, 1);
							break;
						}
					}
				}
				var itemId = obj.rowObj.value.id;
				var parentRowId = obj.rowObj.value.orderId;
				var parentRow = viewModel.referDeliveryorderList.getRowByField("id", parentRowId);
				var selectitemArr = parentRow.getValue("selectitemIds")
				if (selectitemArr.length > 0) {
					for (var i = 0; i < selectitemArr.length; i++) {
						if ($.inArray(itemId, selectitemArr) > -1) {
							removeByValue(selectitemArr, itemId)
							parentRow.setValue("selectitemIds", selectitemArr);
							if (selectitemArr.length == 0) {
								var curRowId = parentRow.rowId;
								var index = viewModel.referDeliveryorderList.getIndexByRowId(curRowId);
								viewModel.referDeliveryorderList.setRowsUnSelect(index);
							}
						}
					}
				}

				var itemrows = viewModel.selectedreferListItem.getAllRows();
				for (var i = itemrows.length - 1; i >= 0; i--) {
					if (itemrows[i].getValue("id") === itemId) {
						viewModel.selectedreferListItem.removeRows([i], {
							forceDel: true
						});
					}
				}
			},
			//新增 参照
			showAddRefer: function () {
				viewModel.searchcomp2.clearSearch();
				viewModel.removeAllreferRows();
				if (!viewModel.referdeliveryorderdialog) {
					viewModel.referdeliveryorderdialog = u.dialog({
						id: "dialog_referdeliveryorder",
						content: "#dialog_referdeliveryorder",
						hasCloseMenu: true,
						width: "85%"
					});
					var okButton = $("#dialog_referdeliveryorder .J-ok");
					okButton.off().on("click", function () {
						viewModel.confirmReferDeliveryorder();
					});
					var cancelButton = $("#dialog_referdeliveryorder .J-cancel");
					cancelButton.off().on("click", function () {
						viewModel.referdeliveryorderdialog.close();
					});
				} else {
					viewModel.referdeliveryorderdialog.show();
				}
			},
			queryChildArr: function (parentArr) {
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/translate-sale-out-terminal",
					async: false,
					data: JSON.stringify(parentArr),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						var curRow = viewModel.saleoutList.createEmptyRowF();
						viewModel.saleoutList.setRowFocus(curRow);
						viewModel.saleoutList.setSimpleData(data[0]);
						viewModel.saleoutItems.setSimpleData(data[0].saleOutOrderItems, {
							status: "new"
						});
						var itemrows = viewModel.saleoutItems.getAllRows();
						for (var i = 0; i < itemrows.length; i++) {
							var rowNum = viewModel.generateRownum();
							itemrows[i].setValue("rowNum", rowNum);
							itemrows[i].setValue("persistStatus", "new");
						}
						// viewModel.purchaseinList.totalRow(data.totalElements);
						// viewModel.purchaseinList.totalPages(data.totalPages);
						viewModel.pageAdd(data);
						viewModel.pageModel.totalPages(data.length);
					}
				})

			},
			//确定 新增
			confirmReferDeliveryorder: function () {
				var parentArr = viewModel.referDeliveryorderList.getSimpleData({
					type: "select"
				});
				var itemArr = viewModel.referDeliveryorderitemList.getSimpleData({
					type: "select"
				});
				var operate = viewModel.operateArea.getSimpleData()[0];
				if (!itemArr.length) {
					toastr.warning("请至少选择一条商品");
					return;
				}
				for (var i = 0; i < parentArr.length; i++) {
					parentArr[i].orderItems = [];
					for (var j = 0; j < itemArr.length; j++) {
						if (itemArr[j].orderId === parentArr[i].id) {
							parentArr[i].orderItems.push(itemArr[j]);
						}
					}
				}
				//是否选择一键入库
				if (operate.oneStepSaleout === 1) {
					var stockId = operate.StorageId;
					if (stockId) {
						viewModel.oneStepSaleout(stockId, parentArr)
					} else {
						toastr.warning("一键入库时，请选择仓库");
						return;
					}
				} else {
					viewModel.queryChildArr(parentArr);
					viewModel.index = -1;
					viewModel.goBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
					viewModel.referdeliveryorderdialog.close();
					viewModel.removeAllreferRows();
				}
			},
			// 一键出库
			oneStepSaleout: function (stockId, parentArr) {
				$._ajax({
					type: "post",
					data: JSON.stringify(parentArr),
					url: appCtx + viewModel.baseurl + "/translate-sale-out-terminal/" + stockId,
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.retListPanel();
						viewModel.search();
						viewModel.referdeliveryorderdialog.close();
					}
				})
			},
			removeAllreferRows: function () {
				viewModel.referDeliveryorderList.totalRow(0);
				viewModel.referDeliveryorderList.totalPages(0);
				viewModel.referDeliveryorderList.removeAllRows();
				viewModel.referDeliveryorderitemList.removeAllRows();
				viewModel.selectedreferList.removeAllRows();
				viewModel.selectedreferListItem.removeAllRows();
			},
			searchRefer: function (reindex) {
				if (reindex) {
					viewModel.referDeliveryorderList.pageIndex(0);
				}
				viewModel.referDeliveryorderList.removeAllRows();
				var queryData = viewModel.searchcomp2.getDataWithOpr();
				var pageSize = viewModel.referDeliveryorderList.pageSize();
				var pageNumber = viewModel.referDeliveryorderList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				queryData.search_IN_saleModel = '01,03';
				queryData.search_IN_orderStatus = '04';
				queryData.search_EQ_isClose = '0';
				var customerInfo = JSON.parse(localStorage.getItem("_A_P_customer"));
				queryData.search_EQ_supplier = customerInfo.id;
				$._ajax({
					type: "get",
					url: window.pathMap.b2b + "/b2b/order/get-all-orders",
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.referDeliveryorderList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.referDeliveryorderList.totalRow(data.totalElements);
						viewModel.referDeliveryorderList.totalPages(data.totalPages);
						viewModel.updateSelectedIndices();
					}
				});
			},
			//清空参照搜索条件
			cleanSearchRefer: function () {
				viewModel.searchcomp2.clearSearch();
			},
			//页码改变时的回调函数
			pageChangeRefer: function (index) {
				viewModel.referDeliveryorderList.pageIndex(index);
				viewModel.searchRefer();
			},
			//页码改变时的回调函数
			sizeChangeRefer: function (size) {
				viewModel.referDeliveryorderList.pageSize(size);
				viewModel.searchRefer(true);
			},
			getSum: function (array) {
				var sum = 0;
				for (var i = 0; i < array.length; i++) {
					sum += parseInt(array[i]);
				}
				return sum;
			},
		},
		afterCreate: function () {
			// 子表参照聚焦行，用于绑定子表参照组件
			var refRow = viewModel.ItemRefList.createEmptyRow();
			viewModel.ItemRefList.setRowFocus(refRow);
			// 确定商品参照，为产品组合子表增行
			viewModel.ItemRefList.on("goodsref.valuechange", function (obj) {
				// 清空参照时不增行
				if (!obj.newValue) {
					return;
				}
				var refer = $("#refContainergoodsref").data("uui.refer");
				var refValues = refer.values;
				if (refValues && refValues.length > 0) {
					for (var i = 0; i < refValues.length; i++) {
						var id = refValues[i].refpk;
						var row = viewModel.saleoutItems.getRowByField("goodsId", id);
						if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
							var newrow = viewModel.saleoutItems.createEmptyRow();
							newrow.setValue("rowNum", viewModel.generateRownum());
							newrow.setValue("goodsId", refValues[i].refpk);
							newrow.setValue("goodsCode", refValues[i].refcode);
							newrow.setValue("goodsName", refValues[i].refname);
						}
					}
				}
			});

			// 参照内 一键入库 选择后显示仓库参照
			viewModel.operateArea.createEmptyRow();
			viewModel.operateArea.on("oneStepSaleout.valuechange", function (obj) {
				var isChecked = viewModel.operateArea.getValue("oneStepSaleout");
				if (isChecked === 1) {
					$("#warehouse").show();
				} else {
					$("#warehouse").hide();
				}
			});
			//实入数量
			viewModel.saleoutItems.on("factOutNum.valuechange", function (obj) {
				var currRow = viewModel.saleoutItems.getRowByRowId(
					obj.rowId
				);
				var factOutNum = parseFloat(obj.newValue || "0");
				var shouldOutNum = parseFloat(currRow.getValue("shouldOutNum") || "0");
				if (factOutNum > shouldOutNum) {
					toastr.warning("实出数量不能大于应出数量");
					currRow.setValue("factOutNum", obj.oldValue);
					return;
				}
				var unitPrice = parseFloat(currRow.getValue("unitPrice") || "0");
				var amountMoney = factOutNum * unitPrice;

				currRow.setValue("amountMoney", amountMoney);
				var arr = viewModel.saleoutItems.getSimpleData();
				var totalFactOutNum = [],
					totalShouldOutNum = [];
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i].factOutNum) {
						arr[i].factOutNum = 0
					}
					if (!arr[i].shouldOutNum) {
						arr[i].shouldOutNum = 0
					}
					totalFactOutNum.push(parseFloat(arr[i].factOutNum));
					totalShouldOutNum.push(parseFloat(arr[i].shouldOutNum));
				}
				viewModel.saleoutList.getCurrentRow().setValue("totalFactOutNum", viewModel.getSum(totalFactOutNum));
				viewModel.saleoutList.getCurrentRow().setValue("totalShouldOutNum", viewModel.getSum(totalShouldOutNum));
			});
		}
	});

	return view;
});