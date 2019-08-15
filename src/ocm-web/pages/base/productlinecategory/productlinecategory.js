define(['ocm_simpleview', './meta.js', 'ocm_common'], function (simpleview, model, common) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/product-line-category',
      simpleList: new u.DataTable(model.options.metas.ProductLineCategorymeta),
      statusField: 'statusCode',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },
    events: $.extend({}, simpleview.prototype.events, {
      //重写edit事件
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdateTrue = [];
          var postdata = viewModel.dialogcardcomp.geteidtData();

          if (index >= 0) {
            // 编辑单行数据
            type = "put";
            postdateTrue = postdata;
          } else {
            // 新增，支持批量操作
            ids = postdata.productCategoryId.split(",")
            for (var i = 0; i < ids.length; i++) {
              var tempdata = {
                prodGroupId: postdata.prodGroupId,
                productCategoryId: ids[i],
                persistStatus: "new",
                ifExclude: 0
              };
              postdateTrue.push(u.extend({}, postdata, tempdata));

            }
          }
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl + (index >= 0 ? "" : "/batch-save"),
            type: type,
            data: JSON.stringify(postdateTrue),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //如果index大于等于0说明是修改
              viewModel.dialogcardcomp.close();
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
                currentRow.setSimpleData(data);
                //将用户填写的数据更新到simpleList上
              } else {
                //添加数据
                //添加数据
                viewModel.simpleList.addSimpleData(data);
              }

            }
          })

        }
      }
    })
  });

  return view;
});

