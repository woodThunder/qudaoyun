define(['ocm_common'], function (common) {
    'use strict';
    var events = function (viewModel, model, CONST) {
        return {
            // 采购入库单
            purchaseList: new u.DataTable(model.options.metas.complex),
            purchaseItems: new u.DataTable(model.options.metas.complexItem),
            purchaseBomItems: new u.DataTable(model.options.metas.BomItem),

            purchaseBillPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),

            purchaseDialog1Source: model.options.dialogs.dialog1,
            purchaseCard1Source: model.options.cards.card1,

            arrivalBelongDataSource: ko.observableArray([]),
            orderTypeSource: ko.observableArray([]),
            purchaseTypeSource: ko.observableArray([]),

            pageAdd: ko.observableArray([]),
            pageModel: {
                totalPages: ko.observable(0),
                pageSize: ko.observable(0),
                pageIndex: ko.observable(0),
                totalRow: ko.observable(0),
                hasPage: ko.observable(0),
                setCurrentPage: ko.observable(0),
            },
            status: ko.pureComputed(function () {
                var enableStatus = viewModel.purchaseList.ref("status")();
                enableStatus = parseFloat(enableStatus);
                switch (enableStatus) {
                    case 1:
                        return "待处理";
                    case 2:
                        return "已提交审批";
                    case 3:
                        return "审批中";
                    case 4:
                        return "审批通过";
                    case 5:
                        return "审批不通过";
                    case 6:
                        return "部分入库";
                    case 7:
                        return "全部入库";
                    case 8:
                        return "部分出库";
                    case 9:
                        return "全部出库";
                    default:
                }
            }),
            billDateComputed: ko.pureComputed(function () {
                var truetime = viewModel.purchaseList.ref("orderDate")();
                var showtime = u.date.format(truetime, 'YYYY-MM-DD');
                return showtime;
            }),
            selfLifingComputed: ko.pureComputed(function () {
                var selfLifingValue = viewModel.purchaseList.ref("selfLifing")();
                var showName = selfLifingValue === 1 ? "是" : "否";
                return showName;
            }),

            //选择商品页签
            purchaseCheckGoods: function () {
                viewModel.isBomPanel(true);
                $("#tab-purchase-panel-2").hide();
                $("#tab-purchase-panel-1").show();
            },
            //选择Bom页签
            purchaseCheckBom: function () {
                viewModel.isBomPanel(false);
                $("#tab-purchase-panel-2").show();
                $("#tab-purchase-panel-1").hide();
            },
            // 补货
            purchaseorderHandle: function () {
                $("#tab-purchase-panel-2").hide();
                $("#tab-purchase-panel-1").show();
                var rows = viewModel.salesorderList.getSelectedRows();
                if (rows && rows.length > 0) {
                    var _orderType = '';
                    var uniqOrderType = true;
                    var ids = rows.map(function (row) {
                        var thisOrderType = row.getValue("orderTypeId");
                        if (_orderType && _orderType !== thisOrderType) {
                            uniqOrderType = false;
                            return false;
                        }
                        _orderType = thisOrderType;
                        return row.getValue("id");
                    });
                    if (!uniqOrderType) {
                        toastr.warning("批量货补需订单类型一致");
                        return;
                    }

                    viewModel.currowNum(0);
                    viewModel.currowBomNum(0);
                    viewModel.queryChildArr(ids);
                    viewModel.index = -1;
                    viewModel.pageModel.pageIndex(0);
                    viewModel.goPurchaseBillPanel();
                    viewModel.purchaseBillPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            // 根据主键查询销售订单，并转换成采购订单数据
            queryChildArr: function (ids) {
                // todo...
                // var data = viewModel.purchaseDatas;
                // var curRow = viewModel.purchaseList.createEmptyRowF();
                // viewModel.purchaseList.setRowFocus(curRow);
                // viewModel.purchaseList.getFocusRow().setSimpleData(data[0]);
                // viewModel.purchaseItems.setSimpleData(data[0].orderItems, {status:"new"});
                // viewModel.purchaseBomItems.setSimpleData(data[0].orderItemBoms, {status:"new"});
                // viewModel.pageAdd(data);
                // viewModel.pageModel.totalPages(data.length);
                // return false;
                var id = ids.join(",");
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/fillGoodsTogether",
                    async: false,
                    data: {
                        id: id
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        // DAVCO-61 将 state 为 null 的数据 默认设置为 待处理
                        if (data && data.length > 0) {
                            data.forEach(function (item) {
                                if (null === item.state) item.state = 0;
                            })
                        }
                        var curRow = viewModel.purchaseList.createEmptyRowF();
                        viewModel.purchaseList.setRowFocus(curRow);
                        data[0].status = "01";
                        viewModel.purchaseList.getFocusRow().setSimpleData(data[0]);
                        viewModel.purchaseItems.setSimpleData(data[0].orderItems, {status: "new"});
                        viewModel.purchaseBomItems.setSimpleData(data[0].orderItemBoms, {status: "new"});
                        viewModel.pageAdd(data);
                        viewModel.pageModel.totalPages(data.length);
                    }
                })
            },
            goPurchaseBillPanel: function () {
                $(".ui-panel").hide();
                $(".ui-purchaseorder-panel").show();
                $(".ui-purchaseorder-panel").animateCss("fadeIn");
            },
            retPurchaseListPanel: function () {
                $(".ui-panel").hide();
                $(".ui-list-panel").show();
                $(".ui-list-panel").animateCss("fadeIn");
            },
            //保存单据
            savePurchaseBill: function () {
                var index = viewModel.index;
                var validate = $(".ui-purchaseorder-panel")[0];
                var result = viewModel.app.compsValidateMultiParam({
                    element: validate,
                    showMsg: true
                });
                if (!result.passed) {
                    toastr.warning(result.notPassedArr[0].Msg);
                    return;
                }
                ;
                var trantypeRef = $("#refContainertrantypeRef").data("uui.refer").values[0];
                var complexData = viewModel.purchaseList.getCurrentRow().getSimpleData();

                if (trantypeRef) {
                    //判断保存即审批逻辑
                    if (trantypeRef.saveAsApprove === "01") {
                        complexData.status = "04"; //"保存即审批"
                    } else {
                        complexData.status = "01"; //”待处理“
                        complexData.approveStatus = "01"; //”待处理“
                    }
                    //判断是否自提逻辑
                    if (trantypeRef.needSelfLifting === "01") {
                        complexData.selfLifing = "01"
                    } else {
                        complexData.selfLifing = "02"
                    }
                }
                // 补充默认字段
                complexData.isEc = "02";
                complexData.isReturned = 0;
                complexData.isClosed = 0;
                complexData.purchaseType = "InnerPurchase";
                var purchaseItemsData = viewModel.purchaseItems.getSimpleData();
                var purchaseBomItemsData = viewModel.purchaseBomItems.getSimpleData();
                purchaseItemsData.forEach(function (item) {
                    item.stockStatus = "01";
                    item.isClosed = 0;
                });
                purchaseBomItemsData.forEach(function (item) {
                    item.persistStatus = "new";
                    item.isClosed = 0;
                });
                complexData.orderItems = purchaseItemsData;
                complexData.orderItemBoms = purchaseBomItemsData;
                $._ajax({
                    url: window.pathMap.purchase + "/purchase/orders",
                    type: "post",
                    data: JSON.stringify(complexData),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var curIndex = viewModel.pageModel.pageIndex();
                        viewModel.pageAdd().splice(curIndex, 1);
                        viewModel.pageAdd(viewModel.pageAdd());
                        viewModel.pageModel.totalPages(viewModel.pageAdd().length);
                        if (curIndex === viewModel.pageAdd().length) {
                            viewModel.beforPageChangeFun(curIndex - 1);
                            if (viewModel.pageModel.totalPages() === 0) {
                                viewModel.retPurchaseListPanel();
                                viewModel.search();
                            }
                        } else {
                            viewModel.beforPageChangeFun(curIndex);
                        }
                    }
                })
            },
            beforPageChangeFun: function (index) {
                var pagedataArr = viewModel.pageAdd();
                var flag = false;
                viewModel.currowNum(0);
                viewModel.currowBomNum(0);
                var Row = viewModel.purchaseList.getCurrentRow();
                var status = Row.status;
                // todo...
                // if(status != 'nrm'&&status != 'new'){
                //   flag = true;
                // }
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
                            viewModel.purchaseList.setSimpleData(pagedataArr[index]);
                            viewModel.purchaseItems.setSimpleData(pagedataArr[index].orderItems, {status: "new"});
                            viewModel.purchaseBomItems.setSimpleData(pagedataArr[index].orderItemBoms, {status: "new"});
                        }
                    });
                } else {
                    viewModel.pageModel.pageIndex(index);
                    var curRow = viewModel.purchaseList.getCurrentRow();
                    viewModel.purchaseList.removeRow(curRow);
                    for (var j = 0; j < pagedataArr.length; j++) {
                        if (j === index) {
                            var nextRow = viewModel.purchaseList.createEmptyRowF();
                            viewModel.rowId = nextRow.rowId;
                            viewModel.purchaseList.setRowFocus(nextRow);
                            nextRow.setSimpleData(pagedataArr[j]);
                            viewModel.purchaseItems.setSimpleData(pagedataArr[j].orderItems, {status: "new"});
                            // var itemrows = viewModel.purchaseItems.getAllRows();
                            // itemrows.forEach(function (item) {
                            //   var rowNum = viewModel.generaterowNum();
                            //   item.setValue("rowNum", rowNum);
                            // });
                            // bom行的添加
                            viewModel.purchaseBomItems.setSimpleData(pagedataArr[j].orderItemBoms, {status: "new"});
                            // var bomitemrows = viewModel.purchaseBomItems.getAllRows();
                            // bomitemrows.forEach(function (item) {
                            //   var rowNum = viewModel.generateBomrowNum();
                            //   item.setValue("rowNum", rowNum);
                            // })
                        }
                    }
                }
                return true;
            },
            addrOk: function () {
                var result = viewModel.addresscardcomp.validate();
                if (!result.passed) return;
                var rows = viewModel.purchaseItems.getCurrentRow(),
                    postdata = viewModel.addresscardcomp.geteidtData();
                rows.setValue('countryId', postdata.countryId);
                rows.setValue('cityId', postdata.cityId);
                rows.setValue('districtId', postdata.districtId);
                rows.setValue('provinceId', postdata.provinceId);
                rows.setValue('townId', postdata.townId);
                rows.setValue('receiveAddress', postdata.receiveAddress);
                rows.setValue('detailAddr', postdata.detailAddr);
                viewModel.addresscardcomp.close();
            },
            sumPrice: function (row) {
                var amount = row.getValue('goodsNum');
                var unitPrice = row.getValue('unitPrice');
                amount == null ? 0 : parseFloat(amount);
                unitPrice == null ? 0 : parseFloat(unitPrice);
                row.setValue("amountMoney", amount * unitPrice);
                return amount * unitPrice;
            },
            backClac: function (obj, field) {
                // 1. 修改数量 获取当前行 parentGoodsId
                // 2. 遍历所有行取出parentGoodsId 一样的所有行
                // 3. 取出所有行里面的 amount ，并且相加
                // 4. 获取商品行goodsid 和 parentGoodsId一样的行
                // 5. 把第三步相加的和赋值给 商品行的amount  obj.rowObj

                var parentId = obj.rowObj.getValue("parentGoodsId");
                var notBomItem;
                if (!(obj.rowObj.getValue("parentGoodsId"))) {
                    notBomItem = obj.rowObj.getValue("goodsId");
                }
                var BomItemRows = viewModel.purchaseBomItems.getAllRealRows();
                var productItemRows = viewModel.purchaseItems.getAllRealRows();
                var oneParentBomRows = [], oneParentBomSum = 0;
                BomItemRows.forEach(function (item) {
                    if (item.getValue("parentGoodsId") === parentId) {
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
                    if (item.getValue("goodsId") === parentId) {
                        item.setValue(field, oneParentBomSum)
                    } else if (notBomItem === item.getValue("goodsId")) {
                        item.setValue(field, obj.newValue);
                    }
                })
            },
            setValueToBom: function (obj) {
                var parentGoodsId = obj.rowObj.getValue("goodsId");
                var bomdata = viewModel.purchaseBomItems.getSimpleData();
                for (var i = 0; i < bomdata.length; i++) {
                    var allrows = viewModel.purchaseBomItems.getAllRealRows();
                    var nameField = obj.field.replace("Id", "Name");
                    var idField = obj.field;
                    var display = obj.rowObj.data[idField].meta
                    if (bomdata[i].parentGoodsId === parentGoodsId && (allrows[i].getValue("parentGoodsName"))) {
                        //含有包件
                        allrows[i].setValue(obj.field, obj.newValue);
                        allrows[i].setValue(nameField, display ? display.display : obj.rowObj.data[nameField].value)
                    } else {
                        //不含有包件
                        if (allrows[i].getValue("goodsId") === parentGoodsId && !(allrows[i].getValue("parentGoodsName"))) {
                            allrows[i].setValue(obj.field, obj.newValue);
                            allrows[i].setValue(nameField, display ? display.display : obj.rowObj.data[nameField].value)
                        }
                    }
                }
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
            goodsOptDetailsFun: function (obj) {
                /**
                 * @example 查看选配common.goodsOptional.OptionalDetails()
                 * @param viewModel 当前viewModel, 用来挂载dialog
                 * @param title     弹窗title
                 * @param goodsId   商品行Id
                 * @param el        dialog id (不加 ‘#’)
                 */
                var data = viewModel.purchaseItems.getSimpleData()[obj];
                var id = data.goodsId;
                var goodsSelection = data.goodsSelection ? data.goodsSelection : "";

                common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.purchaseItems, viewModel.purchaseBomItems);
            },
        };
    }
    return events;
});
