define(['text!./transfer.html', 'ocm_common', 'ocm_baseview', './meta.js', '../../flow/bpmapproveref/bpmopenbill.js'], function (tpl, common, baseview, model, bpmopenbill) {
	'use strict';
	var viewModel, app;
	var BILLPANELSTATUS = {
		ADD: "add",
		EDIT: "edit",
		COPY: "copy",
		DETAIL: "detail",
		DEFAULT: "default"
	};
	var transferStatus = CONST.STOCKENUM.TRANSFER;
	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
			app = this.app;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/stock/transfer-bill',
			applicationUrl: '/stock/transfer-bill',
			transferList: new u.DataTable(model.options.metas.complex),
			transferCard: new u.DataTable(model.options.metas.complex),
			transferItems: new u.DataTable(model.options.metas.complexItem),
			BomItems: new u.DataTable(model.options.metas.BomItem),

			// 转出
			transferOutCard: new u.DataTable(model.options.metas.transferOut),
			transferOutItems: new u.DataTable(model.options.metas.transferOutItems),
			BomItemsOut: new u.DataTable(model.options.metas.BomItemOut),
			//转入
			transferInCard: new u.DataTable(model.options.metas.transferIn),
			transferInItems: new u.DataTable(model.options.metas.transferInItems),
			BomItemsIn: new u.DataTable(model.options.metas.BomItemIn),

			ItemRefList: new u.DataTable(model.options.metas.ItemRef),
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button4Source: model.options.buttons.button4,
			button5Source: model.options.buttons.button5,
			button6Source: model.options.buttons.button6, //入库

			dialogcardcomp1: {},
			dialogcard1Source: model.options.dialogs.dialog1,

			card1Source: model.options.cards.card1,
			card2Source: model.options.cards.card2,
			card3Source: model.options.cards.card3, //入库

			detail11Source: model.options.details.detail,
			grid1Option: model.options.grids.grid1,

			//商品信息
			gridGoodsEdit: model.options.grids.gridGoodsEdit,
			gridGoodsDetail: model.options.grids.gridGoodsDetail,
			//BOM结构信息
			gridBomEdit: model.options.grids.gridBomEdit,
			gridBomDetail: model.options.grids.gridBomDetail,

			//转库出库
			gridOutGoods: model.options.grids.gridOutGoods,
			gridOutBom: model.options.grids.gridOutBom,

			//转库入库
			gridInGoods: model.options.grids.gridInGoods,
			gridInBom: model.options.grids.gridInBom,

			billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//跳转详情页
			goDetailPanel: common.bill.goDetailPanel,

			goOutBillPanel: function () {
				$(".ui-panel").hide();
				$(".ui-bill-panel-out").show();
				$(".ui-bill-panel-out").animateCss("fadeIn");
			},
			goInBillPanel: function () {
				$(".ui-panel").hide();
				$(".ui-bill-panel-in").show();
				$(".ui-bill-panel-in").animateCss("fadeIn");
			},

			// 行号池
			curRowNum: ko.observable(0),
			currowBomNum: ko.observable(0),
			// 是否bom页签
			isBomPanel: ko.observable(),

			curDate: ko.observable(),
			formater: new u.NumberFormater(2),
		},
		state: ko.pureComputed(function () {
			var state = viewModel.transferList.ref("state")();
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
		rendertype: {
			//operation: common.rendertype.operation,
			detailRender: common.rendertype.detailRender,
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
				var state = obj.row.value.state;
				var editfun, delfun;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				// 待处理的转库单才可以编辑和删除
				if (state == 0) {
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
				var state = viewModel.transferList.ref("state")();
				if (state == 0) {
					return true;
				} else {
					return false;
				}
			}),
			billDateComputed: ko.pureComputed(function () {
				var truetime = viewModel.transferList.ref("billDate")();
				var showtime = u.date.format(truetime, 'YYYY-MM-DD');
				return showtime;
			}),
			billDateFormat: function (value) {
				var showtime = u.date.format(value, 'YYYY-MM-DD');
				return showtime;
			},
			beforeEditCheck: function (obj) {
				var gridObj = obj.gridObj;
				var row = obj.rowObj.value;
				var id = row.goodsId;

				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchNumId"))) {
					var enableBatchNumberManage = row.enableBatchNumberManage;
					if (enableBatchNumberManage == '1') {
						viewModel.transferItems.setMeta("batchNumId", "refparam",
							'{"EQ_goods":"' + row.goodsId + '","EQ_product":"' + row.productId + '","EQ_productLine":"' + row.productLineId + '","EQ_isEnable":"1"}');

					} else {
						toastr.warning("该商品未开启批次控制")
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))) {
					var row = obj.rowObj.value;
					if (row.enableBatchNoManage == '1') {
						viewModel.transferItems.setMeta("batchCodeId", "refparam",
							'{"EQ_goods":"' + row.goodsId + '","EQ_isEnable":"1"}');
					} else {
						toastr.warning("该商品未开启批号控制");
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("stockStateId"))) {
					var row = obj.rowObj.value;
					if (row.enableInvStatusManage == '1') {
						viewModel.transferItems.setMeta("stockStateId", "refparam",
							'{"EQ_isEnable":"1"}');
					} else {
						toastr.warning("该商品未开启库存状态");
						return false
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("price"))) {
					var bomdata = viewModel.findBomByParentId(id);
					if (bomdata.length > 0) {
						toastr.warning("此商品含有BOM结构，请在&lt;BOM结构信息&gt;页签下维护单价");
						return false;
					} else {
						return true
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
			},
			beforeEditGoodsposiCheck: function (obj) {
				var gridObj = obj.gridObj;
				// 判断当前货位是否可编辑
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionId"))) {
					var dt = obj.gridObj.options.data.replace("Items", "Card");
					// 先判断有没有仓库
					if (viewModel[dt].getValue("storageId")) {
						// 判断仓库是否启用货位管理
						if (viewModel[dt].getValue("ifSlotManage") != '1') {
							toastr.warning("该仓库未开启货位管理");
							return false;
						}
					} else {
						toastr.warning("请先选择仓库")
						return false
					}
				}
				return true

			}
		},
		events: {
            // 选配
            goodsOpt: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var goodsSelectionDescription = obj.row.value.goodsSelectionDescription;   // 选配id
                var optName = goodsSelectionDescription ? goodsSelectionDescription : '添加选配';
                var detailfun = "data-bind=click:goodsOptionalFun.bind($data,"+ obj.rowIndex +")";
                obj.element.innerHTML =
                    '<a href="#" class="ui-a-detail" ' +
                    detailfun +
                    ">"+ optName +"</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            // 查看选配
            goodsOptDetails: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var goodsSelection = obj.row.value.goodsSelection;   // 选配id
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
            goodsOptionalFun: function(obj) {
                /**
                 * @example 编辑选配common.goodsOptional.goodsOptional()
                 * @param viewModel 当前viewModel, 用来挂载dialog
                 * @param title     弹窗title
                 * @param goodsId   商品行Id
                 * @param el        dialog id (不加 ‘#’)
                 * @param callback  确定是回调函数*   需要把信息保存到订单杭上， 如果是新增，就调用当前功能新增接口，编辑同理
                 * @example callback --> 保存后拿到选配id 饭后添加到订单行上
                 * @param  callback --> 保存后的选配信息做展示
                 * @param  callback --> 保存后的选配信息做展示
                 * @param  callback --> 成功后调取回调，关闭弹窗
                 */
                var data = viewModel.transferItems.getSimpleData()[obj];
                var thisDatable = viewModel.transferItems.getAllRealRows()[obj];
                var id = data.goodsId;
                var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
                common.goodsOptional.goodsOptional(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptional',viewModel.transferItems, viewModel.BomItems, function(goodsOptData, goodsOptID, cb) {
                    /**
                     * 循环遍历返回结果，拼接后展示
                     */
                    var goodsOpt = goodsOptID[0].goodsOptDtos;           // 选配与商品结构互斥，暂时理解为有子件的话不会出现选配信息 故只去第0项
                    //获取全部bom信息
                    var allrows = viewModel.BomItems.getAllRealRows();
                    var bomdata = viewModel.BomItems.getRealSimpleData();
                    //获取全部bom信息
                    for(var i = 0; i < bomdata.length; i++){
                        for (var j = 0; j < goodsOpt.length; j ++) {
                            if (bomdata[i].goodsId == goodsOpt[j].goodsId && goodsOpt[j].optResult) {
                                allrows[i].setValue("goodsSelection", goodsOpt[j].id);
                                allrows[i].setValue("goodsSelectionDescription", goodsOpt[j].optResult);
                            }
                        }
                    }
                    var optResult = '', id = '';
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
            goodsOptDetailsFun: function(obj) {
                /**
                 * @example 查看选配common.goodsOptional.OptionalDetails()
                 * @param viewModel 当前viewModel, 用来挂载dialog
                 * @param title     弹窗title
                 * @param goodsId   商品行Id
                 * @param el        dialog id (不加 ‘#’)
                 */
                var data = viewModel.transferItems.getSimpleData()[obj];
                var id = data.id ? data.id : data.goodsId;
                var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
                common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails',viewModel.transferItems, viewModel.BomItems);
            },
			setValueToBom: function (obj) {
				var parentRowNum = obj.rowObj.getValue("rowNum");
                var allrows = viewModel.BomItems.getAllRealRows();
				for (var i = 0; i < allrows.length; i++) {
					var nameField = obj.field.replace("Id", "Name");
					var idField = obj.field;
					if (allrows[i].getValue("parentRowNum") === parentRowNum) {
						allrows[i].setValue(obj.field, obj.newValue);
						if(obj.newValue){
                            allrows[i].setValue(nameField, obj.rowObj.data[idField].meta.display);
						}
					}
				}
			},
			//删除和批量删除
			del: function (data, rowId) {
				if (typeof (data) == 'number') {
					viewModel.transferList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.transferList.getSelectedRows();
				if (rows.length == 0) {
					toastr.error("请选择数据");
					return;
				}
				if (rows && rows.length > 0) {
					if (rows.length === 1) {
						if (rows[0].getValue("state") != 0) {
							toastr.warning("不处于待处理状态的单据不能删除");
							return;
						}
					}
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].getValue("state") === 0) {
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
								viewModel.transferList.removeRows(rows);
							}
						});

					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.transferList.pageIndex(0);
				}
				viewModel.transferList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.transferList.pageSize();
				var pageNumber = viewModel.transferList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.transferList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.transferList.totalRow(data.totalElements);
						viewModel.transferList.totalPages(data.totalPages);
					}
				});
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.transferList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.transferList.pageSize(size);
				viewModel.search(true);
			},
			//进入新增单据页
			showAddBillPanel: function () {
				viewModel.index = -1;
				viewModel.isBomPanel(true);
				$("#tab-edit-bom").hide();
				$("#tab-edit-goods").show();
				viewModel.transferCard.removeAllRows();
				var curRow = viewModel.transferCard.createEmptyRow();
				viewModel.transferItems.removeAllRows();
				viewModel.BomItems.removeAllRows();
				// 仓库默认不可点击，根据库存组织来判断是否可点击
				$("#outStorageId").attr('placeholder', "请先选择出库库存组织");
				$("#inStorageId").attr('placeholder', "请先选择入库库存组织");
				viewModel.transferCard.setMeta("outStorageId", "enable", false);
				viewModel.transferCard.setMeta("inStorageId", "enable", false);
				// 行号设置为0
				viewModel.curRowNum(0);
				viewModel.currowBomNum(0);
				viewModel.getCurDate(curRow);
				viewModel.setDefaultValue(curRow);
				viewModel.goBillPanel();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
			},
			setDefaultValue: function (row) {
				row.setValue("transferStatusCode", "1");
				row.setValue("transferStatusName", "待处理");
				row.setValue("state", 0);
			},
			//进入修改单据页
			showEditBillPanel: function (index, rowId) {
				var row;
				if (index == -1) {
					//处理通过详情页编辑进入
					row = viewModel.transferList.getFocusRow();
					//通过改变index判断当前处于编辑态
					index = 0;
				} else {
					//行上的编辑按钮
					row = viewModel.transferList.getRowByRowId(rowId);

				}
				if (row.getValue("state") != 0) {
					toastr.warning("不处于待处理的单据不能编辑");
					return;
				}
				$("#tab-edit-bom").hide();
				$("#tab-edit-goods").show();
				viewModel.index = index;
				viewModel.rowId = row.rowId;
				var id = row.getValue("id");
				//查询子表数据
				viewModel.findByParentid(id, function (data) {
					data.transferBillItems.forEach(function (item) {
						item.batchCodeName = item.batchCodeCode;
						item.batchNumName = item.batchNumCode;
					});
					data.transferBillItemBoms.forEach(function (item) {
						item.batchCodeName = item.batchCodeCode;
						item.batchNumName = item.batchNumCode;
					});
					viewModel.transferCard.setSimpleData(data);
					viewModel.transferItems.setSimpleData(data.transferBillItems, {
						unSelect: true
					});
					viewModel.BomItems.setSimpleData(data.transferBillItemBoms, {
						unSelect: true
					});
					var BomItems = viewModel.BomItems;
					// 获得当前最大行号
					viewModel.seteidtCondition();

					viewModel.getCurRowNum();
					viewModel.getBomCurrowNum(BomItems);
					viewModel.goBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				});
			},
			seteidtCondition: function (data) {
				// 编辑时仓库可编辑状态
				$("#outStorageId").attr('placeholder', "");
				$("#inStorageId").attr('placeholder', "");
				viewModel.transferCard.setMeta("outStorageId", "enable", true);
				viewModel.transferCard.setMeta("inStorageId", "enable", true);

				var pkOrgInId = viewModel.transferCard.getValue("pkOrgInId");
				var pkOrgId = viewModel.transferCard.getValue("pkOrgId");
				viewModel.changeCondition("outStorageId", {
					"EQ_isEnable": "1"
				}, {
					"EQ_inventoryOrg.id": pkOrgId
				});
				viewModel.changeCondition("inStorageId", {
					"EQ_isEnable": "1"
				}, {
					"EQ_inventoryOrg.id": pkOrgInId
				})
			},
			detail: function () {
				$("#tab-detail-bom").hide();
				$("#tab-detail-goods").show();
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.transferList.getCurrentRow();
					var id = curRow.getValue("id");
					viewModel.transferItems.removeAllRows();
					viewModel.findByParentid(id, function (data) {
						data.transferBillItems.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
							item.batchNumName = item.batchNumCode;
						});
						data.transferBillItemBoms.forEach(function (item) {
							item.batchCodeName = item.batchCodeCode;
							item.batchNumName = item.batchNumCode;
						});
						curRow.setSimpleData(data);
						viewModel.transferItems.setSimpleData(data.transferBillItems, {
							unSelect: true
						});
						viewModel.BomItems.setSimpleData(data.transferBillItemBoms, {
							unSelect: true
						});
					});
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
					viewModel.goDetailPanel();
					viewModel.initBPMFromBill(id, viewModel);
				}, 0);
			},
			detail2bill: function () {
				var row = viewModel.transferList.getCurrentRow();
				if (row.getValue("state") != 0) {
					toastr.warning("不处于待处理的单据不能编辑");
					return;
				}
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
				});
			},
			//新增子表项
			addItem: function () {
				viewModel.transferItems.createEmptyRow();
			},
			//删除子表项
			delItems: function () {
				var selectedRows = viewModel.transferItems.getSelectedRows();
				var delBom = [];
				for (var i = 0; i < selectedRows.length; i++) {
					selectedRows[i].setValue("dr", "1");
					var parentRowNum = selectedRows[i].getValue("rowNum");
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
					})
				}
				viewModel.BomItems.removeRows(delBom, {
					forceDel: true
				});
				viewModel.transferItems.removeRows(selectedRows);
			},
			//保存单据
			saveBill: function () {
				var result = viewModel.validateBill('.ui-bill-panel', viewModel.transferItems, viewModel.transferCard);
				if (result) {
					if (!viewModel.checkEmpty(viewModel.transferCard, viewModel.transferItems, false, true)) {
						return
					}
					// 组装数据
					var currentRow, ajaxType;
					var index = viewModel.index;
					var transferData = viewModel.transferCard.getSimpleData()[0];
					var transferItemsData = viewModel.transferItems.getSimpleData();
					var transferItemsBomData = viewModel.BomItems.getSimpleData();
					if (viewModel.index === -1) {
						transferItemsData.forEach(function (item) {
							item.persistStatus = 'new';
						});
						transferItemsBomData.forEach(function (item) {
							 //之前逻辑导致删除失败，增加判断
							 if(item.persistStatus!="fdel"){
								item.persistStatus = "new";
							}
						});
					}
					for(var i=0;i<transferItemsBomData.length;i++){
						if(transferItemsBomData[i].id == undefined){
							transferItemsBomData[i].persistStatus = 'new'
						}
					}
					transferData.transferBillItems = transferItemsData;
					transferData.transferBillItemBoms = transferItemsBomData;
					
					if (index >= 0) {
						ajaxType = "put";
					} else {
						ajaxType = "post";
						transferData.state = 0;
					}
					// 提交
					$._ajax({
						url: appCtx + viewModel.baseurl,
						type: ajaxType,
						data: JSON.stringify(transferData),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							// 回写界面
							if (index >= 0) {
								//获取需要修改的行
								currentRow = viewModel.transferList.getRowByRowId(viewModel.rowId);
							} else {
								//添加数据
								currentRow = viewModel.transferList.createEmptyRowF();
							}
							currentRow.setSimpleData(data);
							viewModel.retListPanel();
							viewModel.search();
							toastr.success("保存成功");
						}
					});
				}
			},
			// 新写校验，对应不用模块校验
			validateBill: function (el, vModel, mainDt) {
				var validate = $(el)[0];
				var result = app.compsValidateMultiParam({
					element: validate,
					showMsg: true
				});
				if (result.passed) {
					if (mainDt && mainDt.id == "transferCard") {
						if (mainDt.getValue("outStorageId") == mainDt.getValue("inStorageId")) {
							toastr.warning("出库仓库不能和入库仓库相同");
							return false;
						}
					}
					var rows = vModel.getAllRealRows();
					if (rows && rows.length > 0) {

					} else {
						toastr.warning("至少添加一个商品");
						return false;
					}
					return true;
				} else {

					return false;
				}
			},
			//入库保存单据
			saveInBill: function () {
				var result = viewModel.validateBill('.ui-bill-panel-in', viewModel.transferInItems);
				if (result) {
					if (!viewModel.checkEmpty(viewModel.transferInCard, viewModel.transferInItems, true, false)) {
						return
					}
					// 组装数据
					var currentRow;
					var transferData = viewModel.transferInCard.getSimpleData()[0];
					var transferItemsData = viewModel.transferInItems.getSimpleData();
					var transferItemsBomData = viewModel.BomItemsIn.getSimpleData();
					transferData.transferInBillItems = transferItemsData;
					transferData.transferInBillItemBoms = transferItemsBomData;
					// 提交
					$._ajax({
						url: appCtx + '/stock/transfer-in-bills',
						type: 'post',
						data: JSON.stringify(transferData),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							common.dialog.stockConfirmDialog(data, function () {
								viewModel.search();
								viewModel.retListPanel();
								toastr.success("保存成功");
							});
						}
					});
				}
			},
			//入库保存单据
			saveInBillNew: function (viewModel) {
				// 组装数据
				var currentRow;
				var transferData = viewModel.transferInCard.getSimpleData()[0];
				var transferItemsData = viewModel.transferInItems.getSimpleData();
				var transferItemsBomData = viewModel.BomItemsIn.getSimpleData();
				transferData.transferInBillItems = transferItemsData;
				transferData.transferInBillItemBoms = transferItemsBomData;
				// 提交
				$._ajax({
					url: appCtx + '/stock/transfer-in-bills',
					type: 'post',
					data: JSON.stringify(transferData),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						common.dialog.stockConfirmDialog(data, function () {
							viewModel.search();
							viewModel.retListPanel();
							toastr.success("审批并转库成功！");
						});
					}
				});
				//  }
			},
			//出库保存单据
			saveOutBillNew: function (viewModel) {
				// debugger;
				// 组装数据
				var currentRow;
				var transferData = viewModel.transferOutCard.getSimpleData()[0];
				var transferItemsData = viewModel.transferOutItems.getSimpleData();
				var transferItemsBomData = viewModel.BomItemsOut.getSimpleData();
				transferData.transferBillOutItems = transferItemsData;
				transferData.transferOutBillItemBoms = transferItemsBomData;
				// 提交
				$._ajax({
					url: appCtx + '/stock/transfer-out-bills',
					type: 'post',
					data: JSON.stringify(transferData),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.showTransferIns();
						/*common.dialog.stockConfirmDialog(data, function () {
						    viewModel.search();
						    viewModel.retListPanel();
						    toastr.success("保存成功");
						});*/
					}
				});
				// }
			},
			//出库保存单据
			saveOutBill: function () {
				var result = viewModel.validateBill('.ui-bill-panel-out', viewModel.transferOutItems);
				if (result) {
					if (!viewModel.checkEmpty(viewModel.transferOutCard, viewModel.transferOutItems, true, false)) {
						return
					}
					// 组装数据
					var currentRow;
					var transferData = viewModel.transferOutCard.getSimpleData()[0];
					var transferItemsData = viewModel.transferOutItems.getSimpleData();
					var transferItemsBomData = viewModel.BomItemsOut.getSimpleData();
					transferData.transferBillOutItems = transferItemsData;
					transferData.transferOutBillItemBoms = transferItemsBomData;
					// 提交
					$._ajax({
						url: appCtx + '/stock/transfer-out-bills',
						type: 'post',
						data: JSON.stringify(transferData),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							common.dialog.stockConfirmDialog(data, function () {
								viewModel.search();
								viewModel.retListPanel();
								toastr.success("保存成功");
							});
						}
					});
				}
			},
			//判断商品行仓库和批次号
			checkEmpty: function (mainDt, subDt, ifcheckgoodsposi, ifcheckbatchnum) {
				var allItemRows = subDt.getAllRealRows();
				var ifSlotManage = mainDt.getValue("ifSlotManage");
				var emptyBatchRows = "",
					emptyPositionRows = "";
				var emptyBatchNoRows = "",
					emptyInvStateRows = "";
                var emptyGoodsOptRows = "";
				if (allItemRows.length > 0) {
					allItemRows.forEach(function (item) {
						if (parseFloat(item.getValue("enableBatchNumberManage")) === 1 && !(item.getValue("batchNumId"))) {
							var rowNum = item.getValue("rowNum");
							emptyBatchRows += rowNum + ",";
						}
						if (!item.getValue("goodsPositionId") && parseFloat(ifSlotManage) === 1) {
							var row2Num = item.getValue("rowNum");
							emptyPositionRows += row2Num + ",";
						}
						if (parseFloat(item.getValue("enableBatchNoManage")) === 1 && !(item.getValue("batchCodeId"))) {
							emptyBatchNoRows += item.getValue("rowNum") + ",";
						}
						if (!item.getValue("stockStateId") && parseFloat(item.getValue("enableInvStatusManage")) === 1) {
							emptyInvStateRows += item.getValue("rowNum") + ",";
						}
                        if(!item.getValue("goodsSelection") && parseFloat(item.getValue("isOptional")) === 1){
                            emptyGoodsOptRows += item.getValue("rowNum") + ",";
                        }
					});
					emptyBatchRows = emptyBatchRows.slice(0, emptyBatchRows.length - 1);
					emptyPositionRows = emptyPositionRows.slice(0, emptyPositionRows.length - 1);
					emptyBatchNoRows = emptyBatchNoRows.slice(0, emptyBatchRows.length - 1);
					emptyInvStateRows = emptyInvStateRows.slice(0, emptyPositionRows.length - 1);
                    emptyGoodsOptRows = emptyGoodsOptRows.slice(0, emptyGoodsOptRows.length - 1);
					if (emptyBatchRows || emptyPositionRows || emptyBatchNoRows || emptyInvStateRows || emptyGoodsOptRows) {
						if (ifcheckgoodsposi && emptyPositionRows) {
							toastr.warning("请为行号" + emptyPositionRows + "的商品选择货位");
						}
						if (ifcheckbatchnum && emptyBatchRows) {
							toastr.warning("行号" + emptyBatchRows + "的商品启用了批次号，请填写批次号");
						}
						if (emptyBatchNoRows) toastr.warning("行号" + emptyBatchNoRows + "的商品启用了批号，请填写批号");
						if (emptyInvStateRows) toastr.warning("请为行号" + emptyInvStateRows + "的商品选择库存状态");
                        if(emptyGoodsOptRows)toastr.warning("请为行号" + emptyGoodsOptRows + "的商品添加选配");
						return false;
					} else {
						return true;
					}
				}
			},
			// 关闭
			close: function () {
				var selectedRows = viewModel.transferList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					viewModel.dialogcardcomp1.show("关闭原因", "500px", viewModel.ajax_open_close.bind(viewModel, 1));
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 打开
			open: function () {
				var selectedRows = viewModel.transferList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					viewModel.dialogcardcomp1.show("打开原因", "500px", viewModel.ajax_open_close.bind(viewModel, 2));
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			ajax_open_close: function (type) {
				var url = type == '2' ? '/batch-open' : '/batch-close';
				var selectedRows = viewModel.transferList.getSelectedRows();
				var ids = selectedRows.map(function (row) {
					return row.getValue("id");
				});
				var postdata = viewModel.dialogcardcomp1.geteidtData();
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + url,
					data: {
						ids: ids.join(","),
						reason: postdata.reason
					},
					success: function () {
						toastr.success();
						viewModel.dialogcardcomp1.close();
					}
				});
			},
			//提交
			submit: function (obj) {
				var listCompId = "transferList";
				var nodeJs = "/ocm-web/pages/inventory/transfer/transfer.js";
				var billTypeCode = "Transfer";
				var tranTypeCode = null;
				var callback = null;
				viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
			},

			back: function () {
				var listCompId = "transferList";
				var billTypeCode = "Transfer";
				var tranTypeCode = null;
				var callback = null;
				viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
			},
			// 审批通过
			approve: function () {
				var listCompId = "transferList";
				var billTypeCode = "Transfer";
				var tranTypeCode = null;
				var withBpmCallback = function () {
					viewModel.detail();
				};
				var withoutBpmCallback = null;
				viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);
			},

			// 审批不通过
			disapprove: function () {
				var listCompId = "transferList";
				var billTypeCode = "Transfer";
				var tranTypeCode = null;
				var withBpmCallback = function () {
					viewModel.detail();
				};
				var withoutBpmCallback = null;
				viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);
			},

			cancelapprove: function () {
				var listCompId = "transferList";
				var billTypeCode = "Transfer";
				var tranTypeCode = null;
				var withBpmCallback = function () {
					viewModel.detail();
				};
				var withoutBpmCallback = null;
				viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);
			},

			/*// 审批、一键转库
			approve: function (obj) {
				//approve : 审批  cancelApprove: 取消审批   oneKeyTrans：一键转库
				var requsetUrl,
					bsCode,
					bsName,
					data;
				var selectedRows = viewModel.transferList.getSelectedRows();
				var id = selectedRows[0].getValue('id');
				switch (obj.key) {
					case 'approve':
						requsetUrl = '/batch-approve';
						bsCode = '4';
						bsName = '审批通过';
						data = {
							ids: id
						};
						break;
					case 'cancelApprove':
						requsetUrl = '/batch-cancel-approve';
						bsCode = '1';
						bsName = '待处理';
						data = {
							ids: id
						};
						break;
					case 'oneKeyTrans':
						requsetUrl = '/transfer';
						bsCode = '8';
						bsName = '全部入库';
						data = {
							id: id
						};
						break;
				}
				if (selectedRows.length > 1) {
					toastr.warning('只能选择一项');
					return;
				}
				if (selectedRows.length <= 0) {
					toastr.warning('请选择一项');
					return;
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + requsetUrl,
					data: data,
					type: 'post',
					success: function (data) {
					/!*	if(bsCode == '4') {
                            viewModel.showTransferOuts();
                        }else {*!/
                            toastr.success();
					//	}
						//
						selectedRows[0].setValue("transferStatusCode", bsCode);
						selectedRows[0].setValue("transferStatusName", bsName);

					}
				});
			},*/
			showTransferOut: function () {
				var selectedRows = viewModel.transferList.getSelectedRows();
				if (selectedRows.length <= 0) {
					toastr.warning('请选择一项');
					return;
				} else if (selectedRows.length > 1) {
					toastr.warning('只能选择一项');
					return;
				}
				var id = selectedRows[0].getValue("id");
				var status = selectedRows[0].getValue('transferStatusCode');
				if (status != '4') {
					if (status < '4') {
						toastr.warning('请审批后进行该操作');
					} else {
						toastr.warning('已执行过转库出库操作,不能再次转出');
					}
					return false;
				}

				//查询子表数据
				viewModel.findByParentid(id, function (data) {
					// TODO 判断是否为审核通过状态
					// 前端做转库单到转库出库单的数据映射
					var newData = u.extend({}, {
						billDate: data.billDate, //单据日期
						stockOrgId: data.pkOrgId, //库存组织
						storageId: data.outStorageId, //出库仓库
						ifSlotManage: data.outIfSlotManage, //是否启用货位管理
						bizPersonId: data.outBizPersonId, //业务员
						bizPersonName: data.outBizPersonName, //业务员
						deparmentId: data.outDeptId, //部门
						billStatusCode: "01", //状态
						billStatusName: "自由", //状态
						planSendDate: data.planSendDate, //计划发货日期计划发货日期
						planArriveDate: data.planArriveDate, //要求到货日期
						totalFactInNum: data.totalFactInNum, //实入总数量
						remark: data.remark,
						billType: "TransferOut",
						billTranTypeId: "TransferOut",
					});
					var newSubData = [];
					if (data.transferBillItems && data.transferBillItems.length > 0) {
						newSubData = data.transferBillItems.map(function (item) {
							return u.extend({}, {
								rowNum: item.rowNum, //行号
								goodsId: item.goodsId, //商品Id
								goodsCode: item.goodsCode, //商品编码
								goodsName: item.goodsName, //商品名称
								enableBatchNumberManage: item.enableBatchNumberManage,
								enableBatchNoManage: item.enableBatchNoManage,
								enableInvStatusManage: item.enableInvStatusManage,
								productLineId: item.productLineId,
								productId: item.productId,
								unitId: item.unitId,
								unitCode: item.unitCode,
								unitName: item.unitName, //单位
								shouldOutNum: item.transferNum, //应出数量
								factOutNum: item.transferNum, //实出数量
								price: item.price, //单价
								amountMoney: item.amountMoney, //金额
								batchNumId: item.batchNumId, //批次号
								batchNumCode: item.batchNumCode, //批次号
								batchNumName: item.batchNumCode, //批次号
								remark: item.remark, //备注
								receiverAddress: item.receiverAddress, //收货地址
								receiverPhone: item.receiverPhone, //收货人电话
								receiverPhoneSpare: item.receiverPhoneSpare, //收货人电话
								provinceId: item.provinceId, //省
								provinceCode: item.provinceCode, //省
								provinceName: item.provinceName, //省
								cityId: item.cityId, //市
								cityCode: item.cityCode, //市
								cityName: item.cityName, //市
								countyId: item.countyId, //县、区
								countyCode: item.countyCode, //县、区
								countyName: item.countyName, //县、区
								townId: item.townId, //街道/乡/镇
								townCode: item.townCode, //街道/乡/镇
								townName: item.townName, //街道/乡/镇
								detailAddr: item.detailAddr, //详细地址
								firstBillCode: data.id,
								firstBillBcode: item.id,
								firstBillType: "Transfer",
								srcBillCode: data.id,
								srcBillBcode: item.id,
								srcBillType: "Transfer"
							});
						});
					}
					viewModel.transferOutCard.setSimpleData(newData);
					viewModel.transferOutItems.setSimpleData(newSubData, {
						unSelect: true,
						status: 'new'
					});
					viewModel.setOutCondition();
					viewModel.calcItemTotal("out");
					viewModel.goOutBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
				});
			},

			showTransferOuts: function () {
				var selectedRows = viewModel.transferList.getSelectedRows();
				var id = selectedRows[0].getValue("id");
				var status = selectedRows[0].getValue('transferStatusCode');
				if (status > '4') {
					toastr.warning('已执行过审批操作,不能再次转出');
					return false;
				}
				//查询子表数据
				viewModel.findByParentid(id, function (data) {
					// TODO 判断是否为审核通过状态
					// 前端做转库单到转库出库单的数据映射
					var newData = u.extend({}, {
						billDate: data.billDate, //单据日期
						stockOrgId: data.pkOrgId, //库存组织
						stockOrgInId: data.pkOrgInId, //入库库存组织
						stockBillBelong: id, //库存单据归属
						storageId: data.outStorageId, //出库仓库
						ifSlotManage: data.outIfSlotManage, //是否启用货位管理
						bizPersonId: data.outBizPersonId, //业务员
						bizPersonName: data.outBizPersonName, //业务员
						deparmentId: data.outDeptId, //部门
						billStatusCode: "01", //状态
						billStatusName: "自由", //状态
						planSendDate: data.planSendDate, //计划发货日期计划发货日期
						planArriveDate: data.planArriveDate, //要求到货日期
						totalFactOutNum: 0, //实入总数量
						totalShouldOutNum: 0, //应入总数量
						remark: data.remark,
						billType: "TransferOut",
						billTranTypeId: "TransferOut",
					});
					var newSubData = [];
					if (data.transferBillItems && data.transferBillItems.length > 0) {
						newSubData = data.transferBillItems.map(function (item) {
							return u.extend({}, {
								rowNum: item.rowNum, //行号
								goodsId: item.goodsId, //商品Id
								goodsCode: item.goodsCode, //商品编码
								goodsName: item.goodsName, //商品名称
								enableBatchNumberManage: item.enableBatchNumberManage,
								enableBatchNoManage: item.enableBatchNoManage,
								enableInvStatusManage: item.enableInvStatusManage,
								productLineId: item.productLineId,
								productId: item.productId,
								unitId: item.unitId,
								unitCode: item.unitCode,
								unitName: item.unitName, //单位
								shouldOutNum: item.transferNum, //应出数量
								factOutNum: 0, //实出数量
								unitPrice: item.unitPrice, //单价
								amountMoney: item.amountMoney, //金额
								batchNumId: item.batchNumId, //批次号
								batchNumCode: item.batchNumCode, //批次号
								batchNumName: item.batchNumCode, //批次号
								remark: item.remark, //备注
								receiverAddress: item.receiverAddress, //收货地址
								receiverPhone: item.receiverPhone, //收货人电话
								receiverPhoneSpare: item.receiverPhoneSpare, //收货人电话
								provinceId: item.provinceId, //省
								provinceCode: item.provinceCode, //省
								provinceName: item.provinceName, //省
								cityId: item.cityId, //市
								cityCode: item.cityCode, //市
								cityName: item.cityName, //市
								countyId: item.countyId, //县、区
								countyCode: item.countyCode, //县、区
								countyName: item.countyName, //县、区
								townId: item.townId, //街道/乡/镇
								townCode: item.townCode, //街道/乡/镇
								townName: item.townName, //街道/乡/镇
								detailAddr: item.detailAddr, //详细地址
								customerId: item.customerId, //客户ID
								customerCode: item.customerCode, //客户Code
								customerName: item.customerName, //客户Name
								supplierId: item.supplierId, //供应商ID
								supplierCode: item.supplierCode, //供应商Code
								supplierName: item.supplierName, //供应商Name
								projectId: item.projectId, //项目ID
								projectCode: item.projectCode, //项目Code
								projectName: item.projectName, //项目Name
								batchCodeId: item.batchCodeId, //批号ID
								batchCodeCode: item.batchCodeCode, //批号Code
								batchCodeName: item.batchCodeCode, //批号Name
								stockStateId: item.stockStateId, //库存状态ID
								stockStateCode: item.stockStateCode, //库存状态Code
								stockStateName: item.stockStateName, //库存状态Name
								goodsVersion: item.goodsVersion, //商品版本号
								originalGoodsId: item.originalGoodsId, //原始商品版本号
								goodsSelection: item.goodsSelection, //商品选配项
								goodsSelectionDescription: item.goodsSelectionDescription, //选配项描述
								isMotherPiece: item.isMotherPiece, //是否母件
								firstBillType: "Transfer",
								firstBillCode: data.code, //源头数据单号
								firstBillBcode: item.id, //源头数据行号
								srcBillCode: data.code, //来源数据单号
								srcBillBcode: item.id, //来源数据行号
								srcBillType: "Transfer"
							});
						});
					}
					var newBomData = [];
					if (data.transferBillItemBoms && data.transferBillItemBoms.length > 0) {
						newBomData = data.transferBillItemBoms.map(function (item) {
							return u.extend({}, {
								rowNum: item.rowNum, //行号
								goodsId: item.goodsId, //商品Id
								goodsCode: item.goodsCode, //商品编码
								goodsName: item.goodsName, //商品名称
								parentGoodsId: item.parentGoodsId, //父商品Id
								parentGoodsCode: item.parentGoodsCode, //父商品编码
								parentGoodsName: item.parentGoodsName, //父商品名称
								enableBatchNumberManage: item.enableBatchNumberManage,
								enableBatchNoManage: item.enableBatchNoManage,
								enableInvStatusManage: item.enableInvStatusManage,
								productLineId: item.productLineId,
								productId: item.productId,
								unitId: item.unitId,
								unitCode: item.unitCode,
								unitName: item.unitName, //单位
								shouldOutNum: item.transferNum, //应出数量
								factOutNum: 0, //实出数量
								unitPrice: item.unitPrice, //单价
								amountMoney: item.amountMoney, //金额
								batchNumId: item.batchNumId, //批次号
								batchNumCode: item.batchNumCode, //批次号
								batchNumName: item.batchNumCode, //批次号
								remark: item.remark, //备注
								receiverAddress: item.receiverAddress, //收货地址
								receiverPhone: item.receiverPhone, //收货人电话
								receiverPhoneSpare: item.receiverPhoneSpare, //收货人电话
								provinceId: item.provinceId, //省
								provinceCode: item.provinceCode, //省
								provinceName: item.provinceName, //省
								cityId: item.cityId, //市
								cityCode: item.cityCode, //市
								cityName: item.cityName, //市
								countyId: item.countyId, //县、区
								countyCode: item.countyCode, //县、区
								countyName: item.countyName, //县、区
								townId: item.townId, //街道/乡/镇
								townCode: item.townCode, //街道/乡/镇
								townName: item.townName, //街道/乡/镇
								detailAddr: item.detailAddr, //详细地址
								customerId: item.customerId, //客户ID
								customerCode: item.customerCode, //客户Code
								customerName: item.customerName, //客户Name
								supplierId: item.supplierId, //供应商ID
								supplierCode: item.supplierCode, //供应商Code
								supplierName: item.supplierName, //供应商Name
								projectId: item.projectId, //项目ID
								projectCode: item.projectCode, //项目Code
								projectName: item.projectName, //项目Name
								batchCodeId: item.batchCodeId, //批号ID
								batchCodeCode: item.batchCodeCode, //批号Code
								batchCodeName: item.batchCodeCode, //批号Name
								stockStateId: item.stockStateId, //库存状态ID
								stockStateCode: item.stockStateCode, //库存状态Code
								stockStateName: item.stockStateName, //库存状态Name
								goodsVersion: item.goodsVersion, //商品版本号
								originalGoodsId: item.originalGoodsId, //原始商品版本号
								goodsSelection: item.goodsSelection, //商品选配项
								goodsSelectionDescription: item.goodsSelectionDescription, //选配项描述
								childGoodsQty: item.childGoodsQty, //单元母件中包件数量
								firstBillType: "Transfer",
								firstBillCode: data.code, //源头数据单号
								firstBillBcode: item.id, //源头数据行号
								srcBillCode: data.code, //来源数据单号
								srcBillBcode: item.id, //来源数据行号
								firstBillBomCode: item.id, // BOM源头单据号
								srcBillBomCode: item.id, // BOM来源单据号
								srcBillType: "Transfer"
							});
						});
					}
					viewModel.transferOutCard.setSimpleData(newData);
					viewModel.transferOutItems.setSimpleData(newSubData, {
						unSelect: true,
						status: 'new'
					});
					if (newBomData != null) {
						viewModel.BomItemsOut.setSimpleData(newBomData, {
							unSelect: true,
							status: 'new'
						});
					}
					viewModel.setOutCondition();
					viewModel.calcItemTotal("out");
					viewModel.saveOutBillNew(viewModel);
					//viewModel.goOutBillPanel();
					//viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
				});
			},
			setOutCondition: function () {
				var pkOrgId = viewModel.transferOutCard.getValue("stockOrgId");
				var storehouseId = viewModel.transferOutCard.getValue("storageId");
				viewModel.changeCondition("outCardStorageId", {
					"EQ_isEnable": "1"
				}, {
					"EQ_inventoryOrg.id": pkOrgId
				})
				viewModel.transferOutItems.setMeta("goodsPositionId", "refparam",
					'{"EQ_wareHouse":"' + storehouseId + '","EQ_isFinal":"1"}');
			},
			showTransferIns: function (obj) {
				var selectedRows = viewModel.transferList.getSelectedRows();
				var id = selectedRows[0].getValue('id');
				var status = selectedRows[0].getValue('transferStatusCode');
				if (status > '6') {
					toastr.warning('已执行过转入操作，不能再次转入');
					return false;
				}

				viewModel.findByParentid(id, function (data) {
					//字段转换为入库字段
					var newData = u.extend({}, {
						billDate: data.billDate, //单据日期
						stockOrgId: data.pkOrgId, //库存组织
						stockOrgInId: data.pkOrgInId, //入库库存组织
						storageId: data.inStorageId, //入库仓库
						stockBillBelong: id, //库存单据归属
						ifSlotManage: data.inIfSlotManage, //是否启用货位管理
						bizPersonId: data.inBizPersonId, //业务员
						bizPersonName: data.inBizPersonName, //业务员
						deparmentId: data.inDeptId, //部门
						billStatusCode: "01", //状态
						billStatusName: "自由", //状态
						planArriveDate: data.planArriveDate, //要求到货日期
						totalFactInNum: 0, //实入总数量
						totalShouldInNum: 0, //应入总数量
						remark: data.remark,
						billType: "TransferIn",
						billTranTypeId: "TransferIn"
					});
					var newSubData = [];
					if (data.transferBillItems && data.transferBillItems.length > 0) {
						newSubData = data.transferBillItems.map(function (item) {
							return u.extend({}, {
								rowNum: item.rowNum, //行号
								goodsId: item.goodsId, //商品Id
								goodsCode: item.goodsCode, //商品编码
								goodsName: item.goodsName, //商品名称
								enableBatchNumberManage: item.enableBatchNumberManage,
								enableBatchNoManage: item.enableBatchNoManage,
								enableInvStatusManage: item.enableInvStatusManage,
								productLineId: item.productLineId,
								productId: item.productId,
								unitId: item.unitId,
								unitCode: item.unitCode,
								unitName: item.unitName, //单位
								shouldInNum: item.transferNum, //应入数量（来源应转数量）
								factInNum: 0, //实入数量(来源于转库单表体的累计已出库数量)
								unitPrice: item.unitPrice, //单价
								amountMoney: item.amountMoney, //金额
								batchNumId: item.batchNumId, //批次号
								batchNumCode: item.batchNumCode, //批次号
								customerId: item.customerId, //客户ID
								customerCode: item.customerCode, //客户Code
								customerName: item.customerName, //客户Name
								supplierId: item.supplierId, //供应商ID
								supplierCode: item.supplierCode, //供应商Code
								supplierName: item.supplierName, //供应商Name
								projectId: item.projectId, //项目ID
								projectCode: item.projectCode, //项目Code
								projectName: item.projectName, //项目Name
								batchCodeId: item.batchCodeId, //批号ID
								batchCodeCode: item.batchCodeCode, //批号Code
								stockStateId: item.stockStateId, //库存状态ID
								stockStateCode: item.stockStateCode, //库存状态Code
								stockStateName: item.stockStateName, //库存状态Name
								goodsVersion: item.goodsVersion, //商品版本号
								originalGoodsId: item.originalGoodsId, //原始商品版本号
								goodsSelection: item.goodsSelection, //商品选配项
								goodsSelectionDescription: item.goodsSelectionDescription, //选配项描述
								isMotherPiece: item.isMotherPiece, //是否母件
								firstBillType: "Transfer",
								firstBillCode: data.code, //源头数据单号
								firstBillBcode: item.id, //源头数据行号
								srcBillCode: data.code, //来源数据单号
								srcBillBcode: item.id, //来源数据行号
								srcBillType: "Transfer"
							});
						});
					}

					var newBomData = [];
					if (data.transferBillItemBoms && data.transferBillItemBoms.length > 0) {
						newBomData = data.transferBillItemBoms.map(function (item) {
							return u.extend({}, {
								rowNum: item.rowNum, //行号
								goodsId: item.goodsId, //商品Id
								goodsCode: item.goodsCode, //商品编码
								goodsName: item.goodsName, //商品名称
								parentGoodsId: item.parentGoodsId, //父商品Id
								parentGoodsCode: item.parentGoodsCode, //父商品编码
								parentGoodsName: item.parentGoodsName, //父商品名称
								enableBatchNumberManage: item.enableBatchNumberManage,
								enableBatchNoManage: item.enableBatchNoManage,
								enableInvStatusManage: item.enableInvStatusManage,
								productLineId: item.productLineId,
								productId: item.productId,
								unitId: item.unitId,
								unitCode: item.unitCode,
								unitName: item.unitName, //单位
								shouldInNum: item.transferNum, //应入数量（来源应转数量）
								factInNum: 0, //实入数量(来源于转库单表体的累计已出库数量)
								unitPrice: item.unitPrice, //单价
								amountMoney: item.amountMoney, //金额
								batchNumId: item.batchNumId, //批次号
								batchNumCode: item.batchNumCode, //批次号
								customerId: item.customerId, //客户ID
								customerCode: item.customerCode, //客户Code
								customerName: item.customerName, //客户Name
								supplierId: item.supplierId, //供应商ID
								supplierCode: item.supplierCode, //供应商Code
								supplierName: item.supplierName, //供应商Name
								projectId: item.projectId, //项目ID
								projectCode: item.projectCode, //项目Code
								projectName: item.projectName, //项目Name
								batchCodeId: item.batchCodeId, //批号ID
								batchCodeCode: item.batchCodeCode, //批号Code
								stockStateId: item.stockStateId, //库存状态ID
								stockStateCode: item.stockStateCode, //库存状态Code
								stockStateName: item.stockStateName, //库存状态Name
								goodsVersion: item.goodsVersion, //商品版本号
								originalGoodsId: item.originalGoodsId, //原始商品版本号
								goodsSelection: item.goodsSelection, //商品选配项
								goodsSelectionDescription: item.goodsSelectionDescription, //选配项描述
								childGoodsQty: item.childGoodsQty, //单元母件中包件数量
								firstBillType: "Transfer",
								firstBillCode: data.code, //源头数据单号
								firstBillBcode: item.id, //源头数据行号
								srcBillCode: data.code, //来源数据单号
								srcBillBcode: item.id, //来源数据行号
								firstBillBomCode: item.id, // BOM源头单据号
								srcBillBomCode: item.id, // BOM来源单据号
								srcBillType: "Transfer"
							});
						});
					}
					//渲染数据
					viewModel.transferInCard.setSimpleData(newData);
					viewModel.transferInItems.setSimpleData(newSubData, {
						unSelect: true,
						status: 'new'
					});
					viewModel.BomItemsIn.setSimpleData(newBomData, {
						unSelect: true,
						status: 'new'
					});
					viewModel.setInCondition();
					viewModel.calcItemTotal("in");
					viewModel.saveInBillNew(viewModel);
					// viewModel.goInBillPanel();
					// viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
				});
			},
			//转入
			showTransferIn: function (obj) {
				var selectedRows = viewModel.transferList.getSelectedRows();
				if (selectedRows.length <= 0) {
					toastr.warning('请选择一项');
					return;
				} else if (selectedRows.length > 1) {
					toastr.warning('只能选择一项');
					return;
				}
				var id = selectedRows[0].getValue('id');
				var status = selectedRows[0].getValue('transferStatusCode');
				if (status != '6') {
					if (status < '6') {
						toastr.warning('请先进行转出操作');
					} else {
						toastr.warning('已执行过转入操作，不能再次转入');
					}
					return false;
				}

				viewModel.findByParentid(id, function (data) {
					//字段转换为入库字段
					var newData = u.extend({}, {
						billDate: data.billDate, //单据日期
						stockOrgId: data.pkOrgId, //库存组织
						storageId: data.inStorageId, //入库仓库
						ifSlotManage: data.inIfSlotManage, //是否启用货位管理
						bizPersonId: data.inBizPersonId, //业务员
						bizPersonName: data.inBizPersonName, //业务员
						deparmentId: data.inDeptId, //部门
						billStatusCode: "01", //状态
						billStatusName: "自由", //状态
						planArriveDate: data.planArriveDate, //要求到货日期
						totalFactInNum: data.totalFactInNum, //实入总数量
						remark: data.remark,
						billType: "TransferIn",
						billTranTypeId: "TransferIn"
					});
					var newSubData = [];
					if (data.transferBillItems && data.transferBillItems.length > 0) {
						newSubData = data.transferBillItems.map(function (item) {
							return u.extend({}, {
								rowNum: item.rowNum, //行号
								goodsId: item.goodsId, //商品Id
								goodsCode: item.goodsCode, //商品编码
								goodsName: item.goodsName, //商品名称
								enableBatchNumberManage: item.enableBatchNumberManage,
								enableBatchNoManage: item.enableBatchNoManage,
								enableInvStatusManage: item.enableInvStatusManage,
								productLineId: item.productLineId,
								productId: item.productId,
								unitId: item.unitId,
								unitCode: item.unitCode,
								unitName: item.unitName, //单位
								shouldInNum: item.transferNum, //应入数量（来源应转数量）
								factInNum: item.totalOutNum, //实入数量(来源于转库单表体的累计已出库数量)
								price: item.price, //单价
								amountMoney: item.amountMoney, //金额
								batchNumId: item.batchNumId, //批次号
								batchNumCode: item.batchNumCode, //批次号
								batchNumName: item.batchNumCode,
								batchCodeId: item.batchCodeId,
								batchCodeName: item.batchCodeCode,
								batchCodeCode: item.batchCodeCode,
								firstBillCode: data.id,
								firstBillBcode: item.id,
								firstBillType: "Transfer",
								srcBillCode: data.id,
								srcBillBcode: item.id,
								srcBillType: "Transfer"
							});
						});
					}
					//渲染数据
					viewModel.transferInCard.setSimpleData(newData);
					viewModel.transferInItems.setSimpleData(newSubData, {
						unSelect: true,
						status: 'new'
					});
					viewModel.setInCondition();
					viewModel.calcItemTotal("in");
					viewModel.goInBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
				});
			},
			setInCondition: function () {
				var pkOrgId = viewModel.transferInCard.getValue("stockOrgId");
				var storehouseId = viewModel.transferInCard.getValue("storageId");
				viewModel.changeCondition("inCardStorageId", {
					"EQ_isEnable": "1"
				}, {
					"EQ_inventoryOrg.id": pkOrgId
				})
				viewModel.transferInItems.setMeta("goodsPositionId", "refparam",
					'{"EQ_wareHouse":"' + storehouseId + '","EQ_isFinal":"1"}');
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
				var listData = viewModel.transferList; //需要导出表格的dataTable
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
				if (viewModel.billPanelStatus() === "detail") {
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
				if (viewModel.billPanelStatus() === "detail") {
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
				var data = viewModel.transferItems.getSimpleData();
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
			getBomCurrowNum: function (dt) {
				var data = dt.getSimpleData();
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
			calcItemTotal: function (type) {
				var rows;
				if (type == 'in') {
					rows = viewModel.transferInItems.getAllRealRows();
					var totalfactInAmount = 0;
					if (u.isArray(rows) && rows.length > 0) {
						for (var i = 0; i < rows.length; i++) {
							totalfactInAmount += parseFloat(rows[i].getValue("factInNum") || 0);
						}
						totalfactInAmount = viewModel.formater.format(totalfactInAmount);
					}
					viewModel.transferInCard.setValue("totalFactInNum", totalfactInAmount);
				} else {
					rows = viewModel.transferOutItems.getAllRealRows();
					var totalfactOutAmount = 0;
					if (u.isArray(rows) && rows.length > 0) {
						for (var i = 0; i < rows.length; i++) {
							totalfactOutAmount += parseFloat(rows[i].getValue("factOutNum") || 0);
						}
						totalfactOutAmount = viewModel.formater.format(totalfactOutAmount);
					}
					viewModel.transferOutCard.setValue("totalFactOutNum", totalfactOutAmount);
				}
			},
			calcAmount: function (obj) {
				var row = obj.rowObj;
				var value = obj.newValue;
				var oldValue = obj.oldValue;
				if (value) {
					var price = row.getValue("unitPrice") || 0;
					var amount = viewModel.formater.format(parseFloat(value) * parseFloat(price));
					row.setValue("amountMoney", amount);
				}
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
                var parentRowNum = obj.rowObj.getValue("parentRowNum");
				var BomItemRows = viewModel.BomItems.getAllRealRows();
				var productItemRows = viewModel.transferItems.getAllRealRows();
				var oneParentBomRows = [],
					oneParentBomSum = 0;
				BomItemRows.forEach(function (item) {
					if (item.getValue("parentRowNum") === parentRowNum) {
						oneParentBomRows.push(item);
					}
				});
				oneParentBomRows.forEach(function (item) {
					if (field === "unitPrice") {
						var childGoodsQty = item.getValue("childGoodsQty") ? item.getValue("childGoodsQty") : 1;
						oneParentBomSum = oneParentBomSum + (parseFloat(item.getValue(field) ? item.getValue(field) : 0)) * childGoodsQty;
					} else {
						oneParentBomSum = oneParentBomSum + parseFloat(item.getValue(field) ? item.getValue(field) : 0);
					}
				});
				productItemRows.forEach(function (item) {
                    if(item.getValue("rowNum") === parentRowNum ){
                        item.setValue(field,oneParentBomSum)
                    }
				})
			},
			//计算价格
			sumPrice: function (row) {
				var amount = row.getValue('transferNum');
				var unitPrice = row.getValue('unitPrice');
				amount == null ? 0 : parseFloat(amount);
				unitPrice == null ? 0 : parseFloat(unitPrice);
				row.setValue("amountMoney", amount * unitPrice);
				return amount * unitPrice;
			},
		},
		afterCreate: function () {
			viewModel = u.extend(viewModel, bpmopenbill.model);
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
                        var newrow = viewModel.transferItems.createEmptyRow();
                        newrow.setValue("rowNum", rowNum);
                        newrow.setValue("goodsId", refValues[i].refpk);
                        newrow.setValue("goodsCode", refValues[i].refcode);
                        newrow.setValue("goodsName", refValues[i].refname);
                        newrow.setValue("goodsFullName", refValues[i].fullName);
                        newrow.setValue("goodsVersion", refValues[i].version);
                        newrow.setValue("unitId", refValues[i].basicUnitId);
                        newrow.setValue("unitName", refValues[i].basicUnitName);
                        newrow.setValue("originalGoodsId", refValues[i].parentOriginalGoodsId);
                        // 批次信息管理
                        newrow.setValue("enableBatchNumberManage", refValues[i].enableBatchNumberManage);
                        newrow.setValue("enableBatchNoManage", refValues[i].enableBatchNoManage);
                        newrow.setValue("enableInvStatusManage", refValues[i].enableInvStatusManage);
                        newrow.setValue("productLineId", refValues[i].productLineId);
                        newrow.setValue("productId", refValues[i].productId);
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
								item.goodsVersion = item.childGoodsVersion;
								item.unitId = item.childGoodsUnitId;
								item.unitCode = item.childGoodsUnitCode;
								item.unitName = item.childGoodsUnitName;
								item.transferNum = item.childGoodsQty;
								item.originalGoodsId = item.childOriginalGoodsId;
								item.parentRowNum = rowNum;
								item.rowNum = bomRowNum;
								item.parentGoodsId = id;
								item.parentGoodsName = name;
								viewModel.currowBomNum(bomRowNum);
								bomItems.push(item)
							});
							//bom 商品行添加
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
			// 转库出库组织和出库仓库联动
			viewModel.transferCard.on("pkOrgId.valuechange", function (obj) {
				var pkOrgId = obj.newValue;
				if (pkOrgId) {
					viewModel.changeCondition("outStorageId", {
						"EQ_isEnable": "1"
					}, {
						"EQ_inventoryOrg.id": pkOrgId
					});
					$("#outStorageId").attr('placeholder', "");
					viewModel.transferCard.setMeta("outStorageId", "enable", true);
				} else {
					viewModel.changeCondition("outStorageId", {
						"EQ_isEnable": "1"
					}, {});
					$("#outStorageId").attr('placeholder', "请先选择入库库存组织");
					viewModel.transferCard.setMeta("outStorageId", "enable", false);
				}
				if (!obj.ctx) {
					viewModel.transferCard.setValue("outStorageId", null);
					//viewModel.transferCard.setValue("inStorageId", null);
				}
			});
			// 转库入库组织和仓库联动
			viewModel.transferCard.on("pkOrgInId.valuechange", function (obj) {
				var pkOrgId = obj.newValue;
				if (pkOrgId) {
					viewModel.changeCondition("inStorageId", {
						"EQ_isEnable": "1"
					}, {
						"EQ_inventoryOrg.id": pkOrgId
					});
					$("#inStorageId").attr('placeholder', "");
					viewModel.transferCard.setMeta("inStorageId", "enable", true);
				} else {
					viewModel.changeCondition("inStorageId", {
						"EQ_isEnable": "1"
					}, {});
					// 仓库不可点，选择完库存组织后可点击
					$("#inStorageId").attr('placeholder', "请先选择入库库存组织");
					viewModel.transferCard.setMeta("inStorageId", "enable", false);
				}
				if (!obj.ctx) {
					viewModel.transferCard.setValue("inStorageId", null);
					// 不知道之前是作何判断，现在改成对当前dataTable 操作
					// viewModel.transferInCard.setValue("storageId", null);
				}
			});
			viewModel.transferCard.on("outStorageId.valuechange", function (obj) {
				if (obj.newValue) {
					var refer = $("#refContaineroutStorageId").data("uui.refer");
					if (refer.values && refer.values.length > 0) {
						var trueValue = refer.values[0];
						if (!viewModel.transferCard.getValue("pkOrgId") ||
							viewModel.transferCard.getValue("pkOrgId") != trueValue.inventoryOrgId) {
							viewModel.transferCard.getFocusRow().setValue("pkOrgId", trueValue.inventoryOrgId, true);
						}
						viewModel.transferCard.setValue("outIfSlotManage", trueValue.ifSlotManage);
					}
					viewModel.transferCard.setValue("inStorageId", obj.newValue);
					// viewModel.transferCard.setMeta("inStorageId", "enable", true);
				} else {
					// viewModel.transferCard.setMeta("inStorageId", "enable", false);
					viewModel.transferCard.setValue("inStorageId", "");
					viewModel.transferCard.setValue("outIfSlotManage", "0");
				}
			});
			viewModel.transferCard.on("inStorageId.valuechange", function (obj) {
				if (obj.newValue) {
					var refer = $("#refContainerinStorageId").data("uui.refer");
					if (refer.values && refer.values.length > 0) {
						var trueValue = refer.values[0];
						if (!viewModel.transferCard.getValue("pkOrgInId") ||
							viewModel.transferCard.getValue("pkOrgInId") != trueValue.inventoryOrgId) {
							viewModel.transferCard.getFocusRow().setValue("pkOrgInId", trueValue.inventoryOrgId, true);
						}
						viewModel.transferCard.setValue("inIfSlotManage", trueValue.ifSlotManage);
					}
				} else {
					viewModel.transferCard.setValue("inIfSlotManage", "0");
				}
			});

			//转库出库组织和仓库联动
			viewModel.transferOutCard.on("stockOrgId.valuechange", function (obj) {
				var pkOrgId = obj.newValue;
				if (pkOrgId) {
					viewModel.changeCondition("outCardStorageId", {
						"EQ_isEnable": "1"
					}, {
						"EQ_inventoryOrg.id": pkOrgId
					});
				} else {
					viewModel.changeCondition("outCardStorageId", {
						"EQ_isEnable": "1"
					}, {});
				}
				if (!obj.ctx) {
					viewModel.transferOutCard.setValue("storageId", null);
				}
			});
			// 转库出库仓库和货位联动
			viewModel.transferOutCard.on("storageId.valuechange", function (obj) {
				if (obj.newValue) {
					var refer = $("#refContaineroutCardStorageId").data("uui.refer");
					if (refer.values && refer.values.length > 0) {
						var trueValue = refer.values[0];
						if (!viewModel.transferOutCard.getValue("stockOrgId") ||
							viewModel.transferOutCard.getValue("stockOrgId") != trueValue.inventoryOrgId) {
							viewModel.transferOutCard.getFocusRow().setValue("stockOrgId", trueValue.inventoryOrgId, true);
						}
						// 更新货位管理状态
						viewModel.transferOutCard.setValue("ifSlotManage", trueValue.ifSlotManage);
						// 更新货位状态
						viewModel.transferOutItems.setMeta("goodsPositionId", "refparam",
							'{"EQ_wareHouse":"' + obj.newValue + '","EQ_isFinal":"1"}');
					}
				} else {
					// 更新批次管理状态
					viewModel.transferOutCard.setValue("ifSlotManage", '0');
				}
				// 若仓库变化则清空之前选择的货位
				if (obj.oldValue && obj.oldValue != obj.newValue) {
					var itemrows = viewModel.transferOutItems.getAllRows();
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

			// 转库入库仓库和货位联动
			viewModel.transferInCard.on("storageId.valuechange", function (obj) {
				if (obj.newValue) {
					var refer = $("#refContainerinCardStorageId").data("uui.refer");
					if (refer.values && refer.values.length > 0) {
						var trueValue = refer.values[0];
						if (!viewModel.transferInCard.getValue("stockOrgId") ||
							viewModel.transferInCard.getValue("stockOrgId") != trueValue.inventoryOrgId) {
							viewModel.transferInCard.getFocusRow().setValue("stockOrgId", trueValue.inventoryOrgId, true);
						}
						// 更新货位管理状态
						viewModel.transferInCard.setValue("ifSlotManage", trueValue.ifSlotManage);
						// 更新货位状态
						viewModel.transferInItems.setMeta("goodsPositionId", "refparam",
							'{"EQ_wareHouse":"' + obj.newValue + '","EQ_isFinal":"1"}');
					}
				} else {
					// 更新批次管理状态
					viewModel.transferInCard.setValue("ifSlotManage", '0');
				}
				// 若仓库变化则清空之前选择的货位
				if (obj.oldValue && obj.oldValue != obj.newValue) {
					var itemrows = viewModel.transferInItems.getAllRows();
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
			viewModel.transferItems.on("transferNum.valuechange", function (obj) {
				viewModel.calcAmount(obj);
				//联动bom数量
				var parentRowNum = obj.rowObj.getValue("rowNum");
				//获取全部bom信息
                var allrows = viewModel.BomItems.getAllRealRows();
				for (var i = 0; i < allrows.length; i++) {
					if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                        var childGoodsQty = allrows[i].getValue("childGoodsQty") ? allrows[i].getValue("childGoodsQty") : 1;
						var bomAmount = childGoodsQty * obj.newValue;
						allrows[i].setValue("transferNum", bomAmount)
					}
				}
			});
			// 单价联动金额
			viewModel.transferItems.on("unitPrice.valuechange", function (obj) {
				var row = obj.rowObj;
				var value = obj.newValue;
				if (value) {
					var transferNum = row.getValue("transferNum") || 0;
					var amount = viewModel.formater.format(parseFloat(value) * parseFloat(transferNum));
					row.setValue("amountMoney", amount);
				}
				var parentGoodsId = obj.rowObj.getValue("goodsId");
                var parentRowNum = obj.rowObj.getValue("rowNum");
				//获取全部bom信息
                var allrows = viewModel.BomItems.getAllRealRows();
				for (var i = 0; i < allrows.length; i++) {
					if (allrows[i].getValue("parentRowNum") === parentRowNum && allrows[i].getValue("goodsId") == parentGoodsId) {
						var unitPrice = obj.newValue;
						allrows[i].setValue("unitPrice", unitPrice);
					}
				}
			});
			//Bom数量变化联动总价
			viewModel.BomItems.on("transferNum.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
				}
			});
			//Bom单价监听反算商品单价
			viewModel.BomItems.on("unitPrice.valuechange", function (obj) {
				if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
					obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
				}
				var arr = viewModel.BomItems.getSimpleData();
				var price = [],
					bomprice = [];
				var getSum = function (array) {
					var sum = 0;
					for (var i = 0; i < array.length; i++) {
						sum += parseInt(array[i]);
					}
					return sum;
				};
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i].amountMoney) {
						arr[i].amountMoney = 0
					}
					var amountMoney = parseFloat(arr[i].amountMoney)
					price.push(amountMoney);
				}
				// viewModel.purchaseList.getCurrentRow().setValue("totalMoney", getSum(price));

				// 计算反写商品行上面的值
				viewModel.backClac(obj, "unitPrice");
			});

			viewModel.BomItems.on("amountMoney.valuechange", function (obj) {
				viewModel.backClac(obj, "amountMoney");

				var arr = viewModel.BomItems.getSimpleData();
				var price = [];
				var getSum = function (array) {
					var sum = 0;
					for (var i = 0; i < array.length; i++) {
						sum += parseInt(array[i]);
					}
					return sum;
				}
				for (var i = 0; i < arr.length; i++) {
					var amountMoney = parseFloat(arr[i].amountMoney ? arr[i].amountMoney : 0)
					price.push(amountMoney);
				}
			});
			// 转库出入库联动金额和总数量
			viewModel.transferOutItems.on("factOutNum.valuechange", function (obj) {
				viewModel.calcAmount(obj);
				viewModel.calcItemTotal("out");
			});
			viewModel.transferInItems.on("factInNum.valuechange", function (obj) {
				viewModel.calcAmount(obj);
				viewModel.calcItemTotal("in");
			});

			//搜索条件 库存组织仓库过滤
			viewModel.searchcomp.viewModel.params.on("pkOrg.valuechange", function (obj) {
				if (obj.newValue != undefined && obj.newValue != "") {
					var stockOrgId = {
						"EQ_inventoryOrg.id": obj.newValue
					};
					$("#outStorage").attr("data-refparam", JSON.stringify(stockOrgId));
					$("#inStorage").attr("data-refparam", JSON.stringify(stockOrgId));
				} else {
					$("#outStorage").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
					$("#inStorage").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
					viewModel.searchcomp.viewModel.params.setValue("outStorage", "");
					viewModel.searchcomp.viewModel.params.setValue("inStorage", "");
				}
			});
			//批次号 货位  供应商 项目 库存状态 客户
			viewModel.transferItems.on("valuechange", function (obj) {
				if (obj.field === "batchNumId" ||
					obj.field === "goodsPositionId" ||
					obj.field === "batchCodeId" ||
					obj.field === "supplierId" ||
					obj.field === "projectId" ||
					obj.field === "stockStateId" ||
					obj.field === "demandStockOrgId" ||
					obj.field === "receiveStorageOrgId" ||
					obj.field === "receiveStorageId" ||
					obj.field === "customerId"
				) {
					viewModel.setValueToBom(obj);
				}
			});
		},

	});


	return view;
});
