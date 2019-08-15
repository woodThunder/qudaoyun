define(['text!./eng-ded-bill.html', 'ocm_common', 'ocm_baseview', './meta.js', "../../flow/bpmapproveref/bpmopenbill.js"], function (tpl, common, baseview, model, bpmopenbill) {
    'use strict'
    var viewModel, appCtx = window.appCtx,
        app;
    var BILLPANELSTATUS = {
        ADD: "add",
        EDIT: "edit",
        COPY: "copy",
        DETAIL: "detail",
        DEFAULT: "default"
    }
    var view = baseview.extend({
        beforeCreate: function () {
            app = this.app;
            viewModel = this.viewModel;
            viewModel = _.extend(viewModel, bpmopenbill.model);
        },
        tpl: tpl,
        model: model,
        baseData: {
            applicationUrl: '/contract/deduct-moneys',
            contractBaseUrl: '/contract/payment-syncs',
            // baseDetailUrl:'/contract/deduct-deatils',
            // baseurlChilds:"/contract/con-custom-childs",
            deductList: new u.DataTable(model.options.metas.deductMoneyField),
            deductCard: new u.DataTable(model.options.metas.deductMoneyField),
            detailCard: new u.DataTable(model.options.metas.deductMoneyField),
            deductItems: new u.DataTable(model.options.metas.deductMoneyFieldChilditem),
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            button4Source: model.options.buttons.button4,

            card1Source: model.options.cards.card1,
            detail11Source: model.options.details.detail1,
            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2,
            grid3Option: model.options.grids.grid3,
            billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
            billStateSrc: [{
                value: 1,
                name: '保存'
            }, {
                value: 2,
                name: '已提交'
            }, {
                value: 3,
                name: '审批通过'
            }, {
                value: 4,
                name: '审批中'
            }, {
                value: 6,
                name: '审批不通过'
            }],
            //跳转单据页
            goBillPanel: common.bill.goBillPanel,
            //跳转详情页
            goDetailPanel: common.bill.goDetailPanel,

            //合同数据:
            contractData:ko.observableArray([]),
        },
        rendertype: {
            operation: common.rendertype.operation,
            // comboRender: common.rendertype.comboRender,
            // operationStr: function(obj, funcName, title) {
            //     var dataTableRowId = obj.row.value['$_#_@_id'];
            //     var array = [];
            //     var bindArray = [];
            //
            //     bindArray.push("data-bind=click:");
            //     bindArray.push(funcName);
            //     bindArray.push(".bind($data,");
            //     bindArray.push(obj.rowIndex);
            //     bindArray.push(',');
            //     bindArray.push(dataTableRowId);
            //     bindArray.push(')');
            //
            //     array.push('<div class="ui-handle-icon"><span class="ui-handle-word"><a href="#" ');
            //     array.push(bindArray.join(''));
            //     array.push(' title="');
            //     array.push(title);
            //     array.push('">');
            //     array.push(title);
            //     array.push('</a></span><span class="ui-handle-word">');
            //     return array.join('');
            // },
            // operation: function(obj) {
            //     var str = '';
            //     var billState = obj.row.value.billState;
            //     var isCheckReceivable = obj.row.value.isCheckReceivable
            //     if (billState == '1' || billState == '6') {
            //         // 可编辑,可提交,可删除
            //         str = viewModel.operationStr(obj, 'showEditBillPanel', '编辑').concat(viewModel.operationStr(obj, 'submitCusReqForm', '提交')).concat(viewModel.operationStr(obj, 'del', '删除'));
            //     } else if (billState == '2') {
            //         // 已提交，尚未审批 . 可收回,可审批
            //         str = viewModel.operationStr(obj, 'unsubmitCusReqForm', '收回') + viewModel.operationStr(obj, 'approveCusReqForm', '审批');
            //     } else if (billState == '3') {
            //         // 已审批 .  目前没操作
            //         if (isCheckReceivable == 0)
            //             str = viewModel.operationStr(obj, 'cancelApproveCusReqForm', '取消审批');
            //     }
            //     obj.element.innerHTML = str;
            //     ko.cleanNode(obj.element);
            //     ko.applyBindings(viewModel, obj.element);
            // },
            enableStatusRender: common.rendertype.enableRender,
            detailRender: common.rendertype.detailRender,
            stateComputed: ko.pureComputed(function () {
                var dataValue = viewModel.deductList.ref("state")();
                var showName;
                if (dataValue == "1") {
                    (showName = "待处理")
                }
                if (dataValue == "2") {
                    (showName = "已提交")
                }
                if (dataValue == "3") {
                    (showName = "审批中")
                }
                if (dataValue == "4") {
                    (showName = "审批通过")
                }
                if (dataValue == "5") {
                    (showName = "审批不通过")
                }
                return showName;
            }),
            stateRender: function (params) {
                switch (params.value) {
                    case '0':
                        params.element.innerHTML = "待处理";
                        break;
                    case '1':
                        params.element.innerHTML = "已提交";
                        break;
                    case '2':
                        params.element.innerHTML = "审批中";
                        break;
                    case "3":
                        params.element.innerHTML = "审批通过";
                        break;
                    case '4':
                        params.element.innerHTML = "审批不通过";
                        break;
                    default:
                }
            },
        },
        events: {
            //删除和批量删除
            del: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.deductList.setRowSelectbyRowId(rowId);
                }
                var ids = [],
                    removeRows = [];
                var rows = viewModel.deductList.getSelectedRows();
                if (rows.length == 0) {
                    toastr.error("请选择数据");
                    return
                }
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        // if (rows[i].getValue('billState') == '3' || rows[i].getValue('billState') == '2') {
                        //     toastr.warning('已“提交”和“审批通过”的销售指标不能被删除！')
                        //     continue;
                        // } else {
                        ids.push(rows[i].getValue("id"));
                        removeRows.push(rows[i]);
                        // }
                    }
                }
                if (!ids.length) {
                    return;
                }
                common.dialog.confirmDialog({
                    msg1: '确认删除这些项？',
                    msg2: '此操作不可逆',
                    width: '400px',
                    type: 'error',
                    onOk: function () {
                        $._ajax({
                            url: appCtx + viewModel.applicationUrl + "/delete",
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
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (reindex) {
                    viewModel.deductList.pageIndex(0);
                }
                viewModel.deductList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                var pageSize = viewModel.deductList.pageSize();
                var pageNumber = viewModel.deductList.pageIndex();
                queryData.page = pageNumber;
                queryData.size = pageSize;
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.applicationUrl,
                    // url: appCtx + viewModel.baseurl + '/findAll',
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.deductList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.deductList.totalRow(data.totalElements);
                        viewModel.deductList.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.deductList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.deductList.pageSize(size);
                viewModel.search(true);
            },
            //进入新增单据页
            showAddBillPanel: function () {
                viewModel.deductCard.removeAllRows();
                var curRow = viewModel.deductCard.createEmptyRow();
                viewModel.rowId = curRow.rowId
                viewModel.deductItems.removeAllRows();
                viewModel.goBillPanel();

                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
            },
            //进入修改单据页
            showEditBillPanel: function (index) {
                viewModel.deductList.setRowFocus(index);
                var id = viewModel.deductList.getValue("id");
                var isUnBpm = common.checkApprover(id);
                if (isUnBpm && !isUnBpm.isUnDoBpm) {
                    toastr.warning(isUnBpm.message);
                    return;
                }
                //查询子表数据
                viewModel.findByParentid(id, function (data) {
                    viewModel.deductCard.setSimpleData(data);
                    viewModel.deductItems.setSimpleData(data.deductDetails);
                });
                viewModel.goBillPanel();
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
            },
            //取消单据
            cancelBill: function () {
                viewModel.deductItems.removeAllRows();
                viewModel.deductCard.removeAllRows();
                viewModel.retListPanel();
            },
            detail: function (index) {
                //确保grid先将行设置为focus状态
                if (typeof (index) !== 'number') {
                    $("#bpmhead").html("");
                    $("#bpmfoot").html("");
                }
                setTimeout(function () {
                    var curRow = viewModel.deductList.getCurrentRow();
                    var id = curRow.getValue("id");
                    viewModel.findByParentid(id, function (data) {
                        viewModel.detailCard.setSimpleData(data);
                        viewModel.deductItems.setSimpleData(data.deductDetails);
                    });
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                    viewModel.goDetailPanel();
                }, 0);
            },
            //查询子表数据
            findByParentid: function (id, callback) {
                $._ajax({
                    url: appCtx + viewModel.applicationUrl+"/detail",
                    // url: appCtx + viewModel.baseDetailUrl,
                    type: 'post',
                    async: false,
                    data: {
                        id: id
                    },
                    success: function (data) {
                        viewModel.deductItems.setSimpleData(data.billDetails);

                        if (typeof callback == "function") {
                            callback(data);
                        }
                    }
                })
            },
            setTableHeadData:function(data){
               var cardData = viewModel.deductCard.getRowByRowId(viewModel.rowId)
                cardData.setValue("saleOrgId",data.saleOrgId)
                cardData.setValue("saleOrgName",data.saleOrgName)
                cardData.setValue("financeOrgId",data.financeOrgId)
                cardData.setValue("financeOrgName",data.financeOrgName)
                cardData.setValue("projectId",data.projectId)
                cardData.setValue("projectName",data.projectName)
                cardData.setValue("customerName",data.customerName)
                cardData.setValue("customerId",data.customerId)
            },
            // TODO 通过合同id 获取  （来源单据类型 来源交易类型 * 来源单据ID）
            findByContractId: function (id) {
                $._ajax({
                    url: appCtx + viewModel.contractBaseUrl+"/detail",
                    type: 'post',
                    async: false,
                    data: {
                        id: id
                    },
                    success: function (data){
                      viewModel.contractData(data)
                      // viewModel.deductCard.setSimpleData(data)
                      viewModel.setTableHeadData(data);
                    }
                })
            },
            // 清除基类属性
            clearBaseProp: function (row) {
                row.setValue("id", "");
                row.setValue("code", "");
                row.setValue("name", "");
                row.setValue("creator", "");
                row.setValue("creationTime", "");
                row.setValue("modifier", "");
                row.setValue("modifiedTime", "");
            },

            //新增子表项
            addItems: function () {
                viewModel.deductItems.createEmptyRow({
                    unSelect: true
                });
            },

            //删除子表项
            delItems: function () {
                var selectedRows = viewModel.deductItems.getSelectedRows();
                viewModel.deductItems.removeRows(selectedRows, {
                    forceDel: true
                });
            },
            //保存单据
            saveBill: function () {
                var result = app.compsValidateMultiParam({
                    element: ".ui-bill-panel",
                    showMsg: true
                });
                var passed = result.passed;
                if (!passed) {
                    if (result.notPassedArr.length == 3) {
                        passed = true;
                    }
                }
                if (!passed) return;
                var allRows = viewModel.deductItems.getAllRows();
                if (allRows.length == 0 || allRows.every(function (row) {
                        return row.status == u.Row.STATUS.FALSE_DELETE
                    })) {
                    toastr.error("请录入表体行数据");
                    return;
                }
                // viewModel.deductList.setValue('billClaimState', '1');
                var deductData = viewModel.deductCard.getSimpleData()[0];
                var deductItemsData = viewModel.deductItems.getSimpleData();
                deductData.deductDetails = deductItemsData;
                deductData.state = 0; // 待处理
                deductData.srcBillTypeId = "SaleContract";
                deductData.srcBillId = viewModel.contractData().id;
                deductData.srcBillCode = viewModel.contractData().code;
                deductData.srcTransactionTypeId = viewModel.contractData().contractTypeId;
                var type = "post"
                if (deductData.id) {
                    type = "put"
                    // deductData.isEnable = deductItemsData.isEnable
                }
                $._ajax({
                    url: appCtx + viewModel.applicationUrl,
                    type: type,
                    data: JSON.stringify(deductData),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.search();
                        viewModel.retListPanel();
                    }
                })
            },
            //导入
            importHandle: function () {
                var urlInfo = viewModel.applicationUrl + '/excelDataImport'; //倒入地址参数
                var urlStatusInfo = viewModel.applicationUrl + '/excelLoadingStatus'; //请求进度地址参数
                var ele = $('#importFiel')[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportHandle: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var templateUrl = viewModel.applicationUrl + '/downloadExcelTemplate'; //导出模板地址参数
                var excelDataUrl = viewModel.applicationUrl + '/excelDataExport'; //导出数据地址参数
                var listData = viewModel.deductList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            // 返回列表页
            retListPanel: function () {
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
                common.bill.retListPanel();
            },
            // 审批流程的相关按钮点击事件 - start
            // 提交
            submitBtn: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.deductList.setRowSelectbyRowId(rowId);
                }
                var listCompId = "deductList";
                var nodeJs = "/ocm-web/pages/contract/eng-ded-bill/eng-ded-bill.js";
                var billTypeCode = "DecuctMoney";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
            },

            // 收回
            unsubmit: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.deductList.setRowSelectbyRowId(rowId);
                }
                var listCompId = "deductList";
                var billTypeCode = "DecuctMoney";
                var tranTypeCode = null;
                var callback = null;
                viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
            },

            // 审批通过
            approve: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.deductList.setRowSelectbyRowId(rowId);
                }
                var listCompId = "deductList";
                var billTypeCode = "DecuctMoney";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    var index = viewModel[listCompId].getSelectedIndex();
                    var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                    var id = viewModel.deductList.getRow(index).getValue('id');
                    viewModel.detail(index, rowId);
                    viewModel.initBPMFromBill(id, viewModel);
                };
                var withoutBpmCallback = null;
                viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },

            // 审批不通过
            disapprove: function () {
                var listCompId = "deductList";
                var billTypeCode = "DecuctMoney";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    var index = viewModel[listCompId].getSelectedIndex();
                    var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                    var id = viewModel.deductList.getRow(index).getValue('id');
                    viewModel.detail(index, rowId);
                    viewModel.initBPMFromBill(id, viewModel);
                };
                var withoutBpmCallback = null;
                viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },

            // 取消审批
            cancelApprove: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.deductList.setRowSelectbyRowId(rowId);
                }
                var curRow = viewModel.deductList.getCurrentRow();
                // if (curRow.getValue('isCheckReceivable') == 1) {
                //     toastr.error('已核销的单据不可以取消审批！')
                //     return;
                // }
                var listCompId = "deductList";
                var billTypeCode = "DecuctMoney";
                var tranTypeCode = null;
                var withBpmCallback = function () {
                    var index = viewModel[listCompId].getSelectedIndex();
                    var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
                    var id = viewModel.deductList.getRow(index).getValue('id');
                    viewModel.detail(index, rowId);
                    viewModel.initBPMFromBill(id, viewModel);
                };
                var withoutBpmCallback = null;
                viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                    withoutBpmCallback);
            },
            // 审批流程的相关按钮点击事件 - end
            // TODO 表头扣款金额计算
            setTableHeadMoney: function(){
               var rowsData =  viewModel.deductItems.getSimpleData();
               var deductTotalMoney = 0;
               rowsData.forEach(function(item,index){
                   var  money = item.money == null ? 0 : parseFloat(item.money)
                   deductTotalMoney += money
               })
              var deductCardData = viewModel.deductCard.getRowByRowId(viewModel.rowId)
                deductCardData.setValue("money",deductTotalMoney)
            }
        },
        afterCreate: function () {
            viewModel.deductCard.on("contractId.valuechange", function(obj) {
              // if (obj.newValue && obj.newValue !=  obj.oldValue) {
                  viewModel.findByContractId(obj.newValue)
              // }
            });
            viewModel.deductItems.on("money.valuechange", function(obj) {
               if (obj.newValue && obj.newValue !=  obj.oldValue) {
                  // viewModel.findByContractId(obj.newValue);
                   viewModel.setTableHeadMoney();
               }
            });
        }
    });

    return view;
});