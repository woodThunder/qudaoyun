define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var view = simpleview.extend({
        model: model,
        baseData: {
            //后台接口
            baseurl: '/sc/faults',
            //数据模型
            simpleList: new u.DataTable(model.options.metas.faultmeta),
            //按钮
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            //查询组
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            //新增-弹窗对话框
            dialogcardSource: model.options.dialogs.dialog1,
            //查看详情
            detailSource: model.options.details.detail,
            //列表
            gridOption: model.options.grids.grid1,

        },
        
    });
    return view;
});


