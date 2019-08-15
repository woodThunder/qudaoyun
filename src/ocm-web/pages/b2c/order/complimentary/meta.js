define(["ocm_global"], function() {
  //订单列表
  window.orderMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.OrderDto"
    },
    meta: {
      id: {
        type: 'string'
      }, //id
      dr: {
        type: 'integer'
      }, //dr
      ts: {
        type: 'datetime'
      }, //ts
      creator: {
        type: 'string'
      },
      creationTime: {
        type: 'datetime'
      },
      modifier: {
        type: 'string'
      },
      modifiedTime: {
        type: 'datetime'
      },
      code: {
        type: 'string',
        required: true
      }, //电商订单号
      pcode: {
        type: 'string',
        required: true
      }, //平台订单号
      orderSource: {
        type: 'string',
        required: true
      }, //订单来源
      orderType: {
        type: 'string',
        required: true
      }, //订单类型
      deliveryWarning: {
        type: 'string'
      },
      auditWarning: {
        type: 'string'
      },
      platformId: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['b2cplatform']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
      }, //平台ID
      platformName: {
        type: 'string'
      }, //平台名称
      storeId: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
      }, //店铺ID
      storeName: {
        type: 'string'
      }, //店铺名称
      buyer: {
        type: 'string'
      }, //顾客
      bookTime: {
        type: 'datetime'
      }, //下单时间
      payTime: {
        type: 'datetime'
      }, //付款时间
      deliveryTime: {
        type: 'datetime'
      }, //要求送货时间
      logisticsMode: {
        type: 'string'
      }, //物流方式
      serviceMode: {
        type: 'string'
      }, //配送方式
      supplierId: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['b2csupplier']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
      }, //供应商ID
      supplierName: {
        type: 'string'
      }, //供应商名称
      belongOffice: {
        type: 'string'
      }, //办事处参照
      belongOfficeName: {
        type: 'string'
      }, //办事处
      serviceProvider: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['customers']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}',
        "refparam": '{"EQ_isServiceProvider":"1","EQ_isEnable":"1"}'
      }, //服务商ID
      serviceProviderName: {
        type: 'string'
      }, //服务商名称
      serviceProviderType: {
        type: 'string'
      }, //服务商类型
      payMode: {
        type: 'string'
      }, //支付方式
      billStatus: {
        type: 'string'
      }, //订单状态
      sendStatus: {
        type: 'string'
      }, //发货状态
      payStatus: {
        type: 'string'
      }, //付款状态
      returnGoodsStatus: {
        type: 'string'
      }, //关闭状态
      returnFeeStatus: {
        type: 'string'
      }, //退款状态
      payCheckStatus: {
        type: 'string'
      }, //收款确认状态
      isLock: {
        type: 'integer'
      }, //冻结标识
      receipt: {
        type: 'string'
      }, //配送回执
      receiptStatus: {
        type: 'string'
      }, //配送回执确认状态
      isAddPromotion: {
        type: 'integer'
      }, //已自动添加优惠
      isException: {
        type: 'integer'
      }, //异常标识
      exceptionType: {
        type: 'string'
      }, //异常原因
      isUrgent: {
        type: 'integer'
      }, //加急标识
      isPromo: {
        type: 'integer'
      }, //已促销
      buyerMsg: {
        type: 'string'
      }, //买家留言
      sellerRemark: {
        type: 'string'
      }, //卖家备注
      isSynDispStatus: {
        type: 'integer'
      }, //是否需要同步发货状态
      issynsuccess: {
        type: 'integer'
      }, //发货状态同步标识
      synmsg: {
        type: 'string'
      }, //发货状态同步异常信息
      isSplitDispatch: {
        type: 'integer'
      }, //是否允许拆单发货
      totalNum: {
        type: 'float'
      }, //总数量
      totalFee: {
        type: 'float'
      }, //总金额
      freight: {
        type: 'float'
      }, //运费
      rOrderPcode: {
        type: 'string'
      }, //关联订单号
      rOrderId: {
        type: 'string'
      }, //关联订单主键
      freightOrderFee: {
        type: 'float'
      }, //关联运费
      pOrderId: {
        type: 'string'
      }, //主订单主键
      pOrderCode: {
        type: 'string'
      }, //主订单号
      pkOrgId: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"商品列表"}'
      }, //组织主键
      pkOrgCode: {
        type: 'string'
      }, //组织编码
      pkOrgName: {
        type: 'string'
      }, //组织名称
      orderReceiverId: {
        type: 'string'
      }, //
      orderReceiverName: {
        type: 'string'
      }, //收货人姓名
      orderReceiverPhone: {
        type: 'string'
      }, //联系手机
      orderReceiverTel: {
        type: 'string'
      }, //联系电话
      orderReceiverProvince: { //注册所在省份ID
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['region']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
        "refparam": '{"EQ_areaLevel":"2"}'
      },
      orderReceiverProvinceName: {
        type: 'string'
      }, //
      orderReceiverCity: { //注册所在城市ID
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['region']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
        "refparam": '{"EQ_areaLevel":"3"}'
      },
      orderReceiverCityName: {
        type: 'string'
      }, //
      orderReceiverDistrict: { //注册所在县ID
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['region']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
        "refparam": '{"EQ_areaLevel":"4"}'
      },
      orderReceiverDistrictName: {
        type: 'string'
      }, //
      orderReceiverTown: { //注册所在街道/镇Id
        type: 'string',
        "refmodel": JSON.stringify(refinfo['region']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
        "refparam": '{"EQ_areaLevel":"5"}'
      },
      orderReceiverTownName: {
        type: 'string'
      }, //
      orderReceiverZipCode: {
        type: 'string'
      }, //
      orderReceiverAddress: {
        type: 'string'
      }, //收货地址
      shiptopartyId: {
        type: 'string'
      }, //送达方
      lockReason: {
        type: 'string'
      }, //冻结原因
      platformBillStatus: {
        type: 'string'
      }, //平台订单状态
      customerId: {
        type: 'string'
      }, //服务商对应的客户ID
      dispatchCode: {
        type: 'string'
      }, //配送任务单编号
      dispatchId: {
        type: 'string'
      }, //配送任务单ID
      isChange: {
        type: 'string'
      }, //是否变更
      isCreateDispatch: {
        type: 'string'
      }, //是否生成配送任务单
      isCreatePurchase: {
        type: 'string'
      }, //是否生成采购订单
      isReturn: {
        type: 'string'
      }, //是否退货

      orderInvoiceAccount: {
        type: 'string'
      }, //
      orderInvoiceAddress: {
        type: 'string'
      }, //
      orderInvoiceBank: {
        type: 'string'
      }, //
      orderInvoiceId: {
        type: 'string'
      }, //
      orderInvoiceIsDraw: {
        type: 'string'
      }, //
      orderInvoiceRegphone: {
        type: 'string'
      }, //
      orderInvoiceSubject: {
        type: 'string'
      }, //
      orderInvoiceTaxId: {
        type: 'string'
      }, //
      orderInvoiceTitle: {
        type: 'string'
      }, //
      orderInvoiceType: {
        type: 'string'
      }, //

      porderCode: {
        type: 'string'
      }, //
      porderId: {
        type: 'string'
      }, //
      purchaseCode: {
        type: 'string'
      }, //
      purchaseId: {
        type: 'string'
      }, //
      promStatus: {
        type: 'integer'
      }, //活动作废
      logisticsCode: {
        type: "string"
      }, //快递公司编码
      logisticsName: {
        type: 'string'
      }, //快递公司
      waybillNo: {
        type: 'string',
        maxLength: 30
      }, //快递单号
      logisticsInfo: {
        type: 'string',
        maxLength: 200
      }, //快递其他信息
      auditTime: {
        type: 'datetime'
      }, //审核时间
      totalReceivableFee: {
        type: 'float'
      }, //总成交金额
      totalSettlementFee: {
        type: 'float'
      }, //总结算金额
      totalClosedFee: {
        type: 'float'
      }, //总关闭金额
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
  }

  //商品信息
  window.goodsMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.OrderGoodsDto"
    },
    meta: {
      id: {
        type: "string"
      }, //
      dr: {
        type: 'integer'
      }, //dr
      ts: {
        type: 'datetime'
      }, //ts
      creator: {
        type: 'string'
      },
      creationTime: {
        type: 'datetime'
      },
      modifier: {
        type: 'string'
      },
      modifiedTime: {
        type: 'datetime'
      },
      skuCode: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['b2cGoodsRef']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
      }, //商品编码
      skuName: {
        type: "string"
      }, //商品名称
      buyNum: {
        type: "float",
        regExp: /^\d+$/
      }, //购买数量
      sendNum: {
        type: "float"
      }, //发货数量
      returnNum: {
        type: "float"
      }, // 退货数量
      closeNum: {
        type: "float"
      }, // 关闭数量
      price: {
        type: "float"
      }, //单价
      discountFee: {
        type: "float"
      }, //商品优惠
      returnFeeStatus: {
        type: "string"
      }, //退款状态
      totalPrice: {
        type: "float"
      }, //总价
      discountFee: {
        type: "float"
      }, //优惠金额
      receivableFee: {
        type: "float"
      }, //应收金额
      settlementFee: {
        type: "float"
      }, //结算金额
      closedFee: {
        type: "float"
      }, //关闭金额
      returnFee: {
        type: "float"
      }, //退款金额
      remark: {
        type: "string"
      }, //备注
      isOwn: {
        type: "string"
      }, //是否欠件
      isGift: {
        type: "integer"
      }, //是否赠品
      adjustFee: {
        type: "integer"
      }, //手工调整金额
      color: {
        type: 'string'
      }, //商品颜色
      giftSource: {
        type: 'string'
      }, //赠品来源
      goodsCategory: {
        type: 'string'
      }, //商品类别
      goodsId: {
        type: 'string'
      }, //商品
      goodsSource: {
        type: 'string'
      }, //商品来源
      isTrade: {
        type: 'string'
      }, //是否换购
      isVir: {
        type: 'string'
      }, //虚拟商品
      limitPrice: {
        type: 'string'
      }, //最低零售价
      logisticsMode: {
        type: 'string'
      }, //物流方式
      model: {
        type: 'string'
      }, //
      orderBillStatus: {
        type: 'string'
      }, //
      orderBuyer: {
        type: 'string'
      }, //
      orderCode: {
        type: 'string'
      }, //
      orderId: {
        type: 'string'
      }, //
      orderPcode: {
        type: 'string'
      }, //
      porderCode: {
        type: 'string'
      }, //
      porderGoodsId: {
        type: 'string'
      }, //
      porderGoodsSerialnum: {
        type: 'string'
      }, //
      porderId: {
        type: 'string'
      }, //
      returnGoodsStatus: {
        type: 'string'
      }, //关闭状态
      rowNum: {
        type: 'string'
      }, //
      sendStatus: {
        type: 'string'
      }, //
      serialnum: {
        type: 'string'
      }, //
      sosonid: {
        type: 'string'
      }, //
      applyNum: {
        type: "string"
      }, //申请退款数量
      applyFee: {
        type: "integer"
      }, //申请退款金额
    }
  }

  //促销信息
  window.promMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.OrderPromotionDto"
    },
    meta: {
      id: {
        type: "string"
      }, //
      orderId: {
        type: "string"
      }, //订单主键
      promotionSource: {
        type: "string"
      }, //优惠类型
      promotionName: {
        type: "string"
      }, //优惠方案名称
      promotionId: {
        type: "string"
      }, //促销活动ID
      promotionModeId: {
        type: "string"
      }, // 促销方式ID
      promEndTime: {
        type: "datetime"
      }, //活动结束时间
    }
  }

  //关联订单信息
  window.linkMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.OrderLinkDto"
    },
    meta: {
      id: {
        type: "string"
      }, //
      code: {
        type: "string"
      }, //电商订单号
      pcode: {
        type: "string"
      }, //平台订单号
      orderType: {
        type: "string"
      }, //订单类型
      buyer: {
        type: "string"
      }, //顾客ID
      receivableFee: {
        type: "float"
      }, // 成交金额
      linkFee: {
        type: "float"
      }, //关联金额
      platformName: {
        type: "string"
      }, //平台
      billStatus: {
        type: "string"
      }, //状态
    }
  }

  //产品信息
  window.productMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.OrderProductDto"
    },
    meta: {
      id: {
        type: "string"
      }, //
      skuCode: {
        type: "string"
      }, //商品编码
      productCode: {
        type: "string"
      }, //产品编码
      productName: {
        type: "string"
      }, //产品名称
      buyNum: {
        type: "float"
      }, //购买数量
      soNum: {
        type: "float"
      }, //开单数量
      soDistNum: {
        type: "float"
      }, // 配车数量
      soSendNum: {
        type: "float"
      }, //发货数量
      storePlanNum: {
        type: "float"
      }, //排工数量
      storeSendNum: {
        type: "float"
      }, //出库数量
      storeFinishNum: {
        type: "float"
      }, //完工数量
      returnNum: {
        type: "float"
      }, //退货数量
      closeNum: {
        type: "float"
      }, // 关闭数量
      poBillNo: {
        type: "string"
      }, //采购订单号
      soBillNo: {
        type: "string"
      }, //销售订单号
      isOwn: {
        type: "string"
      }, //是否欠件
    }
  }

  //操作日志
  window.logMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.OrderLogDto"
    },
    meta: {
      id: {
        type: "string"
      }, //
      operator: {
        type: "string"
      }, //操作人
      operationTime: {
        type: "datetime"
      }, //操作时间
      operationType: {
        type: "string"
      }, //操作类型
      operateContent: {
        type: "string"
      }, //操作内容
    },
    pageSize: 10,
  }

  //赠品
  window.complimentary = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.GoodsDto"
    },
    meta: {
      code: {
        type: "string"
      },
      name: {
        type: "string"
      },
      logisticsMode: {
        type: "string"
      },
      isSale: {
        type: "string"
      },
    },
    pageSize: 5,
  }

  //add赠品
  window.addComplimentary = {
      params: {
        "cls": "com.yonyou.ocm.b2c.service.dto.OrderGoodsDto"
      },
      meta: {
        id: {
          type: "string"
        },
        code: {
          type: "string"
        }, //商品编码
        name: {
          type: "string"
        }, //商品名称
        logisticsMode: {
          type: "string"
        }, //物流方式
        buyNum: {
          type: "string",
          default: 1,
          regExp: /^\d+$/,
          errorMsg: '数量输入不正确'
        }, //购买数量
        settlementFee: {
          type: "float",
          default: "0",
          regExp: /^\d+$/,
          errorMsg: '金额输入不正确'
        }, //结算金额
        isGift: {
          type: "integer",
          default: 1
        }, //是否赠品


      },
      pageSize: 5,
    },

    //订单备注
    window.remarkMeta = {
      meta: {
        id: {
          type: 'string'
        }, //id
        dr: {
          type: 'integer'
        }, //dr
        ts: {
          type: 'datetime'
        }, //ts
        creator: {
          type: 'string'
        },
        creationTime: {
          type: 'datetime'
        },
        modifier: {
          type: 'string'
        },
        modifiedTime: {
          type: 'datetime'
        },
        commentTypes: {
          type: 'string'
        },
        commentInfo: {
          type: 'string'
        },
        commentCategory: {
          type: 'string'
        },
      }
    }


})