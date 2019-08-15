define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    'use strict'
    var viewModel
    ,appCtx = "/occ-settlement";
    var view = simpleview.extend({
      beforeCreate:function(){
        viewModel = this.viewModel;
      },
      model: model,
      baseData: {
        baseurl: '/settlement/gathering-types',
        // excelurl: '/potypes-Excel',单表档案支持导入导出时需配置此属性
        // dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
        // statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
        simpleList: new u.DataTable(model.options.metas.gatheringMeta),
        buttonSource: model.options.buttons.button1,
        searchcomp: {},
        searchSource: model.options.searchs.search1,
        dialogcardcomp: {},
        dialogcardSource: model.options.dialogs.dialog1,
        detailSource: model.options.details.detail,
        gridOption: model.options.grids.grid1,
        enableFmt: ko.pureComputed(function () {
          var status = viewModel.simpleList.ref("enable")();
          return status == 1 ? "启用" : "停用";
        }),
      },
      afterCreate : function(){

        // console.log(appCtx);
      },
    });
  
    return view;
  });