define([
  // 'text!/ocm-web/views/simpleview/simpleview.html',
  "ocm_common",
  "ocm_baseview"
], function(
  // tpl,
  common,
  baseview
) {
  "use strict";
  var tpl =
    '<div class="ui-panel ui-list-panel">\r\n      <div>\r\n      <div class="page-title">\r\n      <span data-bind="text:title"></span>\r\n      </div>\r\n      </div>\r\n      <div>\r\n      <div>\r\n      <div class="oc-breadcrumb">\r\n      </div>\r\n      </div>\r\n      </div>\r\n      <div class="title-seperator"></div>\r\n      <ui-searchbox params=\'datasource:$root.searchSource,ref:$root.searchcomp,search:$root.search,clean:$root.cleanSearch\'>\r\n      </ui-searchbox>\r\n      <div class="ui-panel-body">\r\n      <div class="ui-panel-body-head">\r\n      <div class="ui-panel-body-head-left">\r\n      <ui-buttons params=\'datasource:$root.buttonSource\'>\r\n      </ui-buttons>\r\n      </div>\r\n      </div>\r\n      <div class="ui-table-container">\r\n      <ui-grid params=\'options:$root.gridOption,vm:$root\'>\r\n      </ui-grid>\r\n      <div class="ui-statistics margin-top-10">\r\n      已选择\r\n      <span class="font-c-blue" data-bind="text:simpleList.selectedIndices().length"></span>项数据\r\n      </div>\r\n      <div class="pagination-right">\r\n      <div id=\'pagination\' class=\'pagination u-pagination pagination-sm\' u-meta=\'{"type":"pagination","data":"simpleList","pageChange":"pageChange","sizeChange":"sizeChange"}\'></div>\r\n      </div>\r\n      </div>\r\n      </div>\r\n      </div>\r\n      <ui-dialogcard params=\'datasource:$root.dialogcardSource,ref:$root.dialogcardcomp,dt:$root.simpleList\'>\r\n      </ui-dialogcard>\r\n   <div class="ui-bill-detail ui-panel" style="display: none;">\r\n    <div>\r\n    <div class="page-title">\r\n    <span data-bind="text:title"></span>\r\n    </div>\r\n    </div>\r\n    <div>\r\n    <div>\r\n    <div class="oc-breadcrumb">\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class="ui-panel-btn-bg">\r\n    <div class="ui-operate-btn">\r\n    <a class="ui-btn ui-btn-primary" data-bind="click: retListPanel">返回\r\n    </a>\r\n    </div>\r\n    </div>\r\n    <div class="ui-panel-head">\r\n    <ui-detail params=\'datasource:$root.detailSource,dt:$root.simpleList,vm:$root\'>\r\n    </ui-detail>\r\n    </div>\r\n    </div><div id="exportFiel"></div>\r\n  <div id="importFiel"></div>\r\n';
  var viewModel;
  var view = baseview.extend({
    tpl: tpl,
    rendertype: common.rendertype,
    setTemplate: function(el, tpl) {
      el.innerHTML = tpl;
      viewModel = this.viewModel;
    },
    events: {
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index, rowId) {
        var title;
        viewModel.index = index;
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList
            .getRowByRowId(rowId)
            .getSimpleData();
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增";
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogWidth ?
          viewModel.dialogcardcomp.show(
            title,
            viewModel.dialogWidth,
            viewModel.edit
          ) :
          viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },
      //将操作后的数据进行保存
      edit: function() {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow,
            type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          //  对新增保存时有其他需求的校验添加的方法（命名editExtend） ---syf
          if (
            viewModel.editVerify &&
            typeof viewModel.editVerify == "function" &&
            viewModel.editVerify(postdata)
          ) {
            return;
          }
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
                currentRow = viewModel.simpleList.getRowByRowId(
                  viewModel.rowId
                );
                currentRow.setSimpleData(data);
                //将用户填写的数据更新到simpleList上
              } else {
                viewModel.search();
                //添加数据
                // currentRow = viewModel.simpleList.createEmptyRow();
              }

            }
          });
        }
      },
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof data == "number") {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.simpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          common.dialog.confirmDialog({
            msg1: "确认删除这些项？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "error",
            onOk: function() {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function(data) {
                  // viewModel.simpleList.removeRows(rows);
                  viewModel.search();
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
        if (!viewModel.searchcomp) {
          $("div.ui-searchbox").css("display", "none");
          // return;
        }
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        if (!viewModel.searchcomp) {
          var queryData = {};
        } else {
          var queryData = viewModel.searchcomp.getDataWithOpr ?
            viewModel.searchcomp.getDataWithOpr() :
            {};
        }
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx +
            (viewModel.searchBaseurl ?
              viewModel.searchBaseurl :
              viewModel.baseurl),
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        });
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
          });
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                viewModel.statusField ?
                  selectedRows[i].setValue(viewModel.statusField, "1") :
                  selectedRows[i].setValue("isEnable", "1");
              }
              viewModel.search();
            }
          });
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
          });
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                viewModel.statusField ?
                  selectedRows[i].setValue(viewModel.statusField, "2") :
                  selectedRows[i].setValue("isEnable", "2");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          viewModel.goDetailPanel();
        }, 0);
      },
      //导入
      importHandle: function() {
        var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
        var ele = $("#importFiel")[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.excelurl + "/downloadExcelTemplate"; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + "/excelDataExport"; //导出数据地址参数
        var listData = viewModel.simpleList; //需要导出表格的dataTable
        var ele = $("#exportFiel")[0]; //挂载元素
        common.fileHandle.exportFile(
          listData,
          ele,
          searchParams,
          templateUrl,
          excelDataUrl
        );
      }
    },
    afterCreate: function() {
      //viewModel.search();
    }
  });

  return view;
});