function getConfig() {
    return {
        buttonEdit: [
            {
                key: "searchProm",
                label: "促销匹配",
                iconCls: "icon-tubiao-shenhe",
                click: "searchprom",
                cls: 'ui-btn-primary searchProm'
            }
        ],
        buttonDetail: [
            // {
            //     key: "checkInventory",
            //     label: "查看经销商库存",
            //     iconCls: "icon-tubiao-shenhe",
            //     click: "checkInventory"
            // },
            {
                key: "reprieve",
                label: "暂缓",
                iconCls: "icon-tubiao-duigou-xianxing",
                click: "reprieve"
            },
            {
                key: "cancelReprieve",
                label: "取消暂缓",
                iconCls: "icon-tubiao-guanbi-xianxing",
                click: "cancelReprieve"
            }
        ],
        cardeditaddress: [
            {
				type: "text",
				key: "orderCode",
				label: "订单编号",
				enable: false
			},
			{
				type: "date",
				key: "orderDate", 
				label: "订单日期",
				required: true
			},
            {
				type: "refer",
				key: "receiveAddressId",
				label: "收货地址",
				refinfo: "saleorderCustomeraddress",
				disableFilter: true,
				compid: "receiveAddressBase",
				referId: "receiveAddress",
				required: true
			}
        ],
    }
}

