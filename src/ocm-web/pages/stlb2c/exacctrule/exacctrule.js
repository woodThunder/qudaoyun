define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
      beforeCreate:function(){
        viewModel = this.viewModel;
      },
      model:model,
      baseData:{
        baseurl: '/stlb2c/exacct-rules',
        simpleList: new u.DataTable(model.options.metas.ExacctRulemeta),
        statusField:'isEnable',
        buttonSource: model.options.buttons.button1,
        searchcomp: {},
        searchSource: model.options.searchs.search1,
        dialogcardcomp: {},
        dialogcardSource: model.options.dialogs.dialog1,
        gridOption: model.options.grids.grid1,
      },
      rendertype: {
        billingTypeValueRender:function(obj) {
          var showValue;
          if(obj.value == "1"){
            showValue = "业务类型"
          }else if(obj.value == "2"){
            showValue = "备注"
          }
          obj.element.innerHTML = showValue;
        },
        platformNoValueRender:function(obj) {
          var showValue;
          if(obj.value == "1"){
            showValue = "商户订单号"
          }else if(obj.value == "2"){
            showValue = "备注"
          }
          obj.element.innerHTML = showValue;
        },
        sourcePlatformRender:function(obj) {
          var showValue;
          if(obj.value == "1"){
            showValue = "淘宝"
          }
          obj.element.innerHTML = showValue;
        },
      },
    });
  
    return view;
  });
  
