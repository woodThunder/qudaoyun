define(['text!./yhdorder.html', 'ocm_common', 'searchbox', 'editcard', 'billfooter', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard, billfooter) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch, singledoceidt, footer;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  //基础数据
  baseData = {
    baseurl: '/b2c/dc-yhdorders',
    OrderList: new u.DataTable(Order),
    OrderListChilds: new u.DataTable(OrderChild),

    OrderChildGoodss: new u.DataTable(Goodss),
    OrderChildInvoices: new u.DataTable(invoices),

    BussTypeItems: new u.DataTable(BussType),
    BussTypeRef: new u.DataTable(BussTypeRef),
    AgencyItems: new u.DataTable(Agency),
    AgencyRef: new u.DataTable(AgencyRef),
    billPanelStatus: BILLPANELSTATUS.DEFAULT,
    enableCheckSrc: [{
      value: "1",
      name: "是"
    }],
    isexceptionCombo: [{
      value: "0",
      name: "Y"
    }, {
      value: "1",
      name: "N"
    }],
    issyncCombo: [{
      value: "0",
      name: "Y"
    }, {
      value: "1",
      name: "N"
    }],
    //TODO: 审核枚举值
    approveDataSrc: [{
      value: "1",
      name: "已审核"
    }, {
      value: "2",
      name: "未审核"
    }, {
      value: "3",
      name: "全部"
    }],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    approveFmt: ko.pureComputed(function() {
      var value = viewModel.OrderList.ref("approveStatus")();
      var name = "";
      switch (value) {
        case 1:
          name = "已审核";
          break;
        case 2:
          name = "未审核";
          break;
        default:
          break;
      }
      return name;
    }),
  };
  //渲染类型
  rendertype = {
    operation: function(obj) {
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle ui-tab-icon-b">' +
        '<a href="#" class="uifont icon-edit font-c-c" ' +
        editfun +
        ' title="编辑"></a>' +
        '</span>    ' +
        '<span class="ui-handle ui-tab-icon-b">' +
        '<a href="#" class="uifont icon-shanchu1 font-c-c" ' +
        delfun +
        ' title="删除"></a>' +
        '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    enableStatusRender: function(obj) {
      var showValue; // = obj.value == "1" ? "启用" : "停用";
      switch (obj.value) {
        case "1":
          showValue = "启用";
          break;
        case "2":
          showValue = "停用";
          break;
        default:
          showValue = "未启用";
      }
      obj.element.innerHTML = showValue;
    },
    detailRender: function(obj) { //link子页面
      var detailfun = "data-bind=click:detail.bind($data)";
      obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    approveRender: function(obj) {
      var showValue = "";
      switch (obj.value) {
        case "1":
          showValue = "已审核";
          break;
        case "2":
          showValue = "未审核";
          break;
        default:
          break;
      }
      obj.element.innerHTML = showValue;
    }
  };
  //事件
  events = {
    //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
    beforeEdit: function(index) {
      var title;
      viewModel.index = index;
      if (index >= 0) {
        //修改操作
        title = "编辑";
        var currentData = viewModel.OrderChildConsignees.getSimpleData()[index];
        singledoceidt.seteidtData(currentData);
      } else {
        title = "新增"
        //清空编辑框的信息
        singledoceidt.cleareidt();
      }
      //显示模态框
      singledoceidt.show(title, "900px", viewModel.edit);
    },
    //删除和批量删除
    del: function(data) {
      if (typeof(data) == 'number') {
        viewModel.OrderList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.OrderList.getSelectedRows();
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
              viewModel.OrderList.removeRows(rows);
            }
          });

        }
      });
    },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function(reindex) {
      if (reindex) {
        viewModel.OrderList.pageIndex(0);
      }
      viewModel.OrderList.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      var pageSize = viewModel.OrderList.pageSize();
      var pageNumber = viewModel.OrderList.pageIndex();
      queryData.size = pageSize;
      queryData.page = pageNumber;
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function(data) {
          viewModel.OrderList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.OrderList.totalRow(data.totalElements);
          viewModel.OrderList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function() {
      singledocSearch.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function(index) {
      viewModel.OrderList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function(size) {
      viewModel.OrderList.pageSize(size);
      viewModel.search(true);
    },
    //进入新增单据页
    showAddBillPanel: function() {
      var curRow = viewModel.OrderList.createEmptyRow();
      viewModel.OrderList.setRowFocus(curRow);
      viewModel.AgencyItems.removeAllRows();
      viewModel.BussTypeItems.removeAllRows();
      curRow.setValue("enableStatus", "1");
      curRow.setValue("approveStatus", "2");
      viewModel.goBillPanel();
      viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
    },
    //进入修改单据页
    showEditBillPanel: function(index) {
      viewModel.OrderList.setRowFocus(index);
      var id = viewModel.OrderList.getValue("id");
      viewModel.OrderList.originEditData = viewModel.OrderList.getFocusRow().getSimpleData();
      //请求完整主子表信息
      viewModel.fillData(id);
      viewModel.goBillPanel();
      viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
    },
    //进入复制单据页
    showCopyBillPanel: function() {
      var selectedRows = viewModel.OrderList.getSelectedRows();
      var focusRow = viewModel.OrderList.getFocusRow();
      // 只支持单一复制，批量复制需单独处理
      if (selectedRows.length != 1) {
        //TODO: tips替换
        alert("请选择一条要复制的行")
        return;
      }
      var copyRow = selectedRows[0];
      var curRow = viewModel.OrderList.createEmptyRow();
      curRow.setSimpleData(copyRow.getSimpleData());
      viewModel.OrderList.setRowFocus(curRow);
      var id = copyRow.getValue("id");
      //删除主表主键，编码，审计信息
      viewModel.clearBaseProp(curRow);
      viewModel.goBillPanel();
      viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
    },
    detail: function() {
      //确保grid先将行设置为focus状态
      setTimeout(function() {
        var curRow = viewModel.OrderList.getCurrentRow();
        var id = curRow.getValue("id");
        //请求完整主子表信息
        viewModel.fillData(id);
        viewModel.goDetailPanel();
      }, 0);
    },
    // （编辑/详情）填充完整主子表数据
    fillData: function(id) {
      $._ajax({
        type: "post",
        url: appCtx + viewModel.baseurl + "/detail",
        data: {
          id: id
        },
        async: false,
        success: function(data) {
          var promoactivity = data;

          var Goodss = data.yhdOrderGoods;
          var invoices = data.yhdOrderInvoice;

          // var bussTypes = data.bussTypes;
          // var officeItems = data.officeItems;

          //  var row = viewModel.OrderList.getCurrentRow();
          //  row.setSimpleData(promoactivity);

          //当前data
          viewModel.OrderListChilds.removeAllRows();
          viewModel.OrderListChilds.setSimpleData(promoactivity, {
            unSelect: true
          });

          //商品
          viewModel.OrderChildGoodss.removeAllRows();
          viewModel.OrderChildGoodss.setSimpleData(Goodss, {
            unSelect: true
          });

          //发票
          viewModel.OrderChildInvoices.removeAllRows();
          viewModel.OrderChildInvoices.setSimpleData(invoices, {
            unSelect: true
          });
          // viewModel.BussTypeItems.removeAllRows();
          // viewModel.BussTypeItems.setSimpleData(bussTypes,{unSelect:true});

          // viewModel.AgencyItems.removeAllRows();
          // viewModel.AgencyItems.setSimpleData(officeItems,{unSelect:true});


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
    //保存单据
    saveBill: function() {
      var myData = viewModel.OrderList.getCurrentRow().getSimpleData();
      var Goodss = viewModel.OrderChildGoodss.getSimpleData();
      var Invoices = viewModel.OrderChildInvoices.getSimpleData();
      myData.yhdOrderGoods = Goodss;
      myData.yhdOrderInvoice = Invoices;

      var _ajaxType = viewModel.OrderList.getValue("id") ? "put" : "post";
      $._ajax({
        url: appCtx + viewModel.baseurl,
        type: _ajaxType,
        data: JSON.stringify(myData),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          viewModel.OrderList.getFocusRow().setSimpleData(data);
          viewModel.retListPanel();
        }
      });
      /*
      common.dialog.confirmDialog({
        msg1: '确认保存？',
        msg2: '此操作不可逆',
        width: '400px',
        type: 'error',
        onOk: function () {
          var myData = viewModel.OrderList.getCurrentRow().getSimpleData();        
          var Goodss = viewModel.OrderChildGoodss.getSimpleData();
          var Invoices = viewModel.OrderChildInvoices.getSimpleData();
          myData.yhdOrderGoods = Goodss;
          myData.yhdOrderInvoice = Invoices; 
                  
          var _ajaxType = viewModel.OrderList.getValue("id") ? "put": "post";
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: _ajaxType,
            data: JSON.stringify(myData),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              viewModel.OrderList.getFocusRow().setSimpleData(data);
              viewModel.retListPanel();
            }
          });
        }
      });
      */
    },
    //取消单据
    cancelBill: function() {
      //清除子表数据
      viewModel.BussTypeItems.removeAllRows();
      viewModel.AgencyItems.removeAllRows();
      var curRow = viewModel.OrderList.getCurrentRow();
      // 修改，则还原
      if (curRow.getValue("id")) {
        curRow.setSimpleData(viewModel.OrderList.originEditData)
      }
      // 新增或复制，则删除
      else {
        viewModel.OrderList.removeRow(curRow);
      }
      viewModel.retListPanel();
    },
    //弹出业务类型参照
    showBussRef: function() {
      viewModel.clearBussRef();
      $("#bussRefer").find(".refer").trigger("click");
    },
    //删除已参照的业务类型
    delBussItems: function() {
      var selectedRows = viewModel.BussTypeItems.getSelectedRows();
      selectedRows.forEach(function(row, index, arr) {
        row.setValue("dr", "1");
      });
      if (selectedRows && selectedRows.length > 0) {
        viewModel.BussTypeItems.removeRows(selectedRows);
      }
    },
    //清空已选业务类型参照
    clearBussRef: function() {
      viewModel.BussTypeRef.setValue("bussRefer", "");
      var refer = $("#refContainerbussRefer").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },
    //弹出办事处参照
    showAgencyRef: function() {
      viewModel.clearAgencyRef();
      $("#agencyRefer").find(".refer").trigger("click");
    },
    //删除已参照的办事处
    delAgencyItems: function() {
      var selectedRows = viewModel.AgencyItems.getSelectedRows();
      selectedRows.forEach(function(row, index, arr) {
        row.setValue("dr", "1");
      });
      if (selectedRows && selectedRows.length > 0) {
        viewModel.AgencyItems.removeRows(selectedRows);
      }
    },
    //清空已选办事处参照
    clearAgencyRef: function() {
      viewModel.AgencyRef.setValue("agencyRefer", "");
      var refer = $("#refContaineragencyRefer").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },

  }

  viewModel = u.extend({}, baseData, events, rendertype);

  function appInit(element, params) {
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#PromoActivity-searchcontent")[0], [{
          type: "daterange",
          key: "orderstarttime",
          label: "下单时间"
        }, {
          type: "refer",
          key: "shopsource--name",
          label: "来源店铺",
          refinfo: "b2cStoreRef"
        }, {
          type: "text",
          key: "orderid",
          label: "一号店订单id",
        },
        // {
        //   type:"refer",
        //   key:"activeNode--id",
        //   label:"节点",
        //   refinfo:"activenode"
        // },
        {
          type: "text",
          key: "venderid",
          label: "商家id",
        }, {
          type: "text",
          key: "venderid",
          label: "同步标识位",
        },
        // {
        //   type:"combo",
        //   key:"orderstate",
        //   label:"订单状态",
        //   dataSource: viewModel.approveDataSrc
        // },
        {
          type: "radio",
          key: "gender",
          label: "是否有异常",
          dataSource: [{
            value: '01',
            name: '是'
          }, {
            value: '02',
            name: '否'
          }]
        }
        //TODO: 日期范围匹配日期范围
        // {
        //   type: "daterange",
        //   label: "订货有效期",
        //   startkey: "orderStartDate",
        //   endkey: "orderEndDate",
        // },
        // {
        //   type: "daterange",
        //   label: "终端活动期间",
        //   startkey: "terminalStartDate",
        //   endkey: "terminalEndDate",
        // },
        // {
        //   type: "daterange",
        //   label: "报名有效期",
        //   startkey: "enrolStartDate",
        //   endkey: "enrolEndDate",
        // },
      ]);
    // footer = new billfooter($(".ui-bill-footer").get(), viewModel, "OrderList");
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender() {
    // 初始化折叠面板
    $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#PromoActivity-searchcontent input').off("keydown").on("keydown", function(e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 监听业务类型参照选择
    viewModel.BussTypeRef.on("bussRefer.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refer = $("#refContainerbussRefer").data("uui.refer");
      if (refer && refer.values.length > 0) {
        for (var i = 0; i < refer.values.length; i++) {
          var refpk = refer.values[i].refpk;
          var row = viewModel.BussTypeItems.getRowByField("bussiTypeId", refpk);
          var newrow;
          if (!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            newrow = viewModel.BussTypeItems.createEmptyRow({
              unSelect: true
            });
            newrow.setValue("bussiTypeCode", refer.values[i].refcode);
            newrow.setValue("bussiTypeName", refer.values[i].refname);
            //如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
            newrow.setValue("bussiTypeId", refpk);
          }
        }
      }
    });
    // 监听办事处分区参照选择
    viewModel.AgencyRef.on("agencyRefer.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refer = $("#refContaineragencyRefer").data("uui.refer");
      if (refer && refer.values.length > 0) {
        for (var i = 0; i < refer.values.length; i++) {
          var refpk = refer.values[i].refpk;
          var row = viewModel.AgencyItems.getRowByField("officeId", refpk);
          if (!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            var newrow = viewModel.AgencyItems.createEmptyRow({
              unSelect: true
            });
            newrow.setValue("officeCode", refer.values[i].refcode);
            newrow.setValue("officeName", refer.values[i].refname);
            //如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
            newrow.setValue("officeId", refpk);
          }
        }
      }
    })
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    var bussrefrow = viewModel.BussTypeRef.createEmptyRow();
    viewModel.BussTypeRef.setRowFocus(bussrefrow);
    var agencyrefrow = viewModel.AgencyRef.createEmptyRow();
    viewModel.AgencyRef.setRowFocus(agencyrefrow);
    window.vm = viewModel;
  }

  return {
    init: init
  }
});