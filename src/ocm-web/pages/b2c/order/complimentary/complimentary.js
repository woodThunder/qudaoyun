define(['text!./complimentary.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function(tpl, common, searchbox) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch, productDialog, popupDialog, complimentaryPopupSearch;
  baseData = {
    baseurl: '/b2c/orders',
    processOrderList: new u.DataTable(orderMeta),
    orderDetail: new u.DataTable(orderMeta),
    goodsList: new u.DataTable(goodsMeta),
    promList: new u.DataTable(promMeta),
    linkList: new u.DataTable(linkMeta),
    productList: new u.DataTable(productMeta),
    productAllList: new u.DataTable(productMeta),
    logList: new u.DataTable(logMeta),
    listIndex: null,
    //买家留言
    commentList1: new u.DataTable(remarkMeta),
    //卖家留言
    commentList2: new u.DataTable(remarkMeta),
    //订单备注
    commentList3: new u.DataTable(remarkMeta),
    //赠品
    complimentaryurl: '/base/goods',
    complimentaryData: new u.DataTable(complimentary),
    addComplimentaryData: new u.DataTable(addComplimentary),
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
    //退款状态
    returnFeeStatusSrc: [],
    //发货预警
    deliveryWarn: [{
      value: "0",
      name: "否"
    }, {
      value: "1",
      name: "是"
    }, ],
    //赠品是否在售
    isSaleCompSrc: [{
      value: "0",
      name: "否"
    }, {
      value: '1',
      name: "是"
    }],
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
    //发货状态
    sendStatusSrc: [],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,

    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
  };
  rendertype = {
    operation: function(obj) {
      var dataTableRowId = obj.row.value['$_#_@_id'];
      var delfun = "data-bind=click:delAddComplimentaryData.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
      //var delfun = "data-bind=click:delAddComplimentaryData.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle-word">' +
        '<a href="#" class="" ' +
        delfun +
        ' title="删除">删除</a>' +
        '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    operationComplimentary: function(obj) {
      var dataTableRowId = obj.row.value['$_#_@_id'];
      //var delfun = "data-bind=click:delAddComplimentaryData.bind($data," + obj.rowIndex + ","+dataTableRowId+")";
      var editfun = "data-bind=click:addComplimentary.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle-word">' +
        '<a href="#" class="" ' +
        editfun +
        ' title="添加赠品">添加赠品</a>' +
        '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    //购买数量
    purchaseQuantity: function() {

      var inputCss = {
        'background': '#fff',
        'border': ' 1px solid #DDDDDD',
        'margin-top': '8px',
        'padding': '0',
        'border-radius': ' 4px',
        'text-indent': ' 5px',
        'padding-right': ' 20px'
      };
      var inputFocusCss = {
        'border': '1px solid #5BB9A1',
        'outline': '0',
        'box-shadow': '0 0 0 2px #e5f4f0'
      };


      //var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML =
        '<input class="ui-grid-editInput" type="text"    > ';
      /*
      <div class="u-grid-content-td-div" style="text-align:left;" title="7">
      <div class="eType-input is-upgraded is-dirty is-focused">
      <input type="text" class="u-input" hasvalidate="true" title="7">  
      </div>
      </div>
      */


      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);

      $(".ui-grid-editInput").css(inputCss);
      $(".ui-grid-editInput").focus(function() {
        $(".ui-grid-editInput").css(inputCss + inputFocusCss);
      });
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
  };
  events = {
    //删除-添加赠品
    delAddComplimentaryData: function(rowIndex, rowId) {
      var row = viewModel.addComplimentaryData.getRowByRowId(rowId);
      var rows = viewModel.addComplimentaryData.getAllRows();
      var id = row.getValue("id");
      for (var i = rows.length - 1; i >= 0; i--) {
        if (rows[i].getValue("id") === id) {
          viewModel.addComplimentaryData.removeRows([i], {
            forceDel: true
          });
        }
      };
      //取消删除条-选中状态
      viewModel.updateSelectedIndices();
      if (rows.length < 1) { //删除最后1条，取消全部选中状态
        viewModel.complimentaryData.setAllRowsUnSelect();
      }
    },
    //查看详情
    detail: function(obj, rowId) {
      //确保grid先将行设置为focus状态
      if (viewModel.listIndex == obj.rowIndex) {
        return true;
      } else {
        viewModel.listIndex = obj.rowIndex;
      }
      viewModel.processOrderList.setRowSelect(obj.rowIndex);
      var id = obj.rowObj.value.id;
      //请求完整主子表信息
      viewModel.fillOrderDetailData(id);
      viewModel.searchLog(obj.rowIndex);
      //设置tab显示基本信息
      $(".ui-bill-detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
      $(".ui-bill-detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
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
          viewModel.goodsList.setSimpleData(data.orderGoods);
          viewModel.promList.setSimpleData(data.orderPromotion);
          viewModel.linkList.setSimpleData(data.orderLink);
          //展示所有产品
          viewModel.productAllList.setSimpleData(data.orderProduct);
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
          viewModel.commentList1.setSimpleData(commentList1);
          viewModel.commentList2.setSimpleData(commentList2);
          viewModel.commentList3.setSimpleData(commentList3);
        }
      })
    },
    //导入
    importHandle: function() {
      var urlInfo = '/order-gift-excel/excelDataImport'; //倒入地址参数
      var urlStatusInfo = '/order-gift-excel/excelLoadingStatus'; //请求进度地址参数
      var ele = $('#importFiel')[0]; //挂载元素
      common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1);
    },
    //导出
    exportHandle: function() {
      var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
      var templateUrl = '/order-gift-excel/downloadExcelTemplate'; //导出模板地址参数
      var excelDataUrl = '/order-gift-excel/excelDataExport'; //导出数据地址参数
      var listData = viewModel.processOrderList; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      common.fileHandle.exportTemplate(listData, ele, searchParams, templateUrl, excelDataUrl);
    },
    //添加赠品-弹窗
    addComplimentary: function(rowIndex, rowId) {
      var self = this;
      //清空
      viewModel.addComplimentaryData.removeAllRows();
      complimentaryPopupSearch.clearSearch();
      var orderId = ''
      var rowData = viewModel.processOrderList.getRowByRowId(rowId);
      var rows = viewModel.processOrderList.getSelectedRows();
      //点击编辑自动勾选
      if (typeof(rowIndex) == 'number') {
        viewModel.processOrderList.setRowSelect(rowIndex);
      }
      if (rowData) { //点击操作添加
        orderId = rowData.getValue("id");
      } else { //复选 添加

        if (rows.length > 1) { //选择一条数据
          toastr.error('不支持选择多条订单添加赠品');
          return;
        } else if (rows.length > 0) { //选择1条数据
          orderId = rows[0].getValue("id");
        } else {
          toastr.error('请选择一条订单添加赠品');
          return;
        }

      }

      viewModel.searchComplimentary();
      popupDialog = u.dialog({
        id: 'complimentary-popup',
        content: "#complimentary-popup",
        "width": "80%"
      });

      var okButton = $("#complimentary-popup .u-msg-ok");
      okButton.unbind("click").click(function() {

        if (self.addSaveComplimentary(orderId)) {
          popupDialog.close();
        }
      });
      var cancelButton = $("#complimentary-popup .u-msg-cancel");
      cancelButton.unbind("click").click(function() {
        popupDialog.close();
        viewModel.addComplimentaryData.removeAllRows();
      });

      var btCss = { //待选区/已选区--标题css
        'display': 'inline-block',
        'padding': '0 16px',
        'border-bottom': '2px solid #ddd',
        'color': '#999',
        'font-size': '13px',
        'height': '30px',
        'line-height': '30px'
      }
      $(".ui-complimentary-list-bt").css(btCss);
      $(".ui-complimentary-list-bt.ui-green").css({
        'border-bottom': '2px solid #00936D',
        'color': '#00936D',
      });
    },
    //已选-赠品
    addActiveComplimentary: function() {
      var addData = viewModel.complimentaryData.getSimpleData();
      viewModel.addComplimentaryData.setSimpleData(addData);
    },
    //选择-赠品
    productselecthandle: function(obj) {
      var selectedRows = viewModel.complimentaryData.getAllRows();
      var curRow = viewModel.complimentaryData.getRow(obj.rowIndex);
      var data = curRow.getSimpleData();
      var addRow = viewModel.addComplimentaryData.getRowByField("id", curRow.getValue("id"));

      if (!addRow) {
        viewModel.addComplimentaryData.addSimpleData(data, null, {
          unSelect: true
        });
      }
    },
    //去除-赠品
    productunselecthandle: function(obj) {
      var id = obj.rowObj.value.id;
      var rows = viewModel.addComplimentaryData.getAllRows();

      for (var i = rows.length - 1; i >= 0; i--) {
        if (rows[i].getValue("id") === id) {
          viewModel.addComplimentaryData.removeRows([i], {
            forceDel: true
          });
        }
      }
    },
    //已选赠品-翻页
    updateSelectedIndices: function() {
      var selectedRows = viewModel.addComplimentaryData.getAllRows(),
        selectedIds,
        selectedIndices = [],
        rows;

      if (selectedRows && selectedRows.length > 0) {
        selectedIds = selectedRows.map(function(row) {
          return row.getValue("id");
        });
        rows = viewModel.complimentaryData.getAllRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            var id = rows[i].getValue("id");
            if ($.inArray(id, selectedIds) > -1) {
              selectedIndices.push(i);
            }
          }
        }
        if (selectedIndices.length > 0) {
          viewModel.complimentaryData.setRowsSelect(selectedIndices);
        }
      } else {
        return;
      }
    },
    //保存-赠品
    addSaveComplimentary: function(id) {

      var orderId = id;
      var addData = viewModel.addComplimentaryData.getSimpleData();
      if (!addData) {
        toastr.error('请选择赠品再点击保存');
        return false;
      }

      var myData = {
        orderId: orderId,
        data: JSON.stringify(addData)
      }
      //更改后台数据
      $._ajax({
        url: appCtx + viewModel.baseurl + '/addGift',
        type: 'post',
        data: myData,
        // contentType : "application/json; charset=utf-8",
        success: function(data) {
          toastr.success('保存成功');
        }
      });
      //}
      return true;

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

    //点击取消 单据页
    cancelHandle: function() {
      viewModel.retListPanel();
    },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function(reindex) {
      if (reindex) {
        viewModel.processOrderList.pageIndex(0);
      }
      viewModel.processOrderList.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      queryData.size = viewModel.processOrderList.pageSize();
      queryData.page = viewModel.processOrderList.pageIndex();
      queryData["search_EQ_isReturn"] = "0";
      queryData["search_EQ_orderType"] = "0"; //普通商品
      // queryData["search_NOTIN_billStatus"] = "01";//订单状态不查
      queryData["search_NOTIN_billStatus"] = "01,02,08,09" //订单状态为查询条件，未审核，已审核，已分拨，已发货，已完成
      $.ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function(data) {
          viewModel.processOrderList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.processOrderList.totalRow(data.totalElements);
          viewModel.processOrderList.totalPages(data.totalPages);
          viewModel.listIndex = null;
        }
      });
      viewModel.commentList1.removeAllRows();
      viewModel.commentList2.removeAllRows();
      viewModel.commentList3.removeAllRows();
      viewModel.logList.removeAllRows();
      viewModel.linkList.removeAllRows();
      viewModel.goodsList.removeAllRows();
      viewModel.orderDetail.removeAllRows();
    },
    //搜索赠品数据
    searchComplimentary: function(reindex) {
      if (reindex) {
        viewModel.complimentaryData.pageIndex(0);
      }
      viewModel.complimentaryData.removeAllRows();
      var queryData = complimentaryPopupSearch.getDataWithOpr();
      queryData["search_EQ_virtualLink"] = '0'; //查询条件
      queryData.size = viewModel.complimentaryData.pageSize();
      queryData.page = viewModel.complimentaryData.pageIndex();
      $.ajax({
        type: "get",
        url: window.pathMap.base + viewModel.complimentaryurl,
        dataType: "json",
        data: queryData,
        //async:false,
        success: function(data) {
          viewModel.complimentaryData.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.complimentaryData.totalRow(data.totalElements);
          viewModel.complimentaryData.totalPages(data.totalPages);
          viewModel.updateSelectedIndices();
        }
      })
    },
    //清空搜索条件
    cleanSearch: function() {
      singledocSearch.clearSearch();
    },
    //清空搜索条件-赠品
    cleanSearchComplimentary: function() {
      complimentaryPopupSearch.clearSearch();
    },
    //页码改变时的回调函数-赠品
    pageChangeCompl: function(index) {
      viewModel.complimentaryData.pageIndex(index);
      viewModel.searchComplimentary();
    },
    //页码改变时的回调函数-赠品
    sizeChangeCompl: function(size) {
      viewModel.complimentaryData.pageSize(size);
      viewModel.searchComplimentary(true);
    },
    //页码改变时的回调函数-add赠品
    sizeChangeComplAdd: function(size) {
      //viewModel.addComplimentaryData.pageSize(size);
      viewModel.complimentaryData.pageSize(size);
      //viewModel.searchComplimentary(true);
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
    //页码改变时的回调函数
    pageChangeLog: function(index) {
      viewModel.logList.pageIndex(index);
      viewModel.searchLog();
    },
    //页码改变时的回调函数
    sizeChangeLog: function(size) {
      viewModel.logList.pageSize(size);
      viewModel.searchLog(true);
    },
  }

  viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

  function appInit(element, params) {
    //将模板页渲染到页面上
    element.innerHTML = tpl;
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
        viewModel.returnFeeStatusSrc = newarray;
      }
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
          var value = newarray[i].value;
          if (value == "03" || value == "04" || value == "05" || value == "06" || value == "07") {
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
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#processOrderList-searchcontent")[0], [{
          type: "text",
          key: "pcode",
          label: "平台单号"
        }, {
          type: "text",
          key: "code",
          label: "电商单号"
        }, {
          type: "refer",
          key: "platform--id",
          label: "三方平台",
          refinfo: "b2cplatform",
          refName: "所属平台",
          multi: true,
          opr: "IN",
        }, {
          type: "text",
          key: "buyer",
          label: "顾客ID"
        }, {
          type: "text",
          key: "orderReceiver--receiver",
          label: "顾客姓名"
        }, {
          type: "text",
          key: "orderReceiver--receiverPhone",
          label: "顾客联系方式"
        }, {
          type: "text",
          key: "orderReceiver--receiverAddress",
          label: "顾客收货地址"
        }, {
          type: "daterange",
          key: "deliverTime",
          label: "发货时间"
        }, {
          type: "daterange",
          key: "auditTime",
          label: "审核时间"
        }, {
          type: "daterange",
          key: "payTime",
          label: "付款时间"
        }, {
          type: "text",
          key: "store--name",
          label: "店铺名称"
        }, {
          type: "refer",
          key: "serviceProvider",
          label: "服务商",
          refinfo: "customers",
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_isServiceProvider": "1"
          },
          multi: true,
          opr: "IN",
        }, {
          type: "radio",
          key: "isLock",
          label: "冻结状态",
          // defaultvalue:"",
          dataSource: [{
            value: '',
            name: '全部'
          }, {
            value: '0',
            name: '否'
          }, {
            value: '1',
            name: '是'
          }]
        }, {
          type: "checkboxlist",
          key: "platformBillStatus",
          label: "平台状态",
          dataSource: [{
            value: '01',
            name: '待发货'
          }, {
            value: '02',
            name: '已发货'
          }, {
            value: '03',
            name: '交易完成'
          }],
          cls: "ui-checkboxes-item"
        }, {
          type: "checkboxlist",
          key: "orderType",
          label: "订单类型",
          dataSource: viewModel.orderTypeSrc,
          cls: "ui-checkboxes-item"
        }, {
          type: "checkboxlist",
          key: "billStatus",
          label: "订单状态",
          dataSource: viewModel.orderStatus4QuerySrc,
          cls: "ui-checkboxes-item"
        },

        {
          type: "checkboxlist",
          key: "logisticsMode",
          label: "物流方式",
          dataSource: viewModel.logisticsModeSrc,
          cls: "ui-checkboxes-item"
        }, {
          type: "radio",
          key: "isException",
          label: "异常状态",
          dataSource: [{
            value: '',
            name: '全部'
          }, {
            value: '0',
            name: '否'
          }, {
            value: '1',
            name: '是'
          }]
        },
      ]);

    // 查询组件-赠品
    complimentaryPopupSearch = new searchbox(
      $("#complimentaryPopup-search")[0], [{
        type: "text",
        key: "code",
        label: "商品编码",
      }, {
        type: "text",
        key: "name",
        label: "商品名称",
      }, {
        type: "combo",
        key: "logisticsMode",
        label: "物流方式",
        dataSource: viewModel.logisticsModeSrc,
      }, {
        type: "combo",
        key: "isSale",
        label: "是否在售",
        dataSource: viewModel.isSaleCompSrc,
      }]);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender() {
    // 初始化折叠面板
    $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#processOrderList-searchcontent input').off("keydown").on("keydown", function(e) {
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