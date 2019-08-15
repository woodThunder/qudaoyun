define(['text!./activityexcute.html','ocm_common','searchbox','editcard','billfooter','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard,billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer;
  baseData = {
    baseurl : '/promo-activity-excute',
    PromoActivityExcuteList: new u.DataTable(PromoActivityExcute),
    ActivityOfficeExcuteExcuteList: new u.DataTable(ActivityOfficeExcute),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    // 日期格式化
    dateFormat: common.format.dateFormat,
  };
  rendertype = {
    // 活动执行操作列
    activityOperation: function(obj){
      var editfun = "data-bind=click:officeDetail.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#"'+
      editfun +
      ' title="明细">明细</a>'+
      '</span>    '+
      '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    // 办事处执行操作列
    officeOperation: function(obj){
      var activityId = viewModel.PromoActivityExcuteList.getValue("id");
      var activityCode = viewModel.PromoActivityExcuteList.getValue("code");
      var activityName = viewModel.PromoActivityExcuteList.getValue("name");
      var officeId = obj.row.value.agencyId;
      var param = {
        activityId: activityId,
        activityCode: activityCode,
        activityName: activityName,
        officeId: officeId
      };
      var urlParam = common.toUrlParam(param);
      var hrefValue = "index-view.html?" + urlParam + "#/activityexcutedetail";
      hrefValue = encodeURIComponent(encodeURIComponent(hrefValue));
      var editfun = " data-bind=click:customerDetail.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href='+ hrefValue + ' value="activityexcutedetail" name="活动执行完成明细"' +
      editfun +
      ' title="明细">明细</a>'+
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
          viewModel.PromoActivityExcuteList.pageIndex(0);
        }
        viewModel.PromoActivityExcuteList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        var pageSize = viewModel.PromoActivityExcuteList.pageSize();
        var pageNumber = viewModel.PromoActivityExcuteList.pageIndex();
        queryData.size = pageSize;
        queryData.page = pageNumber;
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.PromoActivityExcuteList.setSimpleData(data.content,{unSelect:true});
            viewModel.PromoActivityExcuteList.totalRow(data.totalElements);
            viewModel.PromoActivityExcuteList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.PromoActivityExcuteList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.PromoActivityExcuteList.pageSize(size);
        viewModel.search(true);
      },
      // 办事处页码变化
      officePageChange: function(index) {
        viewModel.ActivityOfficeExcuteExcuteList.pageIndex(index);
        viewModel.officePageSearch();
      },
      // 办事处页大小变化
      officeSizeChange: function(size) {
        viewModel.ActivityOfficeExcuteExcuteList.pageSize(size);
        viewModel.officePageSearch();
      },
      // 办事处分页查询
      officePageSearch: function() {
        var activityId = viewModel.PromoActivityExcuteList.getValue("id");
        var page = viewModel.ActivityOfficeExcuteExcuteList.pageIndex();
        var size = viewModel.ActivityOfficeExcuteExcuteList.pageSize();
        $._ajax({
          url: appCtx + viewModel.baseurl + "/officeDetail",
          type: "get",
          data: {
            activityId: activityId,
            pageable: {
              page: page,
              size: size
            }
          },
          success: function(pages) {
            viewModel.ActivityOfficeExcuteExcuteList.setSimpleData(pages.content);
            viewModel.ActivityOfficeExcuteExcuteList.totalRow(pages.totalElements);
            viewModel.ActivityOfficeExcuteExcuteList.totalPages(pages.totalPages);
          }
        });
      },
      // 显示办事处明细
      officeDetail: function() {
        setTimeout(function(){
          viewModel.ActivityOfficeExcuteExcuteList.removeAllRows();
          viewModel.officePageSearch();
          viewModel.goBillPanel();
        }, 0);
      },
      // 办事处明细页返回活动执行列表页
      office2list: function() {
        viewModel.retListPanel();
      },
      // 跳转活动执行完成明细（经销商明细）
      customerDetail: function(index,viewmodel,e) {
        e.preventDefault();
        parent.handleClick(e,1);
        // setTimeout(function(){
        //   require(["/ocm-web/pages/prom/activityexcutedetail/activityexcutedetail.js"], function(module) {
        //     var activityid = viewModel.PromoActivityExcuteList.getValue("id");
        //     var activitycode = viewModel.PromoActivityExcuteList.getValue("code");
        //     var activityname = viewModel.PromoActivityExcuteList.getValue("name");
        //     var officeid = viewModel.ActivityOfficeExcuteExcuteList.getValue("agencyId");
        //     var obj = {
        //       activityid: activityid,
        //       activitycode: activitycode,
        //       activityname: activityname,
        //       officeid: officeid
        //     }
        //     var content = document.getElementById("content");
        //     ko.cleanNode(content);
        //     content.innerHTML = "";
        //     module.init(content, obj);
        //   })
        //   // var urlParam = common.toUrlParam(obj);
        //   // location.hash = "#"+appCtx+"/pages/prom/activityexcutedetail/activityexcutedetail?"+urlParam;
        // }, 0);
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
          key:"code",
          label:"活动编码",
        },
        {
          type:"text",
          key:"name",
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
          type: "text",
          label: "活动描述",
          key: "description"
        },
      ]);
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
  }

  return {
    init: init
  }
});
