define(["text!./bpmhandler.html"], function (template) {
//	var dialogmin=require('dialogmin');	

    //--------------start 流程meta---------------------------
    //驳回meta
    var metaReject = {
        meta: {
            "activityId": {
                type: "string"
            },
            "activityName": {
                type: "string"
            }
//			   , 
//			'participants':{
//				//type:'string'
//			 }
        }
    };

    //人员列表
    var metaPerson = {
        meta: {
            "id": {
                type: "string"
            },
            "name": {
                type: "string"
            },
            "code": {
                type: "string"
            },
            "createTime": {
                type: "date"
            }
        }
    };

    //start HistoryTask 历史任务
    var metaHistoyTask = {
        meta: {
            //主键
            "id": {
                type: "string"
            },
            //活动名称
            "name": {
                type: "string"
            },
            //任务开始时间
            "startTime": {
                type: "date"
            },
            //任务拥有者
            "owner": {
                type: "string"
            },
            //流程实例id
            "processInstanceId": {
                type: "string"
            },
            //结束时间
            "endTime": {
                type: "date"
            },
            //流程实例状态
            "state": {
                type: "string"
            },
            //审批类型
            "description": {
                type: "string"
            },
            //完成原因
            "deleteReason": {
                type: "string"
            },
            //执行人
            "executionId": {
                type: "string"
            },
            //超时时间
            "claimTime": {
                type: "date"
            }
        }

    };
    //end HistoryTask
    //--------------end 流程meta---------------------------

    //定义通过是否的字典属性
    window.BPMBillState = [
        {
            "value": "NotStart",
            "name": "开立"
        },
        {
            "value": "Run",
            "name": "审批中"
        },
        {
            "value": "End",
            "name": "审批通过"
        },
        {
            "value": "Cancellation",
            "name": "审批不通过"
        },
        {
            "value": "Suspended",
            "name": "挂起"
        }
    ];

    var viewModel = {
        //驳回列表
        rejectDa: new u.DataTable(metaReject),
        //改派人员列表
        personDa: new u.DataTable(metaPerson),
        //加签
        personAddDa: new u.DataTable(metaPerson),
        //流程历史
        flowHisDa: new u.DataTable(metaHistoyTask),
        // prefixurl: "/iuap_qy/",
        prefixurl: "/eiap-plus/",
        //审批点击流程图
        bpmImgApproveClickHandler: function (processDefinitionId, processInstanceId, flowHisDa1, showType) {
            //----------------------流程图start  -------------
            var postData = {
                processDefinitionId: processDefinitionId,
                processInstanceId: processInstanceId
            };
            $("#img_His").attr({
                "src": viewModel.prefixurl + "vendor/diagram-viewer/index.html?processDefinitionId=" +
                    postData.processDefinitionId + "&processInstanceId=" + postData.processInstanceId
            });
            $.ajax({
                type: "post",
                url: viewModel.prefixurl + "/process/hisTasklist",
                datatype: "json",
                data: JSON.stringify(postData),
                contentType: "application/json;charset=utf-8",
                success: function (res) {
                    if (res) {
                        if (res.statusCode == "200") {
                            if (res.data) {
                                flowHisDa1.setSimpleData(res.data);
                                flowHisDa1.setRowSelect(-1);
                            } else {
                                u.messageDialog({msg: "后台返回数据格式有误，请联系管理员", title: "数据错误", btnText: "确定"});
                            }
                        } else {
                            u.messageDialog({msg: res.message, title: "请求错误", btnText: "确定"});
                        }
                    } else {
                        u.messageDialog({msg: "后台返回数据格式有误，请联系管理员", title: "数据错误", btnText: "确定"});
                    }
                },
                error: function (er) {
                    u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
                }
            });
            $("#imgHistory_list").modal(showType);
            //---------------------- 流程图end  --------------
        }
    };

    // 打开单据时，添加头部按钮信息
    bpmBillHeader = function (divheader, billId, viewModel) {
        var bpmBillDiv = $(template).filter(".approveTypeRadio1").html();
        var jsonpar = {
            "billId": billId
        };
        // 隐藏页面中的审批流操作区域
        var hideBpmDom = function (ifHideImg) {
            bpmBillDiv = $(bpmBillDiv).map(function (index, dom) {
                var domId = $(dom).attr("id");
                if (domId == "approveTypeRadio" || domId == "billSubmitBpm") {
                    return;
                }
                if (ifHideImg === true && domId == "billImgBpm") {
                    return;
                }
                return dom;
            });
        };
        $.ajax({
            type: "post",
            url: viewModel.prefixurl + "/process/getbillbpm",
            data: JSON.stringify(jsonpar),
            dataType: "json",
            contentType: "application/json;charset=utf-8", //必需
            success: function (res) {
                if (res) {
                    if (res.msg) {
                      console.log("查找单据主键对应的流程定义报错！");
                      hideBpmDom(true);
                    }
                    var message = res.message;
                    if (message == "NoBpm") {
                        console.log("未找到单据主键对应的流程定义。");
                        hideBpmDom(true);
                    } else {
                        viewModel.processInstanceId = res.processInstanceId;
                        viewModel.processDefinitionId = res.processDefinitionId;
                        if (message == "NoTask") {
                            console.log("未找到单据主键对应的流程任务。");
                            hideBpmDom(false);
                        } else {
                            viewModel.taskId = res.taskId;
                        }
                    }
                    $(divheader).html(bpmBillDiv);
                    ko.cleanNode($(divheader)[0]);
                    // 绑定模型与页面元素
                    u.createApp({
                        el: divheader,
                        model: viewModel
                    });
                } else {
                    u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                }
            },
            error: function (er) {
                u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
            }
        });
        //fiter找自身元素。find找子元素
    };

    // 打开单据时，添加尾部流程图弹出框信息
    bpmBillFoot = function (divfoot, viewModel) {
        //fiter找自身元素。find找子元素
        $(divfoot).html($(template).filter(".bpmApproveFoot").html());
        ko.cleanNode($(divfoot)[0]);
        u.createApp({
            el: divfoot,
            model: viewModel
        });
    };

    // 审批时，添加头部按钮信息
    bpmApproveHeader = function (divheader, vstate, viewModel) {
        $(divheader).html($(template).filter(".approveTypeRadio" + vstate).html());
        ko.cleanNode($(divheader)[0]);
        u.createApp({
            el: divheader,
            model: viewModel
        });
    };

    // 审批时，添加尾部流程图，加签，指派弹出框信息
    bpmApproveFoot = function (divfoot, vstate, viewModel) {
        $(divfoot).html($(template).filter(".bpmApproveFoot").html());
        ko.cleanNode($(divfoot)[0]);
        u.createApp({
            el: divfoot,
            model: viewModel
        });
    };

    // 加签,搜索事件
    bpmAddSignSearchHandler = function () {
        //搜索条件
        var jsonpar = {
            "name": $("#txtsignAddSearth100").val()
        };
        $.ajax({
            type: "post",
            url: "../occ-cmpt/" + "users/assignee/getUserByName",
            data: JSON.stringify(jsonpar),
            dataType: "json",
            contentType: "application/json;charset=utf-8", //必需
            success: function (res) {
                if (res) {
                    if (res.flag != "success") {
                        viewModel.personAddDa.clear();
                        viewModel.personAddDa.setSimpleData(res);
                        //viewModel.personAddDa.setAllRowsUnSelect();
                        viewModel.personAddDa.setRowUnFocus();
                    } else {
                        u.messageDialog({msg: res.msg, title: "请求错误", btnText: "确定"});
                    }
                } else {
                    u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                }
            },
            error: function (er) {
                u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
            }
        });

    };

    // 加签,确认事件
    bpmAddSignOkHandler = function (taskId, processInstanceId, pmodel, successCallback) {
        var approvetype = $(document).find("#approveTypeRadio input[name=\"approvetype\"]:checked ").val();
        if (viewModel.personAddDa.getSelectedIndexs().length < 1) {
            u.messageDialog({
                msg: "请选择要加签的人员!",
                title: "提示",
                btnText: "OK"
            });
            return;
        }
        var userIds = [];   //放用户id
        var selectedDatas = viewModel.personAddDa.getSelectedDatas();
        for (var i = 0; i < selectedDatas.length; i++) {
            userIds.push(selectedDatas[i].data.id.value);
        }
        var jsonpar = {
            "approvetype": approvetype,
            "taskId": taskId,
            "processInstanceId": processInstanceId,
            "userIds": userIds,
            "comment": $("#approve_text").val()
        };
        $.ajax({
            type: "post",
            url: viewModel.prefixurl + "task/signaddtask/signadd",
            data: JSON.stringify(jsonpar),
            dataType: "json",
            contentType: "application/json;charset=utf-8", //必需
            success: function (res) {
                if (res) {
                    if (res.flag == "success") {
                        //u.messageDialog({msg:res.msg,title:'审批提示',btnText:'确定'});
                        $("#addsignDiv").modal("toggle");
                        $("#bpmDisplayBill").modal("toggle");
                        //viewModel.entityUndoDt.removeRow(viewModel.entityUndoDt.getCurrentIndex());
                        if (pmodel) {
                            pmodel.removeRow(pmodel.getCurrentIndex());
                        }
                        u.showMessage(
                            {msg: "<i class=\"fa fa-check-circle margin-r-5\"></i>" + res.msg, position: "center"});
                        if (successCallback) {
                            successCallback();
                        }
                    } else {
                        u.messageDialog({msg: res.msg, title: "请求错误", btnText: "确定"});
                    }
                } else {
                    u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                }
            },
            error: function (er) {
                u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
            }
        });

    };

    // 改派,搜索事件
    bpmDelegateSearchHandler = function () {
        //搜索条件
        var jsonpar = {
            "name": $("#txtDelegateSearth100").val()
        };
        $.ajax({
            type: "post",
            url: "../occ-cmpt/" + "users/assignee/getUserByName",
            data: JSON.stringify(jsonpar),
            dataType: "json",
            contentType: "application/json;charset=utf-8", //必需
            success: function (res) {
                if (res) {
                    if (res.flag != "success") {
                        viewModel.personDa.clear();
                        viewModel.personDa.setSimpleData(res);
                        //viewModel.personAddDa.setAllRowsUnSelect();
                        viewModel.personDa.setRowUnFocus();
                    } else {
                        u.messageDialog({msg: res.msg, title: "请求错误", btnText: "确定"});
                    }
                } else {
                    u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                }
            },
            error: function (er) {
                u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
            }
        });
    };

    // 改派,确认事件
    bpmDelegateOkHandler = function (taskId, processInstanceId, pmodel, successCallback) {
        var approvetype = $(document).find("#approveTypeRadio input[name=\"approvetype\"]:checked ").val();
        if (viewModel.personDa.getSelectedIndexs().length < 1) {
            u.messageDialog({
                msg: "请选择要改派的人员!",
                title: "提示",
                btnText: "OK"
            });
            return;
        }
        var jsonpar = {
            "approvetype": approvetype,
            "taskId": taskId,
            "processInstanceId": processInstanceId,
            "userId": viewModel.personDa.getValue("id"),
            "comment": $("#approve_text").val()
        };
        $.ajax({
            type: "post",
            url: viewModel.prefixurl + "task/delegatetask/delegate",
            data: JSON.stringify(jsonpar),
            dataType: "json",
            contentType: "application/json;charset=utf-8", //必需
            success: function (res) {
                if (res) {
                    if (res.flag == "success") {
                        //u.messageDialog({msg:res.msg,title:'审批提示',btnText:'确定'});
                        $("#personDiv").modal("toggle");
                        $("#bpmDisplayBill").modal("toggle");
                        //viewModel.entityUndoDt.removeRow(viewModel.entityUndoDt.getCurrentIndex());
                        if (pmodel) {
                            pmodel.removeRow(pmodel.getCurrentIndex());
                        }
                        u.showMessage(
                            {msg: "<i class=\"fa fa-check-circle margin-r-5\"></i>" + res.msg, position: "center"});
                        if (successCallback) {
                            successCallback();
                        }
                    } else {
                        u.messageDialog({msg: res.msg, title: "请求错误", btnText: "确定"});
                    }
                } else {
                    u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                }
            },
            error: function (er) {
                u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
            }
        });

    };

    // 驳回或者指派,确认事件
    bpmRejectOkHandler = function (taskId, processInstanceId, pmodel, successCallback) {
        // var approvetype = $('#tree-modal  input[name="approvetype"]:checked ').val();
        var approvetype = $(document).find("#approveTypeRadio input[name=\"approvetype\"]:checked ").val();
        var comment = $(document).find("#approve_text").val();
        if (viewModel.rejectDa.getSelectedIndexs().length < 1) {
            u.messageDialog({
                msg: "请选择一个活动环节!",
                title: "提示",
                btnText: "OK"
            });
            return;
        }
        var jsonpar = {
            taskId: taskId,
            processInstanceId: processInstanceId,
            activityId: viewModel.rejectDa.getValue("activityId"),
            approvetype: approvetype,
            comment: comment
        };
        var posturl = viewModel.prefixurl + "task/rejecttask/reject";
        if (approvetype == "agree") {
            posturl = viewModel.prefixurl + "task/assigntask/commit";
            jsonpar = {
                "taskId": taskId,
                "activityId": viewModel.rejectDa.getValue("activityId"),
                "processInstanceId": processInstanceId,
                "comment": $("#approve_text").val()
            };
        }
        $.ajax({
            type: "post",
            url: posturl,
            data: JSON.stringify(jsonpar),
            dataType: "json",
            contentType: "application/json;charset=utf-8", //必需
            success: function (res) {
                if (res) {
                    if (res.flag == "success") {
                        //u.messageDialog({msg:res.msg,title:'审批提示',btnText:'确定'});
                        $("#rejectDiv").modal("toggle");
                        $("#bpmDisplayBill").modal("toggle");
                        //viewModel.entityDoneDt.removeRow(viewModel.entityUndoDt.getCurrentIndex());
                        if (pmodel) {
                            pmodel.removeRow(pmodel.getCurrentIndex());
                        }
                        message(res.msg);
                        if (successCallback) {
                            successCallback();
                        }
                    } else {
                        u.messageDialog({msg: res.msg, title: "请求错误", btnText: "确定"});
                    }
                } else {
                    u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                }
            },
            error: function (er) {
                u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
            }
        });

    };

    // 审批
    bpmApproveHandler = function (taskId, processInstanceId, processDefinitionId, pmodel, successCallback) {
        var approvetype = $("#bpmhead  input[name=\"approvetype\"]:checked ").val();
        var comment = $("#approve_text").val();
        if (!comment) {
            message("意见不能为空", "error");
            return;
        }
        var jsonpar = {
            "taskId": taskId,
            "processInstanceId": processInstanceId,
            "processDefinitionId": processDefinitionId,
            "comment": comment,
            "approvetype": approvetype
        };
        if (approvetype == "agree" || approvetype == "unagree") {
            $.ajax({
                type: "post",
                url: viewModel.prefixurl + "task/completetask/approveCard",
                data: JSON.stringify(jsonpar),
                dataType: "json",
                contentType: "application/json;charset=utf-8", //必需
                success: function (res) {
                    if (res) {
                        if (res.flag == "success") {
                            if ($("#bpmDisplayBill").length) {
                                $("#bpmDisplayBill").modal("toggle");
                                if (pmodel) {
                                    pmodel.removeRow(pmodel.getCurrentIndex());
                                }
                                message(res.msg);
                            } else {
                                message(res.msg);
                                if (pmodel) {
                                    pmodel.md.dBack();
                                }
                            }
                            if (successCallback) {
                                successCallback();
                            }
                        } else if (res.assignAble) {
                            viewModel.rejectDa.setSimpleData(res.assignList);
                            viewModel.rejectDa.setRowSelect(-1);
                            viewModel.rejectDa.setRowUnFocus();
                            $("#rejectDiv").modal("show");
                        } else {
                            u.messageDialog({msg: res.msg, title: "请求错误", btnText: "确定"});
                        }
                    } else {
                        u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                    }
                },
                error: function (er) {
                    u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
                }
            });
        }

        // 驳回到制单人
        if (approvetype == "rejectToBillMaker") {
            jsonpar.activityId = "markerbill";
            $.ajax({
                type: "post",
                url: viewModel.prefixurl + "task/rejecttask/reject",
                data: JSON.stringify(jsonpar),
                dataType: "json",
                contentType: "application/json;charset=utf-8", //必需
                success: function (res) {
                    if (res) {
                        if (res.flag == "success") {
                            $("#bpmDisplayBill").modal("toggle");
                            message(res.msg);
                            if (pmodel) {
                                pmodel.removeRow(pmodel.getCurrentIndex());
                            }
                            if (successCallback) {
                                successCallback();
                            }
                        } else {
                            $("#bpmDisplayBill").modal("toggle");
                            message(res.msg);
                        }
                    } else {
                        u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                    }
                },
                error: function (er) {
                    u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
                }
            });
        }

        // 驳回到环节
        if (approvetype == "rejectToActivity") {
            $.ajax({
                type: "post",
                url: viewModel.prefixurl + "task/rejecttask/bfreject",
                data: JSON.stringify(jsonpar),
                dataType: "json",
                contentType: "application/json;charset=utf-8", //必需
                success: function (res) {
                    if (res) {
                        if (res.flag == "success") {
                            viewModel.rejectDa.setSimpleData(res.rejectlist);
                            //viewModel.rejectDa.setRowSelect(-1);
                            //viewModel.rejectDa.setRowUnFocus() ;
                            $("#rejectDiv").modal("show");
                        } else {
                            $("#bpmDisplayBill").modal("toggle");
                            u.showMessage({position: "center", msg: res.msg});
                        }
                    } else {
                        u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                    }
                },
                error: function (er) {
                    u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
                }
            });
        }

        // 改派
        if (approvetype == "delegate") {
            $.ajax({
                type: "post",
                url: "../occ-cmpt/" + "users/assignee/getlist",
                data: JSON.stringify(jsonpar),
                dataType: "json",
                contentType: "application/json;charset=utf-8", //必需
                success: function (res) {
                    if (res) {
                        if (res.flag != "success") {
                            viewModel.personDa.setSimpleData(res);
                            viewModel.personDa.setRowSelect(-1);
                            viewModel.personDa.setRowUnFocus();
                            $("#personDiv").modal("show");
                        } else {
                            u.messageDialog({msg: res.msg, title: "驳回提示", btnText: "确定"});
                        }
                    } else {
                        u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                    }
                },
                error: function (er) {
                    u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
                }
            });
        }

        // 加签
        if (approvetype == "signAdd") {
            $.ajax({
                type: "post",
                url: "../occ-cmpt/" + "users/assignee/getlist",
                data: JSON.stringify(jsonpar),
                dataType: "json",
                contentType: "application/json;charset=utf-8", //必需
                success: function (res) {
                    if (res) {
                        if (res.flag != "success") {
                            viewModel.personAddDa.setSimpleData(res);
                            //viewModel.personAddDa.setAllRowsUnSelect();
                            viewModel.personAddDa.setRowUnFocus();
                            $("#addsignDiv").modal("show");
                        } else {
                            u.messageDialog({msg: res.msg, title: "加签提示", btnText: "确定"});
                        }
                    } else {
                        u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                    }
                },
                error: function (er) {
                    u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
                }
            });
        }

        // 终止
        if (approvetype == "termination") {
            $.ajax({
                type: "post",
                url: viewModel.prefixurl + "task/terminationtask/termination",
                data: JSON.stringify(jsonpar),
                dataType: "json",
                contentType: "application/json;charset=utf-8", //必需
                success: function (res) {
                    if (res) {
                        if (res.flag == "success") {
                            //u.messageDialog({msg:res.msg,title:'审批提示',btnText:'确定'});
                            $("#bpmDisplayBill").modal("toggle");
                            //viewModel.entityUndoDt.removeRow(viewModel.entityUndoDt.getCurrentIndex());
                            u.showMessage(
                                {msg: "<i class=\"fa fa-check-circle margin-r-5\"></i>" + res.msg, position: "center"});
                            if (pmodel) {
                                pmodel.removeRow(pmodel.getCurrentIndex());
                            }
                            if (successCallback) {
                                successCallback();
                            }
                        } else if (res.assignAble) {
                            viewModel.rejectDa.setSimpleData(res.assignList);
                            viewModel.rejectDa.setRowSelect(-1);
                            viewModel.rejectDa.setRowUnFocus();
                            $("#rejectDiv").modal("show");
                        } else {
                            u.messageDialog({msg: res.msg, title: "请求错误", btnText: "确定"});
                        }
                    } else {
                        u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                    }
                },
                error: function (er) {
                    u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
                }
            });
        }

        // 弃审
        if (approvetype == "withdraw") {
            $.ajax({
                type: "post",
                url: viewModel.prefixurl + "task/withdrawtask/withdraw",
                data: JSON.stringify(jsonpar),
                dataType: "json",
                contentType: "application/json;charset=utf-8", //必需
                success: function (res) {
                    if (res) {
                        if (res.flag == "success") {
                            //u.messageDialog({msg:res.msg,title:'审批提示',btnText:'确定'});
                            $("#bpmDisplayBill").modal("toggle");
                            //viewModel.entityDoneDt.removeRow(viewModel.entityUndoDt.getCurrentIndex());
                            u.showMessage(
                                {msg: "<i class=\"fa fa-check-circle margin-r-5\"></i>" + res.msg, position: "center"});
                            if (pmodel) {
                                pmodel.removeRow(pmodel.getCurrentIndex());
                            }
                            if (successCallback) {
                                successCallback();
                            }
                        } else {
                            u.messageDialog({msg: res.msg, title: "请求错误", btnText: "确定"});
                        }
                    } else {
                        u.messageDialog({msg: "后台返回数据格式有误", title: "数据错误", btnText: "确定"});
                    }
                },
                error: function (er) {
                    u.messageDialog({msg: er, title: "请求错误", btnText: "确定"});
                }
            });
        }
    };

    // 审批类型
    bpmApproveTypeShowHandler = function (vApproveType) {
        if (vApproveType == "submit") {
            return "提交";
        }
        if (vApproveType == "agree") {
            return "审批";
        }
        if (vApproveType == "unagree") {
            return "不同意";
        }
        if (vApproveType == "reject") {
            return "驳回";
        }
        if (vApproveType == "signAdd") {
            return "加签";
        }
        if (vApproveType == "assignAgree") {
            return "指派提交";
        }
        if (vApproveType == "signAdding") {
            return "加签中";
        }
        if (vApproveType == "delegate") {
            return "改派";
        }
        if (vApproveType == "termination") {
            return "终止";
        }
        if (vApproveType == "withdraw") {
            return "弃审";
        }
    };

    //流程显示状态为查看browse时，流程审批框隐藏，只能查看流程图，不能做审批业务
    bpmApproveBrowseHandler = function () {
        $("#bpmDisplayBill").find("#bpmhead").find("#approveTypeRadio")[0].style.display = "none";
        $("#bpmDisplayBill").find("#bpmhead").find("#approveButton")[0].style.display = "none";
    };

    //隐藏查询框
    bpmHideQueryInfoHandler = function (divId) {
        $("#bpmDisplayBill")[0].querySelector(divId).style.display = "none";
    };
    //显示页面的滚动条
    bpmShowBillScrollHandler = function (divId) {
        $("#bpmDisplayBill")[0].querySelector(divId).style.overflow = "auto";
    };
    //单据上的返回返回
    bpmBack = function () {
        $("#bpmDisplayBill").modal("hide");
    };
    //流程图上的返回
    bpmImgBack = function () {
        $("#imgHistory_list").modal("toggle");
    };
    //加签返回
    bpmAddSignBack = function () {
        $("#addsignDiv").modal("toggle");
    };
    //改派返回
    bpmDelegateBack = function () {
        $("#personDiv").modal("toggle");
    };
    //驳回返回
    bpmRejectBack = function () {
        $("#rejectDiv").modal("toggle");
    };

    return {
        "model": viewModel
    };
});