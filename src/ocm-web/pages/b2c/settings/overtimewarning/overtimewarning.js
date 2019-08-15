define(['text!./overtimewarning.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
	'use strict'
	var viewModel, appCtx = "/occ-b2c";
	var view = baseview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/b2c/early-warnings',
			simpleList: new u.DataTable(model.options.metas.listmeta),
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			gridOption: model.options.grids.grid1,
			warnType: function(obj) {
				var showValue = obj.value == "1" ? "审核预警" : "发货预警";
				obj.element.innerHTML = showValue;
			},
		},
		rendertype: common.rendertype,
		events: {
			//弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
			beforeEdit: function(index, rowId) {
				var title;
				viewModel.index = index;
				if (index >= 0) {
					//修改操作
					title = "编辑";
					var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
					var time = currentData.time,
						dPos = time.indexOf('天'),
						hPos = time.indexOf('小时'),
						mPos = time.indexOf('分'),
						sPos = time.indexOf('秒');
					currentData.day = dPos - 1 ? 0 : time.substring(0, dPos);
					currentData.hour = hPos == -1 ? 0 : time.substring(dPos + 1, hPos);
					currentData.minute = mPos == -1 ? 0 : hPos != -1 ? time.substring(hPos + 2, mPos) : time.substring(hPos + 1, mPos);
					currentData.second = sPos == -1 ? 0 : time.substring(mPos + 1, sPos);
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
			edit: function() {
				var result = viewModel.dialogcardcomp.validate();
				if (result.passed) {
					var index = viewModel.index;
					var currentRow, type = "post";
					var postdata = viewModel.dialogcardcomp.geteidtData();
					var d = postdata.day || 0,
						h = postdata.hour || 0,
						m = postdata.minute || 0,
						s = parseInt(postdata.second) || 0;
					if (d) {
						d = d * 86400;
					}
					if (h) {
						h = h * 3600;
					}
					if (m) {
						m = m * 60;
					}
					postdata.time = d + h + m + s;
					if (index >= 0) {
						type = "put";
					}
					//更改后台数据
					$._ajax({
						url: appCtx + viewModel.baseurl,
						type: type,
						data: JSON.stringify(postdata),
						contentType: "application/json; charset=utf-8",
						success: function(data) {
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
							var str = ''
							var time = parseInt(data.time);
							if (time) {
								var di = parseInt(time / 86400),
									rD = time - di * 86400;
								var hi = parseInt(rD / 3600),
									rH = rD - hi * 3600;
								var mi = parseInt(rH / 60),
									si = rH - mi * 60;
								if (di) {
									str += di + '天';
								}
								if (hi) {
									str += hi + '小时';
								}
								if (mi) {
									str += mi + '分';
								}
								if (si) {
									str += si + '秒';
								}
							}
							data.time = str;
							currentRow.setSimpleData(data);
						}
					})

				}
			},
			//删除和批量删除
			del: function(data, rowId) {
				if (typeof(data) == 'number') {
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
						onOk: function() {
							$._ajax({
								url: appCtx + viewModel.baseurl + "/delete",
								type: "post",
								// data: "ids=" + ids.join(","),
								data: {
									ids: ids.join(",")
								},
								success: function(data) {
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
			search: function(reindex) {
				if (reindex) {
					viewModel.simpleList.pageIndex(0);
				}
				viewModel.simpleList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
				queryData.size = viewModel.simpleList.pageSize();
				queryData.page = viewModel.simpleList.pageIndex();
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function(data) {
						for (var i = 0, len = data.content.length; i < len; i++) {
							var time = parseInt(data.content[i].time);
							if (time) {
								var d = parseInt(time / 86400),
									rD = time - d * 86400;
								var h = parseInt(rD / 3600),
									rH = rD - h * 3600;
								var m = parseInt(rH / 60),
									s = rH - m * 60;
								// data.content[d].day = d;
								// data.content[d].hour = h;
								// data.content[d].minute = m;
								// data.content[d].second = s;
								var str = '';
								if (d) {
									str += d + '天';
								}
								if (h) {
									str += h + '小时';
								}
								if (m) {
									str += m + '分';
								}
								if (s) {
									str += s + '秒';
								}
								data.content[i].time = str;
							}
						}
						viewModel.simpleList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.simpleList.totalRow(data.totalElements);
						viewModel.simpleList.totalPages(data.totalPages);
					}
				})
			},
			//清空搜索条件
			cleanSearch: function() {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function(index) {
				viewModel.simpleList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function(size) {
				viewModel.simpleList.pageSize(size);
				viewModel.search(true);
			},
			//启用
			enable: function() {
				var selectedRows = viewModel.simpleList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function(row, index, arr) {
						return row.getValue("id");
					})
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-enable",
						data: {
							ids: ids.join(",")
						},
						success: function(res) {
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
			disable: function() {
				var selectedRows = viewModel.simpleList.getSelectedRows();
				if (selectedRows && selectedRows.length > 0) {
					var ids = selectedRows.map(function(row, index, arr) {
						return row.getValue("id");
					})
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-disable",
						data: {
							ids: ids.join(",")
						},
						success: function(res) {
							for (var i = 0; i < selectedRows.length; i++) {
								selectedRows[i].setValue("isEnable", "0");
							}
						}
					});
				} else {
					toastr.warning("请至少选择一项");
				}
			},
		},
		afterCreate: function() {
			viewModel.search();
		}
	});

	return view;
});