define(['text!./retaildelivery.html', 'ocm_common', 'ocm_baseview', './meta.js', 'ocm_ordertrack', "../../flow/bpmapproveref/bpmopenbill.js"], function(tpl, common, baseview, model, ordertrack, bpmopenbill) {
	'use strict'
	var viewModel, appCtx = "/occ-b2c",
		productDialog;
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
			baseurl: '/b2c/deliverys/bl',
			OrderList: new u.DataTable(model.options.metas.Order),
			deliveryOrderCard: new u.DataTable(model.options.metas.Order),
			OrderLogs: new u.DataTable(model.options.metas.OrderLogs),
			OrderProducts: new u.DataTable(model.options.metas.OrderProducts),
			BussTypeItems: new u.DataTable(model.options.metas.BussType),
			BussTypeRef: new u.DataTable(model.options.metas.BussTypeRef),
			AgencyItems: new u.DataTable(model.options.metas.Agency),
			referSaleOrderItemsList: new u.DataTable(model.options.metas.referSaleOrderItemsMeta),
			//已选择
			selectedreferListItems: new u.DataTable(model.options.metas.referSaleOrderItemsMeta),
			deliveryOrderItemBomsList: new u.DataTable(model.options.metas.deliveryItemsBomMeta),
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			searchcomp2: {},
			search2Source: model.options.searchs.search2,
			// dialogcardcomp: {},
			// dialogcardSource: model.options.dialogs.dialog1,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			buttonDetail: model.options.buttons.buttonDetail,
			card1Source: model.options.cards.card1,
			detail11Source: model.options.details.detail1,
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			grid4Option: model.options.grids.grid4,
			grid5Option: model.options.grids.grid5,
			grid6Option: model.options.grids.grid6,
			grid7Option: model.options.grids.grid7,
			AgencyRef: new u.DataTable(model.options.metas.AgencyRef),
			billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			isBomPanel: ko.observable(),
			//跳转详情页
			goDetailPanel: common.bill.goDetailPanel,
			orderStatus: ko.pureComputed(function() {
				var orderStatusName = viewModel.OrderList.ref("orderStatusName")();

				return orderStatusName;
			}),
			billStatusRt: function(obj) {
				var showValue; // = obj.value == "1" ? "启用" : "停用";
				switch (obj.value) {
					case '0':
					case 0:
						showValue = "保存";
						break;
					case '1':
					case 1:
						showValue = "待审批";
						break;
					case '2':
					case 2:
						showValue = "审批中";
						break;
					case '3':
					case 3:
						showValue = "审批通过";
						break;
					case '4':
					case 4:
						showValue = "审批不通过";
						break;
				}
				obj.element.innerHTML = showValue;
			},
			//买家留言
			commentList1: new u.DataTable(model.options.metas.remarkMeta),
			//卖家留言
			commentList2: new u.DataTable(model.options.metas.remarkMeta),
			//订单备注
			commentList3: new u.DataTable(model.options.metas.remarkMeta),
			remarkserviceData: new u.DataTable(model.options.metas.remarkMeta),
			// billPanelStatus: BILLPANELSTATUS.DEFAULT,
			//发货状态
			sendStatusSrc: [],
			logisticsModeSrc: [],
			enableCheckSrc: [{
				value: "1",
				name: "是"
			}],
			//异常状态
			exceptionStatusSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//冻结状态
			lockStatusSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//是否拆单发货
			splitDispatchSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			isGiftSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//是否加急
			urgentSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//是否退货
			returnSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//TODO: 审核枚举值
			"dispatchTypes": [{
				value: "1",
				name: "电商配送"
			}, {
				value: "2",
				name: "退货配送"
			}],
			"dispatchStatus": [{
				"value": "1",
				"name": "未配送"
			}, {
				"value": "2",
				"name": "配送中"
			}, {
				"value": "3",
				"name": "已完工"
			}, {
				"value": "4",
				"name": "已完成"
			}, {
				"value": "5",
				"name": "已结算"
			}, {
				"value": "0",
				"name": "已关闭"
			}],
			"frozenFlags": [{
				"value": "1",
				"name": "是"
			}, {
				"value": "0",
				"name": "否"
			}],
			"deliveryModes": [{
				"value": "0",
				"name": "送装"
			}, {
				"value": "1",
				"name": "自提"
			}],
			serviceModeSrc: [],
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//跳转单据详情页
			goDetailPanel: common.bill.goDetailPanel,
			//返回列表页
			retListPanel: common.bill.retListPanel,
			approveFmt: ko.pureComputed(function() {
				var value = viewModel.OrderList.ref("approveStatus")();
				var name = "";
				switch (value) {
					case 1:
						name = "已审核";
						break;
					case 2:
						name = "未审核";
						break;
					default:
						break;
				}
				return name;
			}),
		},
		//渲染类型
		rendertype: {
			operation: function(obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value["$_#_@_id"];
				var billStatus = obj.row.value["billStatus"];
				// var type = obj.row.value["castTypeId"];
				// var delfun =
				//   "data-bind=click:del.bind($data," +
				//   obj.rowIndex +
				//   "," +
				//   dataTableRowId +
				//   ")";
				var editfun =
					"data-bind=click:showEditBillPanel.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				var submit =
					"data-bind=click:submitBillBpm.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				var unsubmit =
					"data-bind=click:unsubmitBillList.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				var approve =
					"data-bind=click:approveBill.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				var unapprove =
					"data-bind=click:unapproveBill.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				// var cashdetailFun =
				//   "data-bind=click:cashdetail.bind($data," +
				//   obj.rowIndex +
				//   "," +
				//   dataTableRowId +
				//   ")";
				// var seeapproveinfo =
				//   "data-bind=click:showEditBillPanel.bind($data," +
				//   obj.rowIndex +
				//   "," +
				//   dataTableRowId +
				//   ")";
				// var shouldBill =
				//   "data-bind=click:showShouldBill.bind($data," +
				//   obj.rowIndex +
				//   "," +
				//   dataTableRowId +
				//   ")";
				var remarkfun = "data-bind=click:remarkEvt.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";

				var strHtml = '<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a href="#" ' + remarkfun + ' title="备注">备注</a>' +
					'</span>' + '<span class="ui-handle-word">';
				// var strHtml = '<div class="ui-handle-icon">';
				switch (billStatus) {
					case '0':
					case 0:
						strHtml +=
							'<span class="ui-handle-word">' +
							'<a href="#" ' +
							submit +
							' title="提交">提交</a>' +
							"</span>    ";
						strHtml +=
							'<span class="ui-handle-word">' +
							'<a href="#" ' +
							editfun +
							' title="编辑">编辑</a>' +
							"</span>    ";
						// strHtml +=
						//   '<span class="ui-handle-word">' +
						//   '<a href="#" ' +
						//   delfun +
						//   ' title="删除">删除</a>' +
						//   "</span>";
						break;
					case '1':
					case 1:
						strHtml +=
							'<span class="ui-handle-word">' +
							'<a href="#" ' +
							unsubmit +
							' title="收回">收回</a>' +
							"</span>    ";
						strHtml +=
							'<span class="ui-handle-word">' +
							'<a href="#" ' +
							approve +
							' title="审批">审批</a>' +
							"</span>    ";
						break;
					case '2':
					case 2:
						strHtml +=
							'<span class="ui-handle-word">' +
							'<a href="#" ' +
							delfun +
							' title="审批">审批</a>' +
							"</span>    ";
						strHtml +=
							'<span class="ui-handle-word">' +
							'<a href="#" ' +
							delfun +
							' title="取消审批">取消审批</a>' +
							"</span>    ";
						break;
						// strHtml +=
						//     '<span class="ui-handle-word">' +
						//     '<a href="#" ' +
						//     delfun +
						//     ' title="查看审批信息">查看审批信息</a>' +
						//     "</span>    ";
					case '3':
					case 3:
						// strHtml +=
						//     '<span class="ui-handle-word">' +
						//     '<a href="#" ' +
						//     delfun +
						//     ' title="查看审批信息">查看审批信息</a>' +
						//     "</span>    ";
						strHtml +=
							'<span class="ui-handle-word">' +
							'<a href="#" ' +
							unapprove +
							' title="取消审批">取消审批</a>' +
							"</span>    ";
						// if (type == 'pay04' && !obj.row.value["isMakeRec"]) {
						//   strHtml +=
						//     '<span class="ui-handle-word">' +
						//     '<a href="#" ' +
						//     shouldBill +
						//     ' title="生成应收">生成应收</a>' +
						//     "</span>    ";
						// }
						break;
					case '4':
					case 4:
						strHtml +=
							'<span class="ui-handle-word">' +
							'<a href="#" ' +
							editfun +
							' title="编辑">编辑</a>' +
							"</span>    ";
						break;
					default:
						// strHtml +=
						//   '<span class="ui-handle-word">' +
						//   '<a href="#" ' +
						//   cashdetailFun +
						//   ' title="查看兑付明细">查看兑付明细</a>' +
						//   "</span>    ";
				}
				obj.element.innerHTML = strHtml;
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			// operation: function(obj) {
			// 	var dataTableRowId = obj.row.value['$_#_@_id'];
			// 	var editfun = "data-bind=click:remarkEvt.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";

			// 	var optStr = '<div class="ui-handle-icon">' +
			// 		'<span class="ui-handle-word">' +
			// 		'<a href="#" ' + editfun + ' title="备注">备注</a>' +
			// 		'</span>' + '<span class="ui-handle-word">';

			// if(obj.billStatus != '0') {
			// 	var delfun = "data-bind=click:complete.bind($data," + obj.rowIndex + ")";
			// 	optStr += '<a href="#" ' +
			// 		delfun +
			// 		' title="确认完成">确认完成</a>' +
			// 		'</span></div>';
			// }

			// 	obj.element.innerHTML = optStr;
			// 	ko.cleanNode(obj.element);
			// 	ko.applyBindings(viewModel, obj.element);
			// },
			enableStatusRender: function(obj) {
				var showValue; // = obj.value == "1" ? "启用" : "停用";
				switch (obj.value) {
					case "1":
						showValue = "启用";
						break;
					case "2":
						showValue = "停用";
						break;
					default:
						showValue = "未启用";
				}
				obj.element.innerHTML = showValue;
			},
			isSynchRT: function(obj) {
				switch (obj.value) {
					case "0":
						obj.element.innerHTML = "否";
						break;
					case "1":
						obj.element.innerHTML = "是";
						break;
				}
			},
			detailRender: function(obj) { //link子页面
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
				obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			approveRender: function(obj) {
				var showValue = "";
				switch (obj.value) {
					case "1":
						showValue = "已审核";
						break;
					case "2":
						showValue = "未审核";
						break;
					default:
						break;
				}
				obj.element.innerHTML = showValue;
			},
			//是否发货
			isSend: function() {
				var statusValue = viewModel.OrderList.getValue('sendStatus');
				var showName;
				switch (statusValue) {
					case "0":
						showName = '未发货';
						break;
					case "1":
						showName = '全部发货';
						break;
					case "2":
						showName = '部分发货';
						break;
					default:
						showName = '';
				}
				return showName;
			}
		},
		//事件
		events: {
			getGoodsFun: function() {
				$('#tab-panel-3').show();
				$('#tab-panel-4').hide();
				$('#panel-tab3').addClass("tab-active");
				$('#panel-tab4').removeClass("tab-active");
			},
			getBomFun: function() {
				$('#tab-panel-3').hide();
				$('#tab-panel-4').show();
				$('#panel-tab4').addClass("tab-active");
				$('#panel-tab3').removeClass("tab-active");

			},
			//新增 参照
			showAddRefer: function() {
				// viewModel.searchcomp2.cleanSearchRefer();
				viewModel.removeAllreferRows();
				// viewModel.referSaleOrderItemBomsList.removeAllRows();
				// viewModel.selectedreferListItemBoms.removeAllRows();
				$("#search_customer").attr("placeholder", "请先选择销售组织");
				if (!viewModel.referSaleOrderDialog) {
					viewModel.referSaleOrderDialog = u.dialog({
						id: "dialog_referpurchaseorder",
						content: "#dialog_referpurchaseorder",
						hasCloseMenu: true,
						width: "95%"
					});
					var closefunc = function() {
						viewModel.referSaleOrderItemsList.removeAllRows();
						viewModel.referSaleOrderDialog.close();
					};
					var cancelButton = $("#dialog_referpurchaseorder .J-cancel");
					var closeButton = $("#dialog_referpurchaseorder .u-msg-close");
					cancelButton.off().on("click", closefunc);
					closeButton.off().on("click", closefunc);
				} else {
					viewModel.referSaleOrderDialog.show();
				}
			},
			//选择销售订单商品信息
			referSelectItemHandle: function(obj) {
				var id = obj.rowObj.value.id;
				//判断是否已选
				var hasSelected = false;
				var selectedreferItems = viewModel.selectedreferListItems.getSimpleData();
				if (selectedreferItems) {
					for (var i = 0; i < selectedreferItems.length; i++) {
						if (selectedreferItems[i].id === id) {
							hasSelected = true;
						}
					}
				}
				if (!hasSelected) {
					var selectedRows = viewModel.referSaleOrderItemsList.getSelectedRows();
					for (var i = 0; i < selectedRows.length; i++) {
						var itemInfo = selectedRows[i].getSimpleData();
						if (selectedRows[i].getValue("id") === id) {
							viewModel.selectedreferListItems.addSimpleData(itemInfo);
							// $._ajax({
							//     type: "post",
							//     url: appCtx + viewModel.itemBomurl + "/find-order-item-bom-and-existing-num-by-order-item-ids",
							//     data: {
							//         ids: itemInfo.id
							//     },
							//     success: function (data) {
							//         for (var i = 0; i < data.length; i++) {
							//             data[i].orderNum = 0;
							//             data[i].mainNum = 0;
							//             data[i].dealAmount = 0;
							//         }
							//         // viewModel.selectedreferListItemBoms.addSimpleData(data);
							//     }
							// });
						}
					}
				}
			},
			referUnSelectItemHandle: function(obj) {
				var id = obj.rowObj.value.id;
				var itemrows = viewModel.selectedreferListItems.getAllRows();
				for (var i = itemrows.length - 1; i >= 0; i--) {
					if (itemrows[i].getValue("id") === id) {
						var goodsId = itemrows[i].getValue("goodsId");
						var parentRowNum = itemrows[i].getValue("rowNum");
						viewModel.selectedreferListItems.removeRows([i], {
							forceDel: true
						});
						// var selectedBoms = viewModel.selectedreferListItemBoms.getAllRealRows();

						// for (var i = selectedBoms.length - 1; i >= 0; i--) {
						//     if (selectedBoms[i].getValue("parentGoodsId") === goodsId && selectedBoms[i].getValue("parentRowNum") == parentRowNum) {
						//         viewModel.selectedreferListItemBoms.removeRows(selectedBoms[i], {
						//             forceDel: true
						//         });
						//     }
						// }
					}
				}
			},
			removeAllreferRows: function() {
				viewModel.referSaleOrderItemsList.removeAllRows();
				viewModel.selectedreferListItems.removeAllRows();
			},
			choiceFun: function() {
				$('#tab-panel-1').show();
				$('#panel-tab1').addClass("tab-active");
				$('#panel-tab2').removeClass("tab-active");
				$('#tab-panel-2').hide();
				// $("#panel-tab3").trigger("click");
			},
			selectedsFun: function() {
				$('#tab-panel-1').hide();
				$('#tab-panel-2').show();
				$('#panel-tab2').addClass("tab-active");
				$('#panel-tab1').removeClass("tab-active");
				// $('#tab-panel-5').show().css("display", "block");
				// $('#tab-panel-6').show().css("display", "none");
			},
			//新增发货单时 仓库参照添加条件
			beforeEditCheck2: function(obj) {
				var gridObj = obj.gridObj;
				// 编辑新增发货仓库受发货组织条件限制
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("deliveryWarehouseId"))) {
					var row = obj.rowObj.value;
					var deliveryInvOrgId = row.deliveryInvOrgId;
					if (deliveryInvOrgId) {
						viewModel.selectedreferListItems.setMeta("deliveryWarehouseId", "refparam", '{"EQ_inventoryOrg.id":"' + deliveryInvOrgId + '", "EQ_isEnable":"1"}');
					}
				}
				return true;
			},
			queryChildArr: function(itemArr) {
				var deliveryOrderDto = {};
				$._ajax({
					type: "post",
					url: window.pathMap.b2c + "/b2c/order-arrange/trans-to-delivery",
					async: false,
					data: JSON.stringify(itemArr),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						data.deliveryProduct.forEach(function(item) {
							item.receiverAddress = item.addressId
						});
						deliveryOrderDto = data;
					}
				});
				return deliveryOrderDto;
			},
			referToEdit: function(itemArr) {
				viewModel.fromRefer = true;
				var date = new Date();
				var year = date.getFullYear(); //获取完整的年份(4位,1970-????)
				var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				var day = date.getDate(); //获取当前日(1-31)
				// var curRow = viewModel.deliveryOrderCard.createEmptyRow();
				viewModel.deliveryOrderCard.setSimpleData(itemArr);

				// curRow.setValue("deliveryOrderDate", year + "-" + month + "-" + day);
				//  curRow.setValue("orderStatusCode", '01');
				//  curRow.setValue("deliveryOperater", $.cookie('_A_P_userLoginName'));
				viewModel.OrderProducts.setSimpleData(itemArr.deliveryProduct);
				// 计算合计金额、合计数量
				// var itemArr = viewModel.deliveryOrderItemsList.getSimpleData();
				/*  var totalAmount = 0;
				 var totalNum = 0;
				 for (var i = 0; i < itemArr.deliveryProduct.length; i++) {
				     var itemMainNum = parseFloat(itemArr.deliveryProduct[i].orderNum) * (itemArr.deliveryProduct[i].conversionRate || 1);
				     itemArr.deliveryProduct[i].mainNum = itemMainNum;
				     totalNum += parseFloat(itemMainNum || 0);
				     if (parseInt(itemArr.deliveryProduct[i].isGift) != 1) {
				         totalAmount += parseFloat(itemArr.deliveryProduct[i].dealAmount);
				     }
				 }
				 viewModel.OrderList.getCurrentRow().setValue("totalNum", totalNum);
				 viewModel.OrderList.getCurrentRow().setValue("totalAmount", totalAmount); */


				// viewModel.deliveryOrderItemsList.removeAllRows();
				// viewModel.deliveryOrderItemBomsList.removeAllRows();
				// viewModel.deliveryOrderItemsList.setSimpleData(
				//     itemArr.deliveryProduct
				// );
				// viewModel.deliveryOrderItemBomsList.setSimpleData(
				//     itemArr.deliveryOrderItemBoms
				// );
				// var allRows = viewModel.deliveryOrderItemsList.getAllRealRows();
				// 重新计算bom数量
				// allRows.map(function (item) {
				//     var orderNum = item.getValue("orderNum");
				//     item.setValue("orderNum", "0.1");
				//     item.setValue("orderNum", orderNum);
				// });
				// viewModel.editTemplate.updateExtendData();
			},
			//确定 新增
			confirmReferSaleOrder: function() {
				var itemArr = viewModel.selectedreferListItems.getSimpleData();
				if (!itemArr.length) {
					toastr.warning("请至少选择一条商品");
					return;
				}
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				viewModel.goBillPanel(
					function() {
						var deliveryOrderDto = viewModel.queryChildArr(itemArr);
						viewModel.cachPushDatas = deliveryOrderDto;
						viewModel.referToEdit(deliveryOrderDto);
						viewModel.editEventListener();
					}
				);
				viewModel.referSaleOrderDialog.close();
			},
			// 查询子表数据
			findByParentid: function(id, callback) {
				// viewModel.deliveryOrderItemsList.removeAllRows();
				// viewModel.deliveryOrderItemBomsList.removeAllRows();
				$._ajax({
					url: appCtx + viewModel.baseurl + "/detail",
					type: "get",
					async: false,
					data: {
						id: id
					},
					success: function(data) {
						if (callback && typeof callback == "function") {
							callback(data)
						} else {
							viewModel.deliveryOrderItemsList.setSimpleData(
								data.deliveryProduct
							);
							viewModel.deliveryOrderItemBomsList.setSimpleData(
								data.deliveryOrderItemBoms
							);
						}
					}
				});
			},
			editEventListener: function() {
				//发货单修改数量时
				// viewModel.deliveryOrderItemsList.on("orderNum.valuechange", function (obj) {
				//     var currRow = viewModel.deliveryOrderItemsList.getRowByRowId(
				//         obj.rowId
				//     );
				//     // 计算商品行主数量、金额
				//     var rate = parseFloat(currRow.getValue("conversionRate") || "1");
				//     var mainNum = parseFloat(obj.newValue) * rate || "";
				//     var netWeight = parseFloat(currRow.getValue("netWeight") || 0),
				//         weight = parseFloat(currRow.getValue("weight") || 0),
				//         volume = parseFloat(currRow.getValue("volume") || 0);
				//     var rowVolume = volume * mainNum,
				//         rowWeight = weight * mainNum,
				//         rowNetWeight = netWeight * mainNum;
				//     var dealAmount = mainNum * parseFloat(currRow.getValue("dealPrice") || "0") || 0;
				//     currRow.setValue("mainNum", mainNum);
				//     currRow.setValue("dealAmount", dealAmount);
				//     currRow.setValue("rowNetWeight", rowNetWeight);
				//     currRow.setValue("rowVolume", rowVolume);
				//     currRow.setValue("rowWeight", rowWeight);
				//     // 计算合计金额、合计数量
				//     var arr = viewModel.deliveryOrderItemsList.getSimpleData();
				//     var totalAmount = 0,
				//         totalNum = 0,
				//         totalNetWeight = 0,
				//         totalVolume = 0,
				//         totalWeight = 0;
				//     for (var i = 0; i < arr.length; i++) {
				//         if (parseInt(arr[i].isGift) != 1) {
				//             totalAmount += parseFloat(arr[i].dealAmount);
				//         }
				//         totalNum += parseFloat(arr[i].mainNum || 0);
				//         totalNetWeight += parseFloat(arr[i].rowNetWeight || 0);
				//         totalVolume += parseFloat(arr[i].rowVolume || 0);
				//         totalWeight += parseFloat(arr[i].rowWeight || 0);
				//     }
				//     viewModel.deliveryOrderCard.getCurrentRow().setValue("totalNum", totalNum);
				//     viewModel.deliveryOrderCard.getCurrentRow().setValue("totalAmount", totalAmount);
				//     viewModel.deliveryOrderCard.getCurrentRow().setValue("totalNetWeight", totalNetWeight);
				//     viewModel.deliveryOrderCard.getCurrentRow().setValue("totalVolume", totalVolume);
				//     viewModel.deliveryOrderCard.getCurrentRow().setValue("totalWeight", totalWeight);
				//     //联动bom数量
				//     var parentGoodsId = currRow.getValue("goodsId");
				//     var parentRowNum = currRow.getValue("rowNum");

				//     //获取全部bom信息
				//     var bomdata = viewModel.deliveryOrderItemBomsList.getSimpleData();
				//     for (var i = 0; i < bomdata.length; i++) {
				//         var allrows = viewModel.deliveryOrderItemBomsList.getAllRealRows();
				//         if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
				//             var bomOrderNum = bomdata[i].childGoodsQty * obj.newValue,
				//                 bomMainNum = bomOrderNum * (bomdata[i].conversionRate || 1),
				//                 bomNetWeight = bomOrderNum * (bomdata[i].netWeight || 0),
				//                 bomWeight = bomOrderNum * (bomdata[i].weight || 0),
				//                 bomVolume = bomOrderNum * (bomdata[i].volume || 0),
				//                 bomDealAmount = bomMainNum * parseFloat(bomdata.dealPrice || "0") || 0;
				//             allrows[i].setValue("mainNum", bomMainNum);
				//             allrows[i].setValue("orderNum", bomOrderNum);
				//             allrows[i].setValue("dealAmount", bomDealAmount);
				//             allrows[i].setValue("rowNetWeight", bomNetWeight);
				//             allrows[i].setValue("rowVolume", bomVolume);
				//             allrows[i].setValue("rowWeight", bomWeight);
				//         } else {
				//             if (allrows[i] && allrows[i].getValue("goodsId") === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
				//                 var amount = obj.newValue,
				//                     bomNetWeight = parseFloat(allrows[i].getValue("netWeight") || 0),
				//                     bomWeight = parseFloat(allrows[i].getValue("weight") || 0),
				//                     bomVolume = parseFloat(allrows[i].getValue("volume") || 0);
				//                 allrows[i].setValue("mainNum", amount * rate);
				//                 allrows[i].setValue("orderNum", amount);
				//                 allrows[i].setValue("dealAmount", dealAmount);
				//                 allrows[i].setValue("rowNetWeight", amount * bomNetWeight);
				//                 allrows[i].setValue("rowVolume", amount * bomVolume);
				//                 allrows[i].setValue("rowNetWeight", amount * bomWeight);
				//             }
				//         }
				//     }
				// });
			},
			detail: function() {
				setTimeout(function() {
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
					viewModel.goDetailPanel(
						function() {
							viewModel.showDetailBillPanelCallBackail();
						}
					);
				})
			},
			showDetailBillPanelCallBackail: function() {
				var curRow = viewModel.OrderList.getCurrentRow();
				var id = curRow.getValue("id");
				viewModel.isBomPanel(true);
				var orderStatusCode = curRow.getValue("orderStatusCode")
				viewModel.findByParentid(id, function(data) {
					if (orderStatusCode != '01') {
						$(".ui-operate-btn .delivery-edit-show").hide()
					}
					data.deliveryProduct.forEach(function(item) {
						item.receiverAddress = item.customerAddressId;
					})
					viewModel.deliveryOrderDetailCard.setSimpleData(data);
					viewModel.deliveryOrderItemsList.setSimpleData(data.deliveryProduct);
					viewModel.deliveryOrderItemBomsList.setSimpleData(data.deliveryOrderItemBoms);
					viewModel.initBPMFromBill(id, viewModel);
				});
			},
			//匹配仓库
			resetdelivery: function() {
				// var validate = $(".ui-bill-panel")[0];

				// var result = app.compsValidateMultiParam({
				//     element: validate,
				//     showMsg: true
				// });
				// if (!result.passed) {
				//     toastr.warning("必填项不能为空");
				//     return;
				// }
				var deliveryData = viewModel.deliveryOrderCard
					.getCurrentRow()
					.getSimpleData();

				var deliveryItemsData = viewModel.OrderProducts.getSimpleData();
				// var deliveryItemBomsData = viewModel.deliveryOrderItemBomsList.getSimpleData();
				deliveryData.deliveryProduct = deliveryItemsData;
				// deliveryData.deliveryOrderItemBoms = deliveryItemBomsData;
				var url = "/match-warehouse";
				$._ajax({
					url: window.pathMap.b2c + '/b2c/order-arrange/matching-warehouse',
					type: "post",
					data: JSON.stringify(viewModel.cachPushDatas),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						// 匹配之后只需要更新子表定的数据 
						viewModel.OrderProducts.setSimpleData(
							data.deliveryProduct
						);
						// viewModel.deliveryOrderItemBomsList.setSimpleData(
						//     data.deliveryOrderItemBoms
						// );
					}
				});
			},
			filterSelectedRows: function(selectedRows, orderStatusCode) {
				var newSelectedRows = selectedRows;
				if (orderStatusCode) {
					newSelectedRows = selectedRows.filter(function(row) {
						return row.getValue("orderStatusCode") == orderStatusCode;
					});
				}
				var ids = newSelectedRows.map(function(row, index, arr) {
					return row.getValue("id");
				});
				return ids;
			},
			// 审批流程的相关按钮点击事件 - start
			// 提交申请单
			submitBillBpm: function(data, rowId) {
				viewModel = _.extend(viewModel, bpmopenbill.model);
				if (typeof(data) == 'number') {
					viewModel.OrderList.setRowSelectbyRowId(rowId);
				}
				var listCompId = "OrderList";
				var nodeJs = "/ocm-web/pages/fee/customercast/customercast.js";
				var billTypeCode = "B2CDeliveryOrder";
				var tranTypeCode = null;
				var callback = null;
				viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
			},
			// 收回申请单
			unsubmitBillList: function(data, rowId) {
				viewModel = _.extend(viewModel, bpmopenbill.model);
				if (typeof(data) == 'number') {
					viewModel.OrderList.setRowSelectbyRowId(rowId);
				}
				var listCompId = "OrderList";
				var billTypeCode = "B2CDeliveryOrder";
				var tranTypeCode = null;
				var callback = null;
				viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
			},

			// 审批通过申请单
			approveBill: function(data, rowId) {
				viewModel = _.extend(viewModel, bpmopenbill.model);
				if (typeof(data) == 'number') {
					viewModel.OrderList.setRowSelectbyRowId(rowId);
				}
				var listCompId = "OrderList";
				var billTypeCode = "B2CDeliveryOrder";
				var tranTypeCode = null;

				var withBpmCallback = function() {
					var index = viewModel[listCompId].getSelectedIndex();
					var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
					var id = viewModel.OrderList.getRow(index).getValue('id');
					viewModel.detail(index, rowId);
					viewModel.initBPMFromBill(id, viewModel);
				};
				var withoutBpmCallback = null;
				viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);

			},

			// 审批不通过申请单
			// disapproveCusReqForm: function() {
			// 	viewModel = _.extend(viewModel, bpmopenbill.model);
			// 	var listCompId = "OrderList";
			// 	var billTypeCode = "B2CDeliveryOrder";
			// 	var tranTypeCode = null;
			// 	var withBpmCallback = function() {
			// 		var index = viewModel[listCompId].getSelectedIndex();
			// 		var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
			// 		var id = viewModel.OrderList.getRow(index).getValue('id');
			// 		viewModel.detail(index, rowId);
			// 		viewModel.initBPMFromBill(id, viewModel);
			// 	};
			// 	var withoutBpmCallback = null;
			// 	viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
			// 		withoutBpmCallback);
			// },

			// 取消审批申请单
			unapproveBill: function(data, rowId) {
				viewModel = _.extend(viewModel, bpmopenbill.model);
				if (typeof(data) == 'number') {
					viewModel.OrderList.setRowSelectbyRowId(rowId);
				}
				var listCompId = "OrderList";
				var billTypeCode = "B2CDeliveryOrder";
				var tranTypeCode = null;
				var withBpmCallback = function() {
					var index = viewModel[listCompId].getSelectedIndex();
					var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
					var id = viewModel.OrderList.getRow(index).getValue('id');
					viewModel.detail(index, rowId);
					viewModel.initBPMFromBill(id, viewModel);
				};
				var withoutBpmCallback = null;
				viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
					withoutBpmCallback);
			},
			// 审批流程的相关按钮点击事件 - end
			remarkEvt: function(rowIndex, rowId) {
				// console.log(arguments);
				var self = this;
				var remarkRow;
				viewModel.remarkserviceData.removeAllRows();

				if (typeof(rowIndex) == 'number') {
					viewModel.OrderList.setRowSelect(rowIndex);
				}
				var selectedRows = viewModel.OrderList.getSelectedRows();
				var selectdata = viewModel.OrderList.getSelectedDatas();
				if (selectedRows && selectedRows.length == 1) {

					var rowData = viewModel.OrderList.getRowByRowId(rowId);
					if (!rowData) {
						rowData = selectedRows[0];
					}
					var id, vnote;
					if (rowData) {
						id = rowData.getValue('id');
						vnote = rowData.getValue('vnote');
						remarkRow = viewModel.remarkserviceData.createEmptyRow();
						remarkRow.setValue('id', id);
						remarkRow.setValue('vnote', vnote);
					}
					popupDialog = u.dialog({
						id: 'complimentary-popup',
						content: "#complimentary-popup",
						"width": "80%"
					});
					var okButton = $("#complimentary-popup .u-msg-ok");
					okButton.unbind("click").click(function() {

						if (self.addSaveRemark(rowData, id, vnote, remarkRow)) {
							popupDialog.close();
						}
					});
					var cancelButton = $("#complimentary-popup .u-msg-cancel");
					cancelButton.unbind("click").click(function() {
						popupDialog.close();
						// viewModel.addComplimentaryData.removeAllRows();
					});
					// console.log(1);
				} else {
					toastr.error("请选择一行数据");
					return
				}
			},
			addSaveRemark: function(rowData, id, vnote_origin, remarkRow) {
				var vnote = viewModel.remarkserviceData.getValue('vnote');
				// console.log(rowData.getData())
				// console.log(JSON.stringify(rowData))
				var d = viewModel.remarkserviceData.getSimpleData();
				if (vnote == vnote_origin) {
					return;
				}
				var dataResult = false;
				$._ajax({
					url: appCtx + viewModel.baseurl + "/update/remark",
					type: "put",
					// data: "ids=" + ids.join(","),
					async: false,
					data: {
						deliveryId: id,
						vnote: vnote
					},
					success: function(data) {
						toastr.success('保存成功');
						rowData.setValue('vnote', vnote);
						var products = data.products;
						var optLogs = data.logs;

						// 操作日志
						viewModel.OrderLogs.removeAllRows();


						//商品行
						viewModel.OrderProducts.removeAllRows();
						viewModel.OrderProducts.setSimpleData(products, {
							unSelect: true
						});
						viewModel.searchLog(0);
						dataResult = true;
					}
				});
				return dataResult;
			},
			sendsoout: function() {
				var rows = viewModel.OrderList.getSelectedRows();
				if (rows.length < 1) {
					toastr.error('至少选择一行数据')
					return
				}
				var ids = rows.map(function(row) {
					return row.getValue('id')
				})
				$._ajax({
					type: "post",
					url: appCtx + "/b2c/intercept-delivery/pushSaveOutOrder",
					// dataType: "json",
					// data: queryData,
					data: {
						deliveryIds: ids
					},
					success: function(data) {
						toastr.success('请求成功')
						// viewModel.OrderList.setSimpleData(data.content, {
						// 	unSelect: true
						// });
						// viewModel.OrderList.totalRow(data.totalElements);
						// viewModel.OrderList.totalPages(data.totalPages);
					}
				})
			},
			interceptx: function() {
				var rows = viewModel.OrderList.getSelectedRows();
				if (rows.length < 1) {
					toastr.error('至少选择一行数据')
					return
				}
				var ids = rows.map(function(row) {
					return row.getValue('id')
				})
				$._ajax({
					type: "post",
					url: appCtx + "/b2c/intercept-delivery/intercept",
					// dataType: "json",
					// data: queryData,
					data: {
						deliveryIds: ids
					},
					success: function(data) {
						toastr.success('请求成功')
						// viewModel.OrderList.setSimpleData(data.content, {
						// 	unSelect: true
						// });
						// viewModel.OrderList.totalRow(data.totalElements);
						// viewModel.OrderList.totalPages(data.totalPages);
					}
				})
			},
			//弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
			showAttachFiles: function(index) {
				var title;
				viewModel.index = index;
				if (index >= 0) {
					//修改操作
					title = "编辑";
					var currentData = viewModel.OrderList.getSimpleData()[index];
					singledoceidt.seteidtData(currentData);
				} else {
					title = "新增"
					//清空编辑框的信息
					singledoceidt.cleareidt();
				}
				//显示模态框
				singledoceidt.show(title, "500px", viewModel.edit);
			},
			//完成确认
			complete: function(data) {
				if (typeof(data) == 'number') {
					viewModel.OrderList.setRowSelect(data);
				}
				var ids = [];
				var rows = viewModel.OrderList.getSelectedRows();
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].getValue("id"));
					}
				}
				common.dialog.confirmDialog({
					msg1: '确认完成？',
					msg2: '完成后不可再操作',
					width: '400px',
					type: 'warn',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/complete",
							type: "post",
							// data: "ids=" + ids.join(","),
							data: {
								id: ids.join(",")
							},
							success: function(data) {
								for (var i = 0; i < rows.length; i++) {
									rows[i].setValue("billStatus", "4");
								}
							}
						});

					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function(reindex) {
				if (reindex) {
					viewModel.OrderList.pageIndex(0);
				}
				viewModel.OrderList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.OrderList.pageSize();
				var pageNumber = viewModel.OrderList.pageIndex();
				queryData.size = pageSize;
				queryData.page = pageNumber;
				queryData['search_EQ_isReturn'] = 0;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function(data) {
						viewModel.OrderList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.OrderList.totalRow(data.totalElements);
						viewModel.OrderList.totalPages(data.totalPages);
					}
				});
				viewModel.OrderProducts.removeAllRows();
				viewModel.OrderLogs.removeAllRows();
			},
			//清空搜索条件
			cleanSearch: function() {
				viewModel.searchcomp.clearSearch();
			},
			//清空参照搜索条件
			cleanSearchRefer: function() {
				viewModel.searchcomp2.cleanSearchRefer();
			},
			//页码改变时的回调函数
			pageChangeRefer1: function(index) {
				viewModel.referSaleOrderItemsList.pageIndex(index);
				viewModel.searchRefer();
			},
			//页码改变时的回调函数
			sizeChangeRefer1: function(size) {
				viewModel.referSaleOrderItemsList.pageSize(size);
				viewModel.searchRefer(true);
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)  新增参照
			searchRefer: function(reindex) {
				if (reindex) {
					viewModel.referSaleOrderItemsList.pageIndex(0);
				}
				viewModel.referSaleOrderItemsList.removeAllRows();
				var queryData = viewModel.searchcomp2.getDataWithOpr ?
					viewModel.searchcomp2.getDataWithOpr() : {};
				// if (!queryData["search_EQ_order.saleOrg"]) {
				//     toastr.warning("销售组织不能为空");
				//     return false;
				// }
				var pageSize = viewModel.referSaleOrderItemsList.pageSize();
				var pageNumber = viewModel.referSaleOrderItemsList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: window.pathMap.b2c + "/b2c/order-arrange/page",
					dataType: "json",
					data: queryData,
					success: function(data) {
						viewModel.referSaleOrderItemsList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.referSaleOrderItemsList.totalRow(data.totalElements);
						viewModel.referSaleOrderItemsList.totalPages(data.totalPages);
						// viewModel.updateSelectedIndices();
						// //重置listIndex
						// viewModel.listIndex = null;
						var ids = [];
						var items = viewModel.referSaleOrderItemsList.getSimpleData();
						for (var i = 0; i < items.length; i++) {
							ids.push(items[i].id);
						};
						// if (ids.length > 0) {
						//     $._ajax({
						//         type: "post",
						//         url: appCtx + viewModel.itemBomurl + "/find-order-item-boms-by-order-item-ids",
						//         data: {
						//             ids: ids.join(",")
						//         },
						//         success: function (data) {
						//             // viewModel.referSaleOrderItemBomsList.setSimpleData(data);
						//         }
						//     });
						// }
					}
				});
			},
			//页码改变时的回调函数
			pageChange: function(index) {
				viewModel.OrderList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function(size) {
				viewModel.OrderList.pageSize(size);
				viewModel.search(true);
			},
			searchLog: function(reindex) {
				if (reindex) {
					viewModel.OrderLogs.pageIndex(0);
				}
				viewModel.OrderLogs.removeAllRows();
				var queryData = {};
				var pageSize = viewModel.OrderLogs.pageSize();
				var pageNumber = viewModel.OrderLogs.pageIndex();
				queryData.size = pageSize;
				queryData.page = pageNumber;
				queryData['search_EQ_delivery'] = viewModel.OrderList.getFocusRow().getValue('id');
				$._ajax({
					type: "get",
					url: appCtx + "/b2c/delivery-logs",
					dataType: "json",
					data: queryData,
					success: function(data) {
						viewModel.OrderLogs.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.OrderLogs.totalRow(data.totalElements);
						viewModel.OrderLogs.totalPages(data.totalPages);
					}
				})
			},
			pageChangeLog: function(index) {
				viewModel.OrderLogs.pageIndex(index);
				viewModel.searchLog();
			},
			sizeChangeLog: function(size) {
				viewModel.OrderLogs.pageSize(size);
				viewModel.searchLog(true);
			},
			//进入修改单据页
			showEditBillPanel: function(index) {
				viewModel.OrderList.setRowFocus(index);
				var id = viewModel.OrderList.getValue("id");
				viewModel.OrderList.originEditData = viewModel.OrderList.getFocusRow().getSimpleData();
				//请求完整主子表信息
				viewModel.fillData(id);
				viewModel.goBillPanel();
				viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
			},
			//进入复制单据页
			showCopyBillPanel: function() {
				var selectedRows = viewModel.OrderList.getSelectedRows();
				var focusRow = viewModel.OrderList.getFocusRow();
				// 只支持单一复制，批量复制需单独处理
				if (selectedRows.length != 1) {
					//TODO: tips替换
					alert("请选择一条要复制的行")
					return;
				}
				var copyRow = selectedRows[0];
				var curRow = viewModel.OrderList.createEmptyRow();
				curRow.setSimpleData(copyRow.getSimpleData());
				viewModel.OrderList.setRowFocus(curRow);
				var id = copyRow.getValue("id");
				//删除主表主键，编码，审计信息
				viewModel.clearBaseProp(curRow);
				viewModel.goBillPanel();
				viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
			},
			detailClick: function(obj) {
				if (viewModel.listIndex == obj.rowIndex) {
					return true;
				} else {
					viewModel.listIndex = obj.rowIndex;
				}
				viewModel.OrderList.setRowSelect(obj.rowIndex);
				var id = viewModel.OrderList.getRow(obj.rowIndex).getValue("id");
				//请求完整主子表信息
				viewModel.fillData(id);
				//设置tab显示基本信息
				if (viewModel.execOnce) {
					viewModel.execOnce();
					viewModel.execOnce = null;
				}
				// return true;
			},
			execOnce: function() {
				var tab = $(".delivery .u-tabs__tab").eq(0);
				var content = $(".delivery .u-tabs__panel").eq(0);
				tab.addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
				content.addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
			},
			// detail: function(index, rowId) {
			// 	//确保grid先将行设置为focus状态
			// 	setTimeout(function() {
			// 		viewModel.OrderList.setRowSelectbyRowId(rowId);
			// 		var id = viewModel.OrderList.getCurrentRow().getValue("id");
			// 		//请求完整主子表信息
			// 		viewModel.fillData(id);
			// 		$(".ui-bill-detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
			// 		$(".ui-bill-detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
			// 		viewModel.goDetailPanel();
			// 	}, 0);
			// },
			// （编辑/详情）填充完整主子表数据
			fillData: function(id) {
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/detail",
					data: {
						deliveryId: id
					},
					async: false,
					success: function(data) {
						var products = data.products;
						var optLogs = data.logs;

						// 操作日志
						viewModel.OrderLogs.removeAllRows();
						viewModel.OrderLogs.setSimpleData(optLogs.content, {
							unSelect: true
						});
						viewModel.OrderLogs.totalRow(optLogs.totalElements);
						viewModel.OrderLogs.totalPages(optLogs.totalPages);

						//商品行
						viewModel.OrderProducts.removeAllRows();
						viewModel.OrderProducts.setSimpleData(products, {
							unSelect: true
						});



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
			//保存单据
			saveBill: function() {
				common.dialog.confirmDialog({
					msg1: '确认保存？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						var myData = viewModel.deliveryOrderCard.getCurrentRow().getSimpleData();
						var Goodss = viewModel.OrderProducts.getSimpleData();
						myData.deliveryProduct = Goodss;

						var _ajaxType = viewModel.deliveryOrderCard.getValue("id") ? "put" : "post";
						$._ajax({
							url: appCtx + viewModel.baseurl,
							type: _ajaxType,
							data: JSON.stringify(myData),
							contentType: "application/json; charset=utf-8",
							success: function(data) {
								viewModel.search(); //OrderList.getFocusRow().setSimpleData(data);
								viewModel.retListPanel();
							}
						})
					}
				});

			},
			//取消单据
			cancelBill: function() {
				//清除子表数据
				viewModel.BussTypeItems.removeAllRows();
				viewModel.AgencyItems.removeAllRows();
				var curRow = viewModel.OrderList.getCurrentRow();
				// 修改，则还原
				if (curRow.getValue("id")) {
					curRow.setSimpleData(viewModel.OrderList.originEditData)
				}
				// 新增或复制，则删除
				else {
					viewModel.OrderList.removeRow(curRow);
				}
				viewModel.retListPanel();
			},
			//弹出业务类型参照
			showBussRef: function() {
				viewModel.clearBussRef();
				$("#bussRefer").find(".refer").trigger("click");
			},
			//删除已参照的业务类型
			delBussItems: function() {
				var selectedRows = viewModel.BussTypeItems.getSelectedRows();
				selectedRows.forEach(function(row, index, arr) {
					row.setValue("dr", "1");
				});
				if (selectedRows && selectedRows.length > 0) {
					viewModel.BussTypeItems.removeRows(selectedRows);
				}
			},
			//清空已选业务类型参照
			clearBussRef: function() {
				viewModel.BussTypeRef.setValue("bussRefer", "");
				var refer = $("#refContainerbussRefer").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			//弹出办事处参照
			showAgencyRef: function() {
				viewModel.clearAgencyRef();
				$("#agencyRefer").find(".refer").trigger("click");
			},
			//删除已参照的办事处
			delAgencyItems: function() {
				var selectedRows = viewModel.AgencyItems.getSelectedRows();
				selectedRows.forEach(function(row, index, arr) {
					row.setValue("dr", "1");
				});
				if (selectedRows && selectedRows.length > 0) {
					viewModel.AgencyItems.removeRows(selectedRows);
				}
			},
			//清空已选办事处参照
			clearAgencyRef: function() {
				viewModel.AgencyRef.setValue("agencyRefer", "");
				var refer = $("#refContaineragencyRefer").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			// 检验前事件
			checkDelivery: function(checkData, callback) {
				checkData = checkData ? checkData : {};
				$._ajax({
					url: appCtx + viewModel.baseurl + "/check-delivery",
					type: "GET",
					data: checkData,
					success: function(resp) {
						viewModel.creditCheck = resp.credit; // 信用
						viewModel.stock = resp.stock; // 可用量
						if (viewModel.stock && viewModel.stock.length > 0) {
							$("#checkOk2")[0].innerHTML = "下一步";
						} else if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
							$("#checkOk2")[0].innerHTML = "保存";
						}
						if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
							checkCredit()
						} else if (viewModel.stock && viewModel.stock.length > 0) {
							checkStock()
						} else {
							callback(checkData)
						}
						//保存时信用弹框
						function checkCredit() {
							var creditCheck = viewModel.creditCheck;
							if (!viewModel.dialogSaveBilldialog2 && creditCheck != undefined && creditCheck.length > 0) {
								viewModel.dialogSaveBilldialog2 = u.dialog({
									id: "dialog_save_bill2",
									content: "#dialog_save_bill2",
									hasCloseMenu: true,
									width: "1000px"
								});
							} else {
								viewModel.dialogSaveBilldialog2.show();
							}
							viewModel.saveCheckCreditDetailItems.setSimpleData(creditCheck)
							var okButton2 = $("#dialog_save_bill2 .J-ok");
							okButton2.off().on("click", function() {
								viewModel.dialogSaveBilldialog2.close();
								if (viewModel.stock && viewModel.stock.length > 0) {
									checkStock()
								} else {
									callback(checkData)
								}
							})
							var cancelButton2 = $("#dialog_save_bill2 .J-cancel");
							cancelButton2.off().on("click", function() {
								viewModel.dialogSaveBilldialog2.close();
							});
							viewModel.dialogSaveBilldialog2.show();
						}

						function checkStock() {
							var stock = viewModel.stock;
							if (!viewModel.dialogSubmitBill) {
								viewModel.dialogSubmitBill = u.dialog({
									id: "dialog_submit_bill",
									content: "#dialog_submit_bill",
									hasCloseMenu: true,
									width: "800px"
								});
							} else {
								viewModel.dialogSubmitBill.show();
							}
							var _A_P_unit = JSON.parse(localStorage.getItem('_A_P_unit'));
							var temp = "<div style='padding-left: 20px'>" +
								stock.map(function(item) {
									var unitList = "",
										precision = 0;
									if (_A_P_unit && _A_P_unit.length > 0) {
										unitList = _A_P_unit.filter(function(r) {
											return r.unitId == item.unit;
										});
									}
									if (unitList && unitList.length > 0) {
										precision = unitList[0].precision;
									}
									var willAmount = new u.NumberFormater(precision).format(parseFloat(item.willAmount));
									var avaAmount = new u.NumberFormater(precision).format(parseFloat(item.avaAmount));
									var html = "<div style='margin-top: 10px'>商品：" + item.goodsName + "可用量不足，本次需要 " + willAmount + "，当前可用 " + avaAmount + "</div>";
									return html
								}).join('') +
								"</div>";
							$("#submit_stock")[0].innerHTML = temp;
							var okButton = $("#dialog_submit_bill .J-ok");
							okButton.off().on("click", function() {
								viewModel.dialogSubmitBill.close();
								callback(checkData)
							})
							var cancelButton = $("#dialog_submit_bill .J-cancel");
							cancelButton.off().on("click", function() {
								viewModel.dialogSubmitBill.close();
							});
						}
					}
				});
			}
		},

		afterCreate: function() {
			// 初始化折叠面板
			$.fn.collapsepanel(false, true);
			//绑定输入框enter事件
			// $('#PromoActivity-searchcontent input').off("keydown").on("keydown", function(e) {
			// 	if (e.keyCode == 13) {
			// 		$(this).blur();
			// 		viewModel.search();
			// 	}
			// });
			//配送方式枚举
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.DeliveryModeEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.serviceModeSrc = newarray;
				}
			});
			//发货状态
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.DeliveryEnumCategory$DeliverySendStatusEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.sendStatusSrc = newarray;
				}
			});
			//物流方式枚举
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.LogisticsModeEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.logisticsModeSrc = newarray;
				}
			});
			// 监听业务类型参照选择
			viewModel.BussTypeRef.on("bussRefer.valuechange", function(obj) {
				if (!obj.newValue) {
					return;
				}
				var refer = $("#refContainerbussRefer").data("uui.refer");
				if (refer && refer.values.length > 0) {
					for (var i = 0; i < refer.values.length; i++) {
						var refpk = refer.values[i].refpk;
						var row = viewModel.BussTypeItems.getRowByField("bussiTypeId", refpk);
						var newrow;
						if (!row || row.status === u.Row.STATUS.FALSE_DELETE) {
							newrow = viewModel.BussTypeItems.createEmptyRow({
								unSelect: true
							});
							newrow.setValue("bussiTypeCode", refer.values[i].refcode);
							newrow.setValue("bussiTypeName", refer.values[i].refname);
							//如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
							newrow.setValue("bussiTypeId", refpk);
						}
					}
				}
			});
			// 监听办事处分区参照选择
			viewModel.AgencyRef.on("agencyRefer.valuechange", function(obj) {
				if (!obj.newValue) {
					return;
				}
				var refer = $("#refContaineragencyRefer").data("uui.refer");
				if (refer && refer.values.length > 0) {
					for (var i = 0; i < refer.values.length; i++) {
						var refpk = refer.values[i].refpk;
						var row = viewModel.AgencyItems.getRowByField("officeId", refpk);
						if (!row || row.status === u.Row.STATUS.FALSE_DELETE) {
							var newrow = viewModel.AgencyItems.createEmptyRow({
								unSelect: true
							});
							newrow.setValue("officeCode", refer.values[i].refcode);
							newrow.setValue("officeName", refer.values[i].refname);
							//如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
							newrow.setValue("officeId", refpk);
						}
					}
				}
			})
		}

		// function init(element, params) {
		// 	appInit(element, params);
		// 	afterRender();
		// 	var bussrefrow = viewModel.BussTypeRef.createEmptyRow();
		// 	viewModel.BussTypeRef.setRowFocus(bussrefrow);
		// 	var agencyrefrow = viewModel.AgencyRef.createEmptyRow();
		// 	viewModel.AgencyRef.setRowFocus(agencyrefrow);
		// 	window.vm = viewModel;
		// }

		// return {
		// 	init: init
		// }
		// });
	});

	return view;
});