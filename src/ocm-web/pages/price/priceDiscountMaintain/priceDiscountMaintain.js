define([
    'text!./priceDiscountMaintain.html', 'ocm_common', 'ocm_baseview', './meta.js'
], function (tpl, common, baseview, model) {
    'use strict'
    var viewModel;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: '/price/discount-maintains',
            detailurl: '/price/discount-maintain-details',

            discountMaintainList: new u.DataTable(model.options.metas.discountMaintainmeta),
            discountMaintainDetail: new u.DataTable(model.options.metas.discountMaintainDetailmeta),
            // 自定义价格项数量
            customPriceItemNum: 10,
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            subsearchcomp: {},
            subsearchSource: model.options.searchs.search2,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            defaultGridTpl: {
                domid: "grid_discountMaintainDetail",
                umeta: {
                    id: "grid_discountMaintainDetail",
                    data: "discountMaintainDetail",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: false,
                },
                columns: [],
            }
        },
        rendertype: {
            operation4single: common.rendertype.operation4single,
            goBillPanel: common.bill.goBillPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel,
            //跳转详情页
            goDetailPanel: common.bill.goDetailPanel,
            ImpactObjectSrc: [{
                value: "1",
                name: "影响折扣"
            }, {
                value: "0",
                name: "影响价格"
            }],
            // 价格精度处理的format 2位
            formater: new u.NumberFormater(2),
        },
        events: {
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
            beforeEdit: function (index, rowId) {
                var title;
                viewModel.index = index;
                if (index >= 0) {
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.discountMaintainList.getRowByRowId(rowId).getSimpleData();
                    viewModel.rowId = rowId;
                    viewModel.dialogcardcomp.seteidtData(currentData);
                } else {
                    title = "新增"
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                }
                //显示模态框
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
                                currentRow = viewModel.discountMaintainList.getRowByRowId(viewModel.rowId);
                                //将用户填写的数据更新到discountMaintainList上
                            } else {
                                //添加数据
                                currentRow = viewModel.discountMaintainList.createEmptyRow();
                            }
                            currentRow.setSimpleData(data);
                        }
                    })

                }
            },
            //删除和批量删除
            del: function (data, rowId) {
                if (typeof (data) == 'number') {
                    viewModel.discountMaintainList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var rows = viewModel.discountMaintainList.getSelectedRows();
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
                                    viewModel.discountMaintainList.removeRows(rows);
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
                    viewModel.discountMaintainList.pageIndex(0);
                }
                viewModel.discountMaintainList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                queryData.size = viewModel.discountMaintainList.pageSize();
                queryData.page = viewModel.discountMaintainList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        viewModel.discountMaintainList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.discountMaintainList.totalRow(data.totalElements);
                        viewModel.discountMaintainList.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.discountMaintainList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.discountMaintainList.pageSize(size);
                viewModel.search(true);
            },
            //启用
            enable: function () {
                var selectedRows = viewModel.discountMaintainList.getSelectedRows();
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
                var selectedRows = viewModel.discountMaintainList.getSelectedRows();
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
                                selectedRows[i].setValue("isEnable", "0");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            changeCondition: function (domid, oldcondition, newcondition) {
                $("#" + domid).parent().attr("data-refparam", JSON.stringify(
                    u.extend({},
                        oldcondition,
                        newcondition
                    )
                ));
            },
            generateGrid: function (data) {
                function transOption(data) {
                    var keyObj = {
                        useGoods: {
                            field: "goodsId",
                            title: "商品",
                            showField: "goodsName"
                        },
                        useProduct: {
                            field: "productId",
                            title: "产品",
                            showField: "productName"
                        },
                        useBrand: {
                            field: "brandId",
                            title: "品牌",
                            showField: "brandName"
                        },
                        useGoodsCategory: {
                            field: "goodsCategoryId",
                            title: "商品分类",
                            showField: "goodsCategoryName"
                        },
                        useProductLine: {
                            field: "productLineId",
                            title: "产品线",
                            showField: "productLineName"
                        },
                        useCustomer: {
                            field: "customerId",
                            title: "客户",
                            showField: "customerName"
                        },
                        useCustomerCategory: {
                            field: "customerCategoryId",
                            title: "客户分类",
                            showField: "customerCategoryName"
                        },
                        useShop: {
                            field: "shopId",
                            title: "门店",
                            showField: "shopName"
                        },
                    }
                    var columns = [];
                    for (var key in keyObj) {
                        if (data[key] == 1) {
                            columns.push(u.extend({
                                "dataType": "String",
                                "renderType": "ncReferRender",
                                "editType": "ncReferEditType",
                                "editOptions": {
                                    "validType": "string",
                                }
                            }, keyObj[key]))
                        }
                    }
                    columns.push(u.extend({
                        "dataType": "String",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
                        }
                    }, {
                        field: "currencyId",
                        title: "币种",
                        showField: "currencyName",
                        required: false
                    }));

                    columns.push(u.extend({
                        "dataType": "String",
                        "editable": "false",
                    }, {
                        field: "adjustNumber",
                        title: "基准折扣调整单号",
                        showField: "adjustNumber"
                    }));
                    var priceListItems = data.priceListItems;
                    var count = 1;
                    viewModel.detailItems = {};
                    for (var i = 0; i < priceListItems.length; i++) {
                        if (priceListItems[i].isSelected == 1) {
                            columns.push({
                                "field": "detailItemPrice" + count,
                                "dataType": "String",
                                "title": priceListItems[i].priceItemName,
                                // "editType": "float",
                                "editable": false
                            });
                           /* columns.push({
                                "field": "impactObject" + count,
                                "dataType": "String",
                                "title": "影响对象",
                                "editType": "combo",
                                "editOptions": {
                                    "type": "combo",
                                    "datasource": "ImpactObjectSrc"
                                },
                                "renderType": "comboRender"
                            });*/
                            columns.push({
                                "field": "discountIndex" + count,
                                "dataType": "String",
                                "title": "折扣指数",
                                "editType": "float",
                            });
                            columns.push({
                                "field": "discountAdd" + count,
                                "dataType": "String",
                                "title": "价格加成",
                                "editType": "float",
                            });
                            columns.push({
                                "field": "newPrice" + count,
                                "dataType": "String",
                                "title": priceListItems[i].priceItemName + "新价格",
                                // "editType": "float",
                                "editable": false
                            });
                            viewModel.detailItems["detailItemId" + count] = priceListItems[i].id;
                            viewModel.detailItems["detailItemName" + count] = priceListItems[i].priceItemName;
                            count++;
                        }
                    }

                    return u.extend({}, viewModel.defaultGridTpl, {
                        columns: columns
                    });
                }

                function handleGridTpl(param) {
                    function handleUmeta(meta) {
                        return JSON.stringify(meta);
                    }

                    function handleColumns(columns) {
                        if (u.isArray(columns)) {
                            var optionArr = columns.map(function (item) {
                                return '<div options=\'' + JSON.stringify(item) + '\'></div>'
                            })
                            return optionArr.join(" ");

                        } else {
                            throw new Error("columns must be Array");
                        }
                    }

                    return '<div id=\'' + param.domid + '\' u-meta=\'' + handleUmeta(param.umeta) + '\'>' +
                        handleColumns(param.columns) +
                        '</div>'
                }

                var $ele = $("#detailgrid");
                var ele = $ele[0];
                var options = transOption(data);
                $ele.empty();
                ele.innerHTML = handleGridTpl(options);

                ko.cleanNode(ele);
                u.createApp({
                    el: ele,
                    model: viewModel
                });
            },
            cancelBill: function () {
                viewModel.retListPanel();
            },

            showMaintainPanel: function () {
                viewModel.discountMaintainDetail.removeAllRows();
                var selectedRows = viewModel.discountMaintainList.getSelectedRows();
                if (selectedRows && selectedRows.length == 1) {
                    var row = selectedRows[0];
                    var id = row.getValue("id");
                    var priceDiscountId = row.getValue("priceDiscountId");
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.detailurl + '/find-by-priceDiscountId',
                        data: {
                            priceDiscountId: priceDiscountId
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data && data.priceListItems && data.priceListItems.length > 0)
                                data.priceListItems.sort(common.arrSort.arrMaxToMinSort("priceItemId"));
                            viewModel.generateGrid(data);
                            viewModel.goBillPanel();
                            // 补充主表id
                            if (viewModel.detailItems == undefined) viewModel.detailItems = {};
                            viewModel.detailItems.priceDiscountMaintainId = id;
                            // 搜索价目表详情
                            viewModel.searchMaintainDetail(true);
                        }
                    })
                } else {
                    if (selectedRows.length > 1) {
                        toastr.warning("只能选择一项");
                    } else {
                        toastr.warning("请先选择一项");
                    }
                }
            },
            //新增子表项
            addItem: function () {
                viewModel.discountMaintainDetail.createEmptyRow();
            },
            //删除子表项
            delItems: function () {
                var selectedRows = viewModel.discountMaintainDetail.getSelectedRows();
                viewModel.discountMaintainDetail.removeRows(selectedRows);
            },
                        //导入
            importHandle_detail: function() {
                var listData = viewModel.discountMaintainDetail; //需要导出表格的dataTable
                var row = viewModel.discountMaintainList.getCurrentRow();
                var pointparam = "?Excel_sid="+row.getValue("id");
                var urlInfo = '/discount-maintain-details-excel/excelDataImport'+pointparam;; //倒入地址参数
                var urlStatusInfo = '/discount-maintain-details-excel/excelLoadingStatus'; //请求进度地址参数
                var ele = $('#importFiel')[0]; //挂载元素
        
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, null, function() {
                    viewModel.searchMaintainDetail(true);
                  });
                },
                //导出
            exportHandle_detail: function() {
                var listData = viewModel.discountMaintainDetail; //需要导出表格的dataTable
                var row = viewModel.discountMaintainList.getCurrentRow();
               // var pointparam = "?Excel_sid="+row.getValue("priceDiscountId");
                var discountMaintainId = row.getValue("id");
                var pointparam = "?Excel_sid="+row.getValue("priceDiscountId")+"&Excel_mainid="+discountMaintainId;
                var searchParams = viewModel.subsearchcomp.getDataWithOpr(); //搜索查询参数
                searchParams["search_EQ_priceDiscountMaintain.id"] = discountMaintainId;
                var templateUrl = '/discount-maintain-details-excel/downloadExcelTemplate'+pointparam; //导出模板地址参数
                var excelDataUrl = '/discount-maintain-details-excel/excelDataExport'+pointparam; //导出数据地址参数
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            
            searchMaintainDetail: function (reindex) {
                if (reindex) {
                    viewModel.discountMaintainDetail.pageIndex(0);
                }
                var queryData = {};
                queryData.size = viewModel.discountMaintainDetail.pageSize();
                queryData.page = viewModel.discountMaintainDetail.pageIndex();
                queryData["search_EQ_priceDiscountMaintain.id"] = viewModel.detailItems.priceDiscountMaintainId;
                var addition = viewModel.subsearchcomp.getDataWithOpr();
                u.extend(queryData, addition);
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.detailurl, //+ "?sort=creationTime,asc",
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                        var newData = viewModel.dealMaintainDetailData(data.content);
                        viewModel.discountMaintainDetail.setSimpleData(newData, {unSelect: true});
                        viewModel.discountMaintainDetail.totalRow(data.totalElements);
                        viewModel.discountMaintainDetail.totalPages(data.totalPages);
                    }
                })
            },
            // 对返回的结果进行封装处理
            dealMaintainDetailData: function(data) {
              if (data && data.length > 0) {
                // 后端查询出来的价格项有顺序问题，前端手动纠正 bug号：QDYBZCP-141
                data.map(function (item) {
                    var temp = {}, i;
                    for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                        if (item["detailItemId" + i]) {
                            temp[item["detailItemId" + i]] = [
                                item["detailItemPrice" + i],
                                item["discountIndex" + i],
                                item["discountAdd" + i],
                                item["newPrice" + i]
                            ];
                        } else {
                            break;
                        }
                    }
                    var realCount = i - 1;
                    // bug号 DAVCO-13 【基准折扣定义】点击“基准折扣定义”按钮，一直卡在编辑页面，无法编辑数据
                    for (i = 1; i <= realCount; i++) {
                        if (!!temp[viewModel.detailItems["detailItemId" + i]]) {
                            item["detailItemPrice" + i] = temp[viewModel.detailItems["detailItemId" + i]][0];
                            item["discountIndex" + i] = temp[viewModel.detailItems["detailItemId" + i]][1];
                            item["discountAdd" + i] = temp[viewModel.detailItems["detailItemId" + i]][2];
                            item["newPrice" + i] = temp[viewModel.detailItems["detailItemId" + i]][3];
                        }
                    }
                })
              }
              return data;
            },
            //清空搜索条件
            subcleanSearch: function () {
                viewModel.subsearchcomp.clearSearch();
            },
            //页码改变时的回调函数
            subPageChange: function (index) {
                viewModel.discountMaintainDetail.pageIndex(index);
                viewModel.searchMaintainDetail();
            },
            //页码改变时的回调函数
            subSizeChange: function (size) {
                viewModel.discountMaintainDetail.pageSize(size);
                viewModel.searchMaintainDetail(true);
            },
            beforeSubPageChange: function (index) {
                var rows = viewModel.discountMaintainDetail.getChangedRows();
                if (rows && rows.length > 0) {
                    common.dialog.confirmDialog({
                        msg1: '当前页有修改，是否跳转？',
                        msg2: '跳转后会丢失当前页未保存数据',
                        width: '400px',
                        type: 'error',
                        onOk: function () {
                            viewModel.subPageChange(index);
                        },
                    });
                    return false
                }
                return true
            },

            saveMaintain: function () {
                var postdata = viewModel.discountMaintainDetail.getSimpleData();
                var changeData = [];
                var nochangeData = []
                if (postdata && postdata.length > 0) {
                    for (var i = 0; i < postdata.length; i++) {
                        if (postdata[i].persistStatus != "nrm") {
                            u.extend(postdata[i], viewModel.detailItems);
                            changeData.push(postdata[i]);
                        } else {
                            nochangeData.push(postdata[i]);
                        }
                    }
                }
                if (changeData.length == 0) {
                    toastr.warning("没有需要保存的数据");
                    return
                }
                $._ajax({
                    url: appCtx + viewModel.detailurl + "/batch-save",
                    type: "post",
                    data: JSON.stringify(changeData),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                      var newData = (data || []).concat(nochangeData || []);
                      newData = viewModel.dealMaintainDetailData(newData);
                      viewModel.discountMaintainDetail.removeAllRows();
                      viewModel.discountMaintainDetail.setSimpleData(newData, {
                        unSelect: true,
                        status: "nrm"
                      });

                        // viewModel.discountMaintainDetail.removeAllRows();
                        // viewModel.discountMaintainDetail.addSimpleData(data, "nrm", {"unSelect": true}, false);
                        // viewModel.discountMaintainDetail.addSimpleData(nochangeData, "nrm", {"unSelect": true}, false);
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
            },
            inquirePrice: function (goodsId, row) {
                if (goodsId) {
                    var selectedRows = viewModel.discountMaintainList.getSelectedRows();
                    var organizationId = selectedRows[0].getValue("organizationId");
                    var customerId = row.getValue("customerId");
                    var shopId = row.getValue("shopId");
                    var customerCategoryId= row.getValue("customerCategoryId");
                    var params = {
                            organizationId: organizationId,
                            goodsId: goodsId,
                            customerId: customerId,
                            shopId: shopId,
                            customerCategoryId:customerCategoryId
                    };
                    //var goodsId = row.getValue("goodsId");
                    $._ajax({
                        url: appCtx + '/price/price-inquires/find-by-goodsid',
                        type: 'post',
                        data: JSON.stringify(params),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data && data.length > 0) {
                                var i;
                                for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                                    if (viewModel.detailItems["detailItemId" + i]) {
                                        data.forEach(function (item) {
                                            if (item.priceListItemId == viewModel.detailItems["detailItemId" + i]) {
                                                row.setValue("detailItemPrice" + i, item.price)
                                            }
                                        });
                                    }
                                }
                            } else {
                                for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                                    if (viewModel.detailItems["detailItemId" + i]) {
                                        row.setValue("detailItemPrice" + i, null)
                                    }
                                }
                            }
                        }
                    })
                } else {
                    for (var i = 1; i <= viewModel.customPriceItemNum; i++) {
                        if (viewModel.detailItems["detailItemId" + i]) {
                            row.setValue("detailItemPrice" + i, null)
                        }
                    }
                }

            }
        },
        afterCreate: function () {
            // 为弹出框补充额外字段，防止设置值时报错
            viewModel.dialogcardcomp.viewModel.params.meta["priceMaintainId"] = u.extend({}, u.DataTable.META_DEFAULTS, {
                type: 'string'
            });
            viewModel.dialogcardcomp.viewModel.params.removeAllRows();
            viewModel.dialogcardcomp.viewModel.params.createEmptyRow();

            viewModel.dialogcardcomp.viewModel.params.on("organizationId.valuechange", function (obj) {
                var value = obj.newValue;
                viewModel.changeCondition("priceDiscountId", {}, {
                    "EQ_organization": value
                })

            });

            viewModel.dialogcardcomp.viewModel.params.on("priceDiscountId.valuechange", function (obj) {
                var row = obj.rowObj;
                if (obj.newValue) {
                    var refer = $("#refContainerpriceDiscountId").data("uui.refer");
                    var refValues = refer.values;
                    if (refValues && refValues.length > 0) {
                        row.setValue("priceMaintainId", refValues[0].priceMaintainId);
                        row.setValue("priceMaintainName", refValues[0].priceMaintainName);
                    }
                } else {
                    row.setValue("priceMaintainId", null);
                    row.setValue("priceMaintainName", null);
                }
            });



        // 商品支持多选，特殊处理
        viewModel.discountMaintainDetail.on("goodsId.valuechange", function(obj) {
            if (!obj.newValue || obj.oldValue == obj.newValue) return;
            var refer = $("#refContainergoodsId").data("uui.refer");
            if(!refer || !refer.values) return;
            var refValues = refer.values;
            $("#refContainergoodsId").data("uui.refer").setValue("");
            if(!refValues || refValues.length < 1) return;
            var curRow = viewModel.discountMaintainDetail.getRowByRowId(obj.rowId);
            curRow.setValue('goodsId', refValues[0].refpk);
            curRow.setValue('goodsName', refValues[0].refname);
            curRow.setValue('currencyId', "CURRENCY-01");
            curRow.setValue('currencyName', "人民币");
            viewModel.inquirePrice(refValues[0].refpk, curRow);
            for (var i = 1; i < refValues.length; i++) {
              var newRow = viewModel.discountMaintainDetail.createEmptyRow({
								unSelect: true
							});
              newRow.setValue('goodsId', refValues[i].refpk);
              newRow.setValue('goodsName', refValues[i].refname);
              newRow.setValue('currencyId', "CURRENCY-01");
              newRow.setValue('currencyName', "人民币");
              viewModel.inquirePrice(refValues[i].refpk, newRow);
            }
          });

          viewModel.discountMaintainDetail.on("valuechange", function (obj) {
                if (obj.field == "customerId" || obj.field == "shopId" ||obj.field == "customerCategoryId") {
                    viewModel.inquirePrice(obj.rowObj.data.goodsId.value, obj.rowObj);
                    // if(obj.rowObj.data.goodsId.value!=null) {
                    //     var goodsIds = obj.rowObj.data.goodsId.value.split(",");
                    //     $("#refContainergoodsId").data("uui.refer").setValue("");
                    //     if (goodsIds.length > 1 && obj.field == "goodsId") {
                    //         var goodsNames = obj.rowObj.data.goodsId.meta.display.split(",");
                    //         for (var i=0; i<goodsIds.length; i++) {
                    //             if(i==0) {
                    //                 viewModel.inquirePrice(goodsIds[i], obj.rowObj);
                    //             }else{
                    //                 var newRow = viewModel.discountMaintainDetail.createEmptyRow();
                    //                 newRow.setValue('goodsId', goodsIds[i]);
                    //                 newRow.setValue('goodsName', goodsNames[i]);
                    //             }
                    //         }
                    //     } else {
                            
                    //     }
                    // }
                } else {
                    //var reg = /^(discountIndex|discountAdd|detailItemPrice|impactObject)(\d+)$/;
                    var reg = /^(discountIndex|discountAdd|detailItemPrice)(\d+)$/;
                    if (reg.test(obj.field) && (obj.newValue || obj.oldValue)) {
                        var row = obj.rowObj;
                        var index = RegExp["$2"];
                       // var impactObject = row.getValue("impactObject" + index);
                        var discountIndex = parseFloat(row.getValue("discountIndex" + index)) / 100 || 0;
                        var discountAdd = parseFloat(row.getValue("discountAdd" + index)) || 0;
                        var detailItemPrice = parseFloat(row.getValue("detailItemPrice" + index)) || 0;
                        var newPrice;
                        newPrice = detailItemPrice * (1 + discountIndex)+discountAdd;
                        newPrice = viewModel.formater.format(newPrice);
                        row.setValue("newPrice" + index, newPrice);
                    }
                }
            });
        }
    });

    return view;
});
