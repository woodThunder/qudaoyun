define(['text!./saletarget.html', 'ocm_common', 'ocm_baseview', './meta.js', "../../flow/bpmapproveref/bpmopenbill.js"], function (tpl, common, baseview, model, bpmopenbill) {
  'use strict'
  var viewModel, app;

  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
      app = this.app;
      viewModel = u.extend(viewModel, bpmopenbill.model)
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/rebate/sales-targets',
      applicationUrl: "/rebate/sales-targets",
      excelurl: '',
      complexList: new u.DataTable(model.options.metas.salesTarget), // 列表
      complexCard: new u.DataTable(model.options.metas.salesTarget), // 编辑
      complexDetailCard: new u.DataTable(model.options.metas.salesTarget), // 详情
      complexItems: new u.DataTable(model.options.metas.targetCustomerItem), // 表体行
      ItemRefList: new u.DataTable(model.options.metas.ItemRef), // 客户参照

      billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
      // 跳转单据页
      goBillPanel: common.bill.goBillPanel,
      // 跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      // 查看详情
      detailRender: common.rendertype.detailRender,

      //返回列表页
      retListPanel: common.bill.retListPanel,
      stateSrc: [{
        value: '0',
        name: '待处理'
      }, {
        value: '1',
        name: '已提交'
      }, {
        value: '2',
        name: '审批中'
      }, {
        value: '3',
        name: '审批通过'
      }, {
        value: '4',
        name: '审批不通过'
      }],

      buttonListSource: model.options.buttons.button1,
      buttonEditSource: model.options.buttons.button2,

      searchcomp: {},
      searchSource: model.options.searchs.search1,

      gridListOption: model.options.grids.grid1,
      gridDetailOption: model.options.grids.gridDetailItem,
      gridEditOption: model.options.grids.gridEditItem,
      cardDetailOption: model.options.details.detail1,
      cardEditOption: model.options.cards.card1,

      stateComputed: ko.pureComputed(function () {
        var dataValue = viewModel.complexList.ref("state")();
        var showName;

        if (dataValue == 0) {
          (showName = "待处理")
        }
        if (dataValue == 1) {
          (showName = "已提交")
        }
        if (dataValue == 2) {
          (showName = "审批中")
        }
        if (dataValue == 3) {
          (showName = "审批通过")
        }
        if (dataValue == 4) {
          (showName = "审批不通过")
        }
        return showName;
      }),
      stateRender: function (obj) {
        var stateValue = viewModel.complexList.getRow(obj.rowIndex).getValue("state");
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
    rendertype: {
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
      operation: function (obj) {
        var str = '';
        var billState = obj.row.value.state;
        if (billState == '0') {
          // 可编辑,可提交,可删除
          str = viewModel.operationStr(obj, 'showEditBillPanel', '编辑').concat(viewModel.operationStr(obj, 'submit', '提交')).concat(viewModel.operationStr(obj, 'del', '删除'));
        } else if (billState == '1') {
          // 已提交，尚未审批 . 可收回,可审批
          str = viewModel.operationStr(obj, 'unsubmit', '收回') + viewModel.operationStr(obj, 'approve', '审批');
        } else if (billState == '3') {
          str = viewModel.operationStr(obj, 'cancelApprove', '取消审批');
        }
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      }
    },
    events: {
      search: function (reindex) {
        if (reindex) {
          viewModel.complexList.pageIndex(0);
        }
        viewModel.complexList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.complexList.pageSize();
        var pageNumber = viewModel.complexList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.complexList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.complexList.totalRow(data.totalElements);
            viewModel.complexList.totalPages(data.totalPages);
          }
        })
      },

      //导入
      importHandle: function () {
        var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function () {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var searchindex = viewModel.tabindex;
        var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.complexList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {

        viewModel.complexList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {

        viewModel.complexList.pageSize(size);
        viewModel.search(true);
      },
      //删除和批量删除
      del: function (data, rowId) {

        if (typeof (data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        
        var ids = [];
        var status = [];
        var statustip = "";
        var rows = viewModel.complexList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
            var state = rows[i].getValue("state");
            if (state != "0") {
              status.push(rows[i].getValue("code"));
            }
          }
          if (status.length > 0) {
            var statusArr = function () {
              for (i = 0; i < status.length; i++) {
                statustip += status[i] + "，";
              }
              return statustip.substring(0, statustip.length - 1);
            };

            toastr.warning("数据   " + statusArr() + " 非【待处理】状态，不可删除");
            return false;
          }
          common.dialog.confirmDialog({
            msg1: "确认删除这些项？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "error",
            onOk: function () {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                data: "ids=" + ids.join(","),
                success: function (data) {
                  toastr.success("删除成功");
                  viewModel.search();
                }
              });
            }
          });
        } else {
          toastr.warning("请先选择一行数据");
        }
      },

      //进入新增单据页
      showAddBillPanel: function () {
        viewModel.index = -1;
        viewModel.complexCard.removeAllRows();
        viewModel.complexItems.removeAllRows();
        var curRow = viewModel.complexCard.createEmptyRow();
        curRow.setValue("state", "0");
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function (index, rowId) {
        var row = viewModel.complexList.getRowByRowId(rowId);
        viewModel.complexCard.removeAllRows();
        viewModel.complexItems.removeAllRows();
        viewModel.index = index;
        viewModel.rowId = row.rowId;
        var id = row.getValue("id");
        viewModel.findByParentid(id, function (maindata) {
          viewModel.complexCard.setSimpleData(maindata);
          var curRow = viewModel.complexCard.getCurrentRow();
          var childDatas = maindata.targetCustomerItems;
          var newChildDatas = childDatas.map(function(child) {
            var details = child.details || [];
            var newItemData = viewModel.fillTargetDataModelByCycleType(curRow, "detail", details);
            newItemData.customerId = child.customerId;
            newItemData.customerCode = child.customerCode;
            newItemData.customerName = child.customerName;
            return newItemData;
          })
          viewModel.complexItems.setSimpleData(newChildDatas, {
            unSelect: true
          });
          viewModel.goBillPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        });
      },
      //详情
      detail: function (index) {
        //确保grid先将行设置为focus状态
        if (typeof (index) !== 'number') {
          $("#bpmhead").html("");
          $("#bpmfoot").html("");
        }
        viewModel.complexCard.removeAllRows();
        viewModel.complexItems.removeAllRows();
        setTimeout(function () {
          var curRow = viewModel.complexList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id, function (maindata) {
            viewModel.complexDetailCard.setSimpleData(maindata);
            var curDetailRow = viewModel.complexDetailCard.getCurrentRow();
            var childDatas = maindata.targetCustomerItems;
            var newChildDatas = childDatas.map(function(child) {
              var details = child.details || [];
              var newItemData = viewModel.fillTargetDataModelByCycleType(curDetailRow, "detail", details);
              newItemData.customerId = child.customerId;
              newItemData.customerCode = child.customerCode;
              newItemData.customerName = child.customerName;
              return newItemData;
            })
            viewModel.complexItems.setSimpleData(newChildDatas, {
              unSelect: true
            });
            viewModel.goDetailPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          });

        }, 0);
      },
      //查询子表数据
      findByParentid: function (id, callback) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/detail",
          type: 'post',
          data: {
            id: id
          },
          success: function (data) {
            if (data) {
              if (typeof callback == "function") {
                callback(data);
              }
            } else {
              toastr.error();
            }
          }
        })
      },
      isAvailable: function () {
        return true;
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsCommonRef: function () {
        var refer = $("#refContainercustomerref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
        var curRow = viewModel.complexCard.getCurrentRow();
        var saleOrgId = curRow.getValue("saleOrgId");
        var cycleType = curRow.getValue("cycleType");
        if (!saleOrgId) {
          toastr.warning("请先选择销售组织！");
          return false;
        }
        if (!cycleType) {
          toastr.warning("请先选择返利周期！");
          return false;
        }
        // var condition = {
        //   EQ_isEnable: "1",
        //   EQ_isChannelCustomer: "1",
        //   EQ_SaleOrder: saleOrgId
        // };
        // $("#addItemsRef").attr(
        //   "data-refparam",
        //   JSON.stringify(u.extend({}, {}, condition))
        // );
        $("#addItemsRef .refer").trigger("click");
      },
      //新增子表项
      // addItem: function () {
      //   var itemRow = viewModel.complexItems.createEmptyRow({
      //     unSelect: true
      //   });
      //   var newItemData = viewModel.fillTargetDataModelByCycleType(cycleType, year, "add");
      //   itemRow.setSimpleData(newItemData);
      // },
      fillTargetDataModelByCycleType: function (curHeadRow, type, grandSonData) {
        var cycleType = curHeadRow.getValue("cycleType");
        var year = curHeadRow.getValue("year");
        var newItemData = {
          cycleType: cycleType,
          year: year
        };
        
        if (cycleType.indexOf("CUSTOM") > -1) {
          var startTime = curHeadRow.getValue("startTime");
          var endTime = curHeadRow.getValue("endTime");
          var datas = [{
            remark: "自定义",
            custom: "-1",
            label: startTime + "~" + endTime,
            target: ((grandSonData && grandSonData[0]) ? grandSonData[0].target : 0)
          }];
          newItemData["customDetail"] = datas;
          newItemData["details"] = datas;
          return newItemData;
        }
        var ifYear = false;
        var ifHyear = false;
        var ifSeason = false;
        var ifMonth = false;
        var yearAccountCol = 0; // 年度合计
        var hyearAccountCol = 0; // 半年合计
        var seasonAccountCol = 0; // 季度合计
        var hyearRow = 0;
        var seasonRow = 0;
        var monthRow = 0;
        if (cycleType.indexOf("YEAR") > -1) {
          ifYear = true;
        }
        if (cycleType.indexOf("HYEAR") > -1) {
          ifHyear = true;
          hyearRow = 1;
          if (ifYear) {
            yearAccountCol += 1;
          }
        }
        if (cycleType.indexOf("SEASON") > -1) {
          ifSeason = true;
          seasonRow = 1;
          if (ifYear) {
            yearAccountCol += 1;
          }
          if (ifHyear) {
            hyearAccountCol += 1;
            hyearRow += 2;
          }
        }
        if (cycleType.indexOf("MONTH") > -1) {
          ifMonth = true;
          monthRow = 1;
          if (ifHyear) {
            yearAccountCol += 1;
          }
          if (ifHyear) {
            hyearAccountCol += 1;
            hyearRow += 6;
          }
          if (ifSeason) {
            seasonAccountCol += 1;
            seasonRow += 3;
          }
        }
        var details = [];
        if (ifYear) {
          var datas = [{
            label: year,
            year: year,
            target: 0
          }];
          newItemData["yearDetails"] = datas;
          details = datas;
        }
        if (ifHyear) {
          var datas = [{
              label: "上半年",
              hyear: "1",
              target: 0,
              rowspan: "rowspan" + hyearRow
            },
            {
              label: "下半年",
              hyear: "2",
              target: 0,
              rowspan: "rowspan" + hyearRow
            }
          ];
          if (ifYear) {
            datas.push({
              label: "年度合计",
              year: year,
              yearAccount: 0,
              target: 0,
              colspan: "colspan" + yearAccountCol
            });
          }
          newItemData["hyearDetails"] = datas;
          details = datas;
        }
        if (ifSeason) {
          var datas = [];
          for (var i = 1; i <= 4; i++) {
            datas.push({
              label: "第" + i + "季度",
              season: i,
              target: 0,
              rowspan: "rowspan" + seasonRow
            });
            if (ifHyear && i % 2 == 0) {
              datas.push({
                label: i / 2 == 1 ? "上半年合计" : "下半年合计",
                hyear: i / 2,
                target: 0,
                hyearAccount: 0,
                colspan: "colspan" + hyearAccountCol
              });
            }
          }
          if (ifYear) {
            datas.push({
              label: "年度合计",
              year: year,
              yearAccount: 0,
              target: 0,
              colspan: "colspan" + yearAccountCol
            });
          }
          newItemData["seasonDetails"] = datas;
          details = datas;
        }
        if (ifMonth) {
          var datas = [];
          for (var i = 1; i <= 12; i++) {
            datas.push({
              label: i + "月",
              month: i,
              target: 0,
              rowspan: "rowspan" + monthRow
            });
            if (ifSeason && i % 3 == 0) {
              datas.push({
                label: "第" + (i / 3) + "季度合计",
                season: i / 3,
                seasonAccount: 0,
                target: 0,
                colspan: "colspan" + seasonAccountCol
              });
            }
            if (ifHyear && i % 6 == 0) {
              datas.push({
                label: i / 6 == 1 ? "上半年合计" : "下半年合计",
                hyear: i / 6,
                hyearAccount: 0,
                target: 0,
                colspan: "colspan" + hyearAccountCol
              });
            }
          }
          if (ifYear) {
            datas.push({
              label: "年度合计",
              year: year,
              yearAccount: 0,
              target: 0,
              colspan: "colspan" + yearAccountCol
            });
          }
          newItemData["monthDetails"] = datas;
          details = datas;
        }
        if (type != "add") {
          details.forEach(function (detail) {
            grandSonData.forEach(function (son) {
              if ((son.year && son.year == detail.year) || (son.hyear && son.hyear == detail.hyear) ||
                (son.season && son.season == detail.season) || (son.month && son.month == detail.month)
              ) {
                detail.target = son.target;
              }
            })
          });
          var totalCols = ["季度合计", "半年合计", "年度合计"];
          totalCols.forEach(function (key) {
            var startMonthIndex = 0;
            details.forEach(function (detail, index) {
              if (detail.label && detail.label.indexOf(key) > -1) {
                detail.target = viewModel.computeTarget(details, startMonthIndex, index);
                startMonthIndex = index;
              }
            });
          })
        }
        newItemData["details"] = details;
        return newItemData;
      },
      computeTarget: function (details, startIndex, endIndex) {
        var filterData = details.filter(function (detail, index) {
          return (startIndex <= index && index < endIndex) && detail.label.indexOf("合计") < 0;
        });
        if (filterData && filterData.length) {
          return filterData.reduce(function (total, currentValue) {
            return total += parseFloat(currentValue.target || "0");
          }, 0)
        }
        return 0;
      },
      //删除子表项
      delItems: function () {
        var selectedRows = viewModel.complexItems.getSelectedRows();
        viewModel.complexItems.removeRows(selectedRows, {
          forceDel: true
        });
      },
      delcomplexItemsRow: function (row) {
        var index = viewModel.complexItems.getIndexByRowId(row.rowId);
        viewModel.complexItems.removeRows([index], { forceDel: true });
      },

      //保存单据
      saveBill: function () {
        var result = app.compsValidateMultiParam({
          element: ".ui-bill-panel",
          showMsg: true
        });
        var passed = result.passed;
        if (!passed) {
          if (result.notPassedArr.length == 3) {
            passed = true;
          }
        }
        if (!passed) {
          return;
        }
        var complexData = viewModel.complexCard.getSimpleData()[0];
        var itemsData = viewModel.complexItems.getSimpleData();
        if (itemsData.length < 1) {
          toastr.warning("请维护表体信息");
          return;
        }
        var method = 'post';

        if (complexData.id) {
          method = 'put'
        }
        itemsData.forEach(function(item) {
          item.persistStatus = "new";
        })
        complexData.targetCustomerItems = itemsData;
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: method,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            toastr.success("保存成功");
            viewModel.retListPanel();
            viewModel.search();
          }
        })
      },
      billPanelStatusCheck: ko.pureComputed(function () {
        var curbillpanelstatus = viewModel.billPanelStatus();
        if (curbillpanelstatus == CONST.BILLPANELSTATUS.ADD || curbillpanelstatus == CONST.BILLPANELSTATUS.COPY) {
          return 1;
        }
        return 0;
      }),
      //取消单据
      cancelBill: function () {
        common.dialog.confirmDialog({
          msg1: '提示',
          msg2: '是否返回列表',
          width: '400px',
          onOk: function () {
            viewModel.retListPanel();
          }
        });
      },


      // 审批流程的相关按钮点击事件 - start
      // 提交
      submit: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var nodeJs = "/ocm-web/pages/rebate/saletarget/saletarget.js";
        var billTypeCode = "salesTargetMaintain";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      },

      // 收回
      unsubmit: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "salesTargetMaintain";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },

      // 审批通过
      approve: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "salesTargetMaintain";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.complexList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      // 审批不通过
      disapprove: function () {
        var listCompId = "complexList";
        var billTypeCode = "salesTargetMaintain";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.complexList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      // 取消审批
      cancelApprove: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "salesTargetMaintain";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.complexList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },
      // 审批流程的相关按钮点击事件 - end
    },
    afterCreate: function () {
      var refRow = viewModel.ItemRefList.createEmptyRow();
      viewModel.ItemRefList.setRowFocus(refRow);
      viewModel.ItemRefList.on("customerref.valuechange", function (obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainercustomerref").data("uui.refer");
        var refValues = refer.values;
        var curRow = viewModel.complexCard.getCurrentRow();
        var cycleType = curRow.getValue("cycleType");
        var year = curRow.getValue("year");
        refValues.forEach(function (item) {
          var itemRow = viewModel.complexItems.createEmptyRow({
            unSelect: true
          });
          var newItemData = viewModel.fillTargetDataModelByCycleType(curRow, "add");
          newItemData.customerId = item.id;
          newItemData.customerName = item.refname;
          newItemData.customerCode = item.refcode;
          itemRow.setSimpleData(newItemData);
        });
      });
      viewModel.complexCard.on("saleOrgId.valuechange", function(obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.complexItems.removeAllRows();
        }
      });
      viewModel.complexCard.on("cycleId.valuechange", function(obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.complexItems.removeAllRows();
          var refer = $("#refContainercycleIdBase").data("uui.refer");
          if (refer) {
            var refValue = refer.values[0];
            var curRow = viewModel.complexCard.getCurrentRow();
            curRow.setValue("year", refValue.year || "");
            curRow.setValue("cycleType", refValue.cycleType || "");
            curRow.setValue("startTime", refValue.startTime || "");
            curRow.setValue("endTime", refValue.endTime || "");
          }
        }
      });
      $(".target-grid-table").off("blur", "input").on("blur", "input", function (e) {
        if (!(/^\d+(\.{0,1}\d+){0,1}$/.test(e.target.value || 0))) {
          toastr.info("请输入非负数");
          return;
        }
        var rowId = $(this).parents("td").attr("data-rowid");
        var curRow = viewModel.complexCard.getCurrentRow();
        var cycleType = curRow.getValue("cycleType");
        var year = curRow.getValue("year");
        var curItemsRow = viewModel.complexItems.getRowByRowId(rowId);
        var items = curItemsRow.getSimpleData();
        var details = items.details;
        var newItemData = viewModel.fillTargetDataModelByCycleType(curRow, "edit", details);
        items.details = newItemData.details;
        curItemsRow.setSimpleData(items);
      });
    }
  });
  return view;
});