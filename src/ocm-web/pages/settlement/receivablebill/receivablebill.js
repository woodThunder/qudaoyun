define(['text!./receivablebill.html', 'ocm_common', 'ocm_baseview', './meta.js', 'editcard', './events.js', './renderType.js'], function(tpl, common, baseview, model, editcard, events, rendertype) {
    'use strict'
    var viewModel, app, appCtx = "/occ-settlement";

    var view = baseview.extend({
        beforeCreate: function() {
            viewModel = this.viewModel;
            app = this.app;
            viewModel = _.extend(viewModel, rendertype(viewModel))
            viewModel = _.extend(viewModel, events(viewModel))
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: '/settlement/receivablebills',
            dialogWidth: "800px",
            // excelurl: '/settlement/gathers-excel',
            currencyRefDs: new u.DataTable(model.options.metas.currencyRefMeta), //币种
            salesorderList: new u.DataTable(model.options.metas.soitemmeta), //列表
            salesorderCard: new u.DataTable(model.options.metas.someta), //编辑
            salesorderDetailCard: new u.DataTable(model.options.metas.someta), //详情
            saleOrderItems: new u.DataTable(model.options.metas.soitemmeta), //订单行
            // 待关闭订单条目
            closeOrderItems: new u.DataTable(model.options.metas.soitemmeta),
            // 批量操作订单条目列表
            batchSaleOrderItems: new u.DataTable(model.options.metas.soitemmeta),
            ItemRefList: new u.DataTable(model.options.metas.productRefMeta), //选商品参照
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
            //返回列表页
            retListPanel: common.bill.retListPanel,
            // 账号类型
            accountTypeSrc: ko.observableArray([]),
            soTypeSrc: ko.observableArray([]),
            closeReasonSrc: ko.observableArray([]),
            // 当前系统日期
            curDate: ko.observable(),
            //默认交货推迟日期
            defaultDelayDate: ko.observable(3),
            // 行号池
            curRowNum: ko.observable(0),

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
            billStateSrc: [{
                value: '1',
                name: '保存'
            }, {
                value: '2',
                name: '已提交'
            }, {
                value: '3',
                name: '审批通过'
            }, {
                value: '4',
                name: '审批中'
            }, {
                value: '6',
                name: '审批不通过'
            }],
            cgObj: ko.pureComputed(function() {
                var enableStatus = viewModel.salesorderDetailCard.ref("dealObject")();
                switch (enableStatus) {
                    case "1":
                        return enableStatus = "客户";
                        break;
                    case "2":
                        return enableStatus = "部门";
                        break;
                    case "3":
                        return enableStatus = "业务员";
                        break;
                    case "4":
                        return enableStatus = "物流公司"
                        break;
                }
            }),
            //来往对象
            dealObjectSrc: [{
                value: '1',
                name: '客户'
            }, {
                value: '2',
                name: '部门'
            }, {
                value: '3',
                name: '业务员'
            }, {
                value: '4',
                name: '物流公司'
            }],
            buttonListSource: model.options.buttons.buttonList,
            buttonEditSource: model.options.buttons.buttonEdit,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            gridListOption: model.options.grids.gridList,
            gridDetailOption: model.options.grids.gridDetailItem,
            gridEditOption: model.options.grids.gridEditItem,
            cardDetailOption: model.options.details.cardDetail,
            cardEditOption: model.options.cards.cardEdit,
        },
        afterCreate: function() {
            // 初始化折叠面板
            $.fn.collapsepanel(false, true);

            // 初始化服务器时间
            // viewModel.getCurDate();

            //绑定输入框enter事件
            $('#salesorder-searchcontent input').off("keydown").on("keydown", function(e) {
                if (e.keyCode == 13) {
                    $(this).blur();
                    viewModel.search();
                }
            });

            $("#salesorderTab .u-tabs__tab").click(function(e) {
                viewModel.tabindex = $(this).index();
                viewModel.search(true);
            });

            viewModel.ItemRefList.on("productref.valuechange", function(obj) {
                // 清空参照时不增行
                if (!obj.newValue) {
                    return;
                }
                var refer = $("#refContainerproductref").data("uui.refer");
                var refValues = refer.values;
                var newRows = [];
                if (refValues && refValues.length > 0) {
                    for (var i = 0; i < refValues.length; i++) {
                        var rowNum = viewModel.generaterowNum();
                        var id = refValues[i].refpk;
                        var row = viewModel.saleOrderItems.getRowByField("goods", id);
                        if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
                            newRows.push({
                                serialnum: rowNum,
                                goods: refValues[i].refpk,
                                goodsCode: refValues[i].refcode,
                                goodsName: refValues[i].refname,
                                num: 1,
                                price: 1,
                            })
                        }
                    }
                    viewModel.saleOrderItems.setSimpleData(newRows)
                }
                return true;
            });
            // viewModel.salesorderCard.on("beforevaluechange", function (obj) {
            //     if (obj.field == "soTypeId") {
            //     var soTypecomp = app.getComp("soTypeId").comp;
            //     if (obj.oldValue && obj.newValue) {
            //         var oldValue = obj.oldValue;
            //         var newValue = obj.newValue;
            //     }
            //     else {
            //         return true;
            //     }
            //     //如果子表有数据或者业务账号有数据
            //     if (viewModel.saleOrderItems.getAllRows().length > 0 ||
            //         viewModel.salesorderCard.getValue("businessAccountId")) {
            //         var soTypeName = common.dataconvert.valueToName(oldValue, viewModel.soTypeSrc);
            //         soTypecomp.setName(soTypeName);
            //         common.dialog.confirmDialog({
            //         msg1: '是否修改销售订单类型？',
            //         msg2: '修改后将清空业务数据',
            //         width: '400px',
            //         type: 'error',
            //         onOk: function () {
            //             // 确定后清除业务数据
            //             viewModel.saleOrderItems.removeAllRows();
            //             viewModel.salesorderCard.setValue("businessAccountId", null);
            //             viewModel.salesorderCard.setValue("soTypeId", newValue);
            //         }
            //         })
            //     }
            //     else {
            //         return true;
            //     }
            //     return false;
            //     }
            //     return true;
            // });
            viewModel.salesorderCard.on('customerId.valuechange', function(obj) {
                var row = viewModel.salesorderCard.getRow(0);
                if (!obj.newValue) {
                    return
                } else {
                    row.setValue('payAccountBank', '');
                    row.setValue('payAccount', '');
                }
                var refer = $('#refContainercstm00').data('uui.refer');
                if (!refer || refer.values.length == 0) {
                    return
                }
                $(refer.values).each(function(index, el) {
                    row.setValue('payAccountBank', el['bank']);
                    row.setValue('payAccount', el['bankAccount']);
                    return true;
                });
            });
            viewModel.saleOrderItems.on('account.valuechange', function(obj) {

                console.log(obj);
            });
            // refContaineraccount
            // $("#currencyRef .refer").trigger("click.refer");
            // $('#currencyRef ref-btn btn-cancel').trigger("click");
            // var d2 = $('#refContainercurrency ul.ul_list');
            // console.log(d2);
            // console.log(viewModel. currencyRefDs.getSimpleData())
            // $._ajax({
            //     type: "get",
            //     url: appCtx + "/b2c/enum-service/data",
            //     async: false,
            //     data: {
            //         enumClassName: "com.yonyou.ocm.b2c.enums.LogisticsModeEnum"
            //     },
            //     success: function(data) {
            //         var newarray = common.dataconvert.toMap(data, "name", "code");
            //         viewModel.logisticsModeEnum = newarray;
            //     }
            // });
        }
    });
    return view;
});