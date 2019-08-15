define(['text!./autodeal.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
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
      baseurl: '/b2c/gathers',
      salesorderList: new u.DataTable(model.options.metas.soitemmeta), //列表
      rulsItemList: new u.DataTable(model.options.metasrulsItem),
      shouldReceivable: new u.DataTable(model.options.metas.claimbillList),
      complexItems: new u.DataTable(model.options.metas.claimbillItem),

      searchcomp: {},
      search2comp: {},
      search1Source: model.options.searchs.search1,
      search2Source: model.options.searchs.search2,
      button1Source: model.options.buttons.button1,
      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,

      grid3Option: model.options.grids.grid3,
      searchTime: 0,
      searchTime2: 0,


      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      butSetMoney: 0,
      seleIndex: 0,

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
      billTypeSrc: [{
        value: '1',
        name: '收款单'
      }, {
        value: '2',
        name: '应收单'
      }, ],
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      enableFmt: ko.pureComputed(function() {
        var enableStatus = viewModel.complexList.ref("enableStatus")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      cgObj: ko.pureComputed(function() {
        var enableStatus = viewModel.complexList.ref("dealObject")();
        switch (enableStatus) {
          case "1":
            return enableStatus = "客户";
            break;
          case "2":
            return enableStatus = "部门";
            break;
          case "3":
            return enableStatus = "业务员";
            break;
          case "4":
            return enableStatus = "物流公司"
            break;
        }
      }),
      claimStateDetail: ko.pureComputed(function() {
        var enableStatus = viewModel.complexList.ref("cliamState")();
        switch (enableStatus) {
          case "1":
            return enableStatus = "待认领";
            break;
          case "2":
            return enableStatus = "部分认领";
            break;
          case "3":
            return enableStatus = "全部认领";
            break;
        }
      }),
    },
    rendertype: {
      operationStr: function(obj, funcName, title) {
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
        var state = obj.row.value.state;
        if (state == '1' || state == '6') {
          // 可编辑,可提交,可删除
          str = viewModel.operationStr(obj, 'showEditBillPanel', '编辑').concat(viewModel.operationStr(obj, 'commit', '提交')).concat(viewModel.operationStr(obj, 'del', '删除'));
        } else if (state == '2') {
          // 已提交收款单，尚未审批 . 可收回,可审批
          str = viewModel.operationStr(obj, 'commitRollback', '收回') + viewModel.operationStr(obj, 'audit', '审批');
        } else if (state == '3') {
          // 已审批收款单 .  目前没操作
          str = viewModel.operationStr(obj, 'unapprove', '取消审批');
        }
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      enableStatusRender: common.rendertype.enableRender,
      detailRender: common.rendertype.detailRender,
      claimState: function(params) {
        // params.element.innerHTML = "待认领";
        /*默认1表示已启用，0表示未启用 ，2表示已停用 */
        if (params.value == 1 || params.value == "1") {
          params.element.innerHTML = "待认领";
        }
        if (params.value == 2 || params.value == "2") {
          params.element.innerHTML = "部分认领";
        }
        if (params.value == 3 || params.value == "3") {
          params.element.innerHTML = "全部认领";
        }
      },
    },
    events: {
      //核销
      commitFun: function() {
        var sList = viewModel.salesorderList.getSimpleData(),
          ruls = viewModel.rulsItemList.getSimpleData(),
          mainList = {};
        if (sList.length) {
          if (sList[0].financeOrgId) {
            mainList.EQ_financeOrg = sList[0].financeOrgId;
          } else {
            toastr.warning('请输入财务组织！')
            return;
          }
          if (sList[0].saleOrgId) {
            mainList.EQ_saleOrg = sList[0].saleOrgId;
          }
          if (sList[0].customerId) {
            mainList.EQ_customer = sList[0].customerId;
          }
          if (sList[0].billreceiptTime) {
            mainList.GTE_billreceiptTime_date = sList[0].billreceiptTime;
          }
          if (sList[0].billreceiptTimeE) {
            mainList.LT_billreceiptTime_date = sList[0].billreceiptTimeE;
          }
          if (sList[0].code) {
            mainList.LIKE_code = sList[0].code;
          }
          if (sList[0].endDate) {
            mainList.GTE_endDate_date = sList[0].endDate;
          }
          if (sList[0].endDateE) {
            mainList.LT_endDate_date = sList[0].endDateE;
          }
          if (sList[0].billdate) {
            mainList.GTE_billdate_date = sList[0].billdate;
          }
          if (sList[0].billdateE) {
            mainList.LT_billdate = sList[0].billdateE;
          }
          if (sList[0].billReceivableCode) {
            mainList.LIKE_code_receivable = sList[0].billReceivableCode;
          }
        }
        var orules = ruls[0];
        for (var key in orules) {
          if (orules[key] == null) {
            orules[key] = 0;
          }
        }
        orules.saleDepartment = 0;
        orules.saleManager = 0;
        var qureryData = {
          request: mainList,
          checkRuleDto: orules
        }
        $._ajax({
          url: appCtx + '/settlement/check-list-alls/beginAutomaticCheck',
          type: 'post',
          data: JSON.stringify(qureryData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            toastr.success();
          }
        })
      },
      //清空
      clearFun: function() {
        viewModel.salesorderList.removeAllRows();
        viewModel.rulsItemList.removeAllRows();
        viewModel.salesorderList.createEmptyRow();
        viewModel.rulsItemList.createEmptyRow();
        viewModel.rulsItemList.setValue('customer', 1)
        viewModel.rulsItemList.setValue('saleOrg', 1)
      },

      //核销结果按组选择
      selectByGroup: function(obj) {
        var gridObj = obj.gridObj,
          dataTableId = gridObj.dataTable.id,
          allRows = viewModel.complexItems.getAllRows(),
          curRow = viewModel.complexItems.getRow(obj.rowIndex),
          sameRows = viewModel.complexItems.getRowsByField('num', curRow.getValue('num'));
        var cRowId = sameRows[0].rowId != curRow.rowId ? sameRows[0].rowId : sameRows[1].rowId;
        for (var i = 0, len = allRows.length; i < len; i++) {
          var rowId = allRows[i].rowId;
          if (rowId == cRowId) {
            viewModel.complexItems.addRowSelect(i);
            break;
          }
        }
      },
      unSelectByGroup: function(obj) {
        var gridObj = obj.gridObj,
          dataTableId = gridObj.dataTable.id,
          allRows = viewModel.complexItems.getAllRows(),
          curRow = viewModel.complexItems.getRow(obj.rowIndex),
          sameRows = viewModel.complexItems.getRowsByField('num', curRow.getValue('num'));
        var cRowId = sameRows[0].rowId != curRow.rowId ? sameRows[0].rowId : sameRows[1].rowId;
        for (var i = 0, len = allRows.length; i < len; i++) {
          var rowId = allRows[i].rowId;
          if (rowId == cRowId) {
            viewModel.complexItems.setRowUnSelect(i);
            break;
          }
        }
      },
      //取消核销
      rebackCancelVerification: function() {
        var allSelRows = viewModel.complexItems.getSelectedRows(),
          arr = [];
        for (var i = 0, len = allSelRows.length; i < len; i++) {
          arr.push(allSelRows[i].getSimpleData());
        }
        $._ajax({
          url: appCtx + '/settlement/check-list-alls/backCheck',
          type: 'post',
          data: JSON.stringify(arr),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            toastr.success();
            viewModel.search2();
          }
        })
      },
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.complexList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
        }
        common.dialog.confirmDialog({
          msg1: '确认删除这些项？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function() {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/delete",
              type: "post",
              // data: "ids=" + ids.join(","),
              data: {
                ids: ids.join(",")
              },
              success: function(data) {
                viewModel.complexList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {},
      // search: function(reindex) {
      //   if (reindex) {
      //     viewModel.salesorderList.pageIndex(0);
      //   }
      //   viewModel.salesorderList.removeAllRows();
      //   var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
      //   var shouldBill = {},
      //     receiveBill = {};
      //   if (queryData.EQ_financeOrg) {
      //     shouldBill.EQ_financeOrg = queryData.EQ_financeOrg;
      //     receiveBill.EQ_financeOrg = queryData.EQ_financeOrg;
      //   } else {
      //     if (viewModel.searchTime != 0) {
      //       toastr.warning('请选择财务组织!');
      //     }
      //     viewModel.searchTime++;
      //     return;
      //   }
      //   if (queryData.EQ_customer) {
      //     shouldBill.EQ_customer = queryData.EQ_customer;
      //     receiveBill.EQ_customer = queryData.EQ_customer;
      //   } else {
      //     if (viewModel.searchTime != 0) {
      //       toastr.warning('请选择客户!');
      //     }
      //     return;
      //   }
      //   if (queryData.EQ_saleOrg) {
      //     shouldBill.EQ_saleOrg = queryData.EQ_saleOrg;
      //     receiveBill.EQ_saleOrg = queryData.EQ_saleOrg;
      //   } else {
      //     if (viewModel.searchTime != 0) {
      //       toastr.warning('请选择销售组织!');
      //     }
      //     return;
      //   }
      //   if (queryData.GTE_endDate_date) {
      //     shouldBill['GTE_billReceivableDetailsDtos.endDate_date'] = queryData.GTE_endDate_date
      //   }
      //   if (queryData.LT_endDate_date) {
      //     shouldBill['LT_billReceivableDetailsDtos.endDate_date'] = queryData.LT_endDate_date
      //   }
      //   if (queryData.GTE_billdate_date) {
      //     shouldBill.GTE_billdate_date = queryData.GTE_billdate_date
      //   }
      //   if (queryData.LT_billdate_date) {
      //     shouldBill.LT_billdate_date = queryData.LT_billdate_date
      //   }
      //   if (queryData.LIKE_billReceivableCode) {
      //     shouldBill.LIKE_billReceivableCode = queryData.LIKE_billReceivableCode
      //   }
      //   if (queryData.GTE_billreceiptTime_date) {
      //     receiveBill.GTE_billreceiptTime_date = queryData.GTE_billreceiptTime_date;
      //   }
      //   if (queryData.LT_billreceiptTime_date) {
      //     receiveBill.LT_billreceiptTime_date = queryData.LT_billreceiptTime_date;
      //   }
      //   if (queryData.LIKE_code) {
      //     receiveBill.LIKE_code = queryData.LIKE_code;
      //   }
      //   $._ajax({
      //     type: "get",
      //     url: appCtx + viewModel.baseurl + '/query-billReceiptDataCount',
      //     dataType: "json",
      //     data: receiveBill,
      //     success: function(data) {
      //       viewModel.salesorderList.setSimpleData(data, {
      //         unSelect: true
      //       });
      //     }
      //   });
      //   $._ajax({
      //     type: "get",
      //     url: appCtx + '/settlement/receivablebills/query-billReceivableDataCount',
      //     dataType: "json",
      //     data: shouldBill,
      //     success: function(data) {
      //       viewModel.shouldReceivable.setSimpleData(data, {
      //         unSelect: true
      //       });
      //     }
      //   })
      // },
      // //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      search2: function(reindex) {
        if (reindex) {
          viewModel.complexItems.pageIndex(0);
        }
        viewModel.complexItems.removeAllRows();
        var queryData = viewModel.search2comp.getDataWithOpr ? viewModel.search2comp.getDataWithOpr() : {};
        if (!queryData.search_EQ_financeOrg) {
          if (viewModel.searchTime2 != 0) {
            toastr.warning('请选择财务组织!');
          }
          viewModel.searchTime2++;
          return
        }
        $._ajax({
          type: "get",
          url: appCtx + '/settlement/check-list-alls',
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.complexItems.setSimpleData(data.content, {
              unSelect: true
            });
          }
        });
      },
      //清空搜索条件
      cleanSearch2: function() {
        viewModel.search2comp.clearSearch();
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
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.complexList.getCurrentRow();
          var id = curRow.getValue("id");
          console.log(curRow.getValue('billclaimDetailDto'));
          viewModel.findByParentid(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/findByParentid",
          type: 'post',
          async: false,
          data: {
            id: id
          },
          success: function(data) {
            viewModel.complexItems.setSimpleData(data);
          }
        })
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
      /**
       * rows DataTable.Row 对象数组
       * predicateFunc 谓言函数
       * callback 过滤后的 row 数组的执行函数
       */
      filterRowAndSubmit: function(rows, predicateFunc, callback) {
        var newRows = rows.filter(function(row, index) {
          return typeof predicateFunc == 'function' ? predicateFunc(row) : true;
        });
        if (callback && typeof callback == 'function') {
          callback(newRows);
        }
        return newRows;
      },
      commitRollback: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.complexList.getSelectedRows();
        if (rows.length < 1) {
          toastr.warning("请先选择一行数据");
          return
        }
        viewModel.filterRowAndSubmit(rows, function(data) {
          return data.getValue('state') == '2';
        }, function(datas) {
          if (datas.length > 0) {
            common.dialog.confirmDialog({
              msg1: '确认收回这些项？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function() {
                var ids = datas.map(function(item) {
                  return item.getValue('id');
                });
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/unsend",
                  type: "post",
                  data: {
                    id: ids
                  },
                  success: function(data) {
                    rows.forEach(function(item, index) {
                      item.setValue('state', '1');
                      item.setValue('operation', '1');
                    });
                    toastr.success();
                  }
                });
              }
            });
          } else {
            toastr.warning("没有可以收回的数据");
          }
        });
      },
      //保存单据
      // saveBill: function() {
      //   var allRowsUp = viewModel.salesorderList.getSelectedRows(),
      //     allRowsDown = viewModel.shouldReceivable.getSelectedRows();
      //   if (allRowsUp.length == 0 && allRowsDown.length == 0) {
      //     toastr.error("请选择行并录入相关数据！");
      //     return;
      //   }
      //   var arrR = [],
      //     arrS = [],
      //     spans = $('#operateBar div span');
      //   if ($(spans[0]).text() != $(spans[1]).text()) {
      //     toastr.warning('选择的收款单总全额必须等于选择的应收单总金额！');
      //     return;
      //   }
      //   for (var u = 0; u < allRowsUp.length; u++) {
      //     arrR.push(allRowsUp[u].getSimpleData());
      //   }
      //   for (var d = 0; d < allRowsDown.length; d++) {
      //     arrS.push(allRowsDown[d].getSimpleData());
      //   }
      //   var qureryData = {
      //     liBillReceiptDetailDto: arrR,
      //     liBillReceivableDetailDto: arrS
      //   }
      //   $._ajax({
      //     url: appCtx + '/settlement/check-list-alls/beginCheck',
      //     type: 'post',
      //     data: JSON.stringify(qureryData),
      //     contentType: "application/json; charset=utf-8",
      //     success: function(data) {
      //       $(spans[0]).text('0.00');
      //       $(spans[1]).text('0.00');
      //       toastr.success();
      //       viewModel.search();
      //     }
      //   })
      // },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.complexList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
    },
    afterCreate: function() {
      $.fn.collapsepanel(false, true);
      app = viewModel.app;
      viewModel.rulsItemList.createEmptyRow();
      viewModel.salesorderList.createEmptyRow();
    }
  });

  return view;
});