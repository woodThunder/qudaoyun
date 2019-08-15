define(['text!./agencypartition.html','ocm_common','searchbox','billfooter','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,queryViewModel,billfooter;
  baseData = {
    baseurl : '/agency-partition',
    agencypartitionList: new u.DataTable(agencypartitionmeta),
    agencypartitionChild: new u.DataTable(agencypartitionchildmeta),
    agencypartitionfakeChild: new u.DataTable(agencypartitionchildfakemeta),
    enableRadioSrc: [{value:"1",name:"启用"},{value:"0",name:"停用"}],
    enableCheckSrc: [{value:"1",name:"是"}],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    enableFormat: common.format.enableFormat,
  };
  rendertype = {
    operation: common.rendertype.operation
  };
  events = {
  		//编辑状态
	  	editHandle: function() {
	  		var self = this;
	  		$(".ui-bill-detail").hide();
	  		$(".ui-bill-panel").show();
	  		self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
	  	},
  		//判断状态
      enableHandle: function () {
      	var auditStatusValue = viewModel.agencypartitionList.getValue('isEnable');
      	if(auditStatusValue === null){
		  		viewModel.agencypartitionList.setValue('isEnable',0);
		  	}
      	var auditStatusName;
      	switch(auditStatusValue){
      		case 0:
	      		auditStatusName = '停用';
	      		break;
      		case 1:
	      		auditStatusName = '启用';
	      		break;
      		default:
      			auditStatusName = '停用';
      	}
      	return auditStatusName;
      },
      //删除和批量删除
      del: function (data,rowId) {
        var ids = [];
        var rows = [];
        if (typeof(data) == 'number') {
          viewModel.agencypartitionList.setRowSelectbyRowId(rowId);
        }
        rows = viewModel.agencypartitionList.getSelectedRows();
        if(rows.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
          }
        }
        common.dialog.confirmDialog({
          msg1: '确认删除这些项？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            $._ajax({
              url:appCtx + viewModel.baseurl + "/delete",
              type:"post",
              data: "ids=" + ids.join(","),
              success:function(data){
                viewModel.agencypartitionList.removeRows(rows);
              }
            });

          }
        });
      },
      //删除子表
      delChild: function(index) {
      	viewModel.agencypartitionChild.removeRows(index);
      },
      //点击取消 单据页
      cancelHandle: function () {
        var row = viewModel.agencypartitionList.getFocusRow();
        viewModel.agencypartitionList.removeRow(row);
        viewModel.retListPanel();
      },
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.agencypartitionList.createEmptyRow();
        viewModel.agencypartitionList.setRowFocus(curRow);
        // 删除表体页内容
        viewModel.agencypartitionChild.removeAllRows();
        curRow.setValue("isEnable", "1");
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
      },
       //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.agencypartitionList.setRowFocus(index);
        var id = viewModel.agencypartitionList.getValue("id");
        viewModel.agencypartitionList.originEditData = viewModel.agencypartitionList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
      },

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.agencypartitionList.pageIndex(0);
        }
        viewModel.agencypartitionList.removeAllRows();
        var queryData = {};
        queryData = queryViewModel.getDataWithOpr();
        queryData.size = viewModel.agencypartitionList.pageSize();
        queryData.page = viewModel.agencypartitionList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.agencypartitionList.setSimpleData(data.content,{unSelect:true});
            viewModel.agencypartitionList.totalRow(data.totalElements);
            viewModel.agencypartitionList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        queryViewModel.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.agencypartitionList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.agencypartitionList.pageSize(size);
        viewModel.search(true);
      },
      //查看详情
	    detail: function() {
	      //确保grid先将行设置为focus状态
	      setTimeout(function(){
	        var curRow = viewModel.agencypartitionList.getCurrentRow();
	        var id = curRow.getValue("id");
	        viewModel.findByParentid(id);
	        viewModel.goDetailPanel();
	        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
	      }, 0);
	    },
       //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url:appCtx + viewModel.baseurl + "/findByParentid",
          type: 'get',
          async: false,
          data: {id: id},
          success:function(data){
            viewModel.agencypartitionChild.setSimpleData(data);
          }
        })
      },
      //新增子表项
      addItem: function() {
				//弹出参照选择
				viewModel.agencypartitionfakeChild.setValue("agencyID", "");
	      var refer = $("#refContaineragencyID").data("uui.refer");
	      refer.uncheckAll();
        refer.setValue([]);
				$('#rolerefadd').find('span').trigger("click.refer");
      },
      //批量新增子表项
      // addItems: function() {
      //
      // },
      //删除子表项
      delItems: function() {
       var delRows = viewModel.agencypartitionChild.getSelectedRows();
        //遍历items设置dr=1
       for(var i = 0;i<delRows.length;i++){
          var id = delRows[i].getValue("id");
          if(id!=null){
            delRows[i].setValue("dr", "1");
          }
        }
       viewModel.agencypartitionChild.removeRows(delRows);
        // viewModel.agencypartitionChild.removeRows(viewModel.agencypartitionChild.getSelectedRows());
      },

      //保存单据
      saveBill: function() {
        var result = app.compsValidateMultiParam({element: $(".ui-bill-panel")[0], showMsg: true});
        if(!result.passed) {
          return
        }
        var realRows = viewModel.agencypartitionChild.getAllRealRows();
        // if(realRows.length == 0) {
        //   toastr.error("请录入表体行数据");
        //   return
        // }
        var agencypartitionCombineData = viewModel.agencypartitionList.getCurrentRow().getSimpleData();
        var agencypartitionChildData = viewModel.agencypartitionChild.getSimpleData();
        agencypartitionCombineData.agencyPartitionDetailSet = agencypartitionChildData;
        var _ajaxType = viewModel.agencypartitionList.getValue("id") ? "put": "post";
        $._ajax({
          url:appCtx + viewModel.baseurl,
          type:_ajaxType,
          data:JSON.stringify(agencypartitionCombineData),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            viewModel.agencypartitionList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //取消单据
      cancelBill: function() {
        var curRow = viewModel.agencypartitionList.getCurrentRow();
        // 修改，则还原
        if(curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.agencypartitionList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.agencypartitionList.removeRow(curRow);
          viewModel.agencypartitionChild.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.agencypartitionList.getSelectedRows();
        if(selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        var ids = [];
        for(var i=0;i<selectedRows.length;i++) {
          ids.push(selectedRows[i].getValue("id"));
        }
        ids = ids.join(",");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-enable",
          data: {ids: ids},
          success:function(res){
            toastr.success();
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("isEnable", "1");
            }
          }
        })
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.agencypartitionList.getSelectedRows();
        if(selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        var ids = [];
        for(var i=0;i<selectedRows.length;i++) {
          ids.push(selectedRows[i].getValue("id"));
        }
        ids = ids.join(",");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-disable",
          data: {ids: ids},
          success:function(res){
            toastr.success();
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("isEnable", "0");
            }
          }
        })
      }
  }
  viewModel = u.extend({},baseData,events,common.rendertype,rendertype);



  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    queryViewModel = new searchbox(
      $("#agencypartition-searchcontent")[0],
      [
        {
          type:"text",
          key:"code",
          label:"分区编码",
        },
        {
          type:"text",
          key:"name",
          label:"分区名称",
        },
        {
          type:"refer",
          key:"parent--id",
          refinfo:"agencypartitionfilterbodys",
          label:"上级分区名称",
        },
        // {
        //   type:"text",
        //   key:"creator",
        //   label:"创建人",
        // },
        // {
        //   type:"checkbox",
        //   key:"isEnable",
        //   label:"是否启用",
        //   checkedValue:1,
        //   unCheckedValue:0
        // }
        {
            type:"radio",
            key:"isEnable",
            label:"启用状态",
            dataSource:CONST.ENABLESTATUSISALL,
          },
      ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){

    //绑定输入框enter事件
    $('#agencypartition-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
      //多选参照
	  viewModel.agencypartitionfakeChild.on('agencyID.valuechange', function(obj) {
		  	// 清空参照时不增行(点取消)
	      if(!obj.newValue) {
	        return;
	      }
		    var ref = $('#refContaineragencyID').data('uui.refer');

        if (ref.values.length > 0) {
            for (var i = 0; i < ref.values.length; i++) {
                var arr = [];
                var agencyCode = ref.values[i].refcode;
                var agencyName = ref.values[i].refname;
                var id = ref.values[i].id;
                arr.push({
                    "agencyCode": agencyCode,
                    "agencyName": agencyName,
                    "agencyID": id
                })
                var row = viewModel.agencypartitionChild.getRowByField('agencyCode', agencyCode);
                if (!row) {
//                  viewModel.agencypartitionChild.addSimpleData(arr);
                    var newrow = viewModel.agencypartitionChild.createEmptyRow({unSelect: true});
				            newrow.setValue("agencyCode", agencyCode);
				            newrow.setValue("agencyName", agencyName);
				            newrow.setValue("agencyID", id);
                }
            }
        }
		});
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    var refRow = viewModel.agencypartitionfakeChild.createEmptyRow();
    viewModel.agencypartitionfakeChild.setRowFocus(refRow);
       window.vm = viewModel;
  }

  return {
    init: init
  }
});
