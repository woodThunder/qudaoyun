define(['text!./account.html','ocm_common','searchbox','./meta.js','ocm_global'], function (tpl,common,searchbox) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch;
  
  baseData = {
    baseurl : '/accounts', 
    accountMgOrgUrl: '/account-mg-orgs',
    ContactListUrl: '/contact',
    channelCusStoreUrl: '/channel-cus-stores',
    companyInfoUrl: '/base/company-infos',
    accountList: new u.DataTable(Accountmeta),
    ContactList: new u.DataTable(Contactmeta),
    accountMgOrgList: new u.DataTable(accountMgOrgmeta),
    channelCusStoreList: new u.DataTable(channelCusStoremeta),
    companyInfoList: new u.DataTable(companyInfometa),
    whetherSource: [{value:"0",name:"否"},{value:"1",name:"是"}],
    statusCodeSource: [{value:"0",name:"停止"},{value:"1",name:"有效"}],
    statusSource: [{value:"1",name:"启用"},{value:"0",name:"停用"}],
    whetherSrc: CONST.WHETHER,
    registTypeSrc:ko.observableArray([]),
    credentialsTypeSrc:ko.observableArray([]),
    accountAllocationGroupNameSource:ko.observableArray([]),
    flag:0,
    currentFlag:1,
    currentTab:0,
    currentList:"",
    currentTip:"",
    contactdata:[],
    accountMgOrgdata:[],
    channelCusStoredata:[],
    companyInfodata:[],
    
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
   
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,

		saleChannelDataSource:ko.observableArray([]),
	
    //返回列表页
    retListPanel: common.bill.retListPanel
    

  };
  rendertype = {
  	//跳转详情页
  	detailRender: common.rendertype.detailRender,
    operation:function(obj){
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle ui-tab-icon-b">'+
      '<a href="#" class="uifont icon-edit font-c-c" '+
      editfun +
      ' title="修改"></a>'+
      '</span>    '+
      '<span class="ui-handle ui-tab-icon-b">'+
      '<a href="#" class="uifont icon-shanchu1 font-c-c" '+
      delfun +
      ' title="删除"></a>'+
      '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    
    enableStatusRender:function(obj) { 
            var showValue = obj.value == "1" ? "启用" : "停用"; 
            obj.element.innerHTML = showValue; 
        }, 
     //判断表格里的状态
     //审核状态
	  stateGrid: function (obj) {
	  	var stateValue = viewModel.accountList.getRow(obj.rowIndex).getValue('statusCode');
	  	var stateName;
	  	stateValue ==1?stateName="启用": stateName="停用";
	  	obj.element.innerHTML = stateName;
	  },

  };
  events = {
  	  
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，-2为复制,大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var self = this;
        viewModel.index = index;
        viewModel.rowId=rowId;
				viewModel.goBillPanel();
        viewModel.ContactList.clear();
        viewModel.accountMgOrgList.clear();
        viewModel.channelCusStoreList.clear();
        viewModel.companyInfoList.clear();
        
		    //设置tab显示基本信息
				$(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
				$(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
				viewModel.currentFlag=1;
        viewModel.currentTab=0;
        if (index >= 0) {
          //修改操作
          var currentDataId = viewModel.accountList.getRowByRowId(rowId).getValue('id');
          var code= viewModel.accountList.getRowByRowId(rowId).getValue('code');
          viewModel.accountList.originEditData = viewModel.accountList.getRowByRowId(rowId).getSimpleData();
          $("#codeBox").html("<label>"+code+"</label>");
          viewModel.flag=1;
          //根据id查联系人表
          $._ajax({
	          url:appCtx + viewModel.ContactListUrl + '/findByAccountId',
	          type:'get',
	          data:{
	          	accountId:currentDataId
	          },
	          contentType: "application/json; charset=utf-8",
	          success:function(data){
	            viewModel.ContactList.setSimpleData(data,{unSelect:true});
              viewModel.contactdata = viewModel.ContactList.getSimpleData();
	          }
	        });
	        //根据id查账号所属组织
          $._ajax({
	          url:appCtx + viewModel.accountMgOrgUrl + '/findByAccountId',
	          type:'get',
	          data:{
	          	accountId:currentDataId
	          },
	          contentType: "application/json; charset=utf-8",
	          success:function(data){
	            viewModel.accountMgOrgList.setSimpleData(data,{unSelect:true});
              viewModel.accountMgOrgdata = viewModel.accountMgOrgList.getSimpleData();
	            
	          }
	        });
	        //根据id查账号送达方
          $._ajax({
	          url:appCtx + viewModel.channelCusStoreUrl + '/findByAccountId',
	          type:'get',
	          data:{
	          	accountId:currentDataId
	          },
	          contentType: "application/json; charset=utf-8",
	          success:function(data){
	            viewModel.channelCusStoreList.setSimpleData(data,{unSelect:true});
              viewModel.channelCusStoredata = viewModel.channelCusStoreList.getSimpleData();
	            
	          }
	        });
//          根据id公司信息表
          $._ajax({
	          url:appCtx + viewModel.companyInfoUrl + '/findByAccountId',
	          type:'get',
	          data:{
	          	accountId:currentDataId
	          },
	          contentType: "application/json; charset=utf-8",
	          success:function(data){
	            viewModel.companyInfoList.setSimpleData(data,{unSelect:true});
              viewModel.companyInfodata = viewModel.companyInfoList.getSimpleData();
	          }
	        });
          
        }else if( index === -2){
        	//复制操作
        	var rowIndexArr = viewModel.accountList.getSelectedIndices();
        	var focusRow = viewModel.accountList.getFocusRow();
        	var currentRow = viewModel.accountList.getCurrentRow();
	      	if( rowIndexArr.length > 1 || !currentRow ){
	      		u.confirmDialog({
				        msg: "请选择一条数据？",
				        title: "复制",
				        onOk: function () {
				            //
				        },
				        onCancel: function () {
				            //
				        }
				    });
							viewModel.retListPanel();
	      	}else {
	      		var copyRow = focusRow ? focusRow : currentRow;
	        	var curRow = viewModel.accountList.createEmptyRow();
	      		curRow.setSimpleData(copyRow.getSimpleData());
	      		viewModel.accountList.setRowFocus(curRow);
	      		var currentDataId = copyRow.getValue('id');

	      		
	      		//根据id查子表
	          $._ajax({
	         		url:appCtx + viewModel.accountMgOrgUrl + '/findByAccountId',
		          type:'get',
		          data:{
		          	findByAccountId:currentDataId
		          },
		          contentType: "application/json; charset=utf-8",
		          success:function(data){
		            viewModel.accountMgOrgList.setSimpleData(data,{unSelect:true});
		          }
		        });
		        //删除主表主键，编码，审计信息
		        viewModel.clearBaseProp(curRow);
		        //删除子表主键，子表主表关联
		        var subRows = viewModel.accountMgOrgList.getAllRows();
		        for(var i=0; i<subRows.length; i++) {
		          viewModel.clearBaseProp(subRows[i]);
		          subRows[i].setValue("parentid", "");
		        }
	      	}
        }else {
          //添加操作
          viewModel.flag=0;
          var currentRow = viewModel.accountList.createEmptyRow();
          viewModel.accountList.setRowFocus(currentRow);
          currentRow.setValue('statusCode','1');
          var isData=currentRow.getSimpleData();
          // $("#codeBox").html("<input class='u-input' id='codeinfo'/>");
          for(var k in currentRow){
	  		        if (k.indexOf("is") > -1 && currentRow[k] == null){
	  		        	currentRow[k]=0;
	  		        }
	  	     }
        }
      },
      // 清除基类属性
      clearBaseProp: function(curRow) {
        curRow.setValue("id", null);
        curRow.setValue("code", "");
        curRow.setValue("creator", "");
        curRow.setValue("creationTime", "");
        curRow.setValue("modifier", "");
        curRow.setValue("modifiedTime", "");
      },
      //点击保存按钮
      saveHandle: function () {
      	var _index = viewModel.index;
      	var infoBase=$("#productBase")[0]; 
        var basePass =viewModel.validate(infoBase); 
        if(basePass.passed){
      	    viewModel.edit(_index);
      	}
      },
         //启用
      enable: function() {
        var selectedRows = viewModel.accountList.getSelectedRows();
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
        var selectedRows = viewModel.accountList.getSelectedRows();
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
      //将操作后的数据进行保存
      edit: function(index) {
      	var self = this;
        var currentRow,type = "post";
        var postdata = viewModel.accountList.getFocusRow().getSimpleData();
        var dataListChild = viewModel.accountMgOrgList.getSimpleData();
        postdata.floatCoefficientDefs = dataListChild;
        if(index>=0){
          type = "put";
        }
        else{
        	postdata.statusCode=1;
        	postdata.code=$("#codeinfo").val();
        }
        postdata.isAutoEncoded='1'; // 自动编码
         //账号类型无选择提示
        var accountType =app.getComp("accountTypeId");
        // viewModel.ShopList.setValue("townId","");
        if (!accountType.trueValue) {
          common.dialog.confirmDialog({
            msg1: '账号类型不选默认为通用型',
            msg2: '是否继续保存',
            width: '400px',
            type: 'error',
            onOk: function () {
              //更改后台数据
              $._ajax({
              url:appCtx + viewModel.baseurl ,
              type:type,
              data:JSON.stringify(postdata),
              contentType : "application/json; charset=utf-8",
              success:function(data){
                //如果index大于等于0说明是修改
                if (index >= 0) {
                  //获取需要修改的行
                  currentRow = viewModel.accountList.getRowByRowId(viewModel.rowId);
                  //将用户填写的数据更新到CustomerList上
                } else {
                  //添加数据
                  currentRow = viewModel.accountList.getFocusRow();
                }
                currentRow.setSimpleData(data);
                viewModel.flag=1;
                $("#productBase").hide();
                $("#productBase_show").show();
    //          viewModel.retListPanel();
                toastr.success("保存成功");
              }
            })
            }
          });
        }else{
           // 更改后台数据
        $._ajax({
          url:appCtx + viewModel.baseurl ,
          type:type,
          data:JSON.stringify(postdata),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            //如果index大于等于0说明是修改
            if (index >= 0) {
              //获取需要修改的行
              currentRow = viewModel.accountList.getRowByRowId(viewModel.rowId);
              //将用户填写的数据更新到CustomerList上
            } else {
              //添加数据
              currentRow = viewModel.accountList.getFocusRow();
            }
            currentRow.setSimpleData(data);
            viewModel.flag=1;
            $("#productBase").hide();
            $("#productBase_show").show();
//          viewModel.retListPanel();
            toastr.success("保存成功");
          }
        })
        }
      },
    validate:function (element){
		    var result = app.compsValidateMultiParam({element:element,showMsg:true});
		    return result;
     },
      //选择选择客户经理编码前选择所属办事处编码
  		officeOrganizationCheck: function(obj){
        
  			var colIndex = obj.colIndex;
  			var filedValue = obj.gridObj.gridCompColumnArr[colIndex].options.filed;
        if(colIndex == '5'){
        	var officeOrganizationId = viewModel.accountMgOrgList.getRow(obj.rowIndex).getValue("officeOrganizationId");
  				if(!officeOrganizationId){
	  				toastr.warning("请先所属办事处编码");
	  				return false;
	  			}else{
            viewModel.accountMgOrgList.meta.personId.refparam='{"EQ_organization.id":' + '"' + officeOrganizationId +'"'
		           + ',"EQ_isEnable"'+':' + '"1"' +'}';	  				
	  				return true;
	  			}
  			}else if(colIndex == '3'){
          
          var organizationCode = viewModel.accountMgOrgList.getRow(obj.rowIndex).getValue("organizationCode");
          var organizationIsOffice = viewModel.accountMgOrgList.getRow(obj.rowIndex).getValue("organizationIsOffice");
          if(!organizationCode){
            toastr.warning("请先销售组织编码");
            return false;
          }else{
            
            if (!viewModel.accountMgOrgList.meta.officeOrganizationId.refparam) {
              var isValue ={"EQ_isOffice":"1","EQ_isSaleOrganization":"0"};
              var isOfficeCode={"EQ_code":organizationCode,"EQ_isOffice":"1"};
              if (organizationIsOffice==1) {
                viewModel.accountMgOrgList.meta.officeOrganizationId.refparam=JSON.stringify(isOfficeCode);
                return true;
              } else{
                viewModel.accountMgOrgList.meta.officeOrganizationId.refparam=JSON.stringify(isValue);
                return true;
              }
            }else{
              return true;
            }

          }
  			}else{
          return true;
        }
  		},
      //选择选择所属办事处编码先选择销售组织
      // organizationCheck: function(obj){
      //   var colIndex = obj.colIndex;
      //   var filedValue = obj.gridObj.gridCompColumnArr[colIndex].options.filed;
      //   if(colIndex == '3'){
      //     var organizationCode = viewModel.accountMgOrgList.getRow(obj.rowIndex).getValue("organizationCode");
      //     // var isOffice = viewModel.accountMgOrgList.getRow(obj.rowIndex).getValue("isOffice");
      //     if(!organizationCode){
      //       toastr.warning("请先销售组织编码");
      //       return false;
      //     }else{
            
      //       var isValue ={"EQ_isOffice":"1","EQ_isSaleOrganization":"0"};
      //       var isOfficeCode={"EQ_code":organizationCode,"EQ_isOffice":"1"};
      //       if (viewModel.isOffice==1) {
      //         viewModel.accountMgOrgList.meta.officeOrganizationId.refparam=JSON.stringify(isOfficeCode);
      //       } else{
      //         viewModel.accountMgOrgList.meta.officeOrganizationId.refparam=JSON.stringify(isValue);
      //       }
      //     }
          
      //   }else{
      //     return true;
      //   }
      // },
    //联系人保存
    saveContact:function(){
		    var curRow = viewModel.accountList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.ContactList.getSimpleData();
        var changeData = [];
        var newChangeData = [];
        var nochangeData = [];
        var delChangeData = [];
        if(postdata&&postdata.length>0){
          for(var i = 0;i< postdata.length;i++){
            if(postdata[i].persistStatus!="nrm"){
            	postdata[i].statusCode=0;
            	postdata[i].accountId=cId;
              changeData.push(postdata[i]);
            }else{
              nochangeData.push(postdata[i]);
            }
            if(postdata[i].persistStatus=="new"){
              
              postdata[i].accountId=cId;
              newChangeData.push(postdata[i]);
            }
            if(postdata[i].persistStatus=="fdel"){
              
              postdata[i].accountId=cId;
              delChangeData.push(postdata[i]);
            }
          }
        }
        if(changeData.length==0){
        	toastr.warning("没有相关数据需要保存");
        	return false
        }
        if (newChangeData.length==0) {
            if (postdata.length==delChangeData.length) {
              for (var i=0; i<postdata.length; i++){
                for (var j=0;j<delChangeData.length;j++){
                  if( postdata[i]== delChangeData[j]){
                      toastr.warning("联系人已存在的情况下，不可全部删除");
                      viewModel.cancelContact();
                      return false
                   }
                }
              }
            }
          
        }
        var contactInfo=$("#contactInfo")[0]; 
        var basePass =viewModel.validate(contactInfo); 
        if(basePass.passed){
		        $._ajax({
		          url:appCtx + viewModel.ContactListUrl + "/batch-save",
		          type:"post",
		          data:JSON.stringify(changeData),
		          contentType : "application/json; charset=utf-8",
		          dataType:"json",
		          complete:function(){
		            u.hideLoader();
		          },
		          success:function(data){
		            viewModel.ContactList.removeAllRows();
		            viewModel.ContactList.addSimpleData(data,"nrm",{"unSelect":true});
		            viewModel.ContactList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
		            viewModel.contactdata=viewModel.ContactList.getSimpleData();
		            viewModel.currentFlag=1;
                toastr.success("保存成功");
		          }
		        })
		    }
      },
    //所属组织保存
    saveAccountMgOrg:function(){
		    var curRow = viewModel.accountList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.accountMgOrgList.getSimpleData();
        var changeData = [];
        var nochangeData = []
        if(postdata&&postdata.length>0){
          for(var i = 0;i< postdata.length;i++){
            if(postdata[i].persistStatus!="nrm"){
            	postdata[i].accountId=cId;
            	if(postdata[i].soState==null){
            		postdata[i].soState=0
            	}
            	if(postdata[i].deliveryState==null){
            		postdata[i].deliveryState=0
            	}
            	if(postdata[i].invoiceState==null){
            		postdata[i].invoiceState=0
            	}
            	if(postdata[i].supportState==null){
            		postdata[i].supportState=0
            	}
            	if(postdata[i].accountState==null){
            		postdata[i].accountState=0
            	}
            	if(postdata[i].statusCode==null){
            		postdata[i].statusCode="1"
            	}
              changeData.push(postdata[i]);
            }else{
              nochangeData.push(postdata[i]);
            }
          }
        }
        if(changeData.length==0){
        	toastr.warning("没有相关数据需要保存");
        	return false
        }
        var accountMgOrgInfo=$("#accountMgOrgInfo")[0]; 
        var basePass =viewModel.validate(accountMgOrgInfo); 
        if(basePass.passed){ 
		        $._ajax({
		          url:appCtx + viewModel.accountMgOrgUrl + "/batch-save",
		          type:"post",
		          data:JSON.stringify(changeData),
		          contentType : "application/json; charset=utf-8",
		          dataType:"json",
		          complete:function(){
		            u.hideLoader();
		          },
		          success:function(data){
		            viewModel.accountMgOrgList.removeAllRows();
		            viewModel.accountMgOrgList.addSimpleData(data,"nrm",{"unSelect":true});
		            viewModel.accountMgOrgList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
		            viewModel.accountMgOrgdata=viewModel.accountMgOrgList.getSimpleData();
		            viewModel.currentFlag=1;
                toastr.success("保存成功");
		          }
		        })
		    }
      },
    //送达方保存
    saveChannelCusStore:function(){
		    var curRow = viewModel.accountList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.channelCusStoreList.getSimpleData();
        var changeData = [];
        var nochangeData = []
        if(postdata&&postdata.length>0){
          for(var i = 0;i< postdata.length;i++){
            if(postdata[i].persistStatus!="nrm"){
            	if(postdata[i].statusCode==null){
            		postdata[i].statusCode="1"
            	}
            	postdata[i].accountId=cId;
              changeData.push(postdata[i]);
            }else{
              nochangeData.push(postdata[i]);
            }
          }
        }
        if(changeData.length==0){
        	toastr.warning("没有相关数据需要保存");
        	return false
        }
        var channelCusStoreInfo=$("#channelCusStoreInfo")[0]; 
        var basePass =viewModel.validate(channelCusStoreInfo); 
        if(basePass.passed){ 
			        $._ajax({
			          url:appCtx + viewModel.channelCusStoreUrl + "/batch-save",
			          type:"post",
			          data:JSON.stringify(changeData),
			          contentType : "application/json; charset=utf-8",
			          dataType:"json",
			          complete:function(){
			            u.hideLoader();
			          },
			          success:function(data){
			            viewModel.channelCusStoreList.removeAllRows();
			            viewModel.channelCusStoreList.addSimpleData(data,"nrm",{"unSelect":true});
			            viewModel.channelCusStoreList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
			            viewModel.channelCusStoredata=viewModel.channelCusStoreList.getSimpleData();
		              viewModel.currentFlag=1;
                  toastr.success("保存成功");
			            
			          }
			        })
			    }
      },
     //公司信息保存
    savecompanyInfo:function(){
		    var curRow = viewModel.accountList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.companyInfoList.getSimpleData();
        var changeData = [];
        var nochangeData = []
        if(postdata&&postdata.length>0){
          for(var i = 0;i< postdata.length;i++){
            if(postdata[i].persistStatus!="nrm"){
            	postdata[i].Addr_status=0;
            	postdata[i].logistic_period=0;
            	postdata[i].accountId=cId;
              changeData.push(postdata[i]);
            }else{
              nochangeData.push(postdata[i]);
            }
          }
        }
        if(changeData.length==0){
        	toastr.warning("没有相关数据需要保存");
        	return false
        }
        var companyInfo=$("#companyInfo")[0]; 
        var basePass =viewModel.validate(companyInfo); 
        if(basePass.passed){ 
			        $._ajax({
			          url:appCtx + viewModel.companyInfoUrl + "/batch-save",
			          type:"post",
			          data:JSON.stringify(changeData),
			          contentType : "application/json; charset=utf-8",
			          dataType:"json",
			          complete:function(){
			            u.hideLoader();
			          },
			          success:function(data){
			            viewModel.companyInfoList.removeAllRows();
			            viewModel.companyInfoList.addSimpleData(data,"nrm",{"unSelect":true});
			            viewModel.companyInfoList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
			            viewModel.companyInfodata = viewModel.companyInfoList.getSimpleData();
		              viewModel.currentFlag=1;
                  toastr.success("保存成功");
			          }
			        })
			  }
      },
      //主表删除和批量删除
      del: function (data,rowId) {
        if (typeof(data) == 'number') {
          viewModel.accountList.setRowSelect(viewModel.accountList.getRowByRowId(rowId));
        }
        var ids = [];
        var rows = viewModel.accountList.getSelectedRows();
        var status=[];
        var statustip="";
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
	              data: "ids=" + ids.join(","),
	              success:function(data){
	                viewModel.accountList.removeRows(rows);
	                toastr.success("删除成功");
	              }
	            });
	          }
	        });
	      }else{
	      	toastr.warning("请先选择要删除的数据");
	      }
      },
      //子表 删除和批量删除
      delChild: function (dataTable) {
  		    var rows = viewModel[dataTable].getSelectedRows();
          viewModel[dataTable].removeRows(rows);
      },
      //子表增行
      addRow: function (dataTable) {
	      	viewModel[dataTable].createEmptyRow();
	      	viewModel.currentFlag=0;
      },
			//查看详情
	    detail: function() {
	      //确保grid先将行设置为focus状态
	      setTimeout(function(){
	        var curRow = viewModel.accountList.getCurrentRow();
	        var id = curRow.getValue("id");
	        viewModel.findByContact(id);
	        viewModel.findByaccountMgOrg(id);
	        viewModel.findBychannelCusStore(id);
	        viewModel.findBycompanyInfo(id);
	        viewModel.goDetailPanel();
	        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
	        //设置tab显示基本信息
				  $(".ui-bill-detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
				  $(".ui-bill-detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
				  
	      }, 0);
	    },
	    //查询联系人表数据
	    findByContact: function(id) {
	      $._ajax({
	        url:appCtx + viewModel.ContactListUrl + '/findByAccountId',
	        type: 'get',
	        async: false,
	        data: {accountId: id},
	        success:function(data){
	          viewModel.ContactList.setSimpleData(data,{unSelect:true});
	        }
	      })
	    },
	    //查询所属组织表数据
	    findByaccountMgOrg: function(id) {
	      $._ajax({
	        url:appCtx + viewModel.accountMgOrgUrl + '/findByAccountId',
	        type: 'get',
	        async: false,
	        data: {accountId: id},
	        success:function(data){
	          viewModel.accountMgOrgList.setSimpleData(data,{unSelect:true});
	        }
	      })
	    },
	    //查询送达方表数据
	    findBychannelCusStore: function(id) {
	      $._ajax({
	        url:appCtx + viewModel.channelCusStoreUrl + '/findByAccountId',
	        type: 'get',
	        async: false,
	        data: {accountId: id},
	        success:function(data){
	          viewModel.channelCusStoreList.setSimpleData(data,{unSelect:true});
	        }
	      })
	    },
	    //查询公司信息表数据
	    findBycompanyInfo: function(id) {
	      $._ajax({
	        url:appCtx + viewModel.companyInfoUrl + '/findByAccountId',
	        type: 'get',
	        async: false,
	        data: {accountId: id},
	        success:function(data){
	          viewModel.companyInfoList.setSimpleData(data,{unSelect:true});
	        }
	      })
	    },
      //点击取消 单据页
      cancelHandle: function () {
				   if(viewModel.currentTab==0){
	             //	var row = viewModel.accountList.getFocusRow();
							  var curRow = viewModel.accountList.getCurrentRow();
				        // 修改，则还原
				        if(curRow.getValue("id")) {
					        	if(curRow.status != "nrm"){
					            curRow.setSimpleData(viewModel.accountList.originEditData)
					        	}
				        }
				        // 新增或复制，则删除
				        else {
				          viewModel.accountList.removeRow(curRow);
				        }
		      	}
		      	viewModel.retListPanel();
      },
      //返回
      backPanel:function(){  	
      	common.dialog.confirmDialog({
	          msg1: '确认返回列表页？',
	          msg2: '此操作不可逆',
	          width: '400px',
	          type: 'error',
	          onOk: function () {
              viewModel.cancelHandle();
			      	$("#productBase").show();
			        $("#productBase_show").hide();
	          }
	        });
      },

      cancelContact:function(){
      	 viewModel.ContactList.removeAllRows();
      	 viewModel.ContactList.setSimpleData(viewModel.contactdata,{"unSelect":true});
      	 viewModel.currentFlag=1;
      },
      cancelaccountMgOrg:function(){
      	 viewModel.accountMgOrgList.removeAllRows();
      	 viewModel.accountMgOrgList.setSimpleData(viewModel.accountMgOrgdata,{"unSelect":true});
      	 viewModel.currentFlag=1;
      },
      cancelChannelCusStore:function(){
      	 viewModel.channelCusStoreList.removeAllRows();
      	 viewModel.channelCusStoreList.setSimpleData(viewModel.channelCusStoredata,{"unSelect":true});
      	 viewModel.currentFlag=1;
      },
      cancelcompanyInfo:function(){
      	 viewModel.companyInfoList.removeAllRows();
      	 viewModel.companyInfoList.setSimpleData(viewModel.companyInfodata,{"unSelect":true});
      	 viewModel.currentFlag=1;
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
          viewModel.accountList.pageIndex(0);
        }
        viewModel.accountList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.accountList.pageSize();
        queryData.page = viewModel.accountList.pageIndex();
        var oldCode = queryData["search_LIKE_code"];
        if(oldCode){
          queryData["search_IN_code"] =oldCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_code"];
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.accountList.setSimpleData(data.content,{unSelect:true});
            viewModel.accountList.totalRow(data.totalElements);
            viewModel.accountList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.accountList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.accountList.pageSize(size);
        viewModel.search(true);
      },
     //详情启用状态
     status: function () {
      	var statusValue = viewModel.accountList.getValue('statusCode');
      	if(statusValue === null){
		  		viewModel.accountList.setValue('statusCode',1);
		  	}
      	var showName;
      	statusValue==1 ? showName="启用":showName="停用";
      	return showName;
      },
      //导入
      importHandle: function() {
        var urlInfo = '/account-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/account-excel/excelLoadingStatus'; //请求进度地址参数
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
          var templateUrl = '/account-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/account-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.accountList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //导入
      importContact: function() {
        var urlInfo = '/contact-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/contact-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportContact: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          //搜索参数加account.
          for (var p in searchParams){
          	searchParams[p.replace("LIKE_","LIKE_account.").replace("EQ_","EQ_account.")]=searchParams[p];
					  delete searchParams[p];
          }
          searchParams["search_EQ_account.dr"] = "0";
          var oldCode = searchParams["search_LIKE_account.code"];
          if(oldCode){
            searchParams["search_IN_account.code"] =oldCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_account.code"];
          var templateUrl = '/contact-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/contact-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.accountList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //导入
      importaccountMgOrg: function() {
        var urlInfo = '/account-mg-org-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/account-mg-org-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportaccountMgOrg: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          //搜索参数加account.
          for (var p in searchParams){
          	searchParams[p.replace("LIKE_","LIKE_account.").replace("EQ_","EQ_account.")]=searchParams[p];
					  delete searchParams[p];
          }
          searchParams["search_EQ_account.dr"] = "0";
          var oldCode = searchParams["search_LIKE_account.code"];
          if(oldCode){
            searchParams["search_IN_account.code"] =oldCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_account.code"];
          var templateUrl = '/account-mg-org-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/account-mg-org-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.accountList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //导入
      importchannelCusStore: function() {
        var urlInfo = '/channel-cusStore-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/channel-cusStore-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportchannelCusStore: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          //搜索参数加account.
          for (var p in searchParams){
          	searchParams[p.replace("LIKE_","LIKE_account.").replace("EQ_","EQ_account.")]=searchParams[p];
					  delete searchParams[p];
          }
          searchParams["search_EQ_account.dr"] = "0";
          var oldCode = searchParams["search_LIKE_account.code"];
          if(oldCode){
            searchParams["search_IN_account.code"] =oldCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_account.code"];
          var templateUrl = '/channel-cusStore-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/channel-cusStore-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.accountList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //导入
      importcompanyInfo: function() {
        var urlInfo = '/company-info-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/company-info-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportcompanyInfo: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          //搜索参数加account.
          for (var p in searchParams){
          	searchParams[p.replace("LIKE_","LIKE_account.").replace("EQ_","EQ_account.")]=searchParams[p];
					  delete searchParams[p];
          }
          searchParams["search_EQ_account.dr"] = "0";
          var oldCode = searchParams["search_LIKE_account.code"];
          if(oldCode){
            searchParams["search_IN_account.code"] =oldCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_account.code"];
          var templateUrl = '/company-info-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/company-info-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.accountList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
  }
  viewModel = u.extend({},baseData,events,common.rendertype,rendertype);

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
      $("#accountList-searchcontent")[0],
      [{
        type:"text",
        key:"code",
        label:"账号编码"
      },
      {
        type:"text",
        key:"name",
        label:"账号名称"
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
        type:"text",
        key:"accountAbbr",
        label:"账号简称"
      },
      {
          type:"refer",
          key:"accountType--id",
          label:"账号类型",
          refinfo:"custdocdef",
          refName:"账号类型",
          refCode:"QY034"
      },
     {
          type:"refer",
          key:"customer--id",
          label:"所属客户编码",
          refinfo:"customer"
      },
      {
          type:"refer",
          key:"customer--oneCategory--id",
          label:"客户一级分类",
          refinfo:"custdocdef",
          refName:"客户一级分类",
          refCode:"QY023"
      },
      {
          type:"refer",
          key:"customer--twoCategory--id",
          label:"客户二级分类",
          refinfo:"custdocdef",
          refName:"客户二级分类",
          refCode:"QY024"
      }
    ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){
  	
    //绑定输入框enter事件
    $('#accountList-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
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
    //tab切换校验
    setTimeout(function() {
			$('.u-tabs')[0]['u.Tabs'].on('tabchange', function(obj) {
        viewModel.currentTab=obj.index;
			});
			$('.u-tabs')[0]['u.Tabs'].on('beforeTabChange', function(obj) {
				  if(obj.index != 0){
					  	 var persistStatus =viewModel.accountList.getCurrentRow().status;
					  	 if(viewModel.flag ==0 || persistStatus =="upd"){
					  	 		toastr.warning("请先保存账号基本信息");
						      return false;
					  	 }
					  	 // if(obj.index !=1){
					  	 		 // var data=viewModel.accountMgOrgList.getSimpleData();
							  	 // if(data.length<1){
							  	 // 	  toastr.warning("请先填写账号组织基本信息");
								   //    return false;
							  	 // }
					  	 // }
					  }
					 //判断有无修改
	          switch(viewModel.currentTab){
	          	case 1:
	         	      viewModel.currentList=viewModel.accountMgOrgList;
	         	      viewModel.currentTip="账号所属组织";
	         	      break;
	         	  case 2:
	         	      viewModel.currentList=viewModel.ContactList;
	         	      viewModel.currentTip="账号联系人";
	         	      break;
	         	  case 3:
	         	      viewModel.currentList=viewModel.channelCusStoreList;
	         	      viewModel.currentTip="账号送达方";
	         	      break;
	         	  default:
	         	      viewModel.currentList=viewModel.companyInfoList;
	         	      viewModel.currentTip="公司信息";
	          }
		        var postdata = viewModel.currentList.getSimpleData();
		        var changeData = [];
		        if(postdata&&postdata.length>0){
		          for(var i = 0;i< postdata.length;i++){
		            if(postdata[i].persistStatus!="nrm"){
		              changeData.push(postdata[i]);
		            }
		          }
		          if(changeData.length>0){
			  	         viewModel.currentFlag=0;
		          }
		        }
				  if(viewModel.currentFlag==0){
				  	 toastr.warning("请先保存"+ viewModel.currentTip +"信息");
					   return false;
				  }
				 return true
			});
		},100);
    //枚举
    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY021"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        viewModel.registTypeSrc(newarray);
      }
    });
    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY022"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","id");
        viewModel.credentialsTypeSrc(newarray);
      }
    });
    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      data:{
        cust_doc_code:"QY040"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","code");
        viewModel.accountAllocationGroupNameSource(newarray);
      }
    });
    
    //根据客户地址带出国别、客户名称
    viewModel.accountList.on("customerId.valuechange",function(obj){
    	  var countryName=app.getComp("countryName");
    	  var customerName=app.getComp("customerName");
        var oneCategoryName=app.getComp("oneCategoryName");
        var twoCategoryName=app.getComp("twoCategoryName");
    		var refer = $("#refContainercustomerId").data("uui.refer");
        var refValues = refer.values;
    	  if(refValues){
		        if(refValues[0].countryName !=null){
		           countryName.setValue(refValues[0].countryName);
		        }
		        if(refValues[0].refname !=null){
		           customerName.setValue(refValues[0].refname);
		        }
            if(refValues[0].refname !=null){
               oneCategoryName.setValue(refValues[0].oneCategoryName);
            }
            if(refValues[0].refname !=null){
               twoCategoryName.setValue(refValues[0].twoCategoryName);
            }
		    }
    });
    
    
    //根据客户地址带出详细地址
    viewModel.accountList.on("customerAddressId.valuechange",function(obj){
	    	  var addressDetail=app.getComp("countryName");
	    	  var refer=$("#refContainercustomerAddressId").data("uui.refer");
	    	  var referValues=refer.values;
	    	  if(referValues){
	    	     	if(referValues[0].addressDetail !=null){
			           $("#addressDetail").val(referValues[0].addressDetail);
			    	  }	
	    	  }
    });

    //根据办事处为客户经理传递id
    viewModel.accountMgOrgList.on("officeOrganizationId.valuechange",function(obj){
    		if(obj.oldValue !=undefined &&obj.oldValue != obj.newValue){
		    	  var refer=$("#refContainerofficeOrganizationId").data("uui.refer");
		    	  var referValues=refer.values;
		    	  if(referValues[0].id !=null){
		           obj.rowObj.parent.meta.personId.refparam='{"EQ_organization.id":' + '"' +referValues[0].id +'"'
		           + ',"EQ_isEnable"'+':' + '"1"' +'}';
		    	  }
	    	}
    });
    viewModel.accountList.on("customerId.valuechange", function(obj) {
     //判断编辑时该字段数据无变化
     if(obj.oldValue !=undefined &&obj.oldValue != obj.newValue){
         var customerAddressId =app.getComp("customerAddressId");
         viewModel.accountList.setValue("customerAddressId","");
         viewModel.accountList.setValue("customerAddressCode","");
         viewModel.accountList.setValue("customerAddressName","");
         if(obj.oldValue != obj.newValue){
          customerAddressId.setEnable(true);
         }
         else{
          customerAddressId.setEnable(false);
         }
      }
      var refer=$("#refContainercustomerId").data("uui.refer");
        
        var customerValue ={"EQ_customer.id":obj.newValue}; 
         $("#customerAddressId").attr("data-refparam",JSON.stringify(customerValue));
   });
    viewModel.accountMgOrgList.on("organizationId.valuechange", function(obj) {
      
      var refer=$("#refContainerorganizationId").data("uui.refer");
      var isOffice =  refer.values[0].isOffice
      var isValue ={"EQ_isOffice":"1","EQ_isSaleOrganization":"0"};
      var isOfficeCode={"EQ_code":refer.values[0].refcode,"EQ_isOffice":"1"};
      if (isOffice==1) {
        obj.rowObj.parent.meta.officeOrganizationId.refparam=JSON.stringify(isOfficeCode);
      } else{
        obj.rowObj.parent.meta.officeOrganizationId.refparam=JSON.stringify(isValue);
      }
       // $("#officeOrganizationId").attr("data-refparam",JSON.stringify(isValue));
   });

  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.ran = viewModel;
}

  return {
    init: init
  }
});
