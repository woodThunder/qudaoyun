define(['ocm_common'], function (common) {
  'use strict';
  var events = function (viewModel, model, CONST) {
    return {
      // 设置账户列表精度
      setAccountScale: function() {
        // 账户列表
        viewModel.offsetList.setMeta(
          "accountBalance",
          "precision",
          viewModel.CURRENCY.amountPrecision
        ); // 账户余额
        viewModel.offsetList.setMeta(
          "currAccountBalance",
          "precision",
          viewModel.CURRENCY.amountPrecision
        ); // 本次可用余额
        viewModel.offsetList.setMeta(
          "offsetMoney",
          "precision",
          viewModel.CURRENCY.amountPrecision
        ); // 冲抵金额
        viewModel.offsetList.setMeta(
          "adjustOffsetMoney",
          "precision",
          viewModel.CURRENCY.amountPrecision
        ); // 调整金额
        // 已选账户列表
        viewModel.offsetSelectList.setMeta(
          "accountBalance",
          "precision",
          viewModel.CURRENCY.amountPrecision
        ); // 账户余额
        viewModel.offsetSelectList.setMeta(
          "currAccountBalance",
          "precision",
          viewModel.CURRENCY.amountPrecision
        ); // 本次可用余额
        viewModel.offsetSelectList.setMeta(
          "offsetMoney",
          "precision",
          viewModel.CURRENCY.amountPrecision
        ); // 冲抵金额
        viewModel.offsetSelectList.setMeta(
          "adjustOffsetMoney",
          "precision",
          viewModel.CURRENCY.amountPrecision
        ); // 调整金额
      },
      // 计算表体行促销后成交金额
      computeItemDealAmout: function(item) {
        /*
         * 促销后成交金额 = 促销价 * 主数量 - 促销金额(整单降价分摊)
         */
        var promAmount = (item.promPrice || item.salePrice) * item.mainNum || 0;
        var dealAmount = promAmount - parseFloat(item.promAmount || "0");
        return dealAmount || 0;
      },
      // 新增或编辑时清空费用冲抵信息
      addOrEditClearOffset: function(flag) {
        viewModel.offsetList.removeAllRows();
        viewModel.offsetSelectList.removeAllRows();
        viewModel.offsetDetailsList.removeAllRows();
        // 是否清空旧的冲抵关系（编辑修改时用）
        if(flag) {
          viewModel.offsetOldDetailsList.removeAllRows();
        }
        viewModel.offsetRelationGoods = {};
      },
      // 编辑时，查询订单商品行费用使用明细
      queryOffsetDetailsByOrderId: function(orderId) {
        $._ajax({
          url: window.pathMap.b2b + "/b2b/order/search-offset-detail",
          data: {
            orderId: orderId
          },
          contentType: "application/json;charset=UTF-8",
          type: "get",
          success: function(data) {
            if (data && data.length >0) {
              // 防止丢失费用、货补冲抵明细信息，在此补充
              var saleOrderRows = viewModel.saleOrderItems.getAllRows();
              data.forEach(function(item) {
                // 为货补商品行补充货补账户主键
                if(item.offsetType == 1) {
                  var findRow = saleOrderRows.find(function(row) {
                    return row.getValue("id") == item.orderItemId;
                  });
                  if(findRow) {
                    findRow.setValue("supplementAccountId", item.feeAccountId)
                  }
                // 后台未存储rowNum，前端补充，后续后台改进可移除该段代码
                } else {
                  var findRow = saleOrderRows.find(function(row) {
                    return row.getValue("id") == item.orderItemId;
                  });
                  if (findRow) {
                    item.rowNum = findRow.getValue("rowNum");
                  }
                }
              });
              data.forEach(function(item) {
                // 清空字段
                item.orderId = "";
                item.orderCode = "";
                item.orderItemId = "";
              });
            }
            viewModel.offsetDetailsList.setSimpleData(data || [], {
              unSelect: true
            });
            viewModel.offsetOldDetailsList.setSimpleData(data || [],  {
              unSelect: true
            });
          }
        });
      },
      // 保存时，封装商品行费用使用明细
      fillOrderItemsOffsetDetailOnSave: function(orderItems) {
        var offsetDetails = viewModel.offsetDetailsList.getSimpleData();
        if(offsetDetails && offsetDetails.length >0) {
          orderItems.forEach(function(item) {
            var key = item.goodsId + item.rowNum;
            var filterDetails = offsetDetails.filter(function(detail) {
              var tempKey = detail.goodsId + detail.rowNum;
              return key == tempKey;
            });
            if(filterDetails && filterDetails.length >0) {
              item.offsetDetailsDtoList = filterDetails;
            }
          });
        }
        // 货补商品，保存时，再封装费用使用明细
        orderItems.forEach(function(item) {
          if(item.goodsSupplement && item.goodsSupplement == 1) {
            var offsetDetails = [
              {
                rowNum: item.rowNum,
                goodsId: item.goodsId,
                feeAccountId: item.supplementAccountId,
                totalOffsetAmount: item.amount || 0,
                offsetType: 1
              }
            ];
            item.offsetDetailsDtoList = offsetDetails;
          }
        })
        return orderItems;
      },
      // 判断是否是可费用冲抵商品（普通商品行才能冲抵，赠品、货补430版不允许冲抵）
      ifOffsetGoods: function(data) {
        return data.dr != 1 && data.isGift !=1 && data.goodsSupplement !=1;
      },
      // 封装商品费用费用明细
      fillOffsetDetailData: function(orderItem, accountId, offsetAmount) {
        var offsetDetail = {
          rowNum: orderItem.rowNum,
          goodsId: orderItem.goodsId,
          feeAccountId: accountId,
          totalOffsetAmount: offsetAmount || 0,
          offsetType: 2
        }
        return offsetDetail;
      },
      // 计算商品行已冲抵金额
      computeGoodsOffsetMoney: function(orderItem) {
        var offsetDetails = viewModel.offsetDetailsList.getSimpleData();
        var key = orderItem.goodsId + orderItem.rowNum;
        // 获取商品已使用冲抵金额(过滤当前账户)
        var filterDetails = offsetDetails.filter(function(item) {
          var tempKey = item.goodsId + item.rowNum;
          return key == tempKey;
        });
        var usedOffsetMoney = 0;
        if(filterDetails && filterDetails.length >0) {
          usedOffsetMoney = filterDetails.reduce(function(total, curr) {
            return total += parseFloat(curr.totalOffsetAmount);
          }, 0)
        }
        return usedOffsetMoney;
      },
      // 返回商品行实际可使用当前账户余额
      computeCurrOffsetByGoods: function(orderItem, accountId, ratio) {
        var offsetDetails = viewModel.offsetDetailsList.getSimpleData();
        var key = orderItem.goodsId + orderItem.rowNum;
        // 获取商品已使用冲抵金额(过滤当前账户)
        var filterDetails = offsetDetails.filter(function(item) {
          var tempKey = item.goodsId + item.rowNum;
          return key == tempKey && item.feeAccountId != accountId;
        });
        var usedOffsetMoney = 0;
        if(filterDetails && filterDetails.length >0) {
          usedOffsetMoney = filterDetails.reduce(function(total, curr) {
            return total += parseFloat(curr.totalOffsetAmount);
          }, 0)
        }
        // 本次理论最大可用
        var dealAmount = viewModel.computeItemDealAmout(orderItem);
        var currMaxUseOffsetMoney = parseFloat(dealAmount * ratio / 100);
        // 本次实际可用
        var currRealUseOffsetMoney = currMaxUseOffsetMoney - usedOffsetMoney;
        if (currRealUseOffsetMoney < 0) {
          currRealUseOffsetMoney = 0;
        }
        return currRealUseOffsetMoney;
      },
      // 账户操作
      offsetOperation: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var operationStatus = obj.row.value["operationStatus"];
        var delfun =
            "data-bind=click:offsetDel.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          var updatefun =
            "data-bind=click:offsetUpdate.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
        var editfun =
            "data-bind=click:offsetSave.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
        var htmlContent = '<div class="ui-handle-icon">';
        if ("02" == operationStatus) {
          htmlContent += '<span class="ui-handle-word">' +
          '<a href="#" ' +
          updatefun +
          ' title="修改">修改</a>' +
          "</span>    ";
        } else {
          htmlContent += '<span class="ui-handle-word">' +
          '<a href="#" ' +
          editfun +
          ' title="保存">保存</a>' +
          "</span>    ";
          htmlContent += '<span class="ui-handle-word">' +
          '<a href="#" ' +
          delfun +
          ' title="删除">删除</a>' +
          "</span></div>";
        };
        obj.element.innerHTML = htmlContent;  
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      // 保存已选冲抵账户
      offsetSave: function(index, rowId) {
        if (typeof index == "number") {
          viewModel.offsetSelectList.setRowSelectbyRowId(rowId);
        }
        // 优先使用，防止触发列表监听事件
        viewModel.costFreezeEvent(true);
        var selectedRows = viewModel.offsetSelectList.getSelectedRows();
        for(var i=0; i< selectedRows.length; i++) {
          if (rowId == selectedRows[i].rowId) {
            var adjustOffsetMoney = parseFloat(selectedRows[i].getValue("adjustOffsetMoney") || "0");
            var preoffsetAmount = parseFloat(selectedRows[i].getValue("offsetMoney") || "0");
            var offsetAmount = adjustOffsetMoney + preoffsetAmount;
            if (offsetAmount > parseFloat(parseFloat(selectedRows[i].getValue("currAccountBalance") || "0"))) {
              toastr.warning("本次冲抵金额不能超过本次可使用余额，请修改调整金额！")
              return false;
            }
            selectedRows[i].setValue("offsetMoney", offsetAmount);
            selectedRows[i].setValue("adjustOffsetMoney", 0);
            selectedRows[i].setValue("operationStatus", "02");
            viewModel.saveAndUpdateOffsetAmount(selectedRows[i].getValue("accountId"), offsetAmount);
          }
        }
      },
      // 修改已选冲抵账户
      offsetUpdate: function(index, rowId) {
        if (typeof index == "number") {
          viewModel.offsetSelectList.setRowSelectbyRowId(rowId);
        }
        var allRows = viewModel.offsetSelectList.getAllRows();
        // 一次这能修改一个账户
        for(var i=0; i< allRows.length; i++) {
          if ("01" == allRows[i].getValue("operationStatus")) {
            toastr.info("请先保存已选冲抵账户里的其他账户！");
            return;
          }
        }
        var selectedRows = viewModel.offsetSelectList.getSelectedRows();
        for(var i=0; i< selectedRows.length; i++) {
          if (rowId == selectedRows[i].rowId) {
            selectedRows[i].setValue("operationStatus", "01");
          }
        }
      },
      // 删除已选冲抵账户
      offsetDel: function(index, rowId) {
        if (typeof index == "number") {
          viewModel.offsetSelectList.setRowSelectbyRowId(rowId);
        }
        var selectedRows = viewModel.offsetSelectList.getSelectedRows();
        
        selectedRows[0].setValue("adjustOffsetMoney", 0);
        selectedRows[0].setValue("offsetMoney", 0);
        selectedRows[0].setValue("operationStatus", "01");

        var accountId = selectedRows[0].getValue("accountId");
        var restoreData = selectedRows[0].getSimpleData();
        // 删除已选账户
        viewModel.offsetSelectList.removeRows(selectedRows, {forceDel: true});
        // 删除商品使用冲抵明细
        viewModel.delOffsetDetail(accountId);
        // 还原
        viewModel.offsetList.addSimpleData(restoreData, "new", {unSelect: true});
        // 如果已选账户全部删除，则认为是取消费用冲抵
        var allSelectRows = viewModel.offsetSelectList.getAllRows();
        if(allSelectRows && allSelectRows.length < 1) {
          viewModel.costFreezeEvent(false);
        }
      },
      //费用冲抵， 按钮操作
      showOffsetDialog: function () {
        // var offsetDate = viewModel.offsetList.getSimpleData();
        // if (offsetDate && offsetDate.length >0) {
        //   viewModel.offsetDialog.show();
        //   return;
        // }
        var result = viewModel.validateBill();
        if (!result) {
          return;
        }
        // 货补费用单类型  如果是
        var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
        if (orderType && orderType[0].saleModelCode == "03") {
          toastr.warning("订单类型为货补订单不能进行费用冲抵！");
          return;
        }
        var customerId = viewModel.salesorderCard.getValue("customerId");
        var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
        var orderId = viewModel.salesorderCard.getValue("id");
        var orderItems = viewModel.saleOrderItems.getSimpleData();
        var orderEnable = [];
        for (var i = 0; i < orderItems.length; i++) {
          if (viewModel.ifOffsetGoods(orderItems[i])) {
            orderEnable.push(orderItems[i]);
          }
        }

        if (!customerId) {
          toastr.warning("请先选择客户");
          return false;
        }
        if (!saleOrgId) {
          toastr.warning("请先选择销售组织");
          return false;
        }
        if (!orderEnable || orderEnable.length <= 0) {
          toastr.warning("商品行不能为空");
          return false;
        }
        // 弹框
        if (!viewModel.offsetDialog) {
          viewModel.offsetDialog = u.dialog({
              id: "dialog_costOffset",
              content: "#dialog_costOffset",
              hasCloseMenu: true,
              width: "85%"
          });
          var okButton = $("#dialog_costOffset .J-ok");
          okButton.off().on("click", function () {
            // 点击确定时，只做关闭弹框操作
            // viewModel.costFreezeEvent(true);
            viewModel.offsetDialog.close();
              //viewModel.confirmReferDeliveryorder();
          });
          // var cancelButton = $("#dialog_costOffset .J-cancel");
          // cancelButton.off().on("click", function () {
          //     viewModel.referdeliveryorderdialog.close();
          // });
        } else {
            viewModel.offsetDialog.show();
        }
        // 先清空
        viewModel.offsetList.removeAllRows();
        viewModel.offsetSelectList.removeAllRows();
        var queryData = [];
        orderEnable.forEach(function(item) {
          var param = {
            saleOrgId: saleOrgId,
            customerId: customerId,
            financeOrgId: item.settleFinancialOrgId,
            goodsId: item.goodsId
          }
          queryData.push(param);
        });
        // var data = [];
        // for(var i =0; i <=5; i++) {
        //   data.push({
        //     accountId: "1001"+i,
        //     accountName: "账户"+i,
        //     accountBalance: 200,
        //     offsetMoney: 0,
        //     adjustOffsetMoney: 0,
        //     operationStatus: "01"
        //   });
        // }
        // viewModel.offsetList.setSimpleData(data, {
        //     unSelect: true
        // });
        // viewModel.offsetSelectList.setSimpleData(null);
        // 查询可用账户进行费用费用冲抵
        $._ajax({
            type: "post",
            url: window.pathMap.fee + "/api/fee/accounts/order-flusing-account-matching",
            dataType: "json",
            data: JSON.stringify(queryData),
            contentType: "application/json; charset=utf-8",
            success: function (datas) {
              var offsetLists = [];
              viewModel.offsetRelationGoods = {};
              if(datas && datas.length >0) {
                datas.forEach(function(data) {
                  var feeAccountBalance = data.feeAccountBalance;
                  // 为方便前端交互，设置默认值
                  feeAccountBalance.offsetMoney = 0;
                  feeAccountBalance.adjustOffsetMoney = 0;
                  feeAccountBalance.operationStatus = "01";
                  // 考虑本单已使用的账号余额，还原账户余额
                  feeAccountBalance.accountBalance = viewModel.restoreAccountBalance(feeAccountBalance);

                  viewModel.offsetRelationGoods[feeAccountBalance.accountId] = data.preferentialRatio;
                  offsetLists.push(feeAccountBalance);
                });
              }
              var offsetDetails = viewModel.offsetDetailsList.getSimpleData();
              if(offsetDetails && offsetDetails.length >0) {
                // 编辑保存时，根据商品行费用使用明细，重新封装（可选、已选）账户信息
                viewModel.freshFillAccountByOffsetDetail(offsetDetails, offsetLists);
              } else {
                viewModel.offsetList.setSimpleData(offsetLists, {
                  unSelect: true
                });
                viewModel.offsetSelectList.setSimpleData(null);
              }
              // viewModel.offsetList.setSimpleData(offsetDetails, {
              //     unSelect: true
              // });
              // viewModel.offsetSelectList.setSimpleData(null);
            }
        });
      },
      // 还原账户可用余额（考虑编辑修改时本单已使用的余额）
      restoreAccountBalance: function(feeAccount) {
        var accountBalance = parseFloat(feeAccount.accountBalance || 0);
        var offsetDetailsList = viewModel.offsetOldDetailsList.getSimpleData();
        if(!offsetDetailsList || offsetDetailsList.length < 1) {
          return accountBalance;
        }
        var usedFeeAccountDetails = offsetDetailsList.filter(function(detail) {
          return detail.feeAccountId == feeAccount.accountId;
        });
        if(!usedFeeAccountDetails || usedFeeAccountDetails.length < 1) {
          return accountBalance;
        }
        var usedAccountBalance = usedFeeAccountDetails.reduce(function(total, curr) {
          return total += parseFloat(curr.totalOffsetAmount);
        }, 0)
        return accountBalance + parseFloat(usedAccountBalance);
      },
      // 编辑保存时，根据商品行费用使用明细，重新封装（可选、已选）账户信息
      freshFillAccountByOffsetDetail: function(offsetDetails, offsetLists) {
        var accountMap = {};
        offsetDetails.forEach(function(detail) {
          if (accountMap[detail.feeAccountId]) {
            accountMap[detail.feeAccountId] = parseFloat(parseFloat(accountMap[detail.feeAccountId]) + parseFloat(detail.totalOffsetAmount)).toFixed(12);
          } else {
            accountMap[detail.feeAccountId] = detail.totalOffsetAmount;
          }
        });
        var offsetDataList = offsetLists.filter(function(item) {
          return !accountMap[item.accountId];
        });
        var offsetSelectList = offsetLists.filter(function(item) {
          return !!accountMap[item.accountId];
        });
        // 对已选账户数据进行重新封装
        offsetSelectList.forEach(function(item) {
          item.offsetMoney = accountMap[item.accountId];
          item.adjustOffsetMoney = 0;
          if(parseFloat(accountMap[item.accountId] || 0) > 0) {
            item.operationStatus = "02";
          } else {
            item.operationStatus = "01";
          }
          item.currAccountBalance = viewModel.totalAccountMaxUseMoney(item.accountId, item.accountBalance);
        });
        viewModel.offsetList.setSimpleData(offsetDataList, {
          unSelect: true
        });
        viewModel.offsetSelectList.setSimpleData(offsetSelectList, {
          unSelect: true
        });
      },
      // 取消费用冲抵, 按钮操作
      cancelCostOffset: function() {
        var orderItems = viewModel.saleOrderItems.getSimpleData();
        var orderRealItems = viewModel.saleOrderItems.getAllRealRows();
        var orderItemsBom = viewModel.saleOrderItems.getAllRows();
        var orderEnable = [];
        for (var i = 0; i < orderItems.length; i++) {
          if (orderItems[i].dr != 1) {
            orderEnable.push(orderItems[i]);
          }
          orderRealItems[i].setValue("offsetAmount", 0);
        }

        var totalAmount = 0,
          totalDealAmount = 0;
        for (var i = 0; i < orderEnable.length; i++) {
          var item = orderEnable[i];
          if (item.isGift !=1) {
            var rate = parseFloat(item.conversionRate || "1");
            
            var dealAmount = viewModel.computeItemDealAmout(item);
            var dealPrice = dealAmount / item.mainNum || 0;
            orderItemsBom[i].setValue("dealAmount", dealAmount);
            orderItemsBom[i].setValue("dealPrice", dealPrice);
            totalDealAmount += dealAmount;
          }
        }
        viewModel.salesorderCard.setValue("offsetAmount", 0);
        viewModel.salesorderCard.setValue("totalDealAmount", totalDealAmount);
        viewModel.setMaxPreferentialMoney(viewModel.salesorderCard, "fee");
        // 清空
        viewModel.addOrEditClearOffset(false);
        viewModel.costFreezeEvent(false);
      },
      // 校验是否可添加
      validIfAddOffsetAccount: function(obj) {
        var allSelectedRows = viewModel.offsetSelectList.getAllRows();
        // 一次这能修改一个账户
        for(var i=0; i< allSelectedRows.length; i++) {
          if ("01" == allSelectedRows[i].getValue("operationStatus")) {
            toastr.info("请先保存已选冲抵账户里的其他账户！");
            return false;
          }
        }
        return true;
      },
      // 添加账户
      addOffsetAccount: function (obj) {
        var accountId = obj.rowObj.value.accountId;
        var accountBalance = obj.rowObj.value.accountBalance;
        var allRows = viewModel.offsetList.getAllRows();
        var selectedRows = viewModel.offsetList.getSelectedRows();
        if (selectedRows.length < 1) {
          toastr.info("请选择账户");
          return;
        }
        var allSelectedRows = viewModel.offsetSelectList.getAllRows();
        // 一次这能修改一个账户
        for(var i=0; i< allSelectedRows.length; i++) {
          if ("01" == allSelectedRows[i].getValue("operationStatus")) {
            toastr.info("请先保存已选冲抵账户里的其他账户！");
            return;
          }
        }
        selectedRows[0].setValue("currAccountBalance", viewModel.totalAccountMaxUseMoney(accountId, accountBalance));

        // 在可选冲抵账户列表移除
        for (var j = allRows.length - 1; j >= 0; j--) {
          if (allRows[j].getValue("accountId") == accountId) {
              viewModel.offsetList.removeRows([j], {
                  forceDel: true
              });
          }
        }
        // 在已选冲抵账户列表添加
        viewModel.offsetSelectList.addSimpleData(selectedRows[0].getSimpleData(), "new", {unSelect: true});
      },
      // 判断调整金额是否可编辑，修改态调整金额不可编辑
      ifCanEidtoffsetAmountHandle: function(obj) {
        var operationStatus = obj.rowObj.value["operationStatus"];
        if ("02" == operationStatus) {
          return false;
        }
        return true;
      },
      // 计算账户本次最大可用余额
      totalAccountMaxUseMoney: function(accountId, accountBalance) {
        var currAccountBalance = 0;
        var preferentialRatio = viewModel.offsetRelationGoods[accountId];
        var orderItems = viewModel.saleOrderItems.getSimpleData();
        orderItems.forEach(function(orderItem) {
          for(var key in preferentialRatio) {
            if (orderItem.goodsId == key && viewModel.ifOffsetGoods(orderItem)) {
              // 返回商品本次实际账户可用余额
              var currRealUseOffsetMoney = viewModel.computeCurrOffsetByGoods(orderItem, accountId, preferentialRatio[key]);
              currAccountBalance += +currRealUseOffsetMoney;
            }
          }
        });
        if (currAccountBalance > parseFloat(accountBalance || "0")) {
          currAccountBalance = accountBalance;
        }
        return currAccountBalance;
      },
      // 账户保存时，分摊冲抵金额到账户下属商品
      saveAndUpdateOffsetAmount: function(accountId, currUseOffsetMoney, callBack) {
        var preferentialRatio = viewModel.offsetRelationGoods[accountId];
        var saleOrderItemRows = viewModel.saleOrderItems.getAllRows();
        // 获取账户下属商品
        var accountoffSetItems = [];
        // 账户下属商品可冲抵金额合计比重
        var accountMaxOffsetAmout = 0;
        saleOrderItemRows.forEach(function(row) {
          if (viewModel.ifOffsetGoods(row.getSimpleData())) {
            for (var key in preferentialRatio) {
              if (key == row.getValue("goodsId") && viewModel.ifOffsetGoods(row.getSimpleData())) {
                var dealAmount = viewModel.computeItemDealAmout(row.getSimpleData());
                row.setValue("dealAmount", dealAmount);
                // 本次实际可用
                var currRealUseOffsetMoney = viewModel.computeCurrOffsetByGoods(row.getSimpleData(), accountId, preferentialRatio[key]);
                accountMaxOffsetAmout += parseFloat(currRealUseOffsetMoney);
                //  .toFixed(row.getValue("currencyAmountScale"));
                accountoffSetItems.push(row);
              }
            }
          }
        });
        // 重新封装当前账户商品使用冲抵明细
        var offsetDetails = viewModel.offsetDetailsList.getSimpleData();
        var newOffsetDetails = offsetDetails.filter(function(detail) {
          return detail.feeAccountId != accountId;
        });
        var occupyStep = currUseOffsetMoney;
        for (var i = 0; i < accountoffSetItems.length; i++) {
          var amountScale = parseFloat(viewModel.CURRENCY.amountPrecision || "2");
          if (i == accountoffSetItems.length - 1) {
            var newOffsetDetail = viewModel.fillOffsetDetailData(accountoffSetItems[i].getSimpleData(), accountId, occupyStep);
            newOffsetDetails.push(newOffsetDetail);
            break;
          }
          // 本次实际可用
          var currRealUseOffsetMoney = 
            viewModel.computeCurrOffsetByGoods(accountoffSetItems[i].getSimpleData(), accountId, preferentialRatio[accountoffSetItems[i].getValue("goodsId")]);
          var occupyRate = parseFloat(currUseOffsetMoney / accountMaxOffsetAmout);
          const offsetAmt = (currRealUseOffsetMoney * occupyRate).toFixed(amountScale);
          var newOffsetDetail = viewModel.fillOffsetDetailData(accountoffSetItems[i].getSimpleData(), accountId, offsetAmt);
          occupyStep -= offsetAmt;
          newOffsetDetails.push(newOffsetDetail);
        }
        // 先删除，后赋值
        viewModel.offsetDetailsList.removeAllRows();
        viewModel.offsetDetailsList.setSimpleData(newOffsetDetails, {
          unSelect: true
        });
        // 重新计算表体表头信息
        viewModel.computeOrderOffsetAmountInfo(callBack);
      },
      computeOrderOffsetAmountInfo: function(callBack) {
        var allRows = viewModel.saleOrderItems.getAllRows();
        var orderEnable = [];
        allRows.forEach(function(row) {
          if (viewModel.ifOffsetGoods(row.getSimpleData())) {
            orderEnable.push(row);
          }
        })
        var headOffsetAmount = 0;
        var headTotalDealAmount = 0;
        // 重新计算冲抵金额等
        orderEnable.forEach(function(row) {
          // 价格精度
          var priceScale = parseFloat(viewModel.CURRENCY.pricePrecision || "2");
          var mainNum = row.getValue("mainNum");
          var dealAmount = viewModel.computeItemDealAmout(row.getSimpleData());
          // 获取商品冲抵金额
          var usedOffsetMoney = viewModel.computeGoodsOffsetMoney(row.getSimpleData());
          var dealAmount = parseFloat(dealAmount - usedOffsetMoney);
          var dealPrice = dealAmount / mainNum;
          row.setValue("offsetAmount", usedOffsetMoney);
          row.setValue("dealAmount", dealAmount);
          row.setValue("dealPrice", dealPrice);
          headOffsetAmount += usedOffsetMoney;
          headTotalDealAmount += dealAmount;
        });
        // 费用冲抵金额
        viewModel.salesorderCard.setValue("offsetAmount", headOffsetAmount || 0);
        // 表头总金额
        viewModel.salesorderCard.setValue("totalDealAmount", headTotalDealAmount);
        viewModel.setMaxPreferentialMoney(viewModel.salesorderCard, "fee");
        if (callBack && typeof callBack == "function") {
          callBack();
        }
      },
      delOffsetDetail: function(accountId) {
        // 筛选过滤删除的账号
        var offsetDetails = viewModel.offsetDetailsList.getSimpleData();
        var newOffsetDetails = offsetDetails.filter(function(detail) {
          return detail.feeAccountId != accountId;
        });
        // 先删除，后重新赋值
        viewModel.offsetDetailsList.removeAllRows();
        viewModel.offsetDetailsList.setSimpleData(newOffsetDetails, {
          unSelect: true
        });
        // 重新计算表体表头信息
        viewModel.computeOrderOffsetAmountInfo();
      },

      /*
       *===================================================================================
       * 货补
       */
      // 为补货账户参照设置默认查询参数
      setSearchEleDefaultRefParams: function() {
        var customerId = viewModel.salesorderCard.getValue("customerId");
        var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
        // var accountIdComp = viewModel.app.getComp("accountIdBase");
        var condition = {
          "search_saleOrgId": saleOrgId,
          "search_customerId": customerId
        }
        var accountRef = $("#accountIdBaseKey", ".qy-gridTree-searchContainer");
        if(accountRef && accountRef[0]) {
          accountRef.attr("data-refparam", JSON.stringify(condition));
        }
      },
      // 选择补货账户查询时，补充封装商品参照查询参数
      fillSearchParamsBySupplement: function(params) {
        if(params && params["search_EQ_accountId"]) {
          var accountRef = $("#refContaineraccountIdBase").data("uui.refer");
          if(accountRef && accountRef.values && accountRef.values[0]) {
            params["search_IN_goodsIds"] = accountRef.values[0].goodsIds;
          }
        }
      }
    };
  }
  return events;
});
