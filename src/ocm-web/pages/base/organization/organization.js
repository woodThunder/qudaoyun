//
// define([
//     'text!./organization.html',
//     'ocm_common',
//     'ocm_baseview',
//     './meta.js',
//     'searchbox',
// ], function (
//     tpl,
//     common, baseview, model, searchbox) {
//         'use strict'
//         var viewModel;
//         var view = baseview.extend({
//             tpl: tpl,
//             setTemplate: function (el, tpl) {
//                 el.innerHTML = tpl;
//                 viewModel = this.viewModel;
//             },
//             model: model,
//             baseData: {
//                 baseurl: '/organizations',
//                 statusField: 'isEnable',
//                 // excelurl:'/person-excel',
//                 dialogWidth: '900px',
//                 simpleList: new u.DataTable(model.options.metas.organizationmeta),
//                 simpleListTree: new u.DataTable(model.options.metas.organizationmeta),
//                 buttonSource: model.options.buttons.button1,
//                 searchcomp: {},
//                 searchSource: model.options.searchs.search1,
//                 search2Source: model.options.searchs.search2,
//                 dialogcardcomp: {},
//                 dialogcardSource: model.options.dialogs.dialog1,
//                 detailSource: model.options.details.detail1,
//                 gridOption: model.options.grids.grid1,
//                 treeSetting: {
//                     view: {
//                         showLine: false,
//                         multiSelect: true
//                     }
//                 },
//                 enableFmt: ko.pureComputed(function () {
//                     var status = viewModel.simpleList.ref("isEnable")();
//                     var statusName
//                     if (status == 0) {
//                         statusName = "未启用"
//                     }
//                     if (status == 1) {
//                         statusName = "已启用"
//                     }
//                     if (status == 2) {
//                         statusName = "已停用"
//                     }
//                     return statusName;
//                 }),
//                 isCorporationEnterprise: ko.pureComputed(function () {
//                     var isCorporationEnterprise = viewModel.simpleList.ref("isCorporationEnterprise")();
//                     return isCorporationEnterprise == 1 ? "是" : "否";
//                 }),
//                 isOffice: ko.pureComputed(function () {
//                     var isOffice = viewModel.simpleList.ref("isOffice")();
//                     return isOffice == 1 ? "是" : "否";
//                 }),
//                 isProduceFactory: ko.pureComputed(function () {
//                     var isProduceFactory = viewModel.simpleList.ref("isProduceFactory")();
//                     return isProduceFactory == 1 ? "是" : "否";
//                 }),
//                 promtype: ko.pureComputed(function () {
//                     var promtype, isLegalPersonCorp1, isAdministration1, isSale1, isInventory1, isLogistrics1, isPurchase1;
//                     var isLegalPersonCorp = viewModel.simpleList.ref("isLegalPersonCorp")();
//                     // isLegalPersonCorp == 1 ? "法人公司" : "";
//                     if (isLegalPersonCorp == 1) {
//                         isLegalPersonCorp1 = "法人公司、"
//                     } else {
//                         isLegalPersonCorp1 = ""
//                     }
//                     var isAdministration = viewModel.simpleList.ref("isAdministration")();
//                     // isAdministration == 1 ? "行政" : "";
//                     if (isAdministration == 1) {
//                         isAdministration1 = "行政、"
//                     } else {
//                         isAdministration1 = ""
//                     }
//                     var isSale = viewModel.simpleList.ref("isSale")();
//                     // isSale == 1 ? "销售" : "";
//                     if (isSale == 1) {
//                         isSale1 = "销售、"
//                     } else {
//                         isSale1 = ""
//                     }
//                     var isInventory = viewModel.simpleList.ref("isInventory")();
//                     // isInventory == 1 ? "工厂" : "";
//                     if (isInventory == 1) {
//                         isInventory1 = "库存、"
//                     } else {
//                         isInventory1 = ""
//                     }
//                     var isLogistrics = viewModel.simpleList.ref("isLogistrics")();
//                     // isLogistrics == 1 ? "物流" : "";
//                     if (isLogistrics == 1) {
//                         isLogistrics1 = "物流、"
//                     } else {
//                         isLogistrics1 = ""
//                     }
//
//                     var isPurchase = viewModel.simpleList.ref("isPurchase")();
//                     if (isPurchase == 1) {
//                         isPurchase1 = "采购、"
//                     } else {
//                         isPurchase1 = ""
//                     }
//                     return promtype = isLegalPersonCorp1 + isAdministration1 + isSale1 + isInventory1 + isLogistrics1 + isPurchase1;
//                 })
//             },
//             rendertype: u.extend(common.rendertype, {
//                 // 单表操作
//                 operation4single: function (obj) {
//                     var viewModel = obj.gridObj.viewModel;
//                     var dataTableRowId = obj.row.value["$_#_@_id"];
//                     var delfun =
//                         "data-bind=click:del.bind($data," +
//                         obj.rowIndex +
//                         "," +
//                         dataTableRowId +
//                         ")";
//                     var editfun =
//                         "data-bind=click:beforeEdit.bind($data," +
//                         obj.rowIndex +
//                         "," +
//                         dataTableRowId +
//                         ")";
//                     var positionGrid =
//                         "data-bind=click:positionGrid.bind($data," +
//                         obj.rowIndex +
//                         "," +
//                         dataTableRowId +
//                         ")";
//                     obj.element.innerHTML =
//                         '<div class="ui-handle-icon">' +
//                         '<span class="ui-handle-word">' +
//                         '<a href="#" ' +
//                         positionGrid +
//                         ' title="定位">定位</a>' +
//                         "</span>    " +
//                         '<span class="ui-handle-word">' +
//                         '<a href="#" ' +
//                         editfun +
//                         ' title="编辑">编辑</a>' +
//                         "</span>    " +
//                         '<span class="ui-handle-word">' +
//                         '<a href="#" ' +
//                         delfun +
//                         ' title="删除">删除</a>' +
//                         "</span></div>";
//                     ko.cleanNode(obj.element);
//                     ko.applyBindings(viewModel, obj.element);
//                 },
//             }),
//             events: {
//
//                 //返回列表页
//                 retListPanel: function () {
//                     // $(".ui-bill-panel").hide();
//                     // $(".ui-bill-detail").hide();
//                     $(".ui-panel").hide();
//                     $(".ui-treegrid-panel").show();
//                     $(".ui-list-panel").show();
//                     $(".ui-list-panel").animateCss("fadeIn");
//                 },
//                 //跳转详情页
//                 goDetailPanel: function () {
//                     // $(".ui-list-panel").hide();
//                     $(".ui-treegrid-panel").hide();
//                     $(".ui-panel").hide();
//                     $(".ui-bill-detail").show();
//                     $(".ui-bill-detail").animateCss("fadeIn");
//                 },
//                 //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
//                 beforeEdit: function (index, rowId) {
//                     var title;
//                     viewModel.index = index;
//                     if (u.isNumber(index)) {
//                         //修改操作
//                         title = "编辑";
//                         var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
//                         viewModel.rowId = rowId;
//                         viewModel.dialogcardcomp.seteidtData(currentData);
//                     } else {
//                         title = "新增"
//                         //清空编辑框的信息
//                         viewModel.dialogcardcomp.cleareidt();
//                         var data = viewModel.dialogcardcomp.geteidtData();
//                         if (viewModel.organizationId) {
//                             data.parentId = viewModel.organizationId;
//                         }
//                         viewModel.dialogcardcomp.seteidtData(data)
//                     }
//                     //显示模态框
//                     viewModel.dialogWidth ?
//                         viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
//                         viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
//                 },
//                 //将操作后的数据进行保存
//                 edit: function () {
//                     var result = viewModel.dialogcardcomp.validate();
//                     if (result.passed) {
//                         var index = viewModel.index;
//                         var currentRow, type = "post";
//                         var postdata = viewModel.dialogcardcomp.geteidtData();
//                         //var treeData = viewModel.simpleListTree.getSimpleData()[0];
//                         //postdata.parentId = treeData.id;
//                         //console.log(postdata);
//                         if (index >= 0) {
//                             type = "put";
//                         }
//                         debugger
//                         //更改后台数据
//                         $._ajax({
//                             url: appCtx + viewModel.baseurl,
//                             type: type,
//                             data: JSON.stringify(postdata),
//                             contentType: "application/json; charset=utf-8",
//                             success: function (data) {
//                                 //如果index大于等于0说明是修改
//                                 viewModel.dialogcardcomp.close();
//                                 if (index >= 0) {
//                                     //获取需要修改的行
//                                     currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
//                                     //将用户填写的数据更新到simpleList上
//                                 } else {
//                                     //添加数据
//                                     currentRow = viewModel.simpleList.createEmptyRow();
//                                 }
//                                 currentRow.setSimpleData(data);
//                                 //add by gongdb 新增或修改后更新tree
//                                 viewModel.searchTree();
//                             }
//                         })
//
//                     }
//                 },
//                 //删除和批量删除
//                 del: function (data, rowId) {
//                     if (typeof (data) == 'number') {
//                         viewModel.simpleList.setRowSelectbyRowId(rowId);
//                     }
//                     var ids = [];
//                     var rows = viewModel.simpleList.getSelectedRows();
//                     if (rows && rows.length > 0) {
//                         for (var i = 0; i < rows.length; i++) {
//                             ids.push(rows[i].getValue("id"));
//                         }
//                         common.dialog.confirmDialog({
//                             msg1: '确认删除这些项？',
//                             msg2: '此操作不可逆',
//                             width: '400px',
//                             type: 'error',
//                             onOk: function () {
//                                 $._ajax({
//                                     url: appCtx + viewModel.baseurl + "/delete",
//                                     type: "post",
//                                     // data: "ids=" + ids.join(","),
//                                     data: {
//                                         ids: ids.join(",")
//                                     },
//                                     success: function (data) {
//                                         viewModel.simpleList.removeRows(rows);
//                                         viewModel.searchTree()
//                                     }
//                                 });
//                             }
//                         });
//                     } else {
//                         toastr.warning("请至少选择一项");
//                     }
//                 },
//                 //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
//                 search: function (reindex) {
//                     if (reindex) {
//                         viewModel.simpleList.pageIndex(0);
//                     }
//                     viewModel.simpleList.removeAllRows();
//                     var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
//                     queryData.size = viewModel.simpleList.pageSize();
//                     queryData.page = viewModel.simpleList.pageIndex();
//                     $._ajax({
//                         type: "get",
//                         url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
//                         dataType: "json",
//                         data: queryData,
//                         success: function (data) {
//                             viewModel.simpleList.setSimpleData(data.content, {
//                                 unSelect: true
//                             });
//                             viewModel.simpleList.totalRow(data.totalElements);
//                             viewModel.simpleList.totalPages(data.totalPages);
//
//                         }
//                     })
//                 },
//                 //树查询方法
//                 searchTree: function () {
//                     // viewModel.simpleList.removeAllRows();
//                     var queryData = {};
//                     queryData.size = 10000;
//                     queryData.page = 0;
//                     $._ajax({
//                         type: "get",
//                         url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
//                         dataType: "json",
//                         data: queryData,
//                         success: function (data) {
//                             viewModel.simpleListTree.setSimpleData(data.content, {
//                                 //unSelect: true
//                                 unSelect: false
//                             });
//                             viewModel.simpleListTree.totalRow(data.totalElements);
//                             viewModel.simpleListTree.totalPages(data.totalPages);
//                         }
//                     })
//                 },
//                 //定位
//                 positionTree: function () {
//                     var searchKey = $("#tree-searchKey")[0].value;
//                     $(".seached").removeClass("seached");
//                     if (searchKey !== "") {
//                         console.log(searchKey);
//                         // 定义过滤条件
//                         var filter = function (node) {
//                             return node.name.indexOf(searchKey) > -1;
//                         }
//                         // 过滤出节点
//                         var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
//                         // 查找第一个节点 展开父节点并添加样式
//                         $("#tree1")[0]['u-meta'].tree.expandNode(nodes[0].getParentNode(), true, false, true);
//                         $("#" + nodes[0].tId + "_span").addClass("seached")
//                     }
//                 },
//                 positionGrid: function (index, rowId) {
//                     var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
//                     var id = currentData.id;
//                     $(".seached").removeClass("seached");
//                     // 定义过滤条件
//                     var filter = function (node) {
//                         if (node.id) {
//                             return node.id.indexOf(id) > -1;
//                         }
//                         return false;
//                     }
//                     // 过滤出节点
//                     var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
//                     // 查找第一个节点 展开父节点并添加样式
//                     if (nodes) {
//                         $("#tree1")[0]['u-meta'].tree.expandNode(nodes[0].getParentNode(), true, false, true);
//                         $("#" + nodes[0].tId + "_span").addClass("seached")
//                     }
//                 },
//                 //树点击事件
//                 clickTree: function () {
//                     //获取查询条件
//                     //var searchKey = $("#customercategory-tree-searchKey")[0].value;
//                     // var nodes = $("#tree1")[0]['u-meta'].tree.getNodes();
//                     // //树节点未有选择行时，列表查询全部数据
//                     // if(viewModel.simpleListTree.selectedIndices().length == 0){
//                     //     viewModel.simpleList.setSimpleData(tempSimpleList, {
//                     //         unSelect: true
//                     //     });
//                     //     return
//                     // }
//                     //获取到被点击的树节点行号
//                     var num = viewModel.simpleListTree.selectedIndices()[0]
//                     if (num == null) {
//                         return
//                     }
//                     //被点击的树节点
//                     var treeData = viewModel.simpleListTree.getSimpleData()[num];
//                     $('.ui-search-btn>.ui-btn-primary').trigger('click');
//                     if (!$('.ui-search-more').hasClass('expand')) {
//                         $('.ui-search-more').trigger('click');
//                     }
//                     viewModel.searchcomp.viewModel.params.setValue("parent--id", treeData.id);
//                     viewModel.search();
//                     var listData = viewModel.simpleList.getSimpleData();
//                     viewModel.simpleList.setSimpleData(listData, {
//                         unSelect: true
//                     });
//
//                 },
//
//                 //清空搜索条件
//                 cleanSearch: function () {
//                     viewModel.searchcomp.clearSearch();
//                 },
//                 //页码改变时的回调函数
//                 pageChange: function (index) {
//                     viewModel.simpleList.pageIndex(index);
//                     viewModel.search();
//                 },
//                 //页码改变时的回调函数
//                 sizeChange: function (size) {
//                     viewModel.simpleList.pageSize(size);
//                     viewModel.search(true);
//                 },
//                 //启用
//                 enable: function () {
//                     var selectedRows = viewModel.simpleList.getSelectedRows();
//                     if (selectedRows && selectedRows.length > 0) {
//                         var ids = selectedRows.map(function (row, index, arr) {
//                             return row.getValue("id");
//                         })
//                         $._ajax({
//                             type: "post",
//                             url: appCtx + viewModel.baseurl + "/batch-enable",
//                             data: {
//                                 ids: ids.join(",")
//                             },
//                             success: function (res) {
//                                 for (var i = 0; i < selectedRows.length; i++) {
//                                     viewModel.statusField ?
//                                         selectedRows[i].setValue(viewModel.statusField, "1") :
//                                         selectedRows[i].setValue("isEnable", "1");
//                                 }
//                             }
//                         })
//                     } else {
//                         toastr.warning("请至少选择一项");
//                     }
//                 },
//                 //停用
//                 disable: function () {
//                     var selectedRows = viewModel.simpleList.getSelectedRows();
//                     if (selectedRows && selectedRows.length > 0) {
//                         var ids = selectedRows.map(function (row, index, arr) {
//                             return row.getValue("id");
//                         })
//                         $._ajax({
//                             type: "post",
//                             url: appCtx + viewModel.baseurl + "/batch-disable",
//                             data: {
//                                 ids: ids.join(",")
//                             },
//                             success: function (res) {
//                                 for (var i = 0; i < selectedRows.length; i++) {
//                                     viewModel.statusField ?
//                                         selectedRows[i].setValue(viewModel.statusField, "2") :
//                                         selectedRows[i].setValue("isEnable", "2");
//                                 }
//                             }
//                         });
//                     } else {
//                         toastr.warning("请至少选择一项");
//                     }
//                 },
//                 detail: function () {
//                     //确保grid先将行设置为focus状态
//                     setTimeout(function () {
//                         viewModel.goDetailPanel();
//                     }, 0);
//                 },
//                 //导入
//                 importHandle: function () {
//                     var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
//                     var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
//                     var ele = $('#importFiel')[0]; //挂载元素
//                     common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
//                 },
//                 //导出
//                 exportHandle: function () {
//                     var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
//                     var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
//                     var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
//                     var listData = viewModel.simpleList; //需要导出表格的dataTable
//                     var ele = $('#exportFiel')[0]; //挂载元素
//                     common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
//                 },
//             },
//             afterCreate: function () {
//                 viewModel.search();
//                 viewModel.searchTree();
//             }
//         });
//         return view;
//     });







