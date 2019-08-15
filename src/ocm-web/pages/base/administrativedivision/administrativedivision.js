define([
    'text!./administrativedivision.html',
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
                baseurl: '/base/administrative-divisions/administrative',
                statusField: 'isEnable',
                // excelurl:'/person-excel',
                dialogWidth: '900px',
                countrySearchList: new u.DataTable(model.options.metas.AdministrativeDivisionmeta),
                simpleList: new u.DataTable(model.options.metas.AdministrativeDivisionmeta),
                simpleListTree: new u.DataTable(model.options.metas.AdministrativeDivisionmeta),
                buttonSource: model.options.buttons.button1,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                search2Source: model.options.searchs.search2,
                dialogcardcomp: {},
                hadIds: [],
                dialogcardSource: model.options.dialogs.dialog1,
                card1Source: model.options.cards.card1,
                // detailSource: model.options.details.detail,
                gridOption: model.options.grids.grid1,
                //用预判断树点击事件是否触发结束，防止点击后触发多次
                clickTreeOver:true,
                treeSetting: {
                    data: {
                        keep: {
                            parent: true
                        }
                    },
                    view: {
                        showLine: false,
                        multiSelect: true
                    },
                    callback: {
                        beforeClick: function (treeId, treeData) {
                            var refComp = $("#refContainerregionKey").data("uui.refer");
                            if(refComp && treeData) {
                                refComp.setValue([treeData]);
                            }
                            var allData = viewModel.simpleListTree.getSimpleData(),
                            pId = treeData.id;
                            //用预判断树点击事件是否触发结束，防止点击后触发多次
                            if(viewModel.clickTreeOver){
                                viewModel.clickTreeOver = false
                            }else{
                                return;
                            }
                            if ($.inArray(pId, viewModel.hadIds) == -1) {
                                $._ajax({
                                    type: "get",
                                    url: appCtx + '/base/administrative-divisions/find-sub-node?parentId=' + pId + '&includeSelf=' + 0 + '&recursive=' + 0,
                                    //url: viewModel.districturl + '?' + 'parentId=' + pId + '&includeSelf=' + 0 + '&recursive=' + 0,
                                    dataType: "json",
                                    success: function (data) {
                                        viewModel.clickTreeOver = true
                                        for (var i = 0; i < data.length; i++) {
                                            if (data[i].isLeaf == 0) {
                                                data[i].isParent = 1;
                                            }
                                        }
                                        viewModel.hadIds.push(pId);
                                        viewModel.simpleListTree.addSimpleData(data);
                                    }
                                })
                            }
                            $('.ui-search-btn>.ui-btn-primary').trigger('click');
                            if (!$('.ui-search-more').hasClass('expand')) {
                                $('.ui-search-more').trigger('click');
                            }
                            viewModel.searchcomp.viewModel.params.setValue("parent--id", pId);
                            viewModel.simpleList.pageIndex(0);
                            viewModel.search();
                        },
                        beforeExpand: function (treeId, treeData) {
                            var allData = viewModel.simpleListTree.getSimpleData(),
                                pId = treeData.id;
                            if ($.inArray(pId, viewModel.hadIds) == -1) {
                                $._ajax({
                                    type: "get",
                                    url: appCtx + '/base/administrative-divisions/find-sub-node?parentId=' + pId + '&includeSelf=' + 0 + '&recursive=' + 0,
                                    //url: viewModel.districturl + '?' + 'parentId=' + pId + '&includeSelf=' + 0 + '&recursive=' + 0,
                                    dataType: "json",
                                    success: function (data) {
                                        for (var i = 0; i < data.length; i++) {
                                            if (data[i].isLeaf == 0) {
                                                data[i].isParent = 1;
                                            }
                                        }
                                        viewModel.hadIds.push(pId);
                                        viewModel.simpleListTree.addSimpleData(data);
                                    }
                                })
                            }
                            $('.ui-search-btn>.ui-btn-primary').trigger('click');
                            if (!$('.ui-search-more').hasClass('expand')) {
                                $('.ui-search-more').trigger('click');
                            }
                            viewModel.searchcomp.viewModel.params.setValue("parent--id", pId);
                            viewModel.simpleList.pageIndex(0);
                            viewModel.search();
                        },
                    }
                },
                countryId: ""
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
                        viewModel.dialogcardcomp.cleareidt();
                        var data = viewModel.dialogcardcomp.geteidtData();
                        if (viewModel.countryId) {
                            data.countryId = viewModel.countryId;
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
                        var parentId = postdata.parentId;
                        if (!parentId) {
                            postdata.areaLevel = 1;
                        } else {
                            var list = viewModel.simpleList.getSimpleData();
                            if (list.length > 0) {
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].id == parentId) {
                                        var parentAreaLevel = list[i].areaLevel;
                                        if (parentAreaLevel && parentAreaLevel != 0) {
                                            postdata.areaLevel = parseInt(parentAreaLevel) + 1;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
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
                                if (type == 'post') {
                                    if (data && data.parentId) {
                                        var filter = function (node) {
                                            if (node.name) {
                                                console.log(node.parentId + '-------' + data.parentId);
                                                console.log(node);
                                                return node.parentId == data.parentId;
                                            }
                                            return false;
                                        }
                                        // 过滤出节点
                                        var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
                                        console.log(nodes);
                                        if (nodes && nodes.length > 0) {
                                            viewModel.simpleListTree.addSimpleData(data);
                                        }
                                    } else if (data && !data.parentId) {
                                        viewModel.simpleListTree.addSimpleData(data);
                                    }
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
                                    // data: "ids=" + ids.join(","),
                                    data: {
                                        ids: ids.join(",")
                                    },
                                    success: function (data) {
                                        var filter = function (node) {
                                            if (node.name) {
                                                return ids.indexOf(node.parentId) > -1;
                                            }
                                            return false;
                                        }
                                        // 过滤出节点
                                        var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
                                        if (nodes && nodes.length > 0) {
                                            viewModel.simpleListTree.removeRows(rows);
                                            viewModel.simpleList.removeRows(rows);
                                        }
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
                    if (!viewModel.isAfterCreate) {
                        return
                    }
                    if (viewModel.countryId == undefined || viewModel.countryId == "") {
                        toastr.warning("请先选择国家");
                        return;
                    }
                    if (reindex) {
                        viewModel.simpleList.pageIndex(0);
                    }
                    viewModel.simpleList.removeAllRows();
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    queryData["search_EQ_country.id"] = viewModel.countryId;
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
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                searchTree: function () {
                    if (viewModel.countryId == undefined || viewModel.countryId == "") {
                        return
                    }
                    $._ajax({
                        type: "get",
                        url: appCtx + '/base/administrative-divisions/find-provinces?countryId=' + viewModel.countryId,
                        dataType: "json",
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].isLeaf == 0) {
                                    data[i].isParent = 1;
                                }
                            }
                            viewModel.simpleListTree.removeAllRows();
                            viewModel.simpleListTree.setSimpleData(data, {
                                unSelect: true
                            });
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
                            if (node.name) {
                                return node.name.indexOf(searchKey) > -1;
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
                // clickTree: function () {
                //     //获取到被点击的树节点行号
                //     var num = viewModel.simpleListTree.selectedIndices()[0]
                //     if (num == null) {
                //         return
                //     }
                //     //被点击的树节点
                //     var treeData = viewModel.simpleListTree.getSimpleData()[num];
                //     //被点击的树节点id
                //     var treeId = treeData.id;
                //     viewModel.treeId = treeId;
                //     // //树中数据源（与列表数据相同）
                //     // var simpleTreeData = viewModel.simpleListTree.getSimpleData();
                //     // //用于临时存放列表数据
                //     // var tempSimpleList = [];
                //     // //遍历树种数据，找出本级及下级放入列表
                //     // for (var i = 0; i < simpleTreeData.length; i++) {
                //     //     //本级
                //     //     if (simpleTreeData[i].id == treeId) {
                //     //         tempSimpleList.push(simpleTreeData[i]);
                //     //         continue;
                //     //     }
                //     //     //下级
                //     //     if (simpleTreeData[i].parentId == treeId) {
                //     //         tempSimpleList.push(simpleTreeData[i])
                //     //     }
                //     // }
                //     // //将筛选后的数据放回列表
                //     // viewModel.simpleList.setSimpleData(tempSimpleList, {
                //     //     unSelect: true
                //     // });
                //     var queryData = {};
                //     queryData["search_EQ_1~id"] = treeId
                //     queryData["search_EQ_1~parent.id"] = treeId
                //
                //     queryData.size = 1000;
                //     queryData.page = 0;
                //     $._ajax({
                //         type: "get",
                //         url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                //         dataType: "json",
                //         data: queryData,
                //         success: function (data) {
                //             // data.content.push({id:null,fullName:"行政区划",parentId:0})
                //             viewModel.simpleList.setSimpleData(data.content, {
                //                 unSelect: true
                //             });
                //             viewModel.simpleList.totalRow(data.totalElements);
                //             viewModel.simpleList.totalPages(data.totalPages);
                //         }
                //     })

                // },

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

                //viewModel.search();
                // viewModel.searchTree();

                viewModel.isAfterCreate = true

                // 初始化必填项填写
                var currentRow = viewModel.countrySearchList.createEmptyRow();
                viewModel.countrySearchList.setRowFocus(currentRow)
                viewModel.countrySearchList.on("countryId.valuechange", function (
                    obj
                ) {
                    viewModel.countryId = obj.newValue;
                    viewModel.search()
                    viewModel.searchTree()
                });

                viewModel.dialogcardcomp.viewModel.params.on("name.valuechange", function (obj) {
                    var name = viewModel.dialogcardcomp.app.getComp("name").getValue()
                    var refValues = $("#refContainerparentId").data("uui.refer").values;
                    var fullName = "";
                    if (refValues) {
                        fullName = refValues[0].parentFullName + name ? name : ""
                    }
                    viewModel.dialogcardcomp.viewModel.params.setValue("fullName", fullName);
                });

                viewModel.dialogcardcomp.viewModel.params.on("parentId.valuechange", function (obj) {
                    var name = viewModel.dialogcardcomp.app.getComp("name").getValue()
                    var refValues = $("#refContainerparentId").data("uui.refer").values;
                    var fullName = "";
                    if (refValues) {
                        fullName = refValues[0].fullName + name ? name : ""
                    }
                    viewModel.dialogcardcomp.viewModel.params.setValue("fullName", fullName);
                });
            }

        });
        return view;
    });
