define(['text!./productSupExecRp.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'],
    function(tpl, common, searchbox) {
        'use strict';
        var app, baseData, events, rendertype, viewModel, searcher, searchDt,
            billstatus = CONST.B2BENUM.PURCHASEORDER;
        baseData = {
            baseurl: '/prom/product-support-report',
            productsupxxecList: new u.DataTable(productsupxxeclistmeta),
        };
        rendertype = {
            //审核状态
            auditStatusGrid: function(obj) {
                var showValue = obj.value == "1" ? "已审核" : "未审核";
                obj.element.innerHTML = showValue;
            },
            precision2Render: common.rendertype.precision2Render,
        };
        events = {
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function(reindex) {
                if (reindex) {
                    viewModel.productsupxxecList.pageIndex(0);
                }
                viewModel.productsupxxecList.removeAllRows();
                var queryData = searcher.getDataWithOpr();
                queryData.size = viewModel.productsupxxecList.pageSize();
                queryData.page = viewModel.productsupxxecList.pageIndex();
                var refValues = $("#refContainershowCode").data("uui.refer").values;
                if (refValues && refValues.length > 0) {
                    var products = [];
                    for (var i = 0; i < refValues.length; i++) {
                        var product = {};
                        //产品
                        if (refValues[i].isproduct == "1") {
                            product.productId = refValues[i].refpk;
                        }
                        //产品组合
                        else {
                            product.productCombineId = refValues[i].refpk;
                        }
                        products.push(product);
                    }
                }
                queryData.products = products;
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        viewModel.productsupxxecList.setSimpleData(data.content, { unSelect: true });
                        viewModel.productsupxxecList.totalRow(data.totalElements);
                        viewModel.productsupxxecList.totalPages(data.totalPages);
                    }
                })
            },
            //导出
            exportHandle: function() {
                var searchParams = searcher.getDataWithOpr(); //搜索查询参数
                var templateUrl = '/prom/product-support-report/downloadExcelTemplate'; //导出模板地址参数
                var excelDataUrl = '/prom/product-support-report/excelDataExport'; //导出数据地址参数
                var listData = viewModel.productsupxxecList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            //清空搜索条件
            cleanSearch: function() {
                searcher.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function(index) {
                viewModel.productsupxxecList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function(size) {
                viewModel.productsupxxecList.pageSize(size);
                viewModel.search(true);
            },
        };
        viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

        function appInit(element, params) {
            //将模板页渲染到页面上
            element.innerHTML = tpl;
            //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
            app = u.createApp({
                el: element,
                model: viewModel
            });
            // 查询组件初始化
            searcher = new searchbox(
                $("#purchasereport-searchcontent")[0], [{
                        type: "refer",
                        key: "activityId",
                        label: "活动编码",
                        refinfo: "promactivity",
                        multi: true,
                        clientParam: { "EQ_approveStatus": "1" }
                    },
                    {
                        type: "refer",
                        key: "showCode",
                        label: "产品编码",
                        refinfo: "promproducttab",
                        multi: true,
                        referId: "showCode"
                    },
                ]);
            viewModel.search();
            searchDt = searcher.viewModel.params;
        }

        function afterRender() {
            //绑定输入框enter事件
            $('#purchasereport-searchcontent input').off("keydown").on("keydown", function(e) {
                if (e.keyCode == 13) {
                    $(this).blur();
                    viewModel.search();
                }
            });

            searchDt.on("activityId.valuechange", function() {
                var activityId = searchDt.getValue("activityId");
                /*
                var refValues = $("#refContainerproductRefer").data("uui.refer").values;
                for(var i=0; i<refValues.length;i++) {
                  var product = {};
                  //产品
                  if(refValues[i].isproduct == "1") {
                    product.productId = refValues[i].refpk;
                    product.seriousId = refValues[i].saleSeriesId;
                  }
                  //产品组合
                  else {
                    product.productCombineId = refValues[i].refpk;
                  }*/
                var data = JSON.stringify({ activityId: activityId });
                $("#showCode").parent().attr("data-refparam", data);
            })
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