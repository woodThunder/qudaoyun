define(['ocm_simpleview', './meta.js', 'ocm_common'], function (simpleview, model, common) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/base/customer-levels',
      simpleList: new u.DataTable(model.options.metas.ProductGroupmeta),
      statusField: 'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,
      detailSource: model.options.details.detail1,
    },
    rendertype: u.extend(common.rendertype, {
      enableFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("isEnable")();
        var statusName
        if (status == 0) {
          (statusName = "未启用")
        }
        if (status == 1) {
          (statusName = "已启用")
        }
        if (status == 2) {
          (statusName = "已停用")
        }
        return statusName;
      }),
      detailRender: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var detailfun = "data-bind=click:detail.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        obj.element.innerHTML =
          '<a href="#" class="ui-a-detail" ' +
          detailfun +
          ">" +
          obj.value +
          "</a>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
    })
  });

  return view;
});

