define([
	"text!./supporttypesetting.html",
	"ocm_simpleview",
	"./meta.js",
	"ocm_common"
], function (tpl, simpleview, model, common) {
	var viewModel;
	var view = simpleview.extend({
		tpl: tpl,
		rendertype: Object.assign({
			// 规则设置rendertype
			fullruleSet: function (obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value["$_#_@_id"];
				var delfun =
					"data-bind=click:fullruleFn.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";

				obj.element.innerHTML =
					'<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a href="#" ' +
					delfun +
					' title="规则设置">规则设置</a>' +
					"</span></div>";
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			// 单表操作
			operation4rule: function (obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value["$_#_@_id"];
				var delfun =
					"data-bind=click:ruledel.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";
				var editfun =
					"data-bind=click:addruleFn.bind($data," +
					obj.rowIndex +
					"," +
					dataTableRowId +
					")";

				obj.element.innerHTML =
					'<div class="ui-handle-icon">' +
					'<span class="ui-handle-word">' +
					'<a href="#" ' +
					editfun +
					' title="编辑">编辑</a>' +
					"</span>    " +
					'<span class="ui-handle-word">' +
					'<a href="#" ' +
					delfun +
					' title="删除">删除</a>' +
					"</span></div>";
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			// 规则设置rendertype
			dimensionFn: function (params) {
				params.element.innerHTML = "";
				/*默认1表示启用，0表示停用*/
				if (params.value && params.value == "1") {
					params.element.innerHTML = "数量";
				} else if (params.value && params.value == "2") {
					params.element.innerHTML = "体积";
				} else {
					params.element.innerHTML = "重量";
				}
			},
			// 显示单位rendertype
			unitShowFn: function (params) {
				setTimeout(function () {
					params.element.innerHTML = "";
					if (params.value) {
						params.element.innerHTML =
							params.value +
							(params.row.value.weightUnitName ||
								params.row.value.volumeUnitName || "");
					}
				}, 0)
			}
		}, common.rendertype),
		events: u.extend({}, simpleview.prototype.events,{
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var templateUrl = "/tray-excel/downloadExcelTemplate"; //导出模板地址参数
				var excelDataUrl = "/tray-excel/excelDataExport"; //导出数据地址参数
				var listData = viewModel.simpleList; //需要导出表格的dataTable
				var ele = $("#exportFiel")[0]; //挂载元素
				common.fileHandle.exportFile(
					listData,
					ele,
					searchParams,
					templateUrl,
					excelDataUrl
				);
			},
			//导入
            importHandle: function() {
                var urlInfo = "/tray-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/tray-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1, function(data) {
					console.log(data)
					viewModel.simpleList.addSimpleData(data);
				});
			},
			item_exportHandle: function () {
				var searchParams = {};
				var templateUrl = "/tray-rule-excel/downloadExcelTemplate"; //导出模板地址参数
				var excelDataUrl = "/tray-rule-excel/excelDataExport"; //导出数据地址参数
				var listData = viewModel.rulessimpleList; //需要导出表格的dataTable
				var ele = $("#exportFiel")[0]; //挂载元素
				common.fileHandle.exportFile(
					listData,
					ele,
					searchParams,
					templateUrl,
					excelDataUrl
				);
			},
			//导入
            item_importHandle: function() {
                var urlInfo = "/tray-rule-excel/excelDataImport"; //倒入地址参数
                var urlStatusInfo = "/tray-rule-excel/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1, function(data) {
					console.log(data)
					viewModel.rulessimpleList.addSimpleData(data);
				});
            }
		}),
		beforeCreate: function () {
			viewModel = this.viewModel;
			// 进入规则页面
			viewModel.fullruleFn = function (val, rowId) {
				viewModel.trayId;
				var supttypeId = viewModel.simpleList.getRowByRowId(rowId).data.id
					.value;
				viewModel.trayId = supttypeId;
				viewModel.rulesearch(supttypeId);
				viewModel.goBillPanel();
			};
			// 返回
			viewModel.goback = function () {
				//返回列表页
				$(".ui-panel").hide();
				$(".ui-list-panel").show();
				$(".ui-list-panel").animateCss("fadeIn");
			};
			// 规则新增
			viewModel.addruleFn = function (index, rowId) {
				var title;
				viewModel.index = index;
				if (u.isNumber(index)) {
					//修改操作
					title = "编辑";
					var currentData = viewModel.rulessimpleList
						.getRowByRowId(rowId)
						.getSimpleData();
					viewModel.rowId = rowId;
					viewModel.rulesdialogcardcomp.seteidtData(currentData);
				} else {
					title = "新增";
					//清空编辑框的信息
					viewModel.rulesdialogcardcomp.cleareidt();
				}
				//显示模态框
				viewModel.dialogWidth
					? viewModel.rulesdialogcardcomp.show(
						title,
						viewModel.dialogWidth,
						viewModel.ruleedit
					)
					: viewModel.rulesdialogcardcomp.show(
						title,
						"500px",
						viewModel.ruleedit
					);
			};
			// 规则编辑
			viewModel.ruleedit = function () {
				var editVerify = function (postdata) {
					switch (postdata.dimension.toString()) {
						case "1":
							if (
								postdata.goodsNumber &&
								!isNaN(postdata.goodsNumber) &&
								!postdata.volumeUnitId &&
								!postdata.weightUnitId
							) {
								if (
									postdata.goodsNumber.toString().indexOf(".") != -1 &&
									postdata.goodsNumber.toString().split(".")[1].length > -1
								) {
									toastr.warning("请输入整数");
									return true;
								} else {
									return false;
								}
							} else {
								toastr.warning(
									"选择数量，则数量（整数）必须输入，且其他单位勿输入！"
								);
								return true;
							}
						case "2":
							if (
								postdata.maxVolume &&
								!isNaN(postdata.maxVolume) &&
								postdata.volumeUnitId &&
								!postdata.weightUnitId
							) {
								if (
									postdata.maxVolume.toString().indexOf(".") != -1 &&
									postdata.maxVolume.toString().split(".")[1].length > 2
								) {
									toastr.warning("输入的值请保留两位小数");
									return true;
								} else {
									return false;
								}
							} else {
								toastr.warning(
									"选择体积，则体积（保留两位小数的数字）和体积单位必须输入，且其他单位勿输入！"
								);
								return true;
							}
						default:
							if (
								postdata.maxWeight &&
								!isNaN(postdata.maxWeight) &&
								postdata.weightUnitId &&
								!postdata.volumeUnitId
							) {
								if (
									postdata.maxWeight.toString().indexOf(".") != -1 &&
									postdata.maxWeight.toString().split(".")[1].length > 2
								) {
									toastr.warning("输入的值请保留两位小数");
									return true;
								} else {
									return false;
								}
							} else {
								toastr.warning(
									"选择重量，则重量（保留两位小数的数字）和重量单位必须输入，且其他单位勿输入！"
								);
								return true;
							}
					}
				};
				var result = viewModel.rulesdialogcardcomp.validate();
				if (result.passed) {
					var index = viewModel.index;
					var currentRow,
						type = "post";
					var postdata = viewModel.rulesdialogcardcomp.geteidtData();
					//  对新增保存时有其他需求的校验添加的方法（命名editExtend） ---syf
					if (editVerify(postdata)) {
						return;
					}
					if (index >= 0) {
						type = "put";
					}
					// 将托型的id赋给子表
					postdata.trayId = viewModel.trayId;
					//更改后台数据
					$._ajax({
						url: appCtx + viewModel.rulebaseurl,
						type: type,
						data: JSON.stringify(postdata),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							//如果index大于等于0说明是修改
							viewModel.rulesdialogcardcomp.close();
							if (index >= 0) {
								//获取需要修改的行
								currentRow = viewModel.rulessimpleList.getRowByRowId(
									viewModel.rowId
								);
								//将用户填写的数据更新到rulessimpleList上
							} else {
								//添加数据
								currentRow = viewModel.rulessimpleList.createEmptyRow();
							}
							currentRow.setSimpleData(data);
						}
					});
				}
			};
			// 规则删除
			viewModel.ruledel = function (data, rowId) {
				if (typeof data == "number") {
					viewModel.rulessimpleList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.rulessimpleList.getSelectedRows();
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].getValue("id"));
					}
					common.dialog.confirmDialog({
						msg1: "确认删除这些项？",
						msg2: "此操作不可逆",
						width: "400px",
						type: "error",
						onOk: function () {
							$._ajax({
								url: appCtx + viewModel.rulebaseurl + "/delete",
								type: "post",
								// data: "ids=" + ids.join(","),
								data: {
									ids: ids.join(",")
								},
								success: function (data) {
									viewModel.rulesearch();
								}
							});
						}
					});
				} else {
					toastr.warning("请至少选择一项");
				}
			};
			// 规则查询
			viewModel.rulesearch = function (reindex) {
				if (!viewModel.rulessearchcomp) {
					$("div.ui-searchbox").css("display", "none");
					// return;
				}

				viewModel.rulessimpleList.removeAllRows();

				if (!reindex) {
					var queryData = {};
				} else {
					var queryData = reindex ? { search_EQ_tray: reindex } : {};
				}
				queryData.size = viewModel.rulessimpleList.pageSize();
				queryData.page = viewModel.rulessimpleList.pageIndex();
				$._ajax({
					type: "get",
					url: appCtx + viewModel.rulebaseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.rulessimpleList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.rulessimpleList.totalRow(data.totalElements);
						viewModel.rulessimpleList.totalPages(data.totalPages);
					}
				});
			};
		},
		model: model,
		baseData: {
			goBillPanel: common.bill.goBillPanel,

			//托型设置
			baseurl: "/b2b/tray-managements",
			simpleList: new u.DataTable(model.options.metas.poControlRulemeta),
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			gridOption: model.options.grids.grid1,

			// 托型规则设置
			rulebaseurl: "/b2b/filled-tray-rules",
			rulessimpleList: new u.DataTable(model.options.metas.ruleSettingmeta),
			rulesbuttonSource: model.options.buttons.button2,
			rulessearchcomp: {},
			rulesdialogcardcomp: {},
			rulesdialogcardSource: model.options.dialogs.dialog2,
			rulesgridOption: model.options.grids.grid2,
			calcTypeFmt: ko.pureComputed(function () {
				var status = viewModel.simpleList.ref("calcType")();
				switch (status) {
					case 1:
						return "按天数";
					case 2:
						return "按固定日";
				}
			})
		}
	});
	return view;
});
