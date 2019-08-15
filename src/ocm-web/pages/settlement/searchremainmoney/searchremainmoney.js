define(['text!./searchremainmoney.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-settlement",
    app;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/web/settlement/portal-accountpayable/query-receivablebalance',
      complexList: new u.DataTable(model.options.metas.complex),
      complexItems: new u.DataTable(model.options.metas.complexItem),

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      firstIn: true,
      enableRadioSrc: [{
        value: "1",
        name: "启用"
      }, {
        value: "0",
        name: "停用"
      }, {
        value: CONST.DEFAULTOPTION,
        name: "全部"
      }],
      enableCheckSrc: [{
        value: "1",
        name: "是"
      }],
      enableFmt: ko.pureComputed(function() {
        var enableStatus = viewModel.complexList.ref("enableStatus")();
        return enableStatus == 1 ? "启用" : "停用";
      })
    },
    rendertype: {
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,

      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),

      operation: common.rendertype.operation,
      enableStatusRender: common.rendertype.enableRender,
      detailRender: common.rendertype.detailRender,
    },
    events: {
      //删除和批量删除

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.complexList.pageIndex(0);
        }
        if (viewModel.firstIn) {
          viewModel.firstIn = false;
          return;
        }
        viewModel.complexList.removeAllRows();
        var queryData = {},
          queryData1 = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        if (queryData1.search_EQ_financeOrg) {
          queryData.financeOrgId = queryData1.search_EQ_financeOrg;
        } else {
          toastr.warning('请选择财务组织!');
          return;
        }
        if (queryData1.search_GTE_checkTime_date) {
          queryData.startTime = queryData1.search_GTE_checkTime_date;
          queryData.endTime = queryData1.search_LT_checkTime_date;
        } else {
          toastr.warning('请选择对账日期!');
          return;
        }
        if (queryData1.search_EQ_saleOrg) {
          queryData.saleOrgId = queryData1.search_EQ_saleOrg;
        }
        if (queryData1.search_EQ_customer) {
          queryData.customerId = queryData1.search_EQ_customer;
        }
        if (queryData1.search_EQ_projectId) {
          queryData.projectId = queryData1.search_EQ_projectId;
        }

        var pageSize = viewModel.complexList.pageSize();
        var pageNumber = viewModel.complexList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;

        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.complexList.setSimpleData(data, {
              unSelect: true
            });
            viewModel.complexList.totalRow(data.totalElements);
            viewModel.complexList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.complexList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.complexList.pageSize(size);
        viewModel.search(true);
      },



      //详情
      // 方案1：clone编辑态模板，设置只读，返回删除
      // 方案2：重新定义详情模板
      // 主要看差异，如果差异不大公用模板，差异大重新定义
      // detail: function() {
      //   //确保grid先将行设置为focus状态
      //   setTimeout(function(){
      //     var curRow = viewModel.complexList.getCurrentRow();
      //     var id = curRow.getValue("id");
      //     viewModel.findByParentid(id);
      //     var $detailWrap = $("#bill-detail-wrap");
      //     $detailWrap.empty();
      //     var $billPanel_cl = $(".ui-bill-panel").clone();
      //     $billPanel_cl.show();
      //     $detailWrap.append($billPanel_cl);
      //     viewModel.showBillDetail();
      //     u.compMgr.updateComp($detailWrap[0]);
      //   }, 0);
      // },
      detail: function(obj) {
        //确保grid先将行设置为focus状态
        // return true;
        // setTimeout(function() {
        var curRow = viewModel.complexList.getRow(obj.rowIndex);
        // var id = curRow.getValue("id");
        var gather = curRow.getValue('liaccountBalanceItemsGather').getSimpleData();
        var heppen = curRow.getValue('liaccountBalanceItemsHappen').getSimpleData();
        for (var i = 0; i < gather.length; i++) {
          gather[i].summary = "本期收款";
        }
        for (var h = 0; h < heppen.length; h++) {
          heppen[h].summary = "本期发生";
        }
        var datas = [{
          "summary": "期初",
          "finalBalance": curRow.getValue('initialBalance')
        }].concat(gather).concat(heppen).concat([{
          "summary": "期末",
          "finalBalance": curRow.getValue('finalBalance')
        }]);
        viewModel.complexItems.setSimpleData(datas);
        setTimeout(function() {
          $("[groupvalue='期初']").css('display', 'none');
          $("[groupvalue='期末']").css('display', 'none');
        }, 300);
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
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
      //导出
      exportHandle: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.complexList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
    },
    afterCreate: function() {

      // 列表查询数据(无查询条件)

    }
  });
  return view;
});