define(['text!./applyexcgoods.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c",
    returnWarehouseDialog, returnWarehouse2Dialog;
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
      baseurl: '/b2c/exchanges',
      searchurl: '/b2c/exchanges/exchangeQuery',
      exchangeList: new u.DataTable(model.options.metas.exchangeMeta), //换货申请单主表
      exchangeGoodsList: new u.DataTable(model.options.metas.exchangeGoodsMeta), //换货申请单退货商品
      exchangeDeliveryGoodsList: new u.DataTable(model.options.metas.exchangeDeliveryGoodsMeta), //发货商品
      exchangeLogsList: new u.DataTable(model.options.metas.exchangeLogsMeta), //操作日志
      returnWarehouseList: new u.DataTable(model.options.metas.returnWarehouseMeta), //退货仓库信息
      returnWarehouse2List: new u.DataTable(model.options.metas.returnWarehouse2Meta), //退货仓库信息2
      originalPageData: null,

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
//    grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
//    grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,
      //订单类型枚举
      // orderTypeSrc: [],
      //订单状态枚举
      // orderStatusSrc: [],
      //查询所需参数
      // orderStatus4QuerySrc: [],
      //物流方式枚举
      logisticsModeSrc: [],
      //配送方式枚举
      // deliveryModeSrc: [],
      //订单来源枚举
      // orderSourceSrc: [],
      //平台状态
      // OrderPlatformBillStatusSrc: [],
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
//        case '4':
//          return "换购链接";
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
      // //配送方式
      // deliveryModeList: ko.pureComputed(function() {
      //   var enableStatus = viewModel.orderDetail.ref("serviceMode")();
      //   switch (enableStatus) {
      //     case '0':
      //       return "物流配送";
      //     case '1':
      //       return "自提";
      //     default:
      //   }
      // }),
      // //订单来源
      // orderSourceList: ko.pureComputed(function() {
      //   var enableStatus = viewModel.orderDetail.ref("orderSource")();
      //   switch (enableStatus) {
      //     case '0':
      //       return "平台";
      //     case '1':
      //       return "拆单";
      //     case '2':
      //       return "补录";
      //     case '3':
      //       return "补赠";
      //     case '4':
      //       return "换货";
      //     default:
      //   }
      // }),
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
      //关联类别
      // linkTypeSrc: [],
      //退款状态
      // refundStatusSrc: [],
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
      //商品类别
      goodsCategoryRender: function(obj) {
        switch (obj.value) {
          case "0":
            obj.element.innerHTML = "普通商品";
            break;
          case '1':
            obj.element.innerHTML = "运费链接";
            break;
          case '2':
            obj.element.innerHTML = "补差链接";
            break;
        }

      },
      //是否拆单
      splitStatusGrid: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },
      //物流方式
      logType: function(obj) {
        var showValue = obj.value == "1" ? "自提" : "物流配送";
        obj.element.innerHTML = showValue;
      },
      //冻结标识
      lockRender: function(obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
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
      //跳转详情页
      detailRender: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
        obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
    },
    events: {
      //启用
      enable: function() {
        var selectedRows = viewModel.processOrderList.getSelectedRows();
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
        var selectedRows = viewModel.processOrderList.getSelectedRows();
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
        var listData = viewModel.processOrderList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.exchangeList.pageIndex(0);
        }
        viewModel.exchangeList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.exchangeList.pageSize();
        var pageNumber = viewModel.exchangeList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.searchurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.exchangeList.setSimpleData(data.content, {
              unSelect: true
            });

            var dataMap = {};
            var len = data.content.length;
            for (var i = 0; i < len; i++) {
              var mydata = data.content[i];
              dataMap[mydata['id']] = mydata;
            }
            viewModel.originalPageData = dataMap;


            viewModel.exchangeList.totalRow(data.totalElements);
            viewModel.exchangeList.totalPages(data.totalPages);
            //清空详情页
            viewModel.exchangeGoodsList.removeAllRows();
            viewModel.exchangeDeliveryGoodsList.removeAllRows();
            viewModel.exchangeLogsList.removeAllRows();
            viewModel.exchangeLogsList.totalRow(0);
            viewModel.exchangeLogsList.totalPages(0);
            //重置listIndex
            viewModel.listIndex = null;
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.exchangeList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.exchangeList.pageSize(size);
        viewModel.search(true);
      },
      // 可以进入编辑态
      canInEdit: function() {
        var canIn = true;
        var id = viewModel.exchangeList.getValue("id");
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
      //详情
      // 方案1：clone编辑态模板，设置只读，返回删除
      // 方案2：重新定义详情模板
      // 主要看差异，如果差异不大公用模板，差异大重新定义
      // detail: function() {
      //   //确保grid先将行设置为focus状态
      //   setTimeout(function(){
      //     var curRow = viewModel.exchangeList.getCurrentRow();
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
      mainDetail: function(obj) {
        if (viewModel.listIndex == obj.rowIndex) {
          return true;
        } else {
          viewModel.listIndex = obj.rowIndex;
        }
        viewModel.exchangeList.setRowSelect(obj.rowIndex);
        var id = viewModel.exchangeList.getRow(obj.rowIndex).getValue("id");

        // console.log(obj.rowObj.value.name);
        var currentData = viewModel.originalPageData[id];
        //设置子表信息
        viewModel.exchangeLogsList.setSimpleData(currentData['exchangeLogs']); //查询日志
        viewModel.exchangeGoodsList.setSimpleData(currentData['exchangeGoods']);
        viewModel.exchangeDeliveryGoodsList.setSimpleData(currentData['exchangeDeliveryGoods']);


        //设置tab显示基本信息
        $(".ui-bill-detail .u-tabs__tab").eq(1).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-detail .u-tabs__panel").eq(1).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        // viewModel.goDetailPanel();
        return true;
      },
      //审核
      auditHandler: function() {
        var selectRowsArr = viewModel.exchangeList.getSelectedRows();
        if (selectRowsArr.length < 1) {
          toastr.warning('请选择数据');
          return;
        }

        var ids = selectRowsArr.map(function(row) {
          // 检查这个状态 避免重复审批
          var handleState = row.getValue('handleState');

          return row.getValue('id');
        });

        common.dialog.confirmDialog({
          msg1: '您确定审核通过？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function() {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/audit",
              type: "post",
              data: {
                id: ids
              },
              // traditional : true,
              // contentType: "application/json; charset=utf-8",
              success: function(data) {
                //							for(var i = 0; i < selectRowsArr.length; i++) {
                //								selectRowsArr[i].setValue("billStatus", "04");
                //							}
                toastr.success();
                viewModel.search();
              }
            });
          }
        });
      },
      // 指定退货仓库
      assignReturnWarehouseHandler: function() {
        var selectRowsArr = viewModel.exchangeList.getSelectedRows();
        if (selectRowsArr.length < 1) {
          toastr.warning('请选择数据');
          return;
        }
        viewModel.returnWarehouseList.removeAllRows();
        viewModel.returnWarehouseList.createEmptyRow();
        returnWarehouseDialog = u.dialog({
          id: 'assignReturnWarehouseDialog',
          content: "#dialog_content_assignReturnWarehouse",
          "width": "40%"
        });
        var okButton = $("#dialog_content_assignReturnWarehouse .u-msg-ok");
        okButton.unbind("click").click(function() {
          var selectRowsArr = viewModel.exchangeList.getSelectedRows();
          var ids = selectRowsArr.map(function(row) {
            return row.getValue('id');
          })
          var row = viewModel.returnWarehouseList.getAllRows()[0];
          // console.log(row.getSimpleData());
          $._ajax({
            url: appCtx + viewModel.baseurl + "/warehouse",
            type: "post",
            data: JSON.stringify({
              id: ids,
              warehouse: row.getSimpleData()
            }),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              toastr.success();
              viewModel.search();
            }
          });
          returnWarehouseDialog.close();
        });
        var cancelButton = $("#dialog_content_assignReturnWarehouse .u-msg-cancel");
        cancelButton.unbind("click").click(function() {
          returnWarehouseDialog.close();
        });
      },
      assignReturnWarehouse2Handler: function() {
        var selectRowsArr = viewModel.exchangeList.getSelectedRows();
        if (selectRowsArr.length < 1) {
          toastr.warning('请选择数据');
          return;
        } else if (selectRowsArr.length > 1) {
          toastr.warning('最多选择一条数据');
          return;
        }
        var id = selectRowsArr[0].getValue('id')
        var currentData = viewModel.originalPageData[id];
        var products = currentData['exchangeGoods'];
        // returnWarehouse2List
        viewModel.returnWarehouse2List.setSimpleData(products);
        returnWarehouse2Dialog = u.dialog({
          id: 'assignReturnWarehouse2Dialog',
          content: "#dialog_content_assignReturnWarehouse2",
          "width": "80%"
        });
        var okButton = $("#dialog_content_assignReturnWarehouse2 .u-msg-ok");
        okButton.unbind("click").click(function() {
          var data = viewModel.returnWarehouse2List.getSimpleData();
          // console.log(aa)
          // return
          $._ajax({
            url: appCtx + viewModel.baseurl + "/warehouse",
            type: "post",
            data: JSON.stringify({
              id: id,
              exchangeProducts: data
            }),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              toastr.success();
              viewModel.search();
            }
          });
          returnWarehouse2Dialog.close();
        });
        var cancelButton = $("#dialog_content_assignReturnWarehouse2 .u-msg-cancel");
        cancelButton.unbind("click").click(function() {
          returnWarehouse2Dialog.close();
        });



      },
      // 取消换货
      cancelExchangeHandler: function() {
        var selectRowsArr = viewModel.exchangeList.getSelectedRows();
        if (selectRowsArr.length < 1) {
          toastr.warning('请选择数据');
          return;
        }
        var ids = selectRowsArr.map(function(row) {
          // 也许需要检查某些东西,避免重复提交
          var handleState = row.getValue('handleState');

          return row.getValue('id');
        });

        common.dialog.confirmDialog({
          msg1: '您确定取消换货？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function() {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/cancel",
              type: "post",
              data: {
                id: ids
              },
              success: function(data) {
                toastr.success();
                viewModel.search();
              }
            });
          }
        });


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
      // 物流方式枚举
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
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2c/enum-service/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.ocm.b2c.enums.OrderPlatformBillStatus"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.OrderPlatformBillStatusSrc = newarray;
      //   }
      // });
      //订单状态枚举
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2c/enum-service/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.ocm.b2c.enums.ExchangeBillHandleStatus"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.orderStatusSrc = newarray;
      //     for (var i = 0; i < newarray.length; i++) {
      //       if (newarray[i].value != "09") {
      //         viewModel.orderStatus4QuerySrc.push(newarray[i]);
      //       }
      //     }
      //   }
      // });
      //订单类型枚举
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2c/orderType-auth-ref/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.ocm.b2c.enums.OrderTypeEnum"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.orderTypeSrc = newarray;
      //   }
      // });
      //配送方式枚举
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2c/enum-service/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.ocm.b2c.enums.DeliveryModeEnum"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.deliveryModeSrc = newarray;
      //   }
      // });
      //订单来源枚举
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2c/enum-service/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.ocm.b2c.enums.OrderSourceEnum"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.orderSourceSrc = newarray;
      //   }
      // });
      //关联类别枚举
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2c/enum-service/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.ocm.b2c.enums.LinkTypeEnum"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.linkTypeSrc = newarray;
      //   }
      // });
      //退款状态
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2c/enum-service/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.ocm.b2c.enums.RefundStatusEnum"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.refundStatusSrc = newarray;
      //   }
      // });
      //发货状态
      // $._ajax({
      //   type: "get",
      //   url: appCtx + "/b2c/enum-service/data",
      //   async: false,
      //   data: {
      //     enumClassName: "com.yonyou.ocm.b2c.enums.SendStatusEnum"
      //   },
      //   success: function(data) {
      //     var newarray = common.dataconvert.toMap(data, "name", "code");
      //     viewModel.sendStatusSrc = newarray;
      //   }
      // });
      //绑定输入框enter事件
      // $('#exchangeList-searchcontent input').off("keydown").on("keydown", function(e) {
      //   if (e.keyCode == 13) {
      //     $(this).blur();
      //     viewModel.search();
      //   }
      // });
    }
  });

  return view;
});