define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate:function(){
            viewModel = this.viewModel;
        },
        model:model,
        baseData:{
            baseurl: '/parameter-settings',
            simpleList: new u.DataTable(model.options.metas.parameter_setting),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1
        },
        afterCreate: function(){
            $('.ui-name').css({
                width: '170px'
            });
        }
    });

    return view;
});