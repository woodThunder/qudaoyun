define(['text!./activitydetailc.html','ocm_common','searchbox','editcard','billfooter','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard,billfooter) {
    'use strict'
    var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer,searchDt;
    baseData = {
        baseurl : '/prom/activity-c-excute',
        ActivityCustomerExcuteList: new u.DataTable(ActivityStoreExcute),
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
                ' title="详细">详细</a>'+
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
            // if(!queryData.search_LIKE_code){
            //     alert("活动编码不能为空");
            //     return;
            // }
            var pageSize = viewModel.ActivityCustomerExcuteList.pageSize();
            var pageNumber = viewModel.ActivityCustomerExcuteList.pageIndex();

            // var activityId = searchDt.getValue("activityid");
            // var storeid = searchDt.getValue("store--id");
            // var customerid = searchDt.getValue("customer--id");

            queryData.size = pageSize;
            queryData.page = pageNumber;

            $._ajax({
                type:"get",
                url:appCtx + viewModel.baseurl+"/findStoreExcuteResult",
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
            var activityId = viewModel.ActivityCustomerExcuteList.getValue("activityId");
            var storeId = viewModel.ActivityCustomerExcuteList.getValue("storeId");
            var customerId = viewModel.ActivityCustomerExcuteList.getValue("customerId");
            var page = viewModel.ActivityCustomerExcuteList.pageIndex();
            var size = viewModel.ActivityCustomerExcuteList.pageSize();
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + "/findAllStoreOrder",
                data: {
                  activityId: activityId,
                  storeId:storeId,
                  customerId:customerId,
                    pageable: {
                        page: page,
                        size: size
                    }
                },
                success: function(data) {
                    viewModel.ActivityProductExcuteList.setSimpleData(data,{unSelect:true});
                    viewModel.ActivityProductExcuteList.totalRow(data.todataElements);
                    viewModel.ActivityProductExcuteList.totalPages(data.totalPages);
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
                 type: "refer",
                 key: "activity--id",
                 label: "活动编码",
                 refinfo: "promactivityc",
                 referId:"ActIdRefer",
                 refcfg:{"isReturnCode":true},
              },
                {
                    type:"text",
                    key:"activity--name",
                    label:"活动名称",
                    domid:"actname",
                },
                {
                    type: "daterange",
                    label: "活动开始日期",
                    key: "activity--terminalStartDate"
                },
                {
                    type: "daterange",
                    label: "活动截至日期",
                    key: "activity--terminalEndDate"
                },
                {
                    type:"text",
                    // key:"customer--id",
                  key:"customer--code",
                    label:"经销商编码",

                    // refinfo:"customerRefc",
                    // referId:"customerref",
                    // refcfg:{"isReturnCode":true},
                },
                {
                    type:"text",
                    key:"customer--name",
                    label:"经销商名称",
                    domid:"cusname"
                },
                 {
                    type: "text",
                    key:"store--name",
                    label: "门店名称",
                    // refinfo: "activitystorec",
                    // referId:"storeref",
                  },
            ]);
      searchDt = singledocSearch.viewModel.params;
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
      // viewModel.ActivityCustomerExcuteList.on("code.valuechange",function(obj){
      //   var activtyid =singledocSearch.viewModel.params.activityId;
      //   $("#refContainerstoreref").parent().attr("data-refparam",JSON.stringify({"EQ_activtyId":activtyid}));
      // });
      searchDt.on("valuechange",function(){
        var activityid = searchDt.getValue("activity--id");
        var activityname = searchDt.getValue("activity--name");
        var actrefer = $("#refContainerActIdRefer").data("uui.refer");
        if(!actrefer.values){
          // return;
        } else if(actrefer&&actrefer.values.length>0){
          var curValue = actrefer.values;
          var Actname = curValue[0].name;
          $("#actname").children()[0].title = activityname;
          $("#actname").children()[0].value = Actname;
          searchDt.setValue("activity--name",Actname);
        }
        // var cusref =$("#refContainercustomerref").data("uui.refer");
        // if(!cusref.values){
        //   return;
        // } else if(cusref&&cusref.values.length>0){
        //   var curValue = cusref.values;
        //   var cusname = curValue[0].refname;
        //   $("#cusname").children()[0].title = cusname;
        //   $("#cusname").children()[0].value = cusname;
        // }
        // $("#storeref").parent().attr("data-refparam",JSON.stringify({"activityId":activityid}));
        // $("#customerref").parent().attr("data-refparam",JSON.stringify({"activityId":activityid}));
      });

      // $("#ActIdRefer")[0].value.on("valuechange",function () {
      //   // $("#refContainerActIdRefer").data("uui.refer");
      //   alert("aaaa");
      // })
    }

    function init(element, params) {
        appInit(element, params);
        afterRender();
      var paramHref = window.location.href;
      var paramobj = common.getParameter(paramHref);
      var activityId = paramobj.activityid;
      var activityName = paramobj.activityname;
      var startDate = paramobj.terminalStartDate;
      var endDate = paramobj.terminalEndDate;
      if(activityId) {
        searchDt.setValue("activity--id", activityId);
      }
      if(activityName) {
        searchDt.setValue("activity--name", activityName);
      }
      if(startDate){
        searchDt.setValue("activity--terminalStartDate", startDate+";"+startDate);
      }
      if(endDate){
        searchDt.setValue("activity--terminalEndDate", endDate+";"+endDate);
      }
      $("#customerref").parent().attr("data-refparam",JSON.stringify({"activityId":activityId}));
      viewModel.search();
      window.vm = viewModel;
    }

    return {
        init: init
    }
});