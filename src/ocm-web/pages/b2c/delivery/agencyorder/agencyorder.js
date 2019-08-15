define(['text!./agencyorder.html', 'ocm_common', 'ocm_baseview', './meta.js', 'ocm_ordertrack'], function(tpl, common, baseview, model, ordertrack) {
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
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/b2c/customer-order-products',
      searchurl: '/b2c/customer-orders',
      agencyOrderList: new u.DataTable(model.options.metas.agencyordermain),
      agencyOrderItem: new u.DataTable(model.options.metas.agencyordersub),
      logList: new u.DataTable(model.options.metas.logMeta),

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      grid1Option: model.options.grids.grid1,
      grid3Option: model.options.grids.grid3,
      grid6Option: model.options.grids.grid6,
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
      //物流方式
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
            return "经销商订单 ";
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
            return "否";
          case '1':
            return "是";
          default:
        }
      }),
      //配送方式
      deliveryModeList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("serviceMode")();
        switch (enableStatus) {
          case '0':
            return "送装";
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
        var enableStatus = viewModel.orderDetail.ref("billstatus")();
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
            return "否";
          case '1':
            return "是";
          default:
        }
      }),
      //发货状态
      sendStatusList: ko.pureComputed(function() {
        var enableStatus = viewModel.orderDetail.ref("sendStatus")();
        switch (enableStatus) {
          case '0':
            return "未发货";
          case '1':
            return "全部发货";
          case '2':
            return "部分发货";
          default:
        }
      }),
      //异常状态
      exceptionStatusSrc: [{
        value: null,
        name: "正常"
      }, {
        value: "",
        name: "正常"
      }, {
        value: "1",
        name: "异常"
      }, {
        value: "0",
        name: "正常"
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
      //物流方式
      logType: function(obj) {
        var showValue = obj.value == "1" ? "自提" : "送装";
        obj.element.innerHTML = showValue;
      },
      //冻结标识
      lockRender: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      statusLists: function(obj) {
        switch (obj.value) {
          case '1':
            obj.element.innerHTML = '未发货';
            break;
          case '2':
            obj.element.innerHTML = '已发货';
            break;
          case '3':
            obj.element.innerHTML = '已签收';
            break;
          case '4':
            obj.element.innerHTML = '已结算';
            break;
          case '5':
            obj.element.innerHTML = '已关闭';
            break;
            // case '07':
            //   obj.element.innerHTML = '已完成';
            //   break;
            // case '08':
            //   obj.element.innerHTML = '已关闭';
            //   break;
            // case '09':
            //   obj.element.innerHTML = '已拆分';
            //   break;
        }
      },
      //同步标识
      synsRender: function(obj) {
        var showValue = obj.value == "1" ? "  是" : "否";
        obj.element.innerHTML = showValue;
      },
      //是否欠件标识
      ownRender: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      // //跳转详情页
      // detailRender: function(obj) {
      //   var viewModel = obj.gridObj.viewModel;
      //   var dataTableRowId = obj.row.value['$_#_@_id'];
      //   var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
      //   obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
      //   ko.cleanNode(obj.element);
      //   ko.applyBindings(viewModel, obj.element);
      // },
    },
    events: {
      //订单跟踪数据请求
      // ordertrackDataRequest: function(id) {
      //   var orderId = id;
      //   $._ajax({
      //     type: "get",
      //     // data: { id:orderId },
      //     url: appCtx + '/b2c/order-track-infos/' + orderId,
      //     success: function(data) {
      //       viewModel.orderTrackData.setSimpleData(data);
      //       //订单跟踪物流方式
      //       var thislogisticsMode = viewModel.orderDetail.getValue('logisticsMode');
      //       //htmlID orderTrackContent
      //       ordertrack.init.run("orderTrackContent", data, thislogisticsMode);
      //     }
      //   });
      // },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.agencyOrderList.pageIndex(0);
        }
        viewModel.agencyOrderList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.agencyOrderList.pageSize();
        var pageNumber = viewModel.agencyOrderList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.searchurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.agencyOrderList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.agencyOrderList.totalRow(data.totalElements);
            viewModel.agencyOrderList.totalPages(data.totalPages);
            //清空详情页
            // viewModel.orderDetail.removeAllRows();
            viewModel.agencyOrderItem.removeAllRows();
            viewModel.logList.removeAllRows();
            viewModel.logList.totalRow(0);
            viewModel.logList.totalPages(0);
            //重置listIndex
            viewModel.listIndex = null;
          }
        });
        viewModel.agencyOrderItem.removeAllRows();
        viewModel.logList.removeAllRows();
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.agencyOrderList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.agencyOrderList.pageSize(size);
        viewModel.search(true);
      },
      // 可以进入编辑态
      canInEdit: function() {
        var canIn = true;
        var id = viewModel.agencyOrderList.getValue("id");
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
        viewModel.agencyOrderList.setRowFocus(index);
        if (!viewModel.canInEdit()) {
          return;
        }
        var id = viewModel.agencyOrderList.getValue("id");
        viewModel.agencyOrderList.originEditData = viewModel.agencyOrderList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      //进入复制单据页
      showCopyBillPanel: function() {
        var selectedRows = viewModel.agencyOrderList.getSelectedRows();
        // 只支持单一复制，批量复制需单独处理
        if (selectedRows.length != 1) {
          toastr.error("请选择一条要复制的行");
          return;
        }
        var copyRow = selectedRows[0];
        var curRow = viewModel.agencyOrderList.createEmptyRow();
        curRow.setSimpleData(copyRow.getSimpleData());
        viewModel.agencyOrderList.setRowFocus(curRow);
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
      //     var curRow = viewModel.agencyOrderList.getCurrentRow();
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
        viewModel.agencyOrderList.setRowSelect(obj.rowIndex);
        var id = viewModel.agencyOrderList.getRow(obj.rowIndex).getValue("id");
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
          url: appCtx + viewModel.baseurl,
          data: {
            "search_IN_customerOrder.id": id
          },
          success: function(data) {
            //当前data
            // viewModel.orderDetail.setSimpleData(data);
            // for (var i = 0; i < data.orderGoods.length; i++) {
            //   if (parseFloat(data.orderGoods[i].buyNum) == "0") {
            //     data.orderGoods[i].receivablePriceUntil = 0;
            //   } else {
            //     data.orderGoods[i].receivablePriceUntil = parseFloat(data.orderGoods[i].receivableFee) / parseFloat(data.orderGoods[i].buyNum);
            //   }
            // }
            // viewModel.agencyOrderItem.setSimpleData(data.orderLink, {
            //   unSelect: true
            // });
            //调用订单跟踪请求
            // viewModel.ordertrackDataRequest(id);
            viewModel.agencyOrderItem.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.agencyOrderItem.totalRow(data.totalElements);
            viewModel.agencyOrderItem.totalPages(data.totalPages);
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
        queryData['search_EQ_customerOrder.id'] = viewModel.agencyOrderList.getValue('id');
        $.ajax({
          type: "get",
          url: appCtx + '/b2c/customer-order-logs',
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
      //     var curRow = viewModel.agencyOrderList.getCurrentRow();
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
            //调用订单跟踪请求
            viewModel.ordertrackDataRequest(id);

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

      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
    },
    afterCreate: function() { // 初始化折叠面板
      $.fn.collapsepanel(false, true);
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
      $('#agencyOrderList-searchcontent input').off("keydown").on("keydown", function(e) {
        if (e.keyCode == 13) {
          $(this).blur();
          viewModel.search();
        }
      });
    }
  });

  return view;
});