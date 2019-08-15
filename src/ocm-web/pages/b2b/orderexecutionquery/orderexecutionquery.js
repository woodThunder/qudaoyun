define(["ocm_simpleview", "./meta.js"], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: "/b2b/order/query-order-execution",
            simpleList: new u.DataTable(model.options.metas.orderexecutionquery),
            //buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            dialogWidth: "900px",

        },
        events :u.extend({}, simpleview.prototype.events, {
            beforeEdit: function(index, rowId)
            {
                simpleview.prototype.events.beforeEdit(index, rowId);
                var saleOrgValue = viewModel.dialogcardcomp.viewModel.params.getValue("saleOrgId");
                var saleDeptValue = viewModel.dialogcardcomp.viewModel.params.getValue("salesDeptId");
                var orgObj = {};
                var deptObj = {};
                orgObj.newValue = saleOrgValue;
                deptObj.newValue = saleDeptValue;
                viewModel.orgValChange(orgObj);
                if(saleDeptValue) {
                    viewModel.deptValChange(deptObj);
                }
            },
            orgValChange: function(obj) {
                var compDept = viewModel.dialogcardcomp.app.getComp("salesDeptId");
                var compMapnger = viewModel.dialogcardcomp.app.getComp("salesManagerId");
                if (obj.newValue && obj.newValue != "") {
                    compDept.setEnable(true);
                    compMapnger.setEnable(true);
                    var deptValue = {
                        "EQ_organization.id": obj.newValue,
                        "EQ_isEnable": '1',
                    };

                    var managerValue = {
                        "EQ_personPosts.organization.id": obj.newValue,
                        "EQ_isEnable": '1',
                    };
                    $("#salesManagerId").attr("data-refparam", JSON.stringify(managerValue));
                    $("#salesDeptId").attr("data-refparam", JSON.stringify(deptValue));
                } else {
                    compDept.setEnable(false);
                    compMapnger.setEnable(false);
                }
                if(obj.oldValue) {
                    viewModel.dialogcardcomp.viewModel.params.setValue("salesDeptId", null);
                    viewModel.dialogcardcomp.viewModel.params.setValue("salesManagerId", null);
                }
            },
            deptValChange: function(obj) {
                var saleOrgValue = viewModel.dialogcardcomp.viewModel.params.getValue("saleOrgId");
                var townValue = {
                    "EQ_personPosts.organization.id": saleOrgValue,
                    "EQ_personPosts.department.id": obj.newValue,
                    "EQ_isEnable": '1',
                };
                $("#salesManagerId").attr("data-refparam", JSON.stringify(townValue));
                if(obj.oldValue) {
                    viewModel.dialogcardcomp.viewModel.params.setValue("salesManagerId", null);
                }
            }
        }),
        afterCreate: function() {
            //销售组织的编辑后事件，设置部门和客户经理的参照过滤
            viewModel.dialogcardcomp.viewModel.params.on("saleOrgId.valuechange", function (obj) {
                viewModel.orgValChange(obj);
            })
            //部门编辑后事件，设置客户经理字段的参照过滤
            viewModel.dialogcardcomp.viewModel.params.on("salesDeptId.valuechange", function (obj) {
                viewModel.deptValChange(obj)
            })

            //搜索条件中的部门参照销售组织过滤
            viewModel.searchcomp.viewModel.params.on("saleOrg.valuechange", function(obj) {
                if(obj.newValue != undefined && obj.newValue != "") {
                    var saleOrgValue = {
                        "IN_organization.id": obj.newValue
                    };
                    $("#salesDept").attr("data-refparam", JSON.stringify(saleOrgValue));
                } else {
                    viewModel.searchcomp.viewModel.params.setValue("salesDept", "");
                }
            })
        }
    });
    return view;
});
