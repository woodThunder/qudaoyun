define(['text!./customfields.html', 'ocm_common', 'ocm_baseview', './meta.js', "../../flow/bpmapproveref/bpmopenbill.js"], function (tpl, common, baseview, model, bpmopenbill) {
  'use strict'
  var viewModel, appCtx = window.appCtx,
    app;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  var view = baseview.extend({
    beforeCreate: function () {
      app = this.app;
      viewModel = this.viewModel;
      viewModel = _.extend(viewModel, bpmopenbill.model);
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/contract/con-custom-templates',
      // baseurlChilds:"/contract/con-custom-childs",
      complexList: new u.DataTable(model.options.metas.customField),
      complexCard: new u.DataTable(model.options.metas.customField),
      detailCard: new u.DataTable(model.options.metas.customField),
      complexItems: new u.DataTable(model.options.metas.customFieldChilditem),
      complexDetailItems: new u.DataTable(model.options.metas.customFieldChilditem),
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
      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),

      customFieldSource: [{
        value: 'vdef1',
        name: '自定义1'
      }, {
        value: 'vdef2',
        name: '自定义2'
      }, {
        value: 'vdef3',
        name: '自定义3'
      }, {
        value: 'vdef4',
        name: '自定义4'
      }, {
        value: 'vdef5',
        name: '自定义5'
      }, {
        value: 'vdef6',
        name: '自定义6'
      }, {
        value: 'vdef7',
        name: '自定义7'
      }, {
        value: 'vdef8',
        name: '自定义8'
      }, {
        value: 'vdef9',
        name: '自定义9'
      }, {
        value: 'vdef10',
        name: '自定义10'
      }, {
        value: 'vdef11',
        name: '自定义11'
      }, {
        value: 'vdef12',
        name: '自定义12'
      }, {
        value: 'vdef13',
        name: '自定义13'
      }, {
        value: 'vdef14',
        name: '自定义14'
      }, {
        value: 'vdef15',
        name: '自定义15'
      }],

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
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,

    },
    rendertype: {
      // operation: common.rendertype.operation,
      enableStatusRender: common.rendertype.enableRender,
      booleanRender: common.rendertype.booleanRender,
      detailRender: common.rendertype.detailRender,
      operation: function(obj) {
            var editfun, delfun;
            var dataTableRowId = obj.row.value['$_#_@_id'];
            var isEnable = obj.row.value.isEnable;
            if (isEnable == 0 || isEnable == 2) {
                editfun = "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
                obj.element.innerHTML = '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    '<a ' +
                    editfun +
                    ' title="编辑">编辑</a>' +
                    '</span>    ' +
                    '<span class="ui-handle-word">' +
                    '<a ' +
                    delfun +
                    ' title="删除">删除</a>' +
                    '</span></div>';

            } else {
                delfun = 'class="disabled"';
                editfun = 'class="disabled"';
                obj.element.innerHTML = '<div class="ui-handle-icon">' +
                    '<span class="ui-handle-word">' +
                    '<a ' +
                    editfun +
                    ' title="编辑">编辑</a>' +
                    '</span>    ' +
                    '<span class="ui-handle-word">' +
                    '<a ' +
                    delfun +
                    ' title="删除">删除</a>' +
                    '</span></div>';
            }

            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        // 执行类型
      booleanRenders:function(obj){
            var name = "";
            switch (parseInt(obj.value)) {
                case 0:
                    name = "否";
                    break;
                case 1:
                    name = "是";
                    break;
                default:
                    name = "否"
                    break;
            }
            obj.element.innerHTML = name;
        },
      // stateComputed: ko.pureComputed(function () {
      //   var dataValue = viewModel.complexList.ref("state")();
      //   var showName;
      //
      //   if (dataValue == 0) {
      //     (showName = "待处理")
      //   }
      //   if (dataValue == 1) {
      //     (showName = "已提交")
      //   }
      //   if (dataValue == 2) {
      //     (showName = "审批中")
      //   }
      //   if (dataValue == 3) {
      //     (showName = "审批通过")
      //   }
      //   if (dataValue == 4) {
      //     (showName = "审批不通过")
      //   }
      //   return showName;
      // }),
      // stateRender: function (params) {
      //   switch (params.value) {
      //     case '1':
      //       params.element.innerHTML = "保存";
      //       break;
      //     case '2':
      //       params.element.innerHTML = "提交";
      //       break;
      //     case '3':
      //       params.element.innerHTML = "审批通过";
      //       break;
      //     case '4':
      //       params.element.innerHTML = "审批中";
      //       break;
      //     case '5':
      //       params.element.innerHTML = "收回";
      //       break;
      //     case '6':
      //       params.element.innerHTML = "审批不过";
      //       break;
      //     default:
      //   }
      // },
    },
    events: {
      //删除和批量删除
      del: function (data, rowId) {
        if (typeof (data) == 'number') {
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
            if (rows[i].getValue('isEnable') == '1') {
                toastr.warning('已“启用的”合同模板不能被删除！')
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
          onOk: function () {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/delete",
              type: "post",
              data: {
                ids: ids.join(",")
              },
              success: function (data) {
                viewModel.search();
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      enable: function(data,rowId) {
          if (typeof (data) == 'number') {
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
                  ids.push(rows[i].getValue("id"));
              }
          }
          if (!ids.length) {
              return;
          }

          $._ajax({
              url: appCtx + viewModel.baseurl + "/batch-enable",
              type: "post",
              data: {
                  ids: ids.join(",")
              },
              success: function (data) {
                  viewModel.search();
              }
          });


      },

      //停用
      disable: function() {
          if (typeof (data) == 'number') {
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
                  ids.push(rows[i].getValue("id"));
              }
          }
          if (!ids.length) {
              return;
          }

          $._ajax({
              url: appCtx + viewModel.baseurl + "/batch-disable",
              type: "post",
              data: {
                  ids: ids.join(",")
              },
              success: function (data) {
                  viewModel.search();
              }
          });
      },
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
          // url: appCtx + viewModel.baseurl + '/findAll',
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
      //进入新增单据页
      showAddBillPanel: function () {
        viewModel.complexCard.removeAllRows();
        var curRow = viewModel.complexCard.createEmptyRow();
        viewModel.complexItems.removeAllRows();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function (index) {
        viewModel.complexList.setRowFocus(index);
        var id = viewModel.complexList.getValue("id");
        var isUnBpm = common.checkApprover(id);
        if (isUnBpm && !isUnBpm.isUnDoBpm) {
            toastr.warning(isUnBpm.message);
            return;
        }
        //查询子表数据
        viewModel.findByParentid(id, function (data) {
          viewModel.complexCard.setSimpleData(data);
          // viewModel.detailCard.setSimpleData(data);
        });
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      //取消单据
      cancelBill: function () {
        viewModel.complexItems.removeAllRows();
        viewModel.complexCard.removeAllRows();
        viewModel.retListPanel();
      },
      detail: function (index) {
        //确保grid先将行设置为focus状态
        if (typeof (index) !== 'number') {
          $("#bpmhead").html("");
          $("#bpmfoot").html("");
        }
        setTimeout(function () {
          var curRow = viewModel.complexList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id, function (data) {
            viewModel.detailCard.setSimpleData(data);
          });
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function (id, callback) {
        $._ajax({
          // url: appCtx + viewModel.baseurl,
          url: appCtx + viewModel.baseurl + "/detail",
          type: 'post',
          async: false,
          data: {
            id: id
          },
          success: function (data) {
            viewModel.complexItems.setSimpleData(data.billDetails);
            viewModel.complexDetailItems.setSimpleData(data.billDetails);
            if (typeof callback == "function") {
              callback(data);
            }
          }
        })
      },
      // 清除基类属性
      clearBaseProp: function (row) {
        row.setValue("id", "");
        row.setValue("code", "");
        row.setValue("name", "");
        row.setValue("creator", "");
        row.setValue("creationTime", "");
        row.setValue("modifier", "");
        row.setValue("modifiedTime", "");
      },

      //新增子表项
      addItems: function () {
        viewModel.complexItems.createEmptyRow({
          unSelect: true
        });
      },

      //删除子表项
      delItems: function () {
        var selectedRows = viewModel.complexItems.getSelectedRows();
        viewModel.complexItems.removeRows(selectedRows, {
          forceDel: true
        });
      },
      checkUniqField:function(rowsData){
          var flag = true
          rowsData.forEach(function (item) {
              //todo 过滤出 字段名相同的
              var filterFiledName = rowsData.filter(function (val) {
                  return val.filedName == item.filedName
              })
              //todo 过滤出 字段显示相同的
              var filterShowName = rowsData.filter(function (val) {
                  return val.showName == item.showName
              })
              if (filterFiledName.length > 1) {
                  toastr.warning("字段名不允许重复");
                  flag = false
                  return false
              }
              if (filterShowName.length > 1) {
                  toastr.warning("显示名不允许重复")
                  flag = false
                  return false
              }
          })
          return flag
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
        if (!passed) return;
        var allRows = viewModel.complexItems.getAllRows();
        if (allRows.length == 0 || allRows.every(function (row) {
            return row.status == u.Row.STATUS.FALSE_DELETE
          })) {
          toastr.error("请录入表体行数据");
          return;
        }
        // viewModel.complexList.setValue('billClaimState', '1');
        var complexData = viewModel.complexCard.getSimpleData()[0];
        var complexItemsData = viewModel.complexItems.getSimpleData();
        if(!(viewModel.checkUniqField(complexItemsData || []))){
          return false
        }
        complexData.billDetails = complexItemsData;
        complexData.isEnable = 0
        var type = "post"
        if (complexData.id) {
          type = "put"
         var isEnable = complexData.isEnable
          complexData.isEnable = isEnable
        }
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.search();
            viewModel.retListPanel();
          }
        })
      },
      //导入
      importHandle: function () {
        var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
        var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function () {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.complexList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      // 返回列表页
      retListPanel: function () {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      // 审批流程的相关按钮点击事件 - start
      // 提交
      submit: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var nodeJs = "/ocm-web/pages/rebate/saletarget/saletarget.js";
        var billTypeCode = "SalesTarget";
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
        var billTypeCode = "SalesTarget";
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
        var billTypeCode = "BillReceivable";
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
        var billTypeCode = "SalesTarget";
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
        var curRow = viewModel.complexList.getCurrentRow();
        if (curRow.getValue('isCheckReceivable') == 1) {
          toastr.error('已核销的单据不可以取消审批！')
          return;
        }
        var listCompId = "complexList";
        var billTypeCode = "SalesTarget";
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
      // viewModel.complexItems.on("accountId.valuechange", function(obj) {
      //   if (!obj.newValue) {
      //     return;
      //   }
      // });
    }
  });

  return view;
});