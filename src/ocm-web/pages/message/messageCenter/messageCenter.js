define(['text!./messageCenter.html', 'ocm_common', 'searchbox' ,'ajaxfileupload','ossupload','interfaceFileImpl','editcard', './meta.js', 'ocm_global', "ocm-citypicker"], function (tpl, common, searchbox, editcard) {
	'use strict'
	var app, baseData, events, rendertype, viewModel, singledocSearch, singledoceidt, messageCreationDialog,detailDialog,fileDialog;
	baseData = {
		baseurl: '/iuap_qy/internalmsg/msgs/pagination',
		addurl:'/iuap_qy/internalmsg/create',
		enclosureurl:'/iuap_qy/internalmsg/fastdfs/attaches/upload',
		detailurl:'/iuap_qy/internalmsg/msgs',
		downurl:'/iuap_qy/internalmsg/fastdfs/',
		deleteurl:'/iuap_qy/internalmsg/delete/batch/',
		deleteAttachesUrl:'/iuap_qy/internalmsg/fastdfs/attaches/delete/batch',
		MessageList: new u.DataTable(MessageListMeta),
		MessageUserCreation: new u.DataTable(MessageUserCreationMeta),
		MessageContentCreation: new u.DataTable(MessageContentCreationMeta),
		AuthorizedUserRef: new u.DataTable(AuthorizedUserRef),
        FileList: new u.DataTable(FileMeta),
		direction:ko.observable('receive'),
		detailFlag:ko.observable(0),
		picdata:[],   //附件上传前数组
		usersArr:[],  //用户数组
		attachesArr:[],  //详情带出附件
		attachesAddArr:[],  //上传附件数组
		downloadText:ko.observable(),
		replyAttacheName:"",
		forwardAttacheName:"",
		replyuserArr:[],
		//消息状态
		readStatusSrc: [{
				value: "0",
				name: "未读"
			},
			{
				value: "1",
				name: "已读"
			},
			
		],
		sendStatusSrc: [{
				value: "0",
				name: "否"
			},
			{
				value: "1",
				name: "是"
			},
		],
	};
	rendertype = {
		operation: function (obj) {
			var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
			var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
			obj.element.innerHTML = '<div class="ui-handle-icon">' +
				'<span class="ui-handle ui-tab-icon-b">' +
				'<a href="#" class="uifont icon-edit font-c-c" ' +
				editfun +
				' title="编辑"></a>' +
				'</span>    ' +
				'<span class="ui-handle ui-tab-icon-b">' +
				'<a href="#" class="uifont icon-shanchu1 font-c-c" ' +
				delfun +
				' title="删除"></a>' +
				'</span></div>';
			ko.cleanNode(obj.element);
			ko.applyBindings(viewModel, obj.element);
		},
		//跳转详情页
		detailRender: function(obj) {
			var viewModel = obj.gridObj.viewModel;
			var dataTableRowId = obj.row.value['$_#_@_id'];
			var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
			obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
			ko.cleanNode(obj.element);
			ko.applyBindings(viewModel, obj.element);
		},
	};
	events = {
		//弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
		beforeEdit: function (index) {
			var title;
			viewModel.index = index;
			if (index >= 0) {
				//修改操作
				title = "编辑";
			} else {
				title = "新增"
				//清空编辑框的信息
				messageCreationDialog = u.dialog({ id: 'dialog_content_newMessageFun', content: "#dialog_content_newMessageFun", "width": "80%" });
				viewModel.MessageContentCreation.clear();
				viewModel.MessageUserCreation.clear();
				viewModel.msgId="";
				viewModel.MessageContentCreation.createEmptyRow();
				$(".attacheAdd").html("");
				var okButton = $("#dialog_content_newMessageFun .u-msg-ok");
			    var closeButton= $("#dialog_content_newMessageFun").parent().find(".u-msg-close");
				okButton.unbind("click").click(function () {
					var data={};
					data.msg={};
					data.users=viewModel.MessageUserCreation.getSimpleData();
					if(data.users.length<1){
						toastr.warning("请选择接收人");
						return false;
					}
					else{
						  for(var i=0;i<data.users.length;i++){
							delete data.users[i].persistStatus;
						  }
					}
  	                var infoBase=$("#infoBase")[0];
		            var basePass =viewModel.validate(infoBase);
//					 if(basePass.passed){
//						data.msg.subject=$("#subject").val();
						data.msg.subject=viewModel.MessageContentCreation.getValue("subject0");
						data.msg.content=viewModel.MessageContentCreation.getValue("content");
//						data.msg.attaches=viewModel.picdata;
						data.msg.attaches=viewModel.attachesAddArr;
						if(viewModel.msgId !=""){
						   data.msg.id=viewModel.msgId;
						}
						viewModel.send(data);
						messageCreationDialog.close();
//					 }
				});
				var cancelButton = $("#dialog_content_newMessageFun .u-msg-cancel");
				cancelButton.unbind("click").click(function () {
					if(viewModel.picdata.length>0){
						var data=viewModel.picdata;
					    viewModel.deleteAttaches(data);
					}
					messageCreationDialog.close();
				    viewModel.picdata=[];	//上传前的附件置空
				    viewModel.attachesAddArr=[];	//上传后的附件置空
				    viewModel.attachesArr=[];//详情带出的附件置空
				});
				closeButton.unbind("click").click(function () {
					if(viewModel.picdata.length>0){
						var data=viewModel.picdata;
					    viewModel.deleteAttaches(data);
					   	viewModel.picdata=[];	//上传前的附件置空
				        viewModel.attachesAddArr=[];	//上传后的附件置空
				        viewModel.attachesArr=[];//详情带出的附件置空
					}
				});
				
			}
		},
		//新建信息
		messageCreationHandler: function (index) {
			if (index >= 0) {//移除
                  var rows = viewModel.MessageUserCreation.getSelectedRows();
                  viewModel.MessageUserCreation.removeRows(rows);
			} else {//新增
				viewModel.clearAuthUserRef();
				$("#AuthorizedUserRefer .refer").trigger("click");
			}
		},
		// 清除参照之前的选择
		clearAuthUserRef: function () {
			viewModel.AuthorizedUserRef.setValue("AuthorizedUserRefer", "");
			var refer = $("#refContainerAuthorizedUserRefer").data("uui.refer");
			refer.uncheckAll();
			refer.setValue([]);
		},
		send:function(data){
			//更改后台数据
			$._ajax({
				url: viewModel.addurl,
				type: "post",
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
				success: function (data) {
                  viewModel.search();
				  viewModel.subjectforward="";
				  viewModel.picdata=[];	//上传前的附件置空
				  viewModel.attachesAddArr=[];	//上传后的附件置空
				  viewModel.attachesArr=[];//详情带出的附件置空
				}
			})
		},
		deleteAttaches:function(data){
			//更改后台数据
			$._ajax({
				url: viewModel.deleteAttachesUrl,
				type: "post",
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
				success: function (data) {
                  viewModel.search();
				  viewModel.subjectforward="";
				}
			})
		},
		//将操作后的数据进行保存
		edit: function () {
			var result = singledoceidt.validate();
			if (result.passed) {
				var index = viewModel.index;
				var currentRow, type = "post";
				var postdata = singledoceidt.geteidtData();
				if (index >= 0) {
					type = "put";
				}
				//更改后台数据
				$._ajax({
					url: appCtx + viewModel.baseurl,
					type: type,
					data: JSON.stringify(postdata),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						//如果index大于等于0说明是修改
						singledoceidt.close();
						if (index >= 0) {
							//获取需要修改的行
							currentRow = viewModel.MessageList.getRow(index);
							//将用户填写的数据更新到CustDocDefList上
						} else {
							//添加数据
							currentRow = viewModel.MessageList.createEmptyRow();
						}
						currentRow.setSimpleData(data);
					}
				})
			}
		},
		//删除和批量删除
		del: function (data) {
			if (typeof (data) == 'number') {
				viewModel.MessageList.setRowSelect(data);
			}
			var ids = [];
			var rows = viewModel.MessageList.getSelectedRows();
			if (rows && rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
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
						url: viewModel.deleteurl + viewModel.directionFlag,
						contentType: "application/json; charset=utf-8",
						type: "post",
//						data: {
//							ids: ids.join(",")
//						},
                        data:JSON.stringify(ids),
						success: function (data) {
							viewModel.MessageList.removeRows(rows);
						}
					});

				}
			});
		},
		//详情
		detail:function(index,rowId){
			viewModel.detailFlag(0);
			viewModel.MessageList.setRowSelectbyRowId(rowId);
            var selectedRow = viewModel.MessageList.getSelectedRows();
			var id = viewModel.MessageList.getRowByRowId(rowId).getValue('id');
			var readStatus = viewModel.MessageList.getRowByRowId(rowId).getValue('readStatus');
			var detaildata=[];
			detaildata.id=id;
			detaildata.direction=viewModel.directionFlag;
			//判断是否已读
			if(readStatus==0 && viewModel.directionFlag=='receive'){
				$._ajax({
					type: "get",
					url:  viewModel.detailurl + '/' + id + '/readed',
//					data: {id: id},
					contentType: "application/json; charset=utf-8",
					success: function(data) {
				      viewModel.read(id);
				      selectedRow[0].setValue("readStatus", "1")
					}
				})
			}
			else{
				viewModel.read(id);
			}
			detailDialog = u.dialog({
			id: 'detailDialog',
			content: "#dialog_content_detailMessageFun",
			"width": " "
		});
			$(".attacheAdd").html("");
			var replyButton = $("#dialog_content_detailMessageFun .u-msg-reply");
			var forwardButton = $("#dialog_content_detailMessageFun .u-msg-forward");
			var okButton = $("#dialog_content_detailMessageFun .u-msg-ok");
			var cancelButton = $("#dialog_content_detailMessageFun .u-msg-cancel");
			var cancelDetailButton = $("#dialog_content_detailMessageFun .u-msg-cancel-detail");
			var closeButton= $("#dialog_content_detailMessageFun").parent().siblings(".u-msg-close");
			replyButton.unbind("click").click(function () {
				 viewModel.detailFlag(1);
				 var userArr=[];
				 if(viewModel.directionFlag=='receive'){
                   userArr= viewModel.replyuserArr.sender;
				 }
				 else{
                   userArr= viewModel.replyuserArr.receivers.concat(viewModel.replyuserArr.sender);
				 }
                 viewModel.MessageUserCreation.setSimpleData(userArr);
				 $("#subjectDetail").val(viewModel.subjectDetail);
			})
			forwardButton.unbind("click").click(function () {
				 viewModel.detailFlag(2);
				 viewModel.MessageUserCreation.clear();
				 $("#subjectDetail").val(viewModel.subjectforward);
				 if(viewModel.attachesArr.length>0){
					 var showValue='';
					 viewModel.attachesAddArr=viewModel.attachesArr;
		            for(var i=0;i<viewModel.attachesArr.length;i++){
		                showValue+='<div class="attaches-box">' + viewModel.attachesArr[i].name  + '<a class="attacheDel" style="cursor:pointer;">' + '<span style="margin:0 5px">删除</span>' + '</a>' + '<span class="separation-line">|</span></div>';
		            }
					$(".attacheAdd").html(showValue);
		            if(viewModel.attachesAddArr.length!=0){
	//					 if(viewModel.detailFlag() ==1 || viewModel.detailFlag() ==2){
		            	 var attacheDelButton = $("#dialog_content_detailMessageFun .attacheDel");
	//	                  }
						 attacheDelButton.unbind("click").click(function () {
	//							var index = $("#dialog_content_newMessageFun .attacheDel").index(this);
	//							if(viewModel.detailFlag() ==1 || viewModel.detailFlag() ==2){
	//	            		       index = $("#dialog_content_detailMessageFun .attacheDel").index(this);
	//	                        }
		            		    index = $("#dialog_content_detailMessageFun .attacheDel").index(this);
								var attacheDelArr=[];
								attacheDelArr.push(viewModel.attachesArr[index]);//需删除附件添加到attacheDelArr
//								viewModel.deleteAttaches(attacheDelArr);  //从数据库删除附件
								viewModel.attachesArr.remove(index); 
								viewModel.attachesAddArr.remove(index); 
//								viewModel.picdata.remove(index); 
								$(this).parent().remove();
		
		                   });
		            }
				 }
			})
			okButton.unbind("click").click(function () {
				var data={} ;
				data.msg={};
				data.users=viewModel.MessageUserCreation.getSimpleData();
				if(data.users.length<1){
					toastr.warning("请选择接收人");
					return false;
				}
				else{
					  for(var i=0;i<data.users.length;i++){
						delete data.users[i].persistStatus;
					  }
				}
                var infoBase=$("#infoBase")[0];
	            var basePass =viewModel.validate(infoBase);
				data.msg.subject=$("#subjectDetail").val();
				data.msg.content=viewModel.MessageContentCreation.getValue("content");
				data.msg.attaches=viewModel.attachesAddArr;
				if(viewModel.detailFlag() ==1){
				    data.msg.id=viewModel.replymsgId;
				}
				//转发
				if(viewModel.detailFlag() ==2){
				    data.msg.id=viewModel.forwardmsgId;
				    data.msg.attaches=viewModel.attachesArr.concat(viewModel.picdata);
				    if(data.msg.id==undefined && data.msg.attaches.length>0){
			            $._ajax({
					          url:viewModel.enclosureurl,
					          type:"post",
					          data:JSON.stringify(data.msg.attaches),
					          contentType : "application/json; charset=utf-8",
					          dataType:"json",
					          complete:function(){
					            u.hideLoader();
					          },
					          success:function(attachdata){
								data.msg.id=attachdata.data.msgId;
								viewModel.send(data);
				                detailDialog.close();
					          }
					    })
					}
				    else{
				    	viewModel.send(data);
				        detailDialog.close();
				    }
				}
				else{
					viewModel.send(data);
				    detailDialog.close();
				}
				viewModel.picdata=[];	//上传前的附件置空
				viewModel.attachesAddArr=[];	//上传后的附件置空
		        viewModel.attachesArr=[];//详情带出的附件置空
		        
			});
			cancelButton.unbind("click").click(function () {
				if(viewModel.picdata.length>0){
					var data=viewModel.picdata;
				    viewModel.deleteAttaches(data);
				}
				viewModel.picdata=[];	//上传前的附件置空
				viewModel.attachesAddArr=[];	//上传后的附件置空
		        viewModel.attachesArr=[];//详情带出的附件置空
				detailDialog.close();
			});
			closeButton.unbind("click").click(function () {
				if(viewModel.picdata.length>0){
					var data=viewModel.picdata;
				    viewModel.deleteAttaches(data);
				}
				viewModel.picdata=[];	//上传前的附件置空
				viewModel.attachesAddArr=[];	//上传后的附件置空
		        viewModel.attachesArr=[];//详情带出的附件置空
//				detailDialog.close();
			});
			cancelDetailButton.unbind("click").click(function () {
				if(viewModel.picdata.length>0){
					var data=viewModel.picdata;
				    viewModel.deleteAttaches(data);
				}
                 viewModel.picdata=[];	//上传前的附件置空
				 viewModel.attachesAddArr=[];	//上传后的附件置空
				 viewModel.detailFlag(0);
				 viewModel.read(viewModel.id);
			});
		},
		read:function(id){
			viewModel.id=id;
			$._ajax({
				type: "get",
				url:  viewModel.detailurl + '/' + id + '/' + viewModel.directionFlag,
//				data: JSON.stringify(detaildata),
				contentType: "application/json; charset=utf-8",
				success: function(data) {
                    $("#attacheNameDown").html("");
					viewModel.msgId=data.data.msg.id;
					viewModel.replyuserArr=data.data.info;
					//下载文字链接拼接
		            if(data.data.msg.attaches !=undefined){
		            	viewModel.attachesArr.length=0;
		            	//详情带出附件
                        Array.prototype.push.apply(viewModel.attachesArr,data.data.msg.attaches);
                        var showValue="";
						for (var i = 0; i < data.data.msg.attaches.length; i++) {
							showValue += "<a class='download' download='"+ data.data.msg.attaches[i].name.split(".")[0]+"' href='"+ data.data.msg.attaches[i].link+"' style='cursor: pointer; color: #333;margin-right:5px'>" + data.data.msg.attaches[i].name + "</a>";
						}
					}
					$("#attacheNameDown").html(showValue);
					//下载事件绑定
					var downButton = $("#dialog_content_detailMessageFun .download");
					downButton.unbind("click").click(function () {
						// var index = $("#dialog_content_detailMessageFun .download").index(this);
						// var msgid = viewModel.msgId;
						// var attachid = data.data.msg.attaches[index].id;
						// $("#dialog_content_detailMessageFun .download").get(index).href =
						// 	viewModel.downurl + msgid + '/attaches/dowload/' + attachid;

					});
					viewModel.usersArr=data.data.users;
                    viewModel.MessageUserCreation.setSimpleData(viewModel.usersArr);
                    viewModel.MessageContentCreation.setSimpleData(data.data.msg);
                    var attacheName=app.getComp("attacheName");
                    viewModel.subjectDetail="答复："+ data.data.msg.subject;
                    viewModel.subjectforward="转发："+ data.data.msg.subject;

				}
			})
		},
		//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
		search: function (reindex) {
			if (reindex) {
				viewModel.MessageList.pageIndex(0);
			}
			viewModel.MessageList.removeAllRows();
			var queryData = singledocSearch.getDataWithOpr();
			viewModel.directionFlag=queryData["search_EQ_direction"];
			var fixedQueryData = {
				"direction":queryData["search_EQ_direction"],
				"category": queryData["search_EQ_category"],
				"status": queryData["search_EQ_status"],
				"range": queryData["search_EQ_range"]
			}
			fixedQueryData.pageSize = viewModel.MessageList.pageSize();
			fixedQueryData.pageIndex = viewModel.MessageList.pageIndex();
			$._ajax({
				type: "post",
				url: viewModel.baseurl,
				contentType: "application/json;charset=utf-8",
				dataType: "json",
				data: JSON.stringify(fixedQueryData),
				success: function (data) {
					viewModel.MessageList.setSimpleData(data.data.content, {
						unSelect: true
					});
					viewModel.MessageList.totalRow(data.data.totalElements);
					viewModel.MessageList.totalPages(data.data.totalPages);
				}
			})
		},
		//清空搜索条件
		cleanSearch: function () {
			singledocSearch.clearSearch();
			$(".receiveShow").show();
			$(".receive-box").show();
			$(".send-box").hide();
		},
		//页码改变时的回调函数
		pageChange: function (index) {
			viewModel.MessageList.pageIndex(index);
			viewModel.search();
		},
		//页码改变时的回调函数
		sizeChange: function (size) {
			viewModel.MessageList.pageSize(size);
			viewModel.search();
		},
		validate:function (element){
		    var result = app.compsValidateMultiParam({element:element,showMsg:true});
		    return result;
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
          var a=$("#file-dialog").parents(".u-msg-dialog-top").css("z-index");
          $("#file-dialog").parents(".u-msg-dialog-top").css("z-index",a+0);
//        viewModel.FileList.clear();
//        if(viewModel.attachesDel.length>0){
//        	  var enclosureArr=[];
//        	  for(var i=0;i< viewModel.attachesDel.length;i++){
//	          	 enclosureArr[i] = {};
//	          	 enclosureArr[i].id=viewModel.attachesDel[i].id;
//	          	 enclosureArr[i].filename=viewModel.attachesDel[i].name;
//	          	 enclosureArr[i].url=viewModel.attachesDel[i].link;
//	          	 enclosureArr[i].uploadtime=viewModel.attachesDel[i].cts;
//	          }
//        }
//        viewModel.FileList.setSimpleData(enclosureArr);
        }
      },
      onOpenUploadWin: function(){
      	  $("#uploadbatch_id").val(undefined);
          $("#uploadbatch_id").trigger("click");
      },

      //上传附件
      onFileUpload: function(){
      	var fileNum=$("#uploadbatch_id")[0].files.length;
      	var fileSize=0;
      	var fileSizeMb=0;
      	var fileTypeArr=[];
      	var attacheNow=viewModel.FileList.getSimpleData();
      	var attacheTotal=[];
      	for(var i=0;i<viewModel.attachesAddArr.length;i++){
      		attacheTotal.push(viewModel.attachesAddArr[i].name)
      	}
      	for(var i=0;i<attacheNow.length;i++){
      		attacheTotal.push(attacheNow[i].filename)
      	}
//    	var attacheTotal=attacheNow.concat(viewModel.picdata);
      	var attacheText=attacheTotal.join(",");
	    var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
      	var fileSizeSum = function (){
					for(var i=0;i<fileNum;i++){
	      			 	fileSize+=$("#uploadbatch_id")[0].files[i].size;
	      			 	var fileName=$("#uploadbatch_id")[0].files[i].name;
	      			 	var fileType=fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
	      			 	fileTypeArr.push(fileName);
	      		}
					  fileSizeMb=fileSize/1024/1024;
					  return fileSizeMb
        }();
        for(var i=0;i<fileTypeArr.length;i++){
    		    if(attacheText.indexOf(fileTypeArr[i])!=-1){
      			 		toastr.warning("不能上传同名的附件");
      			 		return false
      			}
        }
      	if(fileSizeSum <= 500){
      	  //获取表单
//	        var pk = viewModel.pk;
	        var pk = viewModel.pk;
	        var par = {
	             fileElementId: "uploadbatch_id",  //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
	             filepath: pk,   //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
	             groupname: pk,//【必填】分組名称,未来会提供树节点
	             permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
	             url: true,          //【选填】是否返回附件的连接地址，并且会存储到数据库
//	             thumbnail :  "30w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
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
         if(row==null || row.length==0 ){
           toastr.error("请选择一个附件");
           return
         }
         for(var i=0;i<row.length;i++){
           var url = row[i].getValue("url");
           parent.open(location.origin+url);
         }
       },
       //附件保存
       savePic:function(){
          var postdata = viewModel.FileList.getSimpleData();
          if(postdata.length==0){
          	toastr.warning("没有相关数据需要保存");
          	return false
          }
          var enclosureArr=[];
          for(var i=0;i< postdata.length;i++){
          	 enclosureArr[i] = {};
          	 enclosureArr[i].id=postdata[i].id;
          	 enclosureArr[i].name=postdata[i].filename;
          	 enclosureArr[i].link=postdata[i].url;
          }
          Array.prototype.push.apply(viewModel.picdata, enclosureArr);
          $._ajax({
		          url:viewModel.enclosureurl,
		          type:"post",
		          data:JSON.stringify(viewModel.picdata),
		          contentType : "application/json; charset=utf-8",
		          dataType:"json",
		          complete:function(){
		            u.hideLoader();
		          },
		          success:function(data){
			        if(viewModel.detailFlag() ==1){
					    viewModel.replymsgId=data.data.msgId;
					}
					if(viewModel.detailFlag() ==2){
					    viewModel.forwardmsgId=data.data.msgId;
					}
					else{
		               viewModel.msgId=data.data.msgId;
					}
		            var attacheName=app.getComp("attacheName");
		            var attachesSave=[];
		            var attacheAdd="";
		            //返回数据只取id,name,link做为发送传输数据
		            if(data.data.list.length>0){
		            	for(var i=0;i<data.data.list.length;i++){
		            		attachesSave[i]={};
		            		attachesSave[i].id=data.data.list[i].id;
		            		attachesSave[i].name=data.data.list[i].name;
		            		attachesSave[i].link=data.data.list[i].link;
		            	}
		            }
		            viewModel.attachesAddArr=attachesSave;
		            if(viewModel.detailFlag() ==2){
                        data.data.list=viewModel.attachesArr.concat(data.data.list);
                        viewModel.attachesAddArr=viewModel.attachesArr.concat(attachesSave);
				    }
		            for(var i=0;i<data.data.list.length;i++){
		                attacheAdd+='<div class="attaches-box">' + data.data.list[i].name  + '<a class="attacheDel" style="cursor:pointer;">' + '<span style="margin:0 5px">删除</span>' + '</a>' + '<span class="separation-line">|</span></div>';
		            }
		            $(".attacheAdd").html(attacheAdd);
                   //删除附件
            	   var attacheDelButton = $("#dialog_content_newMessageFun .attacheDel");
                   if(viewModel.detailFlag() ==1){
            		  attacheDelButton = $("#dialog_content_detailMessageFun .attacheDel");
                   }
					attacheDelButton.unbind("click").click(function () {
						var index = $("#dialog_content_newMessageFun .attacheDel").index(this);
						if(viewModel.detailFlag() ==1){
            		       index = $("#dialog_content_detailMessageFun .attacheDel").index(this);
                        }
						var attacheDelArr=[];
						attacheDelArr.push(viewModel.attachesAddArr[index]);//需删除附件添加到attacheDelArr
						viewModel.deleteAttaches(attacheDelArr);  //从数据库删除附件
						viewModel.attachesAddArr.remove(index); 
						viewModel.picdata.remove(index); 
						$(this).parent().remove();

                    });
		            fileDialog.hide();
		          }
		        })
       }
       //--------------------------------图片上传-------------------------------------------------
	}
	viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

	function appInit(element, params) {
		//将模板页渲染到页面上
		element.innerHTML = tpl;
		//将viewModel和页面上的元素绑定并初始化u-meta声明的组件
		app = u.createApp({
			el: element,
			model: viewModel
		});
		// 查询组件初始化
		singledocSearch = new searchbox(
			$("#MessageCenter-searchcontent")[0], [
				{
					type: "radio",
					key: "direction",
					label: "消息方向",
					defaultvalue: 'receive',
					dataSource: [{
						value: 'receive',
						name: '接收'
					}, {
						value: 'send',
						name: '发送'
					}]
				},
				{
					type: "radio",
					key: "category",
					label: "消息分类",
					defaultvalue: 'all',
					dataSource: [{
						value: 'all',
						name: '全部'
					},
					{
						value: 'notice',
						name: '通知'
					}, {
						value: 'earlywarning',
						name: '预警'
					}, {
						value: 'task',
						name: '任务'
					}],
					cls:"receiveShow"
				},
				{
					type: "radio",
					key: "status",
					label: "消息状态",
					defaultvalue: 'all',
					dataSource: [{
						value: 'all',
						name: '全部'
					}, {
						value: 'read',
						name: '已读'
					}, {
						value: 'unread',
						name: '未读'
					}],
					cls:"receiveShow"
				},
				{
					type: "radio",
					key: "range",
					label: "日期范围",
					defaultvalue: 'all',
					dataSource: [{
						value: 'all',
						name: '全部'
					}, {
						value: 'three',
						name: '最近三天'
					}, {
						value: 'week',
						name: '最近一周'
					}, {
						value: 'month',
						name: '最近一月'
					}]
				}
			]);
		// 列表查询数据(无查询条件)

//		viewModel.search();
//		var productRow = viewModel.MessageUserCreation.createEmptyRow();
//		viewModel.MessageUserCreation.setRowFocus(productRow);
	}

	function afterRender() {
		//绑定输入框enter事件
		$('#CustDocDef-searchcontent input').off("keydown").on("keydown", function (e) {
			if (e.keyCode == 13) {
				$(this).blur();
				viewModel.search();
			}
		});
	viewModel.MessageContentCreation.createEmptyRow();
    //新增选择用户
	viewModel.AuthorizedUserRef.createEmptyRow();
   //选择用户
   viewModel.AuthorizedUserRef.on("AuthorizedUserRefer.valuechange", function(obj) {
	     if(!obj.newValue) {
	        return;
	     }
   	     var messageUser=[];
    	 viewModel.pictureCategory=obj.newValue;
    	 if(obj.newValue !=obj.oldValue){
    	 	var refValues = $("#refContainerAuthorizedUserRefer").data("uui.refer").values;
	    	if(refValues.length){
	    	 	for(var i=0;i<refValues.length;i++){
	    	 		var newrow;
			    	newrow = viewModel.MessageUserCreation.createEmptyRow({unSelect:true});
		            newrow.setValue("id",refValues[i].refpk);
		            newrow.setValue("code", refValues[i].refcode);
		            newrow.setValue("name", refValues[i].refname);
	    	 	}
	    	 }
    	 }


   });
   //方向监听
	singledocSearch.viewModel.params.on("direction.valuechange", function (obj){
		if (obj.newValue == "receive") {//接收
			$(".receiveShow").show();
			$(".receive-box").show();
			$(".send-box").hide();
		} else {//接收
			$(".receiveShow").hide();
			$(".receive-box").hide();
			$(".send-box").show();
		}
		viewModel.direction(obj.newValue);
	    viewModel.search();
	});
    //消息分类监控
    singledocSearch.viewModel.params.on("category.valuechange", function (obj){
	    viewModel.search();
	});
    //消息状态监控
    singledocSearch.viewModel.params.on("status.valuechange", function (obj){
	    viewModel.search();
	});
    //日期范围监控
    singledocSearch.viewModel.params.on("range.valuechange", function (obj){
	    viewModel.search();
	});
	$(".receive-box").show();
	$(".send-box").hide();
	viewModel.search();
	//切换模板
	function templetTabFun() {
		$("#dialog_content_template").delegate(".template-btn", "click", function () {
			$(this).addClass("active").parent().siblings().find(".template-btn").removeClass("active");
			var id = $(this).attr("pk_id");
			var currentRow = viewModel.templateData.getRowByField('id', id);
			viewModel.templateData.setRowFocus(currentRow);
			//更新组件
			u.compMgr.updateComp($("#dialog_content_template")[0]);
			viewModel.checkboxShow();
		});
	};
	templetTabFun();
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
	}

	return {
		init: init
	}
});
