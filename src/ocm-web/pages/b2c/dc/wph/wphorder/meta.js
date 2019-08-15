define(["ocm_global"], function () {
  //活动定义
  window.Order = {
    params: {
      "cls": "com.yonyou.ocm.dc.service.dto.VipOrderDto"
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
      ordersn: { type: "string" },  //平台订单号
      shopsource: {
        type: "string",
        'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
        'refcfg': '{"ctx":"/uitemplate_web", "refName":"店铺来源"}'
      }, //来源店铺
      shopsourceCode: { type: "string" }, //来源店铺
      shopsourceName: { type: "string" }, //来源店铺
      totalnum: { type: "integer" },  //商品总数量
      num: { type: "integer" }, //商品购买数量
      remark: { type: "string" }, //买家留言
      goodsmoney: { type: "float" },  //应收总金额
      stat: { type: "string" }, //订单状态
      actualmoney: { type: "float" }, //实际应收总金额
      paidmoney: { type: "float" }, //买家支付金额
      invoice: { type: "string" },  //发票抬头
      carriage: { type: "float" },  //买家应付邮费
      addtime: { type: "datetime" },  //下单时间
      address: { type: "string" },  //详细地址
      countryId: { type: "string" },  //国家ID
      city: { type: "string" }, //城市
      county: { type: "string" }, //地区
      state: { type: "string" },  //省
      postcode: { type: "string" }, //邮编
      mobile: { type: "string" }, //手机号
      tel: { type: "string" },  //电话号码
      isexception: { type: "string" },  //是否有异常
      isssync: { type: "string" },  //是否同步标志
      buyer: { type: "string" },  //买家姓名
      transportDay: { type: "datetime" }, //期望收货时间
      vendorId: { type: "string" }, //供应商ID
      vendorName: { type: "string" }, //供应商名称
      exFavMoney: { type: "float" },  //促销优惠金额
      favourableMoney: { type: "float" }, //优惠金额
      po: { type: "string" }, //po号
      exceptiondesc: { type: "string" },  //异常描述
      pkOrg: { type: "string" } //销售组织
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
      ordersn: { type: "string" },  //平台订单号
      shopsource: { type: "string" }, //来源店铺
      shopsourceCode: { type: "string" }, //来源店铺
      shopsourceName: { type: "string" }, //来源店铺
      totalnum: { type: "integer" },  //商品总数量
      num: { type: "integer" }, //商品购买数量
      remark: { type: "string" }, //买家留言
      goodsmoney: { type: "float" },  //应收总金额
      stat: { type: "string" }, //订单状态
      actualmoney: { type: "float" }, //实际应收总金额
      paidmoney: { type: "float" }, //买家支付金额
      invoice: { type: "string" },  //发票抬头
      carriage: { type: "float" },  //买家应付邮费
      addtime: { type: "datetime" },  //下单时间
      address: { type: "string" },  //详细地址
      countryId: { type: "string" },  //国家ID
      city: { type: "string" }, //城市
      county: { type: "string" }, //地区
      state: { type: "string" },  //省
      postcode: { type: "string" }, //邮编
      mobile: { type: "string" }, //手机号
      tel: { type: "string" },  //电话号码
      isexception: { type: "string" },  //是否有异常
      isssync: { type: "string" },  //是否同步标志
      buyer: { type: "string" },  //买家姓名
      transportDay: { type: "datetime" }, //期望收货时间
      vendorId: { type: "string" }, //供应商ID
      vendorName: { type: "string" }, //供应商名称
      exFavMoney: { type: "float" },  //促销优惠金额
      favourableMoney: { type: "float" }, //优惠金额
      po: { type: "string" }, //po号
      exceptiondesc: { type: "string" },  //异常描述
      pkOrg: { type: "string" } //销售组织
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
  window.OrderProduct = {
    meta: [{
      serialnum: { type: "string" },  //行号
      goodsName: { type: "string" },  //平台商品名称
      orderSn: { type: "string" },  //平台订单号
      brandName: { type: "string" },  //商品品牌
      price: { type: "string" },  //商品价格
      modified: { type: "string" },  //订单修改时间
      goodNo: { type: "string" },  //货号
      standard: { type: "string" },  //规格
      goodSn: { type: "string" },  //条形码
      amount: { type: "string" },  //数量
      isgiftitem: { type: "string" }  //是否赠品
    }]
  }
  //优惠详情 
  window.DiscountDetail = {
    meta: [{
      merchantDiscount: { type: "string" },  //优惠金额
      orderId: { type: "string" },  //关联平台订单号
      promotiontype: { type: "string" },  //优惠活动的类型
      promotionname: { type: "string" },  //优惠方案名称
    }]
  }
  window.catchOneMeta={
				meta: {
					storeRef: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
						"refparam": '{"IN_platform.id":"23513db9-b2da-40ea-8d0a-3f3b2af6f9f8"}'
					},
					storeCode:{ type: "string" } ,
					tid:{ type: "string" } 
				}
			}
})