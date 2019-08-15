define(['ocm_simpleview', 'ocm_common', './meta.js'], function(simpleview, common, model) {
    'use strict'

    var viewModel, appCtx = "/occ-settlement";
    var view = simpleview.extend({

        beforeCreate: function() {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/settlement/accountmatchs',
            simpleList: new u.DataTable(model.options.metas.matchMeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            detailSource: model.options.details.detail,
            gridOption: model.options.grids.grid1,
            orderTypeSrc: [],
        },
        afterCreate: function() {
            viewModel.dialogcardcomp.viewModel.params.on('customerTypeId.valuechange', function(obj) {
                if (!obj.newValue) {
                    return;
                }
                viewModel.dialogcardcomp.viewModel.params.setValue('customerId', '');
            });
            viewModel.dialogcardcomp.viewModel.params.on('customerId.valuechange', function(obj) {
                if (!obj.newValue) {
                    return;
                }
                viewModel.dialogcardcomp.viewModel.params.setValue('customerTypeId', '');
            });
            // //订单类型
            // $._ajax({
            //     type: "get",
            //     url: appCtx + "/settlement/enum-service/data",
            //     async: false,
            //     data: {
            //         enumClassName: "com.yonyou.occ.settlement.enums.OrderTypeCountEnum"
            //     },
            //     success: function(data) {
            //         var newarray = common.dataconvert.toMap(data, "name", "code");
            //         viewModel.orderTypeSrc = newarray;
            //     }
            // });
        }
    });
    return view;
});