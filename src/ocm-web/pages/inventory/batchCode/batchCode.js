define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    'use strict';
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/stock/batch-codes', //请求地址
            searchSource: model.options.searchs.search, //搜索项
            buttonSource: model.options.buttons.buttonSource, //按钮级搜索项
            simpleList: new u.DataTable(model.options.metas.batchList), //table 数据
            dialogcardcomp: {}, //弹出框默认项 
            searchcomp: {}, //搜索、清空按钮
            dialogcardSource: model.options.dialogs.dialog, //弹出参数
            gridOption: model.options.grids.grid,
            dialogWidth: '900px' //弹框宽度
        },
        events: u.extend({}, simpleview.prototype.events, {
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
                viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit);
            },
             //停用
        disable: function () {
            var selectedRows = viewModel.simpleList.getSelectedRows();
            if (selectedRows && selectedRows.length > 0) {
              var ids = selectedRows.map(function (row, index, arr) {
                return row.getValue("id");
              })
            for(var i = 0; i<selectedRows.length ; i++){
                if(selectedRows[i].getValue("isEnable") == 0){
                    toastr.warning("未启用的无法停用；");
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
                  }
                }
              });
            } else {
              toastr.warning("请至少选择一项");
            }
          },
            //将操作后的数据进行保存
            edit: function () {
                var result = viewModel.dialogcardcomp.validate();
                if (result.passed) {
                    var postdata = viewModel.dialogcardcomp.geteidtData();
                    var index = viewModel.index;
                    var currentRow, type = "post";
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
        }),
    });
    return view;
});