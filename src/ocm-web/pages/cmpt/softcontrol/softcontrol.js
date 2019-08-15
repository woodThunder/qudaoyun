define(['ocm_simpleview', './meta.js','ocm_common'], function (simpleview, model,common) {
  
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model:model,
    baseData:{
      baseurl: '/cmpt/soft-controls',
      simpleList: new u.DataTable(model.options.metas.softControlMeta),
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    }
  });
  return view;
});