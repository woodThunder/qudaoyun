define(['text!./platstoremanage.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function(tpl, common, searchbox) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch, platStoreDetailDialog;
    baseData = {
        baseurl: '/b2c/stores',
        storeList: new u.DataTable(StoreMeta),
        storeParamList: new u.DataTable(StoreParamListMeta),
        //店铺类型枚举
        storeTypeSrc: ko.observableArray([]),
        storeSrc: [{
            name: 'SOP',
            value: '0'
        }, {
            name: 'FBP',
            value: '1'
        }, {
            name: 'LBP',
            value: '2'
        }, {
            name: 'SOPL',
            value: '5'
        }, ],
        //认证方式枚举
        authenticationSrc: ko.observableArray([]) || [{
            name: '服务商认证',
            code: '1'
        }, {
            name: '企业认证',
            code: '2'
        }, ],
        authSrc: [{
            name: '服务商认证',
            code: '1'
        }, {
            name: '企业认证',
            code: '2'
        }, ],
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,

        billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
    };
    rendertype = {
        //跳转详情页
        detailRender: function(obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value['$_#_@_id'];
            var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
            obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        operation: function(obj) {
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
        clearRender: function(obj) {
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
        editHandle: function() {
            // var self = this;
            // var isauditStatus = viewModel.storeList.getValue("auditStatus");
            // if (isauditStatus == "1" || isauditStatus == 1) {
            //     toastr.warning('该数据已审核不能编辑');
            //     return;
            // }
            $(".ui-bill-detail").hide();
            $(".ui-bill-panel").show();
            self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        },
        //清空店铺参数值
        clear: function(data) {
            viewModel.storeParamList.getRow(data).setValue("value", "");
            viewModel.storeParamList.getRow(data).setValue("remark", "");
        },
        //删除和批量删除
        del: function(data) {
            if (typeof(data) == 'number') {
                viewModel.storeList.setRowSelect(data);
            }
            var ids = [];
            var rows = viewModel.storeList.getSelectedRows();
            if (rows && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    // var isauditStatus = rows[i].getValue("auditStatus");
                    // if (isauditStatus == "1" || isauditStatus == 1) {
                    //     toastr.warning('该数据已审核不能删除');
                    //     return;
                    // }
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
                    onOk: function() {
                        $._ajax({
                            url: appCtx + viewModel.baseurl + "/delete",
                            type: "post",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function(data) {
                                viewModel.storeList.removeRows(rows);
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
        //同步数据通
        synchronousData: function(data, rowId) {
            var oid;

            var rowData = viewModel.storeList.getRowByRowId(rowId);
            var rows = viewModel.storeList.getSelectedRows();

            if (rowData) { //点击操作添加备注
                oid = rowData.getValue("id");
            } else { //复选 添加备注

                if (rows.length > 1) { //选择一条数据
                    toastr.error('不支持选择多条数据同步');
                    return;
                } else if (rows.length > 0) { //选择1条数据
                    //var curRow = viewModel.processOrderList.getRow(obj.rowIndex);
                    //ids.push(rows.getValue("id"));
                    oid = rows[0].getValue("id");
                } else {
                    toastr.error('请选择一条数据同步');
                    return;
                }

            }

            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + '/synstore2sjt',
                data: {
                    id: oid
                },
                success: function(data) {
                    toastr.success('数据同步成功');
                }
            });
        },
        //新增
        showAddBillPanel: function(index) {
            var curRow = viewModel.storeList.createEmptyRow();
            viewModel.storeList.setRowFocus(curRow);
            viewModel.storeParamList.removeAllRows();
            viewModel.goBillPanel();
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
            viewModel.storeList.setRowFocus(index);
            var id = viewModel.storeList.getCurrentRow().getValue("id");
            viewModel.storeList.originEditData = viewModel.storeList.getFocusRow().getSimpleData();
            viewModel.findByParentid(id);
            viewModel.goBillPanel();
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
            $("#code-input").attr("readonly", "readonly");
        },
        // 清除基类属性
        clearBaseProp: function(curRow) {
            curRow.setValue("id", null);
            curRow.setValue("creator", "");
            curRow.setValue("creationTime", "");
            curRow.setValue("modifier", "");
            curRow.setValue("modifiedTime", "");
        },
        //子表增行
        addRow: function() {
            var emptyRow = viewModel.storeParamList.createEmptyRow({
                unSelect: true
            });
        },
        //子表 删除和批量删除
        delChild: function() {
            var selectedRows = viewModel.storeParamList.getSelectedRows();
            if (selectedRows.length < 1) {
                toastr.warning("请选择数据");
                return;
            }
            viewModel.storeParamList.removeRows(selectedRows);
        },
        //查看详情
        detail: function(obj) {
            viewModel.storeList.setRowFocus(obj.rowIndex);
            if (obj) {
                var id = obj.rowObj.value.id;
                viewModel.findByParentid(id);
            } else {
                viewModel.storeList.setRowSelectbyRowId(rowId);
                var id = viewModel.storeList.getCurrentRow().getValue("id");
                //请求完整主子表信息
                viewModel.findByParentid(id);
                // viewModel.goDetailPanel();
            }
        },
        //查询子表数据
        findByParentid: function(id) {
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + '/detail',
                data: {
                    id: id
                },
                success: function(data) {
                    viewModel.storeParamList.removeAllRows();
                    viewModel.storeParamList.setSimpleData(data.storeParams, {
                        unSelect: true
                    });
                }
            })
        },
        //保存单据
        saveBill: function() {
            var type = "post";
            if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
                type = "put";
            }
            var storeData = viewModel.storeList.getCurrentRow().getSimpleData();
            var paramData = viewModel.storeParamList.getSimpleData();
            storeData.storeParams = paramData;
            var validate = $("#validate")[0];
            var result = app.compsValidateMultiParam({
                element: validate,
                showMsg: true
            });
            if (result.passed) {
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(storeData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        viewModel.storeList.getFocusRow().setSimpleData(data);
                        viewModel.search();
                        viewModel.retListPanel();
                    }
                });
            }
        },
        //点击取消 单据页
        cancelHandle: function() {
            var curRow = viewModel.storeList.getCurrentRow();
            // 修改，则还原
            if (curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.storeList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.storeList.removeRow(curRow);
                viewModel.storeParamList.removeAllRows();
            }
            viewModel.retListPanel();
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
            if (reindex) {
                viewModel.storeList.pageIndex(0);
            }
            viewModel.storeList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            queryData.size = viewModel.storeList.pageSize();
            queryData.page = viewModel.storeList.pageIndex();
            $.ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.storeList.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.storeList.totalRow(data.totalElements);
                    viewModel.storeList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function() {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
            viewModel.storeList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
            viewModel.storeList.pageSize(size);
            viewModel.search(true);
        }
    }
    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);
    viewModel.storeList.on("platformId.valuechange", function(obj) {
        if (!obj.newValue) {
            return;
        }
        var platformId = viewModel.storeList.getCurrentRow().getValue('platformId');
        $._ajax({
            type: "post",
            url: appCtx + "/b2c/platforms/platParams",
            data: {
                id: platformId
            },
            success: function(data) {
                viewModel.storeParamList.removeAllRows();
                var arrayObj = data.split(',');
                for (var i = 0; i < arrayObj.length; i++) {
                    var emptyRow = viewModel.storeParamList.createEmptyRow({
                        unSelect: true
                    });
                    emptyRow.setValue('param', arrayObj[i]);
                }
            }
        })
        //清空其他文本框内数据
        viewModel.storeList.getCurrentRow().setValue("code", "");
        viewModel.storeList.getCurrentRow().setValue("name", "");
        viewModel.storeList.getCurrentRow().setValue("storetype", "");
        viewModel.storeList.getCurrentRow().setValue("authentication", "");
        viewModel.storeList.getCurrentRow().setValue("shopTime", "");
        viewModel.storeList.getCurrentRow().setValue("remark", "");
    })

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
            $("#storeList-searchcontent")[0], [{
                type: "refer",
                key: "platform--id",
                label: "所属平台",
                refinfo: "b2cplatform",
                refName: "所属平台"
            }, {
                type: "text",
                key: "code",
                label: "店铺编码"
            }, {
                type: "text",
                key: "name",
                label: "店铺名称"
            }]);
        // 列表查询数据(无查询条件)
        viewModel.search();
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#storeList-searchcontent input').off("keydown").on("keydown", function(e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });

        //店铺类型枚举
        $._ajax({
            type: "get",
            url: appCtx + "/b2c/enum-service/data",
            data: {
                enumClassName: "com.yonyou.ocm.b2c.enums.StoreTypeEnum"
            },
            success: function(data) {
                var newarray = common.dataconvert.toMap(data, "name", "code");
                viewModel.storeTypeSrc(newarray);
            }
        });
        //认证方式枚举
        $._ajax({
            type: "get",
            url: appCtx + "/b2c/enum-service/data",
            data: {
                enumClassName: "com.yonyou.ocm.b2c.enums.StoreAuthenticationEnum"
            },
            success: function(data) {
                var newarray = common.dataconvert.toMap(data, "name", "code");
                viewModel.authenticationSrc(newarray);
            }
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