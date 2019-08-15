define(["ocm_simpleview", "./meta.js"], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: "/cmpt/bill-flow-configs",
            simpleList: new u.DataTable(model.options.metas.billFlowConfigMeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1
        },
        afterCreate: function () {
            viewModel.dialogcardcomp.viewModel.params.on("billTypeId.valuechange", function (obj) {
                var tranTypeValue = {
                    "EQ_billTypeId": obj.newValue,
                };
                $("#tranTypeIdinfo").attr("data-refparam", JSON.stringify(tranTypeValue));
                var tranTypeId = viewModel.app.getComp("tranTypeIdBase");
                viewModel.dialogcardcomp.viewModel.params.setValue("tranTypeId", "");
            });
        }
    });
    return view;
});
