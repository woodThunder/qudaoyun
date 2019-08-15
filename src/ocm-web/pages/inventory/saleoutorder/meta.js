define(["ocm_basemodel"], function(basemodel) {
  var deliveryOrderItemsMeta = {
    id: {
      type: "string"
    },
    accountPeriodId: {
      type: "string"
    },
    deliveryOrderId: {
      type: "string"
    },
    saleOrderId: {
      type: "string"
    }, // 销售订单主键
    saleOrderCode: {
      type: "string"
    }, // 销售订单编码
    // 销售组织
    saleOrgId: {
      type: "string",
      required: true,
    },
    // 销售组织编码
    saleOrgCode: {
      type: "string"
    },
    // 销售组织名称
    saleOrgName: {
      type: "string"
    },
    // 客户
    customerId: {
      type: "string",
      required: true,
      refmodel: JSON.stringify(refinfo["customer"]),
      refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
      refparam: '{"EQ_isEnable":"1"}'
    },
    // 客户编码
    customerCode: {
      type: "string"
    },
    // 客户名称
    customerName: {
      type: "string"
    },
    // 商品id
    goodsId: {
      type: "string"
    },
    // 商品编码
    goodsCode: {
      type: "string"
    },
    // 商品名称
    goodsName: {
      type: "string"
    },
    // 本次安排数量
    orderNum: {
      type: "numberFloat",
      precision: 2
    },
    // 本次安排主数量
    mainNum: {
      type: "numberFloat",
      precision: 2
    },
    //累计出库数量
    stockOutNum: {
      type: "numberFloat",
      precision: 2
    },
    // 换算率
    conversionRate: {
      type: "string"
    },
    // 成交价
    dealPrice: {
      type: "priceFloat"
    },
    //结算财务组织
    settleFinancialOrgId: {
      type: "string",
    },
    // 重量
    weight: {
      type: "string"
    },
    // 体积
    volume: {
      type: "string"
    },
    // 金额
    dealAmount: {
      type: "amountFloat"
    },
    planDeliveryDate: {
      type: "string"
    }, //计划发货日期
    deliveryInvOrgId: {
      type: "string",
      required: true,
      refmodel: JSON.stringify(refinfo["organization_ocm"]),
      refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
      refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
    },
    deliveryInvOrgName: {
      type: "string"
    },
    deliveryInvOrgCode: {
      type: "string"
    }, // 发货库存组织
    deliveryWarehouseId: {
      type: "string",
      required: true,
      refmodel: JSON.stringify(refinfo["warehouse"]),
      refcfg: '{"ctx":"/uitemplate_web"}',
      refparam: "{}"
    }, //发货仓库
    deliveryWarehouseName: {
      type: "string"
    },
    deliveryWarehouseCode: {
      type: "string"
    },
    receiverAddress: {
      type: "string"
    }, // 收货地址
    receiver: {
      type: "string"
    }, // 收货联系人
    receiverPhone: {
      type: "string"
    }, // 收货联系电话
    remark: {
      type: "string"
    }, // 备注
    isGift: {
      type: "string"
    }, // 赠品
    // 货补
    goodsSupplement: {
      type: "integer",
    },
  };
  var deliveryOrderBomItemsMeta = {
    id: {
      type: "string"
    },
    deliveryOrderId: {
      type: "string"
    },
    saleOrderId: {
      type: "string"
    }, // 销售订单主键
    saleOrderCode: {
      type: "string"
    }, // 销售订单编码
    // 客户
    customerId: {
      type: "string",
      required: true,
      refmodel: JSON.stringify(refinfo["customer"]),
      refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
      refparam: '{"EQ_isEnable":"1"}'
    },
    // 客户编码
    customerCode: {
      type: "string"
    },
    // 客户名称
    customerName: {
      type: "string"
    },
    // 商品id
    goodsId: {
      type: "string"
    },
    // 商品编码
    goodsCode: {
      type: "string"
    },
    // 商品名称
    goodsName: {
      type: "string"
    },
    // 本次安排数量
    orderNum: {
      type: "numberFloat",
      precision: 2
    },
    // 本次安排主数量
    mainNum: {
      type: "numberFloat",
      precision: 2
    },
    // 换算率
    conversionRate: {
      type: "integer"
    },
    // 成交价
    dealPrice: {
      type: "priceFloat"
    },
    // 重量
    weight: {
      type: "string"
    },
    // 体积
    volume: {
      type: "string"
    },
    // 金额
    dealAmount: {
      type: "amountFloat"
    },
    planDeliveryDate: {
      type: "string"
    }, //计划发货日期
    deliveryInvOrgId: {
      type: "string",
      required: true,
      refmodel: JSON.stringify(refinfo["organization_ocm"]),
      refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
      refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
    },
    deliveryInvOrgName: {
      type: "string"
    },
    deliveryInvOrgCode: {
      type: "string"
    }, // 发货库存组织
    deliveryWarehouseId: {
      type: "string",
      required: true,
      refmodel: JSON.stringify(refinfo["warehouse"]),
      refcfg: '{"ctx":"/uitemplate_web"}',
      refparam: "{}"
    }, //发货仓库
    deliveryWarehouseName: {
      type: "string"
    },
    deliveryWarehouseCode: {
      type: "string"
    },
    receiverAddress: {
      type: "string"
    }, // 收货地址
    receiver: {
      type: "string"
    }, // 收货联系人
    receiverPhone: {
      type: "string"
    }, // 收货联系电话
    remark: {
      type: "string"
    }, // 备注
    isGift: {
      type: "string"
    }, // 赠品
    // 货补
    goodsSupplement: {
      type: "integer",
    },
    //------- 630后 新加bom包件字段 -------
    goodsVersion: {
      type: 'string',
      required: true
    }, //商品版本号
    goodsSelection: {
      type: 'string',
      required: true
    }, //商品选配项
    goodsNum: {
      type: 'string',
      required: true
    }, //数量
    parentGoodsId: {
      type: 'string',
      required: true
    }, //商品
    parentGoodsCode: {
      type: 'string',
      "refmodel": JSON.stringify(refinfo['goods']),
      "refcfg": '{"ctx":"/uitemplate_web"}',
      'refparam': '{"EQ_isEnable":"1"}'
    }, //商品名称
    parentGoodsName: {
      type: 'string',
      required: true
    }, //商品Code
    childGoodsQty: {
      type: 'integer',
    },
    parentRowNum: {
      type: 'string',
    }, //母件行号
  };
  var model = {
    metas: {
      complex: {
        meta: {
          id: {
            type: "string"
          },
          pkOrgId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          },
          pkOrgCode: {
            type: "string"
          },
          pkOrgName: {
            type: "string"
          },
          // 单据编码
          billCode: {
            type: "string"
          },
          // 单据日期
          billDate: {
            type: "date",
            required: true
          },
          // 单据类型
          billType: {
            type: "string",
            default: "SaleOut"
          },
          //出库类型
          billTranTypeId: {
            type: "string",
            default: "SaleOut",
            required: true,
            refmodel: JSON.stringify(refinfo["trantype"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"出库类型"}',
            refparam: '{"EQ_billTypeId":"SaleOut"}'
          },
          billTranTypeCode: {
            type: "string"
          },
          billTranTypeName: {
            type: "string"
          },
          // 仓库
          storehouseId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["warehouse"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
            refparam: '{"EQ_isEnable":"1"}'
          },
          storehouseCode: {
            type: "string"
          },
          storehouseName: {
            type: "string"
          },
          ifSlotManage: {
            type: 'string'
          },
          // 库管员
          storekeeperId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["person"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"库管员"}',
            refparam: '{"EQ_isEnable":"1"}'
          },
          storekeeperCode: {
            type: "string"
          },
          storekeeperName: {
            type: "string"
          },
          // 业务人员
          bizId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["person"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"业务员"}',
            refparam: '{"EQ_isEnable":"1"}'
          },
          bizCode: {
            type: "string"
          },
          bizName: {
            type: "string"
          },
          // 部门
          deptId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["department"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"部门"}',
            refparam: '{"EQ_isEnable":"1"}'
          },
          deptCode: {
            type: "string"
          },
          deptName: {
            type: "string"
          },
          // 单据状态
          billStatusId: {
            type: "string"
          },
          billStatusCode: {
            type: "string"
          },
          billStatusName: {
            type: "string"
          },
          //总应出数量
          totalShouldOutNum: {
            type: "numberFloat",
            precision: 2
          },

          //总实出数量
          totalFactOutNum: {
            type: "numberFloat",
            precision: 2
          },
          //订单客户
          billCustomerId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"客户"}',
            refparam: '{"EQ_isEnable":"1"}'
          },
          billCustomerCode: {
            type: "string"
          },
          billCustomerName: {
            type: "string"
          },

          // 订单归属
          ascription: {
            type: "string"
          },
          //指定物流公司
          designatedLogisticsId: {
            type: "string"
          },
          designatedLogisticsCode: {
            type: "string"
          },
          designatedLogisticsName: {
            type: "string"
          },
          //实发物流公司
          realLogisticsCompanyId: {
            type: "string"
          },
          realLogisticsCompanyCode: {
            type: "string"
          },
          realLogisticsCompanyName: {
            type: "string"
          },
          isEc: {
            type: "string"
          },
          // 物流单号
          logisticsBillCode: {
            type: "string"
          },
          // 拦截状态
          interceptingState: {
            type: "integer"
          },
          // 拦截失败原因
          interceptingReason: {
            type: "string"
          },
          // 签字人
          siger: {
            type: "string"
          },
          // 签字时间
          signTime: {
            type: "datetime"
            // 备注
          },
          remark: {
            type: "string"
          }
        },
        pageSize: 10
        //是否启用前端缓存
        // pageCache: true
      },
      complexItem: {
        meta: {
          id: {
            type: "string"
          },
          // 行号
          rowNum: {
            type: "integer"
          },
          accountPeriodId: {
            type: "string"
          },
          // 库存商品id
          goodsId: {
            type: "string"
          },
          // 库存商品编码
          goodsCode: {
            type: "string"
          },
          // 库存商品名称
          goodsName: {
            type: "string"
          },
          goodsFullName: {
            type: "string"
          },
          unitName: {
            type: "string"
          },
          goodsAssistUnitName: {
            type: "string"
          },
          goodsConversionRate: {
            type: "integer"
          },
          enableBatchNumberManage: {
            type: 'string'
          },
          enableBatchNoManage: {
            type: 'string'
          },
          enableInvStatusManage: {
            type: 'string'
          },
          isOptional: {
            type: "Integer"
          },
          productId: {
            type: 'string'
          },
          productLineId: {
            type: 'string'
          },
          // 货位
          goodsPositionId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goodsposition']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
          },
          goodsPositionCode: {
            type: 'string'
          },
          goodsPositionName: {
            type: 'string'
          },
          batchNumId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchNumber']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
          },
          batchNumCode: {
            type: 'string'
          },
          // 应收数量
          shouldOutNum: {
            type: "numberFloat",
            precision: 2
          },
          // 实出数量
          factOutNum: {
            type: "numberFloat",
            precision: 2
          },
          //实际签收总数量
          signNum:  {
            type: "numberFloat",
            precision: 2
          },
          // 单价
          unitPrice: {
            type: "priceFloat"
          },
          // 金额
          amountMoney: {
            type: "amountFloat"
          },
          goodsVersion: {
            type: 'string',
            required: true
          }, //商品版本号
          batchCodeId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchCode']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
          }, //批号
          batchCodeCode: {
            type: 'string',
          },
          batchCodeName: {
            type: 'string',
          },

          supplierId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //供应商
          supplierName: {
            type: 'string',
            /*required: true*/
          }, //供应商Name
          supplierCode: {
            type: 'string',
            /*required: true*/
          }, //供应商Code
          carrierId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //承运商
          carrierName: {
            type: 'string',
          }, //承运商Name
          carrierCode: {
            type: 'string',
          }, //承运商Code
          projectId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //项目
          projectCode: {
            type: 'string',
          }, //项目Name
          projectName: {
            type: 'string',
          }, //项目Code
          stockStateId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['inventorystate']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          }, //库存状态
          stockStateCode: {
            type: 'string',
            /*required: true*/
          }, //库存状态
          stockStateName: {
            type: 'string',
            /*required: true*/
          }, //库存状态
          customerId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['customers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          }, //客户
          customerCode: {
            type: 'string'
          }, //客户编码
          customerName: {
            type: 'string'
          }, //客户名称

          // 是否赠品
          isGift: {
            type: "string"
          },
          // 货补
          goodsSupplement: {
            type: "integer",
          },
          // 备注
          remark: {
            type: "string"
          },
          // 出库日期
          outDate: {
            type: "date"
          },
          // 出库人
          outerCode: {
            type: "string",
            refmodel: JSON.stringify(refinfo["person"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"出库员"}'
          },
          // 收货地址
          receiverAddress: {
            type: "string"
          },
          //详细地址
          detailAddr: {
            type: "string"
          },
          //收货联系人
          receiver: {
            type: "string"
          },
          //收货联系电话
          receiverPhone: {
            type: "string"
          },
          //收货联系电话（备用）
          receiverPhoneSpare: {
            type: "string"
          },
          //重量
          weight: {
            type: "string"
          },
          //体积
          volume: {
            type: "string"
          },
          //计划发货日期
          planDeliveryDate: {
            type: "date"
          },
          //计划到货日期
          arrivalDate: {
            type: "date"
          },
          // 源头单据号
          firstBillCode: {
            type: "string"
          },
          // 源头单据行号
          firstBillBcode: {
            type: "string"
          },
          // 源头单据类型
          firstBillType: {
            type: "string"
          },
          // 来源单据号
          srcBillCode: {
            type: "string"
          },
          // 来源单据行号
          srcBillBcode: {
            type: "string"
          },
          // 来源单据类型
          srcBillType: {
            type: "string"
          },
          originalGoodsId: {
            type: 'string',
          }, //原始版本商品
          goodsSelectionDescription: {
            type: 'string',
          }, //商品选配描述
          goodsSelection: {
            type: 'string',
            required: true
          }, //商品选配项
          supplierPrice: {
            type: 'priceFloat',
          }, //上级原价
          // 应出数量
          shouldAssistNum: {
            type: "string"
          }
        },
        pageSize: 10
      },
      BomItem: {
        meta: {
          id: {
            type: "string"
          },
          // 行号
          rowNum: {
            type: "integer"
          },
          // 库存商品id
          goodsId: {
            type: "string"
          },
          // 库存商品编码
          goodsCode: {
            type: "string"
          },
          // 库存商品名称
          goodsName: {
            type: "string"
          },
          goodsFullName: {
            type: "string"
          },
          unitName: {
            type: "string"
          },
          goodsAssistUnitName: {
            type: "string"
          },
          goodsConversionRate: {
            type: "integer"
          }, // 选配 name
          baseGoodsOptValue: {
            type: 'string'
          },
          enableBatchNumberManage: {
            type: 'string'
          },
          enableBatchNoManage: {
            type: 'string'
          },
          enableInvStatusManage: {
            type: 'string'
          },
          productId: {
            type: 'string'
          },
          productLineId: {
            type: 'string'
          },
          // 货位
          goodsPositionId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goodsposition']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
          },
          goodsPositionCode: {
            type: 'string'
          },
          goodsPositionName: {
            type: 'string'
          },
          batchNumId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchNumber']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
          },
          batchNumCode: {
            type: 'string'
          },
          // 应出数量
          shouldOutNum: {
            type: "numberFloat",
            precision: 2
          },
          // 实出数量
          factOutNum: {
            type: "numberFloat",
            precision: 2
          },
          // 单价
          unitPrice: {
            type: "priceFloat"
          },
          // 金额
          amountMoney: {
            type: "amountFloat"
          },
          // 是否赠品
          isGift: {
            type: "string"
          },
          // 货补
          goodsSupplement: {
            type: "integer",
          },
          // 备注
          remark: {
            type: "string"
          },
          // 出库日期
          outDate: {
            type: "date"
          },
          // 出库人
          outerCode: {
            type: "string",
            refmodel: JSON.stringify(refinfo["person"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"出库员"}'
          },
          // 收货地址
          receiverAddress: {
            type: "string"
          },
          //详细地址
          detailAddr: {
            type: "string"
          },
          //收货联系人
          receiver: {
            type: "string"
          },
          //收货联系电话
          receiverPhone: {
            type: "string"
          },
          //收货联系电话（备用）
          receiverPhoneSpare: {
            type: "string"
          },
          //重量
          weight: {
            type: "string"
          },
          //体积
          volume: {
            type: "string"
          },
          //计划发货日期
          planDeliveryDate: {
            type: "date"
          },
          //计划到货日期
          arrivalDate: {
            type: "date"
          },
          // 源头单据号
          firstBillCode: {
            type: "string"
          },
          // 源头单据行号
          firstBillBcode: {
            type: "string"
          },
          // 源头单据类型
          firstBillType: {
            type: "string"
          },
          // 来源单据号
          srcBillCode: {
            type: "string"
          },
          // 来源单据行号
          srcBillBcode: {
            type: "string"
          },
          // 来源单据类型
          srcBillType: {
            type: "string"
          },

          //------- 630后 新加bom包件字段 -------
          goodsVersion: {
            type: 'string',
            required: true
          }, //商品版本号
          goodsSelection: {
            type: 'string',
            required: true
          }, //商品选配项
          batchCodeId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchCode']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
          }, //批号
          batchCodeCode: {
            type: 'string',
          },
          batchCodeName: {
            type: 'string',
          },
          supplierId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //供应商
          supplierName: {
            type: 'string',
            /*required: true*/
          }, //供应商Name
          supplierCode: {
            type: 'string',
            /*required: true*/
          }, //供应商Code
          carrierId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //承运商
          carrierName: {
            type: 'string',
          }, //承运商Name
          carrierCode: {
            type: 'string',
          }, //承运商Code
          projectId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //项目
          projectCode: {
            type: 'string',
          }, //项目Name
          projectName: {
            type: 'string',
          }, //项目Code
          stockStateId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['inventorystate']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          }, //库存状态
          stockStateCode: {
            type: 'string',
            /*required: true*/
          }, //库存状态
          stockStateName: {
            type: 'string',
            /*required: true*/
          }, //库存状态
          customerId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['customers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          }, //客户
          customerCode: {
            type: 'string'
          }, //客户编码
          customerName: {
            type: 'string'
          }, //客户名称
          goodsNum: {
            type: 'string',
            required: true
          }, //数量
          parentGoodsId: {
            type: 'string',
            required: true
          }, //商品
          parentGoodsCode: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          }, //商品名称
          parentGoodsName: {
            type: 'string',
            required: true
          }, //商品Code

          parentRowNum: {
            type: 'string',
          }, //母件行号
          childGoodsQty: {
            type: 'integer',
          },
          originalGoodsId: {
            type: 'string',
          }, //原始版本商品
          goodsSelectionDescription: {
            type: 'string',
          }, //商品选项描述
        },
        pageSize: 10
      },
      ItemRef: {
        meta: {
          goodsref: {
            type: "string",
            refmodel: JSON.stringify(refinfo["goods"]),
            refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            refparam: '{"EQ_isEnable":"1"}'
          }
        }
      },
      delivery: {
        meta: {
          id: {
            type: "string"
          },
          deliveryOrderCode: {
            type: "string"
          }, // 发货单号
          deliveryOperater: {
            type: "string"
          }, //发货安排人
          deliveryOrderDate: {
            type: "data"
          }, //发货日期
          totalNum: {
            type: "numberFloat",
            precision: 2
          }, // 总数量
          totalAmount: {
            type: "amountFloat"
          }, // 总金额
          orderStatus: {
            type: "string"
          }, // 单据状态
          orderStatusCode: {
            type: "string"
          },
          orderStatusName: {
            type: "string"
          },
          selectitemIds: {
            type: "string"
          },
          deliveryOrderItems: deliveryOrderItemsMeta,
          deliveryOrderItemBoms: deliveryOrderBomItemsMeta
        },
        pageSize: 10
      },
      deliveryItems: {
        meta: deliveryOrderItemsMeta,
        pageSize: 10
      }
    },
    searchs: {
      search1: [{
        type: "text",
        key: "billCode",
        label: "出库单号"
      }, {
        type: "daterange",
        key: "billDate",
        label: "单据日期"
      }, {
        type: "refer",
        key: "pkOrg",
        label: "库存组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "03"
        }
      }, {
        type: "refer",
        key: "storehouse",
        label: "出库仓库",
        refinfo: "warehouse",
        domid: "storehouse"
      }, {
        type: "refer",
        key: "billCustomer",
        label: "客户",
        refinfo: "customer"
      }, {
        type: "refer",
        key: "biz",
        label: "销售员",
        refinfo: "person"
      }, {
        type: "refer",
        key: "dept",
        label: "销售部门",
        refinfo: "department"
      }, {
        type: "refer",
        key: "saleOutOrderItems--goods",
        label: "库存商品",
        refinfo: "goods"
      }, {
        type: "combo",
        key: "billStatus",
        label: "单据状态",
        url: window.pathMap.base +
          "/cust-doc-defs/cust_doc_code?cust_doc_code=QY106",
        namefield: "name",
        valuefield: "code",
        hasAll: true
      }, {
        type: "text",
        key: "saleOutOrderItems--srcBillCode",
        label: "来源发货单号"
      }, {
        type: "combo",
        key: "isEc",
        label: "电商来源",
        dataSource: [{
          value: '',
          name: ''
        }, {
          value: '01',
          name: '是'
        }, {
          value: '02',
          name: '否'
        }]
      }, ],
      search2: [{
        type: "text",
        key: "deliveryOrderCode",
        label: "发货单号"
      }, {
        type: "daterange",
        key: "deliveryOrderDate",
        label: "安排日期"
      }, {
        type: "daterange",
        key: "deliveryOrderItems--planDeliveryDate",
        label: "计划发货日期"
      }, {
        type: "refer",
        key: "deliveryOrderItems--customer",
        label: "客户",
        refinfo: "customer"
      }, {
        type: "refer",
        key: "deliveryOrderItems--deliveryInvOrg",
        label: "发货库存组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "03",
          "AUTH_refdim":"pkOrg"
        }
      }, {
        type: "refer",
        key: "deliveryOrderItems--deliveryWarehouse",
        label: "发货仓库",
        refinfo: "warehouse",
        domid: "storehouse2"
      }]
    },
    buttons: {
      button1: [{
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "showAddRefer"
        }, {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        }, {
          key: "sign",
          label: "签字",
          iconCls: "icon-edit",
          click: "sign"
        }, {
          key: "cancelsign",
          label: "取消签字",
          iconCls: "icon-tubiao-quxiaoshenhe",
          click: "cancelsign"
        }, {
          key: "cancelsign",
          label: "电商拦截结果",
          iconCls: "icon-tubiao-quxiaoshenhe",
          click: "showHoldResult"
        },
        // {
        //   key: "cancelsign",
        //   label: "电商发运",
        //   iconCls: "icon-tubiao-quxiaoshenhe",
        //   click: "showLogistics"
        // }
        // {
        //   key: "import",
        //   label: "导入",
        //   iconCls: "icon-import",
        //   click: "importHandle"
        // },
        // {
        //   key: "export",
        //   label: "导出",
        //   iconCls: "icon-export",
        //   click: "exportHandle"
        // },
      ],
      button2: [{
        key: "autonum",
        label: "自动取数",
        click: "autonum"
      }, {
        key: "cancel",
        label: "取消",
        click: "retListPanel"
      }, {
        key: "save",
        label: "保存",
        click: "saveBill",
        cls: "ui-btn-green"
      }],
      button3: [{
        key: "addrow",
        label: "增行",
        iconCls: "icon-plus",
        click: "showAddItemsRef"
      }, {
        key: "delrow",
        label: "删行",
        iconCls: "icon-shanchu1",
        click: "delItems"
      }],
      button4: [{
        key: "return",
        label: "返回",
        click: "retListPanel"
      }, {
        key: "edit",
        label: "编辑",
        click: "detail2bill",
        cls: "ui-btn-green",
        visible: "canEdit"
      }]
    },
    dialogs: {
      dialog1: [{
        type: "refer",
        key: "logisticsId",
        label: "物流公司",
        refinfo: "logistics-company"
      }, {
        type: "text",
        key: "logisticsBillCode",
        label: "物流单号"
      }, {
        type: "textreadonly",
        key: "hint",
        label: "提示",
        defaultvalue: "确认发运后，销售出库单将全部出库"
      }],
      dialog2: [{
        type: "combo",
        key: "interceptingState",
        label: "拦截状态",
        dataSource: [{
          name: "拦截成功",
          value: 1
        }, {
          name: "拦截失败",
          value: 0
        }]
      }, {
        type: "textarea",
        key: "interceptingReason",
        label: "失败原因",
        cls: "ui-textarea-item"
      }]
    },
    cards: {
      card1: [{
        type: "textreadonly",
        key: "billCode",
        label: "出库单号"
      }, {
        type: "date",
        key: "billDate",
        label: "单据日期"
      }, {
        type: "refer",
        key: "billTranTypeId",
        label: "出库类型"
      }, {
        type: "refer",
        key: "pkOrgId",
        label: "库存组织"
      }, {
        type: "refer",
        key: "storehouseId",
        label: "出库仓库",
        referId: "storehouseId"
      }, {
        type: "textreadonly",
        key: "billCustomerName",
        label: "订单客户"
      }, {
        type: "textreadonly",
        key: "bizName",
        label: "销售员"
      }, {
        type: "textreadonly",
        key: "deptName",
        label: "销售部门"
      }, {
        type: "refer",
        key: "storekeeperId",
        label: "库管员"
      }, {
        type: "textreadonly",
        key: "billStatusName",
        label: "单据状态"
      }, {
        type: "textreadonly",
        key: "totalShouldOutNum",
        label: "总应出数量"
      }, {
        type: "textreadonly",
        key: "totalFactOutNum",
        label: "总实出数量"
      }, {
        type: "textreadonly",
        key: "designatedLogisticsName",
        label: "指定物流公司"
      }, {
        type: "refer",
        compid: "realLogisticsCompanyIdComp",
        key: "realLogisticsCompanyId",
        label: "实发物流公司",
        refinfo: "logistics-company",
        enable: false
      }, {
        type: "text",
        compid: "logisticsBillCodeComp",
        key: "logisticsBillCode",
        label: "物流/快递单号",
        enable: false
      }, {
        type: "textreadonly",
        key: "interceptingState",
        label: "拦截状态",
        format: "interceptingStateFormat"
      }, {
        type: "textreadonly",
        key: "interceptingReason",
        label: "拦截失败原因"
      }, {
        type: "textarea",
        key: "remark",
        label: "备注",
        cls: "ui-textarea-item"
      }]
    },
    details: {
      detail1: [{
        key: "billCode",
        label: "单据编码"
      }, {
        key: "billDate",
        label: "单据日期",
        computed: "billDateComputed"
      }, {
        key: "billTranTypeName",
        label: "出库类型"
      }, {
        key: "pkOrgName",
        label: "库存组织"
      }, {
        key: "storehouseName",
        label: "出库仓库"
      }, {
        key: "bizName",
        label: "销售员"
      }, {
        key: "deptName",
        label: "销售部门"
      }, {
        key: "billStatusName",
        label: "单据状态"
      }, {
        key: "storekeeperName",
        label: "库管员"
      }, {
        key: "totalFactOutNum",
        label: "总实出数量"
      }, {
        key: "logisticsBillCode",
        label: "物流/快递单号"
      }, {
        key: "interceptingState",
        label: "拦截状态",
        computed: "interceptingStateComputed"
      }, {
        key: "interceptingReason",
        label: "拦截失败原因"
      }, {
        key: "remark",
        label: "备注",
        cls: "ui-textarea-item"
      }]
    },
    grids: {
      grid1: {
        domid: "grid_complex_dom",
        umeta: {
          id: "grid_complex",
          data: "saleoutList",
          type: "grid",
          editable: false,
          multiSelect: true
        },
        columns: [{
            field: "billCode",
            dataType: "String",
            title: "出库单号",
            renderType: "detailRender"
          }, {
            field: "billType",
            dataType: "String",
            title: "单据类型编码",
            visible: false
          }, {
            field: "billTranTypeCode",
            dataType: "String",
            title: "单据类型编码",
            visible: false
          }, {
            field: "billTranTypeName",
            dataType: "String",
            title: "出库类型"
          }, {
            field: "billDate",
            dataType: "Date",
            title: "单据日期",
            textAlign: "center",
          }, {
            field: "pkOrgCode",
            dataType: "String",
            title: "库存组织编码",
            visible: false
          }, {
            field: "pkOrgName",
            dataType: "String",
            title: "库存组织"
          }, {
            field: "billCustomerCode",
            dataType: "String",
            title: "客户编码",
            visible: false
          }, {
            field: "billCustomerName",
            dataType: "String",
            title: "客户"
          }, {
            field: "storehouseCode",
            dataType: "String",
            title: "出库仓库编码",
            visible: false
          }, {
            field: "storehouseName",
            dataType: "String",
            title: "出库仓库"
          }, {
            field: "bizCode",
            dataType: "String",
            title: "销售员编码",
            visible: false
          }, {
            field: "bizName",
            dataType: "String",
            title: "销售员"
          }, {
            field: "deptCode",
            dataType: "String",
            title: "销售部门编码",
            visible: false
          }, {
            field: "deptName",
            dataType: "String",
            title: "销售部门"
          }, {
            field: "isEc",
            dataType: "String",
            title: "电商来源",
            renderType: "isEcRender",
          }, {
            field: "interceptingState",
            dataType: "String",
            title: "拦截状态",
            renderType: "interceptingStateRender",
          }, {
            field: "billStatusName",
            dataType: "String",
            title: "状态"
          }, {
            field: "storekeeperCode",
            dataType: "String",
            title: "库管员编码",
            visible: false
          }, {
            field: "storekeeperName",
            dataType: "String",
            title: "库管员"
          }, {
            field: "totalShouldOutNum",
            dataType: "String",
            title: "总应出数量",
            visible: false
          }, {
            field: "totalFactOutNum",
            dataType: "String",
            title: "总实出数量",
            visible: false
          }, {
            field: "siger",
            dataType: "String",
            title: "签字人",
            visible: false
          }, {
            field: "signTime",
            dataType: "String",
            title: "签字时间",
            visible: false
          }, {
            field: "remark",
            dataType: "String",
            title: "备注",
            visible: false
          }, {
            field: "interceptingReason",
            dataType: "String",
            title: "拦截失败原因",
            visible: false
          },

          {
            field: "logisticsBillCode",
            dataType: "String",
            title: "物流单号",
            visible: false
          }, {
            field: "designatedLogisticsCode",
            dataType: "String",
            title: "指定物流公司编码",
            visible: false
          }, {
            field: "designatedLogisticsName",
            dataType: "String",
            title: "指定物流公司",
            visible: false
          }, {
            field: "designatedLogisticsCode",
            dataType: "String",
            title: "实发物流公司编码",
            visible: false
          }, {
            field: "designatedLogisticsName",
            dataType: "String",
            title: "实发物流公司",
            visible: false
          }, {
            field: "creator",
            dataType: "String",
            title: "创建人",
            visible: false
          }, {
            field: "creationTime",
            dataType: "Date",
            title: "创建时间",
            visible: false
          }, {
            field: "modifier",
            dataType: "String",
            title: "修改人",
            visible: false
          }, {
            field: "modifiedTime",
            dataType: "Date",
            title: "修改时间",
            visible: false
          }, {
            field: "billStatusCode",
            dataType: "String",
            title: "操作",
            renderType: "operation",
            fixed: true,
            width: "100px"
          }
        ]
      },

      //商品信息
      gridGoodsEdit: {
        domid: "grid_saleout2",
        umeta: {
          id: "grid_complex_edit",
          data: "saleoutItems",
          type: "grid",
          editable: true,
          multiSelect: true,
          "onBeforeEditFun": "beforeEditCheck"
        },
        columns: [{
          field: "rowNum",
          title: "行号",
          dataType: "Integer",
          editable: false
        }, {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码",
          editable: false
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称",
          editable: false
        }, {
          field: "shouldOutNum",
          dataType: "String",
          title: "应出数量",
          editable: false
        }, {
          field: "factOutNum",
          dataType: "String",
          title: "实出数量"
        }, {
          field: "unitName",
          dataType: "String",
          title: "单位",
          editable: false
        }, {
          field: "isGift",
          dataType: "Integer",
          title: "赠品",
          renderType: "disableBooleanRender",
          editable: false
        }, {
          field: "goodsSupplement",
          dataType: "checkbox",
          editable: false,
          title: "货补",
          renderType: "disableBooleanRender",
        }, {
          field: "unitPrice",
          dataType: "String",
          title: "单价",
          editable: false
        }, {
          field: "supplierPrice",
          dataType: "String",
          title: "上级原价",
          editable: false
        }, {
          field: "amountMoney",
          dataType: "String",
          title: "金额",
          editable: false
        }, {
          field: "goodsSelection",
          dataType: "String",
          title: "商品选配",
          renderType: "goodsOptDetails",
          editable: false,
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "srcBillCode",
          "dataType": "String",
          "title": "来源发货单号",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeId",
          "dataType": "String",
          "title": "批号",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "batchCodeName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "supplierId",
          "dataType": "String",
          "title": "供应商",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "supplierName",
          "editOptions": {
            "validType": "string"
          }
        },{
          "field": "carrierId",
          "dataType": "String",
          "title": "承运商",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "carrierName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "projectId",
          "dataType": "String",
          "title": "项目",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "projectName",
          "editOptions": {
            "validType": "string"
          },
          "editable": true,
          "visible": false,
        }, {
          "field": "stockStateId",
          "dataType": "String",
          "title": "库存状态",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "stockStateName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "customerId",
          "dataType": "String",
          "title": "客户",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "customerName",
          "visible": false,
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "batchNumId",
          "dataType": "String",
          "title": "批次号",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "batchNumName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "goodsPositionId",
          "dataType": "String",
          "title": "货位",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "goodsPositionName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          field: "outerName",
          dataType: "String",
          title: "出库人",
          editable: false
        }, {
          field: "outDate",
          dataType: "DateTime",
          title: "出库时间",
          editable: false
        }, {
          field: "receiverAddress",
          dataType: "String",
          title: "收货地址",
          editable: false
        }, {
          field: "receiver",
          dataType: "String",
          title: "收货联系人",
          editable: false
        }, {
          field: "receiverPhone",
          dataType: "String",
          title: "收货人电话",
          editable: false
        }, {
          field: "receiverPhoneSpare",
          dataType: "String",
          title: "收货人电话(备用)",
          editable: false
        }, {
          field: "planDeliveryDate",
          dataType: "date",
          title: "计划发货日期",
          editType: "date",
          editable: false
        }, {
          field: "arrivalDate",
          dataType: "date",
          title: "要求到货日期",
          editType: "date",
          editable: false
        }, {
            field: "settleFinancialOrgName",
            dataType: "String",
            title: "结算财务组织",
            editable: false
        }, {
          field: "bremark",
          dataType: "String",
          title: "行备注"
        }]
      },
      gridGoodsDetail: {
        domid: "grid_saleoutorder3",
        umeta: {
          id: "grid_complex_detail",
          data: "saleoutItems",
          type: "grid",
          editable: false,
          multiSelect: false
        },
        columns: [{
          field: "rowNum",
          dataType: "Integer",
          title: "行号"
        }, {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码"
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称"
        }, {
          field: "shouldOutNum",
          dataType: "String",
          title: "应出数量"
        }, {
          field: "factOutNum",
          dataType: "String",
          title: "实出数量"
        }, {
          field: "signNum",
          dataType: "String",
          title: "累计签收数量"
        }, {
          field: "unitName",
          dataType: "String",
          title: "单位"
        }, {
          "field": "goodsPositionName",
          "dataType": "String",
          "title": "货位",
        }, {
          "field": "batchNumName",
          "dataType": "String",
          "title": "批次号",
        }, {
          field: "outerName",
          dataType: "String",
          title: "出库人"
        }, {
          field: "outDate",
          dataType: "Date",
          title: "出库日期"
        }, {
          field: "receiverAddress",
          dataType: "String",
          title: "收货地址"
        }, {
          field: "receiver",
          dataType: "String",
          title: "收货联系人"
        }, {
          field: "receiverPhone",
          dataType: "String",
          title: "收货人电话"
        }, {
          field: "receiverPhoneSpare",
          dataType: "String",
          title: "收货人电话(备用)"
        }, {
          field: "isGift",
          dataType: "Integer",
          title: "赠品",
          renderType: "disableBooleanRender"
        }, {
          field: "goodsSupplement",
          dataType: "checkbox",
          title: "货补",
          renderType: "disableBooleanRender",
        }, {
          field: "unitPrice",
          dataType: "String",
          title: "单价"
        }, {
          field: "supplierPrice",
          dataType: "String",
          title: "上级原价",
          editable: false
        }, {
          field: "amountMoney",
          dataType: "String",
          title: "金额"
        }, {
          field: "goodsSelection",
          dataType: "String",
          title: "商品选配",
          renderType: "goodsOptDetails",
          editable: false,
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "srcBillCode",
          "dataType": "String",
          "title": "来源发货单号",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeName",
          "dataType": "String",
          "title": "批号",
          "editable": false,
          "visible": false,
        }, {
          "field": "supplierName",
          "dataType": "String",
          "title": "供应商",
          "visible": false,
          "editable": false,
        }, {
          "field": "carrierName",
          "dataType": "String",
          "title": "承运商",
          "visible": false,
          "editable": false,
        },{
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
          "editable": false,
          "visible": false,
        }, {
          "field": "stockStateName",
          "dataType": "String",
          "title": "库存状态",
          "editable": false,
          "visible": false,
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户",
          "editable": false,
          "visible": false,
        }, {
          field: "weight",
          dataType: "String",
          title: "重量",
          visible: false
        }, {
          field: "volume",
          dataType: "String",
          title: "体积",
          visible: false
        }, {
          field: "planDeliveryDate",
          dataType: "Date",
          title: "计划发货日期"
        }, {
          field: "arrivalDate",
          dataType: "Date",
          title: "要求到货日期"
        }, {
            field: "settleFinancialOrgName",
            dataType: "String",
            title: "结算财务组织"
        }, {
          field: "bremark",
          dataType: "String",
          title: "行备注"
        }]
      },

      //bom结构信息
      gridBomEdit: {
        domid: "grid_saleoutBomEdit",
        umeta: {
          id: "grid_complex_BomEdit",
          data: "BomItems",
          type: "grid",
          editable: true,
          multiSelect: true,
          "onBeforeEditFun": "beforeEditCheck"
        },
        columns: [{
          field: "rowNum",
          title: "行号",
          dataType: "Integer",
          editable: false
        }, {
          field: "parentRowNum",
          title: "所属商品行号",
          dataType: "Integer",
          editable: false
        }, {
          "field": "parentGoodsName",
          "dataType": "String",
          "title": "母件商品名称",
          "editable": false
        }, {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码",
          editable: false
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称",
          editable: false
        }, {
          field: "goodsSelectionDescription",
          dataType: "String",
          title: "选配信息",
          editable: false
        }, {
          field: "shouldOutNum",
          dataType: "String",
          title: "应出数量",
          editable: false
        }, {
          field: "factOutNum",
          dataType: "String",
          title: "实出数量",
          "editable": false,
        }, {
          field: "unitName",
          dataType: "String",
          title: "单位",
          editable: false
        }, {
          field: "isGift",
          dataType: "Integer",
          title: "赠品",
          renderType: "disableBooleanRender",
          editable: false
        }, {
          field: "goodsSupplement",
          dataType: "checkbox",
          title: "货补",
          editable: false,
          renderType: "disableBooleanRender",
        }, {
          field: "unitPrice",
          dataType: "String",
          title: "单价",
          editable: false
        }, {
          field: "amountMoney",
          dataType: "String",
          title: "金额",
          editable: false
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "srcBillCode",
          "dataType": "String",
          "title": "来源发货单号",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeId",
          "dataType": "String",
          "title": "批号",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "batchCodeName",
          "editOptions": {
            "validType": "string"
          },
          "visible": false,
          "editable": false,
        }, {
          "field": "supplierId",
          "dataType": "String",
          "title": "供应商",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "supplierName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "projectId",
          "dataType": "String",
          "title": "项目",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "projectName",
          "editOptions": {
            "validType": "string"
          },
        }, {
          "field": "stockStateId",
          "dataType": "String",
          "title": "库存状态",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "stockStateName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "customerId",
          "dataType": "String",
          "title": "客户",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "visible": false,
          "showField": "customerName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "batchNumId",
          "dataType": "String",
          "title": "批次号",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "batchNumName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "goodsPositionId",
          "dataType": "String",
          "title": "货位",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "goodsPositionName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
            field: "settleFinancialOrgName",
            dataType: "String",
            title: "结算财务组织",
            editable: false
        }, {
          field: "bremark",
          dataType: "String",
          title: "行备注",
          "editable": false,
        }]
      },
      gridBomDetail: {
        domid: "grid_grid_saleoutBomDetail",
        umeta: {
          id: "grid_complex_bomDetail",
          data: "BomItems",
          type: "grid",
          editable: false,
          multiSelect: false
        },
        columns: [{
          field: "rowNum",
          dataType: "Integer",
          title: "行号"
        }, {
          field: "parentRowNum",
          title: "所属商品行号",
          dataType: "Integer",
          editable: false
        }, {
          "field": "parentGoodsName",
          "dataType": "String",
          "title": "母件商品名称",
          "editable": false
        }, {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码"
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称"
        }, {
          field: "goodsSelectionDescription",
          dataType: "String",
          title: "选配信息",
          editable: false
        }, {
          field: "shouldOutNum",
          dataType: "String",
          title: "应出数量"
        }, {
          field: "factOutNum",
          dataType: "String",
          title: "实出数量"
        }, {
          field: "signNum",
          dataType: "String",
          title: "累计签收数量"
        }, {
          field: "unitName",
          dataType: "String",
          title: "单位"
        }, {
          "field": "goodsPositionName",
          "dataType": "String",
          "title": "货位",
        }, {
          "field": "batchNumName",
          "dataType": "String",
          "title": "批次号",
        }, {
          field: "outerName",
          dataType: "String",
          title: "出库人"
        }, {
          field: "outDate",
          dataType: "Date",
          title: "出库日期"
        }, {
          field: "receiverAddress",
          dataType: "String",
          title: "收货地址"
        }, {
          field: "receiver",
          dataType: "String",
          title: "收货联系人"
        }, {
          field: "receiverPhone",
          dataType: "String",
          title: "收货人电话"
        }, {
          field: "receiverPhoneSpare",
          dataType: "String",
          title: "收货人电话(备用)"
        }, {
          field: "isGift",
          dataType: "Integer",
          title: "赠品",
          renderType: "disableBooleanRender"
        }, {
          field: "goodsSupplement",
          dataType: "checkbox",
          title: "货补",
          renderType: "disableBooleanRender",
        }, {
          field: "unitPrice",
          dataType: "String",
          title: "单价"
        }, {
          field: "amountMoney",
          dataType: "String",
          title: "金额"
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "srcBillCode",
          "dataType": "String",
          "title": "来源发货单号",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeName",
          "dataType": "String",
          "title": "批号",
          "editable": false,
          "visible": false,
        }, {
          "field": "supplierName",
          "dataType": "String",
          "title": "供应商",
          "visible": false,
          "editable": false,
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
          "editable": false,
          "visible": false,
        }, {
          "field": "stockStateName",
          "dataType": "String",
          "title": "库存状态",
          "editable": false,
          "visible": false,
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户",
          "editable": false,
          "visible": false,
        }, {
          field: "weight",
          dataType: "String",
          title: "重量",
          visible: false
        }, {
          field: "volume",
          dataType: "String",
          title: "体积",
          visible: false
        }, {
          field: "planDeliveryDate",
          dataType: "Date",
          title: "计划发货日期"
        }, {
          field: "arrivalDate",
          dataType: "Date",
          title: "要求到货日期"
        }, {
            field: "settleFinancialOrgName",
            dataType: "String",
            title: "结算财务组织",
            editable: false
        }, {
          field: "bremark",
          dataType: "String",
          title: "行备注"
        }]
      },

      //拉单弹窗相关grid元数据
      grid4: {
        domid: "grid_saleout4",
        umeta: {
          id: "grid_referList",
          data: "referDeliveryorderList",
          type: "grid",
          editable: false,
          multiSelect: true,
          onRowSelected: "referSelectHandle",
          onRowUnSelected: "referUnSelectHandle",
        },
        columns: [{
          field: "deliveryOrderCode",
          dataType: "String",
          title: "发货单号",
          width: "200px"
        }, {
          field: "deliveryOrderDate",
          dataType: "Date",
          title: "发货安排日期"
        }, {
          field: "deliveryOperater",
          dataType: "String",
          title: "发货安排人"
        }, {
          field: "totalNum",
          dataType: "String",
          title: "总数量"
        }, {
          field: "totalAmount",
          dataType: "String",
          title: "总金额"
        }, {
          field: "orderStatusName",
          dataType: "String",
          title: "状态"
        }]
      },
      grid5: {
        domid: "grid_saleout5",
        umeta: {
          id: "grid_referListItem",
          data: "referDeliveryorderitemList",
          type: "grid",
          editable: false,
          multiSelect: true,
          "onRowSelected": "referSelectItemHandle",
          "onRowUnSelected": "referUnSelectItemHandle",
        },
        columns: [{
          field: "saleOrderCode",
          dataType: "String",
          title: "订单编号"
        }, {
          field: "customerName",
          dataType: "String",
          title: "客户"
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织"
        }, {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码"
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称"
        }, {
          field: "orderNum",
          dataType: "String",
          title: "本次安排数量",
          visible: false
        }, {
          field: "mainNum",
          dataType: "String",
          title: "本次安排主数量",
        }, {
          field: "dealPrice",
          dataType: "String",
          title: "成交价",
          visible: false
        }, {
          field: "weight",
          dataType: "float",
          title: "重量",
          visible: false
        }, {
          field: "volume",
          dataType: "Float",
          title: "体积",
          visible: false
        }, {
          field: "dealAmount",
          dataType: "String",
          title: "金额"
        }, {
          field: "planDeliveryDate",
          dataType: "Date",
          title: "计划发货日期"
        }, {
          field: "deliveryInvOrgName",
          dataType: "String",
          title: "发货库存组织"
        }, {
          field: "deliveryWarehouseName",
          dataType: "String",
          title: "发货仓库"
        }, {
          field: "receiverAddress",
          dataType: "String",
          title: "收货地址"
        }, {
          field: "receiver",
          dataType: "String",
          title: "收货联系人"
        }, {
          field: "receiverPhone",
          dataType: "String",
          title: "收货联系电话"
        }, {
          field: "remark",
          dataType: "String",
          title: "备注"
        }, {
          field: "isGift",
          dataType: "checkbox",
          title: "赠品",
          renderType: "disableBooleanRender"
        }, {
          field: "goodsSupplement",
          dataType: "checkbox",
          title: "货补",
          renderType: "disableBooleanRender",
        }]
      },
      grid6: {
        domid: "grid_saleout6",
        umeta: {
          id: "grid_referList_Sel",
          data: "selectedreferList",
          type: "grid",
          showNumCol: true,
          editable: false
        },
        columns: [{
          field: "deliveryOrderCode",
          dataType: "String",
          title: "发货单号",
          width: "200px"
        }, {
          field: "deliveryOrderDate",
          dataType: "Date",
          title: "发货安排日期"
        }, {
          field: "deliveryOperater",
          dataType: "String",
          title: "发货安排人"
        }, {
          field: "totalNum",
          dataType: "String",
          title: "总数量"
        }, {
          field: "totalAmount",
          dataType: "String",
          title: "总金额"
        }, {
          field: "orderStatusName",
          dataType: "String",
          title: "状态"
        }]
      },
      grid7: {
        domid: "grid_saleout7",
        umeta: {
          id: "grid_referListItem_Sel",
          data: "selectedreferListItem",
          type: "grid",
          editable: false,
          showNumCol: true
        },
        columns: [{
          field: "saleOrderCode",
          dataType: "String",
          title: "订单编号"
        }, {
          field: "customerName",
          dataType: "String",
          title: "客户"
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织"
        }, {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码"
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称"
        }, {
          field: "orderNum",
          dataType: "String",
          title: "本次安排数量"
        }, {
          field: "mainNum",
          dataType: "String",
          title: "本次安排主数量",
          visible: false
        }, {
          field: "dealPrice",
          dataType: "String",
          title: "成交价",
          visible: false
        }, {
          field: "weight",
          dataType: "Float",
          title: "重量",
          visible: false
        }, {
          field: "volume",
          dataType: "Float",
          title: "体积",
          visible: false
        }, {
          field: "dealAmount",
          dataType: "String",
          title: "金额"
        }, {
          field: "planDeliveryDate",
          dataType: "Date",
          title: "计划发货日期"
        }, {
          field: "deliveryInvOrgName",
          dataType: "String",
          title: "发货库存组织"
        }, {
          field: "deliveryWarehouseName",
          dataType: "String",
          title: "发货仓库"
        }, {
          field: "receiverAddress",
          dataType: "String",
          title: "收货地址"
        }, {
          field: "receiver",
          dataType: "String",
          title: "收货联系人"
        }, {
          field: "receiverPhone",
          dataType: "String",
          title: "收货联系电话"
        }, {
          field: "remark",
          dataType: "String",
          title: "备注"
        }, {
          field: "isGift",
          dataType: "checkbox",
          title: "赠品",
          renderType: "disableBooleanRender"
        }, {
          field: "goodsSupplement",
          dataType: "checkbox",
          title: "货补",
          renderType: "disableBooleanRender",
        }]
      },
    }
  };
  return new basemodel(model);
});