define(['text!./prodstyle.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,prodstyleId;
  baseData = {
    baseurl : '/prod-style',
    ProdStyleList: new u.DataTable(ProdStylemeta)
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
    }
  };
  events = {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var title;viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.ProdStyleList.getRowByRowId(rowId).getSimpleData();
					viewModel.rowId = rowId;
          singledoceidt.seteidtData(currentData);
          prodstyleId = viewModel.ProdStyleList.getRow(index).getValue('id');
          // viewModel.ProdStyleList.meta.parentId.refparam ='{"NOTEQ_id":"'+prodstyleId+'"}';
          $("#parentId").parent().attr("data-refparam",JSON.stringify({"NOTEQ_id":prodstyleId,"EQ_isEnable":"1"} ));
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
                currentRow = viewModel.ProdStyleList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到ProdStyleList上
              } else {
                //添加数据
                currentRow = viewModel.ProdStyleList.createEmptyRow();
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
          viewModel.ProdStyleList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.ProdStyleList.getSelectedRows();
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
                viewModel.ProdStyleList.removeRows(rows);
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
        var selectedRows = viewModel.ProdStyleList.getSelectedRows();
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
        var selectedRows = viewModel.ProdStyleList.getSelectedRows();
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
          viewModel.ProdStyleList.pageIndex(0);
        }
        viewModel.ProdStyleList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.ProdStyleList.pageSize();
        queryData.page = viewModel.ProdStyleList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.ProdStyleList.setSimpleData(data.content,{unSelect:true});
            viewModel.ProdStyleList.totalRow(data.totalElements);
            viewModel.ProdStyleList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.ProdStyleList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.ProdStyleList.pageSize(size);
        viewModel.search(true);
      },
      //导出
      exportHandle: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          var templateUrl = '/prod-style-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/prod-style-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.ProdStyleList; //需要导出表格的dataTable
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
      $("#ProdStyle-searchcontent")[0],
      [
        {
          type:"text",
          key:"code",
          label:"风格编码"
        },
        {
          type:"text",
          key:"name",
          label:"风格名称",
        },{
          type:"refer",
          key:"parent--id",
          // key:"parentId--id",
          label:"上级风格编码",
          refinfo:"prodStyle"
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
          label:"风格编码",
          disableInEdit:true,
          // enable:false  
        },
        {
          type:"text",
          key:"name",
          label:"风格名称"
        },
        {
          type:"refer",
          key:"parentId",
          referId:"parentId",
          label:"上级风格",
          refinfo:"prodStyle"
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

      ],ProdStylemeta);
    // 列表查询数据(无查询条件)

    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#ProdStyle-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
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
