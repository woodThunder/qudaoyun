define(["ocm_global"], function () {
  //供应商直发订单主表
  window.ordersDirectlyMeta= {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.SupplierOrderDto"
    },
    meta: {
      id: { type: 'string' },//id
      creator: { type: 'string' },
      creationTime: { type: 'datetime' },
      modifier: { type: 'string' },
      modifiedTime: { type: 'datetime' },
      code: { type: 'string' },//采购单号
      billType: { type: 'string'},//采购单类型
      billStatus: { type: 'string'},//采购单状态
      logisticsMode: { type: 'string' },//物流方式
      serviceMode: { type: 'string' },//配送方式
      supplierId: {type: 'string'}, //供应商ID
      supplierCode: {type: 'string'}, //供应商ID
      supplierName: {type: 'string'}, //供应商ID
      syscode: { type: 'string' },//电商订单号
      pcode: { type: 'string' },//平台订单
      logisticsId: {type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['logistics-company']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'}, //快递公司ID
      logisticsCode: {type: "string"},//快递公司编码
      logisticsName: { type: 'string' },//快递公司
      waybillNo: { type: 'string',required: true,maxLength:30 },//快递单号
      logisticsInfo: { type: 'string',maxLength:200 },//快递其他信息
      platformId: {type: "string"}, //平台ID
      platformCode: {type: "string"},
      platformName: { type: 'string' },//平台名称
      storeId: {type: "string"}, //店铺ID
      storeCode: {type: "string"}, 
      storeName: { type: 'string' },//店铺名称
      buyer: { type: 'string' },//顾客
      bookTime: { type: 'datetime' },//下单时间
      payTime: { type: 'datetime' },//付款时间
      deliveryTime: { type: 'datetime' },//要求送货时间
      buyerMsg: { type: 'string' },//买家留言
      sellerRemark: { type: 'string',maxLength:600 },//卖家备注
      totalNum: { type: 'float' },//总数量
      totalFee: { type: 'float' },//总金额
      isLock: { type: 'string' },//冻结标识
      isReturn:{type: 'string'},//是否退货
      lockReason: { type: 'string' },   //冻结原因
      pkOrg: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"商品列表"}'
      },  //组织主键
      //以下是收货人信息
      receiverName: { type: 'string' },//收货人
      receiverTel: { type: 'string' },//收货人电话
      receiverPhone: { type: 'string' },//收货人手机
//    receiverProvince: { type: 'string' },//收货省
//    receiverCity: { type: 'string' },//收货市
//    receiverDistrict: { type: 'string' },//收货区
//    receiverTown: { type: 'string' },//收货镇
      receiverProvince: { 
      	  type: 'string',
      		"refmodel": JSON.stringify(refinfo['region']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
          "refparam":'{"EQ_areaLevel":"2"}'
      },//收货省
      receiverCity: { 
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['region']),
	      "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        "refparam":'{"EQ_areaLevel":"3"}'
      },//收货市
      receiverDistrict: { 
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['region']),
	      "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        "refparam":'{"EQ_areaLevel":"4"}'
      },//收货区
      receiverTown: { 
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['region']),
	      "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        "refparam":'{"EQ_areaLevel":"5"}'
      	},//收货镇
      receiverAddress: { type: 'string' },//收货详细地址

    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
  }

  //订单详情
  window.supplierOrderMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.OrderDto"
    },
    meta: {
      id: { type: 'string' },//id
      dr: { type: 'integer' },//dr
      ts: { type: 'datetime' },//ts
      creator: { type: 'string' },
      creationTime: { type: 'datetime' },
      modifier: { type: 'string' },
      modifiedTime: { type: 'datetime' },
      orderId: { type: 'string', required: true },//订单主键
      code: { type: 'string', required: true },//采购单号
      billType: { type: 'string', required: true },//采购单类型
      billStatus: { type: 'string', required: true },//采购单状态
      creditType: { type: 'string', required: true },//信贷类型
      logisticsMode: { type: 'string' },//物流方式
      serviceMode: { type: 'string' },//配送方式
      supplierId: {type: 'string'}, //供应商ID
      supplierCode: {type: 'string'}, //供应商ID
      supplierName: {type: 'string'}, //供应商ID
      serviceProvider: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['customers']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}',
        "refparam": '{"EQ_isServiceProvider":"1","EQ_isEnable":"1"}'
      }, //服务商ID
      busiAccount: { type: 'string' },//业务账号
      serviceAddr: { type: 'string' },//送达方
      syscode: { type: 'string' },//电商订单号
      pcode: { type: 'string' },//平台订单号
      platformId: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['b2cplatform']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
      }, //平台ID
      platformName: { type: 'string' },//平台名称
      storeId: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
      }, //店铺ID
       logisticsId: {type: "string",
        required: false,
        "refmodel": JSON.stringify(refinfo['logistics-company']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'}, //快递公司ID
      logisticsCode: {type: "string"},//快递公司编码
      logisticsName: { type: 'string' },//快递公司
      waybillNo: { type: 'string' },//快递单号
      logisticsInfo: { type: 'string' },//快递其他信息

      storeName: { type: 'string' },//店铺名称
      buyer: { type: 'string' },//顾客
      bookTime: { type: 'datetime' },//下单时间
      payTime: { type: 'datetime' },//付款时间
      deliveryTime: { type: 'datetime' },//要求送货时间
      payMode: { type: 'string' },//支付方式
      isUrgent: { type: 'string' },//加急标识
      buyerMsg: { type: 'string' },//买家留言
      sellerRemark: { type: 'string' },//卖家备注
      totalNum: { type: 'float' },//总数量
      totalFee: { type: 'float' },//总金额
      freight: { type: 'float' },//运费
      isAllowSplit: { type: 'string' },//是否允许拆单发货
      isLock: { type: 'string' },//冻结标识
      pkOrg: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"商品列表"}'
      },  //组织主键
      isSync: { type: 'string' },//是否已同步到B2B
      //以下是收货人信息
      receiverName: { type: 'string' },//收货人
      receiverTel: { type: 'string' },//收货人电话
      receiverPhone: { type: 'string' },//收货人手机
      receiverProvince: { 
      	  type: 'string',
      		"refmodel": JSON.stringify(refinfo['region']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
          "refparam":'{"EQ_areaLevel":"2"}'
      },//收货省
      receiverCity: { 
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['region']),
	      "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        "refparam":'{"EQ_areaLevel":"3"}'
      },//收货市
      receiverDistrict: { 
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['region']),
	      "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        "refparam":'{"EQ_areaLevel":"4"}'
      },//收货区
      receiverTown: { 
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['region']),
	      "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        "refparam":'{"EQ_areaLevel":"5"}'
      	},//收货镇
      receiverAddress: { type: 'string' },//收货详细地址
    }
  }

  //产品信息
  window.productMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.SupplierOrderProductsDto"
    },
    meta: {
      id: { type: "string" },   //
      productCode: { type: "string" },   //产品编码
      productName: { type: "string" },   //产品名称
      suplierCode: { type: "string" },   //产品编码
      suplierName: { type: "string" },   //供应商产品名称 
      buyNum: { type: "float" },   //购买数量
      price: { type: "float" },   //采购单价
      totalmny: { type: "float" },   //小计金额 
      sendNum: { type: "float" },//发货数量
      sendTotalmny: { type: "float" },//发货金额
      remark: { type: "string" },//备注
      waybillNo: { type: "string" },//快递单号
      returnNum: { type: "float" },//已关闭数量
      //poBillNo: { type: "string" },//采购订单号
      //soBillNo: { type: "string" },//销售订单号
      //isLock: { type: "string" },//冻结标识
    },
    pageSize: 10
  }
  //操作日志
  window.logMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.SupplierOrderLogDto"
    },
    meta: {
      id: { type: "string" },   //ID
      operateType: { type: "string" },   //操作
      operateContent: { type: "string" },   //操作内容
      operator: { type: "string" },   //操作人
      operationTime: { type: "datetime" },   //操作时间
      creator: { type: "string" },   //创建人
      creationTime: { type: "datetime" },   //创建时间
    },
    pageSize: 10
  }

  //产品搜索数据模型
  window.productSearchParammeta = {
    meta: {
      //产品编码
      productCode: { type: 'string' },
      // 产品描述
      productName: { type: 'string' },
      // 系列名称
      productSeriesName: { type: 'string' }
    }
  }
  //产品数据模型
  window.specialproductmeta = {
    params: {
      "cls": "com.yonyou.ocm.base.service.dto.ProductInfoDto"
    },
    meta: {
      id: { type: 'string' },
      //编码
      code: { type: 'string' },
      // 名称
      name: { type: 'string' },
      // 描述
      description: { type: 'string' },
      // 系列名称
      saleSeriesName: { type: 'string' },
      // 方量
      cubage: { type: 'float' },
      // 重量
      roughWeight: { type: 'float' },
      // 单价
      dealPrice: { type: 'float' },
      // 数量
      reqQuantity: { type: 'integer' },
      // 总金额
      totalAmount: { type: 'float' },
      // 总方量
      totalVolume: { type: 'float' },
      // 总重量
      totalWeight: { type: 'float' }
    },
    pageSize: 5
  }

  //订单搜索数据模型
  window.orderSearchParammeta = {
    meta: {
      //平台单号
      pcode: { type: 'string' },
      // 顾客信息
      buyer: { type: 'string' },
      // 付款时间
      payTime: { type: 'string' }
    }
  }

  //订单列表
  window.orderMeta = {
    params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.OrderDto"
    },
    meta: {
      id: { type: 'string' },//id
      dr: { type: 'integer' },//dr
      ts: { type: 'datetime' },//ts
      creator: { type: 'string' },
      creationTime: { type: 'datetime' },
      modifier: { type: 'string' },
      modifiedTime: { type: 'datetime' },
      code: { type: 'string', required: true },//电商订单号
      pcode: { type: 'string', required: true },//平台订单号
      billStatus: { type: 'string' },//订单状态
      buyer: { type: 'string' },//顾客
      orderReceiverName: { type: 'string' },//收货人姓名
      orderReceiverPhone: { type: 'string' },//联系电话
      orderReceiverProvince: { type: 'string' },//省
      orderReceiverCity: { type: 'string' },//市
      orderReceiverDistrict: { type: 'string' },//区
      orderReceiverTown: { type: 'string' },//街道
      orderReceiverAddress: { type: 'string' },//收货地址
      bookTime: { type: 'datetime' },//下单时间
      payTime: { type: 'datetime' },//付款时间
      logisticsMode: { type: 'string' },//物流方式
      logisticsName: { type: 'string' },//快递公司
      waybillNo: { type: 'string' },//快递单号
      logisticsInfo: { type: 'string' },//快递其他信息
    },
    pageSize: 5,
    //是否启用前端缓存
    // pageCache: true
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