define(['text!./partApplyOrder.html', 'ocm_common', 'searchbox', 'text!./data.json',
'./meta.js', 'ocm_global'], function (tpl, common, searchbox, jsonData) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch;
    baseData = {
      baseurl: '/sc/repair-boms',
      mainList: new u.DataTable(mainMeta),
      bomDetails: new u.DataTable(mainMeta),
      partsList: new u.DataTable(partsMeta),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
  
      billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
      beableState: [
        {name:'停用',value:'0'},
        {name:'启用',value:'1'}
      ],
      serverDatasource:[
        {name:'福建服务商',value:'1'},
        {name:'广东服务商',value:'2'},
        {name:'安徽服务商',value:'3'},
      ],
      dhTypeDatasource: [
        {name:'网点订货', value:'1'},
        {name:'服务商订货', value:'2'}
      ]
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

      serverRender: function(obj) {
        var dataSource = viewModel.serverDatasource;
        for (var i = 0; i < dataSource.length; i++) {
          if (dataSource[i].value == obj.value) {
            obj.element.innerHTML = dataSource[i].name;
          }
        }
      },

      dhTypeRender: function(obj) {
        if (obj.value == '1') {
          obj.element.innerHTML = '网点订货';
        } else {
          obj.element.innerHTML = '服务商订货';
        }
      },
  
      //操作
      operation: function (obj) {
        var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
        var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
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
      }
    };
    events = {
      //查看详情
      detail: function (index,rowId) {
        viewModel.mainList.setRowSelectbyRowId(rowId);
        var mainData = viewModel.mainList.getCurrentRow().getSimpleData();
        viewModel.partsList.setSimpleData(mainData.parts);
        viewModel.goDetailPanel();
        
      },
      //增行
      addRow: function () {
        viewModel.partsList.createEmptyRow();
      },
      //删行
      delRow: function () {
        if (typeof (data) == 'number') {
          viewModel.partsList.setRowSelect(data);
        }
        var ids = [];
        var rows = viewModel.partsList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          var rows = viewModel.partsList.getSelectedRows();
          viewModel.partsList.removeRows(rows);
        } else {
          toastr.warning('请选择数据');
          return;
        }
      },
  
      //编辑
      beforeEdit: function (index) {
        if (index >= 0) { //编辑
          viewModel.mainList.setRowFocus(index);
          viewModel.mainList.originEditData = viewModel.mainList.getFocusRow().getSimpleData();
          var mainData = viewModel.mainList.getCurrentRow().getSimpleData();
          viewModel.partsList.setSimpleData(mainData.parts);
          $(".sp-add").hide();
          $(".sp-edit").show();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
          viewModel.goBillPanel();
        } else {
          var curRow = viewModel.mainList.createEmptyRow();
          viewModel.mainList.setRowFocus(curRow);
          viewModel.partsList.removeAllRows();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
          $(".sp-add").show();
          $(".sp-edit").hide();

          curRow.setValue("organization", "幸福新能源");
          curRow.setValue("orderType", "服务商订货");
          curRow.setValue("thType", "自提");

          viewModel.goBillPanel();
        }
      },

      //删除和批量删除
      del: function (index) {
        if (typeof (index) == 'number') {
          viewModel.mainList.setRowSelect(index);
        }
        var ids = [];
        var rows = viewModel.mainList.getSelectedRows();
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
             viewModel.mainList.removeRows(rows);
            }
          });
        }
        else {
          toastr.warning("请先选择一行数据");
        }
      },

      audit: function (index) {
        if (typeof (index) == 'number') {
          viewModel.mainList.setRowSelect(index);
        }
        var ids = [];
        var rows = viewModel.mainList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          common.dialog.confirmDialog({
            msg1: '确认审核通过这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
             //viewModel.mainList.removeRows(rows);
            }
          });
        }
        else {
          toastr.warning("请先选择一行数据");
        }
      },
  
      saveBill: function () {
        var type = "post";
        if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
          type = "put";
        }
        var repairBomData = viewModel.mainList.getCurrentRow().getSimpleData();
        var partsData = viewModel.partsList.getSimpleData() || [];
        repairBomData.parts = partsData;
        var validate = $("#validate")[0];
        var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
        if (result.passed) {
            viewModel.search();
            viewModel.retListPanel();
        }
      },
      //点击取消 单据页
      cancelBill: function () {
        viewModel.partsList.removeAllRows();
        var curRow = viewModel.mainList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.mainList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.mainList.removeRow(curRow);
          viewModel.partsList.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.mainList.pageIndex(0);
        }
        viewModel.mainList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.mainList.pageSize();
        queryData.page = viewModel.mainList.pageIndex();
        var mainData = JSON.parse(jsonData);
        viewModel.mainList.setSimpleData(mainData.content, {
          unSelect: true
        });
        viewModel.mainList.getSimpleData();
        viewModel.mainList.totalRow(mainData.totalElements);
        viewModel.mainList.totalPages(mainData.totalPages);
        // $.ajax({
        //   type: "get",
        //   url: appCtx + viewModel.baseurl,
        //   dataType: "json",
        //   data: queryData,
        //   success: function (data) {
        //     viewModel.mainList.setSimpleData(data.content, { unSelect: true });
        //     viewModel.mainList.totalRow(data.totalElements);
        //     viewModel.mainList.totalPages(data.totalPages);
        //   }
        // })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.mainList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.mainList.pageSize(size);
        viewModel.search(true);
      }
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
        $("#mainList-searchcontent")[0], [
          {
            type: "string",
            key: "orderSn",
            label: "申请单号",
          },
          {
            type: "string",
            key: "organization",
            label: "所属组织",
          },
          {
            type: "string",
            key: "server",
            label: "服务商",
          },
          {
            type: "daterange",
            key: "sqDate",
            label: "申请日期",
          },
        ]);
      // 列表查询数据(无查询条件)
      viewModel.search();
    }
  
    function afterRender() {
      // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      //绑定输入框enter事件
      $('#mainList-searchcontent input').off("keydown").on("keydown", function (e) {
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