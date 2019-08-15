define(['ocm_simpleview', './meta.js', 'ocm_common'], function(simpleview, model, common) {
	'use strict'
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
		},
		model: model,
		baseData: {
			baseurl: '/fee/accounts',
			simpleList: new u.DataTable(model.options.metas.potypemeta),
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			detailSource: model.options.details.detail,
			gridOption: model.options.grids.grid1,
			enableFmt: ko.pureComputed(function() {
				var status = viewModel.simpleList.ref("isEnable")();
				switch (status) {
					case '0':
					case 0:
						return '未启用';
					case '1':
					case 1:
						return '启用';
					case '2':
					case 2:
						return '停用';
				}
			}),
			isLeafFmt: ko.pureComputed(function() {
				var status = viewModel.simpleList.ref("isLeaf")();
				var statusName
				if (status == 0) {
					statusName = "否"
				}
				if (status == 1) {
					statusName = "是"
				}
				return statusName;
			}),
			rootAccountFmt: ko.pureComputed(function() {
				var isR = viewModel.simpleList.ref("isRootAccount")();
				return isR == '1' ? '是' : '否';
			}),
			castTypeFmt: ko.pureComputed(function() {
				var status = viewModel.simpleList.ref("castTypeId")();
				switch (status) {
					case 'pay01':
						return '冲抵订单';
					case 'pay02':
						return '货补';
						// case 'pay03':
						// 	return '实物货补';
					case 'pay04':
						return '账扣';
				}
			}),
		},
		events: $.extend({}, simpleview.prototype.events, {
			refresh: function() {
				viewModel.search();
			},
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
					var comp = viewModel.dialogcardcomp.app.getComp("parentaccont");
					var compS = viewModel.dialogcardcomp.app.getComp("saleOrg");
					var compF = viewModel.dialogcardcomp.app.getComp("financeOrg");
					var compC = viewModel.dialogcardcomp.app.getComp("castType");
					comp.setEnable(true);
					compS.setEnable(false);
					compF.setEnable(false);
					compC.setEnable(false);
					//清空编辑框的信息
					viewModel.dialogcardcomp.cleareidt();
				}
				//显示模态框
				viewModel.dialogWidth ?
					viewModel.dialogcardcomp.show(
						title,
						viewModel.dialogWidth,
						viewModel.edit
					) :
					viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
			},
			//删除和批量删除
			del: function(data, rowId) {
				if (typeof data == "number") {
					viewModel.simpleList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.simpleList.getSelectedRows();
				if (rows && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].getValue("id"));
					}
					common.dialog.confirmDialog({
						msg1: "确认删除这些项？",
						msg2: "此操作不可逆",
						width: "400px",
						type: "error",
						onOk: function() {
							$._ajax({
								url: appCtx + viewModel.baseurl + "/delete",
								type: "post",
								// data: "ids=" + ids.join(","),
								data: {
									ids: ids.join(",")
								},
								success: function(data) {
									// viewModel.simpleList.removeRows(rows);
									viewModel.search();
								}
							});
						}
					});
				} else {
					toastr.warning("请至少选择一项");
				}
			},
		}),
		rendertype: $.extend({}, common.rendertype, {
			operation4single: function(obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value["$_#_@_id"];
				var curRow = viewModel.simpleList.getRowByRowId(dataTableRowId)
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
				if (curRow.getValue('isEnable') == '1') {
					obj.element.innerHTML = ''
				} else {
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
				}
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			castTypeList: function(params) {
				switch (params.value) {
					case "pay01":
						params.element.innerHTML = "冲抵订单";
						break;
					case "pay02":
						params.element.innerHTML = "货补";
						break;
						// case "pay03":
						// 	params.element.innerHTML = "实物货补";
						// 	break;
					case "pay04":
						params.element.innerHTML = "账扣";
						break;
					default:
						params.element.innerHTML = "冲抵订单";
				}
			},
		}),
		afterCreate: function() {
			// viewModel.dialogcardcomp.viewModel.params.on('isLeaf.valuechange', function(obj) {
			// 	if (!obj.newValue) return;
			// 	var rootAc = viewModel.dialogcardcomp.viewModel.params.getValue('isRootAccount');
			// 	if (obj.newValue && rootAc == 1) {
			// 		toastr.warning('根账户不可以是叶子节点！');
			// 		viewModel.dialogcardcomp.viewModel.params.setValue("isLeaf", 0);
			// 	}
			// });
			viewModel.dialogcardcomp.viewModel.params.on('isRootAccount.valuechange', function(obj) {
				if (!obj.newValue) return;
				var comp = viewModel.dialogcardcomp.app.getComp("parentaccont");
				var compS = viewModel.dialogcardcomp.app.getComp("saleOrg");
				var compF = viewModel.dialogcardcomp.app.getComp("financeOrg");
				var compC = viewModel.dialogcardcomp.app.getComp("castType");
				// var compL = viewModel.dialogcardcomp.app.getComp("checkboxleaf");
				if (obj.newValue == '1') {
					comp.setEnable(false);
					comp.setRequired(false);
					compS.setEnable(true);
					compF.setEnable(true);
					compC.setEnable(true);
					// compL.setEnable(false);
					// viewModel.dialogcardcomp.viewModel.params.setValue("isLeaf", 0);
					viewModel.dialogcardcomp.viewModel.params.setValue("parentId", null);
					comp.validate.required = false;
				} else {
					comp.setEnable(true);
					compS.setEnable(false);
					compF.setEnable(false);
					compC.setEnable(false);
					// compL.setEnable(true);
					// viewModel.dialogcardcomp.viewModel.params.setValue("isLeaf", 1);
					viewModel.dialogcardcomp.viewModel.params.setValue("parentId", null);
					comp.setRequired(true);
					comp.validate.required = true;
					// viewModel.dialogcardcomp.viewModel.params.setRequired("parentId", true)
				}
			});
			viewModel.dialogcardcomp.viewModel.params.on('parentId.valuechange', function(obj) {
				if (!obj.newValue) return;
				// var compS = viewModel.dialogcardcomp.app.getComp("saleOrg");
				// var compF = viewModel.dialogcardcomp.app.getComp("financeOrg");
				// var compC = viewModel.dialogcardcomp.app.getComp("castType");
				var refer = $('div[id ^= "refContainerparentId"]').data("uui.refer");
				var refValues = refer.values;
				if (refValues && refValues.length > 0) {
					viewModel.dialogcardcomp.viewModel.params.setValue("saleOrgId", refValues[0].saleOrgId);
					viewModel.dialogcardcomp.viewModel.params.setValue("financeOrgId", refValues[0].financeOrgId);
					viewModel.dialogcardcomp.viewModel.params.setValue("castTypeId", refValues[0].castTypeId);
				}
			})
		}
	});

	return view;
});