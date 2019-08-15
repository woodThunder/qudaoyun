define(["ocm_simpleview", "./meta.js", "ocm_common"], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: "/base/tax-categorys",
            simpleList: new u.DataTable(model.options.metas.TaxCategoryMeta),
            statusField: "isEnable",
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1
        }
    });

    return view;
});
