/**
 * 销售订单
 * @author yushf
 */
define([
  "text!./salesorder.html",
  "ocm_common",
  "ocm_baseview",
  "./meta.js",
  "./events.js",
  "./renderType.js",
  "/ocm-web/pages/purchase/purchaseorder/meta.js",
  "./purchaseEvent.js",
  "./purchaseAfterCreate.js",
  "../../flow/bpmapproveref/bpmopenbill.js",
  "./feeEvents.js",
  "interfaceFileImpl",
  "ajaxfileupload",
  "ossupload"
], function(
  tpl,
  common,
  baseview,
  model,
  events,
  rendertype,
  purchaseModel,
  purchaseEvent,
  purchaseAfterCreate,
  bpmopenbill,
  feeEvent
) {
  var viewModel, app;
  var view = baseview.extend({
      beforeCreate: function() {
          viewModel = this.viewModel;
          app = this.app;
          viewModel = _.extend(viewModel, rendertype(viewModel));
          viewModel = _.extend(viewModel, events(viewModel));
          viewModel = _.extend(
              viewModel,
              purchaseEvent(viewModel, purchaseModel, CONST)
          );
          viewModel = _.extend(viewModel, feeEvent(viewModel, purchaseModel, CONST));
          viewModel = _.extend(viewModel, bpmopenbill.model);
          // viewModel = u.extend({},baseData,events,rendertype,bpmopenbill.model)

          // 列表查询数据(无查询条件)
          // var tempstructrow = viewModel.soProductStrucs.createEmptyRow();
          // viewModel.tempstructData = tempstructrow.getSimpleData();
          // 产品搜索条件初始化
          // viewModel.productSearchParam.createEmptyRow();
          // 列表查询数据(无查询条件)
          // viewModel.search();

          //处理由报表跳转过来的逻辑
          var paramHref = window.location.href;
          var paramobj = common.getParameter(paramHref);
          if (paramobj.orderCode) {
              viewModel.findByorderCode(paramobj.orderCode);
          }
          viewModel.flushSelected = [];
      },
      tpl: tpl,
      model: model,
      // rendertype: rendertype(view),
      baseData: {
          //地址簿
          addresscardcomp: {},
          // 假数据 todo...
          purchaseDatas: model.options.visualData,
          // 地址编辑事件
          addressInfo: common.address.addressInfo,
          baseurl: "/b2b/order",
          applicationUrl: "/b2b/order",
          daichukuurl: "/b2b/home/query-deliveryoutbountPage",
          dialogWidth: "800px",
          salesorderList: new u.DataTable(model.options.metas.soitemmeta), //列表
          salesorderCard: new u.DataTable(model.options.metas.someta), //编辑
          salesorderDetailCard: new u.DataTable(model.options.metas.someta), //详情
          saleOrderItems: new u.DataTable(model.options.metas.soitemmeta), //订单行
          // 待关闭订单条目
          closeOrderItems: new u.DataTable(model.options.metas.soitemmeta),
          // 批量操作订单条目列表
          batchSaleOrderItems: new u.DataTable(model.options.metas.soitemmeta),
          // bom 结构
          batchSaleOrderBomItems: new u.DataTable(model.options.metas.BomItem),
          saveCheckCreditDetailItems: new u.DataTable(
              model.options.metas.saveCheckCreditMeta
          ),
          saveCheckAccountDetailItems: new u.DataTable(
              model.options.metas.saveCheckAccountMeta
          ),
          saveFilledTrayDetailItems: new u.DataTable(
              model.options.metas.saveFilledTrayMeta
          ),
          saveFilledCarDetailItems: new u.DataTable(
              model.options.metas.saveFilledCarMeta
          ),
          currowBomNum: ko.observable(0),
          // 是否bom页签
          isBomPanel: ko.observable(),

          ItemRefList: new u.DataTable(model.options.metas.ItemRef), //选商品参照
          wichAddButton: "normal",
          // 产品搜索参数
          // productSearchParam: new u.DataTable(model.options.metas.productSearchParammeta),
          // 搜索出的销售产品列表
          // specialproductList: new u.DataTable(model.options.metas.specialproductmeta),
          // 已选择销售产品列表
          // selectedproductList: new u.DataTable(model.options.metas.specialproductmeta),

          billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
          //跳转单据页
          goBillPanel: common.bill.goBillPanel,
          //跳转单据详情页
          goDetailPanel: common.bill.goDetailPanel,
          // 账号类型
          accountTypeSrc: ko.observableArray([]),
          soTypeSrc: ko.observableArray([]),
          closeReasonSrc: ko.observableArray([]),
          // 当前系统日期
          curDate: ko.observable(),
          //默认交货推迟日期
          defaultDelayDate: ko.observable(3),

          // 是否免费
          isFree: ko.observable(0),
          // 是否直发
          isDirect: ko.observable(0),

          batchopr: ko.observable(),
          batchoprtitle: ko.observable(),
          //订单总数量合计
          ordertotalnumber: ko.observable(0),
          //订单总金额合计
          ordertotalamount: ko.observable(0),
          //订单总重量合计
          ordertotalweight: ko.observable(0),
          //订单行总数量合计
          orderitemtotalnumber: ko.observable(0),
          //订单行总金额合计
          orderitemtotalamount: ko.observable(0),
          //订单行总重量合计
          orderitemtotalweight: ko.observable(0),
          // 未配车总数量合计
          uncareditemtotalnumber: ko.observable(0),
          //未配车总金额合计
          uncareditemtotalamount: ko.observable(0),
          //未配车总重量合计
          uncareditemtotalweight: ko.observable(0),
          // 数量金额精度处理的format 2位
          formater: new u.NumberFormater(2),
          // 重量方量精度处理的format 3位
          formater3: new u.NumberFormater(3),
          // 单价精度处理，默认2位
          priceFormater: new u.NumberFormater(2),
          // 金额精度处理，默认2位
          amountFormater: new u.NumberFormater(2),
          // 行号池
          currowNum: ko.observable(0),

          buttonListSource: model.options.buttons.buttonList,
          buttonEditSource: model.options.buttons.buttonEdit,
          searchcomp: {},
          searchSource: model.options.searchs.search1,
          gridListOption: model.options.grids.gridList,
          //BOM结构信息
          grid4Option: model.options.grids.grid4,
          grid5Option: model.options.grids.grid5,

          // 采购订单
          purchaseGrid2Option: model.options.grids.grid6,
          purchaseGrid4Option: model.options.grids.grid7,

          gridDetailOption: model.options.grids.gridDetailItem,
          gridEditOption: model.options.grids.gridEditItem,
          cardDetailOption: model.options.cards.cardDetail,
          cardEditOption: model.options.cards.cardEdit,

          // 费用冲抵
          offsetList: new u.DataTable(model.options.metas.offsetMeta),
          offsetSelectList: new u.DataTable(model.options.metas.offsetSelectMeta),
          // 费用冲抵账户下属关联商品
          offsetRelationGoods: {},
          // 商品行费用冲抵明细
          offsetDetailsList: new u.DataTable(model.options.metas.offsetDetailsMeta),
          // 商品行费用冲抵明细（方便编辑调整）
          offsetOldDetailsList: new u.DataTable(model.options.metas.offsetDetailsMeta),

          // 费用冲抵账户列表
          offsetGrid1Option: model.options.grids.offsetGrid1,
          offsetGrid2Option: model.options.grids.offsetGrid2,

          billPanelStatusEdit: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),


          CustomerCastflushDetailItem: new u.DataTable(
              model.options.metas.CustomerCastflushDetail
          ), //费用兑付明细
          gridFlushDetail: model.options.grids.gridFlushDetail,

          saveCheckCreditDetailOption: model.options.grids.saveCheckCreditDetail,
          saveCheckAccountDetailOption: model.options.grids.saveCheckAccountDetail,
          saveFilledTrayDetailOption: model.options.grids.saveFilledTrayDetail,
          saveFilledCarDetailOption: model.options.grids.saveFilledCarDetail,
          costFlushDetailCard: new u.DataTable(
              model.options.metas.costFlushDetailCard
          ), // 费用冲抵详情展示
          costFlushDetailOption: model.options.cards.costFlushDetail, // 费用冲抵详情展示

          costFlushingEdit: new u.DataTable(model.options.metas.costFlushingEdit), //费用冲抵
          gridCostFlushing: model.options.grids.gridCostFlushing, // 费用冲抵

          orderInvoice: new u.DataTable(model.options.metas.orderInvoice), // 发票信息
          orderReceiveAddress: new u.DataTable(
              model.options.metas.orderReceiveAddress
          ), // 收货地址
          isCostFlush: 0,
          isSearchprom: 0,
          // 根据功能节点编码和nodekey获取流程定义流程定义编码
          billFlowConfigUrl: window.pathMap["cmpt"] + "/cmpt/bill-flow-configs",
          // 全局变量  配合valuechange
          orderTypeIdValueChange: 0,
          saleOrgIdValueChange: 0,
          customerIdValueChange: 0,
          creditCheckType: ko.pureComputed(function() {
              var isRent = viewModel.saveCheckCreditDetailItems.ref(
                  "creditCheckType"
              )();
              return isRent == "credit" ? "信用额度" : "信用账期";
          }),
          preferentialRatio: 1 // 整单最大优惠比例
      },
      afterCreate: function() {
          // 初始化折叠面板
          $.fn.collapsepanel(false, true);

          // 初始化服务器时间
          // viewModel.getCurDate();

          //处理从首页跳转过来的情况,为页面添加全局查询参数
          var url = window.location.href;
          var params = common.getParameter(url);
          var type = params.type;
          //全局查询条件
          viewModel.globalQueryData = undefined;
          //待出库情况特殊需要替换url
          viewModel.golbalIsDaichuku = false;
          //首页跳转地址中带type参数
          if (type) {
              viewModel.globalQueryData = [];
              viewModel.globalQueryData.push({
                  key: "search_EQ_orderStatus",
                  value: "02"
              });
              viewModel.globalQueryData.push({
                  key: "search_EQ_isClose",
                  value: "0"
              });
              //待审核  待退单
              if (type == "daishenhe") {
                  viewModel.globalQueryData.push({
                      key: "search_EQ_saleModel",
                      value: "01"
                  });
              } else if (type == "daituidan") {
                  viewModel.globalQueryData.push({
                      key: "search_EQ_saleModel",
                      value: "02"
                  });
              } else if ((type = "daichuku")) {
                  viewModel.golbalIsDaichuku = true;
              }
          }

          //绑定输入框enter事件
          $("#salesorder-searchcontent input")
              .off("keydown")
              .on("keydown", function(e) {
                  if (e.keyCode == 13) {
                      $(this).blur();
                      viewModel.search();
                  }
              });

          $("#salesorderTab .u-tabs__tab").click(function(e) {
              viewModel.tabindex = $(this).index();
              viewModel.search(true);
          });
          // 选择上传文件后，直接调用上传方法
          $("#salefileiptwrapId")
              .off()
              .on("change", "#saleattachuploadbatch_id", function() {
                  if (this.value) {
                      viewModel.uploadAttach();
                  }
              });

          var refRow = viewModel.ItemRefList.createEmptyRow();
          viewModel.ItemRefList.setRowFocus(refRow);
          // 确定销售产品参照，为产品组合子表增行
          viewModel.ItemRefList.off("supplementproductref.valuechange").on(
              "supplementproductref.valuechange",
              function(obj) {
                  // 清空参照时不增行
                  if (!obj.newValue) {
                      return;
                  }
                  var bomItems = [];
                  var refer = $("#refContainersupplementproductref").data("uui.refer");
                  var accountRef = $("#refContaineraccountIdBase").data("uui.refer");
                  // 账户主键
                  var supplementAccountId = null;
                  if (accountRef && accountRef.values && accountRef.values[0]) {
                      supplementAccountId = accountRef.values[0].refpk;
                  }
                  if (!supplementAccountId) {
                      toastr.info("补货账户为空，请重新选择！");
                      return;
                  }
                  var refValues = refer.values;
                  var goodsInfoDtos = [];
                  var queryFinancial = [];
                  var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                  refValues.forEach(function(item) {
                      item.id = "";
                      item.goodsAttrVals = "";
                      // 补充货补账户信息
                      item.supplementAccountId = supplementAccountId;
                      goodsInfoDtos.push({
                          originalGoodsId: viewModel.fillOriginalGoodsId(item),
                          saleOrgId: saleOrgId
                      });
                      queryFinancial.push({
                          saleOrgId: item.saleOrgId,
                          productLineId: item.productLineId
                      });
                  });

                  // 根据选择的商品信息 去询价格
                  var priceData = {
                      customer: viewModel.salesorderCard.getValue("customerId"),
                      saleModel: viewModel.salesorderCard.getValue("saleModel"),
                      tranType: viewModel.salesorderCard.getValue("orderTypeId"),
                      goodsInfoDtos: goodsInfoDtos
                  };

                  $._ajax({
                      url: window.pathMap.b2b + "/b2b/goods/find-price-by-goods",
                      data: JSON.stringify(priceData),
                      contentType: "application/json;charset=UTF-8",
                      type: "POST",
                      success: function(resp) {
                          var newData = [];
                          for (var i = 0; i < resp.length; i++) {
                              newData.push({
                                  salePrice: resp[i].baseDiscountPrice,
                                  basePrice: resp[i].basePrice,
                                  supplierPrice: resp[i].supplierPrice
                              });
                          }
                          var data = $.extend(true, refValues, newData);
                          viewModel.initData(data, "supplement");
                      }
                  });
              });
          viewModel.ItemRefList.off("productref.valuechange").on(
              "productref.valuechange",
              function(obj) {
                  // 清空参照时不增行
                  if (!obj.newValue) {
                      return;
                  }
                  var bomItems = [];
                  var refer = $("#refContainerproductref").data("uui.refer");
                  var refValues = refer.values;
                  var goodsInfoDtos = [];
                  var queryFinancial = [];
                  var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                  refValues.forEach(function(item) {
                      item.id = "";
                      item.goodsAttrVals = "";
                      goodsInfoDtos.push({
                          originalGoodsId: viewModel.fillOriginalGoodsId(item),
                          saleOrgId: saleOrgId
                      });
                      queryFinancial.push({
                          saleOrgId: item.saleOrgId,
                          productLineId: item.productLineId
                      });
                  });

                  // 根据选择的商品信息 去询价格
                  var priceData = {
                      customer: viewModel.salesorderCard.getValue("customerId"),
                      saleModel: viewModel.salesorderCard.getValue("saleModel"),
                      tranType: viewModel.salesorderCard.getValue("orderTypeId"),
                      goodsInfoDtos: goodsInfoDtos
                  };

                  $._ajax({
                      url: window.pathMap.b2b + "/b2b/goods/find-price-by-goods",
                      data: JSON.stringify(priceData),
                      contentType: "application/json;charset=UTF-8",
                      type: "POST",
                      success: function(resp) {
                          var newData = [];
                          for (var i = 0; i < resp.length; i++) {
                              newData.push({
                                  salePrice: resp[i].baseDiscountPrice,
                                  basePrice: resp[i].basePrice,
                                  supplierPrice: resp[i].supplierPrice
                              });
                          }
                          var data = $.extend(true, refValues, newData);
                          viewModel.initData(data);
                          viewModel.setMaxPreferentialMoney(viewModel.salesorderCard, "supplement");
                      }
                  });
              }
          );
          // 客户订单类型 change
          viewModel.salesorderCard
              .off("orderTypeId.valuechange")
              .on("orderTypeId.valuechange", function(obj) {
                  var refer = $("#refContainerorderTypeId").data("uui.refer");

                  if (refer.values) {
                      viewModel.salesorderCard
                          .getCurrentRow()
                          .setValue("orderTypeCode", refer.values[0].refcode);
                      viewModel.salesorderCard
                          .getCurrentRow()
                          .setValue("orderTypeName", refer.values[0].refname);
                      viewModel.salesorderCard
                          .getCurrentRow()
                          .setValue("saleModel", refer.values[0].saleModelCode);
                  }
                  if (
                      obj.newValue != obj.oldValue &&
                      obj.oldValue &&
                      viewModel.orderTypeIdValueChange == 0
                  ) {
                      common.dialog.confirmDialog({
                          msg1: "修改或者删除订单类型，会造成订单清空！",
                          msg2: "是否继续？",
                          width: "400px",
                          type: "error",
                          onOk: function() {
                              viewModel.orderTypeIdValueChange = 0;
                              viewModel.saleOrderItems.removeAllRows();
                              viewModel.batchSaleOrderBomItems.removeAllRows();
                              viewModel.salesorderCard.setValue("offsetAmount", 0);
                              viewModel.salesorderCard.setValue("totalDealAmount", 0);
                              viewModel.salesorderCard.setValue("totalNum", 0);
                              var saleModel = viewModel.salesorderCard.getValue("saleModel");
                              // if (saleModel && saleModel == '03') {
                              // $("#costTypeId").attr('placeholder', "");
                              // viewModel.salesorderCard.setMeta("costTypeId", "enable", true);
                              // } else {
                              // $("#costTypeId").attr('placeholder', "订单类型为货补类型时可选");
                              // viewModel.salesorderCard.setMeta("costTypeId", "enable", false);
                              // viewModel.salesorderCard.setValue('costTypeId', '');
                              // viewModel.salesorderCard.setValue('costTypeName', '');
                              // viewModel.salesorderCard.setValue('costTypeCode', '');
                              // }
                          },
                          onCancel: function() {
                              viewModel.orderTypeIdValueChange = 1;
                              viewModel.salesorderCard.setValue("orderTypeId", obj.oldValue);
                          }
                      });
                  } else {
                      viewModel.orderTypeIdValueChange = 0;
                      var saleModel = viewModel.salesorderCard.getValue("saleModel");

                      // if (saleModel && saleModel == '03') {
                      //     $("#costTypeId").attr('placeholder', "");
                      //     viewModel.salesorderCard.setMeta("costTypeId", "enable", true);
                      // } else {
                      //     $("#costTypeId").attr('placeholder', "订单类型为货补类型时可选");
                      //     viewModel.salesorderCard.setMeta("costTypeId", "enable", false);
                      //     viewModel.salesorderCard.setValue('costTypeId', '');
                      //     // viewModel.salesorderCard.setValue('costTypeName', '');
                      //     viewModel.salesorderCard.setValue('costTypeCode', '');
                      // }
                  }
                  var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                  var customerId = viewModel.salesorderCard.getValue("customerId");
                  var orderType = obj.newValue;
                  if (saleOrgId && customerId && orderType) {
                      viewModel.queryAccount(saleOrgId, customerId, orderType);
                  }
              });

          // 客户 change
          viewModel.salesorderCard
              .off("customerId.valuechange")
              .on("customerId.valuechange", function(obj) {
                  // 新增时参照显示异常 DAVCO-111 销售订单客户开票单位参照发票信息显示异常
                  var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                  var accountPeriodBase = viewModel.app.getComp(
                      "accountPeriodBase"
                  );
                  var salesDeptBase = viewModel.app.getComp(
                      "salesDeptBase"
                  );
                  var marketAreaBase = viewModel.app.getComp(
                      "marketAreaBase"
                  );
                  var salesManagerBase = viewModel.app.getComp(
                      "salesManagerBase"
                  );
                  $(accountPeriodBase.element).attr(
                      "data-refparam",
                      '{"EQ_isEnable":"1","EQ_customer.id":"' + obj.newValue + '"}'
                  );
                  // $(marketAreaBase.element).attr(
                  // 	"data-refparam",
                  // 	'{"EQ_dr":"' + 0 + '"}'
                  // );
                  /* // 客户经理、市场区域、销售部门 赋值搜索条件  条件名暂定
                  $(salesDeptBase.element).attr(
                    "data-refparam",
                    '{"EQ_isEnable":"1","EQ_organization.id":"' + obj.newValue + '"}'
                  );
                  $(marketAreaBase.element).attr(
                    "data-refparam",
                    '{"EQ_isEnable":"1","EQ_organization.id":"' + obj.newValue + '"}'
                  );
                  $(salesManagerBase.element).attr(
                    "data-refparam",
                    '{"EQ_isEnable":"1","EQ_personPosts.organization.id":"' + obj.newValue + '"}'
                  ); */
                  if (obj.oldValue == "") {
                      var customerId = obj.newValue;
                      var customerInoviceBase = viewModel.app.getComp(
                          "customerInoviceBase"
                      );
                      var receiveAddressBase = viewModel.app.getComp(
                          "receiveAddressBase"
                      );
                      $(customerInoviceBase.element).attr(
                          "data-refparam",
                          '{"EQ_customer.id":"' + customerId + '"}'
                      );
                      $(receiveAddressBase.element).attr(
                          "data-refparam",
                          '{"EQ_customer.id":"' + customerId + '"}'
                      );

                  }
                  if (
                      obj.newValue != obj.oldValue &&
                      obj.oldValue &&
                      viewModel.customerIdValueChange == 0
                  ) {
                      common.dialog.confirmDialog({
                          msg1: "修改或者删除客户，会造成订单清空！",
                          msg2: "是否继续？",
                          width: "400px",
                          type: "error",
                          onOk: function() {
                              var curRow = viewModel.salesorderCard.getCurrentRow();
                              var customerId = curRow.getValue("customerId");
                              var customerInoviceBase = viewModel.app.getComp(
                                  "customerInoviceBase"
                              );
                              var receiveAddressBase = viewModel.app.getComp(
                                  "receiveAddressBase"
                              );

                              $(customerInoviceBase.element).attr(
                                  "data-refparam",
                                  '{"EQ_customer.id":"' + customerId + '"}'
                              );
                              $(receiveAddressBase.element).attr(
                                  "data-refparam",
                                  '{"EQ_customer.id":"' + customerId + '"}'
                              );
                              viewModel.salesorderCard.setValue("invoiceId", "");
                              viewModel.salesorderCard.setValue("invoiceType", "");
                              viewModel.salesorderCard.setValue("invoiceTitle", "");
                              viewModel.salesorderCard.setValue("receiveAddressId", "");
                              viewModel.salesorderCard.setValue("receiveAddressName", "");
                              viewModel.salesorderCard.setValue("receiver", "");
                              viewModel.salesorderCard.setValue("receiverPhone", "");
                              viewModel.salesorderCard.setValue("accountPeriodId", "");
                              viewModel.salesorderCard.setValue("accountPeriodCode", "");
                              viewModel.salesorderCard.setValue("accountPeriodName", "");

                              viewModel.saleOrderItems.removeAllRows();
                              viewModel.batchSaleOrderBomItems.removeAllRows();
                              viewModel.salesorderCard.setValue("offsetAmount", 0);
                              viewModel.salesorderCard.setValue("totalDealAmount", 0);
                              viewModel.salesorderCard.setValue("totalNum", 0);
                              var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                              var customerId = obj.newValue;
                              var saleModel = curRow.getValue("saleModel");
                              if (saleOrgId && customerId) {
                                  var ordertypeBody = {
                                      search_EQ_organization: saleOrgId,
                                      search_EQ_customer: customerId,
                                      search_EQ_saleModel: "01"
                                  };
                                  var jurisdictionsBody = {
                                      "search_IN_saleOrganization.id": saleOrgId,
                                      "search_IN_customer.id": customerId
                                  };
                                  // 查询对应的客户经理和部门
                                  viewModel.qureyCustomerManageAndOrderType(
                                      ordertypeBody,
                                      jurisdictionsBody
                                  );
                              }
                              // 根据客户查询默认地址 、 开票单位
                              if (customerId) {
                                  var ordertypeBody = {
                                      customerId: customerId
                                  };
                                  $._ajax({
                                      type: "get",
                                      url: window.pathMap.base +
                                          "/base/customer-addresses/findByCustomerId",
                                      data: ordertypeBody,
                                      success: function(data) {
                                          if (!data || data.length == 0) {
                                              return;
                                          }
                                          var receiveAddress = data[0];
                                          if (receiveAddress) {
                                              viewModel.salesorderCard.setValue(
                                                  "receiveAddressId",
                                                  receiveAddress.id
                                              );
                                              viewModel.salesorderCard.setValue(
                                                  "receiverAddress",
                                                  receiveAddress.detailAddr
                                              );

                                              $("#receiveAddress").val(receiveAddress.name);
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiveAddressId",
                                                  receiveAddress.id
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiver",
                                                  receiveAddress.firstReceiver
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverTel",
                                                  receiveAddress.firstReceiverTel
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverPhone",
                                                  receiveAddress.firstReceiverPhone
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "country",
                                                  receiveAddress.countryName
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "countryId",
                                                  receiveAddress.countryId
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverProvince",
                                                  receiveAddress.provinceName
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverProvinceId",
                                                  receiveAddress.provinceId
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverCity",
                                                  receiveAddress.cityName
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverCityId",
                                                  receiveAddress.cityId
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverCounty",
                                                  receiveAddress.countyName
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverCountyId",
                                                  receiveAddress.countyId
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverTown",
                                                  receiveAddress.townName
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverTownId",
                                                  receiveAddress.townId
                                              );
                                              viewModel.orderReceiveAddress.setValue(
                                                  "receiverAddress",
                                                  receiveAddress.detailAddr
                                              );

                                              viewModel.salesorderCard.setValue(
                                                  "receiver",
                                                  receiveAddress.firstReceiver
                                              );
                                              viewModel.salesorderCard.setValue(
                                                  "receiverPhone",
                                                  receiveAddress.firstReceiverPhone
                                              );
                                          }
                                      }
                                  });
                                  $._ajax({
                                      type: "get",
                                      url: window.pathMap.base +
                                          "/base/customer-invoices/findByCustomerId",
                                      data: ordertypeBody,
                                      success: function(data) {
                                          if (!data || data.length == 0) {
                                              return;
                                          }
                                          var orderInvoice = data[0];
                                          if (orderInvoice) {
                                              viewModel.salesorderCard.setValue(
                                                  "invoiceId",
                                                  orderInvoice.id
                                              );
                                              viewModel.salesorderCard.setValue(
                                                  "invoiceType",
                                                  orderInvoice.invoiceTypeName
                                              );
                                              viewModel.salesorderCard.setValue(
                                                  "invoiceTitle",
                                                  orderInvoice.invoiceOrgName
                                              );

                                              $("#invoiceId").val(orderInvoice.invoiceOrgName);
                                              viewModel.orderInvoice.setValue(
                                                  "invoiceId",
                                                  orderInvoice.id
                                              );
                                              viewModel.orderInvoice.setValue(
                                                  "invoiceType",
                                                  orderInvoice.invoiceTypeName
                                              );
                                              viewModel.orderInvoice.setValue(
                                                  "invoiceTitle",
                                                  orderInvoice.invoiceOrgName
                                              );
                                              viewModel.orderInvoice.setValue(
                                                  "invoiceBank",
                                                  orderInvoice.bankName
                                              );
                                          }
                                      }
                                  });
                                  $._ajax({
                                      type: "get",
                                      url: window.pathMap.base +
                                          "/base/customer-managers/find-by-customer-id",
                                      data: ordertypeBody,
                                      success: function(data) {
                                          if (!data) {
                                              return;
                                          }
                                          var mgtCustomer = data; // {} 拿到上级客户的数据 赋值数据
                                          if (mgtCustomer) {
                                              viewModel.salesorderCard.setValue(
                                                  "superiorCustomerId",
                                                  mgtCustomer.mgtCustomerId
                                              );

                                              viewModel.salesorderCard.setValue(
                                                  "superiorCustomerName",
                                                  mgtCustomer.mgtCustomerName
                                              );
                                              viewModel.salesorderCard.setValue(
                                                  "superiorCustomerCode",
                                                  mgtCustomer.mgtCustomerCode
                                              );
                                          }
                                      }
                                  });
                                  $._ajax({
                                      type: "get",
                                      url: window.pathMap.settlement +
                                          "/settlement/accountmatchs",
                                      data: {
                                          search_IN_customer: obj.newValue
                                      },
                                      success: function(data) {
                                          if (!data || data.content.length == 0) {
                                              return;
                                          }
                                          viewModel.salesorderCard.setValue("accountPeriodId", data.content[0].accountId);
                                          viewModel.salesorderCard.setValue("accountPeriodCode", data.content[0].accountCode);
                                          viewModel.salesorderCard.setValue("accountPeriodName", data.content[0].accountName);
                                      }
                                  });
                              }
                          },
                          onCancel: function() {
                              viewModel.customerIdValueChange = 1;
                              viewModel.salesorderCard.setValue("customerId", obj.oldValue);
                          }
                      });
                  } else {
                      viewModel.customerIdValueChange = 0;
                      var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                      var customerId = obj.newValue;
                      if (saleOrgId && customerId) {
                          var ordertypeBody = {
                              search_EQ_organization: saleOrgId,
                              search_EQ_customer: customerId,
                              search_EQ_saleModel: "01"
                          };
                          var jurisdictionsBody = {
                              "search_IN_saleOrganization.id": saleOrgId,
                              "search_IN_customer.id": customerId
                          };
                          // 查询对应的客户经理和部门
                          viewModel.qureyCustomerManageAndOrderType(
                              ordertypeBody,
                              jurisdictionsBody
                          );
                      }
                      // 根据客户查询默认地址 、 开票单位、上级客户
                      if (customerId) {
                          var ordertypeBody = {
                              customerId: customerId
                          };
                          $._ajax({
                              type: "get",
                              url: window.pathMap.base +
                                  "/base/customer-addresses/findByCustomerId",
                              data: ordertypeBody,
                              success: function(data) {
                                  if (!data || data.length == 0) {
                                      return;
                                  }
                                  var receiveAddress = data[0];
                                  if (receiveAddress) {
                                      viewModel.salesorderCard.setValue(
                                          "receiveAddressId",
                                          receiveAddress.id
                                      );
                                      viewModel.salesorderCard.setValue(
                                          "receiverAddress",
                                          receiveAddress.detailAddr
                                      );

                                      $("#receiveAddress").val(receiveAddress.name);
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiveAddressId",
                                          receiveAddress.id
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiver",
                                          receiveAddress.firstReceiver
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverTel",
                                          receiveAddress.firstReceiverTel
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverPhone",
                                          receiveAddress.firstReceiverPhone
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "country",
                                          receiveAddress.countryName
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "countryId",
                                          receiveAddress.countryId
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverProvince",
                                          receiveAddress.provinceName
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverProvinceId",
                                          receiveAddress.provinceId
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverCity",
                                          receiveAddress.cityName
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverCityId",
                                          receiveAddress.cityId
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverCounty",
                                          receiveAddress.countyName
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverCountyId",
                                          receiveAddress.countyId
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverTown",
                                          receiveAddress.townName
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverTownId",
                                          receiveAddress.townId
                                      );
                                      viewModel.orderReceiveAddress.setValue(
                                          "receiverAddress",
                                          receiveAddress.detailAddr
                                      );

                                      viewModel.salesorderCard.setValue(
                                          "receiver",
                                          receiveAddress.firstReceiver
                                      );
                                      viewModel.salesorderCard.setValue(
                                          "receiverPhone",
                                          receiveAddress.firstReceiverPhone
                                      );
                                  }
                              }
                          });
                          $._ajax({
                              type: "get",
                              url: window.pathMap.base +
                                  "/base/customer-invoices/findByCustomerId",
                              data: ordertypeBody,
                              success: function(data) {
                                  if (!data || data.length == 0) {
                                      return;
                                  }
                                  var orderInvoice = data[0];
                                  if (orderInvoice) {
                                      viewModel.salesorderCard.setValue(
                                          "invoiceId",
                                          orderInvoice.id
                                      );
                                      viewModel.salesorderCard.setValue(
                                          "invoiceType",
                                          orderInvoice.invoiceTypeName
                                      );
                                      viewModel.salesorderCard.setValue(
                                          "invoiceTitle",
                                          orderInvoice.invoiceOrgName
                                      );

                                      $("#invoiceId").val(orderInvoice.invoiceOrgName);
                                      viewModel.orderInvoice.setValue(
                                          "invoiceId",
                                          orderInvoice.id
                                      );
                                      viewModel.orderInvoice.setValue(
                                          "invoiceType",
                                          orderInvoice.invoiceTypeName
                                      );
                                      viewModel.orderInvoice.setValue(
                                          "invoiceTitle",
                                          orderInvoice.invoiceOrgName
                                      );
                                      viewModel.orderInvoice.setValue(
                                          "invoiceBank",
                                          orderInvoice.bankName
                                      );
                                  }
                              }
                          });
                          $._ajax({
                              type: "get",
                              url: window.pathMap.base +
                                  "/base/customer-managers/find-by-customer-id",
                              data: ordertypeBody,
                              success: function(data) {
                                  if (!data) {
                                      return;
                                  }
                                  var mgtCustomer = data; // {} 拿到上级客户的数据 赋值数据
                                  if (mgtCustomer) {
                                      viewModel.salesorderCard.setValue(
                                          "superiorCustomerId",
                                          mgtCustomer.mgtCustomerId
                                      );

                                      viewModel.salesorderCard.setValue(
                                          "superiorCustomerName",
                                          mgtCustomer.mgtCustomerName
                                      );
                                      viewModel.salesorderCard.setValue(
                                          "superiorCustomerCode",
                                          mgtCustomer.mgtCustomerCode
                                      );
                                  }
                              }
                          });
                          $._ajax({
                              type: "get",
                              url: window.pathMap.settlement +
                                  "/settlement/accountmatchs",
                              data: {
                                  search_IN_customer: obj.newValue
                              },
                              success: function(data) {
                                  if (!data || data.content.length == 0) {
                                      return;
                                  }
                                  viewModel.salesorderCard.setValue("accountPeriodId", data.content[0].accountId);
                                  viewModel.salesorderCard.setValue("accountPeriodCode", data.content[0].accountCode);
                                  viewModel.salesorderCard.setValue("accountPeriodName", data.content[0].accountName);
                              }
                          });
                      }
                  }
                  var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                  var customerId = obj.newValue;
                  var orderType = viewModel.salesorderCard.getValue("orderTypeId");
                  if (saleOrgId && customerId && orderType) {
                      viewModel.queryAccount(saleOrgId, customerId, orderType);
                  }
              });

          // 销售组织 change
          viewModel.salesorderCard
              .off("saleOrgId.valuechange")
              .on("saleOrgId.valuechange", function(obj) {
                  var customerId = viewModel.salesorderCard.getValue("customerId");
                  var salesDeptBase = viewModel.app.getComp(
                      "salesDeptBase"
                  );
                  var marketAreaBase = viewModel.app.getComp(
                      "marketAreaBase"
                  );
                  var salesManagerBase = viewModel.app.getComp(
                      "salesManagerBase"
                  );
                  // 客户经理、市场区域、销售部门 赋值搜索条件  条件名暂定
                  $(salesDeptBase.element).attr(
                      "data-refparam",
                      '{"EQ_isEnable":"1","EQ_organization.id":"' + obj.newValue + '"}'
                  );
                  $(marketAreaBase.element).attr(
                      "data-refparam",
                      '{"EQ_isEnable":"1","EQ_organization.id":"' + obj.newValue + '"}'
                  );
                  $(salesManagerBase.element).attr(
                      "data-refparam",
                      '{"EQ_isEnable":"1","AUTH_refdim": "salesManager","EQ_personPosts.organization.id":"' + obj.newValue + '"}'
                  );
                  if (obj.newValue != obj.oldValue && obj.oldValue && viewModel.saleOrgIdValueChange == 0) {
                      common.dialog.confirmDialog({
                          msg1: "修改或者删除销售组织，会造成订单清空！",
                          msg2: "是否继续？",
                          width: "400px",
                          type: "error",
                          onOk: function() {
                              viewModel.salesorderCard.setValue("customerId", "");
                              viewModel.salesorderCard.setValue("invoiceId", "");
                              viewModel.salesorderCard.setValue("receiveAddressId", "");

                              viewModel.saleOrderItems.removeAllRows();
                              viewModel.batchSaleOrderBomItems.removeAllRows();
                              viewModel.salesorderCard.setValue("offsetAmount", 0);
                              viewModel.salesorderCard.setValue("totalDealAmount", 0);
                              viewModel.salesorderCard.setValue("totalNum", 0);
                              if (saleOrgId && customerId) {
                                  var ordertypeBody = {
                                      search_EQ_organization: saleOrgId,
                                      search_EQ_customer: customerId,
                                      search_EQ_saleModel: "01"
                                  };
                                  var jurisdictionsBody = {
                                      "search_IN_saleOrganization.id": saleOrgId,
                                      "search_IN_customer.id": customerId
                                  };
                                  // 查询对应的客户经理和部门
                                  viewModel.qureyCustomerManageAndOrderType(
                                      ordertypeBody,
                                      jurisdictionsBody
                                  );
                              }
                              // 根据销售组织判断客户是否可点击
                              if (saleOrgId) {
                                  $("#customerId").removeAttr("placeholder");
                                  viewModel.salesorderCard.setMeta(
                                      "customerId",
                                      "enable",
                                      true
                                  );
                                  viewModel.changeCondition(
                                      "customerId", {
                                          EQ_isEnable: "1",
                                          EQ_isChannelCustomer: "1",
                                          EQ_SaleOrder: saleOrgId
                                      }, {}
                                  );
                              } else {
                                  $("#customerId").attr("placeholder", "请先选择销售组织");
                                  viewModel.salesorderCard.setMeta(
                                      "customerId",
                                      "enable",
                                      false
                                  );
                              }
                          },
                          onCancel: function() {
                              viewModel.saleOrgIdValueChange = 1;
                              viewModel.salesorderCard.setValue("saleOrgId", obj.oldValue);
                          }
                      });
                  } else {
                      viewModel.saleOrgIdValueChange = 0;
                  }
                  var saleOrgId = obj.newValue;
                  // 根据销售组织判断客户是否可点击
                  if (saleOrgId) {
                      $("#customerId").removeAttr("placeholder");
                      viewModel.salesorderCard.setMeta("customerId", "enable", true);
                      viewModel.changeCondition(
                          "customerId", {
                              EQ_isEnable: "1",
                              EQ_isChannelCustomer: "1",
                              EQ_SaleOrder: saleOrgId
                          }, {}
                      );
                      // 查询增大最大优惠比例
                      viewModel.matchPreferentialRadio(saleOrgId);
                  } else {
                      $("#customerId").attr("placeholder", "请先选择销售组织");
                      viewModel.salesorderCard.setMeta("customerId", "enable", false);
                  }

                  var customerId = viewModel.salesorderCard.getValue("customerId");
                  var saleOrgId = obj.newValue;
                  var orderType = viewModel.salesorderCard.getValue("orderTypeId");
                  if (saleOrgId && customerId && orderType) {
                      viewModel.queryAccount(saleOrgId, customerId, orderType);
                  }
              });

          // 货补费用单类型 change
          // viewModel.salesorderCard.off("costTypeId.valuechange").on("costTypeId.valuechange", function(obj) {
          //     var refer = $("#refContainercostTypeId").data("uui.refer");
          //     viewModel.salesorderCard.getCurrentRow().setValue("costTypeCode", refer.values[0].refcode);
          // });

          // 收货地址 change
          viewModel.salesorderCard
              .off("receiveAddressId.valuechange")
              .on("receiveAddressId.valuechange", function(obj) {
                  var refer = $("#refContainerreceiveAddress").data("uui.refer");
                  var receiveAddress = refer.values ? refer.values[0] : "";
                  var addressSimple = viewModel.orderReceiveAddress.getSimpleData();
                  // 防止缓存问题
                  if (obj.newValue && receiveAddress && obj.newValue != receiveAddress.id) {
                    return;
                  }
                  var gridItemData = viewModel.saleOrderItems.getSimpleData();
                  if (addressSimple.length == 0 || !addressSimple) {
                      var simpleData = {
                          receiveAddressId: "",
                          receiver: "",
                          receiverTel: "",
                          receiverPhone: "",
                          country: "",
                          countryId: "",
                          receiverProvince: "",
                          receiverProvinceId: "",
                          receiverCity: "",
                          receiverCityId: "",
                          receiverCounty: "",
                          receiverCountyId: "",
                          receiverTown: "",
                          receiverTownId: "",
                          receiverAddress: ""
                      };
                      viewModel.orderReceiveAddress.setSimpleData(simpleData);
                  }
                  if (!obj.newValue) {
                      viewModel.orderReceiveAddress.setValue("dr", "1");
                  }
                  if (receiveAddress) {
                      if (receiveAddress.refcode == "" && receiveAddress.refname == "" && receiveAddress.refpk == "") {
                          viewModel.orderReceiveAddress.setValue("dr", "1");
                          viewModel.salesorderCard.setValue("receiver", "");
                          viewModel.salesorderCard.setValue("receiverPhone", "");
                      } else {
                          viewModel.orderReceiveAddress.setValue("dr", "0");

                          viewModel.orderReceiveAddress.setValue(
                              "receiveAddressId",
                              receiveAddress.id
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiver",
                              receiveAddress.firstReceiver
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverTel",
                              receiveAddress.firstReceiverTel
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverPhone",
                              receiveAddress.firstReceiverPhone
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "country",
                              receiveAddress.countryName
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "countryId",
                              receiveAddress.countryId
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverProvince",
                              receiveAddress.provinceName
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverProvinceId",
                              receiveAddress.provinceId
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverCity",
                              receiveAddress.cityName
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverCityId",
                              receiveAddress.cityId
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverCounty",
                              receiveAddress.countyName
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverCountyId",
                              receiveAddress.countyId
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverTown",
                              receiveAddress.townName
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverTownId",
                              receiveAddress.townId
                          );
                          viewModel.orderReceiveAddress.setValue(
                              "receiverAddress",
                              receiveAddress.detailAddr
                          );

                          viewModel.salesorderCard.setValue(
                              "receiver",
                              receiveAddress.firstReceiver
                          );
                          viewModel.salesorderCard.setValue(
                              "receiverPhone",
                              receiveAddress.firstReceiverPhone
                          );
                      }
                      // 添加承运商
                      viewModel.findCarrierData(receiveAddress);
                      // 根据是否启用调度中心来校验是否重新询库存组织和仓库
                      if (viewModel.SysParams_stock) {
                          setTimeout(function() {
                              viewModel.findByWarehouse(receiveAddress);
                          }, 0);
                      }
                  }
              });

          // 客户开票单位 change
          viewModel.salesorderCard
              .off("invoiceId.valuechange")
              .on("invoiceId.valuechange", function(obj) {
                  var refer = $("#refContainerinvoiceId").data("uui.refer");
                  var orderInvoice = refer.values ? refer.values[0] : "";
                  var invoiceSimple = viewModel.orderInvoice.getSimpleData();
                  // 防止缓存问题
                  if (obj.newValue && orderInvoice && obj.newValue != orderInvoice.id) {
                    return;
                  }
                  if (invoiceSimple.length == 0 || !invoiceSimple) {
                      var simpleData = {
                          invoiceId: "",
                          invoiceType: "",
                          invoiceTitle: "",
                          invoiceBank: ""
                      };
                      viewModel.orderInvoice.setSimpleData(simpleData);
                  }
                  if (!obj.newValue) {
                      viewModel.orderInvoice.setValue("dr", "1");
                  }
                  if (orderInvoice) {
                      if (
                          orderInvoice.refcode == "" &&
                          orderInvoice.refname == "" &&
                          orderInvoice.refpk == ""
                      ) {
                          viewModel.orderInvoice.setValue("dr", "1");
                      } else {
                          viewModel.orderInvoice.setValue("dr", "0");

                          viewModel.orderInvoice.setValue("invoiceId", orderInvoice.id);
                          viewModel.orderInvoice.setValue(
                              "invoiceType",
                              orderInvoice.invoiceTypeName
                          );
                          viewModel.orderInvoice.setValue(
                              "invoiceTitle",
                              orderInvoice.invoiceOrgName
                          );
                          viewModel.orderInvoice.setValue(
                              "invoiceBank",
                              orderInvoice.bankName
                          );
                      }
                  }
              });

          // 商品数量改变 计算金额
          viewModel.saleOrderItems
              .off("orderNum.valuechange")
              .on("orderNum.valuechange", function(obj) {
                  if (!obj.newValue) return;
                  var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                  // 计算商品行主数量、金额
                  var rate = parseFloat(currRow.getValue("conversionRate") || "1");
                  var mainNum = parseFloat(obj.newValue) * rate || 0;
                  // 原价
                  var orginalAmount = viewModel.amountFormater.format(mainNum * parseFloat(currRow.getValue("salePrice")) || "0");
                  /*
                   * 促销后成交金额 = 促销价 * 主数量 - 促销金额(整单降价分摊)
                   */
                  var promAmount = (parseFloat(currRow.getValue("promPrice")) || parseFloat(currRow.getValue("salePrice"))) * mainNum || 0;
                  var dealAmount = promAmount - parseFloat(currRow.getValue("promAmount") || "0");
                  dealAmount = viewModel.amountFormater.format(dealAmount || 0);
                  var grossWeight = currRow.getValue("grossWeight") || currRow.getValue("weight");
                  var rowWeight =
                      mainNum * parseFloat(grossWeight || "0") || 0;
                  var rowVolume =
                      mainNum * parseFloat(currRow.getValue("volume") || "0") || 0;

                  var rowWeight = new u.NumberFormater(currRow.getValue("weightUnitPrecision") || 0).format(parseFloat(rowWeight));
                  var rowVolume = new u.NumberFormater(currRow.getValue("volumeUnitPrecision") || 0).format(parseFloat(rowVolume));

                  currRow.setValue("mainNum", mainNum);
                  currRow.setValue("amount", orginalAmount);
                  currRow.setValue("rowWeight", rowWeight);
                  currRow.setValue("rowVolume", rowVolume);

                  // 计算成交价  成本价计算方式   成交金额-促销金额-冲抵金额   /  数量
                  var dealPrice = dealAmount && dealAmount > 0 ? dealAmount / mainNum || 0 : parseFloat(currRow.getValue("salePrice"));
                  if (currRow.getValue("isGift") != 1 && currRow.getValue("goodsSupplement") != 1) {
                      currRow.setValue("dealPrice", dealPrice);
                      currRow.setValue("dealAmount", dealAmount);
                  } else {
                      currRow.setValue("dealPrice", 0);
                      currRow.setValue("dealAmount", 0);
                      //货补商品不赋值冲抵金额字段
                      // if(currRow.getValue("goodsSupplement") == 1) {
                      //   currRow.setValue("offsetAmount", orginalAmount);
                      // }
                  }
                  // 计算合计金额、合计数量
                  if (currRow.getValue("goodsSupplement") == 1 && obj.newValue && obj.newValue != "0") {
                      viewModel.computeHeadDataInfo(false);
                  } else {
                      viewModel.computeHeadDataInfo(true);
                  }

                  //联动bom数量
                  var parentGoodsId = obj.rowObj.getValue("goodsId");
                  var parentRowNum = obj.rowObj.getValue("rowNum");

                  //获取全部bom信息
                  var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                  for (var i = 0; i < bomdata.length; i++) {
                      var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                      if (
                          bomdata[i].parentGoodsId === parentGoodsId &&
                          bomdata[i].goodsId !== parentGoodsId &&
                          bomdata[i].parentRowNum == parentRowNum
                      ) {
                          var bomAmount = bomdata[i].childGoodsQty * obj.newValue;
                          var bomMainNum = bomAmount * (bomdata[i].conversionRate || 1);
                          var bomDealAmount = bomMainNum * (bomdata[i].dealPrice || bomdata[i].basePrice || 0);
                          allrows[i].setValue("orderNum", bomAmount);
                          allrows[i].setValue("mainNum", bomMainNum);
                          allrows[i].setValue("dealAmount", bomDealAmount);
                          allrows[i].setValue("amount", bomDealAmount);
                      } else {
                          if (
                              allrows[i] &&
                              allrows[i].getValue("goodsId") === parentGoodsId &&
                              bomdata[i].parentRowNum == parentRowNum
                          ) {
                              var amount = obj.newValue;
                              allrows[i].setValue("mainNum", amount * rate);
                              allrows[i].setValue("orderNum", amount);
                              allrows[i].setValue("dealAmount", dealAmount);
                              allrows[i].setValue("amount", dealAmount);
                          }
                      }
                  }
              });
          // 赠品
          viewModel.saleOrderItems
              .off("isGift.valuechange")
              .on("isGift.valuechange", function(obj) {
                  var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                  var isChecked = currRow.getValue("isGift");
                  var dealAmount = currRow.getValue("dealAmount");
                  var totalDealAmount = viewModel.salesorderCard
                      .getCurrentRow()
                      .getValue("totalDealAmount");
                  var offsetAmount = viewModel.salesorderCard
                      .getCurrentRow()
                      .getValue("offsetAmount");
                  var orderType = $("#refContainerorderTypeId").data("uui.refer")
                      .values;

                  // 非费用货补订单：手工勾选表体的赠品标识后，表体价格系列（原价、净价）自动清0；
                  if (isChecked == 0 && viewModel.isCostFlush == 0) {
                      // 关闭赠品后重新 计算价格，
                      var orderNum = currRow.getValue("orderNum");
                      currRow.setValue("orderNum", 0.5);
                      currRow.setValue("orderNum", orderNum);
                      currRow.setValue("dealPrice", currRow.getValue("salePrice"));
                      viewModel.costFreezeEvent(false);
                  }
                  if ("03" == orderType[0].saleModelCode) {
                      currRow.setValue("dealPrice", 0);
                      currRow.setValue("offsetAmount", 0);
                      currRow.setValue("dealAmount", 0);
                      viewModel.salesorderCard
                          .getCurrentRow()
                          .setValue(
                              "totalDealAmount",
                              parseFloat(totalDealAmount) - parseFloat(dealAmount)
                          );
                  }
                  if ("03" != orderType[0].saleModelCode && isChecked == 1) {
                      currRow.setValue("dealPrice", 0);
                      currRow.setValue("dealAmount", 0);
                      currRow.setValue("offsetAmount", 0);
                      // currRow.setValue("salePrice", 0);
                      viewModel.salesorderCard
                          .getCurrentRow()
                          .setValue(
                              "totalDealAmount",
                              parseFloat(totalDealAmount) - parseFloat(dealAmount)
                          );
                  }
                  if ("03" == orderType[0].saleModelCode && isChecked == 1) {
                      viewModel.salesorderCard
                          .getCurrentRow()
                          .setValue(
                              "offsetAmount",
                              parseFloat(offsetAmount) - parseFloat(dealAmount)
                          );
                  }
                  //联动bom勾选
                  var parentGoodsId = obj.rowObj.getValue("goodsId");
                  var parentRowNum = obj.rowObj.getValue("rowNum");

                  //获取全部bom信息
                  var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                  for (var i = 0; i < bomdata.length; i++) {
                      var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                      if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                          allrows[i].setValue("isGift", obj.newValue);
                      }
                  }
                  viewModel.computeHeadDataInfo(true);
              });
          // 830 成交价可编辑
          viewModel.saleOrderItems
              .off("dealPrice.valuechange")
              .on("dealPrice.valuechange", function(obj) {
                  // 有促销或费用冲抵时，不可编辑成交价，不再处理监听事件
                  if (viewModel.isCostFlush != 0) {
                    return;
                  }
                  var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                  var dealPriceOpt = viewModel.app.getComp("grid_salesorder_edit").grid.getColumnByField("dealPrice");
                  if (dealPriceOpt.options.editable) {
                      var rate = parseFloat(currRow.getValue("conversionRate") || "1");
                      var mainNum = parseFloat(currRow.getValue("mainNum"));
                      var totalAmount = mainNum * parseFloat(obj.newValue);
                      totalAmount = totalAmount ? totalAmount : 0;
                      currRow.setValue("dealAmount", totalAmount);
                  }
                  viewModel.linkHeadAmount(viewModel.salesorderCard.getCurrentRow());
                  viewModel.computeHeadDataInfo(true);
              });

          // 830 成交金额可编辑
          viewModel.saleOrderItems
              .off("dealAmount.valuechange")
              .on("dealAmount.valuechange", function(obj) {
                  // 有促销或费用冲抵时，不可编辑成交金额，不再处理监听事件
                  if (viewModel.isCostFlush != 0) {
                    return;
                  }
                  var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                  var dealPriceOpt = viewModel.app
                      .getComp("grid_salesorder_edit")
                      .grid.getColumnByField("dealPrice");
                  if (dealPriceOpt.options.editable) {
                      var rate = parseFloat(currRow.getValue("conversionRate") || "1");
                      var mainNum = parseFloat(currRow.getValue("mainNum"));
                      var dealPrice = (parseFloat(obj.newValue)) / mainNum;

                      dealPrice = dealPrice ? dealPrice : 0;
                      currRow.setValue("dealPrice", dealPrice);
                  }
                  viewModel.linkHeadAmount(viewModel.salesorderCard.getCurrentRow());
                  viewModel.computeHeadDataInfo(true);
              });

          // 830 单价可修改
          viewModel.saleOrderItems
              .off("salePrice.valuechange")
              .on("salePrice.valuechange", function(obj) {
                  // 有促销或费用冲抵时，不可编辑单价，不再处理监听事件
                  if (viewModel.isCostFlush != 0) {
                    return;
                  }
                  var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                  var orderNum = currRow.getValue("orderNum") || 0;
                  currRow.setValue("orderNum", orderNum);
                  // 计算合计表头总原价
                  var orderItems = viewModel.saleOrderItems.getSimpleData();
                  var arr = [];
                  for (var i = 0; i < orderItems.length; i++) {
                      if (orderItems[i].dr != 1) {
                          arr.push(orderItems[i]);
                      }
                  }
                  var totalAmount = 0;
                  for (var i = 0; i < arr.length; i++) {
                      totalAmount += parseFloat(arr[i].mainNum * parseFloat(arr[i].salePrice) || 0);
                  }
                  viewModel.salesorderCard.getCurrentRow().setValue("totalAmount", totalAmount);
                  //联动bom单价
                  var parentGoodsId = obj.rowObj.getValue("goodsId");
                  var parentRowNum = obj.rowObj.getValue("rowNum");
                  //获取全部bom信息
                  var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                  var salePrice = obj.newValue;
                  for (var i = 0; i < bomdata.length; i++) {
                      var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                      if (
                          bomdata[i].parentGoodsId === parentGoodsId &&
                          bomdata[i].goodsId !== parentGoodsId &&
                          bomdata[i].parentRowNum == parentRowNum
                      ) {
                          allrows[i].setValue("salePrice", salePrice);
                      } else {
                          if (
                              allrows[i] &&
                              allrows[i].getValue("goodsId") === parentGoodsId &&
                              bomdata[i].parentRowNum == parentRowNum
                          ) {
                              allrows[i].setValue("salePrice", salePrice);
                          }
                      }
                  }
                  viewModel.computeHeadDataInfo(true);
              });
          // 库存组织联动仓库
          viewModel.saleOrderItems.off('deliveryInvOrgId.valuechange').on('deliveryInvOrgId.valuechange', function(obj) {
              var currRow = viewModel.saleOrderItems.getRowByRowId(
                  obj.rowId
              );
              if (currRow) {
                currRow.setValue("deliveryWarehouseId", null);
                currRow.setValue("deliveryWarehouseCode", null);
                currRow.setValue("deliveryWarehouseName", null);
                currRow.setMeta("deliveryWarehouseId", 'display', null);
              }
          });

          // 查询所有销售订单类型
          // $._ajax({
          //   type: "get",
          //   url: appCtx + '/so-types/find-all-so?isEnable=true&type=SF',
          //   success: function (data) {

          //     if (data && data.length > 0) {
          //       var combodata = data.map(function (item) {
          //         return {
          //           name: item.name,
          //           value: item.id,
          //           code: item.code
          //         }
          //       });
          //       viewModel.soTypeSrc(combodata);
          //     }
          //   }
          // });
          // 关闭原因枚举查询
          $._ajax({
              type: "get",
              url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
              data: {
                  cust_doc_code_batch: "QY034,QY077,QY102,QY103,QY104"
              },
              success: function(data) {
                  var combodata = common.dataconvert.toMap(data["QY034"], "name", "id");
                  viewModel.accountTypeSrc(combodata);
                  var combodata1 = common.dataconvert.toMap(
                      data["QY077"],
                      "name",
                      "code"
                  );
                  viewModel.closeReasonSrc(combodata1);
                  var combodata2 = common.dataconvert.toMap(
                      data["QY102"],
                      "name",
                      "code"
                  );
                  var combodata3 = common.dataconvert.toMap(
                      data["QY103"],
                      "name",
                      "code"
                  );
                  var combodata4 = common.dataconvert.toMap(
                      data["QY104"],
                      "name",
                      "code"
                  );
                  viewModel.arrivalBelongDataSource(combodata2);
                  viewModel.orderTypeSource(combodata3);
                  viewModel.purchaseTypeSource(combodata4);
              }
          });
          // 查询金额单位精度，币符
          $._ajax({
              url: window.pathMap.base + "/currency",
              data: {
                size: 999,
				        page: 0
              },
              success: function(resp) {
                  var data = resp.content;
                  for (var i = 0; i < data.length; i++) {
                      if (data[i].isDefault == 1 && data[i].isEnable == 1) {
                          viewModel.CURRENCY = data[i];
                          viewModel.priceFormater = new u.NumberFormater(data[i].pricePrecision || 2),
                              viewModel.amountFormater = new u.NumberFormater(data[i].amountPrecision || 2),
                              // 单价类
                              viewModel.saleOrderItems.setMeta(
                                  "salePrice",
                                  "precision",
                                  data[i].pricePrecision
                              ); // 原价
                          viewModel.saleOrderItems.setMeta(
                              "promPrice",
                              "precision",
                              data[i].pricePrecision
                          ); // 促销价
                          viewModel.saleOrderItems.setMeta(
                              "dealPrice",
                              "precision",
                              data[i].pricePrecision
                          ); // 成交价
                          // 金额类
                          viewModel.saleOrderItems.setMeta(
                              "offsetAmount",
                              "precision",
                              data[i].amountPrecision
                          ); // 冲抵金额
                          viewModel.saleOrderItems.setMeta(
                              "dealAmount",
                              "precision",
                              data[i].amountPrecision
                          ); // 成交金额
                          viewModel.saleOrderItems.setMeta(
                              "promAmount",
                              "precision",
                              data[i].amountPrecision
                          ); // 促销折扣额
                          // 费用账户列表进度处理
                          viewModel.setAccountScale();
                          i = data.length;
                      }
                  }
              }
          });
          purchaseAfterCreate(viewModel);
      }
  });
  return view;
});