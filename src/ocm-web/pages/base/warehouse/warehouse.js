define(["ocm_simpleview", "./meta.js", "text!./warehouse.html"], function (simpleview, model, tpl) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        tpl: tpl,
        model: model,
        baseData: {
            dialogWidth: "900px",
            baseurl: "/base/warehouses",
            adminurl: "/base/administrative-divisions",
            simpleList: new u.DataTable(model.options.metas.WareHousemeta),
            statusField: "isEnable",
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            detailSource: model.options.details.detail1,
            gridOption: model.options.grids.grid1,
            //是否启用
            enableFmt: ko.pureComputed(function () {
                var status = viewModel.simpleList.ref("isEnable")();
                var statusName;
                if (status == 0) {
                    (statusName = "未启用");
                }
                if (status == 1) {
                    (statusName = "已启用");
                }
                if (status == 2) {
                    (statusName = "已停用");
                }
                return statusName;
            }),
            //是否冻结
            isFrozenFmt: ko.pureComputed(function () {
                var status = viewModel.simpleList.ref("isFrozen")();
                var statusName;
                if (status == 0) {
                    (statusName = "否");
                }
                if (status == 1) {
                    (statusName = "是");
                }
                return statusName;
            }),
            //货位管理
            ifSlotManageFmt: ko.pureComputed(function () {
                var status = viewModel.simpleList.ref("ifSlotManage")();
                var statusName;
                if (status == 0) {
                    (statusName = "否");
                }
                if (status == 1) {
                    (statusName = "是");
                }
                return statusName;
            }),
            //进行成本计算
            ifCalcInventoryCostFmt: ko.pureComputed(function () {
                var status = viewModel.simpleList.ref("ifCalcInventoryCost")();
                var statusName;
                if (status == 0) {
                    (statusName = "否");
                }
                if (status == 1) {
                    (statusName = "是");
                }
                return statusName;
            })
        },
        events: u.extend({}, simpleview.prototype.events, {
            beforeEdit: function (index, rowId) {
                if ($("#l-map").length == 0) {
                    var mapSearch = document.createElement("div");
                    mapSearch.id = "s-map";
                    var map = document.createElement("div");
                    map.id = "l-map";
                    // var result = document.createElement("div");
                    // result.id = "r-result"
                    $(".u-msg-content")[0].append(mapSearch, map);
                    // $(".u-msg-content")[0].append(result);
                    $("#s-map").append($("<input id = \"search-input\" />"));
                    $("#s-map").append($("<button id=\"search-button\" >搜 索</button>"));
                    //直接在上一行div上写data-bind click不生效
                    $("#search-button").click(function (e) {
                        local.search($("#search-input")[0].value);
                    });
                    //回车事件
                    $("#search-input").keydown(function (e) {
                        if (e.keyCode == 13) {
                            local.search($("#search-input")[0].value);
                        }
                    });

                    // 百度地图API功能
                    var map = new BMap.Map("l-map"); // 创建Map实例
                    viewModel.map = map;
                    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
                    map.enableScrollWheelZoom(true);
                    var local = new BMap.LocalSearch(map, {
                        renderOptions: {
                            map: map,
                            panel: "r-result"
                        },
                        onSearchComplete: function (results) {
                            var result = local.getResults();
                            $._ajax({
                                type: "get",
                                dataType: "json",
                                url: appCtx + viewModel.adminurl + "/find-by-name",
                                data: {
                                    "name": result.city
                                },
                                success: function (data) {
                                    if (data.nodeLevel === 1) {
                                        // 直辖市
                                        var queryData = {};
                                        queryData["search_EQ_parent.id"] = data.id;
                                        $._ajax({
                                            type: "get",
                                            dataType: "json",
                                            url: appCtx + viewModel.adminurl,
                                            data: queryData,
                                            success: function (list) {
                                                var city = list.content[0];
                                                // 设置一个标识，用于省份修改后事件，不然会导致，此处设置好省市，省份修改后事件中，会再次清除市
                                                viewModel.selectCountryInMap = true;
                                                viewModel.selectProvinceInMap = true;
                                                viewModel.selectCityInMap = true;
                                                viewModel.selectCountyInMap = true;
                                                // viewModel.dialogcardcomp.viewModel.params.setValue("countryId", "");
                                                viewModel.dialogcardcomp.viewModel.params.setValue("countryId",
                                                    city.countryId);
                                                // viewModel.dialogcardcomp.viewModel.params.setValue("provinceId", "");
                                                viewModel.dialogcardcomp.viewModel.params.setValue("provinceId",
                                                    city.parentId);
                                                // viewModel.dialogcardcomp.viewModel.params.setValue("cityId", "");
                                                viewModel.dialogcardcomp.viewModel.params.setValue("cityId", city.id);
                                            }
                                        });
                                    } else if (data.nodeLevel === 2) {
                                        // 普通市
                                        viewModel.selectCountryInMap = true;
                                        viewModel.selectProvinceInMap = true;
                                        viewModel.selectCityInMap = true;
                                        viewModel.selectCountyInMap = true;
                                        viewModel.dialogcardcomp.viewModel.params.setValue("countryId", data.countryId);
                                        viewModel.dialogcardcomp.viewModel.params.setValue("provinceId", data.parentId);
                                        viewModel.dialogcardcomp.viewModel.params.setValue("cityId", data.id);
                                    } else if (data.nodeLevel === 3) {
                                        // 区/县
                                        viewModel.selectCountryInMap = true;
                                        viewModel.selectProvinceInMap = true;
                                        viewModel.selectCityInMap = true;
                                        viewModel.selectCountyInMap = true;
                                        viewModel.dialogcardcomp.viewModel.params.setValue("countryId", data.countryId);
                                        viewModel.dialogcardcomp.viewModel.params.setValue("cityId", data.parentId);
                                        viewModel.dialogcardcomp.viewModel.params.setValue("countyId", data.id);

                                        var queryData = {};
                                        queryData["search_EQ_id"] = data.parentId;
                                        $._ajax({
                                            type: "get",
                                            dataType: "json",
                                            url: appCtx + viewModel.adminurl,
                                            data: queryData,
                                            success: function (data) {
                                                var city = data.content[0];
                                                viewModel.dialogcardcomp.viewModel.params.setValue("provinceId",
                                                    city.parentId);
                                            }
                                        });
                                    }
                                }
                            });
                            // var markers = map.getOverlays();
                            // var markers = results.Br;
                            // for (var i = markers.length - 1; i >= 0; i--) {
                            //     if (markers[i].point == null) {
                            //         //删除默认的搜索弹出框
                            //         // markers.splice(i,1);
                            //         continue;
                            //     }
                            //     if (markers[i].Cb != null) {
                            //         //删除自己创建的弹出框
                            //         // markers.splice(i,1);
                            //         continue;
                            //     }
                            //     markers[i].addEventListener("click", showInfo);
                            // }
                            map.addEventListener("addoverlay", addoverlay);

                        }
                    });
                    viewModel.local = local;

                    //禁用默认选择第一个查询结果
                    local.disableFirstResultSelection();

                    function openInfoWindowListener() {
                        $("#map-win-ok").click(function (e) {
                            viewModel.dialogcardcomp.viewModel.params.setValue("longitude", viewModel.point.lng);
                            viewModel.dialogcardcomp.viewModel.params.setValue("latitude", viewModel.point.lat);
                            viewModel.infoWindow.close();
                        });
                        $("#map-win-cancel").click(function (e) {
                            viewModel.infoWindow.close();
                        });
                    }

                    //当前点击节点，用于点击另外点时，将此点删除
                    var tempPoint;

                    //点击地图任意点事件
                    function showInfo(e) {
                        // alert(e.point.lng + ", " + e.point.lat);
                        // map.openInfoWindow(infoWindow, map.getCenter());
                        map.removeOverlay(tempPoint);
                        var sContent = "";
                        //判断是否是自动锚点，且此值为锚点id
                        if (tempPointFixed) {
                            var gR = local.getResults();
                            var result = gR.Ar;
                            for (var i = 0; i < result.length; i++) {
                                if (tempPointFixed == result[i].marker.ba) {
                                    sContent =
                                        "<h4 style=\"margin:0 0 5px 0;padding:0.2em 0\">确定要选择这个地点吗？</h4>" +
                                        "<p>地点：" + result[i].title + "</p>" + "<p>                 地址：" +
                                        result[i].address + "</p>" +
                                        "<p>经度：" + e.point.lng + "</p>" + "<p>                 纬度：" + e.point.lat +
                                        "</p>" +
                                        "<button id=\"map-win-ok\">确定</button>&nbsp;<button id=\"map-win-cancel\">取消</button>" +
                                        "</div>";
                                    break;
                                }
                            }
                            tempPointFixed = undefined;
                        } else {
                            var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat)); // 创建点
                            map.addOverlay(marker);
                            tempPoint = marker;
                            sContent =
                                "<h4 style=\"margin:0 0 5px 0;padding:0.2em 0\">确定要选择这个地点吗？</h4>" +
                                "<p>经度：" + e.point.lng + "</p>" + "<p>                 纬度：" + e.point.lat + "</p>" +
                                "<button id=\"map-win-ok\">确定</button>&nbsp;<button id=\"map-win-cancel\">取消</button>" +
                                "</div>";
                        }
                        var infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
                        //监听窗口打开事件
                        infoWindow.addEventListener("open", openInfoWindowListener);
                        viewModel.infoWindow = infoWindow;
                        viewModel.point = e.point;
                        map.openInfoWindow(infoWindow, e.point);
                    }

                    //当前点击的自动锚点，点击不为自动锚点时为undefined，用于传id值和判断是否为自动锚点
                    var tempPointFixed;

                    //点击地图搜索后自动锚点事件
                    // （若在此事件中写提示框，提示框优先级低于自带提示框，不显示，因此在此处只添加一个标识，标识点击的是锚点。此事件触发后仍会触发点击地图事件，地图事件弹框会替换掉自动弹框，并删除当前点击节点为自动锚点的标识）
                    function clickPoint(e) {
                        // alert(e.point.lng + ", " + e.point.lat);
                        // map.openInfoWindow(infoWindow, map.getCenter());
                        // map.removeOverlay(tempPoint);
                        // var ssContent =
                        //   "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>确定要选择这个地点吗？</h4>" +
                        //   "<p>经度：" + e.point.lng + "</p>" + "<p>                 纬度：" + e.point.lat + "</p>" +
                        //   "<button >确定</button>&nbsp<button >取消</button>" +
                        //   "</div>";
                        // var infoWindow = new BMap.InfoWindow(ssContent);  // 创建信息窗口对象
                        // map.openInfoWindow(infoWindow, e.point);
                        tempPointFixed = e.target.ba;
                    }

                    function addoverlay(type, target) {
                        type.target.addEventListener("click", clickPoint);
                    }

                    map.addEventListener("click", showInfo);
                }

                var title;
                viewModel.index = index;
                if (u.isNumber(index)) {
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                    if (currentData.longitude != undefined && currentData.latitude != undefined) {
                        var marker = new BMap.Marker(new BMap.Point(currentData.longitude, currentData.latitude)); // 创建点
                        viewModel.map.addOverlay(marker);
                        viewModel.map.setCenter({
                            lng: currentData.longitude,
                            lat: currentData.latitude
                        });
                    }
                    viewModel.rowId = rowId;
                    viewModel.dialogcardcomp.seteidtData(currentData);
                } else {
                    title = "新增";
                    //清空编辑框的信息
                    viewModel.dialogcardcomp.cleareidt();
                }
                //显示模态框
                viewModel.dialogWidth ?
                    viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit, true) :
                    viewModel.dialogcardcomp.show(title, "500px", viewModel.edit, true);
            },

            frozen: function () {
                //启用
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function (row, index, arr) {
                        return row.getValue("id");
                    });
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-frozen",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isFrozen", "1");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            unfrozen: function () {
                //启用
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function (row, index, arr) {
                        return row.getValue("id");
                    });
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-unfrozen",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function (res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isFrozen", "0");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            }
        }),
        afterCreate: function () {
            // 基本信息
            var inventoryOrg = viewModel.dialogcardcomp.app.getComp("inventoryOrgId");
            var ownerCustomer = viewModel.dialogcardcomp.app.getComp("ownerCustomerId");
            var ownerSupplier = viewModel.dialogcardcomp.app.getComp("ownerSupplierId");
            // inventoryOrg.element.parentElement.hidden = true;
            // ownerCustomer.element.parentElement.hidden = true;
            // ownerSupplier.element.parentElement.hidden = true;
            //修改仓库权属，改变所属组织、客户、供应商的必填和显隐
            viewModel.dialogcardcomp.viewModel.params.on("warehouseOwnershipCode.valuechange", function (obj) {
                var inventoryOrg = viewModel.dialogcardcomp.app.getComp("inventoryOrgId");
                var ownerCustomer = viewModel.dialogcardcomp.app.getComp("ownerCustomerId");
                var ownerSupplier = viewModel.dialogcardcomp.app.getComp("ownerSupplierId");
                // inventoryOrg.element.parentElement.hidden = true;
                // ownerCustomer.element.parentElement.hidden = true;
                // ownerSupplier.element.parentElement.hidden = true;
                inventoryOrg.setRequired(false);
                inventoryOrg.validate.required = false;
                ownerCustomer.setRequired(false);
                ownerCustomer.validate.required = false;
                ownerSupplier.setRequired(false);
                ownerSupplier.validate.required = false;
                var html = "<span class=\"ui-redstar\">*</span>";
                if (obj.newValue == 1) {
                    inventoryOrg.setEnable(true);
                    inventoryOrg.setValue("");
                    // inventoryOrg.element.parentElement.hidden = false;

                    inventoryOrg.setRequired(true);
                    inventoryOrg.validate.required = true;
                    inventoryOrg.setEnable(true);
                    ownerCustomer.setRequired(false);
                    ownerCustomer.validate.required = false;
                    ownerCustomer.setEnable(false);
                    ownerSupplier.setRequired(false);
                    ownerSupplier.validate.required = false;
                    ownerSupplier.setEnable(false);
                    inventoryOrg.validate.nullMsg = "不能为空！";
                    if (inventoryOrg.element.parentElement.children[0].innerHTML.indexOf("*") == -1) {
                        html += inventoryOrg.element.parentElement.children[0].innerHTML;
                    } else {
                        html = inventoryOrg.element.parentElement.children[0].innerHTML;
                    }
                    inventoryOrg.element.parentElement.children[0].innerHTML = html;
                    if (ownerCustomer.element.parentElement.children[0].children[0]) {
                        ownerCustomer.element.parentElement.children[0].children[0].innerHTML = "";
                    }
                    if (ownerSupplier.element.parentElement.children[0].children[0]) {
                        ownerSupplier.element.parentElement.children[0].children[0].innerHTML = "";
                    }
                }
                if (obj.newValue == 2) {
                    ownerCustomer.setEnable(true);
                    ownerCustomer.setValue("");
                    // ownerCustomer.element.parentElement.hidden = false;

                    inventoryOrg.setRequired(false);
                    inventoryOrg.validate.required = false;
                    inventoryOrg.setEnable(false);
                    ownerCustomer.setRequired(true);
                    ownerCustomer.validate.required = true;
                    ownerCustomer.setEnable(true);
                    ownerSupplier.setRequired(false);
                    ownerSupplier.validate.required = false;
                    ownerSupplier.setEnable(false);
                    ownerCustomer.validate.nullMsg = "不能为空！";
                    if (ownerCustomer.element.parentElement.children[0].innerHTML.indexOf("*") == -1) {
                        html += ownerCustomer.element.parentElement.children[0].innerHTML;
                    } else {
                        html = ownerCustomer.element.parentElement.children[0].innerHTML;
                    }
                    ownerCustomer.element.parentElement.children[0].innerHTML = html;
                    if (inventoryOrg.element.parentElement.children[0].children[0]) {
                        inventoryOrg.element.parentElement.children[0].children[0].innerHTML = "";
                    }
                    if (ownerSupplier.element.parentElement.children[0].children[0]) {
                        ownerSupplier.element.parentElement.children[0].children[0].innerHTML = "";
                    }
                }
                if (obj.newValue == 3) {
                    ownerSupplier.setEnable(true);
                    ownerSupplier.setValue("");
                    // ownerSupplier.element.parentElement.hidden = false;

                    inventoryOrg.setRequired(false);
                    inventoryOrg.validate.required = false;
                    inventoryOrg.setEnable(false);
                    ownerCustomer.setRequired(false);
                    ownerCustomer.validate.required = false;
                    ownerCustomer.setEnable(false);
                    ownerSupplier.setRequired(true);
                    ownerSupplier.validate.required = true;
                    ownerSupplier.setEnable(true);
                    ownerSupplier.validate.nullMsg = "不能为空！";
                    if (ownerSupplier.element.parentElement.children[0].innerHTML.indexOf("*") == -1) {
                        html += ownerSupplier.element.parentElement.children[0].innerHTML;
                    } else {
                        html = ownerSupplier.element.parentElement.children[0].innerHTML;
                    }
                    ownerSupplier.element.parentElement.children[0].innerHTML = html;
                    if (ownerCustomer.element.parentElement.children[0].children[0]) {
                        ownerCustomer.element.parentElement.children[0].children[0].innerHTML = "";
                    }
                    if (inventoryOrg.element.parentElement.children[0].children[0]) {
                        inventoryOrg.element.parentElement.children[0].children[0].innerHTML = "";
                    }
                }
            });

            viewModel.dialogcardcomp.viewModel.params.on("countryId.valuechange", function (obj) {
                var provinceValue = {
                    "EQ_country.id": obj.newValue,
                    "EQ_areaLevel": 1,
                    "EQ_isEnable": 1
                };
                $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
                var provinceId = viewModel.app.getComp("provinceIdBase");
                if (viewModel.selectCountryInMap == true) {
                    viewModel.selectCountryInMap = false;
                } else {
                    viewModel.dialogcardcomp.viewModel.params.setValue("provinceId", "");
                }
            });

            //基本信息   省、城市、区县、街道四级联动
            viewModel.dialogcardcomp.viewModel.params.on("provinceId.valuechange", function (obj) {
                var cityValue = {
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": 2,
                    "EQ_isEnable": 1
                };
                $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
                var cityId = viewModel.app.getComp("cityIdBase");
                //如果是map中选择后带回的province，则不操作
                if (viewModel.selectProvinceInMap == true) {
                    viewModel.selectProvinceInMap = false;
                } else {
                    viewModel.dialogcardcomp.viewModel.params.setValue("cityId", "");
                    $("#search-input")[0].value = $("#provinceIdinfo")[0].childNodes[0].value;
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("cityId.valuechange", function (obj) {
                var countyValue = {
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": 3,
                    "EQ_isEnable": 1
                };
                $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
                var countyId = viewModel.app.getComp("countyIdBase");
                // 如果是map中选择后带回的city，则不带回搜索框
                if (viewModel.selectCityInMap == true) {
                    viewModel.selectCityInMap = false;
                } else {
                    viewModel.dialogcardcomp.viewModel.params.setValue("countyId", "");
                    $("#search-input")[0].value = $("#cityIdinfo")[0].childNodes[0].value;
                }
            });
            viewModel.dialogcardcomp.viewModel.params.on("countyId.valuechange", function (obj) {
                //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
                //       a["EQ_parent.id"]=obj.newValue;
                var townValue = {
                    "EQ_parent.id": obj.newValue,
                    "EQ_areaLevel": 4,
                    "EQ_isEnable": 1
                };
                $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
                var townId = viewModel.app.getComp("townIdBase");
                // 如果是map中选择后带回的county，则不带回搜索框
                if (viewModel.selectCountyInMap == true) {
                    viewModel.selectCountyInMap = false;
                    viewModel.dialogcardcomp.viewModel.params.setValue("townId", "");
                } else {
                    viewModel.dialogcardcomp.viewModel.params.setValue("townId", "");
                    $("#search-input")[0].value = $("#townIdinfo")[0].childNodes[0].value;
                }
            });

            viewModel.dialogcardcomp.viewModel.params.on("townId.valuechange", function (obj) {
                $("#search-input")[0].value = $("#townIdinfo")[0].childNodes[0].value;
            });

            viewModel.dialogcardcomp.viewModel.params.on("address.valuechange", function (obj) {

                var temp = "";
                if ($("#townIdinfo")[0].childNodes[0].value) {
                    temp = $("#townIdinfo")[0].childNodes[0].value;
                } else if ($("#countyIdinfo")[0].childNodes[0].value) {
                    temp = $("#countyIdinfo")[0].childNodes[0].value;
                } else if ($("#cityIdinfo")[0].childNodes[0].value) {
                    temp = $("#cityIdinfo")[0].childNodes[0].value;
                } else if ($("#provinceIdinfo")[0].childNodes[0].value) {
                    temp = $("#provinceIdinfo")[0].childNodes[0].value;
                }
                $("#search-input")[0].value = temp + $("#addressinfo")[0].childNodes[0].value;
            });

            (function () {
                window.BMap_loadScriptTime = (new Date).getTime();
                $("head").append(
                    $("<script type=\"text/javascript\" src=\"http://api.map.baidu.com/getscript?v=2.0&ak=52ae4ceed0c0be54be7eda4a122effcc&services=&t=20180925200301\"></script>"));
                // document.write('<script type="text/javascript"
                // src="http://api.map.baidu.com/getscript?v=2.0&ak=52ae4ceed0c0be54be7eda4a122effcc&services=&t=20180925200301"></script>');
            })();
        }
    });

    return view;
});