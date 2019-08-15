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
			},
			tpl: tpl,
			model: model,
			baseData: {
				baseurl: "/stock/sale-out-orders",
				returninList: new u.DataTable(model.options.metas.complex),
				returninCard: new u.DataTable(model.options.metas.complex),
				returninItems: new u.DataTable(model.options.metas.complexItem),
				BomItems: new u.DataTable(model.options.metas.BomItem),

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
				//商品信息
				gridGoodsEdit: model.options.grids.gridGoodsEdit,
				gridGoodsDetail: model.options.grids.gridGoodsDetail,
				//BOM结构信息
				gridBomEdit: model.options.grids.gridBomEdit,
				gridBomDetail: model.options.grids.gridBomDetail,
				//拉单弹窗相关grid
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

				//跳转单据页
				goBillPanel: common.bill.goBillPanel,
				//跳转详情页
				goDetailPanel: common.bill.goDetailPanel,
				// 行号池
				curRowNum: ko.observable(0),
				currowBomNum: ko.observable(0),
				// 是否bom页签
				isBomPanel: ko.observable(),
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
				isEcRender: function (params) {
					if (params.value == '01') {
						params.element.innerHTML = '是';
						return;
					}
					params.element.innerHTML = '否';
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
						if (row.enableBatchNumberManage == '1') {
							viewModel.returninItems.setMeta("batchNumId", "refparam",
								'{"EQ_goods":"' + row.goodsId + '","EQ_product":"' + row.productId + '","EQ_productLine":"' + row.productLineId + '","EQ_isEnable":"1"}');

						} else {
							toastr.warning("该商品未开启批次控制");
							return false
						}
					}
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))) {
						var row = obj.rowObj.value;
						if (row.enableBatchNoManage == '1') {
							viewModel.returninItems.setMeta("batchCodeId", "refparam",
								'{"EQ_goods":"' + row.goodsId + '","EQ_isEnable":"1"}');
						} else {
							toastr.warning("该商品未开启批号控制");
							return false
						}
					}
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("stockStateId"))) {
						var row = obj.rowObj.value;
						if (row.enableInvStatusManage == '1') {
							viewModel.returninItems.setMeta("stockStateId", "refparam",
								'{"EQ_isEnable":"1"}');
						} else {
							toastr.warning("该商品未开启库存状态");
							return false
						}
					}
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("unitPrice"))) {
						var bomdata = viewModel.findBomByParentId(id);
						if (bomdata.length > 0) {
							toastr.warning("此商品含有BOM结构，请在&lt;BOM结构信息&gt;页签下维护单价");
							return false;
						} else {
							return true
						}
					}
					return true
				}
			},
			events: {
				//自动取数
				autonum: function () {
					var items = viewModel.returninItems.getAllRealRows();
					var curRow = viewModel.returninList.getCurrentRow();
					var itemBoms = viewModel.BomItems.getAllRealRows();
					items.map(function (item) {
						item.setValue("factOutNum", item.getValue("shouldOutNum"));
					});
					itemBoms.map(function (item) {
						item.setValue("factOutNum", item.getValue("shouldOutNum"));
					});
				},
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
					if (rows.length == 1 && rows[0].getValue("isEc") == "01") {
						toastr.warning("来源于电商单据不允许删除");
						return;
					}
					if (rows && rows.length > 0) {
						for (var i = 0; i < rows.length; i++) {
							if (rows[i].getValue("isEc") != "01") {
								ids.push(rows[i].getValue("id"));
							}
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
					queryData.search_EQ_billType = "ReturnIn";
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
					var curRow = viewModel.returninCard.createEmptyRowF();
					viewModel.returninItems.removeAllRows();
					viewModel.BomItems.removeAllRows();
					// 行号设置为0
					viewModel.curRowNum(0);
					viewModel.currowBomNum(0);
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
				isEcCheck: function (row) {
					var isEc = row.getValue("isEc");
					if (isEc == "02") {
						viewModel.isEc("b2b");
					} else if (isEc == "01") {
						viewModel.isEc("b2c");
					}
				},
				//进入修改单据页
				showEditBillPanel: function (index, rowId) {
					$("#tab-edit-bom").hide();
					$("#tab-edit-goods").show();
					var row;
					if (index == -1) {
						//处理通过详情页编辑进入
						row = viewModel.returninList.getFocusRow();
						//通过改变index判断当前处于编辑态
						viewModel.isEcCheck(row);
						index = 0;
					} else {
						//行上的编辑按钮
						row = viewModel.returninList.getRowByRowId(rowId);
						viewModel.isEcCheck(row);
					}
					viewModel.index = index;
					viewModel.rowId = row.rowId;

					var id = row.getValue("id");
					//查询子表数据
					viewModel.findByParentid(id, function (data) {
						data.saleOutOrderItems.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
                            item.batchNumCode = item.batchNumCode ? item.batchNumCode : item.batchNumName;
						});
						data.saleOutOrderItemBoms.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
                            item.batchNumCode = item.batchNumCode ? item.batchNumCode : item.batchNumName;
						});
						viewModel.returninCard.setSimpleData(data);
						viewModel.returninItems.setSimpleData(data.saleOutOrderItems, {
							unSelect: true
						});
						viewModel.BomItems.setSimpleData(data.saleOutOrderItemBoms, {
							unSelect: true
						});
						// 获得当前最大行号
						viewModel.getCurRowNum();
						viewModel.getBomCurrowNum();
						viewModel.seteidtCondition(data);
						viewModel.goBillPanel();
						viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
					});
				},
				seteidtCondition: function (data) {
					viewModel.pageData = [data];
					viewModel.pageModel.totalPages(1);
					var pkOrgId = viewModel.returninCard.getValue("pkOrgId");
					var storehouseId = viewModel.returninCard.getValue("storehouseId");
					$("#storehouseDomId").attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + pkOrgId + '"}');
					$("#storehouseDomId1").attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + pkOrgId + '"}');
					viewModel.returninItems.setMeta("goodsPositionId", "refparam",
						'{"EQ_wareHouse":"' + storehouseId + '","EQ_isFinal":"1"}');
				},
				detail: function () {
					$("#tab-detail-bom").hide();
					$("#tab-detail-goods").show();
					//确保grid先将行设置为focus状态
					setTimeout(function () {
						var curRow = viewModel.returninList.getCurrentRow();
						var id = curRow.getValue("id");
						viewModel.findByParentid(id, function (data) {
							data.saleOutOrderItems.forEach(function (item) {
								item.batchCodeName = item.batchCodeCode;
                                item.batchNumCode = item.batchNumCode ? item.batchNumCode : item.batchNumName;
							});
							data.saleOutOrderItemBoms.forEach(function (item) {
								item.batchCodeName = item.batchCodeCode;
                                item.batchNumCode = item.batchNumCode ? item.batchNumCode : item.batchNumName;
							});
							curRow.setSimpleData(data);
							viewModel.returninItems.setSimpleData(data.saleOutOrderItems, {
								unSelect: true
							});
							viewModel.BomItems.setSimpleData(data.saleOutOrderItemBoms, {
								unSelect: true
							});
						});
						viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
						viewModel.isEcCheck(curRow);
						viewModel.goDetailPanel();
					}, 0);
				},
				detail2bill: function () {
					$("#tab-edit-bom").hide();
					$("#tab-edit-goods").show();
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
						emptyBatchNoRows = "",
						emptyInvStatus = "";
                    var emptyGoodsOptRows = "";
					if (allItemRows.length > 0) {
						allItemRows.forEach(function (item) {
							if (parseFloat(item.getValue("enableBatchNumberManage")) == 1 && !(item.getValue("batchNumId"))) {
								var rowNum = item.getValue("rowNum");
								emptyBatchRows += rowNum + ",";
							}
							if (!item.getValue("goodsPositionId") && parseFloat(ifSlotManage) == 1) {
								var row2Num = item.getValue("rowNum");
								emptyPositionRows += row2Num + ",";
							}
							if (parseFloat(item.getValue("enableBatchNoManage")) == 1 && !(item.getValue("batchCodeId"))) {
								emptyBatchNoRows += item.getValue("rowNum") + ",";
							}
							if (parseFloat(item.getValue("enableInvStatusManage")) == 1 && !(item.getValue("stockStateId"))) {
								emptyInvStatus += item.getValue("rowNum") + ",";
							}
                            /*if(!item.getValue("goodsSelection") && parseFloat(item.getValue("isOptional")) == 1){
                                emptyGoodsOptRows += item.getValue("rowNum") + ",";
                            }*/
						});
						emptyBatchRows = emptyBatchRows.slice(0, emptyBatchRows.length - 1);
						emptyPositionRows = emptyPositionRows.slice(0, emptyPositionRows.length - 1);
						emptyBatchNoRows = emptyBatchNoRows.slice(0, emptyBatchNoRows.length - 1);
						emptyInvStatus = emptyInvStatus.slice(0, emptyInvStatus.length - 1);
                        emptyGoodsOptRows = emptyGoodsOptRows.slice(0, emptyGoodsOptRows.length - 1);
						if (emptyPositionRows || emptyBatchRows || emptyBatchNoRows || emptyInvStatus || emptyGoodsOptRows) {
							if (emptyBatchRows) toastr.warning("行号" + emptyBatchRows + "的商品启用了批次号，请填写批次号");
							if (emptyPositionRows) toastr.warning("请为行号" + emptyPositionRows + "的商品选择货位");
							if (emptyBatchNoRows) toastr.warning("行号" + emptyBatchNoRows + "的商品启用了批号，请填写批号");
							if (emptyInvStatus) toastr.warning("行号" + emptyInvStatus + "的商品启用了库存状态，请填写库存状态");
                            if(emptyGoodsOptRows)toastr.warning("请为行号" + emptyGoodsOptRows + "的商品添加选配");
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
						if (viewModel.billPanelStatus() == "add") {
							if (!viewModel.checkEmpty()) {
								return;
							};
						}
						//判断批次号及货位------- end
						// 组装数据
						var currentRow, ajaxType;
						var index = viewModel.index;
						var returninorderData = viewModel.returninCard.getSimpleData()[0];
						var returninItemsData = viewModel.returninItems.getSimpleData();
						var BomItemsData = viewModel.BomItems.getSimpleData();
						returninorderData.saleOutOrderItems = returninItemsData;
						returninorderData.saleOutOrderItemBoms = BomItemsData;
						if (index >= 0) {
							ajaxType = "put";
						} else {
							ajaxType = "post";
							// 新增时将所有的行状态置为new
							returninorderData.persistStatus = 'new';
							returninItemsData.forEach(function (item) {
								item.persistStatus = 'new';
							});
							BomItemsData.forEach(function (item) {
								item.persistStatus = 'new';
							});
							returninorderData.billType = "ReturnIn";
							returninorderData.billTranTypeId = "ReturnIn";
						};
						// 提交
						$._ajax({
							url: appCtx + viewModel.baseurl,
							type: ajaxType,
							data: JSON.stringify(returninorderData),
							contentType: "application/json; charset=utf-8",
							success: function (data) {
								common.dialog.stockConfirmDialog(data, function () {
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
								});
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
					var tabDom = $(".u-tabs__tab-bar");
					if (tabDom && tabDom.length > 0) {
						tabDom.each(function (i, item) {
							var childDoms = item.children;
							$(childDoms).each(function (i, item) {
								$(item).removeClass("is-active");
							});
							$("#tabEditGoods").addClass("is-active");
							$("#tabDetailGoods").addClass("is-active");
							$("#tab-edit-goods").hide();
						})
					};
					common.bill.retListPanel();
				},
				//选择商品页签
				checkGoods: function () {
					viewModel.isBomPanel(true);
					if (viewModel.billPanelStatus() == "detail") {
						$("#tab-detail-bom").hide();
						$("#tab-detail-goods").show();
					} else {
						$("#tab-edit-bom").hide();
						$("#tab-edit-goods").show();
					}
				},
				//选择Bom页签
				checkBom: function () {
					viewModel.isBomPanel(false);
					if (viewModel.billPanelStatus() == "detail") {
						$("#tab-detail-bom").show();
						$("#tab-detail-goods").hide();
					} else {
						$("#tab-edit-bom").show();
						$("#tab-edit-goods").hide();
					}
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
				// 从行号池中拿到最新的bom行号
				generateBomrowNum: function () {
					var latestnum = viewModel.currowBomNum(),
						newnum = parseFloat(latestnum) + 10;
					viewModel.currowBomNum(newnum);
					return newnum;
				},
				getBomCurrowNum: function () {
					var data = viewModel.BomItems.getSimpleData();
					var maxrowNum = 0;
					if (data && data.length > 0) {
						for (var i = 0; i < data.length; i++) {
							if (data[i].rowNum > maxrowNum) {
								maxrowNum = data[i].rowNum;
							}
						}
					}
					viewModel.currowBomNum(maxrowNum);
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
							listData.orderItems.forEach(function (item) {
								if (item.mainNum && item.stockInNum) {
									item.mainNum = item.mainNum - item.stockInNum;
								}
							});
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
						if (rows[j].getValue("id") == id) {
							viewModel.selectedreferList.removeRows([j], {
								forceDel: true
							});
						}
					}
					for (var i = itemrows.length - 1; i >= 0; i--) {
						if (itemrows[i].getValue("orderId") == id) {
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
						if (selectedRows[i].getValue("id") == id) {
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
						if (itemrows[i].getValue("id") == itemId) {
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
					viewModel.checkGoods();
				},
				queryChildArr: function (parentArr) {
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/translate-returned-in",
						// async: false,
						data: JSON.stringify(parentArr),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							viewModel.setDataToPanel(data[0]);
							viewModel.pageData = data;
							viewModel.pageModel.totalPages(data.length);
						}
					})

				},
				setDataToPanel: function (data) {
					viewModel.index = -1;
					viewModel.returninCard.removeAllRows();
					var curRow = viewModel.returninCard.createEmptyRow();
					viewModel.returninItems.removeAllRows();
                    viewModel.BomItems.removeAllRows();
					viewModel.getWarehouse(data);
					viewModel.getGoodsInfo(data.saleOutOrderItems);
					// 行号设置为0
					viewModel.curRowNum(0);
					viewModel.currowBomNum(0);
					curRow.setSimpleData(data);
					viewModel.getCurDate(curRow);
					viewModel.setDefaultValue(curRow);
					curRow.status = "nrm";
					if (data.saleOutOrderItems && data.saleOutOrderItems.length > 0) {
						data.saleOutOrderItems.forEach(function (item) {
							item.rowNum = viewModel.generateRownum();
						});
						viewModel.returninItems.setSimpleData(data.saleOutOrderItems);
					}
					if (data.saleOutOrderItemBoms && data.saleOutOrderItemBoms.length > 0) {
						data.saleOutOrderItemBoms.forEach(function (bomItem) {
                            var itemId = bomItem.srcBillBcode;
							data.saleOutOrderItems.forEach(function (item) {
                                if (item.srcBillBcode == itemId) {
                                    bomItem.parentRowNum = item.rowNum;
                                }
							});
							bomItem.rowNum = viewModel.generateBomrowNum();
							if (bomItem.isGift == 1) {
								bomItem.unitPrice = 0;
								bomItem.amountMoney = 0;
							}
						});
						viewModel.BomItems.setSimpleData(data.saleOutOrderItemBoms);
					}
				},

				getGoodsInfo: function (items) {
					var ids = [];
					if (items && items.length > 0) {
						items.forEach(function (item) {
							if (item && item.goodsId && (!item.productId || !item.productLineId ||
									item.enableBatchNumberManage == "" ||
									item.enableBatchNoManage == "" ||
									item.enableInvStatusManage == "" ||
                                    item.isOptional == ""
								)) {
								ids.push(item.goodsId);
							}
						})
					}
					$._ajax({
						url: window.pathMap.base + "/base/goods/findByIdIn",
						type: "get",
						data: {
							ids: ids.join(",")
						},
						async: false,
						success: function (data) {
							if (data && data.length > 0) {
								items.forEach(function (item) {
									item.enableBatchNumberManage = '0';
									item.enableBatchNoManage = '0';
									item.enableInvStatusManage = '0';
                                    item.isOptional = '0';
									for (var i = 0; i < data.length; i++) {
										if (item.goodsId == data[i].id) {
											item.productId = data[i].productId;
											item.productLineId = data[i].productLineId;
											item.enableBatchNumberManage = data[i].enableBatchNumberManage ? '1' : '0';
											item.enableBatchNoManage = data[i].enableBatchNoManage ? '1' : '0';
											item.enableInvStatusManage = data[i].enableInvStatusManage ? '1' : '0';
                                            item.isOptional = data[i].isOptional ? '1' : '0';
											break;
										}
									}
								})
							}
						}
					});
				},
				getWarehouse: function (maindata) {
					if (maindata.storehouse && (maindata.ifSlotManage == '' || maindata.ifSlotManage == null)) {
						$._ajax({
							url: window.pathMap.base + "/base/warehouses/findOne",
							type: "get",
							data: {
								id: maindata.storehouse
							},
							async: false,
							success: function (data) {
								maindata.ifSlotManage = data.ifSlotManage || '0';
							}
						});
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
					queryData.search_IN_orderStatus = "04,09";
					queryData.search_NOTNULL_saleOrg = "~";
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
					var amount = row.getValue('factOutNum');
					var unitPrice = row.getValue('unitPrice');
					amount == null ? 0 : parseFloat(amount);
					unitPrice == null ? 0 : parseFloat(unitPrice);
					row.setValue("amountMoney", amount * unitPrice);
					return amount * unitPrice;
				},
				// 选配
				goodsOptDetails: function (obj) {
					var viewModel = obj.gridObj.viewModel;
					var goodsSelection = obj.row.value.goodsSelection; // 选配id
					if (goodsSelection) {
						var detailfun = "data-bind=click:goodsOptDetailsFun.bind($data," + obj.rowIndex + ")";
						obj.element.innerHTML =
							'<a href="#" class="ui-a-detail" ' +
							detailfun +
							">查看选配</a>";
					} else {
						obj.element.innerHTML =
							'<span>无选配信息</span>';
					}
					ko.cleanNode(obj.element);
					ko.applyBindings(viewModel, obj.element);
				},
				goodsOptDetailsFun: function (obj) {
					/**
					 * @example 查看选配common.goodsOptional.OptionalDetails()
					 * @param viewModel 当前viewModel, 用来挂载dialog
					 * @param title     弹窗title
					 * @param goodsId   商品行Id
					 * @param el        dialog id (不加 ‘#’)
					 */
					var data = viewModel.returninItems.getSimpleData()[obj];
					var id = data.goodsId;
					var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
					common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.returninItems, viewModel.BomItems);
				},
				//根据商品id取bom
				findBomByParentId: function (id) {
					var bomInfo;
					$._ajax({
						url: window.pathMap.base + "/base/goods-boms/goods-bom-by-parent-good-id",
						type: 'get',
						async: false,
						data: {
							parentGoodId: id
						},
						success: function (data) {
							bomInfo = data;
						}
					})
					return bomInfo;
				},
				//反算
				backClac: function (obj, field) {
					// 1. 修改数量 获取当前行 parentGoodsId
					// 2. 遍历所有行取出parentGoodsId 一样的所有行
					// 3. 取出所有行里面的 amount ，并且相加
					// 4. 获取商品行goodsid 和 parentGoodsId一样的行
					// 5. 把第三步相加的和赋值给 商品行的amount  obj.rowObj

					var parentRowNum = obj.rowObj.getValue("parentRowNum");
					var BomItemRows = viewModel.BomItems.getAllRealRows();
					var productItemRows = viewModel.returninItems.getAllRealRows();
					var oneParentBomRows = [],
						oneParentBomSum = 0;
					BomItemRows.forEach(function (item) {
						if (item.getValue("parentRowNum") == parentRowNum) {
							oneParentBomRows.push(item);
						}
					});
					oneParentBomRows.forEach(function (item) {
						if (field == "unitPrice") {
							var childGoodsQty = item.getValue("childGoodsQty") ? item.getValue("childGoodsQty") : 1;
							oneParentBomSum = oneParentBomSum + (parseFloat(item.getValue(field) ? item.getValue(field) : 0)) * childGoodsQty;
						} else {
							oneParentBomSum = oneParentBomSum + parseFloat(item.getValue(field) ? item.getValue(field) : 0);
						}
					});
					productItemRows.forEach(function (item) {
						if (item.getValue("rowNum") == parentRowNum) {
							item.setValue(field, oneParentBomSum)
						}
					})
				},
			},
			afterCreate: function () {
				// 初始化折叠面板
				$.fn.collapsepanel(false, true);
				// 子表参照聚焦行，用于绑定子表参照组件
				var refRow = viewModel.ItemRefList.createEmptyRow();
				viewModel.ItemRefList.setRowFocus(refRow);
				//价格
				viewModel.returninItems.on("unitPrice.valuechange", function (obj) {
					if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
						obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
					}
                    var parentRowNum = obj.rowObj.getValue("rowNum");
					var parentGoodsId = obj.rowObj.getValue("goodsId");
					//获取全部bom信息
                    var allrows = viewModel.BomItems.getAllRealRows();
					for (var i = 0; i < allrows.length; i++) {
						if (allrows[i].getValue("goodsId") == parentGoodsId && allrows[i].getValue("parentRowNum") == parentRowNum) {
							var unitPrice = obj.newValue;
							allrows[i].setValue("unitPrice", unitPrice);
						}
					}
				});

				viewModel.returninItems.on("shouldInNum.valuechange", function (obj) {
					var arr = viewModel.returninItems.getSimpleData();
					var amount = [];
					for (var i = 0; i < arr.length; i++) {
						if (!arr[i].shouldInNum) {
							arr[i].shouldInNum = 0
						}
						var amountItem = parseFloat(arr[i].shouldInNum);
						amount.push(amountItem);
					}
					viewModel.returninCard.getCurrentRow().setValue("totalShouldOutNum", viewModel.getSum(amount));
				});
				//实入数量
				viewModel.returninItems.on("factOutNum.valuechange", function (obj) {
					if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
						obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
					}

					var arr = viewModel.returninItems.getSimpleData();
					var amount = [];
					for (var i = 0; i < arr.length; i++) {
						if (!arr[i].factOutNum) {
							arr[i].factOutNum = 0
						}
						var amountItem = parseFloat(arr[i].factOutNum);
						amount.push(amountItem);
					}
					viewModel.returninCard.getCurrentRow().setValue("totalFactOutNum", viewModel.getSum(amount));

					//联动bom数量
					var parentRowNum = obj.rowObj.getValue("rowNum");
                    var allrows = viewModel.BomItems.getAllRealRows();
					for (var i = 0; i < allrows.length; i++) {
						if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                            var childQty = allrows[i].getValue("childGoodsQty") ? allrows[i].getValue("childGoodsQty") : 1;
                            var bomAmount = childQty * obj.newValue;
							allrows[i].setValue("factOutNum", bomAmount)
						}
					}
				});

				//Bom数量变化联动总价
				viewModel.BomItems.on("factOutNum.valuechange", function (obj) {
					if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
						obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
					}
				});
				//单价
				viewModel.BomItems.on("unitPrice.valuechange", function (obj) {
					if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
						viewModel.sumPrice(obj.rowObj);
					}
					var arr = viewModel.BomItems.getSimpleData();
					var price = [];
					for (var i = 0; i < arr.length; i++) {
						if (!arr[i].amountMoney) {
							arr[i].amountMoney = 0
						}
						var amountMoney = parseFloat(arr[i].amountMoney);
						price.push(amountMoney);
					}
					// 计算反写商品行上面的值
					viewModel.backClac(obj, "unitPrice");
				});
				//Bom金额监听反算商品金额
				viewModel.BomItems.on("amountMoney.valuechange", function (obj) {
					viewModel.backClac(obj, "amountMoney");
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
				//库存组织参照传参库存参照
				viewModel.returninCard.on("pkOrgId.valuechange", function (obj) {
					var row = viewModel.returninCard.getCurrentRow();
					var pkOrgId = row.getValue("pkOrgId");
					$("#storehouseDomId").attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + pkOrgId + '"}');
					if (pkOrgId) {
						viewModel.returninCard.setMeta("storehouseId", "enable", true);
						$("#storehouseRef1").attr('placeholder', "");
						$("#storehouseRef").attr('placeholder', "");
					} else {
						row.setValue("storehouseId", "");
						viewModel.returninCard.setMeta("storehouseId", "enable", false);
						$("#storehouseRef1").attr('placeholder', "请先选择库存组织");
						$("#storehouseRef").attr('placeholder', "请先选择库存组织");
					}
					if (!obj.ctx) {
						viewModel.returninCard.setValue("storehouseId", null);
					}
				});
				// 仓库参照传参货位参照
				viewModel.returninCard.on("storehouseId.valuechange", function (obj) {
					var row = viewModel.returninCard.getCurrentRow();
					// var storehouseId = row.getValue("storehouseId");
					// if (storehouseId) {
					// 	var refer = $("#refContainerStockOrgIdRef").data("uui.refer");
					// 	refer.setValue(null);
					// 	refer.blurEventVal();
					// };
					// 仓库变化时改变是否启用货位管理字段s
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

				//批次号 货位 批号 供应商 项目 库存状态 客户
				viewModel.returninItems.on("valuechange", function (obj) {
					function setValueToBom() {
						var parentRowNum = obj.rowObj.getValue("rowNum");
                        var allrows = viewModel.BomItems.getAllRealRows();
						for (var i = 0; i < allrows.length; i++) {
							var nameField = obj.field.replace("Id", "Name");
							var idField = obj.field;
							if (allrows[i].getValue("parentRowNum") == parentRowNum) {
								//含有包件
								allrows[i].setValue(obj.field, obj.newValue);
								if(obj.newValue){
									if(idField == "batchNumId"){
                                        nameField = "batchNumCode";
									}
                                    allrows[i].setValue(nameField, obj.rowObj.data[idField].meta.display);
								}
							}
						}
					};
					if (obj.field == "batchNumId" ||
						obj.field == "goodsPositionId" ||
						obj.field == "batchCodeId" ||
						obj.field == "supplierId" ||
						obj.field == "projectId" ||
						obj.field == "stockStateId" ||
						obj.field == "customerId"
					) {
						setValueToBom();
					}
				});
			}
		});
		return view;
	});