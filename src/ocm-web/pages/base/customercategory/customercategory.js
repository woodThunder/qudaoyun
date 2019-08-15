
define([
    'text!./customercategory.html',
    'ocm_common',
    'ocm_baseview',
    './meta.js',
    'searchbox',
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
                baseurl: '/base/customer-categorys',
                statusField: 'isEnable',
                excelurl:'/customer-category-excel',
                dialogWidth: '900px',
                simpleList: new u.DataTable(model.options.metas.CustomerCategorymeta),
                simpleListTree: new u.DataTable(model.options.metas.CustomerCategorymeta),
                buttonSource: model.options.buttons.button1,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                search2Source: model.options.searchs.search2,
                dialogcardcomp: {},
                dialogcardSource: model.options.dialogs.dialog1,
                // detailSource: model.options.details.detail,
                gridOption: model.options.grids.grid1,
                treeSetting: {
                    view: {
                        showLine: false,
                        multiSelect: true
                    },
                    callback: {
                        beforeClick: function (treeId, treeData) {
                            var refComp = $("#refContainercustomercategoryId").data("uui.refer");
                            if(refComp && treeData) {
                                refComp.setValue([treeData]);
                            }
                        }
                    }
                }
            },
            rendertype: u.extend(common.rendertype, {
                // 单表操作
                operation4single: function (obj) {
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
                    var positionGrid =
                        "data-bind=click:positionGrid.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        positionGrid +
                        ' title="定位">定位</a>' +
                        "</span>    " +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        editfun +
                        ' title="编辑">编辑</a>' +
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
                //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
                beforeEdit: function (index, rowId) {
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
                        var data = viewModel.dialogcardcomp.geteidtData();
                        if (viewModel.treeId) {
                            data.parentId = viewModel.treeId
                        }
                        viewModel.dialogcardcomp.seteidtData(data)
                    }
                    //显示模态框
                    viewModel.dialogWidth ?
                        viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
                        viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
                },
                //将操作后的数据进行保存
                edit: function () {
                    var result = viewModel.dialogcardcomp.validate();
                    if (result.passed) {
                        var index = viewModel.index;
                        var currentRow, type = "post";
                        var postdata = viewModel.dialogcardcomp.geteidtData();
                        var treeData = viewModel.simpleListTree.getSimpleData()[0];
                        // if(treeData){
                        //     postdata.parentId = treeData.id;
                        // }
                        console.log(postdata);
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
                                //add by gongdb 新增或修改后更新tree
                                viewModel.searchTree();
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
                                    // data: "ids=" + ids.join(","),
                                    data: {
                                        ids: ids.join(",")
                                    },
                                    success: function (data) {
                                        viewModel.simpleList.removeRows(rows);
                                        viewModel.searchTree();
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
                        }
                    })
                },
                //树查询方法
                searchTree: function () {
                    // viewModel.simpleList.removeAllRows();
                    var queryData = {};
                    queryData.size = 10000;
                    queryData.page = 0;
                    $._ajax({
                        type: "get",
                        url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                           
                            viewModel.simpleListTree.setSimpleData(data.content, {
                                //unSelect: true
                                unSelect: false
                            });
                            viewModel.simpleListTree.totalRow(data.totalElements);
                            viewModel.simpleListTree.totalPages(data.totalPages);
                        }
                    })
                },
                //定位
                positionTree: function () {
                    var searchKey = $("#tree-searchKey")[0].value;
                    $(".seached").removeClass("seached");
                    if (searchKey !== "") {
                        console.log(searchKey);
                        // 定义过滤条件
                        var filter = function (node) {
                            return node.name.indexOf(searchKey) > -1;
                        }
                        // 过滤出节点
                        var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
                        // 查找第一个节点 展开父节点并添加样式
                        $("#tree1")[0]['u-meta'].tree.expandNode(nodes[0].getParentNode(), true, false, true);
                        $("#" + nodes[0].tId + "_span").addClass("seached")
                    }
                },
                positionGrid: function (index, rowId) {
                    var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                    var id = currentData.id;
                    $(".seached").removeClass("seached");
                    // 定义过滤条件
                    var filter = function (node) {
                        if (node.id) {
                            return node.id.indexOf(id) > -1;
                        }
                        return false;
                    }
                    // 过滤出节点
                    var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
                    // 查找第一个节点 展开父节点并添加样式
                    if (nodes) {
                        $("#tree1")[0]['u-meta'].tree.expandNode(nodes[0].getParentNode(), true, false, true);
                        $("#" + nodes[0].tId + "_span").addClass("seached")
                    }
                },
                //树点击事件
                clickTree: function () {
                    //获取到被点击的树节点行号
                    var num = viewModel.simpleListTree.selectedIndices()[0]
                    if (num == null) {
                        return
                    }
                    //被点击的树节点
                    var treeData = viewModel.simpleListTree.getSimpleData()[num];
                    $('.ui-search-btn>.ui-btn-primary').trigger('click');
                    if (!$('.ui-search-more').hasClass('expand')) {
                        $('.ui-search-more').trigger('click');
                    }
                    viewModel.searchcomp.viewModel.params.setValue("parent--id", treeData.id);
                    viewModel.search();
                    var listData = viewModel.simpleList.getSimpleData();
                    viewModel.simpleList.setSimpleData(listData, {
                        unSelect: true
                    });
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
                detail: function () {
                    //确保grid先将行设置为focus状态
                    setTimeout(function () {
                        viewModel.goDetailPanel();
                    }, 0);
                },
                //导入
                importHandle: function () {
                    var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                    var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
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
            },
            afterCreate: function () {
                viewModel.search();
                viewModel.searchTree();
            }
        });
        return view;
    });
