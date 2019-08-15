define(
    [
        "text!./customerjurisdictionschema.html",
        './meta.js',
        "ocm_common",
        "ocm_baseview",
        "/ocm-web/vendor/echarts/echarts.js",
        //    "/ocm-web/vendor/echarts/custom.js"
    ],
    function (tpl, model, common, baseview, echarts) {
        "use strict";
        //var tpl = '<div class="ui-panel ui-list-panel">\r\n      <div>\r\n      <div class="page-title">\r\n      <span data-bind="text:title"></span>\r\n      </div>\r\n      </div>\r\n      <div>\r\n      <div>\r\n      <div class="oc-breadcrumb">\r\n      </div>\r\n      </div>\r\n      </div>\r\n      <div class="title-seperator"></div>\r\n      <ui-searchbox params=\'datasource:$root.searchSource,ref:$root.searchcomp,search:$root.search,clean:$root.cleanSearch\'>\r\n      </ui-searchbox>\r\n      <div class="ui-panel-body">\r\n      <div class="ui-panel-body-head">\r\n      <div class="ui-panel-body-head-left">\r\n      <ui-buttons params=\'datasource:$root.buttonSource\'>\r\n      </ui-buttons>\r\n      </div>\r\n      </div>\r\n      <div class="ui-table-container">\r\n      <ui-grid params=\'options:$root.gridOption,vm:$root\'>\r\n      </ui-grid>\r\n      <div class="ui-statistics margin-top-10">\r\n      已选择\r\n      <span class="font-c-blue" data-bind="text:simpleList.selectedIndices().length"></span>项数据\r\n      </div>\r\n      <div class="pagination-right">\r\n      <div id=\'pagination\' class=\'pagination u-pagination pagination-sm\' u-meta=\'{"type":"pagination","data":"simpleList","pageChange":"pageChange","sizeChange":"sizeChange"}\'></div>\r\n      </div>\r\n      </div>\r\n      </div>\r\n      </div>\r\n      <ui-dialogcard params=\'datasource:$root.dialogcardSource,ref:$root.dialogcardcomp,dt:$root.simpleList\'>\r\n      </ui-dialogcard>\r\n   <div class="ui-bill-detail ui-panel" style="display: none;">\r\n    <div>\r\n    <div class="page-title">\r\n    <span data-bind="text:title"></span>\r\n    </div>\r\n    </div>\r\n    <div>\r\n    <div>\r\n    <div class="oc-breadcrumb">\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class="ui-panel-btn-bg">\r\n    <div class="ui-operate-btn">\r\n    <a class="ui-btn ui-btn-primary" data-bind="click: retListPanel">返回\r\n    </a>\r\n    </div>\r\n    </div>\r\n    <div class="ui-panel-head">\r\n    <ui-detail params=\'datasource:$root.detailSource,dt:$root.simpleList,vm:$root\'>\r\n    </ui-detail>\r\n    </div>\r\n    </div><div id="exportFiel"></div>\r\n  <div id="importFiel"></div>\r\n';
        var viewModel;
        var view = baseview.extend({
            tpl: tpl,
            rendertype: common.rendertype,
            setTemplate: function (el, tpl) {
                el.innerHTML = tpl;
                viewModel = this.viewModel;
            },
            baseData: {
                baseurl: "/base/customer-jurisdictions",
                excelurl: '/customerjurisdiction-excel',
                simpleList: new u.DataTable(model.options.metas.customerJurisdictionMeta),
                buttonSource: model.options.buttons.button1,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                dialogcardcomp: {},
                dialogcardSource: model.options.dialogs.dialog1,
                gridOption: model.options.grids.grid1,
            },
            events: {
                //清空搜索条件
                cleanSearch: function () {
                    viewModel.searchcomp.clearSearch();
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                search: function (reindex) {

                    var queryData = viewModel.searchcomp.getDataWithOpr
                        ? viewModel.searchcomp.getDataWithOpr()
                        : {};
                    $._ajax({
                        type: "get",
                        url:
                            appCtx + viewModel.baseurl,
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            var legend = [];
                            var categories = [];
                            var point = [];
                            var line = [];
                            var arr = data.content;
                            for (var i = 0; i < arr.length; i++) {
                                //当前节点客户是否已经录入节点
                                var flag1 = false
                                for (var j = 0; j < point.length; j++) {
                                    if (arr[i].customerName == point[j].name) {
                                        flag1 = true;
                                        break;
                                    }
                                }
                                if (!flag1) {
                                    var p = {
                                        type: "customer",
                                        symbol: 'image://../ocm-web/pages/base/customerjurisdictionschema/customer.png',
                                        name: arr[i].customerName,
                                        category: 0,
                                        draggable: true,
                                    }
                                    point.push(p);
                                }

                                //当前节点上级客户是否已经录入节点
                                if (arr[i].superiorCustomerName != null) {
                                    var flag2 = false
                                    for (var j = 0; j < point.length; j++) {
                                        if (arr[i].superiorCustomerName == point[j].name) {
                                            flag2 = true;
                                            break;
                                        }
                                    }
                                    if (!flag2) {
                                        var p = {
                                            type: "customer",
                                            symbol: 'image://../ocm-web/pages/base/customerjurisdictionschema/customer.png',
                                            name: arr[i].superiorCustomerName,
                                            category: 0,
                                            draggable: true,
                                        }
                                        point.push(p);
                                    }
                                }


                                //当前节点销售组织是否已经录入节点
                                if (arr[i].saleOrganizationName != null) {
                                    var flag3 = false
                                    for (var j = 0; j < point.length; j++) {
                                        if (arr[i].saleOrganizationName == point[j].name) {
                                            flag3 = true;
                                            break;
                                        }
                                    }
                                    if (!flag3) {
                                        var p = {
                                            type: "organization",
                                            symbol: 'image://../ocm-web/pages/base/customerjurisdictionschema/organization.png',
                                            name: arr[i].saleOrganizationName,
                                            category: 0,
                                            draggable: true,
                                        }
                                        point.push(p);
                                    }
                                }

                                if (arr[i].brandName != null) {
                                    //当前节点品牌是否已经录入节点
                                    var flag4 = false
                                    for (var j = 0; j < legend.length; j++) {
                                        if (arr[i].brandName == legend[j]) {
                                            flag4 = true;
                                            break;
                                        }
                                    }
                                    if (!flag4) {
                                        legend.push(arr[i].brandName);
                                        categories.push({
                                            name: arr[i].brandName,
                                        })
                                    }
                                }


                                //当前节点产品线是否已经录入节点
                                if (arr[i].productLineName != null) {
                                    var flag5 = false
                                    for (var j = 0; j < legend.length; j++) {
                                        if (arr[i].productLineName == legend[j]) {
                                            flag5 = true;
                                            break;
                                        }
                                    }
                                    if (!flag5) {
                                        legend.push(arr[i].productLineName);
                                        categories.push({
                                            name: arr[i].productLineName,
                                        })
                                    }
                                }
                            }
                            for (var i = 0; i < arr.length; i++) {
                                //定义一个line节点
                                var l = {};
                                for (var j = 0; j < point.length; j++) {
                                    if (arr[i].customerName == point[j].name) {
                                        l.source = j
                                    }
                                    if (arr[i].superiorCustomerName == point[j].name) {
                                        l.target = j
                                    }
                                    if (arr[i].saleOrganizationName == point[j].name) {
                                        l.target = j
                                    }
                                }

                                if (arr[i].brandName != null) {
                                    l.value = arr[i].brandName
                                } else if(arr[i].productLineName != null){
                                    l.value = arr[i].productLineName
                                }else{
                                    l.value = ""
                                }
                                line.push(l)
                            }

                            var option = {
                                title: {
                                    text: ''
                                },
                                tooltip: {},
                                animationDurationUpdate: 1500,
                                animationEasingUpdate: 'quinticInOut',
                                label: {
                                    normal: {
                                        show: true,
                                        textStyle: {
                                            fontSize: 12
                                        },
                                    }
                                },
                                legend: {
                                    x: "center",
                                    show: false,
                                    data: legend
                                },
                                series: [

                                    {
                                        type: 'graph',
                                        layout: 'force',
                                        symbolSize: 45,
                                        focusNodeAdjacency: true,
                                        edgeSymbol: ['none', 'arrow'],
                                        // edgeSymbolSize: [4, 50],
                                        roam: true,
                                        categories: categories,
                                        label: {
                                            normal: {
                                                show: true,
                                                textStyle: {
                                                    fontSize: 12
                                                },
                                                position: 'bottom'
                                            }
                                        },
                                        force: {
                                            repulsion: 1000
                                        },
                                        edgeLabel: {
                                            normal: {
                                                show: true,
                                                textStyle: {
                                                    fontSize: 10
                                                },
                                                formatter: "{c}"
                                            }
                                        },
                                        data: point,
                                        links: line,
                                        lineStyle: {
                                            normal: {
                                                opacity: 0.9,
                                                width: 1,
                                                curveness: 0
                                            }
                                        }
                                    }
                                ]
                            };
                            var myChart1 = echarts.init(document.getElementById("echarts1"));
                            myChart1.setOption(option);

                        }
                    });
                },
            },
            afterCreate: function () {
            }
        });

        return view;
    }
);
