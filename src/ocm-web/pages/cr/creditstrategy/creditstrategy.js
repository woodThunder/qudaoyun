define(['ocm_simpleview', './meta.js', 'ocm_common'], function(simpleview, model, common) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function() {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/cr/credit-ctrl-strategys',
            simpleList: new u.DataTable(model.options.metas.creditoccupymeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            tempF: '',
            tempS: '',
            temp: '空',
            isEdit: false
        },
        events: $.extend({}, simpleview.prototype.events, {
            closed: function() {
                console.log('closed')
            },
            beforeEdit: function(index, rowId) {
                var title;
                viewModel.index = index;
                if (u.isNumber(index)) {
                    viewModel.temp = '空';
                    viewModel.tempF = '';
                    viewModel.tempS = '';
                    viewModel.isEdit = true;
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.simpleList
                        .getRowByRowId(rowId)
                        .getSimpleData();
                    var ct = currentData.dataCenterCreditPointName;
                    switch (ct) {
                        case '订单提交':
                            currentData.controletime = 'SaleOrdercommit'
                            break;
                        case '订单审核':
                            currentData.controletime = 'SaleOrderapprovepass'
                            break;
                        case '发货单提交':
                            currentData.controletime = 'DeliveryOrdercommit'
                            break;
                        case '发货单审批':
                            currentData.controletime = 'DeliveryOrderapprovepass'
                            break;
                        default:
                            currentData.controletime = 'DeliveryOrderapprovepass'
                    }
                    viewModel.rowId = rowId;
                    viewModel.dialogcardcomp.seteidtData(currentData);
                } else {
                    title = "新增";
                    viewModel.isEdit = false;
                    var newRow = viewModel.simpleList.createEmptyRow();
                    var newRowData = newRow.getSimpleData();
                    newRowData.isUnsetAsZero = '1';
                    newRowData.isAccountCtrl = '1';
                    newRowData.editCreditLimit = '1';
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                    viewModel.dialogcardcomp.seteidtData(newRowData);
                }
                //显示模态框
                viewModel.dialogWidth ?
                    viewModel.dialogcardcomp.show(
                        title,
                        viewModel.dialogWidth,
                        viewModel.edit
                    ) :
                    viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
                $('div.dialogcardContainer a.J-cancel').on('click', function() {
                    viewModel.simpleList.removeRowByRowId(newRow.rowId);
                })
            },
            //将操作后的数据进行保存
            edit: function() {
                var result = viewModel.dialogcardcomp.validate();
                if (result.passed) {
                    var index = viewModel.index;
                    var currentRow,
                        type = "post";
                    var postdata = viewModel.dialogcardcomp.geteidtData();
                    //  对新增保存时有其他需求的校验添加的方法（命名editExtend） ---syf
                    if (
                        viewModel.editVerify &&
                        typeof viewModel.editVerify == "function" &&
                        viewModel.editVerify(postdata)
                    ) {
                        return;
                    }
                    if (index >= 0) {
                        type = "put";
                    }
                    postdata.dataCenterCreditBillType = viewModel.dataCenterCreditBillType
                    postdata.dataCenterCreditPoint = viewModel.dataCenterCreditPoint
                    console.log(postdata)
                    //更改后台数据
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: type,
                        data: JSON.stringify(postdata),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            //如果index大于等于0说明是修改
                            viewModel.dialogcardcomp.close();
                            if (index >= 0) {
                                //获取需要修改的行
                                currentRow = viewModel.simpleList.getRowByRowId(
                                    viewModel.rowId
                                );
                                currentRow.setSimpleData(data);
                                //将用户填写的数据更新到simpleList上
                            } else {
                                viewModel.search();
                                //添加数据
                                // currentRow = viewModel.simpleList.createEmptyRow();
                            }

                        }
                    });
                }
            },
        }),
        rendertype: $.extend({}, common.rendertype, {
            creditControlTypeRender: function(params) {
                // debugger
                switch (params.value) {
                    case '01':
                        params.element.innerHTML = "提示";
                        break;
                    case '02':
                        params.element.innerHTML = "严格控制";
                        break;
                    case '03':
                        params.element.innerHTML = "不控制";
                        break;
                }
            },
            creditControlPointRender: function(params) {
                params.element.innerHTML = "提交订单";
            },
            dataCenterRender: function(params) {
                switch (params.value) {
                    case 'SaleOrdercommit':
                        params.element.innerHTML = '订单提交';
                        break;
                    case 'SaleOrderapprovepass':
                        params.element.innerHTML = '订单审核';
                        break;
                    case 'DeliveryOrdercommit':
                        params.element.innerHTML = '发货单提交'
                        break;
                    case 'DeliveryOrderapprovepass':
                        params.element.innerHTML = '发货单审核'
                        break;
                }
            }
        }),
        afterCreate: function() {
            var value = {};
            $("#creditCtrlStrategyId").attr("data-refparam", JSON.stringify(value));
            viewModel.dialogcardcomp.viewModel.params.on("organizationId.valuechange", function(obj) {
                if (!obj.newValue) {
                    return
                }
                toastr.warning('修改财务组织需要信用重算，否则信用占用可能不准确，是否继续？');
            });
            viewModel.dialogcardcomp.viewModel.params.on("saleOrgId.valuechange", function(obj) {
                if (!obj.newValue) {
                    return
                }
                toastr.warning('修改销售组织，需要信用重算，否则信用占用可能不准确，是否继续？');
            });
            viewModel.dialogcardcomp.viewModel.params.on("trantypeId.valuechange", function(obj) {
                if (!obj.newValue) {
                    return
                }
                toastr.warning('修改订单类型，需要信用重算，否则信用占用可能不准确，是否继续？');
            });
            viewModel.dialogcardcomp.viewModel.params.on("controletime.valuechange", function(obj) {
                if (!obj.newValue) {
                    return
                }
                var val = obj.newValue;
                if (val == 'SaleOrdercommit') {
                    viewModel.dataCenterCreditBillType = 'SaleOrder'
                    viewModel.dataCenterCreditPoint = 'commit'
                    // viewModel.dialogcardcomp.viewModel.params.setValue('dataCenterCreditBillType', 'SaleOrder');
                    // viewModel.dialogcardcomp.viewModel.params.setValue('dataCenterCreditPoint', 'commit');
                } else if (val == 'SaleOrderapprovepass') {
                    viewModel.dataCenterCreditBillType = 'SaleOrder'
                    viewModel.dataCenterCreditPoint = 'approvepass'
                    // viewModel.dialogcardcomp.viewModel.params.setValue('dataCenterCreditBillType', 'SaleOrder');
                    // viewModel.dialogcardcomp.viewModel.params.setValue('dataCenterCreditPoint', 'approvepass');
                } else if (val == 'DeliveryOrdercommit') {
                    viewModel.dataCenterCreditBillType = 'DeliveryOrder'
                    viewModel.dataCenterCreditPoint = 'commit'
                    // viewModel.dialogcardcomp.viewModel.params.setValue('dataCenterCreditBillType', 'DeliveryOrder');
                    // viewModel.dialogcardcomp.viewModel.params.setValue('dataCenterCreditPoint', 'commit');
                } else if (val == 'DeliveryOrderapprovepass') {
                    viewModel.dataCenterCreditBillType = 'DeliveryOrder'
                    viewModel.dataCenterCreditPoint = 'approvepass'
                    // viewModel.dialogcardcomp.viewModel.params.setValue('dataCenterCreditBillType', 'DeliveryOrder');
                    // viewModel.dialogcardcomp.viewModel.params.setValue('dataCenterCreditPoint', 'approvepass');
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("organizationId.valuechange", function(obj) {
                if (!viewModel.isEdit) return;
                if (!obj.newValue) {
                    return
                }
                if (viewModel.tempF == '') {
                    viewModel.tempF = obj.oldValue;
                    common.dialog.confirmDialog({
                        msg1: '修改财务组织需要信用重算，是否继续？',
                        msg2: '否则信用占用可能不准确',
                        width: '400px',
                        type: 'error',
                        onOk: function() {},
                        onCancel: function() {
                            viewModel.dialogcardcomp.viewModel.params.setValue('organizationId', viewModel.tempF);
                            viewModel.tempF = ''
                        }
                    });
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("saleOrgId.valuechange", function(obj) {
                if (!viewModel.isEdit) return;
                if (!obj.newValue) {
                    return
                }
                if (viewModel.tempS == '') {
                    viewModel.tempS = obj.oldValue;
                    common.dialog.confirmDialog({
                        msg1: '修改销售组织需要信用重算，是否继续？',
                        msg2: '否则信用占用可能不准确',
                        width: '400px',
                        type: 'error',
                        onOk: function() {},
                        onCancel: function() {
                            viewModel.dialogcardcomp.viewModel.params.setValue('saleOrgId', viewModel.tempS);
                            viewModel.tempS = ''
                        }
                    });
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("trantypeId.valuechange", function(obj) {
                if (!viewModel.isEdit) return;
                if (!obj.newValue) {
                    return
                }
                if (viewModel.temp == '空') {
                    viewModel.temp = obj.oldValue;
                    common.dialog.confirmDialog({
                        msg1: '修改订单类型需要信用重算，是否继续？',
                        msg2: '否则信用占用可能不准确',
                        width: '400px',
                        type: 'error',
                        onOk: function() {},
                        onCancel: function() {
                            viewModel.dialogcardcomp.viewModel.params.setValue('trantypeId', viewModel.temp);
                            viewModel.temp = '空'
                        }
                    });
                }
            });
        }
    });
    return view;

});