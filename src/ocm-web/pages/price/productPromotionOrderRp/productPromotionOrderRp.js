define(['text!./productPromotionOrderRp.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'],
  function (tpl, common, searchbox) {
    'use strict';
    var app, baseData, events, rendertype, viewModel, searcher,searchDt,dimensionalDialog,
      billstatus = CONST.B2BENUM.PURCHASEORDER;
    baseData = {
      baseurl: '/prom/product-promorder-report',
      productPromotionOrderList: new u.DataTable(productPromotionOrderListmeta),
      towDimensionalList : new u.DataTable(towDimensional),
      officeList: ko.observableArray([]),
      summaryDatas: ko.observableArray([])
    };
    rendertype = {
      //审核状态
      auditStatusGrid: function (obj) {
        var showValue = obj.value == "1" ? "已审核" : "未审核";
        obj.element.innerHTML = showValue;
      },
      precision2Render: common.rendertype.precision2Render,
    };
    events = {
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.productPromotionOrderList.pageIndex(0);
        }
        viewModel.productPromotionOrderList.removeAllRows();
        var queryData = searcher.getDataWithOpr();
        queryData.size = viewModel.productPromotionOrderList.pageSize();
        queryData.page = viewModel.productPromotionOrderList.pageIndex();
        var refValues = $("#refContainershowCode").data("uui.refer").values;
        if(refValues && refValues.length > 0) {
          var products = '',combines = '';
          for(var i=0; i<refValues.length;i++) {
            //产品
            if(refValues[i].isproduct === "1") {
              products += refValues[i].refpk+',';
            }
            //产品组合
            else {
              combines += refValues[i].refpk+',';
            }
          }
          products = products.substring(0,products.length-1);
          combines = combines.substring(0,combines.length-1);
        }
        queryData.search_IN_products = products;
        queryData.search_IN_combines = combines;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.productPromotionOrderList.setSimpleData(data.content, {unSelect: true});
            viewModel.productPromotionOrderList.totalRow(data.totalElements);
            viewModel.productPromotionOrderList.totalPages(data.totalPages);
          }
        })
      },
      //导出
      exportHandle: function() {
        var searchParams = searcher.getDataWithOpr(); //搜索查询参数
        var excelDataUrl =  '/prom/product-promorder-report/excelDataExport'; //导出数据地址参数
        var listData = viewModel.productPromotionOrderList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData,ele,searchParams,"",excelDataUrl);
      },
      //清空搜索条件
      cleanSearch: function () {
        searcher.clearSearch();
        viewModel.clearRef(["showCode","officeCode","activityId"]);
      },
      // 清空已选参照
      clearRef: function(referids) {
        if(referids&&referids.length>0){
          for(var i=0;i<referids.length;i++){
            var refer = $("#refContainer"+referids[i]).data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
          }
        }
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.productPromotionOrderList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.productPromotionOrderList.pageSize(size);
        viewModel.search(true);
      },
      //二维展示
      show2dimensional:function () {
        var queryData = searcher.getDataWithOpr();
        var refValues = $("#refContainershowCode").data("uui.refer").values;
        if(refValues && refValues.length > 0) {
          var products = '',combines = '';
          for(var i=0; i<refValues.length;i++) {
            //产品
            if(refValues[i].isproduct === "1") {
              products += refValues[i].refpk+',';
            }
            //产品组合
            else {
              combines += refValues[i].refpk+',';
            }
          }
          products = products.substring(0,products.length-1);
          combines = combines.substring(0,combines.length-1);
        }
        queryData.search_IN_products = products;
        queryData.search_IN_combines = combines;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/find2dimensional",
          data: queryData,
          dataType:'json',
          async: false,
          success: function(res) {
            if(!res||res.length ===0){
              toastr.error("当前查询条件下没有数据，无法二维展示");
              return;
            }
            if(res&&res.length >0){
              viewModel.officeList(res[0].agencyInfo);
              viewModel.summaryDatas(res);
            }
            if(!dimensionalDialog){
              dimensionalDialog = u.dialog({content:"#dialog_content_2dimensional",width:"90%"});
            }
            dimensionalDialog.show();
            $("#summary-table-container").perfectScrollbar({suppressScrollY:true,scrollXMarginOffset:20});
          }
        })
      },
      summaryConfirm: function() {
        dimensionalDialog.hide();
      },
    };
    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

    function appInit(element, params) {
      //将模板页渲染到页面上
      element.innerHTML = tpl;
      //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
      app = u.createApp({
        el: element,
        model: viewModel
      });
      // 查询组件初始化
      searcher = new searchbox(
        $("#purchasereport-searchcontent")[0],
        [
          {
            type: "refer",
            key: "activityId",
            label: "活动编码",
            refinfo: "promactivity",
            multi:true,
            referId:"activityId",
            clientParam:{"EQ_approveStatus":"1","EQ_activeType.applyWay":"1"}
          },
          {
            type: "refer",
            key: "showCode",
            label: "产品编码",
            refinfo: "promproducttab",
            multi:true,
            referId:"showCode",
            domId:"showCode"
          },
          {
            type: "refer",
            key: "officeCode",
            label: "办事处编码",
            refinfo: "promofficeb",
            multi:true,
            referId:"officeCode",
            domId:"officeCode"
          },
          {
            type: "refer",
            key: "pickAccountCode",
            label: "业务账户编码",
            refinfo: "account",
            referId:"pickAccountCode",
            domId:"pickAccountCode"
          },
          {
            type: "refer",
            key: "customerCode",
            label: "经销商编码",
            refinfo: "customerRefb",
            referId:"customerCode"
          },
          {
            type: "checkboxlist",
            key: "productSummary",
            label: "汇总条件",
            dataSource: CONST.PRODUCTSUMMARY,
            cls: "ui-checkboxes-item"
          },
        ]);
      viewModel.search();
      searchDt = searcher.viewModel.params;
    }

    function afterRender() {
      //绑定输入框enter事件
      $('#purchasereport-searchcontent input').off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13) {
          $(this).blur();
          viewModel.search();
        }
      });

      searchDt.on("activityId.valuechange",function(){
        var activityId = searchDt.getValue("activityId");
        var data = JSON.stringify({activityId: activityId});
        $("#showCode").parent().attr("data-refparam",data);
        $("#officeCode").parent().attr("data-refparam",data);
        // $("#pickAccountCode").parent().attr("data-refparam",data);
      })
      searchDt.on("productSummary.valuechange",function(){
        var summaryVal = searchDt.getValue("productSummary");
        var selectArr = summaryVal.split(',');
        var grid = app.getComp("grid_productPromotionOrderList").grid;
        var columnArr = grid.gridCompColumnArr;
        var keyToNum ={};
        for(var i=0;i<columnArr.length;i++){
          var value = columnArr[i].options.field;
          keyToNum[i] = value;
          grid.setColumnVisibleByIndex(i, false);
          if(i === 9){
            break;
          }
        }
        for(var j=0;j<selectArr.length;j++){
          for(var key in keyToNum){
            var keyVal = keyToNum[key]
            if(keyVal.indexOf(selectArr[j]) === 0){
              grid.setColumnVisibleByIndex(key, true);
            }
          }
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