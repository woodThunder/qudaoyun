define([
    "text!./goodsbomtree.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "/ocm-web/vendor/jquery.orgchart/js/jquery.orgchart.js"
], function (tpl, common, baseview, model) {
    "use strict";
    var viewModel;
    var view = baseview.extend({
        tpl: tpl,
        setTemplate: function (el, tpl) {
            el.innerHTML = tpl;
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: "/base/goods-boms",
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
        rendertype: common.rendertype,
        events: {},
        afterCreate: function () {
            // 处理从商品页面跳转过来的情况
            var url = window.location.href;
            var params = common.getParameter(url);
            var id = params.id;
            if (id) {
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/goods-bom-by-parent-good",
                    dataType: "json",
                    data: {
                        parentGoodId: id
                    },
                    success: function (data) {
                        if (!data || data.length < 1) {
                            $("#goodsbom-title")[0].innerHTML = "该商品无商品结构";
                            return;
                        }

                        function loop(arr) {
                            var arr1 = arr;
                            //初始化设置首选color为color1
                            var tempColor = 1;
                            for (var i = arr.length - 1; i >= 0; i--) {
                                for (var j = arr1.length - 1; j >= 0; j--) {
                                    //如果arr[i]是arr1的子节点
                                    if (arr[i].parentGoodsId == arr1[j].childGoodsId) {
                                        //如果该商品的父级没有子节点
                                        if (!arr1[j].children || arr1[j].children.length < 1) {
                                            arr1[j].children = [];
                                            arr1[i].className = viewModel.baseColorClass[tempColor] ?
                                                viewModel.baseColorClass[tempColor] : "defaultColor";
                                            tempColor++;
                                        } else {
                                            //如果该商品父级有子节点，则当前节点和父级的第一个子节点同颜色
                                            arr1[i].className = arr1[j].children[0].className;
                                        }
                                        arr1[j].children.push(arr1[i]);
                                        arr1.splice(i, 1);
                                        break;
                                    }
                                }
                            }
                            return arr1;
                        }

                        var datascource = {};
                        datascource.title = data[0].parentGoodsCode;
                        datascource.name = data[0].parentGoodsName;
                        datascource.className = "color0";
                        var goodsBomChildren = data[0].goodsBomChildren;
                        var arr = [];
                        for (var i = 0; i < goodsBomChildren.length; i++) {
                            arr.push({
                                "title": goodsBomChildren[i].childGoodsCode + " (" + goodsBomChildren[i].childGoodsQty +
                                ")",
                                "name": goodsBomChildren[i].childGoodsName,
                                "parentGoodsId": goodsBomChildren[i].parentGoodsId,
                                "childGoodsId": goodsBomChildren[i].childGoodsId
                            });
                        }
                        if (arr) {
                            var child = loop(arr);
                            datascource.children = child;
                        }

                        $("#goodsbom-title")[0].innerHTML = datascource.name + "商品结构";
                        $("#chart-container").orgchart({
                            "data": datascource,
                            "nodeContent": "title"
                        });
                    }
                });
            }
        }
    });
    return view;
});
