define(['text!./retailactivityprice.html','ocm_common','searchbox','billfooter'/*,'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js'*/,'editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter/*,bpmopenbill*/) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,singledocSearch,billfooter,wholeSaleBasePriceDialog;
  baseData = {
    baseurl : '/prom/activity-c-adjusts',
//  baseurlChild: '/float-coeff-adjust-det',
    searchUrl: '/prom/sale-activity-prices',
    RetailActivityPriceList: new u.DataTable(RetailActivityPrice),
    RetailActivityPriceItems: new u.DataTable(RetailActivityPriceItem),
    ProductRef: new u.DataTable(ProductRef),
//  DemoItemRefList: new u.DataTable(DemoItemRef),
    WholeSaleBasePrice: new u.DataTable(adjustmentRef1),
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    enableRadioSrc: [{value:"1",name:"启用"},{value:"0",name:"停用"}],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    //销售渠道 枚举值集合
//  saleChannelDataSource:ko.observableArray([]),
    //业务标识枚举
//  orderTypeDataSource:ko.observableArray([]),
    dateFormat: common.format.dateFormat
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
    },
  };
  events = {
    //导入
    importHandle: function() {
      var urlInfo = '/prom/activity-c-adjust-excel/excelDataImport'; //倒入地址参数
      var urlStatusInfo = '/prom/activity-c-adjust-excel/excelLoadingStatus'; //请求进度地址参数
      var ele = $('#importFiel')[0]; //挂载元素
      common.fileHandle.importFile(urlInfo,urlStatusInfo,ele,1);
    },
    //导出
    exportHandle: function() {
      var searchParams = searcher.getDataWithOpr(); //搜索查询参数
      var templateUrl = '/prom/activity-c-adjust-excel/downloadExcelTemplate'; //导出模板地址参数
      var excelDataUrl =  '/prom/activity-c-adjust-excel/excelDataExport'; //导出数据地址参数
      var listData = viewModel.RetailActivityPriceList; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
    },
    //编辑状态
    editHandle: function() {
      var self = this;
      var isauditStatus = viewModel.RetailActivityPriceList.getValue("auditStatus");
      if(isauditStatus == "1" || isauditStatus == 1){
        toastr.warning("该数据已审核不能编辑");
        return;
      }
      $(".ui-bill-detail").hide();
      $(".ui-bill-panel").show();
      self.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
    },
    //点击参照按钮
    referClick: function() {
      singledocSearch.clearSearch();
      viewModel.WholeSaleBasePrice.clear();
      var isActivityCode = viewModel.RetailActivityPriceList.getValue("activityCode");
      if(!isActivityCode){
        //TODO
        toastr.warning('活动编码');
        return;
      }
      var self = this;
      wholeSaleBasePriceDialog = u.dialog({id:'wholeSaleBasePriceDialog',content:"#dialog_content_wholesalebaseprice",width:"85%"});
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
      var selectedItemRows = viewModel.RetailActivityPriceItems.getAllRows();
      if(selectedItemRows.length < 1){
        //如果子表没数据直接添加所选
        viewModel.RetailActivityPriceItems.addSimpleData(selectedRowsData,"new",{unSelect:true});
      }else{
        //如果子表存在数据则需要进行判重再添加
        var itemsStringArr = [];
        for(var i = 0; i < selectedItemRows.length; i++){
          itemsStringArr.push(self.stringRow(selectedItemRows[i]))
        }
        //进行判重
        for(var a = 0; a < selectedRows.length; a++){
          var nowRowString = self.stringRow(selectedRows[a]);
          var row = viewModel.RetailActivityPriceItems.getRowByField("productSaleSeriesId",selectedRows[a].getValue("productSaleSeriesId"));
          if( row && row.status == 'fdel'){
            viewModel.RetailActivityPriceItems.addSimpleData(selectedRows[a].getSimpleData(),"new",{unSelect:true});
          }
          if(itemsStringArr.indexOf(nowRowString) < 0){
            viewModel.RetailActivityPriceItems.addSimpleData(selectedRows[a].getSimpleData(),"new",{unSelect:true});
          }
        }
      }
    },
    //选择参照的需要去掉id，并把状态改为‘new’
    refRow: function(rowArr) {
      for(var i = 0; i < rowArr.length; i++){
        rowArr[i].setValue("id","");
//				if(rowArr[i].getValue("productId")){
//					rowArr[i].setValue("productRefer",rowArr[i].getValue("productId"));
//				}else{
//					rowArr[i].setValue("productRefer",rowArr[i].getValue("combineId"));
//				}
      }
    },
    //获取参照选中行的值 拼接成字符串 进行比较
    //需要6个字段值
    stringRow: function(row) {
      var stringArr = [ row.getValue("productCode"),
        row.getValue("productName"),
        row.getValue("productSaleSeriesName"),
        row.getValue("customerName"),
        row.getValue("shopName"),
      ];
      return stringArr.join("@");
    },
    //参照弹出框 搜索
    singledocSearch: function(reindex) {
      var self = this;
      //当前主表Id
      var currentId = viewModel.RetailActivityPriceList.getCurrentRow().getValue("activityId");
      if(reindex){
        viewModel.WholeSaleBasePrice.pageIndex(0);
        viewModel.WholeSaleBasePrice.clear();
      }
//  	viewModel.WholeSaleBasePrice.removeAllRows();

      var queryData = singledocSearch.getDataWithOpr();
      var pageSize = viewModel.WholeSaleBasePrice.pageSize();
      var pageNumber = viewModel.WholeSaleBasePrice.pageIndex();
      queryData['search_EQ_activity.id'] = currentId;
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
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if(reindex){
        viewModel.RetailActivityPriceList.pageIndex(0);
      }
      viewModel.RetailActivityPriceList.removeAllRows();
      var queryData = searcher.getDataWithOpr();
      var pageSize = viewModel.RetailActivityPriceList.pageSize();
      var pageNumber = viewModel.RetailActivityPriceList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl,
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.RetailActivityPriceList.setSimpleData(data.content,{unSelect:true});
          viewModel.RetailActivityPriceList.totalRow(data.totalElements);
          viewModel.RetailActivityPriceList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      searcher.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.RetailActivityPriceList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.RetailActivityPriceList.pageSize(size);
      viewModel.search(true);
    },
    //删除和批量删除
    del: function (data,rowId) {
      if (typeof(data) == 'number') {
        viewModel.RetailActivityPriceList.setRowSelectbyRowId(rowId);
      }
      var ids = [];
      var rows = viewModel.RetailActivityPriceList.getSelectedRows();
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
              viewModel.RetailActivityPriceList.removeRows(rows);
            }
          });
        }
      });
    },
    //进入新增单据页
    showAddBillPanel: function() {
      var curRow = viewModel.RetailActivityPriceList.createEmptyRow();
      viewModel.RetailActivityPriceList.setRowFocus(curRow);
      curRow.setValue("auditStatus", "0");
      viewModel.goBillPanel();
      viewModel.RetailActivityPriceItems.removeAllRows();
      viewModel.billPanelStatus (CONST.BILLPANELSTATUS.ADD);
    },
    //进入修改单据页
    showEditBillPanel: function(index) {
      var isauditStatus = viewModel.RetailActivityPriceList.getRow(index).getValue("auditStatus");
      if(isauditStatus == "1" || isauditStatus == 1){
        toastr.warning("该数据已审核不能编辑");
        return;
      }
      viewModel.RetailActivityPriceList.setRowFocus(index);
      var id = viewModel.RetailActivityPriceList.getValue("id");
      viewModel.RetailActivityPriceList.originEditData = viewModel.RetailActivityPriceList.getFocusRow().getSimpleData();
      viewModel.findByParentid(id);
      viewModel.goBillPanel();
      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
    },
    //进入复制单据页
    showCopyBillPanel: function() {
      var selectedRows = viewModel.RetailActivityPriceList.getSelectedRows();
      // 只支持单一复制，批量复制需单独处理
      if(selectedRows.length != 1) {
        toastr.warning('请选择一条要复制的行');
        return;
      }
      var copyRow = selectedRows[0];
      var curRow = viewModel.RetailActivityPriceList.createEmptyRow();
      curRow.setSimpleData(copyRow.getSimpleData());
      curRow.setValue("auditStatus","0");
      curRow.status = "new";
      viewModel.RetailActivityPriceList.setRowFocus(curRow);
      var id = copyRow.getValue("id");
      //查询子表数据
      viewModel.findByParentid(id);
      //删除主表主键，编码，审计信息
      viewModel.clearBaseProp(curRow);

      //删除子表主键，子表主表关联
      var subRows = viewModel.RetailActivityPriceItems.getAllRows();
      for(var i=0; i<subRows.length; i++) {
        viewModel.clearBaseProp(subRows[i]);
//      subRows[i].setValue("parentId", "");
        subRows[i].status = "new";
      }
      viewModel.goBillPanel();
      viewModel.billPanelStatus (CONST.BILLPANELSTATUS.COPY);
    },
    //详情
    detail: function() {
      //确保grid先将行设置为focus状态
      setTimeout(function(){
        var curRow = viewModel.RetailActivityPriceList.getCurrentRow();
        var id = curRow.getValue("id");
        viewModel.findByParentid(id);
        //加入bpm按钮
        //viewModel.initBPMFromBill(id,viewModel);
        viewModel.goDetailPanel();
      }, 0);
    },
    //查询子表数据
    findByParentid: function(id) {
      $._ajax({
        url:appCtx + viewModel.baseurl + "/findByAdjustId",
        type: 'get',
        async: false,
        data: {adjustId: id},
        success:function(data){
//      	for(var i = 0; i < data.detailList.length; i++){
//      		data.detailList[i].productRefer = data.detailList[i].productId ? data.detailList[i].productId:data.detailList[i].combineId;
//      	}
          viewModel.RetailActivityPriceItems.setSimpleData(data.detailList,{unSelect:true});
        }
      })
    },
    // 清除基类属性
    clearBaseProp: function(row) {
      row.setValue("id", "");
      row.setValue("code", "");
      row.setValue("name", "");
      row.setValue("creator", "");
      row.setValue("creationTime", "");
      row.setValue("modifier", "");
      row.setValue("modifiedTime", "");
    },
    //新增子表项
