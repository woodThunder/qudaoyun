define(['ocm_common'], function (common) {
    'use strict';
    var prom = function (viewModel) {

        return {
            showProm: function (promData, orderItems) {
                viewModel.promGiftOrderItems.removeAllRows();
                viewModel.promOrderItems.removeAllRows();
                viewModel.promGiftOrderItems.off("orderNum.valuechange").on("orderNum.valuechange", function (obj) {
                    var currRow = viewModel.promGiftOrderItems.getRowByRowId(obj.rowId);
                    var giftItem = currRow.getSimpleData();
                    if (parseFloat(obj.newValue) > parseFloat(giftItem.goodsAmout)) {
                        toastr.warning("不能大于赠品数量，请重新输入！");
                        currRow.setValue("orderNum", '0');
                        return;
                    }
                });
                for (var z = 0; z < promData.reqOrderItems.length; z++) {
                    for (var i = 0; i < orderItems.length; i++) {
                        if (promData.reqOrderItems[z].goodsId == orderItems[i].goodsId) {
                            promData.reqOrderItems[z].goodsCode = orderItems[i].refrel_goodsId_code;
                            promData.reqOrderItems[z].goodsName = orderItems[i].refrel_goodsId_name;
                            break;
                        }
                    }
                }
                viewModel.promGIftOrderItems = promData.giftProms;
                viewModel.promGIftOrder = []
                if (viewModel.promGIftOrderItems) {
                    viewModel.promGIftOrderItems.forEach(function (giftItem) {
                        viewModel.promGIftOrder = viewModel.promGIftOrder.concat(giftItem.giftDtos);
                    })
                }


                $("#dialog_promGIftOrderItems .adapter_search input").val('');
                $("#dialog_promGIftOrderItems .promDescription").html('');
                $("#dialog_promGIftOrderItems .promOrdertotalamount").html('');
                if (!viewModel.promGiftOrderDialog) {
                    viewModel.promGiftOrderDialog = u.dialog({
                        id: "dialog_promGIftOrderItems",
                        content: "#dialog_promGIftOrderItems",
                        hasCloseMenu: true,
                        width: "1200px"
                    });
                    var closefunc = function () {
                        viewModel.promOrderItems.removeAllRows();
                        viewModel.promGiftOrderDialog.close();
                    };
                    var cancelButton = $("#dialog_promGIftOrderItems .J-cancel");
                    var closeButton = $("#dialog_promGIftOrderItems .u-msg-close");
                    var submitButton = $("#dialog_promGIftOrderItems .J-ok");
                    var giftSearchButton = $("#dialog_promGIftOrderItems .adapter_search_btn");
                    cancelButton.off().on("click", closefunc);
                    closeButton.off().on("click", closefunc);
                    submitButton.off().on("click", function () {
                        var giftSelectRows = viewModel.promGiftOrderItems.getSelectedRows();
                        var giftSelectDatas = giftSelectRows.map(function (item) {
                            return item.getSimpleData();
                        });
                        for (var i = 0; i < giftSelectDatas.length; i++) {
                            for (var z = 0; z < viewModel.reqorderPromData.giftProms.length; z++) {
                                for (var k = 0; k < viewModel.reqorderPromData.giftProms[z].giftDtos.length; k++) {
                                    if (giftSelectDatas[i].goodsId == viewModel.reqorderPromData.giftProms[z].giftDtos[k].goodsId) {
                                        viewModel.reqorderPromData.giftProms[z].giftDtos[k].goodsAmout = giftSelectDatas[i].orderNum;
                                        viewModel.reqorderPromData.giftProms[z].giftDtos[k].isSelectedGiftRow = true;
                                        break;
                                    }
                                }
                            }
                        }
                        for (var i = 0; i < viewModel.reqorderPromData.giftProms.length; i++) {
                            var giftList = viewModel.reqorderPromData.giftProms[i].giftDtos;
                            var dtos = [];
                            for (var z = 0; z < giftList.length; z ++) {
                                if (giftList[z].isSelectedGiftRow) {
                                    dtos.push(giftList[z])
                                }
                            }
                            viewModel.reqorderPromData.giftProms[i].giftDtos = dtos;
                        }
                        viewModel.promSuccess(viewModel.reqorderPromData);
                        viewModel.promGiftOrderDialog.close();
                    });
                    giftSearchButton.off().on("click", function () {
                        var keyWord = $.trim($("#dialog_promGIftOrderItems .adapter_search input").val());
                        var selectRows = viewModel.promOrderItems.getSelectedRows();
                        if (selectRows.length == 0) return;
                        var selectData = selectRows.map(function (item) {
                            return item.getSimpleData();
                        })
                        var radio = $(".promStyleRadio .is-checked");
                        var style = "";
                        if (radio.length > 0) {
                            for(var i = 0; i < radio.length; i ++) {
                                style += $(radio[i]).attr("radioname") + ",";
                            }
                            var promData = {
                                style: [style.substr(0, style.length - 1)],
                                selectData: selectData
                            }
                            viewModel.getPromotionInfo(promData, function (data) {
                                var promGiftOrder = viewModel.promGiftOrderItems.getRealSimpleData().filter(function (item) {
                                    return (item.goodsCode.indexOf(keyWord) != -1 || item.goodsName.indexOf(keyWord) != -1);
                                });
                                viewModel.promGiftOrderItems.setSimpleData(promGiftOrder, {
                                    unSelect: true
                                });
                            });
                        }
                    });
                } else {
                    viewModel.promGiftOrderDialog.show();
                }
                viewModel.promOrderItems.setSimpleData(promData.reqOrderItems, {
                    unSelect: true
                })
                if (promData && promData.mutualRelationShip.length > 0) {
                    var radioTpm = promData.mutualRelationShip.map(function (item, index) {
                        return (
                            '<div class="groupMutal">' +
                            item.map(function (mutual) {
                                var styleName = "买赠-基于商品（数量／金额）";
                                if (mutual == 2) {
                                    styleName = "降价-基于商品（数量／金额）";
                                } else if (mutual == 3) {
                                    styleName = "买赠-基于订单金额";
                                } else if (mutual == 4) {
                                    styleName = "降价-基于订单金额";
                                }
                                return (
                                    '<label class="u-radio margin-right-15 is-upgraded" radioName="' + mutual + '" >' +
                                    '<input type="radio" class="u-radio-button" name="belongGroupId' + index + '">' +
                                    '<span class="u-radio-label">' + styleName + '</span>' +
                                    '<span class="u-radio-outer-circle"></span>' +
                                    '<span class="u-radio-inner-circle"></span>' +
                                    '</label>'
                                )
                            }).join('') +
                            '</div>'
                        )
                    });
                    bindRadio($('.promStyleRadio').html(radioTpm));
                    function bindRadio($el) {
                        $el.off().on('click', '.u-radio', function () {
                            var self = this;
                            if ($(self).hasClass('is-checked')) {
                                $(self).removeClass('is-checked').siblings().removeClass('is-checked');
                                viewModel.promGiftOrderItems.removeAllRows();
                            } else {
                                var selectRows = viewModel.promOrderItems.getSelectedRows();
                                if (selectRows && selectRows.length > 0) {
                                    var selectData = selectRows.map(function (item) {
                                        return item.getSimpleData()
                                    })
                                    var promData = {
                                        style: [$(self).attr("radioname")],
                                        selectData: selectData
                                    }
                                    viewModel.getPromotionInfo(promData, function (data) {
                                        $(self).addClass('is-checked').siblings().addClass('is-checked');
                                        $(self).parent().siblings().find('.u-radio').removeClass('is-checked');
                                    })
                                } else {
                                    $(self).addClass('is-checked').siblings().addClass('is-checked');
                                    $(self).parent().siblings().find('.u-radio').removeClass('is-checked');
                                }
                            }
                            return false;
                        });
                    }
                }
            },
            getPromotionInfo: function (promData, callback) {
                var customerId = viewModel.salesorderCard.getValue("customerId");
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                var postdata = {
                    customerId: customerId,
                    saleOrgId: saleOrgId,
                    isPrimaryChannel: 1,
                    reqOrderItems: promData.selectData,
                    promotionStyle: promData.style
                };
                $._ajax({
                    url: window.pathMap.b2b + "/b2b/prom/reqorder-prom",
                    type: "post",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(postdata),
                    success: function (res) {
                        viewModel.promGIftOrder = [];
                        if (res.giftProms && res.giftProms.length > 0) {
                            var promDescription = "";
                            res.giftProms.forEach(function (giftItem) {
                                promDescription += giftItem.description;
                                viewModel.promGIftOrder = viewModel.promGIftOrder.concat(giftItem.giftDtos);
                            })
                            $("#dialog_promGIftOrderItems .promDescription").html(promDescription);
                        }
                        viewModel.promGiftOrderItems.setSimpleData(viewModel.promGIftOrder, {
                            unSelect: true
                        });
                        viewModel.reqorderPromData = res;
                        if (typeof callback == "function") callback(res);
                    }
                });
            },
            promRowSelected: function (obj) {
                var selectRows = viewModel.promOrderItems.getSelectedRows();
                var totalAmount = 0;
                var selectData = selectRows.map(function (item) {
                    totalAmount += parseFloat(item.getValue("dealAmount"));
                    return item.getSimpleData();
                })
                var radio = $(".promStyleRadio .is-checked");
                var style = "";
                if (radio.length > 0) {
                    for(var i = 0; i < radio.length; i ++) {
                        style += $(radio[i]).attr("radioname") + ",";
                    }
                    var promData = {
                        style: [style.substr(0, style.length - 1)],
                        selectData: selectData
                    }
                    viewModel.getPromotionInfo(promData)
                }

                var currency = JSON.parse(localStorage.getItem("_A_P_currency"));
                totalAmount = new u.NumberFormater(currency.currencyAmountScale || 2).format(totalAmount);
                $(".promOrdertotalamount").html("整单金额：" + totalAmount);
            },
            promRowUnSelected: function (obj) {
                var selectRows = viewModel.promOrderItems.getSelectedRows();
                var totalAmount = 0;
                if (selectRows.length == 0) {
                    viewModel.promGiftOrderItems.removeAllRows();
                    $("#dialog_promGIftOrderItems .promDescription").html('');
                } else {
                    var selectData = selectRows.map(function (item) {
                        totalAmount += parseFloat(item.getValue("dealAmount"));
                        return item.getSimpleData();
                    })
                    var radio = $(".promStyleRadio .is-checked");
                    var style = "";
                    if (radio.length > 0) {
                        for(var i = 0; i < radio.length; i ++) {
                            style += $(radio[i]).attr("radioname") + ",";
                        }
                        var promData = {
                            style: [style.substr(0, style.length - 1)],
                            selectData: selectData
                        }
                        viewModel.getPromotionInfo(promData)
                    }
                }
                var currency = JSON.parse(localStorage.getItem("_A_P_currency"));
                totalAmount = new u.NumberFormater(currency.currencyAmountScale || 2).format(totalAmount);
                $(".promOrdertotalamount").html("整单金额：" + totalAmount);
            },
            promSuccess: function (res) {
                var SearchpromAfter = viewModel.saleOrderItems.getSimpleData();
                viewModel.SearchpromAfter = SearchpromAfter.filter(function (item) {
                    return item.dr != 1;
                });
                var SearchpromAfterBom = viewModel.batchSaleOrderBomItems.getSimpleData()
                viewModel.SearchpromAfterBom = SearchpromAfterBom.filter(function (bom) {
                    return bom.dr != 1;
                });
                var itemData = viewModel.saleOrderItems.getSimpleData().filter(function (item) {
                    return item.dr != 1;
                });
                var itemBomData = viewModel.batchSaleOrderBomItems.getSimpleData().filter(function (item) {
                    return item.dr != 1;
                });
                var reqOrderItems = res.reqOrderItems;
                var giftProms = res.giftProms;
                // 存储促销活动信息
                var reqOrderPromRels = [];
                // 存储全局的赠品信息
                viewModel.giftProms = res.giftProms;
                // 整单赠送
                viewModel.orderPriceProm = res.orderPriceProm;
                var orderPriceProm = res.orderPriceProm;

                // 清空当前行数据，把后台返回数据插入
                var itemRow = viewModel.saleOrderItems.getAllRealRows();
                var bomRow = viewModel.batchSaleOrderBomItems.getAllRealRows();
                viewModel.saleOrderItems.removeAllRows();
                viewModel.batchSaleOrderBomItems.removeAllRows();
                itemRow.forEach(function (item) {
                    item.setValue("dr", 1);
                });
                bomRow.forEach(function (item) {
                    item.setValue("dr", 1);
                });
                // 重新计算总金额
                var cardTotalAmount = 0, // 表头总金额
                    promAmount = 0;
                // 遍历item数据，把促销后的金额赋值
                for (var j = 0; j < itemData.length; j++) {
                    var rowNum = itemData[j].rowNum,
                        goodsId = itemData[j].goodsId;
                    for (var i = 0; i < reqOrderItems.length; i++) {
                        var reqRowNum = reqOrderItems[i].rowNum,
                            reqRGoodsId = reqOrderItems[i].goodsId;
                        if (reqRowNum == rowNum && reqRGoodsId == goodsId) {
                            itemData[j].basePrice = reqOrderItems[i].basePrice;
                            itemData[j].promPrice = reqOrderItems[i].promPrice;
                            itemData[j].promAmount = reqOrderItems[i].promAmount;
                            itemData[j].salePrice = reqOrderItems[i].salePrice;
                            itemData[j].dealPrice = reqOrderItems[i].dealPrice;
                            // 根据返回的促销价重新计算成交金额
                            var promAmountTemp = (parseFloat(reqOrderItems[i].promPrice || "0") || parseFloat(reqOrderItems[i].salePrice || "0")) * reqOrderItems[i].mainNum || 0;
                            var dealAmountTemp = promAmountTemp - parseFloat(reqOrderItems[i].promAmount || "0");
                            itemData[j].dealAmount = dealAmountTemp;
                            itemData[j].amount = reqOrderItems[i].amount;

                            // 促销信息名称 id
                            var itemPriceProm = reqOrderItems[i].reqOrderPromRels;
                            var activityId = "",
                                activityName = "";
                            if (itemPriceProm) {
                                itemPriceProm.forEach(function (item) {
                                    activityId += item.activityId + ',';
                                    activityName += item.activityName + ',';;
                                    item.optGoodsId = reqRGoodsId;
                                    reqOrderPromRels.push(item);
                                });
                            }
                            // 整单促销信息
                            if (orderPriceProm && orderPriceProm.activityName) {
                                activityId += orderPriceProm.activityId + ',';
                                activityName += orderPriceProm.activityName + ',';
                            }
                            itemData[j].promotinId = activityId.substr(0, activityId.length - 1);
                            itemData[j].promotinName = activityName.substr(0, activityName.length - 1);
                            // 表头总促销金额，总金额
                            cardTotalAmount += parseFloat(reqOrderItems[i].amount);
                            // 计算降价促销
                            var pricePromAmout = (reqOrderItems[i].salePrice - reqOrderItems[i].promPrice) * reqOrderItems[i].mainNum;
                            promAmount += (parseFloat(reqOrderItems[i].promAmount || "0") + parseFloat(pricePromAmout || "0"));
                        }
                    }
                }
                viewModel.reqOrderPromRels = reqOrderPromRels;
                // 渲染总金额、促销折扣额
                viewModel.salesorderCard.setValue("totalAmount", cardTotalAmount);
                viewModel.salesorderCard.setValue("promAmount", promAmount);
                if ((giftProms && giftProms.length > 0) || (orderPriceProm && orderPriceProm.length > 0) || (res.reqOrderItems && res.reqOrderItems.length > 0)) {
                    viewModel.isSearchprom = 1;
                    viewModel.costFreezeEvent(true, 1);
                }
                if (giftProms && giftProms.length > 0) {
                    var cardTotaAmount = 0;
                    for (var i = 0; i < giftProms.length; i++) {
                        var _activityName = giftProms[i].activityName;
                        var giftDtos = giftProms[i].giftDtos;
                        giftDtos.forEach(function (item) {
                            item.promotinId = giftProms[i].activityId;
                            item.promotinName = giftProms[i].activityName || _activityName;
                            item.originalGoodsId = viewModel.fillOriginalGoodsId(item);
                            item.isGift = 1;
                            cardTotaAmount += parseFloat(item.salePrice) * parseFloat(item.goodsAmout)
                        });
                        for (var z = 0; z < giftDtos.length; z++) {
                            giftDtos[z].promotinId = giftProms[i].activityId;
                            giftDtos[z].promotinName = giftProms[i].activityName || _activityName;
                            var rowNum = viewModel.generaterowNum();

                            if (giftProms[i].promWay == 1) {
                                giftDtos[z].dealPrice = "0";
                                giftDtos[z].dealAmount = "0";
                                giftDtos[z].mainNum = giftDtos[z].goodsAmout;
                                giftDtos[z].orderNum = "0";
                                giftDtos[z].planDeliveryDate = new Date().getTime();
                            }
                            var newrow = viewModel.saleOrderItems.createEmptyRow({
                                unSelect: true
                            });
                            giftDtos[z].orderNum = giftDtos[z].goodsAmout / giftDtos[z].conversionRate;
                            var goodsId = giftDtos[z].goodsId;
                            delete giftDtos[z].goodsId;
                            newrow.setSimpleData(giftDtos[z]);
                            newrow.setValue("salePrice", giftDtos[z].salePrice);
                            newrow.setValue("refrel_goodsId_code", giftDtos[z].goodsCode);
                            newrow.setValue("refrel_goodsId_name", giftDtos[z].goodsName);
                            newrow.setValue("refshowcontent_promotinId_name", giftDtos[z].promotinName);
                            newrow.setValue("rowNum", rowNum);
                            newrow.setValue("goodsId", goodsId);
                            newrow.setValue("isGift", 1);
                            newrow.setValue("mainNum", giftDtos[z].goodsAmout);
                            newrow.setValue("orderNum", giftDtos[z].orderNum);
                            newrow.setValue("orderNumUnitId", giftDtos[z].orderNumUnitId);
                            newrow.setValue("mainNumUnitId", giftDtos[z].mainNumUnitId);
                            newrow.setValue("settleFinancialOrgId", giftDtos[z].settleFinancialOrgId);
                            newrow.setValue("deliveryInvOrgId", giftDtos[z].consignInventoryOrgId);
							newrow.setValue("refshowcontent_deliveryInvOrgId_name", giftDtos[z].consignInventoryOrgName);
                            newrow.setValue("refshowcontent_goodsId_name", giftDtos[z].goodsName);
                            newrow.setValue("refshowcontent_mainNumUnitId_name", giftDtos[z].mainNumUnitName);
                            newrow.setValue("refshowcontent_orderNumUnitId_name",giftDtos[z].orderNumUnitName);
                            newrow.setValue("refshowcontent_productLineId_name", giftDtos[z].productLineName);
                            newrow.setValue("refshowcontent_settleFinancialOrgId_name", giftDtos[z].settleFinancialOrgName);
                            giftDtos[z].goodsId = goodsId;
                            var grossWeight = giftDtos[z].weight;
                            var netWeight = giftDtos[z].netWeight;
                            var volume = giftDtos[z].volume;

							var rowWeight = giftDtos[z].goodsAmout * parseFloat(grossWeight || "0") || 0;
							var rowVolume = giftDtos[z].goodsAmout * parseFloat(volume || "0") || 0;
                            var rowNetWeight = giftDtos[z].goodsAmout * parseFloat(netWeight || "0") || 0;
                            
							newrow.setValue("rowWeight", rowWeight);
							newrow.setValue("rowVolume", rowVolume);
							newrow.setValue("rowNetWeight", rowNetWeight);

                            // 更改总数量
                            var totalnum = parseFloat(viewModel.salesorderCard.getValue("totalNum")) + parseFloat(giftDtos[z].goodsAmout);
                            viewModel.salesorderCard.setValue("totalNum", totalnum);
                            //bom产品信息的添加
                            var bomdata = viewModel.findBomByParentId(
                                giftDtos[z].goodsId
                            );
                            if (bomdata && bomdata.length > 0) {
                                var bomItem = bomdata[0].goodsBomChildren;
                                for (var j = 0; j < bomItem.length; j++) {
                                    var bomrows = viewModel.batchSaleOrderBomItems.createEmptyRow();
                                    bomrows.setSimpleData(newrow.getSimpleData(), {
                                        status: "new"
                                    });
                                    var parentRowNum = rowNum;
                                    var bomRowNum = viewModel.generateBomrowNum();

                                    var parentGoodsId = bomrows.getValue("goodsId");
                                    var parentGoodsName = bomrows.getValue("refrel_goodsId_name");
                                    var parentGoodsCode = bomrows.getValue("goodsCode");
                                    bomrows.setValue("isGift", 1);
                                    bomrows.setValue("rowNum", bomRowNum);
                                    bomrows.setValue("parentRowNum", parentRowNum);
                                    bomrows.setValue("parentGoodsId", parentGoodsId);
                                    bomrows.setValue("parentGoodsName", parentGoodsName);
                                    bomrows.setValue("mainNum", "");
                                    bomrows.setValue("goodsId", bomItem[j].childGoodsId);
                                    bomrows.setValue("version", bomItem[j].childGoodsVersion);
                                    bomrows.setValue("orderNumUnitId", bomItem[j].childGoodsUnitId);
                                    bomrows.setValue("orderNum", bomItem[j].childGoodsQty);
                                    bomrows.setValue("childGoodsQty", bomItem[j].childGoodsQty);
                                    bomrows.setValue("mainNum", giftDtos[z].goodsAmout * bomItem[j].childGoodsQty);
                                    bomrows.setValue("orderNum", (giftDtos[z].goodsAmout / giftDtos[z].conversionRate) * bomItem[j].childGoodsQty);
                                    bomrows.setValue("refshowcontent_goodsId_name", giftDtos[z].goodsName);
                                    bomrows.setValue("refshowcontent_mainNumUnitId_name", giftDtos[z].mainNumUnitName);
                                    bomrows.setValue("refshowcontent_orderNumUnitId_name", giftDtos[z].orderNumUnitName);

                                    cpRow.setValue("refshowcontent_parentGoodsId_name", parentGoodsName);
                                    cpRow.setValue("refrel_parentGoodsId_name", parentGoodsName);
                                    cpRow.setValue("refrel_parentGoodsId_code", parentGoodsCode);
                                    cpRow.setValue("refrel_goodsId_name", giftDtos[z].goodsName);
                                    cpRow.setValue("refrel_goodsId_code", giftDtos[z].goodsCode);
                                }
                            } else {
                                var parentRowNum = rowNum;
                                var bomRowNum = viewModel.generateBomrowNum();
                                var cpRow = viewModel.batchSaleOrderBomItems.createEmptyRow();
                                cpRow.setSimpleData(newrow.getSimpleData(), {
                                    status: "new"
                                });
                                var parentGoodsId = cpRow.getValue("goodsId");
                                var parentGoodsName = cpRow.getValue("refrel_goodsId_name") || cpRow.getValue("goodsName");
                                cpRow.setValue("parentGoodsId", parentGoodsId);
                                cpRow.setValue("parentRowNum", parentRowNum);
                                cpRow.setValue("refshowcontent_parentGoodsId_name", parentGoodsName);
                                cpRow.setValue("refrel_parentGoodsId_name", parentGoodsName);
                                cpRow.setValue("refrel_parentGoodsId_code", parentGoodsCode);
                                cpRow.setValue("refshowcontent_goodsId_name", parentGoodsName);
                                cpRow.setValue("refrel_goodsId_name", parentGoodsName);
                                cpRow.setValue("refrel_goodsId_code", parentGoodsCode);

                                cpRow.setValue("refshowcontent_mainNumUnitId_name", newrow.getValue("refshowcontent_mainNumUnitId_name"));
                                cpRow.setValue("refshowcontent_orderNumUnitId_name", newrow.getValue("refshowcontent_orderNumUnitId_name"));
                                var getRow = viewModel.batchSaleOrderBomItems.getSimpleData();
                                getRow.forEach(function (item) {
                                    item.persistStatus = "new";
                                });
                            }
                        }
                    }
                    setTimeout(function() {
                        viewModel.findCarrierData();
                        if (viewModel.SysParams_stock) {
                            setTimeout(function() {
                                viewModel.findByWarehouse();
                            }, 0);
                        }
                        // 合计表头总原金额
                        cardTotaAmount += parseFloat(viewModel.salesorderCard.getValue("totalAmount"));
                        viewModel.salesorderCard.setValue("totalAmount", cardTotaAmount);
                    }, 100)
                }
                itemBomData.map(function (item) {
                    var newrow = viewModel.batchSaleOrderBomItems.createEmptyRow({
                        unSelect: true
                    });
                    newrow.setSimpleData(item);
                    newrow.setValue("refshowcontent_goodsId_name", item.refshowcontent_goodsId_name);
					newrow.setValue("refshowcontent_mainNumUnitId_name", item.refshowcontent_mainNumUnitId_name);
                    newrow.setValue("refshowcontent_orderNumUnitId_name", item.refshowcontent_orderNumUnitId_name);
                });
                for (var key = 0; key < itemData.length; key++) {
                    var newrow = viewModel.saleOrderItems.createEmptyRow({
                        unSelect: true
                    });
                    var goodsId = itemData[key].goodsId;
                    var orderNum = itemData[key].orderNum;
                    delete itemData[key].goodsId;
                    delete itemData[key].orderNum;
                    newrow.setSimpleData(itemData[key]);
					newrow.setValue("goodsId", goodsId);
					newrow.setValue("refshowcontent_promotinId_name", itemData[key].promotinName);
					newrow.setValue("refshowcontent_deliveryInvOrgId_name", itemData[key].refshowcontent_deliveryInvOrgId_name);
					newrow.setValue("refshowcontent_goodsId_name", itemData[key].refshowcontent_goodsId_name);
					newrow.setValue("refshowcontent_mainNumUnitId_name", itemData[key].refshowcontent_mainNumUnitId_name);
					newrow.setValue("refshowcontent_orderNumUnitId_name", itemData[key].refshowcontent_orderNumUnitId_name);
					newrow.setValue("refshowcontent_productLineId_name", itemData[key].refshowcontent_productLineId_name);
                    newrow.setValue("refshowcontent_settleFinancialOrgId_name", itemData[key].refshowcontent_settleFinancialOrgId_name);
                    newrow.setValue("isGift", itemData[key].isGift);
					newrow.setValue("orderNum", orderNum);
                }
                viewModel.setMaxPreferentialMoney(viewModel.salesorderCard, "prom");
                // 计算促销优惠金额
                var offsetAmount = parseFloat(viewModel.salesorderCard.getValue("offsetAmount") || "0");
                setTimeout(function() {
					viewModel.computeHeadDataInfo();
                    var totalGoodsSuppleAmount = parseFloat(viewModel.salesorderCard.getValue("totalGoodsSuppleAmount") || "0");
                    var totalPromAmout = parseFloat(viewModel.salesorderCard.getValue("totalAmount") || "0") - parseFloat(viewModel.salesorderCard.getValue("totalDealAmount") || "0") - offsetAmount - totalGoodsSuppleAmount;
                    viewModel.salesorderCard.setValue("promAmount", totalPromAmout);
                }, 10)
                // setTimeout(function() {
                //     viewModel.editTemplate.updateExtendData();
                // }, 1000)
            }
        }

    }
    return prom;
});