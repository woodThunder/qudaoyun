define(['text!./ladderPrice.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
	'use strict'
	var viewModel, app;
	var isEdit = ko.observable(true);
	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
			app = this.app;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/price/ladder-prices',
			childBaseurl: '/price/ladder-price-details',
			LadderPriceList: new u.DataTable(model.options.metas.LadderPricemeta),
			LadderPriceChildList: new u.DataTable(model.options.metas.LadderPriceChildMeta),
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			button1Source: ko.observableArray(model.options.buttons.button1),
			button3Source: ko.observableArray(model.options.buttons.button3),
			grid1Option: model.options.grids.grid1,
			grid2Option: model.options.grids.grid2,
			grid3Option: model.options.grids.grid3,
			isEdit: isEdit

		},
		rendertype: {
			editOperation: function(obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value["$_#_@_id"];
				var editfun =
					"data-bind=click:editChild.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				var viewfun =
					"data-bind=click:viewChild.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				obj.element.innerHTML =
					'<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a href="#" class="occ-ladder-editchild-options" style="display: none" ' +
					editfun +
					' title="维护">维护</a>' +
					'<a href="#" class="occ-ladder-viewchild-options"' +
					viewfun +
					' title="查看阶梯">查看阶梯</a>' +
					"</span></div>";
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			delchildRender: function(obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value["$_#_@_id"];
				var delfun =
					"data-bind=click:delchild.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				obj.element.innerHTML =
					'<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a href="#" ' +
					delfun +
					' title="删除">删除</a>' +
					"</span></div>";
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			}
		},
		events: {
			viewChild: function(obj, rowId) {
				viewModel.viewChildDialog = u.dialog({
					id: "dialogContentLadderPriceChildView",
					content: "#dialog_referladderpricechildView",
					width: "600px",
					height: "400px"
				});

				$('.occ-ladder-editchild-options').hide();
				$('.occ-ladder-viewchild-options').show();

				app.getComp("grid_LadderPriceChildList_view").grid.setEditable(false);
				viewModel.LadderPriceChildList.editable = false;

				viewModel.LadderPriceChildList.removeAllRows();
				var selectedRows = viewModel.LadderPriceList.getRowByRowId(rowId);
				viewModel.LadderPriceList.setRowFocus(selectedRows);
				var ladderPriceList = selectedRows.getSimpleData();
				if(ladderPriceList.ladderPriceDetail) {
					viewModel.LadderPriceChildList.setSimpleData(ladderPriceList.ladderPriceDetail);
				} else {
					$._ajax({
						type: "get",
						url: appCtx + viewModel.childBaseurl,
						dataType: "json",
						data: {
							EQ_ladderpriceid: ladderPriceList.id
						},
						success: function (data) {
							viewModel.LadderPriceChildList.setSimpleData(data.content);
						}
					});
				}
			},
			viewChildDialogClose: function() {
				viewModel.viewChildDialog.close();
			},
			editChild: function(obj, rowId) {
				viewModel.editChildDialog = u.dialog({
					id: "dialogContentLadderPriceChild",
					content: "#dialog_referladderpricechild",
					width: "600px",
					height: "400px"
				});

				$('.occ-ladder-editchild-options').show();
				$('.occ-ladder-viewchild-options').hide();

				app.getComp("grid_LadderPriceChildList").grid.setEditable(true);
				viewModel.LadderPriceChildList.editable = true;

				viewModel.LadderPriceChildList.removeAllRows();
				var selectedRows = viewModel.LadderPriceList.getRowByRowId(rowId);
				viewModel.LadderPriceList.setRowFocus(selectedRows);

				var ladderPriceList = selectedRows.getSimpleData();
				// viewModel.LadderPriceChildList.setSimpleData(ladderPriceList.ladderPriceDetail);
				if(ladderPriceList.id) {
					if (ladderPriceList.ladderPriceDetail) {
						viewModel.LadderPriceChildList.setSimpleData(ladderPriceList.ladderPriceDetail);
					} else {
						$._ajax({
							type: "get",
							url: appCtx + viewModel.childBaseurl,
							dataType: "json",
							data: {
								EQ_ladderpriceid: ladderPriceList.id
							},
							success: function (data) {
								viewModel.LadderPriceChildList.setSimpleData(data.content);
							}
						});
					}
				}
			},
			editChildDialogConfirm: function() {
				var simpleData = viewModel.LadderPriceChildList.getSimpleData();
				var currentRow = viewModel.LadderPriceList.getCurrentRow();
				var currentRowData = currentRow.getSimpleData();
				currentRowData.ladderPriceDetail = simpleData;
				currentRowData.persistStatus = 'upd';
				currentRow.setSimpleData(currentRowData);
				currentRow.setValue('ladderPriceDetail', viewModel.LadderPriceChildList);
				viewModel.editChildDialog.close();

				$('.occ-ladder-editchild-options').hide();
				$('.occ-ladder-viewchild-options').show();
			},
			editChildDialogCancel: function() {
				viewModel.editChildDialog.close();
			},
			addChild: function() {
				viewModel.LadderPriceChildList.createEmptyRow({unSelect: true});
			},
			delchild: function(obj) {
				var selectedRows = viewModel.LadderPriceChildList.getSelectedRows();
				if (selectedRows.length < 1) {
					toastr.warning("请选择数据");
					return;
				}
				viewModel.LadderPriceChildList.removeRows(selectedRows);
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.LadderPriceList.pageIndex(0);
				}
				viewModel.LadderPriceList.removeAllRows();
				// var queryData = viewModel.searchcomp.getDataWithOpr();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                if (queryData['search_EQ_organization'] == undefined) {
                    toastr.warning('请输入销售组织查询阶梯价格');
                    return;
                }
				queryData.size = viewModel.LadderPriceList.pageSize();
				queryData.page = viewModel.LadderPriceList.pageIndex();
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
					    if(data&&data.content) {
                            for (var i = 0; i < data.content.length; i++) {
                                data.content[i].organizationId = queryData['search_EQ_organization'];
                            }
                        }

						viewModel.LadderPriceList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.LadderPriceList.totalRow(data.totalElements);
						viewModel.LadderPriceList.totalPages(data.totalPages);

						viewModel.button1Source(model.options.buttons.button1);
						app.getComp("grid_LadderPriceList").grid.setEditable(false);
						viewModel.LadderPriceList.editable = false;
						$('.occ-ladder-editchild-options').hide();
						$('.occ-ladder-viewchild-options').show();
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
				viewModel.button1Source(model.options.buttons.button2);
				app.getComp("grid_LadderPriceList").grid.setEditable(true);
				viewModel.LadderPriceList.editable = true;
				$('.occ-ladder-editchild-options').show();
				$('.occ-ladder-viewchild-options').hide();
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
					var allDatas = viewModel.LadderPriceList.getSimpleData();
					var saveDatas = [];
					allDatas.forEach(function (item) {
						if (item.persistStatus != "fdel") {
							if(item.id) {
								item.persistStatus = 'upd';
							} else {
								item.persistStatus = 'new';
							}
							if(!item.ladderPriceDetail) {
								contactPass.passed = false;
								toastr.error('请维护价格阶梯');
								return false;
							}
							item.ladderPriceDetail.forEach(function (detaiItem) {
								if (detaiItem.persistStatus != "fdel") {
									if (detaiItem.id) {
										detaiItem.persistStatus = 'upd';
									} else {
										detaiItem.persistStatus = 'new';
									}
								}else{
									detaiItem.count = '';
									detaiItem.ladderindex = '';
									detaiItem.ladderindex = '';
								}
							});

						} else {
								item.goodsId = "";
								item.goodsName = "";
								item.customerId = "";
								item.customerName = "";
								item.customerCode = "";
							}
						saveDatas.push(item);
					});
					var postDatas = [];
					for (var i = 0; i < saveDatas.length; i++) {
						postDatas.push(saveDatas[i]);
					}
					postDatas.push(saveDatas[i]);
					if(!contactPass.passed){
						return false;
					}
					//更改后台数据
					$._ajax({
						url: appCtx + viewModel.baseurl + "/batch-save",
						type: "post",
						data: JSON.stringify(allDatas),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							viewModel.button1Source(model.options.buttons.button1);
							viewModel.search();
							$('.occ-ladder-editchild-options').hide();
							$('.occ-ladder-viewchild-options').show();
							app.getComp("grid_LadderPriceList").grid.setEditable(false);
							viewModel.LadderPriceList.editable = false;
							toastr.success("保存成功！");
						}
					})
				} else {
					toastr.warning("销售组织不能为空!")
				}
			},
			cancelRow: function () {
				var saveDatas = viewModel.LadderPriceList.getChangedDatas();
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
							viewModel.button1Source(model.options.buttons.button1)
							viewModel.isEdit = 0;
							app.getComp("grid_LadderPriceList").grid.setEditable(false);
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
				viewModel.button1Source(model.options.buttons.button1);
				app.getComp("grid_LadderPriceList").grid.setEditable(false);
				viewModel.LadderPriceList.editable = false;
				$('.occ-ladder-editchild-options').hide();
				$('.occ-ladder-viewchild-options').show();
			},
			//删除和批量删除
			delRow: function () {
				var selectedRows = viewModel.LadderPriceList.getSelectedRows();
				if (selectedRows.length < 1) {
					toastr.warning("请选择数据");
					return;
				}
				var ids = [];
				selectedRows.forEach(function (item) {
					ids.push(item.getSimpleData().id);
				});

                common.dialog.confirmDialog({
                    msg1: '确认删除这些项？',
                    msg2: '此操作不可逆',
                    width: '400px',
                    type: 'error',
                    onOk: function () {
                        //更改后台数据
                        $._ajax({
                            url: appCtx + viewModel.baseurl + "/delete",
                            type: "post",
                            // data: "ids=" + ids.join(","),
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (data) {
                                viewModel.button1Source(model.options.buttons.button1)
                                viewModel.isEdit = 0;
                                app.getComp("grid_LadderPriceList").grid.setEditable(false);
                                viewModel.search();
                                $('.occ-ladder-editchild-options').hide();
                                $('.occ-ladder-viewchild-options').show();
                                toastr.warning("删除成功！");
                            }
                        })
                    }
                });
				viewModel.LadderPriceList.removeRows(selectedRows);
			},
			editRow: function () {
				viewModel.LadderPriceList.editable = true;
			},
			//子表增行
			addRow: function () {
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				var organization = queryData['search_EQ_organization'];
				if(!organization) {
					toastr.error('请选择销售组织');
					return false;
				}
				var emptyRow = viewModel.LadderPriceList.createEmptyRow({
					unSelect: true
				});
				emptyRow.setValue('organizationId', queryData['search_EQ_organization']);
				app.getComp("grid_LadderPriceList").grid.setEditable(true);
				viewModel.button1Source(model.options.buttons.button2);
				setTimeout(function () {
					$('.occ-ladder-editchild-options').show();
					$('.occ-ladder-viewchild-options').hide();
				},1 );
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
				var listData = viewModel.LadderPriceList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.LadderPriceList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.LadderPriceList.pageSize(size);
				viewModel.search(true);
			},
			setGoodsId: function (current, data) {
				current.currentRowChange(-current.currentRowChange());
				current.setSimpleData(data);
			},
		},
		afterCreate: function () {
			viewModel.LadderPriceList.on("customerId.valuechange", function (obj) {
				if (obj.newValue) {
					var newValueArr = obj.newValue.split(',');
					if (newValueArr.length == 1) {
						var row = obj.rowObj;
						row.setValue("customercategoryName", null);
						row.setValue("customercategoryCode", null);
						row.setValue("customercategoryId", null);
						row.setMeta('customercategoryId', 'display', '');
						row.setValue("marketareaName", null);
						row.setValue("marketareaCode", null);
						row.setValue("marketareaId", null);
						row.setMeta('marketareaId', 'display', '');
					} else {
						setTimeout(function () {
							var currentRow = viewModel.LadderPriceList.getCurrentRow();
							var currentData = currentRow.getSimpleData(),
								customerNameList = currentData.customerName.split(','),
								data = [];
							currentData.customerId = newValueArr[0];
							currentData.customerName = customerNameList[0];

							for (var i = 1; i < newValueArr.length; i++) {
								data.push({
									customerId: newValueArr[i],
									customerName: customerNameList[i],
									customercategoryName: null,
									customercategoryCode: null,
									customercategoryid: null,
									marketareaName: null,
									marketareaCode: null,
									marketareaId: null,
									id: '',
									goodsId: currentData.goodsId,
									goodsName: currentData.goodsName,
									organizationCode: currentData.organizationCode,
									organizationId: currentData.organizationId,
									organizationName: currentData.organizationName,
									goodscategoryCode: currentData.goodscategoryCode,
									goodscategoryId: currentData.goodscategoryId,
									goodscategoryName: currentData.goodscategoryName,
								})
							}
							var status = currentData.persistStatus == "new" ? "new" : "upd";
							viewModel.LadderPriceList.addSimpleData(currentData, status);
							viewModel.LadderPriceList.addSimpleData(data, 'new');
							setTimeout(function () {
								viewModel.LadderPriceList.removeRows(currentRow);
							}, 100);
						}, 100);
					}
				}

			});
			viewModel.LadderPriceList.on("customercategoryId.valuechange", function (obj) {
				if (obj.newValue) {
					var row = obj.rowObj;
					row.setValue("customerName", null);
					row.setValue("customerCode", null);
					row.setValue("customerId", null);
					row.setMeta('customerId', 'display', '');
					row.setValue("marketareaName", null);
					row.setValue("marketareaCode", null);
					row.setValue("marketareaId", null);
					row.setMeta('marketareaId', 'display', '');
				}

			});
			viewModel.LadderPriceList.off("goodsId.valuechange").on("goodsId.valuechange", function (obj) {
				if (obj.newValue) {
					var newValueArr = obj.newValue.split(',');
					if (newValueArr.length == 1) {
						var row = obj.rowObj;
						row.setValue("goodscategoryId", null);
						row.setValue("goodscategoryName", null);
						row.setValue("goodscategoryCode", null);
						row.setValue("brandId", null);
						row.setValue("brandName", null);
						row.setValue("brandCode", null);
						row.setMeta('goodscategoryId', 'display', '');
						row.setMeta('brandId', 'display', '');
					} else {
						setTimeout(function () {
							var currentRow = viewModel.LadderPriceList.getCurrentRow();
							var currentData = currentRow.getSimpleData(),
								goodsNameList = currentData.goodsName.split(','),
								data = [];
							currentData.goodsId = newValueArr[0];
							currentData.goodsName = goodsNameList[0];

							for (var i = 1; i < newValueArr.length; i++) {
								data.push({
									goodscategoryId: null,
									goodscategoryName: null,
									goodscategoryCode: null,
									brandId: null,
									brandCode: null,
									brandName: null,
									goodsId: newValueArr[i],
									goodsName: goodsNameList[i],
									organizationCode: currentData.organizationCode,
									organizationId: currentData.organizationId,
									organizationName: currentData.organizationName,
									customercategoryCode: currentData.customercategoryCode,
									customercategoryId: currentData.customercategoryId,
									customercategoryName: currentData.customercategoryName,
									customerId: currentData.customerId,
									customerCode: currentData.customerCode,
									customerName: currentData.customerName,
									marketareaId: currentData.marketareaId,
									marketareaName: currentData.marketareaName,
									marketareaCode: currentData.marketareaCode,
								});
							}
							var status = currentData.persistStatus == "new" ? "new" : "upd";
							viewModel.LadderPriceList.addSimpleData(currentData, status);
							viewModel.LadderPriceList.addSimpleData(data, 'new');
							setTimeout(function () {
								viewModel.LadderPriceList.removeRows(currentRow);
							}, 100);
						}, 100);
					}
				}
			});
			viewModel.LadderPriceList.on("goodscategoryId.valuechange", function (obj) {
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

			viewModel.LadderPriceList.on("brandId.valuechange", function (obj) {
				if (obj.newValue) {
					var row = obj.rowObj;
					row.setValue("goodsName", null);
					row.setValue("goodsCode", null);
					row.setValue("goodscategoryName", null);
					row.setValue("goodscategoryCode", null);
					row.setValue("goodsId", null);
					row.setValue("goodscategoryId", null);
					row.setMeta('goodsId', 'display', '');
					row.setMeta('goodscategoryId', 'display', '');
				}
			});
			viewModel.LadderPriceList.on("marketareaId.valuechange", function (obj) {
				if (obj.newValue) {
					var newValueArr = obj.newValue.split(',');
					if (newValueArr.length == 1) {
						var row = obj.rowObj;
						row.setValue("customercategoryName", null);
						row.setValue("customercategoryCode", null);
						row.setValue("customercategoryId", null);
						row.setMeta('customercategoryId', 'display', '');
						row.setValue("customerName", null);
						row.setValue("customerCode", null);
						row.setValue("customerId", null);
						row.setMeta('customerId', 'display', '');


					} else {
						setTimeout(function () {
							var currentRow = viewModel.LadderPriceList.getCurrentRow();
							var currentData = currentRow.getSimpleData(),
								marketAreaNameList = currentData.marketareaName.split(','),
								data = [];
							currentData.marketareaId = newValueArr[0];
							currentData.marketareaName = marketAreaNameList[0];

							for (var i = 1; i < newValueArr.length; i++) {
								data.push({
									marketareaId: newValueArr[i],
									marketareaName: marketAreaNameList[i],
									customercategoryName: null,
									customercategoryCode: null,
									id: '',
									goodsId: currentData.goodsId,
									goodsName: currentData.goodsName,
									organizationCode: currentData.organizationCode,
									organizationId: currentData.organizationId,
									organizationName: currentData.organizationName,
									goodscategoryCode: currentData.goodscategoryCode,
									goodscategoryId: currentData.goodscategoryId,
									goodscategoryName: currentData.goodscategoryName,
								})
							}
							var status = currentData.persistStatus == "new" ? "new" : "upd";
							viewModel.LadderPriceList.addSimpleData(currentData, status);
							viewModel.LadderPriceList.addSimpleData(data, 'new');
							setTimeout(function () {
								viewModel.LadderPriceList.removeRows(currentRow);
							}, 100);
						}, 100);
					}
				}

			});
		}
	});
	return view;
});