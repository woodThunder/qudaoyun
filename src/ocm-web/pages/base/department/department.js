define([
    'text!./department.html',
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
                baseurl: '/departments',
                statusField: 'isEnable',
                // excelurl:'/person-excel',
                dialogWidth: '900px',
                orgSearchList: new u.DataTable(model.options.metas.departmentmeta),
                simpleList: new u.DataTable(model.options.metas.departmentmeta),
                simpleListTree: new u.DataTable(model.options.metas.departmentmeta),
                buttonSource: model.options.buttons.button1,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                dialogcardcomp: {},
                dialogcardSource: model.options.dialogs.dialog1,
                detailSource: model.options.details.detail,
                card1Source: model.options.cards.card1,
                gridOption: model.options.grids.grid1,
                treeSetting: {
                    view: {
                        showLine: false,
                        multiSelect: true
                    },
                    callback: {
                        beforeClick: function (treeId, treeData) {
                            var refComp = $("#refContainerdepartmentKey").data("uui.refer");
                            if(refComp && treeData) {
                                refComp.setValue([treeData]);
                            }
                        }
                    }
                },
                enableFmt: ko.pureComputed(function () {
                    var status = viewModel.simpleList.ref("isEnable")();
                    var statusName
                    if (status == 0) {
                        statusName = "未启用"
                    }
                    if (status == 1) {
                        statusName = "已启用"
                    }
                    if (status == 2) {
                        statusName = "已停用"
                    }
                    return statusName;
                })
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

                //返回列表页
                retListPanel: function () {
                    // $(".ui-bill-panel").hide();
                    // $(".ui-bill-detail").hide();
                    $(".ui-panel").hide();
                    $(".ui-treegrid-panel").show();
                    $(".ui-list-panel").show();
                    $(".ui-list-panel").animateCss("fadeIn");
                },
                //跳转详情页
                goDetailPanel: function () {
                    // $(".ui-list-panel").hide();
                    $(".ui-treegrid-panel").hide();
                    $(".ui-panel").hide();
                    $(".ui-bill-detail").show();
                    $(".ui-bill-detail").animateCss("fadeIn");
                },
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
                        if (viewModel.organizationId) {
                            data.organizationId = viewModel.organizationId;
                        }
                        if (viewModel.organizationId && viewModel.organizationId != "") {
                            var cityValue = {
                                "EQ_organization.id": viewModel.organizationId
                            };
                            $("#parentId").attr("data-refparam", JSON.stringify(cityValue));
                        }

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
                                viewModel.searchTree()
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
                                        viewModel.searchTree()
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
                    if (!viewModel.isAfterCreate) {
                        return
                    }
                    if (viewModel.organizationId == undefined || viewModel.organizationId == "") {
                        toastr.warning("请先选择所属组织");
                        return;
                    }
                    if (reindex) {
                        viewModel.simpleList.pageIndex(0);
                    }
                    viewModel.simpleList.removeAllRows();
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    queryData.size = viewModel.simpleList.pageSize();
                    queryData.page = viewModel.simpleList.pageIndex();
                    queryData["search_EQ_organization.id"] = viewModel.organizationId;
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
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                searchTree: function () {
                    if (viewModel.organizationId == undefined || viewModel.organizationId == "") {
                        return;
                    }
                    var queryData = {};
                    queryData.size = 10000;
                    queryData.page = 0;
                    queryData["search_EQ_organization.id"] = viewModel.organizationId;
                    $._ajax({
                        type: "get",
                        url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
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
                positionTree: function () {
                    var searchKey = $("#adminidivi-tree-searchKey")[0].value;
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
                    viewModel.treeId = treeData.id
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
                                toastr.info("启用成功！");
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
                                toastr.info("停用成功！");
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
                viewModel.isAfterCreate = true;
                // viewModel.search();
                // viewModel.searchTree();

                // 初始化必填项填写
                var currentRow = viewModel.orgSearchList.createEmptyRow();
                viewModel.orgSearchList.setRowFocus(currentRow)
                viewModel.orgSearchList.on("organizationId.valuechange", function (
                    obj
                ) {
                    viewModel.organizationId = viewModel.orgSearchList.getSimpleData()[0].organizationId
                    viewModel.search()
                    viewModel.searchTree()
                });

                viewModel.dialogcardcomp.viewModel.params.on("organizationId.valuechange", function (obj) {
                    // debugger
                    var cityValue = {
                        "EQ_organization.id": obj.newValue
                    };
                    $("#parentId").attr("data-refparam", JSON.stringify(cityValue));

                });




                //基本信息   省、城市、区县 --因为没有街道，所以只有三级
                viewModel.dialogcardcomp.viewModel.params.on("provinceId.valuechange", function (obj) {
                    var cityValue = {
                        "EQ_parent.id": obj.newValue
                    };
                    $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
                    var cityId = viewModel.dialogcardcomp.app.getComp("cityIdBase");
                    viewModel.dialogcardcomp.viewModel.params.setValue("cityId", "");
                    viewModel.dialogcardcomp.viewModel.params.setValue("cityCode", "");
                    viewModel.dialogcardcomp.viewModel.params.setValue("cityName", "");
                    if (obj.oldValue != obj.newValue) {
                        cityId.setEnable(true);
                    } else {
                        cityId.setEnable(false);
                    }
                });
                viewModel.dialogcardcomp.viewModel.params.on("cityId.valuechange", function (obj) {
                    var countyValue = {
                        "EQ_parent.id": obj.newValue
                    };
                    $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
                    var countyId = viewModel.dialogcardcomp.app.getComp("countyIdBase");
                    viewModel.dialogcardcomp.viewModel.params.setValue("countyId", "");
                    viewModel.dialogcardcomp.viewModel.params.setValue("countyCode", "");
                    viewModel.dialogcardcomp.viewModel.params.setValue("countyName", "");
                    if (obj.oldValue != obj.newValue) {
                        countyId.setEnable(true);
                    } else {
                        countyId.setEnable(false);
                    }
                });



            }
        });
        return view;
    });

