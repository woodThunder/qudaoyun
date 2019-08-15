define([
    'text!./goodsrelpicture.html',
    'ocm_common',
    'ocm_baseview',
    "./meta.js",
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl"
], function (tpl, common, baseview, model) {
    'use strict'
    var viewModel, picBigDialog;
    var view = baseview.extend({
        tpl: tpl,
        model: model,
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        rendertype: {
            picShow: function (obj) {
                /*
                var pictureUrl = viewModel.GoodsRelPictureList.getRow(obj.rowIndex).getValue("pictureUrl");
                var prodUrl = "";
                if (pictureUrl) {
                    //特殊字符\  .  替换
                    var prodUrl = pictureUrl.replace(/\./g, "spot").replace(/\//g, "linePath").replace(/\-/g, "lineThrough");
                    obj.element.innerHTML = "<img width=\"30\" height=\"30\" src=" + pictureUrl + " data-bind=\"click: picBig.bind($data," + "'" + prodUrl + "'" + ")\">";
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
                */
                var pictureUrl = obj.row.value.pictureUrl;
                var prodUrl = "";
                if (pictureUrl) {
                    //特殊字符\  .  替换
                    var prodUrl = pictureUrl.replace(/\./g, "spot").replace(/\//g, "linePath").replace(/\-/g, "lineThrough");
                    obj.element.innerHTML = "<img width=\"30\" height=\"30\" src=" + pictureUrl + " data-bind=\"click: picBig.bind($data," + "'" + prodUrl + "'" + ")\">";
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            //判断表格里的状态
            //启用状态
            isEnableGrid: function (obj) {
                /*
                var stateValue = viewModel.GoodsRelPictureList.getRow(obj.rowIndex).getValue("isEnable");
                var stateName;
                if (stateValue == 0) (stateName = "未启用")
                else if (stateValue == 1) (stateName = "已启用")
                else if (stateValue == 2) (stateName = "已停用")
                obj.element.innerHTML = stateName;
                */
                var showValue = "";
                var stateName = obj.value;
                if (stateName == 0) {
                    showValue = "未启用";
                } else if (stateName == 1) {
                    showValue = "已启用";
                } else if (stateName == 2) {
                    showValue = "已停用";
                }
                obj.element.innerHTML = showValue;
            },

            operation4single: function (obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";

                obj.element.innerHTML = '<div class="ui-handle-icon"><span class="ui-handle-word"><a href="#" ' + editfun + ' title="编辑">编辑</a>' + "</span>" + '<span class="ui-handle-word"><a href="#" ' + delfun + ' title="删除">删除</a>' + "</span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            picBig: function (url) {
                var picUrl = url.replace(/spot/g, ".").replace(/linePath/g, "/").replace(/lineThrough/g, "-");
                if (!picBigDialog) {
                    picBigDialog = u.dialog({
                        content: "#picBig-dialog",
                        hasCloseMenu: true
                    });
                } else {
                    picBigDialog.show();
                }
                $("#picBig-dialog").parent().parent().css("width", "auto");
                $("#picBig").attr("src", picUrl);
            },
            isMainPictureGrid: function (obj) {
                /*
                var isMainPictureVal = viewModel.GoodsRelPictureList.getRow(obj.rowIndex).getValue("isMainPicture");
                var isMainPictureName;
                isMainPictureVal == 1 ? (isMainPictureName = "是") : (isMainPictureName = "否");
                obj.element.innerHTML = isMainPictureName;
                */
                var showValue = "";
                var isMainPictureName = obj.value;
                if (isMainPictureName == 1) {
                    showValue = "是";
                } else {
                    showValue = "否";
                }
                obj.element.innerHTML = showValue;
            },
        },
        baseData: {
            baseurl: '/base/goods-rel-pictures',
            GoodsRelPictureList: new u.DataTable(model.options.metas.GoodsRelPicturemeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1
        },
        events: {
            //跳转单据详情页
            goDetailPanel: common.bill.goDetailPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel,
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
            beforeEdit: function (index, rowId) {
                var title;
                viewModel.index = index;
                if (u.isNumber(index)) {
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.GoodsRelPictureList.getRowByRowId(rowId).getSimpleData();
                    console.log(viewModel);
                    viewModel.rowId = rowId;
                    viewModel.dialogcardcomp.seteidtData(currentData);
                } else {
                    title = "新增"
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                }
                //显示模态框
                viewModel.dialogWidth ?
                    viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
                    viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
            },
            //将操作后的数据进行保存
            edit: function () {
                var result = viewModel.dialogcardcomp.validate();
                if (result.passed) {
                    var index = viewModel.index;
                    var currentRow, type = "post";
                    var postdata = viewModel.dialogcardcomp.geteidtData();
                    if (index >= 0) {
                        type = "put";
                    }
                    if (type == "post") {
                        var postDataArr = [];
                        var goodsIds = postdata.goodsId.split(',');
                        var pictureIds = postdata.pictureId.split(',');
                        for (var i = 0; i < goodsIds.length; i++) {
                            for (var j = 0; j < pictureIds.length; j++) {
                                var grpObj = {}; //图片对象
                                grpObj.goodsId = goodsIds[i];
                                grpObj.pictureId = pictureIds[j];
                                grpObj.persistStatus = 'new';
                                grpObj.isEnable = 0;
                                //如果是主图，则商品的第一张图片看做主图，其他图片为非主图
                                if (j == 0 && postdata.isMainPicture == 1) {
                                    grpObj.isMainPicture = 1;
                                }
                                else {
                                    grpObj.isMainPicture = 0;
                                }
                                postDataArr.push(grpObj);
                            }
                        }
                        $._ajax({
                            url: appCtx + viewModel.baseurl + '/batch-save',
                            type: type,
                            data: JSON.stringify(postDataArr),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                //如果index大于等于0说明是修改
                                viewModel.dialogcardcomp.close();
                                var refer = $("#refContainerpictureId").data("uui.refer");
                                refer.uncheckAll();
                                refer.setValue([]);
                                viewModel.search();
                            }
                        })
                        return;
                    }
                    //编辑时商品不可以多选
                    if (postdata.goodsId.indexOf(',') > 0) {
                        toastr.error("商品不可多选");
                        return false;
                    }
                    //编辑时图片不可以多选
                    if (postdata.pictureId.indexOf(',') > 0) {
                        toastr.error("图片不可多选");
                        return false;
                    }

                    //更改后台数据
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: type,
                        data: JSON.stringify(postdata),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            //如果index大于等于0说明是修改
                            viewModel.dialogcardcomp.close();
                            if (index >= 0) {
                                //获取需要修改的行
                                currentRow = viewModel.GoodsRelPictureList.getRowByRowId(viewModel.rowId);
                                //将用户填写的数据更新到GoodsRelPictureList上
                            } else {
                                //添加数据
                                currentRow = viewModel.GoodsRelPictureList.createEmptyRow();
                            }
                            currentRow.setSimpleData(data);
                            viewModel.search();
                        }
                    })

                }
            },
            //删除和批量删除
            del: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.GoodsRelPictureList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var rows = viewModel.GoodsRelPictureList.getSelectedRows();
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].getValue("id"));
                    }
                    common.dialog.confirmDialog({
                        msg1: '确认删除这些项？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function () {
                            $._ajax({
                                url: appCtx + viewModel.baseurl + "/delete",
                                type: "post",
                                // data: "ids=" + ids.join(","),
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function (data) {
                                    viewModel.search();
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (reindex) {
                    viewModel.GoodsRelPictureList.pageIndex(0);
                }
                viewModel.GoodsRelPictureList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                queryData.size = viewModel.GoodsRelPictureList.pageSize();
                queryData.page = viewModel.GoodsRelPictureList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.GoodsRelPictureList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.GoodsRelPictureList.totalRow(data.totalElements);
                        viewModel.GoodsRelPictureList.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.GoodsRelPictureList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.GoodsRelPictureList.pageSize(size);
                viewModel.search(true);
            },
            //启用
            enable: function () {
                var selectedRows = viewModel.GoodsRelPictureList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function (row, index, arr) {
                        return row.getValue("id");
                    })
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-enable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                viewModel.statusField ?
                                    selectedRows[i].setValue(viewModel.statusField, "1") :
                                    selectedRows[i].setValue("isEnable", "1");
                            }
                        }
                    })
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //停用
            disable: function () {
                var selectedRows = viewModel.GoodsRelPictureList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function (row, index, arr) {
                        return row.getValue("id");
                    })
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-disable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                viewModel.statusField ?
                                    selectedRows[i].setValue(viewModel.statusField, "2") :
                                    selectedRows[i].setValue("isEnable", "2");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },

            detail: function () {
                //确保grid先将行设置为focus状态
                setTimeout(function () {
                    viewModel.goDetailPanel();
                }, 0);
            },
            //导入
            importHandle: function () {
                var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
                var ele = $('#importFiel')[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportHandle: function () {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
                var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
                var listData = viewModel.GoodsRelPictureList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
        },
        afterCreate: function () {
            //viewModel.search();
        }
    });

    return view;
});
