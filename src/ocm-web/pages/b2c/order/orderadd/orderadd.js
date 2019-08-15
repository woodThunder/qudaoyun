define(['text!./orderadd.html', 'ocm_common', 'ocm_baseview', './meta.js', 'ocm_ordertrack'], function(tpl, common, baseview, model, ordertrack) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c",
    app,
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
      baseurl: '/b2c/orders',
      processOrderList: new u.DataTable(model.options.metas.orderMeta),
      orderDetail: new u.DataTable(model.options.metas.orderMeta),
      goodsList: new u.DataTable(model.options.metas.goodsMeta),
      promList: new u.DataTable(model.options.metas.promMeta),
      linkList: new u.DataTable(model.options.metas.linkMeta),
      // productList: new u.DataTable(productMeta),
      // productAllList: new u.DataTable(productMeta),
      logList: new u.DataTable(model.options.metas.logMeta),
      orderAdd: new u.DataTable(model.options.metas.orderMeta),
      goodsList4Add: new u.DataTable(model.options.metas.goodsMeta),
      //商品参照
      ProductRef: new u.DataTable(model.options.metas.ProductRef),
      //商品组合参照
      CombineProductRef: new u.DataTable(model.options.metas.CombineProductRef),
      //买家留言
      commentList1: new u.DataTable(model.options.metas.remarkMeta),
      //卖家留言
      commentList2: new u.DataTable(model.options.metas.remarkMeta),
      //订单备注
      commentList3: new u.DataTable(model.options.metas.remarkMeta),
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      card1Source: model.options.cards.card1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,
      details1Source: model.options.details.detail1,
      listIndex: null,
      //订单类型枚举
      orderTypeSrc: [],
      //订单状态枚举
      orderStatusSrc: [],
      //物流方式枚举
      logisticsModeSrc: [],
      //配送方式枚举
      deliveryModeSrc: [],
      //订单来源枚举
      orderSourceSrc: [],
      //平台状态
      OrderPlatformBillStatusSrc: [],
      //关联类别
      linkTypeSrc: [],
      //退款状态
      refundStatusSrc: [],
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
      //发货预警
      deliveryWarn: [{
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
      //发货状态
      sendStatusSrc: [],
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
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
      billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
    },
    rendertype: {
      precision2Render: common.rendertype.precision2Render,
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
        var showValue = obj.value == "1" ? "是" : "否"
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

      //操作
      operation: function(obj) {
        var billStatus = obj.row.value.billStatus;
        var delfun;
        var editfun;
        var confirmfun;
        if ("01" == billStatus) {
          delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
          editfun = "data-bind=click:beforedit.bind($data," + obj.rowIndex + ")";
          confirmfun = "data-bind=click:confirm.bind($data," + obj.rowIndex + ")";
        } else {
          delfun = 'class="disabled"';
          editfun = 'class="disabled"';
          confirmfun = 'class="disabled"';
        }
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
          '</span>' +
          '<span class="ui-handle-word">' +
          '<a ' +
          confirmfun +
          ' title="确认">确认</a>' +
          '</span></div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      }
    },
    events: {
      //选择选择客户经理编码前选择所属办事处编码
      discountFeeCheck: function(obj) {
        var colIndex = obj.colIndex;
        if (colIndex == '4') {
          var buyNum = viewModel.goodsList4Add.getRow(obj.rowIndex).getValue("buyNum");
          var price = viewModel.goodsList4Add.getRow(obj.rowIndex).getValue("price");
          var receivableFeeMax = 100000000;
          if (receivableFeeMax > buyNum * price) {
            receivableFeeMax = buyNum * price
          }
          obj.gridObj.gridCompColumnArr[colIndex].options.editOptions.max = receivableFeeMax;
        }
        return true;

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
        viewModel.searchLog(id);
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
            // viewModel.productAllList.setSimpleData(data.orderProduct);
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

      //进入新增单据页
      beforedit: function(index) {
        var self = this;
        var title;
        if (index >= 0) { //编辑
          viewModel.processOrderList.setRowFocus(index);
          var id = viewModel.processOrderList.getCurrentRow().getValue("id");
          var billStatus = viewModel.processOrderList.getCurrentRow().getValue("billStatus"); //订单状态
          if ("01" != billStatus) {
            toastr.warning('不允许编辑除暂存状态以外的订单');
            return;
          }
          //请求完整主子表信息
          viewModel.findByParentid(id);
          viewModel.goBillPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        } else { //新增
          $("#store").attr("data-refparam", '{"EQ_platform.id":""}');
          $("#city").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"2","EQ_parent.id":""}');
          $("#district").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"3","EQ_parent.id":""}');
          $("#town").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"4","EQ_parent.id":""}');
          var row = viewModel.orderAdd.createEmptyRow();
          viewModel.orderAdd.setRowFocus(row);
          viewModel.goodsList4Add.removeAllRows();
          row.setValue("orderSource", "2"); //补录
          row.setValue("isException", "0");
          row.setValue("isLock", "0");
          row.setValue("isSplitDispatch", "0");
          row.setValue("isUrgent", "0");
          row.setValue("billStatus", "01");
          row.setValue("bookTime", new Date().toString());
          row.setValue("payTime", new Date().toString());
          row.setValue("platformBillStatus", "01");
          row.setValue("serviceMode", "0");
          viewModel.goBillPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
        }
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + '/detail/' + id,
          // data: { id: id },
          success: function(data) {
            viewModel.orderAdd.setSimpleData(data);
            viewModel.goodsList4Add.removeAllRows();
            viewModel.goodsList4Add.setSimpleData(data.orderGoods, {
              unSelect: true
            });
            var orderReceiverProvince = data.orderReceiverProvince;
            var orderReceiverCity = data.orderReceiverCity;
            var orderReceiverDistrict = data.orderReceiverDistrict;
            $("#city").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"2","EQ_parent.id":"' + orderReceiverProvince + '"}');
            $("#district").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"3","EQ_parent.id":"' + orderReceiverCity + '"}');
            $("#town").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"4","EQ_parent.id":"' + orderReceiverDistrict + '"}');
          }
        })
      },
      //删除和批量删除
      del: function(index) {
        if (typeof(index) == 'number') {
          viewModel.processOrderList.setRowSelect(index);
        }
        var ids = [];
        var rows = viewModel.processOrderList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
            var billStatus = rows[i].getValue("billStatus"); //订单状态
            if ("01" != billStatus) {
              toastr.warning('不允许删除除暂存状态以外的订单');
              return;
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
                data: {
                  ids: ids.join(",")
                },
                success: function(data) {
                  viewModel.processOrderList.removeRows(rows);
                }
              });
            }
          });
        } else {
          toastr.warning("请先选择一行数据");
        }
      },

      //确认
      confirm: function(index) {
        if (typeof(index) == 'number') {
          viewModel.processOrderList.setRowSelect(index);
        }
        var ids = [];
        var rows = viewModel.processOrderList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            var billStatus = rows[i].getValue("billStatus"); //订单状态
            if ("01" != billStatus) {
              toastr.warning('不允许确认除暂存状态以外的订单');
              return;
            } else {
              ids.push(rows[i].getValue("id"));
            }

          }
          $._ajax({
            url: appCtx + viewModel.baseurl + "/confirm",
            type: "post",
            data: {
              ids: ids.join(",")
            },
            success: function(data) {
              viewModel.search();
            }
          });
        } else {
          toastr.warning("请先选择一行数据");
        }
      },
      //增行
      addRow: function() {
        // var emptyRow = viewModel.goodsList4Add.createEmptyRow({ unSelect: true });
        // viewModel.goodsList4Add.setRowFocus(emptyRow);
        // emptyRow.setValue('buyNum', 0);//购买数量
        // emptyRow.setValue('price', 0);//吊牌价
        // emptyRow.setValue('discountFee', 0);//优惠金额
        // emptyRow.setValue('receivableFee', 0);//成交金额
        // emptyRow.setValue('settlementFee', 0);//结算金额
        // emptyRow.setValue('closeNum', 0);//关闭数量
        // emptyRow.setValue('closedFee', 0);//关闭金额
        // emptyRow.setValue('returnFee', 0);//退款金额
        viewModel.showRealProductRef();
      },
      //商品组合增行
      addCombineRow: function() {
        viewModel.showRealCombineProductRef();
      },
      //删行
      delRow: function() {
        if (typeof(data) == 'number') {
          viewModel.goodsList4Add.setRowSelect(data);
        }
        var ids = [];
        var rows = viewModel.goodsList4Add.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          var rows = viewModel.goodsList4Add.getSelectedRows();
          viewModel.goodsList4Add.removeRows(rows);
        } else {
          toastr.warning('请选择数据');
          return;
        }
      },
      //导入
      importHandle: function() {
        var urlInfo = '/order-add-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/order-add-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1);
      },
      //导出
      exportHandle: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = '/order-add-excel/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = '/order-add-excel/excelDataExport'; //导出数据地址参数
        var listData = viewModel.goodsList4Add; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportTemplate(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      // 点击grid产品参照 触发外部真实产品参照
      showRealProductRef: function() {
        viewModel.clearRealProductRef();
        $("#productRefer .refer").trigger("click");
      },
      // 清除参照之前的选择
      clearRealProductRef: function() {
        viewModel.ProductRef.setValue("productRefer", "");
        var refer = $("#refContainerproductRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      // 点击grid产品参照 触发外部真实产品参照
      showRealCombineProductRef: function() {
        viewModel.clearRealCombineProductRef();
        $("#combineProductRefer .refer").trigger("click");
      },
      // 清除参照之前的选择
      clearRealCombineProductRef: function() {
        viewModel.CombineProductRef.setValue("combineProductRefer", "");
        var refer = $("#refContainercombineProductRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      saveBill: function() {
        var type = "post";
        // if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
        //   type = "put";
        // }
        var orderData = viewModel.orderAdd.getCurrentRow().getSimpleData();
        var goodsData = viewModel.goodsList4Add.getSimpleData() || [];
        orderData.orderGoods = goodsData;
        orderData.orderLink = [];
        orderData.orderLog = [];
        orderData.orderProduct = [];
        orderData.orderPromotion = [];
        var validate = $("#validate")[0];
        var result = app.compsValidateMultiParam({
          element: validate,
          showMsg: true
        });
        if (goodsData.length == 0) {
          toastr.warning('订单商品不可为空');
          return;
        }
        // add by daikai3 购买数量不能为0校验
        // start
        for (var i = 0; i < goodsData.length; i++) {
          var buyNum = goodsData[i].buyNum;
          if (0 == buyNum) {
            toastr.warning('购买数量不能为0');
            return;
          }
        }
        // end

        if (result.passed) {
          $._ajax({
            url: appCtx + viewModel.baseurl + "/add",
            type: type,
            data: JSON.stringify(orderData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              // viewModel.processOrderList.getFocusRow().setSimpleData(data);
              viewModel.search();
              viewModel.retListPanel();
            }
          });
        }
      },
      //点击取消 单据页
      cancelBill: function() {
        viewModel.retListPanel();
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.processOrderList.pageIndex(0);
        }
        viewModel.processOrderList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.size = viewModel.processOrderList.pageSize();
        queryData.page = viewModel.processOrderList.pageIndex();
        queryData["search_EQ_isReturn"] = "0";
        queryData["search_EQ_billStatus"] = "01"; //订单补录只查询订单状态为暂存的订单
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
        viewModel.orderDetail.removeAllRows();
        viewModel.goodsList.removeAllRows();
        viewModel.logList.removeAllRows();
        viewModel.commentList1.removeAllRows();
        viewModel.commentList2.removeAllRows();
        viewModel.commentList3.removeAllRows();
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
    },

    // function appInit(element, params) {

    //   // 列表查询数据(无查询条件)
    //   viewModel.search();
    //   var productRow = viewModel.ProductRef.createEmptyRow();
    //   viewModel.ProductRef.setRowFocus(productRow);
    //   var combineProductRow = viewModel.CombineProductRef.createEmptyRow();
    //   viewModel.CombineProductRef.setRowFocus(combineProductRow);
    // },

    afterCreate: function() {
      app = viewModel.app;
      // 子表参照聚焦行，用于绑定子表参照组件
      var refRow = viewModel.ProductRef.createEmptyRow();
      viewModel.ProductRef.setRowFocus(refRow);
      var refRow = viewModel.CombineProductRef.createEmptyRow();
      viewModel.CombineProductRef.setRowFocus(refRow);
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
      // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      //绑定输入框enter事件
      // $('#processOrderList-searchcontent input').off("keydown").on("keydown", function(e) {
      //   if (e.keyCode == 13) {
      //     $(this).blur();
      //     viewModel.search();
      //   }
      // });

      viewModel.orderAdd.on("platformId.valuechange", function(obj) {
        var row = viewModel.orderAdd.getCurrentRow();
        var platformId = row.getValue("platformId");
        $("#store").attr("data-refparam", '{"EQ_platform.id":"' + platformId + '"}');
        $("#store input").val(""); //清空店铺信息
      });

      viewModel.orderAdd.on("orderReceiverProvince.valuechange", function(obj) {
        var row = viewModel.orderAdd.getCurrentRow();
        var provinceId = row.getValue("orderReceiverProvince");
        $("#city").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"2","EQ_parent.id":"' + provinceId + '"}');
        $("#city input").val('');
        $("#district input").val('');
        $("#town input").val('');
      });

      //省市联动 
      viewModel.orderAdd.on("orderReceiverCity.valuechange", function(obj) {
        var row = viewModel.orderAdd.getCurrentRow();
        var cityId = row.getValue("orderReceiverCity");
        $("#district").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"3","EQ_parent.id":"' + cityId + '"}');
        $("#district input").val('');
        $("#town input").val('');
      });
      //市区联动
      viewModel.orderAdd.on("orderReceiverDistrict.valuechange", function(obj) {
        var row = viewModel.orderAdd.getCurrentRow();
        var districtId = row.getValue("orderReceiverDistrict");
        $("#town").attr("data-refparam", '{"EQ_isEnable":"1","EQ_areaLevel":"4","EQ_parent.id":"' + districtId + '"}');
        $("#town input").val('');
      });
      //区镇联动
      viewModel.orderAdd.on("orderReceiverTown.valuechange", function(obj) {

      });

      // viewModel.goodsList4Add.on("totalPrice.valuechange", function (obj) {
      //   var rows = viewModel.goodsList4Add.getAllRows();
      //   var tFee = 0;
      //   if (rows && rows.length > 0) {
      //     for (var i = 0; i < rows.length; i++) {
      //       var totalPrice = parseFloat(rows[i].getValue("totalPrice"));
      //       tFee += totalPrice;
      //     }
      //     viewModel.orderAdd.setValue("totalFee",tFee);
      //   }

      // });
      // viewModel.goodsList4Add.on("settlementFee.valuechange", function (obj) {
      //   var rows = viewModel.goodsList4Add.getAllRows();
      //   var sFee = 0;
      //   if (rows && rows.length > 0) {
      //     for (var i = 0; i < rows.length; i++) {
      //       var settlementFee = parseFloat(rows[i].getValue("settlementFee"));
      //       sFee += settlementFee;
      //     }
      //     viewModel.orderAdd.setValue("totalFee",sFee);
      //   }

      //  });

      // 产品参照选择，为产品所在行增加多个包件行
      viewModel.ProductRef.on("productRefer.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var refValues = $("#refContainerproductRefer").data("uui.refer").values;
        var selecRows = [];

        if (refValues && refValues.length > 0) {
          //      var ids = [];
          //      for (var i = 0; i < refValues.length; i++) {
          //        ids.push(refValues[i].refpk);
          //      }
          //      $._ajax({
          //          type: "get",
          //          url: appCtx + viewModel.baseurl + '/genByGoods',
          //        data: { ids: ids.join(",") },
          //          success: function(data) {
          //              var rows = viewModel.goodsList4Add.getSimpleData();
          //              rows.addAll(data);
          //              viewModel.goodsList4Add.setSimpleData(rows);
          //          }
          //      });
          var newRows = [];
          for (var i = 0; i < refValues.length; i++) {
            var newRow = undefined;
            newRow = new u.Row({
              parent: viewModel.goodsList4Add
            });
            //判断是否存在row
            var row = viewModel.goodsList4Add.getRowByField("skuCode", refValues[i].refcode);
            if (!row || row.status == "fdel") {
              newRows.push(newRow);
              selecRows.push(newRow);
            }
            newRow.setValue("skuName", refValues[i].refname);
            newRow.setValue("skuCode", refValues[i].refcode);
            newRow.setValue("goodsId", refValues[i].refpk);
            newRow.setValue('buyNum', 1); //购买数量
            newRow.setValue('price', 0); //吊牌价
            newRow.setValue('discountFee', 0); //优惠金额
            newRow.setValue('receivableFee', 0); //成交金额
            newRow.setValue('settlementFee', 0); //结算金额
            newRow.setValue('closeNum', 0); //关闭数量
            newRow.setValue('closedFee', 0); //关闭金额
            newRow.setValue('returnFee', 0); //退款金额
          }
          viewModel.goodsList4Add.insertRows(0, newRows);
        }

      });
      viewModel.goodsList4Add.on('buyNum.valuechange', function(obj) {
        if (!obj.newValue) {
          return;
        }
        if (!obj.rowObj.getValue('goodsNumRate')) {
          return;
        }
        var newVal = parseInt(obj.newValue);
        var num = Math.ceil(newVal * parseFloat(obj.rowObj.getValue('goodsNumRate')));
        var bNum = num / parseFloat(obj.rowObj.getValue('goodsNumRate'));
        if (bNum != newVal) {
          obj.rowObj.setValue('buyNum', bNum);
        }
        if (obj.rowObj.getValue('combineGoodsNum') != num) {
          obj.rowObj.setValue('combineGoodsNum', num);
        }
      });
      //商品组合数量变化
      viewModel.goodsList4Add.on('combineGoodsNum.valuechange', function(obj) {
        if (!obj.newValue) {
          return;
        }
        if (!obj.rowObj.getValue('goodsNumRate')) {
          obj.rowObj.setValue('combineGoodsNum', '');
          return;
        }
        var num = Math.ceil(parseInt(obj.newValue) / parseFloat(obj.rowObj.getValue('goodsNumRate')));
        if (obj.rowObj.getValue('buyNum') != num) {
          obj.rowObj.setValue('buyNum', num);
        }
      });
      // 产品参照选择，为产品所在行增加多个包件行
      viewModel.CombineProductRef.on("combineProductRefer.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var refValues = $("#refContainercombineProductRefer").data("uui.refer").values;
        var selecRows = [];

        if (refValues && refValues.length > 0) {
          var ids = [];
          for (var i = 0; i < refValues.length; i++) {
            ids.push(refValues[i].refpk);
          }
          $._ajax({
            type: "get",
            url: '/occ-prom/combination-details', //'/genByCombineGoods',
            data: {
              'search_IN_combination.id': ids.join(",")
            },
            success: function(data) {
              var con = data.content,
                len = con.length;
              for (var j = 0; j < len; j++) {
                var newRow = viewModel.goodsList4Add.createEmptyRow(),
                  rate = 1 / con[j].amount;
                newRow.setValue('skuCode', con[j].commodityCode);
                newRow.setValue('skuName', con[j].commodityName);
                // newRow.setValue('buyNum', con[j].amount);
                newRow.setValue('goodsNumRate', rate);
                newRow.setValue('combineGoodsNum', 1);
                for (var i = 0; i < ids.length; i++) {
                  if (ids[i] == con[j].productCombinationId) {
                    newRow.setValue('combineGoodsCode', refValues[i].refcode);
                    newRow.setValue('combineGoodsName', refValues[i].refname);
                    break;
                  }
                }

              }
            }
          });
        }
      });
      // add by daikai3 订单补录，填写了购买数量、吊牌价、成交金额，没有自动算出来优惠金额和结算金额
      // start 
      viewModel.goodsList4Add.on("buyNum.valuechange", function(obj) {
        var buyNum = obj.newValue;
        var price = obj.rowObj.getValue("price");
        //优惠金额
        var discountFee = obj.rowObj.getValue("discountFee");
        //成交金额
        var receivableFee = buyNum * price - discountFee;
        obj.rowObj.setValue("receivableFee", receivableFee);
      });
      viewModel.goodsList4Add.on("price.valuechange", function(obj) {
        if (obj.oldValue == obj.newValue) return;
        if (obj.newValue > 100000000) {
          obj.rowObj.setValue("price", obj.oldValue);
          return;
        }
        var buyNum = obj.rowObj.getValue("buyNum");
        var price = obj.newValue;
        //优惠金额
        var discountFee = obj.rowObj.getValue("discountFee");
        //成交金额
        var receivableFee = buyNum * price - discountFee;
        obj.rowObj.setValue("receivableFee", receivableFee);
      });
      viewModel.goodsList4Add.on("receivableFee.valuechange", function(obj) {
        if (obj.oldValue == obj.newValue) return;
        var buyNum = obj.rowObj.getValue("buyNum");
        var price = obj.rowObj.getValue("price");
        var receivableFeeMax = 100000000;
        if (receivableFeeMax > buyNum * price) {
          receivableFeeMax = buyNum * price;
        }
        if (obj.newValue > receivableFeeMax) {
          obj.rowObj.setValue("receivableFee", obj.oldValue);
          toastr.warning("成交金额不能大于" + receivableFeeMax);
          return;
        }
        //成交金额
        var receivableFee = obj.newValue;
        //结算金额
        obj.rowObj.setValue("settlementFee", receivableFee);
        // 优惠金额
        var discountFee = buyNum * price - receivableFee;
        obj.rowObj.setValue("discountFee", discountFee);
      });
      // end
    }
  });

  return view;
});