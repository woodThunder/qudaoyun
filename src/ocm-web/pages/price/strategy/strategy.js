define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate:function(){
            viewModel = this.viewModel;
        },
        model:model,
        baseData:{
            baseurl : '/price/strategys',
            searchBaseurl : '/price/strategys',
            simpleList: new u.DataTable(model.options.metas.strategyMatch),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
        },
        rendertype: u.extend({}, simpleview.prototype.rendertype, {
            discountOrgSta: function(obj) {
                var showValue = obj.value == "0" ? "价目表所属组织" : "本销售组织";
                obj.element.innerHTML = showValue;
            }
        }),
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
                  // 参照条件处理
                  $("#priceMaintainIdRef").attr("data-refparam", JSON.stringify({"EQ_priceList.organization":currentData["organizationId"]}));
                  $("#priceListItemIdRef").attr("data-refparam", JSON.stringify({"EQ_priceMaintainId":currentData["priceMaintainId"]}));
                } else {
                  title = "新增"
                  //清空编辑框的信息
                  viewModel.dialogcardcomp.cleareidt();
                  // 参照条件处理
                  $("#priceMaintainIdRef").attr("data-refparam", JSON.stringify({"EQ_priceList.organization":""}));
                  $("#priceListItemIdRef").attr("data-refparam", JSON.stringify({"EQ_priceMaintainId":""}));
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
                    $("#priceMaintainIdRef").attr("data-refparam", JSON.stringify({"EQ_priceList.organization":obj.newValue}));
                    viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue('priceMaintainId','');
                    $("#priceListItemIdRef").attr("data-refparam", JSON.stringify({"EQ_priceMaintainId":""}));
                    viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue('priceListItemId','');
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("priceMaintainId.valuechange", function(obj) {
                if (obj.newValue == '' || obj.oldValue != obj.newValue) {
                    $("#priceListItemIdRef").attr("data-refparam", JSON.stringify({"EQ_priceMaintainId":obj.newValue}));
                    viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue('priceListItemId','');
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("ladderEnable.valuechange", function (obj) {
                if(obj.newValue == 1) {
                    viewModel.dialogcardcomp.app.getComp("ladderBench").setEnable(true);
                    viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue('ladderBench','1');
                }else{
                    viewModel.dialogcardcomp.app.getComp("ladderBench").setEnable(false);
                    viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue('ladderBench','');
                }
            })
        }
    });

    return view;
});