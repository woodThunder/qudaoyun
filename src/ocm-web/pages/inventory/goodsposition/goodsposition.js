define(['text!./goodsposition.html', 'ocm_common', 'ocm_baseview', './meta.js', 'billcard', 'css!./goodsposition.css', ], function (tpl, common, baseview, model, billcard) {
    'use strict'
    var viewModel, app;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
            app = this.app;
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: "/stock/goods-positions",
            goodsSlotTree: new u.DataTable(model.options.metas.goodsSlotmeta),
            goodsSlotList: new u.DataTable(model.options.metas.goodsSlotmeta),
            goodsSlotGlobal: new u.DataTable(model.options.metas.goodsSlotmeta),
            queryParam: new u.DataTable(model.options.metas.queryparammeta),
            virtualRootId: "goodspositon",
            virtualRootName: "货位",
            overlayVisible: ko.observable(true),
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            gridOption: model.options.grids.grid1,
            treeSetting: {
                callback: {
                    onClick: treeClick
                },
                view: {
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom,
                    showLine: false,
                    multiSelect: true,
                    showIcon: showIconForWarehouse,
                    dblClickExpand: clickCheck
                }
            },
            statusSource: CONST.ENABLESTATUS,
        },
        rendertype: {
            operation4single: common.rendertype.operation4single
        },
        events: {
            confirm: function () {
                var pkOrgId = viewModel.goodsSlotGlobal.getValue("pkOrgId");
                var wareHouseId = viewModel.goodsSlotGlobal.getValue("wareHouseId");
                if (pkOrgId == null || wareHouseId == null || pkOrgId == "" || wareHouseId == "") {
                    toastr.warning("请先选择库存组织和仓库");
                    return
                }
                viewModel.loadleftTree();
                viewModel.overlayVisible(false);
            },
            reset: function () {
                viewModel.goodsSlotGlobal.removeAllRows();
                viewModel.goodsSlotGlobal.createEmptyRow();
                viewModel.virtualRootName = "货位";
                viewModel.loadleftTree();
                viewModel.goodsSlotList.removeAllRows();
                viewModel.overlayVisible(true);
            },
            // 加载单据类型树
            loadleftTree: function () {
                var pkOrgId = viewModel.goodsSlotGlobal.getValue("pkOrgId");
                var wareHouseId = viewModel.goodsSlotGlobal.getValue("wareHouseId");
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/getAll",
                    dataType: "json",
                    data: {
                        stockorg: pkOrgId,
                        warehouse: wareHouseId
                    },
                    success: function (data) {
                        viewModel.handleTreeData(data);
                        viewModel.goodsSlotTree.setSimpleData(data, {
                            unSelect: true
                        });
                        var treeObj = $.fn.zTree.getZTreeObj("goodsSlotTree");
                        viewModel.zTreeObj = treeObj;
                        treeObj.expandAll(true);
                    }
                })

            },
            loadrightList: function (treeNode) {
                var data = [];

                function handleNode(node) {
                    if (u.isArray(node.children) && node.children.length > 0) {
                        node.children.map(function (item) {
                            handleNode(item)
                        })
                    } else if(node.parentId){
                        data.push(nodeTrans(node));
                    }
                }

                function nodeTrans(data) {
                    var parentId = (data.parentId == viewModel.virtualRootId ? "" : data.parentId);
                    return {
                        code: data.code,
                        cubage: data.cubage,
                        fullName: data.fullName,
                        id: data.id,
                        isEnable: data.isEnable,
                        isFinal: data.isFinal,
                        name: data.originName,
                        operation: data.operation,
                        parentId: parentId,
                        pkOrgCode: data.pkOrgCode,
                        pkOrgId: data.pkOrgId,
                        pkOrgName: data.pkOrgName,
                        remark: data.remark,
                        stockInLevel: data.stockInLevel,
                        stockOutLevel: data.stockOutLevel,
                        storeKeeperCode: data.storeKeeperCode,
                        storeKeeperId: data.storeKeeperId,
                        storeKeeperName: data.storeKeeperName,
                        treePathCode: data.treePathCode,
                        wareHouseCode: data.wareHouseCode,
                        wareHouseId: data.wareHouseId,
                        wareHouseName: data.wareHouseName,
                    };
                }
                handleNode(treeNode);
                viewModel.goodsSlotList.setSimpleData(data, {
                    unSelect: true
                });
            },
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
            beforeEdit: function (index, node) {
                var title;
                viewModel.index = index;
                var pkOrgId = viewModel.goodsSlotGlobal.getValue("pkOrgId");
                var wareHouseId = viewModel.goodsSlotGlobal.getValue("wareHouseId");
                if (pkOrgId == null || wareHouseId == null || pkOrgId == "" || wareHouseId == "") {
                    toastr.warning("请先选择库存组织和仓库");
                    return
                }
                var currentData = {};
                if (index >= 0) {
                    //修改操作
                    title = "编辑";
                    var row = viewModel.goodsSlotTree.getRowByField("id", node.id);
                    if (row) {
                        viewModel.rowId = row.rowId;
                        currentData = row.getSimpleData();
                    }
                    if (currentData.parentId == viewModel.virtualRootId) {
                        currentData.parentId = "";
                    }
                } else {
                    title = "新增"
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                    if (node.id == viewModel.virtualRootId) {
                        currentData.parentId = "";
                    } else {
                        currentData.parentId = node.id;
                    }
                    currentData.pkOrgId = pkOrgId;
                    currentData.wareHouseId = wareHouseId;
                    currentData.code = node.code;
                }
                viewModel.dialogcardcomp.seteidtData(currentData);
                //显示模态框
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
                            viewModel.handleTreeData(data);
                            // if (index >= 0) {
                            //     //获取需要修改的行
                            //     currentRow = viewModel.goodsSlotTree.getRowByRowId(viewModel.rowId);
                            //     //将用户填写的数据更新到goodsSlotTree上
                            //     currentRow.setSimpleData(data);
                            // } else {
                            //     //添加数据
                            //     currentRow = viewModel.goodsSlotTree.addSimpleData(data);
                            // }
                            viewModel.loadleftTree();
                        }
                    })

                }
            },
            batchSave: function () {
                var postdata = viewModel.goodsSlotList.getSimpleData();
                var changeData = [];
                var nochangeData = []
                if (postdata && postdata.length > 0) {
                    for (var i = 0; i < postdata.length; i++) {
                        if (postdata[i].persistStatus != "nrm") {
                            changeData.push(postdata[i]);
                        } else {
                            nochangeData.push(postdata[i]);
                        }
                    }
                }
                if (changeData.length == 0) {
                    toastr.warning("没有需要保存的数据");
                    return
                }
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/batch-save",
                    type: "post",
                    data: JSON.stringify(changeData),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        viewModel.loadleftTree();
                        viewModel.goodsSlotList.removeAllRows();
                        viewModel.goodsSlotList.addSimpleData(data, "nrm", {
                            "unSelect": true
                        });
                        viewModel.goodsSlotList.addSimpleData(nochangeData, "nrm", {
                            "unSelect": true
                        });
                    }
                })
            },
            handleTreeData: function (data) {
                if (data) {
                    if (u.isArray(data)) {
                        data.map(function (item) {
                            if (item.parentId == "" || item.parentId == null) {
                                item.parentId = viewModel.virtualRootId
                            }
                            u.extend(item, {
                                fullName: item.code + " " + item.name,
                                originName: item.name
                            })
                        })
                        data.splice(0, 0, {
                            id: viewModel.virtualRootId,
                            parentId: "",
                            fullName: viewModel.virtualRootName
                        })
                    } else {
                        data.fullName = data.code + " " + data.name;
                        data.originName = data.name;

                        if (data.parentId == "" || data.parentId == null) {
                            data.parentId = viewModel.virtualRootId;
                        }
                    }
                }
            },
            //删除和批量删除
            del: function (node) {
                if (node.children && node.children.length > 0) {
                    toastr.warning("该项存在子节点,请先删除子节点");
                    return
                }
                var ids = [node.id];
                common.dialog.confirmDialog({
                    msg1: '确认删除该项？',
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
                                viewModel.zTreeObj.removeNode(node);
                                viewModel.goodsSlotList.removeAllRows();
                            }
                        });
                    }
                });
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (reindex) {
                    viewModel.goodsSlotTree.pageIndex(0);
                }
                viewModel.goodsSlotTree.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                queryData.size = viewModel.goodsSlotTree.pageSize();
                queryData.page = viewModel.goodsSlotTree.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.goodsSlotTree.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.goodsSlotTree.totalRow(data.totalElements);
                        viewModel.goodsSlotTree.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.goodsSlotTree.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.goodsSlotTree.pageSize(size);
                viewModel.search(true);
            },
            //启用
            enable: function () {
                var selectedRows = viewModel.goodsSlotTree.getSelectedRows();
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
                var selectedRows = viewModel.goodsSlotTree.getSelectedRows();
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
                                    selectedRows[i].setValue(viewModel.statusField, "0") :
                                    selectedRows[i].setValue("isEnable", "0");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            detail: function (obj) {
                var rowId = obj.rowObj.value["$_#_@_id"];
                var data = viewModel.goodsSlotTree.getRowByRowId(rowId).getSimpleData();
                var childData = data.goodsSlotExtends;
                viewModel.goodsSlotExtDetail.removeAllRows();
                var childrow = viewModel.goodsSlotExtDetail.createEmptyRow();
                childrow.setSimpleData(viewModel.transArr2obj(childData));
                return true;
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
                var listData = viewModel.goodsSlotTree; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            changeCondition: function (domid, oldcondition, newcondition) {
                $("#" + domid).parent().attr("data-refparam", JSON.stringify(
                    u.extend({},
                        oldcondition,
                        newcondition
                    )
                ));
            },
        },
        afterCreate: function () {
            viewModel.goodsSlotGlobal.createEmptyRow();
            viewModel.loadleftTree();
            viewModel.wareHousecomp = viewModel.app.getComp("wareHouseComp");
            viewModel.wareHousecomp.setEnable(false);
            viewModel.goodsSlotGlobal.on("pkOrgId.valuechange", function (obj) {
                var value = obj.newValue;
                // TODO:添加是否启用货位管理
                if (!obj.newValue) {
                    viewModel.wareHousecomp.setEnable(false);
                    viewModel.changeCondition("wareHouseId", {
                        "EQ_isEnable": "1","EQ_ifSlotManage" : "1"
                    }, {})
                } else {
                    viewModel.wareHousecomp.setEnable(true);
                    viewModel.changeCondition("wareHouseId", {
                        "EQ_isEnable": "1","EQ_ifSlotManage" : "1"
                    }, {
                        "EQ_inventoryOrg.id": value
                    })
                }

            });
            viewModel.goodsSlotGlobal.on("wareHouseId.valuechange", function (obj) {
                if (!obj.newValue) {
                    viewModel.virtualRootName = "货位";
                    return
                }
                var refer = $("#refContainerwareHouseId").data("uui.refer");
                var refValues = refer.values;
                if (refValues && refValues.length > 0) {
                    viewModel.virtualRootName = refValues[0].refname;
                }
            });
        }
    });

    function treeClick(event, treeId, treeNode) {
        viewModel.loadrightList(treeNode);
    }

    function addHoverDom(treeId, treeNode) {
        var aObj = $("#" + treeNode.tId + "_a");
        if ($("#diyBtn_" + treeNode.id).length > 0) return;
        var editStr;
        if (treeNode.parentId == "" || treeNode.parentId == null) {
            editStr = '<div id="diyBtn_' + treeNode.id + '" style="display:inline-block">' +
                '<a class="ui-circle-opr add"><i class="uifont icon-plus red"></i></a>' +
                '</div>'
        } else {
            editStr = '<div id="diyBtn_' + treeNode.id + '" style="display:inline-block">' +
                '<a class="ui-circle-opr add"><i class="uifont icon-plus red"></i></a>' +
                '<a class="ui-circle-opr edit"><i class="uifont icon-edit red"></i></a>' +
                '<a class="ui-circle-opr del"><i class="uifont icon-shanchu1 red"></i></a>' +
                '</div>'
        }
        aObj.append(editStr);
        var btn = $("#diyBtn_" + treeNode.id);
        if (btn) {
            btn.on("click", '.add', function () {
                viewModel.beforeEdit(-1, treeNode);
            });
            btn.on("click", '.edit', function () {
                viewModel.beforeEdit(0, treeNode);
            });
            btn.on("click", '.del', function () {
                viewModel.del(treeNode);
            });
        }

    };

    function removeHoverDom(treeId, treeNode) {
        $("#diyBtn_" + treeNode.id).remove();
    };

    function showIconForWarehouse(treeId, treeNode) {
        return treeNode.level == 0;
    }

    function clickCheck(treeId, treeNode) {
        return treeNode.level > 0;
    }
    return view;
});