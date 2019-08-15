define(['text!./priceHistoryRp.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'],
	function (tpl, common, searchbox) {
		'use strict';
		var app, baseData, events, rendertype, viewModel, priceHistorySearch,searchDt,
			billstatus = CONST.B2BENUM.PURCHASEORDER;
		baseData = {
      baseurl: '/price-report',
      pricehistoryList: new u.DataTable(pricehistorymeta),
      //采购订单行单据状态
			billStatusSrc: [
				{value: billstatus.ROWUNCOMMITTED, name: "未提交"},
				{value: billstatus.ROWCOMMITTED, name: "已提交"},
				{value: billstatus.ROWAUDITED, name: "已审核"},
				{value: billstatus.ROWAUDITFAILED, name: "审核未通过"},
				{value: billstatus.ROWARRANGED, name: "已安排"},
				{value: billstatus.ROWCLOSED, name: "已关闭"},
			],
			compareTypeSrc:[
				{value: CONST.OPERATOR.EQ, name: "等于"},
				{value: CONST.OPERATOR.GT, name: "大于"},
				{value: CONST.OPERATOR.LT, name: "小于"},
				{value: CONST.OPERATOR.GTE, name: "大于等于"},
				{value: CONST.OPERATOR.LTE, name: "小于等于"},
			],
    };
		rendertype = {
      //审核状态
      auditStatusGrid: function (obj) {
        var showValue = obj.value == "1" ? "已审核" : "未审核";
        obj.element.innerHTML = showValue;
      },
		};
		events = {
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if (reindex) {
					viewModel.pricehistoryList.pageIndex(0);
				}
        var queryData = priceHistorySearch.getDataWithOpr();
        if(!queryData['search_EQ_priceType']){
          toastr.warning("请选择价格类型");
          return;
        }
        viewModel.pricehistoryList.removeAllRows();
				var queryData = priceHistorySearch.getDataWithOpr();
				queryData.size = viewModel.pricehistoryList.pageSize();
				queryData.page = viewModel.pricehistoryList.pageIndex();
        $._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.pricehistoryList.setSimpleData(data.content, {unSelect: true});
            var priceList = CONST.PRICETYPE;
            var allrelRow = viewModel.pricehistoryList.getAllRealRows();
            for(var j = 0;j<allrelRow.length;j++){
              for(var i= 0;i<priceList.length;i++){
                if(priceList[i].value === queryData['search_EQ_priceType']){
                  allrelRow[j].setValue("priceType",priceList[i].name)
                }
              }
            }
            viewModel.pricehistoryList.totalRow(data.totalElements);
						viewModel.pricehistoryList.totalPages(data.totalPages);
					}
				})
			},
						 //导出
  	  exportHandle: function() {
  	  	  var searchParams = priceHistorySearch.getDataWithOpr(); //搜索查询参数
  	  	  var templateUrl = '/purchaseOrderItem-excel/downloadExcelTemplate'; //导出模板地址参数
  	  	  var excelDataUrl =  '/purchaseOrderItem-excel/excelDataExport'; //导出数据地址参数
  	  	  var listData = viewModel.pricehistoryList; //需要导出表格的dataTable
  	  	  var ele = $('#exportFiel')[0]; //挂载元素
  	  	  common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
  	  },
			//清空搜索条件
			cleanSearch: function () {
				priceHistorySearch.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.pricehistoryList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.pricehistoryList.pageSize(size);
				viewModel.search(true);
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
			priceHistorySearch = new searchbox(
				$("#purchasereport-searchcontent")[0],
				[
          {
            type: "combo",
            key: "priceType",
            label: "价格类型",
            dataSource: CONST.PRICETYPE
          },
          {
            type: "text",
            key: "priceCode",
            label: "价格表(活动)编码",
            domid:"pCode"
          },
          {
            type: "text",
            key: "priceName",
            label: "价格表(活动)名称",
            domid:"pName"
          },
          {
            type: "text",
            key: "packCode",
            label: "包件编码"
          },
          {
            type: "text",
            key: "packName",
            label: "包件名称"
          },
          {
            type: "text",
            key: "belongProductCode",
            label: "所属产品编码"
          },
          {
            type: "text",
            key: "belongProductName",
            label: "所属产品名称"
          },
          {
            type: "combo",
            key: "saleChannelCode",
            label: "渠道类型",
            url: appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY059",
            namefield: "name",
            valuefield: "code"
          },
					{
						type: "refer",
            key: "agencypartitionId",
            label: "办事处分区",
            refinfo: "agencypartitiongrid",
            multi:true,
          },
          {
            type: "refer",
            key: "agencyName",
            label: "办事处",
            refinfo: "organization_ocm",
            multi:true,
          },
          {
            type: "refer",
            key: "customerName",
            label: "客户",
            refinfo: "customer",
            multi:true,
          },
          {
            type: "refer",
            key: "shopName",
            label: "门店",
            refinfo: "shopref",
            multi:true,
          },
          {
						type: "daterange",
            key: "creationTime",
            label: "调整时间"
					},
          {
            type: "text",
            key: "adjustCode",
            label: "调价单号"
          },
					{
						type: "combo",
						key: "auditStatus",
						label: "审核状态",
						dataSource: CONST.APPROVE
					},
          {
            type: "daterange",
            key: "auditTime",
            label: "审核时间"
          },
          {
            type: "text",
            key: "adjustName",
            label: "调价单名称"
          },
					{
						type: "text",
            key: "modifier",
            label: "修改人姓名"
					},
          {
            type: "text",
            key: "auditor",
            label: "审核人姓名"
          },
				]);
      searchDt = priceHistorySearch.viewModel.params;
		}

		function afterRender() {
			//绑定输入框enter事件
			$('#purchasereport-searchcontent input').off("keydown").on("keydown", function (e) {
				if (e.keyCode == 13) {
					$(this).blur();
					viewModel.search();
				}
			});
      searchDt.on("priceType.valuechange",function(obj){
        viewModel.pricehistoryList.clear();
        var relValue = searchDt.getValue("priceType");
        var grid = app.getComp("grid_pricehistoryList").grid;
				obj.rowObj.setValue("priceCode", "");
				obj.rowObj.setValue("priceName", "");
        if(relValue ==="1"){
          $("#pCode").children().attr("readonly","readonly").attr('placeholder','促销基础价时不可填写');
          $("#pName").children().attr("readonly","readonly").attr('placeholder','促销基础价时不可填写');
          grid.setColumnVisibleByIndex(1, false);
          grid.setColumnVisibleByIndex(2, false);
        } else if(relValue === "3"){
					$("#pCode").children().removeAttr("readonly","readonly").removeAttr('placeholder','促销基础价时不可填写');
          $("#pName").children().removeAttr("readonly","readonly").removeAttr('placeholder','促销基础价时不可填写');
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setColumnVisibleByIndex(8, false);
        grid.setColumnVisibleByIndex(9, false);
        grid.setColumnVisibleByIndex(11, true);
      } else {
          $("#pCode").children().removeAttr("readonly","readonly").removeAttr('placeholder','促销基础价时不可填写');
          $("#pName").children().removeAttr("readonly","readonly").removeAttr('placeholder','促销基础价时不可填写');
          grid.setColumnVisibleByIndex(1, true);
          grid.setColumnVisibleByIndex(2, true);
          grid.setColumnVisibleByIndex(3, true);
          grid.setColumnVisibleByIndex(4, true);
          grid.setColumnVisibleByIndex(7, true);
          grid.setColumnVisibleByIndex(8, true);
          grid.setColumnVisibleByIndex(9, true);
          grid.setColumnVisibleByIndex(11, false);
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
