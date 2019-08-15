define(['text!./allowsaleproduct.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
	'use strict'
	var viewModel, app;
	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
			app = this.app;
		},
		tpl: tpl,
		model: model,
		rendertype: {
			allowBooleanRender: function (obj) {
				var grid = obj.gridObj;
				var datatable = grid.dataTable;
				var rowId = obj.row.value['$_#_@_id'];
				var row = datatable.getRowByRowId(rowId);
				var checkStr = '',
					disableStr = '';

				if (obj.value == 'Y' || obj.value == 'true' || obj.value == '1' || obj.value == 1) {
					checkStr = ' is-checked';
				}
				if (grid.options.editType == 'form') {
					disableStr = ' is-disabled';
				}
				var htmlStr = '<label class="u-checkbox is-upgraded ' + checkStr + disableStr + '">' +
					'<input type="checkbox" class="u-checkbox-input">' +
					'<span class="u-checkbox-label"></span>' +
					'<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span>' +
					'</label>'

				obj.element.innerHTML = htmlStr;
				$(obj.element).find('input').on('click', function (e) {
					if (viewModel.isEdit == 0) return;
					$(this).parent().toggleClass('is-checked');
					if ($(this).parent().hasClass('is-checked')) {
						this.checked = true;
					} else {
						this.checked = false;
					}
					var value = this.checked ? "1" : "0";
					var column = obj.gridCompColumn
					var field = column.options.field
					row.setValue(field, value);
				})
			}
		},
		events: {
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.AllowSaleProductList.pageIndex(0);
				}
				viewModel.AllowSaleProductList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				queryData.size = viewModel.AllowSaleProductList.pageSize();
				queryData.page = viewModel.AllowSaleProductList.pageIndex();
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.AllowSaleProductList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.AllowSaleProductList.totalRow(data.totalElements);
						viewModel.AllowSaleProductList.totalPages(data.totalPages);
					}
				})
			},
			// 清空已选参照
			clearRef: function (referids) {
				if (referids && referids.length > 0) {
					for (var i = 0; i < referids.length; i++) {
						var refer = $("#refContainer" + referids[i]).data("uui.refer");
						refer.uncheckAll();
						refer.setValue([]);
					}
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
			beforeEdit: function () {
				viewModel.buttonSource(model.options.buttons.button2),
					viewModel.isEdit = 1;
				app.getComp("grid_AllowSaleProduct").grid.setEditable(true);
				viewModel.AllowSaleProductList.editable = true;
			},
			validate: function (element) {
				var result = viewModel.app.compsValidateMultiParam({
					element: element,
					showMsg: true
				});
				return result;
			},
			saveRow: function () {
				var contactInfo = $("#contactInfo")[0];
				var contactPass = viewModel.validate(contactInfo);
				if (contactPass.passed) {
					var allDatas = viewModel.AllowSaleProductList.getSimpleData();
					var saveDatas = [];
					allDatas.forEach(function (item) {
						if (item.persistStatus != 'nrm') {
							saveDatas.push(item);
							if (item.persistStatus == "fdel") {
								item.goodsId = "";
								item.goodsName = "";
								item.customerId = "";
								item.customerName = "";
								item.customerCode = "";
							}
						}
					})
					if (!saveDatas || saveDatas.length == 0) {
						toastr.warning("没有数据库更改");
						viewModel.buttonSource(model.options.buttons.button1)
						viewModel.isEdit = 0;
						app.getComp("grid_AllowSaleProduct").grid.setEditable(false);
						return;
					}
					var postDatas = [];
					for (var i = 0; i < saveDatas.length; i++) {
						postDatas.push(saveDatas[i]);
					}
					//更改后台数据
					$._ajax({
						url: appCtx + viewModel.baseurl + "/batch-save",
						type: "post",
						data: JSON.stringify(postDatas),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							// viewModel.dialog.close();
							viewModel.buttonSource(model.options.buttons.button1)
							viewModel.isEdit = 0;
							app.getComp("grid_AllowSaleProduct").grid.setEditable(false);
							viewModel.search();
							toastr.warning("保存成功！");
						}
					})
				} else {
					toastr.warning("销售组织不能为空!")
				}
			},
			cancelRow: function () {
				var saveDatas = viewModel.AllowSaleProductList.getChangedDatas();
				if (saveDatas && saveDatas.length > 0) {
					if (!viewModel.dialog) {
						viewModel.dialog = u.dialog({
							id: 'testDialg',
							content: "#AllowSaleProduct-dialog",
							hasCloseMenu: true,
							width: "500px",
						});
						var okButton = document.body.querySelector(".J-ok");
						u.on(okButton, 'click', function () {
							viewModel.buttonSource(model.options.buttons.button1)
							viewModel.isEdit = 0;
							app.getComp("grid_AllowSaleProduct").grid.setEditable(false);
							viewModel.search();
							viewModel.dialog.close();
							// viewModel.edit(viewModel.index);
						});

						var cancelButton = document.body.querySelector(".J-cancel");
						u.on(cancelButton, 'click', function () {
							viewModel.dialog.close();
						});
					} else {
						viewModel.dialog.show();
					}
					// toastr.warning("有数据变更，是否确认不保存？");
					return;
				}
				viewModel.buttonSource(model.options.buttons.button1)
				viewModel.isEdit = 0;
				app.getComp("grid_AllowSaleProduct").grid.setEditable(false);
				// viewModel.AllowSaleProductList.editable = false;
			},
			//删除和批量删除
			delChild: function () {
				var selectedRows = viewModel.AllowSaleProductList.getSelectedRows();
				if (selectedRows.length < 1) {
					toastr.warning("请选择数据");
					return;
				}
				viewModel.AllowSaleProductList.removeRows(selectedRows);
			},
			editRow: function () {
				viewModel.AllowSaleProductList.editable = true;
			},
			//子表增行
			addRow: function () {
				var emptyRow = viewModel.AllowSaleProductList.createEmptyRow({
					unSelect: true
				});
			},
			//导入
			importHandle: function () {
				var urlInfo = "/allowSaleProduct-excel/excelDataImport"; //倒入地址参数
				var urlStatusInfo = "/allowSaleProduct-excel/excelLoadingStatus"; //请求进度地址参数
				var ele = $('#importFiel')[0]; //挂载元素
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
			},
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = '/allowSaleProduct-excel/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = '/allowSaleProduct-excel/excelDataExport'; //导出数据地址参数
				var listData = viewModel.AllowSaleProductList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.AllowSaleProductList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.AllowSaleProductList.pageSize(size);
				viewModel.search(true);
			},
			setGoodsId: function (current, data) {
				current.currentRowChange(-current.currentRowChange());
				current.setSimpleData(data);
			},
			AllowSaleProductListOnBeforeEditFun: function (obj) {
				var gridObj = obj.gridObj;
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("dealAmount"))) {

					return false;
				}
				return true;
			},
		},
		baseData: {
			baseurl: '/b2b/allow-sale-goods',
			AllowSaleProductList: new u.DataTable(model.options.metas.AllowSaleProductmeta),
			ifExcludeText: ko.observable("允许"),
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			buttonSource: ko.observableArray(model.options.buttons.button1),
			isEdit: "0",
			grid1Option: model.options.grids.grid1,
		},
		afterCreate: function () {
			$('#AllowSaleProduct-searchcontent input').off("keydown").on("keydown", function (e) {
				if (e.keyCode == 13) {
					$(this).blur();
					viewModel.search();
				}
			});
			viewModel.AllowSaleProductList.on("customerId.valuechange", function (obj) {
				if (obj.newValue) {
					var newValueArr = obj.newValue.split(',');
					if (newValueArr.length == 1) {
						var row = obj.rowObj;
						row.setValue("customerCategoryName", null);
						row.setValue("customerCategoryCode", null);
						row.setValue("customerCategoryId", null);
						row.setMeta('customerCategoryId', 'display', '');
						row.setValue("marketAreaName", null);
						row.setValue("marketAreaCode", null);
						row.setValue("marketAreaId", null);
						row.setMeta('marketAreaId', 'display', '');
					} else {
						setTimeout(function () {
							var currentRow = viewModel.AllowSaleProductList.getCurrentRow();
							var currentData = currentRow.getSimpleData(),
								customerNameList = currentData.customerName.split(','),
								data = [];
							currentData.customerId = newValueArr[0];
							currentData.customerName = customerNameList[0];

							for (var i = 1; i < newValueArr.length; i++) {
								data.push({
									customerId: newValueArr[i],
									customerName: customerNameList[i],
									customerCategoryName: null,
									customerCategoryCode: null,
									customerCategoryid: null,
									marketAreaName: null,
									marketAreaCode: null,
									marketAreaId: null,
									id: '',
									goodsId: currentData.goodsId,
									goodsName: currentData.goodsName,
									organizationCode: currentData.organizationCode,
									organizationId: currentData.organizationId,
									organizationName: currentData.organizationName,
									goodsCategoryCode: currentData.goodsCategoryCode,
									goodsCategoryId: currentData.goodsCategoryId,
									goodsCategoryName: currentData.goodsCategoryName,
								})
							}
							var status = currentData.persistStatus == "new" ? "new" : "upd";
							viewModel.AllowSaleProductList.addSimpleData(currentData, status);
							viewModel.AllowSaleProductList.addSimpleData(data, 'new');
							setTimeout(function () {
								viewModel.AllowSaleProductList.removeRows(currentRow);
							}, 100);
						}, 100);
					}
				}

			});
			viewModel.AllowSaleProductList.on("customerCategoryId.valuechange", function (obj) {
				if (obj.newValue) {
					var row = obj.rowObj;
					row.setValue("customerName", null);
					row.setValue("customerCode", null);
					row.setValue("customerId", null);
					row.setMeta('customerId', 'display', '');
					row.setValue("marketAreaName", null);
					row.setValue("marketAreaCode", null);
					row.setValue("marketAreaId", null);
					row.setMeta('marketAreaId', 'display', '');
				}

			});
			viewModel.AllowSaleProductList.off("goodsId.valuechange").on("goodsId.valuechange", function (obj) {
				if (obj.newValue) {
					var newValueArr = obj.newValue.split(',');
					if (newValueArr.length == 1) {
						var row = obj.rowObj;
						row.setValue("goodsCategoryId", null);
						row.setValue("goodsCategoryName", null);
						row.setValue("goodsCategoryCode", null);
						row.setValue("brandId", null);
						row.setValue("brandName", null);
						row.setValue("brandCode", null);
						row.setMeta('goodsCategoryId', 'display', '');
						row.setMeta('brandId', 'display', '');
					} else {
						setTimeout(function () {
							var currentRow = viewModel.AllowSaleProductList.getCurrentRow();
							var currentData = currentRow.getSimpleData(),
								goodsNameList = currentData.goodsName.split(','),
								data = [];
							currentData.goodsId = newValueArr[0];
							currentData.goodsName = goodsNameList[0];

							for (var i = 1; i < newValueArr.length; i++) {
								data.push({
									goodsCategoryId: null,
									goodsCategoryName: null,
									goodsCategoryCode: null,
									brandId: null,
									brandCode: null,
									brandName: null,
									goodsId: newValueArr[i],
									goodsName: goodsNameList[i],
									organizationCode: currentData.organizationCode,
									organizationId: currentData.organizationId,
									organizationName: currentData.organizationName,
									customerCategoryCode: currentData.customerCategoryCode,
									customerCategoryId: currentData.customerCategoryId,
									customerCategoryName: currentData.customerCategoryName,
									customerId: currentData.customerId,
									customerCode: currentData.customerCode,
									customerName: currentData.customerName,
									marketAreaId: currentData.marketAreaId,
									marketAreaName: currentData.marketAreaName,
									marketAreaCode: currentData.marketAreaCode,
								});
							}
							var status = currentData.persistStatus == "new" ? "new" : "upd";
							viewModel.AllowSaleProductList.addSimpleData(currentData, status);
							viewModel.AllowSaleProductList.addSimpleData(data, 'new');
							setTimeout(function () {
								viewModel.AllowSaleProductList.removeRows(currentRow);
							}, 100);
						}, 100);
					}
				}
			});
			viewModel.AllowSaleProductList.on("goodsCategoryId.valuechange", function (obj) {
				var row = obj.rowObj;
				if (obj.newValue) {
					row.setValue("goodsId", null);
					row.setValue("goodsName", null);
					row.setValue("goodsCode", null);
					row.setValue("brandId", null);
					row.setValue("brandName", null);
					row.setValue("brandCode", null);
					row.setMeta('goodsId', 'display', '');
					row.setMeta('brandId', 'display', '');
				}

			});

			viewModel.AllowSaleProductList.on("brandId.valuechange", function (obj) {
				if (obj.newValue) {
					var row = obj.rowObj;
					row.setValue("goodsName", null);
					row.setValue("goodsCode", null);
					row.setValue("goodsCategoryName", null);
					row.setValue("goodsCategoryCode", null);
					row.setValue("goodsId", null);
					row.setValue("goodsCategoryId", null);
					row.setMeta('goodsId', 'display', '');
					row.setMeta('goodsCategoryId', 'display', '');
				}
			});
			viewModel.AllowSaleProductList.on("marketAreaId.valuechange", function (obj) {
				if (obj.newValue) {
					var newValueArr = obj.newValue.split(',');
					if (newValueArr.length == 1) {
						var row = obj.rowObj;
						row.setValue("customerCategoryName", null);
						row.setValue("customerCategoryCode", null);
						row.setValue("customerCategoryId", null);
						row.setMeta('customerCategoryId', 'display', '');
						row.setValue("customerName", null);
						row.setValue("customerCode", null);
						row.setValue("customerId", null);
						row.setMeta('customerId', 'display', '');


					} else {
						setTimeout(function () {
							var currentRow = viewModel.AllowSaleProductList.getCurrentRow();
							var currentData = currentRow.getSimpleData(),
								marketAreaNameList = currentData.marketAreaName.split(','),
								data = [];
							currentData.marketAreaId = newValueArr[0];
							currentData.marketAreaName = marketAreaNameList[0];

							for (var i = 1; i < newValueArr.length; i++) {
								data.push({
									marketAreaId: newValueArr[i],
									marketAreaName: marketAreaNameList[i],
									customerCategoryName: null,
									customerCategoryCode: null,
									customerCategoryCode: null,
									id: '',
									goodsId: currentData.goodsId,
									goodsName: currentData.goodsName,
									organizationCode: currentData.organizationCode,
									organizationId: currentData.organizationId,
									organizationName: currentData.organizationName,
									goodsCategoryCode: currentData.goodsCategoryCode,
									goodsCategoryId: currentData.goodsCategoryId,
									goodsCategoryName: currentData.goodsCategoryName,
								})
							}
							var status = currentData.persistStatus == "new" ? "new" : "upd";
							viewModel.AllowSaleProductList.addSimpleData(currentData, status);
							viewModel.AllowSaleProductList.addSimpleData(data, 'new');
							setTimeout(function () {
								viewModel.AllowSaleProductList.removeRows(currentRow);
							}, 100);
						}, 100);
					}
				}

			});
		}
	});
	return view;
});