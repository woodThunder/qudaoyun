define([
	"ocm_simpleview",
	"./meta.js",
	"ocm_common",
	"text!./moqRuleManagement.html"
  ], function(simpleview, model, common, tpl) {
	var viewModel;
	var view = simpleview.extend({
	  beforeCreate: function() {
		viewModel = this.viewModel;
	  },
	  tpl: tpl,
	  model: model,
	  baseData: {
		baseurl: "/b2b/moq-control-rules",
		allRuleurl: "/b2b/moq-control-rule-items",
		rowRuleurl: "/b2b/moq-row-rules",
		saveCHeckurl: "/b2b/moq-row-rules/check-unique",
		excelurl: "/b2b-supplier-excel",
		simpleList: new u.DataTable(model.options.metas.moqRuleControlmeta),
		allRuleList: new u.DataTable(model.options.metas.allRulemeta),
		rowRuleList: new u.DataTable(model.options.metas.rowRulemeta),
		statusField: "isEnable",
		button1Source: model.options.buttons.button1,
		button2Source: model.options.buttons.button2,
		button3Source: model.options.buttons.button3,
		button4Source: model.options.buttons.button4,
		button5Source: model.options.buttons.button5,
		searchcomp: {},
		searchSource: model.options.searchs.search1,
		dialogcardcomp: {},
		dialogcardSource: model.options.dialogs.dialog1,
		grid1Option: model.options.grids.grid1,
		grid2Option: model.options.grids.grid2,
		grid3Option: model.options.grids.grid3
	  },
	  rendertype: u.extend({}, common.rendertype, {
		// 单表操作
		operation4single: function(obj) {
		  var viewModel = obj.gridObj.viewModel;
		  var dataTableRowId = obj.row.value["$_#_@_id"];
		  var delfun =
			"data-bind=click:del.bind($data," +
			obj.rowIndex +
			"," +
			dataTableRowId +
			")";
		  var editfun =
			"data-bind=click:beforeEdit.bind($data," +
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
		allOperationAllRule: function(obj) {
		  var viewModel = obj.gridObj.viewModel;
		  var dataTableRowId = obj.row.value["$_#_@_id"];
		  var flag = "allRule";
		  var allRuleFun =
			"data-bind=click:allRuleFun.bind($data," +
			obj.rowIndex +
			"," +
			dataTableRowId +
			"," +
			'"' +
			flag +
			'"' +
			")";
  
		  obj.element.innerHTML =
			'<div class="ui-handle-icon">' +
			'<span class="ui-handle-word">' +
			'<a href="#" ' +
			allRuleFun +
			' title="整单调整规则">整单调整规则</a>' +
			"</span>    " +
			"</div>";
		  ko.cleanNode(obj.element);
		  ko.applyBindings(viewModel, obj.element);
		},
		operationAllRule: function(obj) {
		  var viewModel = obj.gridObj.viewModel;
		  var dataTableRowId = obj.row.value["$_#_@_id"];
		  var flag = "rowRule";
  
		  var allRuleFun =
			"data-bind=click:allRuleFun.bind($data," +
			obj.rowIndex +
			"," +
			dataTableRowId +
			"," +
			'"' +
			flag +
			'"' +
			")";
  
		  obj.element.innerHTML =
			'<div class="ui-handle-icon">' +
			'<span class="ui-handle-word">' +
			'<a href="#" ' +
			allRuleFun +
			' title="单行调整规则">单行调整规则</a>' +
			"</span>    " +
			"</div>";
		  ko.cleanNode(obj.element);
		  ko.applyBindings(viewModel, obj.element);
		},
		//优先维度
		limitTypeRender: function(obj) {
		  var stateValue = viewModel.simpleList
			.getRow(obj.rowIndex)
			.getValue("limitType");
		  var stateName;
		  if (stateValue == 1) {
			stateName = "数量";
		  }
		  if (stateValue == 2) {
			stateName = "重量";
		  }
		  if (stateValue == 3) {
			stateName = "体积";
		  }
		  obj.element.innerHTML = stateName;
		},
		ruleTypeRender: function(obj) {
		  /* var stateValue = viewModel.simpleList
			.getRow(obj.rowIndex)
			.getValue("limitType") ||viewModel.simpleList
			.getRow(obj.rowIndex)
			.getValue("limitTypeRow"); */
			var stateValue = obj.value;
		  var stateName ='';
		  if (stateValue == 1) {
			stateName = "仅整单";
		  }
		  if (stateValue == 2) {
			stateName = "仅单行";
		  }
		  if (stateValue == 3) {
			stateName = "单行或整单";
		  }
		  if (stateValue == 4) {
			stateName = "单行且整单";
		  }
		  obj.element.innerHTML = stateName;
		},
  
		beforeEditCheck: function(obj) {
		  var colIndex = obj.colIndex;
		  if (colIndex == "4") {
			var provinceId = viewModel.allRuleList
			  .getRow(obj.rowIndex)
			  .getValue("provinceId");
			if (!provinceId) {
			  toastr.warning("请先选择所在省份");
			  return false;
			} else {
			  viewModel.allRuleList.meta.cityId.refparam =
				'{"EQ_areaLevel":"2","EQ_parent.id":"' + provinceId + '"}';
			  return true;
			}
		  } else if (colIndex == "5") {
			var cityId = viewModel.allRuleList
			  .getRow(obj.rowIndex)
			  .getValue("cityId");
			if (!cityId) {
			  toastr.warning("请先选择所在城市");
			  return false;
			} else {
			  viewModel.allRuleList.meta.countyId.refparam =
				'{"EQ_areaLevel":"3","EQ_parent.id":"' + cityId + '"}';
			  return true;
			}
		  } else {
			return true;
		  }
		}
	  }),
	  events: u.extend({}, simpleview.prototype.events, {
		//返回列表页
		retListPanel: common.bill.retListPanel,
		//跳转单据页
		goBillPanel: common.bill.goBillPanel,
		//弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
		beforeEdit: function(index, rowId) {
		  var title;
		  viewModel.index = index;
		  if (u.isNumber(index)) {
			//修改操作
			title = "编辑";
			var currentData = viewModel.simpleList
			  .getRowByRowId(rowId)
			  .getSimpleData();
			viewModel.rowId = rowId;
			viewModel.dialogcardcomp.seteidtData(currentData);
		  } else {
			title = "新增";
			//清空编辑框的信息
			viewModel.dialogcardcomp.cleareidt();
		  }
		  //显示模态框
		  viewModel.dialogWidth
			? viewModel.dialogcardcomp.show(
				title,
				viewModel.dialogWidth,
				viewModel.edit
			  )
			: viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
		},
  
		allRuleFun: function(index, rowId, isAll) {
		  viewModel.goBillPanel();
		  viewModel.rowId = rowId;
		  $("#baseInfo").show();
		  $("#baseInfo_show").hide();
		  //设置tab显示基本信息
		  $(".ui-bill-panel .u-tabs__tab")
			.eq(0)
			.addClass("is-active")
			.siblings(".u-tabs__tab")
			.removeClass("is-active");
		  $(".ui-bill-panel .u-tabs__panel")
			.eq(0)
			.addClass("is-active")
			.siblings(".u-tabs__panel")
			.removeClass("is-active");
		  var currentData = viewModel.simpleList
			.getRowByRowId(viewModel.rowId)
			.getSimpleData();
		  var id = currentData.id;
		  viewModel.rowRuleList.removeAllRows();
		  viewModel.allRuleList.removeAllRows();
		  var url = appCtx + viewModel.allRuleurl + "/find-by-parent";
		  if (isAll && isAll == "allRule") {
			$("#gridOptionInfo1").show();
			$("#gridOptionInfo2").hide();
		  } else {
			url = appCtx + viewModel.rowRuleurl + "/find-by-parent";
			$("#gridOptionInfo2").show();
			$("#gridOptionInfo1").hide();
		  }
  
		  $._ajax({
			type: "get",
			url: url,
			dataType: "json",
			data: { pid: id },
			success: function(data) {
			  if (isAll && isAll == "allRule") {
				viewModel.allRuleList.setSimpleData(data, {
				  unSelect: true
				});
			  } else {
				viewModel.rowRuleList.setSimpleData(data, {
				  unSelect: true
				});
			  }
			}
		  });
		},
  
		saveAllRuleHandle: function() {
		  var currentData = viewModel.simpleList
			.getRowByRowId(viewModel.rowId)
			.getSimpleData();
		  var allRealRuleDatas = viewModel.allRuleList.getRealSimpleData();
		  var allRuleDatas = viewModel.allRuleList.getSimpleData();
		  for (var i = 0; i < allRealRuleDatas.length; i++) {
			for (var j = i + 1; j < allRealRuleDatas.length; j++) {
			  if (allRealRuleDatas[i].priority == allRealRuleDatas[j].priority) {
				toastr.warning("权重不能相同！");
				return;
			  }
			}
			if (allRuleDatas[i].persistStatus != "fdel") {
			  switch (currentData.limitType) {
				case 1:
				  if (
					allRuleDatas[i].quantity == null ||
					allRuleDatas[i].quantity == "" ||
					(allRuleDatas[i].weight && allRuleDatas[i].weight != "") ||
					(allRuleDatas[i].volume && allRuleDatas[i].volume != "")
				  ) {
					toastr.warning("限制类型为整单数量");
					return;
				  }
				  break;
				case 2:
				  if (
					allRuleDatas[i].weight == null ||
					allRuleDatas[i].weight == "" ||
					(allRuleDatas[i].quantity &&
					  allRuleDatas[i].quantity != "") ||
					(allRuleDatas[i].volume && allRuleDatas[i].volume != "")
				  ) {
					toastr.warning("限制类型为整单重量");
					return;
				  }
				  break;
				case 3:
				  if (
					allRuleDatas[i].volume == null ||
					allRuleDatas[i].volume == "" ||
					(allRuleDatas[i].weight && allRuleDatas[i].weight != "") ||
					(allRuleDatas[i].quantity && allRuleDatas[i].quantity != "")
				  ) {
					toastr.warning("限制类型为整单体积");
					return;
				  }
			  }
			}
		  }
		  currentData.moqWholeRules = allRuleDatas;
		  currentData.persistStatus = "upd";
		  $._ajax({
			url: appCtx + viewModel.baseurl,
			type: "put",
			data: JSON.stringify(currentData),
			contentType: "application/json; charset=utf-8",
			success: function() {
			  viewModel.retListPanel();
			  viewModel.search();
			}
		  });
		},
  
		saveRowRuleHandle: function() {
		  var currentData = viewModel.simpleList
			.getRowByRowId(viewModel.rowId)
			.getSimpleData();
		  var rowRuleDatas = viewModel.rowRuleList.getSimpleData();
		  currentData.moqRowRules = rowRuleDatas;
		  currentData.persistStatus = "upd";
		  // $._ajax({
		  //   url: appCtx + viewModel.saveCHeckurl,
		  //   type: "post",
		  //   data: JSON.stringify(rowRuleDatas),
		  //   contentType: "application/json; charset=utf-8",
		  //   success: function() {
		  $._ajax({
			url: appCtx + viewModel.baseurl,
			type: "put",
			data: JSON.stringify(currentData),
			contentType: "application/json; charset=utf-8",
			success: function() {
			  viewModel.retListPanel();
			  viewModel.search();
			}
		  });
		  // }
		  // });
		},
  
		//将操作后的数据进行保存
		edit: function() {
		  var result = viewModel.dialogcardcomp.validate();
		  if (result.passed) {
			var index = viewModel.index;
			var currentRow,
			  type = "post";
			var postdata = viewModel.dialogcardcomp.geteidtData();
			var linkOrgs = [];
			var linkOrgsIds = postdata.linkOrgsId.split(",");
			if (linkOrgsIds && linkOrgsIds.length > 0) {
			  for (var i = 0; i < linkOrgsIds.length; i++) {
				linkOrgs.push({ stockOrgId: linkOrgsIds[i] });
			  }
			}
			postdata.linkOrgs = linkOrgs;
			var linkCustomers = [];
			var linkCustomersIds = postdata.linkCustomersId.split(",");
			if (linkCustomersIds && linkCustomersIds.length > 0) {
			  for (var i = 0; i < linkCustomersIds.length; i++) {
				linkCustomers.push({ customerId: linkCustomersIds[i] });
			  }
			}
			postdata.linkCustomers = linkCustomers;
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
				viewModel.search();
			  }
			});
		  }
		},
		//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
		search: function(reindex) {
		  if (!viewModel.searchcomp) {
			$("div.ui-searchbox").css("display", "none");
			// return;
		  }
		  if (reindex) {
			viewModel.simpleList.pageIndex(0);
		  }
		  viewModel.simpleList.removeAllRows();
		  if (!viewModel.searchcomp) {
			var queryData = {};
		  } else {
			var queryData = viewModel.searchcomp.getDataWithOpr
			  ? viewModel.searchcomp.getDataWithOpr()
			  : {};
		  }
		  queryData.size = viewModel.simpleList.pageSize();
		  queryData.page = viewModel.simpleList.pageIndex();
		  $._ajax({
			type: "get",
			url:
			  appCtx +
			  (viewModel.searchBaseurl
				? viewModel.searchBaseurl
				: viewModel.baseurl),
			dataType: "json",
			data: queryData,
			success: function(data) {
			  var arr = data.content;
			  if (arr && arr.length > 0) {
				for (var i = 0; i < arr.length; i++) {
				  if (arr[i].linkOrgs && arr[i].linkOrgs.length > 0) {
					var linkOrgs = arr[i].linkOrgs;
					var linkOrgsIds = "";
					var linkOrgsNames = "";
					for (var j = 0; j < linkOrgs.length; j++) {
					  linkOrgsIds += linkOrgs[j].stockOrgId;
					  linkOrgsIds += ",";
					  linkOrgsNames += linkOrgs[j].stockOrgName;
					  linkOrgsNames += ",";
					}
					linkOrgsIds = linkOrgsIds.substring(
					  0,
					  linkOrgsIds.length - 1
					);
					linkOrgsNames = linkOrgsNames.substring(
					  0,
					  linkOrgsNames.length - 1
					);
					arr[i].linkOrgsId = linkOrgsIds;
					arr[i].linkOrgsName = linkOrgsNames;
				  }
				  if (arr[i].linkCustomers && arr[i].linkCustomers.length > 0) {
					var linkCustomers = arr[i].linkCustomers;
					var linkCustomersIds = "";
					var linkCustomersNames = "";
					for (var j = 0; j < linkCustomers.length; j++) {
					  linkCustomersIds += linkCustomers[j].customerId;
					  linkCustomersIds += ",";
					  linkCustomersNames += linkCustomers[j].customerName;
					  linkCustomersNames += ",";
					}
					linkCustomersIds = linkCustomersIds.substring(
					  0,
					  linkCustomersIds.length - 1
					);
					linkCustomersNames = linkCustomersNames.substring(
					  0,
					  linkCustomersNames.length - 1
					);
					arr[i].linkCustomersId = linkCustomersIds;
					arr[i].linkCustomersName = linkCustomersNames;
				  }
				}
			  }
			  viewModel.simpleList.setSimpleData(arr, {
				unSelect: true
			  });
			  viewModel.simpleList.totalRow(data.totalElements);
			  viewModel.simpleList.totalPages(data.totalPages);
			}
		  });
		},
		//子表 删除和批量删除
		delRow: function(dataTable) {
		  var rows = viewModel[dataTable].getSelectedRows();
		  viewModel[dataTable].removeRows(rows);
		},
		//子表增行
		addRow: function(dataTable) {
		  viewModel[dataTable].createEmptyRow();
		  viewModel.currentFlag = 0;
		},
		//返回
		backPanel: function() {
		  viewModel.search();
		  viewModel.retListPanel();
		},
		chooseOneFn: function(obj) {
		  var objData = obj.rowObj.getSimpleData();
		  var arrData = [
			"goodsId",
			"goodsCategoryId",
			"productId",
			"specification",
			"model",
			"productLineId",
			"brandId",
			"productCombineId"
		  ];
		  arrData.splice(arrData.indexOf(obj.field), 1);
		  arrData.forEach(function(item) {
			if (objData[item]) {
			  if (
				obj.rowObj.data[item].meta &&
				obj.rowObj.data[item].meta.display
			  ) {
				obj.rowObj.data[item].meta.display = "";
			  }
			  obj.rowObj.setValue(item, "");
			}
		  });
		}
	  }),
	  afterCreate: function() {
		viewModel.rowRuleList.on("goodsId.valuechange", function(obj) {
		  if (obj.newValue) {
			viewModel.chooseOneFn(obj);
		  }
		});
		viewModel.rowRuleList.on("goodsCategoryId.valuechange", function(obj) {
		  if (obj.newValue) {
			viewModel.chooseOneFn(obj);
		  }
		});
  
		viewModel.rowRuleList.on("productId.valuechange", function(obj) {
		  if (obj.newValue) {
			viewModel.chooseOneFn(obj);
		  }
		});
  
		viewModel.rowRuleList.on("specification.valuechange", function(obj) {
		  if (obj.newValue) {
			viewModel.chooseOneFn(obj);
		  }
		});
  
		viewModel.rowRuleList.on("model.valuechange", function(obj) {
		  if (obj.newValue) {
			viewModel.chooseOneFn(obj);
		  }
		});
  
		viewModel.rowRuleList.on("productLineId.valuechange", function(obj) {
		  if (obj.newValue) {
			viewModel.chooseOneFn(obj);
		  }
		});
  
		viewModel.rowRuleList.on("brandId.valuechange", function(obj) {
		  if (obj.newValue) {
			viewModel.chooseOneFn(obj);
		  }
		});
  
		viewModel.rowRuleList.on("productCombineId.valuechange", function(obj) {
		  if (obj.newValue) {
			viewModel.chooseOneFn(obj);
		  }
		});
  
		viewModel.rowRuleList.on("isExclude.valuechange", function(obj) {
		  if (obj.newValue == 1) {
			obj.rowObj.setValue("quantity", "");
			obj.rowObj.setValue("weight", "");
			obj.rowObj.setValue("volume", "");
		  }
		});
		viewModel.rowRuleList.on("volume.valuechange", function(obj) {
		  if (obj.rowObj.getValue("isExclude") == 1) {
			obj.rowObj.setValue("volume", "");
		  }
		});
		viewModel.rowRuleList.on("weight.valuechange", function(obj) {
		  if (obj.rowObj.getValue("isExclude") == 1) {
			obj.rowObj.setValue("weight", "");
		  }
		});
		viewModel.rowRuleList.on("quantity.valuechange", function(obj) {
		  if (obj.rowObj.getValue("isExclude") == 1) {
			obj.rowObj.setValue("quantity", "");
		  }
		});
  
		//  //   省、城市、区县、街道四级联动
		//  viewModel.allRuleList.on("provinceId.valuechange", function (obj) {
		//   var grid = viewModel.app.getComp("grid_moqControlRuleItem").grid;
		//   if (obj.newValue != obj.oldValue) {
		//       viewModel.allRuleList.setValue("cityId", "");
		//       viewModel.allRuleList.setValue("cityCode", "");
		//       viewModel.allRuleList.setValue("cityName", "");
		//       viewModel.allRuleList.setValue("countyId", "");
		//       viewModel.allRuleList.setValue("countyName", "");
		//       if (obj.rowObj.data.cityId.meta) {
		//           obj.rowObj.data.cityId.meta.display = "";
		//       }
		//       if (obj.rowObj.data.countyId.meta) {
		//           obj.rowObj.data.countyId.meta.display = "";
		//       }
		//       grid.repaintGridDivs();
		//   }
		// });
		// viewModel.allRuleList.on("cityId.valuechange", function (obj) {
		//   var grid = viewModel.app.getComp("grid_moqControlRuleItem").grid;
		//   if (obj.newValue != obj.oldValue) {
		//       viewModel.allRuleList.setValue("countyId", "");
		//       viewModel.allRuleList.setValue("countyName", "");
		//       if (obj.rowObj.data.countyId.meta) {
		//           obj.rowObj.data.countyId.meta.display = "";
		//       }
		//       grid.repaintGridDivs();
		//   }
		// });
	  }
	});
  
	return view;
  });
  