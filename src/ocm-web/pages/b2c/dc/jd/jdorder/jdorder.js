define(['text!./jdorder.html', 'ocm_common', 'searchbox', 'editcard', 'billfooter', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard, billfooter) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch, singledoceidt, footer;
    var BILLPANELSTATUS = {
        ADD: "add",
        EDIT: "edit",
        COPY: "copy",
        DETAIL: "detail",
        DEFAULT: "default"
    }
    //基础数据
    baseData = {
        baseurl: '/dc/jd-orders',
        OrderList: new u.DataTable(Order),
        OrderListChilds: new u.DataTable(OrderChild),
        OrderChildConsignees: new u.DataTable(Consignees),
        OrderChildCoupons: new u.DataTable(Coupons),
        OrderChildGoodss: new u.DataTable(Goodss),
        catchOneList: new u.DataTable(catchOneMeta),
        listIndex: null,
        billPanelStatus: BILLPANELSTATUS.DEFAULT,
        issyncCombo: [{
            value: "0",
            name: "Y"
        }, {
            value: "1",
            name: "N"
        }],
        isexceptionCombo: [{
            value: "0",
            name: "Y"
        }, {
            value: "1",
            name: "N"
        }],
        enableCheckSrc: [{
            value: "1",
            name: "是"
        }],
        //TODO: 审核枚举值
        approveDataSrc: [{
            value: "1",
            name: "已审核"
        }, {
            value: "2",
            name: "未审核"
        }, {
            value: "3",
            name: "全部"
        }],
        //订单状态
        orderstateSrc: [{
            value: "WAIT_SELLER_STOCK_OUT",
            name: "等待出库"
        }, {
            value: "SEND_TO_DISTRIBUTION_CENER",
            name: "发往配送中心"
        }, {
            value: "DISTRIBUTION_CENTER_RECEIVED",
            name: "配送中心已收货"
        }, {
            value: "WAIT_GOODS_RECEIVE_CONFIRM",
            name: "等待确认收货"
        }, {
            value: "RECEIPTS_CONFIRM",
            name: "收款确认"
        }, {
            value: "WAIT_SELLER_DELIVERY",
            name: "等待发货"
        }, {
            value: "FINISHED_L",
            name: "完成"
        }, {
            value: "TRADE_CANCELED",
            name: "取消"
        }, {
            value: "LOCKED",
            name: "已锁定"
        }, ],

        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,
        approveFmt: ko.pureComputed(function() {
            var value = viewModel.OrderList.ref("approveStatus")();
            var name = "";
            switch (value) {
                case 1:
                    name = "已审核";
                    break;
                case 2:
                    name = "未审核";
                    break;
                default:
                    break;
            }
            return name;
        }),
    };
    //渲染类型
    rendertype = {
        operation: function(obj) {
            var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
            var editfun = "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + ")";
            obj.element.innerHTML = '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" class="" ' +
                editfun +
                ' title="编辑">编辑</a>' +
                '</span>    ' +
                //          '<span class="ui-handle-word">' +
                //          '<a href="#" class="" ' +
                //          delfun +
                //          ' title="删除">删除</a>' +
                //          '</span>'+
                '</div>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        enableStatusRender: function(obj) {
            var showValue = obj.value == "1" ? "启用" : "停用";
            obj.element.innerHTML = showValue;
        },
        detailRender: function(obj) { //link子页面
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value['$_#_@_id'];
            var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
            obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        approveRender: function(obj) {
            var showValue = "";
            switch (obj.value) {
                case "1":
                    showValue = "已审核";
                    break;
                case "2":
                    showValue = "未审核";
                    break;
                default:
                    break;
            }
            obj.element.innerHTML = showValue;
        }
    };
    //事件
    events = {
    	pushOrder: function() {
			var selectRowsArr = viewModel.OrderList.getSelectedRows();
			if (selectRowsArr.length < 1) {
				toastr.warning('请选择数据');
				return;
			}
			var ids = selectRowsArr.map(function(row, index, arr) {
					return row.getValue("id");
				});
			$._ajax({
				url: appCtx + viewModel.baseurl + "/push",
				type: "post",
				data: "ids=" + ids.join(","),
				success: function(data) {
					for (var i = 0; i < selectRowsArr.length; i++) {
						selectRowsArr[i].setValue("issync", "Y");
					}
				}
			});
		},
		//按单号抓单
			catchOne: function(data, rowId) {
				viewModel.clearItemsRef();
        var catchOneDialog = u.dialog({
					id: 'catchOneDialog',
					content: "#dialog_content_catchOneDialog",
					"width": "60%"
                });
        var okButton = $("#dialog_content_catchOneDialog .u-msg-ok");
				okButton.unbind("click").click(function() {
					var storecode = viewModel.catchOneList.getRow(0).getValue("storeCode");
					if (null == storecode || "" == storecode) {
						toastr.warning("店铺不能为空");
						return;
					}
					var tid = viewModel.catchOneList.getRow(0).getValue("tid");
					if(!tid){
						toastr.warning("单号不能为空");
						return;
					}
					$._ajax({
						url: appCtx + viewModel.baseurl + "/catchOne",
						type: "post",
						data: {
							shopcode: storecode,
							tid: tid
						},
						success: function(data) {
							toastr.warning("抓单成功");
						}
					});
				});
				var cancelButton = $("#dialog_content_catchOneDialog .u-msg-cancel");
				cancelButton.unbind("click").click(function() {
					catchOneDialog.close();
				});
			},
			clearItemsRef: function() {
				viewModel.catchOneList.setValue("storeRef", "");
				viewModel.catchOneList.setValue("storeCode", "");
				viewModel.catchOneList.setValue("tid", "");
				var refer = $("#refContainerstoreRef").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
        //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
        beforeEdit: function(index) {
            var title;
            viewModel.index = index;
            if (index >= 0) {
                //修改操作
                title = "编辑";
                var currentData = viewModel.OrderChildConsignees.getSimpleData()[index];
                singledoceidt.seteidtData(currentData);
            } else {
                title = "新增"
                //清空编辑框的信息
                singledoceidt.cleareidt();
            }
            //显示模态框
            singledoceidt.show(title, "900px", viewModel.edit);
        },
        //删除和批量删除
        del: function(data) {
            if (typeof(data) == 'number') {
                viewModel.OrderList.setRowSelect(data);
            }
            var ids = [];
            var rows = viewModel.OrderList.getSelectedRows();
            if (rows && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
            }
            common.dialog.confirmDialog({
                msg1: '确认删除这些项？',
                msg2: '此操作不可逆',
                width: '400px',
                type: 'error',
                onOk: function() {
                    $._ajax({
                        url: appCtx + viewModel.baseurl + "/delete",
                        type: "post",
                        // data: "ids=" + ids.join(","),
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(data) {
                            viewModel.OrderList.removeRows(rows);
                        }
                    });

                }
            });
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
            if (reindex) {
                viewModel.OrderList.pageIndex(0);
            }
            viewModel.OrderList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            var pageSize = viewModel.OrderList.pageSize();
            var pageNumber = viewModel.OrderList.pageIndex();
            queryData.size = pageSize;
            queryData.page = pageNumber;
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function(data) {
                    viewModel.OrderList.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.OrderList.totalRow(data.totalElements);
                    viewModel.OrderList.totalPages(data.totalPages);
                    viewModel.listIndex = null;
                }
            })
        },
        //清空搜索条件
        cleanSearch: function() {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
            viewModel.OrderList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
            viewModel.OrderList.pageSize(size);
            viewModel.search(true);
        },
        //进入新增单据页
        showAddBillPanel: function() {
            var curRow = viewModel.OrderList.createEmptyRow();
            viewModel.OrderList.setRowFocus(curRow);
            viewModel.goBillPanel();
            viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
            viewModel.OrderList.setRowFocus(index);
            var id = viewModel.OrderList.getValue("id");
            viewModel.OrderList.originEditData = viewModel.OrderList.getFocusRow().getSimpleData();
            //请求完整主子表信息
            viewModel.fillData(id);
            viewModel.goBillPanel();
            viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
        },
        //进入复制单据页
        showCopyBillPanel: function() {
            var selectedRows = viewModel.OrderList.getSelectedRows();
            var focusRow = viewModel.OrderList.getFocusRow();
            // 只支持单一复制，批量复制需单独处理
            if (selectedRows.length != 1) {
                //TODO: tips替换
                alert("请选择一条要复制的行")
                return;
            }
            var copyRow = selectedRows[0];
            var curRow = viewModel.OrderList.createEmptyRow();
            curRow.setSimpleData(copyRow.getSimpleData());
            viewModel.OrderList.setRowFocus(curRow);
            var id = copyRow.getValue("id");
            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow);
            viewModel.goBillPanel();
            viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
        },
        detail: function(obj, rowId) {
            //确保grid先将行设置为focus状态
            if (viewModel.listIndex == obj.rowIndex) {
                return true;
            } else {
                viewModel.listIndex = obj.rowIndex;
            }
            viewModel.OrderList.setRowSelect(obj.rowIndex);
            var id = obj.rowObj.value.id;
            viewModel.fillData(id);
        },
        // （编辑/详情）填充完整主子表数据
        fillData: function(id) {
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + "/detail",
                data: {
                    id: id
                },
                async: false,
                success: function(data) {
                    var promoactivity = data;

                    var Consignees = data.jdConsignees;
                    var Coupons = data.jdCoupons;
                    var Goodss = data.jdGoodss;

                    // var bussTypes = data.bussTypes;
                    // var officeItems = data.officeItems;

                    //  var row = viewModel.OrderList.getCurrentRow();
                    //  row.setSimpleData(promoactivity);

                    //当前data
                    viewModel.OrderListChilds.removeAllRows();
                    viewModel.OrderListChilds.setSimpleData(promoactivity, {
                        unSelect: true
                    });
                    //收货人
                    viewModel.OrderChildConsignees.removeAllRows();
                    viewModel.OrderChildConsignees.setSimpleData(Consignees, {
                        unSelect: true
                    });
                    //优惠券
                    viewModel.OrderChildCoupons.removeAllRows();
                    viewModel.OrderChildCoupons.setSimpleData(Coupons, {
                        unSelect: true
                    });
                    //商品
                    viewModel.OrderChildGoodss.removeAllRows();
                    viewModel.OrderChildGoodss.setSimpleData(Goodss, {
                        unSelect: true
                    });



                }
            })
        },
        // 清除基类属性
        clearBaseProp: function(row) {
            row.setValue("id", "");
            row.setValue("code", "");
            row.setValue("name", "");
            row.setValue("creator", "");
            row.setValue("creationTime", "");
            row.setValue("modifier", "");
            row.setValue("modifiedTime", "");
        },
        //保存单据
        saveBill: function() {
            var myData = viewModel.OrderList.getCurrentRow().getSimpleData();
            var Consignees = viewModel.OrderChildConsignees.getSimpleData();
            var Coupons = viewModel.OrderChildCoupons.getSimpleData();
            var Goodss = viewModel.OrderChildGoodss.getSimpleData();
            myData.jdConsignees = Consignees;
            myData.jdCoupons = Coupons;
            myData.jdGoodss = Goodss;
            var _ajaxType = viewModel.OrderList.getValue("id") ? "put" : "post";
            $._ajax({
                url: appCtx + viewModel.baseurl,
                type: _ajaxType,
                data: JSON.stringify(myData),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    viewModel.OrderList.getFocusRow().setSimpleData(data);
                    viewModel.retListPanel();
                }
            });
            /*
            common.dialog.confirmDialog({
                msg1: '确认保存？',
                msg2: '此操作不可逆',
                width: '400px',
                type: 'error',
                onOk: function() {
                    var myData = viewModel.OrderList.getCurrentRow().getSimpleData();
                    var Consignees = viewModel.OrderChildConsignees.getSimpleData();
                    var Coupons = viewModel.OrderChildCoupons.getSimpleData();
                    var Goodss = viewModel.OrderChildGoodss.getSimpleData();
                    myData.jdConsignees = Consignees;
                    myData.jdCoupons = Coupons;
                    myData.jdGoodss = Goodss;
                    var _ajaxType = viewModel.OrderList.getValue("id") ? "put" : "post";
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: _ajaxType,
                        data: JSON.stringify(myData),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            viewModel.OrderList.getFocusRow().setSimpleData(data);
                            viewModel.retListPanel();
                        }
                    });
                }
            });
            */
        },
        //取消单据
        cancelBill: function() {
            //清除子表数据
            viewModel.OrderChildConsignees.removeAllRows();
            viewModel.OrderChildCoupons.removeAllRows();
            viewModel.OrderChildGoodss.removeAllRows();
            var curRow = viewModel.OrderList.getCurrentRow();
            // 修改，则还原
            if (curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.OrderList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.OrderList.removeRow(curRow);
            }
            viewModel.retListPanel();
        },
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
            $("#PromoActivity-searchcontent")[0], [{
                    type: "daterange",
                    key: "orderstarttime",
                    label: "下单时间"
                }, {
                    type: "refer",
                    key: "shopsource--name",
                    label: "来源店铺",
                    refinfo: "b2cStoreRef"
                }, {
                    type: "text",
                    key: "orderid",
                    label: "京东订单id",
                },
                // {
                //   type:"refer",
                //   key:"activeNode--id",
                //   label:"节点",
                //   refinfo:"activenode"
                // },
                {
                    type: "text",
                    key: "venderid",
                    label: "商家id",
                }, {
                    type: "radio",
                    key: "issync",
                    label: "同步标识位",
                    dataSource: [{
                        value: 'Y',
                        name: '是'
                    }, {
                        value: 'N',
                        name: '否'
                    }]
                }, {
                    type: "radio",
                    key: "isexception",
                    label: "是否有异常",
                    dataSource: [{
                        value: 'Y',
                        name: '是'
                    }, {
                        value: 'N',
                        name: '否'
                    }]
                }
                //TODO: 日期范围匹配日期范围
                // {
                //   type: "daterange",
                //   label: "订货有效期",
                //   startkey: "orderStartDate",
                //   endkey: "orderEndDate",
                // },
                // {
                //   type: "daterange",
                //   label: "终端活动期间",
                //   startkey: "terminalStartDate",
                //   endkey: "terminalEndDate",
                // },
                // {
                //   type: "daterange",
                //   label: "报名有效期",
                //   startkey: "enrolStartDate",
                //   endkey: "enrolEndDate",
                // },
            ]);
        // footer = new billfooter($(".ui-bill-footer").get(), viewModel, "OrderList");
        // 列表查询数据(无查询条件)
        viewModel.search();
    }

    function afterRender() {
    	var productRef2Row = viewModel.catchOneList.createEmptyRow();
        // 初始化折叠面板
        $.fn.collapsepanel(false, true);
        //绑定输入框enter事件
        $('#PromoActivity-searchcontent input').off("keydown").on("keydown", function(e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        viewModel.catchOneList.on("storeRef.valuechange", function(obj) {
	      var row = viewModel.catchOneList.getRow(0);
	      var refValues = $("#refContainerstoreRef").data("uui.refer").values;
	      if (refValues && refValues.length > 0) {
	      	row.setValue("storeCode", refValues[0].refcode);
	      }
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