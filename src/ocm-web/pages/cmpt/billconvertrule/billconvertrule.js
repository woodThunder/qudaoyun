define([
    'text!./billconvertrule.html',
    'ocm_common',
    'ocm_baseview',
    './meta.js'
], function (tpl, common, baseview, model) {
    'use strict'
    var viewModel;
    var view = baseview.extend({
        tpl: tpl,
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        baseData: {
            baseurl: '/cmpt/bill-convert-rules',
            spliturl: '/cmpt/bill-split-rules',
            mapurl: '/cmpt/bill-map-rules',
            statusField: 'isEnable',
            excelurl: '/person-excel',
            dialogWidth: '900px',
            simpleList: new u.DataTable(model.options.metas.billconvertrulemeta),
            fieldMappingList: new u.DataTable(model.options.metas.billfieldmaprulemeta),
            splitRuleList: new u.DataTable(model.options.metas.billsplitrulemeta),
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialog1cardSource: model.options.dialogs.dialog1,
            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2,
            grid3Option: model.options.grids.grid3,
            goBillPanel: common.bill.goBillPanel,

            billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),

            billFieldMapTypeSource: ko.observableArray([]),
        },
        rendertype: u.extend(common.rendertype, {
            //是否冻结
            billFieldMapTypeRender: function (obj) {
                var stateValue = viewModel.fieldMappingList.getRow(obj.rowIndex).getValue(
                    "billFieldMapTypeCode"
                );
                var stateName;
                stateValue == "01" ? (stateName = "映射") : (stateName = "赋值");
                obj.element.innerHTML = stateName;
            },

            booleanRender: function (obj) {
                var grid = obj.gridObj;
                var datatable = grid.dataTable;
                var rowId = obj.row.value['$_#_@_id'];
                var row = datatable.getRowByRowId(rowId);
                var checkStr = '',
                    disableStr = '';

                if (obj.value == 'Y' || obj.value == 'true' || obj.value == '1' || obj.value == 1) {
                    checkStr = ' is-checked';
                }
                //设置如果是不可编辑，则按钮置灰
                if (obj.row.value.isReadonly) {
                    disableStr = ' is-disabled';
                }
                var htmlStr = '<label class="u-checkbox is-upgraded ' + checkStr + disableStr + '">' +
                    '<input type="checkbox" class="u-checkbox-input">' +
                    '<span class="u-checkbox-label"></span>' +
                    '<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span>' +
                    '</label>'

                obj.element.innerHTML = htmlStr;
                //如果不是不可编辑，则加入点击逻辑
                if (!obj.row.value.isReadonly) {
                    $(obj.element).find('input').on('click', function (e) {
                        $(this).parent().toggleClass('is-checked');
                        if (!obj.gridObj.options.editable) {
                            stopEvent(e);
                            return false;
                        }
                        if ($(this).parent().hasClass('is-checked')) {
                            this.checked = true;
                        } else {
                            this.checked = false;
                        }
                        var value = this.checked ? "1" : "0";
                        var column = obj.gridCompColumn
                        var field = column.options.field
                        row.setValue(field, value);
                    })
                }
            },

            // 单表操作
            operation: function (obj) {
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
                var mappingfun =
                    "data-bind=click:fieldMappingOne.bind($data," +
                    dataTableRowId +
                    ")";
                var splitfun =
                    "data-bind=click:splitRuleOne.bind($data," +
                    dataTableRowId +
                    ")";

                obj.element.innerHTML =
                    '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    mappingfun +
                    ' title="字段映射">字段映射</a>' +
                    "</span>    " +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    splitfun +
                    ' title="分单规则">分单规则</a>' +
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
            //子表增行
            addRow: function (dataTable) {
                var row = viewModel[dataTable].createEmptyRow();
                row.setSimpleData({billFieldMapTypeName: "映射", billFieldMapTypeCode: "01", status: "new"});
                viewModel.currentFlag = 0;
            },
            //子表 删除和批量删除
            delChild: function (dataTable) {
                var rows = viewModel[dataTable].getSelectedRows();
                viewModel[dataTable].removeRows(rows);
            },
            //跳转单据详情页
            // goDetailPanel: common.bill.goDetailPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel,
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)

            //
            fieldMappingOne: function (rowId) {
                var row = viewModel.simpleList.getRowByRowId(rowId);
                var data = row.getSimpleData();
                viewModel.fieldMappingList.setMeta("srcBillFieldCode", "refparam",
                    '{"billTypeId":"' + data.srcBillTypeId + '"}')
                viewModel.fieldMappingList.setMeta("destBillFieldCode", "refparam",
                    '{"billTypeId":"' + data.destBillTypeId + '"}')

                $("#map-rule-src")[0].innerHTML = data.srcBillTypeName
                $("#map-rule-dest")[0].innerHTML = data.destBillTypeName
                viewModel.billConvertRuleId = data.id;
                //先清空映射规则id
                viewModel.splitMapId = undefined;
                $._ajax({
                    url: appCtx + viewModel.mapurl + "/get-by-bill-convert-rule-id/" + data.id,
                    type: "get",
                    data: {
                        billConvertRuleId: data.id,
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (arr) {
                        if (arr && arr.length) {
                            viewModel.fieldMappingList.setSimpleData(arr, {unSelect: true});
                            viewModel.splitMapId = arr[0].id;
                            viewModel.gridSetIsEneable();
                        } else {
                            $._ajax({
                                url: appCtx + viewModel.mapurl + "/get-default-list",
                                type: "get",
                                data: {
                                    srcBillTypeId: data.srcBillTypeId,
                                    destBillTypeId: data.destBillTypeId
                                },
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    viewModel.fieldMappingList.setSimpleData(data, {unSelect: true});
                                    viewModel.gridSetIsEneable();
                                }
                            })
                        }
                    }
                })

                if (!viewModel.fieldMappingDialog) {
                    viewModel.fieldMappingDialog = u.dialog({
                        id: 'dialog_fieldMapping',
                        content: "#dialog_fieldMapping",
                        hasCloseMenu: true,
                        width: "600px"
                    });
                    var closefunc = function () {
                        viewModel.splitRuleList.removeAllRows();
                        viewModel.fieldMappingDialog.close();
                    }
                    var cancelButton = $("#dialog_fieldMapping .J-cancel");
                    var closeButton = $("#dialog_fieldMapping .u-msg-close");
                    cancelButton.off().on('click', closefunc);
                    closeButton.off().on('click', closefunc);
                    viewModel.fieldMappingDialog.show();
                } else {
                    viewModel.fieldMappingDialog.show();
                }
            },

            fieldMapping: function () {
                var rows = viewModel.simpleList.getSelectedRows();
                if (rows.length != 1) {
                    toastr.warning("请选择一条数据");
                    return;
                }
                viewModel.fieldMappingOne(rows[0].rowId);
            },

            confirmFieldMapping: function () {
                var postdata = viewModel.fieldMappingList.getSimpleData();
                postdata.forEach(function (item, index, array) {
                    item.billConvertRuleId = viewModel.billConvertRuleId;
                    //如果存在分单规则id，则为编辑
                    if (item.status == "new") {
                        item.persistStatus = "new";
                        delete item.status
                    }
                });
                $._ajax({
                    url: appCtx + viewModel.mapurl + "/batch-save",
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    success: function () {
                        viewModel.fieldMappingDialog.close()
                    }
                })
            },


            splitRuleOne: function (rowId) {
                var row = viewModel.simpleList.getRowByRowId(rowId);
                var data = row.getSimpleData();
                viewModel.billConvertRuleId = data.id;

                $("#split-rule-src")[0].innerHTML = data.srcBillTypeName
                $("#split-rule-dest")[0].innerHTML = data.destBillTypeName
                //先清空分单规则id
                viewModel.splitRuleId = undefined;
                $._ajax({
                    url: appCtx + viewModel.spliturl + "/get-by-bill-convert-rule-id/" + data.id,
                    type: "get",
                    data: {
                        billConvertRuleId: data.id,
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (arr) {
                        if (arr && arr.length) {
                            viewModel.splitRuleList.setSimpleData(arr, {unSelect: true});
                            viewModel.splitRuleId = arr[0].id;
                            viewModel.gridSetIsEneable();
                        } else {
                            $._ajax({
                                url: appCtx + viewModel.spliturl + "/get-default-list",
                                type: "get",
                                data: {
                                    srcBillTypeId: data.srcBillTypeId,
                                    destBillTypeId: data.destBillTypeId
                                },
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    viewModel.splitRuleList.setSimpleData(data, {unSelect: true});
                                    viewModel.gridSetIsEneable();
                                }
                            })
                        }
                    }
                })


                if (!viewModel.splitRuleDialog) {
                    viewModel.splitRuleDialog = u.dialog({
                        id: 'dialog_splitRule',
                        content: "#dialog_splitRule",
                        hasCloseMenu: true,
                        width: "600px"
                    });
                    var closefunc = function () {
                        viewModel.splitRuleList.removeAllRows();
                        viewModel.splitRuleDialog.close();
                    }
                    var cancelButton = $("#dialog_splitRule .J-cancel");
                    var closeButton = $("#dialog_splitRule .u-msg-close");
                    cancelButton.off().on('click', closefunc);
                    closeButton.off().on('click', closefunc);
                    viewModel.splitRuleDialog.show();
                } else {
                    viewModel.splitRuleDialog.show();
                }
            },

            gridSetIsEneable: function () {
                var grid = viewModel.app.getComp("grid_splitRule").grid;
                var isValidCol = grid.getColumnByField("isValid");


                // setTimeout(() => {
                //     $("#splitRule").find(".u-checkbox");
                //     debugger
                // }, 0);
            },


            splitRule: function () {
                var rows = viewModel.simpleList.getSelectedRows();
                if (rows.length != 1) {
                    toastr.warning("请选择一条数据");
                    return;
                }
                viewModel.splitRuleOne(rows[0].rowId);
            },


            confirmSplitRule: function () {
                var postdata = viewModel.splitRuleList.getSimpleData();
                postdata.forEach(function (item, index, array) {
                    item.billConvertRuleId = viewModel.billConvertRuleId;
                    //如果存在分单规则id，则为编辑
                    if (viewModel.splitRuleId) {
                        item.persistStatus = "upd";
                    } else {
                        item.persistStatus = "new";
                        delete item.id;
                    }
                });
                $._ajax({
                    url: appCtx + viewModel.spliturl + "/batch-save",
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.splitRuleDialog.close()
                    }
                })
            },

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
                    } else {
                        postdata.isPreset = 0
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
                            currentRow.setSimpleData(data, {unSelect: true});
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
                // for()
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        // if ((!rows[i].getValue("srcTranTypeId") || rows[i].getValue("srcTranTypeId") == null || rows[i].getValue("srcTranTypeId") == "")
                        //     && (!rows[i].getValue("destTranTypeId") || rows[i].getValue("destTranTypeId") == null || rows[i].getValue("destTranTypeId") == "")) {
                        //     toastr.warning("预制内容不允许删除");
                        //     return;
                        // }
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
                                    // viewModel.simpleList.removeRows(rows);
                                    viewModel.search()
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
                    url: appCtx + viewModel.baseurl,
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
            // detail: function () {
            //     //确保grid先将行设置为focus状态
            //     setTimeout(function () {
            //         viewModel.goDetailPanel();
            //     }, 0);
            // },
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


            $._ajax({
                type: "get",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                data: {
                    cust_doc_code_batch: "FIELD_MAP_TYPE"
                },
                success: function (data) {
                    var newarray;
                    newarray = common.dataconvert.toMap(data["FIELD_MAP_TYPE"], "name", "code");
                    viewModel.billFieldMapTypeSource(newarray);
                }
            });

            viewModel.dialogcardcomp.viewModel.params.on("srcBillTypeId.valuechange", function (obj) {
                var tranTypeValue = {
                    "EQ_billTypeId": obj.newValue,
                };
                $("#srcTranTypeIdinfo").attr("data-refparam", JSON.stringify(tranTypeValue));

                var tranTypeId = viewModel.dialogcardcomp.app.getComp("srcTranTypeIdBase");
                if (obj.newValue && obj.newValue != null && obj.newValue != "") {
                    tranTypeId.setEnable(true);
                } else {
                    tranTypeId.setEnable(false);
                }
                tranTypeId.setValue("");
            });
            viewModel.dialogcardcomp.viewModel.params.on("destBillTypeId.valuechange", function (obj) {
                var tranTypeValue = {
                    "EQ_billTypeId": obj.newValue,
                };
                $("#destTranTypeIdinfo").attr("data-refparam", JSON.stringify(tranTypeValue));
                var tranTypeId = viewModel.dialogcardcomp.app.getComp("destTranTypeIdBase");
                if (obj.newValue && obj.newValue != null && obj.newValue != "") {
                    tranTypeId.setEnable(true);
                } else {
                    tranTypeId.setEnable(false);
                }
                tranTypeId.setValue("");
            });


            viewModel.fieldMappingList.on("billFieldMapTypeCode.valuechange", function (obj) {
                var grid = viewModel.app.getComp("grid_fieldMapping").grid;
                if (obj.newValue == "01") {
                    viewModel.fieldMappingList.setValue("destAssignedValue", "");
                } else if (obj.newValue == "02") {
                    obj.rowObj.setValue("srcBillFieldCode", "");
                    obj.rowObj.setValue("srcBillFieldName", "");
                    obj.rowObj.data.srcBillFieldCode.meta.display = "";
                    grid.repaintGridDivs();
                }

            });
            viewModel.fieldMappingList.on("srcBillFieldCode.valuechange", function (obj) {
                var grid = viewModel.app.getComp("grid_fieldMapping").grid;
                if (obj.rowObj.data.billFieldMapTypeCode.value == "02") {
                    viewModel.fieldMappingList.setValue("srcBillFieldCode", "");
                    viewModel.fieldMappingList.setValue("srcBillFieldName", "");
                    obj.rowObj.data.srcBillFieldCode.meta.display = "";
                    // grid.repaintGridDivs();
                }
            });
            viewModel.fieldMappingList.on("destAssignedValue.valuechange", function (obj) {
                if (obj.rowObj.data.billFieldMapTypeCode.value == "01") {
                    viewModel.fieldMappingList.setValue("destAssignedValue", "");
                }
            });
        }
    });

    return view;
});





