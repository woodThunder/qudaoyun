define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    'use strict'
    var viewModel;
    var view = simpleview.extend({
        beforeCreate:function(){
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/cmpt/tmpl-alloc',
            // excelurl: '/potypes-Excel',单表档案支持导入导出时需配置此属性
            // dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
            // statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
            simpleList: new u.DataTable(model.options.metas.templatealloc),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            templateTypeRender: function (params) {
                var templateType = params.value;
                if (templateType === "SEARCH_TMPL") {
                    params.element.innerHTML = "搜索模版"
                }
                if (templateType === "DISPLAY_TMPL") {
                    params.element.innerHTML = "显示模版"
                }
            },
            templateTypeFmt: ko.pureComputed(function () {
                var templateType = viewModel.simpleList.ref("templateType")();
                if (templateType === "SEARCH_TMPL") {
                    return "搜索模版"
                }
                if (templateType === "DISPLAY_TMPL") {
                    return "显示模版"
                }
                return "未知";
            }),
        }
    });

    return view;
});
