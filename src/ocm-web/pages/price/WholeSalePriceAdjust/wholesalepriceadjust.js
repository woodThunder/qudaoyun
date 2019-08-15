define(['text!./wholesalepriceadjust.html', 'ocm_common', 'searchbox', 'billfooter'/*,'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js'*/, 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, Billfooter/*,bpmopenbill*/) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, searcher, singledocSearch, billfooter, wholeSaleBasePriceDialog, singledocSearchChild, singledocSearchChildDetail;
    baseData = {
        baseurl: '/whole-sale-price-adjust',
        baseurlChild: 'whole-sale-price-adjust-det',
        searchUrl: '/whole-sale-price-det',
        WholeSalePriceAdjustList: new u.DataTable(WholeSalePriceAdjust),
        WholeSalePriceAdjustItems: new u.DataTable(WholeSalePriceAdjustItem),
        DemoItemRefList: new u.DataTable(DemoItemRef),
        WholeSaleBasePrice: new u.DataTable(WholeSalePriceAdjustmeta),
        billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
        enableRadioSrc: [{ value: "1", name: "启用" }, { value: "0", name: "停用" }],
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,
        //销售渠道 枚举值集合
        saleChannelDataSource: ko.observableArray([])
    };
    rendertype = {
        operation: common.rendertype.operation4auth,
        detailRender: common.rendertype.detailRender,
        //判断表格里的状态
        approveFormat: function(obj) {
            var showValue = obj.value == "1" ? "已审核" : "未审核";
            obj.element.innerHTML = showValue;
        },
        //启用状态
        enabledGrid: function(obj) {
            var showValue = obj.value == "1" ? "启用" : "停用";
            obj.element.innerHTML = showValue;
        }
    };
    events = {
        beforeEditFun: function(obj) {
            var clickField = obj.gridObj.gridCompColumnArr[obj.colIndex].options.field;
            if (clickField == "agencyId" || clickField == "agencypartitionId") {
                var salePrincipalCode = viewModel.WholeSalePriceAdjustList.getValue("salePrincipalCode");
                var saleOrgId = viewModel.WholeSalePriceAdjustList.getValue("saleOrgId");
                if (salePrincipalCode == "01") {
                    viewModel.WholeSalePriceAdjustItems.setMeta("agencyId", "refparam", '{"EQ_parentOrganization.id":"' + saleOrgId + '","EQ_isOffice":"1","EQ_isEnable":"1"}');
                    viewModel.WholeSalePriceAdjustItems.setMeta("agencypartitionId", "refparam", '{"EQ_id":"aaa","EQ_isContainBodys":"1","EQ_isEnable":"1"}');
                } else {
                    viewModel.WholeSalePriceAdjustItems.setMeta("agencyId", "refparam", '{"EQ_isOffice":"1","EQ_isEnable":"1"}');
                    viewModel.WholeSalePriceAdjustItems.setMeta("agencypartitionId", "refparam", '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}');
                }
            }
            return true;

        },
        //导入
        importHandle: function() {
            var urlInfo = '/whole-sale-price-adjust-excel/excelDataImport'; //倒入地址参数
            var urlStatusInfo = '/whole-sale-price-adjust-excel/excelLoadingStatus'; //请求进度地址参数
            var ele = $('#importFiel')[0]; //挂载元素
            common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
        },
        //导出
        exportHandle: function() {
            var searchParams = searcher.getDataWithOpr(); //搜索查询参数
            var templateUrl = '/whole-sale-price-adjust-excel/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = '/whole-sale-price-adjust-excel/excelDataExport'; //导出数据地址参数
            var listData = viewModel.WholeSalePriceAdjustList; //需要导出表格的dataTable
            var ele = $('#exportFiel')[0]; //挂载元素
            var judgeAuditStatus = true; //是否有审核条件导出限制，如果导出类型选择导出需修改的数据，已审核则不能导出
            common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl, judgeAuditStatus);
        },
        //点击返回
        retListPanelFun: function() {
            viewModel.retListPanel();
            viewModel.WholeSalePriceAdjustItems.pageIndex(0);
        },
        //时间限制
        disabledBegin: function(current) {
            var endTime = viewModel.WholeSalePriceAdjustItems.getValue("endTime");
            if (endTime) {
                endTime = new Date(endTime).getTime();
                if (current) {
                    current = new Date(current.format("YYYY-MM-DD")).getTime();
                }
                return current && current > endTime;
            }
        },
        disabledEnd: function(current) {
            var beginTime = viewModel.WholeSalePriceAdjustItems.getValue("beginTime");
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
            var filedValue = obj.gridObj.gridCompColumnArr[colIndex].options.filed;
            if (filedValue == "belongProductId") {
                var productId = viewModel.WholeSalePriceAdjustItems.getRow(obj.rowIndex).getValue("productId");
                if (!productId) {
                    toastr.warning("请先选择包件编码");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        //编辑状态
        editHandle: function() {
            $(".searchChild-btn").show();
            var self = this;
            var isauditStatus = viewModel.WholeSalePriceAdjustList.getValue("auditStatus");
            if (isauditStatus == "1" || isauditStatus == 1) {
                toastr.warning('该数据已审核不能编辑');
                return;
            }
            $(".ui-bill-detail").hide();
            $(".ui-bill-panel").show();
            self.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
            viewModel.WholeSalePriceAdjustItems.pageIndex(0);
            viewModel.searchChildFun();
        },
        //点击参照按钮
        referClick: function() {
            var isWholeSalePriceCode = viewModel.WholeSalePriceAdjustList.getValue("wholeSalePriceCode");
            if (!isWholeSalePriceCode) {
                //TODO
                toastr.warning('请选择价格表编码');
                return;
            }
            var self = this;
            singledocSearch.clearSearch();
            viewModel.singledocSearch(true);
            wholeSaleBasePriceDialog = u.dialog({ id: 'wholeSaleBasePriceDialog', content: "#dialog_content_wholesalebaseprice", width: "80%" });

            var okButton = $("#dialog_content_wholesalebaseprice .u-msg-ok");
            okButton.unbind("click").click(function() {
                self.referOk();
                wholeSaleBasePriceDialog.close();
            });
            var okCancel = $("#dialog_content_wholesalebaseprice .u-msg-cancel");
            okCancel.unbind("click").click(function() {
                wholeSaleBasePriceDialog.close();
            });
        },
        //确定
        referOk: function() {
            var self = this;
            var selectedRows = viewModel.WholeSaleBasePrice.getAllPageSelectedRows();

            if (selectedRows.length < 1) return;
            //清id
            self.refRow(selectedRows);
            var selectedRowsData = viewModel.WholeSaleBasePrice.getSimpleData({ type: "select" });
            for (var i = 0; i < selectedRowsData.length; i++) {
                selectedRowsData[i].remark = "";
            }
            var selectedItemRows = viewModel.WholeSalePriceAdjustItems.getAllRows();
            if (selectedItemRows.length < 1) {
                //如果子表没数据直接添加所选
                //如果子表没数据直接添加所选
                viewModel.WholeSalePriceAdjustItems.setSimpleData(selectedRowsData, { status: "new" });
            } else {
                //如果子表存在数据则需要进行判重再添加
                var itemsStringArr = [];
                for (var i = 0; i < selectedItemRows.length; i++) {
                    itemsStringArr.push(self.stringRow(selectedItemRows[i]))
                }
                var unionItemDatas = [];
                //进行判重
                for (var a = 0; a < selectedRows.length; a++) {
                    var nowRowString = self.stringRow(selectedRows[a]);
                    if (itemsStringArr.indexOf(nowRowString) < 0) {
                        var obj = selectedRows[a].getSimpleData();
                        obj.persistStatus = "new";
                        obj.remark = "";
                        unionItemDatas.push(obj);
                    }
                }
                unionItemDatas = unionItemDatas.concat(viewModel.WholeSalePriceAdjustItems.getSimpleData());
                viewModel.WholeSalePriceAdjustItems.setSimpleData(unionItemDatas, {}, true);
            }
        },
        //选择参照的需要去掉id
        refRow: function(rowArr) {
            for (var i = 0; i < rowArr.length; i++) {
                rowArr[i].setValue("id", "");
            }
        },
        //获取参照选中行的值 拼接成字符串 进行比较
        //需要6个字段值
        stringRow: function(row) {
            var stringArr = [row.getValue("productCode"),
                row.getValue("saleChannelCode"),
                row.getValue("belongProductId"),
                row.getValue("agencypartitionId"),
                row.getValue("agencyName"),
                row.getValue("customerName"),
                row.getValue("beginTime"),
                row.getValue("endTime"),
            ];
            return stringArr.join("@");
        },
        //参照弹出框 搜索
        singledocSearch: function(reindex) {
            var self = this;
            //当前主表Id
            var currentId = viewModel.WholeSalePriceAdjustList.getCurrentRow().getValue("wholeSalePriceId");
            if (reindex) {
                viewModel.WholeSaleBasePrice.pageIndex(0);
                viewModel.WholeSaleBasePrice.clear();
            }

            //  	viewModel.WholeSaleBasePrice.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            var pageSize = viewModel.WholeSaleBasePrice.pageSize();
            var pageNumber = viewModel.WholeSaleBasePrice.pageIndex();
            queryData['search_EQ_wholeSalePrice.id'] = currentId;
            queryData['search_EQ_isEnable'] = '1';
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.searchUrl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    self.rewriteFun(data);
                }
            })



        },
        //重新组织数据结构在写入
        rewriteFun: function(con) {
            var pageIndex = viewModel.WholeSaleBasePrice.pageIndex();
            var status = 'nrm';
            var rows = new Array();
            for (var i = 0; i < con.numberOfElements; i++) {
                var row = {},
                    data = {},
                    status = status;
                data.name = 'name-' + pageIndex + '-' + i;
                data.currency = pageIndex * 10 + i;
                row.data = con.content[i];
                row.status = status;
                rows.push(row);
            }
            viewModel.WholeSaleBasePrice.setData({
                pageIndex: pageIndex,
                totalPages: con.totalPages,
                totalRow: con.totalElements,
                pages: [{
                    index: pageIndex,
                    select: [],
                    current: -1,
                    rows: rows
                }]
            }, {
                unSelect: true
            });
        },
        //页码改变时的回调函数-批发基础价
        pageChangePrice: function(index) {
            if (!viewModel.WholeSaleBasePrice.getPage(index)) {
                //  		viewModel.WholeSaleBasePrice.pageIndex(index);
                viewModel.singledocSearch();
            }
        },
        //页码改变时的回调函数-批发基础价
        sizeChangePrice: function(size) {
            viewModel.WholeSaleBasePrice.pageSize(size);
            viewModel.singledocSearch(true);
        },
        //清空搜索条件-参照
        cleanSingledocSearch: function() {
            singledocSearch.clearSearch();
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)--子表
        searchChild: function(reindex) {
            if (reindex) {
                viewModel.WholeSalePriceAdjustItems.pageIndex(0);
            }
            if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
                var flag = false;
                var childRows = viewModel.WholeSalePriceAdjustItems.getAllRows();
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
        searchChildFun: function(reindex) {
            if (reindex) {
                viewModel.WholeSalePriceAdjustItems.pageIndex(0);
            }
            viewModel.WholeSalePriceAdjustItems.removeAllRows();
            var id = viewModel.WholeSalePriceAdjustList.getCurrentRow().getValue("id");
            var queryData = viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL ? singledocSearchChildDetail.getDataWithOpr() : singledocSearchChild.getDataWithOpr();
            queryData.size = viewModel.WholeSalePriceAdjustItems.pageSize();
            queryData.page = viewModel.WholeSalePriceAdjustItems.pageIndex();
            queryData['search_EQ_wholeSalePriceAdjust.id'] = id;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + '/findByWholeSalePriceAdjustId',
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.WholeSalePriceAdjustItems.setSimpleData(data.content, { unSelect: true });
                    viewModel.WholeSalePriceAdjustItems.totalRow(data.totalElements);
                    viewModel.WholeSalePriceAdjustItems.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件--子表
        cleanSearchChild: function() {
            if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                singledocSearchChildDetail.clearSearch();
            } else {
                singledocSearchChild.clearSearch();
            }
        },
        //改变页码之前
        beforPageChangeFun: function(index) {
            var flag = false;
            var childRows = viewModel.WholeSalePriceAdjustItems.getAllRows();
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
                viewModel.WholeSalePriceAdjustItems.pageIndex(index);
                viewModel.searchChildFun();
            }
        },
        //页码改变时的回调函数--子表
        pageChangeChild: function(index) {
            viewModel.WholeSalePriceAdjustItems.pageIndex(index);
            viewModel.searchChildFun();
        },
        //页码改变时的回调函数--子表
        sizeChangeChild: function(size) {
            viewModel.WholeSalePriceAdjustItems.pageSize(size);
            viewModel.searchChild(true);
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
            if (reindex) {
                viewModel.WholeSalePriceAdjustList.pageIndex(0);
            }
            viewModel.WholeSalePriceAdjustList.removeAllRows();
            var queryData = searcher.getDataWithOpr();
            var pageSize = viewModel.WholeSalePriceAdjustList.pageSize();
            var pageNumber = viewModel.WholeSalePriceAdjustList.pageIndex();
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.WholeSalePriceAdjustList.setSimpleData(data.content, { unSelect: true });
                    viewModel.WholeSalePriceAdjustList.totalRow(data.totalElements);
                    viewModel.WholeSalePriceAdjustList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function() {
            searcher.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
            viewModel.WholeSalePriceAdjustList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
            viewModel.WholeSalePriceAdjustList.pageSize(size);
            viewModel.search(true);
        },
        //删除和批量删除
        del: function(data) {
            if (typeof(data) == 'number') {
                viewModel.WholeSalePriceAdjustList.setRowSelect(data);
            }
            var ids = [];
            var rows = viewModel.WholeSalePriceAdjustList.getSelectedRows();
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
                            viewModel.WholeSalePriceAdjustList.removeRows(rows);
                            viewModel.search();
                        }
                    });
                }
            });
        },
        //进入新增单据页
        showAddBillPanel: function() {
            $("#disable-ipt").attr("disabled", false);
            $(".searchChild-btn").hide();
            $(".searchChild-area").hide();
            //清空参照缓存
            viewModel.WholeSaleBasePrice.removeAllRows();
            var curRow = viewModel.WholeSalePriceAdjustList.createEmptyRow();
            viewModel.WholeSalePriceAdjustList.setRowFocus(curRow);
            curRow.setValue("auditStatus", "0");
            viewModel.WholeSalePriceAdjustItems.removeAllRows();
            viewModel.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
            $("#disable-ipt").attr("disabled", true);
            $('.searchChild-btn').show();
            //清空参照缓存
            viewModel.WholeSaleBasePrice.removeAllRows();
            var isauditStatus = viewModel.WholeSalePriceAdjustList.getRow(index).getValue("auditStatus");
            if (isauditStatus == "1" || isauditStatus == 1) {
                toastr.warning('该数据已审核不能编辑');
                return;
            }
            viewModel.WholeSalePriceAdjustList.setRowFocus(index);
            viewModel.WholeSalePriceAdjustList.originEditData = viewModel.WholeSalePriceAdjustList.getFocusRow().getSimpleData();
            singledocSearchChild.clearSearch();
            viewModel.searchChildFun();
            viewModel.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
            //给办事处参照塞条件
            var salePrincipalCode = viewModel.WholeSalePriceAdjustList.getRow(index).getValue("salePrincipalCode");
            var saleOrgId = viewModel.WholeSalePriceAdjustList.getRow(index).getValue("saleOrgId");
            if (salePrincipalCode == "01") {
                viewModel.WholeSalePriceAdjustItems.setMeta("agencyId", "refparam", '{"EQ_parentOrganization.id":"' + saleOrgId + '","EQ_isOffice":"1","EQ_isEnable":"1"}');
                viewModel.WholeSalePriceAdjustItems.setMeta("agencypartitionId", "refparam", '{"EQ_id":"aaa","EQ_isContainBodys":"1","EQ_isEnable":"1"}');
            } else {
                viewModel.WholeSalePriceAdjustItems.setMeta("agencyId", "refparam", '{"EQ_isOffice":"1","EQ_isEnable":"1"}');
                viewModel.WholeSalePriceAdjustItems.setMeta("agencypartitionId", "refparam", '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}');
            }
        },

        //详情
        detail: function() {
            //确保grid先将行设置为focus状态
            setTimeout(function() {
                singledocSearchChildDetail.clearSearch();
                viewModel.searchChildFun();
                var id = viewModel.WholeSalePriceAdjustList.getValue("id");
                //加入bpm按钮
                //viewModel.initBPMFromBill(id, viewModel);
                viewModel.goDetailPanel();
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
            }, 0);
        },

        //新增子表项
        addItem: function() {
            var childRows = viewModel.WholeSalePriceAdjustList.getValue("wholeSalePriceId");
            if (childRows && childRows.length > 0) {
                viewModel.WholeSalePriceAdjustItems.createEmptyRow({ unSelect: true });
            } else {
                toastr.warning("请选择价格表编码");
            }
        },
        //删除子表项
        delItems: function() {
            var selectedRows = viewModel.WholeSalePriceAdjustItems.getSelectedRows();
            if (selectedRows.length < 1) {
                toastr.warning("请选择数据");
                return;
            }
            viewModel.WholeSalePriceAdjustItems.removeRows(selectedRows);
        },
        //保存单据
        saveBill: function(index) {
            var type = "post";
            if (viewModel.billPanelStatus() !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus() !== CONST.BILLPANELSTATUS.COPY) {
                type = "put";
            }
            var productCombineData = viewModel.WholeSalePriceAdjustList.getCurrentRow().getSimpleData();
            var WholeSalePriceAdjustItemsData = viewModel.WholeSalePriceAdjustItems.getSimpleData();
            productCombineData.wholeSalePriceAdjustDets = WholeSalePriceAdjustItemsData;
            var validate = $("#validate")[0];
            var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
            if (result.passed) {
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(productCombineData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        viewModel.WholeSalePriceAdjustList.getFocusRow().setSimpleData(data);
                        toastr.success();
                        if (index == -1) {
                            viewModel.retListPanel();
                            viewModel.search();
                            viewModel.WholeSalePriceAdjustItems.pageIndex(0);
                            $("#paginationChild select").prop("disabled", false);
                        } else if (index == -2) {
                            viewModel.searchChildFun();
                        } else {
                            viewModel.WholeSalePriceAdjustItems.pageIndex(0);
                            viewModel.searchChildFun();
                        }
                    }
                });
            }
        },
        //取消单据
        cancelHandle: function() {
            var curRow = viewModel.WholeSalePriceAdjustList.getCurrentRow();
            // 修改，则还原
            if (curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.WholeSalePriceAdjustList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.WholeSalePriceAdjustList.removeRow(curRow);
                viewModel.WholeSalePriceAdjustItems.removeAllRows();
            }
            viewModel.retListPanel();
            viewModel.WholeSalePriceAdjustItems.pageIndex(0);
            $("#paginationChild select").prop("disabled", false);
        },
        //审核
        auditHandle: function() {
            var selectRowsArr = viewModel.WholeSalePriceAdjustList.getSelectedRows();
            if (selectRowsArr.length !== 1) {
                //TODO: tips替换
                toastr.warning('请选择一条数据');
                return;
            };
            if (selectRowsArr[0].getValue("auditStatus") == "1" || selectRowsArr[0].getValue("auditStatus") == 1) {
                //TODO: tips替换
                toastr.warning('已经审核');
                return;
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
        //审核状态 带入
        auditStatus: function() {
            var auditStatusValue = viewModel.WholeSalePriceAdjustList.getValue('auditStatus');
            if (auditStatusValue === null) {
                viewModel.WholeSalePriceAdjustList.setValue('auditStatus', 0);
            }
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
        //参照选择批量新增主表
        showAddItemsRef: function() {
            var selectedRows = viewModel.WholeSalePriceAdjustList.getSelectedRows();
            var selectsaleOrgId = selectedRows[0].getValue("saleOrgId");
            var refcode = viewModel.DemoItemRefList.getValue("refcode");
            var param = viewModel.DemoItemRefList.getMeta("productref", "refparam");
            if (!param) {
                param = {};
            } else {
                param = JSON.parse(param);
            }
            var varparam = { "NOTEQ_saleOrg.id": selectsaleOrgId, "EQ_saleOrg.isEnable": "1" };
            $.extend(param, varparam);
            $("#addItemsRef").attr("data-refparam", JSON.stringify(param));
            if (selectedRows.length !== 1) {
                toastr.warning('请选择一条数据');
            } else {
                var selectedRowData = selectedRows[0].getSimpleData();
                if (selectedRows[0].getValue("auditStatus") == "0" || selectedRows[0].getValue("auditStatus") == 0) {
                    toastr.warning('请选择已审核的数据');
                } else {
                    selectedRowData.wholeSalePriceAdjustDets = null;
                    $._ajax({
                        url: appCtx + viewModel.baseurl + '/getCustDocDetCode',
                        type: "post",
                        data: JSON.stringify(selectedRowData),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            if (data === '00') {

                                viewModel.clearItemsRef();
                                $("#addItemsRef .refer").trigger("click");
                            } else {
                                toastr.warning('您当前所选的调价单对应的批发基础价格的销售主体不是全友');
                            }
                        }
                    });
                }

            }
        },
        //清空已选产品组合参照
        clearItemsRef: function() {
            viewModel.DemoItemRefList.setValue("productref", "");
            var refer = $("#refContainerproductref").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
        },
        //审批流添加功能----提交审批
        submit: function() {
            var selectedData = viewModel.WholeSalePriceAdjustList.getSimpleData({ type: 'select' });
            if (selectedData.length == 0) {
                toastr.error("请选择数据");
                return;
            }
            if (selectedData[0].state && selectedData[0].state != '0') { //状态不为待确认
                toastr.error("该单据已经使用关联流程，不能启动", "error");
                return;
            }
            for (var i = 0; i < selectedData.length; i++) {
                selectedData[i].wholeSalePriceAdjustDets = [];
            }
            $.ajax({
                type: 'GET',
                url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=wholesalepriceadjust&nodekey=001',
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
            var nodeJs = "/ocm-web/pages/price/WholeSalePriceAdjust/wholesalepriceadjust.js";
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
            var selectedData = viewModel.WholeSalePriceAdjustList.getSimpleData({ type: 'select' });
            if (selectedData.length == 0) {
                toastr.error("请选择数据");
                return;
            }
            for (var i = 0; i < selectedData.length; i++) {
                selectedData[i].wholeSalePriceAdjustDets = [];
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
        //主表搜索
        searcher = new searchbox(
            $("#WholeSalePriceAdjust-searchcontent")[0], [{
                    type: "text",
                    key: "code",
                    label: "调价单号",
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
                    defaultvalue: CONST.DEFAULTOPTION,
                },
                {
                    type: "refer",
                    key: "wholeSalePrice--id",
                    label: "价格表名称",
                    refinfo: "wholeSalePrice",
                    clientParam: { "EQ_auditStatus": "1", "EQ_invalidStatus": "1" }
                },
                {
                    type: "daterange",
                    label: "审核时间",
                    key: "auditTime"
                }
            ]);
        // 查询组件初始化 --子表
        singledocSearchChild = new searchbox(
            $("#WholeSalePriceAdjust-searchcontent-child")[0], [{
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
            ], undefined, true);
        // 查询组件初始化 --子表
        //详情页
        singledocSearchChildDetail = new searchbox(
            $("#WholeSalePriceAdjust-searchcontent-child-detail")[0], [{
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
            ], undefined, true);
        //参照弹窗 搜索组件
        singledocSearch = new searchbox(
            $("#wholesalebaseprice-searchcontent")[0], [{
                    type: "text",
                    key: "product--description",
                    label: "产品名称"
                },
                {
                    type: "refer",
                    key: "product--prodGroup--id",
                    label: "产品组",
                    refinfo: "productGroup"
                },
                {
                    type: "refer",
                    key: "product--productSaleSeries--id",
                    label: "产品系列",
                    refinfo: "productSaleSeries"
                },
                {
                    type: "combo",
                    key: "saleChannel",
                    label: "渠道类型",
                    url: /*appCtx + */window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY059",
                    namefield: "name",
                    valuefield: "code"
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
                    refinfo: "organization_ocm"
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
                    type: "text",
                    key: "customer--name",
                    label: "客户名称"
                },
            ]);
        // 列表查询数据(无查询条件)
        viewModel.search();
        // 主表参照聚焦行，用于绑定子表参照组件
        var refRow = viewModel.DemoItemRefList.createEmptyRow();
        viewModel.DemoItemRefList.setRowFocus(refRow);
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#WholeSalePriceAdjust-searchcontent input').off("keydown").on("keydown", function(e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        // 参照带入多字段  (批量复制)
        viewModel.DemoItemRefList.on("productref.valuechange", function(obj) {
            // 清空参照时不增行
            if (!obj.newValue) {
                return;
            }
            var refer = $("#refContainerproductref").data("uui.refer");
            var refValues = refer.values;
            var ids = [];
            if (refValues && refValues.length > 0) {
                for (var i = 0; i < refValues.length; i++) {
                    var id = refValues[i].id;
                    ids.push(id);
                    //        var row = viewModel.WholeSalePriceAdjustList.getRowByField("id", id);
                    //        if(!row) {
                    //          var newrow = viewModel.WholeSalePriceAdjustList.createEmptyRow();
                    //          newrow.setValue("code", refValues[i].refcode);
                    //          newrow.setValue("name", refValues[i].refname);
                    //          newrow.setValue("saleOrg", refValues[i].saleOrg);
                    //          newrow.setValue("id", id);
                    //        }
                }
            }

            //参照选完后 把数据发送给后台
            var id = viewModel.WholeSalePriceAdjustList.getSelectedRows()[0].getValue("id");
            var sendData = {
                id: id,
                ids: ids.join(",")
            };
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + '/batchCopy',
                data: sendData,
                success: function(data) {
                    viewModel.WholeSalePriceAdjustList.addSimpleData(data);
                }
            });
        });
        //枚举
        $._ajax({
            type: "get",
            url: /*appCtx + */window.pathMap.base+"/cust-doc-defs/cust_doc_code/batch",
            data: {
                cust_doc_code_batch: "QY059"
            },
            success: function(data) {
                //渠道类型
                var newarray = common.dataconvert.toMap(data["QY059"], "name", "code");
                newarray.unshift({ "name": "全部", "value": "" });
                viewModel.saleChannelDataSource(newarray);
            }
        });
        //点击活动编码传条件给 - 产皮编码参照
        viewModel.WholeSalePriceAdjustItems.on("productId.valuechange", function(obj) {
            var productId = viewModel.WholeSalePriceAdjustItems.getValue("productId");
            viewModel.WholeSalePriceAdjustItems.meta.belongProductId.refparam =
                '{"EQ_isSaleProduct":"1","packId":"' + productId + '"}';
        });
        //清除参照联动数据
        viewModel.WholeSalePriceAdjustItems.on("valuechange", function(obj) {
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
        viewModel.WholeSalePriceAdjustItems.on("price.valuechange", function(obj) {
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
        //价格表编码联动
        viewModel.WholeSalePriceAdjustList.on("wholeSalePriceId.valuechange", function(obj) {
            var currentRow = obj.rowObj;
            var newValue = obj.newValue;
            if (newValue == "") {
                currentRow.setValue("wholeSalePriceCode", "");
                currentRow.setValue("wholeSalePriceName", "");
                currentRow.setValue("floatCoefficientName", "");
                currentRow.setValue("saleOrgName", "");
            }
        });
        //销售组织变化
        //		viewModel.WholeSalePriceAdjustList.on("saleOrgId.valuechange", function(obj) {
        //			  var salePrincipalCode = viewModel.WholeSalePriceAdjustList.getValue("salePrincipalCode");
        //				var saleOrgId = viewModel.WholeSalePriceAdjustList.getValue("saleOrgId");
        //				var childRows = viewModel.WholeSalePriceAdjustItems.getAllRows();
        //
        //				if(childRows.length > 0){
        //					if(salePrincipalCode == "01"){
        //						viewModel.WholeSalePriceAdjustItems.setMeta("agencyId","refparam",'{"EQ_parentOrganization.id":"'+saleOrgId+'","EQ_isOffice":"1","EQ_isEnable":"1"}');
        //					}else{
        //						viewModel.WholeSalePriceAdjustItems.setMeta("agencyId","refparam",'{"EQ_isOffice":"1","EQ_isEnable":"1"}');
        //					}
        //				}
        //		});
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
            if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
                var flag = false;
                var childRows = viewModel.WholeSalePriceAdjustItems.getAllRows();
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