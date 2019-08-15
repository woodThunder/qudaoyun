define(['text!./purchasecargoorder.html', 'ocm_common', 'ocm_baseview', './meta.js', '../../flow/bpmapproveref/bpmopenbill.js'], function (tpl, common, baseview, model, bpmopenbill) {
    'use strict';
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
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: '/purchase/takeCargoOrder',
            applicationUrl: '/purchase/takeCargoOrder',
            orderurl: '/purchase/orders',
            orderitemsurl: '/purchase/order-items',
            takeCargoList: new u.DataTable(model.options.metas.complex),
            takeCargoItems: new u.DataTable(model.options.metas.complexItem),
            BomItems: new u.DataTable(model.options.metas.BomItem),
            ItemRefList: new u.DataTable(model.options.metas.ItemRef),
            // 拉单（采购订单）
            referPurchaseorderList: new u.DataTable(model.options.metas.referPurchaseorder),
            referPurchaseorderitemList: new u.DataTable(
                model.options.metas.referPurchaseorderitem
            ),
            //已选择（采购订单）
            selectedreferList: new u.DataTable(model.options.metas.referPurchaseorder),
            selectedreferListItem: new u.DataTable(model.options.metas.referPurchaseorderitem),
            searchcomp: {},
            searchcomp2: {},
            searchSource: model.options.searchs.search1,
            search2Source: model.options.searchs.search2,
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            card1Source: model.options.cards.card1,
            detail11Source: model.options.details.detail1,
            billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
            pageModel: {
                totalPages: ko.observable(0),
                pageSize: ko.observable(0),
                pageIndex: ko.observable(0),
                totalRow: ko.observable(0),
                hasPage: ko.observable(0),
                setCurrentPage: ko.observable(0),
            },
            takeType: ko.pureComputed(function () {
                var enableStatus = viewModel.takeCargoList.ref("takeType")();
                switch (enableStatus) {
                    case 1:
                        return "物流公司";
                    case 2:
                        return "个体";
                }
            }),
            grid1Option: model.options.grids.grid1,
            //商品信息
            gridGoodsEdit: model.options.grids.gridGoodsEdit,
            gridGoodsDetail: model.options.grids.gridGoodsDetail,
            //BOM结构信息
            gridBomEdit: model.options.grids.gridBomEdit,
            gridBomDetail: model.options.grids.gridBomDetail,
            //拉单弹窗grid
            grid4Option: model.options.grids.grid4,
            grid5Option: model.options.grids.grid5,
            grid6Option: model.options.grids.grid6,
            grid7Option: model.options.grids.grid7,
            // 行号池
            currowNum: ko.observable(0),
            currowBomNum: ko.observable(0),
            // 是否bom页签
            isBomPanel: ko.observable(),
            listIndex: null,
            pageAdd: ko.observableArray([]),
            //当前系统日期
            curDate: ko.observable(),
            //跳转编辑页
            goBillPanel: common.bill.goBillPanel,
            //跳转详情页
            goDetailPanel: common.bill.goDetailPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel,
            orderids: [],
            orderStateData: [{
                    value: "1",
                    name: "待处理"
                }, {
                    value: "2",
                    name: "已提交"
                }, {
                    value: "3",
                    name: "审批中"
                }, {
                    value: "4",
                    name: "审批通过"
                }, {
                    value: "5",
                    name: "审批不通过未入库"
                },
                {
                    value: "6",
                    name: "部分入库"
                }, {
                    value: "7",
                    name: "全部入库"
                }
            ],
            stateData: [{
                value: 0,
                name: "待处理"
            }, {
                value: 1,
                name: "已提交"
            }, {
                value: 2,
                name: "审批中"
            }, {
                value: 3,
                name: "审批通过"
            }, {
                value: 4,
                name: "审批不通过"
            }, ],
            state: ko.pureComputed(function () {
                var state = viewModel.takeCargoList.ref("state")();
                state = parseInt(state);
                switch (state) {
                    case 0:
                        return "待处理";
                    case 1:
                        return "已提交";
                    case 2:
                        return "审批中";
                    case 3:
                        return "审批通过";
                    case 4:
                        return "审批不通过";
                    default:
                }
            }),
            modifiedTime: ko.pureComputed(function () {
                var truetime = viewModel.takeCargoList.ref("modifiedTime")();
                var showtime = u.date.format(truetime, 'YYYY-MM-DD hh:mm:ss');
                return showtime;
            }),
            creationTime: ko.pureComputed(function () {
                var truetime = viewModel.takeCargoList.ref("creationTime")();
                var showtime = u.date.format(truetime, 'YYYY-MM-DD hh:mm:ss');
                return showtime;
            }),
            approver: ko.pureComputed(function () {
                var truetime = viewModel.takeCargoList.ref("approver")();
                var showtime = u.date.format(truetime, 'YYYY-MM-DD hh:mm:ss');
                return showtime;
            }),
            preparedByTime: ko.pureComputed(function () {
                var truetime = viewModel.takeCargoList.ref("preparedByTime")();
                var showtime = u.date.format(truetime, 'YYYY-MM-DD hh:mm:ss');
                return showtime;
            }),
            arrangeTime: ko.pureComputed(function () {
                var truetime = viewModel.takeCargoList.ref("arrangeTime")();
                var showtime = u.date.format(truetime, 'YYYY-MM-DD hh:mm:ss');
                return showtime;
            }),
            appointTackTime: ko.pureComputed(function () {
                var truetime = viewModel.takeCargoList.ref("appointTackTime")();
                var showtime = u.date.format(truetime, 'YYYY-MM-DD hh:mm:ss');
                return showtime;
            }),
            takeTypeDetail: function (obj) {
                var takeType = obj.value;
                var showName = "";
                switch (takeType) {
                    case "1":
                        showName = "物流公司";
                        break;
                    case "2":
                        showName = "个体";
                        break;
                }
                obj.element.innerHTML = showName;
            },

            takeTypeData: [{
                value: "1",
                name: "物流公司"
            }, {
                value: "2",
                name: "个体"
            }]
        },
        rendertype: {
            approveStateRender: function (obj) {
                var showValue = "";
                switch (parseInt(obj.value)) {
                    case 0:
                        showValue = "待处理";
                        break;
                    case 1:
                        showValue = "已提交";
                        break;
                    case 2:
                        showValue = "审批中";
                        break;
                    case 3:
                        showValue = "审批通过";
                        break;
                    case 4:
                        showValue = "审批不通过";
                        break;
                    default:
                        showValue = "";
                        break;
                }
                obj.element.innerHTML = showValue;
            },
            operation: function (obj) {
                var dataRowId = obj.row.value['$_#_@_id'];
                var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataRowId + ")";
                var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataRowId + ")";
                obj.element.innerHTML = '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    '<a href="#" class="u-grid-content-focus-row" ' +
                    editfun +
                    ' title="编辑">编辑</a>' +
                    '</span>    ' +
                    '<span class="ui-handle-word">' +
                    '<a href="#" class="u-grid-content-focus-row" ' +
                    delfun +
                    ' title="删除">删除</a>' +
                    '</span></div>';
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            statusRender: function (params) {
                var value = parseFloat(params.value);
                var showName = "";
                switch (value) {
                    case 1:
                        showName = "待处理";
                        break;
                    case 2:
                        showName = "已提交审批";
                        break;
                    case 3:
                        showName = "审批中";
                        break;
                    case 4:
                        showName = "审批通过";
                        break;
                    case 5:
                        showName = "审批不通过";
                        break;
                    case 6:
                        showName = "部分入库";
                        break;
                    case 7:
                        showName = "全部入库";
                        break;
                    case 8:
                        showName = "部分出库";
                        break;
                    case 9:
                        showName = "全部出库";
                        break;
                };
                params.element.innerHTML = showName;
            },
            detailRender: common.rendertype.detailRender,
        },
        events: {
            // 查看选配
            goodsOptDetails: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var goodsSelection = obj.row.value.goodsSelection; // 选配id
                if (goodsSelection) {
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
                var data = viewModel.takeCargoItems.getSimpleData()[obj];
                var id = data.goodsId;
                var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
                common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.takeCargoItems, viewModel.BomItems);
            },

            setValueToBom: function (obj) {
                var parentRowNum = obj.rowObj.getValue("rowNum");
                var allrows = viewModel.BomItems.getAllRealRows();
                for (var i = 0; i < allrows.length; i++) {
                    var nameField = obj.field.replace("Id", "Name");
                    var idField = obj.field;
                    var display = obj.rowObj.data[idField].meta
                    if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                        allrows[i].setValue(obj.field, obj.newValue);
                        if (obj.newValue) {
                            allrows[i].setValue(nameField, display ? display.display : obj.rowObj.data[nameField].value)
                        }
                    }
                }
            },
            //选择商品页签
            checkGoods: function () {
                viewModel.isBomPanel(true);
                if (viewModel.billPanelStatus() == "detail") {
                    $("#tab-detail-bom").hide();
                    $("#tab-detail-goods").show();
                } else {
                    $("#tab-edit-bom").hide();
                    $("#tab-edit-goods").show();
                }
            },
            //选择Bom页签
            checkBom: function () {
                viewModel.isBomPanel(false);
                if (viewModel.billPanelStatus() == "detail") {
                    $("#tab-detail-bom").show();
                    $("#tab-detail-goods").hide();
                } else {
                    $("#tab-edit-bom").show();
                    $("#tab-edit-goods").hide();
                }
            },
            //导出
            exportHandle: function () {
                var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
                var templateUrl = '/sc/class-Excel/downloadExcelTemplate'; //导出模板地址
                var excelDataUrl = '/sc/class-Excel/excelDataExport'; //导出数据地址
                var listData = viewModel.takeCargoList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                // var judgeAuditStatus = true; //是否有审核条件导出限制，如果导出类型选择导出需修改的数据，已审核则不能导出
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            //编辑
            beforeEdit: function (index, rowId) {
                var row;
                if (index == -1) {
                    //处理通过详情页编辑进入
                    row = viewModel.takeCargoList.getFocusRow();
                    //通过改变index判断当前处于编辑态
                    index = 0;
                } else {
                    //行上的编辑按钮
                    row = viewModel.takeCargoList.getRowByRowId(rowId);
                }
                var self = this;
                viewModel.takeCargoList.setRowSelectbyRowId(rowId);
                if (row.getValue("state") != 0) {
                    toastr.error("不处于待处理的单据不能编辑");
                    return;
                }
                $("#tab-edit-bom").hide();
                $("#tab-edit-goods").show();
                var id = row.getValue("id");
                viewModel.index = index;
                viewModel.findByParentid(id);
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                viewModel.goBillPanel();
            },
            //字表增加
            addRow: function () {
                var emptyRow = viewModel.takeCargoItems.createEmptyRow();
                // emptyRow.setValue("isEnable","1");
                emptyRow.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
            },
            //提交
            submitBtn: function () {
                var listCompId = "takeCargoList";
                var nodeJs = "/ocm-web/pages/purchase/purchasecargoorder/purchasecargoorder.js";
                var billTypeCode = "CargoOrderBill";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
            },
            //收回
            backBtn: function () {

                var listCompId = "takeCargoList";
                var billTypeCode = "CargoOrderBill";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
            },
            //审批
            approve: function () {
                var listCompId = "takeCargoList";
                var billTypeCode = "CargoOrderBill";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
                viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },
            //取消审核
            disapprove: function () {
                var listCompId = "takeCargoList";
                var billTypeCode = "CargoOrderBill";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    viewModel.detail();

                };
                var withoutBpmCallback = null;
                viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },

            unapprove: function () {
                var listCompId = "takeCargoList";
                var billTypeCode = "CargoOrderBill";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
                viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },
            //展示主表数据
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (index) {
                if (index) {
                    viewModel.takeCargoList.pageIndex(0);
                }
                viewModel.takeCargoList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr();
                queryData.size = viewModel.takeCargoList.pageSize();
                queryData.page = viewModel.takeCargoList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.takeCargoList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.takeCargoList.totalRow(data.totalElements);
                        viewModel.takeCargoList.totalPages(data.totalPages);
                    }
                })
            },
            //采购单查询
            orderSearch: function (index) {
                if (index) {
                    viewModel.referPurchaseorderList.pageIndex(0);
                }
                viewModel.referPurchaseorderList.removeAllRows();
                var queryData = viewModel.searchcomp2.getDataWithOpr();
                queryData.size = viewModel.referPurchaseorderList.pageSize();
                queryData.page = viewModel.referPurchaseorderList.pageIndex();
                $._ajax({
                    type: "get",
                    // url: appCtx + viewModel.orderurl,
                    url: appCtx + viewModel.orderurl + "/get-goorder-by-param",
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.referPurchaseorderList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.referPurchaseorderList.totalRow(data.totalElements);
                        viewModel.referPurchaseorderList.totalPages(data.totalPages);
                    }
                })
            },

            //清空提货单搜索条件
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的提货单执行回调函数
            pageChange: function (index) {
                viewModel.takeCargoList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的提货单执行回调函数
            sizeChange: function (size) {
                viewModel.takeCargoList.pageSize(size);
                viewModel.search(true);
            },
            //清空采购单搜索条件
            cleanSearchOrder: function () {
                viewModel.searchcomp2.clearSearch();
            },
            //页码改变时的采购单执行回调函数
            pageChangeRefer: function (index) {
                viewModel.referPurchaseorderList.pageIndex(index);
                viewModel.ordersearch();
            },
            //页码改变时的采购单执行回调函数
            sizeChangeRefer: function (size) {
                viewModel.referPurchaseorderList.pageSize(size);
            },
            //页码改变时的采购单执行回调函数
            pageChangeOrderItem: function (index) {
                viewModel.referPurchaseorderitemList.pageIndex(index);
            },
            //页码改变时的采购单执行回调函数
            sizeChangeOrderItem: function (size) {
                viewModel.referPurchaseorderitemList.pageSize(size);
                // viewModel.orderitemsearch(true);
            },
            //返回
            backFun: function () {
                viewModel.search();
                viewModel.retListPanel();
                viewModel.takeCargoList.pageIndex(0);
            },
            //新增 参照
            showAddRefer: function () {
                viewModel.searchcomp2.clearSearch();
                viewModel.removeAllreferRows();
                if (!viewModel.referpurchaseorderdialog) {
                    viewModel.referpurchaseorderdialog = u.dialog({
                        id: "dialog_referpurchaseorder",
                        content: "#dialog_referpurchaseorder",
                        hasCloseMenu: true,
                        width: "85%"
                    });
                    var okButton = $("#dialog_referpurchaseorder .J-ok");
                    okButton.off().on("click", function () {
                        viewModel.confirmReferpurchaseorder();
                    });
                    var cancelButton = $("#dialog_referpurchaseorder .J-cancel");
                    cancelButton.off().on("click", function () {
                        viewModel.referpurchaseorderdialog.close();
                    });
                } else {
                    viewModel.referpurchaseorderdialog.show();
                }
            },
            //点击选择采购订单商品信息
            referSelectHandle: function (obj) {
                viewModel.referPurchaseorderitemList.removeAllRows();
                viewModel.selectedreferListItem.removeAllRows();
                viewModel.selectedreferList.removeAllRows();
                var listArr = [];
                var selectedRows = viewModel.referPurchaseorderList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        var listData = selectedRows[i].getSimpleData();
                        listArr.push(listData);
                        listData.orderItems.forEach(function (item) {
                            item.amountMoney = item.addStorageAmount * item.unitPrice;
                        });
                        viewModel.referPurchaseorderitemList.addSimpleData(listData.orderItems);
                        viewModel.referPurchaseorderitemList.setAllRowsSelect();
                        var subIds = listData.orderItems.map(function (item) {
                            return item.id;
                        });
                    }
                }
                viewModel.selectedreferList.addSimpleData(listArr);
                viewModel.selectedreferList.setAllRowsSelect();

            },
            //点击取消采购订单商品信息
            referUnSelectHandle: function (obj) {
                var id = obj.rowObj.value.id;
                var itemId = obj.rowObj.value.orderItems.getValue("id");
                var rows = viewModel.selectedreferList.getAllRows();
                var itemrows = viewModel.selectedreferListItem.getAllRows();
                for (var j = rows.length - 1; j >= 0; j--) {
                    if (rows[j].getValue("id") == id) {
                        viewModel.selectedreferList.removeRows([j], {
                            forceDel: true
                        });
                    }
                }
                for (var i = itemrows.length - 1; i >= 0; i--) {
                    if (itemrows[i].getValue("purchaseOrderId") == id) {
                        viewModel.referPurchaseorderitemList.removeRows([i], {
                            forceDel: true
                        });
                        viewModel.selectedreferListItem.removeRows([i], {
                            forceDel: true
                        });
                    }
                }
            },
            //已选择采购订单商品信息
            referSelectItemHandle: function (obj) {
                var id = obj.rowObj.value.id;
                var selectedRows = viewModel.referPurchaseorderitemList.getSelectedRows();
                for (var i = 0; i < selectedRows.length; i++) {
                    var itemInfo = selectedRows[i].getSimpleData()
                    if (selectedRows[i].getValue("id") == id) {
                        viewModel.selectedreferListItem.addSimpleData(itemInfo);
                    }
                }
            },
            //取消已选择采购订单商品信息
            referUnSelectItemHandle: function (obj) {
                function removeByValue(arr, val) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == val) {
                            arr.splice(i, 1);
                            break;
                        }
                    }
                }

                var itemId = obj.rowObj.value.id;
                var parentRowId = obj.rowObj.value.purchaseOrderId;
                var parentRow = viewModel.referPurchaseorderList.getRowByField("id", parentRowId);
                var selectitemArr = parentRow.getValue("selectitemIds")
                if (selectitemArr.length > 0) {
                    for (var i = 0; i < selectitemArr.length; i++) {
                        if ($.inArray(itemId, selectitemArr) > -1) {
                            removeByValue(selectitemArr, itemId)
                            parentRow.setValue("selectitemIds", selectitemArr);
                            if (selectitemArr.length == 0) {
                                var curRowId = parentRow.rowId;
                                var index = viewModel.referPurchaseorderList.getIndexByRowId(curRowId);
                                viewModel.referPurchaseorderList.setRowsUnSelect(index);
                            }
                        }
                    }
                }
                var itemrows = viewModel.selectedreferListItem.getAllRows();
                for (var i = itemrows.length - 1; i >= 0; i--) {
                    if (itemrows[i].getValue("id") == itemId) {
                        viewModel.selectedreferListItem.removeRows([i], {
                            forceDel: true
                        });
                    }
                }
            },
            //确定 新增
            confirmReferpurchaseorder: function () {
                var self = this;
                var parentArr = viewModel.referPurchaseorderList.getSimpleData({
                    type: 'select'
                });
                var itemArr = viewModel.referPurchaseorderitemList.getSimpleData({
                    type: 'select'
                });
                if (!itemArr.length) {
                    toastr.warning("请至少选择一条商品");
                    return;
                };
                for (var i = 0; i < parentArr.length; i++) {
                    parentArr[i].orderItems = [];
                    for (var j = 0; j < itemArr.length; j++) {
                        if (itemArr[j].purchaseOrderId == parentArr[i].id) {
                            parentArr[i].orderItems.push(itemArr[j]);
                        }
                    }
                }
                parentArr.forEach(function (main) {
                    main.orderItems.forEach(function (item) {
                        var parentRowNum = item.rowNum;
                        var parentGoodsNum = item.addStorageAmount;
                        item.amountMoney = item.addStorageAmount * item.unitPrice;
                        main.orderItemBoms.forEach(function (itemBom) {
                            if (itemBom.parentRowNum == parentRowNum) {
                                if (itemBom.childGoodsQty == null) {
                                    itemBom.addStorageAmount = parentGoodsNum
                                } else {
                                    itemBom.addStorageAmount = parentGoodsNum * itemBom.childGoodsQty;
                                }
                            }
                            itemBom.amountMoney = itemBom.addStorageAmount * itemBom.unitPrice;
                        });
                    });
                });
                viewModel.currowNum(0);
                viewModel.currowBomNum(0);
                viewModel.queryChildArr(parentArr);
                viewModel.index = -1;
                viewModel.pageModel.pageIndex(0);
                viewModel.goBillPanel();
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                viewModel.referpurchaseorderdialog.close();
                viewModel.removeAllreferRows();

            },
            beforPageChangeFun: function (index) {
                var pagedataArr = viewModel.pageAdd();
                var flag = false;
                viewModel.currowNum(0);
                viewModel.currowBomNum(0);
                var Row = viewModel.takeCargoList.getCurrentRow();
                var status = Row.status;
                if (status != 'nrm' && status != 'new') {
                    flag = true;
                }
                if (flag) {
                    common.dialog.confirmDialog({
                        msg1: '当前有修改，是否先保存后跳转？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function () {
                            viewModel.saveBill(index);
                        },
                        onCancel: function () {
                            viewModel.pageModel.pageIndex(index);
                            viewModel.takeCargoList.setSimpleData(pagedataArr[index]);
                            viewModel.takeCargoItems.setSimpleData(pagedataArr[index].takeCargoItems, {
                                status: "new"
                            });
                            viewModel.BomItems.setSimpleData(pagedataArr[index].takeCargoItemBoms, {
                                status: "new"
                            });
                        }
                    });
                } else {
                    viewModel.pageModel.pageIndex(index);
                    var curRow = viewModel.takeCargoList.getCurrentRow();
                    var appointTackTime = curRow.getValue('appointTackTime');
                    var arrangeTime = curRow.getValue('arrangeTime');
                    viewModel.takeCargoList.removeRow(curRow);
                    for (var j = 0; j < pagedataArr.length; j++) {
                        if (j == index) {
                            var nextRow = viewModel.takeCargoList.createEmptyRowF();
                            viewModel.rowId = nextRow.rowId;
                            viewModel.takeCargoList.setRowFocus(nextRow);
                            var name = u.getCookie("_A_P_userLoginName"); //获取当前登录用户名称
                            pagedataArr[j].arrangePerson = name;
                            pagedataArr[j].takeType = 1;
                            pagedataArr[j].orderState = 1;
                            pagedataArr[j].state = 0;
                            pagedataArr[j].arrangeTime = arrangeTime;
                            pagedataArr[j].appointTackTime = appointTackTime;
                            nextRow.setSimpleData(pagedataArr[j]);
                            viewModel.takeCargoItems.setSimpleData(pagedataArr[j].takeCargoItems, {
                                status: "new"
                            });
                            var itemrows = viewModel.takeCargoItems.getAllRows();
                            itemrows.forEach(function (item) {
                                var rowNum = viewModel.generaterowNum();
                                item.setValue("rowNum", rowNum);
                            });
                            // bom行的添加
                            viewModel.BomItems.setSimpleData(pagedataArr[j].takeCargoItemBoms, {
                                status: "new"
                            });
                            var bomitemrows = viewModel.BomItems.getAllRows();
                            bomitemrows.forEach(function (item) {
                                var rowNum = viewModel.generateBomrowNum();
                                item.setValue("rowNum", rowNum);
                            })
                        }
                    }
                }
                return true;
            },
            removeAllreferRows: function () {
                viewModel.referPurchaseorderList.totalRow(0);
                viewModel.referPurchaseorderList.totalPages(0);
                viewModel.referPurchaseorderList.removeAllRows();
                viewModel.referPurchaseorderitemList.removeAllRows();
                viewModel.selectedreferList.removeAllRows();
                viewModel.selectedreferListItem.removeAllRows();
            },
            queryChildArr: function (parentArr) {
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/translateTakeCargo",
                    async: false,
                    data: JSON.stringify(parentArr),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.setDataToPanel(data[0]);
                        viewModel.pageAdd(data);
                        viewModel.pageModel.totalPages(data.length);

                    }
                })
            },
            setDataToPanel: function (data) {
                viewModel.index = -1;
                viewModel.takeCargoList.removeAllRows();
                viewModel.takeCargoItems.removeAllRows();
                var curRow = viewModel.takeCargoList.createEmptyRow();
                var name = u.getCookie("_A_P_userLoginName"); //获取当前登录用户名称
                curRow.setValue("arrangePerson", name);
                curRow.setValue("arrangeTime", viewModel.getCurDate(curRow));
                curRow.setValue("appointTackTime", viewModel.getCurNextDate(curRow));
                curRow.setValue("state", 0);
                curRow.setValue("moneys", data.moneys);
                curRow.setValue("counts", data.counts);
                viewModel.takeCargoList.setRowFocus(curRow);
                viewModel.currowNum(0);
                viewModel.currowBomNum(0);
                var itemrows = viewModel.takeCargoItems.getAllRows();
                if (data.takeCargoItems && data.takeCargoItems.length > 0) {
                    data.takeCargoItems.forEach(function (item) {
                        item.rowNum = viewModel.generaterowNum();
                        /*if (i == (itemrows.length - 1)) {
                            var theTakeCounts = itemrows[0].getValue('theTakeCounts');
                            itemrows[i].setValue("theTakeCounts", (theTakeCounts == 1 ? 0.5 : 1));
                            itemrows[i].setValue("theTakeCounts", theTakeCounts);
                        }*/

                    });
                    viewModel.takeCargoItems.setSimpleData(data.takeCargoItems, {
                        status: "new"
                    });
                }
                if (data.takeCargoItemBoms && data.takeCargoItemBoms.length > 0) {
                    data.takeCargoItemBoms.forEach(function (bomItem) {
                        bomItem.rowNum = viewModel.generateBomrowNum();
                        data.takeCargoItems.forEach(function (item) {
                            if (bomItem.srcBillBcode == item.srcBillBcode) {
                                bomItem.parentRowNum = item.rowNum;
                                if (bomItem.goodsId == item.goodsId) {
                                    //如果是不是包件 bom页签不显示母件name
                                    bomItem.parentGoodsName = null;
                                }
                            }
                        });
                    });
                    viewModel.BomItems.setSimpleData(data.takeCargoItemBoms, {
                        status: "new"
                    });
                }
            },
            // 从行号池中拿到最新的bom行号
            generateBomrowNum: function () {
                var latestnum = viewModel.currowBomNum(),
                    newnum = parseFloat(latestnum) + 10;
                viewModel.currowBomNum(newnum);
                return newnum;
            },
            getCurRowNum: function () {
                var data = viewModel.takeCargoItems.getSimpleData();
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
            getBomCurrowNum: function () {
                var data = viewModel.BomItems.getSimpleData();
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
            // 从行号池中拿到最新的行号
            generaterowNum: function () {
                var latestnum = viewModel.currowNum(),
                    newnum = parseFloat(latestnum) + 10;
                viewModel.currowNum(newnum);
                return newnum;
            },
            //保存新增编辑
            saveBill: function () {
                var type;
                var index = viewModel.index;
                var takeCargoData = viewModel.takeCargoList.getCurrentRow().getSimpleData();
                var takeCargoItems = viewModel.takeCargoItems.getSimpleData();
                var takeCargoItemBoms = viewModel.BomItems.getSimpleData();
                //判断是否新增
                if (index >= 0) {
                    type = "put";
                } else {
                    type = "post";
                    // 新增时将所有的行状态置为new
                    takeCargoData.persistStatus = 'new';
                    takeCargoData.state = 0;
                    takeCargoItems.forEach(function (item) {
                        item.persistStatus = 'new';
                    });
                    takeCargoItemBoms.forEach(function (item) {
                        item.persistStatus = 'new';
                    });
                }
                takeCargoData.takeCargoItems = takeCargoItems;
                takeCargoData.takeCargoItemBoms = takeCargoItemBoms;
                /* var validate = $("#validate")[0];
                 //校验
                 var result = app.compsValidateMultiParam({
                     element: validate,
                     showMsg: true
                 });*/
                //通过校验，发送请求
                if (true) {
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: type,
                        data: JSON.stringify(takeCargoData),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            common.dialog.stockConfirmDialog(data, function () {
                                viewModel.takeCargoList.getFocusRow().setSimpleData(data);
                                if(viewModel.index !== -1){
                                    viewModel.retListPanel();
                                    return;
                                }
                                var curIndex = viewModel.pageModel.pageIndex();
                                viewModel.pageAdd().splice(curIndex, 1);
                                viewModel.pageAdd(viewModel.pageAdd());
                                viewModel.pageModel.totalPages(viewModel.pageAdd().length);
                                if(curIndex == viewModel.pageAdd().length){
                                    viewModel.beforPageChangeFun(curIndex-1);
                                    if(viewModel.pageModel.totalPages()==0){
                                        viewModel.retListPanel();
                                        viewModel.search();
                                    }
                                }else{
                                    viewModel.beforPageChangeFun(curIndex);
                                }
                            });
                        }
                    });
                } else {
                    return;
                }
            },
            //删除和批量删除
            del: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.takeCargoList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var rows = viewModel.takeCargoList.getSelectedRows();
                if (rows && rows.length > 0) {
                    if (rows.length == 1) {
                        if (rows[0].getValue("state") != 0) {
                            toastr.warning("不处于待处理状态的单据不能删除");
                            return;
                        }
                    }
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].getValue("state") == 0) {
                            ids.push(rows[i].getValue("id"));
                        }
                    }
                } else {
                    toastr.warning('请选择数据');
                    return;
                }
                if (rows && rows.length > 0) {
                    common.dialog.confirmDialog({
                        msg1: '确认删除这些项？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function () {
                            $._ajax({
                                url: appCtx + viewModel.baseurl + "/deletes",
                                type: "post",
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function (data) {
                                    viewModel.takeCargoList.removeRows(rows);
                                    viewModel.search();
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning('请选择数据');
                    return;
                }
            },
            detail: function () {
                $("#tab-panel-4").hide();
                $("#tab-panel-3").show();
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    var curRow = viewModel.takeCargoList.getCurrentRow();
                    var id = curRow.getValue("id");
                    viewModel.initBPMFromBill(id, viewModel);
                    viewModel.findByParentid(id);
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                    viewModel.goDetailPanel();
                }, 0);
            },
            detail2bill: function () {
                var state = viewModel.takeCargoList.getValue("state");
                if (state != 0) {
                    toastr.warning("待处理单据才可进入编辑页面");
                    return;
                }
                $("#tab-panel-2").hide();
                $("#tab-panel-1").show();
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                common.bill.detail2bill();
            },
            //查询子表数据
            findByParentid: function (id) {
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/findByParentId",
                    type: "get",
                    data: {
                        id: id
                    },
                    success: function (data) {
                        viewModel.takeCargoList.setSimpleData(data);
                        viewModel.takeCargoItems.setSimpleData(data.takeCargoItems, {
                            unSelect: true
                        });
                        viewModel.BomItems.setSimpleData(data.takeCargoItemBoms, {
                            unSelect: true
                        });
                    }
                });
            },
            //计算价格
            sumPrice: function (row) {
                var amount = row.getValue('theTakeCounts');
                var unitPrice = row.getValue('unitPrice');
                amount == null ? 0 : parseFloat(amount);
                unitPrice == null ? 0 : parseFloat(unitPrice);
                row.setValue("amountMoney", amount * unitPrice);
                return amount * unitPrice;
            },
            //计算提货数量
            getSum: function (array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseInt(array[i]);
                }
                return sum;
            },
            getCurDate: function (row) {
                // 服务器时间获取
                $._ajax({
                    type: "get",
                    url: appCtx + '/purchase/orders/search-date',
                    success: function (data) {
                        var truetime = u.date.format(data, 'YYYY/MM/DD');
                        truetime = new Date(truetime).getTime();
                        if (row) {
                            row.setValue("arrangeTime", truetime);
                        }
                        viewModel.curDate(truetime);
                    }
                });
            },
            getCurNextDate: function (row) {
                // 服务器时间获取
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/search-date",
                    success: function (data) {
                        var truetime = u.date.format(data, 'YYYY/MM/DD');
                        truetime = new Date(truetime).getTime();
                        if (row) {
                            row.setValue("appointTackTime", truetime);
                        }
                        viewModel.curDate(truetime);
                    }
                });
            },
            //约定收货日期小于安排日期
            disabledEnd: function (current) {
                var beginTime = viewModel.takeCargoList.getCurrentRow().getValue("arrangeTime");
                if (beginTime) {
                    beginTime = new Date(beginTime).getTime();
                    if (current) {
                        current = new Date(current.format("YYYY-MM-DD")).getTime();
                    }
                    return current && current < beginTime;
                }
            },
            //约定收货日期小于安排日期
            bigTackTime: function (current) {
                var beginTime = viewModel.takeCargoList.getCurrentRow().getValue("appointTackTime");
                if (beginTime) {
                    beginTime = new Date(beginTime).getTime();
                    if (current) {
                        current = new Date(current.format("YYYY-MM-DD")).getTime();
                    }
                    return current && current > beginTime;
                }
            },
        },
        afterCreate: function () {
            viewModel = u.extend(viewModel, bpmopenbill.model);
            viewModel.takeCargoList.on("valuechange", function (obj) {
                if (obj.field == "batchNumId" ||
                    obj.field == "goodsPositionId" ||
                    obj.field == "batchCodeId" ||
                    obj.field == "supplierId" ||
                    obj.field == "projectId" ||
                    obj.field == "stockStateId" ||
                    obj.field == "demandStockOrgId" ||
                    obj.field == "receiveStorageOrgId" ||
                    obj.field == "receiveStorageId" ||
                    obj.field == "customerId"
                ) {
                    viewModel.setValueToBom(obj);
                }
            });
            viewModel.takeCargoList.on("takeType.valuechange", function (obj) {
                var takeType = $('#takeType').val();
                if (obj.newValue != 2) {
                    /* $('#takeUnit').removeAttr('readonly');
                    $('#takeName').removeAttr('readonly');
                    $('#takePhone').removeAttr('readonly');
                    obj.rowObj.setValue("takeUnit", null);
                    obj.rowObj.setValue("takeName", null);
                    obj.rowObj.setValue("takePhone", null); */

                    $('#takeUnitId').removeAttr('readonly');
                    $('#takeName').removeAttr('readonly');
                    $('#takePhone').removeAttr('readonly');
                    /* obj.rowObj.setValue("takeUnitId", null);
                    obj.rowObj.setValue("takeUnitCode", null);
                    obj.rowObj.setValue("takeUnitName", null);
                    obj.rowObj.setValue("takeName", null);
                    obj.rowObj.setValue("takePhone", null); */
                } else if (obj.newValue = 2) {
                    $('#takeUnitId').attr('readonly', 'readonly');
                    /* obj.rowObj.setValue("takeUnitId", null);
                    obj.rowObj.setValue("takeUnitCode", null);
                    obj.rowObj.setValue("takeUnitName", null);
                    obj.rowObj.setValue("takeName", null);
                    obj.rowObj.setValue("takePhone", null); */
                }
                    obj.rowObj.setValue("takeUnitId", null);
                    obj.rowObj.setValue("takeUnitCode", null);
                    obj.rowObj.setValue("takeUnitName", null);
                    obj.rowObj.setValue("takeName", null);
                    obj.rowObj.setValue("takePhone", null);
            });
            viewModel.takeCargoItems.on("amountMoney.valuechange", function (obj) {
                if (obj.oldValue == undefined && obj.oldValue == obj.newValue) {
                    return;
                };
                var arr = viewModel.takeCargoItems.getSimpleData();
                var price = [];
                var getSum = function (array) {
                    var sum = 0;
                    for (var i = 0; i < array.length; i++) {
                        sum += parseInt(array[i]);
                    }
                    return sum;
                }
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i].amountMoney) {
                        arr[i].amountMoney = 0
                    }
                    var amoney = parseFloat(arr[i].amountMoney)
                    price.push(amoney);
                }
                viewModel.takeCargoList.getCurrentRow().setValue("moneys", getSum(price));
            });
            // 价格
            viewModel.takeCargoItems.on("unitPrice.valuechange", function (obj) {
                if (obj.oldValue == undefined && obj.oldValue == obj.newValue) {
                    return;
                };
                viewModel.sumPrice(obj.rowObj);
                var arr = viewModel.takeCargoItems.getSimpleData();
                var price = [];
                var getSum = function (array) {
                    var sum = 0;
                    for (var i = 0; i < array.length; i++) {
                        sum += parseInt(array[i]);
                    }
                    return sum;
                }
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i].amountMoney) {
                        arr[i].amountMoney = 0
                    }
                    var amoney = parseFloat(arr[i].amountMoney)
                    price.push(amoney);
                }
                viewModel.takeCargoList.getCurrentRow().setValue("moneys", getSum(price));
            });
            viewModel.BomItems.on("theTakeCounts.valuechange", function (obj) {
                if (obj.newValue != undefined && obj.newValue != null) {
                    var unitPrice = obj.rowObj.getValue("unitPrice");
                    if (unitPrice == undefined || unitPrice == null) {
                        unitPrice = 0;
                    }
                    obj.rowObj.setValue("amountMoney", obj.newValue * unitPrice);
                }

            });
            viewModel.takeCargoItems.on("amountMoney.valuechange", function (obj) {
                var arr = viewModel.takeCargoItems.getSimpleData();
                var amountMoneys = [];
                for (var i = 0; i < arr.length; i++) {
                    var amountMoney = parseFloat(arr[i].amountMoney);
                    amountMoneys.push(amountMoney);
                }
                viewModel.takeCargoList.getCurrentRow().setValue("moneys", viewModel.getSum(amountMoneys));
            });
            // 数量
            viewModel.takeCargoItems.on("theTakeCounts.valuechange", function (obj) {
                var arr = viewModel.takeCargoItems.getSimpleData();
                var amount = [];
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i].theTakeCounts) {
                        arr[i].theTakeCounts = 0
                    }
                    if (!arr[i].unitPrice) {
                        arr[i].unitPrice = 0
                    }
                    var amountItem = arr[i].theTakeCounts;
                    amount.push(amountItem);
                }
                if (obj.newValue != undefined && obj.newValue != null) {
                    var unitPrice = obj.rowObj.getValue("unitPrice");
                    if (unitPrice == undefined || unitPrice == null) {
                        unitPrice = 0;
                    }
                    obj.rowObj.setValue("amountMoney", obj.newValue * unitPrice);
                }
                viewModel.takeCargoList.getCurrentRow().setValue("counts", viewModel.getSum(amount));

                //联动bom数量
                var parentRowNum = obj.rowObj.getValue("rowNum");
                var allrows = viewModel.BomItems.getAllRealRows();
                for (var i = 0; i < allrows.length; i++) {
                    if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                        var childQty = allrows[i].getValue("childGoodsQty") ? allrows[i].getValue("childGoodsQty") : 1;
                        var bomAmount = childQty * obj.newValue;
                        allrows[i].setValue("theTakeCounts", bomAmount)
                    }
                }
            });
        },
    });
    return view;
});