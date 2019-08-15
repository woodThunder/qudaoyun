define(['text!./installWork.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function (tpl, common, searchbox, editcard) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch;
  baseData = {
    baseurl: '/sc/delivery-bills',
    billDetail: new u.DataTable(mainMeta),
    mainList: new u.DataTable(mainMeta),
    goodsList: new u.DataTable(goodsMeta),
    processList: new u.DataTable(processMeta),
    //图片绑定
    deliveryImgsDataArr:ko.observableArray(),
    installImgsDataArr:ko.observableArray(),
    //单据状态枚举
    billStatusEnum: [],
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
      var id = viewModel.mainList.getCurrentRow().getValue("id");
     
      //请求完整主子表信息
      viewModel.fillOrderDetailData(id);
      viewModel.goDetailPanel();
      // 配送图片
      var deliveryImgs = viewModel.mainList.getCurrentRow().getValue("deliveryImgs");
      var deliveryImgsArr = deliveryImgs.split(';');
      viewModel.deliveryImgsDataArr(deliveryImgsArr);
      // 安装图片
      var   installImgs = viewModel.mainList.getCurrentRow().getValue("installImgs");
      var installImgsArr = installImgs.split(';');
      viewModel.installImgsDataArr(installImgsArr);
    },
    // 图片放大 弹窗
    imgsMagnifyFun:function(data){
      var imgDialog = u.dialog({
          id: 'imgMagnifyBox',
          content: "#imgMagnifyBox",
          "width": "700px"
        });
        var imgTag = $("#imgMagnifyBox .imgDiv .img");
            imgTag.attr('src',data);
            imgTag.css({border:'1px dashed #ddd',maxHeight:'800px',width:'650px',margin:'10px auto'});
        // 关闭按钮
        var cancelButton = $("#imgMagnifyBox .u-msg-cancel");
        cancelButton.unbind("click").click(function() {
          imgDialog.close();
        });
    },
    //查询子表数据
    fillOrderDetailData: function (id) {
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl + '/detail/' + id,
        async: false,
        success: function (data) {
          //当前data
          viewModel.billDetail.setSimpleData(data);
          viewModel.goodsList.setSimpleData(data.goodsInfo);
          viewModel.processList.setSimpleData(data.process);
        }
      })
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

    edit: function () {
      var type = "put";
      var repairBomData = viewModel.mainList.getCurrentRow().getSimpleData();
      var validate = $("#editPanel")[0];
      var result = app.compsValidateMultiParam({
        element: validate,
        showMsg: true
      });
      if (result.passed) {
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(repairBomData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.search();
            viewModel.retListPanel();
          }
        });
      }
    },
    complete: function () {
      if (typeof (index) == 'number') {
        viewModel.mainList.setRowSelect(index);
      }
      var ids = [];
      var rows = viewModel.mainList.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          var billStatus = rows[i].getValue("billStatus");
          if (billStatus != "2") {
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
        enumClassName: "com.yonyou.occ.sc.enums.DeliveryApplicationStatusEnum"
      },
      success: function (data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.billStatusEnum = newarray;
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
          label: "送装工单号"
        },
        {
          type: "text",
          key: "name",
          label: "维修请求号"
        },
        {
          type: "text",
          key: "serviceProvider",
          label: "服务商",
        },
        {
          type: "text",
          key: "billCustomer",
          label: "客户",
  
        },
        {
          type: "text",
          key: "phone",
          label: "联系电话"
        },
        {
          type: "daterange",
          key: "requireDate",
          label: "派工日期"
        },
        {
          type: "combo",
          key: "billStatus",
          label: "单据状态",
          dataSource: viewModel.billStatusEnum
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