define([
    "text!./customer.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "../customerapplicationform1/customerapplicationform.js",
    "../../flow/bpmapproveref/bpmopenbill.js",
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl",
], function (tpl, common, baseview, model, reqView,bpmopenbill) {
    "use strict";
    var viewModel, fileDialog, picBigDialog;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: "/base/customers" ,
            applicationUrl: "/base/customers",
            childListUrl: "/base/customer-addresses",
            ContactListUrl: "/base/customer-contacts",
            InvoiceUrl: "/base/customer-invoices",
            accountUrl: "/base/customer-accounts/",
            alterurl: "/base/customer-alters",
            MarketAreatUrl: "/market-connect",
            marketAreaUrl: "/market-areas",
            PartnerListUrl: "/partner",
            picurl: "/cust-cred-pic",
            custAttachmentUrl: "/base/customer-attachments",
            ctxfilemng: "/iuap-saas-filesystem-service/",
            CustomerList: new u.DataTable(model.options.metas.Customermeta),
            CustomerApproveList: new u.DataTable(model.options.metas.Customermeta),
            ContactList: new u.DataTable(model.options.metas.Contactmeta),
            AccountList: new u.DataTable(model.options.metas.CustomerAccountmeta),
            CustomerAddressList: new u.DataTable(model.options.metas.CustomerAddressmeta),
            CustomerInvoiceList: new u.DataTable(model.options.metas.CustomerInvoicemeta),
            custCredPicList: new u.DataTable(model.options.metas.custCredPicmeta),
            pictureCategoryRef: new u.DataTable(model.options.metas.pictureCategoryRef),
            FileList: new u.DataTable(model.options.metas.FileMeta),
            // CustAttachmentList: new u.DataTable(model.options.metas.CustAttachmentMeta),
            AlterList: new u.DataTable(model.options.metas.CustomerAltermeta),
            whetherSource: [{value: "1", name: "是"}, {value: "0", name: "否"}],
            whetherSaleSource: [{value: "1", name: "延续"}, {value: "0", name: "不延续"}],
            stateSrc: [{value: "0", name: "无效"}, {value: "1", name: "有效"}],
            statusSource: [{value: "1", name: "启用"}, {value: "0", name: "停用"}],
            cooperateStateSrc: [{value: "1", name: "合作"}, {value: "0", name: "不合作"}],
            whetherSrc: CONST.WHETHER,
            enableFormat: common.format.enableFormat,
            registTypeSrc: ko.observableArray([]),
            marketTypeSrc: ko.observableArray([]),
            rebateProblemSrc: ko.observableArray([]),
            afterServiceAccountSrc: ko.observableArray([]),
            managementTypeSrc: ko.observableArray([]),
            customerRankSrc: ko.observableArray([]),
            invoiceTypeSrc: ko.observableArray([]),
            accountNatureStr: ko.observableArray([]),//账户性质
            credentialsTypeSrc: ko.observableArray([]),
            customerSourceSrc: ko.observableArray([]),
            custLinkTypeSrc: ko.observableArray([]),
            accountNatureSrc: ko.observableArray([]),
            customerTypeSourceSrc: ko.observableArray([]),
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
            // 列表页下载附件
            filedata: [],

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
            button13Source: model.options.buttons.button13,
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
            grid12Option: model.options.grids.grid12,
            grid13Option: model.options.grids.grid13,
            grid14Option: model.options.grids.grid14,
            dialog1Source: model.options.dialogs.dialog1,
            //跳转单据页
            goBillPanel: common.bill.goBillPanel,
            //跳转单据详情页
            goDetailPanel: common.bill.goDetailPanel,
            billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
            saleChannelDataSource: ko.observableArray([]),
            // addressInfo: common.address.addressInfo,
            //地址簿
            addresscardcomp: {},
            //返回列表页
            retListPanel: common.bill.retListPanel,
            //跳转图片维护页
            goPicPanel: common.bill.goPicPanel,
        },
        rendertype: {
            //跳转详情页
            operation4single: common.rendertype.operation4single,
            detailRender: common.rendertype.detailRender,
            operation: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                var alterfun = "data-bind=click:showAlter.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                var downloadZipfun = "data-bind=click:downloadZip.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\">" +
                    "<span class=\"ui-handle-word\"><a href=\"#\" " + alterfun + " title=\"日志\">日志</a></span>" +
                    "<span class=\"ui-handle-word\"><a href=\"#\" " + downloadZipfun + " title=\"附件\">附件</a></span>" +
                    "<span class=\"ui-handle-word\"><a href=\"#\" " + editfun + " title=\"编辑\">编辑</a></span>" +
                    "<span class=\"ui-handle-word\"><a href=\"#\" " + delfun + " title=\"删除\">删除</a></span>" +
                    "</div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            //  operation: common.rendertype.operation,
            //列表图片维护操作
            operationPic: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var uploadBtn = "data-bind=click:picPage.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\"><span class=\"ui-handle-word\"><a href=\"#\"" + uploadBtn + " title=\"图片维护\">图片维护</a></span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            downloadOperation: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];

                // obj.row.value.fileName
                var uploadBtn = "data-bind=click:picPage.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\"><span class=\"ui-handle-word\"><a id=\"down_" + obj.row.value.id + "\" href=\"" + obj.row.value.fileUrl + "\" download = \"" + obj.row.value.fileName ? "" : obj.row.value.fileName.split("\.")[0] + "\">下载</a></span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            reqFormRender: function (obj) {
                var viewModel = obj.gridObj.viewModel;

                var params = {id: obj.row.value.cusReqFormId}
                var hrefValue = "index-view.html?" + common.toUrlParam(params) + "#/cusReqForm";
                var detailfun = "data-bind=click:customerDetail.bind($data," + obj.rowIndex + ")";
                obj.element.innerHTML =
                    '<a href=' + hrefValue + ' value="cusReqForm" name="客户申请单" class="ui-a-detail" ' + detailfun + ">" + obj.value + "</a>";
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
                var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue("isEnable");
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
              //判断表格里的状态
            //启用状态
            isStateGrid: function (obj) {
                var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue("state");
                var stateName = "";
                if (stateValue == 0) {
                    (stateName = "待处理")
                }
                if (stateValue == 1) {
                    (stateName = "已提交")
                }
                if (stateValue == 2) {
                    (stateName = "审批中")
                }
                if (stateValue == 3) {
                    (stateName = "审批通过")
                }
                if (stateValue == 4) {
                    (stateName = "审批不通过")
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
            //是否默认--客户账户
            isDefaultACC: function (obj) {
                var isDefault = viewModel.AccountList.getRow(obj.rowIndex).getValue(
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
            //是否默认--收货地址
            isDefaultCA: function (obj) {
                var isDefault = viewModel.CustomerAddressList.getRow(obj.rowIndex).getValue("isDefault");
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
            //是否服务商
            isServiceProviderGrid: function (obj) {
                var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue(
                    "isServiceProvider"
                );
                var stateName;
                stateValue == 1 ? (stateName = "是") : (stateName = "否");
                obj.element.innerHTML = stateName;
            },
            /*//是否内部组织
            customerTypeGrid: function (obj) {
                var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue(
                    "customerTypeName"
                );
                var stateName;
                stateValue == 1 ? (stateName = "是") : (stateName = "否");
                obj.element.innerHTML = stateName;
            },*/
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
            },
            beforeEditCheck: function (obj) {
                var row = obj.rowObj.value;
                var organizationId = row.organizationId;
                viewModel.postList.setMeta("postId", "refparam",
                    '{"EQ_isEnable":"1","EQ_organization.id":"' + organizationId + '"}')
                viewModel.postList.setMeta("departmentId", "refparam",
                    '{"EQ_isEnable":"1","EQ_organization.id":"' + organizationId + '"}')

                return true
            },
            //收货地址区域选择限制
            areasCheck: function (obj) {
                var colIndex = obj.colIndex;
                // var filedValue = obj.gridObj.gridCompColumnArr[colIndex].options.field;
                if (colIndex == "3") {
                    var countryId = viewModel.CustomerAddressList.getRow(
                        obj.rowIndex
                    ).getValue("countryId");
                    if (!countryId) {
                        toastr.warning("请先选择所在国家");
                        return false;
                    } else {
                        viewModel.CustomerAddressList.meta.provinceId.refparam =
                            "{\"EQ_areaLevel\":\"1\",\"EQ_country.id\":\"" + countryId + "\"}";
                        return true;
                    }
                } else if (colIndex == "4") {
                    var provinceId = viewModel.CustomerAddressList.getRow(
                        obj.rowIndex
                    ).getValue("provinceId");
                    if (!provinceId) {
                        toastr.warning("请先选择所在省份");
                        return false;
                    } else {
                        viewModel.CustomerAddressList.meta.cityId.refparam =
                            "{\"EQ_areaLevel\":\"2\",\"EQ_parent.id\":\"" + provinceId + "\"}";
                        return true;
                    }
                } else if (colIndex == "5") {
                    var cityId = viewModel.CustomerAddressList.getRow(
                        obj.rowIndex
                    ).getValue("cityId");
                    if (!cityId) {
                        toastr.warning("请先选择所在城市");
                        return false;
                    } else {
                        viewModel.CustomerAddressList.meta.countyId.refparam =
                            "{\"EQ_areaLevel\":\"3\",\"EQ_parent.id\":\"" + cityId + "\"}";
                        return true;
                    }
                } else if (colIndex == "6") {
                    var countyId = viewModel.CustomerAddressList.getRow(
                        obj.rowIndex
                    ).getValue("countyId");
                    if (!countyId) {
                        toastr.warning("请先选择所在区/县");
                        return false;
                    } else {
                        viewModel.CustomerAddressList.meta.townId.refparam =
                            "{\"EQ_areaLevel\":\"4\",\"EQ_parent.id\":\"" + countyId + "\"}";
                        return true;
                    }
                } else {
                    return true;
                }
            },
        },
        events: {
            downloadZip: function (index, rowId) {
              viewModel.cusReqFormId = null;
              viewModel.CustomerList.setRowSelectbyRowId(rowId);
              var currentData = viewModel.CustomerList.getRowByRowId(
                  rowId
              ).getSimpleData();
              viewModel.filedata = [];
              var customerId = currentData.id;
              var cusReqFormId = currentData.cusReqFormId;
              viewModel.cusReqFormId = cusReqFormId;
              var customerName = currentData.name;
              //获取表单
              var pk = customerId;
              var par = {
                  //建议一定要有条件否则会返回所有值
                  filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                  groupname: pk, //【选填】[分組名称,未来会提供树节点]
                  cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
              };
              var f = new interface_file();
              f.filesystem_query(par, viewModel.fileDownloadCallBackCustomer);
            },
            fileDownloadCallBackCustomer: function(data) {
              if (1 == data.status) {
                viewModel.filedata = [].concat(data.data);
              } else {
                view.filedata = [];
              }
              if(!viewModel.cusReqFormId) {
                viewModel.fileDownloadByZip();
                return;
              }
              var pk = viewModel.cusReqFormId;
              var par = {
                //建议一定要有条件否则会返回所有值
                filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                groupname: pk, //【选填】[分組名称,未来会提供树节点]
                cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
              };
              var f = new interface_file();
              f.filesystem_query(par, viewModel.fileDownloadCusReqForm);
            },
            fileDownloadCusReqForm: function(data) {
              if (1 == data.status) {
                viewModel.filedata = viewModel.filedata.concat(data.data);
                viewModel.fileDownloadByZip();
              } else {
                toastr.error("下载附件失败");
              }
            },
            fileDownloadByZip: function() {
              var fileData = viewModel.filedata;
              if(fileData && fileData.length < 1) {
                toastr.warning("该客户未上传过附件");
                return;
              }
              var curRows = viewModel.CustomerList.getSelectedRows();
              var customerName = curRows[0].getValue("name");
              fileData.forEach(function(item) {
                item.customerName = customerName;
                item.fileName = item.filename;
                item.fileUrl = location.origin + item.url;
              });
              var xmlResquest = new XMLHttpRequest();
              xmlResquest.open("POST", appCtx + "/base/customer-attachments/downloadZip", true);
              xmlResquest.setRequestHeader("Content-type", "application/json");
              xmlResquest.setRequestHeader("Authorization", "Bearer 6cda86e3-ba1c-4737-972c-f815304932ee");
              xmlResquest.responseType = "blob";
              xmlResquest.onload = function (oEvent) {
                if(xmlResquest.status == 200) {
                  var content = xmlResquest.response;
                  var $elint = $("<a/>");
                  $elint.attr("download", customerName + ".zip");
                  var blob = new Blob([content]);
                  var href = URL.createObjectURL(blob);
                  $elint.attr("href", href);
                  $elint[0].click();
                } else {
                  toastr.error("附件下载失败！！");
                }
              };
              xmlResquest.send(JSON.stringify(fileData));
            },
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
                        if (!oldReceiveAddress) { //如果原有数据为空弹出框的输入框为空，默认显示中国
                            viewModel.addresscardcomp.viewModel.params.setValue("provinceId", "");
                            viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                            viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                            viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '');
                            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', '');
                            viewModel.addresscardcomp.viewModel.params.setValue("countryId", "COUNTRY-01"); //默认显示中国
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
            customerDetail: function (index, viewModel, e) {
                e.preventDefault();
                reqView
                parent.handleClick(e, 1);
            },
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，-2为复制,大于等于0为编辑)
            beforeEdit: function (index, rowId) {
                viewModel.index = index;
                viewModel.rowId = rowId;
                // 是否编辑标识
                viewModel.isEditTip = true;
                if (index != "-1" && typeof index != "number" ) {
                    rowId = viewModel.CustomerList.getCurrentRow().rowId;
                    index = viewModel.CustomerList.getIndexByRowId(rowId);
                    viewModel.index = index;
                    viewModel.rowId = rowId;
                }
                viewModel.goBillPanel();
                viewModel.customerId = null;
                viewModel.cusReqFormId = null;
                viewModel.ContactList.clear();
                viewModel.CustomerAddressList.clear();
                viewModel.FileList.clear();
                /*viewModel.MarketAreaList.clear();
                 viewModel.PartnerList.clear();*/
                $("#productBase").show();
                $("#productBase_show").hide();
                //设置tab显示基本信息
                $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
                $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
                viewModel.currentFlag = 1;
                viewModel.currentTab = 0;
                if (index >= 0) {
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                    //修改操作
                    var currCustRow = viewModel.CustomerList.getRowByRowId(rowId);
                    var cusReqFormId = currCustRow.getValue("cusReqFormId");
                    var currentDataId = viewModel.CustomerList.getRowByRowId(rowId).getValue("id");
                    var code = viewModel.CustomerList.getRowByRowId(rowId).getValue("code");
                    // var oneCategoryName = viewModel.CustomerList.getRowByRowId(rowId).getValue('oneCategoryName');
                    viewModel.CustomerList.originEditData = viewModel.CustomerList.getRowByRowId(rowId).getSimpleData();
                    $("#code-input").hide();
                    $("#code-text").show().html(code);
                    // $("#oneCategoryId-input").hide();
                    // $("#oneCategoryId-text").show().html(oneCategoryName);
                    viewModel.flag = 1;
                    /*//判断是否经销商和组织
                    var isChannelCustomer = viewModel.CustomerList.getRowByRowId(rowId).getValue('isChannelCustomer');
                    var isOrganization = viewModel.CustomerList.getRowByRowId(rowId).getValue('isOrganization');
                    if (isChannelCustomer == 1) {
                      $(".product-choose-result").eq(0).show();
                      $(".product-choose-content").eq(0).show();
                    }
                    if (isOrganization == 1) {
                      $(".product-choose-result").eq(1).show();
                      $(".product-choose-content").eq(1).show();
                    }*/
                    //根据id查联系人表
                    viewModel.customerId = currentDataId;
                    viewModel.cusReqFormId = cusReqFormId;
                    viewModel.getCustomerInfo(currentDataId);
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
                    //新增的客户， 客户来源为自制
                    var data = {
                        customerSourceId: "efd814fc-ac35-4b46-81e3-fe3b4606736f",
                        customerSourceCode: "01",
                        customerSourceName: "自制"
                    };
                    currentRow.setSimpleData(data);
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
            // 获取用户数据详细信息
            getCustomerInfo: function (customerID) {
                //根据id查联系人表
                $._ajax({
                    url: appCtx + viewModel.ContactListUrl + "/findByCustomerId",
                    type: "get",
                    data: {customerId: customerID},
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.ContactList.setSimpleData(data, {unSelect: true});
                        viewModel.contactdata = viewModel.ContactList.getSimpleData();
                    }
                });
                //根据id查账户表
                $._ajax({
                    url: appCtx + viewModel.accountUrl + "find-by-customer-id/" + customerID,
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.AccountList.setSimpleData(data, {unSelect: true});
                        // viewModel.addressdata = viewModel.AccountList.getSimpleData();
                    }
                });
                //根据id查地址表
                $._ajax({
                    url: appCtx + viewModel.childListUrl + "/findByCustomerId",
                    type: "get",
                    data: {customerId: customerID},
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var address = "";
                            if (data[i].countryName!=null){
                                address+=data[i].countryName;
                            }if (data[i].provinceName!=null){
                                address+=data[i].provinceName;
                            }if (data[i].cityName!=null){
                                address+=data[i].cityName;
                            }if (data[i].countyName!=null){
                                address+=data[i].countyName;
                            }
                            if (data[i].townName!=null){
                                address+=data[i].townName;
                            }
                            data[i].receiveAddress = address;
                        }
                        viewModel.CustomerAddressList.setSimpleData(data, {unSelect: true});
                        viewModel.addressdata = viewModel.CustomerAddressList.getSimpleData();
                    }
                });
                //根据id查开票信息
                $._ajax({
                    url: appCtx + viewModel.InvoiceUrl + "/findByCustomerId",
                    type: "get",
                    data: {customerId: customerID},
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.CustomerInvoiceList.setSimpleData(data, {unSelect: true});
                        viewModel.invoicedata = viewModel.CustomerInvoiceList.getSimpleData();
                    }
                });
                //查询附件表
                viewModel.fileQueryCustomer();
            },
            // 清除基类属性
            clearBaseProp: function (curRow) {
                curRow.setValue("id", null);
                curRow.setValue("code", "");
                curRow.setValue("creator", "");
                curRow.setValue("creationTime", "");
                curRow.setValue("modifier", "");
                curRow.setValue("modifiedTime", "");
            },
            /*//详情启用状态
            customerStatus: ko.pureComputed(function () {
              var statusValue = viewModel.CustomerList.getValue('status');
              if (statusValue === null) {
                viewModel.CustomerList.setValue('status', 1);
              }
              var showName;
              statusValue == 1 ? showName = "启用" : showName = "停用";
              return showName;
            }),
            //详情是否属于经销商交接
            isMarketConnect: function () {
              var statusValue = viewModel.CustomerList.getValue('isMarketConnect');
              var showName;
              statusValue == 1 ? showName = "是" : showName = "否";
              return showName;
            },
            //详情合作状态
            cooperateState: function () {
              var statusValue = viewModel.CustomerList.getValue('cooperateState');
              var showName;
              statusValue == 1 ? showName = "合作" : showName = "不合作";
              return showName;
            },
            isOfflineChannelCustomer: ko.pureComputed(function () {
              var dataValue = viewModel.CustomerList.getValue('isOfflineChannelCustomer');
              if (dataValue === null) {
                viewModel.CustomerList.setValue('isOfflineChannelCustomer', 0);
              }
              var showName;
              dataValue == 1 ? showName = "是" : showName = "否";
              return showName;
            }),
            isDeposit: ko.pureComputed(function () {
              var dataValue = viewModel.CustomerList.getValue('isDeposit');
              if (dataValue === null) {
                viewModel.CustomerList.setValue('isDeposit', 0);
              }
              var showName;
              dataValue == 1 ? showName = "是" : showName = "否";
              return showName;
            }),
            是否内部组织
            customerType: ko.pureComputed(function () {
                var dataValue = viewModel.CustomerList.ref("customerTypeName")();
                var showName;
                dataValue == 1 ? (showName = "是") : (showName = "否");
                return showName;
            }),*/
            //是否经销商
            isChannelCustomer: ko.pureComputed(function () {
                var dataValue = viewModel.CustomerList.ref("isChannelCustomer")();
                var showName;
                dataValue == 1 ? (showName = "是") : (showName = "否");
                return showName;
            }),
            //是否服务商
            isServiceProvider: ko.pureComputed(function () {
                var dataValue = viewModel.CustomerList.ref("isServiceProvider")();
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
                if (dataValue == 2) {
                    (showName = "已停用")
                }
                return showName;
            }),
             // //是否审核
             isState: ko.pureComputed(function () {
                var stateValue = viewModel.CustomerList.ref("state")();
                var stateName;

                if (stateValue == 0) {
                    (stateName = "待处理")
                }
                if (stateValue == 1) {
                    (stateName = "已提交")
                }
                if (stateValue == 2) {
                    (stateName = "审批中")
                }
                if (stateValue == 3) {
                    (stateName = "审批通过")
                }
                if (stateValue == 4) {
                    (stateName = "审批不通过")
                }
                return stateName;
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
                    viewModel.edit(_index);
                    //     if (isChannelCustomer == 1) {
                    //         var channelvalidate = viewModel.validate($("#channelInfo")[0]);
                    //         if (!channelvalidate.passed) {
                    //             ChannelPass = false;
                    //         }
                    //     }
                    //     if (ChannelPass) {

                    //     }
                }
            },
            //冻结
            btnFrozen: function () {
                var selectedRows = viewModel.CustomerList.getSelectedRows();
                var ids = [];
                if (selectedRows && selectedRows.length > 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        ids.push(selectedRows[i].getValue("id"));
                    }
                    ids = ids.join(",");
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-frozen",
                        data: {
                            ids: ids
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isFrozen", "1");
                            }
                            toastr.success("冻结成功");
                        }
                    });
                } else {
                    toastr.warning("请先选择需要冻结数据");
                }
            },
            //解冻
            btnUnfrozen: function () {
                var selectedRows = viewModel.CustomerList.getSelectedRows();
                var ids = [];
                if (selectedRows && selectedRows.length > 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        ids.push(selectedRows[i].getValue("id"));
                    }
                    ids = ids.join(",");
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-unfrozen",
                        data: {
                            ids: ids
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isFrozen", "0");
                            }
                            toastr.success("解冻成功");
                        }
                    });
                } else {
                    toastr.warning("请先选择需要解冻数据");
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

                        toastr.warning("未启用数据不可停用");
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
                //编辑后审批状态不变
                //postdata.state = 0
                if (index >= 0) {
                    type = "put";
                    postdata.persistStatus = "upd";
                } else {
                    postdata.persistStatus = "new";
                }
                // postdata.isAutoEncoded = '1';
                //更改后台数据
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        // //如果index大于等于0说明是修改
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
                        // 不触发监听事件
                        currentRow.setSimpleData(data, "nrm", false);
                        // viewModel.flag = 1;
                        viewModel.customerId=data.id;
                        viewModel.isEditTip = false;
                        ko.cleanNode($("#productBase_show")[0]);
                        ko.applyBindings(viewModel, $("#productBase_show")[0]);
                        $("#productBase").hide();
                        $("#productBase_show").show();
                        // if (data.isChannelCustomer == 1) {
                        //     $(".add-show-distributor").show();
                        // }
                        // // if (data.isOrganization == 1) {
                        // //   $(".add-show-organization").show();
                        // // }
                        // $("#showCode").html(data.code);
                        toastr.success("保存成功");
                        // viewModel.search();
                        // viewModel.retListPanel()
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

            //联系人保存
            saveContact: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
               // var cId = curRow.getValue("id");
                var cId=viewModel.customerId;
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
                // if (newChangeData.length == 0) {
                //     if (postdata.length == delChangeData.length) {
                //         for (var i = 0; i < postdata.length; i++) {
                //             for (var j = 0; j < delChangeData.length; j++) {
                //                 if (postdata[i] == delChangeData[j]) {
                //                     toastr.warning("联系人已存在的情况下，不可全部删除");
                //                     viewModel.cancelContact();
                //                     return false;
                //                 }
                //             }
                //         }
                //     }
                // }
                for(var i=0;i<changeData.length;i++){
                    var phoneData = changeData[i];
                    if(!(/^1[0-9][0-9]\d{4,8}$/.test(phoneData.phone))){ 
                        toastr.error("不是完整的11位手机号或者正确的手机号前七位"); 
                        return false;
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
                            viewModel.isEditTip = false;
                        }
                    });
                }
            },
            //地址保存
            saveAddress: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                //var cId = curRow.getValue("id");
                var cId=viewModel.customerId;
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
                for(var i=0;i<changeData.length;i++){
                    var phoneData = changeData[i];
                    if(!(/^1[0-9][0-9]\d{4,8}$/.test(phoneData.firstReceiverPhone))){ 
                        toastr.error("不是完整的11位手机号或者正确的手机号前七位"); 
                        return false;
                    } 
                }
                // 保存时校验地址长度
                var findItem = changeData.find(function(item) {
                  return common.validStrLength(item.receiveAddress) >=200;
                });
                if(findItem) {
                    toastr.warning("详细地址超出长度限制（200字节），请调整！");
                    return;
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
                            for (var i = 0; i < data.length; i++) {
                                var address = data[i].countryName + data[i].provinceName + data[i].cityName + data[i].countyName + data[i].townName
                                data[i].receiveAddress = address;
                            }
                            viewModel.CustomerAddressList.removeAllRows();
                            viewModel.CustomerAddressList.addSimpleData(data, "nrm", {
                                unSelect: true
                            });
                            viewModel.CustomerAddressList.addSimpleData(nochangeData, "nrm", {
                                unSelect: true
                            });
                            viewModel.addressdata = viewModel.CustomerAddressList.getSimpleData();
                            viewModel.currentFlag = 1;
                            viewModel.isEditTip = false;
                        }
                    });
                }
            },
            saveInvoice: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
                //var cId = curRow.getValue("id");
                var cId=viewModel.customerId;
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
                            viewModel.CustomerInvoiceList.addSimpleData(data, "nrm", {unSelect: true});
                            viewModel.CustomerInvoiceList.addSimpleData(nochangeData, "nrm", {unSelect: true});
                            viewModel.invoicedata = viewModel.CustomerInvoiceList.getSimpleData();
                            viewModel.currentFlag = 1;
                            viewModel.isEditTip = false;
                        }
                    });
                }
            },

            saveAccount: function () {
                var curRow = viewModel.CustomerList.getCurrentRow();
               // var cId = curRow.getValue("id");
                var cId=viewModel.customerId;
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
                            viewModel.isEditTip = false;
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
              viewModel.isEditTip = true;
              var rows = viewModel[dataTable].getSelectedRows();
              viewModel[dataTable].removeRows(rows);
            },
            //子表增行
            addRow: function (dataTable) {
              viewModel.isEditTip = true;
              viewModel[dataTable].createEmptyRow();
              viewModel.currentFlag = 0;
            },
            //查看详情
            detail: function () {
                viewModel.customerId = null;
                viewModel.cusReqFormId = null;
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    $(".detail-show").hide();
                    $(".detail-show-content").hide();
                    var curRow = viewModel.CustomerList.getCurrentRow();
                    var currentDataId = curRow.getValue("id");
                    var cusReqFormId = curRow.getValue("cusReqFormId");
                    var isChannelCustomer = curRow.getValue("isChannelCustomer");
                    // var isOrganization = curRow.getValue('isOrganization');
                    if (isChannelCustomer == 1) {
                        $(".detail-show").eq(0).show();
                        $(".detail-show-content").eq(0).show();
                    }
                    /*if (isOrganization == 1) {
                      $(".detail-show").eq(1).show();
                      $(".detail-show-content").eq(1).show();
                    }*/
                    // viewModel.findByParentid(currentDataId);
                    // viewModel.findByAddressid(currentDataId);
                    //viewModel.findByMarketid(currentDataId);
                    //viewModel.findByPartnerid(currentDataId);
                    viewModel.customerId = currentDataId;
                    viewModel.cusReqFormId = cusReqFormId;
                    viewModel.getCustomerInfo(currentDataId);
                    viewModel.goDetailPanel();
                    //设置tab显示基本信息
                    $(".ui-bill-detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
                    $(".ui-bill-detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                }, 0);
            },

            //查询子表数据
            findByParentid: function (id) {
                $._ajax({
                    url: appCtx + viewModel.ContactListUrl + "/findByCustomerId",
                    type: "get",
                    async: false,
                    data: {customerId: id},
                    success: function (data) {
                        viewModel.ContactList.setSimpleData(data, {unSelect: true});
                    }
                });
            },
            findByAddressid: function (id) {
                $._ajax({
                    url: appCtx + viewModel.childListUrl + "/findByCustomerId",
                    type: "get",
                    async: false,
                    data: {customerId: id},
                    success: function (data) {
                        viewModel.CustomerAddressList.setSimpleData(data, {unSelect: true});
                    }
                });
            },
            //点击取消 单据页
            cancelHandle: function () {
                /*if(viewModel.currentTab==0){
                             var curRow = viewModel.CustomerList.getCurrentRow();
                        // 修改，则还原
                        if(curRow.getValue("id")) {
                                if(curRow.status != "nrm"){
                                curRow.setSimpleData(viewModel.CustomerList.originEditData)
                                }
                        }
                        // 新增或复制，则删除
                        else {
                          viewModel.CustomerList.removeRow(curRow);
                        }
              }*/
              viewModel.backListPrompt();
            },
            backListPrompt: function() {
              // 如果是编辑标识，则返回列表时需给出提示
              if(viewModel.isEditTip) {
                common.dialog.confirmDialog({
                  msg1: "有数据尚未保存，是否先保存数据?",
                  msg2: "点击确认，将返回列表页",
                  width: "400px",
                  type: "error",
                  onOk: function () {
                      $("#code-text").empty();
                      viewModel.search();
                      viewModel.retListPanel();
                  }
                });
              } else {
                viewModel.search();
                viewModel.retListPanel();
              }
              
            },
            //返回
            backPanel: function () {
              viewModel.backListPrompt();
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
                // viewModel.ContactList.removeAllRows();
                // viewModel.contactdata.removeAllRows();
                viewModel.AccountList.removeAllRows();
                // viewModel.CustomerAddressList.removeAllRows();
                // viewModel.addressdata.removeAllRows();
                viewModel.FileList.removeAllRows();
                viewModel.CustomerInvoiceList.removeAllRows();
                // viewModel.invoicedata.removeAllRows();

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
                queryData["search_EQ_state"] = 3;//客户申请单审批通过后，客户的这个状态也会变成3，那么可以认为申请单审批后才可见，所以查询时过滤这个字段
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.CustomerList.setSimpleData(data.content, {unSelect: true});
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
                    url: appCtx + viewModel.alterurl + "/findByCustomerId",
                    type: "get",
                    data: {
                        customerId: customerId
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {

                        if (!viewModel.dialog_alter) {
                            viewModel.dialog_alter = u.dialog({
                                id: 'dialog_alter',
                                content: "#dialog_alter",
                                hasCloseMenu: true,
                                width: "600px"
                            });
                            viewModel.dialog_alter.show();
                        } else {
                            viewModel.dialog_alter.show();
                        }

                        var html = "<div style='height:350px;overflow-y:auto;overflow-x:hidden;'>";
                        for (var i = 0; i < data.length; i++) {
                            // if (i == 3) {
                            //     break;
                            // }
                            var dateStr = u.date.format(data[i].modifiedTime, "YYYY-MM-DD HH:mm:ss");
                            var str = "";
                            str += "【";
                            str += data[i].modifier;
                            str += "】 在";
                            str += "【";
                            str += dateStr;
                            str += "】 把";
                            str += "【"+ data[i].fieldValue +"】";
                            str += "从 【"+ (data[i].oldFieldValue || "空") +"】 修改为【"+ data[i].newFieldValue +"】";
                            html += "<div class='alter-line'>";
                            html += "<div class='alter-line-left'>" + (i + 1) + "</div>";
                            html += "<div class='alter-line-right'>" + str + "</div>";
                            html += "</div>";
                        }
                        html += "</div>";
                        $("#alter-content")[0].innerHTML = html;
                    }
                });
                // viewModel.goPicPanel();
                //跳转图片维护页
                // $(".ui-panel").hide();
                // $(".ui-bill-alter").show();
                // $(".ui-bill-alter").animateCss("fadeIn");
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
                    var pk = viewModel.customerId;
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
                viewModel.FileList.removeAllRows();
                //获取表单
                var pk = viewModel.customerId;
                var par = {
                    //建议一定要有条件否则会返回所有值
                    filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                    groupname: pk, //【选填】[分組名称,未来会提供树节点]
                    cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                };
                var f = new interface_file();
                f.filesystem_query(par, viewModel.fileQueryCallBackCustomer);
            },
            // 联查客户申请单附件
            fileQueryCusReqForm: function () {
              //获取表单
              var pk = viewModel.cusReqFormId;
              var par = {
                  //建议一定要有条件否则会返回所有值
                  filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                  groupname: pk, //【选填】[分組名称,未来会提供树节点]
                  cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
              };
              var f = new interface_file();
              f.filesystem_query(par, viewModel.fileQueryCallBackCusReqForm);
            },
            fileQueryCallBackCusReqForm: function (data) {
              if (1 == data.status) {
                  //上传成功状态
                  viewModel.FileList.addSimpleData(data.data);
              }
            },
            fileQueryCallBackCustomer: function (data) {
                if (1 == data.status) {
                    //上传成功状态
                    viewModel.FileList.addSimpleData(data.data);  
                }
                if(viewModel.cusReqFormId) {
                  viewModel.fileQueryCusReqForm();
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
                }
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
            //导入---客户
            importCustomer: function () {
                var urlInfo = "/customer-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/customer-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出---客户
            exportCustomer: function () {
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
            //导入---联系人
            importContact: function () {
                var urlInfo = "/customer-contact-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/customer-contact-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出---联系人
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
                var templateUrl = "/customer-contact-excel/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = "/customer-contact-excel/excelDataExport"; //导出数据地址参数
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
            //导入---客户收获地址
            importAddress: function () {
                var urlInfo = "/customer-address-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/customer-address-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出---客户收获地址
            exportAddress: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                //搜索参数加customer.
                for (var p in searchParams) {
                    searchParams[
                        p.replace("LIKE_", "LIKE_customer.").replace("EQ_", "EQ_customer.")
                        ] =
                        searchParams[p];
                    delete searchParams[p];
                }
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
            //导入----银行账户
            importAccount: function () {
                var urlInfo = "/customer-account-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/customer-account-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出----银行账户
            exportAccount: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                //搜索参数加customer.
                for (var p in searchParams) {
                    searchParams[
                        p.replace("LIKE_", "LIKE_customer.").replace("EQ_", "EQ_customer.")
                        ] =
                        searchParams[p];
                    delete searchParams[p];
                }
                var templateUrl = "/customer-account-excel/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = "/customer-account-excel/excelDataExport"; //导出数据地址参数
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
            //导入----开票信息
            importInvoice: function () {
                var urlInfo = "/customer-invoice-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/customer-invoice-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出----开票信息
            exportInvoice: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                //搜索参数加customer.
                for (var p in searchParams) {
                    searchParams[
                        p.replace("LIKE_", "LIKE_customer.").replace("EQ_", "EQ_customer.")
                        ] =
                        searchParams[p];
                    delete searchParams[p];
                }
                var templateUrl = "/customer-invoice-excel/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = "/customer-invoice-excel/excelDataExport"; //导出数据地址参数
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
      submitCusReqForm1: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.CustomerList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "CustomerList";
        var nodeJs = "/ocm-web/pages/base/customer/customer.js";
        var billTypeCode = "Customer";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      },

      // 收回申请单
      unsubmitCusReqForm1: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.CustomerList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "CustomerList";
        var billTypeCode = "Customer";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },



       
            // 审批通过申请单
            approveCusReqForm: function(data, rowId) {
              if (typeof(data) == 'number') {
                viewModel.CustomerList.setRowSelectbyRowId(rowId);
              }
              var listCompId = "CustomerList";
              var billTypeCode = "Customer";
              var tranTypeCode = null;
      
              var withBpmCallback = function() {
                var index = viewModel[listCompId].getSelectedIndex();
                var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                var id = viewModel.CustomerList.getRow(index).getValue('id');
                viewModel.detail(index, rowId);
                viewModel.initBPMFromBill(id, viewModel);
              };
              var withoutBpmCallback = null;
              viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                withoutBpmCallback);
      
            },
      
            // 审批不通过申请单
            disapproveCusReqForm: function() {
              var listCompId = "CustomerList";
              var billTypeCode = "Customer";
              var tranTypeCode = null;
              var withBpmCallback = function() {
                var index = viewModel[listCompId].getSelectedIndex();
                var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                var id = viewModel.CustomerList.getRow(index).getValue('id');
                viewModel.detail(index, rowId);
                viewModel.initBPMFromBill(id, viewModel);
              };
              var withoutBpmCallback = null;
              viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                withoutBpmCallback);
            },
      
            // 取消审批申请单
            cancelApproveCusReqForm: function(data, rowId) {
              if (typeof(data) == 'number') {
                viewModel.CustomerList.setRowSelectbyRowId(rowId);
              }
              var listCompId = "CustomerList";
              var billTypeCode = "Customer";
              var tranTypeCode = null;
              var withBpmCallback = function() {
                var index = viewModel[listCompId].getSelectedIndex();
                var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                var id = viewModel.CustomerList.getRow(index).getValue('id');
                viewModel.detail(index, rowId);
                viewModel.initBPMFromBill(id, viewModel);
              };
              var withoutBpmCallback = null;
              viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                withoutBpmCallback);
            },
            setAddresscardcompDetailValue: function(obj) {
                var details = [];
                if(obj.rowObj.data.countryId.meta && obj.rowObj.data.countryId.value) {
                    details.push(obj.rowObj.data.countryId.meta.display);
                }
                if(obj.rowObj.data.provinceId.meta && obj.rowObj.data.provinceId.value) {
                    details.push(obj.rowObj.data.provinceId.meta.display);
                }
                if(obj.rowObj.data.cityId.meta && obj.rowObj.data.cityId.value) {
                    details.push(obj.rowObj.data.cityId.meta.display);
                }
                if(obj.rowObj.data.districtId.meta && obj.rowObj.data.districtId.value) {
                    details.push(obj.rowObj.data.districtId.meta.display);
                }
                if(obj.rowObj.data.townId.meta && obj.rowObj.data.townId.value) {
                    details.push(obj.rowObj.data.townId.meta.display);
                }
                if(obj.rowObj.data.receiveAddress.value) {
                    details.push(obj.rowObj.data.receiveAddress.value);
                }
                viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', details.join('/'));
            }
        },  
        afterCreate: function () {
            // var marketValue = {
            //     "EQ_isEnable": "1", "EQ_dr": "0",
            //     "EQ_marketAreaItem.country.id": "8dc2fc87-0a4f-420b-8d1a-b74b1278f24b"
            // };
            // $("#marketAreaIdinfo").attr("data-refparam", JSON.stringify(marketValue));


            // 初始化折叠面板
            $.fn.collapsepanel(false, true);
            // 选择上传文件后，直接调用上传方法
            $("#fileiptwrap").on("change", "#uploadbatch_id", function () {
                if (this.value) {
                    viewModel.onFileUploadCustomer();
                }
            });   
            
            




            /*       添加bpm事件开始        */
            viewModel = u.extend(viewModel, bpmopenbill.model);
            /*       添加bpm事件结尾        */
            console.info(bpmopenbill.model);













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
                /* //暂时注释
                $(".u-tabs")[0]["u.Tabs"].on("beforeTabChange", function (obj) {
                     viewModel.currentTab = obj.index;

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
                 });*/
                //枚举
                $._ajax({
                    type: "get",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                    data: {
                        cust_doc_code_batch: "QY021,QY022,QY025,QY067,QY068,QY076,QY108,QY128,ACCOUNT_NATURE,CUSTOMER_SOURCE,QY118,ACCOUNT_NATURE,CUSTOMER_TYPE"
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
                        newarray = common.dataconvert.toMap(data["ACCOUNT_NATURE"], "name", "code");
                        viewModel.accountNatureStr(newarray);
                        newarray = common.dataconvert.toMap(data["QY022"], "name", "code");
                        viewModel.credentialsTypeSrc(newarray);
                        newarray = common.dataconvert.toMap(data["CUSTOMER_SOURCE"], "name", "code");
                        viewModel.customerSourceSrc(newarray);
                        newarray = common.dataconvert.toMap(data["QY118"], "name", "code");
                        viewModel.custLinkTypeSrc(newarray);
                        newarray = common.dataconvert.toMap(data["ACCOUNT_NATURE"], "name", "code");
                        viewModel.accountNatureSrc(newarray);
                        newarray = common.dataconvert.toMap(data["CUSTOMER_TYPE"], "name", "code");
                        viewModel.customerTypeSourceSrc(newarray);
                    }
                });
            }, 10);
            // 基本信息
            viewModel.CustomerList.on("customerTypeCode.valuechange", function (obj) {
                var comp = viewModel.app.getComp("innerorganizationIdBase");
                if (obj.newValue == "02") {
                    comp.setEnable(true);
                } else {
                    comp.setEnable(false);
                    viewModel.CustomerList.setValue("organizationId", null);
                }
            });

            //基本信息   省、城市、区县、街道四级联动
            viewModel.CustomerList.on("countryId.valuechange", function (obj) {
                var provinceValue = {
                    "EQ_country.id": obj.newValue
                };
                $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
                // viewModel.CustomerList.meta.cityId.refparam = cityValue
                viewModel.CustomerList.setValue("provinceId", null);
                viewModel.CustomerList.setValue("provinceName", null);
                if (obj.newValue && obj.newValue != "") {
                    var marketArea = {}
                    marketArea.countryId = obj.newValue
                    $._ajax({
                        url: appCtx + viewModel.marketAreaUrl + "/query",
                        type: "post",
                        data: JSON.stringify(marketArea),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.CustomerList.setValue("marketAreaId", data.id);
                        }
                    });
                }else{
                    viewModel.CustomerList.setValue("marketAreaId", null);
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
                viewModel.CustomerList.setValue("cityId", null);
                viewModel.CustomerList.setValue("cityName", null);
                if (obj.newValue && obj.newValue != "") {
                    var marketArea = {}
                    marketArea.provinceId = obj.newValue
                    $._ajax({
                        url: appCtx + viewModel.marketAreaUrl + "/query",
                        type: "post",
                        data: JSON.stringify(marketArea),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            if(data!=null&&data.id!=null){
                                viewModel.CustomerList.setValue("marketAreaId", data.id);
                            }
                        }
                    });
                }else if(obj.newValue == ""){
                    var marketArea = {}
                    marketArea.countryId = obj.rowObj.data.countryId.value
                    $._ajax({
                        url: appCtx + viewModel.marketAreaUrl + "/query",
                        type: "post",
                        data: JSON.stringify(marketArea),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.CustomerList.setValue("marketAreaId", data.id);
                        }
                    });
                }
            });
            viewModel.CustomerList.on("cityId.valuechange", function (obj) {
                var countyValue = {
                    "EQ_parent.id": obj.newValue
                };
                $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
                var countyId = viewModel.app.getComp("countyIdBase");
                viewModel.CustomerList.setValue("countyId", null);
                viewModel.CustomerList.setValue("countyName", null);
                if (obj.newValue && obj.newValue != "") {
                    var marketArea = {}
                    marketArea.cityId = obj.newValue
                    $._ajax({
                        url: appCtx + viewModel.marketAreaUrl + "/query",
                        type: "post",
                        data: JSON.stringify(marketArea),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            if(data!=null&&data.id!=null){
                                viewModel.CustomerList.setValue("marketAreaId", data.id);
                            }
                        }
                    });
                }else if(obj.newValue == ""){
                    var marketArea = {}
                    marketArea.provinceId = obj.rowObj.data.provinceId.value
                    $._ajax({
                        url: appCtx + viewModel.marketAreaUrl + "/query",
                        type: "post",
                        data: JSON.stringify(marketArea),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.CustomerList.setValue("marketAreaId", data.id);
                        }
                    });
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
                viewModel.CustomerList.setValue("townId", null);
                viewModel.CustomerList.setValue("townName", null);
                if (obj.newValue && obj.newValue != "") {
                    var marketArea = {}
                    marketArea.countyId = obj.newValue
                    $._ajax({
                        url: appCtx + viewModel.marketAreaUrl + "/query",
                        type: "post",
                        data: JSON.stringify(marketArea),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            if(data!=null&&data.id!=null){
                                viewModel.CustomerList.setValue("marketAreaId", data.id);
                            }
                        }
                    });
                }
                else if(obj.newValue == ""){
                    var marketArea = {}
                    marketArea.cityId = obj.rowObj.data.cityId.value;
                    $._ajax({
                        url: appCtx + viewModel.marketAreaUrl + "/query",
                        type: "post",
                        data: JSON.stringify(marketArea),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.CustomerList.setValue("marketAreaId", data.id);
                        }
                    });
                }
            });
            viewModel.CustomerList.on("oneCategoryId.valuechange", function (obj) {
                if (!$("#refContaineroneCategoryId-input").data("uui.refer").values) {
                    return
                }
                var data = $("#refContaineroneCategoryId-input").data("uui.refer").values[0];
                var newrow = viewModel.CustomerList.getCurrentRow();
                //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
                //       a["EQ_parent.id"]=obj.newValue;

                if (data.isGenCode == 0) {
                    $("#code-input").show();
                    // $("#code-text").show().html(code);
                } else {
                    newrow.setValue("code", "");
                    $("#code-input").hide();
                    // $("#code-text").show().html(code);
                }
            });


            //收货地址   国家联动
            viewModel.CustomerAddressList.on("countryId.valuechange", function (obj) {
                var countryId = obj.newValue;
                var grid = viewModel.app.getComp("grid_CustomerAddress").grid;
                if (obj.newValue != obj.oldValue) {
                    viewModel.CustomerAddressList.setValue("provinceId", "");
                    viewModel.CustomerAddressList.setValue("provinceName", "");
                    viewModel.CustomerAddressList.setValue("cityId", "");
                    viewModel.CustomerAddressList.setValue("cityName", "");
                    viewModel.CustomerAddressList.setValue("countyId", "");
                    viewModel.CustomerAddressList.setValue("countyName", "");
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                    if (obj.rowObj.data.provinceId.meta) {
                        obj.rowObj.data.provinceId.meta.display = "";
                    }
                    if (obj.rowObj.data.cityId.meta) {
                        obj.rowObj.data.cityId.meta.display = "";
                    }
                    if (obj.rowObj.data.countyId.meta) {
                        obj.rowObj.data.countyId.meta.display = "";
                    }
                    if (obj.rowObj.data.townId.meta) {
                        obj.rowObj.data.townId.meta.display = "";
                    }
                    grid.repaintGridDivs();
                }
            });

            //收货地址   省、城市、区县、街道四级联动
            viewModel.CustomerAddressList.on("provinceId.valuechange", function (obj) {
                var provinceId = obj.newValue;
                var grid = viewModel.app.getComp("grid_CustomerAddress").grid;
                if (obj.newValue != obj.oldValue) {

                    viewModel.CustomerAddressList.setValue("cityId", "");
                    viewModel.CustomerAddressList.setValue("cityCode", "");
                    viewModel.CustomerAddressList.setValue("cityName", "");
                    viewModel.CustomerAddressList.setValue("countyId", "");
                    viewModel.CustomerAddressList.setValue("countyName", "");
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                    if (obj.rowObj.data.cityId.meta) {
                        obj.rowObj.data.cityId.meta.display = "";
                    }
                    if (obj.rowObj.data.countyId.meta) {
                        obj.rowObj.data.countyId.meta.display = "";
                    }
                    if (obj.rowObj.data.townId.meta) {
                        obj.rowObj.data.townId.meta.display = "";
                    }
                    grid.repaintGridDivs();
                }
            });
            viewModel.CustomerAddressList.on("cityId.valuechange", function (obj) {
                var cityId = obj.newValue;
                var grid = viewModel.app.getComp("grid_CustomerAddress").grid;
                if (obj.newValue != obj.oldValue) {
                    viewModel.CustomerAddressList.setValue("countyId", "");
                    viewModel.CustomerAddressList.setValue("countyName", "");
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                    if (obj.rowObj.data.countyId.meta) {
                        obj.rowObj.data.countyId.meta.display = "";
                    }
                    if (obj.rowObj.data.townId.meta) {
                        obj.rowObj.data.townId.meta.display = "";
                    }
                    grid.repaintGridDivs();
                }
            });
            viewModel.CustomerAddressList.on("countyId.valuechange", function (obj) {
                var countyId = obj.newValue;
                var grid = viewModel.app.getComp("grid_CustomerAddress").grid;
                if (obj.newValue != obj.oldValue) {
                    viewModel.CustomerAddressList.setValue("townId", "");
                    viewModel.CustomerAddressList.setValue("townName", "");
                    if (obj.rowObj.data.townId.meta) {
                        obj.rowObj.data.townId.meta.display = "";
                    }
                    grid.repaintGridDivs();
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
                // var rowObj = '中国',
                //     preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                if (obj.oldValue != obj.newValue) {
                    // if (!obj.rowObj.data.countryId.meta) {
                    // } else {
                    //     rowObj = obj.rowObj.data.countryId.meta.display
                    // }
                    // if (!preValue) {
                        // viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', rowObj + '/');
                    // } else {
                        // var preArr = preValue.split('/');
                        // if (rowObj) {
                        //     preArr[0] = rowObj + '/';
                        // } else {
                        //     preArr[0] = '';
                        // }
                        // preArr.splice(1, preArr.length - 1);
                        // viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        cityId.setEnable(false);
                        districtId.setEnable(false);
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    // }
                    if (!obj.newValue || obj.newValue == '') {
                        provinceId.setEnable(false);
                    } else {
                        provinceId.setEnable(true);
                    }
                    viewModel.setAddresscardcompDetailValue(obj);
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
                    // if (!obj.rowObj.data.provinceId.meta) {
                    //     return
                    // }
                    // var rowObj = obj.rowObj.data.provinceId.meta.display,
                    //     preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    // var preArr = preValue.split('/');
                    // if (preArr.length > 2) {
                    //     if (rowObj) {
                    //         preArr[1] = rowObj + '/';
                    //     } else {
                    //         preArr[1] = '';
                    //     }
                    //
                    //     preArr.splice(2, preArr.length - 2);
                    //     viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        districtId.setEnable(false);
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    // } else {
                    //     viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    // }
                    if (!obj.newValue || obj.newValue == '') {
                        cityId.setEnable(false);
                    } else {
                        cityId.setEnable(true);
                    }
                    viewModel.setAddresscardcompDetailValue(obj);
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
                    // if (!obj.rowObj.data.cityId.meta) {
                    //     return
                    // }
                    // var rowObj = obj.rowObj.data.cityId.meta.display,
                    //     preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    // var preArr = preValue.split('/');
                    // if (preArr.length > 2) {
                    //     if (rowObj) {
                    //         preArr[2] = rowObj + '/';
                    //     } else {
                    //         preArr[2] = '';
                    //     }
                    //
                    //     preArr.splice(3, preArr.length - 3);
                    //     viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    // } else {
                    //     viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    // }
                    if (!obj.newValue || obj.newValue == '') {
                        districtId.setEnable(false);
                    } else {
                        districtId.setEnable(true);
                    }
                    viewModel.setAddresscardcompDetailValue(obj);
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
                    // if (!obj.rowObj.data.districtId.meta) {
                    //     return
                    // }
                    // var rowObj = obj.rowObj.data.districtId.meta.display,
                    //     preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    // var preArr = preValue.split('/');
                    // if (preArr.length > 3) {
                    //     if (rowObj) {
                    //         preArr[3] = rowObj + '/';
                    //     } else {
                    //         preArr[3] = '';
                    //     }
                    //     preArr.splice(4, preArr.length - 4);
                    //     viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    // } else {
                    //     viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    // }
                    if (!obj.newValue || obj.newValue == '') {
                        townId.setEnable(false);
                    } else {
                        townId.setEnable(true);
                    }
                    viewModel.setAddresscardcompDetailValue(obj);
                } else {
                    townId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("townId.valuechange", function (obj) {
                var townId = obj.newValue;
                if (obj.oldValue != obj.newValue) {
                    // if (!obj.rowObj.data.townId.meta) {
                    //     return
                    // }
                    // var rowObj = obj.rowObj.data.townId.meta.display,
                    //     preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    // var preArr = preValue.split('/');
                    // if (preArr.length > 4) {
                    //     preArr[4] = rowObj + '/';
                    //     preArr.splice(5, preArr.length - 5);
                    //     viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    // } else {
                    //     viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    // }
                    viewModel.setAddresscardcompDetailValue(obj);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("receiveAddress.valuechange", function (obj) {
                var newAddr = obj.newValue;
                if (obj.oldValue != obj.newValue) {
                    viewModel.setAddresscardcompDetailValue(obj);
                    // var preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    // viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + newAddr);
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
