define(["text!./taskcenter.html","css!../../../vendor/zTree_v3/zTreeStyle/zTreeStyle","css!./taskcenter.css","../../../vendor/zTree_v3/jquery.ztree.all.js","../../../vendor/const/math.js"
        ,"../../../vendor/bootstrap/js/bootstrap.js"],
		function( template){
	var metaUndoDt={
			 meta : {
				'id': {type: 'string'},
				'name':{type: 'string'},
				'createTime':{type:'date'},
				'assignee':{type: 'string'},
				'processInstanceId':{type: 'string'},
				'processDefinitionName':{type: 'string'},
				'formKey':{type: 'string'},
				'processDefinitionId':{type: 'string'}
            }  
		 
	};//end metaDt
	
	var metaDoneDt={
			 meta : {
					'id': {type: 'string'},
					'name':{type: 'string'},
					'startTime':{type:'date'},
					'assignee':{type: 'string'},
					'processInstanceId':{type: 'string'},
					'processDefinitionName':{type: 'string'},
					'formKey':{type: 'string'},
					'endTime':{type:'date'},
					'processDefinitionId':{type: 'string'}
           }  
		 
	};//end metaDt
	//待办任务类型
	var metaStatusDt={
			 meta : {
                'vstatus' : {
                     
                 }
			 }
	};
	var _CONST={
		STATUS_ADD: 'add',
		STATUS_EDIT: 'edit'
	};
//	var draw=1;
	var viewModel={
		radiodata:[{value:'1',name:'待办'},{value:'2',name:'已办'},{value:'3',name:'办结'}],
		prefixurl :'../iuap_qy/process' ,
		draw :1 ,
		app:{},
		sysCodeUnique:'true', //定义 code是否唯一
		originalOrgCode:"", //打开编辑页面时候的 sysCode的值，如果对此值修改，需要判断此值是否已经存在了
		totlePage:0,
		pageSize:10,
		totleCount:0,
		formStatus: ko.observable(_CONST.STATUS_ADD),
		//待办实体
		entityUndoDt:new u.DataTable(metaUndoDt),
		entityTempDt:new u.DataTable(metaUndoDt),
		//已办，办结实体
		entityDoneDt:new u.DataTable(metaDoneDt),
		//任务类型
		entityStatusDt:new u.DataTable(metaStatusDt),
		//初始化viewmodel
		init:function( params , arguments ){//params表示标签div的id 如   tabs-user  ,页签的内容id   ;    arguments：浏览器传递的参数
			if(params==undefined || params=='' ||  params.length ==0){
				params = '#content' ;
			}
			$(params).html(template) ;
			viewModel.app=u.createApp({
				el: params ,
				model: viewModel
			});
			viewModel.entityStatusDt.createEmptyRow();
			var row =viewModel.entityStatusDt.getCurrentRow();
			row.setValue('vstatus',"1") ;
			
			//viewModel.loadData();
			//var element = getActiveTab().find('#pagination')[0] ;
			var element = $('#pagination')[0] ;
			viewModel.comps=new u.pagination({el:element,jumppage:true});
			//var element = $(params).find('#pagination')[0] ;
			//this.comps=new u.pagination({el:element,jumppage:true});
			viewModel.currentMD =$('#taskcenter-mdlayout')[0] ;
			//viewModel.currentMD = getActiveTab().find('#taskcenter-mdlayout')[0] ;
			//viewModel.md = getActiveTab().find('#taskcenter-mdlayout')[0]['u.MDLayout'];
			
			viewModel.pageChange();
			viewModel.sizeChange();
			$('#search-hide').bind('click',function(){
				$('#search-hide').toggle();
				if($('#search-hide').css('display') == 'block'){
					$('#search-hide').html('<');
					$("#task-detail").removeClass('.bpmd-detail-noSearch').addClass('.bpm-detail');
				}
				else{
					$('#search-hide').removeClass('no-search').addClass(".search");
					$("#task-detail").removeClass('.bpmd-detail').addClass('.bpm-detail-noSearch');
				}
			});
			
		},	
			

		//页签点击事件
		pageChange:function(){
			viewModel.comps.on('pageChange', function (pageIndex) {
				viewModel.draw = pageIndex + 1;				
				var row =viewModel.entityStatusDt.getCurrentRow();
				var vstatus=row.getValue('vstatus') ;
				
		         if(vstatus==1){		        	 
		        	 unDoneTaskList();    		
		         } else if(vstatus==2){		        	 
		        	 doneTaskList();
		         } else if(vstatus==3){    	 
		        	 finishTaskList();       	 
		         }
		         
				//viewModel.loadData() ;
			});
		},
//		goBack:function(){
//            window.history.go(-1);
//            return false;
//        },
		//分页条数变化事件
		sizeChange:function(){
			viewModel.comps.on('sizeChange', function (arg) {
				//数据库分页
				viewModel.pageSize=parseInt(arg );
				
				//viewModel.loadData() ;
				
				var row =viewModel.entityStatusDt.getCurrentRow();
				var vstatus=row.getValue('vstatus') ;
				
		         if(vstatus==1){		        	 
		        	 unDoneTaskList();    		
		         } else if(vstatus==2){		        	 
		        	 doneTaskList();
		         } else if(vstatus==3){    	 
		        	 finishTaskList();       	 
		         }
				
			});
		},
		//添加完成之后的事件
		afterAdd:function(element, index, data){
			if (element.nodeType === 1) {
				u.compMgr.updateComp(element);
			}
		},
		/**
	     * 时间：2016/11/09
	     * 修改人：DN
	     * 内容：搜索后要提示数据正在查询中，请稍后。
	     */
		//任务搜索
		bpmQuickSearch:function( ){		
			//任务类型：待办，已办，办结
			var vstatus=viewModel.entityStatusDt.getValue("vstatus");
			
	         if(vstatus==1){		        	 
	        	 unDoneTaskList();    		
	         } else if(vstatus==2){		        	 
	        	 doneTaskList();
	         } else if(vstatus==3){    	 
	        	 finishTaskList();       	 
	         }
	         
//			//单据号
//			var billno=$('#bpm_search_billno').val();
//			//流程分类
//			var processDefinitionName=$('#bpm_search_processDefinitionName').val();
//			
//			var queryData={
//					'vstatus':vstatus,
//					'billno':billno,
//					'processDefinitionName':processDefinitionName
//			};
//			
//			var jsonpar={
//					draw:viewModel.draw,
//					length:viewModel.pageSize,
//					order:{},
//					search:queryData,
//					searchconfirm:{}
//				};
//			
//			$.ajax({
//				type:'post',
//				url : 'process/getSearchList',
//				data:JSON.stringify(jsonpar),
//				dataType:"json",
//				contentType: 'application/json;charset=utf-8', //必需
//				beforeSend: function () {
//					u.showLoading();
//				},
//				success:function(res){
//					if(vstatus=='1'){
//		    			viewModel.entityUndoDt.removeAllRows();
//		    			viewModel.entityUndoDt.clear();
//						viewModel.entityUndoDt.setSimpleData(res.data);
//						viewModel.entityUndoDt.setRowSelect(-1);
//						viewModel.entityUndoDt.setRowUnFocus() ;
//					}
//					if(vstatus=='2'||vstatus=='3'){
//		    			viewModel.entityDoneDt.removeAllRows();
//		    			viewModel.entityDoneDt.clear();
//						viewModel.entityDoneDt.setSimpleData(res.data);
//						viewModel.entityDoneDt.setRowSelect(-1);
//						viewModel.entityDoneDt.setRowUnFocus() ;
//					}
//				},
//				complete: function () {
//					u.hideLoading();
//				},
//			});
			 
		},
		//打开单据 
		openBill:function(){
			//记录单选按钮状态
			var vstate=viewModel.entityStatusDt.getValue("vstatus");
			var taskId="";
			var processInstanceId ="";
			var processDefinitionId="";
			var pmodel={};//上级model
			if(vstate=='1'){
				if (viewModel.entityUndoDt.getSelectedIndexs().length < 1) {
					message(" 请选择要审批的任务","warn");
					return;
				}
				if (viewModel.entityUndoDt.getSelectedIndexs().length > 1) {
					message(" 请选择一条要审批的任务","warn");
					return;
				}
				taskId = viewModel.entityUndoDt.getValue("id");
				processInstanceId = viewModel.entityUndoDt.getValue('processInstanceId');
				processDefinitionId = viewModel.entityUndoDt.getValue('processDefinitionId');
				pmodel=viewModel.entityUndoDt;	
			}else if(vstate=='2'){
				if (viewModel.entityDoneDt.getSelectedIndexs().length < 1) {
					message(" 请选择已办的任务!","warn");
					
					/*u.messageDialog({
						msg: "请选择已办的任务!",
						title: "提示",
						btnText: "OK"
					});*/
					return;
			    }
				if (viewModel.entityDoneDt.getSelectedIndexs().length > 1) {
					message("请选择一条已办的任务","warn");
					return;
				}
				taskId = viewModel.entityDoneDt.getValue("id");
				processInstanceId = viewModel.entityDoneDt.getValue('processInstanceId');
				processDefinitionId = viewModel.entityDoneDt.getValue('processDefinitionId');
				pmodel=viewModel.entityDoneDt;
				
		}else if(vstate=='3'){
			if (viewModel.entityDoneDt.getSelectedIndexs().length < 1) {
				message("请选择办结的任务","warn");
				return;
		    }
			if (viewModel.entityDoneDt.getSelectedIndexs().length > 1) {
				message("请选择一条办结的任务","warn");
				return;
			}
			taskId = viewModel.entityDoneDt.getValue("id");
			processInstanceId = viewModel.entityDoneDt.getValue('processInstanceId');
			processDefinitionId = viewModel.entityDoneDt.getValue('processDefinitionId');
			pmodel=viewModel.entityDoneDt;
		}
			
			var billId = '';
			$.ajax({
				type:'post',
				url : viewModel.prefixurl+'/getProcessInstance',
				data:JSON.stringify({'processInstanceId':processInstanceId}),
				dataType:"json",
				contentType: 'application/json;charset=utf-8', //必需
				success:function(res){
					billId = res.businessKey ;
					//$('#bpmDisplayBill').modal('show') ;
					$('#bpmDisplayBill').modal({backdrop: 'static', keyboard: false}) ;//
					 var args ={
								'taskId':taskId,
								'processInstanceId':processInstanceId,
								'processDefinitionId':processDefinitionId,
								'id':billId,
								'vstate':vstate,
								'pmodel':pmodel,
								'vtype':'bpm',
								'appCtx':"/"+res.formUrl.split('/')[1]
								};		
					  //var module = "pages/growers/growersexam/growersexam" ;
					       //单据中心（督办任务）
					       var module = res.formUrl ;//+"pages/growers/tblmeeting/tblmeeting";//
					       requirejs.undef(module);
					       var moduleid = "billBody" ;   //弹出层id
					       var content = document.getElementById(moduleid);
					       require([module], function(module) {
					           ko.cleanNode(content);
					             content.innerHTML = "";
					             //content.innerHTML =module.template;
					            // viewModel.userViewModel = module.model ;
					             // module.init('#' + moduleid,args);
							   		module.init(content,args);
					             /**
					              * 时间：2016/11/02
					              * 修改人：DN
					              * 内容：打开考察核实表单据，左边可能是快速搜索栏，显示全部空白，如不需要显示，请去掉，否则显示出搜索条件信息。
					              */
					            // getActiveTab().find("#bpmDisplayBill #test").css("display","none");
					             $("#bpmDisplayBill #test").css("display","none");
					          // $('#role_selectDisObject #list button').hide() ;//隐藏不需要的按钮 
					           //$('#role_selectDisObject .u-mdlayout-detail').css({'margin-left':'200px'})  ;//未知原因影响，导致左侧查询栏被覆盖，用此来手动显示
					           
					       }) ;
					}
				});
			
			
		}
		,
		//审批
		approve:function( ){
			
			if (viewModel.entityUndoDt.getSelectedIndexs().length < 1) {
				u.messageDialog({
					msg: "请选择要审批的任务!",
					title: "提示",
					btnText: "OK"
				});
				return;
			}
			 $('#tree-modal').modal('show');	
		},
		//批量审批
		approveSubmit:function(){
			 var selectArray = viewModel.entityUndoDt.selectedIndices();
             if (selectArray.length < 1) {
                 u.messageDialog({
                     msg: "请选择要审批的任务!",
                     title: "提示",
                     btnText: "OK"
                 });
                 return;
             }
            var comment = $('#dialog_approve_text').val();
            if(!comment){
            	 message("意见不能为空","error");
            	 return;
            }
			var taskList = viewModel.entityUndoDt.getSimpleData({type: 'select'}); 
			var approvetype = $('#tree-modal  input[name="approvetype"]:checked ').val(); 
			var jsonpar={
					'taskList':taskList,
					'comment':comment,
					'approvetype':approvetype};
			
			$.ajax({
				type:'post',
				url : "../iuap_qy/"+'task/completetask/approveSubmit',
				data:JSON.stringify(jsonpar),
				dataType:"json",
				contentType: 'application/json;charset=utf-8', //必需
				success:function(res){
					if(res){
						if( res.flag =='success'){
							 $('#tree-modal').modal('toggle');
							 message(res.msg);
							 unDoneTaskList();  
							 $('#dialog_approve_text').val("");
						}else{
							u.messageDialog({msg:res.msg,title:'请求错误',btnText:'确定'});
							 $('#tree-modal').modal('toggle');
						}
					}else{
						u.messageDialog({msg:'后台返回数据格式有误',title:'数据错误',btnText:'确定'});
					}
				},
				error:function(er){
					u.messageDialog({msg:er,title:'请求错误',btnText:'确定'});
				}
			});
		},
		
		//任务数据初始化, 查询列表
		loadData:function(){
			var billno=$('#bpm_search_billno').val();
			var processDefinitionName=$('#bpm_search_processDefinitionName').val();
			//$("#griddonetask").hide();
			//任务状态添加一个空行
			viewModel.entityUndoDt.removeAllRows();
			viewModel.entityUndoDt.clear();
			
			//viewModel.entityStatusDt.createEmptyRow();
			//var row =viewModel.entityStatusDt.getCurrentRow();
			//row.setValue('vstatus',"1") ;
			
			var queryData = {};
	         $(".form-search").find(".input_search").each(function(){
	             queryData[$(this).attr('name')] = this.value;
	         });
	         
				queryData['processDefinitionName']=processDefinitionName;
				queryData['billno']=billno;
	         
			var jsonpar={
				draw:viewModel.draw,
				length:viewModel.pageSize,
				order:{},
				search:queryData,
				searchconfirm:{}
			};
			$.ajax({
				type:'post',
				url : viewModel.prefixurl+'/undoTasklist',
				data:JSON.stringify(jsonpar),
				dataType:"json",
				contentType: 'application/json;charset=utf-8', //必需
				success:function(res){
					if(res){
						if( res.statusCode =='200'){
							if(res.data){
								viewModel.totleCount=res.recordsTotal;
								viewModel.totlePage=parseInt(Math.ceil(res.recordsTotal/viewModel.pageSize));
								viewModel.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
								viewModel.entityUndoDt.setSimpleData(res.data);
								viewModel.entityUndoDt.setAllRowsUnSelect();
							}else{
								u.showMessage({position:'center',msg:'无数据'}) ;
							}
						}else{
							u.messageDialog({msg:res.message,title:'请求错误',btnText:'确定'});
						}
					}else{
						u.messageDialog({msg:'后台返回数据格式有误',title:'数据错误',btnText:'确定'});
					}
				},
				error:function(er){
					u.messageDialog({msg:er,title:'请求错误',btnText:'确定'});
				}
			});
		}
		 
		
	};//end viewModel
	
	unDoneTaskList=function(){
        var billno=$('#bpm_search_billno').val();
        var processDefinitionName=$('#bpm_search_processDefinitionName').val();
		
		$("#griddonetask").parent().hide();
		$("#gridundotask").parent().show();
		//viewModel.loadData;

		//$("#griddonetask").hide();
		//任务状态添加一个空行
		viewModel.entityUndoDt.removeAllRows();
		viewModel.entityUndoDt.clear();
		
		//viewModel.entityStatusDt.createEmptyRow();
		//var row =viewModel.entityStatusDt.getCurrentRow();
		//row.setValue('vstatus',"1") ;
		
		var queryData = {};
         $(".form-search").find(".input_search").each(function(){
             queryData[$(this).attr('name')] = this.value;
         });
         
 		queryData['processDefinitionName']=processDefinitionName;
		queryData['billno']=billno;
         
		var jsonpar={
			draw:viewModel.draw,
			length:viewModel.pageSize,
			order:{},
			search:queryData,
			searchconfirm:{}
		};
		$.ajax({
			type:'post',
			url : viewModel.prefixurl+'/undoTasklist',
			data:JSON.stringify(jsonpar),
			dataType:"json",
			contentType: 'application/json;charset=utf-8', //必需
			beforeSend: function () {
				u.showLoading();
			},
			success:function(res){
				if(res){
					if( res.statusCode =='200'){
						if(res.data){
							viewModel.totleCount=res.recordsTotal;
							viewModel.totlePage=parseInt(Math.ceil(res.recordsTotal/viewModel.pageSize));
							viewModel.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
							viewModel.entityUndoDt.setSimpleData(res.data);
							viewModel.entityUndoDt.setAllRowsUnSelect();
						}else{
							u.showMessage({position:'center',msg:'无数据'}) ;
						}
					}else{
						u.messageDialog({msg:res.message,title:'请求错误',btnText:'确定'});
					}
				}else{
					u.messageDialog({msg:'后台返回数据格式有误',title:'数据错误',btnText:'确定'});
				}
			},
			complete: function () {
				u.hideLoading();
			},
			error:function(er){
				u.messageDialog({msg:er,title:'请求错误',btnText:'确定'});
			}
		});
	};
	
	doneTaskList=function(){
        var billno=$('#bpm_search_billno').val();
        var processDefinitionName=$('#bpm_search_processDefinitionName').val();
			viewModel.entityDoneDt.removeAllRows();
		viewModel.entityDoneDt.clear();
   		$("#griddonetask").parent().show();
   		$("#gridundotask").parent().hide();
   	 var queryData = {};
	         $(".form-search").find(".input_search").each(function(){
	             queryData[$(this).attr('name')] = this.value;
	         });
	         
	 		queryData['processDefinitionName']=processDefinitionName;
			queryData['billno']=billno;
	         
			var jsonpar={
				draw:viewModel.draw,
				length:viewModel.pageSize,
				order:{},
				search:queryData,
				searchconfirm:{}
			};
			$.ajax({
				type:'post',
				url : viewModel.prefixurl+'/doneTasklist',
				data:JSON.stringify(jsonpar),
				dataType:"json",
				contentType: 'application/json;charset=utf-8', //必需
				beforeSend: function () {
				u.showLoading();
			},
				success:function(res){
					if(res){
						if( res.statusCode =='200'){
							if(res.data){
								viewModel.totleCount=res.recordsTotal;
								viewModel.totlePage=parseInt(Math.ceil(res.recordsTotal/viewModel.pageSize));
								viewModel.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
								viewModel.entityDoneDt.setSimpleData(res.data);
								//viewModel.entityDoneDt.setRowSelect(-1);
								viewModel.entityDoneDt.setAllRowsUnSelect() ;
							}else{
								u.showMessage({position:'center',msg:'无数据'}) ;
							}
						}else{
							u.messageDialog({msg:res.message,title:'请求错误',btnText:'确定'});
						}
					}else{
						u.messageDialog({msg:'后台返回数据格式有误',title:'数据错误',btnText:'确定'});
					}
				},
				complete: function () {
				u.hideLoading();
			},
				error:function(er){
					u.messageDialog({msg:er,title:'请求错误',btnText:'确定'});
				}
			});
	};
	
	finishTaskList=function(){
		  var billno=$('#bpm_search_billno').val();
          var processDefinitionName=$('#bpm_search_processDefinitionName').val();
			viewModel.entityDoneDt.removeAllRows();
			viewModel.entityDoneDt.clear();
     	 $("#griddonetask").parent().show();
  		$("#gridundotask").parent().hide();
  	    var queryData = {};
	         $(".form-search").find(".input_search").each(function(){
	             queryData[$(this).attr('name')] = this.value;
	         });
	         
	   	 		queryData['processDefinitionName']=processDefinitionName;
				queryData['billno']=billno;
 	         
 			var jsonpar={
 				draw:viewModel.draw,
 				length:viewModel.pageSize,
 				order:{},
 				search:queryData,
 				searchconfirm:{}
 			};
			$.ajax({
				type:'post',
				url : viewModel.prefixurl+'/finishTasklist',
				data:JSON.stringify(jsonpar),
				dataType:"json",
				contentType: 'application/json;charset=utf-8', //必需
				beforeSend: function () {
					u.showLoading();
				},
				success:function(res){
					if(res){
						if( res.statusCode =='200'){
							if(res.data){
								viewModel.totleCount=res.recordsTotal;
								viewModel.totlePage=parseInt(Math.ceil(res.recordsTotal/viewModel.pageSize));
								viewModel.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
								viewModel.entityDoneDt.setSimpleData(res.data);
							//	viewModel.entityDoneDt.setRowSelect(-1);
								viewModel.entityDoneDt.setAllRowsUnSelect() ;
							}else{
								u.showMessage({position:'center',msg:'无数据'}) ;
							}
						}else{
							u.messageDialog({msg:res.message,title:'请求错误',btnText:'确定'});
						}
					}else{
						u.messageDialog({msg:'后台返回数据格式有误',title:'数据错误',btnText:'确定'});
					}
				},
				complete: function () {
					u.hideLoading();
				},
				error:function(er){
					u.messageDialog({msg:er,title:'请求错误',btnText:'确定'});
				}
			});
	};
	
	
	/**
     * 时间：2016/11/03
     * 修改人：DN
     * 内容：任务中心下的待办、已办、办结之切换时页面没有刷新。
     */
	/**
     * 时间：2016/11/09
     * 修改人：DN
     * 内容：搜索后要提示数据正在查询中，请稍后。
     */
	//监听单选按钮选项
	viewModel.entityStatusDt.on("vstatus.valueChange", function(event){
        var vstatus = event.newValue;

         if(vstatus==1){
        	 viewModel.draw=1;
        	 $("#approveBtn").show();
        	 unDoneTaskList();    		
         } else if(vstatus==2){
        	 viewModel.draw=1;
        	 $("#approveBtn").hide();
        	 doneTaskList();

         } else if(vstatus==3){
        	 viewModel.draw=1;      	 
        	 $("#approveBtn").hide();
        	 finishTaskList();       	 
         }
        	         
    });
	
	return {
		'model': viewModel,
		'template': template,
		'init': viewModel.init
	};
	
});//end define
