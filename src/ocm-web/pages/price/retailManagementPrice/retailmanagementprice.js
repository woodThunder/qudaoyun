define(['text!./retailmanagementprice.html','ocm_common','searchbox','./meta.js','ocm_global'], function (tpl,common,searchbox) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,changeHistoryDialog,historySearcher,historyIndex,historyListSearcher,historyListIndex,changeHistoryListDialog,singledocSearchChild,singledocSearchChildDetail;
  baseData = {
    baseurl : '/retail-manager',
    childListUrl: '/retail-manager-det',
    historySearchUrl: '/retail-mgr-body-history',
    historyListSearchUrl: '/retail-mgr-head-history',
    retailmanagementpriceList: new u.DataTable(retailmanagementpricemeta),
    retailmanagementpriceChild: new u.DataTable(retailmanagementpricechildmeta),
    changeHistoryData: new u.DataTable(changehistorymeta),
    changeHistoryListData: new u.DataTable(changehistorylistmeta),
    ProductRef: new u.DataTable(ProductRef),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
//  saleChannelDataSource:ko.observableArray([]),
    saleData:ko.observableArray([]),
    enableRadioSrc: [{value:"02",name:"批发"},{value:'01',name:"电商"}],
    priceTypeData:[{"value":"0","name":"默认价"},{"value":"1","name":"上限价"},{"value":"2","name":"下限价"}]
  };
  rendertype = {
  	//跳转详情页
  	detailRender: common.rendertype.detailRender,
  	operation: common.rendertype.operation4auth,
     //判断表格里的状态
	  //审核状态
	  auditStatusGrid: function (obj) {
	  	var showValue = obj.value == "1" ? "已审核":"未审核";

      obj.element.innerHTML = showValue;
	  },
	  //启用状态
	  enabledGrid: function (obj) {
	  	var showValue = obj.value == "1" ? "启用" : "停用";
      obj.element.innerHTML = showValue;
	  },
	  salePrincipalGrid: function(obj) {
	  	var showValue = obj.value == "02" ? "批发" : "电商";
      obj.element.innerHTML = showValue;
	  },
	  textDefaultRender: function(obj) {
	  	obj.element.innerHTML = "修改";
	  },
	  isChangeRender: function(obj) {
	  	var showValue = obj.value == "1" ? "是" : "否";
      obj.element.innerHTML = showValue;
	  },
		//子表变更历史
		changeHistoryRender: function(obj) {
			var viewModel = obj.gridObj.viewModel;
      var changefun = "data-bind=click:changeHistoryFun.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      changefun +
      ' title="变更详情">变更详情</a>'+
      '</span>'+
      '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
		},
		//主表变更历史
		changeHistoryListRender: function(obj) {
			var viewModel = obj.gridObj.viewModel;
      var changefun = "data-bind=click:changeHistoryListFun.bind($data," + obj.rowIndex + "), visible: buttonShowGroup[\"history\"]'";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      changefun +
      ' title="变更详情">变更详情</a>'+
      '</span>'+
      '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
		}
  };
  events = {
  		//点击返回
	  	retListPanelFun: function(){
	  		viewModel.retListPanel();
	  		viewModel.retailmanagementpriceChild.pageIndex(0);
	  	},
  		//主表表变更历史
  		changeHistoryListFun: function(index) {
  			var self = this;
  			var childItemId = viewModel.retailmanagementpriceList.getRow(index).getValue("id");

  			if( historyListIndex !== index ){
  				historyListIndex = index;
  				//先清空历史数据datatable
	    	  viewModel.changeHistoryListData.clear();
  			}
  			changeHistoryListDialog = u.dialog({id:'changeHistoryListDialog',content:"#dialog_content_list_change","width":"80%"});
  			var okButton = $("#dialog_content_list_change .u-msg-ok");
				okButton.unbind("click").click(function (){
					changeHistoryListDialog.close();
				});
				var cancelButton = $("#dialog_content_list_change .u-msg-cancel");
				cancelButton.unbind("click").click(function (){
					changeHistoryListDialog.close();
				});
  		},
  		//主表历史变更分页
	    singledocListSearch: function(reindex) {
	    	var self = this;
	    	var nowId = viewModel.retailmanagementpriceList.getCurrentRow().getValue("id");
//	    	if(!nowId){
//	    		nowId = viewModel.retailmanagementpriceChild.getCurrentRow().getValue("id");
//	    	}
	    	if(reindex){
	        viewModel.changeHistoryListData.pageIndex(0);
	        viewModel.changeHistoryListData.clear();
	      }
	//  	viewModel.changeHistoryData.removeAllRows();

	      var queryData = historyListSearcher.getDataWithOpr();
	      var pageSize = viewModel.changeHistoryListData.pageSize();
	      var pageNumber = viewModel.changeHistoryListData.pageIndex();
	      queryData['search_EQ_retailManagerPrice.id'] = nowId;
//	      queryData['search_EQ_isEnable'] = '1';
	      queryData.page = pageNumber;
	      queryData.size = pageSize;
	      $._ajax({
	        type:"get",
	        url:appCtx + viewModel.historyListSearchUrl,
	        dataType:"json",
	        data:queryData,
	        success:function(data){
	        	self.rewriteListFun(data);
	        }
	      })
	    },
	    //主表重新组织数据结构在写入
	    rewriteListFun: function(con) {
	    	var pageIndex = viewModel.changeHistoryListData.pageIndex();
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
		    viewModel.changeHistoryListData.setData({
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
	  	//主表历史变更分页
	    pageChangePriceList: function (index) {
	    	if(!viewModel.changeHistoryListData.getPage(index)){
	//  		viewModel.changeHistoryData.pageIndex(index);
	      	viewModel.singledocListSearch();
	    	}
	    },
	    //主表历史变更分页-回调
	    sizeChangePriceList: function (size) {
	      viewModel.changeHistoryListData.pageSize(size);
	      viewModel.singledocListSearch(true);
	    },
	    //主表清空搜索条件-参照
	    cleanSingledocListSearch: function () {
	      historyListSearcher.clearSearch();
	    },
  		//子表变更历史
  		changeHistoryFun: function(index) {
  			var self = this;
  			var childItemId = viewModel.retailmanagementpriceChild.getRow(index).getValue("id");
  			if(!childItemId){
  				toastr.warning("新增表无历史记录");
  				return;
  			}

  			if( historyIndex !== index ){
  				historyIndex = index;
  				//先清空历史数据datatable
	    	  viewModel.changeHistoryData.clear();
  			}
  			changeHistoryDialog = u.dialog({id:'changeHistoryDialog',content:"#dialog_content_change","width":"80%"});
  			var okButton = $("#dialog_content_change .u-msg-ok");
				okButton.unbind("click").click(function (){
					changeHistoryDialog.close();
				});
				var cancelButton = $("#dialog_content_change .u-msg-cancel");
				cancelButton.unbind("click").click(function (){
					changeHistoryDialog.close();
				});
  		},
  		//子表历史变更分页
	    singledocSearch: function(reindex) {
	    	var self = this;
	    	var nowId = viewModel.retailmanagementpriceChild.getCurrentRow().getValue("id");
//	    	if(!nowId){
//	    		nowId = viewModel.retailmanagementpriceChild.getCurrentRow().getValue("id");
//	    	}
	    	if(reindex){
	        viewModel.changeHistoryData.pageIndex(0);
	        viewModel.changeHistoryData.clear();
	      }
	//  	viewModel.changeHistoryData.removeAllRows();

	      var queryData = historySearcher.getDataWithOpr();
	      var pageSize = viewModel.changeHistoryData.pageSize();
	      var pageNumber = viewModel.changeHistoryData.pageIndex();
	      queryData['search_EQ_retailManagerPriceDet.id'] = nowId;
//	      queryData['search_EQ_isEnable'] = '1';
	      queryData.page = pageNumber;
	      queryData.size = pageSize;
	      $._ajax({
	        type:"get",
	        url:appCtx + viewModel.historySearchUrl,
	        dataType:"json",
	        data:queryData,
	        success:function(data){
	        	self.rewriteFun(data);
	        }
	      })
	    },
	    //重新组织数据结构在写入
	    rewriteFun: function(con) {
	    	var pageIndex = viewModel.changeHistoryData.pageIndex();
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
		    viewModel.changeHistoryData.setData({
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
	  	//历史变更分页
	    pageChangePrice: function (index) {
	    	if(!viewModel.changeHistoryData.getPage(index)){
	//  		viewModel.changeHistoryData.pageIndex(index);
	      	viewModel.singledocSearch();
	    	}
	    },
	    //历史变更分页-回调
	    sizeChangePrice: function (size) {
	      viewModel.changeHistoryData.pageSize(size);
	      viewModel.singledocSearch(true);
	    },
	    //清空搜索条件-参照
	    cleanSingledocSearch: function () {
	      historySearcher.clearSearch();
	    },

  		//编辑状态
	  	editHandle: function() {
	  		$(".searchChild-btn").show();
	  		var self = this;
	  		var isauditStatus = viewModel.retailmanagementpriceList.getValue("auditStatus");
	    	if(isauditStatus == "1"){
	    		toastr.warning('该数据已审核不能编辑');
	    		return;
	    	}
	  		$(".ui-bill-detail").hide();
	  		$(".ui-bill-panel").show();
	  		self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
	  		viewModel.retailmanagementpriceChild.pageIndex(0);
  			viewModel.searchChildFun();
	  	},
	  	 //导入
	  	  importHandle: function() {
	  	  	var urlInfo = '/retail-manager-excel/excelDataImport'; //倒入地址参数
	  	  	var urlStatusInfo = '/retail-manager-excel/excelLoadingStatus'; //请求进度地址参数
	  	  	var ele = $('#importFiel')[0]; //挂载元素
	  	  	common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
	  	  },
	  	  //导出
	  	  exportHandle: function() {
	  	  	  var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
	  	  	  var templateUrl = '/retail-manager-excel/downloadExcelTemplate'; //导出模板地址参数
	  	  	  var excelDataUrl =  '/retail-manager-excel/excelDataExport'; //导出数据地址参数
	  	  	  var listData = viewModel.retailmanagementpriceList; //需要导出表格的dataTable
	  	  	  var ele = $('#exportFiel')[0]; //挂载元素
	  	  	  var judgeAuditStatus = true; //是否有审核条件导出限制，如果导出类型选择导出需修改的数据，已审核则不能导出
	  	  	  common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl,judgeAuditStatus);
	  	  },
  		//删除和批量删除
	    del: function (data,rowId) {
	      if (typeof(data) == 'number') {
	        viewModel.retailmanagementpriceList.setRowSelectbyRowId(rowId);
	      }
	      var ids = [];
	      var rows = viewModel.retailmanagementpriceList.getSelectedRows();
	      if(rows&&rows.length>0){
	      	for(var i = 0;i<rows.length;i++){
	        	var isauditStatus = rows[i].getValue("auditStatus");
	        	if(isauditStatus == "1" || isauditStatus == 1){
			    		toastr.warning('该数据已审核不能删除');
			    		return;
			    	}
	          ids.push(rows[i].getValue("id"));
	       }
	      }else{
	      	toastr.warning('请选择数据');
			    return;
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
	              viewModel.retailmanagementpriceList.removeRows(rows);
	              viewModel.search();
	            }
	          });
	        }
	      });
	    },
	    //进入新增单据页
	    showAddBillPanel: function() {
	    	$(".searchChild-btn").hide();
        $(".searchChild-area").hide();
	      var curRow = viewModel.retailmanagementpriceList.createEmptyRow();
	      viewModel.retailmanagementpriceList.setRowFocus(curRow);
	      curRow.setValue("auditStatus", "0");
//	      curRow.setValue("invalidStatus", "1");
	      viewModel.goBillPanel();
	      viewModel.retailmanagementpriceChild.removeAllRows();
	      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
	    },
	     //进入修改单据页
	    showEditBillPanel: function(index) {
	    	$('.searchChild-btn').show();
	    	//先清空历史数据datatable
	    	viewModel.changeHistoryData.clear();
	    	var isauditStatus = viewModel.retailmanagementpriceList.getRow(index).getValue("auditStatus");
	    	if(isauditStatus == "1"){
	    		toastr.warning('该数据已审核不能编辑');
	    		return;
	    	}
	      viewModel.retailmanagementpriceList.setRowFocus(index);
	      viewModel.retailmanagementpriceList.originEditData = viewModel.retailmanagementpriceList.getFocusRow().getSimpleData();
	      singledocSearchChild.clearSearch();
	      viewModel.searchChildFun();
	      viewModel.goBillPanel();
	      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
	    },
	    //进入复制单据页
//	    showCopyBillPanel: function() {
//	      var selectedRows = viewModel.retailmanagementpriceList.getSelectedRows();
//	      // 只支持单一复制，批量复制需单独处理
//	      if(selectedRows.length != 1) {
//	        //TODO: tips替换
//	        toastr.warning('请选择一条要复制的行');
//	        return;
//	      }
//	      var copyRow = selectedRows[0];
//	      var curRow = viewModel.retailmanagementpriceList.createEmptyRow();
//	      curRow.setSimpleData(copyRow.getSimpleData());
//	      curRow.setValue("auditStatus","0");
////	      curRow.setValue("invalidStatus","1");
//	      curRow.status = "new";
//	      viewModel.retailmanagementpriceList.setRowFocus(curRow);
//	      var id = copyRow.getValue("id");
//	      //查询子表数据
//	      viewModel.findByParentid(id);
//	      //删除主表主键，编码，审计信息
//	      viewModel.clearBaseProp(curRow);
//
//	      //删除子表主键，子表主表关联
//	      var subRows = viewModel.retailmanagementpriceChild.getAllRows();
//	      for(var i=0; i<subRows.length; i++) {
//	        viewModel.clearBaseProp(subRows[i]);
//	        subRows[i].status = "new";
//	      }
//	      viewModel.goBillPanel();
//	      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.COPY;
//	    },
      // 清除基类属性
//    clearBaseProp: function(curRow) {
//      curRow.setValue("id", null);
//      curRow.setValue("code", "");
//      curRow.setValue("name", "");
//      curRow.setValue("creator", "");
//      curRow.setValue("creationTime", "");
//      curRow.setValue("modifier", "");
//      curRow.setValue("modifiedTime", "");
//    },
      //子表 删除和批量删除
      delChild: function () {
      	var auditStatus = parseInt(viewModel.retailmanagementpriceList.getValue("auditStatus"));
      	if(auditStatus == "2"){
      		toastr.warning("已弃审不能删除");
      		return;
      	}
        var selectedRows = viewModel.retailmanagementpriceChild.getSelectedRows();
        if(selectedRows.length < 1){
	      		toastr.warning("请选择数据");
	      		return;
	      }
      	viewModel.retailmanagementpriceChild.removeRows(selectedRows);
      },
      //子表增行
//    addRow: function () {
//    	var emptyRow = viewModel.retailmanagementpriceChild.createEmptyRow({unSelect:true});
//    	emptyRow.setValue("isEnable","1");
//    },
      //查看详情
	    detail: function() {
	    	$('.searchChild-btn').show();
	      //确保grid先将行设置为focus状态
	      setTimeout(function(){
	      	singledocSearchChildDetail.clearSearch();
	        viewModel.searchChildFun();
	        viewModel.goDetailPanel();
	        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
	      }, 0);
	    },
	    //查询子表数据
//	    findByParentid: function(id) {
//	      $._ajax({
//	         url:appCtx + viewModel.baseurl + '/findByRetailManagerPriceId',
//	        type: 'get',
//	        async: false,
//	        data: {id: id},
//	        success:function(data){
//	        	for(var i = 0; i < data.length; i++){
//	        		var haveProductId = data[i].productId;
//	          	var haveCombineId = data[i].combineId;
//	          	if(haveProductId){
//	          		data[i].productRefer = haveProductId;
//	          	}else{
//	          		data[i].productRefer = haveCombineId;
//	          	}
//	        	}
//	          viewModel.retailmanagementpriceChild.setSimpleData(data,{unSelect:true});
//	        }
//	      })
//	    },
	    //保存单据
	    saveBill: function(index) {
	    	var self = this;
	    	var type = "post";
	    	if(viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY){
	    		type = "put";
	    	}
	      var selectedItemRows = viewModel.retailmanagementpriceChild.getAllRows();
	    	//重新给子表加上combineId或productId
//	    	self.idHandle(selectedItemRows);
	      var productCombineData = viewModel.retailmanagementpriceList.getCurrentRow().getSimpleData();
	      var retailmanagementpriceChildData = viewModel.retailmanagementpriceChild.getSimpleData();
	      productCombineData.retailManagerPriceDets = retailmanagementpriceChildData;
	      var validate = $("#validate")[0];
	      var result = app.compsValidateMultiParam({element:validate,showMsg:true});
				if(result.passed){
          	$._ajax({
	            url:appCtx + viewModel.baseurl,
	            type:type,
	            data:JSON.stringify(productCombineData),
	            contentType : "application/json; charset=utf-8",
	            success:function(data){
	              viewModel.retailmanagementpriceList.getFocusRow().setSimpleData(data);
	              viewModel.search();
	              if(index == -1){
	              	viewModel.retListPanel();
	              	viewModel.search();
	              	viewModel.retailmanagementpriceChild.pageIndex(0);
	              	$("#paginationChild select").prop("disabled",false);
	              }else if(index == -2){
	              	 viewModel.searchChildFun();
	              }else{
	              	viewModel.retailmanagementpriceChild.pageIndex(0);
	              	viewModel.searchChildFun();
	              }
	            }
	          });
         }
	    },
	    //存子表id
//	    idHandle: function(rowArr) {
//	    	for(var i = 0; i < rowArr.length; i++){
//	    		var productRefer = rowArr[i].getValue("productRefer");
//	    		var isProduct = parseInt(rowArr[i].getValue("isProduct"));
//	    		if(productRefer){
//	    			if(isProduct == "1"){
//							rowArr[i].setValue("productId",productRefer);
//							rowArr[i].setValue("combineId",null);
//
//						}else if(isProduct == "0"){
//							rowArr[i].setValue("combineId",productRefer);
//							rowArr[i].setValue("productId",null);
//						}
//	    		}
//	    	}
//	    },
      //点击取消 单据页
      cancelHandle: function () {
      	var curRow = viewModel.retailmanagementpriceList.getCurrentRow();
	      // 修改，则还原
	      if(curRow.getValue("id")) {
	        curRow.setSimpleData(viewModel.retailmanagementpriceList.originEditData)
	      }
	      // 新增或复制，则删除
	      else {
	        viewModel.retailmanagementpriceList.removeRow(curRow);
	        viewModel.retailmanagementpriceChild.removeAllRows();
	      }
	      viewModel.retListPanel();
	      viewModel.retailmanagementpriceChild.pageIndex(0);
	      $("#paginationChild select").prop("disabled",false);
      },

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)--子表
		  searchChild: function (reindex) {
		    if(reindex){
		      viewModel.retailmanagementpriceChild.pageIndex(0);
		    }
		    if(viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT){
		  		var flag = false;
		  		var childRows = viewModel.retailmanagementpriceChild.getAllRows();
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
	  		viewModel.retailmanagementpriceChild.removeAllRows();
		    var id = viewModel.retailmanagementpriceList.getCurrentRow().getValue("id");
		    var queryData = viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL?singledocSearchChildDetail.getDataWithOpr():singledocSearchChild.getDataWithOpr();
		    queryData.size = viewModel.retailmanagementpriceChild.pageSize();
		    queryData.page = viewModel.retailmanagementpriceChild.pageIndex();
		    queryData['search_EQ_retailManagerPrice.id'] = id;
		    $._ajax({
		      type:"get",
		      url:appCtx + viewModel.baseurl+'/findByRetailManagerPriceId',
		      dataType:"json",
		      data:queryData,
		      success:function(data){

		        viewModel.retailmanagementpriceChild.setSimpleData(data.content,{unSelect:true});
		        viewModel.retailmanagementpriceChild.totalRow(data.totalElements);
		        viewModel.retailmanagementpriceChild.totalPages(data.totalPages);
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
	  		var childRows = viewModel.retailmanagementpriceChild.getAllRows();
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
	  			viewModel.retailmanagementpriceChild.pageIndex(index);
	  			viewModel.searchChildFun();
	  		}
		  },
		  //页码改变时的回调函数--子表
		  pageChangeChild: function (index) {
					viewModel.retailmanagementpriceChild.pageIndex(index);
					viewModel.searchChildFun();
		  },
		  //页码改变时的回调函数--子表
		  sizeChangeChild: function (size) {
		    viewModel.retailmanagementpriceChild.pageSize(size);
		    viewModel.searchChild();
		  },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.retailmanagementpriceList.pageIndex(0);
        }
        viewModel.retailmanagementpriceList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.retailmanagementpriceList.pageSize();
        queryData.page = viewModel.retailmanagementpriceList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.retailmanagementpriceList.setSimpleData(data.content,{unSelect:true});
            viewModel.retailmanagementpriceList.totalRow(data.totalElements);
            viewModel.retailmanagementpriceList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.retailmanagementpriceList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.retailmanagementpriceList.pageSize(size);
        viewModel.search(true);
      },
      //判断状态
      auditStatus: function () {
      	var auditStatusValue = parseInt(viewModel.retailmanagementpriceList.getValue('auditStatus'));
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
      //渠道类型
      saleChannelType: function() {
      	var auditStatusValue = viewModel.retailmanagementpriceList.getValue('saleChannelCode');
      	var auditStatusName;
      	switch(auditStatusValue){
      		case '01':
	      		auditStatusName = '电商';
	      		break;
      		case '02':
	      		auditStatusName = '批发';
	      		break;
      		default:
      			auditStatusName = '批发';
      	}
      	return auditStatusName;
      },
      //价格类型
      priceType: function() {
      	var auditStatusValue = viewModel.retailmanagementpriceList.getValue('priceType');
      	var auditStatusName;
      	switch(auditStatusValue){
      		case '0':
	      		auditStatusName = '默认价';
	      		break;
      		case '1':
	      		auditStatusName = '上限价';
	      		break;
      		case '2':
      		 auditStatusName = '下限价';
	      		break;
      		default:
      			auditStatusName = '默认价';
      	}
      	return auditStatusName;
      },
      //审核
      auditHandle: function () {
      	var selectRowsArr = viewModel.retailmanagementpriceList.getSelectedRows();
      	if(selectRowsArr.length < 1){
      		toastr.warning("请选择数据");
      		return;
      	}
      	for(var i = 0; i < selectRowsArr.length; i++){
      		var auditStatus = selectRowsArr[i].getValue("auditStatus");
      		if(auditStatus == "1"){
      			toastr.warning("已审核的数据不能再次审核");
      			return;
      		}
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
      //弃审
      abandonAuditHandle: function() {
      	var selectRowsArr = viewModel.retailmanagementpriceList.getSelectedRows();
      	if(selectRowsArr.length < 1){
      		toastr.warning("请选择数据");
      		return;
      	}
      	for(var i = 0; i < selectRowsArr.length; i++){
      		var auditStatus = selectRowsArr[i].getValue("auditStatus");
      		if(auditStatus == "0"){
      			toastr.warning("请选择已审核的数据");
      			return;
      		}
      	}
      	var ids = selectRowsArr.map(function(row, index, arr) {
	        return row.getValue("id");
	      });
		  	$._ajax({
		      url:appCtx + viewModel.baseurl + "/abandon",
		      type:"post",
		      data: "ids=" + ids.join(","),
		      success:function(data){
		      	for(var i = 0; i < selectRowsArr.length; i++){
							selectRowsArr[i].setValue("auditStatus","2");
						}
		      }
		    });
      },
      //停用
      disableHandle: function () {
      	var selectRowsArr = viewModel.retailmanagementpriceChild.getSelectedRows();
      	if(selectRowsArr.length < 1){
	      		toastr.warning("请选择数据");
	      		return;
	      }
	      for(var i = 0; i < selectRowsArr.length; i++){
					selectRowsArr[i].setValue("isEnable","0");
				}
      },
       //启用
      enableHandle: function () {
      	var selectRowsArr = viewModel.retailmanagementpriceChild.getSelectedRows();
      	if(selectRowsArr.length < 1){
	      		toastr.warning("请选择数据");
	      		return;
	      }
	      for(var i = 0; i < selectRowsArr.length; i++){
					selectRowsArr[i].setValue("isEnable","1");
				}
      },
      // 弹出产品/产品组合参照
		  showProductRef:function() {
		    viewModel.clearProductRef();
		    $("#productRefer").find(".refer").trigger("click");
		  },
		  // 清空已选产品/产品组合参照
		  clearProductRef: function() {
		    viewModel.ProductRef.setValue("productRefer", "");
		    var refer = $("#refContainerproductRefer").data("uui.refer");
		    refer.uncheckAll();
		    refer.setValue([]);
		  },
  }
  viewModel = u.extend({},baseData,events,rendertype);

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
    singledocSearch = new searchbox(
      $("#retailmanagementprice-searchcontent")[0],
      [{
        type:"text",
        key:"code",
        label:"管控价表编码"
      },
      {
        type:"text",
        key:"name",
        label:"管控价表名称"
      },
      {
        type:"radio",
        key:"auditStatus",
        label:"审核状态",
        dataSource:CONST.APPROVE,
	      defaultvalue: CONST.DEFAULTOPTION,
      },
      {
        type:"combo",
	      key:"priceType",
	      label:"价格类型",
//	      url: appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY033",
//	      namefield:"name",
//	      valuefield:"code"
				dataSource:viewModel.priceTypeData
      },
      {
        type:"combo",
        key:"saleChannel",
        label:"渠道类型",
        dataSource:[
        	{value:'',name:'全部'},
	        {value:'02',name:'批发'},
	        {value:'01',name:'电商'},
        ]
      }
      ]);
     // 查询组件初始化
     //子表搜索
    singledocSearchChild = new searchbox(
      $("#retailmanagementprice-searchcontent-child")[0],
      [{
        type:"text",
        key:"product--code",
        label:"产品编码"
      },
      {
        type:"text",
        key:"product--name",
        label:"产品名称"
      },
      {
        type:"text",
        key:"combine--code",
        label:"产品组合编码"
      },
      {
        type:"text",
        key:"combine--name",
        label:"产品组合名称"
      },
      {
        type:"text",
        key:"productGroupName",
        label:"产品组"
      },
      {
        type:"refer",
        key:"agencypartition--id",
        label:"办事处分区",
        refinfo:"agencypartitiongrid",
        clientParam:{"EQ_isContainBodys":"1","EQ_isEnable":"1"}
      },
      {
	      type:"refer",
	      key:"agency--id",
	      label:"办事处",
	      refinfo:"organization_ocm",
	      clientParam:{"EQ_isOffice":"1"}//是否办事处
      },
      {
        type:"text",
        key:"customer--name",
        label:"客户名称"
      }
//    {
//      type:"combo",
//	      key:"priceType",
//	      label:"价格类型",
////	      url: appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY033",
////	      namefield:"name",
////	      valuefield:"code"
//				dataSource:viewModel.priceTypeData
//    }
],undefined, true);
    // 查询组件初始化
     //子表搜索-详情
    singledocSearchChildDetail = new searchbox(
      $("#retailmanagementprice-searchcontent-child-detail")[0],
      [{
        type:"text",
        key:"product--code",
        label:"产品编码"
      },
      {
        type:"text",
        key:"product--name",
        label:"产品名称"
      },
      {
        type:"text",
        key:"combine--code",
        label:"产品组合编码"
      },
      {
        type:"text",
        key:"combine--name",
        label:"产品组合名称"
      },
      {
        type:"text",
        key:"productGroupName",
        label:"产品组"
      },
      {
        type:"refer",
        key:"agencypartition--id",
        label:"办事处分区",
        refinfo:"agencypartitiongrid",
        clientParam:{"EQ_isContainBodys":"1","EQ_isEnable":"1"}
      },
      {
	      type:"refer",
	      key:"agency--id",
	      label:"办事处",
	      refinfo:"organization_ocm",
	      clientParam:{"EQ_isOffice":"1"}//是否办事处
      },
      {
        type:"text",
        key:"customer--name",
        label:"客户名称"
      }
//    {
//      type:"combo",
//	      key:"priceType",
//	      label:"价格类型",
////	      url: appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY033",
////	      namefield:"name",
////	      valuefield:"code"
//				dataSource:viewModel.priceTypeData
//    }
], undefined,true);
    //子表变更历史搜索条件
    historySearcher = new searchbox(
    	$("#history-searchcontent")[0],
    	[
	    	{
	    		type:"text",
	        key:"operator",
	        label:"操作人"
	    	},
	    	{
	    		type:"daterange",
	        key:"operationTime",
	        label:"操作时间"
	    	}
    	]);
    	//主表变更历史搜索条件
    historyListSearcher = new searchbox(
    	$("#history-list-searchcontent")[0],
    	[
	    	{
	    		type:"text",
	        key:"operator",
	        label:"操作人"
	    	},
	    	{
	    		type:"daterange",
	        key:"operationTime",
	        label:"操作时间"
	    	}
    	]);
    // 列表查询数据(无查询条件)
    viewModel.search();
    var row = viewModel.ProductRef.createEmptyRow();
    viewModel.ProductRef.setRowFocus(row);
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#retailmanagementprice-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 点击增行 参照带入多字段
    viewModel.ProductRef.on("productRefer.valuechange", function(obj) {
    	 // 清空参照时不增行(点取消)
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContainerproductRefer").data("uui.refer");
      var refValues = refer.values;

      if(refValues && refValues.length > 0) {
        for(var i=0;i<refValues.length;i++) {
          var refpk = refValues[i].refpk;
          var row = undefined;
          var productId = undefined;
          var combineId = undefined;
          if(refValues[i].isproduct == "1") {
            row = viewModel.retailmanagementpriceChild.getRowByField("productId", refpk);
            productId = refpk;
          }
          else {
            row = viewModel.retailmanagementpriceChild.getRowByField("combineId", refpk);
            combineId = refpk;
          }
          var newrow = undefined;
	        newrow = viewModel.retailmanagementpriceChild.createEmptyRow({unSelect:true});
	        newrow.setValue("showCode", refValues[i].refcode);
	        newrow.setValue("showName", refValues[i].refname);
	        newrow.setValue("productGroupName", refValues[i].productGroupName);
	        newrow.setValue("productId", productId);
	        newrow.setValue("combineId", combineId);
        }
      }
    });
    //价格处理
    viewModel.retailmanagementpriceChild.on("price.valuechange", function(obj) {
      var resultPrice = parseFloat(obj.newValue);
      isNaN(resultPrice) ?resultPrice = "":resultPrice;
      var arr = parseInt(resultPrice).toString().split('');
      var num = parseInt(arr[arr.length-1]);
      if(num == 4 || num == 5 || num == 7) {
        toastr.info("价格个位数如果是4或5则变更为6，如果是7则变更为8");
        if(num == 5 || num == 7) {
          resultPrice += 1;
        }
        else {
          resultPrice += 2;
        }
        obj.rowObj.setValue("price", resultPrice);
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
	  		var childRows = viewModel.retailmanagementpriceChild.getAllRows();
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
