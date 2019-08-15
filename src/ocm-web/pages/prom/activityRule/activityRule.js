define(['text!./activityRule.html','ocm_common','searchbox',/*'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js',*/'./meta.js','ocm_global'], function (tpl,common,searchbox/*,bpmopenbill*/) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,chooseProductDialog;
  // var data = [{
  // 	"id": null,
  // 	"dr": 0,
  // 	"ts": null,
  // 	"creator": null,
  // 	"creationTime": null,
  // 	"modifier": null,
  // 	"modifiedTime": null,
  // 	"persistStatus": "new",
  // 	"proId": "d27e2c8c-9600-4740-98c0-5ebd8788c3f5",
  // 	"proType": 4,
  // 	"proCataCode": null,
  // 	"showName": "sss",
  // 	"showCode": "ddd",
  //   "totalDiscount":100,
  // 	"conditionInfos": [{
  // 		"higherLimit": 0,
  // 		"lowerLimit": 100,
  //     "fullcut":200,
  //     "discount":1,
  //     "price":200,
  // 	},{
  //     "higherLimit": 0,
  //     "lowerLimit": 100,
  //     "fullcut":200,
  //     "discount":1,
  //     "price":200,
  //   }],
  //   }, {
  // 	"id": null,
  // 	"dr": 0,
  // 	"ts": null,
  // 	"creator": null,
  // 	"creationTime": null,
  // 	"modifier": null,
  // 	"modifiedTime": null,
  // 	"persistStatus": "new",
  // 	"proId": "d27e215-9600-4740-98c0-5ebd8788c3f5",
  // 	"proType": 2,  	
  // 	"showName": "pro1",
  // 	"showCode": "商品1",
  // 	"conditionInfos": []
  // }];
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  baseData = {
   
   /**
   促销方式-减价类型start
   **/

   //降价
    priceItems: new u.DataTable(priceItem),
    proRangeList: new u.DataTable(ProRangeMeta),
        //买赠规则-商品数量
    // ItemRefList: new u.DataTable(ItemRef),
 
   orderStandDepreciateItems:new u.DataTable(orderStandDepreciateMeta),

    //赠品商品
    chooseProductList: new u.DataTable(chooseProductItem),


   //商品类型
    proTypeSrc: [{value:"1",name:"商品"}, {value:"2",name:"产品"}, {value:"3",name:"组合"}, {value:"2",name:"产品分类"}],





    /**
   促销方式-减价类型end
   **/




    baseurl : '/prom/rules',
    ProductCombineList: new u.DataTable(ProductCombine),
    ProductCombineItems: new u.DataTable(ProductCombineItem),
 
    ItemRefList: new u.DataTable(ItemRef),
    billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
    enableRadioSrc: [{value:"1",name:"启用"},{value:"0",name:"停用"},{value:CONST.DEFAULTOPTION,name:"全部"}],
    enableCheckSrc: [{value:"1",name:"是"}],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //返回列表页
    // retListPanel: common.bill.retListPanel,
    // 跳转详情页
    goDetailPanel: common.bill.goDetailPanel,
    // enableFmt: function() {
    //   var row = viewModel.ProductCombineList.getFocusRow();
    //   if(!row) {
    //     return;
    //   }
    //   var enableStatus = row.getValue("enableStatus");
    //   return enableStatus==1? "启用":"停用";
    // },
    enableFmt: ko.pureComputed(function() {
      var enableStatus = viewModel.ProductCombineList.ref("enableStatus")();
      return enableStatus == 1 ? "启用" : "停用";
    }),


    // 促销方式
    promotionsSrc: [{value:"1",name:"买赠"}, {value:"2",name:"降价"}, {value:"3",name:"满减"}],
    // 促销基准
    promotionBenchSrc: [{value:"1",name:"商品数量"}, {value:"2",name:"商品金额"}, {value:"3",name:"订单金额"}],
    // 阶梯方式
    ladderWaySrc: [{value:"1",name:"全额累进"}],
    // 赠品基准
    giftBenchSrc: [{value:"1",name:"数量"}],
    // 前置条件
    preconditionSrc: [{value:"1",name:"有"}, {value:"0",name:"无"}],
    list: ko.observableArray([{name:"a"},{name:"b"},{name:"c"}]),
  };
  rendertype = {
    operation:common.rendertype.operation,
    enableStatusRender:common.rendertype.enableRender,
    detailRender:common.rendertype.detailRender,
        statusCodeRender: function(params) {
          params.element.innerHTML = params.value + "%";
        },
  };
  events = {
      //删除和批量删除
      del: function (data,rowId) {
        if (typeof(data) == 'number') {
          viewModel.ProductCombineList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.ProductCombineList.getSelectedRows();
        if(rows.length == 0) {
          toastr.error("请选择数据");
          return
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
              // data: "ids=" + ids.join(","),
              data:{
                ids:ids.join(",")
              },
              success:function(data){
                viewModel.ProductCombineList.removeRows(rows);
              }
            });

          }
        });
      },
      orderStandDepreciateEditEvent:function(obj){

        var colIndex=obj.colIndex;
        var rowIndex=  obj.rowIndex;
        if(colIndex!=2&&colIndex!=3)
          return true;
          var discount = viewModel.orderStandDepreciateItems
            .getRow(rowIndex)
            .getValue("discount");
                var fullcut = viewModel.orderStandDepreciateItems
            .getRow(rowIndex)
            .getValue("fullcut");
      if(colIndex==2&&fullcut){
        return false;
      }
     if(colIndex==3&&discount){
        return false;
      }

         
        return true;
           
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.ProductCombineList.pageIndex(0);
        }
        viewModel.ProductCombineList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        var pageSize = viewModel.ProductCombineList.pageSize();
        var pageNumber = viewModel.ProductCombineList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.ProductCombineList.setSimpleData(data.content,{unSelect:true});
            viewModel.ProductCombineList.totalRow(data.totalElements);
            viewModel.ProductCombineList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.ProductCombineList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.ProductCombineList.pageSize(size);
        viewModel.search(true);
      },
      //进入新增单据页
      showAddBillPanel: function() { 

      //没有用的代码
       var curRow = viewModel.ProductCombineList.createEmptyRow();
        viewModel.ProductCombineList.setRowFocus(curRow);
        viewModel.ProductCombineItems.removeAllRows();
        curRow.setValue("enableStatus", "1");
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        curRow.setValue("promotionBench",1);
        $('#orderStandDepreciateDiv').hide();
      },
      // 可以进入编辑态
      canInEdit: function() {
        var canIn = true;
        var id = viewModel.ProductCombineList.getValue("id");
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/isRefer",
          async: false,
          data: {
            id: id
          },
          success: function(data) {
            if(data == 1) {
              toastr.error("已被引用数据不可编辑");
              canIn = false;
            }
          }
        })
        return canIn;
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.ProductCombineList.setRowFocus(index);
        if(!viewModel.canInEdit()) {
          return;
        }
        var id = viewModel.ProductCombineList.getValue("id");
        viewModel.ProductCombineList.originEditData = viewModel.ProductCombineList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      //进入复制单据页
      showCopyBillPanel: function() {
        var selectedRows = viewModel.ProductCombineList.getSelectedRows();
        // 只支持单一复制，批量复制需单独处理
        if(selectedRows.length != 1) {
          toastr.error("请选择一条要复制的行");
          return;
        }
        var copyRow = selectedRows[0];
        var curRow = viewModel.ProductCombineList.createEmptyRow();
        curRow.setSimpleData(copyRow.getSimpleData());
        viewModel.ProductCombineList.setRowFocus(curRow);
        var id = copyRow.getValue("id");
        //查询子表数据
        viewModel.findByParentid(id);
        //删除主表主键，编码，审计信息
        viewModel.clearBaseProp(curRow);
        //删除子表主键，子表主表关联
        var subRows = viewModel.ProductCombineItems.getAllRows();
        for(var i=0; i<subRows.length; i++) {
          viewModel.clearBaseProp(subRows[i]);
          subRows[i].setValue("parentid", "");
        }
        viewModel.goBillPanel();
        viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
      },
      //详情
      // 方案1：clone编辑态模板，设置只读，返回删除
      // 方案2：重新定义详情模板
      // 主要看差异，如果差异不大公用模板，差异大重新定义
      // detail: function() {
      //   //确保grid先将行设置为focus状态
      //   setTimeout(function(){
      //     var curRow = viewModel.ProductCombineList.getCurrentRow();
      //     var id = curRow.getValue("id");
      //     viewModel.findByParentid(id);
      //     var $detailWrap = $("#bill-detail-wrap");
      //     $detailWrap.empty();
      //     var $billPanel_cl = $(".ui-bill-panel").clone();
      //     $billPanel_cl.show();
      //     $detailWrap.append($billPanel_cl);
      //     viewModel.showBillDetail();
      //     u.compMgr.updateComp($detailWrap[0]);
      //   }, 0);
      // },
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function(){
          var curRow = viewModel.ProductCombineList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url:appCtx + viewModel.baseurl + "/findByParentid",
          type: 'post',
          async: false,
          data: {id: id},
          success:function(data){
            viewModel.ProductCombineItems.setSimpleData(data);
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
      //跳转单据详情页
      showBillDetail: function() {
        $(".ui-list-panel").addClass("animated slideInLeft");
        $(".ui-bill-panel").addClass("animated slideOutDown");
      },
      //新增子表项
      addItem: function() {
        viewModel.ProductCombineItems.createEmptyRow();
      },
      //批量新增子表项
     
      //保存单据
      saveBill: function() {
        var result = app.compsValidateMultiParam({element: ".ui-bill-panel",showMsg:true});
        if(!result.passed) {
          return;
        }
        var allRows = viewModel.priceItems.getAllRows();
        // if(allRows.length == 0 || allRows.every(function(row){return row.status == u.Row.STATUS.FALSE_DELETE})) {
        //   toastr.error("请录入表体行数据");
        //   return;
        // }
        var productCombineData = viewModel.ProductCombineList.getCurrentRow().getSimpleData();
        var priceItemData = viewModel.priceItems.getSimpleData();
        productCombineData.priceRuleAggs = priceItemData;
         var proRangeList = viewModel.proRangeList.getSimpleData();
        productCombineData.prodScapes = proRangeList;
         var totalDiscount=productCombineData["totalMny"];
        var priceRules = viewModel.orderStandDepreciateItems.getSimpleData();
        priceRules.forEach(function(priceRule) {
           priceRule.totalDiscount=totalDiscount;
       });
     
    
        productCombineData.priceRules = priceRules;

        var _ajaxType = viewModel.ProductCombineList.getValue("id") ? "put": "post";
        $._ajax({
          url:appCtx + viewModel.baseurl,
          type:_ajaxType,
          data:JSON.stringify(productCombineData),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            viewModel.ProductCombineList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.ProductCombineList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function() {
        viewModel.ProductCombineItems.removeAllRows();
        var curRow = viewModel.ProductCombineList.getCurrentRow();
        // 修改，则还原
        if(curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.ProductCombineList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.ProductCombineList.removeRow(curRow);
          viewModel.ProductCombineItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.ProductCombineList.getSelectedRows();
        if(selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if(selectedRows && selectedRows.length > 0) {
          var ids = [];
          for(var i=0;i<selectedRows.length;i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl+ "/enable",
            data: {ids: ids.join(",")},
            success:function(res){
              toastr.success();
              for(var i=0;i<selectedRows.length;i++) {
                selectedRows[i].setValue("enableStatus", "1");
              }
            }
          })
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.ProductCombineList.getSelectedRows();
        if(selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if(selectedRows && selectedRows.length > 0) {
          var ids = [];
          for(var i=0;i<selectedRows.length;i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/disable",
            data: {ids: ids.join(",")},
            success:function(res){
              toastr.success();
              for(var i=0;i<selectedRows.length;i++) {
                selectedRows[i].setValue("enableStatus", "0");
              }
            }
          })
        }
      },
      //添加商品范围行
      addProRangeItems: function() {
       var row=  viewModel.proRangeList.createEmptyRow();
        viewModel.proRangeList.setRowFocus(row);    
      },
         //删除商品范围行
      delProRangeItems: function(index) {
       var row= viewModel.proRangeList.getCurrentRow();
        viewModel.proRangeList.removeRows(row);
      },
      //添加订单金额-降价规则行
      addOrderStandDepreciateItems:function(){
     var row=  viewModel.orderStandDepreciateItems.createEmptyRow();
          },
 //删除订单金额-降价规则行
      delOrderStandDepreciateItems:function(index){
        var row =viewModel.orderStandDepreciateItems.getCurrentRow;
        viewModel.orderStandDepreciateItems.removeRow(row);
      },
  
      //
      ruleValueChange:function(obj){

       var editField=obj.field;
       if(editField&&editField=="promotionBench"){
        var newValue=obj.newValue;
        //如果为商品数量
        if(newValue==1){
           $('#proStandDepreciateDiv').show();
            $('#orderStandDepreciateDiv').hide();
               $('#totalMny').hide();
          $('#priceConditionLabel').html("降价条件(数量)")
        }
          //如果为商品金额
        if(newValue==2){
         $('#proStandDepreciateDiv').show();
          $('#orderStandDepreciateDiv').hide();
           $('#totalMny').hide();
            $('#priceConditionLabel').html("降价条件(金额)")

        }
          //如果为订单金额
        if(newValue==3){
              $('#orderStandDepreciateDiv').show();
               $('#totalMny').show();
                $('#proStandDepreciateDiv').hide();

          
        }
       }

      },
      //
      priceValueChange:function(obj){
       var discount=  $('.discountInput').val();
      var price=  $('.priceInput').val();
      
        
        // $('.discountInput').attr("disabled","true")
      },
       // 价格规则-删除主表
      priceDelRow: function (row) {
        var index = viewModel.priceItems.getIndexByRowId(row.rowId);
        viewModel.priceItems.removeRows([index],{forceDel:true});
      },

      
        // 价格规则-增加子表
      addPriceConditionInfos: function (row) {
        row.getValue("conditionInfos").createEmptyRow();
        viewModel.priceItems.setSimpleData(viewModel.priceItems.getSimpleData());
      },
         // 价格规则-删除子表
      delPriceConditionInfos: function (row,childRow) {
        var index = row.getValue("conditionInfos").getIndexByRowId(childRow.rowId);
        row.getValue("conditionInfos").removeRows([index],{forceDel:true});
        viewModel.priceItems.setSimpleData(viewModel.priceItems.getSimpleData());

      
      },
       //参照选择批量新增子表（销售产品）
      showAddItemsRef: function() {
        //弹出的对话框清除原来的所有值并创建空行
        viewModel.chooseProductList.removeAllRows();
        viewModel.chooseProductList.createEmptyRow();   
            //弹出框
        chooseProductDialog = u.dialog({id:'dialog_content_product',content:"#dialog_content_product",width:"400px"});
        var okButton = $("#dialog_content_product .u-msg-ok");
        okButton.unbind("click").click(function(row){
        var simpleData=  viewModel.chooseProductList.getSimpleData();
          viewModel.addProductSave(simpleData[0]);
        });
        var cancelButton = $("#dialog_content_product .u-msg-cancel");
        cancelButton.unbind("click").click(function(){
          chooseProductDialog.close();
        });   

      },
       //降价规则-商品基准主表添加一行
      addProductSave: function (choosePro) {
         var row=  viewModel.priceItems.createEmptyRow();
        // row.setValue("giftCode",data.commodityCode);
        row.setValue("showCode",choosePro.proCode);
        row.setValue("proId",choosePro.proId);
        row.setValue("proType",choosePro.proType);
        // viewModel.priceItems.setSimpleData(viewModel.priceItems.getSimpleData());
        chooseProductDialog.close();
      },

      //     //保存单据
      // saveBill: function() {
      //   // var result = app.compsValidateMultiParam({element: ".ui-bill-panel",showMsg:true});
      //   // if(!result.passed) {
      //   //   return;
      //   // }
      //   // var allRows = viewModel.ProductCombineItems.getAllRows();
      //   // if(allRows.length == 0 || allRows.every(function(row){return row.status == u.Row.STATUS.FALSE_DELETE})) {
      //   //   toastr.error("请录入表体行数据");
      //   //   return;
      //   // }
      //   // var productCombineData = viewModel.ProductCombineList.getCurrentRow().getSimpleData();
      //   // var ProductCombineItemsData = viewModel.ProductCombineItems.getSimpleData();
      //   // productCombineData.proComItems = ProductCombineItemsData;
      //   var data = viewModel.ProductCombineList.getCurrentRow().getSimpleData(),
      //       rulePreDetailAggs = viewModel.PreconditionItems.getSimpleData(),
      //       ruleDetailAggs = viewModel.BuyGiftItems.getSimpleData(),
      //       ruleGiftLimitDetails = viewModel.GiftsLimitItems.getSimpleData();
      //   data.rulePreDetailAggs =  rulePreDetailAggs;
      //   data.ruleDetailAggs = ruleDetailAggs;
      //   data.ruleGiftLimitDetails = ruleGiftLimitDetails;

      //   var _ajaxType = viewModel.ProductCombineList.getValue("id") ? "put": "post";
      //   $._ajax({
      //     url:appCtx + viewModel.baseurl,
      //     type:_ajaxType,
      //     data:JSON.stringify(data),
      //     contentType : "application/json; charset=utf-8",
      //     success:function(data){
      //       viewModel.ProductCombineList.getFocusRow().setSimpleData(data);
      //       viewModel.retListPanel();
      //     }
      //   })
      // },




      //清空已选销售产品参照
      clearItemsRef: function() {
        viewModel.ItemRefList.setValue("productref", "");
        var refer = $("#refContainerproductref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      detail2bill: function() {
        if(!viewModel.canInEdit()) {
          return;
        }
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      //导入
  	  importHandle: function() {
  	  	var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
  	  	var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
  	  	var ele = $('#importFiel')[0]; //挂载元素
  	  	common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
  	  },
  	  //导出
  	  exportHandle: function() {
  	  	  var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
  	  	  var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
  	  	  var excelDataUrl =  viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
  	  	  var listData = viewModel.ProductCombineList; //需要导出表格的dataTable
  	  	  var ele = $('#exportFiel')[0]; //挂载元素
  	  	  common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
  	  },
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
  }
  viewModel = u.extend({},baseData,events,rendertype/*, bpmopenbill.model*/);

  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;

    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#ProductCombine-searchcontent")[0],
      [
        // {
        //   type:"refer",
        //   key:"pkOrg--id",
        //   label:"所属组织",
        //   refinfo:"organization_ocm"
        // },
        {
          type:"text",
          key:"code",
          label:"产品组合编码",
        },
        {
          type:"text",
          key:"name",
          label:"产品组合名称",
        },
        {
          type:"radio",
          key:"enableStatus",
          label:"启用状态",
          dataSource: CONST.ENABLESTATUSISALL,
        },
        // {
        //   type:"text",
        //   key:"subcode",
        //   label:"销售产品编码",
        // },
        // {
        //   type:"text",
        //   key:"subname",
        //   label:"销售产品名称",
        // },
      ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
    // 子表参照聚焦行，用于绑定子表参照组件
    var refRow = viewModel.ItemRefList.createEmptyRow();
    viewModel.ItemRefList.setRowFocus(refRow);
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#ProductCombine-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 确定销售产品参照，为产品组合子表增行
    viewModel.ItemRefList.on("productref.valuechange", function(obj) {
      // 清空参照时不增行
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContainerproductref").data("uui.refer");
      var refValues = refer.values;
      if(refValues && refValues.length > 0) {
        for(var i=0; i<refValues.length;i++) {
          var id = refValues[i].refpk;
          var row = viewModel.ProductCombineItems.getRowByField("productid", id);
          if(!row || row.status == u.Row.STATUS.FALSE_DELETE) {
            var newrow = viewModel.ProductCombineItems.createEmptyRow();
            newrow.setValue("productidCode", refValues[i].refcode);
            newrow.setValue("productidName", refValues[i].refname);
            newrow.setValue("productidStandardName", refValues[i].productModelName);
            newrow.setValue("productidSaleSeriesName", refValues[i].productSaleSeriesName);
            newrow.setValue("unitName", refValues[i].baseUnit);
            newrow.setValue("productid", id);
          }
        }
      }
    });
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();

    parent.vm = viewModel;
  }

  return {
    init: init
  }
});
