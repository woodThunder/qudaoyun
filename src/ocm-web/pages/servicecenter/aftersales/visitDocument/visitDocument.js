define(['text!./visitDocument.html', 'ocm_common', 'searchbox', 'editcard', 'text!./data.json',
'ocm_repairtrack','./meta.js', 'ocm_global'], function (tpl, common, searchbox, editcard, jsonData) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch, popupDialog;
  baseData = {
    baseurl: '/sc/repair-bills',
    mainListData: new u.DataTable(mainListMeta),
    addMainListData: new u.DataTable(mainListMeta),


    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,

    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    flag: ko.observable(true),
    //枚举
    enumerateSrc:[
        {name:'否',value:'0'},
        {name:'是',value:'1'}
    ],
    radioSrc:[
        {name:'否',value:'0'},
        {name:'是',value:'1'}
    ],
    //服务类型
    serviceTypeSrc: [
        {name:'维修',value:'0'},
        {name:'安装',value:'1'},
        {name:'配送',value:'2'}
    ],
    //满意度
    satisfiedLevelSrc: [
        {name:'非常不满意',value:'0'},
        {name:'很不满意',value:'1'},
        {name:'不满意',value:'2'},
        {name:'满意',value:'3'},
        {name:'很满意',value:'4'},
        {name:'非常满意',value:'5'},
    ]
  };
  rendertype = {
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
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataRowId + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataRowId + ")";
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
      popupDialog = u.dialog({
        id: 'popup02Box',
        content: "#popup02",
        "width": "1050px"
      });

      // 取消按钮
      var cancelButton = $("#popup02 .u-msg-cancel");
      cancelButton.unbind("click").click(function () {
        popupDialog.close();

      });
      // debugger;
    //   var id = viewModel.mainListData.getCurrentRow().getValue("id");
      //请求完整主子表信息
      //  viewModel.fillOrderDetailData(id);

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

        viewModel.addVisitFun();
        // viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
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
    // 新增
    addVisitFun: function (index, rowId) {
        viewModel.addMainListData.clear();
        var row = viewModel.addMainListData.createEmptyRow();
        var randomNum5 = Math.ceil(Math.random() * 1000);
        row.setValue('code',"A888"+randomNum5);
        // row.setValue('visitPerson',"李亚萍");
        viewModel.addMainListData.setRowFocus(row);
        popupDialog = u.dialog({
          id: 'popup01Box',
          content: "#popup01",
          "width": "1020px"
        });

        // 保存按钮
        var okButton = $("#popup01 .u-msg-ok");
        okButton.unbind("click").click(function () {
          var validate = $("#validate")[0];
          var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
          if(result.passed){
            popupDialog.close();
            var addRow = viewModel.addMainListData.getCurrentRow().getSimpleData();
            var row = viewModel.mainListData.createEmptyRow();
                row.setSimpleData(addRow);
          }
        });

      // 取消按钮
      var cancelButton = $("#popup01 .u-msg-cancel");
      cancelButton.unbind("click").click(function () {
        viewModel.addMainListData.clear();
        popupDialog.close();
      });
    },
    //保存单据
    saveBill: function () {
      var type = "post";
      if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
        type = "put";
      }
      var promoFormData = viewModel.mainListData.getCurrentRow().getSimpleData();
      var personId = promoFormData.servicePersonId;
      // debugger;
      if(personId){
        promoFormData.billStatus = '1';
      }
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

    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if (reindex) {
        viewModel.mainListData.pageIndex(0);
      }
    //   viewModel.mainListData.removeAllRows();
    //   var queryData = singledocSearch.getDataWithOpr();
    //   queryData.size = viewModel.mainListData.pageSize();
    //   queryData.page = viewModel.mainListData.pageIndex();
      // 模拟数据
      var mainData = JSON.parse(jsonData);
      viewModel.mainListData.setSimpleData(mainData.content, {
        unSelect: true
      });
      viewModel.mainListData.totalRow(mainData.totalElements);
      viewModel.mainListData.totalPages(mainData.totalPages);
    //   $._ajax({
    //     type: "get",
    //     url: appCtx + viewModel.baseurl,
    //     dataType: "json",
    //     data: queryData,
    //     success: function (data) {
    //       viewModel.mainListData.setSimpleData(data.content, {
    //         unSelect: true
    //       });
    //       viewModel.mainListData.totalRow(data.totalElements);
    //       viewModel.mainListData.totalPages(data.totalPages);
    //     }
    //   })
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

      // 优先级 枚举
    //   $._ajax({
    //     type: "get",
    //     url: appCtx + "/sc/enum-service/data",
    //     async: false,
    //     data: {
    //       enumClassName: "com.yonyou.occ.sc.enums.PriorityLevelEnum"
    //     },
    //     success: function (data) {
    //       var newarray = common.dataconvert.toMap(data, "name", "code");
    //       viewModel.priorityLevelEnum = newarray;
    //     }
    //   });
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
          label: "回访单编码"

        },
        {
            type: "daterange",
            key: "visitDate",
            label: "回访日期"
        }, {
            type: "text",
            key: "visitPerson",
            label: "回访人"
        }, {
            type: "text",
            key: "phone",
            label: "联系电话"
        }, {
            type: "text",
            key: "customerName",
            label: "顾客姓名"
        },

        {
            type: "combo",
            key: "serviceType",
            label: "服务类型",
            dataSource: viewModel.serviceTypeSrc
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
