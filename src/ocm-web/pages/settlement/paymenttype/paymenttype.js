define(['ocm_simpleview', './meta.js', 'ocm_common'], function(simpleview, model, common) {
  'use strict'
  var viewModel, appCtx = "/occ-settlement";
  var view = simpleview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/settlement/payment-types',
      // excelurl: '/potypes-Excel',单表档案支持导入导出时需配置此属性
      // dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
      // statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
      simpleList: new u.DataTable(model.options.metas.paymentMeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      detailSource: model.options.details.detail,
      gridOption: model.options.grids.grid1,
      enableFmt: ko.pureComputed(function() {
        var status = viewModel.simpleList.ref("isEnable")();
        switch (status) {
          case '0':
          case 0:
            return '未启用'
          case '1':
          case 1:
            return '已启用'
          case '2':
          case 2:
            return '已停用'
        }

        // return status == 1 ? "启用" : "";
      }),
      operationpayrecive: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var delfun =
          "data-bind=click:delpay.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var editfun =
          "data-bind=click:beforeEdit.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";

        obj.element.innerHTML =
          '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          '<a href="#" ' +
          editfun +
          ' title="编辑">编辑</a>' +
          "</span>    " +
          '<span class="ui-handle-word">' +
          '<a href="#" ' +
          delfun +
          ' title="删除">删除</a>' +
          "</span></div>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      //删除和批量删除
      delpay: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.simpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          var ids = [];
          for (var i = 0; i < rows.length; i++) {
            if (rows[i].getValue('isEnable') != '1' || rows[i].getValue('isEnable') != 1) {
              ids.push(rows[i].getValue('id'));
            }
          }
        } else {
          toastr.warning("请先选择一行数据");
        }
        if (ids && ids.length > 0) {
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function() {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                data: {
                  ids: ids.join(",")
                },
                success: function(data) {
                  toastr.success();
                  viewModel.simpleList.removeRows(rows);
                }
              });
            }
          });
        } else {
          toastr.warning("只能删除未启用的数据！");
        }
      }
    },
    afterCreate: function() {

      // console.log(appCtx);
    },
  });

  return view;
});