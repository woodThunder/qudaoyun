define(['ocm_common'], function(common) {
    'use strict';
    var afterCreate = function(viewModel) {
        //数量
        viewModel.purchaseItems.on("goodsNum.valuechange", function(obj) {
            if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
            }
            var arr = viewModel.purchaseItems.getSimpleData();
            var amount = [],
                amountMoney = [];
            var getSum = function(array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseFloat(array[i]);
                }
                return sum;
            }
            for (var i = 0; i < arr.length; i++) {
                if (!arr[i].goodsNum) {
                    arr[i].goodsNum = 0
                }
                if (!arr[i].amountMoney) {
                    arr[i].amountMoney = 0
                }
                var amountItem = parseFloat(arr[i].goodsNum);
                amount.push(amountItem);
                amountMoney.push(parseFloat(arr[i].amountMoney));
            }
            viewModel.purchaseList.getCurrentRow().setValue("totalGoodsNum", getSum(amount));
            viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(amountMoney));

            // viewModel.purchaseList.getCurrentRow().setValue("totalAmount", getSum(amount));

            //联动bom数量
            var parentGoodsId = obj.rowObj.getValue("goodsId");
            //获取全部bom信息
            var bomdata = viewModel.purchaseBomItems.getSimpleData();
            for (var i = 0; i < bomdata.length; i++) {
                var allrows = viewModel.purchaseBomItems.getAllRealRows();
                if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId) {
                    var bomAmount = bomdata[i].childGoodsQty * obj.newValue;
                    allrows[i].setValue("goodsNum", bomAmount)
                } else {
                    if (allrows[i].getValue("goodsId") === parentGoodsId && !(allrows[i].getValue("parentGoodsName"))) {
                        var amount = obj.newValue;
                        allrows[i].setValue("goodsNum", amount);
                    }
                }
            }
        });
        //单价
        viewModel.purchaseItems.on("unitPrice.valuechange", function(obj) {
            if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
            }
            var arr = viewModel.purchaseItems.getSimpleData();
            
            var amountMoney = [];
            var getSum = function(array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseFloat(array[i]);
                }
                return sum;
            }
            for (var i = 0; i < arr.length; i++) {
                if (!arr[i].amountMoney) {
                    arr[i].amountMoney = 0
                }
                amountMoney.push(parseFloat(arr[i].amountMoney));
            }
            viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(amountMoney));
        });
        //Bom数量变化联动总价
        viewModel.purchaseBomItems.on("goodsNum.valuechange", function(obj) {
            if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
            }
        });
        //单价
        viewModel.purchaseBomItems.on("unitPrice.valuechange", function(obj) {
            if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                viewModel.sumPrice(obj.rowObj);
            }
            var arr = viewModel.purchaseBomItems.getSimpleData();
            var price = [],
                bomprice = [];
            var getSum = function(array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseFloat(array[i]);
                }
                return sum;
            };
            for (var i = 0; i < arr.length; i++) {
                if (!arr[i].amountMoney) {
                    arr[i].amountMoney = 0
                }
                var amountMoney = parseFloat(arr[i].amountMoney)
                price.push(amountMoney);
            }
            // viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(price));

            // 计算反写商品行上面的值
            viewModel.backClac(obj, "unitPrice");

        });
        //Bom金额监听反算商品金额
        /* viewModel.purchaseBomItems.on("amountMoney.valuechange", function (obj) {
            viewModel.backClac(obj, "amountMoney");

            var arr = viewModel.purchaseBomItems.getSimpleData();
            var price = [];
            var getSum = function (array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseFloat(array[i]);
                }
                return sum;
            }
            for (var i = 0; i < arr.length; i++) {
                var amountMoney = parseFloat(arr[i].amountMoney ? arr[i].amountMoney : 0)
                price.push(amountMoney);
            }
            viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(price));
        }); */

        // 编辑地址信息开始
        if (viewModel.addresscardcomp.viewModel) {
            viewModel.addresscardcomp.viewModel.params.on("countryId.valuechange", function(obj) {
                var provinceValue = {
                    "EQ_areaLevel": "1"
                };
                $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
                var provinceId = viewModel.addresscardcomp.app.getComp("provinceIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("provinceId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                var rowObj = '中国',
                    preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                if (obj.oldValue != obj.newValue) {
                    if (!obj.rowObj.data.countryId.meta) {} else {
                        rowObj = obj.rowObj.data.countryId.meta.display
                    }
                    if (!preValue && rowObj) {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', rowObj + '/');
                    } else {
                        var preArr = preValue.split('/');
                        if (rowObj) {
                            preArr[0] = rowObj + '/';
                        } else {
                            preArr[0] = '';
                        }
                        preArr.splice(1, preArr.length - 1);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        cityId.setEnable(false);
                        districtId.setEnable(false);
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        provinceId.setEnable(false);
                    } else {
                        provinceId.setEnable(true);
                    }
                } else {
                    provinceId.setEnable(false);
                }
            });

            viewModel.addresscardcomp.viewModel.params.on("provinceId.valuechange", function(obj) {
                var provinceId = obj.newValue;
                var cityValue = {
                    "EQ_areaLevel": "2",
                    "EQ_parent.id": provinceId
                }
                $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
                var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    var rowObj = obj.rowObj.data.provinceId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 2) {
                        if (rowObj) {
                            preArr[1] = rowObj + '/';
                        } else {
                            preArr[1] = '';
                        }

                        preArr.splice(2, preArr.length - 2);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        districtId.setEnable(false);
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        cityId.setEnable(false);
                    } else {
                        cityId.setEnable(true);
                    }
                } else {
                    cityId.setEnable(false);
                }
            });

            viewModel.addresscardcomp.viewModel.params.on("cityId.valuechange", function(obj) {
                var cityId = obj.newValue;
                var countyValue = {
                    "EQ_areaLevel": "3",
                    "EQ_parent.id": obj.newValue
                };
                $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
                var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    var rowObj = obj.rowObj.data.cityId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 2) {
                        if (rowObj) {
                            preArr[2] = rowObj + '/';
                        } else {
                            preArr[2] = '';
                        }

                        preArr.splice(3, preArr.length - 3);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        districtId.setEnable(false);
                    } else {
                        districtId.setEnable(true);
                    }
                } else {
                    districtId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("districtId.valuechange", function(obj) {
                var districtId = obj.newValue;
                var townValue = {
                    "EQ_areaLevel": "4",
                    "EQ_parent.id": obj.newValue
                };
                $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
                var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    var rowObj = obj.rowObj.data.districtId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 3) {
                        if (rowObj) {
                            preArr[3] = rowObj + '/';
                        } else {
                            preArr[3] = '';
                        }
                        preArr.splice(4, preArr.length - 4);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        townId.setEnable(false);
                    } else {
                        townId.setEnable(true);
                    }
                } else {
                    townId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("townId.valuechange", function(obj) {
                var townId = obj.newValue;
                if (obj.oldValue != obj.newValue) {
                    var rowObj = obj.rowObj.data.townId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 4) {
                        preArr[4] = rowObj + '/';
                        preArr.splice(5, preArr.length - 5);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("receiveAddress.valuechange", function(obj) {
                var newAddr = obj.newValue;
                if (obj.oldValue != obj.newValue) {
                    var preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + newAddr);
                }
            });
            //编辑地址信息结束
            viewModel.purchaseItems.on("isGift.valuechange", function(obj) {
                var isGift = obj.newValue;
                var unitPriceOpt = viewModel.app.getComp("grid_purchase_complexItem").grid.getColumnByField("unitPrice");
                var currRow = viewModel.purchaseItems.getRowByRowId(obj.rowId);

                if (isGift == "1") {
                    currRow.setValue("amountMoney", 0);
                    unitPriceOpt.options.editable = false;
                } else {

                    var goodsNum = currRow.getValue("goodsNum");
                    var unitPrice = currRow.getValue("unitPrice");
                    currRow.setValue("amountMoney", parseFloat(goodsNum) * parseFloat(unitPrice));
                    unitPriceOpt.options.editable = true;
                }
                var arr = viewModel.purchaseItems.getSimpleData();
                var amountMoney = [];
                var getSum = function(array) {
                    var sum = 0;
                    for (var i = 0; i < array.length; i++) {
                        sum += parseFloat(array[i]);
                    }
                    return sum;
                }
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i].amountMoney) {
                        arr[i].amountMoney = 0
                    }
                    amountMoney.push(parseFloat(arr[i].amountMoney));
                }
                viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(amountMoney));
                //联动bom勾选
                var parentGoodsId = obj.rowObj.getValue("goodsId");
                var parentRowNum = obj.rowObj.getValue("rowNum");

                //获取全部bom信息
                var bomdata = viewModel.purchaseBomItems.getSimpleData();
                for (var i = 0; i < bomdata.length; i++) {
                    var allrows = viewModel.purchaseBomItems.getAllRealRows();
                    if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                        allrows[i].setValue("isGift", obj.newValue);
                    }
                }
            });
            //bom z赠品
            viewModel.purchaseBomItems.on("isGift.valuechange", function(obj) {
                var isGift = obj.newValue;
                var currRow = viewModel.purchaseBomItems.getRowByRowId(obj.rowId);
                if (isGift == "1") {
                    currRow.setValue("amountMoney", 0);
                } else {
                    var goodsNum = currRow.getValue("goodsNum");
                    var unitPrice = currRow.getValue("unitPrice");
                    currRow.setValue("amountMoney", parseFloat(goodsNum) * parseFloat(unitPrice));
                }
            });
        }
        //库存组织
        viewModel.purchaseItems.on("receiveStorageOrgId.valuechange", function(obj) {
            var displayName = obj.rowObj.data.receiveStorageOrgId.meta ?
                obj.rowObj.data.receiveStorageOrgId.meta.display : "";
            obj.rowObj.setValue("receiveStorageOrgId", obj.newValue);
            obj.rowObj.setValue("receiveStorageOrgName", displayName);
            var curRow = viewModel.purchaseItems.getCurrentRow();
            var stockOrgId = curRow.getValue("receiveStorageOrgId");
            obj.rowObj.parent.meta.receiveStorageId.refparam =
                '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}';
            if (obj.newValue != obj.oldValue) {
                viewModel.purchaseItems.setValue("receiveStorageId", "");
            }
            //给bom赋值
            var parentGoodsId = obj.rowObj.getValue("goodsId");
            var bomdata = viewModel.purchaseBomItems.getSimpleData();
            for (var i = 0; i < bomdata.length; i++) {
                var allrows = viewModel.purchaseBomItems.getAllRealRows();
                var receiveStorageOrgId = obj.newValue;
                if (allrows[i].getValue("goodsId") === parentGoodsId || allrows[i].getValue("parentGoodsId") === parentGoodsId) {
                    allrows[i].setValue("receiveStorageOrgId", receiveStorageOrgId);
                }
            }

        });

        // //需求库存组织
        // viewModel.purchaseItems.on("demandStockOrgId.valuechange", function(obj) {
        //   var curRow = viewModel.purchaseItems.getCurrentRow();
        //   obj.rowObj.setValue("receiveStorageOrgId",viewModel.purchaseItems.getValue("demandStockOrgId"));
        //   obj.rowObj.setValue("receiveStorageOrgName",obj.rowObj.data.demandStockOrgId.meta.display);
        //   var stockOrgId = curRow.getValue("receiveStorageOrgId");
        //   obj.rowObj.parent.meta.receiveStorageId.refparam =
        //     '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}';
        //   if (obj.newValue != obj.oldValue) {
        //     viewModel.purchaseItems.setValue("receiveStorageId", "");
        //   }
        // });
        // //需求库存组织
        // viewModel.purchaseBomItems.on("demandStockOrgId.valuechange", function(obj) {
        //   var curRow = viewModel.purchaseBomItems.getCurrentRow();
        //   obj.rowObj.setValue("receiveStorageOrgId",viewModel.purchaseBomItems.getValue("demandStockOrgId"));
        //   obj.rowObj.setValue("receiveStorageOrgName",obj.rowObj.data.demandStockOrgId.meta.display);
        //   var stockOrgId = curRow.getValue("receiveStorageOrgId");
        //   obj.rowObj.parent.meta.receiveStorageId.refparam =
        //     '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}';
        //   if (obj.newValue != obj.oldValue) {
        //     viewModel.purchaseBomItems.setValue("receiveStorageId", "");
        //   }
        // });

        // 根据交易类型判断表体行说活库存组织是否可编辑
        viewModel.purchaseList.off("tranTypeId.valuechange").on("tranTypeId.valuechange", function(obj) {
            var tranType = viewModel.purchaseList.getValue("tranTypeId");
            var allItems = viewModel.purchaseItems.getAllRows();
            //DirectPurchase ：直运采购 GeneralPurchase ：普通采购
            var receiveStorageOrgOpt = viewModel.app.getComp("grid_purchase_complexItem").grid.getColumnByField("receiveStorageOrgId");
            if (tranType === "GeneralPurchase") {
                receiveStorageOrgOpt.options.editable = true;
                receiveStorageOrgOpt.options.editOptions.required = true;
            } else {
                receiveStorageOrgOpt.options.editable = false;
                receiveStorageOrgOpt.options.editOptions.required = false;
                allItems.forEach(function(item) {
                    item.setValue("receiveStorageOrgId", "");
                    item.setMeta("receiveStorageOrgId", "display", '');
                });
            };
            var grid = viewModel.app.getComp("grid_purchase_complexItem").grid;
            grid.repaintGridDivs();
        });
        viewModel.purchaseList.off("orderDate.valuechange").on("orderDate.valuechange", function(obj) {
            var purchaseOrgId = viewModel.purchaseList.getValue("purchaseOrgId");
            var supplierId = viewModel.purchaseList.getValue("supplierId");
            if (obj.newValue && purchaseOrgId && supplierId) {
                var itemBomList = viewModel.purchaseBomItems.getRealSimpleData();
                var itemListBomRows = viewModel.purchaseBomItems.getAllRealRows();
                var ids = itemBomList.map(function(item){
                    return item.goodsId;
                })
                var data = {
                    supplier: supplierId,
                    purchaseOrg: purchaseOrgId,
                    purchaseDate: obj.newValue,
                    ids: ids.join(',')
                }
                $._ajax({
					type: "POST",
                    url: window.pathMap.purchase + '/purchase/prices/get-by-param',
                    data: data,
					success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            for (var key in data[i]) {
                                for (var j = 0; j < itemListBomRows.length; j++) {
                                    var goodsNum = itemListBomRows[j].getValue("goodsNum");
                                    if (key == itemListBomRows[j].getValue("goodsId")) {
                                        itemListBomRows[j].setValue("unitPrice", data[i][key] ? data[i][key] : 0);
                                        itemListBomRows[j].setValue("amountMoney", data[i][key] * goodsNum);
                                    }
                                }
                            }
                        }
					}
				});
            }
        });
        viewModel.purchaseList.on("purchaseOrgId.valuechange", function(obj) {
            var supplierId = viewModel.purchaseList.getValue("supplierId");
            var orderDate = viewModel.purchaseList.getValue("orderDate");
            if (obj.newValue && orderDate && supplierId) {
                var itemBomList = viewModel.purchaseBomItems.getRealSimpleData();
                var itemListBomRows = viewModel.purchaseBomItems.getAllRealRows();
                var ids = itemBomList.map(function(item){
                    return item.goodsId;
                })
                var data = {
                    supplier: supplierId,
                    purchaseOrg: obj.newValue,
                    purchaseDate: orderDate,
                    ids: ids.join(',')
                }
                $._ajax({
					type: "POST",
                    url: window.pathMap.purchase + '/purchase/prices/get-by-param',
                    data: data,
					success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            for (var key in data[i]) {
                                for (var j = 0; j < itemListBomRows.length; j++) {
                                    var goodsNum = itemListBomRows[j].getValue("goodsNum");
                                    if (key == itemListBomRows[j].getValue("goodsId")) {
                                        itemListBomRows[j].setValue("unitPrice", data[i][key] ? data[i][key] : 0);
                                        itemListBomRows[j].setValue("amountMoney", data[i][key] * goodsNum);
                                    }
                                }
                            }
                        }
					}
				});
            }
        });
        viewModel.purchaseList.on("supplierId.valuechange", function(obj) {
            var purchaseOrgId = viewModel.purchaseList.getValue("purchaseOrgId");
            var orderDate = viewModel.purchaseList.getValue("orderDate");
            if (obj.newValue && purchaseOrgId && orderDate) {
                var itemBomList = viewModel.purchaseBomItems.getRealSimpleData();
                var itemListBomRows = viewModel.purchaseBomItems.getAllRealRows();
                var ids = itemBomList.map(function(item){
                    return item.goodsId;
                })
                var data = {
                    supplier: obj.newValue,
                    purchaseOrg: purchaseOrgId,
                    purchaseDate: orderDate,
                    ids: ids.join(',')
                }
                $._ajax({
					type: "POST",
                    url: window.pathMap.purchase + '/purchase/prices/get-by-param',
                    data: data,
					success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            for (var key in data[i]) {
                                for (var j = 0; j < itemListBomRows.length; j++) {
                                    var goodsNum = itemListBomRows[j].getValue("goodsNum");
                                    if (key == itemListBomRows[j].getValue("goodsId")) {
                                        itemListBomRows[j].setValue("unitPrice", data[i][key] ? data[i][key] : 0);
                                        itemListBomRows[j].setValue("amountMoney", data[i][key] * goodsNum);
                                    }
                                }
                            }
                        }
					}
				});
            }
        });

        //批次号 货位 批号 供应商 项目 库存状态 客户
        viewModel.purchaseItems.on("valuechange", function(obj) {
            if (obj.field === "batchNumId" ||
                obj.field === "goodsPositionId" ||
                obj.field === "goodsVersion" ||
                obj.field === "batchCodeId" ||
                obj.field === "supplierId" ||
                obj.field === "projectId" ||
                obj.field === "stockStateId" ||
                obj.field === "demandStockOrgId" ||
                obj.field === "receiveStorageOrgId" ||
                obj.field === "receiveStorageId"
            ) {
                viewModel.setValueToBom(obj);
            }
        });
    }
    return afterCreate;
});