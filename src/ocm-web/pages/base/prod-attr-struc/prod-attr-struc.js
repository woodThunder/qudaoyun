define(['text!./prod-attr-struc.html', 'ocm_baseview', 'ocm_common', './meta.js'], function (tpl, baseview, common, model) {
	var viewModel, app, BILLPANELSTATUS = {
		ADD: "add",
		EDIT: "edit",
		COPY: "copy",
		DETAIL: "detail",
		DEFAULT: "default"
	}
	var view = baseview.extend({
		beforeCreate: function () {
			app = this.app;
			viewModel = this.viewModel;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/base/prod-attr-strucs',
			excelurl: '/prod-attr-strucs-excel',
			complexList: new u.DataTable(model.options.metas.prodAttrStruc),
			complexItems: new u.DataTable(model.options.metas.prodAttrStrucItem),
			ItemRefList: new u.DataTable(model.options.metas.ItemRef),

			searchcomp: {},
			searchSource: model.options.searchs.search1,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			button3Source: model.options.buttons.button3,
			button4Source: model.options.buttons.button4,

			card1Source: model.options.cards.card1,
			detail11Source: model.options.details.detail1,
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			billPanelStatus: BILLPANELSTATUS.DEFAULT,
			enableRadioSrc: [{
				value: "1",
				name: "启用"
			}, {
				value: "0",
				name: "停用"
			}, {
				value: CONST.DEFAULTOPTION,
				name: "全部"
			}],
			enableCheckSrc: [{
				value: "1",
				name: "是"
			}],
			//跳转单据页
			goBillPanel: common.bill.goBillPanel,
			//返回列表页
			retListPanel: common.bill.retListPanel,
			// 跳转详情页
			goDetailPanel: common.bill.goDetailPanel,
			enableFmt: ko.pureComputed(function () {
				var status = viewModel.complexList.ref("isEnable")();
				var enableName
				if (status == 0) {
					enableName = "未启用"
				}
				if (status == 1) {
					enableName = "已启用"
				}
				if (status == 2) {
					enableName = "已停用"
				}
				return enableName;
			})
		},
		rendertype: {
			operation: common.rendertype.operation,
			enableStatusRender: common.rendertype.enableRender,
			detailRender: common.rendertype.detailRender,
			whetherRender: common.rendertype.whetherRender,
			isAffectPriceRender: function (obj) {
				var grid = obj.gridObj;
				var datatable = grid.dataTable;
				var rowId = obj.row.value["$_#_@_id"];
				var row = datatable.getRowByRowId(rowId);
				var checkStr = "",
					disableStr = "";

				if (obj.value == "Y" || obj.value == "true" || obj.value == "1" || obj.value == 1) {
					checkStr = " is-checked";
				}
				if (grid.options.editType == "form") {
					disableStr = " is-disabled";
				}
				var htmlStr =
					'<label class="u-checkbox is-upgraded ' + checkStr + disableStr +'">' +
					'<input type="checkbox" class="u-checkbox-input">' +
					'<span class="u-checkbox-label"></span>' +
					'<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span>' +
					"</label>";

				obj.element.innerHTML = htmlStr;

				$(obj.element).find("input").on("click", function (e) {
					var isOptionalAttr = obj.row.value.isOptionalAttr;
					if (isOptionalAttr != 1) return;
					$(this).parent().toggleClass("is-checked");
					if (!obj.gridObj.options.editable) {
						return false;
					}
					if ($(this).parent().hasClass("is-checked")) {
						this.checked = true;
					} else {
						this.checked = false;
					}
					var value = this.checked ? "1" : "0";
					var column = obj.gridCompColumn;
					var field = column.options.field;
					row.setValue(field, value);
				});
			}
		},
		events: {
			//删除和批量删除
			del: function (data, rowId) {
				if (typeof (data) == 'number') {
					viewModel.complexList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.complexList.getSelectedRows();
				if (rows.length == 0) {
					toastr.error("请选择数据");
					return
				}
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
					onOk: function () {
						$._ajax({
							url: appCtx + viewModel.baseurl + "/delete",
							type: "post",
							// data: "ids=" + ids.join(","),
							data: {
								ids: ids.join(",")
							},
							success: function (data) {
								viewModel.complexList.removeRows(rows);
							}
						});

					}
				});
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.complexList.pageIndex(0);
				}
				viewModel.complexList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.complexList.pageSize();
				var pageNumber = viewModel.complexList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.complexList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.complexList.totalRow(data.totalElements);
						viewModel.complexList.totalPages(data.totalPages);
					}
				})
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.complexList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.complexList.pageSize(size);
				viewModel.search();
			},
			//进入新增单据页
			showAddBillPanel: function () {
				var grid2 = app.getComp("grid_complexItem");
				var col1 = grid2.grid.getColumnByField("name");
				col1.options.editable = true
				var curRow = viewModel.complexList.createEmptyRow();
				viewModel.complexList.setRowFocus(curRow);
				viewModel.complexItems.removeAllRows();
				curRow.setValue("isEnable", "0");
				viewModel.goBillPanel();
				viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
				console.log(CONST.BILLPANELSTATUS.ADD)
			},
			// 可以进入编辑态
			canInEdit: function () {
				var canIn = true;
				return canIn;
				var id = viewModel.complexList.getValue("id");
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + "/isRefer",
					async: false,
					data: {
						id: id
					},
					success: function (data) {
						if (data == 1) {
							toastr.error("已被引用数据不可编辑");
							canIn = false;
						}
					}
				})
				return canIn;
			},
			//进入修改单据页
			showEditBillPanel: function (index) {

				viewModel.complexList.setRowFocus(index);
				if (!viewModel.canInEdit()) {
					return;
				}
				var id = viewModel.complexList.getValue("id");
				viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();
				//查询子表数据
				viewModel.findByParentid(id);
				viewModel.goBillPanel();
				viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
			},
			//进入复制单据页
			showCopyBillPanel: function () {
				var selectedRows = viewModel.complexList.getSelectedRows();
				// 只支持单一复制，批量复制需单独处理
				if (selectedRows.length != 1) {
					toastr.error("请选择一条要复制的行");
					return;
				}
				var copyRow = selectedRows[0];
				var curRow = viewModel.complexList.createEmptyRow();
				curRow.setSimpleData(copyRow.getSimpleData());
				viewModel.complexList.setRowFocus(curRow);
				var id = copyRow.getValue("id");
				//查询子表数据
				viewModel.findByParentid(id);
				//删除主表主键，编码，审计信息
				viewModel.clearBaseProp(curRow);
				//删除子表主键，子表主表关联
				var subRows = viewModel.complexItems.getAllRows();
				for (var i = 0; i < subRows.length; i++) {
					viewModel.clearBaseProp(subRows[i]);
					subRows[i].setValue("parentid", "");
				}
				viewModel.goBillPanel();
				viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
			},
			//详情
			// 方案1：clone编辑态模板，设置只读，返回删除
			// 方案2：重新定义详情模板
			// 主要看差异，如果差异不大公用模板，差异大重新定义
			// detail: function() {
			//   //确保grid先将行设置为focus状态
			//   setTimeout(function(){
			//     var curRow = viewModel.complexList.getCurrentRow();
			//     var id = curRow.getValue("id");
			//     viewModel.findByParentid(id);
			//     var $detailWrap = $("#bill-detail-wrap");
			//     $detailWrap.empty();
			//     var $billPanel_cl = $(".ui-bill-panel").clone();
			//     $billPanel_cl.show();
			//     $detailWrap.append($billPanel_cl);
			//     viewModel.showBillDetail();
			//     u.compMgr.updateComp($detailWrap[0]);
			//   }, 0);
			// },
			detail: function () {
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.complexList.getCurrentRow();
					var id = curRow.getValue("id");
					viewModel.findByParentid(id);
					viewModel.goDetailPanel();
				}, 0);
			},
			//查询子表数据
			findByParentid: function (id) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/get-prod-attr-struc-items/" + id,
					async: false,
					success: function (data) {
						viewModel.complexItems.setSimpleData(data);
					}
				})
			},
			// 清除基类属性
			clearBaseProp: function (row) {
				row.setValue("id", "");
				row.setValue("code", "");
				row.setValue("name", "");
				row.setValue("creator", "");
				row.setValue("creationTime", "");
				row.setValue("modifier", "");
				row.setValue("modifiedTime", "");
			},
			//跳转单据详情页
			showBillDetail: function () {
				$(".ui-list-panel").addClass("animated slideInLeft");
				$(".ui-bill-panel").addClass("animated slideOutDown");
			},
			//新增子表项
			addItem: function () {
				viewModel.complexItems.createEmptyRow();
			},
			//批量新增子表项
			// addItems: function() {
			//
			// },
			//删除子表项
			delItems: function () {
				var selectedRows = viewModel.complexItems.getSelectedRows();
				for (var i = 0; i < selectedRows.length; i++) {
					selectedRows[i].setValue("dr", "1");
				}
				viewModel.complexItems.removeRows(selectedRows);
			},
			//保存单据
			saveBill: function () {
				var result = viewModel.app.compsValidateMultiParam({
					element: ".ui-bill-panel",
					showMsg: true
				});
				if (!result.passed) {
					return;
				}
				var allRows = viewModel.complexItems.getAllRows();
				if (allRows.length == 0 || allRows.every(function (row) {
					return row.status == u.Row.STATUS.FALSE_DELETE
				})) {
					toastr.warning("请录入表体行数据");
					return;
				}
				for (var i = 0; i < allRows.length; i++) {
					if (allRows[i].data.isKeyAttr.value == 1 && allRows[i].data.isOptionalAttr.value == 1) {
						toastr.warning("关键属性和选配属性不能同时勾选");
						return;
					}
				}

				//显示顺序重复校验
				if (allRows.length > 1) {
					for (var i = 0; i < allRows.length - 1; i++) {
						if (allRows[i].status == u.Row.STATUS.FALSE_DELETE) {
							continue;
						}
						for (var j = i + 1; j < allRows.length; j++) {
							if (allRows[j].status == u.Row.STATUS.FALSE_DELETE) {
								continue;
							}
							if (allRows[i].data.productAttrId.value == allRows[j].data.productAttrId.value) {
								toastr.warning("属性不能重复");
								return;
							}
							if (allRows[i].data.displayOrder.value == allRows[j].data.displayOrder.value) {
								toastr.warning("显示顺序不能重复");
								return;
							}

						}
					}
				}

				var InventoryAdjustData = viewModel.complexList.getCurrentRow().getSimpleData();
				var complexItemsData = viewModel.complexItems.getSimpleData();
				for (var i = 0; i < complexItemsData.length; i++) {
					if (complexItemsData[i].isKeyAttr != "1") {
						complexItemsData[i].isKeyAttr = "0"
					}
				}
				InventoryAdjustData.prodAttrStrucItems = complexItemsData;
				var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
				$._ajax({
					url: appCtx + viewModel.baseurl,
					type: _ajaxType,
					data: JSON.stringify(InventoryAdjustData),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.complexList.getFocusRow().setSimpleData(data);
						viewModel.retListPanel();
					}
				})
			},
			//重置单据
			resetBill: function () {
				// var curRow = viewModel.complexList.getCurrentRow();
				// 新增重置
				// 编辑重置（修改或复制）
			},
			//取消单据
			cancelBill: function () {
				viewModel.complexItems.removeAllRows();
				var curRow = viewModel.complexList.getCurrentRow();
				// 修改，则还原
				if (curRow.getValue("id")) {
					curRow.setSimpleData(viewModel.complexList.originEditData)
				}
				// 新增或复制，则删除
				else {
					viewModel.complexList.removeRow(curRow);
					viewModel.complexItems.removeAllRows();
				}
				viewModel.retListPanel();
			},
			//启用
			enable: function () {
				var selectedRows = viewModel.complexList.getSelectedRows();
				if (selectedRows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (selectedRows && selectedRows.length > 0) {
					var ids = [];
					for (var i = 0; i < selectedRows.length; i++) {
						ids.push(selectedRows[i].getValue("id"));
					}
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-enable",
						data: {
							ids: ids.join(",")
						},
						success: function (res) {
							toastr.success();
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("isEnable", "1");
							}
						}
					})
				}
			},
			//停用
			disable: function () {
				var selectedRows = viewModel.complexList.getSelectedRows();
				if (selectedRows.length == 0) {
					toastr.error("请选择数据");
					return
				}
				if (selectedRows && selectedRows.length > 0) {
					var ids = [];
					for (var i = 0; i < selectedRows.length; i++) {
						ids.push(selectedRows[i].getValue("id"));
					}
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-disable",
						data: {
							ids: ids.join(",")
						},
						success: function (res) {
							toastr.success();
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("isEnable", "2");
							}
						}
					})
				}
			},
			//参照选择批量新增子表（销售产品）
			showAddItemsRef: function () {
				viewModel.clearItemsRef();
				$("#addItemsRef .refer").trigger("click");
			},
			//清空已选销售产品参照
			clearItemsRef: function () {
				viewModel.ItemRefList.setValue("productref", "");
				var refer = $("#refContainerproductref").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
			},
			detail2bill: function () {
				if (!viewModel.canInEdit()) {
					return;
				}
				common.bill.detail2bill();
			},
			//导入
			importHandle: function () {
				var urlInfo = viewModel.excelurl + '/excelDataImport'; //倒入地址参数
				var urlStatusInfo = viewModel.excelurl + '/excelLoadingStatus'; //请求进度地址参数
				var ele = $('#importFiel')[0]; //挂载元素
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
			},
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
				var listData = viewModel.complexList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
			},
			//子表增行
			addRow: function () {
				viewModel.complexItems.createEmptyRow();
				viewModel.currentFlag = 0;
			}
		},
		afterCreate: function () {
			// 列表查询数据(无查询条件)
			//viewModel.search();
			// 子表参照聚焦行，用于绑定子表参照组件
			var refRow = viewModel.ItemRefList.createEmptyRow();
			viewModel.ItemRefList.setRowFocus(refRow);
			// 确定销售产品参照，为产品组合子表增行
			viewModel.ItemRefList.on("productref.valuechange", function (obj) {
				// 清空参照时不增行
				if (!obj.newValue) {
					return;
				}
				var refer = $("#refContainerproductref").data("uui.refer");
				var refValues = refer.values;
				if (refValues && refValues.length > 0) {
					for (var i = 0; i < refValues.length; i++) {
						var id = refValues[i].refpk;
						var row = viewModel.complexItems.getRowByField("productid", id);
						if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
							var newrow = viewModel.complexItems.createEmptyRow();
							newrow.setValue("productidCode", refValues[i].refcode);
							newrow.setValue("productidName", refValues[i].refname);
							newrow.setValue("productidStandardName", refValues[i].productModelName);
							newrow.setValue("productidSaleSeriesName", refValues[i].productSaleSeriesName);
							newrow.setValue("unitName", refValues[i].baseUnit);
							newrow.setValue("productid", id);
						}
					}
				}
			});
			viewModel.complexItems.on("isOptionalAttr.valuechange", function (obj) {
				var currRow = viewModel.complexItems.getRowByRowId(obj.rowId);
				if (obj.newValue == 0 || !obj.newValue) {
					currRow.setValue('isAffectPrice', 0)
				}
			});
		}
	});
	return view;
});
