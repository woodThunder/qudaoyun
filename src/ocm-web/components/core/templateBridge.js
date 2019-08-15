define(['ocm_dynamicTemplate'], function (DynamicTemplate) {
    'use strict';
    var bridge = function (options) {
        var menuCode = location.hash.split('/')[1].split("?")[0];
        var adapted = ['claimbill', 'gatheringbill', 'saleorder', 'projectorder', 'moqRuleManagement', 'moqRuleControl', 'deliveryOrder', 'rejectorder'];
        if(!adapted.find(function(element) {return element == menuCode})){
            return;
        }
        var viewModel = options.viewModel;
        /**
         * 从目前的业务中获取已经设置了的DataTable，尽量减少业务代码修改
         */
        var cardModels = [];
        var editModels = [];
        var detailModels = [];
        var listModels = [];
        var dialogModels = [];
        for(var item in viewModel) {
            var templateType = viewModel[item] && viewModel[item].templateType;
            if(templateType === 'detail') {
                var dto = viewModel[item].cls;
                detailModels.push({
                    objectKey: dto,
                    dt: item
                })
            }
            if(templateType === 'edit') {
                var dto = viewModel[item].cls;
                editModels.push({
                    objectKey: dto,
                    dt: item
                })
            }
            if(templateType === 'card') {
                var dto = viewModel[item].cls;
                editModels.push({
                    objectKey: dto,
                    dt: item
                });
                detailModels.push({
                    objectKey: dto,
                    dt: item
                });
            }
            if(templateType === 'list') {
                var dto = viewModel[item].cls;
                listModels.push({
                    objectKey: dto,
                    dt: item,
                    type: 'list'
                })
            }
            if(templateType === 'dialog') {
                var dto = viewModel[item].cls;
                dialogModels.push({
                    objectKey: dto,
                    dt: item,
                    dialogComp: viewModel[item].dialogComp
                })
            }
        }
        if(editModels.length === 0 && detailModels.length === 0 && listModels.length === 0) {
            console.error("单据" + menuCode + "没有适配单据模板");
            return;
        }
        viewModel.detailTemplate = new DynamicTemplate.Detail({
            vm: viewModel,
            models: detailModels.map(function(item){
                return {
                    objectKey: item.objectKey,
                    dt: item.dt,
                    type: 'detail'
                }
            }),
            testdataFlag: 'detail',      // 调试用使用模拟数据
            detailChildButtons: !!viewModel.detailChildButtons,
            editChildTabButtons: viewModel.editChildTabButtons

        });
        viewModel.editTemplate = new DynamicTemplate.Edit({
            vm: viewModel,
            models: editModels.map(function(item){
                return {
                    objectKey: item.objectKey,
                    dt: item.dt,
                    type: 'edit'
                }
            }),
            testdataFlag: 'edit',
            editChildButtons: !!viewModel.editChildButtons,
            editChildTabButtons: viewModel.editChildTabButtons
        });
        viewModel.dialogTemplate = new DynamicTemplate.Dialog({
            vm: viewModel,
            models: dialogModels.map(function(item){
                return {
                    objectKey: item.objectKey,
                    dt: item.dt,
                    type: 'edit',
                    dialogComps: item.dialogComp,
                }
            }),
            testdataFlag: 'edit',
        });
        viewModel.listTemplate = new DynamicTemplate.List({
            vm: viewModel,
            models: listModels,
            testdataFlag: 'list'         // 调试用
        })
        listModels.forEach(function(objectKey) {
            viewModel.listTemplate.setGridOperations([{
                objectKey: objectKey.objectKey,
                btns: [
                    {
                        showHTML: "<span>详情</span>",
                        onClick: "detail",
                    },
                    {
                        showHTML: "<span>编辑</span>",
                        onClick: "showEditBillPanel",
                    },
                    {
                        showHTML: "<span>删除</span>",
                        onClick: "del",
                    }
                ]
            }]);
        });

    }
    return bridge;
});