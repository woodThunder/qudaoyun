define(['text!./settlementRule.html', 'ocm_common', 'searchbox', 'text!./data.json',
'./meta.js', 'ocm_global'], function (tpl, common, searchbox, jsonData) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch;
    baseData = {
      baseurl: '/sc/repair-boms',
      mainList: new u.DataTable(mainMeta),
      mainAdd: new u.DataTable(mainMeta),
      partsList: new u.DataTable(partsMeta),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
      isAuto: ko.observable('0'),
      payPersonSrc: [
        {name:'厂商',value:'0'},
        {name:'服务商',value:'1'}
      ],
      orgSrc: [
        {name:'华北服务商',value:'0'},
        {name:'广东服务商',value:'1'},
        {name:'北京服务商',value:'2'}
      ],
      //
        isAutoSrc: [{
            value: "0",
            name: "否"
        },{
          value: "1",
          name: "是"
      }],
      typeSrc: [
        {name:'结算单',value:'结算单'}
      ],
      settlementSrc: [
        {name:'1',value:'1'},
        {name:'2',value:'2'},
        {name:'3',value:'3'},
        {name:'4',value:'4'},
        {name:'5',value:'5'},
        {name:'6',value:'6'},
        {name:'7',value:'7'},
        {name:'8',value:'8'},
        {name:'9',value:'9'},
        {name:'10',value:'10'},
        {name:'11',value:'11'},
        {name:'12',value:'12'},
        {name:'13',value:'13'},
        {name:'14',value:'14'},
        {name:'15',value:'15'},
        {name:'16',value:'16'},
        {name:'17',value:'17'},
        {name:'18',value:'18'},
        {name:'19',value:'19'},
        {name:'20',value:'20'},
        {name:'21',value:'22'},
        {name:'23',value:'23'},
        {name:'24',value:'24'},
        {name:'25',value:'25'},
        {name:'26',value:'26'},
        {name:'27',value:'27'},
        {name:'28',value:'28'},
        {name:'29',value:'29'},
        {name:'30',value:'30'},
        {name:'31',value:'31'},
      ],
  
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
        var isAuto = mainData.isAuto;
        viewModel.showIsAuto(isAuto);
        viewModel.partsList.setSimpleData(mainData.parts);
        viewModel.goDetailPanel();
        
      },

      showIsAuto: function(isAuto){
        var name;
        switch (isAuto) {
          case '0':
            name = '否';
            break;
          case '1':
            name = '是';
            break;
          default:
            name = '否';
        }
        viewModel.isAuto(name);
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
          var mainData = viewModel.mainList.getCurrentRow().getSimpleData();
          viewModel.mainAdd.setSimpleData(mainData);
          viewModel.partsList.setSimpleData(mainData.parts);
          viewModel.goBillPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        }else { //新增
          var row = viewModel.mainAdd.createEmptyRow();
          viewModel.mainAdd.setRowFocus(row);
          viewModel.partsList.removeAllRows();
          viewModel.goBillPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
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
            key: "code",
            label: "规则单号",
          },
          {
            type: "string",
            key: "code",
            label: "规则名称",
          },
          {
            type: "combo",
            key: "org",
            label: "所属组织",
            dataSource: viewModel.orgSrc
          },
          {
            type: "combo",
            key: "type",
            label: "结算单类型",
            dataSource: viewModel.typeSrc
          }
         
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