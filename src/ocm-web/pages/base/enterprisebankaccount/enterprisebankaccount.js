define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      dialogWidth: '900px',
      baseurl: '/base//enterprise-bank-accounts',
      simpleList: new u.DataTable(model.options.metas.EnterpriseBankAccountMeta),
      statusField: 'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      detailSource: model.options.details.detail1,
      gridOption: model.options.grids.grid1,
      //是否启用
      enableFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("isEnable")();
        var statusName
        if (status == 0) {
          (statusName = "未启用")
        }
        if (status == 1) {
          (statusName = "已启用")
        }
        if (status == 2) {
          (statusName = "已停用")
        }
        return statusName;
      }),
    },
    events: u.extend({}, simpleview.prototype.events, {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index, rowId) {
        var title;
        viewModel.index = index;
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
		  var id = viewModel.simpleList.getRowByRowId(rowId).getSimpleData().id;
          var currentData = viewModel.getById(id);
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增"
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogWidth ?
          viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
          viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },
	  getById: function(id) {
		  var retData;
		  $._ajax({
            url: appCtx + viewModel.baseurl + '/get-by-id/' + id,
            type: 'get',
			async: false,
            success: function (data) {
				retData = data;	
			}
          })
		  return retData;
	  },
	  detailRender: function() {
	  
	  }
    }),
    afterCreate: function () {

    }
  });

  return view;
});

