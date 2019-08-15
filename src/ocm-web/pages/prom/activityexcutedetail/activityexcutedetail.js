define(['text!./activityexcutedetail.html','ocm_common','searchbox','editcard','billfooter','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard,billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer;
  baseData = {
    baseurl : '/detail-excute',
    ActivityCustomerExcuteList: new u.DataTable(ActivityCustomerExcute),
    ActivityProductExcuteList: new u.DataTable(ActivityProductExcute),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
  };
  rendertype = {
    // 经销商执行操作列
    customerOperation: function(obj){
      var editfun = "data-bind=click:productDetail.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#"'+
      editfun +
      ' title="产品明细">产品明细</a>'+
      '</span>    '+
      '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
  };
  events = {
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.ActivityCustomerExcuteList.pageIndex(0);
        }
        viewModel.ActivityCustomerExcuteList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        var pageSize = viewModel.ActivityCustomerExcuteList.pageSize();
        var pageNumber = viewModel.ActivityCustomerExcuteList.pageIndex();
        queryData.size = pageSize;
        queryData.page = pageNumber;
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.ActivityCustomerExcuteList.setSimpleData(data.content,{unSelect:true});
            viewModel.ActivityCustomerExcuteList.totalRow(data.totalElements);
            viewModel.ActivityCustomerExcuteList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.ActivityCustomerExcuteList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.ActivityCustomerExcuteList.pageSize(size);
        viewModel.search(true);
      },
      // 产品分页查询
      productPageSearch: function() {
        var parentid = viewModel.ActivityCustomerExcuteList.getValue("id");
        var page = viewModel.ActivityCustomerExcuteList.pageIndex();
        var size = viewModel.ActivityCustomerExcuteList.pageSize();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/productDetail",
          data: {
            parentid: parentid,
            pageable: {
              page: page,
              size: size
            }
          },
          success: function(pages) {
            viewModel.ActivityProductExcuteList.setSimpleData(pages.content);
            viewModel.ActivityProductExcuteList.totalRow(pages.totalElements);
            viewModel.ActivityProductExcuteList.totalPages(pages.totalPages);
          }
        })
      },
      // 产品明细页码变化
      prodPageChange: function(index) {
        viewModel.ActivityProductExcuteList.pageIndex(index);
        viewModel.productPageSearch();
      },
      // 产品明细页尺寸变化
      prodSizeChange: function(size) {
        viewModel.ActivityProductExcuteList.pageSize(size);
        viewModel.productPageSearch();
      },
      // 显示产品明细
      productDetail: function() {
        setTimeout(function(){
          viewModel.productPageSearch();
          viewModel.goBillPanel();
        }, 0);
      },
      // 产品明细页返回经销商明细页
      product2customer: function() {
        viewModel.retListPanel();
      },
  }
  viewModel = u.extend({},baseData,events,rendertype);

  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#PromoActivity-searchcontent")[0],
      [
        {
          type:"text",
          key:"activityCode",
          label:"活动编码",
        },
        {
          type:"text",
          key:"activityName",
          label:"活动名称",
        },
        {
          type: "daterange",
          label: "订货开始日期",
          key: "orderStartDate"
        },
        {
          type: "daterange",
          label: "订货截至日期",
          key: "orderEndDate"
        },
        {
          type:"text",
          key:"customerCode",
          label:"经销商编码",
        },
        {
          type:"text",
          key:"customerName",
          label:"经销商名称",
        },
        {
          type: "refer",
          label: "所属办事处",
          key: "officeId",
          refinfo:"organization_ocm",
          multi:true,
        },
      ]);
      var paramHref = window.location.href;
      var paramobj = common.getParameter(paramHref);
      var activityId = paramobj.activityId;
      var activityCode = paramobj.activityCode;
      var activityName = paramobj.activityName;
      var officeId = paramobj.officeId;
      var searchDt = singledocSearch.viewModel.params;
      if(activityCode) {
        searchDt.setValue("activityCode", activityCode);
      }
      if(activityName) {
        searchDt.setValue("activityName", activityName);
      }
      if(officeId) {
        searchDt.setValue("officeId", officeId);
      }
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#PromoActivity-searchcontent input').off("keydown").on("keydown",function(e){
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
