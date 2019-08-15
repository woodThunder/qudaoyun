define(['text!./nonfurniture.html','ocm_common','searchbox','editcard','billfooter','./meta.js','ocm_global','ajaxfileupload','ossupload','interfaceFileImpl'], function (tpl,common,searchbox,editcard,billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer,exportDialog,importDialog,fileDialog,picBigDialog;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
//  COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }

  baseData = {
    baseurl : '/product-info', 
    picurl : '/prod-photo-info',
    relationurl : '/prod-info-photo-info',
    finishedProductSuiteList: new u.DataTable(finishedProductSuite),
    ProdInfoAndPhotoInfoList: new u.DataTable(ProdInfoAndPhotoInfometa),
    pictureCategoryRef: new u.DataTable(pictureCategoryRef),
    FileList: new u.DataTable(FileMeta),
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    whetherFormat: common.format.whetherFormat,
    enableCheckSrc: [{value:"1",name:"是"}],
    //TODO: 审核枚举值
    whetherUnconventionalitySrc: CONST.WHETHER,
    productionModeSrc:ko.observableArray([]),
    croMaStateSrc:ko.observableArray([]),
    genericTypeSrc:ko.observableArray([]),
    labelStandardSrc:ko.observableArray([]),
    proStateSrc:ko.observableArray([]),
		supplySrc:[
		    {value:"1",name:"供货"},
		    {value:"0",name:"不供货"}],
		pictureCategory:"",
    pictureCategoryName:"",
    prodPhotoInfoId:[],
    picArr:[],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    //跳转图片维护页
    goPicPanel:common.bill.goPicPanel,
  };
  rendertype = {
    operation: common.rendertype.operation,
    enableStatusRender:function(obj) {
      var showValue = obj.value == "1" ? "启用" : "停用";
      obj.element.innerHTML = showValue;
    },
  	detailRender: common.rendertype.detailRender,
     //表格图片
    picShow:function(obj){
	      var prodPhotoInfoUrl=viewModel.ProdInfoAndPhotoInfoList.getRow(obj.rowIndex).getValue("prodPhotoInfoUrl");
	      var prodUrl="";
	      if(prodPhotoInfoUrl){
	          //特殊字符\  .  替换
	      		var prodUrl=prodPhotoInfoUrl.replace(/\./g,"spot").replace(/\//g,"linePath").replace(/\-/g,"lineThrough");
            obj.element.innerHTML = '<img width="30" height="30" src='+prodPhotoInfoUrl+ ' data-bind="click: picBig.bind($data,' + "'" + prodUrl + "'" + ')">';
	      }
	  	  ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
    //是否主图
    mainPhoto:function(obj){
	      var mainPhoto=viewModel.ProdInfoAndPhotoInfoList.getRow(obj.rowIndex).getValue("isMainPhoto");
	      var showValue="否";
	      if(mainPhoto==1 || mainPhoto=="1"){
	      	showValue="是"
	      }
        obj.element.innerHTML = showValue;
	  	  ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
    operationPic:function(obj){
    	  var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
	  	  var uploadBtn="data-bind=click:picPage.bind($data," + obj.rowIndex + ","+dataTableRowId+"),visible:buttonShowGroup['pic']";
        obj.element.innerHTML = '<div class="ui-handle-icon">'+
        '<span class="ui-handle-word">'+
        '<a href="#"'+
        uploadBtn +
        ' title="图片维护">图片维护</a>'+
        '</span>'+
        '</div>';
	  	  ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
    //设为主图
    operationMain:function(obj){
    	  var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
	  	  var mainBtn="data-bind=click:mainPic.bind($data," + obj.rowIndex + ","+dataTableRowId+")";
        obj.element.innerHTML = '<div class="ui-handle-icon">'+
        '<span class="ui-handle-word">'+
        '<a href="#"'+
        mainBtn +
        ' title="设为主图">设为主图</a>'+
        '</span>'+
        '</div>';
	  	  ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
     //审核状态
	  stateGrid: function (obj) {
	  	var stateValue = viewModel.finishedProductSuiteList.getRow(obj.rowIndex).getValue('statusCode');
	  	var stateName;
	  	stateValue ==1?stateName="启用": stateName="停用";
	  	obj.element.innerHTML = stateName;
	  },
    sum:ko.pureComputed(function(obj){
    	var length=	viewModel.finishedProductSuiteList.ref('length')();
    	var width=	viewModel.finishedProductSuiteList.ref('width')();
    	var height=	viewModel.finishedProductSuiteList.ref('height')();
    	var diameter=viewModel.finishedProductSuiteList.ref('diameter')();
    	length==null ? length="":length=length+ "*";
    	width==null ? width="":width=width+ "*";
    	height==null ? height="":height=height;
    	diameter==null  ? diameter="":diameter="φ"+diameter +"*";
    	return  diameter + length + width + height;
    }),
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
          url:appCtx + viewModel.baseurl+ "/nonFurniture",
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
        var labelStandardId =app.getComp("labelStandardId");
    		labelStandardId.validate.required=false;
     	  labelStandardId.validate.nullMsg="";
     	  $(".pack-check").addClass("hide");
        viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
      },
      //进入修改单据页
      showEditBillPanel: function(index,rowId) {
        viewModel.finishedProductSuiteList.setRowFocus(index);
        var id = viewModel.finishedProductSuiteList.getValue("id");
        var whetherProductPackShow=viewModel.finishedProductSuiteList.getValue("whetherProductPack");
        var labelStandardId =app.getComp("labelStandardId");
		     if(whetherProductPackShow!=1){
		     		labelStandardId.validate.required=false;
	     	    labelStandardId.validate.nullMsg="";
	     	    $(".pack-check").addClass("hide");
		     }
		     else{
		     	 	labelStandardId.validate.required=true;
	     	    labelStandardId.validate.nullMsg="不能为空";
	     	    $(".pack-check").removeClass("hide");
		     }
        $("#materialGroupId").css({visibility:"visible"});
        $("#materialGroupIdshow").css({visibility:"hidden"});
        viewModel.finishedProductSuiteList.originEditData = viewModel.finishedProductSuiteList.getRowByRowId(rowId).getSimpleData();
        viewModel.goBillPanel();
        viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
        var whetherProductPackShow=viewModel.finishedProductSuiteList.getValue("whetherProductPack");
        if(whetherProductPackShow==1){
        	$(".product-choose-result").show();
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
          var whetherProductPackShow=curRow.getValue("whetherProductPack");
          if(whetherProductPackShow==1){
           	$(".show-detail").eq(0).show();
          }
          //根据id查图片维护
          $.ajax({
	          url:appCtx + viewModel.relationurl + '/findByProductInfoId',
	          type:'get',
	          data:{
	          	productInfoId:id
	          },
	          contentType: "application/json; charset=utf-8",
	          success:function(data){
	            viewModel.ProdInfoAndPhotoInfoList.setSimpleData(data,{unSelect:true});
	          }
	        });
//        viewModel.fillData(id);
//        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          common.bill.goDetailPanel();
        }, 0);
      },
      // 详情页跳转编辑单据页
      detail2bill: function() {
//      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
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
  	     var basePass =viewModel.validate(productBase); 
         if(basePass.passed){
	          	var PromoActivityData = viewModel.finishedProductSuiteList.getCurrentRow().getSimpleData();
	            PromoActivityData.proNature="3";
	             if(viewModel.billPanelStatus == BILLPANELSTATUS.ADD){
	              	PromoActivityData.persistStatus="new";
	             }
	             else if(viewModel.billPanelStatus == BILLPANELSTATUS.EDIT){
	              	PromoActivityData.persistStatus="upd";
	             }
	             else{
	             	   PromoActivityData.persistStatus="";
	             }
	            PromoActivityData.prodInfoAndPhotoInfos=[];
	            PromoActivityData.matchRelations=[];
    					for(var k in PromoActivityData){
			      		        if (k.indexOf("whether") > -1 && PromoActivityData[k] == null){
			      		        	PromoActivityData[k]=0;
			      		        }
			      	}
	            if(PromoActivityData.cubage==null){
	               PromoActivityData.cubage=0;
	            }
	            if(PromoActivityData.roughWeight==null){
	               PromoActivityData.roughWeight=0;
	            }
    				  if($("#croMaStateCode").val()==""){
		            	PromoActivityData.croMaStateCode="";
		          }
	            var _ajaxType = viewModel.finishedProductSuiteList.getValue("id") ? "put": "post";
	            $._ajax({
	              url:appCtx + viewModel.baseurl,
	              type:_ajaxType,
	              data:JSON.stringify(PromoActivityData),
	              contentType : "application/json; charset=utf-8",
	              success:function(data){
	                viewModel.finishedProductSuiteList.getFocusRow().setSimpleData(data);
	                toastr.success("保存成功");
	                viewModel.retListPanel();
	              }
	            })
				  }

      },
      //取消单据
      cancelBill: function() {
        var curRow = viewModel.finishedProductSuiteList.getCurrentRow();
        // 修改，则还原
        if(curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.finishedProductSuiteList.originEditData)
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
	    //进入图片维护页
		  picPage:function(index,rowId){
	      var currentData = viewModel.finishedProductSuiteList.getRowByRowId(rowId).getSimpleData();
				viewModel.picRowId = currentData.id;
	      //根据id查图片维护
	      $.ajax({
	          url:appCtx + viewModel.relationurl + '/findByProductInfoId',
	          type:'get',
	          data:{
	          	productInfoId:viewModel.picRowId
	          },
	          contentType: "application/json; charset=utf-8",
	          success:function(data){
	            viewModel.ProdInfoAndPhotoInfoList.setSimpleData(data,{unSelect:true});
		          if(data.length>0){
	            	 for(var i=0;i<data.length;i++){
	            	 	 viewModel.picArr.push(data[i].prodPhotoInfoUrl);
	            	 }
	            }
	          }
	        });
		  	viewModel.goPicPanel();
		  },
      //设为主图
      mainPic:function(index){
      	var oldData=viewModel.ProdInfoAndPhotoInfoList.getRow(index).getSimpleData();
      	var allData=viewModel.ProdInfoAndPhotoInfoList.getSimpleData();
      	var id;
      		 if(JSON.stringify(oldData).indexOf("id")!=-1){
      		 	   id=oldData.id;
				        $._ajax({
				          type: "post",
				          url: appCtx + viewModel.relationurl + "/setIsMainPhoto",
				          data: {id: id},
				          success:function(res){
                    for(var i=0;i<allData.length;i++){
                    	 if(allData[i] != index){
						              viewModel.ProdInfoAndPhotoInfoList.getRow(i).setValue("isMainPhoto", 0);
						           }
                    }
						        viewModel.ProdInfoAndPhotoInfoList.getRow(index).setValue("isMainPhoto", 1);
		        	      toastr.success("设为主图成功");
				          }

				        }) 
		      	}
      		 else{
			      for(var i=0;i<allData.length;i++){
	        	  if(allData[i] != index){
	        	  	viewModel.ProdInfoAndPhotoInfoList.getRow(i).setValue("isMainPhoto", 0);
	        	  }
	          }
		      	viewModel.ProdInfoAndPhotoInfoList.getRow(index).setValue("isMainPhoto", 1);
			      toastr.success("设为主图成功"); 
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
  	  	  searchParams.search_EQ_proNature = "3";
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
     whetherEnable:function(){
     	  var dataValue=viewModel.finishedProductSuiteList.getValue('statusCode');
     	  var showName="启用";
     	  if(dataValue ==0 || dataValue== "0"){
     	  	showName="停用";
     	  } 
     	  return showName;
     },
     //子表 删除和批量删除
      delRow: function (dataTable) {
  		    var rows = viewModel[dataTable].getSelectedRows();
          viewModel[dataTable].removeRows(rows);
      },
      picBig:function(url){
	  	  var picUrl=url.replace(/spot/g,".").replace(/linePath/g,'\/').replace(/lineThrough/g,'\-');
        if(!picBigDialog) {
          picBigDialog = u.dialog({content:"#picBig-dialog",hasCloseMenu:true});
        }
        else {
          picBigDialog.show();
        }
	  		$("#picBig-dialog").parent().parent().css("width","auto");
        $("#picBig").attr("src",picUrl);
	  },
	  prev:function(){
        var current=$("#picBig").attr("src");
	  	   for(var i=0;i<viewModel.picArr.length;i++){
			    	if(viewModel.picArr[i]==current){
			    		  if(viewModel.picArr[i-1]){
			    		  	$("#picBig").attr("src",viewModel.picArr[i-1])
			    		  }
			    		  else{
			    		  	$("#imgTip").html("已经是第一张了").show().fadeOut(5000);
			    		  }
			    	}
	    }
	  },
	  next:function(){
        var current=$("#picBig").attr("src");
        for(var i=0;i<viewModel.picArr.length;i++){
        	if(viewModel.picArr[i]==current){
        		  if(viewModel.picArr[i+1]){
        		  	$("#picBig").attr("src",viewModel.picArr[i+1])
        		  }
        		  else{
			    		  	$("#imgTip").html("已经是最后一张了").show().fadeOut(5000);
        		  }
        	}
        }
	  	 
	  },
	  //图片添加返回列表页
      picBack:function(){
	  	  var postdata = viewModel.ProdInfoAndPhotoInfoList.getSimpleData();
	      var changedata=[];
	      var tip="";
      	for(var i=0;i< postdata.length;i++){
          	if(postdata[i].persistStatus!="nrm"){
               changedata.push(postdata[i]);
          	}
          }
          if(changedata.length>0){
          	function picArr(){
        				for (i=0;i<changedata.length;i++){
	          			 	  tip+=changedata[i].prodPhotoInfoCode +"，";
	          		}
        				return tip.substring(0,tip.length-1)
        			}
          	toastr.warning("图片" + picArr() +"没有保存");
          	return false
          }
          else{
			      	viewModel.retListPanel();
          }
      },
	  //--------------------------------图片上传-------------------------------------------------
    //随机生成文件夹
      generateMixed:function(){
    	   	    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
					    var result = "";
					    for(var i = 0; i < 20 ; i ++) {
					         var id = Math.ceil(Math.random()*35);
					         result += chars[id];
					    }
					    return result;
    	},
      //上传弹框调用
      showFileDialog: function() {
      	viewModel.pk=viewModel.generateMixed();
        var pk =viewModel.pk;
        viewModel.fileQuery();
        if(!fileDialog) {
          fileDialog = u.dialog({content:"#file-dialog",hasCloseMenu:true});
        }
        else {
          fileDialog.show();
        }
      },
      onOpenUploadWin: function(){
      	if(viewModel.pictureCategory!=""){
      		$("#uploadbatch_id").val(undefined);
          $("#uploadbatch_id").trigger("click");
      	}
        else{
        	toastr.warning("请先选择图片分类");
        }
      },
      //上传附件
      onFileUpload: function(){
      	var fileNum=$("#uploadbatch_id")[0].files.length;
      	var fileSize=0;
      	var fileSizeMb=0;
      	var fileTypeArr=[];
	      var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
      	var fileSizeSum = function (){
					for(var i=0;i<fileNum;i++){
	      			 	fileSize+=$("#uploadbatch_id")[0].files[i].size;
	      			 	var fileName=$("#uploadbatch_id")[0].files[i].name;
	      			 	var fileType=fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
	      			 	fileTypeArr.push(fileType);
	      		}
					  fileSizeMb=fileSize/1024/1024;
					  return fileSizeMb
        }();
        for(var i=0;i<fileTypeArr.length;i++){
    		    if(allowType.indexOf(fileTypeArr[i])==-1){
      			 		toastr.warning("仅支持"+allowType+"格式文件");
      			 		return false
      			}
        }
      	if(fileSizeSum <= 500){
      	  //获取表单
	        var pk = viewModel.pk;
	        var allowExtention = ".jpg,.bmp,.gif,.png";
	        var par = {
	             fileElementId: "uploadbatch_id",  //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
	             filepath: pk,   //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
	             groupname: pk,//【必填】分組名称,未来会提供树节点
	             permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
	             url: true,          //【选填】是否返回附件的连接地址，并且会存储到数据库
	             //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
	             cross_url : window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
	             }
	         var f = new interface_file();
	         f.filesystem_upload(par,viewModel.fileUploadCallback);

      	}
		   	else{
		          toastr.warning("图片总和不能超过500MB");
		      		return false
			  }
      },
      //上传文件回传信息
      fileUploadCallback: function(data){
         if(1 == data.status){//上传成功状态
           viewModel.FileList.addSimpleData(data.data);
          //  toastr.success();
         }else{//error 或者加載js錯誤
           toastr.error(data.message);
         }
       },
       fileQuery: function(){
        //获取表单
        var pk = viewModel.pk;
         var par = {
               //建议一定要有条件否则会返回所有值
             filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
             groupname: pk,//【选填】[分組名称,未来会提供树节点]
             cross_url : window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
          }
         var f = new interface_file();
         f.filesystem_query(par,viewModel.fileQueryCallBack);
       },
       fileQueryCallBack: function(data){
         if(1 == data.status){//上传成功状态
           viewModel.FileList.setSimpleData(data.data);
         }else{
           //删除成功后查询
           if(data.status == 0 &&!data.data) {
             viewModel.FileList.setSimpleData([]);
           }
         }
       },
       //附件删除
       fileDelete: function(){
         var row = viewModel.FileList.getSelectedRows();
         if(row==null || row.length==0 ){
           toastr.error("请选择一个附件");
           return
         }
         for(var i=0;i<row.length;i++){
           var pk = row[i].getValue("id");
           var par = {
                 id:pk,//【必填】表的id
                 cross_url : window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
           }
           var f = new interface_file();
           f.filesystem_delete(par,viewModel.fileDeleteCallBack);
         }
       },
       //附件删除回调
       fileDeleteCallBack: function(data){
         if(1 == data.status){//上传成功状态
           viewModel.fileQuery();
         }else{
           toastr.error(data.message);
         }
       },
       //下载
       fileDownload: function(){
         var row = viewModel.FileList.getSelectedRows();
         if(row==null || row.length==0 || row.length>1){
           toastr.error("请选择一个附件");
           return
         }
         for(var i=0;i<row.length;i++){
           var pk = row[i].getValue("id");
           var form = $("<form>");   //定义一个form表单
           form.attr('style', 'display:none');   //在form表单中添加查询参数
           form.attr('target', '');
           form.attr('enctype', 'multipart/form-data');
           form.attr('method', 'post');
           form.attr('action', window.ctxfilemng+"file/download?permission=read&stream=false&id="+pk);
           $('#file-dialog').append(form);  //将表单放置在web中
           form.submit();
         }
       },
       //查看
       fileView: function(){
         var row = viewModel.FileList.getSelectedRows();
         if(row==null || row.length==0){
           toastr.error("请选择一个附件");
           return
         }
         for(var i=0;i<row.length;i++){
           var url = row[i].getValue("url");
           parent.open(location.origin+url);
         }
       },
       //图片保存
       savePic:function(){
       		var curRow = viewModel.finishedProductSuiteList.getCurrentRow();
          var cId = curRow.getValue("id");
          var postdata = viewModel.FileList.getSimpleData();
          if(postdata.length==0){
          	toastr.warning("没有相关数据需要保存");
          	return false
          }
          var picdata=new Array();
          for(var i=0;i< postdata.length;i++){
          	 picdata[i] = {};
          	 picdata[i].code=postdata[i].filename;
          	 picdata[i].picturePath=postdata[i].url;
          	 picdata[i].pictureCategoryId=viewModel.pictureCategory;
          	 picdata[i].statusCode="1";
          	 picdata[i].persistStatus="new";
          }
          $._ajax({
		          url:appCtx + viewModel.picurl+"/batch-save",
		          type:"post",
		          data:JSON.stringify(picdata),
		          contentType : "application/json; charset=utf-8",
		          dataType:"json",
		          complete:function(){
		            u.hideLoader();
		          },
		          success:function(data){
		            var andArr=[];
		            for(var i=0;i<data.length;i++){
		            	andArr[i]={};
		            	andArr[i].prodPhotoInfoCode=data[i].code;
		            	andArr[i].prodPhotoInfoUrl=data[i].picturePath;
		            	andArr[i].pictureCategoryName=viewModel.pictureCategoryName;
		            	viewModel.prodPhotoInfoId[i]=data[i].id;
		            }
		            toastr.success("保存成功");
		            fileDialog.hide();
		          	viewModel.ProdInfoAndPhotoInfoList.addSimpleData(andArr,"new",{"unSelect":true});
		          }
		        })
       	  
       },
       //图片关系保存
       saveParse:function(){
       	  var curRow = viewModel.finishedProductSuiteList.getCurrentRow();
          var cId = curRow.getValue("id");
          var postdata = viewModel.ProdInfoAndPhotoInfoList.getSimpleData();
          var picdata=[];
          var nochangeData=[];
          for(var i=0;i< postdata.length;i++){
          	if(postdata[i].persistStatus!="nrm"){
               picdata.push(postdata[i]);
               if(postdata[i].persistStatus=="new"){
		               picdata[i].productInfoId=cId;
			          	 picdata[i].prodPhotoInfoUrl=postdata[i].prodPhotoInfoUrl;
			          	 picdata[i].pictureCategoryId=viewModel.pictureCategory;
			          	 picdata[i].statusCode="1";
			          	 if(picdata[i].isMainPhoto==null){
			          	    picdata[i].isMainPhoto=0;
			          	 }
			          	 picdata[i].prodPhotoInfoId=viewModel.prodPhotoInfoId[i];
		           }
          	}
          	else{
          		nochangeData.push(postdata[i]);
          	}
          }
          if(picdata.length==0){
          	toastr.warning("没有相关数据需要保存");
          	return false
          }
          else{
		          $._ajax({
				          url:appCtx + viewModel.relationurl+"/batch-save",
				          type:"post",
				          data:JSON.stringify(picdata),
				          contentType : "application/json; charset=utf-8",
				          dataType:"json",
				          complete:function(){
				            u.hideLoader();
				          },
				          success:function(data){
				          	viewModel.ProdInfoAndPhotoInfoList.removeAllRows();
				            viewModel.ProdInfoAndPhotoInfoList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
				            viewModel.ProdInfoAndPhotoInfoList.addSimpleData(data,"nrm",{"unSelect":true});
				            toastr.success("保存成功");
				          }
				        })
		      }
       }
       //--------------------------------图片上传-------------------------------------------------

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
          type:"combo",
          key:"finishedProductPack--genericType",
          label:"通用类型",
          url:appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY007",
          namefield:"name",
          valuefield:"code"
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
        },
        {
            type:"radio",
            key:"isIncludePic",
            label:"是否有图片",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
        },
         {
            type:"radio",
            key:"isFinishedProduct",
            label:"是否成品渠道",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
         },
         {
            type:"radio",
            key:"isElecBusiniess",
            label:"是否电商渠道",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
         },
         {
            type:"radio",
            key:"isEnginieering",
            label:"是否工程渠道",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
         },
         {
            type:"radio",
            key:"isCustomized",
            label:"是否定制渠道",
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
		     var labelStandardId =app.getComp("labelStandardId");
		     if(obj.newValue!=1){
		     		labelStandardId.validate.required=false;
	     	    labelStandardId.validate.nullMsg="";
	     	    $(".pack-check").addClass("hide");
		     }
		     else{
		     	 	labelStandardId.validate.required=true;
	     	    labelStandardId.validate.nullMsg="不能为空";
	     	    $(".pack-check").removeClass("hide");
		     }
		  }
   });
   //长宽高计算外观值
   viewModel.finishedProductSuiteList.on("length.valuechange", function(obj) {
     var exteriorSize =app.getComp("exteriorSize");
     exteriorSize.setValue(viewModel.sum());
   });
   viewModel.finishedProductSuiteList.on("width.valuechange", function(obj) {
     var exteriorSize =app.getComp("exteriorSize");
     exteriorSize.setValue(viewModel.sum());
   });
   viewModel.finishedProductSuiteList.on("height.valuechange", function(obj) {
     var exteriorSize =app.getComp("exteriorSize");
     exteriorSize.setValue(viewModel.sum());
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
   viewModel.pictureCategoryRef.createEmptyRow();
   //判断上传选择图片分类
   viewModel.pictureCategoryRef.on("pictureCategory.valuechange", function(obj) {
    	 viewModel.pictureCategory=obj.newValue;
    	 var refValues = $("#refContainerpictureCategory").data("uui.refer").values;
    	 viewModel.pictureCategoryName=refValues[0].refname;
   });
   	//查询编码
		singledocSearch.viewModel.params.on("code.valuechange", function(obj) {
	    	  var code=obj.newValue;
					var word = " "; // 要计算的字符
					var regex = new RegExp(word, 'g'); // 使用g表示整个字符串都要匹配
					var result = code.match(regex);
					viewModel.codeCount = !result ? 0 : result.length;
	   });
    //
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
        cust_doc_code:"QY007"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        viewModel.genericTypeSrc(newarray);
      }
    });
    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY011"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","id");
        viewModel.labelStandardSrc(newarray);
      }
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
    // 选择上传文件后，直接调用上传方法
    $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
      if(this.value) {
        viewModel.onFileUpload();
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
