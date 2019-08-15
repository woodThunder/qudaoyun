define(['ocm_simpleview', './meta.js', 'ocm_common'], function(simpleview, model, common) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function() {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/cr/uncheck-strategys',
            simpleList: new u.DataTable(model.options.metas.creditnolimitmeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1
        },
        events: $.extend({}, simpleview.prototype.events, {
            search: function(reindex) {
                if (!viewModel.searchcomp) {
                    $("div.ui-searchbox").css("display", "none");
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
                }
                queryData.SEARCH_NOTEQ_unsetAsZero = 0;
                queryData.size = viewModel.simpleList.pageSize();
                queryData.page = viewModel.simpleList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        viewModel.simpleList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.simpleList.totalRow(data.totalElements);
                        viewModel.simpleList.totalPages(data.totalPages);
                    }
                });
            },
            //将操作后的数据进行保存
            edit: function() {
                var result = viewModel.dialogcardcomp.validate();
                if (result.passed) {
                    var index = viewModel.index;
                    var currentRow, type = "post";
                    var postdata = viewModel.dialogcardcomp.geteidtData();
                    if (index >= 0) {
                        type = "put";
                    }
                    //更改后台数据
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: type,
                        data: JSON.stringify(postdata),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            //如果index大于等于0说明是修改
                            viewModel.dialogcardcomp.close();
                            viewModel.search();
                        }
                    })

                }
            },
        }),
        //进入修改单据页
        rendertype: $.extend({}, common.rendertype, {
            //跳转详情页
            operation: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
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
                var alterfun =
                    "data-bind=click:showAlter.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\">" +
                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\" " +
                    editfun +
                    " title=\"编辑\">编辑</a>" +
                    "</span>    " +
                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\" " +
                    delfun +
                    " title=\"删除\">删除</a>" +
                    "</span></div>   ";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
        }),
        afterCreate: function() {
            var value = {};
            $("#creditCtrlStrategyId").attr("data-refparam", JSON.stringify(value));
            viewModel.dialogcardcomp.viewModel.params.on("customerId.valuechange", function(obj) {
                if (!obj.newValue) return;
                var cusLevComp = viewModel.dialogcardcomp.app.getComp("customerLevelId");
                var cusComp = viewModel.dialogcardcomp.app.getComp("customerId");
                viewModel.dialogcardcomp.viewModel.params.setValue('customerLevelId', null)
                cusLevComp.setRequired(false);
                cusLevComp.validate.required = false;
                cusComp.setRequired(true);
            });
            viewModel.dialogcardcomp.viewModel.params.on("customerLevelId.valuechange", function(obj) {
                if (!obj.newValue) return;
                var cusComp = viewModel.dialogcardcomp.app.getComp("customerId");
                var cusLevComp = viewModel.dialogcardcomp.app.getComp("customerLevelId");
                viewModel.dialogcardcomp.viewModel.params.setValue('customerId', null)
                cusComp.setRequired(false);
                cusComp.validate.required = false;
                cusLevComp.setRequired(true);
            });
        }
    });
    return view;

});