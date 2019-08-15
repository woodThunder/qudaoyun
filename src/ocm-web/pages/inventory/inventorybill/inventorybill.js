define(['text!./inventorybill.html', 'ocm_common', 'ocm_baseview', './meta.js', '../../flow/bpmapproveref/bpmopenbill.js'], function (tpl, common, baseview, model, bpmopenbill) {
	'use strict'
	var viewModel, app;
	var billCreateType = "0";
	var BILLPANELSTATUS = {
		ADD: "add",
		EDIT: "edit",
		COPY: "copy",
		DETAIL: "detail",
		DEFAULT: "default",
		ADJUST: "adjust",
		UNADJUST: "unadjust"
	};

	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
			app = this.app;
		},
		tpl: tpl,
		model: model,
		baseData: {
			index: -1,
			baseurl: '/stock/inventory-bills',
			applicationUrl: '/stock/inventory-bills',
			inventorybillList: new u.DataTable(model.options.metas.complex),

			otheroutList: new u.DataTable(model.options.metas.otherout),
			otheroutItem: new u.DataTable(model.options.metas.otheroutItem),
			otheroutBom: new u.DataTable(model.options.metas.otheroutBom),

			otherinList: new u.DataTable(model.options.metas.otherin),
			otherinItem: new u.DataTable(model.options.metas.otherinItem),
			otherinBom: new u.DataTable(model.options.metas.otherinBom),

			inventoryItems: new u.DataTable(model.options.metas.complexItem),
			ItemRefList: new u.DataTable(model.options.metas.ItemRef),
			stockItemsSearchParam: new DataTable(model.options.metas.stockItemsSearch),
			//存货参照
			stockreferItems: new u.DataTable(model.options.metas.stockItems),
			//存货参照 已选择
			selectedstockreferItems: new u.DataTable(model.options.metas.stockItems),
			searchcomp: {},
			searchcomp2: {},
			arrivalBelongDataSource: ko.observableArray([]),
			orderTypeSource: ko.observableArray([]),
			purchaseTypeSource: ko.observableArray([]),
			// 商品状态
			isClosedSource: [{
				value: '0',
				name: '打开'
			}, {
				value: '1',
				name: '关闭'
			}],
			// 行号池
			currowNum: ko.observable(0),
			currowBomNum: ko.observable(0),
			//当前系统日期
			curDate: ko.observable(),
			searchSource: model.options.searchs.search1,
			search2Source: model.options.searchs.search2,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button4Source: model.options.buttons.button4,
			button5Source: model.options.buttons.button5,
			button6Source: model.options.buttons.button6,
			//730 新加按供应商
			buttonSuplSource: model.options.buttons.buttonSupl,
			button7Source: model.options.buttons.button7,
			button8Source: model.options.buttons.button8,
			buttonMenu1Source: model.options.buttons.buttonmenu1,

			card1Source: model.options.cards.card1,
			detail1Source: model.options.details.detail1,
			//其他出
			detail2Source: model.options.details.detail2,
			//其他入
			detail3Source: model.options.details.detail3,

			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			//存货
			grid4Option: model.options.grids.grid4,
			//存货已选
			grid5Option: model.options.grids.grid5,
			//其他出
			grid6Option: model.options.grids.grid6,
			//其他入
			grid7Option: model.options.grids.grid7,

			grid8Option: model.options.grids.grid8,

			grid9Option: model.options.grids.grid9,

			billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//跳转详情页
			goDetailPanel: common.bill.goDetailPanel,
			//跳转调整页
			goAdjustPanel: function () {
				$(".ui-panel").hide();
				$(".ui-adjust-panel").show();
				$(".ui-adjust-panel").animateCss("fadeIn");
			},
			status: ko.pureComputed(function () {
				var enableStatus = viewModel.inventorybillList.ref("status")();
				enableStatus = parseFloat(enableStatus);
				switch (enableStatus) {
					case 1:
						return "待处理";
					case 2:
						return "已录入";
					case 3:
						return "已提交审批";
					case 4:
						return "审批中";
					case 5:
						return "审批通过";
					case 6:
						return "审批不通过";
					default:
				}
			}),
			state: ko.pureComputed(function () {
				var state = viewModel.inventorybillList.ref("state")();
				state = parseInt(state);
				switch (state) {
					case 0:
						return "待处理";
					case 1:
						return "已提交";
					case 2:
						return "审批中";
					case 3:
						return "审批通过";
					case 4:
						return "审批不通过";
					default:
				}
			}),
			otherOutBillDate: ko.pureComputed(function () {
				var truetime = viewModel.otheroutList.ref("billDate")();
				var showtime = u.date.format(truetime, 'YYYY-MM-DD');
				return showtime;
			}),
			otherInBillDate: ko.pureComputed(function () {
				var truetime = viewModel.otherinList.ref("billDate")();
				var showtime = u.date.format(truetime, 'YYYY-MM-DD');
				return showtime;
			}),
		},
		rendertype: {
			approveStateRender: function (obj) {
				var showValue = "";
				switch (parseInt(obj.value)) {
					case 0:
						showValue = "待处理";
						break;
					case 1:
						showValue = "已提交";
						break;
					case 2:
						showValue = "审批中";
						break;
					case 3:
						showValue = "审批通过";
						break;
					case 4:
						showValue = "审批不通过";
						break;
					default:
						showValue = "";
						break;
				}
				obj.element.innerHTML = showValue;
			},
			operation: function (obj) {
				var editfun, delfun;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var state = obj.row.value.state;
				if (state != 0) {
					delfun = 'class="disabled"';
					editfun = 'class="disabled"';
				} else {
					editfun =
						"data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
					delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
				}
				obj.element.innerHTML = '<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a ' +
					editfun +
					' title="编辑">编辑</a>' +
					'</span>    ' +
					'<span class="ui-handle-word">' +
					'<a ' +
					delfun +
					' title="删除">删除</a>' +
					'</span></div>';
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			detailRender: common.rendertype.detailRender,
			statusRender: function (params) {
				var value = parseFloat(params.value);
				var showName = "";
				switch (value) {
					case 1:
						showName = "待处理";
						break;
					case 2:
						showName = "已录入";
						break;
					case 3:
						showName = "已提交审批";
						break;
					case 4:
						showName = "审批中";
						break;
					case 5:
						showName = "审批通过";
						break;
					case 6:
						showName = "审批不通过";
						break;
				};
				params.element.innerHTML = showName;
			},
			isReturnedRender: function (obj) {
				var showValue = obj.value == "1" ? "是" : obj.value == "0" ? "否" : "";
				obj.element.innerHTML = showValue;
			},
			isReturnedComputed: ko.pureComputed(function () {
				var isReturned = viewModel.inventorybillList.ref("isReturned")();
				var showVal = isReturned == 0 ? "否" : "是";
				return showVal;
			}),
			//账实一致
			unanimousAccountRender: function (obj) {
				var showValue = obj.unanimousAccount == "1" ? "是" : obj.unanimousAccount == "0" ? "否" : "";
				obj.element.innerHTML = showValue;
			},
			//批次号货位判断
			beforeEditCheck: function (obj) {
				if (viewModel.billPanelStatus() == "default" || viewModel.billPanelStatus() == "edit") {
					var gridObj = obj.gridObj;
					//判断所属母件商品是否可编辑
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("parentGoodsId"))) {
						var row = obj.rowObj.value;
						if (!row.goodsId) {
							toastr.warning("请先选择商品");
							return false;
						}
						var goodsId = row.goodsId;
						var parentGoodsIds = "";
						$._ajax({
							url: appCtx + "/api/base/goods-boms" + "/goods-bom-by-child-id",
							type: "get",
							async: false,
							data: {
								childGoodsId: goodsId,
							},
							success: function (data) {
								if (data != null) {
									data.forEach(function (item) {
										parentGoodsIds += item.parentGoodsId + ",";
									})
                                    parentGoodsIds = parentGoodsIds.substring(0, parentGoodsIds.length - 1);
								}
								viewModel.clearItemsRef("parentgoodsref");
								//viewModel.inventoryItems.setMeta("parentGoodsId", "refparam", '{"EQ_isEnable":"1","EQ_isServiceType":"0","IN_id":"' + parentGoodsIds + '"}')
								if(""==parentGoodsIds){
									viewModel.inventoryItems.setMeta("parentGoodsId", "refparam", '{"EQ_isEnable":"1","EQ_isServiceType":"0"}')
								}else{
									viewModel.inventoryItems.setMeta("parentGoodsId", "refparam", '{"EQ_isEnable":"1","EQ_isServiceType":"0","IN_id":"' + parentGoodsIds + '"}')
								}
							}
						});
						return true;
					}
					// 判断当前货位是否可编辑
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionId"))) {
						gridObj.getColumnByField("batchNumId").options.editable
						// 先判断有没有仓库
						if (viewModel.inventorybillList.getValue("inventoryStorageId")) {
							// 判断是否启用货位管理
							if (viewModel.inventorybillList.getValue("ifSlotManage") != '1') {
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
						var enableBatchNumberManage = row.enableBatchNumberManage;
						if (enableBatchNumberManage == '1') {
							viewModel.inventoryItems.setMeta("batchNumId", "refparam",
								'{"EQ_goods":"' + row.goodsId + '","EQ_product":"' + row.productId + '","EQ_productLine":"' + row.productLineId + '","EQ_isEnable":"1"}');

						} else {
							toastr.warning("该商品未开启批次控制");
							return false
						}
					}
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))) {
						var row = obj.rowObj.value;
						if (row.enableBatchNoManage == '1') {
							viewModel.inventoryItems.setMeta("batchCodeId", "refparam",
								'{"EQ_goods":"' + row.goodsId + '","EQ_isEnable":"1"}');
						} else {
							toastr.warning("该商品未开启批号控制");
							return false
						}
					}
					if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("stockStateId"))) {
						var row = obj.rowObj.value;
						if (row.enableInvStatusManage == '1') {
							viewModel.inventoryItems.setMeta("stockStateId", "refparam",
								'{"EQ_isEnable":"1"}');
						} else {
							toastr.warning("该商品未开启库存状态");
							return false
						}
					}
					return true
				} else {
					return true
				}
			}
		},
		events: {
			showOtherOut: function () {
				setTimeout(function () {
					$("#tab3").addClass('is-active');
					$("#tab-panel-3").addClass('is-active');
				}, 0)
			},
			showOtherIn: function () {
				setTimeout(function () {
					$("#tab5").trigger("click");
					$("#tab5").addClass('is-active');
					$("#tab-panel-5").addClass('is-active');
				}, 0)
			},
			//选择商品页签
			checkOtherInGoods: function () {
				$("#tab-panel-6").hide();
				$("#tab-panel-5").show();
				setTimeout(function () {
					$('#tab-in').addClass('is-active');
					$('#tab-panel-in').addClass('is-active');
				}, 0)

			},
			//选择Bom页签
			checkOtherInBom: function () {
				$("#tab-panel-6").show();
				$("#tab-panel-5").hide();
				setTimeout(function () {
					$('#tab-in').addClass('is-active');
					$('#tab-panel-in').addClass('is-active');
				}, 0)
			},
			//选择商品页签
			checkOtherOutGoods: function () {
				$("#tab-panel-4").hide();
				$("#tab-panel-3").show();
				setTimeout(function () {
					$('#tab-out').addClass('is-active');
					$('#tab-panel-out').addClass('is-active');
				}, 0)
			},
			//选择Bom页签
			checkOtherOutBom: function () {
				$("#tab-panel-4").show();
				$("#tab-panel-3").hide();
				setTimeout(function () {
					$('#tab-out').addClass('is-active');
					$('#tab-panel-out').addClass('is-active');
				}, 0)
			},
			//删除和批量删除
			del: function (data, rowId) {
				if (typeof (data) == 'number') {
					viewModel.inventorybillList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.inventorybillList.getSelectedRows();
				if (rows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (rows && rows.length > 0) {
					if (rows.length == 1) {
						if (rows[0].getValue("state") != 0) {
							toastr.warning("不处于待处理状态的单据不能删除");
							return;
						}
					}
					for (var i = 0; i < rows.length; i++) {
						var state = rows[i].getValue("state");
						if (state == 0) {
							ids.push(rows[i].getValue("id"));
						}
					}
				}
				common.dialog.confirmDialog({
					msg1: '确认删除这些项？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function () {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/delete",
							type: "post",
							// data: "ids=" + ids.join(","),
							data: {
								ids: ids.join(",")
							},
							success: function (data) {
								viewModel.inventorybillList.removeRows(rows);
							}
						});

					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.inventorybillList.pageIndex(0);
				}
				viewModel.inventorybillList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.inventorybillList.pageSize();
				var pageNumber = viewModel.inventorybillList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.inventorybillList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.inventorybillList.totalRow(data.totalElements);
						viewModel.inventorybillList.totalPages(data.totalPages);
					}
				})
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},

			searchRefer: function (reindex) {
				// if (reindex) {
				//   viewModel.stockreferItems.pageIndex(0);
				// }
				var queryData = {};
				viewModel.stockreferItems.removeAllRows();
				var curRow = viewModel.inventorybillList.getCurrentRow();
				var orgId = curRow.getValue("stockOrgId");
				var wareHouseId = curRow.getValue("inventoryStorageId");

				var goodsArr = $("#refContainergoodsRef").data("uui.refer").values;

				if (goodsArr && goodsArr.length > 0) {
					goodsArr.forEach(function (item) {
						if (item.refpk) {
							item.org = orgId;
							item.warehouse = wareHouseId;
							item.goods = item.refpk;
						} else {
							goodsArr = [];
						}
					});
				} else {
					goodsArr = [];
				}
				var isEmptyStock = viewModel.searchcomp2.getSearchData().isEmptyStock;
				if (!isEmptyStock) {
					isEmptyStock = 0;
				}

				var urlinfo = "",
					orginfo = "",
					warehouseinfo = "";
				//判断是否选择商品
				var isEmptyInfo = "?isEmptyStock=" + isEmptyStock;
				orginfo += "&org=" + orgId;
				warehouseinfo += "&warehouse=" + wareHouseId;
				urlinfo = isEmptyInfo + orginfo + warehouseinfo;
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/get-goods-by-stock/" + urlinfo,
					dataType: "json",
					data: JSON.stringify(goodsArr),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.stockreferItems.setSimpleData(data, {
							unSelect: true
						})
					}
				})
			},
			cleanSearchRefer: function () {
                $("#refContainergoodsRef").data("uui.refer").setValue(null);
				viewModel.searchcomp2.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.inventorybillList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.inventorybillList.pageSize(size);
				viewModel.search(true);
			},
			//页码改变时的回调函数
			pageChangeRefer: function (index) {
				viewModel.stockreferItems.pageIndex(index);
				viewModel.searchRefer();
			},
			//进入新增单据页
			showDefault: function () {
				viewModel.index = -1;
				var curRow = viewModel.inventorybillList.createEmptyRowF();
				viewModel.inventorybillList.setRowFocus(curRow);
				viewModel.inventoryItems.removeAllRows();
				curRow.setValue("status", "01");
				if (viewModel.billPanelStatus() == "default") {
					curRow.setValue("inventoryMode", "GeneralCreate");
					billCreateType = "1";
				} else if (viewModel.billPanelStatus() == "warehouse") {
					curRow.setValue("inventoryMode", "StorageCreate");
					billCreateType = "0";
				} else if (viewModel.billPanelStatus() == "goodsposition") {
					curRow.setValue("inventoryMode", "GoodsPositionCreate");
					billCreateType = "0";
				} else if (viewModel.billPanelStatus() == "stock") {
					curRow.setValue("inventoryMode", "StockCreate");
					billCreateType = "0";
				} else if (viewModel.billPanelStatus() == "supplier") {
					curRow.setValue("inventoryMode", "SupplierCreate");
					billCreateType = "0";
				}
				viewModel.getCurDate(curRow);
				viewModel.currowNum(0);
				var grid = viewModel.app.getComp("grid_complexItem").grid;
				var batchNumCol = grid.getColumnByField("batchNumId");
				var parentGoodsCol = grid.getColumnByField("parentGoodsId");
				var positionCol = grid.getColumnByField("goodsPositionId");
				var batchCodeCol = grid.getColumnByField("batchCodeId");
				var supplierCol = grid.getColumnByField("supplierId");
				var projectCol = grid.getColumnByField("projectId");
				var stockStateCol = grid.getColumnByField("stockStateId");
				var customerCol = grid.getColumnByField("customerId");
				if (viewModel.billPanelStatus() == "default") {
					batchNumCol.options.editable = true;
					positionCol.options.editable = true;
					parentGoodsCol.options.editable = true;
					batchCodeCol.options.editable = true;
					supplierCol.options.editable = true;
					projectCol.options.editable = true;
					stockStateCol.options.editable = true;
					customerCol.options.editable = true;

				} else {
					batchNumCol.options.editable = false;
					positionCol.options.editable = false;
					positionCol.options.editOptions.required = false;
					parentGoodsCol.options.editable = false;
					batchCodeCol.options.editable = false;
					supplierCol.options.editable = false;
					projectCol.options.editable = false;
					stockStateCol.options.editable = false;
					customerCol.options.editable = false;

				}
			},
			// 普通跳转
			addDefault: function () {
				viewModel.billPanelStatus("default");
				viewModel.showDefault();
				viewModel.goBillPanel();
				viewModel.inventorybillList.setMeta("inventoryStorageId", "enable", false);
				$("#inventoryStorage input").attr('placeholder', "请先选择库存组织");
			},
			// 按整仓
			addWareHouse: function () {
				viewModel.billPanelStatus("warehouse");
				viewModel.showDefault();
				viewModel.goBillPanel();
				viewModel.inventorybillList.setMeta("inventoryStorageId", "enable", false);
				$("#inventoryStorage input").attr('placeholder', "根据选择仓库自动带入");
			},
			// 按货位
			addGoodPo: function () {
				viewModel.billPanelStatus("goodsposition");
				viewModel.showDefault();
				viewModel.goBillPanel();
				viewModel.inventorybillList.setMeta("inventoryStorageId", "enable", false);
				$("#inventoryStorage input").attr('placeholder', "请先选择库存组织");
			},
			// 按存货
			addStock: function () {
				viewModel.billPanelStatus("stock");
				viewModel.showDefault();
				viewModel.goBillPanel();
				viewModel.inventorybillList.setMeta("inventoryStorageId", "enable", false);
				$("#inventoryStorage input").attr('placeholder', "请先选择库存组织");
			},
			// 按供应商
			addSupplier: function () {
				viewModel.billPanelStatus("supplier");
				viewModel.showDefault();
				viewModel.goBillPanel();
				viewModel.inventorybillList.setMeta("inventoryStorageId", "enable", false);
				$("#inventoryStorage input").attr('placeholder', "请先选择库存组织");
			},
			//进入修改单据页
			showEditBillPanel: function (index, rowId) {
				var row;
				if (index == -1) {
					row = viewModel.inventorybillList.getFocusRow();
					index = 0
				} else {
					row = viewModel.inventorybillList.getRowByRowId(rowId)
				}
				if (row.getValue("state") != 0) {
					toastr.warning("不处于待处理的单据不能编辑");
					return;
				}
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				viewModel.index = index;
				viewModel.rowId = row.rowId;
				var id = row.getValue("id");
				viewModel.inventorybillList.originEditData = row.getSimpleData();
				var stockOrgId = row.getValue("stockOrgId");
				$("#inventoryStorage").parent().attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}');
				if (viewModel.billPanelStatus() == "edit") {
					var grid = viewModel.app.getComp("grid_complexItem").grid;
					var batchNumCol = grid.getColumnByField("batchNumId");
					var parentGoodsCol = grid.getColumnByField("parentGoodsId");
					var positionCol = grid.getColumnByField("goodsPositionId");
					var batchCodeCol = grid.getColumnByField("batchCodeId");
					var supplierCol = grid.getColumnByField("supplierId");
					var projectCol = grid.getColumnByField("projectId");
					var stockStateCol = grid.getColumnByField("stockStateId");
					var customerCol = grid.getColumnByField("customerId");
					if (row.getValue("inventoryMode") == "GeneralCreate") { //是否是普通新增单据
						batchNumCol.options.editable = true;
						positionCol.options.editable = true;
						parentGoodsCol.options.editable = true;
						batchCodeCol.options.editable = true;
						supplierCol.options.editable = true;
						projectCol.options.editable = true;
						stockStateCol.options.editable = true;
						customerCol.options.editable = true;
						billCreateType = "1";
					} else {
						batchNumCol.options.editable = false;
						positionCol.options.editable = false;
						positionCol.options.editOptions.required = false;
						parentGoodsCol.options.editable = false;
						batchCodeCol.options.editable = false;
						supplierCol.options.editable = false;
						projectCol.options.editable = false;
						stockStateCol.options.editable = false;
						customerCol.options.editable = false;
						billCreateType = "0";
					}
				}
				//查询子表数据
				viewModel.findByParentid(id, function (data) {
					data.inventoryItems.forEach(function (item) {
						item.batchCodeName = item.batchCodeCode;
						item.batchNumName = item.batchNumCode;
					});
					viewModel.inventorybillList.setSimpleData(data);
					viewModel.inventoryItems.setSimpleData(data.inventoryItems, {
						unSelect: true
					});
					viewModel.goBillPanel();
				});

			},
			detail: function () {
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.inventorybillList.getCurrentRow();
					var id = curRow.getValue("id");
					viewModel.initBPMFromBill(id, viewModel);
					viewModel.findByParentid(id, function (data) {
						data.inventoryItems.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
							item.batchNumName = item.batchNumCode;
						});
						curRow.setSimpleData(data);
						viewModel.inventoryItems.setSimpleData(data.inventoryItems, {
							unSelect: true
						});
					});
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
					viewModel.goDetailPanel();
				}, 0);
			},
			detail2bill: function () {
				var state = viewModel.inventorybillList.getValue("state");
				if (state != 0) {
					toastr.warning("待处理的单据才可进入编辑页面");
					return;
				}
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				common.bill.detail2bill();
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
			//跳转单据详情页
			showBillDetail: function () {
				$(".ui-list-panel").addClass("animated slideInLeft");
				$(".ui-bill-panel").addClass("animated slideOutDown");
			},
			//新增子表项
			addItem: function () {
				viewModel.inventoryItems.createEmptyRow();
			},
			//删除子表项
			delItems: function () {
				var selectedRows = viewModel.inventoryItems.getSelectedRows();
				selectedRows.forEach(function (row, index, arr) {
					row.setValue("dr", "1");
				});
				viewModel.inventoryItems.removeRows(selectedRows);
			},
			//删除所有子表项
			delAllItems: function () {
				var allRows = viewModel.inventoryItems.getAllRealRows();
				allRows.forEach(function (row) {
					row.setValue("dr", "1");
				});
				viewModel.inventoryItems.removeRows(allRows);
			},
			//判断商品行仓库和批次号
			checkEmpty: function () {
				var allItemRows = viewModel.inventoryItems.getAllRealRows();
				var ifSlotManage = viewModel.inventorybillList.getValue("ifSlotManage");
				var emptyBatchRows = "",
					emptyPositionRows = "";
				var emptyBatchNoRows = "",
					emptyInvStateRows = "";
                var emptyGoodsOptRows = "";
				if (allItemRows.length > 0) {
					allItemRows.forEach(function (item) {
						if (parseFloat(item.getValue("enableBatchNumberManage")) == 1 && !(item.getValue("batchNumId"))) {
							emptyBatchRows += item.getValue("rowNum") + ",";
						}
						if (!item.getValue("goodsPositionId") && ifSlotManage == "1") {
							emptyPositionRows += item.getValue("rowNum") + ",";
						}
						if (parseFloat(item.getValue("enableBatchNoManage")) == 1 && !(item.getValue("batchCodeId"))) {
							emptyBatchNoRows += item.getValue("rowNum") + ",";
						}
						if (!item.getValue("stockStateId") && parseFloat(item.getValue("enableInvStatusManage")) == 1) {
							emptyInvStateRows += item.getValue("rowNum") + ",";
						}
                        if(!item.getValue("goodsSelection") && parseFloat(item.getValue("isOptional")) == 1){
                            emptyGoodsOptRows += item.getValue("rowNum") + ",";
                        }

					});
					emptyBatchRows = emptyBatchRows.slice(0, emptyBatchRows.length - 1);
					emptyPositionRows = emptyPositionRows.slice(0, emptyPositionRows.length - 1);
					emptyBatchNoRows = emptyBatchNoRows.slice(0, emptyBatchRows.length - 1);
					emptyInvStateRows = emptyInvStateRows.slice(0, emptyPositionRows.length - 1);
                    emptyGoodsOptRows = emptyGoodsOptRows.slice(0, emptyGoodsOptRows.length - 1);
					if (emptyBatchRows || emptyPositionRows || emptyBatchNoRows || emptyInvStateRows || emptyGoodsOptRows) {
						if (emptyBatchRows) toastr.warning("行号" + emptyBatchRows + "的商品启用了批次号，请填写批次号");
						if (emptyPositionRows) toastr.warning("请为行号" + emptyPositionRows + "的商品选择货位");
						if (emptyBatchNoRows) toastr.warning("行号" + emptyBatchNoRows + "的商品启用了批号，请填写批号");
						if (emptyInvStateRows) toastr.warning("请为行号" + emptyInvStateRows + "的商品选择库存状态");
						if(emptyGoodsOptRows)toastr.warning("请为行号" + emptyGoodsOptRows + "的商品添加选配");
						return false;
					} else {
						return true;
					}
				}
			},
			//保存单据
			saveBill: function (btn) {
				var index = viewModel.index;
				var validate = $(".ui-bill-panel")[0];
				var grid_complex = app.getComp("grid_complex").grid;

				//判断批次号及货位------ start
				if (viewModel.billPanelStatus() == "default") {
					if (!viewModel.checkEmpty()) {
						return;
					};
				}
				//判断批次号及货位------- end
				var result = app.compsValidateMultiParam({
					element: validate,
					showMsg: true
				});
				if (!result.passed) {
					return;
				};
				var complexData = viewModel.inventorybillList.getCurrentRow().getSimpleData();
				var inventoryItemsData = viewModel.inventoryItems.getSimpleData();
				if (viewModel.index == -1) {
					inventoryItemsData.forEach(function (item) {
						item.persistStatus = 'new';
					});
				}
				var hasValue = false;
				var unanimousAccount = "1";
				inventoryItemsData.map(function (item) {
					if (item.inventoryNum) {
						hasValue = true;
					} else if (item.inventoryNum == null) {
						hasValue = false
					}
					// 判断子表账实一致
					if (item.unanimousAccount == "0") {
						unanimousAccount = "0"
					}
				});
				if (btn == "save") {
					if (hasValue) {
						complexData.status = "02";
						complexData.operationCode = "02";
					} else {
						complexData.status = "01";
						complexData.operationCode = "01";
					}
					complexData.state = 0;
				} else if (btn == "saveSubmit") {
					complexData.state = 1;
					if (hasValue) {
						complexData.status = "03";
						complexData.operationCode = "03";
					} else {
						toastr.warning("盘点数量为空不可提交!");
						return;
					}
				};
				complexData.unanimousAccount = unanimousAccount;
				complexData.inventoryItems = inventoryItemsData;
				var _ajaxType = viewModel.inventorybillList.getValue("id") ? "put" : "post";
				if (_ajaxType == "post") {
					// complexData.state = 0;
					complexData.billType = "Inventory";
				}
				$._ajax({
					url: appCtx + viewModel.baseurl,
					type: _ajaxType,
					data: JSON.stringify(complexData),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.inventorybillList.getFocusRow().setSimpleData(data);
						grid_complex.repaintGridDivs();
						viewModel.retListPanel();
						viewModel.search();
					}
				})
			},
			//账面取数
			billnum: function () {
				var curList = viewModel.inventorybillList.getCurrentRow();
				var AllItems = viewModel.inventoryItems.getRealSimpleData();
				var AllItemsRows = viewModel.inventoryItems.getAllRows();
				var stockOrgId = curList.getValue("stockOrgId");
				var inventoryStorageId = curList.getValue("inventoryStorageId");
				if(AllItems.length <= 0){
					toastr.warning("请选择商品");
				}
				AllItems.forEach(function (item) {
					item.org = stockOrgId;
					item.warehouse = inventoryStorageId;
					item.batchNum = item.batchNumId;
					item.goods = item.goodsId ? item.goodsId : item.goods;
					item.position = item.goodsPositionId;
					item.project = item.projectId;
					item.inventoryState = item.stockStateId;
					item.batchCode = item.batchCodeId;
					item.parentgoods = item.parentGoodsId;
					item.supplier = item.supplierId;
					item.goodsOwner = item.customerId;
				});
				if (viewModel.billPanelStatus() == "default" || viewModel.billPanelStatus() == "edit") {
					if (!viewModel.checkEmpty()) {
						return;
					};
				}
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/get-goods-onhands",
					data: JSON.stringify(AllItems),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						for (var i = 0; i < AllItemsRows.length; i++) {
							var bfGoods = AllItemsRows[i].getValue("goodsId");
							var bfGoodsPosition = AllItemsRows[i].getValue("goodsPositionId");
							var bfBatchNum = AllItemsRows[i].getValue("batchNumId");
							var bfproject = AllItemsRows[i].getValue("projectId");
							var bfgoodsOwner = AllItemsRows[i].getValue("customerId");
							var bfstockState = AllItemsRows[i].getValue("stockStateId");
							var bfbatchCode = AllItemsRows[i].getValue("batchCodeId");
							var bfsupplier = AllItemsRows[i].getValue("supplierId");
							var bfgoodsSelection = AllItemsRows[i].getValue("goodsSelection");
							var afGoods = data[i].goods;
							var afGoodsPosition = data[i].position;
							var afBatchNum = data[i].batchNum;
							var afProject = data[i].project;
							var afinventoryState = data[i].inventoryState;
							var afbatchCode = data[i].batchCode;
							var afsupplier = data[i].supplier;
							var afgoodsOwner = data[i].goodsOwner;
							var afgoodsSelection = data[i].goodsSelection;

							if (bfGoods == afGoods && bfGoodsPosition == afGoodsPosition && bfBatchNum == afBatchNum &&
								bfproject == afProject && bfstockState == afinventoryState && bfbatchCode == afbatchCode &&
								bfsupplier == afsupplier && bfgoodsSelection == afgoodsSelection && bfgoodsOwner == afgoodsOwner) {
								AllItemsRows[i].setValue("accountsNum", data[i].onhandNum);
							}
						}
					}
				})
			},
			//自动取数
			autonum: function () {
				var items = viewModel.inventoryItems.getAllRealRows();
				var curRow = viewModel.inventorybillList.getCurrentRow();
				items.map(function (item) {
					item.setValue("inventoryNum", item.getValue("accountsNum"));
					item.setValue("unanimousAccount", "1");
					item.setValue("isManual", "0");
					item.setValue("subNum", "0");
					item.setValue("adjustmentNum", "0");
				});
				curRow.setValue("status", "02");
			},
			//手动录入
			Manualnum: function () {
				var grid = viewModel.app.getComp("grid_complexItem").grid;
				var inventoryNumCol = grid.getColumnByField("inventoryNum");
				inventoryNumCol.options.editable = true;
				grid.repaintGridDivs();
			},
			//提交
			submitBtn: function () {
				var listCompId = "inventorybillList";
				var nodeJs = "/ocm-web/pages/inventorybill/inventorybill.js";
				var billTypeCode = "Inventory";
				var tranTypeCode = null;
				var callback = null;
				viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
			},
			//收回
			backBtn: function () {
				var listCompId = "inventorybillList";
				var billTypeCode = "Inventory";
				var tranTypeCode = null;
				var callback = null;
				viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
			},
			cancelBill: function () {
				viewModel.inventoryItems.removeAllRows();
				var curRow = viewModel.inventorybillList.getCurrentRow();
				// 修改，则还原
				if (curRow.getValue("id")) {
					curRow.setSimpleData(viewModel.inventorybillList.originEditData)
				}
				// 新增或复制，则删除
				else {
					viewModel.inventorybillList.removeRow(curRow);
					viewModel.inventoryItems.removeAllRows();
				}
				viewModel.retListPanel();
				viewModel.search();
				var grid = viewModel.app.getComp("grid_complexItem").grid;
				grid.gridCompColumnArr[4].options.editable = false;
				grid.repaintGridDivs();
				$("#inventoryStorage input").removeAttr('placeholder');
			},
			//审批通过
			approve: function () {
				var listCompId = "inventorybillList";
				var billTypeCode = "Inventory";
				var tranTypeCode = null;
				var withBpmCallback = function () {
					viewModel.detail();
				};
				var withoutBpmCallback = null;
				viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);
			},
			//审核不通过
			disapprove: function () {
				var listCompId = "inventorybillList";
				var billTypeCode = "Inventory";
				var tranTypeCode = null;
				var withBpmCallback = function () {
					viewModel.detail();
				};
				var withoutBpmCallback = null;
				viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);
			},
			//取消审批
			unapprove: function () {
				var listCompId = "inventorybillList";
				var billTypeCode = "Inventory";
				var tranTypeCode = null;
				var withBpmCallback = function () {
					viewModel.detail();
				};
				var withoutBpmCallback = null;
				viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);
			},
			//冻结
			freeze: function () {

			},
			//解冻
			unfreeze: function () {

			},
			//关闭商品
			closeItems: function () {
				var selectedRows = viewModel.inventoryItems.getSelectedRows();
				var ids = selectedRows.map(function (row, index, arr) {
					return row.getValue("id");
				})
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/batch-close-items",
					data: {
						ids: ids.join(",")
					},
					success: function (res) {
						for (var i = 0; i < selectedRows.length; i++) {
							selectedRows[i].setValue("isClosed", "1");
						}
					}
				})
			},
			//打开商品
			openItems: function () {
				var selectedRows = viewModel.inventoryItems.getSelectedRows();
				var ids = selectedRows.map(function (row, index, arr) {
					return row.getValue("id");
				})
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "//batch-open-items",
					data: {
						ids: ids.join(",")
					},
					success: function (res) {
						for (var i = 0; i < selectedRows.length; i++) {
							selectedRows[i].setValue("isClosed", "1");
						}
					}
				})
			},
			//参照选择批量新增子表（销售产品）
			showAddItemsRef: function () {
				var curRow = viewModel.inventorybillList.getCurrentRow().getSimpleData();
				if (curRow.stockOrgId && curRow.inventoryStorageId) {
					viewModel.clearItemsRef("productref");
					$("#addItemsRef .refer").trigger("click");
				} else {
					toastr.warning("请先选择库存组织及盘点仓库");
				}
			},
			//参照仓库按钮
			showAddwarehouseRef: function () {
				var row = viewModel.inventorybillList.getCurrentRow();
				var stockOrgId = row.getValue("stockOrgId");
				viewModel.clearItemsRef("warehouseref");
				if (stockOrgId) {
					$("#warehouseRef").attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}');
					$("#warehouseRef .refer").trigger("click");
				} else {
					toastr.warning("请选择库存组织");
				}
			},
			//参照货位按钮
			showAddGoodPoRef: function () {
				viewModel.clearItemsRef("goodPoRef");
				var row = viewModel.inventorybillList.getCurrentRow();
				var stockOrgId = row.getValue("stockOrgId"); //
				var inventoryStorageId = row.getValue("inventoryStorageId");
				if (inventoryStorageId && stockOrgId) {
					$("#goodPoRef").attr("data-refparam", '{"EQ_wareHouse":"' + inventoryStorageId + '","EQ_isFinal":"1"}');
					$("#goodPoRef .refer").trigger("click");
				} else {
					toastr.warning("请选择库存组织和仓库");
				}
			},
			showAddSupplierRef: function () {
				viewModel.clearItemsRef("supplierRef");
				$("#supplierRef .refer").trigger("click");
			},
			//清空已选销售产品参照
			clearItemsRef: function (refname) {
				viewModel.ItemRefList.setValue(refname, "");
				var refer = $("#refContainer" + refname + "").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},

			//存货仓库按钮
			showAddstockRef: function () {
				viewModel.searchcomp2.clearSearch();
				viewModel.stockItemsSearchParam.removeAllRows();
				// viewModel.removeAllreferRows();
				var curRow = viewModel.inventorybillList.getCurrentRow();
				var orgId = curRow.getValue("stockOrgId");
				var inventoryStorageId = curRow.getValue("inventoryStorageId");
				if (!orgId || !inventoryStorageId) {
					toastr.warning("请选择库存组织和仓库");
					return;
				}
				if (!viewModel.referstockrefdialog) {
					viewModel.referstockrefdialog = u.dialog({
						id: 'dialog_referstockref',
						content: "#dialog_referstockref",
						hasCloseMenu: true,
						width: "65%"
					});
					var closefunc = function () {
						viewModel.stockItemsSearchParam.removeAllRows();
						viewModel.stockreferItems.removeAllRows();
						viewModel.referstockrefdialog.close();
						viewModel.searchcomp2.clearSearch();
                        $("#refContainergoodsRef").data("uui.refer").setValue(null);
					}
					var cancelButton = $("#dialog_referstockref .J-cancel");
					var closeButton = $("#dialog_referstockref .u-msg-close");
					var okButton = $("#dialog_referstockref .J-ok");
					okButton.off().on("click", function () {
						viewModel.confirmReferStock();
					});
					cancelButton.off().on('click', closefunc);
					closeButton.off().on('click', closefunc);
				} else {
					viewModel.referstockrefdialog.show();
				}
			},
			//存货参照确认
			confirmReferStock: function () {
				var selRows = viewModel.stockreferItems.getSelectedRows();
				viewModel.currowNum(0);
				for (var i = 0; i < selRows.length; i++) {
					var itemInfo = selRows[i].getSimpleData();
					var rowNum = viewModel.generateRowNum();
					itemInfo.rowNum = rowNum;
					itemInfo.unitId = itemInfo.unit;
					itemInfo.batchNumId = itemInfo.batchNum;
					itemInfo.batchNumCode = itemInfo.batchNumName;
					itemInfo.goodsPositionId = itemInfo.position;
					itemInfo.goodsPositionName = itemInfo.positionName;
					itemInfo.accountsNum = itemInfo.onhandNum;
					itemInfo.goodsVersion = itemInfo.version;
					itemInfo.goodsId = itemInfo.goods;
					itemInfo.batchCodeId = itemInfo.batchCode;
					itemInfo.batchCodeName = itemInfo.batchCodeCode;
                    itemInfo.parentGoodsId = itemInfo.parentgoods;
					itemInfo.projectId = itemInfo.project;
					itemInfo.stockStateId = itemInfo.inventoryState;
					itemInfo.stockStateName = itemInfo.inventoryStateName;
					itemInfo.customerId = itemInfo.goodsOwner;
					itemInfo.supplierId = itemInfo.supplier;
					itemInfo.goodsSelectionDescription = itemInfo.goodsSelectionValue;
					viewModel.inventoryItems.addSimpleData(itemInfo);
				}
				viewModel.referstockrefdialog.close();
				viewModel.stockreferItems.removeAllRows();
				viewModel.selectedstockreferItems.removeAllRows();
				viewModel.searchcomp2.clearSearch();
			},

			//选择采购订单商品信息
			referSelectItemHandle: function (obj) {
				var id = obj.rowObj.value.id;
				var selectedRows = viewModel.stockreferItems.getSelectedRows();
				for (var i = 0; i < selectedRows.length; i++) {
					var itemInfo = selectedRows[i].getSimpleData();
					if (selectedRows[i].getValue("id") == id) {
						viewModel.selectedstockreferItems.addSimpleData(itemInfo, {
							unSelect: true
						});
					}
				}
			},
			referUnSelectItemHandle: function (obj) {
				var itemId = obj.rowObj.value.id;
				var itemrows = viewModel.selectedstockreferItems.getAllRows();
				for (var i = itemrows.length - 1; i >= 0; i--) {
					if (itemrows[i].getValue("id") == itemId) {
						viewModel.selectedstockreferItems.removeRows([i], {
							forceDel: true
						});
					}
				}
			},
			//导入
			importHandle: function () {
				var selectedRows = viewModel.inventorybillList.getSelectedRows();
				var ids = selectedRows.map(function (row, index, arr) {
					return row.getValue("id");
				})
				if (selectedRows.length < 1) {
					//TODO: tips替换
					toastr.warning("请选择一条操作的行");
					return;
				}
				var id = viewModel.inventorybillList.getSelectedRows()[0].getValue("id");
				var urlInfo = '/stock/inventory-bills-excel/excelDataImport'; //倒入地址参数
				urlInfo += "?inventorybillId=" + id;
				var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
				var ele = $('#importFiel')[0]; //挂载元素
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, "", function () {
					for (var i = 0; i < selectedRows.length; i++) {
						selectedRows[i].setValue("status", "02");
						selectedRows[i].setValue("operationCode", "02");
					}
				});
			},
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = '/stock/inventory-bills-excel/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
				var listData = viewModel.inventorybillList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
			},
			// 清空实盘
			clearnum: function () {

			},
			//调整
			adjust: function () {
				var selRows = viewModel.inventorybillList.getSelectedRows();
				//在调整前清除上一次调整过单据的缓存！！！！
				viewModel.otheroutList.removeAllRows();
				viewModel.otherinList.removeAllRows();
				if (selRows.length !== 1) {
					toastr.warning("请选择一条数据");
					return;
				};
				var id = selRows[0].getValue("id");
				$._ajax({
					url: appCtx + viewModel.baseurl + "/adjustment",
					type: 'post',
					data: {
						id: id
					},
					success: function (data) {
						$("#tab-in").hide().removeClass("is-active");
						$("#tab-out").hide().removeClass("is-active");
						$("#tab-panel-in").removeClass("is-active");
						$("#tab-panel-out").removeClass("is-active");
						if (data.otherInBillDto && !data.otherOutBillDto) {
							$("#tab-in").show().addClass("is-active");
							$("#tab-panel-in").addClass("is-active");
							var List = data.otherInBillDto;
							List.totalFactInNum = Math.abs(List.totalFactInNum);
							var initems = List.otherInBillItems;
							var inBomItems = List.otherInBillItemBoms;
							viewModel.currowNum(0);
							viewModel.currowBomNum(0);
							for (var j = 0; j < initems.length; j++) {
								var rowNum = viewModel.generateRowNum();
								initems[j].rowNum = rowNum;
								initems[j].factInNum = Math.abs(initems[j].factInNum);
								initems[j].shouldInNum = Math.abs(initems[j].shouldInNum);
								inBomItems.forEach(function (item) {
									var bomRowNum = viewModel.generateBomrowNum();
									item.rowNum = bomRowNum;
									item.parentRowNum = initems[j].rowNum;
									item.factInNum = Math.abs(item.factInNum);
									item.shouldInNum = Math.abs(item.shouldInNum);
								});
							}
							viewModel.otherinList.setSimpleData(List);
							viewModel.otherinItem.setSimpleData(initems);
							viewModel.otherinBom.setSimpleData(inBomItems);
							viewModel.billPanelStatus(BILLPANELSTATUS.ADJUST);
							viewModel.goAdjustPanel();
						}
						if (data.otherOutBillDto && !data.otherInBillDto) {
							$("#tab-out").show().addClass("is-active");
							$("#tab-panel-out").addClass("is-active");
							var List = data.otherOutBillDto;
							List.totalFactOutNum = Math.abs(List.totalFactOutNum);
							var outitems = List.otherOutBillItems;
							var outBomItems = List.otherOutBillItemBoms;
							viewModel.currowNum(0);
							viewModel.currowBomNum(0);
							for (var j = 0; j < outitems.length; j++) {
								var rowNum = viewModel.generateRowNum();
								outitems[j].rowNum = rowNum;
								outitems[j].factOutNum = Math.abs(outitems[j].factOutNum);
								outitems[j].shouldOutNum = Math.abs(outitems[j].shouldOutNum);
								outBomItems.forEach(function (item) {
									var bomRowNum = viewModel.generateBomrowNum();
									item.rowNum = bomRowNum;
									item.parentRowNum = outitems[j].rowNum;
									item.factOutNum = Math.abs(item.factOutNum);
									item.shouldOutNum = Math.abs(item.shouldOutNum);
								});
							}
							viewModel.otheroutList.setSimpleData(List);
							viewModel.otheroutItem.setSimpleData(outitems);
							viewModel.otheroutBom.setSimpleData(outBomItems);
							viewModel.billPanelStatus(BILLPANELSTATUS.ADJUST);
							viewModel.goAdjustPanel();
						}
						if (data.otherOutBillDto && data.otherInBillDto) {
							$("#tab-out").show().addClass("is-active");
							$("#tab-panel-out").addClass("is-active");
							$("#tab-in").show();
							var outList = data.otherOutBillDto;
							outList.totalFactOutNum = Math.abs(outList.totalFactOutNum);
							var inList = data.otherInBillDto;
							var initems = inList.otherInBillItems;
							var outitems = outList.otherOutBillItems;

							var inBomItems = inList.otherInBillItemBoms;
							var outBomItems = outList.otherOutBillItemBoms;
							viewModel.currowNum(0);
							viewModel.currowBomNum(0);
							for (var j = 0; j < initems.length; j++) {
								var rowNum = viewModel.generateRowNum();
								initems[j].rowNum = rowNum;
								initems[j].factInNum = Math.abs(initems[j].factInNum);
								initems[j].shouldInNum = Math.abs(initems[j].shouldInNum);
								inBomItems.forEach(function (item) {
									var bomRowNum = viewModel.generateBomrowNum();
									item.rowNum = bomRowNum;
									item.parentRowNum = initems[j].rowNum;
									item.factInNum = Math.abs(item.factInNum);
									item.shouldInNum = Math.abs(item.shouldInNum);
								});
							}
							viewModel.currowNum(0);
							viewModel.currowBomNum(0);
							for (var k = 0; k < outitems.length; k++) {
								var rowNum = viewModel.generateRowNum();
								outitems[k].rowNum = rowNum;
								outitems[k].factOutNum = Math.abs(outitems[k].factOutNum);
								outitems[k].shouldOutNum = Math.abs(outitems[k].shouldOutNum);
								outBomItems.forEach(function (item) {
									var bomRowNum = viewModel.generateBomrowNum();
									item.rowNum = bomRowNum;
									item.parentRowNum = outitems[k].rowNum;
									item.factOutNum = Math.abs(item.factOutNum);
									item.shouldOutNum = Math.abs(item.shouldOutNum);
								});
							}
							viewModel.otherinList.setSimpleData(inList);
							viewModel.otheroutList.setSimpleData(outList);
							viewModel.otherinItem.setSimpleData(initems);
							viewModel.otherinBom.setSimpleData(inBomItems);
							viewModel.otheroutItem.setSimpleData(outitems);
							viewModel.otheroutBom.setSimpleData(outBomItems);
							viewModel.billPanelStatus(BILLPANELSTATUS.ADJUST);
							viewModel.goAdjustPanel();
						}
					}
				});

			},
			//取消调整
			unAdjust: function () {
				var selRows = viewModel.inventorybillList.getSelectedRows();
				if (selRows.length !== 1) {
					toastr.warning("请选择一条数据");
					return;
				};
				var id = selRows[0].getValue("id");
				common.dialog.confirmDialog({
					msg1: '取消调整将删除对应下游单据。',
					msg2: '此操作不可逆，请确认删除？',
					width: '400px',
					type: 'error',
					onOk: function () {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/cancel-adjustment",
							type: "post",
							data: {
								id: id
							},
							success: function (data) {}
						});
					}
				});
			},
			saveAdjust: function () {
				var savedata = {};
				var otherOutBillDto = viewModel.otheroutList.getSimpleData()[0],
					otherInBillDto = viewModel.otherinList.getSimpleData()[0],
					otherOutItems = viewModel.otheroutItem.getSimpleData(),
					otherInItems = viewModel.otherinItem.getSimpleData(),
					otherOutItemBoms = viewModel.otheroutBom.getSimpleData(),
					otherInItemBoms = viewModel.otherinBom.getSimpleData();
				otherOutItems.forEach(function (item) {
					item.persistStatus = 'new';
				});
				otherInItems.forEach(function (item) {
					item.persistStatus = 'new';
				});
				otherOutItemBoms.forEach(function (item) {
					item.persistStatus = 'new';
				});
				otherInItemBoms.forEach(function (item) {
					item.persistStatus = 'new';
				});
				if (otherOutBillDto) otherOutBillDto.otherOutBillItems = otherOutItems;
				if (otherOutBillDto) otherOutBillDto.otherOutBillItemBoms = otherOutItemBoms;
				if (otherInBillDto) otherInBillDto.otherInBillItems = otherInItems;
				if (otherInBillDto) otherInBillDto.otherInBillItemBoms = otherInItemBoms;
				savedata.otherOutBillDto = otherOutBillDto;
				savedata.otherInBillDto = otherInBillDto;
				$._ajax({
					url: appCtx + viewModel.baseurl + "/adjustment-save",
					type: "post",
					data: JSON.stringify(savedata),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.retListPanel();
					}
				});

			},
			// 返回列表页
			retListPanel: function () {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
				common.bill.retListPanel();
			},
			//日期
			getCurDate: function (row) {
				// 服务器时间获取
				$._ajax({
					type: "post",
					url: appCtx + '/stock/common/get-current-date',
					success: function (data) {
						var truetime = u.date.format(data, 'YYYY/MM/DD');
						truetime = new Date(truetime).getTime();
						if (row) {
							row.setValue("billDate", truetime);
							row.setValue("inventoryDate", truetime);
						}
						viewModel.curDate(truetime);
					}
				});
			},
			// 从行号池中拿到最新的行号
			generateRowNum: function () {
				var latestnum = viewModel.currowNum(),
					newnum = parseFloat(latestnum) + 10;
				viewModel.currowNum(newnum);
				return newnum;
			},
			getCurrowNum: function () {
				var data = viewModel.inventoryItems.getSimpleData();
				var maxrowNum = 0;
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].rowNum > maxrowNum) {
							maxrowNum = data[i].rowNum;
						}
					}
				}
				viewModel.currowNum(maxrowNum);
			},

			// 从行号池中拿到最新的bom行号
			generateBomrowNum: function () {
				var latestnum = viewModel.currowBomNum(),
					newnum = parseFloat(latestnum) + 10;
				viewModel.currowBomNum(newnum);
				return newnum;
			},

			getSum: function (array) {
				var sum = 0;
				for (var i = 0; i < array.length; i++) {
					sum += parseInt(array[i]);
				}
				return sum;
			},
			// 选配
			goodsOpt: function (obj) {
				if (billCreateType == "0") {
					obj.gridObj.viewModel.goodsOptDetails(obj);
				} else {
					var viewModel = obj.gridObj.viewModel;
					var goodsSelectionDescription = obj.row.value.goodsSelectionDescription; // 选配Name
					var optName = goodsSelectionDescription ? goodsSelectionDescription : '添加选配';
					var detailfun = "data-bind=click:goodsOptionalFun.bind($data," + obj.rowIndex + ")";
					obj.element.innerHTML =
						'<a href="#" class="ui-a-detail" ' +
						detailfun +
						">" + optName + "</a>";
					ko.cleanNode(obj.element);
					ko.applyBindings(viewModel, obj.element);
				}
			},
			// 查看选配
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
			goodsOptionalFun: function (obj) {
				/**
				 * @example 编辑选配common.goodsOptional.goodsOptional()
				 * @param viewModel 当前viewModel, 用来挂载dialog
				 * @param title     弹窗title
				 * @param goodsId   商品行Id
				 * @param goodsSelection   选配结果id
				 * @param el        dialog id (不加 ‘#’)
				 * @param callback  确定是回调函数*   需要把信息保存到订单杭上， 如果是新增，就调用当前功能新增接口，编辑同理
				 * @function callback --> 保存后拿到选配id 饭后添加到订单行上
				 * @param  callback --> 保存后的选配信息做展示
				 * @param  callback --> 保存后的选配信息做展示
				 * @param  callback --> 成功后调取回调，关闭弹窗
				 */
				var data = viewModel.inventoryItems.getSimpleData()[obj];
				var thisDatable = viewModel.inventoryItems.getAllRealRows()[obj];
				var id = data.goodsId;
				var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
				common.goodsOptional.goodsOptional(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptional', viewModel.inventoryItems, viewModel.inventoryItems, function (goodsOptData, goodsOptID, cb) {
					console.log(goodsOptID[0]);
					/**
					 * 循环遍历返回结果，拼接后展示
					 */
					var goodsOpt = goodsOptID[0].goodsOptDtos; // 选配与商品结构互斥，暂时理解为有子件的话不会出现选配信息 故只去第0项
					//获取全部bom信息
					var allrows = viewModel.inventoryItems.getAllRealRows();
					var bomdata = viewModel.inventoryItems.getRealSimpleData();
					//获取全部bom信息
					for (var i = 0; i < bomdata.length; i++) {
						for (var j = 0; j < goodsOpt.length; j++) {
							if (bomdata[i].goodsId == goodsOpt[j].goodsId && goodsOpt[j].optResult) {
								allrows[i].setValue("goodsSelection", goodsOpt[j].id);
								allrows[i].setValue("goodsSelectionDescription", goodsOpt[j].optResult);
							}
						}
					}
					var optResult = '',
						id = '';
					for (var i = 0; i < goodsOpt.length; i++) {
						optResult += goodsOpt[i].optResult + ';';
						id += goodsOpt[i].id + ';';
					}
					optResult = optResult.substr(0, optResult.length - 1);
					id = id.substr(0, id.length - 1);
					thisDatable.setValue('goodsSelection', id);
					thisDatable.setValue('goodsSelectionDescription', optResult);
					cb();
				});
			},
			goodsOptDetailsFun: function (obj) {
				/**
				 * @example 查看选配common.goodsOptional.OptionalDetails()
				 * @param viewModel 当前viewModel, 用来挂载dialog
				 * @param title     弹窗title
				 * @param goodsId   商品行Id
				 * @param el        dialog id (不加 ‘#’)
				 */
				var data = viewModel.inventoryItems.getSimpleData()[obj];
				var id = data.goodsId;
				var goodsSelection = data.goodsSelection ? data.goodsSelection : "";

				common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.inventoryItems, viewModel.inventoryItems);
			},
		},
		afterCreate: function () {
			viewModel = u.extend(viewModel, bpmopenbill.model);
			//枚举
			$._ajax({
				type: "get",
				url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
				data: {
					cust_doc_code_batch: "QY102,QY103,QY104"
				},
				success: function (data) {
					var combodata = common.dataconvert.toMap(data["QY102"], "name", "code");
					var combodata1 = common.dataconvert.toMap(data["QY103"], "name", "code");
					var combodata2 = common.dataconvert.toMap(data["QY104"], "name", "code");
					viewModel.arrivalBelongDataSource(combodata);
					viewModel.orderTypeSource(combodata1);
					viewModel.purchaseTypeSource(combodata2);
				}
			});

			// 子表参照聚焦行，用于绑定子表参照组件
			var refRow = viewModel.ItemRefList.createEmptyRow();
			viewModel.ItemRefList.setRowFocus(refRow);
			// 确定销售产品参照，为产品组合子表增行
			viewModel.ItemRefList.on("productref.valuechange", function (obj) {
				// 清空参照时不增行
				if (!obj.newValue) {
					return;
				}
				var refer = $("#refContainerproductref").data("uui.refer");
				var refValues = refer.values;
				var tranType = viewModel.inventorybillList.getValue("tranTypeId");
				if (refValues && refValues.length > 0) {
					for (var i = 0; i < refValues.length; i++) {
						var rowNum = viewModel.generateRowNum();
						var id = refValues[i].refpk;
						var newrow = viewModel.inventoryItems.createEmptyRow({
							unSelect: true
						});
						newrow.setValue("rowNum", rowNum);
						newrow.setValue("goodsId", refValues[i].refpk);
						newrow.setValue("goodsCode", refValues[i].refcode);
						newrow.setValue("goodsName", refValues[i].refname);
						newrow.setValue("goodsVersion", refValues[i].version);
						newrow.setValue("unitId", refValues[i].basicUnitId);
						newrow.setValue("unitName", refValues[i].basicUnitName);
						// 批次信息管理
						newrow.setValue("enableBatchNumberManage", refValues[i].enableBatchNumberManage);
						newrow.setValue("enableBatchNoManage", refValues[i].enableBatchNoManage);
						newrow.setValue("enableInvStatusManage", refValues[i].enableInvStatusManage);
						newrow.setValue("productLineId", refValues[i].productLineId);
						newrow.setValue("productId", refValues[i].productId);
                        newrow.setValue("isOptional", refValues[i].isOptional);
					}
				}
			});

			// 整仓新增
			viewModel.ItemRefList.on("warehouseref.valuechange", function (obj) {
				// 清空参照时不增行
				if (!obj.newValue) {
					return;
				}
				var curRow = viewModel.inventorybillList.getCurrentRow();
				var btnStorageRefer = $("#refContainerwarehouseref").data("uui.refer");
				var listStorageRefer = $("#refContainerinventoryStorageRefer").data("uui.refer");
				var refValues = btnStorageRefer.values;
				var id = refValues[0].id;
				var orgId = curRow.getValue("stockOrgId");
				$("#inventoryStorage").removeAttr('placeholder');
				listStorageRefer.setValue(refValues);
				$("#inventoryStorage input").val(refValues[0].refname);
				curRow.setValue("inventoryStorageId", refValues[0].refpk);
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + "/get-goods-by-warehouse",
					dataType: "json",
					data: {
						wareHouse: id,
						orgId: orgId
					},
					success: function (data) {
						for (var i = 0; i < data.length; i++) {
							var rowNum = viewModel.generateRowNum();
							data[i].rowNum = rowNum;
							data[i].accountsNum = data[i].onhandnum;
							data[i].goodsPositionId = data[i].positionId;
							data[i].goodsPositionName = data[i].positionName;
							data[i].goodsPositionCode = data[i].positionCode;
							data[i].goodsVersion = data[i].version;
							data[i].supplierId = data[i].supplier;
							data[i].projectId = data[i].project;
							data[i].stockStateId = data[i].inventoryState;
							data[i].batchCodeId = data[i].batchCode;
							data[i].goodsSelectionDescription = data[i].goodsSelectionValue;
							data[i].batchCodeName = data[i].batchCodeCode;
							data[i].batchNumName = data[i].batchNumCode;
							data[i].customerId = data[i].customerId ? data[i].customerId : data[i].goodsOwner;
                            data[i].customerName = data[i].customerName ? data[i].customerName : data[i].goodsOwnerName;
						}
						viewModel.inventoryItems.setSimpleData(data);
					}
				})
			});

			// 货位新增
			viewModel.ItemRefList.on("goodPoRef.valuechange", function (obj) {
				// 清空参照时不增行
				if (!obj.newValue) {
					return;
				}
				var curRow = viewModel.inventorybillList.getCurrentRow();
				var refer = $("#refContainergoodPoRef").data("uui.refer");
				var refValues = refer.values;
				// 货位Id
				var id = refValues[0].id;
				// 库存组织id
				var orgId = curRow.getValue("stockOrgId");
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + "/get-goods-by-position",
					dataType: "json",
					data: {
						goodsPosition: id,
						orgId: orgId
					},
					success: function (data) {
						for (var i = 0; i < data.length; i++) {
							var rowNum = viewModel.generateRowNum();
							data[i].rowNum = rowNum;
							data[i].accountsNum = data[i].onhandnum;
							data[i].goodsPositionId = data[i].positionId;
							data[i].goodsPositionName = data[i].positionName;
							data[i].goodsPositionCode = data[i].positionCode;
							data[i].goodsVersion = data[i].version;
							data[i].supplierId = data[i].supplier;
							data[i].projectId = data[i].project;
							data[i].stockStateId = data[i].inventoryState;
							data[i].batchCodeId = data[i].batchCode;
							data[i].goodsSelectionDescription = data[i].goodsSelectionValue;
							data[i].batchCodeName = data[i].batchCodeCode;
							data[i].batchNumName = data[i].batchNumCode;
                            data[i].customerId = data[i].customerId ? data[i].customerId : data[i].goodsOwner;
                            data[i].customerName = data[i].customerName ? data[i].customerName : data[i].goodsOwnerName;
                        }
						viewModel.inventoryItems.setSimpleData(data);
					}
				});
			});

			//供应商新增
			viewModel.ItemRefList.on("supplierRef.valuechange", function (obj) {
				// 清空参照时不增行
				if (!obj.newValue) {
					return;
				}
				var curRow = viewModel.inventorybillList.getCurrentRow();
				var refer = $("#refContainersupplierRef").data("uui.refer");
				var refValues = refer.values;

				// 库存组织id
				var orgId = curRow.getValue("stockOrgId");
				var warehouseId = curRow.getValue("inventoryStorageId");
				var supplierId = refValues[0].refpk;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + "/get-goods-by-supplier",
					dataType: "json",
					data: {
						warehouse: warehouseId,
						orgId: orgId,
						supplier: supplierId
					},
					success: function (data) {
						for (var i = 0; i < data.length; i++) {
							var rowNum = viewModel.generateRowNum();
							data[i].rowNum = rowNum;
							data[i].accountsNum = data[i].onhandnum;
							data[i].goodsPositionId = data[i].positionId;
							data[i].goodsPositionName = data[i].positionName;
							data[i].goodsPositionCode = data[i].positionCode;
							data[i].goodsVersion = data[i].version;
							data[i].supplierId = data[i].supplier;
							data[i].projectId = data[i].project;
							data[i].stockStateId = data[i].inventoryState;
							data[i].batchCodeId = data[i].batchCode;
							data[i].goodsSelectionDescription = data[i].goodsSelectionValue;
							data[i].batchCodeName = data[i].batchCodeCode;
							data[i].batchNumName = data[i].batchNumCode;
                            data[i].customerId = data[i].customerId ? data[i].customerId : data[i].goodsOwner;
                            data[i].customerName = data[i].customerName ? data[i].customerName : data[i].goodsOwnerName;
                        }
						viewModel.inventoryItems.setSimpleData(data);
					}
				});
			});

			// 库存组织
			viewModel.inventorybillList.on("stockOrgId.valuechange", function (obj) {
				viewModel.delAllItems();
				var row = viewModel.inventorybillList.getCurrentRow();
				var stockOrgId = row.getValue("stockOrgId");
				$("#inventoryStorageRefer").parent().attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}');
				if (stockOrgId && viewModel.billPanelStatus() !== "warehouse") {
					viewModel.inventorybillList.setMeta("inventoryStorageId", "enable", true);
					$("#inventoryStorageRefer").removeAttr('placeholder');
				} else {
					viewModel.inventorybillList.setMeta("inventoryStorageId", "enable", false);
					$("#inventoryStorageRefer").attr('placeholder', "根据选择仓库自动带入");
				}
				if (!stockOrgId && viewModel.billPanelStatus() !== "warehouse") {
					viewModel.inventorybillList.setMeta("inventoryStorageId", "enable", false);
					$("#inventoryStorageRefer").attr('placeholder', "请先选择库存组织");
				}
				row.setValue("inventoryStorageId", "");
			});
			// 仓库
			viewModel.inventorybillList.on("inventoryStorageId.valuechange", function (obj) {
				viewModel.delAllItems();
				var row = viewModel.inventorybillList.getCurrentRow();
				// var stockOrgId = row.getValue("stockOrgId");
				// // if(stockOrgId){
				// //   var refer = $("#refContainerstockOrgId").data("uui.refer");
				// //   refer.setValue(null);
				// //   // refer.blurEventVal();
				// // };
				// 仓库变化时改变是否启用货位管理字段
				var Storageref = $("#refContainerinventoryStorageRefer").data("uui.refer");
				if (obj.newValue) {
					if (Storageref.values && Storageref.values.length > 0) {
						row.setValue("ifSlotManage", Storageref.values[0].ifSlotManage);
					}
				} else {
					row.setValue("ifSlotManage", '0');
				}
				// 若仓库变化则清空之前选择的货位
				if (obj.oldValue && obj.oldValue != obj.newValue) {
					var itemrows = viewModel.inventoryItems.getAllRows();
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

				var inventoryStorageId = row.getValue("inventoryStorageId");
				viewModel.inventoryItems.setMeta("goodsPositionId", "refparam", '{"EQ_wareHouse":"' + inventoryStorageId + '","EQ_isFinal":"1"}');
			});
			//盘点数量 变化计算差异数量
			viewModel.inventoryItems.on("inventoryNum.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					var curRow = obj.rowObj;
					var accountsNum = curRow.getValue("accountsNum");
					var subNum = obj.newValue - accountsNum;
					curRow.setValue("subNum", Math.abs(subNum));
					curRow.setValue("adjustmentNum", subNum);
					curRow.setValue("isManual", "1");
					curRow.setValue("unanimousAccount", "0");
					if (subNum == 0) {
						curRow.setValue("unanimousAccount", "1");
					}
				}
			});
			//监听 差异数量
			viewModel.inventoryItems.on("subNum.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					var curRow = viewModel.inventoryItems.getCurrentRow();
					var subNum = obj.rowObj.getValue("subNum");
					if (subNum == "0") {
						curRow.setValue("unanimousAccount", "1");
					}
				}
			});

			//搜索条件 库存组织仓库过滤
			viewModel.searchcomp.viewModel.params.on("stockOrg.valuechange", function (obj) {
				if (obj.newValue != undefined && obj.newValue != "") {
					var stockOrgId = {
						"EQ_inventoryOrg.id": obj.newValue
					};
					$("#inventoryStorage").attr("data-refparam", JSON.stringify(stockOrgId));
				} else {
					$("#inventoryStorage").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
					viewModel.searchcomp.viewModel.params.setValue("inventoryStorage", "");
				}
			})

			//调整其他出入
			viewModel.otheroutItem.on("factOutNum.valuechange", function (obj) {
				var arr = viewModel.otheroutItem.getSimpleData();
				var amount = [];
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i].factOutNum) {
						arr[i].factOutNum = 0
					}
					var amountItem = parseFloat(arr[i].factOutNum)
					amount.push(amountItem);
				}
				viewModel.otheroutList.getCurrentRow().setValue("totalFactOutNum", viewModel.getSum(amount));
			});
			viewModel.otherinItem.on("factInNum.valuechange", function (obj) {
				var arr = viewModel.otherinItem.getSimpleData();
				var amount = [];
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i].factInNum) {
						arr[i].factInNum = 0
					}
					var amountItem = parseFloat(arr[i].factInNum)
					amount.push(amountItem);
				}
				viewModel.otherinList.getCurrentRow().setValue("totalFactInNum", viewModel.getSum(amount));
			});
		}
	});

	return view;
});