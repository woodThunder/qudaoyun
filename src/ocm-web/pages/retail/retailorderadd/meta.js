define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      //订单列表
      orderMeta: {
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
          shopId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['shopref']),
            "refcfg": '{"ctx":"/uitemplate_web","refname":"门店"}',
            required: true
          }, //门店
          shopName: {
            type: "string"
          }, //门店
          close: {
            type: "integer"
          }, //订单关闭
          code: {
            type: 'string',
            required: true
          }, //电商订单号/退货申请单号/零售单号
          retailOrderCode: {
            type: 'string',
            // required: true
          }, //零售订单号（友零售系统订单号，外部平台订单号）
          trantypeCode: {
            type: 'string',
            required: true
          }, //交易类型
          // trantypeName: {
          //   type: 'string',
          //   required: true
          // }, //交易类型
          documentDate: {
            type: 'datetime',
            required: true
          }, //单据日期
          preOrderStatus: {
            type: 'string',
            required: true
          }, //
          pkOrgId: {
            type: "string",
            required: true
          }, // 销售组织
          pkOrgCode: {
            type: "string"
          },
          pkOrgName: {
            type: "string"
          },
          salesDepartmentId: {
            type: "string",
            required: true
          }, // 销售部门
          salesDepartmentName: {
            type: "string"
          }, // 销售部门
          clerkId: {
            type: "string",
            required: true
          }, // 店员编码
          clerkName: {
            type: "string"
          }, // 店员编码
          expectedArrivalDate: {
            type: 'datetime',
          }, //期望到货时间
          sellerRemark: {
            type: "string"
          }, //卖家备注/ 备注
          deliveryStatus: {
            type: "string",
            required: true
          }, //交货状态
          salesModelCode: {
            type: "string",
            required: true
          }, //销售模式
          deliveryStatusCode: {
            type: "string",
            required: true
          }, //交货状态
          serviceMode: {
            type: "string",
            required: true
          }, //提货方式          
          deliveryStatusName: {
            type: "string",
            required: true
          }, //交货状态
          pcode: {
            type: 'string',
            required: true,
            maxLength: 30
          }, //平台订单号
          deliveryWarning: {
            type: 'string'
          },
          auditWarning: {
            type: 'string'
          },
          orderSource: {
            type: 'string',
            required: true
          }, //订单来源
          orderType: {
            type: 'string'
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
            type: 'string',
            required: true,
            maxLength: 30
          }, //顾客
          bookTime: {
            type: 'datetime',
            required: true
          }, //下单时间
          payTime: {
            type: 'datetime',
            required: true
          }, //付款时间
          deliveryTime: {
            type: 'datetime'
          }, //要求送货时间
          logisticsMode: {
            type: 'string'
          }, //物流方式
          serviceMode: {
            type: 'string',
            required: true
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
            type: 'string',
            required: true
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
            type: 'string',
            maxLength: 100
          }, //异常原因
          isUrgent: {
            type: 'integer'
          }, //加急标识
          isPromo: {
            type: 'integer'
          }, //已促销
          buyerMsg: {
            type: 'string',
            maxLength: 600
          }, //买家留言
          sellerRemark: {
            type: 'string',
            maxLength: 600
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
            "refcfg": '{"ctx":"/uitemplate_web","refName":"销售组织"}',
            "refparam": '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}'
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
            type: 'string',
            required: true,
            maxLength: 30
          }, //收货人姓名
          orderReceiverPhone: {
            type: 'string',
            required: true,
            validType: "phone"
          }, //联系手机
          orderReceiverTel: {
            type: 'string'
          }, //联系电话
          orderReceiverProvince: { //注册所在省份ID
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_isEnable":"1","EQ_areaLevel":"1"}' //,"EQ_country.id":"8dc2fc87-0a4f-420b-8d1a-b74b1278f24b"}'
          },
          orderReceiverProvinceName: {
            type: 'string'
          }, //
          orderReceiverCity: { //注册所在城市ID
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"2"}'
          },
          orderReceiverCityName: {
            type: 'string'
          }, //
          orderReceiverDistrict: { //注册所在县ID
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"3"}'
          },
          orderReceiverDistrictName: {
            type: 'string'
          }, //
          orderReceiverTown: { //注册所在街道/镇Id
            type: 'string',
            // required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"4"}'
          },
          orderReceiverTownName: {
            type: 'string'
          }, //
          orderReceiverZipCode: {
            type: 'string'
          }, //
          orderReceiverAddress: {
            type: 'string',
            required: true,
            maxLength: 100
          }, //收货地址
          shiptopartyId: {
            type: 'string'
          }, //送达方
          lockReason: {
            type: 'string',
            maxLength: 100
          }, //冻结原因
          platformBillStatus: {
            type: 'string',
            required: true
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
      },

      //商品信息
      goodsMeta: {
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
            required: true
          }, //商品编码
          skuName: {
            type: "string",
            required: true
          }, //商品名称
          unitId: {
            type: "string",
            required: true
          }, //计量单位 , 单位
          unitCode: {
            type: "string",
          }, //计量单位 , 单位
          unitName: {
            type: "string",
          }, //计量单位 , 单位
          buyNum: {
            type: "numberFloat",
            regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            default: 1,
            required: true
          }, //购买数量 数量
          sendNum: {
            type: "numberFloat",
            required: true
          }, //出库数量，累积出库数量
          deliveryQty: {
            type: "numberFloat",
            required: true
          }, //累计送装数量
          returnReason: {
            type: "string",
          }, //退货原因
          returnNum: {
            type: "float"
          }, // 退货数量
          closeNum: {
            type: "float"
          }, // 关闭数量
          price: {
            type: "priceFloat",
            regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            default: 0,
            required: true
          }, //单价
          discount: {
            type: "amountFloat",
            regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            default: 0,
            required: true
          }, //折扣金额
          bediscount: {
            type: "amountFloat",
            regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            default: 0,
            required: true
          }, //折扣前金额
          count: {
            type: "priceFloat",
            regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            default: 0,
            required: true
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
            type: "float",
            regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            default: 0
          }, //成交金额
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
          isGift: {
            type: "integer"
          }, //是否赠品
          shipStockOrgId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"发货库存组织" }',
            refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          }, //发货库存组织
          warehouseName: {
            type: "string",
          }, //发货库存组织
          shipments: {
            type: "numberFloat",
            required: true
          }, //累计发货数量
          adjustFee: {
            type: "integer"
          }, //手工调整金额
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
          isVir: {
            type: 'string'
          }, //虚拟商品
          limitPrice: {
            type: 'string'
          }, //最低零售价
          logisticsMode: {
            type: 'string'
          }, //物流方式
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
          porderGoodsId: {
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
            type: "float"
          }, //申请退款数量
          applyFee: {
            type: "float"
          }, //申请退款金额
          combineGoodsId: {
            type: 'string'
          }, //电商商品主键
          combineGoodsCode: {
            type: 'string'
          }, //电商商品编码
          combineGoodsName: {
            type: 'string'
          }, //电商商品名称
          combineGoodsNum: {
            type: "float"
          }, //电商商品数量
          goodsNumRate: {
            type: "float"
          }, //商品数量比
        }
      },

      //促销信息
      promMeta: {
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
          buyerPhone: {
            type: "integer"
          }, //顾客电话
          receivableFee: {
            type: "amountFloat"
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
      },
      // 商品参照
      ProductRef: {
        meta: {
          productRefer: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods-no-version']),
            'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isEnable":"1","EQ_isOnSle":"1"}'
          }
        }
      },
      // 商品组合参照
      CombineProductRef: {
        meta: {
          combineProductRefer: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['Combination']),
            'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
          }
        }
      },
      //操作日志
      logMeta: {
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

    },
    searchs: {
      search1: [{
        type: "text",
        key: " retailOrderCode",
        label: "友零售单号"
      }, {
        type: "text",
        key: "code",
        label: "零售单号"
      }, {
        type: "refer",
        key: "shop--id",
        label: "门店",
        refinfo: "shopref",
        refName: "门店",
        multi: true,
        opr: "IN",
      }, {
        type: "text",
        key: "orderReceiverId",
        label: "收货人"
      }, {
        type: "daterange",
        key: "documentDate",
        label: "单据日期"
      }, {
        type: "combo",
        key: "preOrderStatus",
        label: "预订单状态",
        dataSource: [{
          value: '0',
          name: '现销'
        }, {
          value: '1',
          name: '预定'
        }, {
          value: '2',
          name: '退订'
        }, {
          value: '3',
          name: '交货'
        }, {
          value: '4',
          name: '已退订'
        }, {
          value: '5',
          name: '交货'
        }],
        // cls: "ui-checkboxes-item"
      }, {
        type: "combo",
        key: "trantypeCode",
        label: "交易类型",
        dataSource: [{
          value: '0',
          name: '中台零售单交易类型'
        }, {
          value: '01',
          name: '现销'
        }, {
          value: '02',
          name: '预定'
        }],
        cls: "ui-checkboxes-item"
      }, {
        type: "checkboxlist",
        key: "billStatus",
        label: "订单状态",
        dataSource: [{
          value: '0',
          name: '待发货'
        }, {
          value: '02',
          name: '已发货'
        }, {
          value: '03',
          name: '交易完成'
        }],
        cls: "ui-checkboxes-item"
      }, {
        type: "checkboxlist",
        key: "deliveryStatus",
        label: "交货状态",
        dataSource: [{
          value: '0',
          name: '未交货'
        }, {
          value: '1',
          name: '交货'
        }],
        cls: "ui-checkboxes-item"
      }, ],
    },
    buttons: {
      button1: [{
          key: "plus",
          label: "新增订单",
          iconCls: "icon-plus",
          click: "beforedit",
          clickArg: ["$data", -1]
        }, {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        }, {
          key: "confirm",
          label: "确认",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "confirm"
        },
        //  {
        //   key: "submit",
        //   label: "提交",
        //   iconCls: "icon-tubiao-shenhe",
        //   click: "submitBillBpm"
        // }, {
        //   key: "back",
        //   label: "收回",
        //   iconCls: "icon-tubiao-shenhe",
        //   click: "unsubmitBillList"
        // }, {
        //   key: "approve",
        //   label: "审批",
        //   iconCls: "icon-tubiao-shenhe",
        //   click: "approveBill"
        // }, {
        //   key: "unapprove",
        //   label: "取消审核",
        //   iconCls: "icon-tubiao-quxiaoshenhe",
        //   click: "unapproveBill"
        // }, {
        //   key: "pushbillsend",
        //   label: "推发货单",
        //   // iconCls: "icon-tubiao-shenhe",
        //   click: "pushbillsend"
        // }, {
        //   key: "pushsendbill",
        //   label: "推送装工单",
        //   // iconCls: "icon-tubiao-shenhe",
        //   click: "pushsendbill"
        // }, {
        //   key: "allbillclose",
        //   label: "整单关闭",
        //   // iconCls: "icon-tubiao-quxiaoshenhe",
        //   click: "allbillclose"
        // },
        //  {
        //   key: "import",
        //   label: "导入",
        //   iconCls: "icon-import",
        //   click: "importHandle"
        // }, {
        //   key: "export",
        //   label: "导出",
        //   iconCls: "icon-export",
        //   click: "exportHandle"
        // }
      ],
      button2: [{
        key: "cancel",
        label: "取消",
        iconCls: "ui-btn-primary",
        click: "cancelBill",
      }, {
        key: "save",
        label: "保存",
        iconCls: "ui-btn-green",
        click: "saveBill"
      }, ],
      button3: [{
        key: "add",
        label: "商品",
        click: "addRow",
      }, {
        key: "addg",
        label: "商品组合",
        click: "addCombineRow"
      }, {
        key: "delRow",
        label: "删行",
        click: "delRow"
      }, ]
    },
    cards: {
      card1: [{
          type: "refer",
          key: "shopId",
          label: "门店",
          refinfo: "shopref",
        }, {
          type: "text",
          key: "code",
          label: "零售单号",
        }, {
          type: "text",
          key: "retailOrderCode",
          label: "外部平台订单号",
        }, {
          type: "combo",
          key: "trantypeCode",
          label: "交易类型",
          dataSource: [{
            value: '0',
            name: '中台零售单交易类型'
          }, {
            value: '01',
            name: '现销'
          }, {
            value: '02',
            name: '预定'
          }],
        }, {
          type: "combo",
          key: "salesModelCode",
          label: "销售模式",
          dataSource: [{
            value: "0",
            name: "现销销售模式"
          }, {
            value: "1",
            name: "预订销售模式"
          }]
        }, {
          type: "date",
          key: "documentDate",
          label: "单据日期",
          enable: false
        }, {
          type: "refer",
          key: "pkOrgId",
          label: "销售组织",
          enable: false
        },
        //  {
        //   type: "refer",
        //   key: "salesDepartmentId",
        //   label: "销售部门",
        //   refinfo: "department",
        //   refName: "销售部门",
        //   // enable: false
        // },
        {
          type: "refer",
          key: "clerkId",
          label: "店员编码",
          refinfo: "channel-person",
        }, {
          type: "date",
          key: "expectedArrivalDate",
          label: "期望到货时间",
        }, {
          type: "combo",
          key: "billStatus",
          label: "订单状态",
          dataSource: [{
            value: "01",
            name: "暂存"
          }, {
            value: "02",
            name: "未处理"
          }, {
            value: "03",
            name: "未审核"
          }, {
            value: "04",
            name: "已审核"
          }, {
            value: "05",
            name: "已财审"
          }, {
            value: "06",
            name: "已发货"
          }, {
            value: "07",
            name: "已完成"
          }, {
            value: "08",
            name: "已关闭"
          }, {
            value: "09",
            name: "已拆分"
          }, {
            value: "10",
            name: "退货入库"
          }, ],
          enable: false
        }, {
          type: "text",
          key: "preOrderStatusCode",
          label: "零售单状态",
          // dataSource: [{
          //   value: "0",
          //   name: "现销"
          // }, {
          //   value: "1",
          //   name: "预定"
          // }, {
          //   value: "2",
          //   name: "退定"
          // }, {
          //   value: "3",
          //   name: "交货"
          // }, {
          //   value: "4",
          //   name: "预定退定"
          // }, {
          //   value: "5",
          //   name: "预定交货"
          // }, {
          //   value: "6",
          //   name: "售后状态"
          // }],
          enable: false
        }, {
          type: "combo",
          key: "deliveryStatusCode",
          label: "交货状态",
          dataSource: [{
            value: '0',
            name: '未交货'
          }, {
            value: '1',
            name: '交货'
          }],
          defaultvalue: "0",
          enable: false
        }, {
          type: "radio",
          key: "close",
          label: "订单关闭",
          dataSource: [{
            value: '0',
            name: '否'
          }, {
            value: '1',
            name: '是'
          }],
          defaultvalue: '0'
        }, {
          type: "text",
          key: "buyer",
          label: "顾客",
        }, {
          type: "text",
          key: "buyerPhone",
          label: "顾客电话",
          validType: "phone"
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
          domid: "city",
          opr: 'IN'
        }, {
          type: "refer",
          key: "orderReceiverDistrict",
          label: "收货区（县）",
          refinfo: "region",
          refName: "地区",
          multi: false,
          domid: "district",
          opr: 'IN'
        }, {
          type: "refer",
          key: "orderReceiverTown",
          label: "收货街（镇）",
          refinfo: "region",
          refName: "地区",
          multi: false,
          domid: 'town',
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
          type: "textarea",
          key: "sellerRemark",
          label: "卖家备注",
          cls: "ui-textarea-item"
        },
      ],
    },
    details: {
      detail1: [{
          key: "shopName",
          label: "门店",
        }, {
          key: "code",
          label: "零售单号",
        }, {
          key: "retailOrderCode",
          label: "外部平台订单号",
        }, {
          key: "trantypeCode",
          label: "交易类型",
          dataSource: [{
            value: '0',
            name: '中台零售单交易类型'
          }, {
            value: '01',
            name: '现销'
          }, {
            value: '02',
            name: '预定'
          }],
        }, {
          key: "salesModelCode",
          label: "销售模式",
          dataSource: "salesModelSrc"
        }, {
          key: "documentDate",
          label: "单据日期",
        }, {
          key: "pkOrgName",
          label: "销售组织",
        },
        // {
        //   key: "salesDepartmentName",
        //   label: "销售部门",
        // },
        {
          key: "clerkName",
          label: "店员编码",
        }, {
          key: "expectedArrivalDate",
          label: "期望到货时间",
        }, {
          key: "billStatus",
          label: "订单状态",
          dataSource: "orderStatusSrc",
        }, {
          key: "preOrderStatusCode",
          label: "零售单状态",
          dataSource: "saleBillStatus",
        }, {
          key: "deliveryStatusCode",
          label: "交货状态",
          dataSource: "deliveryStatusSrc"
        }, {
          key: "close",
          label: "订单关闭",
          computed: "isCloseCom"
        }, {
          key: "buyer",
          label: "买家账号",
        }, {
          key: "orderReceiverName",
          label: "收货人"
        }, {
          key: "orderReceiverPhone",
          label: "收货人手机",
        }, {
          key: "orderReceiverTel",
          label: "收货人电话",
        }, {
          key: "orderReceiverProvinceName",
          label: "收货省",
        }, {
          key: "orderReceiverCityName",
          label: "收货市"
        }, {
          key: "orderReceiverDistrictName",
          label: "收货区/镇",
        }, {
          key: "orderReceiverTownName",
          label: "收货街道/县",
        }, {
          key: "orderReceiverAddress",
          label: "收货详细地址",
        }, {
          key: "serviceMode",
          label: "配送方式",
          computed: "deliveryModeList"
        }, {
          key: "sellerRemark",
          label: "卖家备注",
        },
      ],
    },
    grids: {
      grid1: {
        domid: "grid_orderList_dom",
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
          "field": "shopName",
          "dataType": "String",
          "title": "门店"
        }, {
          "field": "code",
          "dataType": "String",
          "title": "零售单号"
        }, {
          "field": "retailOrderCode",
          "dataType": "String",
          "title": "外部平台订单号"
        }, {
          "field": "documentDate",
          "dataType": "Datetime",
          "title": "单据日期"
        }, {
          "field": "trantypeCode",
          "dataType": "String",
          "title": "交易类型",
          "editOptions": {
            "type": "combo",
            "datasource": [{
              value: '0',
              name: '中台零售单交易类型'
            }, {
              value: '01',
              name: '现销'
            }, {
              value: '02',
              name: '预定'
            }],
          },
          "renderType": "comboRender"
        }, {
          "field": "pkOrgName",
          "dataType": "String",
          "title": "销售组织",
        }, {
          "field": "salesDepartmentName",
          "dataType": "String",
          "title": "销售部门",
        }, {
          "field": "clerkName",
          "dataType": "String",
          "title": "店员编码",
        }, {
          "field": "expectedArrivalDate",
          "dataType": "Date",
          "title": "期望到货时间"
        }, {
          "field": "sellerRemark",
          "dataType": "String",
          "title": "备注",
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
          "field": "preOrderStatusCode",
          "dataType": "String",
          "title": "零售单状态",
          "editOptions": {
            "type": "combo",
            "datasource": "saleBillStatus"
          },
          "renderType": "comboRender"
        }, {
          "field": "deliveryStatusCode",
          "dataType": "String",
          "title": "交货状态",
          "renderType": "deliveryStatusSrc"
        }, {
          "field": "serviceMode",
          "dataType": "String",
          "title": "提货方式",
          "editOptions": {
            "type": "combo",
            "datasource": "serviceModeSrc"
          },
          "renderType": "comboRender"
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
          "dataType": "Datetime",
          "title": "修改时间",
          "visible": false
        }, {
          "field": "operation",
          "dataType": "String",
          "title": "操作",
          "renderType": "operation",
          "fixed": true
        }]
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
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码"
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称"
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "单位"
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "数量"
        }, {
          "field": "count",
          "dataType": "String",
          "title": "单价"
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额"
        }, {
          "field": "discount",
          "dataType": "String",
          "title": "折扣金额",
          "renderType": "precision2Render"
        }, {
          "field": "bediscount",
          "dataType": "String",
          "title": "折扣前金额"
        }, {
          "field": "isGift",
          "dataType": "String",
          "title": "是否赠品",
          "editable": false,
          "renderType": "isGiftRender"
        }, {
          "field": "warehouseName",
          "dataType": "String",
          "title": "发货库存组织",
        }, {
          "field": "warehouseName",
          "dataType": "String",
          "title": "仓库",
        }, {
          "field": "shipments",
          "dataType": "String",
          "title": "累计发货数量",
        }, {
          "field": "sendNum",
          "dataType": "String",
          "title": "累计出库数量",
        }, {
          "field": "deliveryQty",
          "dataType": "String",
          "title": "累计送装数量",
        }, {
          "field": "returnReason",
          "dataType": "String",
          "title": "退货原因",
        }, ]
      },
      grid3: {
        domid: "grid_log_dom",
        umeta: {
          "id": "grid_log",
          "data": "logList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true,
        },
        columns: [{
          "field": "operator",
          "dataType": "String",
          "title": "操作人"
        }, {
          "field": "operationTime",
          "dataType": "Datetime",
          "title": "操作时间"
        }, {
          "field": "operateType",
          "dataType": "String",
          "title": "操作类型"
        }, {
          "field": "operateContent",
          "dataType": "String",
          "title": "操作内容"
        }]
      },
      grid4: {
        domid: "grid_remark_1_dom",
        umeta: {
          "id": "grid_remark_1",
          "data": "commentList1",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true,
        },
        columns: [{
          "field": "creationTime",
          "dataType": "Datetime",
          "title": "时间"
        }, {
          "field": "creator",
          "dataType": "String",
          "title": "备注人"
        }, {
          "field": "commentTypes",
          "dataType": "String",
          "title": "备注类型"
        }, {
          "field": "commentInfo",
          "dataType": "String",
          "title": "备注内容"
        }]
      },
      grid5: {
        domid: "grid_remark_2_dom",
        umeta: {
          "id": "grid_remark_2",
          "data": "commentList1",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true,
        },
        columns: [{
          "field": "creationTime",
          "dataType": "Datetime",
          "title": "时间"
        }, {
          "field": "creator",
          "dataType": "String",
          "title": "备注人"
        }, {
          "field": "commentTypes",
          "dataType": "String",
          "title": "备注类型"
        }, {
          "field": "commentInfo",
          "dataType": "String",
          "title": "备注内容"
        }]
      },
      grid6: {
        domid: "grid_remark_3_dom",
        umeta: {
          "id": "grid_remark_3",
          "data": "commentList3",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true,
        },
        columns: [{
          "field": "creationTime",
          "dataType": "Datetime",
          "title": "时间"
        }, {
          "field": "creator",
          "dataType": "String",
          "title": "备注人"
        }, {
          "field": "commentTypes",
          "dataType": "String",
          "title": "备注类型"
        }, {
          "field": "commentInfo",
          "dataType": "String",
          "title": "备注内容"
        }]
      },
      grid7: {
        domid: "grid_goods_list_add_dom",
        umeta: {
          "id": "grid_goods_list_add",
          "data": "goodsList4Add",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false,
          "required": true,
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
          "title": "商品名称",
          "editable": false
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "购买数量",
          "required": true,
          "editType": "float"
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "单位",
          "editable": false,
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "数量"
        }, {
          "field": "count",
          "dataType": "String",
          "title": "单价"
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "成交金额",
          "editable": false,
        }, {
          "field": "discount",
          "dataType": "String",
          "title": "折扣金额",
          "editable": false,
        }, {
          "field": "bediscount",
          "dataType": "String",
          "title": "折扣前金额",
          "editable": false,
        }, {
          "field": "isGift",
          "dataType": "String",
          "title": "是否赠品",
          "renderType": "isGiftRender"
        }, {
          "field": "warehouseId",
          "dataType": "refer",
          "title": "发货库存组织",
          "editable": false,
        }, {
          "field": "warehouseId",
          "dataType": "refer",
          "title": "仓库",
        }, {
          "field": "shipments",
          "dataType": "String",
          "title": "累计发货数量",
          "editable": false,
        }, {
          "field": "sendNum",
          "dataType": "String",
          "title": "累计出库数量",
          "editable": false,
        }, {
          "field": "deliveryQty",
          "dataType": "String",
          "title": "累计送装数量",
          "editable": false,
        }, {
          "field": "returnReason",
          "dataType": "String",
          "title": "退货原因",
        }]
      }
    }
  }
  return new basemodel(model);
})