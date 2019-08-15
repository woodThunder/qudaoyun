define(['text!./custommade.html','ocm_common','searchbox','editcard','billfooter','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard,billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer,exportDialog,importDialog;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
//  COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }

  baseData = {
    baseurl : '/product-info', 
    finishedProductSuiteList: new u.DataTable(finishedProductSuite),
//  ProdInfoAndPhotoInfoList: new u.DataTable(ProdInfoAndPhotoInfometa),
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
//  billPanelStatus: BILLPANELSTATUS.DEFAULT,
    whetherFormat: common.format.whetherFormat,
    enableCheckSrc: [{value:"1",name:"是"}],
    //TODO: 审核枚举值
    proTypeSrc: [{value:"0",name:"销售产品"},{value:"2",name:"包件"},{value:"1",name:"套件"}],
    whetherUnconventionalitySrc: CONST.WHETHER,
    proStateSrc:ko.observableArray([]),
    productionModeSrc:ko.observableArray([]),
    croMaStateSrc:ko.observableArray([]),
    proTypeCodeSrc:ko.observableArray([]),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    originEditData:"",
  };
  rendertype = {
    operation: common.rendertype.operation,
    enableStatusRender:function(obj) {
      var showValue = obj.value == "1" ? "启用" : "停用";
      obj.element.innerHTML = showValue;
    },
    operationCal:function(obj){
    	  var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
	  	  var calculateBtn="data-bind=click:calculate.bind($data," + obj.rowIndex + ","+dataTableRowId+"),visible:buttonShowGroup['cal']";
        obj.element.innerHTML = '<div class="ui-handle-icon">'+
        '<span class="ui-handle-word">'+
        '<a href="#"'+
        calculateBtn +
        ' title="计算">计算</a>'+
        '</span>'+
        '</div>';
	  	  ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
  	detailRender: common.rendertype.detailRender,
     //判断表格里的状态
     //审核状态
	  statusGrid: function (obj) {
	  	var stateValue = viewModel.finishedProductSuiteList.getRow(obj.rowIndex).getValue('statusCode');
	  	var stateName;
	  	stateValue ==1?stateName="启用": stateName="停用";
	  	obj.element.innerHTML = stateName;
	  },
	  whether:function(obj){
	  	var showValue = obj.value == "1" ? "是" : "否";
      obj.element.innerHTML = showValue;
	  }
};

  events = {
      //删除和批量删除
      del: function (data,rowId) {
        if (typeof(data) == 'number') {
          viewModel.finishedProductSuiteList.setRowSelect(viewModel.finishedProductSuiteList.getRowByRowId(rowId));
        }
        var ids = [];
        var status=[];
        var statustip="";
        var rows = viewModel.finishedProductSuiteList.getSelectedRows();
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
            var statusCode=rows[i].getValue("statusCode");
          	if(statusCode==1 || statusCode=="1"){
          		status.push(rows[i].getValue("code"));
          	}
          }
          if(status.length >0){
        			function statusArr(){
        				for (i=0;i<status.length;i++){
	          			 	  statustip+=status[i] +"，";
	          		}
        				return statustip.substring(0,statustip.length-1)
        			}
	          		toastr.warning("数据   " + statusArr() +" 已启用不可删除");
	          		return false
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
	                viewModel.finishedProductSuiteList.removeRows(rows);
        	        toastr.success("删除成功");
	              }
	            });
	
	          }
	        });
        }
        else{
        	toastr.warning("请先选择需要删除数据");
        }
      },
      //计算包装数量、体积、毛重
      calculate:function(data,rowId){
      	if (typeof(data) == 'number') {
          viewModel.finishedProductSuiteList.setRowSelectbyRowId(rowId);
        }
      	var selectedRows = viewModel.finishedProductSuiteList.getSelectedRows();
        var ids = [];
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		        }
		        ids = ids.join(",");
		        $._ajax({
		          type: "post",
		          url: appCtx + viewModel.baseurl + "/calculate",
		          data: {ids: ids},
		          success:function(res){
		            for(var i=0;i<selectedRows.length;i++) {
		              selectedRows[i].setValue("packageNum", res[i].packageNum);
		              selectedRows[i].setValue("roughWeight", res[i].roughWeight);
		              selectedRows[i].setValue("cubage", res[i].cubage);
		            }
		            
        	      toastr.success("计算成功");
		          }
		        })
		    }
        else{
        	toastr.warning("请先选择需要计算的数据");
        }
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
      	if(viewModel.codeCount>499){
			      var params = singledocSearch.viewModel.params;
			      params.setValue("code", '');
      	    toastr.warning("编码最多输入500个，请重新输入");
      	    return false
  	    }
        if(reindex){
          viewModel.finishedProductSuiteList.pageIndex(0);
        }
        viewModel.finishedProductSuiteList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        var pageSize = viewModel.finishedProductSuiteList.pageSize();
        var pageNumber = viewModel.finishedProductSuiteList.pageIndex();
        queryData.size = pageSize;
        queryData.page = pageNumber;
        var oldCode = queryData["search_LIKE_code"];
        if(oldCode){
          queryData["search_IN_code"] =oldCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_code"];
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl+ "/customMade",
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.finishedProductSuiteList.setSimpleData(data.content,{unSelect:true});
            viewModel.finishedProductSuiteList.totalRow(data.totalElements);
            viewModel.finishedProductSuiteList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.finishedProductSuiteList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.finishedProductSuiteList.pageSize(size);
        viewModel.search(true);
      },
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.finishedProductSuiteList.createEmptyRow();
        viewModel.finishedProductSuiteList.setRowFocus(curRow);
			  curRow.setValue("statusCode", "1");
        viewModel.goBillPanel();
        $(".product-choose-result").hide();
        $(".product-choose-content").hide();
        $("#code-input").show();
        $("#code-text").hide();
        $("#materialGroupId").css({visibility:"visible"});
        $("#materialGroupIdshow").css({visibility:"hidden"});
		    var packageNum =app.getComp("packageNum");
        packageNum.validate.required="";
	 	    packageNum.validate.nullMsg="";
	     	$(".pack-check").addClass("hide");
        viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
      },
      //进入修改单据页
      showEditBillPanel: function(index,rowId) {
        viewModel.finishedProductSuiteList.setRowFocus(index);
        var id = viewModel.finishedProductSuiteList.getValue("id");
        viewModel.finishedProductSuiteList.originEditData = viewModel.finishedProductSuiteList.getRowByRowId(rowId).getSimpleData();
        viewModel.goBillPanel();
        viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
        $(".product-choose-result").hide();
        $(".product-choose-content").hide();
         $("#materialGroupId").css({visibility:"visible"});
        $("#materialGroupIdshow").css({visibility:"hidden"});
		    var packageNum =app.getComp("packageNum");
        packageNum.validate.required=false;
	 	    packageNum.validate.nullMsg="";
	     	$(".pack-check").addClass("hide");
        var whetherProductPackShow=viewModel.finishedProductSuiteList.getValue("whetherProductPack");
        var whetherSaleProductShow=viewModel.finishedProductSuiteList.getValue("whetherSaleProduct");
        if(whetherProductPackShow==1){
        	$(".product-choose-result").show();
        	$(".product-choose-content").show();
    	    packageNum.validate.required=true;
     	    packageNum.validate.nullMsg="不能为空";
     	    $(".pack-check").removeClass("hide");
        }
	      var code= viewModel.finishedProductSuiteList.getRowByRowId(rowId).getValue('code');
        $("#code-input").hide();
	      $("#code-text").show().html(code);
      },
      //进入复制单据页
      showCopyBillPanel: function() {
        var selectedRows = viewModel.finishedProductSuiteList.getSelectedRows();
        var focusRow = viewModel.finishedProductSuiteList.getFocusRow();
        // 只支持单一复制，批量复制需单独处理
        if(selectedRows.length != 1) {
          //TODO: tips替换
          alert("请选择一条要复制的行")
          return;
        }
        var copyRow = selectedRows[0];
        var curRow = viewModel.finishedProductSuiteList.createEmptyRow();
        curRow.setSimpleData(copyRow.getSimpleData());
        viewModel.finishedProductSuiteList.setRowFocus(curRow);
        var id = copyRow.getValue("id");
        //删除主表主键，编码，审计信息
        viewModel.clearBaseProp(curRow);
        viewModel.goBillPanel();
        viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
      },
      //进入详情页
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function(){
          var curRow = viewModel.finishedProductSuiteList.getFocusRow();
          var id = curRow.getValue("id");
          $(".show-detail").hide();
          $(".show-detail-content").hide();
          var whetherProductPackShow=curRow.getValue("whetherProductPack");
          if(whetherProductPackShow==1){
           	$(".show-detail").eq(0).show();
           	$(".show-detail-content").eq(0).show();
          }
//        viewModel.fillData(id);
//        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          common.bill.goDetailPanel();
        }, 0);
      },
      // 详情页跳转编辑单据页
      detail2bill: function() {
        viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
        var whetherProductPackShow=viewModel.finishedProductSuiteList.getValue("whetherProductPack");
        if(whetherProductPackShow==1){
        	$(".product-choose-result").show();
        }
        common.bill.detail2bill();
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
      //保存单据
      saveBill: function() {
  	     var productBase=$("#productBase")[0];
  	     var whetherSaleProductShow=viewModel.finishedProductSuiteList.getValue("whetherSaleProduct");
			   var whetherProductPackShow=viewModel.finishedProductSuiteList.getValue("whetherProductPack");
			   if(whetherSaleProductShow!=1 &&  whetherProductPackShow!=1){
			      toastr.warning("产品类型至少选择一项");
			   }
			   else{
           var basePass =viewModel.validate(productBase);   
	         if(basePass.passed){
	         	    var passPack=true;
				        if(whetherProductPackShow==1){
				        	var validatePack=viewModel.validate($("#packInfo")[0]);
				        	if(!validatePack.passed){
				        		passPack=false;
				        	}
				        }
				        if(passPack)	{
					          	var finishedProductSuiteData = viewModel.finishedProductSuiteList.getCurrentRow().getSimpleData();
					            finishedProductSuiteData.proNature="2";
					             if(viewModel.billPanelStatus == BILLPANELSTATUS.ADD){
					              	finishedProductSuiteData.persistStatus="new";
					             }
					             else if(viewModel.billPanelStatus == BILLPANELSTATUS.EDIT){
					              	finishedProductSuiteData.persistStatus="upd";
					             }
					             else{
					             	   finishedProductSuiteData.persistStatus="";
					             }
					            finishedProductSuiteData.prodInfoAndPhotoInfos=[];
					            finishedProductSuiteData.matchRelations=[];
					            for(var k in finishedProductSuiteData){
					      		        if (k.indexOf("whether") > -1 && finishedProductSuiteData[k] == null){
					      		        	finishedProductSuiteData[k]=0;
					      		        }
					      	     }
				            	if(finishedProductSuiteData.cubage==null){
					               finishedProductSuiteData.cubage=0;
					            }
					            if(finishedProductSuiteData.roughWeight==null){
					               finishedProductSuiteData.roughWeight=0;
					            }
					            if($("#croMaStateCode").val()==""){
					            	finishedProductSuiteData.croMaStateCode="";
					            }
					            var _ajaxType = viewModel.finishedProductSuiteList.getValue("productId") ? "put": "post";
					            $._ajax({
					              url:appCtx + viewModel.baseurl,
					              type:_ajaxType,
					              data:JSON.stringify(finishedProductSuiteData),
					              contentType : "application/json; charset=utf-8",
					              success:function(data){
					                viewModel.finishedProductSuiteList.getFocusRow().setSimpleData(data);
						              toastr.success("保存成功");
					                viewModel.retListPanel();
					              }
					            })
						    }
					  }
         }
      },
      //取消单据
      cancelBill: function() {
        var curRow = viewModel.finishedProductSuiteList.getCurrentRow();
        // 修改，则还原
        if(curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.finishedProductSuiteList.originEditData);
          if(viewModel.finishedProductSuiteList.originEditData.whetherProductPack==0){
          	$(".product-choose-result").hide();
          }
        }
        // 新增或复制，则删除
        else {
          viewModel.finishedProductSuiteList.removeRow(curRow);
        }
        viewModel.retListPanel();
      },

     //启用
      enable: function() {
        var selectedRows = viewModel.finishedProductSuiteList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		          if (selectedRows[i].getValue("statusCode")==1 || selectedRows[i].getValue("statusCode")=="1"){
		          	status.push(selectedRows[i].getValue("code"));
		          }
		        }
        		if(status.length >0){
        			function statusArr(){
        				for (i=0;i<status.length;i++){
	          			 	  statustip+=status[i] +"，";
	          		}
        				return statustip.substring(0,statustip.length-1)
        			}
	          		toastr.warning("数据   " + statusArr() +" 不可重复启用");
	          		return false
          	}
		        ids = ids.join(",");
		        $._ajax({
		          type: "post",
		          url: appCtx + viewModel.baseurl + "/batch-enable",
		          data: {ids: ids},
		          success:function(res){
		            for(var i=0;i<selectedRows.length;i++) {
		              selectedRows[i].setValue("statusCode", "1");
		            }
        	      toastr.success("启用成功");
		          }
		        })
		    }
        else{
        	toastr.warning("请先选择需要启用数据");
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.finishedProductSuiteList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		          if (selectedRows[i].getValue("statusCode")==0 || selectedRows[i].getValue("statusCode")=="0"){
		          	status.push(selectedRows[i].getValue("code"));
		          }
		        }
		        if(status.length >0){
        			function statusArr(){
        				for (i=0;i<status.length;i++){
	          			 	  statustip+=status[i] +"，";
	          		}
        				return statustip.substring(0,statustip.length-1)
        			}
	          		toastr.warning("数据   " + statusArr() +" 不可重复停用");
	          		return false
          	}
		        ids = ids.join(",");
		        $._ajax({
		          type: "post",
		          url: appCtx + viewModel.baseurl + "/batch-disable",
		          data: {ids: ids},
		          success:function(res){
		            for(var i=0;i<selectedRows.length;i++) {
		              selectedRows[i].setValue("statusCode", "0");
		            }
        	      toastr.success("停用成功");
		          }
		        })
		    }
        else{
        	toastr.warning("请先选择需要停用数据")
        }
      },
      //导入
  	  importHandle: function() {
  	  	var urlInfo = '/product-info-excel/excelDataImport'; //倒入地址参数
  	  	var urlStatusInfo = '/product-info-excel/excelLoadingStatus'; //请求进度地址参数
  	  	var ele = $('#importFiel')[0]; //挂载元素
  	  	common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
  	  },
  	  //导出
  	  exportHandle: function() {
  	  	  var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          var oldCode = searchParams["search_LIKE_code"];
          if(oldCode){
            searchParams["search_IN_code"] =oldCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_code"];
  	  	  searchParams.search_EQ_proNature = "2";
  	  	  var templateUrl = '/product-info-excel/downloadExcelTemplate'; //导出模板地址参数
  	  	  var excelDataUrl =  '/product-info-excel/excelDataExport'; //导出数据地址参数
  	  	  var listData = viewModel.finishedProductSuiteList; //需要导出表格的dataTable
  	  	  var ele = $('#exportFiel')[0]; //挂载元素
  	  	  common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
  	  },
      validate:function (element){
		    var result = app.compsValidateMultiParam({element:element,showMsg:true});
		    return result;
     },
     whetherSupply:function(){
     	  var dataValue=viewModel.finishedProductSuiteList.getValue('whetherSupply');
     	  var showName;
     	  dataValue ==1 ? showName="供货":showName="不供货";
     	  return showName;
     },
      validate:function (element){
		    var result = app.compsValidateMultiParam({element:element,showMsg:true});
		    return result;
     },
     //详情启用状态
     statusCode: function () {
      	var statusValue = viewModel.finishedProductSuiteList.getValue('statusCode');
      	if(statusValue === null){
		  		viewModel.finishedProductSuiteList.setValue('statusCode',1);
		  	}
      	var showName;
      	statusValue==1 ? showName="启用":showName="停用";
      	return showName;
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
      $("#custommade-searchcontent")[0],
      [{
        type:"text",
        key:"code",
        label:"产品编码"
      },
      {
        type:"text",
        key:"description",
        label:"产品描述"
      },
      {
          type:"refer",
          key:"productCategory--id",
          label:"产品品类",
          refinfo:"productCategory"
      },
	    {
	      type:"refer",
	      key:"productRadSeries--id",
	      label:"研发系列",
	      refinfo:"productRadSeries"
	    },
       {
          type:"refer",
          key:"productSaleSeries--id",
          label:"销售系列",
          refinfo:"productSaleSeries"
        },
        {
          type:"text",
          key:"prodGroup--code",
          label:"产品组编码"
        },
       {
          type:"text",
          key:"prodGroup--name",
          label:"产品组名称"
        },
       {
          type:"text",
          key:"materialGroup--code",
          label:"物料组树形编码"
        },
       {
          type:"text",
          key:"materialGroup--treePathName",
          label:"物料组树形名称"
        },
        {
          type: "daterange",
          label: "修改日期",
          key: "modifiedTime",
          
        },
        {
          type: "daterange",
          label: "创建时间",
          key: "creationTime",
        },
        {
            type:"radio",
            key:"isEnable",
            label:"启用状态",
            defaultvalue:"1",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'启用'},
            {value:'0',name:'停用'}
            ]
         },
        
        {
            type:"radio",
            key:"isSaleProduct",
            label:"销售产品",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
        },
         {
            type:"radio",
            key:"isProductSuite",
            label:"套件",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
         },
         
        {
            type:"radio",
            key:"isProductPack",
            label:"包件",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
         }

      ]);
    // footer = new billfooter($(".ui-bill-footer").get(), viewModel, "finishedProductSuiteList");
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){
    // 初始化折叠面板
    $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#PromoActivity-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    //根据研发系列带出销售系列
   viewModel.finishedProductSuiteList.on("radSeriesId.valuechange", function(obj) {
   	if(obj.oldValue!=undefined && obj.newValue != obj.oldValue){
        var saleSeriesName=app.getComp("saleSeriesName");
    		var refer = $("#refContainerradSeriesId").data("uui.refer");
        var refValues = refer.values;
        if(refValues[0].productSaleSeriesName !=null){
           saleSeriesName.setValue(refValues[0].productSaleSeriesName);
        }
   	}
   });
 //物料组
   viewModel.finishedProductSuiteList.on("materialGroupId.valuechange", function(obj) {
   	if(obj.oldValue!=undefined && obj.newValue != obj.oldValue){
    		var refValues = $("#refContainermaterialGroupId").data("uui.refer").values;
        $("#materialGroupId").css({visibility:"hidden"});
        $("#materialGroupIdshow").text(refValues[0].treePathNamePret).css({visibility:"visible"});
   	}
   });
   $("#materialGroupIdshow").click(function(){
     $("#materialGroupId").css({visibility:"visible"}).focus();
     $("#materialGroupIdshow").css({visibility:"hidden"});
     $("#materialGroupId").off("blur").on("blur",function(){
       $("#materialGroupId").css({visibility:"hidden"}).next("span").removeClass("refpic");;
       $("#materialGroupIdshow").css({visibility:"visible"});
       $("#refContainermaterialGroupId").closest("body").find(".ref_ac_results").css("display","none");//焦点移开隐藏模糊搜索
     })
   });
    //根据销售产品判断是否套件产品
   viewModel.finishedProductSuiteList.on("whetherSaleProduct.valuechange", function(obj) {
   	if(obj.oldValue!=undefined && obj.newValue != obj.oldValue){
        if(obj.newValue==1){
        	  viewModel.finishedProductSuiteList.setValue("whetherProductSuite",1);
        }
        else{
        	viewModel.finishedProductSuiteList.setValue("whetherProductSuite",0);
        }
   	}
   });
   //是否包件监控
   viewModel.finishedProductSuiteList.on("whetherProductPack.valuechange", function(obj) {
   	 //判断编辑时该字段变化
   	 if(obj.oldValue !=undefined &&obj.oldValue != obj.newValue){
		     var packageNum =app.getComp("packageNum");
		     if(obj.newValue!=1){
		     		packageNum.validate.required=false;
	     	    packageNum.validate.nullMsg="";
	     	    $(".pack-check").addClass("hide");
		     }
		     else{
		     	 	packageNum.validate.required=true;
	     	    packageNum.validate.nullMsg="不能为空";
	     	    $(".pack-check").removeClass("hide");
		     }
		  }
   });
   	//查询编码
		singledocSearch.viewModel.params.on("code.valuechange", function(obj) {
	    	  var code=obj.newValue;
					var word = " "; // 要计算的字符
					var regex = new RegExp(word, 'g'); // 使用g表示整个字符串都要匹配
					var result = code.match(regex);
					viewModel.codeCount = !result ? 0 : result.length;
	   });
    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY003"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        viewModel.proStateSrc(newarray);
      }
    });
    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY006"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        viewModel.productionModeSrc(newarray);
      }
    });
    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY010"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        viewModel.croMaStateSrc(newarray);
      }
    });

    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY018"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        viewModel.proTypeCodeSrc(newarray);
      }
    });

  }
  
  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.vm = viewModel;
    $(".product-choose-result").hide();
    $(".product-choose").each(function(index){
    	var _this=$(this);
    	_this.click(function(){
    		if($(this).hasClass("is-checked")){
    			  $(".product-choose-result").eq(index).show();
    			  $(".product-choose-content").eq(index).show();
	    	  }
    		 else{
	    	   	 $(".product-choose-result").eq(index).hide();
	    	   	 $(".product-choose-result").eq(index).removeClass("open");
	    	   	 $(".ui-collapse-content").eq(index + 1).attr("aria-hidden","true").hide();
	    	   }
    	})
    	 
    })
    
  }

  return {
    init: init
  }
});
