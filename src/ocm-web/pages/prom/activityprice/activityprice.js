define(['text!./activityprice.html', 'ocm_common', 'searchbox', 'billfooter', 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, Billfooter) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, searcher, billfooter, dialog_priceformula, dialog_bomprice, dialog_bomprice_detail;
    baseData = {
        baseurl: '/activity-price',
        formulabaseurl: '/activity-price-formula',
        ActivityPriceList: new u.DataTable(ActivityPrice),
        ActivityPriceItems: new u.DataTable(ActivityPriceItem),
        ProductTabRefList: new u.DataTable(ProductTabRef),
        ActivityPriceFormulaList: new u.DataTable(ActivityPriceFormula),
        BomPriceTree: new u.DataTable(BomPrice),
        CopyOrgRef: new u.DataTable(CopyOrg),
        billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
        saleEntitySrc: CONST.SALEENTITY,
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,
        enableFmt: ko.pureComputed(function() {
            var enableStatus = viewModel.ActivityPriceItems.ref("enable_status")();
            return enableStatus == 1 ? "启用" : "停用";
        }),
        channeltypeSrc: ko.observable(CONST.CHANNELTYPE),
        dateFormat: common.format.dateFormat,
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
            var activityId = viewModel.ActivityPriceList.getValue("promoActivityId");
            if (!activityId) {
                toastr.error("请先录入活动信息");
                return;
            }
            var realRows = viewModel.ActivityPriceItems.getAllRealRows();
            if (realRows.length > 0) {
                toastr.error("表体已存在数据，不可导入");
                return;
            }
            var urlInfo = viewModel.baseurl + "/getDataFromExcelDataImport"; //倒入地址参数
            // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
            var ele = $('#importFiel')[0]; //挂载元素
            var setDate = function(data) {
                viewModel.ActivityPriceItems.setSimpleData(data, { status: "new" });
            };
            common.fileHandle.importToPage(urlInfo, ele, setDate);
        },
        //导出
        exportHandle: function() {
            var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
            var listData = viewModel.ActivityPriceItems; //需要导出表格的dataTable
            var searchParams = {}; //搜索查询参数
            var id = viewModel.ActivityPriceList.getCurrentRow().getValue("id");
            var ele = undefined;
            if (id) {
                searchParams['search_EQ_activityPrice.id'] = id;
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
                viewModel.ActivityPriceList.pageIndex(0);
            }
            viewModel.ActivityPriceList.removeAllRows();
            var queryData = searcher.getDataWithOpr();
            var pageSize = viewModel.ActivityPriceList.pageSize();
            var pageNumber = viewModel.ActivityPriceList.pageIndex();
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.ActivityPriceList.setSimpleData(data.content, { unSelect: true });
                    viewModel.ActivityPriceList.totalRow(data.totalElements);
                    viewModel.ActivityPriceList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function() {
            searcher.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
            viewModel.ActivityPriceList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
            viewModel.ActivityPriceList.pageSize(size);
            viewModel.search(true);
        },
        //删除和批量删除
        del: function(data) {
            if (typeof(data) == 'number') {
                viewModel.ActivityPriceList.setRowSelect(data);
            }
            var ids = [];
            var rows = viewModel.ActivityPriceList.getSelectedRows();
            if (rows.length == 0) {
                toastr.error("请选择数据");
                return;
            }
            if (rows && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].getValue("promoActivityApproveStatus") == "1") {
                        toastr.error("已审核数据不可删除");
                        return;
                    }
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
                            viewModel.ActivityPriceList.removeRows(rows);
                        }
                    });

                }
            });
        },
        //进入新增单据页
        showAddBillPanel: function() {
            var curRow = viewModel.ActivityPriceList.createEmptyRow();
            viewModel.ActivityPriceList.setRowFocus(curRow);
            viewModel.ActivityPriceItems.removeAllRows();
            viewModel.ActivityPriceFormulaList.removeAllRows();
            viewModel.goBillPanel();
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;

        },
        canInEdit: function() {
            var canIn = true;
            var approveStatus = viewModel.ActivityPriceList.getValue("promoActivityApproveStatus");
            if (approveStatus == "1") {
                toastr.error("已审核数据不可编辑");
                canIn = false;
            }
            return canIn;
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
            viewModel.ActivityPriceList.setRowFocus(index);
            if (!viewModel.canInEdit()) {
                return;
            }
            var id = viewModel.ActivityPriceList.getValue("id");
            viewModel.ActivityPriceList.originEditData = viewModel.ActivityPriceList.getFocusRow().getSimpleData();
            viewModel.findByParentid(id);
            viewModel.goBillPanel();
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        },
        //详情
        detail: function() {
            //确保grid先将行设置为focus状态
            setTimeout(function() {
                var curRow = viewModel.ActivityPriceList.getCurrentRow();
                var id = curRow.getValue("id");
                viewModel.findByParentid(id);
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
                    viewModel.ActivityPriceItems.setSimpleData(data.detailList);
                    viewModel.ActivityPriceFormulaList.setSimpleData(data.formulaList);
                }
            })
        },
        //删除子表项
        delItems: function() {
            var selectedRows = viewModel.ActivityPriceItems.getSelectedRows();
            for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("dr", "1");
            }
            viewModel.ActivityPriceItems.removeRows(selectedRows);
        },
        //保存单据
        saveBill: function() {
            var result = app.compsValidateMultiParam({ element: ".ui-bill-panel", showMsg: true });
            if (!result.passed) {
                return;
            }
            var productCombineData = viewModel.ActivityPriceList.getCurrentRow().getSimpleData();
            var ActivityPriceItemsData = viewModel.ActivityPriceItems.getSimpleData();
            var formulaData = viewModel.ActivityPriceFormulaList.getSimpleData();
            productCombineData.details = ActivityPriceItemsData;
            productCombineData.formulas = formulaData;
            var _ajaxType = viewModel.ActivityPriceList.getValue("id") ? "put" : "post";
            $._ajax({
                url: appCtx + viewModel.baseurl,
                type: _ajaxType,
                data: JSON.stringify(productCombineData),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    // viewModel.ActivityPriceList.getFocusRow().setSimpleData(data);
                    viewModel.search();
                    viewModel.retListPanel();
                }
            })
        },
        //取消单据
        cancelBill: function() {
            viewModel.search();
            viewModel.retListPanel();
            // var curRow = viewModel.ActivityPriceList.getCurrentRow();
            // // 修改，则还原
            // if(curRow.getValue("id")) {
            //   curRow.setSimpleData(viewModel.ActivityPriceList.originEditData)
            // }
            // // 新增或复制，则删除
            // else {
            //   viewModel.ActivityPriceList.removeRow(curRow);
            //   viewModel.ActivityPriceItems.removeAllRows();
            // }
            // viewModel.retListPanel();
        },
        //启用
        enable: function() {
            var selectedRows = viewModel.ActivityPriceList.getSelectedRows();
            if (selectedRows.length == 0) {
                toastr.error("请选择数据");
                return
            }
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
        //停用
        disable: function() {
            var selectedRows = viewModel.ActivityPriceList.getSelectedRows();
            if (selectedRows.length == 0) {
                toastr.error("请选择数据");
                return
            }
            var ids = selectedRows.map(function(row, index, arr) {
                return row.getValue("id");
            })
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/disable",
                data: { ids: ids.join(",") },
                success: function(res) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        selectedRows[i].setValue("enableStatus", "0");
                    }
                }
            })
        },
        // 启用价格子表项
        enableItems: function() {
            var selectedRows = viewModel.ActivityPriceItems.getSelectedRows();
            selectedRows.forEach(function(row) {
                row.setValue("enable_status", 1);
            })
        },
        // 停用价格子表项
        disableItems: function(request) {
            var selectedRows = viewModel.ActivityPriceItems.getSelectedRows();
            // 发送停用请求
            if (request == 1) {
                var ids = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    if (selectedRows[i].getValue("enable_status") == "1") {
                        ids.push(selectedRows[i].getValue("id"));
                    }
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/detail-batch-disable",
                    data: { ids: ids.join(",") },
                    success: function() {
                        selectedRows.forEach(function(row) {
                            row.setValue("enable_status", 0);
                        })
                    }
                })
            } else {
                selectedRows.forEach(function(row) {
                    row.setValue("enable_status", 0);
                })
            }
        },
        //参照选择批量新增子表
        showAddItemsRef: function() {
            // 选择产品前必须先选择活动
            var activityId = viewModel.ActivityPriceList.getValue("promoActivityId");
            if (!activityId) {
                toastr.error("请先录入活动信息");
                return;
            }
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
            viewModel.clearItemsRef();
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
                var curItemRow = viewModel.ActivityPriceItems.getCurrentRow();
                var itemId = curItemRow.getValue("id");
                viewModel.BomPriceTree.removeAllRows();
                var existBOM = curItemRow.getValue("lowerDtos").getSimpleData();
                if (itemId && existBOM.length == 0) {
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/detail",
                        async: false,
                        data: { detailId: itemId },
                        success: function(bom) {
                            existBOM = bom;
                        }
                    })
                }
                var orderedBOM = common.treeUtil.orderTreeByLevel(existBOM, "id", "upperClass");
                viewModel.BomPriceTree.setSimpleData(orderedBOM);
                // 详情页不可编辑产品BOM
                var isDetail = $(".ui-bill-detail:visible")[0];
                if (isDetail) {
                    if (dialog_bomprice_detail) {
                        dialog_bomprice_detail.show();
                    } else {
                        dialog_bomprice_detail = u.dialog({ content: "#dialog_bomprice_detail", hasCloseMenu: true, width: "900px" });
                    }
                } else {
                    if (dialog_bomprice) {
                        dialog_bomprice.show();
                    } else {
                        dialog_bomprice = u.dialog({ content: "#dialog_bomprice", hasCloseMenu: true, width: "900px" });
                    }
                }
            }, 0)
        },
        // Bom取消
        cancelBom: function() {
            dialog_bomprice.hide();
        },
        // Bom确认
        confirmBom: function() {
            var curItemRow = viewModel.ActivityPriceItems.getCurrentRow();
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
        // 详情Bom确认
        confirmBomDetail: function() {
            dialog_bomprice_detail.hide();
        },
        // 引用促销基础价
        importBasePrice: function() {
            var activityId = viewModel.ActivityPriceList.getValue("promoActivityId");
            if (!activityId) {
                toastr.error("请先录入活动信息");
                return;
            }
            var realRows = viewModel.ActivityPriceItems.getAllRealRows();
            if (realRows.length > 0) {
                toastr.error("已存在表体数据，不可引用");
                return;
            }
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/promo_basicproduct",
                data: { activityId: activityId },
                success: function(items) {
                    if (items && items.length > 0) {
                        viewModel.ActivityPriceItems.setSimpleData(items, { status: u.Row.STATUS.NEW });
                    }
                }
            })
        },
        // 价格公式
        showPriceFormula: function() {
            // 批发基础价表参照根据销售组织过滤
            var saleOrgId = viewModel.ActivityPriceList.getValue("saleOrgId");
            if (!saleOrgId) {
                toastr.error("请先录入销售组织");
                return
            }
            // 产品编码根据活动过滤
            var activityId = viewModel.ActivityPriceList.getValue("promoActivityId");
            if (!activityId) {
                toastr.error("请先录入活动");
                return;
            }
            var prodParam = viewModel.ActivityPriceFormulaList.getMeta("showId", "refparam");
            prodParam = JSON.parse(prodParam);
            prodParam = prodParam ? prodParam : {};
            prodParam["activityId"] = activityId;
            prodParam = JSON.stringify(prodParam);
            viewModel.ActivityPriceFormulaList.setMeta("showId", "refparam", prodParam);
            var param = viewModel.ActivityPriceFormulaList.getMeta("basicPriceId", "refparam");
            param = JSON.parse(param);
            param["EQ_saleOrg.id"] = saleOrgId;
            param = JSON.stringify(param);
            viewModel.ActivityPriceFormulaList.setMeta("basicPriceId", "refparam", param);
            // 保存原始价格公式，用于取消时还原
            viewModel.ActivityPriceFormulaList.originFormula = viewModel.ActivityPriceFormulaList.getDataByRule("all");
            if (!dialog_priceformula) {
                dialog_priceformula = u.dialog({ content: "#dialog_priceformula", hasCloseMenu: true, "width": "900px", closeFun: viewModel.closeFormula });
            } else {
                dialog_priceformula.show();
            }
        },
        // 价格公式增行
        addPriceFormula: function() {
            viewModel.ActivityPriceFormulaList.createEmptyRow({ unSelect: true });
        },
        // 价格公式删行
        delPriceFormula: function() {
            var selectedRows = viewModel.ActivityPriceFormulaList.getSelectedRows();
            viewModel.ActivityPriceFormulaList.removeRows(selectedRows);
        },
        // 价格公式确认
        confirmPriceFormula: function() {
            // 产品或产品系列唯一性校验
            var allRows = viewModel.ActivityPriceFormulaList.getAllRealRows();
            var productMap = {}; //<产品或组合id, 价格公式中出现次数>
            var seriesMap = {}; //<产品系列id, 价格公式中出现次数（对于没有录入产品编码的数据）>
            for (var i = 0; i < allRows.length; i++) {
                // 有产品则优先使用产品
                var showId = allRows[i].getValue("showId");
                if (showId) {
                    if (productMap[showId]) {
                        productMap[showId].push(i);
                    } else {
                        productMap[showId] = [i];
                    }
                }
                // 没有产品，使用产品系列
                else {
                    var seriesId = allRows[i].getValue("prodSeriesId");
                    !seriesId ? seriesId = "empty" : "";
                    if (seriesMap[seriesId]) {
                        seriesMap[seriesId].push(i);
                    } else {
                        seriesMap[seriesId] = [i];
                    }
                }
            }
            var repeatedIndex = [];
            // 获取重复的产品
            for (var productKey in productMap) {
                if (productMap[productKey].length > 1) {
                    productMap[productKey].forEach(function(rowIndex) {
                        repeatedIndex.push(rowIndex);
                    })
                }
            }
            // 获取重复的产品系列
            for (var seriesKey in seriesMap) {
                if (seriesMap[seriesKey].length > 1) {
                    seriesMap[seriesKey].forEach(function(rowIndex) {
                        repeatedIndex.push(rowIndex);
                    })
                }
            }
            if (repeatedIndex.length > 0) {
                viewModel.ActivityPriceFormulaList.setRowsSelect(repeatedIndex);
                toastr.error("产品或产品系列重复");
            } else {
                dialog_priceformula.hide();
            }
        },
        // 价格公式取消
        closeFormula: function() {
            viewModel.ActivityPriceFormulaList.removeAllRows();
            viewModel.ActivityPriceFormulaList.setData(viewModel.ActivityPriceFormulaList.originFormula);
        },
        // 批量复制
        batchCopy: function() {
            var selectedRow = viewModel.ActivityPriceList.getSelectedRows();
            if (selectedRow.length != 1) {
                toastr.error("请选择一条数据");
                return;
            }
            // 销售主体为“全友”且审核状态为“未审核（包括弃审）”的批发活动价才可以批量复制
            var approveStatus = selectedRow[0].getValue("promoActivityApproveStatus");
            if (!(selectedRow[0].getValue("saleEntity") == "00" && (approveStatus == "0" || approveStatus == "2"))) {
                toastr.error("销售主体为“全友”且审核状态为“未审核”的批发活动价才可以批量复制");
                return;
            }
            //TODO: 只能复制给尚未制定批发活动价并且销售主体为“独合资办”的销售组织
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
            if (!viewModel.canInEdit()) {
                return;
            }
            common.bill.detail2bill();
        },
        // 选中活动后事件：1.带入活动其他字段;2.产品/产品组合参照-活动定义参数随之变化
        afterSelectActivity: function(promActivityId) {
            var data = { activityId: promActivityId };
            $("#addItemsRef").attr("data-refparam", JSON.stringify(data));
            var refValues = $("#refContainerpromoActivityId").data("uui.refer").values;
            if (refValues && refValues.length == 1) {
                var curRow = viewModel.ActivityPriceList.getCurrentRow();
                curRow.setValue("promoActivityName", refValues[0].refname);
                curRow.setValue("promoActivityDescription", refValues[0].description);
                var startDate = refValues[0].orderStartDate;
                if (startDate) {
                    startDate = new Date(startDate);
                    viewModel.ActivityPriceList.setValue("promoActivityOrderStartDate", startDate.getTime());
                }
                var endDate = refValues[0].orderEndDate;
                if (endDate) {
                    endDate = new Date(endDate);
                    curRow.setValue("promoActivityOrderEndDate", endDate.getTime());
                }
                // 手动触发订货日期格式化函数
                if (startDate || endDate) {
                    viewModel.ActivityPriceList.setRowFocus(viewModel.ActivityPriceList.getCurrentIndex(), false, true);
                }
            }
        },
        // 清空活动后事件：
        afterClearActivity: function() {
            viewModel.ActivityPriceList.setValue("promoActivityName", undefined);
            viewModel.ActivityPriceList.setValue("promoActivityDescription", undefined);
            viewModel.ActivityPriceList.setValue("promoActivityOrderStartDate", undefined);
            viewModel.ActivityPriceList.setValue("promoActivityOrderEndDate", undefined);
            viewModel.ActivityPriceList.setRowFocus(viewModel.ActivityPriceList.getCurrentIndex(), false, true);
        },
        // 子表编辑前事件：
        // 对于办事处分区列：若销售主体为独合资办，则根据销售组织更新办事处分区参照查询条件（销售组织必须在办事处分区下属办事处集合中）
        itemBeforeEdit: function(obj) {
            if (obj.gridObj.gridCompColumnArr[obj.colIndex].options.field === "agencypartitionId") {
                var saleOrgId = viewModel.ActivityPriceList.getValue("saleOrgId");
                if (!saleOrgId) {
                    toastr.error("请先录入销售组织");
                    return false;
                }
                var saleEntity = viewModel.ActivityPriceList.getValue("saleEntity");
                if (saleEntity == "01") { //独合资办
                    var constparam = viewModel.ActivityPriceItems.getMeta("agencypartitionId", "refparam");
                    constparam = JSON.parse(constparam);
                    var varparam = {
                        "EQ_agencyPartitionDetailSet.agency.id": saleOrgId,
                    };
                    var param = {};
                    $.extend(param, constparam, varparam);
                    viewModel.ActivityPriceItems.setMeta("agencypartitionId", "refparam", JSON.stringify(param));
                } else { // 全友
                    viewModel.ActivityPriceItems.setMeta("agencypartitionId", "refparam", '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}');
                }
            }
            return true;
        },
        // 导入价格公式
        importPriceFormula: function() {
            var realRows = viewModel.ActivityPriceFormulaList.getAllRealRows();
            if (realRows.length > 0) {
                toastr.error("价格公式已存在数据，不可导入");
                return;
            }
            var urlInfo = viewModel.formulabaseurl + "/getDataFromExcelDataImport"; //倒入地址参数
            // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
            var ele = $('#importFormula')[0]; //挂载元素
            var setDate = function(data) {
                viewModel.ActivityPriceFormulaList.setSimpleData(data, { status: "new" });
            };
            common.fileHandle.importToPage(urlInfo, ele, setDate);
        },
        // 导出价格公式
        exportPriceFormula: function() {
            var templateUrl = viewModel.formulabaseurl + '/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = viewModel.formulabaseurl + '/excelDataExport'; //导出数据地址参数
            var listData = viewModel.ActivityPriceFormulaList; //需要导出表格的dataTable
            var searchParams = {}; //搜索查询参数
            var id = viewModel.ActivityPriceList.getCurrentRow().getValue("id");
            var ele = undefined;
            if (id) {
                searchParams['search_EQ_activityPrice.id'] = id;
                ele = $('#exportFiel')[0]; //挂载元素
            } else {
                ele = $('#exportFormula')[0]; //挂载元素
            }
            common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
        },
    }
    viewModel = u.extend({}, baseData, events, rendertype);

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
        // 查询组件初始化 TODO:参照字段查询，日期范围对应日期范围
        searcher = new searchbox(
            $("#ActivityPrice-searchcontent")[0], [{
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
                    clientParam: { "EQ_isSaleOrganization": "1", "EQ_isEnable": "1" },
                    multi: true,
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
                    key: "promoActivity--approveStatus",
                    label: "审核状态",
                    dataSource: CONST.APPROVESEARCH,
                    opr: "IN",
                },
                // {
                //   type:"combo",
                //   key:"saleEntity",
                //   label:"QY034",
                //   hasAll: true,
                //   url: appCtx + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY034",
                //   namefield: "name",
                //   valuefield: "id",
                // },
            ]);
        // 列表查询数据(无查询条件)
        viewModel.search();
        // 子表参照聚焦行，用于绑定子表参照组件
        var refRow = viewModel.ProductTabRefList.createEmptyRow();
        viewModel.ProductTabRefList.setRowFocus(refRow);
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#ActivityPrice-searchcontent input').off("keydown").on("keydown", function(e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
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
                        product.seriousId = refValues[i].saleSeriesId;
                    }
                    //产品组合
                    else {
                        product.productCombineId = refValues[i].refpk;
                    }
                    products.push(product);
                }
                var data = {};
                data.activityId = viewModel.ActivityPriceList.getValue("promoActivityId");
                data.formulaDtos = viewModel.ActivityPriceFormulaList.getSimpleData();
                data.parameters = products;
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/formula-price",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    success: function(items) {
                        var existItems = viewModel.ActivityPriceItems.getSimpleData();
                        !items ? items = [] : "";
                        for (var i = 0; i < items.length; i++) {
                            items[i].persistStatus = "new";
                        }
                        existItems = items.concat(existItems);
                        viewModel.ActivityPriceItems.setSimpleData(existItems, { unSelect: true }, true);
                    }
                })
            }
        });
        // 活动参照选择，已经存在产品子表时，提示用户变更则会清空产品子表；1.带入活动其他字段;2.产品/产品组合参照-活动定义参数随之变化
        viewModel.ActivityPriceList.on("promoActivityId.valuechange", function(obj) {
            if (obj.ctx == "setold") return;
            var realRows = viewModel.ActivityPriceItems.getAllRealRows();
            if (realRows.length > 0) {
                common.dialog.confirmDialog({
                    msg1: '确认变更活动？',
                    msg2: '变更活动将清空产品信息',
                    width: '400px',
                    type: 'error',
                    onOk: function() {
                        viewModel.ActivityPriceItems.removeAllRows();
                        var promActivityId = obj.newValue;
                        if (promActivityId) {
                            viewModel.afterSelectActivity(promActivityId);
                        }
                        // 清空活动
                        else {
                            viewModel.afterClearActivity();
                        }
                    },
                    onCancel: function() {
                        viewModel.ActivityPriceList.getCurrentRow().setValue("promoActivityId", obj.oldValue, "setold");
                    }
                })
            } else {
                var promActivityId = obj.newValue;
                if (promActivityId) {
                    viewModel.afterSelectActivity(promActivityId);
                } else {
                    viewModel.afterClearActivity();
                }
            }
        });
        // 批量复制-组织选择确认
        viewModel.CopyOrgRef.on("copyorgref.valuechange", function(obj) {
            var orgIds = obj.newValue;
            if (!orgIds) {
                return;
            }
            var activityPriceId = viewModel.ActivityPriceList.getSelectedRows()[0].getValue("id");
            var data = {
                saleOrg: orgIds,
                activityPriceId: activityPriceId
            };
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/bacth-copy",
                data: data,
                success: function(activityPriceList) {
                    viewModel.search();
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
        viewModel.ActivityPriceList.on("saleEntity.valuechange", function(obj) {
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