define([
  "text!./rebatestatistics.html",
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
      baseurl: "/rebate/statistics-note-details",
      searchUrl: "/rebate/policys",
      statisticUrl: "/rebate/statisticss",
      basisUrl: "/rebate/statistics-basiss",

      SalesPolicyList: new u.DataTable(model.options.metas.SalesPolicyMeta),
      StatisticsNoteDetailList: new u.DataTable(model.options.metas.StatisticsNoteDetailMeta),
      StatisticsNoteDetail: new u.DataTable(model.options.metas.StatisticsNoteDetailMeta),
      StatisticsList: new u.DataTable(model.options.metas.StatisticsMeta),
      StatisticsDetail: new u.DataTable(model.options.metas.StatisticsMeta),
      
      StatisticsBasisList: new u.DataTable(model.options.metas.StatisticsBasisMeta),
      StatisticsBasisDetaiList: new u.DataTable(model.options.metas.StatisticsBasisDetailMeta),
      StatisticsValueList: new u.DataTable(model.options.metas.StatisticsValueMeta),
      // 比较符
      comparisonSource: ko.observableArray([{
        value: "EQ",
        name: "等于"
      }, {
        value: "NOTIN",
        name: "不等于"
      }]),

      whetherSrc: CONST.WHETHER,

      enableFormat: common.format.enableFormat,

      searchcomp: {},
      searchSource: model.options.searchs.search1,

      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,

      detail1Source: model.options.details.detail1,
      detail2Source: model.options.details.detail2,

      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
      //返回列表页
      retListPanel: common.bill.retListPanel,

      statisticsTimeout: null,
      ifFirstShowDialog: false,
      time: false
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
      policyOperation: function (obj) {
        var str = '';
        str = viewModel.operationStr(obj, 'statisticsHandle', '计算');
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      // 统计记录操作列
      noteOperation: function (obj) {
        var str = '';
        str = viewModel.operationStr(obj, 'viewNoteDetailHandle', '查看');
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      // 统计记录明细操作列
      statisticsOperation: function (obj) {
        var str = '';
        str = viewModel.operationStr(obj, 'viewStatisticsDetailHandle', '明细');
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      statisBasisDetailOperation: function (obj) {
        var str = '';
        str = viewModel.operationStr(obj, 'showBasisDetail', '明细');
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      rebateBasisTypeRender: function (obj) {
        var value = obj.value;
        var basisTypes = CONST.REBATEBASISTYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        obj.element.innerHTML = findType ? (findType.name || "") : "";
      },
      rebateValueTypeRender: function (obj) {
        var value = obj.value;
        var basisTypes = CONST.REBATEVALUETYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        obj.element.innerHTML = findType ? (findType.name || "") : "";
      },
      // 返利依据总额
      rebateBasisMonRender: function (obj) {
        var rebateBasisType = obj.row.value.rebateBasisType;
        if (rebateBasisType == "01" || rebateBasisType == "02") {
          obj.element.innerHTML = obj.value;
        } else {
          obj.element.innerHTML = "";
        }
      },
      // 返利依据增长率
      rebateBasisGroRateRender: function (obj) {
        var rebateBasisType = obj.row.value.rebateBasisType;
        if (rebateBasisType != "01" && rebateBasisType != "02") {
          obj.element.innerHTML = obj.value;
        } else {
          obj.element.innerHTML = "";
        }
      },
      // 统计来源
      isSourceRender: function (obj) {
        var value = obj.value;
        var sourceTypes = CONST.STATISTICSRESOURCE || [];
        var findType = sourceTypes.find(function (type) {
          return type.value == value;
        })
        obj.element.innerHTML = findType ? (findType.name || "") : "";
      },

      timeTransRender: function (obj) {
        obj.element.innerHTML = "111";
      },
      isSuccessRender: function (obj) {
        obj.element.innerHTML = (obj.value == 1 ? "成功" : "失败");
      },
      whetherRender: common.rendertype.whetherRender,

      //状态
      isStateGrid: function (obj) {
        var stateValue = viewModel.SalesPolicyList.getRow(obj.rowIndex).getValue("state");
        var stateName = "";
        if (stateValue == 0) {
          (stateName = "待处理")
        }
        if (stateValue == 1) {
          (stateName = "已提交")
        }
        if (stateValue == 2) {
          (stateName = "审批中")
        }
        if (stateValue == 3) {
          (stateName = "审批通过")
        }
        if (stateValue == 4) {
          (stateName = "审批不通过")
        }
        obj.element.innerHTML = stateName;
      }
    },
    events: {
      timeTransComputed: ko.pureComputed(function () {
        return "";
      }),
      // 返利值类型
      rebateValueTypeComputed: ko.pureComputed(function () {
        var value = viewModel.StatisticsDetail.ref("rebateValueType")();
        var basisTypes = CONST.REBATEVALUETYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        return findType ? (findType.name || "") : "";
      }),
      // 是否结算
      isAccountComputed: ko.pureComputed(function () {
        var value = viewModel.StatisticsDetail.ref("isAccount")();
        return value == "1" ? "是" : "否";
      }),
      isState: ko.pureComputed(function () {
        var stateValue = viewModel.SalesPolicyList.ref("state")();
        var stateName;

        if (stateValue == 0) {
          (stateName = "待处理")
        }
        if (stateValue == 1) {
          (stateName = "已提交")
        }
        if (stateValue == 2) {
          (stateName = "审批中")
        }
        if (stateValue == 3) {
          (stateName = "审批通过")
        }
        if (stateValue == 4) {
          (stateName = "审批不通过")
        }
        return stateName;
      }),
      // 统计（计算）
      statisticsHandle: function (index, rowId) {
        // viewModel.showStatisticsProcessDialog();
        var curRow = viewModel.SalesPolicyList.getRowByRowId(rowId);
        var saleOrgId = curRow.getValue("saleOrgId");
        var id = curRow.getValue("id");
        $._ajax({
          url: appCtx + viewModel.baseurl + "/data-count",
          type: "get",
          data: {
            salePolicyId: id,
            saleOrg: saleOrgId
          },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (data && data.message) {
              toastr.error(data.message);
              // 如果抛出异常，关闭进度条，终止状态更新
              clearTimeout(viewModel.statisticsTimeout);
              viewModel.clearLoadingInfo();
            }
          },
          error: function() {
            // 如果抛出异常，关闭进度条，终止状态更新
            clearTimeout(viewModel.statisticsTimeout);
            viewModel.clearLoadingInfo();
          }
        });
        setTimeout(function() {
          // viewModel.showStatisticsProcessDialog();
          viewModel.ifFirstShowDialog = true;
          viewModel.time = false;
          var errorIndex = 0;
          beginGet();

          function beginGet() {
            if (viewModel.time) {
              clearTimeout(viewModel.statisticsTimeout);
              viewModel.clearLoadingInfo();
              return;
            }
            viewModel.getStatus(errorIndex);
            viewModel.statisticsTimeout = setTimeout(beginGet, 3000);
          }
        }, 0);
      },
      // 统计进度弹框
      showStatisticsProcessDialog: function () {
        // 弹框
        if (!viewModel.processDialog) {
          viewModel.processDialog = u.dialog({
            id: "dialog_statistics_process",
            content: "#dialog_statistics_process",
            hasCloseMenu: true,
            width: "60%"
          });
          var okButton = $("#dialog_statistics_process .u-msg-ok");
          okButton.unbind("click").click(function () {
            viewModel.processDialog.close();
            $(".ui-item.begin").hide();
            $("#progress-bar").css("width", "0%");
            $("#progress-num").text("0%");
            $("#error-num").text(0);
            $("#total-num").text(0);
            $("#already-num").text(0);
            $("#error-list").empty();
            clearTimeout(viewModel.statisticsTimeout);
            viewModel.clearLoadingInfo();
          });
          var cancelButton = $("#dialog_statistics_process .u-msg-cancel");
          cancelButton.unbind("click").click(function () {
            viewModel.processDialog.close();
            $(".ui-item.begin").hide();
            $("#progress-bar").css("width", "0%");
            $("#progress-num").text("0%");
            $("#error-num").text(0);
            $("#total-num").text(0);
            $("#already-num").text(0);
            $("#error-list").empty();
            clearTimeout(viewModel.statisticsTimeout);
            viewModel.clearLoadingInfo();
          });
        } else {
          viewModel.processDialog.show();
        }
      },
      // 进度状态
      getStatus: function (errorIndex, callback) {
        $.ajax({
            url: appCtx + viewModel.baseurl + "/dataLoadingStatus",
            type: "GET",
            contentType: false
          })
          .done(function (res) {
            // 防止后端返回数据有误
            if (!res || !res.result) {
              return;
            }
            if (viewModel.ifFirstShowDialog) {
              viewModel.showStatisticsProcessDialog();
              viewModel.ifFirstShowDialog = false;
            }
            var loadingStatus = res.result.loadingStatus;
            var errorNum = res.result.errorNum;
            var totalNum = res.result.totalNum;
            var currentNum = res.result.currentNum;
            $(".ui-item.begin").show();
            $("#progress-bar").css("width", loadingStatus + "%");
            $("#progress-num").text(loadingStatus + "%");
            $("#error-num").text(errorNum);
            $("#total-num").text(totalNum);
            $("#already-num").text(currentNum);
            var errorList = res.error;
            if (errorList && errorList.length > 0) {
              for (var i = errorIndex; i < errorList.length; i++) {
                var errorItem = $('<li class="error-item"></li>');
                errorItem.text(errorList[i]);
                $("#error-list").append(errorItem);
              }
              $("#info-area").show(300);
              errorIndex = errorList.length;
            }
            if ( 
              totalNum != 0 &&
              totalNum == currentNum &&
              (loadingStatus == 100 || loadingStatus.indexOf("100") >=0)
            ) {
              viewModel.time = true;
              if (errorList === null || errorList.length == 0) {
                var errorItem = $('<li class="error-item"></li>');
                errorItem.text("统计完成");
                errorItem.css("color", "green");
                $("#error-list").append(errorItem);
                if (callback && typeof callback === "function") {
                  callback();
                }
              }
            }
          })
          .fail(function (res) {});
      },
      // 清进度缓存-废弃
      clearLoadingInfo: function() {
        console.log("");
        // $._ajax({
        //   url: appCtx + viewModel.baseurl + "/deleteLoadingInfo",
        //   type: "get",
        //   contentType: "application/json; charset=utf-8",
        //   success: function (data) {
        //     console.log(JSON.stringify(data));
        //   }
        // });
      },
      // 查看统计记录明细
      viewNoteDetailHandle: function (index, rowId) {
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          var curRow = viewModel.StatisticsNoteDetailList.getRowByRowId(rowId);
          var id = curRow.getValue("id");
          $(".ui-bill-panel").hide();
          $(".ui-bill-detail").show();
          $(".ui-bill-detail").animateCss("fadeIn");
          viewModel.StatisticsNoteDetail.removeAllRows();
          viewModel.StatisticsList.removeAllRows();
          viewModel.getDetailInfoByParentId(id, "baseurl", function(data) {
            viewModel.StatisticsNoteDetail.setSimpleData(data);
            viewModel.StatisticsList.setSimpleData(data.statisticses, { unSelect: true });
            $(".ui-bill-panel").hide();
            $(".ui-bill-detail").show();
            $(".ui-bill-detail").animateCss("fadeIn");
          });
        }, 0);
      },
      // 查看客户统计明细
      viewStatisticsDetailHandle: function (index, rowId) {
        var curRow = viewModel.StatisticsList.getRowByRowId(rowId);
        var id = curRow.getValue("id");
        // 卡片弹框
        viewModel.StatisticsDetail.removeAllRows();
        viewModel.StatisticsBasisList.removeAllRows();
        viewModel.StatisticsValueList.removeAllRows();
        viewModel.getDetailInfoByParentId(id, "statisticUrl", function(data) {
          viewModel.StatisticsDetail.setSimpleData(data);
          viewModel.StatisticsBasisList.setSimpleData(data.statisticsBasises, { unSelect: true });
          // if(data.statisticsValues && data.statisticsValues.length) {
          //   data.statisticsValues.forEach(function(value) {
          //     if (value.isSource == "0") { // 自制，特殊处理
          //       value.selfBillCode = value.rebateBillCode;
          //       value.rebateBillCode = "";
          //     }
          //   })
          // }
          viewModel.StatisticsValueList.setSimpleData(data.statisticsValues, { unSelect: true });
        });
        //设置tab显示基本信息
        $("#dialog_statistics_detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $("#dialog_statistics_detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        // 弹框
        if (!viewModel.statisticsDetailDialog) {
          viewModel.statisticsDetailDialog = u.dialog({
            id: "dialog_statistics_detail",
            content: "#dialog_statistics_detail",
            hasCloseMenu: true,
            width: "90%"
          });
          var cancelButton = $("#dialog_statistics_detail .J-cancel");
          cancelButton.off().on("click", function () {
            viewModel.statisticsDetailDialog.close();
          });
        } else {
          viewModel.statisticsDetailDialog.show();
        }
      },
      // 返回统计记录列表
      backStatisticsNotePanel: function () {
        viewModel.searchStatisticsNote();
        $(".ui-bill-detail").hide();
        $(".ui-bill-panel").show();
        $(".ui-bill-panel").animateCss("fadeIn");
      },
      // 根据主键获取主子表信息
      getDetailInfoByParentId: function (id, url, callback) {
        $._ajax({
          url: appCtx + viewModel[url] + "/detail",
          type: "get",
          data: {
            id: id
          },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (typeof callback == "function") {
              callback(data);
            }
          }
        });
      },

      // 统计记录
      showStatisticsNotePanel: function () {
        viewModel.searchStatisticsNote();
        viewModel.goBillPanel();
      },

      //返回
      backPanel: function () {
        viewModel.search();
        viewModel.retListPanel();
      },
      openStatistics: function () {
        alert("open");
      },
      closeStatistics: function () {
        alert("close");
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
      searchStatisticsNote: function (reindex) {
        if (reindex) {
          viewModel.StatisticsNoteDetailList.pageIndex(0);
        }
        var queryData = {};
        queryData.size = viewModel.StatisticsNoteDetailList.pageSize();
        queryData.page = viewModel.StatisticsNoteDetailList.pageIndex();

        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.StatisticsNoteDetailList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.StatisticsNoteDetailList.totalRow(data.totalElements);
            viewModel.StatisticsNoteDetailList.totalPages(data.totalPages);
          }
        });
      },
      //页码改变时的回调函数
      pageNoteChange: function (index) {
        viewModel.StatisticsNoteDetailList.pageIndex(index);
        viewModel.searchStatisticsNote();
      },
      //页码改变时的回调函数
      sizeNoteChange: function (size) {
        viewModel.StatisticsNoteDetailList.pageSize(size);
        viewModel.searchStatisticsNote(true);
      },
      
      // 查看返利依据明细
      showBasisDetail: function (index, rowId) {
        setTimeout(function () {
          viewModel.StatisticsBasisDetaiList.removeAllRows();
          var curRow = viewModel.StatisticsBasisList.getRowByRowId(rowId);
          var id = curRow.getValue("id");
          viewModel.getDetailInfoByParentId(id, "basisUrl", function (data) {
            viewModel.StatisticsBasisDetaiList.setSimpleData(data.statisticsBasisDetails, {
              unSelect: true
            });
          })
          // 弹框
          if (!viewModel.basisDetailDialog) {
            viewModel.basisDetailDialog = u.dialog({
              id: "dialog_statistics_basis_detail",
              content: "#dialog_statistics_basis_detail",
              hasCloseMenu: true,
              width: "75%"
            });
            var cancelButton = $("#dialog_statistics_basis_detail .J-cancel");
            cancelButton.off().on("click", function () {
              viewModel.basisDetailDialog.close();
            });
          } else {
            viewModel.basisDetailDialog.show();
          }
        }, 0)
      },
    },
    afterCreate: function () {
      // viewModel.RebateDataCard.off("salePolicyId.valuechange").on("salePolicyId.valuechange", function (obj) {
      //   if (obj.newValue && obj.newValue != obj.oldValue) {
      //     viewModel.resetBodyGridRows(obj);
      //   }
      // });
    }
  });

  return view;
});