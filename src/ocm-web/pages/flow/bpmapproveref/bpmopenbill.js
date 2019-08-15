define(["./bpmhandler.js"], function(bpmapprove) {
    var eventBpm = {
        // 从单据进入审批界面
        initBPMFromBill: function(billId, viewModel) {
            bpmBillHeader("#bpmhead", billId, viewModel);
            bpmBillFoot("#bpmfoot", viewModel);
        },

        // 从任务进入审批界面
        initBpmFromTask: function(arg, viewModel) {
            //added by xuxx 单据需要支持流程，增加方法 --begin
            bpmApproveHeader("#bpmhead", arg.vstate, viewModel);
            bpmApproveFoot("#bpmfoot", arg.vstate, viewModel);

            viewModel.id = arg.id;
            viewModel.taskId = arg.taskId;
            viewModel.processInstanceId = arg.processInstanceId;
            viewModel.processDefinitionId = arg.processDefinitionId;
            viewModel.vstate = arg.vstate;
            viewModel.pmodel = arg.pmodel;
            //added by xuxx 单据需要支持流程，增加方法 --end
        },

        afterAdd: function(element, index, data) {
            if (element.nodeType === 1) {
                u.compMgr.updateComp(element);
            }
        },

        rowClick: function(row, e) {},

        /**
         * 根据单据类型和交易类型获取对应的审批流配置。
         * @param billTypeCode 单据类型编码。
         * @param tranTypeCode 交易类型编码。
         * @param withBpmCallback 配置了审批流时的回调方法。
         * @param withoutBpmCallback 未配置审批流时的回调方法。
         */
        findBillFlowConfig: function(billTypeCode, tranTypeCode, withBpmCallback, withoutBpmCallback) {
            $._ajax({
                url: window.pathMap["cmpt"] + "/cmpt/bill-flow-configs/find-unique",
                type: "get",
                data: {
                    "billTypeCode": billTypeCode,
                    "tranTypeCode": tranTypeCode
                },
                contentType: "application/json; charset=utf-8",
                success: function(billFlowConfig) {
                    if (billFlowConfig) {
                        if (withBpmCallback) {
                            withBpmCallback(billFlowConfig.actProcModelCode);
                        }
                    } else {
                        if (withoutBpmCallback) {
                            withoutBpmCallback();
                        }
                    }
                }
            });
        },

        /**
         * 提交审批流单据。
         * @param viewModel 视图模型。
         * @param listCompId 列表控件标识。
         * @param nodeJs 脚本路径。
         * @param billTypeCode 单据类型编码。
         * @param tranTypeCode 交易类型编码。
         * @param callback 回调方法。
         */
        bpmSubmit: function(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback) {
            var selectedData = viewModel[listCompId].getSimpleData({
                type: "select"
            });
            if (selectedData.length != 1) {
                toastr.error("请选择一条数据。");
                return;
            }
            for (var i = 0; i < selectedData.length; ++i) {
                var item = selectedData[i];
                if (item.state != 0) {
                    toastr.error("单据不处于“待处理”状态，不能提交。");
                    return;
                }
            }

            var submitWithBpm = function(processDefineCode) {
                var url = appCtx + viewModel.applicationUrl + "/submit?processDefineCode=" +
                    processDefineCode + "&nodeJs=" + nodeJs + "&billTypeCode=" + billTypeCode;
                $.ajax({
                    type: "post",
                    url: url,
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(selectedData),
                    success: function(result) {
                        toastr.success();
                        if (result.success == "success") {
                            if (callback && typeof callback == "function") {
                                callback(result);
                            } else {
                                viewModel.search();
                            }
                        } else {
                            toastr.error(result.message);
                        }
                    }
                });
            };
            var submitWithoutBpm = function() {
                var billId = selectedData[0]["id"];
                var url = appCtx + viewModel.applicationUrl + "/submitWithoutBpm?billId=" + billId;
                $.ajax({
                    type: "post",
                    url: url,
                    contentType: "application/json;charset=utf-8",
                    success: function(result) {
                        if (result.success == "success") {
                            toastr.success();
                            if (callback && typeof callback == "function") {
                                callback(result);
                            } else {
                                viewModel.search();
                            }
                        } else {
                            toastr.error(result.message);
                        }
                    }
                });
            };
            viewModel.findBillFlowConfig(billTypeCode, tranTypeCode, submitWithBpm, submitWithoutBpm);
        },

        /**
         * 收回审批流单据。
         * @param viewModel 视图模型。
         * @param listCompId 列表控件标识。
         * @param billTypeCode 单据类型编码。
         * @param tranTypeCode 交易类型编码。
         * @param callback 回调方法。
         */
        bpmUnsubmit: function(viewModel, listCompId, billTypeCode, tranTypeCode, callback) {
            var selectedData = viewModel[listCompId].getSimpleData({
                type: "select"
            });
            if (selectedData.length != 1) {
                toastr.error("请选择一条数据。");
                return;
            }
            for (var i = 0; i < selectedData.length; ++i) {
                var item = selectedData[i];
                if (item.state != 1) {
                    toastr.error("单据不处于“已提交”状态，不能收回。");
                    return;
                }
            }

            var unsubmitWithBpm = function() {
                $.ajax({
                    type: "post",
                    url: appCtx + viewModel.applicationUrl + "/unsubmit",
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(selectedData),
                    success: function(result) {
                        if (result.success == "success") {
                            toastr.success();
                            viewModel.search();
                            if (callback) {
                                callback(result);
                            }
                        } else {
                            toastr.error(result.message);
                        }
                    }
                });
            };
            var unsubmitWithoutBpm = function() {
                var billId = selectedData[0]["id"];
                var url = appCtx + viewModel.applicationUrl + "/unsubmitWithoutBpm?billId=" + billId;
                $.ajax({
                    type: "post",
                    url: url,
                    contentType: "application/json;charset=utf-8",
                    success: function(result) {
                        if (result.success == "success") {
                            toastr.success();
                            viewModel.search();
                            if (callback) {
                                callback();
                            }
                        } else {
                            toastr.error(result.message);
                        }
                    }
                });
            };
            viewModel.findBillFlowConfig(billTypeCode, tranTypeCode, unsubmitWithBpm, unsubmitWithoutBpm);
        },

        bpmApprove: function(viewModel) {
            var returnAndRefreshList = function() {
                viewModel.retListPanel();
                viewModel.search();
            };
            bpmApproveHandler(viewModel.taskId, viewModel.processInstanceId, viewModel.processDefinitionId,
                viewModel.pmodel, returnAndRefreshList);
        },

        // 改派
        delegateOk: function(viewModel) {
            var returnAndRefreshList = function() {
                viewModel.retListPanel();
                viewModel.search();
            };
            bpmDelegateOkHandler(viewModel.taskId, viewModel.processInstanceId, viewModel.pmodel,
                returnAndRefreshList);
        },

        // 加签
        bpmAddSignOk: function(viewModel) {
            var returnAndRefreshList = function() {
                viewModel.retListPanel();
                viewModel.search();
            };
            bpmAddSignOkHandler(viewModel.taskId, viewModel.processInstanceId, viewModel.pmodel,
                returnAndRefreshList);
        },

        // 驳回或者指派
        rejectOk: function(viewModel) {
            var returnAndRefreshList = function() {
                viewModel.retListPanel();
                viewModel.search();
            };
            bpmRejectOkHandler(viewModel.taskId, viewModel.processInstanceId, viewModel.pmodel,
                returnAndRefreshList);
        },

        // 流程，新增的时候查看流程图
        bpmImgAddClick: function(viewModel) {
            bpmapprove.model.bpmImgApproveClickHandler(viewModel.processDefinitionId, viewModel.processInstanceId,
                viewModel.flowHisDa, "show");
        },

        // 审批点击流程图
        bpmImgApproveClick: function(viewModel) {
            bpmapprove.model.bpmImgApproveClickHandler(viewModel.processDefinitionId, viewModel.processInstanceId,
                viewModel.flowHisDa, "show");
        },
        //added by xuxx 单据需要支持流程，增加方法 --endflowHisDa:bpmapprove.model.flowHisDa,

        /**
         * 未配置审批流时，审批通过流程单据。
         * @param viewModel 视图模型。
         * @param listCompId 列表控件标识。
         * @param billTypeCode 单据类型编码。
         * @param tranTypeCode 交易类型编码。
         * @param withBpmCallback 配置审批流时的回调方法。
         * @param withoutBpmCallback 未配置审批流时的回调方法。 如配置回调的话，search()方法在回调中设置调用
         */
        approveWithoutBpm: function(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
            withoutBpmCallback) {
            var selectedData = viewModel[listCompId].getSimpleData({
                type: "select"
            });
            if (selectedData.length != 1) {
                toastr.error("请选择一条数据。");
                return;
            }
            for (var i = 0; i < selectedData.length; ++i) {
                var item = selectedData[i];
                if (item.state != 1 && item.state != 2) {
                    toastr.error("单据不处于“已提交”和“审批中”状态，不能进行审批。");
                    return;
                }
            }

            var doWithBpm = function() {
                toastr.warning("已配置审批流，需要在单据页面中进行处理。");
                if (withBpmCallback) {
                    withBpmCallback();
                }
            };
            var doWithoutBpm = function() {
                var billId = selectedData[0]["id"];
                var url = appCtx + viewModel.applicationUrl + "/approveWithoutBpm?billId=" + billId;
                $.ajax({
                    type: "post",
                    url: url,
                    contentType: "application/json;charset=utf-8",
                    success: function(result) {
                        if (result.success == "success") {
                            toastr.success();
                            if (withoutBpmCallback && typeof withoutBpmCallback == "function") {
                                withoutBpmCallback();
                            } else {
                                viewModel.search();
                            }
                        } else {
                            toastr.error(result.message);
                        }
                    }
                });
            };
            viewModel.findBillFlowConfig(billTypeCode, tranTypeCode, doWithBpm, doWithoutBpm);
        },

        /**
         * 未配置审批流时，审批不通过流程单据。
         * @param viewModel 视图模型。
         * @param listCompId 列表控件标识。
         * @param billTypeCode 单据类型编码。
         * @param tranTypeCode 交易类型编码。
         * @param withBpmCallback 配置审批流时的回调方法。
         * @param withoutBpmCallback 未配置审批流时的回调方法。
         */
        disapproveWithoutBpm: function(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
            withoutBpmCallback) {
            var selectedData = viewModel[listCompId].getSimpleData({
                type: "select"
            });
            if (selectedData.length != 1) {
                toastr.error("请选择一条数据。");
                return;
            }
            for (var i = 0; i < selectedData.length; ++i) {
                var item = selectedData[i];
                if (item.state != 1 && item.state != 2) {
                    toastr.error("单据不处于“已提交”或“审批中”状态，不能进行审批。");
                    return;
                }
            }

            var doWithBpm = function() {
                toastr.warning("已配置审批流，需要在单据页面中进行处理。");
                if (withBpmCallback) {
                    withBpmCallback();
                }
            };
            var doWithoutBpm = function() {
                var billId = selectedData[0]["id"];
                var url = appCtx + viewModel.applicationUrl + "/disapproveWithoutBpm?billId=" + billId;
                $.ajax({
                    type: "post",
                    url: url,
                    contentType: "application/json;charset=utf-8",
                    success: function(result) {
                        if (result.success == "success") {
                            toastr.success();
                            viewModel.search();
                            if (withoutBpmCallback) {
                                withoutBpmCallback();
                            }
                        } else {
                            toastr.error(result.message);
                        }
                    }
                });
            };
            viewModel.findBillFlowConfig(billTypeCode, tranTypeCode, doWithBpm, doWithoutBpm);
        },

        /**
         * 未配置审批流时，取消审批流程单据。
         * @param viewModel 视图模型。
         * @param listCompId 列表控件标识。
         * @param billTypeCode 单据类型编码。
         * @param tranTypeCode 交易类型编码。
         * @param withBpmCallback 配置审批流时的回调方法。
         * @param withoutBpmCallback 未配置审批流时的回调方法。
         * @param cancelApproveUrl 取消审批时的接口地址（b2b-order 与其他模块地址不同）
         */
        cancelApproveWithoutBpm: function(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
            withoutBpmCallback, cancelApproveUrl) {
            var selectedData = viewModel[listCompId].getSimpleData({
                type: "select"
            });
            var cancel_Approve_Url = cancelApproveUrl;
            if (selectedData.length != 1) {
                toastr.error("请选择一条数据。");
                return;
            }
            for (var i = 0; i < selectedData.length; ++i) {
                var item = selectedData[i];
                if (item.state != 2 && item.state != 3 && item.state != 4) {
                    toastr.error("单据没有进行过审批，不能取消审批。");
                    return;
                }
                // if (item.state == 3 || item.state == 4) { // 王凤勇修改
                //     toastr.error("单据已经审批完成，不能取消审批。");
                //     return;
                // }
            }

            var doWithBpm = function() {
                toastr.warning("已配置审批流，需要在单据页面中进行处理。");
                if (withBpmCallback) {
                    withBpmCallback();
                }
            };
            var doWithoutBpm = function() {
                var billId = selectedData[0]["id"];
                var cancelUrl = cancel_Approve_Url ? cancel_Approve_Url : "/cancelApproveWithoutBpm"
                var url = appCtx + viewModel.applicationUrl + cancelUrl + "?billId=" + billId;
                $.ajax({
                    type: "post",
                    url: url,
                    contentType: "application/json;charset=utf-8",
                    success: function(result) {
                        if (result.success == "success") {
                            toastr.success();
                            viewModel.search();
                            if (withoutBpmCallback) {
                                withoutBpmCallback();
                            }
                        } else {
                            toastr.error(result.message);
                        }
                    }
                });
            };
            viewModel.findBillFlowConfig(billTypeCode, tranTypeCode, doWithBpm, doWithoutBpm);
        }
    };

    var viewModel = $.extend({}, eventBpm, bpmapprove.model);

    return {
        "model": viewModel
    };
});