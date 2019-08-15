define([
    "text!./marketarea.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "searchbox",
], function (
    tpl,
    common, baseview, model, searchbox) {
        "use strict";
        var viewModel;
        var view = baseview.extend({
            tpl: tpl,

            setTemplate: function (el, tpl) {
                el.innerHTML = tpl;
                viewModel = this.viewModel;
            },
            model: model,
            baseData: {
                baseurl: "/market-areas",
                itemurl: "/market-area-item",
                countryurl: "/base/countrys",
                statusField: "isEnable",
                // excelurl:'/person-excel',
                dialogWidth: "500px",
                simpleList: new u.DataTable(model.options.metas.marketareameta),
                simpleListTree: new u.DataTable(model.options.metas.marketareatreemeta),
                childList: new u.DataTable(model.options.metas.marketareaitemmeta),
                button1Source: model.options.buttons.button1,
                button2Source: model.options.buttons.button2,
                button3Source: model.options.buttons.button3,
                button4Source: model.options.buttons.button4,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                search2Source: model.options.searchs.search2,
                dialogcardcomp: {},
                dialogcardSource: model.options.dialogs.dialog1,
                card1Source: model.options.cards.card1,
                detailSource: model.options.details.detail1,
                grid1Option: model.options.grids.grid1,
                grid2Option: model.options.grids.grid2,
                grid3Option: model.options.grids.grid3,
                // goBillPanel: common.bill.goBillPanel,
                treeSetting: {
                    view: {
                        showLine: false,
                        multiSelect: true
                    },
                    callback: {
                        beforeClick: function (treeId, treeData) {
                            var refComp = $("#refContainermarketKey").data("uui.refer");
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
                billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT)
            },
            rendertype: u.extend(common.rendertype, {
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
                //跳转单据页
                goBillPanel: function () {
                    // $(".ui-list-panel").hide();
                    $(".ui-treegrid-panel").hide();
                    $(".ui-panel").hide();
                    $(".ui-bill-panel").show();
                    $(".ui-bill-panel").animateCss("fadeIn");
                },
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
                //点击取消 单据页
                cancelHandle: function () {
                    viewModel.search();
                    viewModel.searchTree();
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
                            viewModel.searchTree();
                            viewModel.retListPanel();
                        }
                    });
                },

                //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
                beforeEdit: function (index, rowId) {
                    viewModel.goBillPanel();
                    $("#marketareaBase").show();
                    $("#marketareaBase_show").hide();
                    //设置tab显示基本信息
                    $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab")
                        .removeClass("is-active");
                    $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel")
                        .removeClass("is-active");

                    var title;
                    viewModel.index = index;
                    if (u.isNumber(index)) {
                        //修改操作
                        title = "编辑";
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                        var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                        $._ajax({
                            type: "get",
                            url: appCtx + viewModel.itemurl + "/find-by-area",
                            dataType: "json",
                            data:{
                                id:currentData.id
                            },
                            success: function (data) {
                                viewModel.childList.setSimpleData(data, {
                                    unSelect: true
                                });
                            }
                        });
                        viewModel.rowId = rowId;
                    } else {
                        title = "新增";
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                        var curRow = viewModel.simpleList.createEmptyRow();
                        // curRow.setSimpleData(copyRow.getSimpleData());
                        curRow.setSimpleData({ parentId: viewModel.treeId });
                        viewModel.simpleList.setRowFocus(curRow);
                        viewModel.childList.setSimpleData([]);
                    }
                },
                //子表增行
                addRow: function (dataTable) {
                    var row = viewModel[dataTable].createEmptyRow();
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.countryurl + "/get-default",
                        dataType: "json",
                        success: function (data) {
                            var rowData = { countryId: data.id, countryCode: data.code, countryName: data.name }
                            row.setSimpleData(rowData);
                        }
                    });


                    viewModel.currentFlag = 0;
                },
                //子表 删除和批量删除
                delChild: function (dataTable) {
                    var rows = viewModel[dataTable].getSelectedRows();
                    viewModel[dataTable].removeRows(rows, { forceDel: true});
                },
                validate: function (element) {
                    var result = viewModel.app.compsValidateMultiParam({
                        element: element,
                        showMsg: true
                    });
                    return result;
                },
                saveHandle: function () {
                    var baseItemInfo = $("#baseItemInfo")[0];
                    var basePass = viewModel.validate(baseItemInfo);
                    var baseItemInfo = $("#baseItemInfo")[0];
                    var baseItemPass = viewModel.validate(baseItemInfo);
                    if (basePass.passed) {
                        if (baseItemInfo.passed == undefined || baseItemInfo.passed == true) {
                            viewModel.edit();
                        }
                    }
                },
                //将操作后的数据进行保存
                edit: function () {
                    var index = viewModel.index;
                    var currentRow, type = "post";
                    var postdata = viewModel.simpleList.getFocusRow().getSimpleData();
                    var childList = viewModel.childList.getSimpleData();
                    for(var i=0;i<childList.length;i++){
                        // childList[i].marketAreaId = postdata.id;
                        if(childList[i].marketAreaId == undefined&&childList[i].persistStatus!="fdel"){
                            childList[i].persistStatus = "new";
                        }
                    }
                    for(var i=0;i<childList.length;i++)
                    postdata.marketAreaItems = childList;
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
                            if (index >= 0) {
                                //获取需要修改的行
                                currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
                                //将用户填写的数据更新到simpleList上
                            } else {
                                //添加数据
                                currentRow = viewModel.simpleList.createEmptyRow();
                            }
                            currentRow.setSimpleData(data);
                            viewModel.search();
                            viewModel.searchTree();
                            viewModel.retListPanel();
                            toastr.info("保存成功！");
                        }
                    });


                },
                //删除和批量删除
                del: function (data, rowId) {
                    if (typeof (data) == "number") {
                        viewModel.simpleList.setRowSelectbyRowId(rowId);
                    }
                    var ids = [];
                    var rows = viewModel.simpleList.getSelectedRows();
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
                    });
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                searchTree: function () {
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    queryData.size = 10000;
                    queryData.page = 0;
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
                    });
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
                    var num = viewModel.simpleListTree.selectedIndices()[0];
                    if (num == null) {
                        return;
                    }
                    //被点击的树节点
                    var treeData = viewModel.simpleListTree.getSimpleData()[num];
                    $('.ui-search-btn>.ui-btn-primary').trigger('click');
                    if(!$('.ui-search-more').hasClass('expand')) {
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
                        });
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
                        });
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
                        });
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
                detail: function (index, roleId) {
                    //确保grid先将行设置为focus状态
                    setTimeout(function () {
                      var curRow = viewModel.simpleList.getCurrentRow();
                      $._ajax({
                        type: "get",
                        url: appCtx + viewModel.itemurl + "/find-by-area",
                        dataType: "json",
                        data:{
                            id:curRow.getValue("id")
                        },
                        success: function (data) {
                            viewModel.childList.setSimpleData(data);
                        }
                      });
                      viewModel.goDetailPanel();
                    }, 0);
                },
                //导入
                importHandle: function () {
                    var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                    var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
                    var ele = $("#importFiel")[0]; //挂载元素
                    common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
                },
                //导出
                exportHandle: function () {
                    var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                    var templateUrl = viewModel.excelurl + "/downloadExcelTemplate"; //导出模板地址参数
                    var excelDataUrl = viewModel.excelurl + "/excelDataExport"; //导出数据地址参数
                    var listData = viewModel.simpleList; //需要导出表格的dataTable
                    var ele = $("#exportFiel")[0]; //挂载元素
                    common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
                }
            },
            afterCreate: function () {
                viewModel.search();
                viewModel.searchTree();


                viewModel.simpleList.on("organizationId.valuechange", function (obj) {
                    var townValue = {
                        "EQ_isEnable": "1", "EQ_dr": "0",
                        "EQ_personPosts.organization.id": obj.newValue
                    };
                    $("#principalIdinfo").attr("data-refparam", JSON.stringify(townValue));
                })

                viewModel.childList.on("countryId.valuechange", function (obj) {
                    var countryId = obj.newValue;
                    viewModel.childList.meta.provinceId.refparam =
                        "{\"EQ_areaLevel\":\"1\",\"EQ_country.id\":\"" + countryId + "\" ,\"EQ_isEnable\":\"1\"}";
                    if (obj.newValue != obj.oldValue) {
                        viewModel.childList.setValue("provinceId", "");
                        viewModel.childList.setValue("provinceName", "");
                        viewModel.childList.setValue("cityId", "");
                        viewModel.childList.setValue("cityName", "");
                        viewModel.childList.setValue("countyId", "");
                        viewModel.childList.setValue("countyName", "");
                    }
                });

                //收货地址   省、城市、区县、街道四级联动
                viewModel.childList.on("provinceId.valuechange", function (obj) {
                    var provinceId = obj.newValue;
                    viewModel.childList.meta.cityId.refparam =
                        "{\"EQ_areaLevel\":\"2\",\"EQ_parent.id\":\"" + provinceId + "\" ,\"EQ_isEnable\":\"1\"  }";
                    if (obj.newValue != obj.oldValue) {
                        viewModel.childList.setValue("cityId", "");
                        viewModel.childList.setValue("cityName", "");
                        viewModel.childList.setValue("countyId", "");
                        viewModel.childList.setValue("countyName", "");
                    }
                });
                viewModel.childList.on("cityId.valuechange", function (obj) {
                    var cityId = obj.newValue;
                    viewModel.childList.meta.countyId.refparam =
                        "{\"EQ_areaLevel\":\"3\",\"EQ_parent.id\":\"" + cityId + "\" ,\"EQ_isEnable\":\"1\"}";
                    if (obj.newValue != obj.oldValue) {
                        viewModel.childList.setValue("countyId", "");
                        viewModel.childList.setValue("countyName", "");
                    }
                });
                // viewModel.childList.on("countyId.valuechange", function (obj) {
                //     var countyId = obj.newValue;
                //     viewModel.childList.meta.townId.refparam =
                //         "{\"EQ_areaLevel\":\"4\",\"EQ_parent.id\":\"" + countyId + "\"}";
                //     if (obj.newValue != obj.oldValue) {
                //         viewModel.childList.setValue("townId", "");
                //         viewModel.childList.setValue("townName", "");
                //     }
                // });
            }
        });
        return view;
    });
