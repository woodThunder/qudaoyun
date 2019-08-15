define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate:function(){
            viewModel = this.viewModel;
        },
        model:model,
        baseData:{
            baseurl: '/base/merchants-settleds',
            excelurl: '/base/merchants-settled-excel',
            simpleList: new u.DataTable(model.options.metas.Brandmeta),
            statusField:'isEnable',
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
            })
        },
        events: u.extend({}, simpleview.prototype.events, {
            operation4single: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var delfun =
                    "data-bind=click:del.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                // var editfun =
                //     "data-bind=click:beforeEdit.bind($data," +
                //     obj.rowIndex +
                //     "," +
                //     dataTableRowId +
                //     ")";
                obj.element.innerHTML =
                    '<div class="ui-handle-icon">' +
                    // '<span class="ui-handle-word">' +
                    // '<a href="#" ' +
                    // editfun +
                    // ' title="编辑">编辑</a>' +
                    // "</span>    " +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    delfun +
                    ' title="删除">删除</a>' +
                    "</span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            //启用
            enable: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    if (selectedRows.length > 1) {
                        toastr.warning("请至多选择一项");
                        return;
                    }
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    });
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-enable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                viewModel.statusField ?
                                    selectedRows[i].setValue(viewModel.statusField, "1") :
                                    selectedRows[i].setValue("isEnable", "1");
                            }
                            viewModel.search();
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },

        }),
        //导入
        importHandle: function () {
            var urlInfo = viewModel.excelurl + '/excelDataImport'; //倒入地址参数
            var urlStatusInfo = viewModel.excelurl + '/excelLoadingStatus'; //请求进度地址参数
            var ele = $('#importFiel')[0]; //挂载元素
            common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
        },
        //导出
        exportHandle: function () {
            var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
            var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
            var listData = viewModel.simpleListTree; //需要导出表格的dataTable
            var ele = $('#exportFiel')[0]; //挂载元素
            common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
        }
    });

    return view;
});

