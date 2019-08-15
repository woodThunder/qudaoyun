define(['text!./prodinfoandphoto.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,picBigDialog;
  baseData = {
    baseurl : '/prod-info-photo-info',
    picArr:[],
    prodinfoandphotoList: new u.DataTable(ColorDocmeta)
  };
  rendertype = {
    operation:function(obj){
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle ui-tab-icon-b">'+
      '<a href="#" class="uifont icon-edit font-c-c" '+
      editfun +
      ' title="编辑"></a>'+
      '</span>    '+
      '<span class="ui-handle ui-tab-icon-b">'+
      '<a href="#" class="uifont icon-shanchu1 font-c-c" '+
      delfun +
      ' title="删除"></a>'+
      '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    picShowList:function(obj){
	      var picturePath=viewModel.prodinfoandphotoList.getRow(obj.rowIndex).getValue("prodPhotoInfoUrl");
	      var prodUrl="";
	      if(picturePath){
	        //特殊字符\  .  替换
		      var prodUrl=picturePath.replace(/\./g,"spot").replace(/\//g,"linePath").replace(/\-/g,"lineThrough");
	        obj.element.innerHTML = '<img width="30" height="30" src='+picturePath+ ' data-bind="click: picBig.bind($data,' + "'" + prodUrl + "'" + ')">';
	       }
	  	  ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    }
  };
  events = {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var title;viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.prodinfoandphotoList.getRowByRowId(rowId).getSimpleData();
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
                currentRow = viewModel.prodinfoandphotoList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到prodinfoandphotoList上
              } else {
                //添加数据
                currentRow = viewModel.prodinfoandphotoList.createEmptyRow();
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
          viewModel.prodinfoandphotoList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var status=[];
        var statustip="";
        var rows = viewModel.prodinfoandphotoList.getSelectedRows();
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
            var statusCode=rows[i].getValue("statusCode");
          	if(statusCode==1 || statusCode=="1"){
          		status.push(rows[i].getValue("productInfoCode"));
          	}
          }
        //   if(status.length >0){
	    			// function statusArr(){
	    			// 	for (i=0;i<status.length;i++){
	       //    			 	  statustip+=status[i] +"，";
	       //    		}
	    			// 	return statustip.substring(0,statustip.length-1)
	    			// }
	       //    		toastr.warning("数据   " + statusArr() +" 已启用不可删除");
	       //    		return false
	      	// }
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
	                viewModel.prodinfoandphotoList.removeRows(rows);
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
      spaceCount:function(str){
          var word = " "; // 要计算的字符
          var regex = new RegExp(word, 'g'); // 使用g表示整个字符串都要匹配
          var result = str.match(regex);
          return !result ? 0 : result.length;
      },
      //上一张下一张
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
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
         if(viewModel.productInfoCodeCount>499){
           var params = singledocSearch.viewModel.params;
           params.setValue("productInfo--code", '');
           toastr.warning("产品编码最多输入500个，请重新输入");
           return false
        }
        if(viewModel.prodPhotoInfoCodeCount>499){
           var params = singledocSearch.viewModel.params;
           params.setValue("prodPhotoInfo--code", '');
           toastr.warning("产品图片编码最多输入500个，请重新输入");
           return false
         }
        if(reindex){
          viewModel.prodinfoandphotoList.pageIndex(0);
        }
        viewModel.prodinfoandphotoList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.prodinfoandphotoList.pageSize();
        queryData.page = viewModel.prodinfoandphotoList.pageIndex();
        var oldproductInfoCode = queryData["search_LIKE_productInfo.code"];
        if(oldproductInfoCode){
          queryData["search_IN_productInfo.code"] =oldproductInfoCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_productInfo.code"];
        var oldprodPhotoInfoCode = queryData["search_LIKE_prodPhotoInfo.code"];
        if(oldprodPhotoInfoCode){
          queryData["search_IN_prodPhotoInfo.code"] =oldprodPhotoInfoCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_prodPhotoInfo.code"];
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){

            viewModel.prodinfoandphotoList.setSimpleData(data.content,{unSelect:true});
            viewModel.prodinfoandphotoList.totalRow(data.totalElements);
            viewModel.prodinfoandphotoList.totalPages(data.totalPages);
            if(data.content.length>0){
               for(var i=0;i<data.content.length;i++){
                 viewModel.picArr.push(data.content[i].prodPhotoInfoUrl);
               }
            }
          }
        })
      },
       //导入
      importHandle: function() {
        var urlInfo = '/prod-info-photo-info-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/prod-info-photo-info-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportHandle: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          var oldproductInfoCode = searchParams["search_LIKE_productInfo.code"];
          if(oldproductInfoCode){
            searchParams["search_IN_productInfo.code"] =oldproductInfoCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_productInfo.code"];
          var oldprodPhotoInfoCode = searchParams["search_LIKE_prodPhotoInfo.code"];
          if(oldprodPhotoInfoCode){
            searchParams["search_IN_prodPhotoInfo.code"] =oldprodPhotoInfoCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_prodPhotoInfo.code"];
          var templateUrl = '/prod-info-photo-info-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/prod-info-photo-info-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.prodinfoandphotoList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.prodinfoandphotoList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.prodinfoandphotoList.pageSize(size);
        viewModel.search(true);
      },
      isMainPhotoGrid:function(obj){
      	var stateValue = viewModel.prodinfoandphotoList.getRow(obj.rowIndex).getValue('isMainPhoto');
		  	var stateName;
		  	stateValue ==1?stateName="是": stateName="否";
		  	obj.element.innerHTML = stateName;
      }
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
      $("#prodinfoandphoto-searchcontent")[0],
      [
        {
          type:"text",
          key:"productInfo--code",
          label:"产品编码",
        },
        {
          type:"text",
          key:"prodPhotoInfo--code",
          label:"产品图片编码",
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
          type:"refer",
          key:"productInfoId",
          label:"产品编码",
          refinfo:"productInfo",
          isReturnCode:true
        },
        {
          type:"refer",
          key:"prodPhotoInfoId",
          label:"产品图片编码",
          refinfo:"prodPhoto",
          isReturnCode:true
        },
       {
          type:"text",
          key:"prodPhotoInfoUrl",
          label:"产品图片URL",
      },
      {
          type:"radio",
          key:"isMainPhoto",
          label:"是否主图",
          dataSource:[{value:'1',name:'是'},{value:'0',name:'否'}]
      },
      {
          type:"label",
          key:"statusCode",
          label:"启用状态",
       }
      ],ColorDocmeta);
    // 列表查询数据(无查询条件)

    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#prodinfoandphoto-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    
    //根据产品图片带出产品url
    singledoceidt.viewModel.params.on("prodPhotoInfoId.valuechange",function(obj){
    		if(obj.oldValue!=undefined && obj.newValue != obj.oldValue){
		    	var refvalues=$("#refcontainerprodPhotoInfoId").data("uui.refer");
		    	var params =singledoceidt.viewModel.params;
		    	if(refvalues){
		    		  params.setValues("prodPhotoInfoUrl",refvalues.prodPhotoInfoUrl)
		    	}
		    }
    });
    //查询编码
     singledocSearch.viewModel.params.on("productInfo--code.valuechange", function(obj) {
          viewModel.productInfoCodeCount=viewModel.spaceCount(obj.newValue);
     });
    singledocSearch.viewModel.params.on("prodPhotoInfo--code.valuechange", function(obj) {
          viewModel.prodPhotoInfoCodeCount=viewModel.spaceCount(obj.newValue);
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
