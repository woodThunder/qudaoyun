define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    'use strict';
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/cmpt/tmpl-auth-rels',
            searchSource: model.options.searchs.search,
            buttonSource: model.options.buttons.buttonSource,
            simpleList: new u.DataTable(model.options.metas.templateAllotList),
            dialogcardcomp: {},
            searchcomp: {},
            dialogcardSource: model.options.dialogs.dialog,
            gridOption: model.options.grids.grid,
            dialogWidth: '900px'
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
                    viewModel.dialogcardcomp.seteidtValue("authTypeId", currentData.authTypeId);
                    viewModel.dialogcardcomp.seteidtData(currentData);
                } else {
                    title = "新增"
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                    viewModel.dialogcardcomp.viewModel.params.setMeta("authObjId", "enable", false);
                }
                //显示模态框
                viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.saveBill);
            },
            //将操作后的数据进行保存
            saveBill: function () {
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
                        url: window.pathMap.cmpt + viewModel.baseurl,
                        type: type,
                        data: JSON.stringify(postdata),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            //如果index大于等于0说明是修改
                            viewModel.dialogcardcomp.close();
                            viewModel.search();
                            // if (index >= 0) {
                            //     //获取需要修改的行
                            //     currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
                            //     //将用户填写的数据更新到simpleList上
                            // } else {
                            //     //添加数据
                            //     currentRow = viewModel.simpleList.createEmptyRow();
                            // }
                            // currentRow.setSimpleData(data);
                        }
                    })

                }
            },
            
        }),
        rendertype: u.extend({}, simpleview.prototype.rendertype, {
            authTypePriorityRender: function (obj) {
                var showValue = "";
                switch (obj.value) {
                    case "USER":
                        showValue = "用户"
                        break;
                    case "ROLE":
                        showValue = "角色"
                        break;
                    case "TRAN_TYPE":
                        showValue = "交易类型"
                        break;
                }
                if (showValue) obj.element.innerHTML = showValue;
            }
        }),
        afterCreate: function() {
            viewModel.simpleList.on("authTypeId.valuechange", function(obj){
                if (obj.newValue) {
                    obj.rowObj.parent.setMeta("authObjId", "enable", true);
                    var busiObjCode = obj.rowObj.getValue('busiObjCode');
                    var params = {
                        refClientPageInfo: {
                            currPageIndex: 0,
                            pageCount: 0,
                            pageSize: 100
                        },
                        refUIType: "RefGrid",
                    };
                    switch (obj.newValue) {
                        case "USER" : 
                            params.refCode = "internalmsg";
                            params.refModelUrl = "/wbalone/wbUserRef/";
                            params.refName = "用户";
                            params.rootName = "用户";
                            break;
                        case "ROLE" :
                            params.refCode = "";
                            params.refModelUrl = window.pathMap.cmpt + "/role-ref/";
                            params.refName = "角色";
                            params.rootName = "角色";
                            break;
                        case "TRAN_TYPE" :
                            params.refCode = "";
                            params.refModelUrl = window.pathMap.base + "/base/trantype-ref/";
                            params.refName = "交易类型";
                            params.rootName = "交易类型";
                            params.refparam = '{"EQ_billTypeCode": "'+busiObjCode+'"}'
                            break;
                    }
                    $("#authObjIdCls").parent().attr("data-refmodel", JSON.stringify(params))
                } else {
                    obj.rowObj.parent.setMeta("authObjId", "enable", false);
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("authTypeId.valuechange", function(obj){
                if (obj.newValue) {
                    obj.rowObj.parent.setMeta("authObjId", "enable", true);
                    var busiObjCode = obj.rowObj.getValue('busiObjCode');
                    var params = {
                        refClientPageInfo: {
                            currPageIndex: 0,
                            pageCount: 0,
                            pageSize: 100
                        },
                        refUIType: "RefGrid",
                    };
                    switch (obj.newValue) {
                        case "USER" : 
                            params.refCode = "internalmsg";
                            params.refModelUrl = "/wbalone/wbUserRef/";
                            params.refName = "用户";
                            params.rootName = "用户";
                            break;
                        case "ROLE" :
                            params.refCode = "";
                            params.refModelUrl = window.pathMap.cmpt + "/role-ref/";
                            params.refName = "角色";
                            params.rootName = "角色";
                            break;
                        // case "TRAN_TYPE" :
                        //     params.refCode = "";
                        //     params.refModelUrl = window.pathMap.base + "/base/trantype-ref/";
                        //     params.refName = "交易类型";
                        //     params.rootName = "交易类型";
                        //     params.refparam = '{"EQ_billTypeCode": "'+busiObjCode+'"}'
                        //     break;
                    }
                    $("#authObjIdCls").parent().attr("data-refmodel", JSON.stringify(params))
                } else {
                    obj.rowObj.parent.setMeta("authObjId", "enable", false);
                }
            });
        }
    });
    return view;
});