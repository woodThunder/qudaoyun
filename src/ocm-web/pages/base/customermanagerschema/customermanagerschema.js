define(
    [
        "text!./customermanagerschema.html",
        './meta.js',
        "ocm_common",
        "ocm_baseview",
        "/ocm-web/vendor/echarts/echarts.js",
    ],
    function (tpl, model, common, baseview, echarts) {
        "use strict";
        var viewModel;
        var view = baseview.extend({
            tpl: tpl,
            rendertype: common.rendertype,
            setTemplate: function (el, tpl) {
                el.innerHTML = tpl;
                viewModel = this.viewModel;
            },
            baseData: {
                baseurl: '/base/customer-managers',
                searchcomp: {},
                searchSource: model.options.searchs.search1,
            },
            events: {
                //清空搜索条件
                cleanSearch: function () {
                    viewModel.searchcomp.clearSearch();
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                search: function () {
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
                                    if (arr[i].customerName === point[j].name) {
                                        flag1 = true;
                                        break;
                                    }
                                }
                                if (!flag1) {
                                    var p = {
                                        type: "customer",
                                        symbol: 'image://../ocm-web/pages/base/customermanagerschema/customer.png',
                                        name: arr[i].customerName,
                                        category: 0,
                                        draggable: true,
                                    }
                                    point.push(p);
                                }

                                //当前节点上级客户是否已经录入节点
                                if (arr[i].mgtCustomerName != null) {
                                    var flag2 = false
                                    for (var j = 0; j < point.length; j++) {
                                        if (arr[i].mgtCustomerName === point[j].name) {
                                            flag2 = true;
                                            break;
                                        }
                                    }
                                    if (!flag2) {
                                        var p = {
                                            type: "customer",
                                            symbol: 'image://../ocm-web/pages/base/customermanagerschema/customer.png',
                                            name: arr[i].superiorCustomerName,
                                            category: 0,
                                            draggable: true,
                                        }
                                        point.push(p);
                                    }
                                }


                                //当前节点销售组织是否已经录入节点
                                if (arr[i].mgtOrganizationName != null) {
                                    var flag3 = false
                                    for (var j = 0; j < point.length; j++) {
                                        if (arr[i].mgtOrganizationName === point[j].name) {
                                            flag3 = true;
                                            break;
                                        }
                                    }
                                    if (!flag3) {
                                        var p = {
                                            type: "organization",
                                            symbol: 'image://../ocm-web/pages/base/customermanagerschema/organization.png',
                                            name: arr[i].mgtOrganizationName,
                                            category: 0,
                                            draggable: true,
                                        }
                                        point.push(p);
                                    }
                                }
                            }
                            for (var i = 0; i < arr.length; i++) {
                                //定义一个line节点
                                var l = {};
                                for (var j = 0; j < point.length; j++) {
                                    if (arr[i].customerName === point[j].name) {
                                        l.source = j
                                    }
                                    if (arr[i].mgtCustomerName === point[j].name) {
                                        l.target = j
                                    }
                                    if (arr[i].mgtOrganizationName === point[j].name) {
                                        l.target = j
                                    }
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
