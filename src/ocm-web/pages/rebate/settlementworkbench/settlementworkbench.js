define([
  "text!./settlementworkbench.html",
  "ocm_common",
  "ocm_baseview",
  "./meta.js"
], function (tpl, common, baseview, model, bpmopenbill) {
  "use strict";
  var viewModel, app;
  var appCtx = window.pathMap.rebate;
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
      app = this.app;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: "/rebate/policys",
      settlementUrl: "/rebate/rebate-settlements",
      settlementDetailUrl: "/rebate/rebate-settlemen-details",
      searchUrl: "/rebate/policys",

      SalesPolicyList: new u.DataTable(model.options.metas.SalesPolicyMeta),
      StatisticsList: new u.DataTable(model.options.metas.StatisticsMeta),
      RebateSettlementList: new u.DataTable(model.options.metas.RebateSettlementMeta),  // 已计算

      whetherSrc: CONST.WHETHER,

      enableFormat: common.format.enableFormat,

      searchcomp: {},
      searchSource: model.options.searchs.search1,

      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,

      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
      //返回列表页
      retListPanel: common.bill.retListPanel,
    },
    rendertype: {
      detailRender: common.rendertype.detailRender,
      operationStr: function (obj, funcName, title) {
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var array = [];
        var bindArray = [];

        bindArray.push("data-bind=click:");
        bindArray.push(funcName);
        bindArray.push(".bind($data,");
        bindArray.push(obj.rowIndex);
        bindArray.push(',');
        bindArray.push(dataTableRowId);
        bindArray.push(')');

        array.push('<div class="ui-handle-icon"><span class="ui-handle-word"><a href="#" ');
        array.push(bindArray.join(''));
        array.push(' title="');
        array.push(title);
        array.push('">');
        array.push(title);
        array.push('</a></span><span class="ui-handle-word">');
        return array.join('');
      },
      operation: function(obj) {
        var str = '';
        var isAccount = obj.row.value.isAccount;
        // 0：未结算 1：已结算 2：部分结算
        if (isAccount == '0' || isAccount == '2' || !isAccount) {
          str = viewModel.operationStr(obj, 'statisticsResultHandle', '统计结果');
        }
        if (isAccount == '1' || isAccount == '2') {
          str += viewModel.operationStr(obj, 'settlementResultHandle', '结算结果');
        }
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      operation2: function(obj) {
        var str = viewModel.operationStr(obj, 'rebateSettlementHandle', '结算');
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      whetherRender: common.rendertype.whetherRender,
      // 是否结算（表体）
      isAccountRender: function(obj) {
        var str = "";
        if (obj.value == "1") {
          str = "已结算"
        } else if (obj.value == "2") {
          str = "部分结算"
        } else if (obj.value == "0") {
          str = "未结算";
        }
        obj.element.innerHTML = str;
      },
      // 返利值类型
      rebateValueTypeRender: function (obj) {
        var value = obj.value;
        var basisTypes = CONST.REBATEVALUETYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        obj.element.innerHTML = findType ? (findType.name || "") : "";
      }
    },
    events: {
      // 统计结果
      statisticsResultHandle: function(index, rowId) {
        viewModel.StatisticsList.removeAllRows();
        var curRow = viewModel.SalesPolicyList.getRowByRowId(rowId);
        var policyId = curRow.getValue("id");
        viewModel.findRebateStatisticsResult(policyId, "StatisticsList", "settlementUrl", function(data) {
          viewModel.StatisticsList.setSimpleData(data, { unSelect: true });
        });
        viewModel.goBillPanel();
      },
      // 结算结果
      settlementResultHandleById: function(policyId) {
        viewModel.RebateSettlementList.removeAllRows();
        viewModel.getParentInfo(policyId, "RebateSettlementList", "settlementDetailUrl", function(data) {
          viewModel.RebateSettlementList.setSimpleData(data, { unSelect: true });
        });
        viewModel.goDetailPanel();
      },
      settlementResultHandle: function(index, rowId) {
        var curRow = viewModel.SalesPolicyList.getRowByRowId(rowId);
        var policyId = curRow.getValue("id");
        viewModel.settlementResultHandleById(policyId);
      },
      // 根据政策查询可结算数据（封装统计结果）
      findRebateStatisticsResult: function (id, type, url, callback) {
        var queryData = [];

        var ajaxUrl = appCtx + viewModel[url];
        if (type == "StatisticsList") {
          queryData.push(id);
          ajaxUrl += "/getdata";
        }

        $._ajax({
          url: ajaxUrl,
          type: "post",
          dataType: "json",
          data: JSON.stringify(queryData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (typeof callback == "function") {
              callback(data);
            }
          }
        });
      },
      // 根据主键获取主子表信息
      getParentInfo: function (id, type, url, callback) {
        var queryData = {};
        queryData.size = viewModel[type].pageSize();
        queryData.page = viewModel[type].pageIndex();
        // queryData["search_EQ_salePolicy.id"] = id;

        var ajaxUrl = appCtx + viewModel[url];
        if (type == "RebateSettlementList") {
          queryData["search_EQ_rebatePolicy.id"] = id;
          queryData["search_NOTIN_isMadeOneself"] = 1;
          ajaxUrl += "/query-getrebateSettlemenDetailDtoCount"
        }

        $._ajax({
          url: ajaxUrl,
          type: "get",
          dataType: "json",
          data: queryData,
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (typeof callback == "function") {
              callback(data.content);
            }
          }
        });
      },

      // 结算 
      rebateSettlementHandle: function(index, rowId) {
        if(typeof index == "number") {
          viewModel.StatisticsList.setRowsSelect([index]);
        }
        var selectRows = viewModel.StatisticsList.getSelectedRows();
        if(!selectRows || !selectRows.length) {
          toastr.warning("请选择一条数据进行结算");
          return;
        }
        var selectData = selectRows.map(function (item) {
          return item.getSimpleData();
        });
        var policyId = selectData[0].policyId;
        $._ajax({
          url: appCtx + viewModel.settlementUrl + "/get-ste-data",
          type: "post",
          dataType: "json",
          data: JSON.stringify(selectData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (!viewModel.resultDialog) {
              viewModel.resultDialog = u.dialog({
                id: "dialog_settlement_result",
                content: "#dialog_settlement_result",
                hasCloseMenu: true,
                width: "60%"
              });
              var cancelButton = $("#dialog_settlement_result .J-cancel");
              cancelButton.off().on("click", function () {
                viewModel.resultDialog.close();
              });
              var confirmButton = $("#dialog_settlement_result .J-confirm");
              confirmButton.off().on("click", function () {
                viewModel.settlementResultHandleById(policyId);
                viewModel.resultDialog.close();
              });
            } else {
              viewModel.resultDialog.show();
            }
          }
        });

      },
      // 查看结果
      viewSettlementedResult: function(index, rowId) {
        if (!viewModel.viewResultDialog) {
          viewModel.viewResultDialog = u.dialog({
            id: "dialog_view_result",
            content: "#dialog_view_result",
            hasCloseMenu: true,
            width: "85%"
          });
        } else {
          viewModel.viewResultDialog.show();
        }
      },
      //返回
      backPanel: function () {
        viewModel.search();
        viewModel.retListPanel();
      },

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.SalesPolicyList.pageIndex(0);
        }
        viewModel.SalesPolicyList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr();
        queryData.size = viewModel.SalesPolicyList.pageSize();
        queryData.page = viewModel.SalesPolicyList.pageIndex();
        queryData["search_EQ_state"] = "3";

        $._ajax({
          type: "get",
          url: appCtx + viewModel.searchUrl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.SalesPolicyList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.SalesPolicyList.totalRow(data.totalElements);
            viewModel.SalesPolicyList.totalPages(data.totalPages);
          }
        });
      },
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.SalesPolicyList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.SalesPolicyList.pageSize(size);
        viewModel.search(true);
      },
    },
    afterCreate: function () {
    }
  });

  return view;
});