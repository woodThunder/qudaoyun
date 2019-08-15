define(['ocm_simpleview', './meta.js', 'ocm_common'], function (simpleview, model,common){
  'use strict'
  var viewModel;
  var view = simpleview.extend({
    beforeCreate:function(){
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/dispatch/b2c-match-strategys',
      // excelurl: '/potypes-Excel',单表档案支持导入导出时需配置此属性
      // dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
      // statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
      simpleList: new u.DataTable(model.options.metas.b2ccarriermeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,
    },
    rendertype: u.extend({}, common.rendertype, {
      //优先维度
      dimensionRender: function (obj) {
        obj.element.innerHTML = (obj.value == 1? "四级收货地址" : "商品或产品线");
      }
    }),
    events: u.extend({}, simpleview.prototype.events, {
      //由于不同节点采用同一个后台模型，重写查询、编辑方法。
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          postdata.type = 2;
          if (index >= 0) {
            type = "put";
          }
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //如果index大于等于0说明是修改
              viewModel.dialogcardcomp.close();
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到simpleList上
              } else {
                //添加数据
                currentRow = viewModel.simpleList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
            }
          })

        }
      },
      search: function (reindex) {
        if (!viewModel.searchcomp) {
          $('div.ui-searchbox').css('display', 'none');
          // return;
        }
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        if (!viewModel.searchcomp) {
          var queryData = {};
        } else {
          var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        }
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        queryData["search_EQ_type"] = 2;
        $._ajax({
          type: "get",
          url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        })
      }
    })
  });

  return view;
});