function getNewConfig() {
    return {
        metas: {
            salesorderAddressMeta: {
                meta: {
                    //国家
                    countryId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["country"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        "refparam": "{\"EQ_isEnable\":\"1\"}"
                    }, //注册国别ID
                    countryName: {
                        type: "string"
                    }, //注册国家名称
                    provinceId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["region"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        "refparam": "{\"EQ_areaLevel\":\"1\"}"
                    }, //注册所在省份ID
                    provinceName: {
                        type: "string"
                    }, //注册所在省份名称
                    cityId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["region"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        "refparam": "{\"EQ_areaLevel\":\"2\"}"
                    }, //注册所在城市ID
                    cityName: {
                        type: "string"
                    }, //注册所在城市名称
                    cityCode: {
                        type: "string"
                    },
                    countyId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["region"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        "refparam": "{\"EQ_areaLevel\":\"3\"}"
                    }, //注册所在区/县
                    countyName: {
                        type: "string"
                    }, //注册所在区/县名称
                    countyCode: {
                        type: "string"
                    },
                    townId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["region"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        "refparam": "{\"EQ_areaLevel\":\"4\"}"
                    }, //注册所在街道/镇
                    townName: {
                        type: "string"
                    }, //注册所在街道/镇名称
                    townCode: {
                        type: "string"
                    },
                    detailAddr: {
                        type: "string",
                        required: true
                    }
                    // receiveAddressId: {
                    //     required: true,
                    //     type: "string"
                    // },
                },
                pageSize: 10
            },
            gridlogsMeta: {
                meta: {

                },
                pageSize: 10
            },
            gridinventorysMeta: {
                meta: {

                },
                pageSize: 10
            },
            splitCardMeta:{
                meta: {
                    // 订单日期
                    orderDate: {
                        type: "date"
                    },
                    // 交货日期(即客户期望的收货日期)
                    deliveryDate: {
                        type: "date"
                    },
                    saleOrgName:{
                        type:"string"
                    },
                    customerName:{
                        type:"string"
                    },
                    superiorCustomerName:{
                        type:"string"
                    },
                    orderTypeName:{
                        type:"string"
                    },
                    orderCode:{
                        type:"string"
                    },
                    invoiceId:{
                        type:"date"
                    },
                    invoiceContent:{
                        type:"string"
                    },
                    salesDeptName:{
                        type:"string"
                    },
                    marketAreaName:{
                        type:"string"
                    },
                    salesManagerName:{
                        type:"string"
                    },
                    deliveryDate:{
                        type:"date"
                    },
                    accountPeriodName:{
                        type:"string"
                    },
                    customerName:{
                        type:"string"
                    },
                    receiver:{
                        type:"string"
                    },
                    receiveContactPhone:{
                        type:"string"
                    },
                    totalNum:{
                        type:"string"
                    },
                    totalVolume:{
                        type:"string"
                    },
                    totalVolume:{
                        type:"string"
                    },
                    totalWeight:{
                        type:"string"
                    },
                    currencyName:{
                        type:"string"
                    },
                    totalAmount:{
                        type:"string"
                    },
                    totalDealAmount:{
                        type:"string"
                    },
                    offsetAmount:{
                        type:"string"
                    },
                    remark:{
                        type:"string"
                    },
                    totalGoodsSuppleAmount:{
                        type:"string"
                    },
                    orderStatusName:{
                        type:"string"
                    },// 商品ID
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
                    // 收货地址
                    orderReceiveAddress :{
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
                            // 收货人手机
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
                            }
                        }
                    },
                    // 发票信息
                    orderInvoice : {
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
                    }
                },
                pageSize: 10
            },
            soitemmeta:{
                params: {
                    cls: "com.yonyou.occ.b2b.service.dto.OrderItemDto"
                },
                meta: {
                    receiveStorageOrgId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    }, //收货库存组织
                    receiveStorageOrgName: {
                        type: 'string',
                    },
                    receiveStorageOrgCode: {
                        type: 'string',
                    },
                    receiveStorageCode: {
                        type: 'string',
                    },
                    demandStockOrgId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },
                    demandStockOrgName: {
                        type: 'string',
                    },
                    demandStockOrgCode: {
                        type: 'string',
                    }, //需求库存组织
                    receiveStorageId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['storeLocation']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //仓库
                    // orderPromRels: {
                    //     type: 'child',
                    //     meta: orderPromRels.meta
                    // },
                    // 订单主表主键
                    orderId: {
                        type: "string"
                    },
                    // 行号
                    rowNum: {
                        type: "string"
                    },
                    // 商品ID
                    goodsId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    // 商品编码
                    goodsCode: {
                        type: "string"
                    },
                    // 商品名称
                    goodsName: {
                        type: "string"
                    },
                    // 商品显示名称
                    goodsDisplayName: {
                        type: "string"
                    },
                     // 产品线
                    productLineId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["productLine"]),
                        refcfg:
                        '{"ctx":"/uitemplate_web","refName":"产品线","isMultiSelectedEnabled":true}',
                        refparam: '{"EQ_isEnable": "1"}',
                        required: true
                    },
                    productLineCode: { type: "string" },
                    productLineName: { type: "string" },
                    // 原始版本商品
                    originalGoodsId: {
                        type: "string"
                    },
                    // 商品分类ID
                    goodsCategoryId: {
                        type: "string"
                    },
                    // 商品图片
                    goodsImg: {
                        type: "string"
                    },
                    // 产品
                    productId: {
                        type: "string"
                    },
                    // 行合计重量
                    rowWeight: {
                        type: "string"
                    },
                    // 行合计体积
                    rowVolume: {
                        type: "string"
                    },
                    // 重量
                    weight: {
                        type: "string"
                    },
                    grossWeight: {
                        type: "string"
                    },
                    // 重量单位
                    weightUnitId: {
                        type: "string"
                    },
                    // 重量单位
                    weightUnitCode: {
                        type: "string"
                    },
                    // 重量单位
                    weightUnitName: {
                        type: "string"
                    },
                    // 重量精度
                    weightUnitPrecision: {
                        type: "string"
                    },
                    // 体积
                    volume: {
                        type: "string"
                    },
                    // 体积单位
                    volumeUnitId: {
                        type: "string"
                    },
                    // 体积单位
                    volumeUnitCode: {
                        type: "string"
                    },
                    // 体积单位
                    volumeUnitName: {
                        type: "string"
                    },
                    // 体积精度
                    volumeUnitPrecision: {
                        type: "string"
                    },
                    // 订货数量
                    orderNum: {
                        type: "numberFloat"
                    },
                    // 订货单位
                    orderNumUnitId: {
                        type: "string"
                    },
                    // 订货单位编码")
                    orderNumUnitCode: {
                        type: "string"
                    },
                    // 订货单位名称")
                    orderNumUnitName: {
                        type: "string"
                    },
                    // 主数量
                    mainNum: {
                        type: "numberFloat"
                    },
                    // 主数量单位
                    mainNumUnitId: {
                        type: "string"
                    },
                    // 主数量单位编码")
                    mainNumUnitCode: {
                        type: "string"
                    },
                    // 主数量单位名称")
                    mainNumUnitName: {
                        type: "string"
                    },
                    // 单位换算率
                    conversionRate: {
                        type: "integer"
                    },
                    // 单价
                    basePrice: {
                        type: "priceFloat"
                    },
                    /*// 基础折扣价 *不用
                          baseDiscountPrice: {
                              type: "priceFloat"
                          },*/
                    // 基准折扣价格
                    salePrice: {
                        type: "priceFloat"
                    },
                    basePricee:{
                        type: "priceFloat"
                    },//单价
                    // 成交价
                    dealPrice: {
                        type: "priceFloat"
                    },
                    // 上级原价
                    supplierPrice: {
                        type: "priceFloat"
                    },
                    // 冲抵前金额
                    amount: {
                        type: "amountFloat"
                    },
                    // 冲抵金额
                    offsetAmount: {
                        type: "amountFloat"
                    },
                    // 成交金额
                    dealAmount: {
                        type: "amountFloat"
                    },
                    // 币种
                    currency: {
                        type: "string"
                    },
                    // 是否为赠品
                    isGift: {
                        type: "float",
                        default: "0"
                    },
                    // 货补
                    goodsSupplement: {
                        type: "float",
                        default: "0"
                    },
                    // 促销活动
                    promotinId: {
                        type: "string"
                    },
                    // 计划发货日期
                    planDeliveryDate: {
                        type: "date"
                    },
                    // 发货库存组织
                    deliveryInvOrgId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"发货库存组织" }',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },
                    // 发货库存组织编码")
                    deliveryInvOrgCode: {
                        type: "string"
                    },
                    // 发货库存组织名称")
                    deliveryInvOrgName: {
                        type: "string"
                    },
                    // 发货仓库
                    deliveryWarehouseId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["warehouse"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    deliveryWarehouseCode: {
                        type: "string"
                    },
                    deliveryWarehouseName: {
                        type: "string"
                    },
                    // 备注
                    remark: {
                        type: "string"
                    },
                    // 累计发货数量
                    deliveryNum: {
                        type: "numberFloat"
                    },
                    // 累计出库数量
                    stockOutNum: {
                        type: "numberFloat"
                    },
                    // 累计入库数量
                    stockInNum: {
                        type: "numberFloat"
                    },
                    // 累计退货数量
                    returnNum: {
                        type: "numberFloat"
                    },
                    // 累计退款数量
                    refundNum: {
                        type: "numberFloat"
                    },
                    // 累计签收数量
                    signNum: {
                        type: "numberFloat"
                    },
                    // 累计补货数量
                    replenishNum: {
                        type: "numberFloat"
                    },
                    // 累计协同数量
                    coordinateNum: {
                        type: "numberFloat"
                    },
                    // 实际退货金额
                    totalReturnAmount: {
                        type: "amountFloat"
                    },
                    // 来源订单号
                    srcOrderCode: {
                        type: "string"
                    },
                    // 来源订单主键
                    srcOrderId: {
                        type: "string"
                    },
                    // 来源订单行主键
                    srcOrderItemId: {
                        type: "string"
                    },
                    closeReason: {
                        type: "string"
                    },
                    // 选配 id
                    baseGoodsOptId: {
                        type: "string"
                    },
                    // 选配 name
                    baseGoodsOptValue: {
                        type: "string"
                    },
                    // 是否可选配
                    isOptional: {
                        type: "string"
                    },
                    measurementUnitId: {
                        type: "string",
                        required: true
                    },
                    //计量单位
                    measurementUnitCode: {
                        type: "string",
                        required: true
                    }, //计量单位
                    measurementUnitName: {
                        type: "string",
                        required: true
                    }, //计量单位
                    arrivalBelongCode: {
                        type: "string",
                        required: true
                    },
                    parentGoodsId: {
                        type: "string",
                        required: true
                    },
                    parentRowNum: {
                        type: "string"
                    },
                    parentGoodsName: {
                        type: "string",
                        required: true
                    },
                    goodsNum: {
                        type: "numberFloat"
                    }, //数量
                    baseDiscountPrice: {
                        type: "priceFloat",
                        required: true
                    }, //单价
                    version: {
                        type: "Integer",
                        required: true
                    }, //商品版本
                    // 承运商
                    logisticsId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["suppliers"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"承运商" }',
                        refparam: '{"EQ_isEnable":"1","EQ_isCarrier":"1"}'
                    },
                    logisticsName: {
                        type: "string"
                    },
                    logisticsCode: {
                        type: "string"
                    },
                    // 项目
                    projectId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["project"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"项目" }',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    // "项目编码"
                    projectCode: {
                        type: "string"
                    },
                    // "项目名称"
                    projectName: {
                        type: "string"
                    },
                    // 供应商
                    supplierId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["suppliers"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"供应商名称" }',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    // "供应商编码"
                    supplierCode: {
                        type: "string"
                    },
                    // "供应商名称"
                    supplierName: {
                        type: "string"
                    },
                    dr: {
                        type: "integer"
                    },
                    // 订单状态
                    orderStatusId: {
                        type: "string"
                    },
                    // "订单状态编码")
                    orderStatusCode: {
                        type: "string"
                    },
                    // "订单状态名称")
                    orderStatusName: {
                        type: "string"
                    },
                    // 退货类型
                    returnTypeId: {
                        type: "string"
                    },
                    // 退货类型
                    returnTypeCode: {
                        type: "string"
                    },
                    // 退货类型
                    returnTypeName: {
                        type: "string"
                    },
                    // 退货原因
                    returnReasonId: {
                        type: "string"
                    },
                    // 退货原因
                    returnReasonCode: {
                        type: "string"
                    },
                    // 退货原因
                    returnReasonName: {
                        type: "string"
                    },
                    childGoodsQty: {
                        type: "string"
                    },
                    // 批号
                    batchCodeId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["batchCode"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"批号" }'
                    },
                    batchCodeCode: {
                        type: "string"
                    },
                    batchCodeName: {
                        type: "string"
                    },
                    // 促销折扣价格
                    promPrice: {
                        type: "priceFloat"
                    },
                    // 促销金额
                    promAmount: {
                        type: "amountFloat"
                    },
                    // 货补账户主键，仅供前端页面交互，不往后台传递
                    supplementAccountId: {
                        type: "string"
                    },
                    // 是否促销赠品行，仅供前端页面交互，不往后台传递
                    isPromGift: {
                        type: "integer"
                    },
                    // 销售组织名称
                    saleOrgName: {
                        type: "string"
                    },
                     // "销售组织编码")
                     saleOrgCode: {
                        type: "string"
                    },
                    // 销售组织
                    saleOrgId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
                        refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
                    },
                    // 结算财务组织
                    settleFinancialOrgId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"结算财务组织" }',
                        refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
                    },
                    // "结算财务组织编码")
                    settleFinancialOrgCode: {
                        type: "string"
                    },
                    // "结算财务组织名称")
                    settleFinancialOrgName: {
                        type: "string"
                    },
                    // 客户订单类型
                    orderTypeId: {
                        type: "string",
                        required: true
                    },
                    // "订单类型编码")
                    orderTypeCode: {
                        type: "string"
                    },
                    // "订单类型名称")
                    orderTypeName: {
                        type: "string"
                    },
                    // 货补费用单类型
                    costTypeId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["trantype"]),
                        refparam: '{"EQ_billTypeId":"CastType",  "IN_trantypeExtends.fieldValue": "pay02"}',
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货补订单类型" }'
                    },
                    costTypeName: {
                        type: "string"
                    },
                    costTypeCode: {
                        type: "string"
                    },
                    saleModel: {
                        type: "string"
                    }, // 销售模式
                    // 订单编码
                    orderCode: {
                        type: "string"
                    },
                    // 订单日期
                    orderDate: {
                        type: "date"
                    },
                    // 订单状态
                    orderStatusId: {
                        type: "string"
                    },
                    // "订单状态编码")
                    orderStatusCode: {
                        type: "string"
                    },
                    // "订单状态名称")
                    orderStatusName: {
                        type: "string"
                    },
                    // 客户
                    customerId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["customer_sale"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
                        refparam: '{"EQ_isChannelCustomer": "1"}'
                    },
                    // "客户编码")
                    customerCode: {
                        type: "string"
                    },
                    // "客户名称")
                    customerName: {
                        type: "string"
                    },
                    // 市场区域
                    marketAreaId: {
                        type: "string"
                    },
                    // "市场区域编码")
                    marketAreaCode: {
                        type: "string"
                    },
                    // "市场区域名称")
                    marketAreaName: {
                        type: "string"
                    },
                    // 客户经理
                    salesManagerId: {
                        type: "string"
                    },
                    // "客户经理编码")
                    salesManagerCode: {
                        type: "string"
                    },
                    // "客户经理名称")
                    salesManagerName: {
                        type: "string"
                    },
                    // 销售部门
                    salesDeptId: {
                        type: "string"
                    },
                    // "销售部门编码")
                    salesDeptCode: {
                        type: "string"
                    },
                    // "销售部门名称")
                    salesDeptName: {
                        type: "string"
                    },
                    // 运输方式
                    transportModeId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["transportmode"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"运输方式" }'
                    },
            
                    // "运输方式编码"
                    transportModeCode: {
                        type: "string"
                    },
                    // "运输方式名称"
                    transportModeName: {
                        type: "string"
                    },
                    // 结算方式
                    settleModeId: {
                        type: "string"
                    },
                    // "结算方式编码"
                    settleModeCode: {
                        type: "string"
                    },
                    // "结算方式名称"
                    settleModeName: {
                        type: "string"
                    },
                    // 交货日期(即客户期望的收货日期)
                    deliveryDate: {
                        type: "date"
                    },
                    // 总数量
                    totalNum: {
                        type: "numberFloat",
                        precision: 2
                    },
                    // 币种
                    currencyId: {
                        type: "string"
                    },
                    // "币种编码")
                    currencyCode: {
                        type: "string"
                    },
                    // "币种名称")
                    currencyName: {
                        type: "string"
                    },
                    // 币种单价精度
                    currencyPriceScale: {
                        type: "integer"
                    },
                    // 币种金额精度
                    currencyAmountScale: {
                        type: "integer"
                    },
                    // 总成交金额
                    totalDealAmount: {
                        type: "amountFloat"
                    },
                    // 冲抵前金额
                    totalAmount: {
                        type: "amountFloat"
                    },
                    // 费用冲抵金额
                    offsetAmount: {
                        type: "amountFloat"
                    },
                    // 总重量
                    totalWeight: {
                        type: "string"
                    },
                    // 总体积
                    totalVolume: {
                        type: "string"
                    },
                    // 订单来源
                    orderSource: {
                        type: "string"
                    },
                    isClose: {
                        type: "string",
                    },
                    closer: {
                        type: "string",
                    },
                    closeTime: {
                        type: "date"
                    },
                    closeReason: {
                        type: "string"
                    },
                    remark: {
                        type: "string"
                    },
                    rejecter: {
                        type: "string"
                    },
                    rejectTime: {
                        type: "date"
                    },
                    rejectReason: {
                        type: "string"
                    },
                    approveOpinion: {
                        type: "string"
                    },
                    // 审核状态
                    approveStatus: {
                        type: "integer"
                    },
                    // 来源订单号
                    srcOrderCode: {
                        type: "string"
                    },
                    // 来源订单主键
                    srcOrderId: {
                        type: "string"
                    },
                    // 承运商
                    logisticsId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["suppliers"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"承运商" }',
                        refparam: '{"EQ_isEnable":"1","EQ_isCarrier":"1"}'
                    },
                    logisticsName: {
                        type: "string"
                    },
                    logisticsCode: {
                        type: "string"
                    },
                    logisticsBillCode: {
                        type: "string"
                    },
                    // "账期名称"
                    accountPeriodName: {
                        type: "string"
                    },
                    superiorCustomerName: {
                        type: "string"
                    },
                    totalGoodsSuppleAmount: {
                        type: "string"
              },
                    // 退货原因
                    returnReasonId: {
                        type: "string"
                    },
                    // 退货原因
                    returnReasonCode: {
                        type: "string"
                    },
                    // 退货原因
                    returnReasonName: {
                        type: "string"
                    },
                    originalOrderCode: {
                        type: "string"
                    },
        
                    modifiedTime: {
                        type: "date"
                    },
                    modifier: {
                        type: "string"
                    },
                    creationTime: {
                        type: "date"
                    },
                    creator: {
                        type: "string"
                    },
                    approveTime: {
                        type: "date"
                    },
                    approver: {
                        type: "string"
                    },
                    state: {
                        type: "integer"
                    },
                    goodsAmout: {
                        type: "numberFloat"
                    }
                },
                pageSize: 10
            }
        },
        grids: {
            gridlogs: {
                domid: "grid_logs",
                umeta: {
                    id: "grid_logs",
                    data: "gridlogsItem",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "role",
                        dataType: "String",
                        title: "角色"
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "人员"
                    },
                    {
                        field: "approvalResult",
                        dataType: "String",
                        title: "审核结果"
                    },
                    {
                        field: "approvalDate",
                        dataType: "Datetime",
                        title: "审核时间",

                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注"
                    }
                ]
            },
            gridinventorys: {
                domid: "grid_inventorys",
                umeta: {
                    id: "grid_inventorys",
                    data: "gridinventorysItem",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "role",
                        dataType: "String",
                        title: "编码"
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "库存"
                    }
                ]
            },
            gridEditItem: {
                columns: [
                    {
                        field: "supplementAccountId",
                        dataType: "String",
                        title: "货补账户"
                    }
                ]
            },
            //采购订单商品信息
            gridSplit1: {
                domid: "grid_split_complexItem",
                umeta: {
                    id: "grid_split_complexItem",
                    data: "splitItems",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                    onBeforeEditFun: "checkHasBom"
                },
                columns: [{
                        field: "rowNum",
                        dataType: "String",
                        title: "行号",
                        editable: false
                    },
                    {
                        field: "goodsId",
                        dataType: "String",
                        title: "商品",
                        editType: "ncReferEditType",
                        renderType: "ncReferRender",
                        editOptions: {
                          validType: "string"
                        },
                        showField: "goodsName"
                    },
                    {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称",
                        editable: false
                    },
                    {
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码",
                        editable: false
                    },
                    {
                        field: "settleFinancialOrgId",
                        dataType: "String",
                        title: "结算财务组织",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "settleFinancialOrgName",
                        editOptions: {
                            validType: "string",
                            rel: {
                                refpk: "settleFinancialOrgId",
                                refname: "settleFinancialOrgName"
                            }
                        },
                        required: true
                    },
                    {
                        field: "goodsNum",
                        dataType: "String",
                        title: "订货数量"
                    },
                    {
                        field: "unitName",
                        dataType: "String",
                        title: "订货单位",
                        editable: false
                    },{
                        field: "mainNum",
                        dataType: "String",
                        title: "主数量",
                        editable: false
                    },{
                        field: "mainNumUnitName",
                        dataType: "String",
                        title: "主数量单位",
                        editable: false
                    },{
                        field: "basePrice",
                        dataType: "String",
                        title: "单价",
                        editable: false
                    },
                    {
                        field: "supplierPrice",
                        dataType: "String",
                        title: "上级原价",
                        editable: false,
                    },{
                        field: "salePrice",
                        dataType: "String",
                        title: "销售价格"
                    },
                    {
                        field: "dealPrice",
                        dataType: "String",
                        title: "成交价",
                        renderType: "floatRender",
                        editType: "float"
                    },{
                        field: "dealAmount",
                        dataType: "String",
                        title: "成交金额",
                        renderType: "floatRender",
                        editType: "float"
                    },{
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
                        }
                    },{
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
                        }
                    },{
                        field: "isGift",
                        dataType: "checkbox",
                        title: "是否为赠品",
                        renderType: "disableBooleanRender",
                    },{
                        field: "version",
                        dataType: "String",
                        title: "版本号",
                        editable: false
                    },{
                        field: "baseGoodsOptValue",
                        dataType: "String",
                        title: "选配结果展示值",
                        renderType: "goodsOptDetails",
                        editable: false,
                    },{
                        field: "weight",
                        dataType: "String",
                        title: "重量",
                        renderType: "weightUnitShowFn",
                        visible: false,
                        editable: false
                    },{
                        field: "rowWeight",
                        dataType: "String",
                        renderType: "weightUnitShowFn",
                        title: "行合计重量",
                        editable: false,
                        visible: false
                    },{
                        field: "netWeight",
                        dataType: "String",
                        title: "净重",
                        renderType: "weightUnitShowFn",
                        visible: false,
                        editable: false
                    },{
                        field: "rowNetWeight",
                        dataType: "String",
                        renderType: "weightUnitShowFn",
                        title: "行合计净重",
                        editable: false,
                        visible: false
                    },{
                        field: "volume",
                        dataType: "String",
                        title: "体积",
                        renderType: "volumeUnitShowFn",
                        visible: false,
                        editable: false
                    },{
                        field: "rowVolume",
                        dataType: "String",
                        renderType: "volumeUnitShowFn",
                        title: "行合计体积",
                        editable: false,
                        visible: false
                    },{
                        field: "productLineId",
                        dataType: "String",
                        title: "产品线",
                        editType: "ncReferEditType",
                        renderType: "ncReferRender",
                        editOptions: {
                          validType: "string"
                        },
                        showField: "productLineName"
                      },{
                        field: "isDeClose",
                        dataType: "Integer",
                        renderType: "isCloseRender",
                        title: "发货关闭",
                        editable: false,
                    },{
						field: "isClose",
						dataType: "checkbox",
						title: "订单关闭",
                        renderType: "disableBooleanRender",
                        editable: false,
					},{
                        field: "promotinName",
                        dataType: "String",
                        title: "促销活动",
                        editable: false,
                        editOptions: {
                            validType: "string"
                        }
                    },{
                        field: "logisticsId",
                        dataType: "String",
                        title: "承运商",
                        showField: "logisticsName",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        editOptions: {
                            validType: "string",
                            rel: {
                                refpk: "logisticsId",
                                refname: "logisticsName"
                            }
                        }
                    },{
                        field: "promAmount",
                        dataType: "String",
                        title: "促销金额",
                        renderType: "floatRender",
                        editType: "float",
                        editable: false
                    },{
                        field: "promPrice",
                        dataType: "String",
                        title: "促销折扣价格",
                        renderType: "floatRender",
                        editType: "float",
                        editable: false
                    },{
                        field: "remark",
                        dataType: "String",
                        title: "备注"
                    },
                    {
                        field: "batchCodeId",
                        dataType: "String",
                        title: "批号",
                        showField: "batchCodeName"
                    },{
                        field: "goodsSupplement",
                        dataType: "checkbox",
                        title: "是否货补",
                        renderType: "disableBooleanRender",
                        editable: false
                    },{
                        field: "supplierId",
                        dataType: "String",
                        title: "供应商",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "supplierName",
                        editOptions: {
                            validType: "string",
                            rel: {
                                refpk: "supplierId",
                                refname: "supplierName"
                            }
                        }
                    }
                ]
            },
            //采购订单bom结构信息
            gridSplit2: {
                domid: "grid_splitBom_complexBomItem",
                umeta: {
                    id: "grid_splitBom_complexBomItem",
                    data: "splitBomItems",
                    type: "grid",
                    editable: true,
                    showNumCol: true,
                    multiSelect: true
                },
                columns: [
                    {
                        field: "parentGoodsName",
                        dataType: "String",
                        title: "母件商品ID",
                        editable: false
                    },
                    {
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码",
                        editable: false
                    },
                    {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称",
                        editable: false
                    },{
                        field: "rowNum",
                        dataType: "String",
                        title: "行号",
                        editable: false
                    },{
                        field: "parentRowNum",
                        dataType: "String",
                        title: "母件商品行号",
                        editable: false
                    },{
                        field: "parentGoodsName",
                        dataType: "String",
                        title: "商品ID",
                        editable: false
                    },{
                        field: "parentGoodsName",
                        dataType: "String",
                        title: "商品名称",
                        editable: false
                    },{
                        field: "parentGoodsCode",
                        dataType: "String",
                        title: "商品编码",
                        editable: false
                    },{
                        field: "mainNum",
                        dataType: "String",
                        title: "主数量",
                        editable: false
                    },{
                        field: "orderNum",
                        dataType: "String",
                        title: "订货数量",
                        editable: false
                    },{
                        field: "orderNumUnitName",
                        dataType: "String",
                        title: "订货单位",
                        editable: false
                    },{
                        field: "basePricee",
                        dataType: "String",
                        title: "单价",
                        renderType: "floatRender",
                        editable: false
                    },{
                        field: "salePrice",
                        dataType: "String",
                        title: "销售价格",
                        renderType: "floatRender",
                        editable: false
                    },
                    {
                        field: "dealPrice",
                        dataType: "String",
                        title: "成交价",
                        renderType: "floatRender",
                        editType: "float",
                        editable: false
                    },{
                        field: "dealAmount",
                        dataType: "String",
                        title: "成交金额",
                        renderType: "floatRender",
                        editType: "float",
                        editable: false
                    },{
                        field: "baseGoodsOptValue",
                        dataType: "String",
                        title: "选配结果展示值",
                        renderType: "goodsOptDetails",
                        editable: false
                    },{
                        field: "weight",
                        dataType: "String",
                        title: "重量",
                        editable: false
                    },{
                        field: "volume",
                        dataType: "String",
                        title: "体积",
                        editable: false
                    },{
                        field: "goodsSupplement",
                        dataType: "checkbox",
                        title: "是否货补",
                        renderType: "disableBooleanRender",
                        editable: false
                    },{
                        field: "isGift",
                        dataType: "checkbox",
                        title: "是否为赠品",
                        renderType: "disableBooleanRender",
                        editable: false
                    },{
                        field: "version",
                        dataType: "String",
                        title: "版本号",
                        editable: false
                    }
                ]
            },
            gridDetailItem: {
                columns: [
                    {
                        field: "isSuspension",
                        dataType: "Integer",
                        editable: false,
                        title: "暂缓",
                        renderType: "disableBooleanRender",
                        default: 0
                    }
                ]
            }
        },
        cards:{
            splitCard:[{
                key: "saleOrgName",
                label: "销售组织ID",
            },{
                key: "customerName",
                label: "客户",
            },{
                key: "superiorCustomerName",
                label: "上级客户",
            },{
                key: "orderTypeName",
                label: "订单类型",
            },{
                key: "orderCode",
                label: "订单编码",
            },{
                key: "orderDate",
                label: "订单日期"
            },{
                key: "invoiceId",
                label: "发票信息",
            },{
                key: "invoiceContent",
                label: "开票单位名称",
            },{
                key: "salesDeptName",
                label: "销售部门",
            },{
                key: "marketAreaName",
                label: "市场区域",
            },{
                key: "salesManagerName",
                label: "客户经理",
            },{
                key: "deliveryDate",
                label: "交货日期",
            },{
                key: "accountPeriodName",
                label: "账期",
            },{
                key: "orderReceiveAddress.customerName",
                label: "收货信息",
            },{
                key: "orderReceiveAddress.receiver",
                label: "收货人",
            },{
                key: "orderReceiveAddress.receiverPhone",
                label: "联系人电话",
            },{
                key: "totalNum",
                label: "总数量",
            },{
                key: "totalVolume",
                label: "总体积",
            },{
                key: "totalVolume",
                label: "总净重",
            },{
                key: "totalWeight",
                label: "总重量",
            },{
                key: "currencyName",
                label: "币种",
            },{
                key: "totalAmount",
                label: "冲抵前金额",
            },{
                key: "totalDealAmount",
                label: "总成交金额",
            },{
                key: "offsetAmount",
                label: "费用冲抵金额",
            },{
                key: "remark",
                label: "备注",
            },{
                key: "totalGoodsSuppleAmount",
                label: "货补优惠",
            },{
                key: "orderStatusName",
                label: "订单状态",
            }]
        },
        buttons:{
            buttonSplit:[
                {
                    key: "addRow",
                    label: "增行",
                    iconCls: "icon-plus",
                    click: "addSplitrow"
                },
                {
                    key: "addBillPanel",
                    label: "货补商品",
                    iconCls: "icon-plus",
                    click: "showSplitAddSupplementItemsRef",
                    clickArg: "$additional"
                },
                {
                    key: "delRow",
                    label: "删行",
                    iconCls: "icon-shanchu1",
                    click: "delSplitRow"
                },
                {
                    key: "searchProm",
                    label: "促销匹配",
                    iconCls: "icon-tubiao-shenhe",
                    click: "splitsearchprom"
                },
                {
                    key: "closeProm",
                    label: "取消促销匹配",
                    iconCls: "icon-tubiao-guanbi-xianxing",
                    click: "splitcloseSearchprom"
                }
            ]
        },
        dialogs: {
            dialogeditaddress: [
                {
                    type: "refer",
                    key: "countryId",
                    label: "国家",
                    compid: "countryIdBase"
                },
                {
                    type: "refer",
                    key: "provinceId",
                    label: "所在省份",
                    // domid: "fh_provinceIdinfo",
                    compid: "provinceIdBase"
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "所在城市",
                    domid: "fh_cityIdinfo",
                    compid: "cityIdBase"
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "所在区/县",
                    domid: "fh_countyIdinfo",
                    compid: "countyIdBase"
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "所在街道",
                    domid: "fh_townIdinfo",
                    compid: "townIdBase"
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "detailAddr",
                    label: "详细地址"
                    // disableInEdit: true
                },
                // {
                //     compid: "receiveAddressBase",
                //     disableFilter: true,
                //     key: "receiveAddressId",
                //     label: "收货地址",
                //     referId: "receiveAddress",
                //     refinfo: "saleorderCustomeraddress",
                //     required: true,
                //     type: "refer",
                //     domid: "receiveAddressIds"
                // }

            ]
            
        },
    }
}

