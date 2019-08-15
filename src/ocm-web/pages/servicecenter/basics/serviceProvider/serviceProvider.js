define(['text!./serviceProvider.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function (tpl, common, searchbox) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch;
    baseData = {
        baseurl: '/sc/service-providers',
        providerList: new u.DataTable(providerMeta),
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,
        //服务商类型
        providerTypeSrc: [{
            value: "01",
            name: "外部单位"
        }, {
            value: "02",
            name: "内部单位"
        }],
        //启停状态
        enableStatusSrc: [{
            value: "1",
            name: "启用"
        }, {
            value: "0",
            name: "停用"
        }],
        //服务类型
        serviceTypeSrc: [{
            value: "0",
            name: "配送"
        }, {
            value: "1",
            name: "安装"
        },{
            value: "2",
            name: "维修"
        }, {
            value: "3",
            name: "施工"
        }],
        billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
    };
    rendertype = {
        //跳转详情页
        detailRender: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value['$_#_@_id'];
            var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
            obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        operation: function (obj) {
            var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
            var editfun = "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + ")";
            obj.element.innerHTML = '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" class="" ' +
                editfun +
                ' title="编辑">编辑</a>' +
                '</span>    ' +
                '<span class="ui-handle-word">' +
                '<a href="#" class="" ' +
                delfun +
                ' title="删除">删除</a>' +
                '</span></div>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        clearRender: function (obj) {
            var clearfun = "data-bind=click:clear.bind($data," + obj.rowIndex + ")";
            obj.element.innerHTML = '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" class="" ' +
                clearfun +
                ' title="清空">清空</a>' +
                '</span></div>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        }
    };
    events = {
        //编辑状态
        editHandle: function () {
            $(".ui-bill-detail").hide();
            $(".ui-bill-panel").show();
            self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        },
        //删除和批量删除
        del: function (data) {
            if (typeof (data) == 'number') {
                viewModel.providerList.setRowSelect(data);
            }
            var ids = [];
            var rows = viewModel.providerList.getSelectedRows();
            if (rows && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
            } else {
                toastr.warning('请选择数据');
                return;
            }
            if (rows && rows.length > 0) {
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
                                viewModel.providerList.removeRows(rows);
                                viewModel.search();
                            }
                        });
                    }
                });
            } else {
                toastr.warning('请选择数据');
                return;
            }
        },
        //新增
        showAddBillPanel: function (index) {
            var curRow = viewModel.providerList.createEmptyRow();
            viewModel.providerList.setRowFocus(curRow);
            viewModel.goBillPanel();
            $("#code-input").removeAttr("readonly");
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
        },
        //进入修改单据页
        showEditBillPanel: function (index) {
            viewModel.providerList.setRowFocus(index);
            var id = viewModel.providerList.getCurrentRow().getValue("id");
            viewModel.providerList.originEditData = viewModel.providerList.getFocusRow().getSimpleData();
            viewModel.goBillPanel();
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
            $("#code-input").attr("readonly", "readonly");
        },
        //查看详情
        detail: function (index, rowId) {
            //			viewModel.processOrderList.setRowFocus(index);
            viewModel.providerList.setRowSelectbyRowId(rowId);
            var id = viewModel.providerList.getCurrentRow().getValue("id");
            viewModel.goDetailPanel();
        },
        //保存单据
        saveBill: function () {
            var type = "post";
            if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
                type = "put";
            }
            var providerData = viewModel.providerList.getCurrentRow().getSimpleData();
            var validate = $("#validate")[0];
            var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
            if (result.passed) {
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(providerData),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        viewModel.providerList.getFocusRow().setSimpleData(data);
                        viewModel.search();
                        viewModel.retListPanel();
                    }
                });
            }
        },
        //点击取消 单据页
        cancelHandle: function () {
            var curRow = viewModel.providerList.getCurrentRow();
            // 修改，则还原
            if (curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.providerList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.providerList.removeRow(curRow);
            }
            viewModel.retListPanel();
        },
        //启用
        enable: function () {
            var selectedRows = viewModel.providerList.getSelectedRows();
            var ids = [];
            var status = [];
            var statustip = "";
            if (selectedRows && selectedRows.length > 0) {
                for (var i = 0; i < selectedRows.length; i++) {
                    ids.push(selectedRows[i].getValue("id"));
                    if (selectedRows[i].getValue("isEnable") == 1 || selectedRows[i].getValue("isEnable") == "1") {
                        status.push(selectedRows[i].getValue("code"));
                    }
                }
                if (status.length > 0) {
                    function statusArr() {
                        for (i = 0; i < status.length; i++) {
                            statustip += status[i] + "，";
                        }
                        return statustip.substring(0, statustip.length - 1)
                    }
                    toastr.warning("数据   " + statusArr() + " 不可重复启用");
                    return false
                }
                ids = ids.join(",");
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/batch-enable",
                    data: { ids: ids },
                    success: function (res) {
                        for (var i = 0; i < selectedRows.length; i++) {
                            selectedRows[i].setValue("isEnable", "1");
                        }
                        toastr.success("启用成功");
                    }
                })
            }
            else {
                toastr.warning("请先选择需要启用数据");
            }
        },
        //停用
        disable: function () {
            var selectedRows = viewModel.providerList.getSelectedRows();
            var ids = [];
            var status = [];
            var statustip = "";
            if (selectedRows && selectedRows.length > 0) {
                for (var i = 0; i < selectedRows.length; i++) {
                    ids.push(selectedRows[i].getValue("id"));
                    if (selectedRows[i].getValue("isEnable") == 0 || selectedRows[i].getValue("isEnable") == "0") {
                        status.push(selectedRows[i].getValue("code"));
                    }
                }
                if (status.length > 0) {
                    function statusArr() {
                        for (i = 0; i < status.length; i++) {
                            statustip += status[i] + "，";
                        }
                        return statustip.substring(0, statustip.length - 1)
                    }
                    toastr.warning("数据   " + statusArr() + " 不可重复停用");
                    return false
                }
                ids = ids.join(",");
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/batch-disable",
                    data: { ids: ids },
                    success: function (res) {
                        for (var i = 0; i < selectedRows.length; i++) {
                            selectedRows[i].setValue("isEnable", "0");
                        }
                        toastr.success("停用成功");
                    }
                })
            }
            else {
                toastr.warning("请先选择需要停用数据")
            }
        },
        //详情启用状态
        status: function () {
            var statusValue = viewModel.providerList.getValue('isEnable');
            if (statusValue === null) {
                viewModel.providerList.setValue('isEnable', 1);
            }
            var showName;
            statusValue == 1 ? showName = "启用" : showName = "停用";
            return showName;
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if (reindex) {
                viewModel.providerList.pageIndex(0);
            }
            viewModel.providerList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            queryData.size = viewModel.providerList.pageSize();
            queryData.page = viewModel.providerList.pageIndex();
            $.ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function (data) {
                    viewModel.providerList.setSimpleData(data.content, { unSelect: true });
                    viewModel.providerList.totalRow(data.totalElements);
                    viewModel.providerList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function () {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.providerList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.providerList.pageSize(size);
            viewModel.search(true);
        }
    }
    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

    function appInit(element, params) {
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        // 查询组件初始化
        singledocSearch = new searchbox(
            $("#providerList-searchcontent")[0], [
            //     {
            //     type: "refer",
            //     key: "grade--id",
            //     label: "服务商等级",
            //     refinfo: "sc-spg-ref",
            //     refName: "服务商等级"
            // },
            {
                type: "text",
                key: "code",
                label: "服务商编码"
            },
            {
                type: "text",
                key: "name",
                label: "服务商名称"
            }
            ]);
        // 列表查询数据(无查询条件)
        viewModel.search();
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#providerList-searchcontent input').off("keydown").on("keydown", function (e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });


        viewModel.providerList.on("provinceId.valuechange", function (obj) {
            var row = viewModel.providerList.getCurrentRow();
            var provinceId = row.getValue("provinceId");
            $("#city").attr("data-refparam", '{"EQ_areaLevel":"2","EQ_parent.id":"' + provinceId + '"}');
            $("#city input").val('');
            $("#district input").val('');
            $("#town input").val('');


        });

        //省市联动 
        viewModel.providerList.on("cityId.valuechange", function (obj) {
            var row = viewModel.providerList.getCurrentRow();
            var cityId = row.getValue("cityId");
            $("#district").attr("data-refparam", '{"EQ_areaLevel":"3","EQ_parent.id":"' + cityId + '"}');
            $("#district input").val('');
            $("#town input").val('');

        });
        //市区联动
        viewModel.providerList.on("districtId.valuechange", function (obj) {
            var row = viewModel.providerList.getCurrentRow();
            var districtId = row.getValue("districtId");
            $("#town").attr("data-refparam", '{"EQ_areaLevel":"4","EQ_parent.id":"' + districtId + '"}');
            $("#town input").val('');
        });
        //区镇联动
        viewModel.providerList.on("townId.valuechange", function (obj) {

        });

    }

    function init(element, params) {
        appInit(element, params);
        afterRender();
        window.vm = viewModel;
    }

    return {
        init: init
    }
});