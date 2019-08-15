define(['text!./customattribute.html','ocm_common','searchbox','billfooter','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,billfooter,proTyperef;
  baseData = {
    baseurl : '/custom-attributes',
    baseurlSub:'/',
    CustomAttributeList: new u.DataTable(CustomAttribute),
    CustomAttributeItems: new u.DataTable(CustomAttributeItem),
    // DemoItemRefList: new u.DataTable(DemoItemRef),
    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    enableRadioSrc: [{value:"1",name:"启用"},{value:"0",name:"停用"}],
    enableCheckSrc: [{value:"1",name:"是"}],
    typeSrc:[{value:"1",name:"枚举"},{value:"2",name:"数值"},{value:"3",name:"布尔"}],
    typeValue:"",
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    enableFmt: ko.pureComputed(function() {
      var statusCode = viewModel.CustomAttributeList.ref("statusCode")();
      return statusCode == 1 ? "启用" : "停用";
    }),

    enableStatusRender:function(obj) { 
            var showValue = obj.value == "1" ? "启用" : "停用"; 
            obj.element.innerHTML = showValue; 
        }, 
     //判断表格里的状态
     //审核状态
    stateGrid: function (obj) {
      var stateValue = viewModel.CustomerList.getRow(obj.rowIndex).getValue('statusCode');
      var stateName;
      stateValue ==1?stateName="启用": stateName="停用";
      obj.element.innerHTML = stateName;
    }

  };
  rendertype = {
    operation: common.rendertype.operation,
    detailRender: common.rendertype.detailRender,
    enableRender:common.rendertype.enableRender,
  };
  events = {
		
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
     
      if(reindex){
        viewModel.CustomAttributeList.pageIndex(0);
      }
      viewModel.CustomAttributeList.removeAllRows();
      var queryData = searcher.getDataWithOpr();
      var pageSize = viewModel.CustomAttributeList.pageSize();
      var pageNumber = viewModel.CustomAttributeList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      
      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl,
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.CustomAttributeList.setSimpleData(data.content,{unSelect:true});
          viewModel.CustomAttributeList.totalRow(data.totalElements);
          viewModel.CustomAttributeList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      searcher.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.CustomAttributeList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.CustomAttributeList.pageSize(size);
      viewModel.search(true);
    },
    //删除和批量删除
    del: function (data) {
        if (typeof(data) == 'number') {
          viewModel.CustomAttributeList.setRowSelect(data);
        }
        var ids = [];
        var status=[];
        var statustip="";
        var rows = viewModel.CustomAttributeList.getSelectedRows();
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
            var statusCode=rows[i].getValue("statusCode");
          	if(statusCode==1 || statusCode=="1"){
          		status.push(rows[i].getValue("name"));
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
                  viewModel.CustomAttributeList.removeRows(rows);
                  toastr.success("删除成功");
                }
              });
            }
          });
        }else{
          toastr.warning("请先选择要删除的数据");
        }
      },
      spaceCount:function(str){
          var word = " "; // 要计算的字符
          var regex = new RegExp(word, 'g'); // 使用g表示整个字符串都要匹配
          var result = str.match(regex);
          return !result ? 0 : result.length;
      },
    //进入新增单据页
    showAddBillPanel: function() {
     
      var curRow = viewModel.CustomAttributeList.createEmptyRow();
      viewModel.CustomAttributeList.setRowFocus(curRow);
      curRow.setValue("statusCode", "1");
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
      viewModel.CustomAttributeItems.removeAllRows();  
    },
    //进入修改单据页
    showEditBillPanel: function(index) {
      viewModel.CustomAttributeList.setRowFocus(index);
      var id = viewModel.CustomAttributeList.getValue("id");
      viewModel.CustomAttributeList.originEditData = viewModel.CustomAttributeList.getFocusRow().getSimpleData();
      viewModel.findByParentid(id);
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
     
    },
    //进入复制单据页
    showCopyBillPanel: function() {
      var selectedRows = viewModel.CustomAttributeList.getSelectedRows();
      // 只支持单一复制，批量复制需单独处理
      if(selectedRows.length != 1) {
        //TODO: tips替换
        alert("请选择一条要复制的行")
        return;
      }
      var copyRow = selectedRows[0];
      var curRow = viewModel.CustomAttributeList.createEmptyRow();
      curRow.setSimpleData(copyRow.getSimpleData());
      viewModel.CustomAttributeList.setRowFocus(curRow);
      var id = copyRow.getValue("id");
      //查询子表数据
      viewModel.findByParentid(id);
      //删除主表主键，编码，审计信息
      viewModel.clearBaseProp(curRow);
      //删除子表主键，子表主表关联
      var subRows = viewModel.CustomAttributeItems.getAllRows();
      for(var i=0; i<subRows.length; i++) {
        viewModel.clearBaseProp(subRows[i]);
        subRows[i].setValue("parentid", "");
      }
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.COPY;
    },
    //详情
    detail: function() {

      //确保grid先将行设置为focus状态
      setTimeout(function(){
        var curRow = viewModel.CustomAttributeList.getCurrentRow();
        var id = curRow.getValue("id");
        viewModel.findByParentid(id);
        viewModel.goDetailPanel();
      }, 0);
    },
    //查询子表数据
    findByParentid: function(id) {
      $._ajax({
        url:appCtx + viewModel.baseurl + viewModel.baseurlSub,
        type: 'get',
        async: false,
        data: {bomId: id},
        success:function(data){
          viewModel.CustomAttributeItems.setSimpleData(data);
        }
      })
    },

    // 清除基类属性
    clearBaseProp: function(row) {
      row.setValue("id", "");
      row.setValue("code", "");
      row.setValue("name", "");
      row.setValue("creator", "");
      row.setValue("creationTime", "");
      row.setValue("modifier", "");
      row.setValue("modifiedTime", "");
    },
    //新增子表项
    addItem: function() {
      viewModel.CustomAttributeItems.createEmptyRow();
    },
     //删除子表项
    delItems: function() {
      var selectedRows = viewModel.CustomAttributeItems.getSelectedRows();
      if(selectedRows.length < 1){
          toastr.warning("请选择数据");
          return;
      }
      viewModel.CustomAttributeItems.removeRows(selectedRows);
    },
    //保存单据
    saveBill: function() {
      var productCombineData = viewModel.CustomAttributeList.getCurrentRow().getSimpleData();
          var CustomAttributeItemsData = viewModel.CustomAttributeItems.getSimpleData();
          productCombineData.subBoms = CustomAttributeItemsData;
          var _ajaxType = viewModel.CustomAttributeList.getValue("id") ? "put": "post";
          $._ajax({
            url:appCtx + viewModel.baseurl,
            type:_ajaxType,
            data:JSON.stringify(productCombineData),
            contentType : "application/json; charset=utf-8",
            success:function(data){
              viewModel.CustomAttributeList.getFocusRow().setSimpleData(data);
              viewModel.retListPanel();
              toastr.success("保存成功");
            }
          })
    },
    //取消单据
    cancelBill: function() {
      var curRow = viewModel.CustomAttributeList.getCurrentRow();
      // 修改，则还原
      if(curRow.getValue("id")) {

        curRow.setSimpleData(viewModel.CustomAttributeList.originEditData)
      }
      // 新增或复制，则删除
      else {
        viewModel.CustomAttributeList.removeRow(curRow);
        viewModel.CustomAttributeItems.removeAllRows();
      }
      viewModel.retListPanel();
    },
    
     
     //启用
      enable: function() {
        var selectedRows = viewModel.CustomAttributeList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		          if (selectedRows[i].getValue("statusCode")==1 || selectedRows[i].getValue("statusCode")=="1"){
		          	status.push(selectedRows[i].getValue("name"));
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
        var selectedRows = viewModel.CustomAttributeList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		          if (selectedRows[i].getValue("statusCode")==0 ||                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        selectedRows[i].getValue("statusCode")=="0"){
		          	status.push(selectedRows[i].getValue("name"));
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
    //参照选择批量新增子表
    showAddItemsRef: function() {
 
     if(viewModel.typeValue=="1"){
      viewModel.CustomAttributeItems.createEmptyRow();
     }
     else{
        return
     }


    },
  
    // 自定义页签参照
    showTabRef: function() {
      $("#productTabRef .refer").trigger("click");
    },
  }
  // function refparamChange(){
  //     $("#grid_ProductBomItem_placeholder_divs").attr("data-refparam",'{"EQ_proType":"proTyperef","NOTEQ_proNature":"4"}');
  //   }
  viewModel = u.extend({},baseData,events,events,common.rendertype,rendertype);

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
    window.app = app;
    // 查询组件初始化
    searcher = new searchbox(
      $("#CustomAttribute-searchcontent")[0],
      [
     
        {
          type:"text",
          key:"",
          label:"属性名称",
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
      // billfooter = new Billfooter(
      //   $(".ui-bill-footer").get(),
      //   viewModel,
      //   "CustomAttributeList"
      // );
    // 列表查询数据(无查询条件)
    viewModel.search();
    // // 子表参照聚焦行，用于绑定子表参照组件
    // var refRow = viewModel.DemoItemRefList.createEmptyRow();
    // viewModel.DemoItemRefList.setRowFocus(refRow);
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#CustomAttribute-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    
    viewModel.CustomAttributeList.on("type.valuechange", function(obj) {
      var unit =app.getComp("unitId");
       if(obj.newValue=="1"){
          viewModel.typeValue = 1
       }
       else{
         viewModel.typeValue = 2
         viewModel.CustomAttributeItems.removeAllRows();
       }
       if (obj.newValue=="2") {
        unit.setEnable(true);
       }else{
        unit.setEnable(false);
        viewModel.CustomAttributeList.setValue("unitId","");
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
