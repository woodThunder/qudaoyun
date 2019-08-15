define(['text!./pricelist.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
  'use strict'
  var viewModel;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/price/price-lists',
      complexList: new u.DataTable(model.options.metas.complex),
      complexItems: new u.DataTable(model.options.metas.complexItem),
      ItemRefList: new u.DataTable(model.options.metas.ItemRef),

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
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //返回列表页
      // retListPanel: common.bill.retListPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      // enableFmt: function() {
      //   var row = viewModel.complexList.getFocusRow();
      //   if(!row) {
      //     return;
      //   }
      //   var enableStatus = row.getValue("enableStatus");
      //   return enableStatus==1? "启用":"停用";
      // },
      enableFmtGoods: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("useGoods")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      enableFmtProduct: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("useProduct")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      enableFmtBrand: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("useBrand")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      enableFmtCategory: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("useGoodsCategory")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      enableFmtBrand: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("useBrand")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      enableFmtCustomer: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("useCustomer")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      enableFmtCustomerCategory: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("useCustomerCategory")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      enableFmtShop: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("useShop")();
        return enableStatus == 1 ? "启用" : "停用";
      }),
      unitTypeFmt: ko.pureComputed(function () {
        var enableStatus = viewModel.complexList.ref("unitTypeFmt")();
        return enableStatus == 1 ? "辅助单位" : "基本单位";
      })
    },
    rendertype: {
      operation: common.rendertype.operation,
      enableStatusRender: function(params) {
        params.element.innerHTML = "启用";
        if (params.value == "0") {
          params.element.innerHTML = "停用";
        }
      },
      detailRender: common.rendertype.detailRender,
      unitRender: function(params) {
        params.element.innerHTML = "基本单位";
        if (params.value == "1") {
          params.element.innerHTML = "辅助单位";
        }
      }
    },
    events: {
      //删除和批量删除
      del: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
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
        common.dialog.confirmDialog({
          msg1: '确认删除这些项？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/delete",
              type: "post",
              // data: "ids=" + ids.join(","),
              data: {
                ids: ids.join(",")
              },
              success: function (data) {
                viewModel.complexList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
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
        var curRow = viewModel.complexList.createEmptyRow();
        viewModel.complexList.setRowFocus(curRow);
        viewModel.complexItems.removeAllRows();
        curRow.setValue("unitType", "2");
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        $._ajax({
          type: "get",
          url: appCtx + "/price/price-items/plis",
          data: null,
          success: function (data) {
            viewModel.complexItems.setSimpleData(data, {unSelect: true});
          }
        })
      },
      // 可以进入编辑态
      canInEdit: function () {
        var canIn = true;
        var id = viewModel.complexList.getValue("id");
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/isRefer",
          async: false,
          data: {
            id: id
          },
          success: function (data) {
            if (data == 1) {
              toastr.error("已被引用数据不可编辑");
              canIn = false;
            }
          }
        })
        return canIn;
      },
      //进入修改单据页
      showEditBillPanel: function (index) {
        viewModel.complexList.setRowFocus(index);
        // if (!viewModel.canInEdit()) {
        //   return;
        // }
        var id = viewModel.complexList.getValue("id");
        viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      //进入复制单据页
      showCopyBillPanel: function () {
        var selectedRows = viewModel.complexList.getSelectedRows();
        // 只支持单一复制，批量复制需单独处理
        if (selectedRows.length != 1) {
          toastr.error("请选择一条要复制的行");
          return;
        }
        var copyRow = selectedRows[0];
        var curRow = viewModel.complexList.createEmptyRow();
        curRow.setSimpleData(copyRow.getSimpleData());
        viewModel.complexList.setRowFocus(curRow);
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
      detail: function () {
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          var curRow = viewModel.complexList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function (id) {
        $._ajax({
          url: appCtx + '/price/price-list-items/find-by-price-list',
          type: 'get',
          async: false,
          data: {
            priceListId: id
          },
          success: function (data) {
            viewModel.complexItems.setSimpleData(data);
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
      //跳转单据详情页
      showBillDetail: function () {
        $(".ui-list-panel").addClass("animated slideInLeft");
        $(".ui-bill-panel").addClass("animated slideOutDown");
      },
      //新增子表项
      addItem: function () {
        viewModel.complexItems.createEmptyRow();
      },
      //批量新增子表项
      // addItems: function() {
      //
      // },
      //删除子表项
      delItems: function () {
        var selectedRows = viewModel.complexItems.getSelectedRows();
        for (var i = 0; i < selectedRows.length; i++) {
          selectedRows[i].setValue("dr", "1");
        }
        viewModel.complexItems.removeRows(selectedRows);
      },
      //保存单据
      saveBill: function () {
        // var result = app.compsValidateMultiParam({
        //   element: ".ui-bill-panel",
        //   showMsg: true
        // });
        // if (!result.passed) {
        //   return;
        // }
        // var allRows = viewModel.complexItems.getAllRows();
        // if (allRows.length == 0 || allRows.every(function (row) {
        //     return row.status == u.Row.STATUS.FALSE_DELETE
        //   })) {
        //   toastr.error("请录入表体行数据");
        //   return;
        // }
        var complexData = viewModel.complexList.getCurrentRow().getSimpleData();
        var complexItemsData = viewModel.complexItems.getSimpleData();
        //complexData.organizationId = 'bcb70408-b8b5-4128-9289-d820f7f4a8f5';
        for (var i = 0; i < complexItemsData.length; i++) {
          if (complexItemsData[i].isSelected == null) {
            complexItemsData[i].isSelected = "0";
          }
          if (complexItemsData[i].isModify == null) {
            complexItemsData[i].isModify = "0";
          }
        }
        complexData.priceListItems = complexItemsData;
        var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.complexList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function () {
        // var curRow = viewModel.complexList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function () {
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
      enable: function () {
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
            success: function (res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("enableStatus", "1");
              }
            }
          })
        }
      },
      //停用
      disable: function () {
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
            success: function (res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("enableStatus", "0");
              }
            }
          })
        }
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function () {
        viewModel.clearItemsRef();
        $("#addItemsRef .refer").trigger("click");
      },
      //清空已选销售产品参照
      clearItemsRef: function () {
        viewModel.ItemRefList.setValue("productref", "");
        var refer = $("#refContainerproductref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      detail2bill: function () {
        // if (!viewModel.canInEdit()) {
        //   return;
        // }
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
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
      // 放回列表页
      retListPanel: function () {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      }
    },
    afterCreate: function () {

      // 列表查询数据(无查询条件)
      // viewModel.search();
      // 子表参照聚焦行，用于绑定子表参照组件
      var refRow = viewModel.ItemRefList.createEmptyRow();
      viewModel.ItemRefList.setRowFocus(refRow);
      // 确定销售产品参照，为产品组合子表增行
      viewModel.ItemRefList.on("productref.valuechange", function (obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainerproductref").data("uui.refer");
        var refValues = refer.values;
        if (refValues && refValues.length > 0) {
          for (var i = 0; i < refValues.length; i++) {
            var id = refValues[i].refpk;
            var row = viewModel.complexItems.getRowByField("productid", id);
            if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
              var newrow = viewModel.complexItems.createEmptyRow();
              newrow.setValue("productidCode", refValues[i].refcode);
              newrow.setValue("productidName", refValues[i].refname);
              newrow.setValue("productidStandardName", refValues[i].productModelName);
              newrow.setValue("productidSaleSeriesName", refValues[i].productSaleSeriesName);
              newrow.setValue("unitName", refValues[i].baseUnit);
              newrow.setValue("productid", id);
            }
          }
        }
      });
    }
  });

  return view;
});
