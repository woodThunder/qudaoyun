// define(['ocm_simpleview', './meta.js', 'ocm_common'], function (simpleview, model, common) {
//     var viewModel;
//     var view = simpleview.extend({
//         beforeCreate: function () {
//             viewModel = this.viewModel;
//         },
//         model: model,
//         baseData: {
//             baseurl: '/cust-docs',
//             searchBaseurl: '/cust-docs?sort=creationTime,desc&sort=id,desc',
//             simpleList: new u.DataTable(model.options.metas.CustDocmeta),
//             buttonSource: model.options.buttons.button1,
//             searchcomp: {},
//             searchSource: model.options.searchs.search1,
//             dialogcardcomp: {},
//             dialogcardSource: model.options.dialogs.dialog1,
//             grid1Option: model.options.grids.grid1,
//             grid2Option: model.options.grids.grid2
//         },
//         rendertype: u.extend({}, common.rendertype, {
//             // 单表操作
//             operation: function (obj) {
//                 var viewModel = obj.gridObj.viewModel;
//                 var dataTableRowId = obj.row.value["$_#_@_id"];
//                 var delfun =
//                     "data-bind=click:del.bind($data," +
//                     obj.rowIndex +
//                     "," +
//                     dataTableRowId +
//                     ")";
//                 var custdocdeffun =
//                     "data-bind=click:custdocdefDetail.bind($data," +
//                     obj.rowIndex +
//                     "," +
//                     dataTableRowId +
//                     ")";
//                 var editfun =
//                     "data-bind=click:beforeEdit.bind($data," +
//                     obj.rowIndex +
//                     "," +
//                     dataTableRowId +
//                     ")";

//                 obj.element.innerHTML =
//                     '<div class="ui-handle-icon">' +
//                     '<span class="ui-handle-word">' +
//                     '<a href="#" ' +
//                     editfun +
//                     ' title="编辑">编辑</a>' +
//                     "</span>    " +
//                     '<span class="ui-handle-word">' +
//                     '<a href="#" ' +
//                     custdocdeffun +
//                     ' title="维护">维护</a>' +
//                     "</span>    " +
//                     '<span class="ui-handle-word">' +
//                     '<a href="#" ' +
//                     delfun +
//                     ' title="删除">删除</a>' +
//                     "</span></div>";
//                 ko.cleanNode(obj.element);
//                 ko.applyBindings(viewModel, obj.element);
//             },
//         }),
//         events: u.extend({}, simpleview.prototype.events, {
//             custdocdefDetail: function (data, rowId) {
//                 //跳转详情页
//                 // $(".ui-list-panel").hide();
//                 $(".ui-panel").hide();
//                 $(".ui-custdocdef").show();
//                 $(".ui-custdocdef").animateCss("fadeIn");
//             },
//         })
//     });

//     return view;
// });



