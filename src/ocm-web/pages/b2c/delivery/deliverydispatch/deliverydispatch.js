define(['text!./deliverydispatch.html', 'ocm_common', 'searchbox', 'editcard', 'billfooter', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard, billfooter) {
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
		baseurl: '/b2c/dispathcnotes',
		OrderList: new u.DataTable(Order),
		receiverList: new u.DataTable(receiver),
		OrderLogs: new u.DataTable(OrderLogs),
		OrderProducts: new u.DataTable(OrderProducts),
		BussTypeItems: new u.DataTable(BussType),
		BussTypeRef: new u.DataTable(BussTypeRef),
		AgencyItems: new u.DataTable(Agency),
		AgencyRef: new u.DataTable(AgencyRef),
		//买家留言
		commentList1: new u.DataTable(remarkMeta),
		//卖家留言
		commentList2: new u.DataTable(remarkMeta),
		//订单备注
		commentList3: new u.DataTable(remarkMeta),
		billPanelStatus: BILLPANELSTATUS.DEFAULT,
		enableCheckSrc: [{
			value: "1",
			name: "是"
		}],
		//TODO: 审核枚举值
		"dispatchTypes": [{
			value: "1",
			name: "电商配送"
		}, {
			value: "2",
			name: "退货配送"
		}],
		"dispatchStatus": [{
				"value": "1",
				"name": "未配送"
			},
			// {
			// 	"value": "2",
			// 	"name": "配送中"
			// }, {
			// 	"value": "3",
			// 	"name": "已完工"
			// }, 
			{
				"value": "4",
				"name": "已完成"
			},
			// {
			// 	"value": "5",
			// 	"name": "已结算"
			// }, {
			// 	"value": "0",
			// 	"name": "已关闭"
			// }
		],
		"frozenFlags": [{
			"value": "1",
			"name": "是"
		}, {
			"value": "0",
			"name": "否"
		}],
		"deliveryModes": [{
			"value": "0",
			"name": "送装"
		}, {
			"value": "1",
			"name": "自提"
		}],
		serviceModeSrc: [], //任务类型是电商配送的配送方式
		serviceModeReturnSrc: [], //任务类型是退货配送的配送方式
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
			var editfun = "data-bind=click:showAttachFiles.bind($data," + obj.rowIndex + ")";

			var optStr = '<div class="ui-handle-icon">' +
				'<span class="ui-handle-word">' +
				'<a href="#" ' + editfun + ' title="附件">附件</a>' +
				'</span>' + '<span class="ui-handle-word">';

			if (obj.billStatus != '0') {
				var delfun = "data-bind=click:complete.bind($data," + obj.rowIndex + ")";
				optStr += '<a href="#" ' +
					delfun +
					' title="确认完成">确认完成</a>' +
					'</span></div>';
			}

			obj.element.innerHTML = optStr;
			ko.cleanNode(obj.element);
			ko.applyBindings(viewModel, obj.element);
		},
		enableStatusRender: function(obj) {
			var showValue; // = obj.value == "1" ? "启用" : "停用";
			switch (obj.value) {
				case "1":
					showValue = "启用";
					break;
				case "2":
					showValue = "停用";
					break;
				default:
					showValue = "未启用";
			}
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
		},
		//是否发货
		isSend: function() {
			var statusValue = viewModel.OrderList.getValue('sendStatus');
			var showName;
			switch (statusValue) {
				case "0":
					showName = '未发货';
					break;
				case "1":
					showName = '全部发货';
					break;
				case "2":
					showName = '部分发货';
					break;
				default:
					showName = '';
			}
			return showName;
		}
	};
	//事件
	events = {
		//弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
		showAttachFiles: function(index) {
			var title;
			viewModel.index = index;
			if (index >= 0) {
				//修改操作
				title = "编辑";
				var currentData = viewModel.OrderList.getSimpleData()[index];
				singledoceidt.seteidtData(currentData);
			} else {
				title = "新增"
				//清空编辑框的信息
				singledoceidt.cleareidt();
			}
			//显示模态框
			singledoceidt.show(title, "500px", viewModel.edit);
		},
		//完成确认
		complete: function(data) {
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
				msg1: '确认完成？',
				msg2: '完成后不可再操作',
				width: '400px',
				type: 'warn',
				onOk: function() {
					$._ajax({
						url: appCtx + viewModel.baseurl + "/complete",
						type: "post",
						// data: "ids=" + ids.join(","),
						data: {
							id: ids.join(",")
						},
						success: function(data) {
							for (var i = 0; i < rows.length; i++) {
								rows[i].setValue("billStatus", "4");
							}
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
			viewModel.receiverList.removeAllRows();
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
					var cons = data.content;
					for (var i = 0, len = cons.length; i < len; i++) {
						var newRow = viewModel.receiverList.createEmptyRow();
						newRow.setSimpleData(cons[i].receiver);
					}
					viewModel.OrderList.totalRow(data.totalElements);
					viewModel.OrderList.totalPages(data.totalPages);
				}
			});
			viewModel.OrderList.removeAllRows();
			viewModel.OrderProducts.removeAllRows();
			viewModel.commentList1.removeAllRows();
			viewModel.commentList2.removeAllRows();
			viewModel.commentList3.removeAllRows();
			viewModel.OrderLogs.removeAllRows();
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
			viewModel.AgencyItems.removeAllRows();
			viewModel.BussTypeItems.removeAllRows();
			curRow.setValue("enableStatus", "1");
			curRow.setValue("approveStatus", "2");
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
		detail: function(index, rowId) {
			//确保grid先将行设置为focus状态
			setTimeout(function() {
				viewModel.OrderList.setRowSelectbyRowId(rowId);
				var curRow = viewModel.OrderList.getCurrentRow();
				var index = viewModel.OrderList.getCurrentIndex();
				var receivers = viewModel.receiverList.getRow(index);
				// var addrsData = curRow.getValue('receiver');
				var addrs = receivers.getSimpleData();
				// var datas = curRow.getSimpleData();
				curRow.setValue('receiverProvinceName', addrs.receiverProvinceName);
				curRow.setValue('receiverCityName', addrs.receiverCityName)
				curRow.setValue('receiverDistrictName', addrs.receiverDistrictName)
				curRow.setValue('receiverTownName', addrs.receiverTownName)
				//请求完整主子表信息
				var id = curRow.getValue("id");
				viewModel.fillData(id);
				viewModel.goDetailPanel();
			}, 0);
		},
		// （编辑/详情）填充完整主子表数据
		fillData: function(id) {
			$._ajax({
				type: "post",
				url: appCtx + viewModel.baseurl + "/detail",
				data: {
					id: id
				},
				async: false,
				success: function(data) {
					var products = data.products;
					var optLogs = data.optLogs;

					// 操作日志
					viewModel.OrderLogs.removeAllRows();
					viewModel.OrderLogs.setSimpleData(optLogs, {
						unSelect: true
					});

					//商品行
					viewModel.OrderProducts.removeAllRows();
					viewModel.OrderProducts.setSimpleData(products, {
						unSelect: true
					});

					//备注信息处理
					var commentList = data.commentList;
					var commentList1 = [];
					var commentList2 = [];
					var commentList3 = [];
					for (var i = 0; i < commentList.length; i++) {
						if (commentList[i].commentCategory == 0) {
							commentList1.push(commentList[i]);
						} else if (commentList[i].commentCategory == 1) {
							commentList2.push(commentList[i]);
						} else if (commentList[i].commentCategory == 2) {
							commentList3.push(commentList[i]);
						}
					}
					viewModel.commentList1.setSimpleData(commentList1, {
						unSelect: true
					});
					viewModel.commentList2.setSimpleData(commentList2, {
						unSelect: true
					});
					viewModel.commentList3.setSimpleData(commentList3, {
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
			common.dialog.confirmDialog({
				msg1: '确认保存？',
				msg2: '此操作不可逆',
				width: '400px',
				type: 'error',
				onOk: function() {
					var myData = viewModel.OrderList.getCurrentRow().getSimpleData();
					var Goodss = viewModel.OrderChildGoodss.getSimpleData();
					myData.suningorderdetail = Goodss;

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
					})
				}
			});

		},
		//取消单据
		cancelBill: function() {
			//清除子表数据
			viewModel.BussTypeItems.removeAllRows();
			viewModel.AgencyItems.removeAllRows();
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
		//弹出业务类型参照
		showBussRef: function() {
			viewModel.clearBussRef();
			$("#bussRefer").find(".refer").trigger("click");
		},
		//删除已参照的业务类型
		delBussItems: function() {
			var selectedRows = viewModel.BussTypeItems.getSelectedRows();
			selectedRows.forEach(function(row, index, arr) {
				row.setValue("dr", "1");
			});
			if (selectedRows && selectedRows.length > 0) {
				viewModel.BussTypeItems.removeRows(selectedRows);
			}
		},
		//清空已选业务类型参照
		clearBussRef: function() {
			viewModel.BussTypeRef.setValue("bussRefer", "");
			var refer = $("#refContainerbussRefer").data("uui.refer");
			refer.uncheckAll();
			refer.setValue([]);
		},
		//弹出办事处参照
		showAgencyRef: function() {
			viewModel.clearAgencyRef();
			$("#agencyRefer").find(".refer").trigger("click");
		},
		//删除已参照的办事处
		delAgencyItems: function() {
			var selectedRows = viewModel.AgencyItems.getSelectedRows();
			selectedRows.forEach(function(row, index, arr) {
				row.setValue("dr", "1");
			});
			if (selectedRows && selectedRows.length > 0) {
				viewModel.AgencyItems.removeRows(selectedRows);
			}
		},
		//清空已选办事处参照
		clearAgencyRef: function() {
			viewModel.AgencyRef.setValue("agencyRefer", "");
			var refer = $("#refContaineragencyRefer").data("uui.refer");
			refer.uncheckAll();
			refer.setValue([]);
		},

	}

	viewModel = u.extend({}, baseData, events, rendertype);

	function appInit(element, params) {
		//将模板页渲染到页面上
		element.innerHTML = tpl;
		//配送方式枚举
		$._ajax({
			type: "get",
			url: appCtx + "/b2c/enum-service/data",
			async: false,
			data: {
				enumClassName: "com.yonyou.ocm.b2c.enums.DeliveryModeEnum"
			},
			success: function(data) {
				var newarray = common.dataconvert.toMap(data, "name", "code");
				viewModel.serviceModeSrc = newarray;
			}
		});
		$._ajax({
			type: "get",
			url: appCtx + "/b2c/enum-service/data",
			async: false,
			data: {
				enumClassName: "com.yonyou.ocm.b2c.enums.DeliveryModeReturnEnum"
			},
			success: function(data) {
				var newarray = common.dataconvert.toMap(data, "name", "code");
				viewModel.serviceModeReturnSrc = newarray;
			}
		});

		//将viewModel和页面上的元素绑定并初始化u-meta声明的组件
		app = u.createApp({
			el: element,
			model: viewModel
		});
		// 查询组件初始化
		singledocSearch = new searchbox(
			$("#PromoActivity-searchcontent")[0], [{
				type: "combo",
				key: "dispatchType",
				label: "任务类型",
				dataSource: viewModel.dispatchTypes
			}, {
				type: "combo",
				key: "billStatus",
				label: "任务状态",
				dataSource: viewModel.dispatchStatus
			}, {
				type: "text",
				key: "code",
				label: "任务单号",
			}, {
				type: "text",
				key: "buyer",
				label: "顾客ID",
			}, {
				type: "text",
				key: "receiver--receiver",
				label: "顾客姓名",
			}, {
				type: "text",
				key: "receiver--receiverPhone",
				label: "顾客联系方式",
			}, {
				type: "text",
				key: "syscode",
				label: "电商单号",
			}, {
				type: "refer",
				key: "platform--id",
				label: "平台名称",
				refinfo: "b2cplatform",
				refName: "所属平台"
			}, {
				type: "text",
				key: "store--name",
				label: "店铺名称",
			}, {
				type: "combo",
				key: "serviceMode",
				label: "配送方式",
				dataSource: viewModel.serviceModeSrc
			}, ]);

		// 附件窗口
		singledoceidt = new editcard(
			$("#dialog_layer")[0], [], Order);

		// footer = new billfooter($(".ui-bill-footer").get(), viewModel, "OrderList");
		// 列表查询数据(无查询条件)
		viewModel.search();
	}

	function afterRender() {
		// 初始化折叠面板
		$.fn.collapsepanel(false, true);
		//绑定输入框enter事件
		$('#PromoActivity-searchcontent input').off("keydown").on("keydown", function(e) {
			if (e.keyCode == 13) {
				$(this).blur();
				viewModel.search();
			}
		});
		// 监听业务类型参照选择
		viewModel.BussTypeRef.on("bussRefer.valuechange", function(obj) {
			if (!obj.newValue) {
				return;
			}
			var refer = $("#refContainerbussRefer").data("uui.refer");
			if (refer && refer.values.length > 0) {
				for (var i = 0; i < refer.values.length; i++) {
					var refpk = refer.values[i].refpk;
					var row = viewModel.BussTypeItems.getRowByField("bussiTypeId", refpk);
					var newrow;
					if (!row || row.status === u.Row.STATUS.FALSE_DELETE) {
						newrow = viewModel.BussTypeItems.createEmptyRow({
							unSelect: true
						});
						newrow.setValue("bussiTypeCode", refer.values[i].refcode);
						newrow.setValue("bussiTypeName", refer.values[i].refname);
						//如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
						newrow.setValue("bussiTypeId", refpk);
					}
				}
			}
		});
		// 监听办事处分区参照选择
		viewModel.AgencyRef.on("agencyRefer.valuechange", function(obj) {
			if (!obj.newValue) {
				return;
			}
			var refer = $("#refContaineragencyRefer").data("uui.refer");
			if (refer && refer.values.length > 0) {
				for (var i = 0; i < refer.values.length; i++) {
					var refpk = refer.values[i].refpk;
					var row = viewModel.AgencyItems.getRowByField("officeId", refpk);
					if (!row || row.status === u.Row.STATUS.FALSE_DELETE) {
						var newrow = viewModel.AgencyItems.createEmptyRow({
							unSelect: true
						});
						newrow.setValue("officeCode", refer.values[i].refcode);
						newrow.setValue("officeName", refer.values[i].refname);
						//如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
						newrow.setValue("officeId", refpk);
					}
				}
			}
		})
	}

	function init(element, params) {
		appInit(element, params);
		afterRender();
		var bussrefrow = viewModel.BussTypeRef.createEmptyRow();
		viewModel.BussTypeRef.setRowFocus(bussrefrow);
		var agencyrefrow = viewModel.AgencyRef.createEmptyRow();
		viewModel.AgencyRef.setRowFocus(agencyrefrow);
		window.vm = viewModel;
	}

	return {
		init: init
	}
});