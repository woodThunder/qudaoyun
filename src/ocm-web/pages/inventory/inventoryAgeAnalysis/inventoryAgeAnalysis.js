define(['text!./inventoryAgeAnalysis.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
	'use strict'
	var viewModel, app;
	var view = baseview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
			app = this.app;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/stock/warehouse-analysis/find',
			simpleList: new u.DataTable(model.options.metas.simplemeta),
			analysisRange: new u.DataTable(model.options.metas.analysisRange),
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			button1Source: model.options.buttons.button1,
			gridOption: model.options.grids.grid1,
			dateObj: {},
			//可用量 availablenum
			availablenum: ko.observable(0),

			//预计可用量
			willavailablenum: ko.observable(0),
			//现存量 onhandnum
			onhandnum: ko.observable(0),
			analysisRange: [{
					value: "0",
					name: "库存组织"
				},
				{
					value: "1",
					name: "仓库"
				},

			],
			default: "0",
			queryType: "0"
		},
		rendertype: common.rendertype,
		events: {
			//弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
			beforeEdit: function (index, rowId) {
				var title;
				viewModel.index = index;
				if (index >= 0) {
					//修改操作
					title = "编辑";
					var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
					viewModel.rowId = rowId;
					viewModel.dialogcardcomp.seteidtData(currentData);
				} else {
					title = "新增"
					//清空编辑框的信息
					viewModel.dialogcardcomp.cleareidt();
				}
				//显示模态框
				viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
			},
			//将操作后的数据进行保存
			edit: function () {
				var result = viewModel.dialogcardcomp.validate();
				if (result.passed) {
					var index = viewModel.index;
					var currentRow, type = "post";
					var postdata = viewModel.dialogcardcomp.geteidtData();
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
			//删除和批量删除
			del: function (data, rowId) {
				if (typeof (data) == 'number') {
					viewModel.simpleList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.simpleList.getSelectedRows();
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].getValue("id"));
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
									viewModel.simpleList.removeRows(rows);
								}
							});
						}
					});
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex, isFrist) {
				if (!isFrist) {  // 用来判断是否是首次进入，首次进入默认不操作
					return;
				}
				if (reindex) {
					viewModel.simpleList.pageIndex(0);
				}
				viewModel.simpleList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				queryData.queryType = viewModel.queryType;
				var pageSize = viewModel.simpleList.pageSize();
				var pageNumber = viewModel.simpleList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;
				var data = [];
				//循环获取input的值
				$("#gjbadaius input").each(function (index, item) {
					data.push($(item).val());
				});
				for (var i = 0; i < data.length; i++) {
					queryData["search_EQ_date" + (i + 1)] = data[i];
				}

				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.simpleList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.simpleList.totalRow(data.totalElements);
						viewModel.simpleList.totalPages(data.totalPages);
						var dateEx = data.content[0];
						var arr = [];
						for (var key in dateEx) {
							if (key.indexOf("date") !== -1) {
								viewModel.dateObj[key] = dateEx[key];
							}
						}
						for (var key in viewModel.dateObj) {
							if (viewModel.dateObj[key]) {
								arr.push(viewModel.dateObj[key]);
							}
						}

						if (viewModel.app.getComp("grid_simple1")) {
							var grid = viewModel.app.getComp("grid_simple1").grid;

							for (var i = 1; i <= arr.length; i++) {
								grid.getColumnByField("num" + i).options.title = viewModel.dateObj["date" + i];
								grid.getColumnByField("num" + i).options.visible = true;

							}
							grid.gridCompColumnArr.forEach(function (item) {
								if (item.options.field.indexOf("num") == 0) {
									if (dateEx[item.options.field] == null) {
										item.options.visible = false;
									}
								}

							});
							grid.repaintGridDivs();
						}
						//可用量 availablenum
						viewModel.availablenum(viewModel.getSum(data.content, "availablenum"));
						//现存量 onhandnum
						viewModel.onhandnum(viewModel.getSum(data.content, "onhandnum"));
						//预计可用量 willavailablenum
						viewModel.willavailablenum(viewModel.getSum(data.content, "willAvailablenum"));
					}
				})
			},
			// 求和
			getSum: function (data, field) {
				for (var i = 0, result = 0; i < data.length; i++) {
					result += parseFloat(data[i][field]);
				};
				return result || 0;
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.simpleList.pageIndex(index);
				viewModel.search(false, 'NoFrist');
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.simpleList.pageSize(size);
				viewModel.search(true, 'NoFrist');
			},
			//启用
			enable: function () {
				var selectedRows = viewModel.simpleList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function (row, index, arr) {
						return row.getValue("id");
					})
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-enable",
						data: {
							ids: ids.join(",")
						},
						success: function (res) {
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("isEnable", "1");
							}
						}
					})
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
					})
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-disable",
						data: {
							ids: ids.join(",")
						},
						success: function (res) {
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("isEnable", "0");
							}
						}
					});
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
				var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
				var listData = viewModel.simpleList; //需要导出表格的dataTable
				var ele = $('#exportFiel')[0]; //挂载元素
				var typeArr = [{
					value: false,
					name: "导出数据"
				}]; //导出类型
				common.fileHandle.exportFileType(listData, ele, searchParams, templateUrl, excelDataUrl, typeArr);
			},
			//库龄时段添加
			inventoryAgeAdd: function () {
				var html = [
					// '<div class="ui-inputarea" type="text" 0">'+
					'<span style="padding:0 10px 0 10px">~</span>' +
					'<input type="text" style="width:50px"/>'
					// '</div>'
					// '<input type="text" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,"");}).call(this)" onblur="this.v();" style="width:50px"/>'
				].join('');
				// var aDom = document.getElementsByClassName('inventoryDate');
				// for(var i=0;i<aDom.length;i++){
				//   aDom[i].id=''+i+Math.floor(Math.random()*10000)
				// }
				$('#gjbadaius').append(html);
				// $('#gjbadaius').find('input').last().after("<span style=\"padding:0 10px 0 10px\">~</span> <input type=\"text\" style=\"width:50px\"/>");
			},
			//库龄时段删除
			inventoryAgeDel: function () {
				$('#gjbadaius').find('input').last().remove();
				$('#gjbadaius').find('span').last().remove();
			},
		},
		//
		afterCreate: function () {
			// viewModel.search();
			// var grid = app.getComp("grid_simple1").grid;
			app = this.app;

			//搜索条件 库存组织仓库过滤
			viewModel.searchcomp.viewModel.params.on("org.valuechange", function (obj) {
				if (obj.newValue != undefined && obj.newValue != "") {
					var stockOrgId = {
						"EQ_inventoryOrg.id": obj.newValue
					};
					$("#warehouse").attr("data-refparam", JSON.stringify(stockOrgId));
				} else {
					$("#warehouse").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
					viewModel.searchcomp.viewModel.params.setValue("warehouse", "");
				}
			});

			// 监听input
			$('#gjbadaius').on('change', 'input',
				function () {
					var result = parseInt($(this).val());
					var data1 = [];
					var data2 = [];
					data1 = $(this).prevAll("input")
					for (var i = 0; i < data1.length; i++) {
						data1[i] = parseInt($(data1[i]).val());
						if (data1[i] == "" && data1[i] == undefined) {

						} else if (data1[i] == result || data1[i] > result) {
							toastr.warning("输入的日期需要比前一天大");
							$(this).val("");
							return;
						} else if (data1[i] < result) {

						}
					}
					data2 = ($(this).nextAll("input"))
					for (var i = 0; i < data2.length; i++) {
						data2[i] = parseInt($(data2[i]).val());
						if (data2[i] == "" && data2[i] == undefined) {

						} else if (data2[i] < result || data2[i] == result) {
							toastr.warning("输入的日期需要比后一天小");
							$(this).val("");
							return;
						} else if (data2[i] > result) {

						}
					}

				});
		}
	});
	return view;
});