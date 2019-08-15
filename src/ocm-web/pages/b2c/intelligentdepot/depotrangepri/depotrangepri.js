define(['text!./depotrangepri.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c/b2c";
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/route/stor-coverage-details',
      depotrangpriList: new u.DataTable(model.options.metas.depotrangprimeta),
      button1Source: model.options.buttons.button3,
      button2Source: model.options.buttons.button2,
      searchcomp: {},
      gridcomp: {},
      tempdata: [],
      ItemRefList: new u.DataTable(model.options.metas.ItemRef),
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },
    rendertype: common.rendertype,
    events: {
      //将操作后的数据进行保存
      edit: function() {
        viewModel.tempdata = viewModel.depotrangpriList.getSimpleData();
        viewModel.showEditPage();
      },
      cancle: function() {
        viewModel.depotrangpriList.removeAllRows();
        viewModel.depotrangpriList.setSimpleData(viewModel.tempdata, {
          "unSelect": true
        });
        viewModel.showDefaultPage();
      },
      showEditPage: function() {
        viewModel.gridcomp.setEditable(true);
        $("#page-view").hide(200);
        $("#page-edit").show(200);
      },
      showDefaultPage: function() {
        viewModel.gridcomp.setEditable(false);
        $("#page-edit").hide(200);
        $("#page-view").show(200);
      },
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.depotrangpriList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.depotrangpriList.getSelectedRows();
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
                  viewModel.depotrangpriList.removeRows(rows);
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
          viewModel.depotrangpriList.pageIndex(0);
        }
        viewModel.depotrangpriList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        // queryData.size = viewModel.depotrangpriList.pageSize();
        // queryData.page = viewModel.depotrangpriList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.depotrangpriList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.depotrangpriList.totalRow(data.totalElements);
            viewModel.depotrangpriList.totalPages(data.totalPages);
          }
        })
      },
      //调整优先级
      adpri: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.depotrangpriList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.depotrangpriList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          // viewModel.dialogcardcomp.cleareidt();
          // var currentData = viewModel.ordermarkList.getRowByRowId(rowId).getSimpleData();
          // viewModel.rowId = rowId;
          // viewModel.dialogcardcomp.seteidtData(currentData);
          //显示模态框
          viewModel.dialogcardcomp.show("修改优先级", "500px", viewModel.editPri);
          $('div[id^="dialogCard"] .u-msg-footer .J-ok').text('确定');
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      editPri: function() {
        var result = viewModel.dialogcardcomp.validate();
        if (!result.passed) return;
        var rows = viewModel.depotrangpriList.getSelectedRows(),
          ids = [];
        var postdata = viewModel.dialogcardcomp.geteidtData();
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].setValue("priority", postdata.priority));
        }
        viewModel.dialogcardcomp.close();
      },
      //参照选择批选仓库
      batchdepots: function() {
        viewModel.clearItemsRef();
        $("#addItemsRef .refer").trigger("click");
      },
      //清空已选销售产品参照
      clearItemsRef: function() {
        viewModel.ItemRefList.setValue("storref", "");
        var refer = $("#refContainerstorref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      //保存
      save: function() {
        var postdata = viewModel.depotrangpriList.getSimpleData();
        var changeData = [];
        var nochangeData = []
        if (postdata && postdata.length > 0) {
          for (var i = 0; i < postdata.length; i++) {
            if (postdata[i].persistStatus != "nrm") {
              changeData.push(postdata[i]);
            } else {
              nochangeData.push(postdata[i]);
            }
          }
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + "/batch-save",
          type: "post",
          data: JSON.stringify(changeData),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data) {
            if (data == 'fail_global') {
              toastr.error(data.message);
            } else {
              u.hideLoader();
              viewModel.showDefaultPage();
            }
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      // //页码改变时的回调函数
      // pageChange: function(index) {
      //   viewModel.depotrangpriList.pageIndex(index);
      //   viewModel.search();
      // },
      // //页码改变时的回调函数
      // sizeChange: function(size) {
      //   viewModel.depotrangpriList.pageSize(size);
      //   viewModel.search(true);
      // },
    },
    afterCreate: function() {
      var app = viewModel.app;
      viewModel.gridcomp = app.getComp("grid_depotrangpri").grid;
      var refRow = viewModel.ItemRefList.createEmptyRow();
      viewModel.ItemRefList.setRowFocus(refRow);
      viewModel.ItemRefList.on("storref.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainerstorref").data("uui.refer");
        var refValues = refer.values;
        if (refValues && refValues.length > 0) {
          var idRef = refValues[0].refpk;
          var allDatas = viewModel.depotrangpriList.getSimpleData();
          for (var i = 0, len = allDatas.length; i < len; i++) {
            var storId = allDatas[i].storId;
            if (storId == idRef) {
              viewModel.depotrangpriList.addRowSelect(i);
            }
          }
        }
      });
    }
  });

  return view;
});