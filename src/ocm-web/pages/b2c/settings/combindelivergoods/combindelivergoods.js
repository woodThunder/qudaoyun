define(['text!./combindelivergoods.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
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
            baseurl: '/b2c/delivered-togethers',
            orderexauditList: new u.DataTable(model.options.metas.orderexauditlist),
            platList: new u.DataTable(model.options.metas.platItem),
            ItemRefList: new u.DataTable(model.options.metas.ItemRef),

            searchcomp: {},
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,

            card1Source: model.options.cards.card1,
            grid1Option: model.options.grids.grid1,



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
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    success: function(data) {
                        viewModel.orderexauditList.setSimpleData(data.content);
                        if (data.content.length) {
                            viewModel.platList.setSimpleData(data.content[0].deliveredTogetherStoreList);
                        } else {
                            data.content.push({
                                'isEnable': 0,
                                'deliveredTogetherStoreList': []
                            });
                            viewModel.orderexauditList.setSimpleData(data.content);
                        }
                    }
                })
            },
            //删除子表项
            delPlats: function() {
                var addRows = viewModel.orderexauditList.getValue("isEnable");
                if (!addRows) {
                    toastr.warning('请勾选“是否自动合并”!')
                    return;
                }
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
                var result = app.compsValidateMultiParam({
                    element: ".ui-list-panel",
                    showMsg: true
                });
                if (!result.passed) {
                    return;
                }
                //校验至少有一项
                // var platAllRows = viewModel.platList.getAllRows();
                // if (platAllRows.length == 0 || platAllRows.every(function(row) {
                //         return row.status == u.Row.STATUS.FALSE_DELETE
                //     })) {
                //     toastr.error("请录入平台表体行数据");
                //     return;
                // }
                var platItemsData = viewModel.platList.getSimpleData();
                var complexData = viewModel.orderexauditList.getSimpleData();
                complexData[0].deliveredTogetherStoreList = platItemsData;
                // complexData[0].exemptAuditGoods = skuItemsData;
                complexData[0].persistStatus = "upd";
                // var _ajaxType = viewModel.orderexauditList.getValue("id") ? "put" : "post";
                $._ajax({
                    url: appCtx + viewModel.baseurl + '/batch-save',
                    type: 'post',
                    data: JSON.stringify(complexData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        toastr.success();
                        viewModel.search();
                        // viewModel.orderexauditList.getFocusRow().setSimpleData(data);
                        // viewModel.retListPanel();
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
                var addRows = viewModel.orderexauditList.getValue("isEnable");
                if (!addRows) {
                    toastr.warning('请勾选“是否自动合并”!')
                    return;
                }
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
            // 初始化折叠面板
            $.fn.collapsepanel(false, true);
            var saveBtn = $('.pagination-right .ui-btn');
            app = viewModel.app;
            // 列表查询数据(无查询条件)
            viewModel.search();
            viewModel.orderexauditList.on("isEnable.valuechange", function(obj) {
                if (saveBtn.hasClass('ui-btn-disabled')) {
                    saveBtn.removeClass('ui-btn-disabled');
                    saveBtn.addClass('ui-btn-green');
                }
            });
            // 子表参照聚焦行，用于绑定子表参照组件
            var refRow = viewModel.ItemRefList.createEmptyRow();
            viewModel.ItemRefList.setRowFocus(refRow);
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