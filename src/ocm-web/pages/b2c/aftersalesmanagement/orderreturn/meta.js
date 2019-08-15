define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      //订单列表
      orderMeta: {
        params: {
          "cls": "com.yonyou.ocm.b2c.service.dto.OrderDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //id
          orderIds: {
            type: 'string'
          },
          servicemodel: {
            type: 'string'
          },
          deliveredTogether: {
            type: 'string'
          },
          orderSignColor: {
            type: 'string'
          },
          dr: {
            type: 'integer'
          }, //dr
          ts: {
            type: 'datetime'
          }, //ts
          fiAuditStatus: {
            type: 'integer'
          },
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
          }, //电商订单号
          pcode: {
            type: 'string',
          }, //平台订单号
          orderSource: {
            type: 'string',
          }, //订单来源
          orderType: {
            type: 'string',
          }, //订单类型
          paid: {
            type: 'integer'
          }, //是否已打款
          auditTime: {
            type: 'date'
          }, //审核时间
          platformId: {
            type: "string",
            "refmodel": JSON.stringify(refinfo['b2cplatform']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
          }, //平台ID
          platformName: {
            type: 'string'
          }, //平台名称
          storeId: {
            type: "string",
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
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"2"}'
          },
          orderReceiverProvinceName: {
            type: 'string'
          }, //
          orderReceiverCity: { //注册所在城市ID
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"3"}'
          },
          orderReceiverCityName: {
            type: 'string'
          }, //
          orderReceiverDistrict: { //注册所在县ID
            type: 'string',
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
          totalReceivableFee: {
            type: 'float'
          }, //总成交金额
          totalSettlementFee: {
            type: 'float'
          }, //总结算金额
          totalClosedFee: {
            type: 'float'
          }, //总关闭金额
          isDelay: {
            type: "string"
          }, //延期发货标识
          delayTimes: {
            type: "integer"
          }, //延期次数
          delayDays: {
            type: "integer"
          }, //延期总天数
          isReturn: {
            type: "integer"
          }
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      //订单详情
      orderDetailMeta: {
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
          auditTime: {
            type: 'datetime'
          }, //审核时间
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
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['organization_auth_b2c']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"refName":"办事处"}',
          }, //办事处参照
          belongOfficeName: {
            type: 'string',
          }, //办事处名称
          serviceProviderId: {
            type: "string",
            "refmodel": JSON.stringify(refinfo['B2CfourdDList']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
          }, //服务商ID
          serviceProviderName: {
            type: 'string'
          }, //服务商名称
          shiptopartyId: {
            type: "string",
            "refmodel": JSON.stringify(refinfo['channelCusStores']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"送达方","strFieldCode": ["refcode", "refname"],"strFieldName": ["编码", "名称"]}',
            "refparam": '{"EQ_isEnable":"1"}'
          }, //送达方参照
          shiptopartyName: {
            type: 'string'
          }, //送达方名称
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
          promStatus: {
            type: 'integer'
          }, //活动作废
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
          orderReceiverName: {
            type: 'string',
            required: true,
            maxLength: 10
          }, //收货人姓名
          orderReceiverPhone: {
            type: 'string',
            required: true,
            validType: "phone",
          }, //联系手机
          orderReceiverTel: {
            type: 'string',
            maxLength: 30
          }, //联系电话
          //			orderReceiverProvince: {
          //				type: 'string'
          //			}, //省
          //			orderReceiverCity: {
          //				type: 'string'
          //			}, //市
          //			orderReceiverDistrict: {
          //				type: 'string'
          //			}, //区
          //			orderReceiverTown: {
          //				type: 'string'
          //			}, //街道
          orderReceiverAddress: {
            type: 'string',
            required: true,
            maxLength: 100
          }, //收货地址
          orderReceiverProvince: { //注册所在省份ID
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"1"}'
          },
          orderReceiverCity: { //注册所在城市ID
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"2"}'
          },
          orderReceiverDistrict: { //注册所在县ID
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"3"}'
          },
          orderReceiverTown: { //注册所在街道/镇Id
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"4"}'
          },
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
          totalReceivableFee: {
            type: 'float'
          }, //总成交金额
          totalSettlementFee: {
            type: 'float'
          }, //总结算金额
          totalClosedFee: {
            type: 'float'
          }, //总关闭金额
          isDelay: {
            type: "string"
          }, //延期发货标识
          delayTimes: {
            type: "integer"
          }, //延期次数
          delayDays: {
            type: "integer"
          }, //延期总天数
        }
      },
      //商品信息
      goodsMeta: {
        params: {
          "cls": "com.yonyou.ocm.b2c.service.dto.OrderGoodsDto"
        },
        meta: {
          id: {
            type: "string"
          }, //
          serialnum: {
            type: "string"
          }, //行号
          goodsSource: {
            type: "string"
          }, //商品来源
          goodsId: {
            type: "string"
          }, //商品
          sosonid: {
            type: "string"
          }, //平台子订单号
          goodsCategory: {
            type: "string"
          }, //商品类别
          logisticsMode: {
            type: "string"
          }, //物流方式
          isVir: {
            type: "string",
            default: '1'
          }, //虚拟商品
          isCombine: {
            type: "integer"
          }, //是否组合
          adjustFee: {
            type: "float"
          }, //手工调整金额
          receivableFee: {
            type: "float"
          }, // 应收金额
          closedFee: {
            type: "float"
          }, // 关闭金额
          limitPrice: {
            type: "float"
          }, // 最低零售价
          costPrice: {
            type: "float"
          }, // 成本价
          giftSource: {
            type: "string"
          }, //赠品来源
          combineGoodsId: {
            type: "string"
          }, //商品主键
          combineGoodsCode: {
            type: "string"
          }, //商品编码
          combineGoodsName: {
            type: "string"
          }, //商品名称
          combineGoodsNum: {
            type: "string"
          }, //商品数量
          goodsNumRate: {
            type: "string"
          }, //商品数量比
          warehouseId: {
            "refmodel": JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
            "refparam": '{"EQ_isEnable":"1"}'
          }, //仓库
          warehouseCode: {
            type: "string"
          }, //仓库编码
          warehouseName: {
            type: "string"
          }, //仓库名称
          takeUpNumber: {
            type: 'BigDecimal'
          }, //预占数量
          takeUpStatus: {
            type: 'integer'
          }, //预占状态
          takeUpDate: {
            type: 'datetime'
          }, //预占时间
          customerId: {
            "refmodel": JSON.stringify(refinfo['customer']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"经销商"}',
            "refparam": '{"EQ_isEnable":"1"}'
          }, //经销商ID
          customerName: {
            type: "string"
          }, //经销商名称
          downStreamOrderCode: {
            type: "string"
          }, //下游单据号
          isPushDownStreamOrder: {
            type: "integer"
          }, //已推送下游订单
          supplierId: {
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}',
            "refparam": '{"EQ_isEnable":"1"}'
          }, //供应商ID
          supplierCode: {
            type: "string"
          }, //供应商编码
          supplierName: {
            type: "string"
          }, //供应商名称
          deliveredTogether: {
            type: "string"
          }, //合并发单流水号
          deliveredTogetherStatus: {
            type: "string"
          }, //合并发货状态
          returnNum: {
            type: "string"
          }, //退货数量
          skuCode: {
            type: "string",
            required: true,
            "refmodel": JSON.stringify(refinfo['goods-no-version']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"商品"}'
          }, //商品编码
          skuName: {
            type: "string"
          }, //商品名称
          buyNum: {
            type: "float"
          }, //购买数量
          sendNum: {
            type: "float"
          }, //发货数量
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
          settlementFee: {
            type: "float"
          }, //结算金额
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
          applyNum: {
            type: "string"
          }, //申请退款数量
          applyFee: {
            type: "integer"
          }, //申请退款金额
        }
      },
      //促销信息
      promMeta: {
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
      },
      //关联订单信息
      linkMeta: {
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
          }, //买家账户
          receivableFee: {
            type: "float"
          }, // 成交金额
          linkFee: {
            type: "float"
          }, //关联金额

        }
      },
      //关联运费
      freightMeta: {
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
          payTime: {
            type: "string"
          }, //付款时间
          billStatus: {
            type: "string"
          }, //订单状态
          orderType: {
            type: "string"
          }, //订单类型
          buyer: {
            type: 'string'
          }, //买家账户
          orderReceiverName: {
            type: "string",
            required: true
          }, //收货人
          freight: {
            type: "float"
          }, //运费
          totalReceivableFee: {
            type: "float"
          }, // 总金额
        }
      },
      // 退款方式
      returnpathMeta: {
        meta: {
          field1: {}
        }
      },
      //商品换购--弹出子表信息
      productBuyMete: {
        meta: {
          id: {
            type: "string"
          }, //
          orderCode: {
            type: "string"
          }, //电商订单号
          orderPcode: {
            type: "string"
          }, //平台订单号
          orderBillStatus: {
            type: "string"
          }, //订单状态
          goodsCategory: {
            type: "string"
          }, //订单类型
          orderBuyer: {
            type: 'string'
          }, //买家账户
          skuCode: {
            type: "string"
          }, //电商商品编码
          skuName: {
            type: "float"
          }, //电商商品名称
          buyNum: {
            type: "string",
            regExp: /^\d+$/
          }, // 购买数量
          // closeNum: {
          // type: "float"
          // }, // 关闭数量
          receivableFee: {
            type: "float"
          }, // 成交金额
          settlementFee: {
            type: "float"
          }, // 结算金额
          closedFee: {
            type: "float"
          }, // 关闭金额
          isTrade: {
            type: "float"
          }, // 换购商品
          num: {
            type: "string",
            regExp: /^\d+$/
          }, // 本次关联数量
          amount: {
            type: "float"
          }, // 本次关联金额
        }
      },
      //商品换购--商品
      productBuyChangeMete: {
        meta: {
          id: {
            type: "string"
          }, //
          goodsId: {
            'refmodel': JSON.stringify(refinfo['b2cGoodsRef']),
            'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":"true"}',
            "refparam": '{"EQ_pkEcGoodsCategory":"0"}'
          }, //电商商品编码
          skuCode: {
            type: "float"
          }, //电商商品编码
          skuName: {
            type: "float"
          }, //电商商品名称
          buyNum: {
            type: "float"
          }, // 购买数量
          receivableFee: {
            type: "float"
          }, // 成交金额
          settlementFee: {
            type: "float"
          }, // 结算金额
          closedFee: {
            type: "float"
          }, // 关闭金额
          // closeNum: {
          // type: "float"
          // }, // 关闭数量
        }
      },
      //商品升级--低升高
      upgradeHightMete: {
        meta: {
          id: {
            type: "string"
          }, //
          code: {
            type: "string"
          },
          orderCode: {
            type: "string"
          }, //电商订单号
          orderPcode: {
            type: "string"
          }, //平台订单号
          orderBillStatus: {
            type: "string"
          }, //订单状态
          goodsCategory: {
            type: "string"
          }, //订单类型
          orderBuyer: {
            type: 'string'
          }, //买家账户
          skuCode: {
            type: "string"
          }, //电商商品编码
          skuName: {
            type: "float"
          }, //电商商品名称
          buyNum: {
            type: "float"
          }, // 购买数量
          // closeNum: {
          // type: "float"
          // }, // 关闭数量
          receivableFee: {
            type: "float"
          }, // 成交金额
          settlementFee: {
            type: "float"
          }, // 结算金额
          closedFee: {
            type: "float"
          }, // 关闭金额
          isTrade: {
            type: "float"
          }, // 换购商品
          num: {
            type: "string",
            regExp: /^\d+$/
          }, // 本次关联数量
          amount: {
            type: "float"
          }, // 本次关联金额
          changeNum: {
            type: "string",
            regExp: /^\d+$/
          }, // 本次关联数量-商品变更
          changeAmount: {
            type: "float"
          }, // 本次关联金额-商品变更
          saleReturnNum: {
            type: "Integer"
          },
          saleReturnFee: {
            type: "float"
          }
        }
      },
      //商品升级--低升高-链接
      upgradeHightLinkMete: {
        meta: {
          id: {
            type: "string"
          }, //
          code: {
            type: 'string'
          },
          orderCode: {
            type: "string"
          }, //电商订单号
          orderPcode: {
            type: "string"
          }, //平台订单号
          orderBillStatus: {
            type: "string"
          }, //订单状态
          goodsCategory: {
            type: "string"
          }, //订单类型
          orderBuyer: {
            type: 'string'
          }, //买家账户
          skuCode: {
            type: "string"
          }, //电商商品编码
          skuName: {
            type: "float"
          }, //电商商品名称
          buyNum: {
            type: "float"
          }, // 购买数量
          // closeNum: {
          // type: "float"
          // }, // 关闭数量
          receivableFee: {
            type: "float"
          }, // 成交金额
          settlementFee: {
            type: "float"
          }, // 结算金额
          closedFee: {
            type: "float"
          }, // 关闭金额
          isTrade: {
            type: "float"
          }, // 换购商品
          num: {
            type: "string",
            regExp: /^\d+$/
          }, // 本次关联数量
          amount: {
            type: "float"
          }, // 本次关联金额
          changeNum: {
            type: "string",
            regExp: /^\d+$/
          }, // 本次关联数量-商品变更
          changeAmount: {
            type: "float"
          }, // 本次关联金额-商品变更
        }
      },
      //商品升级--待选商品
      upgradeHightWaitMete: {
        meta: {
          id: {
            type: "string"
          }, //
          saleReturnNum: {
            type: "string",
            regExp: /^[1-9]\d*$/
          }, //售后退货数量
          saleReturnFee: {
            type: "string",
            regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
          }, //售后退货金额
          goodsId: {
            'refmodel': JSON.stringify(refinfo['b2cGoodsRef']),
            'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":"true"}',
            "refparam": '{"EQ_pkEcGoodsCategory":"0"}'
          }, //电商商品编码
          skuCode: {
            type: "string"
          }, //电商商品编码
          skuName: {
            type: "string"
          }, //电商商品名称
          buyNum: {
            type: "float",
            regExp: /^\d+$/,
            required: true
          }, // 购买数量
          receivableFee: {
            type: "float"
          }, // 成交金额
          settlementFee: {
            type: "float"
          }, // 结算金额
          closedFee: {
            type: "float"
          }, // 关闭金额
          // closeNum: {
          // type: "float"
          // }, // 关闭数量
          logisticsMode: {
            type: "string"
          } //物流方式
        }
      },
      //订单变更-订单信息
      orderInfoMeta: {
        meta: {
          id: {
            type: 'string'
          }, //id
          code: {
            type: 'string',
            required: true
          }, //电商订单号
          pcode: {
            type: 'string',
            required: true
          }, //平台订单号
          //			platformId: {
          //				type: "string",
          //				required: true,
          //				"refmodel": JSON.stringify(refinfo['b2cplatform']),
          //				"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
          //			}, //平台ID
          platformName: {
            type: 'string'
          }, //平台名称
          //			storeId: {
          //				type: "string",
          //				required: true,
          //				"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
          //				"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
          //			}, //店铺ID
          storeName: {
            type: 'string'
          }, //店铺名称
          buyer: {
            type: 'string'
          }, //买家账户
          orderReceiverName: {
            type: "string"
          }, //收货人
          orderReceiverPhone: {
            type: 'string'
          }, //收货人手机
          orderReceiverProvince: {
            type: 'string'
          }, //省
          orderReceiverCity: {
            type: 'string'
          }, //市
          orderReceiverDistrict: {
            type: 'string'
          }, //区
          orderReceiverTown: {
            type: 'string'
          }, //街道
          orderReceiverAddress: {
            type: 'string'
          }, //收货地址
          serviceMode: {
            type: 'string',
            required: true,
            default: 0
          }, //配送方式
          belongOffice: {
            type: 'string'
          }, //办事处
          serviceProviderName: {
            type: 'string'
          }, //服务商名称
          bookTime: {
            type: 'datetime'
          }, //下单时间
          payTime: {
            type: 'datetime'
          }, //付款时间
          deliveryTime: {
            type: 'datetime'
          }, //要求送货时间
          receivableFee: {
            type: "float"
          }, // 成交金额
          settlementFee: {
            type: "float"
          }, //结算金额
          payMode: {
            type: 'string'
          }, //支付方式
          billStatus: {
            type: 'string'
          }, //订单状态
          buyerMsg: {
            type: 'string'
          }, //买家留言
          orderSource: {
            type: 'string',
            required: true
          }, //订单来源
          orderType: {
            type: 'string',
            required: true
          }, //订单类型
          isException: {
            type: 'integer'
          }, //异常标识
          exceptionType: {
            type: 'string'
          }, //异常原因
          isLock: {
            type: 'integer'
          }, //冻结标识
          isUrgent: {
            type: 'integer',
            required: true
          }, //加急标识
          isSplitDispatch: {
            type: 'integer',
            required: true
          }, //是否允许拆单发货
          logisticsMode: {
            type: 'string'
          }, //物流方式
          sellerRemark: {
            type: 'string'
          }, //卖家备注
          isPromo: {
            type: 'integer'
          }, //已促销
          promStatus: {
            type: 'integer'
          }, //活动作废
        }
      },
      //订单变更-商品信息
      productInfoMeta: {
        meta: {
          id: {
            type: "string"
          }, //
          skuCode: {
            type: "string"
          }, //电商商品编码
          skuName: {
            type: "string"
          }, //电商商品名称
          buyNum: {
            type: "float"
          }, //购买数量
          soNum: {
            type: "float"
          }, //开单数量
          soDistNum: {
            type: "float"
          }, // 配车数量
          sendNum: {
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
          // closeNum: {
          // type: "float"
          // }, //关闭数量
          price: {
            type: "float"
          }, //单价
          discountFee: {
            type: "float"
          }, //商品优惠
          receivableFee: {
            type: "float"
          }, // 成交金额
          settlementFee: {
            type: "float"
          }, //结算金额
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
          returnFeeStatus: {
            type: "string"
          }, //退款状态
        }
      },
      //操作日志
      logMeta: {
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
      },
      //延期发货
      delayShipMeta: {
        meta: {
          days: {
            type: "integer"
          },
          errIds: {
            type: "string"
          }
        }
      },
      //订单备注
      remarkMeta: {
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
      },
      //订单跟踪 
      orderTracMeta: {
        params: {
          "cls": "com.yonyou.ocm.b2c.service.dto.OrderProductDto"
        },
        meta: {
          id: {
            type: "string"
          },
          dr: {
            type: "string"
          },
          ts: {
            type: "string"
          },
          creator: {
            type: "string"
          },
          creationTime: {
            type: "datetime"
          },
          modifier: {
            type: "string"
          },
          modifiedTime: {
            type: "datetime"
          },
          persistStatus: {
            type: "string"
          },
          orderId: {
            type: "string"
          },
          node: {
            type: "string"
          }, //步骤
          content: {
            type: "string"
          }, //内容
          operateTime: {
            type: "datetime"
          } //时间
        }
      },
      changedLogisticsRef: {
        meta: {
          changedlogisticsref: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['logistics-company']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
          },

        }
      },
      // 分拨2   物流方式为经销商
      // <div u-meta='{"id":"customersub","data":"productAllList","type":"grid","editable":true,"multiSelect":"false","showNumCol":true}'>
      // <div options='{"field":"productCode","dataType":"String","title":"产品编码","editable":false}'></div>
      // 			<div options='{"field":"productName","dataType":"String","title":"产品名称","editable":false}'></div>
      // 			<div options='{"field":"buyNum","dataType":"Float","title":"购买数量","editable":false}'></div>
      // 			<div options='{"field":"closeNum","dataType":"Float","title":"关闭数量","editable":false}'></div>
      // 			<div options='{"field":"customerId","dataType":"String","title":"经销商","width":180,
      // 				"renderType":"ncReferRender","editType":"ncReferEditType","showField":"customerName","editOptions":{"validType":"string",
      // 				"rel":{"refname":"customerName"}}}'></div>
      // 分拨3 物流方式为供应商 
      // <div u-meta='{"id":"supplier-sub","data":"productAllList","type":"grid","editable":true,"multiSelect":"false","showNumCol":true}'>
      // <div options='{"field":"productCode","dataType":"String","title":"产品编码","editable":false}'></div>
      // 			<div options='{"field":"productName","dataType":"String","title":"产品名称","editable":false}'></div>
      // 			<div options='{"field":"buyNum","dataType":"Float","title":"购买数量","editable":false}'></div>
      // 			<div options='{"field":"closeNum","dataType":"Float","title":"关闭数量","editable":false}'></div>
      // 			<div options='{"field":"supplierId","dataType":"String","title":"供应商","width":180,
      // 				"renderType":"ncReferRender","editType":"ncReferEditType","showField":"supplierName","editOptions":{"validType":"string",
      // 				"rel":{"refname":"supplierName"}}}'></div>

      mysupplierData: {
        meta: {
          mysupplierData: {
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}',
            "refparam": '{"EQ_isEnable":"1"}'
          }
        }
      },

      // 分拨4 快递配送的物流方式，分配仓库
      // <div options='{"field":"warehouseId","dataType":"String","title":"仓库","width":180,
      // 			"renderType":"ncReferRender","editType":"ncReferEditType","showField":"warehouseName","editOptions":{"validType":"string",
      // 			"rel":{"refname":"仓库"}}}'></div>
      // 		<div options='{"field":"takeUpNumber","dataType":"Float","title":"预占数量","editable":false}'></div>
      // 		<div options='{"field":"takeUpStatus","dataType":"Float","title":"预占状态","editable":false,"editOptions":{"type":"combo","datasource":"preemptedStatusSrc"},"renderType":"comboRender"}'></div>
      // 		<div options='{"field":"takeUpDate","dataType":"Datetime","title":"预占时间","editable":false}'></div>

      orderGoods4WarehouseInput: {
        meta: {
          id: {
            type: 'string'
          },
          orderGoodsId: {
            type: 'string'
          },
          productCode: {
            type: 'string' //产品编码
          },
          productName: {
            type: 'string' //产品名称
          },
          buyNum: {
            type: 'float' //购买数量
          },
          closeNum: {
            type: 'float' //关闭数量
          },
          warehouseId: {
            type: 'string', //仓库
            "refmodel": JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          returnWarehouseId: {
            type: 'string', //仓库
            "refmodel": JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          warehouserCode: {
            type: 'string'
          },
          warehouseName: {
            type: 'string'
          },
          returnWarehouseCode: {
            type: 'string'
          },
          returnWarehouseName: {
            type: 'string'
          },

        }
      },
      firejectMeta: {
        meta: {
          firejectReason: {
            type: 'string'
          }
        }
      }


    },
    searchs: {
      search1: [{
          type: "text",
          key: "code",
          label: "电商订单号" //电商订单号,退货申请单号
        }, {
          type: "text",
          key: "pcode",
          label: "平台单号" //平台退货单号,平台单号
        }, {
          type: "refer",
          key: "platform--id",
          label: "三方平台",
          refinfo: "b2cplatform",
          refName: "所属平台",
          multi: true,
          opr: 'IN'
        }, {
          type: "text",
          key: "store--name",
          label: "店铺名称"
        }
        // , {
        // 	type: "text",
        // 	key: "pcode",
        // 	label: "电商单号"
        // }
        , {
          type: "text",
          key: "returnWarehouse",
          label: "退返仓库"
        }, {
          type: "checkboxlist",
          key: "sendStatus",
          label: "退货状态",
          dataSource: [{
            value: '',
            name: '全部'
          }, {
            value: '0',
            name: '未退货'
          }, {
            value: '1',
            name: '部分退货'
          }, {
            value: '2',
            name: '全部退货'
          }, {
            value: '3',
            name: '不需要退货'
          }, {
            value: '4',
            name: '已取消退货',
          }]
        }, {
          type: "checkboxlist",
          key: "billStatus",
          label: "处理状态",
          dataSource: [{
            value: '01',
            name: '暂存'
          }, {
            value: '02',
            name: '未处理'
          }, {
            value: '03',
            name: '未审核'
          }, {
            value: '04',
            name: '已审核'
          }, {
            value: '05',
            name: '已财审'
          }, {
            value: '06',
            name: '退货发出'
          }, {
            value: '07',
            name: '已完成'
          }, {
            value: '08',
            name: '已关闭'
          }, {
            value: '09',
            name: '已拆分'
          }, {
            value: '10',
            name: '财审驳回'
          }],
          cls: "ui-checkboxes-item"
        }, {
          type: "checkboxlist",
          key: "refundType",
          label: "退款方式",
          dataSource: [{
            value: '',
            name: '全部'
          }, {
            value: '0',
            name: '原路退款'
          }, {
            value: '1',
            name: '其它方式退款'
          }],
          cls: "ui-checkboxes-item"
        }, {
          type: "checkboxlist",
          key: "logisticsMode",
          label: "物流方式",
          // url : '/occ-b2c' + '/b2c/enum-service/data?enumClassName=com.yonyou.ocm.b2c.enums.LogisticsModeEnum',
          dataSource: [{
            value: '',
            name: '全部'
          }, {
            value: '2',
            name: '快递配送'
          }, {
            value: '3',
            name: "服务商配送"
          }, {
            value: '4',
            name: "供应商直发"
          }, {
            value: '5',
            name: "经销商订单"
          }],
          cls: "ui-checkboxes-item"
        }, {
          type: "checkboxlist",
          key: "returnType",
          label: "退货类型",
          dataSource: [{
            value: '',
            name: '全部'
          }, {
            value: '-1',
            name: '取消退货'
          }, {
            value: '0',
            name: '仅退款'
          }, {
            value: '1',
            name: '退货退款'
          }, {
            value: 2,
            name: '换货'
          }],
          cls: "ui-checkboxes-item"
        }, {
          type: "text",
          key: "logisticsName",
          label: "快递公司名称"
        }, {
          type: "text",
          key: "waybillNo",
          label: "快递单号"
        }, {
          type: "text",
          key: "buyer",
          label: "买家账户"
        }, {
          type: "text",
          key: "orderReceiver--receiver",
          label: "收货人"
        }, {
          type: "text",
          key: "orderReceiver--receiverPhone",
          label: "收货人手机"
        }, {
          type: "radio",
          key: "isLock",
          label: "冻结状态",
          dataSource: [{
            value: '',
            name: '全部'
          }, {
            value: '0',
            name: '否'
          }, {
            value: '1',
            name: '是'
          }]
        }
      ],
      search2: [{
        type: "refer",
        key: "agency--id",
        label: "办事处",
        refinfo: "organization_ocm",
        clientParam: {
          //          "EQ_isOffice": "1",
          "EQ_isEnable": "1"
        },
        domid: 'splitorderAgency',
        required: true
      }, {
        type: "refer",
        key: "serviceProvider--id",
        label: "客户",
        refinfo: "B2CfourdDList",
        multi: true,
        opr: 'IN'
      }, {
        type: "refer",
        key: "serviceProvider",
        label: "服务商",
        refinfo: "customers",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_isServiceProvider": "1"
        },
        domid: 'splitorderServiceProvider',
        referId: "SplitorderServiceProviderId",
        required: true
      }, ],
    },

    buttons: {
      button1: [{
          key: "audit",
          label: "审核",
          iconCls: "icon-tubiao-shenhe",
          click: "auditHandle"
        }, {
          key: "fiaudit",
          label: "财审",
          iconCls: "icon-tubiao-shenhe",
          click: "fiauditHandler"
        }, {
          key: "fireject",
          label: "财审驳回",
          iconCls: "icon-tubiao-shenhe",
          click: "firejectHandler"
        }, {
          key: "returnpath",
          label: "退款方式",
          iconCls: "icon-edit",
          click: "returnpath"
        }, {
          key: "transinfo",
          label: "填写物流信息",
          iconCls: "icon-tubiao-huangou",
          click: "assignTransCom"
        },
        //     {
        //   key: "interceptbill",
        //   label: "截单",
        //   iconCls: "icon-tubiao-guanlian",
        //   click: "interceptbillHandler"
        // },
        {
          key: "returnnumedit",
          label: "退货数量编辑",
          iconCls: "icon-edit",
          click: "partRefundCancelFun"
        }, {
          key: "cancelreturn",
          label: "取消退货",
          iconCls: "iicon-tubiao-shenhe",
          click: "allRefundCancelFun"
        }, {
          key: "confirmrefund",
          label: "确认退款",
          iconCls: "icon-tubiao-riqi",
          click: "confirmrefundHandler"
        }, {
          key: "returnsplit",
          label: "退货分拨",
          iconCls: "icon-tubiao-guanbi-xianxing",
          click: "returnsplitHandler"
        }, {
          key: "servicemodel",
          label: "配送方式",
          click: "servicemodel"
        }, {
          key: "import",
          label: "导入",
          iconCls: "icon-import",
          click: "importHandle"
        }, {
          key: "export",
          label: "导出",
          iconCls: "icon-export",
          click: "exportHandle"
        },
      ],

    },
    cards: {
      card1: [{
        type: "text",
        key: "code",
        label: "电商订单号",
        readonly: true
      }, {
        type: "text",
        key: "storeName",
        label: "店铺名称",
      }, {
        type: "text",
        key: "buyer",
        label: "买家账户"
      }, {
        type: "text",
        key: "orderReceiverName",
        label: "收货人",
      }, {
        type: "text",
        key: "orderReceiverPhone",
        label: "收货人手机",
      }, {
        type: "text",
        key: "orderReceiverTel",
        label: "收货人电话"
      }, {
        type: "refer",
        key: "orderReceiverProvince",
        label: "收货省",
        refinfo: "region",
        refName: "地区",
        multi: false,
        opr: 'IN'
      }, {
        type: "refer",
        key: "orderReceiverCity",
        label: "收货市",
        refinfo: "region",
        refName: "地区",
        multi: false,
        opr: 'IN'
      }, {
        type: "refer",
        key: "orderReceiverDistrict",
        label: "收货区（县）",
        refinfo: "region",
        refName: "地区",
        multi: false,
        opr: 'IN'
      }, {
        type: "refer",
        key: "orderReceiverTown",
        label: "收货镇（街）",
        refinfo: "region",
        refName: "地区",
        multi: false,
        opr: 'IN'
      }, {
        type: "text",
        key: "orderReceiverAddress",
        label: "收货详细地址",
      }, {
        type: "combo",
        key: "serviceMode",
        label: "配送方式",
        dataSource: [{
          value: "0",
          name: "送装"
        }, {
          value: "1",
          name: "自提"
        }],
        namefield: "name",
        valuefield: "id",
        hasAll: true
      }, {
        type: "refer",
        key: "belongOffice",
        label: "组织",
        refinfo: "organization_auth_b2c",
        refName: "组织",
        multi: false,
        opr: 'IN'
      }, {
        type: "daterange",
        key: "deliveryTime",
        label: "要求送货时间"
      }, {
        type: "radio",
        key: "isSplitDispatch",
        label: "拆单发货",
        dataSource: [{
          value: '0',
          name: '否'
        }, {
          value: '1',
          name: '是'
        }]
      }, {
        type: "radio",
        key: "isUrgent",
        label: "加急",
        dataSource: [{
          value: '0',
          name: '否'
        }, {
          value: '1',
          name: '是'
        }]
      }],
      card2: [{
        type: "text",
        key: "logisticsName",
        label: "快递公司名称"
      }, {
        type: "text",
        key: "waybillNo",
        label: "快递单号"
      }]
    },
    details: {
      detail1: [{
          key: "code",
          label: "电商订单号",
        }, {
          key: "pcode",
          label: "平台单号",
        }, {
          key: "platformName",
          label: "平台名称"
        }, {
          key: "storeName",
          label: "店铺名称",
        }, {
          key: "buyer",
          label: "买家账户"
        }, {
          key: "orderReceiverName",
          label: "收货人",
        }, {
          key: "orderReceiverPhone",
          label: "收货人手机"
        }, {
          key: "orderReceiverTel",
          label: "收货人电话",
        }, {
          key: "orderReceiverProvinceName",
          label: "收货省"
        }, {
          key: "orderReceiverCityName",
          label: "收货市",
        }, {
          key: "orderReceiverDistrictName",
          label: "收货区"
        }, {
          key: "orderReceiverTownName",
          label: "收货街(道)",
        }, {
          key: "orderReceiverAddress",
          label: "收货详细地址",
          attr: {
            title: "orderReceiverAddress"
          }
        }, {
          key: "logisticsMode",
          label: "物流方式",
          computed: "logistics",
        }, {
          key: "logisticsCode",
          label: "快递公司编码"
        }, {
          key: "logisticsName",
          label: "快递公司名称",
        }, {
          key: "waybillNo",
          label: "快递单号"
        }, {
          key: "logisticsInfo",
          label: "快递其他信息",
          attr: {
            title: 'logisticsInfo'
          }
        }, {
          key: "serviceMode",
          label: "配送方式",
          computed: "deliveryModeList"
        }, {
          key: "belongOfficeName",
          label: "服务商所属组织",
        }, {
          key: "serviceProviderName",
          label: "服务商"
        }, {
          key: "bookTime",
          label: "下单时间",
        }, {
          key: "payTime",
          label: "付款时间"
        }, {
          key: "auditTime",
          label: "审核时间",
        }, {
          key: "deliverTime",
          label: "发货时间"
        }, {
          key: "deliveryTime",
          label: "要求送货时间",
        }, {
          key: "payMode",
          label: "支付方式"
        }, {
          key: "billStatus",
          label: "订单状态",
          computed: "orderStatusList"
        }, {
          key: "platformBillStatus",
          label: "平台状态",
          computed: "enableFmt"
        }, {
          key: "orderType",
          label: "订单类型",
          computed: "ordrTypeList"
        }, {
          key: "orderSource",
          label: "订单来源",
          computed: "orderSourceList"
        }
        // , {
        // 	key: "isException",
        // 	label: "异常标识",
        // 	computed: "exceptionStatusList"
        // }, {
        // 	key: "exceptionType",
        // 	label: "异常原因",
        // 	attr: {
        // 		title: "exceptionType"
        // 	}
        // }
        // , {
        // 	key: "isLock",
        // 	label: "冻结标识",
        // 	computed: "lockStatusList"
        // }, {
        // 	key: "lockReason",
        // 	label: "冻结原因",
        // 	attr: {
        // 		title: "lockReason"
        // 	}
        // }, {
        // 	key: "isSplitDispatch()",
        // 	label: "拆单发货",
        // }, {
        // 	key: "isUrgent()",
        // 	label: "加急"
        // }, {
        // 	key: "shiptopartyName",
        // 	label: "送达方名称",
        // }, {
        // 	key: "promStatus()",
        // 	label: "活动作废："
        // }
        , {
          key: "freightOrderFee",
          label: "关联运费",
        }, {
          key: "totalReceivableFee",
          label: "总成交金额"
        }, {
          key: "totalSettlementFee",
          label: "总结算金额",
        }, {
          key: "totalClosedFee",
          label: "总关闭金额"
        }, {
          key: "sendStatus",
          label: "发货状态：",
          computed: "sendStatusList"
        }, {
          key: "isDelay()",
          label: "延期发货标识"
        }, {
          key: "delayTimes",
          label: "延期发货次数",
        }, {
          key: "delayDays",
          label: "延期发货总天数"
        }, {
          key: "issynsuccess()",
          label: "发货状态同步标识",
        }, {
          key: "synmsg",
          label: "发货状态同步异常信息"
        }
      ]
    },
    dialogs: {
      dialog1: [{
        type: "combo",
        key: "servicemodel",
        label: "退货方式",
        dataSource: [{
          value: "0",
          name: "配送"
        }, {
          value: "1",
          name: "自提"
        }],
        required: true
      }, ]
    },
    grids: {
      grid1: {
        domid: "grid_PromoActivity_dom",
        umeta: {
          "id": "grid_PromoActivity",
          "data": "processOrderList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeClickFun": "detail",
          columnMenu: false,
        },
        columns: [{
            "field": "pcode",
            "dataType": "String",
            "title": "平台单号",
          }, {
            "field": "platformName",
            "dataType": "String",
            "title": "平台名称"
          }, {
            "field": "orderType",
            "dataType": "String",
            "title": "订单类型",
            "editOptions": {
              "type": "combo",
              "datasource": "orderTypeSrc"
            },
            "renderType": "comboRender"
          }, {
            "field": "billStatus",
            "dataType": "String",
            "title": "订单状态",
            "editOptions": {
              "type": "combo",
              "datasource": "orderStatusSrc"
            },
            "renderType": "comboRender"
          }, {
            "field": "isException",
            "dataType": "Integer",
            "title": "异常标识",
            "editOptions": {
              "type": "combo",
              "datasource": "exceptionStatusSrc"
            },
            "renderType": "comboRender"
          }, {
            "field": "exceptionType",
            "dataType": "String",
            "title": "异常原因"
          }, {
            "field": "code",
            "dataType": "String",
            "title": "电商订单号"
          }, {
            "field": "platformBillStatus",
            "dataType": "String",
            "title": "平台状态",
            "editOptions": {
              "type": "combo",
              "datasource": "OrderPlatformBillStatusSrc"
            },
            "renderType": "comboRender"
          }, {
            "field": "sendStatus",
            "dataType": "String",
            "title": "退货状态",
            "editOptions": {
              "type": "combo",
              "datasource": "returnFeeStatusSrc"
            },
            "renderType": "comboRender"
          }, {
            "field": "auditTime",
            "dataType": "Datetime",
            "title": "审核时间",
            "visible": false
          }, {
            "field": "orderType",
            "dataType": "String",
            "title": "发货时间",
            "visible": false
          }, {
            "field": "logisticsMode",
            "dataType": "String",
            "title": "物流方式",
            "editOptions": {
              "type": "combo",
              "datasource": "logisticsModeSrc"
            },
            "renderType": "comboRender"
          }, {
            "field": "paid",
            "dataType": "Integer",
            "title": "是否已打款",
            "renderType": "isPaid"
          }, {
            "field": "isLock",
            "dataType": "String",
            "title": "冻结标识",
            "renderType": "lockRender"
          }, {
            "field": "lockReason",
            "dataType": "String",
            "title": "冻结原因"
          }, {
            "field": "buyer",
            "dataType": "String",
            "title": "买家账户"
          }, {
            "field": "orderReceiverName",
            "dataType": "String",
            "title": "收货人",
          }, {
            "field": "orderReceiverPhone",
            "dataType": "String",
            "title": "收货人手机"
          }, {
            "field": "orderReceiverAddress",
            "dataType": "String",
            "title": "收货详细地址",
          }, {
            "field": "storeName",
            "dataType": "String",
            "title": "店铺名称",
          }, {
            "field": "bookTime",
            "dataType": "Datetime",
            "title": "下单时间",
          }, {
            "field": "payTime",
            "dataType": "Datetime",
            "title": "付款时间"
          }, {
            "field": "isUrgent",
            "dataType": "String",
            "title": "是否加急",
            "renderType": "urgentStatusGrid"
          }, {
            "field": "isSplitDispatch",
            "dataType": "String",
            "title": "是否拆单发货",
            "renderType": "splitStatusGrid"
          }, {
            "field": "creator",
            "dataType": "String",
            "title": "创建人",
            "visible": false
          }, {
            "field": "modifier",
            "dataType": "String",
            "title": "修改人",
            "visible": false
          }, {
            "field": "creationTime",
            "dataType": "Datetime",
            "title": "创建时间",
            "visible": false
          }, {
            "field": "modifiedTime",
            "dataType": "Integer",
            "title": "修改时间",
            "visible": false
          }, {
            "field": "operation",
            "dataType": "String",
            "title": "操作",
            "renderType": "operation",
            "fixed": true,
            "width": "100px",
            "visible": false
          }, {
            "field": 'logisticsName', //"changedLogisticsCompany",
            "dataType": "String",
            "title": "指定物流公司",
            "width": "180px"
          }, {
            "field": "waybillNo",
            "dataType": "String",
            "title": "快递单号",
            "visible": true
          },
          // {
          // "field": "returnOrderCode",
          // "dataType": "String",
          // "title": "退货订单号",
          // "width": "100px"
          // },
          {
            field: 'fiRejectComment',
            dataType: 'String',
            title: '财审驳回原因',
            visible: true,
          }
          // returnGoodsStatusList
          , {
            "field": "returnGoodsStatus",
            "dataType": "String",
            "title": "退货关闭状态",
            "width": "100px",
            "visible": false,
            "editOptions": {
              "type": "combo",
              "datasource": "returnGoodsStatusList"
            },
            "renderType": "comboRender"
          }
          // ,{
          // 	"field": "returnType",
          // 	"dataType": "Integer",
          // 	"title": "退货类型",
          // 	"width": "100px",
          // 	"visible": true,
          // 	"editOptions": {
          // 		"type": "combo",
          // 		"datasource": "returnTypeDataSource"
          // 	},
          // 	"renderType": "comboRender"
          // }
          // ,{
          // 	"field": "interceptStatus",
          // 	"dataType": "Integer",
          // 	"title": "截单状态",
          // 	"width": "100px",
          // 	"visible": true,
          // 	"editOptions": {
          // 		"type": "combo",
          // 		"datasource": "interceptStatusDataSource"
          // 	},
          // 	"renderType": "comboRender"
          // }
          , {
            "field": "refundType",
            "dataType": "Integer",
            "title": "退款方式",
            "width": "100px",
            "visible": true,
            "editOptions": {
              "type": "combo",
              "datasource": "returnpathDataSource"
            },
            "renderType": "comboRender"

          }

        ]
      },
      grid2: {
        domid: "grid_goods_dom",
        umeta: {
          "id": "grid_goods",
          "data": "goodsList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true,
          columnMenu: false,
        },
        columns: [{
            "field": "serialnum",
            "dataType": "String",
            "title": "行号",
            "width": "50px",
          }, {
            "field": "skuCode",
            "dataType": "String",
            "title": "商品编码",
            "renderType": "productRender"
          }, {
            "field": "skuName",
            "dataType": "String",
            "title": "商品名称",
          }, {
            "field": "buyNum",
            "dataType": "Float",
            "title": "申请退货数量",


            //				}, {
            //					"field": "adjustFee",
            //					"dataType": "Float",
            //					"title": "手工调整金额",
            //					"editType": "float",
            //				}, {
            //					"field": "price",
            //					"dataType": "Float",
            //					"title": "吊牌价",
            //			},{
            //					"field": "totalPrice",
            //					"dataType": "Float",
            //					"title": "申请退款金额",

            // }, {
            // 	"field": "discountFee",
            // 	"dataType": "Float",
            // 	"title": "优惠金额",
            // }
            //				}, {
            //					"field": "returnFeeStatus",
            //					"dataType": "String",
            //					"title": "退款状态",
            //					"editOptions": {
            //						"type": "combo",
            //						"datasource": "refundStatusSrc"
            //					},
            //					"renderType": "comboRender"
          }, {
            "field": "receivableFee",
            "dataType": "Float",
            "title": "申请退款金额",
          }, {
            "field": "receivablePriceUntil",
            "dataType": "Float",
            "title": "退货单价",
            "editable": false,
            "renderType": "precision2Render"
          }, {
            "field": "returnType",
            "dataType": "Integer",
            "title": "退货类型",
            "visible": true,
            "editOptions": {
              "type": "combo",
              "datasource": "returnTypeDataSource"
            },
            "renderType": "comboRender"
          }, {
            "field": "sendNum",
            "dataType": "Float",
            "title": "退货到货数量",
            // }
            //				, {
            //					"field": "settlementFee",
            //					"dataType": "Float",
            //					"title": "结算金额",
          }, {
            "field": "closeNum",
            "dataType": "Float",
            "title": "关闭数量",
          }, {
            "field": "closedFee",
            "dataType": "String",
            "title": "关闭金额",
            "editable": false
          },
          // {
          //					"field": "returnFee",
          //					"dataType": "Float",
          //					"title": "退款金额",
          // 				},
          {
            "field": "remark",
            "dataType": "String",
            "title": "备注",
          }, {
            "field": "isGift",
            "dataType": "String",
            "title": "是否赠品",
            "editable": false,
            "renderType": "isGiftRender"
          }, {
            "field": "giftSource",
            "dataType": "String",
            "title": "赠品来源",
            "renderType": "giftSourceRender"
          }, {
            "field": "sosonid",
            "dataType": "String",
            "title": "平台子订单号",
          }, {
            "field": "combineGoodsCode",
            "dataType": "String",
            "title": "商品组合编码",
          }, {
            "field": "combineGoodsName",
            "dataType": "String",
            "title": "商品组合名称",
            //					"width": "200px",
          }, {
            "field": "warehouseName",
            "dataType": "String",
            "title": "仓库",
            //					}, {
            //					"field": "customerName",
            //					"dataType": "String",
            //					"title": "经销商",
            //					}, {
            //					"field": "supplierName",
            //					"dataType": "String",
            //					"title": "供应商",
          },
        ]
      },
      grid4: {
        domid: "grid_prom_dom",
        umeta: {
          "id": "grid_prom",
          "data": "promList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true,
          columnMenu: false,
        },
        columns: [{
          "field": "promotionSource",
          "dataType": "String",
          "title": "优惠来源",
          "renderType": "promotionRender"
        }, {
          "field": "promotionType",
          "dataType": "String",
          "title": "优惠类型",
          "renderType": "promotionTypeRender"
        }, {
          "field": "promotionName",
          "dataType": "String",
          "title": "优惠方案名称",
        }, {
          "field": "goodsGiftRow",
          "dataType": "datetime",
          "title": "关联赠品行号",
        }, {
          "field": "goodsGiftSkucode",
          "dataType": "String",
          "title": "关联赠品编码",
        }, {
          "field": "promotionName",
          "dataType": "String",
          "title": "促销活动",
        }, {
          "field": "promotionModeName",
          "dataType": "String",
          "title": "促销方式",
        }, {
          "field": "promStatus",
          "dataType": "datetime",
          "title": "处理状态",
          "renderType": "promStatusRender"
        }, {
          "field": "rebateStatus",
          "dataType": "datetime",
          "title": "返现状态",
          "renderType": "rebateStatusRender"
        }, {
          "field": "promEndTime",
          "dataType": "String",
          "title": "活动结算时间",
        }, {
          "field": "promotionFee",
          "dataType": "String",
          "title": "优惠/返现金额",
        }, {
          "field": "promotionDesc",
          "dataType": "String",
          "title": "优惠方案描述",
        }, {
          "field": "goodsRow",
          "dataType": "String",
          "title": "关联商品行号",
        }, {
          "field": "goodsSkucode",
          "dataType": "String",
          "title": "关联商品编码",
        }, {
          "field": "goodsName",
          "dataType": "String",
          "title": "关联商品名称",
        }, ]
      },
      grid5: {
        domid: "grid_link_dom",
        umeta: {
          "id": "grid_link",
          "data": "linkList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true,
          columnMenu: false,
        },
        columns: [{
          "field": "linkType",
          "dataType": "String",
          "title": "关联关系",
          "editOptions": {
            "type": "combo",
            "datasource": "linkTypeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "creationTime",
          "dataType": "Datetime",
          "title": "关联时间",
        }, {
          "field": "code",
          "dataType": "String",
          "title": "电商订单号",
        }, {
          "field": "orderType",
          "dataType": "String",
          "title": "订单类型",
          "editOptions": {
            "type": "combo",
            "datasource": "orderTypeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "goodsSku",
          "dataType": "String",
          "title": "电商商品编码",
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
        }, ]
      },
      grid6: {
        domid: "grid_log_dom",
        umeta: {
          "id": "grid_log",
          "data": "logList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true,
          columnMenu: false,
        },
        columns: [{
          "field": "operator",
          "dataType": "String",
          "title": "操作人",
        }, {
          "field": "operationTime",
          "dataType": "Datetime",
          "title": "操作时间",
        }, {
          "field": "operateType",
          "dataType": "String",
          "title": "操作类型",
        }, {
          "field": "operateContent",
          "dataType": "String",
          "title": "操作内容",
        }, ]
      },
      grid7: {
        domid: "grid_products_dom",
        umeta: {
          "id": "grid_products",
          "data": "productList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          columnMenu: false,
          "showNumCol": true
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
        }, {
          "field": "productCode",
          "dataType": "String",
          "title": "商品编码",
        }, {
          "field": "productName",
          "dataType": "String",
          "title": "商品名称",
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "申请退货数量",
        }, {
          "field": "soNum",
          "dataType": "Float",
          "title": "开单数量",
        }, {
          "field": "soDistNum",
          "dataType": "Float",
          "title": "配车数量",
        }, {
          "field": "soSendNum",
          "dataType": "Float",
          "title": "发货数量",
        }, {
          "field": "storePlanNum",
          "dataType": "Float",
          "title": "排工数量",
        }, {
          "field": "storeSendNum",
          "dataType": "Float",
          "title": "出库数量",
        }, {
          "field": "storeFinishNum",
          "dataType": "Float",
          "title": "完工数量",
          // }, {
          // "field": "closeNum",
          // "dataType": "Float",
          // "title": "关闭数量",
        }, {
          "field": "poBillNo",
          "dataType": "String",
          "title": "采购单号",
        }, {
          "field": "isOwn",
          "dataType": "String",
          "title": "是否欠件",
          "renderType": "ownRender"
        }, ]
      },
      grid8: {
        domid: "grid_remark_1_dom",
        umeta: {
          "id": "grid_remark_1",
          "data": "commentList1",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          columnMenu: false,
          "showNumCol": true
        },
        columns: [{
          "field": "creationTime",
          "dataType": "Datetime",
          "title": "时间",
        }, {
          "field": "creator",
          "dataType": "String",
          "title": "备注人",
        }, {
          "field": "commentTypes",
          "dataType": "String",
          "title": "备注类型",
        }, {
          "field": "commentInfo",
          "dataType": "String",
          "title": "备注内容",
        }, ]
      },
      grid9: {
        domid: "grid_remark_2_dom",
        umeta: {
          "id": "grid_remark_2",
          "data": "commentList2",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          columnMenu: false,
          "showNumCol": true
        },
        columns: [{
          "field": "creationTime",
          "dataType": "Datetime",
          "title": "时间",
        }, {
          "field": "creator",
          "dataType": "String",
          "title": "备注人",
        }, {
          "field": "commentTypes",
          "dataType": "String",
          "title": "备注类型",
        }, {
          "field": "commentInfo",
          "dataType": "String",
          "title": "备注内容",
        }, ]
      },
      grid10: {
        domid: "grid_remark_2_dom",
        umeta: {
          columnMenu: false,
          "id": "grid_remark_2",
          "data": "commentList2",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "creationTime",
          "dataType": "Datetime",
          "title": "时间",
        }, {
          "field": "creator",
          "dataType": "String",
          "title": "备注人",
        }, {
          "field": "commentTypes",
          "dataType": "String",
          "title": "备注类型",
        }, {
          "field": "commentInfo",
          "dataType": "String",
          "title": "备注内容",
        }, ]
      },
      grid11: {
        domid: "grid_productInfo_dom",
        umeta: {
          "id": "grid_productInfo",
          columnMenu: false,
          "data": "goodsList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "renderType": "productRender"
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "申请退货数量",
          // }, {
          // "field": "closeNum",
          // "dataType": "Float",
          // "title": "关闭数量",
        }, {
          "field": "price",
          "dataType": "Float",
          "title": "吊牌价",
        }, {
          "field": "discountFee",
          "dataType": "Float",
          "title": "优惠金额",
        }, {
          "field": "receivablePriceUntil",
          "dataType": "Float",
          "title": "成交单价",
          "editable": false,
          "renderType": "precision2Render"
        }, {
          "field": "receivableFee",
          "dataType": "Float",
          "title": "成交金额",
        }, {
          "field": "settlementFee",
          "dataType": "Float",
          "title": "结算金额",
        }, {
          "field": "returnFee",
          "dataType": "Float",
          "title": "退款金额",
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, {
          "field": "remark",
          "dataType": "String",
          "title": "备注",
        }, {
          "field": "isOwn",
          "dataType": "String",
          "title": "是否欠件",
          "renderType": "ownRender"
        }, {
          "field": "isGift",
          "dataType": "String",
          "title": "是否赠品",
          "editable": false,
          "renderType": "isGiftRender"
        }, {
          "field": "giftSource",
          "dataType": "String",
          "title": "赠品来源",
          "renderType": "giftSourceRender"
        }, {
          "field": "returnFeeStatus",
          "dataType": "String",
          "title": "退款状态",
          "editOptions": {
            "type": "combo",
            "datasource": "returnFeeStatusSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "goodsSkucode",
          "dataType": "String",
          "title": "关联商品编码",
        }]
      },
      grid12: {
        domid: "grid_productInfo_after_dom",
        umeta: {
          columnMenu: false,
          "id": "grid_productInfo_after",
          "data": "afterGoodsList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "renderType": "productRender"
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "申请退货数量",
          // }, {
          // "field": "closeNum",
          // "dataType": "Float",
          // "title": "关闭数量",
        }, {
          "field": "price",
          "dataType": "Float",
          "title": "吊牌价",
        }, {
          "field": "discountFee",
          "dataType": "Float",
          "title": "优惠金额",
        }, {
          "field": "receivablePriceUntil",
          "dataType": "Float",
          "title": "成交单价",
          "editable": false,
          "renderType": "precision2Render"
        }, {
          "field": "receivableFee",
          "dataType": "Float",
          "title": "成交金额",
        }, {
          "field": "settlementFee",
          "dataType": "Float",
          "title": "结算金额",
        }, {
          "field": "returnFee",
          "dataType": "Float",
          "title": "退款金额",
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, {
          "field": "remark",
          "dataType": "String",
          "title": "备注",
        }, {
          "field": "isOwn",
          "dataType": "String",
          "title": "是否欠件",
          "renderType": "ownRender"
        }, {
          "field": "isGift",
          "dataType": "String",
          "title": "是否赠品",
          "editable": false,
          "renderType": "isGiftRender"
        }, {
          "field": "giftSource",
          "dataType": "String",
          "title": "赠品来源",
          "renderType": "giftSourceRender"
        }, {
          "field": "returnFeeStatus",
          "dataType": "String",
          "title": "退款状态",
          "editOptions": {
            "type": "combo",
            "datasource": "returnFeeStatusSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "goodsSkucode",
          "dataType": "String",
          "title": "关联商品编码",
        }]
      },
      grid13: {
        domid: "grid_freight_dom",
        umeta: {
          "id": "grid_freight",
          columnMenu: false,
          "data": "freightData",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "code",
          "dataType": "String",
          "title": "电商订单号",
        }, {
          "field": "pcode",
          "dataType": "String",
          "title": "平台订单号",
        }, {
          "field": "payTime",
          "dataType": "Datetime",
          "title": "付款时间",
        }, {
          "field": "billStatus",
          "dataType": "String",
          "title": "订单状态",
          "editOptions": {
            "type": "combo",
            "datasource": "orderStatusSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "orderType",
          "dataType": "String",
          "title": "订单类型",
          "editOptions": {
            "type": "combo",
            "datasource": "orderTypeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "buyer",
          "dataType": "String",
          "title": "买家账户",
        }, {
          "field": "orderReceiverName",
          "dataType": "String",
          "title": "收货人",
        }, {
          "field": "freight",
          "dataType": "String",
          "title": "运费",
        }, {
          "field": "totalReceivableFee",
          "dataType": "String",
          "title": "总金额",
        }, ]
      },
      grid14: {
        domid: "grid_productBuy_dom",
        umeta: {
          "id": "grid_productBuy",
          columnMenu: false,
          "data": "productBuyData",
          "onBeforeRowSelected": "rowClickFun",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "orderBuyer",
          "dataType": "String",
          "title": "买家账户",
        }, {
          "field": "goodsCategory",
          "dataType": "String",
          "title": "订单类型",
          "editable": false,
          "editOptions": {
            "type": "combo",
            "datasource": "orderTypeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "申请退货数量",
          "editable": false
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "num",
          "dataType": "Integer",
          "title": "本次关联数量",
          "editType": "integer",
          "required": true
        }, {
          "field": "amount",
          "dataType": "String",
          "title": "本次关联金额",
          "editable": false
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, {
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "editable": false
        }, {
          "field": "orderBillStatus",
          "dataType": "String",
          "title": "订单状态",
          "editable": false,
          "editOptions": {
            "type": "combo",
            "datasource": "orderStatusSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "orderCode",
          "dataType": "String",
          "title": "电商订单号",
          "editable": false
        }, {
          "field": "orderPcode",
          "dataType": "String",
          "title": "平台订单",
          "editable": false
        }, {
          "field": "isTrade",
          "dataType": "String",
          "title": "换购商品",
          "editable": false,
          "renderType": "isTradeRender"
        }, ]
      },
      grid15: {
        domid: "grid_productChangeBuy_dom",
        umeta: {
          columnMenu: false,
          "id": "grid_productChangeBuy",
          "data": "productBuyChangeData",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true,
          "onBeforeClickFun": "rowChangeClickFun"
        },
        columns: [{
          "field": "goodsId",
          "dataType": "String",
          "title": "电商商品编码",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "skuCode",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "goodsId",
              "refcode": "skuCode",
              "refname": "skuName"
            }
          }
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "Integer",
          "title": "申请退货数量",
          "required": true,
          "editType": "integer"
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }]
      },
      grid16: {
        domid: "grid_changeProduct_wait_dom",
        umeta: {
          columnMenu: false,
          "id": "grid_changeProduct_wait",
          "data": "upgradeCommodityData",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeRowSelected": "rowBeforeSelectedFun"
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "Integer",
          "title": "申请退货数量",
          "editable": false
        }, {
          "field": "changeNum",
          "dataType": "String",
          "title": "本次关联数量",
          "editType": "integer",
          "required": true
        }, {
          "field": "changeAmount",
          "dataType": "String",
          "title": "本次关联金额",
          "editable": false,
          "renderType": "precision2Render"
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }]
      },
      grid17: {
        domid: "grid_changeProduct_link_dom",
        umeta: {
          "id": "grid_changeProduct_link",
          "data": "upgradeCommodityLinkData",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeRowSelected": "rowBeforeSelectedLinkFun"
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "orderBuyer",
          "dataType": "String",
          "title": "买家账户",
          "editable": false
        }, {
          "field": "changeAmount",
          "dataType": "String",
          "title": "本次关联金额",
          "editType": "float",
          "editOptions": {
            "validType": "float",
            "min": "0"
          },
          "required": true
        }, {
          "field": "goodsCategory",
          "dataType": "String",
          "title": "订单类型",
          "editable": false,
          "editOptions": {
            "type": "combo",
            "datasource": "orderTypeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "orderBillStatus",
          "dataType": "String",
          "title": "订单状态",
          "editable": false,
          "editOptions": {
            "type": "combo",
            "datasource": "orderStatusSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, {
          "field": "orderCode",
          "dataType": "String",
          "title": "电商订单号",
          "editable": false
        }, {
          "field": "orderPcode",
          "dataType": "String",
          "title": "平台单号",
          "editable": false
        }]
      },
      grid18: {
        domid: "grid_changeProduct_select_dom",
        umeta: {
          columnMenu: false,
          "id": "grid_changeProduct_select",
          "data": "upgradeHightWaitData",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
        },
        columns: [{
          "field": "goodsId",
          "dataType": "String",
          "title": "电商商品编码",
          "required": true,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "skuCode",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "goodsId",
              "refname": "skuName",
              "refcode": "skuCode",
              "logisticsMode": "logisticsMode"
            }
          }
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "logisticsMode",
          "dataType": "String",
          "title": "物流方式",
          "editOptions": {
            "type": "combo",
            "datasource": "logisticsModeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "buyNum",
          "dataType": "Integer",
          "title": "申请退货数量",
          "editType": "integer",
          "required": true
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }]
      },
      grid19: {
        domid: "grid_changeGift_wait_dom",
        umeta: {
          "id": "grid_changeGift_wait",
          "data": "upgradeGiftData",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeRowSelected": "rowBeforeSelectedFun2"
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "申请退货数量",
          "editable": false
        }, {
          "field": "num",
          "dataType": "Integer",
          "title": "本次关联数量",
          "editType": "integer",
          "required": true
        }, {
          "field": "changeAmount",
          "dataType": "String",
          "title": "本次关联金额",
          "editType": "float",
          "editOptions": {
            "validType": "float",
            "min": "0"
          },
          "required": true
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, ]
      },
      grid20: {
        domid: "grid_changeGift_select_dom",
        umeta: {
          "id": "grid_changeGift_select",
          "data": "upgradeHightWaitData",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
        },
        columns: [{
          "field": "goodsId",
          "dataType": "String",
          "title": "电商商品编码",
          "required": true,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "skuCode",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "goodsId",
              "refname": "skuName",
              "refcode": "skuCode",
              "logisticsMode": "logisticsMode"
            }
          }
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "logisticsMode",
          "dataType": "String",
          "title": "物流方式",
          "editable": false,
          "editOptions": {
            "type": "combo",
            "datasource": "logisticsModeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "buyNum",
          "dataType": "Integer",
          "title": "申请退货数量",
          "editType": "integer",
          "required": true
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, ]
      },
      grid21: {
        domid: "grid_returnGoods_wait_dom",
        umeta: {
          "id": "grid_returnGoods_wait",
          "data": "returnGoodsWaitData",
          columnMenu: false,
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "onRowSelected": "rowSelectedFun",
          "onRowUnSelected": "rowUnSelectedFun"
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "申请退货数量",
          "editable": false
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "returnNum",
          "dataType": "String",
          "title": "已退货数量",
          "editable": false
        }, {
          "field": "receivablePriceUntil",
          "dataType": "String",
          "title": "成交单价",
          "editable": false,
          "renderType": "precision2Render"
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "price",
          "dataType": "String",
          "title": "吊牌价",
          "editable": false
        }, {
          "field": "discountFee",
          "dataType": "String",
          "title": "优惠金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, ]
      },
      grid22: {
        domid: "grid_returnGoods_select_dom",
        umeta: {
          "id": "grid_returnGoods_select",
          "data": "returnGoodsSelectData",
          columnMenu: false,
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true,
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "申请退货数量",
          "editable": false
        }, {
          "field": "saleReturnNum",
          "dataType": "Integer",
          "title": "售后退货数量",
          "editType": "integer",
          "required": true,
          "editOptions": {
            "validType": "integer",
            "min": "1"
          }
        }, {
          "field": "saleReturnFee",
          "dataType": "Float",
          "title": "售后退款金额",
          "editTYpe": "float",
          "required": true,
          "editOptions": {
            "validType": "float",
            "min": "0"
          }
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, {
          "field": "price",
          "dataType": "String",
          "title": "吊牌价",
          "editable": false
        }, {
          "field": "discountFee",
          "dataType": "String",
          "title": "优惠金额",
          "editable": false
        }, {
          "field": "receivablePriceUntil",
          "dataType": "String",
          "title": "成交单价",
          "editable": false,
          "renderType": "precision2Render"
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, ]
      },
      grid23: {
        domid: "grid_salingrefund_wait_dom",
        umeta: {
          "id": "grid_salingrefund_wait",
          columnMenu: false,
          "data": "salingRefundWaitGoodsData",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "onRowSelected": "rowSelectedFun2",
          "onRowUnSelected": "rowUnSelectedFun2"
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "申请退货数量", //申请退货数量/购买数量
          "editable": false
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",//取消退货数量/关闭数量
          // "editable": false
        }, {
          "field": "returnNum",
          "dataType": "String",
          "title": "已退货数量", //已经取消退货数量
          "editable": false
        }, {
          "field": "totalPrice",
          "dataType": "String",
          "title": "申请退货金额", //已经取消退货数量
          "editable": false
        }, {
          "field": "receivablePriceUntil",
          "dataType": "String",
          "title": "成交单价",
          "editable": false,
          "renderType": "precision2Render"
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "price",
          "dataType": "String",
          "title": "吊牌价",
          "editable": false
        }, {
          "field": "discountFee",
          "dataType": "String",
          "title": "优惠金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
          "editable": false
        }, ]
      },
      grid24: {
        domid: "grid_salingrefund_select_dom",
        umeta: {
          "id": "grid_salingrefund_select",
          columnMenu: false,
          "data": "salingRefundSelectedGoodsData",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true,
          // "onBeforeClickFun": "showProductGridDetail",
          "onRowSelected": "showProductGridDetail",
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "电商商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "电商商品名称",
          "editable": false
        }, {
          "field": "saleReturnNum",
          "dataType": "Integer",
          "title": "编辑退货数量",
          "editType": "integer",
          "required": true,
          "editOptions": {
            "validType": "integer",
            "min": "1"
          }
        }, {
          "field": "saleReturnFee",
          "dataType": "Float",
          "title": "编辑退款金额",
          "editTYpe": "float",
          "required": true,
          "editOptions": {
            "validType": "float",
            "min": "0"
          },
          "renderType": "precision2Render"
        }, {
          "field": "applyNum",
          "dataType": "String",
          "title": "取消退货数量",
          "editable": false
        }, {
          "field": "applyFee",
          "dataType": "String",
          "title": "已取消退货金额",
          "editable": false
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",//(已取消退货数量)
          // "editable": false
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额", //(已取消退货金额)
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "申请退货数量", //(退货总数量)
          "editable": false
        }, {
          "field": "totalPrice",
          "dataType": "String",
          "title": "申请退货金额", //已经取消退货数量
          "editable": false
        }, {
          "field": "price",
          "dataType": "String",
          "title": "吊牌价",
          "editable": false
        }, {
          "field": "discountFee",
          "dataType": "String",
          "title": "优惠金额",
          "editable": false
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false
        }, {
          "field": "settlementFee",
          "dataType": "String",
          "title": "结算金额",
          "editable": false
        }, ]
      },
      grid29: {
        domid: "grid_orderGoods4WarehouseInput",
        umeta: {
          "id": "grid_orderGoods4WarehouseInput",
          "data": "orderGoods4WarehouseInputData",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true,

        },
        columns: [{
          "field": "productCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false
        }, {
          "field": "productName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "申请退货数量",
          "editable": false
          // }, {
          // "field": "closeNum",
          // "dataType": "Float",
          // "title": "关闭数量",
          // "editable": false
        }, {
          "field": "warehouseId",
          "dataType": "String",
          "title": "仓库",
          "editable": false,
          showField: "warehouseName",
          renderType: "ncReferRender",
          editType: "ncReferEditType",

          editOptions: {
            validType: "string",
            rel: {
              refname: "warehouseName",
            }
          }
        }, {
          "field": "returnWarehouseId",
          "dataType": "String",
          "title": "退返仓库",
          "editable": true,
          showField: "returnWarehouseName",
          renderType: "ncReferRender",
          editType: "ncReferEditType",

          editOptions: {
            validType: "string",
            rel: {
              refname: "warehouseName",
            }
          }
        }, {
          "field": 'belongGoodsRate',
          "dataType": 'Float',
          "title": '电商商品/商品比',
          "editable": false
        }, {
          "field": "applyNum",
          "dataType": "String",
          "title": "已取消退货数量",
          "editable": false
        }]
      },
      gridsplitorder: {
        domid: "splitOrderData1_dom",
        umeta: {
          "id": "splitOrderData1",
          "data": "splitOrderData",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "columnMenu": false
        },
        columns: [{
          "field": "customerCode",
          "dataType": "String",
          "title": "服务商编码",
          "editable": false,
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "服务商名称",
          "editable": false,
        }, {
          "field": "code",
          "dataType": "String",
          "title": "地址编码",
          "editable": false,
        }, {
          "field": "name",
          "dataType": "String",
          "title": "地址名称",
          "editable": false,
        }, ]
      },
      gridsplitorderSub: {
        domid: "productOrderSplit_warse_dom",
        umeta: {
          "id": "productOrderSplit_warse",
          "data": "goodsList",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true,
          "columnMenu": false
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false,
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false,
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "购买数量",
          "editable": false,
        }, {
          "field": "closeNum",
          "dataType": "Float",
          "title": "关闭数量",
          "editable": false,
        }, {
          "field": "warehouseId",
          "dataType": "String",
          "title": "仓库",
          "width": "180px",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "warehouseName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "takeUpNumber",
          "dataType": "Float",
          "title": "预占数量",
          "editable": false,
        }, {
          "field": "takeUpStatus",
          "dataType": "String",
          "title": "预占状态",
          "editable": false,
          "editOptions": {
            "type": "combo",
            "datasource": "preemptedStatusSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "takeUpDate",
          "dataType": "Datetime",
          "title": "预占时间",
          "editable": false,
        }, ]
      },
      gridcustomersub: {
        domid: "customersub_dom",
        umeta: {
          "id": "customersub",
          "data": "goodsList",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true,
          "columnMenu": false
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false,
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false,
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "购买数量",
          "editable": false,
        }, {
          "field": "closeNum",
          "dataType": "Float",
          "title": "关闭数量",
          "editable": false,
        }, {
          "field": "customerId",
          "dataType": "String",
          "title": "经销商",
          "width": "180px",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "customerName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refname": "customerName"
            }
          }
        }, ]
      },
      gridsuppliersub: {
        domid: "suppliersub_dom",
        umeta: {
          "id": "suppliersub",
          "data": "goodsList",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true,
          "columnMenu": false
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false,
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false,
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "购买数量",
          "editable": false,
        }, {
          "field": "closeNum",
          "dataType": "Float",
          "title": "关闭数量",
          "editable": false,
        }, {
          "field": "supplierId",
          "dataType": "String",
          "title": "供应商",
          "width": "180px",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "supplierName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refname": "supplierName"
            }
          }
        }, ]
      },
      productOrderSplit: {
        domid: "productOrderSplit_dom",
        umeta: {
          "id": "productOrderSplit",
          "data": "goodsList",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true,
          "columnMenu": false
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false,
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false,
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "购买数量",
          "editable": false,
        }, {
          "field": "closeNum",
          "dataType": "Float",
          "title": "关闭数量",
          "editable": false,
        }, {
          "field": "warehouseId",
          "dataType": "String",
          "title": "仓库",
          "width": "180px",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "warehouseName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "takeUpNumber",
          "dataType": "Float",
          "title": "预占数量",
          "editable": false,
        }, {
          "field": "takeUpStatus",
          "dataType": "String",
          "title": "预占状态",
          "editable": false,
          "editOptions": {
            "type": "combo",
            "datasource": "preemptedStatusSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "takeUpDate",
          "dataType": "Datetime",
          "title": "预占时间",
          "editable": false,
        }, ]
      },
    }
  }
  return new basemodel(model);
})