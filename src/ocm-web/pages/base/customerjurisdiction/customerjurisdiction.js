define(["ocm_simpleview", "./meta.js"], function (simpleview, model) {
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function () {
			viewModel = this.viewModel;
		},
		model: model,
		baseData: {
			baseurl: "/base/customer-jurisdictions",
			excelurl: '/customerjurisdiction-excel',
			simpleList: new u.DataTable(model.options.metas.customerJurisdictionMeta),
			buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			gridOption: model.options.grids.grid1,
			dialogWidth: "900px",


		},
		events: u.extend({}, simpleview.prototype.events, {
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
				viewModel.searchcomp.viewModel.params.setMeta("saleDepartment--id", 'enable', false)
			  },
			edit1:function(){
                var rows = viewModel.simpleList.getSelectedRows();
                if(rows.length == 1){
                    viewModel.beforeEdit(1, rows[0].rowId);
				}else{
                	toastr.warning("请选择一条数据");
					return;
				}
			},
			beforeEdit: function (index, rowId) {
				simpleview.prototype.events.beforeEdit(index, rowId);
				var saleOrgValue = viewModel.dialogcardcomp.viewModel.params.getValue("saleOrganizationId");
				var saleDeptValue = viewModel.dialogcardcomp.viewModel.params.getValue("saleDepartmentId");
				var superiorCustomerValue = viewModel.dialogcardcomp.viewModel.params.getValue("superiorCustomerId");
				var orgObj = {};
				var deptObj = {};
				orgObj.newValue = saleOrgValue;
				deptObj.newValue = saleDeptValue;
				viewModel.orgValChange(orgObj);
				if (saleDeptValue) {
					viewModel.deptValChange(deptObj);
				}
				var saleOrganizationId = viewModel.dialogcardcomp.app.getComp("saleOrganizationId");
				var superiorCustomerId = viewModel.dialogcardcomp.app.getComp("superiorCustomerId");
                saleOrganizationId.setEnable(true)
                superiorCustomerId.setEnable(true)
				if(saleOrgValue!=undefined&&saleOrgValue!=""){
					saleOrganizationId.setEnable(true)
					superiorCustomerId.setEnable(false)
				}
				if(superiorCustomerValue!=undefined&&superiorCustomerValue!=""){
					superiorCustomerId.setEnable(true)
					saleOrganizationId.setEnable(false)
				}
			},
			orgValChange: function (obj) {
				var compDept = viewModel.dialogcardcomp.app.getComp("saleDepartmentId");
				var compMapnger = viewModel.dialogcardcomp.app.getComp("customerManager");
				if (obj.newValue && obj.newValue != "") {
					compDept.setEnable(true);
					compMapnger.setEnable(true);
					var deptValue = {
						"EQ_organization.id": obj.newValue,
						"EQ_isEnable": '1',
					};

					var managerValue = {
						"EQ_personPosts.organization.id": obj.newValue,
						"EQ_isEnable": '1',
					};
					$("#customerManager").attr("data-refparam", JSON.stringify(managerValue));
          $("#saleDepartmentId").attr("data-refparam", JSON.stringify(deptValue));
          
          var marketAreaValue = {
						"EQ_organization.id": obj.newValue
					};
					$("#marketAreaId").attr("data-refparam", JSON.stringify(marketAreaValue));
				} else {
					compDept.setEnable(false);
					compMapnger.setEnable(false);
				}
				if (obj.oldValue) {
					viewModel.dialogcardcomp.viewModel.params.setValue("saleDepartmentId", null);
					viewModel.dialogcardcomp.viewModel.params.setValue("customerManagerId", null);
				}
			},
			deptValChange: function (obj) {
				var saleOrgValue = viewModel.dialogcardcomp.viewModel.params.getValue("saleOrganizationId");
				var townValue = {
					"EQ_personPosts.organization.id": saleOrgValue,
					"EQ_personPosts.department.id": obj.newValue,
					"EQ_isEnable": '1',
				};
				$("#customerManager").attr("data-refparam", JSON.stringify(townValue));
				if (obj.oldValue) {
					viewModel.dialogcardcomp.viewModel.params.setValue("customerManagerId", null);
				}
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
					if (postdata.saleOrganizationId != undefined && postdata.saleOrganizationId != ""
						&& postdata.superiorCustomerId != undefined && postdata.superiorCustomerId != "") {
						toastr.warning("销售组织和渠道上级应选择其中一项");
						return;
					}
					if ((postdata.saleOrganizationId == undefined || postdata.saleOrganizationId == "")
						&& (postdata.superiorCustomerId == undefined || postdata.superiorCustomerId == "")) {
						toastr.warning("销售组织和渠道上级应选择其中一项");
						return;
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
		}),
		afterCreate: function () {
			//销售组织的编辑后事件，设置部门和客户经理的参照过滤
			viewModel.dialogcardcomp.viewModel.params.on("saleOrganizationId.valuechange", function (obj) {
				viewModel.orgValChange(obj);
				var superiorCustomerId = viewModel.dialogcardcomp.app.getComp("superiorCustomerId");
				if (obj.newValue != undefined && obj.newValue != "") {
					superiorCustomerId.setValue("");
					superiorCustomerId.setEnable(false);
				} else {
					superiorCustomerId.setEnable(true)
				}

			})
			//渠道上级的编辑后事件
			viewModel.dialogcardcomp.viewModel.params.on("superiorCustomerId.valuechange", function (obj) {
				var saleOrganizationId = viewModel.dialogcardcomp.app.getComp("saleOrganizationId");
				if (obj.newValue != undefined && obj.newValue != "") {
					saleOrganizationId.setValue("");
					saleOrganizationId.setEnable(false)
				} else {
					saleOrganizationId.setEnable(true)
				}
			})
			//部门编辑后事件，设置客户经理字段的参照过滤
			viewModel.dialogcardcomp.viewModel.params.on("saleDepartmentId.valuechange", function (obj) {
				viewModel.deptValChange(obj)
			})

			//搜索条件中的部门参照销售组织过滤
			viewModel.searchcomp.viewModel.params.setMeta("saleDepartment--id", 'enable', false)
			viewModel.searchcomp.viewModel.params.on("saleOrganization--id.valuechange", function (obj) {
				if (obj.newValue != undefined && obj.newValue != "") {
					var saleOrgValue = {
						"IN_organization.id": obj.newValue
					};
					$("#saleDepartment--id").attr("data-refparam", JSON.stringify(saleOrgValue));
					viewModel.searchcomp.viewModel.params.setMeta("saleDepartment--id", 'enable', true)
				} else {
					viewModel.searchcomp.viewModel.params.setValue("saleDepartment--id", "");
					viewModel.searchcomp.viewModel.params.setMeta("saleDepartment--id", 'enable', false)
				}
			})

			viewModel.dialogcardcomp.viewModel.params.on("productLineId.valuechange", function (obj) {
				if (obj.newValue && obj.newValue != "") {
					viewModel.dialogcardcomp.viewModel.params.setMeta("brandId", 'enable', false)
				} else {
					viewModel.dialogcardcomp.viewModel.params.setMeta("brandId", 'enable', true)
				}
			})
			viewModel.dialogcardcomp.viewModel.params.on("brandId.valuechange", function (obj) {
				if (obj.newValue && obj.newValue != "") {
					viewModel.dialogcardcomp.viewModel.params.setMeta("productLineId", 'enable', false)
				} else {
					viewModel.dialogcardcomp.viewModel.params.setMeta("productLineId", 'enable', true)
				}
			})
		}
	});

	return view;
});
