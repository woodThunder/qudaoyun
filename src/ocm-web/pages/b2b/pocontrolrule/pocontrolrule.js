define(["ocm_simpleview", "./meta.js"], function(simpleview, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
      //  对新增保存时有其他需求的校验添加的方法（命名editVerify） ---syf
      viewModel.editVerify = function(value) {
        if (
          isNaN(value.preferentialRatio) ||
          value.preferentialRatio > 100 ||
          value.preferentialRatio < 0
        ) {
          toastr.warning("优惠比例请输入1-100的数字！");
          return true;
        }
        value.preferentialRatio = value.preferentialRatio.toString();
      };
    },
    model: model,
    baseData: {
      baseurl: "/b2b/order-control-rule",
      simpleList: new u.DataTable(model.options.metas.poControlRulemeta),
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
