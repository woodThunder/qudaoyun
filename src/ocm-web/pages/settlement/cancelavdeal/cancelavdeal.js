define(['text!./cancelavdeal.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
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
      shouldReceivable: new u.DataTable(model.options.metas.claimbillList),
      complexItems: new u.DataTable(model.options.metas.claimbillItem),

      searchcomp: {},
      search2comp: {},
      searchSource: model.options.searchs.search1,
      search2Source: model.options.searchs.search2,
      button1Source: model.options.buttons.button1,

      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
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
      //核销结果按组选择
      selectByGroup: function(obj) {
        var gridObj = obj.gridObj,
          dataTableId = gridObj.dataTable.id,
          allRows = viewModel.complexItems.getAllRows(),
          curRow = viewModel.complexItems.getRow(obj.rowIndex),
          sameRows = viewModel.complexItems.getRowsByField('num', curRow.getValue('num'));
        if (sameRows.length > 1) {
          var cRowId = sameRows[0].rowId != curRow.rowId ? sameRows[0].rowId : sameRows[1].rowId;
          for (var i = 0, len = allRows.length; i < len; i++) {
            var rowId = allRows[i].rowId;
            if (rowId == cRowId) {
              viewModel.complexItems.addRowSelect(i);
              break;
            }
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
      //自动填写核销金额
      autoSetMoney: function(obj) {
        var curRow,
          gridObj = obj.gridObj,
          dataTableId = gridObj.dataTable.id;
        if (dataTableId == 'salesorderList') {
          curRow = viewModel.salesorderList.getRow(obj.rowIndex);
        } else {
          curRow = viewModel.shouldReceivable.getRow(obj.rowIndex);
        }
        if (obj.rowIndex == viewModel.seleIndex && viewModel.butSetMoney != 0) {
          curRow.setValue('caMoney', viewModel.butSetMoney);
          viewModel.butSetMoney = 0;
          viewModel.seleIndex = 0;
        } else {
          curRow.setValue('caMoney', obj.rowObj.value.remainMoney);
        }
        // return true;
      },
      //自动清除核销金额
      autoUnSetMoney: function(obj) {
        var curRow;
        var gridObj = obj.gridObj;
        var dataTableId = gridObj.dataTable.id;
        if (dataTableId == 'salesorderList') {
          curRow = viewModel.salesorderList.getRow(obj.rowIndex);
        } else {
          curRow = viewModel.shouldReceivable.getRow(obj.rowIndex);
        }
        curRow.setValue('caMoney', '');
      },
      //收款金额
      accordingToBill: function(obj, e) {
        var target = e.target,
          tP = $(target).parent(),
          sumSpan, allRows = [],
          isFirst = true,
          sumMoney,
          remMoney = 0,
          curRow,
          setUnSelect = false;
        if (tP.hasClass('receiptbill')) {
          sumSpan = $('#operateBar div.receiptbill span').first();
          allRows = viewModel.shouldReceivable.getAllRows();
        } else {
          sumSpan = $('#operateBar div.duebill span').first();
          allRows = viewModel.salesorderList.getAllRows();
          isFirst = false;
        }
        sumMoney = parseFloat(sumSpan.text());
        if (sumMoney && sumMoney != '0.00' && sumMoney != '0') {
          for (var i = 0; i < allRows.length; i++) {
            if (setUnSelect) {
              if (isFirst) {
                viewModel.shouldReceivable.setRowUnSelect(i);
              } else {
                viewModel.salesorderList.setRowUnSelect(i);
              }
            } else {
              var iReM = parseFloat(allRows[i].getValue('remainMoney'));
              if (sumMoney < 0 && iReM >= 0) {
                continue;
              }
              remMoney += iReM;
              if (isFirst) {
                var arrs = viewModel.shouldReceivable.getSelectedIndices();
                if ($.inArray(i, arrs) == -1) {
                  viewModel.shouldReceivable.addRowSelect(i);
                } else {
                  curRow = viewModel.shouldReceivable.getRow(i);
                }
              } else {
                var arrs = viewModel.salesorderList.getSelectedIndices();
                if ($.inArray(i, arrs) == -1) {
                  viewModel.salesorderList.addRowSelect(i);
                } else {
                  curRow = viewModel.salesorderList.getRow(i);
                }
              }
              // if (sumMoney < 0) {

              // } else {
              if (remMoney >= sumMoney) {
                var thisReMoney = (parseFloat(allRows[i].getValue('remainMoney'))).toFixed(2),
                  mine = (Math.abs(remMoney) - Math.abs(sumMoney)).toFixed(2);
                var minusSum = parseFloat(Math.abs(thisReMoney)) - parseFloat(mine);
                viewModel.butSetMoney = minusSum.toFixed(2);
                if (curRow) {
                  if (sumMoney < 0) {
                    curRow.setValue('caMoney', '-' + viewModel.butSetMoney)
                  } else {
                    curRow.setValue('caMoney', viewModel.butSetMoney)
                  }
                }
                viewModel.seleIndex = i; //rowIndex
                setUnSelect = true;
              } else {
                viewModel.butSetMoney = false;
                viewModel.seleIndex = 0;
              }
              // }
            }
          }
        } else {
          toastr.warning('请先选择数据！')
        }
      },
      //核销
      cancelVerification: function() {
        var ysList = viewModel.shouldReceivable.getSelectedRows(),
          skList = viewModel.salesorderList.getSelectedRows();
        if (!ysList.length || !skList.length) {
          toastr.warning("收款单和应收单的数据都要选择!");
          return;
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + '/add',
          type: 'post',
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.salesorderList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
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
            viewModel.butSetMoney = 0;
            viewModel.seleIndex = 0;
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
      search: function(reindex) {
        if (reindex) {
          viewModel.salesorderList.pageIndex(0);
        }
        viewModel.salesorderList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var shouldBill = {},
          receiveBill = {};
        if (queryData.search_EQ_financeOrg) {
          shouldBill.search_EQ_financeOrg = queryData.search_EQ_financeOrg;
          receiveBill.search_EQ_financeOrg = queryData.search_EQ_financeOrg;
        } else {
          if (viewModel.searchTime != 0) {
            toastr.warning('请选择财务组织!');
          }
          viewModel.searchTime++;
          return;
        }
        if (queryData.search_EQ_customer) {
          shouldBill.search_EQ_customer = queryData.search_EQ_customer;
          receiveBill.search_EQ_customer = queryData.search_EQ_customer;
        } else {
          if (viewModel.searchTime != 0) {
            toastr.warning('请选择客户!');
          }
          return;
        }
        if (queryData.search_EQ_saleOrg) {
          shouldBill.search_EQ_saleOrg = queryData.search_EQ_saleOrg;
          receiveBill.search_EQ_saleOrg = queryData.search_EQ_saleOrg;
        } else {
          if (viewModel.searchTime != 0) {
            toastr.warning('请选择销售组织!');
          }
          return;
        }
        if (queryData.search_GTE_endDate_date) {
          shouldBill['search_GTE_billReceivableDetailsDtos.endDate_date'] = queryData.search_GTE_endDate_date
        }
        if (queryData.search_LT_endDate_date) {
          shouldBill['search_LT_billReceivableDetailsDtos.endDate_date'] = queryData.search_LT_endDate_date
        }
        if (queryData.search_GTE_billdate_date) {
          shouldBill.search_GTE_billdate_date = queryData.search_GTE_billdate_date
        }
        if (queryData.search_LT_billdate_date) {
          shouldBill.search_LT_billdate_date = queryData.search_LT_billdate_date
        }
        if (queryData.search_LIKE_billReceivableCode) {
          shouldBill.search_LIKE_billReceivableCode = queryData.search_LIKE_billReceivableCode
        }
        if (queryData.search_GTE_billreceiptTime_date) {
          receiveBill.search_GTE_billreceiptTime_date = queryData.search_GTE_billreceiptTime_date;
        }
        if (queryData.search_LT_billreceiptTime_date) {
          receiveBill.search_LT_billreceiptTime_date = queryData.search_LT_billreceiptTime_date;
        }
        if (queryData.search_LIKE_code) {
          receiveBill.search_LIKE_code = queryData.search_LIKE_code;
        }
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + '/query-billReceiptDataCount',
          dataType: "json",
          data: receiveBill,
          success: function(data) {
            viewModel.salesorderList.setSimpleData(data, {
              unSelect: true
            });
          }
        });
        $._ajax({
          type: "get",
          url: appCtx + '/settlement/receivablebills/query-billReceivableDataCount',
          dataType: "json",
          data: shouldBill,
          success: function(data) {
            viewModel.shouldReceivable.setSimpleData(data, {
              unSelect: true
            });
          }
        })
      },
      //清空搜索条件
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
        // var pageSize = viewModel.salesorderList.pageSize();
        // var pageNumber = viewModel.salesorderList.pageIndex();
        // queryData.page = pageNumber;
        // queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + '/settlement/check-list-alls/getAll',
          // url: appCtx + '/settlement/check-list-alls',
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.complexItems.setSimpleData(data, {
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
      saveBill: function() {
        var allRowsUp = viewModel.salesorderList.getSelectedRows(),
          allRowsDown = viewModel.shouldReceivable.getSelectedRows();
        if (allRowsUp.length == 0 && allRowsDown.length == 0) {
          toastr.error("请选择行并录入相关数据！");
          return;
        }
        var arrR = [],
          arrS = [],
          spans = $('#operateBar div span');
        if ($(spans[0]).text() != $(spans[1]).text()) {
          toastr.warning('选择的收款单总全额必须等于选择的应收单总金额！');
          return;
        }
        for (var u = 0; u < allRowsUp.length; u++) {
          arrR.push(allRowsUp[u].getSimpleData());
        }
        for (var d = 0; d < allRowsDown.length; d++) {
          arrS.push(allRowsDown[d].getSimpleData());
        }
        var qureryData = {
          liBillReceiptDetailDto: arrR,
          liBillReceivableDetailDto: arrS
        }
        $._ajax({
          url: appCtx + '/settlement/check-list-alls/beginCheck',
          type: 'post',
          data: JSON.stringify(qureryData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            $(spans[0]).text('0.00');
            $(spans[1]).text('0.00');
            toastr.success();
            viewModel.search();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.complexList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
    },
    afterCreate: function() {
      $.fn.collapsepanel(false, true);
      app = viewModel.app
      //本次核销金额
      viewModel.salesorderList.on('caMoney.valuechange', function(obj) {
        if (obj.newValue == obj.oldValue) {
          return;
        }
        var curRow = viewModel.salesorderList.getRowByRowId(obj.rowId),
          restMoney = curRow.getValue('remainMoney');
        if (Math.abs(obj.newValue) > Math.abs(restMoney)) {
          toastr.warning('本次核销金额必须小于等于余额！')
          viewModel.salesorderList.setValue('caMoney', restMoney);
          return;
        }
        if (restMoney > 0 && obj.newValue < 0) {
          toastr.warning('本次核销金额必须小于等于余额！')
          viewModel.salesorderList.setValue('caMoney', restMoney);
          return;
        }
        if (restMoney < 0 && obj.newValue > 0) {
          toastr.warning('本次核销金额必须小于等于余额！')
          viewModel.salesorderList.setValue('caMoney', restMoney);
          return;
        }
        var sumSpan = $('#operateBar div.receiptbill span').first(),
          sumMoney = 0;
        var seleRows = viewModel.salesorderList.getSelectedRows();
        for (var i = 0; i < seleRows.length; i++) {
          var val = parseFloat(seleRows[i].getValue('caMoney'));
          sumMoney = parseFloat(sumMoney) + val;
        }
        sumSpan.text(sumMoney.toFixed(2));
      });
      viewModel.shouldReceivable.on('caMoney.valuechange', function(obj) {
        if (obj.newValue == obj.oldValue) {
          return;
        }
        var curRow = viewModel.shouldReceivable.getRowByRowId(obj.rowId),
          restMoney = curRow.getValue('uncancellationMoney');
        if (Math.abs(obj.newValue) > Math.abs(restMoney)) {
          viewModel.shouldReceivable.setValue('caMoney', restMoney);
          toastr.warning('本次核销金额必须小于等于余额！')
          return;
        }
        if (restMoney > 0 && obj.newValue < 0) {
          toastr.warning('本次核销金额必须小于等于余额！')
          viewModel.shouldReceivable.setValue('caMoney', restMoney);
          return;
        }
        if (restMoney < 0 && obj.newValue > 0) {
          toastr.warning('本次核销金额必须小于等于余额！')
          viewModel.shouldReceivable.setValue('caMoney', restMoney);
          return;
        }
        var sumSpan = $('#operateBar div.duebill span').first(),
          sumMoney = 0;
        var seleRows = viewModel.shouldReceivable.getSelectedRows();
        for (var i = 0; i < seleRows.length; i++) {
          var val = parseFloat(seleRows[i].getValue('caMoney'));
          sumMoney = parseFloat(sumMoney) + val;
        }
        sumSpan.text(sumMoney.toFixed(2));
      });
      // 列表查询数据(无查询条件)
      // viewModel.search();
      //选择往来对象
      // viewModel.complexList.on("dealObject.valuechange", function(obj) {
      //   if (!obj.newValue) {
      //     return;
      //   }
      //   var newVal = obj.newValue,
      //     cusComp = viewModel.app.getComp("customerId"),
      //     depComp = viewModel.app.getComp("department"),
      //     saleComp = viewModel.app.getComp("saleman"),
      //     logComp = viewModel.app.getComp("logisticsCompany");

      //   switch (newVal) {
      //     case '1':
      //       cusComp.setEnable(true);
      //       depComp.setEnable(false);
      //       saleComp.setEnable(false);
      //       logComp.setEnable(false);
      //       viewModel.complexList.setValue("department", '');
      //       viewModel.complexList.setValue("saleman", '');
      //       viewModel.complexList.setValue("logisticsCompany", '');
      //       break;
      //     case '2':
      //       cusComp.setEnable(false);
      //       depComp.setEnable(true);
      //       saleComp.setEnable(false);
      //       logComp.setEnable(false);
      //       viewModel.complexList.setValue("customerId", '');
      //       viewModel.complexList.setValue("saleman", '');
      //       viewModel.complexList.setValue("logisticsCompany", '');
      //       break;
      //     case '3':
      //       cusComp.setEnable(false);
      //       depComp.setEnable(false);
      //       saleComp.setEnable(true);
      //       logComp.setEnable(false);
      //       viewModel.complexList.setValue("department", '');
      //       viewModel.complexList.setValue("customerId", '');
      //       viewModel.complexList.setValue("logisticsCompany", '');
      //       break;
      //     case '4':
      //       cusComp.setEnable(false);
      //       depComp.setEnable(false);
      //       saleComp.setEnable(false);
      //       logComp.setEnable(true);
      //       viewModel.complexList.setValue("department", '');
      //       viewModel.complexList.setValue("saleman", '');
      //       viewModel.complexList.setValue("customerId", '');
      //       break;
      //   }
      // });
      // viewModel.complexList.on("payAccount.valuechange", function(obj) {
      //   if (!obj.newValue) {
      //     return;
      //   }
      //   var itemAllRows = viewModel.complexItems.getAllRows(),
      //     newVal = obj.newValue;
      //   for (var i = 0, len = itemAllRows.length; i < len; i++) {
      //     itemAllRows[i].setValue('payAccount', newVal);
      //   }
      // });
      // viewModel.complexList.on("receiptAccount.valuechange", function(obj) {
      //   if (!obj.newValue) {
      //     return;
      //   }
      //   var itemAllRows = viewModel.complexItems.getAllRows(),
      //     newVal = obj.newValue;
      //   for (var i = 0, len = itemAllRows.length; i < len; i++) {
      //     itemAllRows[i].setValue('receiptAccount', newVal);
      //   }
      // });
      // viewModel.complexItems.on("money.valuechange", function(obj) {
      // if (!obj.newValue) {
      //   return;
      // }
      // var newVal = obj.newValue,
      //   itemAllRows = viewModel.complexItems.getAllRows(),
      //   sumMoney = 0;
      // for (var i = 0, len = itemAllRows.length; i < len; i++) {
      //   sumMoney += parseFloat(itemAllRows[i].getValue('money'));
      // }
      // viewModel.complexList.setValue('money', sumMoney);
      // });
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2b/enum-service/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.occ.settlement.enums.BillClaimStateEnum"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.logisticsModeEnum = newarray;
      //   }
      // });
    }
  });

  return view;
});