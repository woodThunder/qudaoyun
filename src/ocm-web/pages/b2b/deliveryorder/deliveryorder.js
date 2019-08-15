define(
    ["text!./deliveryorder.html", "ocm_common", "ocm_baseview", "./meta.js", "../../flow/bpmapproveref/bpmopenbill.js"],
    function (tpl, common, baseview, model, bpmopenbill) {
        "use strict";
        var viewModel, app;
        var BILLPANELSTATUS = {
            ADD: "add",
            EDIT: "edit",
            COPY: "copy",
            DETAIL: "detail",
            DEFAULT: "default"
        };
        var view = baseview.extend({
            beforeCreate: function () {
                viewModel = this.viewModel;
                app = this.app;
                viewModel = _.extend(viewModel, bpmopenbill.model);
            },
            tpl: tpl,
            model: model,
            baseData: {
                baseurl: "/b2b/delivery-order",
                applicationUrl: "/b2b/delivery-order",
                itemBomurl: "/b2b/order-item-boms",
                // 发货单
                // deliveryOrderList: new u.DataTable(model.options.metas.deliveryMeta),
                /* deliveryOrderItemsList: new u.DataTable(
                    model.options.metas.deliveryItemsMeta
                ),
                deliveryOrderItemBomsList: new u.DataTable(
                    model.options.metas.deliveryItemBomsMeta
                ), */
                deliveryOrderList: {
                    templateType: "list",
                    cls: "deliveryOrder"
                },
                 deliveryOrderCard: {
                     templateType: "edit",
                     cls: "deliveryOrder"
                 },
                deliveryOrderDetailCard: {
                    templateType: "detail",
                    cls: "deliveryOrder"
                },
                deliveryOrderItemsList: {
                    templateType: "card",
                    cls: "deliveryOrder_Item"
                },

                deliveryOrderItemBomsList: {
                    templateType: "card",
                    cls: "deliveryOrder_ItemBom"
                },
                detailChildButtons: model.options.buttons.buttonDetail,

                referSaleOrderItemsList: new u.DataTable(
                    model.options.metas.referSaleOrderItemsMeta
                ),
                //已选择
                selectedreferListItems: new u.DataTable(
                    model.options.metas.referSaleOrderItemsMeta
                ),
                referSaleOrderItemBomsList: new u.DataTable(
                    model.options.metas.referSaleOrderItemBomsMeta
                ),
                //已选择
                selectedreferListItemBoms: new u.DataTable(
                    model.options.metas.referSaleOrderItemBomsMeta
                ),
                saveCheckCreditDetailItems: new u.DataTable(
                    model.options.metas.saveCheckCreditMeta
                ),
                //发货单状态
                orderStatusDataSource: ko.observableArray([]),

                searchcomp: {},
                searchcomp2: {},

                searchSource: model.options.searchs.search1,
                search2Source: model.options.searchs.search2,

                button1Source: model.options.buttons.button1,
                button2Source: model.options.buttons.button2,
                button3Source: model.options.buttons.button3,
                buttonDetail: model.options.buttons.buttonDetail,

                detail11Source: model.options.details.detail1,

                grid1Option: model.options.grids.grid1,
                grid2Option: model.options.grids.grid2,
                grid3Option: model.options.grids.grid3,
                grid4Option: model.options.grids.grid4,
                grid5Option: model.options.grids.grid5,
                grid6Option: model.options.grids.grid6,
                grid7Option: model.options.grids.grid7,
                grid8Option: model.options.grids.grid8,
                grid9Option: model.options.grids.grid9,
                // 信用校验
                saveCheckCreditDetailOption: model.options.grids.saveCheckCreditDetail,
                billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
                //跳转单据页
                goBillPanel: common.bill.goBillPanel,
			    isBomPanel: ko.observable(),
                //跳转详情页
                goDetailPanel: common.bill.goDetailPanel,
                orderStatus: ko.pureComputed(function () {
                    var orderStatusName = viewModel.deliveryOrderList.ref("orderStatusName")();
                    // 保存态、已提交审批、审批中、审批通过、审批不通过、部分出库、全部出库
                    return orderStatusName;
                }),
                listRenderTypes: {
                    deliveryOrderCode: "detailRender",
                    isClose: "disableBooleanRender"
                },
                editRenderTypes: {
                    baseGoodsOptValue: "goodsOptDetails",
                    isGift: "disableBooleanRender",
                    goodsSupplement: "disableBooleanRender",
                    isClose: "disableBooleanRender"
                },
                detailRenderTypes: {
                    baseGoodsOptValue: "goodsOptDetails",
                    isGift: "disableBooleanRender",
                    goodsSupplement: "disableBooleanRender",
                    isClose: "disableBooleanRender"
                },
                precisionSettings: {
                    totalNum: {
                        type: "numberFloat",
                        precision: 2
                    },
                    totalDealAmount: {
                        type: "amountFloat",
                    },
                    totalAmount: {
                        type: "amountFloat",
                    },
                    offsetAmount: {
                        type: "amountFloat",
                    },
                    totalGoodsSuppleAmount: {
                        type: "amountFloat",
                    },
                    promAmount: {
                        type: "amountFloat",
                    },
                    maxPreferentialMoney: {
                        type: "amountFloat",
                    },
                    // 单位精度处理表头单位有点问题，先用金额处理
                    totalWeight: {
                        type: "amountFloat",
                        precision: 4
                    },
                    totalNetWeight: {
                        type: "amountFloat",
                        precision: 4
                    },
                    totalVolume: {
                        type: "amountFloat",
                        precision: 4
                    },
                    weight: {
                        type: "weightFloat",
                    },
                    rowWeight: {
                        type: "weightFloat",
                    },
                    netWeight: {
                        type: "weightFloat",
                    },
                    rowNetWeight: {
                        type: "weightFloat",
                    },
                    volume: {
                        type: "volumeFloat",
                    },
                    rowVolume: {
                        type: "volumeFloat",
                    },
                    orderNum: {
                        type: "numberFloat"
                    },
                    mainNum: {
                        type: "numberFloat"
                    },
                    basePrice: {
                        type: "priceFloat"
                    },
                    salePrice: {
                        type: "priceFloat"
                    },
                    dealPrice: {
                        type: "priceFloat"
                    },
                    supplierPrice: {
                        type: "priceFloat"
                    },
                    amount: {
                        type: "amountFloat"
                    },
                    dealAmount: {
                        type: "amountFloat"
                    },
                    deliveryNum: {
                        type: "numberFloat"
                    },
                    stockOutNum: {
                        type: "numberFloat"
                    },
                    stockInNum: {
                        type: "numberFloat"
                    },
                    returnNum: {
                        type: "numberFloat"
                    },
                    refundNum: {
                        type: "numberFloat"
                    },
                    signNum: {
                        type: "numberFloat"
                    },
                    replenishNum: {
                        type: "numberFloat"
                    },
                    coordinateNum: {
                        type: "numberFloat"
                    },
                    totalReturnAmount: {
                        type: "amountFloat"
                    },
                    goodsNum: {
                        type: "numberFloat"
                    },
                    baseDiscountPrice: {
                        type: "priceFloat",
                    },
                    promPrice: {
                        type: "priceFloat"
                    },
                    promAmount: {
                        type: "amountFloat"
                    },
                    addStorageAmount: {
                        type: "numberFloat"
                    },
                    returnGoodsAmount: {
                        type: "numberFloat"
                    },
                    existingNum: {
                        type: "numberFloat"
                    }
                }
            },
            rendertype: {
                operation: function (obj) {
                    var editfun, delfun, showApprovalfun;
                    var dataTableRowId = obj.row.value["$_#_@_id"];
                    var orderStatusCode = obj.row.value.orderStatusCode;
                    editfun =
                        "data-bind=click:showEditBillPanel.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    delfun =
                        "data-bind=click:del.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    showApprovalfun =
                        "data-bind=click:showApprovalInfo.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";

                    var operationButton = "";
                    // 保存态、审批不通过可编辑
                    if (orderStatusCode == "01" || orderStatusCode == "05") {
                        operationButton +=
                            '<span class="ui-handle-word">' +
                            "<a " +
                            editfun +
                            ' title="编辑">编辑</a>' +
                            "</span>    ";
                    }
                    // 保存态可删除
                    if (orderStatusCode == "01") {
                        operationButton +=
                            '<span class="ui-handle-word">' +
                            "<a " +
                            delfun +
                            ' title="删除">删除</a>' +
                            "</span>";
                    }
                    // 审批中，审批通过、审批不通过可查看审批信息
                    if (orderStatusCode == "03" || orderStatusCode == "04" || orderStatusCode == "05") {
                        operationButton +=
                            '<span class="ui-handle-word">' +
                            "<a " +
                            showApprovalfun +
                            ' title="查看审批信息">查看审批信息</a>' +
                            "</span>";
                    }
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' + operationButton + "</div>";
                    ko.cleanNode(obj.element);
                    ko.applyBindings(viewModel, obj.element);
                },
                detailRender: common.rendertype.detailRender,
                statusRender: function (params) {
                    var value = params.value;
                    var showName = common.dataconvert.valueToName(
                        value,
                        viewModel.orderStatusDataSource
                    );
                    params.element.innerHTML = showName;
                },
                rowRemove: function (obj) {
                    var dataTableRowId = obj.row.value["$_#_@_id"];
                    var rowRemove =
                        "data-bind=click:remove.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
                        '<span class="ui-handle-word">' +
                        '<a href="#"  ' +
                        rowRemove +
                        ' title="删除">删除</a>' +
                        "</span>" +
                        "</div>";
                    ko.cleanNode(obj.element);
                    ko.applyBindings(viewModel, obj.element);
                }
            },
            events: {
                remove: function (index, rowId) {
                    var curRow = viewModel.selectedreferListItems.getRowByRowId(rowId);
                    var id = curRow.getValue("id");
                    var goodsId = curRow.getValue("goodsId");
                    var parentRowNum = curRow.getValue("rowNum");
                    var detailItemRow = viewModel.referSaleOrderItemsList.getSelectedRows();
                    var selectedBoms = viewModel.selectedreferListItemBoms.getAllRealRows();

                    for (var i = detailItemRow.length - 1; i >= 0; i--) {
                        if (detailItemRow[i].getValue("id") === id) {
                            viewModel.referSaleOrderItemsList.setRowUnSelect(i);
                        }
                    }
                    viewModel.selectedreferListItems.removeRows(curRow, {
                        forceDel: true
                    });
                    for (var i = selectedBoms.length - 1; i >= 0; i--) {
                        if (selectedBoms[i].getValue("parentGoodsId") === goodsId && selectedBoms[i].getValue("parentRowNum") == parentRowNum) {
                            viewModel.selectedreferListItemBoms.removeRows(selectedBoms[i], {
                                forceDel: true
                            });
                        }
                    }
                },

                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                search: function (reindex, callback) {
                    if (reindex) {
                        viewModel.deliveryOrderList.pageIndex(0);
                    }
                    viewModel.deliveryOrderList.removeAllRows();
                    var queryData = viewModel.searchcomp.getDataWithOpr ?
                        viewModel.searchcomp.getDataWithOpr() : {};
                    var pageSize = viewModel.deliveryOrderList.pageSize();
                    var pageNumber = viewModel.deliveryOrderList.pageIndex();
                    queryData.page = pageNumber;
                    queryData.size = pageSize;
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.baseurl,
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.deliveryOrderList.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.deliveryOrderList.totalRow(data.totalElements);
                            viewModel.deliveryOrderList.totalPages(data.totalPages);
                            if (callback && typeof callback == "function") {
                                callback();
                            }
							viewModel.listTemplate.updateExtendData();
                        }
                    });
                },
                //删除
                del: function (data, rowId) {
                    viewModel.deliveryOrderList.setRowSelectbyRowId(rowId);
                    var rows = viewModel.deliveryOrderList.getSelectedRows();
                    var ids = [];
                    ids.push(rows[0].getValue("id"));
                    var checkData = {
                        ids: ids.join(","),
                        orderEvent: "delete"
                    }
                    viewModel.checkDelivery(checkData, function () {
                        common.dialog.confirmDialog({
                            msg1: "确认删除这些项？",
                            msg2: "此操作不可逆",
                            width: "400px",
                            type: "error",
                            onOk: function () {
                                $._ajax({
                                    url: appCtx + viewModel.baseurl + "/delete-delivery",
                                    type: "post",
                                    data: {
                                        id: ids.join(",")
                                    },
                                    success: function (data) {
                                        viewModel.deliveryOrderList.removeRows(rows);
                                    }
                                });
                            }
                        });
                    })
                },

                //清空搜索条件
                cleanSearch: function () {
                    viewModel.searchcomp.clearSearch();
                },
                //页码改变时的回调函数
                pageChange: function (index) {
                    viewModel.deliveryOrderList.pageIndex(index);
                    viewModel.search();
                },
                //页码改变时的回调函数
                sizeChange: function (size) {
                    viewModel.deliveryOrderList.pageSize(size);
                    viewModel.search(true);
                },
                //清空参照搜索条件
                cleanSearchRefer: function () {
                    viewModel.searchcomp2.clearSearch();
                },
                //页码改变时的回调函数
                pageChangeRefer1: function (index) {
                    viewModel.referSaleOrderItemsList.pageIndex(index);
                    viewModel.searchRefer();
                },
                //页码改变时的回调函数
                sizeChangeRefer1: function (size) {
                    viewModel.referSaleOrderItemsList.pageSize(size);
                    viewModel.searchRefer(true);
                },
                //进入修改单据页
                showEditBillPanel: function (index, rowId) {
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                    viewModel.goBillPanel(
                        function (index, rowId) {
                            return function () {
                                viewModel.fromRefer = false;
                                var row;
                                if (index == -1) {
                                    row = viewModel.deliveryOrderList.getFocusRow();
                                    index = 0;
                                } else {
                                    row = viewModel.deliveryOrderList.getRowByRowId(rowId);
                                }
                                var id = row.getValue("id");
                                viewModel.findByParentid(id, function(data) {
                                    data.deliveryOrderItems.forEach(function(item) {
                                        item.receiverAddress = item.customerAddressId;
                                    })
                                    viewModel.deliveryOrderCard.setSimpleData(data);
                                    viewModel.deliveryOrderItemsList.setSimpleData(data.deliveryOrderItems);
                                    viewModel.deliveryOrderItemBomsList.setSimpleData(data.deliveryOrderItemBoms);
                                    viewModel.editTemplate.updateExtendData();
                                });
                                viewModel.editEventListener();
                            }
                        }(index, rowId)
                    );
                },
                editEventListener: function () {
                    //发货单修改数量时
                    viewModel.deliveryOrderItemsList.on("orderNum.valuechange", function (obj) {
                        var currRow = viewModel.deliveryOrderItemsList.getRowByRowId(
                            obj.rowId
                        );
                        // 计算商品行主数量、金额
                        var rate = parseFloat(currRow.getValue("conversionRate") || "1");
                        var mainNum = parseFloat(obj.newValue) * rate || "";
                        var netWeight = parseFloat(currRow.getValue("netWeight") || 0),
                            weight = parseFloat(currRow.getValue("weight") || 0),
                            volume = parseFloat(currRow.getValue("volume") || 0);
                        var rowVolume = volume * mainNum,
                            rowWeight = weight * mainNum,
                            rowNetWeight = netWeight * mainNum;
                        var dealAmount = mainNum * parseFloat(currRow.getValue("dealPrice") || "0") || 0;
                        currRow.setValue("mainNum", mainNum);
                        currRow.setValue("dealAmount", dealAmount);
                        currRow.setValue("rowNetWeight", rowNetWeight);
                        currRow.setValue("rowVolume", rowVolume);
                        currRow.setValue("rowWeight", rowWeight);
                        // 计算合计金额、合计数量
                        var arr = viewModel.deliveryOrderItemsList.getSimpleData();
                        var totalAmount = 0,
                            totalNum = 0,
                            totalNetWeight = 0,
                            totalVolume = 0,
                            totalWeight = 0;
                        for (var i = 0; i < arr.length; i++) {
                            if (parseInt(arr[i].isGift) != 1) {
                                totalAmount += parseFloat(arr[i].dealAmount);
                            }
                            totalNum += parseFloat(arr[i].mainNum || 0);
                            totalNetWeight += parseFloat(arr[i].rowNetWeight || 0);
                            totalVolume += parseFloat(arr[i].rowVolume || 0);
                            totalWeight += parseFloat(arr[i].rowWeight || 0);
                        }
                        viewModel.deliveryOrderCard.getCurrentRow().setValue("totalNum", totalNum);
                        viewModel.deliveryOrderCard.getCurrentRow().setValue("totalAmount", totalAmount);
                        viewModel.deliveryOrderCard.getCurrentRow().setValue("totalNetWeight", totalNetWeight);
                        viewModel.deliveryOrderCard.getCurrentRow().setValue("totalVolume", totalVolume);
                        viewModel.deliveryOrderCard.getCurrentRow().setValue("totalWeight", totalWeight);
                        //联动bom数量
                        var parentGoodsId = currRow.getValue("goodsId");
                        var parentRowNum = currRow.getValue("rowNum");

                        //获取全部bom信息
                        var bomdata = viewModel.deliveryOrderItemBomsList.getSimpleData();
                        for (var i = 0; i < bomdata.length; i++) {
                            var allrows = viewModel.deliveryOrderItemBomsList.getAllRealRows();
                            if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                                var bomOrderNum = bomdata[i].childGoodsQty * obj.newValue,
                                    bomMainNum = bomOrderNum * (bomdata[i].conversionRate || 1),
                                    bomNetWeight = bomOrderNum * (bomdata[i].netWeight || 0),
                                    bomWeight = bomOrderNum * (bomdata[i].weight || 0),
                                    bomVolume = bomOrderNum * (bomdata[i].volume || 0),
                                    bomDealAmount = bomMainNum * parseFloat(bomdata.dealPrice || "0") || 0;
                                allrows[i].setValue("mainNum", bomMainNum);
                                allrows[i].setValue("orderNum", bomOrderNum);
                                allrows[i].setValue("dealAmount", bomDealAmount);
                                allrows[i].setValue("rowNetWeight", bomNetWeight);
                                allrows[i].setValue("rowVolume", bomVolume);
                                allrows[i].setValue("rowWeight", bomWeight);
                            } else {
                                if (allrows[i] && allrows[i].getValue("goodsId") === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                                    var amount = obj.newValue,
                                        bomNetWeight = parseFloat(allrows[i].getValue("netWeight") || 0),
                                        bomWeight = parseFloat(allrows[i].getValue("weight") || 0),
                                        bomVolume = parseFloat(allrows[i].getValue("volume") || 0);
                                    allrows[i].setValue("mainNum", amount * rate);
                                    allrows[i].setValue("orderNum", amount);
                                    allrows[i].setValue("dealAmount", dealAmount);
                                    allrows[i].setValue("rowNetWeight", amount * bomNetWeight);
                                    allrows[i].setValue("rowVolume", amount * bomVolume);
                                    allrows[i].setValue("rowNetWeight", amount * bomWeight);
                                }
                            }
                        }
                    });
                },
                // 查看审批信息
                showApprovalInfo: function (index, rowId) {
                    var row;
                    if (index == -1) {
                        row = viewModel.deliveryOrderList.getFocusRow();
                        index = 0;
                    } else {
                        row = viewModel.deliveryOrderList.getRowByRowId(rowId);
                    }
                    viewModel.detail();
                    console.log(row.getValue("id"));
                },
                // 查询子表数据
                findByParentid: function (id, callback) {
                    viewModel.deliveryOrderItemsList.removeAllRows();
                    viewModel.deliveryOrderItemBomsList.removeAllRows();
                    $._ajax({
                        url: appCtx + viewModel.baseurl + "/detail",
                        type: "get",
                        async: false,
                        data: { id: id },
                        success: function (data) {
                            if (callback && typeof callback == "function") {
                                callback(data)
                            } else {
                                viewModel.deliveryOrderItemsList.setSimpleData(
                                    data.deliveryOrderItems
                                );
                                viewModel.deliveryOrderItemBomsList.setSimpleData(
                                    data.deliveryOrderItemBoms
                                );
                            }
                        }
                    });
                },
                detail: function () {
                    setTimeout(function () {
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                        viewModel.goDetailPanel(
                            function () {
                                viewModel.showDetailBillPanelCallBackail();
                            }
                        );
                    })
                },
                showDetailBillPanelCallBackail: function () {
                    var curRow = viewModel.deliveryOrderList.getCurrentRow();
                    var id = curRow.getValue("id");
				    viewModel.isBomPanel(true);
                    var orderStatusCode = curRow.getValue("orderStatusCode")
                    viewModel.findByParentid(id, function (data) {
                        if (orderStatusCode != '01') {
                            $(".ui-operate-btn .delivery-edit-show").hide()
                        }
                        data.deliveryOrderItems.forEach(function(item) {
                            item.receiverAddress = item.customerAddressId;
                        })
                        viewModel.deliveryOrderDetailCard.setSimpleData(data);
                        viewModel.deliveryOrderItemsList.setSimpleData(data.deliveryOrderItems);
                        viewModel.deliveryOrderItemBomsList.setSimpleData(data.deliveryOrderItemBoms);
                        viewModel.detailTemplate.updateExtendData();
                        viewModel.initBPMFromBill(id, viewModel);
                    });
                },
                detail2bill: function () {
                    var id = viewModel.deliveryOrderDetailCard.getValue("id");
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                    viewModel.deliveryOrderItemsList.removeAllRows();
                    viewModel.deliveryOrderItemBomsList.removeAllRows();
                    viewModel.goBillPanel(
                        function (id) {
                            return function () {
                                viewModel.fromRefer = false;
                                viewModel.findByParentid(id, function(data) {
                                    data.deliveryOrderItems.forEach(function(item) {
                                        item.receiverAddress = item.customerAddressId;
                                    })
                                    viewModel.deliveryOrderCard.setSimpleData(data);
                                    viewModel.deliveryOrderItemsList.setSimpleData(data.deliveryOrderItems);
                                    viewModel.deliveryOrderItemBomsList.setSimpleData(data.deliveryOrderItemBoms);
                                });
                                viewModel.editEventListener();
                            }
                        }(id)
                    );
                },
                //保存单据
                saveBill: function () {
                    var validate = $(".ui-bill-panel")[0];

                    var result = app.compsValidateMultiParam({
                        element: validate,
                        showMsg: true
                    });
                    if (!result.passed) {
                        toastr.warning("必填项不能为空");
                        return;
                    }
                    var deliveryData = viewModel.deliveryOrderCard.getCurrentRow().getSimpleData();

                    var deliveryItemsData = common.dynamicTemplate.extendDatas(viewModel.deliveryOrderItemsList.getSimpleData());
                    var deliveryItemBomsData = common.dynamicTemplate.extendDatas(viewModel.deliveryOrderItemBomsList.getSimpleData());
                    var temperrmsg = "";
                    for (var i = 0; i < deliveryItemsData.length; i++) {
                        if (!deliveryItemsData[i].orderNum || deliveryItemsData[i].orderNum < 0) {
                            var temperrmsg = "<span style='color:red'>商品编码：" + deliveryItemsData[i].goodsCode + " 的数量必须大于0</span> ";
                            i = deliveryItemsData.length;
                        }
                    }
                    if (temperrmsg) {
                        toastr.warning(temperrmsg)
                        return;
                    }

                    var url = "/update-delivery";
                    var status = 'upd';
                    if (viewModel.fromRefer) {
                        url = "/create-delivery";
                        status = 'new';
                    }
                    deliveryData.persistStatus = status;
                    deliveryItemsData.forEach(function (item) {
                        item.persistStatus = status;
                    })
                    deliveryItemBomsData.forEach(function (itemBom) {
                        itemBom.persistStatus = status;
                    });
                    deliveryData.deliveryOrderItems = deliveryItemsData;
                    deliveryData.deliveryOrderItemBoms = deliveryItemBomsData;

                    $._ajax({
                        url: appCtx + viewModel.baseurl + "/check-create-delivery",
                        type: "post",
                        data: JSON.stringify(deliveryData),
                        contentType: "application/json; charset=utf-8",
                        success: function (resp) {
                            viewModel.creditCheck = resp.credit;	// 信用
                            viewModel.stock = resp.stock;	// 可用量
                            if (viewModel.stock && viewModel.stock.length > 0) {
                                $("#checkOk2")[0].innerHTML = "下一步";
                            } else if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
                                $("#checkOk2")[0].innerHTML = "保存";
                            }
                            if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
                                checkCredit()
                            } else if (viewModel.stock && viewModel.stock.length > 0) {
                                checkStock()
                            } else {
                                save();
                            }

                            //保存时信用弹框
                            function checkCredit() {
                                var creditCheck = viewModel.creditCheck;
                                if (!viewModel.dialogSaveBilldialog2 && creditCheck != undefined && creditCheck.length > 0) {
                                    viewModel.dialogSaveBilldialog2 = u.dialog({
                                        id: "dialog_save_bill2",
                                        content: "#dialog_save_bill2",
                                        hasCloseMenu: true,
                                        width: "1000px"
                                    });
                                } else {
                                    viewModel.dialogSaveBilldialog2.show();
                                }
                                viewModel.saveCheckCreditDetailItems.setSimpleData(creditCheck)
                                var okButton2 = $("#dialog_save_bill2 .J-ok");
                                okButton2.off().on("click", function () {
                                    viewModel.dialogSaveBilldialog2.close();
                                    if (viewModel.stock && viewModel.stock.length > 0) {
                                        checkStock()
                                    } else {
                                        save();
                                    }
                                })
                                var cancelButton2 = $("#dialog_save_bill2 .J-cancel");
                                cancelButton2.off().on("click", function () {
                                    viewModel.dialogSaveBilldialog2.close();
                                });
                                viewModel.dialogSaveBilldialog2.show();
                            }
                            function checkStock() {
                                var stock = viewModel.stock;
                                if (!viewModel.dialogSubmitBill) {
                                    viewModel.dialogSubmitBill = u.dialog({
                                        id: "dialog_submit_bill",
                                        content: "#dialog_submit_bill",
                                        hasCloseMenu: true,
                                        width: "800px"
                                    });
                                } else {
                                    viewModel.dialogSubmitBill.show();
                                }
                                var _A_P_unit = JSON.parse(localStorage.getItem('_A_P_unit'));
                                var temp = "<div style='padding-left: 20px'>" +
                                    stock.map(function (item) {
                                        var unitList = "",
                                        precision = 0;
                                        if (_A_P_unit && _A_P_unit.length > 0) {
                                            unitList = _A_P_unit.filter(function (r) {
                                                return r.unitId == item.unit;
                                            });
                                        }
                                        if (unitList && unitList.length > 0) {
                                            precision = unitList[0].precision;
                                        }
                                        var willAmount = new u.NumberFormater(precision).format(parseFloat(item.willAmount));
									    var avaAmount = new u.NumberFormater(precision).format(parseFloat(item.avaAmount));
                                        var html = "<div style='margin-top: 10px'>行号：" + item.rowNum + "，商品：" + item.goodsName + "可用量不足，本次需要 " + willAmount + "，当前可用 " + avaAmount + "</div>";
                                        return html
                                    }).join('') +
                                    "</div>";
                                $("#submit_stock")[0].innerHTML = temp;
                                var okButton = $("#dialog_submit_bill .J-ok");
                                okButton.off().on("click", function () {
                                    viewModel.dialogSubmitBill.close();
                                    save();
                                })
                                var cancelButton = $("#dialog_submit_bill .J-cancel");
                                cancelButton.off().on("click", function () {
                                    viewModel.dialogSubmitBill.close();
                                });
                            }
                        }
                    });
                    function save() {
                        $._ajax({
                            url: appCtx + viewModel.baseurl + url,
                            type: "post",
                            data: JSON.stringify(deliveryData),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                toastr.success("保存成功");
                                viewModel.retListPanel();
                                viewModel.search();
                            }
                        });
                    }
                },
                //匹配仓库
                resetdelivery: function () {
                    var validate = $(".ui-bill-panel")[0];

                    var result = app.compsValidateMultiParam({
                        element: validate,
                        showMsg: true
                    });
                    if (!result.passed) {
                        toastr.warning("必填项不能为空");
                        return;
                    }
                    var deliveryData = viewModel.deliveryOrderList
                        .getCurrentRow()
                        .getSimpleData();

                    var deliveryItemsData = viewModel.deliveryOrderItemsList.getSimpleData();
                    var deliveryItemBomsData = viewModel.deliveryOrderItemBomsList.getSimpleData();
                    deliveryData.deliveryOrderItems = deliveryItemsData;
                    deliveryData.deliveryOrderItemBoms = deliveryItemBomsData;
                    var url = "/match-warehouse";
                    $._ajax({
                        url: appCtx + viewModel.baseurl + url,
                        type: "post",
                        data: JSON.stringify(deliveryData),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            // 匹配之后只需要更新子表定的数据 
                            viewModel.deliveryOrderItemsList.setSimpleData(
                                data.deliveryOrderItems
                            );
                            viewModel.deliveryOrderItemBomsList.setSimpleData(
                                data.deliveryOrderItemBoms
                            );
                            viewModel.editTemplate.updateExtendData();
                        }
                    });
                },
                filterSelectedRows: function (selectedRows, orderStatusCode) {
                    var newSelectedRows = selectedRows;
                    if (orderStatusCode) {
                        newSelectedRows = selectedRows.filter(function (row) {
                            return row.getValue("orderStatusCode") == orderStatusCode;
                        });
                    }
                    var ids = newSelectedRows.map(function (row, index, arr) {
                        return row.getValue("id");
                    });
                    return ids;
                },
                //提交
                submitBtn: function () {
                    var selectedRows = viewModel.deliveryOrderList.getSelectedRows();
                    if (selectedRows.length < 1) {
                        toastr.warning("请选择一条操作的行");
                        return;
                    }
                    var ids = viewModel.filterSelectedRows(selectedRows, "01");
                    if (ids.length < 1) {
                        toastr.warning("待处理的发货单才能提交！");
                        return;
                    }
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/submit-delivery",
                        data: {
                            id: ids.join(",")
                        },
                        success: function (res) {
                            viewModel.search();
                        }
                    });
                },
                //收回
                backBtn: function () {
                    var selectedRows = viewModel.deliveryOrderList.getSelectedRows();
                    if (selectedRows.length < 1) {
                        toastr.warning("请选择一条操作的行");
                        return;
                    }
                    var ids = viewModel.filterSelectedRows(selectedRows, "02");
                    if (ids.length < 1) {
                        toastr.warning("已提交的发货单才能收回！");
                        return;
                    }
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/cancel-submit-delivery",
                        data: {
                            id: ids.join(",")
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                viewModel.search();
                            }
                        }
                    });
                },
                submitBillBpm: function (rows) {
                    var rows = viewModel.deliveryOrderList.getSelectedRows();
                    if (!rows || rows.length != 1) {
                        toastr.warning("请选择一项进行审批");
                        return;
                    }
                    var listCompId = "deliveryOrderList";
                    var billTypeCode = "DeliveryOrder";
                    var tranTypeCode = null;
                    var nodeJs = "/ocm-web/pages/b2b/deliveryorder/deliveryorder.js";
                    var id = rows[0].getValue("id");
                    var checkData = {
                        ids: id,
                        orderEvent: "commit"
                    }
                    viewModel.checkDelivery(checkData, function () {
                        viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, function () {
                            var selectIndex = [];
                            selectIndex.push(viewModel.deliveryOrderList.getSelectedIndex());
                            viewModel.search(false, function () {
                                setTimeout(function () {
                                    viewModel.deliveryOrderList.setRowsSelect(selectIndex);
                                }, 0)
                            });
                        });
                    })
                },
                // 收回申请单
                unsubmitBillList: function () {
                    var rows = viewModel.deliveryOrderList.getSelectedRows();
                    if (!rows || rows.length != 1) {
                        toastr.warning("请选择一项进行审批");
                        return;
                    }
                    var listCompId = "deliveryOrderList";
                    var billTypeCode = "DeliveryOrder";
                    var tranTypeCode = null;
                    var callback = null;
                    var id = rows[0].getValue("id");
                    var checkData = {
                        ids: id,
                        orderEvent: "cancelcommit"
                    }
                    viewModel.checkDelivery(checkData, function () {
                        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
                    })
                },
                approveBill: function () {
                    var listCompId = "deliveryOrderList";
                    var billTypeCode = "DeliveryOrder";
                    var tranTypeCode = "";
                    var withBpmCallback = function () {
                        viewModel.detail();
                    };
                    var rows = viewModel.deliveryOrderList.getSelectedRows();
                    if (!rows || rows.length != 1) {
                        toastr.warning("请选择一条数据进行审批");
                        return;
                    }
                    if (rows[0].getValue("orderStatusCode") == "04") {
                        toastr.warning("审批通过的数据不能重复审批");
                        return;
                    }
                    var id = rows[0].getValue("id");
                    var checkData = {
                        ids: id,
                        orderEvent: "approvepass"
                    }
                    viewModel.checkDelivery(checkData, function () {
                        viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback);
                    })
                },
                //弃审单据
                unapproveBill: function () {
                    var rows = viewModel.deliveryOrderList.getSelectedRows();
                    if (!rows || rows.length != 1) {
                        toastr.warning("请选择一项进行审批");
                        return;
                    }
                    var ids = viewModel.filterSelectedRows(rows, "04");
                    if (ids.length < 1) {
                        toastr.warning("只有审核通过的发货单才能取消审批！");
                        return;
                    }
                    var listCompId = "deliveryOrderList";
                    var billTypeCode = "DeliveryOrder";
                    var tranTypeCode = null;
                    var withBpmCallback = function () {
                        viewModel.detail();
                    };
                    var withoutBpmCallback = null;
                    var checkData = {
                        ids: ids.join(","),
                        orderEvent: "cancelapprove"
                    }
                    viewModel.checkDelivery(checkData, function () {
                        viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback, withoutBpmCallback, "/cancelApproveWithoutBpmToSubmit");
                    })
                },
                //审批
                approve: function () {
                    var rows = viewModel.deliveryOrderList.getSelectedRows();
                    if (!rows || rows.length != 1) {
                        toastr.warning("请选择一条数据进行审批");
                        return;
                    }
                    if (rows[0].getValue("orderStatusCode") == "04") {
                        toastr.warning("审批通过的数据不能重复审批");
                        return;
                    }
                    var id = rows[0].getValue("id");
                    var checkData = {
                        ids: id,
                        orderEvent: "approvepass"
                    }
                    viewModel.checkDelivery(checkData, function () {
                        approveSave(id)
                    })
                    function approveSave(id) {
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.baseurl + "/approve-delivery",
                            data: {
                                id: id,
                                approveOpinion: "审批通过"
                            },
                            success: function () {
                                viewModel.search();
                            }
                        });
                    }
                },
                //取消审核
                unapprove: function () {
                    var selectedRows = viewModel.deliveryOrderList.getSelectedRows();
                    if (selectedRows.length < 1) {
                        toastr.warning("请选择一条操作的行");
                        return;
                    }
                    var ids = viewModel.filterSelectedRows(selectedRows, "04");
                    if (ids.length < 1) {
                        toastr.warning("审核通过的发货单才能取消审批！");
                        return;
                    }
                    var checkData = {
                        ids: ids.join(","),
                        orderEvent: "cancelapprove"
                    }
                    viewModel.checkDelivery(checkData, function () {
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.baseurl + "/cancel-approve-delivery",
                            data: {
                                id: ids.join(",")
                            },
                            success: function () {
                                for (var i = 0; i < selectedRows.length; i++) {
                                    viewModel.search();
                                }
                            }
                        });
                    })

                },
                //保存并提交单据
                submitBill: function () {
                    var validate = $(".ui-bill-panel")[0];
                    var result = app.compsValidateMultiParam({
                        element: validate,
                        showMsg: true
                    });
                    if (!result.passed) {
                        return;
                    }
                    var curRow = viewModel.deliveryOrderList.getCurrentRow();
                    curRow.setValue("status", 2);
                    var deliveryData = curRow.getSimpleData();
                    var deliveryItemsData = viewModel.deliveryOrderItemsList.getSimpleData();
                    deliveryData.deliveryOrderItems = deliveryItemsData;
                    $._ajax({
                        url: appCtx + viewModel.baseurl + "/submit",
                        type: "POST",
                        data: JSON.stringify(deliveryData),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            var curRow = viewModel.deliveryOrderList.getFocusRow();
                            curRow.setSimpleData(data);
                            viewModel.retListPanel();
                        }
                    });
                },
                cancelBill: function () {
                    viewModel.search();
                    viewModel.retListPanel();
                    viewModel.removeAllreferRows();
                },
                removeAllreferRows: function () {
                    viewModel.referSaleOrderItemsList.removeAllRows();
                    viewModel.selectedreferListItems.removeAllRows();
                },
                //导入
                importHandle: function () {
                    var urlInfo = viewModel.baseurl + "/excelDataImport"; //倒入地址参数
                    var urlStatusInfo = viewModel.baseurl + "/excelLoadingStatus"; //请求进度地址参数
                    var ele = $("#importFiel")[0]; //挂载元素
                    common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
                },
                //导出
                exportHandle: function () {
                    var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                    var templateUrl = viewModel.baseurl + "/downloadExcelTemplate"; //导出模板地址参数
                    var excelDataUrl = viewModel.baseurl + "/excelDataExport"; //导出数据地址参数
                    var listData = viewModel.deliveryOrderList; //需要导出表格的dataTable
                    var ele = $("#exportFiel")[0]; //挂载元素
                    common.fileHandle.exportFile(
                        listData,
                        ele,
                        searchParams,
                        templateUrl,
                        excelDataUrl
                    );
                },
                // 返回列表页
                retListPanel: function () {
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
                    common.bill.retListPanel();
                    $(".ui-operate-btn .delivery-edit-show").show()
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)  新增参照
                searchRefer: function (reindex) {
                    if (reindex) {
                        viewModel.referSaleOrderItemsList.pageIndex(0);
                    }
                    viewModel.referSaleOrderItemsList.removeAllRows();
                    var queryData = viewModel.searchcomp2.getDataWithOpr ?
                        viewModel.searchcomp2.getDataWithOpr() : {};
                    if (!queryData["search_EQ_order.saleOrg"]) {
                        toastr.warning("销售组织不能为空");
                        return false;
                    }
                    var pageSize = viewModel.referSaleOrderItemsList.pageSize();
                    var pageNumber = viewModel.referSaleOrderItemsList.pageIndex();
                    queryData.page = pageNumber;
                    queryData.size = pageSize;
                    // queryData["receiveStorageOrgId"]=queryData.search_EQ_receiveStorageOrgId;
                    // queryData["receiveStorageId"]= queryData.search_EQ_receiveStorageId;
                    // queryData["supplierId"] = queryData.search_EQ_supplierId;
                    // queryData["applyDateStart"] = queryData.search_GTE_orderDate_date;
                    // queryData["applyDateEnd"] = queryData.search_LT_orderDate_date;
                    // queryData["otherOrderNum"]= queryData.search_LIKE_otherOrderNum;
                    // queryData["orderCode"]= queryData.search_LIKE_purchaseCode;
                    // for(var key in queryData){
                    //   if(/^search_/g.test(key)){
                    //     delete queryData[key];
                    //   }
                    // };
                    $._ajax({
                        type: "get",
                        url: window.pathMap.b2b + "/b2b/order-arrange/page",
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.referSaleOrderItemsList.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.referSaleOrderItemsList.totalRow(data.totalElements);
                            viewModel.referSaleOrderItemsList.totalPages(data.totalPages);
                            // viewModel.updateSelectedIndices();
                            // //重置listIndex
                            // viewModel.listIndex = null;
                            var ids = [];
                            var items = viewModel.referSaleOrderItemsList.getSimpleData();
                            for (var i = 0; i < items.length; i++) {
                                ids.push(items[i].id);
                            };
                            if (ids.length > 0) {
                                $._ajax({
                                    type: "post",
                                    url: appCtx + viewModel.itemBomurl + "/find-order-item-boms-by-order-item-ids",
                                    data: {
                                        ids: ids.join(",")
                                    },
                                    success: function (data) {
                                        viewModel.referSaleOrderItemBomsList.setSimpleData(data);
                                    }
                                });
                            }
                        }
                    });
                },
                //新增 参照
                showAddRefer: function () {
                    viewModel.searchcomp2.clearSearch();
                    viewModel.removeAllreferRows();
                    viewModel.referSaleOrderItemBomsList.removeAllRows();
                    viewModel.selectedreferListItemBoms.removeAllRows();
                    $("#search_customer").attr("placeholder", "请先选择销售组织");
                    if (!viewModel.referSaleOrderDialog) {
                        viewModel.referSaleOrderDialog = u.dialog({
                            id: "dialog_referpurchaseorder",
                            content: "#dialog_referpurchaseorder",
                            hasCloseMenu: true,
                            width: "95%"
                        });
                        var closefunc = function () {
                            viewModel.referSaleOrderItemsList.removeAllRows();
                            viewModel.referSaleOrderDialog.close();
                        };
                        var cancelButton = $("#dialog_referpurchaseorder .J-cancel");
                        var closeButton = $("#dialog_referpurchaseorder .u-msg-close");
                        cancelButton.off().on("click", closefunc);
                        closeButton.off().on("click", closefunc);
                    } else {
                        viewModel.referSaleOrderDialog.show();
                    }
                },
                //选择销售订单商品信息
                referSelectItemHandle: function (obj) {
                    var id = obj.rowObj.value.id;
                    //判断是否已选
                    var hasSelected = false;
                    var selectedreferItems = viewModel.selectedreferListItems.getSimpleData();
                    if (selectedreferItems) {
                        for (var i = 0; i < selectedreferItems.length; i++) {
                            if (selectedreferItems[i].id === id) {
                                hasSelected = true;
                            }
                        }
                    }
                    if (!hasSelected) {
                        var selectedRows = viewModel.referSaleOrderItemsList.getSelectedRows();
                        for (var i = 0; i < selectedRows.length; i++) {
                            var itemInfo = selectedRows[i].getSimpleData();
                            if (selectedRows[i].getValue("id") === id) {
                                viewModel.selectedreferListItems.addSimpleData(itemInfo);
                                $._ajax({
                                    type: "post",
                                    url: appCtx + viewModel.itemBomurl + "/find-order-item-bom-and-existing-num-by-order-item-ids",
                                    data: {
                                        ids: itemInfo.id
                                    },
                                    success: function (data) {
                                        for (var i = 0; i < data.length; i++) {
                                            data[i].orderNum = 0;
                                            data[i].mainNum = 0;
                                            data[i].dealAmount = 0;
                                        }
                                        viewModel.selectedreferListItemBoms.addSimpleData(data);
                                    }
                                });
                            }
                        }
                    }
                },
                referUnSelectItemHandle: function (obj) {
                    var id = obj.rowObj.value.id;
                    var itemrows = viewModel.selectedreferListItems.getAllRows();
                    for (var i = itemrows.length - 1; i >= 0; i--) {
                        if (itemrows[i].getValue("id") === id) {
                            var goodsId = itemrows[i].getValue("goodsId");
                            var parentRowNum = itemrows[i].getValue("rowNum");
                            viewModel.selectedreferListItems.removeRows([i], {
                                forceDel: true
                            });
                            var selectedBoms = viewModel.selectedreferListItemBoms.getAllRealRows();

                            for (var i = selectedBoms.length - 1; i >= 0; i--) {
                                if (selectedBoms[i].getValue("parentGoodsId") === goodsId && selectedBoms[i].getValue("parentRowNum") == parentRowNum) {
                                    viewModel.selectedreferListItemBoms.removeRows(selectedBoms[i], {
                                        forceDel: true
                                    });
                                }
                            }
                        }
                    }
                },

                queryChildArr: function (itemArr) {
                    var deliveryOrderDto = {};
                    $._ajax({
                        type: "post",
                        url: window.pathMap.b2b + "/b2b/order-arrange/trans-to-delivery",
                        async: false,
                        data: JSON.stringify(itemArr),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            data.deliveryOrderItems.forEach(function(item) {
                                item.receiverAddress = item.addressId
                            });
                            deliveryOrderDto = data;
                        }
                    });
                    return deliveryOrderDto;
                },
                referToEdit: function (itemArr) {
                    viewModel.fromRefer = true;
                    var date = new Date();
                    var year = date.getFullYear(); //获取完整的年份(4位,1970-????)
                    var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
                    var day = date.getDate(); //获取当前日(1-31)
                    var curRow = viewModel.deliveryOrderCard.createEmptyRow();
                    curRow.setSimpleData(itemArr);
                    curRow.setValue("deliveryOrderDate", year + "-" + month + "-" + day);
                    curRow.setValue("orderStatusCode", '01');
                    curRow.setValue("deliveryOperater", $.cookie('_A_P_userLoginName'));

                    // 计算合计金额、合计数量
                    // var itemArr = viewModel.deliveryOrderItemsList.getSimpleData();
                    /*  var totalAmount = 0;
                     var totalNum = 0;
                     for (var i = 0; i < itemArr.deliveryOrderItems.length; i++) {
                         var itemMainNum = parseFloat(itemArr.deliveryOrderItems[i].orderNum) * (itemArr.deliveryOrderItems[i].conversionRate || 1);
                         itemArr.deliveryOrderItems[i].mainNum = itemMainNum;
                         totalNum += parseFloat(itemMainNum || 0);
                         if (parseInt(itemArr.deliveryOrderItems[i].isGift) != 1) {
                             totalAmount += parseFloat(itemArr.deliveryOrderItems[i].dealAmount);
                         }
                     }
                     viewModel.deliveryOrderList.getCurrentRow().setValue("totalNum", totalNum);
                     viewModel.deliveryOrderList.getCurrentRow().setValue("totalAmount", totalAmount); */


                    viewModel.deliveryOrderItemsList.removeAllRows();
                    viewModel.deliveryOrderItemBomsList.removeAllRows();
                    viewModel.deliveryOrderItemsList.setSimpleData(
                        itemArr.deliveryOrderItems
                    );
                    viewModel.deliveryOrderItemBomsList.setSimpleData(
                        itemArr.deliveryOrderItemBoms
                    );
                   setTimeout(function() {
                        var allRows = viewModel.deliveryOrderItemsList.getAllRealRows();
                        // 重新计算bom数量
                        allRows.map(function (item) {
                            var orderNum = item.getValue("orderNum");
                            item.setValue("orderNum", "0.1");
                            item.setValue("orderNum", orderNum);
                        });
					    viewModel.editTemplate.updateExtendData();
                   }, 100)
                },
                //确定 新增
                confirmReferSaleOrder: function () {
                    var itemArr = viewModel.selectedreferListItems.getSimpleData();
                    if (!itemArr.length) {
                        toastr.warning("请至少选择一条商品");
                        return;
                    }
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                    viewModel.goBillPanel(
                        function () {
                            var deliveryOrderDto = viewModel.queryChildArr(itemArr);
                            viewModel.referToEdit(deliveryOrderDto);
                            viewModel.editEventListener();
                        }
                    );
                    viewModel.referSaleOrderDialog.close();
                },
                //页签点击
                itemFun: function () {
                    $('#tab-panel-7').show();
                    $('#tab-panel-8').hide();
                },
                itemEditFun: function () {
                    $('#tab-panel-9').show();
                    $('#tab-panel-10').hide();
                },
                itemEditBomFun: function () {
                    $('#tab-panel-10').show();
                    $('#tab-panel-9').hide();
                },
                itemBomFun: function () {
                    $('#tab-panel-7').hide();
                    $('#tab-panel-8').show();
                },
                choiceFun: function () {
                    $('#tab-panel-1-ref').show();
                    $('#panel-tab1-ref').addClass("tab-active");
                    $('#panel-tab2-ref').removeClass("tab-active");
                    $('#tab-panel-2-ref').hide();
                    $("#panel-tab3").trigger("click");
                },
                selectedsFun: function () {
                    $('#tab-panel-1-ref').hide();
                    $('#tab-panel-2-ref').show();
                    $('#panel-tab2-ref').addClass("tab-active");
                    $('#panel-tab1-ref').removeClass("tab-active");
                    $('#tab-panel-5').show().css("display", "block");
                    $('#tab-panel-6').show().css("display", "none");
                },
                getGoodsFun: function () {
                    $('#tab-panel-3').show();
                    $('#tab-panel-4').hide();
                    $('#panel-tab3').addClass("tab-active");
                    $('#panel-tab4').removeClass("tab-active");
                },
                getBomFun: function () {
                    $('#tab-panel-3').hide();
                    $('#tab-panel-4').show();
                    $('#panel-tab4').addClass("tab-active");
                    $('#panel-tab3').removeClass("tab-active");

                },
                getSelectGoodsFun: function () {
                    $('#tab-panel-5').show();
                    $('#tab-panel-6').hide();
                    $('#panel-tab5').addClass("tab-active");
                    $('#panel-tab6').removeClass("tab-active");
                },
                getSelectBomFun: function () {
                    $('#tab-panel-5').hide();
                    $('#tab-panel-6').show();
                    $('#panel-tab6').addClass("tab-active");
                    $('#panel-tab5').removeClass("tab-active");

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
                goodsOptDetailsFun: function (obj) {
                    /**
                     * @example 查看选配common.goodsOptional.OptionalDetails()
                     * @param viewModel 当前viewModel, 用来挂载dialog
                     * @param title     弹窗title
                     * @param goodsId   商品行Id
                     * @param el        dialog id (不加 ‘#’)
                     */
                    var data = viewModel.deliveryOrderItemsList.getSimpleData()[obj],
                        id = data.goodsId,
                        baseGoodsOptId = data.baseGoodsOptId ? data.baseGoodsOptId : "";

                    common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, baseGoodsOptId, 'dialog_goodsOptDetails', viewModel.deliveryOrderItemsList, viewModel.deliveryOrderItemBomsList);
                },
                deliveryOrderItemsListOnBeforeEditFun: function (obj) {
                    var gridObj = obj.gridObj;

                    if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))) {
                        var row = obj.rowObj.value;
                        var enableBatchNoManage = row.enableBatchNoManage;
                        var grid = viewModel.app.getComp("grid_delivery_item_edit").grid;
                        var batchCodeIdOpt = grid.getColumnByField("batchCodeId");
                        if (enableBatchNoManage) {
                            if (enableBatchNoManage == '1') {
                                batchCodeIdOpt.options.editable = true;
                                viewModel.deliveryOrderItemsList.setMeta("batchCodeId", "refparam", '{"EQ_goods":"' + row.goodsId + '", "EQ_isEnable":"1"}');
                                return true;
                            } else {
                                batchCodeIdOpt.options.editable = false;
                                toastr.warning("该商品未开启批号控制")
                                return false
                            }
                        } else {
                            $._ajax({
                                url: '/occ-base/api/base/goods/' + row.goodsId,
                                type: "get",
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    enableBatchNoManage = data.enableBatchNoManage;
                                    if (enableBatchNoManage == '1') {
                                        batchCodeIdOpt.options.editable = true;
                                        viewModel.deliveryOrderItemsList.setMeta("batchCodeId", "refparam", '{"EQ_goods":"' + row.goodsId + '", "EQ_isEnable":"1"}');
                                        return true;
                                    } else {
                                        batchCodeIdOpt.options.editable = false;
                                        toastr.warning("该商品未开启批号控制")
                                        return false
                                    }
                                }
                            })
                        }
                    }
                    // 编辑新增发货仓库受发货组织条件限制
                    if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("deliveryWarehouseId"))) {
                        var row = obj.rowObj.value;
                        var deliveryInvOrgId = row.deliveryInvOrgId;
                        if (deliveryInvOrgId) {
                            viewModel.deliveryOrderItemsList.setMeta("deliveryWarehouseId", "refparam", '{"EQ_inventoryOrg.id":"' + deliveryInvOrgId + '", "EQ_isEnable":"1"}');
                        }
                    }
                    return true;
                },

                //新增发货单时 仓库参照添加条件
                beforeEditCheck2: function (obj) {
                    var gridObj = obj.gridObj;
                    // 编辑新增发货仓库受发货组织条件限制
                    if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("deliveryWarehouseId"))) {
                        var row = obj.rowObj.value;
                        var deliveryInvOrgId = row.deliveryInvOrgId;
                        if (deliveryInvOrgId) {
                            viewModel.selectedreferListItems.setMeta("deliveryWarehouseId", "refparam", '{"EQ_inventoryOrg.id":"' + deliveryInvOrgId + '", "EQ_isEnable":"1"}');
                        }
                    }
                    return true;
                },
                // 整单关闭订单
                closeOrderBillPanel: function () {
                    var rows = viewModel.deliveryOrderList.getSelectedRows();
                    if (rows && rows.length > 0) {
                        var erro = false;
                        var orderCode = "";
                        var ids = [];
                        for (var i = 0; i < rows.length; i++) {
                            var orderStatusCode = rows[i].getValue("orderStatusCode");
                            if (orderStatusCode == "06" || orderStatusCode == "07" || orderStatusCode == "04") {

                            } else {
                                erro = true;
                                orderCode += rows[i].getValue("deliveryOrderCode") + '、';
                            }
                            ids.push(rows[i].getValue("id"));
                        }
                        if (erro) {
                            toastr.warning("单据号为：" + orderCode.substr(0, orderCode.length - 1) + " 的订单不是审批通过状态、出库状态，不能关闭");
                            return;
                        }
                        var checkData = {
                            ids: ids.join(','),
                            orderEvent: "close"
                        }
                        viewModel.checkDelivery(checkData, function () {
                            viewModel.batch_ajax("/close", ids.join(','), "打开");
                        })
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                // 整单打开订单
                openOrderBillPanel: function () {
                    var rows = viewModel.deliveryOrderList.getSelectedRows();
                    if (rows && rows.length > 0) {
                        var erro = false;
                        var orderCode = "";
                        var ids = [];

                        for (var i = 0; i < rows.length; i++) {
                            var isClose = rows[i].getValue("isClose");
                            if (isClose != 1) {
                                erro = true;
                                orderCode += rows[i].getValue("deliveryOrderCode") + '、';
                            } else {
                                ids.push(rows[i].getValue("id"));
                            }
                        }
                        if (erro) {
                            toastr.warning("单据号为：" + orderCode.substr(0, orderCode.length - 1) + " 的订单不是关闭状态，不能打开");
                            return;
                        }
                        var checkData = {
                            ids: ids.join(','),
                            orderEvent: "open"
                        }
                        viewModel.checkDelivery(checkData, function () {
                            viewModel.batch_ajax("/open", ids.join(','), "打开");
                        })
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                // 行关闭
                close_row: function () {
                    var rows = viewModel.deliveryOrderItemsList.getSelectedRows();
                    if (rows && rows.length > 0) {
                        var orderStatusCode = viewModel.deliveryOrderList.getValue("orderStatusCode");
                        if (orderStatusCode == "06" || orderStatusCode == "07" || orderStatusCode == "04") {
                            var ids = [];
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].getValue("id"));
                            }
                            var checkData = {
                                ids: viewModel.deliveryOrderList.getValue("id"),
                                rowIds: ids.join(','),
                                orderEvent: "rowclose"
                            }
                            viewModel.checkDelivery(checkData, function () {
                                viewModel.item_rows_ajax("/close-row", ids.join(','), function (data) {
                                    rows.forEach(function (item) {
                                        item.setValue('isClose', 1);
                                    })
                                });
                            })
                        } else {
                            toastr.warning("单据号为：" + viewModel.deliveryOrderList.getValue("deliveryOrderCode") + " 的订单不是审批通过状态、出库状态，不能关闭");
                            return;
                        }
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                // 行打开
                open_row: function () {
                    var rows = viewModel.deliveryOrderItemsList.getSelectedRows();
                    if (rows && rows.length > 0) {
                        var orderStatusCode = viewModel.deliveryOrderList.getValue("orderStatusCode");
                        if (orderStatusCode == "06" || orderStatusCode == "07" || orderStatusCode == "04") {
                            var ids = [];
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].getValue("id"));
                            }
                            var checkData = {
                                ids: viewModel.deliveryOrderList.getValue("id"),
                                rowIds: ids.join(','),
                                orderEvent: "rowopen"
                            }
                            viewModel.checkDelivery(checkData, function () {
                                viewModel.item_rows_ajax("/open-row", ids.join(','), function (data) {
                                    rows.forEach(function (item) {
                                        item.setValue('isClose', 0);
                                    })
                                });
                            })
                        } else {
                            toastr.warning("单据号为：" + viewModel.deliveryOrderList.getValue("deliveryOrderCode") + " 的订单不是审批通过状态、出库状态，不能打开");
                            return;
                        }
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                item_rows_ajax: function (url, ids, callback) {
                    $._ajax({
                        url: appCtx + viewModel.baseurl + url,
                        type: "post",
                        data: {
                            itemIds: ids,
                            orderId: viewModel.deliveryOrderList.getCurrentRow().getValue('id')
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
                batch_ajax: function (url, ids, remark, callback) {
                    $._ajax({
                        url: appCtx + viewModel.baseurl + url,
                        type: "post",
                        data: {
                            ids: ids,
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
                                toastr.success("操作成功");
                                viewModel.search();
                            }
                        }
                    });
                },
                // 检验前事件
                checkDelivery: function (checkData, callback) {
                    checkData = checkData ? checkData : {};
                    $._ajax({
                        url: appCtx + viewModel.baseurl + "/check-delivery",
                        type: "GET",
                        data: checkData,
                        success: function (resp) {
                            viewModel.creditCheck = resp.credit;	// 信用
                            viewModel.stock = resp.stock;	// 可用量
                            if (viewModel.stock && viewModel.stock.length > 0) {
                                $("#checkOk2")[0].innerHTML = "下一步";
                            } else if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
                                $("#checkOk2")[0].innerHTML = "保存";
                            }
                            if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
                                checkCredit()
                            } else if (viewModel.stock && viewModel.stock.length > 0) {
                                checkStock()
                            } else {
                                callback(checkData)
                            }
                            //保存时信用弹框
                            function checkCredit() {
                                var creditCheck = viewModel.creditCheck;
                                if (!viewModel.dialogSaveBilldialog2 && creditCheck != undefined && creditCheck.length > 0) {
                                    viewModel.dialogSaveBilldialog2 = u.dialog({
                                        id: "dialog_save_bill2",
                                        content: "#dialog_save_bill2",
                                        hasCloseMenu: true,
                                        width: "1000px"
                                    });
                                } else {
                                    viewModel.dialogSaveBilldialog2.show();
                                }
                                viewModel.saveCheckCreditDetailItems.setSimpleData(creditCheck)
                                var okButton2 = $("#dialog_save_bill2 .J-ok");
                                okButton2.off().on("click", function () {
                                    viewModel.dialogSaveBilldialog2.close();
                                    if (viewModel.stock && viewModel.stock.length > 0) {
                                        checkStock()
                                    } else {
                                        callback(checkData)
                                    }
                                })
                                var cancelButton2 = $("#dialog_save_bill2 .J-cancel");
                                cancelButton2.off().on("click", function () {
                                    viewModel.dialogSaveBilldialog2.close();
                                });
                                viewModel.dialogSaveBilldialog2.show();
                            }
                            function checkStock() {
                                var stock = viewModel.stock;
                                if (!viewModel.dialogSubmitBill) {
                                    viewModel.dialogSubmitBill = u.dialog({
                                        id: "dialog_submit_bill",
                                        content: "#dialog_submit_bill",
                                        hasCloseMenu: true,
                                        width: "800px"
                                    });
                                } else {
                                    viewModel.dialogSubmitBill.show();
                                }
                                var _A_P_unit = JSON.parse(localStorage.getItem('_A_P_unit'));
                                var temp = "<div style='padding-left: 20px'>" +
                                    stock.map(function (item) {
                                        var unitList = "",
                                        precision = 0;
                                        if (_A_P_unit && _A_P_unit.length > 0) {
                                            unitList = _A_P_unit.filter(function (r) {
                                                return r.unitId == item.unit;
                                            });
                                        }
                                        if (unitList && unitList.length > 0) {
                                            precision = unitList[0].precision;
                                        }
                                        var willAmount = new u.NumberFormater(precision).format(parseFloat(item.willAmount));
									    var avaAmount = new u.NumberFormater(precision).format(parseFloat(item.avaAmount));
                                        var html = "<div style='margin-top: 10px'>商品：" + item.goodsName + "可用量不足，本次需要 " + willAmount + "，当前可用 " + avaAmount + "</div>";
                                        return html
                                    }).join('') +
                                    "</div>";
                                $("#submit_stock")[0].innerHTML = temp;
                                var okButton = $("#dialog_submit_bill .J-ok");
                                okButton.off().on("click", function () {
                                    viewModel.dialogSubmitBill.close();
                                    callback(checkData)
                                })
                                var cancelButton = $("#dialog_submit_bill .J-cancel");
                                cancelButton.off().on("click", function () {
                                    viewModel.dialogSubmitBill.close();
                                });
                            }
                        }
                    });
                }

            },

            afterCreate: function () {
                // 初始化折叠面板
                $.fn.collapsepanel(false, true);

                //获取发货单状态枚举
                $._ajax({
                    type: "get",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                    data: {
                        cust_doc_code_batch: "QY134"
                    },
                    success: function (data) {
                        var combodata = common.dataconvert.toMap(data["QY134"], "name", "code");
                        viewModel.orderStatusDataSource(combodata);
                    }
                });
                // 拉单时，输入本次安排数量时,校验本次安排数量<=订货数量 - 已安排数量/换算率
                viewModel.selectedreferListItems.on("arrangeNum.valuechange", function (obj) {
                    var arrangeNum = parseFloat(obj.newValue) || 0;
                    var currRow = viewModel.selectedreferListItems.getRowByRowId(obj.rowId);
                    var goodsName = currRow.getValue("goodsName");
                    var rate = parseFloat(currRow.getValue("conversionRate") || "1");

                    var saleOrderNum = parseFloat(currRow.getValue("saleOrderNum") || "0");
                    var deliveryNum = parseFloat(currRow.getValue("deliveryNum") || "0");
                    var canArrangeNum = saleOrderNum - (deliveryNum / rate).toFixed(0);
                    if (arrangeNum > canArrangeNum) {
                        toastr.warning("商品【" + goodsName + "】本次安排数量不能大于可安排数量【" + canArrangeNum + "】");
                        currRow.setValue("arrangeNum", 1);
                    }
                    //联动bom数量
                    var parentGoodsId = currRow.getValue("goodsId");
                    var parentRowNum = currRow.getValue("rowNum");

                    //获取全部bom信息
                    var bomdata = viewModel.selectedreferListItemBoms.getSimpleData();
                    for (var i = 0; i < bomdata.length; i++) {
                        var allrows = viewModel.selectedreferListItemBoms.getAllRealRows();
                        if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                            var bomOrderNum = bomdata[i].childGoodsQty * arrangeNum || 0,
                                bomMainNum = bomOrderNum * (bomdata[i].conversionRate || 1) || 0,
                                bomDealAmount = bomMainNum * parseFloat(bomdata.dealPrice || "0") || 0;
                            allrows[i].setValue("mainNum", bomMainNum);
                            allrows[i].setValue("orderNum", bomOrderNum);
                            allrows[i].setValue("dealAmount", bomDealAmount);
                        } else {
                            if (allrows[i] && allrows[i].getValue("goodsId") === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                                var dealAmount = arrangeNum * rate * parseFloat(currRow.getValue("dealPrice") || "0") || 0;
                                allrows[i].setValue("mainNum", arrangeNum * rate);
                                allrows[i].setValue("orderNum", arrangeNum);
                                allrows[i].setValue("dealAmount", dealAmount);
                            }
                        }
                    }

                });

                viewModel.searchcomp2.viewModel.params.on("order--saleOrg.valuechange", function (obj) {
                    viewModel.searchcomp2.setSearchValue("order--customer", null);
                    if (!obj.newValue) {
                        $("#search_customer").attr("placeholder", "请先选择销售组织").attr({ "readonly": "readonly", "disabled": "disabled" });
                    } else {
                        $("#search_customer").attr("placeholder", "").removeAttr("readonly disabled");
                    }
                    $("#search_customer").parent().attr("data-refparam", JSON.stringify({ "EQ_SaleOrder": obj.newValue, "AUTH_refdim": "deliveryOrderItems.customer" }));
                })
            }
        });

        return view;
    }
);