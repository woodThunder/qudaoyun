define(['text!./dataPermission.html', 'ocm_simpleview', './meta.js', 'css!./dataPermission.css'], function (tpl, simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        tpl: tpl,
        baseData: {
            dialogWidth: '900px',
            roleUrl: '/cmpt/roles',
            appUrl: '/cmpt/app-docs',
            resUrl: '/cmpt/data-permission',
            roleList: new u.DataTable(model.options.metas.rolemeta),
            appList: new u.DataTable(model.options.metas.appmeta),
            assignedList: new u.DataTable(model.options.metas.assignedmeta),
            assignWinList: new u.DataTable(model.options.metas.assignWinmeta),
            assignedComboList: new u.DataTable(model.options.metas.assignedCombometa),
            itemWinList: new u.DataTable(model.options.metas.itemmeta),
            assignedItemWinList: new u.DataTable(model.options.metas.assignedItemmeta),
            statusField: 'isEnable',
            button1Source: model.options.buttons.button1,
            card1Source: model.options.cards.card1,
            grid1Option: model.options.grids.grid1,
            grid2Option: model.options.grids.grid2,
            grid3Option: model.options.grids.grid3,
            grid4Option: model.options.grids.grid4,
            grid5Option: model.options.grids.grid5,
            grid6Option: model.options.grids.grid6,
            assignedAppDataSource: ko.observableArray([]),
            currentResRow:{},
            //是否启用
            enableFmt: ko.pureComputed(function () {
                var status = viewModel.roleList.ref("isEnable")();
                var statusName
                if (status == 0) {
                    (statusName = "未启用")
                }
                if (status == 1) {
                    (statusName = "已启用")
                }
                if (status == 2) {
                    (statusName = "已停用")
                }
                return statusName;
            }),
        },
        rendertype: u.extend({}, simpleview.prototype.rendertype, {
            operation: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var editfun =
                    "data-bind=click:showAppWin.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    editfun +
                    ' title="分配对象">分配对象</a>' +
                    "</span>    " +
                    "</div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            operation2: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var editfun =
                    "data-bind=click:showItemWin.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var assignedFunc =
                    "data-bind=click:showAssignedItemWin.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var delFunc =
                    "data-bind=click:deleteAssigned.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                if(obj.row.value.typeValue == 1) {
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        editfun +
                        ' title="分配值">分配值</a>' +
                        "</span>    " +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        assignedFunc +
                        ' title="已分配">已分配</a>' +
                        "</span>    " +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        delFunc +
                        ' title="取消分配">取消</a>' +
                        "</span>    " +
                        "</div>";

                }else{
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        delFunc +
                        ' title="取消分配">取消</a>' +
                        "</span>    " +
                        "</div>";
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },

            operation3: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var cancelfun =
                    "data-bind=click:cancelAssigned.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    cancelfun +
                    ' title="取消分配">取消分配</a>' +
                    "</span>    " +
                    "</div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
        }),
        events: u.extend({}, simpleview.prototype.events, {

            clickRoleRow: function (e) {
                var rowIndex = e.rowIndex;
                var rowData = e.rowObj.value;
                viewModel.roleId = rowData.id;
                viewModel.searchAssigned(rowData.id);
                //点击行变色
                var bgr = $(".backRow");
                for(var i=0;i<bgr.length;i++){
                    bgr.eq(i).removeClass("backRow");
                }

                $($("#grid_role_content")[0].childNodes[0].childNodes[e.rowIndex]).addClass('backRow')
                $($("#grid_role_content")[0].childNodes[1].childNodes[1].childNodes[2].childNodes[e.rowIndex]).addClass('backRow');
                $($("#grid_role_content")[0].childNodes[2].childNodes[1].childNodes[2].childNodes[e.rowIndex]).addClass('backRow');
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.appUrl + "/find-assigned-apps",
                    dataType: "json",
                    data: {roleId:viewModel.roleId},
                    success: function (data) {
                        var dataSource = [];
                        for(var i=0;i<data.length;i++){
                            dataSource.push({value:data[i].code,name:data[i].name});
                        }

                        viewModel.assignedAppDataSource(dataSource);
                        if(dataSource&&dataSource.length>0){
                            viewModel.assignedComboList.setSimpleData({assignedApp: dataSource[0].value});
                            // $("#assignWinTitle")[0].innerHTML = dataSource[0].name;
                        }else{
                            viewModel.assignedComboList.setSimpleData({});
                        }
                        viewModel.searchAssigned(rowData.id);
                    }
                });
            },

            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (reindex) {
                    viewModel.roleList.pageIndex(0);
                }
                viewModel.roleList.removeAllRows();
                var queryData = {};
                queryData.size = viewModel.roleList.pageSize();
                queryData.page = viewModel.roleList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.roleUrl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.roleList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.roleList.totalRow(data.totalElements);
                        viewModel.roleList.totalPages(data.totalPages);
                    }
                });
            },
            //查询已分配的业务对象
            searchAssigned: function (roleId) {
                viewModel.assignedList.removeAllRows();
                var assignedApp = viewModel.assignedComboList.getValue("assignedApp");
                var queryData = {roleId: roleId, appCode: assignedApp};
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.resUrl + '/find-assigned-resource',
                    dataType: "json",
                    data: queryData,
                    success: function (data) {

                        viewModel.assignedList.setSimpleData(data, {
                            unSelect: true
                        });
                    }
                });
            },
            //查询所有业务对象
            searchApp: function () {
                var queryData = {};
                if($(".appwin-title-input")!=undefined&&$(".appwin-title-input")[0]!=undefined&&$(".appwin-title-input")[0].value !=undefined&&(".appwin-title-input")[0].value!=""){
                    queryData["search_LIKE_name"] = "%"+$(".appwin-title-input")[0].value+"%";
                }
                viewModel.appList.removeAllRows();
                queryData.size = viewModel.appList.pageSize();
                queryData.page = viewModel.appList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.appUrl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {

                        viewModel.appList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.appList.totalRow(data.totalElements);
                        viewModel.appList.totalPages(data.totalPages);
                    }
                });
            },
            //点击分配资源对象查询弹框列表
            searchAssingWin: function (assignedApp) {
                viewModel.assignWinList.removeAllRows();
                var queryData = {appCode: assignedApp};
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.resUrl + '/find-res-obj',
                    dataType: "json",
                    data: queryData,
                    success: function (data) {

                        viewModel.assignWinList.setSimpleData(data, {
                            unSelect: true
                        });
                    }
                });
            },

            //点击分配规则查询弹框列表
            searchAssingWin2: function (assignedApp) {
                var queryData = {appCode: assignedApp};
                viewModel.assignWinList.removeAllRows();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.resUrl + '/find-rules',
                    dataType: "json",
                    data: queryData,
                    success: function (data) {

                        viewModel.assignWinList.setSimpleData(data, {
                            unSelect: true
                        });
                    }
                });
            },


            //点击分配值查询所有的资源对象实例
            searchItemWin: function (currentData) {
                var queryData = {
                    resId: currentData.resId,
                };
                if($(".itemwin-title-input")!=undefined&&$(".itemwin-title-input")[0]!=undefined&&$(".itemwin-title-input")[0].value !=undefined&&(".itemwin-title-input")[0].value!=""){
                    queryData.name = $(".itemwin-title-input")[0].value;
                }
                viewModel.itemWinList.removeAllRows();
                queryData.size = viewModel.itemWinList.pageSize();
                queryData.page = viewModel.itemWinList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.resUrl + "/find-all-resource-data",
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        var values = data.content;
                        for (var i = 0; i < values.length; i++) {
                            if(values[i].code == undefined ){
                                values[i].code = values[i].loginName;
                            }
                        }
                        viewModel.itemWinList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.itemWinList.totalRow(data.total);
                        viewModel.itemWinList.totalPages(data.totalPage);
                    }
                });
            },


            //查询已分配的弹框列表
            searchAssignedItemWin: function (currentData) {
                var queryData = {
                    roleId:viewModel.roleId,
                    appCode:viewModel.assignedComboList.getValue("assignedApp"),
                    dimId:currentData.dimId,
                    resId:currentData.resId,
                };
                if($(".assignItemWin-title-input")!=undefined&&$(".assignItemWin-title-input")[0]!=undefined&&$(".assignItemWin-title-input")[0].value !=undefined&&(".assignItemWin-title-input")[0].value!=""){
                    queryData.name = $(".assignItemWin-title-input")[0].value;
                }
                viewModel.assignedItemWinList.removeAllRows();
                queryData.size = viewModel.assignedItemWinList.pageSize();
                queryData.page = viewModel.assignedItemWinList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.resUrl + "/find-assigned-data",
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.assignedItemWinList.setSimpleData(data.content, {
                            unSelect: true
                        });

                        viewModel.assignedItemWinList.totalRow(data.totalElements);
                        viewModel.assignedItemWinList.totalPages(data.totalPages);
                    }
                });
            },


            //打开业务对象页面
            showAppWin: function (index, rowId) {
                var currentData = viewModel.roleList.getRowByRowId(rowId).getSimpleData();
                var roleId = currentData.id;
                viewModel.roleId = roleId;
                var searchButton = $("#dialog_appWin .J-search");
                searchButton.off().on("click", function () {
                    viewModel.searchApp()
                })
                var okButton = $("#dialog_appWin .J-ok");
                okButton.off().on("click", function () {
                    viewModel.appWinOk()
                    viewModel.dialog_appWin.close();
                })
                var cancelButton = $("#dialog_appWin .J-cancel");
                cancelButton.off().on("click", function () {
                    viewModel.dialog_appWin.close();
                });

                if (!viewModel.dialog_appWin) {
                    viewModel.dialog_appWin = u.dialog({
                        id: "dialog_appWin",
                        content: "#dialog_appWin",
                        hasCloseMenu: true,
                        width: "80%"
                    });
                } else {
                    viewModel.dialog_appWin.show();
                }
                viewModel.searchApp()
            },

            //点击分配资源对象按钮
            showAssingWin: function (index, rowId) {
                //取出下拉框的值
                var assignedApp = viewModel.assignedComboList.getValue("assignedApp");
                if (assignedApp == undefined || assignedApp == "") {
                    toastr.warning("请先选择需要分配的对象");
                    return;
                }
                var okButton = $("#dialog_assignWin .J-ok");
                okButton.off().on("click", function () {
                    viewModel.assingWinOk();
                    viewModel.dialog_assignWin.close();
                })
                var cancelButton = $("#dialog_assignWin .J-cancel");
                cancelButton.off().on("click", function () {
                    viewModel.dialog_assignWin.close();
                });

                if (!viewModel.dialog_assignWin) {
                    viewModel.dialog_assignWin = u.dialog({
                        id: "dialog_assignWin",
                        content: "#dialog_assignWin",
                        hasCloseMenu: true,
                        width: "80%"
                    });
                } else {
                    viewModel.dialog_assignWin.show();
                }
                viewModel.searchAssingWin(assignedApp);
            },

            //点击分配规则按钮
            showAssingWin2: function (index, rowId) {
                //取出下拉框的值
                var assignedApp = viewModel.assignedComboList.getValue("assignedApp");
                if (assignedApp == undefined || assignedApp == "") {
                    toastr.warning("请先选择需要分配的对象");
                    return;
                }
                var okButton = $("#dialog_assignWin .J-ok");
                okButton.off().on("click", function () {
                    viewModel.assingWinOk();
                    var rows = viewModel.assignWinList.getSelectedRows();
                    if (rows.length < 1) {
                        toastr.warning("请至少选择一条数据！");
                        return;
                    }
                    var arr = [];

                    for(var i=0;i<rows.length;i++){
                        arr.push(rows[i].getSimpleData().dimId + "#" + rows[i].getSimpleData().resId);
                    }

                    var queryData = {
                        roleId:viewModel.roleId,
                        appCode:viewModel.assignedComboList.getValue("assignedApp"),
                        resVals:arr,
                    };
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.resUrl + "/save-rule-permissions",
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.itemWinList.setSimpleData(data.content, {
                                unSelect: true
                            });
                        }
                    });

                    viewModel.dialog_assignWin.close();
                })
                var cancelButton = $("#dialog_assignWin .J-cancel");
                cancelButton.off().on("click", function () {
                    viewModel.dialog_assignWin.close();
                });

                if (!viewModel.dialog_assignWin) {
                    viewModel.dialog_assignWin = u.dialog({
                        id: "dialog_assignWin",
                        content: "#dialog_assignWin",
                        hasCloseMenu: true,
                        width: "80%"
                    });
                } else {
                    viewModel.dialog_assignWin.show();
                }
                viewModel.searchAssingWin2(assignedApp);
            },

            //业务对象弹框确定按钮
            appWinOk: function () {
                var rows = viewModel.appList.getSelectedRows();
                if (rows.length != 1) {
                    toastr.warning("请选择一条数据！");
                    return;
                }
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.appUrl + "/find-assigned-apps",
                    dataType: "json",
                    data: {roleId:viewModel.roleId},
                    success: function (data) {
                        var dataSource = [];
                        var flag = true;
                        var selectedApp = rows[0].getSimpleData();
                        for(var i=0;i<data.length;i++){
                            dataSource.push({value:data[i].code,name:data[i].name});
                            if(data[i].code == selectedApp.code){
                                flag = false;
                            }
                        }

                        if(flag == true){
                            dataSource.push({value: selectedApp.code, name: selectedApp.name});
                        }
                        viewModel.assignedAppDataSource(dataSource);
                        viewModel.assignedComboList.setSimpleData({assignedApp: selectedApp.code});
                        // $("#assignWinTitle")[0].innerHTML = selectedApp.name;
                        viewModel.searchAssigned(viewModel.roleId);
                    }
                });

            },
            assingWinOk: function () {
                var rows = viewModel.assignWinList.getSelectedRows();
                if (rows.length < 1) {
                    toastr.warning("请至少选择一条数据！");
                    return;
                }
                viewModel.assignedList.addRows(rows)
            },

            itemWinOk: function () {
                var rows = viewModel.itemWinList.getSelectedRows();
                if (rows.length < 1) {
                    toastr.warning("请至少选择一条数据！");
                    return;
                }
                var arr = [];
                //分配的值时用户时（如变更人），存放loginName而不是id
                if(rows[0].getSimpleData().loginName != undefined){
                    for(var i=0;i<rows.length;i++){
                        arr.push(rows[i].getSimpleData().loginName + "#" +rows[i].getSimpleData().name);
                    }
                }else{
                    for(var i=0;i<rows.length;i++){
                        arr.push(rows[i].getSimpleData().id + "#" +rows[i].getSimpleData().name);
                    }
                }

                var queryData = {
                    roleId:viewModel.roleId,
                    appCode:viewModel.assignedComboList.getValue("assignedApp"),
                    dimId:viewModel.currentResRow.dimId,
                    resId:viewModel.currentResRow.resId,
                    resVals:arr
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.resUrl + "/save-data-permissions",
                    dataType: "json",
                    // contentType: 'application/json',
                    data: queryData,
                    success: function (data) {
                        viewModel.itemWinList.setSimpleData(data.content, {
                            unSelect: true
                        });
                    }
                });
            },

            assignedItemWinOk: function () {
                var rows = viewModel.assignedItemWinList.getSelectedRows();
                if (rows.length < 1) {
                    toastr.warning("请至少选择一条数据！");
                    return;
                }
                var arr = [];

                for(var i=0;i<rows.length;i++){
                    arr.push(rows[i].getSimpleData().id + "#" +rows[i].getSimpleData().name);
                }
                var queryData = {
                    roleId:viewModel.roleId,
                    appCode:viewModel.assignedComboList.getValue("assignedApp"),
                    dimId:viewModel.currentResRow.dimId,
                    resId:viewModel.currentResRow.resId,
                    resVals:arr
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.resUrl + "/save-data-permissions",
                    dataType: "json",
                    // contentType: 'application/json',
                    data: queryData,
                    success: function (data) {
                        viewModel.itemWinList.setSimpleData(data.content, {
                            unSelect: true
                        });
                    }
                });
            },

            batchCancelItems: function () {
                var rows = viewModel.assignedItemWinList.getSelectedRows();
                if (rows.length < 1) {
                    toastr.warning("请至少选择一条数据！");
                    return;
                }
                var arr = [];

                for(var i=0;i<rows.length;i++){
                    arr.push(rows[i].getSimpleData().id);
                }
                var queryData = {
                    resVals:arr
                }
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.resUrl + "/batch-delete-data-permissions",
                    dataType: "json",
                    // contentType: 'application/json',
                    data: queryData,
                    success: function (data) {
                        viewModel.searchAssignedItemWin(viewModel.currentResRow)
                    }
                });
            },


            showItemWin: function (index, rowId) {
                var currentData = viewModel.assignedList.getRowByRowId(rowId).getSimpleData();
                viewModel.currentResRow = currentData;
                var searchButton = $("#dialog_itemWin .J-search");
                searchButton.off().on("click", function () {
                    viewModel.searchItemWin(currentData)
                })
                var okButton = $("#dialog_itemWin .J-ok");
                okButton.off().on("click", function () {
                    viewModel.itemWinOk();
                    viewModel.dialog_itemWin.close();
                })
                var cancelButton = $("#dialog_itemWin .J-cancel");
                cancelButton.off().on("click", function () {
                    viewModel.dialog_itemWin.close();
                });

                if (!viewModel.dialog_itemWin) {
                    viewModel.dialog_itemWin = u.dialog({
                        id: "dialog_itemWin",
                        content: "#dialog_itemWin",
                        hasCloseMenu: true,
                        width: "80%"
                    });
                } else {
                    viewModel.dialog_itemWin.show();
                }
                viewModel.searchItemWin(currentData)
            },

            //已分配权限的弹框
            showAssignedItemWin: function (index, rowId) {
                var currentData = viewModel.assignedList.getRowByRowId(rowId).getSimpleData();
                viewModel.currentResRow = currentData;
                var searchButton = $("#dialog_assignedItemWin .J-search");
                searchButton.off().on("click", function () {
                    viewModel.searchAssignedItemWin(currentData)
                })
                var batchCancelButton = $("#dialog_assignedItemWin .J-batchCancel");
                batchCancelButton.off().on("click", function () {
                    viewModel.batchCancelItems();
                    // viewModel.searchAssignedItemWin(currentData)
                })
                var okButton = $("#dialog_assignedItemWin .J-ok");
                okButton.off().on("click", function () {
                    viewModel.assignedItemWinOk();
                    viewModel.dialog_assignedItemWin.close();
                })
                var cancelButton = $("#dialog_assignedItemWin .J-cancel");
                cancelButton.off().on("click", function () {
                    viewModel.dialog_assignedItemWin.close();
                });

                if (!viewModel.dialog_assignedItemWin) {
                    viewModel.dialog_assignedItemWin = u.dialog({
                        id: "dialog_assignedItemWin",
                        content: "#dialog_assignedItemWin",
                        hasCloseMenu: true,
                        width: "80%"
                    });
                } else {
                    viewModel.dialog_assignedItemWin.show();
                }
                viewModel.searchAssignedItemWin(currentData)
            },

            //取消分配具体的资源实例
            cancelAssigned: function (index, rowId) {
                var currentData = viewModel.assignedItemWinList.getRowByRowId(rowId).getSimpleData();
                var queryData = {
                    id:currentData.id,
                }
                $._ajax({
                    url: appCtx + viewModel.resUrl + "/delete-data-permission",
                    type: "post",
                    // data: "ids=" + ids.join(","),
                    data: queryData,
                    success: function (data) {
                        viewModel.searchAssignedItemWin(viewModel.currentResRow)
                    }
                });
            },

            //取消分配资源对象（包含该资源对象的所有已分配实例）或权限规则
            deleteAssigned: function (index, rowId) {
                var currentData = viewModel.assignedList.getRowByRowId(rowId).getSimpleData();
                var queryData = {
                    roleId:viewModel.roleId,
                    appCode:viewModel.assignedComboList.getValue("assignedApp"),
                    dimId:currentData.dimId,
                    resId:currentData.resId,
                    typeValue:currentData.typeValue,
                };
                viewModel.assignedList.removeRowByRowId(rowId);
                $._ajax({
                    url: appCtx + viewModel.resUrl + "/delete-data-permissions",
                    type: "post",
                    // data: "ids=" + ids.join(","),
                    data: queryData,
                    success: function (data) {
                        // viewModel.searchAssigned(viewModel.roleId)
                    }
                });
            },


            pageChange1: function(index) {
                viewModel.roleList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange1: function(size) {
                viewModel.roleList.pageSize(size);
                viewModel.search(true);
            },


            pageChange3: function(index) {
                viewModel.appList.pageIndex(index);
                viewModel.searchApp();
            },
            //页码改变时的回调函数
            sizeChange3: function(size) {
                viewModel.appList.pageSize(size);
                viewModel.searchApp(true);
            },

            pageChange5: function(index) {
                viewModel.itemWinList.pageIndex(index);
                viewModel.searchItemWin(viewModel.currentResRow);
            },
            //页码改变时的回调函数
            sizeChange5: function(size) {
                viewModel.itemWinList.pageSize(size);
                viewModel.searchItemWin(viewModel.currentResRow);
            },

            pageChange6: function(index) {
                viewModel.assignedItemWinList.pageIndex(index);
                viewModel.searchAssignedItemWin(viewModel.currentResRow);
            },
            //页码改变时的回调函数
            sizeChange6: function(size) {
                viewModel.assignedItemWinList.pageSize(size);
                viewModel.searchAssignedItemWin(viewModel.currentResRow);
            },
        }),
        afterCreate: function () {
            viewModel.search();
            viewModel.assignedComboList.on("assignedApp.valuechange", function(obj) {
                viewModel.searchAssigned(viewModel.roleId);
            });
        }
    });

    return view;
});

