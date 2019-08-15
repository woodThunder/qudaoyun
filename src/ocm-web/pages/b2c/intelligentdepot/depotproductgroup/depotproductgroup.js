define(['text!./depotproductgroup.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c/b2c";
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
      baseurl: '/route/stor-packages',
      depotProductList: new u.DataTable(model.options.metas.depotproduct),
      productCateItem: new u.DataTable(model.options.metas.productcateItem),
      ItemRefList: new u.DataTable(model.options.metas.ItemRef),
      listIndex: null,
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
      //   var row = viewModel.depotProductList.getFocusRow();
      //   if(!row) {
      //     return;
      //   }
      //   var enableStatus = row.getValue("enableStatus");
      //   return enableStatus==1? "启用":"停用";
      // },
      enableFmt: ko.pureComputed(function() {
        var enableStatus = viewModel.depotProductList.ref("enableStatus")();
        return enableStatus == 1 ? "启用" : "停用";
      })
    },
    rendertype: {
      operation: common.rendertype.operation,
      enableStatusRender: common.rendertype.enableRender,
      detailRender: common.rendertype.detailRender,
    },
    events: {
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.depotProductList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.depotProductList.getSelectedRows();
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
          onOk: function() {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/delete",
              type: "post",
              // data: "ids=" + ids.join(","),
              data: {
                ids: ids.join(",")
              },
              success: function(data) {
                viewModel.depotProductList.removeRows(rows);
              }
            });

          }
        });
      },
      //刷新
      refresh: function() {
        viewModel.depotProductList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.depotProductList.setSimpleData(data.content, {
              unSelect: true
            });
          }
        })
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.depotProductList.pageIndex(0);
        }
        viewModel.depotProductList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.depotProductList.pageSize();
        var pageNumber = viewModel.depotProductList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.depotProductList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.depotProductList.totalRow(data.totalElements);
            viewModel.depotProductList.totalPages(data.totalPages);
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
        viewModel.depotProductList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.depotProductList.pageSize(size);
        viewModel.search(true);
      },
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.depotProductList.createEmptyRow();
        viewModel.depotProductList.setRowFocus(curRow);
        viewModel.productCateItem.removeAllRows();
        // curRow.setValue("enableStatus", "1");
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      // 可以进入编辑态 --检查单据是否有忆被占用
      canInEdit: function() {
        var canIn = true;
        var id = viewModel.depotProductList.getValue("id");
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
        viewModel.depotProductList.setRowFocus(index);
        // if (!viewModel.canInEdit()) {
        //   return;
        // }
        var id = viewModel.depotProductList.getValue("id");
        viewModel.depotProductList.originEditData = viewModel.depotProductList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      //进入复制单据页
      showCopyBillPanel: function() {
        var selectedRows = viewModel.depotProductList.getSelectedRows();
        // 只支持单一复制，批量复制需单独处理
        if (selectedRows.length != 1) {
          toastr.error("请选择一条要复制的行");
          return;
        }
        var copyRow = selectedRows[0];
        var curRow = viewModel.depotProductList.createEmptyRow();
        curRow.setSimpleData(copyRow.getSimpleData());
        viewModel.depotProductList.setRowFocus(curRow);
        var id = copyRow.getValue("id");
        //查询子表数据
        viewModel.findByParentid(id);
        //删除主表主键，编码，审计信息
        viewModel.clearBaseProp(curRow);
        //删除子表主键，子表主表关联
        var subRows = viewModel.productCateItem.getAllRows();
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
      //     var curRow = viewModel.depotProductList.getCurrentRow();
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
      detail: function(obj, rowId) {
        //确保grid先将行设置为focus状态
        if (viewModel.listIndex == obj.rowIndex) {
          return true;
        } else {
          viewModel.listIndex = obj.rowIndex;
        }
        viewModel.depotProductList.setRowSelect(obj.rowIndex);
        var id = obj.rowObj.value.id;
        viewModel.findByParentid(id);
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/" + id,
          type: 'get',
          async: false,
          // data: {
          //   id: id
          // },
          success: function(data) {
            viewModel.productCateItem.setSimpleData(data.routePackageDetail);
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
        viewModel.productCateItem.createEmptyRow();
      },
      //批量新增子表项
      // addItems: function() {
      //
      // },
      //删除子表项
      delItems: function() {
        var selectedRows = viewModel.productCateItem.getSelectedRows();
        for (var i = 0; i < selectedRows.length; i++) {
          selectedRows[i].setValue("dr", "1");
        }
        viewModel.productCateItem.removeRows(selectedRows);
      },
      //保存单据
      saveBill: function() {
        var result = viewModel.app.compsValidateMultiParam({
          element: ".ui-bill-panel",
          showMsg: true
        });
        if (!result.passed) {
          return;
        }
        var allRows = viewModel.productCateItem.getAllRows();
        if (allRows.length == 0 || allRows.every(function(row) {
            return row.status == u.Row.STATUS.FALSE_DELETE
          })) {
          toastr.error("请录入表体行数据");
          return;
        }
        var complexData = viewModel.depotProductList.getCurrentRow().getSimpleData();
        var complexItemsData = viewModel.productCateItem.getSimpleData();
        complexData.routePackageDetail = complexItemsData;
        var datas = JSON.stringify(complexData);
        var _ajaxType = viewModel.depotProductList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: datas,
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.depotProductList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.depotProductList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function() {
        viewModel.productCateItem.removeAllRows();
        var curRow = viewModel.depotProductList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.depotProductList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.depotProductList.removeRow(curRow);
          viewModel.productCateItem.removeAllRows();
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
        viewModel.ItemRefList.setValue("goodscatref", "");
        var refer = $("#refContainergoodscatref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      detail2bill: function() {
        // if (!viewModel.canInEdit()) {
        //   return;
        // }
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
    },
    afterCreate: function() {

      // 列表查询数据(无查询条件)
      viewModel.search();
      // 子表参照聚焦行，用于绑定子表参照组件
      var refRow = viewModel.ItemRefList.createEmptyRow();
      viewModel.ItemRefList.setRowFocus(refRow);
      viewModel.depotProductList.on("brandId.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("[id^='refContainerbrandId']").data("uui.refer");
        if (refer) {
          var refValues = refer.values;
          if (refValues) {
            viewModel.depotProductList.setValue('brandCode', refValues[0].refcode);
          }
        }
        // viewModel.depotProductList.setValue('brandId', refValues[0].refpk);
      });
      // 商品分类增行
      viewModel.ItemRefList.on("goodscatref.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainergoodscatref").data("uui.refer");
        var refValues = refer.values;
        if (refValues && refValues.length > 0) {
          for (var i = 0; i < refValues.length; i++) {
            var id = refValues[i].refpk;
            var row = viewModel.productCateItem.getRowByField("categoryId", id);
            if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
              var newrow = viewModel.productCateItem.createEmptyRow();
              newrow.setValue("categoryCode", refValues[i].refcode);
              newrow.setValue("categoryName", refValues[i].refname);
              newrow.setValue("categoryId", refValues[i].refpk);
            }
          }
        }
      });
    }
  });

  return view;
});