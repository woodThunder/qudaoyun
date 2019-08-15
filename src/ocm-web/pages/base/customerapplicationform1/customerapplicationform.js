define([
    "text!./customerapplicationform.html",
    "ocm_common",
    "ocm_baseview",
    "../customer/meta.js",
    "./meta.js",
    "../shop/meta.js",
    "../../flow/bpmapproveref/bpmopenbill.js",
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl"
], function (tpl, common, baseview, model, applicationModel, shopModel, bpmopenbill) {
    "use strict";
    var viewModel, fileDialog, picBigDialog;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
            //viewModel = u.extend({},baseData,events,rendertype,bpmopenbill.model)
            viewModel = _.extend(viewModel, bpmopenbill.model);
        },


        tpl: tpl,
        model: model,
        baseData: {
            baseurl: "/base/customers",
            applicationUrl: "/base/cus-req-forms",
            shopUrl: "/base/shops",
            shopContactUrl: "/base/shop-contacts",
            childListUrl: "/base/customer-addresses",
            ContactListUrl: "/base/customer-contacts",
            accountUrl: "/base/customer-accounts/",
            InvoiceUrl: "/base/customer-invoices",
            MarketAreatUrl: "/market-connect",
            PartnerListUrl: "/partner",
            picurl: "/cust-cred-pic",
            ctxfilemng: "/iuap-saas-filesystem-service/",
            alterurl: "/base/customer-alters",
            billFlowConfigUrl: window.pathMap["cmpt"] + "/cmpt/bill-flow-configs",
            //客户申请单信息
            customerApplicationList: new u.DataTable(applicationModel.options.metas.CusReqFormMeta),
            CustomerList: new u.DataTable(applicationModel.options.metas.Customermeta),
            ShopList: new u.DataTable(applicationModel.options.metas.Shopmeta),
            ShopContactList: new u.DataTable(applicationModel.options.metas.ShopContactmeta),
            ContactList: new u.DataTable(model.options.metas.Contactmeta),
            AccountList: new u.DataTable(model.options.metas.CustomerAccountmeta),
            CustomerAddressList: new u.DataTable(
                model.options.metas.CustomerAddressmeta
            ),
            CustomerInvoiceList: new u.DataTable(model.options.metas.CustomerInvoicemeta),
            custCredPicList: new u.DataTable(model.options.metas.custCredPicmeta),
            pictureCategoryRef: new u.DataTable(
                model.options.metas.pictureCategoryRef
            ),
            FileList: new u.DataTable(model.options.metas.FileMeta),
            AlterList: new u.DataTable(model.options.metas.CustomerAltermeta),
            whetherSource: [{
                value: "1",
                name: "是"
            },
            {
                value: "0",
                name: "否"
            }
            ],
            whetherSaleSource: [{
                value: "1",
                name: "延续"
            },
            {
                value: "0",
                name: "不延续"
            }
            ],
            stateSrc: [{
                value: "0",
                name: "无效"
            },
            {
                value: "1",
                name: "有效"
            }
            ],
            statusSource: [{
                value: "1",
                name: "启用"
            },
            {
                value: "0",
                name: "停用"
            }
            ],
            cooperateStateSrc: [{
                value: "1",
                name: "合作"
            },
            {
                value: "0",
                name: "不合作"
            }
            ],
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
            shopContactType: ko.observableArray([]),
            customerSourceSrc: ko.observableArray([]),
            accountNatureSrc: ko.observableArray([]),
            customerTypeSourceSrc: ko.observableArray([]),
            custLinkTypeSrc: ko.observableArray([]),
            shopNature: ko.observableArray([]),
            shopType: ko.observableArray([]),
            customerReqState: ko.observableArray([]),
            flag: 0,
            currentFlag: 1,
            currentTab: 0,
            currentList: "",
            currentTip: "",
            picRowId: "",
            applicationdata: [],
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
            searchSource: applicationModel.options.searchs.search1,
            ensureRefKeys: "searchcomp",
            //申请单id，
            applicationId: "",

            button0Source: applicationModel.options.buttons.button0,
            button1Source: applicationModel.options.buttons.button1,
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
            button12Source: applicationModel.options.buttons.button12,
            button13Source: applicationModel.options.buttons.button13,
            button14Source: applicationModel.options.buttons.button14,
            buttonMenu1Source: model.options.buttonmenus.buttonmenu1,
            button15Source: applicationModel.options.buttons.button2,
            button16Source: applicationModel.options.buttons.button15,
            button17Source: applicationModel.options.buttons.button16,

            card0Source: applicationModel.options.cards.card1,
            card1Source: applicationModel.options.cards.card2,
            card2Source: applicationModel.options.cards.card3,
            //card3Source: model.options.cards.card3,
            detail0Source: applicationModel.options.details.detail1,
            detail1Source: applicationModel.options.details.detail3,
            detail2Source: applicationModel.options.details.detail2,
            //detail3Source: model.options.details.detail3,
            grid0Option: applicationModel.options.grids.grid1,
            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2,
            grid3Option: model.options.grids.grid3,
            grid4Option: model.options.grids.grid4,
            grid5Option: model.options.grids.grid5,
            grid6Option: model.options.grids.grid6,
            grid7Option: model.options.grids.grid7,
            grid8Option: model.options.grids.grid8,
            grid9Option: model.options.grids.grid9,
            grid10Option: applicationModel.options.grids.grid10,
            grid11Option: applicationModel.options.grids.grid11,
            grid12Option: model.options.grids.grid10,
            grid13Option: model.options.grids.grid11,
            grid14Option: applicationModel.options.grids.grid12,
            grid15Option: applicationModel.options.grids.grid13,
            grid16Option: applicationModel.options.grids.grid14,
            grid17Option: applicationModel.options.grids.grid15,
            //跳转单据页
            goBillPanel: common.bill.goBillPanel,
            //跳转单据详情页
            goDetailPanel: common.bill.goDetailPanel,
            billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
            saleChannelDataSource: ko.observableArray([]),

            //地址簿
            addresscardcomp: {},
            //返回列表页
            retListPanel: common.bill.retListPanel,
            dialog1Source: model.options.dialogs.dialog1,
            //跳转图片维护页
            goPicPanel: common.bill.goPicPanel
        },
        rendertype: {
            //跳转详情页
            operation4single: common.rendertype.operation4single,
            detailRender: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var detailfun = "data-bind=click:detail.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    "<a href=\"#\" class=\"ui-a-detail\" " +
                    detailfun +
                    ">" +
                    obj.value +
                    "</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            operation: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var billStatusCode = obj.row.value.state;
                var editfun, delfun, alterfun;
                // 未提交的申请单才可以编辑和删除
                if (billStatusCode == 0) {
                    delfun =
                        "data-bind=click:del.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    editfun =
                        "data-bind=click:beforeEdit.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    alterfun =
                        "data-bind=click:showAlter.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                }else {
                    delfun = 'class="disabled"';
                    editfun = 'class="disabled"';
                }
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
                    "</span></div>";
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
            customerRankRender: function (obj) {
                var showValue = obj.value == "01" ? "直接客户" : "间接客户";
                obj.element.innerHTML = showValue;
            },

            approveStateRender: function (obj) {
                var showValue;
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
                stateValue == 1 ? (stateName = "启用") : (stateName = "停用");
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
            //是否默认--收货地址
            isDefaultCA: function (obj) {
                var isDefault = viewModel.CustomerAddressList.getRow(obj.rowIndex).getValue(
                    "isDefault"
                );
                var name;
                isDefault == 1 ? (name = "是") : (name = "否");
                obj.element.innerHTML = name;

            },
            //是否默认--联系人
            isDefaultContact: function (obj) {
                var isDefault = viewModel.ContactList.getRow(obj.rowIndex).getValue(
                    "isDefault"
                );
                var name;
                isDefault == 1 ? (name = "是") : (name = "否");
                obj.element.innerHTML = name;
            },
            //是否默认--门店联系人
            isDefaultShopContact: function (obj) {
                var isDefault = viewModel.ShopContactList.getRow(obj.rowIndex).getValue(
                    "isDefault"
                );
                var name;
                isDefault == 1 ? (name = "是") : (name = "否");
                obj.element.innerHTML = name;
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
            //是否默认--客户账户
            isDefaultACC: function (obj) {
                var isDefault = viewModel.AccountList.getRow(obj.rowIndex).getValue(
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
            // customerTypeGrid: function (obj) {
            //     var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue(
            //         "customerType"
            //     );
            //     var stateName;
            //     stateValue == 1 ? (stateName = "是") : (stateName = "否");
            //     obj.element.innerHTML = stateName;
            // },
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
             //采购添加表格地址编辑
             addressInfo: function (options) {
                var grid = options.gridObj,
                    datatable = grid.dataTable, //前一行的数据
                    viewModel = grid.viewModel,
                    field = options.field,
                    element = options.element,
                    column = grid.getColumnByField(field),
                    rowId = options.rowObj['$_#_@_id'],
                    row = datatable.getRowByRowId(rowId), //当前Row
                    addr = row.getValue(field) ? row.getValue(field) : "双击编辑地址";

                var oldCountryId = row.getValue('countryId'), //获取原有数据
                    oldProvinceId = row.getValue('provinceId'),
                    oldCityId = row.getValue('cityId'),
                    oldDistrictId = row.getValue('countyId'),
                    oldTownId = row.getValue('townId'),
                    oldReceiveAddress = row.getValue('receiveAddress'),
                    oldDetailAddr = row.getValue('detailAddr');

                var htmlStr = '<div class="input-group u-has-feedback">' +
                    '<input type="text" class="form-control addressinput" title="' + addr + '" placeholder="双击编辑地址">' +
                    '<span class="u-form-control-feedback uf uf-symlist"></span>' +
                    '</div>';
                $(element).html(htmlStr)
                ko.cleanNode(element);
                ko.applyBindings(viewModel, element);
                $(element)
                    .find("input.addressinput")
                    .on("dblclick", function (e) { //触发双击事件
                        var tar = e.target;
                        var provinceId = viewModel.addresscardcomp.app.getComp("provinceIdBase");
                        var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        if (!oldDetailAddr || oldDetailAddr == '') { //如果原有数据为空弹出框的输入框为空，默认显示中国
                            viewModel.addresscardcomp.viewModel.params.setValue("provinceId", "");
                            viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                            viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                            viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '');
                            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', '');
                            viewModel.addresscardcomp.viewModel.params.setValue("countryId", "8dc2fc87-0a4f-420b-8d1a-b74b1278f24b"); //默认显示中国
                            districtId.setEnable(false);
                            cityId.setEnable(false);
                            townId.setEnable(false);
                        } else { //如果有就显示原有数据
                            viewModel.addresscardcomp.viewModel.params.setValue("countryId", oldCountryId);
                            viewModel.addresscardcomp.viewModel.params.setValue("provinceId", oldProvinceId);
                            viewModel.addresscardcomp.viewModel.params.setValue("cityId", oldCityId);
                            viewModel.addresscardcomp.viewModel.params.setValue("districtId", oldDistrictId);
                            viewModel.addresscardcomp.viewModel.params.setValue("townId", oldTownId);
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', oldDetailAddr);
                            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', oldReceiveAddress);

                            if (oldCityId && oldCityId != '') { //判断城市不为空则设置为可编辑
                                cityId.setEnable(true);
                                districtId.setEnable(true);
                            } else {
                                cityId.setEnable(false);
                                districtId.setEnable(false);
                                townId.setEnable(false);
                            }
                            if (oldDistrictId && oldDistrictId != '') {
                                districtId.setEnable(true);
                                townId.setEnable(true);
                            } else {
                                districtId.setEnable(false);
                                townId.setEnable(false);
                            }
                        }
                        viewModel.addresscardcomp.show("地址信息", "800px", viewModel.addrOk); //弹出对话框并设置保存按钮的方法
                    });
            },
            addrOk: function () {
                var result = viewModel.addresscardcomp.validate();
                if (!result.passed) return;
                var rows = viewModel.CustomerAddressList.getCurrentRow(),
                    postdata = viewModel.addresscardcomp.geteidtData();
                rows.setValue('countryId', postdata.countryId);
                rows.setValue('provinceId', postdata.provinceId);
                rows.setValue('cityId', postdata.cityId);
                rows.setValue('countyId', postdata.districtId);
                rows.setValue('townId', postdata.townId);
                rows.setValue('receiveAddress', postdata.detailAddr);
                rows.setValue('detailAddr', postdata.receiveAddress);
                // rows.setValue('address', postdata.detailAddr);
                viewModel.addresscardcomp.close();
            },

            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，-2为复制,大于等于0为编辑)
            beforeEdit: function (index, rowId) {
                // if (index >= 0) {
                //     var state = viewModel.customerApplicationList.getRowByRowId(rowId).getValue("state")
                //     if (state != 0 && state != 3) {
                //         toastr.warning("不允许修改审批中和审批已通过的信息");
                //         return;
                //     }
                // }
                setTimeout(function(){
                    var self = this;
                    viewModel.index = index;
                    viewModel.rowId = rowId;
                    viewModel.goBillPanel();
                    viewModel.ContactList.clear();
                    viewModel.CustomerAddressList.clear();
                    /*viewModel.MarketAreaList.clear();
                    viewModel.PartnerList.clear();*/
                    $("#productBase").show();
                    $("#productBase_show").hide();

                    $("#applyBase").show();
                    $("#applyBase_show").hide();

                    $("#shopproductBase").show();
                    $("#shopproductBase_show").hide();

                    //置空申请单id
                    viewModel.applicationId = "";
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
                    // //客户申请单 客户信息中隐藏来源和申请单编码
                    // var cusReqFormId = viewModel.app.getComp("cusReqFormId");
                    // var customerSourceCode = viewModel.app.getComp("customerSourceCode");
                    // cusReqFormId.element.parentElement.parentElement.hidden = true;
                    // customerSourceCode.element.parentElement.hidden = true;
                    // //客户申请单 客户信息中隐藏冻结和启用状态
                    // var isFrozen = viewModel.app.getComp("isFrozen");
                    // var isEnable = viewModel.app.getComp("isEnable");
                    // isFrozen.element.parentElement.hidden = true;
                    // isEnable.element.parentElement.hidden = true;
                    if (index != "-1" && typeof index != "number" ) {
                        rowId = viewModel.customerApplicationList.getCurrentRow().rowId;
                        index = viewModel.customerApplicationList.getIndexByRowId(rowId);
                        viewModel.index = index;
                        viewModel.rowId = rowId;
                    }
                    viewModel.getData(index, rowId);
                }, 0)
                
            },
            getData: function (index, rowId) {

                viewModel.currentFlag = 1;
                viewModel.currentTab = 0;
                if (index >= 0) {
                    //add by gongdb
                    var currentDataId = viewModel.customerApplicationList.getRowByRowId(
                        rowId
                    ).getValue("id");
                    viewModel.initBPMFromBill(currentDataId, viewModel);
                    //编辑时不需要先保存客户申请单
                    viewModel.applyBaseIsSaved = true;
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                    //修改操作

                    viewModel.applicationId = currentDataId;
                    var code = viewModel.customerApplicationList.getRowByRowId(rowId).getValue(
                        "code"
                    );
                    viewModel.customerApplicationList.originEditData = viewModel.customerApplicationList.getRowByRowId(
                        rowId
                    ).getSimpleData();
                    $("#code-input").hide();
                    $("#code-text")
                        .show()
                        .html(code);
                    viewModel.flag = 1;
                    //根据id查客户表
                    $._ajax({
                        url: appCtx + viewModel.baseurl + "/findByCusReqFormId",
                        type: "get",
                        data: {
                            cusReqFormId: currentDataId
                        },
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == undefined || data == "") {
                                //新增的客户，客户来源为申请单,未启用，未冻结
                                data = {
                                    customerSourceId: "96d11296-51dd-4a08-a0c9-61d4745887c1",
                                    customerSourceCode: "02",
                                    customerSourceName: "客户申请单",
                                    isFrozen: "0",
                                    isEnable: "0"
                                };
                            }

                            viewModel.CustomerList.setSimpleData(data, {
                                unSelect: true
                            });
                            viewModel.customerdata = viewModel.CustomerList.getSimpleData();
                            // viewModel.CustomerList.setRowFocus(data);
                            var customerId = data.id ? data.id : "";
                            viewModel.customerId = data.id;
                            var customerRow = viewModel.CustomerList.createEmptyRow();
                            customerRow.setSimpleData(data);
                            viewModel.CustomerList.setRowFocus(customerRow);

                            //根据id查联系人表
                            $._ajax({
                                url: appCtx + viewModel.ContactListUrl + "/findByCustomerId",
                                type: "get",
                                data: {
                                    customerId: customerId
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
                                    customerId: customerId
                                },
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    for(var i=0;i<data.length;i++){
                                        var address = data[i].countryName + data[i].provinceName + data[i].cityName +data[i].countyName + data[i].townName
                                        data[i].receiveAddress = address;
                                    }
                                    viewModel.CustomerAddressList.setSimpleData(data, {
                                        unSelect: true
                                    });
                                    viewModel.addressdata = viewModel.CustomerAddressList.getSimpleData();
                                }
                            });
                            //根据id查账户表
                            if (customerId != undefined && customerId != "") {
                                $._ajax({
                                    url: appCtx + viewModel.accountUrl + "find-by-customer-id/" + customerId,
                                    type: "get",
                                    contentType: "application/json; charset=utf-8",
                                    success: function (data) {
                                        viewModel.AccountList.setSimpleData(data, {
                                            unSelect: true
                                        });
                                    }
                                });
                            }
                            //根据id查开票信息
                            $._ajax({
                                url: appCtx + viewModel.InvoiceUrl + "/findByCustomerId",
                                type: "get",
                                data: {
                                    customerId: customerId
                                },
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    viewModel.CustomerInvoiceList.setSimpleData(data, {
                                        unSelect: true
                                    });
                                    viewModel.invoicedata = viewModel.CustomerInvoiceList.getSimpleData();
                                }
                            });
                            //根据id门店信息
                            $._ajax({
                                url: appCtx + viewModel.shopUrl + "/findByCustomerId",
                                type: "get",
                                data: {
                                    customerId: customerId
                                },
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {

                                    viewModel.ShopList.setSimpleData(data, {
                                        unSelect: true
                                    });
                                    viewModel.shopdata = viewModel.ShopList.getSimpleData();
                                    var shopId = data.id ? data.id : "";
                                    viewModel.shopId = data.id;
                                    var shopRow = viewModel.ShopList.createEmptyRow();
                                    shopRow.setSimpleData(data);
                                    viewModel.ShopList.setRowFocus(shopRow);

                                    // 门店联系人
                                    if (shopId) {
                                        $._ajax({
                                            url: appCtx + viewModel.shopContactUrl + "/findByShopId",
                                            type: "get",
                                            data: {
                                                shopId: shopId
                                            },
                                            contentType: "application/json; charset=utf-8",
                                            success: function (data) {
                                                viewModel.ShopContactList.setSimpleData(data, { unSelect: true });
                                                viewModel.shopContactdata = viewModel.ShopContactList.getSimpleData();
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                    //查询附件表
                    viewModel.fileQueryCustomer();
                } else if (index === -2) {
                    // add by gongdb 隐藏审批的框
                    $("#bpmhead").html("");
                    $("#bpmfoot").html("");
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
                    //新增操作
                    // $("#code-input").show();
                    // $("#code-text").hide();
                    // $("#oneCategoryId-input").show();
                    // $("#oneCategoryId-text").hide();
                    // add by gongdb 隐藏审批的框
                    $("#bpmhead").html("");
                    $("#bpmfoot").html("");
                    viewModel.applyBaseIsSaved = false;
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                    viewModel.flag = 0;
                    viewModel.CustomerList.createEmptyRow();
                    var currentRow = viewModel.CustomerList.createEmptyRow();
                    //新增的客户，客户来源为申请单,未启用，未冻结
                    var data = {
                        customerSourceId: "96d11296-51dd-4a08-a0c9-61d4745887c1",
                        customerSourceCode: "02",
                        customerSourceName: "客户申请单",
                        isFrozen: "0",
                        isEnable: "0"
                    };


                    currentRow.setSimpleData(data);
                    viewModel.CustomerList.setRowFocus(currentRow);


                    viewModel.customerApplicationList.createEmptyRow();
                    var currentRow1 = viewModel.customerApplicationList.createEmptyRow();
                    viewModel.customerApplicationList.setRowFocus(currentRow1);
                    viewModel.ShopList.createEmptyRow();
                    var currentRow2 = viewModel.ShopList.createEmptyRow();
                    viewModel.ShopList.setRowFocus(currentRow2);
                    //新增时，打开页面前清空前一次数据
                    viewModel.ContactList.setSimpleData([]);
                    viewModel.CustomerAddressList.setSimpleData([]);
                    viewModel.CustomerInvoiceList.setSimpleData([]);
                    viewModel.ShopContactList.setSimpleData([]);
                    viewModel.FileList.setSimpleData([]);
                    for (var k in currentRow) {
                        if (k.indexOf("is") > -1 && currentRow[k] == null) {
                            currentRow[k] = 0;
                        }
                    }

                    for (var k1 in currentRow) {
                        if (k1.indexOf("is") > -1 && currentRow[k1] == null) {
                            currentRow[k1] = 0;
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
            //是否内部组织
            // customerType: ko.pureComputed(function () {
            //     var dataValue = viewModel.CustomerList.ref("customerType")();
            //     var showName;
            //     dataValue == 1 ? (showName = "是") : (showName = "否");
            //     return showName;
            // }),
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
                dataValue == 1 ? (showName = "启用") : (showName = "停用");
                return showName;
            }),
            // //是否启用
            stateComputed: ko.pureComputed(function () {
                var dataValue = viewModel.customerApplicationList.ref("state")();
                var showName;

                if (dataValue == 0) {
                    (showName = "待处理")
                }
                if (dataValue == 1) {
                    (showName = "已提交")
                }
                if (dataValue == 2) {
                    (showName = "审批中")
                }
                if (dataValue == 3) {
                    (showName = "审批通过")
                }
                if (dataValue == 4) {
                    (showName = "审批不通过")
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
                    // if (isChannelCustomer == 1) {
                    // var channelvalidate = viewModel.validate($("#channelInfo")[0]);
                    // if (!channelvalidate.passed) {
                    //     ChannelPass = false;
                    // }
                    //  }
                    if (ChannelPass) {
                        viewModel.edit(_index);
                    }
                }
            },
            saveApplicationHandle: function () {
                var row = viewModel.customerApplicationList.getFocusRow();
                var postdata = row.getSimpleData();
                //  var postdata = viewModel.CustomerList.getFocusRow().getSimpleData();
                var type = "post";
                if (postdata.id) {
                    type = "put";
                }
                $._ajax({
                    url: appCtx + viewModel.applicationUrl,
                    type: type,
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    complete: function () {
                        u.hideLoader();
                    },
                    success: function (data) {
                        // viewModel.customerApplicationList.removeAllRows();
                        row.setSimpleData(data);
                        viewModel.customerApplicationList.setRowFocus(row);
                        // viewModel.customerApplicationList.addSimpleData(data, "nrm", {
                        //     unSelect: true
                        // });
                        viewModel.applicationdata = viewModel.customerApplicationList.getSimpleData();
                        viewModel.applicationId = data.id;
                        $("#applyBase").hide();
                        $("#applyBase_show").show();
                        viewModel.applyBaseIsSaved = true;
                        toastr.success("保存成功");
                    }
                });
            },

            saveShopHandle: function () {
                var postdata = viewModel.ShopList.getFocusRow().getSimpleData();
                postdata.customerId = viewModel.customerId;
                postdata.cusReqFormId = viewModel.applicationId;
                postdata.sourceCode = "02";
                var type = "post";
                if (postdata.id) {
                    type = "put";
                }
                //门店默认为未启用,默认为默认门店
                postdata.isEnable = 0;
                postdata.isDefault = 1;
                $._ajax({
                    url: appCtx + viewModel.shopUrl,
                    type: type,
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    complete: function () {
                        u.hideLoader();
                    },
                    success: function (data) {
                        // debugger;
                        viewModel.ShopList.setSimpleData(data, "nrm", {
                            unSelect: true
                        });
                        viewModel.shopdata = viewModel.ShopList.getSimpleData();
                        viewModel.shopId = data.id;
                        $("#shopproductBase").hide();
                        $("#shopproductBase_show").show();
                        // viewModel.applyBaseIsSaved = true;
                        toastr.success("保存成功");
                    }
                });
            },
            //联系人保存
            saveShopContact: function () {
                var cId = viewModel.shopId;
                var postdata = viewModel.ShopContactList.getSimpleData();

                var changeData = [];
                var newChangeData = [];
                var nochangeData = [];
                var delChangeData = [];
                if (postdata && postdata.length > 0) {
                    for (var i = 0; i < postdata.length; i++) {
                        if (postdata[i].persistStatus != "nrm") {
                            postdata[i].statusCode = 1;
                            postdata[i].shopId = cId;
                            changeData.push(postdata[i]);
                        } else {
                            nochangeData.push(postdata[i]);
                        }
                        if (postdata[i].persistStatus == "new") {
                            postdata[i].shopId = cId;
                            newChangeData.push(postdata[i]);
                        }
                        if (postdata[i].persistStatus == "fdel") {
                            postdata[i].shopId = cId;
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
                        url: appCtx + viewModel.shopContactUrl + "/batch-save",
                        type: "post",
                        data: JSON.stringify(changeData),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.ShopContactList.removeAllRows();
                            viewModel.ShopContactList.addSimpleData(data, "nrm", {
                                unSelect: true
                            });
                            viewModel.ShopContactList.addSimpleData(nochangeData, "nrm", {
                                unSelect: true
                            });
                            viewModel.contactdata = viewModel.ShopContactList.getSimpleData();
                            viewModel.currentFlag = 1;
                            // $("#shopcontactBase").hide();
                            // $("#shopcontactBase_show").show();
                        }
                    });
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
                            selectedRows[i].getValue("status") == 1 ||
                            selectedRows[i].getValue("status") == "1"
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
                                selectedRows[i].setValue("status", "1");
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
                            selectedRows[i].getValue("status") == 0 ||
                            selectedRows[i].getValue("status") == "0"
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
                                selectedRows[i].setValue("status", "0");
                            }
                            toastr.success("停用成功。");
                        }
                    });
                } else {
                    toastr.warning("请先选择需要停用的记录。");
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
                postdata.cusReqFormId = viewModel.applicationId;
                if (postdata.id) {
                    type = "put";
                    postdata.persistStatus = "upd";
                }
                postdata.customerRankCode = "01"
                // postdata.isAutoEncoded = '1';
                //更改后台数据
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {

                        currentRow = viewModel.CustomerList.getFocusRow();

                        currentRow.setSimpleData(data);
                        viewModel.flag = 1;
                        $("#productBase").hide();
                        $("#productBase_show").show();
                        if (data.isChannelCustomer == 1) {
                            $(".add-show-distributor").show();
                        }
                        viewModel.customerId = data.id;
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
                            // viewModel.CustomerAddressList.removeAllRows();
                            // viewModel.CustomerAddressList.addSimpleData(data, "nrm", {
                            //     unSelect: true
                            // });
                            // viewModel.CustomerAddressList.addSimpleData(nochangeData, "nrm", {
                            //     unSelect: true
                            // });
                            // viewModel.addressdata = viewModel.CustomerAddressList.getSimpleData();
                            // viewModel.currentFlag = 1;
                            $._ajax({
                                url: appCtx + viewModel.childListUrl + "/findByCustomerId",
                                type: "get",
                                data: {
                                    customerId: cId
                                },
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    for(var i=0;i<data.length;i++){
                                        var address = data[i].countryName + data[i].provinceName + data[i].cityName +data[i].countyName + data[i].townName
                                        data[i].receiveAddress = address;
                                    }
                                    viewModel.CustomerAddressList.setSimpleData(data, {
                                        unSelect: true
                                    });
                                    viewModel.addressdata = viewModel.CustomerAddressList.getSimpleData();
                                }
                            });
                        }
                    });
                }
            },
            //保存账户信息
            saveAccount: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                var cId = curRow.getValue("id");
                var postdata = viewModel.AccountList.getSimpleData();
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
                var accountInfo = $("#accountInfo")[0];
                var accountPass = viewModel.validate(accountInfo);
                if (accountPass.passed) {
                    $._ajax({
                        url: appCtx + viewModel.accountUrl + "/batch-save",
                        type: "post",
                        data: JSON.stringify(changeData),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.AccountList.removeAllRows();
                            viewModel.AccountList.addSimpleData(data, "nrm", {
                                unSelect: true
                            });
                            viewModel.AccountList.addSimpleData(nochangeData, "nrm", {
                                unSelect: true
                            });
                            viewModel.invoicedata = viewModel.AccountList.getSimpleData();
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
                    viewModel.customerApplicationList.setRowSelect(
                        viewModel.customerApplicationList.getRowByRowId(rowId)
                    );
                }
                var ids = [];
                var rows = viewModel.customerApplicationList.getSelectedRows();
                var status = [];
                var statustip = "";
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].getValue("id"));
                        var statusCode = rows[i].getValue("state");
                        if (statusCode == 1 || statusCode == "1" || statusCode == 2 || statusCode == "2") {
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
                        toastr.warning("数据   " + statusArr() + " 不处在自由态，不可删除");
                        return false;
                    }
                    common.dialog.confirmDialog({
                        msg1: "确认删除这些项？",
                        msg2: "此操作不可逆",
                        width: "400px",
                        type: "error",
                        onOk: function () {
                            $._ajax({
                                url: appCtx + viewModel.applicationUrl + "/delete",
                                type: "post",
                                data: "ids=" + ids.join(","),
                                success: function (data) {
                                    viewModel.customerApplicationList.removeRows(rows);
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
            detail: function (index, rowId) {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    $(".detail-show").hide();
                    $(".detail-show-content").hide();
                    var curRow = viewModel["customerApplicationList"].getCurrentRow();
                    
                    var state = curRow.getValue("state");
                    var id = curRow.getValue("id");
                    // viewModel.findByParentid(id);
                    // viewModel.findByAddressid(id);
                    viewModel.goDetailPanel();
                    viewModel.getData(index, rowId);
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
                    if (state == '0') {
                        $(".ui-operate-btn .customer-edit-show").show();
                        } else {
                        $(".ui-operate-btn .customer-edit-show").hide();
                    }
                    //加入bpm按钮
                    viewModel.initBPMFromBill(id, viewModel);

                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
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
            search: function (reindex) {

                if (viewModel.codeCount > 499) {
                    var params = viewModel.searchcomp.viewModel.params;
                    params.setValue("code", "");
                    toastr.warning("编码最多输入500个，请重新输入");
                    return false;
                }
                if (reindex) {
                    viewModel.customerApplicationList.pageIndex(0);
                }
                viewModel.customerApplicationList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr();
                queryData.size = viewModel.customerApplicationList.pageSize();
                queryData.page = viewModel.customerApplicationList.pageIndex();
                var oldName = queryData["search_LIKE_customer.name"];
                if (oldName) {
                    queryData["search_LIKE_1~customer.name"] = oldName;
                    queryData["search_LIKE_1~customer.abbr"] = oldName;
                }
                delete queryData["search_LIKE_customer.name"];

                var shopName = queryData["search_LIKE_shop.name"];
                var contactName = queryData["search_LIKE_shop.shopContacts.name"];
                var province = queryData["search_EQ_shop.province.id"];
                var city = queryData["search_EQ_shop.city.id"];
                if (shopName || contactName || province || city) {
                    queryData["search_EQ_shop.source"] = 2;
                }

                // var oldCode = queryData["search_LIKE_code"];
                // if (oldCode) {
                //     queryData["search_IN_code"] = oldCode.replace(/%/g, "");
                // }
                // delete queryData["search_LIKE_code"];
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.applicationUrl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.customerApplicationList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.customerApplicationList.totalRow(data.totalElements);
                        viewModel.customerApplicationList.totalPages(data.totalPages);
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
                // var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
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
                // for (var i = 0; i < fileTypeArr.length; i++) {
                //     if (allowType.indexOf(fileTypeArr[i]) == -1) {
                //         toastr.warning("仅支持" + allowType + "格式文件");
                //         return false;
                //     }
                // }
                if (fileSizeSum <= 500) {
                    //获取表单
                    var pk = viewModel.applicationId;
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
                if (1 == data.status) {
                    //上传成功状态
                    viewModel.FileList.addSimpleData(data.data[0]);
                    //  toastr.success();
                } else {
                    //error 或者加載js錯誤
                    toastr.error(data.message);
                }
            },
            fileQueryCustomer: function () {
                //获取表单
                var pk = viewModel.applicationId;
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
                    viewModel.FileList.setSimpleData(data.data);
                } else {
                    //删除成功后查询
                    if (data.status == 0 && !data.data) {
                        viewModel.FileList.setSimpleData([]);
                    }
                }
            },
            //附件删除
            fileDeleteCustomer: function () {
                var row = viewModel.FileList.getSelectedRows();
                if (row == null || row.length == 0) {
                    toastr.error("请选择一个附件");
                    return;
                }
                for (var i = 0; i < row.length; i++) {
                    var pk = row[i].getValue("id");
                    var par = {
                        id: pk, //【必填】表的id
                        cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                    };
                    var f = new interface_file();
                    f.filesystem_delete(par, viewModel.fileDeleteCallBackCustomer);
                }
            },
            //附件删除回调
            fileDeleteCallBackCustomer: function (data) {
                if (1 == data.status) {
                    //上传成功状态
                    viewModel.fileQueryCustomer();
                } else {
                    toastr.error(data.message);
                }
            },
            //下载
            fileDownloadCustomer: function () {
              var row = viewModel.FileList.getSelectedRows();
              if (row == null || row.length == 0 || row.length > 1) {
                  toastr.error("请选择一个附件");
                  return;
              }
              for (var i = 0; i < row.length; i++) {
                  var pk = row[i].getValue("id");
                  var url = row[i].getValue("url");
                  var fileName = row[i].getValue("filename");
                  var $a = $("<a/>");
                  $a.attr("id", "down_" + pk);
                  $a.attr("href", url);
                  $a.attr("download", fileName.split("\.")[0]);
                  $a[0].click();
              }
            },
            //查看
            fileViewCustomer: function () {
                var row = viewModel.FileList.getSelectedRows();
                if (row == null || row.length == 0) {
                  toastr.error("请选择一个附件");
                  return;
                }/* else if (row.length > 1) {
                  toastr.error("请选择单个附件进行查看");
                  return;
                }*/
                for (var i = 0; i < row.length; i++) {
                    var url = row[i].getValue("url");
                    parent.open(location.origin + url);
                }
            },
            //图片保存
            savePic: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                var cId = curRow.getValue("id");
                var postdata = viewModel.FileList.getSimpleData();
                if (postdata.length == 0) {
                    toastr.warning("没有相关数据需要保存");
                    return false;
                }
                var picdata = new Array();
                for (var i = 0; i < postdata.length; i++) {
                    picdata[i] = {};
                    picdata[i].customerId = cId;
                    picdata[i].pictureUrl = postdata[i].url;
                    picdata[i].credentialTypeId = viewModel.pictureCategory;
                    picdata[i].persistStatus = "new";
                }
                $._ajax({
                    url: appCtx + viewModel.picurl + "/batch-save",
                    type: "post",
                    data: JSON.stringify(picdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    complete: function () {
                        u.hideLoader();
                    },
                    success: function (data) {
                        toastr.success("保存成功");
                        fileDialog.hide();
                        viewModel.custCredPicList.addSimpleData(data, "nrm", {
                            unSelect: true
                        });
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
                    searchParams[p.replace("LIKE_", "LIKE_customer.").replace("EQ_", "EQ_customer.")] = searchParams[p];
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
            },

            // 审批流程的相关按钮点击事件 - start
            // 提交申请单
            submitCusReqForm: function () {
                var listCompId = "customerApplicationList";
                var nodeJs = "/ocm-web/pages/base/customerapplicationform1/customerapplicationform.js";
                var billTypeCode = "CusReqForm";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
            },

            // 收回申请单
            unsubmitCusReqForm: function () {
                var listCompId = "customerApplicationList";
                var billTypeCode = "CusReqForm";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
            },

            // 审批通过申请单
            approveCusReqForm: function () {
                var listCompId = "customerApplicationList";
                var billTypeCode = "CusReqForm";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    var index = viewModel[listCompId].getSelectedIndex();
                    var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                    viewModel.beforeEdit(index, rowId);
                };
                var withoutBpmCallback = null;
                viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },

            // 审批不通过申请单
            disapproveCusReqForm: function () {
                var listCompId = "customerApplicationList";
                var billTypeCode = "CusReqForm";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    var index = viewModel[listCompId].getSelectedIndex();
                    var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                    viewModel.beforeEdit(index, rowId);
                };
                var withoutBpmCallback = null;
                viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },

            // 取消审批申请单
            cancelApproveCusReqForm: function () {
                var listCompId = "customerApplicationList";
                var billTypeCode = "CusReqForm";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    var index = viewModel[listCompId].getSelectedIndex();
                    var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                    viewModel.beforeEdit(index, rowId);
                };
                var withoutBpmCallback = null;
                viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            }
            // 审批流程的相关按钮点击事件 - end
        },

        afterCreate: function () {
            var url = window.location.href;
            var params = common.getParameter(url);
            var id = params.id;
            if (id) {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    $(".detail-show").hide();
                    $(".detail-show-content").hide();
                    // var curRow = viewModel["customerApplicationList"].getCurrentRow();
                    // var id = curRow.getValue("id");


                    var queryData = viewModel.searchcomp.getDataWithOpr();
                    // queryData.size = viewModel.CustomerList.pageSize();
                    // queryData.page = viewModel.CustomerList.pageIndex();
                    // if (oldCode) {
                    queryData["search_EQ_id"] = id;
                    // }
                    // delete queryData["search_LIKE_code"];
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.applicationUrl,
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.customerApplicationList.setSimpleData(data.content, {
                                unSelect: true
                            });
                            var row = viewModel.customerApplicationList.createEmptyRow();
                            row.setSimpleData(data.content[0]);
                            viewModel.customerApplicationList.setRowFocus(row);
                            viewModel.customerApplicationList.totalRow(data.totalElements);
                            viewModel.customerApplicationList.totalPages(data.totalPages);
                        }
                    });


                    viewModel.findByParentid(id);
                    viewModel.findByAddressid(id);
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

                    //加入bpm按钮
                    viewModel.initBPMFromBill(id, viewModel);

                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                }, 0);
            }

            // 初始化折叠面板
            $.fn.collapsepanel(false, true);
            // 选择上传文件后，直接调用上传方法
            $("#fileiptwrap").on("change", "#uploadbatch_id", function () {
                if (this.value) {
                    viewModel.onFileUploadCustomer();
                }
            });
            ///******************* */
           // viewModel = u.extend(viewModel, bpmopenbill.model);
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
                    if (obj.index != 0 && viewModel.applyBaseIsSaved == false) {
                        toastr.warning("请先保存基本信息");
                        return false;
                    }

                    if (obj.index != 0 && obj.index != 1) {
                        var persistStatus = viewModel.CustomerList.getCurrentRow().status;
                        if (viewModel.flag == 0 || persistStatus == "upd") {
                            toastr.warning("请先保存客户基本信息");
                            return false;
                        }
                    } else {
                        //客户申请单和客户信息页可以随时打开。不用判断其他页面状态
                        return true;
                    }
                    // switch (viewModel.currentTab) {

                    //     case 2:
                    //         viewModel.currentList = viewModel.ContactList;
                    //         viewModel.currentTip = "联系人";
                    //         break;
                    //     case 3:
                    //         viewModel.currentList = viewModel.CustomerAddressList;
                    //         viewModel.currentTip = "收货地址";
                    //         break;
                    //     case 4:
                    //         viewModel.currentList = viewModel.CustomerInvoiceList;
                    //         viewModel.currentTip = "开票信息";
                    //         break;
                    //     default:
                    //         break;
                    // }
                    // //判断有无修改
                    // var postdata = viewModel.currentList.getSimpleData();
                    // var changeData = [];
                    // if (postdata && postdata.length > 0) {
                    //     for (var i = 0; i < postdata.length; i++) {
                    //         if (postdata[i].persistStatus != "nrm") {
                    //             changeData.push(postdata[i]);
                    //         }
                    //     }
                    //     if (changeData.length > 0) {
                    //         viewModel.currentFlag = 0;
                    //     }
                    // }
                    // if (viewModel.currentFlag == 0) {
                    //     toastr.warning("请先保存" + viewModel.currentTip + "信息");
                    //     return false;
                    // }
                    return true;
                });
                //枚举
                $._ajax({
                    type: "get",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                    data: {
                        cust_doc_code_batch: "QY021,QY022,QY025,QY067,QY068,QY076,QY108,QY128,QY116,CUSTOMER_SOURCE,QY118,ACCOUNT_NATURE,CUSTOMER_TYPE,QY027,QY028,CUS_REQ_FORM_APPROVE_STATUS"
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
                        newarray = common.dataconvert.toMap(data["QY116"], "name", "code");
                        viewModel.shopContactType(newarray);
                        newarray = common.dataconvert.toMap(data["CUSTOMER_SOURCE"], "name", "code");
                        viewModel.customerSourceSrc(newarray);
                        newarray = common.dataconvert.toMap(data["QY118"], "name", "code");
                        viewModel.custLinkTypeSrc(newarray);
                        newarray = common.dataconvert.toMap(data["ACCOUNT_NATURE"], "name", "code");
                        viewModel.accountNatureSrc(newarray);
                        newarray = common.dataconvert.toMap(data["CUSTOMER_TYPE"], "name", "code");
                        viewModel.customerTypeSourceSrc(newarray);

                        newarray = common.dataconvert.toMap(data.QY027, "name", "code");
                        viewModel.shopNature(newarray);
                        newarray = common.dataconvert.toMap(data.QY028, "name", "code");
                        viewModel.shopType(newarray);
                        newarray = common.dataconvert.toMap(data["CUS_REQ_FORM_APPROVE_STATUS"], "name", "code");
                        viewModel.customerReqState(newarray);
                    }
                });
            }, 10);
            // 基本信息
            viewModel.CustomerList.on("customerTypeCode.valuechange", function (
                obj
            ) {
                var comp = viewModel.app.getComp("innerorganizationIdBase");
                if (obj.newValue == "02") {
                    comp.setEnable(true);
                } else {
                    comp.setEnable(false);
                    viewModel.CustomerList.setValue("organizationId", null);
                }
            });

            //组织和部门联动
            viewModel.customerApplicationList.on("applicantOrganizationId.valuechange", function (obj) {
                var departmentValue = {
                    "EQ_organization.id": obj.newValue,
                    "EQ_isEnable": "1"
                };
                $("#applicantDepartmentIdinfo").attr("data-refparam", JSON.stringify(departmentValue));
                viewModel.customerApplicationList.setValue("applicantDepartmentId", "");
                viewModel.customerApplicationList.setValue("applicantDepartmentName", "");
            });

            //基本信息   国家、省、城市、区县、街道联动
            viewModel.CustomerList.on("countryId.valuechange", function (obj) {
                var provinceValue = {
                    "EQ_country.id": obj.newValue,
                    "EQ_areaLevel": "1",
                    "EQ_isEnable": "1"
                };
                $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
                var provinceId = viewModel.app.getComp("provinceIdBase");
                viewModel.CustomerList.setValue("provinceId", "");
                viewModel.CustomerList.setValue("provinceName", "");
            });
            viewModel.CustomerList.on("provinceId.valuechange", function (obj) {
                var cityValue = {
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": "2",
                    "EQ_isEnable": "1"
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
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": "3",
                    "EQ_isEnable": "1"
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
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": "4",
                    "EQ_isEnable": "1"
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


            //门店  国家、省、城市、区县、街道联动
            viewModel.ShopList.on("countryId.valuechange", function (obj) {
                var provinceValue = {
                    "EQ_country.id": obj.newValue,
                    "EQ_areaLevel": "1",
                    "EQ_isEnable": "1"
                };
                $("#shop-provinceId").attr("data-refparam", JSON.stringify(provinceValue));
                var provinceId = viewModel.app.getComp("provinceIdBase");
                viewModel.ShopList.setValue("provinceId", "");
                viewModel.ShopList.setValue("provinceCode", "");
                viewModel.ShopList.setValue("provinceName", "");
            });

            viewModel.ShopList.on("provinceId.valuechange", function (obj) {
                var cityValue = {
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": "2",
                    "EQ_isEnable": "1"
                };
                $("#shop-cityId").attr("data-refparam", JSON.stringify(cityValue));
                // viewModel.ShopList.meta.cityId.refparam = cityValue
                var cityId = viewModel.app.getComp("cityIdBase");
                viewModel.ShopList.setValue("cityId", "");
                viewModel.ShopList.setValue("cityCode", "");
                viewModel.ShopList.setValue("cityName", "");

            });
            viewModel.ShopList.on("cityId.valuechange", function (obj) {
                var countyValue = {
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": "3",
                    "EQ_isEnable": "1"
                };
                $("#shop-countyId").attr("data-refparam", JSON.stringify(countyValue));
                var countyId = viewModel.app.getComp("countyIdBase");
                viewModel.ShopList.setValue("countyId", "");
                viewModel.ShopList.setValue("countyCode", "");
                viewModel.ShopList.setValue("countyName", "");

            });
            viewModel.ShopList.on("countyId.valuechange", function (obj) {
                //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
                //       a["EQ_parent.id"]=obj.newValue;
                var townValue = {
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": "4",
                    "EQ_isEnable": "1"
                };
                $("#shop-townId").attr("data-refparam", JSON.stringify(townValue));
                var townId = viewModel.app.getComp("townIdBase");
                viewModel.ShopList.setValue("townId", "");
                viewModel.ShopList.setValue("townCode", "");
                viewModel.ShopList.setValue("townName", "");

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
            //收货地址   国家联动
            viewModel.CustomerAddressList.on("countryId.valuechange", function (obj) {
                var countryId = obj.newValue;

                viewModel.CustomerAddressList.meta.provinceId.refparam =
                    "{\"EQ_areaLevel\":\"1\",\"EQ_country.id\":\"" + countryId + "\",\"EQ_isEnable\":\"1\"}";
                if (obj.newValue != obj.oldValue) {
                    viewModel.CustomerAddressList.setValue("provinceId", "");
                    viewModel.CustomerAddressList.setValue("provinceName", "");
                    viewModel.CustomerAddressList.setValue("cityName", "");
                    viewModel.CustomerAddressList.setValue("cityId", "");
                    viewModel.CustomerAddressList.setValue("cityName", "");
                    viewModel.CustomerAddressList.setValue("countyId", "");
                    viewModel.CustomerAddressList.setValue("countyName", "");
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                }
            });
            //收货地址   省、城市、区县、街道四级联动
            viewModel.CustomerAddressList.on("provinceId.valuechange", function (obj) {
                var provinceId = obj.newValue;
                viewModel.CustomerAddressList.meta.cityId.refparam =
                    "{\"EQ_areaLevel\":\"2\",\"EQ_parent.id\":\"" + provinceId + "\",\"EQ_isEnable\":\"1\"}";
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
                    "{\"EQ_areaLevel\":\"3\",\"EQ_parent.id\":\"" + cityId + "\",\"EQ_isEnable\":\"1\"}";
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
                    "{\"EQ_areaLevel\":\"4\",\"EQ_parent.id\":\"" + countyId + "\",\"EQ_isEnable\":\"1\"}";
                if (obj.newValue != obj.oldValue) {
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                }
            });



            // 编辑地址信息开始
            viewModel.addresscardcomp.viewModel.params.on("countryId.valuechange", function (obj) {
                var provinceValue = {
                    "EQ_areaLevel": "1"
                };
                $("#provinceIdinfo1").attr("data-refparam", JSON.stringify(provinceValue));
                var provinceId = viewModel.addresscardcomp.app.getComp("provinceIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("provinceId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                var rowObj = '中国',
                    preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                if (obj.oldValue != obj.newValue) {
                    if (!obj.rowObj.data.countryId.meta) { } else {
                        rowObj = obj.rowObj.data.countryId.meta.display
                    }
                    if (!preValue && rowObj) {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', rowObj + '/');
                    } else {
                        var preArr = preValue.split('/');
                        if (rowObj) {
                            preArr[0] = rowObj + '/';
                        } else {
                            preArr[0] = '';
                        }
                        preArr.splice(1, preArr.length - 1);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        cityId.setEnable(false);
                        districtId.setEnable(false);
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        provinceId.setEnable(false);
                    } else {
                        provinceId.setEnable(true);
                    }
                } else {
                    provinceId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("provinceId.valuechange", function (obj) {
                var provinceId = obj.newValue;
                var cityValue = {
                    "EQ_areaLevel": "2",
                    "EQ_parent.id": provinceId
                }
                $("#cityIdinfo1").attr("data-refparam", JSON.stringify(cityValue));
                var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    if(!obj.rowObj.data.provinceId.meta){
                        return
                    }
                    var rowObj = obj.rowObj.data.provinceId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 2) {
                        if (rowObj) {
                            preArr[1] = rowObj + '/';
                        } else {
                            preArr[1] = '';
                        }

                        preArr.splice(2, preArr.length - 2);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        districtId.setEnable(false);
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        cityId.setEnable(false);
                    } else {
                        cityId.setEnable(true);
                    }
                } else {
                    cityId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("cityId.valuechange", function (obj) {
                var cityId = obj.newValue;
                var countyValue = {
                    "EQ_areaLevel": "3",
                    "EQ_parent.id": obj.newValue
                };
                $("#countyIdinfo1").attr("data-refparam", JSON.stringify(countyValue));
                var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    if(!obj.rowObj.data.cityId.meta){
                        return
                    }
                    var rowObj = obj.rowObj.data.cityId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 2) {
                        if (rowObj) {
                            preArr[2] = rowObj + '/';
                        } else {
                            preArr[2] = '';
                        }

                        preArr.splice(3, preArr.length - 3);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        districtId.setEnable(false);
                    } else {
                        districtId.setEnable(true);
                    }
                } else {
                    districtId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("districtId.valuechange", function (obj) {
                var districtId = obj.newValue;
                var townValue = {
                    "EQ_areaLevel": "4",
                    "EQ_parent.id": obj.newValue
                };
                $("#townIdinfo1").attr("data-refparam", JSON.stringify(townValue));
                var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    if(!obj.rowObj.data.districtId.meta){
                        return
                    }
                    var rowObj = obj.rowObj.data.districtId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 3) {
                        if (rowObj) {
                            preArr[3] = rowObj + '/';
                        } else {
                            preArr[3] = '';
                        }
                        preArr.splice(4, preArr.length - 4);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        townId.setEnable(false);
                    } else {
                        townId.setEnable(true);
                    }
                } else {
                    townId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("townId.valuechange", function (obj) {
                var townId = obj.newValue;
                if (obj.oldValue != obj.newValue) {
                    if(!obj.rowObj.data.townId.meta){
                        return
                    }
                    var rowObj = obj.rowObj.data.townId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 4) {
                        preArr[4] = rowObj + '/';
                        preArr.splice(5, preArr.length - 5);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("receiveAddress.valuechange", function (obj) {
                var newAddr = obj.newValue;
                if (obj.oldValue != obj.newValue) {
                    var preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + newAddr);
                }
            });


            viewModel.customerApplicationList.on("applicantId.valuechange", function(obj) {
                if (!obj.newValue || obj.oldValue == obj.newValue) return;
                var refer = $("#refContainerapplicantId").data("uui.refer");
                if(!refer || !refer.values) return;
                var refValue = refer.values[0];
                $("#refContainerapplicantId").data("uui.refer").setValue("");  
                viewModel.customerApplicationList.setValue("applicantEmail",refValue.email);
                viewModel.customerApplicationList.setValue("applicantPhone",refValue.phone);
                viewModel.customerApplicationList.setValue("applicantDepartmentId",refValue.departmentId);
                viewModel.customerApplicationList.setValue("applicantDepartmentName",refValue.departmentName);
                viewModel.customerApplicationList.setValue("applicantOrganizationId",refValue.organizationId);
                viewModel.customerApplicationList.setValue("applicantOrganizationName",refValue.organizationName);
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

            viewModel.search();
        }
    });

    return view;
});
