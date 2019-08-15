define(['text!./statementOfAccount.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function(tpl, common, searchbox) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch, orderListSearch, mergedResultSearch, platStoreDetailDialog, popupDialogActual;
    baseData = {
        //平台账单url
        platformBillUrl: '/stlb2c/platform-bill-sons',
        //订单列表url
        orderListurl: '/stlb2c/order-lists',        
        //核销结果url
        mergedResulturl: '/stlb2c/merged-results',
        //差异调整单url
        defferenceAdjustUrl: '/stlb2c/defference-adjusts',

        //平台账单数据对象
        platformBillData: new u.DataTable(PlatformBillSonMeta),
        //订单列表数据对象
        orderListData: new u.DataTable(OrderListMeta),
        //核销结果数据对象
        mergedResultData: new u.DataTable(MergedResultMeta),
        //差异调整单数据对象
        defferenceAdjustData: new u.DataTable(DefferenceAdjustMeta),

        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,

        billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,

        //对账状态枚举
        diffBillStatusSrc: [{
            value: "0",
            name: "未对帐"
          }, {
            value: "1",
            name: "对账中"
          }, {
            value: "2",
            name: "已对账"
          }],
        //单据类型枚举
        documentsTypeSrc: [{
            value: "platformBillSon",
            name: "平台账单"
          }, {
            value: "orderList",
            name: "订单列表"
          }, {
            value: "defferenceAdjust",
            name: "差异调整单"
          },{
            value: "0",
            name: "未对帐"
          }, {
            value: "1",
            name: "对账中"
          }, {
            value: "2",
            name: "已对账"
          }],          
          //异常标识枚举
          exceptionFlagSrc: [{
            value: "0",
            name: "否"
          }, {
            value: "1",
            name: "是"
          }],
    };
    rendertype = {
        //取消对账-每条数据后面
        cancelDiffMoney: function(obj) {
            var delfun = "data-bind=click:cancelDiff.bind($data," + obj.rowIndex + ")";
            obj.element.innerHTML = '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" class="" ' +
                delfun +
                ' title="取消核销">取消核销</a>' +
                '</span></div>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },         
        clearRender: function(obj) {
            var clearfun = "data-bind=click:clear.bind($data," + obj.rowIndex + ")";
            obj.element.innerHTML = '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" class="" ' +
                clearfun +
                ' title="清空">清空</a>' +
                '</span></div>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        }
    };
    events = {
        //取消对账和批量取消对账
        cancelDiff: function() {            
            var ids = [];
            var rows = viewModel.mergedResultData.getSelectedRows();
            if (rows && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
            } else {
                toastr.warning('请选择数据');
                return;
            }
            if (rows && rows.length > 0) {
                common.dialog.confirmDialog({
                    msg1: '确认取消核销？',
                    msg2: '此操作不可逆',
                    width: '400px',
                    type: 'error',
                    onOk: function() {
                        $._ajax({
                            url: appCtx + viewModel.mergedResulturl + "/cancleDiffMoney",
                            type: "post",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function(data) {
                                // viewModel.platformBillSonData.removeRows(rows);
                                if(data==true){
                                    toastr.success("取消对账成功");
                                }else{
                                    toastr.error("取消对账失败");
                                }
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
        //手动对账
        personDiffMoney: function(){
            //获取到平台账单选中的数据
            var platformBillRows = viewModel.platformBillData.getSelectedRows();
            //获取到订单列表选中的数据
            var orderListRows = viewModel.orderListData.getSelectedRows();
            //获取到差异调整单选中的数据
            var defferenceAdjustRows = viewModel.defferenceAdjustData.getSelectedRows();

            var orderListIds = [];
            var platformBillIds = [];
            var defferenceAdjustIds = [];

            if(orderListRows.length==0 && platformBillRows.length==0 && defferenceAdjustRows.length==0){
                toastr.error("请选择对账数据");
                return;
            }

            //把订单列表数据ID放到orderListIds
            for(var i=0; i<orderListRows.length; i++){
                orderListIds.push(orderListRows[i].getValue("id"));
            }
            orderListIds = orderListIds.join(",");

            //把平台账单数据ID放到platformBillIds
            for(var i=0; i<platformBillRows.length; i++){
                platformBillIds.push(platformBillRows[i].getValue("id"));
            }
            platformBillIds = platformBillIds.join(",");

            //把差异调整单数据ID放到defferenceAdjustIds
            for(var i=0; i<defferenceAdjustRows.length; i++){
                defferenceAdjustIds.push(defferenceAdjustRows[i].getValue("id"));
            }
            defferenceAdjustIds = defferenceAdjustIds.join(",");

            $._ajax({
                type: "post",
                url: appCtx + viewModel.mergedResulturl + "/personDiffMoney",
                data: {
                    orderListIds: orderListIds,
                    platformBillIds: platformBillIds,
                    defferenceAdjustIds: defferenceAdjustIds
                },
                success: function(data){
                    if(data==true){
                        toastr.success("手动对账完成");
                    }else{
                        toastr.error("手动对账失败");
                    }
                    viewModel.search();
                }
            })
        },
        //自动对账
        autoDiffMoney: function() {
            $._ajax({
                type: "get",
                url: appCtx + viewModel.mergedResulturl + '/automaticDiffMoney',
                data: {
                },
                success: function(data) {
                    if(data == true){
                        toastr.success('自动对账完成');
                    }else{
                        toastr.error("自动对账失败");
                    }
                    viewModel.search();
                }
            });
        },         

        //获取“差异调整单”数据
        getDefferenceAdjust: function () {
            //获取平台账单数据
            var platformBillSonRows = viewModel.platformBillData.getSelectedRows();
            //获取订单列表数据
            var orderListRows = viewModel.orderListData.getSelectedRows();
            
            if (platformBillSonRows.length<1 && orderListRows.length<1) {
                toastr.warning("请选择数据");
                return;
            } 

            var ids = [];

            for(var i=0; i<platformBillSonRows.length; i++){
                ids.push(platformBillSonRows[i].getValue("platformNumber"));
            }

            for(var i=0; i<orderListRows.length; i++){
                ids.push(orderListRows[i].getValue("platformNumber"));
            }
            ids = ids.join(",");
            
            $._ajax({
                type: "post",
                url: appCtx + viewModel.mergedResulturl + "/findDefferenceAdjust",
                data: {
                    ids: ids
                },
                success: function(data){
                    viewModel.defferenceAdjustData.setSimpleData(data, {
                        unSelect: true
                    });
                    viewModel.defferenceAdjustData.totalRow(data.totalElements);
                    viewModel.defferenceAdjustData.totalPages(data.totalPages);
                }
            });

            // var id = selectedRows[0].getValue("id"); //获取当前标准方案id
            var emptyRow = viewModel.defferenceAdjustData.createEmptyRow({ unSelect: true });
            // viewModel.mainDataActual.setRowFocus(emptyRow);

            popupDialogActual = u.dialog({
                id: 'listDataActualEdit',
                content: "#dialog_layer-popup-actual",
                "width": "1200px"
            });
            // 确认按钮
            var okButton = $("#dialog_layer-popup-actual .u-msg-ok");
            okButton.unbind("click").click(function () {
                popupDialogActual.close();
            });
            // 取消按钮
            var cancelButton = $("#dialog_layer-popup-actual .u-msg-cancel");
            cancelButton.unbind("click").click(function () {
                viewModel.defferenceAdjustData.removeAllRows();
                popupDialogActual.close();
            });
            // 关闭按钮
            var closeButton = $("#listDataActualEdit .u-msg-close span");
            closeButton.unbind("click").click(function () {
                // viewModel.defferenceAdjustData.removeRow(emptyRow);
            });
        },        
        // 清除基类属性
        clearBaseProp: function(curRow) {
            curRow.setValue("id", null);
            curRow.setValue("creator", "");
            curRow.setValue("creationTime", "");
            curRow.setValue("modifier", "");
            curRow.setValue("modifiedTime", "");
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
            if (reindex) {
                viewModel.platformBillData.pageIndex(0);
                viewModel.orderListData.pageIndex(0);
            }
            viewModel.platformBillData.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            queryData.size = viewModel.platformBillData.pageSize();
            queryData.page = viewModel.platformBillData.pageIndex();
            $.ajax({
                type: "get",
                url: appCtx + viewModel.platformBillUrl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.platformBillData.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.platformBillData.totalRow(data.totalElements);
                    viewModel.platformBillData.totalPages(data.totalPages);
                }
            })

            //订单列表搜索方法
            viewModel.orderListData.removeAllRows();
            var queryData = orderListSearch.getDataWithOpr();
            queryData.size = viewModel.orderListData.pageSize();
            queryData.page = viewModel.orderListData.pageIndex();
            $.ajax({
                type: "get",
                url: appCtx + viewModel.orderListurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.orderListData.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.orderListData.totalRow(data.totalElements);
                    viewModel.orderListData.totalPages(data.totalPages);
                }
			})

        },
        //订单列表，单独搜索方法，页码改变的时候会用到
        searchChild: function(reindex) {
            if (reindex) {
                viewModel.orderListData.pageIndex(0);
            }
            viewModel.orderListData.removeAllRows();
            var queryData = orderListSearch.getDataWithOpr();
            queryData.size = viewModel.orderListData.pageSize();
            queryData.page = viewModel.orderListData.pageIndex();
            $.ajax({
                type: "get",
                url: appCtx + viewModel.orderListurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.orderListData.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.orderListData.totalRow(data.totalElements);
                    viewModel.orderListData.totalPages(data.totalPages);
                }
			})
        },		
        //核销结果，查询方法
        searchMergedResult: function(reindex) {
            if (reindex) {
                viewModel.mergedResultData.pageIndex(0);
            }
            viewModel.mergedResultData.removeAllRows();
            var queryData = mergedResultSearch.getDataWithOpr();
            queryData.size = viewModel.mergedResultData.pageSize();
            queryData.page = viewModel.mergedResultData.pageIndex();
            $.ajax({
                type: "get",
                url: appCtx + viewModel.mergedResulturl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.mergedResultData.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.mergedResultData.totalRow(data.totalElements);
                    viewModel.mergedResultData.totalPages(data.totalPages);
                }
			})
        },     
        //差异调整单，查询方法   
        searchDefferenceAdjust: function(reindex) {
            if (reindex) {
                viewModel.defferenceAdjustData.pageIndex(0);
            }
            viewModel.defferenceAdjustData.removeAllRows();
            // var queryData = singledocSearch.getDataWithOpr();
            queryData.size = viewModel.defferenceAdjustData.pageSize();
            queryData.page = viewModel.defferenceAdjustData.pageIndex();
            $.ajax({
                type: "get",
                url: appCtx + viewModel.defferenceAdjustUrl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.defferenceAdjustData.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.defferenceAdjustData.totalRow(data.totalElements);
                    viewModel.defferenceAdjustData.totalPages(data.totalPages);
                }
			})
        },         
        //选中当前记录
        referSelectItemHandle: function(obj){
         //alert(obj.rowObj.value.totalDiffBillAmount);
         var selectedRows = viewModel.platformBillData.getSelectedRows();
         //alert(selectedRows.length);
         
        },
        //取消选中当前行
        referUnSelectItemHandle: function(obj){
            //alert(obj.rowObj.value.id);
        },  
        //清空搜索条件
        cleanSearch: function() {
            singledocSearch.clearSearch();
            orderListSearch.clearSearch();
        },
        //清空搜索条件-核销结果
        cleanMergedResultSearch: function() {
            mergedResultSearch.clearSearch();
        },        
        //页码改变时的回调函数
        pageChange: function(index) {
            viewModel.platformBillData.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
            viewModel.platformBillData.pageSize(size);
            viewModel.search(true);
        },
        //页码改变时的回调函数-子表
        pageChangeChild: function(index) {
            viewModel.orderListData.pageIndex(index);
            viewModel.searchChild();
        },
        //页码改变时的回调函数-子表
        sizeChangeChild: function(size) {
            viewModel.orderListData.pageSize(size);
            viewModel.searchChild(true);
        },
        //页码改变时的回调函数-核销结果
        pageChangeMergedResult: function(index) {
            viewModel.mergedResultData.pageIndex(index);
            viewModel.searchMergedResult();
        },
        //页码改变时的回调函数-核销结果
        sizeChangeMergedResult: function(size) {
            viewModel.mergedResultData.pageSize(size);
            viewModel.searchMergedResult(true);
        }                
    }
    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

    function appInit(element, params) {
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        // 查询组件初始化-平台账单
        singledocSearch = new searchbox(
            $("#platformBill-searchcontent")[0], [{
                type: "daterange",
                key: "revenueExpenditureTime",
                label: "平台账单开始日期~结束日期"
            }, {
                type: "refer",
                key: "platform",
                label: "平台账单平台名称",
                refinfo: "b2cplatform"
            },
            {
                type: "refer",
                key: "store",
                label: "平台账单店铺名称",
                refinfo: "b2cStoreRef"
            }, {
                type: "combo",
                key: "accountMark",
                label: "平台账单对账状态",
                dataSource: viewModel.diffBillStatusSrc
            }, {
                type: "combo",
                key: "exceptionalMark",
                label: "平台账单异常标识",
                dataSource: viewModel.exceptionFlagSrc
            }, {
                type: "text",
                key: "platformNumber",
                label: "平台账单平台单号"
            }, {
                type: "text",
                key: "businessRunningNumber",
                label: "平台账单业务流水号"
            }
            ]);
        // 查询组件初始化-订单列表
        orderListSearch = new searchbox(
            $("#orderList-searchcontent")[0], [{
                type: "refer",
                key: "platform",
                label: "订单列表平台名称",
                refinfo: "b2cplatform"
            },
            {
                type: "refer",
                key: "store",
                label: "订单列表店铺名称",
                refinfo: "b2cStoreRef"
            }, {
                type: "combo",
                key: "diffBillStatus",
                label: "订单列表对账状态",
                dataSource: viewModel.diffBillStatusSrc
            }, {
                type: "combo",
                key: "exceptionFlag",
                label: "订单列表异常标识",
                dataSource: viewModel.exceptionFlagSrc
            }, {
                type: "text",
                key: "platformNumber",
                label: "订单列表平台单号"
            }, {
                type: "text",
                key: "commerceNumber",
                label: "订单列表电商单号"
            }, {
                type: "daterange",
                key: "orderTime",
                label: "订单列表下单开始时间-结束时间"
            }, {
                type: "daterange",
                key: "paymentTime",
                label: "订单列表付款开始时间-结束时间"
            }
            ]);            
            mergedResultSearch = new searchbox(
            $("#mergedResul-searchcontent")[0], [{
                type: "refer",
                key: "platform",
                label: "平台名称",
                refinfo: "b2cplatform"
            },
            {
                type: "refer",
                key: "store",
                label: "店铺名称",
                refinfo: "b2cStoreRef"
            }, {
                type: "combo",
                key: "diffMoneyStatus",
                label: "对账状态",
                dataSource: viewModel.diffBillStatusSrc
            }, {
                type: "daterange",
                key: "verifyTime",
                label: "勾兑时间"
            }, {
                type: "text",
                key: "platformNumber",
                label: "平台单号"
            }]);       
        // 列表查询数据(无查询条件)
		viewModel.search();
    }

    function afterRender() {
        //绑定输入框enter事件
        $('#platformBill-searchcontent input').off("keydown").on("keydown", function(e) {
            if (e.keyCode == 13) {
                $(this).blur();
				viewModel.search();
            }
        });
    }

    function init(element, params) {
        appInit(element, params);
        // afterRender();
        window.vm = viewModel;
    }

    return {
        init: init
    }
});