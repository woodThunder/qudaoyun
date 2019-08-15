define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate:function(){
            viewModel = this.viewModel;
        },
        model:model,
        baseData:{
            baseurl : '/price/price-discounts',
            searchBaseurl : '/price/price-discounts',
            simpleList: new u.DataTable(model.options.metas.discountMeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
        },
        afterCreate: function() {
            viewModel.dialogcardcomp.viewModel.params.on("organizationId.valuechange", function(obj) {
                if (obj.newValue == '' || obj.oldValue != obj.newValue) {
                    $("#priceMaintainId").attr("data-refparam", JSON.stringify({"EQ_priceList.organization":obj.newValue}));
                    viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue('priceMaintainId','');
                }
            });
        }
    });

    return view;
});

