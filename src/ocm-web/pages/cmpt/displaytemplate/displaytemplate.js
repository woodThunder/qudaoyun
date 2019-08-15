define(['text!./displaytemplate.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global', 'css!./displaytemplate.css'], function (tpl, common, searchbox) {
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
        baseurl: '/cmpt/display-tmpls',
        roleurl: '/cmpt/roles',
        roleAllocUrl: '/cmpt/tmpl-alloc',
        DisplayTmplList: new u.DataTable(DisplayTmpl),
        DisplayTmplItems: new u.DataTable(DisplayTmplItem),
        ItemRefList: new u.DataTable(ItemRef),
        simpleListTree1: new u.DataTable(Rolemeta),
        simpleListTree2: new u.DataTable(Rolemeta),
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
        displayTypeSrc: [{
            value: "list",
            name: "列表"
        }, {
            value: "card",
            name: "卡片"
        }],
        metaObj: {
            "list": {
                type: "grids",
                defaultKey: "grid1",
                nameField: "title",
                valueField: "field",
                sourceField: "columns",
                message: "该菜单对应的功能节点无列表模板"
            },
            "card": {
                type: "dialogs",
                defaultKey: "dialog1",
                nameField: "label",
                valueField: "key",
                sourceField: "",
                message: "该菜单对应的功能节点无卡片模板"
            }
        },
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        // 跳转详情页
        goDetailPanel: common.bill.goDetailPanel,
        enableFmt: ko.pureComputed(function () {
            var isEnable = viewModel.DisplayTmplList.ref("isEnable")();
            return isEnable === "1" ? "启用" : "停用";
        }),
        whetherFmt: ko.pureComputed(function () {
            var isDefault = viewModel.DisplayTmplList.ref("isDefault")();
            return isDefault === "1" ? "是" : "否";
        }),
        displayTypeFmt: ko.pureComputed(function () {
            var displayType = viewModel.DisplayTmplList.ref("displayType")();
            return displayType === "list" ? "列表" : "卡片";
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
        whetherSource: [{
            value: "1",
            name: "是"
        }, {
            value: "0",
            name: "否"
        }],
    };

    rendertype = {
        operation: common.rendertype.operation,
        enableStatusRender: common.rendertype.enableRender,
        detailRender: common.rendertype.detailRender,
        whetherRender: common.rendertype.whetherRender,
        conditionSource: ko.observableArray([]),
        displayTypeRender: function (params) {
            params.element.innerHTML = "列表";
            if (params.value !== null && params.value !== "list") {
                params.element.innerHTML = "卡片";
            }
        },
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
        isVisibleRender: function (obj) {
            var isVisible = viewModel.DisplayTmplItems.getRow(obj.rowIndex).getValue(
                "isVisible"
            );
            var name;
            isVisible == 1 ? (name = "是") : (name = "否");
            obj.element.innerHTML = name;

        },
        authRole: function (index, rowId) {
            window.md = u.dialog({
                id: 'testDialg',
                content: "#dialog_content",
                hasCloseMenu: true,
                width: "900px"
            });
            var data = viewModel.DisplayTmplList.getSimpleData()[index];
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
                        data: {
                            page: 0,
                            size: 1000
                        },
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
                viewModel.DisplayTmplList.setRowSelectbyRowId(rowId);
            }
            var ids = [];
            var rows = viewModel.DisplayTmplList.getSelectedRows();
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
                            viewModel.DisplayTmplList.removeRows(rows);
                        }
                    });

                }
            });
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if (reindex) {
                viewModel.DisplayTmplList.pageIndex(0);
            }
            viewModel.DisplayTmplList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            var pageSize = viewModel.DisplayTmplList.pageSize();
            var pageNumber = viewModel.DisplayTmplList.pageIndex();
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function (data) {
                    viewModel.DisplayTmplList.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.DisplayTmplList.totalRow(data.totalElements);
                    viewModel.DisplayTmplList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function () {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.DisplayTmplList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.DisplayTmplList.pageSize(size);
            viewModel.search(true);
        },
        //进入新增单据页
        showAddBillPanel: function (data) {
            var displayMethodComp = app.getComp("displayMethodComp");
            if (displayMethodComp) {
                displayMethodComp.setEnable(true);
            }
            var curRow = viewModel.DisplayTmplList.createEmptyRow();
            viewModel.DisplayTmplItems.removeAllRows();
            viewModel.DisplayTmplList.setRowFocus(curRow);
            curRow.setValue("isEnable", "1");
            curRow.setValue("displayType", "list");
            curRow.setValue("menuId", data.refpk);
            curRow.setValue("menuCode", data.refcode);
            curRow.setValue("menuName", data.refname);
            // var menu = parent.getCurrentMenu(data.refcode);
            var meta = viewModel.metaObj.list;
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
                        if (model && model.options && model.options[meta.type]) {
                            // 暂存一下获取到的模型层,切换卡片和列表时不再重新加载meta
                            viewModel.modelOption = model.options;

                            var tempobj = model.options[meta.type];
                            var source;
                            if (tempobj[meta.defaultKey]) {
                                source = tempobj[meta.defaultKey]
                            } else {
                                for (var key in tempobj) {
                                    // 多个key只取第一个
                                    source = tempobj[key];
                                    break;
                                }
                            }
                            if (source) {
                                if (meta.sourceField) {
                                    source = source[meta.sourceField];
                                }
                                if (source.length > 0) {
                                    var sort = 0;
                                    var data = source.map(function (item) {
                                        sort++;
                                        return {
                                            fieldCode: item[meta.valueField],
                                            fieldName: item[meta.nameField],
                                            isVisible: 1,
                                            displayOrder: sort
                                        }
                                    })
                                    // 转化为name value形式以提供下拉框选择
                                    source = common.dataconvert.toMap(source, meta.nameField, meta.valueField);
                                    viewModel.conditionSource(source);
                                    viewModel.DisplayTmplItems.setSimpleData(data);
                                    viewModel.goBillPanel();
                                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                                }
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
            var id = viewModel.DisplayTmplList.getValue("id");
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
            var displayMethodComp = app.getComp("displayMethodComp");
            if (displayMethodComp) {
                displayMethodComp.setEnable(false);
            }
            viewModel.DisplayTmplList.setRowFocus(index);
            var id = viewModel.DisplayTmplList.getValue("id");
            var menuCode = viewModel.DisplayTmplList.getValue("menuCode");
            var type = viewModel.DisplayTmplList.getValue("displayType");
            var meta = viewModel.metaObj[type];
            viewModel.DisplayTmplList.originEditData = viewModel.DisplayTmplList.getFocusRow().getSimpleData();
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
                        if (model && model.options && model.options[meta.type]) {
                            var tempobj = model.options[meta.type];
                            var source;
                            if (tempobj[meta.defaultKey]) {
                                source = tempobj[meta.defaultKey]
                            } else {
                                for (var key in tempobj) {
                                    // 多个key只取第一个
                                    source = tempobj[key];
                                    break;
                                }
                            }
                            if (source) {
                                if (meta.sourceField) {
                                    source = source[meta.sourceField];
                                }
                                if (source.length > 0) {
                                    // 转化为name value形式以提供下拉框选择
                                    source = common.dataconvert.toMap(source, meta.nameField, meta.valueField);
                                    viewModel.conditionSource(source);
                                    //查询子表数据
                                    viewModel.findByParentid(id);
                                    viewModel.goBillPanel();
                                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                                }
                            }
                        }
                    })
                }
            });
        },
        //进入复制单据页
        showCopyBillPanel: function () {
            var selectedRows = viewModel.DisplayTmplList.getSelectedRows();
            // 只支持单一复制，批量复制需单独处理
            if (selectedRows.length !== 1) {
                toastr.error("请选择一条要复制的行");
                return;
            }
            var copyRow = selectedRows[0];
            var curRow = viewModel.DisplayTmplList.createEmptyRow();
            curRow.setSimpleData(copyRow.getSimpleData());
            viewModel.DisplayTmplList.setRowFocus(curRow);
            var id = copyRow.getValue("id");
            //查询子表数据
            viewModel.findByParentid(id);
            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow);
            //删除子表主键，子表主表关联
            var subRows = viewModel.DisplayTmplItems.getAllRows();
            for (var i = 0; i < subRows.length; i++) {
                viewModel.clearBaseProp(subRows[i]);
                subRows[i].setValue("DisplayTmplId", "");
            }
            viewModel.goBillPanel();
            viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
        },

        detail: function () {
            //确保grid先将行设置为focus状态
            setTimeout(function () {
                var curRow = viewModel.DisplayTmplList.getCurrentRow();
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
                    viewModel.DisplayTmplItems.setSimpleData(data);
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
            viewModel.DisplayTmplItems.createEmptyRow();
        },
        //批量新增子表项
        // addItems: function() {
        //
        // },
        //删除子表项
        delItems: function () {
            var selectedRows = viewModel.DisplayTmplItems.getSelectedRows();
            for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("dr", "1");
            }
            viewModel.DisplayTmplItems.removeRows(selectedRows);
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
            var allRows = viewModel.DisplayTmplItems.getAllRows();
            if (allRows.length == 0 || allRows.every(function (row) {
                    return row.status == u.Row.STATUS.FALSE_DELETE
                })) {
                toastr.error("请录入表体行数据");
                return;
            }
            var DisplayTmplData = viewModel.DisplayTmplList.getCurrentRow().getSimpleData();
            var DisplayTmplItemsData = viewModel.DisplayTmplItems.getSimpleData();
            DisplayTmplData.items = DisplayTmplItemsData;
            var _ajaxType = viewModel.DisplayTmplList.getValue("id") ? "put" : "post";
            $._ajax({
                url: appCtx + viewModel.baseurl,
                type: _ajaxType,
                data: JSON.stringify(DisplayTmplData),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    viewModel.DisplayTmplList.getFocusRow().setSimpleData(data);
                    viewModel.retListPanel();
                }
            })
        },
        //取消单据
        cancelBill: function () {
            viewModel.DisplayTmplItems.removeAllRows();
            var curRow = viewModel.DisplayTmplList.getCurrentRow();
            // 修改，则还原
            if (curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.DisplayTmplList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.DisplayTmplList.removeRow(curRow);
                viewModel.DisplayTmplItems.removeAllRows();
            }
            viewModel.retListPanel();
        },
        //启用
        enable: function () {
            var selectedRows = viewModel.DisplayTmplList.getSelectedRows();
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
            var selectedRows = viewModel.DisplayTmplList.getSelectedRows();
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
            var selectedRows = viewModel.DisplayTmplList.getSelectedRows();
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
                        var allRows = viewModel.DisplayTmplList.getAllRows();
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
        setunDefault: function () {
            var selectedRows = viewModel.DisplayTmplList.getSelectedRows();
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
        showNewBillRef: function () {
            viewModel.clearBillRef();
            $("#newBillRef .refer").trigger("click");
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
            var listData = viewModel.DisplayTmplList; //需要导出表格的dataTable
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
                    label: "显示模版编码",
                },
                {
                    type: "text",
                    key: "name",
                    label: "显示模版名称",
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
        viewModel.DisplayTmplList.on("displayType.valuechange", function (obj) {
            if ((obj.oldValue == "list" && obj.newValue == "card") || (obj.oldValue == "card" && obj.newValue == "list")) {
                var meta = viewModel.metaObj[obj.newValue];
                if (viewModel.modelOption && viewModel.modelOption[meta.type]) {
                    var tempobj = viewModel.modelOption[meta.type];
                    var source;
                    if (tempobj[meta.defaultKey]) {
                        source = tempobj[meta.defaultKey]
                    } else {
                        for (var key in tempobj) {
                            // 多个key只取第一个
                            source = tempobj[key];
                            break;
                        }
                    }
                    if (source) {
                        if (meta.sourceField) {
                            source = source[meta.sourceField];
                        }
                        if (source.length > 0) {
                            var sort = 0;
                            var data = source.map(function (item) {
                                sort++;
                                return {
                                    fieldCode: item[meta.valueField],
                                    fieldName: item[meta.nameField],
                                    isVisible: 1,
                                    displayOrder: sort
                                }
                            })
                            viewModel.conditionSource(source);
                            // 转化为name value形式以提供下拉框选择
                            source = common.dataconvert.toMap(source, meta.nameField, meta.valueField);
                            viewModel.conditionSource(source);
                            viewModel.DisplayTmplItems.setSimpleData(data);
                        }
                    }

                } else {
                    toastr.error(meta.message);
                    viewModel.conditionSource([]);
                    viewModel.DisplayTmplItems.setSimpleData([]);
                }
            }
        });
        viewModel.ItemRefList.on("roleref.valuechange", function (obj) {
            // 清空参照时不增行
            if (!obj.newValue) {
                return;
            }
            var refer = $("#refContainerroleref").data("uui.refer");
            var refValues = refer.values;
            var selectedRows = viewModel.DisplayTmplList.getSelectedRows();
            if (refValues && refValues.length > 0 && selectedRows && selectedRows.length > 0) {
                var roleAllocList = [];
                for (var i = 0; i < refValues.length; i++) {
                    for (var j = 0; j < selectedRows.length; j++) {
                        var ref = refValues[i];
                        var row = selectedRows[j];
                        roleAllocList.push({
                            tmplType: "DISPLAY_TMPL",
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

        })
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