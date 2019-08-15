define(['text!./orderreturn.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
	'use strict'
	var viewModel, appCtx = "/occ-b2c",
		app,
		productDialog, popupDialog, productBuyDialog, freightDialog, orderChangePostData, orderChangeDialog, changeProductDialog, firejectDialog, remarkDialog, freezReasonDialog, salingRefundGoodsDialog;
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
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/b2c/orderreturn',
			searchurl: '/b2c/orderreturn',
			processOrderList: new u.DataTable(model.options.metas.orderMeta),
			orderDetail: new u.DataTable(model.options.metas.orderDetailMeta),
			goodsList: new u.DataTable(model.options.metas.goodsMeta),
			//变更后商品信息
			afterGoodsList: new u.DataTable(model.options.metas.goodsMeta),
			promList: new u.DataTable(model.options.metas.promMeta),
			linkList: new u.DataTable(model.options.metas.linkMeta),
			//			productList: new u.DataTable(model.options.metas.productMeta),
			logList: new u.DataTable(model.options.metas.logMeta),
			//买家留言
			commentList1: new u.DataTable(model.options.metas.remarkMeta),
			//卖家留言
			commentList2: new u.DataTable(model.options.metas.remarkMeta),
			//订单备注
			commentList3: new u.DataTable(model.options.metas.remarkMeta),
			//订单跟踪
			orderTrackData: new u.DataTable(model.options.metas.orderTracMeta),
			// 退款方式
			returnpathData: new u.DataTable(model.options.metas.returnpathMeta),

			//关联运费
			freightData: new u.DataTable(model.options.metas.freightMeta),
			//商品换购--子表信息
			productBuyData: new u.DataTable(model.options.metas.productBuyMete),
			//商品换购--商品
			productBuyChangeData: new u.DataTable(model.options.metas.productBuyChangeMete),
			//商品升级-高声低
			upgradeHightData: new u.DataTable(model.options.metas.upgradeHightMete),
			//变更商品
			upgradeCommodityData: new u.DataTable(model.options.metas.upgradeHightMete),
			//变更商品--补差链接
			upgradeCommodityLinkData: new u.DataTable(model.options.metas.upgradeHightLinkMete),
			//变更赠品
			upgradeGiftData: new u.DataTable(model.options.metas.upgradeHightMete),
			//商品升级-低声高
			upgradeLowData: new u.DataTable(model.options.metas.upgradeHightMete),
			//商品升级-高升低-链接
			upgradeHightLinkData: new u.DataTable(model.options.metas.upgradeHightLinkMete),
			//商品升级-低声高-链接
			upgradeLowLinkData: new u.DataTable(model.options.metas.upgradeHightLinkMete),
			//商品升级-低声高
			upgradeHightWaitData: new u.DataTable(model.options.metas.upgradeHightWaitMete),

			//售后退货-待选
			returnGoodsWaitData: new u.DataTable(model.options.metas.upgradeHightMete),
			//售后退货-已选
			returnGoodsSelectData: new u.DataTable(model.options.metas.upgradeHightWaitMete),
			/* 售中退款-待选 */
			salingRefundWaitGoodsData: new u.DataTable(model.options.metas.upgradeHightMete),
			/* 售中退款-已选 */
			salingRefundSelectedGoodsData: new u.DataTable(model.options.metas.upgradeHightMete),


			// 分拨


			// 点击弹窗商品查询装载产品的数据容器 for grid
			orderGoods4WarehouseInputData: new u.DataTable(model.options.metas.orderGoods4WarehouseInput),
			// 弹窗商品索引
			orderGoods4WarehouseInputDataIndex: -1,
			// 产品关系map
			orderGoods4WarehouseInputDataTmpMap: null,

			firejectReasonData: new u.DataTable(model.options.metas.firejectMeta),



			//操作日志
			logList: new u.DataTable(model.options.metas.logMeta),
			//延期
			delayShipData: new u.DataTable(model.options.metas.delayShipMeta),
			//延期2
			delayShipData2: new u.DataTable(model.options.metas.delayShipMeta),
			//订单备注
			remarkData: new u.DataTable(model.options.metas.remarkMeta),
			//指定物流公司
			changedLogisticsList: new u.DataTable(model.options.metas.changedLogisticsRef),
			transferDataList: new u.DataTable(model.options.metas.transferDataList),

			mysupplierData: new u.DataTable(model.options.metas.mysupplierData),

			searchcomp: {},
			dialogcardcomp: {},
			complimentaryPopupSearch: {},
			searchSource: model.options.searchs.search1,
			searchSplit: model.options.searchs.search2, //: model.options.searchs.search2,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button5Source: model.options.buttons.button5,
			details1Source: model.options.details.detail1,
			card1Source: model.options.cards.card1,
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			//			grid3Option: model.options.grids.grid3,
			grid4Option: model.options.grids.grid4,
			grid5Option: model.options.grids.grid5,
			grid6Option: model.options.grids.grid6,
			grid7Option: model.options.grids.grid7,
			grid8Option: model.options.grids.grid8,
			grid9Option: model.options.grids.grid9,
			grid10Option: model.options.grids.grid10,
			grid11Option: model.options.grids.grid11,
			grid12Option: model.options.grids.grid12,
			grid13Option: model.options.grids.grid13,
			grid14Option: model.options.grids.grid14,
			grid15Option: model.options.grids.grid15,
			grid16Option: model.options.grids.grid16,
			grid17Option: model.options.grids.grid17,
			grid18Option: model.options.grids.grid18,
			grid19Option: model.options.grids.grid19,
			grid20Option: model.options.grids.grid20,
			grid21Option: model.options.grids.grid21,
			grid22Option: model.options.grids.grid22,
			grid23Option: model.options.grids.grid23,
			grid24Option: model.options.grids.grid24,

			grid29Option: model.options.grids.grid29,
			//分拨-服务商-头
			gridsplitorderOption: model.options.grids.gridsplitorder,
			//订单分拨 -服务商地址
			splitOrderData: new u.DataTable(model.options.metas.splitOrder),
			//分拨-服务商-子表快递
			gridsplitorderSubOption: model.options.grids.gridsplitorderSub,
			//分拨-经销商
			gridcustomersubOption: model.options.grids.gridcustomersub,
			//分拨-供应商
			gridsuppliersubOption: model.options.grids.gridsuppliersub,
			//分拨-快递
			productOrderSplitOption: model.options.grids.productOrderSplit,
			dialogcardSource: model.options.dialogs.dialog1,
			delayShipDataSrc: [{
				value: 3,
				name: "3天"
			}, {
				value: 5,
				name: "5天"
			}, {
				value: 7,
				name: "7天"
			}, {
				value: 10,
				name: "10天"
			}],
			// 退款方式
			returnpathDataSource: [{
				value: 0,
				name: "买家寄回"
			}, {
				value: 1,
				name: "上门取件"
			}],
			returnTypeDataSource: [{
				value: '-1',
				name: '取消退货'
			}, {
				value: 0,
				name: '仅退款'
			}, {
				value: 1,
				name: '退货退款'
			}, {
				value: 2,
				name: '换货'
			}],
			//财审状态枚举
			fiAuditStatusSrc: [{
				value: '0',
				name: '否'
			}, {
				value: '1',
				name: '是'
			}],
			//订单类型枚举
			orderTypeSrc: [],
			//订单状态枚举
			orderStatusSrc: [],
			//查询所需参数
			orderStatus4QuerySrc: [],
			//物流方式枚举
			logisticsModeSrc: [],
			//配送方式枚举
			deliveryModeSrc: [],
			//订单来源枚举
			orderSourceSrc: [],
			//平台状态
			OrderPlatformBillStatusSrc: [],
			//发货状态
			sendStatusSrc: [],
			//退款状态
			returnFeeStatusSrc: [],
			enableFmt: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("platformBillStatus")();
				switch (enableStatus) {
					case '01':
						return "已支付,未发货";
					case '02':
						return "已发货";
					case '03':
						return "交易完成";
					default:
				}
			}),
			logistics: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("logisticsMode")();
				switch (enableStatus) {
					case '1':
						return "";
					case '2':
						return "快递配送";
					case '3':
						return "服务商配送";
					case '4':
						return "供应商直发";
					case '5':
						return "经销商订单";
					default:
				}
			}),
			//订单类型
			ordrTypeList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("orderType")();
				switch (enableStatus) {
					case '0':
						return "普通商品";
					case '1':
						return "运费链接";
					case '2':
						return "补差链接";
					case '4':
						return "换购链接";
					default:
				}
			}),
			//冻结标识
			lockStatusList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("isLock")();
				switch (enableStatus) {
					case '0':
						return "否";
					case '1':
						return "是";
					default:
				}
			}),
			//配送方式
			deliveryModeList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("serviceMode")();
				switch (enableStatus) {
					case '0':
						return "送装";
					case '1':
						return "自提";
					default:
				}
			}),
			//订单来源
			orderSourceList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("orderSource")();
				switch (enableStatus) {
					case '0':
						return "平台";
					case '1':
						return "拆单";
					case '2':
						return "补录";
					case '3':
						return "补赠";
					case '4':
						return "换货";
					default:
				}
			}),
			//订单状态
			orderStatusList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("billStatus")();
				switch (enableStatus) {
					case '01':
						return "暂存";
					case '02':
						return "未处理";
					case '03':
						return "未审核";
					case '04':
						return "已审核";
					case '05':
						return "已财审";
					case '06':
						return "已发货";
					case '07':
						return "已完成";
					case '08':
						return "已关闭";
					case '09':
						return "已拆分";
					default:
				}
			}),
			//异常标识
			exceptionStatusList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("isException")();
				switch (enableStatus) {
					case '0':
						return "否";
					case '1':
						return "是";
					default:
				}
			}),
			//发货状态
			sendStatusList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("sendStatus")();
				switch (enableStatus) {
					case '0':
						return "未退货";
					case '1':
						return "部分退货";
					case '2':
						return "全部退货";
					case '3':
						return '不需要退货';
					case '4':
						return '已取消退货'
					default:
				}
			}),
			returnGoodsStatusList: [{
				value: "0",
				name: "未关闭"
			}, {
				value: "1",
				name: "部分关闭"
			}, {
				value: "2",
				name: "已关闭"
			}],
			//异常状态
			exceptionStatusSrc: [{
				value: "1",
				name: "异常"
			}, {
				value: "0",
				name: "正常"
			}, ],
			//冻结状态
			lockStatusSrc: [{
				value: "1",
				name: "冻结"
			}, {
				value: "0",
				name: "正常"
			}, ],
			//是否拆单发货
			splitDispatchSrc: [{
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
			//是否变更
			changeSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//是否欠件
			ownSrc: [{
				value: '1',
				name: '是'
			}, {
				value: '0',
				name: '否'
			}],
			interceptStatusDataSource: [{
				value: '1',
				name: '成功'
			}, {
				value: '0',
				name: '失败'
			}],
			//关联类别
			linkTypeSrc: [],
			//退款状态
			refundStatusSrc: [],
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//跳转单据详情页
			goDetailPanel: common.bill.goDetailPanel,
			//返回列表页
			retListPanel: common.bill.retListPanel,

			billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
			//记录列表当前的位置
			listIndex: null,
		},
		rendertype: {
			precision2Render: common.rendertype.precision2Render,
			//是否换购
			isTradeRender: function(obj) {
				var showValue = obj.value == "1" ? "是" : obj.value == "0" ? "否" : "";
				obj.element.innerHTML = showValue;
			},
			//优惠来源
			promotionRender: function(obj) {
				var showName;
				switch (obj.value) {
					case "0":
						showName = '平台';
						break;
					case "1":
						showName = '系统';
						break;
					case "2":
						showName = '手动';
					default:
						showName = '平台';
				}
				obj.element.innerHTML = showName;
			},
			//优惠类型
			promotionTypeRender: function(obj) {
				var showName;
				switch (obj.value) {
					case "0":
						showName = '整单优惠';
						break;
					case "1":
						showName = '商品优惠';
						break;
					default:
						showName = '整单优惠';
				}
				obj.element.innerHTML = showName;
			},
			//返现状态
			rebateStatusRender: function(obj) {
				var showName;
				switch (obj.value) {
					case "0":
						showName = '未返现';
						break;
					case "1":
						showName = '已返现';
						break;
					default:
						showName = '未返现';
				}
				obj.element.innerHTML = showName;
			},
			//平台状态 带入
			platformBillStatus: function() {
				var platformBillStatus = viewModel.orderDetail.getValue('platformBillStatus');
				var name;
				switch (platformBillStatus) {
					case '01':
						name = '待发货';
						break;
					case '02':
						name = '已发货';
						break;
					case '03':
						name = '交易完成';
						break;
					default:
						name = '待发货';
				}
				return name;

			},
			//是否拆单发货 带入
			isSplitDispatch: function() {
				var isSplitDispatch = viewModel.orderDetail.getValue('isSplitDispatch');
				if (isSplitDispatch === null) {
					viewModel.orderDetail.setValue('isSplitDispatch', 0);
				}
				var name;
				switch (isSplitDispatch) {
					case '0':
						name = '否';
						break;
					case '1':
						name = '是';
						break;
					default:
						name = '否';
				}
				return name;
			},
			//是否加急 带入
			isUrgent: function() {
				var isUrgent = viewModel.orderDetail.getValue('isUrgent');
				if (isUrgent === null) {
					viewModel.orderDetail.setValue('isUrgent', 0);
				}
				var name;
				switch (isUrgent) {
					case '0':
						name = '否';
						break;
					case '1':
						name = '是';
						break;
					default:
						name = '否';
				}
				return name;
			},
			//延期发货标识 带入
			isDelay: function() {
				var isDelay = viewModel.orderDetail.getValue('isDelay');
				if (isDelay === null) {
					viewModel.orderDetail.setValue('isDelay', 0);
				}
				var name;
				switch (isDelay) {
					case '0':
						name = '否';
						break;
					case '1':
						name = '是';
						break;
					default:
						name = '否';
				}
				return name;
			},
			//发货状态同步标识 带入
			issynsuccess: function() {
				var issynsuccess = viewModel.orderDetail.getValue('issynsuccess');
				if (issynsuccess === null) {
					viewModel.orderDetail.setValue('issynsuccess', 0);
				}
				var name;
				switch (issynsuccess) {
					case 0:
						name = '否';
						break;
					case 1:
						name = '是';
						break;
					default:
						name = '否';
				}
				return name;
			},
			//处理状态
			promStatusRender: function(obj) {
				var showName;
				switch (obj.value) {
					case "0":
						showName = '未处理';
						break;
					case "1":
						showName = '已处理';
						break;
					case "2":
						showName = '已人工关闭';
						break;
					default:
						showName = '未处理';
				}
				obj.element.innerHTML = showName;
			},
			//活动作废
			promStatus: function() {
				var promStatus = viewModel.orderDetail.getValue('promStatus');
				var name;
				switch (promStatus) {
					case '0':
						name = '未处理';
						break;
					case '1':
						name = '已处理';
						break;
					case '2':
						name = '已人工关闭';
						break;
					default:
						name = '未处理';
				}
				return name;
			},
			//赠品来源
			giftSourceRender: function(obj) {
				var showValue = obj.value == "" ? "" : (obj.value == "0" ? "手动" : "自动");
				obj.element.innerHTML = showValue;
			},
			//是否加急
			urgentStatusGrid: function(obj) {
				var showValue = obj.value == "1" ? "是" : "否";
				obj.element.innerHTML = showValue;
			},
			//是否退货
			isReturnGrid: function(obj) {
				var showValue = obj.value == "1" ? "是" : "否";
				obj.element.innerHTML = showValue;
			},
			//是否赠品
			isGiftRender: function(obj) {
				var showValue = obj.value == "1" ? "是" : "否";
				obj.element.innerHTML = showValue;
			},

			//是否拆单
			splitStatusGrid: function(obj) {
				var showValue = obj.value == "1" ? "是" : "否";
				obj.element.innerHTML = showValue;
			},
			//冻结标识
			lockRender: function(obj) {
				var showValue = obj.value == "1" ? "是" : "否";
				obj.element.innerHTML = showValue;
			},
			//是否已打款
			isPaid: function(obj) {
				var showValue = obj.value == "1" ? "是" : "否";
				obj.element.innerHTML = showValue;
			},
			//是否欠件标识
			ownRender: function(obj) {
				var showValue = obj.value == "1" ? "是" : "否";
				obj.element.innerHTML = showValue;
			},
			//预占状态
			hastacked: function(obj) {
				var showValue = obj.value == "1" ? "已预占" : "未预占";
				obj.element.innerHTML = showValue;
			},
			//跳转详情页
			detailRender: function(obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
				obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
		},
		events: {
			//订单跟踪数据请求
			ordertrackDataRequest: function(id) {
				// var orderId = id;
				// $._ajax({
				// 	type: "get",
				// 	// data: { id:orderId },
				// 	url: appCtx + '/b2c/order-track-infos/' + orderId,
				// 	success: function(data) {
				// 		viewModel.orderTrackData.setSimpleData(data);
				// 		//订单跟踪物流方式
				// 		var thislogisticsMode = viewModel.orderDetail.getValue('logisticsMode');
				// 		//htmlID orderTrackContent 
				// 		ordertrack.init.run("orderTrackContent", data, thislogisticsMode);
				// 	}
				// });
			},
			//删除和批量删除
			del: function(data, rowId) {
				if (typeof(data) == 'number') {
					viewModel.processOrderList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.processOrderList.getSelectedRows();
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
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/delete",
							type: "post",
							// data: "ids=" + ids.join(","),
							data: {
								ids: ids.join(",")
							},
							success: function(data) {
								viewModel.processOrderList.removeRows(rows);
							}
						});

					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function(reindex) {
				if (reindex) {
					viewModel.processOrderList.pageIndex(0);
				}
				viewModel.processOrderList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				// 退货标识
				queryData['search_EQ_isReturn'] = "1";
				// search_IN_billStatus: 04,05
				// queryData['search_IN_logisticsMode'] = '2';
				// queryData['search_IN_billStatus'] ='04','05';
				var pageSize = viewModel.processOrderList.pageSize();
				var pageNumber = viewModel.processOrderList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.searchurl,
					dataType: "json",
					data: queryData,
					success: function(data) {
						viewModel.processOrderList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.processOrderList.totalRow(data.totalElements);
						viewModel.processOrderList.totalPages(data.totalPages);
						//清空详情页
						viewModel.orderDetail.removeAllRows();
						viewModel.goodsList.removeAllRows();
						//						viewModel.productAllList.removeAllRows();
						viewModel.promList.removeAllRows();
						viewModel.linkList.removeAllRows();
						viewModel.logList.removeAllRows();
						viewModel.logList.totalRow(0);
						viewModel.logList.totalPages(0);
						//重置listIndex
						viewModel.listIndex = null;
					}
				})
			},
			//搜索分拨数据
			searchComplimentary: function() {
				viewModel.splitOrderData.removeAllRows();
				var queryData = viewModel.complimentaryPopupSearch.getDataWithOpr();
				var officeId = null;
				officeId = queryData['search_EQ_agency.id'];
				//var customerId = queryData['search_EQ_serviceProvider.id'];
				if ($("#refContainerSplitorderServiceProviderId").data("uui.refer").values) {
					var customerIdData = $("#refContainerSplitorderServiceProviderId").data("uui.refer").values[0];
				} else {
					return;
				}
				var customerId = customerIdData ? customerIdData["customerId"] : null;
				if (!customerId) {
					customerId = null;
				}
				if (officeId == null) {
					toastr.error('请选择办事处');
					return;
				}
				if (customerId == null) {
					toastr.error('请选择服务商');
					return;
				}
				//    if (accountId == null) {
				//      toastr.error('请选择业务账号');
				//      return;
				//    }

				var myData = {
					'officeId': officeId,
					'customerId': customerId,
					//      'accountId': accountId
				}

				$.ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + '/allot-order-query-addrs',
					data: myData,
					//data: JSON.stringify(myData),
					// contentType: "application/json; charset=utf-8",     
					//async:false,
					success: function(data) {
						viewModel.splitOrderData.setSimpleData(data, {
							unSelect: true
						});
						// viewModel.splitOrderData.totalRow(data.totalElements);
						// viewModel.splitOrderData.totalPages(data.totalPages);
					}
				});
			},
			//清空搜索条件
			cleanSearch: function() {
				viewModel.searchcomp.clearSearch();
			},
			//清空搜索条件-弹出
			cleanSearchComplimentary: function() {
				viewModel.complimentaryPopupSearch.clearSearch();
				$("#refContainerSplitorderServiceProviderId").data("uui.refer").setValue([]);
			},
			//页码改变时的回调函数
			pageChange: function(index) {
				viewModel.processOrderList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function(size) {
				viewModel.processOrderList.pageSize(size);
				viewModel.search(true);
			},
			// 可以进入编辑态
			canInEdit: function() {
				var canIn = true;
				var id = viewModel.processOrderList.getValue("id");
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + "/isRefer",
					async: false,
					data: {
						id: id
					},
					success: function(data) {
						if (data == 1) {
							toastr.error("已被引用数据不可编辑");
							canIn = false;
						}
					}
				})
				return canIn;
			},
			//进入修改单据页
			showEditBillPanel: function(index) {
				viewModel.processOrderList.setRowFocus(index);
				if (!viewModel.canInEdit()) {
					return;
				}
				var id = viewModel.processOrderList.getValue("id");
				viewModel.processOrderList.originEditData = viewModel.processOrderList.getFocusRow().getSimpleData();
				//查询子表数据
				viewModel.findByParentid(id);
				viewModel.goBillPanel();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
			},
			//进入复制单据页
			showCopyBillPanel: function() {
				var selectedRows = viewModel.processOrderList.getSelectedRows();
				// 只支持单一复制，批量复制需单独处理
				if (selectedRows.length != 1) {
					toastr.error("请选择一条要复制的行");
					return;
				}
				var copyRow = selectedRows[0];
				var curRow = viewModel.processOrderList.createEmptyRow();
				curRow.setSimpleData(copyRow.getSimpleData());
				viewModel.processOrderList.setRowFocus(curRow);
				var id = copyRow.getValue("id");
				//查询子表数据
				viewModel.findByParentid(id);
				//删除主表主键，编码，审计信息
				viewModel.clearBaseProp(curRow);
				//删除子表主键，子表主表关联
				var subRows = viewModel.complexItems.getAllRows();
				for (var i = 0; i < subRows.length; i++) {
					viewModel.clearBaseProp(subRows[i]);
					subRows[i].setValue("parentid", "");
				}
				viewModel.goBillPanel();
				viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
			},
			//详情
			// 方案1：clone编辑态模板，设置只读，返回删除
			// 方案2：重新定义详情模板
			// 主要看差异，如果差异不大公用模板，差异大重新定义
			// detail: function() {
			//   //确保grid先将行设置为focus状态
			//   setTimeout(function(){
			//     var curRow = viewModel.processOrderList.getCurrentRow();
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
			detail: function(obj) {
				if (viewModel.listIndex == obj.rowIndex) {
					return true;
				} else {
					viewModel.listIndex = obj.rowIndex;
				}
				viewModel.processOrderList.setRowSelect(obj.rowIndex);
				var id = viewModel.processOrderList.getRow(obj.rowIndex).getValue("id");
				//请求完整主子表信息
				viewModel.fillOrderDetailData(id);
				viewModel.searchLog(true);
				//设置tab显示基本信息
				$(".ui-bill-detail .u-tabs__tab").eq(1).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
				$(".ui-bill-detail .u-tabs__panel").eq(1).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
				// viewModel.goDetailPanel();
				return true;
			},
			//查询子表数据
			fillOrderDetailData: function(id) {
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + '/detail/' + id,
					// data: { id: id },
					success: function(data) {
						//当前data
						viewModel.orderDetail.setSimpleData(data);
						for (var i = 0; i < data.orderGoods.length; i++) {
							if (parseFloat(data.orderGoods[i].buyNum) == "0") {
								data.orderGoods[i].receivablePriceUntil = 0;
							} else {
								data.orderGoods[i].receivablePriceUntil = parseFloat(data.orderGoods[i].receivableFee) / parseFloat(data.orderGoods[i].buyNum);
							}
						}
						viewModel.goodsList.setSimpleData(data.orderGoods, {
							unSelect: true
						});
						viewModel.promList.setSimpleData(data.orderPromotion, {
							unSelect: true
						});
						viewModel.linkList.setSimpleData(data.orderLink, {
							unSelect: true
						});
						//调用订单跟踪请求
						// viewModel.ordertrackDataRequest(id);
						//展示所有产品
						//						viewModel.productAllList.setSimpleData(data.orderProduct, {
						//							unSelect: true
						//						});
						//						viewModel.splitOrderMeta2Data.setSimpleData(data.orderProduct, {
						//							unSelect: true
						//						});
						//						viewModel.splitOrderMeta3Data.setSimpleData(data.orderProduct, {
						//							unSelect: true
						//						});
						//						viewModel.splitOrderMeta4Data.setSimpleData(data.orderProduct, {
						//							unSelect: true
						//						});

						//备注信息处理
						var commentList = data.commentList;
						var commentList1 = [];
						var commentList2 = [];
						var commentList3 = [];
						for (var i = 0; i < commentList.length; i++) {
							if (commentList[i].commentCategory == 0) {
								commentList1.push(commentList[i]);
							} else if (commentList[i].commentCategory == 1) {
								commentList2.push(commentList[i]);
							} else if (commentList[i].commentCategory == 2) {
								commentList3.push(commentList[i]);
							}
						}
						viewModel.commentList1.setSimpleData(commentList1, {
							unSelect: true
						});
						viewModel.commentList2.setSimpleData(commentList2, {
							unSelect: true
						});
						viewModel.commentList3.setSimpleData(commentList3, {
							unSelect: true
						});
					}
				})
			},
			//查询日志
			searchLog: function(reindex) {
				if (reindex) {
					viewModel.logList.pageIndex(0);
				}
				viewModel.logList.removeAllRows();
				var queryData = {};
				queryData.size = viewModel.logList.pageSize();
				queryData.page = viewModel.logList.pageIndex();
				queryData['search_EQ_order.id'] = viewModel.processOrderList.getValue('id');
				$.ajax({
					type: "get",
					url: appCtx + '/b2c/order-logs',
					dataType: "json",
					data: queryData,
					success: function(data) {
						viewModel.logList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.logList.totalRow(data.totalElements);
						viewModel.logList.totalPages(data.totalPages);
					}
				})
			},
			// function() {
			//   //确保grid先将行设置为focus状态
			//   setTimeout(function() {
			//     var curRow = viewModel.processOrderList.getCurrentRow();
			//     var id = curRow.getValue("id");
			//     viewModel.findByParentid(id);
			//     viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
			//     viewModel.goDetailPanel();
			//   }, 0);
			// },
			//查询子表数据
			findByParentid: function(id) {
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + '/detail/' + id,
					// data: { id: id },
					success: function(data) {
						//当前data
						viewModel.orderDetail.setSimpleData(data);
						for (var i = 0; i < data.orderGoods.length; i++) {
							if (parseFloat(data.orderGoods[i].buyNum) == "0") {
								data.orderGoods[i].receivablePriceUntil = 0;
							} else {
								data.orderGoods[i].receivablePriceUntil = parseFloat(data.orderGoods[i].receivableFee) / parseFloat(data.orderGoods[i].buyNum);
							}
						}
						viewModel.goodsList.setSimpleData(data.orderGoods, {
							unSelect: true
						});
						viewModel.promList.setSimpleData(data.orderPromotion, {
							unSelect: true
						});
						viewModel.linkList.setSimpleData(data.orderLink, {
							unSelect: true
						});
						//调用订单跟踪请求
						// viewModel.ordertrackDataRequest(id);
						//						//展示所有产品
						//						viewModel.productAllList.setSimpleData(data.orderProduct, {
						//							unSelect: true
						//						});
						//						viewModel.splitOrderMeta2Data.setSimpleData(data.orderProduct, {
						//							unSelect: true
						//						});
						//						viewModel.splitOrderMeta3Data.setSimpleData(data.orderProduct, {
						//							unSelect: true
						//						});
						//						viewModel.splitOrderMeta4Data.setSimpleData(data.orderProduct, {
						//							unSelect: true
						//						});
						//备注信息处理
						var commentList = data.commentList;
						var commentList1 = [];
						var commentList2 = [];
						var commentList3 = [];
						for (var i = 0; i < commentList.length; i++) {
							if (commentList[i].commentCategory == 0) {
								commentList1.push(commentList[i]);
							} else if (commentList[i].commentCategory == 1) {
								commentList2.push(commentList[i]);
							} else if (commentList[i].commentCategory == 2) {
								commentList3.push(commentList[i]);
							}
						}
						viewModel.commentList1.setSimpleData(commentList1, {
							unSelect: true
						});
						viewModel.commentList2.setSimpleData(commentList2, {
							unSelect: true
						});
						viewModel.commentList3.setSimpleData(commentList3, {
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
			//跳转单据详情页
			showBillDetail: function() {
				$(".ui-list-panel").addClass("animated slideInLeft");
				$(".ui-bill-panel").addClass("animated slideOutDown");
			},
			//新增子表项
			addItem: function() {
				viewModel.complexItems.createEmptyRow();
			},
			//批量新增子表项
			// addItems: function() {
			//
			// },
			//删除子表项
			delItems: function() {
				var selectedRows = viewModel.complexItems.getSelectedRows();
				for (var i = 0; i < selectedRows.length; i++) {
					selectedRows[i].setValue("dr", "1");
				}
				viewModel.complexItems.removeRows(selectedRows);
			},
			//保存单据
			saveBill: function() {
				var result = app.compsValidateMultiParam({
					element: ".ui-bill-panel",
					showMsg: true
				});
				if (!result.passed) {
					return;
				}
				var allRows = viewModel.complexItems.getAllRows();
				if (allRows.length == 0 || allRows.every(function(row) {
						return row.status == u.Row.STATUS.FALSE_DELETE
					})) {
					toastr.error("请录入表体行数据");
					return;
				}
				var complexData = viewModel.processOrderList.getCurrentRow().getSimpleData();
				var complexItemsData = viewModel.complexItems.getSimpleData();
				complexData.proComItems = complexItemsData;
				var _ajaxType = viewModel.processOrderList.getValue("id") ? "put" : "post";
				$._ajax({
					url: appCtx + viewModel.baseurl,
					type: _ajaxType,
					data: JSON.stringify(complexData),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						viewModel.processOrderList.getFocusRow().setSimpleData(data);
						viewModel.retListPanel();
					}
				})
			},
			//重置单据
			resetBill: function() {
				// var curRow = viewModel.processOrderList.getCurrentRow();
				// 新增重置
				// 编辑重置（修改或复制）
			},
			//取消单据
			cancelBill: function() {
				viewModel.complexItems.removeAllRows();
				var curRow = viewModel.processOrderList.getCurrentRow();
				// 修改，则还原
				if (curRow.getValue("id")) {
					curRow.setSimpleData(viewModel.processOrderList.originEditData)
				}
				// 新增或复制，则删除
				else {
					viewModel.processOrderList.removeRow(curRow);
					viewModel.complexItems.removeAllRows();
				}
				viewModel.retListPanel();
			},
			//启用
			enable: function() {
				var selectedRows = viewModel.processOrderList.getSelectedRows();
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
						success: function(res) {
							toastr.success();
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("enableStatus", "1");
							}
						}
					})
				}
			},
			//停用
			disable: function() {
				var selectedRows = viewModel.processOrderList.getSelectedRows();
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
						success: function(res) {
							toastr.success();
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("enableStatus", "0");
							}
						}
					})
				}
			},
			//订单变更保存
			save: function() {
				var data = {};
				var orderDto = viewModel.orderDetail.getSimpleData()[0];
				data.orderDto = orderDto;
				data.orderChangePostData = orderChangePostData;
				$._ajax({
					url: appCtx + viewModel.baseurl + "/submit",
					type: "post",
					data: {
						data: JSON.stringify(data)
					},
					//          	contentType : "application/json; charset=utf-8",
					success: function(data) {
						toastr.success();
						orderChangeDialog.close();
					}
				});
			},
			addUpgradeHightWaitRow: function() {
				var upgradeHightSelectRows = viewModel.upgradeCommodityData.getSelectedRows() || [];
				var upgradeHightWaitHaveRow = viewModel.upgradeHightWaitData.getAllRows();
				if (upgradeHightSelectRows.length > 1 && upgradeHightWaitHaveRow.length >= 1) {
					toastr.warning("待选商品只能是一个!");
					return;
				}
				if (upgradeHightSelectRows.length < 1) {
					toastr.warning("请选择待变更商品!");
					return;
				}
				var row = viewModel.upgradeHightWaitData.createEmptyRow();
				row.setValue("buyNum", "0");
				row.setValue("closeNum", "0");
				row.setValue("receivableFee", "0");
				row.setValue("settlementFee", "0");
				row.setValue("closedFee", "0");

				//计算成交金额
				if (upgradeHightWaitHaveRow.length == "1") {
					var receivableFee = 0;
					for (var i = 0; i < upgradeHightSelectRows.length; i++) {
						receivableFee += parseFloat(upgradeHightSelectRows[i].getValue("changeAmount"))
					}
					var linkCurrentRow = viewModel.upgradeCommodityLinkData.getSelectedRows()[0];
					if (linkCurrentRow) {
						receivableFee += parseFloat(linkCurrentRow.getValue("changeAmount"));
					}
					row.setValue("receivableFee", receivableFee);
				} else {
					row.setValue("receivableFee", 0);
				}

			},
			delUpgradeHightWaitRow: function() {
				var selectRow = viewModel.upgradeHightWaitData.getSelectedRows();
				viewModel.upgradeHightWaitData.removeRows(selectRow);
			},
			//参照选择批量新增子表（销售产品）
			showAddItemsRef: function() {
				viewModel.clearItemsRef();
				$("#addItemsRef .refer").trigger("click");
			},
			//清空已选销售产品参照
			clearItemsRef: function() {
				viewModel.changedLogisticsList.setValue("changedlogisticsref", "");

				var refer = $("#refContainerchangedlogisticsref").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			detail2bill: function() {
				if (!viewModel.canInEdit()) {
					return;
				}
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				common.bill.detail2bill();
			},

			// 退款退货（整单）
			totalRefundFun: function() {
				var selectRows = viewModel.processOrderList.getSelectedRows();
				viewModel.salingRefundWaitGoodsData.removeAllRows();
				viewModel.salingRefundSelectedGoodsData.removeAllRows();
				if (selectRows && selectRows.length == 1) {
					var id = selectRows[0].getValue("id"); //订单主键
					var billStatus = selectRows[0].getValue("billStatus"); //订单状态
					var logisticsMode = selectRows[0].getValue("logisticsMode"); //物流方式
					var orderType = selectRows[0].getValue("orderType"); //订单类型

					// if(!viewModel.valSalingRefundData(billStatus, orderType, logisticsMode)) {
					// 	toastr.warning("单据不符合售中退款条件！");
					// 	return;
					// }

					common.dialog.confirmDialog({
						msg1: '确定需要整单退款？',
						msg2: '此操作不可逆',
						width: '400px',
						type: 'error',
						onOk: function() {
							$._ajax({
								type: "post",
								url: appCtx + '/b2c/orderrefunds/add-by-order-all/',
								data: JSON.stringify({
									id: id
								}),
								contentType: "application/json; charset=utf-8",
								success: function(data) {
									toastr.success();
								}
							})

						}
					});

				} else if (selectRows.length > 1) {
					toastr.warning("只能选择一条数据！");
					return;
				} else {
					toastr.warning("请选择一条数据！");
					return;
				}

			},

			allRefundCancelFun: function() {
				var self = this;
				var selectRows = viewModel.processOrderList.getSelectedRows();
				viewModel.salingRefundWaitGoodsData.removeAllRows();
				viewModel.salingRefundSelectedGoodsData.removeAllRows();

				if (selectRows && selectRows.length == 1) {
					var id = selectRows[0].getValue("id"); //订单主键
					var billStatus = selectRows[0].getValue("billStatus"); //订单状态
					var logisticsMode = selectRows[0].getValue("logisticsMode"); //物流方式
					var orderType = selectRows[0].getValue("orderType"); //订单类型
					var returnGoodsStatus = selectRows[0].getValue("returnGoodsStatus"); //订单类型
					var billStatusInt = parseInt(billStatus);
					if (!isNaN(billStatusInt) && billStatusInt > 3) {
						toastr.warning("订单已审核,不可编辑");
						return;
					}
					if (returnGoodsStatus == '2') {
						toastr.warning("订单已取消退货,不可编辑");
						return;
					}
					var data = {
						id: id,
						isCancel: true
					}

					common.dialog.confirmDialog({
						msg1: '您确定取消退货？',
						msg2: '此操作不可逆',
						width: '400px',
						type: 'error',
						onOk: function() {
							$._ajax({
								type: "post",
								url: appCtx + '/b2c/orderreturn/updatecannelreturn',
								data: JSON.stringify(data),
								contentType: "application/json; charset=utf-8",
								success: function(data) {
									viewModel.processOrderList.getSelectedRows()[0].setSimpleData(data);
									toastr.success();
									viewModel.goodsProductEditReset();
								}
							})
						}
					});
				} else if (selectRows.length > 1) {
					toastr.warning("只能选择一条数据！");
					return;
				} else {
					toastr.warning("请选择一条数据！");
					return;
				}

			},
			/**
			 * 取消退货数量编辑
			 */
			partRefundCancelFun: function() {
				var self = this;
				var selectRows = viewModel.processOrderList.getSelectedRows();
				viewModel.salingRefundWaitGoodsData.removeAllRows();
				viewModel.salingRefundSelectedGoodsData.removeAllRows();

				if (selectRows && selectRows.length == 1) {
					var id = selectRows[0].getValue("id"); //订单主键
					var billStatus = selectRows[0].getValue("billStatus"); //订单状态
					var logisticsMode = selectRows[0].getValue("logisticsMode"); //物流方式
					var orderType = selectRows[0].getValue("orderType"); //订单类型
					// returnGoodsStatus
					var returnGoodsStatus = selectRows[0].getValue("returnGoodsStatus"); //订单类型
					var billStatusInt = parseInt(billStatus);
					if (!isNaN(billStatusInt) && billStatusInt > 3) {
						toastr.warning("订单已审核,不可编辑");
						return;
					}
					if (returnGoodsStatus == '2') {
						toastr.warning("订单已取消退货,不可编辑");
						return;
					}
					$._ajax({
						type: "get",
						url: appCtx + viewModel.baseurl + '/detail/' + id,
						success: function(data) {
							// for (var i = 0; i < data.orderGoods.length; i++) {
							// 	data.orderGoods[i].receivablePriceUntil = (parseFloat(data.orderGoods[i].receivableFee) / parseFloat(data.orderGoods[i].buyNum)).toFixed(2);
							// }
							// viewModel.salingRefundWaitGoodsData.setSimpleData(data.orderGoods, {
							// 	unSelect: true
							// });
							// 选中第一行
							viewModel.salingRefundSelectedGoodsData.setSimpleData(data.orderGoods);
							// viewModel.orderGoods4WarehouseInputDataIndex = 0;
							// viewModel.orderGoods4WarehouseInputDataTmpMap = null;
							// var goodMap = {}; // goodId : good
							// var goodProductMap = {}; //goodId: product[]

							// var goodsLen = data.orderGoods.length;
							// for (var i = 0; i < goodsLen; i++) {
							// 	var good = data.orderGoods[i];
							// 	var goodId = good['id'];
							// 	goodMap[goodId] = good;
							// 	goodProductMap[goodId] = []
							// }
							// viewModel.orderGoods4WarehouseInputDataTmpMap = goodProductMap;
							// viewModel.salingRefundSelectedGoodsData.getAllRows().map(function(row) {
							// buy - close - return - apply =0
							// var buyNum = row.getValue('buyNum');
							// var applyNum = row.getValue('applyNum');
							// var totalPrice = row.getValue('totalPrice');
							// var applyFee = row.getValue('applyFee');
							// row.setValue("saleReturnNum");
							// row.setValue("saleReturnFee");
							// 	return false;
							// });
						}
					})
				} else if (selectRows.length > 1) {
					toastr.warning("只能选择一条数据！");
					return;
				} else {
					toastr.warning("请选择一条数据！");
					return;
				}

				salingRefundGoodsDialog = u.dialog({
					id: 'salingRefundGoodsDialog',
					content: "#dialog_content_salingRefundGoods",
					"width": "80%"
				});
				var okButton = $("#dialog_content_salingRefundGoods .u-msg-ok");
				okButton.unbind("click").click(function() {
					viewModel.salingRefundGoodsOkFun();
					salingRefundGoodsDialog.close();
					viewModel.goodsProductEditReset();
				});
				var cancelButton = $("#dialog_content_salingRefundGoods .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					salingRefundGoodsDialog.close();
					viewModel.goodsProductEditReset();
				});
			},

			goodsProductEditReset: function() {
				viewModel.orderGoods4WarehouseInputDataIndex = -1;
				viewModel.orderGoods4WarehouseInputDataTmpMap = null;
				viewModel.salingRefundSelectedGoodsData.removeAllRows();
			},
			/**
			 * 售中退款（部分退款）确定事件
			 */
			salingRefundGoodsOkFun: function() {
				var id = viewModel.processOrderList.getSelectedRows()[0].getValue("id");
				var orderGoods = viewModel.salingRefundSelectedGoodsData.getSimpleData();
				// // var index = viewModel.orderGoods4WarehouseInputData.getSelectedIndex();
				// var gridRow = viewModel.orderGoods4WarehouseInputData.getRow(viewModel.orderGoods4WarehouseInputDataIndex);
				// var dirty = viewModel.orderGoods4WarehouseInputData.getSimpleData();
				// if (dirty.length > 0) {
				// 	var lastGoodId = gridRow.getValue("orderGoodsId");
				// 	viewModel.orderGoods4WarehouseInputDataTmpMap[lastGoodId] = dirty;
				// }
				// var products = [];
				// for (var key in viewModel.orderGoods4WarehouseInputDataTmpMap) {
				// 	var value = viewModel.orderGoods4WarehouseInputDataTmpMap[key];
				// 	products = products.concat(value);
				// }
				var parr = [];
				for (var i = 0; i < orderGoods.length; i++) {
					var obj = {
						id: orderGoods[i].id,
						saleReturnNum: orderGoods[i].saleReturnNum,
						saleReturnFee: orderGoods[i].saleReturnFee
					};
					parr.push(obj);
				}
				var data = {
					id: id,
					orderReturnUpdateGoodsTransInfoList: parr
					// orderGoods: orderGoods,
					// orderProduct: products,
					// isCancel: false,
				}

				// console.log(products)
				// return;
				$._ajax({
					type: "post",
					url: appCtx + '/b2c/orderreturn/updatecannelreturn',
					data: JSON.stringify(data),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						toastr.success('退货数量编辑成功！')
					}
				})
			},

			/**
			 * 切换商品时触发.当最后收取数据时需要将最后一次 datatable 的数据 flush 到 tmpMap 中.
			 */
			showProductGridDetail: function(obj) {
				var lastIndex = viewModel.orderGoods4WarehouseInputDataIndex;
				if (obj.rowIndex != lastIndex) {
					viewModel.orderGoods4WarehouseInputDataIndex = obj.rowIndex;
				} else {
					return;
				}
				var lastGoodId = viewModel.salingRefundSelectedGoodsData.getRow(obj.rowIndex).getValue("id")
				// 清理之前应该备份到 tmp 中
				var dirty = viewModel.orderGoods4WarehouseInputData.getSimpleData();
				if (dirty.length != 0) {
					viewModel.orderGoods4WarehouseInputDataTmpMap[lastGoodId] = dirty;
				}
				viewModel.orderGoods4WarehouseInputData.removeAllRows();
				var index = viewModel.salingRefundSelectedGoodsData.getSelectedIndex()
				var goodId = viewModel.salingRefundSelectedGoodsData.getRow(index).getValue("id");
				// var products = viewModel.orderGoods4WarehouseInputDataTmpMap[goodId];
				// viewModel.orderGoods4WarehouseInputData.setSimpleData(products);

				// var array = [];
				// rows.map(function(row){
				// 	array.push(row.getValue("id"));
				// });
				// $._ajax({
				// 	url: appCtx + viewModel.baseurl + "/showproductsbygoods",
				// 	type: "post",
				// 	data: {
				// 		ids: array.join(","),
				// 	},
				// 	success: function(data) {
				// 		viewModel.orderGoods4WarehouseInputDataTmpMap = data;	
				// 		var pId = current.getValue("id");
				// 		console.log(data[pid])
				// 		viewModel.orderGoods4WarehouseInputData.setSimpleData(data[pid]);					
				// 	}
				// });
			},

			//导入
			importHandle: function() {
				var urlInfo = '/order-return-excel/excelDataImport'; //倒入地址参数
				var urlStatusInfo = '/order-return-excel/excelLoadingStatus'; //请求进度地址参数
				var ele = $('#importFiel')[0]; //挂载元素
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1);
			},
			//导出
			exportHandle: function() {
				var searchParams = {}; //搜索查询参数
				var templateUrl = '/order-return-excel/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = '/order-return-excel/excelDataExport'; //导出数据地址参数
				var listData = viewModel.processOrderList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportTemplate(listData, ele, searchParams, templateUrl, excelDataUrl);
			},
			//关闭订单
			closeOrder: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					//TODO
					toastr.warning('请选择数据');
					return;
				}
				for (var i = 0; i < selectRowsArr.length; i++) {
					var orderSource = selectRowsArr[i].getValue("orderSource");
					var billStatus = selectRowsArr[i].getValue("billStatus");
					if (orderSource != "2") {
						toastr.warning("只有手动录入的单据才可以被关闭!");
						return;
					} else {
						if (billStatus != "01" && billStatus != "02" && billStatus != "03") {
							toastr.warning("只有暂存、未处理、未审核的单据才可以被关闭！");
							return;
						}
					}
				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				common.dialog.confirmDialog({
					msg1: '您确定要关闭订单？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/close",
							type: "post",
							data: "ids=" + ids.join(","),
							success: function(data) {
								for (var i = 0; i < selectRowsArr.length; i++) {
									selectRowsArr[i].setValue("billStatus", "08");
								}
							}
						});
					}
				});
			},

			addUpgradeHightWaitRow2: function() {
				var upgradeHightSelectRows = viewModel.upgradeGiftData.getSelectedRows() || [];
				var upgradeHightWaitHaveRow = viewModel.upgradeHightWaitData.getAllRows();
				if (upgradeHightSelectRows.length > 1 && upgradeHightWaitHaveRow) {
					toastr.warning("待选商品只能是一个!");
					return;
				}
				if (upgradeHightSelectRows.length < 1) {
					toastr.warning("请选择待变更商品!");
					return;
				}
				var row = viewModel.upgradeHightWaitData.createEmptyRow();
				row.setValue("buyNum", "0");
				row.setValue("closeNum", "0");
				row.setValue("receivableFee", "0");
				row.setValue("settlementFee", "0");
				row.setValue("closedFee", "0");

			},

			delUpgradeHightWaitRow: function() {
				var selectRow = viewModel.upgradeHightWaitData.getSelectedRows();
				viewModel.upgradeHightWaitData.removeRows(selectRow);
			},
			//整单退货待选商品取消被选
			rowUnSelectedFun: function(obj) {
				var skuCode = viewModel.returnGoodsWaitData.getRow(obj.rowIndex).getValue("skuCode");
				viewModel.returnGoodsSelectData.removeRow(viewModel.returnGoodsSelectData.getRowByField("skuCode", skuCode));
			},
			//整单退货待选商品被选
			rowSelectedFun: function(obj) {
				var skuCode = viewModel.returnGoodsWaitData.getRow(obj.rowIndex).getValue("skuCode");
				var selectRowData = viewModel.returnGoodsWaitData.getRow(obj.rowIndex).getSimpleData();
				var alreadyRow = viewModel.returnGoodsSelectData.getRowByField("skuCode", skuCode);
				if (!alreadyRow || alreadyRow.status == "fdel") {
					var newRow = viewModel.returnGoodsSelectData.createEmptyRow();
					newRow.setSimpleData(selectRowData);
					newRow.setValue("saleReturnNum", 1);
					newRow.setValue("saleReturnFee", 0);
				}
			},
			//售中退款待选商品取消被选
			rowUnSelectedFun2: function(obj) {
				var skuCode = viewModel.salingRefundWaitGoodsData.getRow(obj.rowIndex).getValue("skuCode");
				viewModel.salingRefundSelectedGoodsData.removeRow(viewModel.salingRefundSelectedGoodsData.getRowByField("skuCode", skuCode));
			},
			//售中退款待选商品被选
			rowSelectedFun2: function(obj) {
				var skuCode = viewModel.salingRefundWaitGoodsData.getRow(obj.rowIndex).getValue("skuCode");
				var selectRowData = viewModel.salingRefundWaitGoodsData.getRow(obj.rowIndex).getSimpleData();
				var alreadyRow = viewModel.salingRefundSelectedGoodsData.getRowByField("skuCode", skuCode);
				if (!alreadyRow || alreadyRow.status == "fdel") {
					var newRow = viewModel.salingRefundSelectedGoodsData.createEmptyRow();
					newRow.setSimpleData(selectRowData);
					newRow.setValue("saleReturnNum", 1);
					newRow.setValue("saleReturnFee", 0);
				}
			},
			//商品变更selec事件
			rowBeforeSelectedFun: function(obj) {
				var currentRow = viewModel.upgradeCommodityData.getRow(obj.rowIndex);
				var buyNum = currentRow.getValue("buyNum");
				var closeNum = currentRow.getValue("closeNum");
				if (buyNum == closeNum) {
					toastr.warning("该购买数量和关闭数量相等不能选择!");
					return false;
				}
				var selectedWaitRows = viewModel.upgradeCommodityData.getSelectedRows();
				var changeProductAllRows = viewModel.upgradeHightWaitData.getAllRows() || [];
				if (changeProductAllRows.length > 1 && selectedWaitRows.length > 0) {
					toastr.warning("只能选择一个待变更商品!");
					return false;
				} else {
					return true;
				}
			},
			//商品变更selec事件 --补差链接
			rowBeforeSelectedLinkFun: function(obj) {
				var changeProductAllRows = viewModel.upgradeCommodityLinkData.getSelectedRows() || [];
				if (changeProductAllRows.length >= 1) {
					toastr.warning("只能选择一个补差链接!");
					return false;
				} else {
					return true;
				}
			},
			//商品变更selec事件
			rowBeforeSelectedFun2: function(obj) {
				var currentRow = viewModel.upgradeGiftData.getRow(obj.rowIndex);
				var buyNum = currentRow.getValue("buyNum");
				var closeNum = currentRow.getValue("closeNum");
				if (buyNum == closeNum) {
					toastr.warning("该购买数量和关闭数量相等不能选择!");
					return false;
				}
				var selectedWaitRows = viewModel.upgradeGiftData.getSelectedRows();
				var changeProductAllRows = viewModel.upgradeHightWaitData.getAllRows() || [];
				if (changeProductAllRows.length > 1 && selectedWaitRows.length > 0) {
					toastr.warning("只能选择一个待变更商品!");
					return false;
				} else {
					return true;
				}
			},
			changeGiftOkFun: function() {
				//订单变更保存时需要传的参数
				orderChangePostData = {};
				//待变更商品数据
				var waitProduct = [];
				//补差链接
				var sendersLink = [];
				//待选商品
				var waitSelectProduct = [];
				var waitProductAllRows = viewModel.upgradeGiftData.getSelectedRows() || [];
				var waitSelectProductAllRows = viewModel.upgradeHightWaitData.getAllRows() || [];
				if (waitSelectProductAllRows.length == "0") {
					toastr.warning("请增加待选赠品!");
					return;
				}
				if (waitProductAllRows.length == "0") {
					toastr.warning("请选择待变更赠品!");
					return;
				}
				for (var i = 0; i < waitProductAllRows.length; i++) {
					var dataObj = {};
					var changeNum = waitProductAllRows[i].getValue("num");
					if (changeNum == 0) {
						toastr.warning("所选商品本次关联数量不能为0!");
						return;
					}
					dataObj.ogid = waitProductAllRows[i].getValue("id");
					dataObj.changeNum = waitProductAllRows[i].getValue("num");
					waitProduct.push(dataObj);
				}
				for (var i = 0; i < waitSelectProductAllRows.length; i++) {
					var dataObj = {};
					var buyNum = waitSelectProductAllRows[i].getValue("buyNum");
					if (buyNum == 0) {
						toastr.warning("待选商品购买数量不能为0!");
						return;
					}
					dataObj.goodsId = waitSelectProductAllRows[i].getValue("goodsId");
					dataObj.buyNum = waitSelectProductAllRows[i].getValue("buyNum");
					dataObj.receivableFee = waitSelectProductAllRows[i].getValue("receivableFee");
					waitSelectProduct.push(dataObj);
				}
				orderChangePostData.waitProduct = waitProduct;
				orderChangePostData.sendersLink = sendersLink;
				orderChangePostData.waitSelectProduct = waitSelectProduct;
				changeGiftDialog.close();

				//把待选商品增加到 商品变更后信息中
				var upgradeHightWaitData = viewModel.upgradeHightWaitData.getSimpleData();
				viewModel.afterGoodsList.setSimpleData(upgradeHightWaitData);
			},
			//冻结
			freezFun: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning("请选择一条数据");
					return;
				};
				for (var i = 0; i < selectRowsArr.length; i++) {
					var isLock = selectRowsArr[i].getValue("isLock");
					if (isLock == "1") {
						toastr.warning("已冻结的订单不能重复冻结!");
						return;
					}
				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				freezReasonDialog = u.dialog({
					id: 'freezReasonDialog',
					content: "#dialog_content_freezReason",
					"width": "40%"
				});
				var okButton = $("#dialog_content_freezReason .u-msg-ok");
				okButton.unbind("click").click(function() {
					var lockReason = viewModel.processOrderList.getCurrentRow().getValue("lockReason");
					//确定冻结
					$._ajax({
						url: appCtx + viewModel.baseurl + "/freezeOrder",
						type: "post",
						data: {
							ids: JSON.stringify(ids),
							reason: lockReason
						},
						success: function(data) {
							viewModel.processOrderList.getCurrentRow().setValue("lockReason", "");
							if (data.code == "0") {
								toastr.success(data.msg);
							} else {
								toastr.warning(data.msg);
							}

							for (var i = 0; i < data.data.length; i++) {
								var row = viewModel.processOrderList.getRowByField("id", data.data[i])
								row.setValue("lockReason", lockReason);
								row.setValue("isLock", "1");
							}
							freezReasonDialog.close();
						}
					});
				});
				var cancelButton = $("#dialog_content_freezReason .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					viewModel.processOrderList.getCurrentRow().setValue("lockReason", "");
					freezReasonDialog.close();
				});

			},
			//解冻
			unfreezeFun: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning("请选择一条数据");
					return;
				};
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				common.dialog.confirmDialog({
					msg1: '您确定要解冻所选订单吗？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/unfreezeOrder",
							type: "post",
							data: {
								ids: JSON.stringify(ids)
							},
							success: function(data) {
								for (var i = 0; i < selectRowsArr.length; i++) {
									selectRowsArr[i].setValue("isLock", "0");
									selectRowsArr[i].setValue("lockReason", "");
								}
							}
						});
					}
				});
			},

			//延期收货
			delayShipFun: function() {
				var self = this;
				var selectRows = viewModel.processOrderList.getSelectedRows();
				viewModel.delayShipData.removeAllRows();
				var row = viewModel.delayShipData.createEmptyRow();
				viewModel.delayShipData.setRowFocus(row);
				if (selectRows && selectRows.length > 0) {
					for (var i = 0; i < selectRows.length; i++) {
						var id = selectRows[i].getValue("id"); //订单主键
						var pcode = selectRows[i].getValue("pcode"); //平台单号
						var platformBillStatus = selectRows[i].getValue("platformBillStatus"); //平台状态
						var orderType = selectRows[i].getValue("orderType"); //订单类型

						if (!(platformBillStatus == "02" && orderType == "0")) {
							toastr.warning("平台单号[" + pcode + "]不符合延期条件！");
							return;
						}
					}
				} else {
					toastr.warning("请选择数据！");
					return;
				}

				delayShipDialog = u.dialog({
					id: 'delayShipDialog',
					content: "#dialog_content_delayShip",
					"width": "40%"
				});
				var okButton = $("#dialog_content_delayShip .u-msg-ok");
				okButton.unbind("click").click(function() {
					viewModel.delayShipOkOkFun();
				});
				var cancelButton = $("#dialog_content_delayShip .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					delayShipDialog.close();
				});
			},
			delayShipOkOkFun: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				var days = viewModel.delayShipData.getCurrentRow().getValue("days");
				viewModel.delayShipData2.removeAllRows();
				var row = viewModel.delayShipData2.createEmptyRow();
				viewModel.delayShipData2.setRowFocus(row);
				if (days == null) {
					toastr.warning("请选择延期时间！");
					return;
				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				var data = {
					ids: ids.join(","),
					days: days
				}
				$._ajax({
					type: "post",
					url: appCtx + '/b2c/orders/delay/',
					data: data,
					// contentType: "application/json; charset=utf-8",
					success: function(data) {
						if (data.resultCode == '1') { //全部成功
							toastr.success(data.errMessage);
						} else {
							toastr.error(data.errMessage);

							viewModel.delayShipData2.setValue('errIds', data.errIds);
							delayShipDialog2 = u.dialog({
								id: 'delayShipDialog2',
								content: "#dialog_content_delayShip2",
								"width": "40%"
							});
							var okButton = $("#dialog_content_delayShip2 .u-msg-ok");
							okButton.unbind("click").click(function() {
								viewModel.delayShipOkOkFun2(data.errIds);
							});
							var cancelButton = $("#dialog_content_delayShip2 .u-msg-cancel");
							cancelButton.unbind("click").click(function() {
								delayShipDialog2.close();
							});
						}
					}
				})
				delayShipDialog.close();
			},
			returnnumedit: function() {

			},


			//填写物流信息
			assignTransCom: function(data, rowId) {
				if (typeof(data) == 'number') {
					viewModel.processOrderList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.processOrderList.getSelectedRows();
				if (rows.length == 0) {
					toastr.warning("请选择数据");
					return
				} else if (rows.length > 1) {
					toastr.warning("只能选择一行数据");
					return
				}
				// if (rows && rows.length > 0) {
				// 	for (var i = 0; i < rows.length; i++) {
				// 		var bs = rows[i].getValue('billStatus');
				// 		if (bs == '02' || bs == '03' || bs == '04') {
				// 			ids.push(rows[i].getValue("id"));
				// 		} else {
				// 			toastr.error("仅支持未处理、未审核、已审核状态的订单！");
				// 			return
				// 		}

				// 	}
				// }
				viewModel.clearItemsRef();
				var row = viewModel.processOrderList.getCurrentRow();
				// $('#waybillNo').val(row.getValue('waybillNo'));


				var transferDialog = u.dialog({
					id: 'remarkDialog',
					content: "#dialog_content_transferDialog",
					"width": "60%"
				});
				var okButton = $("#dialog_content_transferDialog .u-msg-ok");
				okButton.unbind("click").click(function() {
					// console.log(viewModel.changedLogisticsList.getSimpleData())
					var row = viewModel.processOrderList.getCurrentRow();
					var changedlogisticsref = viewModel.changedLogisticsList.getRow(0).getValue("changedlogisticsref");
					if (null == changedlogisticsref || "" == changedlogisticsref) {
						toastr.warning("物流公司不能为空");
						return;
					}
					var waybillNo = $('#waybillNo').val();
					if (!waybillNo) {
						toastr.warning("快递单号不能为空");
						return;
					}
					// console.log(changedlogisticsref)
					// console.log(waybillNo);
					// return;
					//确定
					$._ajax({
						url: appCtx + viewModel.baseurl + "/addlogistics",
						type: "post",
						data: {
							id: row.getValue("id"),
							logisticsId: changedlogisticsref,
							waybillNo: waybillNo
						},
						success: function(data) {
							row.setValue("logisticsName", data['logisticsName']);
							row.setValue("waybillNo", waybillNo);
							row.setValue("logisticsId", changedlogisticsref);
							row.setValue("logisticsCode", data['logisticsCode']);
							// logisticsId logisticsCode
							toastr.success();
							transferDialog.close();
							$('#waybillNo').val('');
						}
					});
				});
				var cancelButton = $("#dialog_content_transferDialog .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					// viewModel.changedLogisticsList.getRow(0).setValue("comment", "");
					transferDialog.close();
				});

				// $("#changedLogisticsRef .refer").trigger("click");
				// $("#mycc").trigger("click");

			},
			// 分拨
			returnsplitHandler: function(rowIndex, rowId) {
				//清空
				viewModel.cleanSearchComplimentary();
				viewModel.splitOrderData.removeAllRows();

				var orderId, orderStatus, orderLogistics; //订单状态 billStatus;
				var rowData = viewModel.processOrderList.getRowByRowId(rowId);
				var rows = viewModel.processOrderList.getSelectedRows();
				//点击编辑自动勾选
				if (typeof(rowIndex) == 'number') {
					viewModel.processOrderList.setRowSelect(rowIndex);
				}
				if (rowData) { //点击操作添加
					orderId = rowData.getValue("id");
					orderStatus = rowData.getValue("billStatus");
					orderLogistics = rowData.getValue("logisticsMode");
				} else { //复选 添加
					if (rows.length > 1) { //选择一条数据
						toastr.error('不支持选择多条订单分拨');
						return;
					} else if (rows.length > 0) { //选择1条数据
						orderId = rows[0].getValue("id");
						orderStatus = rows[0].getValue("billStatus");
						orderLogistics = rows[0].getValue("logisticsMode");
					} else {
						toastr.error('请选择一条订单分拨');
						return;
					}

				}
				if (orderStatus == '03') {
					/***
					物流方式枚举值修改 ：
					2 快递配送
					3 经销商/三方物流 修改为 服务商配送
					4 供应商直发 
					5 经销商订单
					***/
					if (orderLogistics == '3') { //服务商配送
						popupDialog = u.dialog({
							id: 'complimentary-popup',
							content: "#complimentary-popup",
							"width": "80%"
						});
						var okButton = $("#complimentary-popup .u-msg-ok");
						okButton.unbind("click").click(function() { //保存按钮
							viewModel.addSaveComplimentary(orderId);
						});
						var cancelButton = $("#complimentary-popup .u-msg-cancel");
						cancelButton.unbind("click").click(function() {
							popupDialog.close();

						});
						var id = viewModel.processOrderList.getCurrentRow().getValue("id");
						//请求完整主子表信息
						viewModel.fillOrderDetailData(id);
					} else if (orderLogistics == '5') {
						popupDialog = u.dialog({
							id: 'customersub-popup',
							content: "#customersub-popup",
							"width": "80%"
						});
						var okButton = $("#customersub-popup .u-msg-ok");
						okButton.unbind("click").click(function() { //保存按钮
							viewModel.addSave2Complimentary(orderId); //保存
						});
						var cancelButton = $("#customersub-popup .u-msg-cancel");
						cancelButton.unbind("click").click(function() {
							popupDialog.close();

						});
						var id = viewModel.processOrderList.getCurrentRow().getValue("id");
						//请求完整主子表信息
						viewModel.fillOrderDetailData(id);
					} else if (orderLogistics == '4') {
						popupDialog = u.dialog({
							id: 'supplier-sub-popup',
							content: "#supplier-sub-popup",
							"width": "80%"
						});
						var okButton = $("#supplier-sub-popup .u-msg-ok");
						okButton.unbind("click").click(function() { //保存按钮
							viewModel.addSave2Complimentary(orderId); //保存
						});
						var cancelButton = $("#supplier-sub-popup .u-msg-cancel");
						cancelButton.unbind("click").click(function() {
							popupDialog.close();

						});
						var id = viewModel.processOrderList.getCurrentRow().getValue("id");
						//请求完整主子表信息
						viewModel.fillOrderDetailData(id);
					} else if (orderLogistics == '2') {
						popupDialog = u.dialog({
							id: 'orderproductsub-popup',
							content: "#orderproductsub-popup",
							"width": "80%"
						});
						var okButton = $("#orderproductsub-popup .u-msg-ok");
						okButton.unbind("click").click(function() { //保存按钮
							viewModel.addSave2Complimentary(orderId); //保存
						});
						var cancelButton = $("#orderproductsub-popup .u-msg-cancel");
						cancelButton.unbind("click").click(function() {
							popupDialog.close();

						});
						var id = viewModel.processOrderList.getCurrentRow().getValue("id");
						//请求完整主子表信息
						viewModel.fillOrderDetailData(id);
					}

				} else {
					toastr.error('请选择未审核的订单，该订单不能分拨。');
					return;
				}

			},
			//保存-分拨
			addSave2Complimentary: function(id) {
				//提交后台数据
				var myData = viewModel.goodsList.getSimpleData();
				var processOrderListRow = viewModel.processOrderList.getSelectedRows()[0];
				$._ajax({
					url: appCtx + '/b2c/orders/allotOrder',
					type: 'post',
					data: JSON.stringify(myData),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						popupDialog.close();
						toastr.success('分拨成功');

					}
				});
			},
			addSaveComplimentary: function(id) {
				var orderId = id;
				var officeId, serviceProviderId, ShipToPartyId;
				var queryData = complimentaryPopupSearch.getDataWithOpr();

				officeId = queryData['search_EQ_agency.id'];
				serviceProviderId = queryData['search_EQ_serviceProvider.id'];



				var selecteRowData = viewModel.splitOrderData.getSelectedRows();
				var processOrderListRow = viewModel.processOrderList.getSelectedRows()[0];
				if (selecteRowData.length == 0) {
					toastr.error('请选择一条数据');
					return;
				}
				if (selecteRowData.length > 1) {
					toastr.error('只能选择一条数据');
					return;
				}
				//    officeId = selecteRowData[0].getValue('officeId');
				//    customerId = selecteRowData[0].getValue('customerId');
				ShipToPartyId = selecteRowData[0].getValue('id');
				var AllDatas = viewModel.goodsList.getSimpleData(),
					arr = [];
				for (var d = 0, len = AllDatas.length; d < len; d++) {
					// var m = new Map();
					// m.set(AllDatas[d].id, AllDatas[d].warehouseId);
					// console.log(m.toString());
					arr.push({
						'id': AllDatas[d].id,
						'warehouseId': AllDatas[d].warehouseId
					});
				}
				var myData = {
					'oid': orderId,
					'officeId': officeId,
					'serviceProviderId': serviceProviderId,
					'shiptopartyId': ShipToPartyId,
					'warseHouseMap': arr,
				}
				//提交后台数据
				$._ajax({
					url: appCtx + '/b2c/orders/allotServiceOrder',
					type: 'post',
					// data: myData,
					data: JSON.stringify(myData),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						processOrderListRow.setValue("billStatus", "05")
						popupDialog.close();
						toastr.success('分拨成功');
					}
				});
				//}
				return true;

			},
			//   截单
			interceptbillHandler: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning('请选择数据');
					return;
				}
				if (true) {
					toastr.error('功能尚未实现');
					return;
				}

				for (var i = 0; i < selectRowsArr.length; i++) {
					var isAuditStatus = selectRowsArr[i].getValue("isException");
					var billStatus = selectRowsArr[i].getValue("billStatus");
					var orderType = selectRowsArr[i].getValue("orderType");
					var fiAuditStatus = selectRowsArr[i].getValue("fiAuditStatus");
					var belongOfficeName = selectRowsArr[i].getValue("belongOfficeName");
					var logisticsMode = selectRowsArr[i].getValue("logisticsMode");
					if (!fiAuditStatus || fiAuditStatus == 0) {
						toastr.warning('该订单已经财审，请重新选择!');
						return;
					}
					if (billStatus != "03") {
						toastr.warning('该状态订单不能审核，请重新选择!');
						return;
					}
					if (orderType != "0") {
						toastr.warning('虚拟订单不能审核，请重新选择!');
						return;
					}
					if (!belongOfficeName && logisticsMode == "3") {
						toastr.warning('物流方式为经销商/三方物流，办事处为空不能审核，请重新选择!');
						return;
					}
				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				common.dialog.confirmDialog({
					msg1: '您确定截单通过？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/intercept",
							type: "post",
							data: "ids=" + ids.join(","),
							success: function(data) {
								//							for(var i = 0; i < selectRowsArr.length; i++) {
								//								selectRowsArr[i].setValue("billStatus", "04");
								//							}
								toastr.success();
								viewModel.search();
							}
						});
					}
				});
			},

			// 确认退款
			confirmrefundHandler: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning('请选择数据');
					return;
				}
				for (var i = 0; i < selectRowsArr.length; i++) {
					var isAuditStatus = selectRowsArr[i].getValue("isException");
					var billStatus = selectRowsArr[i].getValue("billStatus");
					var orderType = selectRowsArr[i].getValue("orderType");
					var belongOfficeName = selectRowsArr[i].getValue("belongOfficeName");
					var logisticsMode = selectRowsArr[i].getValue("logisticsMode");
					var paid = selectRowsArr[i].getValue("paid");
					if (paid == 1) {
						toastr.warning('该订单已退款，请重新选择!');
						return;
					}
					// if (billStatus != "03") {
					// 	toastr.warning('该状态订单不能审核，请重新选择!');
					// 	return;
					// }
					if (orderType != "0") {
						toastr.warning('虚拟订单不能审核，请重新选择!');
						return;
					}
					if (!belongOfficeName && logisticsMode == "3") {
						toastr.warning('物流方式为经销商/三方物流，办事处为空不能审核，请重新选择!');
						return;
					}
				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				common.dialog.confirmDialog({
					msg1: '您确定确认退款通过？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/confirmrefund",
							type: "post",
							data: {
								ids: ids
							},
							success: function(data) {
								//							for(var i = 0; i < selectRowsArr.length; i++) {
								//								selectRowsArr[i].setValue("billStatus", "04");
								//							}
								toastr.success();
								viewModel.search();
							}
						});
					}
				});
			},
			// 取消退货
			cancelreturnHandler: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning('请选择数据');
					return;
				}
				for (var i = 0; i < selectRowsArr.length; i++) {
					var isAuditStatus = selectRowsArr[i].getValue("isException");
					var billStatus = selectRowsArr[i].getValue("billStatus");
					var orderType = selectRowsArr[i].getValue("orderType");
					var fiAuditStatus = selectRowsArr[i].getValue("fiAuditStatus");
					var belongOfficeName = selectRowsArr[i].getValue("belongOfficeName");
					var logisticsMode = selectRowsArr[i].getValue("logisticsMode");
					if (fiAuditStatus == 1) {
						toastr.warning('该订单已经财审，请重新选择!');
						return;
					}
					// if (billStatus != "03") {
					// 	toastr.warning('该状态订单不能审核，请重新选择!');
					// 	return;
					// }
					// if (orderType != "0") {
					// 	toastr.warning('虚拟订单不能审核，请重新选择!');
					// 	return;
					// }
					// if (!belongOfficeName && logisticsMode == "1") {
					// 	toastr.warning('物流方式为经销商/三方物流，办事处为空不能审核，请重新选择!');
					// 	return;
					// }
				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				common.dialog.confirmDialog({
					msg1: '您确定取消退货通过？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/cancelreturn",
							type: "post",
							data: "ids=" + ids.join(","),
							success: function(data) {
								//							for(var i = 0; i < selectRowsArr.length; i++) {
								//								selectRowsArr[i].setValue("billStatus", "04");
								//							}
								toastr.success();
								viewModel.search();
							}
						});
					}
				});
			},
			// 退款方式
			returnpath: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning("请选择一条数据");
					return;
				};
				for (var i = 0; i < selectRowsArr.length; i++) {
					var isAuditStatus = selectRowsArr[i].getValue("isException");
					var billStatus = selectRowsArr[i].getValue("billStatus");
					var orderType = selectRowsArr[i].getValue("orderType");
					var belongOfficeName = selectRowsArr[i].getValue("belongOfficeName");
					var logisticsMode = selectRowsArr[i].getValue("logisticsMode");
					var paid = selectRowsArr[i].getValue("paid");
					if (paid == 1) {
						toastr.warning('序号' + (i + 1) + '订单已退款，请重新选择!');
						return;
					}
					if (billStatus != '05') {
						toastr.warning('序号' + (i + 1) + '订单未财审，请重新选择!');
						return;
					}


				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				viewModel.returnpathData.removeAllRows();
				var row = viewModel.returnpathData.createEmptyRow();
				row.setValue("field1", 0);
				viewModel.returnpathData.setRowSelect(0);
				remarkDialog = u.dialog({
					id: 'remarkDialog',
					content: "#dialog_content_returnpathDialog",
					"width": "40%"
				});
				var okButton = $("#dialog_content_returnpathDialog .u-msg-ok");
				okButton.unbind("click").click(function() {
					var returnpathVal = viewModel.returnpathData.getCurrentRow().getValue("field1");
					// console.log("退款方式 value")
					// console.log(returnpathVal);
					// return;
					//确定
					$._ajax({
						url: appCtx + viewModel.baseurl + "/returnpath",
						type: "post",
						data: {
							ids: ids,
							returnpath: returnpathVal
						},
						success: function(data) {
							for (var i = 0; i < selectRowsArr.length; i++) {
								selectRowsArr[i].setSimpleData(data[i])
							}
							toastr.success();
							remarkDialog.close();
						}
					});
				});
				var cancelButton = $("#dialog_content_returnpathDialog .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					viewModel.processOrderList.getCurrentRow().setValue("comment", "");
					remarkDialog.close();
				});

			},
			// 财审
			fiauditHandler: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning('请选择数据');
					return;
				}
				for (var i = 0; i < selectRowsArr.length; i++) {
					var isAuditStatus = selectRowsArr[i].getValue("isException");
					var billStatus = selectRowsArr[i].getValue("billStatus");
					var orderType = selectRowsArr[i].getValue("orderType");
					var fiAuditStatus = selectRowsArr[i].getValue("fiAuditStatus");
					var belongOfficeName = selectRowsArr[i].getValue("belongOfficeName");
					var logisticsMode = selectRowsArr[i].getValue("logisticsMode");
					// console.log(fiAuditStatus);
					if (fiAuditStatus == 1) {
						toastr.warning('该订单已经财审，请重新选择!');
						return;
					}
					if (billStatus != "04") {
						toastr.warning('该状态订单不能财审，请重新选择!');
						return;
					}

				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				common.dialog.confirmDialog({
					msg1: '您确定财审通过？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/fiaudit",
							type: "post",
							data: {
								ids: ids
							},
							success: function(data) {
								for (var i = 0; i < selectRowsArr.length; i++) {
									selectRowsArr[i].setSimpleData(data[i])
								}
								toastr.success();
								// viewModel.search();
							}
						});
					}
				});
			},
			// 财审驳回
			firejectHandler: function() {
				// firejectReasonData
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning('请选择数据');
					return;
				}
				viewModel.firejectReasonData.removeAllRows();
				viewModel.firejectReasonData.createEmptyRow();
				for (var i = 0; i < selectRowsArr.length; i++) {
					var isAuditStatus = selectRowsArr[i].getValue("isException");
					var billStatus = selectRowsArr[i].getValue("billStatus");
					var orderType = selectRowsArr[i].getValue("orderType");
					var fiAuditStatus = selectRowsArr[i].getValue("fiAuditStatus");
					var belongOfficeName = selectRowsArr[i].getValue("belongOfficeName");
					var returnOrderCode = selectRowsArr[i].getValue("returnOrderCode");
					// console.log(fiAuditStatus);
					if (fiAuditStatus == 1) {
						toastr.warning('退货订单[' + returnOrderCode + ']已经财审，请重新选择!');
						return;
					}
					if (billStatus != "04") {
						toastr.warning('退货订单[' + returnOrderCode + ']不是已审核态,不能财审驳回.请重新选择!');
						return;
					}

				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				firejectDialog = u.dialog({
					id: 'firejectDialog',
					content: "#dialog_content_firejectDialog",
					"width": "40%"
				});
				var okButton = $("#dialog_content_firejectDialog .u-msg-ok");
				okButton.unbind("click").click(function() {
					var firejectReason = viewModel.firejectReasonData.getCurrentRow().getValue("firejectReason");
					// console.log(firejectReason);
					// return;
					//确定
					$._ajax({
						url: appCtx + viewModel.baseurl + "/fireject",
						type: "post",
						data: {
							ids: ids,
							firejectReason: firejectReason
						},
						success: function(data) {
							for (var i = 0; i < selectRowsArr.length; i++) {
								selectRowsArr[i].setSimpleData(data[i])
							}
							toastr.success();
							firejectDialog.close();
						}
					});
				});
				var cancelButton = $("#dialog_content_firejectDialog .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					firejectDialog.close();
				});
			},
			//审核
			auditHandle: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning('请选择数据');
					return;
				}
				for (var i = 0; i < selectRowsArr.length; i++) {
					var isAuditStatus = selectRowsArr[i].getValue("isException");
					var billStatus = selectRowsArr[i].getValue("billStatus");
					var orderType = selectRowsArr[i].getValue("orderType");
					var belongOfficeName = selectRowsArr[i].getValue("belongOfficeName");
					var logisticsMode = selectRowsArr[i].getValue("logisticsMode");
					if (billStatus != "03" && billStatus != "10") {
						toastr.warning('该状态订单不能审核，请重新选择!');
						return;
					}
					if (orderType != "0") {
						toastr.warning('虚拟订单不能审核，请重新选择!');
						return;
					}
					if (!belongOfficeName && logisticsMode == "3") {
						toastr.warning('物流方式为服务商配送，办事处为空不能审核，请重新选择!');
						return;
					}
				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				common.dialog.confirmDialog({
					msg1: '您确定审核通过？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/redaudit",
							type: "post",
							data: {
								ids: ids
							},
							success: function(data) {
								for (var i = 0; i < selectRowsArr.length; i++) {
									selectRowsArr[i].setSimpleData(data[i])
								}
								toastr.success();
								// viewModel.search();
							}
						});
					}
				});

			},
			//退货方式
			servicemodel: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				// var serviceModel = viewModel.serviceModeSrc;
				if (selectRowsArr.length < 1) {
					toastr.warning('请选择数据');
					return;
				}
				for (var i = 0; i < selectRowsArr.length; i++) {
					var logisticsMode = selectRowsArr[i].getValue("logisticsMode");
					if (logisticsMode != "3") {
						toastr.warning('物流方式非服务商配送的不允许指定配送方式，请重新选择!');
						return;
					}
				}
				viewModel.dialogcardcomp.cleareidt();
				//显示模态框
				viewModel.dialogcardcomp.show("退货方式", "500px", viewModel.confirmReturnBtn);
			},
			confirmReturnBtn: function() {
				var result = viewModel.dialogcardcomp.validate();
				if (!result.passed) {
					return;
				}
				// var index = viewModel.index;
				// var currentRow, type = "post";
				var postdata = viewModel.dialogcardcomp.geteidtData();
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				var serviceModel = postdata.servicemodel;
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				$._ajax({
					url: appCtx + viewModel.baseurl + "/service-model",
					type: "post",
					data: {
						orderIds: ids,
						serviceModel: serviceModel
					},
					success: function(data) {

					}
				});
			},
			// 放回列表页
			retListPanel: function() {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
				common.bill.retListPanel();
			},
		},
		afterCreate: function() { // 初始化折叠面板
			$.fn.collapsepanel(false, true);
			app = viewModel.app;
			viewModel.salingRefundSelectedGoodsData.on('saleReturnNum.valuechange', function(obj) {
				if (!obj.newValue) {
					return;
				}
				var buyNum = parseInt(obj.rowObj.getValue('buyNum'));
				if (obj.newValue > buyNum) {
					obj.rowObj.setValue('saleReturnNum', buyNum)
				}
			});
			viewModel.salingRefundSelectedGoodsData.on('saleReturnFee.valuechange', function(obj) {
				if (!obj.newValue) {
					return;
				}
				var totalPrice = parseInt(obj.rowObj.getValue('totalPrice'));
				if (obj.newValue > totalPrice) {
					obj.rowObj.setValue('saleReturnFee', totalPrice)
				}
			});
			// 子表参照聚焦行，用于绑定子表参照组件
			var refRow = viewModel.changedLogisticsList.createEmptyRow();
			viewModel.changedLogisticsList.setRowFocus(refRow);
			// 指定物流公司参照，为产品组合子表增行
			// viewModel.changedLogisticsList.on("changedlogisticsref.valuechange", function(obj) {
			// 	// 清空参照时不增行
			// 	if (!obj.newValue) {
			// 		return;
			// 	}

			// 	var ids = [];
			// 	var rows = viewModel.processOrderList.getSelectedRows();
			// 	if (rows.length == 0) {
			// 		toastr.error("请选择数据");
			// 		return
			// 	}
			// 	if (rows && rows.length > 0) {
			// 		for (var i = 0; i < rows.length; i++) {
			// 			ids.push(rows[i].getValue("id"));
			// 		}
			// 	}

			// 	var refer = $("#refContainerchangedlogisticsref").data("uui.refer");
			// 	var refValues = refer.values;
			// 	$._ajax({
			// 		url: appCtx + viewModel.baseurl + '/save-changed_logistics_company',
			// 		type: "post",
			// 		data: {
			// 			orderids: ids.join(','),
			// 			changedLogisticsCompany: refValues[0].id
			// 		},
			// 		// contentType: "application/json; charset=utf-8",
			// 		success: function(data) {
			// 			if (rows && rows.length > 0) {
			// 				for (var i = 0; i < rows.length; i++) {
			// 					rows[i].setValue("changedLogisticsCompany", refValues[0].refname);
			// 				}
			// 			}
			// 			// viewModel.processOrderList.removeRows(rows);
			// 		}
			// 	});
			// });
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
			// console.log(appCtx)
			//平台状态枚举
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.OrderPlatformBillStatus"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.OrderPlatformBillStatusSrc = newarray;
				}
			});
			//订单状态枚举
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.OrderReturnBillStatus"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.orderStatusSrc = newarray;
					for (var i = 0; i < newarray.length; i++) {
						if (newarray[i].value != "09") {
							viewModel.orderStatus4QuerySrc.push(newarray[i]);
						}
					}
				}
			});
			//订单类型枚举
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/orderType-auth-ref/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.OrderTypeEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.orderTypeSrc = newarray;
				}
			});
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
					viewModel.deliveryModeSrc = newarray;
				}
			});
			//订单来源枚举
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.OrderSourceEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.orderSourceSrc = newarray;
				}
			});
			//关联类别枚举
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.LinkTypeEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.linkTypeSrc = newarray;
				}
			});

			//退款状态
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.RefundStatusEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.refundStatusSrc = newarray;
				}
			});
			//退款状态
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.RefundStatusEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.returnFeeStatusSrc = newarray;
				}
			});
			//发货状态
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.ReturnStatusEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.sendStatusSrc = newarray;
				}
			});
			//绑定输入框enter事件
			$('#processOrderList-searchcontent input').off("keydown").on("keydown", function(e) {
				if (e.keyCode == 13) {
					$(this).blur();
					viewModel.search();
				}
			});
		}
	});

	return view;
});