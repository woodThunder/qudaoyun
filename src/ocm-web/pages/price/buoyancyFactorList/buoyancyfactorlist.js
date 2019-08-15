define(['text!./buoyancyfactorlist.html','ocm_common','searchbox'/*,'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js'*/,'./meta.js','ocm_global'], function (tpl,common,searchbox/*,bpmopenbill*/) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledocSearchChild,singledocSearchChildDetail;
  baseData = {
    baseurl : '/float-coeff',
    childListUrl: '/float-coeff-def',
    buoyancyfactorlistList: new u.DataTable(buoyancyfactorlistmeta),
    buoyancyfactorlistChild: new u.DataTable(buoyancyfactorlistchildmeta),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
 		//返回列表页
    retListPanel: common.bill.retListPanel,

		saleChannelDataSource:ko.observableArray([]),

		orderTypeDataSource:ko.observableArray([]),

    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    isAuditStatusComputed: ko.pureComputed(function() {
			var flag;
			var isAuditStatus = viewModel.buoyancyfactorlistList.ref("auditStatus")();
			var isInvalidStatus = viewModel.buoyancyfactorlistList.ref("invalidStatus")();
			if(isAuditStatus == "1" && isInvalidStatus == "1"){
				flag = true;
			}else{
				flag = false;
			}
			return flag;
		})

  };
  rendertype = {
  	//跳转详情页
  	detailRender: common.rendertype.detailRender,
  	operation: common.rendertype.operation4auth,
     //判断表格里的状态
     //审核状态
	  auditStatusGrid: function (obj) {
	  	var showValue = obj.value == "1" ? "已审核" : "未审核";
      obj.element.innerHTML = showValue;
	  },
	  	//作废状态
	  invalidStatusGrid: function (obj) {
	  	var showValue = obj.value == "1" ? "未作废" : "已作废";
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
	  		viewModel.buoyancyfactorlistChild.pageIndex(0);
	  	},
  	  //时间限制
	  	disabledBegin: function(current){
	  		var endTime = viewModel.buoyancyfactorlistChild.getValue("endTime");
	  		if(endTime){
	  			endTime = new Date(endTime).getTime();
	  			if(current) {
	  				current = new Date(current.format("YYYY-MM-DD")).getTime();
	  			}
	  			 return current && current > endTime;
	  		}
	  	},
	  	disabledEnd: function(current){
	  		var beginTime = viewModel.buoyancyfactorlistChild.getValue("beginTime");
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
		  	var urlInfo = '/float-coeff-excel/excelDataImport'; //倒入地址参数
		  	var urlStatusInfo = '/float-coeff-excel/excelLoadingStatus'; //请求进度地址参数
		  	var ele = $('#importFiel')[0]; //挂载元素
		  	common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
		  },
		  //导出
		  exportHandle: function() {
		  	  var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
		  	  var templateUrl = '/float-coeff-excel/downloadExcelTemplate'; //导出模板地址参数
		  	  var excelDataUrl =  '/float-coeff-excel/excelDataExport'; //导出数据地址参数
		  	  var listData = viewModel.buoyancyfactorlistList; //需要导出表格的dataTable
		  	  var ele = $('#exportFiel')[0]; //挂载元素
		  	  var judgeAuditStatus = true; //是否有审核条件导出限制，如果导出类型选择导出需修改的数据，已审核则不能导出
		  	  common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl,judgeAuditStatus);
		  },
  		//编辑状态
	  	editHandle: function() {
	  		$(".searchChild-btn").show();
	  		var self = this;
	  		var isauditStatus = viewModel.buoyancyfactorlistList.getValue("auditStatus");
	    	if(isauditStatus == "1" || isauditStatus == 1){
	    		toastr.warning('该数据已审核不能编辑');
	    		return;
	    	}
	  		$(".ui-bill-detail").hide();
	  		$(".ui-bill-panel").show();
	  		self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
	  		viewModel.buoyancyfactorlistChild.pageIndex(0);
  		  viewModel.searchChildFun();
	  	},
  		//删除和批量删除
	    del: function (data,rowId) {
	      if (typeof(data) == 'number') {
	        viewModel.buoyancyfactorlistList.setRowSelectbyRowId(rowId);
	      }
	      var ids = [];
	      var rows = viewModel.buoyancyfactorlistList.getSelectedRows();
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
      if(rows&&rows.length>0){
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
                  viewModel.buoyancyfactorlistList.removeRows(rows);
                  viewModel.search();
                }
              });
            }
          });
      }else {
          toastr.warning('请选择数据');
          return;
      }
    },
	    //进入新增单据页
	    showAddBillPanel: function() {
	    	$(".searchChild-btn").hide();
      	$(".searchChild-area").hide();
	      var curRow = viewModel.buoyancyfactorlistList.createEmptyRow();
	      viewModel.buoyancyfactorlistList.setRowFocus(curRow);
	      viewModel.buoyancyfactorlistChild.removeAllRows();
	      curRow.setValue("auditStatus", "0");
	      curRow.setValue("invalidStatus", "1");
	      viewModel.goBillPanel();
	      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
	    },
	     //进入修改单据页
	    showEditBillPanel: function(index) {
	    	$('.searchChild-btn').show();
	    	var isauditStatus = viewModel.buoyancyfactorlistList.getRow(index).getValue("auditStatus");
	    	if(isauditStatus == "1" || isauditStatus == 1){
	    		toastr.warning('该数据已审核不能编辑');
	    		return;
	    	}
	      viewModel.buoyancyfactorlistList.setRowFocus(index);
	      var id = viewModel.buoyancyfactorlistList.getValue("id");
	      viewModel.buoyancyfactorlistList.originEditData = viewModel.buoyancyfactorlistList.getFocusRow().getSimpleData();
	      singledocSearchChild.clearSearch();
	      viewModel.searchChildFun();
	      viewModel.goBillPanel();
	      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
	    },
	    //进入复制单据页
