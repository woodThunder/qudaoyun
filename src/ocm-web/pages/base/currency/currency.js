define(['ocm_simpleview', './meta.js','ocm_common'], function (simpleview, model,common) {
  
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model:model,
    baseData:{
      baseurl: '/currency',
      excelurl:'/currency-excel',
      statusField:'isEnable',
      simpleList: new u.DataTable(model.options.metas.currencyMeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },
    events: u.extend({}, simpleview.prototype.events, {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index, rowId) {
        var title;
        viewModel.index = index;
        // viewModel.isDefault = false;
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
          if (currentData.isDefault == 1) {
            viewModel.isDefault = true
          }else{
            viewModel.isDefault = false
          }
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增"
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogWidth ?
          viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
          viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },
      //将操作后的数据进行保存
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          if (index >= 0) {
            type = "put";
          }
          if (postdata.isDefault == 0 && viewModel.isDefault) {
            common.dialog.confirmDialog({
              msg1: '确定要取消系统默认吗？',
              msg2: '此操作将产生巨大影响，请谨慎操作',
              width: '400px',
              type: 'error',
              onOk: function () {
                //更改后台数据
                $._ajax({
                  url: appCtx + viewModel.baseurl,
                  type: type,
                  data: JSON.stringify(postdata),
                  contentType: "application/json; charset=utf-8",
                  success: function (data) {
                    //如果index大于等于0说明是修改
                    viewModel.dialogcardcomp.close();
                    currentRow = viewModel.search()
                  }
                })
              }
            });
          } else {
            //更改后台数据
            $._ajax({
              url: appCtx + viewModel.baseurl,
              type: type,
              data: JSON.stringify(postdata),
              contentType: "application/json; charset=utf-8",
              success: function (data) {
                //如果index大于等于0说明是修改
                viewModel.dialogcardcomp.close();
                currentRow = viewModel.search()
              }
            })
          }
        }
      },
    })
  });
  return view;
});