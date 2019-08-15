define(['text!./customerEquity.html', 'ocm_common', 'searchbox', 'editcard','text!./data.json', 
'./meta.js', 'ocm_global'], function (tpl, common, searchbox, editcard,jsonData) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch;
    baseData = {
      baseurl: '/sc/customer-equitys',
      customerequityMeta: new u.DataTable(customerequitymeta),
      customerequityMetaAdd: new u.DataTable(customerequitymeta),
      goodsListData: new u.DataTable(goodsListMeta),
      installListData: new u.DataTable(installListMeta),
      consultListData: new u.DataTable(consultListMeta),      
      repairListData: new u.DataTable(repairListMeta),
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
        var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
        // var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
        obj.element.innerHTML = '<div class="ui-handle-icon">' +

          '<span class="ui-handle-word">' +
          '<a ' +
          delfun +
          ' title="删除">删除</a>' +
          '</span></div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      dateTimeRender: function(obj) {
        var referDOM = '' +
          '<div class="u-datepicker"  u-meta="{"type":"u-date","data":"goodsListData","field":"buyDate"}">' + 
          '<input class="u-input" type="text" value=' + obj.value + '>' +
          + 
          '</div>'
        obj.element.innerHTML = referDOM;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
  
      }
    };
    events = {
  
      //查看详情
      detail: function (index, rowId) {
        viewModel.customerequityMeta.setRowSelectbyRowId(rowId);
        //请求完整主子表信息
        var dataOBJ = JSON.parse(jsonData);
       
        viewModel.goodsListData.setSimpleData(dataOBJ.goodsList.content);
        viewModel.installListData.setSimpleData(dataOBJ.installList.content);
        viewModel.consultListData.setSimpleData(dataOBJ.consultList.content);
        viewModel.repairListData.setSimpleData(dataOBJ.repairList.content);
        viewModel.goDetailPanel();
      },
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index) {
        var title; viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          viewModel.customerequityMeta.setRowFocus(index);
          var id = viewModel.customerequityMeta.getCurrentRow().getValue("id");
          //请求完整主子表信息
          viewModel.goBillPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        } else {
          title = "新增";
          var row = viewModel.customerequityMetaAdd.createEmptyRow();
          viewModel.customerequityMetaAdd.setRowFocus(row);
           //
          viewModel.goodsListData.removeAllRows();
          viewModel.goBillPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
  
        }
      },
        //add子新增
      addChild:function(data){
        if(data=='goodsLis'){
          var row = viewModel.goodsListData.createEmptyRow();
          viewModel.goodsListData.setRowFocus(row);
        }
        else if(data=='area'){
          var row = viewModel.areaList4Add.createEmptyRow();
          viewModel.areaList4Add.setRowFocus(row);
        }
        else if(data=='fault'){
          var row = viewModel.faultList4Add.createEmptyRow();
          viewModel.faultList4Add.setRowFocus(row);
        }
        else{

        }
      },
      //del删除子
      delChild:function(data){
          var ids = [];
          var rows = [];
          if(data=='goodsLis'){
            rows = viewModel.goodsListData.getSelectedRows();
            if (rows && rows.length > 0) {
              viewModel.goodsListData.removeRows(rows);
            } else {
              toastr.warning('请选择数据');
              return;
            }
            
          }
          else if(data=='area'){
            rows = viewModel.areaList4Add.getSelectedRows();
            if (rows && rows.length > 0) {
              viewModel.areaList4Add.removeRows(rows);
            } else {
              toastr.warning('请选择数据');
              return;
            }
          }
          else if(data=='fault'){
            rows = viewModel.faultList4Add.getSelectedRows();
            if (rows && rows.length > 0) {
              viewModel.faultList4Add.removeRows(rows);
            } else {
              toastr.warning('请选择数据');
              return;
            }
          }
          else{}
        
        
      },
      //删除和批量删除
      del: function (data) {
        if (typeof (data) == 'number') {
          viewModel.customerequityMeta.setRowSelect(data);
        }
        var ids = [];
        var rows = viewModel.customerequityMeta.getSelectedRows();
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
                  viewModel.customerequityMeta.removeRows(rows);
                }
              });
  
            }
          });
        }
        else {
          toastr.warning("请先选择需要删除数据");
        }
      },
     
      //保存单据
      saveBill: function () {
        var type = "post";
        if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
          type = "put";
        }
        var promoFormData = viewModel.customerequityMeta.getCurrentRow().getSimpleData();
       
        var validate = $("#validate")[0];
        var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
  
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
        viewModel.goodsListData.removeAllRows(); 
        viewModel.retListPanel();
      },
  
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.customerequityMeta.pageIndex(0);
        }
        viewModel.customerequityMeta.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.customerequityMeta.pageSize();
        queryData.page = viewModel.customerequityMeta.pageIndex();
        var dataOBJ = JSON.parse(jsonData);
        viewModel.customerequityMeta.setSimpleData(dataOBJ.customerList.content, { unSelect: true });
        viewModel.customerequityMeta.totalRow(dataOBJ.customerList.totalElements);
        viewModel.customerequityMeta.totalPages(dataOBJ.customerList.totalPages);
        // $._ajax({
        //   type: "get",
        //   url: appCtx + viewModel.baseurl,
        //   dataType: "json",
        //   data: queryData,
        //   success: function (data) {
        //     viewModel.customerequityMeta.setSimpleData(data.content, { unSelect: true });
        //     viewModel.customerequityMeta.totalRow(data.totalElements);
        //     viewModel.customerequityMeta.totalPages(data.totalPages);
        //   }
        // })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
    
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.customerequityMeta.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.customerequityMeta.pageSize(size);
        viewModel.search(true);
      }
    }
    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);
  
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
            type: "text",
            key: "code",
            label: "编码"
        },
        {
            type: "text",
            key: "name",
            label: "名称"
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
  