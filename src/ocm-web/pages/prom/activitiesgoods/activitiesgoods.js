define(['text!./activitiesgoods.html','ocm_common','searchbox','billfooter','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,billfooter,quoteDialog,distributionDialog,distributionNextDialog,
  		distributionDeleteDialog,distributionLookDialog,saveLoadDialog;
  baseData = {
    baseurl: '/promo-activity',
    baseurlChild: '/prom/activity-products',
    DemoProductCombineList: new u.DataTable(DemoProductCombine),
    DemoProductCombineItems: new u.DataTable(DemoProductCombineItem),
    DemoItemRefList: new u.DataTable(DemoItemRef),
    quoteItems: new u.DataTable(quoteItems),//引用上级活动
    distributionData: new u.DataTable(distributionItems),//产品分配临时数据
    distributionNextData: new u.DataTable(distributionNextItems),//产品分配临时数据下一步
    distributionSearchData: new u.DataTable(distributionSearchItems),//产品分配临时数据参照搜索
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    enableRadioSrc: [{value:1,name:"是"},{value:0,name:"否"}],
    // enableCheckSrc: [{value:"1",name:"是"}],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
//  //需要产品分配-查看状态
//  enableFmt: ko.pureComputed(function() {
//    var enableStatus = viewModel.DemoProductCombineList.ref("isProductDistri")();
//    return enableStatus == 1 ? "是" : "否";
//  }),
		//浏览状态，点击分配结果没有“删除分配”按钮
		isLook: ko.observable(),
		isLookComputed: ko.pureComputed(function() {
			if(this.billPanelStatus() === CONST.BILLPANELSTATUS.DETAIL){
				return this.isLook(false);
			}else{
				return this.isLook(true);
			}
		},this),
    //需要产品分配
    allotStatus: ko.pureComputed(function() {
    	var statusVal = parseInt(viewModel.DemoProductCombineList.ref("isProductDistri")());
    	var flag;
    	switch(statusVal){
    		case 1:
    		flag = true;
    		break;
    		case 0:
    		flag = false;
    		break;
    	};
    	return flag;
    }),
    dateFormat: common.format.dateFormat,
    //<产品/组合id, 经销商集合>，经销商集合可能的情况：
    //1: 为字符串key，关联customerSetMap中的经销商数组
    //2：经销商数组
    distributionMap: {},
    //<customerSet_i(i=1,2,...n), 经销商数组>
    customerSetMap: {size: 0},
  };
  rendertype = {
//  operation: common.rendertype.operation,
    detailRender: common.rendertype.detailRender,
    booleanRenderText:common.rendertype.whetherRender,
    //判断表格里的状态
	  approveFormat: function (obj) {
	  	var showValue = obj.value == "1" ? "已审核" : "未审核";
      obj.element.innerHTML = showValue;
	  },
	  enableRender: common.rendertype.enableRender,
    isDistributionRender: function(params) {
      params.element.innerHTML = "否";
      /*默认1表示启用，0表示停用*/
      if(params.value!=0&&params.value!="0"){
        params.element.innerHTML = "是";
      }
    },
    //分配详情
    allotDetail:function(obj){
      var viewModel = obj.gridObj.viewModel;
      var lookfun = "data-bind=click:lookfun.bind($data," + obj.row.value["$_#_@_id"] + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      lookfun +
      ' title="分配结果">分配结果</a>'+
      '</span>'+
      '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    }
  };
  events = {
    //导入
    importHandle: function() {
      var urlInfo = viewModel.baseurlChild + "/getDataFromExcelDataImport"; //倒入地址参数
      // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
      var ele = $('#importFiel')[0]; //挂载元素
      var setDate = function (data) {
          viewModel.DemoProductCombineItems.setSimpleData(data, {status: "new"});
      };
      common.fileHandle.importToPage(urlInfo,ele,setDate);
    },
    //导出
    exportHandle: function() {
      var searchParams = {}; //搜索查询参数
      var id = viewModel.DemoProductCombineList.getCurrentRow().getValue("id")
      searchParams['search_EQ_activityId']=id;
      var templateUrl = viewModel.baseurlChild + '/downloadExcelTemplate'; //导出模板地址参数
      var excelDataUrl =  viewModel.baseurlChild + '/excelDataExport'; //导出数据地址参数
      var listData = viewModel.DemoProductCombineItems; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
    },
  	 //判断状态
    allotText: function () {
      	var auditStatusValue = parseInt(viewModel.DemoProductCombineList.getValue('isProductDistri'));

      	var auditStatusName;
      	switch(auditStatusValue){
      		case 0:
	      		auditStatusName = '否';
	      		break;
      		case 1:
	      		auditStatusName = '是';
	      		break;
      		default:
      			auditStatusName = '否';
      	}
      	return auditStatusName;
    },
  	//编辑状态
  	editHandle: function() {
      var approveStatus = viewModel.DemoProductCombineList.getValue("approveStatus");
      approveStatus = parseInt(approveStatus);
      if(approveStatus == 1) {
        toastr.warning("已审核数据不可编辑");
        return;
      }
  		var self = this;
  		$(".ui-bill-detail").hide();
  		$(".ui-bill-panel").show();
  		self.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
  	},
  	//查看分配
  	lookfun: function(rowId) {
  		var self = this;
			var combineCurrentRow = viewModel.DemoProductCombineItems.getRowByRowId(rowId);
      var showId = combineCurrentRow.getValue("productId") ? combineCurrentRow.getValue("productId") : combineCurrentRow.getValue("combineId");
      var distributionDatas = viewModel.distributionMap[showId];
      //TODO: 如果前台已分配经销商Map中不存在，请求后台已分配经销商
      if(!distributionDatas) {
        // 选品关联id
        var itemId = combineCurrentRow.getValue("id");
        if(itemId) {
          $._ajax({
            type: "get",
            url: appCtx + viewModel.baseurlChild + "/findDistributeResult",
            data: {parentIds: itemId},
            async: false,
            success: function(existDistributionMap) {
              distributionDatas = existDistributionMap[showId];
            }
          })
        }
      }
      if(typeof distributionDatas === "string") {
        distributionDatas = viewModel.customerSetMap[distributionDatas];
      }
      viewModel.distributionNextData.setSimpleData(distributionDatas, {unSelect:true}, true);
			distributionLookDialog = u.dialog({id:'distributionLookDialog',content:"#dialog_content_distribution_look","width":"80%"});
			var deleteButton = $("#dialog_content_distribution_look .u-msg-delete");
			if(self.billPanelStatus() === CONST.BILLPANELSTATUS.DETAIL){
				deleteButton.hide();
			}else{
				deleteButton.show();
			}
			deleteButton.unbind("click").click(function(){
				self.lookDeleteDistribution(combineCurrentRow);
			});
			var okButton = $("#dialog_content_distribution_look .u-msg-ok");
			okButton.unbind("click").click(function(){
				distributionLookDialog.close();
			});
			var cancelButton = $("#dialog_content_distribution_look .u-msg-cancel");
			cancelButton.unbind("click").click(function(){
				distributionLookDialog.close();
			});
  	},
  	//查看-删除分配
  	lookDeleteDistribution: function(subRow) {
      var combineCode = subRow.getValue("showCode");
      var showId = subRow.getValue("productId") ? subRow.getValue("productId") : subRow.getValue("combineId");
  		var agencySelectRows = viewModel.distributionNextData.getSelectedRows();
      viewModel.distributionNextData.removeRows(agencySelectRows, {forceDel: true});
      var afterDelDatas = viewModel.distributionNextData.getSimpleData();
      // 删除全部分配，设置是否已分配为否
      if(afterDelDatas.length == 0) {
        subRow.setValue("isDistribution","0");
      }
      viewModel.distributionMap[showId] = afterDelDatas;
  	},
  	//删除分配
	  deleteDistribution: function() {
	  	var self = this;
			var selectRows = viewModel.DemoProductCombineItems.getSelectedRows();
			if(selectRows.length < 1) {
        toastr.error("请先选择数据");
        return;
      }
			var selectRowsData = viewModel.DemoProductCombineItems.getSimpleData({type:"select"});
			viewModel.distributionData.removeAllRows();
			viewModel.distributionData.setSimpleData(selectRowsData);
			distributionDeleteDialog = u.dialog({id:'distributionDeleteDialog',content:"#dialog_content_distribution_delete"});
			var deleteButton = $("#dialog_content_distribution_delete .u-msg-ok");
			deleteButton.unbind("click").click(function (){
				self.deleteHandle(selectRows);
				distributionDeleteDialog.close();
			});
			var cancelButton = $("#dialog_content_distribution_delete .u-msg-cancel");
			cancelButton.unbind("click").click(function (){
				distributionDeleteDialog.close();
			});
		},
		//确认删除分配
		deleteHandle: function(selectRowsArr) {
			for( var i = 0; i < selectRowsArr.length; i++){
        var showId = selectRowsArr[i].getValue("productId") ? selectRowsArr[i].getValue("productId") : selectRowsArr[i].getValue("combineId");
        viewModel.distributionMap[showId] = [];
        selectRowsArr[i].setValue("isDistribution","0");
			}
      toastr.success();
		},
  	//产品分配
  	productDistribution: function() {
  		var self = this;
  		var selectRows = viewModel.DemoProductCombineItems.getSelectedRows();
      var activityId = viewModel.DemoProductCombineList.getValue("id");
      $("#customerIds").attr("data-refparam",JSON.stringify({"activityId":activityId}));
      $("#agencyIds").attr("data-refparam",JSON.stringify({"activityId":activityId}));
      if(selectRows.length < 1) {
        toastr.error("请先选择数据");
        return;
      }
  		var selectRowsData = viewModel.DemoProductCombineItems.getSimpleData({type:"select"});
  		viewModel.distributionData.removeAllRows();
  		viewModel.distributionData.setSimpleData(selectRowsData);
  		if(distributionDialog) {
  			distributionDialog.show();//已经存在就直接显示
  		}
  		else {
  			distributionDialog = u.dialog({id:'distributionDialog',content:"#dialog_content_distribution"});
  		}
  		var nextButton = $("#dialog_content_distribution .u-msg-next")[0];
			u.on(nextButton,'click', function(){
				self.nextHandle();
			});
			var cancelButton = $("#dialog_content_distribution .u-msg-cancel")[0];
			u.on(cancelButton,'click', function(){
				distributionDialog.hide();
			});
  	},
  	//产品分配下一步
  	nextHandle: function() {
  		var self = this;
  		distributionDialog.hide();
  		if(distributionNextDialog) {
  			distributionNextDialog.show();
  		}
  		else {
  			distributionNextDialog = u.dialog({id:'distributionNextDialog-zhy',content:"#dialog_content_distribution_next","width":"80%"});
  		}
  		viewModel.distributionNextData.removeAllRows();
  		viewModel.distributionSearchData.removeAllRows();
      viewModel.clearDistributionSearchData();
  		viewModel.distributionSearchData.createEmptyRow();

  		var prevButton = $("#dialog_content_distribution_next .u-msg-prev");
  		prevButton.unbind("click").click(function (){
				distributionNextDialog.hide();
  			distributionDialog.show();
			});
			var cancelButton = $("#dialog_content_distribution_next .u-msg-cancel");
			cancelButton.unbind("click").click(function (){
				distributionNextDialog.close();
				distributionDialog.close();
			});
			var okButton = $("#dialog_content_distribution_next .u-msg-ok");
			okButton.unbind("click").click(function (){
				self.allot();
				distributionNextDialog.close();
				distributionDialog.close();//待定  iuap需要调接口
			});
  	},
    // 清除产品分配经销商搜索条件已选参照
    clearDistributionSearchData: function() {
      var partition = $("#refContaineragencyPartitionIds").data("uui.refer");
      var agency = $("#refContaineragencyIds").data("uui.refer");
      var customer = $("#refContainercustomerIds").data("uui.refer");
      if(partition) {
        partition.uncheckAll();
        partition.setValue([]);
      }
      if(agency) {
        agency.uncheckAll();
        agency.setValue([]);
      }
      if(customer) {
        customer.uncheckAll();
        customer.setValue([]);
      }
    },
  	//确人分配
  	allot: function() {
  		var self = this;
  		var combineSelectRows = viewModel.DemoProductCombineItems.getSelectedRows();
  		var distributionSelectRows = viewModel.distributionNextData.getSelectedRows();
  		var distributionData = viewModel.distributionNextData.getSimpleData({type:"select"});
      var customerSet_keyName = "customerSet_" + (viewModel.customerSetMap.size+1);
      viewModel.customerSetMap[customerSet_keyName] = distributionData;
      viewModel.customerSetMap.size++;
      //TODO: 根据产品id获取已分配的经销商 形如：<产品/产品组合id, 经销商数组>，没有已分配经销商的产品code不需要加入
      var existDistributionMap = {};
      var combineIds = [];
      for(var i=0;i<combineSelectRows.length;i++) {
        combineSelectRows[i].setValue("isDistribution", "1");
        if(combineSelectRows[i].getValue("id")) {
          combineIds.push(combineSelectRows[i].getValue("id"));
        }
      }
      if(combineIds.length > 0) {
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurlChild + "/findDistributeResult",
          data: {parentIds: combineIds.join(",")},
          async: false,
          success: function(map) {
            existDistributionMap = map;
          }
        })
      }
  		for( var a=0; a < combineSelectRows.length; a++){
        var showId = combineSelectRows[a].getValue("productId") ? combineSelectRows[a].getValue("productId") : combineSelectRows[a].getValue("combineId");
        var unionDistribution = [];
        var showIdValue = viewModel.distributionMap[showId];
        //前台存在已分配经销商
        if(showIdValue) {
          if(u.isArray(showIdValue)) {
            unionDistribution = viewModel.union("distributorId", showIdValue, distributionData);
          }
          // 分配经销商Map存的是类似"customerSet_1"的字符串，则从customerSetMap中获取实际经销商数组
          else{
            unionDistribution = viewModel.union("distributorId", viewModel.customerSetMap[showIdValue], distributionData);
          }
        }
        //后台存在已分配经销商
        else if(existDistributionMap[showId] && existDistributionMap[showId].length > 0) {
          unionDistribution = viewModel.union("distributorId", existDistributionMap[showId], distributionData);
        }
        else {
          unionDistribution = customerSet_keyName;
        }
        viewModel.distributionMap[showId] = unionDistribution;
	  	}
  	},
    // 并集操作
    union: function(keyName, A, B) {
      var unionMap = {};
      var unionArr = [];
      for(var i=0;i<A.length;i++) {
        var keyValue = A[i][keyName];
        unionMap[keyValue] = A[i];
      }
      for(var i=0;i<B.length;i++) {
        var keyValue = B[i][keyName];
        if(!unionMap[keyValue]) {
          unionMap[keyValue] = B[i];
        }
      }
      for(var key in unionMap) {
        unionArr.push(unionMap[key]);
      }
      return unionArr;
    },
    // 任意个数集合并集
    // union2: function(keyName) {
    //   var setArray = Array.prototype.slice.call(arguments, 1);
    //   var unionMap = {};
    //   var unionArr = [];
    //   for(var i=0;i<setArray.length;i++) {
    //     var oneSet = setArray[i];
    //     for(var j=0;j<oneSet.length;j++) {
    //       var keyValue = oneSet[j][keyName];
    //       if(!unionMap[keyValue]) {
    //         unionMap[keyValue] = oneSet[j];
    //       }
    //     }
    //   }
    //   for(var key in unionMap) {
    //     unionArr.push(unionMap[key]);
    //   }
    //   return unionArr;
    // },
  	//分配去重方法
  	dislodge: function(combineArr,valId) {
  		var combineIdArr = [];
  		for(var i = 0; i < combineArr.length; i++){
  			combineIdArr.push(combineArr[i].distributorId);
  		};
  		if(combineIdArr.indexOf(valId) == "-1"){
  			return true;
  		}else{
  			return false;
  		}
  	},
  	//点击选品
  	selectionClick: function() {
  		var selectRowArr = viewModel.DemoProductCombineList.getSelectedRows();
      if(selectRowArr.length != 1) {
        toastr.warning("请选择一条数据");
        return;
      }
      var activityId = selectRowArr[0].getValue('id');
      $("#agencyIds").attr("data-refparam",'{"activityId":"'+activityId+'"}');
      $("#customerIds").attr("data-refparam",'{"activityId":"'+activityId+'"}');
      var self = this;
      if(parseInt(selectRowArr[0].getValue("approveStatus")) == 1) {
        toastr.warning("已审核数据不可编辑");
        return;
      }
  		var id;
  		if( selectRowArr.length > 1){

  		}else if( selectRowArr.length < 1){

  		}else{
  			id = selectRowArr[0].getValue("id");
        viewModel.DemoProductCombineList.setRowFocus(selectRowArr[0]);
        // 产品分配如果不存在设置为否
        var isProductDistri = viewModel.DemoProductCombineList.getValue("isProductDistri");
        if(!isProductDistri && isProductDistri != "0") {
          viewModel.DemoProductCombineList.setValue("isProductDistri","0");
        }
  			//根据id查子表
				self.findByParentid(id);
				self.goBillPanel();
  		}
  	},
  	//引用上级活动选品
  	quoteHandle: function() {
			var id = viewModel.DemoProductCombineList.getCurrentRow().getValue("id");
			$._ajax({
	      url:appCtx + viewModel.baseurlChild + '/findProductsByUpperActivityId',
	      type:'get',
	      data:{
	      	id: id
	      },
        async: false,
	      contentType: "application/json; charset=utf-8",
	      success:function(data){
	        viewModel.quoteItems.setSimpleData(data,{unSelect:true});
          viewModel.quoteItems.setAllRowsSelect();
          quoteDialog = u.dialog({id:'quoteDialog',content:"#dialog_content_quote"});
          var okButton = $("#dialog_content_quote .u-msg-ok")[0];
            u.on(okButton,'click', function(){
              var selectQuoteRows = viewModel.quoteItems.getSelectedRows();
              var existItemMap = {};
              var existItemRealRows = viewModel.DemoProductCombineItems.getAllRealRows();
              for(var i=0;i<existItemRealRows.length;i++) {
                var showId = existItemRealRows[i].getValue("productId") ? existItemRealRows[i].getValue("productId") : existItemRealRows[i].getValue("combineId");
                existItemMap["showId"] = true;
              }
              var needAddItems = [];
              for( var i=0; i < selectQuoteRows.length; i++){
                var showId = selectQuoteRows[i].getValue("productId") ? selectQuoteRows[i].getValue("productId") : selectQuoteRows[i].getValue("combineId");
                if(existItemMap["showId"] !== true) {
                  needAddItems.push(selectQuoteRows[i].getSimpleData());
                }
              }
              viewModel.DemoProductCombineItems.setSimpleData(needAddItems,{status: "new"});
              quoteDialog.close();
            });
          var cancelButton = $("#dialog_content_quote .u-msg-cancel")[0];
            u.on(cancelButton,'click', function(){
              quoteDialog.close();
            });
	      }
	    });

  	},
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if(reindex){
        viewModel.DemoProductCombineList.pageIndex(0);
      }
      viewModel.DemoProductCombineList.removeAllRows();
      var queryData = searcher.getDataWithOpr();
      var pageSize = viewModel.DemoProductCombineList.pageSize();
      var pageNumber = viewModel.DemoProductCombineList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl,
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.DemoProductCombineList.setSimpleData(data.content,{unSelect:true});
          viewModel.DemoProductCombineList.totalRow(data.totalElements);
          viewModel.DemoProductCombineList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      searcher.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.DemoProductCombineList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.DemoProductCombineList.pageSize(size);
      viewModel.search(true);
    },
    //详情
    detail: function() {
      //确保grid先将行设置为focus状态
      setTimeout(function(){
        var curRow = viewModel.DemoProductCombineList.getCurrentRow();
        var id = curRow.getValue("id");
        viewModel.findByParentid(id);
        // 产品分配如果不存在设置为否
        var isProductDistri = viewModel.DemoProductCombineList.getValue("isProductDistri");
        if(!isProductDistri && isProductDistri != "0") {
          viewModel.DemoProductCombineList.setValue("isProductDistri","0");
        }
        viewModel.goDetailPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
      }, 0);
    },
    //查询子表数据
    findByParentid: function(id) {
      $._ajax({
        url:appCtx + viewModel.baseurlChild + '/findProductsByActivityId',
        type: 'get',
        async: false,
        data: {id: id},
        success:function(data){
//      	for(var i = 0; i < data.length; i++){
//      		data[i].productRefer = data[i].productId ? data[i].productId:data[i].combineId;
//      	}
          viewModel.DemoProductCombineItems.setSimpleData(data,{unSelect:true});
        }
      })
    },
    //删除子表项
    delItems: function() {
      var selectedRows = viewModel.DemoProductCombineItems.getSelectedIndices();
      viewModel.DemoProductCombineItems.removeRows(selectedRows);
    },
    //保存
    saveBill: function() {
      var combineId = viewModel.DemoProductCombineList.getCurrentRow().getValue("id");
      var combineIsProductDistri = viewModel.DemoProductCombineList.getCurrentRow().getValue("isProductDistri");
      var allRows = viewModel.DemoProductCombineItems.getAllRows();
      for(var i = 0; i < allRows.length; i++){
      	allRows[i].setValue("activityId",combineId);
      	if(!allRows[i].getValue("id")){
      		allRows[i].status = "new";
      	}
      }
      var combineItems = viewModel.DemoProductCombineItems.getSimpleData();
      for(var i=0;i<combineItems.length;i++) {
        combineItems[i].activityProductDealerSet = [];
      }
      combineItems = combineItems == ""?[]:combineItems;
      //TODO: 后台修改，孙表数据通过distributionMap传到后台
      var dataObj = {
      		isProductDistri: combineIsProductDistri,
      		activityId: combineId,
      		activityProductList: combineItems,
          distributionMap: viewModel.distributionMap,
          customerSetMap: viewModel.customerSetMap
      }
      // 保存数据
      $._ajax({
        url:appCtx + viewModel.baseurlChild + "/batchSave",
        type:"post",
        data:JSON.stringify(dataObj),
        contentType : "application/json; charset=utf-8",
        success:function(data){
          u.hideLoader({hasback:true});
          viewModel.search();
          viewModel.retListPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        }
      });
      // 请求保存进度
      // saveLoadDialog = u.dialog({content: "#dialog_content_loading",width:"500px"});
      // var time = false;
      // var errorFlag = false;
      // var errorMsg = undefined;
      // var count = 0;  //返回进度为0次数  超过10次则停止请求
      // var t;
      // beginGet();
      // function beginGet(){
      //   if(errorFlag) {
      //     u.hideLoader({hasback:true});
      //     saveLoadDialog.close();
      //     clearTimeout(t);
      //     if(errorMsg) {
      //       toastr.error(errorMsg);
      //     }
      //     return;
      //   }
      //   else if(time) {
      //     u.hideLoader({hasback:true});
      //     saveLoadDialog.close();
      //     viewModel.search();
      //     viewModel.retListPanel();
      //     viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
      //     clearTimeout(t);
      //     return;
      //   };
      //   getStatus();
      //   t = setTimeout(beginGet,5000);
      // }
      // function getStatus(){
      //   $.ajax({
      //     url: appCtx+viewModel.baseurlChild+ "/savelLoadingStatus",
      //     type: 'GET',
      //     contentType: false
      //   }).done(function(res) {
      //     try {
      //       if(res.error) {
      //         errorFlag = true;
      //         errorMsg = res.error;
      //       }
      //       if(res.result) {
      //         var loadingStatus = res.result.loadingStatus;
      //         var errorNum = res.result.errorNum;
      //         var totalNum = res.result.totalNum;
      //         var currentNum = res.result.currentNum;
      //         var $dialog = $(saveLoadDialog.contentDom);
      //         $dialog.find('#progress-bar').css('width',loadingStatus+'%');
      //         $dialog.find('#progress-num').text(loadingStatus+'%');
      //         $dialog.find("#total-num").text(totalNum);
      //         $dialog.find("#already-num").text(currentNum);
      //         if(loadingStatus == "0") {
      //           count++;
      //         }
      //         if(totalNum == currentNum && loadingStatus=='100'){
      //           time = true;
      //           clearTimeout(t);
      //           saveLoadDialog.close();
      //           viewModel.retListPanel();
      //           u.hideLoader({hasback:true});
      //           viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
      //           viewModel.search();
      //         }
      //       }
      //     }
      //     catch(e) {
      //       errorFlag = true;
      //       errorMsg = res.error;
      //       throw e;
      //     }
      //
      //   }).fail(function(res) {
      //     errorFlag = true;
      //     errorMsg = res.error;
      //   });
      // }
    },
    //取消单据
    cancelBill: function() {
      viewModel.search();
      viewModel.retListPanel();
      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
    },
    //启用
    enable: function() {
      var selectedRows = viewModel.DemoProductCombineItems.getSelectedRows();
      if(selectedRows.length < 1){
      		toastr.warning("请选择数据");
      		return;
      }
      for(var i=0;i<selectedRows.length;i++) {
        selectedRows[i].setValue("isEnable", "1");
      }
    },
    //停用
    disable: function() {
      var selectedRows = viewModel.DemoProductCombineItems.getSelectedRows();
      if(selectedRows.length < 1){
      		toastr.warning("请选择数据");
      		return;
      }
      for(var i=0;i<selectedRows.length;i++) {
        selectedRows[i].setValue("isEnable", "0");
      }
    },
    //参照选择批量新增子表
    showAddItemsRef: function() {
      viewModel.clearItemsRef();
      $("#addItemsRef .refer").trigger("click");
    },
    //清空已选产品组合参照
    clearItemsRef: function() {
      viewModel.DemoItemRefList.setValue("productRefer", "");
      var refer = $("#refContainerproductRefer").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },
    // 全选或全反选经销商
    toggleAllCustomer: function(vm, vent) {
      var $allcheckspan = $(vent.target).closest(".ui-table").find(".u-grid-checkbox-outline");
      if(viewModel.distributionNextData.allSelected()===true) {
        viewModel.distributionNextData.setAllRowsUnSelect({quiet:true});
        $allcheckspan.removeClass("is-checked");
      }
      else {
        viewModel.distributionNextData.setAllRowsSelect();
        $allcheckspan.addClass("is-checked");
      }
    },
    // 选择/反选经销商
    toggleOneCustomer: function(row, row2, vent) {
      var $checkspan = $(vent.target).closest(".checkbox-wrap").find(".u-grid-checkbox-outline");
      if(row.selected() === true) {
        viewModel.distributionNextData.setRowUnSelect(row);
        $checkspan.removeClass("is-checked");
      }
      else {
        viewModel.distributionNextData.addRowSelect(row);
        $checkspan.addClass("is-checked");
      }
    },
    // 详情-停用
    detailDisable: function() {
      var selectedRows = viewModel.DemoProductCombineItems.getSelectedRows();
      var ids = [];
      for(var i=0;i<selectedRows.length;i++) {
        if(selectedRows[i].getValue("isEnable") == "1") {
          ids.push(selectedRows[i].getValue("id"));
        }
      }
      $._ajax({
        type: "post",
        url: appCtx + viewModel.baseurlChild + "/batch-disable",
        data: {ids: ids.join(",")},
        success: function() {
          for(var i=0;i<selectedRows.length;i++) {
            if(selectedRows[i].getValue("isEnable") == "1") {
              selectedRows[i].setValue("isEnable", "0");
            }
          }
          toastr.success();
        }
      });
    },
  }
  viewModel = u.extend({},baseData,events,rendertype);

  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    searcher = new searchbox(
      $("#DemoProductCombine-searchcontent")[0],
      [
        {
          type:"refer",
          key:"activeType--id",
          label:"活动类型名称",
          refinfo:"activitytypeb",
          multi:true,
        },
        {
          type:"refer",
          key:"activeNode--id",
          label:"活动节点名称",
          refinfo:"activenode",
          multi:true
        },
        {
	        type:"radio",
	        key:"approveStatus",
	        label:"审核状态",
	        dataSource:CONST.APPROVESEARCH,
	        defaultvalue: CONST.DEFAULTOPTION,
	        opr: "IN",
	      },
        {
          type:"text",
          key:"code",
          label:"活动编码"
        },
        {
          type:"text",
          key:"name",
          label:"活动名称"
        },
        {
          type:"daterange",
          label:"订货开始日期",
        	key:"orderStartDate"
        },
        {
          type:"daterange",
          label:"订货截至日期",
        	key:"orderEndDate"
        },
        {
          type:"daterange",
          label:"终端活动开始日期",
          key:"terminalStartDate"
        },
        {
          type:"daterange",
          label:"终端活动截至日期",
          key:"terminalEndDate"
        },
        {
          type:"daterange",
          label:"报名开始日期",
          key:"enrolStartDate"
        },
        {
          type:"daterange",
          label:"报名结束日期",
          key:"enrolEndDate"
        },
      ]);
      billfooter = new Billfooter(
        $(".ui-bill-footer").get(),
        viewModel,
        "DemoProductCombineList"
      );
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#DemoProductCombine-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
//  var pagebcomp = $("#pagination")[0]['u.pagination'];
//  pagebcomp.update({showState:false});
    // 点击增行 参照带入多字段
    viewModel.DemoItemRefList.on("productRefer.valuechange", function(obj) {
    	 // 清空参照时不增行(点取消)
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContainerproductRefer").data("uui.refer");
      var refValues = refer.values;

      if(refValues && refValues.length > 0) {
        var existItems = viewModel.DemoProductCombineItems.getSimpleData();
        var needAddItems = [];
        for(var i=0;i<refValues.length;i++) {
          var refpk = refValues[i].refpk;
          var row = undefined;
          var productId = undefined;
          var combineId = undefined;
          if(refValues[i].isproduct == "1") {
            row = viewModel.DemoProductCombineItems.getRowByField("productId", refpk);
            productId = refpk;
          }
          else {
            row = viewModel.DemoProductCombineItems.getRowByField("combineId", refpk);
            combineId = refpk;
          }
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            var needAddItem = {};
            needAddItem.showCode = refValues[i].refcode;
            needAddItem.showName = refValues[i].refname;
            needAddItem.productSys = refValues[i].colorName;
            needAddItem.productmainColorDocName = refValues[i].productModelName;
            needAddItem.productProState = refValues[i].proStateName;
            needAddItem.productUnitName = refValues[i].baseUnitName;
            needAddItem.productCategoryName = refValues[i].productCategoryName;
            needAddItem.standardName = refValues[i].standardName;
            needAddItem.productId = productId;
            needAddItem.combineId = combineId;
            needAddItem.persistStatus = "new";
            needAddItems.push(needAddItem);
          }
        }
        var concatItems = needAddItems.concat(existItems);
        viewModel.DemoProductCombineItems.setSimpleData(concatItems, {unSelect: true}, true);
      }
    });
    //切换-参照(点击产品编码)
