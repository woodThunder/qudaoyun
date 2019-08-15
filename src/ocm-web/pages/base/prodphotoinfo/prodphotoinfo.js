define(['text!./prodphotoinfo.html','ocm_common','searchbox','editcard','./meta.js','ocm_global','ajaxfileupload','ossupload','interfaceFileImpl'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,fileDialog,picBigDialog;
  baseData = {
    baseurl : '/prod-photo-info',
    prodphotoinfoList: new u.DataTable(prodPhotoInfometa),
    ProdPhotoInfoParseList: new u.DataTable(ProdPhotoInfoParsemeta),
    FileList: new u.DataTable(FileMeta),
    ctxfilemng : '/iuap-saas-filesystem-service/',
    //跳转图片维护页
    goPicPanel:common.bill.goPicPanel,
    goPicPanelbill:common.bill.goPicPanelbill,
    pk:"",
    matschSource: [{value:"1",name:"匹配成功"},{value:"0",name:"未匹配成功"},{value:"",name:"未匹配成功"}],
  };
  rendertype = {
    operation:function(obj){
			var viewModel = obj.gridObj.viewModel;
			      var dataTableRowId = obj.row.value['$_#_@_id'];
			      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ","+dataTableRowId+"),visible:buttonShowGroup['del']";
			      obj.element.innerHTML = '<div class="ui-handle-icon">'+
			      '<span class="ui-handle-word">'+
			      '<a href="#" '+
			      delfun +
			      ' title="删除">删除</a>'+
			      '</span></div>';
			      ko.cleanNode(obj.element);
			      ko.applyBindings(viewModel, obj.element);
    },
    picShow:function(obj){
	      var picturePath=viewModel.ProdPhotoInfoParseList.getRow(obj.rowIndex).getValue("picturePath");
	      var prodUrl="";
	      if(picturePath){
	        //特殊字符\  .  替换
		      var prodUrl=picturePath.replace(/\./g,"spot").replace(/\//g,"linePath").replace(/\-/g,"lineThrough");
	        obj.element.innerHTML = '<img width="30" height="30" src='+picturePath+ ' data-bind="click: picBig.bind($data,' + "'" + prodUrl + "'" + ')">';
	       }
	  	  ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
    picShowList:function(obj){
	      var picturePath=viewModel.prodphotoinfoList.getRow(obj.rowIndex).getValue("picturePath");
	      var prodUrl="";
	      if(picturePath){
	        //特殊字符\  .  替换
		      var prodUrl=picturePath.replace(/\./g,"spot").replace(/\//g,"linePath").replace(/\-/g,"lineThrough");
	        obj.element.innerHTML = '<img width="30" height="30" src='+picturePath+ ' data-bind="click: picBig.bind($data,' + "'" + prodUrl + "'" + ')">';
	       }
	  	  ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
    matchSource:function(obj){
        // debugger
        if ( obj.value=="未匹配成功") {
          obj.element.innerHTML = '<div style = "color:red">' + obj.value + '</div>';
        }else{
          obj.element.innerHTML = '<div>' + obj.value + '</div>';
        }
      },

  };
  events = {



      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var title;viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.prodphotoinfoList.getRowByRowId(rowId).getSimpleData();
					viewModel.rowId = rowId;
          singledoceidt.seteidtData(currentData);
        }else {
          title = "新增"
          //清空编辑框的信息
          singledoceidt.cleareidt();
        }
        //显示模态框
        singledoceidt.show(title,"900px",viewModel.edit);
      },
      //将操作后的数据进行保存
      edit: function() {
        var result = singledoceidt.validate();
        if(result.passed){
          var index = viewModel.index;
          var currentRow,type = "post";
          var postdata = singledoceidt.geteidtData();
          if(index>=0){
            type = "put";
          }
          else{
            postdata.statusCode=1;
          }
          //更改后台数据
          $._ajax({
            url:appCtx + viewModel.baseurl,
            type:type,
            data:JSON.stringify(postdata),
            contentType : "application/json; charset=utf-8",
            success:function(data){
              //如果index大于等于0说明是修改
              singledoceidt.close();
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.prodphotoinfoList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到prodphotoinfoList上
              } else {
                //添加数据
                currentRow = viewModel.prodphotoinfoList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
              toastr.success("保存成功");
            }
          })
       }

      },
      //删除和批量删除
      del: function (data,rowId) {
        if (typeof(data) == 'number') {
          viewModel.prodphotoinfoList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.prodphotoinfoList.getSelectedRows();
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
	              // data: "ids=" + ids.join(","),
	              data:{
	                ids:ids.join(",")
	              },
	              success:function(data){
	                viewModel.prodphotoinfoList.removeRows(rows);
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
         //启用
      enable: function() {
        var selectedRows = viewModel.prodphotoinfoList.getSelectedRows();
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
        var selectedRows = viewModel.prodphotoinfoList.getSelectedRows();
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
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
      	if(viewModel.codeCount>499){
			      var params = singledocSearch.viewModel.params;
			      params.setValue("code", '');
      	    toastr.warning("编码最多输入500个，请重新输入");
      	    return false
  	    }
        if(reindex){
          viewModel.prodphotoinfoList.pageIndex(0);
        }
        viewModel.prodphotoinfoList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.prodphotoinfoList.pageSize();
        queryData.page = viewModel.prodphotoinfoList.pageIndex();
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
            viewModel.prodphotoinfoList.setSimpleData(data.content,{unSelect:true});
            viewModel.prodphotoinfoList.totalRow(data.totalElements);
            viewModel.prodphotoinfoList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.prodphotoinfoList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.prodphotoinfoList.pageSize(size);
        viewModel.search(true);
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
		  //图片添加返回列表页
      picBack:function(){
	  	  var postdata = viewModel.ProdPhotoInfoParseList.getSimpleData();
	      var changedata=[];
	      var tip="";
	      if(viewModel.backFlag==1){
			      viewModel.goPicPanelbill();
	      }
	      else{
	          for(var i=0;i< postdata.length;i++){
	          	if(postdata[i].persistStatus!="nrm"){
	               changedata.push(postdata[i]);
	          	}
	          }
	          if(changedata.length>0){
	          	function picArr(){
	        				for (i=0;i<changedata.length;i++){
		          			 	  tip+=changedata[i].code +"，";
		          		}
	        				return tip.substring(0,tip.length-1)
	        			}
	          	toastr.warning("图片" + picArr() +"没有保存");
	          	return false
	          }
	      }
      },
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
        $("#uploadbatch_id").val(undefined);
        $("#uploadbatch_id").trigger("click");
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
         if(row==null || row.length==0 ){
           toastr.error("请选择一个附件");
           return
         }
         for(var i=0;i<row.length;i++){
           var url = row[i].getValue("url");
           parent.open(location.origin+url);
         }
       },
       //上传后保存
       savePic:function(){
          var postdata = viewModel.FileList.getSimpleData();
          var picdata=new Array();
          for(var i=0;i< postdata.length;i++){
          	 picdata[i] = {};
          	 picdata[i].code=postdata[i].filename;
          	 picdata[i].picturePath=postdata[i].url;
          	 picdata[i].statusCode="1";
          	 picdata[i].persistStatus="new";
  	 			   if(postdata[i].isMappingProduct != "1"){
	          			picdata[i].isMappingProduct="否"
	          		}
	          		else{
	          			picdata[i].isMappingProduct="是"
	          		}
	          		if(postdata[i].isMappingCategory != "1"){
	          			picdata[i].isMappingCategory="否"
	          		}
	          		else{
	          			picdata[i].isMappingCategory="是"
	          	}
          }
          $._ajax({
		          url:appCtx + viewModel.baseurl+"/batch-parse",
		          type:"post",
		          data:JSON.stringify(picdata),
		          contentType : "application/json; charset=utf-8",
		          dataType:"json",
		          complete:function(){
		            u.hideLoader();
		          },
		          success:function(data){
		          	for(var i=0;i< data.length;i++){

		          	}
//		          	viewModel.ProdPhotoInfoParseList.setSimpleData(data,{"unSelect":true});
		            // toastr.success("查询成功");
		            fileDialog.hide();
		            viewModel.backFlag=0;
                for (var i = data.length - 1; i >= 0; i--) {
                  if (data[i].isMappingCategory!=1) {
                    data[i].isMappingCategory="未匹配成功";
                  }else{
                    data[i].isMappingCategory="匹配成功"
                  }
                  if (data[i].isMappingProduct!=1) {
                    data[i].isMappingProduct="未匹配成功"
                  }else{
                    data[i].isMappingProduct="匹配成功"
                  }

                }
		          	viewModel.ProdPhotoInfoParseList.addSimpleData(data,"new",{"unSelect":true});
		          }
		        })

       },
       //图片关系保存
       // saveParse:function(){
       //    var picdata=[];
       //    var nochangeData=[];
       //    var postdata = viewModel.ProdPhotoInfoParseList.getSimpleData();
       //    if(!postdata){
       //    		toastr.warning("没有相关数据需要保存！");
       //    		return false
       //    }
       //    else{
       //    			for(var i=0;i< postdata.length;i++){
		     //      		if(postdata[i].persistStatus!="nrm" && postdata[i].productInfoId!=null){
						 //          	 picdata[i] = {};
						 //          	 picdata[i].productInfoId=postdata[i].productInfoId;
						 //          	 picdata[i].prodPhotoInfoId=postdata[i].id;
						 //          	 picdata[i].statusCode="1";
						 //          	 picdata[i].isMainPhoto=0;
						 //          	 picdata[i].persistStatus="new";
		     //      		}
       //    				else{
       //    					nochangeData.push(postdata[i]);
       //    				}
       //          }
       //    }
       //    if(picdata.length>0){
       //    	$._ajax({
		     //      url:appCtx + viewModel.baseurl+"/batch-parseSave",
		     //      type:"post",
		     //      data:JSON.stringify(picdata),
		     //      contentType : "application/json; charset=utf-8",
		     //      dataType:"json",
		     //      complete:function(){
		     //        u.hideLoader();
		     //      },
		     //      success:function(data){
		     //      	viewModel.ProdPhotoInfoParseList.removeAllRows();
		     //        viewModel.ProdPhotoInfoParseList.addSimpleData(data,"nrm",{"unSelect":true});
		     //        viewModel.ProdPhotoInfoParseList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
		     //        toastr.success("保存成功");
		     //        viewModel.backFlag=1;
		     //      }
		     //    })
       //    }
       //    else{
       //    	toastr.success("保存成功");
       //    	viewModel.backFlag=1;
       //    }
       // },
       //图片关系保存
       saveParse:function(){
          var picdata=[];
          var nochangeData=[];
          var postdata = viewModel.ProdPhotoInfoParseList.getSimpleData();
          if(!postdata){
              toastr.warning("没有相关数据需要保存！");
              return false
          }
          else{
                for(var i=0;i< postdata.length;i++){
                  if(postdata[i].isMappingProduct=="匹配成功" && postdata[i].isMappingCategory=="匹配成功"){
                         picdata.push(postdata[i]);
                         picdata[i].statusCode="1";
                         picdata[i].isMainPhoto=0;
                         picdata[i].persistStatus="new";

                  }
                  else{
                    nochangeData.push(postdata[i]);
                  }
                }
          }
          if(picdata.length>0){
            for (var i = picdata.length - 1; i >= 0; i--) {
                  if (picdata[i].isMappingCategory=="匹配成功") {
                    picdata[i].isMappingCategory="1";
                  }
                  if (picdata[i].isMappingProduct=="匹配成功") {
                    picdata[i].isMappingProduct="1"
                  }

                }
            $._ajax({
              url:appCtx + viewModel.baseurl+"/batch-parseSave",
              type:"post",
              data:JSON.stringify(picdata),
              contentType : "application/json; charset=utf-8",
              dataType:"json",
              complete:function(){
                u.hideLoader();
              },
              success:function(data){
                viewModel.ProdPhotoInfoParseList.removeAllRows();
                // viewModel.ProdPhotoInfoParseList.addSimpleData(data,"nrm",{"unSelect":true});
                viewModel.ProdPhotoInfoParseList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
                toastr.success("保存成功");
                viewModel.backFlag=1;
              }
            })
          }
          else{
            // var selectedRows = viewModel.ProdPhotoInfoParseList.getSelectedRows();
            toastr.error("没有数据符合要求的数据，无法保存");
            viewModel.backFlag=0;
          }
       },

       addPic:function(){
       	viewModel.ProdPhotoInfoParseList.clear();
       	viewModel.goPicPanel();
       },
       //子表 删除和批量删除
      delChild: function (dataTable) {
          var rows = viewModel[dataTable].getSelectedRows();
          viewModel[dataTable].removeRows(rows);
          viewModel.backFlag=0;
      },
      cancel:function(){
       viewModel.ProdPhotoInfoParseList.removeAllRows();
       viewModel.ProdPhotoInfoParseList.setSimpleData(viewModel.contactdata,{"unSelect":true});
       viewModel.backFlag=1;
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
      $("#ColorDoc-searchcontent")[0],
      [
        {
          type:"text",
          key:"code",
          label:"图片编码"
        },
        {
          type:"text",
          key:"pictureCategoryName",
          label:"图片类型",
        },

       {
            type:"radio",
            key:"isEnable",
            label:"启用状态",
            defaultvalue:"1",
            dataSource:[
            {value:'',name:'全部'},
            {value:'1',name:'启用'},
            {value:'0',name:'停用'}
            ]
          }
      ]);

    singledoceidt = new editcard(
      $("#dialog_layer")[0],
      [
        {
          type:"text",
          key:"code",
          label:"产品颜色编码",
          disableInEdit:true
        },
        {
          type:"text",
          key:"name",
          label:"产品颜色名称"
        },
       {
          type:"label",
          key:"statusCode",
          label:"启用状态",
       },
       {
          type:"textarea",
          key:"description",
          label:"描述",
          cls:"ui-textarea-item"
      }

      ],prodPhotoInfometa);
    // 列表查询数据(无查询条件)

    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#ColorDoc-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });

    // 选择上传文件后，直接调用上传方法
    $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
      if(this.value) {
        viewModel.onFileUpload();
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
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
  }

  return {
    init: init
  }
});
