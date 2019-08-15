define(["text!./returninorder.html", "ocm_common", "ocm_baseview", "./meta.js"],
	function (tpl, common, baseview, model) {
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
				var customerInfo = JSON.parse(localStorage.getItem("_A_P_customer"));
				//客户级别 直接客户 "01" 间接客户 "02"
				var customerRank = customerInfo.customerRankCode;
				if (customerRank === "01") {
					viewModel.customerRank("direct")
				} else {
					viewModel.customerRank("Indirect");
				}
			},
			tpl: tpl,
			model: model,
			baseData: {
				baseurl: "/stock/sale-out-orders",
				returninList: new u.DataTable(model.options.metas.complex),
				returninCard: new u.DataTable(model.options.metas.complex),
				returninItems: new u.DataTable(model.options.metas.complexItem),
				ItemRefList: new u.DataTable(model.options.metas.ItemRef),

				// 拉单（发货单）
				referReturnorderList: new u.DataTable(model.options.metas.return),
				referReturnorderitemList: new u.DataTable(model.options.metas.returnItems),
				//已选择（发货单）
				selectedreferList: new u.DataTable(model.options.metas.return),
				selectedreferListItem: new u.DataTable(model.options.metas.returnItems),

				searchcomp: {},
				searchcomp2: {},
				searchSource: model.options.searchs.search1,
				search2Source: model.options.searchs.search2,
				button1Source: model.options.buttons.button1,
				button2Source: model.options.buttons.button2,
				button3Source: model.options.buttons.button3,
				button4Source: model.options.buttons.button4,

				//b2b编辑页
				card1Source: model.options.cards.card1,
				//b2c编辑页
				card2Source: model.options.cards.card2,
				//b2b详情页
				detail1Source: model.options.details.detail1,
				//b2c详情页
				detail2Source: model.options.details.detail2,
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
				// 是否电商
				isEc: ko.observable(),

				// 客户级别
				customerRank: ko.observable(),

				//跳转单据页
				goBillPanel: common.bill.goBillPanel,
				//跳转详情页
				goDetailPanel: common.bill.goDetailPanel,
				// 行号池
				curRowNum: ko.observable(0),
				curDate: ko.observable(),
				formater: new u.NumberFormater(2),
				pageData: [],
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
				whetherRender: common.rendertype.whetherRender,
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
					var billStatusCode = viewModel.returninList.ref("billStatusCode")();
					if (billStatusCode == billstatus.FREE) {
						return true;
					} else {
						return false;
					}
				}),
				billDateComputed: ko.pureComputed(function () {
					var truetime = viewModel.returninList.ref("billDate")();
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
					var value = viewModel.returninList.ref("interceptingState")();
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
				},
				beforeEditCheck: function (obj) {
					var gridObj = obj.gridObj;
					// 判断当前货位是否可编辑
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionId"))) {
						// 先判断有没有仓库
						if (viewModel.returninCard.getValue("storehouseId")) {
							// 判断是否启用货位管理
							if (viewModel.returninCard.getValue("ifSlotManage") != '1') {
								toastr.warning("该仓库未开启货位管理");
								return false;
							}
						} else {
							toastr.warning("请先选择仓库");
							return false
						}
					}
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchNumId"))) {
						var row = obj.rowObj.value;
						if (row.enableBatchNumberManage == null || row.enableBatchNumberManage == "") {
							viewModel.getGoodsInfo(row);
						}
						if (row.enableBatchNumberManage == '1') {
							viewModel.returninItems.setMeta("batchNumId", "refparam",
								'{"EQ_goods":"' + row.goodsId + '","EQ_product":"' + row.productId + '","EQ_productLine":"' + row.productLineId + '","EQ_isEnable":"1"}');

						} else {
							toastr.warning("该商品未开启批次控制");
							return false
						}
					}

					return true
				}
			},
			events: {
				//删除和批量删除
				del: function (data, rowId) {
					if (typeof data == "number") {
						viewModel.returninList.setRowSelectbyRowId(rowId);
					}
					var ids = [];
					var rows = viewModel.returninList.getSelectedRows();
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
									viewModel.returninList.removeRows(rows);
								}
							});
						}
					});
				},
				//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
				search: function (reindex) {
					if (reindex) {
						viewModel.returninList.pageIndex(0);
					}
					viewModel.returninList.removeAllRows();
					var queryData = viewModel.searchcomp.getDataWithOpr ?
						viewModel.searchcomp.getDataWithOpr() : {};
					var pageSize = viewModel.returninList.pageSize();
					var pageNumber = viewModel.returninList.pageIndex();
					var customerInfo = JSON.parse(localStorage.getItem("_A_P_customer"));
					queryData.search_EQ_customerId = customerInfo.id
					queryData.search_EQ_billType = "ReturnInTerminal";
					queryData.page = pageNumber;
					queryData.size = pageSize;
					$._ajax({
						type: "get",
						url: appCtx + viewModel.baseurl,
						dataType: "json",
						data: queryData,
						success: function (data) {
							viewModel.returninList.setSimpleData(data.content, {
								unSelect: true
							});
							viewModel.returninList.totalRow(data.totalElements);
							viewModel.returninList.totalPages(data.totalPages);
						}
					});
				},
				//清空搜索条件
				cleanSearch: function () {
					viewModel.searchcomp.clearSearch();
				},
				//页码改变时的回调函数
				pageChange: function (index) {
					viewModel.returninList.pageIndex(index);
					viewModel.search();
				},
				//页码改变时的回调函数
				sizeChange: function (size) {
					viewModel.returninList.pageSize(size);
					viewModel.search(true);
				},
				//进入新增单据页
				showAddBillPanel: function () {
					viewModel.index = -1;
					viewModel.returninCard.removeAllRows();
					var curRow = viewModel.returninCard.createEmptyRow();
					viewModel.returninItems.removeAllRows();
					// 行号设置为0
					viewModel.curRowNum(0);
					viewModel.getCurDate(curRow);
					viewModel.setDefaultValue(curRow);
					viewModel.goBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
				},
				setDefaultValue: function (row) {
					// row.setValue("billStatusCode", "01");
					// row.setValue("billStatusName", "自由");
					// row.setValue("billType", "SaleOut");
					// row.setValue("billTranTypeId", "SaleOut");
					// row.setValue("billTranTypeName", "销售出库");
				},
				isEcRender: function (row) {
					var isEc = row.getValue("isEc");
					if (isEc === "02") {
						viewModel.isEc("b2b");
					} else if (isEc === "01") {
						viewModel.isEc("b2c");
					}
				},
				//进入修改单据页
				showEditBillPanel: function (index, rowId) {
					var row;
					if (index == -1) {
						//处理通过详情页编辑进入
						row = viewModel.returninList.getFocusRow();
						//通过改变index判断当前处于编辑态
						viewModel.isEcRender(row);
						index = 0;
					} else {
						//行上的编辑按钮
						row = viewModel.returninList.getRowByRowId(rowId);
						viewModel.isEcRender(row);
					}
					viewModel.index = index;
					viewModel.rowId = row.rowId;

					var id = row.getValue("id");
					//查询子表数据
					viewModel.findByParentid(id, function (data) {
						viewModel.returninCard.setSimpleData(data);
						viewModel.returninItems.setSimpleData(data.saleOutOrderItems, {
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
						var curRow = viewModel.returninList.getCurrentRow();
						var id = curRow.getValue("id");
						viewModel.findByParentid(id, function (data) {
							curRow.setSimpleData(data);
							viewModel.returninItems.setSimpleData(data.saleOutOrderItems, {
								unSelect: true
							});
						});
						viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
						// debugger;
						viewModel.isEcRender(curRow)
						viewModel.goDetailPanel();
					}, 0);
				},
				detail2bill: function () {
					var row = viewModel.returninList.getCurrentRow();
					viewModel.showEditBillPanel(-1, row.rowId);
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
					viewModel.returninItems.createEmptyRow();
				},
				//删除子表项
				delItems: function () {
					var selectedRows = viewModel.returninItems.getSelectedRows();
					viewModel.returninItems.removeRows(selectedRows);
				},
				validateBill: function () {
					// 校验
					var validate = $(".ui-bill-panel")[0];
					var result = app.compsValidateMultiParam({
						element: validate,
						showMsg: true
					});
					if (result.passed) {
						var rows = viewModel.returninItems.getAllRealRows();
						if (rows && rows.length > 0) {} else {
							toastr.warning("至少添加一个商品");
							return false;
						}
						return true;
					} else {
						return false;
					}
				},
				//判断商品行仓库和批次号
				checkEmpty: function () {
					var allItemRows = viewModel.returninItems.getAllRealRows();
					var ifSlotManage = viewModel.returninCard.getValue("ifSlotManage");
					var emptyBatchRows = "",
						emptyPositionRows = "",
						batchNumPassed, goodsPositionPassed;
					if (allItemRows.length > 0) {
						allItemRows.forEach(function (item) {
							if (parseFloat(item.getValue("enableBatchNumberManage")) === 1 && !(item.getValue("batchNumId"))) {
								var rowNum = item.getValue("rowNum");
								emptyBatchRows += rowNum + ",";
								batchNumPassed = false
							} else {
								batchNumPassed = true;
							}
							if (!item.getValue("goodsPositionId") && ifSlotManage === "1") {
								var row2Num = item.getValue("rowNum");
								emptyPositionRows += row2Num + ",";
								goodsPositionPassed = false
							} else {
								goodsPositionPassed = true;
							}
						});
						emptyBatchRows = emptyBatchRows.slice(0, emptyBatchRows.length - 1);
						emptyPositionRows = emptyPositionRows.slice(0, emptyPositionRows.length - 1);
						if (!batchNumPassed || !goodsPositionPassed) {
							if (emptyBatchRows) toastr.warning("行号" + emptyBatchRows + "的商品启用了批次号，请填写批次号");
							if (emptyPositionRows) toastr.warning("请为行号" + emptyPositionRows + "的商品选择货位");
							return false;
						} else {
							return true;
						}
					}
				},
				//保存单据
				saveBill: function () {
					var result = viewModel.validateBill();
					if (result) {
						//判断批次号及货位------ start
						if (viewModel.billPanelStatus() === "add") {
							if (!viewModel.checkEmpty()) {
								return;
							};
						}
						// 组装数据
						var currentRow, ajaxType;
						var index = viewModel.index;
						var returninorderData = viewModel.returninCard.getSimpleData()[0];
						var returninItemsData = viewModel.returninItems.getSimpleData();
						returninorderData.saleOutOrderItems = returninItemsData;
						if (index >= 0) {
							ajaxType = "put";
						} else {
							ajaxType = "post";
							// 新增时将所有的行状态置为new
							returninorderData.persistStatus = 'new';
							returninItemsData.forEach(function (item) {
								item.persistStatus = 'new';
							})
							returninorderData.billType = "ReturnInTerminal";
							returninorderData.billTranTypeId = "ReturnInTerminal";
						};

						// 提交
						$._ajax({
							url: appCtx + viewModel.baseurl,
							type: ajaxType,
							data: JSON.stringify(returninorderData),
							contentType: "application/json; charset=utf-8",
							success: function (data) {
								// 回写界面
								if (index >= 0) {
									//获取需要修改的行
									currentRow = viewModel.returninList.getRowByRowId(
										viewModel.rowId
									);
									currentRow.setSimpleData(data);
									viewModel.retListPanel();
									toastr.success("保存成功");
								} else {
									//添加数据
									currentRow = viewModel.returninList.createEmptyRowF();
									currentRow.setSimpleData(data);
									toastr.success("保存成功");

									var pageIndex = viewModel.pageModel.pageIndex();
									// 从待保存数据中删除掉当前数据
									viewModel.pageData.splice(pageIndex, 1);
									if (viewModel.pageData.length == 0) {
										// 若没有待保存数据，则返回列表页
										viewModel.retListPanel();
									} else {
										// 若仍有待保存数据，切换到新数据，并修改总页数
										viewModel.pageModel.totalPages(viewModel.pageData.length);
										viewModel.pageChange4Add(pageIndex);
									}
								}
							}
						});
					}
				},
				//签字
				sign: function () {
					var selectedRows = viewModel.returninList.getSelectedRows();
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
					var selectedRows = viewModel.returninList.getSelectedRows();
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
					var selectedRows = viewModel.returninList.getSelectedRows();
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
					var selectedRows = viewModel.returninList.getSelectedRows();
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
					var selectedRows = viewModel.returninList.getSelectedRows();
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
					var selectedRows = viewModel.returninList.getSelectedRows();
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
				// 从行号池中拿到最新的行号
				generateRownum: function () {
					var latestnum = viewModel.curRowNum(),
						newnum = latestnum + 10;
					viewModel.curRowNum(newnum);
					return newnum;
				},
				getCurRowNum: function () {
					var data = viewModel.returninItems.getSimpleData();
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
						async: false,
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
				// 选择退货单
				referSelectHandle: function (obj) {
					// var selectedRows = viewModel.selectedreferList.getAllRows();
					// var curRow = viewModel.referReturnorderList.getRow(obj.rowIndex);
					// if (selectedRows && selectedRows.length > 0) {
					//   var selectedIds = selectedRows.map(function (row) {
					//     return row.getValue("id");
					//   });
					//   var id = curRow.getValue("id");
					//   if ($.inArray(id, selectedIds) > -1) {
					//     return true;
					//   }
					// }
					// var data = curRow.getSimpleData();
					// viewModel.selectedreferList.addSimpleData(data, null, {
					//   unSelect: true
					// });
					// viewModel.referReturnorderitemList.addSimpleData(
					//   data.orderItems,
					//   null, {
					//     unSelect: true
					//   }
					// );
					// viewModel.selectedreferListItem.addSimpleData(
					//   data.orderItems,
					//   null, {
					//     unSelect: true
					//   }
					// );

					viewModel.referReturnorderitemList.removeAllRows();
					viewModel.selectedreferListItem.removeAllRows();
					var listArr = [];
					var selectedRows = viewModel.referReturnorderList.getSelectedRows();
					if (selectedRows && selectedRows.length > 0) {
						for (var i = 0; i < selectedRows.length; i++) {
							var listData = selectedRows[i].getSimpleData();
							listArr.push(listData);
							viewModel.referReturnorderitemList.addSimpleData(listData.orderItems);
							viewModel.referReturnorderitemList.setAllRowsSelect();
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
					// viewModel.referUnSelectItemHandle(obj);
					var id = obj.rowObj.value.id;
					var itemId = obj.rowObj.value.orderItems.getValue("id");
					var rows = viewModel.selectedreferList.getAllRows();
					var itemrows = viewModel.referReturnorderitemList.getAllRows();
					for (var j = rows.length - 1; j >= 0; j--) {
						if (rows[j].getValue("id") === id) {
							viewModel.selectedreferList.removeRows([j], {
								forceDel: true
							});
						}
					}
					for (var i = itemrows.length - 1; i >= 0; i--) {
						if (itemrows[i].getValue("orderId") === id) {
							viewModel.referReturnorderitemList.removeRows([i], {
								forceDel: true
							});
						}
					}
				},
				//选择采购订单商品信息
				referSelectItemHandle: function (obj) {
					var id = obj.rowObj.value.id;
					var selectedRows = viewModel.referReturnorderitemList.getSelectedRows();
					for (var i = 0; i < selectedRows.length; i++) {
						var itemInfo = selectedRows[i].getSimpleData()
						if (selectedRows[i].getValue("id") === id) {
							viewModel.selectedreferListItem.addSimpleData(itemInfo);
						}
					}
				},
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
					var parentRow = viewModel.referReturnorderList.getRowByField("id", parentRowId);
					var selectitemArr = parentRow.getValue("selectitemIds")
					if (selectitemArr.length > 0) {
						for (var i = 0; i < selectitemArr.length; i++) {
							if ($.inArray(itemId, selectitemArr) > -1) {
								removeByValue(selectitemArr, itemId)
								parentRow.setValue("selectitemIds", selectitemArr);
								if (selectitemArr.length == 0) {
									var curRowId = parentRow.rowId;
									var index = viewModel.referReturnorderList.getIndexByRowId(curRowId);
									viewModel.referReturnorderList.setRowsUnSelect(index);
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

				updateSelectedIndices: function () {
					var selectedRows = viewModel.selectedreferList.getAllRows(),
						selectedIds,
						selectedIndices = [],
						rows;
					if (selectedRows && selectedRows.length > 0) {
						selectedIds = selectedRows.map(function (row) {
							return row.getValue("id");
						});
						rows = viewModel.referReturnorderList.getAllRows();
						if (rows && rows.length > 0) {
							for (var i = 0; i < rows.length; i++) {
								var id = rows[i].getValue("id");
								if ($.inArray(id, selectedIds) > -1) {
									selectedIndices.push(i);
								}
							}
						}
						if (selectedIndices.length > 0) {
							viewModel.referReturnorderList.setRowsSelect(selectedIndices);
						}
					} else {
						return;
					}
				},
				//新增 参照
				showAddRefer: function () {
					var ref_grid = viewModel.app.getComp("grid_referList").grid;
					var ref_grid_sel = viewModel.app.getComp("grid_referList_Sel").grid;

					var saleOrgNameCol = ref_grid.getColumnByField("saleOrgName");
					var customerNameCol = ref_grid.getColumnByField("customerName");
					var saleOrgNameCol_sel = ref_grid_sel.getColumnByField("saleOrgName");
					var customerNameCol_sel = ref_grid_sel.getColumnByField("customerName");

					if (viewModel.customerRank() === "direct") {
						$("#orgId").parent().show();
						$("#customerId").parent().hide();
						saleOrgNameCol.options.visible = true;
						customerNameCol.options.visible = false;
						saleOrgNameCol_sel.options.visible = true;
						customerNameCol_sel.options.visible = false;
					} else {
						$("#orgId").parent().hide();
						$("#customerId").parent().show();
						saleOrgNameCol.options.visible = false;
						customerNameCol.options.visible = true;
						saleOrgNameCol_sel.options.visible = false
						customerNameCol_sel.options.visible = true;
					}

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
				//确定 新增
				confirmReferDeliveryorder: function () {
					var parentArr = viewModel.referReturnorderList.getSimpleData({
						type: "select"
					});
					var itemArr = viewModel.referReturnorderitemList.getSimpleData();
					if (parentArr.length !== 1) {
						toastr.warning("请选择一条退货单进行操作");
						return;
					}
					if (!itemArr.length) {
						toastr.warning("请至少选择一条商品");
						return;
					}

					viewModel.queryChildArr(parentArr[0]);
					// var refer = $("#refContainerbillTranType").data("uui.refer");
					// $("#billTranType input").val("人民币");
					viewModel.isEc("b2b");
					viewModel.goBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
					viewModel.referdeliveryorderdialog.close();
					viewModel.removeAllreferRows();
				},
				queryChildArr: function (parentArr) {
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/translate-returned-in",
						// async: false,
						data: JSON.stringify(parentArr),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							viewModel.setDataToPanel(data);
							viewModel.pageData = data;
							viewModel.pageModel.totalPages(data.length);
						}
					})

				},
				setDataToPanel: function (data) {
					var data = data[0];
					viewModel.index = -1;
					viewModel.returninCard.removeAllRows();
					var curRow = viewModel.returninCard.createEmptyRow();
					viewModel.returninItems.removeAllRows();
					// 行号设置为0
					viewModel.curRowNum(0);
					curRow.setSimpleData(data);
					viewModel.getCurDate(curRow);
					viewModel.setDefaultValue(curRow);
					curRow.status = "nrm";
					if (data.saleOutOrderItems && data.saleOutOrderItems.length > 0) {
						data.saleOutOrderItems.forEach(function (item) {
							item.rowNum = viewModel.generateRownum();
						})
						viewModel.returninItems.setSimpleData(data.saleOutOrderItems);
						var allRows = viewModel.returninItems.getAllRealRows();
						var factOutNum = allRows[0].getValue("factOutNum");
						allRows[0].setValue("factOutNum", "0.1");
						allRows[0].setValue("factOutNum", factOutNum);

					}
				},
				removeAllreferRows: function () {
					viewModel.referReturnorderList.totalRow(0);
					viewModel.referReturnorderList.totalPages(0);
					viewModel.referReturnorderList.removeAllRows();
					viewModel.referReturnorderitemList.removeAllRows();
					viewModel.selectedreferList.removeAllRows();
					viewModel.selectedreferListItem.removeAllRows();
				},
				searchRefer: function (reindex) {
					if (reindex) {
						viewModel.referReturnorderList.pageIndex(0);
					}
					viewModel.referReturnorderList.removeAllRows();
					var queryData = viewModel.searchcomp2.getDataWithOpr();
					var pageSize = viewModel.referReturnorderList.pageSize();
					var pageNumber = viewModel.referReturnorderList.pageIndex();
					queryData.page = pageNumber;
					queryData.size = pageSize;
					var customerInfo = JSON.parse(localStorage.getItem("_A_P_customer"));
					queryData.search_EQ_supplier = customerInfo.id;
					queryData.search_IN_saleModel = "02,04";
					queryData.search_IN_orderStatus = "04";
					queryData.search_EQ_isClose = "0";
					$._ajax({
						type: "get",
						url: window.pathMap.b2b + "/b2b/order/page-return-unclose",
						dataType: "json",
						data: queryData,
						success: function (data) {
							viewModel.referReturnorderList.setSimpleData(data.content, {
								unSelect: true
							});
							viewModel.referReturnorderList.totalRow(data.totalElements);
							viewModel.referReturnorderList.totalPages(data.totalPages);
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
					viewModel.referReturnorderList.pageIndex(index);
					viewModel.searchRefer();
				},
				//页码改变时的回调函数
				sizeChangeRefer: function (size) {
					viewModel.referReturnorderList.pageSize(size);
					viewModel.searchRefer(true);
				},
				checkIsChange: function () {
					var row = viewModel.returninCard.getRow(0);
					if (row.status == 'upd') {
						return true
					}
					var rows = viewModel.returninItems.getAllRows();
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].status == 'upd') {
							return true
						}
					}
					return false;
				},
				beforPageChangeFun: function (index) {
					if (viewModel.checkIsChange()) {
						common.dialog.confirmDialog({
							msg1: '当前有修改，是否先保存后跳转？',
							msg2: '此操作不可逆',
							width: '400px',
							type: 'error',
							onOk: function () {
								viewModel.saveBill(index);
							},
							onCancel: function () {
								viewModel.pageChange4Add(index);
							}
						});
					} else {
						return true
					}
				},
				pageChange4Add: function (index) {
					viewModel.pageModel.pageIndex(index);
					var currentData = viewModel.pageData[index];
					viewModel.setDataToPanel(currentData);
				},
				getSum: function (array) {
					var sum = 0;
					for (var i = 0; i < array.length; i++) {
						sum += parseInt(array[i]);
					}
					return sum;
				},
				//计算价格
				sumPrice: function (row) {
					var amount = row.getValue('assistNum');
					var unitPrice = row.getValue('price');
					amount == null ? 0 : parseFloat(amount);
					unitPrice == null ? 0 : parseFloat(unitPrice);
					row.setValue("amount", amount * unitPrice);
					return amount * unitPrice;
				},
			},
			afterCreate: function () {
				// 初始化折叠面板
				$.fn.collapsepanel(false, true);
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
							var row = viewModel.returninItems.getRowByField("goodsId", id);
							if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
								var newrow = viewModel.returninItems.createEmptyRow();
								newrow.setValue("rowNum", viewModel.generateRownum());
								newrow.setValue("goodsId", refValues[i].refpk);
								newrow.setValue("goodsCode", refValues[i].refcode);
								newrow.setValue("goodsName", refValues[i].refname);
							}
						}
					}
				});
				//价格
				viewModel.returninItems.on("price.valuechange", function (obj) {
					if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
						viewModel.sumPrice(obj.rowObj);
					}
				});
				//实入数量
				viewModel.returninItems.on("factOutNum.valuechange", function (obj) {
					var currRow = viewModel.returninItems.getRowByRowId(
						obj.rowId
					);
					var factOutNum = parseFloat(obj.newValue || "0");
					var shouldOutNum = parseFloat(currRow.getValue("shouldOutNum") || "0");
					if (factOutNum > shouldOutNum) {
						toastr.warning("实入数量不能大于应入数量");
						currRow.setValue("factOutNum", obj.oldValue);
						return;
					}
					var unitPrice = parseFloat(currRow.getValue("unitPrice") || "0");
					var amountMoney = factOutNum * unitPrice;

					currRow.setValue("amountMoney", amountMoney);
					var arr = viewModel.returninItems.getSimpleData();
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
					viewModel.returninCard.getCurrentRow().setValue("totalFactOutNum", viewModel.getSum(totalFactOutNum));
					viewModel.returninCard.getCurrentRow().setValue("totalShouldOutNum", viewModel.getSum(totalShouldOutNum));
				});
				//搜索条件 库存组织仓库过滤
				viewModel.searchcomp.viewModel.params.on("pkOrg.valuechange", function (obj) {
					if (obj.newValue != undefined && obj.newValue != "") {
						var stockOrgId = {
							"EQ_inventoryOrg.id": obj.newValue
						};
						$("#storehouse").attr("data-refparam", JSON.stringify(stockOrgId));
					} else {
						$("#storehouse").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
						viewModel.searchcomp.viewModel.params.setValue("storehouse", "");
					}
				})

				// 仓库参照传参货位参照
				viewModel.returninCard.on("storehouseId.valuechange", function (obj) {
					var row = viewModel.returninCard.getCurrentRow();
					// 仓库变化时改变是否启用货位管理字段
					var Storageref = $("#refContainerstorehouseRef").data("uui.refer");
					if (obj.newValue) {
						if (Storageref.values && Storageref.values.length > 0) {
							row.setValue("ifSlotManage", Storageref.values[0].ifSlotManage);
						}
					} else {
						row.setValue("ifSlotManage", '0');
					}
					// 若仓库变化则清空之前选择的货位
					if (obj.oldValue && obj.oldValue != obj.newValue) {
						var itemrows = viewModel.returninItems.getAllRows();
						if (itemrows && itemrows.length > 0) {
							itemrows.forEach(function (row) {
								if (row.getValue("goodsPositionId")) {
									row.setValue("goodsPositionId", null);
									row.setValue("goodsPositionName", null);
									row.setMeta("goodsPositionId", 'display', null);
								}
							})
						}
					}

					var storehouseId = row.getValue("storehouseId");
					viewModel.returninItems.setMeta("goodsPositionId", "refparam", '{"EQ_wareHouse":"' + storehouseId + '","EQ_isFinal":"1"}');
				});
			}
		});

		return view;
	});