function getBaseData(model) {
    return {
        gridlogsItem: new u.DataTable(model.options.metas.gridlogsMeta),
        gridlogsSource: model.options.grids.gridlogs,
        gridinventorysItem: new u.DataTable(model.options.metas.gridinventorysMeta),
        gridinventorysSource: model.options.grids.gridinventorys,
        dialogeditaddresscomp: {},
        dialogeditaddressSource: model.options.dialogs.dialogeditaddress,
        cardeditaddressSource: model.options.cards.cardeditaddress,

        /** 订单拆分 */
        splitCardMeta: new u.DataTable(model.options.metas.splitCardMeta),
        splitCardOption: model.options.cards.splitCard,
        buttonSplitSource: model.options.buttons.buttonSplit,
        // 订单列表
        splitGrid1Option: model.options.grids.gridSplit1,
        splitGrid2Option: model.options.grids.gridSplit2,
        splitItems:  new u.DataTable(model.options.metas.soitemmeta),
        splitBomItems:  new u.DataTable(model.options.metas.soitemmeta),

        salesorderAddress: new u.DataTable(model.options.metas.salesorderAddressMeta)
    }
}


function getEvents(viewModel) {
    return {
        // 监听是否显示匹配商品按钮
        
        editEventListener: function () {
            var common = require("ocm_common");
            var refRow = viewModel.ItemRefList.createEmptyRow();
            viewModel.ItemRefList.setRowFocus(refRow);
            // 确定销售产品参照，为产品组合子表增行
            viewModel.ItemRefList.off("supplementproductref.valuechange").on("supplementproductref.valuechange", function (obj) {
                // 清空参照时不增行
                if (!obj.newValue) {
                    return;
                }
                var bomItems = [];
                var refer = $("#refContainersupplementproductref").data("uui.refer");
                var accountRef = $("#refContaineraccountIdBase").data("uui.refer");
                // 账户主键
                var supplementAccountId = null;
                if (accountRef && accountRef.values && accountRef.values[0]) {
                    supplementAccountId = accountRef.values[0].refpk;
                }
                if (!supplementAccountId) {
                    toastr.info("补货账户为空，请重新选择！");
                    return;
                }
                var refValues = refer.values;
                var goodsInfoDtos = [];
                var queryFinancial = [];
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                refValues.forEach(function (item) {
                    item.goodsAttrVals = "";
                    // 补充货补账户信息
                    item.supplementAccountId = supplementAccountId;
                    goodsInfoDtos.push({
                        originalGoodsId: item.originalGoodsId,
                        saleOrgId: saleOrgId
                    });
                    queryFinancial.push({
                        saleOrgId: item.saleOrgId,
                        productLineId: item.productLineId
                    });
                });

                // 根据选择的商品信息 去询价格
                var priceData = {
                    customer: viewModel.salesorderCard.getValue("customerId"),
                    saleModel: viewModel.salesorderCard.getValue("saleModel"),
                    tranType: viewModel.salesorderCard.getValue("orderTypeId"),
                    goodsInfoDtos: goodsInfoDtos
                };

                $._ajax({
                    url: window.pathMap.b2b + "/b2b/goods/find-price-by-goods",
                    data: JSON.stringify(priceData),
                    contentType: "application/json;charset=UTF-8",
                    type: "POST",
                    success: function (resp) {
                        var newData = [];
                        for (var i = 0; i < resp.length; i++) {
                            newData.push({
                                salePrice: resp[i].baseDiscountPrice,
                                basePrice: resp[i].basePrice,
                                supplierPrice: resp[i].supplierPrice
                            });
                        }
                        var data = $.extend(true, refValues, newData);
                        viewModel.initData(data, "supplement");
                    }
                });
            });
            viewModel.ItemRefList.off("productref.valuechange").on("productref.valuechange", function (obj) {
                // 清空参照时不增行
                if (!obj.newValue) {
                    return;
                }
                var refer = $("#refContainerproductref").data("uui.refer");
                var refValues = refer.values;
                var goodsInfoDtos = [];
                var queryFinancial = [];
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                refValues.forEach(function (item) {
                    item.goodsAttrVals = "";
                    item.id = "";
                    goodsInfoDtos.push({
                        originalGoodsId: item.originalGoodsId,
                        saleOrgId: saleOrgId
                    });
                    queryFinancial.push({
                        saleOrgId: item.saleOrgId,
                        productLineId: item.productLineId
                    });
                });

                // 根据选择的商品信息 去询价格
                var priceData = {
                    customer: viewModel.salesorderCard.getValue("customerId"),
                    saleModel: viewModel.salesorderCard.getValue("saleModel"),
                    tranType: viewModel.salesorderCard.getValue("orderTypeId"),
                    goodsInfoDtos: goodsInfoDtos
                };

                $._ajax({
                    url: window.pathMap.b2b + "/b2b/goods/find-price-by-goods",
                    data: JSON.stringify(priceData),
                    contentType: "application/json;charset=UTF-8",
                    type: "POST",
                    success: function (resp) {
                        var newData = [];
                        for (var i = 0; i < resp.length; i++) {
                            newData.push({
                                salePrice: resp[i].baseDiscountPrice,
                                basePrice: resp[i].basePrice,
                                supplierPrice: resp[i].supplierPrice
                            });
                        }
                        var data = $.extend(true, refValues, newData);
                        viewModel.initData(data);
                    }
                });
            });
            // 客户订单类型 change
            viewModel.salesorderCard.off("orderTypeId.valuechange").on("orderTypeId.valuechange", function (obj) {
                // 促销匹配的显示与隐藏
                if (obj.newValue == "FunctionalOrder") {
                    $(".searchProm").hide();
                } else {
                    $(".searchProm").show();
                }

                var refer = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

                if (refer && refer.length > 0) {
                    viewModel.salesorderCard.getCurrentRow().setValue("saleModel", refer[0].saleModelCode);
                }
                if (obj.newValue != obj.oldValue && obj.oldValue && viewModel.orderTypeIdValueChange == 0) {
                    common.dialog.confirmDialog({
                        msg1: "修改或者删除订单类型，会造成订单清空！",
                        msg2: "是否继续？",
                        width: "400px",
                        type: "error",
                        onOk: function () {
                            viewModel.orderTypeIdValueChange = 0;
                            viewModel.saleOrderItems.removeAllRows();
                            viewModel.batchSaleOrderBomItems.removeAllRows();
                            viewModel.salesorderCard.setValue("offsetAmount", 0);
                            viewModel.salesorderCard.setValue("totalDealAmount", 0);
                            viewModel.salesorderCard.setValue("totalNum", 0);
                        },
                        onCancel: function () {
                            viewModel.orderTypeIdValueChange = 1;
                            viewModel.salesorderCard.setValue("orderTypeId", obj.oldValue);
                        }
                    });
                } else {
                    viewModel.orderTypeIdValueChange = 0;
                }
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                var customerId = viewModel.salesorderCard.getValue("customerId");
                var orderType = obj.newValue;
                if (saleOrgId && customerId && orderType) {
                    viewModel.queryAccount(saleOrgId, customerId, orderType);
                }
            });
            viewModel.salesorderCard.off("receiveCustomerId.valuechange").on("receiveCustomerId.valuechange", function (obj) {
                viewModel.salesorderCard.setValue("orderReceiveAddress", null);
                viewModel.salesorderCard.setValue("orderReceiveAddress", "display", null);
                viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", "");
                viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", "");
                viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", "");
                // viewModel.orderReceiveAddress.removeAllRows();
                var orgIdObj= {
                    EQ_isEnable: 1,
                    "EQ_customer.id": obj.newValue
                }
                $("#salesorderCard_orderReceiveAddress").parent().attr("data-refparam", JSON.stringify(orgIdObj));		// 地址
                // 根据客户查询默认地址 
                if (obj.newValue) {
                    var ordertypeBody = {
                        customerId: obj.newValue
                    };
                    viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", true);
                    $("#salesorderCard_orderReceiveAddress").removeAttr("placeholder");
                    $._ajax({
                        type: "get",
                        url: window.pathMap.base +
                            "/base/customer-addresses/findByCustomerId",
                        data: ordertypeBody,
                        success: function (data) {
                            if (!data || data.length == 0) {
                                return;
                            }
                            var receiveAddress = data[0];
                            if (receiveAddress) {
                                viewModel.salesorderCard.setValue("orderReceiveAddress", receiveAddress.id);
                                viewModel.salesorderCard.setValue("refshowcontent_orderReceiveAddress_name", receiveAddress.name);
                                viewModel.orderReceiveAddress.setValue("receiveAddressId", receiveAddress.id);
                                viewModel.orderReceiveAddress.setValue("receiver", receiveAddress.firstReceiver);
                                viewModel.orderReceiveAddress.setValue("receiverTel", receiveAddress.firstReceiverTel);
                                viewModel.orderReceiveAddress.setValue("receiverPhone", receiveAddress.firstReceiverPhone);
                                viewModel.orderReceiveAddress.setValue("country", receiveAddress.countryName);
                                viewModel.orderReceiveAddress.setValue("countryId", receiveAddress.countryId);
                                viewModel.orderReceiveAddress.setValue("receiverProvince", receiveAddress.provinceName);
                                viewModel.orderReceiveAddress.setValue("receiverProvinceId", receiveAddress.provinceId);
                                viewModel.orderReceiveAddress.setValue("receiverCity", receiveAddress.cityName);
                                viewModel.orderReceiveAddress.setValue("receiverCityId", receiveAddress.cityId);
                                viewModel.orderReceiveAddress.setValue("receiverCounty", receiveAddress.countyName);
                                viewModel.orderReceiveAddress.setValue("receiverCountyId", receiveAddress.countyId);
                                viewModel.orderReceiveAddress.setValue("receiverTown", receiveAddress.townName);
                                viewModel.orderReceiveAddress.setValue("receiverTownId", receiveAddress.townId);
                                viewModel.orderReceiveAddress.setValue("receiverAddress", receiveAddress.detailAddr);

                                viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", receiveAddress.firstReceiver);
                                viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", receiveAddress.firstReceiverPhone);
                                var adr = (receiveAddress.countryName || "") + (receiveAddress.provinceName || "") + (receiveAddress.countyName || "") + (receiveAddress.townName || "") + (receiveAddress.detailAddr || "");
                                viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", adr);
                            }
                        }
                    });
                } else {
                    viewModel.salesorderCard.setValue("orderReceiveAddress", "");
                    viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", false);
                    $("#salesorderCard_orderReceiveAddress").attr({placeholder: "请先选择客户"});
                }
            });
            // 客户 change
            viewModel.salesorderCard.off("customerId.valuechange").on("customerId.valuechange", function (obj) {
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                var orgIdObj= {
                    EQ_isEnable: 1,
                    "EQ_customer.id": obj.newValue
                }
                viewModel.salesorderCard.setValue("orderReceiveAddress", "");
                viewModel.salesorderCard.setValue("receiveCustomerId", obj.newValue);
                $("#salesorderCard_orderInvoice").parent().attr("data-refparam", JSON.stringify(orgIdObj));		// 发票	
                $("#salesorderCard_accountPeriodId").parent().attr("data-refparam", JSON.stringify(orgIdObj));	// 账期

                if (obj.newValue) {
                    viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", true);
                    viewModel.salesorderCard.setMeta("orderInvoice", "enable", true);
                    $("#salesorderCard_orderReceiveAddress").removeAttr("placeholder");
                    $("#salesorderCard_orderInvoice").removeAttr("placeholder");
                } else {
                    viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", false);
                    viewModel.salesorderCard.setMeta("orderInvoice", "enable", false);
                    
                    $("#salesorderCard_orderReceiveAddress").attr({placeholder: "请先选择客户"});
                    $("#salesorderCard_orderInvoice").attr({placeholder: "请先选择客户"})
                }

                if (obj.newValue != obj.oldValue && obj.oldValue && viewModel.customerIdValueChange == 0) {
                    common.dialog.confirmDialog({
                        msg1: "修改或者删除客户，会造成订单清空！",
                        msg2: "是否继续？",
                        width: "400px",
                        type: "error",
                        onOk: function () {
                            var curRow = viewModel.salesorderCard.getCurrentRow();
                            var customerId = curRow.getValue("customerId");
                            viewModel.salesorderCard.setValue("orderInvoice", "display", null);
                            viewModel.salesorderCard.setValue("receiveCustomerId", "");
                            viewModel.salesorderCard.setValue("receiveCustomerId", "display", null);
                            viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", "");
                            viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", "");							
                            viewModel.salesorderCard.setValue("accountPeriodId", "");
                            viewModel.salesorderCard.setValue("receiveCustomerId", obj.newValue);
                            viewModel.saleOrderItems.removeAllRows();
                            viewModel.batchSaleOrderBomItems.removeAllRows();
                            viewModel.salesorderCard.setValue("offsetAmount", 0);
                            viewModel.salesorderCard.setValue("totalDealAmount", 0);
                            viewModel.salesorderCard.setValue("totalNum", 0);
                            var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                            var customerId = obj.newValue;
                            if (saleOrgId && customerId) {
                                var ordertypeBody = {
                                    search_EQ_organization: saleOrgId,
                                    search_EQ_customer: customerId,
                                    search_EQ_saleModel: "01"
                                };
                                var jurisdictionsBody = {
                                    "search_IN_saleOrganization.id": saleOrgId,
                                    "search_IN_customer.id": customerId
                                };
                                // 查询对应的客户经理和部门
                                viewModel.qureyCustomerManageAndOrderType(
                                    ordertypeBody,
                                    jurisdictionsBody
                                );
                            }
                            // 根据客户查询开票单位
                            if (customerId) {
                                var ordertypeBody = {
                                    customerId: customerId
                                };
                                $._ajax({
                                    type: "get",
                                    url: window.pathMap.base +
                                        "/base/customer-invoices/findByCustomerId",
                                    data: ordertypeBody,
                                    success: function (data) {
                                        if (!data || data.length == 0) {
                                            return;
                                        }
                                        var orderInvoice = data[0];
                                        if (orderInvoice) {
                                            viewModel.salesorderCard.setValue("orderInvoice", orderInvoice.id);
                                            viewModel.orderInvoice.setValue("invoiceId", orderInvoice.id);
                                            viewModel.orderInvoice.setValue("invoiceType", orderInvoice.invoiceTypeName);
                                            viewModel.orderInvoice.setValue("invoiceTitle", orderInvoice.invoiceOrgName);
                                            viewModel.orderInvoice.setValue("invoiceBank", orderInvoice.bankName);
                                            viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceOrgName);
                                            viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceOrgName);							
                                        }
                                    }
                                });
                                $._ajax({
                                    type: "get",
                                    url: window.pathMap.base +
                                        "/base/customer-managers/find-by-customer-id",
                                    data: ordertypeBody,
                                    success: function (data) {
                                        if (!data) {
                                            return;
                                        }
                                        var mgtCustomer = data; // {} 拿到上级客户的数据 赋值数据
                                        if (mgtCustomer) {
                                            viewModel.salesorderCard.setValue("superiorCustomerId", mgtCustomer.mgtCustomerId);
                                        }
                                    }
                                });
                                $._ajax({
                                    type: "get",
                                    url: window.pathMap.settlement +
                                        "/settlement/accountmatchs",
                                    data: {
                                        search_IN_customer: obj.newValue
                                    },
                                    success: function (data) {
                                        if (!data || data.content.length == 0) {
                                            return;
                                        }
                                        viewModel.salesorderCard.setValue("accountPeriodId", data.content[0].accountId);
                                    }
                                });
                            }
                        },
                        onCancel: function () {
                            viewModel.customerIdValueChange = 1;
                            viewModel.salesorderCard.setValue("customerId", obj.oldValue);
                            viewModel.salesorderCard.setValue("receiveCustomerId", obj.oldValue);
                        }
                    });
                } else {
                    viewModel.customerIdValueChange = 0;
                    var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                    var customerId = obj.newValue;
                    if (saleOrgId && customerId) {
                        var ordertypeBody = {
                            search_EQ_organization: saleOrgId,
                            search_EQ_customer: customerId,
                            search_EQ_saleModel: "01"
                        };
                        var jurisdictionsBody = {
                            "search_IN_saleOrganization.id": saleOrgId,
                            "search_IN_customer.id": customerId
                        };
                        // 查询对应的客户经理和部门
                        viewModel.qureyCustomerManageAndOrderType(ordertypeBody, jurisdictionsBody);
                    }
                    // 根据客户查询开票单位、上级客户
                    if (customerId) {
                        var ordertypeBody = {
                            customerId: customerId
                        };
                        $._ajax({
                            type: "get",
                            url: window.pathMap.base +
                                "/base/customer-invoices/findByCustomerId",
                            data: ordertypeBody,
                            success: function (data) {
                                if (!data || data.length == 0) {
                                    return;
                                }
                                var orderInvoice = data[0];
                                if (orderInvoice) {
                                    viewModel.salesorderCard.setValue("orderInvoice", orderInvoice.id);
                                    viewModel.orderInvoice.setValue("invoiceId", orderInvoice.id);
                                    viewModel.orderInvoice.setValue("invoiceType", orderInvoice.invoiceTypeName);
                                    viewModel.orderInvoice.setValue("invoiceTitle", orderInvoice.invoiceOrgName);
                                    viewModel.orderInvoice.setValue("invoiceBank", orderInvoice.bankName);
                                    viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceOrgName);
                                    viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceOrgName);							
                                }
                            }
                        });
                        $._ajax({
                            type: "get",
                            url: window.pathMap.base + "/base/customer-managers/find-by-customer-id",
                            data: ordertypeBody,
                            success: function (data) {
                                if (!data) {
                                    return;
                                }
                                var mgtCustomer = data; // {} 拿到上级客户的数据 赋值数据
                                if (mgtCustomer) {
                                    viewModel.salesorderCard.setValue("superiorCustomerId", mgtCustomer.mgtCustomerId);
                                }
                            }
                        });
                        $._ajax({
                            type: "get",
                            url: window.pathMap.settlement + "/settlement/accountmatchs",
                            data: {
                                search_IN_customer: obj.newValue
                            },
                            success: function (data) {
                                if (!data || data.content.length == 0) {
                                    return;
                                }
                                viewModel.salesorderCard.setValue("accountPeriodId", data.content[0].accountId);
                            }
                        });
                    }
                }
                var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                var customerId = obj.newValue;
                var orderType = viewModel.salesorderCard.getValue("orderTypeId");
                if (saleOrgId && customerId && orderType) {
                    viewModel.queryAccount(saleOrgId, customerId, orderType);
                }
            });

            // 销售组织 change
            viewModel.salesorderCard.off("saleOrgId.valuechange").on("saleOrgId.valuechange", function (obj) {
                var saleOrgId = obj.newValue;
                var orgIdObj= {
                    EQ_isEnable: 1,
                    "EQ_organization.id": saleOrgId
                }
                var orgIdManageObj= {
                    EQ_isEnable: 1,
                    "EQ_personPosts.organization.id": saleOrgId
                }
                $("#salesorderCard_salesDeptId").parent().attr("data-refparam", JSON.stringify(orgIdObj));
                $("#salesorderCard_marketAreaId").parent().attr("data-refparam", JSON.stringify(orgIdObj));
                $("#salesorderCard_salesManagerId").parent().attr("data-refparam", JSON.stringify(orgIdManageObj));

                $("#salesorderCard_customerId").parent().attr("data-refparam", JSON.stringify({
                    EQ_isEnable: "1",
                    EQ_isChannelCustomer: "1",
                    EQ_SaleOrder: saleOrgId
                }));
                $("#salesorderCard_receiveCustomerId").parent().attr("data-refparam", JSON.stringify({
                    EQ_isEnable: "1",
                    EQ_isChannelCustomer: "1",
                    EQ_SaleOrder: saleOrgId
                }));

                if (obj.newValue != obj.oldValue && obj.oldValue && viewModel.saleOrgIdValueChange == 0) {
                    common.dialog.confirmDialog({
                        msg1: "修改或者删除销售组织，会造成订单清空！",
                        msg2: "是否继续？",
                        width: "400px",
                        type: "error",
                        onOk: function () {
                            viewModel.salesorderCard.setValue("customerId", "");
                            viewModel.salesorderCard.setValue("orderInvoice", "");
                            viewModel.salesorderCard.setValue("orderReceiveAddress", "");
                            viewModel.saleOrderItems.removeAllRows();
                            viewModel.batchSaleOrderBomItems.removeAllRows();
                            viewModel.salesorderCard.setValue("offsetAmount", 0);
                            viewModel.salesorderCard.setValue("totalDealAmount", 0);
                            viewModel.salesorderCard.setValue("totalNum", 0);
                            if (saleOrgId && customerId) {
                                var ordertypeBody = {
                                    search_EQ_organization: saleOrgId,
                                    search_EQ_customer: customerId,
                                    search_EQ_saleModel: "01"
                                };
                                var jurisdictionsBody = {
                                    "search_IN_saleOrganization.id": saleOrgId,
                                    "search_IN_customer.id": customerId
                                };
                                // 查询对应的客户经理和部门
                                viewModel.qureyCustomerManageAndOrderType(
                                    ordertypeBody,
                                    jurisdictionsBody
                                );
                            }
                            // 根据销售组织判断客户是否可点击
                            if (saleOrgId) {
                                $("#salesorderCard_customerId").removeAttr("placeholder");
                                viewModel.salesorderCard.setMeta("customerId", "enable", true);
                            } else {
                                $("#customerId").attr("placeholder", "请先选择销售组织");
                                viewModel.salesorderCard.setMeta("customerId", "enable", false);
                            }
                        },
                        onCancel: function () {
                            viewModel.saleOrgIdValueChange = 1;
                            viewModel.salesorderCard.setValue("saleOrgId", obj.oldValue);
                        }
                    });
                } else {
                    viewModel.saleOrgIdValueChange = 0;
                }
                // 根据销售组织判断客户是否可点击
                if (saleOrgId) {
                    $("#salesorderCard_customerId").removeAttr("placeholder");
                    viewModel.salesorderCard.setMeta("customerId", "enable", true);
                    $("#salesorderCard_receiveCustomerId").removeAttr("placeholder");
                    viewModel.salesorderCard.setMeta("receiveCustomerId", "enable", true);
                } else {
                    $("#salesorderCard_customerId").attr("placeholder", "请先选择销售组织");
                    viewModel.salesorderCard.setMeta("customerId", "enable", false);
                    viewModel.salesorderCard.setMeta("receiveCustomerId", "enable", false);
                }

                var customerId = viewModel.salesorderCard.getValue("customerId");
                var saleOrgId = obj.newValue;
                var orderType = viewModel.salesorderCard.getValue("orderTypeId");
                if (saleOrgId && customerId && orderType) {
                    viewModel.queryAccount(saleOrgId, customerId, orderType);
                }
            });

            // 收货地址 change
            viewModel.salesorderCard.off("orderReceiveAddress.valuechange").on("orderReceiveAddress.valuechange", function (obj) {
                var receiveAddress = common.getRefDataByDtAndKey("salesorderCard", "orderReceiveAddress");
                var addressSimple = viewModel.orderReceiveAddress.getSimpleData();
                var gridItemData = viewModel.saleOrderItems.getSimpleData();
                if (addressSimple.length == 0 || !addressSimple) {
                    var simpleData = {
                        receiveAddressId: "",
                        receiver: "",
                        receiverTel: "",
                        receiverPhone: "",
                        country: "",
                        countryId: "",
                        receiverProvince: "",
                        receiverProvinceId: "",
                        receiverCity: "",
                        receiverCityId: "",
                        receiverCounty: "",
                        receiverCountyId: "",
                        receiverTown: "",
                        receiverTownId: "",
                        receiverAddress: ""
                    };
                    viewModel.orderReceiveAddress.setSimpleData(simpleData);
                }
                if (!obj.newValue) {
                    viewModel.orderReceiveAddress.setValue("dr", "1");
                }
                if (receiveAddress && receiveAddress.length > 0) {
                    receiveAddress = receiveAddress[0]
                    if (receiveAddress.refcode == "" && receiveAddress.refname == "" && receiveAddress.refpk == "") {
                        viewModel.orderReceiveAddress.setValue("dr", "1");
                        viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", "");
                        viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", "");
                    } else {
                        viewModel.orderReceiveAddress.setValue("dr", "0");
                        viewModel.salesorderCard.setValue("orderReceiveAddress", receiveAddress.id);

                        viewModel.orderReceiveAddress.setValue("receiveAddressId", receiveAddress.id);
                        viewModel.orderReceiveAddress.setValue("receiver", receiveAddress.firstReceiver);
                        viewModel.orderReceiveAddress.setValue("receiverTel", receiveAddress.firstReceiverTel);
                        viewModel.orderReceiveAddress.setValue("receiverPhone", receiveAddress.firstReceiverPhone);
                        viewModel.orderReceiveAddress.setValue("country", receiveAddress.countryName);
                        viewModel.orderReceiveAddress.setValue("countryId", receiveAddress.countryId);
                        viewModel.orderReceiveAddress.setValue("receiverProvince", receiveAddress.provinceName);
                        viewModel.orderReceiveAddress.setValue("receiverProvinceId", receiveAddress.provinceId);
                        viewModel.orderReceiveAddress.setValue("receiverCity", receiveAddress.cityName);
                        viewModel.orderReceiveAddress.setValue("receiverCityId", receiveAddress.cityId);
                        viewModel.orderReceiveAddress.setValue("receiverCounty", receiveAddress.countyName);
                        viewModel.orderReceiveAddress.setValue("receiverCountyId", receiveAddress.countyId);
                        viewModel.orderReceiveAddress.setValue("receiverTown", receiveAddress.townName);
                        viewModel.orderReceiveAddress.setValue("receiverTownId", receiveAddress.townId);
                        viewModel.orderReceiveAddress.setValue("receiverAddress", receiveAddress.detailAddr);

                        viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", receiveAddress.firstReceiver);
                        viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", receiveAddress.firstReceiverPhone);
                    }
                    // 添加承运商
                    viewModel.findCarrierData(receiveAddress);
                    // 根据是否启用调度中心来校验是否重新询库存组织和仓库
                    if (viewModel.SysParams_stock) {
                        setTimeout(function () {
                            viewModel.findByWarehouse(receiveAddress);
                        }, 0);
                    }
                }
            });

            // 客户开票单位 change
            viewModel.salesorderCard.off("orderInvoice.valuechange").on("orderInvoice.valuechange", function (obj) {
                var orderInvoice = common.getRefDataByDtAndKey("salesorderCard", "orderInvoice");
                var invoiceSimple = viewModel.orderInvoice.getSimpleData();
                if (invoiceSimple.length == 0 || !invoiceSimple) {
                    var simpleData = {
                        invoiceId: "",
                        invoiceType: "",
                        invoiceTitle: "",
                        invoiceBank: ""
                    };
                    viewModel.orderInvoice.setSimpleData(simpleData);
                }
                if (!obj.newValue) {
                    viewModel.orderInvoice.setValue("dr", "1");
                    viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", "");
                    viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", "");							
                }
                if (orderInvoice && orderInvoice.length > 0) {
                    orderInvoice = orderInvoice[0];
                    if (orderInvoice.refcode == "" && orderInvoice.refname == "" && orderInvoice.refpk == "") {;
                        viewModel.orderInvoice.setValue("dr", "1");
                    } else {
                        viewModel.orderInvoice.setValue("dr", "0");
                        viewModel.orderInvoice.setValue("invoiceId", orderInvoice.id);
                        viewModel.orderInvoice.setValue("invoiceType", orderInvoice.invoiceTypeName);
                        viewModel.orderInvoice.setValue("invoiceTitle", orderInvoice.invoiceOrgName);
                        viewModel.orderInvoice.setValue("invoiceBank", orderInvoice.bankName);
                        viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceOrgName);
                        viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceOrgName);							
                    }
                }
            });

            // 商品数量改变 计算金额
            viewModel.saleOrderItems.off("orderNum.valuechange").on("orderNum.valuechange", function (obj) {
                var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                // 计算商品行主数量、金额
                var rate = parseFloat(currRow.getValue("conversionRate") || "1");
                var mainNum = parseFloat(obj.newValue) * rate || 0;
                var salePrice = parseFloat(currRow.getValue("salePrice")) || 0;
                // 原价
                var orginalAmount = mainNum * salePrice
                /*
                * 促销后成交金额 = 促销价 * 主数量 - 促销金额(整单降价分摊)
                */
                var isChangeDealPrice = true;
                var changeDealPrice = parseFloat(currRow.getValue("dealPrice")) || 0;
                var promPrice = parseFloat(currRow.getValue("promPrice")) || 0;
                var promAmount = parseFloat(currRow.getValue("promAmount") || "0")
                var dealAfterAmount = 0
                if (changeDealPrice > 0 && changeDealPrice != salePrice && promAmount == 0 && promPrice == 0) {
                    isChangeDealPrice = false;
                    salePrice = changeDealPrice;
                    var dealAmount = changeDealPrice * mainNum || 0;
                } else {
                    dealAfterAmount = (promPrice || salePrice) * mainNum || 0;
                    var dealAmount = dealAfterAmount - promAmount;
                }
                var grossWeight = currRow.getValue("weight");
                var netWeight = currRow.getValue("netWeight");
                var rowWeight = mainNum * parseFloat(grossWeight || "0") || 0;
                var rowVolume = mainNum * parseFloat(currRow.getValue("volume") || "0") || 0;
                var rowNetWeight = mainNum * parseFloat(netWeight || "0") || 0;
                currRow.setValue("mainNum", mainNum);
                currRow.setValue("amount", orginalAmount);
                currRow.setValue("rowWeight", rowWeight);
                currRow.setValue("rowVolume", rowVolume);
                currRow.setValue("rowNetWeight", rowNetWeight);

                // 计算成交价  成本价计算方式   成交金额-促销金额-冲抵金额   /  数量
                if (isChangeDealPrice) var dealPrice = dealAmount && dealAmount > 0 ? dealAmount / mainNum || 0 : salePrice;
                if (currRow.getValue("isGift") != 1 && currRow.getValue("goodsSupplement") != 1) {
                    if (isChangeDealPrice) currRow.setValue("dealPrice", dealPrice);
                    currRow.setValue("dealAmount", dealAmount);
                } else {
                    currRow.setValue("dealPrice", 0);
                    currRow.setValue("dealAmount", 0);
                }
                // 计算合计金额、合计数量
                viewModel.computeHeadDataInfo();
                //联动bom数量
                var parentGoodsId = obj.rowObj.getValue("goodsId");
                var parentRowNum = obj.rowObj.getValue("rowNum");
                //获取全部bom信息
                var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                for (var i = 0; i < bomdata.length; i++) {
                    var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                    if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                        var bomAmount = bomdata[i].childGoodsQty * obj.newValue;
                        var bomMainNum = bomAmount * (bomdata[i].conversionRate || 1);
                        var bomDealAmount = bomMainNum * (bomdata[i].dealPrice || bomdata[i].basePrice || 0);
                        allrows[i].setValue("orderNum", bomAmount);
                        allrows[i].setValue("mainNum", bomMainNum);
                        allrows[i].setValue("dealAmount", bomDealAmount);
                        allrows[i].setValue("amount", bomDealAmount);
                    } else {
                        if (allrows[i] && allrows[i].getValue("goodsId") === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                            var amount = obj.newValue;
                            allrows[i].setValue("mainNum", amount * rate);
                            allrows[i].setValue("orderNum", amount);
                            allrows[i].setValue("dealAmount", dealAmount);
                            allrows[i].setValue("amount", dealAmount);
                            allrows[i].setValue("dealPrice", parseFloat(currRow.getValue("dealPrice")) || 0);
                        }
                    }
                }
            });
            // 赠品
            viewModel.saleOrderItems.off("isGift.valuechange").on("isGift.valuechange", function(obj) {
                var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                var isChecked = currRow.getValue("isGift");
                var dealAmount = currRow.getValue("dealAmount");
                var totalDealAmount = viewModel.salesorderCard
                    .getCurrentRow()
                    .getValue("totalDealAmount");
                var offsetAmount = viewModel.salesorderCard
                    .getCurrentRow()
                    .getValue("offsetAmount");
                var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");					

                // 非费用货补订单：手工勾选表体的赠品标识后，表体价格系列（原价、净价）自动清0；
                if (isChecked == 0 && viewModel.isCostFlush == 0) {
                    // 关闭赠品后重新 计算价格，
                    var orderNum = currRow.getValue("orderNum");
                    currRow.setValue("orderNum", 0.5);
                    currRow.setValue("orderNum", orderNum);
                    currRow.setValue("dealPrice", currRow.getValue("salePrice"));
                    viewModel.costFreezeEvent(false);
                }
                if ("03" == orderType[0].saleModelCode) {
                    currRow.setValue("dealPrice", 0);
                    currRow.setValue("offsetAmount", 0);
                    currRow.setValue("dealAmount", 0);
                    viewModel.salesorderCard
                        .getCurrentRow()
                        .setValue(
                            "totalDealAmount",
                            parseFloat(totalDealAmount) - parseFloat(dealAmount)
                        );
                }
                if ("03" != orderType[0].saleModelCode && isChecked == 1) {
                    currRow.setValue("dealPrice", 0);
                    currRow.setValue("dealAmount", 0);
                    currRow.setValue("offsetAmount", 0);
                    // currRow.setValue("salePrice", 0);
                    viewModel.salesorderCard
                        .getCurrentRow()
                        .setValue(
                            "totalDealAmount",
                            parseFloat(totalDealAmount) - parseFloat(dealAmount)
                        );
                }
                if ("03" == orderType[0].saleModelCode && isChecked == 1) {
                    viewModel.salesorderCard
                        .getCurrentRow()
                        .setValue(
                            "offsetAmount",
                            parseFloat(offsetAmount) - parseFloat(dealAmount)
                        );
                }
                //联动bom勾选
                var parentGoodsId = obj.rowObj.getValue("goodsId");
                var parentRowNum = obj.rowObj.getValue("rowNum");

                //获取全部bom信息
                var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                for (var i = 0; i < bomdata.length; i++) {
                    var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                    if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                        allrows[i].setValue("isGift", obj.newValue);
                    }
                }
                viewModel.computeHeadDataInfo(true);
            });
            // 830 成交价可编辑
            viewModel.saleOrderItems.off("dealPrice.valuechange").on("dealPrice.valuechange", function (obj) {
                // 有促销或费用冲抵时，不可编辑成交金额，不再处理监听事件
                if (viewModel.isCostFlush != 0) {
                    return;
                }
                var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                var dealPriceOpt = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid.getColumnByField("dealPrice");
                if (dealPriceOpt.options.editable) {
                    var mainNum = parseFloat(currRow.getValue("mainNum"));
                    var totalAmount = mainNum * parseFloat(obj.newValue);
                    totalAmount = totalAmount ? totalAmount : 0;
                    currRow.setValue("dealAmount", totalAmount);
                }
                viewModel.linkHeadAmount(viewModel.salesorderCard.getCurrentRow());
            });

            // 830 成交金额可编辑
            // viewModel.saleOrderItems.off("dealAmount.valuechange").on("dealAmount.valuechange", function (obj) {
            // 	// 有促销或费用冲抵时，不可编辑成交金额，不再处理监听事件
            // 	if (viewModel.isCostFlush != 0) {
            // 		return;
            // 	}
            // 	var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
            // 	var dealPriceOpt = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid.getColumnByField("dealPrice");
            // 	if (dealPriceOpt.options.editable) {
            // 		var rate = parseFloat(currRow.getValue("conversionRate") || "1");
            // 		var mainNum = parseFloat(currRow.getValue("mainNum"));
            // 		var dealPrice = (parseFloat(obj.newValue)) / mainNum;

            // 		dealPrice = dealPrice ? dealPrice : 0;
            // 		currRow.setValue("dealPrice", dealPrice);
            // 	}
            // 	viewModel.linkHeadAmount(viewModel.salesorderCard.getCurrentRow());
            // });

            // 830 单价可修改
            viewModel.saleOrderItems.off("salePrice.valuechange").on("salePrice.valuechange", function (obj) {
                // 有促销或费用冲抵时，不可编辑成交金额，不再处理监听事件
                if (viewModel.isCostFlush != 0) {
                    return;
                }
                var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
                var orderNum = currRow.getValue("orderNum") || 0;
                if (orderNum == 0) {
                    currRow.setValue("dealPrice", obj.newValue);
                }
                currRow.setValue("orderNum", orderNum);
                // 计算合计表头总原价
                var orderItems = viewModel.saleOrderItems.getSimpleData();
                var arr = [];
                for (var i = 0; i < orderItems.length; i++) {
                    if (orderItems[i].dr != 1) {
                        arr.push(orderItems[i]);
                    }
                }
                var totalAmount = 0;
                for (var i = 0; i < arr.length; i++) {
                    totalAmount += parseFloat(arr[i].mainNum * parseFloat(arr[i].salePrice) || 0);
                }
                viewModel.salesorderCard.getCurrentRow().setValue("totalAmount", totalAmount);
                //联动bom单价
                var parentGoodsId = obj.rowObj.getValue("goodsId");
                var parentRowNum = obj.rowObj.getValue("rowNum");
                //获取全部bom信息
                var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
                var salePrice = obj.newValue;
                for (var i = 0; i < bomdata.length; i++) {
                    var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                    if (
                        bomdata[i].parentGoodsId === parentGoodsId &&
                        bomdata[i].goodsId !== parentGoodsId &&
                        bomdata[i].parentRowNum == parentRowNum
                    ) {
                        allrows[i].setValue("salePrice", salePrice);
                    } else {
                        if (
                            allrows[i] &&
                            allrows[i].getValue("goodsId") === parentGoodsId &&
                            bomdata[i].parentRowNum == parentRowNum
                        ) {
                            allrows[i].setValue("salePrice", salePrice);
                        }
                    }
                }
            });
            // 库存组织联动仓库
            viewModel.saleOrderItems.off('deliveryInvOrgId.valuechange').on('deliveryInvOrgId.valuechange', function(obj) {
                var currRow = viewModel.saleOrderItems.getRowByRowId(
                    obj.rowId
                );
                if (currRow) {
                  currRow.setValue("deliveryWarehouseId", null);
                  currRow.setMeta("deliveryWarehouseId", 'display', null);
                }
                if (!currRow.getValue("goodsId")) return;
                if (obj.newValue) {
                    var stockData = {
                        customer: viewModel.salesorderCard.getValue("customerId"),
                        saleModel: viewModel.salesorderCard.getValue("saleModel"),
                        orderItemDtos: [currRow.getSimpleData()]
                    };

                    $._ajax({
                        url: window.pathMap.b2b + "/b2b/order/stock",
                        data: JSON.stringify(stockData),
                        contentType: "application/json;charset=UTF-8",
                        type: "POST",
                        success: function (resp) {
                            var num = resp ? (resp[currRow.getValue("goodsId")] || "") : "";
                            if (num) {
                                currRow.setValue("existingNum", num.onhandNum)
                                currRow.setValue("availableNum", num.availableNum)
                            }
                        }
                    });
                }
            });
            viewModel.saleOrderItems.off('deliveryWarehouseId.valuechange').on('deliveryWarehouseId.valuechange', function(obj) {
                var currRow = viewModel.saleOrderItems.getRowByRowId(
                    obj.rowId
                );
                if (!currRow.getValue("goodsId")) return;
                if (obj.newValue) {
                    var stockData = {
                        customer: viewModel.salesorderCard.getValue("customerId"),
                        saleModel: viewModel.salesorderCard.getValue("saleModel"),
                        orderItemDtos: [currRow.getSimpleData()]
                    };

                    $._ajax({
                        url: window.pathMap.b2b + "/b2b/order/stock",
                        data: JSON.stringify(stockData),
                        contentType: "application/json;charset=UTF-8",
                        type: "POST",
                        success: function (resp) {
                            var num = resp ? (resp[currRow.getValue("goodsId")] || "") : "";
                            if (num) {
                                currRow.setValue("existingNum", num.onhandNum)
                                currRow.setValue("availableNum", num.availableNum)
                            }
                        }
                    });
                }
            });
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
                    var combodata1 = common.dataconvert.toMap(
                        data["QY077"],
                        "name",
                        "code"
                    );
                    viewModel.closeReasonSrc(combodata1);
                    var combodata2 = common.dataconvert.toMap(
                        data["QY102"],
                        "name",
                        "code"
                    );
                    var combodata3 = common.dataconvert.toMap(
                        data["QY103"],
                        "name",
                        "code"
                    );
                    var combodata4 = common.dataconvert.toMap(
                        data["QY104"],
                        "name",
                        "code"
                    );
                    viewModel.arrivalBelongDataSource(combodata2);
                    viewModel.orderTypeSource(combodata3);
                    viewModel.purchaseTypeSource(combodata4);
                }
            });
            // 查询金额单位精度，币符
            $._ajax({
                url: window.pathMap.base + "/currency",
                data: {
                    size: 999,
                    page: 0
                },
                success: function (resp) {
                    var data = resp.content;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].isDefault == 1 && data[i].isEnable == 1) {
                            viewModel.CURRENCY = data[i];
                            viewModel.priceFormater = new u.NumberFormater(data[i].pricePrecision || 2),
                                viewModel.amountFormater = new u.NumberFormater(data[i].amountPrecision || 2),
                                // 单价类
                                viewModel.saleOrderItems.setMeta(
                                    "salePrice",
                                    "precision",
                                    data[i].pricePrecision
                                ); // 原价
                            viewModel.saleOrderItems.setMeta(
                                "promPrice",
                                "precision",
                                data[i].pricePrecision
                            ); // 促销价
                            viewModel.saleOrderItems.setMeta(
                                "dealPrice",
                                "precision",
                                data[i].pricePrecision
                            ); // 成交价
                            // 金额类
                            viewModel.saleOrderItems.setMeta(
                                "offsetAmount",
                                "precision",
                                data[i].amountPrecision
                            ); // 冲抵金额
                            viewModel.saleOrderItems.setMeta(
                                "dealAmount",
                                "precision",
                                data[i].amountPrecision
                            ); // 成交金额
                            viewModel.saleOrderItems.setMeta(
                                "promAmount",
                                "precision",
                                data[i].amountPrecision
                            ); // 促销折扣额
                            // 费用账户列表进度处理
                            viewModel.setAccountScale();
                            i = data.length;
                        }
                    }
                }
            });
            // 商品添加
            viewModel.saleOrderItems.off('goodsId.valuechange').on('goodsId.valuechange', function (obj) {
                // rowid 可能会变，最外层做判断货补使用
                var supplementRow = viewModel.saleOrderItems.getRowByRowId(
                    obj.rowId
                );
                if (supplementRow.getValue("goodsSupplement") == 1) return;
                if (viewModel.isSearchprom == 1) {
                    return
                }
                var refer = $("#refContainergoodsId").data("uui.refer");
                var refValues = refer.values;
                if (obj.newValue) {
                    var newValueArr = obj.newValue.split(',');
                    if (newValueArr.length == 1) {
                        var tData = "";
                        if (refValues) {
                            if (refValues[0].itemVal) {
                                tData = [refValues[0].itemVal]
                            } else {
                                tData = refValues.filter(function(refItem) {
                                    return refItem.refpk == obj.newValue;
                                });
                            }
                        } else {
                            tData = [viewModel.saleOrderItems.getRowByRowId(obj.rowId).getSimpleData()];
                        }
                        var currentRow = viewModel.saleOrderItems.getRowByRowId(
                            obj.rowId
                        );
                        var goodsInfoDtos = [];
                        var queryFinancial = [];
                        var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
                        
                        tData.forEach(function (item) {
                            goodsInfoDtos.push({
                                originalGoodsId: item.originalGoodsId || item.refpk,
                                saleOrgId: saleOrgId
                            });
                            item.id = "";
                            item.goodsAttrVals = '';
                            queryFinancial.push({
                                saleOrgId: saleOrgId,
                                productLineId: item.productLineId
                            });
                        });
                        // 根据选择的商品信息 去询价格
                        var priceData = {
                            customer: viewModel.salesorderCard.getValue("customerId"),
                            saleModel: viewModel.salesorderCard.getValue("saleModel"),
                            tranType: viewModel.salesorderCard.getValue("orderTypeId"),
                            goodsInfoDtos: goodsInfoDtos
                        }
                        $._ajax({
                            url: window.pathMap.b2b + '/b2b/goods/find-price-by-goods',
                            data: JSON.stringify(priceData),
                            contentType: 'application/json;charset=UTF-8',
                            type: 'POST',
                            success: function (resp) {
                                var newData = [];
                                for (var i = 0; i < resp.length; i++) {
                                    newData.push({
                                        salePrice: resp[i].baseDiscountPrice,
                                        basePrice: resp[i].basePrice,
                                        supplierPrice: resp[i].supplierPrice
                                    });
                                }
                                var data = $.extend(true, tData, newData);
                                initData(data, currentRow);
                            }
                        });
                    } else {
                        setTimeout(function () {
                            var currentRow = viewModel.saleOrderItems.getRowByRowId(
                                obj.rowId
                            );
                            var currentData = [],
                                data = [],
                                status = "new";
                            var isCurrentRow = true;
                            for (var i = 0; i < refValues.length; i++) {
                                var itemData = {
                                    goodsId:  refValues[i].refpk,
                                };
                                if (refValues[i].refpk == currentRow.getValue("goodsId") && isCurrentRow) {
                                    currentData.push(itemData);
                                    isCurrentRow = false;
                                    status = currentRow.getSimpleData().persistStatus == "new" ? "new" : "upd";
                                } else {
                                    data.push(itemData)
                                }
                            }
                            viewModel.saleOrderItems.addSimpleData(currentData, status);
                            viewModel.saleOrderItems.addSimpleData(data, 'new');
                            currentRow.setValue("dr", "1");
                            viewModel.saleOrderItems.removeRows(currentRow);
                            var parentRowNum = currentRow.getValue("rowNum");
                            var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                            allBomRows.forEach(function (item) {
                                if (item.getValue("parentRowNum") == parentRowNum) {
                                    viewModel.batchSaleOrderBomItems.removeRows(item);
                                    item.setValue("dr", "1");
                                }
                            })
                        }, 100);
                    }
                } else {
                    var currentRow = viewModel.saleOrderItems.getRowByRowId(
                        obj.rowId
                    );
                    var parentRowNum = currentRow.getValue("rowNum");
                    var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                    allBomRows.forEach(function (item) {
                        if (item.getValue("parentRowNum") == parentRowNum) {
                            viewModel.batchSaleOrderBomItems.removeRows(item);
                            item.setValue("dr", "1");
                        }
                    })
                }
                function initData(data, currentRow) {
                    if (data && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var rowNum = currentRow.getValue("rowNum") ? currentRow.getValue("rowNum") : viewModel.generaterowNum();
                            var newrow = ""
                            if (data.length > 1) {
                                var newrow = viewModel.saleOrderItems.createEmptyRow({
                                    unSelect: true
                                });
                            } else {
                                newrow = currentRow;
                                var productId = currentRow.getValue("goodsId");
                                var parentRowNum = currentRow.getValue("rowNum");
                                var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                                allBomRows.forEach(function (item) {
                                    if ((item.getValue("parentGoodsId") === productId || item.getValue("goodsId") === productId) && item.getValue("parentRowNum") == parentRowNum) {
                                        viewModel.batchSaleOrderBomItems.removeRows(item);
                                        item.setValue("dr", "1");
                                    }
                                })
                            }
                            var id = data[i].refpk || data[i].goodsId;
                            data[i].planDeliveryDate = new Date().getTime();
                            var saleModel = viewModel.salesorderCard.getValue("saleModel");
                            if (saleModel == "03") {
                                newrow.setValue("isGift", 1);
                                $(".u-checkbox-input").attr("disabled", "disabled");
                            } else {
                                if (data[i].isGift ==1) {
                                    newrow.setValue("isGift", 1);
                                } else {
                                    newrow.setValue("isGift",0);
                                }
                                $(".u-checkbox-input").removeAttr("disabled");
                            }
                            newrow.setValue("rowNum", rowNum);
                            newrow.setValue("basePrice", data[i].basePrice);
                            newrow.setValue("conversionRate", data[i].conversionRate);
                            newrow.setValue("deliveryInvOrgId", data[i].inventoryOrgId || data[i].deliveryInvOrgId);
                            newrow.setValue("refshowcontent_deliveryInvOrgId_name", data[i].inventoryOrgName || data[i].deliveryInvOrgName);
                            newrow.setValue("refrel_goodsId_code", data[i].refcode || data[i].goodsCode);
                            newrow.setValue("refrel_goodsId_name", data[i].refname || data[i].goodsName);
                            newrow.setValue("refshowcontent_goodsId_name", data[i].refname || data[i].goodsName || data[i].refshowcontent_goodsId_name);
                            newrow.setValue("goodsName", data[i].refname || data[i].goodsName);
                            newrow.setValue("goodsCode", data[i].refcode || data[i].goodsCode);
                            newrow.setValue("goodsImg", data[i].mainPictureFileUrl);
                            newrow.setValue("goodsDisplayName", data[i].displayName || data[i].refname);
                            newrow.setValue("isOptional", data[i].isOptional);
                            newrow.setValue("mainNumUnitId", data[i].basicUnitId || data[i].mainNumUnitId);
                            newrow.setValue("refshowcontent_mainNumUnitId_name", data[i].basicUnitName || data[i].mainNumUnitName || data[i].refshowcontent_mainNumUnitId_name);
                            newrow.setValue("netWeight", data[i].netWeight);
                            newrow.setValue("orderNumUnitId", data[i].assistUnitId || data[i].orderNumUnitId);
                            newrow.setValue("refshowcontent_orderNumUnitId_name", data[i].assistUnitName || data[i].orderNumUnitName || data[i].refshowcontent_orderNumUnitId_name);
                            newrow.setValue("originalGoodsId", data[i].originalGoodsId);
                            newrow.setValue("productId", data[i].productId);
                            newrow.setValue("productLineId", data[i].productLineId);
                            newrow.setValue("refshowcontent_productLineId_name", data[i].productLineName || data[i].refshowcontent_productLineId_name);
                            newrow.setValue("salePrice", data[i].salePrice);
                            newrow.setValue("supplierPrice", data[i].supplierPrice);
                            newrow.setValue("settleFinancialOrgId", data[i].settleFinancialOrgId);
                            newrow.setValue("refshowcontent_settleFinancialOrgId_name", data[i].settleFinancialOrgName || data[i].refshowcontent_settleFinancialOrgId_name);
                            newrow.setValue("version", data[i].version);
                            newrow.setValue("volume", data[i].volume);
                            newrow.setValue("volumeUnitId", data[i].volumeUnitId);
                            newrow.setValue("weightUnitId", data[i].weightUnitId);

                            newrow.setValue("weight", data[i].grossWeight || data[i].weight);
                            newrow.setValue("netWeight", data[i].netWeight);

                            data[i].orderNum && data[i].orderNum > 0 ? newrow.setValue("orderNum", data[i].orderNum) : newrow.setValue("orderNum", 0);
                            newrow.setValue("isClose", 0);
                            newrow.setValue("isDeClose", 0);
                            data[i].goodsSupplement && data[i].goodsSupplement > 0 ? newrow.setValue("goodsSupplement", 1) : newrow.setValue("goodsSupplement", 0);

                            var id = data[i].refpk;
                            //bom产品信息的添加
                            var bomdata = viewModel.findBomByParentId(id);
                            if (bomdata && bomdata.length > 0) {
                                var bomItem = bomdata[0].goodsBomChildren;
                                var bomItemData = []
                                for (var j = 0; j < bomItem.length; j++) {
                                    var item = bomItem[j];
                                    var parentRowNum = rowNum;
                                    if (item.isOptional == 1) {
                                        newrow.setValue('isOptional', 1);
                                        newrow.setValue("baseGoodsOptValue", '  ');
                                    }
                                    var mainNum = newrow.getValue("mainNum");
                                    var orderNum = newrow.getValue("orderNum");
                                    var bomRowNum = viewModel.generateBomrowNum();
                                    var parentGoodsId = cpRow.getValue("goodsId");
                                    var parentGoodsCode = cpRow.getValue("goodsCode");
                                    var parentGoodsName = cpRow.getValue("goodsName");
                                    item.refrel_parentGoodsId_name = parentGoodsName;
                                    item.refrel_parentGoodsId_code = parentGoodsCode;
                                    item.refshowcontent_parentGoodsId_name = parentGoodsName;
                                    item.id = null;
                                    item.goodsName = item.childGoodsName;
                                    item.goodsId = item.childGoodsId;
                                    item.refshowcontent_goodsId_name = item.childGoodsName;
                                    item.goodsCode = item.childGoodsCode;
                                    item.version = item.childGoodsVersion;
                                    item.childGoodsQty = item.childGoodsQty;
                                    item.mainNumUnitId = item.childGoodsUnitId;
                                    item.refshowcontent_mainNumUnitId_name = item.childGoodsUnitName;
                                    item.orderNumUnitId = item.childGoodsUnitId;
                                    item.refshowcontent_orderNumUnitId_name = item.childGoodsUnitName;
                                    item.orderNum = orderNum * item.childGoodsQty || 0;
                                    item.mainNum = mainNum * item.childGoodsQty || 0;
                                    item.parentRowNum = rowNum;
                                    item.rowNum = bomRowNum;
                                    item.isGift = 0;
                                    item.baseGoodsOptId = '';
                                    item.baseGoodsOptValue = '';
                                    item.parentGoodsId = data[i].refpk;
                                    item.mainNum = '';
                                    viewModel.currowBomNum(bomRowNum);
                                    bomItemData.push(item);
                                }
                                viewModel.batchSaleOrderBomItems.addSimpleData(bomItemData, {
                                    unSelect: true,
                                    status: 'new'
                                });
                            } else {
                                var parentRowNum = rowNum;
                                var bomRowNum = viewModel.generateBomrowNum();
                                var cpRow = viewModel.batchSaleOrderBomItems.createEmptyRow();
                                cpRow.setSimpleData(newrow.getSimpleData(), {
                                    status: "new"
                                });
                                var parentGoodsId = cpRow.getValue("goodsId");
                                var parentGoodsCode = cpRow.getValue("goodsCode");
                                  var parentGoodsName = cpRow.getValue("goodsName");
                                cpRow.setValue("rowNum", bomRowNum);
                                cpRow.setValue("parentRowNum", parentRowNum);
                                cpRow.setValue("parentGoodsId", parentGoodsId);
                                cpRow.setValue("refshowcontent_parentGoodsId_name", parentGoodsName);
                                cpRow.setValue("refrel_parentGoodsId_name", parentGoodsName);
                                cpRow.setValue("refrel_parentGoodsId_code", parentGoodsCode);
                                cpRow.setValue("refshowcontent_goodsId_name", parentGoodsName);
                                cpRow.setValue("refrel_goodsId_name", parentGoodsName);
                                cpRow.setValue("refrel_goodsId_code", parentGoodsCode);

                                cpRow.setValue("refshowcontent_mainNumUnitId_name", newrow.getValue("refshowcontent_mainNumUnitId_name"));
                                cpRow.setValue("refshowcontent_orderNumUnitId_name", newrow.getValue("refshowcontent_orderNumUnitId_name"));
                                cpRow.setValue("parentGoodsName", parentGoodsName);
                                cpRow.setValue("childGoodsQty", 1);
                                var getRow = viewModel.batchSaleOrderBomItems.getSimpleData();
                                getRow.forEach(function(item) {
                                    item.persistStatus = "new";
                                });
                            }
                        }
                        viewModel.findCarrierData();
                        if (viewModel.SysParams_stock) {
                            setTimeout(function() {
                                viewModel.findByWarehouse();
                            }, 0);
                        }
                        // setTimeout(function() {
                        // 	viewModel.editTemplate.updateExtendData();
                        // }, 1000)
                    }
                }
            });
        },

        // 取消显示匹配商品按钮
        showAddBillPanel_after: function () {
            $(".searchProm").show();
            
        },
        //显示审批日志信息
        detail_after: function (rowId) {

            // var common = require("ocm_common");

            $(".fei-ext-editbuttons").remove();
            var ordersplitfun = 'data-bind="click:orderSplit.bind($data, '+rowId+')"';
            var str = '<span class="fei-ext-editbuttons"><a class="ui-btn ui-btn-primary editAddress" data-bind="click: editAddress.bind($data,' + rowId + ')">修订</a><a class="ui-btn ui-btn-primary orderSplit"  ' + ordersplitfun + '>订单拆分</a></span>';
            
            $(".ui-bill-detail .ui-operate-btn").prepend(str);
            ko.applyBindings(viewModel, document.querySelector('.fei-ext-editbuttons'));
            // viewModel.app.getComp("detailcardTotalNum").setEditable(true);
            // viewModel.app.getComp("totalNum").setEditable(true);
            // 获取当前行数据
            var row = viewModel.salesorderList.getRowByRowId(rowId);
            var id = row.getValue("id");

            $._ajax({
                url: appCtx + viewModel.baseurl + "/detail",
                type: "get",
                data: {
                    id: id
                },
                success: function (data) {
                    if (data) {
                        // 审批日志填充
                        viewModel.gridlogsItem.setSimpleData(data.orderApprovalLogDtos, {
                            unSelect: true
                        });
                        $("#orderApprovalLogDtos").show().css("background", "#fff");
                        $(".ui-panel").css({
                            "min-height": "auto",
                            "padding": "0 16px",
                            "box-shadow": "none"
                        });
                    } else {
                        toastr.error();
                    }
                }
            });
        },

        // 修订
        editAddress: function(rowId){
            // debugger
            var row = viewModel.salesorderList.getRowByRowId(rowId);
            // if(row.getValue("orderStatusCode")&&row.getValue("orderStatusCode")=="Ext01"){
            //     var saleOrgId = viewModel.salesorderDetailCard.getValue("saleOrgId");
            //     var orgIdObj = {
            //         EQ_isEnable: 1,
            //         "EQ_customer.id": saleOrgId
            //     }
            //     $("#receiveAddressIds").attr("data-refparam", JSON.stringify(orgIdObj));
            //     viewModel.dialogeditaddresscomp.seteidtData();
            //     viewModel.dialogeditaddresscomp.show("地址修订", "500px", viewModel.editAddressSave); 
            // }else{
            //     toastr.error("单据号为："+row.getValue("orderCode")+"的订单不是已下达状态，不能进行订单修订！");
            // }

            if(row.getValue("orderStatusCode")&&row.getValue("orderStatusCode")=="Ext01"){
                var id = row.getValue("id");
                viewModel.findByParentid(id, function (data) {
                    viewModel.orderReceiveAddressNewAdd = data.orderReceiveAddress;
                    // viewModel.dialogeditaddresscomp.seteidtData();
                    var curRow = viewModel.dialogeditaddresscomp.viewModel.params;
                    curRow.removeAllRows();
                    curRow.createEmptyRow();
                    viewModel.dialogeditaddresscomp.show("地址修订", "500px", viewModel.editAddressSave); 
                })
            }else{
                toastr.error("单据号为："+row.getValue("orderCode")+"的订单不是已下达状态，不能进行订单修订！");
            }
            //弹出框
            // editAddressDialog = u.dialog({ id: 'dialog_edit_address', content: "#dialog_edit_address", width: "450px" });
            // var okButton = $("#dialog_edit_address .u-msg-ok");
            // okButton.unbind("click").click(function (row) {
            //     editAddressDialog.close();
            // });
        },
        editAddressSave: function() {
            // var basePass = viewModel.validate($("#dialogEditAddress")[0]);
            var basePass = viewModel.dialogeditaddresscomp.validate();
            if (basePass.passed) {
                debugger
                var dialogeditaddressdata = viewModel.dialogeditaddresscomp.geteidtData();
                
                // var dialogeditaddressdata = viewModel.dialogeditaddresscomp.viewModel.params.getSimpleData()[0];
                $._ajax({
                    url: appCtx + '/b2b/order-receive-address/modify-address',
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({
                        "id": viewModel.orderReceiveAddressNewAdd.id,
                        "receiveAddressId": viewModel.orderReceiveAddressNewAdd.receiveAddressId,
                        "country": "",
                        "countryId": dialogeditaddressdata.countryId || "",
                        "receiverCity": "",
                        "receiverCityId": dialogeditaddressdata.cityId || "",
                        "receiverCounty": "",
                        "receiverCountyId": dialogeditaddressdata.countyId || "",
                        "receiverProvince": "",
                        "receiverProvinceId": dialogeditaddressdata.provinceId || "",
                        "receiverTown": "",
                        "receiverTownId": dialogeditaddressdata.townId || "",
                        "receiverAddress": dialogeditaddressdata.detailAddr
                    }),
                    success: function (data) {
                        if (data.success == 'success') {
                            var orderReceiveAddress = data.detailMsg.data;
                            var adr = (orderReceiveAddress.country || "") + (orderReceiveAddress.receiverProvince || "") + (orderReceiveAddress.receiverCity || "") + (orderReceiveAddress.receiverTown || "") + (orderReceiveAddress.receiverAddress || "");
                            viewModel.salesorderDetailCard.setValue("refrel_orderReceiveAddress_name", adr);
                            toastr.success();
                            viewModel.dialogeditaddresscomp.close();
                        } else {
                            toastr.error();
                        }
                    }
                });
            } 
        },
        validate: function (element) {
            var result = viewModel.app.compsValidateMultiParam({
                element: element,
                showMsg: true
            });
            return result;
        },
        //返回列表页
        retListPanel_after: function () {
            $("#orderApprovalLogDtos").hide();
            $(".ui-panel").css({
                "min-height": "100%",
                "padding": "0 16px 40px",
                "box-shadow": "0 0 24px rgba(0, 0, 0, 0.15)"
            });
        },
        // 查看库存弹窗
        checkInventory: function () {
            
            // var cancelButton = $("#dialog_content_product .u-msg-cancel");
            // cancelButton.unbind("click").click(function(){
            // chooseProductDialog.close();
            // }); 

            // 获取id集合
            var rows = viewModel.saleOrderItems.getSelectedRows();
            if (rows && rows.length > 0) {
                var ids = [];
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
                // $._ajax({
                //     url: appCtx + viewModel.baseurl + '/?id=' + ids.join(','),
                //     type: "post",
                //     success: function (data) {
                //       console.log(data)
                //       if (data.success == 'success') {
                //         toastr.success();
                //         viewModel.search();
                            // 库存填充
                        // viewModel.gridinventorysItem.setSimpleData(data.orderApprovalLogDtos, {
                        //     unSelect: true
                        // });
                //       } else {
                //         toastr.error();
                //       }
                //     }
                //   });
                //弹出框
                checkInventoryDialog = u.dialog({ id: 'dialog_check_inventory', content: "#dialog_check_inventory", width: "450px" });
                var okButton = $("#dialog_check_inventory .u-msg-ok");
                okButton.unbind("click").click(function (row) {
                    checkInventoryDialog.close();
                });
            } else {
                toastr.warning("请至少选择一项");
            }
        },
        // 暂缓
        reprieve: function() {
            // 获取id集合
            var rows = viewModel.saleOrderItems.getSelectedRows();
            if (rows && rows.length > 0) {
                var ids = [];
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
                $._ajax({
                    url: appCtx + '/b2b/order-item/order-item-suspension?id=' + ids.join(','),
                    type: "post",
                    success: function (data) {
                      if (data.success == 'success') {
                        for (var i = 0; i < rows.length; i++) {
                            rows[i].setValue("isSuspension", "1");
                        }
                        toastr.success();
                      } else {
                        toastr.error();
                      }
                    }
                  });
            } else {
                toastr.warning("请至少选择一项");
            }
        },
        // 取消暂缓
        cancelReprieve: function() {
            // 获取id集合
            var rows = viewModel.saleOrderItems.getSelectedRows();
            if (rows && rows.length > 0) {
                var ids = [];
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].getValue("id"));
                }
                $._ajax({
                    url: appCtx + '/b2b/order-item/order-item-unsuspension?id=' + ids.join(','),
                    type: "post",
                    success: function (data) {
                      if (data.success == 'success') {
                        for (var i = 0; i < rows.length; i++) {
                            rows[i].setValue("isSuspension", "0");
                        }
                        toastr.success();
                      } else {
                        toastr.error();
                      }
                    }
                  });
            } else {
                toastr.warning("请至少选择一项");
            }
        },
        // 保存拆分订单
        saveBillSplite: function(rowId) {

        },
        // 拆分订单
        orderSplit: function (rowId) {
            var row = viewModel.salesorderList.getRowByRowId(rowId);
            if(row.getValue("orderStatusCode")&&(row.getValue("orderStatusCode")=="04"||row.getValue("orderStatusCode")=="07")){
                $("#orderApprovalLogDtos").hide();
                $(".ui-panel").hide();
                $(".ui-bill-split").show();
                $(".ui-bill-split").animateCss("fadeIn");
                $._ajax({
					url: appCtx + viewModel.baseurl + "/detail",
					type: "get",
					data: {
						id: row.getValue("id")
					},
					success: function (data) {
						if (data) {
                            console.log(data)
                            viewModel.splitCardMeta.setSimpleData(data);
                            viewModel.splitItems.setSimpleData(data.orderItems, {unSelect: true});
                            viewModel.splitBomItems.setSimpleData(data.orderItemBoms, {unSelect: true});
						} else {
							toastr.error();
						}
					}
				});
            }else{
                toastr.error("单据号为："+row.getValue("orderCode")+"的订单不是审批通过或部分出库状态，不能进行订单拆分");
            }
        },
        // 询促销 促销匹配
        splitsearchprom: function() {
            // 已做过促销或冲抵，则直接返回
            if (viewModel.validIfPromOrOffset()) {
                return;
            }
            var result = viewModel.validateBill();
            if (!result) {
                return;
            }
            var customerId = viewModel.splitCardMeta.getValue("customerId");
            var saleOrgId = viewModel.splitCardMeta.getValue("saleOrgId");
            var orderTypeId = viewModel.splitCardMeta.getValue("orderTypeId"); // 订单类型
            var orderList = viewModel.splitCardMeta.getSimpleData();
            var orderType = viewModel.splitCardMeta.getValue("orderTypeId");

            var orderItems = [];
            for (var i = 0; i < orderList.length; i++) {
                if (orderList[i].dr != 1 && orderList[i].isGift != 1 && orderList[i].goodsSupplement != 1) {
                    orderList[i].salePrice = orderList[i].salePrice ? orderList[i].salePrice : 0;
                    orderItems.push(orderList[i]);
                }
            }
            if (!customerId) {
                toastr.warning("请先选择客户！");
                return false;
            }
            if (!saleOrgId) {
                toastr.warning("请先选择销售组织！");
                return false;
            }
            if (!orderTypeId) {
                toastr.warning("请先选择订单类型！");
                return false;
            }
            if (!orderItems || orderItems.length <= 0) {
                toastr.warning("“没有匹配到适用的促销政策”，订单可继续编辑");
                return false;
            }
            if (orderType && orderType[0].saleModelCode == "03") {
                toastr.warning("订单类型为货补订单不能进行促销匹配！");
                return;
            }
            var postdata = {
                customerId: customerId,
                saleOrgId: saleOrgId,
                isPrimaryChannel: 1,
                reqOrderItems: orderItems,
                tranType: orderTypeId
            };
            $._ajax({
                url: window.pathMap.b2b + "/b2b/prom/reqorder-prom",
                type: "post",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(postdata),
                success: function(res) {
                    if (!res.mutualRelationShip) {
                        toastr.warning("没有匹配到适用的促销政策”，订单可继续编辑");
                        return;
                    }
                    if (res.mutualRelationShip.length > 1) {
                        viewModel.showProm(res, orderItems)
                        return;
                    }
                    
                    viewModel.promSuccess(res)
                }
            });
        },
        // 取消促销匹配
        splitcloseSearchprom: function() {
            // 判断是否冲抵过
            if (viewModel.isCostFlush == 1) {
                toastr.warning("已经冲抵后不可再做此操作，如要操作，请先取消冲抵!");
                return;
            }
            if (viewModel.isSearchprom != 1) {
                toastr.warning("您还没有做过促销匹配，无法进行该操作!");
                return;
            }
            // 判断是否有促销前数据
            if (viewModel.SearchpromAfter && viewModel.SearchpromAfterBom) {
                viewModel.saleOrderItems.removeAllRows();
                viewModel.batchSaleOrderBomItems.removeAllRows();

                var itemRow = viewModel.saleOrderItems.getAllRealRows();
                var bomRow = viewModel.batchSaleOrderBomItems.getAllRealRows();
                itemRow.forEach(function(item) {
                    item.setValue("dr", 1);
                });
                bomRow.forEach(function(item) {
                    item.setValue("dr", 1);
                });
                viewModel.saleOrderItems.setSimpleData(viewModel.SearchpromAfter);
                viewModel.batchSaleOrderBomItems.setSimpleData(
                    viewModel.SearchpromAfterBom
                );
            } else {
                var itemRows = viewModel.saleOrderItems.getAllRealRows();
                itemRows.forEach(function(item) {
                    var amount = item.getValue("salePrice") * item.getValue("mainNum");
                    item.setValue("dealPrice", item.getValue("salePrice"));
                    item.setValue("promPrice", item.getValue("salePrice"));
                    item.setValue("promotinId", "");
                    item.setValue("promotinName", "");
                    item.setValue("amount", amount);
                    item.setValue("dealAmount", amount);
                })
                var giftPromRows = itemRows.filter(function(row) {
                    return row.getValue("isGift") == 1 && (row.getValue("isPromGift") == 1 || item.getValue("promotinId"));
                });
                giftPromRows.forEach(function(row, index) {
                    row.setValue("dr", "1");
                    var goodsId = row.getValue("goodsId"),
                        rowNum = row.getValue("rowNum"),
                        allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
                    allBomRows.forEach(function(item, index) {
                        if (
                            (item.getValue("parentGoodsId") === goodsId ||
                                item.getValue("goodsId") === goodsId) &&
                            item.getValue("parentRowNum") == rowNum
                        ) {
                            item.setValue("dr", "1");
                            viewModel.batchSaleOrderBomItems.removeRows(item);
                        }
                    });
                });
                viewModel.saleOrderItems.removeRows(giftPromRows);
            }
            viewModel.SearchpromAfter = '';
            viewModel.SearchpromAfterBom = '';
            viewModel.orderPriceProm = '';
            viewModel.giftProms = '';
            viewModel.reqOrderPromRels = '';

            viewModel.computeHeadDataInfo();
            viewModel.salesorderCard.setValue("promAmount", 0);
            viewModel.isSearchprom = 0;
            viewModel.costFreezeEvent(false);
        },
        // 增行
        addSplitrow: function () {
            var common = require("ocm_common");
            if (viewModel.isSplitAvailable()) {
                // var orderType = common.getRefDataByDtAndKey("splitCardMeta", "orderTypeId");
                // var saleOrg = common.getRefDataByDtAndKey("splitCardMeta", "saleOrgId");
                var orderType = viewModel.splitCardMeta.getValue("orderTypeId");
                var saleOrg = viewModel.splitCardMeta.getValue("saleOrgId");
                var saleModelId = orderType;
                var saleOrgId = saleOrg;
                // 查询订单行根据参数控制价格可编辑
                $._ajax({
                    url: window.pathMap.b2b + '/b2b/order-control-rule/find-rule',
                    data: {
                        trantypeId: saleModelId,
                        saleOrgId: saleOrgId
                    },
                    success: function (resp) {
                        if (resp && resp.length > 0) {
                            var data = resp[0];
                            // 存储标识，添加商品时校验对呀规则进行不同操作
                            viewModel.isPriceEditFind = data.priceEditFind;
                            viewModel.isPriceEditNotFind = data.priceEditNotFind;
                        }
                    }
                });
                var creatRow = viewModel.splitItems.createEmptyRow();
                creatRow.setValue("goodsId", "");
            }
        },
        // 删行
        delSplitRow: function (data, rowId) {
            var common = require("ocm_common");
            if (typeof data == "number") {
                viewModel.splitItems.setRowSelectbyRowId(rowId);
            }
            var rows = viewModel.splitItems.getSelectedRows();
            // 判断选择的是否全为货补行
            // 已做过促销或冲抵，则直接返回
            var flag = "";
            var ifAllSupplymentItems = rows.every(function (row) {
                var goodsSupplement = row.getValue("goodsSupplement");
                return goodsSupplement && goodsSupplement == 1;
            })
            if (ifAllSupplymentItems) {
                flag = "03";
            }
            if (viewModel.validIfPromOrOffset(flag)) {
                return;
            }
            if (rows && rows.length > 0) {
                common.dialog.confirmDialog({
                    msg1: "确认删除这些项？",
                    msg2: "此操作不可逆",
                    width: "400px",
                    type: "error",
                    onOk: function() {
                        rows.forEach(function(row, index) {
                            row.setValue("dr", "1");
                            var productId = row.getValue("goodsId"),
                                rowNum = row.getValue("rowNum"),
                                allBomRows = viewModel.splitItems.getAllRealRows();
                                allBomRows.forEach(function(item, index) {
                                    if (
                                        (item.getValue("parentGoodsId") === productId ||
                                            item.getValue("goodsId") === productId) &&
                                        item.getValue("parentRowNum") == rowNum
                                    ) {
                                        item.setValue("dr", "1");
                                        viewModel.splitItems.removeRows(item);
                                    }
                                });
                        });
                        viewModel.splitItems.removeRows(rows);
                        // 计算合计金额、合计数量
                        viewModel.computeSplitHeadDataInfo();
                    }
                });
            } else {
                toastr.warning("请先选择一行数据");
            }
        },
        //参照选择批量新增子表（销售产品）
        showSplitAddItemsCommonRef: function (arg, saleModel, itemRefId) {
            var eleId = itemRefId ? itemRefId : "splitorderaddItemsRef";
            // 已做过促销或冲抵，则直接返回
            if (viewModel.validIfPromOrOffset(saleModel)) {
                return;
            }
            if (viewModel.isSplitAvailable()) {
                viewModel.clearItemsRef();
                // var customer = common.getRefDataByDtAndKey("splitCardMeta", "customerId");
                // var orderType = common.getRefDataByDtAndKey("splitCardMeta", "orderTypeId");
                var customer = viewModel.splitCardMeta.getValue("customerId");
                var orderType = viewModel.splitCardMeta.getValue("orderTypeId");
                // var saleOrg = $("#refContainersalesorderCard_saleOrgId").data("uui.refer").values;
                var saleOrg = viewModel.splitCardMeta.getValue("saleOrgId");
                var customerId = customer;
                // var saleModel = saleModel || (orderType && orderType[0].saleModelCode);
                var saleModel = saleModel;
                // var saleModelId = orderType && orderType[0].id;
                var saleModelId = orderType;
                // var saleOrgId = saleOrg && (saleOrg[0].id || saleOrg[0].refpk);
                var saleOrgId = saleOrg;
                var condition = {
                    search_customerId: customerId,
                    search_saleModel: saleModel,
                    search_customerRankCode: "01",
                    search_costType: "",
                    search_organization: saleOrgId
                };

                // 如果是参照货补商品，补充查询参数
                if ("03" == saleModel) {
                    condition.search_costType = "Goodssupplement";
                    viewModel.setSplitSearchEleDefaultRefParams();
                }
                $("#" + eleId).attr(
                    "data-refparam",
                    JSON.stringify(u.extend({}, {}, condition))
                );
                /**
                 * @example 判断成交价格和成交金额是否可编辑
                 * @param  询到价是否可改 : priceEditFind
                 * @param  询不到价是否可改 : priceEditNotFind
                 */
                // 查询订单行根据参数控制价格可编辑
                $._ajax({
                    url: window.pathMap.b2b + "/b2b/order-control-rule/find-rule",
                    data: {
                        trantypeId: saleModelId,
                        saleOrgId: saleOrgId
                    },
                    success: function (resp) {
                        if (resp && resp.length > 0) {
                            var data = resp[0];
                            // 存储标识，添加商品时校验对呀规则进行不同操作
                            viewModel.isPriceEditFind = data.priceEditFind;
                            viewModel.isPriceEditNotFind = data.priceEditNotFind;
                        }
                    }
                });
                if (arg == "$normal") {
                    viewModel.wichAddButton = "normal";
                } else if (arg == "$additional") {
                    viewModel.wichAddButton = "additional";
                }
                $("#" + eleId + " .refer").trigger("click");
            }
        },
        // 为补货账户参照设置默认查询参数
        setSplitSearchEleDefaultRefParams: function() {
            var customerId = viewModel.splitCardMeta.getValue("customerId");
            var saleOrgId = viewModel.splitCardMeta.getValue("saleOrgId");
            // var accountIdComp = viewModel.app.getComp("accountIdBase");
            var condition = {
                "search_saleOrgId": saleOrgId,
                "search_customerId": customerId
            }
            var accountRef = $("#accountIdBaseKey", ".qy-gridTree-searchContainer");
            if(accountRef && accountRef[0]) {
                accountRef.attr("data-refparam", JSON.stringify(condition));
            }
        },
        //补货商品新增
        showSplitAddSupplementItemsRef: function (arg) {
            viewModel.showSplitAddItemsCommonRef(arg, "03", "splitorderaddSupplementItemsRef");
        },
        // 表头检查
        isSplitAvailable: function (type) {
            var cardData = viewModel.splitCardMeta.getCurrentRow().getSimpleData();
            var customerId = cardData.customerId,
                orderTypeId = cardData.orderTypeId,
                saleOrgId = cardData.saleOrgId;

            if (!saleOrgId) {
                toastr.warning("请先选择销售组织！");
                return false;
            }
            if (!customerId) {
                toastr.warning("请先选择客户！");
                return false;
            }
            if (!orderTypeId) {
                toastr.warning("请先选择客户订单类型！");
                return false;
            }
            return true;
        },
        // 计算表头合计数据
        computeSplitHeadDataInfo: function () {
            var common = require("ocm_common");
            var orderItems = viewModel.splitCardMeta.getSimpleData();
            // 计算表头货补优惠金额
            var supplementItems = orderItems.filter(function (item) {
                return item.dr != 1 && item.goodsSupplement && item.goodsSupplement == 1;
            });
            if (supplementItems && supplementItems.length > 0) {
                var totalGoodsSuppleAmount = 0;
                supplementItems.forEach(function (item) {
                    totalGoodsSuppleAmount += parseFloat(item.mainNum * item.salePrice || 0);
                });
                viewModel.splitCardMeta.getCurrentRow().setValue("totalGoodsSuppleAmount", viewModel.amountFormater.format(totalGoodsSuppleAmount));
            }
            // 表头合计
            var totalAmount = 0,
                totalDealAmount = 0,
                totalNum = 0,
                totalWeight = 0,
                totalVolume = 0,
                totalVolume = 0,
                totalNetWeight = 0;
            for (var i = 0; i < orderItems.length; i++) {
                if (orderItems[i].dr == 1) continue;
                // 过滤赠品行，货补行
                if (viewModel.ifOffsetGoods(orderItems[i])) {
                    totalDealAmount += orderItems[i].dealAmount ? parseFloat(orderItems[i].dealAmount) : 0;
                }
                totalAmount += parseFloat(viewModel.amountFormater.format(parseFloat(orderItems[i].mainNum) * parseFloat(orderItems[i].salePrice) || 0));
                totalNum += orderItems[i].mainNum ? parseFloat(orderItems[i].mainNum) : 0;
                totalWeight += orderItems[i].rowWeight ? parseFloat(orderItems[i].rowWeight) : 0;
                totalVolume += orderItems[i].rowVolume ? parseFloat(orderItems[i].rowVolume) : 0;
                totalNetWeight += orderItems[i].rowNetWeight ? parseFloat(orderItems[i].rowNetWeight) : 0;
            }
            viewModel.splitCardMeta.getCurrentRow().setValue("totalNum", totalNum);
            viewModel.splitCardMeta.getCurrentRow().setValue("totalWeight", totalWeight);
            viewModel.splitCardMeta.getCurrentRow().setValue("totalVolume", totalVolume);
            viewModel.splitCardMeta.getCurrentRow().setValue("totalNetWeight", totalNetWeight);
            var orderType = common.getRefDataByDtAndKey("splitCardMeta", "orderTypeId");					
            // 暂时保留，后续可去除
            if (orderType && "03" == orderType[0].saleModelCode) {
                totalDealAmount = 0;
            }
            viewModel.splitCardMeta.getCurrentRow().setValue("totalDealAmount", totalDealAmount);
            viewModel.splitCardMeta.getCurrentRow().setValue("totalAmount", totalAmount);
        },
        //选择商品页签
        splitCheckGoods: function () {
            viewModel.isBomPanel(true);
            $("#tab-split-panel-2").hide();
            $("#tab-split-panel-1").show();
        },
        //选择Bom页签
        splitCheckBom: function () {
            viewModel.isBomPanel(false);
            $("#tab-split-panel-2").show();
            $("#tab-split-panel-1").hide();
        }
    }

}

