define(['text!./ordersdirectly.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function(tpl, common, searchbox) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch;
  baseData = {
    baseurl: '/b2c/supplier-orders',
    ordersDirectlyList: new u.DataTable(ordersDirectlyMeta),
    orderDetail: new u.DataTable(supplierOrderMeta),
    logList: new u.DataTable(logMeta),
    productList: new u.DataTable(productMeta),
    productSearchParam: new u.DataTable(productSearchParammeta),
    selectedproductList: new u.DataTable(specialproductmeta),
    specialproductList: new u.DataTable(specialproductmeta),
    orderSearchParam: new u.DataTable(orderSearchParammeta),
    selectedorderList: new u.DataTable(orderMeta),
    specialorderList: new u.DataTable(orderMeta),
    listIndex: null,
    //买家留言
    commentList1: new u.DataTable(remarkMeta),
    //卖家留言
    commentList2: new u.DataTable(remarkMeta),
    //订单备注
    commentList3: new u.DataTable(remarkMeta),
    // 行号池
    curRowNum: ko.observable(0),
    //订单状态枚举
    orderStatusSrc: [],
    //订单类型枚举
    orderTypeSrc: [],
    //物流方式枚举
    logisticsModeSrc: [],
    //配送方式枚举
    deliveryModeSrc: [],
    //订单来源枚举
    orderSourceSrc: [],
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
    //是否变更
    changeSrc: [{
      value: "0",
      name: "否"
    }, {
      value: "1",
      name: "是"
    }, ],
    //是否退货
    returnStatusSrc: [{
      value: "0",
      name: "否"
    }, {
      value: "1",
      name: "是"
    }, ],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,

    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
  };
  rendertype = {
    precision2Render: common.rendertype.precision2Render,
    precision3Render: common.rendertype.precision3Render,

    //编辑
    operation: function(obj) {
      var editfun;
      if (obj.row.value.billStatus == "1") {
        editfun = "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + ")";
      } else {
        editfun = 'class="disabled"';
      }
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle-word">' +
        '<a ' +
        editfun +
        ' title="编辑">编辑</a>' +
        '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
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
    receiverAddress: function(dataTable, field) {
      var receiverProvince = viewModel.ordersDirectlyList.getValue("receiverProvinceName");
      var receiverCity = viewModel.ordersDirectlyList.getValue("receiverCityName");
      var receiverDistrict = viewModel.ordersDirectlyList.getValue("receiverDistrictName");
      var receiverTown = viewModel.ordersDirectlyList.getValue("receiverTownName");
      var receiverAddress = viewModel.ordersDirectlyList.getValue("receiverAddress");
      var reg = new RegExp("null", "g");
      return (receiverProvince + receiverCity + receiverDistrict + receiverTown + receiverAddress).replace(reg, "");
    }
  };
  events = {
    //进入修改单据页
    showEditBillPanel: function(index) {
      viewModel.ordersDirectlyList.setRowFocus(index);
      var id = viewModel.ordersDirectlyList.getValue("id");
      viewModel.ordersDirectlyList.originEditData = viewModel.ordersDirectlyList.getFocusRow().getSimpleData();
      viewModel.findByParentid(id);
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
    },
    //查询子表数据
    findByParentid: function(id) {
      $._ajax({
        url: appCtx + viewModel.baseurl + "/detail",
        type: 'get',
        async: false,
        data: {
          id: id
        },
        success: function(data) {

          viewModel.productList.setSimpleData(data.products);
          viewModel.logList.setSimpleData(data.logs);
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
    //详情
    detail: function(obj, rowId) {
      //确保grid先将行设置为focus状态
      if (viewModel.listIndex == obj.rowIndex) {
        return true;
      } else {
        viewModel.listIndex = obj.rowIndex;
      }
      viewModel.ordersDirectlyList.setRowSelect(obj.rowIndex);
      var id = obj.rowObj.value.id;
      viewModel.findByParentid(id);
    },

    //点击取消 单据页
    cancelHandle: function() {
      var curRow = viewModel.ordersDirectlyList.getCurrentRow();
      curRow.setSimpleData(viewModel.ordersDirectlyList.originEditData);
      viewModel.retListPanel();
    },
    //保存单据
    saveBill: function() {
      var result = app.compsValidateMultiParam({
        element: validate,
        showMsg: true
      });
      if (result.passed == true) {
        common.dialog.confirmDialog({
          msg1: '确认保存？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function() {
            var myData = {
              'id': viewModel.ordersDirectlyList.getValue('id'),
              'sellerRemark': viewModel.ordersDirectlyList.getValue('sellerRemark'),
              'logisticsId': viewModel.ordersDirectlyList.getValue('logisticsId'),
              'waybillNo': viewModel.ordersDirectlyList.getValue('waybillNo'),
              'logisticsInfo': viewModel.ordersDirectlyList.getValue('logisticsInfo')
            }
            viewModel.ordersDirectlyList.getCurrentRow().getSimpleData();
            var _ajaxType = "post";
            $._ajax({
              url: appCtx + viewModel.baseurl + "/upd",
              type: _ajaxType,
              data: JSON.stringify(myData),
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                viewModel.ordersDirectlyList.getFocusRow().setSimpleData(data);
                toastr.success("保存成功");
                viewModel.retListPanel();
              }
            })
          }
        });
      }
    },
    search: function(reindex) {
      if (reindex) {
        viewModel.ordersDirectlyList.pageIndex(0);
      }
      viewModel.ordersDirectlyList.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      queryData.size = viewModel.ordersDirectlyList.pageSize();
      queryData.page = viewModel.ordersDirectlyList.pageIndex();
      $.ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function(data) {
          viewModel.ordersDirectlyList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.ordersDirectlyList.totalRow(data.totalElements);
          viewModel.ordersDirectlyList.totalPages(data.totalPages);
          viewModel.listIndex = null;
        }
      });
      viewModel.ordersDirectlyList.removeAllRows();
      viewModel.productList.removeAllRows();
      viewModel.commentList1.removeAllRows();
      viewModel.commentList2.removeAllRows();
      viewModel.commentList3.removeAllRows();
      viewModel.logList.removeAllRows();
    },
    //清空搜索条件
    cleanSearch: function() {
      singledocSearch.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function(index) {
      viewModel.ordersDirectlyList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function(size) {
      viewModel.ordersDirectlyList.pageSize(size);
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
      queryData['search_EQ_parent.id'] = viewModel.ordersDirectlyList.getValue('id');
      $.ajax({
        type: "get",
        // url: appCtx + '/b2c/supplier-order-logs',
        url: appCtx + '/b2c/supplier-orders/details',
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
      viewModel.searchLog();
    },
    //导入
    importHandle: function() {
      var urlInfo = '/supplier-order-express-excel/excelDataImport'; //倒入地址参数
      var urlStatusInfo = '/supplier-order-express-excel/excelLoadingStatus'; //请求进度地址参数
      var ele = $('#importFiel')[0]; //挂载元素
      common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1);

      //    common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
    },
    //导出
    exportHandle2: function() {
      var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
      var templateUrl = '/supplier-order-express-excel/downloadExcelTemplate'; //导出模板地址参数
      var listData = viewModel.ordersDirectlyList; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      var typeArr = [{
        value: 0,
        name: "导出新增模板"
      }]; //导出类型
      common.fileHandle.exportFileType(listData, ele, searchParams, templateUrl, null, typeArr);
    },
    //导出
    exportHandle: function() {
      var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
      var excelDataUrl = '/supplier-order-excel/excelDataExport'; //导出数据地址参数
      var listData = viewModel.ordersDirectlyList; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      var typeArr = [{
        value: false,
        name: "导出数据"
      }]; //导出类型
      common.fileHandle.exportFileType(listData, ele, searchParams, null, excelDataUrl, typeArr);
    },
    isReturn: function() {
      var isRetrun = viewModel.ordersDirectlyList.getValue('isReturn');
      var name;
      switch (isRetrun) {
        case '0':
          name = '否';
          break;
        case '1':
          name = '是';
          break;
      }
      return name;
    }
  }

  viewModel = u.extend({}, baseData, events, rendertype);

  function appInit(element, params) {
    //将模板页渲染到页面上
    element.innerHTML = tpl;

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
    //订单状态枚举
    $._ajax({
      type: "get",
      url: appCtx + "/b2c/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.ocm.b2c.enums.SupplierOrderBillStatusEnum"
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
        enumClassName: "com.yonyou.ocm.b2c.enums.SupplierOrderBillType"
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

    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });

    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#ordersDirectlyList-searchcontent")[0], [{
          type: "text",
          key: "code",
          label: "采购单号"
        }, {
          type: "text",
          key: "syscode",
          label: "电商单号"
        }, {
          type: "refer",
          key: "platform--id",
          label: "平台名称",
          refinfo: "b2cplatform",
          refName: "所属平台"
        }, {
          type: "combo",
          key: "billStatus",
          label: "订单状态",
          dataSource: viewModel.orderStatusSrc,
        }, {
          type: "text",
          key: "buyer",
          label: "顾客ID"
        }, {
          type: "text",
          key: "receiver--receiver",
          label: "顾客姓名"
        }, {
          type: "text",
          key: "supplier--name",
          label: "供应商"
        }, {
          type: "text",
          key: "waybillNo",
          label: "快递单号"
        },
        //      {
        //        type: "checkboxlist",
        //        key: "logisticsMode",
        //        label: "物流方式",
        //        dataSource: viewModel.logisticsModeSrc,
        //        cls: "ui-checkboxes-item"
        //      },


        //      {
        //        type: "refer",
        //        key: "supplier--id",
        //        label: "服务商",
        //        refinfo: "b2csupplier"
        //      },
        {
          type: "refer",
          key: "store--id",
          label: "店铺名称",
          refinfo: "b2cStoreRef",
          refName: "所属店铺"
        }, {
          type: "text",
          key: "receiver--receiverPhone",
          label: "顾客联系方式",
        }, {
          type: "radio",
          key: "isReturn",
          label: "是否退货",
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
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender() {
    // 初始化折叠面板
    $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#ordersDirectlyList-searchcontent input').off("keydown").on("keydown", function(e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    viewModel.ordersDirectlyList.on("logisticsId.valuechange", function(obj) {
      var row = viewModel.ordersDirectlyList.getCurrentRow();
      var logisticsId = row.getValue("logisticsId");

    });


    //编辑页子表隐藏
    $(".click-btn").click(function() {
      $(this).closest(".ui-collapse-title").toggleClass("open");
      if ($(this).closest(".ui-collapse-title").hasClass("open")) {
        $(this).closest(".ui-collapse-title").next().show();
      } else {
        $(this).closest(".ui-collapse-title").next().hide();
      }
    });
    viewModel.selectedproductList.on("reqQuantity.valuechange", function(obj) {
      var currentRow = obj.rowObj;
      var currentWaitRow = viewModel.specialproductList.getRowByField("code", currentRow.getValue("code"));
      var reqQuantity = obj.newValue; //采购量
      var totalVolume = 0; //总方量
      var totalWeight = 0; //总重量
      totalVolume = parseFloat(currentWaitRow.getValue("cubage")) * reqQuantity;
      totalWeight = parseFloat(currentWaitRow.getValue("roughWeight")) * reqQuantity;
      currentRow.setValue("totalVolume", totalVolume);
      currentRow.setValue("totalWeight", totalWeight);
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