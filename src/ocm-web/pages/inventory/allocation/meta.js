define(["ocm_basemodel"], function (basemodel) {
    var B2cReqorderItemsmeta = {
        meta: {
            reqOrderId: {type: 'string'},//要货单主键
            rowNum: {type: 'string'},// 行号
            goodsId: {type: 'string',
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'}, //商品
            goodsName: {type: 'string'}, //商品名称
            goodsCode: {type: 'string'}, //商品Code
            basePrice: {type: 'priceFloat'}, //单价
            promPrice: {type: 'priceFloat'}, //促销价
            dealPrice: {type: 'priceFloat'}, //成交价
            stockInNum: {type: 'numberFloat'}, //累计入库数量
            stockOutNum: {type: 'numberFloat'}, //累计出库数量

            isGift:{type:'string'},//赠品
        },
        pageSize: 10
    };
    var B2cReqBomItemsmeta = {
        meta : {
            //todo
        },
        pageSize: 10
    };
    var model = {
        // 元数据
        metas: {
            complex: {
                meta: {
                    id: {
                        type: "string"
                    }, //id
                    // 出库库存组织
                    pkOrgId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.organization_ocm),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },
                    pkOrgCode: {
                        type: "string"
                    },
                    pkOrgName: {
                        type: "string"
                    },
                    // 入库库存组织
                    pkOrgInId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.organization_ocm),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },
                    pkOrgInCode: {
                        type: "string"
                    },
                    pkOrgInName: {
                        type: "string"
                    },
                    // 单据号
                    code: {
                        type: "string",
                    },
                    // 单据日期
                    billDate: {
                        type: "string",
                        required: true
                    },
                    // 单据类型
                    billType: {
                        type: "string",
                        default: "Transfer"
                    },
                    //交易类型
                    billTranTypeId: {
                        type: "string",
                        required: true,
                        default: "Transfer",
                        refmodel: JSON.stringify(refinfo.trantype),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"交易类型"}',
                        refparam: '{"EQ_billTypeId":"Transfer"}'
                    },
                    billTranTypeCode: {
                        type: "string"
                    },
                    billTranTypeName: {
                        type: "string"
                    },
                    // 出库仓库
                    // outStorageId: {
                    //     type: "string",
                    //     required: true,
                    //     refmodel: JSON.stringify(refinfo.warehouse),
                    //     refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                    //     refparam: '{"EQ_isEnable":"1"}'
                    // },
                    // outStorageCode: {
                    //     type: "string"
                    // },
                    // outStorageName: {
                    //     type: "string"
                    // },
                    // outIfSlotManage:{
                    //     type: "string",
                    //     default:'0'
                    // },
                    // 入库仓库
                    // inStorageId: {
                    //     type: "string",
                    //     required: true,
                    //     refmodel: JSON.stringify(refinfo.warehouse),
                    //     refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                    //     refparam: '{"EQ_isEnable":"1"}'
                    // },
                    // inStorageCode: {
                    //     type: "string"
                    // },
                    // inStorageName: {
                    //     type: "string"
                    // },
                    // inIfSlotManage:{
                    //     type: "string",
                    //     default:'0'
                    // },
                    // ifSlotManage:{
                    //     type: "string",
                    //     default:'0'
                    // },
                    // 出库业务员
                    outBizPersonId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.person),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"业务员"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    outBizPersonCode: {
                        type: "string"
                    },
                    outBizPersonName: {
                        type: "string"
                    },
                    // 入库业务员
                    inBizPersonId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.person),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"业务员"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    inBizPersonCode: {
                        type: "string"
                    },
                    inBizPersonName: {
                        type: "string"
                    },
                    // 出库部门
                    outDeptId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.department),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"部门"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    outDeptCode: {
                        type: "string"
                    },
                    outDeptName: {
                        type: "string"
                    },
                    // 入库部门
                    inDeptId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.department),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"部门"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    inDeptCode: {
                        type: "string"
                    },
                    inDeptName: {
                        type: "string"
                    },
                    // 计划发货日期
                    planSendDate: {
                        type: "date"
                    },
                    // 计划到货日期
                    planArriveDate: {
                        type: "date"
                    },
                    // 币种
                    currencyId: {
                        type: "string"
                    },
                    currencyCode: {
                        type: "string"
                    },
                    currencyName: {
                        type: "string"
                    },
                    // 实出总数量
                    totalInNum: {
                        type: "string"
                    },
                    // 实入总数量
                    totalOutNum: {
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
                    // 调拨状态
                    transferStatusId: {
                        type: "string"
                    },
                    transferStatusCode: {
                        type: "string"
                    },
                    transferStatusName: {
                        type: "string"
                    },
                    //审批状态
                    state: { type: "integer", default: 0 },
                    // 库存单据归属
                    stockBillBelong: {
                        type: "string"
                    },
                    // 所属客户
                    customerId: {
                        type: "string"
                    },
                    customerName: {
                        type: "string"
                    },
                    customerCode: {
                        type: "string"
                    },
                    // 是否关闭
                    isClose: {
                        type: "string",
                        default: 0
                    },
                    // 关闭人
                    closer: {
                        type: "string"
                    },
                    // 关闭时间
                    closeDate: {
                        type: "string"
                    },
                    // 关闭原因
                    closeReason: {
                        type: "string"
                    },
                    // 审核人
                    approver: {
                        type: "string"
                    },
                    // 审核时间
                    approveTime: {
                        type: "string"
                    },
                    // 审核批语
                    approveOpinion: {
                        type: "string"
                    },
                    // 备注
                    remark: {
                        type: "string"
                    },
                    // 是否铺货（01是，02否）
                    isDistribution: {
                        type: "string"
                    },
                    // 是否退回（01是，02否）
                    isReturned: {
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
                    }, //id
                    // 行号
                    rowNum: {
                        type: "string"
                    },
                    dr: { type: 'string' },
                    // 调拨单ID
                    TransferBillId: {
                        type: "string"
                    },
                    // 商品id
                    goodsId: {
                        type: "string"
                    },
                    goodsCode: {
                        type: "string"
                    },
                    goodsName: {
                        type: "string"
                    },
                    goodsFullName: {
                        type: "string"
                    },
                    goodsBasicUnitName: {
                        type: "string"
                    },
                    goodsAssistUnitName: {
                        type: "string"
                    },
                    goodsConversionRate: {
                        type: "string"
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
                    unitId: {
                        type: 'string'
                    },
                    unitCode: {
                        type: 'string'
                    },
                    unitName: {
                        type: 'string'
                    },
                    // 应转数量
                    transferNum: {
                        type: "string"
                    },
                    // 在途数量
                    onwayNum: {
                        type: "string"
                    },
                    // 累计出库数量
                    totalOutNum: {
                        type: "string"
                    },
                    // 累计入库数量
                    totalInNum: {
                        type: "string"
                    },
                    // 单价
                    unitPrice: {
                        type: "string"
                    },
                    // 金额
                    amountMoney: {
                        type: "string"
                    },
                    // 备注
                    remark: {
                        type: "string"
                    },
                    // 批次号
                    batchNumId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.batchNumber),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"批次号"}'
                    },
                    batchNumCode: {
                        type: "string"
                    },
                    batchNumName: {
                        type: "string"
                    },
                    // 货位
                    goodsPositionId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goodsposition),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                    },
                    goodsPositionCode: {
                        type: "string"
                    },
                    goodsPositionName: {
                        type: "string"
                    },
                    // 收货地址
                    receiverAddress: {
                        type: "string"
                    },
                    // 省
                    provinceId: {
                        type: "string"
                    },
                    provinceCode: {
                        type: "string"
                    },
                    provinceName: {
                        type: "string"
                    },
                    // 市
                    cityId: {
                        type: "string"
                    },
                    cityCode: {
                        type: "string"
                    },
                    cityName: {
                        type: "string"
                    },
                    // 区 / 县
                    countyId: {
                        type: "string"
                    },
                    countyCode: {
                        type: "string"
                    },
                    countyName: {
                        type: "string"
                    },
                    // 街道 / 乡 / 镇
                    townId: {
                        type: "string"
                    },
                    townCode: {
                        type: "string"
                    },
                    townName: {
                        type: "string"
                    },
                    // 详细地址
                    detailAddr: {
                        type: "string"
                    },
                    // 收货联系人
                    receiver: {
                        type: "string"
                    },
                    // 收货联系电话
                    receiverPhone: {
                        type: "string"
                    },
                    // 收货联系电话（ 备用）
                    receiverPhoneSpare: {
                        type: "string"
                    },
                    // 是否关闭
                    isClose: {
                        type: "string",
                        default: 0
                    },
                    // 来源单据号
                    sourceId: {
                        type: "string"
                    },
                    // 来源单据行号
                    sourceLineNum: {
                        type: "string"
                    },
                    // 来源单据类型
                    sourceNum: {
                        type: "string"
                    },
                    goodsVersion: {
                        type: 'string',
                        required: true
                    },  //商品版本号
                    batchCodeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchCode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                    },//批号
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
                    originalGoodsId: {
                        type: 'string',
                    },  //原始版本商品
                    goodsSelection: {
                        type: 'string',
                        required: true
                    },
                    goodsSelectionDescription: {
                        type: 'string',
                    },//商品选项描述
                    //调出仓库
                    outStorageId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.warehouse),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    outStorageCode: {
                        type: "string"
                    },
                    outStorageName: {
                        type: "string"
                    },
                    outIfSlotManage: {
                        type: "string",
                        default: '0'
                    },
                    ifSlotManage: {
                        type: "string"
                    },
                    //调入仓库
                    inStorageId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.warehouse),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    inStorageCode: {
                        type: "string"
                    },
                    inStorageName: {
                        type: "string"
                    },
                    inIfSlotManage: {
                        type: "string",
                        default: '0'
                    },
                    //调出货位
                    outPositionId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goodsposition),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                    },
                    outPositionCode: {
                        type: "string"
                    },
                    outPositionName: {
                        type: "string"
                    }
                },
                pageSize: 10
            },
            ItemRef: {
                meta: {
                    goodsref: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goods),
                        refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        refparam: '{"EQ_isEnable":"1","EQ_isServiceType":"0"}'
                    }
                }
            },
            transferOut: {
                meta: {
                    id: {
                        type: "string"
                    },
                    stockOrgId: {
                        type: "string",
                        required: true,

                        refmodel: JSON.stringify(refinfo.organization_ocm),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    }, //库存组织
                    stockOrgCode: {
                        type: "string"
                    },
                    stockOrgName: {
                        type: "string"
                    },
                    code: {
                        type: "string"
                    }, //单据号
                    billDate: {
                        type: "data",
                        required: true
                    }, //单据日期
                    billType: {
                        type: "string",
                        required: true,
                        default: "TransferOut"
                    }, //单据类型
                    billTranTypeId: {
                        type: "string",
                        required: true,
                        default: "TransferOut"
                    }, //交易类型
                    billTranTypeCode: {
                        type: "string"
                    },
                    billTranTypeName: {
                        type: "string"
                    },
                    storageId: {
                        type: "string",
                        required: true,

                        refmodel: JSON.stringify(refinfo.warehouse),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //出库仓库
                    storageCode: {
                        type: "string"
                    },
                    storageName: {
                        type: "string"
                    },
                    // 是否开启货位管理
                    ifSlotManage: {
                        type: 'string'
                    },
                    storekeeperId: {
                        type: "string",

                        refmodel: JSON.stringify(refinfo.person),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"库管员"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //库管员
                    storekeeperCode: {
                        type: "string"
                    },
                    storekeeperName: {
                        type: "string"
                    },
                    planSendDate: {
                        type: "date"
                    }, //计划发货日期
                    planArriveDate: {
                        type: "date"
                    }, //计划到货日期
                    currencyId: {
                        type: "string",
                        required: true
                    }, //币种
                    currencyCode: {
                        type: "string"
                    },
                    currencyName: {
                        type: "string"
                    },
                    totalOutNum: {
                        type: "string"
                    }, //实出总数量
                    totalInNum: {
                        type: "string"
                    }, //实入总数量
                    billStatus: {
                        type: "string"
                    }, //单据状态
                    stockBillBelong: {
                        type: "string"
                    }, //库存单据归属
                    customerId: {
                        type: "string"
                    }, //客户
                    customerCode: {
                        type: "string"
                    },
                    customerName: {
                        type: "string"
                    },
                    bizPersonId: {
                        type: "string",

                        refmodel: JSON.stringify(refinfo.person),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"业务员"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //业务员
                    bizPersonCode: {
                        type: "string"
                    },
                    bizPersonName: {
                        type: "string"
                    },
                    deparmentId: {
                        type: "string",

                        refmodel: JSON.stringify(refinfo.department),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"部门"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //部门
                    deparmentCode: {
                        type: "string"
                    },
                    deparmentName: {
                        type: "string"
                    },
                    logisticsId: {
                        type: "string"
                    }, //物流公司
                    logisticsCode: {
                        type: "string"
                    },
                    logisticsName: {
                        type: "string"
                    },
                    siger: {
                        type: "string"
                    }, //签字人
                    signTime: {
                        type: "data"
                    }, //签字日期
                    cancelReason: {
                        type: "string",
                        maxLength: "200"
                    }, //取消原因
                    remark: {
                        type: "string",
                        maxLength: "200"
                    } //备注
                },
                pageSize: 10
            },
            transferOutItems: {
                meta: {
                    transferOutBill: {
                        type: "string"
                    }, //主表ID
                    rowNum: {
                        type: "integer",
                        required: true
                    }, //行号
                    goodsId: {
                        type: "string",
                        required: true
                    }, //库存商品id
                    goodsCode: {
                        type: "string",
                        required: true
                    },
                    goodsName: {
                        type: "string",
                        required: true
                    },
                    goodsFullName: {
                        type: "string"
                    },
                    goodsBasicUnitName: {
                        type: "string"
                    },
                    goodsAssistUnitName: {
                        type: "string"
                    },
                    goodsConversionRate: {
                        type: "string"
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
                    unitId: {
                        type: 'string'
                    },
                    unitCode: {
                        type: 'string'
                    },
                    unitName: {
                        type: 'string'
                    },
                    shouldOutNum: {
                        type: "string",
                        required: true
                    }, //应转数量
                    factOutNum: {
                        type: "string"
                    }, //实出数量
                    unitPrice: {
                        type: "string"
                    }, //单价
                    amountMoney: {
                        type: "string"
                    }, //金额
                    batchNum: {
                        type: "string"
                    }, //批次号
                    goodsPositionId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goodsposition),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                    }, //货位
                    goodsPositionCode: {
                        type: "string"
                    },
                    goodsPositionName: {
                        type: "string"
                    },
                    stockOutPersonId: {
                        type: "string",
                        required: true
                    }, //出库人
                    stockOutPersonCode: {
                        type: "string"
                    },
                    stockOutPersonName: {
                        type: "string"
                    },
                    stockOutDate: {
                        type: "date"
                    }, //出库日期
                    receiverAddress: {
                        type: "string",
                        maxLength: "200"
                    }, //收货地址
                    provinceId: {
                        type: "string"
                    }, //省
                    provinceCode: {
                        type: "string"
                    },
                    provinceName: {
                        type: "string"
                    },
                    cityId: {
                        type: "string"
                    }, //市
                    cityCode: {
                        type: "string"
                    },
                    cityName: {
                        type: "string"
                    },
                    countyId: {
                        type: "string"
                    }, //区/县
                    countyCode: {
                        type: "string"
                    },
                    countyName: {
                        type: "string"
                    },
                    townId: {
                        type: "string"
                    }, //街道/乡/镇
                    townCode: {
                        type: "string"
                    },
                    townName: {
                        type: "string"
                    },
                    detailAddr: {
                        type: "string",
                        maxLength: "200"
                    }, //详细地址
                    receiver: {
                        type: "string"
                    }, //收货联系人
                    receiverPhone: {
                        type: "string"
                    }, //收货联系电话
                    receiverPhoneSpare: {
                        type: "string"
                    }, //收货联系电话（备用）
                    sourceId: {
                        type: "string"
                    }, //源头单据号
                    sourceLineNum: {
                        type: "string"
                    }, //源头单据行号
                    sourceType: {
                        type: "string"
                    }, //源头单据类型
                    remark: {
                        type: "string",
                        maxLength: "200"
                    }, //备注
                    goodsVersion: {
                        type: 'string',
                        required: true
                    },  //商品版本号
                    batchCodeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchCode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                    },//批号
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
                    originalGoodsId: {
                        type: 'string',
                    },  //原始版本商品
                    goodsSelection: {
                        type: 'string',
                        required: true
                    },
                    goodsSelectionDescription: {
                        type: 'string',
                    },//商品选项描述
                },
                pageSize: 10
            },
            transferIn: {
                meta: {
                    id: {
                        type: "string"
                    },
                    stockOrgId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.organization_ocm),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    }, //库存组织
                    stockOrgCode: {
                        type: "string"
                    },
                    stockOrgName: {
                        type: "string"
                    },
                    code: {
                        type: "string",

                    }, //单据号
                    billDate: {
                        type: "data",
                        required: true
                    }, //单据日期
                    billType: {
                        type: "string",
                        required: true,
                        default: "TransferIn"
                    }, //单据类型
                    billTranTypeId: {
                        type: "string",
                        required: true,
                        default: "TransferIn"
                    }, //交易类型
                    billTranTypeCode: {
                        type: "string"
                    },
                    billTranTypeName: {
                        type: "string"
                    },
                    storageId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.warehouse),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //入库仓库
                    storageCode: {
                        type: "string"
                    },
                    storageName: {
                        type: "string"
                    },
                    // 是否开启货位管理
                    ifSlotManage: {
                        type: 'string'
                    },
                    storekeeperId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.person),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"库管员"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //库管员
                    storekeeperCode: {
                        type: "string"
                    },
                    storekeeperName: {
                        type: "string"
                    },
                    inDate: {
                        type: "date"
                    }, //入库日期
                    planSendDate: {
                        type: "date"
                    }, //计划发货日期
                    planArriveDate: {
                        type: "date"
                    }, //计划到货日期
                    currencyId: {
                        type: "string",
                        required: true,
                    }, //币种
                    currencyCode: {
                        type: "string"
                    },
                    currencyName: {
                        type: "string"
                    },
                    shouldInNum: {
                        type: "string"
                    }, //应入总数量
                    totalInNum: {
                        type: "string"
                    }, //实入总数量
                    billStatusId: {
                        type: "string"
                    }, //单据状态
                    billStatusName: {
                        type: "string"
                    },
                    billStatusCode: {
                        type: "string"
                    },
                    stockBillBelong: {
                        type: "string",

                    }, //库存单据归属
                    customerId: {
                        type: "string",

                    }, //客户
                    customerCode: {
                        type: "string"
                    },
                    customerName: {
                        type: "string"
                    },
                    bizPersonId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.person),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"业务员"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //业务员
                    bizPersonCode: {
                        type: "string"
                    },
                    bizPersonName: {
                        type: "string"
                    },
                    deparmentId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.department),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"部门"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //部门
                    deparmentCode: {
                        type: "string"
                    },
                    deparmentName: {
                        type: "string"
                    },
                    logisticsId: {
                        type: "string",

                    }, //物流公司
                    logisticsCode: {
                        type: "string"
                    },
                    logisticsName: {
                        type: "string"
                    },
                    siger: {
                        type: "string",

                    }, //签字人
                    signTime: {
                        type: "date"
                    }, //签字日期
                    cancelReason: {
                        type: "string",
                        maxLength: "200"
                    }, //取消原因
                    remark: {
                        type: "string",
                        maxLength: "200"
                    } //备注
                },
                pageSize: 10
            },
            transferInItems: {
                meta: {
                    transferOutBillId: {
                        type: "string",

                    }, //主表ID
                    rowNum: {
                        type: "integer",
                        required: true,

                    }, //行号
                    goodsId: {
                        type: "string",
                        required: true,

                    }, //库存商品id
                    goodsCode: {
                        type: "string",
                        required: true,

                    },
                    goodsName: {
                        type: "string",
                        required: true,

                    },
                    goodsFullName: {
                        type: "string",

                    },
                    goodsBasicUnitName: {
                        type: "string",

                    },
                    goodsAssistUnitName: {
                        type: "string",

                    },
                    goodsConversionRate: {
                        type: "string",

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
                    unitId: {
                        type: 'string'
                    },
                    unitCode: {
                        type: 'string'
                    },
                    unitName: {
                        type: 'string'
                    },
                    shouldInNum: {
                        type: "string",
                        required: true
                    }, //应入数量
                    factInNum: {
                        type: "string"
                    }, //实入数量
                    unitPrice: {
                        type: "string"
                    }, //单价
                    amountMoney: {
                        type: "string"
                    }, //金额
                    batchNum: {
                        type: "string",

                    }, //批次号
                    goodsPositionId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goodsposition),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                    }, //货位
                    goodsPositionCode: {
                        type: "string",

                    },
                    goodsPositionName: {
                        type: "string",

                    },
                    stockInPersonId: {
                        type: "string",
                        required: true,

                    }, //入库人
                    stockInPersonCode: {
                        type: "string",

                    },
                    stockInPersonName: {
                        type: "string",

                    },
                    stockInDate: {
                        type: "date"
                    }, //入库日期
                    sourceId: {
                        type: "string",

                    }, //源头单据号
                    sourceLineNum: {
                        type: "string",

                    }, //源头单据行号
                    sourceType: {
                        type: "string",

                    }, //源头单据类型
                    remark: {
                        type: "string",
                        maxLength: "200"
                    }, //备注
                    goodsVersion: {
                        type: 'string',
                        required: true
                    },  //商品版本号
                    batchCodeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchCode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                    },//批号
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
                    originalGoodsId: {
                        type: 'string',
                    },  //原始版本商品
                    goodsSelection: {
                        type: 'string',
                        required: true
                    },
                    goodsSelectionDescription: {
                        type: 'string',
                    },//商品选项描述
                },
                pageSize: 10
            },
            BomItem: {
                meta: {
                    id: {
                        type: "string"
                    }, //id
                    // 行号
                    rowNum: {
                        type: "string"
                    },
                    // 调拨单ID
                    TransferBillId: {
                        type: "string"
                    },
                    // 商品id
                    goodsId: {
                        type: "string"
                    },
                    goodsCode: {
                        type: "string"
                    },
                    goodsName: {
                        type: "string"
                    },
                    goodsFullName: {
                        type: "string"
                    },
                    goodsBasicUnitName: {
                        type: "string"
                    },
                    goodsAssistUnitName: {
                        type: "string"
                    },
                    goodsConversionRate: {
                        type: "string"
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
                    unitId: {
                        type: 'string'
                    },
                    unitCode: {
                        type: 'string'
                    },
                    unitName: {
                        type: 'string'
                    },
                    // 应转数量
                    transferNum: {
                        type: "string"
                    },
                    // 在途数量
                    onwayNum: {
                        type: "string"
                    },
                    // 累计出库数量
                    totalOutNum: {
                        type: "string"
                    },
                    // 累计入库数量
                    totalInNum: {
                        type: "string"
                    },
                    // 单价
                    unitPrice: {
                        type: "string"
                    },
                    // 金额
                    amountMoney: {
                        type: "string"
                    },
                    // 备注
                    remark: {
                        type: "string"
                    },
                    // 批次号
                    batchNumId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.batchNumber),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"批次号"}'
                    },
                    batchNumCode: {
                        type: "string"
                    },
                    batchNumName: {
                        type: "string"
                    },
                    // 货位
                    goodsPositionId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goodsposition),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                    },
                    goodsPositionCode: {
                        type: "string"
                    },
                    goodsPositionName: {
                        type: "string"
                    },
                    // 收货地址
                    receiverAddress: {
                        type: "string"
                    },
                    // 省
                    provinceId: {
                        type: "string"
                    },
                    provinceCode: {
                        type: "string"
                    },
                    provinceName: {
                        type: "string"
                    },
                    // 市
                    cityId: {
                        type: "string"
                    },
                    cityCode: {
                        type: "string"
                    },
                    cityName: {
                        type: "string"
                    },
                    // 区 / 县
                    countyId: {
                        type: "string"
                    },
                    countyCode: {
                        type: "string"
                    },
                    countyName: {
                        type: "string"
                    },
                    // 街道 / 乡 / 镇
                    townId: {
                        type: "string"
                    },
                    townCode: {
                        type: "string"
                    },
                    townName: {
                        type: "string"
                    },
                    // 详细地址
                    detailAddr: {
                        type: "string"
                    },
                    // 收货联系人
                    receiver: {
                        type: "string"
                    },
                    // 收货联系电话
                    receiverPhone: {
                        type: "string"
                    },
                    // 收货联系电话（ 备用）
                    receiverPhoneSpare: {
                        type: "string"
                    },
                    // 是否关闭
                    isClose: {
                        type: "string"
                    },
                    // 来源单据号
                    sourceId: {
                        type: "string"
                    },
                    // 来源单据行号
                    sourceLineNum: {
                        type: "string"
                    },
                    // 来源单据类型
                    sourceNum: {
                        type: "string"
                    },
                    //------- 630后 新加bom包件字段 -------
                    goodsVersion: {
                        type: 'string',
                        required: true
                    },  //商品版本号
                    goodsSelection: {
                        type: 'string',
                        required: true
                    },  //商品选配项
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
                        type: 'float',
                    },
                    batchCodeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchCode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                    },//批号
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
                    originalGoodsId: {
                        type: 'string',
                    },  //原始版本商品
                    goodsSelectionDescription: {
                        type: 'string',
                    },//商品选项描述
                    //调出仓库
                    outStorageId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.warehouse),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    outStorageCode: {
                        type: "string"
                    },
                    outStorageName: {
                        type: "string"
                    },
                    outIfSlotManage: {
                        type: "string",
                        default: '0'
                    },
                    //调入仓库
                    inStorageId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.warehouse),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    inStorageCode: {
                        type: "string"
                    },
                    inStorageName: {
                        type: "string"
                    },
                    inIfSlotManage: {
                        type: "string",
                        default: '0'
                    },
                    //调出货位
                    outPositionId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goodsposition),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                    },
                    outPositionCode: {
                        type: "string"
                    },
                    outPositionName: {
                        type: "string"
                    }
                },
                pageSize: 10
            },
            BomItemOut: {
                meta: {
                    transferOutBill: {
                        type: "string"
                    }, //主表ID
                    rowNum: {
                        type: "integer",
                        required: true
                    }, //行号
                    goodsId: {
                        type: "string",
                        required: true
                    }, //库存商品id
                    goodsCode: {
                        type: "string",
                        required: true
                    },
                    goodsName: {
                        type: "string",
                        required: true
                    },
                    goodsFullName: {
                        type: "string"
                    },
                    goodsBasicUnitName: {
                        type: "string"
                    },
                    goodsAssistUnitName: {
                        type: "string"
                    },
                    goodsConversionRate: {
                        type: "string"
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
                    unitId: {
                        type: 'string'
                    },
                    unitCode: {
                        type: 'string'
                    },
                    unitName: {
                        type: 'string'
                    },
                    shouldOutNum: {
                        type: "string",
                        required: true
                    }, //应转数量
                    factOutNum: {
                        type: "string"
                    }, //实出数量
                    unitPrice: {
                        type: "string"
                    }, //单价
                    amountMoney: {
                        type: "string"
                    }, //金额
                    batchNum: {
                        type: "string"
                    }, //批次号
                    goodsPositionId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goodsposition),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                    }, //货位
                    goodsPositionCode: {
                        type: "string"
                    },
                    goodsPositionName: {
                        type: "string"
                    },
                    stockOutPersonId: {
                        type: "string",
                        required: true
                    }, //出库人
                    stockOutPersonCode: {
                        type: "string"
                    },
                    stockOutPersonName: {
                        type: "string"
                    },
                    stockOutDate: {
                        type: "date"
                    }, //出库日期
                    receiverAddress: {
                        type: "string",
                        maxLength: "200"
                    }, //收货地址
                    provinceId: {
                        type: "string"
                    }, //省
                    provinceCode: {
                        type: "string"
                    },
                    provinceName: {
                        type: "string"
                    },
                    cityId: {
                        type: "string"
                    }, //市
                    cityCode: {
                        type: "string"
                    },
                    cityName: {
                        type: "string"
                    },
                    countyId: {
                        type: "string"
                    }, //区/县
                    countyCode: {
                        type: "string"
                    },
                    countyName: {
                        type: "string"
                    },
                    townId: {
                        type: "string"
                    }, //街道/乡/镇
                    townCode: {
                        type: "string"
                    },
                    townName: {
                        type: "string"
                    },
                    detailAddr: {
                        type: "string",
                        maxLength: "200"
                    }, //详细地址
                    receiver: {
                        type: "string"
                    }, //收货联系人
                    receiverPhone: {
                        type: "string"
                    }, //收货联系电话
                    receiverPhoneSpare: {
                        type: "string"
                    }, //收货联系电话（备用）
                    sourceId: {
                        type: "string"
                    }, //源头单据号
                    sourceLineNum: {
                        type: "string"
                    }, //源头单据行号
                    sourceType: {
                        type: "string"
                    }, //源头单据类型
                    remark: {
                        type: "string",
                        maxLength: "200"
                    }, //备注
                    //------- 630后 新加bom包件字段 -------
                    goodsVersion: {
                        type: 'string',
                        required: true
                    },  //商品版本号
                    goodsSelection: {
                        type: 'string',
                        required: true
                    },  //商品选配项
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
                        type: 'float',
                    },
                    batchCodeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchCode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                    },//批号
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
                    originalGoodsId: {
                        type: 'string',
                    },  //原始版本商品
                    goodsSelectionDescription: {
                        type: 'string',
                    },//商品选项描述
                },
                pageSize: 10
            },
            BomItemIn: {
                meta: {
                    transferOutBillId: {
                        type: "string",

                    }, //主表ID
                    rowNum: {
                        type: "integer",
                        required: true,

                    }, //行号
                    goodsId: {
                        type: "string",
                        required: true,

                    }, //库存商品id
                    goodsCode: {
                        type: "string",
                        required: true,

                    },
                    goodsName: {
                        type: "string",
                        required: true,

                    },
                    goodsFullName: {
                        type: "string",

                    },
                    goodsBasicUnitName: {
                        type: "string",

                    },
                    goodsAssistUnitName: {
                        type: "string",

                    },
                    goodsConversionRate: {
                        type: "string",

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
                    unitId: {
                        type: 'string'
                    },
                    unitCode: {
                        type: 'string'
                    },
                    unitName: {
                        type: 'string'
                    },
                    shouldInNum: {
                        type: "string",
                        required: true
                    }, //应入数量
                    factInNum: {
                        type: "string"
                    }, //实入数量
                    unitPrice: {
                        type: "string"
                    }, //单价
                    amountMoney: {
                        type: "string"
                    }, //金额
                    batchNum: {
                        type: "string",

                    }, //批次号
                    goodsPositionId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goodsposition),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                    }, //货位
                    goodsPositionCode: {
                        type: "string",

                    },
                    goodsPositionName: {
                        type: "string",

                    },
                    stockInPersonId: {
                        type: "string",
                        required: true,

                    }, //入库人
                    stockInPersonCode: {
                        type: "string",

                    },
                    stockInPersonName: {
                        type: "string",

                    },
                    stockInDate: {
                        type: "date"
                    }, //入库日期
                    sourceId: {
                        type: "string",

                    }, //源头单据号
                    sourceLineNum: {
                        type: "string",

                    }, //源头单据行号
                    sourceType: {
                        type: "string",

                    }, //源头单据类型
                    remark: {
                        type: "string",
                        maxLength: "200"
                    }, //备注
                    //------- 630后 新加bom包件字段 -------
                    goodsVersion: {
                        type: 'string',
                        required: true
                    },  //商品版本号
                    goodsSelection: {
                        type: 'string',
                        required: true
                    },  //商品选配项
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
                        type: 'float',
                    },
                    batchCodeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchCode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                    },//批号
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
                    originalGoodsId: {
                        type: 'string',
                    },  //原始版本商品
                    goodsSelectionDescription: {
                        type: 'string',
                    },//商品选项描述
                },
                pageSize: 10
            },
            referB2cReqOrder:{
                meta: {
                    // id: {type: 'string'}, //主键
                    reqOrderItemList:{
                        type:"child",
                        meta:B2cReqorderItemsmeta.meta
                    },
                    reqOrderItemBomList:{
                        type:"child",
                        meta:B2cReqBomItemsmeta.meta
                    },
                    code: {type: 'string', required: true}, //订单编码
                    // externalSystemCode: {type: 'string'}, //外系统单号
                    // expectedArrivalDate: {type: 'string'}, //订单日期
                    // remark: {type: 'string'}, //备注
                    operation:{type: 'string'}
                },
                pageSize: 10
            },
            reqOrderItemList:B2cReqorderItemsmeta,
            referB2cReqorderSearch:{
                meta: {
                    reqOrderCode:{type:"string"}//要货单编码
                },
                pageSize: 10
            }
        },
        // 搜索form
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "调拨单号"
            },
            {
                type: "daterange",
                key: "billDate",
                label: "单据日期"
            },
            {
                type: "refer",
                key: "pkOrg",
                label: "出库库存组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "03"
                }
            },
            {
                type: "refer",
                key: "pkOrgIn",
                label: "入库库存组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "03"
                }
            },
            {
                type: "refer",
                key: "outStorage",
                label: "出库仓库",
                refinfo: "warehouse",
                domid: "outStorage"
            },
            {
                type: "refer",
                key: "inStorage",
                label: "入库仓库",
                refinfo: "warehouse",
                domid: "inStorage"
            },
            {
                type: "refer",
                key: "outBizPerson",
                label: "出库业务员",
                refinfo: "person"
            },
            {
                type: "refer",
                key: "outDept",
                label: "出库部门",
                refinfo: "department"
            },
            {
                type: "refer",
                key: "inBizPerson",
                label: "入库业务员",
                refinfo: "person"
            },
            {
                type: "refer",
                key: "inDept",
                label: "入库部门",
                refinfo: "department"
            },
            {
                type: "refer",
                key: "transferBillItems--goods",
                label: "库存商品",
                refinfo: "goods"
            },
            {
                type: "combo",
                key: "transferStatus",
                label: "调拨状态",
                url: window.pathMap.base +
                    "/cust-doc-defs/cust_doc_code?cust_doc_code=QY111",
                namefield: "name",
                valuefield: "code",
                hasAll: true
            },
            {
                type: "combo",
                key: "state",
                label: "审批状态",
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
                },
                ],
                hasAll: true,
            },
            ],
            search2: [
                {
                    type: "string",
                    key: "code",
                    label: "要货单编码"
                }

            ]
        },
        // 按钮
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "showAddBillPanel"
            },
                {
                    key: "addB2CReq",
                    label: "新增参照门店要货单",
                    iconCls: "icon-plus",
                    click: "showAddReferB2CReq"
                },
                {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
            },
            {
                key: "submit",
                label: "提交",
                iconCls: "icon-submit",
                click: "submit"
            },
            {
                key: "back",
                label: "收回",
                iconCls: "icon-back",
                click: "back"
            },
            {
                key: "approve",
                label: "审批通过",
                iconCls: "icon-tubiao-shenhe",
                click: "approve"
            },
            // {
            //     key: "disapprove",
            //     label: "审批不通过",
            //     iconCls: "icon-tubiao-shenhe",
            //     click: "disapprove"
            // },
            {
                key: "cancelApprove",
                label: "取消审批",
                iconCls: "icon-tubiao-quxiaoshenhe",
                click: "cancelapprove"
            },
            /* {
      key: "transferOut",
      label: "转出",
      iconCls: "icon-tubiao-xiaosanjiao-shang",
      click: "showTransferOut"
    },
    {
      key: "transferIn",
      label: "转入",
      iconCls: "icon-tubiao-xiaosanjiao-xia",
      click: "showTransferIn"
    },
    {
      key: "oneKeyTrans",
      label: "一键调拨",
      iconCls: "icon-tubiao-zhuanhua",
      click: "approve"
    },*/
            {
                key: "close",
                label: "关闭",
                iconCls: "icon-tubiao-guanbi-xiao",
                click: "close"
            },
            {
                key: "open",
                label: "打开",
                iconCls: "icon-tubiao-shengji",
                click: "open"
            }
            ],
            button2: [{
                key: "cancel",
                label: "取消",
                click: "retListPanel"
            },
            {
                key: "save",
                label: "保存",
                click: "saveBill",
                cls: "ui-btn-green"
            }
            ],
            button3: [{
                key: "addrow",
                label: "增行",
                iconCls: "icon-plus",
                click: "showAddItemsRef"
            },
            {
                key: "delrow",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delItems"
            }
            ],
            button4: [{
                key: "return",
                label: "返回",
                click: "retListPanel"
            },
            {
                key: "edit",
                label: "编辑",
                click: "detail2bill",
                cls: "ui-btn-green",
                visible: "canEdit"
            }
            ],
            button5: [{
                key: "cancel",
                label: "取消",
                click: "retListPanel"
            },
            {
                key: "save",
                label: "保存",
                click: "saveOutBill",
                cls: "ui-btn-green"
            }
            ],
            button6: [
                //入库
                {
                    key: "cancel",
                    label: "取消",
                    click: "retListPanel"
                },
                {
                    key: "save",
                    label: "保存",
                    click: "saveInBill",
                    cls: "ui-btn-green"
                }
            ]
        },
        // 弹出框
        dialogs: {
            dialog1: [{
                type: "textarea",
                key: "reason",
                label: "原因",
                cls: "ui-textarea-item"
            }]
        },
        // 新增/编辑 表头
        cards: {
            card1: [{
                type: "textreadonly",
                key: "code",
                label: "单据编码"
            },
            {
                type: "date",
                key: "billDate",
                label: "单据日期"
            },
            {
                type: "refer",
                key: "pkOrgId",
                label: "调出库存组织"
            },
            {
                type: "refer",
                key: "pkOrgInId",
                label: "调入库存组织"
            },
            // {
            //     type: "refer",
            //     key: "outStorageId",
            //     referId: "outStorageId",
            //     label: "出库仓库"
            // },
            // {
            //     type: "refer",
            //     key: "inStorageId",
            //     referId: "inStorageId",
            //     label: "入库仓库"
            // },
            {
                type: "refer",
                key: "outBizPersonId",
                label: "出库业务员"
            },
            {
                type: "refer",
                key: "outDeptId",
                label: "出库部门"
            },
            {
                type: "refer",
                key: "inBizPersonId",
                label: "入库业务员"
            },
            {
                type: "refer",
                key: "inDeptId",
                label: "入库部门"
            },
            {
                type: "textreadonly",
                key: "transferStatusName",
                label: "调拨状态"
            },
            {
                type: "label",
                key: "state",
                label: "审批状态",
                defaultvalue: "0",
                datasource: [{ name: "待处理", value: 0 },
                { name: "已提交", value: 1 },
                { name: "审批中", value: 2 },
                { name: "审批通过", value: 3 },
                { name: "审批不通过", value: 4 }]
            },
            {
                type: "date",
                key: "planSendDate",
                label: "计划发货日期"
            },
            {
                type: "date",
                key: "planArriveDate",
                label: "计划到货日期"
            },
            {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }
            ],
            card2: [{
                type: "textreadonly",
                key: "code",
                label: "出库单号"
            },
            {
                type: "date",
                key: "billDate",
                label: "单据日期"
            },
            {
                type: "refer",
                key: "stockOrgId",
                label: "库存组织"
            },
            {
                type: "refer",
                key: "storageId",
                label: "出库仓库",
                referId: "outCardStorageId",
            },
            {
                type: "refer",
                key: "bizPersonId",
                label: "业务员"
            },
            {
                type: "refer",
                key: "deparmentId",
                label: "部门"
            },
            {
                type: "refer",
                key: "storekeeperId",
                label: "库管员"
            },
            {
                type: "textreadonly",
                key: "billStatusName",
                label: "单据状态"
            },

            {
                type: "textreadonly",
                key: "planSendDate",
                label: "计划发货日期"
            },
            {
                type: "textreadonly",
                key: "planArriveDate",
                label: "要求到货日期"
            },
            {
                type: "textreadonly",
                key: "totalOutNum",
                label: "实出总数量"
            },
            {
                type: "textreadonly",
                key: "logisticsName",
                label: "物流公司"
            },
            {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }
            ],
            card3: [{
                type: "textreadonly",
                key: "code",
                label: "入库单号"
            },
            {
                type: "date",
                key: "billDate",
                label: "单据日期"
            },
            {
                type: "refer",
                key: "stockOrgId",
                label: "库存组织"
            },
            {
                type: "refer",
                key: "storageId",
                label: "入库仓库",
                referId: "inCardStorageId",
            },
            {
                type: "refer",
                key: "bizPersonId",
                label: "业务员"
            },
            {
                type: "refer",
                key: "deparmentId",
                label: "部门"
            },
            {
                type: "refer",
                key: "storekeeperId",
                label: "库管员"
            },
            {
                type: "textreadonly",
                key: "billStatusName",
                label: "单据状态"
            },
            {
                type: "textreadonly",
                key: "totalInNum",
                label: "实入总数量"
            },
            {
                type: "textreadonly",
                key: "logisticsName",
                label: "物流公司"
            },
            {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }
            ]
        },
        // 表格 （包括列表，子表）
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    id: "grid_complex",
                    data: "transferList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "单据编码",
                    renderType: "detailRender"
                },
                {
                    field: "billDate",
                    dataType: "Date",
                    title: "单据日期"
                },
                {
                    field: "pkOrgCode",
                    dataType: "String",
                    title: "调出库存组织编码",
                    visible: false
                },
                {
                    field: "pkOrgName",
                    dataType: "String",
                    title: "调出库存组织"
                },
                {
                    field: "pkOrgInCode",
                    dataType: "String",
                    title: "调入库存组织编码",
                    visible: false
                },
                {
                    field: "pkOrgInName",
                    dataType: "String",
                    title: "调入库存组织"
                },
                // {
                //     field: "outStorageCode",
                //     dataType: "String",
                //     title: "出库仓库编码",
                //     visible: false
                // },
                // {
                //     field: "outStorageName",
                //     dataType: "String",
                //     title: "出库仓库"
                // },
                // {
                //     field: "inStorageCode",
                //     dataType: "String",
                //     title: "入库仓库编码",
                //     visible: false
                // },
                // {
                //     field: "inStorageName",
                //     dataType: "String",
                //     title: "入库仓库"
                // },
                {
                    field: "outBizPersonCode",
                    dataType: "String",
                    title: "出库业务员编码",
                    visible: false
                },
                {
                    field: "outBizPersonName",
                    dataType: "String",
                    title: "出库业务员"
                },
                {
                    field: "outDeptCode",
                    dataType: "String",
                    title: "出库部门编码",
                    visible: false
                },
                {
                    field: "outDeptName",
                    dataType: "String",
                    title: "出库部门"
                },
                {
                    field: "inBizPersonCode",
                    dataType: "String",
                    title: "入库业务员编码",
                    visible: false
                },
                {
                    field: "inBizPersonName",
                    dataType: "String",
                    title: "入库业务员"
                },
                {
                    field: "inDeptCode",
                    dataType: "String",
                    title: "入库部门编码",
                    visible: false
                },
                {
                    field: "inDeptName",
                    dataType: "String",
                    title: "入库部门"
                },
                {
                    field: "transferStatusName",
                    dataType: "String",
                    title: "调拨状态"
                },

                {
                    "field": "state",
                    "dataType": "String",
                    "title": "审批状态",
                    "renderType": "approveStateRender"
                },

                {
                    field: "planSendDate",
                    dataType: "Date",
                    title: "计划发货日期",
                    visible: false
                },
                {
                    field: "planArriveDate",
                    dataType: "Date",
                    title: "计划到货日期",
                    visible: false
                },
                {
                    field: "currencyCode",
                    dataType: "String",
                    title: "币种编码",
                    visible: false
                },
                {
                    field: "currencyName",
                    dataType: "String",
                    title: "币种",
                    visible: false
                },
                {
                    field: "totalOutNum",
                    dataType: "Float",
                    title: "实出总数量",
                    visible: false
                },
                {
                    field: "totalInNum",
                    dataType: "Float",
                    title: "实入总数量",
                    visible: false
                },
                {
                    field: "transferStatusCode",
                    dataType: "String",
                    title: "调拨状态编码",
                    visible: false
                },
                {
                    field: "transferStatusName",
                    dataType: "String",
                    title: "调拨状态",
                    visible: false
                },
                {
                    field: "stockBillBelong",
                    dataType: "String",
                    title: "库存单据归属",
                    visible: false
                },
                {
                    field: "customerCode",
                    dataType: "String",
                    title: "所属客户编码",
                    visible: false
                },
                {
                    field: "customerName",
                    dataType: "String",
                    title: "所属客户",
                    visible: false
                },
                {
                    field: "isClose",
                    dataType: "Integer",
                    title: "是否关闭",
                    renderType: "whetherRender"
                },
                {
                    field: "closer",
                    dataType: "String",
                    title: "关闭人",
                    visible: false
                },
                {
                    field: "closeDate",
                    dataType: "Datetime",
                    title: "关闭时间",
                    visible: false
                },
                {
                    field: "closeReason",
                    dataType: "String",
                    title: "关闭原因",
                    visible: false
                },
                {
                    field: "approver",
                    dataType: "String",
                    title: "审核人",
                    visible: false
                },
                {
                    field: "approveTime",
                    dataType: "Datetime",
                    title: "审核时间",
                    visible: false
                },
                {
                    field: "approveOpinion",
                    dataType: "String",
                    title: "审核批语",
                    visible: false
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
                {
                    field: "creator",
                    dataType: "String",
                    title: "创建人",
                    visible: false
                },
                {
                    field: "creationTime",
                    dataType: "Date",
                    title: "创建时间",
                    visible: false
                },
                {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人",
                    visible: false
                },
                {
                    field: "modifiedTime",
                    dataType: "Date",
                    title: "修改时间",
                    visible: false
                },
                {
                    field: "transferStatusCode",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation",
                    fixed: true,
                    width: "100px"
                },
                {
                    field: "isReturned",
                    dataType: "String",
                    title: "是否退回",
                    renderType: "whetherRender",
                    visible: false
                },
                {
                    field: "isDistribution",
                    dataType: "String",
                    title: "是否铺货",
                    renderType: "whetherRender",
                    visible: false
                }
                ]
            },

            //商品信息
            gridGoodsEdit: {
                domid: "grid_transferItems_edit",
                umeta: {
                    id: "grid_transferItems_edit",
                    data: "transferItems",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: false,
                    onBeforeEditFun: "beforeEditCheck"
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号",
                    editable: false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码",
                    editable: false,
                    required: true
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false,
                    required: true
                },
                // {
                //   field: "goodsFullName",
                //   dataType: "String",
                //   title: "商品全称",
                //   editable: false
                // },
                {
                    field: "outStorageId",
                    dataType: "string",
                    title: "调出仓库",
                    required: true,
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "outStorageName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            ifSlotManage: "ifSlotManage"
                        }
                    }
                },
                {
                    field: "inStorageId",
                    dataType: "string",
                    title: "调入仓库",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "inStorageName",
                    editOptions: {
                        "validType": "string"
                    }
                },
                {
                    field: "outPositionId",
                    dataType: "string",
                    title: "调出货位",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "outPositionName",
                    editOptions: {
                        "validType": "string"
                    }
                },
                {
                    field: "transferNum",
                    dataType: "Float",
                    title: "应调数量",
                    required: true
                },
                {
                    field: "unitPrice",
                    dataType: "Float",
                    title: "单价"
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位",
                    editable: false
                },
                {
                    field: "amountMoney",
                    dataType: "Float",
                    title: "金额",
                    editable: false
                },
                {
                    field: "goodsSelection",
                    dataType: "String",
                    title: "商品选配ID",
                    renderType: "goodsOpt",
                    editable: false,
                    visible: false,
                },
                {
                    field: "goodsSelectionDescription",
                    dataType: "String",
                    title: "商品选项描述",
                    renderType: "goodsOpt",
                    editable: false,
                },
                {
                    "field": "batchNumId",
                    "dataType": "String",
                    "title": "批次号",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "batchNumName",
                    "editOptions": {
                        "validType": "string"
                    }
                },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
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
                },
                {
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
                },
                {
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
                },
                {
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
                },
                {
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
                },
                // {
                //   "field": "goodsPositionId",
                //   "dataType": "String",
                //   "title": "货位",
                //   "renderType": "ncReferRender",
                //   "editType": "ncReferEditType",
                //   "showField": "goodsPositionName",
                //   "editOptions": {
                //     "validType": "string"
                //   }
                // },
                {
                    field: "remark",
                    dataType: "String",
                    title: "行备注"
                },
                {
                    field: "receiverAddress",
                    dataType: "String",
                    title: "收货地址 ",
                    editable: true
                },
                {
                    field: "receiver",
                    dataType: "String",
                    title: "收货联系人",
                    editable: true
                },
                {
                    field: "receiverPhone",
                    dataType: "String",
                    title: "收货人电话",
                    editable: true,
                    width: "200px"
                },
                {
                    field: "receiverPhoneSpare",
                    dataType: "String",
                    title: "收货人电话(备用)",
                    editable: true,
                    width: "200px"
                }
                ]
            },
            gridGoodsDetail: {
                domid: "grid_transferItems_detail",
                umeta: {
                    id: "grid_transferItems_detail",
                    data: "transferItems",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: false
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号"
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码"
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称"
                },
                {
                    field: "goodsFullName",
                    dataType: "String",
                    title: "商品全称",
                    visible: false
                },
                {
                    field: "outStorageName",
                    dataType: "String",
                    title: "调出仓库"
                },
                {
                    field: "inStorageName",
                    dataType: "String",
                    title: "调入仓库"
                },
                {
                    field: "outPositionName",
                    dataType: "String",
                    title: "调出货位"
                },
                {
                    field: "transferNum",
                    dataType: "Float",
                    title: "应调数量"
                },
                {
                    field: "totalOutNum",
                    dataType: "Float",
                    title: "累计出库数量"
                },
                {
                    field: "totalInNum",
                    dataType: "Float",
                    title: "累计入库数量"
                },
                {
                    field: "unitPrice",
                    dataType: "Float",
                    title: "单价"
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位"
                },
                {
                    field: "amountMoney",
                    dataType: "Float",
                    title: "金额"
                },
                {
                    field: "goodsSelection",
                    dataType: "String",
                    title: "商品选配",
                    renderType: "goodsOptDetails",
                    editable: false,
                },
                {
                    field: "batchNumName",
                    dataType: "String",
                    title: "批次号"
                },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    "field": "batchCodeName",
                    "dataType": "String",
                    "title": "批号",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "supplierName",
                    "dataType": "String",
                    "title": "供应商",
                    "visible": false,
                    "editable": false,
                },
                {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "stockStateName",
                    "dataType": "String",
                    "title": "库存状态",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "客户",
                    "editable": false,
                    "visible": false,
                },
                {
                    field: "receiverAddress",
                    dataType: "String",
                    title: "收货地址 "
                },
                {
                    field: "receiver",
                    dataType: "String",
                    title: "收货联系人"
                },
                {
                    field: "receiverPhone",
                    dataType: "String",
                    title: "收货人电话",
                    width: "200px"
                },
                {
                    field: "receiverPhoneSpare",
                    dataType: "String",
                    title: "收货人电话(备用)"
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "行备注"
                }
                ]
            },
            //bom结构信息
            gridBomEdit: {
                domid: "grid_BomItems_edit",
                umeta: {
                    id: "grid_BomItems_edit",
                    data: "BomItems",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: false,
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号",
                    editable: false
                },
                {
                    field: "parentRowNum",
                    title: "所属商品行号",
                    dataType: "Integer",
                    editable: false
                },
                {
                    "field": "parentGoodsName",
                    "dataType": "String",
                    "title": "母件商品名称",
                    "editable": false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码",
                    editable: false,
                    required: true
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false,
                    required: true
                },
                // {
                //   field: "goodsFullName",
                //   dataType: "String",
                //   title: "商品全称",
                //   editable: false
                // },
                {
                    field: "outStorageId",
                    dataType: "string",
                    title: "出库仓库",
                    required: true,
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "outStorageName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            ifSlotManage: "ifSlotManage"
                        }
                    }
                },
                {
                    field: "inStorageId",
                    dataType: "string",
                    title: "入库仓库",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "inStorageName",
                    editOptions: {
                        "validType": "string"
                    }
                },
                {
                    field: "outPositionId",
                    dataType: "string",
                    title: "调出货位",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "outPositionName",
                    editOptions: {
                        "validType": "string"
                    }
                },
                {
                    field: "transferNum",
                    dataType: "Float",
                    title: "应转数量",
                    "editable": false,
                    required: true
                },
                {
                    field: "unitPrice",
                    dataType: "Float",
                    title: "单价"
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位",
                    editable: false
                },
                {
                    field: "amountMoney",
                    dataType: "Float",
                    title: "金额",
                    editable: false
                },
                {
                    "field": "batchNumId",
                    "dataType": "String",
                    "title": "批次号",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "batchNumName",
                    "editable": false,
                    "editOptions": {
                        "validType": "string"
                    }
                },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
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
                },
                {
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
                },
                {
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
                },
                {
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
                },
                {
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
                },
                // {
                //   "field": "goodsPositionId",
                //   "dataType": "String",
                //   "title": "货位",
                //   "renderType": "ncReferRender",
                //   "editType": "ncReferEditType",
                //   "showField": "goodsPositionName",
                //   "editOptions": {
                //     "validType": "string"
                //   }
                // },
                {
                    field: "remark",
                    dataType: "String",
                    title: "行备注",
                    "editable": false,
                },
                    /*{
            field: "receiverAddress",
            dataType: "String",
            title: "收货地址 ",
            editable: true
          },
          {
            field: "receiver",
            dataType: "String",
            title: "收货联系人",
            editable: true
          },
          {
            field: "receiverPhone",
            dataType: "String",
            title: "收货人电话",
            editable: true
          },
          {
            field: "receiverPhoneSpare",
            dataType: "String",
            title: "收货人电话(备用)",
            editable: true
          }*/
                ]
            },
            gridBomDetail: {
                domid: "grid_BomItems_detail",
                umeta: {
                    id: "grid_BomItems_details",
                    data: "BomItems",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: false
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号"
                },
                {
                    field: "parentRowNum",
                    title: "所属商品行号",
                    dataType: "Integer",
                    editable: false
                },
                {
                    "field": "parentGoodsName",
                    "dataType": "String",
                    "title": "母件商品名称",
                    "editable": false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码"
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称"
                },
                {
                    field: "goodsFullName",
                    dataType: "String",
                    title: "商品全称",
                    visible: false
                },
                {
                    field: "outStorageName",
                    dataType: "String",
                    title: "出库仓库"
                },
                {
                    field: "inStorageName",
                    dataType: "String",
                    title: "入库仓库"
                },
                {
                    field: "outPositionName",
                    dataType: "String",
                    title: "调出货位"
                },
                {
                    field: "transferNum",
                    dataType: "Float",
                    title: "应转数量"
                },
                {
                    field: "totalOutNum",
                    dataType: "Float",
                    title: "累计出库数量"
                },
                {
                    field: "totalInNum",
                    dataType: "Float",
                    title: "累计入库数量"
                },
                {
                    field: "unitPrice",
                    dataType: "Float",
                    title: "单价"
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位"
                },
                {
                    field: "amountMoney",
                    dataType: "Float",
                    title: "金额"
                },
                {
                    field: "batchNumName",
                    dataType: "String",
                    title: "批次号"
                },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    "field": "batchCodeName",
                    "dataType": "String",
                    "title": "批号",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "supplierName",
                    "dataType": "String",
                    "title": "供应商",
                    "visible": false,
                    "editable": false,
                },
                {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "stockStateName",
                    "dataType": "String",
                    "title": "库存状态",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "客户",
                    "editable": false,
                    "visible": false,
                },
                /*{
        field: "receiverAddress",
        dataType: "String",
        title: "收货地址 "
      },
      {
        field: "receiver",
        dataType: "String",
        title: "收货联系人"
      },
      {
        field: "receiverPhone",
        dataType: "String",
        title: "收货人电话"
      },
      {
        field: "receiverPhoneSpare",
        dataType: "String",
        title: "收货人电话(备用)"
      },*/
                {
                    field: "remark",
                    dataType: "String",
                    title: "行备注"
                }
                ]
            },

            gridOutGoods: {
                domid: "transferOutBill1",
                umeta: {
                    id: "grid_transferOutBill1",
                    data: "transferOutItems",
                    type: "grid",
                    editable: true,
                    multiSelect: false,
                    showNumCol: false,
                    "onBeforeEditFun": "beforeEditGoodsposiCheck"
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号",
                    editable: false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "库存商品编码",
                    editable: false
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false
                },
                {
                    field: "shouldOutNum",
                    dataType: "String",
                    title: "应出数量",
                    editable: false
                },
                {
                    field: "factOutNum",
                    dataType: "String",
                    title: "实出数量 ",
                    required: true
                },
                {
                    field: "unitName", //暂定如何展示
                    dataType: "String",
                    title: "单位 ",
                    editable: false
                },
                {
                    field: "unitPrice",
                    dataType: "String",
                    title: "单价",
                    editable: false
                },
                {
                    field: "amountMoney",
                    dataType: "String",
                    title: "金额 ",
                    editable: false
                },
                {
                    field: "batchNumName",
                    dataType: "String",
                    title: "批次号",
                    editable: false
                },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    "field": "batchCodeName",
                    "dataType": "String",
                    "title": "批号",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "supplierName",
                    "dataType": "String",
                    "title": "供应商",
                    "visible": false,
                    "editable": false,
                },
                {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "stockStateName",
                    "dataType": "String",
                    "title": "库存状态",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "客户",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "goodsPositionId",
                    "dataType": "String",
                    "title": "货位",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "goodsPositionName",
                    "editOptions": {
                        "validType": "string"
                    }
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
                /*{
        field: "receiverAddress",
        dataType: "String",
        title: "收货地址 ",
        editable: true
      },
      {
        field: "receiver",
        dataType: "String",
        title: "收货联系人",
        editable: true
      },
      {
        field: "receiverPhone",
        dataType: "String",
        title: "收货人电话",
        editable: true
      },
      {
        field: "receiverPhoneSpare",
        dataType: "String",
        title: "收货人电话(备用)",
        editable: true
      },*/
                {
                    field: "stockOutPersonName",
                    dataType: "String",
                    title: "出库人",
                    editable: false
                },
                {
                    field: "stockOutDate",
                    dataType: "String",
                    title: "出库日期",
                    editable: false
                },
                {
                    field: "provinceName",
                    dataType: "String",
                    title: "省 ",
                    visible: false,
                    editable: false
                },
                {
                    field: "cityName",
                    dataType: "String",
                    title: "市 ",
                    visible: false,
                    editable: false
                },
                {
                    field: "countyName",
                    dataType: "String",
                    title: "区/县 ",
                    visible: false,
                    editable: false
                },
                {
                    field: "townName",
                    dataType: "String",
                    title: "街道/乡/镇 ",
                    visible: false,
                    editable: false
                },
                {
                    field: "detailAddr",
                    dataType: "String",
                    title: "详细地址 ",
                    visible: false,
                    editable: false
                }
                ]
            },
            gridOutBom: {
                domid: "transferBomOutBill",
                umeta: {
                    id: "grid_transferOutBomBill1",
                    data: "BomItemsOut",
                    type: "grid",
                    editable: true,
                    multiSelect: false,
                    showNumCol: false,
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号",
                    editable: false
                },
                {
                    "field": "parentGoodsName",
                    "dataType": "String",
                    "title": "母件商品名称",
                    "editable": false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "库存商品编码",
                    editable: false
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false
                },
                {
                    field: "shouldOutNum",
                    dataType: "String",
                    title: "应出数量",
                    editable: false
                },
                {
                    field: "factOutNum",
                    dataType: "String",
                    title: "实出数量 ",
                    required: true
                },
                {
                    field: "unitName", //暂定如何展示
                    dataType: "String",
                    title: "单位 ",
                    editable: false
                },
                {
                    field: "unitPrice",
                    dataType: "String",
                    title: "单价",
                    editable: false
                },
                {
                    field: "amountMoney",
                    dataType: "String",
                    title: "金额 ",
                    editable: false
                },
                {
                    field: "batchNumName",
                    dataType: "String",
                    title: "批次号",
                    editable: false
                },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    "field": "batchCodeName",
                    "dataType": "String",
                    "title": "批号",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "supplierName",
                    "dataType": "String",
                    "title": "供应商",
                    "visible": false,
                    "editable": false,
                },
                {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "stockStateName",
                    "dataType": "String",
                    "title": "库存状态",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "客户",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "goodsPositionId",
                    "dataType": "String",
                    "title": "货位",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "goodsPositionName",
                    "editOptions": {
                        "validType": "string"
                    }
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
                {
                    field: "receiverAddress",
                    dataType: "String",
                    title: "收货地址 ",
                    editable: true
                },
                {
                    field: "receiver",
                    dataType: "String",
                    title: "收货联系人",
                    editable: true
                },
                {
                    field: "receiverPhone",
                    dataType: "String",
                    title: "收货人电话",
                    editable: true
                },
                {
                    field: "receiverPhoneSpare",
                    dataType: "String",
                    title: "收货人电话(备用)",
                    editable: true
                },
                {
                    field: "stockOutPersonName",
                    dataType: "String",
                    title: "出库人",
                    editable: false
                },
                {
                    field: "stockOutDate",
                    dataType: "String",
                    title: "出库日期",
                    editable: false
                },
                {
                    field: "provinceName",
                    dataType: "String",
                    title: "省 ",
                    visible: false,
                    editable: false
                },
                {
                    field: "cityName",
                    dataType: "String",
                    title: "市 ",
                    visible: false,
                    editable: false
                },
                {
                    field: "countyName",
                    dataType: "String",
                    title: "区/县 ",
                    visible: false,
                    editable: false
                },
                {
                    field: "townName",
                    dataType: "String",
                    title: "街道/乡/镇 ",
                    visible: false,
                    editable: false
                },
                {
                    field: "detailAddr",
                    dataType: "String",
                    title: "详细地址 ",
                    visible: false,
                    editable: false
                }
                ]
            },

            gridInGoods: {
                domid: "transferInBill1",
                umeta: {
                    id: "grid_transferInBill1",
                    data: "transferInItems",
                    type: "grid",
                    editable: true,
                    multiSelect: false,
                    showNumCol: false,
                    "onBeforeEditFun": "beforeEditGoodsposiCheck"
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号",
                    editable: false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "库存商品编码",
                    editable: false
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false
                },
                {
                    field: "shouldInNum",
                    dataType: "String",
                    title: "应入数量",
                    editable: false
                },
                {
                    field: "factInNum",
                    dataType: "String",
                    title: "实入数量 ",
                    required: true
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位 ",
                    editable: false
                },
                {
                    field: "unitPrice",
                    dataType: "String",
                    title: "单价",
                    editable: false
                },
                {
                    field: "amountMoney",
                    dataType: "String",
                    title: "金额 ",
                    editable: false
                },
                {
                    field: "batchNumName",
                    dataType: "String",
                    title: "批次号",
                    editable: false
                },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    "field": "batchCodeName",
                    "dataType": "String",
                    "title": "批号",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "supplierName",
                    "dataType": "String",
                    "title": "供应商",
                    "visible": false,
                    "editable": false,
                },
                {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "stockStateName",
                    "dataType": "String",
                    "title": "库存状态",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "客户",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "goodsPositionId",
                    "dataType": "String",
                    "title": "货位",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "goodsPositionName",
                    "editOptions": {
                        "validType": "string"
                    }
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
                {
                    field: "stockInPersonName",
                    dataType: "String",
                    title: "入库人",
                    editable: false
                },
                {
                    field: "stockInDate",
                    dataType: "String",
                    title: "入库日期",
                    editable: false
                }
                ]
            },
            gridInBom: {
                domid: "transferBomInBill1",
                umeta: {
                    id: "grid_transferBomInBill1",
                    data: "BomItemsIn",
                    type: "grid",
                    editable: true,
                    multiSelect: false,
                    showNumCol: false,
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号",
                    editable: false
                },
                {
                    "field": "parentGoodsName",
                    "dataType": "String",
                    "title": "母件商品名称",
                    "editable": false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "库存商品编码",
                    editable: false
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false
                },
                {
                    field: "shouldInNum",
                    dataType: "String",
                    title: "应入数量",
                    editable: false
                },
                {
                    field: "factInNum",
                    dataType: "String",
                    title: "实入数量 ",
                    required: true
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位 ",
                    editable: false
                },
                {
                    field: "unitPrice",
                    dataType: "String",
                    title: "单价",
                    editable: false
                },
                {
                    field: "amountMoney",
                    dataType: "String",
                    title: "金额 ",
                    editable: false
                },
                {
                    field: "batchNumName",
                    dataType: "String",
                    title: "批次号",
                    editable: false
                },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    "field": "batchCodeName",
                    "dataType": "String",
                    "title": "批号",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "supplierName",
                    "dataType": "String",
                    "title": "供应商",
                    "visible": false,
                    "editable": false,
                },
                {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "stockStateName",
                    "dataType": "String",
                    "title": "库存状态",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "客户",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "goodsPositionId",
                    "dataType": "String",
                    "title": "货位",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "goodsPositionName",
                    "editOptions": {
                        "validType": "string"
                    }
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
                {
                    field: "stockInPersonName",
                    dataType: "String",
                    title: "入库人",
                    editable: false
                },
                {
                    field: "stockInDate",
                    dataType: "String",
                    title: "入库日期",
                    editable: false
                }
                ]
            },
            grid4: {
                domid: "grid_b2creqorder4",
                umeta: {
                    "id": "grid_referList",
                    "data": "referB2cReqorderList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "onRowSelected" : "referSelectHandle",
                    "onRowUnSelected": "referUnSelectHandle",
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "订单号",
                    },
                    // {
                    //     "field": "orderDate",
                    //     "dataType": "Date",
                    //     "title": "订单日期",
                    // },
                    // {
                    //     "field": "remark",
                    //     "dataType": "string",
                    //     "title": "备注",
                    // }

                ]
            },
            grid5: {
                domid: "grid_b2creqorder5",
                umeta: {
                    "id": "grid_referListItem",
                    "data": "referB2cReqorderitemList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "onRowSelected" : "referSelectItemHandle",
                    "onRowUnSelected": "referUnSelectItemHandle",
                },
                columns: [
                    {
                        "field": "rowNum",
                        "dataType": "String",
                        "title": "行号",
                        "width": "60px"
                    },
                    {
                        "field": "goodsCode",
                        "dataType": "String",
                        "title": "商品编号",
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称",
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "String",
                        "title": "单价",
                        "width": "60px"
                    },
                    {
                        "field": "isGift",
                        "dataType": "checkbox",
                        "title": "赠品",
                        "renderType":"disableBooleanRender",//todo
                        "editable": false,
                        "width": "60px"
                    },
                    {
                        "field": "stockInNum",
                        "dataType": "String",
                        "title": "累计入库数量"
                    },
                    {
                        "field": "stockOutNum",
                        "dataType": "String",
                        "title": "累计出库数量",
                        "width":"170px"
                    }
                ]
            },
            grid6: {
                domid: "grid_b2creqorder6",
                umeta: {
                    "id": "grid_referList_Sel",
                    "data": "selectedreferList",
                    "type": "grid",
                    "showNumCol": true,
                    "editable": false,
                },
                columns: [
                    {
                        "field": "orderCode",
                        "dataType": "String",
                        "title": "订单号",
                    },
                    {
                        "field": "orderDate",
                        "dataType": "Date",
                        "title": "订单日期",
                    },
                    {
                        "field": "remark",
                        "dataType": "string",
                        "title": "备注",
                    }
                ]
            },
            grid7: {
                domid: "grid_purchaseorder7",
                umeta: {
                    "id": "grid_referListItem_Sel",
                    "data": "selectedreferListItem",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true,
                },
                columns: [
                    {
                        "field": "rowNum",
                        "dataType": "String",
                        "title": "行号",
                        "width": "60px"
                    },
                    {
                        "field": "goodsCode",
                        "dataType": "String",
                        "title": "商品编号",
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称",
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "String",
                        "title": "单价",
                        "width": "60px"
                    },
                    {
                        "field": "isGift",
                        "dataType": "checkbox",
                        "title": "赠品",
                        "renderType":"disableBooleanRender",
                        "editable": false,
                        "width": "60px"
                    },
                    {
                        "field": "stockInNum",
                        "dataType": "String",
                        "title": "累计入库数量"
                    },
                    {
                        "field": "stockOutNum",
                        "dataType": "String",
                        "title": "累计出库数量",
                        "width":"170px"
                    },
                    {
                        "field": "operation",
                        "dataType": "String",
                        "title": "操作",
                        "renderType": "rowRemove",
                        "fixed": true,
                        "width": "100px"
                    }
                ]
            }
        },
        // 详情页面 表头
        details: {
            detail: [{
                key: "code",
                label: "单据号"
            },
            {
                key: "billDate",
                label: "单据日期",
                computed: "billDateComputed"
            },
            {
                key: "pkOrgName",
                label: "调入库存组织"
            },
            {
                key: "pkOrgInName",
                label: "调出库存组织"
            },
            // {
            //     key: "outStorageName",
            //     label: "出库仓库"
            // },
            // {
            //     key: "inStorageName",
            //     label: "入库仓库"
            // },
            {
                key: "outBizPersonName",
                label: "出库业务员"
            },
            {
                key: "outDeptName",
                label: "出库部门"
            },
            {
                key: "inBizPersonName",
                label: "入库业务员"
            },
            {
                key: "inDeptName",
                label: "入库部门"
            },
            {
                key: "transferStatusName",
                label: "调拨状态"
            },
            {
                key: "state",
                label: "审批状态",
                computed: "state",
            },
            {
                key: "planSendDate",
                label: "计划发货日期"
            },
            {
                key: "planArriveDate",
                label: "计划到货日期"
            },
            {
                key: "totalOutNum",
                label: "实出总数量"
            },
            {
                key: "totalInNum",
                label: "实入总数量"
            },
            {
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }
            ]
        }
    };
    return new basemodel(model);
});