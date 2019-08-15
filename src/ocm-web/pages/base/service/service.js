define(['text!./service.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt;
  baseData = {
    baseurl : '/product-info',
    serviceList: new u.DataTable(finishedProductSuite),
    whetherSaleProduct:0,
    whetherProductSuite:0,
    whetherProductPack:0
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
    typeGrid:function(obj){
    	var row=obj.row.value;
    	var whetherSaleProduct=row.whetherSaleProduct;
    	var whetherProductSuite=row.whetherProductSuite;
    	var whetherProductPack=row.whetherProductPack;
	  	var stateName="";
	  	if(whetherSaleProduct ==1){
	  		stateName="销售产品";
	  	}
	  	if(whetherProductSuite ==1){
	  		stateName="套件产品";
	  	}
	  	if(whetherProductPack ==1){
	  		stateName="包件产品";
	  	}
	  	
	  	obj.element.innerHTML = stateName;
    }
  };
  events = {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var title;viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.serviceList.getRowByRowId(rowId).getSimpleData();
					viewModel.rowId = rowId;
          var whetherSaleProduct=currentData["whetherSaleProduct"];
          var whetherProductSuite=currentData["whetherProductSuite"];
          var whetherProductPack=currentData["whetherProductPack"];
		      if(whetherSaleProduct ==1){
			  		currentData["productType"]=0;
			  	}
			  	if(whetherProductSuite ==1){
			  		currentData["productType"]=1;
			  	}
			  	if(whetherProductPack ==1){
			  		currentData["productType"]=2;
			  	}
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
          postdata.whetherSaleProduct=viewModel.whetherSaleProduct;
          postdata.whetherProductPack=viewModel.whetherProductPack;
          postdata.whetherProductSuite=viewModel.whetherProductSuite;
          if(postdata.productType==0){
          	postdata.whetherSaleProduct=1;
          }
          if(index>=0){
            type = "put";
          }
          else{
            postdata.statusCode=1;
				    postdata.proNature="4";
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
                currentRow = viewModel.serviceList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到ColorDocList上
              } else {
                //添加数据
                currentRow = viewModel.serviceList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
              currentRow.setValue("productType",new Date().getTime());
              toastr.success("保存成功");
            }
          })
       }

      },
      //删除和批量删除
      del: function (data,rowId) {
        if (typeof(data) == 'number') {
          viewModel.serviceList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var status=[];
        var statustip="";
        var rows = viewModel.serviceList.getSelectedRows();
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
	                viewModel.serviceList.removeRows(rows);
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
        var selectedRows = viewModel.serviceList.getSelectedRows();
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
        var selectedRows = viewModel.serviceList.getSelectedRows();
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
        if(reindex){
          viewModel.serviceList.pageIndex(0);
        }
        viewModel.serviceList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.serviceList.pageSize();
        queryData.page = viewModel.serviceList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl+ "/service",
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.serviceList.setSimpleData(data.content,{unSelect:true});
            viewModel.serviceList.totalRow(data.totalElements);
            viewModel.serviceList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.serviceList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.serviceList.pageSize(size);
        viewModel.search(true);
      }
  }
  viewModel = u.extend({},baseData,events,common.rendertype,rendertype);

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
      $("#ColorDoc-searchcontent")[0],
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
        type:"text",
        key:"proAbbreviation",
        label:"简称"
      },
	   
        {
          type: "daterange",
          label: "修改日期",
          key: "modifiedTime",
          
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
      ]);
     
    singledoceidt = new editcard(
      $("#dialog_layer")[0],
      [
        {
          type:"text",
          key:"code",
          label:"产品编码",
          disableInEdit:true
        },
        {
          type:"text",
          key:"proAbbreviation",
          label:"简称"
        },
       {
          type:"label",
          key:"statusCode",
          label:"启用状态",
       },
       
       {
          type:"combo",
          key:"productType",
          label:"产品类型",
          dataSource:[{value:'0',name:'销售产品'},{value:'1',name:'套件产品'},{value:'2',name:'包件产品'}]
        },
       {
          type:"textarea",
          key:"description",
          label:"产品描述",
          cls:"ui-textarea-item"
      }

      ],finishedProductSuite);
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
    
    //监听销售产品、套件、包件
     singledoceidt.viewModel.params.on("productType.valuechange", function(obj) {
//   	var meta=singledoceidt.viewModel.params["productType"];
      if(obj.newValue==0){
//    	singledoceidt.viewModel.params.meta["whetherSaleProduct"]=u.extend({},meta);
//      singledoceidt.seteidtValue("whetherSaleProduct",1)
        viewModel.whetherSaleProduct=1;
        viewModel.whetherProductSuite=0;
        viewModel.whetherProductPack=0;
        
     }
      if(obj.newValue==1){
        viewModel.whetherProductSuite=1;
        viewModel.whetherSaleProduct=0;
        viewModel.whetherProductPack=0;
      
     }
      if(obj.newValue==2){
       viewModel.whetherProductPack=1;
       viewModel.whetherProductSuite=0;
       viewModel.whetherSaleProduct=0;
      
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
