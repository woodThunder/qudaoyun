define(['text!./agencydistrictrange.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c/b2c",
    popupDialog;
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
      baseurl: '/route/customer-coverages',
      districtUrlCountry: '/occ-base/base/countrys/get-default',
      districturlProvince: '/occ-base/base/administrative-divisions/find-provinces',
      districturl: '/occ-base/base/administrative-divisions/find-sub-node',
      depotDistrictList: new u.DataTable(model.options.metas.depotdistrict),
      districtItem: new u.DataTable(model.options.metas.districtItem),
      simpleListTree: new u.DataTable(model.options.metas.AdministrativeDivisionmeta),
      ItemRefList: new u.DataTable(model.options.metas.ItemRef),
      listIndex: null,
      countryId: '',
      hadIds: [],
      searchcomp: {},
      searchdistrictchcomp: {},
      dialogcardcomp: {},
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,

      card1Source: model.options.cards.card1,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,

      // 分配组织的穿梭框树形基本配置
      treeSetting: {
        view: {
          showLine: false,
          multiSelect: true
        }
      },
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
      retListPanel: common.bill.retListPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,

      fourleveladdr: common.address.fourleveladdr,
      clickTree: common.address.clickTree,
      // enableFmt: function() {
      //   var row = viewModel.depotDistrictList.getFocusRow();
      //   if(!row) {
      //     return;
      //   }
      //   var enableStatus = row.getValue("enableStatus");
      //   return enableStatus==1? "启用":"停用";
      // },
      enableFmt: ko.pureComputed(function() {
        var enableStatus = viewModel.depotDistrictList.ref("enableStatus")();
        return enableStatus == 1 ? "启用" : "停用";
      })
    },
    rendertype: {
      operation: common.rendertype.operation,
      enableStatusRender: common.rendertype.enableRender,
      detailRender: common.rendertype.detailRender,
    },
    events: {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      // beforeEdit: function(index, rowId) {
      //   var title;
      //   viewModel.index = index;
      //   if (index >= 0) {
      //     //修改操作
      //     title = "编辑";
      //     var currentData = viewModel.depotDistrictList.getRowByRowId(rowId).getSimpleData();
      //     viewModel.rowId = rowId;
      //     viewModel.dialogcardcomp.seteidtData(currentData);
      //   } else {
      //     title = "新增"
      //     //清空编辑框的信息
      //     viewModel.dialogcardcomp.cleareidt();
      //   }
      //   //显示模态框
      //   viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      // },
      //将操作后的数据进行保存
      edit: function() {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          if (index >= 0) {
            type = "put";
          }
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              //如果index大于等于0说明是修改
              viewModel.dialogcardcomp.close();
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.depotDistrictList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到simpleList上
              } else {
                //添加数据
                currentRow = viewModel.depotDistrictList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
            }
          })

        }
      },
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.depotDistrictList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.depotDistrictList.getSelectedRows();
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
                viewModel.depotDistrictList.removeRows(rows);
              }
            });

          }
        });
      },
      //刷新
      refresh: function() {
        viewModel.depotDistrictList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.depotDistrictList.setSimpleData(data.content, {
              unSelect: true
            });
          }
        })
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.depotDistrictList.pageIndex(0);
        }
        viewModel.depotDistrictList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.depotDistrictList.pageSize();
        var pageNumber = viewModel.depotDistrictList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.depotDistrictList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.depotDistrictList.totalRow(data.totalElements);
            viewModel.depotDistrictList.totalPages(data.totalPages);
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
        viewModel.depotDistrictList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.depotDistrictList.pageSize(size);
        viewModel.search(true);
      },
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.depotDistrictList.createEmptyRow();
        viewModel.depotDistrictList.setRowFocus(curRow);
        viewModel.districtItem.removeAllRows();
        // curRow.setValue("enableStatus", "1");
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      // 可以进入编辑态 --检查单据是否有忆被占用
      canInEdit: function() {
        var canIn = true;
        var id = viewModel.depotDistrictList.getValue("id");
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
      showEditBillPanel: function(index, rowId) {
        // viewModel.beforeEdit(index, rowId);
        viewModel.depotDistrictList.setRowFocus(index);
        // if (!viewModel.canInEdit()) {
        //   return;
        // }
        var id = viewModel.depotDistrictList.getValue("id");
        viewModel.depotDistrictList.originEditData = viewModel.depotDistrictList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      //进入复制单据页
      showCopyBillPanel: function() {
        var selectedRows = viewModel.depotDistrictList.getSelectedRows();
        // 只支持单一复制，批量复制需单独处理
        if (selectedRows.length != 1) {
          toastr.error("请选择一条要复制的行");
          return;
        }
        var copyRow = selectedRows[0];
        var curRow = viewModel.depotDistrictList.createEmptyRow();
        curRow.setSimpleData(copyRow.getSimpleData());
        viewModel.depotDistrictList.setRowFocus(curRow);
        var id = copyRow.getValue("id");
        //查询子表数据
        viewModel.findByParentid(id);
        //删除主表主键，编码，审计信息
        viewModel.clearBaseProp(curRow);
        //删除子表主键，子表主表关联
        var subRows = viewModel.districtItem.getAllRows();
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
      //     var curRow = viewModel.depotDistrictList.getCurrentRow();
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
        viewModel.depotDistrictList.setRowSelect(obj.rowIndex);
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
            viewModel.districtItem.setSimpleData(data.routeCoverageDetail);
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
        viewModel.districtItem.createEmptyRow();
      },
      //批量新增子表项
      // addItems: function() {
      //
      // },
      //删除子表项
      delItems: function() {
        var selectedRows = viewModel.districtItem.getSelectedRows();
        for (var i = 0; i < selectedRows.length; i++) {
          selectedRows[i].setValue("dr", "1");
        }
        viewModel.districtItem.removeRows(selectedRows);
      },
      //保存单据
      saveBill: function() {
        var allRows = viewModel.districtItem.getAllRows();
        if (allRows.length == 0 || allRows.every(function(row) {
            return row.status == u.Row.STATUS.FALSE_DELETE
          })) {
          toastr.error("请录入表体行数据");
          return;
        }
        var complexData = viewModel.depotDistrictList.getCurrentRow().getSimpleData();
        var complexItemsData = viewModel.districtItem.getSimpleData();
        complexData.routeCoverageDetail = complexItemsData;
        var _ajaxType = viewModel.depotDistrictList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.depotDistrictList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.depotDistrictList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function() {
        var curRow = viewModel.depotDistrictList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.depotDistrictList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.districtItem.removeAllRows();
          viewModel.depotDistrictList.removeRow(curRow);
          viewModel.districtItem.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //清空已选销售产品参照
      clearItemsRef: function() {
        viewModel.ItemRefList.setValue("productref", "");
        var refer = $("#refContainerproductref").data("uui.refer");
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
      showAddItems: function() {
        common.address.showAddItemsRef(viewModel)
      }

    },
    afterCreate: function() {

      // 列表查询数据(无查询条件)
      viewModel.search();
      viewModel.depotDistrictList.on("customerId.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("[id^='refContainercustomerId']").data("uui.refer");
        var refValues = refer.values;
        if (refValues) {
          viewModel.depotDistrictList.setValue('customerCode', refValues[0].refcode);
        }
        // viewModel.depotDistrictList.setValue('customerName', refValues[0].refname);
        // viewModel.depotDistrictList.setValue('customerId', refValues[0].refpk);
      });
      // viewModel.depotDistrictList.on("routePackageId.valuechange", function(obj) {
      //   // 清空参照时不增行
      //   if (!obj.newValue) {
      //     return;
      //   }
      //   var refer = $("[id^='refContainerroutePackageId']").data("uui.refer");
      //   var refValues = refer.values;
      //   viewModel.depotDistrictList.setValue('routePackageCode', refValues[0].refcode);
      //   viewModel.depotDistrictList.setValue('routePackageName', refValues[0].refname);
      //   viewModel.depotDistrictList.setValue('routePackageId', refValues[0].refpk);
      // });
    }
  });

  return view;
});