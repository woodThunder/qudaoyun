define(['text!./wholesalebaseprice.html', 'ocm_common', 'searchbox'/*,'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js'*/, './meta.js', 'ocm_global'], function(tpl, common, searchbox/*,bpmopenbill*/) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch, exportDialog, importDialog, singledocSearchChild, singledocSearchChildDetail;
    baseData = {
        baseurl: '/whole-sale-price',
        childListUrl: '/whole-sale-price-det',
        wholesalebasepriceList: new u.DataTable(wholesalebasepricemeta),
        wholesalebasepriceChild: new u.DataTable(wholesalebasepricechildmeta),
        ProductRef: new u.DataTable(ProductRef),
        PackRef: new u.DataTable(PackRef),
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,
        billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
        saleChannelDataSource: ko.observableArray([]),
        saleData: ko.observableArray([]),
        isAuditStatusComputed: ko.pureComputed(function() {
            var flag;
            var isAuditStatus = viewModel.wholesalebasepriceList.ref("auditStatus")();
            var isInvalidStatus = viewModel.wholesalebasepriceList.ref("invalidStatus")();
            if (isAuditStatus == "1" && isInvalidStatus == "1") {
                flag = true;
            } else {
                flag = false;
            }
            return flag;
        }),
        //监听销售主体和销售组织变化
        isEmptyAgency: ko.observable(false)
    };
    rendertype = {
        productRefRender: function(obj) {
            var referDOM = '' +
                '<div id="productRefShowDOM" class="input-group date form_date">' +
                '<input class="form-control" type="text" />' +
                '<span class="u-form-control-feedback fa fa-list-ul refer" data-bind="click: showRealProductRef"></span>' +
                '</div>'
            obj.element.innerHTML = referDOM;
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        packRefRender: function(obj) {
            var referDOM = '' +
                '<div id="packRefShowDOM" class="input-group date form_date">' +
                '<input class="form-control" type="text" />' +
                '<span class="u-form-control-feedback fa fa-list-ul refer" data-bind="click: showRealPackRef"></span>' +
                '</div>'
            obj.element.innerHTML = referDOM;
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        //跳转详情页
        detailRender: common.rendertype.detailRender,
        operation: common.rendertype.operation4auth,
        //判断表格里的状态
        //审核状态
        auditStatusGrid: function(obj) {
            var showValue = obj.value == "1" ? "已审核" : "未审核";
            obj.element.innerHTML = showValue;
        },
        //启用状态
        enabledGrid: function(obj) {
            var showValue = obj.value == "1" ? "启用" : "停用";
            obj.element.innerHTML = showValue;
        },
        //作废状态
        invalidStatusGrid: function(obj) {
            var showValue = obj.value == "1" ? "未作废" : "已作废";
            obj.element.innerHTML = showValue;
        }
    };
    events = {
        // 点击grid包件参照 触发外部真实包件参照
        showRealPackRef: function() {
            viewModel.clearRealPackRef();
            var productId = viewModel.wholesalebasepriceChild.getValue("productId");
            if (!productId) {
                toastr.error("请先录入包件");
                return;
            }
            $("#packRefer").attr("data-refparam", '{"EQ_isSaleProduct":"1","packId":"' + productId + '"}');
            $("#packRefer .refer").trigger("click");
        },
        // 清除参照之前的选择
        clearRealPackRef: function() {
            viewModel.PackRef.setValue("packRefer", "");
            var refer = $("#refContainerpackRefer").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
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
        //点击返回
        retListPanelFun: function() {
            viewModel.retListPanel();
            viewModel.wholesalebasepriceChild.pageIndex(0);
        },
        //时间限制
        disabledBegin: function(current) {
            var endTime = viewModel.wholesalebasepriceChild.getValue("endTime");
            if (endTime) {
                endTime = new Date(endTime).getTime();
                if (current) {
                    current = new Date(current.format("YYYY-MM-DD")).getTime();
                }
                return current && current > endTime;
            }
        },
        disabledEnd: function(current) {
            var beginTime = viewModel.wholesalebasepriceChild.getValue("beginTime");
            if (beginTime) {
                beginTime = new Date(beginTime).getTime();
                if (current) {
                    current = new Date(current.format("YYYY-MM-DD")).getTime();
                }
                return current && current < beginTime;
            }
        },
        //监测是否选了包件编码
        bomTreeBeforeEdit: function(obj) {
            var colIndex = obj.colIndex;
            var filedValue = obj.gridObj.gridCompColumnArr[colIndex].options.field;
            if (filedValue == "belongProductId") {
                var productId = viewModel.wholesalebasepriceChild.getRow(obj.rowIndex).getValue("productId");
                if (!productId) {
                    toastr.warning("请先选择包件编码");
                    return false;
                } else {
                    return true;
                }
            } else if (filedValue == "agencypartitionId" || filedValue == "agencyId") {
                var saleOrgId = viewModel.wholesalebasepriceList.getValue("saleOrgId");
                if (!saleOrgId) {
                    toastr.warning("请先选择销售组织");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        //导入
        importHandle: function() {
            var urlInfo = '/whole-sale-price-excel/excelDataImport'; //倒入地址参数
            var urlStatusInfo = '/whole-sale-price-excel/excelLoadingStatus'; //请求进度地址参数
            var ele = $('#importFiel')[0]; //挂载元素
            common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
        },
        //导出
        exportHandle: function() {
            var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
            var templateUrl = '/whole-sale-price-excel/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = '/whole-sale-price-excel/excelDataExport'; //导出数据地址参数
            var listData = viewModel.wholesalebasepriceList; //需要导出表格的dataTable
            var ele = $('#exportFiel')[0]; //挂载元素
            var judgeAuditStatus = true; //是否有审核条件导出限制，如果导出类型选择导出需修改的数据，已审核则不能导出
            common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl, judgeAuditStatus);
        },
        //导出字表
        exportChildHandle: function() {
            var id = viewModel.wholesalebasepriceList.getValue("id");
            var searchParams = singledocSearchChildDetail.getDataWithOpr(); //搜索查询参数
            searchParams['search_EQ_wholeSalePrice.id'] = id;
            var templateUrl = '/whole-sale-price-det-excel/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = '/whole-sale-price-det-excel/excelDataExport'; //导出数据地址参数
            var listData = viewModel.wholesalebasepriceChild; //需要导出表格的dataTable
            var ele = $('#exportFiel')[0]; //挂载元素
            //	  	  var judgeAuditStatus = true; //是否有审核条件导出限制，如果导出类型选择导出需修改的数据，已审核则不能导出
            common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
        },

        //编辑状态
        editHandle: function() {
            $(".searchChild-btn").show();
            var self = this;
            var isauditStatus = viewModel.wholesalebasepriceList.getValue("auditStatus");
            if (isauditStatus == "1" || isauditStatus == 1) {
                toastr.warning('该数据已审核不能编辑');
                return;
            }
            $(".ui-bill-detail").hide();
            $(".ui-bill-panel").show();
            viewModel.isEmptyAgency(false);
            var saleOrgName = viewModel.wholesalebasepriceList.getValue("saleOrgName");
            //				viewModel.wholesalebasepriceList.setValue("saleOrgCode","");
            //				viewModel.wholesalebasepriceList.setValue("saleOrgId","");
            $('#saleorg-ipt').val(saleOrgName);
            self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
            viewModel.wholesalebasepriceChild.pageIndex(0);
            viewModel.searchChildFun();
        },
        //删除和批量删除
        del: function(data, rowId) {
            if (typeof(data) == 'number') {
                viewModel.wholesalebasepriceList.setRowSelectbyRowId(rowId);
            }
            var ids = [];
            var rows = viewModel.wholesalebasepriceList.getSelectedRows();
            if (rows && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    var isauditStatus = rows[i].getValue("auditStatus");
                    if (isauditStatus == "1" || isauditStatus == 1) {
                        toastr.warning('该数据已审核不能删除');
                        return;
                    }
                    ids.push(rows[i].getValue("id"));
                }
            } else {
                toastr.warning('请选择数据');
                return;
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
                            viewModel.wholesalebasepriceList.removeRows(rows);
                            viewModel.search();
                        }
                    });
                }
            });
        },
        //进入新增单据页
        showAddBillPanel: function() {
            viewModel.isEmptyAgency(false);
            $(".searchChild-btn").hide();
            $(".searchChild-area").hide();
            var curRow = viewModel.wholesalebasepriceList.createEmptyRow();
            viewModel.wholesalebasepriceList.setRowFocus(curRow);
            curRow.setValue("auditStatus", "0");
            curRow.setValue("invalidStatus", "1");
            viewModel.goBillPanel();
            viewModel.wholesalebasepriceChild.removeAllRows();
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
            var saleOrgName = viewModel.wholesalebasepriceList.getValue("saleOrgName");
            //				viewModel.wholesalebasepriceList.setValue("saleOrgCode","");
            //				viewModel.wholesalebasepriceList.setValue("saleOrgId","");
            $('#saleorg-ipt').val(saleOrgName);
            viewModel.isEmptyAgency(false);
            $('.searchChild-btn').show();
            var isauditStatus = viewModel.wholesalebasepriceList.getRow(index).getValue("auditStatus");
            if (isauditStatus == "1" || isauditStatus == 1) {
                toastr.warning('该数据已审核不能编辑');
                return;
            }
            viewModel.wholesalebasepriceList.setRowFocus(index);
            viewModel.wholesalebasepriceList.originEditData = viewModel.wholesalebasepriceList.getFocusRow().getSimpleData();
            singledocSearchChild.clearSearch();
            viewModel.searchChildFun();
            viewModel.goBillPanel();
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;

            //给办事处参照塞条件
            var salePrincipalCode = viewModel.wholesalebasepriceList.getRow(index).getValue("salePrincipalCode");
            var saleOrgId = viewModel.wholesalebasepriceList.getRow(index).getValue("saleOrgId");
            if (salePrincipalCode == "01") {
                viewModel.wholesalebasepriceChild.setMeta("agencyId", "refparam", '{"EQ_parentOrganization.id":"' + saleOrgId + '","EQ_isOffice":"1","EQ_isEnable":"1"}');
                //当销售主体是独合资办时，此时设置参照不到办事处分区，故加"EQ_id":"aaa"条件
                viewModel.wholesalebasepriceChild.setMeta("agencypartitionId", "refparam", '{"EQ_id":"aaa","EQ_isContainBodys":"1","EQ_isEnable":"1"}');
            } else {
                viewModel.wholesalebasepriceChild.setMeta("agencyId", "refparam", '{"EQ_isOffice":"1","EQ_isEnable":"1"}');
                viewModel.wholesalebasepriceChild.setMeta("agencypartitionId", "refparam", '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}');
            }
        },

        //子表 删除和批量删除
        delChild: function() {
            var selectedRows = viewModel.wholesalebasepriceChild.getSelectedRows();
            if (selectedRows.length < 1) {
                toastr.warning("请选择数据");
                return;
            }
            viewModel.wholesalebasepriceChild.removeRows(selectedRows);
        },
        //子表增行
        addRow: function() {
            var emptyRow = viewModel.wholesalebasepriceChild.createEmptyRow({ unSelect: true });
            emptyRow.setValue("isEnable", "1");
        },
        //查看详情
        detail: function() {
            $('.searchChild-btn').show();
            var self = this;
            //确保grid先将行设置为focus状态
            setTimeout(function() {
                singledocSearchChildDetail.clearSearch();
                viewModel.searchChildFun();
                var id = viewModel.wholesalebasepriceList.getValue("id");
                //加入bpm按钮
                //viewModel.initBPMFromBill(id, viewModel);
                viewModel.goDetailPanel();
                viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
            }, 0);
        },

        //保存单据
        saveBill: function(index) {
            var type = "post";
            if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
                type = "put";
            }

            var productCombineData = viewModel.wholesalebasepriceList.getCurrentRow().getSimpleData();
            var wholesalebasepriceChildData = viewModel.wholesalebasepriceChild.getSimpleData();
            productCombineData.wholeSalePriceDets = wholesalebasepriceChildData;
            var validate = $("#validate")[0];
            var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
            if (result.passed) {
                if (viewModel.isEmptyAgency() && viewModel.billPanelStatus != CONST.BILLPANELSTATUS.ADD) {
                    common.dialog.confirmDialog({
                        msg1: '当前销售主体/销售组织发生变化，是否保存？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function() {
                            saveFun();
                        }
                    });
                } else {
                    saveFun();
                }
            }

            function saveFun() {
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(productCombineData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        viewModel.wholesalebasepriceList.getFocusRow().setSimpleData(data);
                        toastr.success();
                        if (index == -1) {
                            viewModel.retListPanel();
                            viewModel.search();
                            viewModel.wholesalebasepriceChild.pageIndex(0);
                            $("#paginationChild select").prop("disabled", false);
                        } else if (index == -2) {
                            viewModel.searchChildFun();
                        } else {
                            viewModel.wholesalebasepriceChild.pageIndex(0);
                            viewModel.searchChildFun();
                        }
                    }
                });
            }
        },
        //点击取消 单据页
        cancelHandle: function() {
            var curRow = viewModel.wholesalebasepriceList.getCurrentRow();
            // 修改，则还原
            if (curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.wholesalebasepriceList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.wholesalebasepriceList.removeRow(curRow);
                viewModel.wholesalebasepriceChild.removeAllRows();
            }
            viewModel.retListPanel();
            viewModel.wholesalebasepriceChild.pageIndex(0);
            $("#paginationChild select").prop("disabled", false);
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)--子表
        searchChild: function(reindex) {
            if (reindex) {
                viewModel.wholesalebasepriceChild.pageIndex(0);
            }
            if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT) {
                var flag = false;
                var childRows = viewModel.wholesalebasepriceChild.getAllRows();
                if (childRows.length > 0) {
                    for (var i = 0; i < childRows.length; i++) {
                        var status = childRows[i].status;
                        if (status != 'nrm') {
                            flag = true;
                        }
                    }
                }
                if (flag) {
                    common.dialog.confirmDialog({
                        msg1: '当前有修改，是否先保存后搜索？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function() {
                            viewModel.saveBill(-2);
                        },
                        onCancel: function() {}
                    });
                } else {
                    viewModel.searchChildFun();
                }
            } else {
                viewModel.searchChildFun();
            }
        },
        //搜索子表方法
        searchChildFun: function() {
            viewModel.wholesalebasepriceChild.removeAllRows();
            var id = viewModel.wholesalebasepriceList.getCurrentRow().getValue("id");
            var queryData = viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL ? singledocSearchChildDetail.getDataWithOpr() : singledocSearchChild.getDataWithOpr();
            queryData.size = viewModel.wholesalebasepriceChild.pageSize();
            queryData.page = viewModel.wholesalebasepriceChild.pageIndex();
            queryData['search_EQ_wholeSalePrice.id'] = id;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + '/findByWholeSalePriceId',
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.wholesalebasepriceChild.setSimpleData(data.content, { unSelect: true });
                    viewModel.wholesalebasepriceChild.totalRow(data.totalElements);
                    viewModel.wholesalebasepriceChild.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件--子表
        cleanSearchChild: function() {
            if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL) {
                singledocSearchChildDetail.clearSearch();
            } else {
                singledocSearchChild.clearSearch();
            }
        },
        //改变页码之前
        beforPageChangeFun: function(index) {
            var flag = false;
            var childRows = viewModel.wholesalebasepriceChild.getAllRows();
            if (childRows.length > 0) {
                for (var i = 0; i < childRows.length; i++) {
                    var status = childRows[i].status;
                    if (status != 'nrm') {
                        flag = true;
                    }
                }
            }
            if (flag) {
                common.dialog.confirmDialog({
                    msg1: '当前有修改，是否先保存后跳转？',
                    msg2: '此操作不可逆',
                    width: '400px',
                    type: 'error',
                    onOk: function() {
                        viewModel.saveBill(index);
                    },
                    onCancel: function() {}
                });
            } else {
                viewModel.wholesalebasepriceChild.pageIndex(index);
                viewModel.searchChildFun();
            }
        },
        //页码改变时的回调函数--子表
        pageChangeChild: function(index) {
            viewModel.wholesalebasepriceChild.pageIndex(index);
            viewModel.searchChildFun();
        },
        //页码改变时的回调函数--子表
        sizeChangeChild: function(size) {
            viewModel.wholesalebasepriceChild.pageSize(size);
            viewModel.searchChild(true);
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
            if (reindex) {
                viewModel.wholesalebasepriceList.pageIndex(0);
            }
            viewModel.wholesalebasepriceList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            queryData.size = viewModel.wholesalebasepriceList.pageSize();
            queryData.page = viewModel.wholesalebasepriceList.pageIndex();
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.wholesalebasepriceList.setSimpleData(data.content, { unSelect: true });
                    viewModel.wholesalebasepriceList.totalRow(data.totalElements);
                    viewModel.wholesalebasepriceList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function() {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
            viewModel.wholesalebasepriceList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
            viewModel.wholesalebasepriceList.pageSize(size);
            viewModel.search(true);
        },
        //判断状态
        auditStatus: function() {
            var auditStatusValue = parseInt(viewModel.wholesalebasepriceList.getValue('auditStatus'));
            var auditStatusName;
            switch (auditStatusValue) {
                case 0:
                    auditStatusName = '未审核';
                    break;
                case 1:
                    auditStatusName = '已审核';
                    break;
                default:
                    auditStatusName = '未审核';
            }
            return auditStatusName;
        },
        //判断状态
        invalidStatus: function() {
            var invalidStatusValue = viewModel.wholesalebasepriceList.getValue('invalidStatus');
            var invalidStatusName;
            switch (invalidStatusValue) {
                case 0:
                    invalidStatusName = '已作废';
                    break;
                case 1:
                    invalidStatusName = '未作废';
                    break;
                default:
                    invalidStatusName = '未作废';
            }
            return invalidStatusName;
        },
        //审核
        auditHandle: function() {
            var selectRowsArr = viewModel.wholesalebasepriceList.getSelectedRows();
            if (selectRowsArr.length < 1) {
                //TODO
                toastr.warning('请选择数据');
                return;
            }
            for (var i = 0; i < selectRowsArr.length; i++) {
                var isAuditStatus = selectRowsArr[i].getValue("auditStatus");
                if (isAuditStatus != 0) {
                    //TODO
                    toastr.warning('请选择未审核的数据');
                    return;
                }
            }
            var ids = selectRowsArr.map(function(row, index, arr) {
                return row.getValue("id");
            });
            $._ajax({
                url: appCtx + viewModel.baseurl + "/audit",
                type: "post",
                data: "ids=" + ids.join(","),
                success: function(data) {
                    for (var i = 0; i < selectRowsArr.length; i++) {
                        selectRowsArr[i].setValue("auditStatus", "1");
                    }
                }
            });
        },
        //停用
        disableHandle: function() {
            var selectRowsArr = viewModel.wholesalebasepriceChild.getSelectedRows();
            if (selectRowsArr.length < 1) {
                toastr.warning("请选择数据");
                return;
            } else {
                common.dialog.confirmDialog({
                    msg1: '确认停用这些项？',
                    msg2: '此操作不可逆',
                    width: '400px',
                    type: 'error',
                    onOk: function() {
                        var ids = selectRowsArr.map(function(row, index, arr) {
                            return row.getValue("id");
                        });
                        $._ajax({
                            url: appCtx + viewModel.childListUrl + "/batch-disable",
                            type: "post",
                            data: "ids=" + ids.join(","),
                            success: function(data) {
                                for (var i = 0; i < selectRowsArr.length; i++) {
                                    selectRowsArr[i].setValue("isEnable", "0");
                                }
                            }
                        });
                    }
                });
            }
        },
        //作废
        invalidHandle: function() {
            var selectRowsArr = viewModel.wholesalebasepriceList.getSelectedRows();
            if (selectRowsArr.length < 1) {
                //TODO
                toastr.warning('请选择数据');
                return;
            }
            for (var i = 0; i < selectRowsArr.length; i++) {
                var isAuditStatus = selectRowsArr[i].getValue("auditStatus");
                var isInvalidStatus = selectRowsArr[i].getValue("invalidStatus");
                if (isAuditStatus != 1 || isInvalidStatus != 1) {
                    //TODO
                    toastr.warning('请选择已审核并且作废状态为生效的数据');
                    return;
                }
            }
            var ids = selectRowsArr.map(function(row, index, arr) {
                return row.getValue("id");
            });
            $._ajax({
                url: appCtx + viewModel.baseurl + "/invalid",
                type: "post",
                data: "ids=" + ids.join(","),
                success: function(data) {
                    for (var i = 0; i < selectRowsArr.length; i++) {
                        selectRowsArr[i].setValue("invalidStatus", "0");
                    }
                    toastr.success();
                }
            });
        },
        //审批流添加功能----提交审批
        submit: function() {
            var selectedData = viewModel.wholesalebasepriceList.getSimpleData({ type: 'select' });
            if (selectedData.length == 0) {
                toastr.error("请选择数据");
                return;
            }
            if (selectedData[0].state && selectedData[0].state != '0') { //状态不为待确认
                toastr.error("该单据已经使用关联流程，不能启动", "error");
                return;
            }
            for (var i = 0; i < selectedData.length; i++) {
                selectedData[i].wholeSalePriceDets = [];
            }
            $.ajax({
                type: 'GET',
                url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=wholesalebaseprice1&nodekey=001',
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
            var nodeJs = "/ocm-web/pages/price/wholesaleBasePrice/wholesalebaseprice.js";
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
        //审批流添加功能----取消提交
        unsubmit: function() {
            var selectedData = viewModel.wholesalebasepriceList.getSimpleData({ type: 'select' });
            if (selectedData.length == 0) {
                toastr.error("请选择数据");
                return;
            }
            for (var i = 0; i < selectedData.length; i++) {
                selectedData[i].wholeSalePriceDets = [];
            }
            $.ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/unsubmit",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(selectedData),
                success: function(res) {
                    if (res) {
                        if (res.detailMsg.data.success == 'success') {
                            toastr.success();
                            viewModel.search();
                        } else {
                            toastr.error(res.detailMsg.data.message);
                        }
                    } else {
                        toastr.error("无返回数据");
                    }
                }

            });
        },
    }
    viewModel = u.extend({}, baseData, events, rendertype/*,bpmopenbill.model*/);

    function appInit(element, params) {
        window.initButton(viewModel, element); //初始化按钮权限
        ko.cleanNode(element);
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        // 查询组件初始化
        singledocSearch = new searchbox(
            $("#wholesalebaseprice-searchcontent")[0], [{
                    type: "text",
                    key: "code",
                    label: "价格表编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "价格表名称"
                },
                {
                    type: "radio",
                    key: "auditStatus",
                    label: "审核状态",
                    dataSource: CONST.APPROVE,
                    defaultvalue: CONST.DEFAULTOPTION,
                },
                {
                    type: "radio",
                    key: "invalidStatus",
                    label: "作废状态",
                    dataSource: [
                        { value: '', name: '全部' },
                        { value: '0', name: '已作废' },
                        { value: '1', name: '未作废' }
                    ]
                },
                {
                    type: "refer",
                    key: "saleOrg--id",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    clientParam: { "EQ_isSaleOrganization": "1", "EQ_isEnable": "1" }
                },
                {
                    type: "radio",
                    key: "salePrincipal",
                    label: "销售主体",
                    dataSource: [
                            { value: '', name: '全部' },
                            { value: '00', name: '全友' },
                            { value: '01', name: '独合资办' }
                        ]
                        //	      url: appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY064",
                        //	      namefield:"name",
                        //	      valuefield:"code"
                }
            ]);
        // 查询组件初始化 --子表
        singledocSearchChild = new searchbox(
            $("#wholesalebaseprice-searchcontent-child")[0], [{
                    type: "text",
                    key: "productOrSuiteCode",
                    label: "销售产品/套件编码",
                    opr: "IN",
                },
                {
                    type: "text",
                    key: "product--code",
                    label: "包件编码",
                    opr: "IN",
                },
                //   {
                //   type:"refer",
                //   key:"product--id",
                //   label:"包件编码",
                //   refinfo:"productInfo",
                //   refcfg:{"isReturnCode":"true"},
                //   refparam:{"EQ_isProductPack":"1"},//是否包件
                //   multi: true
                // },
                {
                    type: "refer",
                    key: "belongProduct--id",
                    label: "所属产品编码",
                    refinfo: "productInfo",
                    refcfg: { "isReturnCode": "true" },
                    clientParam: { "EQ_isSaleProduct": "1" }
                },
                {
                    type: "combo",
                    key: "saleChannel",
                    label: "渠道类型",
                    //	      dataSource:[
                    //      {value:'02',name:'批发'},
                    //      {value:'01',name:'电商'}
                    //      ]
                    dataSource: viewModel.saleChannelDataSource,
                },
                {
                    type: "refer",
                    key: "agencypartition--id",
                    label: "办事处分区",
                    refinfo: "agencypartitiongrid",
                    clientParam: { "EQ_isContainBodys": "1", "EQ_isEnable": "1" }
                },
                {
                    type: "refer",
                    key: "agency--id",
                    label: "办事处",
                    refinfo: "organization_ocm",
                    clientParam: { "EQ_isOffice": "1" } //是否办事处
                },
                {
                    type: "refer",
                    key: "customer--id",
                    label: "客户",
                    refinfo: "customer",
                },
                {
                    type: "daterange",
                    key: "beginTime",
                    //      startkey:"beginTime",
                    //      endkey:"endTime",
                    label: "开始日期",
                },
                {
                    type: "daterange",
                    key: "endTime",
                    //      startkey:"beginTime",
                    //      endkey:"endTime",
                    label: "截至日期",
                },
                {
                    type: "radio",
                    key: "isEnable",
                    label: "启用状态",
                    dataSource: [
                        { value: '', name: '全部' },
                        { value: '0', name: '停用' },
                        { value: '1', name: '启用' }
                    ]
                },
                {
                    type: "text",
                    key: "adjust--code",
                    label: "调整单号"
                }
            ], undefined, true);
        // 查询组件初始化 --子表
        //详情页
        singledocSearchChildDetail = new searchbox(
            $("#wholesalebaseprice-searchcontent-child-detail")[0], [{
                    type: "text",
                    key: "productOrSuiteCode",
                    label: "销售产品/套件编码",
                    opr: "IN",
                },
                {
                    type: "text",
                    key: "product--code",
                    label: "包件编码",
                    opr: "IN",
                },
                //   {
                //   type:"refer",
                //   key:"product--id",
                //   label:"包件编码",
                //   refinfo:"productInfo",
                //   refcfg:{"isReturnCode":"true"},
                //   clientParam:{"EQ_isProductPack":"1"},//是否包件
                //   multi: true
                // },
                {
                    type: "refer",
                    key: "belongProduct--id",
                    label: "所属产品编码",
                    refinfo: "productInfo",
                    refcfg: { "isReturnCode": "true" },
                    clientParam: { "EQ_isSaleProduct": "1" }
                },
                {
                    type: "combo",
                    key: "saleChannel",
                    label: "渠道类型",
                    //	      dataSource:[
                    //      {value:'02',name:'批发'},
                    //      {value:'01',name:'电商'}
                    //      ]
                    dataSource: viewModel.saleChannelDataSource,
                },
                {
                    type: "refer",
                    key: "agencypartition--id",
                    label: "办事处分区",
                    refinfo: "agencypartitiongrid",
                    clientParam: { "EQ_isContainBodys": "1", "EQ_isEnable": "1" }
                },
                {
                    type: "refer",
                    key: "agency--id",
                    label: "办事处",
                    refinfo: "organization_ocm",
                    refparam: { "EQ_isOffice": "1" } //是否办事处
                },
                {
                    type: "refer",
                    key: "customer--id",
                    label: "客户",
                    refinfo: "customer",
                },
                {
                    type: "daterange",
                    key: "beginTime",
                    //      startkey:"beginTime",
                    //      endkey:"endTime",
                    label: "开始日期",
                },
                {
                    type: "daterange",
                    key: "endTime",
                    //      startkey:"beginTime",
                    //      endkey:"endTime",
                    label: "截至日期",
                },
                {
                    type: "radio",
                    key: "isEnable",
                    label: "启用状态",
                    dataSource: [
                        { value: '', name: '全部' },
                        { value: '0', name: '停用' },
                        { value: '1', name: '启用' }
                    ]
                },
                {
                    type: "text",
                    key: "adjust--code",
                    label: "调整单号"
                }
            ], undefined, true);
        // 列表查询数据(无查询条件)
        viewModel.search();
        var productRow = viewModel.ProductRef.createEmptyRow();
        viewModel.ProductRef.setRowFocus(productRow);
        var packRow = viewModel.PackRef.createEmptyRow();
        viewModel.PackRef.setRowFocus(packRow);
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#wholesalebaseprice-searchcontent input').off("keydown").on("keydown", function(e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        //枚举
        $._ajax({
            type: "get",
            url: window.pathMap.base+"/cust-doc-defs/cust_doc_code/batch",
            data: {
                cust_doc_code_batch: "QY064,QY059"
            },
            success: function(data) {
                //销售主体
                var newarray = common.dataconvert.toMap(data["QY064"], "name", "code");
                //      newarray.unshift({"name":"全部","value":""});
                viewModel.saleData(newarray);
                //渠道类型
                var newarray2 = common.dataconvert.toMap(data["QY059"], "name", "code");
                newarray2.unshift({ "name": "全部", "value": "" });
                viewModel.saleChannelDataSource(newarray2);
            }
        });
        // 所属产品参照选择
        viewModel.PackRef.on("packRefer.valuechange", function(obj) {
            if (!obj.newValue) {
                return;
            }
            var refValues = $("#refContainerpackRefer").data("uui.refer").values;
            var curDetailRow = viewModel.wholesalebasepriceChild.getCurrentRow();

            curDetailRow.setValue("belongProductId", refValues[0].refpk);
            curDetailRow.setValue("belongProductName", refValues[0].refname);
            curDetailRow.setValue("belongProductCode", refValues[0].refcode);

        });
        // 包件参照选择，为包件所在行增加多个包件行
        viewModel.ProductRef.on("productRefer.valuechange", function(obj) {
            if (!obj.newValue) {
                return;
            }
            var refValues = $("#refContainerproductRefer").data("uui.refer").values;
            var curDetailRow = viewModel.wholesalebasepriceChild.getCurrentRow();

            if (refValues && refValues.length > 0) {
                var newRows = [];
                for (var i = 0; i < refValues.length; i++) {
                    var newRow = undefined;
                    if (i === 0) {
                        newRow = curDetailRow;
                    } else {
                        newRow = new u.Row({ parent: viewModel.wholesalebasepriceChild });
                        newRows.push(newRow);
                    }
                    newRow.setValue("productId", refValues[i].refpk);
                    newRow.setValue("productName", refValues[i].refname);
                    newRow.setValue("productCode", refValues[i].refcode);
                    newRow.setValue("productGroupName", refValues[i].productGropName);
                    newRow.setValue("saleSeriesName", refValues[i].productSaleSeriesName);
                }
                var focusIndex = viewModel.wholesalebasepriceChild.focusIndex();
                viewModel.wholesalebasepriceChild.insertRows(focusIndex + 1, newRows);
            }
        });
        //销售主体变化
        viewModel.wholesalebasepriceList.on("salePrincipalCode.valuechange", function(obj) {
            if (obj.oldValue == obj.newValue || obj.oldValue == undefined) return;
            var salePrincipalCode = viewModel.wholesalebasepriceList.getValue("salePrincipalCode");
            var childRows = viewModel.wholesalebasepriceChild.getAllRows();
            //			先清空销售组织
            viewModel.wholesalebasepriceList.setValue("saleOrgName", "");
            viewModel.wholesalebasepriceList.setValue("saleOrgCode", "");
            viewModel.wholesalebasepriceList.setValue("saleOrgId", "");
            $('#saleorg-ipt').val('');

            if (salePrincipalCode == "00") {
                $("#saleOrgId").attr("data-refparam", '{"EQ_isSaleOrganization":"1","salePrincipal":"00","EQ_isEnable":"1"}');
                viewModel.isEmptyAgency(false);
            } else {
                $("#saleOrgId").attr("data-refparam", '{"EQ_isSaleOrganization":"1","salePrincipal":"01","EQ_isEnable":"1"}');
                viewModel.isEmptyAgency(true);
            }
        });
        //销售组织变化
        viewModel.wholesalebasepriceList.on("saleOrgId.valuechange", function(obj) {
            var salePrincipalCode = viewModel.wholesalebasepriceList.getValue("salePrincipalCode");
            var saleOrgId = viewModel.wholesalebasepriceList.getValue("saleOrgId");
            var childRows = viewModel.wholesalebasepriceChild.getAllRows();

            if (salePrincipalCode == "01") {
                viewModel.isEmptyAgency(true);
                viewModel.wholesalebasepriceChild.setMeta("agencyId", "refparam", '{"EQ_parentOrganization.id":"' + saleOrgId + '","EQ_isOffice":"1","EQ_isEnable":"1"}');
                viewModel.wholesalebasepriceChild.setMeta("agencypartitionId", "refparam", '{"EQ_id":"aaa","EQ_isContainBodys":"1","EQ_isEnable":"1"}');
            } else {
                viewModel.isEmptyAgency(false);
                viewModel.wholesalebasepriceChild.setMeta("agencyId", "refparam", '{"EQ_isOffice":"1","EQ_isEnable":"1"}');
                viewModel.wholesalebasepriceChild.setMeta("agencypartitionId", "refparam", '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}');
            }

        });
        //清除参照联动数据
        viewModel.wholesalebasepriceChild.on("valuechange", function(obj) {
            var field = obj.field;
            var currentRow = obj.rowObj;
            var newValue = obj.newValue;
            if (newValue == "") {
                if (field == "productId") {
                    currentRow.setValue("productCode", "");
                    currentRow.setValue("productName", "");
                    currentRow.setValue("productGroupName", "");
                    currentRow.setValue("saleSeriesName", "");
                } else if (field == "belongProductId") {
                    currentRow.setValue("belongProductCode", "");
                    currentRow.setValue("belongProductName", "");
                }
            }
        });
        //价格处理
        viewModel.wholesalebasepriceChild.on("price.valuechange", function(obj) {
            var rowObj = obj.rowObj;
            var price = rowObj.getValue("price");
            price = parseFloat(price);
            var arr = parseInt(price).toString().split('');
            var num = parseInt(arr[arr.length - 1]);
            if (num == 4 || num == 7) {
                price += 1;
                toastr.info("价格个位数如果是4则变更为5，如果是7则变更为8");
                obj.rowObj.setValue("price", price);
            }
        });
        //展开搜索
        $(".searchChild-btn").bind('click', function() {
            if ($(this).text() == "展开搜索") {
                $(this).text("收起搜索").closest('.ui-bill-body').siblings('.ui-searchbox').find('.searchChild-area').slideDown(300);
            } else {
                $(this).text("展开搜索").closest('.ui-bill-body').siblings('.ui-searchbox').find('.searchChild-area').slideUp(300);
            }
        });
        //分页显示条数判断
        $("#paginationChild").delegate("select", "click", function() {
            if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT) {
                var flag = false;
                var childRows = viewModel.wholesalebasepriceChild.getAllRows();
                if (childRows.length > 0) {
                    for (var i = 0; i < childRows.length; i++) {
                        var status = childRows[i].status;
                        if (status != 'nrm') {
                            flag = true;
                        }
                    }
                }
                if (flag) {
                    $(this).prop("disabled", true);
                    toastr.warning("当前数据已被修改，不可改变分页显示条数！");
                } else {
                    $(this).prop("disabled", false);
                }
            }
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