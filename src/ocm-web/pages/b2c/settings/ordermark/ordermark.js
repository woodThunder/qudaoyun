define(['text!./ordermark.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c";
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/b2c/order-sign',
      ordermarkList: new u.DataTable(model.options.metas.ordermarkmeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,
      colorEnum: [],


    },
    rendertype: common.rendertype,
    events: {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index, rowId) {
        var title;
        viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.ordermarkList.getRowByRowId(rowId).getSimpleData();
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增"
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },
      //将操作后的数据进行保存
      edit: function() {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          if (index >= 0) {
            type = "put";
          }
          if (postdata.describe.length > 200) {
            toastr.warning("描述信息不能大于200字符");
            reutrn;
          }
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              toastr.success(data.message);
              //如果index大于等于0说明是修改
              viewModel.dialogcardcomp.close();
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.ordermarkList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到simpleList上
              } else {
                //添加数据
                currentRow = viewModel.ordermarkList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
            }
          })

        }
      },
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.ordermarkList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.ordermarkList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function() {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function(data) {
                  viewModel.ordermarkList.removeRows(rows);
                }
              });
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.ordermarkList.pageIndex(0);
        }
        viewModel.ordermarkList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.size = viewModel.ordermarkList.pageSize();
        queryData.page = viewModel.ordermarkList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.ordermarkList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.ordermarkList.totalRow(data.totalElements);
            viewModel.ordermarkList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.ordermarkList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.ordermarkList.pageSize(size);
        viewModel.search(true);
      },


    },
    afterCreate: function() {
      viewModel.search();
      //颜色枚举
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.OrderSignEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.colorEnum = newarray;
        }
      });
    }
  });

  return view;
});