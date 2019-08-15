define([
    'text!./organizationchart.html',
    'ocm_common',
    'ocm_baseview',
    './meta.js',
    "/ocm-web/vendor/jquery.orgchart/js/jquery.orgchart.js"
], function (
    tpl,
    common, baseview, model) {
        'use strict'
        var viewModel;
        var view = baseview.extend({
            tpl: tpl,
            rendertype: common.rendertype,
            setTemplate: function (el, tpl) {
                el.innerHTML = tpl;
                viewModel = this.viewModel;
            },
            model: model,
            baseData: {
                baseurl: '/base/org-func-rels',
                simpleList: new u.DataTable(model.options.metas.orgfuncrefmeta),
                buttonSource: model.options.buttons.button1,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                baseColorClass: [
                    "color0",
                    "color1",
                    "color2",
                    "color3",
                    "color4",
                    "color5",
                    "color6",
                    "color7",
                    "color8",
                    "color9"
                ]
            },
            events: {
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                search: function () {
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    
                    var param = {}
                    param.funcId = queryData["search_EQ_orgFunc.id"]?queryData["search_EQ_orgFunc.id"]:"";
                    param.depth = '3';
                    param.enable = '1'
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.baseurl + '/find-tree-node',
                        dataType: "json",
                        data: param,
                        success: function (data) {
                            var root = []
                            // var data = result.content;
                            //寻找根节点
                            for (var i = 0; i < data.length; i++) {
                                //当前节点是否是根节点      
                                var flag1 = true;
                                for (var j = 0; j < data.length; j++) {
                                    if (data[i].parentId == data[j].id) {
                                        flag1 = false;
                                    }
                                }
                                if (flag1) {
                                    //当前节点是否已录入
                                    var flag2 = false;
                                    for (var j = 0; j < root.length; j++) {
                                        if (data[i].id == root[j].id) {
                                            flag2 = true;
                                        }
                                    }
                                    if (!flag2) {
                                        var node = {
                                            type: "organization-func",
                                            id: data[i].id,
                                            code: data[i].code,
                                            name: data[i].name,
                                            'relationship': data[i].relationship,
                                            children: []
                                        }
                                        root.push(node)
                                    }

                                }
                            }
                            var tempColorIndex = 0
                            function loop(data, arr) {
                                tempColorIndex++
                                for (var i = 0; i < data.length; i++) {
                                    for (var j = 0; j < arr.length; j++) {
                                        if (arr[j].parentId == data[i].id) {
                                            var node = {
                                                type: "organization-func",
                                                id: arr[j].id,
                                                code: arr[j].code,
                                                name: arr[j].name,
                                                children: [],
                                                'relationship': arr[j].relationship,
                                                className: viewModel.baseColorClass[tempColorIndex] ? viewModel.baseColorClass[tempColorIndex] : "defaultColor"
                                            }
                                            data[i].children.push(node)
                                        }
                                    }
                                    if (data[i].children && data[i].children.length > 0) {
                                        loop(data[i].children, arr);
                                    }
                                }
                            }
                            loop(root, data);
                            var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                            var funcId = ""
                            if(queryData["search_EQ_orgFunc.id"]){
                                funcId = queryData["search_EQ_orgFunc.id"]
                            }
                            var ajaxURLs = {
                                'children': function(nodeData) {
                                    return appCtx + viewModel.baseurl + '/findChildren?nodeId=' + nodeData.id + "&funcId=" + funcId;
                                  },
                                'parent': '/orgchart/parent/',
                                'siblings': function(nodeData) {
                                  return '/orgchart/siblings/' + nodeData.id;
                                },
                                'families': function(nodeData) {
                                  return '/orgchart/families/' + nodeData.id;
                                }
                              };

                            var dataSource = { type: "organization-func", 'relationship': '001',name: "组织", children: root, className: "color0" }
                            $("#chart-container")[0].innerHTML = ""
                            $("#chart-container").orgchart({
                                "data": dataSource,
                                'ajaxURL': ajaxURLs,
                                // 'direction': 'l2r',
                                "nodeContent": "code"
                            });
                        /*   for (var i = 0; i < data.length; i++) {
                                //在未选择只能情况下，同一节点有可能在图上出现多次（如，a节点既是b的销售下级，又是行政根节点）
                                for (var j = 0; j < $(".org_" + data[i].organizationId).length; j++) {
                                    //下方代码是详情页面中给图中组织增加跳转方法
                                    var params = {
                                        id: data[i].organizationId
                                    }
                                    var hrefValue = "index-view.html?" + common.toUrlParam(params) + "#/organization";
                                    var detailfun = "data-bind=click:showOrganization.bind($data," + 0 + ")";
                                    $(".org_" + data[i].organizationId)[j].innerHTML =
                                        '<a style="color:#fff" href=' + hrefValue + ' value="organization" name="组织" class="ui-a-detail" ' +
                                        detailfun +
                                        ">" +
                                        data[i].organizationName + "</a>";
                                    ko.cleanNode($(".org_" + data[i].organizationId)[j]);
                                    ko.applyBindings(viewModel, $(".org_" + data[i].organizationId)[j]);
                                }
                            }*/
                        }
                    })
                },
                showOrganization: function (index, viewModel, e) {
                    e.preventDefault();
                    parent.handleClick(e, 1);
                },
                //清空搜索条件
                cleanSearch: function () {
                    viewModel.searchcomp.clearSearch();
                },
            },

            afterCreate: function () {
                //viewModel.search();
            }
        });

        return view;
    });
