define(['text!./activityexcutec.html','ocm_common','searchbox','editcard','billfooter','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard,billfooter) {
    'use strict'
    var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer;
    baseData = {
        baseurl : '/prom/activity-c-excute',
        PromoActivityExcuteList: new u.DataTable(ActivityCExcute),
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
      // 办事处执行操作列
      officeOperation: function(obj){
        var editfun = "data-bind=click:customerDetail.bind($data," + obj.rowIndex + ")";
        var activityid = obj.row.value.id;
        var activitycode = obj.row.value.code;
        var activityname = obj.row.value.name;
        var terminalStartDate = obj.row.value.terminalStartDate;
        var terminalEndDate = obj.row.value.terminalEndDate;
        var param = {
          activityid:activityid,
          activitycode:activitycode,
          activityname:activityname,
          terminalStartDate:terminalStartDate,
          terminalEndDate:terminalEndDate
        };
        var urlParam = common.toUrlParam(param);
        var hrefValue = "index-view.html?"+urlParam+"#/activitydetailc";
        hrefValue = encodeURIComponent(encodeURIComponent(hrefValue));
        obj.element.innerHTML = '<div class="ui-handle-icon">'+
          '<span class="ui-handle-word">'+
          '<a href='+ hrefValue +' value="activitydetailc" name="活动销售明细"'+
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
                url:appCtx + viewModel.baseurl+"/findAllActivityC",
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
            viewModel.clearRef(["organizationId"]);
        },
         // 清空已选参照
         clearRef: function(referids) {
           if(referids&&referids.length>0){
             for(var i=0;i<referids.length;i++){
               var refer = $("#refContainer"+referids[i]).data("uui.refer");
               refer.uncheckAll();
               refer.setValue([]);
             }
           }
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

        // 跳转活动执行完成明细（经销商明细）
        customerDetail: function(index,viewmodel,e) {
            e.preventDefault();
            parent.handleClick(e,1);
            // setTimeout(function(){
            //   require(["/ocm-web/pages/prom/activitydetailc/activitydetailc.js"], function(module) {
            //     var activityid = viewModel.PromoActivityExcuteList.getValue("id");
            //     var activitycode = viewModel.PromoActivityExcuteList.getValue("code");
            //     var activityname = viewModel.PromoActivityExcuteList.getValue("name");
            //     var obj = {
            //       activityid: activityid,
            //       activitycode: activitycode,
            //       activityname: activityname,
            //     }
            //     var content = document.getElementById("content");
            //     ko.cleanNode(content);
            //     content.innerHTML = "";
            //     module.init(content, obj);
            //   })
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
                    label: "活动开始日期",
                    key: "terminalStartDate"
                },
                {
                    type: "daterange",
                    label: "活动截至日期",
                    key: "terminalEndDate"
                },
                {
                    type: "text",
                    label: "活动描述",
                    key: "description"
                },
                {
                    type: "refer",
                    key: "agency--id",
                    label: "所属办事处",
                    refinfo: "organization_ocm",
                    multi:true,
                    referId : "organizationId"
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
        window.vm = viewModel;
    }

    return {
        init: init
    }
});
