define(['text!./transferOutBill.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
    'use strict';
    window.log = console.log.bind(console);
    var viewModel,
        app,
        billstatus = CONST.STOCKENUM.INITIN,
        BILLPANELSTATUS = {
            ADD: "add",
            EDIT: "edit",
            COPY: "copy",
            DETAIL: "detail",
            DEFAULT: "default"
        },
        view = baseview.extend({
            beforeCreate: function () {
                viewModel = this.viewModel;
                app = this.app;
            },
            tpl: tpl,
            model: model,
            baseData: {
                baseurl: '/stock/transfer-out-bills',
                defaultPage: new u.DataTable(model.options.metas.defaultPage), //默认页tabale
                defaultPageCard: new u.DataTable(model.options.metas.defaultPage), //默认页tabale
                gridDefaultOption: model.options.grids.defaultGrid, //table展示项
                defaultItemPage: new u.DataTable(model.options.metas.defaultItemPage), //子页table
                BomItemPage: new u.DataTable(model.options.metas.BomItemPage), //子页Bom table
                searchSource: model.options.searchs.defaultSearch, //默认页搜索
                search2Source: model.options.searchs.search2, //拉单页搜索

                searchcomp: {}, //搜索默认
                searchcomp2: {},
                defaultButtons: model.options.buttons.buttonSource, //默认页butoon 

                //新增 参照 搜索
                referTransferBillSearchParam: new DataTable(model.options.metas.referTransferBillSearch),

                //拉单 调拨单
                referTransferBillList: new u.DataTable(model.options.metas.referTransferBill),
                //拉单 对应商品
                referTransferBillItemList: new u.DataTable(model.options.metas.referTransferBillItem),
                //拉单 已选择
                selectedreferList: new u.DataTable(model.options.metas.referTransferBill),
                selectedreferListItem: new u.DataTable(model.options.metas.referTransferBillItem),

                //拉单弹窗grid
                grid4Option: model.options.grids.grid4,
                grid5Option: model.options.grids.grid5,
                grid6Option: model.options.grids.grid6,
                grid7Option: model.options.grids.grid7,

                buttonEditSource: model.options.buttons.buttonEdit, //编辑页按钮
                editItemButton: model.options.buttons.editItemButton, //编辑页添加删行button
                editPageCard: model.options.cards.editCard, //编辑页选项

                //商品信息
                gridGoodsEdit: model.options.grids.gridGoodsEdit, //编辑页table展示项
                gridGoodsDetail: model.options.grids.gridGoodsDetail, //详情页table
                //BOM结构信息
                gridBomEdit: model.options.grids.gridBomEdit, //编辑页table展示项
                gridBomDetail: model.options.grids.gridBomDetail, //详情页table

                ItemRefList: new u.DataTable(model.options.metas.ItemRef), //编辑页增行table

                detailsButton: model.options.buttons.detailsButton, //详情页按钮 返回、编辑

                detailSource: model.options.details.detail, //详情页选项

                goBillPanel: common.bill.goBillPanel, //跳转单据页
                goDetailPanel: common.bill.goDetailPanel, //跳转详情页 

                billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
                curRowNum: ko.observable(0), // 行号池
                //bom行号池
                curRowBomNum: ko.observable(0),
                // 是否bom页签
                isBomPanel: ko.observable(),
                curDate: ko.observable(),
                formater: new u.NumberFormater(2)
            },
            //按钮方法(table) 操作
            rendertype: {
                //operation: common.rendertype.operation,
                detailRender: common.rendertype.detailRender, //出库单号 加点击事件 事件源  detail
                operation: function (obj) {
                    var billStatusCode = obj.row.value.billStatusCode;
                    var editfun, delfun;
                    var dataTableRowId = obj.row.value['$_#_@_id'];
                    // 未提交的订单才可以编辑和删除
                    if (billStatusCode == billstatus.FREE) {
                        editfun =
                            "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                        delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                    } else {
                        delfun = 'class="disabled"';
                        editfun = 'class="disabled"';
                    }
                    var editHtml = '<span class="ui-handle-word">' + '<a ' +  editfun +  ' title="编辑">编辑</a>' + '</span>';
                    obj.element.innerHTML = '<div class="ui-handle-icon">' +
                        editHtml +
                        '<span class="ui-handle-word">' +
                        '<a ' +
                        delfun +
                        ' title="删除">删除</a>' +
                        '</span></div>';
                    ko.cleanNode(obj.element);
                    ko.applyBindings(viewModel, obj.element);
                },
                billDateComputed: ko.pureComputed(function () {
                    var truetime = viewModel.defaultPage.ref("billDate")();
                    var showtime = u.date.format(truetime, 'YYYY-MM-DD');
                    return showtime;
                }),
                beforeEditCheck: function (obj) {
                    var gridObj = obj.gridObj;
                    // 判断当前货位是否可编辑
                    if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsPositionId"))) {
                        var dt = "defaultPageCard";
                        // 先判断有没有仓库
                        if (viewModel[dt].getValue("storageId")) {
                            // 判断仓库是否启用货位管理
                            if (viewModel[dt].getValue("ifSlotManage") != '1') {
                                toastr.warning("该仓库未开启货位管理");
                                return false;
                            }
                        } else {
                            toastr.warning("请先选择仓库")
                            return false
                        }
                    }
                    //判断是否含有bom
                    var row = obj.rowObj.value;
                    var id = row.goodsId;
                    if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("unitPrice"))) {
                        var bomdata = viewModel.findBomByParentId(id);
                        if (bomdata.length > 0) {
                            toastr.warning("此商品含有BOM结构，请在&lt;BOM结构信息&gt;页签下维护单价");
                            return false;
                        } else {
                            return true
                        }
                    }
                    return true
                }
            },
            //事件
            events: {
                //新增 参照
                showAddRefer: function () {
                    viewModel.searchcomp2.clearSearch();
                    viewModel.referTransferBillSearchParam.removeAllRows();
                    viewModel.removeAllreferRows();
                    if (!viewModel.refertransferbilldialog) {
                        viewModel.refertransferbilldialog = u.dialog({
                            id: 'dialog_refertransferbill',
                            content: "#dialog_refertransferbill",
                            hasCloseMenu: true,
                            width: "85%"
                        });
                        var closefunc = function () {
                            viewModel.referTransferBillSearchParam.removeAllRows();
                            viewModel.referTransferBillList.removeAllRows();
                            viewModel.referTransferBillItemList.removeAllRows();
                            viewModel.refertransferbilldialog.close();
                        }
                        var cancelButton = $("#dialog_refertransferbill .J-cancel");
                        var closeButton = $("#dialog_refertransferbill .u-msg-close");
                        cancelButton.off().on('click', closefunc);
                        closeButton.on('click', closefunc);
                    } else {
                        viewModel.refertransferbilldialog.show();
                    }
                },
                cancelReferTransferBill: function() {
                    viewModel.refertransferbilldialog.close();
                },
                //确定 新增
                confirmReferTransferBill: function () {
                    $("#tab-edit-bom").hide();
                    $("#tab-edit-goods").show();
                    var parentArr = viewModel.selectedreferList.getRealSimpleData();
                    var itemArr = viewModel.selectedreferListItem.getRealSimpleData();
                    if (!itemArr.length) {
                        toastr.warning("请至少选择一条商品");
                        return;
                    }

                    for (var i = 0; i < parentArr.length; i++) {
                        parentArr[i].persistStatus = "nrm";
                        parentArr[i].transferBillItems = [];
                        var BomsArr = parentArr[i].transferBillItemBoms;
                        parentArr[i].transferBillItemBoms = [];
                        for (var j = 0; j < itemArr.length; j++) {
                            itemArr[j].persistStatus = "nrm";
                            if (itemArr[j].transferBillId == parentArr[i].id) {
                                parentArr[i].transferBillItems.push(itemArr[j]);
                                for (var k = 0; k < BomsArr.length; k ++) {
                                    BomsArr[k].persistStatus = "nrm";
                                    if (BomsArr[k].parentGoodsId == itemArr[j].goodsId && BomsArr[k].parentRowNum == itemArr[j].rowNum) {
                                        parentArr[i].transferBillItemBoms.push(BomsArr[k]);
                                    }
                                }
                            }
                        }
                    }
                    viewModel.curRowNum(0);
                    viewModel.curRowBomNum(0);
                    viewModel.queryChildArr(parentArr);
                },
                queryChildArr: function (parentArr) {
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/translate-allocation-out",
                        async: false,
                        data: JSON.stringify(parentArr),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            viewModel.removeAllreferRows();
                            viewModel.index = -1;
                            viewModel.goBillPanel();
                            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                            viewModel.refertransferbilldialog.close();
                            if (!data[0].billDate) {
                              var nowDate = new Date();
                              data[0].billDate = nowDate.getFullYear() + "-" + (nowDate.getMonth()+1) + "-" + nowDate.getDate();
                            }
                            data[0].billStatusCode = '01';
                            data[0].billStatusName = '自由';
                            viewModel.defaultPageCard.setSimpleData(data[0]);
                            viewModel.defaultItemPage.setSimpleData(data[0].transferBillOutItems, {
                                unSelect: true
                            });
                            viewModel.BomItemPage.setSimpleData(data[0].transferOutBillItemBoms, {
                                unSelect: true
                            });
                        }
                    })
                },
                removeAllreferRows: function () {
                    viewModel.referTransferBillList.removeAllRows();
                    viewModel.referTransferBillItemList.removeAllRows();
                    viewModel.selectedreferList.removeAllRows();
                    viewModel.selectedreferListItem.removeAllRows();
                    // viewModel.referPurcasecargoorderList.removeAllRows();
                    // viewModel.referPurchasecargoorderitemList.removeAllRows();
                    // viewModel.selectedrefrtcargooderList.removeAllRows();
                    // viewModel.selectedrefrtcargooderListItem.removeAllRows();
                },

                //页码改变时的回调函数
                pageChangeRefer: function (index) {
                    viewModel.referTransferBillList.pageIndex(index);
                    viewModel.searchRefer();
                },

                //页码改变时的回调函数
                sizeChangeRefer: function (size) {
                    viewModel.referTransferBillList.pageSize(size);
                    viewModel.searchRefer(true);
                },

                //页码改变时的回调函数
                pageChangeRefer3: function (index) {
                    viewModel.referTransferBillItemList.pageIndex(index);
                    viewModel.searchRefer();
                },

                //页码改变时的回调函数
                sizeChangeRefer3: function (size) {
                    viewModel.referTransferBillItemList.pageSize(size);
                    viewModel.searchRefer(true);
                },

                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)  新增参照
                searchRefer: function (reindex) {
                    if (reindex) {
                        viewModel.referTransferBillList.pageIndex(0);
                    }
                    viewModel.referTransferBillList.removeAllRows();
                    viewModel.referTransferBillItemList.removeAllRows();
                    var queryData = viewModel.searchcomp2.getDataWithOpr ? viewModel.searchcomp2.getDataWithOpr() : {};
                    var pageSize = viewModel.referTransferBillList.pageSize();
                    var pageNumber = viewModel.referTransferBillList.pageIndex();
                    queryData.page = pageNumber;
                    queryData.size = pageSize;
                    queryData["pkOrg"] = queryData.search_EQ_pkOrgId;
                    queryData["applyDateStart"] = u.date.format(queryData.search_GTE_billDate_date, 'YYYY-MM-DD');
                    queryData["applyDateEnd"] = u.date.format(queryData.search_LT_billDate_date, 'YYYY-MM-DD');
                    queryData["code"] = queryData.search_LIKE_code;
                    for (var key in queryData) {
                        if (/^search_/g.test(key)) {
                            delete queryData[key];
                        }
                    }
                    $._ajax({
                        type: "get",
                        url: window.pathMap.inventory + '/stock/allocation-bill/get-by-param',
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.referTransferBillList.setSimpleData(data.content, { unSelect: true });
                            viewModel.referTransferBillList.totalRow(data.totalElements);
                            viewModel.referTransferBillList.totalPages(data.totalPages);
                            viewModel.updateSelectedIndices();
                            viewModel.listIndex = null;
                        }
                    })
                },
                // 拉单== 调拨单选中
                referSelectHandle: function (obj) {
                    // 获取商品行信息
                    var items = obj.rowObj.value.transferBillItems.getSimpleData();
                    var selectData = viewModel.referTransferBillList.getCurrentRow().getSimpleData();
                    viewModel.selectedreferList.setSimpleData(selectData, {
                        unSelect: true
                    });
                    viewModel.referTransferBillItemList.setSimpleData(items, {
                        unSelect: true
                    });
                },
                // 拉单== 调拨单取消选中
                referUnSelectHandle: function (obj) {
                    var id = obj.rowObj.value.id;
                    var itemrows = viewModel.referTransferBillItemList.getAllRows();
                    var rows = viewModel.selectedreferList.getAllRows();
                    var selectedItem = viewModel.selectedreferListItem.getAllRows();
                    
                    for (var i = itemrows.length - 1; i >= 0; i--) {
                        if (itemrows[i].getValue("transferBillId") == id) {
                            viewModel.referTransferBillItemList.removeRows([i], {forceDel: true});
                        }
                    }
                    for (var j = rows.length - 1; j >= 0; j--) {
                        if (rows[j].getValue("id") == id) {
                            viewModel.selectedreferList.removeRows([j], {forceDel: true});
                        }
                    }
                    for (var k = selectedItem.length - 1; k >= 0; k --) {
                        if (selectedItem[k].getValue("transferBillId") == id) {
                            viewModel.selectedreferListItem.removeRows([k], {forceDel: true});
                        }
                    }
                },
                // 选单界面 对应商品信息选中
                referSelectItemHandle: function (obj) {
                    var id = obj.rowObj.value.id;
                    var selectedRows = viewModel.referTransferBillItemList.getSelectedRows();
                    for (var i = 0; i < selectedRows.length; i++) {
                        var itemInfo = selectedRows[i].getSimpleData();
                        if (selectedRows[i].getValue("id") == id) {
                            viewModel.selectedreferListItem.addSimpleData(itemInfo, {
                                unSelect: true
                            });
                        }
                    }
                },
                // 选单界面 对应商品信息取消选中
                referUnSelectItemHandle: function (obj) {
                    var itemId = obj.rowObj.value.id;
                    var itemrows = viewModel.selectedreferListItem.getAllRows();
                    for (var i = itemrows.length - 1; i >= 0; i--) {
                        if (itemrows[i].getValue("id") == itemId) {
                            viewModel.selectedreferListItem.removeRows([i], {
                                forceDel: true
                            });
                        }
                    }
                },
                //清空参照搜索条件
                cleanSearchRefer: function () {
                    viewModel.searchcomp2.clearSearch();
                },
                //自动取数
                autonum: function () {
                    var items = viewModel.defaultItemPage.getAllRealRows();
                    var curRow = viewModel.defaultPage.getCurrentRow();
                    items.map(function (item) {
                        item.setValue("factOutNum", item.getValue("shouldOutNum"));
                    });
                },
                search: function (reindex) { //搜索
                    if (reindex) {
                        viewModel.defaultPage.pageIndex(0);
                    }
                    viewModel.defaultPage.removeAllRows();
                    //queryData  获取查询条件
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    var pageSize = viewModel.defaultPage.pageSize();
                    var pageNumber = viewModel.defaultPage.pageIndex();
                    queryData.page = pageNumber;
                    queryData.size = pageSize;
                    //查询数据
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.baseurl,
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.defaultPage.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.defaultPage.totalRow(data.totalElements);
                            viewModel.defaultPage.totalPages(data.totalPages);
                        }
                    });
                },
                cleanSearch: function () { //清空輸入項
                    viewModel.searchcomp.clearSearch();
                },
                //页码改变时的回调函数
                pageChange: function (index) {
                    viewModel.defaultPage.pageIndex(index);
                    viewModel.search();
                },
                //页码改变时的回调函数
                sizeChange: function (size) {
                    viewModel.defaultPage.pageSize(size);
                    viewModel.search(true);
                },
                beforeEdit: function () { //新增
                    viewModel.index = -1;
                    viewModel.defaultPageCard.removeAllRows();
                    var curRow = viewModel.defaultPageCard.createEmptyRow();
                    viewModel.defaultItemPage.removeAllRows();
                    // 行号设置为0
                    viewModel.curRowNum(0);
                    viewModel.getCurDate(curRow);
                    viewModel.setDefaultValue(curRow);
                    viewModel.goBillPanel();
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                },
                setDefaultValue: function (row) {
                    row.setValue("billStatusCode", "01");
                    row.setValue("billStatusName", "自由");
                },
                del: function (data, rowId) { //删除
                    if (typeof (data) == 'number') {
                        viewModel.defaultPage.setRowSelectbyRowId(rowId);
                    }
                    var ids = [];
                    var rows = viewModel.defaultPage.getSelectedRows();
                    if (rows.length == 0) {
                        toastr.warning("请至少选择一项");
                        return;
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
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function (data) {
                                    viewModel.defaultPage.removeRows(rows);
                                }
                            });
                        }
                    });
                },
                sign: function (obj) { //签字   obj.key = sign ： 签字 cancelsign： 取消签字
                    var defaultPageData = viewModel.defaultPage.getSelectedRows(),
                        requestUrl = obj.key == 'sign' ? '/batch-sign' : '/batch-un-sign';

                    if (defaultPageData.length == 0) {
                        toastr.warning("请至少选择一项数据");
                        return;
                    }
                    var ids = (defaultPageData.map(function (row) {
                        return row.getValue('id');
                    })).join(',');

                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + requestUrl,
                        data: {
                            ids: ids
                        },
                        success: function (data) {
                            toastr.success();
                            for (var i = 0; i < defaultPageData.length; i++) {
                                if (obj.key == 'sign') {
                                    defaultPageData[i].setValue("billStatusCode", "02");
                                    defaultPageData[i].setValue("billStatusName", "已签字");
                                    defaultPageData[i].setValue("siger", data.name);
                                    defaultPageData[i].setValue("signTime", data.time);
                                } else {
                                    defaultPageData[i].setValue("billStatusCode", "01");
                                    defaultPageData[i].setValue("billStatusName", "自由");
                                    defaultPageData[i].setValue("siger", null);
                                    defaultPageData[i].setValue("signTime", null);
                                }
                            }
                        }
                    });
                },
                //转入
                showTransferIn: function (obj) {
                    var selectedRows = viewModel.defaultPage.getSelectedRows();
                    if (selectedRows.length <= 0) {
                        toastr.warning('请选择一项');
                        return;
                    } else if (selectedRows.length > 1) {
                        toastr.warning('只能选择一项');
                        return;
                    }
                    var id = selectedRows[0].getValue('id');
                    var status = selectedRows[0].getValue('transferStatusCode');
                    if (status > '6') {
                        toastr.warning('已执行过转入操作，不能再次转入');
                        return false;
                    }

                    viewModel.findByParentid(id, function (data) {
                        //字段转换为入库字段
                        var newData = u.extend({}, {
                            billDate: data.billDate, //单据日期
                            stockOrgId: data.pkOrgId, //库存组织
                            storageId: data.inStorageId, //入库仓库
                            ifSlotManage: data.inIfSlotManage, //是否启用货位管理
                            bizPersonId: data.inBizPersonId, //业务员
                            bizPersonName: data.inBizPersonName, //业务员
                            deparmentId: data.inDeptId, //部门
                            billStatusCode: "01", //状态
                            billStatusName: "自由", //状态
                            planArriveDate: data.planArriveDate, //要求到货日期
                            totalFactInNum: data.totalFactInNum, //实入总数量
                            remark: data.remark,
                            billType: "TransferIn",
                            billTranTypeId: "TransferIn"
                        });
                        var newSubData = [];
                        if (data.transferBillItems && data.transferBillItems.length > 0) {
                            newSubData = data.transferBillItems.map(function (item) {
                                return u.extend({}, {
                                    rowNum: item.rowNum, //行号
                                    goodsId: item.goodsId, //商品Id
                                    goodsCode: item.goodsCode, //商品编码
                                    goodsName: item.goodsName, //商品名称
                                    enableBatchNumberManage: item.enableBatchNumberManage,
                                    productLineId: item.productLineId,
                                    productId: item.productId,
                                    unitId: item.unitId,
                                    unitCode: item.unitCode,
                                    batchCodeId: item.batchCodeId,
                                    batchCodeName: item.batchCodeCode,
                                    unitName: item.unitName, //单位
                                    shouldInNum: item.transferNum, //应入数量（来源应转数量）
                                    factInNum: item.totalOutNum, //实入数量(来源于转库单表体的累计已出库数量)
                                    price: item.price, //单价
                                    amountMoney: item.amountMoney, //金额
                                    batchNumId: item.batchNumId, //批次号
                                    batchNumCode: item.batchNumCode, //批次号
                                    firstBillCode: data.id,
                                    firstBillBcode: item.id,
                                    firstBillType: "Transfer",
                                    srcBillCode: data.id,
                                    srcBillBcode: item.id,
                                    srcBillType: "Transfer"
                                });
                            });
                        }
                        //渲染数据
                        viewModel.transferInCard.setSimpleData(newData);
                        viewModel.transferInItems.setSimpleData(newSubData, {
                            unSelect: true,
                            status: 'new'
                        });
                        viewModel.setInCondition();
                        viewModel.calcItemTotal("in");
                        viewModel.goInBillPanel();
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                    });
                },
                //编辑
                showEditBillPanel: function (index, rowId) {
                    $("#tab-edit-bom").hide();
                    $("#tab-edit-goods").show();
                    var row;
                    if (index == -1) {
                        //处理通过详情页编辑进入
                        row = viewModel.defaultPage.getFocusRow();
                        //通过改变index判断当前处于编辑态
                        index = 0;
                    } else {
                        //编辑按钮
                        row = viewModel.defaultPage.getRowByRowId(rowId);
                    }
                    viewModel.index = index;
                    viewModel.rowId = row.rowId;

                    var id = row.getValue("id");
                    //查询子表数据
                    viewModel.findByParentid(id, function (data) {
                        data.transferBillOutItems.forEach(function (item) {
                            item.batchCodeName = item.batchCodeCode;
                            item.batchNumName = item.batchNumCode;
                        });
                        data.transferOutBillItemBoms.forEach(function (item) {
                            item.batchCodeName = item.batchCodeCode;
                            item.batchNumName = item.batchNumCode;
                        });
                        viewModel.defaultPageCard.setSimpleData(data);
                        viewModel.defaultItemPage.setSimpleData(data.transferBillOutItems, {
                            unSelect: true
                        });
                        viewModel.BomItemPage.setSimpleData(data.transferOutBillItemBoms, {
                            unSelect: true
                        });
                        // 获得当前最大行号
                        viewModel.getCurRowNum();
                        viewModel.getBomCurrowNum();
                        viewModel.seteidtCondition();
                        viewModel.goBillPanel();
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                    });
                },
                seteidtCondition: function () {
                    var pkOrgId = viewModel.defaultPageCard.getValue("stockOrgId");
                    var storehouseId = viewModel.defaultPageCard.getValue("storageId");
                    viewModel.changeCondition("outCardStorageId", {
                        "EQ_isEnable": "1"
                    }, {
                            "EQ_inventoryOrg.id": pkOrgId
                        })
                    viewModel.defaultItemPage.setMeta("goodsPositionId", "refparam",
                        '{"EQ_wareHouse":"' + storehouseId + '","EQ_isFinal":"1"}');
                },
                //查询子页面数据
                findByParentid: function (id, callback) {
                    $._ajax({
                        url: appCtx + viewModel.baseurl + "/findByParentid",
                        type: 'get',
                        data: {
                            id: id
                        },
                        success: function (data) {
                            if (data) {
                                if (callback && typeof callback == "function") {
                                    callback(data);
                                }
                            } else {
                                toastr.error();
                            }
                        }
                    });
                },
                //选择商品页签
                checkGoods: function () {
                    viewModel.isBomPanel(true);
                    if (viewModel.billPanelStatus() === "detail") {
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
                    if (viewModel.billPanelStatus() === "detail") {
                        $("#tab-detail-bom").show();
                        $("#tab-detail-goods").hide();
                    } else {
                        $("#tab-edit-bom").show();
                        $("#tab-edit-goods").hide();
                    }
                },
                // 获得当前最大行号
                getCurRowNum: function () {
                    var data = viewModel.defaultItemPage.getSimpleData();
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
                // 从行号池中拿到最新的行号
                generateRownum: function () {
                    var latestnum = viewModel.curRowNum(),
                        newnum = latestnum + 10;
                    viewModel.curRowNum(newnum);
                    return newnum;
                },

                // 从行号池中拿到最新的bom行号
                generateBomrowNum: function () {
                    var latestnum = viewModel.curRowBomNum(),
                        newnum = parseFloat(latestnum) + 10;
                    viewModel.curRowBomNum(newnum);
                    return newnum;
                },
                getBomCurrowNum: function () {
                    var data = viewModel.BomItemPage.getSimpleData();
                    var maxrowNum = 0;
                    if (data && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].rowNum > maxrowNum) {
                                maxrowNum = data[i].rowNum;
                            }
                        }
                    }
                    viewModel.curRowBomNum(maxrowNum);
                },

                //返回列表
                retListPanel: function () {
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
                    var tabDom = $(".u-tabs__tab-bar");
                    if (tabDom && tabDom.length > 0) {
                        tabDom.each(function (i, item) {
                            var childDoms = item.children;
                            $(childDoms).each(function (i, item) {
                                $(item).removeClass("is-active");
                            })
                            $("#tabEditGoods").addClass("is-active");
                            $("#tabDetailGoods").addClass("is-active");
                            $("#tab-edit-goods").hide();
                        })
                    }
                    common.bill.retListPanel();
                },
                //编辑页保存
                saveBill: function () {
                    var resultData = viewModel.validateBill();
                    if (resultData) {
                        // 组装数据
                        var currentRow,
                            ajaxType,
                            index = viewModel.index,
                            defaultPageData = viewModel.defaultPageCard.getSimpleData()[0],
                            defaultItemPageData = viewModel.defaultItemPage.getSimpleData(),
                            BomItemsData = viewModel.BomItemPage.getSimpleData();
                        if (viewModel.index === -1) {
                            defaultItemPageData.forEach(function (item) {
                                item.persistStatus = 'new';
                            });
                            BomItemsData.forEach(function (item) {
                                item.persistStatus = 'new';
                            });
                        }
                        defaultPageData.transferBillOutItems = defaultItemPageData;
                        defaultPageData.transferOutBillItemBoms = BomItemsData;
                        var url = appCtx + viewModel.baseurl;

                        if (index >= 0) {
                            ajaxType = "put";
                            // url=appCtx + viewModel.baseurl+"/edSave";
                        } else {
                            ajaxType = "post";
                        }
                        // 提交
                        $._ajax({
                            url: url,
                            type: ajaxType,
                            data: JSON.stringify(defaultPageData),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                common.dialog.stockConfirmDialog(data, function () {
                                    // 回写界面
                                    if (index >= 0) {
                                        //获取需要修改的行
                                        currentRow = viewModel.defaultPage.getRowByRowId(viewModel.rowId);
                                    } else {
                                        //添加数据
                                        currentRow = viewModel.defaultPage.createEmptyRowF();
                                    }
                                    currentRow.setSimpleData(data);
                                    viewModel.retListPanel();
                                    toastr.success("保存成功");
                                });
                            }
                        });
                    }
                },
                setValueToBom: function (obj) {
                    var allrows = viewModel.BomItemPage.getAllRealRows();
                    for (var i = 0; i < allrows.length; i++) {
                        var nameField = obj.field.replace("Id", "Name");
                        var idField = obj.field;
                        var display = obj.rowObj.data[idField].meta
                        if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                            allrows[i].setValue(obj.field, obj.newValue);
                            allrows[i].setValue(nameField, display ? display.display : obj.rowObj.data[nameField].value)
                        }
                    }
                },
                //获取编辑页信息及校验
                validateBill: function () {
                    var validate = $(".ui-bill-panel")[0];
                    var result = app.compsValidateMultiParam({
                        element: validate,
                        showMsg: true
                    });
                    if (result.passed) {
                        var rows = viewModel.defaultItemPage.getAllRealRows();
                        if (rows && rows.length > 0) {

                        } else {
                            toastr.warning("至少添加一个商品");
                            return false;
                        }
                        if (!viewModel.checkEmpty()) {
                            return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                },
                //判断商品行仓库和批次号
                checkEmpty: function () {
                    var allItemRows = viewModel.defaultItemPage.getAllRealRows();
                    var ifSlotManage = viewModel.defaultPage.getValue("ifSlotManage");
                    var emptyPositionRows = "",
                        goodsPositionPassed;
                    if (allItemRows.length > 0) {
                        allItemRows.forEach(function (item) {
                            if (!item.getValue("goodsPositionId") && parseFloat(ifSlotManage) === 1) {
                                var row2Num = item.getValue("rowNum");
                                emptyPositionRows += row2Num + ",";
                            }
                        });
                        goodsPositionPassed = !emptyPositionRows;
                        emptyPositionRows = emptyPositionRows.slice(0, emptyPositionRows.length - 1);
                        if (!goodsPositionPassed) {
                            toastr.warning("请为行号" + emptyPositionRows + "的商品选择货位");
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                //编辑页增行
                showAddItemsRef: function () {
                    viewModel.clearItemsRef();
                    $("#addItemsRef .refer").trigger("click");
                },
                //清空已选销售产品参照
                clearItemsRef: function () {
                    viewModel.ItemRefList.setValue("goodsref", "");
                    var refer = $("#refContainergoodsref").data("uui.refer");
                    refer.uncheckAll();
                    refer.setValue([]);
                },
                //编辑页删除
                delItems: function () {
                    var selectedRows = viewModel.defaultItemPage.getSelectedRows();
                    if (selectedRows.length == 0) {
                        toastr.warning("请选择一条数据");
                        return;
                    }
                    viewModel.defaultItemPage.removeRows(selectedRows);
                },
                // 服务器时间获取
                getCurDate: function (row) {
                    $._ajax({
                        type: "post",
                        url: appCtx + '/stock/common/get-current-date',
                        success: function (data) {
                            var truetime = u.date.format(data, 'YYYY/MM/DD');
                            truetime = new Date(truetime).getTime();
                            if (row) {
                                row.setValue("billDate", truetime);
                            }
                            viewModel.curDate(truetime);
                        }
                    });
                },
                //tbale 出库单号点击去详情
                detail: function () {
                    $("#tab-detail-bom").hide();
                    $("#tab-detail-goods").show();
                    setTimeout(function () {
                        var curRow = viewModel.defaultPage.getCurrentRow(),
                            id = curRow.getValue('id');

                        viewModel.findByParentid(id, function (data) {
                            data.transferBillOutItems.forEach(function (item) {
                                item.batchCodeName = item.batchCodeCode;
                                item.batchNumName = item.batchNumCode;
                            });
                            data.transferOutBillItemBoms.forEach(function (item) {
                                item.batchCodeName = item.batchCodeCode;

                                item.batchNumName = item.batchNumCode;
                            });
                            curRow.setSimpleData(data);
                            viewModel.defaultItemPage.setSimpleData(data.transferBillOutItems, {
                                unSelect: true
                            });
                            viewModel.BomItemPage.setSimpleData(data.transferOutBillItemBoms, {
                                unSelect: true
                            });
                        });

                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                        viewModel.goDetailPanel();
                    }, 0);
                },
                //详情页 -- 编辑
                detail2bill: function () {
                    $("#tab-edit-bom").hide();
                    $("#tab-edit-goods").show();
                    var row = viewModel.defaultPage.getCurrentRow();
                    viewModel.showEditBillPanel(0, row.rowId);
                },
                //判断当前数据是否已取消，非签字或取消签字状态（其他状态详情页没有编辑按钮）
                canEdit: function () {
                    var billStatusCode = viewModel.defaultPage.ref("billStatusCode")();
                    if (billStatusCode == billstatus.FREE) {
                        return true;
                    } else {
                        return false;
                    }
                },
                calcItemTotal: function () {
                    var rows = viewModel.defaultItemPage.getAllRealRows();
                    var totalfactOutAmount = 0;
                    if (u.isArray(rows) && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            totalfactOutAmount += parseFloat(rows[i].getValue("factOutNum") || 0);
                        }
                        totalfactOutAmount = viewModel.formater.format(totalfactOutAmount);
                    }
                    viewModel.defaultPageCard.setValue("totalFactOutNum", totalfactOutAmount);
                },
                changeCondition: function (domid, oldcondition, newcondition) {
                    $("#" + domid).parent().attr("data-refparam", JSON.stringify(
                        u.extend({},
                            oldcondition,
                            newcondition
                        )
                    ));
                },
                findBomByParentId: function (id) {
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
                backClac: function (obj, field) {
                    // 1. 修改数量 获取当前行 parentGoodsId
                    // 2. 遍历所有行取出parentGoodsId 一样的所有行
                    // 3. 取出所有行里面的 amount ，并且相加
                    // 4. 获取商品行goodsid 和 parentGoodsId一样的行
                    // 5. 把第三步相加的和赋值给 商品行的amount  obj.rowObj

                    var parentRowNum = obj.rowObj.getValue("parentRowNum");
                    var BomItemRows = viewModel.BomItemPage.getAllRealRows();
                    var productItemRows = viewModel.defaultItemPage.getAllRealRows();
                    var oneParentBomRows = [], oneParentBomSum = 0;
                    BomItemRows.forEach(function (item) {
                        if (item.getValue("parentRowNum") == parentRowNum) {
                            oneParentBomRows.push(item);
                        }
                    });
                    oneParentBomRows.forEach(function (item) {
                        if (field === "unitPrice") {
                            var childGoodsQty = item.getValue("childGoodsQty") ? item.getValue("childGoodsQty") : 1;
                            oneParentBomSum = oneParentBomSum + (parseFloat(item.getValue(field) ? item.getValue(field) : 0)) * childGoodsQty;
                        } else {
                            oneParentBomSum = oneParentBomSum + parseFloat(item.getValue(field) ? item.getValue(field) : 0);
                        }
                    });
                    productItemRows.forEach(function (item) {
                        if (item.getValue("rowNum") == parentRowNum) {
                            item.setValue(field, oneParentBomSum)
                        }
                    })
                },
                // 选配
                goodsOpt: function (obj) {
                    var viewModel = obj.gridObj.viewModel;
                    var goodsSelectionDescription = obj.row.value.goodsSelectionDescription;   // 选配id
                    var optName = goodsSelectionDescription ? goodsSelectionDescription : '添加选配';
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
                    var goodsSelection = obj.row.value.goodsSelection;   // 选配id
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
                goodsOptionalFun: function (obj) {
                    /**
                     * @example 编辑选配common.goodsOptional.goodsOptional()
                     * @param viewModel 当前viewModel, 用来挂载dialog
                     * @param title     弹窗title
                     * @param goodsId   商品行Id
                     * @param el        dialog id (不加 ‘#’)
                     * @param callback  确定是回调函数*   需要把信息保存到订单杭上， 如果是新增，就调用当前功能新增接口，编辑同理
                     * @example callback --> 保存后拿到选配id 饭后添加到订单行上
                     * @param  callback --> 保存后的选配信息做展示
                     * @param  callback --> 保存后的选配信息做展示
                     * @param  callback --> 成功后调取回调，关闭弹窗
                     */
                    var data = viewModel.defaultItemPage.getSimpleData()[obj];
                    var thisDatable = viewModel.defaultItemPage.getAllRealRows()[obj];
                    var id = data.goodsId;
                    var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
                    common.goodsOptional.goodsOptional(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptional', viewModel.defaultItemPage, viewModel.BomItemPage, function (goodsOptData, goodsOptID, cb) {
                        /**
                         * 循环遍历返回结果，拼接后展示
                         */
                        var goodsOpt = goodsOptID[0].goodsOptDtos;           // 选配与商品结构互斥，暂时理解为有子件的话不会出现选配信息 故只去第0项
                        //获取全部bom信息
                        var allrows = viewModel.BomItemPage.getAllRealRows();
                        var bomdata = viewModel.BomItemPage.getRealSimpleData();
                        //获取全部bom信息
                        for (var i = 0; i < bomdata.length; i++) {
                            for (var j = 0; j < goodsOpt.length; j++) {
                                if (bomdata[i].goodsId == goodsOpt[j].goodsId) {
                                    allrows[i].setValue("goodsSelection", goodsOpt[j].id);
                                    allrows[i].setValue("goodsSelectionDescription", goodsOpt[j].optResult);
                                }
                            }
                        }
                        var optResult = '', id = '';
                        for (var i = 0; i < goodsOpt.length; i++) {
                            optResult += goodsOpt[i].optResult + ',';
                            id += goodsOpt[i].id + ',';
                        }
                        optResult = optResult.substr(0, optResult.length - 1);
                        id = id.substr(0, id.length - 1);
                        thisDatable.setValue('goodsSelection', id);
                        thisDatable.setValue('goodsSelectionDescription', optResult);
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
                    var data = viewModel.defaultItemPage.getSimpleData()[obj];
                    var id = data.id ? data.id : data.goodsId;
                    var goodsSelection = data.goodsSelection ? data.goodsSelection : "";
                    common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.defaultItemPage, viewModel.BomItemPage);
                },
                updateSelectedIndices: function () {
                    var selectedRows = viewModel.selectedreferList.getAllRows(),
                        selectedIds,
                        selectedIndices = [],
                        rows;
                    if (selectedRows && selectedRows.length > 0) {
                        selectedIds = selectedRows.map(function (row) {
                            return row.getValue("id");
                        })
                        rows = viewModel.referTransferBillList.getAllRows();
                        if (rows && rows.length > 0) {
                            for (var i = 0; i < rows.length; i++) {
                                var id = rows[i].getValue("id");
                                if ($.inArray(id, selectedIds) > -1) {
                                    selectedIndices.push(i);
                                }
                            }
                        }
                        if (selectedIndices.length > 0) {
                            viewModel.referTransferBillList.setRowsSelect(selectedIndices);
                        }
                    } else {
                        return
                    }
                },
            },
            afterCreate: function () {
                 
                // 子表参照聚焦行，用于绑定子表参照组件
                var refRow = viewModel.ItemRefList.createEmptyRow();
                viewModel.ItemRefList.setRowFocus(refRow);
                // 确定商品参照，为产品组合子表增行
                viewModel.ItemRefList.on("goodsref.valuechange", function (obj) {
                    // 清空参照时不增行
                    if (!obj.newValue) {
                        return;
                    }
                    var refer = $("#refContainergoodsref").data("uui.refer");
                    var refValues = refer.values;
                    if (refValues && refValues.length > 0) {
                        for (var i = 0; i < refValues.length; i++) {
                            var id = refValues[i].refpk;
                            var row = viewModel.defaultItemPage.getRowByField("goodsId", id);
                            if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
                                var newrow = viewModel.defaultItemPage.createEmptyRow();
                                newrow.setValue("rowNum", viewModel.generateRownum());
                                newrow.setValue("goodsId", refValues[i].refpk);
                                newrow.setValue("goodsCode", refValues[i].refcode);
                                newrow.setValue("goodsName", refValues[i].refname);
                                newrow.setValue("goodsVersion", refValues[i].version);
                            }
                        }
                    }
                });
                //转库出库组织和仓库联动 
                viewModel.defaultPageCard.on("stockOrgId.valuechange", function (obj) {
                    var pkOrgId = obj.newValue;
                    if (pkOrgId) {
                        viewModel.changeCondition("outCardStorageId", {
                            "EQ_isEnable": "1"
                        }, {
                                "EQ_inventoryOrg.id": pkOrgId
                            });
                        // 仓库不可点，选择完库存组织后可点击
                        $("#outCardStorageId").attr('placeholder', "");
                        viewModel.defaultPageCard.setMeta("storageId", "enable", true);
                    } else {
                        viewModel.changeCondition("outCardStorageId", {
                            "EQ_isEnable": "1"
                        }, {});
                        // 仓库不可点，选择完库存组织后可点击
                        $("#outCardStorageId").attr('placeholder', "请先选择库存组织");
                        viewModel.defaultPageCard.setMeta("storageId", "enable", false);
                    }
                    if (!obj.ctx) {
                        viewModel.defaultPageCard.setValue("storageId", null);
                    }
                });
                // 转库出库仓库和货位联动
                viewModel.defaultPageCard.on("storageId.valuechange", function (obj) {
                    if (obj.newValue) {
                        var refer = $("#refContaineroutCardStorageId").data("uui.refer");
                        if (refer.values && refer.values.length > 0) {
                            var trueValue = refer.values[0];
                            if (!viewModel.defaultPageCard.getValue("stockOrgId") ||
                                viewModel.defaultPageCard.getValue("stockOrgId") != trueValue.inventoryOrgId) {
                                viewModel.defaultPageCard.getFocusRow().setValue("stockOrgId", trueValue.inventoryOrgId, true);
                            }
                            // 更新货位管理状态
                            viewModel.defaultPageCard.setValue("ifSlotManage", trueValue.ifSlotManage);
                            // 更新货位状态
                            viewModel.defaultItemPage.setMeta("goodsPositionId", "refparam",
                                '{"EQ_wareHouse":"' + obj.newValue + '","EQ_isFinal":"1"}');
                        }
                    } else {
                        // 更新批次管理状态
                        viewModel.defaultPageCard.setValue("ifSlotManage", '0');
                    }
                    // 若仓库变化则清空之前选择的货位
                    if (obj.oldValue && obj.oldValue != obj.newValue) {
                        var itemrows = viewModel.defaultItemPage.getAllRows();
                        if (itemrows && itemrows.length > 0) {
                            itemrows.forEach(function (row) {
                                if (row.getValue("goodsPositionId")) {
                                    row.setValue("goodsPositionId", null);
                                    row.setValue("goodsPositionName", null);
                                    row.setMeta("goodsPositionId", 'display', null);
                                }
                            })
                        }
                    }
                });
                // 数量联动金额
                viewModel.defaultItemPage.on("factOutNum.valuechange", function (obj) {
                    var row = obj.rowObj;
                    var value = obj.newValue;
                    if (value) {
                        var unitPrice = row.getValue("unitPrice") || 0;
                        var amount = viewModel.formater.format(parseFloat(value) * parseFloat(unitPrice));
                        row.setValue("amountMoney", amount);
                    }
                    viewModel.calcItemTotal();

                    //联动BOM
                    var parentRowNum = obj.rowObj.getValue("rowNum");
                    //获取全部bom信息
                    var allrows = viewModel.BomItemPage.getAllRealRows();
                    for (var i = 0; i < allrows.length; i++) {
                        if (allrows[i].getValue("parentRowNum") == parentRowNum) {
                            var childQty = allrows[i].getValue("childGoodsQty") ? allrows[i].getValue("childGoodsQty") : 1;
                            var bomAmount = childQty * obj.newValue;
                            allrows[i].setValue("factOutNum", bomAmount)
                        }
                    }

                });
                viewModel.defaultItemPage.on("unitPrice.valuechange", function (obj) {
                    var row = obj.rowObj;
                    var value = obj.newValue;
                    if (value) {
                        var factOutNum = row.getValue("factOutNum") || 0;
                        var amount = viewModel.formater.format(parseFloat(value) * parseFloat(factOutNum));
                        row.setValue("amountMoney", amount);
                    }
                    var parentGoodsId = obj.rowObj.getValue("goodsId");
                    var parentRowNum = obj.rowObj.getValue("rowNum");
                    //获取全部bom信息
                    var allrows = viewModel.BomItemPage.getAllRealRows();
                    for (var i = 0; i < allrows.length; i++) {
                        if (allrows[i].getValue("parentRowNum") == parentRowNum && allrows[i].getValue("goodsId") == parentGoodsId) {
                            var unitPrice = obj.newValue;
                            allrows[i].setValue("unitPrice", unitPrice);
                        }
                    }
                });
                viewModel.BomItemPage.on("unitPrice.valuechange", function (obj) {
                    var row = obj.rowObj;
                    var unitPrice = 0;
                    if (obj.newValue != undefined) {
                        unitPrice = obj.newValue
                    }
                    var amount = viewModel.formater.format(parseFloat(unitPrice) * parseFloat(row.getValue("factOutNum")));
                    row.setValue("amountMoney", amount);
                    viewModel.backClac(obj, obj.field);
                })
                //批次号 货位  供应商 项目 库存状态 客户
                viewModel.defaultItemPage.on("valuechange", function (obj) {
                    if (obj.field === "batchNumId"
                        || obj.field === "goodsPositionId"
                        || obj.field === "batchNumId"
                        || obj.field === "supplierId"
                        || obj.field === "projectId"
                        || obj.field === "stockStateId"
                        || obj.field === "demandStockOrgId"
                        || obj.field === "receiveStorageOrgId"
                        || obj.field === "receiveStorageId"
                        || obj.field === "customerId"
                    ) {
                        viewModel.setValueToBom(obj);
                    }
                });



                //搜索条件 库存组织仓库过滤
                viewModel.searchcomp.viewModel.params.on("stockOrg.valuechange", function (obj) {
                    if (obj.newValue != undefined && obj.newValue != "") {
                        var stockOrgId = {
                            "EQ_inventoryOrg.id": obj.newValue
                        };
                        $("#warehouseOut").attr("data-refparam", JSON.stringify(stockOrgId));
                    } else {
                        $("#warehouseOut").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
                        viewModel.searchcomp.viewModel.params.setValue("storage", "");
                    }
                })
            }
        });
    return view;

});