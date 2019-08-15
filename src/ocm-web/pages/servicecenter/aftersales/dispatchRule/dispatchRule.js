define(['text!./dispatchRule.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function (tpl, common, searchbox, editcard, repairTrack) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch;
  baseData = {
    baseurl: '/sc/dispatch-rules',
    mainList: new u.DataTable(mainMeta),
    rangeList: new u.DataTable(rangeMeta),
    areaList: new u.DataTable(areaMeta),
    faultList: new u.DataTable(faultMeta),
    ruleAdd: new u.DataTable(mainMeta),
    rangeList4Add: new u.DataTable(rangeMeta),
    areaList4Add: new u.DataTable(areaMeta),
    faultList4Add: new u.DataTable(faultMeta),
    //单据类型枚举
    billTypeEnum: [],
    //优先级枚举
    priorityLevelEnum:[],
    //服务类型
    serviceTypeSrc: [{
      value: "0",
      name: "配送"
    }, {
        value: "1",
        name: "安装"
    },{
        value: "2",
        name: "维修"
    }, {
        value: "3",
        name: "施工"
    }],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
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
      var dataTableRowId = obj.row.value['$_#_@_id'];
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
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
    detail: function (index, rowId) {
      viewModel.mainList.setRowSelectbyRowId(rowId);
      var mainData = viewModel.mainList.getCurrentRow().getSimpleData();
      viewModel.rangeList.setSimpleData(mainData.range);
      viewModel.areaList.setSimpleData(mainData.area);
      viewModel.faultList.setSimpleData(mainData.fault);
      //var id = viewModel.mainList.getCurrentRow().getValue("id");
      //请求完整主子表信息
      //viewModel.fillOrderDetailData(id);
      viewModel.goDetailPanel();
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
            $._ajax({
              url: appCtx + viewModel.baseurl + "/delete",
              type: "post",
              data: {
                ids: ids.join(",")
              },
              success: function (data) {
                viewModel.mainList.removeRows(rows);
              }
            });
          }
        });
      } else {
        toastr.warning("请先选择一行数据");
      }
    },

    //编辑
    beforeEdit: function (index) {
      if (index >= 0) { //编辑
        viewModel.mainList.setRowFocus(index);
        var mainData = viewModel.mainList.getCurrentRow().getSimpleData();
        viewModel.rangeList.setSimpleData(mainData.range);
        viewModel.areaList.setSimpleData(mainData.area);
        viewModel.faultList.setSimpleData(mainData.fault);
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
      } else { //新增
        var row = viewModel.ruleAdd.createEmptyRow();
        viewModel.ruleAdd.setRowFocus(row);
        viewModel.rangeList4Add.removeAllRows();
        viewModel.areaList4Add.removeAllRows();
        viewModel.faultList4Add.removeAllRows();
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
      }
      
    },

    saveBill: function () {
      var type = "post";
      if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
        type = "put";
      }
      var ruleAdd = viewModel.ruleAdd.getCurrentRow().getSimpleData();
      
      // 新增数据
      var rangeList = viewModel.rangeList4Add.getSimpleData() || [];
      var areaList = viewModel.areaList4Add.getSimpleData() || [];
      var faultList = viewModel.faultList4Add.getSimpleData() || [];
           //产品范围rangeList4Add
          //服务区域areaList4Add
          //故障分类faultList4Add
          ruleAdd.range = rangeList;
          ruleAdd.area = areaList;
          ruleAdd.fault = faultList;
          console.log(ruleAdd);
      var validate = $("#validate")[0];
      var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
      // if (partsData.length == 0) {
      //   toastr.warning('备件不可为空');
      //   return;
      // }
      if (result.passed) {
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(ruleAdd),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.search();
            viewModel.retListPanel();
          }
        });

      }
    },
    //add子新增
    addChild:function(data){
      if(data=='range'){
        var row = viewModel.rangeList4Add.createEmptyRow();
        viewModel.rangeList4Add.setRowFocus(row);
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
        if(data=='range'){
           rows = viewModel.rangeList4Add.getSelectedRows();
          if (rows && rows.length > 0) {
            viewModel.rangeList4Add.removeRows(rows);
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
      $.ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function (data) {
          viewModel.mainList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.mainList.totalRow(data.totalElements);
          viewModel.mainList.totalPages(data.totalPages);
        }
      })
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

  viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

  function appInit(element, params) {
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //单据状态枚举
    $._ajax({
      type: "get",
      url: appCtx + "/sc/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.occ.sc.enums.BillTypeEnum"
      },
      success: function (data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.billTypeEnum = newarray;
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
      $("#mainList-searchcontent")[0], [{
          type: "text",
          key: "code",
          label: "规则编码"
        },
        {
          type: "text",
          key: "name",
          label: "规则名称"
        },
        {
          type: "combo",
          key: "billType",
          label: "单据类型",
          dataSource: viewModel.billTypeEnum
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
    // //省
    // viewModel.mainList.on("provinceId.valuechange", function (obj) {
    //   var row = viewModel.mainList.getCurrentRow();
    //   var provinceId = row.getValue("provinceId");
    //   $("#city").attr("data-refparam", '{"EQ_areaLevel":"2","EQ_parent.id":"' + provinceId + '"}');
    //   $("#city input").val('');
    //   $("#district input").val('');
    //   $("#town input").val('');
    // });

    // //省市联动 
    // viewModel.mainList.on("cityId.valuechange", function (obj) {
    //     var row = viewModel.mainList.getCurrentRow();
    //     var cityId = row.getValue("cityId");
    //     $("#district").attr("data-refparam", '{"EQ_areaLevel":"3","EQ_parent.id":"' + cityId + '"}');
    //     $("#district input").val('');
    //     $("#town input").val('');

    // });
    // //市区联动
    // viewModel.mainList.on("districtId.valuechange", function (obj) {
    //     var row = viewModel.mainList.getCurrentRow();
    //     var districtId = row.getValue("districtId");
    //     $("#town").attr("data-refparam", '{"EQ_areaLevel":"4","EQ_parent.id":"' + districtId + '"}');
    //     $("#town input").val('');
    // });
    // //区镇联动
    // viewModel.mainList.on("townId.valuechange", function (obj) {

    // });
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