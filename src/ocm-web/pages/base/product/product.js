define(['ocm_simpleview', './meta.js', 'ocm_common'], function (simpleview, model, common) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/base/products',
            goodsCategoryUrl: '/goods-categorys',
            simpleList: new u.DataTable(model.options.metas.Productmeta),
            statusField: 'isEnable',
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            excelurl: '/product-excel',
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            detailSource: model.options.details.detail1,
            enableFmt: ko.pureComputed(function () {
                var status = viewModel.simpleList.ref("isEnable")();
                var statusName
                if (status == 0) {
                    statusName = "未启用"
                }
                if (status == 1) {
                    statusName = "已启用"
                }
                if (status == 2) {
                    statusName = "已停用"
                }
                return statusName;
            }),
        },
        rendertype: u.extend({}, common.rendertype, {
            // 单表操作
            operation: function (obj) {
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
                var copyfun =
                    "data-bind=click:beforeCopy.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";

                obj.element.innerHTML =
                    '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    copyfun +
                    ' title="复制">复制</a>' +
                    "</span>    " +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    editfun +
                    ' title="编辑">编辑</a>' +
                    "</span>    " +
                    '<span class="ui-handle-word">' +
                    '<a href="#" ' +
                    delfun +
                    ' title="删除">删除</a>' +
                    "</span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
        }),
        events: u.extend({}, simpleview.prototype.events, {
            beforeCopy: function (index, rowId) {
                var title;
                viewModel.index = 2;
                //修改操作
                var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                delete currentData.id;
                delete currentData.code;
                viewModel.rowId = rowId;
                currentData.isEnable = 0;
                viewModel.dialogcardcomp.seteidtData(currentData);
                title = "新增"
                //显示模态框
                viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
            },
            edit: function () {
                var result = viewModel.dialogcardcomp.validate();
                if (result.passed) {
                    var index = viewModel.index;
                    var currentRow, type = "post";
                    var postdata = viewModel.dialogcardcomp.geteidtData();
                    if (index >= 0) {
                        type = "put";
                    }
                    if (index == 2) {
                        type = "post";
                        postdata.persistStatus = "new";
                    }
                    //更改后台数据
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: type,
                        data: JSON.stringify(postdata),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            viewModel.dialogcardcomp.close();
                            viewModel.search();
                        }
                    })

                }
            },
        }),

        afterCreate: function () {
            //处理从商品页面跳转过来的情况
            var url = window.location.href;
            var params = common.getParameter(url);
            var id = params.id;
            if (id) {
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/" + id,
                    dataType: "json",
                    success: function (data) {
                        viewModel.dialogcardcomp.seteidtData(data);
                        viewModel.dialogcardcomp.show("编辑", "500px", viewModel.edit);
                    }
                });
            }

            viewModel.dialogcardcomp.viewModel.params.on("goodsCategoryId.valuechange", function (obj) {
                console.log(viewModel.dialogcardcomp.viewModel.params);
                if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.goodsCategoryUrl + "/" + obj.newValue,
                        success: function (data) {
                            viewModel.dialogcardcomp.viewModel.params.setValue("prodAttrStrucId", data.defaultProdAttrStrucId);
                            viewModel.dialogcardcomp.viewModel.params.setValue("productLineId", data.defaultProductLineId);
                            viewModel.dialogcardcomp.viewModel.params.setValue("brandId", data.defaultBrandId);
                        }
                    });
                }
            })
        }
    });

    return view;
});
