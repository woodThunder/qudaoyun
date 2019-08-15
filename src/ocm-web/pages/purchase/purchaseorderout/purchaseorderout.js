define(['text!./purchaseorderout.html', 'ocm_common', 'ocm_baseview', './meta.js','../../flow/bpmapproveref/bpmopenbill.js', "ocm-citypicker"], function(tpl, common, baseview, model,bpmopenbill) {
  'use strict'
  var viewModel, app;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  };

  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
      app = this.app;
    },
    tpl: tpl,
    model: model,
    baseData: {
      index: -1,
      baseurl: '/purchase/orders',
      excelurl: '/purchase/orders-excel',
      applicationUrl : '/purchase/orders',
      purchaseList: new u.DataTable(model.options.metas.complex),
      purchaseItems: new u.DataTable(model.options.metas.complexItem),
      purchaseBomItems: new u.DataTable(model.options.metas.BomItem),
      ItemRefList: new u.DataTable(model.options.metas.ItemRef),
      searchcomp: {},
      arrivalBelongDataSource: ko.observableArray([]),
      orderTypeSource: ko.observableArray([]),
      purchaseTypeSource: ko.observableArray([]),
      // 商品状态
      isClosedSource: [{
        value: '0',
        name: '打开'
      }, {
        value: '1',
        name: '关闭'
      }],
      // 行号池
      currowNum: ko.observable(0),
      currowBomNum: ko.observable(0),
      // 是否bom页签
      isBomPanel: ko.observable(),
      //当前系统日期
      curDate: ko.observable(),
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,
      button6Source: model.options.buttons.button6,
      buttonMenu1Source: model.options.buttons.buttonmenu1,
      card1Source: model.options.cards.card1,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,

      //商品信息
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      //BOM结构信息
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,

      //地址簿
      addresscardcomp: {},
      dialog1Source: model.options.dialogs.dialog1,
      addressInfo: common.address.addressInfo,
      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      status: ko.pureComputed(function() {
        var enableStatus = viewModel.purchaseList.ref("status")();
        enableStatus = parseFloat(enableStatus);
        switch (enableStatus) {
          case 1:
            return "待处理";
          case 2:
            return "已提交审批";
          case 3:
            return "审批中";
          case 4:
            return "审批通过";
          case 5:
            return "审批不通过";
          case 6:
            return "部分入库";
          case 7:
            return "全部入库";
          case 8:
            return "部分出库";
          case 9:
            return "全部出库";
          default:
        }
      }),
        state: ko.pureComputed(function() {
            var state = viewModel.purchaseList.ref("state")();
            state = parseInt(state);
            switch (state) {
                case 0:
                    return "待处理";
                case 1:
                    return "已提交";
                case 2:
                    return "审批中";
                case 3:
                    return "审批通过";
                case 4:
                    return "审批不通过";
                default:
            }
        }),
      billDateComputed: ko.pureComputed(function() {
        var truetime = viewModel.purchaseList.ref("orderDate")();
        var showtime = u.date.format(truetime, 'YYYY-MM-DD');
        return showtime;
      }),
      selfLifingComputed: ko.pureComputed(function() {
        var selfLifingValue = viewModel.purchaseList.ref("selfLifing")();
        var showName = selfLifingValue=="01"?"是":"否";
        return showName;
      }),
    },
    rendertype: {
        approveStateRender: function (obj) {
            var showValue = "";
            switch (parseInt(obj.value)) {
                case 0:
                    showValue = "待处理";
                    break;
                case 1:
                    showValue = "已提交";
                    break;
                case 2:
                    showValue = "审批中";
                    break;
                case 3:
                    showValue = "审批通过";
                    break;
                case 4:
                    showValue = "审批不通过";
                    break;
                default:
                    showValue = "";
                    break;
            }
            obj.element.innerHTML = showValue;
        },
        addressRender:function (obj) {
            obj.element.innerHTML = obj.row.value.provinceName + obj.row.value.cityName+ obj.row.value.districtName +obj.row.value.townName +obj.row.value.receiveAddress;
        },
      operation: function(obj) {
        var editfun, delfun;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var state = obj.row.value.state;
        if (state != 0) {
          delfun = 'class="disabled"';
          editfun = 'class="disabled"';
        } else {
          editfun =
            "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
          delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
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
          '</span></div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      detailRender: common.rendertype.detailRender,
      statusRender: function(params) {
        var value = parseFloat(params.value);
        var showName = "";
        switch (value) {
          case 1:
            showName = "待处理";
            break;
          case 2:
            showName = "已提交审批";
            break;
          case 3:
            showName = "审批中";
            break;
          case 4:
            showName = "审批通过";
            break;
          case 5:
            showName = "审批不通过";
            break;
          case 6:
            showName = "部分入库";
            break;
          case 7:
            showName = "全部入库";
            break;
          case 8:
            showName = "部分出库";
            break;
          case 9:
            showName = "全部出库";
            break;
        };
        params.element.innerHTML = showName;
      },
      stockRender: function(params) {
        var value = parseFloat(params.value);
        var showName = "";
        switch (value) {
          case 1:
            showName = "未入库";
            break;
          case 2:
            showName = "部分入库";
            break;
          case 3:
            showName = "全部入库";
            break;
        };
        params.element.innerHTML = showName;
      },
      isReturnedRender: function(obj) {
        var showValue = obj.value == "1" ? "是" : obj.value == "0" ? "否" : "";
        obj.element.innerHTML = showValue;
      },
      isReturnedComputed: ko.pureComputed(function() {
        var isReturned = viewModel.purchaseList.ref("isReturned")();
        var showVal = isReturned == 0 ? "否" : "是";
        return showVal;
      }),
      beforeEditCheck:function (obj) {
        var gridObj = obj.gridObj;
        var row = obj.rowObj.value;
        var id = row.goodsId;
        var stockOrgId = row.receiveStorageOrgId;
        viewModel.purchaseItems.setMeta("receiveStorageId", "refparam",
          '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}');
        if(obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("unitPrice"))){
          var bomdata = viewModel.findBomByParentId(id);
          if(bomdata.length>0){
            toastr.warning("此商品含有BOM结构，请在&lt;BOM结构信息&gt;页签下维护单价");
            return false;
          }else {
            return true
          }
        }
        return true
      }
    },
    events: {
        checkEmpty : function () {
            var allItemRows = viewModel.purchaseItems.getAllRealRows();
            var emptyGoodsOptRows = "";
            if (allItemRows.length > 0) {
                allItemRows.forEach(function (item) {
                    if (!item.getValue("goodsSelection") && parseFloat(item.getValue("isOptional")) == 1) {
                        emptyGoodsOptRows += item.getValue("rowNum") + ",";
                    }
                });
                emptyGoodsOptRows = emptyGoodsOptRows.slice(0, emptyGoodsOptRows.length - 1);
                if (emptyGoodsOptRows) {
                    if(emptyGoodsOptRows)toastr.warning("请为行号" + emptyGoodsOptRows + "的商品添加选配");
                    return false;
                } else {
                    return true;
                }
            }
            return true;
        },
      checkEmpty2 : function () {
        var allItemRows = viewModel.purchaseItems.getAllRealRows();
        var emptyGoodsOptRows = "";
        if (allItemRows.length > 0) {
          allItemRows.forEach(function (item) {
            if (item.getValue("arrivalBelongCode") == "01" && !item.getValue("receiveStorageOrgId")) {
              emptyGoodsOptRows += item.getValue("rowNum") + ",";
            }
          });

          emptyGoodsOptRows = emptyGoodsOptRows.slice(0, emptyGoodsOptRows.length - 1);
          if (emptyGoodsOptRows) {
            toastr.warning("请为行号" + emptyGoodsOptRows + "的商品添加收货库存组织");
            return false;
          } else {
            return true;
          }
        }
        return true;
      },
      //协同
      coordination:function () {
        var selectedRows = viewModel.purchaseList.getSelectedRows();
        var selId = selectedRows.getValue("id")
        if (selectedRows.length !== 1) {
          //TODO: tips替换
          toastr.warning("请选择一条操作的行");
          return;
        }
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-submit",
          data: {
            id: selId
          },
          success: function(res) {
          }
        })
      },
      addGridColum:function () {
        var grid = viewModel.app.getComp("grid_complexItem").grid;
      },
      addrOk: function() {
        var result = viewModel.addresscardcomp.validate();
        if (!result.passed) return;
        var rows = viewModel.purchaseItems.getCurrentRow(),
          postdata = viewModel.addresscardcomp.geteidtData();
        rows.setValue('countryId', postdata.countryId);
        rows.setValue('cityId', postdata.cityId);
        rows.setValue('districtId', postdata.districtId);
        rows.setValue('provinceId', postdata.provinceId);
        rows.setValue('townId', postdata.townId);
        rows.setValue('receiveAddress', postdata.receiveAddress);
        rows.setValue('detailAddr', postdata.detailAddr);
        viewModel.addresscardcomp.close();
      },
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.purchaseList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.purchaseList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
            if(rows.length == 1){
                if(rows[0].getValue("state") != 0){
                    toastr.warning("不处于待处理状态的单据不能删除");
                    return;
                }
            }
          for (var i = 0; i < rows.length; i++) {
            var state = rows[i].getValue("state");
            if (state == 0) {
                ids.push(rows[i].getValue("id"));
            }
          }
        };
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
                viewModel.purchaseList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.purchaseList.pageIndex(0);
        }
        viewModel.purchaseList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.purchaseList.pageSize();
        var pageNumber = viewModel.purchaseList.pageIndex();
        queryData.search_EQ_isReturned = 0;
        queryData.search_EQ_purchaseType = "OuterPurchase";
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.purchaseList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.purchaseList.totalRow(data.totalElements);
            viewModel.purchaseList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.purchaseList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.purchaseList.pageSize(size);
        viewModel.search(true);
      },
      //进入新增单据页
      showAddBillPanel: function() {
        viewModel.index = -1;
        viewModel.isBomPanel(true);
        $("#tab-panel-2").hide();
        $("#tab-panel-1").show();

        var curRow = viewModel.purchaseList.createEmptyRowF();
        viewModel.purchaseList.setRowFocus(curRow);
        viewModel.purchaseItems.removeAllRows();
        viewModel.purchaseBomItems.removeAllRows();
        curRow.setValue("status", "01"); //单据状态 ：待处理
        curRow.setValue("approveStatus", "01"); // 审批状态 ：未审批
        viewModel.getCurDate(curRow);
        viewModel.currowNum(0);
        viewModel.currowBomNum(0);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      showEditBillPanel: function(index, rowId) {
        var row;
        if (index == -1) {
          row = viewModel.purchaseList.getFocusRow();
          index = 0
        } else {
          row = viewModel.purchaseList.getRowByRowId(rowId)
        }
        var state = row.getValue("state");
          if (state != 0) {
              toastr.warning("待处理的单据才可进入编辑页面");
              return;
          }
          $("#tab-panel-2").hide();
          $("#tab-panel-1").show();
        viewModel.index = index;
        viewModel.rowId = row.rowId;

        var id = row.getValue("id");
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.getCurrowNum();
        viewModel.getBomCurrowNum();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      detail: function() {
        $("#tab-panel-4").hide();
        $("#tab-panel-3").show();
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.purchaseList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.initBPMFromBill(id,viewModel);
          viewModel.findByParentid(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      detail2bill: function() {
        var state = viewModel.purchaseList.getValue("state");
        if (state != 0) {
          toastr.warning("待处理的单据才可进入编辑页面");
          return;
        }
          $("#tab-panel-2").hide();
          $("#tab-panel-1").show();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      // 查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/findByParentid",
          type: 'get',
          async: false,
          data: {
            id: id
          },
          success: function(data) {
            viewModel.purchaseItems.setSimpleData(data.orderItems);
            viewModel.purchaseBomItems.setSimpleData(data.orderItemBoms);
          }
        })
      },
      //跳转单据详情页
      showBillDetail: function() {
        $(".ui-list-panel").addClass("animated slideInLeft");
        $(".ui-bill-panel").addClass("animated slideOutDown");
      },
      //新增子表项
      addItem: function() {
        viewModel.purchaseItems.createEmptyRow();
      },
      //删除子表项
      delItems: function() {
        var selectedRows = viewModel.purchaseItems.getSelectedRows();
        var delBom = [];
        selectedRows.forEach(function(row, index, arr) {
          row.setValue("dr", "1");
          var parentRowNum = row.getValue("rowNum");
          var allBomRows = viewModel.purchaseBomItems.getAllRealRows();
          allBomRows.forEach(function (item) {
            if(item.getValue("parentRowNum") == parentRowNum){
              viewModel.purchaseBomItems.removeRows(item);
              // delBom.push(item);
            }
          });
        });
        delBom.forEach(function(row, index, arr) {
          row.setValue("dr", "1");
        });
        viewModel.purchaseBomItems.removeRows(delBom,{forceDel: true});
        viewModel.purchaseItems.removeRows(selectedRows);
        viewModel.reCalculateTotalAmountMoneyByItem();
      },
      //保存单据
      saveBill: function() {
        var index = viewModel.index;
          if (!viewModel.checkEmpty()) {
              return;
          };
        if (!viewModel.checkEmpty2()) {
          return;
        };
        var validate = $(".ui-bill-panel")[0];
        var result = app.compsValidateMultiParam({
          element: validate,
          showMsg: true
        });
        if (!result.passed) {
          toastr.warning(result.notPassedArr[0].Msg);
          return;
        };
        var trantypeRef = $("#refContainertrantypeRef").data("uui.refer").values[0];
        var complexData = viewModel.purchaseList.getCurrentRow().getSimpleData();

        if(trantypeRef){
          //判断保存即审批逻辑
          if(trantypeRef.saveWillApprovalCode == "1"){
            complexData.status = "04";
            complexData.state = 3;
          }else {
            complexData.status = "01";
            complexData.state = 0;
          }
        }
        //complexData.purchaseType = "OuterPurchase";
	      complexData.purchaseType = "OuterPurchase";
        var purchaseItemsData = viewModel.purchaseItems.getSimpleData();
        var purchaseBomItemsData = viewModel.purchaseBomItems.getSimpleData();
        purchaseItemsData.forEach(function(item) {
          item.stockStatus = "01";
        });
        purchaseBomItemsData.forEach(function(item) {
            //之前逻辑导致删除失败，增加判断
            if(item.persistStatus!="fdel"){
              item.persistStatus = "new";
          }
        });
        complexData.orderItems = purchaseItemsData;
        complexData.orderItemBoms = purchaseBomItemsData;
        var _ajaxType = viewModel.purchaseList.getValue("id") ? "put" : "post";
          if(_ajaxType == "post"){
              complexData.state = 0;
          }
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.purchaseList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
            viewModel.search();
          }
        })
      },
      //提交
      submitBtn: function() {
          var listCompId = "purchaseList";
          var nodeJs = "/ocm-web/pages/purchase/purchaseorderout/purchaseorderout.js";
          var billTypeCode = "PurchaseBill";
          var tranTypeCode = null;
          var callback = null;
          viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      },
      //收回
      backBtn: function() {
          var listCompId = "purchaseList";
          var billTypeCode = "PurchaseBill";
          var tranTypeCode = null;
          var callback = null;
          viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },
      //保存并提交单据
      submitBill: function() {
        var validate = $(".ui-bill-panel")[0];
        var grid = app.getComp("grid_complex").grid;
        var result = app.compsValidateMultiParam({
          element: validate,
          showMsg: true
        });
        if (!result.passed) {
          return;
        }
        var complexData = viewModel.purchaseList.getCurrentRow().getSimpleData();
        complexData.status = "02";
        complexData.approveStatus = "02";
        complexData.purchaseType = "OuterPurchase";//"外采为OuterPurchase"
        var purchaseItemsData = viewModel.purchaseItems.getSimpleData();
        var purchaseBomItemsData = viewModel.purchaseBomItems.getSimpleData();
        purchaseItemsData.forEach(function(item) {
          item.stockStatus = "01";
        });
        purchaseBomItemsData.forEach(function(item) {
          item.persistStatus = "new";
        });
        complexData.orderItems = purchaseItemsData;
        complexData.orderItemBoms = purchaseBomItemsData;
        $._ajax({
          url: appCtx + viewModel.baseurl + '/submit',
          type: "POST",
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            var curRow = viewModel.purchaseList.getFocusRow();
            curRow.setSimpleData(data);
            grid.repaintGridDivs();
            viewModel.retListPanel();
          }
        })
      },
      cancelBill: function() {
        viewModel.purchaseItems.removeAllRows();
        var curRow = viewModel.purchaseList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.purchaseList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.purchaseList.removeRow(curRow);
          viewModel.purchaseItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //关闭
      closeOrder: function() {
        var selectedRows = viewModel.purchaseList.getSelectedRows();
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        if (selectedRows.length < 1) {
          //TODO: tips替换
          toastr.warning("请选择一条操作的行");
          return;
        }
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-close",
          data: {
            ids: ids.join(",")
          },
          success: function(res) {
            for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isClosed", "1");
            }
          }
        })
      },
      //打开
      openOrder: function() {
        var selectedRows = viewModel.purchaseList.getSelectedRows();
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        if (selectedRows.length < 1) {
          //TODO: tips替换
          toastr.warning("请选择一条操作的行");
          return;
        }
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-open",
          data: {
            ids: ids.join(",")
          },
          success: function(res) {
            for (var i = 0; i < selectedRows.length; i++) {
              // selectedRows[i].setValue("status", "4");
                selectedRows[i].setValue("isClosed", "0");
            }
          }
        })
      },
      //审批
      approve: function() {
          var listCompId = "purchaseList";
          var billTypeCode = "PurchaseBill";
          var tranTypeCode = null;
          var withBpmCallback = function () {
              viewModel.detail();
          };
          var withoutBpmCallback = null;
          viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
              withoutBpmCallback);
      },
      //审核不通过
      disapprove: function() {
          var listCompId = "purchaseList";
          var billTypeCode = "PurchaseBill";
          var tranTypeCode = null;
          var withBpmCallback = function () {
              viewModel.detail();
          };
          var withoutBpmCallback = null;
          viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
              withoutBpmCallback);
      },
        unapprove : function () {
            var listCompId = "purchaseList";
            var billTypeCode = "PurchaseBill";
            var tranTypeCode = null;
            var withBpmCallback = function () {
                viewModel.detail();
            };
            var withoutBpmCallback = null;
            viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                withoutBpmCallback);
        },
      //冻结
      freeze: function() {

      },
      //解冻
      unfreeze: function() {

      },
      //关闭商品
      closeItems: function() {
        var selectedRows = viewModel.purchaseItems.getSelectedRows();
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-close-items",
          data: {
            ids: ids.join(",")
          },
          success: function(res) {
            for (var i = 0; i < selectedRows.length; i++) {
              selectedRows[i].setValue("isClosed", "1");
            }
          }
        })
      },
      //打开商品
      openItems: function() {
        var selectedRows = viewModel.purchaseItems.getSelectedRows();
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "//batch-open-items",
          data: {
            ids: ids.join(",")
          },
          success: function(res) {
            for (var i = 0; i < selectedRows.length; i++) {
              selectedRows[i].setValue("isClosed", "0");
            }
          }
        })
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function() {
        viewModel.clearItemsRef();
        $("#addItemsRef .refer").trigger("click");
      },
      //清空已选销售产品参照
      clearItemsRef: function() {
        viewModel.ItemRefList.setValue("productref", "");
        var refer = $("#refContainerproductref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },

      //重新询价
      requery: function() {
        var rows = viewModel.purchaseBomItems.getAllRealRows();
        var ids = rows.map(function(row) {
          return row.getValue("goodsId");
        });
        //供应商
        var supplier = viewModel.purchaseList.getValue("supplierId"),
          //采购组织
          purchaseOrg = viewModel.purchaseList.getValue("purchaseOrgId"),
          //采购日期
          purchaseDate = viewModel.purchaseList.getValue("orderDate");
        purchaseDate = u.date.format(purchaseDate, 'YYYY-MM-DD');
        //去除重复的商品id
        $.unique(ids);
        if (supplier && purchaseOrg && purchaseDate && ids && ids.length > 0) {
          $._ajax({
            url: appCtx + "/purchase/prices/get-by-param",
            type: "post",
            data: {
              ids: ids.join(","),
              supplier: supplier,
              purchaseOrg: purchaseOrg,
              purchaseDate: purchaseDate,
            },
            success: function(data) {
              for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                  for (var j = 0; j < rows.length; j++) {
                    //var amount = rows[j].getValue("amount");
                    var goodsNum = rows[j].getValue("goodsNum");
                    if (key == rows[j].getValue("goodsId")) {
                      rows[j].setValue("unitPrice", data[i][key]);
                     // rows[j].setValue("amountMoney", data[i][key] * amount);
                      rows[j].setValue("amountMoney",data[i][key] * goodsNum);
                      
                    }
                  }
                }
              }
            }
          })
        } else {
          toastr.warning("请填写供应商、采购组织及采购日期相关信息！");
          return;
        }
      },
      //导入
      importHandle: function() {
        var urlInfo = viewModel.excelurl + '/excelDataImport'; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + '/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.purchaseList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      // 返回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        var tabDom = $(".u-tabs__tab-bar");
        if(tabDom&&tabDom.length>0){
          tabDom.each(function (i,item) {
            var childDoms = item.children;
            $(childDoms).each(function (i, item) {
              $(item).removeClass("is-active");
            })
            $("#tab1").addClass("is-active");
            $("#tab3").addClass("is-active");
            $("#tab-panel-1").hide();
          })
        }
        common.bill.retListPanel();
      },
      //选择商品页签
      checkGoods:function () {
        viewModel.isBomPanel(true);
        if(viewModel.billPanelStatus() == "detail"){
          $("#tab-panel-4").hide();
          $("#tab-panel-3").show();
        }else {
          $("#tab-panel-2").hide();
          $("#tab-panel-1").show();
        }
      },
      //选择Bom页签
      checkBom:function () {
        viewModel.isBomPanel(false);
        if(viewModel.billPanelStatus() == "detail"){
          $("#tab-panel-4").show();
          $("#tab-panel-3").hide();
        }else {
          $("#tab-panel-2").show();
          $("#tab-panel-1").hide();
        }
      },

      // 从行号池中拿到最新的行号
      generaterowNum: function() {
        var latestnum = viewModel.currowNum(),
          newnum = parseFloat(latestnum) + 10;
        viewModel.currowNum(newnum);
        return newnum;
      },
      getCurrowNum: function() {
        var data = viewModel.purchaseItems.getSimpleData();
        var maxrowNum = 0;
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].rowNum > maxrowNum) {
              maxrowNum = data[i].rowNum;
            }
          }
        }
        viewModel.currowNum(maxrowNum);
      },

      // 从行号池中拿到最新的bom行号
      generateBomrowNum: function() {
        var latestnum = viewModel.currowBomNum(),
          newnum = parseFloat(latestnum) + 10;
        viewModel.currowBomNum(newnum);
        return newnum;
      },
      getBomCurrowNum: function() {
        var data = viewModel.purchaseBomItems.getSimpleData();
        var maxrowNum = 0;
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].rowNum > maxrowNum) {
              maxrowNum = data[i].rowNum;
            }
          }
        }
        viewModel.currowBomNum(maxrowNum);
      },

      //计算价格
      sumPrice: function(row) {
        var amount = row.getValue('goodsNum');
        var unitPrice = row.getValue('unitPrice');
        amount == null ? 0 : parseFloat(amount);
        unitPrice == null ? 0 : parseFloat(unitPrice);
        row.setValue("amountMoney", amount * unitPrice);
        return amount * unitPrice;
      },
      //日期
      getCurDate: function(row) {
        // 服务器时间获取
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + '/search-date',
          success: function(data) {
            var truetime = u.date.format(data, 'YYYY/MM/DD');
            truetime = new Date(truetime).getTime();
            if (row) {
              row.setValue("orderDate", truetime);
            }
            viewModel.curDate(truetime);
          }
        });
      },
      // 清空已选参照
      clearRef: function(referids) {
        if (referids && referids.length > 0) {
          for (var i = 0; i < referids.length; i++) {
            var refer = $("#refContainer" + referids[i]).data("uui.refer");
            if (refer) {
              refer.uncheckAll();
              refer.setValue([]);
            }
          }
        }
      },

      //----------------行业业务代码提取（bom）---------------
      //根据商品id取bom
      findBomByParentId: function (id) {
        var bomInfo;
        $._ajax({
          url: window.pathMap.base+"/base/goods-boms/goods-bom-by-parent-good-id",
          type: 'get',
          async: false,
          data: {
            parentGoodId: id
          },
          success: function(data) {
            bomInfo = data;
          }
        })
        return bomInfo;
      },

      backClac: function (obj,field) {
        // 1. 修改数量 获取当前行 parentGoodsId
        // 2. 遍历所有行取出parentGoodsId 一样的所有行
        // 3. 取出所有行里面的 amount ，并且相加
        // 4. 获取商品行goodsid 和 parentGoodsId一样的行
        // 5. 把第三步相加的和赋值给 商品行的amount  obj.rowObj

        var parentRowNum = obj.rowObj.getValue("parentRowNum");
        var BomItemRows = viewModel.purchaseBomItems.getAllRealRows();
        var productItemRows = viewModel.purchaseItems.getAllRealRows();
        var oneParentBomRows = [],oneParentBomSum = 0;
        BomItemRows.forEach(function (item) {
          if(item.getValue("parentRowNum") == parentRowNum){
            oneParentBomRows.push(item);
          }
        });
        oneParentBomRows.forEach(function (item) {
          if(field == "unitPrice"){
            var childGoodsQty = item.getValue("childGoodsQty")?item.getValue("childGoodsQty"):1;
            oneParentBomSum = oneParentBomSum + (parseFloat(item.getValue(field)?item.getValue(field):0))*childGoodsQty;
          }else {
            oneParentBomSum = oneParentBomSum + parseFloat(item.getValue(field)?item.getValue(field):0);
          }
        });
        productItemRows.forEach(function (item) {
          if(item.getValue("rowNum") == parentRowNum ){
            item.setValue(field,oneParentBomSum)
          }
        })
      },
      // 选配
      goodsOpt: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var goodsSelectionDescription = obj.row.value.goodsSelectionDescription;   // 选配id
        var optName = goodsSelectionDescription ? goodsSelectionDescription : '添加选配';
        var detailfun = "data-bind=click:goodsOptionalFun.bind($data," + obj.rowIndex + ")";
        obj.element.innerHTML =
          '<a href="#" class="ui-a-detail" ' +
          detailfun +
          ">"+ optName +"</a>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      // 查看选配
      goodsOptDetails: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var goodsSelection = obj.row.value.goodsSelection;   // 选配id
        if (goodsSelection) {
          var detailfun = "data-bind=click:goodsOptDetailsFun.bind($data," + obj.rowIndex + ")";
          obj.element.innerHTML =
            '<a href="#" class="ui-a-detail" ' +
            detailfun +
            ">查看选配</a>";
        } else {
          obj.element.innerHTML =
            '<span>无选配信息</span>';
        }

        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      goodsOptionalFun: function (obj) {
        /**
         * @example 编辑选配common.goodsOptional.goodsOptional()
         * @param viewModel 当前viewModel, 用来挂载dialog
         * @param title     弹窗title
         * @param goodsId   商品行Id
         * @param baseGoodsOptId   选配结果id
         * @param el        dialog id (不加 ‘#’)
         * @param callback  确定是回调函数*   需要把信息保存到订单杭上， 如果是新增，就调用当前功能新增接口，编辑同理
         * @function callback --> 保存后拿到选配id 饭后添加到订单行上
         * @param  callback --> 保存后的选配信息做展示
         * @param  callback --> 保存后的选配信息做展示
         * @param  callback --> 成功后调取回调，关闭弹窗
         */
        var data = viewModel.purchaseItems.getSimpleData()[obj];
        var thisDatable = viewModel.purchaseItems.getAllRealRows()[obj];
        var id = data.goodsId;
        var baseGoodsOptId = data.goodsSelection ? data.goodsSelection : "";
        common.goodsOptional.goodsOptional(viewModel, '商品选配', id, baseGoodsOptId, 'dialog_goodsOptional',viewModel.purchaseItems,viewModel.purchaseBomItems, function(goodsOptData, goodsOptID,cb) {
          /**
           * 循环遍历返回结果，拼接后展示
           */
          var goodsOpt = goodsOptID[0].goodsOptDtos;// 选配与商品结构互斥，暂时理解为有子件的话不会出现选配信息 故只去第0项
          //获取全部bom信息
          var allrows = viewModel.purchaseBomItems.getAllRealRows();
          var bomdata = viewModel.purchaseBomItems.getRealSimpleData();
          //获取全部bom信息
          for(var i = 0; i < bomdata.length; i++){
            for (var j = 0; j < goodsOpt.length; j ++) {
              if (bomdata[i].goodsId == goodsOpt[j].goodsId && goodsOpt[j].optResult) {
                allrows[i].setValue("goodsSelection", goodsOpt[j].id);
                allrows[i].setValue("goodsSelectionDescription", goodsOpt[j].optResult);
              }
            }
          }
          var optResult = '', id = '';
          for (var i = 0; i < goodsOpt.length; i++) {
            optResult += goodsOpt[i].optResult + ',';
            id += goodsOpt[i].id + ',';
          }
          optResult = optResult.substr(0, optResult.length - 1);
          id = id.substr(0, id.length - 1);
          thisDatable.setValue('goodsSelection', id);
          thisDatable.setValue('goodsSelectionDescription', optResult);
          cb();
        });
      },
      goodsOptDetailsFun: function(obj) {
        /**
         * @example 查看选配common.goodsOptional.OptionalDetails()
         * @param viewModel 当前viewModel, 用来挂载dialog
         * @param title     弹窗title
         * @param goodsId   商品行Id
         * @param el        dialog id (不加 ‘#’)
         */
        var data = viewModel.purchaseItems.getSimpleData()[obj];
        var id = data.goodsId;
        var goodsSelection = data.goodsSelection ? data.goodsSelection : "";

        common.goodsOptional.OptionalDetails(viewModel, '商品选配', id, goodsSelection, 'dialog_goodsOptDetails', viewModel.purchaseItems,viewModel.purchaseBomItems);
      },
      setValueToBom: function (obj) {
        var parentRowNum = obj.rowObj.getValue("rowNum");
        var allrows = viewModel.purchaseBomItems.getAllRealRows();
        for(var i=0;i<allrows.length;i++){
          var nameField = obj.field.replace("Id","Name");
          var idField = obj.field;
          var display = obj.rowObj.data[idField].meta
          if(allrows[i].getValue("parentRowNum") == parentRowNum){
            allrows[i].setValue(obj.field,obj.newValue);
            if(obj.newValue){
                allrows[i].setValue(nameField,display?display.display:obj.rowObj.data[nameField].value);
            }
          }
        }},
      reCalculateTotalAmountMoneyByItem: function () {
        var arr = viewModel.purchaseBomItems.getSimpleData();
        var price = [],bomprice =[];
        var getSum = function(array) {
          var sum = 0;
          for (var i = 0; i < array.length; i++) {
            sum += parseInt(array[i]);
          }
          return sum;
        };
        for (var i = 0; i < arr.length; i++) {
          if (!arr[i].amountMoney || arr[i].persistStatus== "fdel") {
            arr[i].amountMoney = 0
          }
          var amountMoney = parseFloat(arr[i].amountMoney)
          price.push(amountMoney);
        }
        viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(price));
      }
    },
    afterCreate: function() {
        viewModel = u.extend(viewModel,bpmopenbill.model);
      //枚举
      $._ajax({
        type: "get",
        url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
        data: {
          cust_doc_code_batch: "QY102,QY103,QY104"
        },
        success: function(data) {
          var combodata = common.dataconvert.toMap(data["QY102"], "name", "code");
          var combodata1 = common.dataconvert.toMap(data["QY103"], "name", "code");
          var combodata2 = common.dataconvert.toMap(data["QY104"], "name", "code");
          viewModel.arrivalBelongDataSource(combodata);
          viewModel.orderTypeSource(combodata1);
          viewModel.purchaseTypeSource(combodata2);
        }
      });

      // 子表参照聚焦行，用于绑定子表参照组件
      var refRow = viewModel.ItemRefList.createEmptyRow();
      viewModel.ItemRefList.setRowFocus(refRow);

      // 确定销售产品参照，为产品组合子表增行
      viewModel.ItemRefList.on("productref.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainerproductref").data("uui.refer");
        var refValues = refer.values;
        if (refValues && refValues.length > 0) {
          for (var i = 0; i < refValues.length; i++) {
            var bomItems =[];
            var id = refValues[i].refpk;
            var name = refValues[i].refname;
            var rowNum = viewModel.generaterowNum();
              var newrow = viewModel.purchaseItems.createEmptyRow({
                  unSelect: true
              });
              newrow.setValue("rowNum", rowNum);
              newrow.setValue("goodsId", refValues[i].refpk);
              newrow.setValue("goodsCode", refValues[i].refcode);
              newrow.setValue("goodsName", refValues[i].refname);
              newrow.setValue("goodsVersion", refValues[i].version);
              newrow.setValue("unitId", refValues[i].basicUnitId);
              newrow.setValue("unitCode", refValues[i].basicUnitCode);
              newrow.setValue("unitName", refValues[i].basicUnitName);
              newrow.setValue("originalGoodsId", refValues[i].parentOriginalGoodsId);
              newrow.setValue("arrivalBelongCode", "01");
            //bom产品信息的添加
            var bomdata = viewModel.findBomByParentId(id);
            if(bomdata.length>0){
              var bomItem = bomdata[0].goodsBomChildren;
              bomItem.forEach(function (item) {
                  if (item.isOptional == 1) {
                      newrow.setValue("isOptional", 1);
                  }
                //转参照里字段
                var bomRowNum = viewModel.generateBomrowNum();
                item.id = null;
                item.goodsName = item.childGoodsName;
                item.goodsId = item.childGoodsId;
                item.goodsCode = item.childGoodsCode;
                item.unitId = item.childGoodsUnitId;
                item.unitCode = item.childGoodsUnitCode;
                item.unitName = item.childGoodsUnitName;
                item.goodsVersion = item.childGoodsVersion;
                item.goodsNum = item.childGoodsQty;
                item.originalGoodsId = item.childOriginalGoodsId;
                item.parentRowNum = rowNum;
                item.rowNum = bomRowNum;
                item.parentGoodsId = id;
                item.parentGoodsName = name;
                viewModel.currowBomNum(bomRowNum);
                bomItems.push(item);
              });
              viewModel.purchaseBomItems.addSimpleData(bomItems);
            }else {
              //没有bom结构的商品直接复制过来
              var parentRowNum = rowNum;
              var bomRowNum = viewModel.generateBomrowNum();
              var cpRow = viewModel.purchaseBomItems.createEmptyRow();
              var parentGoodsId = newrow.getValue("goodsId");
              var parentGoodsName = newrow.getValue("goodsName");
              cpRow.setSimpleData(newrow.getSimpleData());
              cpRow.setValue("rowNum", bomRowNum);
              cpRow.setValue("parentRowNum", parentRowNum);
              cpRow.setValue("parentGoodsId", parentGoodsId);
              cpRow.setValue("parentGoodsName", parentGoodsName);
            }
          }
        }
          viewModel.requery();
      });
      //数量
      viewModel.purchaseItems.on("goodsNum.valuechange", function(obj) {
        if (obj.oldValue == undefined && obj.oldValue == obj.newValue) {
         return;
        }
        viewModel.sumPrice(obj.rowObj);
        var arr = viewModel.purchaseItems.getSimpleData();
        var amount = [];
        var getSum = function(array) {
          var sum = 0;
          for (var i = 0; i < array.length; i++) {
            sum += parseInt(array[i]);
          }
          return sum;
        }
        for (var i = 0; i < arr.length; i++) {
          if (!arr[i].goodsNum) {
            arr[i].goodsNum = 0
          }
          var amountItem = parseFloat(arr[i].goodsNum)
          amount.push(amountItem);
        }
        viewModel.purchaseList.getCurrentRow().setValue("totalGoodsNum", getSum(amount));

        //联动bom数量
        var parentRowNum = obj.rowObj.getValue("rowNum");
        //获取全部bom信息
        var allrows = viewModel.purchaseBomItems.getAllRealRows();
        for(var i=0;i<allrows.length;i++){
          if(allrows[i].getValue("parentRowNum") == parentRowNum){
            var childQty = allrows[i].getValue("childGoodsQty") ? allrows[i].getValue("childGoodsQty") : 1;
            var bomAmount = childQty*obj.newValue;
            allrows[i].setValue("goodsNum",bomAmount)
          }
        }
      });
      //单价
      viewModel.purchaseItems.on("unitPrice.valuechange", function(obj) {
        if (obj.oldValue == undefined && obj.oldValue == obj.newValue) {
          return;
        }
        viewModel.sumPrice(obj.rowObj);
        var parentGoodsId = obj.rowObj.getValue("goodsId");
        var parentRowNum = obj.rowObj.getValue("rowNum");
        //获取全部bom信息
        var allrows = viewModel.purchaseBomItems.getAllRealRows();
        for(var i=0;i<allrows.length;i++){
          if(allrows[i].getValue("goodsId") == parentGoodsId && allrows[i].getValue("parentRowNum") == parentRowNum){
              var unitPrice = obj.newValue;
              allrows[i].setValue("unitPrice",unitPrice);
            }
        }
      });
      //Bom数量变化联动总价
      viewModel.purchaseBomItems.on("goodsNum.valuechange", function(obj) {
        if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
           viewModel.sumPrice(obj.rowObj);
        }
      });
      //单价
      viewModel.purchaseBomItems.on("unitPrice.valuechange", function(obj) {
        if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
          viewModel.sumPrice(obj.rowObj);
        }
        // 重算总金额
        viewModel.reCalculateTotalAmountMoneyByItem();
        // 计算反写商品行上面的值
        viewModel.backClac(obj,"unitPrice");
      });
      // 金额
      viewModel.purchaseItems.on("amountMoney.valuechange", function(obj) {

          var arr = viewModel.purchaseItems.getSimpleData();
          var price = [];
          var getSum = function(array) {
              var sum = 0;
              for (var i = 0; i < array.length; i++) {
                  sum += parseInt(array[i]);
              }
              return sum;
          }
          for (var i = 0; i < arr.length; i++) {
              var amountMoney = parseFloat(arr[i].amountMoney?arr[i].amountMoney:0)
              price.push(amountMoney);
          }
          viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(price));
      });
      //Bom金额监听反算商品金额
      viewModel.purchaseBomItems.on("amountMoney.valuechange", function(obj) {
        viewModel.backClac(obj,"amountMoney");

        var arr = viewModel.purchaseBomItems.getSimpleData();
        var price = [];
        var getSum = function(array) {
          var sum = 0;
          for (var i = 0; i < array.length; i++) {
            sum += parseInt(array[i]);
          }
          return sum;
        }
        for (var i = 0; i < arr.length; i++) {
          var amountMoney = parseFloat(arr[i].amountMoney?arr[i].amountMoney:0)
          price.push(amountMoney);
        }
        viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(price));
      });

      // 编辑地址信息开始
      viewModel.addresscardcomp.viewModel.params.on("countryId.valuechange", function(obj) {
        var provinceValue = {
          "EQ_areaLevel": "1"
        };
        $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
        var provinceId = viewModel.addresscardcomp.app.getComp("provinceIdBase");
        viewModel.addresscardcomp.viewModel.params.setValue("provinceId", "");
        viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
        viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
        viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
        var rowObj = '中国',
          preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
        if (obj.oldValue != obj.newValue) {
          if (!obj.rowObj.data.countryId.meta) {} else {
            rowObj = obj.rowObj.data.countryId.meta.display
          }
          if (!preValue && rowObj) {
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', rowObj + '/');
          } else {
            var preArr = preValue.split('/');
            if (rowObj) {
              preArr[0] = rowObj + '/';
            } else {
              preArr[0] = '';
            }
            preArr.splice(1, preArr.length - 1);
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
            var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
            var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
            var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
            cityId.setEnable(false);
            districtId.setEnable(false);
            townId.setEnable(false);
            if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
              viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
            }
          }
          if (!obj.newValue || obj.newValue == '') {
            provinceId.setEnable(false);
          } else {
            provinceId.setEnable(true);
          }
        } else {
          provinceId.setEnable(false);
        }
      });
      viewModel.addresscardcomp.viewModel.params.on("provinceId.valuechange", function(obj) {
        var provinceId = obj.newValue;
        var cityValue = {
          "EQ_areaLevel": "2",
          "EQ_parent.id": provinceId
        }
        $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
        var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
        viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
        viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
        viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
        if (obj.oldValue != obj.newValue) {
          var rowObj = obj.rowObj.data.provinceId.meta.display,
            preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
          var preArr = preValue.split('/');
          if (preArr.length > 2) {
            if (rowObj) {
              preArr[1] = rowObj + '/';
            } else {
              preArr[1] = '';
            }

            preArr.splice(2, preArr.length - 2);
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
            var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
            var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
            districtId.setEnable(false);
            townId.setEnable(false);
            if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
              viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
            }
          } else {
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
          }
          if (!obj.newValue || obj.newValue == '') {
            cityId.setEnable(false);
          } else {
            cityId.setEnable(true);
          }
        } else {
          cityId.setEnable(false);
        }
      });
      viewModel.addresscardcomp.viewModel.params.on("cityId.valuechange", function(obj) {
        var cityId = obj.newValue;
        var countyValue = {
          "EQ_areaLevel": "3",
          "EQ_parent.id": obj.newValue
        };
        $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
        viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
        viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
        if (obj.oldValue != obj.newValue) {
          var rowObj = obj.rowObj.data.cityId.meta.display,
            preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
          var preArr = preValue.split('/');
          if (preArr.length > 2) {
            if (rowObj) {
              preArr[2] = rowObj + '/';
            } else {
              preArr[2] = '';
            }

            preArr.splice(3, preArr.length - 3);
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
            var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
            townId.setEnable(false);
            if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
              viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
            }
          } else {
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
          }
          if (!obj.newValue || obj.newValue == '') {
            districtId.setEnable(false);
          } else {
            districtId.setEnable(true);
          }
        } else {
          districtId.setEnable(false);
        }
      });
      viewModel.addresscardcomp.viewModel.params.on("districtId.valuechange", function(obj) {
        var districtId = obj.newValue;
        var townValue = {
          "EQ_areaLevel": "4",
          "EQ_parent.id": obj.newValue
        };
        $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
        viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
        if (obj.oldValue != obj.newValue) {
          var rowObj = obj.rowObj.data.districtId.meta.display,
            preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
          var preArr = preValue.split('/');
          if (preArr.length > 3) {
            if (rowObj) {
              preArr[3] = rowObj + '/';
            } else {
              preArr[3] = '';
            }
            preArr.splice(4, preArr.length - 4);
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
            if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
              viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
            }
          } else {
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
          }
          if (!obj.newValue || obj.newValue == '') {
            townId.setEnable(false);
          } else {
            townId.setEnable(true);
          }
        } else {
          townId.setEnable(false);
        }
      });
      viewModel.addresscardcomp.viewModel.params.on("townId.valuechange", function(obj) {
        var townId = obj.newValue;
        if (obj.oldValue != obj.newValue) {
          var rowObj = obj.rowObj.data.townId.meta.display,
            preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
          var preArr = preValue.split('/');
          if (preArr.length > 4) {
            preArr[4] = rowObj + '/';
            preArr.splice(5, preArr.length - 5);
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
            if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
              viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
            }
          } else {
            viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
          }
        }
      });
      viewModel.addresscardcomp.viewModel.params.on("receiveAddress.valuechange", function(obj) {
        var newAddr = obj.newValue;
        if (obj.oldValue != obj.newValue) {
          var preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
          viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + newAddr);
        }
      });
      //编辑地址信息结束
      viewModel.purchaseItems.on("isGift.valuechange", function(obj) {
        var isGift = viewModel.purchaseItems.getValue("isGift");
        var unitPriceOpt = viewModel.app.getComp("grid_complexItem").grid.getColumnByField("unitPrice");
        if (isGift == "1") {
          viewModel.purchaseItems.setValue("unitPrice", 0);
          unitPriceOpt.options.editable = false;
        } else {
          unitPriceOpt.options.editable = true;
        }
      });

      //库存组织
      viewModel.purchaseItems.on("receiveStorageOrgId.valuechange", function(obj) {
        var displayName = obj.rowObj.data.receiveStorageOrgId.meta?
          obj.rowObj.data.receiveStorageOrgId.meta.display:"";
        obj.rowObj.setValue("receiveStorageOrgId",obj.newValue);
        obj.rowObj.setValue("receiveStorageOrgName",displayName);
        var curRow = viewModel.purchaseItems.getCurrentRow();
        var stockOrgId = curRow.getValue("receiveStorageOrgId");
        obj.rowObj.parent.meta.receiveStorageId.refparam =
          '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}';
        if (obj.newValue != obj.oldValue) {
          viewModel.purchaseItems.setValue("receiveStorageId", "");
        }
      });
      //批次号 货位 批号 供应商 项目 库存状态 客户
      viewModel.purchaseItems.on("valuechange", function(obj) {
        if(obj.field=="batchNumId"
          ||obj.field=="goodsPositionId"
          ||obj.field=="batchCodeId"
          ||obj.field=="supplierId"
          ||obj.field=="projectId"
          ||obj.field=="stockStateId"
          ||obj.field=="demandStockOrgId"
          ||obj.field=="receiveStorageOrgId"
          ||obj.field=="receiveStorageId"
            ||obj.field=="customerId"
        ){
          viewModel.setValueToBom(obj);
        }
      });
      //需求库存组织
      viewModel.purchaseItems.on("demandStockOrgId.valuechange", function(obj) {
        var grid = viewModel.app.getComp("grid_complexBomItem").grid;
        obj.rowObj.setValue("receiveStorageOrgId",obj.rowObj.getValue("demandStockOrgId"));
        obj.rowObj.setValue("receiveStorageOrgName",obj.rowObj.data.demandStockOrgId.meta.display);
        var allBoms = viewModel.purchaseBomItems.getAllRealRows();
        if(obj.newValue !=undefined){
          allBoms.forEach(function (item) {
            //含有包件
            if(item.getValue("parentRowNum")==obj.rowObj.getValue("rowNum")){
              item.setValue("receiveStorageOrgId",obj.rowObj.getValue("demandStockOrgId"));
              item.setValue("receiveStorageOrgName",obj.rowObj.data.demandStockOrgId.meta.display);
            }
          });
          grid.repaintGridDivs();
        }
        var stockOrgId = obj.rowObj.getValue("receiveStorageOrgId");
        obj.rowObj.parent.meta.receiveStorageId.refparam =
          '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}';
        if (obj.newValue != obj.oldValue) {
          viewModel.purchaseItems.setValue("receiveStorageId", "");
        };
      });
      viewModel.purchaseList.on("purchasePersonId.valuechange", function (obj) {
        var refer = $("#refContainerpurchasePersonId").data("uui.refer");
        var refValues = refer.values;
        if(refValues) {
          obj.rowObj.setValue('purchaseDeptId', refer.values[0].departmentId);
        }
      });

      // 根据交易类型判断表体行库存组织是否可编辑
      //不支持直运采购
      // viewModel.purchaseList.on("tranTypeId.valuechange", function(obj) {
      //   var tranType = viewModel.purchaseList.getValue("tranTypeId");
      //   var allItems = viewModel.purchaseItems.getAllRows();
      //   //DirectPurchase ：直运采购 GeneralPurchase ：普通采购
      //   var receiveStorageOrgOpt = viewModel.app.getComp("grid_complexItem").grid.getColumnByField("receiveStorageOrgId");
      //   if (tranType == "GeneralPurchase") {
      //     receiveStorageOrgOpt.options.editable = true;
      //     receiveStorageOrgOpt.options.editOptions.required = true;
      //   } else {
      //     receiveStorageOrgOpt.options.editable = false;
      //     receiveStorageOrgOpt.options.editOptions.required = false;
      //     allItems.forEach(function(item) {
      //       item.setValue("receiveStorageOrgId", "");
      //       item.setMeta("receiveStorageOrgId", "display", '');
      //     });
      //   };
      //   var grid = app.getComp("grid_complexItem").grid;
      //   grid.repaintGridDivs();
      // });
    }
  });

  return view;
});