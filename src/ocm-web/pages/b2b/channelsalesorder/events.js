define(['ocm_common'], function (common) {
    'use strict';
    var events = function (viewModel) {
        var billstatus = CONST.B2BENUM.SALEORDER;
        var BILLPANELSTATUS = {
            ADD: "add",
            EDIT: "edit",
            COPY: "copy",
            DETAIL: "detail",
            DEFAULT: "default"
        };
        // var ORDERSTATUS = {
        // Saved("01", "待处理", "整单状态"),
        // Committed("02", "已提交", "整单状态"),
        // Approving("03", "审批中", "整单状态"),
        // Approved("04", "审批通过", "整单状态"),
        // Disapproved("05", "审批不通过", "整单状态"),
        // Rejected("06", "已驳回", "整单状态"),
        // PartStockOut("07", "部分出库", "整单状态"),
        // AllStockOut("08", "全部出库", "整单状态"),
        // PartStockIn("09", "部分入库", "整单状态"),
        // AllStockIn("10", "全部入库", "整单状态");
        // }
        var ORDERSTATUSCHECK = {
            SUBMIT: {
                needCode: '01',
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不是待处理状态，不能提交");
                }
            },
            UNSUBMIT: {
                needCode: '02',
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不是已提交状态，不能收回");
                }
            },
            APPROVE: {
                needCode: '02',
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不是已提交状态，不能审批");
                }
            },
            UNAPPROVE: {
                needCode: '04',
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不已审批状态，不能取消审批");
                }
            },
            PUSH: {
                needCode: '04',
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不已审批状态，不能推发货单");
                }
            },
            CLOSE: {
                needCode: '04',
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不已审批状态，不能关闭");
                }
            },
            OPEN: {
                needCode: 0,
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不是关闭状态，不能打开");
                }
            },
            REJECT: {
                needCode: '01',
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不是待处理状态，不能驳回");
                }
            }
        }
        return {
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {

                if (reindex) {
                    viewModel.salesorderList.pageIndex(0);
                }
                viewModel.salesorderList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                var pageSize = viewModel.salesorderList.pageSize();
                var pageNumber = viewModel.salesorderList.pageIndex();
                var searchindex = viewModel.tabindex;
                // if (searchindex == 1) {
                //   queryData["search_IN_billStatus"] = billstatus.COMMITTED;
                // }
                // else if (searchindex == 2) {
                //   queryData["search_IN_billStatus"] = billstatus.APPROVED;
                // }
                // else if (searchindex == 3) {
                //   queryData["search_IN_billStatus"] = billstatus.FINISHED;
                // }
                queryData.page = pageNumber;
                queryData.size = pageSize;
                queryData.search_IN_saleModel = "01,02";
                try{
                    queryData.search_EQ_supplier = JSON.parse(localStorage.getItem("_A_P_customer")).id;
                }catch(e){
                    console.log("no customer");
                }
                // queryData["search_EQ_isVso"] = 0;
                // queryData["search_IN_soType.saleBusinessType"] = "01,03";

                //处理从首页跳转过来的情况下，带来的全局参数（afterCreate中保存的参数）
                if (viewModel.globalQueryData && viewModel.globalQueryData.length > 0) {
                    for (var i = 0; i < viewModel.globalQueryData.length; i++) {
                        queryData[viewModel.globalQueryData[i].key] = viewModel.globalQueryData[i].value;
                    }
                }
                var url = viewModel.golbalIsDaichuku ? viewModel.daichukuurl : viewModel.baseurl
                $._ajax({
                    type: "get",
                    //通过渠道上工作台首页跳转的待出库查询，需要使用单独接口调用。参数从aftercreate中接受判断
                    url: appCtx + url,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.salesorderList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.salesorderList.totalRow(data.totalElements);
                        viewModel.salesorderList.totalPages(data.totalPages);
                    }
                })
            },
            //导出
            exportHandle: function () {

                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var searchindex = viewModel.tabindex;
                if (searchindex == 1) {
                    searchParams["search_IN_billStatus"] = billstatus.COMMITTED;
                } else if (searchindex == 2) {
                    searchParams["search_IN_billStatus"] = billstatus.APPROVED;
                } else if (searchindex == 3) {
                    searchParams["search_IN_billStatus"] = billstatus.FINISHED;
                }
                searchParams["search_EQ_isVso"] = 0;
                searchParams["search_IN_soType.saleBusinessType"] = "01,03";
                var templateUrl = '/saleOrder-excel/downloadExcelTemplate'; //导出模板地址参数
                var excelDataUrl = '/saleOrder-excel/excelDataExport'; //导出数据地址参数
                var listData = viewModel.salesorderList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            //清空搜索条件
            cleanSearch: function () {

                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {

                viewModel.salesorderList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {

                viewModel.salesorderList.pageSize(size);
                viewModel.search(true);
            },
            //删除和批量删除
            del: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.salesorderList.setRowSelectbyRowId(rowId);
                }
                var rows = viewModel.salesorderList.getSelectedRows();
                if (rows && rows.length > 0) {
                    common.dialog.confirmDialog({
                        msg1: '确认删除这些项？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function () {
                            viewModel.del_ajax(rows);
                        }
                    });
                } else {
                    toastr.warning("请先选择一行数据");
                }
            },
            // 子表删除
            del_row: function (data, rowId) {
                // 判断是否冲抵过
                if (viewModel.isCostFlush == 1) {
                    toastr.warning('已经冲抵后不可再做此操作，如要操作，请先取消冲抵。');
                    return;
                }
                if (typeof (data) == 'number') {
                    viewModel.saleOrderItems.setRowSelectbyRowId(rowId);
                }
                var rows = viewModel.saleOrderItems.getSelectedRows();
                if (rows && rows.length > 0) {
                    common.dialog.confirmDialog({
                        msg1: '确认删除这些项？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function () {
                            rows.forEach(function (row, index, arr) {
                                row.setValue("dr", "1");
                                var productId = row.getValue("goodsId");
                                var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                                allBomRows.forEach(function (item, index) {
                                    if (item.getValue("parentGoodsId") === productId || item.getValue("goodsId") === productId) {
                                        viewModel.batchSaleOrderBomItems.removeRows(item);
                                        item.setValue("dr", "1");
                                    }
                                })
                            });
                            viewModel.saleOrderItems.removeRows(rows);
                        }
                    });
                } else {
                    toastr.warning("请先选择一行数据");
                }
            },
            del_ajax: function (rows, callback) {

                var ids = [];
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/delete",
                    type: "post",
                    data: {
                        ids: ids.join(",")
                    },
                    success: function (data) {
                        if (typeof callback == "function") {
                            callback();
                        }
                        toastr.success();
                        viewModel.salesorderList.removeRows(rows);
                    }
                });
            },
            //进入新增单据页
            showAddBillPanel: function () {
                viewModel.index = -1;
                viewModel.isBomPanel(true);
                $("#tab-panel-2").hide();
                $("#tab-panel-1").show();
                // 清空bom结构表
                viewModel.batchSaleOrderBomItems.removeAllRows();
                $('#tab2').removeClass('is-active');
                $('#tab1').addClass('is-active');
                viewModel.checkGoods();
                viewModel.salesorderCard.removeAllRows();
                var curRow = viewModel.salesorderCard.createEmptyRow();
                // 行号池
                viewModel.curRowNum(0);
                // viewModel.getCurDate(curRow);
                //合计行还原
                viewModel.totalPrecisionHandle(curRow, "add");
                // 单据状态为未提交
                var customerStr = localStorage.getItem('_A_P_customer');
                var customer = JSON.parse(customerStr);
                curRow.setValue("supplierId", customer.id);
                curRow.setValue("supplierCode", customer.code);
                curRow.setValue("supplierName", customer.name);
                curRow.setValue("orderStatusCode", billstatus.COMMITTED);
                curRow.setValue("orderStatusName", "未提交");

                viewModel.saleOrderItems.removeAllRows();
                viewModel.setDefaultCondition();
                viewModel.goBillPanel();
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
            },
            // TODO 进入复制单据页
            showCopyBillPanel: function () {
                viewModel.index = -1;
                var copyRow = viewModel.salesorderList.getFocusRow();
                if (copyRow) {
                    var id = copyRow.getValue("id");
                    viewModel.findByParentid(id, function (maindata) {
                        var childdata = maindata.saleOrderItems;
                        // 给主表工厂字段赋值
                        if (childdata && childdata.length > 0) {
                            maindata.factoryId = childdata[0].factoryId;
                            maindata.factoryName = childdata[0].factoryName;
                        }

                        viewModel.salesorderCard.setSimpleData(maindata);
                        viewModel.saleOrderItems.setSimpleData(childdata, {
                            unSelect: true,
                            status: "new"
                        });
                        var curRow = viewModel.salesorderCard.getFocusRow();
                        viewModel.accountTypeCombo.setEnable(false);
                        // 获得当前最大行号
                        viewModel.getCurRowNum();
                        // 为合计行进行精度处理
                        viewModel.totalPrecisionHandle(curRow);

                        //删除主表主键，编码，审计信息
                        viewModel.clearBaseProp(curRow, 1);

                        // 单据状态为未提交
                        curRow.setValue("billStatusCode", billstatus.COMMITTED);
                        curRow.setValue("billStatusName", "未提交");
                        //删除子表主键，子表主表关联,并获得产品id
                        var subRows = viewModel.saleOrderItems.getAllRows();
                        var productids = [];
                        if (subRows && subRows.length > 0) {
                            for (var i = 0; i < subRows.length; i++) {
                                viewModel.clearBaseProp(subRows[i], 2);
                                productids.push(subRows[i].getValue("productId"));
                                // 删除孙表主键，孙表和子表之间的关联
                                var subStructRows = subRows[i].getValue("soProductStrucs").getAllRows();
                                if (subStructRows && subStructRows.length > 0) {
                                    for (var j = 0; j < subStructRows.length; j++) {
                                        viewModel.clearBaseProp(subStructRows[j], 3);
                                    }
                                }
                            }
                        }

                        $(".ui-bill-detail").hide();
                        viewModel.goBillPanel();
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.COPY);
                        // 重新询价
                        if (productids.length > 0) {
                            viewModel.inquiryPrice(productids);
                        }

                    });

                } else {
                    toastr.warning("未找到来源单据");
                }
            },
            //详情
            detail: function () {
                $("#tab-panel-4").hide();
                $("#tab-panel-3").show();
                // 清空bom结构表
                viewModel.batchSaleOrderBomItems.removeAllRows();
                viewModel.checkGoods();
                $('#tab4').removeClass('is-active');
                $('#tab3').addClass('is-active');
                var grid = viewModel.app.getComp("grid_salesorder_item").grid;
                grid.setColumnVisibleByColumn(grid.getColumnByField("deliveryNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("stockOutNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("returnNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("stockInNum"), false);
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    var curRow = viewModel.salesorderList.getCurrentRow();
                    // 为合计行进行精度处理
                    viewModel.totalPrecisionHandle(curRow);
                    var id = curRow.getValue("id");
                    viewModel.findByParentid(id, function (maindata) {
                        if ("01" == maindata.saleModel || "03" == maindata.saleModel) {
                            grid.setColumnVisibleByColumn(grid.getColumnByField("deliveryNum"), true);
                            grid.setColumnVisibleByColumn(grid.getColumnByField("stockOutNum"), true);
                            grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), true);
                            grid.setColumnVisibleByColumn(grid.getColumnByField("returnNum"), true);
                        } else {
                            grid.setColumnVisibleByColumn(grid.getColumnByField("stockInNum"), true);
                        }
                        grid.repaintGridDivs();
                        var childdata = maindata.orderItems;
                        viewModel.salesorderDetailCard.setSimpleData(maindata);
                        viewModel.saleOrderItems.setSimpleData(childdata, {
                            unSelect: true
                        });
                        // bom 表填充
                        viewModel.batchSaleOrderBomItems.setSimpleData(maindata.orderItemBoms, {
                            unSelect: true
                        });
                        viewModel.orderReceiveAddress.setSimpleData(maindata.orderReceiveAddress), {
                            unSelect: true
                        }
                        if (maindata.orderReceiveAddress) {
                            // 收货人
                            viewModel.salesorderDetailCard.setValue('receiveAddressName', maindata.orderReceiveAddress.receiverAddress);  
                            viewModel.salesorderDetailCard.setValue('invoiceId', maindata.orderInvoice.invoiceTitle);
                            // 收货人地址
                            viewModel.salesorderDetailCard.setValue('customerReceiverName', maindata.orderReceiveAddress.receiver);
                            // 收货人电话
                            viewModel.salesorderDetailCard.setValue('customerTel',maindata.orderReceiveAddress.receiverPhone);
                        }
                        viewModel.goDetailPanel();
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                    });

                }, 0);
            },
            //查询子表数据
            findByParentid: function (id, callback) {

                $._ajax({
                    url: appCtx + viewModel.baseurl + "/detail",
                    type: 'get',
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data) {
                            if (typeof callback == "function") {
                                callback(data);
                            }
                        } else {
                            toastr.error();
                        }
                    }
                })
            },
            //根据商品id取bom
            findBomByParentId: function (id) {
                if (!id) return;
                var bomInfo;
                $._ajax({
                    url: window.pathMap.base + "/base/goods-boms/goods-bom-by-parent-good-id",
                    type: 'get',
                    async: false,
                    data: {
                        parentGoodId: id
                    },
                    success: function (data) {
                        bomInfo = data;
                    }
                })
                return bomInfo;
            },
            // 清除基类属性
            clearBaseProp: function (row, type) {

                // 公共
                row.setValue("id", "");
                row.setValue("creator", "");
                row.setValue("creationTime", "");
                row.setValue("modifier", "");
                row.setValue("modifiedTime", "");
                // 主表
                if (type == 1) {
                    row.setValue("orderCode", "");
                    row.setValue("billStatusId", "");
                    row.setValue("billStatusCode", "");
                    row.setValue("billStatusName", "");
                    row.setValue("billMakerId", "");
                    row.setValue("billMakerName", "");
                    row.setValue("approverId", "");
                    row.setValue("approveTime", "");
                    row.setValue("approveOpinion", "");
                    row.setValue("srcBillType", null);
                    row.setValue("srcBillId", null);
                    row.setValue("srcBillCode", null);
                    row.setValue("isToTMS", "0");
                }
                // 子表
                if (type == 2) {
                    row.setValue("saleOrderId", "");
                    row.setValue("saleOrderCode", "");
                    row.setValue("saleOrderType", "");
                    row.setValue("billItemStatusId", "");
                    row.setValue("billItemStatusCode", "");
                    row.setValue("billItemStatusName", "");
                    row.setValue("salePrice", null);
                    row.setValue("dealPrice", null);
                    row.setValue("confirmedQuantity", null);
                    row.setValue("srcBillTypeId", null);
                    row.setValue("srcBillTypeCode", null);
                    row.setValue("srcBillTypeName", null);
                    row.setValue("srcBillId", null);
                    row.setValue("srcBillCode", null);
                    row.setValue("srcBillRowId", null);
                    row.setValue("srcBillRowNum", null);
                    row.setValue("packedQuantity", null);
                    row.setValue("unpackedQuantity", null);
                    row.setValue("caredQuantity", null);
                    row.setValue("vsoTransSoQuantity", null);
                    row.setValue("vsoNotTransSoQuantity", null);
                    row.setValue("distributeUnmetQuantity", null);
                    row.setValue("closeReasonCode", null);
                    row.setValue("closeReasonName", null);
                    row.setValue("closedBy", null);
                    row.setValue("closeTime", null);
                }
                // 孙表
                if (type == 3) {
                    row.setValue("id", "");
                    row.setValue("saleOrderItemId", "");
                    row.setValue("parentId", "");
                }
            },

            //参照选择批量新增子表（销售产品）
            showAddItemsRef: function () {
                // 判断是否冲抵过
                if (viewModel.isCostFlush == 1) {
                    toastr.warning('已经冲抵后不可再做此操作，如要操作，请先取消冲抵。');
                    return;
                }
                if (viewModel.isAvailable()) {
                    viewModel.clearItemsRef();
                    var customer = $("#refContainercustomerId").data("uui.refer").values;
                    var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
                    // var settleFinancialOrg = $("#refContainersettleFinancialOrgId").data("uui.refer").values;
                    // var costType = $("#refContainercostTypeId").data("uui.refer").values;
                    // var saleOrg = $("#refContainersaleOrgId").data("uui.refer").values;
                    var customerId = customer && customer[0].id;
                    var saleModel = orderType && orderType[0].saleModelCode;
                    // var settleFinancialOrgId = settleFinancialOrg && settleFinancialOrg[0].id;
                    // var costTypeCode = costType && costType[0].id;
                    // var saleOrgId = saleOrg && saleOrg[0].id;
                    var condition = {
                        "search_customerId": customerId,
                        "search_saleModel": saleModel,
                        "search_customerRankCode": "01",
                        // "search_settleFinancialOrgId": settleFinancialOrgId,
                        "search_costType": "",
                        "search_organization": JSON.parse(localStorage.getItem("_A_P_customer")).id,
                        "search_EQ_isOptional": 0,
                        "search_EQ_enableStrucManage": 0
                    };
                    $("#saleorderaddItemsRef").attr("data-refparam", JSON.stringify(
                        u.extend({}, {}, condition)
                    ));
                    $("#saleorderaddItemsRef .refer").trigger("click");
                }
            },
            //进入修改单据页
            showEditBillPanel: function (index, rowId) {
                viewModel.isBomPanel(true);
                // 清空bom结构表
                viewModel.batchSaleOrderBomItems.removeAllRows();
                $('#tab2').removeClass('is-active');
                $('#tab1').addClass('is-active');
                viewModel.checkGoods();

                var grid = viewModel.app.getComp("grid_salesorder_edit").grid;
                grid.setColumnVisibleByColumn(grid.getColumnByField("deliveryNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("stockOutNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("returnNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("stockInNum"), false);
                var row;
                if (index == -1) {
                    //处理通过详情页编辑进入
                    row = viewModel.salesorderList.getFocusRow();
                    index = 0;
                } else {
                    //行上的编辑按钮
                    row = viewModel.salesorderList.getRowByRowId(rowId);
                }
                viewModel.index = index;
                viewModel.rowId = row.rowId;

                var id = row.getValue("id");
                //查询子表数据
                viewModel.findByParentid(id, function (data) {
                    if ("01" == data.saleModel || "03" == data.saleModel) {
                        grid.setColumnVisibleByColumn(grid.getColumnByField("deliveryNum"), true);
                        grid.setColumnVisibleByColumn(grid.getColumnByField("stockOutNum"), true);
                        grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), true);
                        grid.setColumnVisibleByColumn(grid.getColumnByField("returnNum"), true);
                    } else {
                        grid.setColumnVisibleByColumn(grid.getColumnByField("stockInNum"), true);
                    }
                    grid.repaintGridDivs();
                    viewModel.salesorderCard.setSimpleData(data);
                    viewModel.saleOrderItems.setSimpleData(data.orderItems, {
                        unSelect: true
                    });
                    // bom 表填充
                    viewModel.batchSaleOrderBomItems.setSimpleData(data.orderItemBoms, {
                        unSelect: true
                    });
                    viewModel.orderInvoice.setSimpleData(data.orderInvoice), {
                        unSelect: true
                    }
                    viewModel.orderReceiveAddress.setSimpleData(data.orderReceiveAddress), {
                        unSelect: true
                    }
                    var orderReceiveAddress = data.orderReceiveAddress;
                    var orderInvoice = data.orderInvoice;
                    if (orderReceiveAddress) {
                        // 收货人
                        viewModel.salesorderCard.setValue('receiver', orderReceiveAddress.receiver);
                        // 收货人地址
                        viewModel.salesorderCard.setValue('receiveAddressId', orderReceiveAddress.receiveAddressId  );
                        viewModel.salesorderCard.setValue('receiveAddressName', orderReceiveAddress.receiveAddressId);
                        // 收货人电话
                        viewModel.salesorderCard.setValue('receiverPhone', orderReceiveAddress.receiverPhone);
                    }
                    if (orderInvoice) {
                        // 客户开票单位
                        viewModel.salesorderCard.setValue('invoiceId', orderInvoice.invoiceId);
                        viewModel.salesorderCard.setValue('invoiceTitle', orderInvoice.invoiceTitle);
                        $('#invoiceId').val(orderInvoice.invoiceTitle);
                    }
                    // 获得当前最大行号
                    viewModel.getCurRowNum();
                    viewModel.goBillPanel();
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                });
            },
            //清空已选销售产品参照
            clearItemsRef: function () {
                viewModel.ItemRefList.setValue("productref", "");
                var refer = $("#refContainerproductref").data("uui.refer");
                refer.uncheckAll();
                refer.setValue([]);
            },
            // 从行号池中拿到最新的行号
            generaterowNum: function () {
                var latestnum = viewModel.currowNum(),
                    newnum = parseFloat(latestnum) + 10;
                viewModel.currowNum(newnum);
                return newnum;
            },
            //删除子表项
            delItems: function () {
                var selectedRows = viewModel.saleOrderItems.getSelectedRows();
                viewModel.saleOrderItems.removeRows(selectedRows);
                viewModel.calcItemTotal();
            },
            // 表头检查
            isAvailable: function () {
                var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
                // var saleOrg = $("#refContainersaleOrgId").data("uui.refer").values;
                var customer = $("#refContainercustomerId").data("uui.refer").values;
                // var settleFinancialOrg = $("#refContainersettleFinancialOrgId").data("uui.refer").values;
                var essentialData = {
                    customer: "客户",
                    orderType: "订单类型",
                    // saleOrg: "销售组织",
                    // settleFinancialOrg: "结算财务组织"
                }
                var errmsg = "";
                for (var key in essentialData) {
                    if (!eval(key)) {
                        errmsg += ("<span style='color:red'>" + essentialData[key] + "&nbsp;</span>");
                    }
                }
                if (errmsg) {
                    toastr.warning("请先选择" + errmsg);
                    return false;
                }
                if (orderType[0].saleModelCode === '03') {
                    var costType = $("#refContainercostTypeId").data("uui.refer").values;
                    if (!costType) {
                        toastr.warning("请先选择货补费用类型");
                        return false;
                    }
                }
                return true;
            },
            //保存单据
            saveBill: function () {
                var result = viewModel.validateBill();
                if (result) {
                    var currentRow, index = viewModel.index;
                    var salesorderData = viewModel.salesorderCard.getSimpleData()[0];
                    var saleOrderItemsData = viewModel.saleOrderItems.getSimpleData();
                    var batchSaleOrderBomItems = viewModel.batchSaleOrderBomItems.getSimpleData();
                    salesorderData.orderInvoice = viewModel.orderInvoice.getSimpleData()[0];
                    salesorderData.orderReceiveAddress = viewModel.orderReceiveAddress.getSimpleData()[0];

                    if (index >= 0) {
                        //编辑时补充被过滤掉的信息
                        // var childdata = viewModel.saleOrderItems._oldsimpledata;
                        // var filtereddata = common.dataconvert.filterByfield(childdata, "billItemStatusCode", [billstatus.ROWCOMMITTED], true);
                        // Array.prototype.push.apply(saleOrderItemsData, filtereddata);
                    } else {
                        batchSaleOrderBomItems.forEach(function (item) {
                            item.persistStatus = 'new'
                        });
                        saleOrderItemsData.forEach(function (item) {
                            item.persistStatus = 'new'
                        });
                    }
                    var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
                    for (var i = 0; i < saleOrderItemsData.length; i++) {
                        const orderItem = saleOrderItemsData[i];
                        if (1 == orderItem.isGift || '03' == orderType[0].saleModelCode) {
                            orderItem.dealPrice = 0;
                        }
                    }
                    salesorderData.orderItems = saleOrderItemsData;
                    salesorderData.orderItemBoms = batchSaleOrderBomItems;
                    var _ajaxUrl = "/create-order";
                    $._ajax({
                        url: appCtx + viewModel.baseurl + _ajaxUrl,
                        type: "post",
                        data: JSON.stringify(salesorderData),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (index >= 0) {
                                currentRow = viewModel.salesorderList.getRowByRowId(viewModel.rowId);
                            } else {
                                currentRow = viewModel.salesorderList.createEmptyRow();
                            }
                            currentRow.setSimpleData(data);
                            toastr.success("保存成功");
                            viewModel.retListPanel();
                        }
                    })
                }

            },
            // 校验单据合法性
            validateBill: function () {
                var result = this.app.compsValidateMultiParam({
                    element: $("#salesorder-operatepanel")[0],
                    showMsg: true
                });
                // 编辑时不校验主表字段
                if (result.passed || CONST.BILLPANELSTATUS.EDIT == viewModel.billPanelStatus()) {
                    var rows = viewModel.saleOrderItems.getAllRealRows();
                    if (rows && rows.length > 0) {
                        var errmsg = "";
                        for (var i = 0; i < rows.length; i++) {
                            var temperrmsg = "";
                            // 数量校验
                            if (rows[i].getValue("orderNum") == null || rows[i].getValue("orderNum") == "") {
                                temperrmsg += " <span style='color:red'>请录入退货数量</span> "
                            } else {
                                var quantity = parseInt(rows[i].getValue("orderNum"));
                                if (quantity <= 0) {
                                    temperrmsg += " <span style='color:red'>数量不能为负</span> "
                                }
                            }
                            // TODO 询价
                            rows[i].setValue("salePrice", rows[i].getValue('basePrice'));
                            // 价格校验
                            if (!rows[i].getValue("salePrice") || !rows[i].getValue("dealPrice")) {
                                temperrmsg += " <span style='color:red'>未询到价格</span> "
                            }
                            if (temperrmsg) {
                                temperrmsg = "行号为：" + rows[i].getValue("rowNum") + " 销售产品为：" + rows[i].getValue("goodsName") + temperrmsg + "<br/>";
                                errmsg += temperrmsg;
                            }
                        }
                        if (errmsg) {
                            errmsg = "保存失败，请检查<br/>" + errmsg
                            toastr.error(errmsg);
                            return false;
                        }
                    } else {
                        toastr.warning("至少添加一个产品");
                        return false;
                    }
                } else {
                    return false;
                }
                return true;

            },
            //取消单据编辑
            cancelBill: function () {
                if (viewModel.billPanelStatusCheck() == 0) {
                    if (!viewModel.checkupdstatus()) {
                        common.dialog.confirmDialog({
                            msg1: '当前订单已修改,尚未保存',
                            msg2: '是否返回列表',
                            width: '400px',
                            onOk: function () {
                                viewModel.retListPanel();
                            }
                        });
                    } else {
                        viewModel.retListPanel();
                    }
                } else {
                    viewModel.retListPanel();
                }
            },
            // 查询单据编辑状态
            checkupdstatus: function () {
                var curRow = viewModel.salesorderCard.getFocusRow();
                if (curRow && curRow.status == "upd") {
                    return false;
                }
                var childRows = viewModel.saleOrderItems.getAllRows();
                if (childRows && childRows.length > 0) {
                    for (var i = 0; i < childRows.length; i++) {
                        if (childRows[i].status == "upd") {
                            return false;
                        }
                    }
                }
                return true;
            },
            // 操作订单前，检查订单状态是否正确
            checkStatus: function (rows, checker) {
                var msg = '';
                if (checker.needCode == '04') {
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (row.getValue("orderStatusCode") !== checker.needCode) {
                            if (row.getValue("orderStatusCode") != '09' || row.getValue("orderStatusCode") != '07') {
                                msg += '[' + row.getValue('orderCode') + ']、';
                            }
                        }
                    }
                    if (msg.length > 0) {
                        checker.errmsg(msg);
                        return false;
                    }
                } else {
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (row.getValue("orderStatusCode") !== checker.needCode) {
                            msg += '[' + row.getValue('orderCode') + ']、';
                        }
                    }
                    if (msg.length > 0) {
                        checker.errmsg(msg);
                        return false;
                    }
                }
                return true;
            },
            //提交单据
            submitBill: function () {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    var curRow = viewModel.salesorderList.getCurrentRow();
                    if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.SUBMIT)) {
                        viewModel.batch_ajax("/submit-order", curRow);
                    }
                }, 0);
            },
            //收回单据
            unsubmitBill: function () {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    var curRow = viewModel.salesorderList.getCurrentRow();
                    if (viewModel.checkStatus(curRow, ORDERSTATUSCHECK.UNSUBMIT)) {
                        viewModel.batch_ajax("/cancel-submit-order", curRow);
                    }
                }, 0);
            },
            //提交单据
            submitBillList: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.SUBMIT)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/submit-order", rows);
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            //收回单据
            unsubmitBillList: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.UNSUBMIT)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/cancel-submit-order", rows);
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            //审核单据
            approveBill: function () {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    var curRow = viewModel.salesorderList.getCurrentRow();
                    if (viewModel.checkStatus(curRow, ORDERSTATUSCHECK.APPROVE)) {
                        viewModel.batch_ajax("/approve-order", curRow);
                    }
                }, 0);
            },
            //弃审单据
            unapproveBill: function () {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    var curRow = viewModel.salesorderList.getCurrentRow();
                    if (viewModel.checkStatus(curRow, ORDERSTATUSCHECK.UNAPPROVE)) {
                        viewModel.batch_ajax("/cancel-approve-order", curRow);
                    }
                }, 0);
            },
            approveBillList: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.APPROVE)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/approve-order", rows, "审核通过了");
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            //弃审单据
            unapproveBillList: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.UNAPPROVE)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/cancel-approve-order", rows);
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            // 驳回
            rejectBillPanel: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.REJECT)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/reject-order", rows, "驳回");
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            // 订单推发货单
            pushOrderBillPanel: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.PUSH)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/push-order", rows, "推单");
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            // 整单关闭订单
            closeOrderBillPanel: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.CLOSE)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/close-order", rows, "关闭");
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            // 整单打开订单
            openOrderBillPanel: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.CLOSE)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/open-order", rows, "打开");
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            // 行关闭
            close_row: function () {
                // 判断是否冲抵过
                if (viewModel.isCostFlush == 1) {
                    toastr.warning('已经冲抵后不可再做此操作，如要操作，请先取消冲抵。');
                    return;
                }
                var rows = viewModel.saleOrderItems.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.OPEN)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/close-order-item", rows, "关闭");
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            // 行打开
            open_row: function () {
                // 判断是否冲抵过
                if (viewModel.isCostFlush == 1) {
                    toastr.warning('已经冲抵后不可再做此操作，如要操作，请先取消冲抵。');
                    return;
                }
                var rows = viewModel.saleOrderItems.getSelectedRows();
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.OPEN)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/open-order-item", rows, "打开");
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            // 打开 and 关闭
            batch_ajax: function (url, rows, remark, callback) {
                var ids = [];
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
                $._ajax({
                    url: appCtx + viewModel.baseurl + url,
                    type: "post",
                    data: {
                        id: ids.join(","),
                        remark: remark
                    },
                    success: function (data) {
                        var success = true,
                            errmsg = "";
                        if (data && data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].code == "0") {
                                    errmsg += "单号为：" + data[i].content + " 操作失败,原因为：" + data[i].message + "<br/>";
                                }
                            }
                            if (errmsg.length > 0) {
                                success = false;
                                toastr.error(errmsg);
                            }
                        }
                        if (success) {
                            if (typeof callback == "function") {
                                callback();
                            }
                            var message = "操作成功。";
                            toastr.success(message);
                            viewModel.search();
                        }
                    }
                });
            },
            // 询促销
            searchprom: function () {
                // 判断是否冲抵过
                if (viewModel.isCostFlush == 1) {
                    toastr.warning('已经冲抵后不可再做此操作，如要操作，请先取消冲抵。');
                    return;
                }
                var customerId = viewModel.salesorderCard.getValue("customerId");
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                var orderItems = viewModel.saleOrderItems.getSimpleData();
                if (!customerId) {
                    toastr.warning("请先选择客户");
                    return false;
                }
                if (!saleOrgId) {
                    toastr.warning("请先选择销售组织");
                    return false;
                }
                if (!orderItems || orderItems.length <= 0) {
                    toastr.warning("请添加商品行");
                    return false;
                }
                var postdata = {
                    customerId: customerId,
                    saleOrgId: saleOrgId,
                    orderItems: orderItems
                };
                $._ajax({
                    url: window.pathMap.b2b + '/b2b/prom/reqorder-prom',
                    type: 'post',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(postdata),
                    success: function (res) {
                        if (!res) {
                            toastr.warning("没有可用的促销信息");
                        }
                    }
                });
            },
            // 询费用： 费用冲抵
            searchFee: function (del) {
                var customerId = viewModel.salesorderCard.getValue("customerId");
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                var orderItems = viewModel.saleOrderItems.getSimpleData();
                var orderItemsBom = viewModel.saleOrderItems.getAllRows();

                if (!customerId) {
                    toastr.warning("请先选择客户");
                    return false;
                }
                if (!saleOrgId) {
                    toastr.warning("请先选择销售组织");
                    return false;
                }
                if (del == 'del') {
                    if (!orderItems || orderItems.length <= 0) {
                        viewModel.salesorderCard.setValue('offsetAmount', 0);
                        viewModel.salesorderCard.setValue('totalDealAmount', 0);
                        return false;
                    }
                } else {
                    if (!orderItems || orderItems.length <= 0) {
                        toastr.warning("请添加商品行");
                        return false;
                    }
                }
                var postdata = {
                    customerId: customerId,
                    // orderItems: orderItems,
                    saleOrgId: saleOrgId
                };
                $._ajax({
                    url: window.pathMap.b2b + '/b2b/customer-cast/cast-rate',
                    type: 'get',
                    contentType: 'application/json;charset=UTF-8',
                    data: postdata,
                    success: function (res) {
                        if (!res || !res.supplyMaxOccupyMny) {
                            toastr.warning("没有可取消的费用信息");
                            return false;
                        }
                        var maxSupply = 0;
                        var supplyMaxOccupyMny = res.supplyMaxOccupyMny;
                        var costOffsetRatio = res.costOffsetRatio;
                        var totalAmount = 0;
                        var totalDealAmount = 0;
                        for (var i = 0; i < orderItems.length; i++) {
                            var item = orderItems[i];
                            // totalAmount += parseFloat(item.dealPrice);
                            var dealAmount = item.baseDiscountPrice * item.mainNum * (1 - costOffsetRatio);
                            var dealPrice = dealAmount / item.mainNum;
                            var getCurrentRow = viewModel.saleOrderItems.getCurrentRow();
                            orderItemsBom[i].setValue('dealAmount', dealAmount);
                            orderItemsBom[i].setValue('dealPrice', dealPrice);
                            totalAmount += parseFloat(item.baseDiscountPrice) * item.mainNum * costOffsetRatio;
                            totalDealAmount += dealAmount;
                        }
                        if (totalAmount > supplyMaxOccupyMny) {
                            maxSupply = supplyMaxOccupyMny;
                        } else {
                            maxSupply = totalAmount;
                        }
                        viewModel.salesorderCard.setValue('offsetAmount', maxSupply);
                        viewModel.salesorderCard.setValue('totalDealAmount', totalDealAmount);
                    }
                });

            },
            // 费用冲抵
            costflushing: function () {
                var result = viewModel.validateBill();
                if (!result) {
                    return;
                }
                var customerId = viewModel.salesorderCard.getValue("customerId");
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                var costTypeId = viewModel.salesorderCard.getValue("costTypeId");
                var orderItems = viewModel.saleOrderItems.getSimpleData();
                var orderEnable = [];
                for (var i = 0; i < orderItems.length; i++) {
                    if (orderItems[i].dr != 1) {
                        orderEnable.push(orderItems[i]);
                    }
                }

                if (!customerId) {
                    toastr.warning("请先选择客户");
                    return false;
                }
                if (!saleOrgId) {
                    toastr.warning("请先选择销售组织");
                    return false;
                }
                if (!orderEnable || orderEnable.length <= 0) {
                    toastr.warning("请添加商品行");
                    return false;
                }
                var settleFinancialOrgId = orderEnable[0].settleFinancialOrgId;
                for (var i = 1; i < orderEnable.length; i++) {
                    if (settleFinancialOrgId != orderEnable[i].orderEnable) {
                        toastr.warning('结算财务组织必须一致，请重新选择！');
                        return;
                    }
                }

                viewModel.costflushingdialog = u.dialog({
                    id: 'dialog_showCostflushing',
                    content: "#dialog_showCostflushing",
                    hasCloseMenu: true,
                    width: "75%"
                });
                var postdata = {
                    search_IN_customer: customerId,
                    search_IN_saleOrg: saleOrgId,
                    search_EQ_billStatus: '04',         // 04 已通过的费用单
                    search_EQ_castType: costTypeId
                };
                $._ajax({
                    url: window.pathMap.b2b + '/b2b/customer-cast/cast-rate',
                    type: 'get',
                    contentType: 'application/json;charset=UTF-8',
                    data: {
                        customerId: customerId,
                        saleOrgId: saleOrgId
                    },
                    success: function (res) {
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].financeOrgId == settleFinancialOrgId) {
                                viewModel.costFlushDetailCard.setSimpleData(res[i]);
                            }
                        }
                    }
                });
                $._ajax({
                    url: window.pathMap.fee + '/customer-casts',
                    type: "get",
                    data: postdata,
                    success: function (res) {
                        viewModel.costFlushingEdit.setSimpleData(res.content);
                    }
                });
                var closefunc = function () {
                    viewModel.costFlushingEdit.removeAllRows();
                    viewModel.costflushingdialog.close();
                    viewModel.costflushingdialog = null;
                }
                var cancelButton = $("#dialog_showCostflushing .J-cancel");
                var confrimButton = $("#dialog_showCostflushing .J-ok");
                var closeButton = $("#dialog_showCostflushing .u-msg-close");
                cancelButton.off().on('click', closefunc);
                closeButton.off().on('click', closefunc);
                confrimButton.off().on('click', function () {
                    var confrimData = viewModel.costFlushingEdit.getSimpleData();
                    var costFlushDetailCard = viewModel.costFlushDetailCard.getSimpleData()[0];
                    var flushAmount = 0;
                    confrimData.forEach(function (item) {
                        flushAmount += parseFloat(item.actualFlushAmount);
                    });
                    if (flushAmount > costFlushDetailCard.supplyMaxOccupyMny) {
                        toastr.warning('使用费用冲抵金额不能大于最大冲抵金额！');
                        return;
                    }
                    viewModel.resetAmount(flushAmount, viewModel.costFlushDetailCard.getValue('costOffsetRatio'), closefunc);
                });
            },
            // 根据冲抵金额重新渲染商品行价格
            resetAmount: function (amout, costOffsetRatio, cb) {
                var orderItemsBom = viewModel.saleOrderItems.getAllRows();
                var saleOrderItem = viewModel.saleOrderItems.getSimpleData();
                var orderEnable = [];
                for (var i = 0; i < saleOrderItem.length; i++) {
                    if (saleOrderItem[i].dr != 1) {
                        orderEnable.push(saleOrderItem[i]);
                    }
                }
                var supplyMaxOccupyMny = amout;
                var totalAmount = 0;
                var totalDealAmount = 0;
                var costFulshAmount = 0;        // 订单行总价格，用来计算没行兑付金额的比例
                orderEnable.forEach(function (item) {
                    costFulshAmount += parseFloat(item.baseDiscountPrice) * item.mainNum;
                });
                // 最大冲抵金额，=∑[min[(本次订单冲抵前金额合计*订单冲抵比例参数)，该订单可用的费用单余额合计]]  
                var maxSupply = costFulshAmount * costOffsetRatio > amout ? amout : costFulshAmount * costOffsetRatio;
                for (var i = 0; i < orderEnable.length; i++) {
                    var item = orderEnable[i];
                    // 每行的总价 价格 * 数量， 没有减去促销后的价格
                    var rowTotalAmount = parseFloat(item.baseDiscountPrice) * item.mainNum;
                    // 每笔订单可用的兑付金额
                    var costAmount = maxSupply * (rowTotalAmount / costFulshAmount);
                    // 判断冲抵金额 是否 大于 订单行金额， 大于则冲抵金额取订单行金额, 订单行价格可为0 但不能为负数，故此判断
                    var rowAm = 0,      // 行使用冲抵价格
                        dealAmount = 0; // 总价
                    if (costAmount >= rowTotalAmount) {
                        rowAm = rowTotalAmount;
                    } else {
                        rowAm = costAmount;
                        dealAmount = rowTotalAmount - rowAm;
                    }
                    totalAmount += rowAm;
                    totalDealAmount += dealAmount;

                    var dealPrice = dealAmount / item.mainNum;
                    orderItemsBom[i].setValue('dealAmount', dealAmount);        // 成交总价
                    orderItemsBom[i].setValue('offsetAmount', rowAm);           // 行使用冲抵价格
                    orderItemsBom[i].setValue('dealPrice', dealPrice);          // 成交价
                }
                // 费用冲抵金额
                viewModel.salesorderCard.setValue('offsetAmount', totalAmount);
                // 表头总金额
                viewModel.salesorderCard.setValue('totalDealAmount', totalDealAmount);
                if (cb && typeof cb == 'function') {
                    cb();
                    viewModel.costFreezeEvent(true);
                }
            },
            // 费用冲抵成功后 各个按钮不可再点击，
            costFreezeEvent: function (isCostFlush) {
                var orderNumOpt = viewModel.app.getComp("grid_salesorder_edit").grid.getColumnByField("orderNum");
                var settleFinancialOrg = viewModel.app.getComp("grid_salesorder_edit").grid.getColumnByField("settleFinancialOrgId");
                if (isCostFlush) {
                    $('.isCostFlush input').attr('disabled', 'disabled');
                    viewModel.isCostFlush = 1;
                    // 限制行上点击
                    orderNumOpt.options.editable = false;
                    settleFinancialOrg.options.editable = false;
                } else {
                    viewModel.isCostFlush = 0;
                    $('.isCostFlush input').removeAttr('disabled');
                    orderNumOpt.options.editable = true;
                    settleFinancialOrg.options.editable = true;
                }
            },
            // 取消费用冲抵
            cancelSearchFee: function () {
                var customerId = viewModel.salesorderCard.getValue("customerId");
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                var orderItems = viewModel.saleOrderItems.getSimpleData();
                var orderItemsBom = viewModel.saleOrderItems.getAllRows();
                var orderEnable = [];
                for (var i = 0; i < orderItems.length; i++) {
                    if (orderItems[i].dr != 1) {
                        orderEnable.push(orderItems[i]);
                    }
                }

                var totalAmount = 0, totalDealAmount = 0;
                for (var i = 0; i < orderEnable.length; i++) {
                    var item = orderEnable[i];
                    var rate = parseFloat(item.conversionRate || "1");
                    var dealAmount = item.baseDiscountPrice * item.mainNum * rate || 0;
                    var dealPrice = dealAmount / (item.mainNum * rate) || 0;
                    orderItemsBom[i].setValue('dealAmount', dealAmount);
                    orderItemsBom[i].setValue('dealPrice', dealPrice);
                    totalDealAmount += dealAmount;
                }
                viewModel.salesorderCard.setValue('offsetAmount', 0);
                viewModel.salesorderCard.setValue('totalDealAmount', totalDealAmount);
                viewModel.costFreezeEvent(false);
            },
            openProductDlg: function () {
                if (viewModel.isAvailable()) {
                    // 清空搜索条件和已选数据
                    viewModel.productSearchParam.removeAllRows();
                    viewModel.productSearchParam.createEmptyRow();
                    viewModel.selectedproductList.removeAllRows();
                    // 加载产品数据
                    viewModel.productsearch(true);
                    if (!viewModel.specialproductdialog) {
                        viewModel.specialproductdialog = u.dialog({
                            id: 'dialog_specialproduct',
                            content: "#dialog_specialproduct",
                            hasCloseMenu: true,
                            width: "80%"
                        });
                        var okButton = $("#dialog_specialproduct .J-ok");
                        okButton.off().on('click', function () {
                            viewModel.insertSelectedProduct();
                            viewModel.specialproductdialog.close();
                        });
                        var cancelButton = $("#dialog_specialproduct .J-cancel");
                        cancelButton.off().on('click', function () {
                            viewModel.specialproductdialog.close();
                        });
                    } else {
                        viewModel.specialproductdialog.show();
                    }
                }
            },
            // 计算并显示选中行合计信息
            showSelectedItemsSum: function () {

                var orderitemtotalnumber = 0,
                    orderitemtotalamount = 0,
                    orderitemtotalvolume = 0,
                    orderitemtotalweight = 0;
                var SelectedRows = viewModel.saleOrderItems.getSelectedRows();
                if (u.isArray(SelectedRows) && SelectedRows.length > 0) {
                    for (var i = 0; i < SelectedRows.length; i++) {
                        orderitemtotalnumber += parseFloat(SelectedRows[i].getValue("billedQuantity") || 0);
                        orderitemtotalamount += parseFloat(SelectedRows[i].getValue("amount") || 0);
                        orderitemtotalvolume += parseFloat(SelectedRows[i].getValue("volume") || 0);
                        orderitemtotalweight += parseFloat(SelectedRows[i].getValue("weight") || 0);
                    }
                } else {
                    var curRow = viewModel.salesorderList.getCurrentRow();
                    orderitemtotalnumber = parseFloat(curRow.getValue("totalQuantity") || 0);
                    orderitemtotalamount = parseFloat(curRow.getValue("totalAmount") || 0);
                    orderitemtotalvolume = parseFloat(curRow.getValue("totalVolume") || 0);
                    orderitemtotalweight = parseFloat(curRow.getValue("totalWeight") || 0);
                }
                orderitemtotalnumber = viewModel.formater.format(orderitemtotalnumber);
                orderitemtotalamount = viewModel.formater.format(orderitemtotalamount);
                orderitemtotalvolume = viewModel.formater3.format(orderitemtotalvolume);
                orderitemtotalweight = viewModel.formater3.format(orderitemtotalweight);
                viewModel.orderitemtotalnumber(orderitemtotalnumber);
                viewModel.orderitemtotalamount(orderitemtotalamount);
                viewModel.orderitemtotalvolume(orderitemtotalvolume);
                viewModel.orderitemtotalweight(orderitemtotalweight);
            },
            selectIsCombineLast: function (rowId) {
                var indices = viewModel.getCombineOtherIndices(rowId);
                var rows = viewModel.saleOrderItems.rows();
                for (var i = 0; i < indices.length; i++) {
                    // 产品组合中存在未选中产品，则当前选中行不是最后一个
                    if (!rows[indices[i]].selected()) {
                        return false;
                    }
                }
                return true;
            },
            selectIsCombineFirst: function (rowId) {
                var indices = viewModel.getCombineOtherIndices(rowId);
                var rows = viewModel.saleOrderItems.rows();
                for (var i = 0; i < indices.length; i++) {
                    // 产品组合中存在选中产品，则当前选中行不是第一个
                    if (rows[indices[i]].selected()) {
                        return false;
                    }
                }
                return true;
            },
            unSelectIsCombineLast: function (rowId) {
                var indices = viewModel.getCombineOtherIndices(rowId);
                var rows = viewModel.saleOrderItems.rows();
                for (var i = 0; i < indices.length; i++) {
                    // 产品组合中存在选中产品，则当前反选不是最后一个
                    if (rows[indices[i]].selected()) {
                        return false;
                    }
                }
                return true;
            },
            unSelectIsCombineFirst: function (rowId) {
                var indices = viewModel.getCombineOtherIndices(rowId);
                var rows = viewModel.saleOrderItems.rows();
                for (var i = 0; i < indices.length; i++) {
                    // 产品组合中存在未选中产品，则当前反选不是第一个
                    if (!rows[indices[i]].selected()) {
                        return false;
                    }
                }
                return true;
            },
            // 在所有订单行中。根据某一产品行获取相同活动相同需求类型产品组合中其余产品行索引
            getCombineOtherIndices: function (rowId) {
                var indices = [];
                var curRow = viewModel.saleOrderItems.getRowByRowId(rowId);
                var combineId = curRow.getValue("productCombineId");
                var reqTypeId = curRow.getValue("reqTypeId");
                var promotionId = curRow.getValue("promotionId");
                var itemRows = viewModel.saleOrderItems.rows();
                for (var i = 0; i < itemRows.length; i++) {
                    if (itemRows[i].rowId === rowId) {
                        continue;
                    }
                    // 需求类型、活动、产品组合相同
                    if (itemRows[i].getValue("productCombineId") == combineId && itemRows[i].getValue("reqTypeId") == reqTypeId && itemRows[i].getValue("promotionId") == promotionId) {
                        indices.push(i);
                    }
                }
                return indices;
            },
            // 从行号池中拿到最新的行号
            generateRownum: function () {
                var latestnum = viewModel.curRowNum(),
                    newnum = latestnum + 100;
                viewModel.curRowNum(newnum);
                return newnum;
            },
            getCurRowNum: function () {
                var data = viewModel.saleOrderItems.getSimpleData();
                var maxRowNum = 0;
                if (data && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].rowNum > maxRowNum) {
                            maxRowNum = data[i].rowNum;
                        }
                    }
                }
                viewModel.curRowNum(maxRowNum);
            },
            // 清空已选参照
            clearRef: function (referids) {
                if (referids && referids.length > 0) {
                    for (var i = 0; i < referids.length; i++) {
                        var refer = $("#refContainer" + referids[i]).data("uui.refer");
                        refer.uncheckAll();
                        refer.setValue([]);
                    }
                }
            },
            changeCondition: function (domid, oldcondition, newcondition) {
                $("#" + domid).parent().attr("data-refparam", JSON.stringify(
                    u.extend({},
                        oldcondition,
                        newcondition
                    )
                ));
            },
            setDefaultCondition: function () {
                viewModel.changeCondition("customerId", {
                    "EQ_isEnable": "1", 'EQ_isChannelCustomer': '1', 'EQ_SuperCust': $.cookie('_A_P_userId')
                }, {});
            },
            // 处理合计行精度
            totalPrecisionHandle: function (row, type) {

                // var totalQuantity = viewModel.formater.format(parseFloat(row.getValue("totalQuantity")|| 0)),
                //   totalAmount = viewModel.formater.format(parseFloat(row.getValue("totalAmount")|| 0)),
                //   totalVolume = viewModel.formater3.format(parseFloat(row.getValue("totalVolume")|| 0)),
                //   totalWeight = viewModel.formater3.format(parseFloat(row.getValue("totalWeight")|| 0));
                // viewModel.orderitemtotalnumber(totalQuantity);
                // viewModel.orderitemtotalamount(totalAmount);
                // viewModel.orderitemtotalvolume(totalVolume);
                // viewModel.orderitemtotalweight(totalWeight);
            },
            //计算子表行合计
            calcItemTotal: function () {
                var rows = viewModel.saleOrderItems.getAllRealRows();
                var orderitemtotalnumber = 0,
                    orderitemtotalamount = 0,
                    orderitemtotalvolume = 0,
                    orderitemtotalweight = 0;
                if (u.isArray(rows) && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        orderitemtotalnumber += parseFloat(rows[i].getValue("billedQuantity") || 0);
                        orderitemtotalamount += parseFloat(rows[i].getValue("amount") || 0);
                        orderitemtotalvolume += parseFloat(rows[i].getValue("volume") || 0);
                        orderitemtotalweight += parseFloat(rows[i].getValue("weight") || 0);
                    }
                    orderitemtotalnumber = viewModel.formater.format(orderitemtotalnumber);
                    orderitemtotalamount = viewModel.formater.format(orderitemtotalamount);
                    orderitemtotalvolume = viewModel.formater3.format(orderitemtotalvolume);
                    orderitemtotalweight = viewModel.formater3.format(orderitemtotalweight);
                }
                viewModel.orderitemtotalnumber(orderitemtotalnumber);
                viewModel.orderitemtotalamount(orderitemtotalamount);
                viewModel.orderitemtotalvolume(orderitemtotalvolume);
                viewModel.orderitemtotalweight(orderitemtotalweight);
            },
            findByorderCode: function (orderCode) {
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/findorderbycode",
                    data: {
                        orderCode: orderCode
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data) {
                            viewModel.goDetailPanel();
                            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                            viewModel.salesorderDetailCard.setSimpleData(data);
                            if (data.saleOrderItems) {
                                viewModel.saleOrderItems.setSimpleData(data.saleOrderItems, {
                                    unSelect: true
                                });
                            }

                        }
                    }
                })
            },

            orderTypeChange: function (obj) {
                var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
                viewModel.salesorderCard.setValue("saleModel", orderType[0].saleModelCode);
                console.log(obj);
                // if (obj.field == "orderType" || obj.field == 'costType') {
                //   var orderTypecomp = app.getComp("orderType").comp;
                //   if (obj.oldValue && obj.newValue) {
                //     var oldValue = obj.oldValue;
                //     var newValue = obj.newValue;
                //   }
                //   else {
                //     return true;
                //   }
                //   //如果子表有数据或者业务账号有数据
                //   if (viewModel.saleOrderItems.getAllRows().length > 0) {
                //     var orderTypeName = common.dataconvert.valueToName(oldValue, viewModel.soTypeSrc);
                //     orderTypecomp.setName(orderTypeName);
                //     common.dialog.confirmDialog({
                //       msg1: '是否修改销售订单类型？',
                //       msg2: '修改后将清空业务数据',
                //       width: '400px',
                //       type: 'error',
                //       onOk: function () {
                //         // 确定后清除业务数据
                //         viewModel.saleOrderItems.removeAllRows();
                //         // viewModel.salesorderCard.setValue("businessAccountId", null);
                //         viewModel.salesorderCard.setValue("soTypeId", newValue);
                //       }
                //     })
                //   } else {
                //     return true;
                //   }
                //   return false;
                // }
            },
            costTypeChange: function () {
                console.log('costTypeChange');
            },
            showFeeCustItem: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
                viewModel.CustomerCastflushDetailItem.removeAllRows();
                if (rows.length == 0) {
                    toastr.warning("请先选择一行数据");
                    return;
                }
                var ids = [];
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
                viewModel.findFeeCustItemByid(ids, function (data) {
                    viewModel.CustomerCastflushDetailItem.setSimpleData(data);
                    if (!viewModel.showfeecustItemdialog) {
                        viewModel.showfeecustItemdialog = u.dialog({
                            id: 'dialog_showFeeCustItem',
                            content: "#dialog_showFeeCustItem",
                            hasCloseMenu: true,
                            width: "65%"
                        });
                        var closefunc = function () {
                            viewModel.CustomerCastflushDetailItem.removeAllRows();
                            viewModel.showfeecustItemdialog.close();
                        }
                        var cancelButton = $("#dialog_showFeeCustItem .J-cancel");
                        var closeButton = $("#dialog_showFeeCustItem .u-msg-close");
                        cancelButton.off().on('click', closefunc);
                        closeButton.off().on('click', closefunc);
                    } else {
                        viewModel.showfeecustItemdialog.show();
                    }
                });


            },
            //查询费用兑付明细
            findFeeCustItemByid: function (ids, callback) {
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/query-customercast-flush",
                    type: "get",
                    data: {
                        ids: ids.join(",")
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data && data.length > 0) {
                            if (typeof callback == "function") {
                                callback(data);
                            }
                        } else {
                            toastr.error("没有费用兑付明细");
                        }
                    }
                })
            },

            /**
             * @example 测试用，具体数据和展示对应功能调整
             */
            // 选配
            goodsOpt: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var baseGoodsOptId = obj.row.value.baseGoodsOptId;   // 选配id
                var optName = baseGoodsOptId ? baseGoodsOptId : '添加选配';
                var detailfun = "data-bind=click:goodsOptionalFun.bind($data," + obj.rowIndex + ")";
                obj.element.innerHTML =
                    '<a href="#" class="ui-a-detail" ' +
                    detailfun +
                    ">" + optName + "</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            // 查看选配
            goodsOptDetails: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var baseGoodsOptId = obj.row.value.baseGoodsOptId;   // 选配id
                if (baseGoodsOptId) {
                    var detailfun = "data-bind=click:goodsOptDetailsFun.bind($data," + obj.rowIndex + ")";
                    obj.element.innerHTML =
                        '<a href="#" class="ui-a-detail" ' +
                        detailfun +
                        ">查看选配</a>";
                } else {
                    obj.element.innerHTML =
                        '<span>无选配信息</span>';
                }

                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            goodsOptionalFun: function (obj) {
                /**
                 * @example 编辑选配common.goodsOptional.goodsOptional()
                 * @param viewModel 当前viewModel, 用来挂载dialog
                 * @param title     弹窗title
                 * @param goodsId   商品行Id
                 * @param baseGoodsOptId   选配结果id
                 * @param el        dialog id (不加 ‘#’)
                 * @param callback  确定是回调函数*   需要把信息保存到订单杭上， 如果是新增，就调用当前功能新增接口，编辑同理
                 * @function callback --> 保存后拿到选配id 饭后添加到订单行上
                 * @param  callback --> 保存后的选配信息做展示
                 * @param  callback --> 保存后的选配信息做展示
                 * @param  callback --> 成功后调取回调，关闭弹窗
                 */
                var data = viewModel.saleOrderItems.getSimpleData()[obj];
                var id = data.id ? data.id : data.goodsId;
                var baseGoodsOptId = data.baseGoodsOptId ? data.baseGoodsOptId : "";
                common.goodsOptional.goodsOptional(viewModel, '商品选配', id, baseGoodsOptId, 'dialog_goodsOptional', function (goodsOptData, goodsOptID, cb) {
                    console.log(goodsOptID[0]);
                    /**
                     * 循环遍历返回结果，拼接后展示
                     */
                    var goodsOpt = goodsOptID[0].goodsOptDtos;           // 选配与商品结构互斥，暂时理解为有子件的话不会出现选配信息 故只去第0项
                    var optResult = '', id = '';
                    for (var i = 0; i < goodsOpt.length; i++) {
                        optResult += goodsOpt[i].optResult + ';';
                        id += goodsOpt[i].id + ';';
                    }
                    optResult = optResult.substr(0, optResult.length - 1);
                    id = id.substr(0, id.length - 1);
                    viewModel.saleOrderItems.setValue('baseGoodsOptId', id);
                    cb();
                });
            },
            goodsOptDetailsFun: function (obj) {
                /**
                 * @example 查看选配common.goodsOptional.OptionalDetails()
                 * @param viewModel 当前viewModel, 用来挂载dialog
                 * @param title     弹窗title
                 * @param goodsId   商品行Id
                 * @param el        dialog id (不加 ‘#’)
                 */
                var data = viewModel.saleOrderItems.getSimpleData()[obj];
                var id = data.id ? data.id : data.goodsId;
                var baseGoodsOptId = data.baseGoodsOptId ? data.baseGoodsOptId : "";

                common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, baseGoodsOptId, 'dialog_goodsOptDetails');
            },
            //选择商品页签
            checkGoods: function () {
                viewModel.isBomPanel(true);
                if (viewModel.billPanelStatus() === "detail") {
                    $("#tab-panel-4").hide();
                    $("#tab-panel-3").show();
                } else {
                    $("#tab-panel-2").hide();
                    $("#tab-panel-1").show();
                }
            },
            //选择Bom页签
            checkBom: function () {
                viewModel.isBomPanel(false);
                if (viewModel.billPanelStatus() === "detail") {
                    $("#tab-panel-4").show();
                    $("#tab-panel-3").hide();
                } else {
                    $("#tab-panel-2").show();
                    $("#tab-panel-1").hide();
                }
            },
            // 从行号池中拿到最新的bom行号
            generateBomrowNum: function () {
                var latestnum = viewModel.currowBomNum(),
                    newnum = parseFloat(latestnum) + 10;
                viewModel.currowBomNum(newnum);
                return newnum;
            },
            getBomCurrowNum: function () {
                var data = viewModel.batchSaleOrderBomItems.getSimpleData();
                var maxrowNum = 0;
                if (data && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].rowNum > maxrowNum) {
                            maxrowNum = data[i].rowNum;
                        }
                    }
                }
                viewModel.currowBomNum(maxrowNum);
            },
            getGoodsPrice: function (ids) {
                if (!ids) {
                    toastr.warning('商品id值为空！');
                    return;
                }
                $._ajax({
                    type: "get",
                    url: appCtx + url,
                    dataType: "json",
                    data: ids,
                    success: function (data) {

                    }
                });
            },
            // 费用冲抵状态
            billStatusRender: function (obj) {
                var statusCode = obj.value;
                var statusName = "";
                switch (statusCode) {
                    case "01":
                        statusName = "未处理";
                        break;
                    case "02":
                        statusName = "已提交";
                        break;
                    case "03":
                        statusName = "审批中";
                        break;
                    case "04":
                        statusName = "审批通过";
                        break;
                    case "05":
                        statusName = "审批不通过";
                        break;
                    case "06":
                        statusName = "部分兑付";
                        break;
                    case "07":
                        statusName = "全部兑付";
                        break;
                }
                obj.element.innerHTML = statusName;
            },

        };
    }
    return events;
});