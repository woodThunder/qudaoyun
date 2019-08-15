define([
    'text!./customermanagers.html',
    'ocm_common',
    'ocm_baseview',
    './meta.js',
    'searchbox'
], function (
    tpl,
    common, baseview, model, searchbox) {
        'use strict'
        var viewModel;
        var view = baseview.extend({
            tpl: tpl,
            setTemplate: function (el, tpl) {
                el.innerHTML = tpl;
                viewModel = this.viewModel;
            },
            model: model,
            baseData: {
                baseurl: '/base/customer-managers',
                categoryurl: '/base/supplier-categorys',
                accounturl: "/base/supplier-accounts",
				excelurl: '/qudao-customer-manager-excel',
                statusField: 'isEnable',
                dialogWidth: '900px',
                simpleList: new u.DataTable(model.options.metas.customermanagermeta),
                accountList: new u.DataTable(model.options.metas.customermanageraccountmeta),
                simpleListBackup: new u.DataTable(model.options.metas.customermanagermeta),
                simpleListTree: new u.DataTable(model.options.metas.customermanagercategorymeta),
                button1Source: model.options.buttons.button1,
                button2Source: model.options.buttons.button2,
                button3Source: model.options.buttons.button3,
                button4Source: model.options.buttons.button4,
				// buttonMenu1Source: model.options.buttonmenus.buttonmenu1,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                search2Source: model.options.searchs.search2,
                dialogcardcomp: {},
                dialogcardSource: model.options.dialogs.dialog1,
                detail1Source: model.options.details.detail1,
                card1Source: model.options.cards.card1,
                grid1Option: model.options.grids.grid1,
                grid2Option: model.options.grids.grid2,
                grid3Option: model.options.grids.grid3,
                goBillPanel: common.bill.goBillPanel,
                treeSetting: {
                    view: {
                        showLine: false,
                        multiSelect: true
                    }
                },

                whetherSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }],
                billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
                accountNatureSource: ko.observableArray([]),
                enableFmt: ko.pureComputed(function () {
                    var status = viewModel.simpleList.ref("isEnable")();
                    var statusName
                    if (status == 0) {
                        (statusName = "未启用")
                    }
                    if (status == 1) {
                        (statusName = "已启用")
                    }
                    if (status == 2) {
                        (statusName = "已停用")
                    }
                    return statusName;
                }),
                isDefaultFmt: ko.pureComputed(function () {
                    var status = viewModel.simpleList.ref("isDefault")();
                    var statusName
                    if (status == 0) {
                        (statusName = "否")
                    }
                    if (status == 1) {
                        (statusName = "是")
                    }
                  
                    return statusName;
                }),
            },
            rendertype: u.extend({}, common.rendertype, {
                detailRender: function (obj) {
                    var viewModel = obj.gridObj.viewModel;
                    var dataTableRowId = obj.row.value["$_#_@_id"];
                    var detailfun = "data-bind=click:detail.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    obj.element.innerHTML =
                        '<a href="#" class="ui-a-detail" ' +
                        detailfun +
                        ">" +
                        obj.value +
                        "</a>";
                    ko.cleanNode(obj.element);
                    ko.applyBindings(viewModel, obj.element);
                },
            }),
            events: {
                //跳转单据详情页
                goDetailPanel: common.bill.goDetailPanel,
                //返回列表页
                retListPanel: common.bill.retListPanel,

                //点击取消 单据页
                cancelHandle: function () {
                    viewModel.search();
                    viewModel.retListPanel();
                },
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

                //子表增行
                addRow: function (dataTable) {
                    if(viewModel.simpleList.getFocusRow().getSimpleData().supplierTypeCode == "01"){
                        toastr.warning("内部单位不可添加账户信息");
                        return;
                    }
                    viewModel[dataTable].createEmptyRow();
                    viewModel.currentFlag = 0;
                },
                //子表 删除和批量删除
                delChild: function (dataTable) {
                    var rows = viewModel[dataTable].getSelectedRows();
                    viewModel[dataTable].removeRows(rows);
                },

                //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
                beforeEdit: function (index, rowId) {

                    viewModel.goBillPanel();
                    $("#personBase").show();
                    $("#personBase_show").hide();
                    //设置tab显示基本信息
                    $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
                    $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");

                    var title;
                    viewModel.index = index;
                    var row = viewModel.simpleList.createEmptyRow();
                   /*  var innerOrg = viewModel.app.getComp("innerOrgId");
                    innerOrg.setEnable(false); */
                    if (u.isNumber(index)) {
                        //修改操作
                        title = "编辑";
                        var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                        /* if(currentData.supplierTypeCode == "01"){
                            innerOrg.setEnable(true);
                        } */
                        viewModel.rowId = rowId;
                        viewModel.supplierId = currentData.id
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT)
                        $._ajax({
                            url: appCtx + viewModel.accounturl + '/find-by-supplier-id/' + currentData.id,
                            type: "get",
                            // data: { supplierId: currentData.id },
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                viewModel.accountList.setSimpleData(data);
                            }
                        })
                    } else {
                        title = "新增"
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD)
                        // viewModel.simpleList.setSimpleData([])
                        viewModel.simpleList.setRowFocus(row);
                        viewModel.accountList.setSimpleData([]);
                    }
                },
                validate: function (element) {
                    var result = viewModel.app.compsValidateMultiParam({
                        element: element,
                        showMsg: true
                    });
                    return result;
                },
                //将人员信息保存
                saveHandle: function () {
                    var basePass = viewModel.validate(supplierBase);
                    if (basePass.passed) {

                        var type = "post";
                        var simpleData = viewModel.simpleList.getFocusRow().getSimpleData();
                        var accountData = viewModel.accountList.getSimpleData();
                        simpleData.supplierAccounts = accountData
                        if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
                            type = "put";
                        }
                        if((!simpleData.mgtCustomerId && !simpleData.mgtOrganizationId) || (simpleData.mgtCustomerId && simpleData.mgtOrganizationId)) {
                            toastr.warning("管理组织、上级管理客户要求有且仅有一项");
                            return;
                        }
                        if(simpleData.mgtCustomerId && simpleData.mgtCustomerId == simpleData.customerId) {
                            toastr.warning("上级管理客户与客户重复");
                            return;
                        }
                        //更改后台数据
                        $._ajax({
                            url: appCtx + viewModel.baseurl,
                            type: type,
                            data: JSON.stringify(simpleData),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                //如果index大于等于0说明是修改
                                viewModel.search();
                                viewModel.retListPanel();
                            }
                        })
                    }
                },
                //将操作后的数据进行保存
                edit: function () {
                    var result = viewModel.dialogcardcomp.validate();
                    if (result.passed) {
                        var index = viewModel.index;
                        var currentRow, type = "post";
                        var postdata = viewModel.dialogcardcomp.geteidtData();
                        if (index >= 0) {
                            type = "put";
                        }
                        //更改后台数据
                        $._ajax({
                            url: appCtx + viewModel.baseurl,
                            type: type,
                            data: JSON.stringify(postdata),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                //如果index大于等于0说明是修改
                                viewModel.dialogcardcomp.close();
                                if (index >= 0) {
                                    //获取需要修改的行
                                    currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
                                    //将用户填写的数据更新到simpleList上
                                } else {
                                    //添加数据
                                    currentRow = viewModel.simpleList.createEmptyRow();
                                }
                                currentRow.setSimpleData(data);
                            }
                        })
                    }
                },
                //删除和批量删除
                del: function (data, rowId) {
                    if (typeof (data) == 'number') {
                        viewModel.simpleList.setRowSelectbyRowId(rowId);
                    }
                    var ids = [];
                    var rows = viewModel.simpleList.getSelectedRows();
                    if (rows && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            ids.push(rows[i].getValue("id"));
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
                                        viewModel.simpleList.removeRows(rows);
                                    }
                                });
                            }
                        });
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                search: function (reindex) {
                    if (reindex) {
                        viewModel.simpleList.pageIndex(0);
                    }
                    viewModel.simpleList.removeAllRows();
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    queryData.size = viewModel.simpleList.pageSize();
                    queryData.page = viewModel.simpleList.pageIndex();
                    $._ajax({
                        type: "get",
                        url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.simpleList.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.simpleList.totalRow(data.totalElements);
                            viewModel.simpleList.totalPages(data.totalPages);
                            viewModel.simpleListBackup.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.simpleListBackup.totalRow(data.totalElements);
                            viewModel.simpleListBackup.totalPages(data.totalPages);
                        }
                    })
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                searchTree: function () {
                    //获取查询条件
                    var searchKey = $("#supplier-tree-searchKey")[0].value;
                    // 定义过滤条件
                    var filter = function (node) {
                        return node.name.indexOf(searchKey) > -1;
                    }
                    // 过滤出节点
                    var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
                    var treeData = viewModel.simpleListTree.getSimpleData()
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    queryData.size = viewModel.simpleList.pageSize();
                    queryData.page = viewModel.simpleList.pageIndex();
                    if (searchKey && queryData != "") {
                        queryData.search_LIKE_name = "%" + searchKey + "%"
                    }

                    $._ajax({
                        type: "get",
                        url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.categoryurl),
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.simpleListTree.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.simpleListTree.totalRow(data.totalElements);
                            viewModel.simpleListTree.totalPages(data.totalPages);
                        }
                    })

                },
                //树点击事件
                clickTree: function () {
                    //获取查询条件
                    var searchKey = $("#supplier-tree-searchKey")[0].value;
                    //获取到被点击的树节点行号
                    var num = viewModel.simpleListTree.selectedIndices()[0]
                    if (num == null) {
                        return
                    }
                    //被点击的树节点
                    var treeData = viewModel.simpleListTree.getSimpleData()[num];
                    //被点击的树节点id
                    var treeId = treeData.id;
                    //树中数据源（与列表数据相同）
                    var simpleListData = viewModel.simpleListBackup.getSimpleData();
                    //用于临时存放列表数据
                    var tempSimpleList = [];
                    //遍历树种数据，找出本级及下级放入列表
                    for (var i = 0; i < simpleListData.length; i++) {
                        //本级
                        if (simpleListData[i].supplierCategoryId == treeId) {
                            tempSimpleList.push(simpleListData[i]);
                            continue;
                        }
                    }
                    //将筛选后的数据放回列表
                    viewModel.simpleList.setSimpleData(tempSimpleList, {
                        unSelect: true
                    });
                    // viewModel.simpleList.totalRow(data.totalElements);
                    //viewModel.simpleList.totalPages(data.totalPages);

                },

                //是否默认--客户开票
                isDefaultRender: function (obj) {
                    var isDefault = viewModel.accountList.getRow(obj.rowIndex).getValue(
                        "isDefault"
                    );
                    var name;
                    isDefault == 1 ? (name = "是") : (name = "否");
                    obj.element.innerHTML = name;
                },
                //清空搜索条件
                cleanSearch: function () {
                    viewModel.searchcomp.clearSearch();
                },
                //页码改变时的回调函数
                pageChange: function (index) {
                    viewModel.simpleList.pageIndex(index);
                    viewModel.search();
                },
                //页码改变时的回调函数
                sizeChange: function (size) {
                    viewModel.simpleList.pageSize(size);
                    viewModel.search(true);
                },
                //启用
                enable: function () {
                    var selectedRows = viewModel.simpleList.getSelectedRows();
                    if (selectedRows && selectedRows.length > 0) {
                        var ids = selectedRows.map(function (row, index, arr) {
                            return row.getValue("id");
                        })
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.baseurl + "/batch-enable",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (res) {
                                for (var i = 0; i < selectedRows.length; i++) {
                                    viewModel.statusField ?
                                        selectedRows[i].setValue(viewModel.statusField, "1") :
                                        selectedRows[i].setValue("isEnable", "1");
                                }
                            }
                        })
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                //停用
                disable: function () {
                    var selectedRows = viewModel.simpleList.getSelectedRows();
                    if (selectedRows && selectedRows.length > 0) {
                        var ids = selectedRows.map(function (row, index, arr) {
                            return row.getValue("id");
                        })
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.baseurl + "/batch-disable",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (res) {
                                for (var i = 0; i < selectedRows.length; i++) {
                                    viewModel.statusField ?
                                        selectedRows[i].setValue(viewModel.statusField, "2") :
                                        selectedRows[i].setValue("isEnable", "2");
                                }
                            }
                        });
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },

                detail: function (index,rowId) {
                    //确保grid先将行设置为focus状态
                    setTimeout(function () {
                        viewModel.goDetailPanel();
                        var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                        viewModel.rowId = rowId;
                        viewModel.supplierId = currentData.id
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT)
                        $._ajax({
                            url: appCtx + viewModel.accounturl + '/find-by-supplier-id/' + currentData.id,
                            type: "get",
                            // data: { supplierId: currentData.id },
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                viewModel.accountList.setSimpleData(data, {
                                    unSelect: true
                                });
                            }
                        })
                    }, 0);
                },
                //导入
                importHandle: function () {
                    var urlInfo = viewModel.excelurl + '/excelDataImport'; //倒入地址参数
                    var urlStatusInfo = viewModel.excelurl + '/excelLoadingStatus'; //请求进度地址参数
                    var ele = $('#importFiel')[0]; //挂载元素
                    common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
                },
                //导出
                exportHandle: function () {
                    var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                    var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
                    var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
                    var listData = viewModel.simpleList; //需要导出表格的dataTable
                    var ele = $('#exportFiel')[0]; //挂载元素
                    common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
                },
                // //导入---供应商
                // importSupplier: function () {
                //     var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                //     var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
                //     var ele = $('#importFiel')[0]; //挂载元素
                //     common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
                // },
                // //导出---供应商
                // exportSupplier: function () {
                //     var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                //     var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
                //     var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
                //     var listData = viewModel.simpleList; //需要导出表格的dataTable
                //     var ele = $('#exportFiel')[0]; //挂载元素
                //     common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
                // },
                // //导入---账户
                // importAccount: function () {
                //     var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                //     var urlStatusInfo = "/supplier-account-excel/excelLoadingStatus"; //请求进度地址参数
                //     var ele = $('#importFiel')[0]; //挂载元素
                //     common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
                // },
                // //导出---账户
                // exportAccount: function () {
                // 	var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                // 	//搜索参数加customer.
                // 	for (var p in searchParams) {
                // 	    searchParams[
                // 	        p.replace("LIKE_", "LIKE_supplier.").replace("EQ_", "EQ_supplier.")
                // 	    ] =
                // 	        searchParams[p];
                // 	    delete searchParams[p];
                // 	}
                // 	var templateUrl = "/supplier-account-excel/downloadExcelTemplate"; //导出模板地址参数
                // 	var excelDataUrl = "/supplier-account-excel/excelDataExport"; //导出数据地址参数
                // 	var listData = viewModel.simpleList; //需要导出表格的dataTable
                // 	var ele = $("#exportFiel")[0]; //挂载元素
                // 	common.fileHandle.exportFile(
                // 	    listData,
                // 	    ele,
                // 	    searchParams,
                // 	    templateUrl,
                // 	    excelDataUrl
                // 	);
                // },
            },
            afterCreate: function () {
                //枚举
                $._ajax({
                    type: "get",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                    data: {
                        cust_doc_code_batch: "ACCOUNT_NATURE"
                    },
                    success: function (data) {
                        var newarray;
                        newarray = common.dataconvert.toMap(data["ACCOUNT_NATURE"], "name", "code");
                        viewModel.accountNatureSource(newarray);
                    }
                });
            }
        });
        return view;
    });
