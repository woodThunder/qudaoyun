define(['text!./relasaleorder.html', 'ocm_common', 'ocm_baseview', './meta.js', "../../flow/bpmapproveref/bpmopenbill.js"], function(tpl, common, baseview, model, bpmopenbill) {
    'use strict'
    var viewModel, appCtx = "/occ-settlement",
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
            baseurl: "/b2b/order/get-sale-order",
            dialogWidth: "800px",
            salesorderList: new u.DataTable(model.options.metas.soitemmeta), //列表
            salesordereditmain: new u.DataTable(model.options.metas.soitemmeta), //编辑主表
            saleDetailMain: new u.DataTable(model.options.metas.soitemmeta), //详情主表
            salesordereditsub: new u.DataTable(model.options.metas.recmeta), //编辑子表
            salesorderDetailsub: new u.DataTable(model.options.metas.recmeta), //详情子表
            salesorderSetSub: new u.DataTable(model.options.metas.recmeta), //编辑子表
            setMata: new u.DataTable(model.options.metas.setmeta), //
            gridListOption: model.options.grids.gridList,
            gridEditOption: model.options.grids.gridEditMain,
            grid2Option: model.options.grids.gridEditSub,
            gridDetailOption: model.options.grids.gridDetailSub,
            gridDetailMainOption: model.options.grids.gridDetailMain,
            gridSetOption: model.options.grids.gridSetSub,
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            button4Source: model.options.buttons.button4,
            button5Source: model.options.buttons.button5,
            card1Source: model.options.cards.card1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            //跳转单据页
            goBillPanel: common.bill.goBillPanel,
            //跳转详情页
            goDetailPanel: common.bill.goDetailPanel,
            detailRender: common.rendertype.detailRender,
            projects: [],
            productLines: [],
            goSetPanel: function() { //跳转单据页
                // $(".ui-list-panel").hide();
                $(".ui-panel").hide();
                $(".ui-bill-set").show();
                $(".ui-bill-set").animateCss("fadeIn");
            },
        },
        rendertype: {
            operation: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var isFinSame = obj.row.value.sameFinancialOrg;
                var delfun =
                    "data-bind=click:del.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var editfun =
                    "data-bind=click:showEditBillPanel.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                if (isFinSame) {
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        editfun +
                        ' title="编辑">编辑</a>' +
                        "</span></div>";
                } else {
                    obj.element.innerHTML = ''
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
        },
        events: {
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            // callback 用于提交按钮成功后勾选选中数据
            search: function(reindex, callback) {
                if (reindex) {
                    viewModel.salesorderList.pageIndex(0);
                }
                viewModel.salesorderList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ?
                    viewModel.searchcomp.getDataWithOpr() : {};
                var pageSize = viewModel.salesorderList.pageSize();
                var pageNumber = viewModel.salesorderList.pageIndex();
                queryData.page = pageNumber;
                queryData.size = pageSize;

                //处理从首页跳转过来的情况下，带来的全局参数（afterCreate中保存的参数）
                if (viewModel.globalQueryData && viewModel.globalQueryData.length > 0) {
                    for (var i = 0; i < viewModel.globalQueryData.length; i++) {
                        queryData[viewModel.globalQueryData[i].key] =
                            viewModel.globalQueryData[i].value;
                    }
                }
                queryData["search_IN_saleModel"] = "01,03";
                if (!queryData["search_EQ_saleOrg"]) {
                    queryData["search_NOTNULL_saleOrg"] = "~";
                }
                if (queryData["search_EQ_orderDate"]) {
                    queryData["search_EQ_orderDate_date"] =
                        queryData["search_EQ_orderDate"];
                }
                delete queryData["search_EQ_orderDate"];
                $._ajax({
                    type: "get",
                    //通过渠道上工作台首页跳转的待出库查询，需要使用单独接口调用。参数从aftercreate中接受判断
                    url: '/occ-b2b-order' + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        viewModel.salesorderList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.salesorderList.totalRow(data.totalElements);
                        viewModel.salesorderList.totalPages(data.totalPages);
                        if (callback && typeof callback == "function") {
                            callback();
                        }
                    }
                });
            },
            //清空搜索条件
            cleanSearch: function() {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function(index) {
                viewModel.salesorderList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function(size) {
                viewModel.salesorderList.pageSize(size);
                viewModel.search(true);
            },
            //删除和批量删除
            del: function(data, rowId) {
                if (typeof(data) == 'number') {
                    viewModel.salesorderList.setRowSelectbyRowId(rowId);
                }
                var rows = viewModel.salesorderList.getSelectedRows();
                if (rows && rows.length > 0) {
                    common.dialog.confirmDialog({
                        msg1: '确认删除这些项？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function() {
                            viewModel.del_ajax(rows);
                        }
                    });
                } else {
                    toastr.warning("请先选择一行数据");
                }
            },
            //取消单据
            cancelBill: function() {
                viewModel.salesordereditmain.removeRows(viewModel.salesordereditmain.getCurrentRow());
                // var curRow = viewModel.salesorderList.getCurrentRow();
                // 修改，则还原
                // if (curRow.getValue("id")) {
                //     curRow.setSimpleData(viewModel.salesorderList.originEditData)
                // }
                // 新增或复制，则删除
                // else {
                //     // viewModel.salesorderList.removeRow(curRow);
                //     viewModel.salesordereditmain.removeAllRows();
                // }
                viewModel.retListPanel();
            },
            // 放回列表页
            retListPanel: function() {
                common.bill.retListPanel();
            },
            //保存单据
            saveBill: function() {
                var result = app.compsValidateMultiParam({
                    element: ".ui-bill-panel",
                    showMsg: true
                });
                var passed = result.passed;
                if (!passed) return;
                var allRows = viewModel.salesordereditsub.getAllRows();
                if (allRows.length == 0 || allRows.every(function(row) {
                        return row.status == u.Row.STATUS.FALSE_DELETE
                    })) {
                    toastr.error("请录入表体行数据");
                    return;
                }
                // viewModel.salesordereditmain.setValue('billClaimState', '1');
                var complexData = viewModel.salesordereditmain.getSimpleData()[0];
                var complexItemsData = viewModel.salesordereditsub.getSimpleData();
                var subTableDatas = {};
                subTableDatas.orderDto = {
                    orderId: complexData.orderId,
                    orderCode: complexData.orderCode
                };
                subTableDatas.detailDtoList = complexItemsData
                // var _ajaxType = viewModel.salesordereditmain.getValue("id") ? "put" : "post";
                $._ajax({
                    url: appCtx + '/settlement/orderreceiptcorrelation/save',
                    // type: _ajaxType,
                    type: 'post',
                    data: JSON.stringify(subTableDatas),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        viewModel.retListPanel();
                        viewModel.search();

                    }
                })
            },
            detail: function(index) {
                setTimeout(function() {
                    var curRow = viewModel.salesorderList.getCurrentRow();
                    // var date = curRow.getValue('billdate');
                    viewModel.saleDetailMain.setSimpleData(curRow.getSimpleData());
                    var id = curRow.getValue("orderId");
                    viewModel.findByParentid(id, 'detail');
                    viewModel.goDetailPanel();
                }, 0);
            },
            //进入修改单据页
            showEditBillPanel: function(index, rowId) {
                var curRow = viewModel.salesorderList.getRowByRowId(rowId);
                viewModel.salesordereditmain.setSimpleData(curRow.getSimpleData());
                var id = curRow.getValue("id");
                viewModel.findByParentid(id, 'edit');
                viewModel.goBillPanel();
            },
            //查询子表数据
            findByParentid: function(id, who) {
                //查销售订单详情
                $._ajax({
                    url: "/occ-b2b-order/b2b/order/get-by-id?id=" + id,
                    type: 'get',
                    async: false,
                    success: function(data) {
                        var orderItem = data.orderItems;
                        viewModel.projects = [];
                        viewModel.productLines = [];
                        for (var i = 0; i < orderItem.length; i++) {
                            if (orderItem[i].projectId) {
                                viewModel.projects.push(orderItem[i].projectId)
                            }
                            if (orderItem[i].productLineId) {
                                viewModel.productLines.push(orderItem[i].productLineId)
                            }
                        }
                        viewModel.customer = data.customerId;
                        viewModel.financal = orderItem[0].settleFinancialOrgId;
                        console.log(viewModel.project);
                        console.log('------------------------------')
                        console.log(viewModel.productLine);
                    }
                });
                //根据销售订单id查关联的收款单
                $._ajax({
                    url: appCtx + "/settlement/orderreceiptcorrelation/query-byOrderId",
                    type: 'get',
                    async: false,
                    data: {
                        "orderId": id
                    },
                    success: function(data) {
                        if (who == 'detail') {
                            viewModel.salesorderDetailsub.setSimpleData(data);
                        } else {
                            viewModel.salesordereditsub.setSimpleData(data);
                        }
                    }
                })
            },
            //子表增行
            addNewItems: function() {
                viewModel.setMata.createEmptyRow()
                viewModel.goSetPanel();
            },
            //删除子表项
            delItems: function() {
                var selectedRows = viewModel.salesordereditsub.getSelectedRows();
                for (var i = 0; i < selectedRows.length; i++) {
                    selectedRows[i].setValue("dr", "1");
                }
                viewModel.salesordereditsub.removeRows(selectedRows);
            },
            //设置查询
            searchBill: function() {
                var setDatas = viewModel.setMata.getSimpleData()[0];
                var editMainIds = viewModel.salesordereditmain.getSimpleData();
                var editSubIds = viewModel.salesordereditsub.getSimpleData();
                var ids = editSubIds.map(function(item) {
                    return item.id;
                });
                var datas = {};
                console.log(editMainIds)
                datas.request = {
                    EQ_sale_financeOrgId: viewModel.financal,
                    EQ_sale_customer: editMainIds[0].customerId,
                    NOT_IN_existIds: ids.join("','")
                };
                if (setDatas.saleOrg) {
                    datas.request.EQ_saleOrg = editMainIds[0].saleOrgId;
                }
                if (setDatas.productLine) {
                    datas.request.EQ_productLine = viewModel.productLines;
                }
                if (setDatas.project) {
                    datas.request.EQ_project = viewModel.projects;
                }
                if (setDatas.saleOrgOrderType) {
                    datas.request.EQ_orderType = editMainIds[0].billTypeId;
                }
                datas.checkRuleDto = setDatas;
                $._ajax({
                    url: appCtx + "/settlement/orderreceiptcorrelation/queryreceipt-byorder",
                    type: 'post',
                    async: false,
                    data: JSON.stringify(datas),
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data) {
                        viewModel.salesorderSetSub.setSimpleData(data);
                    }
                })
            },
            //确认收款单
            confirmBill: function() {
                var selectSub = viewModel.salesorderSetSub.getSelectedRows();
                if (!selectSub.length) {
                    toastr.warning('请至少选择一行收款单！')
                    return;
                }
                for (var i = 0; i < selectSub.length; i++) {
                    var newRow = viewModel.salesordereditsub.createEmptyRow();
                    newRow.setSimpleData(selectSub[i].getSimpleData());
                }
                viewModel.retListPanel();
                viewModel.goBillPanel();
            },
        },
        afterCreate: function() {
            app = viewModel.app;
            // 初始化折叠面板
            $.fn.collapsepanel(false, true);

            // 初始化服务器时间
            // viewModel.getCurDate();


        }
    });
    return view;
});