define(["ocm_basemodel"], function(basemodel) {
    // var purchasestatus = CONST.PURCHASE.PURCHASESTATUS;
    var model = {
        metas: {
            complex: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    state: {
                        type: 'string',
                        default: "0"
                    },
                    purchaseOrgId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{"EQ_orgFuncRel":"04"}',
                    }, //采购组织
                    purchaseOrgName: {
                        type: 'string',
                        required: true
                    },
                    coordinationOrderCode: {
                        type: 'string',
                    }, //协同单号
                    // orderTypeCode: {type: 'string', required: true}, //订单类型
                    // orderTypeName: {type: 'string', required: true}, //订单类型
                    orderCode: {
                        type: 'string',
                        required: true
                    }, //订单编码
                    otherOrderNum: {
                        type: 'string'
                    }, //对方订单号
                    orderDate: {
                        type: 'date',
                        required: true
                    }, //订单日期
                    purchaseType: {
                        type: 'string'
                    }, //采购类型
                    // purchaseTypeCode: {
                    //   type: 'date',
                    //   required: true
                    // }, //采购类型
                    // purchaseTypeName: {
                    //   type: 'string',
                    //   required: true
                    // }, //采购类型
                    tranTypeId: {
                        type: 'string',
                        required: true,
                        // default: "PurchaseBill",
                        'refmodel': JSON.stringify(refinfo['trantype']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"订单类型"}',
                        'refparam': '{"EQ_billTypeId":"PurchaseBill","EQ_trantypeExtends.fieldName":"isReturn","EQ_trantypeExtends.fieldValue":"0"}'
                    }, //交易id
                    tranTypeName: {
                        type: 'string',
                        required: true
                    }, //交易Name
                    tranTypeCode: {
                        type: 'string',
                        required: true
                    }, //交易Code
                    supplierId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                    }, //供应商

                    selfLifing: {
                        type: 'string',
                        default: "02"
                    }, // 是否自提
                    supplierName: {
                        type: 'string',
                        required: true
                    }, //供应商Name
                    supplierCode: {
                        type: 'string',
                        required: true
                    }, //供应商Code
                    purchasePersonId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    }, //采购员
                    purchasePersonCode: {
                        type: 'string',
                        required: true
                    },
                    purchasePersonName: {
                        type: 'string',
                        required: true
                    },
                    purchaseDeptId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['department']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    }, //采购部门
                    purchaseDeptName: {
                        type: 'string',
                        required: true
                    },
                    purchaseDeptCode: {
                        type: 'string',
                        required: true
                    },
                    totalGoodsNum: {
                        type: 'numberFloat',
                        precision: 2,
                        required: true
                    }, //总数量
                    totalAmountMoney: {
                        type: 'amountFloat',
                        required: true
                    }, //总金额
                    currencyId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['currency']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}',
                        "refparam": '{}'
                    }, //币种
                    currencyName: {
                        type: 'string',
                        required: true
                    },
                    status: {
                        type: 'string',
                        required: true,
                        default: "01"
                    }, //单据状态

                    operationCode: {
                        type: 'string'
                    }, //操作code
                    totalMoney: {
                        type: 'float'
                    },
                    approveStatus: {
                        type: 'string'
                    }, //审批状态

                    isClosed: {
                        type: 'string',
                        default: "0"
                    }, //关闭状态
                    approvalSummary: {
                        type: 'string'
                    }, //审批批语
                    erpStatus: {
                        type: 'string'
                    }, //ERP系统状态
                    refusedReason: {
                        type: 'string'
                    }, //拒单原因
                    confirmPerson: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    }, //确认人
                    remark: {
                        type: 'string'
                    }, //备注
                    isReturned: {
                        type: 'string',
                        required: true,
                        default: "0"
                    }, //是否退货
                    returnedOrder: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['accountManager']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    }, //退货原订单号
                    //创建人
                    creator: {
                        type: 'string'
                    },
                    //创建时间
                    creationTime: {
                        type: 'datetime'
                    },
                    //修改人
                    modifier: {
                        type: 'string'
                    },
                    //修改时间
                    modifiedTime: {
                        type: 'datetime'
                    },
                    totalGoodsNum: {
                        type: 'numberFloat',
                        precision: 2,
                        required: true
                    }, //总数量
                    totalAmountMoney: {
                        type: 'amountFloat',
                        required: true
                    }, //总金额
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
            complexItem: {
                meta: {
                    code: {
                        type: 'string'
                    }, //id
                    displayName: {
                        type: 'string'
                    },
                    version: {
                        type: 'string'
                    },
                    rowNum: {
                        type: 'string',
                        required: true
                    }, //行号
                    goodsId: {
                        type: 'string',
                        required: true
                    }, //商品
                    goodsName: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    }, //商品名称
                    goodsCode: {
                        type: 'string',
                        required: true
                    }, //商品Code
                    unitId: {
                        type: 'string',
                        required: true
                    }, //计量单位
                    unitCode: {
                        type: 'string',
                        required: true
                    }, //计量单位
                    unitName: {
                        type: 'string',
                        required: true
                    }, //计量单位
                    goodsNum: {
                        type: 'numberFloat',
                        required: true
                    }, //数量
                    unitPrice: {
                        type: 'priceFloat',
                    }, //单价
                    amountMoney: {
                        type: 'amountFloat',
                    }, //金额
                    isGift: {
                        type: 'float',
                        required: true,
                        default: "0"
                    }, //是否赠品

                    goodsSelection: {
                        type: 'string',
                    }, //选配项
                    goodsVersion: {
                        type: 'string',
                        required: true
                    }, //商品版本号
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
                    sourceType: {
                        type: 'string'
                    }, //来源单据类型
                    sourceId: {
                        type: 'string'
                    }, //来源单据号
                    sourceLineNum: {
                        type: 'string'
                    }, //来源单据行号
                    isClosed: {
                        type: 'string',
                        default: "0"
                    }, //商品状态
                    stockStatus: {
                        type: 'string'
                    }, //库存状态
                    payStatus: {
                        type: 'string'
                    }, //付款状态
                    arrivalBelongId: {
                        type: 'string',
                        required: true
                    }, //收货地归属
                    arrivalBelongName: {
                        type: 'string',
                        required: true
                    },
                    arrivalBelongCode: {
                        type: 'string',
                        required: true
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

                    receiveStorageOrgId: {
                        type: 'string',
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
                    receiveStorageId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //收货仓库
                    receiveStorageName: {
                        type: 'string',
                    },
                    receiveStorageCode: {
                        type: 'string',
                    },
                    customerId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //客户
                    customerCode: {
                        type: 'string'
                    }, //客户编码
                    customerName: {
                        type: 'string'
                    }, //客户名称

                    countryId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                    }, //注册国别ID
                    countryName: {
                        type: 'string'
                    }, //注册国家名称
                    countryCode: {
                        type: 'string'
                    }, //注册国家名称
                    provinceId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1"}',
                    }, //注册所在省份ID
                    provinceName: {
                        type: 'string'
                    }, //注册所在省份名称
                    provinceCode: {
                        type: 'string'
                    }, //注册所在省份名称
                    cityId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2"}'
                    }, //注册所在城市ID
                    cityName: {
                        type: 'string'
                    }, //注册所在城市名称
                    cityCode: {
                        type: 'string'
                    },
                    districtId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3"}'
                    }, //注册所在区/县
                    districtName: {
                        type: 'string'
                    }, //注册所在区/县名称
                    districtCode: {
                        type: 'string'
                    }, //注册所在区/县名称
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4"}'
                    }, //注册所在街道/镇
                    townName: {
                        type: 'string'
                    }, //注册所在街道/镇名称
                    townCode: {
                        type: 'string'
                    },
                    receiveContact: {
                        type: 'string'
                    }, //收货联系人
                    receiveContactPhone: {
                        type: 'string'
                    }, //收货联系人电话

                    receiveAddress: {
                        type: 'string',
                        required: true
                    }, //收货地址
                    detailAddr: {
                        type: 'string',
                        required: true,
                    },
                    addStorageAmount: {
                        type: 'amountFloat'
                    }, //累计入库数量
                    applyReturnNum: {
                        type: 'numberFloat'
                    }, //累计退货数量

                    // 选配 id
                    baseGoodsOptId: {
                        type: 'string'
                    },
                    isOptional: {
                        type: "Integer"
                    },
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    // productid: {type: 'string',required:true},//销售产品id
                    productid: {
                        type: 'string',
                        // 'refmodel':JSON.stringify(refinfo['productInfo']),
                        // 'refcfg':'{"ctx":"/uitemplate_web"}',
                        // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
                    },
                    productidCode: {
                        type: 'string'
                    },
                    productidName: {
                        type: 'string'
                    },
                    productidStandardName: {
                        type: 'string'
                    },
                    productidSaleSeriesId: {
                        type: 'string'
                    },
                    productidSaleSeriesName: {
                        type: 'string'
                    },
                    num: {
                        type: 'numberFloat',
                        required: true
                    }, //数量
                    dr: {
                        type: 'integer'
                    },
                    //创建人
                    creator: {
                        type: 'string'
                    },
                    //创建时间
                    creationTime: {
                        type: 'datetime'
                    },
                    //修改人
                    modifier: {
                        type: 'string'
                    },
                    //修改时间
                    modifiedTime: {
                        type: 'datetime'
                    },
                    originalGoodsId: {
                        type: 'string',
                    }, //原始版本商品
                    goodsSelectionDescription: {
                        type: 'string',
                    }, //商品选项描述
                    batchCode: {
                        type: 'string',
                    }, //项目号
                },
                pageSize: 10,
            },
            BomItem: {
                meta: {
                    rowNum: {
                        type: 'string',
                        required: true
                    }, //行号
                    goodsId: {
                        type: 'string',
                        required: true
                    }, //商品
                    goodsName: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    }, //商品名称
                    goodsCode: {
                        type: 'string',
                        required: true
                    }, //商品Code
                    unitId: {
                        type: 'string',
                        required: true
                    }, //计量单位
                    unitCode: {
                        type: 'string',
                        required: true
                    }, //计量单位
                    unitName: {
                        type: 'string',
                        required: true
                    }, //计量单位
                    goodsNum: {
                        type: 'numberFloat',
                    }, //数量
                    unitPrice: {
                        type: 'priceFloat',
                    }, //单价
                    amount: {
                        type: 'amountFloat',
                    }, //金额
                    amountMoney: {
                        type: 'amountFloat',
                    }, //金额
                    isGift: {
                        type: 'float',
                        required: true,
                        default: "0"
                    }, //是否赠品
                    sourceType: {
                        type: 'string'
                    }, //来源单据类型
                    sourceId: {
                        type: 'string'
                    }, //来源单据号
                    sourceLineNum: {
                        type: 'string'
                    }, //来源单据行号
                    isClosed: {
                        type: 'string',
                        default: "0"
                    }, //商品状态
                    stockStatus: {
                        type: 'string'
                    }, //库存状态
                    payStatus: {
                        type: 'string'
                    }, //付款状态
                    arrivalBelongId: {
                        type: 'string',
                        required: true
                    }, //收货地归属
                    arrivalBelongName: {
                        type: 'string',
                        required: true
                    },
                    arrivalBelongCode: {
                        type: 'string',
                        required: true
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
                    receiveStorageOrgId: {
                        type: 'string',
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
                    receiveStorageId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //收货仓库
                    receiveStorageName: {
                        type: 'string',
                    },
                    receiveStorageCode: {
                        type: 'string',
                    },
                    customerId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //客户
                    customerCode: {
                        type: 'string'
                    }, //客户编码
                    customerName: {
                        type: 'string'
                    }, //客户名称
                    countryId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                    }, //注册国别ID
                    countryName: {
                        type: 'string'
                    }, //注册国家名称
                    countryCode: {
                        type: 'string'
                    }, //注册国家名称
                    provinceId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1"}',
                    }, //注册所在省份ID
                    provinceName: {
                        type: 'string'
                    }, //注册所在省份名称
                    provinceCode: {
                        type: 'string'
                    }, //注册所在省份名称
                    cityId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2"}'
                    }, //注册所在城市ID
                    cityName: {
                        type: 'string'
                    }, //注册所在城市名称
                    cityCode: {
                        type: 'string'
                    },
                    districtId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3"}'
                    }, //注册所在区/县
                    districtName: {
                        type: 'string'
                    }, //注册所在区/县名称
                    districtCode: {
                        type: 'string'
                    }, //注册所在区/县名称
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4"}'
                    }, //注册所在街道/镇
                    townName: {
                        type: 'string'
                    }, //注册所在街道/镇名称
                    townCode: {
                        type: 'string'
                    },
                    receiveContact: {
                        type: 'string'
                    }, //收货联系人
                    receiveContactPhone: {
                        type: 'string'
                    }, //收货联系人电话
                    receiveAddress: {
                        type: 'string',
                        required: true
                    }, //收货地址
                    detailAddr: {
                        type: 'string',
                        required: true,
                    },
                    addStorageAmount: {
                        type: 'numberFloat'
                    }, //累计入库数量
                    applyReturnNum: {
                        type: 'numberFloat'
                    }, //累计退货数量
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    productid: {
                        type: 'string',
                        // 'refmodel':JSON.stringify(refinfo['productInfo']),
                        // 'refcfg':'{"ctx":"/uitemplate_web"}',
                        // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
                    },
                    productidCode: {
                        type: 'string'
                    },
                    productidName: {
                        type: 'string'
                    },
                    productidStandardName: {
                        type: 'string'
                    },
                    productidSaleSeriesId: {
                        type: 'string'
                    },
                    productidSaleSeriesName: {
                        type: 'string'
                    },
                    dr: {
                        type: 'integer'
                    },
                    //创建人
                    creator: {
                        type: 'string'
                    },
                    //创建时间
                    creationTime: {
                        type: 'datetime'
                    },
                    //修改人
                    modifier: {
                        type: 'string'
                    },
                    //修改时间
                    modifiedTime: {
                        type: 'datetime'
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
                        type: 'float',
                    },
                    originalGoodsId: {
                        type: 'string',
                    }, //原始版本商品
                    goodsSelectionDescription: {
                        type: 'string',
                    }, //商品选项描述
                    // 选配 id
                    baseGoodsOptId: {
                        type: 'string'
                    },
                    batchCode: {
                        type: 'string'
                    },
                },
                pageSize: 10,
            },
            ItemRef: {
                meta: {
                    productref: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        'refparam': '{"EQ_isEnable":"1","EQ_isServiceType":"0"}'
                    }
                }
            }
        },
        searchs: {
            search1: [{
                    type: "text",
                    key: "orderCode",
                    label: "订单编号",
                }, {
                    key: "orderDate",
                    type: "daterange",
                    label: "订单日期",
                }, {
                    type: "refer",
                    key: "purchaseOrg",
                    label: "采购组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "04"
                    },
                }, {
                    type: "text",
                    key: "otherOrderNum",
                    label: "对方订单号",
                }, {
                    type: "refer",
                    key: "tranType",
                    label: "交易类型",
                    refinfo: "trantype",
                    refName: "交易类型"
                },
                // {
                //   type: "combo",
                //   key: "orderType",
                //   label: "订单类型",
                //   url:window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY103",
                //   namefield: "name",
                //   valuefield: "code"
                // },
                // {
                //   type: "combo",
                //   key: "purchaseType",
                //   label: "采购类型",
                //   url:window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY104",
                //   namefield: "name",
                //   valuefield: "code"
                // },
                {
                    type: "refer",
                    key: "supplier",
                    label: "供应商名称",
                    refinfo: "suppliers",
                    refName: "供应商"
                }, {
                    type: "refer",
                    key: "purchasePerson",
                    label: "采购员",
                    refinfo: "person",
                    refName: "采购员"
                }, {
                    type: "refer",
                    key: "purchaseDept",
                    label: "采购部门",
                    refinfo: "department",
                    refName: "采购部门"
                },
                // {
                //   type: "combo",
                //   key: "billStatus",
                //   label: "订单状态",
                //   url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY106',
                //   namefield: "name",
                //   valuefield: "code",
                //   hasAll: true,
                //   onlySelect:true
                // },
                {
                    type: "combo",
                    key: "status",
                    label: "订单状态",
                    dataSource: [{
                        value: '01',
                        name: '待处理'
                    }, {
                        value: '02',
                        name: '已提交审批'
                    }, {
                        value: '03',
                        name: '审批中'
                    }, {
                        value: '04',
                        name: '审批通过'
                    }, {
                        value: '05',
                        name: '审批不通过'
                    }, {
                        value: '06',
                        name: '部分入库'
                    }, {
                        value: '07',
                        name: '全部入库'
                    }, {
                        value: '08',
                        name: '部分出库'
                    }, {
                        value: '09',
                        name: '全部出库'
                    }, ],
                    hasAll: true,
                }, {
                    type: "combo",
                    key: "state",
                    label: "审批状态",
                    defaultvalue: 0,
                    dataSource: [{
                        value: 0,
                        name: '待处理'
                    }, {
                        value: 1,
                        name: '已提交'
                    }, {
                        value: 2,
                        name: '审批中'
                    }, {
                        value: 3,
                        name: '审批通过'
                    }, {
                        value: 4,
                        name: '审批不通过'
                    }, ],
                    hasAll: true,
                }, {
                    type: "refer",
                    key: "orderItems--goods",
                    label: "商品",
                    refinfo: "goods",
                    clientParam: {
                        "EQ_isEnable": "1",
                        "EQ_isServiceType": "0"
                    },
                },
            ],
        },
        buttons: {
            button1: [{
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "showAddBillPanel"
                }, {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del"
                }, {
                    key: "open",
                    label: "打开",
                    iconCls: "icon-tubiao-duigou-xianxing",
                    click: "openOrder"
                }, {
                    key: "close",
                    label: "关闭",
                    iconCls: "icon-tubiao-guanbi-xianxing",
                    click: "closeOrder"
                }, {
                    key: "submit",
                    label: "提交",
                    iconCls: "icon-tubiao-shenhe",
                    click: "submitBtn"
                }, {
                    key: "back",
                    label: "收回",
                    iconCls: "icon-tubiao-shenhe",
                    click: "backBtn"
                }, {
                    key: "approve",
                    label: "审批通过",
                    iconCls: "icon-tubiao-shenhe",
                    click: "approve"
                }, {
                    key: "approve",
                    label: "审批不通过",
                    iconCls: "icon-tubiao-shenhe",
                    click: "disapprove"
                }, {
                    key: "unapprove",
                    label: "取消审核",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "unapprove"
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
                }, {
                    key: "coordination",
                    label: "协同",
                    iconCls: " icon-tubiao-huangou",
                    click: "coordination"
                },

            ],
            button2: [{
                    key: "cancel",
                    label: "取消",
                    click: "cancelBill"
                }, {
                    key: "save",
                    label: "保存",
                    click: "saveBill",
                    cls: "ui-btn-green"
                },
                /*{
                       key: "save",
                       label: "保存并提交",
                       click: "submitBill",
                       cls: "ui-btn-green"
                     }*/
            ],
            button3: [{
                key: "addrow",
                label: "增行",
                iconCls: "icon-plus",
                click: "showAddItemsRef"
            }, {
                key: "delrow",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delItems",
            }, {
                key: "requery",
                label: "重新询价",
                iconCls: "icon-shanchu1",
                click: "requery",
            }, ],
            button4: [{
                key: "return",
                label: "返回",
                click: "retListPanel"
            }, {
                key: "edit",
                label: "编辑",
                click: "detail2bill",
                cls: "ui-btn-green"
            }],
            button5: [{
                key: "closeRow",
                label: "关闭",
                iconCls: "icon-tubiao-guanbi-xianxing",
                click: "closeItems",

            }, {
                key: "openRow",
                label: "打开",
                iconCls: "icon-tubiao-duigou-xianxing",
                click: "openItems",
            }, ],
            button6: [],
        },
        cards: {
            card1: [{
                type: "textreadonly",
                key: "orderCode",
                label: "订单编号",
                // enable: false,
                domid: "orderCode"
            }, {
                type: "date",
                key: "orderDate",
                label: "订单日期",
            }, {
                type: "refer",
                key: "purchaseOrgId",
                label: "采购组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_isPurchasingOrganization": "1"
                },
                refName: "所属办事处"
            }, {
                type: "refer",
                key: "supplierId",
                label: "供应商",
                refinfo: "suppliers",
                clientParam: {
                    "EQ_supplierType": "01"
                },
                refName: "供应商"
            }, {
                type: "refer",
                key: "tranTypeId",
                label: "交易类型",
                refinfo: "trantype",
                refName: "交易类型",
                referId: "trantypeRef"
            }, {
                type: "text",
                key: "otherOrderNum",
                label: "对方订单号",
            }, {
                type: "refer",
                key: "purchasePersonId",
                label: "采购员",
                refinfo: "person",
                refName: "采购员"
            }, {
                type: "refer",
                key: "purchaseDeptId",
                label: "采购部门",
                refinfo: "department",
                refName: "采购部门"
            }, {
                type: "text",
                key: "refusedReason",
                label: "冻结原因",
                enable: false
            }, {
                type: "text",
                key: "totalAmountMoney",
                label: "总金额",
                enable: false
            }, {
                type: "combo",
                key: "status",
                label: "单据状态",
                defaultvalue: "01",
                dataSource: [{
                    value: '01',
                    name: '待处理'
                }, {
                    value: '02',
                    name: '已提交'
                }, {
                    value: '03',
                    name: '审批中'
                }, {
                    value: '04',
                    name: '审批通过'
                }, {
                    value: '05',
                    name: '审批不通过'
                }, {
                    value: '06',
                    name: '部分入库'
                }, {
                    value: '07',
                    name: '全部入库'
                }, {
                    value: '08',
                    name: '部分出库'
                }, {
                    value: '09',
                    name: '全部出库'
                }, ],
                enable: false
            }, {
                type: "combo",
                key: "state",
                label: "审批状态",
                defaultvalue: "0",
                dataSource: [{
                    value: "0",
                    name: '待处理'
                }],
                enable: false
            }, {
                type: "text",
                key: "remark",
                label: "备注",
            }, {
                type: "checkbox",
                key: "selfLifing",
                label: "是否自提",
                checkedValue: "01",
                unCheckedValue: "02",
                default: "02",
            }]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "countryId",
                label: "国家",
                refinfo: "country",
                refName: "国家",
                keyfordisplay: "countryName",
                compid: "countryIdBase",
                required: true,
            }, {
                type: "refer",
                key: "provinceId",
                keyfordisplay: "provinceName",
                label: "所在省份",
                refinfo: "region",
                domid: "provinceIdinfo",
                compid: "provinceIdBase",
                enable: true,
                required: true,
                clientParam: {
                    "EQ_areaLevel": "2"
                },
            }, {
                type: "refer",
                key: "cityId",
                keyfordisplay: "cityName",
                label: "所在城市",
                domid: "cityIdinfo",
                compid: "cityIdBase",
                enable: false,
                refinfo: "region",
                clientParam: {
                    "EQ_areaLevel": "3"
                },
                required: true,
            }, {
                type: "refer",
                key: "districtId",
                keyfordisplay: "districtName",
                label: "所在区/县",
                domid: "countyIdinfo",
                compid: "districtIdBase",
                enable: false,
                refinfo: "region",
                clientParam: {
                    "EQ_areaLevel": "4",
                },
            }, {
                type: "refer",
                keyfordisplay: "townName",
                key: "townId",
                label: "所在街道",
                domid: "townIdinfo",
                compid: "townIdBase",
                enable: false,
                refinfo: "region",
                clientParam: {
                    "EQ_areaLevel": "5"
                },
                required: true,
            }, {
                type: "text",
                key: "receiveAddress",
                label: "详细地址",
                required: true,
                // disableInEdit: true
            }, {
                type: "text",
                key: "detailAddr",
                label: "收货地址",
                enable: false,
                width: "400px"
            }]
        },
        details: {
            detail1: [{
                    key: "orderCode",
                    label: "订单编号",
                }, {
                    key: "orderDate",
                    label: "订单日期",
                    computed: "billDateComputed"
                }, {
                    key: "purchaseOrgName",
                    label: "采购组织",
                },
                // {
                //   key: "orderTypeCode",
                //   label: "订单类型",
                // },
                {
                    key: "supplierName",
                    label: "供应商",
                }, {
                    key: "tranTypeName",
                    label: "交易类型",
                }, {
                    key: "otherOrderNum",
                    label: "对方订单号",
                }, {
                    key: "purchasePersonName",
                    label: "采购员",
                }, {
                    key: "purchaseDeptName",
                    label: "采购部门",
                }, {
                    key: "refusedReason",
                    label: "冻结原因",
                }, {
                    key: "totalAmountMoney",
                    label: "总金额",
                }, {
                    key: "status",
                    label: "单据状态",
                    computed: "status",
                }, {
                    key: "state",
                    label: "审批状态",
                    computed: "state",
                }, {
                    key: "remark",
                    label: "备注",
                }, {
                    key: "selfLifing",
                    label: "是否自提",
                    computed: "selfLifingComputed"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "grid_complex",
                umeta: {
                    "id": "grid_complex",
                    "data": "purchaseList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                        "field": "orderCode",
                        "dataType": "String",
                        "title": "订单编号",
                        "renderType": "detailRender"
                    }, {
                        "field": "orderDate",
                        "dataType": "Date",
                        "title": "订单日期",
                    }, {
                        "field": "purchaseOrgName",
                        "dataType": "String",
                        "title": "采购组织",
                    }, {
                        "field": "tranTypeName",
                        "dataType": "String",
                        "title": "交易类型",
                    }, {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                    }, {
                        "field": "otherOrderNum",
                        "dataType": "String",
                        "title": "对方订单号"
                    }, {
                        "field": "coordinationOrderCode",
                        "dataType": "String",
                        "title": "协同单号"
                    }, {
                        "field": "totalAmountMoney",
                        "dataType": "String",
                        "title": "总金额",
                    }, {
                        "field": "status",
                        "dataType": "string",
                        "title": "订单状态",
                        "renderType": "statusRender",
                    }, {
                        "field": "state",
                        "dataType": "integer",
                        "title": "审批状态",
                        "renderType": "approveStateRender",
                    }, {
                        "field": "purchaseDeptName",
                        "dataType": "String",
                        "title": "采购部门",
                    },
                    // {
                    //   "field": "purchaseTypeName",
                    //   "dataType": "String",
                    //   "title": "采购类型",
                    //   "visible":false
                    // },
                    {
                        "field": "purchasePerson",
                        "dataType": "String",
                        "title": "采购员",
                        "visible": false
                    },

                    // {
                    //   "field": "totalGoodsNum",
                    //   "dataType": "float",
                    //   "title": "总数量",
                    // },

                    {
                        "field": "currencyName",
                        "dataType": "String",
                        "title": "币种",
                        "visible": false
                    }, {
                        "field": "approvalSummary",
                        "dataType": "string",
                        "title": "审批批语",
                        "visible": false
                    },
                    // {
                    //   "field": "confirmPerson",
                    //   "dataType": "String",
                    //   "title": "确认人"
                    // },
                    {
                        "field": "creator",
                        "dataType": "String",
                        "title": "创建人",
                        "visible": false
                    }, {
                        "field": "creationTime",
                        "dataType": "Date",
                        "title": "创建时间",
                        "visible": false
                    }, {
                        "field": "modifier",
                        "dataType": "String",
                        "title": "修改人",
                        "visible": false
                    }, {
                        "field": "modifiedTime",
                        "dataType": "Date",
                        "title": "修改时间",
                        "visible": false
                    }, {
                        "field": "operationCode",
                        "dataType": "String",
                        "title": "操作",
                        "renderType": "operation",
                        "fixed": true,
                        "width": "100px"
                    },
                ]
            },

            //商品信息
            grid2: {
                domid: "grid_complexItem",
                umeta: {
                    "id": "grid_complexItem",
                    "data": "purchaseItems",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true,
                    "onBeforeEditFun": "beforeEditCheck"
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
                    "field": "goodsNum",
                    "dataType": "String",
                    "title": "数量",
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
                }, {
                    "field": "amountMoney",
                    "dataType": "String",
                    "title": "金额",
                    "editable": false
                }, {
                    field: "goodsSelection",
                    dataType: "String",
                    title: "商品选配ID",
                    editable: false,
                    visible: false,
                }, {
                    field: "goodsSelectionDescription",
                    dataType: "String",
                    title: "商品选配",
                    renderType: "goodsOpt",
                    editable: false,
                }, {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "required": true,
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
                }, {
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
                }, {
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
                }, {
                    "field": "addStorageAmount",
                    "dataType": "String",
                    "title": "累计入库数量",
                    "editable": false,
                }, {
                    "field": "applyReturnNum",
                    "dataType": "String",
                    "title": "累计退货数量",
                    "editable": false,
                }, {
                    "field": "batchCode",
                    "dataType": "String",
                    "title": "项目号",
                    "editable": false,
                    "visible": false
                // }, {
                //     "field": "stockStatus",
                //     "dataType": "String",
                //     "title": "库存状态",
                //     "renderType": "stockRender",
                //     "editable": false,
                //     "visible": false
                }, ]
            },
            grid3: {
                domid: "grid_complexItem_detail",
                umeta: {
                    "id": "grid_complexItem_detail",
                    "data": "purchaseItems",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "rowNum",
                    "dataType": "String",
                    "title": "行号",
                }, {
                    "field": "goodsCode",
                    "dataType": "String",
                    "title": "商品编码",
                }, {
                    "field": "goodsName",
                    "dataType": "String",
                    "title": "商品名称",
                }, {
                    "field": "goodsNum",
                    "dataType": "String",
                    "title": "数量",
                    "required": true,
                }, {
                    "field": "unitName",
                    "dataType": "String",
                    "title": "单位",
                }, {
                    "field": "unitPrice",
                    "dataType": "String",
                    "title": "单价",
                }, {
                    "field": "amountMoney",
                    "dataType": "String",
                    "title": "金额",
                    "required": true,
                }, {
                    field: "goodsSelection",
                    dataType: "String",
                    title: "商品选配",
                    renderType: "goodsOptDetails",
                }, {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "required": true,
                }, {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "visible": false,
                }, {
                    "field": "isClosed",
                    "dataType": "checkbox",
                    "title": "关闭",
                    "width": "130px",
                    "renderType": "disableBooleanRender",
                }, {
                    "field": "isGift",
                    "dataType": "checkbox",
                    "title": "赠品",
                    "editType": "float",
                    "renderType": "disableBooleanRender",
                }, {
                    "field": "creator",
                    "dataType": "String",
                    "title": "创建人",
                    "visible": false
                }, {
                    "field": "creationTime",
                    "dataType": "Date",
                    "title": "创建时间",
                    "visible": false
                }, {
                    "field": "modifier",
                    "dataType": "String",
                    "title": "修改人",
                    "visible": false
                }, {
                    "field": "modifiedTime",
                    "dataType": "Date",
                    "title": "修改时间",
                    "visible": false
                }, {
                    "field": "demandStockOrgName",
                    "dataType": "String",
                    "title": "需求库存组织",
                }, {
                    "field": "arrivalBelongName",
                    "dataType": "String",
                    "title": "收货地归属",
                }, {
                    "field": "receiveStorageOrgName",
                    "dataType": "String",
                    "title": "收货库存组织",
                }, {
                    "field": "receiveStorageName",
                    "dataType": "String",
                    "title": "收货仓库",
                }, {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "收货客户",
                }, {
                    "field": "detailAddr",
                    "dataType": "String",
                    "title": "地址信息",
                }, {
                    "field": "receiveAddress",
                    "dataType": "String",
                    "title": "收货地址",
                }, {
                    "field": "receiveContact",
                    "dataType": "String",
                    "title": "收货联系人",
                }, {
                    "field": "receiveContactPhone",
                    "dataType": "String",
                    "title": "收货联系人电话",
                }, {
                    "field": "addStorageAmount",
                    "dataType": "String",
                    "title": "累计入库数量",
                }, {
                    "field": "applyReturnNum",
                    "dataType": "String",
                    "title": "累计退货数量",
                }, {
                    "field": "batchCode",
                    "dataType": "String",
                    "title": "项目号",
                    "editable": false,
                    "visible": false
                }, ]
            },

            //bom结构信息
            grid4: {
                domid: "grid_complexBomItem",
                umeta: {
                    "id": "grid_complexBomItem",
                    "data": "purchaseBomItems",
                    "type": "grid",
                    "editable": true,
                    "showNumCol": true,
                },
                columns: [{
                    "field": "rowNum",
                    "dataType": "String",
                    "title": "行号",
                    "editable": false,
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
                    "field": "goodsNum",
                    "dataType": "String",
                    "title": "数量",
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
                }, {
                    "field": "amountMoney",
                    "dataType": "String",
                    "title": "金额",
                    "editable": false
                }, {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                    "required": true,
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
                    "title": "赠品",
                    "editable": false,
                    "renderType": "booleanRender",
                }, {
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
                }, {
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
                }, {
                    "field": "addStorageAmount",
                    "dataType": "String",
                    "title": "累计入库数量",
                    "editable": false,
                }, {
                    "field": "applyReturnNum",
                    "dataType": "String",
                    "title": "累计退货数量",
                    "editable": false,
                }, {
                    "field": "batchCode",
                    "dataType": "String",
                    "title": "项目号",
                    "editable": false,
                    "visible": false
                }, ]
            },
            grid5: {
                domid: "grid_complexBomItem_detail",
                umeta: {
                    "id": "grid_complexBomItem_detail",
                    "data": "purchaseBomItems",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true
                },
                columns: [{
                    "field": "rowNum",
                    "dataType": "String",
                    "title": "行号",
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
                    "field": "goodsCode",
                    "dataType": "String",
                    "title": "商品编码",
                }, {
                    "field": "goodsName",
                    "dataType": "String",
                    "title": "商品名称",
                }, {
                    "field": "goodsNum",
                    "dataType": "String",
                    "title": "数量",
                    "required": true,
                }, {
                    "field": "unitName",
                    "dataType": "String",
                    "title": "单位",
                }, {
                    "field": "unitPrice",
                    "dataType": "String",
                    "title": "单价",
                }, {
                    "field": "amountMoney",
                    "dataType": "String",
                    "title": "金额",
                }, {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "required": true,
                }, {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "visible": false,
                }, {
                    "field": "isClosed",
                    "dataType": "checkbox",
                    "title": "关闭",
                    "width": "130px",
                    "renderType": "disableBooleanRender",
                }, {
                    "field": "isGift",
                    "dataType": "checkbox",
                    "title": "赠品",
                    "editType": "float",
                    "renderType": "disableBooleanRender",
                }, {
                    "field": "creator",
                    "dataType": "String",
                    "title": "创建人",
                    "visible": false
                }, {
                    "field": "creationTime",
                    "dataType": "Date",
                    "title": "创建时间",
                    "visible": false
                }, {
                    "field": "modifier",
                    "dataType": "String",
                    "title": "修改人",
                    "visible": false
                }, {
                    "field": "modifiedTime",
                    "dataType": "Date",
                    "title": "修改时间",
                    "visible": false
                }, {
                    "field": "demandStockOrgName",
                    "dataType": "String",
                    "title": "需求库存组织",
                    "visible": false
                }, {
                    "field": "arrivalBelongName",
                    "dataType": "String",
                    "title": "收货地归属",
                    "visible": false
                }, {
                    "field": "receiveStorageOrgName",
                    "dataType": "String",
                    "title": "收货库存组织",
                    "visible": false
                }, {
                    "field": "receiveStorageName",
                    "dataType": "String",
                    "title": "收货仓库",
                    "visible": false
                }, {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "收货客户",
                    "visible": false
                }, {
                    "field": "detailAddr",
                    "dataType": "String",
                    "title": "地址信息",
                    "visible": false
                }, {
                    "field": "receiveAddress",
                    "dataType": "String",
                    "title": "收货地址",
                    "visible": false
                }, {
                    "field": "receiveContact",
                    "dataType": "String",
                    "title": "收货联系人",
                    "visible": false
                }, {
                    "field": "receiveContactPhone",
                    "dataType": "String",
                    "title": "收货联系人电话",
                    "visible": false
                }, {
                    "field": "addStorageAmount",
                    "dataType": "String",
                    "title": "累计入库数量",
                }, {
                    "field": "applyReturnNum",
                    "dataType": "String",
                    "title": "累计退货数量",
                }, {
                    "field": "batchCode",
                    "dataType": "String",
                    "title": "项目号",
                    "editable": false,
                    "visible": false
                }, ]
            },
        }
    }
    return new basemodel(model)
})