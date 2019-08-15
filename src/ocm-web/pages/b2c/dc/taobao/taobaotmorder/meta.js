define(["ocm_global"], function () {
  //淘宝天猫主表
  window.Order = {
    params: {
      "cls": "com.yonyou.ocm.dc.service.dto.ToptradeDto"
    },
    meta: {
      id: { type: "string" },
      dr: { type: "integer" },
      ts: { type: "datetime" },
      creator: { type: "string" },
      creationTime: { type: "datetime" },
      modifier: { type: "string" },
      modifiedTime: { type: "datetime" },
      persistStatus: { type: "string" },
      tid: { type: "string" },  //交易编号
      num: { type: "string" },  //商品购买数量
      adjustfee: { type: "string" }, //手工金额
      alipayid: { type: "string" }, //买家支付宝id
      alipayno: { type: "string" },  //支付宝交易号
      alipayurl: { type: "string" }, //支付url
      alipaywarnmsg: { type: "string" }, //支付错误信息
      availableconfirmfee: { type: "float" }, //确认收货金额
      buyeralipayno: { type: "string" },  //买家的支付宝账号
      buyerarea: { type: "string" },  //买家下单地区
      buyercodfee: { type: "string" },  //买家货到付款服务费
      buyeremail: { type: "string" }, //买家邮件地址
      buyerflag: { type: "string" },  //买家备注旗帜
      buyermemo: { type: "integer" }, //买家备注
      buyermessage: { type: "integer" },  //买家留言
      buyernick: { type: "string" },  //买家昵称
      buyerobtainpointfee: { type: "string" },  //返点积分
      buyerrate: { type: "string" },  //买家是否已评价
      canrate: { type: "integer" }, //当前交易是否评价
      codfee: { type: "float" },  //货到付款服务费
      consigntime: { type: "datetime" },  //卖家发货时间
      created: { type: "datetime" },  //交易时间
      commissionfee: { type: "string" },  //交易佣金
      discountfee: { type: "string" },  //系统优惠金额
      endtime: { type: "datetime" },  //交易结束时间
      expressagencyfee: { type: "string" }, //快递代收款
      haspostfee: { type: "string" }, //是否包含邮费
      isbrandsale: { type: "string" },  //是否品牌特卖订单
      isforcewlb: { type: "string" }, //是否强制使用物流宝发货
      iid: { type: "string" },  //商品字符串编号
      invoicename: { type: "string" },  //发票抬头
      is3d: { type: "string" }, //是否3D淘宝交易
      islgtype: { type: "string" }, //是否物流宝发货标志
      modified: { type: "datetime" }, //交易修改时间
      paytime: { type: "datetime" },  //付款时间
      payment: { type: "string" },  //付款金额
      picpath: { type: "string" },  //商品图片绝对路径
      pointfee: { type: "string" }, //买家使用积分
      postfee: { type: "string" },  //邮费
      price: { type: "string" },  //商品价钱
      promotion: { type: "string" },  //交易促销详细信息
      realpointfee: { type: "string" }, //买家实际使用积分
      receivedpayment: { type: "string" },  //卖家实际收到的支付宝打款金额
      receiveraddress: { type: "string" },  //收货人详细地址
      receivercity: { type: "string" }, //收货人的所在城市
      receiverdistrict: { type: "string" }, //收货人的所在地区
      receivertown: { type: "string" }, //收货人的所在街道
      receivermobile: { type: "string" }, //收货人的手机号码
      receivername: { type: "string" }, //收货人姓名
      receiverphone: { type: "string" },  //收货人电话号码
      receiverstate: { type: "string" },  //收货人所在省份
      receiverzip: { type: "string" },  //收货人的邮编
      selleralipayno: { type: "string" }, //卖家支付宝账号
      sellercodfee: { type: "string" }, //卖家货到付款服务费
      selleremail: { type: "string" },  //卖家邮件地址
      sellerflag: { type: "string" }, //卖家备注旗帜
      sellermemo: { type: "string" }, //卖家备注
      sellermobile: { type: "string" }, //卖家手机
      sellername: { type: "string" }, //卖家姓名
      sellernick: { type: "string" }, //卖家昵称
      sellerphone: { type: "string" },  //卖家电话
      sellerrate: { type: "string" }, //卖家是否已评价
      shippingtype: { type: "string" }, //物流方式
      snapshot: { type: "string" }, //交易快照
      snapshoturl: { type: "string" },  //交易快照地址
      tradestatus: { type: "string" },  //交易状态
      status4ch: { type: "string" },  //4ch状态
      timeoutactiontime: { type: "datetime" },  //超时到期时间
      title: { type: "string" },  //交易标题
      totalfee: { type: "string" }, //商品金额
      tradefrom: { type: "string" },  //交易来源
      tradememo: { type: "string" },  //交易备注
      type: { type: "string" }, //交易类型
      numiid: { type: "string" }, //商品数字编号
      issync: { type: "string" }, //是否同步标志
      isexception: { type: "string" },  //是否有异常
      shopsource: {
        type: "string",
        'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
        'refcfg': '{"ctx":"/uitemplate_web", "refName":"店铺来源"}'
      }, //来源店铺
      shopsourceCode: { type: "string" }, //来源店铺
      shopsourceName: { type: "string" }, //来源店铺
      exceptiondesc: { type: "string" },  //异常描述
      isupdate: { type: "string" }, //是否是新修改
      jhs: { type: "string" }, //聚划算标识
      issynuser: { type: "string" },  //用户是否同步
      iso2o: { type: "string" },  //是否导购宝
      o2oshopname: { type: "string" },  //导购门店名称
      o2oguidename: { type: "string" }, //导购员名称
      iswww: { type: "string" },  //是否包含3W商品
      o2o: { type: "string" },  //导购宝
      o2oGuideId: { type: "string" }, //导购员id
      o2oShopId: { type: "string" },  //导购门店id
      o2oDelivery: { type: "string" },  //导购宝提货方式
      pkOrgName: { type: "string" } //销售组织
    },
    pageSize: 10,
    last: { type: "boolean" },
    totalElements: { type: "integer" },
    totalPages: { type: "integer" },
    number: { type: "integer" },
    size: { type: "integer" },
    first: { type: "boolean" },
    numberOfElements: { type: "integer" }

  }

  //子页面
  window.OrderChild = {
    meta: {
      id: { type: "string" },
      dr: { type: "integer" },
      ts: { type: "datetime" },
      creator: { type: "string" },
      creationTime: { type: "datetime" },
      modifier: { type: "string" },
      modifiedTime: { type: "datetime" },
      persistStatus: { type: "string" },
      tid: { type: "string" },  //交易编号
      num: { type: "string" },  //商品购买数量
      adjustfee: { type: "string" }, //手工金额
      alipayid: { type: "string" }, //买家支付宝id
      alipayno: { type: "string" },  //支付宝交易号
      alipayurl: { type: "string" }, //支付url
      alipaywarnmsg: { type: "string" }, //支付错误信息
      availableconfirmfee: { type: "float" }, //确认收货金额
      buyeralipayno: { type: "string" },  //买家的支付宝账号
      buyerarea: { type: "string" },  //买家下单地区
      buyercodfee: { type: "string" },  //买家货到付款服务费
      buyeremail: { type: "string" }, //买家邮件地址
      buyerflag: { type: "string" },  //买家备注旗帜
      buyermemo: { type: "string" }, //买家备注
      buyermessage: { type: "string" },  //买家留言
      buyernick: { type: "string" },  //买家昵称
      buyerobtainpointfee: { type: "string" },  //返点积分
      buyerrate: { type: "string" },  //买家是否已评价
      canrate: { type: "integer" }, //当前交易是否评价
      codfee: { type: "float" },  //货到付款服务费
      consigntime: { type: "datetime" },  //卖家发货时间
      created: { type: "datetime" },  //交易时间
      commissionfee: { type: "float" },  //交易佣金
      discountfee: { type: "float" },  //系统优惠金额
      endtime: { type: "datetime" },  //交易结束时间
      expressagencyfee: { type: "string" }, //快递代收款
      haspostfee: { type: "string" }, //是否包含邮费
      isbrandsale: { type: "string" },  //是否品牌特卖订单
      isforcewlb: { type: "string" }, //是否强制使用物流宝发货
      iid: { type: "string" },  //商品字符串编号
      invoicename: { type: "string" },  //发票抬头
      is3d: { type: "string" }, //是否3D淘宝交易
      islgtype: { type: "string" }, //是否物流宝发货标志
      modified: { type: "datetime" }, //交易修改时间
      paytime: { type: "datetime" },  //付款时间
      payment: { type: "float" },  //付款金额
      picpath: { type: "string" },  //商品图片绝对路径
      pointfee: { type: "float" }, //买家使用积分
      postfee: { type: "float" },  //邮费
      price: { type: "float" },  //商品价钱
      promotion: { type: "string" },  //交易促销详细信息
      realpointfee: { type: "string" }, //买家实际使用积分
      receivedpayment: { type: "string" },  //卖家实际收到的支付宝打款金额
      receiveraddress: { type: "string" },  //收货人详细地址
      receivercity: { type: "string" }, //收货人的所在城市
      receiverdistrict: { type: "string" }, //收货人的所在地区
      receivertown: { type: "string" }, //收货人的所在街道
      receivermobile: { type: "string" }, //收货人的手机号码
      receivername: { type: "string" }, //收货人姓名
      receiverphone: { type: "string" },  //收货人电话号码
      receiverstate: { type: "string" },  //收货人所在省份
      receiverzip: { type: "string" },  //收货人的邮编
      selleralipayno: { type: "string" }, //卖家支付宝账号
      sellercodfee: { type: "string" }, //卖家货到付款服务费
      selleremail: { type: "string" },  //卖家邮件地址
      sellerflag: { type: "string" }, //卖家备注旗帜
      sellermemo: { type: "string" }, //卖家备注
      sellermobile: { type: "string" }, //卖家手机
      sellername: { type: "string" }, //卖家姓名
      sellernick: { type: "string" }, //卖家昵称
      sellerphone: { type: "string" },  //卖家电话
      sellerrate: { type: "string" }, //卖家是否已评价
      shippingtype: { type: "string" }, //物流方式
      snapshot: { type: "string" }, //交易快照
      snapshoturl: { type: "string" },  //交易快照地址
      tradestatus: { type: "string" },  //交易状态
      status4ch: { type: "string" },  //4ch状态
      timeoutactiontime: { type: "string" },  //超时到期时间
      title: { type: "string" },  //交易标题
      totalfee: { type: "float" }, //商品金额
      tradefrom: { type: "string" },  //交易来源
      tradememo: { type: "string" },  //交易备注
      type: { type: "string" }, //交易类型
      numiid: { type: "string" }, //商品数字编号
      issync: { type: "string" }, //是否同步标志
      isexception: { type: "string" },  //是否有异常
      shopsource: { type: "string" }, //来源店铺
      shopsourceCode: { type: "string" }, //来源店铺
      shopsourceName: { type: "string" }, //来源店铺
      exceptiondesc: { type: "string" },  //异常描述
      isupdate: { type: "string" }, //是否是新修改
      jhs: { type: "string" }, //聚划算标识
      issynuser: { type: "string" },  //用户是否同步
      iso2o: { type: "string" },  //是否导购宝
      o2oshopname: { type: "string" },  //导购门店名称
      o2oguidename: { type: "string" }, //导购员名称
      iswww: { type: "string" },  //是否包含3W商品
      o2o: { type: "string" },  //导购宝
      o2oGuideId: { type: "string" }, //导购员id
      o2oShopId: { type: "string" },  //导购门店id
      o2oDelivery: { type: "string" },  //导购宝提货方式
      pkOrgName: { type: "string" } //销售组织
    },
    last: { type: "boolean" },
    totalElements: { type: "integer" },
    totalPages: { type: "integer" },
    number: { type: "integer" },
    size: { type: "integer" },
    first: { type: "boolean" },
    numberOfElements: { type: "integer" }
  }
  //订单商品
  window.product = {
    meta: {
      serialnum: { type: "string" },  //行号
      giftitemid: { type: "string" }, //赠品id
      adjustfee: { type: "string" }, //手工调整金额
      buyernick: { type: "string" }, //买家昵称
      buyerrate: { type: "string" }, //买家是否已评价
      cid: { type: "string" }, //交易商品对应的类目ID
      discountfee: { type: "string" }, //订单优惠金额
      iid: { type: "string" }, //商品的字符串编号
      isoversold: { type: "string" }, //是否超卖
      isserviceorder: { type: "string" }, //是否是服务订单
      itemmealid: { type: "string" }, //套餐ID
      itemmealname: { type: "string" }, //套餐的值
      modified: { type: "string" }, //订单修改时间
      num: { type: "string" }, //购买数量
      numiid: { type: "string" }, //商品数字ID
      oid: { type: "string" }, //子订单编号
      outeriid: { type: "string" }, //商家外部编码
      outerskuid: { type: "string" }, //外部网店自己定义的Sku编号
      payment: { type: "string" }, //子订单实付金额
      picpath: { type: "string" }, //商品图片的绝对路径
      price: { type: "string" }, //商品价格
      refundid: { type: "string" }, //最近退款ID
      refundstatus: { type: "string" }, //退款状态
      refundstatus4ch: { type: "string" }, //退款状态(中文)
      sellernick: { type: "string" }, //卖家昵称
      sellerrate: { type: "string" }, //卖家是否已评价
      sellertype: { type: "string" }, //卖家类型
      skuid: { type: "string" }, //商品的最小库存单位Sku的id
      skupropertiesname: { type: "string" }, //SKU的值
      snapshot: { type: "string" },  //订单快照详细信息
      snapshoturl: { type: "string" }, //订单快照URL
      orderstatus: { type: "string" }, //订单状态
      status4ch: { type: "string" }, //订单状态(中文)
      timeoutactiontime: { type: "string" },  //订单超时到期时间
      title: { type: "string" }, //商品标题
      totalfee: { type: "string" }, //应付金额
      isgiftitem: { type: "string" }, //是否赠品
      stockstatus: { type: "string" },  //库存状态
      isprestock: { type: "string" }, //是否预占
      iswww: { type: "string" }, //是否www订单
      storecode: { type: "string" }, //发货仓库编码
      toptradeId: { type: "string" } //淘宝订单id
    }
  }
  //优惠详情
  window.promotion = {
    meta: {
      promotionid: { type: "string" }, //优惠详情ID
      sosonid: { type: "string" }, //交易的主订单或者子订单号
      discountfee: { type: "string" }, //优惠金额
      giftitemid: { type: "string" }, //赠品的宝贝id
      giftitemname: { type: "string" }, //赠品名称
      giftitemnum: { type: "string" }, //赠品数量
      promotiondesc: { type: "string" }, //优惠活动的描述
      promotionname: { type: "string" }, //优惠信息的名称
      merchantno: { type: "string" }, //商户编码
      toptradeId: { type: "string" } //淘宝订单id
    }
  }
  //服务信息
  window.service = {
    meta: {
      oid: { type: "string" }, //虚拟服务子订单号
      itemOid: { type: "string" }, //服务所属的交易订单号
      serviceId: { type: "string" }, //服务数字id
      serviceDetailUrl: { type: "string" }, //服务详情的URL地址
      buynum: { type: "string" }, //购买数量
      serviceprice: { type: "string" }, //服务价格
      payment: { type: "string" }, //子订单实付金额
      title: { type: "string" }, //商品名称
      totalFee: { type: "string" }, //服务子订单总费用
      buyerNick: { type: "string" }, //买家昵称
      refundId: { type: "string" }, //最近退款的id
      sellerNick: { type: "string" }, //卖家昵称
      picPath: { type: "string" }, //服务图片地址
      toptradeId: { type: "string" } //淘宝订单id
    }
  }
  
  window.catchOneMeta={
				meta: {
					storeRef: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
						"refparam": '{"IN_platform.id":"6763be4d-85f0-4cec-afcd-416e270f3d43,2cbfda93-f6c7-4d06-90aa-64b78940e919"}'
					},
					storeCode:{ type: "string" } ,
					tid:{ type: "string" } 
				}
			}
})