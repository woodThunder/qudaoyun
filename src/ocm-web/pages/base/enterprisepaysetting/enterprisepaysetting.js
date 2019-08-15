define(['ocm_simpleview', 'text!./enterprisepaysetting.html', './meta.js', 'ocm_common',], function (simpleview, tpl, model, common) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/base/enterprise-pay-settings',
      simpleList: new u.DataTable(model.options.metas.unitmeta),
      statusField: 'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,
      card3Source: model.options.cards.card3,

    },
    events: u.extend({}, simpleview.prototype.events, {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index, rowId) {
        var title;
        viewModel.index = index;
        // viewModel.isBasicUnit = false;
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
          if (currentData.isBasicUnit == 1) {
            viewModel.isBasicUnit = true;
          } else {
            viewModel.isBasicUnit = false;
          }
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增"
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
          viewModel.isBasicUnit = false;
        }
        //显示模态框
        viewModel.dialogWidth ?
          viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
          viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },
      //将操作后的数据进行保存
      btnOk: function () {
        // var result = viewModel.dialogcardcomp.validate();
        // if (result.passed) {
        //   var index = viewModel.index;
        //   var currentRow, type = "post";
        //   var postdata = viewModel.dialogcardcomp.geteidtData();
        //   if (index >= 0) {
        //     type = "put";
        //   }
        //   if (postdata.isBasicUnit == 0 && viewModel.isBasicUnit) {
        //     common.dialog.confirmDialog({
        //       msg1: '确定要设置为非基本单位吗？',
        //       msg2: '此操作将产生巨大影响，请谨慎操作',
        //       width: '400px',
        //       type: 'error',
        //       onOk: function () {
        //         //更改后台数据
        //         $._ajax({
        //           url: appCtx + viewModel.baseurl,
        //           type: type,
        //           data: JSON.stringify(postdata),
        //           contentType: "application/json; charset=utf-8",
        //           success: function (data) {
        //             //如果index大于等于0说明是修改
        //             viewModel.dialogcardcomp.close();
        //             currentRow = viewModel.search()
        //           }
        //         })
        //       }
        //     });
        //   } else {
        //     //更改后台数据
        //     $._ajax({
        //       url: appCtx + viewModel.baseurl,
        //       type: type,
        //       data: JSON.stringify(postdata),
        //       contentType: "application/json; charset=utf-8",
        //       success: function (data) {
        //         //如果index大于等于0说明是修改
        //         viewModel.dialogcardcomp.close();
        //         currentRow = viewModel.search()
        //       }
        //     })
        //   }
        // }
        var postdata = viewModel.simpleList.getSimpleData()[0];
        postdata.legalPersonCorpId = viewModel.legalPersonCorpId
        var type = "post"
        if (postdata.id) {
          type = "put"
        }
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            //如果index大于等于0说明是修改
            // viewModel.dialogcardcomp.close();
            // currentRow = viewModel.search()
          }
        })
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {

      },
    }),
    afterCreate: function () {
      viewModel.searchcomp.viewModel.params.on("legalPersonCorp--id.valuechange", function (
        obj
      ) {
        var legalPersonCorpId = obj.newValue;
        viewModel.legalPersonCorpId = legalPersonCorpId
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        viewModel.simpleList.removeAllRows()
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            if (data.content && data.content.length > 0) {
              var row = viewModel.simpleList.createEmptyRow();
              row.setSimpleData(data.content[0]);
              viewModel.simpleList.setRowFocus(row);
            } else {
              var row = viewModel.simpleList.createEmptyRow();
              viewModel.simpleList.setRowFocus(row);
              
            }
          }
        })
      });
    }
  });

  return view;
});
