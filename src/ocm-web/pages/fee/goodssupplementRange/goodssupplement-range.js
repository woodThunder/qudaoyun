define(['text!./goodssupplement-range.html', 'ocm_baseview', 'ocm_common', './meta.js'], function (tpl, baseview, common, model) {
    var viewModel,app, BILLPANELSTATUS = {
        ADD: "add",
        EDIT: "edit",
        COPY: "copy",
        DETAIL: "detail",
        DEFAULT: "default"
    }
    var view = baseview.extend({
        beforeCreate: function () {
            app = this.app;
            viewModel = this.viewModel;
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: '/goodssupplement-ranges',
            complexList: new u.DataTable(model.options.metas.goodssupplementRange),
            complexItems: new u.DataTable(model.options.metas.goodssupplementRangeItem),
            //ItemRefList: new u.DataTable(model.options.metas.ItemRef),

            searchcomp: {},
            searchSource: model.options.searchs.search1,
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            button4Source: model.options.buttons.button4,

            card1Source: model.options.cards.card1,
            detail11Source: model.options.details.detail1,
            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2,
            grid3Option: model.options.grids.grid3,
            billPanelStatus: BILLPANELSTATUS.DEFAULT,
            /*enableRadioSrc: [{
                value: "1",
                name: "启用"
            }, {
                value: "0",
                name: "停用"
            }, {
                value: CONST.DEFAULTOPTION,
                name: "全部"
            }],
            enableCheckSrc: [{
                value: "1",
                name: "是"
            }],*/
            //跳转单据页
            goBillPanel: common.bill.goBillPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel,
            // 跳转详情页
            goDetailPanel: common.bill.goDetailPanel,
            /*enableFmt: ko.pureComputed(function () {
                var enableStatus = viewModel.complexList.ref("enableStatus")();
                return enableStatus == 1 ? "启用" : "停用";
            })*/
        },
        rendertype: {
            operation: common.rendertype.operation,
            //enableStatusRender: common.rendertype.enableRender,
            detailRender: common.rendertype.detailRender,
        },
        events: {
            //表体商品分类和商品二选一
            validIndexByCol: function(colIndex, field) {
                var gridObj = viewModel.app.getComp("grid_complexItem").grid;
                var column = gridObj.getColumnByField(field);
                return colIndex == gridObj.getIndexOfColumn(column);
            },
            ifCanEidtHandle: function(obj) {
                var colIndex = obj.colIndex;
                var goodsCategoryId = viewModel.complexItems
                    .getRow(obj.rowIndex)
                    .getValue("goodsCategoryId");
                var goodsId = viewModel.complexItems
                    .getRow(obj.rowIndex)
                    .getValue("goodsId");
                if (
                    goodsCategoryId ||
                    goodsId
                ) {
                    if (goodsCategoryId) {
                        return viewModel.validIndexByCol(colIndex, "goodsCategoryId");
                    }
                    if (goodsId) {
                        return viewModel.validIndexByCol(colIndex, "goodsId");
                    }
                    return false;
                } else {
                    return true;
                }
            },
            //删除和批量删除
            del: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.complexList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var rows = viewModel.complexList.getSelectedRows();
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
                    onOk: function () {
                        $._ajax({
                            url: appCtx + viewModel.baseurl + "/delete",
                            type: "post",
                            // data: "ids=" + ids.join(","),
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (data) {
                                viewModel.complexList.removeRows(rows);
                            }
                        });

                    }
                });
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (reindex) {
                    viewModel.complexList.pageIndex(0);
                }
                viewModel.complexList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr?viewModel.searchcomp.getDataWithOpr():{};
                var pageSize = viewModel.complexList.pageSize();
                var pageNumber = viewModel.complexList.pageIndex();
                queryData.page = pageNumber;
                queryData.size = pageSize;
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.complexList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.complexList.totalRow(data.totalElements);
                        viewModel.complexList.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.complexList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.complexList.pageSize(size);
                viewModel.search();
            },
            //进入新增单据页
            showAddBillPanel: function () {
                var grid2 = app.getComp("grid_complexItem");
                /*var col1 = grid2.grid.getColumnByField("name");
                col1.options.editable = true*/
                var curRow = viewModel.complexList.createEmptyRow();
                viewModel.complexList.setRowFocus(curRow);
                viewModel.complexItems.removeAllRows();
                // curRow.setValue("enableStatus", "1");

                var customerCategoryIdBase = viewModel.app.getComp("customerCategoryIdBase");
                customerCategoryIdBase.setEnable(true);
                var customerIdBase = viewModel.app.getComp("customerIdBase");
                customerIdBase.setEnable(true);

                viewModel.goBillPanel();
                viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
                console.log(CONST.BILLPANELSTATUS.ADD)
            },
            // 可以进入编辑态
            canInEdit: function () {
                var canIn = true;
                return canIn;
                var id = viewModel.complexList.getValue("id");
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/isRefer",
                    async: false,
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data == 1) {
                            toastr.error("已被引用数据不可编辑");
                            canIn = false;
                        }
                    }
                })
                return canIn;
            },
            //进入修改单据页
            showEditBillPanel: function (index) {
                //debugger
                var grid2 = app.getComp("grid_complexItem");
                /*var col1 = grid2.grid.getColumnByField("name");
                col1.options.editable = false*/

                viewModel.complexList.setRowFocus(index);
                if (!viewModel.canInEdit()) {
                    return;
                }
                var id = viewModel.complexList.getValue("id");
                var focusData = viewModel.complexList.getFocusRow().getSimpleData();
                viewModel.complexList.originEditData = focusData;
                var customerCategoryIdBase = viewModel.app.getComp("customerCategoryIdBase");
                var customerIdBase = viewModel.app.getComp("customerIdBase");
                if(focusData.customerId) {
                    customerCategoryIdBase.setEnable(false);
                }else{
                    customerCategoryIdBase.setEnable(true);
                }
                if(focusData.customerCategoryId){
                    customerIdBase.setEnable(false);
                }else{
                    customerIdBase.setEnable(true);
                }
                //查询子表数据
                viewModel.findByParentid(id);
                viewModel.goBillPanel();
                viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
            },
            //进入复制单据页
            showCopyBillPanel: function () {
                // debugger
                var selectedRows = viewModel.complexList.getSelectedRows();
                // 只支持单一复制，批量复制需单独处理
                if (selectedRows.length != 1) {
                    toastr.error("请选择一条要复制的行");
                    return;
                }
                var copyRow = selectedRows[0];
                var curRow = viewModel.complexList.createEmptyRow();
                curRow.setSimpleData(copyRow.getSimpleData());
                viewModel.complexList.setRowFocus(curRow);
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
            //     var curRow = viewModel.complexList.getCurrentRow();
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
            detail: function () {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    var curRow = viewModel.complexList.getCurrentRow();
                    var id = curRow.getValue("id");
                    viewModel.findByParentid(id);
                    viewModel.goDetailPanel();
                }, 0);
            },
            //查询子表数据
            findByParentid: function (id) {
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/findByParentid",
                    type: 'post',
                    async: false,
                    data: {
                        parentid: id
                    },
                    success: function (data) {
                        viewModel.complexItems.setSimpleData(data);
                    }
                })
            },
            // 清除基类属性
            clearBaseProp: function (row) {
                row.setValue("id", "");
                row.setValue("code", "");
                row.setValue("name", "");
                row.setValue("creator", "");
                row.setValue("creationTime", "");
                row.setValue("modifier", "");
                row.setValue("modifiedTime", "");
            },
            //跳转单据详情页
            showBillDetail: function () {
                $(".ui-list-panel").addClass("animated slideInLeft");
                $(".ui-bill-panel").addClass("animated slideOutDown");
            },
            //新增子表项
            addItem: function () {
                viewModel.complexItems.createEmptyRow();
            },
            //批量新增子表项
            // addItems: function() {
            //
            // },
            //删除子表项
            delItems: function () {
                var selectedRows = viewModel.complexItems.getSelectedRows();
                for (var i = 0; i < selectedRows.length; i++) {
                    selectedRows[i].setValue("dr", "1");
                }
                viewModel.complexItems.removeRows(selectedRows);
            },
            //保存单据
            saveBill: function () {
                var result = viewModel.app.compsValidateMultiParam({
                    element: ".ui-bill-panel",
                    showMsg: true
                });
                if (!result.passed) {
                    return;
                }
                var allRows = viewModel.complexItems.getAllRows();
                if (allRows.length == 0 || allRows.every(function (row) {
                        return row.status == u.Row.STATUS.FALSE_DELETE
                    })) {
                    toastr.error("请录入表体行数据");
                    return;
                }
                var custRangeData = viewModel.complexItems.getSimpleData();
                for(var i in custRangeData) {
                    var item = custRangeData[i];
                    if(typeof item == "object" && item.goodsId && item.goodsCategoryId) {
                        toastr.error("商品分类、商品只能维护一项");
                        return false;
                    }
                    if(typeof item == "object" && !item.goodsId && !item.goodsCategoryId) {
                        toastr.error("商品分类、商品不能全部为空");
                        return false;
                    }
                }

                var InventoryAdjustData = viewModel.complexList.getCurrentRow().getSimpleData();
                var complexItemsData = viewModel.complexItems.getSimpleData();
                InventoryAdjustData.goodssupplementRangeItems = complexItemsData;
                var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: _ajaxType,
                    data: JSON.stringify(InventoryAdjustData),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.complexList.getFocusRow().setSimpleData(data);
                        viewModel.retListPanel();
                    }
                })
            },
            //重置单据
            resetBill: function () {
                // var curRow = viewModel.complexList.getCurrentRow();
                // 新增重置
                // 编辑重置（修改或复制）
            },
            //取消单据
            cancelBill: function () {
                viewModel.complexItems.removeAllRows();
                var curRow = viewModel.complexList.getCurrentRow();
                // 修改，则还原
                if (curRow.getValue("id")) {
                    curRow.setSimpleData(viewModel.complexList.originEditData)
                }
                // 新增或复制，则删除
                else {
                    viewModel.complexList.removeRow(curRow);
                    viewModel.complexItems.removeAllRows();
                }
                viewModel.retListPanel();
            },
            //启用
            enable: function () {
                var selectedRows = viewModel.complexList.getSelectedRows();
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
                        url: appCtx + viewModel.baseurl + "/batch-enable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function (res) {
                            toastr.success();
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isEnable", "1");
                            }
                        }
                    })
                }
            },
            //停用
            disable: function () {
                var selectedRows = viewModel.complexList.getSelectedRows();
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
                        url: appCtx + viewModel.baseurl + "/batch-disable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function (res) {
                            toastr.success();
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isEnable", "0");
                            }
                        }
                    })
                }
            },
            //参照选择批量新增子表（销售产品）
            /*showAddItemsRef: function () {
                viewModel.clearItemsRef();
                $("#addItemsRef .refer").trigger("click");
            },*/
            //清空已选销售产品参照
            /*clearItemsRef: function () {
                viewModel.ItemRefList.setValue("productref", "");
                var refer = $("#refContainerproductref").data("uui.refer");
                refer.uncheckAll();
                refer.setValue([]);
            },*/
            detail2bill: function () {
                if (!viewModel.canInEdit()) {
                    return;
                }
                common.bill.detail2bill();
            },
            //导入
            importHandle: function () {
                var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
                var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
                var ele = $('#importFiel')[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportHandle: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
                var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
                var listData = viewModel.complexList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            //子表增行
            addRow: function () {
                viewModel.complexItems.createEmptyRow();
                viewModel.currentFlag = 0;
            }
        },
        afterCreate: function() {
            viewModel.complexList.on("customerId.valuechange", function (obj) {
                var customerCategoryIdBase = viewModel.app.getComp("customerCategoryIdBase");
                if (obj.newValue) {
                    customerCategoryIdBase.setEnable(false);
                } else {
                    customerCategoryIdBase.setEnable(true);
                }
            });
            viewModel.complexList.on("customerCategoryId.valuechange", function (obj) {
                var customerIdBase = viewModel.app.getComp("customerIdBase");
                if (obj.newValue) {
                    customerIdBase.setEnable(false);
                } else {
                    customerIdBase.setEnable(true);
                }
            });
        }
    });
    return view;
});
