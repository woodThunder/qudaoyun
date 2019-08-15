/**
 * 销售订单
 * @author yushf
 */
define([
    "text!./salesorder.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "./events.js",
    "./renderType.js",
    "/ocm-web/pages/purchase/purchaseorder/meta.js",
    "./purchaseEvent.js",
    "./purchaseAfterCreate.js",
    "../../flow/bpmapproveref/bpmopenbill.js",
    "./feeEvents.js",
    "./promEvents.js",
    "interfaceFileImpl",
    "ajaxfileupload",
    "ossupload"
], function (
    tpl,
    common,
    baseview,
    model,
    events,
    rendertype,
    purchaseModel,
    purchaseEvent,
    purchaseAfterCreate,
    bpmopenbill,
    feeEvent,
    promEvent
) {
    var viewModel, app;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
            app = this.app;
            viewModel = _.extend(viewModel, rendertype(viewModel));
            viewModel = _.extend(viewModel, events(viewModel));
            viewModel = _.extend(
                viewModel,
                purchaseEvent(viewModel, purchaseModel, CONST)
            );
            viewModel = _.extend(viewModel, feeEvent(viewModel, purchaseModel, CONST));
            viewModel = _.extend(viewModel, promEvent(viewModel));
            viewModel = _.extend(viewModel, bpmopenbill.model);
            // viewModel = u.extend({},baseData,events,rendertype,bpmopenbill.model)

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
            viewModel.flushSelected = [];
        },
        tpl: tpl,
        model: model,
        // rendertype: rendertype(view),
        baseData: {
            //地址簿
            addresscardcomp: {},
            // 假数据 todo...
            purchaseDatas: model.options.visualData,
            // 地址编辑事件
            addressInfo: common.address.addressInfo,
            baseurl: "/b2b/order",
            applicationUrl: "/b2b/order",
            daichukuurl: "/b2b/home/query-deliveryoutbountPage",
            dialogWidth: "800px",
            salesorderList: {
                templateType: "list",
                cls: "saleorder"
            },
            salesorderCard: {
                templateType: "edit",
                cls: "saleorder"
            },
            // salesorderDetailCard: new u.DataTable(model.options.metas.someta), //详情
            salesorderDetailCard: {
                templateType: "detail",
                cls: "saleorder"
            },
            // saleOrderItems: new u.DataTable(model.options.metas.soitemmeta), //
            saleOrderItems: {
                templateType: "card",
                cls: "saleorder_OrderItem"
            }, //订单行

            saleOrderItemsProms: {
                templateType: "card",
                cls: "saleorder_OrderPromRel"
            }, //订单行
            batchSaleOrderBomItems: {
                templateType: "card",
                cls: "saleorder_OrderItemBom"
            },
            // salesorderList: new u.DataTable(model.options.metas.soitemmeta), //列表
            // salesorderCard: new u.DataTable(model.options.metas.someta), //编辑
            // salesorderDetailCard: new u.DataTable(model.options.metas.someta), //详情
            // saleOrderItems: new u.DataTable(model.options.metas.soitemmeta), //订单行
            // 待关闭订单条目
            closeOrderItems: new u.DataTable(model.options.metas.soitemmeta),
            // 批量操作订单条目列表
            batchSaleOrderItems: new u.DataTable(model.options.metas.soitemmeta),
            // bom 结构
            // batchSaleOrderBomItems: new u.DataTable(model.options.metas.BomItem),
            saveCheckCreditDetailItems: new u.DataTable(
                model.options.metas.saveCheckCreditMeta
            ),
            saveCheckAccountDetailItems: new u.DataTable(
                model.options.metas.saveCheckAccountMeta
            ),
            saveFilledTrayDetailItems: new u.DataTable(
                model.options.metas.saveFilledTrayMeta
            ),
            saveFilledCarDetailItems: new u.DataTable(
                model.options.metas.saveFilledCarMeta
            ),
            promOrderItems: new u.DataTable(model.options.metas.soitemmeta),
            promGiftOrderItems: new u.DataTable(model.options.metas.soitemmeta),

            currowBomNum: ko.observable(0),
            // 是否bom页签
            isBomPanel: ko.observable(),

            ItemRefList: new u.DataTable(model.options.metas.ItemRef), //选商品参照
            wichAddButton: "normal",
            // 产品搜索参数
            // productSearchParam: new u.DataTable(model.options.metas.productSearchParammeta),
            // 搜索出的销售产品列表
            // specialproductList: new u.DataTable(model.options.metas.specialproductmeta),
            // 已选择销售产品列表
            // selectedproductList: new u.DataTable(model.options.metas.specialproductmeta),

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
            //订单行总净重量合计
            orderitemtotalnetweight: ko.observable(0),
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
            // 单价精度处理，默认2位
            priceFormater: new u.NumberFormater(2),
            // 金额精度处理，默认2位
            amountFormater: new u.NumberFormater(2),
            // 行号池
            currowNum: ko.observable(0),

            buttonListSource: model.options.buttons.buttonList,
            buttonEditSource: model.options.buttons.buttonEdit,
            editChildButtons: model.options.buttons.buttonEdit,
            detailChildButtons: model.options.buttons.buttonDetail,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            gridListOption: model.options.grids.gridList,
            //BOM结构信息
            grid4Option: model.options.grids.grid4,
            grid5Option: model.options.grids.grid5,

            // 采购订单
            purchaseGrid2Option: model.options.grids.grid6,
            purchaseGrid4Option: model.options.grids.grid7,

            promOrderItemsOption: model.options.grids.gridPromOrderItems,
            promGiftOrderItemsOption: model.options.grids.gridPromGiftOrderItems,

            gridDetailOption: model.options.grids.gridDetailItem,
            gridEditOption: model.options.grids.gridEditItem,
            cardDetailOption: model.options.cards.cardDetail,
            cardEditOption: model.options.cards.cardEdit,

            // 费用冲抵
            offsetList: new u.DataTable(model.options.metas.offsetMeta),
            offsetSelectList: new u.DataTable(model.options.metas.offsetSelectMeta),
            // 费用冲抵账户下属关联商品
            offsetRelationGoods: {},
            // 商品行费用冲抵明细
            offsetDetailsList: new u.DataTable(model.options.metas.offsetDetailsMeta),
            // 商品行费用冲抵明细（方便编辑调整）
            offsetOldDetailsList: new u.DataTable(model.options.metas.offsetDetailsMeta),

            // 费用冲抵账户列表
            offsetGrid1Option: model.options.grids.offsetGrid1,
            offsetGrid2Option: model.options.grids.offsetGrid2,

		    billPanelStatusEdit: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),


            CustomerCastflushDetailItem: new u.DataTable(
                model.options.metas.CustomerCastflushDetail
            ), //费用兑付明细
            gridFlushDetail: model.options.grids.gridFlushDetail,
            
            saveCheckCreditDetailOption: model.options.grids.saveCheckCreditDetail,
            saveCheckAccountDetailOption: model.options.grids.saveCheckAccountDetail,
            saveFilledTrayDetailOption: model.options.grids.saveFilledTrayDetail,
            saveFilledCarDetailOption: model.options.grids.saveFilledCarDetail,
            costFlushDetailCard: new u.DataTable(
                model.options.metas.costFlushDetailCard
            ), // 费用冲抵详情展示
            costFlushDetailOption: model.options.cards.costFlushDetail, // 费用冲抵详情展示

            costFlushingEdit: new u.DataTable(model.options.metas.costFlushingEdit), //费用冲抵
            gridCostFlushing: model.options.grids.gridCostFlushing, // 费用冲抵

            orderInvoice: new u.DataTable(model.options.metas.orderInvoice), // 发票信息
            orderReceiveAddress: new u.DataTable(
                model.options.metas.orderReceiveAddress
            ), // 收货地址
            isCostFlush: 0,
            isSearchprom: 0,
            // 根据功能节点编码和nodekey获取流程定义流程定义编码
            billFlowConfigUrl: window.pathMap["cmpt"] + "/cmpt/bill-flow-configs",
            // 全局变量  配合valuechange
            orderTypeIdValueChange: 0,
            saleOrgIdValueChange: 0,
            customerIdValueChange: 0,
            creditCheckType: ko.pureComputed(function () {
                var isRent = viewModel.saveCheckCreditDetailItems.ref(
                    "creditCheckType"
                )();
                return isRent == "credit" ? "信用额度" : "信用账期";
            }),
            listRenderTypes: {
                orderCode: "detailRender",
                isClose: "isCloseRender",
                isDeClose: "isCloseRender",
                orderSource: "orderSourceRender"
            },
            editRenderTypes: {
                baseGoodsOptValue: "goodsOpt",
                isGift: "giftBooleanRender",
                goodsSupplement: "disableBooleanRender",
                // rowVolume: "volumeUnitShowFn",
                isClose: "disableBooleanRender",
                isDeClose: "disableBooleanRender"
            },
            detailRenderTypes: {
                baseGoodsOptValue: "salesOrderGoodsOptDetails",
                // weight: "weightUnitShowFn",
                // volume: "volumeUnitShowFn",
                isClose: "disableBooleanRender",
                isDeClose: "disableBooleanRender"
            },
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
            }
        },
        afterCreate: function () {
            // 初始化折叠面板
            $.fn.collapsepanel(false, true);

            // 初始化服务器时间
            // viewModel.getCurDate();

            //处理从首页跳转过来的情况,为页面添加全局查询参数
            var url = window.location.href;
            var params = common.getParameter(url);
            var type = params.type;
            //全局查询条件
            viewModel.globalQueryData = undefined;
            window.viewModel = viewModel;
            //待出库情况特殊需要替换url
            viewModel.golbalIsDaichuku = false;
            //首页跳转地址中带type参数
            if (type) {
                viewModel.globalQueryData = [];
                viewModel.globalQueryData.push({
                    key: "search_EQ_orderStatus",
                    value: "02"
                });
                viewModel.globalQueryData.push({
                    key: "search_EQ_isClose",
                    value: "0"
                });
                //待审核  待退单
                if (type == "daishenhe") {
                    viewModel.globalQueryData.push({
                        key: "search_EQ_saleModel",
                        value: "01"
                    });
                } else if (type == "daituidan") {
                    viewModel.globalQueryData.push({
                        key: "search_EQ_saleModel",
                        value: "02"
                    });
                } else if ((type = "daichuku")) {
                    viewModel.golbalIsDaichuku = true;
                }
            }

            //绑定输入框enter事件
            $("#salesorder-searchcontent input")
                .off("keydown")
                .on("keydown", function (e) {
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
            $("#salefileiptwrapId")
                .off()
                .on("change", "#saleattachuploadbatch_id", function () {
                    if (this.value) {
                        viewModel.uploadAttach();
                    }
                });
            }
    });
    return view;
});