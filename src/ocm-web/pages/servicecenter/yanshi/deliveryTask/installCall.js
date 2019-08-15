define(['text!./installCall.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function (tpl, common, searchbox, editcard) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch, sendOrderDialog, dispatchingPopup;
  baseData = {
    baseurl: '/sc/delivery-applications',
    billurl: '/sc/delivery-bills',
    mainListData: new u.DataTable(mainListMeta),
    mainListChildData: new u.DataTable(mainListMeta.goods),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,

    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    enumerateSrc: [
      {name:'未预约',value:'0'},
      {name:'已预约',value:'1'}
    ],
    // 枚举
    billStatusSrc: [],
    dispatchTypeSrc: [],
    flag: ko.observable(true),
    address: ko.observable(null)
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
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataRowId + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataRowId + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle-word">' +
        '<a href="#" class="u-grid-content-focus-row" ' +
        editfun +
        ' title="预约排工">预约排工</a></span>' +

        '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
  };
  events = {
    //查看详情
    detail: function (index, rowId) {
      viewModel.mainListData.setRowSelectbyRowId(rowId);
      var mainData = viewModel.mainListData.getCurrentRow().getSimpleData();
      viewModel.mainListChildData.setSimpleData(mainData.goods);
      //请求完整主子表信息
      viewModel.goDetailPanel();
    },
    //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
    beforeEdit: function (index,rowId) {
      var title;
      viewModel.index = index;
      if (index >= 0) {
        //修改操作
        title = "预约排工";
        viewModel.mainListData.setRowSelectbyRowId(rowId);
        //请求完整主子表信息
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        var mainData = viewModel.mainListData.getCurrentRow().getSimpleData();
        var address = mainData.provinceName+mainData.cityName+mainData.districtName+mainData.townName+mainData.address
        viewModel.address(address);
        viewModel.flag(mainData.isOrdered == "0");
        
        viewModel.mainListChildData.setSimpleData(mainData.goods);
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
    // 预约
    appointmentSave:function(data){
      var thisData = viewModel.mainListData.getCurrentRow().getSimpleData();
      var rows = viewModel.mainListChildData.getSelectedRows();
      if(data >= '1'){
        var validate = $("#validate")[0];
        var result = app.compsValidateMultiParam({
          element: validate,
          showMsg: true
        });
        //封装子表
        var child = [];
        if (rows && rows.length > 0) {
          for(var i = 0; i < rows.length; i++){
            var actualNum = rows[i].getValue('actualNum');
            var alreadyNum = rows[i].getValue('alreadyNum')
            var num = +rows[i].getValue('num')
            if(actualNum == alreadyNum){
              toastr.warning("该商品已经配送完，不能配送");
              return;
            }
            if(actualNum < num+alreadyNum){
              toastr.warning("本次送货量+已配量不能大于实配量");
              return;
            }
            var childData = {
              goodsInfoId : rows[i].getValue('goodsId'),
              goodsInfoCode : rows[i].getValue('goodsCode'),
              goodsInfoName : rows[i].getValue('goodsName'),
              num : rows[i].getValue('num'),
              conpany : rows[i].getValue('unit')
            };
          
            child.push(childData)
          }
        }else{
          toastr.warning("请选择配送商品");
        }
        //封装主表
        var maData = {
          deliAppId: thisData.id,
          billStatus: '1',
          deliveryPersonId: thisData.deliveryPersonId,
          installPersonId: thisData.installPersonId,
          deliveryDate: new Date(),
          planDeliveryDate: thisData.requireDate,
          remark: thisData.remark,
          goodsInfo: child,
        }
    


        //生成送装工单
        if (result.passed) {
          $._ajax({
            url: appCtx + viewModel.billurl,
            type: 'post',
            data: JSON.stringify(maData),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              viewModel.search();
              viewModel.retListPanel();
            }
          });
        }
          }
          else{
            //预约
            var myData = {
              id: thisData.id,
              isOrdered: '1',
              requireDate: thisData.requireDate,
            }    
            $._ajax({
              url: appCtx + viewModel.baseurl+'/ordered',
              type: 'post',
              data: JSON.stringify(myData),
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
     //任务类型
     $._ajax({
      type: "get",
      url: appCtx + "/sc/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.occ.sc.enums.DispatchTypeEnum"
      },
      success: function (data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.dispatchTypeSrc = newarray;
      }
    });
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });

    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#PromoActivity-searchcontent")[0], [
        {
          type: "text",
          key: "customer",
          label: "收货人名称"
        },
        {
          type: "text",
          key: "phone",
          label: "收货人电话"
        },{
          type: "text",
          key: "dispatchNoteCode",
          label: "配送任务单号"
        },
        {
          type: "text",
          key: "orderCode",
          label: "零售订单号"
        },
        {
          type: "combo",
          key: "billStatus",
          label: "任务状态",
          dataSource: viewModel.billStatusSrc
        },
        {
          type: "combo",
          key: "dispatchType",
          label: "配送类型",
          dataSource: viewModel.dispatchTypeSrc
        },
        {
          type: "daterange",
          key: "requireDate",
          label: "要求服务日期"
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