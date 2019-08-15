define(['text!./availablenum.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, app;
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
      app = this.app;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/stock/onhand-dims/find-availableNum',
      simpleList: new u.DataTable(model.options.metas.simplemeta),
      groupQuery: new u.DataTable(model.options.metas.groupQuery),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      button1Source: model.options.buttons.button1,
      gridOption: model.options.grids.grid1,
      //可用量 availablenum
      availablenum: ko.observable(0),
      //预计可用量
      willavailablenum: ko.observable(0),
      //现存量 onhandnum
      onhandnum: ko.observable(0),
      groupSrc: [{
        value: "1",
        name: "库存组织"
      }, {
        value: "2",
        name: "库存组织+仓库"
      }, ],
      queryType: "1"
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
          var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
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
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
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
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.simpleList.getSelectedRows();
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
                  viewModel.simpleList.removeRows(rows);
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
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.queryType = viewModel.queryType;
        if (Object.getOwnPropertyNames(queryData).length < 2) {
          toastr.warning('库存组织、仓库、库存商品三个条件至少输入一个才能进行查询!')
          return;
        }
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.simpleList.setSimpleData(data, {
              unSelect: true
            });
            // viewModel.simpleList.totalRow(data.totalElements);
            // viewModel.simpleList.totalPages(data.totalPages);
            //可用量 availablenum
            viewModel.availablenum(viewModel.getSum(data, "availablenum"));
            //现存量 onhandnum
            viewModel.onhandnum(viewModel.getSum(data, "onhandnum"));
            //预计可用量 willavailablenum
            viewModel.willavailablenum(viewModel.getSum(data, "willAvailablenum"));
          }
        })
      },
      // 求和
      getSum: function(data, field) {
        for (var i = 0, result = 0; i < data.length; i++) {
          result += parseFloat(data[i][field]);
        };
        return result || 0;
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
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
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "0");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //导出
      exportHandle: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.simpleList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        var typeArr = [{
          value: false,
          name: "导出数据"
        }]; //导出类型
        common.fileHandle.exportFileDirect(listData, ele, searchParams, templateUrl, excelDataUrl, typeArr);
      },
    },
    afterCreate: function() {
      // viewModel.search();
      app = this.app;
      viewModel.groupQuery.createEmptyRow();
      viewModel.groupQuery.on("valuechange", function(obj) {
        var grid = app.getComp("grid_simple1").grid;
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        viewModel.queryType = obj.newValue;
        queryData.queryType = viewModel.queryType;
        if (viewModel.queryType === "2") {
          grid.setColumnVisibleByIndex(1, true);
        } else {
          grid.setColumnVisibleByIndex(1, false);
        }
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: "get",
          data: queryData,
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.simpleList.setSimpleData(data, {
              unSelect: true
            });
            //可用量 availablenum
            viewModel.availablenum(viewModel.getSum(data, "availablenum"));
            //现存量 onhandnum
            viewModel.onhandnum(viewModel.getSum(data, "onhandnum"));
            //预计可用量 willavailablenum
            viewModel.willavailablenum(viewModel.getSum(data, "willAvailablenum"));
          }
        })
      });

      //搜索条件 库存组织仓库过滤
      viewModel.searchcomp.viewModel.params.on("org.valuechange", function(obj) {
        if (obj.newValue != undefined && obj.newValue != "") {
          var stockOrgId = {
            "EQ_inventoryOrg.id": obj.newValue
          };
          $("#warehouse").attr("data-refparam", JSON.stringify(stockOrgId));
        } else {
          $("#warehouse").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
          viewModel.searchcomp.viewModel.params.setValue("warehouse", "");
        }
      })
    }
  });

  return view;
});