define(['text!./prombasicprice.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
    'use strict'
    var app,baseData,events,rendertype,viewModel,searcher;
    baseData = {
        baseurl : '/prom-basic-price',
        PromBasicPriceList: new u.DataTable(PromBasicPrice),
    };
    rendertype = {
        enableRender: common.rendertype.enableRender
    }
    events = {
        disable:function(){
            var selectedRows = viewModel.PromBasicPriceList.getSelectedRows();
            var ids = [];
            for(var i=0;i<selectedRows.length;i++) {
                var id = selectedRows[i].getValue("id");
                ids.push(id);
            }
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/disable",
                data: {ids: ids.join(",")},
                success: function() {
                    viewModel.search();
                }
            })
        },
        exportPrice: function() {
            var searchParams = searcher.getDataWithOpr(); //搜索查询参数
            var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
            var excelDataUrl =  viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
            var listData = viewModel.PromBasicPriceList; //需要导出表格的dataTable
            var ele = $('#exportFiel')[0]; //挂载元素
            common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if(reindex){
                viewModel.PromBasicPriceList.pageIndex(0);
            }
            viewModel.PromBasicPriceList.removeAllRows();
            var queryData = searcher.getDataWithOpr();
            queryData.size = viewModel.PromBasicPriceList.pageSize();
            queryData.page = viewModel.PromBasicPriceList.pageIndex();
            queryData["search_EQ_enabled"] = "1";
            $._ajax({
                type:"get",
                url:appCtx + viewModel.baseurl,
                dataType:"json",
                data:queryData,
                success:function(data){
                    viewModel.PromBasicPriceList.setSimpleData(data.content,{unSelect:true});
                    viewModel.PromBasicPriceList.totalRow(data.totalElements);
                    viewModel.PromBasicPriceList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function () {
            searcher.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.PromBasicPriceList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.PromBasicPriceList.pageSize(size);
            viewModel.search(true);
        }

    }
    viewModel = u.extend({},baseData,events,common.rendertype);

    function appInit(element, params){
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        window.initButton(viewModel, element);//初始化按钮权限
        ko.cleanNode(element);
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        // 查询组件初始化
        searcher = new searchbox(
            $("#commonproprice-searchcontent")[0],
            [
                {
                    type:"refer",
                    key:"product",
                    label:"产品",
                    refinfo: "productInfo",
                    multi:true,
                },

                {
                    type:"refer",
                    key:"agencypartition--id",
                    label:"办事处分区",
                    refinfo: "agencypartitiongrid",
                    multi:true,
                },
                {
                    type:"refer",
                    key:"officeId",
                    label:"办事处",
                    refinfo: "organization_ocm",
                    clientParam: {"EQ_isOffice":"1"},
                    multi:true,
                },
                {
                    type:"refer",
                    key:"packPro",
                    label:"包件",
                    refinfo: "productInfo",
                    multi:true,
                },
                {
                    type:"text",
                    key:"packProName",
                    label:"包件名称"
                },
                {
                    type:"combo",
                    key:"channelId",
                    label:"渠道类型",
                    dataSource: CONST.CHANNELTYPE
                },
            ]);
        // 列表查询数据(无查询条件)
        viewModel.search();
    }

    function afterRender(){
        //绑定输入框enter事件
        $('#commonproprice-searchcontent input').off("keydown").on("keydown",function(e){
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        searcher.viewModel.params.on("channelId.valuechange",function(obj) {
            console.log("channelId valuechange", obj);
        })
    }

    function init(element, params) {
        console.log(location);
        appInit(element, params);
        afterRender();
        window.vm =viewModel;
    }

    return {
        init: init
    }
});
