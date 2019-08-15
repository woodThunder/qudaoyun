define(['ocm_simpleview', 'ocm_common', './meta.js'], function (simpleview, common, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/rebate/cycles',
      dialogWidth: '900px',
      simpleList: new u.DataTable(model.options.metas.Cyclemeta),
      statusField: 'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,
      detailSource: model.options.details.detail,
      enableFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("isEnable")();
        var enableName
        if (status == 0) {
          enableName = "未启用"
        }
        if (status == 1) {
          enableName = "已启用"
        }
        if (status == 2) {
          enableName = "已停用"
        }
        return enableName;
      }),
      cycleFmt: ko.pureComputed(function () {
        var cycleType = viewModel.simpleList.ref("cycleType")();
        var cycleTypes = CONST.REBATECYCLETYPE || [];
        var findType = cycleTypes.find(function (type) {
          return type.value == cycleType;
        });
        return findType ? (findType.name || "") : "";
      })
    },
    rendertype: u.extend({}, common.rendertype, {
      cycleRend: function (obj) {
        var cycleType = viewModel.simpleList.getRow(obj.rowIndex).getValue("cycleType");
        var cycleTypes = CONST.REBATECYCLETYPE || [];
        var findType = cycleTypes.find(function (type) {
          return type.value == cycleType;
        });
        obj.element.innerHTML = findType ? (findType.name || "") : "";
      }
    }),
    events: $.extend({}, simpleview.prototype.events, {
      // 重写beforeEdit
      beforeEdit: function (index, rowId) {
        var title;
        viewModel.index = index;
        viewModel.ifDateEnable(false);
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
      // 起始、结束日期是否可编辑
      ifDateEnable: function (enable) {
        var $start = $("#startTimeBase");
        if ($start.length) {
          $start[0]["u-meta"].setEnable(enable);
        }
        var $end = $("#endTimeBase");
        if ($end.length) {
          $end[0]["u-meta"].setEnable(enable);
        }
      },
      operation4single: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var isEnable = obj.row.value.isEnable;
        var delfun =
          "data-bind=click:del.bind($data," +
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
          
        var html =  '<div class="ui-handle-icon">';
        if (isEnable == "0") {
          html += '<span class="ui-handle-word">' +
          '<a href="#" ' +
          editfun +
          ' title="编辑">编辑</a>' +
          "</span>    ";
        }
        html += '<span class="ui-handle-word">' +
        '<a href="#" ' +
        delfun +
        ' title="删除">删除</a>' +
        "</span></div>";
        obj.element.innerHTML = html;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      //删除和批量删除
      del: function (data, rowId) {
        if (typeof (data) == "number") {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.simpleList.getSelectedRows();
        var ids = [];
        var status = [];
        var statustip = "";
        if (rows && rows.length > 0) {
          for (var i = rows.length - 1; i >= 0; i--) {
            ids.push(rows[i].getValue("id"));
            var isEnable = rows[i].getValue("isEnable");
            if (isEnable != "0") {
              status.push(rows[i].getValue("code"));
            }
          }
          if (status.length > 0) {
            var statusArr = function () {
              for (i = 0; i < status.length; i++) {
                statustip += status[i] + "，";
              }
              return statustip.substring(0, statustip.length - 1);
            };

            toastr.warning("数据   " + statusArr() + " 非【未启用】状态，不可删除");
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
                data: {
                  ids: ids.join(",")
                },
                success: function (data) {
                  toastr.success("删除成功");
                  viewModel.search();
                }
              });
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
    }),
    afterCreate: function () {
      viewModel.dialogcardcomp.viewModel.params.on("cycleType.valuechange", function (obj) {
        if (obj.newValue == "CUSTOM") {
          viewModel.ifDateEnable(true);
        } else {
          viewModel.ifDateEnable(false);
          this.setValue("startTime", "");
          this.setValue("endTime", "")
        }
      });
    }
  });

  return view;
});