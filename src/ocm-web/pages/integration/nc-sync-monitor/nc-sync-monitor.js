define(["text!./nc-sync-monitor.html", 'ocm_simpleview', './meta.js'], function (tpl, simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        tpl: tpl,
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/integration/mains',
            childurl: '/integration/clustors',
            simpleList: new u.DataTable(model.options.metas.ncSyncMonitorMeta),
            childList: new u.DataTable(model.options.metas.childmeta),
            statusField: 'isEnable',
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2
        },
        rendertype: u.extend({}, simpleview.pro, {
            enableRender: function (params) {
                if (params.value == 1 || params.value == "1") {
                    params.element.innerHTML = "成功";
                } else if (params.value == 2 || params.value == "2") {
                    params.element.innerHTML = "失败";
                } else if (params.value == 3 || params.value == "3") {
                    params.element.innerHTML = "进行中";
                }
            },
            appendRender: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var detailfun =
                    "data-bind=click:appendFn.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    '<a href="#" class="ui-a-detail" ' +
                    detailfun +
                    ">" +
                    obj.value +
                    "</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            openDetailRender: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var detailfun =
                    "data-bind=click:openDetail.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    '<a href="#" class="ui-a-detail" ' +
                    detailfun +
                    ">" +
                    obj.value +
                    "</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
        }),

        events: u.extend({}, simpleview.prototype.events, {
            resend: function(traceId) {
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/re-try-to-nc",
                    data: {
                        traceId: traceId
                    },
                    success: function(res) {
                        toastr.warning(res);
                    }
                });
            },
            send: function(traceId) {
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/re-try-to-occ",
                    data: {
                        traceId: traceId
                    },
                    success: function(res) {
                        toastr.warning(res);
                    }
                });
            },
            operation4single: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                //获取traceId
                var traceId = obj.row.value["traceId"];
                //获取状态
                var state = obj.row.value["isEnable"];
                //获取来源
                var source = obj.row.value["source"];
                if ("nc"!=source){
                    var delfun =
                        "data-bind=click:resend.bind($data,'" +
                        traceId +
                        "')";
                    if (state!=1) {
                        obj.element.innerHTML =
                            '<div class="ui-handle-icon">' +
                            '<span class="ui-handle-word">' +
                            '<a href="#" ' +
                            delfun +
                            ' title="重试">重试</a>' +
                            "</span></div>";
                        ko.cleanNode(obj.element);
                        ko.applyBindings(viewModel, obj.element);
                    }
                } else {
                    var delfun =
                        "data-bind=click:send.bind($data,'" +
                        traceId +
                        "')";
                    if (state!=1) {
                        obj.element.innerHTML =
                            '<div class="ui-handle-icon">' +
                            '<span class="ui-handle-word">' +
                            '<a href="#" ' +
                            delfun +
                            ' title="重试">重试</a>' +
                            "</span></div>";
                        ko.cleanNode(obj.element);
                        ko.applyBindings(viewModel, obj.element);
                    }
                }


            },
            search: function (reindex) {
                if (!viewModel.searchcomp) {
                    $("div.ui-searchbox").css("display", "none");
                    // return;
                }
                if (reindex) {
                    viewModel.simpleList.pageIndex(0);
                }
                viewModel.simpleList.removeAllRows();
                if (!viewModel.searchcomp) {
                    var queryData = {};
                } else {
                    var queryData = viewModel.searchcomp.getDataWithOpr
                        ? viewModel.searchcomp.getDataWithOpr()
                        : {};
                }
                queryData.size = viewModel.simpleList.pageSize();
                queryData.page = viewModel.simpleList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.simpleList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.simpleList.totalRow(data.totalElements);
                        viewModel.simpleList.totalPages(data.totalPages);
                    }
                });
            },
            appendFn:function(rowId){
                console.log()
                // var currentData = viewModel.childList
                //     .getRowByRowId(rowId)
                //     .getSimpleData();
                var currentData =  viewModel.childList.getSimpleData()[rowId]
                $("#sendContent")[0].innerHTML = "业务数据内容：<br>"+currentData.sendContent;
            },
            openDetail: function (index, rowId) {
                var currentData = viewModel.simpleList
                    .getRowByRowId(rowId)
                    .getSimpleData();
                if (!viewModel.dialog_detail) {
                    viewModel.dialog_detail = u.dialog({
                        id: "dialog_detail",
                        content: "#dialog_detail",
                        hasCloseMenu: true,
                        width: "80%"
                    });
                } else {
                    viewModel.dialog_detail.show();
                }
                // $("#sendContent")[0].innerHTML = "业务数据内容：<br>"+currentData.sendContent;
                var queryData = {}
                queryData.traceId = currentData.traceId
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.childurl + "/get-info-by-traceid",
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.childList.setSimpleData(data, {
                            unSelect: true
                        });
                    }
                });
            }
        }),
    })
    return view;
});

