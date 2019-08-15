/**
 * 退货单
 * @author renpp
 */
define(['text!./rejectorder.html', 'ocm_common', 'ocm_baseview', './meta.js', 'editcard', './events.js', './renderType.js', "../../flow/bpmapproveref/bpmopenbill.js", "ajaxfileupload",
	"ossupload",
	"interfaceFileImpl"
], function (tpl, common, baseview, model, editcard, events, rendertype, bpmopenbill) {
	var viewModel, app;
	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
			app = this.app;
			viewModel = _.extend(viewModel, rendertype(viewModel))
			viewModel = _.extend(viewModel, events(viewModel))
			viewModel = _.extend(viewModel, bpmopenbill.model);
			// 列表查询数据(无查询条件)
			// var tempstructrow = viewModel.soProductStrucs.createEmptyRow();
			// viewModel.tempstructData = tempstructrow.getSimpleData();
			// 产品搜索条件初始化
			// viewModel.productSearchParam.createEmptyRow();
			// 列表查询数据(无查询条件)
			// viewModel.search();
			//处理由报表跳转过来的逻辑
			var paramHref = window.location.href;
			var paramobj = common.getParameter(paramHref);
			if (paramobj.orderCode) {
				viewModel.findByorderCode(paramobj.orderCode);
			}
		},
		tpl: tpl,
		model: model,
		baseData: {
			//地址簿
			addresscardcomp: {},
			// 假数据 todo...
			purchaseDatas: model.options.visualData,
			// 地址编辑事件
			addressInfo: common.address.addressInfo,
			baseurl: '/b2b/order',
			applicationUrl: "/b2b/order",
			daichukuurl: "/b2b/home/query-deliveryoutbountPage",
			goodsPrice: "/b2b/goods/find-price-by-goods",
			dialogWidth: "800px",
			salesorderList: {
				templateType: "list",
				cls: "saleorder"
			},
			salesorderCard: {
				templateType: "edit",
				cls: 'saleorder'
			},
			salesorderDetailCard: {
                templateType: "detail",
                cls: "saleorder"
            },
			saleOrderItems: {
                templateType: "card",
                cls: "saleorder_OrderItem"
            },
			batchSaleOrderBomItems: {
				templateType: "card",
                cls: "saleorder_OrderItemBom"
			},
			listRenderTypes: {
				orderCode: "detailRender",
                isClose: "isCloseRender"
			},
			editChildButtons: model.options.buttons.buttonEdit,
            detailChildButtons: model.options.buttons.buttonDetail,
			precisionSettings: {
                totalNum: {
                    type: "numberFloat",
                    precision: 2
                },
                totalDealAmount: {
                    type: "amountFloat",
                },
                totalAmount: {
                    type: "amountFloat",
                },
                offsetAmount: {
                    type: "amountFloat",
                },
                totalGoodsSuppleAmount: {
                    type: "amountFloat",
                },
                promAmount: {
                    type: "amountFloat",
                },
                maxPreferentialMoney: {
                    type: "amountFloat",
                },
                // 单位精度处理表头单位有点问题，先用金额处理
                totalWeight: {
                    type: "amountFloat",
                    precision: 4
                },
                totalNetWeight: {
                    type: "amountFloat",
                    precision: 4
                },
                totalVolume: {
                    type: "amountFloat",
                    precision: 4
                },
                weight: {
                    type: "weightFloat",
                },
                rowWeight: {
                    type: "weightFloat",
                },
                netWeight: {
                    type: "weightFloat",
                },
                rowNetWeight: {
                    type: "weightFloat",
                },
                volume: {
                    type: "volumeFloat",
                },
                rowVolume: {
                    type: "volumeFloat",
                },
                orderNum: {
                    type: "numberFloat"
                },
                mainNum: {
                    type: "numberFloat"
                },
                basePrice: {
                    type: "priceFloat"
                },
                salePrice: {
                    type: "priceFloat"
                },
                dealPrice: {
                    type: "priceFloat"
                },
                supplierPrice: {
                    type: "priceFloat"
                },
                amount: {
                    type: "amountFloat"
                },
                dealAmount: {
                    type: "amountFloat"
                },
                deliveryNum: {
                    type: "numberFloat"
                },
                stockOutNum: {
                    type: "numberFloat"
                },
                stockInNum: {
                    type: "numberFloat"
                },
                returnNum: {
                    type: "numberFloat"
                },
                refundNum: {
                    type: "numberFloat"
                },
                signNum: {
                    type: "numberFloat"
                },
                replenishNum: {
                    type: "numberFloat"
                },
                coordinateNum: {
                    type: "numberFloat"
                },
                totalReturnAmount: {
                    type: "amountFloat"
                },
                goodsNum: {
                    type: "numberFloat"
                },
                baseDiscountPrice: {
                    type: "priceFloat",
                },
                promPrice: {
                    type: "priceFloat"
                },
                promAmount: {
                    type: "amountFloat"
                },
                addStorageAmount: {
                    type: "numberFloat"
                },
                returnGoodsAmount: {
                    type: "numberFloat"
                },
                existingNum: {
                    type: "numberFloat"
                }
            },
			salesrefOrderList: new u.DataTable(model.options.metas.sometaref),
			salesrefOrderItemList: new u.DataTable(
				model.options.metas.orderRefItems
			),
			salesrefOrderBomItemList: new u.DataTable(
				model.options.metas.orderRefBomItems
			),
			// 待关闭订单条目
			closeOrderItems: new u.DataTable(model.options.metas.soitemmeta),
			// 批量操作订单条目列表
			batchSaleOrderItems: new u.DataTable(model.options.metas.soitemmeta),
			currowBomNum: ko.observable(0),
			// 是否bom页签
			isBomPanel: ko.observable(),
			ItemRefList: new u.DataTable(model.options.metas.ItemRef), //选商品参照
			billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//跳转单据详情页
			goDetailPanel: common.bill.goDetailPanel,
			// 账号类型
			accountTypeSrc: ko.observableArray([]),
			soTypeSrc: ko.observableArray([]),
			closeReasonSrc: ko.observableArray([]),
			// 当前系统日期
			curDate: ko.observable(),
			//默认交货推迟日期
			defaultDelayDate: ko.observable(3),
			// 是否免费
			isFree: ko.observable(0),
			// 是否直发
			isDirect: ko.observable(0),
			// 是否原单退货
			isOriginalSingle: ko.observable(0),
			batchopr: ko.observable(),
			batchoprtitle: ko.observable(),
			//订单总数量合计
			ordertotalnumber: ko.observable(0),
			//订单总金额合计
			ordertotalamount: ko.observable(0),
			//订单总重量合计
			ordertotalweight: ko.observable(0),
			//订单行总数量合计
			orderitemtotalnumber: ko.observable(0),
			//订单行总金额合计
			orderitemtotalamount: ko.observable(0),
			//订单行总重量合计
			orderitemtotalweight: ko.observable(0),
			// 未配车总数量合计
			uncareditemtotalnumber: ko.observable(0),
			//未配车总金额合计
			uncareditemtotalamount: ko.observable(0),
			//未配车总重量合计
			uncareditemtotalweight: ko.observable(0),
			// 数量金额精度处理的format 2位
			formater: new u.NumberFormater(2),
			// 重量方量精度处理的format 3位
			formater3: new u.NumberFormater(3),
			// 行号池
			currowNum: ko.observable(0),
			buttonListSource: model.options.buttons.buttonList,
			searchcomp: {},
			searchcomp2: {},
			attachList: [],
			attrList: [],
			searchSource: model.options.searchs.search1,
			search2Source: model.options.searchs.search2,
			//BOM结构信息
			gridRefHOption: model.options.grids.gridRefh,
			gridRefBOption: model.options.grids.gridRefb,
			gridRefBomOption: model.options.grids.gridRefBom,

		    billPanelStatusEdit: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
			
			billstatusCheck: ko.pureComputed(function () {
				var curbillstatus = viewModel.salesorderList.ref("orderStatusCode")();
				if (curbillstatus == billstatus.COMMITTED) {
					return 1;
				}
				if (curbillstatus == billstatus.APPROVED) {
					return 2;
				}
				return 0;
			}),
			CustomerCastflushDetailItem: new u.DataTable(model.options.metas.CustomerCastflushDetail), //费用兑付明细
			orderReceiveAddress: new u.DataTable(model.options.metas.orderReceiveAddress), // 收货地址
			orderInvoice: new u.DataTable(model.options.metas.orderInvoice), // 发票信息
			gridFlushDetail: model.options.grids.gridFlushDetail,
		},
		afterCreate: function () {
			// 初始化折叠面板
			$.fn.collapsepanel(false, true);
			//处理从首页跳转过来的情况,为页面添加全局查询参数
			var url = window.location.href;
			var params = common.getParameter(url);
			var type = params.type;
			//全局查询条件
			viewModel.globalQueryData = undefined;
			//待出库情况特殊需要替换url
			viewModel.golbalIsDaichuku = false;
			//首页跳转地址中带type参数
			if (type) {
				viewModel.globalQueryData = []
				viewModel.globalQueryData.push({
					key: "search_EQ_orderStatus",
					value: "02"
				})
				viewModel.globalQueryData.push({
					key: "search_EQ_isClose",
					value: "0"
				})
				//待审核  待退单
				if (type == "daishenhe") {
					viewModel.globalQueryData.push({
						key: "search_EQ_saleModel",
						value: "01"
					})
				} else if (type == "daituidan") {
					viewModel.globalQueryData.push({
						key: "search_EQ_saleModel",
						value: "02"
					})
				} else if (type = "daichuku") {
					viewModel.golbalIsDaichuku = true;
				}
			}
			//绑定输入框enter事件
			$('#salesorder-searchcontent input').off("keydown").on("keydown", function (e) {
				if (e.keyCode == 13) {
					$(this).blur();
					viewModel.search();
				}
			});
			$("#salesorderTab .u-tabs__tab").click(function (e) {
				viewModel.tabindex = $(this).index();
				viewModel.search(true);
			});
			// 选择上传文件后，直接调用上传方法
			$("#fileiptwrap").on("change", "#attachuploadbatch_id", function () {
				if (this.value) {
					viewModel.uploadAttach();
				}
			});
			// var refRow = viewModel.ItemRefList.createEmptyRow();
			// viewModel.ItemRefList.setRowFocus(refRow)
		}
	});
	return view;
});