//	viewModel.DemoProductCombineItems.on("productRefer.valuechange", function(obj) {
//				var currentRow = obj.rowObj;
//				var isProduct = currentRow.getValue("isProduct");
//				var productRefer = currentRow.getValue("productRefer");
//				if(isProduct == "1"){
//					currentRow.setValue("productId",productRefer);
//					currentRow.setValue("combineId",null);
//				}else if(isProduct == "0"){
//					currentRow.setValue("combineId",productRefer);
//					currentRow.setValue("productId",null);
//				}else{
//					var haveProductId = currentRow.getValue("productId");
//					haveProductId?currentRow.setValue("productId",productRefer):currentRow.setValue("combineId",productRefer);
//				}
//	});
    //产品分配 搜索
    viewModel.distributionSearchData.on("valuechange", function(obj) {
      if(obj.field === "agencyPartitionIds" || obj.field === "agencyIds" || obj.field === "customerIds") {
        var agencyIds = viewModel.distributionSearchData.getValue("agencyIds");
        var activityId = viewModel.DemoProductCombineList.getValue("id");
        $("#customerIds").attr("data-refparam",JSON.stringify({"agencyIds":agencyIds,"activityId":activityId}));
        viewModel.distributionSearchData.setValue("activityId",activityId);
        var searchdata = viewModel.distributionSearchData.getSimpleData()[0];
        $._ajax({
          url:appCtx + viewModel.baseurlChild + '/findCustomerInfoByQueryConditions',
          type:'post',
          data:JSON.stringify(searchdata),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            viewModel.distributionNextData.removeAllRows();
            viewModel.distributionNextData.setSimpleData(data,{unSelect:true,status:"new"});
            viewModel.distributionNextData.setAllRowsSelect();
            $("#batchDistributionTable").find(".u-grid-checkbox-outline").addClass("is-checked");
          }
        });
      }
    });
    viewModel.billPanelStatus.subscribe(function(value) {
      // 进入编辑态后操作
      if(value === CONST.BILLPANELSTATUS.EDIT || value === CONST.BILLPANELSTATUS.DETAIL) {
        viewModel.distributionMap = {};
        viewModel.customerSetMap = {size: 0};
      }
    })
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    var refRow = viewModel.DemoItemRefList.createEmptyRow();
    viewModel.DemoItemRefList.setRowFocus(refRow);
    window.vm = viewModel;
  }

  return {
    init: init
  }
});
