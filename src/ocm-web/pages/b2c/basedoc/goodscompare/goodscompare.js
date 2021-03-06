define(['text!./goodscompare.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch, platStoreDetailDialog, singledoceidt;
    baseData = {
        baseurl: '/b2c/goods-compares',
        mainDataList: new u.DataTable(mainDataMeta),
        thisList: new u.DataTable(thisListMeta),
        addList: new u.DataTable(thisListMeta),
    };
    rendertype = {
        operation: function(obj) {
            var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
            var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
            obj.element.innerHTML = '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" class="" ' +
                editfun +
                ' title="编辑">编辑</a>' +
                '</span>    ' +
                '<span class="ui-handle-word">' +
                '<a href="#" class="" ' +
                delfun +
                ' title="删除">删除</a>' +
                '</span></div>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        }

    };
    events = {
        //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
        beforeEdit: function(index) {
            var title;
            viewModel.index = index;
            if (index >= 0) {
                //修改操作
                title = "编辑";
                var listData = viewModel.mainDataList.getSimpleData()[index];
                //viewModel.thisList.setSimpleData(listData);
                viewModel.editList();
                //singledoceidt.seteidtData(listData);
            } else {
                title = "新增"
                //singledoceidt.cleareidt();
                viewModel.addMianData();
                //清空编辑框的信息
                //singledoceidt.cleareidt();
            }
            //显示模态框
            //singledoceidt.show(title,"900px",viewModel.edit);
        },
        addDelChild: function(obj, index) {
            if (obj >= 0) { //删除
                var selectedRows = viewModel.addList.getSelectedRows();
                if (selectedRows.length < 1) {
                    toastr.warning("请选择数据");
                    return;
                }
                viewModel.addList.removeRows(selectedRows);
            } else { //新增
                var emptyRow = viewModel.addList.createEmptyRow({
                    unSelect: true
                });
            }
        },
        //将操作后的数据进行保存
        saveData: function() {
            //var result = singledoceidt.validate();
            var result = viewModel.thisList.validate();
            if (result.passed) {
                var index = viewModel.index;
                var listRow, type = "post";

                var postdata = singledoceidt.geteidtData();

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
                        singledoceidt.close();
                        if (index >= 0) {
                            //获取需要修改的行
                            listRow = viewModel.mainDataList.getRow(index);
                            //将用户填写的数据更新到CustDocDefList上
                        } else {
                            //添加数据
                            listRow = viewModel.mainDataList.createEmptyRow();
                        }
                        listRow.setSimpleData(data);
                    }
                })
            }
        },
        //删除和批量删除
        del: function(data) {
            if (typeof(data) == 'number') {
                viewModel.mainDataList.setRowSelect(data);
            }
            var ids = [];
            var rows = viewModel.mainDataList.getSelectedRows();
            if (rows && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    // var isauditStatus = rows[i].getValue("auditStatus");
                    // if (isauditStatus == "1" || isauditStatus == 1) {
                    //     toastr.warning('该数据已审核不能删除');
                    //     return;
                    // }
                    ids.push(rows[i].getValue("id"));
                }
            } else {
                toastr.warning('请选择数据');
                return;
            }
            if (rows && rows.length > 0) {
                common.dialog.confirmDialog({
                    msg1: '确认删除这些项？',
                    msg2: '此操作不可逆',
                    width: '400px',
                    type: 'error',
                    onOk: function() {
                        $._ajax({
                            url: appCtx + viewModel.baseurl + "/delete",
                            type: "post",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function(data) {
                                viewModel.mainDataList.removeRows(rows);
                                viewModel.search();
                            }
                        });
                    }
                });
            } else {
                toastr.warning('请选择数据');
                return;
            }
        },
        //导入
        importHandle: function() {
            var urlInfo = '/goods-compare-excel/excelDataImport'; //倒入地址参数
            var urlStatusInfo = '/goods-compare-excel/excelLoadingStatus'; //请求进度地址参数
            var ele = $('#importFiel')[0]; //挂载元素
            common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
        },
        //导出
        exportHandle: function() {
            var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
            var templateUrl = '/goods-compare-excel/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl = '/goods-compare-excel/excelDataExport'; //导出数据地址参数
            var listData = viewModel.mainDataList; //需要导出表格的dataTable
            var ele = $('#exportFiel')[0]; //挂载元素
            common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
        },
        //新增弹窗
        addMianData: function(index) {
            //清空新增缓存信息
            viewModel.addList.removeAllRows();
            var self = this;
            platStoreDetailDialog = u.dialog({
                id: 'dialog_content_addListFun1',
                content: "#dialog_content_addListFun",
                "width": "900px"
            });
            var okButton = $("#dialog_content_addListFun .u-msg-ok");
            okButton.unbind("click").click(function() {
                //验证
                var add = self.saveAdd();
                if (add) {
                    platStoreDetailDialog.close();
                }



            });
            var cancelButton = $("#dialog_content_addListFun .u-msg-cancel");
            cancelButton.unbind("click").click(function() {
                viewModel.addList.removeAllRows();
                platStoreDetailDialog.close();
            });
        },
        //编辑弹窗
        editList: function(index) {
            var self = this;
            platStoreDetailDialog = u.dialog({
                id: 'dialog_content_list_editListFun1',
                content: "#dialog_content_list_editListFun",
                "width": "900px"
            });

            var okButton = $("#dialog_content_list_editListFun .u-msg-ok");
            okButton.unbind("click").click(function() {
                // var result = app.compsValidateMultiParam({element: $("#dialog_content_list_editListFun")[0], showMsg: true}); 
                // console.log(result.passed);  
                if (viewModel.saveBill()) {
                    platStoreDetailDialog.close();
                }

            });
            var cancelButton = $("#dialog_content_list_editListFun .u-msg-cancel");
            cancelButton.unbind("click").click(function() {
                platStoreDetailDialog.close();
            });

        },
        //查看详情-弹窗
        detail: function() {

            var self = this;
            platStoreDetailDialog = u.dialog({
                id: 'dialog_content_listFun1',
                content: "#dialog_content_listFun",
                "width": "900px"
            });
            //data
            setTimeout(function() {
                var curRow = viewModel.mainDataList.getCurrentRow();
                var id = curRow.getValue("id");
                viewModel.findByParentid(id);
            }, 0);


            //保存//取消
            var cancelButton = $("#dialog_content_listFun .u-msg-cancel");
            cancelButton.unbind("click").click(function() {
                platStoreDetailDialog.close();


            });


        },
        //进入复制单据页
        showCopyBillPanel: function() {
            var selectedRows = viewModel.mainDataList.getSelectedRows();
            // 只支持单一复制，批量复制需单独处理
            if (selectedRows.length != 1) {
                //TODO: tips替换
                toastr.warning('请选择一条要复制的行');
                return;
            }
            var copyRow = selectedRows[0];
            var curRow = viewModel.mainDataList.createEmptyRow();
            curRow.setSimpleData(copyRow.getSimpleData());
            curRow.status = "new";
            viewModel.mainDataList.setRowFocus(curRow);
            var id = copyRow.getValue("id");
            //查询子表数据
            viewModel.findByParentid(id);
            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow);

            //删除子表主键，子表主表关联
            var subRows = viewModel.mainDataListChild.getAllRows();
            for (var i = 0; i < subRows.length; i++) {
                viewModel.clearBaseProp(subRows[i]);
                subRows[i].setValue("orderTypeId", "");
                subRows[i].status = "new";
            }
            viewModel.goBillPanel();
            viewModel.billPanelStatus = CONST.BILLPANELSTATUS.COPY;
        },
        //查询子表数据
        findByParentid: function(id) {
            $._ajax({
                url: appCtx + viewModel.baseurl + '/detail',
                type: 'post',
                async: false,
                data: {
                    id: id
                },
                success: function(data) {
                    viewModel.thisList.setSimpleData(data, {
                        unSelect: true
                    });
                }
            })
        },
        //保存单据
        saveBill: function() {
            var type = "post";
            if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
                type = "put";
            }

            var mainData = viewModel.mainDataList.getCurrentRow().getSimpleData();
            //mainData = viewModel.thisList.getSimpleData();
            //mainData = childData;
            var validate = $("#validate")[0];
            var result = app.compsValidateMultiParam({
                element: validate,
                showMsg: true
            });
            //console.log(result.passed);

            if (result.passed) {
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(mainData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        viewModel.mainDataList.getFocusRow().setSimpleData(data);
                        viewModel.search();
                        toastr.success("保存成功");
                    }
                });
            }

            return result.passed;
        },
        //新增保存
        saveAdd: function(i) {

            var result = viewModel.validateBill();
            if (result) {

                var data = viewModel.addList.getSimpleData();
                $._ajax({
                    url: appCtx + viewModel.baseurl + '/batch-save',
                    type: 'post',
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        viewModel.mainDataList.addSimpleData(data);
                        // viewModel.search(); 
                        toastr.success("保存成功");
                    }
                });
                return true;
            } else {
                return false;
            }

        },
        //新增验证-校验单据合法性
        validateBill: function() {
            var result = app.compsValidateMultiParam({
                element: $("#dialog_content_addListFun")[0],
                showMsg: true
            });
            //
            // console.log(result.passed);
            // if (result.passed) { 

            // }          
            var addListData = viewModel.addList.getSimpleData();
            if (addListData == undefined) {
                toastr.error('未添加数据');
                return false;
            } else {
                var rows = viewModel.addList.getAllRows();
                var errmsg = "请输入";
                if (rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        var temperrmsg = "";
                        if (rows[i].getValue("platformId") == null) {
                            temperrmsg = "平台"
                            toastr.error(errmsg + temperrmsg);
                            return false;
                        } else if (rows[i].getValue("goodsId") == null
                        		&& rows[i].getValue("combineGoodsId") == null) {
                            temperrmsg = "商品或组合商品"
                            toastr.error(errmsg + temperrmsg);
                            return false;
                        } else if (rows[i].getValue("outSkuCode") == null) {
                            temperrmsg = "平台商品编码"
                            toastr.error(errmsg + temperrmsg);
                            return false;
                        } else {
                            //toastr.error(errmsg);
                            return true;
                        }

                    }
                }

            }
            return true;
        },

        //点击取消 单据页
        cancelHandle: function() {
            var curRow = viewModel.mainDataList.getCurrentRow();
            // 修改，则还原
            if (curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.mainDataList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.mainDataList.removeRow(curRow);
                viewModel.mainDataListChild.removeAllRows();
            }
            //viewModel.retListPanel();
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
            if (reindex) {
                viewModel.mainDataList.pageIndex(0);
            }
            viewModel.mainDataList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            queryData.size = viewModel.mainDataList.pageSize();
            queryData.page = viewModel.mainDataList.pageIndex();


            $.ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.mainDataList.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.mainDataList.totalRow(data.totalElements);
                    viewModel.mainDataList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function() {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
            viewModel.mainDataList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
            viewModel.mainDataList.pageSize(size);
            viewModel.search(true);
        }
    }
    viewModel = u.extend({}, baseData, events, rendertype);

    function appInit(element, params) {
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        // 查询组件初始化
        singledocSearch = new searchbox(
            $("#searchcontent1")[0], [{
                    type: "refer",
                    key: "platform--id",
                    label: "平台",
                    refinfo: "b2cplatform",
                    refName: "平台"
                }, {
                    type: "refer",
                    key: "store--id",
                    label: "店铺",
                    refinfo: "b2cStoreRef",
                    refName: "店铺",
                    //                  clientParam: {
                    //                      "EQ_areaLevel": "1"
                    //                  },
                }, {
                    type: "refer",
                    key: "goodsId",
                    label: "商品",
                    refinfo: "goods-no-version",
                    //                  clientParam: {
                    //                      "EQ_areaLevel": "2"
                    //                  },
                }, {
                    type: "string",
                    key: "outSkuCode",
                    label: "平台商品编码",
                }

            ]);
        viewModel.search();
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#mainDataList-searchcontent input').off("keydown").on("keydown", function(e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });


        //查询
        singledocSearch.viewModel.params.on("platform--id.valuechange", function(obj) {
            var id = obj.newValue;
            $("#store--id").attr("data-refparam", '{"EQ_platform.id":"' + id + '"}');
            $("#store--id input").val('');
        });
        //编辑
        viewModel.mainDataList.on("platformId.valuechange", function(obj) {
            var id = obj.newValue;
            $("#storeId").attr("data-refparam", '{"EQ_platform.id":"' + id + '"}');
            $("#storeId input").val('');
        });
        viewModel.mainDataList.on("combineGoodsId.valuechange", function(obj) {
            var id = obj.newValue;
            $("#goodsId input").val('');
        });
        viewModel.mainDataList.on("goodsId.valuechange", function(obj) {
            var id = obj.newValue;
            $("#combineGoodsId input").val('');
        });
        //新增
        viewModel.addList.on("platformId.valuechange", function(obj) {
            var id = obj.newValue;
            $("#storeId").attr("data-refparam", '{"EQ_platform.id":"' + id + '"}');
            $("#storeId input").val('');
        });
        viewModel.addList.on("combineGoodsId.valuechange", function(obj) {
            var id = obj.newValue;
            $("#goodsId input").val('');
        });
        viewModel.addList.on("goodsId.valuechange", function(obj) {
            var id = obj.newValue;
            $("#combineGoodsId input").val('');
        });


    }

    function init(element, params) {
        appInit(element, params);
        afterRender();
        window.vm = viewModel;
    }

    return {
        init: init
    }
});