//  addItem: function() {
//  	var isActivityCode = viewModel.RetailActivityPriceList.getValue("activityCode");
//  	if(!isActivityCode) {
//  		toastr.warning("请先选择活动编码");
//  		return;
//  	};
//    viewModel.RetailActivityPriceItems.createEmptyRow({unSelect:true});
//
//  },
    //删除子表项
    delItems: function() {
      var selectedRows = viewModel.RetailActivityPriceItems.getSelectedRows();
      if(selectedRows.length < 1){
        toastr.warning("请选择数据");
        return;
      }
      viewModel.RetailActivityPriceItems.removeRows(selectedRows);
    },
    //保存单据
    saveBill: function() {
      var self = this;
      var type = "post";
//  	if(viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY){
//  		type = "put";
//  	}
      var selectedItemRows = viewModel.RetailActivityPriceItems.getAllRows();
      //重新给子表加上combineId或productId
//  	self.idHandle(selectedItemRows);
      var productCombineData = viewModel.RetailActivityPriceList.getCurrentRow().getSimpleData();
      var RetailActivityPriceItemsData = viewModel.RetailActivityPriceItems.getSimpleData();
      productCombineData.detailList = RetailActivityPriceItemsData;
      var validate = $("#validate")[0];
      var result = app.compsValidateMultiParam({element:validate,showMsg:true});
      if(result.passed){
        $._ajax({
          url:appCtx + viewModel.baseurl + "/batchSave",
          type: type,
          data:JSON.stringify(productCombineData),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            viewModel.RetailActivityPriceList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
            toastr.success();
          }
        });
      }
    },
    //存子表id
