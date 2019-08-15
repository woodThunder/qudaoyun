define(['text!./adjustmentfloatingcoefficient.html','ocm_common','searchbox','billfooter'/*,'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js'*/,'editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter/*,bpmopenbill*/) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,singledocSearch,billfooter,wholeSaleBasePriceDialog,singledocSearchChild,singledocSearchChildDetail;
  baseData = {
    baseurl : '/float-coeff-adjust',
    baseurlChild: '/float-coeff-adjust-det',
    searchUrl: '/float-coeff-def',
    AdjustmentFloatingCoefficientList: new u.DataTable(AdjustmentFloatingCoefficient),
    AdjustmentFloatingCoefficientItems: new u.DataTable(AdjustmentFloatingCoefficientItem),
    DemoItemRefList: new u.DataTable(DemoItemRef),
    WholeSaleBasePrice: new u.DataTable(adjustmentRef),
    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    enableRadioSrc: [{value:"1",name:"启用"},{value:"0",name:"停用"}],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
 		//销售渠道 枚举值集合
    saleChannelDataSource:ko.observableArray([]),
    //业务标识枚举
    orderTypeDataSource:ko.observableArray([]),
  };
  rendertype = {
    operation: common.rendertype.operation4auth,
    detailRender: common.rendertype.detailRender,
    //判断表格里的状态
	  approveFormat: function (obj) {
	  	var showValue = obj.value == "1" ? "已审核" : "未审核";
      obj.element.innerHTML = showValue;
	  },
	  //启用状态
	  enabledGrid: function (obj) {
	  	var showValue = obj.value == "1" ? "启用" : "停用";
      obj.element.innerHTML = showValue;
	  }
  };
  events = {
  	//点击返回
  	retListPanelFun: function(){
  		viewModel.retListPanel();
  		viewModel.AdjustmentFloatingCoefficientItems.pageIndex(0);
  	},
  	//时间限制
  	disabledBegin: function(current){
  		var endTime = viewModel.AdjustmentFloatingCoefficientItems.getValue("endTime");
  		if(endTime){
  			endTime = new Date(endTime).getTime();
  			if(current) {
	  				current = new Date(current.format("YYYY-MM-DD")).getTime();
	  		}
  			return current && current > endTime;
  		}
  	},
  	disabledEnd: function(current){
  		var beginTime = viewModel.AdjustmentFloatingCoefficientItems.getValue("beginTime");
  		if(beginTime){
  			beginTime = new Date(beginTime).getTime();
  			if(current) {
	  				current = new Date(current.format("YYYY-MM-DD")).getTime();
	  		}
  			 return current && current < beginTime;
  		}
  	},
    //导入
      importHandle: function() {
        var urlInfo = '/float-coeff-adjust-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/float-coeff-adjust-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportHandle: function() {
          var searchParams = searcher.getDataWithOpr(); //搜索查询参数
          var templateUrl = '/float-coeff-adjust-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/float-coeff-adjust-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.AdjustmentFloatingCoefficientList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          var judgeAuditStatus = true; //是否有审核条件导出限制，如果导出类型选择导出需修改的数据，已审核则不能导出
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl,judgeAuditStatus);
      },
  	//编辑状态
  	editHandle: function() {
  		$(".searchChild-btn").show();
  		var self = this;
  		var isauditStatus = viewModel.AdjustmentFloatingCoefficientList.getValue("auditStatus");
    	if(isauditStatus == "1" || isauditStatus == 1){
    		toastr.warning("该数据已审核不能编辑");
    		return;
    	}
  		$(".ui-bill-detail").hide();
  		$(".ui-bill-panel").show();
  		self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
  		viewModel.AdjustmentFloatingCoefficientItems.pageIndex(0);
  		viewModel.searchChildFun();
  	},
  	//点击参照按钮
    referClick: function() {
    	var isFloatCoefficientCode = viewModel.AdjustmentFloatingCoefficientList.getValue("floatCoefficientCode");
    	if(!isFloatCoefficientCode){
    		//TODO
    		toastr.warning('请选择上浮系数编码');
    		return;
    	}
    	var self = this;
    	singledocSearch.clearSearch();
    	viewModel.singledocSearch(true);
    	wholeSaleBasePriceDialog = u.dialog({id:'wholeSaleBasePriceDialog',content:"#dialog_content_wholesalebaseprice",width:"80%"});
    	var okButton = $("#dialog_content_wholesalebaseprice .u-msg-ok");
			okButton.unbind("click").click(function(){
				self.referOk();
				wholeSaleBasePriceDialog.close();
			});
			var okCancel = $("#dialog_content_wholesalebaseprice .u-msg-cancel");
			okCancel.unbind("click").click(function(){
				wholeSaleBasePriceDialog.close();
			});
    },
    //确定
    referOk: function() {
    	var self = this;
    	var selectedRows = viewModel.WholeSaleBasePrice.getAllPageSelectedRows();
    	if(selectedRows.length < 1) return;
    	//清id
    	self.refRow(selectedRows);
    	var selectedRowsData = viewModel.WholeSaleBasePrice.getSimpleData({type:"select"});
    	var selectedItemRows = viewModel.AdjustmentFloatingCoefficientItems.getAllRows();
    	if(selectedItemRows.length < 1){
    		//如果子表没数据直接添加所选
    		for(var b = 0; b < selectedRows.length; b++){
    				var emptyRow = viewModel.AdjustmentFloatingCoefficientItems.createEmptyRow();
						emptyRow.setSimpleData(selectedRows[b].getSimpleData(),"new");
						emptyRow.setValue("remark","");
    		}
//  		viewModel.AdjustmentFloatingCoefficientItems.addSimpleData(selectedRowsData,"new");

    	}else{
    		//如果子表存在数据则需要进行判重再添加
    		var itemsStringArr = [];
    		for(var i = 0; i < selectedItemRows.length; i++){
    			itemsStringArr.push(self.stringRow(selectedItemRows[i]))
    		}
    		//进行判重
    		for(var a = 0; a < selectedRows.length; a++){
    			var nowRowString = self.stringRow(selectedRows[a]);
					if(itemsStringArr.indexOf(nowRowString) < 0){
						var emptyRow = viewModel.AdjustmentFloatingCoefficientItems.createEmptyRow();
						emptyRow.setSimpleData(selectedRows[a].getSimpleData(),"new");
						emptyRow.setValue("remark","");
					}
    		}
    	}
    },
    //选择参照的需要去掉id，并把状态改为‘new’
    refRow: function(rowArr) {
    	for(var i = 0; i < rowArr.length; i++){
    		rowArr[i].setValue("id","");
    	}
    },
    //获取参照选中行的值 拼接成字符串 进行比较
    //需要6个字段值
    stringRow: function(row) {
    	var stringArr = [ row.getValue("orderTypeCode"),
    									  row.getValue("productGroupName"),
    									  row.getValue("saleChannelCode"),
    										row.getValue("agencyName"),
    										row.getValue("customerName"),
    										row.getValue("beginTime"),
    										row.getValue("endTime"),
    									];
   		return stringArr.join("@");
    },
    //参照弹出框 搜索
    singledocSearch: function(reindex) {
    	var self = this;
    	//当前主表Id
    	var currentId = viewModel.AdjustmentFloatingCoefficientList.getCurrentRow().getValue("floatCoefficientId");
    	if(reindex){
        viewModel.WholeSaleBasePrice.pageIndex(0);
        viewModel.WholeSaleBasePrice.clear();
      }
//  	viewModel.WholeSaleBasePrice.removeAllRows();

      var queryData = singledocSearch.getDataWithOpr();
      var pageSize = viewModel.WholeSaleBasePrice.pageSize();
      var pageNumber = viewModel.WholeSaleBasePrice.pageIndex();
      queryData['search_EQ_floatCoefficient.id'] = currentId;
      queryData['search_EQ_isEnable'] = '1';
      queryData.page = pageNumber;
      queryData.size = pageSize;
      $._ajax({
        type:"get",
        url:appCtx + viewModel.searchUrl,
        dataType:"json",
        data:queryData,
        success:function(data){
        	self.rewriteFun(data);


//        viewModel.WholeSaleBasePrice.setSimpleData(data.content,{unSelect:true});
//        viewModel.WholeSaleBasePrice.totalRow(data.totalElements);
//        viewModel.WholeSaleBasePrice.totalPages(data.totalPages);
        }
      })
    },
    //重新组织数据结构在写入
    rewriteFun: function(con) {
    	var pageIndex = viewModel.WholeSaleBasePrice.pageIndex();
	    var status = 'nrm';
	    var rows = new Array();
	    for (var i = 0; i < con.numberOfElements; i++) {
	        var row = {},
	            data = {},
	            status = status;
	        data.name = 'name-' + pageIndex + '-' + i;
	        data.currency = pageIndex * 10 + i;
	        row.data = con.content[i];
	        row.status = status;
	        rows.push(row);
	    }
	    viewModel.WholeSaleBasePrice.setData({
	        pageIndex: pageIndex,
	        totalPages: con.totalPages,
	        totalRow: con.totalElements,
	        pages:[{
								index:pageIndex,
								select:[],
								current: -1,
								rows:rows
							}]
	    }, {
	        unSelect: true
	    });
    },
  	//页码改变时的回调函数-批发基础价
    pageChangePrice: function (index) {
    	if(!viewModel.WholeSaleBasePrice.getPage(index)){
//  		viewModel.WholeSaleBasePrice.pageIndex(index);
      	viewModel.singledocSearch();
    	}
    },
    //页码改变时的回调函数-批发基础价
    sizeChangePrice: function (size) {
      viewModel.WholeSaleBasePrice.pageSize(size);
      viewModel.singledocSearch(true);
    },
    //清空搜索条件-参照
    cleanSingledocSearch: function () {
      singledocSearch.clearSearch();
    },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)--子表
	  searchChild: function (reindex) {
	    if(reindex){
	      viewModel.AdjustmentFloatingCoefficientItems.pageIndex(0);
	    }
	    if(viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT){
	  		var flag = false;
	  		var childRows = viewModel.AdjustmentFloatingCoefficientItems.getAllRows();
	  		if(childRows.length > 0){
	  			for(var i = 0; i < childRows.length; i++){
	  				var status = childRows[i].status;
	  				if(status != 'nrm'){
	  					flag = true;
	  				}
	  			}
	  		}
	  		if(flag){
	  			common.dialog.confirmDialog({
		        msg1: '当前有修改，是否先保存后搜索？',
		        msg2: '此操作不可逆',
		        width: '400px',
		        type: 'error',
		        onOk: function () {
		          viewModel.saveBill(-2);
		        },
		        onCancel: function(){
		        }
		      });
	  		}else{
	  			viewModel.searchChildFun();
	  		}
	  	}else{
				viewModel.searchChildFun();
	  	}
	  },
	  //搜索子表方法
	  searchChildFun: function(){
  		viewModel.AdjustmentFloatingCoefficientItems.removeAllRows();
	    var id = viewModel.AdjustmentFloatingCoefficientList.getCurrentRow().getValue("id");
	    var queryData = viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL?singledocSearchChildDetail.getDataWithOpr():singledocSearchChild.getDataWithOpr();
	    queryData.size = viewModel.AdjustmentFloatingCoefficientItems.pageSize();
	    queryData.page = viewModel.AdjustmentFloatingCoefficientItems.pageIndex();
	    queryData['search_EQ_floatCoefficientAdjust.id'] = id;
	    $._ajax({
	      type:"get",
	      url:appCtx + viewModel.baseurl+'/findByFloatCoefficientAdjustId',
	      dataType:"json",
	      data:queryData,
	      success:function(data){
	        viewModel.AdjustmentFloatingCoefficientItems.setSimpleData(data.content,{unSelect:true});
	        viewModel.AdjustmentFloatingCoefficientItems.totalRow(data.totalElements);
	        viewModel.AdjustmentFloatingCoefficientItems.totalPages(data.totalPages);
	      }
	    })
  	},
	  //清空搜索条件--子表
	  cleanSearchChild: function () {
	  	if(viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL){
	  		singledocSearchChildDetail.clearSearch();
	  	}else{
	  		singledocSearchChild.clearSearch();
	  	}
	  },
	  //改变页码之前
	  beforPageChangeFun: function(index){
  		var flag = false;
  		var childRows = viewModel.AdjustmentFloatingCoefficientItems.getAllRows();
  		if(childRows.length > 0){
  			for(var i = 0; i < childRows.length; i++){
  				var status = childRows[i].status;
  				if(status != 'nrm'){
  					flag = true;
  				}
  			}
  		}
  		if(flag){
  			common.dialog.confirmDialog({
	        msg1: '当前有修改，是否先保存后跳转？',
	        msg2: '此操作不可逆',
	        width: '400px',
	        type: 'error',
	        onOk: function () {
	          viewModel.saveBill(index);
	        },
	        onCancel: function(){
	        }
	      });
  		}else{
  			viewModel.AdjustmentFloatingCoefficientItems.pageIndex(index);
  			viewModel.searchChildFun();
  		}
	  },
	  //页码改变时的回调函数--子表
	  pageChangeChild: function (index) {
				viewModel.AdjustmentFloatingCoefficientItems.pageIndex(index);
				viewModel.searchChildFun();
	  },
	  //页码改变时的回调函数--子表
	  sizeChangeChild: function (size) {
	    viewModel.AdjustmentFloatingCoefficientItems.pageSize(size);
	    viewModel.searchChild();
	  },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if(reindex){
        viewModel.AdjustmentFloatingCoefficientList.pageIndex(0);
      }
      viewModel.AdjustmentFloatingCoefficientList.removeAllRows();
      var queryData = searcher.getDataWithOpr();
      var pageSize = viewModel.AdjustmentFloatingCoefficientList.pageSize();
      var pageNumber = viewModel.AdjustmentFloatingCoefficientList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl,
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.AdjustmentFloatingCoefficientList.setSimpleData(data.content,{unSelect:true});
          viewModel.AdjustmentFloatingCoefficientList.totalRow(data.totalElements);
          viewModel.AdjustmentFloatingCoefficientList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      searcher.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.AdjustmentFloatingCoefficientList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.AdjustmentFloatingCoefficientList.pageSize(size);
      viewModel.search(true);
    },
    //删除和批量删除
    del: function (data,rowId) {
      if (typeof(data) == 'number') {
        viewModel.AdjustmentFloatingCoefficientList.setRowSelectbyRowId(rowId);
      }
      var ids = [];
      var rows = viewModel.AdjustmentFloatingCoefficientList.getSelectedRows();
      if(rows.length < 1){
      	toastr.warning("请选择数据");
      	return;
      }
      if(rows&&rows.length>0){
        for(var i = 0;i<rows.length;i++){
        	var isauditStatus = rows[i].getValue("auditStatus");
        	if(isauditStatus == "1" || isauditStatus == 1){
		    		toastr.warning('该数据已审核不能删除');
		    		return;
		    	}
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
            data:{
              ids:ids.join(",")
            },
            success:function(data){
              viewModel.AdjustmentFloatingCoefficientList.removeRows(rows);
            }
          });
        }
      });
    },
    //进入新增单据页
    showAddBillPanel: function() {
    	$(".searchChild-btn").hide();
      $(".searchChild-area").hide();
    	//清空参照缓存
    	viewModel.WholeSaleBasePrice.removeAllRows();
      var curRow = viewModel.AdjustmentFloatingCoefficientList.createEmptyRow();
      viewModel.AdjustmentFloatingCoefficientList.setRowFocus(curRow);
      curRow.setValue("auditStatus", "0");
      viewModel.goBillPanel();
      viewModel.AdjustmentFloatingCoefficientItems.removeAllRows();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
    },
    //进入修改单据页
    showEditBillPanel: function(index) {
    	$('.searchChild-btn').show();

    	//清空参照缓存
    	viewModel.WholeSaleBasePrice.removeAllRows();
    	var isauditStatus = viewModel.AdjustmentFloatingCoefficientList.getRow(index).getValue("auditStatus");
    	if(isauditStatus == "1" || isauditStatus == 1){
    		toastr.warning("该数据已审核不能编辑");
    		return;
    	}
      viewModel.AdjustmentFloatingCoefficientList.setRowFocus(index);
      viewModel.AdjustmentFloatingCoefficientList.originEditData = viewModel.AdjustmentFloatingCoefficientList.getFocusRow().getSimpleData();
      singledocSearchChild.clearSearch();
			viewModel.searchChildFun();
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
    },
    //进入复制单据页
