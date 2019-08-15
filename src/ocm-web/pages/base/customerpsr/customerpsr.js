define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/base/customer-psrs',
      simpleList: new u.DataTable(model.options.metas.custpursalemeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },

    afterCreate: function () {
      viewModel.dialogcardcomp.viewModel.params.on("productLineId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != "") {
          viewModel.dialogcardcomp.viewModel.params.setMeta("brandId",'enable',false)
        }else{
          viewModel.dialogcardcomp.viewModel.params.setMeta("brandId",'enable',true)
        }
      })
      viewModel.dialogcardcomp.viewModel.params.on("brandId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != "") {
          viewModel.dialogcardcomp.viewModel.params.setMeta("productLineId",'enable',false)
        }else{
          viewModel.dialogcardcomp.viewModel.params.setMeta("productLineId",'enable',true)
        }
      })

    }
  });

  return view;
});
