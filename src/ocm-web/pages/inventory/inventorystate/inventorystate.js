define(['ocm_simpleview', './meta.js', 'ocm_common',], function (simpleview, model, common) {

    var viewModel
    var view = simpleview.extend({
        model: model,
        beforeCreate: function () {
            viewModel = this.viewModel
        },
        baseData: {
            baseurl: '/stock/inventory-states',
            //statusField: 'isEnable',
            simpleList: new u.DataTable(model.options.metas.InventoryStatemeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            //isDefault: false
        },
        rendertype: {
            operation4single: function (obj) {
                var isEnable = obj.row.value.isEnable;
                var editfun, delfun;
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                 if (isEnable != 1) {
                    editfun =
                    "data-bind=click:beforeEdit.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                  delfun =
                    "data-bind=click:del.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                } else {
                  delfun = 'class="disabled"';
                  editfun = 'class="disabled"';
                }
                 
                // delfun =
                //         "data-bind=click:del.bind($data," +
                //         obj.rowIndex +
                //         "," +
                //         dataTableRowId +
                //         ")";
                // editfun =
                //     "data-bind=click:beforeEdit.bind($data," +
                //     obj.rowIndex +
                //     "," +
                //     dataTableRowId +
                //     ")";

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
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            enableRender: common.rendertype.enableRender,
            checkStatus: function (params) {
                var name = '';
                switch (params.row.value.isUsable) {
                    case '0':
                        name = "可用"
                        break;
                    case '1':
                        name = "不可用"
                        break;
                }
                params.element.innerHTML = name;
            },
            booleanRender: function (obj) {
                var grid = obj.gridObj;
                var datatable = grid.dataTable;
                var rowId = obj.row.value['$_#_@_id'];
                var row = datatable.getRowByRowId(rowId);
                 //var mainData = row.getSimpleData;
                var checkStr = '',
                    disableStr = '';

                if (obj.value == 'Y' || obj.value == 'true' || obj.value == '1' || obj.value == 1) {
                    checkStr = ' is-checked';
                }
                if (grid.options.editType == 'form') {
                    disableStr = ' is-disabled';
                }
                var htmlStr = '<label class="u-checkbox is-upgraded ' + checkStr + disableStr + '">' +
                    '<input type="checkbox" class="u-checkbox-input">' +
                    '<span class="u-checkbox-label"></span>' +
                    '<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span>' +
                    '</label>'

                obj.element.innerHTML = htmlStr;


                $(obj.element).find('input').on('click', function (e) {
                    $(this).parent().toggleClass('is-checked');
                    var id = viewModel.simpleList.getCurrentRow().getValue("id");
                    // if (!obj.gridObj.options.editable) {
                    //     stopEvent(e);
                    //     return false;
                    // }
                    
                    if ($(this).parent().hasClass('is-checked')) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                    var value = this.checked ? "1" : "0";
                    var column = obj.gridCompColumn;
                    var field = column.options.field;
                    common.dialog.confirmDialog({
                        msg1: '确认切换此项的检验默认库存状态？',
                        msg2: '此操作可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function () {
                            $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/changeCheckDefaultStockStatus",
                        data: {
                            id: id,
                            isCheck: value
                          },
                        success: function (data) {
                          toastr.success();
                          viewModel.search();
                        }
                      })
                    },
                    onCancel:function(){
                        viewModel.search();
                    }
                })
                    // row.setValue(field, value);

                })
            }

        },
        events: u.extend({}, simpleview.prototype.events, {
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
                       var isEnable = rows[i].getValue("isEnable");
                       if(isEnable == 1){
                           toastr.warning("已启用不可删除");
                           return;
                       }
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
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            enable: function () {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function (row, index, arr) {
                        return row.getValue("id");
                    })
                    for (var i = 0; i < selectedRows.length; i++) {
                       var isEnable = selectedRows[i].getValue("isEnable");
                       if(isEnable == 1){
                           toastr.warning("请勿重复启用");
                           return;
                       }
                    }
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
                                viewModel.search();
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
                    for (var i = 0; i < selectedRows.length; i++) {
                        var isEnable = selectedRows[i].getValue("isEnable");
                        if(isEnable == 2){
                            toastr.warning("请勿重复停用");
                            return;
                        }
                     }
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
                                viewModel.search();
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
            // beforeEdit: function (index, rowId) {

            //     var title;
            //     viewModel.index = index;
            //     viewModel.rowId = rowId;
            //     if (u.isNumber(index)) {
            //         //修改操作
            //         title = "编辑";
            //         var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
            //         if(currentData.isEnable == 1){
            //             var name = '';
            //             switch (currentData.isUsable) {
            //                 case '0':
            //                     name = "可用"
            //                     break;
            //                 case '1':
            //                     name = "不可用"
            //                     break;
            //             }
            //             // params.element.innerHTML = name;
            //             viewModel.dialogcardcomp.viewModel.params.meta.isUsable.disableInEdit(true);
            //             viewModel.rowId = rowId;
            //             viewModel.dialogcardcomp.seteidtData(currentData);
            //             $('.isUsable label').html(name)
            //         }else{
            //             viewModel.rowId = rowId;
            //             viewModel.dialogcardcomp.seteidtData(currentData);
            //         }
            //     } else {
            //         title = "新增"
            //         //清空编辑框的信息
            //         viewModel.dialogcardcomp.cleareidt();
            //     }
            //     //显示模态框
            //     viewModel.dialogWidth ?
            //         viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
            //         viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);

            // },
            //将操作后的数据进行保存
            edit: function () {
                var result = viewModel.dialogcardcomp.validate();
                var rowId = viewModel.rowId;
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
                        currentRow.setSimpleData(data);
                        viewModel.search();
                      } else {  
                        //添加数据
                        currentRow = viewModel.simpleList.createEmptyRow();
                      }
                      viewModel.search();
                    }
                  })
                  
                }

              },
        }),
    });
    return view;
});
