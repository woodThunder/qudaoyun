define(['text!./priceadjust.html', 'ocm_common', 'ocm_baseview', './meta.js'
, '../../flow/bpmapproveref/bpmopenbill.js',
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl"
], function(tpl, common, baseview, model,bpmopenbill) {
    'use strict'
    var viewModel, app;
    var BILLPANELSTATUS = {
        ADD: "add",
        EDIT: "edit",
        COPY: "copy",
        DETAIL: "detail",
        DEFAULT: "default"
    }
    var view = baseview.extend({
        beforeCreate: function() {
            viewModel = this.viewModel;
            viewModel = _.extend(viewModel, bpmopenbill.model);
            app = this.app;
        },
        tpl: tpl,
        model: model,
        baseData: {
            // 价目表调整
            baseurl: '/price/price-adjusts',
            applicationUrl: "/price/price-adjusts",
            // 价目表调整详情
            detailurl: '/price/price-adjust-items',
            // 价目表定义
            priceurl: '/price/price-lists',
            // 区分是商品明细选中还是明细内的信息变化
            addProductDetailFlag1: false,
            addProductDetailFlag2: false,
            priceAdjustList: new u.DataTable(model.options.metas.priceAdjustmeta),
            priceAdjustCard: new u.DataTable(model.options.metas.priceAdjustmeta),
            priceAdjustDetail: new u.DataTable(model.options.metas.priceAdjustDetailmeta),
            jointAdjustDetail: new u.DataTable(model.options.metas.priceAdjustDetailmeta),
            detailSelectCard: new u.DataTable(model.options.metas.priceAdjustDetailmeta),
            // 自定义价格项数量
            customPriceItemNum: 10,
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            button4Source: model.options.buttons.button4,
            button5Source: model.options.buttons.button5,

            searchcomp: {},
            searchSource: model.options.searchs.search1,
            subsearchcomp: {},
            subsearchSource: model.options.searchs.search2,
            card1Source: model.options.cards.card1,
            card2Source: model.options.cards.card2,
            detail11Source: model.options.details.detail1,

            gridOption: model.options.grids.grid1,

            billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
            curDate: ko.observable(),

            defaultGridTpl: {
                domid: "",
                umeta: {
                    id: "grid_priceAdjustDetail",
                    data: "priceAdjustDetail",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: false,
                },
                columns: [],
            }
        },
        rendertype: {
            detailRender: common.rendertype.detailRender,
            operation: function(obj) {
                var auditStatus = obj.row.value.state;
                var editfun, delfun;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                // 未审核和驳回状态下的才可以编辑
                if (auditStatus == 0) {
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
                } else {
                    delfun = 'class="disabled"';
                    editfun = 'class="disabled"';
                }
                obj.element.innerHTML =
                    '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    "<a " +
                    editfun +
                    ' title="编辑">编辑</a>' +
                    "</span>    " +
                    '<span class="ui-handle-word">' +
                    "<a " +
                    delfun +
                    ' title="删除">删除</a>' +
                    "</span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            whetherRender: common.rendertype.whetherRender,
            // 价格精度处理的format 2位
            formater: new u.NumberFormater(2),
          /*  approveRender: function(obj) {
                var name = "";
                var value = obj.value;
                switch (value) {
                    case '0':
                        name = "未审核";
                        break;
                    case '1':
                        name = "已审核";
                        break;
                    case '2':
                        name = "驳回";
                        break;
                    default:
                        break;
                }
                obj.element.innerHTML = name;
            },*/
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
            goBillPanel: common.bill.goBillPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel,
            //跳转详情页
            goDetailPanel: common.bill.goDetailPanel,
            canEdit: ko.pureComputed(function() {
                var auditStatus = viewModel.priceAdjustList.ref("state")();
                if (auditStatus== 0) {
                    return true;
                } else {
                    return false;
                }
            }),
            billDateFormat: function(value) {
                var showtime = u.date.format(value, 'YYYY-MM-DD');
                return showtime;
            },
            strictMatchComputed: ko.pureComputed(function() {
                var value = viewModel.priceAdjustList.ref("strictMatch")();
                if (value == '1') {
                    return '是';
                }
                return '否';
            }),
        },
        events: {
            //进入新增单据页
            showAddBillPanel: function() {
                viewModel.index = -1;
                viewModel.priceAdjustCard.removeAllRows();
                var curRow = viewModel.priceAdjustCard.createEmptyRow();

                viewModel.detailSelectCard.removeAllRows();
                viewModel.detailSelectCard.createEmptyRow();

                viewModel.priceAdjustDetail.removeAllRows();
                viewModel.setDefaultCondition();
                viewModel.generateGridfromPrice([], $("#editgrid"));
                viewModel.getCurDate(curRow, ["adjustTime", "effectTime"])
                $("#priceMaintainId").attr('placeholder', "请先选择销售组织");
                viewModel.priceAdjustCard.setMeta("priceMaintainId", "enable", false);
                viewModel.goBillPanel();
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
            },
            setDefaultCondition: function() {
                viewModel.changeCondition("priceMaintainId", {}, {
                    "EQ_priceList.organization": ""
                });
            },
            //进入修改单据页
            showEditBillPanel: function(index, rowId) {
                var row;
                if (index == -1) {
                    //处理通过详情页编辑进入
                    row = viewModel.priceAdjustList.getFocusRow();
                    //通过改变index判断当前处于编辑态
                    index = 0;
                } else {
                    //行上的编辑按钮
                    row = viewModel.priceAdjustList.getRowByRowId(rowId);
                }
                viewModel.index = index;
                viewModel.rowId = row.rowId;

                // TODO 改为从后台重新查询
                //查询子表数据
                // var id = row.getValue("id");
                // viewModel.findByParentid(id, function (data) {
                var data = row.getSimpleData();
                var isUnBpm = common.checkApprover(data.id);
                if (isUnBpm && !isUnBpm.isUnDoBpm) {
                    toastr.warning(isUnBpm.message);
                    return;
                }
                viewModel.detailSelectCard.removeAllRows();
                viewModel.detailSelectCard.createEmptyRow();
                viewModel.priceAdjustCard.setSimpleData(data);
                viewModel.seteidtCondition();
                viewModel.generateGridfromExistData(data.priceAdjustItems, $("#editgrid"));
                viewModel.priceAdjustDetail.setSimpleData(data.priceAdjustItems, {
                    unSelect: true
                });
                viewModel.goBillPanel();
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                // });
            },
            seteidtCondition: function() {
                var organizationId = viewModel.priceAdjustCard.getValue("organizationId");
                viewModel.changeCondition("priceMaintainId", {}, {
                    "EQ_priceList.organization": organizationId
                });
            },
            validateBill: function() {
                // 校验
                var validate = $(".ui-bill-panel")[0];
                var result = app.compsValidateMultiParam({
                    element: validate,
                    showMsg: true
                });
                if (result.passed) {
                    var rows = viewModel.priceAdjustDetail.getAllRealRows();
                    if (rows && rows.length > 0) {

                    } else {
                        toastr.warning("至少添加一行数据");
                        return false;
                    }
                    return true
                } else {
                    return false;
                }
            },
            //-------------审批流添加Start--------------
            //提交
            submit: function (obj) {
                var listCompId = "priceAdjustList";
                var nodeJs = "/ocm-web/pages/price/priceadjust/priceadjust.js";
                var billTypeCode = "PriceAdjust";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
            },
             back: function () {
                 var listCompId = "discountAdjustList";
                 var billTypeCode = "AdjustDiscount";
                 var tranTypeCode = null;
                 var callback = null;
                 viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
             },
            // 审批通过
            approve: function () {
                var listCompId = "priceAdjustList";
                var billTypeCode = "PriceAdjust";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
                viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },

            // 审批不通过
            disapprove: function () {
                var listCompId = "priceAdjustList";
                var billTypeCode = "PriceAdjust";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
                viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },

            cancelapprove: function () {
                var listCompId = "priceAdjustList";
                var billTypeCode = "PriceAdjust";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    viewModel.detail();
                };
                var withoutBpmCallback = null;
                viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },
            //-------------审批流添加end-------------------
            //保存单据
            saveAdjust: function() {
                var result = viewModel.validateBill();
                if (result) {
                    // 组装数据
                    var currentRow, ajaxType;
                    var index = viewModel.index;
                    var mainData = viewModel.priceAdjustCard.getSimpleData()[0];
                    var subData = viewModel.priceAdjustDetail.getSimpleData();
                    if (subData && subData.length > 0) {
                        subData.map(function(item) {
                            u.extend(item, viewModel.detailItems);
                        })
                        mainData.priceAdjustItems = subData;
                    }
                    if (index >= 0) {
                        ajaxType = "put";
                    } else {
                        ajaxType = "post";
                    }
                    // 提交
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: ajaxType,
                        data: JSON.stringify(mainData),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            // 回写界面
                            if (index >= 0) {
                                //获取需要修改的行
                                currentRow = viewModel.priceAdjustList.getRowByRowId(viewModel.rowId);
                            } else {
                                //添加数据
                                currentRow = viewModel.priceAdjustList.createEmptyRow();
                            }
                            // currentRow.setSimpleData(data);
                            viewModel.retListPanel();
                            viewModel.search(true);
                            toastr.success("保存成功");
                        }
                    })
                }
            },
            detailSelect: function() {
                var priceMaintainId = viewModel.priceAdjustCard.getValue("priceMaintainId");
                var postdata = viewModel.detailSelectCard.getSimpleData()[0];
                var priceIndex = postdata.priceIndex;
                var priceAdd = postdata.priceAdd;
                if (!priceMaintainId) {
                    toastr.warning("请先选择价目表");
                    return
                }

                $._ajax({
                    url: appCtx + viewModel.detailurl + "/detailSelect?priceMaintainId=" + priceMaintainId,
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data) {
                        if (data && data.length > 0) {
                            viewModel.addProductDetailFlag1 = true;
                            viewModel.addProductDetailFlag2 = true;
                            var productList = viewModel.priceAdjustDetail.getSimpleData(),
                                arr = [];
                            if (productList && productList.length > 0) {
                                for (var i = 0; i < data.length; i++) {
                                    for (var j = 0; j < productList.length; j++) {
                                        if (productList[j].goodsId == data[i].goodsId) {
                                            break;
                                        }
                                        if (j == productList.length - 1) {
                                            arr.push(data[i]);
                                        }
                                    }
                                }
                            } else {
                              arr = data;
                            }
                            data.map(function(item) {
                                if (item.details && item.details.length > 0) {
                                    var temp = {},
                                        i;
                                    for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                                        if (item["detailItemId" + i]) {
                                            temp[item["detailItemId" + i]] = item["detailItemPrice" + i];
                                        } else {
                                            break;
                                        }
                                    }
                                    var realCount = i - 1;
                                    for (i = 1; i <= realCount; i++) {
                                        item["detailItemPrice" + i] = temp[viewModel.detailItems["detailItemId" + i]]
                                        item["priceIndex" + i] = priceIndex;
                                        item["priceAdd" + i] = priceAdd;
                                        if (u.isNumber(item["detailItemPrice" + i])) {
                                            var oldPrice = parseFloat(item["detailItemPrice" + i]);
                                            var tempPriceIndex = priceIndex;
                                            var tempPriceAdd = priceAdd;
                                            if (u.isNumber(tempPriceIndex)) {
                                                tempPriceIndex = parseFloat(tempPriceIndex) / 100;
                                            } else {
                                                tempPriceIndex = 0;
                                            }
                                            if (u.isNumber(tempPriceAdd)) {
                                                tempPriceAdd = parseFloat(tempPriceAdd);
                                            } else {
                                                tempPriceAdd = 0;
                                            }
                                            item["newPrice" + i] = viewModel.formater.format(oldPrice * (1 + tempPriceIndex) + tempPriceAdd);
                                        }
                                    }
                                }
                            })
                            if (arr.length > 0) {
                                viewModel.priceAdjustDetail.addSimpleData(arr, 'new');
                            }
                        }
                    }
                })
            },
            audit: function() {
                var selectedRows = viewModel.priceAdjustList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var mainData = selectedRows.map(function(row) {
                        return row.getSimpleData();
                    })
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/audit",
                        data: JSON.stringify(mainData),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("auditStatus", "1");
                                // 同时改变操作列绑定字段变更以触发重新渲染
                                selectedRows[i].setValue("operation", "1");
                            }
                            toastr.success();
                        }
                    })
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            reject: function() {
                var selectedRows = viewModel.priceAdjustList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var mainData = selectedRows.map(function(row) {
                        return row.getSimpleData();
                    })
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/reject",
                        data: JSON.stringify(mainData),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("auditStatus", "2");
                                // 同时改变操作列绑定字段变更以触发重新渲染
                                selectedRows[i].setValue("operation", "2");
                            }
                            toastr.success();
                        }
                    })
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            detail: function() {
                //确保grid先将行设置为focus状态
                setTimeout(function() {
                    var row = viewModel.priceAdjustList.getCurrentRow();
                    var data = row.getSimpleData();
                    var id = data.id;
                    viewModel.generateGridfromExistData(data.priceAdjustItems, $("#detailgrid"), {
                        id: "grid_priceAdjustDetail_detail",
                        editable: false,
                        multiSelect: false,
                        showNumCol: true
                    }, true);
                    viewModel.priceAdjustDetail.setSimpleData(data.priceAdjustItems, {
                        unSelect: true
                    });
                    viewModel.goDetailPanel();
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                    viewModel.initBPMFromBill(id, viewModel);
                }, 0);
            },
            detail2bill: function() {
                var row = viewModel.priceAdjustList.getCurrentRow();
                viewModel.showEditBillPanel(0, row.rowId);
            },
            jointquery: function() {
                var selectedRows = viewModel.priceAdjustList.getSelectedRows();
                if (selectedRows.length == 1) {
                    var adjustNumber = selectedRows[0].getValue("adjustNumber");
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/jointquery",
                        dataType: "json",
                        data: {
                            adjustNumber: adjustNumber
                        },
                        success: function(data) {
                            viewModel.generateGridfromExistData(data, $("#joingrid"), {
                                id: "grid_jointAdjustDetail",
                                data: "jointAdjustDetail",
                                editable: false,
                                multiSelect: false,
                                showNumCol: true
                            }, true);
                            viewModel.jointAdjustDetail.setSimpleData(data);
                            if (viewModel.dialog_joinquery) {
                                viewModel.dialog_joinquery.show();
                            } else {
                                viewModel.dialog_joinquery = u.dialog({
                                    id: 'dialog_joinquery',
                                    content: "#dialog_joinquery",
                                    hasCloseMenu: true,
                                    width: "80%"
                                });
                            }
                        }
                    })
                } else {
                    if (selectedRows.length == 0) {
                        toastr.warning("请先选择一项");
                    } else {
                        toastr.warning("只能选择一项");
                    }
                }
            },
            //删除和批量删除
            del: function(data, rowId) {
                if (typeof(data) == 'number') {
                    viewModel.priceAdjustList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var rows = viewModel.priceAdjustList.getSelectedRows();
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].getValue("state") == 3) {
                            toastr.warning("已审核通过不能删除");
                            return
                        }
                        ids.push(rows[i].getValue("id"));
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
                                // data: "ids=" + ids.join(","),
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function(data) {
                                    viewModel.priceAdjustList.removeRows(rows);
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function(reindex) {
                if (reindex) {
                    viewModel.priceAdjustList.pageIndex(0);
                }
                viewModel.priceAdjustList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                queryData.size = viewModel.priceAdjustList.pageSize();
                queryData.page = viewModel.priceAdjustList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        viewModel.priceAdjustList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.priceAdjustList.totalRow(data.totalElements);
                        viewModel.priceAdjustList.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            cleanSearch: function() {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function(index) {
                viewModel.priceAdjustList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function(size) {
                viewModel.priceAdjustList.pageSize(size);
                viewModel.search(true);
            },

            getCurDate: function(row, fields) {
                // 服务器时间获取
                $._ajax({
                    type: "post",
                    url: appCtx + '/price/common/get-current-date',
                    success: function(data) {
                        var truetime = data;
                        if (row) {
                            if (u.isArray(fields) && fields.length > 0) {
                                fields.map(function(field) {
                                    row.setValue(field, truetime);
                                })
                            }
                        }
                        viewModel.curDate(truetime);
                    }
                });
            },
            changeCondition: function(domid, oldcondition, newcondition) {
                $("#" + domid).parent().attr("data-refparam", JSON.stringify(
                    u.extend({},
                        oldcondition,
                        newcondition
                    )
                ));
            },
            // 从已有价格调整详情中拼接grid选项
            generateGridfromExistData: function(data, $ele, extraGridUmeta, isdetail) {
                function transOption(data) {
                    var keyObj = {
                        useGoods: {
                            field: "goodsId",
                            title: "商品",
                            showField: "goodsName",
                            "editOptions": {
                                "validType": "string",
                                rel: {
                                    refname: "goodsName"
                                }
                            }
                        },
                        useProduct: {
                            field: "productId",
                            title: "产品",
                            showField: "productName"
                        },
                        useBrand: {
                            field: "brandId",
                            title: "品牌",
                            showField: "brandName"
                        },
                        useGoodsCategory: {
                            field: "goodsCategoryId",
                            title: "商品分类",
                            showField: "goodsCategoryName"
                        },
                        /*useProductLine: {
                          field: "productLineId",
                          title: "产品线",
                          showField: "productLineName"
                        },*/
                        useCustomer: {
                            field: "customerId",
                            title: "客户",
                            showField: "customerName"
                        },
                        useCustomerCategory: {
                            field: "customerCategoryId",
                            title: "客户分类",
                            showField: "customerCategoryName"
                        },
                        useShop: {
                            field: "shopId",
                            title: "门店",
                            showField: "shopName"
                        },
                    }
                    var columns = [];
                    if (isdetail) {
                        // 如果是详情界面
                        for (var key in keyObj) {
                            columns.push(u.extend({
                                "dataType": "String",
                            }, {
                                field: keyObj[key].showField,
                                title: keyObj[key].title,
                            }))
                        }
                    } else {
                        // 如果是编辑界面
                        for (var key in keyObj) {
                            columns.push(u.extend({
                                "dataType": "String",
                                "renderType": "ncReferRender",
                                "editType": "ncReferEditType",
                                "editOptions": {
                                    "validType": "string",
                                }
                            }, keyObj[key]))
                        }
                    }
                    viewModel.detailItems = {};
                    if (data && data.length > 0) {
                        var item = data[0];
                        for (var i = 1; i <= viewModel.customPriceItemNum; i++) {
                            if (item["detailItemId" + i]) {
                                // 如果价格项id存在，则添加4列
                                columns.push({
                                    "field": "detailItemPrice" + i,
                                    "dataType": "String",
                                    "title": item["detailItemName" + i],
                                    "editable": false,
                                    // "editType": "float",
                                })
                                columns.push({
                                    "field": "priceIndex" + i,
                                    "dataType": "String",
                                    "title": "价格指数",
                                    "editType": "float",
                                })
                                columns.push({
                                    "field": "priceAdd" + i,
                                    "dataType": "String",
                                    "title": "价格加成",
                                    "editType": "float",
                                })
                                columns.push({
                                    "field": "newPrice" + i,
                                    "dataType": "String",
                                    "title": item["detailItemName" + i] + "新价格",
                                    "editable": false,
                                    // "editType": "float",
                                })
                                columns.push({
                                    "field": "priceAdjustRatio" + i,
                                    "dataType": "String",
                                    "title": item["detailItemName" + i] + "调价比例",
                                    "editable": false,
                                    // "editType": "float",
                                })
                                viewModel.detailItems["detailItemId" + i] = item["detailItemId" + i];
                                viewModel.detailItems["detailItemName" + i] = item["detailItemName" + i];
                            } else {
                                // 价格项id不存在，则跳出循环
                                break;
                            }
                        }
                    }
                    var umeta = u.extend({}, viewModel.defaultGridTpl.umeta, extraGridUmeta)
                    return {
                        domid: "",
                        umeta: umeta,
                        columns: columns
                    };
                }

                var ele = $ele[0];
                var options = transOption(data);
                $ele.empty();
                ele.innerHTML = viewModel.handleGridTpl(options);

                ko.cleanNode(ele);
                u.createApp({
                    el: ele,
                    model: viewModel
                });
            },
            // 从价目表定义中拼接grid选项
            generateGridfromPrice: function(data, $ele) {
                function transOption(data) {
                    var keyObj = {
                        useGoods: {
                            field: "goodsId",
                            title: "商品",
                            showField: "goodsName",
                            "editOptions": {
                                "validType": "string",
                                rel: {
                                    refname: "goodsName"
                                }
                            }
                        },
                        useProduct: {
                            field: "productId",
                            title: "产品",
                            showField: "productName"
                        },
                        useBrand: {
                            field: "brandId",
                            title: "品牌",
                            showField: "brandName"
                        },
                        useGoodsCategory: {
                            field: "goodsCategoryId",
                            title: "商品分类",
                            showField: "goodsCategoryName"
                        },
                        /*useProductLine: {
                          field: "productLineId",
                          title: "产品线",
                          showField: "productLineName"
                        },*/
                        useCustomer: {
                            field: "customerId",
                            title: "客户",
                            showField: "customerName"
                        },
                        useCustomerCategory: {
                            field: "customerCategoryId",
                            title: "客户分类",
                            showField: "customerCategoryName"
                        },
                        useShop: {
                            field: "shopId",
                            title: "门店",
                            showField: "shopName"
                        }
                    }
                    var columns = [];
                    for (var key in keyObj) {
                        columns.push(u.extend({
                            "dataType": "String",
                            "renderType": "ncReferRender",
                            "editType": "ncReferEditType",
                            "editOptions": {
                                "validType": "string",
                            }
                        }, keyObj[key]))
                    }

                    var priceListItems = data.priceListItems;
                    var count = 1;
                    viewModel.detailItems = {};
                    if (priceListItems && priceListItems.length > 0) {
                        for (var i = 0; i < priceListItems.length; i++) {
                            if (priceListItems[i].isSelected == 1) {
                                columns.push({
                                    "field": "detailItemPrice" + count,
                                    "dataType": "String",
                                    "title": priceListItems[i].priceItemName,
                                    // "editType": "float",
                                    "editable": false,
                                })
                                columns.push({
                                    "field": "priceIndex" + count,
                                    "dataType": "String",
                                    "title": "价格指数",
                                    "editType": "float",
                                })
                                columns.push({
                                    "field": "priceAdd" + count,
                                    "dataType": "String",
                                    "title": "价格加成",
                                    "editType": "float",
                                })
                                columns.push({
                                    "field": "newPrice" + count,
                                    "dataType": "String",
                                    "title": priceListItems[i].priceItemName + "新价格",
                                    // "editType": "float",
                                    "editable": false,
                                })
                                columns.push({
                                    "field": "priceAdjustRatio" + count,
                                    "dataType": "String",
                                    "title": priceListItems[i].priceItemName + "调价比例",
                                    "editable": false,
                                    // "editType": "float",
                                })
                                viewModel.detailItems["detailItemId" + count] = priceListItems[i].id;
                                viewModel.detailItems["detailItemName" + count] = priceListItems[i].priceItemName;
                                count++;
                            }
                        }
                    }

                    return u.extend({}, viewModel.defaultGridTpl, {
                        columns: columns
                    });
                }

                var ele = $ele[0];
                var options = transOption(data);
                $ele.empty();
                ele.innerHTML = viewModel.handleGridTpl(options);

                ko.cleanNode(ele);
                u.createApp({
                    el: ele,
                    model: viewModel
                });
            },

            handleGridTpl: function(param) {
                function handleUmeta(meta) {
                    return JSON.stringify(meta);
                }

                function handleColumns(columns) {
                    if (u.isArray(columns)) {
                        var optionArr = columns.map(function(item) {
                            return '<div options=\'' + JSON.stringify(item) + '\'></div>'
                        })
                        return optionArr.join(" ");

                    } else {
                        throw new Error("columns must be Array");
                    }
                }

                return '<div id=\'' + param.domid + '\' u-meta=\'' + handleUmeta(param.umeta) + '\'>' + handleColumns(param.columns) + '</div>'
            },
            cancelBill: function() {
                viewModel.retListPanel();
            },
            searchPriceList: function(priceListId) {
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.priceurl + "/" + priceListId,
                    dataType: "json",
                    success: function(data) {
                        viewModel.generateGridfromPrice(data, $("#editgrid"));
                    }
                })
            },
            inquirePrice: function(value, field, row) {
                var priceMaintainId = viewModel.priceAdjustCard.getValue("priceMaintainId");
                var postdata = row.getSimpleData();
                // postdata[field] = value;
                if (!priceMaintainId) {
                    toastr.warning("请先选择价目表");
                    return
                }
                if (!value) {
                    return
                }
                $._ajax({
                    url: appCtx + viewModel.detailurl + "/blurrySelect?priceMaintainId=" + priceMaintainId ,
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data) {
                        if (data.details && data.details.length > 0) {
                            var item = data;
                            var temp = {},
                                i;
                            for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                                if (item["detailItemId" + i]) {
                                    temp[item["detailItemId" + i]] = item["detailItemPrice" + i];
                                } else {
                                    break;
                                }
                            }
                            var realCount = i - 1;
                            for (i = 1; i <= realCount; i++) {
                                if (u.isNumber(item["detailItemPrice" + i])) {
                                    row.setValue("detailItemPrice" + i, temp[viewModel.detailItems["detailItemId" + i]]);
                                } else {
                                    row.setValue("detailItemPrice" + i, null);
                                }
                            }
                        } else {
                            for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                                if (viewModel.detailItems["detailItemId" + i]) {
                                    row.setValue("detailItemPrice" + i, null);
                                }
                            }
                        }
                    },
                    error: function() {
                        for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                            if (viewModel.detailItems["detailItemId" + i]) {
                                row.setValue("detailItemPrice" + i, null)
                            }
                        }
                    }
                })
            },
            //新增子表项
            addItem: function() {
                viewModel.priceAdjustDetail.createEmptyRow();
            },
            //删除子表项
            delItems: function() {
                var selectedRows = viewModel.priceAdjustDetail.getSelectedRows();
                viewModel.priceAdjustDetail.removeRows(selectedRows);
            },
            searchMaintainDetail: function(reindex) {
                if (reindex) viewModel.priceAdjustDetail.pageIndex(0);
                var queryData = {};
                queryData.size = viewModel.priceAdjustDetail.pageSize();
                queryData.page = viewModel.priceAdjustDetail.pageIndex();
                queryData["search_EQ_priceAdjust.id"] = viewModel.detailItems.priceAdjustId;
                var addition = viewModel.subsearchcomp.getDataWithOpr();
                u.extend(queryData, addition);
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.detailurl,
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        viewModel.priceAdjustDetail.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.priceAdjustDetail.totalRow(data.totalElements);
                        viewModel.priceAdjustDetail.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            subcleanSearch: function() {
                viewModel.subsearchcomp.clearSearch();
            },
            //页码改变时的回调函数
            subPageChange: function(index) {
                viewModel.priceAdjustDetail.pageIndex(index);
                viewModel.searchMaintainDetail();
            },
            //页码改变时的回调函数
            subSizeChange: function(size) {
                viewModel.priceAdjustDetail.pageSize(size);
                viewModel.searchMaintainDetail(true);
            },
        },
        afterCreate: function() {
            viewModel = u.extend(viewModel, bpmopenbill.model);
            viewModel.priceAdjustCard.on("organizationId.valuechange", function(obj) {
                if (!obj.newValue) return;
                var value = obj.newValue;

                if (viewModel.priceAdjustCard.getMeta("priceMaintainId", "enable")) {
                    viewModel.priceAdjustCard.setValue('priceMaintainId', '');
                } else {
                    $("#priceMaintainId").removeAttr('placeholder');
                    viewModel.priceAdjustCard.setMeta("priceMaintainId", "enable", true);
                }

                var priceMaintain = viewModel.app.getComp("priceMaintain");
                viewModel.changeCondition("priceMaintainId", {}, {
                    "EQ_priceList.organization": value
                });
                viewModel.priceAdjustDetail.removeAllRows();
            });
            viewModel.priceAdjustCard.on("priceMaintainId.valuechange", function(obj) {
                // 清空参照时不增行
                if (!obj.newValue) {
                    return;
                }
                var refer = $("#refContainerpriceMaintainId").data("uui.refer");
                var refValue = refer.values[0];
                var priceListId = refValue.priceListId;
                viewModel.searchPriceList(priceListId);
                viewModel.priceAdjustDetail.removeAllRows();
            });
            viewModel.detailSelectCard.on("valuechange", function(obj) {
                var needCleanfield = {
                    goodsId: "goodsId",
                    productId: "productId",
                    brandId: "brandId",
                    goodsCategoryId: "goodsCategoryId",
                    //          customerCategoryId: "customerCategoryId",
                    //          customerId: "customerId"
                }
                if (needCleanfield[obj.field]) {
                    if (obj.newValue) {
                        for (var key in needCleanfield) {
                            if (key != obj.field) {
                                viewModel.detailSelectCard.setValue(key, null);
                            }
                        }
                    }
                }
                var needCleanfieldCus = {
                    //          goodsId: "goodsId",
                    //          productId: "productId",
                    //          brandId: "brandId",
                    //          goodsCategoryId: "goodsCategoryId",
                    customerCategoryId: "customerCategoryId",
                    customerId: "customerId"
                }
                if (needCleanfieldCus[obj.field]) {
                    if (obj.newValue) {
                        for (var key in needCleanfieldCus) {
                            if (key != obj.field) {
                                viewModel.detailSelectCard.setValue(key, null);
                            }
                        }
                    }
                }
            });

            viewModel.priceAdjustDetail.on("goodsId.valuechange", function(obj) {
                 if (!obj.newValue || obj.oldValue == obj.newValue) return;
                var refer = $("#refContainergoodsId").data("uui.refer");
                if(!refer || !refer.values) return;
                var refValues = refer.values;
                $("#refContainergoodsId").data("uui.refer").setValue("");
                if(!refValues || refValues.length < 1) return;
                var curRow = viewModel.priceAdjustDetail.getRowByRowId(obj.rowId);
                curRow.setValue('goodsId', refValues[0].refpk);
                curRow.setValue('goodsName', refValues[0].refname);
                viewModel.inquirePrice(refValues[0].id, obj.field, curRow);
              

                if (viewModel.addProductDetailFlag1 && refValues.length==1) {
                    viewModel.addProductDetailFlag1 = false;
                    return;
                } else if(refValues.length==1){
                    viewModel.inquirePrice(obj.newValue, obj.field, obj.rowObj);
                }else{
                    for (var i = 1; i < refValues.length; i++) {
                            viewModel.addProductDetailFlag1 = false;
                            viewModel.addProductDetailFlag2 = false;
                            var newRow1 = viewModel.priceAdjustDetail.createEmptyRow({
                                unSelect: true
                            });
                            newRow1.setValue('goodsId', refValues[i].refpk);
                            newRow1.setValue('goodsName', refValues[i].refname);
                            viewModel.inquirePrice(refValues[i].id, obj.field, newRow1);
                        }
                     
                }
            })

            viewModel.priceAdjustDetail.on("productId.valuechange", function(obj) {
                if (viewModel.addProductDetailFlag2) {
                    viewModel.addProductDetailFlag2 = false;
                    return;
                } else {
                    viewModel.inquirePrice(obj.newValue, obj.field, obj.rowObj);
                }
            })

            viewModel.priceAdjustDetail.on("valuechange", function(obj) {
                if (obj.field == "goodsId" || obj.field == "productId") {
                    if (!viewModel.addProductDetailFlag1 && !viewModel.addProductDetailFlag2) {
                        viewModel.addProductDetailFlag1 = true;
                        viewModel.addProductDetailFlag2 = true;
                        viewModel.inquirePrice(obj.newValue, obj.field, obj.rowObj);
                    }
                } else {
                    var reg = /^(priceIndex|priceAdd|detailItemPrice|newPrice)(\d+)$/;
                    if (reg.test(obj.field) && (obj.newValue || obj.oldValue)) {
                        var row = obj.rowObj;
                        var index = RegExp["$2"];
                        var priceIndex = parseFloat(row.getValue("priceIndex" + index)) / 100 || 0;
                        var priceAdd = parseFloat(row.getValue("priceAdd" + index)) || 0;
                        var detailItemPrice = parseFloat(row.getValue("detailItemPrice" + index)) || 0;
                        var newPrice = detailItemPrice * (1 + priceIndex) + priceAdd;
                        newPrice = viewModel.formater.format(newPrice);
                        if(obj.field == "newPrice"+index){
                            var priceAdjustRatio;
                            priceAdjustRatio=Math.round(viewModel.formater.format(newPrice/detailItemPrice-1)*100)/100;
                            row.setValue("priceAdjustRatio" + index, priceAdjustRatio);
                        }
                        row.setValue("newPrice" + index, newPrice);
                    }
                }
            });
        }
    });

    return view;
});