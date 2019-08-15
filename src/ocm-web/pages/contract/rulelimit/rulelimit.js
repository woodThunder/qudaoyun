define(['ocm_simpleview', './meta.js', 'ocm_common',], function (simpleview, model, common) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/contract/con-rule-settings',
            simpleList: new u.DataTable(model.options.metas.rulemeta),
            statusField: 'isEnable',
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            isStandard: ko.pureComputed(function () {
                var isStandard = viewModel.simpleList.ref("isStandard")();
                return isStandard == 1 ? "是" : "否";
            }),
        },
        events: u.extend({}, simpleview.prototype.events, {
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
            beforeEdit: function (index, rowId) {
                var title;
                viewModel.index = index;
                // viewModel.isBasicUnit = false;
                if (u.isNumber(index)) {
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                    // if (currentData.isBasicUnit == 1) {
                    //     viewModel.isBasicUnit = true;
                    // } else {
                    //     viewModel.isBasicUnit = false;
                    // }
                    viewModel.rowId = rowId;
                    viewModel.dialogcardcomp.seteidtData(currentData);
                } else {
                    title = "新增"
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                    // viewModel.isBasicUnit = false;
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
                    // if (postdata.isBasicUnit == 0 && viewModel.isBasicUnit) {
                    //     // common.dialog.confirmDialog({
                    //     //     msg1: '确定要设置为非基本单位吗？',
                    //     //     msg2: '此操作将产生巨大影响，请谨慎操作',
                    //     //     width: '400px',
                    //     //     type: 'error',
                    //     //     onOk: function () {
                    //             //更改后台数据
                    //             $._ajax({
                    //                 url: appCtx + viewModel.baseurl,
                    //                 type: type,
                    //                 data: JSON.stringify(postdata),
                    //                 contentType: "application/json; charset=utf-8",
                    //                 success: function (data) {
                    //                     //如果index大于等于0说明是修改
                    //                     viewModel.dialogcardcomp.close();
                    //                     currentRow = viewModel.search()
                    //                 }
                    //             })
                    //     //     }
                    //     // });
                    // } else {
                        //更改后台数据
                        $._ajax({
                            url: appCtx + viewModel.baseurl,
                            type: type,
                            data: JSON.stringify(postdata),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                //如果index大于等于0说明是修改
                                viewModel.dialogcardcomp.close();
                                currentRow = viewModel.search()
                            }
                        })
                    // }
                }
            },
        })
    });
    return view;
});
