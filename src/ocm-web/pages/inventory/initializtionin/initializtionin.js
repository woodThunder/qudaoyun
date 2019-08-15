define(['text!./initializtionin.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
	'use strict'
	var viewModel, app;
	var BILLPANELSTATUS = {
		ADD: "add",
		EDIT: "edit",
		COPY: "copy",
		DETAIL: "detail",
		DEFAULT: "default"
	}
	var billstatus = CONST.STOCKENUM.INITIN;
	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
			app = this.app;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/stock/initializtionins',
			initializationList: new u.DataTable(model.options.metas.complex),
			initializationCard: new u.DataTable(model.options.metas.complex),
			initializationItems: new u.DataTable(model.options.metas.complexItem),
			BomItems: new u.DataTable(model.options.metas.BomItem),
			ItemRefList: new u.DataTable(model.options.metas.ItemRef),
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button4Source: model.options.buttons.button4,

			card1Source: model.options.cards.card1,
			detail11Source: model.options.details.detail1,
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			//BOM结构信息
			grid4Option: model.options.grids.grid4,
			grid5Option: model.options.grids.grid5,

			billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//跳转详情页
			goDetailPanel: common.bill.goDetailPanel,
			// 行号池
			curRowNum: ko.observable(0),
			//bom行号池
			currowBomNum: ko.observable(0),
			// 是否bom页签
			isBomPanel: ko.observable(),

			curDate: ko.observable(),
			formater: new u.NumberFormater(2),
		},
		rendertype: {
            // 选配
            goodsOpt: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var goodsSelectionDescription = obj.row.value.goodsSelectionDescription; // 选配id
                var optName = goodsSelectionDescription ? goodsSelectionDescription : '添加选配';
                var detailfun = "data-bind=click:goodsOptionalFun.bind($data," + obj.rowIndex + ")";
                    obj.element.innerHTML =
                        '<a href="#" class="ui-a-detail" ' +
                        detailfun +
                        ">" + optName + "</a>";

                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
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
			detailRender: common.rendertype.detailRender,
			operation: function (obj) {
				var billStatusCode = obj.row.value.billStatusCode;
				var editfun, delfun;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				// 未提交的采购订单才可以编辑和删除
				if (billStatusCode == billstatus.FREE) {
					editfun =
						"data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
					delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
				} else {
					delfun = 'class="disabled"';
					editfun = 'class="disabled"';
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
			canEdit: ko.pureComputed(function () {
				var billStatusCode = viewModel.initializationList.ref("billStatusCode")();
				if (billStatusCode == billstatus.FREE) {
					return true;
				} else {
					return false;
				}
			}),
			billDateComputed: ko.pureComputed(function () {
				var truetime = viewModel.initializationList.ref("billDate")();
				var showtime = u.date.format(truetime, 'YYYY-MM-DD');
				return showtime;
			}),
			billDateFormat: function (value) {
				var showtime = u.date.format(value, 'YYYY-MM-DD');
				return showtime;
			},
			beforeEditCheck: function (obj) {
				var gridObj = obj.gridObj;
				// 判断当前货位是否可编辑
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionId"))) {
					// 先判断有没有仓库
					if (viewModel.initializationCard.getValue("storehouseId")) {
						// 判断仓库是否启用货位管理
						if (viewModel.initializationCard.getValue("ifSlotManage") != '1') {
							toastr.warning("该仓库未开启货位管理");
							return false;
						}
					} else {
						toastr.warning("请先选择仓库")
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchNumId"))) {
					var row = obj.rowObj.value;
					var enableBatchNumberManage = row.enableBatchNumberManage;
					if (enableBatchNumberManage == '1') {
						viewModel.initializationItems.setMeta("batchNumId", "refparam",
							'{"EQ_goods":"' + row.goodsId + '","EQ_product":"' + row.productId + '","EQ_productLine":"' + row.productLineId + '","EQ_isEnable":"1"}');

					} else {
						toastr.warning("该商品未开启批次控制")
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))) {
					var row = obj.rowObj.value;
					if (row.enableBatchNoManage == '1') {
						viewModel.initializationItems.setMeta("batchCodeId", "refparam",
							'{"EQ_goods":"' + row.goodsId + '","EQ_isEnable":"1"}');
					} else {
						toastr.warning("该商品未开启批号控制");
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("stockStateId"))) {
					var row = obj.rowObj.value;
					if (row.enableInvStatusManage == '1') {
						viewModel.initializationItems.setMeta("stockStateId", "refparam",
							'{"EQ_isEnable":"1"}');
					} else {
						toastr.warning("该商品未开启库存状态");
						return false
					}
				}
				//判断是否含有bom
				var row = obj.rowObj.value;
				var id = row.goodsId;
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
			//删除和批量删除
			del: function (data, rowId) {
				if (typeof (data) == 'number') {
					viewModel.initializationList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.initializationList.getSelectedRows();
				if (rows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
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
							url: appCtx + viewModel.baseurl + "/delete",
							type: "post",
							// data: "ids=" + ids.join(","),
							data: {
								ids: ids.join(",")
							},
							success: function (data) {
								viewModel.initializationList.removeRows(rows);
							}
						});

					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.initializationList.pageIndex(0);
				}
				viewModel.initializationList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.initializationList.pageSize();
				var pageNumber = viewModel.initializationList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.initializationList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.initializationList.totalRow(data.totalElements);
						viewModel.initializationList.totalPages(data.totalPages);
					}
				})
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.initializationList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.initializationList.pageSize(size);
				viewModel.search(true);
			},
			//进入新增单据页
			showAddBillPanel: function () {
				//bom相关
				viewModel.isBomPanel(true);
				$("#tab-panel-2").hide();
				$("#tab-panel-1").show();
				viewModel.currowBomNum(0);

				viewModel.index = -1;
				viewModel.initializationCard.removeAllRows();
				var curRow = viewModel.initializationCard.createEmptyRow();
				viewModel.initializationItems.removeAllRows();
				viewModel.BomItems.removeAllRows();
				// 行号设置为0
				viewModel.curRowNum(0);
				viewModel.getCurDate(curRow);
				viewModel.setDefaultValue(curRow);
				viewModel.setDefaultCondition();
				viewModel.goBillPanel();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
				// 仓库不可点，选择完库存组织后可点击
                $("#storehouseId").attr('placeholder', "请先选择库存组织");
                viewModel.initializationCard.setMeta("storehouseId", "enable", false);
			},
			//选择商品页签
			checkGoods: function () {
				viewModel.isBomPanel(true);
				if (viewModel.billPanelStatus() == "detail") {
					$("#tab-panel-4").hide();
					$("#tab-panel-3").show();
				} else {
					$("#tab-panel-2").hide();
					$("#tab-panel-1").show();
				}
			},
			//选择Bom页签
			checkBom: function () {
				viewModel.isBomPanel(false);
				if (viewModel.billPanelStatus() == "detail") {
					$("#tab-panel-4").show();
					$("#tab-panel-3").hide();
				} else {
					$("#tab-panel-2").show();
					$("#tab-panel-1").hide();
				}
			},

			setDefaultCondition: function () {
				viewModel.changeCondition("storehouseId", {
					"EQ_isEnable": "1"
				}, {});
			},
			setDefaultValue: function (row) {
				row.setValue("billStatusCode", "01");
				row.setValue("billStatusName", "自由");
			},
			//进入修改单据页
			showEditBillPanel: function (index, rowId) {
				$("#tab-panel-2").hide();
				$("#tab-panel-1").show();
				var row;
				if (index == -1) {
					//处理通过详情页编辑进入
					row = viewModel.initializationList.getFocusRow();
					//通过改变index判断当前处于编辑态
					index = 0;
				} else {
					//行上的编辑按钮
					row = viewModel.initializationList.getRowByRowId(rowId);
				}

				viewModel.index = index;
				viewModel.rowId = row.rowId;

				var id = row.getValue("id");
				//查询子表数据
				viewModel.findByParentid(id, function (data) {
					data.initializtioninItems.forEach(function (item) {
						item.batchCodeName = item.batchCodeCode;
						item.batchNumName = item.batchNumCode;
					});
					data.initializtioninItemBoms.forEach(function (item) {
						item.batchCodeName = item.batchCodeCode;
						item.batchNumName = item.batchNumCode;
					});
					viewModel.initializationCard.setSimpleData(data);
					viewModel.initializationItems.setSimpleData(data.initializtioninItems, {
						unSelect: true
					});
					viewModel.BomItems.setSimpleData(data.initializtioninItemBoms, {
						unSelect: true
					});
					viewModel.seteidtCondition();
					// 获得当前最大行号
					viewModel.getCurRowNum();
					viewModel.getBomCurrowNum();
					viewModel.goBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				});
			},
			seteidtCondition: function (data) {
				// 编辑时仓库可编辑状态
				$("#storehouseId").attr('placeholder', "");
				viewModel.initializationCard.setMeta("storehouseId", "enable", true);
				var pkOrgId = viewModel.initializationCard.getValue("pkOrgId");
				var storehouseId = viewModel.initializationCard.getValue("storehouseId");
				viewModel.changeCondition("storehouseId", {
					"EQ_isEnable": "1"
				}, {
					"EQ_inventoryOrg.id": pkOrgId
				})
				viewModel.initializationItems.setMeta("goodsPositionId", "refparam",
					'{"EQ_wareHouse":"' + storehouseId + '","EQ_isFinal":"1"}');
			},
			detail: function () {
				$("#tab-panel-4").hide();
				$("#tab-panel-3").show();
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.initializationList.getCurrentRow();
					var id = curRow.getValue("id");
					viewModel.findByParentid(id, function (data) {
						data.initializtioninItems.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
							item.batchNumName = item.batchNumCode;
						});
						data.initializtioninItemBoms.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
							item.batchNumName = item.batchNumCode;
						});
						curRow.setSimpleData(data);
						viewModel.initializationItems.setSimpleData(data.initializtioninItems, {
							unSelect: true
						});
						viewModel.BomItems.setSimpleData(data.initializtioninItemBoms, {
							unSelect: true
						});
					});
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
					viewModel.goDetailPanel();
				}, 0);
			},
			detail2bill: function () {
				$("#tab-panel-2").hide();
				$("#tab-panel-1").show();
				var row = viewModel.initializationList.getCurrentRow();
				viewModel.showEditBillPanel(0, row.rowId);
			},
			//查询子表数据
			findByParentid: function (id, callback) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/findByParentid",
					type: 'get',
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
				})
			},
			//新增子表项
			addItem: function () {
				viewModel.initializationItems.createEmptyRow();
			},
			//删除子表项
			delItems: function () {
				var selectedRows = viewModel.initializationItems.getSelectedRows();
				var delBom = [];
				selectedRows.forEach(function (row, index, arr) {
					row.setValue("dr", "1");
					var parentRowNum = row.getValue("rowNum");
					/* var parentRowNum = row.getValue("rowNum");*/
					var allBomRows = viewModel.BomItems.getAllRealRows();
					allBomRows.forEach(function (item) {
						if (item.getValue("parentRowNum") == parentRowNum) {
							viewModel.BomItems.removeRows(item);
							item.setValue("dr", "1");
							item.setValue("persistStatus", "fdel");
							if(item.data.persistStatus.baseValue == "new"){
								delBom.push(item)
							}
						}
						// if (item.getValue("parentRowNum") == parentRowNum) {
						// 	viewModel.BomItems.removeRows(item);
						// 	delBom.push(item);
						// }
					})
				});
				// delBom.forEach(function (row, index, arr) {
				// 	row.setValue("dr", "1");
				// });
				viewModel.BomItems.removeRows(delBom, {
					forceDel: true
				});
				viewModel.initializationItems.removeRows(selectedRows);
			},
			validateBill: function () {
				// 校验
				var validate = $(".ui-bill-panel")[0];
				var result = app.compsValidateMultiParam({
					element: validate,
					showMsg: true
				});
				if (result.passed) {
					var rows = viewModel.initializationItems.getAllRealRows();
					if (rows && rows.length > 0) {

					} else {
						toastr.warning("至少添加一个商品");
						return false;
					}
					return true
				} else {
					return false;
				}
			},
			//判断商品行仓库和批次号
			checkEmpty: function () {
				var allItemRows = viewModel.initializationItems.getAllRealRows();
				var ifSlotManage = viewModel.initializationCard.getValue("ifSlotManage");
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
						if (!item.getValue("goodsPositionId") && parseFloat(ifSlotManage) == 1) {
							emptyPositionRows += item.getValue("rowNum") + ",";
						}
						if (parseFloat(item.getValue("enableBatchNoManage")) == 1 && !(item.getValue("batchCodeId"))) {

							emptyBatchNoRows += item.getValue("rowNum"); +
							",";
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
			saveBill: function () {
				var result = viewModel.validateBill();
				if (result) {
					// 组装数据
					var currentRow, ajaxType;
					var index = viewModel.index;
					var initializationData = viewModel.initializationCard.getSimpleData()[0];
					var initializationItemsData = viewModel.initializationItems.getSimpleData();
					var BomItemsData = viewModel.BomItems.getSimpleData();
                    BomItemsData.forEach(function (item) {
                        if (item.dr == null) {  // !0 = true 新增商品dr为null
                            item.persistStatus = "new";
                        }
                    });
					initializationData.initializtioninItems = initializationItemsData;
					initializationData.initializtioninItemBoms = BomItemsData;
					if (index >= 0) {
						ajaxType = "put";
					} else {
						ajaxType = "post";
					}
					//判断批次号及货位
					if (!viewModel.checkEmpty()) {
						return;
					};
					// 提交
					$._ajax({
						url: appCtx + viewModel.baseurl,
						type: ajaxType,
						data: JSON.stringify(initializationData),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							common.dialog.stockConfirmDialog(data, function () {
								// 回写界面
								if (index >= 0) {
									//获取需要修改的行
									currentRow = viewModel.initializationList.getRowByRowId(viewModel.rowId);
								} else {
									//添加数据
									currentRow = viewModel.initializationList.createEmptyRowF();
								}
								currentRow.setSimpleData(data);
								viewModel.retListPanel();
								toastr.success("保存成功");
							});
						}
					})
				}
			},
			//签字
			sign: function () {
				var selectedRows = viewModel.initializationList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function (row) {
						return row.getValue("id");
					})
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/sign",
						data: {
							ids: ids.join(",")
						},
						success: function (data) {
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("billStatusCode", "02");
								selectedRows[i].setValue("billStatusName", "已签字");
								selectedRows[i].setValue("approver", data.name);
								selectedRows[i].setValue("tauditTime", data.time);
							}
						}
					})
				} else {
					toastr.warning("请至少选择一项");
				}

			},
			//取消签字
			cancelsign: function () {
				var selectedRows = viewModel.initializationList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function (row) {
						return row.getValue("id");
					})
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/cancelSign",
						data: {
							ids: ids.join(",")
						},
						success: function () {
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("billStatusCode", "01");
								selectedRows[i].setValue("billStatusName", "自由");
								selectedRows[i].setValue("approver", null);
								selectedRows[i].setValue("tauditTime", null);

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
				viewModel.ItemRefList.setValue("goodsref", "");
				var refer = $("#refContainergoodsref").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			//导入
			importHandle: function () {
				var urlInfo = '/stock/initializtionins-excel' + '/excelDataImport'; //倒入地址参数
				var urlStatusInfo = '/stock/initializtionins-excel' + '/excelLoadingStatus'; //请求进度地址参数
				var ele = $('#importFiel')[0]; //挂载元素
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
			},
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = '/stock/initializtionins-excel' + '/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = '/stock/initializtionins-excel' + '/excelDataExport'; //导出数据地址参数
				var listData = viewModel.initializationList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
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
						})
						$("#tab1").addClass("is-active");
						$("#tab3").addClass("is-active");
						$("#tab-panel-1").hide();
					})
				}
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
				var data = viewModel.initializationItems.getSimpleData();
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
			//计算价格
			sumPrice: function (row) {
				var amount = row.getValue('goodsNum');
				var unitPrice = row.getValue('unitPrice');
				amount == null ? 0 : parseFloat(amount);
				unitPrice == null ? 0 : parseFloat(unitPrice);
				row.setValue("amountMoney", amount * unitPrice);
				return amount * unitPrice;
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
							row.setValue("billDate", truetime);
						}
						viewModel.curDate(truetime);
					}
				});
			},
			changeCondition: function (domid, oldcondition, newcondition) {
				$("#" + domid).parent().attr("data-refparam", JSON.stringify(
					u.extend({},
						oldcondition,
						newcondition
					)
				));
			},

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
			backClac: function (obj, field) {
				// 1. 修改数量 获取当前行 parentGoodsId
				// 2. 遍历所有行取出parentGoodsId 一样的所有行
				// 3. 取出所有行里面的 amount ，并且相加
				// 4. 获取商品行goodsid 和 parentGoodsId一样的行
				// 5. 把第三步相加的和赋值给 商品行的amount  obj.rowObj

				var parentRowNum = obj.rowObj.getValue("parentRowNum");
                var BomItemRows = viewModel.BomItems.getAllRealRows();
                var bomSum = 0;
                BomItemRows.forEach(function (item) {
                	if(item.getValue("parentRowNum") == parentRowNum){
                        if (field == "unitPrice") {
                            var childGoodsQty = item.getValue("childGoodsQty") ? item.getValue("childGoodsQty") : 1;
                            bomSum = bomSum + (parseFloat(item.getValue(field) ? item.getValue(field) : 0)) * childGoodsQty;
                        }else {
                            bomSum = bomSum + parseFloat(item.getValue(field) ? item.getValue(field) : 0);
						}
                    }
                });
				var productItemRows = viewModel.initializationItems.getAllRealRows();
				productItemRows.forEach(function (item) {
					if (item.getValue("rowNum") == parentRowNum) {
						item.setValue(field, bomSum)
					}
				})
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
				var data = viewModel.initializationItems.getSimpleData()[obj];
				var thisDatable = viewModel.initializationItems.getAllRealRows()[obj];
				var id = data.goodsId;
				var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
				common.goodsOptional.goodsOptional(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptional', viewModel.initializationItems, viewModel.BomItems, function (goodsOptData, goodsOptID, cb) {
					/**
					 * 循环遍历返回结果，拼接后展示
					 */
					var goodsOpt = goodsOptID[0].goodsOptDtos; // 选配与商品结构互斥，暂时理解为有子件的话不会出现选配信息 故只去第0项
					//获取全部bom信息
					var allrows = viewModel.BomItems.getAllRealRows();
					var bomdata = viewModel.BomItems.getRealSimpleData();
					//获取全部bom信息
					for (var i = 0; i < bomdata.length; i++) {
						for (var j = 0; j < goodsOpt.length; j++) {
							if (bomdata[i].goodsId == goodsOpt[j].goodsId) {
								allrows[i].setValue("goodsSelection", goodsOpt[j].id);
								allrows[i].setValue("goodsSelectionDescription", goodsOpt[j].optResult);
							}
						}
					}
					var optResult = '',
						id = '';
					for (var i = 0; i < goodsOpt.length; i++) {
						optResult += goodsOpt[i].optResult + ',';
						id += goodsOpt[i].id + ',';
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
				var data = viewModel.initializationItems.getSimpleData()[obj];
				var id = data.id ? data.id : data.goodsId;
				var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
				common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.initializationItems, viewModel.BomItems);
			},
		},
		afterCreate: function () {

			// 子表参照聚焦行，用于绑定子表参照组件
			var refRow = viewModel.ItemRefList.createEmptyRow();
			viewModel.ItemRefList.setRowFocus(refRow);
			// 确定销售产品参照，为产品组合子表增行
			viewModel.ItemRefList.on("goodsref.valuechange", function (obj) {
				// 清空参照时不增行
				if (!obj.newValue) {
					return;
				}
				var refer = $("#refContainergoodsref").data("uui.refer");
				var refValues = refer.values;
				if (refValues && refValues.length > 0) {
					for (var i = 0; i < refValues.length; i++) {
						var bomItems = [];
						var id = refValues[i].refpk;
						var name = refValues[i].refname;
						var rowNum = viewModel.generateRownum();
                        var newrow = viewModel.initializationItems.createEmptyRow();
                        newrow.setValue("rowNum", rowNum);
                        newrow.setValue("goodsId", refValues[i].refpk);
                        newrow.setValue("goodsCode", refValues[i].refcode);
                        newrow.setValue("goodsName", refValues[i].refname);
                        newrow.setValue("goodsFullName", refValues[i].fullName);
                        newrow.setValue("goodsVersion", refValues[i].version);
                        newrow.setValue("unitId", refValues[i].basicUnitId);
                        newrow.setValue("unitName", refValues[i].basicUnitName);
                        newrow.setValue("enableBatchNumberManage", refValues[i].enableBatchNumberManage); // 批次信息管理
                        newrow.setValue("enableBatchNoManage", refValues[i].enableBatchNoManage);
                        newrow.setValue("enableInvStatusManage", refValues[i].enableInvStatusManage);
                        newrow.setValue("productLineId", refValues[i].productLineId);
                        newrow.setValue("productId", refValues[i].productId);
                        newrow.setValue("originalGoodsId", refValues[i].parentOriginalGoodsId);
						//bom产品信息的添加
						var bomdata = viewModel.findBomByParentId(id);
						if (bomdata.length > 0) {
							var bomItem = bomdata[0].goodsBomChildren;
							bomItem.forEach(function (item) {
								if (item.isOptional == 1) {
									newrow.setValue("isOptional", 1);
								}
								//转参照里字段
								var bomRowNum = viewModel.generateBomrowNum();
								item.id = null;
								item.goodsName = item.childGoodsName;
								item.goodsId = item.childGoodsId;
								item.goodsCode = item.childGoodsCode;
								item.unitId = item.childGoodsUnitId;
								item.unitCode = item.childGoodsUnitCode;
								item.unitName = item.childGoodsUnitName;
								item.goodsVersion = item.childGoodsVersion;
								item.goodsNum = item.childGoodsQty;
								item.parentRowNum = rowNum;
								item.rowNum = bomRowNum;
								item.parentGoodsId = id;
								item.parentGoodsName = name;
								item.originalGoodsId = item.childOriginalGoodsId;
								viewModel.currowBomNum(bomRowNum);
								bomItems.push(item)
							});
							viewModel.BomItems.addSimpleData(bomItems);
						} else {
							//没有bom结构的商品直接复制过来
							var parentRowNum = rowNum;
							var bomRowNum = viewModel.generateBomrowNum();
							var cpRow = viewModel.BomItems.createEmptyRow();
							var parentGoodsId = newrow.getValue("goodsId");
							cpRow.setSimpleData(newrow.getSimpleData());
							cpRow.setValue("rowNum", bomRowNum);
							cpRow.setValue("parentRowNum", parentRowNum);
							cpRow.setValue("parentGoodsId", parentGoodsId);
							// bomItems.push(cpRow.getSimpleData());
						}
					}
				}
			});
			// 经销商和收货地址联动
			viewModel.initializationCard.on("pkOrgId.valuechange", function (obj) {
				var pkOrgId = obj.newValue;
				if (pkOrgId) {
					viewModel.changeCondition("storehouseId", {
						"EQ_isEnable": "1"
					}, {
						"EQ_inventoryOrg.id": pkOrgId
					});
					// 选择完库存组织后可点击
					$("#storehouseId").attr('placeholder', "");
					viewModel.initializationCard.setMeta("storehouseId", "enable", true);
				} else {
					viewModel.changeCondition("storehouseId", {
						"EQ_isEnable": "1"
					}, {});
					// 仓库不可点，选择完库存组织后可点击
					$("#storehouseId").attr('placeholder', "请先选择库存组织");
					viewModel.initializationCard.setMeta("storehouseId", "enable", false);
				}
				if (!obj.ctx) {
					viewModel.initializationCard.setValue("storehouseId", null);
				}
			});
			viewModel.initializationCard.on("storehouseId.valuechange", function (obj) {
				if (obj.newValue) {
					var refer = $("#refContainerstorehouseId").data("uui.refer");
					if (refer.values && refer.values.length > 0) {
						var trueValue = refer.values[0];
						// 组织不存在给组织赋值
						// if (!viewModel.initializationCard.getValue("pkOrgId") ||
						// 	viewModel.initializationCard.getValue("pkOrgId") != trueValue.inventoryOrgId) {
						// 	viewModel.initializationCard.getFocusRow().setValue("pkOrgId", trueValue.inventoryOrgId, true);
						// }
						// 更新货位管理状态
						viewModel.initializationCard.setValue("ifSlotManage", trueValue.ifSlotManage);
						// 更新货位状态
						viewModel.initializationItems.setMeta("goodsPositionId", "refparam",
							'{"EQ_wareHouse":"' + obj.newValue + '","EQ_isFinal":"1"}');
					}
				} else {
					// 更新批次管理状态
					viewModel.initializationCard.setValue("ifSlotManage", '0');
				}
				// 若仓库变化则清空之前选择的货位
				if (obj.oldValue && obj.oldValue != obj.newValue) {
					var itemrows = viewModel.initializationItems.getAllRows();
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
			});
			// 数量联动金额
			viewModel.initializationItems.on("goodsNum.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
				}
				var arr = viewModel.initializationItems.getSimpleData();
				var amount = [];
				var getSum = function (array) {
					var sum = 0;
					for (var i = 0; i < array.length; i++) {
						sum += parseInt(array[i]);
					}
					return sum;
				}
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i].goodsNum) {
						arr[i].goodsNum = 0
					}
					var amountItem = parseFloat(arr[i].goodsNum)
					amount.push(amountItem);
				}
				viewModel.initializationCard.getCurrentRow().setValue("totalGoodsNum", getSum(amount));

				//联动bom数量
				var parentRowNum = obj.rowObj.getValue("rowNum");
				//获取全部bom信息
                var allrows = viewModel.BomItems.getAllRealRows();
				for (var i = 0; i < allrows.length; i++) {
					if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                        var childQty = allrows[i].getValue("childGoodsQty") ? allrows[i].getValue("childGoodsQty") : 1;
                        var bomAmount = childQty * obj.newValue;
						allrows[i].setValue("goodsNum", bomAmount)
					}
				}
			});
			// 单价联动金额
			viewModel.initializationItems.on("unitPrice.valuechange", function (obj) {
				var row = obj.rowObj;
				var value = obj.newValue;
				var oldValue = obj.oldValue;
				if (value) {
					var goodsNum = row.getValue("goodsNum") || 0;
					var amount = viewModel.formater.format(parseFloat(value) * parseFloat(goodsNum));
					row.setValue("amountMoney", amount);
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

			//Bom数量变化联动总价
			viewModel.BomItems.on("goodsNum.valuechange", function (obj) {
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
				var arr = viewModel.BomItems.getSimpleData();
				var price = [];
				for (var i = 0; i < arr.length; i++) {
					var amountMoney = parseFloat(arr[i].amountMoney ? arr[i].amountMoney : 0)
					price.push(amountMoney);
				}
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
			});

			//批次号 货位 批号 供应商 项目 库存状态 客户
			viewModel.initializationItems.on("valuechange", function (obj) {
				function setValueToBom() {
					var parentRowNum = obj.rowObj.getValue("rowNum");
                    var allrows = viewModel.BomItems.getAllRealRows();
					for (var i = 0; i < allrows.length; i++) {
						var nameField = obj.field.replace("Id", "Name");
						var idField = obj.field;
						if (allrows[i].getValue("parentRowNum") == parentRowNum) {
							//含有包件
							allrows[i].setValue(obj.field, obj.newValue);
							if (obj.newValue) {
								allrows[i].setValue(nameField, obj.rowObj.data[idField].meta.display)
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