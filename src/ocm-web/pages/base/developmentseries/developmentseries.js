define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate:function(){
            viewModel = this.viewModel;
        },
        model:model,
        baseData:{
            baseurl: '/base/development-series',
            dialogWidth: '900px',
            simpleList: new u.DataTable(model.options.metas.SaleSeriesmeta),
            statusField:'isEnable',
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            detailSource: model.options.details.detail,
            enableFmt: ko.pureComputed(function () {
                var status = viewModel.simpleList.ref("isEnable")();
                var enableName
                if (status == 0) {
                    enableName = "未启用"
                }
                if (status == 1) {
                    enableName = "已启用"
                }
                if (status == 2) {
                    enableName = "已停用"
                }
                return enableName;
            })
        }
    });

    return view;
});

