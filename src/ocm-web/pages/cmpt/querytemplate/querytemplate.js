define(['text!./querytemplate.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global', 'css!./querytemplate.css', ], function (tpl, common, searchbox) {
    'use strict';
    // 行业扩展开关
    window.modelExtendSwitch = false;
    // 模板开关（查询模板，单据模板）
    window.customSwitch = false;
    // 权限开关(按钮权限)
    window.authSwitch = false;

    var app, baseData, events, rendertype, viewModel, singledocSearch, singledoceidt;

    var BILLPANELSTATUS = {
        ADD: "add",
        EDIT: "edit",
        COPY: "copy",
        DETAIL: "detail",
        DEFAULT: "default"
    };

    baseData = {
        baseurl: '/cmpt/search-tmpls',
        roleurl: '/cmpt/roles',
        roleAllocUrl: '/cmpt/tmpl-alloc',
        SearchTmplList: new u.DataTable(SearchTmpl),
        SearchTmplItems: new u.DataTable(SearchTmplItem),
        simpleListTree1: new u.DataTable(Rolemeta),
        simpleListTree2: new u.DataTable(Rolemeta),
        ItemRefList: new u.DataTable(ItemRef),
        billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
        enableRadioSrc: [{
            value: "1",
            name: "启用"
        }, {
            value: "0",
            name: "停用"
        }, {
            value: CONST.DEFAULTOPTION,
            name: "全部"
        }],
        enableCheckSrc: [{
            value: "1",
            name: "是"
        }],
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        // 跳转详情页
        goDetailPanel: common.bill.goDetailPanel,
        enableFmt: ko.pureComputed(function () {
            var isEnable = viewModel.SearchTmplList.ref("isEnable")();
            return isEnable === "1" ? "启用" : "停用";
        }),
        whetherFmt: ko.pureComputed(function () {
            var isDefault = viewModel.SearchTmplList.ref("isDefault")();
            return isDefault === "1" ? "是" : "否";
        }),
        treeSetting: {
            view: {
                showLine: false,
                multiSelect: true
            },
            check: {
                enable: true,
                chkStyle: "checkbox", //复选框
                chkboxType: {
                    "Y": "s",
                    "N": "ps"
                }
            },
        },
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

            var authfun =
                "data-bind=click:authRole.bind($data," +
                obj.rowIndex +"," +
                dataTableRowId +")",
                editfun =
                "data-bind=click:showEditBillPanel.bind($data," +
                obj.rowIndex + "," +
                dataTableRowId + ")",
                delfun = 
                "data-bind=click:del.bind($data," + 
                obj.rowIndex + "," + 
                dataTableRowId + ")";

            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a ' +
                editfun +
                ' title="编辑">编辑</a>' +
                '</span>    ' +
                '<span class="ui-handle-word">' +
                '<a ' +
                delfun +
                ' title="删除">删除</a>' +
                '</span>    ' +
                '<span class="ui-handle-word">' +
                '<a ' +
                authfun +
                ' title="授权">授权</a>' +
                "</span></div>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
    };

    events = {
        authRole: function (index, rowId) {
            window.md = u.dialog({
                id: 'testDialg',
                content: "#dialog_content",
                hasCloseMenu: true,
                width: "900px"
            });
            var data = viewModel.SearchTmplList.getSimpleData()[index];
            viewModel.tmplId = data.id
            $._ajax({
                type: "get",
                url: appCtx + viewModel.roleurl + "/find-user",
                dataType: "json",
                data: {
                    templateId: data.id
                },
                success: function (data) {
                    viewModel.simpleListTree2.setSimpleData(data, {
                        unSelect: true
                    })
                    viewModel.currentRoleData = data
                    viewModel.rightRoleData = data
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.roleurl,
                        dataType: "json",
                        data: {page:0,size:1000},
                        success: function (allRole) {
                            var data1 = []
                            //遍历获得未授权角色
                            for (var i = 0; i < allRole.content.length; i++) {
                                //判断两个角色相同
                                var flag = false
                                for (var j = 0; j < data.length; j++) {
                                    if (allRole.content[i].id == data[j].id) {
                                        var flag = true
                                        break;
                                    }
                                }
                                if (!flag) {
                                    data1.push(allRole.content[i]);
                                }
                            }
                            viewModel.simpleListTree1.setSimpleData(data1, {
                                unSelect: true
                            })
                            viewModel.leftRoleData = data1
                        }
                    })
                }
            })

        },
        moveLeft: function () {
            var selectedData = viewModel.simpleListTree2.getSelectedDatas()
            var leftData = viewModel.simpleListTree1.getSimpleData();
            var rightData = viewModel.simpleListTree2.getSimpleData();
            for (var i = 0; i < selectedData.length; i++) {
                for (var j = 0; j < rightData.length; j++) {
                    if (selectedData[i].data.id.value == rightData[j].id) {
                        var result = rightData.splice(j, 1);
                        leftData.push(result[0])
                        break;
                    }
                }
            }
            viewModel.simpleListTree1.setSimpleData(leftData, {
                unSelect: true
            })
            viewModel.simpleListTree2.setSimpleData(rightData, {
                unSelect: true
            })
        },
        moveRight: function () {
            var selectedData = viewModel.simpleListTree1.getSelectedDatas()
            var leftData = viewModel.simpleListTree1.getSimpleData();
            var rightData = viewModel.simpleListTree2.getSimpleData();
            for (var i = 0; i < selectedData.length; i++) {
                for (var j = 0; j < leftData.length; j++) {
                    if (selectedData[i].data.id.value == leftData[j].id) {
                        var result = leftData.splice(j, 1);
                        rightData.push(result[0])
                        break;
                    }
                }
            }
            viewModel.simpleListTree1.setSimpleData(leftData, {
                unSelect: true
            })
            viewModel.simpleListTree2.setSimpleData(rightData, {
                unSelect: true
            })
        },
        saveRole: function () {
            var rightData = viewModel.simpleListTree2.getSimpleData();
            var data = []
            var currentRoleData = viewModel.currentRoleData;
            for (var i = 0; i < rightData.length; i++) {
                var temp = {}
                temp.tmplId = viewModel.tmplId;
                temp.tmplTypeId = "02";
                temp.roleId = rightData[i].id;
                data.push(temp)
            }
            if (data.length == 0) {
                var temp = {}
                temp.tmplId = viewModel.tmplId;
                temp.tmplTypeId = "02";
                data.push(temp)
            }
            $._ajax({
                type: "post",
                url: appCtx + viewModel.roleAllocUrl + "/batch-save",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data),
                success: function (data) {
                    md.close();
                }
            })
        },
        cancelRolePanel: function () {
            md.close();
        },
        //删除和批量删除
        del: function (data, rowId) {
            if (typeof (data) === 'number') {
                viewModel.SearchTmplList.setRowSelectbyRowId(rowId);
            }
            var ids = [];
            var rows = viewModel.SearchTmplList.getSelectedRows();
            if (rows.length === 0) {
                toastr.error("请选择数据");
                return
            }
            if (rows && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
            }
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
                            ids: ids.join(",")
                        },
                        success: function (data) {
                            viewModel.SearchTmplList.removeRows(rows);
                        }
                    });

                }
            });
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if (reindex) {
                viewModel.SearchTmplList.pageIndex(0);
            }
            viewModel.SearchTmplList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            var pageSize = viewModel.SearchTmplList.pageSize();
            var pageNumber = viewModel.SearchTmplList.pageIndex();
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function (data) {
                    viewModel.SearchTmplList.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.SearchTmplList.totalRow(data.totalElements);
                    viewModel.SearchTmplList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function () {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.SearchTmplList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.SearchTmplList.pageSize(size);
            viewModel.search(true);
        },
        //进入新增单据页
        showAddBillPanel: function (data) {
            var curRow = viewModel.SearchTmplList.createEmptyRow();
            viewModel.SearchTmplItems.removeAllRows();
            viewModel.SearchTmplList.setRowFocus(curRow);
            curRow.setValue("isEnable", "1");
            curRow.setValue("menuId", data.refpk);
            curRow.setValue("menuCode", data.refcode);
            curRow.setValue("menuName", data.refname);
            // var menu = parent.getCurrentMenu(data.refcode);
            $._ajax({
                type: "get",
                url: appCtx + "/menu/get-url-by-menu-code",
                data: {
                    menuCode: data.refcode
                },
                success: function (url) {
                    var location = url;
                    var metaurl = location.slice(0, location.lastIndexOf("/")) + "/meta.js";
                    require([metaurl], function (model) {
                        if (model && model.options && model.options.searchs) {
                            var searchobj = model.options.searchs;
                            var source;
                            if (searchobj["search1"]) {
                                source = searchobj["search1"]
                            } else {
                                for (var key in searchobj) {
                                    // 多个key只取第一个
                                    source = searchobj[key];
                                    break;
                                }
                            }
                            if (source && source.length > 0) {
                                var sort = 0;
                                var data = source.map(function (item) {
                                    sort++;
                                    return {
                                        conditionCode: item.key,
                                        conditionName: item.label,
                                        isVisible: 1,
                                        displayOrder: sort
                                    }
                                })
                                // 转化为name value形式以提供下拉框选择
                                source = common.dataconvert.toMap(source, "label", "key");
                                viewModel.conditionSource(source);
                                viewModel.SearchTmplItems.setSimpleData(data);
                                viewModel.goBillPanel();
                                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                            }
                        }
                    })
                }
            });

        },
        // 可以进入编辑态
        canInEdit: function () {
            var canIn = true;
            /*
            var id = viewModel.SearchTmplList.getValue("id");
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + "/isRefer",
                async: false,
                data: {
                    id: id
                },
                success: function (data) {
                    if (data === 1) {
                        toastr.error("已被引用数据不可编辑");
                        canIn = false;
                    }
                }
            });*/
            return canIn;
        },
        //进入修改单据页
        showEditBillPanel: function (index) {
            viewModel.SearchTmplList.setRowFocus(index);
            var mainid = viewModel.SearchTmplList.getValue("id");
            var menuCode = viewModel.SearchTmplList.getValue("menuCode");
            viewModel.SearchTmplList.originEditData = viewModel.SearchTmplList.getFocusRow().getSimpleData();
            $._ajax({
                type: "get",
                url: appCtx + "/menu/get-url-by-menu-code",
                data: {
                    menuCode: menuCode
                },
                success: function (url) {
                    var location = url;
                    var metaurl = location.slice(0, location.lastIndexOf("/")) + "/meta.js";
                    require([metaurl], function (model) {
                        if (model && model.options && model.options.searchs) {
                            var searchobj = model.options.searchs;
                            var source;
                            if (searchobj["search1"]) {
                                source = searchobj["search1"]
                            } else {
                                for (var key in searchobj) {
                                    // 多个key只取第一个
                                    source = searchobj[key];
                                    break;
                                }
                            }
                            if (source && source.length > 0) {
                                // 转化为name value形式以提供下拉框选择
                                source = common.dataconvert.toMap(source, "label", "key");
                                viewModel.conditionSource(source);
                                //查询子表数据
                                viewModel.findByParentid(mainid);
                                viewModel.goBillPanel();
                                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                            }
                        }
                    })
                }
            });

        },
        //进入复制单据页
        showCopyBillPanel: function () {
            var selectedRows = viewModel.SearchTmplList.getSelectedRows();
            // 只支持单一复制，批量复制需单独处理
            if (selectedRows.length !== 1) {
                toastr.error("请选择一条要复制的行");
                return;
            }
            var copyRow = selectedRows[0];
            var curRow = viewModel.SearchTmplList.createEmptyRow();
            curRow.setSimpleData(copyRow.getSimpleData());
            viewModel.SearchTmplList.setRowFocus(curRow);
            var id = copyRow.getValue("id");
            //查询子表数据
            viewModel.findByParentid(id);
            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow);
            //删除子表主键，子表主表关联
            var subRows = viewModel.SearchTmplItems.getAllRows();
            for (var i = 0; i < subRows.length; i++) {
                viewModel.clearBaseProp(subRows[i]);
                subRows[i].setValue("searchTmplId", "");
            }
            viewModel.goBillPanel();
            viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
        },

        detail: function () {
            //确保grid先将行设置为focus状态
            setTimeout(function () {
                var curRow = viewModel.SearchTmplList.getCurrentRow();
                var id = curRow.getValue("id");
                viewModel.findByParentid(id);
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                viewModel.goDetailPanel();
            }, 0);
        },
        //查询子表数据
        findByParentid: function (id) {
            $._ajax({
                url: appCtx + viewModel.baseurl + "/findItemsById",
                type: 'get',
                async: false,
                data: {
                    id: id
                },
                success: function (data) {
                    viewModel.SearchTmplItems.setSimpleData(data);
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
        //跳转单据详情页
        showBillDetail: function () {
            $(".ui-list-panel").addClass("animated slideInLeft");
            $(".ui-bill-panel").addClass("animated slideOutDown");
        },
        //新增子表项
        addItem: function () {
            viewModel.SearchTmplItems.createEmptyRow({
                unSelect: true
            });
        },
        //批量新增子表项
        // addItems: function() {
        //
        // },
        //删除子表项
        delItems: function () {
            var selectedRows = viewModel.SearchTmplItems.getSelectedRows();
            viewModel.SearchTmplItems.removeRows(selectedRows);
        },
        //保存单据
        saveBill: function () {
            var result = app.compsValidateMultiParam({
                element: ".ui-bill-panel",
                showMsg: true
            });
            if (!result.passed) {
                return;
            }
            var allRows = viewModel.SearchTmplItems.getAllRows();
            if (allRows.length == 0 || allRows.every(function (row) {
                    return row.status == u.Row.STATUS.FALSE_DELETE
                })) {
                toastr.error("请录入表体行数据");
                return;
            }
            var SearchTmplData = viewModel.SearchTmplList.getCurrentRow().getSimpleData();
            var SearchTmplItemsData = viewModel.SearchTmplItems.getSimpleData();
            SearchTmplData.items = SearchTmplItemsData;
            var _ajaxType = viewModel.SearchTmplList.getValue("id") ? "put" : "post";
            $._ajax({
                url: appCtx + viewModel.baseurl,
                type: _ajaxType,
                data: JSON.stringify(SearchTmplData),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    viewModel.SearchTmplList.getFocusRow().setSimpleData(data);
                    viewModel.retListPanel();
                }
            })
        },
        //取消单据
        cancelBill: function () {
            viewModel.SearchTmplItems.removeAllRows();
            var curRow = viewModel.SearchTmplList.getCurrentRow();
            // 修改，则还原
            if (curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.SearchTmplList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.SearchTmplList.removeRow(curRow);
                viewModel.SearchTmplItems.removeAllRows();
            }
            viewModel.retListPanel();
        },
        //启用
        enable: function () {
            var selectedRows = viewModel.SearchTmplList.getSelectedRows();
            if (selectedRows.length === 0) {
                toastr.error("请选择数据");
                return
            }
            if (selectedRows && selectedRows.length > 0) {
                var ids = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    ids.push(selectedRows[i].getValue("id"));
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/enable",
                    data: {
                        ids: ids.join(",")
                    },
                    success: function (res) {
                        toastr.success();
                        for (var i = 0; i < selectedRows.length; i++) {
                            selectedRows[i].setValue("isEnable", "1");
                        }
                    }
                })
            }
        },
        //停用
        disable: function () {
            var selectedRows = viewModel.SearchTmplList.getSelectedRows();
            if (selectedRows.length == 0) {
                toastr.error("请选择数据");
                return
            }
            if (selectedRows && selectedRows.length > 0) {
                var ids = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    ids.push(selectedRows[i].getValue("id"));
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/disable",
                    data: {
                        ids: ids.join(",")
                    },
                    success: function (res) {
                        toastr.success();
                        for (var i = 0; i < selectedRows.length; i++) {
                            selectedRows[i].setValue("isEnable", "0");
                        }
                    }
                })
            }
        },
        //设置为默认
        setDefault: function () {
            var selectedRows = viewModel.SearchTmplList.getSelectedRows();
            if (selectedRows.length == 0) {
                toastr.error("请选择数据");
                return;
            }
            if (selectedRows && selectedRows.length > 0) {
                var ids = [];
                var menuIds = [];
                var nary=selectedRows.sort();
                if(selectedRows.length == 1){
                    if(selectedRows[0].getValue("isDefault") =="1"){
                        toastr.error("已选择数据中存在默认模板，请重新选择")
                        return;
                    }
                    ids.push(selectedRows[0].getValue("id"));
                    menuIds.push(selectedRows[0].getValue("menuId"));
                }else {
                    for (var i = 0; i < selectedRows.length-1; i++) {
                        if (selectedRows[i].getValue("isDefault") =="1" || selectedRows[selectedRows.length-1].getValue("isDefault") =="1") {
                            toastr.error("已选择数据中存在默认模板，请重新选择")
                            return;
                        }
                        if (nary.length >1 && nary[i].getValue("menuId") == nary[i+1].getValue("menuId")){
                            toastr.error("同一菜单不允许重复设置")
                            return;
                        }
                        ids.push(selectedRows[i].getValue("id"));
                        ids.push(selectedRows[selectedRows.length-1].getValue("id"));
                        menuIds.push(selectedRows[i].getValue("menuId"));
                        menuIds.push(selectedRows[selectedRows.length-1].getValue("menuId"));
                    }
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/batch-default",
                    data: {
                        ids: ids.join(","), menuIds: menuIds.join(",")
                    },
                    success: function (data) {
                        if(data != "success"){
                            toastr.error(data)
                            return;
                        }
                        var allRows = viewModel.SearchTmplList.getAllRows();
                        for (var i = 0; i < allRows.length; i++) {
                            var row = allRows[i];
                            row.setValue("isDefault", "0");
                        }
                        for (var i = 0; i < selectedRows.length; i++) {
                            var row = selectedRows[i];
                            row.setValue("isDefault", "1");
                        }
                        toastr.success();
                    }
                })
            }
        },
        showNewBillRef: function () {
            viewModel.clearBillRef();
            $("#newBillRef .refer").trigger("click");
        },
        setunDefault: function () {
            var selectedRows = viewModel.SearchTmplList.getSelectedRows();
            if (selectedRows.length == 0) {
                toastr.error("请选择数据");
                return;
            }
            if (selectedRows && selectedRows.length > 0) {
                var ids = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    ids.push(selectedRows[i].getValue("id"));
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/batch-unDefault",
                    data: {
                        ids: ids.join(",")
                    },
                    success: function (data) {
                        for (var i = 0; i < selectedRows.length; i++) {
                            var row = selectedRows[i];
                            row.setValue("isDefault", "0");
                        }
                        toastr.success();
                    }
                })
            }
        },

        clearBillRef: function () {
            viewModel.ItemRefList.setValue("menuref", "");
            var refer = $("#refContainermenuref").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
        },

        clearRoleAllocRef: function () {
            viewModel.ItemRefList.setValue("roleref", "");
            var refer = $("#refContainerroleref").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
        },

        detail2bill: function () {
            if (!viewModel.canInEdit()) {
                return;
            }
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
            common.bill.detail2bill();
        },
        //导入
        importHandle: function () {
            var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
            var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
            var ele = $('#importFiel')[0]; //挂载元素
            common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
        },
        //导出
        exportHandle: function () {
            var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
            var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
            var listData = viewModel.SearchTmplList; //需要导出表格的dataTable
            var ele = $('#exportFiel')[0]; //挂载元素
            common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
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
            $("#ProductCombine-searchcontent")[0], [{
                    type: "text",
                    key: "code",
                    label: "查询模版编码",
                },
                {
                    type: "text",
                    key: "name",
                    label: "查询模版名称",
                },
                {
                    type: "combo",
                    key: "isEnable",
                    label: "启用状态",
                    dataSource: CONST.ENABLESTATUSISALL,
                },
                {
                    type: "radio",
                    key: "isDefault",
                    label: "是否默认",
                    dataSource: CONST.DEFAULTSTATUS,
                },
            ]);
        // 列表查询数据(无查询条件)
        viewModel.search();
        // 子表参照聚焦行，用于绑定子表参照组件
        var refRow = viewModel.ItemRefList.createEmptyRow();
        viewModel.ItemRefList.setRowFocus(refRow);
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#ProductCombine-searchcontent input').off("keydown").on("keydown", function (e) {
            if (e.keyCode === 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        // 确定销售产品参照，为产品组合子表增行
        viewModel.ItemRefList.on("menuref.valuechange", function (obj) {
            // 清空参照时不增行
            if (!obj.newValue) {
                return;
            }
            var refer = $("#refContainermenuref").data("uui.refer");
            var refValues = refer.values;
            if (refValues && refValues.length > 0) {
                viewModel.showAddBillPanel(refValues[0]);
            }
        });

        viewModel.ItemRefList.on("roleref.valuechange", function (obj) {
            // 清空参照时不增行
            if (!obj.newValue) {
                return;
            }
            var refer = $("#refContainerroleref").data("uui.refer");
            var refValues = refer.values;
            var selectedRows = viewModel.SearchTmplList.getSelectedRows();
            if (refValues && refValues.length > 0 && selectedRows && selectedRows.length > 0) {
                var roleAllocList = [];
                for (var i = 0; i < refValues.length; i++) {
                    for (var j = 0; j < selectedRows.length; j++) {
                        var ref = refValues[i];
                        var row = selectedRows[j];
                        roleAllocList.push({
                            tmplType: "SEARCH_TMPL",
                            tmplId: row.getValue("id"),
                            roleId: ref.refpk
                        })
                    }
                }
                if (roleAllocList.length > 0) {
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.roleAllocUrl + "/batch-save",
                        data: JSON.stringify(roleAllocList),
                        contentType: "application/json; charset=utf-8",
                        success: function (res) {
                            toastr.success();
                        }
                    })
                }
            }

        });
        viewModel.SearchTmplItems.on("conditionCode.valuechange", function (obj) {
            var row = obj.rowObj;
            if (obj.newValue) {
                var name = common.dataconvert.valueToName(obj.newValue, viewModel.conditionSource);
                row.setValue("conditionName", name);
            } else {
                row.setValue("conditionName", null)
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