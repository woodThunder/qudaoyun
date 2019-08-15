define(['text!./outinjournal.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
  'use strict'
  var viewModel, app;
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
      app = this.app;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/stock/out-in-journals',
      simpleList: new u.DataTable(model.options.metas.simplemeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      button1Source: model.options.buttons.button1,
      gridOption: model.options.grids.grid1,
      
    },
    rendertype: common.rendertype,
    events: {
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex, isFrist) {
        if (!isFrist) {  // 用来判断是否是首次进入，首次进入默认不操作
					return;
				}
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.simpleList.pageSize();
        var pageNumber = viewModel.simpleList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        var startDate = queryData.search_GTE_billDate_date;
        var endDate = queryData.search_LT_billDate_date;
        if (!startDate || !endDate) {
          endDate = new Date().getTime();
          var year = 365 * 24 * 60 * 60 * 1000;
          startDate = endDate - year * 2;
          queryData.search_LT_billDate_date = endDate;
          queryData.search_GTE_billDate_date = startDate;
        }
        $._ajax({
          type: "get",
          //url: appCtx + viewModel.baseurl + "/get-by-summary",
            url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalNumbers);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        });
      },
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.simpleList.pageIndex(index);
        viewModel.search(false, 'NoFrist');
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.simpleList.pageSize(size);
        viewModel.search(true, 'NoFrist');
      },
      //导出
      exportHandle: function () {
        var rows = viewModel.simpleList.getSelectedRows();
				if (rows.length == 0) {
					toastr.warning("请至少选择一条数据");
					return;
				}
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = "/stock/out-in-journal-excel" + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = "/stock/out-in-journal-excel" + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.simpleList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        var typeArr = [{
          value: false,
          name: "导出数据"
        }]; //导出类型
        common.fileHandle.exportFileType(listData, ele, searchParams, templateUrl, excelDataUrl, typeArr);
      },
    },
    afterCreate: function () {
        // viewModel.search();
        app = this.app;
       
      //搜索条件 库存组织仓库过滤
      viewModel.searchcomp.viewModel.params.on("stockOrg.valuechange", function (obj) {
        if (obj.newValue != undefined && obj.newValue != "") {
          var stockOrgId = {
            "EQ_inventoryOrg.id": obj.newValue
          };
          $("#storage").attr("data-refparam", JSON.stringify(stockOrgId));
        } else {
          $("#storage").attr("data-refparam", '{"EQ_inventoryOrg.id":""}');
          viewModel.searchcomp.viewModel.params.setValue("storage", "");
        }
      })
      //搜索条件 商品分类商品过滤
      viewModel.searchcomp.viewModel.params.on("goodsCategory.valuechange", function (obj) {
        if (obj.newValue != undefined && obj.newValue != "") {
          var goodsCategoryId = {
            "EQ_goodsCategory.id": obj.newValue
          };
          $("#goods").attr("data-refparam", JSON.stringify(goodsCategoryId));
        } else {
          $("#goods").attr("data-refparam", '{"EQ_goodsCategory.id":""}');
          viewModel.searchcomp.viewModel.params.setValue("goods", "");
        }
      })
     //汇总条件监听 改变表格显示字段
      viewModel.searchcomp.viewModel.params.on("gather.valuechange", function(obj) {
        var grid = viewModel.app.getComp("grid_simple1").grid;
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var gather = queryData.search_EQ_gather;
        var byBatchNum = queryData.search_EQ_byBatchNum;
        if(gather == "2" && byBatchNum =="4"){
          grid.setColumnVisibleByIndex(0, true);
          grid.setColumnVisibleByIndex(1, true);
          grid.setColumnVisibleByIndex(2, false);
        }else if(gather == "1" && byBatchNum =="3"){
          grid.setColumnVisibleByIndex(0, false);
          grid.setColumnVisibleByIndex(1, false);
          grid.setColumnVisibleByIndex(2, true);
        }else if((gather == "2" && byBatchNum =="3")||(gather == "1" && byBatchNum =="4")){
          grid.setColumnVisibleByIndex(0, true);
          grid.setColumnVisibleByIndex(1, true);
          grid.setColumnVisibleByIndex(2, true);
        }
      })
       //按批次展开监听 改变表格显示字段
       viewModel.searchcomp.viewModel.params.on("byBatchNum.valuechange", function(obj) {
        var grid = viewModel.app.getComp("grid_simple1").grid;
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var gather = queryData.search_EQ_gather;
        var byBatchNum = queryData.search_EQ_byBatchNum;
        if(gather == "2" && byBatchNum =="4"){
          grid.setColumnVisibleByIndex(0, true);
          grid.setColumnVisibleByIndex(1, true);
          grid.setColumnVisibleByIndex(2, false);
        }else if(gather == "1" && byBatchNum =="3"){
          grid.setColumnVisibleByIndex(0, false);
          grid.setColumnVisibleByIndex(1, false);
          grid.setColumnVisibleByIndex(2, true);
        }else if((gather == "2" && byBatchNum =="3")||(gather == "1" && byBatchNum =="4")){
          grid.setColumnVisibleByIndex(0, true);
          grid.setColumnVisibleByIndex(1, true);
          grid.setColumnVisibleByIndex(2, true);
        }
      })
    }
  });

  return view;
});