define(['text!./activitypriceadjust.html', 'ocm_common', 'searchbox', 'billfooter'/*, '/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js'*/, 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, Billfooter/*, bpmopenbill*/) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, searcher, searcher_detailrefer, billfooter, dialog_priceformula, dialog_bomprice, dialog_detailrefer;
    baseData = {
        baseurl: '/activity-price-adjust',
        ActivityPriceAdjustList: new u.DataTable(ActivityPriceAdjust),
        ActivityPriceAdjustItems: new u.DataTable(ActivityPriceAdjustItem),
        ActivityPriceAdjustItemsRefer: new u.DataTable(ActivityPriceAdjustItem),
        ProductTabRefList: new u.DataTable(ProductTabRef),
        BomPriceTree: new u.DataTable(BomPrice),
        CopyOrgRef: new u.DataTable(CopyOrg),
        billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
        saleEntitySrc: CONST.SALEENTITY,
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        enableFmt: ko.pureComputed(function() {
            var enableStatus = viewModel.ActivityPriceAdjustItems.ref("enable_status")();
            return enableStatus == 1 ? "启用" : "停用";
        }),
        approveFormat: common.format.approveFormat,
        dateFormat: common.format.dateFormat,
        channeltypeSrc: ko.observable(CONST.CHANNELTYPE),
        saleEntityFormat: common.format.saleEntityFormat,
        orderStartFmt: ko.pureComputed(function() {
            var trueValue = viewModel.ActivityPriceAdjustList.ref("promoActivityOrderStartDate")();
            var showValue = u.date.format(trueValue, "YYYY年MM月DD日");
            return showValue;
        }),
        orderEndFmt: ko.pureComputed(function() {
            var trueValue = viewModel.ActivityPriceAdjustList.ref("promoActivityOrderEndDate")();
            var showValue = u.date.format(trueValue, "YYYY年MM月DD日");
            return showValue;
        }),
    };
    rendertype = {
        operation: common.rendertype.operation4auth,
        detailRender: common.rendertype.detailRender,
        enableRender: common.rendertype.enableRender,
        priceItemRender: function(obj) {
            obj.element.innerHTML = '<a href="#" data-bind="click: showBOM">明细</a>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        //销售主体
        saleEntityRender: function(obj) {
            var showName = undefined;
            CONST.SALEENTITY.forEach(function(v) {
                if (v.value == obj.value) {
                    showName = v.name;
                }
            });
            if (showName) {
                obj.element.innerHTML = showName;
            }
        },
        approveRender: common.rendertype.approveRender,
    };
    events = {
        //导入
        importHandle: function() {
            var realRows = viewModel.ActivityPriceAdjustItems.getAllRealRows();
            if (realRows.length > 0) {
                toastr.error("表体已存在数据，不可导入");
                return;
            }
            var urlInfo = viewModel.baseurl + "/getDataFromExcelDataImport"; //倒入地址参数
            // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
            var ele = $('#importFiel')[0]; //挂载元素
            var setDate = function(data) {
                viewModel.ActivityPriceAdjustItems.setSimpleData(data, { status: "new" });
            };
            common.fileHandle.importToPage(urlInfo, ele, setDate);
        },
        //导出
        exportHandle: function() {
            var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
            var listData = viewModel.ActivityPriceAdjustItems; //需要导出表格的dataTable
            var searchParams = {}; //搜索查询参数
            var id = viewModel.ActivityPriceAdjustList.getCurrentRow().getValue("id");
            var ele = undefined;
            if (id) {
                searchParams['search_EQ_activityPriceAdjust.id'] = id;
                ele = $('#exportFiel')[0]; //挂载元素
            } else {
                ele = $('#exportAddTpl')[0]; //挂载元素
            }
            common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
        },
        bomTreeBeforeEdit: function(obj) {
            var editable = true
            if (obj.gridObj.gridCompColumnArr[obj.colIndex].options.field == "price" && obj.rowObj.hasChild) {
                editable = false;
            }
            return editable;
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
            if (reindex) {
                viewModel.ActivityPriceAdjustList.pageIndex(0);
            }
            viewModel.ActivityPriceAdjustList.removeAllRows();
            var queryData = searcher.getDataWithOpr();
            var pageSize = viewModel.ActivityPriceAdjustList.pageSize();
            var pageNumber = viewModel.ActivityPriceAdjustList.pageIndex();
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.ActivityPriceAdjustList.setSimpleData(data.content, { unSelect: true });
                    viewModel.ActivityPriceAdjustList.totalRow(data.totalElements);
                    viewModel.ActivityPriceAdjustList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function() {
            searcher.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
            viewModel.ActivityPriceAdjustList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
            viewModel.ActivityPriceAdjustList.pageSize(size);
            viewModel.search(true);
        },
        //删除和批量删除
        del: function(index, rowId) {
            var ids = [];
            var rows = [];
            if (typeof(index) == 'number') {
                viewModel.ActivityPriceAdjustList.setRowSelectbyRowId(rowId);
            }
            rows = viewModel.ActivityPriceAdjustList.getSelectedRows();
            if (rows.length == 0) {
                toastr.error("请选择数据");
                return
            }
            for (var i = 0; i < rows.length; i++) {
                var auditStatus = rows[i].getValue("auditStatus");
                if (auditStatus == "1") {
                    toastr.error("已审核数据不可删除");
                    return;
                } else if (auditStatus == "2") {
                    toastr.error("弃审过的数据不可删除");
                    return;
                }
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
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(data) {
                            viewModel.ActivityPriceAdjustList.removeRows(rows);
                        }
                    });

                }
            });
        },
        //进入新增单据页
        showAddBillPanel: function() {
            var curRow = viewModel.ActivityPriceAdjustList.createEmptyRow();
            viewModel.ActivityPriceAdjustList.setRowFocus(curRow);
            viewModel.ActivityPriceAdjustItems.removeAllRows();
            viewModel.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        },
        canInEdit: function() {
            var canIn = true;
            var approveStatus = viewModel.ActivityPriceAdjustList.getValue("auditStatus");
            approveStatus = parseInt(approveStatus);
            if (approveStatus == 1) {
                toastr.error("已审核数据不可编辑");
                canIn = false;
            }
            return canIn;
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
            viewModel.ActivityPriceAdjustList.setRowFocus(index);
            if (!viewModel.canInEdit()) return
            var id = viewModel.ActivityPriceAdjustList.getValue("id");
            viewModel.ActivityPriceAdjustList.originEditData = viewModel.ActivityPriceAdjustList.getFocusRow().getSimpleData();
            viewModel.findByParentid(id);
            viewModel.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        },
        //进入复制单据页
        showCopyBillPanel: function() {
            var selectedRows = viewModel.ActivityPriceAdjustList.getSelectedRows();
            if (selectedRows.length != 1) {
                toastr.error("请选择一条数据");
                return;
            }
            var copyRow = viewModel.ActivityPriceAdjustList.createEmptyRow();
            viewModel.ActivityPriceAdjustItems.removeAllRows();
            viewModel.ActivityPriceAdjustList.setRowFocus(copyRow);
            copyRow.setSimpleData(selectedRows[0].getSimpleData());
            // 清除无须复制的字段
            copyRow.setValue("id", "");
            copyRow.setValue("code", "");
            copyRow.setValue("name", "");
            var id = selectedRows[0].getValue("id");
            viewModel.findByParentid(id);
            viewModel.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.COPY);
        },
        //详情
        detail: function() {
            //确保grid先将行设置为focus状态
            setTimeout(function() {
                var curRow = viewModel.ActivityPriceAdjustList.getCurrentRow();
                var id = curRow.getValue("id");
                viewModel.findByParentid(id);
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                //加入bpm按钮
                //viewModel.initBPMFromBill(id, viewModel);
                viewModel.goDetailPanel();
            }, 0);
        },
        //查询子表数据
        findByParentid: function(id) {
            $._ajax({
                url: appCtx + viewModel.baseurl + "/findByParentid",
                type: 'post',
                async: false,
                data: { id: id },
                success: function(data) {
                    viewModel.ActivityPriceAdjustItems.setSimpleData(data);
                }
            })
        },
        //删除子表项
        delItems: function() {
            var selectedRows = viewModel.ActivityPriceAdjustItems.getSelectedRows();
            for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("dr", "1");
            }
            viewModel.ActivityPriceAdjustItems.removeRows(selectedRows);
        },
        // 弹出批发活动价参照对话框
        showPriceRefDialog: function() {
            // 参照前必须录入活动、销售主体、销售组织信息
            var activityId = viewModel.ActivityPriceAdjustList.getValue("promoActivityId");
            var saleEntity = viewModel.ActivityPriceAdjustList.getValue("saleEntity");
            var saleOrgId = viewModel.ActivityPriceAdjustList.getValue("saleOrgId");
            if (!activityId || !saleEntity || !saleOrgId) {
                toastr.error("请先录入活动、销售主体、销售组织");
                return;
            }
            viewModel.cleanDetailReferSearch();
            viewModel.searchDetailRefer();
            if (!dialog_detailrefer) {
                dialog_detailrefer = u.dialog({ content: "#dialog_detailrefer", hasCloseMenu: true, width: "80%" });
            } else {
                dialog_detailrefer.show();
            }
        },
        // 参照对话框内查询-已选活动和销售组织对应批发价格表中的产品子表
        searchDetailRefer: function(reindex) {
            if (reindex) {
                viewModel.ActivityPriceAdjustItemsRefer.pageIndex(0);
            }
            viewModel.ActivityPriceAdjustItemsRefer.removeAllRows();
            var queryData = searcher_detailrefer.getDataWithOpr();
            queryData.size = viewModel.ActivityPriceAdjustItemsRefer.pageSize();
            queryData.page = viewModel.ActivityPriceAdjustItemsRefer.pageIndex();
            queryData["search_EQ_activityPrice.promoActivity.id"] = viewModel.ActivityPriceAdjustList.getValue("promoActivityId");
            queryData["search_EQ_activityPrice.saleEntity"] = viewModel.ActivityPriceAdjustList.getValue("saleEntity");
            queryData["search_EQ_activityPrice.saleOrg.id"] = viewModel.ActivityPriceAdjustList.getValue("saleOrgId");
            queryData["search_EQ_isEnable"] = 1;
            // 批发活动价产品子表条件查询
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + "/price-page-query",
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.ActivityPriceAdjustItemsRefer.setSimpleData(data.content, { unSelect: true });
                    viewModel.ActivityPriceAdjustItemsRefer.totalRow(data.totalElements);
                    viewModel.ActivityPriceAdjustItemsRefer.totalPages(data.totalPages);
                }
            })
        },
        cleanDetailReferSearch: function() {
            searcher_detailrefer.clearSearch();
        },
        // 将参照中的产品子表带入调价单
        confirmDetailRefer: function() {
            var selectedDatas = viewModel.ActivityPriceAdjustItemsRefer.getSimpleData({ type: "select" });
            var products = [];
            for (var i = 0; i < selectedDatas.length; i++) {
                var product = {};
                product.productId = selectedDatas[i].productId;
                product.combineId = selectedDatas[i].productCombineId;
                products.push(product);
            }
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/getBomProduct",
                data: JSON.stringify(products),
                contentType: "application/json; charset=utf-8",
                success: function(items) {
                    viewModel.ActivityPriceAdjustItems.addSimpleData(items, u.Row.STATUS.NEW);
                    dialog_detailrefer.hide();
                }
            })
        },
        cancelDetailRefer: function() {
            dialog_detailrefer.hide();
        },
        pageChangeDetailRefer: function(index) {
            viewModel.ActivityPriceAdjustItemsRefer.pageIndex(index);
            viewModel.searchDetailRefer();
        },
        sizeChangeDetailRefer: function(size) {
            viewModel.ActivityPriceAdjustItemsRefer.pageSize(size);
            viewModel.searchDetailRefer();
        },
        //保存单据
        saveBill: function() {
            var result = app.compsValidateMultiParam({ element: $(".ui-bill-panel")[0], showMsg: true });
            if (!result.passed) {
                return;
            }
            var parentData = viewModel.ActivityPriceAdjustList.getCurrentRow().getSimpleData();
            var childDatas = viewModel.ActivityPriceAdjustItems.getSimpleData();
            parentData.details = childDatas;
            if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.COPY) {
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/copy",
                    type: "post",
                    data: JSON.stringify(parentData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        viewModel.search();
                        viewModel.retListPanel();
                    }
                })
            } else {
                var _ajaxType = viewModel.ActivityPriceAdjustList.getValue("id") ? "put" : "post";
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: _ajaxType,
                    data: JSON.stringify(parentData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        viewModel.search();
                        viewModel.retListPanel();
                    }
                })
            }
        },
        //取消单据
        cancelBill: function() {
            // var curRow = viewModel.ActivityPriceAdjustList.getCurrentRow();
            // // 修改，则还原
            // if(curRow.getValue("id")) {
            //   curRow.setSimpleData(viewModel.ActivityPriceAdjustList.originEditData)
            // }
            // // 新增或复制，则删除
            // else {
            //   viewModel.ActivityPriceAdjustList.removeRow(curRow);
            //   viewModel.ActivityPriceAdjustItems.removeAllRows();
            // }
            viewModel.search();
            viewModel.retListPanel();
        },
        //启用
        enable: function() {
            var selectedRows = viewModel.ActivityPriceAdjustList.getSelectedRows();
            var ids = selectedRows.map(function(row, index, arr) {
                return row.getValue("id");
            })
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/enable",
                data: { ids: ids.join(",") },
                success: function(res) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        selectedRows[i].setValue("enableStatus", "1");
                    }
                }
            })
        },
        //参照选择批量新增子表
        showAddItemsRef: function() {
            var activityId = viewModel.ActivityPriceAdjustList.getValue("promoActivityId");
            if (!activityId) {
                toastr.error("请先录入活动信息");
                return;
            }
            viewModel.clearItemsRef();
            var refparam = {};
            var constparam = viewModel.ProductTabRefList.getMeta("productref", "refparam");
            if (!constparam) {
                constparam = {};
            } else {
                constparam = JSON.parse(constparam);
            }
            var varparam = { activityId: activityId };
            $.extend(refparam, constparam, varparam);
            $("#addItemsRef").attr("data-refparam", JSON.stringify(refparam));
            $("#addItemsRef .refer").trigger("click");
        },
        //清空已选产品组合参照
        clearItemsRef: function() {
            viewModel.ProductTabRefList.setValue("productref", "");
            var refer = $("#refContainerproductref").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
        },
        // 展示产品BOM
        showBOM: function() {
            setTimeout(function() {
                var curItemRow = viewModel.ActivityPriceAdjustItems.getCurrentRow();
                viewModel.BomPriceTree.removeAllRows();
                var existBOM = curItemRow.getValue("lowerDtos").getSimpleData();
                if (existBOM) {
                    var orderedBOM = common.treeUtil.orderTreeByLevel(existBOM, "id", "upperClass");
                    viewModel.BomPriceTree.setSimpleData(orderedBOM);
                }
                if (dialog_bomprice) {
                    dialog_bomprice.show();
                } else {
                    dialog_bomprice = u.dialog({ content: "#dialog_bomprice", hasCloseMenu: true, width: "900px" });
                }
            }, 0)
        },
        // Bom取消
        cancelBom: function() {
            dialog_bomprice.hide();
        },
        // Bom确认
        confirmBom: function() {
            var curItemRow = viewModel.ActivityPriceAdjustItems.getCurrentRow();
            var newBOM = viewModel.BomPriceTree.getSimpleData();
            curItemRow.getValue("lowerDtos").setSimpleData(newBOM);
            // Bom顶级行的价格赋值给当前表体行
            var bomData = viewModel.BomPriceTree.getSimpleData();
            for (var i = 0; i < bomData.length; i++) {
                if (!bomData[i].upperClass) {
                    curItemRow.setValue("price", bomData[i].price);
                    break;
                }
            }
            dialog_bomprice.hide();
        },
        // 批量复制
        batchCopy: function() {
            var selectedRow = viewModel.ActivityPriceAdjustList.getSelectedRows();
            if (selectedRow.length != 1) {
                toastr.error("请选择一条数据");
                return;
            }
            // 销售主体为“全友”且审核状态为“已审核（包括弃审）”的批发活动价才可以批量复制
            var approveStatus = selectedRow[0].getValue("auditStatus");
            if (!(selectedRow[0].getValue("saleEntity") == "00" && approveStatus == "1")) {
                toastr.error("销售主体为“全友”且审核状态为“已审核”的调价单才可以批量复制");
                return;
            }
            viewModel.clearCopyOrgRef();
            $("#copyorgref .refer").trigger("click");
        },
        // 清除批量复制-组织参照
        clearCopyOrgRef: function() {
            viewModel.CopyOrgRef.setValue("copyorgref", "");
            var refer = $("#refContainercopyorgref").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
        },
        // 审核
        approve: function() {
            var selectedRow = viewModel.ActivityPriceAdjustList.getSelectedRows();
            if (selectedRow.length != 1) {
                toastr.error("请选择一条数据");
                return;
            }
            if (selectedRow[0].getValue("auditStatus") == "1") {
                toastr.error("已审核数据不可重复审核");
                return;
            }
            var sysTime = new Date();
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + "/servertime",
                async: false,
                success: function(date) {
                    sysTime = new Date(date);
                }
            });
            var effectiveDate = viewModel.ActivityPriceAdjustList.getValue("effectiveDate");
            effectiveDate = new Date(effectiveDate);
            var effectiveDateFmt = u.date.format(effectiveDate, "YYYY年MM月DD日");
            //调价日期 < 服务器日期，提示用户立即生效
            //调价日期 > 服务器日期，提示用户创建定时任务
            var msg1 = "";
            var msg2 = "";
            if (effectiveDate <= sysTime) {
                msg1 = "是否继续？";
                msg2 = "审核后将立即修改价格";
            } else {
                msg1 = "是否继续？";
                msg2 = "审核后将在" + effectiveDateFmt + "修改价格";
            }
            common.dialog.confirmDialog({
                msg1: msg1,
                msg2: msg2,
                width: '400px',
                type: 'error',
                onOk: function() {
                    var id = viewModel.ActivityPriceAdjustList.getValue("id");
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/approve",
                        data: { id: id },
                        success: function(data) {
                            viewModel.search();
                        }
                    })
                }
            })
        },
        // 递归卷积计算上级价格
        setUpperPrice: function(curRow) {
            var parentId = curRow.getValue("upperClass");
            var parnetRow = viewModel.BomPriceTree.getRowByField("id", parentId);
            // 父级不存在，则当前行已经是顶级，退出递归
            if (!parnetRow) {
                return;
            }
            var childRows = viewModel.BomPriceTree.getRowsByField("upperClass", parentId);
            var sum = 0;
            for (var i = 0; i < childRows.length; i++) {
                var num = childRows[i].getValue("num");
                num = parseInt(num);
                var price = childRows[i].getValue("price");
                price = parseFloat(price);
                if (Number.isNaN(num) || Number.isNaN(price)) {
                    console.log("数量或价格信息不完整");
                    return;
                }
                sum += price * num;
            }
            parnetRow.setValue("price", sum);
            viewModel.setUpperPrice(parnetRow);
        },
        // 详情页跳转单据页
        detail2bill: function() {
            if (!viewModel.canInEdit()) return
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
            common.bill.detail2bill();
        },
        // 选中活动后事件：1.带入活动其他字段;
        afterSelectActivity: function(promActivityId) {
            var refValues = $("#refContainerpromoActivityId").data("uui.refer").values;
            if (refValues && refValues.length == 1) {
                var curRow = viewModel.ActivityPriceAdjustList.getCurrentRow();
                curRow.setValue("promoActivityName", refValues[0].refname);
                curRow.setValue("promoActivityDescription", refValues[0].description);
                var startDate = refValues[0].orderStartDate;
                if (startDate) {
                    startDate = new Date(startDate);
                    curRow.setValue("promoActivityOrderStartDate", startDate.getTime());
                }
                var endDate = refValues[0].orderEndDate;
                if (endDate) {
                    endDate = new Date(endDate);
                    curRow.setValue("promoActivityOrderEndDate", endDate.getTime());
                }
                // 手动触发订货日期格式化函数
                // if(startDate || endDate) {
                //   viewModel.ActivityPriceAdjustList.setRowFocus(viewModel.ActivityPriceAdjustList.getCurrentIndex(), false, true);
                // }
            }
        },
        // 清空活动后事件：
        afterClearActivity: function() {
            viewModel.ActivityPriceAdjustList.setValue("promoActivityName", undefined);
            viewModel.ActivityPriceAdjustList.setValue("promoActivityDescription", undefined);
            viewModel.ActivityPriceAdjustList.setValue("promoActivityOrderStartDate", undefined);
            viewModel.ActivityPriceAdjustList.setValue("promoActivityOrderEndDate", undefined);
            // viewModel.ActivityPriceAdjustList.setRowFocus(viewModel.ActivityPriceAdjustList.getCurrentIndex(), false, true);
        },
        retListPanel: function() {
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
            common.bill.retListPanel();
        },
        //审批流添加功能----提交审批
        submit: function() {
            var selectedData = viewModel.ActivityPriceAdjustList.getSimpleData({ type: 'select' });
            if (selectedData.length == 0) {
                toastr.error("请选择数据");
                return;
            }
            if (selectedData[0].state && selectedData[0].state != '0') { //状态不为待确认
                toastr.error("该单据已经使用关联流程，不能启动", "error");
                return;
            }
            for (var i = 0; i < selectedData.length; i++) {
                selectedData[i].details = [];
            }
            $.ajax({
                type: 'GET',
                url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=activitypriceadjust&nodekey=001',
                datatype: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function(result) {
                    if (result) {
                        if (result.success == 'success') {
                            var data = result.detailMsg.data;
                            var processDefineCode = data.res_code;
                            viewModel.submitBPMByProcessDefineCode(selectedData, processDefineCode);
                        } else {
                            toastr.error(data.detailMsg.msg);
                        }

                    } else {
                        toastr.error("无返回数据");
                    }
                }
            })
        },
        submitBPMByProcessDefineCode: function(selectedData, processDefineCode) {
            var nodeJs = "/ocm-web/pages/prom/activitypriceadjust/activitypriceadjust.js";
            //  nodeJs = encodeURIComponent(nodeJs);
            $.ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/submit?processDefineCode=" + processDefineCode + "&nodeJs=" + nodeJs,
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(selectedData),
                success: function(res) {
                    if (res) {
                        if (res.success == 'success') {
                            toastr.success();
                            viewModel.search();
                        } else {
                            toastr.error(res.message);
                        }
                    } else {
                        toastr.error("无返回数据");
                    }
                }

            });
        },
        // 子表编辑前事件：
        // 对于办事处分区列：若销售主体为独合资办，则根据销售组织更新办事处分区参照查询条件（销售组织必须在办事处分区下属办事处集合中）
        itemBeforeEdit: function(obj) {
            if (obj.gridObj.gridCompColumnArr[obj.colIndex].options.field === "agencypartitionId") {
                var saleOrgId = viewModel.ActivityPriceAdjustList.getValue("saleOrgId");
                if (!saleOrgId) {
                    toastr.error("请先录入销售组织");
                    return false;
                }
                var saleEntity = viewModel.ActivityPriceAdjustList.getValue("saleEntity");
                if (saleEntity == "01") { //独合资办
                    var constparam = viewModel.ActivityPriceAdjustItems.getMeta("agencypartitionId", "refparam");
                    constparam = JSON.parse(constparam);
                    var varparam = {
                        "EQ_agencyPartitionDetailSet.agency.id": saleOrgId,
                    };
                    var param = {};
                    $.extend(param, constparam, varparam);
                    viewModel.ActivityPriceAdjustItems.setMeta("agencypartitionId", "refparam", JSON.stringify(param));
                } else { //全友
                    viewModel.ActivityPriceAdjustItems.setMeta("agencypartitionId", "refparam", '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}');
                }
            }
            return true;
        }
    }
    viewModel = u.extend({}, baseData, events, rendertype/*, bpmopenbill.model*/);

    function appInit(element, params) {
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        window.initButton(viewModel, element); //初始化按钮权限
        ko.cleanNode(element);
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        window.app = app;
        // 查询组件初始化
        searcher = new searchbox(
            $("#ActivityPriceAdjust-searchcontent")[0], [{
                    type: "text",
                    key: "code",
                    label: "调价单编码",
                },
                {
                    type: "text",
                    key: "name",
                    label: "调价单名称",
                },
                {
                    type: "combo",
                    key: "auditStatus",
                    label: "审核状态",
                    dataSource: CONST.APPROVE,
                },
                {
                    type: "text",
                    key: "promoActivity--code",
                    label: "活动编码",
                },
                {
                    type: "text",
                    key: "promoActivity--name",
                    label: "活动名称",
                },
                {
                    type: "daterange",
                    key: "promoActivity--orderStartDate",
                    label: "订货开始日期",
                },
                {
                    type: "daterange",
                    key: "promoActivity--orderEndDate",
                    label: "订货截至日期",
                },
                {
                    type: "combo",
                    key: "saleEntity",
                    label: "销售主体",
                    dataSource: CONST.SALEENTITY,
                    hasAll: true
                },
                {
                    type: "refer",
                    key: "saleOrg--id",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    multi: true,
                    clientParam: { "EQ_isSaleOrganization": "1", "EQ_isEnable": "1" }
                },
            ]);
        searcher_detailrefer = new searchbox(
            $("#pricerefer-searchcontent")[0], [
                // {
                //  type:"text",
                //  key:"showCode",
                //  label:"产品编码",
                // },
                {
                    type: "text",
                    key: "showName",
                    label: "产品名称",
                },
                {
                    type: "refer",
                    key: "product--prodGroup--id",
                    label: "产品组",
                    refinfo: "productGroup",
                    multi: true,
                },
                {
                    type: "refer",
                    key: "product--productSaleSeries--id",
                    label: "产品系列",
                    refinfo: "productSaleSeries",
                    multi: true,
                },
                {
                    type: "combo",
                    key: "channel",
                    label: "渠道类型",
                    dataSource: CONST.CHANNELTYPE,
                    hasAll: true,
                },
                {
                    type: "refer",
                    key: "agencypartition--id",
                    label: "办事处分区",
                    refinfo: "agencypartitiongrid",
                    multi: true,
                },
                {
                    type: "refer",
                    key: "office--id",
                    label: "办事处",
                    refinfo: "organization_ocm",
                    clientParam: { "EQ_isOffice": "1" },
                    multi: true,
                },
                {
                    type: "text",
                    key: "customer--id",
                    label: "客户",
                    //  refinfo:"customer",
                },
            ]);
        // 列表查询数据(无查询条件)
        viewModel.search();
        // 子表参照聚焦行，用于绑定子表参照组件
        var refRow = viewModel.ProductTabRefList.createEmptyRow();
        viewModel.ProductTabRefList.setRowFocus(refRow);
        // 批量复制-组织参照
        var orgRefRow = viewModel.CopyOrgRef.createEmptyRow();
        viewModel.CopyOrgRef.setRowFocus(orgRefRow);
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#ActivityPriceAdjust-searchcontent input').off("keydown").on("keydown", function(e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        // 活动+销售主体+销售组织 --》 询价上浮系数联动
        viewModel.ActivityPriceAdjustList.on("valuechange", function(obj) {
            if (obj.field == "promoActivityId" || obj.field == "saleOrgId") {
                var promoActivityId = obj.rowObj.getValue("promoActivityId");
                var saleOrgId = obj.rowObj.getValue("saleOrgId");
                if (promoActivityId && saleOrgId) {
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/getFloatName",
                        data: {
                            activityId: promoActivityId,
                            saleOrgId: saleOrgId
                        },
                        success: function(floatRatioName) {
                            obj.rowObj.setValue("floatRatioName", floatRatioName);
                        }
                    })
                }
            }
        });
        // 产品/产品组合增行
        viewModel.ProductTabRefList.on("productref.valuechange", function(obj) {
            // 清空参照时不增行
            if (!obj.newValue) {
                return;
            }
            var refer = $("#refContainerproductref").data("uui.refer");
            var refValues = refer.values;
            if (refValues && refValues.length > 0) {
                var products = [];
                for (var i = 0; i < refValues.length; i++) {
                    var product = {};
                    //产品
                    if (refValues[i].isproduct == "1") {
                        product.productId = refValues[i].refpk;
                        product.combineId = "";
                    }
                    //产品组合
                    else {
                        product.combineId = refValues[i].refpk;
                        product.productId = "";
                    }
                    products.push(product);
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/getBomProduct",
                    data: JSON.stringify(products),
                    contentType: "application/json; charset=utf-8",
                    success: function(items) {
                        viewModel.ActivityPriceAdjustItems.addSimpleData(items, u.Row.STATUS.NEW);
                    }
                })
            }
        });
        // 活动参照选择，1.带入活动其他字段;2.产品/产品组合参照-活动定义参数随之变化
        viewModel.ActivityPriceAdjustList.on("promoActivityId.valuechange", function(obj) {
            if (obj.ctx == "setold") return;
            var realRows = viewModel.ActivityPriceAdjustItems.getAllRealRows();
            if (realRows.length > 0) {
                common.dialog.confirmDialog({
                    msg1: '确认变更活动？',
                    msg2: '变更活动将清空产品信息',
                    width: '400px',
                    type: 'error',
                    onOk: function() {
                        viewModel.ActivityPriceAdjustItems.removeAllRows();
                        var promActivityId = obj.newValue;
                        if (!promActivityId) {
                            viewModel.afterClearActivity();
                        } else {
                            viewModel.afterSelectActivity();
                        }
                    },
                    onCancel: function() {
                        viewModel.ActivityPriceAdjustList.getCurrentRow().setValue("promoActivityId", obj.oldValue, "setold");
                    }
                })
            } else {
                var promActivityId = obj.newValue;
                if (!promActivityId) {
                    viewModel.afterClearActivity();
                } else {
                    viewModel.afterSelectActivity();
                }
            }
        });
        // 批量复制-组织选择确认
        viewModel.CopyOrgRef.on("copyorgref.valuechange", function(obj) {
            var orgIds = obj.newValue;
            if (!orgIds) {
                return;
            }
            var id = viewModel.ActivityPriceAdjustList.getSelectedRows()[0].getValue("id");
            var data = {
                saleOrg: orgIds,
                activityPriceAdjustId: id
            };
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/bacth-copy",
                data: data,
                success: function(list) {
                    // viewModel.ActivityPriceAdjustList.addSimpleData(list);
                    viewModel.cleanSearch();
                    viewModel.search(true);
                }
            })
        });
        // BOM末级价格变化，重新卷积计算上级价格直到顶级
        viewModel.BomPriceTree.on("price.valuechange", function(obj) {
            // 只有末级（包件）价格变化，才会触发卷积计算
            var rowObj = obj.rowObj;
            var id = rowObj.getValue("id");
            var childRows = viewModel.BomPriceTree.getRowsByField("upperClass", id);
            if (childRows.length == 0) {
                var price = rowObj.getValue("price");
                price = parseFloat(price);
                var arr = parseInt(price).toString().split('');
                var num = parseInt(arr[arr.length - 1]);
                if (num == 4 || num == 7) {
                    price += 1;
                    toastr.info("价格个位数如果是4则变更为5，如果是7则变更为8");
                    obj.rowObj.setValue("price", price);
                } else {
                    viewModel.setUpperPrice(rowObj);
                }
            }
        });
        // 销售主体变化，销售组织参照参数随之变化
        viewModel.ActivityPriceAdjustList.on("saleEntity.valuechange", function(obj) {
            obj.rowObj.setValue("saleOrgId", "");
            var param = obj.rowObj.getMeta("saleOrgId", "refparam");
            if (param) {
                param = JSON.parse(param);
            } else {
                param = {};
            }
            // 销售主体为全友 -> 销售组织  是销售组织且不是行政组织
            if (obj.newValue == "00") {
                param["salePrincipal"] = "00";
            }
            // 销售主体为独合资办 -> 销售组织  是销售组织且是行政组织
            else if (obj.newValue == "01") {
                param["salePrincipal"] = "01";
            }
            $("#orgRefer").attr("data-refparam", JSON.stringify(param));
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