//  showCopyBillPanel: function() {
//  	$('#searchChild-btn').show();
//    var selectedRows = viewModel.AdjustmentFloatingCoefficientList.getSelectedRows();
//    // 只支持单一复制，批量复制需单独处理
//    if(selectedRows.length != 1) {
//      toastr.warning('请选择一条要复制的行');
//      return;
//    }
//    var copyRow = selectedRows[0];
//    var curRow = viewModel.AdjustmentFloatingCoefficientList.createEmptyRow();
//    curRow.setSimpleData(copyRow.getSimpleData());
//    curRow.setValue("auditStatus","0");
//    curRow.status = "new";
//    viewModel.AdjustmentFloatingCoefficientList.setRowFocus(curRow);
//    var id = copyRow.getValue("id");
//    //查询子表数据
//    viewModel.findByParentid(id);
//    //删除主表主键，编码，审计信息
//    viewModel.clearBaseProp(curRow);
//
//    //删除子表主键，子表主表关联
//    var subRows = viewModel.AdjustmentFloatingCoefficientItems.getAllRows();
//    for(var i=0; i<subRows.length; i++) {
//      viewModel.clearBaseProp(subRows[i]);
////      subRows[i].setValue("parentId", "");
//      subRows[i].status = "new";
//    }
//    viewModel.goBillPanel();
//    viewModel.billPanelStatus = CONST.BILLPANELSTATUS.COPY;
//  },
    //详情
    detail: function() {
    	$('.searchChild-btn').show();
      //确保grid先将行设置为focus状态
      setTimeout(function(){
      	singledocSearchChildDetail.clearSearch();
        viewModel.searchChildFun();
        var id = viewModel.AdjustmentFloatingCoefficientList.getValue("id");
        //加入bpm按钮
        //viewModel.initBPMFromBill(id,viewModel);
        viewModel.goDetailPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
      }, 0);
    },
    //查询子表数据
