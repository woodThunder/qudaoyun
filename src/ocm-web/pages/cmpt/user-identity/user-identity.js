define(["ocm_simpleview", "./meta.js"], function (simpleview, model) {
    var viewModel,app;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
            app = this.app;
        },
        model: model,
        baseData: {
            baseurl: "/users",
            roleUrl: "/cmpt/roles",
            simpleList: new u.DataTable(model.options.metas.userIdentityMeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1
        },
        rendertype: u.extend({}, simpleview.prototype.rendertype, {
            // 单表操作
            operation4single: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var editfun =
                    "data-bind=click:beforeEdit.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\">" +
                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\" " +
                    editfun +
                    " title=\"编辑\">编辑</a>" +
                    "</span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            }
        }),
        events: u.extend({}, simpleview.prototype.events, {
            beforeEdit: function (index, rowId) {
                var title;
                viewModel.index = index;
                //修改操作
                title = "编辑";
                var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                /*if (viewModel.role == "chn-mgr-source" && currentData.businessPersonId != null) {
                    toastr.warning("业务员身份已经配置，不可修改！");
                    return;
                }*/
                if(viewModel.role != "chn-mgr-source"
                    && (currentData.channelCustomerId != null )){
                        toastr.warning("渠道商身份已经配置，不可修改！");
                        return;
                }

                viewModel.rowId = rowId;
                viewModel.dialogcardcomp.seteidtData(currentData);
                //显示模态框
                viewModel.dialogWidth ?
                    viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
                    viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
            }
        }),
        afterCreate: function () {
            var userId =$.cookie('_A_P_userId');
            var customerStr = localStorage.getItem('_A_P_customer');
            var customer = JSON.parse(customerStr);
            $._ajax({
                url: appCtx + viewModel.roleUrl+"/find-users",
                type: "get",
                data: { "userId": userId},
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.length > 0){
                        var identity = false;
                        for (var i = 0; i < data.length; i++) {
                            if(data[i].label =="chn-mgr-source"){
                                identity = true;
                            }
                        }
                        for (var i = 0; i < data.length; i++) {
                            if(data[i].label =="mgrsource"){
                                identity = false;
                            }
                        }
                        if(identity){
                            //设置角色，编辑时取值判断
                            viewModel.role = "chn-mgr-source";
                            var channelCustomerId = viewModel.dialogcardcomp.app.getComp("channelCustomerId");
                            channelCustomerId.setEnable(false);
                            //通过获取到search 的 datatable 并修改meta即可控制enable；
                            viewModel.searchcomp.viewModel.params.setMeta("channelCustomer","enable",false);
                            viewModel.searchcomp.viewModel.params.meta.channelCustomer.enable = false
                            viewModel.searchcomp.viewModel.params.setValue("channelCustomer", customer.id);
                            viewModel.search();
                            var listData = viewModel.simpleList.getSimpleData();
                            viewModel.simpleList.setSimpleData(listData, {
                                unSelect: true
                            });
                        }
                    }
                }
            })

        }
    });
    return view;
});
