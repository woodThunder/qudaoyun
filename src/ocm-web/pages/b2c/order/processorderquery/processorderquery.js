define(['text!./processorderquery.html', 'ocm_common', 'ocm_baseview', './meta.js', 'ocm_ordertrack'], function(tpl, common, baseview, model, ordertrack) {
	'use strict'
	var viewModel, appCtx = "/occ-b2c",
		app,
		productDialog, pushpurchaseDialog, productBuyDialog, freightDialog, orderChangePostData, orderChangeDialog, changeProductDialog, popupDialog, changeGiftDialog, remarkDialog, freezReasonDialog, salingRefundGoodsDialog, exchangeGoodsDialog;
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
			baseurl: '/b2c/orders',
			searchurl: '/b2c/orderHandleAndApprove',

			processOrderList: new u.DataTable(model.options.metas.orderMeta),
			orderDetail: new u.DataTable(model.options.metas.orderDetailMeta),
			goodsList: new u.DataTable(model.options.metas.goodsMeta),
			subsidiesList: new u.DataTable(model.options.metas.goodsMeta),
			irList: new u.DataTable(model.options.metas.irMeta),
			promList: new u.DataTable(model.options.metas.promMeta),
			linkList: new u.DataTable(model.options.metas.linkMeta),
			logList: new u.DataTable(model.options.metas.logMeta),



			changeGoodsList: new u.DataTable(model.options.metas.changeGoodsMeta),
			changeGoodsSubList: new u.DataTable(model.options.metas.changeGoodsSubMeta),
			ProductRef: new u.DataTable(model.options.metas.ProductRef),
			//买家留言
			commentList1: new u.DataTable(model.options.metas.remarkMeta),
			//卖家留言
			commentList2: new u.DataTable(model.options.metas.remarkMeta),
			//订单备注
			commentList3: new u.DataTable(model.options.metas.remarkMeta),
			//订单跟踪
			orderTrackData: new u.DataTable(model.options.metas.orderTracMeta),

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
			//变更后商品信息
			afterGoodsList: new u.DataTable(model.options.metas.goodsMeta),
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
			//采购
			pushPurchaseList: new u.DataTable(model.options.metas.pushPurchaseMain),
			pushPurchaseItems: new u.DataTable(model.options.metas.pushPurchaseSub),
			searchcomp: {},
			complimentaryPopupSearch: {},
			dialogcardcomp: {},
			dialogcardcomp1: {},
			searchSource: model.options.searchs.search1,
			searchSplit: model.options.searchs.search2,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button5Source: model.options.buttons.button5,
			button6Source: model.options.buttons.button6,
			button7Source: model.options.buttons.button7,
			details1Source: model.options.details.detail1,
			details2Source: model.options.details.detail2,
			details3Source: model.options.details.detail3,
			details4Source: model.options.details.detail4,
			dialogcardSource: model.options.dialogs.dialog1,
			card1Source: model.options.cards.card1,
			cardPPSource: model.options.cards.ppCards,
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
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
			gridchangemainOption: model.options.grids.gridchangemain,
			gridchangesubOption: model.options.grids.gridchangesub,
			gridPpSubOption: model.options.grids.pushPurchaseItems,
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

			goodsSourceSrc: [],
			//发货预警
			deliveryWarn: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
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
			//预占状态
			preemptedStatusSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
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
					case 0:
						return "否";
					case '1':
					case 1:
						return "是";
					default:
				}
			}),
			synsuccessList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("issynsuccess")();
				switch (enableStatus) {
					case '0':
					case 0:
						return "否";
					case '1':
					case 1:
						return "是";
					default:
				}
			}),
			//拆单发货
			splitDispatchList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("isSplitDispatch")();
				switch (enableStatus) {
					case '0':
					case 0:
						return "否";
					case '1':
					case 1:
						return "是";
					default:
				}
			}),
			//isUrgent加急
			urgentList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("isUrgent")();
				switch (enableStatus) {
					case '0':
					case 0:
						return "否";
					case '1':
					case 1:
						return "是";
					default:
				}
			}),
			//配送方式
			deliveryModeList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("serviceMode")();
				switch (enableStatus) {
					case '0':
						return "物流配送";
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
					case 0:
						return "正常";
					case '1':
					case 1:
						return "异常";
					default:
				}
			}),
			//发货状态
			sendStatusList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("sendStatus")();
				switch (enableStatus) {
					case '0':
					case 0:
						return "未发货";
					case '1':
					case 1:
						return "全部发货";
					case '2':
					case 2:
						return "部分发货";
					default:
						return "未发货";
				}
			}),
			//拆单发货
			isSplitDispatchList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("isSplitDispatch")();
				switch (enableStatus) {
					case '0':
						return "否";
					case '1':
						return "是";
					default:
				}
			}),
			//加急
			isUrgentList: ko.pureComputed(function() {
				var enableStatus = viewModel.orderDetail.ref("isSplitDispatch")();
				switch (enableStatus) {
					case '0':
						return "否";
					case '1':
						return "是";
					default:
				}
			}),
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
			listIndex: null
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
					case "2":
						showName = '系统促销';
						break;
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
			//合并发货
			deleverTogether: function(obj) {
				var showValue = obj.value ? "是" : "否";
				obj.element.innerHTML = showValue;
			},
			deleverTogetherStatus: [],
			//截单标识
			inteCeptSrc: function(obj) {
				switch (obj.value) {
					case '0':
						obj.element.innerHTML = '截单中';
						break;
					case '1':
						obj.element.innerHTML = '截成功';
						break;
					case '2':
						obj.element.innerHTML = '截失败';
						break;
				}
			},
			//冻结标识
			lockRender: function(obj) {
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
				var showValue = obj.value == "1" ? "已预占" : obj.value == "0" ? "未预占" : '';
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
				var orderId = id;
				$._ajax({
					type: "get",
					// data: { id:orderId },
					url: appCtx + '/b2c/order-track-infos/' + orderId,
					success: function(data) {
						viewModel.orderTrackData.setSimpleData(data);
						//订单跟踪物流方式
						var thislogisticsMode = viewModel.orderDetail.getValue('logisticsMode');
						//htmlID orderTrackContent 
						ordertrack.init.run("orderTrackContent", data, thislogisticsMode, viewModel);
					}
				});
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
				var customerId = customerIdData ? customerIdData["refname"] : null;
				if (!customerId) {
					customerId = null;
				}
				if (officeId == null) {
					toastr.error('请选择服务商所属组织!');
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
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function(reindex) {
				if (reindex) {
					viewModel.processOrderList.pageIndex(0);
				}
				viewModel.processOrderList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.processOrderList.pageSize();
				var pageNumber = viewModel.processOrderList.pageIndex();
				queryData['search_EQ_isReturn'] = "0";
				queryData["search_NOTIN_billStatus"] = "01,08,09";
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
						viewModel.promList.removeAllRows();
						viewModel.linkList.removeAllRows();
						viewModel.logList.removeAllRows();
						viewModel.logList.totalRow(0);
						viewModel.logList.totalPages(0);
						//重置listIndex
						viewModel.listIndex = null;
					}
				});
				viewModel.commentList1.removeAllRows();
				viewModel.commentList2.removeAllRows();
				viewModel.commentList3.removeAllRows();
				viewModel.linkList.removeAllRows();
				viewModel.promList.removeAllRows();
				viewModel.goodsList.removeAllRows();
				viewModel.orderDetail.removeAllRows();
				viewModel.logList.removeAllRows();
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
			sizeChangeLog: function(size) {
				viewModel.logList.pageSize(size);
				viewModel.searchLog(true);
			},
			pageChangeLog: function(index) {
				viewModel.logList.pageIndex(index);
				viewModel.searchLog();
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
				viewModel.fillOrderDetailData(id, 'detail');
				viewModel.searchLog(true);
				//设置tab显示基本信息
				$(".ui-bill-detail .u-tabs__tab").eq(1).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
				$(".ui-bill-detail .u-tabs__panel").eq(1).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
				// viewModel.goDetailPanel();
				return true;
			},
			//查询子表数据
			fillOrderDetailData: function(id, who) {
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
						var arr = [],
							orderG = data.orderGoods;

						if (who && who == 'detail') {
							viewModel.goodsList.setSimpleData(orderG, {
								unSelect: true
							});
						} else {
							for (var i = 0, len = orderG.length; i < len; i++) {
								if ((orderG[i].buyNum - orderG[i].closeNum - orderG[i].returnNum) > 0) {
									arr.push(orderG[i]);
								}
							}
							viewModel.goodsList.setSimpleData(arr, {
								unSelect: true
							});
						}
						viewModel.promList.setSimpleData(data.orderPromotion, {
							unSelect: true
						});
						viewModel.linkList.setSimpleData(data.orderLink, {
							unSelect: true
						});
						//调用订单跟踪请求
						viewModel.ordertrackDataRequest(id);
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
						viewModel.ordertrackDataRequest(id);
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
						if (data == "") {
							toastr.success();
							orderChangeDialog.close();
						} else {
							toastr.warning(data);
							orderChangeDialog.close();
						}
					}
				});
			},
			addUpgradeHightWaitRow: function() {
				var upgradeHightSelectRows = viewModel.upgradeCommodityData.getSelectedRows() || [];
				var upgradeHightWaitHaveRow = viewModel.upgradeHightWaitData.getAllRows();
				if (upgradeHightSelectRows.length > 1 && upgradeHightWaitHaveRow.length >= 1) {
					toastr.warning("待选电商商品只能是一个!");
					return;
				}
				if (upgradeHightSelectRows.length < 1) {
					toastr.warning("请选择待变更电商商品!");
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
			//参照选择批量新增子表（销售产品）
			AddProductItemsRef: function() {
				viewModel.clearProductItemsRef();
				var rows = viewModel.changeGoodsList.getSelectedRows();
				if (rows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				$("#addProductItemsRef .refer").trigger("click");
			},
			//清空已选销售产品参照
			clearProductItemsRef: function() {
				viewModel.ProductRef.setValue("productRefer", "");
				var refer = $("#refContainerproductRefer").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			//删行 
			delProductItemsRef: function() {
				var selectRow = viewModel.changeGoodsSubList.getSelectedRows();
				viewModel.changeGoodsSubList.removeRows(selectRow);
			},
			ppAddRow: function() {
				// viewModel.cleappRef();
				var rows = viewModel.pushPurchaseItems.createEmptyRow();
			},
			ppDelRow: function() {
				var selectRow = viewModel.pushPurchaseItems.getSelectedRows();
				viewModel.pushPurchaseItems.removeRows(selectRow);
			},
			detail2bill: function() {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				common.bill.detail2bill();
			},
			//导入
			importHandle: function() {
				var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
				var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
				var ele = $('#importFiel')[0]; //挂载元素
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
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

								// url: appCtx + '/b2c/orderrefunds/add-by-order-all/',
								url: appCtx + '/b2c/orderreturn/order2return',

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

			/**
			 * 退款退货（部分）
			 * 2017-12-11 售中退款售后退货功能合并 去掉判断条件
			 * @author caoyanga
			 */
			partRefundFun: function() {
				var self = this;
				var selectRows = viewModel.processOrderList.getSelectedRows();
				viewModel.salingRefundWaitGoodsData.removeAllRows();
				viewModel.salingRefundSelectedGoodsData.removeAllRows();
				if (selectRows && selectRows.length == 1) {
					var id = selectRows[0].getValue("id"); //订单主键
					var billStatus = selectRows[0].getValue("billStatus"); //订单状态
					var logisticsMode = selectRows[0].getValue("logisticsMode"); //物流方式
					var orderType = selectRows[0].getValue("orderType"); //订单类型

					if (!(logisticsMode == '2' || logisticsMode == '3')) {
						toastr.error('非[快递配送][服务商配送]不可退')
						return
					}

					// if(!viewModel.valSalingRefundData(billStatus, orderType, logisticsMode)) {
					// 	toastr.warning("单据不符合售中退款条件！");
					// 	return;
					// }
					$._ajax({
						type: "get",
						url: appCtx + viewModel.baseurl + '/detail/' + id,
						async: false,
						success: function(data) {
							for (var i = 0; i < data.orderGoods.length; i++) {
								data.orderGoods[i].receivablePriceUntil = (parseFloat(data.orderGoods[i].receivableFee) / parseFloat(data.orderGoods[i].buyNum)).toFixed(2);
							}
							viewModel.salingRefundWaitGoodsData.setSimpleData(data.orderGoods, {
								unSelect: true
							});
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

				});
				var cancelButton = $("#dialog_content_salingRefundGoods .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					salingRefundGoodsDialog.close();
				});
			},
			/**
			 * 售中退款（部分退款）确定事件
			 */
			salingRefundGoodsOkFun: function() {
				var id = viewModel.processOrderList.getSelectedRows()[0].getValue("id");
				var orderGoods = viewModel.salingRefundSelectedGoodsData.getSimpleData();
				if (orderGoods && orderGoods.length == 0) {
					toastr.error('请选择数据')
					return
				}
				var invalid = orderGoods.every(function(g) {
					return g['saleReturnNum'] <= 0 || g['saleReturnFee'] <= 0;
				});
				if (invalid) {
					toastr.error('本次退货数量与本次退货金额需大于零.')
					return
				}
				var data = {
					id: id,
					orderGoods: orderGoods
				}
				$._ajax({
					type: "post",
					url: appCtx + '/b2c/orderreturn/order2return',
					data: JSON.stringify(data),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						salingRefundGoodsDialog.close();
						toastr.success();
					}
				})
			},
			//指定物流公司
			assignTransCom: function(data, rowId) {
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
						var bs = rows[i].getValue('billStatus');
						if (bs == '02' || bs == '03' || bs == '04') {
							ids.push(rows[i].getValue("id"));
						} else {
							toastr.error("仅支持未处理、未审核、已审核状态的订单！");
							return
						}

					}
				}
				viewModel.clearItemsRef();
				$("#changedLogisticsRef .refer").trigger("click");

			},
			//截单
			interceptOrder: function(data, rowId) {
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
						var bs = rows[i].getValue('billStatus');
						if (bs != '07') {
							ids.push(rows[i].getValue("id"));
						}
					}
					if (!ids.length) {
						toastr.warning("请选择订单状态不为已完成的数据！");
						return;
					}
					viewModel.dialogcardcomp.show("截单原因", "500px", viewModel.intercepterReason);
				}
			},
			subsidiesConfirm: function(orderId) {
				var rows = viewModel.processOrderList.getSelectedRows();
				var id = orderId || rows[0].getValue('id'),
					datas = [];
				var postdata = viewModel.subsidiesList.getSimpleData();
				for (var i = 0; i < postdata.length; i++) {
					datas.push({
						orderGoodsId: postdata[i].id,
						sidMny: postdata[i].sidyMny
					})
				}
				$._ajax({
					type: "post",
					url: appCtx + '/b2c/order-goodss/addSidyMny',
					data: {
						orderId: id,
						data: datas,
					},
					success: function(data) {
						viewModel.search();
					}
				});
				popupDialog.close();
			},
			intercepterReason: function() {
				var rows = viewModel.processOrderList.getSelectedRows(),
					ids = [];
				for (var i = 0; i < rows.length; i++) {
					var bs = rows[i].getValue('billStatus');
					if (bs != '07') {
						ids.push(rows[i].getValue("id"));
					}
				}
				var postdata = viewModel.dialogcardcomp.geteidtData();
				$._ajax({
					type: "post",
					url: appCtx + '/b2c/intercept-order/order',
					data: {
						orderIds: ids,
						intercepterReason: postdata,
					},
					success: function(data) {
						viewModel.search();
					}
				});
				viewModel.dialogcardcomp.close();
			},
			//取消合并发货
			cancelDeliveredTogether: function(data, rowId) {
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
						var bs = rows[i].getValue('billStatus');
						if (bs != '07') {
							ids.push(rows[i].getValue("id"));
						}
					}
					if (!ids.length) {
						toastr.warning("请选择订单状态不为已完成的数据！");
						return;
					}
					$._ajax({
						type: "post",
						url: appCtx + '/b2c/orders/cancle-delivered-together',
						data: {
							orderIds: ids
						},
						success: function(data) {
							viewModel.search();
						}
					})
				}
			},
			//订单完成
			orderfinish: function(data, rowId) {
				if (typeof(data) == 'number') {
					viewModel.processOrderList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.processOrderList.getSelectedRows();
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].getValue("id"));
					}
				}
				viewModel.clearItemsRef();
				$._ajax({
					url: appCtx + viewModel.baseurl + "/order-finish",
					type: "post",
					data: {
						orderIds: ids.join(",")
					},
					success: function(data) {
						if (data.success) {

						}
					}
				});

			},
			// 自动审核按钮
			autoCheck: function(data, rowId) {
				if (typeof(data) == 'number') {
					viewModel.processOrderList.setRowSelectbyRowId(rowId);
				}
				var ids = [],
					isChecked = false;
				var rows = viewModel.processOrderList.getSelectedRows();
				if (rows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].getValue('billStatus') == '04') {
							isChecked = true;
						} else {
							ids.push(rows[i].getValue("id"));
						}

					}
				}

				if (ids.length) {
					$._ajax({
						url: appCtx + viewModel.baseurl + "/order-automatic-check",
						type: "post",
						data: {
							orderIds: ids.join(",")
						},
						success: function(data) {
							if (data.success) {

							}
						}
					});
				} else {
					if (isChecked) {
						toastr.warning('已审核状态的订单不必再提交！')
					}
				}
			},
			//导入
			importHandle: function() {
				var urlInfo = '/order-express-excel/excelDataImport'; //倒入地址参数
				var urlStatusInfo = '/order-express-excel/excelLoadingStatus'; //请求进度地址参数
				var ele = $('#importFiel')[0]; //挂载元素
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1);
			},
			//导出
			exportHandle: function() {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = '/order-express-excel/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = '/order-excel/excelDataExport'; //导出数据地址参数
				var listData = viewModel.processOrderList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				var typeArr = [{
					value: false,
					name: "导出数据"
				}]; //导出类型
				common.fileHandle.exportFileType(listData, ele, searchParams, templateUrl, excelDataUrl, typeArr);
			},
			//导出快递单号模板
			exportTemplateHandle: function() {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = '/order-express-excel/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = '/order-excel/excelDataExport'; //导出数据地址参数
				var listData = viewModel.processOrderList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				var typeArr = [{
					value: 0,
					name: "导出新增模板"
				}]; //导出类型
				common.fileHandle.exportFileType(listData, ele, searchParams, templateUrl, excelDataUrl, typeArr);
			},
			//订单分拨-弹窗
			splitOrderPopup: function(rowIndex, rowId) {
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
					url: appCtx + viewModel.baseurl + '/allotOrder',
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
					url: appCtx + viewModel.baseurl + '/allotServiceOrder',
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
			//采购
			pushPurchase: function(rowIndex, rowId) {
				//清空
				viewModel.cleanSearchComplimentary();
				viewModel.pushPurchaseList.removeAllRows();
				viewModel.pushPurchaseItems.removeAllRows();
				var orderId;
				var rows = viewModel.processOrderList.getSelectedRows();
				if (!rows.length) {
					toastr.warning('请选择一条数据！');
					return;
				} else if (rows.length > 1) {
					toastr.warning('只能选择一条数据！');
					return;
				}
				if (rows[0].getValue('logisticsMode') == '4' || rows[0].getValue('logisticsMode') == '5') {
					toastr.warning('只有物流方式为“快递配送”和“服务商配送”的数据才可以采购！')
					return;
				}
				orderId = rows[0].getValue("id");
				pushpurchaseDialog = u.dialog({
					id: 'pushpurchasesub-popup',
					content: "#pushpurchasesub-popup",
					"width": "80%"
				});
				var okButton = $("#pushpurchasesub-popup .u-msg-ok");
				okButton.unbind("click").click(function() { //保存按钮
					viewModel.savePushPurchase(orderId);
				});
				var cancelButton = $("#pushpurchasesub-popup .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					pushpurchaseDialog.close();
				});
				var newMainRow = viewModel.pushPurchaseList.createEmptyRow();
				viewModel.pushPurchaseList.setRowFocus(newMainRow);
				newMainRow.setValue('orderId', orderId);
				//填写子表信息
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + '/detail/' + orderId,
					// data: { id: id },
					success: function(data) {
						//当前data
						viewModel.orderDetail.setSimpleData(data);
						for (var i = 0; i < data.orderGoods.length; i++) {
							// if (!data.orderGoods[i].warehouseId) {
							// 	continue;
							// }
							var newRow = viewModel.pushPurchaseItems.createEmptyRow();
							newRow.setValue('orderGoodsId', data.orderGoods[i].id);
							newRow.setValue('orderGoodsName', data.orderGoods[i].skuName);
							newRow.setValue('serialnum', data.orderGoods[i].serialnum);
							newRow.setValue('warehouseId', data.orderGoods[i].warehouseId);
						}
					}
				});
			},
			// 补贴
			subsidies: function(rowIndex, rowId) {
				var rows = viewModel.processOrderList.getSelectedRows();
				if (rows.length < 1) {
					toastr.warning('请选择一条数据！');
					return;
				} else if (rows.length > 1) {
					toastr.warning('只能选择一条数据！');
					return;
				}
				var orderId = rows[0].getValue("id");
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + '/detail/' + orderId,
					// data: { id: id },
					success: function(data) {
						if (data.orderGoods.length > 0) {
							viewModel.subsidiesList.setSimpleData(data.orderGoods);
							popupDialog = u.dialog({
								id: 'subsidies-popup',
								content: "#subsidies-popup",
								"width": "80%"
							});
							var okButton = $("#subsidies-popup .u-msg-ok");
							okButton.unbind("click").click(function() { //保存按钮
								viewModel.subsidiesConfirm(orderId); //保存
							});
							var cancelButton = $("#subsidies-popup .u-msg-cancel");
							cancelButton.unbind("click").click(function() {
								popupDialog.close();

							});
							// viewModel.dialogcardcomp1.show("补贴金额", "500px", viewModel.subsidiesConfirm);
						}
					}
				});
				// subsidiesList
			},
			savePushPurchase: function(id) {
				var result = app.compsValidateMultiParam({
					element: "#pushpurchasesub-popup",
					showMsg: true
				});
				if (!result.passed) {
					return;
				}
				//提交后台数据
				var curRow = viewModel.pushPurchaseList.getCurrentRow();
				curRow.setValue('orderId', id);
				var myData = viewModel.pushPurchaseList.getCurrentRow().getSimpleData();
				var ppListRow = viewModel.pushPurchaseItems.getSimpleData();
				myData.pushPurchaseItemDtoList = ppListRow;
				$._ajax({
					url: appCtx + viewModel.baseurl + '/push-purchase-order',
					type: 'post',
					data: JSON.stringify(myData),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						pushpurchaseDialog.close();
						toastr.success('采购成功！');

					}
				});
			},
			//商品换购
			productBuyFun: function() {
				var self = this;
				var selectRows = viewModel.processOrderList.getSelectedRows();
				viewModel.changeGoodsList.removeAllRows();
				viewModel.changeGoodsSubList.removeAllRows();
				if (selectRows && selectRows.length == 1) {
					var id = selectRows[0].getValue("id"); //订单主键
					var billStatus = selectRows[0].getValue("billStatus"); //订单状态
					var logisticsMode = selectRows[0].getValue("logisticsMode"); //物流方式
					var orderType = selectRows[0].getValue("orderType"); //订单类型
					if (billStatus != "07" && billStatus != "06") {
						toastr.warning("订单状态必需为已发货或已完成!");
						return;
					}
					$._ajax({
						type: "get",
						url: appCtx + '/b2c/order-goodss/' + id,
						success: function(data) {
							for (var i = 0; i < data.length; i++) {
								data[i].receivablePriceUntil = (parseFloat(data[i].receivableFee) / parseFloat(data[i].buyNum)).toFixed(2);
							}
							viewModel.changeGoodsList.setSimpleData(data, {
								unSelect: true
							});
						}
					})
				} else if (selectRows.length > 1) {
					toastr.warning("只能选择一条数据！");
					return;
				} else {
					toastr.warning("请选择一条数据！");
					return;
				}

				exchangeGoodsDialog = u.dialog({
					id: 'exchangeGoodsDialog',
					content: "#dialog_content_exchangeGoods",
					"width": "80%"
				});
				var okButton = $("#dialog_content_exchangeGoods .u-msg-ok");
				okButton.unbind("click").click(function() {
					viewModel.exchangeGoodsOkFun();
				});
				var cancelButton = $("#dialog_content_exchangeGoods .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					exchangeGoodsDialog.close();
				});
			},
			exchangeGoodsOkFun: function() {
				var id = viewModel.processOrderList.getSelectedRows()[0].getValue("id");
				var mainGoodsList = viewModel.changeGoodsList.getSimpleData();
				var subGoodsList = viewModel.changeGoodsSubList.getSimpleData(),
					mainGoodsSelectRow = viewModel.changeGoodsList.getSelectedRows(),
					moneyAll = 0,
					subMoneyAll = 0,
					mainDatas = [];
				for (var i = 0, len = mainGoodsSelectRow.length; i < len; i++) {
					moneyAll = parseFloat(moneyAll) + parseFloat(mainGoodsSelectRow[i].getValue('exchangeMoney'));
					mainDatas.push(mainGoodsSelectRow[i].getSimpleData());
				}
				for (var j = 0, jlen = subGoodsList.length; j < jlen; j++) {
					// if (subGoodsList[j].skuCodeAll == mainSkugode) {
					var subrowmoney = (parseFloat(subGoodsList[j].receivableFee)).toFixed(2);
					subMoneyAll = parseFloat(subMoneyAll) + parseFloat(subrowmoney);
					// }
				}
				if (parseFloat(moneyAll) !== subMoneyAll) {
					toastr.warning("电商商品必须等价交换!");
					return;
				}
				var data = {
					id: id,
					exchangelist: mainDatas,
					goodslist: subGoodsList
				}
				$._ajax({
					type: "post",
					url: appCtx + '/b2c/exchanges/create/',
					data: JSON.stringify(data),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						exchangeGoodsDialog.close();
						toastr.success();
					}
				})
			},
			okChangeFun: function() {
				var orderId = viewModel.processOrderList.getValue("id");
				var ogid = viewModel.productBuyData.getSelectedRows()[0].getValue("id");
				var num = viewModel.productBuyData.getSelectedRows()[0].getValue("num");
				var goodsId = viewModel.productBuyChangeData.getValue("goodsId") || "";
				var buyNum = viewModel.productBuyChangeData.getValue("buyNum");
				var isTrade = viewModel.productBuyData.getSelectedRows()[0].getValue("isTrade");
				var data;
				if (isTrade == "0") {
					data = {
						orderId: orderId,
						ogid: ogid,
						num: num,
						goodsId: goodsId,
						buyNum: buyNum
					};
				} else {
					data = {
						orderId: orderId,
						ogid: ogid,
						num: num,
						goodsId: null,
						buyNum: null
					};
				}

				if (num == "0") {
					toastr.warning("本次关联数量不能为0!");
					return;
				} else if (buyNum == "0") {
					toastr.warning("购买数量不能为0!");
					return;
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + "/linkTrade",
					type: "post",
					//				dataType: "json", 返回的数据类型
					data: data,
					success: function(data) {
						productBuyDialog.close();
						toastr.success();
					}
				});
			},
			//关联运费
			freightFun: function() {
				var self = this;
				var selectRows = viewModel.processOrderList.getSelectedRows();
				if (selectRows && selectRows.length == 1) {
					var id = selectRows[0].getValue("id");
					var orderType = selectRows[0].getValue("orderType");
					var billStatus = selectRows[0].getValue("billStatus");
					if (billStatus != "03" && billStatus != "04" && billStatus != "05") {
						toastr.warning("该订单状态电商商品不能进行运费关联!");
						return;
					}
					viewModel.freightData.removeAllRows();
					if (orderType != "0") {
						toastr.warning("该订单不能进行运费关联！");
						return;
					}
					$._ajax({
						url: appCtx + viewModel.baseurl + "/freight-order",
						type: "post",
						data: "oid=" + id,
						success: function(data) {
							viewModel.freightData.setSimpleData(data);
						}
					});
				} else if (selectRows.length > 1) {
					toastr.warning("只能选择一条数据！");
					return;
				} else {
					toastr.warning("请选择一条数据！");
					return;
				}
				freightDialog = u.dialog({
					id: 'freightDialog',
					content: "#dialog_content_freight",
					"width": "80%"
				});
				var okButton = $("#dialog_content_freight .u-msg-ok");
				okButton.unbind("click").click(function() {
					viewModel.freightOkFun();
					freightDialog.close();
				});
				var cancelButton = $("#dialog_content_freight .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					freightDialog.close();
				});
			},
			freightOkFun: function() {
				var id = viewModel.processOrderList.getValue("id");
				var selectRowsArr = viewModel.freightData.getSelectedRows();
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				var data = {
					orderId: id,
					oids: ids.join(",")
				};
				$._ajax({
					url: appCtx + viewModel.baseurl + "/linkFreight",
					type: "post",
					data: data,
					success: function(data) {
						toastr.success();
					}
				});
			},
			//订单变更
			orderChangeFun: function() {
				var self = this;
				//订单变更保存时需要传的参数
				orderChangePostData = null;

				var selectRows = viewModel.processOrderList.getSelectedRows();

				viewModel.orderDetail.removeAllRows();
				viewModel.goodsList.removeAllRows();
				viewModel.afterGoodsList.removeAllRows();
				if (selectRows && selectRows.length == 1) {
					var id = selectRows[0].getValue("id");
					var orderType = selectRows[0].getValue("orderType");
					var billStatus = selectRows[0].getValue("billStatus");

					if (orderType != "0") {
						toastr.warning("只有普通商品才可以变更!");
						return;
					}
					if (billStatus == "07" || billStatus == '06' || billStatus == '08' || billStatus == '04' || billStatus == '05' || billStatus == '09') {
						toastr.warning("只有“未审核”，“未处理”和“暂存”状态的订单可以变更!");
						return;
					}
					$._ajax({
						type: "get",
						url: appCtx + viewModel.baseurl + '/detail/' + id,
						success: function(data) {
							//当前data
							viewModel.orderDetail.setSimpleData(data);
							for (var i = 0; i < data.orderGoods.length; i++) {
								data.orderGoods[i].receivablePriceUntil = (parseFloat(data.orderGoods[i].receivableFee) / parseFloat(data.orderGoods[i].buyNum)).toFixed(2);
							}
							viewModel.goodsList.setSimpleData(data.orderGoods);

							var orderReceiverProvince = data.orderReceiverProvince;
							var orderReceiverCity = data.orderReceiverCity;
							var orderReceiverDistrict = data.orderReceiverDistrict;
							$("#city").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"2","EQ_parent.id":"' + orderReceiverProvince + '"}');
							$("#district").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"3","EQ_parent.id":"' + orderReceiverCity + '"}');
							$("#town").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"4","EQ_parent.id":"' + orderReceiverDistrict + '"}');
						}
					})
				} else if (selectRows.length > 1) {
					toastr.warning("只能选择一条数据！");
					return;
				} else {
					toastr.warning("请选择一条数据！");
					return;
				}
				orderChangeDialog = u.dialog({
					id: 'orderChangeDialog',
					content: "#dialog_content_orderChange",
					"width": "90%"
				});
				var okButton = $("#dialog_content_orderChange .u-msg-ok");
				okButton.unbind("click").click(function() {
					//确定变更
					viewModel.save();
				});
				var cancelButton = $("#dialog_content_orderChange .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					orderChangeDialog.close();
				});
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
			//变更商品
			changeProduct: function() {
				var self = this;
				viewModel.upgradeCommodityData.removeAllRows();
				viewModel.upgradeCommodityLinkData.removeAllRows();
				viewModel.upgradeHightWaitData.removeAllRows();
				var goodsListData = viewModel.goodsList.getSimpleData();
				var isContinue = true;
				for (var p = 0; p < goodsListData.length; p++) {
					if (goodsListData[p].isPushDownStreamOrder && goodsListData[p].isPushDownStreamOrder == 1) {
						//已推下游单据
						if (!goodsListData[p].interceptDownStreamOrder || goodsListData[p].interceptDownStreamOrder == '0') {
							toastr.warning('请先截单或确认截单结果！');
							isContinue = false;
							break;
						}
					}

				}
				if (!isContinue) {
					return;
				}
				var oid = viewModel.processOrderList.getValue("id");
				for (var i = 0; i < goodsListData.length; i++) {
					if (goodsListData[i].isGift == "1") {
						goodsListData.remove(i);
						i--;
					} else {
						goodsListData[i].changeNum = 0;
						goodsListData[i].changeAmount = 0;
					}
				}
				viewModel.upgradeCommodityData.setSimpleData(goodsListData, {
					unSelect: true
				});
				//补差链接
				$._ajax({
					url: appCtx + viewModel.baseurl + "/price-pay-order",
					type: "get",
					data: {
						oid: oid
					},
					success: function(data) {
						for (var i = 0; i < data.length; i++) {
							data[i].changeAmount = 0;
						}
						viewModel.upgradeCommodityLinkData.setSimpleData(data, {
							unSelect: true
						});
					}
				});
				changeProductDialog = u.dialog({
					id: 'changeProductDialog',
					content: "#dialog_content_changeProduct",
					"width": "80%"
				});
				var okButton = $("#dialog_content_changeProduct .u-msg-ok");
				okButton.unbind("click").click(function() {
					viewModel.changeProductOkFun();

				});
				var cancelButton = $("#dialog_content_changeProduct .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					changeProductDialog.close();
				});
			},
			//确定变更商品
			changeProductOkFun: function() {
				var self = this;
				var waitProductAllRows = viewModel.upgradeCommodityData.getSelectedRows() || [];
				var sendersLinkCurrentRow = viewModel.upgradeCommodityLinkData.getSelectedRows()[0];
				var waitSelectProductAllRows = viewModel.upgradeHightWaitData.getAllRows() || [];
				if (waitSelectProductAllRows.length == 0) {
					toastr.warning("待选电商商品没选!");
					return;
				}
				//校验金额
				//待变更商品本次关联金额
				var waitProductAllFee = 0;
				//补差链接本次关联金额
				var sendersLinkAllFee = 0;
				//所有待选商品成交金额
				var waitSelectAllFee = 0;
				for (var i = 0; i < waitProductAllRows.length; i++) {
					var waitProductFee = parseInt(waitProductAllRows[i].getValue("changeAmount"));
					var changeNum = waitProductAllRows[i].getValue("changeNum");
					if (changeNum == 0) {
						toastr.warning("所选电商商品本次关联数量不能为0!");
						return;
					}
					waitProductAllFee += waitProductFee;
				}
				if (sendersLinkCurrentRow) {
					sendersLinkAllFee = parseInt(sendersLinkCurrentRow.getValue("changeAmount"));
				}
				for (var i = 0; i < waitSelectProductAllRows.length; i++) {
					var receivableFee = parseInt(waitSelectProductAllRows[i].getValue("receivableFee"));
					var buyNum = waitSelectProductAllRows[i].getValue("buyNum");
					if (buyNum == 0) {
						toastr.warning("待选电商商品购买数量不能为0!");
						return;
					}
					waitSelectAllFee += receivableFee;
				}
				if (waitSelectAllFee == (waitProductAllFee + sendersLinkAllFee)) {
					viewModel.changeProductDataFun();
					//				changeProductDialog.close();
				} else if (waitSelectAllFee > (waitProductAllFee + sendersLinkAllFee)) {
					toastr.warning("变更后的电商商品总金额不能大于变更前，请返回检查修正!");
				} else {
					common.dialog.confirmDialog({
						msg1: '变更后电商商品总金额比变更前要少，继续执行会生成退款单？',
						msg2: '此操作不可逆',
						width: '400px',
						type: 'error',
						onOk: function() {
							viewModel.changeProductDataFun();
						}
					});
				}
			},
			//变更商品 存数据
			changeProductDataFun: function() {
				var waitProductAllRows = viewModel.upgradeCommodityData.getSelectedRows() || [];
				var sendersLinkCurrentRow = viewModel.upgradeCommodityLinkData.getSelectedRows()[0];
				var waitSelectProductAllRows = viewModel.upgradeHightWaitData.getAllRows();
				//订单变更保存时需要传的参数
				orderChangePostData = {};
				//待变更商品数据
				var waitProduct = [];
				//补差链接
				var sendersLink = [];
				//待选商品
				var waitSelectProduct = [];

				for (var i = 0; i < waitProductAllRows.length; i++) {
					var dataObj = {};
					dataObj.ogid = waitProductAllRows[i].getValue("id");
					dataObj.changeNum = waitProductAllRows[i].getValue("changeNum");
					waitProduct.push(dataObj);
				}

				if (sendersLinkCurrentRow) {
					var dataObj1 = {};
					var changeAmount = sendersLinkCurrentRow.getValue("changeAmount");
					if (changeAmount == "0") {
						toastr.warning("所选补差链接的本次关联金额不能为0!");
						return;
					}
					dataObj1.ogid = sendersLinkCurrentRow.getValue("id");
					dataObj1.changeAmount = changeAmount;
					sendersLink.push(dataObj1);
				}
				for (var i = 0; i < waitSelectProductAllRows.length; i++) {
					var dataObj = {};
					dataObj.goodsId = waitSelectProductAllRows[i].getValue("goodsId");
					dataObj.buyNum = waitSelectProductAllRows[i].getValue("buyNum");
					dataObj.receivableFee = waitSelectProductAllRows[i].getValue("receivableFee");
					waitSelectProduct.push(dataObj);
				}
				orderChangePostData.waitProduct = waitProduct;
				orderChangePostData.sendersLink = sendersLink;
				orderChangePostData.waitSelectProduct = waitSelectProduct;
				changeProductDialog.close();

				//把待选商品增加到 商品变更后信息中
				var upgradeHightWaitData = viewModel.upgradeHightWaitData.getSimpleData();
				viewModel.afterGoodsList.setSimpleData(upgradeHightWaitData);
			},
			//变更赠品
			changeGift: function() {
				var self = this;
				viewModel.upgradeGiftData.removeAllRows();
				viewModel.upgradeHightWaitData.removeAllRows();
				var goodsListData = viewModel.goodsList.getSimpleData();
				for (var i = 0; i < goodsListData.length; i++) {
					if (goodsListData[i].isGift == "0" || !goodsListData[i].isGift) {
						goodsListData.remove(i);
						i--;
					} else {
						goodsListData[i].num = 0;
						goodsListData[i].amount = 0;
						goodsListData[i].changeAmount = 0;
					}
				}
				viewModel.upgradeGiftData.setSimpleData(goodsListData, {
					unSelect: true
				});
				changeGiftDialog = u.dialog({
					id: 'changeProductDialog',
					content: "#dialog_content_changeGift",
					"width": "80%"
				});
				var okButton = $("#dialog_content_changeGift .u-msg-ok");
				okButton.unbind("click").click(function() {
					viewModel.changeGiftOkFun();

				});
				var cancelButton = $("#dialog_content_changeGift .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					changeGiftDialog.close();
				});
			},
			addUpgradeHightWaitRow2: function() {
				var upgradeHightSelectRows = viewModel.upgradeGiftData.getSelectedRows() || [];
				var upgradeHightWaitHaveRow = viewModel.upgradeHightWaitData.getAllRows();
				if (upgradeHightSelectRows.length > 1 && upgradeHightWaitHaveRow) {
					toastr.warning("待选电商商品只能是一个!");
					return;
				}
				if (upgradeHightSelectRows.length < 1) {
					toastr.warning("请选择待变更电商商品!");
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
			//售中换货待选商品取消被选
			rowUnSelectedFun3: function(obj) {
				// var goodsId = viewModel.changeGoodsList.getRow(obj.rowIndex).getValue("skuCode");
				// var allRows = viewModel.changeGoodsSubList.getAllRows() || [],
				// 	removeRows = [];
				// for (var i = 0, len = allRows.length; i < len; i++) {
				// 	if (allRows[i] && allRows[i].getValue("skuCodeAll") == goodsId) {
				// 		removeRows.push(allRows[i]);
				// 	}
				// }
				// viewModel.changeGoodsSubList.removeRows(removeRows);
			},
			//售中换货待选商品被选
			rowSelectedFun3: function(obj) {
				// var goodsId = viewModel.changeGoodsList.getRow(obj.rowIndex).getValue("skuCode");
				// var selectRowData = viewModel.changeGoodsList.getRow(obj.rowIndex).getSimpleData();
				// var alreadyRow = viewModel.changeGoodsSubList.getRowByField("skuCode", goodsId);
				// if (!alreadyRow || alreadyRow.status == "fdel") { //复制选择的主表信息
				// 	var newRow = viewModel.changeGoodsSubList.createEmptyRow();
				// 	newRow.setSimpleData(selectRowData);
				// 	newRow.setValue("buyNum", 1);
				// 	newRow.setValue("exchangeMoney", 0);
				// 	newRow.setValue("receivableFee", 0);
				// }
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
				if (currentRow.getValue('isPushDownStreamOrder') == 1 || currentRow.getValue('isPushDownStreamOrder') == '1') {
					toastr.warning("已推下游单据的商品不允许变更!");
					return false;
				}
				var selectedWaitRows = viewModel.upgradeCommodityData.getSelectedRows();
				var changeProductAllRows = viewModel.upgradeHightWaitData.getAllRows() || [];
				if (changeProductAllRows.length > 1 && selectedWaitRows.length > 0) {
					toastr.warning("只能选择一个待变更电商商品!");
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
					toastr.warning("只能选择一个待变更电商商品!");
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
						toastr.warning("所选电商商品本次关联数量不能为0!");
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
						toastr.warning("待选电商商品购买数量不能为0!");
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
				for (var u = 0; u < upgradeHightWaitData.length; u++) {
					upgradeHightWaitData[u].isGift = 1;
				}
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
			// 备注
			remarkOrder: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning("请选择一条数据");
					return;
				};

				remarkDialog = u.dialog({
					id: 'remarkDialog',
					content: "#dialog_content_remarkDialog",
					"width": "40%"
				});
				var okButton = $("#dialog_content_remarkDialog .u-msg-ok");
				okButton.unbind("click").click(function() {
					var comment = viewModel.processOrderList.getCurrentRow().getValue("comment").replace(/(^\s*)|(\s*$)/g, "");
					if (null == comment || "" == comment) {
						toastr.warning("备注不能为空");
						return;
					}
					//确定
					$._ajax({
						url: appCtx + viewModel.baseurl + "/commentOrder",
						type: "post",
						data: {
							id: selectRowsArr[0].getValue("id"),
							comment: comment
						},
						success: function(data) {
							viewModel.processOrderList.getCurrentRow().setValue("comment", "");
							toastr.success();
							remarkDialog.close();
						}
					});
				});
				var cancelButton = $("#dialog_content_remarkDialog .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					viewModel.processOrderList.getCurrentRow().setValue("comment", "");
					remarkDialog.close();
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
					if (billStatus != "03") {
						toastr.warning('该状态订单不能审核，请重新选择!');
						return;
					}
					if (orderType != "0") {
						toastr.warning('虚拟订单不能审核，请重新选择!');
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
							url: appCtx + viewModel.baseurl + "/audit",
							type: "post",
							data: "ids=" + ids.join(","),
							success: function(data) {
								//							for(var i = 0; i < selectRowsArr.length; i++) {
								//								selectRowsArr[i].setValue("billStatus", "04");
								//							}
								toastr.success(data);
								viewModel.search();
							}
						});
					}
				});

			},
			//反审核
			antiAuditFun: function() {
				var selectRowsArr = viewModel.processOrderList.getSelectedRows();
				if (selectRowsArr.length < 1) {
					toastr.warning('请选择数据');
					return;
				}
				for (var i = 0; i < selectRowsArr.length; i++) {
					var billStatus = selectRowsArr[i].getValue("billStatus");
					var orderType = selectRowsArr[i].getValue("orderType");
					if (billStatus != "04" && billStatus != "05") {
						toastr.warning('该状态订单不能反审核，请重新选择!');
						return;
					}
					if (orderType != "0") {
						toastr.warning('虚拟订单不能反审核，请重新选择!');
						return;
					}
				}
				var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
				common.dialog.confirmDialog({
					msg1: '您确定反审核？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/anti-audit",
							type: "post",
							data: "orderIds[]=" + ids,
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
			// 放回列表页
			retListPanel: function() {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
				common.bill.retListPanel();
			},
		},
		afterCreate: function() {
			app = viewModel.app;
			// 初始化折叠面板
			$.fn.collapsepanel(false, true);
			//赠品
			viewModel.upgradeGiftData.on('num.valuechange', function(obj) {
				if (!obj.newValue) {
					return;
				}
				var row = viewModel.upgradeGiftData.getRowByRowId(obj.rowId),
					buyNum = row.getValue('buyNum');
				if (obj.newValue > parseInt(buyNum)) {
					row.setValue('num', buyNum)
					toastr.warning('本次关联数量不能大于购买数量！')
					return;
				}
			})
			viewModel.orderDetail.on("orderReceiverProvince.valuechange", function(obj) {
				var row = viewModel.orderDetail.getCurrentRow();
				var provinceId = row.getValue("orderReceiverProvince");
				$("#city").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"2","EQ_parent.id":"' + provinceId + '"}');
				$("#city input").val('');
				$("#district input").val('');
				$("#town input").val('');
			});

			//省市联动 
			viewModel.orderDetail.on("orderReceiverCity.valuechange", function(obj) {
				var row = viewModel.orderDetail.getCurrentRow();
				var cityId = row.getValue("orderReceiverCity");
				$("#district").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"3","EQ_parent.id":"' + cityId + '"}');
				$("#district input").val('');
				$("#town input").val('');
			});
			//市区联动
			viewModel.orderDetail.on("orderReceiverDistrict.valuechange", function(obj) {
				var row = viewModel.orderDetail.getCurrentRow();
				var districtId = row.getValue("orderReceiverDistrict");
				$("#town").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"4","EQ_parent.id":"' + districtId + '"}');
				$("#town input").val('');
			});
			//区镇联动
			viewModel.orderDetail.on("orderReceiverTown.valuechange", function(obj) {

			});
			//待变更电商商品
			viewModel.upgradeCommodityData.on('changeNum.valuechange', function(obj) {
				if (!obj.newValue) return;
				var row = viewModel.upgradeCommodityData.getRowByRowId(obj.rowId)
				if (obj.newValue > row.getValue('buyNum')) {
					row.setValue('changeNum', 0)
					toastr.warning('本次关联数量不能大于购买数量！')
					return;
				}
				var closeNum = row.getValue('closeNum'),
					closedFee = row.getValue('closedFee'),
					buyNum = row.getValue('buyNum'),
					receivableFee = row.getValue('receivableFee');
				var price = ((parseFloat(receivableFee) - parseFloat(closedFee)) / (parseFloat(buyNum) - parseFloat(closeNum))).toFixed(2);
				row.setValue('changeAmount', price * obj.newValue);
			});
			//待选电商商品
			viewModel.upgradeHightWaitData.on('goodsId.valuechange', function(obj) {
				if (!obj.newValue) return;
				var refValues = $("#refContainergoodsId").data("uui.refer").values;
				viewModel.upgradeHightWaitData.setValue('logisticsMode', refValues[0].logisticsModeCode);

			});
			viewModel.upgradeHightWaitData.on('receivableFee.valuechange', function(obj) {
				if (!obj.newValue) return;
				var row = viewModel.upgradeHightWaitData.getRowByRowId(obj.rowId);
				var price = parseFloat(row.getValue('receivableFee')) / parseFloat(row.getValue('buyNum'));
				var products = viewModel.upgradeCommodityData.getSelectedRows(),
					changeProducts = viewModel.upgradeHightWaitData.getSimpleData(),
					addMineProducts = viewModel.upgradeCommodityLinkData.getSelectedRows(),
					totalPrice = 0,
					minePrice = 0,
					ctotalPrice = 0;
				for (var i = 0, len = products.length; i < len; i++) {
					totalPrice += parseFloat(products[i].getValue('changeAmount'));
				}
				for (var k = 0, len = addMineProducts.length; k < len; k++) {
					minePrice += parseFloat(addMineProducts[k].getValue('changeAmount'));
				}
				for (var j = 0, cLen = changeProducts.length; j < cLen; j++) {
					ctotalPrice += parseFloat(changeProducts[j].receivableFee);
				}
				var plusM = totalPrice + minePrice;
				if (ctotalPrice > plusM) {
					row.setValue('receivableFee', plusM);
					toastr.warning('待选电商商品总成交金额必须小于等于待变更电商商品中的总本次关联金额！')
				}
			});
			// 子表参照聚焦行，用于绑定子表参照组件
			var refRow = viewModel.ProductRef.createEmptyRow();
			viewModel.ProductRef.setRowFocus(refRow);
			viewModel.ProductRef.on("productRefer.valuechange", function(obj) {
				if (!obj.newValue) {
					return;
				}
				var refValues = $("#refContainerproductRefer").data("uui.refer").values;
				// var mainRow = viewModel.changeGoodsList.getSelectedRows();
				var mainRow = viewModel.changeGoodsList.getCurrentRow();
				if (!mainRow) {
					return;
				}
				var mainSkuCode = mainRow.getValue('skuCode');
				var selecRows = [];

				if (refValues && refValues.length > 0) {
					var newRows = [];
					for (var i = 0; i < refValues.length; i++) {
						var newRow = undefined;
						newRow = new u.Row({
							parent: viewModel.changeGoodsSubList
						});
						//判断是否存在row
						var row = viewModel.changeGoodsSubList.getRowByField("skuCode", refValues[i].refcode);
						if (!row) {
							newRows.push(newRow);
							selecRows.push(newRow);
						}
						// newRow.setValue("skuCodeAll", mainSkuCode);
						newRow.setValue("skuName", refValues[i].refname);
						newRow.setValue("skuCode", refValues[i].refcode);
						newRow.setValue('buyNum', 1); //购买数量
						newRow.setValue('receivableFee', 0); //结算金额
						newRow.setValue("id", refValues[i].id);
					}
					viewModel.changeGoodsSubList.insertRows(0, newRows);
				}

			});
			viewModel.changeGoodsSubList.on("receivableFee.valuechange", function(obj) {
				if (!obj.newValue) {
					return;
				}
				var curRow = viewModel.changeGoodsSubList.getCurrentRow(),
					// skuCodeAll = curRow.getValue('skuCodeAll'),
					subAllRows = viewModel.changeGoodsSubList.getAllRows(),
					// mainRow = viewModel.changeGoodsList.getRowByField("skuCode", skuCodeAll),
					mainRows = viewModel.changeGoodsList.getSelectedRows(),
					// exchangeMoney = parseFloat(mainRow.getValue('exchangeMoney')),
					exchangeMoneys = 0,
					plusMoney = 0;
				for (var p = 0, pLen = mainRows.length; p < pLen; p++) {
					exchangeMoneys = parseFloat(exchangeMoneys) + parseFloat(mainRows[p].getValue('exchangeMoney'));
				}
				if (!exchangeMoneys || !parseFloat(exchangeMoneys)) {
					if (parseFloat(curRow.getValue('receivableFee')) > 0) {
						toastr.warning('请先设置换货数量!');
					}
					curRow.setValue('receivableFee', '0');
					return;
				}
				for (var i = 0, len = subAllRows.length; i < len; i++) {
					// if (subAllRows[i].getValue('skuCodeAll') == skuCodeAll) {
					var money = subAllRows[i].getValue('receivableFee'),
						tMoney = (parseFloat(money)).toFixed(2);
					plusMoney = parseFloat(plusMoney) + parseFloat(tMoney);
					// }
				}
				if (plusMoney > exchangeMoneys) {
					toastr.warning('新货价格不能大于退货价格，请重新输入!');
					curRow.setValue('receivableFee', '0');
				}
			});
			// 子表参照聚焦行，用于绑定子表参照组件
			var refRow = viewModel.changedLogisticsList.createEmptyRow();
			viewModel.changedLogisticsList.setRowFocus(refRow);
			viewModel.changeGoodsList.on("exchangeNum.valuechange", function(obj) {
				if (!obj.newValue) {
					return;
				}
				var row = viewModel.changeGoodsList.getCurrentRow(),
					buyNum = parseFloat(row.getValue('buyNum')),
					newValue = parseFloat(obj.newValue);
				if (newValue > buyNum) {
					toastr.warning("换货数量必需小于等于购买数量!");
					row.setValue('exchangeNum', '0');
					row.setValue('exchangeMoney', '0');
					return;
				}

				var row = viewModel.changeGoodsList.getCurrentRow();
				var exchangeMoney = parseFloat(row.getValue('receivablePriceUntil')) * newValue;
				row.setValue('exchangeMoney', exchangeMoney);

			});
			// 指定物流公司参照，为产品组合子表增行
			viewModel.changedLogisticsList.on("changedlogisticsref.valuechange", function(obj) {
				// 清空参照时不增行
				if (!obj.newValue) {
					return;
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

				var refer = $("#refContainerchangedlogisticsref").data("uui.refer");
				var refValues = refer.values;
				$._ajax({
					url: appCtx + viewModel.baseurl + '/save-changed_logistics_company',
					type: "post",
					data: {
						orderids: ids.join(','),
						changedLogisticsCompany: refValues[0].id
					},
					// contentType: "application/json; charset=utf-8",
					success: function(data) {
						if (rows && rows.length > 0) {
							for (var i = 0; i < rows.length; i++) {
								rows[i].setValue("changedLogisticsCompany", refValues[0].refname);
							}
						}
						// viewModel.processOrderList.removeRows(rows);
					}
				});
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
					enumClassName: "com.yonyou.ocm.b2c.enums.OrderBillStatus"
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
			//商品来源
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.GoodsSourceEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.goodsSourceSrc = newarray;
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
					enumClassName: "com.yonyou.ocm.b2c.enums.SendStatusEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.sendStatusSrc = newarray;
				}
			});
			//发货状态
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.DeliveredTogetherStatus"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.deleverTogetherStatus = newarray;
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