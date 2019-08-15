define(['text!./orderList.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function(tpl, common, searchbox) {
	'use strict'
	var app, baseData, events, viewModel, singledocSearch, settleFeeSpecial, exportDialog, importDialog;
	baseData = {
    baseurl: '/stlb2c/order-lists',
    baseGoodsurl: '/stlb2c/order-list-goodss',
		//订单列表主表
		PrimaryGoodsHub: new u.DataTable(PrimaryGoodsMeta),
		//商品字表信息
		ECProductHub: new u.DataTable(ECProductMeta),
		//跳转单据页
		goBillPanel: common.bill.goBillPanel,
		//跳转单据详情页
		goDetailPanel: common.bill.goDetailPanel,
		//返回列表页
		retListPanel: common.bill.retListPanel,

		billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,

		//记录列表当前的位置
		listIndex: null
	};
	events = {
		settleFeeSpecial: function() {
			settleFeeSpecial = viewModel.ECGoodsHub.getValue("settleFeeSpecial");
			return settleFeeSpecial;
		},
		//查询子表数据
		findByParentid: function(id) {
			$._ajax({
				url: appCtx + viewModel.baseGoodsurl + "/findByOrderListId",
				type: 'get',
				async: false,
				data: {
					orderListId: id
				},
				success: function(data) {
					viewModel.ECProductHub.setSimpleData(data, {
						unSelect: true
					});
				}
			})
		},
		//查看详情
		detail: function(obj) {
			if (viewModel.listIndex == obj.rowIndex) {
				return true;
			} else {
				viewModel.listIndex = obj.rowIndex;
			}
			viewModel.PrimaryGoodsHub.setRowSelect(obj.rowIndex);
			var id = obj.rowObj.value.id;
			$(".tab-box-z").show();
			viewModel.ECProductHub.removeAllRows();

			viewModel.findByParentid(id);
			$("#tab-panel-3").show();
			$("#tab-panel-7").show();
			viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
		},
		//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
		search: function(reindex) {
			if (reindex) {
				viewModel.PrimaryGoodsHub.pageIndex(0);
			}
			viewModel.PrimaryGoodsHub.removeAllRows();
			var queryData = singledocSearch.getDataWithOpr();
			queryData.size = viewModel.PrimaryGoodsHub.pageSize();
			queryData.page = viewModel.PrimaryGoodsHub.pageIndex();
			$.ajax({
				type: "get",
				url: appCtx + viewModel.baseurl,
				dataType: "json",
				data: queryData,
				success: function(data) {
					viewModel.PrimaryGoodsHub.setSimpleData(data.content, {
						unSelect: true
					});
					viewModel.PrimaryGoodsHub.totalRow(data.totalElements);
					viewModel.PrimaryGoodsHub.totalPages(data.totalPages);
					//重置listIndex
					viewModel.listIndex = null;

				}
			})
		},
		//清空搜索条件
		cleanSearch: function() {
			singledocSearch.clearSearch();
		},
		//页码改变时的回调函数
		pageChange: function(index) {
			viewModel.PrimaryGoodsHub.pageIndex(index);
			viewModel.search();
		},
		//页码改变时的回调函数
		sizeChange: function(size) {
			viewModel.PrimaryGoodsHub.pageSize(size);
			viewModel.search(true);
		},
		// 点击grid产品参照 触发外部真实产品参照
		showRealProductRef: function() {
			viewModel.clearRealProductRef();
			$("#productRefer .refer").trigger("click");
		},
		// 清除参照之前的选择
		clearRealProductRef: function() {
			viewModel.ProductRef.setValue("productRefer", "");
			var refer = $("#refContainerproductRefer").data("uui.refer");
			refer.uncheckAll();
			refer.setValue([]);
		},
	}
	viewModel = u.extend({}, baseData, events);

	function appInit(element, params) {
		//将模板页渲染到页面上
		element.innerHTML = tpl;
		app = u.createApp({
			el: element,
			model: viewModel
		});
		// 查询组件初始化
		singledocSearch = new searchbox(
			$("#goodslist-searchcontent")[0], [{
					type: "refer",
					key: "platform",
					label: "平台名称",
					refinfo: "b2cplatform"
				},
				{
					type: "refer",
					key: "store",
					label: "店铺名称",
					refinfo: "b2cStoreRef"
				}, 
				{
					type: "text",
					key: "platformNumber",
					label: "平台单号",
				}, 
				{
					type: "text",
					key: "commerceNumber",
					label: "电商单号",
				},
				{
					type: "text",
					key: "orderType",
					label: "订单类型",
				}, 
				{
					type: "text",
					key: "orderStatus",
					label: "订单状态",
				}, 
				{
					type: "text",
					key: "platformStatus",
					label: "平台状态",
				}, 
				{
                    type: "daterange",
                    key: "verifyTime",
					label: "勾兑时间",
				},
				{
					type: "radio",
					key: "diffBillFlag",
					label: "对账标识",
					dataSource: [{
						value: '',
						name: '全部'
					}, {
						value: '1',
						name: '是'
					}, {
						value: '0',
						name: '否'
					}]
				}, {
					type: "radio",
					key: "exceptionFlag",
					label: "异常标识",
					dataSource: [{
						value: '',
						name: '全部'
					}, {
						value: '1',
						name: '是'
					}, {
						value: '0',
						name: '否'
					}]
				}, 
			]);
		// 列表查询数据(无查询条件)
		viewModel.search();
		var productRow = viewModel.ProductRef.createEmptyRow();
		viewModel.ProductRef.setRowFocus(productRow);
	}

	function afterRender() {
		//绑定输入框enter事件
		$('#goodslist-searchcontent input').off("keydown").on("keydown", function(e) {
			if (e.keyCode == 13) {
				$(this).blur();
				viewModel.search();
			}
		});
		viewModel.ECProductHub.on("num.valuechange", function(obj) {
			if (obj.newValue == obj.oldValue) return;
			//计算商品属性里的字段
			setTimeout(function() {
				viewModel.calculateNameFun();
				//计算属性
				viewModel.calculateAttrFun();
			}, 0)
		});

		viewModel.ECGoodsHub.on("code.valuechange", function(obj) {
			obj.rowObj.setValue("code", obj.newValue.replace(/[ ]/g, ""));
		});
	}

	function init(element, params) {
		appInit(element, params);
		afterRender();
		window.vm = viewModel;
	}

	return {
		init: init
	}
});