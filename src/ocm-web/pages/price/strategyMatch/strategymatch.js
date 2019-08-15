define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate:function(){
            viewModel = this.viewModel;
        },
        model:model,
        baseData:{
            baseurl : '/price/strategy-matchs',
            searchBaseurl : '/price/strategy-matchs',
            simpleList: new u.DataTable(model.options.metas.strategyMatchMeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1
        },
        events: u.extend({}, simpleview.prototype.events, {
            beforeEdit: function (index, rowId) {
                var title;
                viewModel.index = index;
                if (u.isNumber(index)) {
                  //修改操作
                  title = "编辑";
                  var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                  viewModel.rowId = rowId;
                  viewModel.dialogcardcomp.seteidtData(currentData);
                  // 定价策略的组织参照条件
                  $("#strategyId").attr("data-refparam", JSON.stringify({"EQ_organization":currentData["organizationId"]}));
                } else {
                  title = "新增"
                  //清空编辑框的信息
                  viewModel.dialogcardcomp.cleareidt();
                  // 清空定价策略的参照条件
                  $("#strategyId").attr("data-refparam", JSON.stringify({"EQ_organization":""}));
                }
                //显示模态框
                viewModel.dialogWidth ?
                  viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
                  viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
            },
        }),
        afterCreate: function() {
            viewModel.dialogcardcomp.viewModel.params.on("organizationId.valuechange", function(obj) {
                if (obj.newValue == '' || obj.oldValue != obj.newValue) {
                    $("#strategyId").attr("data-refparam", JSON.stringify({"EQ_organization":obj.newValue}));
                    viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue('strategyId','');
                }
            });
        }
    });

    return view;
});

