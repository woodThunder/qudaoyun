define(["ocm_basemodel"], function (basemodel) {
    var mainData = {
        meta: {
            orderCode: {
                type: 'string',
                required: true
            },
            takeType: {type: 'string', default: "1"},
            isEnable: {type: 'string', default: "01"},
            appointTackTime: {type: 'date'},
        },
        pageSize: 10,
    };
    var orderItemsmeta = {
        meta: {
            orderCode: {type: 'string', required: true}, //订单编码
            purchaseOrgId: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['organization_ocm']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                "refparam": '{"EQ_orgFuncRel":"04"}',
            }, //采购组织
            purchaseOrgName: {type: 'string', required: true},
            receiveStorageId: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['storeLocation']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                "refparam": '{}'
            }, //仓库
            goodsId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
            }, //商品

            goodsNum: {type: 'numberFloat', required: true}, //数量

            orderDate: {type: 'string', required: true}, //订单日期

            detailAddr: {type: 'string', required: true}, //收货地址

            orderTypeCode: {type: 'string', required: true}, //订单类型
            orderTypeName: {type: 'string', required: true}, //订单类型
            otherOrderNum: {type: 'string'}, //对方订单号
            supplierId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['suppliers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
            },
            supplierName: {type: 'string', required: true}, //供应商Name
            supplierCode: {type: 'string', required: true}, //供应商Code
            purchasePersonId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['person']),
                'refcfg': '{"ctx":"/uitemplate_web"}',
            }, //采购员
            operation: {type: 'string'},
            customerId: {
                type: 'string',
                required: true,
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
            rowNum: {
                type: 'string',
                required: true,
            },
            purchaseOrder: {
                type: 'string'
            },
            stockOrgId: {
                type: 'string',
                required: true,
                'refmodel': JSON.stringify(refinfo['organization_ocm']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
            },
            stockOrgCode: {type: 'string'},
            goodsName: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam': '{"EQ_isEnable":"1"}'
            }, //商品名称
            goodsCode: {
                type: 'string',
                required: true
            },
            goodsVersion: {
                type: 'string'
            },
            theTakeCounts: {
                type: 'numberFloat'
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
            unitPrice: {
                type: 'priceFloat'
            },
            amountMoney: {
                type: 'amountFloat'
            },
            isGift: {
                type: 'string'
            },
            stockOrgName: {
                type: 'string'
            },
            receiveStorageName: {
                type: 'string'
            },
            receiverAdress: {
                type: 'string'
            },
            receiver: {
                type: 'string'
            },
            receiverPhone: {
                type: 'string'
            },
            storageCounts: {
                type: 'string'
            },
            cargoOrders: {
                type: 'string'
            }
        },
        pageSize: 10
    };
    var BomItemsmeta = {
        meta: {
            orderCode: {type: 'string', required: true}, //订单编码
            goodsId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
            }, //商品
            goodsName: {type: 'string', required: true}, //商品名称
            goodsCode: {type: 'string', required: true}, //商品Code

            goodsNum: {type: 'numberFloat', required: true}, //数量

            orderDate: {type: 'string', required: true}, //订单日期

            detailAddr: {type: 'string', required: true}, //收货地址

            orderTypeCode: {type: 'string', required: true}, //订单类型
            orderTypeName: {type: 'string', required: true}, //订单类型
            otherOrderNum: {type: 'string'}, //对方订单号
            supplierId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['suppliers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
            },
            supplierName: {type: 'string', required: true}, //供应商Name
            supplierCode: {type: 'string', required: true}, //供应商Code
            purchasePersonId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['person']),
                'refcfg': '{"ctx":"/uitemplate_web"}',
            }, //采购员
            purchasePersonCode: {type: 'string'}, //采购员Code
            purchasePersonName: {type: 'string'}, //采购员Name
            purchaseDeptId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['department']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
            },
            purchaseDeptCode: {type: "string"},
            purchaseDeptName: {type: "string"},
            operation: {type: 'string'},
            customerId: {
                type: 'string',
                required: true,
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

            rowNum: {
                type: 'string',
                required: true,
            },
            purchaseOrder: {
                type: 'string'
            },
            stockOrgId: {
                type: 'string',
                required: true,
                'refmodel': JSON.stringify(refinfo['organization_ocm']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
            },
            stockOrgCode: {type: 'string'},
            stockOrgName: {type: 'string'},

            //采购组织
            purchaseOrgId: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['trantype']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                "refparam": '{"EQ_orgFuncRel":"04"}',
            },
            purchaseOrgName: {type: 'string', required: true},
            goodsVersion: {
                type: 'string'
            },
            theTakeCounts: {
                type: 'numberFloat'
            },
            unitId: {
                type: 'string'
            },
            unitPrice: {
                type: 'priceFloat'
            },
            amountMoney: {
                type: 'amountFloat'
            },
            isGift: {
                type: 'string'
            },
            receiverAdress: {
                type: 'string'
            },
            receiver: {
                type: 'string'
            },
            receiverPhone: {
                type: 'string'
            },
            storageCounts: {
                type: 'string'
            },
            cargoOrders: {
                type: 'string'
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
            childGoodsQty: {
                type: 'numberFloat',
            },
            parentRowNum: {
                type: 'string',
            }, //母件行号
        },
        pageSize: 10
    };
    var model = {
        metas: {
            complex: {
                meta: {
                    id: {
                        type: 'string',
                    },
                    // 库存组织
                    stockOrgId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },
                    stockInDate: {type: 'date'},
                    //单据日期
                    billDate: {type: 'date', required: true,},
                    stockOrgCode: {type: 'string'},
                    stockOrgName: {type: 'string'},
                    // 入库单号
                    stockInCode: {type: 'string',},
                    // 单据类型
                    billType: {type: 'string'},
                    // 入库仓库
                    stockInStorageId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
                    },
                    stockInStorageCode: {type: 'string'},
                    stockInStorageName: {type: 'string'},
                    ifSlotManage: {
                        type: 'string'
                    },
                    //（最后）入库日期
                    lastInDate: {type: 'date'},
                    // 库管员
                    storageAdminId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
                    },
                    storageAdminCode: {type: 'string'},
                    storageAdminName: {type: 'string'},
                    // //（最晚）预计到货日期
                    // lastReceiveDate:{type:'date'},
                    // 发货日期
                    deliverDate: {type: 'date'},
                    // 入库状态（QY107）
                    stockInStatus: {type: 'string'},
                    // 状态
                    status: {type: 'string'/*,required: true,*/},
                    statusCode: {type: 'string'/*,required: true,*/},
                    // 取消原因
                    cancelReason: {type: 'string'},
                    // 总应入数量
                    totalShouldInNum: {type: 'numberFloat',precision: 2/*,required: true,*/},
                    // 总实入数量
                    totalFactInNum: {type: 'numberFloat',precision: 2/*,required: true,*/},
                    // 采购员
                    purchasePersonId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"采购员"}',
                    },
                    purchasePersonName: {type: "string"},
                    purchasePersonCode: {type: "string"},
                    // 采购部门
                    purchaseDeptId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['department']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
                    },
                    purchaseDeptCode: {type: "string"},
                    purchaseDeptName: {type: "string"},
                    // 供应商
                    supplierId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
                    },
                    supplierCode: {type: "string"},
                    supplierName: {type: "string"},
                    // 备注
                    remark: {type: "string"},
                    // 承运商
                    carrierId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['logistics-company']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司"}',
                    },
                    carrierCode: {type: "string",},
                    carrierName: {type: "string",},
                    // 库存单据归属
                    stockBillBelong: {type: "string",},
                    // 所属客户
                    belongCustomer: {type: "string"},
                    // 入库人
                    stockInPersonId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
                    },
                    stockInPersonCode: {type: 'string'},
                    stockInPersonName: {type: 'string'},
                    // 签字人
                    signPerson: {type: "string"},
                    // 签字日期
                    signDate: {type: 'date'},
                    //交易类型
                    tranTypeId: {
                        type: 'string',
                        // required:true,
                        'refmodel': JSON.stringify(refinfo['trantype']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"交易类型"}',
                        'refparam': '{"EQ_billTypeId":"PurchaseIn"}'
                    },
                    tranTypeCode: {type: 'string'},
                    tranTypeName: {type: 'string'},
                    //币种
                    currencyId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['currency']),
                        "refcfg": '{"ctx":"/uitemplate_web",,"refName":"请选择"}',
                        "refparam": '{}'
                    }, //币种
                    currencyName: {type: 'string', required: true},
                    currencyCode: {type: 'string', required: true},
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
            complexItem: {
                meta: {
                    id: {type: 'string'},
                    // 行号
                    rowNum: {type: 'string'},
                    // 库存商品id
                    goodsId: {type: 'string'},
                    // 库存商品编码
                    goodsCode: {type: 'string'},
                    // 库存商品名称
                    goodsName: {type: 'string'},
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
                    // 计量单位
                    unitId: {type: 'string'}, //计量单位
                    unitCode: {type: 'string'}, //计量单位
                    unitName: {type: 'string'}, //计量单位
                    // 应收数量
                    shouldInNum: {type: 'numberFloat'},
                    // 单价
                    unitPrice: {type: 'priceFloat'},
                    // 金额
                    amountMoney: {type: 'amountFloat'},
                    //（实收）数量
                    factInNum: {type: 'numberFloat'},
                    // 是否赠品
                    isGift: {type: 'string'},
                    // 备注
                    remark: {type: 'string'},
                    // 入库日期
                    stockInDate: {type: 'date'},
                    // 入库人
                    stockInPersonId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
                    },
                    stockInPersonCode: {type: 'string'},
                    stockInPersonName: {type: 'string'},
                    //TODO  批次号没有  货位没有
                    // 批次号
                    batchNumId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchNumber']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
                    },
                    batchNumCode: {type: 'string'},
                    batchNumName: {type: 'string'},
                    // 货位
                    goodsPositionId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['goodsposition']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
                    },
                    goodsPositionCode: {type: 'string'},
                    goodsPositionName: {type: 'string'},
                    // 源头单据号
                    sourceId: {type: 'string'},
                    // 源头单据类型
                    sourceType: {type: 'string'},
                    // 来源单据号
                    srcBillCode: {type: 'string'},
                    // 来源单据行号
                    srcBillBcode: {type: 'string'},
                    // 来源单据类型
                    srcBillType: {type: 'string'},
                    goodsVersion: {
                        type: 'string',
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
                        /* required: true*/
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
                pageSize: 10,
            },
            BomItem: {
                meta: {
                    id: {type: 'string'},
                    // 行号
                    rowNum: {type: 'string'},
                    // 库存商品id
                    goodsId: {type: 'string'},
                    // 库存商品编码
                    goodsCode: {type: 'string'},
                    // 库存商品名称
                    goodsName: {type: 'string'},
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
                    // 计量单位
                    unitId: {type: 'string'}, //计量单位
                    unitCode: {type: 'string'}, //计量单位
                    unitName: {type: 'string'}, //计量单位
                    // 应收数量
                    shouldInNum: {type: 'numberFloat'},
                    // 单价
                    unitPrice: {type: 'priceFloat'},
                    // 金额
                    amountMoney: {type: 'amountFloat'},
                    //（实收）数量
                    factInNum: {type: 'numberFloat'},
                    // 是否赠品
                    isGift: {type: 'string'},
                    // 备注
                    remark: {type: 'string'},
                    // 入库日期
                    stockInDate: {type: 'date'},
                    // 入库人
                    stockInPersonId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
                    },
                    stockInPersonCode: {type: 'string'},
                    stockInPersonName: {type: 'string'},
                    //TODO  批次号没有  货位没有
                    // 批次号
                    batchNumId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchNumber']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
                    },
                    batchNumCode: {type: 'string'},
                    batchNumName: {type: 'string'},
                    // 货位
                    goodsPositionId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['goodsposition']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
                    },
                    goodsPositionCode: {type: 'string'},
                    goodsPositionName: {type: 'string'},
                    // 源头单据号
                    sourceId: {type: 'string'},
                    // 源头单据类型
                    sourceType: {type: 'string'},
                    // 来源单据号
                    srcBillCode: {type: 'string'},
                    // 来源单据行号
                    srcBillBcode: {type: 'string'},
                    // 来源单据类型
                    srcBillType: {type: 'string'},

                    //------- 630后 新加bom包件字段 -------
                    goodsVersion: {
                        type: 'string',
                        required: true
                    },  //商品版本号
                    goodsSelection: {
                        type: 'string',
                        required: true
                    },  //商品选配项
                    batchCodeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchCode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                    },//批号
                    batchCodeCode: {
                        type: 'string'
                    }, //批号
                    batchCodeName: {
                        type: 'string'
                    }, //批号
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
                        type: 'numberFloat',
                    },
                    originalGoodsId: {
                        type: 'string',
                    },  //原始版本商品
                    goodsSelectionDescription: {
                        type: 'string',
                    },//商品选项描述
                },
                pageSize: 10,
            },
            referPurchaseorder: {
                meta: {
                    orderItems: {
                        type: "child",
                        meta: orderItemsmeta.meta
                    },
                    orderItemBoms: {
                        type: "child",
                        meta: BomItemsmeta.meta
                    },
                    purchaseOrgId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{"EQ_orgFuncRel":"04"}',
                    }, //采购组织
                    purchaseOrgName: {type: 'string', required: true},
                    tranTypeId: {
                        type: 'string',
                        required: true,
                        default: "PurchaseBill",
                        'refmodel': JSON.stringify(refinfo['trantype']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"订单类型"}',
                        'refparam': '{"EQ_billTypeId":"PurchaseBill"}'
                    }, //交易id
                    tranTypeName: {type: 'string', required: true}, //交易Name
                    tranTypeCode: {type: 'string', required: true}, //交易Code
                    orderCode: {type: 'string', required: true}, //订单编码
                    otherOrderNum: {type: 'string'}, //对方订单号
                    orderDate: {type: 'string', required: true}, //订单日期
                    purchaseTypeCode: {type: 'string', required: true}, //采购类型
                    purchaseTypeName: {type: 'string', required: true}, //采购类型
                    bizTypeId: {type: 'string', required: true}, //交易id
                    bizTypeName: {type: 'string', required: true}, //交易Name
                    bizTypeCode: {type: 'string', required: true}, //交易Code
                    supplierId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}',
                    }, //供应商
                    supplierName: {type: 'string', required: true}, //供应商Name
                    supplierCode: {type: 'string', required: true}, //供应商Code
                    purchasePersonId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    }, //采购员
                    purchasePersonCode: {type: 'string'}, //采购员Code
                    purchasePersonName: {type: 'string'}, //采购员Name
                    purchaseDeptId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['department']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
                    },
                    purchaseDeptCode: {type: "string"},
                    purchaseDeptName: {type: "string"},
                    totalAmount: {type: 'numberFloat', required: true}, //总数量
                    totalMoney: {type: 'numberFloat', required: true}, //总金额
                    currencyId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['currency']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}',
                        "refparam": '{}'
                    }, //币种
                    currencyName: {type: 'string', required: true},
                    currencyCode: {type: 'string', required: true},
                    status: {type: 'string', required: true, default: 1}, //单据状态
                    remark: {type: 'string'}, //备注
                    operation: {type: 'string'},
                    selectitemIds: {type: 'string'},
                },
                pageSize: 10
            },
            referPurchaseorderitem: orderItemsmeta,

            referPurchasecargoorder: {
                meta: {
                    takeCargoItems: {
                        type: "child",
                        meta: orderItemsmeta.meta
                    },
                    takeCargoItemBoms: {
                        type: "child",
                        meta: BomItemsmeta.meta
                    },
                    orderCode: {type: 'string'},
                    appointTackTime: {type: 'date'},
                    arrangeTime: {type: 'date'},
                    arrangePerson: {type: 'string'},
                    takeType: {type: 'integer'},
                    takeUnitId: {type: 'string'},
                    takeUnitCode: {type: 'string'},
                    takeUnitName: {type: 'string'},
                    counts: {type: 'string'},
                    moneys: {type: 'string'},
                    isEnable: {type: 'string'},
                    preparedBy: {type: 'string'},
                    preparedByTime: {type: 'date'},
                    approver: {type: 'string'},
                    approveTime: {type: 'datetime'},
                    creator: {type: 'string'},
                    creationTime: {type: 'datetime'},
                    modifier: {type: 'string'},
                    ts: {type: 'datetime'},
                    selectitemIds: {type: 'string'},
                },
                pageSize: 10
            },
            referPurchasecargoorderitem: orderItemsmeta,
            referPurchaseorderSearch: {
                meta: {
                    // // 库存组织
                    // receiveStorageOrgId: {
                    //   type: 'string',
                    //   'refmodel': JSON.stringify(refinfo['organization_ocm']),
                    //   "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                    // },
                    receiveStorageId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['storeLocation']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //仓库
                    receiveStorageName: {type: 'string',},
                    receiveStorageCode: {type: 'string',},
                    purchaseCode: {type: "string",},//订单号
                    orderDate: {type: "string",},//订单日期
                    otherOrderNum: {type: "string",},//对方订单号
                    supplierId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['department']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}',
                    }, // 供应商
                    supplierName: {type: "string"},//供应商Name
                    supplierCode: {type: "string"},//供应商Code

                    stockInStorageId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
                    },
                    stockInStorageName: {type: "string"},
                    stockInStorageCode: {type: "string"},

                    arrivalBelongId: {type: 'string', required: true}, //到货地归属
                    arrivalBelongName: {type: 'string', required: true},
                    arrivalBelongCode: {type: 'string', required: true},

                    receiveStorageOrgId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    }, //收货库存组织
                    receiveStorageOrgName: {type: 'string',},
                    receiveStorageOrgCode: {type: 'string',},

                    customer: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['customers']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //客户
                },

                pageSize: 10
            },
            referPurchasecargoorderSearch: {
                meta: {
                    receiveStorageId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['storeLocation']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //仓库
                    receiveStorageName: {type: 'string'},
                    receiveStorageCode: {type: 'string'},

                    orderCode: {type: 'string'},
                    appointTackTime: {type: 'date'},
                    arrangePerson: {type: 'string'},
                    takeType: {type: 'integer'},
                    takeUnitId: {type: 'string'},
                    takeUnitCode: {type: 'string'},
                    takeUnitName: {type: 'string'},

                    receiveStorageOrgId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    }, //收货库存组织
                    receiveStorageOrgName: {type: 'string'},
                    receiveStorageOrgCode: {type: 'string'},

                },

                pageSize: 10
            },
            ItemRef: {
                meta: {
                    productref: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
                    }
                }
            }
        },
        searchs: {
            search1: [
                {
                    type: "text",
                    key: "stockInCode",
                    label: "入库单号"
                },
                {
                    type: "daterange",
                    key: "billDate",
                    label: "单据日期"
                },
                {
                    type: "refer",
                    key: "stockOrg",
                    label: "库存组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "03"
                    }
                },
                {
                    type: "refer",
                    key: "stockInStorage",
                    label: "入库仓库",
                    refinfo: "warehouse",
                    domid: "stockInStorage--id"
                },
                {
                    type: "refer",
                    key: "supplier",
                    label: "供应商",
                    refinfo: "suppliers",
                },
                {
                    type: "refer",
                    key: "purchasePerson",
                    label: "采购员",
                    refinfo: "person"
                },
                {
                    type: "refer",
                    key: "purchaseDept",
                    label: "采购部门",
                    refinfo: "department"
                },
                {
                    type: "refer",
                    key: "purchaseInItems--goods",
                    label: "库存商品",
                    refinfo: "goods"
                },
                {
                    type: "combo",
                    key: "status",
                    label: "单据状态",
                    url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY106',
                    namefield: "name",
                    valuefield: "code",
                    hasAll: true
                },
            ],
            search2: [
                {
                    type: "refer",
                    key: "receiveStorageOrgId",
                    label: "收货库存组织",
                    refinfo: "organization_ocm",
                    clientParam: {"EQ_orgFuncRel": "03", "EQ_isEnable": "1"},
                },
                {
                    type: "refer",
                    key: "receiveStorageId",
                    label: "收货仓库",
                    refinfo: "warehouse",
                    domid: "storehouse2"
                },
                {
                    type: "text",
                    key: "purchaseCode",
                    label: "订单号"
                },
                {
                    type: "daterange",
                    key: "orderDate",
                    label: "订单日期"
                },
                {
                    type: "text",
                    key: "otherOrderNum",
                    label: "对方订单号"
                },
                {
                    type: "refer",
                    key: "supplier",
                    label: "供应商",
                    refinfo: "suppliers"
                },

            ],
            search3: [
                // {
                // 		type: "refer",
                // 		key: "stockOrg",
                // 		label: "采购组织",
                // 		refinfo: "organization_ocm",
                // 		clientParam: {
                // 			"EQ_orgFuncRel":"03"
                // 		}
                // 	  },
                {
                    type: "refer",
                    key: "receiveStorageOrgId",
                    label: "收货库存组织",
                    refinfo: "organization_ocm",
                    clientParam: {"EQ_orgFuncRel": "03", "EQ_isEnable": "1"},
                },
                {
                    type: "refer",
                    key: "receiveStorageId",
                    label: "收货仓库",
                    refinfo: "warehouse",
                    domid: "storehouse2"
                },
                // {
                // type: "refer",
                // key: "stockOrgId",
                // label: "库存组织",
                // refinfo: "organization_ocm",
                // clientParam:{
                //   "EQ_orgFuncRel":"03"
                // },
                // domid:"cardStockOrgId",
                // referId : "cardStockOrgId"
                // },
                // {
                // type: "refer",
                // key: "stockInStorageId",
                // label: "入库仓库",
                // refinfo: "warehouse",
                // referId : "stockInStorageId",
                // domid:"stockInStorageDomId"
                // },
                // {
                // type: "refer",
                // key: "stockOrg",
                // label: "入库仓库",
                // refinfo: "organization_ocm",
                // clientParam: {
                // 	"EQ_orgFuncRel":"03"
                // }
                // },
                {
                    type: "text",
                    key: "orderCode",
                    label: "提货单号"
                },
                {
                    type: "daterange",
                    key: "appointTackTime",
                    label: "约定提货日期"
                }, {
                    type: "text",
                    key: "arrangePerson",
                    label: "安排人"
                },
                {
                    type: "combo",
                    key: "takeType",
                    label: "提货方类型",
                    defaultvalue: 'defaultoption',
                    dataSource: [
                        {value: 'defaultoption', name: '全部'},
                        {value: "1", name: "物流公司"},
                        {value: "2", name: "个体"},
                    ]
                },
                {
                    type: "text",
                    key: "takeUnitName",
                    label: "提货单位"
                }
                // {
                // 	type: "combo",
                // 	key: "orderState",
                // 	label: "提货单状态",
                // 	defaultvalue: 'defaultoption',
                // 	dataSource: [
                // 		{ value: 'defaultoption', name: '全部' },
                // 		{ value: "1", name: "是" },
                // 		{ value: "0", name: "否" }]
                // }
            ]
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "showAddRefer"
            },
                {
                    key: "addref",
                    label: "新增参照提货单",
                    iconCls: "icon-plus",
                    click: "showAddRefer2"
                },
                {
                    key: "cancel",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "batchdel"
                },
                {
                    key: "sign",
                    label: "签字",
                    iconCls: "icon-edit",
                    click: "signbtn"
                },
                {
                    key: "cancelsign",
                    label: "取消签字",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "cancelsignbtn"
                },
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
            button2: [
                {
                    key: "autonum",
                    label: "自动取数",
                    click: "autonum"
                }, {
                    key: "cancel",
                    label: "取消",
                    click: "cancelBill"
                },
                {
                    key: "save",
                    label: "保存",
                    click: "saveBill",
                    cls: "ui-btn-green"
                }
            ],
            button3: [],
            button4: [{
                key: "return",
                label: "返回",
                click: "retListPanel"
            },
                {
                    key: "edit",
                    label: "编辑",
                    click: "detail2bill",
                    cls: "ui-btn-green"
                }
            ],
        },
        cards: {
            card1: [
                {
                    type: "textreadonly",
                    key: "stockInCode",
                    label: "入库单号",
                },
                {
                    type: "date",
                    key: "billDate",
                    label: "单据日期",
                },
                {
                    type: "refer",
                    key: "stockOrgId",
                    label: "库存组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "03"
                    },
                    domid: "cardStockOrgId",
                    referId: "cardStockOrgId"
                },
                {
                    type: "refer",
                    key: "stockInStorageId",
                    label: "入库仓库",
                    refinfo: "warehouse",
                    referId: "stockInStorageIdCard",
                    domid: "stockInStorageDomId"
                },
                // {
                //   type: "combo",
                //   key: "billType",
                //   label: "入库类型",
                //   defaultvalue: "1",
                //   dataSource: [
                //     { value: '1', name: '采购入库' },
                //   ],
                //   enable:false
                // },
                {
                    type: "refer",
                    key: "supplierId",
                    label: "供应商",
                    refinfo: "suppliers",
                    enable: false
                },
                {
                    type: "refer",
                    key: "purchasePersonId",
                    label: "采购员",
                    refinfo: "person"
                },
                {
                    type: "refer",
                    key: "purchaseDeptId",
                    label: "采购部门",
                    refinfo: "department"
                },
                {
                    type: "refer",
                    key: "storageAdminId",
                    label: "库管员",
                    refinfo: "person"
                },
                {
                    type: "combo",
                    key: "status",
                    label: "单据状态",
                    defaultvalue: "01",
                    dataSource: [
                        {value: '01', name: '自由态'},
                    ],
                    enable: false
                },
                // {
                //   type: "date",
                //   key: "lastReceiveDate",
                //   label: "计划到货日期",
                // },
                {
                    type: "textreadonly",
                    key: "totalShouldInNum",

                    label: "总应入数量",
                    enable: false
                },
                {
                    type: "textreadonly",
                    key: "totalFactInNum",
                    label: "总实入数量",
                    enable: false
                },
                {
                    type: "refer",
                    key: "carrierId",
                    label: "配送物流公司",
                    refinfo: "logistics-company"
                },
                {
                    type: "textarea",
                    key: "remark",
                    label: "备注",
                    cls: "ui-textarea-item"
                },
                // {
                //   type: "combo",
                //   key: "stockBillBelong",
                //   keyfordisplay: "stockBillBelongName",
                //   label: "库存单据归属",
                //   dataSource: "orderTypeSource"
                // },
                // {
                //   type: "refer",
                //   key: "belongCustomer",
                //   label: "所属客户",
                //   refinfo: "person"
                // },


                // {
                //   type: "text",
                //   key: "stockInDate",
                //   label: "上游出库单号",
                // },
                // {
                //   type: "text",
                //   key: "stockInDate",
                //   label: "上游出库单行号",
                // },

                // {
                //   type: "refer",
                //   key: "belongCustomer",
                //   label: "所属客户",
                //   refinfo: "person"
                // },
                // {
                //   type: "textreadonly",
                //   key: "signPerson",
                //   label: "签字人",
                // },
                // {
                //   type: "textreadonly",
                //   key: "signDate",
                //   label: "签字日期",
                // },
            ]
        },
        details: {
            detail1: [
                {
                    key: "stockInCode",
                    label: "入库单号",
                },
                {
                    key: "billDate",
                    label: "单据日期",
                    computed: "billDateComputed"
                },
                {
                    key: "stockOrgName",
                    label: "库存组织",
                },
                {
                    key: "stockInStorageName",
                    label: "入库仓库",
                },
                {
                    key: "supplierName",
                    label: "供应商",
                },
                {
                    key: "purchasePersonName",
                    label: "采购员",
                },
                {
                    key: "purchaseDeptName",
                    label: "采购部门",
                },
                {
                    key: "storageAdminName",
                    label: "库管员",
                },
                {
                    key: "status",
                    label: "单据状态",
                    computed: "status",
                },
                {
                    key: "totalShouldInNum",
                    label: "总应入数量",
                },
                {
                    key: "totalFactInNum",
                    label: "总实入数量",
                },
                {
                    key: "carrierName",
                    label: "配送物流公司",
                },
                {
                    key: "remark",
                    label: "备注",
                },
                // {
                //   type: "combo",
                //   key: "stockBillBelong",
                //   keyfordisplay: "stockBillBelongName",
                //   label: "库存单据归属",
                //   dataSource: "orderTypeSource"
                // },
                // {
                //   type: "refer",
                //   key: "belongCustomer",
                //   label: "所属客户",
                //   refinfo: "person"
                // },


                // {
                //   type: "text",
                //   key: "stockInDate",
                //   label: "上游出库单号",
                // },
                // {
                //   type: "text",
                //   key: "stockInDate",
                //   label: "上游出库单行号",
                // },

                // {
                //   type: "refer",
                //   key: "belongCustomer",
                //   label: "所属客户",
                //   refinfo: "person"
                // },
                // {
                //   type: "textreadonly",
                //   key: "signPerson",
                //   label: "签字人",
                // },
                // {
                //   type: "textreadonly",
                //   key: "signDate",
                //   label: "签字日期",
                // },
            ]
        },
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    "id": "grid_complex",
                    "data": "purchaseinList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                },
                columns: [
                    {
                        "field": "stockInCode",
                        "dataType": "String",
                        "title": "入库单号",
                        "renderType": "detailRender",
                    },
                    {
                        "field": "billDate",
                        "dataType": "Date",
                        "title": "单据日期",
                    },
                    {
                        "field": "stockOrgName",
                        "dataType": "String",
                        "title": "库存组织",
                    },
                    {
                        "field": "stockInStorageName",
                        "dataType": "String",
                        "title": "仓库",
                    },
                    {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                    },
                    {
                        "field": "purchasePersonName",
                        "dataType": "String",
                        "title": "采购员",
                    },
                    {
                        "field": "purchaseDeptName",
                        "dataType": "String",
                        "title": "采购部门",
                    },
                    {
                        "field": "storageAdminName",
                        "dataType": "String",
                        "title": "库管员",
                    },
                    {
                        "field": "status",
                        "dataType": "String",
                        "title": "单据状态",
                        "renderType": "statusRender",
                    },
                    {
                        "field": "totalShouldInNum",
                        "dataType": "String",
                        "title": "总应入数量",
                    },
                    {
                        "field": "totalFactInNum",
                        "dataType": "String",
                        "title": "总实入数量",
                    },
                    {
                        "field": "carrierName",
                        "dataType": "String",
                        "title": "配送物流公司",
                    },
                    // {
                    //   "field": "cancelReason",
                    //   "dataType": "String",
                    //   "title": "取消原因",
                    // },
                    {
                        "field": "remark",
                        "dataType": "String",
                        "title": "备注",
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
                        "field": "statusCode",
                        "dataType": "String",
                        "title": "操作",
                        "renderType": "operation",
                        "fixed": true,
                        "width": "100px"
                    },
                ]
            },

            //商品信息
            gridGoodsEdit: {
                domid: "grid_purchaseorder2",
                umeta: {
                    "id": "grid_complex_edit",
                    "data": "purchaseinItems",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "onBeforeEditFun": "beforeEditCheck"
                },
                columns: [
                    {
                        "field": "rowNum",
                        "dataType": "String",
                        "title": "行号",
                        "editable": false,
                    },
                    {
                        "field": "goodsCode",
                        "dataType": "String",
                        "title": "商品编号",
                        "editable": false,
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称",
                        "editable": false,
                    },
                    {
                        "field": "shouldInNum",
                        "dataType": "String",
                        "title": "应入数量",
                        "editable": false,
                    },
                    {
                        "field": "factInNum",
                        "dataType": "String",
                        "title": "实入数量",
                    },
                    {
                        "field": "unitName",
                        "dataType": "String",
                        "title": "单位",
                        "editable": false
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "String",
                        "title": "单价",
                    },
                    {
                        "field": "amountMoney",
                        "dataType": "String",
                        "title": "金额",
                        "editable": false,
                    },
                    {
                        field: "goodsSelection",
                        dataType: "String",
                        title: "商品选配",
                        renderType: "goodsOptDetails",
                        editable: false,
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
                            "validType": "string",
                            rel: {
                                refpk: "projectId",
                                refname: "projectName"
                            }
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
                        "field": "isGift",
                        "dataType": "checkbox",
                        "title": "赠品",
                        "renderType": "booleanRender",
                    },
                    {
                        "field": "remark",
                        "dataType": "String",
                        "title": "备注",
                    },
                    {
                        "field": "stockInPersonName",
                        "dataType": "String",
                        "title": "入库人",
                        "editable": false,
                    },
                    {
                        "field": "stockInDate",
                        "dataType": "Date",
                        "title": "入库日期",
                        "editable": false,
                    },

                ]
            },
            gridGoodsDetail: {
                domid: "grid_purchaseorder3",
                umeta: {
                    "id": "grid_complex_detail",
                    "data": "purchaseinItems",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true
                },
                columns:
                    [
                        {
                            "field": "rowNum",
                            "dataType": "String",
                            "title": "行号",
                            "editable": false,
                        },
                        {
                            "field": "goodsCode",
                            "dataType": "String",
                            "title": "商品编号",
                            "editable": false,
                        },
                        {
                            "field": "goodsName",
                            "dataType": "String",
                            "title": "商品名称",
                            "editable": false,
                        },
                        {
                            "field": "shouldInNum",
                            "dataType": "String",
                            "title": "应入数量",
                            "editable": false,
                        },
                        {
                            "field": "factInNum",
                            "dataType": "String",
                            "title": "实入数量",
                            "editable": false,
                        },
                        {
                            "field": "unitName",
                            "dataType": "String",
                            "title": "单位",
                            "editable": false
                        },
                        {
                            "field": "unitPrice",
                            "dataType": "String",
                            "title": "单价",
                            "editable": false,
                        },
                        {
                            "field": "amountMoney",
                            "dataType": "String",
                            "title": "金额",
                            "editable": false,
                        },
                        {
                            field: "goodsSelection",
                            dataType: "String",
                            title: "商品选配",
                            renderType: "goodsOptDetails",
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
                            "field": "batchNumName",
                            "dataType": "String",
                            "title": "批次号",
                            "editable": false,
                        },
                        {
                            "field": "goodsPositionName",
                            "dataType": "String",
                            "title": "货位",
                            "editable": false,
                        },
                        {
                            "field": "isGift",
                            "dataType": "checkbox",
                            "title": "赠品",
                            "renderType": "disableBooleanRender",
                            "editable": false,
                        },
                        {
                            "field": "remark",
                            "dataType": "String",
                            "title": "备注",
                            "editable": false,
                        },
                        {
                            "field": "stockInPersonName",
                            "dataType": "String",
                            "title": "入库人",
                            "editable": false,
                        },
                        {
                            "field": "stockInDate",
                            "dataType": "Date",
                            "title": "入库日期",
                            "editable": false,
                        },
                    ]
            },

            //bom结构信息
            gridBomEdit: {
                domid: "grid_bomEdit",
                umeta: {
                    "id": "grid_complex_bomEdit",
                    "data": "BomItems",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "onBeforeEditFun": "beforeEditCheck"
                },
                columns: [
                    {
                        "field": "rowNum",
                        "dataType": "String",
                        "title": "行号",
                        "editable": false,
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
                        "field": "goodsCode",
                        "dataType": "String",
                        "title": "商品编号",
                        "editable": false,
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称",
                        "editable": false,
                    },
                    {
                        "field": "shouldInNum",
                        "dataType": "String",
                        "title": "应入数量",
                        "editable": false,
                    },
                    {
                        "field": "factInNum",
                        "dataType": "String",
                        "title": "实入数量",
                        "editable": false,
                    },
                    {
                        "field": "unitName",
                        "dataType": "String",
                        "title": "单位",
                        "editable": false
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "String",
                        "title": "单价",
                    },
                    {
                        "field": "amountMoney",
                        "dataType": "String",
                        "title": "金额",
                        "editable": false,
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
                        },
                        "editable": false,
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
                        },
                        "editable": false,
                    },
                    {
                        "field": "remark",
                        "dataType": "String",
                        "title": "备注",
                        "editable": false,
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
                            "validType": "string",
                            rel: {
                                refpk: "projectId",
                                refname: "projectName"
                            }
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
                    {
                        "field": "stockInPersonName",
                        "dataType": "String",
                        "title": "入库人",
                        "editable": false,
                    },
                    {
                        "field": "stockInDate",
                        "dataType": "Date",
                        "title": "入库日期",
                        "editable": false,
                    },

                ]
            },
            gridBomDetail: {
                domid: "grid_bomDetail",
                umeta: {
                    "id": "grid_complex_bomDetail",
                    "data": "BomItems",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true
                },
                columns:
                    [
                        {
                            "field": "rowNum",
                            "dataType": "String",
                            "title": "行号",
                            "editable": false,
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
                            "field": "goodsCode",
                            "dataType": "String",
                            "title": "商品编号",
                            "editable": false,
                        },
                        {
                            "field": "goodsName",
                            "dataType": "String",
                            "title": "商品名称",
                            "editable": false,
                        },
                        {
                            "field": "shouldInNum",
                            "dataType": "String",
                            "title": "应入数量",
                            "editable": false,
                        },
                        {
                            "field": "factInNum",
                            "dataType": "String",
                            "title": "实入数量",
                            "editable": false,
                        },
                        {
                            "field": "unitName",
                            "dataType": "String",
                            "title": "单位",
                            "editable": false
                        },
                        {
                            "field": "unitPrice",
                            "dataType": "String",
                            "title": "单价",
                            "editable": false,
                        },
                        {
                            "field": "amountMoney",
                            "dataType": "String",
                            "title": "金额",
                            "editable": false,
                        },
                        {
                            "field": "batchNumName",
                            "dataType": "String",
                            "title": "批次号",
                            "editable": false,
                        },
                        {
                            "field": "goodsPositionName",
                            "dataType": "String",
                            "title": "货位",
                            "editable": false,
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
                            "field": "remark",
                            "dataType": "String",
                            "title": "备注",
                            "editable": false,
                        },
                        {
                            "field": "stockInPersonName",
                            "dataType": "String",
                            "title": "入库人",
                            "editable": false,
                        },
                        {
                            "field": "stockInDate",
                            "dataType": "Date",
                            "title": "入库日期",
                            "editable": false,
                        },
                    ]
            },

            //拉单弹窗相关grid元数据
            grid4: {
                domid: "grid_purchaseorder4",
                umeta: {
                    "id": "grid_referList",
                    "data": "referPurchaseorderList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "onRowSelected": "referSelectHandle",
                    "onRowUnSelected": "referUnSelectHandle",
                },
                columns: [
                    {
                        "field": "purchaseOrgName",
                        "dataType": "String",
                        "title": "采购组织",
                    },
                    {
                        "field": "tranTypeName",
                        "dataType": "String",
                        "title": "交易类型",
                    },
                    {
                        "field": "orderCode",
                        "dataType": "String",
                        "title": "订单编码",
                    },
                    {
                        "field": "otherOrderNum",
                        "dataType": "String",
                        "title": "对方订单号"
                    },
                    {
                        "field": "orderDate",
                        "dataType": "Date",
                        "title": "订单日期",
                    },
                    {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                    },
                    {
                        "field": "purchasePersonName",
                        "dataType": "String",
                        "title": "采购员",
                    },
                    {
                        "field": "purchaseDeptName",
                        "dataType": "String",
                        "title": "采购部门",
                    },
                    {
                        "field": "totalGoodsNum",
                        "dataType": "String",
                        "title": "总数量",
                    },
                    {
                        "field": "totalAmountMoney",
                        "dataType": "String",
                        "title": "总金额",
                    },
                    {
                        "field": "status",
                        "dataType": "string",
                        "title": "单据状态",
                        "renderType": "purchasestatusRender",
                    },
                    {
                        "field": "remark",
                        "dataType": "string",
                        "title": "备注",
                    },
                ]
            },
            grid5: {
                domid: "grid_purchaseorder5",
                umeta: {
                    "id": "grid_referListItem",
                    "data": "referPurchaseorderitemList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "onRowSelected": "referSelectItemHandle",
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
                        "title": "商品编码",
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称",
                    },
                    {
                        "field": "unitName",
                        "dataType": "String",
                        "title": "单位",
                        "width": "60px"
                    },
                    {
                        "field": "goodsNum",
                        "dataType": "String",
                        "title": "数量",
                        "width": "60px"
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "String",
                        "title": "单价",
                        "width": "60px"
                    },
                    {
                        "field": "amountMoney",
                        "dataType": "String",
                        "title": "金额",
                        "width": "60px"
                    },
                    {
                        "field": "receiveStorageOrgName",
                        "dataType": "String",
                        "title": "收货库存组织",
                    },
                    {
                        "field": "receiveStorageName",
                        "dataType": "String",
                        "title": "收货仓库",
                    },
                    {
                        "field": "arrivalBelongName",
                        "dataType": "String",
                        "title": "到货地归属",
                    },
                    {
                        "field": "customerName",
                        "dataType": "String",
                        "title": "客户",
                    },
                    {
                        "field": "detailAddr",
                        "dataType": "String",
                        "title": "收货地址",
                    },
                    {
                        "field": "receiveContact",
                        "dataType": "String",
                        "title": "收货联系人",
                    },
                    {
                        "field": "receiveContactPhone",
                        "dataType": "String",
                        "title": "收货联系人电话",
                    },
                    {
                        "field": "receiveContactPhone",
                        "dataType": "String",
                        "title": "收货联系人电话（备用）",
                    },
                    {
                        "field": "receiveContactPhone",
                        "dataType": "String",
                        "title": "预计到货时间",
                        "visible": false,
                    },
                ]
            },
            grid6: {
                domid: "grid_purchaseorder6",
                umeta: {
                    "id": "grid_referList_Sel",
                    "data": "selectedreferList",
                    "type": "grid",
                    "showNumCol": true,
                    "editable": false,
                },
                columns: [
                    {
                        "field": "purchaseOrgName",
                        "dataType": "String",
                        "title": "采购组织",
                    },
                    {
                        "field": "tranTypeName",
                        "dataType": "String",
                        "title": "订单类型",
                    },
                    {
                        "field": "orderCode",
                        "dataType": "String",
                        "title": "订单编码",
                    },
                    {
                        "field": "otherOrderNum",
                        "dataType": "String",
                        "title": "对方订单号"
                    },
                    {
                        "field": "orderDate",
                        "dataType": "Date",
                        "title": "订单日期",
                    },
                    {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                    },
                    {
                        "field": "purchasePersonName",
                        "dataType": "String",
                        "title": "采购员",
                    },
                    {
                        "field": "purchaseDeptName",
                        "dataType": "String",
                        "title": "采购部门",
                    },
                    {
                        "field": "totalGoodsNum",
                        "dataType": "String",
                        "title": "总数量",
                    },
                    {
                        "field": "totalAmountMoney",
                        "dataType": "String",
                        "title": "总金额",
                    },
                    {
                        "field": "status",
                        "dataType": "string",
                        "title": "单据状态",
                        "renderType": "purchasestatusRender",
                    },
                    {
                        "field": "remark",
                        "dataType": "string",
                        "title": "备注",
                    },
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
                        "width": "80px"
                    },
                    {
                        "field": "goodsCode",
                        "dataType": "String",
                        "title": "商品编码",
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称",
                    },
                    {
                        "field": "unitName",
                        "dataType": "String",
                        "title": "单位",
                    },
                    {
                        "field": "goodsNum",
                        "dataType": "String",
                        "title": "数量",
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "String",
                        "title": "单价",
                    },
                    {
                        "field": "amountMoney",
                        "dataType": "String",
                        "title": "金额",
                    },
                    {
                        "field": "receiveStorageOrgName",
                        "dataType": "String",
                        "title": "收货库存组织",
                    },
                    {
                        "field": "receiveStorageName",
                        "dataType": "String",
                        "title": "收货仓库",
                    },
                    {
                        "field": "arrivalBelongCode",
                        "dataType": "String",
                        "title": "到货地归属",
                    },
                    {
                        "field": "customerName",
                        "dataType": "String",
                        "title": "客户",
                    },
                    {
                        "field": "detailAddr",
                        "dataType": "String",
                        "title": "收货地址",
                    },
                    {
                        "field": "receiveContact",
                        "dataType": "String",
                        "title": "收货联系人",
                    },
                    {
                        "field": "receiveContactPhone",
                        "dataType": "String",
                        "title": "收货联系人电话",
                    },
                    {
                        "field": "receiveContactPhone",
                        "dataType": "String",
                        "title": "收货联系人电话（备用）",
                    },
                    {
                        "field": "receiveContactPhone",
                        "dataType": "String",
                        "title": "预计到货时间",
                        "visible": false,
                    },
                    {
                        "field": "operation",
                        "dataType": "String",
                        "title": "操作",
                        "renderType": "rowRemove",
                        "fixed": true,
                        "width": "100px"
                    },
                ]
            },

            grid8: {
                domid: "grid_purchasecargoorder8",
                umeta: {
                    "id": "grid_referpurchasecargoorderList",
                    "data": "referPurcasecargoorderList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "onRowSelected": "referSelectHandle2",
                    "onRowUnSelected": "referUnSelectHandle2",
                },
                columns: [
                    {
                        "field": "orderCode",
                        "dataType": "String",
                        "title": "提货单号"
                    },
                    {
                        "field": "appointTackTime",
                        "dataType": "Date",
                        "title": "约定提货日期"
                    },
                    {
                        "field": "arrangeTime",
                        "dataType": "Date",
                        "title": "安排日期"
                    },
                    {
                        "field": "arrangePerson",
                        "dataType": "String",
                        "title": "安排人"
                    },
                    {
                        "field": "takeType",
                        "dataType": "Integer",
                        "title": "提货方类型",
                        "renderType": "takeTypeRender"
                    },
                    {
                        "field": "takeUnitName",
                        "dataType": "string",
                        "title": "提货单位"
                    },
                    {
                        "field": "counts",
                        "dataType": "String",
                        "title": "总数量"
                    },
                    {
                        "field": "moneys",
                        "dataType": "String",
                        "title": "总金额"
                    },
                    {
                        "field": "orderState",
                        "dataType": "String",
                        "title": "提货单状态",
                        "renderType": "stateRender"
                    },
                    {
                        "field": "preparedBy",
                        "dataType": "String",
                        "title": "制单人",
                        "visible": false
                    },
                    {
                        "field": "preparedByTime",
                        "dataType": "Date time",
                        "title": "制单时间",
                        "visible": false
                    },
                    {
                        "field": "approver",
                        "dataType": "String",
                        "title": "审批人",
                        "visible": false
                    },
                    {
                        "field": "approveTime",
                        "dataType": "Datetime",
                        "title": "审批时间",
                        "visible": false
                    },
                    {
                        "field": "creator",
                        "dataType": "String",
                        "title": "创建人",
                        "visible": false
                    },
                    {
                        "field": "creationTime",
                        "dataType": "Datetime",
                        "title": "创建时间",
                        "visible": false
                    },
                    {
                        "field": "modifier",
                        "dataType": "String",
                        "title": "最后修改人",
                        "visible": false
                    },
                    {
                        "field": "ts",
                        "dataType": "Datetime",
                        "title": "最后修改时间",
                        "visible": false
                    }
                ]
            },
            grid9: {
                domid: "grid_purchasecargoorder9",
                umeta: {
                    "id": "grid_referPurchasecargoorderitemList",
                    "data": "referPurchasecargoorderitemList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "onRowSelected": "referSelectItemHandle2",
                    "onRowUnSelected": "referUnSelectItemHandle2",
                },
                columns: [
                    {
                        "field": "rowNum",
                        "dataType": "String",
                        "title": "行号"
                    },
                    {
                        "field": "purchaseOrder",
                        "dataType": "String",
                        "title": "采购单号",
                        "editable": false
                    },
                    {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                        "editable": false
                    },
                    {
                        "field": "goodsCode",
                        "dataType": "Date",
                        "title": "商品编号"
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称"
                    },
                    {
                        "field": "goodsVersion",
                        "dataType": "String",
                        "title": "商品版本",
                        "editable": false
                    },
                    {
                        "field": "theTakeCounts",
                        "dataType": "String",
                        "title": "本次提货数量",
                        "editable": false
                    },
                    {
                        "field": "unitName",
                        "dataType": "String",
                        "title": "单位",
                        "editable": false
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "String",
                        "title": "单价",
                        "editable": false
                    },
                    {
                        "field": "amountMoney",
                        "dataType": "String",
                        "title": "金额",
                        "editable": false
                    },
                    {
                        "field": "isGift",
                        "dataType": "String",
                        "title": "赠品",
                        "editable": false,
                        "visible": false
                    },
                    {
                        "field": "stockOrgName",
                        "dataType": "String",
                        "title": "收货库存组织",
                        "visible": true,
                        "editable": false
                    },
                    {
                        "field": "receiveStorageName",
                        "dataType": "String",
                        "title": "收货仓库",
                        "visible": true,
                        "editable": false
                    },
                    {
                        "field": "receiverAdress",
                        "dataType": "String",
                        "title": "收货地址",
                        "visible": false,
                        "editable": false
                    },
                    {
                        "field": "receiver",
                        "dataType": "String",
                        "title": "收货联系人",
                        "visible": true,
                        "editable": false
                    },
                    {
                        "field": "receiverPhone",
                        "dataType": "String",
                        "title": "收货联系电话",
                        "visible": false,
                        "editable": false
                    },
                    {
                        "field": "storageCounts",
                        "dataType": "String",
                        "title": "累计入库数量",
                        "visible": false
                    }
                ]
            },
            grid10: {
                domid: "grid_purchasecargoorder10",
                umeta: {
                    "id": "grid_referpurchasecargoorderList_Sel",
                    "data": "selectedrefrtcargooderList",
                    "type": "grid",
                    "showNumCol": true,
                    "editable": false,
                },
                columns: [
                    {
                        "field": "orderCode",
                        "dataType": "String",
                        "title": "提货单号"
                    },
                    {
                        "field": "appointTackTime",
                        "dataType": "Date",
                        "title": "约定提货日期"
                    },
                    {
                        "field": "arrangeTime",
                        "dataType": "Date",
                        "title": "安排日期"
                    },
                    {
                        "field": "arrangePerson",
                        "dataType": "String",
                        "title": "安排人"
                    },
                    {
                        "field": "takeType",
                        "dataType": "Integer",
                        "title": "提货方类型",
                        "renderType": "takeTypeRender"
                    },
                    {
                        "field": "takeUnitName",
                        "dataType": "string",
                        "title": "提货单位"
                    },
                    {
                        "field": "counts",
                        "dataType": "String",
                        "title": "总数量"
                    },
                    {
                        "field": "moneys",
                        "dataType": "String",
                        "title": "总金额"
                    },
                    {
                        "field": "orderState",
                        "dataType": "String",
                        "title": "提货单状态",
                        "renderType": "stateRender"
                    },
                    {
                        "field": "preparedBy",
                        "dataType": "String",
                        "title": "制单人",
                        "visible": false
                    },
                    {
                        "field": "preparedByTime",
                        "dataType": "Date time",
                        "title": "制单时间",
                        "visible": false
                    },
                    {
                        "field": "approver",
                        "dataType": "String",
                        "title": "审批人",
                        "visible": false
                    },
                    {
                        "field": "approveTime",
                        "dataType": "Datetime",
                        "title": "审批时间",
                        "visible": false
                    },
                    {
                        "field": "creator",
                        "dataType": "String",
                        "title": "创建人",
                        "visible": false
                    },
                    {
                        "field": "creationTime",
                        "dataType": "Datetime",
                        "title": "创建时间",
                        "visible": false
                    },
                    {
                        "field": "modifier",
                        "dataType": "String",
                        "title": "最后修改人",
                        "visible": false
                    },
                    {
                        "field": "ts",
                        "dataType": "Datetime",
                        "title": "最后修改时间",
                        "visible": false
                    }
                ]
            },
            grid11: {
                domid: "grid_purchasecargoorder11",
                umeta: {
                    "id": "grid_referpurchasecargoorderListItem_Sel",
                    "data": "selectedrefrtcargooderListItem",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true,
                },
                columns: [
                    {
                        "field": "rowNum",
                        "dataType": "String",
                        "title": "行号"
                    },
                    {
                        "field": "purchaseOrder",
                        "dataType": "String",
                        "title": "采购单号",
                        "editable": false
                    },
                    {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                        "editable": false
                    },
                    {
                        "field": "goodsCode",
                        "dataType": "Date",
                        "title": "商品编号"
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称"
                    },
                    {
                        "field": "goodsVersion",
                        "dataType": "String",
                        "title": "商品版本",
                        "editable": false
                    },
                    {
                        "field": "theTakeCounts",
                        "dataType": "String",
                        "title": "本次提货数量",
                        "editable": false
                    },
                    {
                        "field": "unitName",
                        "dataType": "String",
                        "title": "单位",
                        "editable": false
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "String",
                        "title": "单价",
                        "editable": false
                    },
                    {
                        "field": "amountMoney",
                        "dataType": "String",
                        "title": "金额",
                        "editable": false
                    },
                    {
                        "field": "isGift",
                        "dataType": "String",
                        "title": "赠品",
                        "editable": false,
                        "visible": false
                    },
                    {
                        "field": "stockOrgName",
                        "dataType": "String",
                        "title": "收货库存组织",
                        "visible": true,
                        "editable": false
                    },
                    {
                        "field": "receiveStorageName",
                        "dataType": "String",
                        "title": "收货仓库",
                        "visible": true,
                        "editable": false
                    },
                    {
                        "field": "receiverAdress",
                        "dataType": "String",
                        "title": "收货地址",
                        "visible": false,
                        "editable": false
                    },
                    {
                        "field": "receiver",
                        "dataType": "String",
                        "title": "收货联系人",
                        "visible": true,
                        "editable": false
                    },
                    {
                        "field": "receiverPhone",
                        "dataType": "String",
                        "title": "收货联系电话",
                        "visible": false,
                        "editable": false
                    },
                    {
                        "field": "storageCounts",
                        "dataType": "String",
                        "title": "累计入库数量",
                        "visible": false
                    },
                    {
                        "field": "operation",
                        "dataType": "String",
                        "title": "操作",
                        "renderType": "rowRemove",
                        "fixed": true,
                        "width": "100px"
                    },
                ]
            },
        }
    }
    return new basemodel(model);
})