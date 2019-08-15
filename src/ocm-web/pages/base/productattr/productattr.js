define(["text!./productattr.html", "ocm_common", "ocm_baseview", "./meta.js"], function (tpl, common, baseview, model) {
    var BILLPANELSTATUS = {
        ADD: "add",
        EDIT: "edit",
        //  COPY: "copy",
        DETAIL: "detail",
        DEFAULT: "default"
    };
    var viewModel;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: "/base/product-attrs",
            valurl:"/base/prod-attr-val",
            ctxfilemng: "/iuap-saas-filesystem-service/",
            ProAttrDocList: new u.DataTable(model.options.metas.ProductAttrmeta),
            ProductAttrValueList: new u.DataTable(model.options.metas.ProductAttrValuemeta),
            CustDocList: new u.DataTable(model.options.metas.CustDocmeta),
            SysDocList: new u.DataTable(model.options.metas.SysDocmeta),
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            button4Source: model.options.buttons.button4,

            card1Source: model.options.cards.card1,
            detail1Source: model.options.details.detail1,
            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2,
            grid3Option: model.options.grids.grid3,
            grid4Option: model.options.grids.grid4,
            grid5Option: model.options.grids.grid5,
            grid6Option: model.options.grids.grid6,
            grid7Option: model.options.grids.grid7,


            billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
            productAttrTypeDatasource: ko.observable([]),
            //TODO: 枚举值
            enableRadioSrc: [{
                value: "0",
                name: "未启用"
            }, {
                value: "1",
                name: "已启用"
            }, {
                value: "2",
                name: "已停用"
            }],
            enableFmt: ko.pureComputed(function () {
                var status = viewModel.ProAttrDocList.ref("isEnable")();
                var statusName;
                if (status == 0) {
                    statusName = "未启用";
                }
                if (status == 1) {
                    statusName = "已启用";
                }
                if (status == 2) {
                    statusName = "已停用";
                }
                return statusName;
            }),
            statusSource: [{
                value: "0",
                name: "未启用"
            }, {
                value: "1",
                name: "已启用"
            }, {
                value: "2",
                name: "已停用"
            }],
            approveFormat: function () {
                viewModel.ProAttrDocList.getValue("approveStatus");
            },
            //跳转单据页
            goBillPanel: common.bill.goBillPanel,
            //跳转单据详情页
            goDetailPanel: common.bill.goDetailPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel
        },
        rendertype: {
            operation: common.rendertype.operation,
            enableRender: common.rendertype.enableRender,
            detailRender: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + ")";
                obj.element.innerHTML =
                    "<a href=\"#\" class=\"ui-a-detail\" " +
                    detailfun +
                    ">" +
                    obj.value +
                    "</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            //类型
            cateGrid: function (obj) {
                if (obj.value == 0 || obj.value == "0") {
                    obj.element.innerHTML = "字符";
                }
                if (obj.value == 1 || obj.value == "1") {
                    obj.element.innerHTML = "自定义档案";
                }
                if (obj.value == 2 || obj.value == "2") {
                    obj.element.innerHTML = "系统档案";
                }
            }
        },
        events: {
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (reindex) {
                    viewModel.ProAttrDocList.pageIndex(0);
                }
                viewModel.ProAttrDocList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                var pageSize = viewModel.ProAttrDocList.pageSize();
                var pageNumber = viewModel.ProAttrDocList.pageIndex();
                queryData.size = pageSize;
                queryData.page = pageNumber;
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.ProAttrDocList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.ProAttrDocList.totalRow(data.totalElements);
                        viewModel.ProAttrDocList.totalPages(data.totalPages);
                    }
                });
            },
            //清空搜索条件
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.ProAttrDocList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.ProAttrDocList.pageSize(size);
                viewModel.search();
            },
            //值集子表页码改变时的回调函数
            pageChange1: function (index) {
                viewModel.ProductAttrValueList.pageIndex(index);
                viewModel.findByParentid();
            },
            //值集子表页码改变时的回调函数
            sizeChange1: function (size) {
                viewModel.ProductAttrValueList.pageSize(size);
                viewModel.findByParentid();
            },

            //自定义档案子表页码改变时的回调函数
            pageChange2: function (index) {
                viewModel.CustDocList.pageIndex(index);
                viewModel.findCustdoc();
            },
            //自定义档案子表页码改变时的回调函数
            sizeChange2: function (size) {
                viewModel.CustDocList.pageSize(size);
                viewModel.findCustdoc();
            },

            //系统档案子表页码改变时的回调函数
            pageChange3: function (index) {
                viewModel.SysDocList.pageIndex(index);
                viewModel.findSysdoc();
            },
            //系统档案子表页码改变时的回调函数
            sizeChange3: function (size) {
                viewModel.SysDocList.pageSize(size);
                viewModel.findSysdoc();
            },

            //进入新增单据页
            showAddBillPanel: function () {
                var curRow = viewModel.ProAttrDocList.createEmptyRow();
                viewModel.ProAttrDocList.setRowFocus(curRow);
                viewModel.goBillPanel();
                viewModel.ProductAttrValueList.clear();
                $(".product-choose-result").hide();
                $(".product-choose-content").hide();
                $(".product-choose-result").removeClass("open");
                $(".custdoc-choose-result").hide();
                $(".custdoc-choose-content").hide();
                $(".custdoc-choose-result").removeClass("open");
                $(".sysdoc-choose-result").hide();
                $(".sysdoc-choose-content").hide();
                $(".sysdoc-choose-result").removeClass("open");
                viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
                var custDoc = viewModel.app.getComp("custDoc");
                var systemDoc = viewModel.app.getComp("systemDoc");
                custDoc.setValue("");
                custDoc.element.parentElement.hidden = true;
                systemDoc.setValue("");
                systemDoc.element.parentElement.hidden = true;
            },
            //进入修改单据页
            showEditBillPanel: function (index) {
                viewModel.ProAttrDocList.setRowFocus(index);

                var id = viewModel.ProAttrDocList.getValue("id");
                viewModel.ProAttrDocList.originEditData = viewModel.ProAttrDocList.getFocusRow().getSimpleData();
                viewModel.goBillPanel();
                viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
                //根据类型选择值显示
                $(".product-choose-result").hide();
                $(".product-choose-content").hide();
                $(".custdoc-choose-result").hide();
                $(".custdoc-choose-content").hide();
                $(".sysdoc-choose-result").hide();
                $(".sysdoc-choose-content").hide();
                var productAttrAypeShow = viewModel.ProAttrDocList.getValue("productAttrTypeCode");
                var custDoc = viewModel.app.getComp("custDoc");
                var systemDoc = viewModel.app.getComp("systemDoc");
                if (productAttrAypeShow == 1) {
                    viewModel.findByParentid(id);
                    $(".product-choose-result").show();
                    $(".product-choose-content").show();
                    custDoc.setValue("");
                    custDoc.element.parentElement.hidden = true;
                    systemDoc.setValue("");
                    systemDoc.element.parentElement.hidden = true;
                } else if (productAttrAypeShow == 2) {
                    viewModel.findCustdoc();
                    $(".custdoc-choose-result").show();
                    $(".custdoc-choose-content").show();
                    $(".custdoc-choose-result").addClass("open");

                    custDoc.element.parentElement.hidden = false;
                    systemDoc.element.parentElement.hidden = true;
                } else if (productAttrAypeShow == 3) {
                    viewModel.findSysdoc();
                    $(".sysdoc-choose-result").show();
                    $(".sysdoc-choose-content").show();
                    $(".sysdoc-choose-result").addClass("open");
                    custDoc.element.parentElement.hidden = true;
                    systemDoc.element.parentElement.hidden = false;
                }
            },
            detail: function (index) {
                viewModel.ProAttrDocList.setRowFocus(index);
                //根据类型选择值显示
                $(".product-choose-result").hide();
                $(".product-choose-content").hide();
                $(".custdoc-choose-result").hide();
                $(".custdoc-choose-content").hide();
                $(".sysdoc-choose-result").hide();
                $(".sysdoc-choose-content").hide();
                var data = viewModel.ProAttrDocList.getFocusRow().getSimpleData();
                var productAttrAypeShow = data.productAttrTypeCode;
                var custDoc = viewModel.app.getComp("custDoc1");
                var systemDoc = viewModel.app.getComp("systemDoc1");
                if (productAttrAypeShow == 1) {
                    viewModel.findByParentid(data.id);
                    $(".product-choose-result").show();
                    $(".product-choose-content").show();
                } else if (productAttrAypeShow == 2) {
                    $(".custdoc-choose-result").show();
                    $(".custdoc-choose-content").show();
                    $(".custdoc-choose-result").addClass("open");
                    viewModel.findCustdoc();

                } else if (productAttrAypeShow == 3) {
                    $(".sysdoc-choose-result").show();
                    $(".sysdoc-choose-content").show();
                    $(".sysdoc-choose-result").addClass("open");
                    viewModel.findSysdoc();
                }

                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    viewModel.goDetailPanel();
                }, 0);

            },
            //查询子表数据
            findByParentid: function () {
                var id = viewModel.ProAttrDocList.getValue("id")
                var queryData = {};
                queryData.size = viewModel.ProductAttrValueList.pageSize();
                queryData.page = viewModel.ProductAttrValueList.pageIndex();
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/" + id + "/prod-attr-val-page",
                    data: queryData,
                    type: "get",
                    async: false,
                    success: function (data) {
                        viewModel.ProductAttrValueList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.ProductAttrValueList.totalRow(data.totalElements);
                        viewModel.ProductAttrValueList.totalPages(data.totalPages);
                    }
                });
            },
            findCustdoc: function () {
                var custDocId = viewModel.ProAttrDocList.getValue("custDocId")
                var queryData = {};
                queryData.size = viewModel.CustDocList.pageSize();
                queryData.page = viewModel.CustDocList.pageIndex();
                $._ajax({
                    data: queryData,
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/cust-doc/" + custDocId + "/prod-attr-val-page",
                    success: function (data) {
                        viewModel.CustDocList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.CustDocList.totalRow(data.totalElements);
                        viewModel.CustDocList.totalPages(data.totalPages);
                    }
                });
            },
            //系统档案子表列表公用了自定义档案列表
            findSysdoc: function () {
                var sysDocId = viewModel.ProAttrDocList.getValue("systemDocId")
                var queryData = {};
                queryData.size = viewModel.SysDocList.pageSize();
                queryData.page = viewModel.SysDocList.pageIndex();
                $._ajax({
                    type: "get",
                    data: queryData,
                    url: appCtx + viewModel.baseurl + "/sys-doc/" + sysDocId + "/prod-attr-val-page",
                    success: function (data) {
                        viewModel.SysDocList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.SysDocList.totalRow(data.totalElements);
                        viewModel.SysDocList.totalPages(data.totalPages);
                    }
                });
            },
            // // 清除基类属性
            // clearBaseProp: function(row) {
            //   row.setValue("id", "");
            //   row.setValue("code", "");
            //   row.setValue("name", "");
            //   row.setValue("creator", "");
            //   row.setValue("creationTime", "");
            //   row.setValue("modifier", "");
            //   row.setValue("modifiedTime", "");
            // },
            //保存单据
            saveBill: function () {
                var productBase = $("#productBase")[0];
                var basePass = viewModel.validate(productBase);
                var attrActivityData = viewModel.ProAttrDocList.getCurrentRow().getSimpleData();

                if (basePass.passed) {
                    var passSale = true;
                    var cates = viewModel.ProAttrDocList.getValue("productAttrTypeCode");
                    if (cates == 1) {
                        var validateSale = viewModel.validate($("#saleInfo")[0]);
                        if (!validateSale.passed) {
                            passSale = false;
                            return;
                        }
                    }
                    if (viewModel.billPanelStatus == BILLPANELSTATUS.ADD) {
                        attrActivityData.persistStatus = "new";
                        attrActivityData.proNature = "1";
                    } else if (viewModel.billPanelStatus == BILLPANELSTATUS.EDIT) {
                        attrActivityData.persistStatus = "upd";
                    } else {
                        attrActivityData.persistStatus = "";
                    }
                    console.log(viewModel.ProductAttrValueList.getSimpleData());
                    if (passSale) {
                        var attrActivityValueData = viewModel.ProductAttrValueList.getSimpleData();
                        if (attrActivityData.productAttrTypeCode == "01" && attrActivityValueData.length == 0) {
                            toastr.warning("请至少添加一个属性值");
                            return;
                        }
                        attrActivityData.prodAttrVals = attrActivityValueData;
                    }
                    var _ajaxType = attrActivityData.persistStatus == "upd" ? "put" : "post";
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: _ajaxType,
                        data: JSON.stringify(attrActivityData),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            viewModel.ProAttrDocList.getFocusRow().setSimpleData(data);
                            toastr.success("保存成功");
                            viewModel.retListPanel();
                        }
                    });
                }
            },
            //取消单据
            cancelBill: function () {
                var curRow = viewModel.ProAttrDocList.getCurrentRow();
                // 修改，则还原
                if (curRow && curRow.getValue("id")) {
                    curRow.setSimpleData(viewModel.ProAttrDocList.originEditData);
                }
                // 新增或复制，则删除
                else {
                    viewModel.ProAttrDocList.removeRow(curRow);
                }
                viewModel.retListPanel();
            },
            //启用
            enable: function () {
                var selectedRows = viewModel.ProAttrDocList.getSelectedRows();
                var ids = [];
                var status = [];
                var statustip = "";
                if (selectedRows && selectedRows.length > 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        ids.push(selectedRows[i].getValue("id"));
                        if (selectedRows[i].getValue("isEnable") == 1 || selectedRows[i].getValue("isEnable") == "1") {
                            status.push(selectedRows[i].getValue("code"));
                        }
                    }
                    // if (status.length > 0) {
                    //     function statusArr() {
                    //         for (i = 0; i < status.length; i++) {
                    //             statustip += status[i] + "，";
                    //         }
                    //         return statustip.substring(0, statustip.length - 1);
                    //     }
                    //
                    //     toastr.warning("数据   " + statusArr() + " 不可重复启用");
                    //     return false;
                    // }
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
                var selectedRows = viewModel.ProAttrDocList.getSelectedRows();
                var ids = [];
                var status = [];
                var statustip = "";
                if (selectedRows && selectedRows.length > 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        ids.push(selectedRows[i].getValue("id"));
                        if (selectedRows[i].getValue("isEnable") == 0 || selectedRows[i].getValue("isEnable") == "2") {
                            status.push(selectedRows[i].getValue("code"));
                        }
                    }
                    // if (status.length > 0) {
                    //     function statusArr() {
                    //         for (i = 0; i < status.length; i++) {
                    //             statustip += status[i] + "，";
                    //         }
                    //         return statustip.substring(0, statustip.length - 1);
                    //     }
                    //
                    //     toastr.warning("数据   " + statusArr() + " 不可重复停用");
                    //     return false;
                    // }
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

            //值集启用
            enableVal: function () {
                var selectedRows = viewModel.ProductAttrValueList.getSelectedRows();
                var ids = [];
                var status = [];
                var statustip = "";
                if (selectedRows && selectedRows.length > 0) {
                    if(viewModel.billPanelStatus == BILLPANELSTATUS.ADD){
                        for (var i = 0; i < selectedRows.length; i++) {
                            selectedRows[i].setValue("isEnable", "1");
                        }
                        toastr.success("启用成功");
                        return;
                    }
                    for (var i = 0; i < selectedRows.length; i++) {
                        ids.push(selectedRows[i].getValue("id"));
                        if (selectedRows[i].getValue("isEnable") == 1 || selectedRows[i].getValue("isEnable") == "1") {
                            status.push(selectedRows[i].getValue("code"));
                        }
                    }
                    // if (status.length > 0) {
                    //     function statusArr() {
                    //         for (i = 0; i < status.length; i++) {
                    //             statustip += status[i] + "，";
                    //         }
                    //         return statustip.substring(0, statustip.length - 1);
                    //     }
                    //
                    //     toastr.warning("数据   " + statusArr() + " 不可重复启用");
                    //     return false;
                    // }
                    ids = ids.join(",");
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.valurl + "/batch-enable",
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
            //值集停用
            disableVal: function () {
                var selectedRows = viewModel.ProductAttrValueList.getSelectedRows();
                var ids = [];
                var status = [];
                var statustip = "";
                if (selectedRows && selectedRows.length > 0) {
                    if(viewModel.billPanelStatus == BILLPANELSTATUS.ADD){
                        for (var i = 0; i < selectedRows.length; i++) {
                            selectedRows[i].setValue("isEnable", "2");
                        }
                        toastr.success("停用成功");
                        return;
                    }
                    for (var i = 0; i < selectedRows.length; i++) {
                        ids.push(selectedRows[i].getValue("id"));
                        if (selectedRows[i].getValue("isEnable") == 0 || selectedRows[i].getValue("isEnable") == "2") {
                            status.push(selectedRows[i].getValue("code"));
                        }
                    }
                    // if (status.length > 0) {
                    //     function statusArr() {
                    //         for (i = 0; i < status.length; i++) {
                    //             statustip += status[i] + "，";
                    //         }
                    //         return statustip.substring(0, statustip.length - 1);
                    //     }
                    //
                    //     toastr.warning("数据   " + statusArr() + " 不可重复停用");
                    //     return false;
                    // }
                    ids = ids.join(",");
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.valurl + "/batch-disable",
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
            //删除和批量删除
            del: function (data, rowId) {
                if (typeof (data) == "number") {
                    viewModel.ProAttrDocList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var status = [];
                var statustip = "";
                var rows = viewModel.ProAttrDocList.getSelectedRows();
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].getValue("id"));
                        var isEnable = rows[i].getValue("isEnable");
                        if (isEnable == 1 || isEnable == "1") {
                            status.push(rows[i].getValue("code"));
                        }
                    }
                    if (status.length > 0) {
                        function statusArr() {
                            for (i = 0; i < status.length; i++) {
                                statustip += status[i] + "，";
                            }
                            return statustip.substring(0, statustip.length - 1);
                        }

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
                                // data: "ids=" + ids.join(","),
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function (data) {
                                    viewModel.ProAttrDocList.removeRows(rows);
                                    toastr.success("删除成功");
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请先选择需要删除数据");
                }
            },
            //导入
            importHandle: function () {
                var urlInfo = "/product-attrs-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/product-attrs-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportHandle: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                // searchParams.search_EQ_proNature = "1";
                var templateUrl = "/product-attrs-excel/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = "/product-attrs-excel/excelDataExport"; //导出数据地址参数
                var listData = viewModel.ProAttrDocList; //需要导出表格的dataTable
                var ele = $("#exportFiel")[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            validate: function (element) {
                var result = viewModel.app.compsValidateMultiParam({
                    element: element,
                    showMsg: true
                });
                return result;
            },
            // //详情启用状态
            // isEnable: function () {
            //   var statusValue = viewModel.ProAttrDocList.getValue('isEnable');
            //   if (statusValue === null) {
            //     viewModel.ProAttrDocList.setValue('isEnable', 1);
            //   }
            //   var showName;
            //   statusValue == 0 ? showName = "停用" : showName = "启用";
            //   return showName;
            // },
            //新增子表项
            addItem: function () {
                viewModel.ProductAttrValueList.createEmptyRow();
            },
            //删除子表项
            delItems: function () {
                var selectedRows = viewModel.ProductAttrValueList.getSelectedRows();
                // for(var i=0;i<selectedRows.length;i++) {
                //   selectedRows[i].setValue("dr", "1");
                // }
                console.log("111111");
                console.log(selectedRows);
                viewModel.ProductAttrValueList.removeRows(selectedRows);
            }
        },
        afterCreate: function () {
            //viewModel.search();
            //类型切换

            //枚举
            $._ajax({
                type: "get",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                data: {
                    cust_doc_code_batch: "PRODUCT_ATTR_TYPE"
                },
                success: function (data) {
                    var newarray;
                    newarray = common.dataconvert.toMap(data["PRODUCT_ATTR_TYPE"], "name", "code");
                    viewModel.productAttrTypeDatasource(newarray);
                }
            });

            viewModel.ProAttrDocList.on("custDocId.valuechange", function (obj) {
                if(!obj.newValue){
                    return;
                }
                if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                    $._ajax({
                        type: "get",
                        url: appCtx + "/base/cust-doc-defs/find-by-custdoc-id/" + obj.newValue,
                        success: function (data) {
                            viewModel.CustDocList.setSimpleData(data);
                        }
                    });
                }
            });

            viewModel.ProAttrDocList.on("systemDocId.valuechange", function (obj) {
                if(!obj.newValue){
                    return;
                }
                if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                    $._ajax({
                        type: "get",
                        url: appCtx + "/base/product-attrs/sys-doc/" + obj.newValue +"/prod-attr-val-page",
                        success: function (data) {
                            viewModel.SysDocList.setSimpleData(data.content);
                        }
                    });
                }
            });

            viewModel.ProAttrDocList.on("productAttrTypeCode.valuechange", function (obj) {
                var custDoc = viewModel.app.getComp("custDoc");
                var systemDoc = viewModel.app.getComp("systemDoc");

                $(".custdoc-choose-result").hide();
                $(".custdoc-choose-content").hide();
                $(".sysdoc-choose-result").hide();
                $(".sysdoc-choose-content").hide();
                viewModel.CustDocList.clear();
                viewModel.SysDocList.clear();
                if (obj.oldValue != undefined && obj.oldValue != obj.newValue && obj.newValue == 1) {
                    $(".product-choose-result").show();
                    $(".product-choose-content").show();
                    $(".product-choose-result").addClass("open");
                    custDoc.setValue("");
                    custDoc.element.parentElement.hidden = true;
                    systemDoc.setValue("");
                    systemDoc.element.parentElement.hidden = true;
                } else {
                    var allRows = [];
                    for (var i = 0; i < viewModel.ProductAttrValueList.getSimpleData().length; i++) {
                        allRows.push(i);
                    }
                    viewModel.ProductAttrValueList.removeRows(allRows);
                    $(".product-choose-result").hide();
                    $(".product-choose-result").removeClass("open");
                    $(".ui-collapse-content").eq(1).attr("aria-hidden", "true").hide();

                    if (obj.newValue == 2 || obj.newValue == "2") {
                        $(".custdoc-choose-result").show();
                        $(".custdoc-choose-content").show();
                        $(".custdoc-choose-result").addClass("open");

                        custDoc.element.parentElement.hidden = false;
                        systemDoc.setValue("");
                        systemDoc.element.parentElement.hidden = true;
                    } else if (obj.newValue == 3 || obj.newValue == "3") {
                        $(".sysdoc-choose-result").show();
                        $(".sysdoc-choose-content").show();
                        $(".sysdoc-choose-result").addClass("open");
                        custDoc.element.parentElement.hidden = true;
                        custDoc.setValue("");
                        systemDoc.element.parentElement.hidden = false;
                    } else if(obj.newValue == 4 || obj.newValue == "4"){
                        custDoc.setValue("");
                        custDoc.element.parentElement.hidden = true;
                        systemDoc.setValue("");
                        systemDoc.element.parentElement.hidden = true;
                    }
                }
            });
        }
    });
    return view;
});
