define(['text!./purchaseout.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
	'use strict'
	var viewModel, app;
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
			app = this.app;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/stock/purchase-out-bills',
			purchaseoutList: new u.DataTable(model.options.metas.complex),
			purchaseoutItems: new u.DataTable(model.options.metas.complexItem),

			BomItems: new u.DataTable(model.options.metas.BomItem),

			//拉单 采购订单
			referPurchaseorderList: new u.DataTable(model.options.metas.referPurchaseorder),
			//拉单 对应商品
			referPurchaseorderitemList: new u.DataTable(model.options.metas.referPurchaseorderitem),
			//拉单 已选择
			selectedreferList: new u.DataTable(model.options.metas.referPurchaseorder),
			selectedreferListItem: new u.DataTable(model.options.metas.referPurchaseorderitem),
			//新增 参照 搜索
			referPurchaseorderSearchParam: new DataTable(model.options.metas.referPurchaseorderSearch),
			ItemRefList: new u.DataTable(model.options.metas.ItemRef),
			searchcomp: {},
			searchcomp2: {},
			arrivalBelongDataSource: ko.observableArray([]),
			searchSource: model.options.searchs.search1,
			search2Source: model.options.searchs.search2,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button4Source: model.options.buttons.button4,

			card1Source: model.options.cards.card1,
			detail11Source: model.options.details.detail1,
			grid1Option: model.options.grids.grid1,
			//商品信息
			gridGoodsEdit: model.options.grids.gridGoodsEdit,
			gridGoodsDetail: model.options.grids.gridGoodsDetail,
			//BOM结构信息
			gridBomEdit: model.options.grids.gridBomEdit,
			gridBomDetail: model.options.grids.gridBomDetail,
			//拉单弹窗grid
			grid4Option: model.options.grids.grid4,
			grid5Option: model.options.grids.grid5,
			grid6Option: model.options.grids.grid6,
			grid7Option: model.options.grids.grid7,

			billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//跳转详情页
			goDetailPanel: common.bill.goDetailPanel,
			// 行号池
			currowNum: ko.observable(0),
			currowBomNum: ko.observable(0),
			// 是否bom页签
			isBomPanel: ko.observable(),
			curDate: ko.observable(),
			stockInType: ko.observableArray([]),
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
			status: ko.pureComputed(function () {
				var enableStatus = viewModel.purchaseoutList.ref("status")();
				switch (enableStatus) {
					case '01':
						return "自由态";
					case '02':
						return "已签字";
					case '03':
						return "已取消";
					default:
				}
			}),
			billDateComputed: ko.pureComputed(function () {
				var truetime = viewModel.purchaseoutList.ref("billDate")();
				var showtime = u.date.format(truetime, 'YYYY-MM-DD');
				return showtime;
			}),
		},
		rendertype: {
			operation: function (obj) {
				var editfun, delfun;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var billStatusCode = obj.row.value.status;
				if (billStatusCode == "02") {
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
				var value = params.value;
				value += "";
				var showName = "";
				switch (value) {
					case "01":
						showName = "自由态";
						break;
					case "02":
						showName = "已签字";
						break;
					case "03":
						showName = "已签字";
						break;
				};
				params.element.innerHTML = showName;
			},
			purchasestatusRender: function (params) {
				var value = params.value;
				value += "";
				var showName = "";
				switch (value) {
					case "1":
						showName = "自由态";
						break;
					case "2":
						showName = "已提交";
						break;
					case "3":
						showName = "关闭";
						break;
					case "4":
						showName = "审批通过";
						break;
					case "5":
						showName = "审批不通过";
						break;
				};
				params.element.innerHTML = showName;
			},
			rowRemove: function (obj) {
				var rowRemove = "data-bind=click:remove.bind($data," + obj.rowIndex + ")";
				obj.element.innerHTML = '<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a href="#"  ' +
					rowRemove +
					' title="删除">删除</a>' +
					'</span>' +
					'</div>';
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			stockInTypeRender: function (obj) {
				var showValue = obj.value == "1" ? "采购入库" : ""
				obj.element.innerHTML = showValue;
			},
			billDateFormat: function (value) {
				var showtime = u.date.format(value, 'YYYY-MM-DD');
				return showtime;
			},
			beforeEditCheck: function (obj) {
				var gridObj = obj.gridObj;
				var row = obj.rowObj.value;
				var id = row.goodsId;
				// 判断当前货位是否可编辑
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionId"))) {
					// 先判断有没有仓库
					if (viewModel.purchaseoutList.getValue("stockOutStorageId")) {
						// 判断是否启用货位管理
						if (viewModel.purchaseoutList.getValue("ifSlotManage") != '1') {
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
						viewModel.purchaseoutItems.setMeta("batchNumId", "refparam",
							'{"EQ_goods":"' + row.goodsId + '","EQ_product":"' + row.productId + '","EQ_productLine":"' + row.productLineId + '","EQ_isEnable":"1"}');

					} else {
						toastr.warning("该商品未开启批次控制");
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))) {
					var row = obj.rowObj.value;
					if (row.enableBatchNoManage == '1') {
						viewModel.purchaseoutItems.setMeta("batchCodeId", "refparam",
							'{"EQ_goods":"' + row.goodsId + '","EQ_isEnable":"1"}');
					} else {
						toastr.warning("该商品未开启批号控制");
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("stockStateId"))) {
					var row = obj.rowObj.value;
					if (row.enableInvStatusManage == '1') {
						viewModel.purchaseoutItems.setMeta("stockStateId", "refparam",
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
				var items = viewModel.purchaseoutItems.getAllRealRows();
				var curRow = viewModel.purchaseoutList.getCurrentRow();
				items.map(function (item) {
					item.setValue("factOutNum", item.getValue("shouldOutNum"));

				});
			},
			remove: function (rowId) {
				viewModel.selectedreferListItem.setRowFocus(rowId);
				var curRow = viewModel.selectedreferListItem.getFocusRow();
				var id = curRow.getValue("id");
				var detailItemRow = viewModel.referPurchaseorderitemList.getSelectedRows();

				for (var i = detailItemRow.length - 1; i >= 0; i--) {
					if (detailItemRow[i].getValue("id") == id) {
						viewModel.referPurchaseorderitemList.removeRows([i], {
							forceDel: true
						});
					}
				}
				viewModel.selectedreferListItem.removeRows(curRow, {
					forceDel: true
				});
				viewModel.listHasItem();
			},
			listHasItem: function () {
				var ListRow = viewModel.referPurchaseorderList.getAllRealRows();
				var ItemRow = viewModel.referPurchaseorderitemList.getSelectedRows();
				for (var i = 0; i < ListRow.length; i++) {
					var ids = ListRow[i].getValue("orderItems").getSimpleData();
					if (ItemRow.length > 0) {
						for (var j = 0; j < ItemRow.length; j++) {
							var curid = ItemRow[j].getValue("id");
						}
					} else {
						ListRow[i]
						return false
					}

				}
				// $.inArray(id,selectedIds)>-1
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.purchaseoutList.pageIndex(0);
				}
				viewModel.purchaseoutList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.purchaseoutList.pageSize();
				var pageNumber = viewModel.purchaseoutList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.purchaseoutList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.purchaseoutList.totalRow(data.totalElements);
						viewModel.purchaseoutList.totalPages(data.totalPages);
					}
				})
			},
			//删除
			del: function (data, rowId) {
				viewModel.purchaseoutList.setRowSelectbyRowId(rowId);
				var rows = viewModel.purchaseoutList.getSelectedRows();
				var ids = [];
				ids.push(rows[0].getValue("id"));
				common.dialog.confirmDialog({
					msg1: '确认删除这些项？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function () {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/delete",
							type: "post",
							data: {
								ids: ids.join(",")
							},
							success: function (data) {
								viewModel.purchaseoutList.removeRows(rows);
							}
						});
					}
				});
			},
			//批量删除
			batchdel: function (data, rowId) {
				if (typeof (data) == 'number') {
					viewModel.purchaseoutList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.purchaseoutList.getSelectedRows();
				if (rows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].getValue("status") == "3") {
							toastr.error("已签字数据不能删除");
							return;
						}
						ids.push(rows[i].getValue("id"));
					}
				}
				common.dialog.confirmDialog({
					msg1: '确认删除这些项？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function () {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/batch-delete",
							type: "post",
							// data: "ids=" + ids.join(","),
							data: {
								ids: ids.join(",")
							},
							success: function (data) {
								viewModel.purchaseoutList.removeRows(rows);
							}
						});

					}
				});
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.purchaseoutList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.purchaseoutList.pageSize(size);
				viewModel.search(true);
			},
            pageChange2: function (index) {
                viewModel.pageModel.pageIndex(index);
                var pagedataArr = viewModel.pageAdd();
                var currentData = pagedataArr[index];
                viewModel.setDataToPanel(currentData);
            },
			beforPageChangeFun: function (index) {
				var pagedataArr = viewModel.pageAdd();
				var flag = false;
				viewModel.currowNum(0);
				viewModel.currowBomNum(0);
				var Row = viewModel.purchaseoutList.getCurrentRow();
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
							viewModel.saveBill();
						},
						onCancel: function () {
                            viewModel.pageModel.pageIndex(index);
                            var pagedataArr = viewModel.pageAdd();
                            if(pagedataArr.length > 0){
                                var currentData = pagedataArr[index];
                                viewModel.setDataToPanel(currentData);
                            }
						}
					});
				} else {
                    viewModel.pageModel.pageIndex(index);
                    var pagedataArr = viewModel.pageAdd();
                    if(pagedataArr.length > 0){
                        var currentData = pagedataArr[index];
                        viewModel.setDataToPanel(currentData);
                    }
				}
				return true;
			},
			//清空参照搜索条件
			cleanSearchRefer: function () {
				viewModel.searchcomp2.clearSearch();
			},
			//页码改变时的回调函数
			pageChangeRefer: function (index) {
				viewModel.referPurchaseorderList.pageIndex(index);
				viewModel.searchRefer();
			},
			//页码改变时的回调函数
			sizeChangeRefer: function (size) {
				viewModel.referPurchaseorderList.pageSize(size);
				viewModel.searchRefer(true);
			},
			//页码改变时的回调函数
			pageChangeRefer2: function (index) {
				viewModel.referPurchaseorderitemList.pageIndex(index);
				viewModel.searchRefer();
			},
			//页码改变时的回调函数
			sizeChangeRefer2: function (size) {
				viewModel.referPurchaseorderitemList.pageSize(size);
				viewModel.searchRefer(true);
			},
			//进入修改单据页
			showEditBillPanel: function (index, rowId) {
				$("#tab-edit-bom").hide();
				$("#tab-edit-goods").show();
				var row;
				if (index == -1) {
					row = viewModel.purchaseoutList.getFocusRow();
					index = 0
				} else {
					row = viewModel.purchaseoutList.getRowByRowId(rowId)
				}
				viewModel.index = index;
				viewModel.rowId = row.rowId;

				var id = row.getValue("id");
				// viewModel.purchaseList.originEditData = viewModel.purchaseList.getFocusRow().getSimpleData();
				//查询子表数据
				viewModel.findByParentid(id);
				viewModel.seteidtCondition();
				viewModel.getCurrowNum();
				viewModel.getBomCurrowNum();
				viewModel.goBillPanel();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
			},
			seteidtCondition: function () {
				var stockOrgId = viewModel.purchaseoutList.getValue("stockOrgId");
				var stockOutStorageId = viewModel.purchaseoutList.getValue("stockOutStorageId");
				$("#stockOutStorageId").parent().attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}');
				viewModel.purchaseoutItems.setMeta("goodsPositionId", "refparam",
					'{"EQ_wareHouse":"' + stockOutStorageId + '","EQ_isFinal":"1"}');
			},
			// 查询子表数据
			findByParentid: function (id) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/findByParentid",
					type: 'get',
					async: false,
					data: {
						id: id
					},
					success: function (data) {
						data.outBillItems.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
						});
						data.outBillItemBoms.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
						});
						viewModel.purchaseoutItems.setSimpleData(data.outBillItems);
						viewModel.BomItems.setSimpleData(data.outBillItemBoms, {
							unSelect: true
						});
					}
				})
			},
			detail: function () {
				$("#tab-detail-bom").hide();
				$("#tab-detail-goods").show();
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.purchaseoutList.getCurrentRow();
					var id = curRow.getValue("id");
					viewModel.findByParentid(id);
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
					viewModel.goDetailPanel();
				}, 0);
			},
			detail2bill: function () {
				$("#tab-edit-bom").hide();
				$("#tab-edit-goods").show();
				var billstatus = viewModel.purchaseoutList.getValue("status");
				if (billstatus !== "01") {
					toastr.warning("单据状态为自由态才可进入编辑页面");
					return;
				}
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				common.bill.detail2bill();
			},
			//判断商品行仓库和批次号
			checkEmpty: function () {
				var allItemRows = viewModel.purchaseoutItems.getAllRealRows();
				var ifSlotManage = viewModel.purchaseoutList.getValue("ifSlotManage");
				var emptyBatchRows = "",
					emptyPositionRows = "";
				var emptyBatchNoRows = "",
					emptyInvStateRows = "";
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
						if (!item.getValue("stockStateId") && parseFloat(item.getValue("enableInvStatusManage")) == 1) {
							emptyInvStateRows += item.getValue("rowNum") + ",";
						}
                        /*if(!item.getValue("goodsSelection") && parseFloat(item.getValue("isOptional")) == 1){
                            emptyGoodsOptRows += item.getValue("rowNum") + ",";
                        }*/
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
			saveBill: function () {
				var validate = $(".ui-bill-panel")[0];
				var result = app.compsValidateMultiParam({
					element: validate,
					showMsg: true
				});
				if (!result.passed) {
					return;
				}
				//判断批次号及货位
				if (!viewModel.checkEmpty()) {
					return;
				};
				var complexData = viewModel.purchaseoutList.getCurrentRow().getSimpleData();
				var purchaseoutItemsData = viewModel.purchaseoutItems.getSimpleData();
				var BomItemsData = viewModel.BomItems.getSimpleData();
				complexData.outBillItems = purchaseoutItemsData;
				complexData.outBillItemBoms = BomItemsData;
				complexData.billType = "PurchaseReturnOut";
				complexData.tranTypeId = "PurchaseReturnOut";
				var _ajaxType = viewModel.purchaseoutList.getValue("id") ? "put" : "post";
				$._ajax({
					url: appCtx + viewModel.baseurl,
					type: _ajaxType,
					data: JSON.stringify(complexData),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						common.dialog.stockConfirmDialog(data, function () {
							viewModel.purchaseoutList.getFocusRow().setSimpleData(data);
							if (viewModel.index !== -1) {
								viewModel.retListPanel();
								return;
							}
							var curIndex = viewModel.pageModel.pageIndex();
							viewModel.pageAdd().splice(curIndex, 1);
							viewModel.pageAdd(viewModel.pageAdd());
							viewModel.pageModel.totalPages(viewModel.pageAdd().length);
							if (curIndex == viewModel.pageAdd().length) {
								viewModel.beforPageChangeFun(curIndex - 1);
								if (viewModel.pageModel.totalPages() == 0) {
									viewModel.retListPanel();
									viewModel.search();
								}
							} else {
								viewModel.beforPageChangeFun(curIndex);
							}
						});
					}
				})
			},
			//提交单据
			submitBill: function () {
				var validate = $(".ui-bill-panel")[0];
				var result = app.compsValidateMultiParam({
					element: validate,
					showMsg: true
				});
				if (!result.passed) {
					return;
				}
				var complexData = viewModel.purchaseoutList.getCurrentRow().getSimpleData();
				var purchaseoutItemsData = viewModel.purchaseoutItems.getSimpleData();
				complexData.initializtioninItems = purchaseoutItemsData;
				$._ajax({
					url: appCtx + viewModel.baseurl + '/batch-submit',
					type: "POST",
					data: JSON.stringify(complexData),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						var curRow = viewModel.purchaseoutList.getFocusRow();
						curRow.setSimpleData(data);
						viewModel.retListPanel();
					}
				})
			},
			cancelBill: function () {
				viewModel.search();
				viewModel.retListPanel();
				viewModel.referPurchaseorderSearchParam.removeAllRows();
				viewModel.removeAllreferRows();
			},
			removeAllreferRows: function () {
				viewModel.referPurchaseorderList.removeAllRows();
				viewModel.referPurchaseorderitemList.removeAllRows();
				viewModel.selectedreferList.removeAllRows();
				viewModel.selectedreferListItem.removeAllRows();
			},
			//作废
			cancel: function () {
				var selectedRows = viewModel.purchaseoutList.getSelectedRows();
				var ids = selectedRows.map(function (row, index, arr) {
					return row.getValue("id");
				})
				if (selectedRows.length < 1) {
					//TODO: tips替换
					toastr.warning("请选择一条操作的行");
					return;
				}
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/batch-cancel",
					data: {
						ids: ids.join(",")
					},
					success: function (res) {
						for (var i = 0; i < selectedRows.length; i++) {
							// selectedRows[i].setValue("status", "3");
						}
					}
				})
			},
			//签字
			signbtn: function (obj) {
				var selectedRows = viewModel.purchaseoutList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function (row) {
						var factOutNum = row.getValue("totalFactOutNum");
						if (factOutNum > 0) {
							return row.getValue("id");
						}
					});
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-sign",
						data: {
							ids: ids.join(",")
						},
						success: function (data) {
							for (var i = 0; i < selectedRows.length; i++) {
								var factOutNum = selectedRows[i].getValue("totalFactOutNum");
								if (factOutNum > 0) {
									selectedRows[i].setValue("status", "02");
									selectedRows[i].setValue("statusCode", "02");
									selectedRows[i].setValue("signPerson", data.name);
									selectedRows[i].setValue("signDate", data.time);
									var obj = obj;
								} else {
									toastr.warning("实际出库量大于0时，才能签字");
								}
							}
						}
					})
				} else {
					toastr.warning("请至少选择一项");
				}

			},
			//取消签字
			cancelsignbtn: function () {
				var selectedRows = viewModel.purchaseoutList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function (row) {
						return row.getValue("id");
					})
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-cancel-sign",
						data: {
							ids: ids.join(",")
						},
						success: function (data) {
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("status", "01");
								selectedRows[i].setValue("statusCode", "01");
								selectedRows[i].setValue("signPerson", data.name);
								selectedRows[i].setValue("signDate", data.time);
							}
						}
					})
				} else {
					toastr.warning("请至少选择一项");
				}

			},
			//参照选择批量新增子表（销售产品）
			showAddItemsRef: function () {
				viewModel.clearItemsRef();
				$("#addItemsRef .refer").trigger("click");
			},
			//清空已选销售产品参照
			clearItemsRef: function () {
				viewModel.ItemRefList.setValue("productref", "");
				var refer = $("#refContainerproductref").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			//导入
			importHandle: function () {
				var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
				var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
				var ele = $('#importFiel')[0]; //挂载元素
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
			},
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
				var listData = viewModel.purchaseoutList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);

			},
			getSum: function (array) {
				var sum = 0;
				for (var i = 0; i < array.length; i++) {
					sum += parseInt(array[i]);
				}
				return sum;
			},

			geStockOrgId: function (curStockOrgId) {
				$("#cardStockOrgId input").val(curStockOrgId);
				// var refer = $("#refContainercardStockOrgId").data("uui.refer");
				// refer.setValue(null);
				// refer.blurEventVal();
			},
			// 从行号池中拿到最新的行号
			generaterowNum: function () {
				var latestnum = viewModel.currowNum(),
					newnum = parseFloat(latestnum) + 10;
				viewModel.currowNum(newnum);
				return newnum;
			},
			getCurrowNum: function () {
				var data = viewModel.purchaseoutItems.getSimpleData();
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
				var latestnum = viewModel.currowNum(),
					newnum = latestnum + 10;
				viewModel.currowNum(newnum);
				return newnum;
			},
			getCurRowNum: function () {
				var data = viewModel.purchaseOrderItems.getSimpleData();
				var maxRowNum = 0;
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].rowNum > maxRowNum) {
							maxRowNum = data[i].rowNum;
						}
					}
				}
				viewModel.currowNum(maxRowNum);
			},

			getCurDate: function (row) {
				// 服务器时间获取
				$._ajax({
					type: "post",
					url: appCtx + '/stock/common/get-current-date',
					success: function (data) {
						var truetime = u.date.format(data, 'YYYY/MM/DD');
						truetime = new Date(truetime).getTime();
						if (row) {
							row.setValue("stockInDate", truetime);
						}
						viewModel.curDate(truetime);
					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)  新增参照
			searchRefer: function (reindex) {
				if (reindex) {
					viewModel.referPurchaseorderList.pageIndex(0);
				}
				viewModel.referPurchaseorderList.removeAllRows();
				var queryData = viewModel.searchcomp2.getDataWithOpr ? viewModel.searchcomp2.getDataWithOpr() : {};
				var pageSize = viewModel.referPurchaseorderList.pageSize();
				var pageNumber = viewModel.referPurchaseorderList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				queryData["receiveStorageOrgId"] = queryData.search_EQ_receiveStorageOrgId;
				queryData["receiveStorageId"] = queryData.search_EQ_receiveStorageId;
				queryData["supplierId"] = queryData.search_EQ_supplierId;
				queryData["applyDateStart"] = queryData.search_GTE_orderDate_date;
				queryData["applyDateEnd"] = queryData.search_LT_orderDate_date;
				queryData["otherOrderNum"] = queryData.search_LIKE_otherOrderNum;
				queryData["orderCode"] = queryData.search_LIKE_purchaseCode;
				for (var key in queryData) {
					if (/^search_/g.test(key)) {
						delete queryData[key];
					}
				};
				$._ajax({
					type: "get",
					url: window.pathMap.purchase + '/purchase/orders/get-out-by-param',
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.referPurchaseorderList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.referPurchaseorderList.totalRow(data.totalElements);
						viewModel.referPurchaseorderList.totalPages(data.totalPages);
						viewModel.updateSelectedIndices();
						//重置listIndex
						viewModel.listIndex = null;
					}
				})
			},
			//新增 参照
			showAddRefer: function () {
				viewModel.searchcomp2.clearSearch();
				viewModel.referPurchaseorderSearchParam.removeAllRows();
				viewModel.removeAllreferRows();
				if (!viewModel.referpurchaseorderdialog) {
					viewModel.referpurchaseorderdialog = u.dialog({
						id: 'dialog_referpurchaseorder',
						content: "#dialog_referpurchaseorder",
						hasCloseMenu: true,
						width: "85%"
					});
					var closefunc = function () {
						viewModel.referPurchaseorderSearchParam.removeAllRows();
						viewModel.referPurchaseorderList.removeAllRows();
						viewModel.referPurchaseorderitemList.removeAllRows();
						viewModel.referpurchaseorderdialog.close();
					}
					var cancelButton = $("#dialog_referpurchaseorder .J-cancel");
					var closeButton = $("#dialog_referpurchaseorder .u-msg-close");
					cancelButton.off().on('click', closefunc);
					closeButton.on('click', closefunc);
				} else {
					viewModel.referpurchaseorderdialog.show();

				}
			},
			// 选择采购订单
			referSelectHandle: function (obj) {
				viewModel.referPurchaseorderitemList.removeAllRows();
				viewModel.selectedreferListItem.removeAllRows();
				var listArr = [];
				var selectedRows = viewModel.referPurchaseorderList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					for (var i = 0; i < selectedRows.length; i++) {
						var listData = selectedRows[i].getSimpleData();
						listData.orderItems.returnGoodsAmount = listData.orderItems.returnGoodsAmount == null ? 0 : listData.orderItems.returnGoodsAmount;
						listArr.push(listData);
						viewModel.referPurchaseorderitemList.addSimpleData(listData.orderItems);
						viewModel.referPurchaseorderitemList.setAllRowsSelect();
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
				var itemrows = viewModel.referPurchaseorderitemList.getAllRows();
				for (var j = rows.length - 1; j >= 0; j--) {
					if (rows[j].getValue("id") == id) {
						viewModel.selectedreferList.removeRows([j], {
							forceDel: true
						});
					}
				}
				for (var i = itemrows.length - 1; i >= 0; i--) {
					if (itemrows[i].getValue("purchaseOrderId") == id) {
						viewModel.referPurchaseorderitemList.removeRows([i], {
							forceDel: true
						});
					}
				}
			},
			//选择采购订单商品信息
			referSelectItemHandle: function (obj) {
				var id = obj.rowObj.value.id;
				var selectedRows = viewModel.referPurchaseorderitemList.getSelectedRows();
				var selectedreferListItem = viewModel.selectedreferListItem.getSimpleData();
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
				var parentRowId = obj.rowObj.value.purchaseOrderId;
				var parentRow = viewModel.referPurchaseorderList.getRowByField("id", parentRowId);
				var selectitemArr = parentRow.getValue("selectitemIds")
				if (selectitemArr.length > 0) {
					for (var i = 0; i < selectitemArr.length; i++) {
						if ($.inArray(itemId, selectitemArr) > -1) {
							removeByValue(selectitemArr, itemId)
							parentRow.setValue("selectitemIds", selectitemArr);
							if (selectitemArr.length == 0) {
								var curRowId = parentRow.rowId;
								var index = viewModel.referPurchaseorderList.getIndexByRowId(curRowId);
								viewModel.referPurchaseorderList.setRowsUnSelect(index);
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
					// selectedItemRows = viewModel.selectedreferListItem.getAllRows(),
					selectedIds,
					selectedIndices = [],
					rows;
				if (selectedRows && selectedRows.length > 0) {
					selectedIds = selectedRows.map(function (row) {
						return row.getValue("id");
					})
					rows = viewModel.referPurchaseorderList.getAllRows();
					if (rows && rows.length > 0) {
						for (var i = 0; i < rows.length; i++) {
							var id = rows[i].getValue("id");
							if ($.inArray(id, selectedIds) > -1) {
								selectedIndices.push(i);
							}
						}
					}
					if (selectedIndices.length > 0) {
						viewModel.referPurchaseorderList.setRowsSelect(selectedIndices);
					}
				} else {
					return
				}
			},
			insertSelectedProduct: function () {
				var selectedData = viewModel.selectedreferList.getSimpleData();
				if (selectedData && selectedData.length > 0) {
					var trueData = selectedData.map(function (row) {
						return {
							productId: row.id,
							productCode: row.code,
							productDesc: row.description,
							productModelName: row.productModelName,
							productCategoryName: row.productCategoryName,
							productRadSeriesId: row.radSeriesId,
							productRadSeriesName: row.radSeriesName,
							billedQuantity: row.reqQuantity,
							volume: row.totalVolume,
							weight: row.totalWeight,
							//冗余单位方量和单位重量，方便表体行重新计算合计
							cubage: row.cubage,
							roughWeight: row.roughWeight,
							isFree: 0,
							isDirect: 0
						};
					})
					viewModel.referPurchaseorderList.addSimpleData(trueData, "new", {
						unSelect: true
					});
				}
			},

			queryChildArr: function (parentArr) {
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/translate-purchase-out",
					async: false,
					data: JSON.stringify(parentArr),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.setDataToPanel(data[0])
						viewModel.pageAdd(data);
						viewModel.pageModel.totalPages(data.length);
					}
				})
			},
			setDataToPanel : function (data) {
                viewModel.purchaseoutList.removeAllRows();
                var curRow = viewModel.purchaseoutList.createEmptyRowF();
                curRow.status = "nrm";
                viewModel.purchaseoutList.setRowFocus(curRow);
                // 补充仓库的开启货位管理信息
                viewModel.getWarehouse(data);
                viewModel.getGoodsInfo(data.outBillItems);
                viewModel.purchaseoutItems.removeAllRows();
                viewModel.BomItems.removeAllRows();
                viewModel.purchaseoutList.getFocusRow().setSimpleData(data);
                viewModel.purchaseoutItems.setSimpleData(data.outBillItems, {
                    status: "new"
                });
                viewModel.currowNum(0);
                viewModel.currowBomNum(0);
                var itemrows = viewModel.purchaseoutItems.getAllRows();
                for (var i = 0; i < itemrows.length; i++) {
                    var rowNum = viewModel.generaterowNum();
                    var parentName = itemrows[i].getValue("goodsName");
                    itemrows[i].setValue("rowNum", rowNum);
                    itemrows[i].setValue("persistStatus", 'new');
                    var itemId = itemrows[i].getValue("srcBillBcode");
                    // 手动给bom行添加父行号
                    var bomItemRows = data.outBillItemBoms;
                    viewModel.currowBomNum(0);
                    bomItemRows.forEach(function (item) {
                        var BomRowNum = viewModel.generateBomrowNum();
                        item.rowNum = BomRowNum;
                        if(item.srcBillBcode == itemId){
                            item.parentRowNum = itemrows[i].getValue("rowNum");
                            //如果是不是包件 bom页签不显示母件name
                            if (item.goodsName == parentName) {
                                item.parentGoodsName = null;
                            }
                        }
                    })
                }
                viewModel.BomItems.setSimpleData(data.outBillItemBoms, {
                    status: "new"
                });
            },
			getGoodsInfo: function (items) {
				var ids = [];
				if (items && items.length > 0) {
					items.forEach(function (item) {
						if (item && item.goodsId && (!item.productId || !item.productLineId || item.enableBatchNumberManage == "" ||
								item.enableBatchNoManage == "" || item.enableInvStatusManage == "" || item.isOptional == "")) {
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
				if (maindata.stockOutStorageId && (maindata.ifSlotManage == '' || maindata.ifSlotManage == null)) {
					$._ajax({
						url: window.pathMap.base + "/base/warehouses/findOne",
						type: "get",
						data: {
							id: maindata.stockOutStorageId
						},
						async: false,
						success: function (data) {
							maindata.ifSlotManage = data.ifSlotManage || '0';
						}
					});
				}
			},
			//确定 新增
			confirmReferpurchaseorder: function () {
				$("#tab-edit-bom").hide();
				$("#tab-edit-goods").show();
				var parentArr = viewModel.referPurchaseorderList.getSimpleData({
					type: 'select'
				});
				var itemArr = viewModel.referPurchaseorderitemList.getSimpleData({
					type: 'select'
				});
				if (!itemArr.length) {
					toastr.warning("请至少选择一条商品");
					return;
				};
				var selBomsArr = [];
				for (var i = 0; i < parentArr.length; i++) {
					parentArr[i].orderItems = [];
					for (var j = 0; j < itemArr.length; j++) {
						if (itemArr[j].purchaseOrderId == parentArr[i].id) {
							parentArr[i].orderItems.push(itemArr[j]);
						}
					}
				}
				parentArr.forEach(function (item) {
					selBomsArr.push(item.orderItemBoms)
				});
				viewModel.currowNum(0);
				viewModel.currowBomNum(0);
				viewModel.queryChildArr(parentArr);
				viewModel.index = -1;
				viewModel.pageModel.pageIndex(0);
				viewModel.goBillPanel();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				viewModel.referpurchaseorderdialog.close();
				viewModel.removeAllreferRows();
			},

			// 自动取数
			autoNumber: function () {
				var selectedRows = viewModel.purchaseoutItems.getSelectedRows();
				if (selectedRows.length > 0) {
					for (var i = 0; i < selectedRows.length; i++) {
						var shouldInNum = selectedRows[i].getvalue("shouldInNum");
						selectedRows[i].setValue("factInNum", shouldInNum);
					}
				} else {
					toastr.warning("请至少选择一项");
				}
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
			goodsOptDetailsFun: function (obj) {
				/**
				 * @example 查看选配common.goodsOptional.OptionalDetails()
				 * @param viewModel 当前viewModel, 用来挂载dialog
				 * @param title     弹窗title
				 * @param goodsId   商品行Id
				 * @param el        dialog id (不加 ‘#’)
				 */
				var data = viewModel.purchaseoutItems.getSimpleData()[obj];
				var id = data.goodsId;
				var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
				common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.purchaseoutItems, viewModel.BomItems);
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
				var productItemRows = viewModel.purchaseoutItems.getAllRealRows();
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
                    if(item.getValue("rowNum") == parentRowNum ){
                        item.setValue(field,oneParentBomSum)
                    }
				})
			},
		},
		afterCreate: function () {
			// 初始化折叠面板
			$.fn.collapsepanel(false, true);
			//枚举
			$._ajax({
				type: "get",
				url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
				data: {
					cust_doc_code_batch: "QY102"
				},
				success: function (data) {
					var combodata = common.dataconvert.toMap(data["QY102"], "name", "code");
					viewModel.arrivalBelongDataSource(combodata);
				}
			});
			// 子表参照聚焦行，用于绑定子表参照组件
			var refRow = viewModel.ItemRefList.createEmptyRow();
			viewModel.ItemRefList.setRowFocus(refRow);

			//价格
			viewModel.purchaseoutItems.on("unitPrice.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
				}
				var parentGoodsId = obj.rowObj.getValue("goodsId");
                var parentRowNum = obj.rowObj.getValue("rowNum");
				//获取全部bom信息
                var allrows = viewModel.BomItems.getAllRealRows();
				for (var i = 0; i < allrows.length; i++) {
					if (allrows[i].getValue("parentRowNum") == parentRowNum && allrows[i].getValue("goodsId") == parentGoodsId) {
						var unitPrice = obj.newValue;
						allrows[i].setValue("unitPrice", unitPrice);
					}
				}
			});
			//总实出数量
			viewModel.purchaseoutItems.on("factOutNum.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
				}
				var arr = viewModel.purchaseoutItems.getSimpleData();
				var amount = [];
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i].factOutNum) {
						arr[i].factOutNum = 0
					}
					var amountItem = parseFloat(arr[i].factOutNum);
					amount.push(amountItem);
				}
				viewModel.purchaseoutList.getCurrentRow().setValue("totalFactOutNum", viewModel.getSum(amount));

				//联动bom数量
				var parentRowNum = obj.rowObj.getValue("parentRowNum");
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
				var price = [],
					bomprice = [];
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i].amountMoney) {
						arr[i].amountMoney = 0
					}
					var amountMoney = parseFloat(arr[i].amountMoney)
					price.push(amountMoney);
				}
				// 计算反写商品行上面的值
				viewModel.backClac(obj, "unitPrice");

			});
			//Bom金额监听反算商品金额
			viewModel.BomItems.on("amountMoney.valuechange", function (obj) {
				viewModel.backClac(obj, "amountMoney");
			});

			//赠品价格清零
			viewModel.purchaseoutItems.on("isGift.valuechange", function (obj) {
				var isGift = viewModel.purchaseoutItems.getValue("isGift");
				if (isGift == "1") {
					viewModel.purchaseoutItems.setValue("unitPrice", 0);
				}
			});
			//库存组织参照传参库存参照
			viewModel.purchaseoutList.on("stockOrgId.valuechange", function (obj) {
				var row = viewModel.purchaseoutList.getCurrentRow();
				var stockOrgId = row.getValue("stockOrgId");
				$("#stockOutStorageId").parent().attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}');
				if (stockOrgId) {
					viewModel.purchaseoutList.setMeta("stockOutStorageId", "enable", true);
					$("#stockOutStorageId").removeAttr('placeholder');
				} else {
					row.setValue("stockOutStorageId", "");
					viewModel.purchaseoutList.setMeta("stockOutStorageId", "enable", false);
					$("#stockOutStorageId").attr('placeholder', "请先选择库存组织");
				}
				if (!obj.ctx) {
					row.setValue("stockOutStorageId", null);
				}
			});
			// 仓库参照传参货位参照
			viewModel.purchaseoutList.on("stockOutStorageId.valuechange", function (obj) {
				var row = viewModel.purchaseoutList.getCurrentRow();
				var stockOrgId = row.getValue("stockOrgId");
				// if(stockOrgId){
				//   var refer = $("#refContainercardStockOrgId").data("uui.refer");
				//   refer.setValue(null);
				//   refer.blurEventVal();
				// };
				// 仓库变化时改变是否启用货位管理字段
				var Storageref = $("#refContainerstockOutStorageId").data("uui.refer");
				if (obj.newValue) {
					if (Storageref.values && Storageref.values.length > 0) {
						row.setValue("ifSlotManage", Storageref.values[0].ifSlotManage);
					}
				} else {
					row.setValue("ifSlotManage", '0');
				}
				// 若仓库变化则清空之前选择的货位
				if (obj.oldValue && obj.oldValue != obj.newValue) {
					var itemrows = viewModel.purchaseoutItems.getAllRows();
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
				var stockOutStorageId = row.getValue("stockOutStorageId");
				viewModel.purchaseoutItems.setMeta("goodsPositionId", "refparam", '{"EQ_wareHouse":"' + stockOutStorageId + '","EQ_isFinal":"1"}');
			});

			//搜索条件 库存组织仓库过滤
			viewModel.searchcomp.viewModel.params.on("stockOrg.valuechange", function (obj) {
				if (obj.newValue != undefined && obj.newValue != "") {
					var stockOrgId = {
						"EQ_inventoryOrg.id": obj.newValue
					};
					$("#stockOutStorage--id").attr("data-refparam", JSON.stringify(stockOrgId));
				} else {
					$("#stockOutStorage--id").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
					viewModel.searchcomp.viewModel.params.setValue("stockOutStorage", "");
				}
			});
			// 拉单搜索界面,组织与仓库联动
			viewModel.searchcomp2.viewModel.params.on("receiveStorageOrgId.valuechange", function (obj) {
				if (obj.newValue != undefined && obj.newValue != "") {
					var stockOrgId = {
						"EQ_inventoryOrg.id": obj.newValue
					};
					$("#storehouse2").attr("data-refparam", JSON.stringify(stockOrgId));
				} else {
					$("#storehouse2").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
					viewModel.searchcomp2.viewModel.params.setValue("receiveStorageId", "");
				}
			});
			//批次号 货位 批号 供应商 项目 库存状态 客户
			viewModel.purchaseoutItems.on("valuechange", function (obj) {
				function setValueToBom() {
					var parentRowNum = obj.rowObj.getValue("rowNum");
                    var allrows = viewModel.BomItems.getAllRealRows();
					for (var i = 0; i < allrows.length; i++) {
						var nameField = obj.field.replace("Id", "Name");
						var idField = obj.field;
						if (allrows[i].getValue("parentRowNum") == parentRowNum) {
							allrows[i].setValue(obj.field, obj.newValue);
                            if (obj.newValue) {
                                allrows[i].setValue(nameField,obj.rowObj.data[idField].meta.display);
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