//  findByParentid: function(id) {
//    $._ajax({
//      url:appCtx + viewModel.baseurl + "/findByFloatCoefficientAdjustId",
//      type: 'get',
//      async: false,
//      data: {id: id},
//      success:function(data){
//        viewModel.AdjustmentFloatingCoefficientItems.setSimpleData(data);
//      }
//    })
//  },
    // 清除基类属性
//  clearBaseProp: function(row) {
//    row.setValue("id", "");
//    row.setValue("code", "");
//    row.setValue("name", "");
//    row.setValue("creator", "");
//    row.setValue("creationTime", "");
//    row.setValue("modifier", "");
//    row.setValue("modifiedTime", "");
//  },
    //新增子表项
    addItem: function() {
      viewModel.AdjustmentFloatingCoefficientItems.createEmptyRow({unSelect:true});
    },
    //删除子表项
    delItems: function() {
      var selectedRows = viewModel.AdjustmentFloatingCoefficientItems.getSelectedRows();
      if(selectedRows.length < 1){
      		toastr.warning("请选择数据");
      		return;
      }
      viewModel.AdjustmentFloatingCoefficientItems.removeRows(selectedRows);
    },
    //保存单据
    saveBill: function(index) {
    	var type = "post";
    	if(viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY){
    		type = "put";
    	}
      var productCombineData = viewModel.AdjustmentFloatingCoefficientList.getCurrentRow().getSimpleData();
      var AdjustmentFloatingCoefficientItemsData = viewModel.AdjustmentFloatingCoefficientItems.getSimpleData();
      productCombineData.floatCoefficientAdjustDets = AdjustmentFloatingCoefficientItemsData;
      var validate = $("#validate")[0];
      var result = app.compsValidateMultiParam({element:validate,showMsg:true});
      if(result.passed){
      	$._ajax({
            url:appCtx + viewModel.baseurl,
            type: type,
            data:JSON.stringify(productCombineData),
            contentType : "application/json; charset=utf-8",
            success:function(data){
              viewModel.AdjustmentFloatingCoefficientList.getFocusRow().setSimpleData(data);
              toastr.success();
              if(index == -1){
              	viewModel.retListPanel();
              	viewModel.search();
              	viewModel.AdjustmentFloatingCoefficientItems.pageIndex(0);
              	$("#paginationChild select").prop("disabled",false);
              }else if(index == -2){
              	 viewModel.searchChildFun();
              }else{
              	viewModel.AdjustmentFloatingCoefficientItems.pageIndex(0);
              	viewModel.searchChildFun();
              }
            }
          });
      }
    },
    //取消单据
    cancelBill: function() {
      var curRow = viewModel.AdjustmentFloatingCoefficientList.getCurrentRow();
      // 修改，则还原
      if(curRow.getValue("id")) {
        curRow.setSimpleData(viewModel.AdjustmentFloatingCoefficientList.originEditData)
      }
      // 新增或复制，则删除
      else {
        viewModel.AdjustmentFloatingCoefficientList.removeRow(curRow);
        viewModel.AdjustmentFloatingCoefficientItems.removeAllRows();
      }
      viewModel.retListPanel();
      viewModel.AdjustmentFloatingCoefficientItems.pageIndex(0);
      $("#paginationChild select").prop("disabled",false);
    },
    //审核
	  auditHandle: function () {
	  	var selectRowsArr = viewModel.AdjustmentFloatingCoefficientList.getSelectedRows();
	  	if(selectRowsArr.length !== 1){
	  		toastr.warning("请选择一条数据");
	  		return;
	  	};
	  	if(selectRowsArr[0].getValue("auditStatus") == "1" || selectRowsArr[0].getValue("auditStatus") == 1){
	  		toastr.warning("已经审核");
	  		return;
	  	}
	  	var ids = selectRowsArr.map(function(row, index, arr) {
        return row.getValue("id");
      });
	  	$._ajax({
	      url:appCtx + viewModel.baseurl + "/audit",
	      type:"post",
	      data: "ids=" + ids.join(","),
	      success:function(data){
	      	for(var i = 0; i < selectRowsArr.length; i++){
						selectRowsArr[i].setValue("auditStatus","1");
					}
	      }
	    });
	  },
	  //审核状态 带入
	  auditStatus: function () {
	  	var auditStatusValue = viewModel.AdjustmentFloatingCoefficientList.getValue('auditStatus');
	  	if(auditStatusValue === null){
	  		viewModel.AdjustmentFloatingCoefficientList.setValue('auditStatus',0);
	  	}
	  	var auditStatusName;
	  	switch(auditStatusValue){
	  		case 0:
	      		auditStatusName = '未审核';
	      		break;
	  		case 1:
	      		auditStatusName = '已审核';
	      		break;
	  		default:
	  			auditStatusName = '未审核';
	  	}
	  	return auditStatusName;
	  },
    //审批流添加功能----提交审批
    submit: function () {
        var selectedData = viewModel.AdjustmentFloatingCoefficientList.getSimpleData({type: 'select'});
        if(selectedData.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        if(selectedData[0].state &&	selectedData[0].state !='0'){ //状态不为待确认
          toastr.error("该单据已经使用关联流程，不能启动","error");
          return ;
        }
        for(var i=0;i<selectedData.length;i++) {
          selectedData[i].floatCoefficientAdjustDets = [];
        }
        $.ajax({
            type: 'GET',
            url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=floatcoefficientadjust&nodekey=001',
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
              if(result){
                if(result.success=='success'){
                  var data = result.detailMsg.data;
                  var processDefineCode = data.res_code;
                  viewModel.submitBPMByProcessDefineCode(selectedData,processDefineCode);
                }else{
                  toastr.error(data.detailMsg.msg);
                }

              }else {
                    toastr.error("无返回数据");
                }
            }
      })
    },
    submitBPMByProcessDefineCode:function(selectedData,processDefineCode){
      var nodeJs = "/ocm-web/pages/price/AdjustmentFloatingCoefficient/adjustmentfloatingcoefficient.js";
     //  nodeJs = encodeURIComponent(nodeJs);
      $.ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/submit?processDefineCode=" + processDefineCode + "&nodeJs="+nodeJs,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(selectedData),
            success: function (res) {
                if (res) {
                    if (res.success == 'success') {
                      toastr.success();
                      viewModel.search();
                    } else {
                      toastr.error(res.message);
                    }
                } else {
                    toastr.error("无返回数据");
                }
            }

        });
    },
    //审批流添加功能----取消提交
    unsubmit: function () {
        var selectedData = viewModel.AdjustmentFloatingCoefficientList.getSimpleData({type: 'select'});
        if(selectedData.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        for(var i=0;i<selectedData.length;i++) {
          selectedData[i].floatCoefficientAdjustDets = [];
        }
        $.ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/unsubmit",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(selectedData),
            success: function (res) {
                if (res) {
                    if (res.detailMsg.data.success == 'success') {
                     toastr.success();
                     viewModel.search();
                    } else {
                     toastr.error(res.detailMsg.data.message);
                    }
                } else {
                    toastr.error("无返回数据");
                }
            }

        });
    },
  }
  viewModel = u.extend({},baseData,events,rendertype/*,bpmopenbill.model*/);

  function appInit(element, params){
    window.initButton(viewModel, element);//初始化按钮权限
    ko.cleanNode(element);
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    //主表搜索
    searcher = new searchbox(
      $("#AdjustmentFloatingCoefficient-searchcontent")[0],
      [
        {
          type:"text",
          key:"code",
          label:"上浮系数调整单编码",
        },
        {
          type:"text",
          key:"name",
          label:"上浮系数调整单名称",
        },
	      {
	          type:"radio",
	          key:"auditStatus",
	          label:"审核状态",
	          dataSource:CONST.APPROVE,
	          defaultvalue: CONST.DEFAULTOPTION,
	      },
				{
          type:"text",
          key:"floatCoefficient--name",
          label:"上浮系数名称",
        },
				{
          type:"text",
          key:"remark",
          label:"备注",
        }
      ]);
      // 查询组件初始化
	    //子表搜索
	    singledocSearchChild = new searchbox(
      $("#AdjustmentFloatingCoefficient-searchcontent-child")[0],
      [
        {
          type:"combo",
          key:"orderType",
          label:"业务标识",
          dataSource:viewModel.orderTypeDataSource,
        },
        {
          type:"combo",
          key:"saleChannel",
          label:"渠道类型",
          dataSource:viewModel.saleChannelDataSource,
        },
        {
	        type:"refer",
	        key:"productGroup--id",
	        label:"产品组",
	        refinfo:"productGroup"
	      },
	      {
		      type:"refer",
		      key:"agency--id",
		      label:"办事处",
		      refinfo:"organization_ocm",
		      refparam:{"EQ_isOffice":"1"}//是否办事处
	      },
	      {
	        type:"refer",
	        key:"customer--id",
	        label:"客户名称",
	        refinfo:"customer"
	      },
        {
	        type:"daterange",
	        key:"beginTime",
	//      startkey:"beginTime",
	//      endkey:"endTime",
	        label:"开始日期",
	      },
	      {
	        type:"daterange",
	        key:"endTime",
	//      startkey:"beginTime",
	//      endkey:"endTime",
	        label:"截至日期",
	      },
      ]);
      //子表搜索-详情
	    singledocSearchChildDetail = new searchbox(
      $("#AdjustmentFloatingCoefficient-searchcontent-child-detail")[0],
      [
        {
          type:"combo",
          key:"orderType",
          label:"业务标识",
          dataSource:viewModel.orderTypeDataSource,
        },
        {
          type:"combo",
          key:"saleChannel",
          label:"渠道类型",
          dataSource:viewModel.saleChannelDataSource,
        },
        {
	        type:"refer",
	        key:"productGroup--id",
	        label:"产品组",
	        refinfo:"productGroup"
	      },
	      {
		      type:"refer",
		      key:"agency--id",
		      label:"办事处",
		      refinfo:"organization_ocm",
		      clientParam:{"EQ_isOffice":"1"}
	      },
	      {
	        type:"refer",
	        key:"customer--id",
	        label:"客户名称",
	        refinfo:"customer"
	      },
        {
	        type:"daterange",
	        key:"beginTime",
	//      startkey:"beginTime",
	//      endkey:"endTime",
	        label:"开始日期",
	      },
	      {
	        type:"daterange",
	        key:"endTime",
	//      startkey:"beginTime",
	//      endkey:"endTime",
	        label:"截至日期",
	      },
      ]);
      //参照弹窗 搜索组件
      singledocSearch = new searchbox(
      $("#wholesalebaseprice-searchcontent")[0],
      [{
	      type:"combo",
	      key:"orderType",
	      label:"业务标识",
	      url: /*appCtx+*/window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY063",
	      namefield:"name",
	      valuefield:"code"
      },
      {
        type:"refer",
        key:"productGroup--id",
        label:"产品组",
        refinfo:"productGroup"
      },
      {
	      type:"combo",
	      key:"saleChannel",
	      label:"渠道类型",
	      url: window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY059",
	      namefield:"name",
	      valuefield:"code"
      },
      {
	      type:"refer",
	      key:"agency--id",
	      label:"办事处",
	      refinfo:"organization_ocm",
	      refparam:{"EQ_isOffice":"1"}//是否办事处
      },
      {
        type:"daterange",
        key:"beginTime",
//      startkey:"beginTime",
//      endkey:"endTime",
        label:"开始日期",
      },
      {
        type:"daterange",
        key:"endTime",
//      startkey:"beginTime",
//      endkey:"endTime",
        label:"结束日期",
      },
      {
        type:"text",
        key:"customer--name",
        label:"客户名称"
      },
      ]);

      billfooter = new Billfooter(
        $(".ui-bill-footer").get(),
        viewModel,
        "AdjustmentFloatingCoefficientList"
      );
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#AdjustmentFloatingCoefficient-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    //自定义-枚举
    $._ajax({
      type:"get",
      url:/*appCtx+*/window.pathMap.base+"/cust-doc-defs/cust_doc_code/batch",
      data:{
        cust_doc_code_batch:"QY059,QY063"
      },
      success:function(data){
        //渠道类型
        var newarray = common.dataconvert.toMap(data["QY059"],"name","code");
        newarray.unshift({"name":"全部","value":""});
        viewModel.saleChannelDataSource(newarray);
        //业务标识
        var newarray1 = common.dataconvert.toMap(data["QY063"],"name","code");
        newarray1.unshift({"name":"全部","value":""});
        viewModel.orderTypeDataSource(newarray1);
      }
    });
    //上浮系数编码联动
		viewModel.AdjustmentFloatingCoefficientList.on("floatCoefficientId.valuechange", function(obj) {
			  var currentRow = obj.rowObj;
				var newValue = obj.newValue;
				if(newValue == ""){
					currentRow.setValue("floatCoefficientName","");
					currentRow.setValue("floatCoefficientCode","");
				}
		});
		//展开搜索
		$(".searchChild-btn").bind('click',function(){
  			if($(this).text() == "展开搜索"){
  				$(this).text("收起搜索").closest('.ui-bill-body').siblings('.ui-searchbox').find('.searchChild-area').slideDown(300);
  			}else{
  				$(this).text("展开搜索").closest('.ui-bill-body').siblings('.ui-searchbox').find('.searchChild-area').slideUp(300);
  			}
  	});
  	//分页显示条数判断
  	$("#paginationChild").delegate("select","click",function(){
  		if(viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT){
	  		var flag = false;
	  		var childRows = viewModel.AdjustmentFloatingCoefficientItems.getAllRows();
	  		if(childRows.length > 0){
	  			for(var i = 0; i < childRows.length; i++){
	  				var status = childRows[i].status;
	  				if(status != 'nrm'){
	  					flag = true;
	  				}
	  			}
	  		}
	  		if(flag){
	  			$(this).prop("disabled",true);
	  			toastr.warning("当前数据已被修改，不可改变分页显示条数！");
	  		}else{
	  			$(this).prop("disabled",false);
	  		}
	  	}
  	});
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.vm = viewModel;
  }

  return {
    init: init
  }
});
