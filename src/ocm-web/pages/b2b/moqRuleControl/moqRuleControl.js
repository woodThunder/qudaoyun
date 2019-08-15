define(['ocm_simpleview', './meta.js', 'ocm_common', "text!./moqRuleControl.html"], function (simpleview, model, common, tpl) {
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/b2b/moq-rule-controls',
			excelurl: '/b2b-supplier-excel',
			// simpleList: new u.DataTable(model.options.metas.moqRuleManagementmeta),
			statusField: 'isEnable',
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			gridOption: model.options.grids.grid1,
			simpleList: {
				templateType: "list",
				cls: "moqCtrlStrategy"
			},
			simpleEdit: {
				templateType: "dialog",
				cls: "moqCtrlStrategy",
				dialogComp: "dialogcardcomp"
			},
			goDialogBillPanel: common.bill.goDialogBillPanel
		},
		events: u.extend({}, simpleview.prototype.events, {
			beforeEdit: function (index, rowId) {
				var title;
				viewModel.index = index;
				if (u.isNumber(index)) {
					title = "编辑";
					viewModel.goDialogBillPanel(function () {
						var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
						viewModel.rowId = rowId;
						viewModel.dialogcardcomp.seteidtData(currentData);
						viewModel.editEventListener(title);
					});
				} else {
					title = "新增";
					viewModel.goDialogBillPanel(function () {
						viewModel.dialogcardcomp.cleareidt();
						viewModel.editEventListener(title);
					});
				}
			},
			editEventListener: function (title) {
				//显示模态框
				viewModel.dialogWidth ? viewModel.dialogcardcomp.show(
					title,
					viewModel.dialogWidth,
					viewModel.edit
				) : viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);

				viewModel.dialogcardcomp.viewModel.params.on("orderTypeId.valuechange", function (obj) {
					viewModel.dialogcardcomp.viewModel.params.setValue('transTypeId', '')
					var transTypeValue = {
						"EQ_billTypeId": obj.newValue,
						"EQ_isEnable": 1,
					};
					$("#simpleEdit_transTypeId").parent().attr("data-refparam", JSON.stringify(transTypeValue));
				});
			},
			search: function (reindex) {
				if (!viewModel.searchcomp) {
					$("div.ui-searchbox").css("display", "none");
				}
				if (reindex) {
					viewModel.simpleList.pageIndex(0);
				}
				viewModel.simpleList.removeAllRows();
				if (!viewModel.searchcomp) {
					var queryData = {};
				} else {
					var queryData = viewModel.searchcomp.getDataWithOpr ?
						viewModel.searchcomp.getDataWithOpr() :
						{};
				}
				queryData.size = viewModel.simpleList.pageSize();
				queryData.page = viewModel.simpleList.pageIndex();
				$._ajax({
					type: "get",
					url: appCtx +
						(viewModel.searchBaseurl ?
							viewModel.searchBaseurl :
							viewModel.baseurl),
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.simpleList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.simpleList.totalRow(data.totalElements);
						viewModel.simpleList.totalPages(data.totalPages);
						viewModel.listTemplate.updateExtendData();
					}
				});
			}
		}),
		rendertype: u.extend({}, common.rendertype, {
			methodRender: function (obj) {
				var stateValue = viewModel.simpleList.getRow(obj.rowIndex).getValue(
					"method"
				);
				var stateName;
				if (stateValue == 1) {
					stateName = "宽松控制"
				}
				if (stateValue == 2) {
					stateName = "严格控制"
				}
				obj.element.innerHTML = stateName;
			},
			operation: function(obj) {
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
		}),
		afterCreate: function () {
			// viewModel.dialogcardcomp.viewModel.params.on("orderTypeId.valuechange", function (obj) {
			//   var transTypeValue = {
			//     "EQ_billTypeId": obj.newValue,
			//     "EQ_isEnable": 1
			//   };
			//   $("#transTypeIdInfo").attr("data-refparam", JSON.stringify(transTypeValue));
			// });
		}
	});

	return view;
});