define([
    'text!./custdoc.html',
    'ocm_common',
    'ocm_baseview',
    './meta.js',
], function(
    tpl,
    common, baseview, model) {
    'use strict'
    var viewModel;
    var view = baseview.extend({
        tpl: tpl,

        setTemplate: function(el, tpl) {
            el.innerHTML = tpl;
            viewModel = this.viewModel;
        },
        baseData: {
            baseurl: '/cust-docs',
            custdocdefurl: '/base/cust-doc-defs',
            searchBaseurl: '/cust-docs?sort=creationTime,desc&sort=id,desc',
            simpleList: new u.DataTable(model.options.metas.CustDocmeta),
            childList: new u.DataTable(model.options.metas.CustDocDefmeta),
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2
        },
        rendertype: u.extend({}, common.rendertype, {
            // 单表操作
            operation: function(obj) {
                console.log(obj)
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var rowId = obj.row.value["$_#_@_id"];
                console.log(dataTableRowId);
                var delfun =
                    "data-bind=click:del.bind($data," +
                    rowId +
                    "," +
                    dataTableRowId +
                    ")";
                var custdocdeffun =
                    "data-bind=click:custdocdefDetail.bind($data," +
                    rowId +
                    "," +
                    dataTableRowId +
                    ")";
                var editfun =
                    "data-bind=click:beforeEdit.bind($data," +
                    rowId +
                    "," +
                    dataTableRowId +
                    ")";

                obj.element.innerHTML =
                    '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    editfun +
                    ' title="编辑">编辑</a>' +
                    "</span>    " +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    custdocdeffun +
                    ' title="维护">维护</a>' +
                    "</span>    " +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    delfun +
                    ' title="删除">删除</a>' +
                    "</span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
        }),
        events: {
            //跳转单据详情页
            goDetailPanel: common.bill.goDetailPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel,

            custdocdefDetail: function(index, rowId) {
                var data = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                viewModel.custDocId = data.id;
                viewModel.custDocCode = data.code;
                viewModel.custDocName = data.name;

                $(".ui-panel").hide();
                $(".ui-custdocdef").show();
                $(".ui-custdocdef").animateCss("fadeIn");
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.custdocdefurl + "/find-by-custdoc-code/" + data.code,
                    dataType: "json",
                    success: function(data) {
                        viewModel.childList.setSimpleData(data, {
                            unSelect: true
                        });
                    }
                })

            },
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
            beforeEdit: function(index, rowId, id) {
                console.log(rowId)
                var title;
                viewModel.index = index;
                if (u.isNumber(index)) {
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                    viewModel.rowId = rowId;
                    viewModel.dialogcardcomp.seteidtData(currentData);
                } else {
                    title = "新增"
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                }
                //显示模态框
                viewModel.dialogWidth ?
                    viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
                    viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
            },
            //将操作后的数据进行保存
            edit: function() {
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
                        success: function(data) {
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
            saveCustdocdef: function() {
                var postdata = viewModel.childList.getSimpleData();
                var changeData = [];
                var nochangeData = [];
                for (var i = 0; i < postdata.length; i++) {
                    if (postdata[i].persistStatus != "nrm") {
                        postdata[i].custDocId = viewModel.custDocId;
                        postdata[i].custDocCode = viewModel.custDocCode;
                        postdata[i].isEnable = 1;
                        changeData.push(postdata[i]);
                    } else {
                        nochangeData.push(postdata[i]);
                    }
                }
                $._ajax({
                    url: appCtx + viewModel.custdocdefurl + "/batch-save",
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    complete: function() {
                        u.hideLoader();
                    },
                    success: function(data) {
                        viewModel.childList.removeAllRows();
                        viewModel.childList.addSimpleData(data, "nrm", {
                            unSelect: true
                        });
                        viewModel.childList.addSimpleData(nochangeData, "nrm", {
                            unSelect: true
                        });
                    }
                });
            },
            //删除和批量删除
            del: function(data, rowId) {
                if (typeof(data) == 'number') {
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
                        onOk: function() {
                            $._ajax({
                                url: appCtx + viewModel.baseurl + "/delete",
                                type: "post",
                                // data: "ids=" + ids.join(","),
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function(data) {
                                    viewModel.simpleList.removeRows(rows);
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //子表增行
            addRow: function(dataTable) {
                viewModel[dataTable].createEmptyRow();
                viewModel.currentFlag = 0;
            },
            //子表 删除和批量删除
            delChild: function(dataTable) {
                var rows = viewModel[dataTable].getSelectedRows();
                viewModel[dataTable].removeRows(rows);
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function(reindex) {
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
                    success: function(data) {
                        viewModel.simpleList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.simpleList.totalRow(data.totalElements);
                        viewModel.simpleList.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            cleanSearch: function() {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function(index) {
                viewModel.simpleList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function(size) {
                viewModel.simpleList.pageSize(size);
                viewModel.search(true);
            },
            //启用
            enable: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    })
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-enable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
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
            disable: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    })
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-disable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
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
            detail: function() {
                //确保grid先将行设置为focus状态
                setTimeout(function() {
                    viewModel.goDetailPanel();
                }, 0);
            },
            //导入
            importHandle: function() {
                var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
                var ele = $('#importFiel')[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportHandle: function() {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
                var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
                var listData = viewModel.simpleList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
        },
        afterCreate: function() {
            //viewModel.search();
        }
    });

    return view;
});