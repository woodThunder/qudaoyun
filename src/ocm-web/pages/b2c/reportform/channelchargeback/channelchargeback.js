define(['text!./channelchargeback.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'],
  function (tpl, common, searchbox) {
    'use strict';
    var app, baseData, events, rendertype, viewModel, searcher,searchDt,dimensionalDialog,exportDialog,
      billstatus = CONST.B2BENUM.PURCHASEORDER;
    baseData = {
      baseurl: '/b2c/channel-stocks-rpt',
      productPromotionOrderList: new u.DataTable(productPromotionOrderListmeta),
//    towDimensionalList : new u.DataTable(towDimensional),
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
		  	  var templateUrl = '/b2c/channel-stock-rpt-excel/downloadExcelTemplate'; //导出模板地址参数
		  	  var excelDataUrl = '/b2c/channel-stock-rpt-excel/excelDataExport'; //导出数据地址参数
		  	  var listData = viewModel.productPromotionOrderList; //需要导出表格的dataTable
		  	  var ele = $('#exportFiel')[0]; //挂载元素
			  var typeArr = [{ value: false, name: "导出数据" }]; //导出类型
		  	  common.fileHandle.exportFileType(listData,ele,searchParams,templateUrl,excelDataUrl,typeArr);
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
          type: "daterange",
          label: "清理日期",
          key: "cleanTime",
          },
          {
            type: "refer",
            key: "productId",
            label: "产品名称",
            refinfo: "productInfo",
            multi:true,
          },
          {
          type: "text",
          label: "渠道库存号",
          key: "code",
          },
          {
            type: "refer",
            key: "storeId",
            label: "店铺名称",
            refinfo: "b2cStoreRef",
            multi:true,
          },
          {
	          type: "text",
	          label: "顾客ID",
	          key: "customer",
          },
          {
	          type: "text",
	          label: "顾客姓名",
	          key: "customerName",
          },
          {
            type: "refer",
            key: "serviceProviderId",
            label: "服务商",
            refinfo: "customers",
            clientParam: {
                        "EQ_isEnable": "1",
                        "EQ_isServiceProvider":"1"
          	},
            multi:true,
          },
          {
	          type: "text",
	          label: "平台单号",
	          key: "orderPCode",
          },
          {
	          type: "text",
	          label: "电商单号",
	          key: "orderCode",
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