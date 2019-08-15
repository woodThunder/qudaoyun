define(['text!./commonproprice.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,commonpropriceSearch;
  baseData = {
    baseurl : '/commonpro-price',
    commonpropriceList: new u.DataTable(commonpropricemeta),
    pagestatus: CONST.PAGESTATUS.DEFAULT,
    gridcomp:{},
    tempdata:[],
    channeltypeSrc: ko.observable(CONST.CHANNELTYPE),
  };
  events = {

      //增行
      addRow:function(){
        viewModel.commonpropriceList.createEmptyRow();
      },
      //删行
      delRow: function () {
        var rows = viewModel.commonpropriceList.getSelectedRows();
        viewModel.commonpropriceList.removeRows(rows);
      },
      //批量保存
      save:function(){
        var result = app.compsValidateMultiParam("#commonproprice");
        if(!result.passed) {
          return
        }
        var postdata = viewModel.commonpropriceList.getSimpleData();
        var changeData = [];
        var nochangeData = []
        if(postdata&&postdata.length>0){
          for(var i = 0;i< postdata.length;i++){
            if(postdata[i].persistStatus!="nrm"){
              changeData.push(postdata[i]);
            }else{
              nochangeData.push(postdata[i]);
            }
          }
        }
        $._ajax({
          url:appCtx + viewModel.baseurl + "/batch-save",
          type:"post",
          data:JSON.stringify(changeData),
          contentType : "application/json; charset=utf-8",
          dataType:"json",
          complete:function(){
            u.hideLoader();
          },
          success:function(data){
            // viewModel.commonpropriceList.removeAllRows();
            // viewModel.commonpropriceList.addSimpleData(data,"nrm",{"unSelect":true});
            // viewModel.commonpropriceList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
            viewModel.search();
            viewModel.showDefaultPage();
          }
        })
      },
      edit:function(){
        viewModel.tempdata = viewModel.commonpropriceList.getSimpleData();
        viewModel.showEditPage();
        $("#commonproprice").data("gridComp").repaintGridDivs();
      },
      cancle:function(){
        viewModel.commonpropriceList.removeAllRows();
        viewModel.commonpropriceList.setSimpleData(viewModel.tempdata,{"unSelect":true});
        viewModel.showDefaultPage();
        $("#commonproprice").data("gridComp").repaintGridDivs();
      },
      showEditPage:function(){
        viewModel.gridcomp.setEditable(true);
        $("#page-view").hide(200);
        $("#page-edit").show(200);
      },
      showDefaultPage:function(){
        viewModel.gridcomp.setEditable(false);
        $("#page-edit").hide(200);
        $("#page-view").show(200);
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.commonpropriceList.getSelectedRows();
        if(selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-enable",
          data: {ids: ids.join(",")},
          success:function(res){
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("enableStatus", "1");
            }
            toastr.success();
          }
        })
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.commonpropriceList.getSelectedRows();
        if(selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-disable",
          data: {ids: ids.join(",")},
          success:function(res){
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("enableStatus", "0");
            }
            toastr.success();
          }
        })
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.commonpropriceList.pageIndex(0);
        }
        viewModel.commonpropriceList.removeAllRows();
        var queryData = commonpropriceSearch.getDataWithOpr();
        queryData.size = viewModel.commonpropriceList.pageSize();
        queryData.page = viewModel.commonpropriceList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.commonpropriceList.setSimpleData(data.content,{unSelect:true});
            viewModel.commonpropriceList.totalRow(data.totalElements);
            viewModel.commonpropriceList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        commonpropriceSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.commonpropriceList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.commonpropriceList.pageSize(size);
        viewModel.search(true);
      },
      //导入
  	  importHandle: function() {
  	  	var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
  	  	var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
  	  	var ele = $('#importFiel')[0]; //挂载元素
  	  	common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
  	  },
  	  //导出
  	  exportHandle: function() {
  	  	  var searchParams = commonpropriceSearch.getDataWithOpr(); //搜索查询参数
  	  	  var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
  	  	  var excelDataUrl =  viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
  	  	  var listData = viewModel.commonpropriceList; //需要导出表格的dataTable
  	  	  var ele = $('#exportFiel')[0]; //挂载元素
  	  	  common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
  	  },

  }
  viewModel = u.extend({},baseData,events,common.rendertype);

  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    window.initButton(viewModel, element);//初始化按钮权限
    ko.cleanNode(element);
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    commonpropriceSearch = new searchbox(
      $("#commonproprice-searchcontent")[0],
      [
         {
          type:"text",
          key:"productid--code",
          label:"产品编码",
        },
        {
          type:"text",
          key:"productid--description",
          label:"产品名称"
        },
        {
          type:"radio",
          key:"isEnable",
          label:"启用状态",
          dataSource:CONST.ENABLESTATUSISALL,
        },
        {
          type:"text",
          key:"vnote",
          label:"备注"
        }
      ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){
    viewModel.gridcomp = app.getComp("grid_commonproprice").grid;
    //绑定输入框enter事件
    $('#commonproprice-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    viewModel.commonpropriceList.on("productid.valuechange", function(obj) {
      console.log("change", obj.newValue);
    })
    //价格处理
    viewModel.commonpropriceList.on("price.valuechange", function(obj) {
      var rowObj = obj.rowObj;
      var price = rowObj.getValue("price");
      price = parseFloat(price);
      var arr = parseInt(price).toString().split('');
      var num = parseInt(arr[arr.length-1]);
      if(num == 4 || num == 7) {
        price += 1;
        toastr.info("价格个位数如果是4则变更为5，如果是7则变更为8");
        obj.rowObj.setValue("price", price);
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