//	    showCopyBillPanel: function() {
//	      var selectedRows = viewModel.buoyancyfactorlistList.getSelectedRows();
//	      // 只支持单一复制，批量复制需单独处理
//	      if(selectedRows.length != 1) {
//	        //TODO: tips替换
//	        toastr.warning('请选择一条要复制的行');
//	        return;
//	      }
//	      var copyRow = selectedRows[0];
//	      var curRow = viewModel.buoyancyfactorlistList.createEmptyRow();
//	      curRow.setSimpleData(copyRow.getSimpleData());
//	      curRow.setValue("auditStatus","0");
//	      curRow.setValue("invalidStatus","1");
//	      curRow.status = "new";
//	      viewModel.buoyancyfactorlistList.setRowFocus(curRow);
//	      var id = copyRow.getValue("id");
//	      //查询子表数据
//	      viewModel.findByParentid(id);
//	      //删除主表主键，编码，审计信息
//	      viewModel.clearBaseProp(curRow);
//
//	      //删除子表主键，子表主表关联
//	      var subRows = viewModel.buoyancyfactorlistChild.getAllRows();
//	      for(var i=0; i<subRows.length; i++) {
//	        viewModel.clearBaseProp(subRows[i]);
//	        subRows[i].setValue("orderTypeId", "");
//	        subRows[i].setValue("adjustCode", "");
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
//      curRow.setValue("auditor", "");
//      curRow.setValue("auditTime", "");
//      curRow.setValue("invalider", "");
//      curRow.setValue("invalidTime", "");
//      curRow.setValue("creator", "");
//      curRow.setValue("creationTime", "");
//      curRow.setValue("modifier", "");
//      curRow.setValue("modifiedTime", "");
//    },

      //子表 删除和批量删除
      delChild: function () {
        var selectedRows = viewModel.buoyancyfactorlistChild.getSelectedRows();
        if(selectedRows.length < 1){
	      		toastr.warning("请选择数据");
	      		return;
	      }
      	viewModel.buoyancyfactorlistChild.removeRows(selectedRows);
      },
      //子表增行
      addRow: function () {
      	var emptyRow = viewModel.buoyancyfactorlistChild.createEmptyRow({unSelect:true});
      	emptyRow.setValue("isEnable","1");
      },
			//查看详情
	    detail: function() {
	    	$('.searchChild-btn').show();
	      //确保grid先将行设置为focus状态
	      setTimeout(function(){
	      	singledocSearchChildDetail.clearSearch();
	        viewModel.searchChildFun();
          var id = viewModel.buoyancyfactorlistList.getValue("id");
          //加入bpm按钮
          //viewModel.initBPMFromBill(id,viewModel);
	        viewModel.goDetailPanel();
	        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
	      }, 0);
	    },
	    //查询子表数据