//  idHandle: function(rowArr) {
//  	for(var i = 0; i < rowArr.length; i++){
//  		var productRefer = rowArr[i].getValue("productRefer");
//  		var isProduct = parseInt(rowArr[i].getValue("isProduct"));
//  		if(!productRefer) continue;
//  		if(isProduct == "1"){
//					rowArr[i].setValue("productId",productRefer);
//					rowArr[i].setValue("combineId",null);
//
//				}else if(isProduct == "0"){
//					rowArr[i].setValue("combineId",productRefer);
//					rowArr[i].setValue("productId",null);
//				}
//  	}
//  },
    //取消单据
    cancelBill: function() {
      var curRow = viewModel.RetailActivityPriceList.getCurrentRow();
      // 修改，则还原
      if(curRow.getValue("id")) {
        curRow.setSimpleData(viewModel.RetailActivityPriceList.originEditData)
      }
      // 新增或复制，则删除
      else {
        viewModel.RetailActivityPriceList.removeRow(curRow);
        viewModel.RetailActivityPriceItems.removeAllRows();
      }
      viewModel.retListPanel();
    },
    //审核
    auditHandle: function () {
      var selectRowsArr = viewModel.RetailActivityPriceList.getSelectedRows();
      if(selectRowsArr.length < 1){
        toastr.warning("请选择一条数据");
        return;
      };
      if(selectRowsArr.length > 1){
        toastr.warning("一次只能审核一条数据");
        return;
      };
      function ajaxFun(){
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
      }
      $._ajax({
        url:appCtx + viewModel.baseurl + "/queryDate",
        type:"get",
        success:function(data){
          var effectiveDate = selectRowsArr[0].getValue("effectiveDate");
          var effectiveTime = u.dateRender(effectiveDate,'YYYY-MM-DD');
          var today = u.dateRender(data,'YYYY-MM-DD');
          var m1 = new Date(effectiveTime).getTime();
          var m2 = new Date(today).getTime();
          if(m1 <= m2){
            common.dialog.confirmDialog({
              msg1: '审核后将立即修改价格,是否继续？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function () {
                ajaxFun();
              }
            });
          }else{
            common.dialog.confirmDialog({
              msg1: '审核后将在'+effectiveTime+'修改价格,是否继续？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function () {
                ajaxFun();
              }
            });
          }

        }
      });
