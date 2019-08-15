define(['text!./allotinventory.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function(tpl, common, searchbox) {
	'use strict'
	var app, baseData, events, rendertype, viewModel, singledocSearch, platStoreDetailDialog;
	baseData = {
		baseurl: '/b2c/channel-stocks',
		storeList: new u.DataTable(mainDataMeta),
		storeParamList: new u.DataTable(childListDataMeta),
		returnReasonMeta:new u.DataTable(returnReasonMeta),
		billPanelStatusB: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
		radio2Preserveinventory: [{
				value: "0",
				name: "否"
			},
			{
				value: '1',
				name: "是"
			}
		],
		stockStatusSrc: [{
				value: "0",
				name: "已处理"
			},
			{
				value: "1",
				name: "未确认"
			},
			{
				value: "2",
				name: "已确认"
			},
			{
				value: "3",
				name: "处理中"
			},
			{
				value: "4",
				name: "已占用"
			},
			{
				value: "5",
				name: "调拨中"
			},
		],
		isCanSellSrc: [{
				value: "1",
				name: "是"
			},
			{
				value: "0",
				name: "否"
			},
		],
		isCanSellSearchSrc: [{
				value: "",
				name: "全部"
			},
			{
				value: "1",
				name: "是"
			},
			{
				value: "0",
				name: "否"
			},
		],

		//认证方式枚举
		authenticationSrc: ko.observableArray([]),
		//跳转单据页
		goBillPanel: common.bill.goBillPanel,
		//跳转单据详情页
		goDetailPanel: common.bill.goDetailPanel,
		//返回列表页
		retListPanel: common.bill.retListPanel,

		billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
	};
	rendertype = {
		//跳转详情页
		detailRender: function(obj) {
			var viewModel = obj.gridObj.viewModel;
			var dataTableRowId = obj.row.value['$_#_@_id'];
			var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
			obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
			ko.cleanNode(obj.element);
			ko.applyBindings(viewModel, obj.element);
		},
		operation: function(obj) {
			var dataTableRowId = obj.row.value['$_#_@_id'];
			var confirmAllot = "data-bind=click:confirmAllot.bind($data," + obj.rowIndex + ")";;
			var returnAllot = "data-bind=click:returnAllot.bind($data," + obj.rowIndex + ")";;
			
			obj.element.innerHTML = '<div class="ui-handle-icon">' +
				'<span class="ui-handle-word">' +
				'<a ' +
				confirmAllot +
				' title="确认调拨">确认调拨</a>' +
				'</span>' +

				'<span class="ui-handle-word">' +
				'<a ' +
				returnAllot +
				' title="退回">退回</a>' +
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
		//确认调拨
		confirmAllot: function (data){
			if(typeof(data) == 'number') {
				viewModel.storeList.setRowSelect(data);
			}

			var ids = [];
			var rows = viewModel.storeList.getSelectedRows();
			if(rows && rows.length > 0) {
				for(var i = 0; i < rows.length; i++) {
					ids.push(rows[i].getValue("id"));
				}
			} else {
				toastr.warning('请选择数据');
				return;
			}

			if(rows && rows.length > 0) {
				common.dialog.confirmDialog({
					msg1: '确认调拨这些项？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/confirm-allot",
							type: "post",
							data: {
								ids: ids.join(",")
							},
							success: function(data) {
								viewModel.storeList.removeRows(rows);
								viewModel.search();
								toastr.success('调拨成功');
							}
						});
					}
				});
			} else {
				toastr.warning('请选择数据');
				return;
			}
		},

		//退回调拨
		returnAllot: function (data){
			if(typeof(data) == 'number') {
				viewModel.storeList.setRowSelect(data);
			}
			var rows = viewModel.storeList.getSelectedRows();
			if(rows && rows.length > 0) {
				viewModel.returnReasonMeta.removeAllRows();
				viewModel.returnReasonMeta.createEmptyRow();
				if(!viewModel.returndialog) {
					viewModel.returndialog = u.dialog({
						id: 'return-dialog',
						content: "#return-dialog",
						hasCloseMenu: false,
						width: "500px",
					});
					var cancelButton = $("#return-dialog .J-cancel");
					cancelButton.off().on('click', function() {
						viewModel.returndialog.close();
					});
				} else {
					viewModel.returndialog.show();
				}
				var okButton = $("#return-dialog .J-ok");
				okButton.off().on('click', function() {
					var returnReason = viewModel.returnReasonMeta.getValue("returnReason");
					viewModel.confirmReturnAllot("/rollback-allot", rows, returnReason);
				});

			} else {
				toastr.warning("请选择数据");
			}
		},

		//确认退回
		confirmReturnAllot: function (url, rows, reason){
			var ids = [];
			for(var i = 0; i < rows.length; i++) {
				ids.push(rows[i].getValue("id"));
			}
			$._ajax({
				url: appCtx + viewModel.baseurl + url,
				type: "post",
				data: {
					ids: ids.join(","),
					reason: reason
				},
				success: function(result) {
					viewModel.returndialog.close();
					viewModel.search();
				}
			})
		},

		//编辑状态
		editHandle: function() {
			// var self = this;
			// var isauditStatus = viewModel.storeList.getValue("auditStatus");
			// if (isauditStatus == "1" || isauditStatus == 1) {
			//     toastr.warning('该数据已审核不能编辑');
			//     return;
			// }
			$(".ui-bill-detail").hide();
			$(".ui-bill-panel").show();
			self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
		},
		//清空店铺参数值
		clear: function(data) {
			viewModel.storeParamList.getRow(data).setValue("value", "");
			viewModel.storeParamList.getRow(data).setValue("remark", "");
		},
		//删除和批量删除
		del: function(data) {

			if(typeof(data) == 'number') {
				viewModel.storeList.setRowSelect(data);
			}

			var ids = [];
			var rows = viewModel.storeList.getSelectedRows();
			if(rows && rows.length > 0) {
				for(var i = 0; i < rows.length; i++) {
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

			if(rows && rows.length > 0) {
				//已占用数据不能删除
				for(var i = 0; i < rows.length; i++) {
					var stockStatus = rows[i].getValue("stockStatus");
					if(stockStatus == '0' || stockStatus == '2' || stockStatus == '3' || stockStatus == '4') {
						toastr.warning('不能删除库存状态为“已处理/已确认/处理中/已占用”的数据');
						return;
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
							data: {
								ids: ids.join(",")
							},
							success: function(data) {
								viewModel.storeList.removeRows(rows);
								viewModel.search();
								toastr.success('删除成功');
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
			var urlInfo = '/person-excel/excelDataImport'; //倒入地址参数
			var urlStatusInfo = '/person-excel/excelLoadingStatus'; //请求进度地址参数
			var ele = $('#importFiel')[0]; //挂载元素
			common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
		},
		//导出
		exportHandle: function() {
			var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
			var templateUrl = '/person-excel/downloadExcelTemplate'; //导出模板地址参数
			var excelDataUrl = '/person-excel/excelDataExport'; //导出数据地址参数
			var listData = viewModel.storeList; //需要导出表格的dataTable
			var ele = $('#exportFiel')[0]; //挂载元素
			common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
		},
		//确认库存
		synchronousData: function(rowIndex, rowId) {

			if(typeof(rowIndex) == 'number') {
				viewModel.storeList.setRowSelect(rowIndex);
			}
			var ids = [];
			var rows = viewModel.storeList.getSelectedRows();

			if(rows && rows.length > 0) {
				for(var i = 0; i < rows.length; i++) {
					var stockStatus = rows[i].getValue("stockStatus");
					if(stockStatus != '1') {
						toastr.warning('只能确定库存状态为【未确认】状态的数据');
						return;
					}
					ids.push(rows[i].getValue("id"));
				}
			} else {
				toastr.warning('请选择数据');
				return;
			}
			// JSON.stringify(oid)}
			if(rows && rows.length > 0) {
				common.dialog.confirmDialog({
					msg1: '是否确认库存？',
					msg2: '此操作不可逆',
					width: '400px',
					type: 'error',
					onOk: function() {
						$._ajax({
							type: "post",
							url: appCtx + viewModel.baseurl + '/confirmStock',
							data: {
								'ids': ids.join(",")
							},
							success: function(data) {
								toastr.success('确认库存成功');
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
		//新增
		showAddBillPanel: function(index) {
			$("#storeId").attr("data-refparam", '{"EQ_platform.id":""}');
			$("#serviceProviderId2").attr("data-refparam", '{"EQ_organization.id":""}'); 
			$("#busiAccountId").attr("data-refparam", '{"EQ_isEnable":"1","EQ_customer.id":""}');
			var curRow = viewModel.storeList.createEmptyRow();
			viewModel.storeList.setRowFocus(curRow);
			//参照联动
			viewModel.referenceLink();
			//viewModel.storeParamList.removeAllRows();
			viewModel.goBillPanel();
			viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;

			viewModel.billPanelStatusB(CONST.BILLPANELSTATUS.ADD);
			//电商订单号
			//          this.syscodeIdLink(curRow);
			//是否初期库存
			var isInitValue = viewModel.storeList.getValue('isInit');
			var syscodeId = app.getComp("syscode");
			if(isInitValue == 0) {
				syscodeId.validate.required = true;
				syscodeId.validate.nullMsg = "不能为空！";
				syscodeId.trueAdpt.validate.required = true;
				syscodeId.trueAdpt.validate.nullMsg = "不能为空！";
				$("#newSyscode .ui-name i.strong").show();
			}
			viewModel.storeList.on("isInit.valuechange", function(obj) {
				isInitValue = obj.newValue;
				syscodeId = app.getComp("syscode");
				if(isInitValue == 1) {
					//  viewModel.storeList.setMeta("syscode","required",false);
					syscodeId.validate.required = false;
					syscodeId.validate.nullMsg = "";
					syscodeId.trueAdpt.validate.required = false;
					syscodeId.trueAdpt.validate.nullMsg = "";
					$("#newSyscode .ui-name i.strong").hide();
				} else {
					syscodeId.validate.required = true;
					syscodeId.validate.nullMsg = "不能为空！";
					syscodeId.trueAdpt.validate.required = true;
					syscodeId.trueAdpt.validate.nullMsg = "不能为空！";
					$("#newSyscode .ui-name i.strong").show();
				}
			});
		},
		
		//进入修改单据页
		showEditBillPanel: function(index) {
			viewModel.storeList.setRowFocus(index);
			//已占用数据不能编辑
			var row = viewModel.storeList.getFocusRow().getSimpleData();
			var stockStatus = row.stockStatus;
			if(stockStatus == '0' || stockStatus == '3' || stockStatus == '4') {
				toastr.warning('不能编辑库存状态为“已处理/处理中/已占用”的数据');
				return;
			}

			// var id = viewModel.storeList.getCurrentRow().getValue("id");
			viewModel.storeList.originEditData = viewModel.storeList.getFocusRow().getSimpleData();
			// viewModel.findByParentid(id);
			//参照联动
			viewModel.referenceLink();
			viewModel.goBillPanel();
			viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;

			viewModel.billPanelStatusB(CONST.BILLPANELSTATUS.EDIT);

		},
		referenceLink: function() {
			var officeId, serviceId, customerId = "";
			//办事处与服务商-联动
			//办事处
			viewModel.storeList.on("officeId.valuechange", function(obj) {
				if(obj.oldValue == obj.newValue) return;
				officeId = obj.newValue;
				//服务商
				$("#serviceProviderId2").attr("data-refparam", '{"EQ_organization.id":"' + officeId + '"}'); //"EQ_electricalBusiness":"1"
				$("#serviceProviderId2 input").val('');
				//
				$("#serviceProviderTypeId input").val('');
				//业务帐户
				$("#busiAccountId").attr("data-refparam", '{"EQ_isEnable":"1"}');
				$("#busiAccountId input").val('');
			});
			//serviceProviderType服务商类型
			viewModel.storeList.on("serviceProviderType.valuechange", function(obj) {
				if(obj.oldValue == obj.newValue) return;
				serviceId = obj.newValue;
				//服务商
				$("#serviceProviderId2").attr("data-refparam", '{"EQ_organization.id":"' + officeId + '","EQ_customer.twoCategory.id":"' + serviceId + '"}'); //
				$("#serviceProviderId2 input").val('');
				//业务帐户
				$("#busiAccountId").attr("data-refparam", '{"EQ_isEnable":"1"}');
				$("#busiAccountId input").val('');
			});
			//serviceProviderId服务商
			viewModel.storeList.on("serviceProviderId.valuechange", function(obj) {
				// if(obj.oldValue == obj.newValue) return;
				if(obj.oldValue == undefined || obj.oldValue == obj.newValue) return;
				//参照当前数据 
				if($("#refContainerserviceProviderId").data("uui.refer")["values"] != undefined){
					var refData = $("#refContainerserviceProviderId").data("uui.refer").values[0];
					customerId = refData.customerId;
					//业务帐户
					$("#busiAccountId").attr("data-refparam", '{"EQ_isEnable":"1","EQ_customer.id":"' + customerId + '"}');
					$("#busiAccountId input").val('');
				}
			});
			//平台名称
			viewModel.storeList.on("platformId.valuechange", function(obj) {
				if(obj.oldValue == obj.newValue) return;
				// var row = viewModel.storeList.getCurrentRow();
				var platformId = obj.newValue;
				$("#storeId").attr("data-refparam", '{"EQ_platform.id":"' + platformId + '"}');
				$("#storeId input").val(""); //清空店铺信息
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
		//查看详情
		detail: function(index,rowId) {
			viewModel.storeList.setRowSelectbyRowId(rowId);
			var id = viewModel.storeList.getCurrentRow().getValue("id");
			//请求完整主子表信息
			viewModel.findByParentid(id);
			viewModel.goDetailPanel();
		},
		//查询子表数据
		findByParentid: function(id) {
			$._ajax({
				type: "get",
				url: appCtx + viewModel.baseurl + '/detail',
				data: {
					id: id
				},
				success: function(data) {
					viewModel.storeParamList.removeAllRows();
					viewModel.storeParamList.setSimpleData(data.logs, {
						unSelect: true
					});
				}
			})
		},
		//保存单据
		saveBill: function() {
			var type = "post";
			var _url = appCtx + viewModel.baseurl + '/addStock';
			if(viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
				type = "put";
				_url = appCtx + viewModel.baseurl;
			}
			var storeData = viewModel.storeList.getCurrentRow().getSimpleData();
			var validate = $("#validate")[0];
			var result = app.compsValidateMultiParam({
				element: validate,
				showMsg: true
			});
			if(result.passed) {
				$._ajax({
					url: _url,
					type: type,
					data: JSON.stringify(storeData),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						// viewModel.storeList.getFocusRow().setSimpleData(data);
						viewModel.search();
						viewModel.retListPanel();
					}
				});
			}
		},
		//点击取消 单据页
		cancelHandle: function() {
			var curRow = viewModel.storeList.getCurrentRow();
			// 修改，则还原
			if(curRow.getValue("id")) {
				curRow.setSimpleData(viewModel.storeList.originEditData);
			}
			// 新增或复制，则删除
			else {
				viewModel.storeList.removeRow(curRow);
				// viewModel.storeParamList.removeAllRows();
			}
			// viewModel.storeList.removeRow(curRow);
			viewModel.retListPanel();
		},
		//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
		search: function(reindex) {
			if(reindex) {
				viewModel.storeList.pageIndex(0);
			}
			viewModel.storeList.removeAllRows();
			var queryData = singledocSearch.getDataWithOpr();
			queryData.size = viewModel.storeList.pageSize();
			queryData.page = viewModel.storeList.pageIndex();
			queryData["search_EQ_stockStatus"] = "5";
			$.ajax({
				type: "get",
				url: appCtx + viewModel.baseurl,
				dataType: "json",
				data: queryData,
				success: function(data) {
					viewModel.storeList.setSimpleData(data.content, {
						unSelect: true
					});
					viewModel.storeList.totalRow(data.totalElements);
					viewModel.storeList.totalPages(data.totalPages);
					var dataList = viewModel.storeList.getAllRows();

					//默认值:是否初期库存/是否可二次销售
					for(var i = 0; i < dataList.length; i++) {
						var isInit = dataList[i].getValue('isInit');
						var isCanSell = dataList[i].getValue('isCanSell');
						if(isInit == null) {
							dataList[i].setValue('isInit', '0');
						}
						if(isInit == null) {
							dataList[i].setValue('isCanSell', 'Y');
						}
					}

				}
			});
		},
		//清空搜索条件
		cleanSearch: function() {
			singledocSearch.clearSearch();
			$("#searchStoreId").attr("data-refparam", '{"EQ_platform.id":""}');
		},
		//页码改变时的回调函数
		pageChange: function(index) {
			viewModel.storeList.pageIndex(index);
			viewModel.search();
		},
		//页码改变时的回调函数
		sizeChange: function(size) {
			viewModel.storeList.pageSize(size);
			viewModel.search(true);
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
		// 查询组件初始化
		singledocSearch = new searchbox(
			$("#storeList-searchcontent")[0], [{
					type: "refer",
					key: "product--id",
					label: "产品名称",
					refinfo: "productInfo",
				},
				{
					type: "refer",
					key: "serviceProvider--organization--id",
					label: "办事处",
					refinfo: "organization_auth_b2c",
					clientParam: {
						"EQ_isOffice": "1"
					}
				},
				{
					type: "refer",
					key: "serviceProvider--customer--twoCategory--id", // customer--twoCategory--id//ServiceProviderInfo--customer--twoCategory--id
					label: "服务商类型",
					refinfo: "custdocdef",
					refCode: "QY024",
					refName: "二级客户分类",
					domid: 'serviceProviderType',
					referId: 'ServiceProviderTypeId'
				},
				{
					type: "refer",
					key: "serviceProvider",
					label: "服务商",
					refinfo: "customers",
					clientParam: {
                        "EQ_isEnable": "1",
                        "EQ_isServiceProvider":"1"
          			},
					domid: 'serviceProvider',
					referId: 'ServiceProviderId'
				},
				{
					type: "text",
					key: "code",
					label: "渠道库存号"
				},
				{
					type: "text",
					key: "syscode",
					label: "电商订单号"
				},
				{
					type: "refer",
					key: "platform--id",
					//key: "platformName",
					label: "平台名称",
					refinfo: "b2cplatform",
					refName: "所属平台"

				},
				{
					type: "refer",
					key: "store--id",
					label: "店铺名称",
					refinfo: "b2cStoreRef",
					refName: "店铺",
					domid: "searchStoreId"
				},
				{
					type: "combo",
					key: "stockStatus",
					label: "库存状态",
					dataSource: viewModel.stockStatusSrc,
				},
				{
					type: "daterange",
					key: "creationTime",
					label: "库存产生时间"
				},
				{
					type: "text",
					key: "soBillNo",
					label: "销售单号"
				}, {
					type: "text",
					key: "purchaseBillCode",
					label: "采购单号"
				}, {
					type: "text",
					key: "buyer",
					label: "顾客ID"
				},
				{
					type: "text",
					key: "channelStockReceiver--receiver",
					label: "顾客姓名"
				},
				{
					type: "text",
					key: "channelStockReceiver--receiverPhone",
					label: "顾客联系方式"
				}, {
					type: "radio",
					key: "isCanSell",
					label: "二次销售",
					dataSource: viewModel.isCanSellSearchSrc,
					//cls: "ui-checkboxes-item"
				}
				// },
				// {
				//     type: "refer",
				//     key: "platform--id",
				//     label: "所属平台",
				//     refinfo: "b2cplatform",
				//     refName: "所属平台"
				// }
			]);
		// 列表查询数据(无查询条件)
		viewModel.search();
		//服务商类型与服务商-联动
		var officeId1, serviceId1 = "";
		// singledocSearch.viewModel.params.on("serviceProvider--customer--twoCategory--id.valuechange", function (obj) {
		//     serviceId1 = obj.newValue;
		//     $("#serviceProvider").attr("data-refparam", '{"EQ_organization.id":"' + officeId1 + '","EQ_customer.twoCategory.id":"' + serviceId1 + '"}');
		//     // $("#serviceProvider input").val('');   
		//     $("#refContainerServiceProviderId").data("uui.refer").setValue([]);
		// });
		// //办事处与服务商-联动
		// singledocSearch.viewModel.params.on("office--id.valuechange", function (obj) {
		//     officeId1 = obj.newValue;
		//     $("#serviceProvider").attr("data-refparam", '{"EQ_organization.id":"' + officeId1 + '","EQ_customer.twoCategory.id":"' + serviceId1 + '"}');
		//     // $("#serviceProviderId input").val('');
		//     $("#refContainerServiceProviderId").data("uui.refer").setValue([]);
		//     //服务商类型
		//     // $("#serviceProviderType input").val('');
		//     $("#refContainerServiceProviderTypeId").data("uui.refer").setValue([]);

		// });

	}

	function afterRender() {
		//绑定输入框enter事件
		$('#storeList-searchcontent input').off("keydown").on("keydown", function(e) {
			if(e.keyCode == 13) {
				$(this).blur();
				viewModel.search();
			}
		});

		//查询平台名称-联动店铺名称
		singledocSearch.viewModel.params.on("platform--id.valuechange", function(obj) {
			var id = obj.newValue;
			$("#searchStoreId").attr("data-refparam", '{"EQ_platform.id":"' + id + '"}');
			$("#searchStoreId input").val('');
		});
		
		//认证方式枚举
		$._ajax({
			type: "get",
			url: appCtx + "/b2c/enum-service/data",
			data: {
				enumClassName: "com.yonyou.ocm.b2c.enums.StoreAuthenticationEnum"
			},
			success: function(data) {
				var newarray = common.dataconvert.toMap(data, "name", "code");
				viewModel.authenticationSrc(newarray);
			}
		});
		//电商订单号，数据联动
		viewModel.storeList.on("syscode.valuechange", function(obj) {
			if(obj.oldValue == obj.newValue || obj.oldValue == undefined ) return;
			var syscodeValue = obj.newValue;
			var curRow = obj.rowObj;
			$.ajax({
				type: "get",
				url: appCtx + viewModel.baseurl + '/getOrderInfo',
				dataType: "json",
				data: {
					'orderCode': syscodeValue
				},
				success: function(res) {
					if(res.code == 0) {
						curRow.setValue('officeId', res.data.officeId);
						curRow.setValue('serviceProviderType', res.data.serviceProviderType);
						curRow.setValue('serviceProviderId', res.data.serviceProviderId);
						curRow.setValue('busiAccount', res.data.busiAccount);
						curRow.setValue('platformId', res.data.platformId);
						curRow.setValue('storeId', res.data.storeId);
						curRow.setValue('bookTime', res.data.bookTime);
						curRow.setValue('buyer', res.data.buyer);
						curRow.setValue('receiverName', res.data.receiverName);
						curRow.setValue('receiverPhone', res.data.receiverPhone);
						curRow.setValue('receiverTel', res.data.receiverTel);
						curRow.setValue('receiverAddress', res.data.receiverAddress);
						//
						viewModel.storeList.setRowFocus(curRow);
					} else {
						toastr.warning('电商订单号不正确，请重新输入');
					}
				}
			});
		});
		//清理折扣
		viewModel.storeList.on("clearRate.valuechange", function(obj) {
			if(obj.newValue == obj.oldValue) return;
			if(obj.newValue > 1 || obj.newValue < 0){
				obj.rowObj.setValue("clearRate","0");
				$("#clearRateVal").val("0.00");
				return;
			}
			var price = parseFloat(obj.rowObj.getValue("price"));
			var sellMny = price*obj.newValue;
			obj.rowObj.setValue("sellMny",sellMny);
			obj.rowObj.setValue("discountMny",price-sellMny);
		});
		//采购单价
		viewModel.storeList.on("price.valuechange", function(obj) {
			if(obj.newValue == obj.oldValue) return;
			var price = parseFloat(obj.newValue);
			var sellMny = parseFloat(obj.rowObj.getValue("clearRate"))*price;
			obj.rowObj.setValue("sellMny",sellMny);
			obj.rowObj.setValue("discountMny",price-sellMny);
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