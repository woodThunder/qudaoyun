define(['text!./orderExemptAudit.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
    'use strict'
    var viewModel, appCtx = "/occ-b2c",
        app;
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
            baseurl: '/b2c/order-exemption-audits',
            orderexauditList: new u.DataTable(model.options.metas.orderexauditlist),
            platList: new u.DataTable(model.options.metas.platItem),
            skuList: new u.DataTable(model.options.metas.skuItem),
            ItemRefList: new u.DataTable(model.options.metas.ItemRef),

            searchcomp: {},
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,

            card1Source: model.options.cards.card1,
            card2Source: model.options.cards.card2,
            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2,



            billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),

            //跳转单据页
            goBillPanel: common.bill.goBillPanel,
            //跳转详情页
            goDetailPanel: common.bill.goDetailPanel,
            enableFmt: ko.pureComputed(function() {
                var enableStatus = viewModel.orderexauditList.ref("enableStatus")();
                return enableStatus == 1 ? "启用" : "停用";
            })
        },
        rendertype: {
            operation: common.rendertype.operation,
            enableStatusRender: common.rendertype.enableRender,
            detailRender: common.rendertype.detailRender,
        },
        events: {
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function(reindex) {
                viewModel.orderexauditList.removeAllRows();
                viewModel.platList.removeAllRows();
                viewModel.skuList.removeAllRows();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    success: function(data) {
                        if (data.content[0].isEnable) {
                            // $('#formlistaudit').css('display', 'block');
                            $('#maskin').css('display', "none");
                        } else {
                            // $('#formlistaudit').css('display', 'none');
                            $('#maskin').css('display', "block");
                        }
                        viewModel.orderexauditList.setSimpleData(data.content);
                        viewModel.platList.setSimpleData(data.content[0].exemptAuditStore);
                        viewModel.skuList.setSimpleData(data.content[0].exemptAuditGoods);
                    }
                })
            },
            //删除子表项
            delItems: function() {
                var selectedRows = viewModel.skuList.getSelectedRows();
                viewModel.skuList.removeRows(selectedRows);
                var saveBtn = $('.pagination-right .ui-btn');
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            },
            //删除子表项
            delPlats: function() {
                var selectedRows = viewModel.platList.getSelectedRows();
                viewModel.platList.removeRows(selectedRows);
                var saveBtn = $('.pagination-right .ui-btn');
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            },
            //保存单据
            saveBill: function(obj, e) {
                var tarDom = e.target;
                if ($(tarDom).hasClass('ui-btn-disabled')) {
                    return;
                }
                var isMs = viewModel.orderexauditList.getValue('isEnable');
                if (isMs == 0 || isMs == '0') {

                } else {
                    var result = app.compsValidateMultiParam({
                        element: ".ui-list-panel",
                        showMsg: true
                    });
                    if (!result.passed) {
                        return;
                    }
                    var platAllRows = viewModel.platList.getAllRows();
                    if (platAllRows.length == 0 || platAllRows.every(function(row) {
                            return row.status == u.Row.STATUS.FALSE_DELETE
                        })) {
                        toastr.error("请录入平台表体行数据");
                        return;
                    }
                }
                var skuAllRows = viewModel.skuList.getAllRows();
                var platItemsData = viewModel.platList.getSimpleData();
                var skuItemsData = viewModel.skuList.getSimpleData();
                var complexData = viewModel.orderexauditList.getSimpleData();
                complexData[0].exemptAuditStore = platItemsData;
                complexData[0].exemptAuditGoods = skuItemsData;
                complexData[0].persistStatus = "upd";
                $._ajax({
                    url: appCtx + viewModel.baseurl + '/batch-save',
                    type: 'post',
                    data: JSON.stringify(complexData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        toastr.success();
                    }
                })
            },
            //重置单据
            resetBill: function() {
                // var curRow = viewModel.orderexauditList.getCurrentRow();
                // 新增重置
                // 编辑重置（修改或复制）
            },

            //参照选择平台
            showAddPlatsRef: function() {
                viewModel.clearplatsRef();
                $("#addPlatsRef .refer").trigger("click");
            },
            //清空已选销售产品参照
            clearplatsRef: function() {
                viewModel.ItemRefList.setValue("b2cStoreRef", "");
                var refer = $("#refContainerb2cStoreRef").data("uui.refer");
                refer.uncheckAll();
                refer.setValue([]);
            },
            //参照选择商品
            showAddItemsRef: function() {
                viewModel.clearItemsRef();
                $("#addItemsRef .refer").trigger("click");
            },
            //清空已选销售产品参照
            clearItemsRef: function() {
                viewModel.ItemRefList.setValue("productref", "");
                var refer = $("#refContainerproductref").data("uui.refer");
                refer.uncheckAll();
                refer.setValue([]);
            },
            // 放回列表页
            retListPanel: function() {
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
                common.bill.retListPanel();
            },
        },
        afterCreate: function() {
            app = viewModel.app;
            var saveBtn = $('.pagination-right .ui-btn');
            // 列表查询数据(无查询条件)
            viewModel.search();
            viewModel.orderexauditList.on("maxTotalReceivableFee.valuechange", function(obj) {
                var newValue = obj.newValue;
                if (!newValue) {
                    return;
                }
                var minFee = viewModel.orderexauditList.getValue('minTotalReceivableFee');
                if (parseFloat(newValue) <= parseFloat(minFee)) {
                    toastr.warning('免审订单金额上限必须大于免审订单金额下限！');
                    viewModel.orderexauditList.setValue('maxTotalReceivableFee', parseFloat(minFee) + 1);
                }
            });
            viewModel.orderexauditList.on("minTotalReceivableFee.valuechange", function(obj) {
                var newValue = obj.newValue;
                if (!newValue) {
                    return;
                }
                var maxFee = viewModel.orderexauditList.getValue('maxTotalReceivableFee');
                if (parseFloat(newValue) >= parseFloat(maxFee)) {
                    toastr.warning('免审订单金额上限必须大于免审订单金额下限！');
                    viewModel.orderexauditList.setValue('minTotalReceivableFee', 0);
                }
            });
            viewModel.orderexauditList.on("isEnable.valuechange", function(obj) {
                var newValue = obj.newValue;
                if (!newValue) {
                    // $('#formlistaudit').css('display', "none");
                    $('#maskin').css('display', "block");
                } else {
                    // $('#formlistaudit').css('display', "block");
                    $('#maskin').css('display', "none");
                }
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            viewModel.orderexauditList.on("buyerMsg.valuechange", function(obj) {
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            viewModel.orderexauditList.on("sellerRemark.valuechange", function(obj) {
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            viewModel.orderexauditList.on("ordersign.valuechange", function(obj) {
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            viewModel.orderexauditList.on("isException.valuechange", function(obj) {
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            viewModel.orderexauditList.on("maxTotalReceivableFee.valuechange", function(obj) {
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            viewModel.orderexauditList.on("minTotalReceivableFee.valuechange", function(obj) {
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            viewModel.orderexauditList.on("orderGoods.valuechange", function(obj) {
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            // 子表参照聚焦行，用于绑定子表参照组件
            var refRow = viewModel.ItemRefList.createEmptyRow();
            viewModel.ItemRefList.setRowFocus(refRow);
            // 确定销售产品参照，为产品组合子表增行
            viewModel.ItemRefList.on("productref.valuechange", function(obj) {
                // 清空参照时不增行
                if (!obj.newValue) {
                    return;
                }
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
                var refer = $("#refContainerproductref").data("uui.refer");
                var refValues = refer.values;
                if (refValues && refValues.length > 0) {
                    for (var i = 0; i < refValues.length; i++) {
                        var id = refValues[i].refpk;
                        var row = viewModel.skuList.getRowByField("goodsId", refValues[i].refpk);
                        if (!row || row.status == "fdel") {
                            var tempNewrow = viewModel.skuList.createEmptyRow();
                            tempNewrow.setValue("goodsCode", refValues[i].refcode);
                            tempNewrow.setValue("goodsName", refValues[i].refname);
                            tempNewrow.setValue("goodsId", refValues[i].refpk);
                            tempNewrow.setValue("persistStatus", 'new');
                        }
                    }
                }
            });
            viewModel.ItemRefList.on("b2cStoreRef.valuechange", function(obj) {
                // 清空参照时不增行
                if (!obj.newValue) {
                    return;
                }
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
                var refer = $("#refContainerb2cStoreRef").data("uui.refer");
                var refValues = refer.values;
                if (refValues && refValues.length > 0) {
                    for (var i = 0; i < refValues.length; i++) {
                        var id = refValues[i].refpk;
                        var row = viewModel.platList.getRowByField("storeId", id);
                        if (!row || row.status == "fdel") {
                            var tempNewrow = viewModel.platList.createEmptyRow();
                            tempNewrow.setValue("storeName", refValues[i].refname);
                            tempNewrow.setValue("platformName", refValues[i].platformName);
                            tempNewrow.setValue("storeId", refValues[i].refpk);
                            tempNewrow.setValue("persistStatus", 'new');
                        }
                    }
                }
            });
        }
    });

    return view;
});