//      }
//   });
    },
    //审核状态 带入
    auditStatus: function () {
      var auditStatusValue = viewModel.RetailActivityPriceList.getValue('auditStatus');
      if(auditStatusValue === null){
        viewModel.RetailActivityPriceList.setValue('auditStatus',0);
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
    // 弹出产品/产品组合参照
    showProductRef:function() {
      //给子表设置参照条件
      var activityId = viewModel.RetailActivityPriceList.getCurrentRow().getValue("activityId");
      $("#productRefer").attr("data-refparam",'{"activityId":"'+activityId+'"}');
      var isActivityCode = viewModel.RetailActivityPriceList.getValue("activityCode");
      if(!isActivityCode) {
        toastr.warning("请先选择活动编码");
        return;
      };
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
    //审批流添加功能----提交审批
    submit: function () {
      var selectedData = viewModel.RetailActivityPriceList.getSimpleData({type: 'select'});
      if(selectedData.length == 0) {
        toastr.error("请选择数据");
        return;
      }
      if(selectedData[0].state &&  selectedData[0].state !='0'){ //状态不为待确认
        toastr.error("该单据已经使用关联流程，不能启动","error");
        return ;
      }
      for(var i=0;i<selectedData.length;i++) {
        selectedData[i].detailList = [];
      }
      $.ajax({
        type: 'GET',
        url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=retailactivityprice&nodekey=001',
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
      var nodeJs = "/ocm-web/pages/prom/retailActivityPrice/retailactivityprice.js";
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
      var selectedData = viewModel.RetailActivityPriceList.getSimpleData({type: 'select'});
      if(selectedData.length == 0) {
        toastr.error("请选择数据");
        return;
      }
      for(var i=0;i<selectedData.length;i++) {
        selectedData[i].bussTypes = [];
        selectedData[i].officeItems = [];
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
              toastr.error(res.message);
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
      $("#RetailActivityPrice-searchcontent")[0],
      [
        {
          type:"text",
          key:"code",
          label:"调价单编码",
        },
//      {
//      	type:"checkbox",
//        label:"调价单编码",
//        checkedValue:1,
//        unCheckedValue:0,
//        multi: true,
//        keyArray:[ {key:'name',label:'提货任务'},
//          {key:'auditStatus',label:'产品明细'},],
//          key:"code"
//      },
        {
          type:"text",
          key:"name",
          label:"调价单名称",
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
          key:"activity--code",
          label:"活动编码",
        },
        {
          type:"text",
          key:"activity--name",
          label:"活动名称",
        },
        {
          type:"refer",
          key:"activity--activeTypec--id",
          label:"活动类型",
          refinfo:"activitytypec",
          multi:true
        },
        {
          type:"refer",
          key:"activity--agency--id",
          label:"所属办事处",
          refinfo:"organization_ocm",
          clientParam:{"EQ_isOffice":"1"},
          multi:true,
        },
        {
          type:"daterange",
          key:"activity--terminalStartDate",
          label:"活动开始日期范围",
        },
        {
          type:"daterange",
          key:"activity--terminalEndDate",
          label:"活动截至日期范围",
        }
      ]);
    //参照弹窗 搜索组件
    singledocSearch = new searchbox(
      $("#wholesalebaseprice-searchcontent")[0],
      [{
        type:"text",
        key:"product--code",
        label:"产品名称",
      },
        {
          type:"refer",
          key:"product--productSaleSeries--id",
          label:"产品系列",
          refinfo:"productSaleSeries"
        },
        {
          type:"text",
          key:"customer--name",
          label:"经销商",
        },
        {
          type:"refer",
          key:"shop--id",
          label:"门店",
          refinfo:"shopref"
        }
//     {
//      type:"daterange",
//      key:"beginTime",
////      startkey:"beginTime",
////      endkey:"endTime",
//      label:"开始日期",
//    },
//    {
//      type:"daterange",
//      key:"endTime",
////      startkey:"beginTime",
////      endkey:"endTime",
//      label:"结束日期",
//    }
      ]);
    billfooter = new Billfooter(
      $(".ui-bill-footer").get(),
      viewModel,
      "RetailActivityPriceList"
    );
    // 列表查询数据(无查询条件)
    viewModel.search();
    var row = viewModel.ProductRef.createEmptyRow();
    viewModel.ProductRef.setRowFocus(row);
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#RetailActivityPrice-searchcontent input').off("keydown").on("keydown",function(e){
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
            row = viewModel.RetailActivityPriceItems.getRowByField("productId", refpk);
            productId = refpk;
          }
          else {
            row = viewModel.RetailActivityPriceItems.getRowByField("combineId", refpk);
            combineId = refpk;
          }
          var newrow = undefined;
          newrow = viewModel.RetailActivityPriceItems.createEmptyRow({unSelect:true});
          newrow.setValue("showCode", refValues[i].refcode);
          newrow.setValue("showName", refValues[i].refname);
          newrow.setValue("productSaleSeriesName", refValues[i].saleSeriesName);
          newrow.setValue("productId", productId);
          newrow.setValue("combineId", combineId);
        }
      }
    });

    //点击活动编码传条件给 - 经销商门店参照
    viewModel.RetailActivityPriceList.on("activityId.valuechange", function(obj) {
      var activityId = viewModel.RetailActivityPriceList.getValue("activityId");
      viewModel.RetailActivityPriceItems.setMeta("customerId","refparam",'{"activityId":"'+activityId+'"}');
      viewModel.RetailActivityPriceItems.setMeta("shopId","refparam",'{"activityId":"'+activityId+'"}');
      viewModel.RetailActivityPriceList.setRowFocus(viewModel.RetailActivityPriceList.getCurrentIndex(), false, true);

    });
    //点击经销商传条件给 - 门店参照
    viewModel.RetailActivityPriceItems.on("customerId.valuechange", function(obj) {
      var customerId = viewModel.RetailActivityPriceItems.getValue("customerId");
      var activityId = viewModel.RetailActivityPriceList.getValue("activityId");
      viewModel.RetailActivityPriceItems.setMeta("shopId","refparam",'{"activityId":"'+activityId+'","customerId":"'+customerId+'"}');
    });
    //价格为4、5、7进行处理
    viewModel.RetailActivityPriceItems.on("price.valuechange",function(obj) {
      var rowObj = obj.rowObj;
      var price = rowObj.getValue("price");
      price = parseFloat(price);
      var arr = parseInt(price).toString().split('');
      var num = parseInt(arr[arr.length-1]);
      var num2 = parseInt(arr[arr.length-2]);
      if(num == 4 || num == 5 || num == 7) {
        toastr.info("价格个位数如果是4或5则变更为6，如果是7则变更为8");
        if(num == 5 || num == 7) {
          price += 1;
        }
        else {
          price += 2;
        }
        obj.rowObj.setValue("price", price);
      }
    });
    //点击活动编码带出字段
//		viewModel.RetailActivityPriceList.on("activityId.valuechange", function(obj) {
//				var refer = $("#refContaineractivityId").data("uui.refer");
//		    var refValues = refer.values;
//
//		});
    viewModel.RetailActivityPriceItems.on("showCode.valuechange",function(){
      // debugger
    })
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
