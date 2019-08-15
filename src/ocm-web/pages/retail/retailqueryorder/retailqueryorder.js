define(['text!./retailqueryorder.html', 'ocm_common', 'ocm_baseview', './meta.js', 'ocm_ordertrack', "../../flow/bpmapproveref/bpmopenbill.js"], function(tpl, common, baseview, model, ordertrack, bpmopenbill) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c",
    productDialog;
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
      viewModel = _.extend(viewModel, bpmopenbill.model);
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/b2c/orders',
      searchurl: '/b2c/orderQuery',
      processOrderList: new u.DataTable(model.options.metas.orderMeta),
      orderDetail: new u.DataTable(model.options.metas.orderMeta),
      goodsList: new u.DataTable(model.options.metas.goodsMeta),
      promList: new u.DataTable(model.options.metas.promMeta),
      linkList: new u.DataTable(model.options.metas.linkMeta),
      productList: new u.DataTable(model.options.metas.productMeta),
      productAllList: new u.DataTable(model.options.metas.productMeta),
      logList: new u.DataTable(model.options.metas.logMeta),
      //买家留言
      commentList1: new u.DataTable(model.options.metas.remarkMeta),
      //卖家留言
      commentList2: new u.DataTable(model.options.metas.remarkMeta),
      //订单备注
      commentList3: new u.DataTable(model.options.metas.remarkMeta),
      //订单跟踪
      orderTrackData: new u.DataTable(model.options.metas.orderTracMeta),
      orderSignfList: new u.DataTable(model.options.metas.orderSignRef),

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      button1Source: model.options.buttons.button1,
      details1Source: model.options.details.detail1,
      details2Source: model.options.details.detail2,
      details3Source: model.options.details.detail3,
      details4Source: model.options.details.detail4,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,
      grid8Option: model.options.grids.grid8,
      grid9Option: model.options.grids.grid9,
      grid10Option: model.options.grids.grid10,
      //订单类型枚举
      orderTypeSrc: [],
      //订单状态枚举
      orderStatusSrc: [],
      //查询所需参数
      orderStatus4QuerySrc: [],
      //物流方式枚举
      logisticsModeSrc: [],
      //配送方式枚举
      deliveryModeSrc: [],
      //订单来源枚举
      orderSourceSrc: [],
      //平台状态
      OrderPlatformBillStatusSrc: [],
      //发货状态
      sendStatusSrc: [],
      enableFmt: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("platformBillStatus")();
        switch (enableStatus) {
          case '01':
            return "已支付,未发货";
          case '02':
            return "已发货";
          case '03':
            return "交易完成";
          default:
        }
      }),
      logistics: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("logisticsMode")();
        switch (enableStatus) {
          case '1':
            return "";
          case '2':
            return "快递配送";
          case '3':
            return "服务商配送";
          case '4':
            return "供应商直发";
          case '5':
            return "经销商订单";
          default:
        }
      }),
      //订单类型
      ordrTypeList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("orderType")();
        switch (enableStatus) {
          case '0':
            return "普通商品";
          case '1':
            return "运费链接";
          case '2':
            return "补差链接";
          case '4':
            return "换购链接";
          default:
        }
      }),
      //冻结标识
      lockStatusList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("isLock")();
        switch (enableStatus) {
          case '0':
          case 0:
            return "否";
          case '1':
          case 1:
            return "是";
          default:
        }
      }),
      synsuccessList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("issynsuccess")();
        switch (enableStatus) {
          case '0':
          case 0:
            return "否";
          case '1':
          case 1:
            return "是";
          default:
        }
      }),
      //拆单发货
      splitDispatchList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("isSplitDispatch")();
        switch (enableStatus) {
          case '0':
          case 0:
            return "否";
          case '1':
          case 1:
            return "是";
          default:
        }
      }),
      //isUrgent加急
      urgentList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("isUrgent")();
        switch (enableStatus) {
          case '0':
          case 0:
            return "否";
          case '1':
          case 1:
            return "是";
          default:
        }
      }),
      //配送方式
      deliveryModeList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("serviceMode")();
        switch (enableStatus) {
          case '0':
            return "物流配送";
          case '1':
            return "自提";
          default:
        }
      }),
      //订单来源
      orderSourceList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("orderSource")();
        switch (enableStatus) {
          case '0':
            return "平台";
          case '1':
            return "拆单";
          case '2':
            return "补录";
          case '3':
            return "补赠";
          case '4':
            return "换货";
          default:
        }
      }),
      //订单状态
      orderStatusList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("billStatus")();
        switch (enableStatus) {
          case '01':
            return "暂存";
          case '02':
            return "未处理";
          case '03':
            return "未审核";
          case '04':
            return "已审核";
          case '05':
            return "已财审";
          case '06':
            return "已发货";
          case '07':
            return "已完成";
          case '08':
            return "已关闭";
          case '09':
            return "已拆分";
          default:
        }
      }),
      //异常标识
      exceptionStatusList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("isException")();
        switch (enableStatus) {
          case '0':
          case 0:
            return "正常";
          case '1':
          case 1:
            return "异常";
          default:
        }
      }),
      //发货状态
      sendStatusList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("sendStatus")();
        switch (enableStatus) {
          case '0':
          case 0:
            return "未发货";
          case '1':
          case 1:
            return "全部发货";
          case '2':
          case 2:
            return "部分发货";
          default:
            return "未发货";
        }
      }),
      //拆单发货
      isSplitDispatchList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("isSplitDispatch")();
        switch (enableStatus) {
          case '0':
            return "否";
          case '1':
            return "是";
          default:
        }
      }),
      //加急
      isUrgentList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("isSplitDispatch")();
        switch (enableStatus) {
          case '0':
            return "否";
          case '1':
            return "是";
          default:
        }
      }),
      //发货预警
      deliveryWarn: [{
        value: "0",
        name: "否"
      }, {
        value: "1",
        name: "是"
      }, ],
      //异常状态
      exceptionStatusSrc: [{
        value: "0",
        name: "否"
      }, {
        value: "1",
        name: "是"
      }, ],
      //冻结状态
      lockStatusSrc: [{
        value: "0",
        name: "否"
      }, {
        value: "1",
        name: "是"
      }, ],
      //是否拆单发货
      splitDispatchSrc: [{
        value: "0",
        name: "否"
      }, {
        value: "1",
        name: "是"
      }, ],
      //是否加急
      urgentSrc: [{
        value: "0",
        name: "否"
      }, {
        value: "1",
        name: "是"
      }, ],
      //是否变更
      changeSrc: [{
        value: "0",
        name: "否"
      }, {
        value: "1",
        name: "是"
      }, ],
      //是否欠件
      ownSrc: [{
        value: '1',
        name: '是'
      }, {
        value: '0',
        name: '否'
      }],
      //关联类别
      linkTypeSrc: [],
      //退款状态
      refundStatusSrc: [],
      //零售单状态
      saleBillStatus: [],
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,

      billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
      //记录列表当前的位置
      listIndex: null
    },
    rendertype: {
      deliveryStatusSrc: function(obj) {
        var showValue = obj.value == "1" ? "交货" : "未交货";
        obj.element.innerHTML = showValue;
      },
      precision2Render: common.rendertype.precision2Render,
      //优惠来源
      promotionRender: function(obj) {
        var showName;
        switch (obj.value) {
          case "0":
            showName = '平台';
            break;
          case "1":
            showName = '系统';
            break;
          case "2":
            showName = '手动';
          default:
            showName = '平台';
        }
        obj.element.innerHTML = showName;
      },
      // 订单标记显示
      flagReplace: function(obj) {
        var flagHtml;
        switch (obj.value) {
          case "RED":
            flagHtml = '<i class="uifont icon-tubiao-xiaoqizi margin-right-5" style="color:#E64545" data-bind="icon"></i>';
            break;
          case "ORANGE":
            flagHtml = '<i class="uifont icon-tubiao-xiaoqizi margin-right-5" style="color:#FF9933" data-bind="icon"></i>';
            break;
          case "YELLOW":
            flagHtml = '<i class="uifont icon-tubiao-xiaoqizi margin-right-5" style="color:#E5D500" data-bind="icon"></i>';
            break;
          case "GREEN":
            flagHtml = '<i class="uifont icon-tubiao-xiaoqizi margin-right-5" style="color:#67CC48" data-bind="icon"></i>';
            break;
          case "BLUE":
            flagHtml = '<i class="uifont icon-tubiao-xiaoqizi margin-right-5" style="color:#2EA8E6" data-bind="icon"></i>';
            break;
          case "BLACK":
            flagHtml = '<i class="uifont icon-tubiao-xiaoqizi margin-right-5" style="color:#3F3F3F" data-bind="icon"></i>';
            break;
          case "VIOLET":
            flagHtml = '<i class="uifont icon-tubiao-xiaoqizi margin-right-5" style="color:#CB45E6" data-bind="icon"></i>';
            break;
          default:
            flagHtml = '<i class="uifont icon-tubiao-xiaoqizi margin-right-5" style="color:#C3C3C3" data-bind="icon"></i>';
        }
        obj.element.innerHTML = flagHtml;
      },
      //优惠类型
      promotionTypeRender: function(obj) {
        var showName;
        switch (obj.value) {
          case "0":
            showName = '整单优惠';
            break;
          case "1":
            showName = '商品优惠';
            break;
          default:
            showName = '整单优惠';
        }
        obj.element.innerHTML = showName;
      },
      //返现状态
      rebateStatusRender: function(obj) {
        var showName;
        switch (obj.value) {
          case "0":
            showName = '未返现';
            break;
          case "1":
            showName = '已返现';
            break;
          default:
            showName = '未返现';
        }
        obj.element.innerHTML = showName;
      },
      //平台状态 带入
      platformBillStatus: function() {
        var platformBillStatus = viewModel.orderDetail.getValue('platformBillStatus');
        var name;
        switch (platformBillStatus) {
          case '01':
            name = '待发货';
            break;
          case '02':
            name = '已发货';
            break;
          case '03':
            name = '交易完成';
            break;
          default:
            name = '待发货';
        }
        return name;

      },
      //是否拆单发货 带入
      isSplitDispatch: function() {
        var isSplitDispatch = viewModel.orderDetail.getValue('isSplitDispatch');
        if (isSplitDispatch === null) {
          viewModel.orderDetail.setValue('isSplitDispatch', 0);
        }
        var name;
        switch (isSplitDispatch) {
          case '0':
            name = '否';
            break;
          case '1':
            name = '是';
            break;
          default:
            name = '否';
        }
        return name;
      },
      //是否加急 带入
      isUrgent: function() {
        var isUrgent = viewModel.orderDetail.getValue('isUrgent');
        if (isUrgent === null) {
          viewModel.orderDetail.setValue('isUrgent', 0);
        }
        var name;
        switch (isUrgent) {
          case '0':
            name = '否';
            break;
          case '1':
            name = '是';
            break;
          default:
            name = '否';
        }
        return name;
      },
      //延期发货标识 带入
      isDelay: function() {
        var isDelay = viewModel.orderDetail.getValue('isDelay');
        if (isDelay === null) {
          viewModel.orderDetail.setValue('isDelay', 0);
        }
        var name;
        switch (isDelay) {
          case '0':
            name = '否';
            break;
          case '1':
            name = '是';
            break;
          default:
            name = '否';
        }
        return name;
      },
      //发货状态同步标识 带入
      issynsuccess: function() {
        var issynsuccess = viewModel.orderDetail.getValue('issynsuccess');
        if (issynsuccess === null) {
          viewModel.orderDetail.setValue('issynsuccess', 0);
        }
        var name;
        switch (issynsuccess) {
          case 0:
            name = '否';
            break;
          case 1:
            name = '是';
            break;
          default:
            name = '否';
        }
        return name;
      },
      //处理状态
      promStatusRender: function(obj) {
        var showName;
        switch (obj.value) {
          case "0":
            showName = '未处理';
            break;
          case "1":
            showName = '已处理';
            break;
          case "2":
            showName = '已人工关闭';
            break;
          default:
            showName = '未处理';
        }
        obj.element.innerHTML = showName;
      },
      //活动作废
      promStatus: function() {
        var promStatus = viewModel.orderDetail.getValue('promStatus');
        var name;
        switch (promStatus) {
          case '0':
            name = '未处理';
            break;
          case '1':
            name = '已处理';
            break;
          case '2':
            name = '已人工关闭';
            break;
          default:
            name = '未处理';
        }
        return name;
      },
      //赠品来源
      giftSourceRender: function(obj) {
        var showValue = obj.value == "" ? "" : (obj.value == "0" ? "手动" : "自动");
        obj.element.innerHTML = showValue;
      },
      //是否加急
      urgentStatusGrid: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      //是否退货
      isReturnGrid: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      //是否赠品
      isGiftRender: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },

      //是否拆单
      splitStatusGrid: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      //合并发货
      deleverTogether: function(obj) {
        var showValue = obj.value ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      //冻结标识
      lockRender: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      //是否欠件标识
      ownRender: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      //预占状态
      hastacked: function(obj) {
        var showValue = obj.value == "1" ? "已预占" : "未预占";
        obj.element.innerHTML = showValue;
      },
      //跳转详情页
      detailRender: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
        obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },

      //产品详情页
      productRender: function(obj) {
        var fun = "data-bind=click:productDetail.bind($data," + obj.rowIndex + ")";
        obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + fun + '>' + obj.value + '</a>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      }
    },
    events: {
      // 审批流程的相关按钮点击事件 - start
      // 提交申请单
      submitBillBpm: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.processOrderList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "processOrderList";
        var nodeJs = "/ocm-web/pages/fee/retailqueryorder/retailqueryorder.js";
        var billTypeCode = "B2COrder";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      },
      // 收回申请单
      unsubmitBillList: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.processOrderList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "processOrderList";
        var billTypeCode = "B2COrder";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },

      // 审批通过申请单
      approveBill: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.processOrderList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "processOrderList";
        var billTypeCode = "B2COrder";
        var tranTypeCode = null;

        var withBpmCallback = function() {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.processOrderList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);

      },

      // 审批不通过申请单
      // disapproveCusReqForm: function() {
      //  viewModel = _.extend(viewModel, bpmopenbill.model);
      //  var listCompId = "processOrderList";
      //  var billTypeCode = "B2COrder";
      //  var tranTypeCode = null;
      //  var withBpmCallback = function() {
      //    var index = viewModel[listCompId].getSelectedIndex();
      //    var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
      //    var id = viewModel.processOrderList.getRow(index).getValue('id');
      //    viewModel.detail(index, rowId);
      //    viewModel.initBPMFromBill(id, viewModel);
      //  };
      //  var withoutBpmCallback = null;
      //  viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
      //    withoutBpmCallback);
      // },

      // 取消审批申请单
      unapproveBill: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.processOrderList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "processOrderList";
        var billTypeCode = "B2COrder";
        var tranTypeCode = null;
        var withBpmCallback = function() {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.processOrderList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },
      // 审批流程的相关按钮点击事件 - end
      //推发货单
      pushbillsend: function() { //等庭苇给URL
        var selectedRows = viewModel.processOrderList.getSelectedRows();
        if (selectedRows.length < 0) {
          toastr.warning('请先至少选择一行数据!');
          return;
        }
        var ids = selectedRows.map(function(row) {
          return row.getValue('id');
        });
        $._ajax({
          url: appCtx + viewModel.baseurl + "/pushdownstream",
          type: "post",
          data: {
            ids: ids
          },
          success: function(data) {
            toastr.success();
            viewModel.search();
          }
        });
      },
      //推送装工单
      pushsendbill: function() {
        var selectedRows = viewModel.processOrderList.getSelectedRows();
        if (selectedRows.length < 0) {
          toastr.warning('请先至少选择一行数据!');
          return;
        }
        var ids = selectedRows.map(function(row) {
          return row.getValue('id');
        });
        $._ajax({
          url: appCtx + viewModel.baseurl + "/sendInstall/deliveryToInstall",
          type: "post",
          data: {
            ids: ids
          },
          success: function(data) {
            toastr.success();
            viewModel.search();
          }
        });
      },
      //整单关闭
      allbillclose: function() { //等庭苇给URL
        var selectedRows = viewModel.processOrderList.getSelectedRows();
        if (selectedRows.length < 0) {
          toastr.warning('请先至少选择一行数据!');
          return;
        }
        var ids = selectedRows.map(function(row) {
          return row.getValue('id');
        });
        $._ajax({
          url: appCtx + viewModel.baseurl + "/oms-order-close",
          type: "post",
          data: {
            ids: ids
          },
          success: function(data) {
            toastr.success();
            viewModel.search();
          }
        });
      },
      //订单跟踪数据请求
      ordertrackDataRequest: function(id) {
        var orderId = id;
        $._ajax({
          type: "get",
          // data: { id:orderId },
          url: appCtx + '/b2c/order-track-infos/' + orderId,
          success: function(data) {
            viewModel.orderTrackData.setSimpleData(data);
            //订单跟踪物流方式
            var thislogisticsMode = viewModel.orderDetail.getValue('logisticsMode');
            //htmlID orderTrackContent 
            ordertrack.init.run("orderTrackContent", data, thislogisticsMode);
          }
        });
      },
      //查看产品详情
      productDetail: function(index) {
        var id = viewModel.goodsList.getRow(index).getValue("id");
        viewModel.productList.removeAllRows();
        //请求完整主子表信息
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + '/product/' + id,
          success: function(data) {
            viewModel.productList.setSimpleData(data);
          }
        })
        productDialog = u.dialog({
          "content": "#productinfo_win",
          "width": "90%"
        });
        var cancelButton = $("#productinfo_win .u-msg-cancel");
        cancelButton.unbind("click").click(function() {
          productDialog.close();
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.processOrderList.pageIndex(0);
        }
        viewModel.processOrderList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};

        var pageSize = viewModel.processOrderList.pageSize();
        var pageNumber = viewModel.processOrderList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        queryData["search_EQ_isReturn"] = "0";
        queryData["search_NOTEQ_billStatus"] = "01";
        $._ajax({
          type: "get",
          url: appCtx + viewModel.searchurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.processOrderList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.processOrderList.totalRow(data.totalElements);
            viewModel.processOrderList.totalPages(data.totalPages);
            //清空详情页
            viewModel.orderDetail.removeAllRows();
            viewModel.goodsList.removeAllRows();
            viewModel.productAllList.removeAllRows();
            viewModel.promList.removeAllRows();
            viewModel.linkList.removeAllRows();
            viewModel.logList.removeAllRows();
            viewModel.logList.totalRow(0);
            viewModel.logList.totalPages(0);
            //重置listIndex
            viewModel.listIndex = null;
          }
        });
        viewModel.commentList1.removeAllRows();
        viewModel.commentList2.removeAllRows();
        viewModel.commentList3.removeAllRows();
        viewModel.promList.removeAllRows();
        viewModel.linkList.removeAllRows();
        viewModel.goodsList.removeAllRows();
        viewModel.orderDetail.removeAllRows();
        viewModel.logList.removeAllRows();
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.processOrderList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.processOrderList.pageSize(size);
        viewModel.search(true);
      },
      // 可以进入编辑态
      canInEdit: function() {
        var canIn = true;
        var id = viewModel.processOrderList.getValue("id");
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/isRefer",
          async: false,
          data: {
            id: id
          },
          success: function(data) {
            if (data == 1) {
              toastr.error("已被引用数据不可编辑");
              canIn = false;
            }
          }
        })
        return canIn;
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.processOrderList.setRowFocus(index);
        if (!viewModel.canInEdit()) {
          return;
        }
        var id = viewModel.processOrderList.getValue("id");
        viewModel.processOrderList.originEditData = viewModel.processOrderList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      //进入复制单据页
      showCopyBillPanel: function() {
        var selectedRows = viewModel.processOrderList.getSelectedRows();
        // 只支持单一复制，批量复制需单独处理
        if (selectedRows.length != 1) {
          toastr.error("请选择一条要复制的行");
          return;
        }
        var copyRow = selectedRows[0];
        var curRow = viewModel.processOrderList.createEmptyRow();
        curRow.setSimpleData(copyRow.getSimpleData());
        viewModel.processOrderList.setRowFocus(curRow);
        var id = copyRow.getValue("id");
        //查询子表数据
        viewModel.findByParentid(id);
        //删除主表主键，编码，审计信息
        viewModel.clearBaseProp(curRow);
        //删除子表主键，子表主表关联
        var subRows = viewModel.complexItems.getAllRows();
        for (var i = 0; i < subRows.length; i++) {
          viewModel.clearBaseProp(subRows[i]);
          subRows[i].setValue("parentid", "");
        }
        viewModel.goBillPanel();
        viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
      },
      //详情
      // 方案1：clone编辑态模板，设置只读，返回删除
      // 方案2：重新定义详情模板
      // 主要看差异，如果差异不大公用模板，差异大重新定义
      // detail: function() {
      //   //确保grid先将行设置为focus状态
      //   setTimeout(function(){
      //     var curRow = viewModel.processOrderList.getCurrentRow();
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
        if (viewModel.listIndex == obj.rowIndex) {
          return true;
        } else {
          viewModel.listIndex = obj.rowIndex;
        }
        viewModel.processOrderList.setRowSelect(obj.rowIndex);
        var id = viewModel.processOrderList.getRow(obj.rowIndex).getValue("id");
        //请求完整主子表信息
        viewModel.fillOrderDetailData(id);
        viewModel.searchLog(true);
        //设置tab显示基本信息
        $(".ui-bill-detail .u-tabs__tab").eq(1).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-detail .u-tabs__panel").eq(1).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        // viewModel.goDetailPanel();
        return true;
      },
      //查询子表数据
      fillOrderDetailData: function(id) {
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + '/detail/' + id,
          // data: { id: id },
          success: function(data) {
            //当前data
            viewModel.orderDetail.setSimpleData(data);
            for (var i = 0; i < data.orderGoods.length; i++) {
              if (parseFloat(data.orderGoods[i].buyNum) == "0") {
                data.orderGoods[i].receivablePriceUntil = 0;
              } else {
                data.orderGoods[i].receivablePriceUntil = parseFloat(data.orderGoods[i].receivableFee) / parseFloat(data.orderGoods[i].buyNum);
              }
            }
            viewModel.goodsList.setSimpleData(data.orderGoods, {
              unSelect: true
            });
            viewModel.promList.setSimpleData(data.orderPromotion, {
              unSelect: true
            });
            viewModel.linkList.setSimpleData(data.orderLink, {
              unSelect: true
            });
            //调用订单跟踪请求
            viewModel.ordertrackDataRequest(id);
            //展示所有产品
            viewModel.productAllList.setSimpleData(data.orderProduct, {
              unSelect: true
            });
            //备注信息处理
            var commentList = data.commentList;
            var commentList1 = [];
            var commentList2 = [];
            var commentList3 = [];
            for (var i = 0; i < commentList.length; i++) {
              if (commentList[i].commentCategory == 0) {
                commentList1.push(commentList[i]);
              } else if (commentList[i].commentCategory == 1) {
                commentList2.push(commentList[i]);
              } else if (commentList[i].commentCategory == 2) {
                commentList3.push(commentList[i]);
              }
            }
            viewModel.commentList1.setSimpleData(commentList1, {
              unSelect: true
            });
            viewModel.commentList2.setSimpleData(commentList2, {
              unSelect: true
            });
            viewModel.commentList3.setSimpleData(commentList3, {
              unSelect: true
            });
          }
        })
      },
      //查询日志
      searchLog: function(reindex) {
        if (reindex) {
          viewModel.logList.pageIndex(0);
        }
        viewModel.logList.removeAllRows();
        var queryData = {};
        queryData.size = viewModel.logList.pageSize();
        queryData.page = viewModel.logList.pageIndex();
        queryData['search_EQ_order.id'] = viewModel.processOrderList.getValue('id');
        $.ajax({
          type: "get",
          url: appCtx + '/b2c/order-logs',
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.logList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.logList.totalRow(data.totalElements);
            viewModel.logList.totalPages(data.totalPages);
          }
        })
      },
      // function() {
      //   //确保grid先将行设置为focus状态
      //   setTimeout(function() {
      //     var curRow = viewModel.processOrderList.getCurrentRow();
      //     var id = curRow.getValue("id");
      //     viewModel.findByParentid(id);
      //     viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
      //     viewModel.goDetailPanel();
      //   }, 0);
      // },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + '/detail/' + id,
          // data: { id: id },
          success: function(data) {
            //当前data
            viewModel.orderDetail.setSimpleData(data);
            for (var i = 0; i < data.orderGoods.length; i++) {
              if (parseFloat(data.orderGoods[i].buyNum) == "0") {
                data.orderGoods[i].receivablePriceUntil = 0;
              } else {
                data.orderGoods[i].receivablePriceUntil = parseFloat(data.orderGoods[i].receivableFee) / parseFloat(data.orderGoods[i].buyNum);
              }
            }
            viewModel.goodsList.setSimpleData(data.orderGoods, {
              unSelect: true
            });
            viewModel.promList.setSimpleData(data.orderPromotion, {
              unSelect: true
            });
            viewModel.linkList.setSimpleData(data.orderLink, {
              unSelect: true
            });
            //调用订单跟踪请求
            viewModel.ordertrackDataRequest(id);
            //展示所有产品
            viewModel.productAllList.setSimpleData(data.orderProduct, {
              unSelect: true
            });
            //备注信息处理
            var commentList = data.commentList;
            var commentList1 = [];
            var commentList2 = [];
            var commentList3 = [];
            for (var i = 0; i < commentList.length; i++) {
              if (commentList[i].commentCategory == 0) {
                commentList1.push(commentList[i]);
              } else if (commentList[i].commentCategory == 1) {
                commentList2.push(commentList[i]);
              } else if (commentList[i].commentCategory == 2) {
                commentList3.push(commentList[i]);
              }
            }
            viewModel.commentList1.setSimpleData(commentList1, {
              unSelect: true
            });
            viewModel.commentList2.setSimpleData(commentList2, {
              unSelect: true
            });
            viewModel.commentList3.setSimpleData(commentList3, {
              unSelect: true
            });
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
        if (!result.passed) {
          return;
        }
        var allRows = viewModel.complexItems.getAllRows();
        if (allRows.length == 0 || allRows.every(function(row) {
            return row.status == u.Row.STATUS.FALSE_DELETE
          })) {
          toastr.error("请录入表体行数据");
          return;
        }
        var complexData = viewModel.processOrderList.getCurrentRow().getSimpleData();
        var complexItemsData = viewModel.complexItems.getSimpleData();
        complexData.proComItems = complexItemsData;
        var _ajaxType = viewModel.processOrderList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.processOrderList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.processOrderList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function() {
        viewModel.complexItems.removeAllRows();
        var curRow = viewModel.processOrderList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.processOrderList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.processOrderList.removeRow(curRow);
          viewModel.complexItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function() {
        viewModel.clearItemsRef();
        $("#addItemsRef .refer").trigger("click");
      },
      //清空已选销售产品参照
      clearItemsRef: function() {
        viewModel.orderSignfList.setValue("ordersignref", "");
        var refer = $("#refContainerordersignref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      detail2bill: function() {
        if (!viewModel.canInEdit()) {
          return;
        }
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      //导出
      exportHandle: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.processOrderList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      // 删除订单标记
      delOrderSign: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.processOrderList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.processOrderList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + '/order-sign',
          type: "post",
          data: {
            orderids: ids.join(","),
            signid: ''
          },
          success: function(data) {
            toastr.success();
            if (rows && rows.length > 0) {
              for (var i = 0; i < rows.length; i++) {
                rows[i].setValue("orderSignColor", null);
              }
            }
          }
        });
      },
      // 订单添加标记
      orderSign: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.processOrderList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.processOrderList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        viewModel.clearItemsRef();
        $("#orderSignRef .refer").trigger("click");
      },
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
    },
    afterCreate: function() { // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      // 子表参照聚焦行，用于绑定子表参照组件
      var refRow = viewModel.orderSignfList.createEmptyRow();
      viewModel.orderSignfList.setRowFocus(refRow);
      // 确定销售产品参照，为产品组合子表增行
      viewModel.orderSignfList.on("ordersignref.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }

        var ids = [];
        var rows = viewModel.processOrderList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
        }

        var refer = $("#refContainerordersignref").data("uui.refer");
        var refValues = refer.values;
        $._ajax({
          url: appCtx + viewModel.baseurl + '/order-sign',
          type: "post",
          data: {
            orderids: ids.join(","),
            signid: refValues[0].id
          },
          success: function(data) {
            if (rows && rows.length > 0) {
              for (var i = 0; i < rows.length; i++) {
                rows[i].setValue("orderSignColor", refValues[0].refcode);
              }
            }
            // viewModel.processOrderList.removeRows(rows);
          }
        });
      });
      //物流方式枚举
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.LogisticsModeEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.logisticsModeSrc = newarray;
        }
      });
      //平台状态枚举
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.OrderPlatformBillStatus"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.OrderPlatformBillStatusSrc = newarray;
        }
      });
      //订单状态枚举
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.OrderBillStatus"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.orderStatusSrc = newarray;
          for (var i = 0; i < newarray.length; i++) {
            if (newarray[i].value != "09") {
              viewModel.orderStatus4QuerySrc.push(newarray[i]);
            }
          }
        }
      });
      //订单类型枚举
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/orderType-auth-ref/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.OrderTypeEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.orderTypeSrc = newarray;
        }
      });
      //配送方式枚举
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.DeliveryModeEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.deliveryModeSrc = newarray;
        }
      });
      //订单来源枚举
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.OrderSourceEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.orderSourceSrc = newarray;
        }
      });
      //关联类别枚举
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.LinkTypeEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.linkTypeSrc = newarray;
        }
      });
      //退款状态
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.RefundStatusEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.refundStatusSrc = newarray;
        }
      });
      //零售单状态
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.SendStatusEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.saleBillStatus = newarray;
        }
      });
      //发货状态
      $._ajax({
        type: "get",
        url: appCtx + "/b2c/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.SendStatusEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.sendStatusSrc = newarray;
        }
      });
      //绑定输入框enter事件
      $('#processOrderList-searchcontent input').off("keydown").on("keydown", function(e) {
        if (e.keyCode == 13) {
          $(this).blur();
          viewModel.search();
        }
      });
    }
  });

  return view;
});