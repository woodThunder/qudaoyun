define(['ocm_simpleview', './meta.js', 'ocm_common', "text!./warehouseSchedule.html"], function (simpleview, model, common, tpl) {
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/dispatch/resource-schedule-configurations',
			excelurl: '/b2b-warehouse-excel',
			simpleList: new u.DataTable(model.options.metas.warehouseSchedulemeta),
			statusField: 'isEnable',
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			dialogcardcomp2: {},
			dialogcardSource2: model.options.dialogs.dialog2,
			dialogcardcomp3: {},
			dialogcardSource3: model.options.dialogs.dialog3,
			gridOption: model.options.grids.grid1,
		},
		events: u.extend({}, simpleview.prototype.events, {
			//将操作后的数据进行保存
			edit: function () {
				var result = viewModel.dialogcardcomp.validate();
				if (result.passed) {
					var index = viewModel.index;
					var currentRow, type = "post";
					var postdata = viewModel.dialogcardcomp.geteidtData();
					if (postdata.goodsId != null && postdata.goodsId != "" && postdata.productLineId != null && postdata.productLineId != "") {
						toastr.warning("产品线和商品不能同时维护！");
						return;
					}
					/*if ((postdata.saleOrgId == null || postdata.saleOrgId == "") &&
					  (postdata.provinceId == null || postdata.provinceId == "") &&
					  (postdata.cityId == null || postdata.cityId == "") &&
					  (postdata.countyId == null || postdata.countyId == "") &&
					  (postdata.townId == null || postdata.townId == "") &&
					  (postdata.productLineId == null || postdata.productLineId == "") &&
					  (postdata.goodsId == null || postdata.goodsId == "")) {
					  toastr.warning("销售组织／省／市／区／镇／产品线／商品至少维护一个数据!");
					  return;
					}*/
					postdata.type = 1;
					if (index >= 0) {
						type = "put";
					}
					//更改后台数据
					$._ajax({
						url: appCtx + viewModel.baseurl,
						type: type,
						data: JSON.stringify(postdata),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							//如果index大于等于0说明是修改
							viewModel.dialogcardcomp.close();
							if (index >= 0) {
								//获取需要修改的行
								currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
								//将用户填写的数据更新到simpleList上
							} else {
								//添加数据
								currentRow = viewModel.simpleList.createEmptyRow();
							}
							currentRow.setSimpleData(data);
						}
					})

				}
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (!viewModel.searchcomp) {
					$('div.ui-searchbox').css('display', 'none');
					// return;
				}
				if (reindex) {
					viewModel.simpleList.pageIndex(0);
				}
				viewModel.simpleList.removeAllRows();
				if (!viewModel.searchcomp) {
					var queryData = {};
				} else {
					var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				}
				queryData.size = viewModel.simpleList.pageSize();
				queryData.page = viewModel.simpleList.pageIndex();
				queryData["search_EQ_type"] = 1
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
				})
			},

			//批量调整仓库
			batchWarehouse: function (data, rowId) {
				var rows = viewModel.simpleList.getSelectedRows();
				viewModel.dialogcardcomp2.cleareidt();
				if (rows && rows.length > 0) {
					var title = "批量调整仓库"
					viewModel.dialogcardcomp2.show(title, "500px", viewModel.batchWarehouseOk);
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			//批量调整仓库保存
			batchWarehouseOk: function () {
				var rows = viewModel.simpleList.getSelectedRows();
				var data = viewModel.dialogcardcomp2.geteidtData();
				if (!data.warehouseId) {
					toastr.warning("请选择仓库");
					return;
				}
				var postdata = []
				for (var i = 0; i < rows.length; i++) {
					var temp = rows[i].getSimpleData();
					temp.warehouseId = data.warehouseId;
					temp.stockOrgId = data.stockOrgId;
					postdata.push(temp);
				}

				$._ajax({
					url: appCtx + viewModel.baseurl + '/batch-adjust',
					type: "post",
					data: JSON.stringify(postdata),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.dialogcardcomp2.close();
						viewModel.search();
					}
				})
			},

			//点击批量调整优先级
			batchPriority: function (data, rowId) {
				var rows = viewModel.simpleList.getSelectedRows();
				if (rows && rows.length > 0) {
					var title = "批量调整优先级"
					viewModel.dialogcardcomp3.show(title, "500px", viewModel.batchPriorityOk);
				} else {
					toastr.warning("请至少选择一项");
				}
			},

			//批量调整优先级保存
			batchPriorityOk: function () {
				var rows = viewModel.simpleList.getSelectedRows();
				var data = viewModel.dialogcardcomp3.geteidtData();
				var postdata = []
				var arr = [];
				for (var i = 0; i < rows.length; i++) {
					var temp = rows[i].getSimpleData();
					temp.priority = data.priority;
					postdata.push(temp);
					var str = temp.saleOrgId + temp.provinceId + temp.cityId + temp.countyId + temp.townId + temp.productLineId + temp.goodsId + temp.priority
					if (arr.indexOf(str) > -1) {
						toastr.warning("同一纬度下优先级不能重复");
						return;
					}
					arr.push(str);
				}

				$._ajax({
					url: appCtx + viewModel.baseurl + '/batch-adjust',
					type: "put",
					data: JSON.stringify(postdata),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.dialogcardcomp3.close();
						viewModel.search();
					}
				})
			},
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				searchParams["search_EQ_type"] = 1;
				var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
				var listData = viewModel.simpleList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
			},
		}),
		afterCreate: function () {
			//基本信息   省、城市、区县、街道四级联动
			viewModel.dialogcardcomp.viewModel.params.on("provinceId.valuechange", function (obj) {
				var cityValue = {
					"EQ_parent.id": obj.newValue,
					"EQ_areaLevel": 2,
					"EQ_isEnable": 1
				};
				$("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
				viewModel.dialogcardcomp.viewModel.params.setValue("cityId", "");
			});
			viewModel.dialogcardcomp.viewModel.params.on("cityId.valuechange", function (obj) {
				var countyValue = {
					"EQ_parent.id": obj.newValue,
					"EQ_areaLevel": 3,
					"EQ_isEnable": 1
				};
				$("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
				viewModel.dialogcardcomp.viewModel.params.setValue("countyId", "");
			});
			viewModel.dialogcardcomp.viewModel.params.on("countyId.valuechange", function (obj) {
				var townValue = {
					"EQ_parent.id": obj.newValue,
					"EQ_areaLevel": 4,
					"EQ_isEnable": 1
				};
				$("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
				viewModel.dialogcardcomp.viewModel.params.setValue("townId", "");
			});


			//基本信息   省、城市、区县、街道四级联动
			viewModel.searchcomp.viewModel.params.on("province.valuechange", function (obj) {
				var cityValue = {
					"EQ_parent.id": obj.newValue,
					"EQ_areaLevel": 2,
					"EQ_isEnable": 1
				};
				$("#cityIdSearch").attr("data-refparam", JSON.stringify(cityValue));
				viewModel.searchcomp.viewModel.params.setValue("city", "");
			});
			viewModel.searchcomp.viewModel.params.on("city.valuechange", function (obj) {
				var countyValue = {
					"EQ_parent.id": obj.newValue,
					"EQ_areaLevel": 3,
					"EQ_isEnable": 1
				};
				$("#countyIdSearch").attr("data-refparam", JSON.stringify(countyValue));
				viewModel.searchcomp.viewModel.params.setValue("county", "");
			});
			viewModel.searchcomp.viewModel.params.on("county.valuechange", function (obj) {
				var townValue = {
					"EQ_parent.id": obj.newValue,
					"EQ_areaLevel": 4,
					"EQ_isEnable": 1
				};
				$("#townIdSearch").attr("data-refparam", JSON.stringify(townValue));
				viewModel.searchcomp.viewModel.params.setValue("town", "");
			});
			viewModel.dialogcardcomp.viewModel.params.on("productLineId.valuechange", function (obj) {
				if (obj.newValue) {
					viewModel.dialogcardcomp.viewModel.params.setValue("goodsCategoryId", "");
					viewModel.dialogcardcomp.viewModel.params.setMeta("goodsCategoryId", "display", null);
					viewModel.dialogcardcomp.viewModel.params.setValue("goodsId", "");
					viewModel.dialogcardcomp.viewModel.params.setMeta("goodsId", "display", null);
				}
			});
			viewModel.dialogcardcomp.viewModel.params.on("goodsCategoryId.valuechange", function (obj) {
				if (obj.newValue) {
					viewModel.dialogcardcomp.viewModel.params.setValue("productLineId", "");
					viewModel.dialogcardcomp.viewModel.params.setMeta("productLineId", "display", null);
					viewModel.dialogcardcomp.viewModel.params.setValue("goodsId", "");
					viewModel.dialogcardcomp.viewModel.params.setMeta("goodsId", "display", null);
				}
			});
			viewModel.dialogcardcomp.viewModel.params.on("goodsId.valuechange", function (obj) {
				if (obj.newValue) {
					viewModel.dialogcardcomp.viewModel.params.setValue("goodsCategoryId", "");
					viewModel.dialogcardcomp.viewModel.params.setMeta("goodsCategoryId", "display", null);
					viewModel.dialogcardcomp.viewModel.params.setValue("productLineId", "");
					viewModel.dialogcardcomp.viewModel.params.setMeta("productLineId", "display", null);
				}
			});
		}
	});

	return view;
});
