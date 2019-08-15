define(['text!./supplier-goods.html', './meta.js', 'ocm_common',
    'ocm_baseview'], function (tpl, model, common, baseview) {
        var viewModel;
        var view = baseview.extend({
            tpl: tpl,
            beforeCreate: function () {
                viewModel = this.viewModel;
            },
            model: model,
            baseData: {

                baseurl: "/base/supplier-goodss",
                simpleList: new u.DataTable(model.options.metas.supplierMeta),
                childList: new u.DataTable(model.options.metas.supplierGoodsMeta),
                statusField: "isEnable",
                excelurl: '/supplier-goods-excel',
                button1Source: model.options.buttons.button1,
                button2Source: model.options.buttons.button2,
                button3Source: model.options.buttons.button3,
                button4Source: model.options.buttons.button4,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                dialogcardcomp: {},
                dialogcardSource: model.options.dialogs.dialog1,
                grid1Option: model.options.grids.grid1,
                grid2Option: model.options.grids.grid2,
                grid3Option: model.options.grids.grid3,
                card1Source: model.options.cards.card1,
                billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
                whetherSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }],
            },
            rendertype: u.extend(common.rendertype, {

            }),

            events: {
                goBillPanel: common.bill.goBillPanel,
                //跳转单据详情页
                goDetailPanel: function (index, rowId) {
                    // $(".ui-list-panel").hide();
                    $(".ui-panel").hide();
                    $(".ui-bill-detail").show();
                    $(".ui-bill-detail").animateCss("fadeIn");
                    var currentData = viewModel.simpleList.getFocusRow().getSimpleData();
                    viewModel.findGoodsBySupplier(currentData.supplierId)

                },
                //返回列表页
                retListPanel: common.bill.retListPanel,
                //点击取消 单据页
                cancelHandle: function () {
                    viewModel.search();
                    viewModel.retListPanel();
                },
                backPanel: function () {
                    viewModel.search();
                    viewModel.retListPanel();
                },

                //子表增行
                addRow: function (dataTable) {
                    viewModel[dataTable].createEmptyRow();
                    viewModel.currentFlag = 0;
                },
                //子表 删除和批量删除
                delChild: function (dataTable) {
                    var rows = viewModel[dataTable].getSelectedRows();
                    viewModel[dataTable].removeRows(rows);
                },

                //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
                beforeEdit: function (index, rowId) {
                    viewModel.childList.clear();
                    viewModel.goBillPanel();
                    $("#personBase").show();
                    $("#personBase_show").hide();
                    //设置tab显示基本信息
                    $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
                    $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");

                    var title;
                    viewModel.index = index;
                    var row = viewModel.simpleList.createEmptyRow();
                    if (u.isNumber(index)) {
                        //修改操作
                        title = "编辑";
                        var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                        viewModel.rowId = rowId;
                        viewModel.supplierId = currentData.id
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT)
                        viewModel.findGoodsBySupplier(currentData.supplierId)

                    } else {
                        title = "新增"
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD)
                        // viewModel.simpleList.setSimpleData([])
                        viewModel.simpleList.setRowFocus(row);
                    }

                },

                findGoodsBySupplier: function (supplierId) {
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.baseurl + "/find-by-supplier",
                        dataType: "json",
                        data: {
                            supplierId: supplierId
                        },
                        success: function (data) {
                            viewModel.childList.setSimpleData(data, {
                                unSelect: true
                            });
                        }
                    })
                },

                //将人员信息保存
                saveHandle: function () {
                    var simpleData = viewModel.simpleList.getFocusRow().getSimpleData();
                    var childData = viewModel.childList.getSimpleData();
                    if(!childData || childData.length === 0 || viewModel.childList.getDeleteRows().length === viewModel.childList.getAllDatas().length) {
                        toastr.warning("请维护可供商品");
                        return;
                    }
                    for (var i = 0; i < childData.length; i++) {
                        if(childData[i].persistStatus === 'fdel') {

                        }
                        childData[i].supplierId = simpleData.supplierId;
                        childData[i].supplierCode = simpleData.supplierCode;
                        childData[i].supplierName = simpleData.supplierName;
                        for(var j=i;j< childData.length-1; j++){
                            if((childData[i].goodsCategoryId === childData[j+1].goodsCategoryId)&&childData[i].goodsCategoryId!=null&&childData[i].goodsCategoryId!==""){
                                toastr.warning("不能填写相同的商品分类");
                                return;
                            }
                            if((childData[i].goodsId === childData[j+1].goodsId)&&childData[i].goodsId!=null&&childData[i].goodsId!==""){
                                toastr.warning("不能填写相同的商品");
                                return;
                            }
                        }
                    }

                    //更改后台数据
                    $._ajax({
                        url: appCtx + viewModel.baseurl + "/batch-save",
                        type: "post",
                        data: JSON.stringify(childData),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            //如果index大于等于0说明是修改
                            viewModel.search();
                            viewModel.retListPanel();
                        }
                    })
                },

                //删除和批量删除
                del: function (data, rowId) {
                    if (typeof (data) == 'number') {
                        viewModel.simpleList.setRowSelectbyRowId(rowId);
                    }
                    var ids = [];
                    var rows = viewModel.simpleList.getSelectedRows();
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
                                        viewModel.simpleList.removeRows(rows);
                                    }
                                });
                            }
                        });
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                //子表 删除和批量删除
                delChild: function () {
                    var rows = viewModel.childList.getSelectedRows();
                    viewModel.childList.removeRows(rows);
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                search: function (reindex) {
                    if (reindex) {
                        viewModel.simpleList.pageIndex(0);
                    }
                    viewModel.simpleList.removeAllRows();
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    queryData.size = viewModel.simpleList.pageSize();
                    queryData.page = viewModel.simpleList.pageIndex();
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.baseurl,
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.simpleList.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.simpleList.totalRow(data.totalElements);
                            viewModel.simpleList.totalPages(data.totalPages);
                        }
                    })
                },
                //清空搜索条件
                cleanSearch: function () {
                    viewModel.searchcomp.clearSearch();
                },
                //页码改变时的回调函数
                pageChange: function (index) {
                    viewModel.simpleList.pageIndex(index);
                    viewModel.search();
                },
                //页码改变时的回调函数
                sizeChange: function (size) {
                    viewModel.simpleList.pageSize(size);
                    viewModel.search(true);
                },
                //启用
                enable: function () {
                    var selectedRows = viewModel.simpleList.getSelectedRows();
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
                    var selectedRows = viewModel.simpleList.getSelectedRows();
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
                    var listData = viewModel.simpleList; //需要导出表格的dataTable
                    var ele = $('#exportFiel')[0]; //挂载元素
                    common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
                },
                //导入---岗位
                importPost: function () {
                    var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                    var urlStatusInfo = "/person-post-excel/excelLoadingStatus"; //请求进度地址参数
                    var ele = $('#importFiel')[0]; //挂载元素
                    common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
                },
                //导出---岗位
                exportPost: function () {
                    var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                    //搜索参数加customer.
                    for (var p in searchParams) {
                        searchParams[
                            p.replace("LIKE_", "LIKE_person.").replace("EQ_", "EQ_person.")
                        ] =
                            searchParams[p];
                        delete searchParams[p];
                    }
                    var templateUrl = "/person-post-excel/downloadExcelTemplate"; //导出模板地址参数
                    var excelDataUrl = "/person-post-excel/excelDataExport"; //导出数据地址参数
                    var listData = viewModel.simpleList; //需要导出表格的dataTable
                    var ele = $("#exportFiel")[0]; //挂载元素
                    common.fileHandle.exportFile(
                        listData,
                        ele,
                        searchParams,
                        templateUrl,
                        excelDataUrl
                    );
                },
            },
            afterCreate: function () {
                // 初始化折叠面板
                $.fn.collapsepanel(false, true);
                //viewModel.search();


                // 基本信息
                viewModel.simpleList.on("supplierId.valuechange", function (
                    obj
                ) {
                    var list = viewModel.childList.getSimpleData();
                    var flag = false;
                    if(obj.oldValue!=null&&obj.oldValue!=""){
                        for(var i=0;i<list.length;i++){
                            if(list[i].persistStatus != 'fdel'){
                                flag = true;
                                break;
                            }
                        }
                    }
                   
                    
                    if (obj.newValue != obj.oldValue&flag) {
                        
                        common.dialog.confirmDialog({
                            msg1: "确认返回列表页？",
                            msg2: "可供商品页签均清空,按照新的供应商带入",
                            width: "400px",
                            type: "error",
                            onOk: function () {
                                viewModel.findGoodsBySupplier(obj.newValue)
                            }
                        });
                    }else{
                        viewModel.findGoodsBySupplier(obj.newValue)
                    }

                });
            }
        });

        return view;
    });
