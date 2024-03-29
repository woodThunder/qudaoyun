define(['text!./jdrefund.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function (tpl, common, searchbox) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch;
  baseData = {
    baseurl: '/dc/jd-refund-applys',
    refundList: new u.DataTable(refundMeta),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    //
    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    //
    syncSrc: [
      { value: "0", name: "否" },
      { value: "1", name: "是" },
    ],
    //
    exceptionSrc: [
      { value: "0", name: "否" },
      { value: "1", name: "是" },
    ],
    /**
     * 审核状态
     *  0、未审核 
     *  1、审核通过
     *  2、审核不通过 
     *  3、京东财务审核通过 
     *  4、京东财务审核不通过 
     *  5、人工审核通过 
     *  6、拦截并退款 
     *  7、青龙拦截成功 
     *  8、青龙拦截失败 
     *  9、强制关单并退款。
     */
    auditStatusSrc: [
      { value: "0", name: "未审核" },
      { value: "1", name: "审核通过" },
      { value: "2", name: "审核不通过" },
      { value: "3", name: "京东财务审核通过" },
      { value: "4", name: "京东财务审核不通过" },
      { value: "5", name: "人工审核通过" },
      { value: "6", name: "拦截并退款" },
      { value: "7", name: "青龙拦截成功" },
      { value: "8", name: "青龙拦截失败" },
      { value: "9", name: "强制关单并退款" },
    ],
  };
  rendertype = {
    //跳转详情页
    detailRender: function (obj) {
      var viewModel = obj.gridObj.viewModel;
      var dataTableRowId = obj.row.value['$_#_@_id'];
      var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
      obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    operation: function (obj) {
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle-word">' +
        '<a href="#" class="" ' +
        editfun +
        ' title="编辑">编辑</a>' +
        '</span>    ' +
        '<span class="ui-handle-word">' +
        '<a href="#" class="" ' +
        delfun +
        ' title="删除">删除</a>' +
        '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    }
  };
  events = {
    //审核状态
    auditstatus: function () {
      var auditstatus = viewModel.refundList.getValue('auditstatus');
      var name;
      switch (auditstatus) {
        case '0':
          name = '未审核';
          break;
        case '1':
          name = '审核通过';
          break;
        case '2':
          name = '审核不通过';
          break;
        case '3':
          name = '京东财务审核通过';
          break;
        case '4':
          name = '京东财务审核不通过';
          break;
        case '5':
          name = '人工审核通过';
          break;
        case '6':
          name = '拦截并退款';
          break;
        case '7':
          name = '青龙拦截成功';
          break;
        case '8':
          name = '青龙拦截失败';
          break;
        case '9':
          name = '强制关单并退款';
          break;
        default:
          name = '';
      }
      return name;
    },
    //
    issync: function () {
      var issync = viewModel.refundList.getValue('issync');
      var name;
      switch (issync) {
        case '0':
          name = '否';
          break;
        case '1':
          name = '是';
          break;
        default:
          name = '';
      }
      return name;
    },
    //
    isexception: function () {
      var isexception = viewModel.refundList.getValue('isexception');
      var name;
      switch (isexception) {
        case '0':
          name = '否';
          break;
        case '1':
          name = '是';
          break;
        default:
          name = '';
      }
      return name;
    },
    //编辑状态
    editHandle: function () {
      // var self = this;
      // var isauditStatus = viewModel.refundList.getValue("auditStatus");
      // if (isauditStatus == "1" || isauditStatus == 1) {
      //     toastr.warning('该数据已审核不能编辑');
      //     return;
      // }
      $(".ui-bill-detail").hide();
      $(".ui-bill-panel").show();
      self.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
    },
    //删除和批量删除
    del: function (data) {
      if (typeof (data) == 'number') {
        viewModel.refundList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.refundList.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          // var isauditStatus = rows[i].getValue("auditStatus");
          // if (isauditStatus == "1" || isauditStatus == 1) {
          //     toastr.warning('该数据已审核不能删除');
          //     return;
          // }
          ids.push(rows[i].getValue("id"));
        }
      } else {
        toastr.warning('请选择数据');
        return;
      }
      if (rows && rows.length > 0) {
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
                viewModel.refundList.removeRows(rows);
                viewModel.search();
              }
            });
          }
        });
      } else {
        toastr.warning('请选择数据');
        return;
      }
    },
    //进入修改单据页
    showEditBillPanel: function (index) {
      viewModel.refundList.setRowFocus(index);
      var id = viewModel.refundList.getCurrentRow().getValue("id");
      viewModel.refundList.originEditData = viewModel.refundList.getFocusRow().getSimpleData();
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
      $("#code-input").attr("readonly", "readonly");
    },
    //查看详情
    detail: function (index, rowId) {
      //			viewModel.processOrderList.setRowFocus(index);
      viewModel.refundList.setRowSelectbyRowId(rowId);
      //请求完整主子表信息
      viewModel.goDetailPanel();
    },

    //保存单据
    saveBill: function () {
      var type = "post";
      if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
        type = "put";
      }
      var refundData = viewModel.refundList.getCurrentRow().getSimpleData();
      var validate = $("#validate")[0];
      var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
      if (result.passed) {
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(refundData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.refundList.getFocusRow().setSimpleData(data);
            viewModel.search();
            viewModel.retListPanel();
          }
        });
      }
    },
    //点击取消 单据页
    cancelHandle: function () {
      var curRow = viewModel.refundList.getCurrentRow();
      // 修改，则还原
      if (curRow.getValue("id")) {
        curRow.setSimpleData(viewModel.refundList.originEditData)
      }
      // 新增或复制，则删除
      else {
        viewModel.refundList.removeRow(curRow);
      }
      viewModel.retListPanel();
    },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if (reindex) {
        viewModel.refundList.pageIndex(0);
      }
      viewModel.refundList.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      queryData.size = viewModel.refundList.pageSize();
      queryData.page = viewModel.refundList.pageIndex();
      $.ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function (data) {
          viewModel.refundList.setSimpleData(data.content, { unSelect: true });
          viewModel.refundList.totalRow(data.totalElements);
          viewModel.refundList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      singledocSearch.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.refundList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.refundList.pageSize(size);
      viewModel.search(true);
    }
  }
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
    singledocSearch = new searchbox(
      $("#refundList-searchcontent")[0], [{
        type: "text",
        key: "orderid",
        label: "订单号",
      },
      ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender() {
    //绑定输入框enter事件
    $('#refundList-searchcontent input').off("keydown").on("keydown", function (e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
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