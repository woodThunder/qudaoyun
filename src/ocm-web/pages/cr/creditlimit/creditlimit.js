define(['ocm_simpleview', './meta.js', 'ocm_common'], function (simpleview, model, common) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/cr/credit-limits',
      excelurl: '/creditlimit-excel',
      simpleList: new u.DataTable(model.options.metas.creditlimitmeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,
      temp: '',
      templin: '空',
      isEdit: false
    },
    events: $.extend({}, simpleview.prototype.events, {
      operation: function (obj) {
        var editfun, delfun;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var editCreditLimit = obj.row.value.editCreditLimit;
        if (editCreditLimit == "1") {
          editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
          delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
          obj.element.innerHTML = '<div class="ui-handle-icon">' +
            '<span class="ui-handle-word">' +
            '<a ' +
            editfun +
            ' title="编辑">编辑</a>' +
            '</span>    ' +
            '<span class="ui-handle-word">' +
            '<a ' +
            delfun +
            ' title="删除">删除</a>' +
            '</span></div>';

        } else {
          delfun = 'class="disabled"';
          editfun = 'class="disabled"';
          obj.element.innerHTML = '<div class="ui-handle-icon">' +
            '<span class="ui-handle-word">' +
            '<a ' +
            editfun +
            ' title="编辑">编辑</a>' +
            '</span>    ' +
            '<span class="ui-handle-word">' +
            '<a ' +
            delfun +
            ' title="删除">删除</a>' +
            '</span></div>';
        }

        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      search: function (reindex) {
        if (!viewModel.searchcomp) {
          $("div.ui-searchbox").css("display", "none");
        }
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        if (!viewModel.searchcomp) {
          var queryData = {};
        } else {
          var queryData = viewModel.searchcomp.getDataWithOpr ?
            viewModel.searchcomp.getDataWithOpr() : {};
        }
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        var str = JSON.stringify(queryData),
          qStr = str.replace(/creditCtrlStrategy/, 'creditCtrlStrategy.id'),
          newQuD = JSON.parse(qStr);
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: newQuD,
          success: function (data) {
            var con = data.content;
            for (var i = 0; i < con.length; i++) {
                con[i].editCreditLimit = con[i].creditCtrlStrategy.editCreditLimit;
            }
            viewModel.simpleList.setSimpleData(con, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        });
      },
      //删除和批量删除
      del: function (data, rowId) {
        if (typeof data == "number") {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.simpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          var status = [];
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
            if (rows[i].getValue("editCreditLimit") == "0") {
              var creditCtrlStrategyName = rows[i].getValue("creditCtrlStrategyName")
              if (!status.includes(creditCtrlStrategyName)) {
                status.push(creditCtrlStrategyName);
              }
            }
          }
          if (status.length > 0) {
            toastr.warning("控制策略【" + status.join(",") + "】下的信用额度不可删除！");
            return false;
          }
          common.dialog.confirmDialog({
            msg1: "确认删除这些项？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "error",
            onOk: function () {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function (data) {
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
      //导入
      importHandle: function () {
        var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
        var ele = $("#importFiel")[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function () {
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
    }),
    //进入修改单据页
    rendertype: $.extend({}, common.rendertype, {
      //跳转详情页
      operation: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
        var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
        var alterfun = "data-bind=click:showAlter.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
        obj.element.innerHTML =
          "<div class=\"ui-handle-icon\">" +
          "<span class=\"ui-handle-word\">" +
          "<a href=\"#\" " + editfun + " title=\"编辑\">编辑</a>" +
          "</span>    " +
          "<span class=\"ui-handle-word\">" +
          "<a href=\"#\" " + delfun + " title=\"删除\">删除</a>" +
          "</span></div>   ";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
    }),
    afterCreate: function () {
      var value = {};
      $("#creditCtrlStrategyId").attr("data-refparam", JSON.stringify(value));
      viewModel.dialogcardcomp.viewModel.params.on("customerId.valuechange", function (obj) {
        if (!viewModel.isEdit) return;
        if (!obj.newValue) {
          return
        }
        if (viewModel.temp == '') {
          viewModel.temp = obj.oldValue;
          common.dialog.confirmDialog({
            msg1: '修改客户需要信用重算，是否继续？',
            msg2: '否则信用占用可能不准确',
            width: '400px',
            type: 'error',
            onOk: function () {},
            onCancel: function () {
              viewModel.dialogcardcomp.viewModel.params.setValue('customerId', viewModel.temp);
              viewModel.temp = ''
            }
          });
        }
      });
      viewModel.dialogcardcomp.viewModel.params.on("productGroupId.valuechange", function (obj) {
        if (!viewModel.isEdit) return;
        if (!obj.newValue) {
          return
        }
        if (viewModel.templin == '空') {
          viewModel.templin = obj.oldValue;
          common.dialog.confirmDialog({
            msg1: '修改产品线需要信用重算，是否继续？',
            msg2: '否则信用占用可能不准确',
            width: '400px',
            type: 'error',
            onOk: function () {},
            onCancel: function () {
              viewModel.dialogcardcomp.viewModel.params.setValue('productGroupId', viewModel.templin);
              viewModel.templin = '空'
            }
          });
        }
      });
    }
  });
  return view;

});