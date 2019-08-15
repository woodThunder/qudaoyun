define(['ocm_simpleview', 'ocm_common','./meta.js'], function (simpleview,common,model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/stlb2c/defference-adjusts',
      simpleList: new u.DataTable(model.options.metas.Adujstmeta),
      //statusField:'isEnable',
      statusField: [{  //单据状态
        value: "1",
        name: '已审核'
      }, {
        value: "0",
        name: '未审核'
      }],
      adjustTypeField:[{  //单据状态
        value: "1",
        name: '订单'
      }, {
        value: "0",
        name: '账单'
      }],//调整类型
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },
    rendertype: {
      // detailRender: common.rendertype.detailRender,
      operation4single: function (obj) {
        var auditStatus = obj.row.value.status;
        var editfun, delfun;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        //未审核的才可以编辑和删除
        if (auditStatus == 0) {
          editfun =
            "data-bind=click:beforeEdit.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          delfun =
            "data-bind=click:del.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
        } else {
          delfun = 'class="disabled"';
          editfun = 'class="disabled"';
        }
        obj.element.innerHTML =
          '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          "<a " +
          editfun +
          ' title="编辑">编辑</a>' +
          "</span>    " +
          '<span class="ui-handle-word">' +
          "<a " +
          delfun +
          ' title="删除">删除</a>' +
          "</span></div>";

        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
    },
    events: u.extend({}, simpleview.prototype.events,{
      //审核
      audit: function () {
        if (typeof (rowId) == 'number') {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
          }
          var ids = [];
          var rows = viewModel.simpleList.getSelectedRows();
          if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          $._ajax({
            url: appCtx + viewModel.baseurl + "/audit",
            type: "post",
            data: {
            ids: ids.join(",")
            },
            success: function (data) {
              viewModel.search();
            toastr.success("审核成功");
            }
          });
          }
          else {
          toastr.warning("请至少选择一项");
          }
      },
    }),
  });

  return view;
});

