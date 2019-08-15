define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/b2b/contrast-cust-ordertypes',
            simpleList: new u.DataTable(model.options.metas.cust_ordertype),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1
        },
        events: $.extend({}, simpleview.prototype.events, {
            // 重写beforeEdit
            beforeEdit: function (index, rowId) {
                var title;
                viewModel.index = index;
                var customerIdBase = viewModel.dialogcardcomp.app.getComp("customerIdBase");
                var customerCategoryIdBase = viewModel.dialogcardcomp.app.getComp("customerCategoryIdBase");
                if (u.isNumber(index)) {
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                    viewModel.rowId = rowId;
                    // 如果客户有值，设置可编辑
                    if (currentData.customerId) {
                        customerIdBase.setEnable(true);
                        customerCategoryIdBase.setEnable(false);
                    }
                    // 如果客户分类有值，设置可编辑
                    if (currentData.customerCategoryId) {
                        customerCategoryIdBase.setEnable(true);
                        customerIdBase.setEnable(false);
                    }
                    viewModel.dialogcardcomp.seteidtData(currentData);
                } else {
                    title = "新增"
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                    customerIdBase.setEnable(true);
                    customerCategoryIdBase.setEnable(true);
                }
                //customerIdBase.setEnable(true);
                //customerCategoryIdBase.setEnable(true);
                //显示模态框
                viewModel.dialogWidth ?
                    viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
                    viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);

                viewModel.dialogcardcomp.app.getComp("trantypeId").setEnable(false);
                viewModel.dialogcardcomp.app.getComp("billTypeId").setEnable(false);
            }
        }),
        afterCreate: function () {
            viewModel.dialogcardcomp.viewModel.params.on("customerId.valuechange", function (obj) {
                var customerCategoryIdBase = viewModel.dialogcardcomp.app.getComp("customerCategoryIdBase");
                if (obj.newValue) {
                    customerCategoryIdBase.setEnable(false);
                } else {
                    customerCategoryIdBase.setEnable(true);
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("customerCategoryId.valuechange", function (obj) {
                var customerIdBase = viewModel.dialogcardcomp.app.getComp("customerIdBase");
                if (obj.newValue) {
                    customerIdBase.setEnable(false);
                } else {
                    customerIdBase.setEnable(true);
                }
            });
            /*viewModel.dialogcardcomp.viewModel.params.on("poTypeId.valuechange", function (obj) {
                if (obj.newValue && obj.newValue!=obj.oldValue) {
                    var data = $("#refContainerpoTypeId").data("uui.refer").values[0];
                    if(data.isReturn == 1){
                        viewModel.dialogcardcomp.viewModel.params.setValue("saleModelCode","02" );
                    }else if(data.isGoodsSupplement == 1){
                        viewModel.dialogcardcomp.viewModel.params.setValue("saleModelCode","03" );
                    }else{
                        viewModel.dialogcardcomp.viewModel.params.setValue("saleModelCode","01");
                    }
                }
            });*/
            viewModel.dialogcardcomp.viewModel.params.on("billTypeId.valuechange", function (obj) {
                if (obj.newValue && obj.newValue != obj.oldValue) {
                    var data = $("#refContainerbillTypeId").data("uui.refer").values[0];
                    var trantype = viewModel.dialogcardcomp.app.getComp("trantypeId");
                    $(trantype.element).attr('data-refparam', '{"EQ_billTypeId":"' + data.id + '"}');
                    trantype.setEnable(true);
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("saleModelCode.valuechange", function (obj) {
                if (obj.newValue && obj.newValue != obj.oldValue) {
                    viewModel.dialogcardcomp.viewModel.params.setValue("billTypeId", "");
                    viewModel.dialogcardcomp.viewModel.params.setValue("trantypeId", "");
                    var billType = 'ReqOrder'

                    // var data = $("#refContainersaleModelId").data("uui.refer").values[0];
                    if (obj.newValue == 4 || obj.newValue == 5 || obj.newValue == 6) {
                        billType = 'PayBill';
                    }
                    var billTypeComp = viewModel.dialogcardcomp.app.getComp("billTypeId");
                    $(billTypeComp.element).attr('data-refparam', '{"EQ_id":"' + billType + '"}');
                    billTypeComp.setEnable(true);
                    // trantype.setEnable(true);
                }
            });
        }
    });

    return view;
});
