define(
  [
      "text!./promotionrules.html",
      "ocm_common",
      "searchbox",
      /*'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js',*/
      "./meta.js",
      "ocm_global"
  ],
  function (tpl, common, searchbox/*,bpmopenbill*/) {
      "use strict";
      var app,
          baseData,
          events,
          rendertype,
          viewModel,
          singledocSearch,
          singledoceidt,
          giftsProductDialog,
          preconditionChildDialog,
          chooseProductDialog,
          globleParams;
      var BILLPANELSTATUS = {
          ADD: "add",
          EDIT: "edit",
          COPY: "copy",
          DETAIL: "detail",
          DEFAULT: "default"
      };

      baseData = {
          baseurl: "/prom/rules",
          ProductCombineList: new u.DataTable(ProductCombine),

          /****************************买赠DataTable**********************/
          //前置条件
          PreconditionItems: new u.DataTable(PreconditionItem),
          //订单前置条件
          promOrderCondition: new u.DataTable(promOrderCondition),
          //前置条件-子表商品
          PreconditionChildItems: new u.DataTable(PreconditionChildItem),
          //买赠规则
          BuyGiftItems: new u.DataTable(BuyGiftItem),
          //买赠规则-订单金额
          BuyGiftItems2: new u.DataTable(BuyGiftItem2),
          //赠品商品
          giftsProductItems: new u.DataTable(giftsProductItem),
          // 赠品累计限制
          GiftsLimitItems: new u.DataTable(GiftsLimitItem),
          //买赠规则-商品数量
          ItemRefList: new u.DataTable(ItemRef),

          promWayFormat: function (dataTable, field) {
              var value = this[dataTable].ref(field)();
              value = parseInt(value);
              var showName = "";
              if (u.isNumber(value)) {
                  if (value == 1) {
                      showName = "买赠";
                  }
                  if (value == 2) {
                      showName = "降价";
                  }
              }
              return showName;
          },
          //前置条件
          preconditionFormat: function (dataTable, field) {
              var value = this[dataTable].ref(field)();
              if (value == null || value.length == 0) return "无";
              value = parseInt(value);
              var showName = "";
              if (u.isNumber(value)) {
                  if (value == 0) {
                      showName = "无";
                  }
                  if (value == 1) {
                      showName = "有";
                  }
              }
              return showName;
          },
          promotionBenchFormat: function (dataTable, field) {
              var value = this[dataTable].ref(field)();
              value = parseInt(value);
              var showName = "";
              if (u.isNumber(value)) {
                  if (value == 1) {
                      showName = "商品数量";
                  }
                  if (value == 2) {
                      showName = "商品金额";
                  }
                  if (value == 3) {
                      showName = "订单金额";
                  }
              }
              return showName;
          },

          // 促销方式
          promotionsSrc: [{value: "1", name: "买赠"}, {value: "2", name: "降价"}],
          // 促销基准
          promotionBenchSrc: [{value: "1", name: "商品数量"}, {value: "2", name: "商品金额"}, {value: "3", name: "订单金额"}],
          // 阶梯方式
          ladderWaySrc: [{value: "1", name: "全额累进"},{value: "2", name: "超额累进"}],
          // 赠品基准
          giftBenchSrc: [{value: "1", name: "数量"}],
          // 是否全部商品
          IsAllProductSrc: [{value: "1", name: "是否全部商品"}],
          // 是否累计限量
          limitSrc: [{value: "1", name: "累计限量"}],

          theSelectedSrc: [{value: "1", name: ""}],
          // 前置条件
          preconditionSrc: [{value: "1", name: "客户前置条件"}, {value: "2", name: "订单前置条件"}, {value: "0", name: "无"}],
          //商品类型
          giftTypeSrc: [{value: "1", name: "有"}, {value: "0", name: "无"}],
          //前置条件类型
          preTypeSrc: [
              {value: "1", name: "基于历史订单金额"},
              {value: "2", name: "基于历史出库金额"},
              {value: "3", name: "基于历史回款核销金额"},
              {value: "4", name: "基于历史订单数量"}
          ],
          // 判断买赠-赠品数量累计是否要增行/删行
          giftObj: {},
          //促销基准和促销方式数值变化的时候是否弹框，在点击取消和保存时引起的数值变化不弹框，其他弹！
          isPromBenchShowDialog: 0,
          /***************************买赠DataTable end**********************/

          billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
          /*enableRadioSrc: [
            {
              value: "1",
              name: "启用"
            },
            {
              value: "0",
              name: "停用"
            },
            {
              value: CONST.DEFAULTOPTION,
              name: "全部"
            }
          ],*/
          enableCheckSrc: [{value: "1", name: "是"}],
          //跳转单据页
          goBillPanel: common.bill.goBillPanel,
          //返回列表页
          // retListPanel: common.bill.retListPanel,
          // 跳转详情页
          goDetailPanel: common.bill.goDetailPanel,
          /*enableFmt: ko.pureComputed(function() {
            var enableStatus = viewModel.ProductCombineList.ref("enableStatus")();
            return enableStatus == 1 ? "启用" : "停用";
          }),*/

          /**
           促销方式-减价类型start
           **/

          //商品基准降价方式的子表datatable
          priceItems: new u.DataTable(priceItem),
          //商品范围的子表datatable
          proRangeList: new u.DataTable(ProRangeMeta),
          //订单基准降价方式的子表datatable
          orderStandDepreciateItems: new u.DataTable(orderStandDepreciateMeta),
          //弹出的选择商品对话框所对应的datatable
          chooseProductList: new u.DataTable(chooseProductItem),
          choosePromProductList: new u.DataTable(chooseProductItem),
          promotionGoodsAdd: new u.DataTable(chooseProductItem),
          //商品类型
          proTypeSrc: [
              {value: "1", name: "商品"},
              {value: "2", name: "产品"},
              {value: "3", name: "组合"},
              {value: "2", name: "产品分类"}
          ],
          ruleStandardSrc: ko.observableArray([
              {value: "0", name: "单品"},
              {value: "1", name: "合计"}
          ])

          /**
           促销方式-减价类型end
           **/
      };
      rendertype = {
          operation: common.rendertype.operation,
          enableStatusRender: common.rendertype.enableRender,
          detailRender: common.rendertype.detailRender,
          //前置条件-商品添加

          //前置条件-商品添加
          changeHistoryListRender: function (obj) {
              var viewModel = obj.gridObj.viewModel;
              var dataTableRowId = obj.row.value["$_#_@_id"];
              var changefun = "data-bind=click:addPreconditionChildFun.bind($data," + dataTableRowId + '), visible: buttonShowGroup["history"]\'';
              obj.element.innerHTML = '<div class="ui-handle-icon"><span class="ui-handle-word"><a href="#" ' + changefun + ' title="添加商品">添加商品</a></span></div>';
              ko.cleanNode(obj.element);
              ko.applyBindings(viewModel, obj.element);
          },
          //前置条件-查看商品
          viewHistoryListRender: function (obj) {
              var viewModel = obj.gridObj.viewModel;
              var dataTableRowId = obj.row.value["$_#_@_id"];
              var changefun = "data-bind=click:viewPreconditionChildFun.bind($data," + dataTableRowId + '), visible: buttonShowGroup["history"]\'';
              obj.element.innerHTML = '<div class="ui-handle-icon"><span class="ui-handle-word"><a href="#" ' + changefun + ' title="查看商品">查看商品</a></span></div>';
              ko.cleanNode(obj.element);
              ko.applyBindings(viewModel, obj.element);
          },
          //促销方式渲染
          promotionRender: function (params) {
              if (params.value == 1) {
                  params.element.innerHTML = "买赠";
              }
              if (params.value == 2) {
                  params.element.innerHTML = "降价";
              }
          },
          //促销基准渲染
          promotionBenchRender: function (params) {
              if (params.value == 1) {
                  params.element.innerHTML = "商品数量";
              }
              if (params.value == 2) {
                  params.element.innerHTML = "商品金额";
              }
              if (params.value == 3) {
                  params.element.innerHTML = "订单金额";
              }
          },

          //启用状态渲染
          enableRender: function (params) {
              if (params.value == 1) {
                  params.element.innerHTML = "启用";
              }
              if (params.value == 2) {
                  params.element.innerHTML = "停用";
              }
              if (params.value == 0) {
                  params.element.innerHTML = "未启用";
              }
          },
          //促销方式-减价类型begin
          statusCodeRender: function (params) {
              params.element.innerHTML = params.value + "%";
          },
          //促销方式-减价类型end
          //全局的促销方式值
          promotionValueObserve: ko.observable(1),
          benchValueObserve: ko.observable(1)
      };
      events = {
          // createNewComp: common.events.createNewComp,
          // 规则基准监听事件
          changeRuleStandardSelect: function (row, event) {
            if (event.target && event.target.value) {
              row.setValue("ruleStandard", event.target.value);
            }
          },
          //促销方式-减价类型begin
          orderStandDepreciateEditEvent: function (obj) {
              var colIndex = obj.colIndex;
              var rowIndex = obj.rowIndex;
              if (colIndex != 2 && colIndex != 3) return true;
              var discount = viewModel.orderStandDepreciateItems.getRow(rowIndex).getValue("discount");
              var fullcut = viewModel.orderStandDepreciateItems.getRow(rowIndex).getValue("fullcut");
              if (colIndex == 2 && fullcut) {
                  return false;
              }
              if (colIndex == 3 && discount) {
                  return false;
              }

              return true;
          },
          giftLimitEditFun: function (obj) {
              if (obj.colIndex != 2) return true;
              var totalLimitFlag = viewModel.ProductCombineList.getValue("totalLimitFlag");
              if (totalLimitFlag == 1) {
                  return true;
              } else {
                  return false;
              }
          },

          //添加商品范围行
          addProRangeItems: function () {
              var row = viewModel.proRangeList.createEmptyRow();
              viewModel.proRangeList.setRowFocus(row);
          },
          //删除商品范围行
          delProRangeItems: function (index) {
              var row = viewModel.proRangeList.getCurrentRow();
              viewModel.proRangeList.removeRows(row);
          },
          //添加订单金额-降价规则行
          addOrderStandDepreciateItems: function () {
              var row;
              if (viewModel.orderStandDepreciateItems.getAllRows().length == 0) {
                  row = viewModel.orderStandDepreciateItems.createEmptyRow();
              } else {
                  row = viewModel.orderStandDepreciateItems.getAllRows()[0];
              }
              row.getValue("conditionInfos").createEmptyRow();
              viewModel.orderStandDepreciateItems.setSimpleData(
                  viewModel.orderStandDepreciateItems.getSimpleData()
              );
          },
          //删除订单金额-降价规则行
          delOrderStandDepreciateItems: function (row, childRow) {
              var index = row.getValue("conditionInfos").getIndexByRowId(childRow.rowId);
              row.getValue("conditionInfos").removeRows([index], {forceDel: true});
              viewModel.orderStandDepreciateItems.setSimpleData(viewModel.orderStandDepreciateItems.getSimpleData());
          },

          //
          ruleValueChange: function (obj) {
              //如果为商品数量
              if (obj == 1) {
                  $("#priceConditionLabel").html("降价条件(数量)");
                  $("#priceTitleLabel").html("商品数量-降价规则");
                  $("#buyGiftTitle").html("商品数量-买赠规则");
              }
              //如果为商品金额
              if (obj == 2) {
                  $("#priceConditionLabel").html("降价条件(金额)");
                  $("#priceTitleLabel").html("商品金额-降价规则");
                  $("#buyGiftTitle").html("商品金额-买赠规则");
              }
          },
          //
          priceValueChange: function (obj) {
              var discount = $(".discountInput").val();
              var price = $(".priceInput").val();
              // $('.discountInput').attr("disabled","true")
          },
          // 价格规则-删除主表
          priceDelRow: function (row) {
              var index = viewModel.priceItems.getIndexByRowId(row.rowId);
              viewModel.priceItems.removeRows([index], {forceDel: true});
          },

          // 价格规则-增加子表
          addPriceConditionInfos: function (row) {
              var upRow = row.getValue("conditionInfos").getRow(row.getValue("conditionInfos").rows().length - 1);
              //检验上一行录入值的正确性
              if (upRow) {
                  var isStartNumber = viewModel.isNumber(
                      upRow.getSimpleData()["lowerLimit"]
                  );
                  var isEndNumber = viewModel.isNumber(
                      upRow.getSimpleData()["higherLimit"]
                  );
                  if (isStartNumber == false || isEndNumber == false) {
                      toastr.error("请录入数字");
                      return;
                  }
              }
              //新增一行
              row.getValue("conditionInfos").insertRow(row.getValue("conditionInfos").rows().length);
              var newRow = row.getValue("conditionInfos").getRow(row.getValue("conditionInfos").rows().length - 1);

              if (upRow) {
                  //上一行的下限值赋到新增行的上限值
                  newRow.setValue("lowerLimit", upRow.getSimpleData()["higherLimit"]);
              }
              viewModel.priceItems.setSimpleData(viewModel.priceItems.getSimpleData());
          },
          // 价格规则-删除子表
          delPriceConditionInfos: function (row, childRow) {
              var index = row.getValue("conditionInfos").getIndexByRowId(childRow.rowId);
              row.getValue("conditionInfos").removeRows([index], {forceDel: true});
              viewModel.priceItems.setSimpleData(viewModel.priceItems.getSimpleData());
          },
          //买赠方式商品数量或者金额导入
          importFile: function () {
              var urlInfo = "/prom/rules-excel/getDataFromExcelDataImport"; //导入地址参数
              // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
              var ele = $('#importFiel')[0]; //挂载元素
              var setDate = function (data) {
                  for (var i = 0; i < data.length; i++) {
                      var row = viewModel.BuyGiftItems.createEmptyRow();
                      row.setSimpleData(data[i]);
                      var conditionInfos = data[i].conditionInfos;
                      for (var j = 0; j < conditionInfos.length; j++) {
                          var giftInfos = conditionInfos[j].giftInfos;
                          for (var t = 0; t < giftInfos.length; t++) {
                              viewModel.giftAddWhenImport(giftInfos[t]);
                          }
                      }
                  }
              };
              common.fileHandle.importToPage(urlInfo, ele, setDate);
          },
          //买赠方式商品数量或者金额导出
          exportFile: function () {
              var templateUrl = '/prom/rules-excel/downloadExcelTemplate'; //导出模板地址参数
              var excelDataUrl = '/prom/rules-excel/excelDataExport'; //导出数据地址参数
              var listData = viewModel.BuyGiftItems; //需要导出表格的dataTable
              var ele = $('#exportFiel')[0]; //挂载元素
              var searchParams = {};
              var id = viewModel.ProductCombineList.getCurrentRow().getSimpleData()["id"];
              searchParams['search_EQ_rule.id'] = id;
              searchParams['search_IN_proType'] = "3,1";
              common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
          },
          //降价方式商品数量或者金额导入
          importPriceFile: function () {
              var urlInfo = "/prom/rules-price-excel/getDataFromExcelDataImport"; //导入地址参数
              // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
              var ele = $('#importFiel')[0]; //挂载元素
              var setDate = function (data) {
                  for (var i = 0; i < data.length; i++) {
                      var row = viewModel.priceItems.createEmptyRow();
                      row.setSimpleData(data[i]);
                  }
              };
              common.fileHandle.importToPage(urlInfo, ele, setDate);
          },
          //降价方式商品数量或者金额导入
          exportPriceFile: function () {
              var templateUrl = '/prom/rules-price-excel/downloadExcelTemplate'; //导出模板地址参数
              var excelDataUrl = '/prom/rules-price-excel/excelDataExport'; //导出数据地址参数
              var listData = viewModel.priceItems; //需要导出表格的dataTable
              var ele = $('#exportFiel')[0]; //挂载元素
              var searchParams = {};
              var id = viewModel.ProductCombineList.getCurrentRow().getSimpleData()["id"];
              searchParams['search_EQ_ruleId'] = id;
              searchParams['search_IN_proType'] = "3,1";
              common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
          },
          //买赠方式商品数量或者商品金额基准最外层添加商品
          showAddItemsRef: function () {
              viewModel.choosePromProductList.removeAllRows();
              var row = viewModel.choosePromProductList.createEmptyRow();
              row.setValue("theSelected", 0);

              app.getComp("prom_proSkuId").setEnable(true);
              app.getComp("prom_proSpuId").setEnable(true);
              app.getComp("prom_proCateId").setEnable(true);
              app.getComp("prom_proCombineId").setEnable(true);
              app.getComp("prom_brandId").setEnable(true);
              app.getComp("prom_saleSeriesId").setEnable(true);
              app.getComp("prom_productLineId").setEnable(true);

              app.getComp("withProSkuId").setEnable(false);
              app.getComp("withProSpuId").setEnable(false);
              app.getComp("withProCateId").setEnable(false);
              app.getComp("withProCombineId").setEnable(false);
              app.getComp("withBrandId").setEnable(false);
              app.getComp("withSaleSeriesId").setEnable(false);
              app.getComp("withProductLineId").setEnable(false);
              //弹出框
              chooseProductDialog = u.dialog({
                  id: "dialogContentRuleProductProm",
                  content: "#dialog_content_rule_product_prom",
                  width: "400px"
              });
              var okButton = $("#dialog_content_rule_product_prom .u-msg-ok");
              okButton.unbind("click").click(function (row) {
                  var simpleData = viewModel.choosePromProductList.getSimpleData();
                  viewModel.addGiftProSave(
                      simpleData[0],
                      viewModel.insertBuyGiftProRows
                  );
              });
              var cancelButton = $("#dialog_content_rule_product_prom .u-msg-cancel");
              cancelButton.unbind("click").click(function () {
                  chooseProductDialog.close();
              });
          },
          //新增促销品的测试方法
          testFunctioin: function () {
              //弹出框
              chooseProductDialog = u.dialog({
                  id: "dialogContentRuleProductAdd",
                  content: "#dialog_content_promotion_goods_add",
                  width: "700px",
                  height: "700px"
              });
          },
          //规则整体前置条件增加数据
          addRulePreItems: function (){
              app.getComp("proSkuId").setEnable(true);
              app.getComp("proSpuId").setEnable(true);
              app.getComp("proCateId").setEnable(true);
              app.getComp("proCombineId").setEnable(true);
              app.getComp("brandId").setEnable(true);
              app.getComp("saleSeriesId").setEnable(true);
              app.getComp("productLineId").setEnable(true);
              //在末尾插入行
              app.getComp("withProSkuId").setEnable(false);
              app.getComp("withProSpuId").setEnable(false);
              app.getComp("withProCateId").setEnable(false);
              app.getComp("withProCombineId").setEnable(false);
              app.getComp("withBrandId").setEnable(false);
              app.getComp("withSaleSeriesId").setEnable(false);
              app.getComp("withProductLineId").setEnable(false);
              viewModel.promOrderCondition.insertRow(viewModel.promOrderCondition.rows().length);
              row.setValue("theSelected", 0);
          },
          //规则整体前置条件删除数据
          delRulePreItems: function(row) {
              //删除本行
              viewModel.promOrderCondition.removeRows(row);
          },
          //清空已选销售产品参照
          clearItemsRef: function () {
              viewModel.ItemRefList.setValue("productref", "");
              var refer = $("#refContainerproductref").data("uui.refer");
              refer.uncheckAll();
              refer.setValue([]);
          },

          //参照选择批量新增子表（销售产品）
          showChooseProRef: function () {
              //弹出的对话框清除原来的所有值并创建空行
              viewModel.chooseProductList.removeAllRows();
              viewModel.chooseProductList.createEmptyRow();
              //弹出框
              chooseProductDialog = u.dialog({
                  id: "dialogContentRulePro",
                  content: "#dialog_content_rule_product",
                  width: "400px",
                  height: "400px"
              });
              var okButton = $("#dialog_content_rule_product .u-msg-ok");
              okButton.unbind("click").click(function (row) {
                  var simpleData = viewModel.chooseProductList.getSimpleData();
                  viewModel.addGiftProSave(
                      simpleData[0],
                      viewModel.insertPriceItemProRows
                  );
              });
              var cancelButton = $("#dialog_content_rule_product .u-msg-cancel");
              cancelButton.unbind("click").click(function () {
                  chooseProductDialog.close();
              });
          },
          //买赠规则--添加赠品
          addGiftProduct: function (childRow) {
              viewModel.chooseProductList.removeAllRows();
              viewModel.chooseProductList.createEmptyRow();

              app.getComp("prom_proSkuId").setEnable(true);
              app.getComp("prom_proSpuId").setEnable(true);
              app.getComp("prom_proCateId").setEnable(true);
              app.getComp("prom_proCombineId").setEnable(true);

              //弹出框
              giftsProductDialog = u.dialog({
                  id: "giftsProductDialog",
                  content: "#dialog_content_rule_product",
                  width: "400px"
              });
              var okButton = $("#dialog_content_rule_product .u-msg-ok");
              okButton.unbind("click").click(function () {
                  viewModel.addGiftProductSave(childRow);
              });
              var cancelButton = $("#dialog_content_rule_product .u-msg-cancel");
              cancelButton.unbind("click").click(function () {
                  giftsProductDialog.close();
              });
          },

          //保存赠品-孙表
          addGiftProductSave: function (childRow) {
              var promotionBench = viewModel.ProductCombineList.getFocusRow().getValue("promotionBench");
              var newRows = new Array();
              var choosePro = viewModel.chooseProductList.getSimpleData()[0];
              if (choosePro.proSkuId) {
                  var ids = choosePro.proSkuId.split(",");
                  var codes = choosePro.proSkuCode.split(",");
                  var names = choosePro.proSkuName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  viewModel.insertGiftProRows(childRow, ids, codes, names, 1, newRows);
              }
              if (choosePro.proSpuId) {
                  var ids = choosePro.proSpuId.split(",");
                  var codes = choosePro.proSpuCode.split(",");
                  var names = choosePro.proSpuName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  viewModel.insertGiftProRows(childRow, ids, codes, names, 2, newRows);
              }
              if (choosePro.proCombineId) {
                  var ids = choosePro.proCombineId.split(",");
                  var codes = choosePro.proCombineCode.split(",");
                  var names = choosePro.proCombineName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  viewModel.insertGiftProRows(childRow, ids, codes, names, 3, newRows);
              }
              if (choosePro.proCateId) {
                  var ids = choosePro.proCateId.split(",");
                  var codes = choosePro.proCateCode.split(",");
                  var names = choosePro.proCateName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  viewModel.insertGiftProRows(childRow, ids, codes, names, 4, newRows);
              }
              if (choosePro.productLineId) {
                  var ids = choosePro.productLineId.split(",");
                  var codes = choosePro.productLineCode.split(",");
                  var names = choosePro.productLineName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  viewModel.insertGiftProRows(childRow, ids, codes, names, 5, newRows);
              }
              if (choosePro.brandId) {
                  var ids = choosePro.brandId.split(",");
                  var codes = choosePro.brandCode.split(",");
                  var names = choosePro.brandName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  viewModel.insertGiftProRows(childRow, ids, codes, names, 6, newRows);
              }
              if (choosePro.saleSeriesId) {
                  var ids = choosePro.saleSeriesId.split(",");
                  var codes = choosePro.saleSeriesCode.split(",");
                  var names = choosePro.saleSeriesName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  viewModel.insertGiftProRows(childRow, ids, codes, names, 7, newRows);
              }


              //判断买赠规则下促销基准是不是订单金额
              if (promotionBench == 3) {
                  viewModel.BuyGiftItems2.setSimpleData(viewModel.BuyGiftItems2.getSimpleData());
              } else {
                  viewModel.BuyGiftItems.setSimpleData(viewModel.BuyGiftItems.getSimpleData());
              }
              giftsProductDialog.close();

              //新增赠品累计限制
              for (var i = 0; i < newRows.length; i++) {
                  viewModel.giftIsAddHandle(newRows[i]);
              }
          },
          insertGiftProRows: function (childRow, ids, codes, names, proType, newRows) {
              for (var i = 0; i < ids.length; i++) {
                  var row = childRow.getValue("giftInfos").createEmptyRow();
                  row.setValue("giftName", names[i]);
                  row.setValue("giftType", proType);
                  row.setValue("giftId", ids[i]);
                  row.setValue("giftCode", codes[i]);
                  newRows.push(row);
              }
          },
          //赠方式商品数量或者商品金额基准主表添加商品
          addGiftProSave: function (choosePro, callback) {
              var witdIds = '';
              var witdCodes = '';
              var witdNames = '';
              var withGoodsScopeType = 0;
              if (choosePro.withProSkuId) {
                  witdIds = choosePro.withProSkuId;
                  witdCodes = choosePro.withProSkuCode;
                  witdNames = choosePro.withProSkuName;
                  withGoodsScopeType = 1;
              }
              if (choosePro.withProSpuId) {
                  witdIds = choosePro.withProSpuId;
                  witdCodes = choosePro.withProSpuCode;
                  witdNames = choosePro.withProSpuName;
                  withGoodsScopeType = 2;
              }
              if (choosePro.withProCombineId) {
                  witdIds = choosePro.withProCombineId;
                  witdCodes = choosePro.withProCombineCode;
                  witdNames = choosePro.withProCombineName;
                  withGoodsScopeType = 3;
              }
              if (choosePro.withProCateId) {
                  witdIds = choosePro.withProCateId;
                  witdCodes = choosePro.withProCateCode;
                  witdNames = choosePro.withProCateName;
                  withGoodsScopeType = 4;
              }
              if (choosePro.withProductLineId) {
                  witdIds = choosePro.withProductLineId;
                  witdCodes = choosePro.withProductLineCode;
                  witdNames = choosePro.withProductLineName;
                  withGoodsScopeType = 5;
              }
              if (choosePro.withBrandId) {
                  witdIds = choosePro.withBrandId;
                  witdCodes = choosePro.withBrandCode;
                  witdNames = choosePro.withBrandName;
                  withGoodsScopeType = 6;
              }
              if (choosePro.withSaleSeriesId) {
                  witdIds = choosePro.withSaleSeriesId;
                  witdCodes = choosePro.withSaleSeriesCode;
                  witdNames = choosePro.withSaleSeriesName;
                  withGoodsScopeType = 7;
              }

              if (choosePro.proSkuId) {
                  var ids = choosePro.proSkuId.split(",");
                  var codes = choosePro.proSkuCode.split(",");
                  var names = choosePro.proSkuName.split(",");
                  callback(ids, codes, names, witdIds, witdCodes, witdNames, 1, withGoodsScopeType);
              }
              if (choosePro.proSpuId) {
                  var ids = choosePro.proSpuId.split(",");
                  var codes = choosePro.proSpuCode.split(",");
                  var names = choosePro.proSpuName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, witdIds, witdCodes, witdNames, 2, withGoodsScopeType);
              }
              if (choosePro.proCombineId) {
                  var ids = choosePro.proCombineId.split(",");
                  var codes = choosePro.proCombineCode.split(",");
                  var names = choosePro.proCombineName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, witdIds, witdCodes, witdNames, 3, withGoodsScopeType);
              }
              if (choosePro.proCateId) {
                  var ids = choosePro.proCateId.split(",");
                  var codes = choosePro.proCateCode.split(",");
                  var names = choosePro.proCateName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, witdIds, witdCodes, witdNames, 4, withGoodsScopeType);
              }
              if (choosePro.productLineId) {
                  var ids = choosePro.productLineId.split(",");
                  var codes = choosePro.productLineCode.split(",");
                  var names = choosePro.productLineName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, witdIds, witdCodes, witdNames, 5, withGoodsScopeType);
              }
              if (choosePro.brandId) {
                  var ids = choosePro.brandId.split(",");
                  var codes = choosePro.brandCode.split(",");
                  var names = choosePro.brandName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, witdIds, witdCodes, witdNames, 6, withGoodsScopeType);
              }
              if (choosePro.saleSeriesId) {
                  var ids = choosePro.saleSeriesId.split(",");
                  var codes = choosePro.saleSeriesCode.split(",");
                  var names = choosePro.saleSeriesName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, witdIds, witdCodes, witdNames, 7, withGoodsScopeType);
              }

              chooseProductDialog.close();
          },
          //往规则本单前置条件中添加前置条件
          addOrderProCondition: function (choosePro, callback,row) {
              if (choosePro.proSkuId) {
                  var ids = choosePro.proSkuId.split(",");
                  var codes = choosePro.proSkuCode.split(",");
                  var names = choosePro.proSkuName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, 1,row);
              }
              if (choosePro.proSpuId) {
                  var ids = choosePro.proSpuId.split(",");
                  var codes = choosePro.proSpuCode.split(",");
                  var names = choosePro.proSpuName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, 2,row);
              }
              if (choosePro.proCombineId) {
                  var ids = choosePro.proCombineId.split(",");
                  var codes = choosePro.proCombineCode.split(",");
                  var names = choosePro.proCombineName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, 3,row);
              }
              if (choosePro.proCateId) {
                  var ids = choosePro.proCateId.split(",");
                  var codes = choosePro.proCateCode.split(",");
                  var names = choosePro.proCateName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, 4,row);
              }
              if (choosePro.brandId) {
                  var ids = choosePro.brandId.split(",");
                  var codes = choosePro.brandCode.split(",");
                  var names = choosePro.brandName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, 5,row);
              }
              if (choosePro.productLineId) {
                  var ids = choosePro.productLineId.split(",");
                  var codes = choosePro.productLineCode.split(",");
                  var names = choosePro.productLineName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, 6,row);
              }
              if (choosePro.saleSeriesId) {
                  var ids = choosePro.saleSeriesId.split(",");
                  var codes = choosePro.saleSeriesCode.split(",");
                  var names = choosePro.saleSeriesName.split(",");
                  //新增买赠方式商品数量（商品金额）的买赠规则表的行
                  callback(ids, codes, names, 7,row);
              }

              chooseProductDialog.close();
          },

          insertBuyGiftProRows: function (ids, codes, names, witdIds, witdCodes, witdNames, proType, withGoodsScopeType) {
              for (var i = 0; i < ids.length; i++) {
                  var row = viewModel.BuyGiftItems.createEmptyRow();
                  row.setValue("proCode", codes[i]);
                  row.setValue("proId", ids[i]);
                  row.setValue("proName", names[i]);
                  row.setValue("proType", proType);
                  if(witdIds){
                      var promProductRangeDT = new u.DataTable(BuyGiftItem.meta.promProductRange);
                      promProductRangeDT.addSimpleData({goodsId: witdIds, goodsCode: witdCodes, goodsName: witdNames, goodsScopeType: withGoodsScopeType});
                      row.setValue("promProductRange", promProductRangeDT, '', '', 'string');
                      row.setValue("theSelected", 1);
                  }else{
                      row.setValue("promProductRange", null);
                      row.setValue("theSelected", 0);
                  }
              }
              app.getComps();
              // viewModel.createNewComp($(".J-buyGiftItem-table")[0], viewModel);
          },
          insertOrderCondition: function (ids, codes, names, proType,prow) {
              for (var i = 0; i < ids.length; i++) {
                  var row =prow.getValue("oneCondition").createEmptyRow();
                  row.setValue("goodsCode", codes[i]);
                  row.setValue("goodsId", ids[i]);
                  row.setValue("goodsName", names[i]);
                  row.setValue("goodsScopeType", proType);
              }
              var currentData = prow.getSimpleData();
              prow.setSimpleData(currentData, 'new')
          },
          //降价规则-商品基准主表添加一行
          insertPriceItemProRows: function (ids, codes, names, witdIds, witdCodes, witdNames, proType, withGoodsScopeType) {
              for (var i = 0; i < ids.length; i++) {
                  var row = viewModel.priceItems.createEmptyRow();
                  row.setValue("showName", names[i]);
                  row.setValue("proId", ids[i]);
                  row.setValue("proType", proType);
                  if(witdIds){
                      var promProductRangeDT = new u.DataTable(BuyGiftItem.meta.promProductRange);
                      promProductRangeDT.addSimpleData({goodsId: witdIds, goodsCode: witdCodes, goodsName: witdNames, goodsScopeType: withGoodsScopeType});
                      row.setValue("promProductRange", promProductRangeDT, '', '', 'string');
                      row.setValue("theSelected", 1);
                  }else{
                      row.setValue("promProductRange", null);
                      row.setValue("theSelected", 0);
                  }

              }
          },

          //促销方式-减价类型end
          /****************************买赠*****************************/
          // 买赠规则-订单金额-增加主表
          showAddItems: function () {
              // viewModel.BuyGiftItems2.createEmptyRow();
              //在末尾插入行
              viewModel.BuyGiftItems2.insertRow(
                  viewModel.BuyGiftItems2.rows().length
              );
          },
          // 买赠规则-增加子表
          addConditionInfosFun: function (row) {
              // var newRow = row.getValue("conditionInfos").createEmptyRow();
              // viewModel.BuyGiftItems.insertRow(0, newRow);
              //在末尾插入行
              //上一行

              var upRow = row.getValue("conditionInfos").getRow(row.getValue("conditionInfos").rows().length - 1);
              //检验上一行录入值的正确性
              if (upRow) {
                  var isStartNumber = viewModel.isNumber(
                      upRow.getSimpleData()["giftConditionStart"]
                  );
                  var isEndNumber = viewModel.isNumber(
                      upRow.getSimpleData()["giftConditionEnd"]
                  );
                  if (isStartNumber == false || isEndNumber == false) {
                      toastr.error("请录入数字");
                      return;
                  }
              }
              //新增一行
              row.getValue("conditionInfos").insertRow(row.getValue("conditionInfos").rows().length);
              var newRow = row.getValue("conditionInfos").getRow(row.getValue("conditionInfos").rows().length - 1);

              if (upRow) {
                  //上一行的下限值赋到新增行的上限值
                  newRow.setValue(
                      "giftConditionStart",
                      upRow.getSimpleData()["giftConditionEnd"]
                  );
              }
              viewModel.BuyGiftItems.setSimpleData(
                  viewModel.BuyGiftItems.getSimpleData()
              );
          },
          //添加规则商品行上的商品范围前置条件
          addConditionGoodsInfo: function (row) {
              viewModel.chooseProductList.removeAllRows();
              viewModel.chooseProductList.createEmptyRow();
              //弹出框
              chooseProductDialog = u.dialog({
                  id: "dialogContentRuleProduct",
                  content: "#dialog_content_rule_product",
                  width: "400px",
                  height: "400px"
              });
              var okButton = $("#dialog_content_rule_product .u-msg-ok");
              okButton.unbind("click").click(function () {
                  var simpleData = viewModel.chooseProductList.getSimpleData();
                 viewModel.addOrderProCondition(
                      simpleData[0],
                      viewModel.insertOrderCondition,row
                  );
              });
              var cancelButton = $("#dialog_content_rule_product .u-msg-cancel");
              cancelButton.unbind("click").click(function () {
                  chooseProductDialog.close();
              });

          },
          isNumber: function (val) {
              var regPos = /^\d+(\.\d+)?$/; //非负浮点数
              var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
              if (regPos.test(val) || regNeg.test(val)) {
                  return true;
              } else {
                  return false;
              }
          },
          //是否正数
          isPosNumber: function (data) {
              var isNumber = viewModel.isNumber(data);
              if (isNumber) {
                  if (data <= 0) {
                      return false;
                  }
                  return true;
              }
              return isNumber;
          },
          // 买赠规则-增加孙表
          addGiftInfosFun: function (row) {
              viewModel.addGiftProduct(row);
          },
          // 买赠规则-删除主表
          delRow: function (row) {
              var index = viewModel.BuyGiftItems.getIndexByRowId(row.rowId);
              viewModel.BuyGiftItems.removeRows([index], {forceDel: true});

              //同时删除赠品累计限制
              var giftRowArr = [];
              var childRowArr = row.getValue("conditionInfos").getAllRows();
              for (var i = 0; i < childRowArr.length; i++) {
                  var giftRows = childRowArr[i].getValue("giftInfos").getAllRows();
                  for (var j = 0; j < giftRows.length; j++) {
                      giftRowArr.push(giftRows[j]);
                  }
              }
              var giftCodeArr = giftRowArr.map(function (item) {
                  return item.getValue("giftCode");
              });
              viewModel.giftIsDelHandle(giftCodeArr);
          },
          // 买赠规则-订单金额-删除主表
          delRow2: function (row) {
              var index = viewModel.BuyGiftItems2.getIndexByRowId(row.rowId);
              viewModel.BuyGiftItems2.removeRows([index], {
                  forceDel: true
              });

              /*//同时删除赠品累计限制
              var giftRowArr = [];
              var childRowArr = row.getValue("conditionInfos").getAllRows();
              for (var i = 0; i < childRowArr.length; i++) {
                var giftRows = childRowArr[i].getValue("giftInfos").getAllRows();
                for(var j = 0; j < giftRows.length; j++) {
                  giftRowArr.push(giftRows[j]);
                }
              }
              var giftCodeArr = giftRowArr.map(function (item) {
                return item.getValue("giftCode");
              });
              viewM*/
              odel.giftIsDelHandle(giftCodeArr);
              //同时删除赠品累计限制
              var giftRowArr = row.getValue("giftInfos").getAllRows();
              var giftCodeArr = giftRowArr.map(function (item) {
                  return item.getValue("giftCode");
              });
              viewModel.giftIsDelHandle(giftCodeArr);
          },
          // 买赠规则-删除子表
          delChildRow: function (row, childRow) {
              var index = row.getValue("conditionInfos").getIndexByRowId(childRow.rowId);
              row.getValue("conditionInfos").removeRows([index], {forceDel: true});
              viewModel.BuyGiftItems.setSimpleData(
                  viewModel.BuyGiftItems.getSimpleData()
              );

              //同时删除赠品累计限制
              var giftRowArr = childRow.getValue("giftInfos").getAllRows();
              var giftCodeArr = giftRowArr.map(function (item) {
                  return item.getValue("giftCode");
              });
              viewModel.giftIsDelHandle(giftCodeArr);
          },
          // 买赠规则-订单金额-删除子表
          delChildRow2: function (row, childRow) {
              var dataTable = row.getValue("giftInfos");
              var index = dataTable.getIndexByRowId(childRow.rowId);
              dataTable.removeRows([index], {forceDel: true});
              viewModel.BuyGiftItems2.setSimpleData(viewModel.BuyGiftItems2.getSimpleData());

              // 买赠-赠品数量累计删行
              viewModel.giftIsDelHandle(childRow);
          },
          // 买赠规则-删除孙表
          delGrandRow: function (childRow, grandChildRow) {
              var dataTable = childRow.getValue("giftInfos");
              var index = dataTable.getIndexByRowId(grandChildRow.rowId);
              dataTable.removeRows([index], {forceDel: true});
              viewModel.BuyGiftItems.setSimpleData(viewModel.BuyGiftItems.getSimpleData());
              // 买赠-赠品数量累计删行
              viewModel.giftIsDelHandle(grandChildRow);
          },
          //时间限制
          disabledBegin: function (current) {
              var endTime = viewModel.PreconditionItems.getValue("endTime");
              if (endTime) {
                  endTime = new Date(endTime).getTime();
                  if (current) {
                      current = new Date(current.format("YYYY-MM-DD")).getTime();
                  }
                  return current && current > endTime;
              }
          },
          disabledEnd: function (current) {
              var beginTime = viewModel.PreconditionItems.getValue("startTime");
              if (beginTime) {
                  beginTime = new Date(beginTime).getTime();
                  if (current) {
                      current = new Date(current.format("YYYY-MM-DD")).getTime();
                  }
                  return current && current < beginTime;
              }
          },
          //前置条件-商品
          addPreconditionChildFun: function (id) {
              var row = viewModel.PreconditionItems.getRowByRowId(id);
              var preType = row.getValue("preType");
              var data = row.getValue("ruleProInfoDetails").getSimpleData();
              console.log("addPreconditionChildFun")
              console.log(data)
              viewModel.PreconditionChildItems.setSimpleData(data);
              if (preType != "4") {
                  toastr.warning("只有前置条件为基本历史数量才可添加商品!");
                  return;
              }
              preconditionChildDialog = u.dialog({
                  id: "preconditionChildDialog",
                  content: "#dialog_content_preconditionChild",
                  width: "1000px"
              });
              var okButton = $("#dialog_content_preconditionChild .u-msg-ok");
              okButton.unbind("click").click(function () {
                  viewModel.preconditionChildSave(row);
              });
              var cancelButton = $("#dialog_content_preconditionChild .u-msg-cancel");
              cancelButton.unbind("click").click(function () {
                  preconditionChildDialog.close();
              });
          },
          //前置条件-查看
          viewPreconditionChildFun: function (id) {
              var row = viewModel.PreconditionItems.getRowByRowId(id);
              var preType = row.getValue("preType");
              if (preType != "4") {
                  toastr.warning("只有前置条件为基本历史数量才可查看商品!");
                  return;
              }
              var data = row.getValue("ruleProInfoDetails").getSimpleData();
              console.log("viewPreconditionChildFun")
              console.log(data)
              viewModel.PreconditionChildItems.setSimpleData(data);

              preconditionChildDialog = u.dialog({
                  id: "preconditionChildDialog",
                  content: "#dialog_content_preconditionChild_view",
                  width: "1000px"
              });
          },
          //前置条件-商品保存
          preconditionChildSave: function (curRow) {
              var data = viewModel.PreconditionChildItems.getSimpleData();
              console.log("前置条件-商品保存")
              console.log(data)
              //校验数量必输,校验产品，商品，商品分类三个必输一个
              var allRows = viewModel.PreconditionChildItems.getAllRows();
              console.log("allRows")
              console.log(allRows)
              for (var i = 0; i < allRows.length; i++) {
                  var num = allRows[i].getSimpleData()["num"];
                  var status = allRows[i].getSimpleData()["persistStatus"];
                  var proSpuId = allRows[i].getSimpleData()["proSpuId"];
                  var proSkuId = allRows[i].getSimpleData()["proSkuId"];
                  var proCataId = allRows[i].getSimpleData()["proCataId"];
                  if ((num == null || num.length == 0) && status != "fdel") {
                      toastr.error("主数量需要填写");
                      return;
                  }
                  if ((proSpuId == null || proSpuId.length == 0) && (proSkuId == null || proSkuId.length == 0) && (proCataId == null || proCataId.length == 0)) {
                      toastr.error("产品，商品，商品分类三个必须录入一个");
                      return;
                  }

              }
              var subDt = curRow.getValue("ruleProInfoDetails");
              var obj = {};
              subDt.removeAllRows();
              data.map(function (item) {
                  if (!obj[item.persistStatus]) obj[item.persistStatus] = [];
                  obj[item.persistStatus].push(item);
              });
              for (var key in obj) {
                  subDt.addSimpleData(obj[key], key);
              }

              preconditionChildDialog.close();
          },
          // 前置条件增行
          addPreconditionItems: function () {
              //在末尾插入行
              viewModel.PreconditionItems.insertRow(viewModel.PreconditionItems.rows().length);
          },
          // 前置条件删行
          delPreconditionItems: function () {
              var selectedRows = viewModel.PreconditionItems.getSelectedRows();

              viewModel.PreconditionItems.removeRows(selectedRows);
          },
          // 前置条件-商品增行
          addPreconditionChildItems: function () {
              console.log("前置条件-商品增行")
              viewModel.PreconditionChildItems.createEmptyRow();
          },
          // 前置条件-商品删行
          delPreconditionChildItems: function () {
              console.log("前置条件-商品删行")
              var rows = viewModel.PreconditionChildItems.getSelectedRows();
              viewModel.PreconditionChildItems.removeRows(rows);
          },
          // 前置条件-商品-点击编辑
          beforeEditFun: function (obj) {
              return viewModel.isEditHandle(obj);
          },
          isEditHandle: function (obj) {
              var data = viewModel.PreconditionChildItems.getRow(obj.rowIndex).getSimpleData();
              console.log("isEditHandle")
              console.log(data)
              var curField = obj.gridObj.gridCompColumnArr[obj.colIndex].options.field;
              var hasVal;
              for (var key in data) {
                  if (data[key] && (key == "proSkuCode" || key == "proSpuId" || key == "proCataId")) {
                      hasVal = key;
                  }
              }
              if (!hasVal || curField == hasVal || curField == "num") {
                  return true;
              }
          },

          // 判断买赠-赠品数量累计是否要增行
          giftIsAddHandle: function (giftRow) {
              //如果是否累计限量为否，则返回，否则在赠品累计限制添加不重复的一行
              var totalLimitFlag = viewModel.ProductCombineList.getFocusRow().getValue("totalLimitFlag");
              /*if (totalLimitFlag == null || totalLimitFlag == 0) {
                return;
              }*/
              var giftCode = giftRow.getValue("giftCode");
              var giftObj = viewModel.giftObj;
              if (giftObj[giftCode]) {
                  giftObj[giftCode] = giftObj[giftCode] + 1;
              } else {
                  giftObj[giftCode] = 1;
                  var giftsLimitRow = viewModel.GiftsLimitItems.createEmptyRow();
                  //新增赠品累计限制
                  giftsLimitRow.setValue("giftCode", giftRow.getValue("giftCode"));
                  giftsLimitRow.setValue("giftId", giftRow.getValue("giftId"));
                  giftsLimitRow.setValue("giftName", giftRow.getValue("giftName"));
                  giftsLimitRow.setValue("giftType", giftRow.getValue("giftType"));
              }
          },
          // 导入买赠-赠品数量累计增行
          giftAddWhenImport: function (arrayRow) {
              //如果是否累计限量为否，则返回，否则在赠品累计限制添加不重复的一行
              var totalLimitFlag = viewModel.ProductCombineList.getFocusRow().getValue("totalLimitFlag");
              if (totalLimitFlag == null || totalLimitFlag == 0) {
                  return;
              }
              var giftCode = arrayRow["giftCode"];
              var giftObj = viewModel.giftObj;
              if (giftObj[giftCode]) {
                  giftObj[giftCode] = giftObj[giftCode] + 1;
              } else {
                  giftObj[giftCode] = 1;
                  var giftsLimitRow = viewModel.GiftsLimitItems.createEmptyRow();
                  //新增赠品累计限制
                  giftsLimitRow.setValue("giftCode", arrayRow["giftCode"]);
                  giftsLimitRow.setValue("giftId", arrayRow["giftId"]);
                  giftsLimitRow.setValue("giftName", arrayRow["giftName"]);
                  giftsLimitRow.setValue("giftType", arrayRow["giftType"]);
              }
          },
          giftIsDelHandle: function (giftData) {
              var giftCodeArr = [];
              var giftObj = viewModel.giftObj;
              if (u.isArray(giftData)) {
                  giftCodeArr = giftData;
              } else {
                  var giftCode = giftData.getValue("giftCode");
                  giftCodeArr.push(giftCode);
              }
              for (var i = 0; i < giftCodeArr.length; i++) {
                  if (giftObj[giftCodeArr[i]] > 1) {
                      giftObj[giftCodeArr[i]] = giftObj[giftCodeArr[i]] - 1;
                  } else {
                      delete giftObj[giftCodeArr[i]];
                      var giftsLimitRow = viewModel.GiftsLimitItems.getRowByField("giftCode", giftCodeArr[i]);
                      //删除赠品累计限制
                      viewModel.GiftsLimitItems.removeRow(giftsLimitRow);
                  }
              }
          },
          //拿到所有的买赠赠品
          giftObjSetHandle: function () {
              var giftRowArr = [];
              var promotionBench = viewModel.ProductCombineList.getCurrentRow().getValue("promotionBench");
              var rows;
              if (promotionBench == 3) {
                  rows = viewModel.BuyGiftItems2.getAllRows();
                  for (var k = 0; k < rows.length; k++) {
                      var giftRows = rows[k].getValue("giftInfos").getAllRows();
                      for (var j = 0; j < giftRows.length; j++) {
                          giftRowArr.push(giftRows[j]);
                      }
                  }
              } else {
                  rows = viewModel.BuyGiftItems.getAllRows();
                  for (var k = 0; k < rows.length; k++) {
                      var childRowArr = rows[k].getValue("conditionInfos").getAllRows();
                      for (var i = 0; i < childRowArr.length; i++) {
                          var giftRows = childRowArr[i].getValue("giftInfos").getAllRows();
                          for (var j = 0; j < giftRows.length; j++) {
                              giftRowArr.push(giftRows[j]);
                          }
                      }
                  }
              }

              var giftCodeArr = giftRowArr.map(function (item) {
                  return item.getValue("giftCode");
              });

              var giftObj = viewModel.giftObj;
              for (var m = 0; m < giftCodeArr.length; m++) {
                  if (giftObj[giftCodeArr[m]]) {
                      giftObj[giftCodeArr[m]] = giftObj[giftCodeArr[m]] + 1;
                  } else {
                      giftObj[giftCodeArr[m]] = 1;
                  }
              }
          },
          /****************************买赠 end*****************************/

          //删除和批量删除
          del: function (data, rowId) {
              if (typeof data == "number") {
                  viewModel.ProductCombineList.setRowSelectbyRowId(rowId);
              }
              var ids = [];
              var rows = viewModel.ProductCombineList.getSelectedRows();
              if (rows.length == 0) {
                  toastr.error("请选择数据");
                  return;
              }
              if (rows && rows.length > 0) {
                  for (var i = 0; i < rows.length; i++) {
                      ids.push(rows[i].getValue("id"));
                  }
              }
              common.dialog.confirmDialog({
                  msg1: "确认删除这些项？",
                  msg2: "此操作不可逆",
                  width: "400px",
                  type: "error",
                  onOk: function () {
                      $._ajax({
                          url: appCtx + viewModel.baseurl + "/delete",
                          type: "post",
                          // data: "ids=" + ids.join(","),
                          data: {
                              ids: ids.join(",")
                          },
                          success: function (data) {
                              viewModel.ProductCombineList.removeRows(rows);
                          }
                      });
                  }
              });
          },
          //停用和批量停用
          disable: function (data, rowId) {
              if (typeof data == "number") {
                  viewModel.ProductCombineList.setRowSelectbyRowId(rowId);
              }
              var ids = [];
              var rows = viewModel.ProductCombineList.getSelectedRows();
              if (rows.length == 0) {
                  toastr.error("请选择数据");
                  return;
              }
              if (rows && rows.length > 0) {
                  for (var i = 0; i < rows.length; i++) {
                      ids.push(rows[i].getValue("id"));
                  }
              }
              common.dialog.confirmDialog({
                  msg1: "确认停用这些项？",
                  msg2: "此操作不可逆",
                  width: "400px",
                  type: "error",
                  onOk: function () {
                      $._ajax({
                          url: appCtx + viewModel.baseurl + "/batch-disable",
                          type: "post",
                          // data: "ids=" + ids.join(","),
                          data: {
                              ids: ids.join(",")
                          },
                          success: function (data) {
                              viewModel.search();
                          }
                      });
                  }
              });
          },
          //启用和批量启用
          enable: function (data, rowId) {
              if (typeof data == "number") {
                  viewModel.ProductCombineList.setRowSelectbyRowId(rowId);
              }
              var ids = [];
              var rows = viewModel.ProductCombineList.getSelectedRows();
              if (rows.length == 0) {
                  toastr.error("请选择数据");
                  return;
              }
              if (rows && rows.length > 0) {
                  for (var i = 0; i < rows.length; i++) {
                      ids.push(rows[i].getValue("id"));
                  }
              }
              common.dialog.confirmDialog({
                  msg1: "确认启用这些项？",
                  msg2: "此操作不可逆",
                  width: "400px",
                  type: "error",
                  onOk: function () {
                      $._ajax({
                          url: appCtx + viewModel.baseurl + "/batch-enable",
                          type: "post",
                          // data: "ids=" + ids.join(","),
                          data: {
                              ids: ids.join(",")
                          },
                          success: function (data) {
                              viewModel.search();
                          }
                      });
                  }
              });
          },
          //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
          search: function (reindex) {
              if (reindex) {
                  viewModel.ProductCombineList.pageIndex(0);
              }
              viewModel.ProductCombineList.removeAllRows();
              var queryData = singledocSearch.getDataWithOpr();
              //添加默认条件isShow=1
              queryData.search_EQ_isShow = 1;

              var pageSize = viewModel.ProductCombineList.pageSize();
              var pageNumber = viewModel.ProductCombineList.pageIndex();
              queryData.page = pageNumber;
              queryData.size = pageSize;
              $._ajax({
                  type: "get",
                  url: appCtx + viewModel.baseurl,
                  dataType: "json",
                  data: queryData,
                  success: function (data) {
                      viewModel.ProductCombineList.setSimpleData(data.content, {unSelect: true});
                      viewModel.ProductCombineList.totalRow(data.totalElements);
                      viewModel.ProductCombineList.totalPages(data.totalPages);
                  }
              });
          },
          //清空搜索条件
          cleanSearch: function () {
              singledocSearch.clearSearch();
          },
          //页码改变时的回调函数
          pageChange: function (index) {
              viewModel.ProductCombineList.pageIndex(index);
              viewModel.search();
          },
          //页码改变时的回调函数
          sizeChange: function (size) {
              viewModel.ProductCombineList.pageSize(size);
              viewModel.search(true);
          },
          //进入新增单据页
          showAddBillPanel: function () {
              var curRow = viewModel.ProductCombineList.createEmptyRow();

              viewModel.ProductCombineList.setRowFocus(curRow);
              viewModel.goBillPanel();
              viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
              //表头的促销方式和促销基准赋默认值
              curRow.setValue("promotionBench", 1);
              curRow.setValue("promWay", 1);
              //前置条件为无
              curRow.setValue("precondition", 0);
              curRow.setValue("isAllProduct", 1);

              //阶梯方式和赠品基准不能编辑
              var ladderWayId = app.getComp("ladderWayId");
            //  ladderWayId.setEnable(false);
              var giftStandardId = app.getComp("giftStandardId");
              giftStandardId.setEnable(false);
              //促销方式和促销基准的值监听者赋值
              viewModel.promotionValueObserve(1);
              viewModel.benchValueObserve(1);
              //清空涉及的所有子表
               viewModel.PreconditionItems.removeAllRows();
              viewModel.PreconditionChildItems.removeAllRows();
              viewModel.BuyGiftItems.removeAllRows();
              viewModel.BuyGiftItems2.removeAllRows();
              viewModel.giftsProductItems.removeAllRows();
              viewModel.GiftsLimitItems.removeAllRows();
              viewModel.priceItems.removeAllRows();
              viewModel.proRangeList.removeAllRows();
              viewModel.orderStandDepreciateItems.removeAllRows();
              // 编辑界面赋“是否取消”的值为初始值0
              viewModel.isPromBenchShowDialog = 0;
              //
              viewModel.giftObj = {};
          },

          //进入修改单据页
          showEditBillPanel: function (index) {
              if(typeof index == "number") {
                viewModel.ProductCombineList.setRowFocus(index);
                var isEnable = viewModel.ProductCombineList.getValue("isEnable");
                if (isEnable == 1) {
                    toastr.warning("启用状态的促销规则不允许编辑。");
                    return;
                }
              }
              //编辑界面赋“是否取消”的值为初始值0
              viewModel.isPromBenchShowDialog = 0;
              var id;
              //活动页面查看规则页面，则查询一下主表信息
              if (globleParams["src"] == "activityRuleEdit") {
                  id = globleParams["ruleId"];
                  viewModel.findMainRuleInfo(id);
              } else {
                  id = viewModel.ProductCombineList.getValue("id");
                  viewModel.ProductCombineList.originEditData = viewModel.ProductCombineList.getFocusRow().getSimpleData();
                  //查询子表数据
              }


              // if(!viewModel.canInEdit()) {
              //   return;
              // }

              viewModel.findByParentid(id);
              viewModel.goBillPanel();
              viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
              //存买赠规则的下的赠品，方便删除
              viewModel.giftObjSetHandle();
          },
          detail: function () {
              //是否全部商品
              var isAllProductCheckBox = app.getComp("isAllProductId");
              isAllProductCheckBox.setEnable(false);
              var ladderWayIdCheckBox = app.getComp("ladderWayId_detail");
              ladderWayIdCheckBox.setEnable(false);
              var giftStandardCheckBox = app.getComp("giftStandardId_detail");
              giftStandardCheckBox.setEnable(false);

              var totalLimitFlagBox = app.getComp("totalLimitFlagId");
              totalLimitFlagBox.setEnable(false);

              //确保grid先将行设置为focus状态
              setTimeout(function () {
                  var id;
                  //活动页面查看规则页面，则查询一下主表信息
                  if (globleParams["src"] == "viewRule") {
                      id = globleParams["ruleId"];
                      viewModel.findMainRuleInfo(id);
                  } else {
                      var curRow = viewModel.ProductCombineList.getCurrentRow();
                      id = curRow.getValue("id");
                  }

                  viewModel.findByParentid(id);
                  viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                  viewModel.goDetailPanel();
              }, 100);
          },

          findMainRuleInfo: function (id) {
              $._ajax({
                  url: appCtx + viewModel.baseurl + "/findOneById",
                  type: "get",
                  async: false,
                  data: {
                      id: id
                  },
                  success: function (data) {
                      viewModel.ProductCombineList.setSimpleData(data);
                  }
              });
          },

          //查询子表数据
          findByParentid: function (id) {
              // var listRow = viewModel.ProductCombineList.getRow(index);
              // var curRowData = listRow.getSimpleData();
              // viewModel.BuyGiftItems.setSimpleData(data);
              // console.log(curRowData);
              $._ajax({
                  url: appCtx + viewModel.baseurl + "/findOneById",
                  type: "get",
                  async: false,
                  data: {
                      id: id
                  },
                  success: function (data) {
                      viewModel.PreconditionItems.setSimpleData(data.rulePreDetailAggs);
                      viewModel.BuyGiftItems.setSimpleData(data.ruleDetailAggs);
                      viewModel.BuyGiftItems2.setSimpleData(data.detailConAggs);
                      viewModel.GiftsLimitItems.setSimpleData(data.ruleGiftLimitDetails);
                      //商品范围
                      viewModel.proRangeList.setSimpleData(data.prodScapes);
                      viewModel.priceItems.setSimpleData(data.priceRuleAggs);
                      viewModel.orderStandDepreciateItems.setSimpleData(data.priceRuleOrderAggs);
                      //给促销方式，促销基准的监听者赋值
                      viewModel.promotionValueObserve(viewModel.ProductCombineList.getValue("promWay"));
                      viewModel.benchValueObserve(viewModel.ProductCombineList.getValue("promotionBench"));
                      viewModel.promOrderCondition.setSimpleData(data.promOrderCondition);
                  }
              });
          },
          // 清除基类属性
          clearBaseProp: function (row) {
              row.setValue("id", "");
              row.setValue("code", "");
              row.setValue("name", "");
              row.setValue("creator", "");
              row.setValue("creationTime", "");
              row.setValue("modifier", "");
              row.setValue("modifiedTime", "");
          },

          //保存单据
          saveBill: function () {
              if(viewModel.promotionValueObserve() == 0){
                  viewModel.GiftsLimitItems.removeAllRows();
              }
              //规则主表值
              var data = viewModel.ProductCombineList.getCurrentRow().getSimpleData();
              var totalLimitFlag = data.totalLimitFlag;
              //校验主表的必输性
              var productBase = $("#ruleMainInfo")[0];
              var basePass = viewModel.validate(productBase);
              var giftLimitDiv = $("#giftLimitDiv")[0];
              var giftPass = viewModel.validate(giftLimitDiv);
              if (totalLimitFlag != "1") {
                  giftPass.passed = true;
              }
              var dialog_content_preconditionChild = $("#dialog_content_preconditionChild")[0];
              var preValRes;
              var preValMsg;
              //是否有前置条件,有则校验前置条件
              var precondition = data["precondition"];
              if (precondition && precondition == 1) {
                  preValRes = viewModel.validate(dialog_content_preconditionChild);
                  //规则前置条件表
                  var rulePreDetailAggs = viewModel.PreconditionItems.getSimpleData();
                  //整单前置条件
                  var OrderConditon = viewModel.promOrderCondition.getSimpleData();
                  for(var j=0;j<OrderConditon.length;j++){
                      var Condition = OrderConditon[j].oneCondition;
                      for(var i=0;i<Condition.length;i++){
                          if(!Condition[i].id){
                              Condition[i].persistStatus = 'new';
                          }
                      }
                  }
                  data.promOrderCondition = OrderConditon;
                      //校验前置条件表的数据正确性
                  preValMsg = viewModel.checkRulePreDetailAggs(rulePreDetailAggs,OrderConditon);
              }

              if (basePass.passed && giftPass.passed && (preValRes == null || preValRes.passed) && preValMsg == null) {
                  //假如“是否全部商品为空”，则设置默认值为0
                  var isAllProduct = data["isAllProduct"];
                  if (isAllProduct == null || isAllProduct.length == 0) {
                      data["isAllProduct"] = 0;
                  }
                  //假如“启用状态”为空，则设置默认值为0
                  var isEnable = data["isEnable"];
                  if (isEnable == null) {
                      data["isEnable"] = 0;
                  }
                  //如果是从活动来的，则显示字段为：0，否则为1
                  if (globleParams["src"] == "activity" || globleParams["src"] == "activityRuleEdit") {
                      data["isShow"] = 0;
                  } else {
                      data["isShow"] = 1;
                  }

                  //规则赠品累计限制表
                  var ruleGiftLimitDetails = viewModel.GiftsLimitItems.getSimpleData();
                  //促销基准
                  var promotionBench = viewModel.ProductCombineList.getFocusRow().getValue("promotionBench");
                  //如果有前置条件，则保存
                  if (precondition && precondition == 1) {
                      data.rulePreDetailAggs = rulePreDetailAggs;
                  }
                  data.ruleGiftLimitDetails = ruleGiftLimitDetails;
                  if (promotionBench == 3) {
                      //基础基准为订单时的订单买赠规则子表
                      var buyGiftOrderData = viewModel.BuyGiftItems2.getSimpleData();
                      //校验买赠方式订单金额基准的数量正确性
                      var errorMsg = viewModel.checkBuyGiftOrderData(buyGiftOrderData);
                      if (errorMsg != null) {
                          toastr.error(errorMsg);
                          return;
                      }
                      data.detailConAggs = buyGiftOrderData;
                  } else {
                      //基础基准为商品时的商品买赠规则子表
                      var buyGiftProData = viewModel.BuyGiftItems.getSimpleData();
                      //校验买赠方式商品基准的数量正确性
                      var errorMsg = viewModel.checkBuyGiftProData(buyGiftProData);
                      if (errorMsg != null) {
                          toastr.error(errorMsg);
                          return;
                      }
                      data.ruleDetailAggs = buyGiftProData;
                  }

                  //促销方式为降价的涉及的子表的保存 --begin
                  var allRows = viewModel.priceItems.getAllRows();
                  // if(allRows.length == 0 || allRows.every(function(row){return row.status == u.Row.STATUS.FALSE_DELETE})) {
                  //   toastr.error("请录入表体行数据");
                  //   return;
                  // }
                  //促销方式为降价，基准为商品时的价格表
                  var priceItemData = viewModel.priceItems.getSimpleData();
                  var priceProMsg = viewModel.checkPriceProData(priceItemData);
                  if (priceProMsg != null) {
                      toastr.error(priceProMsg);
                      return;
                  }
                  data.priceRuleAggs = priceItemData;
                  //促销方式为降价，基准为订单时的商品范围表
                  var proRangeList = viewModel.proRangeList.getSimpleData();
                  data.prodScapes = proRangeList;
                  var totalDiscount = data["totalDiscount"];
                  //促销方式为降价，基准为订单时的订单表
                  var orderPriceCutData = viewModel.orderStandDepreciateItems.getSimpleData();
                  var orderMsg = viewModel.checkPriceOrderData(orderPriceCutData);
                  if (orderMsg != null) {
                      toastr.error(orderMsg);
                      return;
                  }
                  var proBench = data["promotionBench"];
                  var promWay = data["promWay"];

                  var isRepeat = viewModel.checkUnique(data);
                  if (isRepeat == 1) return;
                  data.priceRuleOrderAggs = orderPriceCutData;
                  //促销方式为降价的涉及的子表的保存 --end
                  var _ajaxType = viewModel.ProductCombineList.getValue("id") ? "put" : "post";
                  $._ajax({
                      url: appCtx + viewModel.baseurl,
                      type: _ajaxType,
                      data: JSON.stringify(data),
                      contentType: "application/json; charset=utf-8",
                      success: function (data) {
                          if (globleParams["src"] == "activity" || globleParams["src"] == "activityRuleEdit") {
                              globleParams["callback"](data["id"], data["ruleDescripe"], data["name"]);
                          } else {
                              viewModel.ProductCombineList.getFocusRow().setSimpleData(data);
                              viewModel.retListPanel();
                              viewModel.search();
                          }
                      }
                  });
                  //保存时，是否显示对话框为不显示
                  viewModel.isPromBenchShowDialog = 1;
              } else if (preValMsg != null && preValMsg.length != 0) {
                  toastr.error(preValMsg);
              }
          },
          //校验买赠方式订单金额基准的数量正确性
          checkBuyGiftOrderData: function (orderData) {

              var promotionBench = viewModel.ProductCombineList.getFocusRow().getValue("promotionBench");
              var promotionWay = viewModel.ProductCombineList.getFocusRow().getValue("promWay");
              if (promotionBench == 3 && promotionWay == 1) {
                  if (orderData == null || orderData.length == 0)
                      return "子表不能为空";
              }

              if (orderData) {
                  for (var i = 0; i < orderData.length; i++) {
                      //下限
                      var giftConditionStart = parseInt(orderData[i]["giftConditionStart"]);
                      //上限
                      var giftConditionEnd = parseInt(orderData[i]["giftConditionEnd"]);
                      if (giftConditionStart == null || giftConditionEnd == null) {
                          return "请完善上行阶梯规则";
                      }
                      if (giftConditionStart > giftConditionEnd) {
                          return "下限值需要大于上限值";
                      }
                  }
              }
          },
          //校验买赠方式商品基准的数量正确性
          checkBuyGiftProData: function (data) {

              if (data.length>0) {
                  for (var i = 0; i < data.length; i++) {
                      var conditionInfos = data[i]["conditionInfos"];
                      if (conditionInfos == null || conditionInfos.length == 0) {
                          return "请录入阶梯信息";
                      }
                      for (var j = 0; j < conditionInfos.length; j++) {
                          //下限
                          var giftConditionStart = parseInt(conditionInfos[j]["giftConditionStart"]);
                          //上限
                          var giftConditionEnd = parseInt(conditionInfos[j]["giftConditionEnd"]);
                          //每满
                          var fullcut = parseInt(conditionInfos[j]["eachFull"]);

                          if (!giftConditionStart || !giftConditionEnd) {
                              return "请完善上行阶梯规则";
                          }
                          if (giftConditionStart > giftConditionEnd) {
                              return "下限值需要大于上限值";
                          }
                          if(!fullcut){
                              return "请完善美满数量";
                          }
                          if (fullcut && fullcut > giftConditionEnd) {
                              return "每满不能大于上限值";
                          }
                          var giftInfos = conditionInfos[j]["giftInfos"];
                          if (giftInfos == null || giftInfos.length == 0) {
                              return "请添加赠品信息";
                          }
                          for (var t = 0; t < giftInfos.length; t++) {
                              var giftAmout = giftInfos[t]["giftAmout"];
                              if (giftAmout == null) {
                                  return "赠品数量不可为空";
                              }
                              if (giftAmout <= 0) {
                                  return "赠品数量不可为负数";
                              }
                              var giftTotalNum;
                              var ruleGiftLimitDetails = viewModel.GiftsLimitItems.getSimpleData();
                              for (var limitNum = 0; limitNum < ruleGiftLimitDetails.length; limitNum++) {
                                  if (ruleGiftLimitDetails[limitNum]["giftId"] == giftInfos[t]["giftId"]) {
                                      giftTotalNum = ruleGiftLimitDetails[limitNum]["num"];
                                      break;
                                  }
                              }
                              if (giftTotalNum && parseFloat(giftAmout) > parseFloat(giftTotalNum)) {
                                  return "赠品数量不可大于累计限量";
                              }

                          }
                      }

                  }
              }
          },
          //校验降价方式商品基准的数量正确性
          checkPriceProData: function (data) {
              var limitFlag = viewModel.ProductCombineList.getCurrentRow().getSimpleData()["totalLimitFlag"];
              if (data) {
                  for (var i = 0; i < data.length; i++) {
                      var conditionInfos = data[i]["conditionInfos"];
                      if (conditionInfos == null || conditionInfos.length == 0) {
                          return "请录入阶梯信息";
                      }
                      for (var j = 0; j < conditionInfos.length; j++) {
                          //下限
                          var lowerLimit = parseInt(conditionInfos[j]["lowerLimit"]);
                          //上限
                          var higherLimit = parseInt(conditionInfos[j]["higherLimit"]);
                          if (lowerLimit == null || higherLimit == null) {
                              return "请完善阶梯规则";
                          }
                          if (lowerLimit > higherLimit) {
                              return "下限值需要大于上限值";
                          }
                          //单价减
                          var fullcut = conditionInfos[j]["fullcut"];
                          //打折
                          var discount = conditionInfos[j]["discount"];
                          //一口价
                          var price = conditionInfos[j]["price"];
                          if (fullcut == null && discount == null && price == null) {
                              return "单价减,打折，一口价需要输入一个值";
                          }
                          if (fullcut && !viewModel.isPosNumber(fullcut)) {
                              return "单价减应该为正数";
                          }
                          if (discount && !viewModel.isPosNumber(discount)) {
                              return "打折应该为正数";
                          }
                          if (discount && discount > 100) {
                              return "打折应该小于100";
                          }
                          if (price && !viewModel.isPosNumber(price)) {
                              return "一口价应该为正数";
                          }

                      }
                      //校验累计限量必输
                      if (limitFlag && limitFlag == 1) {
                          var totalDiscount = data[i]["totalDiscount"];
                          if (totalDiscount == null || totalDiscount.length == 0) {
                              return "累计优惠值不能为空";
                          }
                      }


                  }
              }
          },
          //校验降价方式订单金额基准的数量正确性
          checkPriceOrderData: function (orderData) {
              var promotionBench = viewModel.ProductCombineList.getFocusRow().getValue("promotionBench");
              var promotionWay = viewModel.ProductCombineList.getFocusRow().getValue("promWay");
              if (promotionBench == 3 && promotionWay == 2) {
                  if (orderData == null || orderData.length == 0)
                      return "子表不能为空";
              }
              var limitFlag = viewModel.ProductCombineList.getCurrentRow().getSimpleData()["totalLimitFlag"];

              if (orderData) {
                  for (var i = 0; i < orderData.length; i++) {
                      var conditionInfos = orderData[i]["conditionInfos"];
                      if (conditionInfos) {
                          for (var jj = 0; jj < conditionInfos.length; jj++) {
                              //下限
                              var lowerLimit = parseInt(conditionInfos[jj]["lowerLimit"]);
                              //上限
                              var higherLimit = parseInt(conditionInfos[jj]["higherLimit"]);
                              if (lowerLimit == null || higherLimit == null) {
                                  return "请完善上行阶梯规则";
                              }
                              if (lowerLimit > higherLimit) {
                                  return "下限值需要大于上限值";
                              }
                              //单价减
                              var fullcut = conditionInfos[jj]["fullcut"];
                              //打折
                              var discount = conditionInfos[jj]["discount"];


                              if (fullcut == null && discount == null) {
                                  return "满减,打折需要输入一个值";
                              }
                              if (fullcut && !viewModel.isPosNumber(fullcut)) {
                                  return "满减应该为正数";
                              }
                              if (discount && !viewModel.isPosNumber(discount)) {
                                  return "打折应该为正数";
                              }
                              if (discount && discount > 100) {
                                  return "打折应该小于100";
                              }

                          }
                      }
                      //校验累计限量必输
                      if (limitFlag && limitFlag == 1) {
                          var totalDiscount = orderData[i]["totalDiscount"];
                          if (totalDiscount == null || totalDiscount.length == 0) {
                              return "累计优惠值不能为空";
                          }
                      }

                  }


              }
          },
          //校验前置条件：前置条件类型+开始日期+结束日期不能重合
          checkRulePreDetailAggs: function (rulePreDetailAggs,OrderConditon) {
              var msg;
              if ((rulePreDetailAggs == null || rulePreDetailAggs.length == 0)&&(OrderConditon==null||OrderConditon.length == 0))
                  return "前置条件需要录入";
              if(rulePreDetailAggs != null && rulePreDetailAggs.length != 0){
                  var conditonList = new Array();
                  for (var i = 0; i < rulePreDetailAggs.length; i++) {
                      var condition = rulePreDetailAggs[i]["preType"] + rulePreDetailAggs[i]["startTime"] + rulePreDetailAggs[i]["endTime"];
                      //判断array中是否存在该流程类型
                      if ($.inArray(condition, conditonList) != 0) {
                          conditonList.push(condition);
                      } else {
                          var currentOrder = i + 1;
                          msg = "序号为" + currentOrder + "的前置条件有重合的类型+开始日期+结束日期";
                          break;
                      }
                      //校验前置条件的金额和数量需要有值且必须为正数
                      if (rulePreDetailAggs[i]["preType"] != 4) {
                          var num = rulePreDetailAggs[i]["amount"];
                          if (num && viewModel.isPosNumber(num)) {

                          } else {
                              return "前置条件数量未能通过校验，数量需要有值且必须为整数。";
                          }
                      }

                  }
              }else{
                  for (var i = 0; i < OrderConditon.length; i++) {
                      var oneConditiion = OrderConditon[i];
                      var numMeeet = oneConditiion['numMeeet'];
                      var mnyMeet = oneConditiion['mnyMeet'];
                      if(!numMeeet&&!mnyMeet){
                          return "第"+(i+1)+"行前置条件中‘数量满足’或者‘金额满足’必须有一条有值";
                      }
                      if(numMeeet&&!viewModel.isPosNumber(numMeeet)){
                          return "第"+(i+1)+"行前置条件中‘数量满足’必须是正数";
                      }
                      if(mnyMeet&&!viewModel.isPosNumber(mnyMeet)){
                          return "第"+(i+1)+"行前置条件中‘金额满足’必须是正数";
                      }
                      var oneCondition =  oneConditiion['oneCondition'];
                      if(!oneCondition||oneCondition.length==0){
                          return  "第"+(i+1)+"行前置条件中'订单商品范围'必须至少包含一条数据";
                      }
                      for(var j = 0; j < oneCondition.length; j++){
                          var goodsInfo = oneCondition[j];
                          var goodsId = goodsInfo['goodsId'];
                          if(!goodsId){
                             return "在'订单商品范围'中存在无ID的货物";
                          }
                          var goodsScopeType = goodsInfo['goodsScopeType'];
                          if(!goodsScopeType){
                              return "在'订单商品范围'中存在无类型的货物";
                          }
                      }
                  }
              }

              return msg;
          },
          //重置单据
          resetBill: function () {
              // var curRow = viewModel.ProductCombineList.getCurrentRow();
              // 新增重置
              // 编辑重置（修改或复制）
          },
          //取消单据
          cancelBill: function () {
              if (globleParams["src"] == "activity" || globleParams["src"] == "activityRuleEdit") {
                  globleParams["callback"]();
              } else {
                  viewModel.isPromBenchShowDialog = 1;
                  var curRow = viewModel.ProductCombineList.getCurrentRow();
                  // 修改，则还原
                  if (curRow.getValue("id")) {
                      curRow.setSimpleData(viewModel.ProductCombineList.originEditData);
                  } else {
                      // 新增或复制，则删除
                      viewModel.ProductCombineList.removeRow(curRow);
                  }
                  viewModel.retListPanel();
              }
          },
          validate: function (element) {
              var result = app.compsValidateMultiParam({element: element, showMsg: true});
              return result;
          },

          // 放回列表页
          retListPanel: function () {
              //如果是从活动页面过来的，则调回到活动页面，否则回到规则页面
              if (globleParams["src"] == "viewRule") {
                  globleParams["callback"]();
              } else {
                  viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
                  common.bill.retListPanel();
              }
          },
          checkUnique: function (data) {
              var ruleDetailAggs = data.ruleDetailAggs;
              var proArray = new Array();
              //检查买赠-商品数量/商品金额的录入
              if (ruleDetailAggs) {
                  for (var i = 0; i < ruleDetailAggs.length; i++) {
                      var proId = ruleDetailAggs[i]["proId"];
                      var repeatIndex = $.inArray(proId, proArray);
                      if (repeatIndex != -1) {
                          toastr.error("有重复的商品录入：" + ruleDetailAggs[i]["proCode"]);
                          return 1;
                      }
                      proArray[i] = proId;
                  }
              }
              //检查降价-商品数量/商品金额的录入
              var priceRuleAggs = data.priceRuleAggs;
              if (priceRuleAggs) {
                  for (var i = 0; i < priceRuleAggs.length; i++) {
                      var proId = priceRuleAggs[i]["proId"];
                      var repeatIndex = $.inArray(proId, proArray);
                      if (repeatIndex != -1) {
                          toastr.error("有重复的商品录入：" + priceRuleAggs[i]["showCode"]);
                          return 1;
                      }
                      proArray[i] = proId;
                  }
              }
              //前置条件为基于订单数量时录入的商品，产品，商品分类至少录入一行数据
              var rulePreDetailAggs = data.rulePreDetailAggs;
              if (rulePreDetailAggs) {
                  for (var i = 0; i < rulePreDetailAggs.length; i++) {
                      if (rulePreDetailAggs[i]["preType"] != 4) continue;
                      var ruleProInfoDetails = rulePreDetailAggs[i].ruleProInfoDetails;
                      if (ruleProInfoDetails == null || ruleProInfoDetails.length == 0) {
                          toastr.error("前置条件为基于订单数量时录入的商品，产品，商品分类至少录入一行数据");
                          return 1;
                      } else {
                          var notDeleteNum = 0;
                          for (var i = 0; i < ruleProInfoDetails.length; i++) {
                              if (ruleProInfoDetails[i]["persistStatus"] != "fdel")
                                  notDeleteNum = notDeleteNum + 1;
                          }
                          if (notDeleteNum == 0) {
                              toastr.error("前置条件为基于订单数量时录入的商品，产品，商品分类至少录入一行数据");
                              return 1;
                          }
                      }
                  }
              }
              return 0;
          }
      };
      viewModel = u.extend(
          {},
          baseData,
          events,
          rendertype
          /*, bpmopenbill.model*/
      );

      function appInit(element, params) {
          globleParams = params;

          //将模板页渲染到页面上
          element.innerHTML = tpl;

          //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
          app = u.createApp({
              el: element,
              model: viewModel
          });
          viewModel.app = app;
          // 查询组件初始化
          singledocSearch = new searchbox($("#ProductCombine-searchcontent")[0], [
              // {
              //   type:"refer",
              //   key:"pkOrg--id",
              //   label:"所属组织",
              //   refinfo:"organization_ocm"
              // },
              {
                  type: "text",
                  key: "code",
                  label: "规则编码"
              },
              {
                  type: "text",
                  key: "name",
                  label: "规则名称"
              },
              {
                  type: "combo",
                  key: "isEnable",
                  label: "启用状态",
                  dataSource: [
                      {value: '', name: '全部'},
                      {value: '0', name: '未启用'},
                      {value: '1', name: '已启用'},
                      {value: '2', name: '已停用'}
                  ]
              },
              {
                  type: "combo",
                  key: "promotionBench",
                  label: "促销基准",
                  dataSource: [
                      {value: "", name: "全部"},
                      {value: "1", name: "商品数量"},
                      {value: "2", name: "商品金额"},
                      {value: "3", name: "订单金额"},

                  ]
              },

          ]);
          // 列表查询数据(无查询条件)
          if (globleParams["src"] == "viewRule") {
              //活动页面查看规则页面
              viewModel.detail();
          } else if (globleParams["src"] == "activity") {
              viewModel.showAddBillPanel();
          }
          else if (globleParams["src"] == "activityRuleEdit") {
              viewModel.showEditBillPanel("activityRuleEdit");
          }
          else {
              viewModel.search();
              // 子表参照聚焦行，用于绑定子表参照组件
              var refRow = viewModel.ItemRefList.createEmptyRow();
              viewModel.ItemRefList.setRowFocus(refRow);
          }
      }

      function afterRender() {
          //绑定输入框enter事件
          $("#ProductCombine-searchcontent input")
              .off("keydown")
              .on("keydown", function (e) {
                  if (e.keyCode == 13) {
                      $(this).blur();
                      viewModel.search();
                  }
              });
          // 校验输入为正数
          $(".ui-rules-bill-body").off("blur", "input.u-input").on("blur", "input.u-input", function(e) {
            if (!(/(^[1-9]\d*$)/.test(e.target.value || 0))) {
                var temp = $(e.target.parentElement);
                var i = 0;
                while(temp){
                    i++;
                    if(temp.attr("id")=="grid_productCombineItem"){
                        return;
                    }
                    if(i>10){
                        break;
                    }
                    temp = temp.parent();
                }
              toastr.info("请输入正整数");
            }
          })
          // 确定销售产品参照，为产品组合子表增行
          viewModel.ItemRefList.on("productref.valuechange", function (obj) {
              // 清空参照时不增行
              if (!obj.newValue) {
                  return;
              }
              var refer = $("#refContainerproductref").data("uui.refer");
              var refValues = refer.values;
              if (refValues && refValues.length > 0) {
                  for (var i = 0; i < refValues.length; i++) {
                      var id = refValues[i].refpk;
                      var row = viewModel.BuyGiftItems.getRowByField("proId", id);
                      if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
                          var newrow = viewModel.BuyGiftItems.createEmptyRow();
                          newrow.setValue("proCode", refValues[i].refcode);
                          newrow.setValue("proName", refValues[i].refname);
                          newrow.setValue("proId", id);
                      }
                  }
              }
          });
          viewModel.PreconditionItems.on("preType.valuechange", function (obj) {
              if (obj.newValue == "4") {
                  console.log(app.getComp("grid_PreconditionItems"));
              }
          });
          // 切换买赠-促销基准
          viewModel.ProductCombineList.on("promotionBench.valuechange", function (
              obj
          ) {
              var newPromBench = obj.newValue;
              var oldPromBench = obj.oldValue;
              if (obj.ctx == "yes") return;

              if (viewModel.isPromBenchShowDialog == 1) return;
              common.dialog.confirmDialog({
                  msg1: "确认要切换促销基准吗？",
                  msg2: "此操作不可逆",
                  width: "400px",
                  type: "error",
                  onOk: function () {
                      //买赠子表的变化
                      viewModel.BuyGiftItems.removeAllRows();
                      viewModel.BuyGiftItems2.removeAllRows();
                      viewModel.GiftsLimitItems.removeAllRows();
                      viewModel.giftObj = {};
                      viewModel.benchValueObserve(newPromBench);
                      viewModel.ruleValueChange(newPromBench);
                      viewModel.ProductCombineList.setValue("isAllProduct", 1);
                      viewModel.priceItems.removeAllRows();
                      viewModel.proRangeList.removeAllRows();
                      viewModel.orderStandDepreciateItems.removeAllRows();
                  },
                  onCancel: function () {
                      obj.rowObj.setValue("promotionBench", obj.oldValue, "yes");
                  }
              });
          });
          // 促销方式切换
          viewModel.ProductCombineList.on("promWay.valuechange", function (obj) {
              var promotion = obj.newValue;
              if (obj.ctx == "yes") return;

              if (viewModel.isPromBenchShowDialog == 1) return;
              common.dialog.confirmDialog({
                  msg1: "确认要切换促销方式吗？",
                  msg2: "此操作不可逆",
                  width: "400px",
                  type: "error",
                  onOk: function () {
                      if (promotion == 1) {
                          //买赠相关的界面全部清除和隐藏
                          viewModel.promotionValueObserve(1);
                      } else {
                          viewModel.promotionValueObserve(2);
                      }

                      viewModel.giftObj = {};
                      viewModel.BuyGiftItems.removeAllRows();
                      viewModel.BuyGiftItems2.removeAllRows();
                      viewModel.GiftsLimitItems.removeAllRows();
                      viewModel.priceItems.removeAllRows();
                      viewModel.proRangeList.removeAllRows();
                      viewModel.orderStandDepreciateItems.removeAllRows();
                  },
                  onCancel: function () {
                      obj.rowObj.setValue("promWay", obj.oldValue, "yes");
                  }
              });
          });

          viewModel.choosePromProductList.on("theSelected.valuechange", function (obj) {
              if(!viewModel.choosePromProductList.getSimpleData()[0].proSkuId) {
                app.getComp("withProSkuId").setEnable(!!obj.newValue);
              }
              if(!viewModel.choosePromProductList.getSimpleData()[0].proSpuId) {
                app.getComp("withProSpuId").setEnable(!!obj.newValue);
              }
              if(!viewModel.choosePromProductList.getSimpleData()[0].proCateId) {
                app.getComp("withProCateId").setEnable(!!obj.newValue);
              }
              if(!viewModel.choosePromProductList.getSimpleData()[0].proCombineId) {
                app.getComp("withProCombineId").setEnable(!!obj.newValue);
              }
              if(!viewModel.choosePromProductList.getSimpleData()[0].brandId) {
                app.getComp("withBrandId").setEnable(!!obj.newValue);
              }
              if(!viewModel.choosePromProductList.getSimpleData()[0].saleSeriesId) {
                app.getComp("withSaleSeriesId").setEnable(!!obj.newValue);
              }
              if(!viewModel.choosePromProductList.getSimpleData()[0].productLineId) {
                app.getComp("withProductLineId").setEnable(!!obj.newValue);
              }
          });
          viewModel.choosePromProductList.on("proSkuId.valuechange", function (obj) {
              app.getComp("prom_proSpuId").setEnable(!obj.newValue);
              app.getComp("prom_proCateId").setEnable(!obj.newValue);
              app.getComp("prom_proCombineId").setEnable(!obj.newValue);
              app.getComp("prom_brandId").setEnable(!obj.newValue);
              app.getComp("prom_saleSeriesId").setEnable(!obj.newValue);
              app.getComp("prom_productLineId").setEnable(!obj.newValue);
              if(viewModel.choosePromProductList.getSimpleData()[0].theSelected == 1) {
                  app.getComp("withProSkuId").setEnable(!obj.newValue);
              }
          });
          viewModel.choosePromProductList.on("proSpuId.valuechange", function (obj) {
              app.getComp("prom_proSkuId").setEnable(!obj.newValue);
              app.getComp("prom_proCateId").setEnable(!obj.newValue);
              app.getComp("prom_proCombineId").setEnable(!obj.newValue);
              app.getComp("prom_brandId").setEnable(!obj.newValue);
              app.getComp("prom_saleSeriesId").setEnable(!obj.newValue);
              app.getComp("prom_productLineId").setEnable(!obj.newValue);
              if(viewModel.choosePromProductList.getSimpleData()[0].theSelected == 1) {
                app.getComp("withProSpuId").setEnable(!obj.newValue);
              }
          });
          viewModel.choosePromProductList.on("proCombineId.valuechange", function (obj) {
              app.getComp("prom_proSkuId").setEnable(!obj.newValue);
              app.getComp("prom_proSpuId").setEnable(!obj.newValue);
              app.getComp("prom_proCateId").setEnable(!obj.newValue);
              app.getComp("prom_brandId").setEnable(!obj.newValue);
              app.getComp("prom_saleSeriesId").setEnable(!obj.newValue);
              app.getComp("prom_productLineId").setEnable(!obj.newValue);
              if(viewModel.choosePromProductList.getSimpleData()[0].theSelected == 1) {
                app.getComp("withProCombineId").setEnable(!obj.newValue);
              }
          });
          viewModel.choosePromProductList.on("proCateId.valuechange", function (obj) {
              app.getComp("prom_proSkuId").setEnable(!obj.newValue);
              app.getComp("prom_proSpuId").setEnable(!obj.newValue);
              app.getComp("prom_proCombineId").setEnable(!obj.newValue);
              app.getComp("prom_brandId").setEnable(!obj.newValue);
              app.getComp("prom_saleSeriesId").setEnable(!obj.newValue);
              app.getComp("prom_productLineId").setEnable(!obj.newValue);
              if(viewModel.choosePromProductList.getSimpleData()[0].theSelected == 1) {
                app.getComp("withProCateId").setEnable(!obj.newValue);
              }
          });
          viewModel.choosePromProductList.on("brandId.valuechange", function (obj) {
              app.getComp("prom_proSkuId").setEnable(!obj.newValue);
              app.getComp("prom_proSpuId").setEnable(!obj.newValue);
              app.getComp("prom_proCateId").setEnable(!obj.newValue);
              app.getComp("prom_proCombineId").setEnable(!obj.newValue);
              app.getComp("prom_saleSeriesId").setEnable(!obj.newValue);
              app.getComp("prom_productLineId").setEnable(!obj.newValue);
              if(viewModel.choosePromProductList.getSimpleData()[0].theSelected == 1) {
                app.getComp("withBrandId").setEnable(!obj.newValue);
              }
          });
          viewModel.choosePromProductList.on("saleSeriesId.valuechange", function (obj) {
              app.getComp("prom_proSkuId").setEnable(!obj.newValue);
              app.getComp("prom_proSpuId").setEnable(!obj.newValue);
              app.getComp("prom_proCateId").setEnable(!obj.newValue);
              app.getComp("prom_proCombineId").setEnable(!obj.newValue);
              app.getComp("prom_brandId").setEnable(!obj.newValue);
              app.getComp("prom_productLineId").setEnable(!obj.newValue);
              if(viewModel.choosePromProductList.getSimpleData()[0].theSelected == 1) {
                app.getComp("withSaleSeriesId").setEnable(!obj.newValue);
              }
          });
          viewModel.choosePromProductList.on("productLineId.valuechange", function (obj) {
              app.getComp("prom_proSkuId").setEnable(!obj.newValue);
              app.getComp("prom_proSpuId").setEnable(!obj.newValue);
              app.getComp("prom_proCateId").setEnable(!obj.newValue);
              app.getComp("prom_proCombineId").setEnable(!obj.newValue);
              app.getComp("prom_brandId").setEnable(!obj.newValue);
              app.getComp("prom_saleSeriesId").setEnable(!obj.newValue);
              if(viewModel.choosePromProductList.getSimpleData()[0].theSelected == 1) {
                app.getComp("withProductLineId").setEnable(!obj.newValue);
              }
          });
          // 促销方式输入
          $(".table-con price-pro").delegate(
              ".changeInput",
              "input propertychange",
              function () {
                  if ($(this).val()) {
                      $(this)
                          .closest(".con-second")
                          .siblings(".con-second")
                          .find(".changeInput")
                          .attr("disabled", true);
                  } else {
                      $(this)
                          .closest(".con-second")
                          .siblings(".con-second")
                          .find(".changeInput")
                          .attr("disabled", false);
                  }
              }
          );
          viewModel.ProductCombineList.on("totalLimitFlag.valuechange", function () {
                viewModel.GiftsLimitItems.removeAllRows();
          });
      }

      function init(element, params) {
          appInit(element, params);
          afterRender();

          parent.vm = viewModel;
          window.vm = viewModel;
      }

      return {
          init: init
      };
  }
);
