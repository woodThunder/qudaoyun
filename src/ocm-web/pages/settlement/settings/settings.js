define(['ocm_simpleview', './meta.js', 'ocm_common'], function(simpleview, model, common) {
    'use strict'
    var viewModel, appCtx = "/occ-settlement";
    var view = simpleview.extend({
        beforeCreate: function() {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/settlement/settingss',
            // excelurl: '/potypes-Excel',单表档案支持导入导出时需配置此属性
            // dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
            // statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
            simpleList: new u.DataTable(model.options.metas.settingsMeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            detailSource: model.options.details.detail,
            gridOption: model.options.grids.grid1,
            enableFmt: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isEnable")();
                if (status == 0) {
                    return "未启用";
                } else if (status == 1) {
                    return "已启用";
                }
                return "已停用";
            }),
            startDateFmt: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("diesAQuo")();
                switch (status) {
                    case 1:
                        return '订单审批日'
                    case 2:
                        return '出库签字日'
                }
            }),
            calcTypeFmt: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("calcType")();
                switch (status) {
                    case 1:
                        return '按天数'
                    case 2:
                        return '按固定日'
                }
            }),
            orderTypeSrc: [],
            // diesAQuoSrc: [{
            //     value: 1,
            //     name: '订单审批日'
            // }, {
            //     value: 2,
            //     name: '出库签字日'
            // }],
            // calcTypeSrc: [{
            //     value: 1,
            //     name: '按天数'
            // }, {
            //     value: 2,
            //     name: '按固定日'
            // }],
            operationSetting: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"],
                    curRow = viewModel.simpleList.getRow(obj.rowIndex);
                var isEnable = curRow.getValue('isEnable');
                var delfun =
                    "data-bind=click:delNew.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var editfun =
                    "data-bind=click:showEditBillPanel.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                if (isEnable != '1') {
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
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
                } else {
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        delfun +
                        ' title="删除">删除</a>' +
                        "</span></div>";
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            //进入修改单据页
            showEditBillPanel: function(index, rowId) {
                viewModel.simpleList.setRowFocus(index);
                var id = viewModel.simpleList.getValue("id");
                if (viewModel.simpleList.getValue("isEnable") != '0') {
                    toastr.warning('只有未启用状态的数据可编辑！')
                    return;
                }
                viewModel.index = index;
                // viewModel.simpleList.originEditData = viewModel.simpleList.getFocusRow().getSimpleData();
                var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                viewModel.rowId = rowId;
                viewModel.dialogcardcomp.seteidtData(currentData);
                //显示模态框
                viewModel.dialogWidth ?
                    viewModel.dialogcardcomp.show("编辑", viewModel.dialogWidth, viewModel.edit) :
                    viewModel.dialogcardcomp.show("编辑", "500px", viewModel.edit);
            },
            //删除和批量删除
            delNew: function(data, rowId) {
                if (typeof(data) == 'number') {
                    viewModel.simpleList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var rows = viewModel.simpleList.getSelectedRows();
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].getValue('isEnable') == '1' || rows[i].getValue('isEnable') == '2') {
                            continue;
                        }
                        ids.push(rows[i].getValue("id"));
                    }
                    if (!ids.length) {
                        toastr.warning('只有未启用状态的账期可以删除!');
                        return;
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
        },
        rendertype: $.extend({}, common.rendertype, {
            //起算日
            diesAQuoSrc: function(obj) {
                var val = obj.value;
                if (val == 1) {
                    obj.element.innerHTML = '订单审批日';
                } else if (val == 2) {
                    obj.element.innerHTML = '出库签字日';
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            calcTypeSrc: function(obj) {
                var val = obj.value;
                if (val == 1) {
                    obj.element.innerHTML = '按天数';
                } else if (val == 2) {
                    obj.element.innerHTML = '按固定日';
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
        }),
        afterCreate: function() {
            //物流方式枚举
            // $._ajax({
            //     type: "get",
            //     url: appCtx + "/b2b/enum-service/data",
            //     async: false,
            //     data: {
            //         enumClassName: "com.yonyou.occ.settlement.enums.OrderTypeCountEnum"
            //     },
            //     success: function(data) {
            //         var newarray = common.dataconvert.toMap(data, "name", "code");
            //         viewModel.orderTypeSrc = newarray;
            //     }
            // });
        },
        enableRender: function(obj) {
            var showValue;
            if (obj.value == "0") {
                showValue = "未启用"
            } else if (obj.value == "1") {
                showValue = "已启用"
            } else if (obj.value == "2") {
                showValue = "已停用"
            }
            obj.element.innerHTML = showValue;
        },
    });

    return view;
});