function afterCreate() {
    return function(viewModel) {
        // 监听国家
        viewModel.dialogeditaddresscomp.viewModel.params.off("countryId.valuechange").on("countryId.valuechange", function (obj) {
            debugger
            var provinceValue = {
                "EQ_country.id": obj.newValue
            };
            $("#fh_provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
        })

        // 监听省份
        viewModel.dialogeditaddresscomp.viewModel.params.off("provinceId.valuechange").on("provinceId.valuechange", function (obj) {
            debugger
            var cityValue = {
                "EQ_parent.id": obj.newValue
            };
            $("#fh_cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
        })

        // 监听城市
        viewModel.dialogeditaddresscomp.viewModel.params.off("cityId.valuechange").on("cityId.valuechange", function (obj) {
            debugger
            var countyValue = {
                "EQ_parent.id": obj.newValue
            };
            $("#fh_countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
        })

        // 监听区县
        viewModel.dialogeditaddresscomp.viewModel.params.off("countyId.valuechange").on("countyId.valuechange", function (obj) {
            debugger
            var townValue = {
                "EQ_parent.id": obj.newValue
            };
            $("#fh_townIdinfo").attr("data-refparam", JSON.stringify(townValue));
        })

        // 监听城镇

        //数量
        viewModel.purchaseItems.on("goodsNum.valuechange", function(obj) {
            if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
            }
            var arr = viewModel.purchaseItems.getSimpleData();
            var amount = [],
                amountMoney = [];
            var getSum = function(array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseFloat(array[i]);
                }
                return sum;
            }
            for (var i = 0; i < arr.length; i++) {
                if (!arr[i].goodsNum) {
                    arr[i].goodsNum = 0
                }
                if (!arr[i].amountMoney) {
                    arr[i].amountMoney = 0
                }
                var amountItem = parseFloat(arr[i].goodsNum);
                amount.push(amountItem);
                amountMoney.push(parseFloat(arr[i].amountMoney));
            }
            viewModel.purchaseList.getCurrentRow().setValue("totalGoodsNum", getSum(amount));
            viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(amountMoney));

            // viewModel.purchaseList.getCurrentRow().setValue("totalAmount", getSum(amount));

            //联动bom数量
            var parentGoodsId = obj.rowObj.getValue("goodsId");
            //获取全部bom信息
            var bomdata = viewModel.purchaseBomItems.getSimpleData();
            for (var i = 0; i < bomdata.length; i++) {
                var allrows = viewModel.purchaseBomItems.getAllRealRows();
                if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId) {
                    var bomAmount = bomdata[i].childGoodsQty * obj.newValue;
                    allrows[i].setValue("goodsNum", bomAmount)
                } else {
                    if (allrows[i].getValue("goodsId") === parentGoodsId && !(allrows[i].getValue("parentGoodsName"))) {
                        var amount = obj.newValue;
                        allrows[i].setValue("goodsNum", amount);
                    }
                }
            }
        });
        //单价
        viewModel.purchaseItems.on("unitPrice.valuechange", function(obj) {
            if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
            }
            var arr = viewModel.purchaseItems.getSimpleData();
            
            var amountMoney = [];
            var getSum = function(array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseFloat(array[i]);
                }
                return sum;
            }
            for (var i = 0; i < arr.length; i++) {
                if (!arr[i].amountMoney) {
                    arr[i].amountMoney = 0
                }
                amountMoney.push(parseFloat(arr[i].amountMoney));
            }
            viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(amountMoney));
        });
        //Bom数量变化联动总价
        viewModel.purchaseBomItems.on("goodsNum.valuechange", function(obj) {
            if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                obj.rowObj.setValue("amountMoney", viewModel.sumPrice(obj.rowObj));
            }
        });
        //单价
        viewModel.purchaseBomItems.on("unitPrice.valuechange", function(obj) {
            if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                viewModel.sumPrice(obj.rowObj);
            }
            var arr = viewModel.purchaseBomItems.getSimpleData();
            var price = [],
                bomprice = [];
            var getSum = function(array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseFloat(array[i]);
                }
                return sum;
            };
            for (var i = 0; i < arr.length; i++) {
                if (!arr[i].amountMoney) {
                    arr[i].amountMoney = 0
                }
                var amountMoney = parseFloat(arr[i].amountMoney)
                price.push(amountMoney);
            }
            // viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(price));

            // 计算反写商品行上面的值
            viewModel.backClac(obj, "unitPrice");

        });
        //Bom金额监听反算商品金额
        /* viewModel.purchaseBomItems.on("amountMoney.valuechange", function (obj) {
            viewModel.backClac(obj, "amountMoney");

            var arr = viewModel.purchaseBomItems.getSimpleData();
            var price = [];
            var getSum = function (array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum += parseFloat(array[i]);
                }
                return sum;
            }
            for (var i = 0; i < arr.length; i++) {
                var amountMoney = parseFloat(arr[i].amountMoney ? arr[i].amountMoney : 0)
                price.push(amountMoney);
            }
            viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(price));
        }); */

        // 编辑地址信息开始
        if (viewModel.addresscardcomp.viewModel) {
            viewModel.addresscardcomp.viewModel.params.on("countryId.valuechange", function(obj) {
                var provinceValue = {
                    "EQ_areaLevel": "1"
                };
                $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
                var provinceId = viewModel.addresscardcomp.app.getComp("provinceIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("provinceId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                var rowObj = '中国',
                    preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                if (obj.oldValue != obj.newValue) {
                    if (!obj.rowObj.data.countryId.meta) {} else {
                        rowObj = obj.rowObj.data.countryId.meta.display
                    }
                    if (!preValue && rowObj) {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', rowObj + '/');
                    } else {
                        var preArr = preValue.split('/');
                        if (rowObj) {
                            preArr[0] = rowObj + '/';
                        } else {
                            preArr[0] = '';
                        }
                        preArr.splice(1, preArr.length - 1);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        cityId.setEnable(false);
                        districtId.setEnable(false);
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        provinceId.setEnable(false);
                    } else {
                        provinceId.setEnable(true);
                    }
                } else {
                    provinceId.setEnable(false);
                }
            });

            viewModel.addresscardcomp.viewModel.params.on("provinceId.valuechange", function(obj) {
                var provinceId = obj.newValue;
                var cityValue = {
                    "EQ_areaLevel": "2",
                    "EQ_parent.id": provinceId
                }
                $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
                var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    var rowObj = obj.rowObj.data.provinceId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 2) {
                        if (rowObj) {
                            preArr[1] = rowObj + '/';
                        } else {
                            preArr[1] = '';
                        }

                        preArr.splice(2, preArr.length - 2);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        districtId.setEnable(false);
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        cityId.setEnable(false);
                    } else {
                        cityId.setEnable(true);
                    }
                } else {
                    cityId.setEnable(false);
                }
            });

            viewModel.addresscardcomp.viewModel.params.on("cityId.valuechange", function(obj) {
                var cityId = obj.newValue;
                var countyValue = {
                    "EQ_areaLevel": "3",
                    "EQ_parent.id": obj.newValue
                };
                $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
                var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    var rowObj = obj.rowObj.data.cityId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 2) {
                        if (rowObj) {
                            preArr[2] = rowObj + '/';
                        } else {
                            preArr[2] = '';
                        }

                        preArr.splice(3, preArr.length - 3);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                        townId.setEnable(false);
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        districtId.setEnable(false);
                    } else {
                        districtId.setEnable(true);
                    }
                } else {
                    districtId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("districtId.valuechange", function(obj) {
                var districtId = obj.newValue;
                var townValue = {
                    "EQ_areaLevel": "4",
                    "EQ_parent.id": obj.newValue
                };
                $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
                var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                if (obj.oldValue != obj.newValue) {
                    var rowObj = obj.rowObj.data.districtId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 3) {
                        if (rowObj) {
                            preArr[3] = rowObj + '/';
                        } else {
                            preArr[3] = '';
                        }
                        preArr.splice(4, preArr.length - 4);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                    if (!obj.newValue || obj.newValue == '') {
                        townId.setEnable(false);
                    } else {
                        townId.setEnable(true);
                    }
                } else {
                    townId.setEnable(false);
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("townId.valuechange", function(obj) {
                var townId = obj.newValue;
                if (obj.oldValue != obj.newValue) {
                    var rowObj = obj.rowObj.data.townId.meta.display,
                        preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    var preArr = preValue.split('/');
                    if (preArr.length > 4) {
                        preArr[4] = rowObj + '/';
                        preArr.splice(5, preArr.length - 5);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preArr.join('/'));
                        if (viewModel.addresscardcomp.viewModel.params.getValue('receiveAddress')) {
                            viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '')
                        }
                    } else {
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + rowObj + '/');
                    }
                }
            });
            viewModel.addresscardcomp.viewModel.params.on("receiveAddress.valuechange", function(obj) {
                var newAddr = obj.newValue;
                if (obj.oldValue != obj.newValue) {
                    var preValue = viewModel.addresscardcomp.viewModel.params.getValue('detailAddr');
                    viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', preValue + newAddr);
                }
            });
            //编辑地址信息结束
            viewModel.purchaseItems.on("isGift.valuechange", function(obj) {
                var isGift = obj.newValue;
                var unitPriceOpt = viewModel.app.getComp("grid_purchase_complexItem").grid.getColumnByField("unitPrice");
                var currRow = viewModel.purchaseItems.getRowByRowId(obj.rowId);

                if (isGift == "1") {
                    currRow.setValue("amountMoney", 0);
                    unitPriceOpt.options.editable = false;
                } else {

                    var goodsNum = currRow.getValue("goodsNum");
                    var unitPrice = currRow.getValue("unitPrice");
                    currRow.setValue("amountMoney", parseFloat(goodsNum) * parseFloat(unitPrice));
                    unitPriceOpt.options.editable = true;
                }
                var arr = viewModel.purchaseItems.getSimpleData();
                var amountMoney = [];
                var getSum = function(array) {
                    var sum = 0;
                    for (var i = 0; i < array.length; i++) {
                        sum += parseFloat(array[i]);
                    }
                    return sum;
                }
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i].amountMoney) {
                        arr[i].amountMoney = 0
                    }
                    amountMoney.push(parseFloat(arr[i].amountMoney));
                }
                viewModel.purchaseList.getCurrentRow().setValue("totalAmountMoney", getSum(amountMoney));
                //联动bom勾选
                var parentGoodsId = obj.rowObj.getValue("goodsId");
                var parentRowNum = obj.rowObj.getValue("rowNum");

                //获取全部bom信息
                var bomdata = viewModel.purchaseBomItems.getSimpleData();
                for (var i = 0; i < bomdata.length; i++) {
                    var allrows = viewModel.purchaseBomItems.getAllRealRows();
                    if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
                        allrows[i].setValue("isGift", obj.newValue);
                    }
                }
            });
            //bom z赠品
            viewModel.purchaseBomItems.on("isGift.valuechange", function(obj) {
                var isGift = obj.newValue;
                var currRow = viewModel.purchaseBomItems.getRowByRowId(obj.rowId);
                if (isGift == "1") {
                    currRow.setValue("amountMoney", 0);
                } else {
                    var goodsNum = currRow.getValue("goodsNum");
                    var unitPrice = currRow.getValue("unitPrice");
                    currRow.setValue("amountMoney", parseFloat(goodsNum) * parseFloat(unitPrice));
                }
            });
        }
        //库存组织
        viewModel.purchaseItems.on("receiveStorageOrgId.valuechange", function(obj) {
            var displayName = obj.rowObj.data.receiveStorageOrgId.meta ?
                obj.rowObj.data.receiveStorageOrgId.meta.display : "";
            obj.rowObj.setValue("receiveStorageOrgId", obj.newValue);
            obj.rowObj.setValue("receiveStorageOrgName", displayName);
            var curRow = viewModel.purchaseItems.getCurrentRow();
            var stockOrgId = curRow.getValue("receiveStorageOrgId");
            obj.rowObj.parent.meta.receiveStorageId.refparam =
                '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}';
            if (obj.newValue != obj.oldValue) {
                viewModel.purchaseItems.setValue("receiveStorageId", "");
            }
            //给bom赋值
            var parentGoodsId = obj.rowObj.getValue("goodsId");
            var bomdata = viewModel.purchaseBomItems.getSimpleData();
            for (var i = 0; i < bomdata.length; i++) {
                var allrows = viewModel.purchaseBomItems.getAllRealRows();
                var receiveStorageOrgId = obj.newValue;
                if (allrows[i].getValue("goodsId") === parentGoodsId || allrows[i].getValue("parentGoodsId") === parentGoodsId) {
                    allrows[i].setValue("receiveStorageOrgId", receiveStorageOrgId);
                }
            }

        });

        // //需求库存组织
        // viewModel.purchaseItems.on("demandStockOrgId.valuechange", function(obj) {
        //   var curRow = viewModel.purchaseItems.getCurrentRow();
        //   obj.rowObj.setValue("receiveStorageOrgId",viewModel.purchaseItems.getValue("demandStockOrgId"));
        //   obj.rowObj.setValue("receiveStorageOrgName",obj.rowObj.data.demandStockOrgId.meta.display);
        //   var stockOrgId = curRow.getValue("receiveStorageOrgId");
        //   obj.rowObj.parent.meta.receiveStorageId.refparam =
        //     '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}';
        //   if (obj.newValue != obj.oldValue) {
        //     viewModel.purchaseItems.setValue("receiveStorageId", "");
        //   }
        // });
        // //需求库存组织
        // viewModel.purchaseBomItems.on("demandStockOrgId.valuechange", function(obj) {
        //   var curRow = viewModel.purchaseBomItems.getCurrentRow();
        //   obj.rowObj.setValue("receiveStorageOrgId",viewModel.purchaseBomItems.getValue("demandStockOrgId"));
        //   obj.rowObj.setValue("receiveStorageOrgName",obj.rowObj.data.demandStockOrgId.meta.display);
        //   var stockOrgId = curRow.getValue("receiveStorageOrgId");
        //   obj.rowObj.parent.meta.receiveStorageId.refparam =
        //     '{"EQ_isEnable":"1","EQ_inventoryOrg.id":"' + stockOrgId + '"}';
        //   if (obj.newValue != obj.oldValue) {
        //     viewModel.purchaseBomItems.setValue("receiveStorageId", "");
        //   }
        // });

        // 根据交易类型判断表体行说活库存组织是否可编辑
        viewModel.purchaseList.off("tranTypeId.valuechange").on("tranTypeId.valuechange", function(obj) {
            var tranType = viewModel.purchaseList.getValue("tranTypeId");
            var allItems = viewModel.purchaseItems.getAllRows();
            //DirectPurchase ：直运采购 GeneralPurchase ：普通采购
            var receiveStorageOrgOpt = viewModel.app.getComp("grid_purchase_complexItem").grid.getColumnByField("receiveStorageOrgId");
            if (tranType === "GeneralPurchase") {
                receiveStorageOrgOpt.options.editable = true;
                receiveStorageOrgOpt.options.editOptions.required = true;
            } else {
                receiveStorageOrgOpt.options.editable = false;
                receiveStorageOrgOpt.options.editOptions.required = false;
                allItems.forEach(function(item) {
                    item.setValue("receiveStorageOrgId", "");
                    item.setMeta("receiveStorageOrgId", "display", '');
                });
            };
            var grid = viewModel.app.getComp("grid_purchase_complexItem").grid;
            grid.repaintGridDivs();
        });
        viewModel.purchaseList.off("orderDate.valuechange").on("orderDate.valuechange", function(obj) {
            var purchaseOrgId = viewModel.purchaseList.getValue("purchaseOrgId");
            var supplierId = viewModel.purchaseList.getValue("supplierId");
            if (obj.newValue && purchaseOrgId && supplierId) {
                var itemBomList = viewModel.purchaseBomItems.getRealSimpleData();
                var itemListBomRows = viewModel.purchaseBomItems.getAllRealRows();
                var ids = itemBomList.map(function(item){
                    return item.goodsId;
                })
                var data = {
                    supplier: supplierId,
                    purchaseOrg: purchaseOrgId,
                    purchaseDate: obj.newValue,
                    ids: ids.join(',')
                }
                $._ajax({
					type: "POST",
                    url: window.pathMap.purchase + '/purchase/prices/get-by-param',
                    data: data,
					success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            for (var key in data[i]) {
                                for (var j = 0; j < itemListBomRows.length; j++) {
                                    var goodsNum = itemListBomRows[j].getValue("goodsNum");
                                    if (key == itemListBomRows[j].getValue("goodsId")) {
                                        itemListBomRows[j].setValue("unitPrice", data[i][key] ? data[i][key] : 0);
                                        itemListBomRows[j].setValue("amountMoney", data[i][key] * goodsNum);
                                    }
                                }
                            }
                        }
					}
				});
            }
        });
        viewModel.purchaseList.on("purchaseOrgId.valuechange", function(obj) {
            var supplierId = viewModel.purchaseList.getValue("supplierId");
            var orderDate = viewModel.purchaseList.getValue("orderDate");
            if (obj.newValue && orderDate && supplierId) {
                var itemBomList = viewModel.purchaseBomItems.getRealSimpleData();
                var itemListBomRows = viewModel.purchaseBomItems.getAllRealRows();
                var ids = itemBomList.map(function(item){
                    return item.goodsId;
                })
                var data = {
                    supplier: supplierId,
                    purchaseOrg: obj.newValue,
                    purchaseDate: orderDate,
                    ids: ids.join(',')
                }
                $._ajax({
					type: "POST",
                    url: window.pathMap.purchase + '/purchase/prices/get-by-param',
                    data: data,
					success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            for (var key in data[i]) {
                                for (var j = 0; j < itemListBomRows.length; j++) {
                                    var goodsNum = itemListBomRows[j].getValue("goodsNum");
                                    if (key == itemListBomRows[j].getValue("goodsId")) {
                                        itemListBomRows[j].setValue("unitPrice", data[i][key] ? data[i][key] : 0);
                                        itemListBomRows[j].setValue("amountMoney", data[i][key] * goodsNum);
                                    }
                                }
                            }
                        }
					}
				});
            }
        });
        viewModel.purchaseList.on("supplierId.valuechange", function(obj) {
            var purchaseOrgId = viewModel.purchaseList.getValue("purchaseOrgId");
            var orderDate = viewModel.purchaseList.getValue("orderDate");
            if (obj.newValue && purchaseOrgId && orderDate) {
                var itemBomList = viewModel.purchaseBomItems.getRealSimpleData();
                var itemListBomRows = viewModel.purchaseBomItems.getAllRealRows();
                var ids = itemBomList.map(function(item){
                    return item.goodsId;
                })
                var data = {
                    supplier: obj.newValue,
                    purchaseOrg: purchaseOrgId,
                    purchaseDate: orderDate,
                    ids: ids.join(',')
                }
                $._ajax({
					type: "POST",
                    url: window.pathMap.purchase + '/purchase/prices/get-by-param',
                    data: data,
					success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            for (var key in data[i]) {
                                for (var j = 0; j < itemListBomRows.length; j++) {
                                    var goodsNum = itemListBomRows[j].getValue("goodsNum");
                                    if (key == itemListBomRows[j].getValue("goodsId")) {
                                        itemListBomRows[j].setValue("unitPrice", data[i][key] ? data[i][key] : 0);
                                        itemListBomRows[j].setValue("amountMoney", data[i][key] * goodsNum);
                                    }
                                }
                            }
                        }
					}
				});
            }
        });

        //批次号 货位 批号 供应商 项目 库存状态 客户
        viewModel.purchaseItems.on("valuechange", function(obj) {
            if (obj.field === "batchNumId" ||
                obj.field === "goodsPositionId" ||
                obj.field === "goodsVersion" ||
                obj.field === "batchCodeId" ||
                obj.field === "supplierId" ||
                obj.field === "projectId" ||
                obj.field === "stockStateId" ||
                obj.field === "demandStockOrgId" ||
                obj.field === "receiveStorageOrgId" ||
                obj.field === "receiveStorageId"
            ) {
                viewModel.setValueToBom(obj);
            }
        });
    }
}