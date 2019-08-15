define(['ocm_simpleview','ocm_common', './meta.js'], function (simpleview,common, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate:function(){
      viewModel = this.viewModel;
    },
    model:model,
    rendertype: {
      operation: common.rendertype.operation4single,
      typeRender:function(obj) {
        var showValue;
        if(obj.value == "01"){
          showValue = "内部单位"
        }else if(obj.value == "02"){
          showValue = "外部单位"
        }
        obj.element.innerHTML = showValue;
      },
    },
    baseData:{
      baseurl: '/suppliers',
      simpleList: new u.DataTable(model.options.metas.suppliermeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },
  });

  return view;
});