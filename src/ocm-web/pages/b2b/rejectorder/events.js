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
        /*var ORDERSTATUS = {
        Saved("01", "待处理", "整单状态"),
        Committed("02", "已提交", "整单状态"),
        Approving("03", "审批中", "整单状态"),
        Approved("04", "审批通过", "整单状态"),
        Disapproved("05", "审批不通过", "整单状态"),
        Rejected("06", "已驳回", "整单状态"),
        PartStockOut("07", "部分出库", "整单状态"),
        AllStockOut("08", "全部出库", "整单状态"),
        PartStockIn("09", "部分入库", "整单状态"),
        AllStockIn("10", "全部入库", "整单状态");
        }*/
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
                needCode: "04",
                errmsg: function (s) {
                    toastr.warning("单据号为：" + s + "的订单不已审批状态，不能进行该操作");
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
            checkEmpty: function () {
                var allItemRows = viewModel.saleOrderItems.getAllRealRows();
                var emptyGoodsOptRows = "";
                if (allItemRows.length > 0) {
                    allItemRows.forEach(function (item) {
                        if (!item.getValue("baseGoodsOptId") && parseFloat(item.getValue("isOptional")) == 1) {
                            emptyGoodsOptRows += item.getValue("rowNum") + ",";
                        }
                    });
                    emptyGoodsOptRows = emptyGoodsOptRows.slice(0, emptyGoodsOptRows.length - 1);
                    if (emptyGoodsOptRows) {
                        if (emptyGoodsOptRows) toastr.warning("请为行号" + emptyGoodsOptRows + "的商品添加选配");
                        return false;
                    } else {
                        return true;
                    }
                }
                return true;
            },
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
                /*if (searchindex == 1) {
                  queryData["search_IN_billStatus"] = billstatus.COMMITTED;
                }
                else if (searchindex == 2) {
                  queryData["search_IN_billStatus"] = billstatus.APPROVED;
                }
                else if (searchindex == 3) {
                  queryData["search_IN_billStatus"] = billstatus.FINISHED;
                }*/
                queryData.page = pageNumber;
                queryData.size = pageSize;
                queryData.search_IN_saleModel = "02,04";
                if (!queryData["search_EQ_saleOrg"]) {
					queryData["search_NOTNULL_saleOrg"] = "~";
				}
                // queryData["search_EQ_isVso"] = 0;
                // queryData["search_IN_orderType.trantypeExtends.fieldValue"] = "02,04";
                // 处理从首页跳转过来的情况下，带来的全局参数（afterCreate中保存的参数）
                if (viewModel.globalQueryData && viewModel.globalQueryData.length > 0) {
                    for (var i = 0; i < viewModel.globalQueryData.length; i++) {
                        queryData[viewModel.globalQueryData[i].key] = viewModel.globalQueryData[i].value;
                    }
                }
                // if (!queryData.search_EQ_orderType) queryData.search_IN_orderType = "SaleReturn";
                var url = viewModel.golbalIsDaichuku ? viewModel.daichukuurl : viewModel.baseurl
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.salesorderList.setSimpleData(data.content, {unSelect: true});
                        viewModel.salesorderList.totalRow(data.totalElements);
                        viewModel.salesorderList.totalPages(data.totalPages);
						viewModel.listTemplate.updateExtendData();
                    }
                })
            },
            //导入
            importHandle: function() {
                var urlInfo = "/saleOrder-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/saleOrder-excel/excelLoadingStatus"; //请求进度地址参数
				var ele = $("#importFiel")[0]; //挂载元素
				var searchData = JSON.stringify({
					saleModel: '02'
				})
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1, function(data) {
					console.log(data)
				}, null, searchData);
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
                    var orderCode;
					for (var i = 0; i < rows.length; i ++) {
						var orderSource = rows[i].getValue("orderSource");
						if (orderSource == "01") {
							orderCode = rows[i].getValue("orderCode");
							i = rows.length;
						}
					}
					if (orderCode) {
						toastr.warning("订单：" + orderCode + " 为门户下单，中台不能删除"); 
						return;
					}
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
                                        item.setValue("dr", "1");
                                    }
                                })
                            });
                            viewModel.saleOrderItems.removeRows(rows);
                            // 计算合计金额、合计数量
                            viewModel.calculationAmount();
                            // viewModel.searchFee('del');
                        }
                    });
                } else {
                    toastr.warning("请先选择一行数据");
                }
            },
            calculationAmount: function () {
                var isDrArr = viewModel.saleOrderItems.getSimpleData();
                var arr = [];
                isDrArr.forEach(function (item) {
                    if (item.dr != 1) {
                        arr.push(item);
                    }
                });
                var totalAmount = 0;
                var totalNum = 0;
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        totalAmount += parseFloat(arr[i].dealAmount);
                        totalNum += parseFloat(arr[i].mainNum);
                    }
                }
                viewModel.salesorderCard
                    .getCurrentRow()
                    .setValue("totalNum", totalNum);

				var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

                if ('03' == orderType[0].saleModelCode) {
                    viewModel.salesorderCard
                        .getCurrentRow()
                        .setValue("offsetAmount", totalAmount);
                    totalAmount = 0;
                }
                viewModel.salesorderCard
                    .getCurrentRow()
                    .setValue("totalDealAmount", totalAmount);
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
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
				viewModel.goBillPanel(function () {
					viewModel.showAddBillPanelCallBack();
					viewModel.editEventListener();
				});
			},
            showAddBillPanelCallBack: function () {
                setTimeout(function () {
					viewModel.getBillIdAjax();
				}, 1000);
                viewModel.index = -1;
                viewModel.isBomPanel(true);
				viewModel.isDetail = false; // 标识用于展示附件的
                viewModel.orderPromRels = [];
                viewModel.itemOrderPromRels = [];
                viewModel.batchSaleOrderBomItems.removeAllRows();
                viewModel.salesorderCard.removeAllRows();
                var curRow = viewModel.salesorderCard.createEmptyRow();
                viewModel.currowNum(0);
                //合计行还原
                viewModel.totalPrecisionHandle(curRow, "add");
				curRow.setValue("deliveryDate", new Date().getTime());
                curRow.setValue("orderStatusId", "01");
                curRow.setValue("orderDate", new Date().getTime());
                var currency = JSON.parse(localStorage.getItem('_A_P_currency'));
				if (currency) curRow.setValue("currencyId", currency.id);
				$("#salesorderCard_customerId").attr("placeholder", "请先选择销售组织");
				viewModel.salesorderCard.setMeta("customerId", "enable", false);
				$("#salesorderCard_receiveCustomerId").attr("placeholder", "请先选择销售组织");
				viewModel.salesorderCard.setMeta("receiveCustomerId", "enable", false);
                viewModel.attachList = [];
                viewModel.saleOrderItems.removeAllRows();
                viewModel.setDefaultCondition();
                viewModel.isOriginalSingle(0);
                var salesManagerBase = viewModel.app.getComp("salesManagerId");
				salesManagerBase && $(salesManagerBase.element).attr(
					"data-refparam",
					'{"EQ_isEnable":"1","AUTH_refdim":"salesManager"}'
                );
                $("#salesorderCard_orderTypeId").parent().attr("data-refparam", JSON.stringify({
					EQ_isEnable: "1",
					EQ_billTypeId: "SaleOrder",
					"IN_trantypeExtends.fieldValue": "02"
                }));
                viewModel.saleOrderItems.setMeta(
                    "returnTypeId",
                    "refcfg",
                    '{"refCode":"QY135","ctx":"/uitemplate_web"}'
                );
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
            detail: function(){
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
				viewModel.goDetailPanel(
					function () {
						viewModel.showDetailBillPanelCallBackail();
					}
				);
			},
            showDetailBillPanelCallBackail: function () {
                viewModel.isBomPanel(true);
                $("#tab-panel-4").hide();
                $("#tab-panel-3").show();
                viewModel.isDetail = true;
                $("#order-detail-attach").html('');
                viewModel.salesorderDetailCard.removeAllRows();
                viewModel.saleOrderItems.removeAllRows();
                viewModel.batchSaleOrderBomItems.removeAllRows();
                $('#tab4').removeClass('is-active');
                $('#tab3').addClass('is-active');
                var grid = viewModel.app.getComp("grid_template_showuigrid_saleOrderItems").grid;
                grid.setColumnVisibleByColumn(grid.getColumnByField("deliveryNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("stockOutNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("returnNum"), false);
                grid.setColumnVisibleByColumn(grid.getColumnByField("stockInNum"), false);
                //确保grid先将行设置为focus状态

                setTimeout(function () {
                    var curRow = viewModel.salesorderList.getCurrentRow();
                    var isShowEdit = curRow.getValue("orderStatusCode") == "01" ? "Saved" : false;
					viewModel.billPanelStatusEdit(isShowEdit);
                    // 为合计行进行精度处理
                    viewModel.totalPrecisionHandle(curRow);
                    var id = curRow.getValue("id");
                    viewModel.findByParentid(id, function (maindata) {
                        viewModel.pk = maindata.id;
                        // 先渲染门户附件
						viewModel.orderAttachments = maindata.orderAttachments;
						viewModel.showAttachment("01");
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
                        var orderInvoice = maindata.orderInvoice;
                        var orderReceiveAddress = maindata.orderReceiveAddress;

                        viewModel.salesorderDetailCard.setSimpleData(maindata);

                        if (orderReceiveAddress) {
                            viewModel.salesorderDetailCard.setValue("orderReceiveAddress", orderReceiveAddress.receiveAddressId);
							viewModel.salesorderDetailCard.setValue("refrel_orderReceiveAddress_firstReceiver", orderReceiveAddress.receiver);
							viewModel.salesorderDetailCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", orderReceiveAddress.receiverPhone);
							var adr = (orderReceiveAddress.country || "") + (orderReceiveAddress.receiverProvince || "") + (orderReceiveAddress.receiverCity || "") + (orderReceiveAddress.receiverTown || "") + (orderReceiveAddress.receiverAddress || "");
							viewModel.salesorderDetailCard.setValue("refrel_orderReceiveAddress_name", adr);
                        }
                        if (orderInvoice) {
                            viewModel.salesorderDetailCard.setValue("orderInvoice", orderInvoice.invoiceId);
                            viewModel.salesorderDetailCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceTitle);
                        }
                        viewModel.saleOrderItems.setSimpleData(childdata, {
                            unSelect: true
                        });
                        // bom 表填充
                        viewModel.batchSaleOrderBomItems.setSimpleData(maindata.orderItemBoms, {
                            unSelect: true
                        });
                        viewModel.initBPMFromBill(id, viewModel);
                        viewModel.queryAttach();
						viewModel.detailTemplate.updateExtendData();
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
                if (viewModel.isAvailable()) {
                    viewModel.clearItemsRef();
                    var customer = common.getRefDataByDtAndKey("salesorderCard", "customerId");
                    var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
					var saleOrg = $("#refContainersalesorderCard_saleOrgId").data("uui.refer").values;

                    var customerId = customer && customer[0].id;
                    var saleModelId = orderType && orderType[0].id;
                    var saleModel = orderType && orderType[0].saleModelCode;
                    var saleOrgId = saleOrg && saleOrg[0].refpk;
                    var condition = {
                        "search_customerId": customerId,
                        "search_saleModel": saleModel,
                        "search_customerRankCode": "01",
                        // "search_settleFinancialOrgId": settleFinancialOrgId,
                        "search_costType": "",
                        "search_organization": saleOrgId
                    };
                    $("#saleorderaddItemsRef").attr("data-refparam", JSON.stringify(
                        u.extend({}, {}, condition)
                    ));
                    /**
                     * @example 判断成交价格和成交金额是否可编辑
                     * @param  询到价是否可改 : priceEditFind
                     * @param  询不到价是否可改 : priceEditNotFind
                     */
                    // 查询订单行根据参数控制价格可编辑
                    $._ajax({
                        url: window.pathMap.b2b + '/b2b/order-control-rule/find-rule',
                        data: {
                            trantypeId: saleModelId,
                            saleOrgId: saleOrgId
                        },
                        success: function (resp) {
                            if (resp && resp.length > 0) {
                                var data = resp[0];
                                // 存储标识，添加商品时校验对呀规则进行不同操作
                                viewModel.isPriceEditFind = data.priceEditFind;
                                viewModel.isPriceEditNotFind = data.priceEditNotFind;
                            }
                        }
                    });
                    $("#saleorderaddItemsRef .refer").trigger("click");
                }
            },
            add_row: function () {
                if (viewModel.isAvailable()) {
                    var saleOrg = common.getRefDataByDtAndKey("salesorderCard", "saleOrgId");
                    var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
                    var saleModelId = orderType && orderType[0].id;
                    var saleOrgId = saleOrg && saleOrg[0].refpk;
                    /**
                     * @example 判断成交价格和成交金额是否可编辑
                     * @param  询到价是否可改 : priceEditFind
                     * @param  询不到价是否可改 : priceEditNotFind
                     */
                    // 查询订单行根据参数控制价格可编辑
                    $._ajax({
                        url: window.pathMap.b2b + '/b2b/order-control-rule/find-rule',
                        data: {
                            trantypeId: saleModelId,
                            saleOrgId: saleOrgId
                        },
                        success: function (resp) {
                            if (resp && resp.length > 0) {
                                var data = resp[0];
                                // 存储标识，添加商品时校验对呀规则进行不同操作
                                viewModel.isPriceEditFind = data.priceEditFind;
                                viewModel.isPriceEditNotFind = data.priceEditNotFind;
                            }
                        }
                    });
                    var creatRow = viewModel.saleOrderItems.createEmptyRow();
                    creatRow.setValue("goodsId", "");
                }
            },
            showEditBillPanel: function(index, rowId) {
                viewModel.goBillPanel(function(index, rowId) {
                    return function() {
                        viewModel.showEditBillPanelCallBack(index, rowId);
                        viewModel.editEventListener();
                    }
                }(index, rowId))
            },
            //进入修改单据页
            showEditBillPanelCallBack: function (index, rowId) {
                viewModel.isBomPanel(true);
                viewModel.orderPromRels = [];
                viewModel.itemOrderPromRels = [];
                viewModel.isDetail = false;
                viewModel.batchSaleOrderBomItems.removeAllRows();
                var grid = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid;
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
                    viewModel.pk = data.id;
                    // 先渲染门户附件
					viewModel.orderAttachments = data.orderAttachments;
                    viewModel.showAttachment("01");
                    viewModel.queryAttach();
                    if ("01" == data.saleModel || "03" == data.saleModel) {
                        grid.setColumnVisibleByColumn(grid.getColumnByField("deliveryNum"), true);
                        grid.setColumnVisibleByColumn(grid.getColumnByField("stockOutNum"), true);
                        grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), true);
                        grid.setColumnVisibleByColumn(grid.getColumnByField("returnNum"), true);
                    } else {
                        grid.setColumnVisibleByColumn(grid.getColumnByField("stockInNum"), true);
                    }
                    viewModel.attachList = [];
                    grid.repaintGridDivs();
                    viewModel.salesorderCard.setSimpleData(data);
                    var salesManagerBase = viewModel.app.getComp("salesManagerId");
                    salesManagerBase && $(salesManagerBase.element).attr(
                        "data-refparam",
                        '{"EQ_isEnable":"1","EQ_personPosts.organization.id":"' + data.saleOrgId + '"}'
                    );
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
                    // 给地址 开票单位增加条件
					var customerInoviceBase = viewModel.app.getComp("orderInvoice");
					var receiveAddressBase = viewModel.app.getComp("orderReceiveAddress");

					customerInoviceBase && $(customerInoviceBase.element).attr(
						"data-refparam",
						'{"EQ_customer.id":"' + data.customerId + '"}'
					);
					receiveAddressBase && $(receiveAddressBase.element).attr(
						"data-refparam",
						'{"EQ_customer.id":"' + data.customerId + '"}'
					);
					var orderInvoice = data.orderInvoice;
					var orderReceiveAddress = data.orderReceiveAddress;

					if (orderReceiveAddress) {
						viewModel.salesorderCard.setValue("orderReceiveAddress", orderReceiveAddress.receiveAddressId);
						viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", orderReceiveAddress.receiver);
                        viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", orderReceiveAddress.receiverPhone);
                        var adr = (orderReceiveAddress.country || "") + (orderReceiveAddress.receiverProvince || "") + (orderReceiveAddress.receiverCity || "") + (orderReceiveAddress.receiverTown || "") + (orderReceiveAddress.receiverAddress || "");
						viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", adr);
					}
					if (orderInvoice) {
                        viewModel.salesorderCard.setValue("orderInvoice", orderInvoice.invoiceId);
                        viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceTitle);
                    }
                    viewModel.changeCondition(
                        "salesorderCard_customerId", {
                            EQ_isEnable: "1",
                            EQ_isChannelCustomer: "1",
                            EQ_SaleOrder: data.saleOrgId
                        }, {}
                    );
                    viewModel.changeCondition(
                        "salesorderCard_receiveCustomerId", {
                            EQ_isEnable: "1",
                            EQ_isChannelCustomer: "1",
                            EQ_SaleOrder: data.saleOrgId
                        }, {}
                    );
                    viewModel.saleOrderItems.setMeta(
                        "returnTypeId",
                        "refcfg",
                        '{"refCode":"QY135","ctx":"/uitemplate_web"}'
                    )
                    // 获得当前最大行号
                    viewModel.getCurRowNum();
                    viewModel.isOriginalSingle(0);
				    viewModel.editTemplate.updateExtendData();
                });
            },
            editEventListener: function() {
                viewModel.salesorderCard.off("orderInvoice.valuechange").on("orderInvoice.valuechange", function (obj) {
                    var orderInvoice = common.getRefDataByDtAndKey("salesorderCard", "orderInvoice");
                    var orderInvoiceDto = viewModel.orderInvoice.getSimpleData()[0];
					if (!obj.newValue) {
                        viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", "");
                        viewModel.orderInvoice.setSimpleData([{
                            id: (orderInvoiceDto && orderInvoiceDto.id) ? orderInvoiceDto.id : '',
                            orderId: (orderInvoiceDto && orderInvoiceDto.orderId) ? orderInvoiceDto.orderId : '',
                        }]);
					}
					if (orderInvoice && orderInvoice.length > 0) {
						orderInvoice = orderInvoice[0];
						if (orderInvoice.refcode == "" && orderInvoice.refname == "" && orderInvoice.refpk == "") {
							viewModel.orderInvoice.setValue("dr", "1");
						} else {
                            var invoiceDto = {
                                invoiceId: orderInvoice.id,
                                invoiceType: orderInvoice.invoiceTypeName,
                                invoiceTitle: orderInvoice.invoiceOrgName,
                                invoiceBank: orderInvoice.bankName,
                                id: (orderInvoiceDto && orderInvoiceDto.id) ? orderInvoiceDto.id : '',
                                orderId: (orderInvoiceDto && orderInvoiceDto.orderId) ? orderInvoiceDto.orderId : ''
                            }
                            viewModel.orderInvoice.setSimpleData(invoiceDto);
							viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceOrgName);
						}
					}
                });
                // 客户订单类型 change
                viewModel.salesorderCard.off("orderTypeId.valuechange").on("orderTypeId.valuechange", function (obj) {
				    var refer = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
                    viewModel.salesorderCard.getCurrentRow().setValue("orderTypeCode", refer[0].refcode);
                    viewModel.salesorderCard.getCurrentRow().setValue("saleModel", refer[0].saleModelCode);
                    var saleOrgId = viewModel.salesorderCard.getValue('saleOrgId');
                    var customerId = viewModel.salesorderCard.getValue('customerId');
                    var orderType = obj.newValue;
                    if (saleOrgId && customerId && orderType) {
                        viewModel.queryAccount(saleOrgId, customerId, orderType);
                    }
                });
                viewModel.salesorderCard.off("receiveCustomerId.valuechange").on("receiveCustomerId.valuechange", function (obj) {
					viewModel.salesorderCard.setValue("orderReceiveAddress", null);
					viewModel.salesorderCard.setValue("orderReceiveAddress", "display", null);
					viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", "");
					viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", "");
                    viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", "");
                    var orderReceiveAddressDto = viewModel.orderReceiveAddress.getSimpleData()[0];
					var orgIdObj= {
						EQ_isEnable: 1,
						"EQ_customer.id": obj.newValue
					}
					$("#salesorderCard_orderReceiveAddress").parent().attr("data-refparam", JSON.stringify(orgIdObj));		// 地址
					if (obj.newValue) {
						var ordertypeBody = {
							customerId: obj.newValue
                        };
                        viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", true);
						$("#salesorderCard_orderReceiveAddress").removeAttr("placeholder");
						$._ajax({
							type: "get",
							url: window.pathMap.base +
								"/base/customer-addresses/findByCustomerId",
							data: ordertypeBody,
							success: function (data) {
								if (!data || data.length == 0) {
									return;
								}
								var receiveAddress = data[0];
								if (receiveAddress) {
                                    var addressDto = {
                                        receiveAddressId: receiveAddress.id,
                                        receiver: receiveAddress.firstReceiver,
                                        receiverTel: receiveAddress.firstReceiverTel,
                                        receiverPhone: receiveAddress.firstReceiverPhone,
                                        country: receiveAddress.countryName,
                                        countryId: receiveAddress.countryId,
                                        receiverProvince: receiveAddress.provinceName,
                                        receiverProvinceId: receiveAddress.provinceId,
                                        receiverCity: receiveAddress.cityName,
                                        receiverCityId: receiveAddress.cityId,
                                        receiverCounty: receiveAddress.countyName,
                                        receiverCountyId: receiveAddress.countyId,
                                        receiverTown: receiveAddress.townName,
                                        receiverTownId: receiveAddress.townId,
                                        receiverAddress: receiveAddress.detailAddr,
                                        id: (orderReceiveAddressDto && orderReceiveAddressDto.id) ? orderReceiveAddressDto.id : '',
                                        orderId: (orderReceiveAddressDto && orderReceiveAddressDto.orderId) ? orderReceiveAddressDto.orderId : ''
                                    }
                                    viewModel.orderReceiveAddress.setSimpleData(addressDto);
                                    viewModel.salesorderCard.setValue("orderReceiveAddress", receiveAddress.id);
									viewModel.salesorderCard.setValue("refshowcontent_orderReceiveAddress_name", receiveAddress.name);
									viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", receiveAddress.firstReceiver);
									viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", receiveAddress.firstReceiverPhone);
									var adr = (receiveAddress.countryName || "") + (receiveAddress.provinceName || "") + (receiveAddress.countyName || "") + (receiveAddress.townName || "") + (receiveAddress.detailAddr || "");
									viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", adr);
								}
							}
						});
					} else {
					    viewModel.salesorderCard.setValue("orderReceiveAddress", "");
                        viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", false);
						$("#salesorderCard_orderReceiveAddress").attr({placeholder: "请先选择客户"});
                        viewModel.orderReceiveAddress.setSimpleData([{
                            id: (orderReceiveAddressDto && orderReceiveAddressDto.id) ? orderReceiveAddressDto.id : '',
                            orderId: (orderReceiveAddressDto && orderReceiveAddressDto.orderId) ? orderReceiveAddressDto.orderId : '',
                        }]);
                    }
				});
                // 客户 change
                viewModel.salesorderCard.off("customerId.valuechange").on("customerId.valuechange", function (obj) {
                    viewModel.saleOrderItems.removeAllRows();
                    viewModel.batchSaleOrderBomItems.removeAllRows();
                    viewModel.salesorderCard.setValue('offsetAmount', 0);
                    viewModel.salesorderCard.setValue('totalDealAmount', 0);
                    viewModel.salesorderCard.setValue('totalNum', 0);
					viewModel.salesorderCard.setValue("accountPeriodId", "");
                    var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
					var orgIdObj= {
						EQ_isEnable: 1,
						"EQ_customer.id": obj.newValue
					}
					viewModel.salesorderCard.setValue("receiveCustomerId", obj.newValue);
					$("#salesorderCard_orderInvoice").parent().attr("data-refparam", JSON.stringify(orgIdObj));		// 发票	
					$("#salesorderCard_accountPeriodId").parent().attr("data-refparam", JSON.stringify(orgIdObj));	// 账期

					if (obj.newValue) {
						viewModel.salesorderCard.setMeta("orderInvoice", "enable", true);
						$("#salesorderCard_orderInvoice").removeAttr("placeholder");
					} else {
						viewModel.salesorderCard.setMeta("orderInvoice", "enable", false);
						$("#salesorderCard_orderInvoice").attr({placeholder: "请先选择客户"})
					}
                    var orderInvoiceDto = viewModel.orderInvoice.getSimpleData()[0];
                    var customerId = obj.newValue;
                    var orderType = viewModel.salesorderCard.getValue('orderTypeId');
                    if (saleOrgId && customerId && orderType) {
                        viewModel.queryAccount(saleOrgId, customerId, orderType);
                    }
                    // 查询对应的客户经理和部门
                    if (customerId) {
                        var jurisdictionsBody = {
                            "search_IN_saleOrganization.id": saleOrgId,
                            "search_IN_customer.id": customerId
                        };
                        viewModel.qureyCustomerManageAndOrderType(jurisdictionsBody);
                        // 查询收货地址和发票信息
                        var ordertypeBody = {
                            customerId: customerId
                        }
                        $._ajax({
                            type: "get",
                            url: window.pathMap.base + '/base/customer-invoices/findByCustomerId',
                            data: ordertypeBody,
                            success: function (data) {
                                if (!data || data.length == 0) {
                                    return;
                                }
                                var orderInvoice = data[0];
                                if (orderInvoice) {
                                    viewModel.salesorderCard.setValue('orderInvoice', orderInvoice.id);
									viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceOrgName);
                                    var invoiceDto = {
                                        invoiceId: orderInvoice.id,
                                        invoiceType: orderInvoice.invoiceTypeName,
                                        invoiceTitle: orderInvoice.invoiceOrgName,
                                        invoiceBank: orderInvoice.bankName,
                                        id: (orderInvoiceDto && orderInvoiceDto.id) ? orderInvoiceDto.id : '',
                                        orderId: (orderInvoiceDto && orderInvoiceDto.orderId) ? orderInvoiceDto.orderId : ''
                                    }
                                    viewModel.orderInvoice.setSimpleData(invoiceDto);
                                }
                            }
                        });
                    } else {
                        viewModel.salesorderCard.setValue('orderInvoice', "");
                        viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", "");
                        viewModel.orderInvoice.setSimpleData([{
                            id: (orderInvoiceDto && orderInvoiceDto.id) ? orderInvoiceDto.id : '',
                            orderId: (orderInvoiceDto && orderInvoiceDto.orderId) ? orderInvoiceDto.orderId : '',
                        }]);
                    }
                });
                // 销售组织 change
                viewModel.salesorderCard.off("saleOrgId.valuechange").on("saleOrgId.valuechange", function (obj) {
                    viewModel.saleOrderItems.removeAllRows();
                    viewModel.batchSaleOrderBomItems.removeAllRows();
                    viewModel.salesorderCard.setValue('offsetAmount', 0);
                    viewModel.salesorderCard.setValue('totalDealAmount', 0);
                    viewModel.salesorderCard.setValue('totalNum', 0);
                    var customerId = viewModel.salesorderCard.getValue('customerId');
                    var saleOrgId = obj.newValue;
                    var orderType = viewModel.salesorderCard.getValue('orderTypeId');
                    if (saleOrgId && customerId && orderType) {
                        viewModel.queryAccount(saleOrgId, customerId, orderType);
                    }
                    var salesManagerBase = viewModel.app.getComp("salesManagerId");
                    var salesDeptBase = viewModel.app.getComp("salesDeptId");
                    salesManagerBase && $(salesManagerBase.element).attr(
                        "data-refparam",
                        '{"AUTH_refdim":"salesManager","EQ_isEnable":"1","EQ_personPosts.organization.id":"' + obj.newValue + '"}'
                    );
                    salesDeptBase && $(salesDeptBase.element).attr(
                        "data-refparam",
                        '{"EQ_isEnable":"1","EQ_organization.id":"' + obj.newValue + '"}'
                    );
                    // 根据销售组织判断客户是否可点击
                    if (saleOrgId) {
                        $("#salesorderCard_customerId").removeAttr("placeholder");
                        $("#salesorderCard_receiveCustomerId").removeAttr("placeholder");
                        viewModel.salesorderCard.setMeta(
                            "customerId",
                            "enable",
                            true
                        );
                        viewModel.salesorderCard.setMeta(
                            "receiveCustomerId",
                            "enable",
                            true
                        );
                        viewModel.changeCondition(
                            "salesorderCard_customerId", {
                                EQ_isEnable: "1",
                                EQ_isChannelCustomer: "1",
                                AUTH_refdim:"customer",
                                EQ_SaleOrder: saleOrgId
                            }, {}
                        );
                        viewModel.changeCondition(
                            "salesorderCard_receiveCustomerId", {
                                EQ_isEnable: "1",
                                EQ_isChannelCustomer: "1",
                                AUTH_refdim:"customer",
                                EQ_SaleOrder: saleOrgId
                            }, {}
                        );
                    } else {
                        $("#salesorderCard_customerId").attr("placeholder", "请先选择销售组织");
                        $("#salesorderCard_receiveCustomerId").attr("placeholder", "请先选择销售组织");
                        viewModel.salesorderCard.setMeta(
                            "customerId",
                            "enable",
                            false
                        );
                        viewModel.salesorderCard.setMeta(
                            "receiveCustomerId",
                            "enable",
                            false
                        );
                    }
                });
                // 商品数量改变 计算金额
                viewModel.saleOrderItems.off("orderNum.valuechange").on("orderNum.valuechange", function (obj) {
                    var currRow = viewModel.saleOrderItems.getRowByRowId(
                        obj.rowId
                    );
                    // 计算商品行主数量、金额
                    var rate = parseFloat(currRow.getValue("conversionRate") || "1");
                    var mainNum = parseFloat(obj.newValue) * rate;
                    var dealAmount =
                        mainNum * parseFloat(currRow.getValue("salePrice") || currRow.getValue("basePrice") || "0");
                    currRow.setValue("mainNum", mainNum);
                    currRow.setValue("dealAmount", dealAmount);
                    currRow.setValue("amount", dealAmount);
                    currRow.setValue("totalReturnAmount", dealAmount);
    
                    var grossWeight = currRow.getValue("weight");
                    var netWeight = currRow.getValue("netWeight");
                    var rowWeight = mainNum * parseFloat(grossWeight || "0") || 0;
                    var rowVolume = mainNum * parseFloat(currRow.getValue("volume") || "0") || 0;
                    var rowNetWeight = mainNum * parseFloat(netWeight || "0") || 0;
    
                    currRow.setValue("rowWeight", rowWeight);
                    currRow.setValue("rowVolume", rowVolume);
                    currRow.setValue("rowNetWeight", rowNetWeight);
    
                    // 计算成交价  成本价计算方式   成交金额-促销金额-冲抵金额   /  数量
                    var dealPrice = (dealAmount / mainNum) || 0;
                    currRow.setValue("dealPrice", dealPrice);
    
                    // 计算合计金额、合计数量
                    var arr = viewModel.saleOrderItems.getRealSimpleData();
                    var totalAmount = 0,
                        totalNum = 0,
                        totalVolume = 0,
                        totalWeight = 0, 
                        totalNetWeight = 0;
                    for (var i = 0; i < arr.length; i++) {
                        totalAmount += arr[i].dealAmount ? parseFloat(arr[i].dealAmount) : 0;
                        totalNum += arr[i].mainNum ? parseFloat(arr[i].mainNum) : 0;
                        totalVolume += arr[i].rowVolume ? parseFloat(arr[i].rowVolume) : 0;
                        totalWeight += arr[i].rowWeight ? parseFloat(arr[i].rowWeight) : 0;
                        totalNetWeight += arr[i].rowNetWeight ? parseFloat(arr[i].rowNetWeight) : 0;
                    }
                    viewModel.salesorderCard.getCurrentRow().setValue("totalNum", totalNum);
                    viewModel.salesorderCard.getCurrentRow().setValue("totalDealAmount", totalAmount);
                    viewModel.salesorderCard.getCurrentRow().setValue("totalReturnAmount", totalAmount);
                    viewModel.salesorderCard.getCurrentRow().setValue("totalVolume", totalVolume);
                    viewModel.salesorderCard.getCurrentRow().setValue("totalWeight", totalWeight);
                    viewModel.salesorderCard.getCurrentRow().setValue("totalNetWeight", totalNetWeight);
                    //联动bom数量
                    var parentGoodsId = currRow.getValue("goodsId");
                    var parentRowNum = currRow.getValue("rowNum");
                    //获取全部bom信息
                    var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                    var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                    for (var i = 0; i < bomdata.length; i++) {
                        if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].parentRowNum === parentRowNum && bomdata[i].goodsId !== parentGoodsId) {
                            var bomAmount = bomdata[i].childGoodsQty * obj.newValue;
                            allrows[i].setValue("mainNum", bomAmount * rate);
                            allrows[i].setValue("orderNum", bomAmount);
                        } else {
                            if (allrows[i] && allrows[i].getValue("goodsId") === parentGoodsId && allrows[i].getValue("parentRowNum") == parentRowNum) {
                                var amount = obj.newValue;
                                allrows[i].setValue("mainNum", amount * rate);
                                allrows[i].setValue("orderNum", amount);
                                allrows[i].setValue("dealAmount", dealAmount);
                                allrows[i].setValue("amount", dealAmount);
                            }
                        }
                    }
                });
                // 830 成交价可编辑
                viewModel.saleOrderItems.off('dealPrice.valuechange').on('dealPrice.valuechange', function (obj) {
                    var currRow = viewModel.saleOrderItems.getRowByRowId(
                        obj.rowId
                    );
                    var dealPriceOpt = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid.getColumnByField("dealPrice");
                    if (dealPriceOpt.options.editable) {
                        var rate = parseFloat(currRow.getValue("conversionRate") || "1");
                        var mainNum = parseFloat(currRow.getValue("mainNum")) * rate;
                        var totalAmount = mainNum * parseFloat(obj.newValue);
                        totalAmount = totalAmount ? totalAmount : 0;
                        currRow.setValue('dealAmount', totalAmount);
                        currRow.setValue("totalReturnAmount", totalAmount);
                        viewModel.salesorderCard.getCurrentRow().setValue("totalReturnAmount", totalAmount);
                        viewModel.salesorderCard.getCurrentRow().setValue("totalDealAmount", totalAmount);
                    }
                });
    
                // 830 单价可修改
                viewModel.saleOrderItems.off('salePrice.valuechange').on('salePrice.valuechange', function (obj) {
                    var currRow = viewModel.saleOrderItems.getRowByRowId(
                        obj.rowId
                    );
                    var mainNum = currRow.getValue('orderNum') || 0;
                    currRow.setValue('orderNum', 1);
                    currRow.setValue('orderNum', mainNum);
                    //联动bom单价
                    var parentGoodsId = currRow.getValue("goodsId");
                    var parentRowNum = currRow.getValue("rowNum");
    
                    //获取全部bom信息
                    var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                    var salePrice = obj.newValue;
                    for (var i = 0; i < bomdata.length; i++) {
                        var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                        if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].parentRowNum === parentRowNum && bomdata[i].goodsId !== parentGoodsId) {
                            allrows[i].setValue("salePrice", salePrice);
                        } else {
                            if (allrows[i] && allrows[i].getValue("goodsId") === parentGoodsId && allrows[i].getValue("parentRowNum") == parentRowNum) {
                                allrows[i].setValue("salePrice", salePrice);
                            }
                        }
                    }
                });
                // 库存组织联动仓库
				viewModel.saleOrderItems.off('deliveryInvOrgId.valuechange').on('deliveryInvOrgId.valuechange', function(obj) {
					var currRow = viewModel.saleOrderItems.getRowByRowId(
						obj.rowId
					);
					if (currRow) {
					  currRow.setValue("deliveryWarehouseId", null);
					  currRow.setMeta("deliveryWarehouseId", 'display', null);
					}
					if (obj.newValue) {
						var stockData = {
							customer: viewModel.salesorderCard.getValue("customerId"),
							saleModel: viewModel.salesorderCard.getValue("saleModel"),
							orderItemDtos: [currRow.getSimpleData()]
						};

						$._ajax({
							url: window.pathMap.b2b + "/b2b/order/stock",
							data: JSON.stringify(stockData),
							contentType: "application/json;charset=UTF-8",
							type: "POST",
							success: function (resp) {
								var existingNum = resp ? (resp[currRow.getValue("goodsId")] || "") : "";
								currRow.setValue("existingNum", existingNum)
							}
						});
					}
				});
				viewModel.saleOrderItems.off('deliveryWarehouseId.valuechange').on('deliveryWarehouseId.valuechange', function(obj) {
					var currRow = viewModel.saleOrderItems.getRowByRowId(
						obj.rowId
					);
					var deliveryInvOrgId = currRow.getValue("deliveryInvOrgId");
					if (currRow) {
					  currRow.setValue("deliveryWarehouseId", null);
					  currRow.setMeta("deliveryWarehouseId", 'display', null);
					}
					if (deliveryInvOrgId && obj.newValue) {
						var stockData = {
							customer: viewModel.salesorderCard.getValue("customerId"),
							saleModel: viewModel.salesorderCard.getValue("saleModel"),
							orderItemDtos: [currRow.getSimpleData()]
						};

						$._ajax({
							url: window.pathMap.b2b + "/b2b/order/stock",
							data: JSON.stringify(stockData),
							contentType: "application/json;charset=UTF-8",
							type: "POST",
							success: function (resp) {
								var existingNum = resp ? (resp[currRow.getValue("goodsId")] || "") : "";
								currRow.setValue("existingNum", existingNum)
							}
						});
					}
				});
                // 收货地址 change
                viewModel.salesorderCard.off("receiveAddressId.valuechange").on("receiveAddressId.valuechange", function (obj) {
				    var refer = common.getRefDataByDtAndKey("salesorderCard", "receiveAddress");
                    

                    var receiveAddress = refer.values ? refer.values[0] : "";
                    var orderReceiveAddressDto = viewModel.orderReceiveAddress.getSimpleData()[0];
    
                    if (!obj.newValue) {
                        viewModel.orderReceiveAddress.setSimpleData([{
                            id: (orderReceiveAddressDto && orderReceiveAddressDto.id) ? orderReceiveAddressDto.id : '',
                            orderId: (orderReceiveAddressDto && orderReceiveAddressDto.orderId) ? orderReceiveAddressDto.orderId : ''
                        }]);							
                    }
                    if (receiveAddress) {
                        if (receiveAddress.refcode == "" && receiveAddress.refname == "" && receiveAddress.refpk == "") {
                            viewModel.orderReceiveAddress.setSimpleData([{
                                id: (orderReceiveAddressDto && orderReceiveAddressDto.id) ? orderReceiveAddressDto.id : '',
                                orderId: (orderReceiveAddressDto && orderReceiveAddressDto.orderId) ? orderReceiveAddressDto.orderId : ''
                            }]);							
                            viewModel.salesorderCard.setValue("receiver", "");
                            viewModel.salesorderCard.setValue("receiverPhone", "");
                        } else {
                            var addressDto = {
                                receiveAddressId: receiveAddress.id,
                                receiver: receiveAddress.firstReceiver,
                                receiverTel: receiveAddress.firstReceiverTel,
                                receiverPhone: receiveAddress.firstReceiverPhone,
                                country: receiveAddress.countryName,
                                countryId: receiveAddress.countryId,
                                receiverProvince: receiveAddress.provinceName,
                                receiverProvinceId: receiveAddress.provinceId,
                                receiverCity: receiveAddress.cityName,
                                receiverCityId: receiveAddress.cityId,
                                receiverCounty: receiveAddress.countyName,
                                receiverCountyId: receiveAddress.countyId,
                                receiverTown: receiveAddress.townName,
                                receiverTownId: receiveAddress.townId,
                                receiverAddress: receiveAddress.detailAddr,
                                id: (orderReceiveAddressDto && orderReceiveAddressDto.id) ? orderReceiveAddressDto.id : '',
                                orderId: (orderReceiveAddressDto && orderReceiveAddressDto.orderId) ? orderReceiveAddressDto.orderId : ''
                            }
                            viewModel.orderReceiveAddress.setSimpleData(addressDto);
    
                            viewModel.salesorderCard.setValue("receiver", receiveAddress.firstReceiver);
                            viewModel.salesorderCard.setValue("receiverPhone", receiveAddress.firstReceiverPhone)
                        }
                    }
                });
                // 发票信息 change
                viewModel.salesorderCard.off("orderInvoice.valuechange").on("orderInvoice.valuechange", function (obj) {
				    var refer = common.getRefDataByDtAndKey("salesorderCard", "orderInvoiceId");
                    

                    var orderInvoice = refer.values ? refer.values[0] : "";
                    var orderInvoiceDto = viewModel.orderInvoice.getSimpleData()[0];
                    if (!obj.newValue) {
                        viewModel.orderInvoice.setSimpleData([{
                            id: (orderInvoiceDto && orderInvoiceDto.id) ? orderInvoiceDto.id : '',
                            orderId: (orderInvoiceDto && orderInvoiceDto.orderId) ? orderInvoiceDto.orderId : ''
                        }]);						
                    }
                    if (orderInvoice) {
                        if (orderInvoice.refcode == "" && orderInvoice.refname == "" && orderInvoice.refpk == "") {
                            viewModel.orderInvoice.setSimpleData([{
                                id: (orderInvoiceDto && orderInvoiceDto.id) ? orderInvoiceDto.id : '',
                                orderId: (orderInvoiceDto && orderInvoiceDto.orderId) ? orderInvoiceDto.orderId : ''
                            }]);							
                        } else {
                            var invoiceDto = {
                                invoiceId: orderInvoice.id,
                                invoiceType: orderInvoice.invoiceTypeName,
                                invoiceTitle: orderInvoice.invoiceOrgName,
                                invoiceBank: orderInvoice.bankName,
                                id: (orderInvoiceDto && orderInvoiceDto.id) ? orderInvoiceDto.id : '',
                                orderId: (orderInvoiceDto && orderInvoiceDto.orderId) ? orderInvoiceDto.orderId : ''
                            }
                            viewModel.orderInvoice.setSimpleData(invoiceDto);
                        }
                    }
                });
                // 关闭原因枚举查询
                $._ajax({
                    type: "get",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                    data: {
                        cust_doc_code_batch: "QY034,QY077,QY102,QY103,QY104"
                    },
                    success: function (data) {
                        var combodata = common.dataconvert.toMap(data["QY034"], "name", "id");
                        viewModel.accountTypeSrc(combodata);
                        var combodata1 = common.dataconvert.toMap(data["QY077"], "name", "code");
                        viewModel.closeReasonSrc(combodata1);
                    }
                });
                // 赠品
                viewModel.saleOrderItems.off("isGift.valuechange").on("isGift.valuechange", function (obj) {
                    var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                    var isChecked = currRow.getValue("isGift");
                    var dealAmount = currRow.getValue("dealAmount");
                    var totalReturnAmount = viewModel.salesorderCard.getCurrentRow().getValue("totalReturnAmount");
                    if (isChecked == 0) {
                        // 关闭赠品后重新 计算价格，
                        var orderNum = currRow.getValue("orderNum");
                        currRow.setValue("orderNum", 0.1);
                        currRow.setValue("orderNum", orderNum);
                        currRow.setValue("dealPrice", currRow.getValue("salePrice"));
                    } else {
                        currRow.setValue("dealPrice", 0);
                        currRow.setValue("dealAmount", 0);
                        currRow.setValue("totalReturnAmount", 0);
                        viewModel.salesorderCard.getCurrentRow().setValue("totalReturnAmount", parseFloat(totalReturnAmount) - parseFloat(dealAmount));
                    }
                        //联动bom勾选
                        var parentGoodsId = currRow.getValue("goodsId");
                        var parentRowNum = currRow.getValue("rowNum");
    
                        //获取全部bom信息
                        var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                        for (var i = 0; i < bomdata.length; i++) {
                            var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                            if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                                allrows[i].setValue("isGift", obj.newValue);
                            }
                        }
                });
                // 商品添加
                viewModel.saleOrderItems.off('goodsId.valuechange').on('goodsId.valuechange', function (obj) {
					var refer = $("#refContainergoodsId").data("uui.refer");
                    var refValues = refer.values;
                    if (obj.newValue) {
                        var newValueArr = obj.newValue.split(',');
                        if (newValueArr.length == 1) {
                            var tData = "";
                            if (refValues[0].itemVal) {
                                tData = [refValues[0].itemVal]
                            } else {
                                tData = refValues.filter(function(refItem) {
                                    return refItem.refpk == obj.newValue;
                                });
                            }
                            var currentRow = viewModel.saleOrderItems.getRowByRowId(
                                obj.rowId
                            );
                            var goodsInfoDtos = [];
                            var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                            
                            tData.forEach(function (item) {
                                item.id = "";
                                item.goodsAttrVals = '';
                                goodsInfoDtos.push({
                                    originalGoodsId: item.originalGoodsId || item.refpk,
                                    saleOrgId: saleOrgId
                                });
                            });
                            // 根据选择的商品信息 去询价格
                            var priceData = {
                                customer: viewModel.salesorderCard.getValue("customerId"),
                                saleModel: viewModel.salesorderCard.getValue("saleModel"),
                                tranType: viewModel.salesorderCard.getValue("orderTypeId"),
                                goodsInfoDtos: goodsInfoDtos
                            }
                            $._ajax({
                                url: window.pathMap.b2b + '/b2b/goods/find-price-by-goods',
                                data: JSON.stringify(priceData),
                                contentType: 'application/json;charset=UTF-8',
                                type: 'POST',
                                success: function (resp) {
                                    var newData = [];
                                    for (var i = 0; i < resp.length; i++) {
                                        newData.push({
                                            salePrice: resp[i].baseDiscountPrice,
                                            basePrice: resp[i].basePrice
                                        });
                                    }
                                    var data = $.extend(true, tData, newData);
                                    initData(data, currentRow);
                                }
                            });
                        } else {
                            setTimeout(function () {
                                var currentRow = viewModel.saleOrderItems.getRowByRowId(
                                    obj.rowId
                                );
                                var currentData = [],
                                    data = [],
                                    status = "new";
                                var isCurrentRow = true;
                                for (var i = 0; i < refValues.length; i++) {
                                    var itemData = {
                                        goodsCode:  refValues[i].refcode,
                                        goodsName:  refValues[i].refname,
                                        goodsId:  refValues[i].refpk,
                                        goodsDisplayName:  refValues[i].displayName
                                    };
                                    if (refValues[i].refpk == currentRow.getValue("goodsId") && isCurrentRow) {
                                        // itemData.rowNum = currentRow.getValue("rowNum") || viewModel.generaterowNum();
                                        currentData.push(itemData);
                                        isCurrentRow = false;
                                        status = currentRow.getSimpleData().persistStatus == "new" ? "new" : "upd";
                                    } else {
                                        // itemData.rowNum = viewModel.generaterowNum();
                                        data.push(itemData)
                                    }
                                }
                                viewModel.saleOrderItems.addSimpleData(currentData, status);
                                viewModel.saleOrderItems.addSimpleData(data, 'new');
                                
                                setTimeout(function(){
                                    currentRow.setValue("dr", "1");
                                    viewModel.saleOrderItems.removeRows(currentRow);
                                    var parentRowNum = currentRow.getValue("rowNum");
                                    var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                                    allBomRows.forEach(function (item) {
                                        if (item.getValue("parentRowNum") == parentRowNum) {
                                            viewModel.batchSaleOrderBomItems.removeRows(item);
                                            item.setValue("dr", "1");
                                        }
                                    })
                                },100);
                            }, 100);
                        }
                    } else {
                        var currentRow = viewModel.saleOrderItems.getRowByRowId(
                            obj.rowId
                        );
                        var parentRowNum = currentRow.getValue("rowNum");
                        var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                        allBomRows.forEach(function (item) {
                            if (item.getValue("parentRowNum") == parentRowNum) {
                                viewModel.batchSaleOrderBomItems.removeRows(item);
                                item.setValue("dr", "1");
                            }
                        })
                    }
    
    
                    function initData(data, currentRow) {
                        if (data && data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                var rowNum = currentRow.getValue("rowNum") ? currentRow.getValue("rowNum") : viewModel.generaterowNum();
                                var newrow = ""
                                if (data.length > 1) {
                                    var newrow = viewModel.saleOrderItems.createEmptyRow({
                                        unSelect: true
                                    });
                                } else {
                                    newrow = currentRow;
                                    var productId = currentRow.getValue("goodsId");
                                    var parentRowNum = currentRow.getValue("rowNum");
                                    var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                                    allBomRows.forEach(function (item) {
                                        if ((item.getValue("parentGoodsId") === productId || item.getValue("goodsId") === productId) && item.getValue("parentRowNum") == parentRowNum) {
                                            viewModel.batchSaleOrderBomItems.removeRows(item);
                                            item.setValue("dr", "1");
                                        }
                                    })
                                }
                                var id = data[i].refpk;
                                data[i].returnTypeId = "d5acd107-2b5d-411a-8d96-d9f856a0e478";         // 默认退货类型为退货退款
                                data[i].refrel_returnTypeId_code = "01";
                                data[i].refrel_returnTypeId_name = "退货退款";

                                newrow.setValue("arrivalBelongCode", "01");
                                newrow.setValue("rowNum", rowNum);
                                newrow.setValue("basePrice", data[i].basePrice);
                                newrow.setValue("baseDiscountPrice", data[i].baseDiscountPrice);
								newrow.setValue("conversionRate", data[i].conversionRate);
								newrow.setValue("deliveryInvOrgId", data[i].inventoryOrgId || data[i].deliveryInvOrgId);
								newrow.setValue("refshowcontent_deliveryInvOrgId_name", data[i].inventoryOrgName || data[i].deliveryInvOrgName);
								newrow.setValue("refrel_goodsId_code", data[i].refcode || data[i].goodsCode);
								newrow.setValue("refrel_goodsId_name", data[i].refname || data[i].goodsName);
								newrow.setValue("refshowcontent_goodsId_name", data[i].refname || data[i].goodsName || data[i].refshowcontent_goodsId_name);
								newrow.setValue("goodsName", data[i].refname || data[i].goodsName);
								newrow.setValue("goodsCode", data[i].refcode || data[i].goodsCode);
								newrow.setValue("goodsImg", data[i].mainPictureFileUrl);
								newrow.setValue("goodsDisplayName", data[i].displayName || data[i].refname);
								newrow.setValue("isOptional", data[i].isOptional);
								newrow.setValue("mainNumUnitId", data[i].basicUnitId || data[i].mainNumUnitId);
								newrow.setValue("refshowcontent_mainNumUnitId_name", data[i].basicUnitName || data[i].mainNumUnitName || data[i].refshowcontent_mainNumUnitId_name);
								newrow.setValue("netWeight", data[i].netWeight);
								newrow.setValue("orderNumUnitId", data[i].assistUnitId || data[i].orderNumUnitId);
								newrow.setValue("refshowcontent_orderNumUnitId_name", data[i].assistUnitName || data[i].orderNumUnitName || data[i].refshowcontent_orderNumUnitId_name);
								newrow.setValue("originalGoodsId", data[i].originalGoodsId);
								newrow.setValue("productId", data[i].productId);
								newrow.setValue("productLineId", data[i].productLineId);
								newrow.setValue("refshowcontent_productLineId_name", data[i].productLineName || data[i].refshowcontent_productLineId_name);
								newrow.setValue("salePrice", data[i].salePrice);
								newrow.setValue("supplierPrice", data[i].supplierPrice);
								newrow.setValue("settleFinancialOrgId", data[i].settleFinancialOrgId);
								newrow.setValue("refshowcontent_settleFinancialOrgId_name", data[i].settleFinancialOrgName || data[i].refshowcontent_settleFinancialOrgId_name);
								newrow.setValue("version", data[i].version);
								newrow.setValue("volume", data[i].volume);
								newrow.setValue("volumeUnitId", data[i].volumeUnitId);
								newrow.setValue("weightUnitId", data[i].weightUnitId);
                                newrow.setValue("weight", data[i].grossWeight || data[i].weight);
                                newrow.setValue("netWeight", data[i].netWeight);
                                
                                //bom产品信息的添加
                                var bomdata = viewModel.findBomByParentId(id);
                                if (bomdata && bomdata.length > 0) {
                                    var bomItem = bomdata[0].goodsBomChildren;
                                    var bomItemData = []
                                    bomItem.forEach(function (item) {
                                        if (item.isOptional == 1) {
                                            newrow.setValue('isOptional', 1);
                                            newrow.setValue("baseGoodsOptValue", '  ');
                                        }
                                        //转参照里字段
                                        var bomRowNum = viewModel.generateBomrowNum();
                                        item.id = null;
										item.goodsName = item.childGoodsName;
										item.goodsId = item.childGoodsId;
										item.refshowcontent_goodsId_name = item.childGoodsName;
										item.goodsCode = item.childGoodsCode;
										item.version = item.childGoodsVersion;
										item.childGoodsQty = item.childGoodsQty;
										item.mainNumUnitId = item.childGoodsUnitId;
										item.refshowcontent_mainNumUnitId_name = item.childGoodsUnitName;
										item.orderNumUnitId = item.childGoodsUnitId;
										item.refshowcontent_orderNumUnitId_name = item.childGoodsUnitName;
										item.orderNum = orderNum * item.childGoodsQty || 0;
										item.mainNum = mainNum * item.childGoodsQty || 0;
										item.parentRowNum = rowNum;
										item.rowNum = bomRowNum;
										item.isGift = 0;
										item.baseGoodsOptId = '';
										item.baseGoodsOptValue = '';
										item.parentGoodsId = data[i].refpk;
										item.mainNum = '';
										viewModel.currowBomNum(bomRowNum);
                                        bomItemData.push(item);
                                    });
                                    viewModel.batchSaleOrderBomItems.addSimpleData(bomItemData, {
                                        unSelect: true,
                                        status: 'new'
                                    });
                                } else {
                                    var parentRowNum = rowNum;
                                    //没有bom结构的商品直接复制过来
                                    var bomRowNum = viewModel.generateBomrowNum();
                                    var cpRow = viewModel.batchSaleOrderBomItems.createEmptyRow();
                                    cpRow.setSimpleData(newrow.getSimpleData(), {
                                        status: 'new'
                                    });
                                    var parentGoodsId = cpRow.getValue("goodsId");
									  var parentGoodsName = cpRow.getValue("refrel_goodsId_name");
									cpRow.setValue("rowNum", bomRowNum);
									cpRow.setValue("parentRowNum", parentRowNum);
									cpRow.setValue("parentGoodsId", parentGoodsId);
									// cpRow.setValue("refshowcontent_mainNumUnitId_name", newrow.getValue("refshowcontent_mainNumUnitId_name"));
									// cpRow.setValue("refshowcontent_orderNumUnitId_name", newrow.getValue("refshowcontent_orderNumUnitId_name"));
									cpRow.setValue("parentGoodsName", parentGoodsName);
                                    cpRow.setValue("childGoodsQty", 1);
                                    cpRow.setValue("mainNum", '');
                                    var getRow = viewModel.batchSaleOrderBomItems.getSimpleData();
                                    getRow.forEach(function (item) {
                                        item.persistStatus = 'new';
                                    });
                                }
                            }
                            setTimeout(function () {
                                viewModel.editTemplate.updateExtendData();
                            }, 100)
                        }
                    }
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
                refContainersalesorderCard_customerId
				var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
				var saleOrg = common.getRefDataByDtAndKey("salesorderCard", "saleOrgId");
				var customer = common.getRefDataByDtAndKey("salesorderCard", "customerId");

                var essentialData = {
                    customer: "客户",
                    orderType: "订单类型",
                    saleOrg: "销售组织",
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
            //查询账期
            queryAccount: function (saleOrgId, customerId, orderType) {
                var url = "/occ-settlement/api/settlement/AccountDateSettings/settlement-checkSettings";
                $._ajax({
                    url: url,
                    type: "get",
                    data: {
                        "saleOrg": saleOrgId,
                        "customer": customerId,
                        "orderType": orderType
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.salesorderCard.setValue("accountPeriodId", data.id);
                        viewModel.salesorderCard.setValue("accountPeriodName", data.name);
                        viewModel.salesorderCard.setValue("accountPeriodCode", data.code);
                    }
                });
            },
            //保存单据
            saveBill: function () {
                if (!viewModel.checkEmpty()) {
                    return;
                }
                var result = viewModel.validateBill();
                if (result) {
                    var currentRow, index = viewModel.index;
                    var salesorderData = common.dynamicTemplate.extendDatas(viewModel.salesorderCard.getSimpleData())[0];
                    var saleOrderItemsData = common.dynamicTemplate.extendDatas(viewModel.saleOrderItems.getSimpleData());
                    var batchSaleOrderBomItems = common.dynamicTemplate.extendDatas(viewModel.batchSaleOrderBomItems.getSimpleData());
					salesorderData.orderSource = "02";
                    salesorderData.orderInvoice = viewModel.orderInvoice.getSimpleData()[0];
                    salesorderData.orderReceiveAddress = viewModel.orderReceiveAddress.getSimpleData()[0];
                    if (salesorderData.orderInvoice) {
                        if (!salesorderData.orderInvoice.id) {
                            salesorderData.orderInvoice.persistStatus = "new";
                        } else {
                            salesorderData.orderInvoice.persistStatus = "upd";
                        }
                    }
                    if (salesorderData.orderReceiveAddress) {
                        if (!salesorderData.orderReceiveAddress.id) {
                            salesorderData.orderReceiveAddress.persistStatus = "new";
                        } else {
                            salesorderData.orderReceiveAddress.persistStatus = "upd";
                        }
                    }
                    if (index >= 0) {
						for (var i = 0; i < batchSaleOrderBomItems.length; i++) {
							if (!batchSaleOrderBomItems[i].id) {
								if (batchSaleOrderBomItems[i].dr == 1) {
									batchSaleOrderBomItems.remove(batchSaleOrderBomItems.indexOf(batchSaleOrderBomItems[i]));
									i--;
								} else {
									batchSaleOrderBomItems[i].persistStatus = 'new';
								}
							}
						}
						for (var i = 0; i < saleOrderItemsData.length; i++) {
							if (!saleOrderItemsData[i].id) {
								if (saleOrderItemsData[i].dr == 1) {
									saleOrderItemsData.remove(saleOrderItemsData.indexOf(saleOrderItemsData[i]));
									i--;
								} else {
									saleOrderItemsData[i].persistStatus = 'new';
								}
							} else {
								if (saleOrderItemsData[i].dr == 1) {
                                    saleOrderItemsData[i].goodsId = saleOrderItemsData[i].goodsId.split(",")[0]
                                }
                            }
						}
					} else {
						for (var i = 0; i < batchSaleOrderBomItems.length; i++) {
							if (batchSaleOrderBomItems[i].persistStatus == 'fdel') {
								batchSaleOrderBomItems.remove(batchSaleOrderBomItems.indexOf(batchSaleOrderBomItems[i]));
								i--;
							} else {
								batchSaleOrderBomItems[i].persistStatus = 'new'
							}
						}
						for (var i = 0; i < saleOrderItemsData.length; i++) {
							if (saleOrderItemsData[i].persistStatus == 'fdel') {
								saleOrderItemsData.remove(saleOrderItemsData.indexOf(saleOrderItemsData[i]));
								i--;
							} else {
								saleOrderItemsData[i].persistStatus = 'new';
							}
						}
                    }
					var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
                    for (var i = 0; i < saleOrderItemsData.length; i++) {
						//清除促销信息
						saleOrderItemsData[i].promotinId = '';
						saleOrderItemsData[i].promotinName = '';
						const orderItem = saleOrderItemsData[i];
						if (orderItem.isGift == 1 || "03" == orderType[0].saleModelCode || orderItem.goodsSupplement == 1) {
							orderItem.dealPrice = 0;
            			}
            			// 给bom赋值 库存组织、仓库、财务组织
						var parentGoodsId = saleOrderItemsData[i].goodsId;
						var parentRowNum = saleOrderItemsData[i].rowNum;
						for (var j = 0; j < batchSaleOrderBomItems.length; j++) {
							if (batchSaleOrderBomItems[j].parentGoodsId === parentGoodsId && batchSaleOrderBomItems[j].goodsId !== parentGoodsId && batchSaleOrderBomItems[j].parentRowNum == parentRowNum) {
								batchSaleOrderBomItems[j].deliveryInvOrgId = saleOrderItemsData[i].deliveryInvOrgId;
								batchSaleOrderBomItems[j].deliveryInvOrgCode = saleOrderItemsData[i].deliveryInvOrgCode;
								batchSaleOrderBomItems[j].deliveryInvOrgName = saleOrderItemsData[i].deliveryInvOrgName;

								batchSaleOrderBomItems[j].deliveryWarehouseId = saleOrderItemsData[i].deliveryWarehouseId;
								batchSaleOrderBomItems[j].deliveryWarehouseCode = saleOrderItemsData[i].deliveryWarehouseCode;
								batchSaleOrderBomItems[j].deliveryWarehouseName = saleOrderItemsData[i].deliveryWarehouseName;
								
								batchSaleOrderBomItems[j].settleFinancialOrgId = saleOrderItemsData[i].settleFinancialOrgId;
								batchSaleOrderBomItems[j].settleFinancialOrgCode = saleOrderItemsData[i].settleFinancialOrgCode;
								batchSaleOrderBomItems[j].settleFinancialOrgName = saleOrderItemsData[i].settleFinancialOrgName;
							} else {
								if (batchSaleOrderBomItems[j].goodsId === parentGoodsId && batchSaleOrderBomItems[j].parentRowNum == parentRowNum) {
									batchSaleOrderBomItems[j].deliveryInvOrgId = saleOrderItemsData[i].deliveryInvOrgId;
									batchSaleOrderBomItems[j].deliveryInvOrgCode = saleOrderItemsData[i].deliveryInvOrgCode;
									batchSaleOrderBomItems[j].deliveryInvOrgName = saleOrderItemsData[i].deliveryInvOrgName;

									batchSaleOrderBomItems[j].deliveryWarehouseId = saleOrderItemsData[i].deliveryWarehouseId;
									batchSaleOrderBomItems[j].deliveryWarehouseCode = saleOrderItemsData[i].deliveryWarehouseCode;
									batchSaleOrderBomItems[j].deliveryWarehouseName = saleOrderItemsData[i].deliveryWarehouseName;
									
									batchSaleOrderBomItems[j].settleFinancialOrgId = saleOrderItemsData[i].settleFinancialOrgId;
									batchSaleOrderBomItems[j].settleFinancialOrgCode = saleOrderItemsData[i].settleFinancialOrgCode;
									batchSaleOrderBomItems[j].settleFinancialOrgName = saleOrderItemsData[i].settleFinancialOrgName;
								}
							}
						}
					}
                    for (var i = 0; i < saleOrderItemsData.length; i++) {
                        const orderItem = saleOrderItemsData[i];
                        saleOrderItemsData[i].goodsSupplement = 0;      // 货补统一改为0
                        if (1 == orderItem.isGift || '03' == orderType[0].saleModelCode) {
                            orderItem.dealPrice = 0;
                        }
                        if (viewModel.itemOrderPromRels && viewModel.itemOrderPromRels.length > 0) {
                            viewModel.itemOrderPromRels.map(function(item){
                                if (item.id == saleOrderItemsData[i].promRelsId) {
                                    saleOrderItemsData[i].orderPromRels = item.orderPromRels;
                                }
                            });
                        }
                    }
                    salesorderData.orderPromRels = viewModel.orderPromRels;

                    salesorderData.orderItems = saleOrderItemsData;
                    salesorderData.orderItemBoms = batchSaleOrderBomItems;
                    salesorderData.id = viewModel.salesorderCard.getSimpleData()[0].id ||  viewModel.newsalesorderCardId || "";
                    var setNewPersistStatusFn = function (value) {
						salesorderData.persistStatus = value;
						salesorderData.orderItems.forEach(function (data) {
							var status = data.id ? value : 'new';
							status = data.dr == 1 ? "fdel" : status;
							data.persistStatus = status;
						});
						salesorderData.orderItemBoms.forEach(function (data) {
							var status = data.id ? value : 'new';
							status = data.dr == 1 ? "fdel" : status;
							data.persistStatus = status;
						});
					};
                    var _ajaxUrl = "/create-order";
                    if (index >= 0) {
                        _ajaxUrl = "/update-order";
                    }
                    if (_ajaxUrl == "/create-order") {
						setNewPersistStatusFn("new");
					} else if (_ajaxUrl == "/update-order") {
						setNewPersistStatusFn("upd");
                }
                    $._ajax({
                        url: appCtx + viewModel.baseurl + _ajaxUrl,
                        type: "post",
                        data: JSON.stringify(salesorderData),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
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
                //编辑时不校验主表字段
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
                            // 价格校验
					        var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

                           if ((!rows[i].getValue("salePrice") || !rows[i].getValue("dealPrice")) && rows[i].getValue("isGift") == 0 && '03' != orderType[0].saleModelCode) {
                               temperrmsg += " <span style='color:red'>价格不能为空或者0</span> "
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
            submitBillList: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length != 1) {
					toastr.warning("请选择一项进行提交"); 
					return;
				}
				var listCompId = "salesorderList";
                var billTypeCode = "SaleOrder";
                var tranTypeCode = rows[0].getValue("orderTypeCode");
				var nodeJs = "/ocm-web/pages/b2b/rejectorder/rejectorder.js";
				viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, function(){
					var selectIndex = [];
					selectIndex.push(viewModel.salesorderList.getSelectedIndex());
					viewModel.search(false, function () {
						setTimeout(function () {
							viewModel.salesorderList.setRowsSelect(selectIndex);
						}, 0)
					});
				});
            },
            //收回单据
            unsubmitBillList: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length != 1) {
					toastr.warning("请选择一项进行审批");
					return;
				}
				var listCompId = "salesorderList";
                var billTypeCode = "SaleOrder";
                var tranTypeCode = rows[0].getValue("orderTypeCode");
				var callback = null;
                viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
            },
            // 审核
            approveBillList: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length != 1) {
					toastr.warning("请选择一项进行审批");
					return;
				}
				var listCompId = "salesorderList";
                var billTypeCode = "SaleOrder";
                var tranTypeCode = rows[0].getValue("orderTypeCode");
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
                viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback, withoutBpmCallback);
            },
            //弃审单据
            unapproveBillList: function () {
                var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length != 1) {
					toastr.warning("请选择一项进行审批");
					return;
				}
				var listCompId = "salesorderList";
                var billTypeCode = "SaleOrder";
                var tranTypeCode = rows[0].getValue("orderTypeCode");
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
				viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback, withoutBpmCallback, "/cancelApproveWithoutBpmToSubmit");
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
                if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.OPEN)) {
                    if (rows && rows.length > 0) {
                        viewModel.batch_ajax("/open-order", rows, "打开");
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                }
            },
            close_row: function () {
				var rows = viewModel.saleOrderItems.getSelectedRows();
				if (rows && rows.length > 0) {
					var orderStatusCode = viewModel.salesorderDetailCard.getValue("orderStatusCode");
					if (orderStatusCode == "04") {
						viewModel.item_rows_ajax("/close-order-item", rows, function (data) {
							rows.forEach(function(item) {
								item.setValue('isClose', 1);
							})
						});
					} else {
						toastr.warning("单据号为：" + viewModel.salesorderDetailCard.getValue("orderCode") + " 的订单不是审批通过状态，不能关闭");
						return;
					}
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 行打开
			open_row: function () {
				var rows = viewModel.saleOrderItems.getSelectedRows();
				if (rows && rows.length > 0) {
					var orderStatusCode = viewModel.salesorderDetailCard.getValue("orderStatusCode");
					if (orderStatusCode == "04") {
						viewModel.item_rows_ajax("/open-order-item", rows, function (data) {
							rows.forEach(function(item) {
								item.setValue('isClose', 0);
							})
						});
					} else {
						toastr.warning("单据号为：" + viewModel.salesorderDetailCard.getValue("orderCode") + " 的订单不是审批通过状态，不能打开");
						return;
					}
				} else {
					toastr.warning("请至少选择一项");
				}
            },
			item_rows_ajax: function(url, rows, callback) {
				var ids = [];
				for (var i = 0; i < rows.length; i++) {
					ids.push(rows[i].getValue("id"));
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + url,
					type: "post",
					data: {
						itemId: ids.join(","),
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
						}
					}
				})
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
                var latestnum = viewModel.currowNum(),
                    newnum = latestnum + 10;
                viewModel.currowNum(newnum);
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
                viewModel.currowNum(maxRowNum);
            },
            // 清空已选参照
            clearRef: function (referids) {
                if (referids && referids.length > 0) {
                    for (var i = 0; i < referids.length; i++) {
                        var refer = $("#refContainersalesorderCard_" + referids[i]).data("uui.refer");
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
                viewModel.changeCondition("salesorderCard_customerId", {
                    "EQ_isEnable": "1",
                    'EQ_isChannelCustomer': '1'
                }, {});
                viewModel.changeCondition("salesorderCard_receiveCustomerId", {
                    "EQ_isEnable": "1",
                    'EQ_isChannelCustomer': '1'
                }, {});
            },
            seteidtCondition: function (data) {
				var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
				viewModel.changeCondition(
					"salesorderCard_customerId", {
						EQ_isEnable: "1",
						EQ_isChannelCustomer: "1",
						EQ_SaleOrder: saleOrgId
					}, {}
				);
				viewModel.changeCondition(
					"salesorderCard_receiveCustomerId", {
						EQ_isEnable: "1",
						EQ_isChannelCustomer: "1",
						EQ_SaleOrder: saleOrgId
					}, {}
				);
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
				var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
                viewModel.salesorderCard.setValue("saleModel", orderType[0].saleModelCode);
            },
            //新增 参照
            showAddRefer: function () {
                viewModel.searchcomp2.clearSearch();
                viewModel.removeAllreferRows();
                if (!viewModel.referyorderdialog) {
                    viewModel.referyorderdialog = u.dialog({
                        id: "dialog_referorder",
                        content: "#dialog_referorder",
                        hasCloseMenu: true,
                        width: "85%"
                    });
                    viewModel.itemFun();
                    var okButton = $("#dialog_referorder .J-ok");
                    okButton.off().on("click", function () {
                        viewModel.confirmReferDeliveryorder();
                    });
                    var cancelButton = $("#dialog_referorder .J-cancel");
                    cancelButton.off().on("click", function () {
                        viewModel.referyorderdialog.close();
                    });
                } else {
                    viewModel.itemFun();
                    viewModel.referyorderdialog.show();
                }
            },

            //确定 新增
            confirmReferDeliveryorder: function () {
                // 发货地址和发票信息，在点击选中行的时候添加
                var parentArr = viewModel.salesrefOrderList.getSimpleData({
                    type: "select"
                });
                var itemArr = viewModel.salesrefOrderItemList.getSimpleData({
                    type: "select"
                });
                parentArr[0].orderPromRels.map(function(item){
                    item.id = "";
                    item.orderId = "";
                    item.orderItemId = "";
                    item.persistStatus = "new"
                })
                var bomArr = viewModel.salesrefOrderBomItemList.getSimpleData();
                if (parentArr.length > 1 || parentArr.length == 0) {
                    toastr.warning("请选择一条原单");
                    return;
                }
                if (!itemArr.length) {
                    toastr.warning("请至少选择一条商品");
                    return;
                }
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                viewModel.goBillPanel(
                    function () {
                        var itemBomArr = [];
                        for (var j = 0; j < bomArr.length; ++j) {
                            for (var i = 0; i < itemArr.length; ++i) {
                                if (itemArr[i].goodsId == bomArr[j].parentGoodsId && itemArr[i].rowNum == bomArr[j].parentRowNum) {
                                    itemBomArr.push(bomArr[j]);
                                }
                            }
                        }
                        viewModel.setData(parentArr, itemArr, itemBomArr);
                        viewModel.isOriginalSingle(1);
                        viewModel.calculationItemsAmount();
                        viewModel.referyorderdialog.close();
                        viewModel.removeAllreferRows();
                        viewModel.editEventListener();
                    }
                );
                
            },
            calculationItemsAmount: function () {
                var arr = viewModel.saleOrderItems.getSimpleData();
                if (arr.length > 0) {
                    var totalAmount = 0;
                    var totalNum = 0;
                    for (var i = 0; i < arr.length; i++) {
                        totalAmount += parseFloat(arr[i].dealAmount);
                        totalNum += parseFloat(arr[i].mainNum);
                    }
                    viewModel.salesorderCard.getCurrentRow().setValue("totalNum", totalNum);

                    viewModel.salesorderCard.getCurrentRow() .setValue("offsetAmount", totalAmount);

                    viewModel.salesorderCard.getCurrentRow().setValue("totalDealAmount", totalAmount);

                    viewModel.salesorderCard.getCurrentRow().setValue("totalReturnAmount", totalAmount);
                }
            },
            setData: function (parentArr, itemArr, itemBomArr) {
                viewModel.index = -1;
                viewModel.setDefaultValue(parentArr[0], itemArr, itemBomArr);
                viewModel.salesorderCard.removeAllRows();
                viewModel.saleOrderItems.removeAllRows();
                viewModel.batchSaleOrderBomItems.removeAllRows();
                viewModel.salesorderCard.setSimpleData(parentArr);
                var salesManagerBase = viewModel.app.getComp("salesManagerId");
				salesManagerBase && $(salesManagerBase.element).attr(
					"data-refparam",
					'{"EQ_isEnable":"1","EQ_personPosts.organization.id":"' + parentArr[0].saleOrgId + '"}'
                );
                $("#salesorderCard_orderTypeId").parent().attr("data-refparam", JSON.stringify({
					EQ_isEnable: "1",
					EQ_billTypeId: "SaleOrder",
					"IN_trantypeExtends.fieldValue": "02"
				}));
                viewModel.saleOrderItems.setSimpleData(itemArr);
                viewModel.batchSaleOrderBomItems.setSimpleData(itemBomArr);
                var orderReceiveAddress = viewModel.orderReceiveAddress.getSimpleData()[0];
                var orderInvoice = viewModel.orderInvoice.getSimpleData()[0];
                if (orderReceiveAddress) {
                    viewModel.salesorderCard.setValue("orderReceiveAddress", orderReceiveAddress.receiveAddressId);
                    viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", orderReceiveAddress.receiver);
                    viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", orderReceiveAddress.receiverPhone);
                    var adr = (orderReceiveAddress.country || "") + (orderReceiveAddress.receiverProvince || "") + (orderReceiveAddress.receiverCity || "") + (orderReceiveAddress.receiverTown || "") + (orderReceiveAddress.receiverAddress || "");
                    viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", adr);
                }
                if (orderInvoice) {
					viewModel.salesorderCard.setValue("orderInvoice", orderInvoice.invoiceId);
					viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceTitle);
                }
            },
            setDefaultValue: function (parentArr, itemArr, itemBomArr) {
                parentArr.srcOrderCode = parentArr.orderCode;
                parentArr.srcOrderId = parentArr.id;
                parentArr.srcReqOrderId = parentArr.srcReqOrderId;
                parentArr.srcReqOrderCode = parentArr.srcReqOrderCode;

                // clear data
                parentArr.id = "";
                parentArr.approveOpinion = '';
                parentArr.approveTime = '';
                parentArr.costTypeCode = '';
                parentArr.costTypeId = '';
                parentArr.costTypeName = '';
                parentArr.creationTime = '';
                parentArr.modifiedTime = '';
                parentArr.orderStatusId = '';
                parentArr.creator = '';
                parentArr.orderCode = "";
                parentArr.orderTypeId = "";
                parentArr.deliveryDate = "";
                parentArr.totalNum = 0;
                parentArr.totalDealAmount = 0;
                parentArr.totalReturnAmount = 0;
                parentArr.orderDate = new Date().getTime();
                parentArr.orderStatusCode = billstatus.COMMITTED;

                parentArr.status = "nrm"
                itemArr.forEach(function (item) {
                    item.orderId = "";
                    item.srcOrderCode = parentArr.orderCode;
                    item.srcOrderId = parentArr.id;
                    item.srcOrderItemId = item.id;
                    item.id = "";
                    item.rowNum = viewModel.generateRownum();
                    item.totalReturnAmount = item.dealAmount;
                    item.baseDiscountPrice = item.salePrice;
                    item.srcReqOrderId = "";
                    item.srcReqOrderCode = "";
                    item.srcReqOrderItemId = "";
                    item.status = "nrm";
                    item.returnTypeId = "d5acd107-2b5d-411a-8d96-d9f856a0e478";         // 默认退货类型为退货退款
                    item.returnTypeCode = "01";
                    item.returnTypeName = "退货退款";
                });
                itemBomArr.forEach(function (item) {
                    item.id = "";
                    item.orderId = "";
                    item.orderItemId = "";
                    item.srcReqOrderId = "";
                    item.srcReqOrderCode = "";
                    item.srcReqOrderItemId = "";
                })
            },
            // 选配
            goodsOpt: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var baseGoodsOptName = $.trim(obj.row.value.baseGoodsOptValue); // 选配id
                if (obj.row.value.isOptional == 1 || baseGoodsOptName) {
                    var optName = baseGoodsOptName ? baseGoodsOptName : '添加选配';
                    var detailfun = "data-bind=click:goodsOptionalFun.bind($data," + obj.rowIndex + ")";
                    obj.element.innerHTML =
                        '<a href="#" class="ui-a-detail" ' +
                        detailfun +
                        ">" + optName + "</a>";
                } else {
                    obj.element.innerHTML = '';
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            // 查看选配
            goodsOptDetails: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var baseGoodsOptId = obj.row.value.baseGoodsOptId; // 选配id
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

                var thisDatable = viewModel.saleOrderItems.getAllRealRows()[obj];
                var data = viewModel.saleOrderItems.getSimpleData()[obj];
                var id = data.goodsId;
                var baseGoodsOptId = data.baseGoodsOptId ? data.baseGoodsOptId : "";
                common.goodsOptional.goodsOptional(viewModel, '商品选配', id, baseGoodsOptId, 'dialog_goodsOptional', viewModel.saleOrderItems, viewModel.batchSaleOrderBomItems, function (goodsOptData, goodsOptID, cb) {
                    /**
                     * 循环遍历返回结果，拼接后展示
                     */
                    var goodsOpt = goodsOptID[0].goodsOptDtos;
                    //获取全部bom信息
                    var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                    var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                    var optResult = '',
                        id = '';

                    for (var i = 0; i < bomdata.length; i++) {
                        for (var j = 0; j < goodsOpt.length; j++) {
                            if (bomdata[i].goodsId == goodsOpt[j].goodsId && goodsOpt[j].optResult) {
                                allrows[i].setValue("baseGoodsOptId", goodsOpt[j].id);
                                allrows[i].setValue("baseGoodsOptValue", goodsOpt[j].optResult);
                            }
                        }
                    }
                    for (var i = 0; i < goodsOpt.length; i++) {
                        optResult += goodsOpt[i].optResult + ',';
                        id += goodsOpt[i].id + ',';
                    }

                    optResult = optResult.substr(0, optResult.length - 1);
                    id = id.substr(0, id.length - 1);
                    thisDatable.setValue('baseGoodsOptId', id);
                    thisDatable.setValue('baseGoodsOptValue', optResult);
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

                common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, baseGoodsOptId, 'dialog_goodsOptDetails', viewModel.saleOrderItems, viewModel.batchSaleOrderBomItems);

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
            //页签点击
            itemFun: function () {
                $('#tab-panel-7').show();
                $('#tab-panel-8').hide();
            },
            itemBomFun: function () {
                $('#tab-panel-7').hide();
                $('#tab-panel-8').show();
            },
            // 从行号池中拿到最新的bom行号
            generateBomrowNum: function () {
                var latestnum = viewModel.currowBomNum(),
                    newnum = parseFloat(latestnum) + 10;
                viewModel.currowBomNum(newnum);
                return newnum;
            },
            removeAllreferRows: function () {
                viewModel.salesrefOrderList.totalRow(0);
                viewModel.salesrefOrderList.totalPages(0);
                viewModel.salesrefOrderList.removeAllRows();
                viewModel.salesrefOrderItemList.removeAllRows();
            },
            // 选择原单
            referSelectBeforHandle: function (obj) {
                viewModel.salesrefOrderList.setRowSelect(obj.rowIndex);
                viewModel.salesrefOrderListRefData[obj.rowIndex].orderReceiveAddress.id = '';
                viewModel.salesrefOrderListRefData[obj.rowIndex].orderReceiveAddress.orderId = '';
                viewModel.salesrefOrderListRefData[obj.rowIndex].orderInvoice.id = '';
                viewModel.salesrefOrderListRefData[obj.rowIndex].orderInvoice.orderId = '';
                viewModel.orderReceiveAddress.setSimpleData(viewModel.salesrefOrderListRefData[obj.rowIndex].orderReceiveAddress);
                viewModel.orderInvoice.setSimpleData(viewModel.salesrefOrderListRefData[obj.rowIndex].orderInvoice);
                viewModel.orderPromRels = viewModel.salesrefOrderListRefData[obj.rowIndex].orderPromRels;
                var itemOrderPromRels = viewModel.salesrefOrderListRefData[obj.rowIndex].orderItems;
                viewModel.itemOrderPromRels = [];

                itemOrderPromRels.map(function(item){
                    item.orderPromRels.map(function(promItem){
                        promItem.id = "";
                        promItem.orderId = "";
                        promItem.orderItemId = "";
                        promItem.persistStatus = "new"
                    })
                    var rels = {
                        id: item.id,
                        orderPromRels: item.orderPromRels
                    }
                    viewModel.itemOrderPromRels.push(rels);
                })

                viewModel.selectRowObj(obj, itemOrderPromRels);
                return true;
            },
            selectRowObj: function (obj, itemlist) {
                viewModel.salesrefOrderItemList.removeAllRows();
                viewModel.salesrefOrderBomItemList.removeAllRows();
                var listArr = [];
                var selectedRows = viewModel.salesrefOrderList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        var listData = selectedRows[i].getSimpleData();
                        listArr.push(listData);
                        itemlist.map(function (orderItems) {
                            var promotinName = '',
                                promotinId = '';
                            orderItems.orderPromRels.map(function (items) {
                                promotinName += items.activityName + ',';
                                promotinId += items.activityId + ',';
                            });
                            orderItems.promotinName = promotinName.substr(0, promotinName.length - 1);
                            orderItems.promotinId = promotinId.substr(0, promotinId.length - 1);
                            orderItems.promRelsId = orderItems.id; // 记录唯一id， 保存时赋促销信息使用
                        });
                        viewModel.salesrefOrderItemList.addSimpleData(itemlist);
                        viewModel.salesrefOrderBomItemList.addSimpleData(listData.orderItemBoms);
                        viewModel.salesrefOrderItemList.setAllRowsSelect();
                    }
                }
            },
            removeAllItemsRefer: function () {
                viewModel.salesrefOrderItemList.removeAllRows();
                viewModel.salesrefOrderBomItemList.removeAllRows();
            },
            referUnSelectHandle: function (obj) {
                // viewModel.referUnSelectItemHandle(obj);
                // viewModel.salesrefOrderItemList.removeAllRows();
                var id = obj.rowObj.value.id;
                var itemId = obj.rowObj.value.orderItems.getValue("id");
                var itemrows = viewModel.salesrefOrderItemList.getAllRows();

                for (var i = itemrows.length - 1; i >= 0; i--) {
                    if (itemrows[i].getValue("orderId") === id) {
                        viewModel.salesrefOrderItemList.removeRows([i], {
                            forceDel: true
                        });
                    }
                }
            },
            //选择采购订单商品信息
            referSelectItemHandle: function (obj) {
                var id = obj.rowObj.value.id;
                var selectedRows = viewModel.salesrefOrderItemList.getSelectedRows();
            },
            referUnSelectItemHandle: function (obj) {

            },
            searchRefer: function (reindex) {
                viewModel.removeAllItemsRefer();
                if (reindex) {
                    viewModel.salesrefOrderList.pageIndex(0);
                }
                viewModel.salesrefOrderList.removeAllRows();
                var queryData = viewModel.searchcomp2.getDataWithOpr();
                var pageSize = viewModel.salesrefOrderList.pageSize();
                var pageNumber = viewModel.salesrefOrderList.pageIndex();
                queryData.page = pageNumber;
                queryData.size = pageSize;
                queryData.search_IN_saleModel = "01,03";
                if (!queryData["search_EQ_saleOrg"]) {
					queryData["search_NOTNULL_saleOrg"] = "~";
				}

                $._ajax({
                    type: "get",
                    url: window.pathMap.b2b + "/b2b/order/page-return-primary-order",
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.salesrefOrderList.setSimpleData(data.content, {unSelect: true});
                        viewModel.salesrefOrderList.totalRow(data.totalElements);
                        viewModel.salesrefOrderList.totalPages(data.totalPages);
                        viewModel.salesrefOrderListRefData = data.content;
                        // viewModel.updateSelectedIndices();
                    }
                });
            },
            //清空参照搜索条件
            cleanSearchRefer: function () {
                viewModel.searchcomp2.clearSearch();
            },
            //页码改变时的回调函数
            pageChangeRefer: function (index) {
                viewModel.salesrefOrderList.pageIndex(index);
                viewModel.searchRefer();
            },
            //页码改变时的回调函数
            sizeChangeRefer: function (size) {
                viewModel.salesrefOrderList.pageSize(size);
                viewModel.searchRefer(true);
            },
            //点击上传按钮
            btnUploadAttach: function () {
                $("#attachuploadbatch_id").val(undefined);
                $("#attachuploadbatch_id").trigger("click");

            },
            uploadAttach: function () {
                var fileNum = $("#attachuploadbatch_id")[0].files.length;
                var fileSize = 0;
                var fileSizeMb = 0;
                var fileTypeArr = [];

                var pk = viewModel.pk;
                var par = {
                    fileElementId: "attachuploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file"
                    // name="file"
                    // />,可以修改，主要看你使用的 id是什么
                    filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                    groupname: "att" + pk, //【必填】分組名称,未来会提供树节点
                    permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
                    url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
                    //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
                    cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                };
                var f = new interface_file();
                f.filesystem_upload(par, viewModel.uploadAttachCallback);
            },

            uploadAttachCallback: function (data) {
                if (1 == data.status) {
                    //上传成功状态
                    for (var i = 0; i < data.data.length; ++i) {
                        viewModel.attachList.push(data.data[i]);
                        viewModel.showAttachment();
                    }
                } else {
                    //error 或者加載js錯誤
                    toastr.error(data.message);
                }
            },
            showAttachment: function (orderSource) {
				var attachList = orderSource == "01" ? viewModel.orderAttachments : viewModel.attachList;
				var htmlStr = "<div>";
				for (var i = 0; i < attachList.length; i++) {
					// 数据做容错
					attachList[i].url = attachList[i].url || attachList[i].attachmentUrl;
					attachList[i].filename = attachList[i].filename || attachList[i].attachmentName;
					// 判断文件是图片类型
					var postfix = attachList[i].url.split("."),
						fileExt = postfix[postfix.length - 1].toUpperCase();
					htmlStr += '<div style="display:flex; margin-left:40px">';
					if (fileExt == "JPG" || fileExt == "JPEG" || fileExt == "PNG") {
						htmlStr +=
							'<span class="attach-details" href="' +
							attachList[i].url +
							'" style="cursor: pointer">' +
							attachList[i].filename +
							"</span>";
					} else {
						htmlStr += "<span>" + attachList[i].filename + "</span>";
					}
					htmlStr +=
						'<a id="down_' +
						attachList[i].id +
						'" href="' +
						attachList[i].url +
						'" download = "' +
						attachList[i].filename.split(".")[0] +
						'" class="margin-left-15">下载</a>';
					// 编辑页才能删除
					if (!viewModel.isDetail) {
						htmlStr +=
						'<a id="' +
						attachList[i].id +
						'" class="attach-del margin-left-10" style="cursor: pointer">删除</a>';
					}
					htmlStr += "</div>";
				}
				htmlStr += "</div>";

				if (viewModel.isDetail) {
					if (orderSource == "01") {
						$("#order-card-attachDetail-web")[0].innerHTML = htmlStr;
					} else {
						$("#order-card-attachDetail")[0].innerHTML = htmlStr;
					}
				} else {
					if (orderSource == "01") {
						$("#order-card-attach-web")[0].innerHTML = htmlStr;
					} else {
						$("#order-card-attach")[0].innerHTML = htmlStr;
					}
				}
				$("#order-card-attach").off("click").on("click", ".attach-del", function(e){
					viewModel.fileDelete(e.currentTarget.id);
				});
				$("#order-card-attach-web").off("click").on("click", ".attach-del", function(e){
					viewModel.fileDelete_web($(this), e.currentTarget.id);
				});
				// 查看附件
				$(".attach-details").click(function () {
					common.flieUpload.fileDetails($(this).attr("href"));
				});
			},
            fileDelete: function (id) {
                common.dialog.confirmDialog({
                    msg1: '是否要删除附件？',
                    msg2: ' ',
                    width: '400px',
                    type: 'error',
                    onOk: function () {
                        var par = {
                            id: id, //【必填】表的id
                            cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                        };
                        var f = new interface_file();
                        f.filesystem_delete(par, viewModel.fileDeleteCallBack);
                    }
                });
            },
            fileDelete_web: function (element, id) {
				for (var i = 0; i < viewModel.orderAttachments.length; i ++) {
					if (viewModel.orderAttachments[i].id == id) {
						viewModel.orderAttachments[i].dr = 1;
						viewModel.orderAttachments[i].persistStatus = "fdel";
						element.parent().remove();
					}
				}
			},
            //附件删除回调
            fileDeleteCallBack: function (data) {
                if (1 == data.status) { //删除成功状态
                    // viewModel.queryImage();
                    viewModel.queryAttach();
                } else {
                    toastr.error(data.message);
                }
            },
            queryAttach: function () {
                //获取表单
                var pk = viewModel.pk;
                var par = {
                    fileElementId: "attachuploadbatch_id",
                    //建议一定要有条件否则会返回所有值
                    filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                    groupname: "att" + pk, //【选填】[分組名称,未来会提供树节点]
                    cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                };
                var f = new interface_file();
                f.filesystem_query(par, viewModel.queryAttachCallback);
            },
            queryAttachCallback: function (data) {
                if (1 == data.status) {
                    //上传成功状态
                    viewModel.attachList = data.data;
                    viewModel.showAttachment();
                } else {
                    //删除成功后查询
                    if (data.status == 0 && !data.data) {
                        viewModel.attachList = [];
                    }
                    viewModel.showAttachment();
                }
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
            saleOrderItemsOnBeforeEditFun: function (obj) {
                var gridObj = obj.gridObj;
                var row = obj.rowObj.value;
                if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("salePrice")) || obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("dealPrice"))) {
                    var price = obj.rowObj.value.salePrice;
                    if (price || price > 0) {
                        if (viewModel.isPriceEditFind == 1) {
                            return true;
                        } else {
                            return false
                        }
                    } else {
                        if (viewModel.isPriceEditNotFind == 1) {
                            return true;
                        } else {
                            return false
                        }
                    }
                }
                if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("deliveryWarehouseId"))) {
                    var deliveryInvOrgId = obj.rowObj.value.deliveryInvOrgId;
                    viewModel.saleOrderItems.setMeta("deliveryWarehouseId", "refparam", '{"EQ_inventoryOrg.id":"' + deliveryInvOrgId + '","EQ_isEnable":"1"}');
                }
                if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsId"))) {
                    if (!viewModel.isAvailable()) { 
                        return false;
                    }
				    var customer = common.getRefDataByDtAndKey("salesorderCard", "customerId");
				    var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
				    var saleOrg = common.getRefDataByDtAndKey("salesorderCard", "saleOrgId");

                    var customerId = customer && customer[0].id;
                    var saleModel = orderType && orderType[0].saleModelCode;
                    var saleOrgId = saleOrg && saleOrg[0].refpk;
                    var condition = {
                        "search_customerId": customerId,
                        "search_saleModel": saleModel,
                        "search_customerRankCode": "01",
                        "search_organization": saleOrgId
                    };
                    viewModel.saleOrderItems.setMeta("goodsId", "refparam", JSON.stringify(condition));
                }
                return true;
            },
            // 根据销售组织 + 客户 查询正向销售类型，客户经理，销售部门
			qureyCustomerManageAndOrderType: function (jurisdictionsBody) {
				// 根据销售组织加客户 询渠道客户交易关系（客户经理、部门，多条只取有客户经理的第一条）
				$._ajax({
					type: "get",
					url: window.pathMap.base + "/base/customer-jurisdictions",
					data: jurisdictionsBody,
					success: function (data) {
						if (!data) {
							return;
						}
						var juris = data.content;
						for (var i = 0; i < juris.length; i++) {
							if (juris[i].customerManagerId) {
								var manage = juris[i];
								viewModel.salesorderCard.setValue(
									"salesManagerId",
									manage.customerManagerId
								);
								viewModel.salesorderCard.setValue(
									"salesManagerCode",
									manage.customerManagerCode
								);
								viewModel.salesorderCard.setValue(
									"salesManagerName",
									manage.customerManagerName
								);
								viewModel.salesorderCard.setValue(
									"salesDeptId",
									manage.saleDepartmentId
                                );
								viewModel.salesorderCard.setValue(
									"salesDeptCode",
									manage.saleDepartmentCode
								);
								viewModel.salesorderCard.setValue(
									"salesDeptName",
									manage.saleDepartmentName
								);
								viewModel.salesorderCard.setValue(
									"marketAreaId",
									manage.marketAreaId
								);
								viewModel.salesorderCard.setValue(
									"marketAreaCode",
									manage.marketAreaCode
								);
								viewModel.salesorderCard.setValue(
									"marketAreaName",
									manage.marketAreaName
								);
								i = juris.length;
							}
						}
					}
				});
            },
            //返回列表页
            retListPanel: function() {
                $(".ui-panel").hide();
                $(".ui-list-panel").show();
                $(".ui-list-panel").animateCss("fadeIn");
                viewModel.search();
                // 清空新增页附件内容
                $("#order-card-attach").html('');
                $("#order-card-attach-we").html('');
                $("#order-card-attachDetail").html('');
                $("#order-card-attachDetail-we").html('');
            },
            getBillIdAjax: function () {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/get-billId",
					type: "get",
					data: {},
					async: false,
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						if (data) {
							viewModel.pk = data;
							viewModel.newsalesorderCardId = data;
							viewModel.salesorderCard.setValue("id", data);
						} else {
							toastr.error("没获取到订单编号！");
						}
					}
				});
			},
        };
    }
    return events;
});
