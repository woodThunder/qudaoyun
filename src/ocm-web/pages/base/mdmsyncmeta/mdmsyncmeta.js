define(['text!./mdmsyncmeta.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,json,sourceData,syntaxHighlight;
  baseData = {
    baseurl : '/mdmsync-meta',
    MdmSyncMetaList: new u.DataTable(MdmSyncMeta),
    stateSrc: [{value:"3",name:"删除"},{value:"1",name:"新增"},{value:"2",name:"修改"}],
    newSourceData:ko.observable(),
     //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
  };
  rendertype = {
    //跳转详情页
    detailRender:function(obj) {
      var viewModel = obj.gridObj.viewModel;
      var detailfun = "data-bind=click:detail.bind($data)";
      obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
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
          var currentData = viewModel.MdmSyncMetaList.getRowByRowId(rowId).getSimpleData();
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
                currentRow = viewModel.MdmSyncMetaList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到MdmSyncMetaList上
              } else {
                //添加数据
                currentRow = viewModel.MdmSyncMetaList.createEmptyRow();
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
          viewModel.MdmSyncMetaList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.MdmSyncMetaList.getSelectedRows();
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
	                viewModel.MdmSyncMetaList.removeRows(rows);
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
        var selectedRows = viewModel.MdmSyncMetaList.getSelectedRows();
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
        var selectedRows = viewModel.MdmSyncMetaList.getSelectedRows();
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
      
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function(){
          var curRow = viewModel.MdmSyncMetaList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          viewModel.goDetailPanel();
        }, 0);
        
      },
      //查询子表数据
    findByParentid: function(id) {
      $._ajax({
        url:appCtx + viewModel.baseurl + "/getInformation",
        type: 'get',
        async: false,
        data: {id: id},
        success:function(data){
          sourceData = data.sourceData;
          //对json数据进行格式化
          json = JSON.stringify(sourceData, null, 2);
          // $('#result').html(syntaxHighlight(json));
          viewModel.newSourceData(syntaxHighlight(json));
          //viewModel.MdmSyncMetaList.setSimpleData(data);
        }
      })
    },

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.MdmSyncMetaList.pageIndex(0);
        }
        viewModel.MdmSyncMetaList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        if(queryData.hasOwnProperty("search_EQ_sourceTable")){
          queryData.search_EQ_sourceTable=viewModel.sourceTable;
        }
        queryData.size = viewModel.MdmSyncMetaList.pageSize();
        queryData.page = viewModel.MdmSyncMetaList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.MdmSyncMetaList.setSimpleData(data.content,{unSelect:true});
            viewModel.MdmSyncMetaList.totalRow(data.totalElements);
            viewModel.MdmSyncMetaList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.MdmSyncMetaList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.MdmSyncMetaList.pageSize(size);
        viewModel.search(true);
      },
     
  }
  viewModel = u.extend({},baseData,events,common.rendertype,rendertype);


  function syntaxHighlight(json) {
      if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function(match) {
          var cls = 'number';
          if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                  cls = 'key';
              } else {
                  cls = 'string';
              }
          } else if (/true|false/.test(match)) {
              cls = 'boolean';
          } else if (/null/.test(match)) {
              cls = 'null';
          }
          // return '<span class="' + cls + '">' + match + '</span>';
          return match
      });
    }; 


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
      $("#MdmSyncMeta-searchcontent")[0],
      [
        {
          type:"refer",
          key:"sourceTable",
          label:"数据类型",
          refinfo: "custdocdef",
          refCode: "QY072",
          refName: "数据类型",
          referId:"sourceTable",
          clientParam: {"EQ_isEnable":"1"},
        },
        {
          type:"text",
          key:"code",
          label:"编码",
        }
        ,
        {
          type:"text",
          key:"name",
          label:"名称",
        }
        ,
        {
          type:"text",
          key:"creator",
          label:"创建人",
        }
        ,
        {
          type:"text",
          key:"modifier",
          label:"修改人",
        }
        ,
        {
          type:"daterange",
          key:"createTime",
          label:"创建时间",
        }
        ,
        {
          type:"daterange",
          key:"updateTime",
          label:"修改时间",
        },

       {
            type:"radio",
            key:"isEnable",
            label:"操作类型",
            dataSource:[
            {value:'',name:'全部'},
            {value:'1',name:'新增'},
            {value:'2',name:'修改'},
            {value:'3',name:'删除'}
            ]
          }
      ]);
      
    singledoceidt = new editcard(
      $("#dialog_layer")[0],
      [
        
      ],MdmSyncMeta);
    // 列表查询数据(无查询条件)

    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#MdmSyncMeta-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    //业务类型传参照传code
    singledocSearch.viewModel.params.on("sourceTable.valuechange",function(obj){
        // if (!$("#refContainersourceTable").data("uui.refer").values) {
        //   return 
        // }
        if(obj.newValue!=obj.oldValue){
          var refer = $("#refContainersourceTable").data("uui.refer");
          var refValues = refer.values;
          viewModel.sourceTable=refValues[0].refcode;
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
