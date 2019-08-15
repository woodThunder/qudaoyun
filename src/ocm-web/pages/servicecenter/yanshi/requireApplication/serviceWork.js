define(['text!./serviceWork.html', 'ocm_common', 'searchbox', 'editcard', 'ocm_repairtrack','text!./data.json',
 './meta.js', 'ocm_global'], function (tpl, common, searchbox, editcard, repairTrack,jsonData) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch, sendOrderDialog, dispatchingPopup;
  baseData = {
    baseurl: '/sc/repair-bills',
    mainListData: new u.DataTable(mainListMeta),
    dispatchingData: new u.DataTable(dispatchingMeta),
    processList: new u.DataTable(processMeta),
    partsList: new u.DataTable(partsMeta),    
    returnPartsList: new u.DataTable(returnPartsMeta),
    cleanMoneList: new u.DataTable(cleanMoneyMeta),
    
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,

    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    billStatusSrc: [],
    //保修类型枚举
    warrantyTypeEnum: [],
    // 请求来源枚举
    enumerateSrc: [
      {name:'未预约',value:'0'},
      {name:'已预约',value:'1'}
    ],
    billSourceEnum:[],
    // 请求类型
    ApplicationTypeEnum:[],
    // 结算状态枚举
    PayStatusEnum:[], 
    // 优先级枚举
    priorityLevelEnum:[] 
  };
  rendertype = {
    precision2Render: common.rendertype.precision2Render,
    //跳转详情页
    detailRender: function (obj) {
      var viewModel = obj.gridObj.viewModel;
      var dataTableRowId = obj.row.value['$_#_@_id'];
      var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
      obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    operation: function (obj) {
      var dataRowId = obj.row.value['$_#_@_id'];
      // 判断单据状态
      var billStatus = obj.row.value['billStatus'];
      var sendOrderHide = '';
      var dispatchingHide = '';
      if (billStatus != "0") {
        sendOrderHide = ' hide';
      }
      if (billStatus != "1") {
        dispatchingHide = ' hide';
      }
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataRowId + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataRowId + ")";
      var sendOrderFun = "data-bind=click:sendOrderFun.bind($data," + obj.rowIndex + "," + dataRowId + ")";
      var dispatchingFun = "data-bind=click:dispatchingFun.bind($data," + obj.rowIndex + "," + dataRowId + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle-word">' +
        '<a href="#" class="u-grid-content-focus-row" ' +
        editfun +
        ' title="编辑">编辑</a></span>' +
        '<span class="ui-handle-word">' +
        '<a href="#"  class="u-grid-content-focus-row"  ' +
        delfun +
        ' title="删除">删除</a></span>' +
        '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
  };
  events = {
    
    //查看详情
    detail: function (index, rowId) {
      viewModel.mainListData.setRowSelectbyRowId(rowId);
      var id = viewModel.mainListData.getCurrentRow().getValue("id");
      //请求完整主子表信息
      //  viewModel.fillOrderDetailData(id);
       viewModel.goDetailPanel();
       // 跟踪记录
       // 模拟数据
       var   processData = viewModel.mainListData.getSimpleData()[0].processes;
       repairTrack.init.run("repairTrackContent", processData);
       // 
       var   partsList = viewModel.mainListData.getSimpleData()[0].parts;
       viewModel.partsList.setSimpleData(partsList);
    
    
      },
    // 任务完成
    complete: function () {
      if (typeof (index) == 'number') {
        viewModel.mainListData.setRowSelect(index);
      }
      var ids = [];
      var rows = viewModel.mainListData.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          var billStatus = rows[i].getValue("billStatus");
          if (billStatus != "1") {
            toastr.warning('该状态工单不能任务完成，请重新选择!');
            return;
          }
          ids.push(rows[i].getValue("id"));
        }
        common.dialog.confirmDialog({
          msg1: '您确定任务完成？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/complete",
              type: "get",
              data: {
                ids: ids.join(",")
              },
              success: function (data) {
                for (var i = 0; i < rows.length; i++) {
                  rows[i].setValue("billStatus", "3");
                }
              }
            });
          }
        });
      } else {
        toastr.warning("请先选择一行数据");
      }
    },
    //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
    beforeEdit: function (index) {
      var title;
      viewModel.index = index;
      // var pageTitle = $(".ui-bill-panel.ui-panel .page-title span").text();
      if (index >= 0) {
        //修改操作
        title = "编辑";
        viewModel.mainListData.setRowFocus(index);
        var id = viewModel.mainListData.getCurrentRow().getValue("id");
        //请求完整主子表信息
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
      } else {
        title = "新增";
        var row = viewModel.mainListData.createEmptyRow();
        viewModel.mainListData.setRowFocus(row);
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
      }
    },
    //删除和批量删除
    del: function (data) {
      if (typeof (data) == 'number') {
        viewModel.mainListData.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.mainListData.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
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
                viewModel.mainListData.removeRows(rows);
              }
            });

          }
        });
      } else {
        toastr.warning("请先选择需要删除数据");
      }
    },
    // 查看客户资产
    customerEquityFun:function(){
        // 点击partsRefer事件
        $("#customerEquityRef .refer").trigger("click");
        // var refer = $("#customerEquityRef").data("uui.refer");
        // refer.uncheckAll();
        // refer.setValue([]);
        
    },
    // 派单派单
    sendOrderFun: function (index, rowId) {
      viewModel.mainListData.setRowSelectbyRowId(rowId);
      var currentRow = viewModel.mainListData.getFocusRow().getSimpleData();
      sendOrderDialog = u.dialog({
        id: 'sendOrderBox',
        content: "#sendOrder-popup",
        "width": "800px"
      });
      // 保存按钮
      var okButton = $("#sendOrder-popup .u-msg-ok");
      okButton.unbind("click").click(function () {
        viewModel.saveBill();
        sendOrderDialog.close();
      });
      // 取消按钮
      var cancelButton = $("#sendOrder-popup .u-msg-cancel");
      cancelButton.unbind("click").click(function () {
        sendOrderDialog.close();
      });
    },
    // 派工
    dispatchingFun: function (index, rowId) {
      viewModel.mainListData.setRowSelectbyRowId(rowId);
      var currentRow = viewModel.mainListData.getFocusRow().getSimpleData();
      viewModel.dispatchingData.removeAllRows();
      // console.log(currentRow);
      dispatchingPopup = u.dialog({
        id: 'dispatchingBox',
        content: "#dispatching-popup",
        "width": "1020px"
      });
      // 保存按钮
      var okButton = $("#dispatching-popup .u-msg-ok");
      okButton.unbind("click").click(function () {
        var currentRow = viewModel.mainListData.getCurrentRow().getSimpleData();
        var childRows = viewModel.dispatchingData.getSimpleData();
        var myData = {
          servicePersonId: currentRow.servicePersonId,
          repAppId: currentRow.id,
          repairDate: currentRow.repairDate,
          requireDate: currentRow.requireDate,
          goodsId: currentRow.goodsId,
          faultId: currentRow.faultId,
          resolvent: currentRow.resolvent,
          remark: currentRow.remark,
          repAppCreator: currentRow.creator,
          servicePersonName: currentRow.servicePersonName,
          parts: childRows, // parts 备件子表
          processes: [] // processes 流程子表
        }
        $._ajax({
          url: appCtx + "/sc/repair-bills",
          type: "post",
          data: JSON.stringify(myData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {          
            // viewModel.retListPanel();
            dispatchingPopup.close();
            viewModel.search();
          }
        });

      });
      // 取消按钮
      var cancelButton = $("#dispatching-popup .u-msg-cancel");
      cancelButton.unbind("click").click(function () {
        dispatchingPopup.close();
      });
    },
    // 关闭
    closeFun: function () {
      // if (typeof (data) == 'number') {
      //   viewModel.mainListData.setRowSelect(data);
      // }
      var ids = [];
      var rows = viewModel.mainListData.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        common.dialog.confirmDialog({
          msg1: '确认关闭这些项？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            // $._ajax({
            //   url: appCtx + viewModel.baseurl + "/a",
            //   type: "post",
            //   data: {
            //     ids: ids.join(",")
            //   },
            //   success: function (data) {
            //     viewModel.mainListData.removeRows(rows);
            //   }
            // });
          }
        });
      } else {
        toastr.warning("请先选择需要关闭数据");
      }
    },
    //保存单据
    saveBill: function () {
      var type = "post";
      if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
        type = "put";
      }
      var promoFormData = viewModel.mainListData.getCurrentRow().getSimpleData();

      var validate = $("#validate")[0];
      var result = app.compsValidateMultiParam({
        element: validate,
        showMsg: true
      });

      if (result.passed) {
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(promoFormData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.search();
            viewModel.retListPanel();
          }
        });
      }
    },
    //点击取消 单据页
    cancelBill: function () {
      // var curListRow = viewModel.mainListData.getFocusRow();
      if (viewModel.index < 0) {
        var curListRow = viewModel.mainListData.getCurrentRow();
        viewModel.mainListData.removeRow(curListRow);
      }
      viewModel.retListPanel();
    },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if (reindex) {
        viewModel.mainListData.pageIndex(0);
      }
      viewModel.mainListData.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      queryData.size = viewModel.mainListData.pageSize();
      queryData.page = viewModel.mainListData.pageIndex();
      // 模拟数据
      // var mainData = JSON.parse(jsonData);
      // viewModel.mainListData.setSimpleData(mainData.content, {
      //   unSelect: true
      // });
      // viewModel.mainListData.totalRow(mainData.totalElements);
      // viewModel.mainListData.totalPages(mainData.totalPages);
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function (data) {
          viewModel.mainListData.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.mainListData.totalRow(data.totalElements);
          viewModel.mainListData.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      singledocSearch.clearSearch();
    },

    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.mainListData.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.mainListData.pageSize(size);
      viewModel.search(true);
    }
  }
  viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

  function appInit(element, params) {
     //将模板页渲染到页面上
     element.innerHTML = tpl;
     // 单据状态-枚举
     $._ajax({
       type: "get",
       url: appCtx + "/sc/enum-service/data",
       async: false,
       data: {
         enumClassName: "com.yonyou.occ.sc.enums.BillStatusEnum"
       },
       success: function (data) {
         var newarray = common.dataconvert.toMap(data, "name", "code");
         viewModel.billStatusSrc = newarray;
       }
     });
     //保修类型  枚举
     $._ajax({
       type: "get",
       url: appCtx + "/sc/enum-service/data",
       async: false,
       data: {
         enumClassName: "com.yonyou.occ.sc.enums.WarrantyTypeEnum"
       },
       success: function (data) {
         var newarray = common.dataconvert.toMap(data, "name", "code");
         viewModel.warrantyTypeEnum = newarray;
       }
     });
     // 请求来源 枚举
     $._ajax({
      type: "get",
      url: appCtx + "/sc/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.occ.sc.enums.BillSourceEnum"
      },
      success: function (data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.billSourceEnum = newarray;
      }
    });
    // 请求类型 枚举
    $._ajax({
      type: "get",
      url: appCtx + "/sc/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.occ.sc.enums.ApplicationTypeEnum"
      },
      success: function (data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.ApplicationTypeEnum = newarray;
      }
    });
     // 结算状态 枚举
     $._ajax({
      type: "get",
      url: appCtx + "/sc/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.occ.sc.enums.PayStatusEnum"
      },
      success: function (data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.PayStatusEnum = newarray;
      }
    });
      // 优先级 枚举
      $._ajax({
        type: "get",
        url: appCtx + "/sc/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.occ.sc.enums.PriorityLevelEnum"
        },
        success: function (data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.priorityLevelEnum = newarray;
        }
      });
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });

    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#PromoActivity-searchcontent")[0], [{
          type: "text",
          key: "code",
          label: "工单号"
        },
        {
          type: "text",
          key: "customerName",
          label: "客户"
        },
        {
          type: "text",
          key: "phone",
          label: "联系电话"
        },
        {
          type: "daterange",
          key: "acceptDate",
          label: "受理日期"
        },
        {
          type: "combo",
          key: "reqType",
          label: "请求类型",
          dataSource: []
        },
        {
          type: "combo",
          key: "billStatus",
          label: "单据状态",
          dataSource: viewModel.billStatusSrc
        },
        {
          type: "refer",
          key: "servicePerson--id",
          label: "维修人员",
          refinfo: "sc-per-ref",
          refName: "维修人员",
        },
        {
          type: "combo",
          key: "isOrder",
          label: "预约状态",
          dataSource: []
          
        }
      ]);
    // 列表查询数据(无查询条件)

    viewModel.search();

  }

  function afterRender() {
   

    // 初始化折叠面板
    $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#CustDocDef-searchcontent input').off("keydown").on("keydown", function (e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 添加备件
    viewModel.partsRefData.on("partsRefer.valuechange", function (obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerpartsRefer").data("uui.refer").values;
      var selecRows = [];
      if (refValues && refValues.length > 0) {
        var newRows = [];
        for (var i = 0; i < refValues.length; i++) {
          var newRow = undefined;
          newRow = new u.Row({
            parent: viewModel.dispatchingData
          });
          //判断是否存在row
          var row = viewModel.dispatchingData.getRowByField("id", refValues[i].id);
          if (!row) {
            newRows.push(newRow);
            selecRows.push(newRow);
          }
          newRow.setValue("id", refValues[i].id);
          newRow.setValue("partsId", refValues[i].partsId);
          newRow.setValue("partsName", refValues[i].refname);
          newRow.setValue("partsCode", refValues[i].refcode);
          newRow.setValue("goodsId", refValues[i].goodsId);
          newRow.setValue("goodsName", refValues[i].goodsName);
          newRow.setValue("goodsCode", refValues[i].goodsCode);
          newRow.setValue("unit", refValues[i].unit);
        }
        viewModel.dispatchingData.insertRows(0, newRows);
      }
    });
     // 客户变化
     viewModel.mainListData.on("customerId.valuechange", function (obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerpartsRefer").data("uui.refer").values;
      var selecRows = [];
      if (refValues && refValues.length > 0) {
        var newRows = [];
        for (var i = 0; i < refValues.length; i++) {
          var newRow = undefined;
          newRow = new u.Row({
            parent: viewModel.dispatchingData
          });
          //判断是否存在row
          var row = viewModel.dispatchingData.getRowByField("id", refValues[i].id);
          if (!row) {
            newRows.push(newRow);
            selecRows.push(newRow);
          }
          newRow.setValue("id", refValues[i].id);
          newRow.setValue("partsId", refValues[i].partsId);
          newRow.setValue("partsName", refValues[i].refname);
          newRow.setValue("partsCode", refValues[i].refcode);
          newRow.setValue("goodsId", refValues[i].goodsId);
          newRow.setValue("goodsName", refValues[i].goodsName);
          newRow.setValue("goodsCode", refValues[i].goodsCode);
          newRow.setValue("unit", refValues[i].unit);
        }
        viewModel.dispatchingData.insertRows(0, newRows);
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