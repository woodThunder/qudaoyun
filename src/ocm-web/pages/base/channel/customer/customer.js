define([
    "text!./customer.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "../../customerapplicationform1/customerapplicationform.js",
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl",
   
], function (tpl, common, baseview, model,reqView) {
    "use strict";
    var viewModel, fileDialog, picBigDialog;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: "/base/channel/customers",
            childListUrl: "/base/customer-addresses",
            ContactListUrl: "/base/customer-contacts",
            InvoiceUrl: "/base/customer-invoices",
            alterurl: "/base/customer-alters",
            MarketAreatUrl: "/market-connect",
            PartnerListUrl: "/partner",
            picurl: "/cust-cred-pic",
            custAttachmentUrl: "/base/customer-attachments",
            ctxfilemng: "/iuap-saas-filesystem-service/",
            CustomerList: new u.DataTable(model.options.metas.Customermeta),
            ContactList: new u.DataTable(model.options.metas.Contactmeta),
            CustomerAddressList: new u.DataTable(
                model.options.metas.CustomerAddressmeta
            ),
            CustomerInvoiceList: new u.DataTable(model.options.metas.CustomerInvoicemeta),
            custCredPicList: new u.DataTable(model.options.metas.custCredPicmeta),
            pictureCategoryRef: new u.DataTable(
                model.options.metas.pictureCategoryRef
            ),
            CustAttachmentList: new u.DataTable(model.options.metas.CustAttachmentMeta),
            AlterList: new u.DataTable(model.options.metas.CustomerAltermeta),
            whetherSource: [{
                value: "1",
                name: "是"
            }, {
                value: "0",
                name: "否"
            }],
            whetherSaleSource: [{
                value: "1",
                name: "延续"
            }, {
                value: "0",
                name: "不延续"
            }],
            stateSrc: [{
                value: "0",
                name: "无效"
            }, {
                value: "1",
                name: "有效"
            }],
            statusSource: [{
                value: "2",
                name: "停用"
            },{
                value: "1",
                name: "启用"
            }, {
                value: "0",
                name: "未启用"
            }],
            cooperateStateSrc: [{
                value: "1",
                name: "合作"
            }, {
                value: "0",
                name: "不合作"
            }],
            whetherSrc: CONST.WHETHER,
            enableFormat: common.format.enableFormat,
            registTypeSrc: ko.observableArray([]),
            marketTypeSrc: ko.observableArray([]),
            rebateProblemSrc: ko.observableArray([]),
            afterServiceAccountSrc: ko.observableArray([]),
            managementTypeSrc: ko.observableArray([]),
            customerRankSrc: ko.observableArray([]),
            invoiceTypeSrc: ko.observableArray([]),
            credentialsTypeSrc: ko.observableArray([]),
            customerSourceSrc: ko.observableArray([]),
            flag: 0,
            currentFlag: 1,
            currentTab: 0,
            currentList: "",
            currentTip: "",
            picRowId: "",
            contactdata: [],
            addressdata: [],
            invoicedata: [],
            partnerdata: [],
            marketdata: [],
            customerId: "",
            pictureCategory: "",
            pictureCategoryName: "",
            picArr: [],
            alterArr: [],
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            ensureRefKeys: "searchcomp",

            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            button4Source: model.options.buttons.button4,
            button5Source: model.options.buttons.button5,
            button6Source: model.options.buttons.button6,
            button7Source: model.options.buttons.button7,
            button8Source: model.options.buttons.button8,
            button9Source: model.options.buttons.button9,
            button10Source: model.options.buttons.button10,
            button11Source: model.options.buttons.button11,
            button12Source: model.options.buttons.button12,
            buttonMenu1Source: model.options.buttonmenus.buttonmenu1,

            card1Source: model.options.cards.card1,
            // card2Source: model.options.cards.card2,
            //card3Source: model.options.cards.card3,
            detail1Source: model.options.details.detail1,
            // detail2Source: model.options.details.detail2,
            //detail3Source: model.options.details.detail3,

            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2,
            grid3Option: model.options.grids.grid3,
            grid4Option: model.options.grids.grid4,
            grid5Option: model.options.grids.grid5,
            grid6Option: model.options.grids.grid6,
            //grid7Option: model.options.grids.grid7,
            grid8Option: model.options.grids.grid8,
            grid9Option: model.options.grids.grid9,
            grid10Option: model.options.grids.grid10,
            grid11Option: model.options.grids.grid11,

            //跳转单据页
            goBillPanel: common.bill.goBillPanel,
            //跳转单据详情页
            goDetailPanel: common.bill.goDetailPanel,
            billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
            saleChannelDataSource: ko.observableArray([]),

            //返回列表页
            retListPanel: common.bill.retListPanel,
            //跳转图片维护页
            goPicPanel: common.bill.goPicPanel
        },
        rendertype: {
            //跳转详情页
            operation4single: common.rendertype.operation4single,
            detailRender: common.rendertype.detailRender,
            operation: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var delfun =
                    "data-bind=click:del.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var editfun =
                    "data-bind=click:beforeEdit.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var alterfun =
                    "data-bind=click:showAlter.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\">" +
                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\" " +
                    editfun +
                    " title=\"编辑\">编辑</a>" +
                    "</span>    " +
                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\" " +
                    delfun +
                    " title=\"删除\">删除</a>" +
                    "</span></div>   ";
                // "<span class=\"ui-handle-word\">" +
                // "<a href=\"#\" " +
                // alterfun +
                // " title=\"变更记录\">变更记录</a>" +
                // "</span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            //  operation: common.rendertype.operation,
            //列表图片维护操作
            operationPic: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var uploadBtn =
                    "data-bind=click:picPage.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\">" +
                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\"" +
                    uploadBtn +
                    " title=\"图片维护\">图片维护</a>" +
                    "</span>" +
                    "</div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            reqFormRender: function (obj) {
                var viewModel = obj.gridObj.viewModel;

                var params = {
                    id: obj.row.value.cusReqFormId
                }
                var hrefValue = "index-view.html?" + common.toUrlParam(params) + "#/cusReqForm";
                var detailfun = "data-bind=click:customerDetail.bind($data," + obj.rowIndex + ")";
                obj.element.innerHTML =
                    '<a href='+hrefValue+' value="cusReqForm" name="客户申请单" class="ui-a-detail" ' +
                    detailfun +
                    ">" +
                    obj.value
                    "</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            enableStatusRender: function (obj) {
                var showValue = obj.value == "1" ? "启用" : "停用";
                obj.element.innerHTML = showValue;
            },
            //判断表格里的状态
            //启用状态
            isEnableGrid: function (obj) {
                var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue(
                    "isEnable"
                );
                var stateName;
                if (stateValue == 0) {
                    (stateName = "未启用")
                }
                if (stateValue == 1) {
                    (stateName = "已启用")
                }
                if (stateValue == 2) {
                    (stateName = "已停用")
                }
                obj.element.innerHTML = stateName;
            },
            //是否冻结
            isFrozenGrid: function (obj) {
                var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue(
                    "isFrozen"
                );
                var stateName;
                stateValue == 1 ? (stateName = "冻结") : (stateName = "未冻结");
                obj.element.innerHTML = stateName;
            },
            //是否默认--客户开票
            isDefaultCI: function (obj) {
                var isDefault = viewModel.CustomerInvoiceList.getRow(obj.rowIndex).getValue(
                    "isDefault"
                );
                var name;
                isDefault == 1 ? (name = "是") : (name = "否");
                obj.element.innerHTML = name;
            },
            //是否默认--收货地址
            isDefaultCA: function (obj) {
                var isDefault = viewModel.CustomerAddressList.getRow(obj.rowIndex).getValue(
                    "isDefault"
                );
                var name;
                isDefault == 1 ? (name = "是") : (name = "否");
                obj.element.innerHTML = name;
            },

            //地址启用状态
            addressStateGrid: function (obj) {
                var stateValue = viewModel.CustomerAddressList.getRow(
                    obj.rowIndex
                ).getValue("isEnable");
                var stateName;
                stateValue == 1 ? (stateName = "启用") : (stateName = "停用");
                obj.element.innerHTML = stateName;
            },
            //是否经销商
            isChannelCustomerGrid: function (obj) {
                var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue(
                    "isChannelCustomer"
                );
                var stateName;
                stateValue == 1 ? (stateName = "是") : (stateName = "否");
                obj.element.innerHTML = stateName;
            },
            //是否内部组织
            isInnerOrganizationGrid: function (obj) {
                var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue(
                    "isInnerOrganization"
                );
                var stateName;
                stateValue == 1 ? (stateName = "是") : (stateName = "否");
                obj.element.innerHTML = stateName;
            },
            //上传插件
            uploadBtn: function (obj) {
                var uploadBtn = "data-bind=click:onOpenUploadWinCustomer";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\">" +
                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\"" +
                    uploadBtn +
                    " title=\"上传证明\">上传证明</a>" +
                    "</span>" +
                    "</div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            //  表格图片
            picShow: function (obj) {
                var pictureUrl = viewModel.custCredPicList
                    .getRow(obj.rowIndex)
                    .getValue("pictureUrl");
                var prodUrl = "";
                if (pictureUrl) {
                    //特殊字符\  .  替换
                    var prodUrl = pictureUrl
                        .replace(/\./g, "spot")
                        .replace(/\//g, "linePath")
                        .replace(/\-/g, "lineThrough");
                    obj.element.innerHTML =
                        "<img width=\"30\" height=\"30\" src=" +
                        pictureUrl +
                        " data-bind=\"click: picBig.bind($data," +
                        "'" +
                        prodUrl +
                        "'" +
                        ")\">";
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            }
        },
        events: {

            customerDetail: function (index, viewModel, e) {
                e.preventDefault();
                reqView
                parent.handleClick(e, 1);
            },
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，-2为复制,大于等于0为编辑)
            beforeEdit: function (index, rowId) {
                var self = this;
                viewModel.index = index;
                viewModel.rowId = rowId;
                viewModel.goBillPanel();
                viewModel.ContactList.clear();
                viewModel.CustomerAddressList.clear();
                viewModel.CustAttachmentList.clear();
                /*viewModel.MarketAreaList.clear();
                 viewModel.PartnerList.clear();*/
                $("#productBase").show();
                $("#productBase_show").hide();
                //设置tab显示基本信息
                $(".ui-bill-panel .u-tabs__tab")
                    .eq(0)
                    .addClass("is-active")
                    .siblings(".u-tabs__tab")
                    .removeClass("is-active");
                $(".ui-bill-panel .u-tabs__panel")
                    .eq(0)
                    .addClass("is-active")
                    .siblings(".u-tabs__panel")
                    .removeClass("is-active");
                viewModel.currentFlag = 1;
                viewModel.currentTab = 0;
                if (index >= 0) {
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                    //修改操作
                    var currentDataId = viewModel.CustomerList.getRowByRowId(
                        rowId
                    ).getValue("id");
                    var code = viewModel.CustomerList.getRowByRowId(rowId).getValue(
                        "code"
                    );
                    // var oneCategoryName = viewModel.CustomerList.getRowByRowId(rowId).getValue('oneCategoryName');
                    viewModel.CustomerList.originEditData = viewModel.CustomerList.getRowByRowId(
                        rowId
                    ).getSimpleData();
                    $("#code-input").hide();
                    $("#code-text")
                        .show()
                        .html(code);
                    // $("#oneCategoryId-input").hide();
                    // $("#oneCategoryId-text").show().html(oneCategoryName);
                    viewModel.flag = 1;
                    //判断是否经销商和组织
                    //var isChannelCustomer = viewModel.CustomerList.getRowByRowId(rowId).getValue('isChannelCustomer');
                    //var isOrganization = viewModel.CustomerList.getRowByRowId(rowId).getValue('isOrganization');
                    // if (isChannelCustomer == 1) {
                    //   $(".product-choose-result").eq(0).show();
                    //   $(".product-choose-content").eq(0).show();
                    // }
                    // if (isOrganization == 1) {
                    //   $(".product-choose-result").eq(1).show();
                    //   $(".product-choose-content").eq(1).show();
                    // }
                    //根据id查联系人表
                    $._ajax({
                        url: appCtx + viewModel.ContactListUrl + "/findByCustomerId",
                        type: "get",
                        data: {
                            customerId: currentDataId
                        },
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            viewModel.ContactList.setSimpleData(data, {
                                unSelect: true
                            });
                            viewModel.contactdata = viewModel.ContactList.getSimpleData();
                        }
                    });
                    //根据id查地址表
                    $._ajax({
                        url: appCtx + viewModel.childListUrl + "/findByCustomerId",
                        type: "get",
                        data: {
                            customerId: currentDataId
                        },
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            viewModel.CustomerAddressList.setSimpleData(data, {
                                unSelect: true
                            });
                            viewModel.addressdata = viewModel.CustomerAddressList.getSimpleData();
                        }
                    });
                    //根据id查开票信息
                    $._ajax({
                        url: appCtx + viewModel.InvoiceUrl + "/findByCustomerId",
                        type: "get",
                        data: {
                            customerId: currentDataId
                        },
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            viewModel.CustomerInvoiceList.setSimpleData(data, {
                                unSelect: true
                            });
                            viewModel.invoicedata = viewModel.CustomerInvoiceList.getSimpleData();
                        }
                    });
                    //根据id附件信息
                    $._ajax({
                        url: appCtx + viewModel.custAttachmentUrl + "/findByCustomerId",
                        type: "get",
                        data: {
                            customerId: currentDataId
                        },
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            viewModel.CustAttachmentList.setSimpleData(data, {
                                unSelect: true
                            });
                            viewModel.invoicedata = viewModel.CustomerInvoiceList.getSimpleData();
                        }
                    });
                } else if (index === -2) {
                    //复制操作
                    var rowIndexArr = viewModel.CustomerList.getSelectedIndices();
                    var focusRow = viewModel.CustomerList.getFocusRow();
                    var currentRow = viewModel.CustomerList.getCurrentRow();
                    if (rowIndexArr.length > 1 || !currentRow) {
                        u.confirmDialog({
                            msg: "请选择一条数据？",
                            title: "复制",
                            onOk: function () {
                                //
                            },
                            onCancel: function () {
                                //
                            }
                        });
                        viewModel.retListPanel();
                    } else {
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                        var copyRow = focusRow ? focusRow : currentRow;
                        var curRow = viewModel.CustomerList.createEmptyRow();
                        curRow.setSimpleData(copyRow.getSimpleData());
                        viewModel.CustomerList.setRowFocus(curRow);
                        var currentDataId = copyRow.getValue("id");
                        //根据id查子表
                        $._ajax({
                            url: appCtx + viewModel.childListUrl + "/findByCustomerId",
                            type: "get",
                            data: {
                                findByCustomerId: currentDataId
                            },
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                viewModel.CustomerAddressList.setSimpleData(data, {
                                    unSelect: true
                                });
                            }
                        });
                        //删除主表主键，编码，审计信息
                        viewModel.clearBaseProp(curRow);
                        //删除子表主键，子表主表关联
                        var subRows = viewModel.CustomerAddressList.getAllRows();
                        for (var i = 0; i < subRows.length; i++) {
                            viewModel.clearBaseProp(subRows[i]);
                            subRows[i].setValue("parentid", "");
                        }
                    }
                } else {
                    //添加操作
                    // $("#code-input").show();
                    // $("#code-text").hide();
                    // $("#oneCategoryId-input").show();
                    // $("#oneCategoryId-text").hide();
                    viewModel.flag = 0;
                    viewModel.CustomerList.createEmptyRow();
                    var currentRow = viewModel.CustomerList.createEmptyRow();
                    viewModel.CustomerList.setRowFocus(currentRow);
                    // currentRow.setValue('status', '1');
                    //        var isData=currentRow.getSimpleData();

                    for (var k in currentRow) {
                        if (k.indexOf("is") > -1 && currentRow[k] == null) {
                            currentRow[k] = 0;
                        }
                    }
                    // $(".product-choose-result").hide();
                    // $(".product-choose-content").hide();
                }
            },
            // showAlter:function(index,rowId){
            //   $("#productBase").hide();
            //   $("#productBase_show").hide();
            //   $("#customer_alters").hide();
            // },
            // 清除基类属性
            clearBaseProp: function (curRow) {
                curRow.setValue("id", null);
                curRow.setValue("code", "");
                curRow.setValue("creator", "");
                curRow.setValue("creationTime", "");
                curRow.setValue("modifier", "");
                curRow.setValue("modifiedTime", "");
            },
            // //详情启用状态
            // customerStatus: ko.pureComputed(function () {
            //   var statusValue = viewModel.CustomerList.getValue('status');
            //   if (statusValue === null) {
            //     viewModel.CustomerList.setValue('status', 1);
            //   }
            //   var showName;
            //   statusValue == 1 ? showName = "启用" : showName = "停用";
            //   return showName;
            // }),
            // //详情是否属于经销商交接
            // isMarketConnect: function () {
            //   var statusValue = viewModel.CustomerList.getValue('isMarketConnect');
            //   var showName;
            //   statusValue == 1 ? showName = "是" : showName = "否";
            //   return showName;
            // },
            // //详情合作状态
            // cooperateState: function () {
            //   var statusValue = viewModel.CustomerList.getValue('cooperateState');
            //   var showName;
            //   statusValue == 1 ? showName = "合作" : showName = "不合作";
            //   return showName;
            // },
            // isOfflineChannelCustomer: ko.pureComputed(function () {
            //   var dataValue = viewModel.CustomerList.getValue('isOfflineChannelCustomer');
            //   if (dataValue === null) {
            //     viewModel.CustomerList.setValue('isOfflineChannelCustomer', 0);
            //   }
            //   var showName;
            //   dataValue == 1 ? showName = "是" : showName = "否";
            //   return showName;
            // }),
            // isDeposit: ko.pureComputed(function () {
            //   var dataValue = viewModel.CustomerList.getValue('isDeposit');
            //   if (dataValue === null) {
            //     viewModel.CustomerList.setValue('isDeposit', 0);
            //   }
            //   var showName;
            //   dataValue == 1 ? showName = "是" : showName = "否";
            //   return showName;
            // }),
            //是否内部组织
            isInnerOrganization: ko.pureComputed(function () {
                var dataValue = viewModel.CustomerList.ref("isInnerOrganization")();
                var showName;
                dataValue == 1 ? (showName = "是") : (showName = "否");
                return showName;
            }),
            //是否经销商
            isChannelCustomer: ko.pureComputed(function () {
                var dataValue = viewModel.CustomerList.ref("isChannelCustomer")();
                var showName;
                dataValue == 1 ? (showName = "是") : (showName = "否");
                return showName;
            }),
            // //是否冻结
            isFrozen: ko.pureComputed(function () {
                var dataValue = viewModel.CustomerList.ref("isFrozen")();
                var showName;
                dataValue == 1 ? (showName = "是") : (showName = "否");
                return showName;
            }),
            // //是否启用
            isEnable: ko.pureComputed(function () {
                var dataValue = viewModel.CustomerList.ref("isEnable")();
                var showName;

                if (dataValue == 0) {
                    (showName = "未启用")
                }
                if (dataValue == 1) {
                    (showName = "已启用")
                }
                if (dataValue == 1) {
                    (showName = "已停用")
                }
                return showName;
            }),

            //时间大小限制
            disabledBegin: function (current) {
                var cooperateEnd = viewModel.CustomerList.getValue("cooperateEnd");
                if (cooperateEnd) {
                    cooperateEnd = new Date(cooperateEnd).getTime();
                    if (current) {
                        current = new Date(current.format("YYYY-MM-DD")).getTime();
                    }
                    return current && current > cooperateEnd;
                }
            },
            disabledEnd: function (current) {
                var cooperateStart = viewModel.CustomerList.getValue("cooperateStart");
                if (cooperateStart) {
                    cooperateStart = new Date(cooperateStart).getTime();
                    if (current) {
                        current = new Date(current.format("YYYY-MM-DD")).getTime();
                    }
                    return current && current < cooperateStart;
                }
            },
            //点击保存按钮
            saveHandle: function () {
                var _index = viewModel.index;
                var ChannelPass = true;
                var isChannelCustomer = viewModel.CustomerList.getValue(
                    "isChannelCustomer"
                );
                //var isOrganization = viewModel.CustomerList.getValue("isOrganization");
                var infoBase = $("#baseInfo")[0];
                var basePass = viewModel.validate(infoBase);
                if (basePass.passed) {
                    if (isChannelCustomer == 1) {
                        var channelvalidate = viewModel.validate($("#channelInfo")[0]);
                        if (!channelvalidate.passed) {
                            ChannelPass = false;
                        }
                    }
                    if (ChannelPass) {
                        viewModel.edit(_index);
                    }
                }
            },
            //启用
            enable: function () {
                var selectedRows = viewModel.CustomerList.getSelectedRows();
                var ids = [];
                var status = [];
                var statustip = "";
                if (selectedRows && selectedRows.length > 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        ids.push(selectedRows[i].getValue("id"));
                        if (
                            selectedRows[i].getValue("isEnable") == 1 ||
                            selectedRows[i].getValue("isEnable") == "1"
                        ) {
                            status.push(selectedRows[i].getValue("code"));
                        }
                    }
                    if (status.length > 0) {
                        var statusArr = function () {
                            for (i = 0; i < status.length; i++) {
                                statustip += status[i] + "，";
                            }
                            return statustip.substring(0, statustip.length - 1);
                        };

                        toastr.warning("数据   " + statusArr() + " 不可重复启用");
                        return false;
                    }
                    ids = ids.join(",");
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-enable",
                        data: {
                            ids: ids
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isEnable", "1");
                            }
                            toastr.success("启用成功");
                        }
                    });
                } else {
                    toastr.warning("请先选择需要启用数据");
                }
            },
            //停用
            disable: function () {
                var selectedRows = viewModel.CustomerList.getSelectedRows();
                var ids = [];
                var status = [];
                var statustip = "";
                if (selectedRows && selectedRows.length > 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        ids.push(selectedRows[i].getValue("id"));
                        if (
                            selectedRows[i].getValue("isEnable") == 0 ||
                            selectedRows[i].getValue("isEnable") == "0"
                        ) {
                            status.push(selectedRows[i].getValue("code"));
                        }
                    }
                    if (status.length > 0) {
                        var statusArr = function () {
                            for (i = 0; i < status.length; i++) {
                                statustip += status[i] + "，";
                            }
                            return statustip.substring(0, statustip.length - 1);
                        };

                        toastr.warning("数据   " + statusArr() + " 不可重复停用");
                        return false;
                    }
                    ids = ids.join(",");
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-disable",
                        data: {
                            ids: ids
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isEnable", "2");
                            }
                            toastr.success("停用成功");
                        }
                    });
                } else {
                    toastr.warning("请先选择需要停用数据");
                }
            },
            //将操作后的数据进行保存
            edit: function (index) {
                var self = this;
                var currentRow,
                    type = "post";
                var postdata = viewModel.CustomerList.getFocusRow().getSimpleData();
                var dataListChild = viewModel.CustomerAddressList.getSimpleData();
                postdata.floatCoefficientDefs = dataListChild;
                postdata.state = 2
                if (index >= 0) {
                    type = "put";
                    postdata.persistStatus = "upd";
                }
                // postdata.isAutoEncoded = '1';
                //更改后台数据
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        //如果index大于等于0说明是修改
                        if (index >= 0) {
                            //获取需要修改的行
                            currentRow = viewModel.CustomerList.getRowByRowId(
                                viewModel.rowId
                            );

                            //将用户填写的数据更新到CustomerList上
                        } else {
                            //添加数据
                            currentRow = viewModel.CustomerList.getFocusRow();
                        }
                        currentRow.setSimpleData(data);
                        viewModel.flag = 1;
                        $("#productBase").hide();
                        $("#productBase_show").show();
                        if (data.isChannelCustomer == 1) {
                            $(".add-show-distributor").show();
                        }
                        // if (data.isOrganization == 1) {
                        //   $(".add-show-organization").show();
                        // }
                        $("#showCode").html(data.code);
                        toastr.success("保存成功");
                    }
                });
            },
            validate: function (element) {
                var result = viewModel.app.compsValidateMultiParam({
                    element: element,
                    showMsg: true
                });
                return result;
            },
            //收货地址区域选择限制
            areasCheck: function (obj) {
                var colIndex = obj.colIndex;
                var filedValue = obj.gridObj.gridCompColumnArr[colIndex].options.filed;
                if (colIndex == "6") {
                    var provinceId = viewModel.CustomerAddressList.getRow(
                        obj.rowIndex
                    ).getValue("provinceId");
                    if (!provinceId) {
                        toastr.warning("请先选择所在省份");
                        return false;
                    } else {
                        return true;
                    }
                } else if (colIndex == "7") {
                    var cityId = viewModel.CustomerAddressList.getRow(
                        obj.rowIndex
                    ).getValue("cityId");
                    if (!cityId) {
                        toastr.warning("请先选择所在城市");
                        return false;
                    } else {
                        return true;
                    }
                } else if (colIndex == "8") {
                    var countyId = viewModel.CustomerAddressList.getRow(
                        obj.rowIndex
                    ).getValue("countyId");
                    if (!countyId) {
                        toastr.warning("请先选择所在区/县");
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
            //联系人保存
            saveContact: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                var cId = curRow.getValue("id");
                var postdata = viewModel.ContactList.getSimpleData();
                var changeData = [];
                var newChangeData = [];
                var nochangeData = [];
                var delChangeData = [];
                if (postdata && postdata.length > 0) {
                    for (var i = 0; i < postdata.length; i++) {
                        if (postdata[i].persistStatus != "nrm") {
                            postdata[i].statusCode = 1;
                            postdata[i].customerId = cId;
                            changeData.push(postdata[i]);
                        } else {
                            nochangeData.push(postdata[i]);
                        }
                        if (postdata[i].persistStatus == "new") {
                            postdata[i].customerId = cId;
                            newChangeData.push(postdata[i]);
                        }
                        if (postdata[i].persistStatus == "fdel") {
                            postdata[i].customerId = cId;
                            delChangeData.push(postdata[i]);
                        }
                    }
                }
                if (changeData.length == 0) {
                    toastr.warning("没有相关数据需要保存");
                    return false;
                }
                if (newChangeData.length == 0) {
                    if (postdata.length == delChangeData.length) {
                        for (var i = 0; i < postdata.length; i++) {
                            for (var j = 0; j < delChangeData.length; j++) {
                                if (postdata[i] == delChangeData[j]) {
                                    toastr.warning("联系人已存在的情况下，不可全部删除");
                                    viewModel.cancelContact();
                                    return false;
                                }
                            }
                        }
                    }
                }
                var contactInfo = $("#contactInfo")[0];
                var contactPass = viewModel.validate(contactInfo);
                if (contactPass.passed) {
                    $._ajax({
                        url: appCtx + viewModel.ContactListUrl + "/batch-save",
                        type: "post",
                        data: JSON.stringify(changeData),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.ContactList.removeAllRows();
                            viewModel.ContactList.addSimpleData(data, "nrm", {
                                unSelect: true
                            });
                            viewModel.ContactList.addSimpleData(nochangeData, "nrm", {
                                unSelect: true
                            });
                            viewModel.contactdata = viewModel.ContactList.getSimpleData();
                            viewModel.currentFlag = 1;
                        }
                    });
                }
            },
            //地址保存
            saveAddress: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                var cId = curRow.getValue("id");
                var postdata = viewModel.CustomerAddressList.getSimpleData();
                var changeData = [];
                var nochangeData = [];
                if (postdata && postdata.length > 0) {
                    for (var i = 0; i < postdata.length; i++) {
                        if (postdata[i].persistStatus != "nrm") {
                            if (postdata[i].addrStatus == null) {
                                postdata[i].addrStatus = 1;
                                postdata[i].isAutoEncoded = 1;
                            }
                            //          	postdata[i].logisticPeriod=0;
                            postdata[i].customerId = cId;
                            changeData.push(postdata[i]);
                        } else {
                            nochangeData.push(postdata[i]);
                        }
                    }
                }
                if (changeData.length == 0) {
                    toastr.warning("没有相关数据需要保存");
                    return false;
                }
                var customerAddressInfo = $("#customerAddressInfo")[0];
                var customerAddressPass = viewModel.validate(customerAddressInfo);
                if (customerAddressPass.passed) {
                    $._ajax({
                        url: appCtx + viewModel.childListUrl + "/batch-save",
                        type: "post",
                        data: JSON.stringify(changeData),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.CustomerAddressList.removeAllRows();
                            viewModel.CustomerAddressList.addSimpleData(data, "nrm", {
                                unSelect: true
                            });
                            viewModel.CustomerAddressList.addSimpleData(nochangeData, "nrm", {
                                unSelect: true
                            });
                            viewModel.addressdata = viewModel.CustomerAddressList.getSimpleData();
                            viewModel.currentFlag = 1;
                        }
                    });
                }
            },
            saveInvoice: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                var cId = curRow.getValue("id");
                var postdata = viewModel.CustomerInvoiceList.getSimpleData();
                var changeData = [];
                var nochangeData = [];
                if (postdata && postdata.length > 0) {
                    for (var i = 0; i < postdata.length; i++) {
                        if (postdata[i].persistStatus != "nrm") {
                            postdata[i].customerId = cId;
                            changeData.push(postdata[i]);
                        } else {
                            nochangeData.push(postdata[i]);
                        }
                    }
                }
                if (changeData.length == 0) {
                    toastr.warning("没有相关数据需要保存");
                    return false;
                }
                var customerInvoiceInfo = $("#customerInvoiceInfo")[0];
                var customerInvoicePass = viewModel.validate(customerInvoiceInfo);
                if (customerInvoicePass.passed) {
                    $._ajax({
                        url: appCtx + viewModel.InvoiceUrl + "/batch-save",
                        type: "post",
                        data: JSON.stringify(changeData),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.CustomerInvoiceList.removeAllRows();
                            viewModel.CustomerInvoiceList.addSimpleData(data, "nrm", {
                                unSelect: true
                            });
                            viewModel.CustomerInvoiceList.addSimpleData(nochangeData, "nrm", {
                                unSelect: true
                            });
                            viewModel.invoicedata = viewModel.CustomerInvoiceList.getSimpleData();
                            viewModel.currentFlag = 1;
                        }
                    });
                }
            },
            //主表删除和批量删除
            del: function (data, rowId) {
                if (typeof data == "number") {
                    viewModel.CustomerList.setRowSelect(
                        viewModel.CustomerList.getRowByRowId(rowId)
                    );
                }
                var ids = [];
                var rows = viewModel.CustomerList.getSelectedRows();
                var status = [];
                var statustip = "";
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].getValue("id"));
                        var statusCode = rows[i].getValue("isEnable");
                        if (statusCode == 1 || statusCode == "1") {
                            status.push(rows[i].getValue("code"));
                        }
                    }
                    if (status.length > 0) {
                        var statusArr = function () {
                            for (i = 0; i < status.length; i++) {
                                statustip += status[i] + "，";
                            }
                            return statustip.substring(0, statustip.length - 1);
                        };

                        toastr.warning("数据   " + statusArr() + " 已启用不可删除");
                        return false;
                    }
                    common.dialog.confirmDialog({
                        msg1: "确认删除这些项？",
                        msg2: "此操作不可逆",
                        width: "400px",
                        type: "error",
                        onOk: function () {
                            $._ajax({
                                url: appCtx + viewModel.baseurl + "/delete",
                                type: "post",
                                data: "ids=" + ids.join(","),
                                success: function (data) {
                                    viewModel.CustomerList.removeRows(rows);
                                    toastr.success("删除成功");
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请先选择要删除的数据");
                }
            },
            //子表 删除和批量删除
            delChild: function (dataTable) {
                var rows = viewModel[dataTable].getSelectedRows();
                viewModel[dataTable].removeRows(rows);
            },
            //子表增行
            addRow: function (dataTable) {
                viewModel[dataTable].createEmptyRow();
                viewModel.currentFlag = 0;
            },
            //查看详情
            detail: function () {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    $(".detail-show").hide();
                    $(".detail-show-content").hide();
                    var curRow = viewModel.CustomerList.getCurrentRow();
                    var id = curRow.getValue("id");
                    var isChannelCustomer = curRow.getValue("isChannelCustomer");
                    // var isOrganization = curRow.getValue('isOrganization');
                    if (isChannelCustomer == 1) {
                        $(".detail-show")
                            .eq(0)
                            .show();
                        $(".detail-show-content")
                            .eq(0)
                            .show();
                    }
                    // if (isOrganization == 1) {
                    //   $(".detail-show").eq(1).show();
                    //   $(".detail-show-content").eq(1).show();
                    // }
                    viewModel.findByParentid(id);
                    viewModel.findByAddressid(id);
                    //viewModel.findByMarketid(id);
                    //viewModel.findByPartnerid(id);
                    viewModel.goDetailPanel();
                    //设置tab显示基本信息
                    $(".ui-bill-detail .u-tabs__tab")
                        .eq(0)
                        .addClass("is-active")
                        .siblings(".u-tabs__tab")
                        .removeClass("is-active");
                    $(".ui-bill-detail .u-tabs__panel")
                        .eq(0)
                        .addClass("is-active")
                        .siblings(".u-tabs__panel")
                        .removeClass("is-active");

                    viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
                }, 0);
            },
            //查询子表数据
            findByParentid: function (id) {
                $._ajax({
                    url: appCtx + viewModel.ContactListUrl + "/findByCustomerId",
                    type: "get",
                    async: false,
                    data: {
                        customerId: id
                    },
                    success: function (data) {
                        viewModel.ContactList.setSimpleData(data, {
                            unSelect: true
                        });
                    }
                });
            },
            findByAddressid: function (id) {
                $._ajax({
                    url: appCtx + viewModel.childListUrl + "/findByCustomerId",
                    type: "get",
                    async: false,
                    data: {
                        customerId: id
                    },
                    success: function (data) {
                        viewModel.CustomerAddressList.setSimpleData(data, {
                            unSelect: true
                        });
                    }
                });
            },
            //点击取消 单据页
            cancelHandle: function () {
                //	  			if(viewModel.currentTab==0){
                //							 var curRow = viewModel.CustomerList.getCurrentRow();
                //				        // 修改，则还原
                //				        if(curRow.getValue("id")) {
                //					        	if(curRow.status != "nrm"){
                //					            curRow.setSimpleData(viewModel.CustomerList.originEditData)
                //					        	}
                //				        }
                //				        // 新增或复制，则删除
                //				        else {
                //				          viewModel.CustomerList.removeRow(curRow);
                //				        }
                //		      }
                viewModel.search();
                viewModel.retListPanel();
            },
            //返回
            backPanel: function () {
                common.dialog.confirmDialog({
                    msg1: "确认返回列表页？",
                    msg2: "此操作不可逆",
                    width: "400px",
                    type: "error",
                    onOk: function () {
                        $("#code-text").empty();
                        viewModel.search();
                        viewModel.retListPanel();
                    }
                });
            },
            cancelContact: function () {
                viewModel.ContactList.removeAllRows();
                viewModel.ContactList.setSimpleData(viewModel.contactdata, {
                    unSelect: true
                });
                viewModel.currentFlag = 1;
            },
            cancelAddress: function () {
                viewModel.CustomerAddressList.removeAllRows();
                viewModel.CustomerAddressList.setSimpleData(viewModel.addressdata, {
                    unSelect: true
                });
                viewModel.currentFlag = 1;
            },
            cancelInvoice: function () {
                viewModel.CustomerAddressList.removeAllRows();
                viewModel.CustomerAddressList.setSimpleData(viewModel.invoicedata, {
                    unSelect: true
                });
                viewModel.currentFlag = 1;
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (viewModel.codeCount > 499) {
                    var params = viewModel.searchcomp.viewModel.params;
                    params.setValue("code", "");
                    toastr.warning("编码最多输入500个，请重新输入");
                    return false;
                }
                if (reindex) {
                    viewModel.CustomerList.pageIndex(0);
                }
                viewModel.CustomerList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr();
                queryData.size = viewModel.CustomerList.pageSize();
                queryData.page = viewModel.CustomerList.pageIndex();
                var oldCode = queryData["search_LIKE_code"];
                if (oldCode) {
                    queryData["search_IN_code"] = oldCode.replace(/%/g, "");
                }
                delete queryData["search_LIKE_code"];
                queryData["search_EQ_customerCategory.id"] = queryData["search_EQ_customerCategoryId"]
                delete queryData["search_EQ_customerCategoryId"];
                queryData["search_EQ_channelType.id"] = queryData["search_EQ_channelTypeId"]
                delete queryData["search_EQ_channelTypeId"];
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.CustomerList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.CustomerList.totalRow(data.totalElements);
                        viewModel.CustomerList.totalPages(data.totalPages);
                    }
                });
            },
            //清空搜索条件
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.CustomerList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.CustomerList.pageSize(size);
                viewModel.search(true);
            },
            //进入变更记录详情页
            showAlter: function (index, rowId) {
                var currentData = viewModel.CustomerList.getRowByRowId(
                    rowId
                ).getSimpleData();
                var customerId = currentData.id;
                //根据id查图片维护
                $.ajax({
                    url: appCtx + viewModel.alterurl,
                    type: "get",
                    data: {
                        search_EQ_customerId: customerId
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.AlterList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        // if (data.length > 0) {
                        //   for (var i = 0; i < data.length; i++) {
                        //     viewModel.alterArr.push(data[i].pictureUrl);
                        //   }
                        // }
                    }
                });
                // viewModel.goPicPanel();
                //跳转图片维护页
                $(".ui-panel").hide();
                $(".ui-bill-alter").show();
                $(".ui-bill-alter").animateCss("fadeIn");
            },
            //进入图片维护页
            picPage: function (index, rowId) {
                var currentData = viewModel.CustomerList.getRowByRowId(
                    rowId
                ).getSimpleData();
                viewModel.picRowId = currentData.id;
                //根据id查图片维护
                $.ajax({
                    url: appCtx + viewModel.picurl + "/findByCustomerId",
                    type: "get",
                    data: {
                        customerId: viewModel.picRowId
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.custCredPicList.setSimpleData(data, {
                            unSelect: true
                        });
                        if (data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                viewModel.picArr.push(data[i].pictureUrl);
                            }
                        }
                    }
                });
                viewModel.goPicPanel();
            },
            picBig: function (url) {
                var picUrl = url
                    .replace(/spot/g, ".")
                    .replace(/linePath/g, "/")
                    .replace(/lineThrough/g, "-");
                if (!picBigDialog) {
                    picBigDialog = u.dialog({
                        content: "#picBig-dialog",
                        hasCloseMenu: true
                    });
                } else {
                    picBigDialog.show();
                }
                $("#picBig-dialog")
                    .parent()
                    .parent()
                    .css("width", "auto");
                $("#picBig").attr("src", picUrl);
            },
            //上一张下一张
            prev: function () {
                var current = $("#picBig").attr("src");
                for (var i = 0; i < viewModel.picArr.length; i++) {
                    if (viewModel.picArr[i] == current) {
                        if (viewModel.picArr[i - 1]) {
                            $("#picBig").attr("src", viewModel.picArr[i - 1]);
                        } else {
                            $("#imgTip")
                                .html("已经是第一张了")
                                .show()
                                .fadeOut(5000);
                        }
                    }
                }
            },
            next: function () {
                var current = $("#picBig").attr("src");
                for (var i = 0; i < viewModel.picArr.length; i++) {
                    if (viewModel.picArr[i] == current) {
                        if (viewModel.picArr[i + 1]) {
                            $("#picBig").attr("src", viewModel.picArr[i + 1]);
                        } else {
                            $("#imgTip")
                                .html("已经是最后一张了")
                                .show()
                                .fadeOut(5000);
                        }
                    }
                }
            },
            //--------------------------------客户图片上传-------------------------------------------------
            //随机生成文件夹
            generateMixed: function () {
                var chars = [
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                    "K",
                    "L",
                    "M",
                    "N",
                    "O",
                    "P",
                    "Q",
                    "R",
                    "S",
                    "T",
                    "U",
                    "V",
                    "W",
                    "X",
                    "Y",
                    "Z"
                ];
                var result = "";
                for (var i = 0; i < 20; i++) {
                    var id = Math.ceil(Math.random() * 35);
                    result += chars[id];
                }
                return result;
            },
            //上传弹框调用
            showFileDialog: function () {
                viewModel.pk = viewModel.generateMixed();
                var pk = viewModel.pk;
                viewModel.fileQueryCustomer();
                if (!fileDialog) {
                    fileDialog = u.dialog({
                        content: "#file-dialog",
                        hasCloseMenu: true
                    });
                } else {
                    fileDialog.show();
                }
            },
            onOpenUploadWinCustomer: function () {
                $("#uploadbatch_id").val(undefined);
                $("#uploadbatch_id").trigger("click");
            },

            //上传附件
            onFileUploadCustomer: function () {
                var fileNum = $("#uploadbatch_id")[0].files.length;
                var fileSize = 0;
                var fileSizeMb = 0;
                var fileTypeArr = [];
                var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
                var fileSizeSum = (function () {
                    for (var i = 0; i < fileNum; i++) {
                        fileSize += $("#uploadbatch_id")[0].files[i].size;
                        var fileName = $("#uploadbatch_id")[0].files[i].name;
                        var fileType = fileName
                            .substr(fileName.lastIndexOf("."))
                            .toLowerCase();
                        fileTypeArr.push(fileType);
                    }
                    fileSizeMb = fileSize / 1024 / 1024;
                    return fileSizeMb;
                })();
                //modified by gongdb 客户附件可以上传非图片文件。
                //for (var i = 0; i < fileTypeArr.length; i++) {
                //    if (allowType.indexOf(fileTypeArr[i]) == -1) {
                //        toastr.warning("仅支持" + allowType + "格式文件");
                //        return false;
                //    }
                //}
                if (fileSizeSum <= 500) {
                    //获取表单
                    var pk = viewModel.pk;
                    var par = {
                        fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file"
                        // />,可以修改，主要看你使用的 id是什么
                        filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                        groupname: pk, //【必填】分組名称,未来会提供树节点
                        permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
                        url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
                        //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
                        cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                    };
                    var f = new interface_file();
                    f.filesystem_upload(par, viewModel.fileUploadCallbackCustomer);
                } else {
                    toastr.warning("图片总和不能超过500MB");
                    return false;
                }
            },
            //上传文件回传信息
            fileUploadCallbackCustomer: function (data) {
                //上传成功状态
                if (1 == data.status) {
                    var curRow = viewModel.CustomerList.getCurrentRow();
                    var cId = curRow.getValue("id");
                    var fileArr = [];
                    for (var i = 0; i < data.data.length; ++i) {
                        var fileObj = {};
                        fileObj.fileName = data.data[i].filename;
                        fileObj.fileSize = data.data[i].filesize;
                        fileObj.fileUrl = data.data[i].url;
                        fileObj.creationTime = data.data[i].uploadtime;
                        fileObj.customerId = cId;
                        fileArr.push(fileObj);
                    }
                    viewModel.CustAttachmentList.addSimpleData(fileArr, "new", { unSelect: true });
                    //  toastr.success();
                } else {
                    //error 或者加載js錯誤
                    toastr.error(data.message);
                }
            },
            fileQueryCustomer: function () {
                //获取表单
                var pk = viewModel.pk;
                var par = {
                    //建议一定要有条件否则会返回所有值
                    filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                    groupname: pk, //【选填】[分組名称,未来会提供树节点]
                    cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                };
                var f = new interface_file();
                f.filesystem_query(par, viewModel.fileQueryCallBackCustomer);
            },
            fileQueryCallBackCustomer: function (data) {
                if (1 == data.status) {
                    //上传成功状态
                    viewModel.CustAttachmentList.setSimpleData(data.data);
                } else {
                    //删除成功后查询
                    if (data.status == 0 && !data.data) {
                        viewModel.CustAttachmentList.setSimpleData([]);
                    }
                }
            },
            //附件删除
            fileDeleteCustomer: function () {
                var ids = [];
                var rows = viewModel.CustAttachmentList.getSelectedRows();
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].getValue("id"));
                    }
                    common.dialog.confirmDialog({
                        msg1: "确认删除这些项？",
                        msg2: "此操作不可逆",
                        width: "400px",
                        type: "error",
                        onOk: function () {
                            $._ajax({
                                url: appCtx + viewModel.custAttachmentUrl + "/delete",
                                type: "post",
                                // data: "ids=" + ids.join(","),
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function (data) {
                                    viewModel.CustAttachmentList.removeRows(rows);
                                    toastr.success("删除成功");
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请先选择需要删除数据");
                }
            },
            //下载
            fileDownloadCustomer: function () {
                var row = viewModel.CustAttachmentList.getSelectedRows();
                if (row == null || row.length == 0 || row.length > 1) {
                    toastr.error("请选择一个附件");
                    return;
                }
                for (var i = 0; i < row.length; i++) {
                    var pk = row[i].getValue("id");
                    var form = $("<form>"); //定义一个form表单
                    form.attr("style", "display:none"); //在form表单中添加查询参数
                    form.attr("target", "");
                    form.attr("enctype", "multipart/form-data");
                    form.attr("method", "post");
                    form.attr(
                        "action",
                        window.ctxfilemng +
                        "file/download?permission=read&stream=false&id=" +
                        pk
                    );
                    $("#file-dialog").append(form); //将表单放置在web中
                    form.submit();
                }
            },
            //查看
            fileViewCustomer: function () {
                var row = viewModel.CustAttachmentList.getSelectedRows();
                if (row == null || row.length == 0) {
                    toastr.error("请选择一个附件");
                    return;
                }
                for (var i = 0; i < row.length; i++) {
                    var url = row[i].getValue("fileUrl");
                    parent.open(location.origin + url);
                }
            },
            //图片保存
            savePic: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                var cId = curRow.getValue("id");
                var postdata = viewModel.CustAttachmentList.getSimpleData();
                if (postdata.length == 0) {
                    toastr.warning("没有相关数据需要保存");
                    return false;
                }
                console.log(postdata);
                $._ajax({
                    url: appCtx + viewModel.picurl + "/batch-save",
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    complete: function () {
                        u.hideLoader();
                    },
                    success: function (data) {
                        toastr.success("保存成功");
                        //fileDialog.hide();
                        viewModel.custCredPicList.addSimpleData(data, "nrm", {
                            unSelect: true
                        });
                    }
                });
            },
            saveFile: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                var cId = curRow.getValue("id");
                var postdata = viewModel.CustAttachmentList.getSimpleData();
                if (postdata.length == 0) {
                    toastr.warning("没有相关数据需要保存");
                    return false;
                }
                $._ajax({
                    url: appCtx + viewModel.custAttachmentUrl + "/batch-save",
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    complete: function () {
                        u.hideLoader();
                    },
                    success: function (data) {
                        toastr.success("保存成功");
                    }
                });
            },
            //图片关系保存
            //删除图片
            delPic: function (data) {
                if (typeof data == "number") {
                    viewModel.custCredPicList.setRowSelect(data);
                }
                var ids = [];
                var rows = viewModel.custCredPicList.getSelectedRows();
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].getValue("id"));
                    }
                    common.dialog.confirmDialog({
                        msg1: "确认删除这些项？",
                        msg2: "此操作不可逆",
                        width: "400px",
                        type: "error",
                        onOk: function () {
                            $._ajax({
                                url: appCtx + viewModel.picurl + "/delete",
                                type: "post",
                                // data: "ids=" + ids.join(","),
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function (data) {
                                    viewModel.custCredPicList.removeRows(rows);
                                    toastr.success("删除成功");
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请先选择需要删除数据");
                }
            },
            //--------------------------------客户图片上传-------------------------------------------------
            //导入
            importHandle: function () {
                var urlInfo = "/customer-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/customer-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportHandle: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var oldCode = searchParams["search_LIKE_code"];
                if (oldCode) {
                    searchParams["search_IN_code"] = oldCode.replace(/%/g, "");
                }
                delete searchParams["search_LIKE_code"];
                var templateUrl = "/customer-excel/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = "/customer-excel/excelDataExport"; //导出数据地址参数
                var listData = viewModel.CustomerList; //需要导出表格的dataTable
                var ele = $("#exportFiel")[0]; //挂载元素
                common.fileHandle.exportFile(
                    listData,
                    ele,
                    searchParams,
                    templateUrl,
                    excelDataUrl
                );
            },
            //导入
            importContact: function () {
                var urlInfo = "/contact-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/contact-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportContact: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                //搜索参数加customer.
                for (var p in searchParams) {
                    searchParams[
                        p.replace("LIKE_", "LIKE_customer.").replace("EQ_", "EQ_customer.")
                    ] =
                        searchParams[p];
                    delete searchParams[p];
                }
                searchParams["search_EQ_customer.dr"] = "0";
                var oldCode = searchParams["search_LIKE_customer.code"];
                if (oldCode) {
                    searchParams["search_IN_customer.code"] = oldCode.replace(/%/g, "");
                }
                delete searchParams["search_LIKE_customer.code"];
                var templateUrl = "/contact-excel/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = "/contact-excel/excelDataExport"; //导出数据地址参数
                var listData = viewModel.CustomerList; //需要导出表格的dataTable
                var ele = $("#exportFiel")[0]; //挂载元素
                common.fileHandle.exportFile(
                    listData,
                    ele,
                    searchParams,
                    templateUrl,
                    excelDataUrl
                );
            },
            //导入
            importCustomerAddress: function () {
                var urlInfo = "/customer-address-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/customer-address-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportCustomerAddress: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                //搜索参数加customer.
                for (var p in searchParams) {
                    searchParams[
                        p.replace("LIKE_", "LIKE_customer.").replace("EQ_", "EQ_customer.")
                    ] =
                        searchParams[p];
                    delete searchParams[p];
                }
                searchParams["search_EQ_customer.dr"] = "0";
                var oldCode = searchParams["search_LIKE_customer.code"];
                if (oldCode) {
                    searchParams["search_IN_customer.code"] = oldCode.replace(/%/g, "");
                }
                delete searchParams["search_LIKE_customer.code"];
                var templateUrl = "/customer-address-excel/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = "/customer-address-excel/excelDataExport"; //导出数据地址参数
                var listData = viewModel.CustomerList; //需要导出表格的dataTable
                var ele = $("#exportFiel")[0]; //挂载元素
                common.fileHandle.exportFile(
                    listData,
                    ele,
                    searchParams,
                    templateUrl,
                    excelDataUrl
                );
            },
            importPartner: function () {
                var urlInfo = "/partner-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/partner-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportPartner: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                //搜索参数加customer.
                for (var p in searchParams) {
                    searchParams[
                        p.replace("LIKE_", "LIKE_customer.").replace("EQ_", "EQ_customer.")
                    ] =
                        searchParams[p];
                    delete searchParams[p];
                }
                searchParams["search_EQ_customer.dr"] = "0";
                var oldCode = searchParams["search_LIKE_customer.code"];
                if (oldCode) {
                    searchParams["search_IN_customer.code"] = oldCode.replace(/%/g, "");
                }
                delete searchParams["search_LIKE_customer.code"];
                var templateUrl = "/partner-excel/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = "/partner-excel/excelDataExport"; //导出数据地址参数
                var listData = viewModel.CustomerList; //需要导出表格的dataTable
                var ele = $("#exportFiel")[0]; //挂载元素
                common.fileHandle.exportFile(
                    listData,
                    ele,
                    searchParams,
                    templateUrl,
                    excelDataUrl
                );
            }
        },
        afterCreate: function () {
            // 初始化折叠面板
            $.fn.collapsepanel(false, true);
            // 选择上传文件后，直接调用上传方法
            $("#fileiptwrap").on("change", "#uploadbatch_id", function () {
                if (this.value) {
                    viewModel.onFileUploadCustomer();
                }
            });
            //绑定输入框enter事件
            $("#customerlist-searchcontent input")
                .off("keydown")
                .on("keydown", function (e) {
                    if (e.keyCode == 13) {
                        $(this).blur();
                        viewModel.search();
                    }
                });
            viewModel.pictureCategoryRef.createEmptyRow();
            //判断上传选择图片分类
            viewModel.pictureCategoryRef.on("pictureCategory.valuechange", function (
                obj
            ) {
                viewModel.pictureCategory = obj.newValue;
                var refValues = $("#refContainerpictureCategory").data("uui.refer")
                    .values;
                viewModel.pictureCategoryName = refValues[0].refname;
            });
            //缴纳保证金
            viewModel.CustomerList.on("isDeposit.valuechange", function (obj) {
                //判断编辑时该字段数据无变化
                if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                    var deposit = viewModel.app.getComp("deposit");
                    if (obj.newValue == 1) {
                        deposit.setEnable(true);
                    } else {
                        deposit.setEnable(false);
                    }
                }
            });
            //经销商、组织
            $(".product-choose-result").hide();
            $(".product-choose-content").hide();
            $(".product-choose").each(function (index) {
                var _this = $(this);
                _this.click(function () {
                    if ($(this).hasClass("is-checked")) {
                        $(".product-choose-result")
                            .eq(index)
                            .show();
                        $(".product-choose-content")
                            .eq(index)
                            .show();
                    } else {
                        $(".product-choose-result")
                            .eq(index)
                            .hide();
                        $(".product-choose-content")
                            .eq(index)
                            .hide();
                        $(".product-choose-result")
                            .eq(index)
                            .removeClass("open");
                        $(".ui-collapse-content")
                            .eq(index + 1)
                            .attr("aria-hidden", "true")
                            .hide();
                    }
                });
            });
            //查询编码
            viewModel.searchcomp.viewModel.params.on("code.valuechange", function (
                obj
            ) {
                var code = obj.newValue;
                var word = " "; // 要计算的字符
                var regex = new RegExp(word, "g"); // 使用g表示整个字符串都要匹配
                var result = code.match(regex);
                viewModel.codeCount = !result ? 0 : result.length;
            });
            //tab切换校验
            setTimeout(function () {
                /*$('.u-tabs')[0]['u.Tabs'].on('tabchange', function(obj) {
                 viewModel.currentTab=obj.index;
                 if(viewModel.currentTab==3){
                 var curRow = viewModel.CustomerList.getCurrentRow();
                 var cId = curRow.getValue("id");
                 var fromAccountVlue={"EQ_customer.id":cId};
                 var toAccountVlue={"NOTEQ_customer.id":cId};
                 var fromAccount=viewModel.MarketAreaList.meta.fromAccountId;
                 var toAccount=viewModel.MarketAreaList.meta.toAccountId;
                 fromAccount["refparam"]=JSON.stringify(fromAccountVlue);
                 toAccount["refparam"]=JSON.stringify(toAccountVlue);
                 }
                 });*/
                $(".u-tabs")[0]["u.Tabs"].on("beforeTabChange", function (obj) {
                    viewModel.currentTab = obj.index;
                    //if (obj.index != 0) {
                    //    var persistStatus = viewModel.CustomerList.getCurrentRow().status;
                    //    if (viewModel.flag == 0 || persistStatus == "upd") {
                    //        toastr.warning("请先保存客户基本信息");
                    //        return false;
                    //    }
                    //}
                    switch (viewModel.currentTab) {
                        case 1:
                            viewModel.currentList = viewModel.ContactList;
                            viewModel.currentTip = "联系人";
                            break;
                        case 2:
                            viewModel.currentList = viewModel.CustomerAddressList;
                            viewModel.currentTip = "收货地址";
                            break;
                        case 3:
                            viewModel.currentList = viewModel.CustomerInvoiceList;
                            viewModel.currentTip = "开票信息";
                            break;
                        case 4:
                            viewModel.currentList = viewModel.CustAttachmentList;
                            viewModel.currentTip = "附件维护";
                            break;

                        default:
                            break;
                    }
                    //判断有无修改
                    var postdata = viewModel.currentList.getSimpleData();
                    var changeData = [];
                    if (postdata && postdata.length > 0) {
                        for (var i = 0; i < postdata.length; i++) {
                            if (postdata[i].persistStatus != "nrm") {
                                changeData.push(postdata[i]);
                            }
                        }
                        if (changeData.length > 0) {
                            viewModel.currentFlag = 0;
                        }
                    }
                    if (viewModel.currentFlag == 0) {
                        toastr.warning("请先保存" + viewModel.currentTip + "信息");
                        return false;
                    }
                    return true;
                });
            }, 100);
            //枚举
            $._ajax({
                type: "get",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                data: {
                    cust_doc_code_batch: "QY021,QY022,QY025,QY067,QY068,QY076,QY108,QY128,CUSTOMER_SOURCE"
                },
                success: function (data) {
                    var newarray;
                    newarray = common.dataconvert.toMap(data["QY021"], "name", "code");
                    viewModel.registTypeSrc(newarray);
                    newarray = common.dataconvert.toMap(data["QY025"], "name", "code");
                    viewModel.marketTypeSrc(newarray);
                    newarray = common.dataconvert.toMap(data["QY067"], "name", "code");
                    viewModel.rebateProblemSrc(newarray);
                    newarray = common.dataconvert.toMap(data["QY068"], "name", "code");
                    viewModel.afterServiceAccountSrc(newarray);
                    newarray = common.dataconvert.toMap(data["QY076"], "name", "code");
                    viewModel.managementTypeSrc(newarray);
                    newarray = common.dataconvert.toMap(data["QY108"], "name", "code");
                    viewModel.customerRankSrc(newarray);
                    newarray = common.dataconvert.toMap(data["QY128"], "name", "code");
                    viewModel.invoiceTypeSrc(newarray);
                    newarray = common.dataconvert.toMap(data["QY022"], "name", "code");
                    viewModel.credentialsTypeSrc(newarray);
                    newarray = common.dataconvert.toMap(data["CUSTOMER_SOURCE"], "name", "code");
                    viewModel.customerSourceSrc(newarray);
                }
            });

            // 基本信息
            viewModel.CustomerList.on("isInnerOrganization.valuechange", function (
                obj
            ) {
                var comp = viewModel.app.getComp("innerorganizationIdBase");
                if (obj.newValue == 1) {
                    comp.setEnable(true);
                } else {
                    comp.setEnable(false);
                    viewModel.CustomerList.setValue("organizationId", null);
                }
            });
            //基本信息   省、城市、区县、街道四级联动
            viewModel.CustomerList.on("provinceId.valuechange", function (obj) {
                var cityValue = {
                    "EQ_parent.id": obj.newValue
                };
                $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
                // viewModel.CustomerList.meta.cityId.refparam = cityValue
                var cityId = viewModel.app.getComp("cityIdBase");
                viewModel.CustomerList.setValue("cityId", "");
                viewModel.CustomerList.setValue("cityCode", "");
                viewModel.CustomerList.setValue("cityName", "");
                if (obj.oldValue != obj.newValue) {
                    cityId.setEnable(true);
                } else {
                    cityId.setEnable(false);
                }
            });
            viewModel.CustomerList.on("cityId.valuechange", function (obj) {
                var countyValue = {
                    "EQ_parent.id": obj.newValue
                };
                $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
                var countyId = viewModel.app.getComp("countyIdBase");
                viewModel.CustomerList.setValue("countyId", "");
                viewModel.CustomerList.setValue("countyCode", "");
                viewModel.CustomerList.setValue("countyName", "");
                if (obj.oldValue != obj.newValue) {
                    countyId.setEnable(true);
                } else {
                    countyId.setEnable(false);
                }
            });
            viewModel.CustomerList.on("countyId.valuechange", function (obj) {
                //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
                //       a["EQ_parent.id"]=obj.newValue;
                var townValue = {
                    "EQ_parent.id": obj.newValue
                };
                $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
                var townId = viewModel.app.getComp("townIdBase");
                viewModel.CustomerList.setValue("townId", "");
                viewModel.CustomerList.setValue("townCode", "");
                viewModel.CustomerList.setValue("townName", "");
                if (obj.oldValue != obj.newValue) {
                    townId.setEnable(true);
                } else {
                    townId.setEnable(false);
                }
            });
            // viewModel.CustomerList.on("oneCategoryId.valuechange", function (obj) {
            //   if (!$("#refContaineroneCategoryId-input").data("uui.refer").values) {
            //     return
            //   }
            //   var data = $("#refContaineroneCategoryId-input").data("uui.refer").values[0];
            //   var newrow = viewModel.CustomerList.getCurrentRow();
            //   //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
            //   //       a["EQ_parent.id"]=obj.newValue;

            //   if (data.isGenCode == 0) {
            //     $("#code-input").show();
            //     // $("#code-text").show().html(code);
            //   } else {
            //     newrow.setValue("code", "");
            //     $("#code-input").hide();
            //     // $("#code-text").show().html(code);
            //   }
            // });

            //收货地址   省、城市、区县、街道四级联动
            viewModel.CustomerAddressList.on("provinceId.valuechange", function (obj) {
                var provinceId = obj.newValue;
                viewModel.CustomerAddressList.meta.cityId.refparam =
                    "{\"EQ_areaLevel\":\"2\",\"EQ_parent.id\":\"" + provinceId + "\"}";
                if (obj.newValue != obj.oldValue) {
                    viewModel.CustomerAddressList.setValue("cityId", "");
                    viewModel.CustomerAddressList.setValue("cityName", "");
                    viewModel.CustomerAddressList.setValue("countyId", "");
                    viewModel.CustomerAddressList.setValue("countyName", "");
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                }
            });
            viewModel.CustomerAddressList.on("cityId.valuechange", function (obj) {
                var cityId = obj.newValue;
                viewModel.CustomerAddressList.meta.countyId.refparam =
                    "{\"EQ_areaLevel\":\"3\",\"EQ_parent.id\":\"" + cityId + "\"}";
                if (obj.newValue != obj.oldValue) {
                    viewModel.CustomerAddressList.setValue("countyId", "");
                    viewModel.CustomerAddressList.setValue("countyName", "");
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                }
            });
            viewModel.CustomerAddressList.on("countyId.valuechange", function (obj) {
                var countyId = obj.newValue;
                viewModel.CustomerAddressList.meta.townId.refparam =
                    "{\"EQ_areaLevel\":\"4\",\"EQ_parent.id\":\"" + countyId + "\"}";
                if (obj.newValue != obj.oldValue) {
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                }
            });

            //加载条
            viewModel.onLoading = function onLoading() {
                var centerContent =
                    "<i class=\"fa fa-cloud u-loader-centerContent\"></i>";
                var opt1 = {
                    hasback: true,
                    hasDesc: true, //是否含有加载内容描述
                    centerContent: centerContent
                };
                u.showLoader(opt1);
            };

            //关闭加载条
            viewModel.onCloseLoading = function onCloseLoading() {
                u.hideLoader();
            };
        }
    });

    return view;
});
