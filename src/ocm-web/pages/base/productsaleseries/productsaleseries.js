define(['text!./productsaleseries.html','ocm_common','searchbox','editcard','./meta.js','ocm_global','ajaxfileupload','ossupload','interfaceFileImpl'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,exportDialog,importDialog,fileDialog,picBigDialog;
  baseData = {
    baseurl : '/product-sale-series',
    picurl : '/product-sale-series-pic',
    relationurl : '/product-sale-series-pic',
    ProductSaleSeriesList: new u.DataTable(ProductSaleSeriesmeta),
    ProductSaleSeriesPhotoList: new u.DataTable(ProductSaleSeriesPhotoinfometa),
    FileList: new u.DataTable(FileMeta),
     productSaleSeriesId:[],
     pictureCategory:"",
     //返回列表页
    retListPanel: common.bill.retListPanel,
    //跳转图片维护页
    goPicPanel:common.bill.goPicPanel,
    //返回
    goPicPanelbill:common.bill.goPicPanelbill,
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
    //列中上传图片
    picUploadList:function(obj){
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var uploadBtn="data-bind=click:picPage.bind($data," + obj.rowIndex + ","+dataTableRowId+"),visible:buttonShowGroup['pic']";
        obj.element.innerHTML = '<div class="ui-handle-icon">'+
        '<span class="ui-handle-word">'+
        '<a href="#"'+
        uploadBtn +
        ' title="上传图片">上传图片</a>'+
        '</span>'+
        '</div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
    //表格图片
    picShow:function(obj){
        var productPhotoUrl=viewModel.ProductSaleSeriesPhotoList.getRow(obj.rowIndex).getValue("productPhotoUrl");
         var prodUrl="";
        //特殊字符\  .  替换
        if(productPhotoUrl){
           prodUrl=productPhotoUrl.replace(/\./g,"spot").replace(/\//g,"linePath").replace(/\-/g,"lineThrough");
           obj.element.innerHTML = '<img width="30" height="30" src='+productPhotoUrl+ ' data-bind="click: picBig.bind($data,' + "'" + prodUrl + "'" + ')">';
        }
        // obj.element.innerHTML = '<img width="30" height="30" src='+productPhotoUrl+'>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
    },
  };
  events = {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var title;viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.ProductSaleSeriesList.getRowByRowId(rowId).getSimpleData();
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
            postdata.isAutoEncoded=0;
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
                currentRow = viewModel.ProductSaleSeriesList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到ProductSaleSeriesList上
              } else {
                //添加数据
                currentRow = viewModel.ProductSaleSeriesList.createEmptyRow();
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
          viewModel.ProductSaleSeriesList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.ProductSaleSeriesList.getSelectedRows();
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
                viewModel.ProductSaleSeriesList.removeRows(rows);
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
      //启用状态修改
      //启用
      enable: function() {
        var selectedRows = viewModel.ProductSaleSeriesList.getSelectedRows();
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
        var selectedRows = viewModel.ProductSaleSeriesList.getSelectedRows();
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
        var urlInfo = '/product-sale-series-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/product-sale-series-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportHandle: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          var templateUrl = '/product-sale-series-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/product-sale-series-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.ProductSaleSeriesList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },

    //进入图片维护页
    picPage:function(index,rowId){
      var currentData = viewModel.ProductSaleSeriesList.getRowByRowId(rowId).getSimpleData();
      viewModel.picRowId = currentData.id;
      //根据id查图片维护
      $.ajax({
          url:appCtx + viewModel.relationurl + '/findByProductSaleSeriesId',
          type:'get',
          data:{
            productSaleSeriesId:viewModel.picRowId
          },
          contentType: "application/json; charset=utf-8",
          success:function(data){
            viewModel.ProductSaleSeriesPhotoList.setSimpleData(data,{unSelect:true});
          }
        });
      viewModel.goPicPanel();
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
         if(row==null || row.length==0 ){
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
          var cId = viewModel.picRowId;
          var postdata = viewModel.FileList.getSimpleData();
          var picdata=new Array();
          var curRow = viewModel.ProductSaleSeriesList.getCurrentRow();
          var cId = curRow.getValue("id");
          if(postdata.length==0){
            toastr.warning("没有相关数据需要保存");
            return false
          }
          for(var i=0;i< postdata.length;i++){
             picdata[i] = {};
             picdata[i].code=postdata[i].filename;
             picdata[i].productPhotoUrl=postdata[i].url;
             picdata[i].pictureCategoryId=viewModel.pictureCategory;
             picdata[i].productSaleSeriesId=cId;
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
                  andArr[i].productPhotoUrl=data[i].productPhotoUrl;
//                  andArr[i].pictureCategoryName=viewModel.pictureCategoryName;
                  viewModel.productSaleSeriesId[i]=data[i].id;
                }
                toastr.success("保存成功");
                fileDialog.hide();
                viewModel.ProductSaleSeriesPhotoList.addSimpleData(andArr,"new",{"unSelect":true});
              }
            })
          
       },
       //删除图片
      delPic: function (data) {
        if (typeof(data) == 'number') {
          viewModel.ProductSaleSeriesPhotoList.setRowSelect(data);
        }
        var ids = [];
        var rows = viewModel.ProductSaleSeriesPhotoList.getSelectedRows();
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
          }
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
              $._ajax({
                url:appCtx + viewModel.picurl + "/delete",
                type:"post",
                // data: "ids=" + ids.join(","),
                data:{
                  ids:ids.join(",")
                },
                success:function(data){
                  viewModel.ProductSaleSeriesPhotoList.removeRows(rows);
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
    //    
      //子表 删除和批量删除
      delRow: function (dataTable) {
          var rows = viewModel[dataTable].getSelectedRows();
          viewModel[dataTable].removeRows(rows);
      },
       //--------------------------------图片上传-------------------------------------      
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.ProductSaleSeriesList.pageIndex(0);
        }
        viewModel.ProductSaleSeriesList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.ProductSaleSeriesList.pageSize();
        queryData.page = viewModel.ProductSaleSeriesList.pageIndex();
        $._ajax ({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.ProductSaleSeriesList.setSimpleData(data.content,{unSelect:true});
            viewModel.ProductSaleSeriesList.totalRow(data.totalElements);
            viewModel.ProductSaleSeriesList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.ProductSaleSeriesList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.ProductSaleSeriesList.pageSize(size);
        viewModel.search(true);
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
      $("#ProductSaleSeries-searchcontent")[0],
      [
        {
          type:"text",
          key:"code",
          label:"编码"
        },
        {
          type:"text",
          key:"name",
          label:"名称",
        },
        {
          type:"refer",
          key:"styleType--id",
          label:"类型",
          refinfo:"custdocdef",
          refCode:"QY015",
          refName:"产品系列"
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
          label:"编码",
          // enable:false,
          disableInEdit:true
        },
        {
          type:"text",
          key:"name",
          label:"名称"
        },
        {
          type:"refer",
          key:"styleTypeId",
          label:"类型",
         refinfo:"custdocdef",
         refCode:"QY015",
         refName:"产品系列"
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
      ],ProductSaleSeriesmeta);
    // 列表查询数据(无查询条件)

    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#ProductSaleSeries-searchcontent input').off("keydown").on("keydown",function(e){
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
    
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
  }

  return {
    init: init
  }
});
