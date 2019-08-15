define(['ocm_simpleview', 'ocm_common','ocm_baseview','./meta.js'], function(simpleview, common,baseview,model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function() {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/cr/credit-balance',
            excelurl: '/cr/creditBalance-excel',
            simpleList: new u.DataTable(model.options.metas.creditoccupymeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
        },
        events: $.extend({}, simpleview.prototype.events, {
            search: function(reindex) {
                if (!viewModel.searchcomp) {
                    $("div.ui-searchbox").css("display", "none");
                    // return;
                }
                if (reindex) {
                    viewModel.simpleList.pageIndex(0);
                }
                viewModel.simpleList.removeAllRows();
                if (!viewModel.searchcomp) {
                    var queryData = {};
                } else {
                    var queryData = viewModel.searchcomp.getDataWithOpr ?
                        viewModel.searchcomp.getDataWithOpr() : {};
                    var str = JSON.stringify(queryData),
                        // reg = /(\w*)organization(.*)saleOrg(.*)/g,
                        newF = str.replace(/organization/, 'creditCtrlStrategy.organization'),
                        newQD = newF.replace(/saleOrg/, 'creditCtrlStrategy.saleOrg');
                    var queryStr = JSON.parse(newQD);
                }
                queryStr.size = viewModel.simpleList.pageSize();
                queryStr.page = viewModel.simpleList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryStr,
                    success: function(data) {
                        viewModel.simpleList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.simpleList.totalRow(data.totalElements);
                        viewModel.simpleList.totalPages(data.totalPages);
                    }
                });
            },
              //导出
            exportHandle: function() {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
                var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
                var listData = viewModel.simpleList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            }
        }),
    });
    return view;

});