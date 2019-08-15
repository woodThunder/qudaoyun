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
          deliveryWarning: {
            type: 'string'
          },
          auditWarning: {
            type: 'string'
          },
          orderType: {
            type: 'string',
          }, //订单类型
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
      //商品信息
      goodsMeta: {
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
          receivablePriceUntil: {
            type: "float"
          },
          applyNum: {
            type: "string"
          }, //申请退款数量
          applyFee: {
            type: "integer"
          }, //申请退款金额
        },
        pageSize: 10,
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
          }, //顾客ID
          receivableFee: {
            type: "float"
          }, // 成交金额
          linkFee: {
            type: "float"
          }, //关联金额
        }
      },
      //产品信息
      productMeta: {
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
          customerName: {
            type: "string"
          }, //经销商
          downStreamOrderCode: {
            type: "string"
          }, //下游单据号
          takeUpNumber: {
            type: 'BigDecimal'
          }, //预占数量
          takeUpStatus: {
            type: 'integer'
          }, //预占状态
          warehouseName: {
            type: "string"
          }, //仓库名称
          supplierName: {
            type: 'string'
          }, //供应商名称
          changedLogisticsCompanyName: {
            type: "string"
          }, //指定物流公司
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
      orderSignRef: {
        meta: {
          ordersignref: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['ordersign']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false, "defaultFieldCount":2,"strFieldCode":["refname","describe"],"strFieldName":["名称", "描述"]}',
          }
        }
      }
    },
    searchs: {
      search1: [{
        type: "text",
        key: "pcode",
        label: "平台单号"
      }, {
        type: "text",
        key: "code",
        label: "电商单号"
      }, {
        type: "refer",
        key: "platform--id",
        label: "三方平台",
        refinfo: "b2cplatform",
        refName: "所属平台",
        multi: true,
        opr: "IN",
      }, {
        type: "text",
        key: "buyer",
        label: "买家账号"
      }, {
        type: "text",
        key: "orderReceiver--receiver",
        label: "收货人"
      }, {
        type: "text",
        key: "orderReceiver--receiverPhone",
        label: "收货人手机"
      }, {
        type: "text",
        key: "orderReceiver--receiverAddress",
        label: "收货详细地址"
      }, {
        type: "daterange",
        key: "deliverTime",
        label: "发货时间"
      }, {
        type: "daterange",
        key: "auditTime",
        label: "审核时间"
      }, {
        type: "daterange",
        key: "payTime",
        label: "付款时间"
      }, {
        type: "text",
        key: "store--name",
        label: "店铺名称"
      }, {
        type: "refer",
        key: "serviceProvider",
        label: "服务商",
        refinfo: "customers",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_isServiceProvider": "1"
        },
        multi: true,
        opr: "IN",
      }, {
        type: "radio",
        key: "isLock",
        label: "冻结状态",
        // defaultvalue:"",
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
        //    }, {
        //      type: "checkboxlist",
        //      key: "platformBillStatus",
        //      label: "平台状态",
        //      dataSource: [{
        //        value: '01',
        //        name: '待发货'
        //      }, {
        //        value: '02',
        //        name: '已发货'
        //      }, {
        //        value: '03',
        //        name: '交易完成'
        //      }],
        //      cls: "ui-checkboxes-item"
      }, {
        type: "checkboxlist",
        key: "orderType",
        label: "订单类型",
        dataSource: [{
          value: '0',
          name: '普通商品'
        }, {
          value: '1',
          name: '运费链接'
        }, {
          value: '2',
          name: '补差链接'
          //      }, {
          //        value: '4',
          //        name: '换购链接'
        }],
        cls: "ui-checkboxes-item"
      }, {
        type: "checkboxlist",
        key: "billStatus",
        label: "订单状态",
        dataSource: [{
          value: '04',
          name: '已审核'
        }, {
          value: '05',
          name: '已财审'
        }],
        cls: "ui-checkboxes-item"
      }, {
        type: "checkboxlist",
        key: "logisticsMode",
        label: "物流方式",
        dataSource: [
		{ value: '1',
          name: ''
		},{
          value: '2',
          name: '快递配送'
        }, {
          value: '3',
          name: '服务商配送'
        }, {
          value: '4',
          name: '供应商直发'
        }, {
          value: '5',
          name: '经销商订单'
        }, ],
        cls: "ui-checkboxes-item"
      }, {
        type: "radio",
        key: "isException",
        label: "异常状态",
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
      }]
    },
    buttons: {
      button1: [{
        key: "financeAuditClick",
        label: "财审",
        iconCls: "icon-tubiao-shenhe",
        click: "financeAuditClick"
      }, {
        key: "cancelFinanceAuditClick",
        label: "取消财审",
        iconCls: "icon-tubiao-shenhe",
        click: "cancelFinanceAuditClick"
      }],
    },
    dialogs: {
      dialog1: [{
        type: "text",
        key: "code",
        label: "订单类型编码",
        disableInEdit: true
      }, {
        type: "text",
        key: "name",
        label: "订单类型名称",
      }, {
        type: "label",
        key: "isEnable",
        label: "启用状态",
        defaultvalue: 1
      }]
    },
    details: {
      detail1: [{
        key: "pcode",
        label: "平台单号",
      }, {
        key: "platformName",
        label: "平台名称"
      }, {
        key: "storeName",
        label: "店铺名称",
      }, {
        key: "platformBillStatus",
        label: "平台状态",
        computed: "enableFmt"
      }, ],
      detail2: [{
        key: "code",
        label: "电商单号",
      }, {
        key: "orderType",
        label: "订单类型",
        computed: "ordrTypeList"
      }, {
        key: "logisticsMode",
        label: "物流方式",
        computed: "logistics",
      }, {
        key: "serviceMode",
        label: "配送方式",
        computed: "deliveryModeList"
      }, {
        key: "billStatus",
        label: "订单状态",
        computed: "orderStatusList"
      }, {
        key: "serviceProviderName",
        label: "服务商"
      }, {
        key: "isSplitDispatch",
        label: "拆单标识",
        computed: "splitDispatchList"
      }, {
        key: "isUrgent",
        label: "加急标识",
        computed: "urgentList"
      }, {
        key: "isException",
        label: "异常标识",
        computed: "exceptionStatusList"
      }, {
        key: "exceptionType",
        label: "异常原因",
        attr: {
          title: "exceptionType"
        }
      }, {
        key: "isLock",
        label: "冻结标识",
        computed: "lockStatusList"
      }, {
        key: "lockReason",
        label: "冻结原因",
        attr: {
          title: "lockReason"
        }
      }, {
        key: "orderSource",
        label: "订单来源",
        computed: "orderSourceList"
      }, {
        key: "payMode",
        label: "支付方式"

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
        key: "logisticsName",
        label: "快递公司名称",
      }, {
        key: "waybillNo",
        label: "快递单号"
      }, {
        key: "sendStatus",
        label: "发货状态",
        computed: "sendStatusList"
      }, {
        key: "isDelay",
        label: "延期发货标识"
      }, {
        key: "delayTimes",
        label: "延期发货次数",
      }, {
        key: "delayDays",
        label: "延期发货总天数"
      }, {
        key: "belongOfficeName",
        label: "组织",
      }, {
        key: "issynsuccess",
        label: "已同步平台发货状态",
        computed: "synsuccessList"
      }, {
        key: "synmsg",
        label: "同步平台发货状态反馈"
      }, ],
      detail3: [{
        key: "buyer",
        label: "买家账号"
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
        label: "收货区/县"
      }, {
        key: "orderReceiverTownName",
        label: "收货街道/镇",
      }, {
        key: "orderReceiverAddress",
        label: "收货详细地址",
        attr: {
          title: "orderReceiverAddress"
        }
      }, ],
      detail4: [
        // {
        //  key: "shiptopartyName",
        //  label: "服务商网点",
        // }, 
        {
          key: "freightOrderFee",
          label: "关联运费",
        }, {
          key: "totalReceivableFee",
          label: "总成交金额"
        }, {
          key: "totalClosedFee",
          label: "总关闭金额"
        },
      ]
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
          "onBeforeClickFun": "detail"
        },
        columns: [{
          "field": "orderSignColor",
          "dataType": "String",
          "title": "标记",
          "renderType": "flagReplace",
          "width": "50px",
        }, {
          "field": "orderSource",
          "dataType": "String",
          "title": "来源",
          "editOptions": {
            "type": "combo",
            "datasource": "orderSourceSrc"
          },
          "renderType": "comboRender",
          "width": "50px",
        }, {
          "field": "platformName",
          "dataType": "String",
          "title": "平台",
          "width": "50px",
        }, {
          "field": "storeName",
          "dataType": "String",
          "title": "店铺",
        }, {
          "field": "pcode",
          "dataType": "String",
          "title": "平台单号",
        }, {
          "field": "code",
          "dataType": "String",
          "title": "电商单号",
          "width": "130px",
        }, {
          "field": "orderType",
          "dataType": "String",
          "title": "订单类型",
          "editOptions": {
            "type": "combo",
            "datasource": "orderTypeSrc"
          },
          "renderType": "comboRender",
          "width": "80px",
        }, {
          "field": "billStatus",
          "dataType": "String",
          "title": "订单状态",
          "editOptions": {
            "type": "combo",
            "datasource": "orderStatusSrc"
          },
          "renderType": "comboRender",
          "width": "80px",
        }, {
          "field": "isException",
          "dataType": "Integer",
          "title": "异常",
          "editOptions": {
            "type": "combo",
            "datasource": "exceptionStatusSrc"
          },
          "renderType": "comboRender",
          "width": "50px",
        }, {
          "field": "exceptionType",
          "dataType": "String",
          "title": "异常原因"
        }, {
          "field": "auditWarning",
          "dataType": "String",
          "title": "审核预警",
          "editOptions": {
            "type": "combo",
            "datasource": "deliveryWarn"
          },
          "renderType": "comboRender",
        }, {
          "field": "deliveryWarning",
          "dataType": "String",
          "title": "发货预警",
          "editOptions": {
            "type": "combo",
            "datasource": "deliveryWarn"
          },
          "renderType": "comboRender",
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
          "renderType": "comboRender",
          "width": "80px",
        }, {
          "field": "isLock",
          "dataType": "String",
          "title": "冻结",
          "renderType": "lockRender",
          "width": "50px",
        }, {
          "field": "lockReason",
          "dataType": "String",
          "title": "冻结原因"
        }, {
          "field": "buyer",
          "dataType": "String",
          "title": "买家账号"
        }, {
          "field": "bookTime",
          "dataType": "Datetime",
          "title": "下单时间",
          "width": "130px",
        }, {
          "field": "payTime",
          "dataType": "Datetime",
          "title": "付款时间",
          "width": "130px",
        }, {
          "field": "isUrgent",
          "dataType": "String",
          "title": "加急",
          "renderType": "urgentStatusGrid",
          "width": "50px",
        }, {
          "field": "deliveredTogether",
          "dataType": "String",
          "title": "合并发货",
          "renderType": "deleverTogether",
          "width": "80px",
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
        }, ]
      },
      grid2: {
        domid: "grid_goods_dom",
        umeta: {
          "id": "grid_goods",
          "data": "goodsList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "serialnum",
          "dataType": "String",
          "title": "行号",
          "width": "50px",
          //     }, {
          //        "field": "goodsId",
          //        "dataType": "String",
          //        "title": "商品主键",
          //        "visible": false
        }, {
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          "width": "200px",
        }, {
          "field": "deliveryWarning",
          "dataType": "String",
          "title": "发货预警",
          "editOptions": {
            "type": "combo",
            "datasource": "deliveryWarn"
          },
          "renderType": "comboRender",
        }, {
          "field": "buyNum",
          "dataType": "Float",
          "title": "购买数量",
        }, {
          "field": "price",
          "dataType": "Float",
          "title": "吊牌价",
        }, {
          "field": "discountFee",
          "dataType": "Float",
          "title": "优惠金额",
        }, {
          "field": "adjustFee",
          "dataType": "Float",
          "title": "手工调整金额",
          "editType": "float",
        }, {
          "field": "receivableFee",
          "dataType": "Float",
          "title": "成交金额",

        }, {
          "field": "receivablePriceUntil",
          "dataType": "Float",
          "title": "成交单价",
          "editable": false,
          "renderType": "precision2Render"
        }, {
          "field": "limitPrice",
          "dataType": "Float",
          "title": "最低零售价",
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
          "field": "closeNum",
          "dataType": "Float",
          "title": "关闭数量",
        }, {
          "field": "closedFee",
          "dataType": "Float",
          "title": "关闭金额",
          "editable": false
        }, {
          "field": "sendNum",
          "dataType": "Float",
          "title": "发货数量",
        }, {
          "field": "returnNum",
          "dataType": "Float",
          "title": "退货数量",
        }, {
          "field": "returnFee",
          "dataType": "Float",
          "title": "退款金额",
        }, {
          "field": "applyNum",
          "dataType": "Float",
          "title": "申请退货数量",
        }, {
          "field": "applyFee",
          "dataType": "Float",
          "title": "申请退款金额",
          //        }, {
          //        "field": "combineGoodsId",
          //        "dataType": "String",
          //        "title": "商品组合主键",
          //        "visible": false
        }, {
          "field": "combineGoodsCode",
          "dataType": "String",
          "title": "商品组合编码",
        }, {
          "field": "combineGoodsName",
          "dataType": "String",
          "title": "商品组合名称",
        }, {
          "field": "combineGoodsNum",
          "dataType": "Float",
          "title": "商品组合数量",
        }, {
          "field": "goodsNumRate",
          "dataType": "Float",
          "title": "商品组合数量比",
          //        }, {
          //        "field": "warehouseId",
          //        "dataType": "String",
          //        "title": "仓库ID",
          //        "visible": false
          //        }, {
          //        "field": "warehouseCode",
          //        "dataType": "String",
          //        "title": "仓库编码",
        }, {
          "field": "warehouseName",
          "dataType": "String",
          "title": "仓库",
        }, {
          "field": "takeUpNumber",
          "dataType": "Float",
          "title": "预占数量",
        }, {
          "field": "takeUpStatus",
          "dataType": "String",
          "title": "预占状态",
        }, {
          "field": "takeUpDate",
          "dataType": "Date",
          "title": "预占时间",
          //        }, {
          //        "field": "customerId",
          //        "dataType": "String",
          //        "title": "经销商id",
          //        "visible": false
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "经销商",
          //        }, {
          //        "field": "supplierCode",
          //        "dataType": "String",
          //        "title": "供应商编码",
        }, {
          "field": "supplierName",
          "dataType": "String",
          "title": "供应商",
        }, {
          "field": "downStreamOrderCode",
          "dataType": "String",
          "title": "下游单据号",
          //        }, {
          //        "field": "isPushDownStreamOrder",
          //        "dataType": "String",
          //        "title": "已推送下游订单",
        }, {
          "field": "deliveredTogether",
          "dataType": "String",
          "title": "合并发货号",
        }, {
          "field": "deliveredTogetherStatus",
          "dataType": "String",
          "title": "合并发货状态",
        }, {
          "field": "interceptDownStreamOrder",
          "dataType": "String",
          "title": "截单状态",
        }, {
          "field": "interceptfailReason",
          "dataType": "String",
          "title": "截单失败原因",
          "width": "150px"
        }, ]
      },
      grid3: {
        domid: "grid_productAll_dom",
        umeta: {
          "id": "grid_productAll",
          "data": "productAllList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "serialnum",
          "dataType": "String",
          "title": "行号",
          "width": "50px",
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
          "title": "购买数量",
          //      }, {
          //        "field": "purchaseNum",
          //        "dataType": "Float",
          //        "title": "采购量",
          //      }, {
          //        "field": "takeupNum",
          //        "dataType": "Float",
          //        "title": "渠道库存占用量",
          //      }, {
          //        "field": "soNum",
          //        "dataType": "Float",
          //        "title": "开单数量",
          //      }, {
          //        "field": "soDistNum",
          //        "dataType": "Float",
          //        "title": "配车数量",
        }, {
          "field": "soSendNum",
          "dataType": "Float",
          "title": "发货数量",
          //      }, {
          //        "field": "storePlanNum",
          //        "dataType": "Float",
          //        "title": "排工数量",
          //      }, {
          //        "field": "storeSendNum",
          //        "dataType": "Float",
          //        "title": "出库数量",
          //      }, {
          //        "field": "storeFinishNum",
          //        "dataType": "Float",
          //        "title": "完工数量",
        }, {
          "field": "closeNum",
          "dataType": "Float",
          "title": "关闭数量",
          //      }, {
          //        "field": "poBillNo",
          //        "dataType": "Float",
          //        "title": "采购单号",
          //      }, {
          //        "field": "isOwn",
          //        "dataType": "String",
          //        "title": "是否欠件",
          //        "renderType": "ownRender"
        }, {
          "field": "downStreamOrderCode",
          "dataType": "string",
          "title": "下游单据号"
        }, {
          "field": "warehouseName",
          "dataType": "string",
          "title": "仓库"
        }, {
          "field": "takeUpNumber",
          "dataType": "BigDecimal",
          "title": "预占数量",
        }, {
          "field": "takeUpStatus",
          "dataType": "Integer",
          "title": "预占状态",
          "renderType": "hastacked"

        }, {
          "field": "customerName",
          "dataType": "string",
          "title": "经销商"
        }, {
          "field": "supplierName",
          "dataType": "string",
          "title": "供应商"
        }, {
          "field": "deliveredTogether",
          "dataType": "String",
          "title": "合并发货",
          "renderType": "deleverTogether"
        }, ]
      },
      grid4: {
        domid: "grid_prom_dom",
        umeta: {
          "id": "grid_prom",
          "data": "promList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
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
          //      }, {
          //        "field": "rebateStatus",
          //        "dataType": "datetime",
          //        "title": "返现状态",
          //        "renderType": "rebateStatusRender"
          //      }, {
          //        "field": "promEndTime",
          //        "dataType": "String",
          //        "title": "活动结时间",
        }, {
          "field": "promotionFee",
          "dataType": "String",
          "title": "优惠金额",
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
          "width": "150px"
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
          "showNumCol": true
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
          "title": "电商单号",
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
          "title": "商品组合编码",
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品组合名称",
          "width": "150px"
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
          "showNumCol": true
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
          "showNumCol": true
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品组合编码",
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
          "title": "购买数量",
          //      }, {
          //        "field": "soNum",
          //        "dataType": "Float",
          //        "title": "开单数量",
          //      }, {
          //        "field": "soDistNum",
          //        "dataType": "Float",
          //        "title": "配车数量",
        }, {
          "field": "soSendNum",
          "dataType": "Float",
          "title": "发货数量",
          //      }, {
          //        "field": "storePlanNum",
          //        "dataType": "Float",
          //        "title": "排工数量",
          //      }, {
          //        "field": "storeSendNum",
          //        "dataType": "Float",
          //        "title": "出库数量",
          //      }, {
          //        "field": "storeFinishNum",
          //        "dataType": "Float",
          //        "title": "完工数量",
        }, {
          "field": "closeNum",
          "dataType": "Float",
          "title": "关闭数量",
          //      }, {
          //        "field": "poBillNo",
          //        "dataType": "String",
          //        "title": "采购单号",
          //      }, {
          //        "field": "isOwn",
          //        "dataType": "String",
          //        "title": "是否欠件",
          //        "renderType": "ownRender"
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
        domid: "grid_remark_3_dom",
        umeta: {
          "id": "grid_remark_3",
          "data": "commentList3",
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
    }
  }
  return new basemodel(model);
})