//	    findByParentid: function(id) {
//	      $._ajax({
//	         url:appCtx + viewModel.baseurl + '/findByFloatCoefficientId',
//	        type: 'get',
//	        async: false,
//	        data: {id: id},
//	        success:function(data){
//	          viewModel.buoyancyfactorlistChild.setSimpleData(data,{unSelect:true});
//	        }
//	      })
//	    },
	    //保存单据
	    saveBill: function(index) {
	    	var type = "post";
	    	if(viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY){
	    		type = "put";
	    	}
	      var productCombineData = viewModel.buoyancyfactorlistList.getCurrentRow().getSimpleData();
	      var buoyancyfactorlistChildData = viewModel.buoyancyfactorlistChild.getSimpleData();
	      productCombineData.floatCoefficientDefs = buoyancyfactorlistChildData;
	      var validate = $("#validate")[0];
	      var result = app.compsValidateMultiParam({element:validate,showMsg:true});
					if(result.passed){
	      	$._ajax({
	            url:appCtx + viewModel.baseurl,
	            type:type,
	            data:JSON.stringify(productCombineData),
	            contentType : "application/json; charset=utf-8",
	            success:function(data){
	              viewModel.buoyancyfactorlistList.getFocusRow().setSimpleData(data);
	              toastr.success();

	              if(index == -1){
	              	viewModel.retListPanel();
	              	viewModel.search();
	              	viewModel.buoyancyfactorlistChild.pageIndex(0);
	              	$("#paginationChild select").prop("disabled",false);
	              }else if(index == -2){
	              	 viewModel.searchChildFun();
	              }else{
	              	viewModel.buoyancyfactorlistChild.pageIndex(0);
	              	viewModel.searchChildFun();
	              }
	            }
	          });
	      }
	    },
      //点击取消 单据页
      cancelHandle: function () {
      	var curRow = viewModel.buoyancyfactorlistList.getCurrentRow();
	      // 修改，则还原
	      if(curRow.getValue("id")) {
	        curRow.setSimpleData(viewModel.buoyancyfactorlistList.originEditData)
	      }
	      // 新增或复制，则删除
	      else {
	        viewModel.buoyancyfactorlistList.removeRow(curRow);
	        viewModel.buoyancyfactorlistChild.removeAllRows();
	      }
	      viewModel.retListPanel();
        viewModel.buoyancyfactorlistChild.pageIndex(0);
        $("#paginationChild select").prop("disabled",false);
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)--子表
		  searchChild: function (reindex) {
		    if(reindex){
		      viewModel.buoyancyfactorlistChild.pageIndex(0);
		    }
		    if(viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT){
		  		var flag = false;
		  		var childRows = viewModel.buoyancyfactorlistChild.getAllRows();
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
	  		viewModel.buoyancyfactorlistChild.removeAllRows();
		    var id = viewModel.buoyancyfactorlistList.getCurrentRow().getValue("id");
		    var queryData = viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL?singledocSearchChildDetail.getDataWithOpr():singledocSearchChild.getDataWithOpr();
		    queryData.size = viewModel.buoyancyfactorlistChild.pageSize();
		    queryData.page = viewModel.buoyancyfactorlistChild.pageIndex();
		    queryData['search_EQ_floatCoefficient.id'] = id;
		    $._ajax({
		      type:"get",
		      url:appCtx + viewModel.baseurl+'/findByFloatCoefficientId',
		      dataType:"json",
		      data:queryData,
		      success:function(data){
		        viewModel.buoyancyfactorlistChild.setSimpleData(data.content,{unSelect:true});
		        viewModel.buoyancyfactorlistChild.totalRow(data.totalElements);
		        viewModel.buoyancyfactorlistChild.totalPages(data.totalPages);
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
	  		var childRows = viewModel.buoyancyfactorlistChild.getAllRows();
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
	  			viewModel.buoyancyfactorlistChild.pageIndex(index);
	  			viewModel.searchChildFun();
	  		}
		  },
		  //页码改变时的回调函数--子表
		  pageChangeChild: function (index) {
					viewModel.buoyancyfactorlistChild.pageIndex(index);
					viewModel.searchChildFun();
		  },
		  //页码改变时的回调函数--子表
		  sizeChangeChild: function (size) {
		    viewModel.buoyancyfactorlistChild.pageSize(size);
		    viewModel.searchChild(true);
		  },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.buoyancyfactorlistList.pageIndex(0);
        }
        viewModel.buoyancyfactorlistList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.buoyancyfactorlistList.pageSize();
        queryData.page = viewModel.buoyancyfactorlistList.pageIndex();
        $.ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.buoyancyfactorlistList.setSimpleData(data.content,{unSelect:true});
            viewModel.buoyancyfactorlistList.totalRow(data.totalElements);
            viewModel.buoyancyfactorlistList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.buoyancyfactorlistList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.buoyancyfactorlistList.pageSize(size);
        viewModel.search(true);
      },
      //判断状态
      auditStatus: function () {
      	var auditStatusValue = viewModel.buoyancyfactorlistList.getValue('auditStatus');
      	if(auditStatusValue === null){
		  		viewModel.buoyancyfactorlistList.setValue('auditStatus',0);
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
      //审核
      auditHandle: function () {
      	var selectRowsArr = viewModel.buoyancyfactorlistList.getSelectedRows();
        if(selectRowsArr.length < 1){
          //TODO
          toastr.warning('请选择数据');
          return;
        }
        for(var i = 0; i < selectRowsArr.length; i++){
          var isAuditStatus = selectRowsArr[i].getValue("auditStatus");
          if(isAuditStatus != 0 ){
            //TODO
            toastr.warning('请选择未审核的数据');
            return;
          }
        }
      	var ids = selectRowsArr.map(function(row, index, arr) {
	        return row.getValue("id");
	      });
		  	$._ajax({
		      url:appCtx + viewModel.baseurl + "/audit",
		      type: "post",
		      data: "ids=" + ids.join(","),
		      success:function(data){
		      	for(var i = 0; i < selectRowsArr.length; i++){
							selectRowsArr[i].setValue("auditStatus","1");
						}
		      }
		    });
      },
        //作废
      invalidHandle: function () {
      	var selectRowsArr = viewModel.buoyancyfactorlistList.getSelectedRows();
      	if(selectRowsArr.length < 1){
      		//TODO
      		toastr.warning('请选择数据');
      		return;
      	}
      	for(var i = 0; i < selectRowsArr.length; i++){
      		var isAuditStatus = selectRowsArr[i].getValue("auditStatus");
      		var isInvalidStatus = selectRowsArr[i].getValue("invalidStatus");
      		if(isAuditStatus != 1 || isInvalidStatus != 1){
      			//TODO
      			toastr.warning('请选择已审核并且作废状态为未作废的数据');
      			return;
      		}
      	}
      	var ids = selectRowsArr.map(function(row, index, arr) {
	        return row.getValue("id");
	      });
		  	$._ajax({
		      url:appCtx + viewModel.baseurl + "/invalid",
		      type:"post",
		      data: "ids=" + ids.join(","),
		      success:function(data){
		      	for(var i = 0; i < selectRowsArr.length; i++){
							selectRowsArr[i].setValue("invalidStatus","0");
						}
		      }
		    });
      },
      //停用
      disableHandle: function () {
      	var selectRowsArr = viewModel.buoyancyfactorlistChild.getSelectedRows();
      	if(selectRowsArr.length < 1){
	      		toastr.warning("请选择数据");
	      		return;
	      }else{
	      	common.dialog.confirmDialog({
            msg1: '确认停用这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
              var ids = selectRowsArr.map(function(row, index, arr) {
				        return row.getValue("id");
				      });
			      	$._ajax({
					      url:appCtx + viewModel.childListUrl + "/batch-disable",
					      type:"post",
					      data: "ids=" + ids.join(","),
					      success:function(data){
					      	 for(var i = 0; i < selectRowsArr.length; i++){
										selectRowsArr[i].setValue("isEnable","0");
									}
					      }
					    });
            }
          });
	      }

      },
      //审批流添加功能----提交审批
      submit: function () {
          var selectedData = viewModel.buoyancyfactorlistList.getSimpleData({type: 'select'});
          if(selectedData.length == 0) {
            toastr.error("请选择数据");
            return;
          }
          if(selectedData[0].state &&	selectedData[0].state !='0'){ //状态不为待确认
            toastr.error("该单据已经使用关联流程，不能启动","error");
            return ;
          }
          for(var i=0;i<selectedData.length;i++) {
            selectedData[i].floatCoefficientDefs = [];
          }
          $.ajax({
              type: 'GET',
              url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=buoyancyfactorlist1&nodekey=001',
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
        var nodeJs = "/ocm-web/pages/price/buoyancyFactorList/buoyancyfactorlist.js";
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
          var selectedData = viewModel.buoyancyfactorlistList.getSimpleData({type: 'select'});
          if(selectedData.length == 0) {
            toastr.error("请选择数据");
            return;
          }
          for(var i=0;i<selectedData.length;i++) {
            selectedData[i].floatCoefficientDefs = [];
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
    singledocSearch = new searchbox(
      $("#buoyancyfactorlist-searchcontent")[0],
      [{
        type:"text",
        key:"code",
        label:"上浮系数编码"
      },
      {
        type:"text",
        key:"name",
        label:"上浮系数名称"
      },
      {
        type:"radio",
        key:"auditStatus",
        label:"审核状态",
			  dataSource:CONST.APPROVE,
			  defaultvalue: CONST.DEFAULTOPTION,
      },
       {
        type:"radio",
        key:"invalidStatus",
        label:"作废状态",
        dataSource:[
        {value:'',name:'全部'},
        {value:'0',name:'已作废'},
        {value:'1',name:'未作废'}
        ]
      },
      {
        type:"text",
        key:"remark",
        label:"备注"
      }]);
    // 查询组件初始化
    singledocSearchChild = new searchbox(
      $("#buoyancyfactorlist-searchcontent-child")[0],
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
	      {
	        type:"radio",
	        key:"isEnable",
	        label:"启用状态",
	        dataSource:[
	        {value:'',name:'全部'},
	        {value:'0',name:'停用'},
	        {value:'1',name:'启用'}
	        ]
	      },
	      {
	        type:"text",
	        key:"adjust--code",
	        label:"调整单号"
	      }
      ], undefined, true);
      singledocSearchChildDetail = new searchbox(
      $("#buoyancyfactorlist-searchcontent-child-detail")[0],
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
	      {
	        type:"radio",
	        key:"isEnable",
	        label:"启用状态",
	        dataSource:[
	        {value:'',name:'全部'},
	        {value:'0',name:'停用'},
	        {value:'1',name:'启用'}
	        ]
	      },
	      {
	        type:"text",
	        key:"adjust--code",
	        label:"调整单号"
	      }
      ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#buoyancyfactorlist-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });

    //枚举
    $._ajax({
      type:"get",
      url:/*appCtx+ */window.pathMap.base+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY059"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        newarray.unshift({"name":"全部","value":""});
        viewModel.saleChannelDataSource(newarray);
      }
    });

      $._ajax({
      type:"get",
      url:/*appCtx+*/window.pathMap.base+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY063"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        newarray.unshift({"name":"全部","value":""});
        viewModel.orderTypeDataSource(newarray);
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
	  		var childRows = viewModel.buoyancyfactorlistChild.getAllRows();
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
//	singledocSearch.viewModel.params.on("valuechange",function(obj){
//		alert(1)
//	})
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
