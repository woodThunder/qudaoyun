define(['text!./chaninveunit.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt;
  baseData = {
    baseurl : '/chan-inve-unit',
    ChanInveUnitList: new u.DataTable(ChanInveUnitmeta),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    enableFmt: ko.pureComputed(function() {
      var status = viewModel.ChanInveUnitList.ref("status")();
      return status == 1 ? "启用" : "停用";
    }),
    unitStateFmt: ko.pureComputed(function() {
      var unitStateFmt = viewModel.ChanInveUnitList.ref("unitState")();
      return unitStateFmt == 1 ? "启用" : "停用";
    })
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
          var currentData = viewModel.ChanInveUnitList.getRowByRowId(rowId).getSimpleData();
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
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function(){
          var curRow = viewModel.ChanInveUnitList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        // $._ajax({
        //   url:appCtx + viewModel.baseurl + "/findByDepartmentId",
        //   type: 'get',
        //   async: false,
        //   data: {id: id},
        //   success:function(data){
        //     viewModel.ChanInveUnitList.setSimpleData(data);
        //   }
        // })
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
            postdata.status=1;
            postdata.isAutoEncoded=1;
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
                currentRow = viewModel.ChanInveUnitList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到ChanInveUnitList上
              } else {
                //添加数据
                currentRow = viewModel.ChanInveUnitList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
              toastr.success("保存成功");
            }
          })
       }

      },
      //导入
      importHandle: function() {
        var urlInfo = '/channel-inveUnit-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/channel-inveUnit-excel/excelLoadingStatus'; //请求进度地址参数
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
          var templateUrl = '/channel-inveUnit-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/channel-inveUnit-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.ChanInveUnitList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //删除和批量删除
      del: function (data,rowId) {
        if (typeof(data) == 'number') {
          viewModel.ChanInveUnitList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.ChanInveUnitList.getSelectedRows();
        var status=[];
        var statustip="";
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
            ids.push(rows[i].getValue("id"));
            var statusCode=rows[i].getValue("status");
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
                viewModel.ChanInveUnitList.removeRows(rows);
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
        var selectedRows = viewModel.ChanInveUnitList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		          if (selectedRows[i].getValue("status")==1 || selectedRows[i].getValue("status")=="1"){
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
		              selectedRows[i].setValue("status", "1");
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
        var selectedRows = viewModel.ChanInveUnitList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		          if (selectedRows[i].getValue("status")==0 || selectedRows[i].getValue("status")=="0"){
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
		              selectedRows[i].setValue("status", "0");
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
          viewModel.ChanInveUnitList.pageIndex(0);
        }
        viewModel.ChanInveUnitList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.ChanInveUnitList.pageSize();
        queryData.page = viewModel.ChanInveUnitList.pageIndex();
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
            viewModel.ChanInveUnitList.setSimpleData(data.content,{unSelect:true});
            viewModel.ChanInveUnitList.totalRow(data.totalElements);
            viewModel.ChanInveUnitList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.ChanInveUnitList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.ChanInveUnitList.pageSize(size);
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
      $("#ChanInveUnit-searchcontent")[0],
      [
        {
          type:"text",
          key:"code",
          label:"投资单位编码"
        },
        {
          type:"text",
          key:"name",
          label:"投资单位名称",
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
          }
      ]);
    singledoceidt = new editcard(
      $("#dialog_layer")[0],
      [
        {
          type:"text",
          key:"code",
          label:"投资单位编码",
          enable:false,
      		disableInEdit:true
        },
        {
          type:"text",
          key:"name",
          label:"投资单位名称"
        },
        {
          type:"combo",
          key:"registTypeCode",
          label:"注册类型",
          // multi:true,
          url:appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY021",
          namefield:"name",
          valuefield:"code"
        },
        {
          type:"text",
          key:"legalPerson",
          label:"法人代表"
        },
        {
          type:"refer",
          key:"credentialsTypeId",
          label:"证件类型",
          refinfo:"custdocdef",
          refCode:"QY022",
          refName:"证件类型"
        },
        {
          type:"text",
          key:"credentialsNo",
          label:"证件号码"
        },
        {
          type:"text",
          key:"taxRegistryNo",
          label:"税务登记证号"
        },
        {
          type:"text",
          key:"organizationCode",
          label:"组织机构代码",
        },
        {
          type:"refer",
          key:"countryId",
          label:"国别",
          refinfo:"country",
          refName:"国别"
        },
        {
          type:"text",
          key:"address",
          label:"具体地址"
        },
        {
          type:"text",
          key:"businessScope",
          label:"经营范围"
        },
        {
          type:"text",
          key:"zipecode",
          label:"邮政编码"
        },
        {
          type:"text",
          key:"longitude",
          label:"经度"
        },
        {
          type:"text",
          key:"lattitude",
          label:"纬度"
        },
        {
          type:"text",
          key:"bank",
          label:"开户银行"
        },
        {
          type:"text",
          key:"bankAccount",
          label:"银行账号"
        },
       {
          type:"radio",
          key:"unitState",
          label:"合作状态",
          dataSource:[{value:'1',name:'启用'},{value:'0',name:'停用'}]
          // defaultvalue:"1"
       },
       {
          type:"label",
          key:"status",
          label:"启用状态",
          // defaultvalue:"1"
       },
       {
          type:"textarea",
          key:"description",
          label:"描述",
          cls:"ui-textarea-item"
      }

      ],ChanInveUnitmeta);
    // 列表查询数据(无查询条件)

    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#ChanInveUnit-searchcontent input').off("keydown").on("keydown",function(e){
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
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
  }

  return {
    init: init
  }
});
