define(['text!./positionTransfer.html', 'ocm_common', 'ocm_baseview', './meta.js','../../flow/bpmapproveref/bpmopenbill.js'], function (tpl, common, baseview, model,bpmopenbill) {
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
			baseurl: '/stock/position-transfers',
            applicationUrl :  '/stock/position-transfers',
			transferList: new u.DataTable(model.options.metas.complex),
			transferCard: new u.DataTable(model.options.metas.complex),
			transferItems: new u.DataTable(model.options.metas.complexItem),
			BomItems: new u.DataTable(model.options.metas.BomItem),

			ItemRefList: new u.DataTable(model.options.metas.ItemRef),
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button4Source: model.options.buttons.button4,


			card1Source: model.options.cards.card1,
			detail11Source: model.options.details.detail,
			grid1Option: model.options.grids.grid1,

      gridEditGood: model.options.grids.gridEditGood,
      gridEditBom: model.options.grids.gridEditBom,

      gridDetailGood: model.options.grids.gridDetailGood,
      gridDetailBom: model.options.grids.gridDetailBom,

			billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
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
		},
        state: ko.pureComputed(function() {
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
			stateRender: function (obj) {
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
				var state = viewModel.transferList.getValue("state");
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
			approveTimeComputed: ko.pureComputed(function () {
				var truetime = viewModel.transferList.ref("approveTime")();
				var showtime = u.date.format(truetime, 'YYYY-MM-DD HH:mm:ss');
				return showtime;
			}),
			beforeEditCheck: function (obj) {
                var gridObj = obj.gridObj;
                if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchNumId"))) {
                    var row = obj.rowObj.value;
                    var enableBatchNumberManage = row.enableBatchNumberManage;
                    if (enableBatchNumberManage == '1') {
                        viewModel.transferItems.setMeta("batchNumId", "refparam",
                            '{"EQ_goods":"' + row.goodsId + '","EQ_product":"' + row.productId + '","EQ_productLine":"' + row.productLineId + '","EQ_isEnable":"1"}');
                    } else {
                        toastr.warning("该商品未开启批次控制")
                        return false;
                    }
                }
                if(obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))){
                    var row = obj.rowObj.value;
                    if(row.enableBatchNoManage == '1'){
                        viewModel.transferItems.setMeta("batchCodeId", "refparam",
                            '{"EQ_goods":"' + row.goodsId + '","EQ_isEnable":"1"}');
                    }else{
                        toastr.warning("该商品未开启批号控制");
                        return false;
                    }
                }
                if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("inventoryStateId"))) {
                    var row = obj.rowObj.value;
                    var enableInvStatusManage = row.enableInvStatusManage;
                    if (enableInvStatusManage == '1') {
                        viewModel.transferItems.setMeta("inventoryStateId", "refparam",
                            '{"EQ_isEnable":"1"}');
                    } else {
                        toastr.warning("该商品未开启库存状态控制")
                        return false;
                    }
                }
                // 判断当前货位是否可编辑
                if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionInId"))) {
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
                        return false;
                    }
                }
                if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionOutId"))) {
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
                        return false;
                    }
                }

                // BOM判断
                var row = obj.rowObj.value;
                var id = row.goodsId;
                if(obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("unitPrice"))){
                    var bomdata = viewModel.findBomByParentId(id);
                    if(bomdata.length>0){
                        toastr.warning("此商品含有BOM结构，请在&lt;BOM结构信息&gt;页签下维护单价");
                        return false;
                    }else {
                        return true;
                    }
                }
        		return true;
			},

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
                common.goodsOptional.goodsOptional(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptional',viewModel.transferItems, viewModel.transferItems, function(goodsOptData, goodsOptID, cb) {
                    /**
                     * 循环遍历返回结果，拼接后展示
                     */
                    var goodsOpt = goodsOptID[0].goodsOptDtos;           // 选配与商品结构互斥，暂时理解为有子件的话不会出现选配信息 故只去第0项
                    //获取全部bom信息
                    var allrows = viewModel.transferItems.getAllRealRows();
                    var bomdata = viewModel.transferItems.getRealSimpleData();
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
                common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails',viewModel.transferItems, viewModel.transferItems);
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
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].getValue("state") == 1 || rows[i].getValue("state") == "1") {
							toastr.warning("不能删除已审核的项");
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
        $("#tab-edit-good").show();
				viewModel.transferCard.removeAllRows();
				var curRow = viewModel.transferCard.createEmptyRow();
				viewModel.transferItems.removeAllRows();
        viewModel.BomItems.removeAllRows();
				// 行号设置为0
				viewModel.curRowNum(0);
        viewModel.currowBomNum(0);
				viewModel.getCurDate(curRow);
				viewModel.goBillPanel();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
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
                if(row.getValue("state") != 0){
                    toastr.warning("不处于待处理的单据不能编辑");
                    return;
                }
                $("#tab-edit-bom").hide();
                $("#tab-edit-good").show();
				viewModel.index = index;
				viewModel.rowId = row.rowId;
				var id = row.getValue("id");
				//查询子表数据
				viewModel.findByParentid(id, function (data) {
                    data.positionTransferItems.forEach(function (item) {
                        item.batchCodeName = item.batchCodeCode;
                        item.batchNumName = item.batchNumCode;
                    });
                    data.positionTransferBoms.forEach(function (item) {
                        item.batchCodeName = item.batchCodeCode;
                        item.batchNumName = item.batchNumCode;
                    });
					viewModel.transferCard.setSimpleData(data);
					viewModel.transferItems.setSimpleData(data.positionTransferItems, {
						unSelect: true
					});
          viewModel.BomItems.setSimpleData(data.positionTransferBoms,{
            unSelect: true
          });
					// 获得当前最大行号
					viewModel.getCurRowNum();
          viewModel.getBomCurrowNum();
					viewModel.goBillPanel();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				});
			},
			detail: function () {
        $("#tab-detail-bom").hide();
        $("#tab-detail-good").show();
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.transferList.getCurrentRow();
					var id = curRow.getValue("id");
					viewModel.transferItems.removeAllRows();
					viewModel.findByParentid(id, function (data) {
                        data.positionTransferItems.forEach(function (item) {
                            item.batchCodeName = item.batchCodeCode;
                            item.batchNumName = item.batchNumCode;
                        });
                        data.positionTransferBoms.forEach(function (item) {
                            item.batchCodeName = item.batchCodeCode;
                            item.batchNumName = item.batchNumCode;
                        });
						curRow.setSimpleData(data);
						viewModel.transferItems.setSimpleData(data.positionTransferItems, {
							unSelect: true
						});
            viewModel.BomItems.setSimpleData(data.positionTransferBoms,{
              unSelect: true
            });
					});
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
					viewModel.goDetailPanel();
				}, 0);
			},
			detail2bill: function () {
                var row = viewModel.transferList.getCurrentRow();
                if(row.getValue("state") != 0){
                    toastr.warning("不处于待处理的单据不能编辑");
                    return;
                }
                $("#tab-edit-bom").hide();
                $("#tab-edit-good").show();
				viewModel.showEditBillPanel(0, row.rowId);
			},
			//查询子表数据
			findByParentid: function (id, callback) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/findByParentId",
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
        for (var i = 0; i < selectedRows.length; i++) {
          selectedRows[i].setValue("dr", "1");
          var productId = selectedRows[i].getValue("goodsId");
          var allBomRows = viewModel.BomItems.getAllRealRows();
          allBomRows.forEach(function (item) {
            if(item.getValue("parentGoodsId") == productId||item.getValue("goodsId") == productId){
              viewModel.BomItems.removeRows(item);
              item.setValue("dr", "1");
            }
          })
        }
				viewModel.transferItems.removeRows(selectedRows);
			},
			//保存单据
			saveBill: function () {
				var result = viewModel.validateBill('.ui-bill-panel', viewModel.transferItems, viewModel.transferCard);
				if (result) {
					if (!viewModel.checkEmpty(viewModel.transferCard, viewModel.transferItems, true, true, true)) {
						return
					}
					// 组装数据
					var currentRow, ajaxType;
					var index = viewModel.index;
					var transferData = viewModel.transferCard.getSimpleData()[0];
					var transferItemsData = viewModel.transferItems.getSimpleData();
					var BomItemsData =  viewModel.BomItems.getSimpleData();
          if(viewModel.index == -1){
            transferItemsData.forEach(function (item) {
              item.persistStatus = 'new';
            });
            BomItemsData.forEach(function (item) {
              item.persistStatus = 'new';
            });
          }
					transferData.positionTransferItems = transferItemsData;
					transferData.positionTransferBoms = BomItemsData;

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
							toastr.success("保存成功");
						}
					});
				}
			},
			//保存并审批单据
			saveApproveBill: function () {
				var result = viewModel.validateBill('.ui-bill-panel', viewModel.transferItems, viewModel.transferCard);
				if (result) {
					if (!viewModel.checkEmpty(viewModel.transferCard, viewModel.transferItems, true, true, true)) {
						return
					}
					// 组装数据
					var currentRow, ajaxType;
					var index = viewModel.index;
					// viewModel.transferCard.setValue("state", 1);
					// var name = u.getCookie("_A_P_userLoginName");
					// var time = new Date().getTime();
					// viewModel.transferCard.setValue("approver", name);
					// viewModel.transferCard.setValue("approveTime", time);
					var tid;
					var transferData = viewModel.transferCard.getSimpleData()[0];
          var transferItemsData = viewModel.transferItems.getSimpleData();
          var BomItemsData =  viewModel.BomItems.getSimpleData();
          if(viewModel.index == -1){
            transferItemsData.forEach(function (item) {
              item.persistStatus = 'new';
            });
            BomItemsData.forEach(function (item) {
              item.persistStatus = 'new';
            });
          }
          transferData.positionTransferItems = transferItemsData;
          transferData.positionTransferBoms = BomItemsData;
					if (index >= 0) {
						ajaxType = "put";
					} else {
						ajaxType = "post";
					}
					// 提交
					$._ajax({
						url: appCtx + viewModel.baseurl,
						type: ajaxType,
						data: JSON.stringify(transferData),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							$._ajax({
								type: "post",
								url: appCtx + viewModel.baseurl + "/batch-approve",
								data: {
									ids: data.id
						},
								success: function (res) {
									viewModel.retListPanel();
									viewModel.search();
									toastr.success("保存成功");
								}
							});
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
					var rows = vModel.getAllRealRows();
					if (rows && rows.length > 0) {
						for (var i = 0; i < rows.length; i++) {
							if (rows[i].getValue("goodsPositionInId") != null && rows[i].getValue("goodsPositionOutId") != null && rows[i].getValue("goodsPositionInId") == rows[i].getValue("goodsPositionOutId")) {
								toastr.warning("转入货位不能和转出货位相同");
								return false;
							}
						}
					} else {
						toastr.warning("至少添加一个商品");
						return false;
					}
					return true;
				} else {

					return false;
				}
			},
			// 判断批次号、货位、库存状态
			checkEmpty: function (mainDt, subDt, ifcheckgoodsposi, ifcheckbatchnum, ifcheckinvstatus) {
				var allItemRows = subDt.getAllRealRows();
				var ifSlotManage = mainDt.getValue("ifSlotManage");
				var emptyBatchRows = "",
					emptyPositionRows = "",
					emptyInvStatusRows = "",
                    emptyBatchNoRows="";
                var emptyGoodsOptRows = "";
				if (allItemRows.length > 0) {
					allItemRows.forEach(function (item) {
						if (parseFloat(item.getValue("enableBatchNumberManage")) == 1 && !(item.getValue("batchNumId"))) {
							var rowNum = item.getValue("rowNum");
							emptyBatchRows += rowNum + ",";
						}
						if (parseFloat(item.getValue("enableInvStatusManage")) == 1 && !(item.getValue("inventoryStateId"))) {
							var rowNum = item.getValue("rowNum");
							emptyInvStatusRows += rowNum + ",";
						}
						// if (!item.getValue("goodsPositionInId") && parseFloat(ifSlotManage) == 1) {
						if (!item.getValue("goodsPositionInId") || !item.getValue("goodsPositionOutId") && parseFloat(ifSlotManage) == 1) {
							var row2Num = item.getValue("rowNum");
							emptyPositionRows += row2Num + ",";
						}
                        if(parseFloat(item.getValue("enableBatchNoManage")) == 1&&!(item.getValue("batchCodeId"))){
                            emptyBatchNoRows+=item.getValue("rowNum")+",";
                        }
                        if(!item.getValue("goodsSelection") && parseFloat(item.getValue("isOptional")) == 1){
                            emptyGoodsOptRows += item.getValue("rowNum") + ",";
                        }
					});
					emptyBatchRows = emptyBatchRows.slice(0, emptyBatchRows.length - 1);
					emptyPositionRows = emptyPositionRows.slice(0, emptyPositionRows.length - 1);
					emptyInvStatusRows = emptyInvStatusRows.slice(0, emptyInvStatusRows.length - 1);
                    emptyBatchNoRows = emptyBatchNoRows.slice(0,emptyBatchRows.length-1);
                    emptyGoodsOptRows = emptyGoodsOptRows.slice(0, emptyGoodsOptRows.length - 1);
                    if(emptyBatchRows || emptyPositionRows || emptyBatchNoRows || emptyInvStatusRows || emptyGoodsOptRows){
						if (ifcheckgoodsposi && emptyPositionRows) {
							toastr.warning("请为行号" + emptyPositionRows + "的商品选择货位");
						}
						if (ifcheckbatchnum && emptyBatchRows) {
							toastr.warning("行号" + emptyBatchRows + "的商品启用了批次号，请填写批次号");
						}
						if(emptyBatchNoRows)toastr.warning("行号"+emptyBatchNoRows+"的商品启用了批号，请填写批号");

                        if (ifcheckinvstatus && emptyInvStatusRows) {
							toastr.warning("行号" + emptyInvStatusRows + "的商品启用了库存状态，请填写库存状态");
						}
                        if(emptyGoodsOptRows)toastr.warning("请为行号" + emptyGoodsOptRows + "的商品添加选配");
						return false;
					} else {
						return true;
					}
				}
			},
            //提交
            submitBtn : function () {
                var listCompId = "transferList";
                var nodeJs = "/ocm-web/pages/inventory/positionTransfer/positionTransfer.js";
                var billTypeCode = "PositionTransfer";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
            },
			//收回
            unsubmitBtn: function () {
                var listCompId = "transferList";
                var billTypeCode = "PositionTransfer";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
            },
			//审批
			approve: function () {
                var listCompId = "transferList";
                var billTypeCode = "PositionTransfer";
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
                var billTypeCode = "PositionTransfer";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
                viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },
			//取消审批
			cancelApprove: function () {
                var listCompId = "transferList";
                var billTypeCode = "PositionTransfer";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
                viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
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
        if(tabDom&&tabDom.length>0){
          tabDom.each(function (i,item) {
            var childDoms = item.children;
            $(childDoms).each(function (i, item) {
              $(item).removeClass("is-active");
            })
            $("#tabEditGood").addClass("is-active");
            $("#tabDetailGood").addClass("is-active");
            $("#tab-edit-good").hide();
          })
        }
				common.bill.retListPanel();
			},
      //选择商品页签
      checkGoods:function () {
        viewModel.isBomPanel(true);
        if(viewModel.billPanelStatus() == "detail"){
          $("#tab-detail-bom").hide();
          $("#tab-detail-good").show();
        }else {
          $("#tab-edit-bom").hide();
          $("#tab-edit-good").show();
        }
      },
      //选择Bom页签
      checkBom:function () {
        viewModel.isBomPanel(false);
        if(viewModel.billPanelStatus() == "detail"){
          $("#tab-detail-bom").show();
          $("#tab-detail-good").hide();
        }else {
          $("#tab-edit-bom").show();
          $("#tab-edit-good").hide();
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
      generateBomrowNum: function() {
        var latestnum = viewModel.currowBomNum(),
          newnum = parseFloat(latestnum) + 10;
        viewModel.currowBomNum(newnum);
        return newnum;
      },
      getBomCurrowNum: function() {
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
      //根据商品id取bom
      findBomByParentId: function (id) {
        var bomInfo;
        $._ajax({
          url: window.pathMap.base+"/base/goods-boms/goods-bom-by-parent-good-id",
          type: 'get',
          async: false,
          data: {
            parentGoodId: id
          },
          success: function(data) {
            bomInfo = data;
          }
        })
        return bomInfo;
      },

      backClac: function (obj,field) {
        // 1. 修改数量 获取当前行 parentGoodsId
        // 2. 遍历所有行取出parentGoodsId 一样的所有行
        // 3. 取出所有行里面的 amount ，并且相加
        // 4. 获取商品行goodsid 和 parentGoodsId一样的行
        // 5. 把第三步相加的和赋值给 商品行的amount  obj.rowObj

        var parentId = obj.rowObj.getValue("parentGoodsId");
        var notBomItem;
        if(!(obj.rowObj.getValue("parentGoodsId"))){
          notBomItem= obj.rowObj.getValue("goodsId");
        }
        var BomItemRows = viewModel.BomItems.getAllRealRows();
        var productItemRows = viewModel.transferItems.getAllRealRows();
        var oneParentBomRows = [],oneParentBomSum = 0;
        BomItemRows.forEach(function (item) {
          if(item.getValue("parentGoodsId") == parentId){
            oneParentBomRows.push(item);
          }
        });
        oneParentBomRows.forEach(function (item) {
          if(field == "unitPrice"){
            var childGoodsQty = item.getValue("childGoodsQty")?item.getValue("childGoodsQty"):1;
            oneParentBomSum = oneParentBomSum + (parseFloat(item.getValue(field)?item.getValue(field):0))*childGoodsQty;
          }else {
            oneParentBomSum = oneParentBomSum + parseFloat(item.getValue(field)?item.getValue(field):0);
          }
        });
        productItemRows.forEach(function (item) {
          if(item.getValue("goodsId") == parentId ){
            item.setValue(field,oneParentBomSum)
          }else if (notBomItem == item.getValue("goodsId")){
            item.setValue(field,obj.newValue);
          }
        })
      },
      setValueToBom: function (obj) {
        var parentGoodsId = obj.rowObj.getValue("goodsId");
        var bomdata = viewModel.BomItems.getSimpleData();
        for(var i=0;i<bomdata.length;i++){
          var allrows = viewModel.BomItems.getAllRealRows();
          var nameField = obj.field.replace("Id","Name");
          var idField = obj.field;
          var display = obj.rowObj.data[idField].meta
          if(bomdata[i].parentGoodsId == parentGoodsId&&allrows[i].getValue("goodsId") != parentGoodsId){
            //含有包件
            allrows[i].setValue(obj.field,obj.newValue);
            allrows[i].setValue(nameField,display?display.display:obj.rowObj.data[nameField].value)
          }else {
            //不含有包件
            if(allrows[i].getValue("goodsId") == parentGoodsId&&bomdata[i].parentGoodsId == parentGoodsId){
              allrows[i].setValue(obj.field,obj.newValue);
              allrows[i].setValue(nameField,display?display.display:obj.rowObj.data[nameField].value)
            }
          }
        }},
		},
		afterCreate: function () {
            viewModel = u.extend(viewModel,bpmopenbill.model);
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
            var bomItems =[];
						var id = refValues[i].refpk;
            var name = refValues[i].refname;
            var rowNum = viewModel.generateRownum();
						var row = viewModel.transferItems.getRowByField("goodsId", id);
						if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
							var newrow = viewModel.transferItems.createEmptyRow();
							newrow.setValue("rowNum", rowNum);
							newrow.setValue("goodsId", refValues[i].refpk);
							newrow.setValue("goodsCode", refValues[i].refcode);
							newrow.setValue("goodsName", refValues[i].refname);
							newrow.setValue("unitId", refValues[i].basicUnitId);
							newrow.setValue("unitName", refValues[i].basicUnitName);
							newrow.setValue("enableBatchNumberManage", refValues[i].enableBatchNumberManage);
							newrow.setValue("enableBatchNoManage", refValues[i].enableBatchNoManage);
							newrow.setValue("enableInvStatusManage", refValues[i].enableInvStatusManage);
							newrow.setValue("goodsVersion", refValues[i].version);
							newrow.setValue("goodsSpecification", refValues[i].specification);
							newrow.setValue("goodsModel", refValues[i].model);
							newrow.setValue("inventoryStateId", refValues[i].inventoryStateId);
							newrow.setValue("inventoryStateCode", refValues[i].inventoryStateCode);
							newrow.setValue("inventoryStateName", refValues[i].inventoryStateName);
							newrow.setValue("batchNumId", refValues[i].batchNumId);
							newrow.setValue("batchNumCode", refValues[i].batchNumCode);
							newrow.setValue("goodsPositionInId", refValues[i].goodsPositionInId);
							newrow.setValue("goodsPositionInName", refValues[i].goodsPositionInName);
							newrow.setValue("goodsPositionOutId", refValues[i].goodsPositionOutId);
							newrow.setValue("goodsPositionOutName", refValues[i].goodsPositionOutName);
							newrow.setValue("supplierName", refValues[i].supplierName);
							newrow.setValue("customerId", refValues[i].ownerCustomerId);
							newrow.setValue("customerName", refValues[i].ownerCustomerName);
							newrow.setValue("batchCodeCode", refValues[i].batchCodeCode);
                            newrow.setValue("productLineId", refValues[i].productLineId);
                            newrow.setValue("productId", refValues[i].productId);
              				newrow.setValue("originalGoodsId", refValues[i].parentOriginalGoodsId);
						}
            //bom产品信息的添加
            var bomdata = viewModel.findBomByParentId(id);
            if(bomdata.length>0){
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
                item.adjustNum = item.childGoodsQty;
                item.parentRowNum = rowNum;
                item.rowNum = bomRowNum;
                item.parentGoodsId = id;
                item.parentGoodsName = name;
                item.originalGoodsId = item.childOriginalGoodsId;
                viewModel.currowBomNum(bomRowNum);
                bomItems.push(item)
              });
              viewModel.BomItems.addSimpleData(bomItems);
            }else {
              //没有bom结构的商品直接复制过来
              var parentRowNum = rowNum;
              var bomRowNum = viewModel.generateBomrowNum();
              var cpRow = viewModel.BomItems.createEmptyRow();
              var parentGoodsId = newrow.getValue("goodsId");
              var parentGoodsName = newrow.getValue("goodsName");
              var parentGoodsCode = newrow.getValue("goodsCode");
              cpRow.setSimpleData(newrow.getSimpleData());
              cpRow.setValue("rowNum", bomRowNum);
              cpRow.setValue("parentRowNum", parentRowNum);
              cpRow.setValue("parentGoodsId", parentGoodsId);
              cpRow.setValue("parentGoodsName", parentGoodsName);
              cpRow.setValue("parentGoodsCode", parentGoodsCode);
            }
					}
				}
			});
			// 库存组织和仓库联动
			viewModel.transferCard.on("pkOrgId.valuechange", function (obj) {
				var pkOrgId = obj.newValue;
				if (pkOrgId) {
					viewModel.changeCondition("storageId", {
						"EQ_isEnable": "1"
					}, {
							"EQ_inventoryOrg.id": pkOrgId
						});
				} else {
					viewModel.changeCondition("storageId", {
						"EQ_isEnable": "1"
					}, {});
					viewModel.changeCondition("storageId", {
						"EQ_isEnable": "1"
					}, {});
				}
				if (!obj.ctx) {
					viewModel.transferCard.setValue("storageId", null);
					viewModel.transferCard.setValue("storageId", null);
				}
			});
			viewModel.transferCard.on("storageId.valuechange", function (obj) {
				if (obj.newValue) {
					var refer = $("#refContainerstorageId").data("uui.refer");
					if (refer.values && refer.values.length > 0) {
						var trueValue = refer.values[0];
						if (!viewModel.transferCard.getValue("pkOrgId") ||
							viewModel.transferCard.getValue("pkOrgId") != trueValue.inventoryOrgId) {
							viewModel.transferCard.getFocusRow().setValue("pkOrgId", trueValue.inventoryOrgId, true);
						}
						viewModel.transferCard.setValue("ifSlotManage", trueValue.ifSlotManage);
					}
				} else {
					viewModel.transferCard.setValue("ifSlotManage", "0");
				}
			});
			// 仓库和货位联动
			viewModel.transferCard.on("storageId.valuechange", function (obj) {
				if (obj.newValue) {
					var refer = $("#refContainerstorageId").data("uui.refer");
					if (refer.values && refer.values.length > 0) {
						var trueValue = refer.values[0];
						if (!viewModel.transferCard.getValue("pkOrgId") ||
							viewModel.transferCard.getValue("pkOrgId") != trueValue.inventoryOrgId) {
							viewModel.transferCard.getFocusRow().setValue("pkOrgId", trueValue.inventoryOrgId, true);
						}
						// 更新货位管理状态
						viewModel.transferCard.setValue("ifSlotManage", trueValue.ifSlotManage);
						// 更新货位状态
						viewModel.transferItems.setMeta("goodsPositionInId", "refparam",
							'{"EQ_wareHouse":"' + obj.newValue + '","EQ_isFinal":"1"}');
						viewModel.transferItems.setMeta("goodsPositionOutId", "refparam",
							'{"EQ_wareHouse":"' + obj.newValue + '","EQ_isFinal":"1"}');
					}

				} else {
					// 更新批次管理状态
					viewModel.transferCard.setValue("ifSlotManage", '0');
				}
				// 若仓库变化则清空之前选择的货位
				if (obj.oldValue && obj.oldValue != obj.newValue) {
					var itemrows = viewModel.transferItems.getAllRows();
					if (itemrows && itemrows.length > 0) {
						itemrows.forEach(function (row) {
							if (row.getValue("goodsPositionInId")) {
								row.setValue("goodsPositionInId", null);
								row.setValue("goodsPositionInName", null);
								row.setMeta("goodsPositionInId", 'display', null);
							}
							if (row.getValue("goodsPositionOutId")) {
								row.setValue("goodsPositionOutId", null);
								row.setValue("goodsPositionOutName", null);
								row.setMeta("goodsPositionOutId", 'display', null);
							}
						})
					}
				}
			});

      //数量
      viewModel.transferItems.on("adjustNum.valuechange", function(obj) {
        //联动bom数量
        var parentGoodsId = obj.rowObj.getValue("goodsId");
        //获取全部bom信息
        var bomdata = viewModel.BomItems.getSimpleData();
        for(var i=0;i<bomdata.length;i++){
          var allrows = viewModel.BomItems.getAllRealRows();
          if(bomdata[i].parentGoodsId == parentGoodsId&&bomdata[i].goodsId != parentGoodsId){
            var bomAmount = bomdata[i].childGoodsQty*obj.newValue;
            allrows[i].setValue("adjustNum",bomAmount)
          }else {
            if(allrows[i].getValue("goodsId") == parentGoodsId&&bomdata[i].parentGoodsId == parentGoodsId){
              var amount = obj.newValue;
              allrows[i].setValue("adjustNum",amount);
            }
          }
        }
      });

      //批次号 货位 批号 供应商 项目 库存状态 客户
      viewModel.transferItems.on("valuechange", function(obj) {
        if(obj.field=="batchNumId"
          ||obj.field=="goodsPositionInId"
					||obj.field=="goodsPositionOutId"
          ||obj.field=="batchCodeId"
          ||obj.field=="supplierId"
          ||obj.field=="projectId"
          ||obj.field=="inventoryStateId"
          ||obj.field=="demandStockOrgId"
          ||obj.field=="receiveStorageOrgId"
          ||obj.field=="receiveStorageId"
            ||obj.field=="customerId"
        ){
          viewModel.setValueToBom(obj);
        }
      });
		}
	});

	return view;
});