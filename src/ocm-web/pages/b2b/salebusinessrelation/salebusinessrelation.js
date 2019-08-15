define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
      beforeCreate:function(){
        viewModel = this.viewModel;
      },
      model:model,
      baseData:{
        baseurl: '/b2b/sale-business-relations',
        simpleList: new u.DataTable(model.options.metas.cust_ordertype),
        buttonSource: model.options.buttons.button1,
        searchcomp: {},
        searchSource: model.options.searchs.search1,
        dialogcardcomp: {},
        dialogcardSource: model.options.dialogs.dialog1,
        gridOption: model.options.grids.grid1
      },
      events: $.extend({}, simpleview.prototype.events, {
        // 重写beforeEdit
        beforeEdit: function (index, rowId) {
          var title;
          viewModel.index = index;
          if (u.isNumber(index)) {
            //修改操作
            title = "编辑";
            var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
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
        }
      }),
    });
  
    return view;
  });
  