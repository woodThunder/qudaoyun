define(["ocm_basemodel"], function (basemodel) {
  "use strict";
  var billstatus = CONST.B2BENUM.SALEORDER;
  //销售订单单据类型
  var billStatusSrc = [
    // {value: billstatus.COMMITTED, name: "已提交"},
    // {value: billstatus.APPROVED, name: "已审核"},
    // {value: billstatus.FINISHED, name: "已完成"}
  ];
  var someta = {
    params: {
      cls: "com.yonyou.occ.b2b.service.dto.OrderDto"
    },
    meta: {
      id: { type: "string" },
      // 供应商（非一级经销商）
      supplierId: {
        type: "string",
        required: true
      },
      // "供应商（非一级经销商）编码")
      supplierCode: { type: "string" },
      // "供应商（非一级经销商）名称")
      supplierName: { type: "string" },
      // 结算财务组织
      settleFinancialOrgId: {
        type: "string",
        refmodel: JSON.stringify(refinfo["organization_ocm"]),
        refcfg: '{"ctx":"/uitemplate_web","refName":"结算财务组织" }',
        refparam: '{"EQ_orgFuncRel": "05","EQ_isEnable":"1"}'
      },
      // "结算财务组织编码")
      settleFinancialOrgCode: { type: "string" },
      // "结算财务组织名称")
      settleFinancialOrgName: { type: "string" },
      // 客户订单类型
      orderTypeId: {
        type: "string",
        required: true,
      },
      // "订单类型编码")
      orderTypeCode: { type: "string" },
      // "订单类型名称")
      orderTypeName: { type: "string" },
      // 订单编码
      orderCode: { type: "string" },
      // 订单日期
      orderDate: { type: "date" },
      // 订单状态
      orderStatusId: { type: "string" },
      // "订单状态编码")
      orderStatusCode: { type: "string" },
      // "订单状态名称")
      orderStatusName: { type: "string" },
      // 客户
      customerId: {
        type: "string",
        required: true,
        refmodel: JSON.stringify(refinfo["customer_sale"]),
        refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
        refparam: '{"EQ_isChannelCustomer": "1"}'
      },
      // "客户编码")
      customerCode: { type: "string" },
      // "客户名称")
      customerName: { type: "string" },
      // 市场区域
      marketAreaId: { type: "string" },
      // "市场区域编码")
      marketAreaCode: { type: "string" },
      // "市场区域名称")
      marketAreaName: { type: "string" },
      // 客户经理
      salesManagerId: { type: "string" },
      // "客户经理编码")
      salesManagerCode: { type: "string" },
      // "客户经理名称")
      salesManagerName: { type: "string" },
      // 销售部门
      salesDeptId: { type: "string" },
      // "销售部门编码")
      salesDeptCode: { type: "string" },
      // "销售部门名称")
      salesDeptName: { type: "string" },
      // 运输方式
      transportModeId: {
        type: "string",
        refmodel: JSON.stringify(refinfo["transportmode"]),
        refcfg: '{"ctx":"/uitemplate_web","refName":"运输方式" }'
      },

      // 客户开票信息
      invoiceId: { type: "string" }, // 发票档案ID
      invoiceType: { type: "string" }, // 发票类型
      invoiceTitle: { type: "string" }, // 发票抬头
      invoiceTaxId: { type: "string" }, // 纳税人识别码

      // "运输方式编码")
      transportModeCode: { type: "string" },
      // "运输方式名称")
      transportModeName: { type: "string" },
      // 结算方式
      settleModeId: { type: "string" },
      // "结算方式编码")
      settleModeCode: { type: "string" },
      // "结算方式名称")
      settleModeName: { type: "string" },
      // 交货日期(即客户期望的收货日期)
      deliveryDate: { type: "date" },
      // 总数量
      totalNum: { type: "numberFloat", precision: 2 },
      // 币种
      currencyId: { type: "string" },
      // "币种编码")
      currencyCode: { type: "string" },
      // "币种名称")
      currencyName: { type: "string" },
      // 币种单价精度
      currencyPriceScale: { type: "integer" },
      // 币种金额精度
      currencyAmountScale: { type: "integer" },
      // 总成交金额
      totalDealAmount: { type: "amountFloat" },
      // 冲抵前金额
      totalAmount: { type: "amountFloat" },
      // 费用冲抵金额
      offsetAmount: { type: "amountFloat" },
      // 总重量
      totalWeight: { type: "string" },
      // 总体积
      totalVolume: { type: "string" },
      // 订单来源
      orderSource: { type: "string" },
      // 备注
      remark: { type: "string" },
      // 审批意见
      approveOpinion: { type: "string" },
      // 审核状态
      approveStatus: { type: "integer" },
      // 审批人
      approver: { type: "string" },
      // 审批时间
      approveTime: { type: "date" },
      // 来源订单号
      srcOrderCode: { type: "string" },
      // 来源订单主键
      srcOrderId: { type: "string" },
      // 收货地址
      receiveAddressId: {
        type: "string",
        refmodel: JSON.stringify(refinfo["customeraddress"]),
        refcfg: '{"ctx":"/uitemplate_web", "refName":"收货地址"}'
      },
      receiverAddress: { type: "string" },
      receiveAddressName: { type: "string" },
      // 账期
      accountPeriodId: {
        type: "string",
        refmodel: JSON.stringify(refinfo["settlementSettings"]),
        refcfg: '{"ctx":"/uitemplate_web","refName":"账期" }',
      },
      // "账期编码"
      accountPeriodCode: { type: "string" },
      // "账期名称"
      accountPeriodName: { type: "string" },
      // 货补费用单类型
      costTypeId: {
        type: "string",
        refmodel: JSON.stringify(refinfo["trantype"]),
        refparam: '{"EQ_billTypeId":"CastType"}',
        refcfg: '{"ctx":"/uitemplate_web","refName":"货补订单类型" }'
      },
      costTypeName: { type: "string" },
      costTypeCode: { type: "string" },
      saleModel: { type: "string" }, // 销售模式
      measurementUnitId: {
        type: 'string',
        required: true
      }, //计量单位
      measurementUnitCode: {
        type: 'string',
        required: true
      }, //计量单位
      measurementUnitName: {
        type: 'string',
        required: true
      }, //计量单位

      // 收货人
      receiver: {
        type: "string"
      },
      // 收货人电话
      receiverTel: {
        type: "string"
      },
      // 收货人手机
      receiverPhone: {
        type: "string"
      },
      // 收货详细地址
      receiverAddress: {
        type: "string"
      },
    },
    pageSize: 10
  };
  var soitemmeta = {
    params: {
      cls: "com.yonyou.occ.b2b.service.dto.OrderItemDto"
    },
    meta: {
      // 订单主表主键
      orderId: { type: "string" },
      // 行号
      rowNum: { type: "string" },
      // 商品ID
      goodsId: { type: "string" },
      // 商品编码
      goodsCode: { type: "string" },
      // 商品名称
      goodsName: { type: "string" },
      // 商品显示名称
      goodsDisplayName: {
        type: 'string'
      },
      // 原始版本商品
      originalGoodsId: { type: "string" },
      // 商品分类ID
      goodsCategoryId: { type: "string" },
      // 商品图片
      goodsImg: { type: "string" },
      // 产品
      productId: { type: "string" },
      // 产品线
      productLineId: { type: "string" },
      // 行合计重量
      rowWeight: {
        type: 'string'
      },
      // 行合计体积
      rowVolume: {
        type: 'string'
      },
      // 重量
      weight: { type: "string" },
      // 重量单位
      weightUnit: { type: "string" },
      // 体积
      volume: { type: "string" },
      // 体积单位
      volumeUnit: { type: "string" },
      // 订货数量
      orderNum: { type: "numberFloat" },
      // 订货单位
      orderNumUnitId: { type: "string" },
      // 订货单位编码")
      orderNumUnitCode: { type: "string" },
      // 订货单位名称")
      orderNumUnitName: { type: "string" },
      // 主数量
      mainNum: { type: "numberFloat" },
      // 主数量单位
      mainNumUnitId: { type: "string" },
      // 主数量单位编码")
      mainNumUnitCode: { type: "string" },
      // 主数量单位名称")
      mainNumUnitName: { type: "string" },
      // 单位换算率
      conversionRate: { type: "integer" },
      // 单价
      basePrice: { type: "priceFloat" },
      // 基础折扣价
      baseDiscountPrice: { type: "priceFloat" },
      // 基准折扣价格
      salePrice: { type: "priceFloat" },
      // 成交价
      dealPrice: { type: "priceFloat" },
      // 冲抵前金额
      amount: { type: "amountFloat" },
      // 冲抵金额
      offsetAmount: { type: "amountFloat" },
      // 成交金额
      dealAmount: { type: "amountFloat" },
      // 币种
      currency: { type: "string" },
      // 是否为赠品
      isGift: { type: "float", default: "0" },
      // 促销活动
      promotinId: { type: "string" },
      // 计划发货日期
      planDeliveryDate: { type: "date" },
      // 发货库存组织
      deliveryInvOrgId: {
        type: "string",
        refmodel: JSON.stringify(refinfo["organization_ocm"]),
        refcfg: '{"ctx":"/uitemplate_web","refName":"发货库存组织" }',
        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
      },
      // 发货库存组织编码")
      deliveryInvOrgCode: { type: "string" },
      // 发货库存组织名称")
      deliveryInvOrgName: { type: "string" },
      // 发货仓库
      deliveryWarehouseId: {
        type: "string",
        required: true,
        refmodel: JSON.stringify(refinfo["warehouse"]),
        refcfg: '{"ctx":"/uitemplate_web"}',
        refparam: '{"EQ_isEnable":"1"}'
      },
      deliveryWarehouseCode: { type: "string" },
      deliveryWarehouseName: { type: "string" },
      // 备注
      remark: { type: "string" },
      // 累计发货数量
      deliveryNum: { type: "numberFloat" },
      // 累计出库数量
      stockOutNum: { type: "numberFloat" },
      // 累计入库数量
      stockInNum: { type: "numberFloat" },
      // 累计退货数量
      returnNum: { type: "numberFloat" },
      // 累计退款数量
      refundNum: { type: "numberFloat" },
      // 累计签收数量
      signNum: { type: "numberFloat" },
      // 累计补货数量
      replenishNum: { type: "numberFloat" },
      // 累计协同数量
      coordinateNum: { type: "numberFloat" },
      // 实际退货金额
      totalReturnAmount: { type: "amountFloat" },
      // 来源订单号
      srcOrderCode: { type: "string" },
      // 来源订单主键
      srcOrderId: { type: "string" },
      // 来源订单行主键
      srcOrderItemId: { type: "string" },
      closeReason: { type: "string" },
      // 选配 id
      baseGoodsOptId: {
        type: 'string'
      },
      measurementUnitId: {
        type: 'string',
        required: true
      }, //计量单位
      measurementUnitCode: {
        type: 'string',
        required: true
      }, //计量单位
      measurementUnitName: {
        type: 'string',
        required: true
      }, //计量单位
      arrivalBelongCode: {
        type: 'string',
        required: true
      },
      parentGoodsId: {
        type: 'string',
        required: true
      },
      parentRowNum: {
        type: 'string'
      },
      parentGoodsName: {
        type: 'string',
        required: true
      },
      goodsNum: {
        type: 'numberFloat',
      }, //数量
      baseDiscountPrice: {
        type: 'priceFloat',
        required: true
      }, //单价
      version: {
        type: 'float',
        required: true
      }, //商品版本
      // 结算财务组织
      settleFinancialOrgId: {
        type: "string",
        required: true,
        refmodel: JSON.stringify(refinfo["organization_ocm"]),
        refcfg: '{"ctx":"/uitemplate_web","refName":"结算财务组织" }',
        refparam: '{"EQ_orgFuncRel": "02","EQ_isEnable":"1"}'
      },
      // "结算财务组织编码"
      settleFinancialOrgCode: { type: "string" },
      // "结算财务组织名称"
      settleFinancialOrgName: { type: "string" },
      // 项目
      projectId: {
        type: "string",
        required: true,
        refmodel: JSON.stringify(refinfo["project"]),
        refcfg: '{"ctx":"/uitemplate_web","refName":"项目" }',
        refparam: '{"EQ_isEnable":"1"}'
      },
      // "项目编码"
      projectCode: { type: "string" },
      // "项目名称"
      projectName: { type: "string" },
      // 供应商
      supplierId: {
        type: "string",
        refmodel: JSON.stringify(refinfo["suppliers"]),
        refcfg: '{"ctx":"/uitemplate_web","refName":"供应商名称" }',
        refparam: '{"EQ_isEnable":"1"}'
      },
      // "供应商编码"
      supplierCode: { type: "string" },
      // "供应商名称"
      supplierName: { type: "string" },
      dr: { type: 'integer' },
      // 订单状态
      orderStatusId: { type: "string" },
      // "订单状态编码")
      orderStatusCode: { type: "string" },
      // "订单状态名称")
      orderStatusName: { type: "string" },
      // 退货类型
      returnTypeId: { type: "string" },
      // 退货类型
      returnTypeCode: { type: "string" },
      // 退货类型
      returnTypeName: { type: "string" },
      // 退货原因
      returnReasonId: { type: "string" },
      // 退货原因
      returnReasonCode: { type: "string" },
      // 退货原因
      returnReasonName: { type: "string" },
      totalNum: { type: "numberFloat", precision: 2 },
      totalDealAmount: { type: "amountFloat" },
    },
    pageSize: 10
  };
  var BomItem = {
    meta: {
      // 行号
      rowNum: {
        type: 'string',
        required: true
      },
      // 商品
      goodsId: {
        type: 'string',
        required: true
      },
      // 商品显示名称
      goodsDisplayName: {
        type: 'string',
        required: true
      },
      // 商品名称
      goodsName: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['goods']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_isEnable":"1"}'
      },
      // 商品Code
      goodsCode: {
        type: 'string',
        required: true
      },
      // 商品图片
      goodsImg: {
        type: 'string'
      },
      goodsNum: {
        type: 'numberFloat',
      }, //数量
      // 是否赠品
      isGift: {
        type: 'float',
        required: true,
        default: "0"
      },
      // 选配 id
      baseGoodsOptId: {
        type: 'string'
      },
      // 产品线
      productLineId: {
        type: 'string'
      },
      // 行合计重量
      rowWeight: {
        type: 'string'
      },
      // 重量
      weight: {
        type: 'string'
      },
      // 重量单位
      weightUnitId: {
        type: 'string'
      },
      // 重量单位
      weightUnitCode: {
        type: 'string'
      },
      // 重量单位
      weightUnitName: {
        type: 'string'
      },
      // 行合计体积
      rowVolume: {
        type: 'string'
      },
      // 体积
      volume: {
        type: 'string'
      },
      // 体积单位
      volumeUnitId: {
        type: 'string'
      },
      // 体积单位
      volumeUnitCode: {
        type: 'string'
      },
      // 体积单位
      volumeUnitName: {
        type: 'string'
      },
      // 计量单位
      measurementUnitId: {
        type: 'string',
        required: true
      },
      // 计量单位
      measurementUnitCode: {
        type: 'string',
        required: true
      },
      // 计量单位
      measurementUnitName: {
        type: 'string',
        required: true
      },
      // 数量
      orderNum: {
        type: 'numberFloat',
      },
      // 主数量
      mainNum: { type: "numberFloat" },
      // 主数量单位
      mainNumUnit: { type: "string" },
      // 主数量单位编码")
      mainNumUnitCode: { type: "string" },
      // 主数量单位名称")
      mainNumUnitName: { type: "string" },
      // 订货单位
      orderNumUnitId: { type: "string" },
      // 订货单位编码")
      orderNumUnitCode: { type: "string" },
      // 订货单位名称")
      orderNumUnitName: { type: "string" },
      // 基础折扣价
      baseDiscountPrice: { type: "string" },
      // 单位换算率
      conversionRate: { type: "string" },
      // 原金额
      amount: {
        type: 'amountFloat',
      },
      // 单价
      basePrice: {
        type: 'priceFloat',
      },
      // 销售价格
      salePrice: {
        type: 'priceFloat',
      },
      // 成交价
      dealPrice: { type: "priceFloat" },
      // 成交金额
      dealAmount: { type: "amountFloat" },
      // 币种
      currency: { type: "string" },
      isClosed: {
        type: 'string',
        default: "0"
      },
      customerId: {
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['customer_sale']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        "refparam": '{"EQ_isChannelCustomer": "1"}'
      }, //客户
      customerCode: {
        type: 'string'
      }, //客户编码
      customerName: {
        type: 'string'
      }, //客户名称
      addStorageAmount: {
        type: 'numberFloat'
      }, //累计入库数量
      returnGoodsAmount: {
        type: 'numberFloat'
      }, //累计退货数量
      name: {
        type: 'string',
        required: true
      },

      //------- 630后 新加bom包件字段 -------
      // 商品版本号
      version: {
        type: 'string',
        required: true
      },
      // 商品选配项
      goodsSelection: {
        type: 'string',
        required: true
      },
      // 项目
      project: {
        type: 'string',
      },
      // 母件商品ID
      parentGoodsId: {
        type: 'string',
        required: true
      },
      //母件商品Code
      parentGoodsCode: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['goods']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_isEnable":"1"}'
      },
      //母件商品Name
      parentGoodsName: {
        type: 'string',
        required: true
      },
      //母件行号
      parentRowNum: {
        type: 'string',
      },
      childGoodsQty: {
        type: 'float',
      },

      dr: { type: 'integer' },
    },
    pageSize: 10,
  };
  // 收货地址
  var orderReceiveAddress = {
    type: "child",
    meta: {
        // 订单主键
        orderId: {
            type: "string"
        },
        id: {
            type: "string"
        },
        creator: {
            type: "string"
        },
        dr: {
            type: "string"
        },
        // 收货地址档案ID
        receiveAddressId: {
            type: "string"
        },
        receiveAddressName: {
            type: "string"
        },
        // 收货人
        receiver: {
            type: "string"
        },
        // 收货人电话
        receiverTel: {
            type: "string"
        },
        // 收货人手机
        receiverPhone: {
            type: "string"
        },
        // 国家
        country: {
            type: "string"
        },
        countryId: {
            type: "string"
        },
        // 收货省
        receiverProvince: {
            type: "string"
        },
        receiverProvinceId: {
            type: "string"
        },
        // 收货市
        receiverCity: {
            type: "string"
        },
        receiverCityId: {
            type: "string"
        },
        // 收货县
        receiverCounty: {
            type: "string"
        },
        receiverCountyid: {
            type: "string"
        },
        // 收货镇
        receiverTown: {
            type: "string"
        },
        receiverTownId: {
            type: "string"
        },
        // 收货详细地址
        receiverAddress: {
            type: "string"
        },
        // 收货邮编
        receiverZipcode: {
            type: "string"
        },
    }
};
// 发票信息
var orderInvoice = {
    type: "child",
    meta: {
        // 订单主键
        orderId: {
            type: "string"
        },
        id: {
            type: "string"
        },
        creator: {
            type: "string"
        },
        dr: {
            type: "string"
        },
        // 发票档案ID
        invoiceId: {
            type: "string"
        },
        // 发票类型
        invoiceType: {
            type: "string"
        },
        // 开票项目
        invoiceContent: {
            type: "string"
        },
        // 发票抬头
        invoiceTitle: {
            type: "string"
        },
        // 纳税人识别码
        invoiceTaxId: {
            type: "string"
        },
        // 开户银行
        invoiceBank: {
            type: "string"
        },
        // 开户账户
        invoiceAccount: {
            type: "string"
        },
        // 支行
        invoiceSubBank: {
            type: "string"
        }
    }
};
  var costFlushDetail = {
    meta: {
      supplyMaxOccupyMny: { type: 'string' },
      costOffsetRatio: { type: 'string' },
    },
    paheSize: 10

  }
  var orderItemMeta = {

  };
  var giftPromMeta = {

  };
  var orderPricePromMeta = {

  };
  var CustomerCastflushDetail = {
    meta: {
      id: { type: 'string' },//id
      customerCastId: { type: 'string' },//客户费用单ID
      customerOrderId: { type: 'string' },//销售订单ID
      customerOrderCode: { type: 'string' },//销售订单编码
      flushDate: { type: 'date' },//冲抵日期
      flushAmount: { type: 'amountFloat' },//冲抵金额
      flusher: { type: 'string' },//冲抵人
      flusherName: { type: 'string' },//冲抵人名称
      flushRemark: { type: 'string' },//冲抵备注
      billDate: { type: "date" }//费用单日期
    },
    pageSize: 10
  }
  var costFlushingEdit = {
    meta: {
      id: { type: 'string' },//id
      actualFlushAmount: { type: 'amountFloat' },       // 冲抵金额
      billCode: { type: 'string' },         // 客户费用单号
      customerName: { type: 'string' },     // 客户
      castTypeName: { type: 'string' },     // 费用单类型
      saleOrgName: { type: 'string' },      // 销售组织
      billDate: { type: 'string' },         // 费用单日期
      billStatusCode: { type: 'string' },   // 费用单状态
      castBalance: { type: 'amountFloat' },      // 费用余额
    },
    pageSize: 10
  }
  var searchs = {
    search1: [
      // {
      //   type: "refer",
      //   key: "supplier",
      //   label: "所属渠道",
      //   refinfo: "customer",
      //   refName: "所属渠道"
      // },
      {
        type: "refer",
        key: "customer",
        label: "客户",
        refinfo: "customer_sale",
        refName: "客户",
        clientParam: {'EQ_SuperCust': $.cookie('_A_P_userId')}
      },
      {
        type: "combo",
        key: "orderStatus",
        label: "订单状态",
        url:
          window.pathMap.base +
          "/cust-doc-defs/cust_doc_code?cust_doc_code=QY133",
        namefield: "name",
        valuefield: "code"
      },
      {
        type: "refer",
        key: "orderType",
        label: "订单类型",
        refinfo: "trantype",
        clientParam: { "EQ_billTypeId": "SaleOrder" }
      },
      {
        type: "text",
        key: "orderCode",
        label: "订单编号",
        refName: "订单编号"
      },
      {
        type: "daterange",
        key: "orderDate",
        label: "订单日期"
      },
      {
        type: "radio",
        key: "isClose",
        label: "订单关闭",
        dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
      },
      {
        type: "refer",
        key: "marketArea",
        label: "市场区域",
        refinfo: "market",
        refName: "市场区域"
      },
      {
        type: "refer",
        key: "salesDept",
        label: "销售部门",
        refinfo: "department",
        refName: "销售部门"
      },
      {
        type: "refer",
        key: "salesManager",
        label: "客户经理",
        refinfo: "accountManager",
        refName: "客户经理"
      }
    ]
  };
  var buttons = {
    buttonList: [
      {
        key: "addBillPanel",
        label: "新增订单",
        iconCls: "icon-plus",
        click: "showAddBillPanel",
        clickArg: "$data"
      },
      // {
      //   key: "addBillPanel",
      //   label: "修改",
      //   iconCls: "icon-edit",
      //   click: "showEditBillPanel",
      //   clickArg: "$data"
      // },
      {
        key: "addBillPanel",
        label: "删除",
        iconCls: "icon-shanchu1",
        click: "del",
        clickArg: "$data"
      },
      {
        key: "submit",
        label: "提交",
        iconCls: "icon-tubiao-shenhe",
        clickArg: "$data",
        children: [
          {
            key: "addBillPanel",
            label: "提交",
            click: "submitBillList",
          },
          {
            key: "addBillPanel",
            label: "收回",
            click: "unsubmitBillList",
          }
        ]
      },
      {
        key: "approve",
        label: "审批",
        iconCls: "icon-tubiao-shenhe",
        clickArg: "$data",
        children: [
          {
            key: "addBillPanel",
            label: "审批",
            click: "approveBillList",
          },
          {
            key: "addBillPanel",
            label: "取消审批",
            click: "unapproveBillList",
          }
        ]
      },
      {
        key: "addBillPanel",
        label: "驳回客户",
        iconCls: "icon-tubiao-quxiaoshenhe",
        click: "rejectBillPanel",
        clickArg: "$data"
      },
      // {
      //   key: "addBillPanel",
      //   label: "订单推发货单",
      //   iconCls: "icon-tubiao-duigou-xianxing",
      //   click: "pushOrderBillPanel",
      //   clickArg: "$data"
      // },
      {
        key: "addBillPanel",
        label: "整单关闭",
        iconCls: "icon-tubiao-guanbi-xianxing",
        click: "closeOrderBillPanel",
        clickArg: "$data"
      },
      {
        key: "addBillPanel",
        label: "整单打开",
        iconCls: "icon-tubiao-duigou-xianxing",
        click: "openOrderBillPanel",
        clickArg: "$data"
      },
      // {
      //   key: "addBillPanel",
      //   label: "查看费用兑付明细",
      //   iconCls: "icon-tubiao-shenhe",
      //   click: "showFeeCustItem",
      //   clickArg: "$data"
      // },
      {
        key: "export",
        label: "导出",
        iconCls: "icon-export",
        click: "exportHandle"
      },
    ],
    buttonEdit: [
      {
        key: "addBillPanel",
        label: "商品参照",
        iconCls: "icon-plus",
        click: "showAddItemsRef"
      },
      {
        key: "export",
        label: "删行",
        iconCls: "icon-shanchu1",
        click: "del_row"
      },
      {
        key: "export",
        label: "行关闭",
        iconCls: "icon-tubiao-guanbi-xianxing",
        click: "close_row"
      },
      {
        key: "export",
        label: "行打开",
        iconCls: "icon-tubiao-duigou-xianxing",
        click: "open_row"
      },
    ]
  };
  var grids = {
    gridList: {
      domid: "gridList",
      umeta: {
        id: "grid_salesorder",
        data: "salesorderList",
        type: "grid",
        editable: false,
        multiSelect: true,
        showNumCol: true
      },
      columns: [
        { field: "supplierName", dataType: "String", title: "所属渠道" },
        { field: "customerName", dataType: "String", title: "客户" },
        { field: "orderTypeName", dataType: "String", title: "订单类型" },
        {
          field: "orderCode",
          dataType: "String",
          title: "订单单号",
          renderType: "detailRender",
          width: "200px"
        },
        { field: "orderDate", dataType: "Date", title: "订单日期" },
        { field: "totalNum", dataType: "String", title: "总数量" },
        { field: "totalDealAmount", dataType: "String", title: "总金额" },
        { field: "orderStatusName", dataType: "String", title: "订单状态" },
        {
          field: "billStatusCode",
          dataType: "String",
          title: "操作",
          renderType: "operation",
          fixed: true,
          width: "100px"
        }
      ]
    },
    gridDetailItem: {
      domid: "gridDetailItem",
      umeta: {
        id: "grid_salesorder_item",
        data: "saleOrderItems",
        type: "grid",
        editable: false,
        multiSelect: true,
        showNumCol: true
      },
      columns: [
        { field: "rowNum", dataType: "String", title: "行号", editable: false },
        // {
        //   field: "settleFinancialOrgName",
        //   dataType: "String",
        //   title: "结算财务组织",
        //   width: "200px"
        // },
        {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码",
          width: "200px"
        },
        { field: "goodsName", dataType: "String", title: "商品名称" },
        {
          "field": "version",
          "dataType": "String",
          "title": "商品版本",
        },
        {
          "field": "baseGoodsOptId",
          "dataType": "String",
          "title": "选配信息",
          renderType: "goodsOptDetails",
          "editable": false
        },
        { field: "orderNum", dataType: "String", title: "订货量" },
        { field: "supplierName", dataType: "String", title: "供应商" },
        { field: "projectName", dataType: "String", title: "项目" },
        { field: "basePrice", dataType: "String", title: "单价" },
        { field: "salePrice", dataType: "String", title: "基准折扣价" },
        { field: "dealPrice", dataType: "String", title: "成交价" },
        { field: "dealAmount", dataType: "String", title: "成交金额" },
        {
          field: "isGift",
          dataType: "Integer",
          editable: false,
          title: "赠品",
          renderType: "disableBooleanRender",
          default: 0
        },
        { field: "planDeliveryDate", dataType: "Date", title: "计划发货日期" },
        {
          field: "deliveryInvOrgName",
          dataType: "String",
          title: "发货库存组织"
        },
        /*{
          field: "settleFinancialOrgName",
          dataType: "String",
          title: "结算财务组织",
          width: "200px"
        },*/
        { field: "remark", dataType: "String", title: "备注" },
        { field: "deliveryNum", dataType: "String", title: "累计发货数量", visible: false },
        { field: "stockOutNum", dataType: "String", title: "累计出库数量", visible: false },
        { field: "signNum", dataType: "String", title: "累计签收数量", visible: false },
        { field: "stockInNum", dataType: "String", title: "累计入库数量", visible: false },
        { field: "returnNum", dataType: "String", title: "累计退货数量", visible: false }
      ]
    },
    gridEditItem: {
      domid: "gridEditItem",
      umeta: {
        id: "grid_salesorder_edit",
        data: "saleOrderItems",
        type: "grid",
        editable: true,
        multiSelect: true
        // showNumCol: true,
      },
      columns: [
        { field: "rowNum", dataType: "String", title: "行号", editable: false },
        {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码",
          editable: false,
          required: true
        },
        {
          field: "goodsName",
          dataType: "String",
          title: "商品名称",
          editable: false
        },
        // {
        //   field: "promotinId",
        //   dataType: "String",
        //   title: "促销活动",
        //   editable: false
        // },
        {
          "field": "version",
          "dataType": "String",
          "title": "商品版本",
          "editable": false,
          "visible": true,
        },
        // {
        //   field: "baseGoodsOptId",
        //   dataType: "String",
        //   title: "商品选配",
        //   renderType: "goodsOpt",
        //   editable: false,
        // },
        { field: "mainNum", dataType: "String", title: "商品数量", editable: false },
        // {
        //   field: "projectId",
        //   dataType: "String",
        //   title: "项目",
        //   renderType: "ncReferRender",
        //   editType: "ncReferEditType",
        //   showField: "projectName",
        //   editOptions: {
        //     validType: "string",
        //     rel: {
        //       refpk: "projectId",
        //       refname: "projectName"
        //     }
        //   },
        // },
        // {
        //   field: "supplierId",
        //   dataType: "String",
        //   title: "供应商",
        //   renderType: "ncReferRender",
        //   editType: "ncReferEditType",
        //   showField: "supplierName",
        //   editOptions: {
        //     validType: "string",
        //     rel: {
        //       refpk: "supplierId",
        //       refname: "supplierName"
        //     }
        //   },
        // },
        { field: "orderNum", dataType: "String", title: "订货量", required: true },
        {
          field: "basePrice",
          dataType: "String",
          title: "单价",
          editable: false,
          required: true
        },
        { field: "dealPrice", dataType: "String", title: "成交价", editable: false, required: true },
        // {field:"amount",dataType:"String",title:"冲抵前金额",,editable: false, required: true},// 默认不显示
        // {field:"offsetAmount",dataType:"String",title:"冲抵金额"},// 默认不显示
        {
          field: "dealAmount",
          dataType: "String",
          title: "成交金额",
          editable: false,
          required: true
        },
        {
          field: "isGift",
          dataType: "checkbox",
          editable: true,
          editType: "float",
          title: "赠品",
          renderType: "booleanRender",
          default: 0
        },
        // { field:"weight",dataType:"String",title:"重量"},// 默认不显示
        // { field:"weight",dataType:"String",title:"体积"},// 默认不显示
        {
          field: "planDeliveryDate",
          dataType: "Date",
          editType: "date",
          title: "计划发货日期"
        },
        {
          field: "deliveryInvOrgId",
          dataType: "String",
          title: "发货库存组织",
          renderType: "ncReferRender",
          editType: "ncReferEditType",
          showField: "deliveryInvOrgName",
          editOptions: {
            validType: "string",
            rel: {
              refpk: "deliveryInvOrgId",
              refname: "deliveryInvOrgName"
            }
          },
        },
        {
          field: "deliveryWarehouseId",
          dataType: "String",
          title: "发货仓库",
          renderType: "ncReferRender",
          editType: "ncReferEditType",
          showField: "deliveryWarehouseName",
          editOptions: {
            validType: "string",
            rel: {
              refpk: "deliveryWarehouseId",
              refcode: "deliveryWarehouseCode",
              refname: "deliveryWarehouseName"
            }
          },
        },
        { field: "remark", dataType: "String", title: "备注", editable: true },
        // {field:"deliveryNum",dataType:"String",title:"累计安排发货数量",editable: false},// 默认不显示
        // {field:"stockOutNum",dataType:"String",title:"累计出库数量",editable: false},// 默认不显示
        // {field:"returnNum",dataType:"String",title:"累计退货数量",editable: false},// 默认不显示
        {
          field: "isClosed",
          dataType: "checkbox",
          title: "关闭",
          width: "130px",
          renderType: "booleanRender",
        },
        { field: "closeReason", dataType: "String", title: "关闭打开原因" },
        { field: "deliveryNum", dataType: "String", title: "累计发货数量", editable: false, visible: false },
        { field: "stockOutNum", dataType: "String", title: "累计出库数量", editable: false, visible: false },
        { field: "signNum", dataType: "String", title: "累计签收数量", editable: false, visible: false },
        { field: "stockInNum", dataType: "String", title: "累计入库数量", editable: false, visible: false },
        { field: "returnNum", dataType: "String", title: "累计退货数量", editable: false, visible: false }
      ]
    },
    gridFlushDetail: {
      domid: "flush_detail",
      umeta: {
        id: "grid_flush_detail",
        data: "CustomerCastflushDetailItem",
        type: "grid",
        editable: false,
        //multiSelect: true,
        showNumCol: true,
      },
      columns: [
        {
          field: "customerOrderCode",
          dataType: "String",
          title: "订单号"
        },
        {
          field: "flushDate",
          dataType: "Date",
          title: "冲抵日期"
        },
        {
          field: "flushAmount",
          dataType: "String",
          title: "冲抵金额"
        },
        {
          field: "flusherName",
          dataType: "String",
          title: "冲抵人"
        },
        {
          field: "flushRemark",
          dataType: "String",
          title: "冲抵备注",
        }
      ]
    },
    gridCostFlushing: {
      domid: "costFlushing",
      umeta: {
        id: "grid_costFlushing",
        data: "costFlushingEdit",
        type: "grid",
        editable: true,
        showNumCol: true,
      },
      columns: [
        {
          field: "billCode",
          dataType: "String",
          title: "客户费用单号",
          editable: false,
          renderType: "detailRender",
        },
        {
          field: "customerName",
          editable: false,
          dataType: "String",
          title: "客户",
        },
        {
          field: "castTypeName",
          dataType: "String",
          editable: false,
          title: "费用单类型",
        },
        {
          field: "saleOrgName",
          dataType: "String",
          editable: false,
          title: "销售组织",
        },
        {
          field: "billDate",
          dataType: "Date",
          editable: false,
          title: "费用单日期",
        },
        {
          field: "billStatusCode",
          renderType: "billStatusRender",
          dataType: "String",
          editable: false,
          title: "费用单状态",
        },
        {
          field: "castBalance",
          dataType: "String",
          editable: false,
          title: "费用余额",
        },
        {
          field: "actualFlushAmount",
          dataType: "String",
          title: "使用冲抵金额",
          width: '200px',
          editable: true,
        },
      ]
    },
    //bom结构信息
    grid4: {
      domid: "grid_BomItem",
      umeta: {
        "id": "grid_complexBomItem",
        "data": "batchSaleOrderBomItems",
        "type": "grid",
        "editable": true,
        "showNumCol": true,
      },
      columns: [
        {
          "field": "rowNum",
          "dataType": "String",
          "title": "行号",
          "editable": false,
        },
        {
          "field": "parentRowNum",
          "dataType": "String",
          "title": "母件商品行号",
          "editable": false
        },
        {
          "field": "parentGoodsName",
          "dataType": "String",
          "title": "母件商品名称",
          "editable": false
        },
        {
          "field": "goodsCode",
          "dataType": "String",
          "title": "商品编号",
          "editable": false
        },
        {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false
        },
        {
          "field": "version",
          "dataType": "String",
          "title": "商品版本",
          "editable": false
        },
        {
          "field": "baseGoodsOptId",
          "dataType": "String",
          "title": "选配信息",
          "editable": false
        },
        {
          "field": "mainNum",
          "dataType": "String",
          "title": "主数量",
          "editable": false
        },
        {
          "field": "orderNum",
          "dataType": "String",
          "title": "数量",
          "editType": "float",
          "editable": false
        },
        {
          "field": "mainNumUnitName",
          "dataType": "String",
          "title": "单位",
          "editable": false
        },
        {
          "field": "baseDiscountPrice",
          "dataType": "String",
          "title": "单价",
          "editType": "float",
          "editable": false
        },
        {
          "field": "dealAmount",
          "dataType": "String",
          "title": "成交金额",
          "editType": "float",
          "editable": false
        },
        {
          "field": "isClosed",
          "dataType": "checkbox",
          "title": "关闭",
          "editable": false,
          "width": "130px",
          "renderType": "booleanRender",
        },
        {
          "field": "isGift",
          "dataType": "checkbox",
          "editable": true,
          "title": "赠品",
          "visible": false
          // "renderType": "booleanRender",
        },
        {
          "field": "addStorageAmount",
          "dataType": "String",
          "title": "累计入库数量",
          "editable": false,
        },
        {
          "field": "returnGoodsAmount",
          "dataType": "String",
          "title": "累计退货数量",
          "editable": false,
        },
        {
          "field": "stockStatus",
          "dataType": "String",
          "title": "库存状态",
          "renderType": "stockRender",
          "editable": false,
        },
      ]
    },
    grid5: {
      domid: "grid_complexBomItem_Detail",
      umeta: {
        "id": "grid_complexBomItem_detail",
        "data": "batchSaleOrderBomItems",
        "type": "grid",
        "editable": false,
        "showNumCol": true
      },
      columns: [
        {
          "field": "rowNum",
          "dataType": "String",
          "title": "行号",
        },
        {
          "field": "parentGoodsName",
          "dataType": "String",
          "title": "母件商品名称",
          "editable": false
        },
        {
          "field": "goodsCode",
          "dataType": "String",
          "title": "商品编码",
        },
        {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品名称",
        },
        {
          "field": "version",
          "dataType": "String",
          "title": "商品版本",
        },
        {
          "field": "baseGoodsOptId",
          "dataType": "String",
          "title": "选配信息",
        },
        {
          "field": "mainNum",
          "dataType": "String",
          "title": "主数量",
          "editType": "float",
          "editable": false
        },
        {
          "field": "orderNum",
          "dataType": "String",
          "title": "数量",
          "required": true,
        },
        {
          "field": "mainNumUnitName",
          "dataType": "String",
          "title": "单位",
        },
        {
          "field": "baseDiscountPrice",
          "dataType": "String",
          "title": "单价",
        },
        {
          "field": "dealAmount",
          "dataType": "String",
          "title": "成交金额",
        },
        {
          "field": "isClosed",
          "dataType": "checkbox",
          "title": "关闭",
          "width": "130px",
          "renderType": "disableBooleanRender",
          "editable": false
        },
        {
          "field": "isGift",
          "dataType": "checkbox",
          "title": "赠品",
          "editType": "float",
          "renderType": "disableBooleanRender",
          "editable": false
        },
        {
          "field": "addStorageAmount",
          "dataType": "String",
          "title": "累计入库数量",
        },
        {
          "field": "returnGoodsAmount",
          "dataType": "String",
          "title": "累计退货数量",
        },
        {
          "field": "stockStatus",
          "dataType": "String",
          "title": "库存状态",
          "renderType": "stockRender",
        },
      ]
    },
    //采购订单商品信息
    grid6: {
      domid: "grid_purchase_complexItem",
      umeta: {
        "id": "grid_purchase_complexItem",
        "data": "purchaseItems",
        "type": "grid",
        "editable": true,
        "multiSelect": true,
        "showNumCol": true,
        "onBeforeEditFun": "checkHasBom"
      },
      columns: [{
        "field": "rowNum",
        "dataType": "String",
        "title": "行号",
        "editable": false,
      }, {
        "field": "goodsCode",
        "dataType": "String",
        "title": "商品编号",
        "editable": false
      }, {
        "field": "goodsName",
        "dataType": "String",
        "title": "商品名称",
        "editable": false
      }, {
        "field": "orderNum",
        "dataType": "String",
        "title": "数量",
        "editType": "float",
        "required": true,
      }, {
        "field": "unitName",
        "dataType": "String",
        "title": "单位",
        "editable": false
      }, {
        "field": "unitPrice",
        "dataType": "String",
        "title": "单价",
        "editType": "float",
      }, {
        "field": "amountMoney",
        "dataType": "String",
        "title": "金额",
        "editType": "float",
        "editable": false
      },
      {
        field: "goodsSelection",
        dataType: "String",
        title: "商品选配",
        renderType: "goodsOpt",
        editable: false,
      }, {
        "field": "version",
        "dataType": "String",
        "title": "商品多版本",
        "editable": false,
        "visible": true,
      },
      {
        "field": "project",
        "dataType": "String",
        "title": "项目",
        "editable": true,
        "visible": false,
      }, {
        "field": "isClosed",
        "dataType": "checkbox",
        "title": "关闭",
        "width": "130px",
        "renderType": "disableBooleanRender",
        "editable": false
      }, {
        "field": "isGift",
        "dataType": "checkbox",
        "editable": true,
        "title": "赠品",
        "renderType": "booleanRender",
      },
      {
        "field": "creator",
        "dataType": "String",
        "title": "创建人",
        "editable": false,
        "visible": false
      }, {
        "field": "creationTime",
        "dataType": "Date",
        "title": "创建时间",
        "editable": false,
        "visible": false
      }, {
        "field": "modifier",
        "dataType": "String",
        "title": "修改人",
        "editable": false,
        "visible": false
      }, {
        "field": "modifiedTime",
        "dataType": "Date",
        "title": "修改时间",
        "editable": false,
        "visible": false
      },
      {
        "field": "demandStockOrgId",
        "dataType": "String",
        "title": "需求库存组织",
        "renderType": "ncReferRender",
        "editType": "ncReferEditType",
        "showField": "demandStockOrgName",
        "editOptions": {
          "validType": "string"
        }
      }, {
        "field": "arrivalBelongCode",
        "dataType": "string",
        "title": "收货地归属",
        "editOptions": {
          "id": "arrivalBelongId",
          "type": "combo",
          "datasource": "arrivalBelongDataSource"
        },
        "editType": "combo",
        "renderType": "comboRender"
      }, {
        "field": "receiveStorageOrgId",
        "dataType": "String",
        "title": "收货库存组织",
        "renderType": "ncReferRender",
        "editType": "ncReferEditType",
        "showField": "receiveStorageOrgName",
        "editOptions": {
          "validType": "string"
        },
      }, {
        "field": "receiveStorageId",
        "dataType": "String",
        "title": "收货仓库",
        "renderType": "ncReferRender",
        "editType": "ncReferEditType",
        "showField": "receiveStorageName",
        "editOptions": {
          "validType": "string"
        }
      }, {
        "field": "customerId",
        "dataType": "String",
        "title": "收货客户",
        "renderType": "ncReferRender",
        "editType": "ncReferEditType",
        "showField": "customerName",
        "editOptions": {
          "validType": "string"
        }
      }, {
        "field": "detailAddr",
        "dataType": "String",
        "title": "地址信息",
        "editType": "addressInfo",
      }, {
        "field": "receiveAddress",
        "dataType": "String",
        "title": "收货地址",
        "editable": true
      }, {
        "field": "receiveContact",
        "dataType": "String",
        "title": "收货联系人",
        "editable": true
      }, {
        "field": "receiveContactPhone",
        "dataType": "String",
        "title": "收货联系人电话",
        "editable": true
      },
      {
        "field": "addStorageAmount",
        "dataType": "String",
        "title": "累计入库数量",
        "editable": false,
      }, {
        "field": "returnGoodsAmount",
        "dataType": "String",
        "title": "累计退货数量",
        "editable": false,
      }, {
        "field": "stockStatus",
        "dataType": "String",
        "title": "库存状态",
        "renderType": "stockRender",
        "editable": false,
      },
      ]
    },
    //采购订单bom结构信息
    grid7: {
      domid: "grid_purchase_complexBomItem",
      umeta: {
        "id": "grid_purchase_complexBomItem",
        "data": "purchaseBomItems",
        "type": "grid",
        "editable": true,
        "showNumCol": true,
      },
      columns: [
        {
          "field": "rowNum",
          "dataType": "String",
          "title": "行号",
          "editable": false,
        },
        {
          "field": "parentGoodsName",
          "dataType": "String",
          "title": "母件商品名称",
          "editable": false
        },
        {
          "field": "goodsCode",
          "dataType": "String",
          "title": "商品编号",
          "editable": false
        }, {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false
        }, {
          "field": "orderNum",
          "dataType": "String",
          "title": "数量",
          "editType": "float",
          "editable": false
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "单位",
          "editable": false
        }, {
          "field": "unitPrice",
          "dataType": "String",
          "title": "单价",
          "editType": "float",
          "required": true,
        }, {
          "field": "amountMoney",
          "dataType": "String",
          "title": "金额",
          "editType": "float",
          "editable": false
        }, {
          "field": "version",
          "dataType": "String",
          "title": "商品版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "project",
          "dataType": "String",
          "title": "项目",
          "editable": false,
          "visible": false,
        }, {
          "field": "isClosed",
          "dataType": "checkbox",
          "title": "关闭",
          "editable": false,
          "width": "130px",
          "renderType": "booleanRender",
        }, {
          "field": "isGift",
          "dataType": "checkbox",
          "editable": true,
          "title": "赠品",
          "renderType": "booleanRender",
        },
        {
          "field": "creator",
          "dataType": "String",
          "title": "创建人",
          "editable": false,
          "visible": false
        }, {
          "field": "creationTime",
          "dataType": "Date",
          "title": "创建时间",
          "editable": false,
          "visible": false
        }, {
          "field": "modifier",
          "dataType": "String",
          "title": "修改人",
          "editable": false,
          "visible": false
        }, {
          "field": "modifiedTime",
          "dataType": "Date",
          "title": "修改时间",
          "editable": false,
          "visible": false
        },
        {
          "field": "demandStockOrgId",
          "dataType": "String",
          "title": "需求库存组织",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "demandStockOrgName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
          "visible": false
        }, {
          "field": "arrivalBelongCode",
          "dataType": "string",
          "title": "收货地归属",
          "editOptions": {
            "id": "arrivalBelongId",
            "type": "combo",
            "datasource": "arrivalBelongDataSource"
          },
          "editType": "combo",
          "renderType": "comboRender",
          "editable": false,
          "visible": false
        }, {
          "field": "receiveStorageOrgId",
          "dataType": "String",
          "title": "收货库存组织",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "receiveStorageOrgName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
          "visible": false
        }, {
          "field": "receiveStorageId",
          "dataType": "String",
          "title": "收货仓库",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "receiveStorageName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
          "visible": false
        }, {
          "field": "customerId",
          "dataType": "String",
          "title": "收货客户",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "customerName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
          "visible": false
        }, {
          "field": "detailAddr",
          "dataType": "String",
          "title": "地址信息",
          "editType": "addressInfo",
          "editable": false,
          "visible": false
        }, {
          "field": "receiveAddress",
          "dataType": "String",
          "title": "收货地址",
          "editable": false,
          "visible": false
        }, {
          "field": "receiveContact",
          "dataType": "String",
          "title": "收货联系人",
          "editable": false,
          "visible": false
        }, {
          "field": "receiveContactPhone",
          "dataType": "String",
          "title": "收货联系人电话",
          "editable": false,
          "visible": false
        },
        {
          "field": "addStorageAmount",
          "dataType": "String",
          "title": "累计入库数量",
          "editable": false,
        }, {
          "field": "returnGoodsAmount",
          "dataType": "String",
          "title": "累计退货数量",
          "editable": false,
        }, {
          "field": "stockStatus",
          "dataType": "String",
          "title": "库存状态",
          "renderType": "stockRender",
          "editable": false,
        },
      ]
    }
  };
  var cards = {
    cardDetail: [
      { type: "textreadonly", key: "orderCode", label: "订单编号" },
      {
        type: "textreadonly",
        key: "supplierName",
        refinfo: "customer",
        label: "所属渠道",
        editable: false
      },
      {
        type: "textreadonly",
        key: "customerName",
        refinfo: "customer",
        label: "客户"
      },
      { type: "textreadonly", key: "orderTypeName", label: "客户订单类型" },
      { type: "textreadonly", key: "orderStatusName", label: "订单状态" },
      { type: "textreadonly", key: "deliveryDate", label: "期望收货日期" },
      {
        type: "textreadonly",
        key: "transportModeName",
        refinfo: "transportmode",
        label: "运输方式"
      },
      { type: "textreadonly", key: "orderDate", label: "订单日期" },
      // { type: "textreadonly", key: "accountPeriodName", label: "账期" },
      { type: "textreadonly", key: "receiveAddressName", label: "收货地址" },
      { type: "textreadonly", key: "customerReceiverName", label: "收货人" },
      { type: "textreadonly", key: "customerTel", label: "收货人电话" },
      { type: "textreadonly", key: "invoiceId", label: "客户开票单位" },
      { type: "textreadonly", key: "settleMode", label: "结算方式" },
      { type: "textreadonly", key: "remark", label: "备注" },
      { type: "textreadonly", key: "approveOpinion", label: "审批意见" },
      { type: "textreadonly", key: "customerNovice", label: "驳回原因" },
      { type: "textreadonly", key: "totalNum", label: "总数量" },
      { type: "textreadonly", key: "offsetAmount", label: "费用冲抵金额" },
      { type: "textreadonly", key: "totalDealAmount", label: "总金额" }
    ],
    cardEdit: [
      { type: "textreadonly", key: "orderCode", label: "订单编号" },
      // {
      //   type: "refer",
      //   key: "supplierId",
      //   referId: "supplierId",
      //   label: "所属渠道",
      //   refinfo: "customer",
      //   required: true,
      //   editable: false
      // },
      {
        type: "refer",
        key: "customerId",
        referId: "customerId",
        label: "客户",
        refinfo: "customer_sale",
        clientParam: { 'EQ_isChannelCustomer': '1' },
        required: true,
        cls: 'isCostFlush'
      },
      {
        type: "refer",
        key: "orderTypeId",
        referId: "orderTypeId",
        label: "客户订单类型",
        refinfo: "trantype",
        clientParam: { "EQ_billTypeId": "SaleOrder", "IN_trantypeExtends.fieldValue": "01,02" },
        required: true,
        cls: 'isCostFlush'
      },
      // {
      //   type: "refer",
      //   key: "costTypeId",
      //   referId: "costTypeId",
      //   label: "货补费用单类型",
      //   refinfo: "trantype",
      //   clientParam: {"EQ_billTypeId":"CastType"},
      // },
      {
        type: "textreadonly",
        key: "orderStatus",
        label: "订单状态",
        value: "待提交"
      },
      { type: "date", key: "deliveryDate", label: "期望收货日期" },
      {
        type: "refer",
        key: "transportModeId",
        label: "运输方式",
        refinfo: "transportmode"
      },
      { type: "date", key: "orderDate", label: "订单日期", defaultValue: new Date(), required: true },
      // {
      //   type: "refer",
      //   key: "accountPeriodId",
      //   refinfo: "settlementSettings",
      //   label: "账期",
      //   disableFilter: true
      // },
      {
        type: "refer",
        key: "receiveAddressId",
        refinfo: "customeraddress",
        label: "收货地址",
        disableFilter: true
      },
      { type: "text", key: "receiver", label: "收货人" },
      { type: "text", key: "receiverPhone", label: "收货人电话" },
      {
        type: "refer",
        key: "invoiceId",
        referId: "customerInoviceId",
        label: "客户开票单位",
        refinfo: "customer-invoice",
        // clientParam: {"EQ_customer":"SaleOrder"},
        disableFilter: true
      },
      {
        type: "refer",
        key: "settleMode",
        label: "结算方式",
        refinfo: "settlementMode"
      },
      { type: "text", key: "remark", label: "备注" },
      { type: "text", key: "approveOpinion", label: "审批意见" },
      { type: "text", key: "rejectReason", label: "驳回原因" },
      { type: "text", key: "totalNum", label: "总数量", enable: false },
      { type: "text", key: "offsetAmount", label: "费用冲抵金额", enable: false },
      { type: "text", key: "totalDealAmount", label: "总金额", enable: false }
    ],
    costFlushDetail: [
      { type: "text", key: "supplyMaxOccupyMny", label: "本单最大冲抵费用", enable: false },
      { type: "text", key: "costOffsetRatio", label: "冲抵比例", enable: false },
    ]
  };
  var ItemRef = {
    meta: {
      productref: {
        domid: "itemproductref",
        type: "string",
        // "refmodel": JSON.stringify(refinfo['goods']),
        refmodel: JSON.stringify(refinfo["allowgoods"]),
        refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
        refparam: '{"saleModel": "01", "customerRankCode": "01"}'
        // refparam: '{"customerId": '+localStorage.getItem("_A_P_customer")+'}'
      }
    }
  };
  var model = {
    metas: {
      someta: someta,
      soitemmeta: soitemmeta,
      costFlushDetailCard: costFlushDetail,
      ItemRef: ItemRef,
      CustomerCastflushDetail: CustomerCastflushDetail,
      orderInvoice: orderInvoice,
      orderReceiveAddress: orderReceiveAddress
    },
    searchs: searchs,
    buttons: buttons,
    grids: grids,
    cards: cards
  };
  return new basemodel(model);
});
