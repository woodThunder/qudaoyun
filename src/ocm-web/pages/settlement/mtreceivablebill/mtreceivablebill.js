define(['text!./mtreceivablebill.html', 'ocm_common', 'ocm_baseview', './meta.js', "../../flow/bpmapproveref/bpmopenbill.js"], function(tpl, common, baseview, model, bpmopenbill) {
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
      baseurl: '/settlement/receivablebills',
      applicationUrl: '/settlement/receivablebills',
      complexList: new u.DataTable(model.options.metas.soitemmeta),
      detailList: new u.DataTable(model.options.metas.soitemmeta),
      complexItems: new u.DataTable(model.options.metas.soitemmetaItem),
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,

      card1Source: model.options.cards.card1,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,

      // 行号池
      curRowNum: ko.observable(0),

      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
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
      isCheckReceivableSrc: [{
        value: 0,
        name: '否'
      }, {
        value: 1,
        name: '是'
      }, ],
      billStateSrc: [{
        value: 1,
        name: '保存'
      }, {
        value: 2,
        name: '已提交'
      }, {
        value: 3,
        name: '审批通过'
      }, {
        value: 4,
        name: '审批中'
      }, {
        value: '6',
        name: '审批不通过'
      }],
      //来往对象
      dealObjectSrc: [{
        value: '1',
        name: '客户'
      }, {
        value: '2',
        name: '部门'
      }, {
        value: '3',
        name: '业务员'
      }, {
        value: '4',
        name: '物流公司'
      }],
      isnitSrc: ko.pureComputed(function() {
        var enableStatus = viewModel.detailList.ref("isnit")();
        switch (enableStatus) {
          case 0:
            return "否";
          case 1:
            return "是";
          default:
            return "否";
        }
      }),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      enableFmt: ko.pureComputed(function() {
        var enableStatus = viewModel.complexList.ref("enableStatus")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      // 从行号池中拿到最新的行号
      generaterowNum: function(num) {
        viewModel.curRowNum(parseInt(num));
        var latestnum = viewModel.curRowNum(),
          newnum = parseFloat(latestnum) + 10;
        viewModel.curRowNum(newnum);
        return newnum;
      },
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
        var enableStatus = viewModel.detailList.ref("cliamState")();
        switch (enableStatus) {
          case 1:
            return enableStatus = "待认领";
            break;
          case 2:
            return enableStatus = "部分认领";
            break;
          case 3:
            return enableStatus = "全部认领";
            break;
          default:
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
        var billState = obj.row.value.billState;
        var isCheckReceivable = obj.row.value.isCheckReceivable
        if (billState == '1' || billState == '6') {
          // 可编辑,可提交,可删除
          str = viewModel.operationStr(obj, 'showEditBillPanel', '编辑').concat(viewModel.operationStr(obj, 'submitCusReqForm', '提交')).concat(viewModel.operationStr(obj, 'del', '删除'));
        } else if (billState == '2') {
          // 已提交收款单，尚未审批 . 可收回,可审批
          str = viewModel.operationStr(obj, 'unsubmitCusReqForm', '收回') + viewModel.operationStr(obj, 'approveCusReqForm', '审批');
        } else if (billState == '3') {
          // 已审批收款单 .  目前没操作
          if (isCheckReceivable == 0)
            str = viewModel.operationStr(obj, 'cancelApproveCusReqForm', '取消审批');
        }
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      enableStatusRender: common.rendertype.enableRender,
      detailRender: common.rendertype.detailRender,
      claimOrderState: function(params) {
        switch (params.value) {
          case '1':
            params.element.innerHTML = "待认领";
            break;
          case '2':
            params.element.innerHTML = "部分认领";
            break;
          case '3':
            params.element.innerHTML = "全部认领";
            break;
          default:
        }
      },
      claimState: function(params) {
        switch (params.value) {
          case '1':
            params.element.innerHTML = "保存";
            break;
          case '2':
            params.element.innerHTML = "提交";
            break;
          case '3':
            params.element.innerHTML = "审批通过";
            break;
          case '4':
            params.element.innerHTML = "审批中";
            break;
          case '5':
            params.element.innerHTML = "收回";
            break;
          case '6':
            params.element.innerHTML = "审批不过";
            break;
          default:
        }
      },
    },
    events: {
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var ids = [],
          removeRows = [];
        var rows = viewModel.complexList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            if (rows[i].getValue('billState') == '3' || rows[i].getValue('billState') == '2') {
              toastr.warning('被“提交”和“审批通过”的认领单不能被删除！')
              continue;
            } else {
              ids.push(rows[i].getValue("id"));
              removeRows.push(rows[i]);
            }
          }
        }
        if (!ids.length) {
          return;
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
                viewModel.search();
                // viewModel.complexList.removeRows(removeRows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
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
          url: appCtx + viewModel.baseurl + '/find',
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.complexList.setSimpleData(data.content, {
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
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.complexList.createEmptyRow();
        $('div.visibleTrue').removeClass('visibleTrue').addClass('visibleFalse');
        viewModel.complexList.setRowFocus(curRow);
        viewModel.complexItems.removeAllRows();
        curRow.setValue("dealObject", "1");
        curRow.setValue("isnit", "0");
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.complexList.setRowFocus(index);
        var id = viewModel.complexList.getValue("id");
        viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();

        var cusComp = viewModel.app.getComp("customer"),
          depComp = viewModel.app.getComp("department"),
          saleComp = viewModel.app.getComp("saleman"),
          logComp = viewModel.app.getComp("logisticsCompany");

        switch (viewModel.complexList.originEditData.dealObject) {
          case '1':
            cusComp.setEnable(true);
            depComp.setEnable(false);
            saleComp.setEnable(false);
            logComp.setEnable(false);
            viewModel.complexList.setValue("departmentId", '');
            viewModel.complexList.setValue("salemanId", '');
            viewModel.complexList.setValue("logisticsCompanyId", '');
            break;
          case '2':
            cusComp.setEnable(false);
            depComp.setEnable(true);
            saleComp.setEnable(false);
            logComp.setEnable(false);
            viewModel.complexList.setValue("customerId", '');
            viewModel.complexList.setValue("salemanId", '');
            viewModel.complexList.setValue("logisticsCompanyId", '');
            break;
          case '3':
            cusComp.setEnable(false);
            depComp.setEnable(false);
            saleComp.setEnable(true);
            logComp.setEnable(false);
            viewModel.complexList.setValue("departmentId", '');
            viewModel.complexList.setValue("customerId", '');
            viewModel.complexList.setValue("logisticsCompanyId", '');
            break;
          case '4':
            cusComp.setEnable(false);
            depComp.setEnable(false);
            saleComp.setEnable(false);
            logComp.setEnable(true);
            viewModel.complexList.setValue("departmentId", '');
            viewModel.complexList.setValue("salemanId", '');
            viewModel.complexList.setValue("customerId", '');
            break;
        }
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
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
      detail: function(index) {
        //确保grid先将行设置为focus状态
        if (typeof(index) !== 'number') {
          $("#bpmhead").html("");
          $("#bpmfoot").html("");
        }
        setTimeout(function() {
          var curRow = viewModel.complexList.getCurrentRow();
          var date = curRow.getValue('billdate');
          viewModel.detailList.setSimpleData(curRow.getSimpleData());
          if (date) {
            var date = new Date(date); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            viewModel.detailList.setValue('billdate', Y + M + D + h + m + s);
          }
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          // console.log(curRow.getValue('cliamState'));
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          if (curRow.getValue('billState') == 2) {
            $('div.ui-bill-detail .detailEdit').css('display', 'none');
          }
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/detail/" + id,
          type: 'get',
          async: false,
          success: function(data) {
            if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL) {
              var date = new Date(data.claimTime)
              data.claimTime = date
            }
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
      //跳转单据详情页
      showBillDetail: function() {
        $(".ui-list-panel").addClass("animated slideInLeft");
        $(".ui-bill-panel").addClass("animated slideOutDown");
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
          return data.getValue('billState') == '2';
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
                      item.setValue('billState', '1');
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
      //审批
      audit: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.complexList.getSelectedRows();
        if (rows.length < 1) {
          toastr.warning("请先选择一行数据");
          return
        }
        viewModel.filterRowAndSubmit(rows, function(data) {
          return data.getValue('billState') == '2';
        }, function(datas) {
          if (datas.length > 0) {
            common.dialog.confirmDialog({
              msg1: '确认审批这些项？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function() {
                var ids = datas.map(function(item) {
                  return item.getValue('id');
                });
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/audit",
                  type: "post",
                  data: {
                    id: ids
                  },
                  success: function(data) {
                    rows.forEach(function(item, index) {
                      item.setValue('billState', '3');
                      item.setValue('operation', '3');
                    });
                    toastr.success();
                  }
                });
              }
            });
          } else {
            toastr.warning("没有可以审批的数据");
          }
        });
      },
      //取消审批
      unapprove: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.complexList.getSelectedRows();
        if (rows.length < 1) {
          toastr.warning("请先选择一行数据");
          return
        }
        viewModel.filterRowAndSubmit(rows, function(data) {
          return data.getValue('billState') == '3';
        }, function(datas) {
          if (datas.length > 0) {
            common.dialog.confirmDialog({
              msg1: '确认取消审批这些项？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function() {
                var ids = datas.map(function(item) {
                  return item.getValue('id');
                });
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/unapprove",
                  type: "post",
                  data: {
                    id: ids
                  },
                  success: function(data) {
                    rows.forEach(function(item, index) {
                      item.setValue('billState', '2');
                      item.setValue('operation', '2');
                    });
                    toastr.success();
                  }
                });
              }
            });
          } else {
            toastr.warning("只有审批通过并且待认领状态的数据可以取消审批！");
          }
        });
      },
      //提交按钮
      commit: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.complexList.getSelectedRows();
        if (rows.length < 1) {
          toastr.warning("请先选择一行数据");
          return
        }
        viewModel.filterRowAndSubmit(rows, function(data) {
          return true; //data.getValue('billClaimState') == '1' || data.getValue('billClaimState') == '6';
        }, function(datas) {
          if (datas.length > 0) {
            common.dialog.confirmDialog({
              msg1: '确认提交这些项？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function() {
                var ids = datas.map(function(item) {
                  return item.getValue('id');
                });
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/send",
                  type: "post",
                  data: {
                    id: ids
                  },
                  success: function(data) {
                    rows.forEach(function(item, index) {
                      item.setValue('billState', '2');
                      item.setValue('operation', '2');
                    });
                    toastr.success();
                  }
                });
              }
            });
          } else {
            toastr.warning("没有可以提交的数据");
          }
        });
      },
      //新增子表项
      addItem: function() {
        viewModel.complexItems.createEmptyRow();
      },
      //批量新增子表项
      // addItems: function() {
      //
      // },
      //删除子表项
      delItems: function() {
        var selectedRows = viewModel.complexItems.getSelectedRows();
        for (var i = 0; i < selectedRows.length; i++) {
          selectedRows[i].setValue("dr", "1");
        }
        viewModel.complexItems.removeRows(selectedRows);
      },
      //保存单据
      saveBill: function() {
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
        if (!passed) return;
        var allRows = viewModel.complexItems.getAllRows();
        if (allRows.length == 0 || allRows.every(function(row) {
            return row.status == u.Row.STATUS.FALSE_DELETE
          })) {
          toastr.error("请录入表体行数据");
          return;
        }
        // viewModel.complexList.setValue('billClaimState', '1');
        var complexData = viewModel.complexList.getCurrentRow().getSimpleData();
        var complexItemsData = viewModel.complexItems.getSimpleData();
        var subTableDatas = [];
        // for (var i = 0, len = complexItemsData.length; i < len; i++) {
        //   if (complexItemsData[i].persistStatus == "fdel") {
        //     continue
        //   }
        //   subTableDatas.push(complexItemsData[i]);
        // }
        complexData.billReceivableDetailsDtos = complexItemsData;
        complexData.state = 0;
        // var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl + '/add',
          // type: _ajaxType,
          type: 'post',
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.search();
            // viewModel.complexList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.complexList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function() {
        viewModel.complexItems.removeAllRows();
        var curRow = viewModel.complexList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.complexList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.complexList.removeRow(curRow);
          viewModel.complexItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.complexList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("enableStatus", "1");
              }
            }
          })
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.complexList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("enableStatus", "0");
              }
            }
          })
        }
      },
      //子表增行
      addNewItems: function() {
        // 添加新行
        var allRows = viewModel.complexItems.getAllRows(),
          num = 0,
          fV = 0,
          len = allRows.length;
        if (len) {
          for (var i = 0; i < len; i++) {
            if (allRows[i].status != 'fdel') {
              num = allRows[i].getValue('serialnum');
              fV = i
              break;
            }
          }
          if (fV != len - 1) {
            for (var j = fV + 1; j < len; j++) {
              if (allRows[j].status != 'fdel') {
                if (num < allRows[j].getValue('serialnum')) {
                  num = allRows[j].getValue('serialnum')
                }
              }
            }
          }
        }
        var rowNum = viewModel.generaterowNum(num);
        var newrow = viewModel.complexItems.createEmptyRow();
        newrow.setSimpleData({
          // productLine: '',
          // //  ('我是一个产品线'+Math.random()).substr(0,30),
          money: 0,
          // remainMoney: 0,
          serialnum: rowNum,
        });
        // viewModel.complexItems.createEmptyRow();
      },
      detail2bill: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      //导入
      importHandle: function() {
        var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
        var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
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
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      // 审批流程的相关按钮点击事件 - start
      // 提交申请单
      submitCusReqForm: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var nodeJs = "/ocm-web/pages/settlement/mtreceivablebill/mtreceivablebill.js";
        var billTypeCode = "BillReceivable";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      },

      // 收回申请单
      unsubmitCusReqForm: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "BillReceivable";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },

      // 审批通过申请单
      approveCusReqForm: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "BillReceivable";
        var tranTypeCode = null;
        var withBpmCallback = function() {
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

      // 审批不通过申请单
      disapproveCusReqForm: function() {
        var listCompId = "complexList";
        var billTypeCode = "BillReceivable";
        var tranTypeCode = null;
        var withBpmCallback = function() {
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

      // 取消审批申请单
      cancelApproveCusReqForm: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var curRow = viewModel.complexList.getCurrentRow();
        if (curRow.getValue('isCheckReceivable') == 1) {
          toastr.error('已核销的单据不可以取消审批！')
          return;
        }
        var listCompId = "complexList";
        var billTypeCode = "BillReceivable";
        var tranTypeCode = null;
        var withBpmCallback = function() {
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
    afterCreate: function() {
      app = viewModel.app
      viewModel = u.extend(viewModel, bpmopenbill.model);
      // 列表查询数据(无查询条件)
      viewModel.search();
      //选择往来对象
      viewModel.complexList.on("dealObject.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var newVal = obj.newValue,
          cusComp = viewModel.app.getComp("customer"),
          depComp = viewModel.app.getComp("department"),
          saleComp = viewModel.app.getComp("saleman"),
          logComp = viewModel.app.getComp("logisticsCompany"),
          domCus = $('div.custormerv'),
          domDoc = $('div.departmentv'),
          domSal = $('div.salemanv'),
          domLog = $('div.logisticsv');

        switch (newVal) {
          case '1':
            cusComp.setEnable(true);
            if (!domCus.hasClass('visibleTrue')) {
              $('div.visibleTrue').removeClass('visibleTrue').addClass('visibleFalse');
              domCus.addClass('visibleTrue').removeClass('visibleFalse');
            }
            depComp.setEnable(false);
            saleComp.setEnable(false);
            logComp.setEnable(false);
            viewModel.complexList.setValue("departmentId", '');
            viewModel.complexList.setValue("salemanId", '');
            viewModel.complexList.setValue("logisticsCompanyId", '');
            break;
          case '2':
            cusComp.setEnable(false);
            depComp.setEnable(true);
            if (!domDoc.hasClass('visibleTrue')) {
              $('div.visibleTrue').removeClass('visibleTrue').addClass('visibleFalse');
              domDoc.addClass('visibleTrue').removeClass('visibleFalse');
            }
            saleComp.setEnable(false);
            logComp.setEnable(false);
            viewModel.complexList.setValue("customerId", '');
            viewModel.complexList.setValue("salemanId", '');
            viewModel.complexList.setValue("logisticsCompanyId", '');
            break;
          case '3':
            cusComp.setEnable(false);
            depComp.setEnable(false);
            saleComp.setEnable(true);
            if (!domSal.hasClass('visibleTrue')) {
              $('div.visibleTrue').removeClass('visibleTrue').addClass('visibleFalse');
              domSal.addClass('visibleTrue').removeClass('visibleFalse');
            }
            logComp.setEnable(false);
            viewModel.complexList.setValue("departmentId", '');
            viewModel.complexList.setValue("customerId", '');
            viewModel.complexList.setValue("logisticsCompanyId", '');
            break;
          case '4':
            cusComp.setEnable(false);
            depComp.setEnable(false);
            saleComp.setEnable(false);
            logComp.setEnable(true);
            if (!domLog.hasClass('visibleTrue')) {
              $('div.visibleTrue').removeClass('visibleTrue').addClass('visibleFalse');
              domLog.addClass('visibleTrue').removeClass('visibleFalse');
            }
            viewModel.complexList.setValue("departmentId", '');
            viewModel.complexList.setValue("salemanId", '');
            viewModel.complexList.setValue("customerId", '');
            break;
        }
      });

      viewModel.complexList.on("startdateHead.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var itemAllRows = viewModel.complexItems.getAllRows(),
          newVal = obj.newValue;
        for (var i = 0, len = itemAllRows.length; i < len; i++) {
          itemAllRows[i].setValue('beginDate', newVal);
        }
      });

      viewModel.complexItems.on("num.valuechange", function(obj) {
        if (obj.newValue == obj.oldValue) {
          return;
        }
        var curRow = viewModel.complexItems.getRowByRowId(obj.rowId),
          newVal = obj.newValue || 0,
          price = curRow.getValue('price');
        if (price) {
          var rMoney = parseFloat(newVal) * parseFloat(price);
          curRow.setValue('receivableMoney', rMoney);

          // var cancellationMoney = curRow.getValue('cancellationMoney') || '0';
          // if (cancellationMoney) {
          //   curRow.setValue('uncancellationMoney', (rMoney - parseFloat(cancellationMoney)).toFixed(2));
          // }
        } else {
          curRow.setValue('receivableMoney', '');
        }
      });
      viewModel.complexItems.on("price.valuechange", function(obj) {
        if (obj.newValue == '') {
          obj.newValue = '0'
        } else if (!obj.newValue) {
          return;
        }
        var curRow = viewModel.complexItems.getRowByRowId(obj.rowId),
          newVal = obj.newValue,
          num = curRow.getValue('num');
        if (num) {
          var rMoney = parseFloat(newVal) * parseFloat(num);
          curRow.setValue('receivableMoney', rMoney);
          // var cancellationMoney = curRow.getValue('cancellationMoney') || '0';
          // if (cancellationMoney) {
          //   curRow.setValue('uncancellationMoney', (rMoney - parseFloat(cancellationMoney)).toFixed(2));
          // }
        } else {
          curRow.setValue('receivableMoney', '');
        }
      });
      viewModel.complexItems.on("receivableMoney.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var curRow = viewModel.complexItems.getRowByRowId(obj.rowId),
          newVal = obj.newValue,
          num = curRow.getValue('num'),
          price = curRow.getValue('price'),
          allRows = viewModel.complexItems.getAllRows(),
          sumMoney = 0;
        for (var i = 0; i < allRows.length; i++) {
          if (allRows[i].getValue('receivableMoney')) {
            sumMoney += parseFloat(allRows[i].getValue('receivableMoney'));
          }
        }
        viewModel.complexList.setValue('money', sumMoney);
        var cancellationMoney = curRow.getValue('cancellationMoney') || '0';
        if (cancellationMoney) {
          curRow.setValue('uncancellationMoney', (newVal - parseFloat(cancellationMoney)).toFixed(2));
          if (cancellationMoney == '0') {
            curRow.setValue('cancellationMoney', 0)
          }
        }
        if (num) {
          curRow.setValue('price', (parseFloat(newVal) / parseFloat(num)).toFixed(2));
        } else {
          curRow.setValue('price', '');
        }
      });
      //账期
      viewModel.complexItems.on("beginDate.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var curRow = viewModel.complexItems.getRowByRowId(obj.rowId),
          newVal = obj.newValue,
          account = curRow.getValue('accountId');
        if (account) {
          $._ajax({
            url: appCtx + viewModel.baseurl + "/endDate",
            type: "post",
            data: {
              beginDate: newVal,
              account: account
            },
            success: function(date) {
              var date = new Date(date); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              var D = date.getDate() + ' ';
              var h = date.getHours() + ':';
              var m = date.getMinutes() + ':';
              var s = date.getSeconds();
              curRow.setValue('endDate', Y + M + D + h + m + s);
            }
          });
        } else {
          curRow.setValue('endDate', newVal);
        }
      });
      viewModel.complexItems.on("accountId.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var curRow = viewModel.complexItems.getRowByRowId(obj.rowId),
          newVal = obj.newValue,
          beginDate = curRow.getValue('beginDate');
        if (beginDate) {
          $._ajax({
            url: appCtx + viewModel.baseurl + "/endDate",
            type: "post",
            data: {
              beginDate: beginDate,
              account: newVal
            },
            success: function(date) {
              var date = new Date(date); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              var D = date.getDate() + ' ';
              var h = date.getHours() + ':';
              var m = date.getMinutes() + ':';
              var s = date.getSeconds();
              curRow.setValue('endDate', Y + M + D + h + m + s);
            }
          });
        } else {
          // curRow.setValue('endDate', newVal);
        }
      });
    }
  });

  return view;
});