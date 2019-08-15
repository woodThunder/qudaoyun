/**
 * 销售订单
 * @author yushf
 */
define(['text!./channelsalesorder.html', 'ocm_common', 'ocm_baseview', './meta.js', 'editcard', './events.js', './renderType.js'], function (tpl, common, baseview, model, editcard, events, rendertype) {
  var viewModel, app;
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
      app = this.app;
      viewModel = _.extend(viewModel, rendertype(viewModel))
      viewModel = _.extend(viewModel, events(viewModel))

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
    },
    tpl: tpl,
    model: model,
    // rendertype: rendertype(view),
    baseData: {
      baseurl: '/b2b/order',
      dialogWidth: "800px",
      salesorderList: new u.DataTable(model.options.metas.soitemmeta),//列表
      salesorderCard: new u.DataTable(model.options.metas.someta),//编辑
      salesorderDetailCard: new u.DataTable(model.options.metas.someta),//详情
      saleOrderItems: new u.DataTable(model.options.metas.soitemmeta),//订单行
      // 待关闭订单条目
      closeOrderItems: new u.DataTable(model.options.metas.soitemmeta),
      // 批量操作订单条目列表
      batchSaleOrderItems: new u.DataTable(model.options.metas.soitemmeta),
      // bom 结构
      batchSaleOrderBomItems: new u.DataTable(model.options.metas.BomItem),
      currowBomNum: ko.observable(0),
      // 是否bom页签
      isBomPanel: ko.observable(),

      ItemRefList: new u.DataTable(model.options.metas.ItemRef),//选商品参照
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
      //返回列表页
      retListPanel: common.bill.retListPanel,
      // 账号类型
      accountTypeSrc: ko.observableArray([]),
      soTypeSrc: ko.observableArray([]),
      closeReasonSrc: ko.observableArray([]),
      // 当前系统日期
      curDate: ko.observable(),
      //默认交货推迟日期
      defaultDelayDate: ko.observable(3),
      // 行号池
      curRowNum: ko.observable(0),

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

      billstatusCheck: ko.pureComputed(function () {
        var curbillstatus = viewModel.salesorderList.ref("orderStatusCode")();
        if (curbillstatus == billstatus.COMMITTED) {
          return 1;
        }
        if (curbillstatus == billstatus.APPROVED) {
          return 2;
        }
        return 0;
      }),
      CustomerCastflushDetailItem: new u.DataTable(model.options.metas.CustomerCastflushDetail),//费用兑付明细
      gridFlushDetail: model.options.grids.gridFlushDetail,

      costFlushDetailCard: new u.DataTable(model.options.metas.costFlushDetailCard),    // 费用冲抵详情展示
      costFlushDetailOption: model.options.cards.costFlushDetail,        // 费用冲抵详情展示

      costFlushingEdit: new u.DataTable(model.options.metas.costFlushingEdit),//费用冲抵
      gridCostFlushing: model.options.grids.gridCostFlushing,           // 费用冲抵

      orderReceiveAddress: new u.DataTable(model.options.metas.orderReceiveAddress), 
      orderInvoice: new u.DataTable(model.options.metas.orderInvoice), 
    },
    afterCreate: function () {
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
        viewModel.globalQueryData = []
        viewModel.globalQueryData.push({ key: "search_EQ_orderStatus", value: "02" })
        viewModel.globalQueryData.push({ key: "search_EQ_isClose", value: "0" })
        //待审核  待退单
        if (type == "daishenhe") {
          viewModel.globalQueryData.push({ key: "search_EQ_saleModel", value: "01" })
        } else if (type == "daituidan") {
          viewModel.globalQueryData.push({ key: "search_EQ_saleModel", value: "02" })
        } else if (type = "daichuku") {
          viewModel.golbalIsDaichuku = true;
        }
      }

      //绑定输入框enter事件
      $('#salesorder-searchcontent input').off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13) {
          $(this).blur();
          viewModel.search();
        }
      });

      $("#salesorderTab .u-tabs__tab").click(function (e) {
        viewModel.tabindex = $(this).index();
        viewModel.search(true);
      });

      var refRow = viewModel.ItemRefList.createEmptyRow();
      viewModel.ItemRefList.setRowFocus(refRow);
      viewModel.salesorderCard.off("customerInoviceId.valuechange").on("customerInoviceId.valuechange", function (obj) {
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainercustomerInoviceId").data("uui.refer");
        var invoice = refer.values[0];
        viewModel.salesorderCard.setValue("invoiceType", invoice.invoiceTypeId);
        viewModel.salesorderCard.setValue("invoiceTitle", invoice.refname);
        viewModel.salesorderCard.setValue("invoiceTaxId", invoice.refcode);
      });

      // 确定销售产品参照，为产品组合子表增行
      viewModel.ItemRefList.off("productref.valuechange").on("productref.valuechange", function (obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var bomItems = [];
        var refer = $("#refContainerproductref").data("uui.refer");
        var refValues = refer.values;
        var goodsInfoDtos = [];
        // var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
        refValues.forEach(function (item) {
          item.goodsAttrVals = '';
          goodsInfoDtos.push({
            id: item.originalGoodsId,
            supplierId: JSON.parse(localStorage.getItem("_A_P_customer")).id
            // saleOrgId: saleOrgId
          });
        });

        // 根据选择的商品信息 去询价格

        $._ajax({
          url: window.pathMap.b2b + '/b2b/goods/find-channel-price-by-goods',
          data: JSON.stringify(goodsInfoDtos),
          contentType: 'application/json;charset=UTF-8',
          type: 'POST',
          success: function (resp) {
            var newData = [];
            for (var i = 0; i < resp.length; i++) {
              newData.push({
                basePrice: resp[i].price
              });
            }
            var data = $.extend(true, refValues, newData);
            initData(data);
          }
        });

        function initData(data) {
          if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              var formula = {};
              var id = data[i].refpk;
              var row = viewModel.saleOrderItems.getRowByField("productId", id);
              var rowNum = viewModel.generaterowNum();
              if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
                var newrow = viewModel.saleOrderItems.createEmptyRow({
                  unSelect: true
                });
                newrow.setSimpleData(data[i]);
                newrow.setValue("rowNum", rowNum);
                newrow.setValue("goodsId", data[i].refpk);
                newrow.setValue("goodsCode", data[i].refcode);
                newrow.setValue("goodsName", data[i].refname);
                newrow.setValue("goodsDisplayName", data[i].displayName);
                newrow.setValue("measurementUnitId", data[i].basicUnitId);
                newrow.setValue("mainNumUnitCode", data[i].basicUnitCode);
                newrow.setValue("mainNumUnitName", data[i].basicUnitName);
                newrow.setValue("mainNumUnitId", data[i].basicUnitId);
                newrow.setValue("measurementUnitCode", data[i].basicUnitCode);
                newrow.setValue("measurementUnitName", data[i].basicUnitName);
                newrow.setValue("orderNumUnitId", data[i].basicUnitId);
                newrow.setValue("orderNumUnitCode", data[i].basicUnitCode);
                newrow.setValue("orderNumUnitName", data[i].basicUnitName);
                newrow.setValue("arrivalBelongCode", "01");
              };
              //bom产品信息的添加
              var bomdata = viewModel.findBomByParentId(id);
              if (bomdata && bomdata.length > 0) {
                var bomItem = bomdata[0].goodsBomChildren;
                bomItem.forEach(function (item) {
                  var bomrows = viewModel.batchSaleOrderBomItems.createEmptyRow();
                  //转参照里字段
                  var bomRowNum = viewModel.generateBomrowNum();
                  item.id = null;
                  item.goodsName = item.childGoodsName;
                  item.goodsId = item.childGoodsId;
                  item.goodsCode = item.childGoodsCode;
                  item.version = item.childGoodsVersion;
                  item.measurementUnitId = item.childGoodsUnitId;
                  item.measurementUnitCode = item.childGoodsUnitCode;
                  item.measurementUnitName = item.childGoodsUnitName;

                  item.mainNumUnitId = item.childGoodsUnitId;
                  item.mainNumUnitCode = item.childGoodsUnitCode;
                  item.mainNumUnitName = item.childGoodsUnitName;

                  item.orderNumUnitId = item.childGoodsUnitId;
                  item.orderNumUnitId = item.childGoodsUnitCode;
                  item.orderNumUnitId = item.childGoodsUnitName;
                  
                  item.orderNum = item.childGoodsQty;
                  item.parentRowNum = rowNum;
                  item.rowNum = bomRowNum;
                  item.parentGoodsName = data[i].refname;
                  item.mainNum = '';
                  viewModel.currowBomNum(bomRowNum);
                  bomrows.setSimpleData(item, {
                    unSelect: true,
                    status: 'new'
                  });
                });
                
              } else {
                var parentRowNum = rowNum;
                //没有bom结构的商品直接复制过来
                var bomRowNum = viewModel.generateBomrowNum();
                var cpRow = viewModel.batchSaleOrderBomItems.createEmptyRow();
                cpRow.setSimpleData(newrow.getSimpleData(), {
                  status: 'new'
                });
                var parentGoodsId = cpRow.getValue("goodsId");
                var parentGoodsName = cpRow.getValue("goodsName");
                var version = cpRow.getValue("version");
                var basePrice = cpRow.getValue("basePrice");
                cpRow.setValue("rowNum", bomRowNum);
                cpRow.setValue("parentRowNum", parentRowNum);
                cpRow.setValue("parentGoodsId", parentGoodsId);
                cpRow.setValue("parentGoodsName", parentGoodsName);
                cpRow.setValue("mainNum", '');

                var getRow = viewModel.batchSaleOrderBomItems.getSimpleData();
                getRow.forEach(function (item) {
                  item.persistStatus = 'new';
                });
              }
            }
          }
        }

      });
      // 监听选配id变化 根据id查询选配结果
      viewModel.saleOrderItems.off("baseGoodsOptId.valuechange").on("baseGoodsOptId.valuechange", function (obj) {
        console.log(obj);
        var currRow = viewModel.saleOrderItems.getRowByRowId(
          obj.rowId
        );
        // 根据选配结果 id 查询选配结果
        $._ajax({
          type: "get",
          url: '/occ-base/api/base/goodsOpt/find-by-ids',
          data: { ids: currRow.getValue('baseGoodsOptId') },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            //联动bom
            var parentGoodsId = obj.rowObj.getValue("goodsId");
            var baseGoodsOptId = obj.rowObj.getValue("baseGoodsOptId");
            //获取全部bom信息
            var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
            for (var i = 0; i < bomdata.length; i++) {
              var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
              if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId) {
                allrows[i].setValue("baseGoodsOptId", data.id);
              } else {
                if (allrows[i].getValue("goodsId") === parentGoodsId) {
                  allrows[i].setValue("baseGoodsOptId", (data.id || baseGoodsOptId));
                }
              }
            }
          }
        });
      });
      // 监听选配id变化 根据id查询选配结果
      /* viewModel.batchSaleOrderBomItems.off("baseGoodsOptId.valuechange").on("baseGoodsOptId.valuechange", function (obj) {
        console.log(obj);
        // 根据选配结果 id 查询选配结果
        // $._ajax({
        // 	type: "get",
        // 	url: '/occ-base/api/base/goodsOpt/find-by-ids',
        // 	data: { id: obj.row.value.baseGoodsOptId },
        // 	contentType: "application/json; charset=utf-8",
        // 	success: function(data) {
        // 		$(obj.element).find('a').html(data.optResult);
        // 	}
        // });
      }); */
      // 客户订单类型 change
      viewModel.salesorderCard.off("orderTypeId.valuechange").on("orderTypeId.valuechange", function (obj) {
        var refer = $("#refContainerorderTypeId").data("uui.refer");
        viewModel.salesorderCard.getCurrentRow().setValue("orderTypeCode", refer.values[0].refcode);
        viewModel.salesorderCard.getCurrentRow().setValue("saleModel", refer.values[0].saleModelCode);
      });
      // 客户 change
      viewModel.salesorderCard.off("customerId.valuechange").on("customerId.valuechange", function (obj) {
        viewModel.saleOrderItems.removeAllRows();
        viewModel.batchSaleOrderBomItems.removeAllRows();
        viewModel.salesorderCard.setValue('offsetAmount', 0);
        viewModel.salesorderCard.setValue('totalDealAmount', 0);
        viewModel.salesorderCard.setValue('totalNum', 0);
      });
      viewModel.saleOrderItems.off("orderNum.valuechange").on("orderNum.valuechange", function (obj) {
        var currRow = viewModel.saleOrderItems.getRowByRowId(
          obj.rowId
        );
        // 计算商品行主数量、金额
        var rate = parseFloat(currRow.getValue("conversionRate") || "1");
        var mainNum = parseFloat(obj.newValue) * rate;
        var dealAmount =
          mainNum * parseFloat(currRow.getValue("basePrice") || currRow.getValue("basePrice") || "0");
        currRow.setValue("mainNum", mainNum);
        currRow.setValue("dealAmount", dealAmount);
        currRow.setValue("amount", dealAmount);

        // 计算成交价  成本价计算方式   成交金额-促销金额-冲抵金额   /  数量
        var dealPrice = dealAmount / mainNum;
        currRow.setValue("dealPrice", dealPrice);

        // 计算合计金额、合计数量
        var arr = viewModel.saleOrderItems.getSimpleData();
        var totalAmount = 0;
        var totalNum = 0;
        for (var i = 0; i < arr.length; i++) {
          totalAmount += arr[i].dealAmount ? parseFloat(arr[i].dealAmount) : 0;
          totalNum += arr[i].mainNum ? parseFloat(arr[i].mainNum) : 0;
        }
        viewModel.salesorderCard.getCurrentRow().setValue("totalNum", totalNum);

        var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
        if ('03' == orderType[0].saleModelCode) {
          viewModel.salesorderCard.getCurrentRow().setValue("offsetAmount", totalAmount);
          totalAmount = 0;
        }
        viewModel.salesorderCard.getCurrentRow().setValue("totalDealAmount", totalAmount);

        //联动bom数量
        var parentGoodsId = obj.rowObj.getValue("goodsId");
        //获取全部bom信息
        var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
        for (var i = 0; i < bomdata.length; i++) {
          var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
          if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId) {
            var bomAmount = bomdata[i].childGoodsQty * obj.newValue;
            allrows[i].setValue("mainNum", bomAmount * rate);
            allrows[i].setValue("orderNum", bomAmount);
          } else {
            if (allrows[i].getValue("goodsId") === parentGoodsId && (allrows[i].getValue("parentGoodsName"))) {
              var amount = obj.newValue;
              allrows[i].setValue("mainNum", amount * rate);
              allrows[i].setValue("orderNum", amount);
              allrows[i].setValue("dealAmount", dealAmount);
              allrows[i].setValue("amount", dealAmount);
            }
          }
        }

      });

      // viewModel.saleOrderItems.off("mainNum.valuechange").on("mainNum.valuechange", function(obj) {
      //   var currRow = viewModel.saleOrderItems.getRowByRowId(
      //     obj.rowId
      //   );
      //   // 计算商品行主数量、金额
      //   var rate = parseFloat(currRow.getValue("conversionRate") || "1");
      //   var orderNum = parseFloat(obj.newValue) / rate;
      //   var dealAmount = obj.newValue * parseFloat(currRow.getValue("dealPrice") || currRow.getValue("basePrice") || "0");
      //   currRow.setValue("orderNum", orderNum);
      //   currRow.setValue("dealAmount", dealAmount);
      //   // 计算合计金额、合计数量
      //   var arr = viewModel.saleOrderItems.getSimpleData();
      //   var totalAmount = 0;
      //   var totalNum = 0;
      //   for (var i = 0; i < arr.length; i++) {
      //     totalAmount += parseFloat(arr[i].dealPrice);
      //     totalNum += parseFloat(arr[i].mainNum);
      //   }
      //   viewModel.salesorderCard
      //     .getCurrentRow()
      //     .setValue("totalNum", totalNum);
      //   viewModel.salesorderCard
      //     .getCurrentRow()
      //     .setValue("totalDealAmount", totalAmount);
      // });
      // viewModel.salesorderList.on("select", function(obj) {
      //   var rowIds = obj.rowIds;
      //   for (let i = 0; i < rowIds.length; i++) {
      //     const rowId = rowIds[i];
      //     var currRow = viewModel.salesorderList.getRowByRowId(rowId);
      //     var orderStatus  = currRow.getValue("orderStatusCode");
      //     if(orderStatus !== "03"){
      //     }
      //     if(orderStatus !== "04"){
      //     }
      //     if(orderStatus !== "06"){
      //     }
      //   }
      // });
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
        success: function (data) {
          var combodata = common.dataconvert.toMap(data["QY034"], "name", "id");
          viewModel.accountTypeSrc(combodata);
          var combodata1 = common.dataconvert.toMap(data["QY077"], "name", "code");
          viewModel.closeReasonSrc(combodata1);
          //var combodata2 = common.dataconvert.toMap(data["QY102"], "name", "code");
          //var combodata3 = common.dataconvert.toMap(data["QY103"], "name", "code");
          //var combodata4 = common.dataconvert.toMap(data["QY104"], "name", "code");
          //viewModel.arrivalBelongDataSource(combodata2);
          //viewModel.orderTypeSource(combodata3);
          //viewModel.purchaseTypeSource(combodata4);
        }
      });
    }
  });
  return view;
});