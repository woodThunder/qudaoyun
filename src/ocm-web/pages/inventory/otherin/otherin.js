define(['text!./otherin.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
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
			index: -1,
			baseurl: '/stock/other-in-bills',
			complexList: new u.DataTable(model.options.metas.complex),
			complexItems: new u.DataTable(model.options.metas.complexItem),
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

			//商品信息
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			//BOM结构信息
			grid4Option: model.options.grids.grid4,
			grid5Option: model.options.grids.grid5,

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
			//跳转详情页
			goDetailPanel: common.bill.goDetailPanel,
			// 行号池
			curlineNum: ko.observable(0),
			currowBomNum: ko.observable(0),
			// 是否bom页签
			isBomPanel: ko.observable(),
			curDate: ko.observable(),
			enableFmt: ko.pureComputed(function () {
				var enableStatus = viewModel.complexList.ref("enableStatus")();
				return enableStatus == 1 ? "启用" : "停用";
			})
		},
		rendertype: {
			operation: function (obj) {
				var editfun, delfun;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var billStatusCode = obj.row.value.statusCode;
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
			enableStatusRender: common.rendertype.enableRender,
			detailRender: common.rendertype.detailRender,
            beforeBomEditCheck : function (obj) {
                var gridObj = obj.gridObj;
                var row = obj.rowObj.value;
                if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("parentGoodsId"))) {
                    if (!row.goodsId) {
                        toastr.warning("请先选择商品");
                        return false;
                    }
                    var parentRowNum = row.parentRowNum;
                    var productItemRows = viewModel.complexItems.getAllRealRows();
                    for(var i=0; i<productItemRows.length; i++){
                        if (productItemRows[i].getValue("rowNum") == parentRowNum) {
                            if(productItemRows[i].getValue("goodsId") != row.goodsId){
                                return false;
                            }
                        }
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
							if(""==parentGoodsIds){
								viewModel.BomItems.setMeta("parentGoodsId", "refparam", '{"EQ_isEnable":"1","EQ_isServiceType":"0"}')
							}else{
								viewModel.BomItems.setMeta("parentGoodsId", "refparam", '{"EQ_isEnable":"1","EQ_isServiceType":"0","IN_id":"' + parentGoodsIds + '"}')
							}
                            
                        }
                    });
                    return true;
                }
                return true;
            },
			beforeEditCheck: function (obj) {
				var gridObj = obj.gridObj;
				// 判断当前货位是否可编辑
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionId"))) {
					// 先判断有没有仓库
					if (viewModel.complexList.getValue("stockInStorageId")) {
						if (viewModel.complexList.getValue("ifSlotManage") != '1') {
							toastr.warning("该仓库未开启货位管理");
							return false;
						}
					} else {
						toastr.warning("请先选择仓库")
						return false
					}
					// 判断仓库是否启用货位管理
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchNumId"))) {
					var row = obj.rowObj.value;
					var enableBatchNumberManage = row.enableBatchNumberManage;
					if (enableBatchNumberManage == '1') {
						viewModel.complexItems.setMeta("batchNumId", "refparam",
							'{"EQ_goods":"' + row.goodsId + '","EQ_product":"' + row.productId + '","EQ_productLine":"' + row.productLineId + '","EQ_isEnable":"1"}');

					} else {
						toastr.warning("该商品未开启批次控制")
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))) {
					var row = obj.rowObj.value;
					if (row.enableBatchNoManage == '1') {
						viewModel.complexItems.setMeta("batchCodeId", "refparam",
							'{"EQ_goods":"' + row.goodsId + '","EQ_isEnable":"1"}');
					} else {
						toastr.warning("该商品未开启批号控制");
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("stockStateId"))) {
					var row = obj.rowObj.value;
					if (row.enableInvStatusManage == '1') {
						viewModel.complexItems.setMeta("stockStateId", "refparam",
							'{"EQ_isEnable":"1"}');
					} else {
						toastr.warning("该商品未开启库存状态");
						return false
					}
				}
				// BOM判断
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
			//自动取数
			autonum: function () {
				var items = viewModel.complexItems.getAllRealRows();
				var curRow = viewModel.complexList.getCurrentRow();
				// items.map(function (item) {
				//     item.setValue("factInAmount",item.getValue("shouldInAmount"));

				// });
				for (var i = 0; i < items.length; i++) {
					items[i].setValue("factInNum", items[i].getValue("shouldInNum"));
				}
			},
			//删除和批量删除
			del: function (data, rowId) {
				if (typeof (data) == 'number') {
					viewModel.complexList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.complexList.getSelectedRows();
				if (rows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].getValue("statusCode") == "02") {
							toastr.warning("已签字单据不可删除");
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
							url: appCtx + viewModel.baseurl + "/delete",
							type: "post",
							// data: "ids=" + ids.join(","),
							data: {
								ids: ids.join(",")
							},
							success: function (data) {
								viewModel.complexList.removeRows(rows);
							}
						});

					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.complexList.pageIndex(0);
				}
				viewModel.complexList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.complexList.pageSize();
				var pageNumber = viewModel.complexList.pageIndex();
				var goods = queryData.search_EQ_goods;
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
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
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//签字
			signbtn: function (obj) {
				var selectedRows = viewModel.complexList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function (row) {
						var factInNum = row.getValue("totalFactInNum");
						if (factInNum > 0) {
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
								var factInNum = selectedRows[i].getValue("totalFactInNum");
								var statusCode = selectedRows[i].getValue("statusCode");
								if (factInNum > 0 && statusCode == "01") {
									selectedRows[i].setValue("statusCode", "02");
									selectedRows[i].setValue("statusName", "已签字");
								} else {
									toastr.warning("自由态且实际入库量大于0时，才能签字");
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
				var selectedRows = viewModel.complexList.getSelectedRows();
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
								selectedRows[i].setValue("statusCode", "01");
								selectedRows[i].setValue("statusName", "自由");
							}
						}
					})
				} else {
					toastr.warning("请至少选择一项");
				}

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
			//进入新增单据页
			showAddBillPanel: function () {
				viewModel.index = -1;
				viewModel.isBomPanel(true);
				$("#tab-panel-2").hide();
				$("#tab-panel-1").show();
				var curRow = viewModel.complexList.createEmptyRowF();
				viewModel.complexList.setRowFocus(curRow);
				viewModel.complexItems.removeAllRows();
				viewModel.BomItems.removeAllRows();
				curRow.setValue("statusCode", "01");
				curRow.setValue("tranTypeId", "OtherIn");
				curRow.setValue("tranTypeName", "其它入库");
				viewModel.complexList.setMeta("tranTypeId", "enable", false);
				viewModel.getCurDate(curRow, "billDate");
				viewModel.curlineNum(0);
				viewModel.currowBomNum(0);
				viewModel.complexList.setMeta("stockInStorageId", "enable", false);
				$("#stockInStorageref").attr('placeholder', "请先选择库存组织");
				viewModel.goBillPanel();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
			},
			gettranTypeId: function () {
				$("#tranTypeId input").val("盘盈入库");
				// var refer = $("#refContainertranTypeId").data("uui.refer");
				// refer.setValue(null);
				// refer.blurEventVal();
			},

			//日期
			getCurDate: function (row, field) {
				// 服务器时间获取
				$._ajax({
					type: "post",
					url: appCtx + '/stock/common/get-current-date',
					success: function (data) {
						var truetime = u.date.format(data, 'YYYY/MM/DD');
						truetime = new Date(truetime).getTime();
						if (row) {
							row.setValue(field, truetime);
						}
						viewModel.curDate(truetime);
					}
				});
			},
			// 从行号池中拿到最新的行号
			generatelineNum: function () {
				var latestnum = viewModel.curlineNum(),
					newnum = parseFloat(latestnum) + 10;
				viewModel.curlineNum(newnum);
				return newnum;
			},
			getCurlineNum: function () {
				var data = viewModel.complexItems.getSimpleData();
				var maxlineNum = 0;
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].rowNum > maxlineNum) {
							maxlineNum = data[i].rowNum;
						}
					}
				}
				viewModel.curlineNum(maxlineNum);
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

			//进入修改单据页
			showEditBillPanel: function (index, rowId) {
				$("#tab-panel-2").hide();
				$("#tab-panel-1").show();
				var row;
				if (index == -1) {
					row = viewModel.complexList.getFocusRow();
					index = 0
				} else {
					row = viewModel.complexList.getRowByRowId(rowId)
				}
				viewModel.index = index;
				viewModel.rowId = row.rowId;

				var id = row.getValue("id");
				viewModel.complexList.setRowFocus(row);
				viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();
				//查询子表数据
				viewModel.findByParentid(id);
				viewModel.getCurlineNum();
				viewModel.getBomCurrowNum();
				viewModel.seteidtCondition();
				viewModel.goBillPanel();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
			},
			seteidtCondition: function () {
				var stockOrgId = viewModel.complexList.getValue("stockOrgId");
				var stockInStorageId = viewModel.complexList.getValue("stockInStorageId");
				viewModel.changeCondition("stockInStorageref", {
					"EQ_isEnable": "1"
				}, {
					"EQ_inventoryOrg.id": stockOrgId
				})
				viewModel.complexItems.setMeta("goodsPositionId", "refparam", '{"EQ_wareHouse":"' + stockInStorageId + '","EQ_isFinal":"1"}');
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
			detail: function () {
				$("#tab-panel-4").hide();
				$("#tab-panel-3").show();
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.complexList.getCurrentRow();
					var id = curRow.getValue("id");
					viewModel.findByParentid(id);
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
					viewModel.goDetailPanel();
				}, 0);
			},
			//查询子表数据
			findByParentid: function (id) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/findByParentid",
					type: 'get',
					async: false,
					data: {
						id: id
					},
					success: function (data) {
						data.otherInBillItems.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
						});
						data.otherInBillItemBoms.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
						});
						viewModel.complexItems.setSimpleData(data.otherInBillItems, {
							unSelect: true
						});
						viewModel.BomItems.setSimpleData(data.otherInBillItemBoms, {
							unSelect: true
						});
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
			//跳转单据详情页
			showBillDetail: function () {
				$(".ui-list-panel").addClass("animated slideInLeft");
				$(".ui-bill-panel").addClass("animated slideOutDown");
			},
			//新增子表项
			addItem: function () {
				viewModel.complexItems.createEmptyRow();
			},
			//删除子表项
			delItems: function () {
				var selectedRows = viewModel.complexItems.getSelectedRows();
				var delBom = [];
				for (var i = 0; i < selectedRows.length; i++) {
					selectedRows[i].setValue("dr", "1");
                    var parentRowNum = selectedRows[i].getValue("rowNum");
					var allBomRows = viewModel.BomItems.getAllRealRows();
					allBomRows.forEach(function (item) {
                        if (item.getValue("parentRowNum") == parentRowNum) {
							viewModel.BomItems.removeRows(item);
							delBom.push(item);
						}
					})
				}
				delBom.forEach(function (row, index, arr) {
					row.setValue("dr", "1");
				});
				viewModel.BomItems.removeRows(delBom, {
					forceDel: true
				});
				viewModel.complexItems.removeRows(selectedRows);
			},
			//判断商品行仓库和批次号
			checkEmpty: function () {
				var allItemRows = viewModel.complexItems.getAllRealRows();
				var ifSlotManage = viewModel.complexList.getValue("ifSlotManage");
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
                        if(!item.getValue("goodsSelection") && parseFloat(item.getValue("isOptional")) == 1){
                            emptyGoodsOptRows += item.getValue("rowNum") + ",";
                        }
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
				var result = app.compsValidateMultiParam({
					element: ".ui-bill-panel",
					showMsg: true
				});
				if (!result.passed) {
					return;
				}
				var allRows = viewModel.complexItems.getAllRows();
				if (allRows.length == 0 || allRows.every(function (row) {
						return row.status == u.Row.STATUS.FALSE_DELETE
					})) {
					toastr.error("请录入表体行数据");
					return;
				}
				//判断批次号及货位
				if (!viewModel.checkEmpty()) {
					return;
				};
				var complexData = viewModel.complexList.getCurrentRow().getSimpleData();
				var complexItemsData = viewModel.complexItems.getSimpleData();
				var BomItemsData = viewModel.BomItems.getSimpleData();
				if (viewModel.index == -1) {
					complexItemsData.forEach(function (item) {
						item.persistStatus = 'new';
					});
					BomItemsData.forEach(function (item) {
						item.persistStatus = 'new';
					});
				}
				complexData.otherInBillItems = complexItemsData;
				complexData.otherInBillItemBoms = BomItemsData;
				var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
				$._ajax({
					url: appCtx + viewModel.baseurl,
					type: _ajaxType,
					data: JSON.stringify(complexData),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						common.dialog.stockConfirmDialog(data, function () {
							viewModel.complexList.getFocusRow().setSimpleData(data);
							viewModel.retListPanel();
						});
					}
				})
			},
			//重置单据
			resetBill: function () {
				// var curRow = viewModel.complexList.getCurrentRow();
				// 新增重置
				// 编辑重置（修改或复制）
			},
			//取消单据
			cancelBill: function () {
				viewModel.complexItems.removeAllRows();
				var curRow = viewModel.complexList.getCurrentRow();
				// 修改，则还原
				if (curRow.getValue("id")) {
					curRow.setSimpleData(viewModel.complexList.originEditData)
				}
				// 新增或复制，则删除
				else {
					viewModel.complexList.removeRow(curRow);
					viewModel.complexItems.removeAllRows();
				}
				viewModel.retListPanel();
			},
			//启用
			enable: function () {
				var selectedRows = viewModel.complexList.getSelectedRows();
				if (selectedRows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (selectedRows && selectedRows.length > 0) {
					var ids = [];
					for (var i = 0; i < selectedRows.length; i++) {
						ids.push(selectedRows[i].getValue("id"));
					}
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/enable",
						data: {
							ids: ids.join(",")
						},
						success: function (res) {
							toastr.success();
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("enableStatus", "1");
							}
						}
					})
				}
			},
			//停用
			disable: function () {
				var selectedRows = viewModel.complexList.getSelectedRows();
				if (selectedRows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (selectedRows && selectedRows.length > 0) {
					var ids = [];
					for (var i = 0; i < selectedRows.length; i++) {
						ids.push(selectedRows[i].getValue("id"));
					}
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/disable",
						data: {
							ids: ids.join(",")
						},
						success: function (res) {
							toastr.success();
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("enableStatus", "0");
							}
						}
					})
				}
			},
			//参照选择批量新增子表（销售产品）
			showAddItemsRef: function () {
				var curRow = viewModel.complexList.getCurrentRow().getSimpleData();
				if (curRow.stockOrgId && curRow.stockInStorageId) {
					viewModel.clearItemsRef();
					$("#addItemsRef .refer").trigger("click");
				} else {
					toastr.warning("请先选择库存组织及仓库");
				}
			},
			//清空已选销售产品参照
			clearItemsRef: function () {
				viewModel.ItemRefList.setValue("productref", "");
				var refer = $("#refContainerproductref").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			detail2bill: function () {
				$("#tab-panel-2").hide();
				$("#tab-panel-1").show();
				var billstatus = viewModel.complexList.getValue("statusCode");
				if (billstatus !== "01") {
					toastr.warning("自由态才可进入编辑页面");
					return;
				}
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				common.bill.detail2bill();
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
				var listData = viewModel.complexList; //需要导出表格的dataTable
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
			//计算价格
			sumPrice: function (row) {
				var amount = row.getValue('factInNum');
				var unitPrice = row.getValue('unitPrice');
				return viewModel.accMul(amount,unitPrice);
			},

			accMul:function(arg1, arg2) {
				if (isNaN(arg1)) {
					arg1 = 0;
				}
				if (isNaN(arg2)) {
					arg2 = 0;
				}
				arg1 = Number(arg1);
				arg2 = Number(arg2);
				
				var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
				try {
					m += s1.split(".")[1].length;
				}
				catch (e) {
				}
				try {
					m += s2.split(".")[1].length;
				}
				catch (e) {
				}
				return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
			},

			changeCondition: function (domid, oldcondition, newcondition) {
				$("#" + domid).parent().attr("data-refparam", JSON.stringify(
					u.extend({},
						oldcondition,
						newcondition
					)
				));
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

			backClac: function (obj, field) {
				// 1. 修改数量 获取当前行 parentGoodsId
				// 2. 遍历所有行取出parentGoodsId 一样的所有行
				// 3. 取出所有行里面的 amount ，并且相加
				// 4. 获取商品行goodsid 和 parentGoodsId一样的行
				// 5. 把第三步相加的和赋值给 商品行的amount  obj.rowObj
				var goodsId = obj.rowObj.getValue("goodsId");
                var parentRowNum = obj.rowObj.getValue("parentRowNum");
				var BomItemRows = viewModel.BomItems.getAllRealRows();
				var productItemRows = viewModel.complexItems.getAllRealRows();
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
                        if (item.getValue("goodsId") != goodsId) {
                            item.setValue(field, oneParentBomSum)
                        } else{
                            item.setValue(field, obj.newValue);
                        }
                    }
				});
			},

			// 选配
			goodsOpt: function (obj) {
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
				var data = viewModel.complexItems.getSimpleData()[obj];
				var thisDatable = viewModel.complexItems.getAllRealRows()[obj];
				var id = data.goodsId;
				var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
				common.goodsOptional.goodsOptional(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptional', viewModel.complexItems, viewModel.BomItems, function (goodsOptData, goodsOptID, cb) {
					console.log(goodsOptID[0]);
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
							if (bomdata[i].goodsId == goodsOpt[j].goodsId && goodsOpt[j].optResult) {
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
				var data = viewModel.complexItems.getSimpleData()[obj];
				var id = data.goodsId;
				var goodsSelection = data.goodsSelection ? data.goodsSelection : "";

				common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.complexItems, viewModel.BomItems);
			},
		},
		afterCreate: function () {
			// 列表查询数据(无查询条件)
			// viewModel.search();
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
				if (refValues && refValues.length > 0) {
					for (var i = 0; i < refValues.length; i++) {
						var rowNum = viewModel.generatelineNum();
						var bomItems = [];
						var id = refValues[i].refpk;
						var name = refValues[i].refname;
                        var newrow = viewModel.complexItems.createEmptyRow();
                        newrow.setValue("rowNum", rowNum);
                        newrow.setValue("goodsId", refValues[i].refpk);
                        newrow.setValue("goodsCode", refValues[i].refcode);
                        newrow.setValue("goodsName", refValues[i].refname);
                        newrow.setValue("goodsVersion", refValues[i].version);
                        newrow.setValue("enableBatchNumberManage", refValues[i].enableBatchNumberManage);
                        newrow.setValue("enableBatchNoManage", refValues[i].enableBatchNoManage);
                        newrow.setValue("enableInvStatusManage", refValues[i].enableInvStatusManage);
                        newrow.setValue("productLineId", refValues[i].productLineId);
                        newrow.setValue("productId", refValues[i].productId);
                        newrow.setValue("unitId", refValues[i].basicUnitId);
                        newrow.setValue("unitName", refValues[i].basicUnitName);
                        newrow.setValue("unitCode", refValues[i].basicUnitCode);
                        newrow.setValue("originalGoodsId", refValues[i].parentOriginalGoodsId);
                        // 添加是否选配
                        newrow.setValue("isOptional", refValues[i].isOptional);
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
								/*item.factInNum = item.childGoodsQty;*/
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
						}
					}
				}
			});

			//实入数量
			viewModel.complexItems.on("factInNum.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					if (obj.newValue < 0.00) {
						toastr.warning("实入数量不能小于 0 ");
						obj.rowObj.setValue("factInNum", 0.00);
					}
					obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
				}
				var factInNum = viewModel.complexItems.getValue("factInNum");
				var shouldInNum = viewModel.complexItems.getValue("shouldInNum");
				if ((!shouldInNum || shouldInNum == 0) && (factInNum || factInNum != 0)) {
					obj.rowObj.setValue("shouldInNum", shouldInNum == "" ? 0 : factInNum);
				}
				var arr = viewModel.complexItems.getSimpleData();
				var amount = [];
				var getSum = function (array) {
					var sum = 0;
					for (var i = 0; i < array.length; i++) {
						sum += parseInt(array[i]);
					}
					return sum;
				}
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i].factInNum) {
						arr[i].factInNum = 0
					}
					var amountItem = parseFloat(arr[i].factInNum)
					amount.push(amountItem);
				}
				viewModel.complexList.getCurrentRow().setValue("totalFactInNum", getSum(amount));

				//联动bom数量
                var parentRowNum = obj.rowObj.getValue("rowNum");
				//获取全部bom信息
                var allrows = viewModel.BomItems.getAllRealRows();
				for (var i = 0; i < allrows.length; i++) {
                    if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                        var childQty = allrows[i].getValue("childGoodsQty") ? allrows[i].getValue("childGoodsQty") : 1;
                        var bomAmount = childQty * obj.newValue;
                        allrows[i].setValue("factInNum", bomAmount)
                    }
				}
			});
			//应入数量
			viewModel.complexItems.on("shouldInNum.valuechange", function (obj) {
				if (obj.newValue < 0.00) {
					toastr.warning("应入数量不能小于 0 ");
					obj.rowObj.setValue("shouldInNum", 0.00);
				}
				//联动bom数量
                var parentRowNum = obj.rowObj.getValue("rowNum");
				//获取全部bom信息
                var allrows = viewModel.BomItems.getAllRealRows();
				for (var i = 0; i < allrows.length; i++) {
                    if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                        var childQty = allrows[i].getValue("childGoodsQty") ? allrows[i].getValue("childGoodsQty") : 1;
                        var bomAmount = childQty * obj.newValue;
                        allrows[i].setValue("shouldInNum", bomAmount)
                    }
				}
			});
			//单价
			viewModel.complexItems.on("unitPrice.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
				}
                var parentRowNum = obj.rowObj.getValue("rowNum");
                var goodsId = obj.rowObj.getValue("goodsId");
				//获取全部bom信息
                var allrows = viewModel.BomItems.getAllRealRows();
				for (var i = 0; i < allrows.length; i++) {
                    if (allrows[i].getValue("goodsId") == goodsId && allrows[i].getValue("parentRowNum") == parentRowNum) {
						var unitPrice = obj.newValue;
						allrows[i].setValue("unitPrice", unitPrice);
					}
				}
			});
			//Bom数量变化联动总价
			viewModel.BomItems.on("factInNum.valuechange", function (obj) {
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
				// viewModel.complexList.getCurrentRow().setValue("totalAmountMoney", getSum(price));

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

			//库存组织参照传参库存参照
			viewModel.complexList.on("stockOrgId.valuechange", function (obj) {
				var row = viewModel.complexList.getCurrentRow();
				var stockOrgId = row.getValue("stockOrgId");
				$("#stockInStorageref").parent().attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}');
				if (stockOrgId) {
					viewModel.complexList.setMeta("stockInStorageId", "enable", true);
					$("#stockInStorageref").removeAttr('placeholder');
				} else {
					viewModel.complexList.setMeta("stockInStorageId", "enable", false);
					$("#stockInStorageref").attr('placeholder', "请先选择库存组织");
				}
				row.setValue("stockInStorageId", "");
			});
			// 仓库参照传参货位参照
			viewModel.complexList.on("stockInStorageId.valuechange", function (obj) {
				var row = viewModel.complexList.getCurrentRow();
				var stockOrgId = row.getValue("stockOrgId");
				// if (stockOrgId) {
				//   var refer = $("#refContainerstockOrgref").data("uui.refer");
				//   refer.setValue(null);
				//   refer.blurEventVal();
				// };

				// 仓库变化时改变是否启用货位管理字段
				var Storageref = $("#refContainerstockInStorageref").data("uui.refer");
				if (obj.newValue) {
					if (Storageref.values && Storageref.values.length > 0) {
						row.setValue("ifSlotManage", Storageref.values[0].ifSlotManage);
					}
				} else {
					row.setValue("ifSlotManage", '0');
				}
				// 若仓库变化则清空之前选择的货位
				if (obj.oldValue && obj.oldValue != obj.newValue) {
					var itemrows = viewModel.complexItems.getAllRows();
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

				var stockInStorageId = row.getValue("stockInStorageId");
				viewModel.complexItems.setMeta("goodsPositionId", "refparam", '{"EQ_wareHouse":"' + stockInStorageId + '","EQ_isFinal":"1"}');
			});

			//搜索条件 库存组织仓库过滤
			viewModel.searchcomp.viewModel.params.on("stockOrg.valuechange", function (obj) {
				if (obj.newValue != undefined && obj.newValue != "") {
					var stockOrgId = {
						"EQ_inventoryOrg.id": obj.newValue
					};
					$("#stockInStorage--id").attr("data-refparam", JSON.stringify(stockOrgId));
				} else {
					$("#stockInStorage--id").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
					viewModel.searchcomp.viewModel.params.setValue("stockInStorage", "");
				}
			})

			//批次号 货位 批号 供应商 项目 库存状态 客户
			viewModel.complexItems.on("valuechange", function (obj) {
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