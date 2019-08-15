define(['text!./purchasein.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
  'use strict'
  var viewModel, app;
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
      app = this.app;
      var customerInfo = JSON.parse(localStorage.getItem("_A_P_customer"));
      //客户级别 直接客户 "01" 间接客户 "02"
      var customerRank = customerInfo.customerRankCode;
      if(customerRank === "01"){
        viewModel.customerRank("direct")
      }else {
        viewModel.customerRank("Indirect");
      }
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/stock/required-ins',
      purchaseinList: new u.DataTable(model.options.metas.complex),
      purchaseinItems: new u.DataTable(model.options.metas.complexItem),
      //新增 参照
      //采购订单
      referPurchaseorderList: new u.DataTable(model.options.metas.referPurchaseorder),
      //对应商品
      referPurchaseorderitemList: new u.DataTable(model.options.metas.referPurchaseorderitem),
      //已选择
      selectedreferList: new u.DataTable(model.options.metas.referPurchaseorder),
      selectedreferListItem: new u.DataTable(model.options.metas.referPurchaseorderitem),
      //新增 参照 搜索
      referPurchaseorderSearchParam:new DataTable(model.options.metas.referPurchaseorderSearch),
      ItemRefList: new u.DataTable(model.options.metas.ItemRef),
      //功能区
      operateArea:new u.DataTable(model.options.metas.operateArea),
      searchcomp: {},
      searchcomp2: {},
      arrivalBelongDataSource: ko.observableArray([]),
      searchSource: model.options.searchs.search1,
      search2Source: model.options.searchs.search2,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,

      card1Source: model.options.cards.card1,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,

      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      // 行号池
      currowNum: ko.observable(0),
      curDate: ko.observable(),
      stockInType:ko.observableArray([]),
      //记录列表当前的位置
      listIndex: null,
      pageAdd:ko.observableArray([]),
      pageModel: {
        totalPages: ko.observable(0),
        pageSize: ko.observable(0),
        pageIndex: ko.observable(0),
        totalRow: ko.observable(0),
        hasPage:ko.observable(0),
        setCurrentPage:ko.observable(0),
      },
      status: ko.pureComputed(function() {
        var enableStatus = viewModel.purchaseinList.ref("status")();
        switch (enableStatus) {
          case '01':
            return "自由态";
          case '02':
            return "已签字";
          case '03':
            return "已取消";
          default:
        }
      }),
      billDateComputed: ko.pureComputed(function () {
        var truetime = viewModel.purchaseinList.ref("billDate")();
        var showtime = u.date.format(truetime, 'YYYY-MM-DD');
        return showtime;
      }),

      // 客户级别
      customerRank :ko.observable(),
    },
    rendertype: {
      operation: function (obj) {
        var editfun,delfun;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var billStatusCode = obj.row.value.statusCode;
        if (billStatusCode == "02") {
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
      // billDateFormat: ko.pureComputed(function () {
      //   var truetime = viewModel.purchaseinList.ref("stockInDate")();
      //   var showtime = u.date.format(truetime, 'YYYY-MM-DD');
      //   return showtime;
      // }),
      statusRender: function(params) {
        var value = parseFloat(params.value);
        var showName = "";
        switch(value){
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
      purchasestatusRender: function(params) {
        var value = params.value;
        value += "";
        var showName = "";
        switch(value){
          case "1":
            showName = "自由态";
            break;
          case "2":
            showName = "已提交";
            break;
          case "3":
            showName = "关闭";
            break;
          case "4":
            showName = "审批通过";
            break;
          case "5":
            showName = "审批不通过";
            break;
        };
        params.element.innerHTML = showName;
      },
      rowRemove: function (obj) {
        var rowRemove = "data-bind=click:remove.bind($data," + obj.rowIndex + ")";
        obj.element.innerHTML = '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          '<a href="#"  ' +
          rowRemove +
          ' title="删除">删除</a>' +
          '</span>' +
          '</div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      stockInTypeRender:function (obj) {
        var showValue = obj.value == "1" ? "采购入库" :""
        obj.element.innerHTML = showValue;
      },
      billDateFormat: function (value) {
        var showtime = u.date.format(value, 'YYYY-MM-DD');
        return showtime;
      }

    },
    events: {
        changeCondition: function (domid, oldcondition, newcondition) {
            $("#" + domid).attr("data-refparam", JSON.stringify(
                u.extend({},
                    oldcondition,
                    newcondition
                )
            ));
        },
        customerCallBack : function (data) {
            if(data != null){
                data = data.join(",");
            }else {
                data = "";
            }
            viewModel.changeCondition("supplierIdSearch1",{"EQ_isEnable" : "1"},{"IN_id" : data});
            viewModel.changeCondition("supplierSearch2",{"EQ_isEnable" : "1"},{"IN_id" : data});
            viewModel.changeCondition("supplierCard",{"EQ_isEnable" : "1"},{"IN_id" : data});
        },
        saleOrgCallBack : function (data) {
            if(data != null){
                data = data.join(",");
            }else {
                data = "";
            }
            viewModel.changeCondition("orgIdSearch1",{"EQ_orgFuncRel": "01", "EQ_isEnable" : "1"},{"IN_id" :data});
            viewModel.changeCondition("saleOrgSearch2",{"EQ_orgFuncRel": "01", "EQ_isEnable" : "1"},{"IN_id" : data });
            viewModel.changeCondition("saleOrgCard",{"EQ_orgFuncRel": "01", "EQ_isEnable" : "1"},{"IN_id" : data });
        },
        findCondition : function (userId, url,call) {
            $._ajax({
                type: "get",
                async : false,
                url: "/occ-base/api/base/customer-jurisdiction"+url,
                dataType: "json",
                data: {
                    userId : userId,
                },
                success: function (data) {
                    call(data);
                }
            })
        },
      remove:function (rowId) {
        viewModel.selectedreferListItem.setRowFocus(rowId);
        var curRow = viewModel.selectedreferListItem.getFocusRow();
        var id = curRow.getValue("id");
        var detailItemRow = viewModel.referPurchaseorderitemList.getSelectedRows();

        for(var i = detailItemRow.length-1;i>=0;i--){
          if(detailItemRow[i].getValue("id") === id){
            viewModel.referPurchaseorderitemList.removeRows([i],{forceDel:true});
          }
        }
        viewModel.selectedreferListItem.removeRows(curRow,{forceDel:true});
        viewModel.listHasItem();
      },
      listHasItem:function () {
        var ListRow = viewModel.referPurchaseorderList.getAllRealRows();
        var ItemRow = viewModel.referPurchaseorderitemList.getSelectedRows();
        for(var i=0;i<ListRow.length;i++){
          var ids = ListRow[i].getValue("reqOrderItems").getSimpleData();
          if(ItemRow.length>0){
            for(var j=0;j<ItemRow.length;j++){
              var curid = ItemRow[j].getValue("id");
            }
          }else {
            ListRow[i]
            return false
          }

        }
          // $.inArray(id,selectedIds)>-1
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.purchaseinList.pageIndex(0);
        }
        viewModel.purchaseinList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.purchaseinList.pageSize();
        var pageNumber = viewModel.purchaseinList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            data.content.forEach(function (item) {
                if(item.saleOrgId != null){
                  item.supplierName = item.saleOrgName;
                }
            });
            viewModel.purchaseinList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.purchaseinList.totalRow(data.totalElements);
            viewModel.purchaseinList.totalPages(data.totalPages);
          }
        })
      },
      //删除
      del: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.purchaseinList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.purchaseinList.getSelectedRows();
        var ids =[];
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
              data: {
                ids: ids.join(",")
              },
              success: function (data) {
                viewModel.purchaseinList.removeRows(rows);
              }
            });

          }
        });
      },
      //批量删除
      batchdel:function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.purchaseinList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.purchaseinList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            if(rows[i].getValue("status")==="03"){
              toastr.error("已签字数据不能删除");
              return;
            }
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
              url: appCtx + viewModel.baseurl + "/batch-delete",
              type: "post",
              // data: "ids=" + ids.join(","),
              data: {
                ids: ids.join(",")
              },
              success: function (data) {
                viewModel.purchaseinList.removeRows(rows);
              }
            });

          }
        });
      },
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.purchaseinList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.purchaseinList.pageSize(size);
        viewModel.search(true);
      },
      beforPageChangeFun:function (index) {
        var pagedataArr = viewModel.pageAdd();
        var flag = false;
        viewModel.currowNum(0);
        var Row = viewModel.purchaseinList.getCurrentRow();
        var status = Row.status;
        if(status != 'nrm'&&status != 'new'){
          flag = true;
        }
        if(flag){
          common.dialog.confirmDialog({
            msg1: '当前有修改，是否先保存后跳转？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
              viewModel.saveBill(index);
            },
            onCancel: function(){
              viewModel.pageModel.pageIndex(index);
              for(var i=0;i<pagedataArr.length;i++){
                if(i === index){
                  var nextRow = viewModel.purchaseinList.createEmptyRowF();
                  viewModel.index = index;
                  viewModel.rowId = nextRow.rowId;
                  viewModel.purchaseinList.setRowFocus(nextRow);
                  nextRow.setSimpleData(pagedataArr[i]);
                  viewModel.purchaseinItems.setSimpleData(pagedataArr[i].requiredInItemSet,{status:"new"});
                }
              }
            }
          });
        }else{
          viewModel.pageModel.pageIndex(index);
          var curRow = viewModel.purchaseinList.getCurrentRow();
          viewModel.purchaseinList.removeRow(curRow);
          for(var j=0;j<pagedataArr.length;j++){
            if(j === index){
              var nextRow = viewModel.purchaseinList.createEmptyRowF();
              // viewModel.index = index;
              viewModel.rowId = nextRow.rowId;
              viewModel.purchaseinList.setRowFocus(nextRow);
              nextRow.setSimpleData(pagedataArr[j]);
              viewModel.purchaseinItems.setSimpleData(pagedataArr[j].requiredInItemSet,{status:"new"});
              var itemrows = viewModel.purchaseinItems.getAllRows();
              itemrows.forEach(function (item) {
                var rowNum = viewModel.generaterowNum();
                item.setValue("rowNum", rowNum);
              })
            }
          }
        }
      },
      //清空参照搜索条件
      cleanSearchRefer: function () {
        viewModel.searchcomp2.clearSearch();
      },
      //页码改变时的回调函数
      pageChangeRefer: function (index) {
        viewModel.referPurchaseorderList.pageIndex(index);
        viewModel.searchRefer();
      },
      //页码改变时的回调函数
      sizeChangeRefer: function (size) {
        viewModel.referPurchaseorderList.pageSize(size);
        viewModel.searchRefer(true);
      },
      //页码改变时的回调函数
      pageChangeRefer2: function (index) {
        viewModel.referPurchaseorderitemList.pageIndex(index);
        viewModel.searchRefer();
      },
      //页码改变时的回调函数
      sizeChangeRefer2: function (size) {
        viewModel.referPurchaseorderitemList.pageSize(size);
        viewModel.searchRefer(true);
      },
      //进入修改单据页
      showEditBillPanel: function (index,rowId) {
        var row;
        if(index == -1){
          row = viewModel.purchaseinList.getFocusRow();
          index = 0
        }else {
          row = viewModel.purchaseinList.getRowByRowId(rowId);
        }
        viewModel.index = index;
        viewModel.rowId = row.rowId;

        var id = row.getValue("id");
        var saleOrgId = row.getValue("saleOrgId");
        var status = row.getValue("status");
        if(status == "02"){
          toastr.warning("已签字不可编辑！");
          return;
        }
        if(saleOrgId != null){
          $(".saleOrgCls").show();
          $(".supplierCls").hide();
        }
        else {
            $(".saleOrgCls").hide();
            $(".supplierCls").show();
        }
        // viewModel.purchaseList.originEditData = viewModel.purchaseList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.getCurrowNum();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      // 查询子表数据
      findByParentid: function (id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/findByParentid",
          type: 'get',
          async: false,
          data: {
            id: id
          },
          success: function (data) {
            viewModel.purchaseinItems.setSimpleData(data.requiredInItemSet);
          }
        })
      },
      detail: function () {
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          var curRow = viewModel.purchaseinList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      detail2bill: function () {
        // if (!viewModel.canInEdit()) {
        //   return;
        // }
        var billstatus = viewModel.purchaseinList.getValue("status");
        if(billstatus !== "01"){
          toastr.warning("单据状态为自由态才可进入编辑页面");
          return;
        }
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      //保存单据
      saveBill: function () {
        var validate = $(".ui-bill-panel")[0];
        var result = app.compsValidateMultiParam({
          element: validate,
          showMsg: true
        });
        if (!result.passed) {
          return;
        }
        var complexData = viewModel.purchaseinList.getCurrentRow().getSimpleData();
        complexData.billType = "PurchaseIn";
        complexData.tranTypeId = "PurchaseIn";
        // complexData.setSimpleData("lastInDate",stockInDate)
        var purchaseinItemsData = viewModel.purchaseinItems.getSimpleData();
        // stockInDate = purchaseinItemsData.getValue("stockInDate");
        complexData.requiredInItemSet = purchaseinItemsData;
        var _ajaxType = viewModel.purchaseinList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.purchaseinList.getFocusRow().setSimpleData(data);
            if(viewModel.index !== -1){
              viewModel.retListPanel();
              return;
            }
            var curIndex = viewModel.pageModel.pageIndex();
            viewModel.pageAdd().splice(curIndex, 1);
            viewModel.pageAdd(viewModel.pageAdd());
            viewModel.pageModel.totalPages(viewModel.pageAdd().length);
            if(curIndex === viewModel.pageAdd().length){
              viewModel.beforPageChangeFun(curIndex-1);
              if(viewModel.pageModel.totalPages()===0){
                viewModel.retListPanel();
                viewModel.search();
              }
            }else{
              viewModel.beforPageChangeFun(curIndex);
            }
          }
        })
        // viewModel.referpurchaseorderdialog.show();
      },
      //提交单据
      submitBill: function () {
        var validate = $(".ui-bill-panel")[0];
        var result = app.compsValidateMultiParam({
          element: validate,
          showMsg: true
        });
        if (!result.passed) {
          return;
        }
        var allRows = viewModel.purchaseinItems.getAllRows();
        var complexData = viewModel.purchaseinList.getCurrentRow().getSimpleData();
        var purchaseinItemsData = viewModel.purchaseinItems.getSimpleData();
        complexData.initializtioninItems = purchaseinItemsData;
        $._ajax({
          url: appCtx + viewModel.baseurl + '/batch-submit',
          type: "POST",
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            var curRow = viewModel.purchaseinList.getFocusRow();
            curRow.setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      cancelBill: function () {
        viewModel.search();
        viewModel.retListPanel();
        viewModel.referPurchaseorderSearchParam.removeAllRows();
        viewModel.removeAllreferRows();
      },
      removeAllreferRows:function () {
        viewModel.referPurchaseorderList.removeAllRows();
        viewModel.referPurchaseorderitemList.removeAllRows();
        viewModel.selectedreferList.removeAllRows();
        viewModel.selectedreferListItem.removeAllRows();
      },
      //作废
      cancel: function () {
        var selectedRows = viewModel.purchaseinList.getSelectedRows();
        var ids = selectedRows.map(function (row, index, arr) {
          return row.getValue("id");
        })
        if (selectedRows.length < 1) {
          //TODO: tips替换
          toastr.warning("请选择一条操作的行");
          return;
        }
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-cancel",
          data: {
            ids: ids.join(",")
          },
          success: function (res) {
            for (var i = 0; i < selectedRows.length; i++) {
              selectedRows[i].setValue("status", "03");
            }
          }
        })
      },
      //签字
      signbtn:function (obj) {
        var selectedRows = viewModel.purchaseinList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function (row) {
            var factInAmount = row.getValue("factInAmount");
            if(factInAmount>0){
              return row.getValue("id");
            }
          });
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-sign",
            data: {
              ids: ids.join(",")
            },
            success: function (data) {
              for (var i = 0; i < selectedRows.length; i++) {
                var factInAmount = selectedRows[i].getValue("factInAmount");
                if(factInAmount>0){
                  selectedRows[i].setValue("status", "02");
                  selectedRows[i].setValue("statusCode", "02");
                  selectedRows[i].setValue("signPerson", data.name);
                  selectedRows[i].setValue("signDate", data.time);
                  var obj =obj;
                }else{
                  toastr.warning("实际入库量大于0时，才能签字");
                }

              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }

      },
      //取消签字
      cancelsignbtn: function () {
        var selectedRows = viewModel.purchaseinList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function (row) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-cancel-sign",
            data: {
              ids: ids.join(",")
            },
            success: function (data) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("status", "01");
                selectedRows[i].setValue("statusCode", "01");
                selectedRows[i].setValue("signPerson", data.name);
                selectedRows[i].setValue("signDate", data.time);
              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
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
      //导入
      importHandle: function () {
        var urlInfo = viewModel.baseurl + '/excelDataImport';       //倒入地址参数
        var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus';      //请求进度地址参数
        var ele = $('#importFiel')[0];      //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function () {
        var searchParams = viewModel.searchcomp.getDataWithOpr();       //搜索查询参数
        var templateUrl = viewModel.baseurl + '/downloadExcelTemplate';       //导出模板地址参数
        var excelDataUrl = viewModel.baseurl + '/excelDataExport';      //导出数据地址参数
        var listData = viewModel.purchaseinList;      //需要导出表格的dataTable
        var ele = $('#exportFiel')[0];      //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);

      },
      getSum : function(array){
        var sum= 0;
        for (var i = 0; i < array.length; i++){
          sum += parseInt(array[i]);
        }
        return sum;
      },
      geStockOrgId: function (curStockOrgId) {
        $("#cardStockOrgId input").val(curStockOrgId);
        // var refer = $("#refContainercardStockOrgId").data("uui.refer");
        // refer.setValue(null);
        // refer.blurEventVal();
      },
      // 从行号池中拿到最新的行号
      generaterowNum: function () {
        var latestnum = viewModel.currowNum(),
          newnum = parseFloat(latestnum) + 10;
        viewModel.currowNum(newnum);
        return newnum;
      },
      getCurrowNum: function () {
        var data = viewModel.purchaseinItems.getSimpleData();
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
      // 返回列表页
      retListPanel: function () {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      // 从行号池中拿到最新的行号
      generateRownum: function () {
        var latestnum = viewModel.curRowNum(),
          newnum = latestnum + 10;
        viewModel.curRowNum(newnum);
        return newnum;
      },
      getCurRowNum: function () {
        var data = viewModel.purchaseOrderItems.getSimpleData();
        var maxRowNum = 0;
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].rowNum > maxRowNum) {
              maxRowNum = data[i].rowNum;
            }
          }
        }
        viewModel.curRowNum(maxRowNum);
      },
      getCurDate: function (row) {
        // 服务器时间获取
        $._ajax({
          type: "post",
          url: appCtx + '/stock/common/get-current-date',
          success: function (data) {
            var truetime = u.date.format(data, 'YYYY/MM/DD');
            truetime = new Date(truetime).getTime();
            if (row) {
              row.setValue("stockInDate", truetime);
            }
            viewModel.curDate(truetime);
          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)  新增参照
      searchRefer: function (reindex) {
        if (reindex) {
          viewModel.referPurchaseorderList.pageIndex(0);
        }
        viewModel.referPurchaseorderList.removeAllRows();
        var queryData = viewModel.searchcomp2.getDataWithOpr();
        var pageSize = viewModel.referPurchaseorderList.pageSize();
        var pageNumber = viewModel.referPurchaseorderList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        var customerInfo = JSON.parse(localStorage.getItem("_A_P_customer"));
        queryData.search_EQ_customer= customerInfo.id;
        queryData.search_IN_orderStatus = "03,04,05";
        $._ajax({
          type: "get",
          url: window.pathMap.b2b + '/b2b/req-order/page-req-stockin',
          dataType: "json",
          data: queryData,
          success: function (data) {
            for(var i=0,req = data.content;i<req.length;i++){
              req[i].receiver = req[i].reqOrderReceiveAddress?req[i].reqOrderReceiveAddress.receiver:null;
              req[i].receiverAddress = req[i].reqOrderReceiveAddress?req[i].reqOrderReceiveAddress.receiverAddress:null;
              req[i].receiverPhone = req[i].reqOrderReceiveAddress?req[i].reqOrderReceiveAddress.receiverPhone:null;
              req[i].supplierName = req[i].supplierName == null?req[i].saleOrgName:req[i].supplierName;
              //计算未收货数量
              var unrecsum = 0;
                req[i].reqOrderItems.forEach(function (item) {
                  var unrec = item.mainNum -item.stockInNum;
                  item.unrec=unrec;
                  unrecsum = unrecsum + unrec;
                })
                req[i].unrecsum = unrecsum;
            }
            viewModel.referPurchaseorderList.setSimpleData(req, { unSelect: true });
            viewModel.referPurchaseorderList.totalRow(data.totalElements);
            viewModel.referPurchaseorderList.totalPages(data.totalPages);
            viewModel.updateSelectedIndices();
            //重置listIndex
            viewModel.listIndex = null;
          }
        })
      },
      //新增 参照
      showAddRefer: function () {
        viewModel.searchcomp2.clearSearch();
        viewModel.referPurchaseorderSearchParam.removeAllRows();
        viewModel.removeAllreferRows();
        if (!viewModel.referpurchaseorderdialog) {
          viewModel.referpurchaseorderdialog = u.dialog({
            id: 'dialog_referpurchaseorder',
            content: "#dialog_referpurchaseorder",
            hasCloseMenu: true,
            width: "85%"
          });
          var closefunc = function(){
            viewModel.referPurchaseorderSearchParam.removeAllRows();
            viewModel.referPurchaseorderList.removeAllRows();
            viewModel.referPurchaseorderitemList.removeAllRows();
            viewModel.referpurchaseorderdialog.close();
          }
          var cancelButton = $("#dialog_referpurchaseorder .J-cancel");
          var closeButton = $("#dialog_referpurchaseorder .u-msg-close");
          cancelButton.off().on('click',closefunc);
          closeButton.off().on('click',closefunc);
        } else {
          viewModel.referpurchaseorderdialog.show();
        }
      },
      // // 点击采购展示订单商品
      // itemDetail:function (obj) {
      //   if (viewModel.listIndex == obj.rowIndex) {
      //     return true;
      //   } else {
      //     viewModel.listIndex = obj.rowIndex;
      //   };
      //   viewModel.referPurchaseorderList.setRowFocus(obj.rowIndex);
      //   var itemInfo = viewModel.referPurchaseorderList.getFocusRow().getSimpleData();
      //   viewModel.referPurchaseorderitemList.setSimpleData(itemInfo.reqOrderItems,{unSelect: true});
      //   var selectedItemRows =viewModel.selectedreferListItem.getAllRealRows();
      //   for(var i=0;i<selectedItemRows.length;i++){
      //     viewModel.referPurchaseorderitemList.setRowSelectbyRowId(selectedItemRows[i].rowId)
      //   }
      // },
      // 选择参照主表
      referSelectHandle:function(obj){
        viewModel.referPurchaseorderitemList.removeAllRows();
        viewModel.selectedreferListItem.removeAllRows();
        var listArr = [];
        var selectedRows = viewModel.referPurchaseorderList.getSelectedRows();
        if(selectedRows&&selectedRows.length>0){
          for(var i=0;i<selectedRows.length;i++){
            var listData = selectedRows[i].getSimpleData();
            if(listData.saleOrgId != null){
                listData.supplierName = listData.saleOrgName;
            }
            listArr.push(listData);
            viewModel.referPurchaseorderitemList.addSimpleData(listData.reqOrderItems);
            viewModel.referPurchaseorderitemList.setAllRowsSelect();
            var subIds = listData.reqOrderItems.map(function(item){
              return item.id;
            })
            selectedRows[i].setValue("selectitemIds",subIds);
          }
        }
        viewModel.selectedreferList.removeAllRows();
        viewModel.selectedreferList.addSimpleData(listArr);
        viewModel.selectedreferList.setAllRowsSelect();
      },
      referUnSelectHandle:function(obj){
        // viewModel.referUnSelectItemHandle(obj);
        var id = obj.rowObj.value.id;
        var itemId = obj.rowObj.value.reqOrderItems.getValue("id");
        var rows = viewModel.selectedreferList.getAllRows();
        var itemrows = viewModel.referPurchaseorderitemList.getAllRows();
        for(var j = rows.length-1;j>=0;j--){
          if(rows[j].getValue("id")===id){
            viewModel.selectedreferList.removeRows([j],{forceDel:true});
          }
        }
        for(var i = itemrows.length-1;i>=0;i--){
          if(itemrows[i].getValue("reqOrderId") === id){
            viewModel.referPurchaseorderitemList.removeRows([i],{forceDel:true});
          }
        }
      },
      //选择采购订单商品信息
      referSelectItemHandle:function (obj) {
        var id = obj.rowObj.value.id;
        var selectedRows = viewModel.referPurchaseorderitemList.getSelectedRows();
        var selectedreferListItem = viewModel.selectedreferListItem.getSimpleData();
        for(var i=0;i<selectedRows.length;i++){
          var itemInfo = selectedRows[i].getSimpleData()
          if(selectedRows[i].getValue("id") === id){
            viewModel.selectedreferListItem.addSimpleData(itemInfo);
          }
        }
      },
      referUnSelectItemHandle:function (obj) {
        function removeByValue(arr, val) {
          for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
              arr.splice(i, 1);
              break;
            }
          }
        }
        var itemId = obj.rowObj.value.id;
        var parentRowId =obj.rowObj.value.reqOrderId;
        var parentRow = viewModel.referPurchaseorderList.getRowByField("id",parentRowId);
        var selectitemArr = parentRow.getValue("selectitemIds")
        if(selectitemArr.length>0){
          for(var i=0;i<selectitemArr.length;i++){
            if($.inArray(itemId, selectitemArr)>-1){
              removeByValue(selectitemArr,itemId)
              parentRow.setValue("selectitemIds",selectitemArr);
              if(selectitemArr.length == 0){
                var curRowId = parentRow.rowId;
                var index = viewModel.referPurchaseorderList.getIndexByRowId(curRowId);
                viewModel.referPurchaseorderList.setRowsUnSelect(index);
              }
            }
          }
        }

        var itemrows = viewModel.selectedreferListItem.getAllRows();
        for(var i = itemrows.length-1;i>=0;i--){
          if(itemrows[i].getValue("id") === itemId){
            viewModel.selectedreferListItem.removeRows([i],{forceDel:true});
          }
        }
      },

      updateSelectedIndices:function(){
        var selectedRows = viewModel.selectedreferList.getAllRows(),
            // selectedItemRows = viewModel.selectedreferListItem.getAllRows(),
            selectedIds,
            selectedIndices = [],
            rows;
        if(selectedRows&&selectedRows.length>0){
          selectedIds = selectedRows.map(function(row){
            return row.getValue("id");
          })
          rows = viewModel.referPurchaseorderList.getAllRows();
          if(rows&&rows.length>0){
            for(var i=0;i<rows.length;i++){
              var id = rows[i].getValue("id");
              if($.inArray(id,selectedIds)>-1){
                selectedIndices.push(i);
              }
            }
          }
          if(selectedIndices.length>0){
            viewModel.referPurchaseorderList.setRowsSelect(selectedIndices);
          }
        }else{
          return
        }
      },
      insertSelectedProduct:function(){
        var selectedData = viewModel.selectedreferList.getSimpleData();
        if(selectedData&&selectedData.length>0){
          var trueData = selectedData.map(function(row){
            return {
              productId: row.id,
              productCode: row.code,
              productDesc: row.description,
              productModelName:row.productModelName,
              productCategoryName:row.productCategoryName,
              productRadSeriesId:row.radSeriesId,
              productRadSeriesName:row.radSeriesName,
              billedQuantity:row.reqQuantity,
              volume:row.totalVolume,
              weight:row.totalWeight,
              //冗余单位方量和单位重量，方便表体行重新计算合计
              cubage:row.cubage,
              roughWeight:row.roughWeight,
              isFree:0,
              isDirect:0
            };
          })
          viewModel.referPurchaseorderList.addSimpleData(trueData,"new", {unSelect:true});
        }
      },

      queryChildArr : function (parentArr) {
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/translate-required-in",
          async: false,
          data:  JSON.stringify(parentArr),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            var curRow = viewModel.purchaseinList.createEmptyRowF();
            viewModel.purchaseinList.setRowFocus(curRow);
            viewModel.purchaseinList.setSimpleData(data[0]);
            viewModel.purchaseinItems.setSimpleData(data[0].requiredInItemSet,{status:"new"});
            var itemrows = viewModel.purchaseinItems.getAllRows();
            for(var i=0;i<itemrows.length;i++){
              var rowNum = viewModel.generaterowNum();
              itemrows[i].setValue("rowNum", rowNum);
              itemrows[i].setValue("persistStatus", "new");
            }
            // viewModel.purchaseinList.totalRow(data.totalElements);
            // viewModel.purchaseinList.totalPages(data.totalPages);
            viewModel.pageAdd(data);
            viewModel.pageModel.totalPages(data.length);
          }
        })

      },
      //确定 新增
      confirmReferpurchaseorder: function () {
        var parentArr = viewModel.referPurchaseorderList.getSimpleData({type: 'select'});
        var itemArr = viewModel.referPurchaseorderitemList.getSimpleData({type: 'select'});
        var operate = viewModel.operateArea.getSimpleData()[0];
        if(!itemArr.length){
          toastr.warning("请至少选择一条商品");
          return;
        };
        for(var i=0;i<parentArr.length;i++){
          if(parentArr[i].saleOrgId != null){
              parentArr[i].supplierName = null;
          }
          parentArr[i].reqOrderItems = [];
          for(var j =0;j<itemArr.length;j++){
            if(itemArr[j].reqOrderId === parentArr[i].id){
              parentArr[i].reqOrderItems.push(itemArr[j]);
            }
          }
        }
        //是否选择一键入库
        if(operate.oneStepPurchasein ===1){
          var stockId = operate.stockInStorageId;
          if(stockId){
            viewModel.oneStepPurchasein(stockId,parentArr)
          }else {
            toastr.warning("一键入库时，请选择仓库");
            return;
          }
        }else {
          viewModel.queryChildArr(parentArr);
          viewModel.index = -1;
          viewModel.pageModel.pageIndex(0);
          viewModel.goBillPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
          viewModel.referpurchaseorderdialog.close();
          viewModel.removeAllreferRows();
        }
      },
      // 一键入库
      oneStepPurchasein:function (stockId,parentArr) {
        $._ajax({
          type: "post",
          data:
            JSON.stringify(parentArr),
          url: appCtx + viewModel.baseurl + "/all-translate-required-in/"+stockId,
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.retListPanel();
            viewModel.search();
            viewModel.referpurchaseorderdialog.close();
          }
        })
      },
      // 自动取数
      autoNumber: function () {
        var selectedRows = viewModel.purchaseinItems.getSelectedRows();
        if(selectedRows.length>0){
          for(var i=0;i<selectedRows.length;i++){
            var shouldInAmount = selectedRows[i].getvalue("shouldInAmount");
            selectedRows[i].setValue("factInAmount",shouldInAmount);
          }
        }else {
          toastr.warning("请至少选择一项");
        }
      }
    },
    afterCreate: function () {
    var userId = u.getCookie("_A_P_userId");
    viewModel.findCondition(userId,"/find-sale-organization",viewModel.saleOrgCallBack)
    viewModel.findCondition(userId,"/find-superior-customer",viewModel.customerCallBack);

      // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      //枚举
      $._ajax({
        type: "get",
        url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
        data: {
          cust_doc_code_batch: "QY102"
        },
        success: function (data) {
          var combodata = common.dataconvert.toMap(data["QY102"],"name","code");
          viewModel.arrivalBelongDataSource(combodata);
        }
      });
      viewModel.searchcomp.viewModel.params.on("saleOrg.valuechange",function (obj) {
          if(obj.newValue != undefined &&obj.newValue != null && obj.newValue != ""){
              viewModel.searchcomp.viewModel.params.setValue("supplier",null)
          }
      });
        viewModel.searchcomp.viewModel.params.on("supplier.valuechange",function (obj) {
            if(obj.newValue != undefined &&obj.newValue != null && obj.newValue != ""){
                viewModel.searchcomp.viewModel.params.setValue("saleOrg",null)
            }
        });
        viewModel.searchcomp2.viewModel.params.on("saleOrg.valuechange",function (obj) {
            if(obj.newValue != undefined &&obj.newValue != null && obj.newValue != ""){
                viewModel.searchcomp2.viewModel.params.setValue("supplier",null)
            }
        });
        viewModel.searchcomp2.viewModel.params.on("supplier.valuechange",function (obj) {
            if(obj.newValue != undefined &&obj.newValue != null && obj.newValue != ""){
                viewModel.searchcomp2.viewModel.params.setValue("saleOrg",null)
            }
        });

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
            var row = viewModel.purchaseinItems.getRowByField("productId", id);
            if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
              var newrow = viewModel.purchaseinItems.createEmptyRow();
              newrow.setValue("rowNum", viewModel.generateRownum());
              newrow.setValue("goodsId", refValues[i].refpk);
              newrow.setValue("goodsCode", refValues[i].refcode);
              newrow.setValue("goodsName", refValues[i].refname);

            }
          }
        }
      });

      //总实入数量
      viewModel.purchaseinItems.on("factInAmount.valuechange", function(obj) {
        var curList = viewModel.purchaseinList.getCurrentRow();
        var arr = viewModel.purchaseinItems.getSimpleData();
        var amount = [];
        var statusArr = [];
        var isTrue = true;
        for(var i=0;i<arr.length;i++){
          if(!arr[i].factInAmount){
            arr[i].factInAmount = 0
          }
          var amountItem = parseFloat(arr[i].factInAmount);
          amount.push(amountItem);
          // 表体入库状态判断
          // 实入>=应入 --> "3" 全部入库
          // 实入< 应入  --> "2" 部分入库
          // 实入 == 0 --> "1" 未入库
          var factIn = arr[i].factInAmount,
              shouldIn = arr[i].shouldInAmount,
              value;
          if(factIn>=shouldIn){
            statusArr.push(3)
          }else if(arr[i].factInAmount<arr[i].shouldInAmount){
            statusArr.push(2)
          }else if(arr[i].factInAmount===0){
            statusArr.push(1)
          }
        }
        if(statusArr.indexOf(2)!==-1){
          if(viewModel.getSum(amount) === 0){
            curList.setValue("stockInStatus","1");
          }else {
            curList.setValue("stockInStatus","2");
          }
        }else {
            curList.setValue("stockInStatus","3");
        }
        curList.setValue("factInAmount",viewModel.getSum(amount));
      });
      //赠品价格清零
      viewModel.purchaseinItems.on("isGift.valuechange",function (obj) {
        var isGift = viewModel.purchaseinItems.getValue("isGift");
        if(isGift=="1"){
          viewModel.purchaseinItems.setValue("unitPrice",0);
        }
      });

      //库存组织参照传参库存参照
      viewModel.purchaseinList.on("stockOrgId.valuechange", function(obj) {
        var row = viewModel.purchaseinList.getCurrentRow();
        var stockOrgId = row.getValue("stockOrgId");
        $("#stockInStorageId").parent().attr("data-refparam", '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}');
        if(stockOrgId){
          viewModel.purchaseinList.setMeta("stockInStorageId","enable",true);
          $("#stockInStorageId").removeAttr('placeholder');
        }else {
          row.setValue("stockInStorageId","");
          viewModel.purchaseinList.setMeta("stockInStorageId","enable",false);
          $("#stockInStorageId").attr('placeholder',"请先选择库存组织");
        }
      });
      // 仓库参照传参货位参照
      viewModel.purchaseinList.on("stockInStorageId.valuechange",function (obj) {
        var row = viewModel.purchaseinList.getCurrentRow();
        var stockOrgId = row.getValue("stockOrgId");
        // if(stockOrgId){
        //   var refer = $("#refContainercardStockOrgId").data("uui.refer");
        //   refer.setValue(null);
        //   refer.blurEventVal();
        // };
        var stockInStorageId = row.getValue("stockInStorageId");
        viewModel.purchaseinItems.setMeta("goodsPositionId", "refparam", '{"EQ_wareHouse":"'+stockInStorageId+'","EQ_isFinal":"1"}');
      });
      // 参照内 一键入库 选择后显示仓库参照
      viewModel.operateArea.createEmptyRow();
      viewModel.operateArea.on("oneStepPurchasein.valuechange",function (obj) {
        var isChecked = viewModel.operateArea.getValue("oneStepPurchasein");
        if(isChecked === 1){
          $("#warehouse").show();
        }else {
          $("#warehouse").hide();
        }
      });




      // var ref_grid = viewModel.app.getComp("grid_referList").grid;
      // var ref_grid_sel = viewModel.app.getComp("grid_referList_Sel").grid;

      // var saleOrgNameCol = ref_grid.getColumnByField("saleOrgName");
      // var customerNameCol = ref_grid.getColumnByField("customerName");
      // var saleOrgNameCol_sel = ref_grid_sel.getColumnByField("saleOrgName");
      // var customerNameCol_sel = ref_grid_sel.getColumnByField("customerName");

      /*if(viewModel.customerRank() === "direct"){
        $("#orgId").parent().show();
        $("#supplierIdSearch1").parent().hide();
        // saleOrgNameCol.options.visible = true;
        // customerNameCol.options.visible = false;
        // saleOrgNameCol_sel.options.visible = true;
        // customerNameCol_sel.options.visible = false;
      }else {
        $("#orgId").parent().hide();
        $("#supplierIdSearch1").parent().show();
        // saleOrgNameCol.options.visible = false;
        // customerNameCol.options.visible = true;
        // saleOrgNameCol_sel.options.visible = false
        // customerNameCol_sel.options.visible = true;
      }*/
    }
  });

  return view;
});