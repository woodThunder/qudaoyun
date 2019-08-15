define(['text!./samplesettingreport.html','ocm_common','searchbox','billfooter','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,billfooter,detailDialog, summaryDialog;
  baseData = {
    baseurl: '/prom/sample-setting-report',
    SampleSettingReportList: new u.DataTable(SampleSettingReport),
    SampleSettingDetailReport: new u.DataTable(SampleSettingDetailReportMeta),
    officeList: ko.observableArray([]),
    // officeList: ko.observableArray([["四川id","四川code","四川name"],["安徽id","安徽code","安徽name"]]),
    summaryDatas: ko.observableArray([])
    // summaryDatas: ko.observableArray([
    //   {productName: "餐桌椅", dataInfo: [[1,2,3,7,7],[4,5,6,7,7]]},
    //   {productName: "高箱床", dataInfo: [[1,2,3,7,7],[4,5,6,7,7]]}
    // ])
  };
  rendertype = {
    detailRender: function(obj) {
      // 选择汇总条件时，不能查看明细
      var queryData = searcher.getDataWithOpr();
      var groupKeys = queryData["search_IN_groupKeys"];
      if(groupKeys) {
        obj.element.title = obj.value;
        obj.element.innerHTML = obj.value;
        return;
      }
      var viewModel = obj.gridObj.viewModel;
      var rowId = obj.row.value["$_#_@_id"];
      var detailfun = 'data-bind="click:detail.bind($data, '+rowId+')"';
      obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    }
  };
  events = {
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      // 活动编码必填
      var activityId = searcher.viewModel.params.getValue("activityId");
      if(!activityId) {
        toastr.error("请选择活动编码");
        return;
      }
      var queryData = searcher.getDataWithOpr();
      var groupKeys = queryData["search_IN_groupKeys"];
      var hideOrShowColumnKeys = ["customerCode","customerName","accountCode","accountName"];
      // 汇总条件-办事处勾选时隐藏经销商、业务账号列
      var gridComp = app.getComp("grid_SampleSettingReportList").grid;
      if(groupKeys) {
        gridComp.setColumnsVisibleByFieldNames(hideOrShowColumnKeys, false);
      }
      // 汇总条件-办事处反选时显示经销商、业务账号列
      else {
        gridComp.setColumnsVisibleByFieldNames(hideOrShowColumnKeys, true);
      }
      if(reindex){
        viewModel.SampleSettingReportList.pageIndex(0);
      }
      viewModel.SampleSettingReportList.removeAllRows();

      var pageSize = viewModel.SampleSettingReportList.pageSize();
      var pageNumber = viewModel.SampleSettingReportList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl,
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.SampleSettingReportList.setSimpleData(data.content,{unSelect:true});
          viewModel.SampleSettingReportList.totalRow(data.totalElements);
          viewModel.SampleSettingReportList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      searcher.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.SampleSettingReportList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.SampleSettingReportList.pageSize(size);
      viewModel.search(true);
    },
    //导出
    exportHandle: function() {
      var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
      var excelDataUrl =  viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
      var listData = viewModel.SampleSettingReportList; //需要导出表格的dataTable
      var searchParams = searcher.getDataWithOpr(); //搜索查询参数
      var ele = $('#exportFiel')[0];
      common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
    },
    // 采购订单提交量、销售开单量明细
    detail: function(rowId) {
      var curRow = viewModel.SampleSettingReportList.getRowByRowId(rowId);
      viewModel.SampleSettingReportList.setRowFocus(curRow);
      viewModel.SampleSettingDetailReport.setSimpleData([]);
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl + "/findDetailsByproductId",
        data: {
          activityId: viewModel.SampleSettingReportList.getValue("activityId"),
          productId: viewModel.SampleSettingReportList.getValue("productId"),
          customerId: viewModel.SampleSettingReportList.getValue("customerId")
        },
        success: function(details) {
          var customerCode = curRow.getValue("customerCode");
          var customerName = curRow.getValue("customerName");
          var accountCode = curRow.getValue("accountCode");
          var accountName = curRow.getValue("accountName");
          var agencyCode = curRow.getValue("agencyCode");
          var agencyName = curRow.getValue("agencyName");
          for(var i=0, detail; detail = details[i++];) {
            detail.customerCode = customerCode;
            detail.customerName = customerName;
            detail.accountCode = accountCode;
            detail.accountName = accountName;
            detail.agencyCode = agencyCode;
            detail.agencyName = agencyName;
          }
          viewModel.SampleSettingDetailReport.setSimpleData(details);
          if(!detailDialog) {
            detailDialog = u.dialog({content: "#dialog_detail", width: "80%"});
          }
          detailDialog.show();
        }
      })
    },
    detailConfirm: function() {
      detailDialog.hide();
    },
    // 二维展示
    showSummaryTable: function() {
      var queryData = searcher.getDataWithOpr();
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl + "/twoDimensionExpress",
        dataType: 'json',
        data: queryData,
        success: function(datas) {
          if(!datas || datas.length === 0) {
            toastr.error("当前查询条件下没有数据，无法二维展示");
            return;
          }
          if(datas && datas.length > 0) {
            viewModel.officeList(datas[0].agencyInfo);
            viewModel.summaryDatas(datas);
          }
          if(!summaryDialog) {
            summaryDialog = u.dialog({content:"#dialog_summary",width: "90%"});
          }
          summaryDialog.show();
          $("#summary-table-container").perfectScrollbar({suppressScrollY:true,scrollXMarginOffset:20});
        }
      })
    },
    summaryConfirm: function() {
      summaryDialog.hide();
    },
  }
  viewModel = u.extend({},baseData,events,rendertype);

  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    // TODO: 设计产品、经销商、办事处参照与活动联动
    searcher = new searchbox(
      $("#SampleSettingReportList-searchcontent")[0],
      [
        {
          type:"refer",
          key:"activityId",
          label:"活动编码",
          refinfo:"promactivity",
          required: true,
          clientParam:{"EQ_approveStatus":"1","EQ_activeType.applyWay":"1"}
        },
        {
          type:"refer",
          key:"agencyId",
          label:"所属办事处编码",
          refinfo: "promofficeb",
          multi: true,
          domid: "agencySearch"
        },
        {
          type: "checkboxlist",
          key: "groupKeys",
          label: "汇总条件",
          dataSource: [{name:"所属办事处",value: "office"}]
        },
        {
          type:"refer",
          key:"productId",
          label:"设计产品编码",
          refinfo:"designProduct",
          multi:true
        },
        {
	        type:"refer",
	        key:"customerId",
	        label:"经销商编码",
          refinfo: "customer",
          multi: true
	      },
        {
	        type:"refer",
	        key:"accountId",
	        label:"业务账号编码",
          refinfo: "account",
          multi: true
	      },
      ]);
    $("#agencySearch input")[0].disabled = true;
    // 列表查询数据(无查询条件)
    // viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#SampleSettingReportList-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 监听查询条件-活动变化，同步变化查询条件-办事处参照参数
    searcher.viewModel.params.on("activityId.valuechange", function(obj) {
      if(!obj.newValue) {
        $("#agencySearch input")[0].disabled = true;
        return;
      }
      $("#agencySearch input")[0].disabled = false;
      var activityId = obj.newValue;
      $("#agencySearch").attr("data-refparam", JSON.stringify({activityId: activityId}));
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
