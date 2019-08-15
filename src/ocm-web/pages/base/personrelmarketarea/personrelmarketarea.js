define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate:function(){
      viewModel = this.viewModel;
    },
    model:model,
    baseData:{
      baseurl : '/base/person-rel-market-areas',
      simpleList: new u.DataTable(model.options.metas.personrelmarketareameta),
      statusField:'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,
    },
	events :u.extend({}, simpleview.prototype.events, {
		beforeEdit: function(index, rowId)			
		{
			simpleview.prototype.events.beforeEdit(index, rowId);
			var saleOrgValue = viewModel.dialogcardcomp.viewModel.params.getValue("saleOrgId");
			var saleDeptValue = viewModel.dialogcardcomp.viewModel.params.getValue("saleDeptId");
			var orgObj = {};
			var deptObj = {};
			orgObj.newValue = saleOrgValue;
			deptObj.newValue = saleDeptValue;
			viewModel.orgValChange(orgObj);
			if(saleDeptValue) {
				viewModel.deptValChange(deptObj);	
			}
		},
		orgValChange: function(obj) {
			var deptReferFilter;
			var personReferFilter;
			if(obj.newValue) {
				deptReferFilter = {
					"EQ_isEnable": "1", "EQ_dr": "0",
					"EQ_organization.id": obj.newValue,
				};
				personReferFilter = {
					"EQ_isEnable": "1", "EQ_dr": "0",
					"EQ_personPosts.organization.id": obj.newValue,
				}
			} else {
				deptReferFilter = {
                "EQ_isEnable": "1", "EQ_dr": "0",
				};
				personReferFilter = {
					"EQ_isEnable": "1", "EQ_dr": "0",
				}
			}
			if(obj.oldValue) {
				viewModel.dialogcardcomp.viewModel.params.setValue("saleDeptId", null);
				viewModel.dialogcardcomp.viewModel.params.setValue("personId", null);
			}
			$("#saleDept").attr("data-refparam", JSON.stringify(deptReferFilter));
			$("#person").attr("data-refparam", JSON.stringify(personReferFilter));
       
		},
		deptValChange: function(obj) {
			if(obj.newValue) {
				var saleOrgId = viewModel.dialogcardcomp.viewModel.params.getValue("saleOrgId");
				var personReferFilter = {
					"EQ_isEnable": "1", "EQ_dr": "0",
					"EQ_personPosts.department.id": obj.newValue
				}
			}
			if(saleOrgId) {
				personReferFilter["EQ_personPosts.organization.id"] = saleOrgId;
			}
            $("#person").attr("data-refparam", JSON.stringify(personReferFilter));
			if(obj.oldValue) {
				viewModel.dialogcardcomp.viewModel.params.setValue("personId", null);
			}
		}
	
	}),
	afterCreate: function() {
		viewModel.dialogcardcomp.viewModel.params.on("saleOrgId.valuechange", function (obj) {
			viewModel.orgValChange(obj)	
		});
		viewModel.dialogcardcomp.viewModel.params.on("saleDeptId.valuechange", function (obj) {
			viewModel.deptValChange(obj)	
        });
	}
  });

  return view;
});
