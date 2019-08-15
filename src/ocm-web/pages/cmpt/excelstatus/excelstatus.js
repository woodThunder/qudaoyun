define(['text!./excelstatus.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global', 'css!./excelstatus.css'], function (tpl, common, searchbox) {
    'use strict';
    // 行业扩展开关
    window.modelExtendSwitch = false;
    // 模板开关（查询模板，单据模板）
    window.customSwitch = false;
    // 权限开关(按钮权限)
    window.authSwitch = false;

    var app, baseData, events, rendertype, viewModel, singledocSearch;

    var BILLPANELSTATUS = {
        DETAIL: "detail",
        DEFAULT: "default"
    };

    baseData = {
        baseurl: '/excel-status',
        excelStatusList: new u.DataTable(window.excelStatusTmpl.meta),
        billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
        // 跳转详情页
        goDetailPanel: common.bill.goDetailPanel,
        whetherFmt: ko.pureComputed(function () {
            var queryStatus = viewModel.excelStatusList.ref("queryStatus")();
            return queryStatus === "finish" ? "数据查询完毕" : queryStatus;
        }),
        statusFmt: ko.pureComputed(function () {
            var exportStatus = viewModel.excelStatusList.ref("exportStatus")();
            return exportStatus === "100" ? "导出完毕" : exportStatus;
        }),
    };

    rendertype = {
        operation: common.rendertype.operation,
        enableStatusRender: common.rendertype.enableRender,
        detailRender: common.rendertype.detailRender,
        whetherRender: common.rendertype.whetherRender,
        conditionSource: ko.observableArray([]),
        operationRole: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];

            var downloadfun =
                    "data-bind=click:downloadNew.bind($data," +
                    obj.rowIndex +"," +
                    dataTableRowId +")";
            var deletefun =
                "data-bind=click:del.bind($data," +
                obj.rowIndex +"," +
                dataTableRowId +")";

            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a ' +
                downloadfun +
                ' title="下载">下载</a>' +
                "</span>" +
                '<span class="ui-handle-word">' +
                '<a ' +
                deletefun +
                ' title="删除">删除</a>' +
                "</span>" +
                "</div>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        queryStatusRender: function (obj) {
            var showValue = "";
            var queryStatus = obj.value;
            if (queryStatus == "start") {
                showValue = "数据查询中...";
            } else {
                showValue = "数据查询完毕";
            }
            obj.element.innerHTML = showValue;
        },
        exportStatusRender: function (obj) {
            var showValue = "";
            var exportStatus = obj.value;
            if (exportStatus == "100") {
                showValue = "导出完毕";
            } else {
                showValue = exportStatus;
            }
            obj.element.innerHTML = showValue;
        }
    };

    events = {
        download: function (index, rowId) {
            var data = viewModel.excelStatusList.getSimpleData()[index];
            viewModel.filePath = data.filePath
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + "/excelExportFile",
                dataType: "json",
                data: {
                    filePath: data.filePath
                },
                success: function () {
                }
            })

        },

        downloadNew:function exportOk(index, rowId) {
            viewModel.excelStatusList.setRowSelectbyRowId(rowId);
            var data = viewModel.excelStatusList.getRowByRowId(rowId).getSimpleData();
            viewModel.filePath = data.filePath
            viewModel.fileName = data.name

            $("#exportForm").remove();
            var form = $(
                "<form id='exportForm'><iframe id='exportIframe' name='exportFrame' frameborder='0'></iframe></form>"
            ); //定义一个form表单
            form.attr("style", "display:none"); //在form表单中添加查询参数
            form.attr("target", "exportFrame");
            form.attr("method", "get");
            form.attr("action", appCtx + viewModel.baseurl + "/excelExportFile");

            var input1 = $("<input>");
            input1.attr("type", "hidden");
            input1.attr("name", "filePath");
            input1.attr("value", data.filePath);

            var input2 = $("<input>");
            input2.attr("type", "hidden");
            input2.attr("name", "fileName");
            input2.attr("value", data.name);

            $("body").append(form); //将表单放置在web中
            form.append(input1); //将查询参数控件提交到表单上
            form.append(input2);
            var ifr = document.getElementById("exportIframe");
            form.submit();
        },

        //删除和批量删除
        del: function (data, rowId) {
            if (typeof (data) === 'number') {
                viewModel.excelStatusList.setRowSelectbyRowId(rowId);
            }
            var ids = [];
            var rows = viewModel.excelStatusList.getSelectedRows();
            if (rows.length === 0) {
                toastr.error("请选择数据");
                return
            }
            var row = rows[0];
            var id = row.getValue("id");
            var filePath = row.getValue("filePath");
            // if (rows && rows.length > 0) {
            //     for (var i = 0; i < rows.length; i++) {
            //         ids.push(rows[i].getValue("id"));
            //     }
            // }
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
                            // id: ids.join(",")
                            id: id,
                            filePath: filePath
                        },
                        success: function (data) {
                            viewModel.excelStatusList.removeRows(row);
                        }
                    });

                }
            });
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if (reindex) {
                viewModel.excelStatusList.pageIndex(0);
            }
            viewModel.excelStatusList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            var pageSize = viewModel.excelStatusList.pageSize();
            var pageNumber = viewModel.excelStatusList.pageIndex();
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + "/excelExportStatus",
                dataType: "json",
                data: queryData,
                success: function (data) {
                    viewModel.excelStatusList.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.excelStatusList.totalRow(data.totalElements);
                    viewModel.excelStatusList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function () {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.excelStatusList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.excelStatusList.pageSize(size);
            viewModel.search(true);
        },

        detail: function () {
            //确保grid先将行设置为focus状态
            setTimeout(function () {
                var curRow = viewModel.excelStatusList.getCurrentRow();
                var id = curRow.getValue("id");
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                viewModel.goDetailPanel();
            }, 0);
        },
        //跳转单据详情页
        showBillDetail: function () {
            $(".ui-list-panel").addClass("animated slideInLeft");
            $(".ui-bill-panel").addClass("animated slideOutDown");
        },
        // 放回列表页
        retListPanel: function () {
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
            common.bill.retListPanel();
        },
    }
    viewModel = u.extend({}, baseData, events, rendertype /*, bpmopenbill.model*/ );

    function appInit(element, params) {
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        window.initButton(viewModel, element); //初始化按钮权限
        ko.cleanNode(element);
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        // 查询组件初始化
        singledocSearch = new searchbox(
            $("#ProductCombine-searchcontent")[0], [
                {
                    type: "text",
                    key: "name",
                    label: "名称",
                }
            ]);
        // 列表查询数据(无查询条件)
        viewModel.search();
    }

    function init(element, params) {
        appInit(element, params);
        window.vm = viewModel;
    }

    return {
        init: init
    }
});