define([
    "text!./organization.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "searchbox",
], function (
    tpl,
    common, baseview, model, searchbox) {
        "use strict";
        var BILLPANELSTATUS = {
            ADD: "add",
            EDIT: "edit",
            //  COPY: "copy",
            DETAIL: "detail",
            DEFAULT: "default"
        };
        var viewModel;
        var view = baseview.extend({
            tpl: tpl,

            setTemplate: function (el, tpl) {
                el.innerHTML = tpl;
                viewModel = this.viewModel;
            },
            model: model,
            baseData: {
                baseurl: "/organizations",
                itemurl: "/base/org-func-rels",
                countryurl: "/base/org-funcs",
                statusField: "isEnable",
                // excelurl:'/person-excel',
                dialogWidth: "500px",
                simpleList: new u.DataTable(model.options.metas.organizationmeta),
                simpleListTree: new u.DataTable(model.options.metas.organizationtreemeta),
                childList: new u.DataTable(model.options.metas.orgfuncrefmeta),
                button1Source: model.options.buttons.button1,
                button2Source: model.options.buttons.button2,
                button3Source: model.options.buttons.button3,
                button4Source: model.options.buttons.button4,
                button5Source: model.options.buttons.button5,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                search2Source: model.options.searchs.search2,
                dialogcardcomp: {},
                dialogcardSource: model.options.dialogs.dialog1,
                card1Source: model.options.cards.card1,
                detailSource: model.options.details.detail1,
                grid1Option: model.options.grids.grid1,
                grid2Option: model.options.grids.grid2,
                grid3Option: model.options.grids.grid3,
                // goBillPanel: common.bill.goBillPanel,
                treeSetting: {
                    view: {
                        showLine: false,
                        multiSelect: true
                    },
                    callback: {
                        beforeClick: function (treeId, treeData) {
                            viewModel.treeId = treeData.id
                            $('.ui-search-btn>.ui-btn-primary').trigger('click');
                            if (!$('.ui-search-more').hasClass('expand')) {
                                $('.ui-search-more').trigger('click');
                            }
                            var refComp = $("#refContainerorganization_ocmId").data("uui.refer");
                            if(refComp && treeData) {
                                refComp.setValue([treeData]);
                            }
                            viewModel.searchcomp.viewModel.params.setValue("parent--id", treeData.id);
                            viewModel.search();
                            var listData = viewModel.simpleList.getSimpleData();
                            viewModel.simpleList.setSimpleData(listData, {
                                unSelect: true
                            });
                        },
                    }
                },
                enableFmt: ko.pureComputed(function () {
                    var status = viewModel.simpleList.ref("isEnable")();
                    var statusName
                    if (status == 0) {
                        (statusName = "未启用")
                    }
                    if (status == 1) {
                        (statusName = "已启用")
                    }
                    if (status == 2) {
                        (statusName = "已停用")
                    }
                    return statusName;
                }),
                billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT)
            },
            rendertype: u.extend(common.rendertype, {
                detailRender: function (obj) {
                    var viewModel = obj.gridObj.viewModel;
                    var dataTableRowId = obj.row.value["$_#_@_id"];
                    var detailfun = "data-bind=click:detail.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    obj.element.innerHTML =
                        '<a href="#" class="ui-a-detail" ' +
                        detailfun +
                        ">" +
                        obj.value +
                        "</a>";
                    ko.cleanNode(obj.element);
                    ko.applyBindings(viewModel, obj.element);
                },
                operation4single: function (obj) {
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
                    var positionGrid =
                        "data-bind=click:positionGrid.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        positionGrid +
                        ' title="定位">定位</a>' +
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
                beforeEditCheck: function (obj) {
                    var row = obj.rowObj.value;
                    var orgFuncId = row.orgFuncId;
                    viewModel.childList.setMeta("funcParentOrgId", "refparam",
                        '{"EQ_isEnable":"1","EQ_orgFuncRel":"' + orgFuncId + '"}')
                    return true
                },
            }),

            events: {
                //跳转单据页
                goBillPanel: function () {
                    // $(".ui-list-panel").hide();
                    $(".ui-treegrid-panel").hide();
                    $(".ui-panel").hide();
                    $(".ui-bill-panel").show();
                    $(".ui-bill-panel").animateCss("fadeIn");
                },
                //返回列表页
                retListPanel: function () {
                    // $(".ui-bill-panel").hide();
                    // $(".ui-bill-detail").hide();
                    $(".ui-panel").hide();
                    $(".ui-treegrid-panel").show();
                    $(".ui-list-panel").show();
                    $(".ui-list-panel").animateCss("fadeIn");
                },
                //跳转详情页
                goDetailPanel: function () {
                    // $(".ui-list-panel").hide();
                    $(".ui-treegrid-panel").hide();
                    $(".ui-panel").hide();
                    $(".ui-bill-detail").show();
                    $(".ui-bill-detail").animateCss("fadeIn");
                },
                //点击取消 单据页
                cancelHandle: function () {
                    viewModel.search();
                    viewModel.searchTree();
                    viewModel.retListPanel();
                },
                backPanel: function () {
                    common.dialog.confirmDialog({
                        msg1: "确认返回列表页？",
                        msg2: "此操作不可逆",
                        width: "400px",
                        type: "error",
                        onOk: function () {
                            $("#code-text").empty();
                            viewModel.search();
                            viewModel.searchTree();
                            viewModel.retListPanel();
                        }
                    });
                },

                //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
                beforeEdit: function (index, rowId) {
                    viewModel.goBillPanel();
                    $("#marketareaBase").show();
                    $("#marketareaBase_show").hide();
                    //设置tab显示基本信息
                    $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab")
                        .removeClass("is-active");
                    $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel")
                        .removeClass("is-active");

                    var title;
                    viewModel.index = index;
                    if (u.isNumber(index)) {
                        //修改操作
                        title = "编辑";
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                        var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();

                        $._ajax({
                            type: "get",
                            url: appCtx + viewModel.itemurl + "/find-by-orgid",
                            dataType: "json",
                            data: {
                                id: currentData.id
                            },
                            success: function (data) {
                                viewModel.childList.setSimpleData(data, {
                                    unSelect: true
                                });
                            }
                        });
                        viewModel.rowId = rowId;
                    } else {
                        title = "新增";
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                        var curRow = viewModel.simpleList.createEmptyRow();
                        // curRow.setSimpleData(copyRow.getSimpleData());
                        curRow.setSimpleData({ parentId: viewModel.treeId });
                        viewModel.simpleList.setRowFocus(curRow);
                        viewModel.childList.setSimpleData([]);
                    }
                },
                //子表增行
                addRow: function (dataTable) {
                    viewModel[dataTable].createEmptyRow();
                    viewModel.currentFlag = 0;
                },
                //子表 删除和批量删除
                delChild: function (dataTable) {
                    var rows = viewModel[dataTable].getSelectedRows();
                    if (rows.length == 0) {
                        toastr.warning("请至少选择一项");
                        return;
                    }
                    var childList = viewModel.childList.getSimpleData();
                    if (childList.length == 1) {
                        toastr.warning("职能关系不能为空");
                        return;
                    }
                    viewModel[dataTable].removeRows(rows);
                },
                validate: function (element) {
                    var result = viewModel.app.compsValidateMultiParam({
                        element: element,
                        showMsg: true
                    });
                    return result;
                },
                saveHandle: function () {
                    var baseInfo = $("#baseInfo")[0];
                    var basePass = viewModel.validate(baseInfo);
                    var baseItemInfo = $("#baseItemInfo")[0];
                    var baseItemPass = viewModel.validate(baseItemInfo);
                    if (basePass.passed) {
                        if ((basePass.passed == undefined || basePass.passed == true)
                            && baseItemPass.passed == undefined || baseItemPass.passed == true) {
                            viewModel.edit();
                        }
                    }
                },
                //将操作后的数据进行保存
                edit: function () {
                    var index = viewModel.index;
                    var currentRow, type = "post";
                    var postdata = viewModel.simpleList.getFocusRow().getSimpleData();
                    var childList = viewModel.childList.getSimpleData();
                    if (childList.length == 0) {
                        toastr.warning("职能关系为空，不能保存");
                        return;
                    }
                    for (var i = 0; i < childList.length - 1; i++) {
                        for (var j = i + 1; j < childList.length; j++) {
                            if (childList[i].orgFuncId == childList[j].orgFuncId && childList[i].persistStatus != "fdel" && childList[j].persistStatus != "fdel") {
                                toastr.warning("一个组织下不能添加两个相同的职能关系")
                                return;
                            }
                        }
                    }
                    postdata.orgFuncRels = childList;
                    if (index >= 0) {
                        type = "put";
                    } else {
                        postdata.persistStatus = "new"
                    }
                    //更改后台数据
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: type,
                        data: JSON.stringify(postdata),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            //如果index大于等于0说明是修改
                            if (index >= 0) {
                                //获取需要修改的行
                                currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
                                //将用户填写的数据更新到simpleList上
                            } else {
                                //添加数据
                                currentRow = viewModel.simpleList.createEmptyRow();
                            }
                            currentRow.setSimpleData(data);
                            viewModel.search();
                            viewModel.searchTree();
                            viewModel.retListPanel();
                            toastr.info("保存成功！");
                        }
                    });


                },
                //删除和批量删除
                del: function (data, rowId) {
                    if (typeof (data) == "number") {
                        viewModel.simpleList.setRowSelectbyRowId(rowId);
                    }
                    var ids = [];
                    var rows = viewModel.simpleList.getSelectedRows();
                    if (rows && rows.length > 0) {
                        for (var i = rows.length - 1; i >= 0; i--) {
                            if (rows[i].getValue("isEnable") == 0) {
                                ids.push(rows[i].getValue("id"));
                            } else {
                                rows.splice(i, 1);
                            }
                        }
                        common.dialog.confirmDialog({
                            msg1: "确认删除这些项？",
                            msg2: "此操作不可逆，仅可删除未启用数据",
                            width: "400px",
                            type: "error",
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
                                        viewModel.searchTree();
                                        if (rows.length == 0) {
                                            toastr.warning("勾选数据中不包含未启用状态数据，删除失败");
                                        } else {
                                            toastr.success("删除成功");
                                        }

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
                        viewModel.simpleList.pageIndex(0);
                    }
                    viewModel.simpleList.removeAllRows();
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    queryData.size = viewModel.simpleList.pageSize();
                    queryData.page = viewModel.simpleList.pageIndex();
                    $._ajax({
                        type: "get",
                        url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.simpleList.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.simpleList.totalRow(data.totalElements);
                            viewModel.simpleList.totalPages(data.totalPages);
                        }
                    });
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                searchTree: function () {
                    var queryData = {};
                    queryData.size = 10000;
                    queryData.page = 0;
                    $._ajax({
                        type: "get",
                        url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            var arr = data.content
                            var unableArr = []
                            //获取全部未启用节点id
                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i].isEnable != 1) {
                                    unableArr.push(arr[i].id);
                                }
                            }
                            for (var i = 0; i < arr.length; i++) {
                                for (var j = 0; j < unableArr.length; j++) {
                                    if (arr[i].parentId == unableArr[j]) {
                                        arr[i].parentId = null;
                                        break;
                                    }
                                }
                            }
                            viewModel.simpleListTree.setSimpleData(data.content, {
                                //unSelect: true
                                unSelect: false
                            });
                            viewModel.simpleListTree.totalRow(data.totalElements);
                            viewModel.simpleListTree.totalPages(data.totalPages);
                            viewModel.treeId = ""
                        }
                    });
                },
                //定位
                positionTree: function () {
                    var searchKey = $("#tree-searchKey")[0].value;
                    $(".seached").removeClass("seached");
                    if (searchKey !== "") {
                        console.log(searchKey);
                        // 定义过滤条件
                        var filter = function (node) {
                            return node.name.indexOf(searchKey) > -1;
                        }
                        // 过滤出节点
                        var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
                        // 查找第一个节点 展开父节点并添加样式
                        $("#tree1")[0]['u-meta'].tree.expandNode(nodes[0].getParentNode(), true, false, true);
                        $("#" + nodes[0].tId + "_span").addClass("seached")
                    }
                },
                positionGrid: function (index, rowId) {
                    var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                    var id = currentData.id;
                    $(".seached").removeClass("seached");
                    // 定义过滤条件
                    var filter = function (node) {
                        if (node.id) {
                            return node.id.indexOf(id) > -1;
                        }
                        return false;
                    }
                    // 过滤出节点
                    var nodes = $("#tree1")[0]['u-meta'].tree.getNodesByFilter(filter);
                    // 查找第一个节点 展开父节点并添加样式
                    if (nodes) {
                        $("#tree1")[0]['u-meta'].tree.expandNode(nodes[0].getParentNode(), true, false, true);
                        $("#" + nodes[0].tId + "_span").addClass("seached")
                    }
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
                        });
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
                                viewModel.searchTree();
                            }
                        });
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
                        });
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
                                viewModel.searchTree();
                            }
                        });
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                //值集启用
                enableVal: function () {
                    var selectedRows = viewModel.childList.getSelectedRows();
                    var ids = [];
                    var status = [];
                    var statustip = "";
                    if (selectedRows && selectedRows.length > 0) {
                        if (viewModel.billPanelStatus() == BILLPANELSTATUS.ADD) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isEnable", "1");
                            }
                            toastr.success("启用成功");
                            return;
                        }
                        var orgEnable = viewModel.simpleList.getValue("isEnable");
                        if (orgEnable == 2) {
                            toastr.warning("该组织为停用状态，不能启用某个职能");
                            return;
                        }
                        for (var i = 0; i < selectedRows.length; i++) {
                            ids.push(selectedRows[i].getValue("id"));
                            if (selectedRows[i].getValue("isEnable") == 1 || selectedRows[i].getValue("isEnable") == "1") {
                                status.push(selectedRows[i].getValue("code"));
                            }
                        }
                        ids = ids.join(",");
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.itemurl + "/batch-enable",
                            data: {
                                ids: ids
                            },
                            success: function (res) {
                                for (var i = 0; i < selectedRows.length; i++) {
                                    selectedRows[i].setValue("isEnable", "1");
                                }
                                toastr.success("启用成功");
                            }
                        });
                    } else {
                        toastr.warning("请先选择需要启用数据");
                    }
                },
                enableValSingle: function () {
                    var childs = viewModel.childList.getSelectedRows();
                    // var map = new Map();
                    // for(var i=0;i<childs.length;i++){
                    //     map.set(i+1,childs[i].id);
                    // }
                    
                },
                //值集停用
                disableVal: function () {
                    var selectedRows = viewModel.childList.getSelectedRows();
                    var ids = [];
                    var status = [];
                    var statustip = "";
                    if (selectedRows && selectedRows.length > 0) {
                        if (viewModel.billPanelStatus() == BILLPANELSTATUS.ADD) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isEnable", "2");
                            }
                            toastr.success("停用成功");
                            return;
                        }
                        for (var i = 0; i < selectedRows.length; i++) {
                            ids.push(selectedRows[i].getValue("id"));
                            if (selectedRows[i].getValue("isEnable") == 0 || selectedRows[i].getValue("isEnable") == "2") {
                                status.push(selectedRows[i].getValue("code"));
                            }
                        }
                        ids = ids.join(",");
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.itemurl + "/batch-disable",
                            data: {
                                ids: ids
                            },
                            success: function (res) {
                                for (var i = 0; i < selectedRows.length; i++) {
                                    selectedRows[i].setValue("isEnable", "2");
                                }
                                toastr.success("停用成功");
                            }
                        });
                    } else {
                        toastr.warning("请先选择需要停用数据");
                    }
                },
                detail: function (index, rowId) {
                    var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.itemurl + "/find-by-orgid",
                        dataType: "json",
                        data: {
                            id: currentData.id
                        },
                        success: function (data) {
                            viewModel.childList.setSimpleData(data);
                            //确保grid先将行设置为focus状态
                            setTimeout(function () {
                                viewModel.goDetailPanel();
                            }, 0);
                        }
                    });
                    // var data = viewModel.simpleList.getSimpleData()[index].orgFuncRels
                    // viewModel.childList.setSimpleData(data)
                    //确保grid先将行设置为focus状态
                    // setTimeout(function () {
                    //     viewModel.goDetailPanel();
                    // }, 0);
                },
                //导入
                importHandle: function () {
                    var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                    var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
                    var ele = $("#importFiel")[0]; //挂载元素
                    common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
                },
                //导出
                exportHandle: function () {
                    var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                    var templateUrl = viewModel.excelurl + "/downloadExcelTemplate"; //导出模板地址参数
                    var excelDataUrl = viewModel.excelurl + "/excelDataExport"; //导出数据地址参数
                    var listData = viewModel.simpleList; //需要导出表格的dataTable
                    var ele = $("#exportFiel")[0]; //挂载元素
                    common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
                }
            },
            afterCreate: function () {
                //从其他页面跳转情况
                var url = window.location.href;
                var params = common.getParameter(url);
                var id = params.id;
                if (id) {
                    var queryData = {}
                    queryData["search_EQ_id"] = id;
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.baseurl,
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.simpleList.setSimpleData(data.content);
                            // var row = viewModel.simpleList.createEmptyRow();
                            // row.setSimpleData(data.content[0]);
                            // viewModel.simpleList.setRowFocus(row)
                            $._ajax({
                                type: "get",
                                url: appCtx + viewModel.itemurl + "/find-by-orgid",
                                dataType: "json",
                                data: {
                                    id: id
                                },
                                success: function (data) {
                                    viewModel.childList.setSimpleData(data);
                                    //确保grid先将行设置为focus状态
                                    setTimeout(function () {
                                        viewModel.goDetailPanel();
                                    }, 0);
                                }
                            });
                        }
                    });
                }

                // viewModel.search();
                viewModel.searchTree();
                //基本信息   省、城市、区县、街道四级联动
                viewModel.simpleList.on("countryId.valuechange", function (obj) {
                    var provinceValue = {
                        "EQ_country.id": obj.newValue
                    };
                    $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
                    // viewModel.simpleList.meta.cityId.refparam = cityValue
                    viewModel.simpleList.setValue("provinceId", "");
                    viewModel.simpleList.setValue("provinceName", "");
                });


                //基本信息   省、城市、区县、街道四级联动
                viewModel.simpleList.on("provinceId.valuechange", function (obj) {
                    var cityValue = {
                        "EQ_parent.id": obj.newValue
                    };
                    $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
                    // viewModel.simpleList.meta.cityId.refparam = cityValue
                    var cityId = viewModel.app.getComp("cityIdBase");
                    viewModel.simpleList.setValue("cityId", "");
                    viewModel.simpleList.setValue("cityName", "");
                  
                });
                viewModel.simpleList.on("cityId.valuechange", function (obj) {
                    var countyValue = {
                        "EQ_parent.id": obj.newValue
                    };
                    $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
                    var countyId = viewModel.app.getComp("countyIdBase");
                    viewModel.simpleList.setValue("countyId", "");
                    viewModel.simpleList.setValue("countyName", "");
                });
                viewModel.simpleList.on("countyId.valuechange", function (obj) {
                    //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
                    //       a["EQ_parent.id"]=obj.newValue;
                    var townValue = {
                        "EQ_parent.id": obj.newValue
                    };
                    $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
                    var townId = viewModel.app.getComp("townIdBase");
                    viewModel.simpleList.setValue("townId", "");
                    viewModel.simpleList.setValue("townName", "");
                });

                viewModel.simpleList.on("organizationId.valuechange", function (obj) {
                    var townValue = {
                        "EQ_isEnable": "1", "EQ_dr": "0",
                        "EQ_personPosts.organization.id": obj.newValue
                    };
                    $("#principalIdinfo").attr("data-refparam", JSON.stringify(townValue));
                })

                //职能改变后清空上级职能组织
                viewModel.childList.on("orgFuncId.valuechange", function (obj) {
                    var grid = viewModel.app.getComp("grid_OrgFuncRel").grid;
                    if (obj.newValue != obj.oldValue) {
                        obj.rowObj.setValue("funcParentOrgId", "");
                        obj.rowObj.setValue("funcParentOrgName", "");
                        if (obj.rowObj.data.funcParentOrgId.meta != undefined) {
                            obj.rowObj.data.funcParentOrgId.meta.display = "";
                        }
                        grid.repaintGridDivs();
                    }
                });

                viewModel.childList.on("countryId.valuechange", function (obj) {
                    var countryId = obj.newValue;
                    viewModel.childList.meta.provinceId.refparam =
                        "{\"EQ_areaLevel\":\"1\",\"EQ_country.id\":\"" + countryId + "\" ,\"EQ_isEnable\":\"1\"}";
                    if (obj.newValue != obj.oldValue) {
                        viewModel.childList.setValue("provinceId", "");
                        viewModel.childList.setValue("provinceName", "");
                        viewModel.childList.setValue("cityId", "");
                        viewModel.childList.setValue("cityName", "");
                        viewModel.childList.setValue("countyId", "");
                        viewModel.childList.setValue("countyName", "");
                    }
                });

                //收货地址   省、城市、区县、街道四级联动
                viewModel.childList.on("provinceId.valuechange", function (obj) {
                    var provinceId = obj.newValue;
                    viewModel.childList.meta.cityId.refparam =
                        "{\"EQ_areaLevel\":\"2\",\"EQ_parent.id\":\"" + provinceId + "\" ,\"EQ_isEnable\":\"1\"  }";
                    if (obj.newValue != obj.oldValue) {
                        viewModel.childList.setValue("cityId", "");
                        viewModel.childList.setValue("cityName", "");
                        viewModel.childList.setValue("countyId", "");
                        viewModel.childList.setValue("countyName", "");
                    }
                });
                viewModel.childList.on("cityId.valuechange", function (obj) {
                    var cityId = obj.newValue;
                    viewModel.childList.meta.countyId.refparam =
                        "{\"EQ_areaLevel\":\"3\",\"EQ_parent.id\":\"" + cityId + "\" ,\"EQ_isEnable\":\"1\"}";
                    if (obj.newValue != obj.oldValue) {
                        viewModel.childList.setValue("countyId", "");
                        viewModel.childList.setValue("countyName", "");
                    }
                });
                // viewModel.childList.on("countyId.valuechange", function (obj) {
                //     var countyId = obj.newValue;
                //     viewModel.childList.meta.townId.refparam =
                //         "{\"EQ_areaLevel\":\"4\",\"EQ_parent.id\":\"" + countyId + "\"}";
                //     if (obj.newValue != obj.oldValue) {
                //         viewModel.childList.setValue("townId", "");
                //         viewModel.childList.setValue("townName", "");
                //     }
                // });
            }
        });
        return view;
    });
