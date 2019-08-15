define(['ocm_simpleview', './meta.js', 'ocm_common'], function (simpleview, model,common) {
    'use strict';
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/stock/batch-numbers', //请求地址
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
                var enablecontrol = {
                    goodsId: "goodsIdBase",
                    productId: "productIdBase",
                    productLineId: "productLineIdBase"
                }
                var title;
                viewModel.index = index;
                if (u.isNumber(index)) {
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                    viewModel.rowId = rowId;
                    viewModel.dialogcardcomp.seteidtData(currentData);
                    for (var key in enablecontrol) {
                        if (currentData[key]) {
                            viewModel[enablecontrol[key]].setEnable(true);
                        }else{
                            viewModel[enablecontrol[key]].setEnable(false);
                        }
                    }
                } else {
                    title = "新增"
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                    for (var key in enablecontrol) {
                        viewModel[enablecontrol[key]].setEnable(true);
                    }
                }
                //显示模态框
                viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit);
            },
            //将操作后的数据进行保存
            edit: function () {
                var result = viewModel.dialogcardcomp.validate();
                if (result.passed) {
                    var postdata = viewModel.dialogcardcomp.geteidtData();
                    // 如果商品和产品或产品线都没值的话，不允许保存
                    if (!postdata.goodsId && !postdata.productId && !postdata.productLineId) {
                        toastr.warning("商品，产品和产品线不能都为空！");
                        return false;
                    }
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

            del : function () {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if(selectedRows.length === 0){
                    toastr.warning("请选择一条数据");
                    return;
                }
                if(selectedRows.length === 1){
                    if(selectedRows[0].getValue("isEnable") == 1){
                        toastr.warning("该条数据已启用，不能删除");
                        return;
                    }
                }
                var ids = [];
                for(var i =0;i<selectedRows.length;i++){
                    if(selectedRows[i].getValue("isEnable") != 1){
                        ids.push(selectedRows[i].getValue("id"));
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
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (data) {
                                viewModel.search();
                            }
                        });

                    }
                });
            }
        }),
        afterCreate: function () {
            viewModel.goodsIdBase = viewModel.dialogcardcomp.app.getComp("goodsIdBase");
            viewModel.productIdBase = viewModel.dialogcardcomp.app.getComp("productIdBase");
            viewModel.productLineIdBase = viewModel.dialogcardcomp.app.getComp("productLineIdBase");

            viewModel.dialogcardcomp.viewModel.params.on("valuechange", function (obj) {
                var enablecontrol = {
                    goodsId: "goodsIdBase",
                    productId: "productIdBase",
                    productLineId: "productLineIdBase"
                }
                if (enablecontrol[obj.field]) {
                    if (obj.newValue) {
                        for (var key in enablecontrol) {
                            if (key != obj.field) {
                                viewModel[enablecontrol[key]].setEnable(false);
                            }
                        }
                    } else {
                        for (var key in enablecontrol) {
                            viewModel[enablecontrol[key]].setEnable(true);
                        }
                    }
                }
            });

        }
    });
    return view;
});