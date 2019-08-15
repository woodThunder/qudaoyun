define(['text!./delivery.html', 'ocm_common', 'ocm_baseview', './meta.js', 'ocm_ordertrack'], function(tpl, common, baseview, model, ordertrack) {
	'use strict'
	var viewModel, appCtx = "/occ-b2c",
		productDialog;
	var BILLPANELSTATUS = {
		ADD: "add",
		EDIT: "edit",
		COPY: "copy",
		DETAIL: "detail",
		DEFAULT: "default"
	}
	var view = baseview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/b2c/deliverys/bl',
			OrderList: new u.DataTable(model.options.metas.Order),
			OrderLogs: new u.DataTable(model.options.metas.OrderLogs),
			OrderProducts: new u.DataTable(model.options.metas.OrderProducts),
			BussTypeItems: new u.DataTable(model.options.metas.BussType),
			BussTypeRef: new u.DataTable(model.options.metas.BussTypeRef),
			AgencyItems: new u.DataTable(model.options.metas.Agency),

			searchcomp: {},
			searchSource: model.options.searchs.search1,
			// dialogcardcomp: {},
			// dialogcardSource: model.options.dialogs.dialog1,
			button1Source: model.options.buttons.button1,
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			AgencyRef: new u.DataTable(model.options.metas.AgencyRef),
			//买家留言
			commentList1: new u.DataTable(model.options.metas.remarkMeta),
			//卖家留言
			commentList2: new u.DataTable(model.options.metas.remarkMeta),
			//订单备注
			commentList3: new u.DataTable(model.options.metas.remarkMeta),
			remarkserviceData: new u.DataTable(model.options.metas.remarkMeta),
			billPanelStatus: BILLPANELSTATUS.DEFAULT,
			//发货状态
			sendStatusSrc: [],
			logisticsModeSrc: [],
			enableCheckSrc: [{
				value: "1",
				name: "是"
			}],
			//异常状态
			exceptionStatusSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//冻结状态
			lockStatusSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//是否拆单发货
			splitDispatchSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			isGiftSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//是否加急
			urgentSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
			//是否退货
			returnSrc: [{
				value: "0",
				name: "否"
			}, {
				value: "1",
				name: "是"
			}, ],
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
			}, {
				"value": "2",
				"name": "配送中"
			}, {
				"value": "3",
				"name": "已完工"
			}, {
				"value": "4",
				"name": "已完成"
			}, {
				"value": "5",
				"name": "已结算"
			}, {
				"value": "0",
				"name": "已关闭"
			}],
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
			serviceModeSrc: [],
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
		},
		//渲染类型
		rendertype: {
			operation: function(obj) {
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var editfun = "data-bind=click:remarkEvt.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";

				var optStr = '<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a href="#" ' + editfun + ' title="备注">备注</a>' +
					'</span>' + '<span class="ui-handle-word">';

				// if(obj.billStatus != '0') {
				// 	var delfun = "data-bind=click:complete.bind($data," + obj.rowIndex + ")";
				// 	optStr += '<a href="#" ' +
				// 		delfun +
				// 		' title="确认完成">确认完成</a>' +
				// 		'</span></div>';
				// }

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
			isSynchRT: function(obj) {
				switch (obj.value) {
					case "0":
						obj.element.innerHTML = "否";
						break;
					case "1":
						obj.element.innerHTML = "是";
						break;
				}
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
		},
		//事件
		events: {
			remarkEvt: function(rowIndex, rowId) {
				// console.log(arguments);
				var self = this;
				var remarkRow;
				viewModel.remarkserviceData.removeAllRows();

				if (typeof(rowIndex) == 'number') {
					viewModel.OrderList.setRowSelect(rowIndex);
				}
				var selectedRows = viewModel.OrderList.getSelectedRows();
				var selectdata = viewModel.OrderList.getSelectedDatas();
				if (selectedRows && selectedRows.length == 1) {

					var rowData = viewModel.OrderList.getRowByRowId(rowId);
					if (!rowData) {
						rowData = selectedRows[0];
					}
					var id, vnote;
					if (rowData) {
						id = rowData.getValue('id');
						vnote = rowData.getValue('vnote');
						remarkRow = viewModel.remarkserviceData.createEmptyRow();
						remarkRow.setValue('id', id);
						remarkRow.setValue('vnote', vnote);
					}
					popupDialog = u.dialog({
						id: 'complimentary-popup',
						content: "#complimentary-popup",
						"width": "80%"
					});
					var okButton = $("#complimentary-popup .u-msg-ok");
					okButton.unbind("click").click(function() {

						if (self.addSaveRemark(rowData, id, vnote, remarkRow)) {
							popupDialog.close();
						}
					});
					var cancelButton = $("#complimentary-popup .u-msg-cancel");
					cancelButton.unbind("click").click(function() {
						popupDialog.close();
						// viewModel.addComplimentaryData.removeAllRows();
					});
					// console.log(1);
				} else {
					toastr.error("请选择一行数据");
					return
				}
			},
			addSaveRemark: function(rowData, id, vnote_origin, remarkRow) {
				var vnote = viewModel.remarkserviceData.getValue('vnote');
				// console.log(rowData.getData())
				// console.log(JSON.stringify(rowData))
				var d = viewModel.remarkserviceData.getSimpleData();
				if (vnote == vnote_origin) {
					return;
				}
				var dataResult = false;
				$._ajax({
					url: appCtx + viewModel.baseurl + "/update/remark",
					type: "put",
					// data: "ids=" + ids.join(","),
					async: false,
					data: {
						deliveryId: id,
						vnote: vnote
					},
					success: function(data) {
						toastr.success('保存成功');
						rowData.setValue('vnote', vnote);
						var products = data.products;
						var optLogs = data.logs;

						// 操作日志
						viewModel.OrderLogs.removeAllRows();


						//商品行
						viewModel.OrderProducts.removeAllRows();
						viewModel.OrderProducts.setSimpleData(products, {
							unSelect: true
						});
						viewModel.searchLog(0);
						dataResult = true;
					}
				});
				return dataResult;
			},
			sendsoout: function() {
				var rows = viewModel.OrderList.getSelectedRows();
				if (rows.length < 1) {
					toastr.error('至少选择一行数据')
					return
				}
				var ids = rows.map(function(row) {
					return row.getValue('id')
				})
				$._ajax({
					type: "post",
					url: appCtx + "/b2c/intercept-delivery/pushSaveOutOrder",
					// dataType: "json",
					// data: queryData,
					data: {
						deliveryIds: ids
					},
					success: function(data) {
						toastr.success('请求成功')
						// viewModel.OrderList.setSimpleData(data.content, {
						// 	unSelect: true
						// });
						// viewModel.OrderList.totalRow(data.totalElements);
						// viewModel.OrderList.totalPages(data.totalPages);
					}
				})
			},
			interceptx: function() {
				var rows = viewModel.OrderList.getSelectedRows();
				if (rows.length < 1) {
					toastr.error('至少选择一行数据')
					return
				}
				var ids = rows.map(function(row) {
					return row.getValue('id')
				})
				$._ajax({
					type: "post",
					url: appCtx + "/b2c/intercept-delivery/intercept",
					// dataType: "json",
					// data: queryData,
					data: {
						deliveryIds: ids
					},
					success: function(data) {
						toastr.success('请求成功')
						// viewModel.OrderList.setSimpleData(data.content, {
						// 	unSelect: true
						// });
						// viewModel.OrderList.totalRow(data.totalElements);
						// viewModel.OrderList.totalPages(data.totalPages);
					}
				})
			},
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
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.OrderList.pageSize();
				var pageNumber = viewModel.OrderList.pageIndex();
				queryData.size = pageSize;
				queryData.page = pageNumber;
				queryData['search_EQ_isReturn'] = 0;
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
					}
				});
				viewModel.OrderProducts.removeAllRows();
				viewModel.OrderLogs.removeAllRows();
			},
			//清空搜索条件
			cleanSearch: function() {
				viewModel.searchcomp.clearSearch();
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
			searchLog: function(reindex) {
				if (reindex) {
					viewModel.OrderLogs.pageIndex(0);
				}
				viewModel.OrderLogs.removeAllRows();
				var queryData = {};
				var pageSize = viewModel.OrderLogs.pageSize();
				var pageNumber = viewModel.OrderLogs.pageIndex();
				queryData.size = pageSize;
				queryData.page = pageNumber;
				queryData['search_EQ_delivery'] = viewModel.OrderList.getFocusRow().getValue('id');
				$._ajax({
					type: "get",
					url: appCtx + "/b2c/delivery-logs",
					dataType: "json",
					data: queryData,
					success: function(data) {
						viewModel.OrderLogs.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.OrderLogs.totalRow(data.totalElements);
						viewModel.OrderLogs.totalPages(data.totalPages);
					}
				})
			},
			pageChangeLog: function(index) {
				viewModel.OrderLogs.pageIndex(index);
				viewModel.searchLog();
			},
			sizeChangeLog: function(size) {
				viewModel.OrderLogs.pageSize(size);
				viewModel.searchLog(true);
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
			detailClick: function(obj) {
				if (viewModel.listIndex == obj.rowIndex) {
					return true;
				} else {
					viewModel.listIndex = obj.rowIndex;
				}
				viewModel.OrderList.setRowSelect(obj.rowIndex);
				var id = viewModel.OrderList.getRow(obj.rowIndex).getValue("id");
				//请求完整主子表信息
				viewModel.fillData(id);
				//设置tab显示基本信息
				if (viewModel.execOnce) {
					viewModel.execOnce();
					viewModel.execOnce = null;
				}
				// return true;
			},
			execOnce: function() {
				var tab = $(".delivery .u-tabs__tab").eq(0);
				var content = $(".delivery .u-tabs__panel").eq(0);
				tab.addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
				content.addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
			},
			// detail: function(index, rowId) {
			// 	//确保grid先将行设置为focus状态
			// 	setTimeout(function() {
			// 		viewModel.OrderList.setRowSelectbyRowId(rowId);
			// 		var id = viewModel.OrderList.getCurrentRow().getValue("id");
			// 		//请求完整主子表信息
			// 		viewModel.fillData(id);
			// 		$(".ui-bill-detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
			// 		$(".ui-bill-detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
			// 		viewModel.goDetailPanel();
			// 	}, 0);
			// },
			// （编辑/详情）填充完整主子表数据
			fillData: function(id) {
				$._ajax({
					type: "post",
					url: appCtx + viewModel.baseurl + "/detail",
					data: {
						deliveryId: id
					},
					async: false,
					success: function(data) {
						var products = data.products;
						var optLogs = data.logs;

						// 操作日志
						viewModel.OrderLogs.removeAllRows();
						viewModel.OrderLogs.setSimpleData(optLogs.content, {
							unSelect: true
						});
						viewModel.OrderLogs.totalRow(optLogs.totalElements);
						viewModel.OrderLogs.totalPages(optLogs.totalPages);

						//商品行
						viewModel.OrderProducts.removeAllRows();
						viewModel.OrderProducts.setSimpleData(products, {
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

		},

		afterCreate: function() {
			// 初始化折叠面板
			$.fn.collapsepanel(false, true);
			//绑定输入框enter事件
			// $('#PromoActivity-searchcontent input').off("keydown").on("keydown", function(e) {
			// 	if (e.keyCode == 13) {
			// 		$(this).blur();
			// 		viewModel.search();
			// 	}
			// });
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
			//发货状态
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.DeliveryEnumCategory$DeliverySendStatusEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.sendStatusSrc = newarray;
				}
			});
			//物流方式枚举
			$._ajax({
				type: "get",
				url: appCtx + "/b2c/enum-service/data",
				async: false,
				data: {
					enumClassName: "com.yonyou.ocm.b2c.enums.LogisticsModeEnum"
				},
				success: function(data) {
					var newarray = common.dataconvert.toMap(data, "name", "code");
					viewModel.logisticsModeSrc = newarray;
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

		// function init(element, params) {
		// 	appInit(element, params);
		// 	afterRender();
		// 	var bussrefrow = viewModel.BussTypeRef.createEmptyRow();
		// 	viewModel.BussTypeRef.setRowFocus(bussrefrow);
		// 	var agencyrefrow = viewModel.AgencyRef.createEmptyRow();
		// 	viewModel.AgencyRef.setRowFocus(agencyrefrow);
		// 	window.vm = viewModel;
		// }

		// return {
		// 	init: init
		// }
		// });
	});

	return view;
});