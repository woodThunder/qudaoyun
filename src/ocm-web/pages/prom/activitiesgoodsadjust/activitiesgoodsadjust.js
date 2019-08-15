define(['text!./activitiesgoodsadjust.html','ocm_common','searchbox','billfooter','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,billfooter,quoteDialog,distributionDialog,distributionNextDialog,
  		distributionDeleteDialog,distributionLookDialog,saveLoadDialog;
  baseData = {
    baseurl: '/prom/activity-products-adjust',
    baseurlChild: '/prom/activity-products',
    ActivityProductAdjustList: new u.DataTable(ActivityProductAdjust),
    ActivityProductAdjustDetailItem: new u.DataTable(ActivityProductAdjustDetail),
    ProductRefer: new u.DataTable(ProductRef),
    ParentActivityProductItem: new u.DataTable(ParentActivityProduct),//引用上级活动
    DealeringProductItem: new u.DataTable(DealeringProduct),//产品分配临时数据 DealeringProductItem
    ProductDealeringCustomer: new u.DataTable(ProductDealeringCustomer),//产品分配临时数据下一步
    ProductDealeredCustomer: new u.DataTable(ProductDealeredCustomer),//产品已分配经销商
    ProductCustomerDealerSearch: new u.DataTable(ProductCustomerDealerSearch),//产品分配临时数据参照搜索
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
//    var enableStatus = viewModel.ActivityProductAdjustList.ref("isProductDistri")();
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
    isProductDistri: ko.pureComputed(function() {
      var showValue = "";
      var productDistri = viewModel.ActivityProductAdjustList.ref("isProductDistri")();
      if(productDistri == "1") {
        showValue = "是";
      }
      else if(productDistri == "0") {
        showValue = "否";
      }
      return showValue;
    }),
    //需要产品分配
    allotStatus: ko.pureComputed(function() {
    	var statusVal = parseInt(viewModel.ActivityProductAdjustList.ref("isProductDistri")());
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
    operation: common.rendertype.operation,
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
    },
    isProductDistriFormat: function() {
      var isProductDistri = viewModel.ActivityProductAdjustList.ref("isProductDistri")();
      var showValue = "";
      if(isProductDistri == "1") {
        showValue = "是";
      }
      else if(isProductDistri == "0") {
        showValue = "否";
      }
      return showValue;
    },
  };
  events = {
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if(reindex){
        viewModel.ActivityProductAdjustList.pageIndex(0);
      }
      viewModel.ActivityProductAdjustList.removeAllRows();
      var queryData = searcher.getDataWithOpr();
      var pageSize = viewModel.ActivityProductAdjustList.pageSize();
      var pageNumber = viewModel.ActivityProductAdjustList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl,
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.ActivityProductAdjustList.setSimpleData(data.content,{unSelect:true});
          viewModel.ActivityProductAdjustList.totalRow(data.totalElements);
          viewModel.ActivityProductAdjustList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      searcher.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.ActivityProductAdjustList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.ActivityProductAdjustList.pageSize(size);
      viewModel.search(true);
    },
    // 进入新增单据页
    showAddBillPanel: function() {
      var curRow = viewModel.ActivityProductAdjustList.createEmptyRow();
      viewModel.ActivityProductAdjustList.setRowFocus(curRow);
      viewModel.ActivityProductAdjustDetailItem.removeAllRows();
      common.bill.goBillPanel();
      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
    },
    //删除和批量删除
    del: function (data,rowId) {
      var ids = [];
      var rows = [];
      if (typeof(data) == 'number') {
        viewModel.ActivityProductAdjustList.setRowSelectbyRowId(rowId);
      }
      rows = viewModel.ActivityProductAdjustList.getSelectedRows();
      if(rows.length == 0) {
        toastr.error("请选择数据");
        return
      }
      // 已审核调品单不可删除
      if(rows&&rows.length>0){
        for(var i = 0;i<rows.length;i++){
          ids.push(rows[i].getValue("id"));
          var approveStatus = rows[i].getValue("auditStatus");
          approveStatus = parseInt(approveStatus);
          if(approveStatus === 1) {
            toastr.error("已审核数据不可删除");
            return;
          }
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
              viewModel.ActivityProductAdjustList.removeRows(rows);
            }
          });

        }
      });
    },
    //进入修改单据页
    showEditBillPanel: function(index) {
      setTimeout(function(){
        var approveStatus = viewModel.ActivityProductAdjustList.getValue("auditStatus");
        approveStatus = parseInt(approveStatus);
        if(approveStatus === 1) {
          toastr.error("已审核数据不可编辑");
          return;
        }
        viewModel.ActivityProductAdjustList.setRowFocus(index);
        var id = viewModel.ActivityProductAdjustList.getValue("id");
        //请求完整主子表信息
        viewModel.fillData(id);
        common.bill.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      }, 0);
    },
    //进入详情页
    detail: function() {
      //确保grid先将行设置为focus状态
      setTimeout(function(){
        var curRow = viewModel.ActivityProductAdjustList.getCurrentRow();
        var id = curRow.getValue("id");
        //请求完整主子表信息
        viewModel.fillData(id);
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
        //加入bpm按钮
        // viewModel.initBPMFromBill(id,viewModel);
        common.bill.goDetailPanel();
      }, 0);
    },
    // 详情页跳转编辑单据页
    detail2bill: function() {
      var approveStatus = viewModel.ActivityProductAdjustList.getValue("auditStatus");
      approveStatus = parseInt(approveStatus);
      if(approveStatus === 1) {
        toastr.error("已审核数据不可编辑");
        return;
      }
      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      common.bill.detail2bill();
    },
    // 返回列表页
    retListPanel: function() {
      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
      common.bill.retListPanel();
    },
    // （编辑/详情）填充完整主子表数据 TODO:后台请求
    fillData: function(id, status) {
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl + "/findByActivityProductAdjustId",
        data: {activityProductAdjustId: id},
        async: false,
        success: function(data) {
          if(status) {
            viewModel.ActivityProductAdjustDetailItem.setSimpleData(data, {status: status});
          }
          else {
            viewModel.ActivityProductAdjustDetailItem.setSimpleData(data);
          }
        }
      })
    },
  	 //判断状态
    allotText: function () {
      	var auditStatusValue = parseInt(viewModel.ActivityProductAdjustList.getValue('isProductDistri'));

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
    //参照选择批量新增子表
    showAddItemsRef: function() {
      viewModel.clearItemsRef();
      $("#addItemsRef .refer").trigger("click");
    },
    //清空已选产品组合参照
    clearItemsRef: function() {
      viewModel.ProductRefer.setValue("productRefer", "");
      var refer = $("#refContainerproductRefer").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },
    //删除子表项
    delItems: function() {
      var selectedRows = viewModel.ActivityProductAdjustDetailItem.getSelectedIndices();
      viewModel.ActivityProductAdjustDetailItem.removeRows(selectedRows);
    },
    //产品分配
  	productDistribution: function() {
  		var self = this;
  		var selectRows = viewModel.ActivityProductAdjustDetailItem.getSelectedRows();
      var activityId = viewModel.ActivityProductAdjustList.getValue("activityId");
      $("#customerIds").attr("data-refparam",JSON.stringify({"activityId":activityId}));
      $("#agencyIds").attr("data-refparam",JSON.stringify({"activityId":activityId}));
      if(selectRows.length < 1) {
        toastr.error("请先选择数据");
        return;
      }
      var isProductDistri = viewModel.ActivityProductAdjustList.getValue("isProductDistri");
      // if(isProductDistri != "1") {
      //   toastr.error("您已勾选‘不需产品分配’，不需要再进行【产品分配】");
      //   return;
      // }
  		var selectRowsData = viewModel.ActivityProductAdjustDetailItem.getSimpleData({type:"select"});
  		viewModel.DealeringProductItem.removeAllRows();
  		viewModel.DealeringProductItem.setSimpleData(selectRowsData);
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
  		viewModel.ProductDealeringCustomer.removeAllRows();
  		viewModel.ProductCustomerDealerSearch.removeAllRows();
      viewModel.clearDistributionSearchData();
  		viewModel.ProductCustomerDealerSearch.createEmptyRow();

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
  		var combineSelectRows = viewModel.ActivityProductAdjustDetailItem.getSelectedRows();
  		var distributionSelectRows = viewModel.ProductDealeringCustomer.getSelectedRows();
  		var DealeringProductItem = viewModel.ProductDealeringCustomer.getSimpleData({type:"select"});
      var customerSet_keyName = "customerSet_" + (viewModel.customerSetMap.size+1);
      viewModel.customerSetMap[customerSet_keyName] = DealeringProductItem;
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
        // TODO: 后台请求
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/findDistributeResultByIds",
          data: {ids: combineIds.join(",")},
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
            unionDistribution = viewModel.union("distributorId", showIdValue, DealeringProductItem);
          }
          // 分配经销商Map存的是类似"customerSet_1"的字符串，则从customerSetMap中获取实际经销商数组
          else{
            unionDistribution = viewModel.union("distributorId", viewModel.customerSetMap[showIdValue], DealeringProductItem);
          }
        }
        //后台存在已分配经销商
        else if(existDistributionMap[showId] && existDistributionMap[showId].length > 0) {
          unionDistribution = viewModel.union("distributorId", existDistributionMap[showId], DealeringProductItem);
        }
        else {
          unionDistribution = customerSet_keyName;
        }
        viewModel.distributionMap[showId] = unionDistribution;
	  	}
  	},
    // 任意个数集合并集
    union: function(keyName) {
      var setArray = Array.prototype.slice.call(arguments, 1);
      var unionMap = {};
      var unionArr = [];
      for(var i=0;i<setArray.length;i++) {
        var oneSet = setArray[i];
        for(var j=0;j<oneSet.length;j++) {
          var keyValue = oneSet[j][keyName];
          if(!unionMap[keyValue]) {
            unionMap[keyValue] = oneSet[j];
          }
        }
      }
      for(var key in unionMap) {
        unionArr.push(unionMap[key]);
      }
      return unionArr;
    },
    //删除分配
	  deleteDistribution: function() {
	  	var self = this;
			var selectRows = viewModel.ActivityProductAdjustDetailItem.getSelectedRows();
			if(selectRows.length < 1) {
        toastr.error("请先选择数据");
        return;
      }
			var selectRowsData = viewModel.ActivityProductAdjustDetailItem.getSimpleData({type:"select"});
			viewModel.DealeringProductItem.removeAllRows();
			viewModel.DealeringProductItem.setSimpleData(selectRowsData);
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
  	//查看分配
  	lookfun: function(rowId) {
  		var self = this;
			var combineCurrentRow = viewModel.ActivityProductAdjustDetailItem.getRowByRowId(rowId);
      var showId = combineCurrentRow.getValue("productId") ? combineCurrentRow.getValue("productId") : combineCurrentRow.getValue("combineId");
      var dealeredCustomers = viewModel.distributionMap[showId];
      //如果前台已分配经销商Map中不存在且产品子表id存在，请求后台已分配经销商
      if(!dealeredCustomers) {
        // 选品关联id
        var itemId = combineCurrentRow.getValue("id");
        if(itemId) {
          //TODO: 后台请求
          $._ajax({
            type: "get",
            url: appCtx + viewModel.baseurl + "/findDistributeResultByIds",
            data: {ids: itemId},
            async: false,
            success: function(existDistributionMap) {
              dealeredCustomers = existDistributionMap[showId];
            }
          })
        }
      }
      else{
        if(typeof dealeredCustomers === "string") {
          dealeredCustomers = viewModel.customerSetMap[dealeredCustomers];
        }
      }

      viewModel.ProductDealeredCustomer.setSimpleData(dealeredCustomers, {unSelect:true}, true);
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
  		var deleteCustomerRows = viewModel.ProductDealeredCustomer.getSelectedRows();

      // var delDistributorIds = {};
      // for(var i=0;i<deleteCustomerRows.length;i++) {
      //   delDistributorIds[deleteCustomerRows[i].getValue("distributorId")] = "true";
      // }
      viewModel.ProductDealeredCustomer.removeRows(deleteCustomerRows);
      var datas = viewModel.ProductDealeredCustomer.getSimpleData();
      var realDatas = [];
      for(var i=0;i<datas.length;i++) {
        if(datas[i].persistStatus !== "fdel") {
          realDatas.push(datas[i]);
        }
      }
      // var dealeredCustomers = viewModel.distributionMap[showId];
      // if(typeof dealeredCustomers === "string") {
      //   dealeredCustomers = viewModel.customerSetMap[dealeredCustomers].concat([]);
      // }
      // var afterDelDatas = viewModel.ProductDealeredCustomer.getAllReal;
      // for(var i=0;i<dealeredCustomers.length;i++) {
      //   var distributorId = dealeredCustomers[i]["distributorId"];
      //   if(!(delDistributorIds[distributorId] == "true")) {
      //     afterDelDatas.push(dealeredCustomers[i]);
      //   }
      // }
      // 删除全部分配，设置是否已分配为否
      if(realDatas.length == 0) {
        subRow.setValue("isDistribution","0");
      }
      viewModel.distributionMap[showId] = realDatas;
  	},
    //保存
    saveBill: function() {
      var result = app.compsValidateMultiParam({element: ".ui-bill-panel",showMsg:true});
      if(!result.passed) {
        return;
      }
      var activityProductAdjustData = viewModel.ActivityProductAdjustList.getCurrentRow().getSimpleData();
      var activityProductAdjustDetails = viewModel.ActivityProductAdjustDetailItem.getSimpleData();
      activityProductAdjustData.activityProductAdjustDetails = activityProductAdjustDetails;
      //TODO: 保存后台请求; 进度条是否必要
      var dataObj = {
      		activityProductAdjust: activityProductAdjustData,
          distributionMap: viewModel.distributionMap,
          customerSetMap: viewModel.customerSetMap
      }
      $._ajax({
        url: appCtx + viewModel.baseurl + "/batchSave",
        type: "post",
        data: JSON.stringify(dataObj),
        contentType: "application/json;charset=utf-8",
        success: function(data) {
          viewModel.retListPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
          viewModel.search();
        }
      })
    },
    //取消单据
    cancelBill: function() {
      viewModel.search();
      viewModel.retListPanel();
      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
    },
    // 全选或全反选待分配经销商
    toggleAllDearleringCustomer: function(vm, vent) {
      var $allcheckspan = $(vent.target).closest(".ui-table").find(".u-grid-checkbox-outline");
      if(viewModel.ProductDealeringCustomer.allSelected()===true) {
        viewModel.ProductDealeringCustomer.setAllRowsUnSelect({quiet:true});
        $allcheckspan.removeClass("is-checked");
      }
      else {
        viewModel.ProductDealeringCustomer.setAllRowsSelect();
        $allcheckspan.addClass("is-checked");
      }
    },
    // 选择/反选待分配经销商
    toggleOneDearleringCustomer: function(row, row2, vent) {
      var $checkspan = $(vent.target).closest(".checkbox-wrap").find(".u-grid-checkbox-outline");
      if(row.selected() === true) {
        viewModel.ProductDealeringCustomer.setRowUnSelect(row);
        $checkspan.removeClass("is-checked");
      }
      else {
        viewModel.ProductDealeringCustomer.addRowSelect(row);
        $checkspan.addClass("is-checked");
      }
    },
    // 全选或全反选已分配经销商
    toggleAllDealeredCustomer: function(vm, vent) {
      var $allcheckspan = $(vent.target).closest(".ui-table").find(".u-grid-checkbox-outline");
      if(viewModel.ProductDealeredCustomer.allSelected()===true) {
        viewModel.ProductDealeredCustomer.setAllRowsUnSelect({quiet:true});
        $allcheckspan.removeClass("is-checked");
      }
      else {
        viewModel.ProductDealeredCustomer.setAllRowsSelect();
        $allcheckspan.addClass("is-checked");
      }
    },
    // 选择/反选已分配经销商
    toggleOneDearleredCustomer: function(row, row2, vent) {
      var $checkspan = $(vent.target).closest(".checkbox-wrap").find(".u-grid-checkbox-outline");
      if(row.selected() === true) {
        viewModel.ProductDealeredCustomer.setRowUnSelect(row);
        $checkspan.removeClass("is-checked");
      }
      else {
        viewModel.ProductDealeredCustomer.addRowSelect(row);
        $checkspan.addClass("is-checked");
      }
    },
    // 审核
    approve: function() {
      var selectedRows = viewModel.ActivityProductAdjustList.getSelectedRows();
      if(selectedRows.length != 1 ){
        toastr.error("请选择一条单据");
        return;
      }
      var id = selectedRows[0].getValue("id");
      $._ajax({
        url: appCtx + viewModel.baseurl + "/audit",
        type: "post",
        data: {ids: id},
        success: function() {
          viewModel.search();
        }
      })
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
          type:"text",
          key:"code",
          label:"调品单编码",
        },
        {
          type:"text",
          key:"name",
          label:"调品单名称",
        },
        {
	        type:"combo",
	        key:"auditStatus",
	        label:"审核状态",
	        dataSource:CONST.APPROVE,
	        defaultvalue: CONST.DEFAULTOPTION,
	      },
        {
          type:"text",
          key:"activity--code",
          label:"活动编码"
        },
        {
          type:"text",
          key:"activity--name",
          label:"活动名称"
        },
        // {
        //   type:"daterange",
        //   label:"订货开始日期",
        // 	key:"orderStartDate"
        // },
        // {
        //   type:"daterange",
        //   label:"订货截至日期",
        // 	key:"orderEndDate"
        // },
        // {
        //   type:"daterange",
        //   label:"终端活动开始日期",
        //   key:"terminalStartDate"
        // },
        // {
        //   type:"daterange",
        //   label:"终端活动截至日期",
        //   key:"terminalEndDate"
        // },
        // {
        //   type:"daterange",
        //   label:"报名开始日期",
        //   key:"enrolStartDate"
        // },
        // {
        //   type:"daterange",
        //   label:"报名结束日期",
        //   key:"enrolEndDate"
        // },
      ]);
      billfooter = new Billfooter(
        $(".ui-bill-footer").get(),
        viewModel,
        "ActivityProductAdjustList"
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
    viewModel.ProductRefer.on("productRefer.valuechange", function(obj) {
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
            row = viewModel.ActivityProductAdjustDetailItem.getRowByField("productId", refpk);
            productId = refpk;
          }
          else {
            row = viewModel.ActivityProductAdjustDetailItem.getRowByField("combineId", refpk);
            combineId = refpk;
          }
          var newrow = undefined;
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            newrow = viewModel.ActivityProductAdjustDetailItem.createEmptyRow({unSelect:true});
            newrow.setValue("showCode", refValues[i].refcode);
            newrow.setValue("showName", refValues[i].refname);
            newrow.setValue("productSys", refValues[i].saleSeriesName);
            newrow.setValue("productmainColorDocName", refValues[i].colorName);
            newrow.setValue("productType", refValues[i].productModelName);
            newrow.setValue("productProState", refValues[i].proStateName);
            newrow.setValue("productUnitName", refValues[i].baseUnitName);
            newrow.setValue("productCategoryName", refValues[i].productCategoryName);
            newrow.setValue("standardName", refValues[i].standardName);
//          newrow.setValue("isMain", refValues[i].isproduct);
//						newrow.setValue("isProduct", refValues[i].isproduct);
            newrow.setValue("productId", productId);
            newrow.setValue("combineId", combineId);
//          productId?newrow.setValue("productRefer", productId):newrow.setValue("productRefer", combineId);
          }
        }
      }
    });
    //产品分配 搜索
    viewModel.ProductCustomerDealerSearch.on("valuechange", function(obj) {
      if(obj.field === "agencyPartitionIds" || obj.field === "agencyIds" || obj.field === "customerIds") {
        var agencyIds = viewModel.ProductCustomerDealerSearch.getValue("agencyIds");
        var activityId = viewModel.ActivityProductAdjustList.getValue("activityId");
        $("#customerIds").attr("data-refparam",JSON.stringify({"agencyIds":agencyIds,"activityId":activityId}));
        viewModel.ProductCustomerDealerSearch.setValue("activityId",activityId);
        var searchdata = viewModel.ProductCustomerDealerSearch.getSimpleData()[0];
        $._ajax({
          url:appCtx + viewModel.baseurlChild + '/findCustomerInfoByQueryConditions',
          type:'post',
          data:JSON.stringify(searchdata),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            viewModel.ProductDealeringCustomer.removeAllRows();
            viewModel.ProductDealeringCustomer.setSimpleData(data,{unSelect:true,status:"new"});
            viewModel.ProductDealeringCustomer.setAllRowsSelect();
            $("#batchDistributionTable").find(".u-grid-checkbox-outline").addClass("is-checked");
          }
        });
      }
    });
    viewModel.billPanelStatus.subscribe(function(value) {
      // 进入编辑态后操作
      if(value === CONST.BILLPANELSTATUS.EDIT || value === CONST.BILLPANELSTATUS.ADD || value === CONST.BILLPANELSTATUS.DETAIL) {
        viewModel.distributionMap = {};
        viewModel.customerSetMap = {size: 0};
      }
    });
    // 活动变更，同步更新活动相关字段
    viewModel.ActivityProductAdjustList.on("activityId.valuechange",function(obj) {
      if(!obj.newValue) {
        obj.rowObj.setValue("activityCode", "");
        obj.rowObj.setValue("activityName", "");
        obj.rowObj.setValue("orderStartDate", "");
        obj.rowObj.setValue("orderEndDate", "");
        obj.rowObj.setValue("description", "");
        obj.rowObj.setValue("higherActiveCode", "");
        obj.rowObj.setValue("higherActiveName", "");
        obj.rowObj.setValue("isProductDistri", "");
      }
      else {
        var referValues = $("#refContaineractivityRefer").data("uui.refer").values;
        obj.rowObj.setValue("activityCode", referValues[0].refcode);
        obj.rowObj.setValue("activityName", referValues[0].refname);
        obj.rowObj.setValue("orderStartDate", referValues[0].orderStartDate);
        obj.rowObj.setValue("orderEndDate", referValues[0].orderEndDate);
        obj.rowObj.setValue("description", referValues[0].description);
        obj.rowObj.setValue("higherActiveCode", referValues[0].higherActiveCode);
        obj.rowObj.setValue("higherActiveName", referValues[0].higherActiveName);
        obj.rowObj.setValue("isProductDistri", referValues[0].isProductDistri);
      }
    });
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    var refRow = viewModel.ProductRefer.createEmptyRow();
    viewModel.ProductRefer.setRowFocus(refRow);
    window.vm = viewModel;
  }

  return {
    init: init
  }
});
