define(["ocm_simpleview", "./meta.js"], function(simpleview, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
      //  对新增保存时有其他需求的校验添加的方法（命名editVerify） ---syf
      viewModel.editVerify = function(value) {
        if (
          isNaN(value.length) ||
          isNaN(value.loadableVolume) ||
          isNaN(value.loadableWeight)
        ) {
          toastr.warning("请输入数字！");
          return true;
        } else if (
          (!isNaN(value.length) &&
            value.length.toString().indexOf(".") != -1 &&
            value.length.toString().split(".")[1].length > 1) ||
          (!isNaN(value.loadableVolume) &&
            value.loadableVolume.toString().indexOf(".") != -1 &&
            value.loadableVolume.toString().split(".")[1].length > 2) ||
          (!isNaN(value.loadableWeight) &&
            value.loadableWeight.toString().indexOf(".") != -1 &&
            value.loadableWeight.toString().split(".")[1].length > 2)
        ) {
          var toastText = "您填写的";
          if (
            value.length.toString().indexOf(".") != -1 &&
            value.length.toString().split(".")[1].length > 1
          ) {
            toastText = toastText + "车身长度超过小数点后1位了";
          }
          if (
            value.loadableVolume.toString().indexOf(".") != -1 &&
            value.loadableVolume.toString().split(".")[1].length > 2
          ) {
            toastText = toastText + ",装载体积超过小数点后2位了";
          }
          if (
            value.loadableWeight.toString().indexOf(".") != -1 &&
            value.loadableWeight.toString().split(".")[1].length > 2
          ) {
            toastText = toastText + ",装载重量超过小数点后2位了";
          }
          toastr.warning(toastText);
          return true;
        }
      };
    },
    model: model,
    baseData: {
      baseurl: "/b2b/truck-model-mgts",
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
