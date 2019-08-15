define(['ocm_simpleview', './meta.js', 'ocm_common', ], function(simpleview, model, common) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/stock/available-strategy-matchs',
      simpleList: new u.DataTable(model.options.metas.unitmeta),
      statusField: 'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,

    },
    rendertype: u.extend({}, common.rendertype, {
      avaSetTypeRender: function(obj) {
        var stateValue = viewModel.simpleList.getRow(obj.rowIndex).getValue(
          "avaSetType"
        );
        var stateName;
        if (stateValue == 0) {
          stateName = "订单类型+交易类型"
        }
        else if (stateValue == 1) {
          stateName = "按组织"
        }
        else if (stateValue == 2) {
          stateName = "按仓库"
        }
        else if (stateValue == 3) {
          stateName = "按库存组织"
        }else{
          stateName = "全局"
        }
        obj.element.innerHTML = stateName;
      },
    }),
    afterCreate: function() {
      viewModel.dialogcardcomp.viewModel.params.on("billTypeId.valuechange", function(obj) {
        var comp = viewModel.dialogcardcomp.app.getComp("saleTypeIdBase");
        if (obj.newValue) {
            comp.setEnable(true);
        } else {
            comp.setEnable(false);
            return;
        }
        var saleTypeValue = {
          "EQ_billTypeId": obj.newValue,
          "EQ_isEnable": 1
        };
        $("#saleTypeIdInfo").attr("data-refparam", JSON.stringify(saleTypeValue));
      });
    }
  });

  return view;
});