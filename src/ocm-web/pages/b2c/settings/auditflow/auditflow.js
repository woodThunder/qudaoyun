define(['text!./auditflow.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c/b2c";
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/audit-flows',
      simpleList: new u.DataTable(model.options.metas.auditmeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      // searchSource: model.options.searchs.search1,
      // dialogcardcomp: {},
      // dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },
    rendertype: common.rendertype,
    events: {
      //刷新
      refresh: function() {
        viewModel.simpleList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
          }
        })
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      // cleanSearch: function() {
      //   viewModel.searchcomp.clearSearch();
      // },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.simpleList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.simpleList.pageSize(size);
        viewModel.search(true);
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "1");
              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.simpleList.getSelectedRows(),
          isSplit = false;
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function(row, index, arr) {
            if (row.getValue('pluginName') == '拆分订单') {
              toastr.error("拆分订单不可以停用！");
              isSplit = true;
              return false
            } else {
              return row.getValue("id");
            }
          })
          if (isSplit) {
            return;
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "2");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
    },
    afterCreate: function() {
      viewModel.search();
    }
  });

  return view;
});