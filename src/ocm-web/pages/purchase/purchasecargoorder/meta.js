define(["ocm_basemodel"], function(basemodel) {
    var orderItemsmeta = {
        meta: {
            orderCode: {
                type: 'string',
                required: true
            }, //订单编码
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
            goodsNum: {
                type: 'float',
                required: true
            }, //数量
            orderDate: {
                type: 'Date',
                required: true
            }, //订单日期
            detailAddr: {
                type: 'string',
                required: true
            }, //收货地址
            orderTypeCode: {
                type: 'string',
                required: true
            }, //订单类型
            orderTypeName: {
                type: 'string',
                required: true
            }, //订单类型
            otherOrderNum: {
                type: 'string'
            }, //对方订单号
            supplierId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['suppliers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
            },
            supplierName: {
                type: 'string',
                required: true
            }, //供应商Name
            supplierCode: {
                type: 'string',
                required: true
            }, //供应商Code
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
            receiveStorageCode: {
                type: 'string',
            },
            rowNum: {
                type: 'string',
                required: true,
            },
            goodsName: {
                type: 'string',
            }, //商品名称
            goodsCode: {
                type: 'string',
            },
            goodsVersion: {
                type: 'string'
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
                type: 'integer'
            },
            receiveStorageName: {
                type: 'string'
            },
            receiveContact: {
                type: 'string'
            },
            receiveContactPhone: {
                type: 'string'
            },
        },
        pageSize: 10
    };
    var BomItemsmeta = {
        meta: {
            orderCode: {
                type: 'string',
                required: true
            }, //订单编码
            goodsId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
            }, //商品
            goodsName: {
                type: 'string',
                required: true
            }, //商品名称
            goodsCode: {
                type: 'string',
                required: true
            }, //商品Code
            goodsNum: {
                type: 'float',
                required: true
            }, //数量
            orderDate: {
                type: 'string',
                required: true
            }, //订单日期
            detailAddr: {
                type: 'string',
                required: true
            }, //收货地址
            orderTypeCode: {
                type: 'string',
                required: true
            }, //订单类型
            orderTypeName: {
                type: 'string',
                required: true
            }, //订单类型
            otherOrderNum: {
                type: 'string'
            }, //对方订单号
            supplierId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['suppliers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
            },
            supplierName: {
                type: 'string',
                required: true
            }, //供应商Name
            supplierCode: {
                type: 'string',
                required: true
            }, //供应商Code
            purchaseDeptId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['department']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
            },
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
                type: 'integer'
            },
            receiveContact: {
                type: 'string'
            },
            receiveContactPhone: {
                type: 'string'
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
            parentGoodsId: {
                type: 'string',
                required: true
            }, //商品
            parentGoodsCode: {
                type: 'string',
            }, //商品名称
            parentGoodsName: {
                type: 'string',
            }, //商品Code
            childGoodsQty: {
                type: 'float',
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
                        type: "string"
                    },
                    state: {
                        type: 'Integer',
                    },
                    // 单据编码
                    billCode: {
                        type: "string"
                    },
                    takeType: {
                        type: 'string',
                        default: "1",
                        required: true
                    },
                    // isEnable:{type:'string', default: "01"},
                    orderState: {
                        type: 'string',
                        default: "1"
                    },
                    appointTackTime: {
                        type: 'date',
                        required: true
                    },
                    arrangeTime: {
                        type: 'date',
                        required: true
                    },
                    arrangePerson: {
                        type: 'string',
                        required: true
                    },
                    counts: {
                        type: 'numberFloat',
                        default: "0.00"
                    },
                    moneys: {
                        type: 'priceFloat',
                        default: "0.00"
                    },


                    // 提货单位
                    takeUnit: {
                        type: 'string'
                    },
                    takeName: {
                        type: 'string'
                    },
                    takePhone: {
                        type: 'string'
                    },
                    takeUnitId: {
                        type: 'string',
                        // required: true,
                        'refmodel': JSON.stringify(refinfo['logistics-company']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    takeUnitCode: {
                        type: 'string'
                    },
                    takeUnitName: {
                        type: 'string'
                    },
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
                    billType: {
                        type: "string"
                    },
                    billTranType: {
                        type: "string"
                    },
                    // 库存商品id
                    goodsId: {
                        type: "string",
                        required: true
                    },
                    goodsName: {
                        type: 'string'
                    },
                    goodsCode: {
                        type: 'string'
                    },
                    goodsFullName: {
                        type: 'string'
                    },
                    purchaseOrder: {
                        type: 'string',
                        required: true
                    },
                    theTakeCounts: {
                        type: 'numberFloat',
                        required: true
                    }, //提货数量
                    unitId: {
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
                    goodsNum: {
                        type: 'numberFloat'
                    },
                    receiverAdress: {
                        type: "string",
                        required: true
                    }, // 收货地址
                    receiver: {
                        type: "string"
                    }, // 收货联系人
                    receiverPhone: {
                        type: "string"
                    }, // 收货联系电话
                    receiverPhoneSpare: {
                        type: "string"
                    },
                    takeContact: {
                        type: 'string'
                    },
                    pickupAddress: {
                        type: 'string',
                        required: true
                    },
                    takePhone: {
                        type: 'string'
                    },
                    storageCounts: {
                        type: "string"
                    },
                    receiveStorageId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    }, //收货仓库
                    receiveStorageName: {
                        type: 'string',
                    },
                    receiveStorageCode: {
                        type: 'string',
                    },
                    //收货库存组织
                    stockOrgId: {
                        type: 'string',
                        required: true,
                    },
                    stockOrgCode: {
                        type: 'string'
                    },
                    stockOrgName: {
                        type: 'string'
                    },
                    /* //入库仓库
                     stockInStorageId: {
                       type: 'string',
                       required: true,
                       'refmodel': JSON.stringify(refinfo['warehouse']),
                       "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
                     },
                     stockInStorageCode: {type: 'string'},
                     stockInStorageName: {type: 'string'},*/
                    //采购组织
                    purchaseOrgId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{"EQ_orgFuncRel":"04"}',
                    },
                    purchaseOrgName: {
                        type: 'string'
                    },
                    purchaseOrgCode: {
                        type: 'string'
                    },
                    //供应商
                    supplierId: {
                        type: 'string',
                        required: true
                    },
                    supplierName: {
                        type: 'string'
                    }, //供应商Name
                    supplierCode: {
                        type: 'string'
                    }, //供应商Code
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
                    remark: {
                        type: "string"
                    },
                    originalGoodsId: {
                        type: 'string',
                    }, //原始版本商品
                    goodsSelectionDescription: {
                        type: 'string',
                    }, //商品选项描述
                    goodsSelection: {
                        type: 'string',
                    }, //商品选配项
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
                    billType: {
                        type: "string"
                    },
                    billTranType: {
                        type: "string"
                    },
                    goodsId: {
                        type: 'string',
                        required: true
                    }, //商品
                    goodsName: {
                        type: 'string'
                    }, //商品名称
                    goodsCode: {
                        type: 'string'
                    }, //商品Code
                    goodsFullName: {
                        type: "string"
                    },
                    childGoodsQty: {
                        type: 'numberFloat',
                        required: true
                    }, //单位母件数量
                    supplierId: {
                        type: 'string',
                    },
                    supplierName: {
                        type: 'string',
                        required: true
                    }, //供应商Name
                    supplierCode: {
                        type: 'string',
                        required: true
                    }, //供应商Code
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
                    receiveStorageName: {
                        type: 'string',
                    },
                    receiveStorageCode: {
                        type: 'string',
                    },
                    purchaseOrder: {
                        type: 'string'
                    },
                    stockOrgId: {
                        type: 'string',
                        required: true,
                    }, //收货库存组织
                    stockOrgCode: {
                        type: 'string'
                    },
                    stockOrgName: {
                        type: 'string'
                    },

                    //采购组织
                    purchaseOrgId: {
                        type: 'string',
                        required: true,
                    },
                    purchaseOrgName: {
                        type: 'string'
                    },
                    theTakeCounts: {
                        type: 'numberFloat'
                    }, //提货数量
                    unitId: {
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
                        type: 'integer'
                    },
                    receiverAdress: {
                        type: 'string',
                        required: true
                    },
                    receiver: {
                        type: 'string'
                    },
                    receiverPhone: {
                        type: 'string'
                    },
                    receiverPhoneSpare: {
                        type: "string"
                    },
                    storageCounts: {
                        type: 'string'
                    }, //累计入库数量
                    takeContact: {
                        type: 'string'
                    },
                    pickupAdress: {
                        type: 'string',
                        required: true
                    },
                    takePhone: {
                        type: 'string'
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
                    parentGoodsId: {
                        type: 'string'
                    }, //商品
                    parentGoodsCode: {
                        type: 'string',
                    }, //商品名称
                    parentGoodsName: {
                        type: 'string',
                    }, //商品Code
                    parentRowNum: {
                        type: 'string',
                    }, //母件行号
                },
                pageSize: 10
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
                    purchaseOrgCode: {
                        type: 'string'
                    },
                    purchaseOrgName: {
                        type: 'string'
                    },
                    tranTypeId: {
                        type: 'string',
                        required: true,
                        default: "PurchaseBill",
                        'refmodel': JSON.stringify(refinfo['trantype']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"订单类型"}',
                        'refparam': '{"EQ_billTypeId":"PurchaseBill"}'
                    }, //交易id
                    tranTypeName: {
                        type: 'string'
                    }, //交易Name
                    tranTypeCode: {
                        type: 'string'
                    }, //交易Code
                    orderCode: {
                        type: 'string',
                        required: true
                    }, //订单编码
                    otherOrderNum: {
                        type: 'string'
                    }, //对方订单号
                    orderDate: {
                        type: 'Date',
                        required: true
                    }, //订单日期
                    purchaseType: {
                        type: 'string',
                        required: true
                    }, //采购类型
                    supplierId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}',
                    }, //供应商
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
                        type: 'string'
                    }, //采购员Code
                    purchasePersonName: {
                        type: 'string'
                    }, //采购员Name
                    purchaseDeptId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['department']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
                    },
                    purchaseDeptCode: {
                        type: "string"
                    },
                    purchaseDeptName: {
                        type: "string"
                    },
                    totalGoodsNum: {
                        type: 'numberFloat',
                        required: true
                    }, //总数量
                    totalAmountMoney: {
                        type: 'priceFloat',
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
                    currencyCode: {
                        type: 'string',
                        required: true
                    },
                    status: {
                        type: 'string',
                        required: true,
                        default: 1
                    }, //单据状态
                    remark: {
                        type: 'string'
                    }, //备注
                },
                pageSize: 10
            },
            referPurchaseorderitem: orderItemsmeta,
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "takeCargoItems--purchaseOrg",
                label: "采购组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "04"
                }
            }, {
                type: "text",
                key: "orderCode",
                label: "提货单号"
            }, {
                type: "daterange",
                key: "appointTackTime",
                label: "约定提货日期"
            }, {
                type: "refer",
                key: "arrangePerson",
                label: "安排人",
                refinfo: "person",
            }, {
                type: "combo",
                key: "takeType",
                label: "提货方类型",
                dataSource: [{
                    value: "1",
                    name: "物流公司"
                }, {
                    value: "2",
                    name: "个体"
                }],
            }, {
                type: "refer",
                key: "takeUnitId",
                label: "提货单位",
                refinfo: "logistics-company",
                domid: "storehouse"
            }, {
                type: "combo",
                key: "billStatus",
                label: "提货单状态",
                dataSource: [{
                    value: "1",
                    name: "待处理"
                }, {
                    value: "2",
                    name: "已提交"
                }, {
                    value: "3",
                    name: "审批中"
                }, {
                    value: "4",
                    name: "审批通过"
                }, {
                    value: "5",
                    name: "审批不通过"
                }, {
                    value: "6",
                    name: "部分入库"
                }, {
                    value: "7",
                    name: "全部入库"
                }, {
                    value: "8",
                    name: "部分出库"
                }, {
                    value: "9",
                    name: "全部出库"
                }, ],
            }, ],
            search2: [{
                type: "text",
                key: "orderCode",
                label: "订单编号"
            }, {
                type: "daterange",
                key: "orderDate",
                label: "订单日期"
            }, {
                type: "text",
                key: "otherOrderNum",
                label: "对方订单号"
            }, {
                type: "refer",
                key: "supplierId",
                label: "供应商",
                refinfo: "suppliers"
            }, {
                type: "refer",
                key: "orderItems--receiveStorageOrgId",
                label: "收货库存组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "04"
                }
            }, {
                type: "refer",
                key: "orderItems--receiveStorageId",
                label: "收货仓库",
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
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle"
            }, ],
            button2: [{
                key: "cancel",
                label: "取消",
                click: "backFun"
            }, {
                key: "save",
                label: "保存",
                click: "saveBill",
                cls: "ui-btn-green"
            }],
            button3: [{
                key: "return",
                label: "返回",
                click: "backFun"
            }, {
                key: "edit",
                label: "编辑",
                click: "detail2bill",
                cls: "ui-btn-green",
            }]
        },
        cards: {
            card1: [{
                    type: "textreadonly",
                    key: "orderCode",
                    label: "提货单号",
                    domid: "orderCode"
                }, {
                    type: "date",
                    key: "appointTackTime",
                    label: "约定提货日期"
                }, {
                    type: "date",
                    key: "arrangeTime",
                    label: "安排日期"
                }, {
                    type: "text",
                    key: "arrangePerson",
                    label: "安排人"
                }, {
                    type: "combo",
                    key: "takeType",
                    label: "提货方类型",
                    defaultvalue: "1",
                    dataSource: [{
                        value: "1",
                        name: "物流公司"
                    }, {
                        value: "2",
                        name: "个体"
                    }],
                    enable: false
                }, {
                    type: "refer",
                    key: "takeUnitId",
                    label: "提货单位",
                    referId: "takeUnitId",
                    refName: "提货单位"
                }, {
                    type: "text",
                    key: "takeName",
                    label: "提货方姓名"
                }, {
                    type: "text",
                    key: "takePhone",
                    label: "提货方手机号"
                }, {
                    type: "text",
                    key: "plateNO",
                    label: "提货方车牌号"
                }, {
                    type: "combo",
                    key: "orderState",
                    label: "单据状态",
                    defaultvalue: "1",
                    dataSource: [{
                        value: "1",
                        name: "待处理"
                    }, ],
                    enable: false
                },

                {
                    type: "combo",
                    key: "state",
                    label: "审批状态",
                    defaultvalue: "0",
                    dataSource: [{
                        value: "0",
                        name: "待处理"
                    }],
                    enable: false
                }, {
                    type: "textreadonly",
                    key: "counts",
                    label: "本次提货总数量",
                }, {
                    type: "textreadonly",
                    key: "moneys",
                    label: "总金额"
                }, {
                    type: "textarea",
                    key: "remark",
                    label: "备注",
                    cls: "ui-textarea-item"
                }
            ]
        },
        details: {
            detail1: [{
                key: "orderCode",
                label: "提货单号"
            }, {
                key: "appointTackTime",
                label: "约定提货日期",
            }, {
                key: "arrangeTime",
                label: "安排日期"
            }, {
                key: "arrangePerson",
                label: "安排人"
            }, {
                key: "takeType",
                label: "提货方类型",
                computed: "takeType",
            }, {
                key: "takeUnitName",
                label: "提货单位"
            }, {
                key: "takeName",
                label: "提货方姓名"
            }, {
                key: "takePhone",
                label: "提货方手机号"
            }, {
                key: "plateNO",
                label: "提货方车牌号"
            }, {
                key: "counts",
                label: "总数量"
            }, {
                key: "moneys",
                label: "总金额"
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
                    data: "takeCargoList",
                    type: "grid",
                    editable: false,
                    multiSelect: true
                },
                columns: [{
                    field: "orderCode",
                    dataType: "String",
                    title: "提货单号",
                    renderType: "detailRender"
                }, {
                    field: "appointTackTime",
                    dataType: "Date",
                    title: "约定提货日期",
                }, {
                    field: "arrangeTime",
                    dataType: "Date",
                    title: "安排日期",
                }, {
                    field: "arrangePerson",
                    dataType: "String",
                    title: "安排人"
                }, {
                    field: "takeType",
                    dataType: "Integer",
                    title: "提货方类型",
                    renderType: "takeTypeDetail"
                }, {
                    field: "takeUnitName",
                    dataType: "Integer",
                    title: "提货单位",
                }, {
                    field: "counts",
                    dataType: "String",
                    title: "总数量"
                }, {
                    field: "moneys",
                    dataType: "String",
                    title: "总金额",
                }, {
                    field: "orderState",
                    dataType: "String",
                    title: "提货单状态",
                    renderType: "statusRender"
                }, {
                    field: "state",
                    dataType: "String",
                    title: "审批状态",
                    renderType: "approveStateRender"
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
                }]
            },

            //商品信息
            gridGoodsEdit: {
                domid: "grid_saleout2",
                umeta: {
                    id: "grid_complex_edit",
                    data: "takeCargoItems",
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
                        field: "purchaseOrder",
                        title: "采购单号",
                        dataType: "String",
                        editable: false
                    }, {
                        field: "supplierName",
                        title: "供应商",
                        dataType: "String",
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
                        "field": "goodsVersion",
                        "dataType": "String",
                        "title": "商品多版本",
                        "editable": false,
                    }, {
                        field: "theTakeCounts",
                        dataType: "float",
                        title: "提货数量",
                    }, {
                        field: "unitName",
                        dataType: "String",
                        title: "单位",
                        editable: false
                    }, {
                        field: "unitPrice",
                        dataType: "float",
                        title: "单价",
                        editable: false
                    },
                    /*{
                        field: "isGift",
                        dataType: "Integer",
                        title: "赠品",
                        renderType: "disableBooleanRender",
                        editable: false
                    },*/

                    {
                        field: "amountMoney",
                        dataType: "float",
                        title: "金额",
                        editable: false
                    }, {
                        field: "goodsSelection",
                        dataType: "String",
                        title: "商品选配",
                        renderType: "goodsOptDetails",
                        editable: false,
                    }, {
                        field: "stockOrgName",
                        dataType: "String",
                        title: "收货库存组织",
                        editable: false
                    }, {
                        field: "purchaseOrgName",
                        dataType: "String",
                        title: "采购组织",
                        editable: false
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
                    },
                    /* {
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
                     },*/
                    /*{
                        "field": "batchNumId",
                        "dataType": "String",
                        "title": "批次号",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "batchNumCode",
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
                    },*/
                    {
                        field: "receiverAdress",
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
                        field: "takeContact",
                        dataType: "String",
                        title: "提货联系人",
                    }, {
                        field: "pickupAddress",
                        dataType: "String",
                        title: "提货地址",
                        "editOptions": {
                            "required": true,
                        }
                    }, {
                        field: "takePhone",
                        dataType: "String",
                        title: "提货联系电话",
                    }, {
                        field: "storageCounts",
                        dataType: "String",
                        title: "累计入库数量",
                        editable: false
                    },
                    /* {
                         field: "planDeliveryDate",
                         dataType: "date",
                         title: "计划发货日期",
                         editType: "date",
                         editable: false
                     },
                     {
                         field: "arrivalDate",
                         dataType: "date",
                         title: "要求到货日期",
                         editType: "date",
                         editable: false
                     },*/
                    {
                        field: "remark",
                        dataType: "String",
                        title: "行备注"
                    }
                ]
            },
            gridGoodsDetail: {
                domid: "grid_saleoutorder3",
                umeta: {
                    id: "grid_complex_detail",
                    data: "takeCargoItems",
                    type: "grid",
                    editable: false,
                    multiSelect: false
                },
                columns: [{
                        field: "rowNum",
                        dataType: "Integer",
                        title: "行号"
                    }, {
                        field: "purchaseOrder",
                        title: "采购单号",
                        dataType: "String",
                    }, {
                        field: "supplierName",
                        title: "供应商",
                        dataType: "String",
                    }, {
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码",
                    }, {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称",
                    }, {
                        "field": "goodsVersion",
                        "dataType": "String",
                        "title": "商品多版本",
                    }, {
                        field: "theTakeCounts",
                        dataType: "float",
                        title: "提货数量",
                    }, {
                        field: "unitName",
                        dataType: "String",
                        title: "单位",
                    }, {
                        field: "unitPrice",
                        dataType: "float",
                        title: "单价",
                    },
                    /*{
                        field: "isGift",
                        dataType: "Integer",
                        title: "赠品",
                        renderType: "disableBooleanRender",
                        editable: false
                    },*/

                    {
                        field: "amountMoney",
                        dataType: "string",
                        title: "金额",
                    }, {
                        field: "goodsSelection",
                        dataType: "String",
                        title: "商品选配",
                        renderType: "goodsOptDetails",
                    }, {
                        field: "stockOrgName",
                        dataType: "String",
                        title: "收货库存组织",
                    }, {
                        field: "purchaseOrgName",
                        dataType: "String",
                        title: "采购组织",
                    }, {
                        "field": "receiveStorageName",
                        "dataType": "String",
                        "title": "收货仓库",
                    }, {
                        "field": "projectName",
                        "dataType": "String",
                        "title": "项目",
                        "visible": false,
                    },
                    /* {
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
                     },*/
                    /*{
                        "field": "batchNumId",
                        "dataType": "String",
                        "title": "批次号",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "batchNumCode",
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
                    },*/
                    {
                        field: "receiverAdress",
                        dataType: "String",
                        title: "收货地址",
                    }, {
                        field: "receiver",
                        dataType: "String",
                        title: "收货联系人",
                    }, {
                        field: "receiverPhone",
                        dataType: "String",
                        title: "收货人电话",
                    }, {
                        field: "takeContact",
                        dataType: "String",
                        title: "提货联系人",
                    }, {
                        field: "pickupAddress",
                        dataType: "String",
                        title: "提货地址",
                        "editOptions": {
                            "required": true,
                        }
                    }, {
                        field: "takePhone",
                        dataType: "String",
                        title: "提货联系电话",
                    }, {
                        field: "storageCounts",
                        dataType: "String",
                        title: "累计入库数量",
                    },
                    /* {
                         field: "planDeliveryDate",
                         dataType: "date",
                         title: "计划发货日期",
                         editType: "date",
                         editable: false
                     },
                     {
                         field: "arrivalDate",
                         dataType: "date",
                         title: "要求到货日期",
                         editType: "date",
                         editable: false
                     },*/
                    {
                        field: "remark",
                        dataType: "String",
                        title: "行备注"
                    }
                ]
            },

            //bom结构信息
            gridBomEdit: {
                domid: "grid_takeCargoBomEdit",
                umeta: {
                    id: "grid_complex_BomEdit",
                    data: "BomItems",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    "onBeforeEditFun": "beforeEditCheck"
                },
                columns: [{
                        field: "rowNum",
                        title: "行号",
                        dataType: "Integer",
                    }, {
                        field: "parentRowNum",
                        title: "所属商品行号",
                        dataType: "Integer",
                        editable: false
                    }, {
                        "field": "parentGoodsName",
                        "dataType": "String",
                        "title": "母件商品名称",
                    }, {
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码",
                    }, {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称",
                    }, {
                        "field": "goodsVersion",
                        "dataType": "String",
                        "title": "商品多版本",
                    }, {
                        field: "theTakeCounts",
                        dataType: "float",
                        title: "提货数量",
                    }, {
                        field: "unitName",
                        dataType: "String",
                        title: "单位",
                    }, {
                        field: "unitPrice",
                        dataType: "float",
                        title: "单价",
                    },
                    /*{
                        field: "isGift",
                        dataType: "Integer",
                        title: "赠品",
                        renderType: "disableBooleanRender",
                        editable: false
                    },*/

                    {
                        field: "amountMoney",
                        dataType: "float",
                        title: "金额",
                    },
                    /* {
                         field: "goodsSelection",
                         dataType: "String",
                         title: "商品选配",
                         renderType: "goodsOpt",
                     },
                     {
                         field: "stockOrgName",
                         dataType: "String",
                         title: "收货库存组织",
                     },
                     {
                         field: "purchaseOrgName",
                         dataType: "String",
                         title: "采购组织",
                     },
                     {
                         "field": "receiveStorageId",
                         "dataType": "String",
                         "title": "收货仓库",
                         "renderType": "ncReferRender",
                         "editType": "ncReferEditType",
                         "showField": "receiveStorageName",
                         "editOptions": {
                             "validType": "string"
                         },
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
                         "visible": false,
                     },*/
                    /* {
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
                     },*/
                    /*{
                        "field": "batchNumId",
                        "dataType": "String",
                        "title": "批次号",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "batchNumCode",
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
                    },*/
                    /* {
                         field: "receiverAddress",
                         dataType: "String",
                         title: "收货地址",
                     },
                     {
                         field: "receiver",
                         dataType: "String",
                         title: "收货联系人",
                     },
                     {
                         field: "receiverPhone",
                         dataType: "String",
                         title: "收货人电话",
                     },
                     {
                         field: "takeContact",
                         dataType: "String",
                         title: "提货联系人",
                     },
                     {
                         field: "pickupAddress",
                         dataType: "String",
                         title: "提货地址",
                         "editOptions": {
                             "required": true,
                         }
                     },
                     {
                         field: "takePhone",
                         dataType: "String",
                         title: "提货联系电话",
                     },
                     {
                         field: "storageCounts",
                         dataType: "String",
                         title: "累计入库数量",
                     },*/
                    /* {
                         field: "planDeliveryDate",
                         dataType: "date",
                         title: "计划发货日期",
                         editType: "date",
                         editable: false
                     },
                     {
                         field: "arrivalDate",
                         dataType: "date",
                         title: "要求到货日期",
                         editType: "date",
                         editable: false
                     },*/
                    /* {
                         field: "remark",
                         dataType: "String",
                         title: "行备注"
                     }*/
                ]
            },
            gridBomDetail: {
                domid: "grid_grid_takeCargoBomDetail",
                umeta: {
                    id: "grid_complex_bomDetail",
                    data: "BomItems",
                    type: "grid",
                    editable: false,
                    multiSelect: false
                },
                columns: [{
                        field: "rowNum",
                        title: "行号",
                        dataType: "Integer",
                    }, {
                        field: "parentRowNum",
                        title: "所属商品行号",
                        dataType: "Integer",
                        editable: false
                    }, {
                        "field": "parentGoodsName",
                        "dataType": "String",
                        "title": "母件商品名称",
                    }, {
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码",
                    }, {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称",
                    }, {
                        "field": "goodsVersion",
                        "dataType": "String",
                        "title": "商品多版本",
                    }, {
                        field: "theTakeCounts",
                        dataType: "float",
                        title: "提货数量",
                    }, {
                        field: "unitName",
                        dataType: "String",
                        title: "单位",
                    }, {
                        field: "unitPrice",
                        dataType: "float",
                        title: "单价",
                    },
                    /*{
                        field: "isGift",
                        dataType: "Integer",
                        title: "赠品",
                        renderType: "disableBooleanRender",
                        editable: false
                    },*/

                    {
                        field: "amountMoney",
                        dataType: "float",
                        title: "金额",
                    },
                    /* {
                         field: "goodsSelection",
                         dataType: "String",
                         title: "商品选配",
                         renderType: "goodsOpt",
                     },
                     {
                         field: "stockOrgName",
                         dataType: "String",
                         title: "收货库存组织",
                     },
                     {
                         field: "purchaseOrgName",
                         dataType: "String",
                         title: "采购组织",
                     },
                     {
                         "field": "receiveStorageId",
                         "dataType": "String",
                         "title": "收货仓库",
                         "renderType": "ncReferRender",
                         "editType": "ncReferEditType",
                         "showField": "receiveStorageName",
                         "editOptions": {
                             "validType": "string"
                         },
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
                         "visible": false,
                     },*/
                    /* {
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
                     },*/
                    /*{
                        "field": "batchNumId",
                        "dataType": "String",
                        "title": "批次号",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "batchNumCode",
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
                    },*/
                    /* {
                         field: "receiverAddress",
                         dataType: "String",
                         title: "收货地址",
                     },
                     {
                         field: "receiver",
                         dataType: "String",
                         title: "收货联系人",
                     },
                     {
                         field: "receiverPhone",
                         dataType: "String",
                         title: "收货人电话",
                     },
                     {
                         field: "takeContact",
                         dataType: "String",
                         title: "提货联系人",
                     },
                     {
                         field: "pickupAddress",
                         dataType: "String",
                         title: "提货地址",
                         "editOptions": {
                             "required": true,
                         }
                     },
                     {
                         field: "takePhone",
                         dataType: "String",
                         title: "提货联系电话",
                     },
                     {
                         field: "storageCounts",
                         dataType: "String",
                         title: "累计入库数量",
                     },*/
                    /* {
                         field: "planDeliveryDate",
                         dataType: "date",
                         title: "计划发货日期",
                         editType: "date",
                         editable: false
                     },
                     {
                         field: "arrivalDate",
                         dataType: "date",
                         title: "要求到货日期",
                         editType: "date",
                         editable: false
                     },*/
                    /* {
                         field: "remark",
                         dataType: "String",
                         title: "行备注"
                     }*/
                ]
            },

            //拉单弹窗相关grid元数据
            grid4: {
                domid: "grid_saleout4",
                umeta: {
                    id: "grid_referList",
                    data: "referPurchaseorderList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    onRowSelected: "referSelectHandle",
                    onRowUnSelected: "referUnSelectHandle",
                },
                columns: [{
                        "field": "orderCode",
                        "dataType": "String",
                        "title": "订单编号",
                    }, {
                        "field": "orderDate",
                        "dataType": "Date",
                        "title": "订单日期",
                    }, {
                        "field": "otherOrderNum",
                        "dataType": "String",
                        "title": "对方订单号"
                    }, {
                        "field": "purchaseOrgName",
                        "dataType": "String",
                        "title": "采购组织",
                    }, {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                    }, {
                        "field": "purchasePersonName",
                        "dataType": "String",
                        "title": "采购员",
                    }, {
                        "field": "purchaseDeptName",
                        "dataType": "String",
                        "title": "采购部门",
                    },
                    /*{
                        "field": "totalGoodsNum",
                        "dataType": "float",
                        "title": "总数量",
                    },*/
                    {
                        "field": "totalAmountMoney",
                        "dataType": "float",
                        "title": "总金额",
                    }, {
                        "field": "status",
                        "dataType": "string",
                        "title": "订单状态",
                        "renderType": "statusRender",
                    }, {
                        "field": "remark",
                        "dataType": "string",
                        "title": "备注",
                    },
                ]
            },
            grid5: {
                domid: "grid_saleout5",
                umeta: {
                    id: "grid_referListItem",
                    data: "referPurchaseorderitemList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    "onRowSelected": "referSelectItemHandle",
                    "onRowUnSelected": "referUnSelectItemHandle",
                },
                columns: [{
                        field: "rowNum",
                        dataType: "String",
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
                        field: "goodsVersion",
                        dataType: "String",
                        title: "商品版本"
                    }, {
                        field: "addStorageAmount",
                        dataType: "float",
                        title: "可安排数量"
                    }, {
                        field: "unitPrice",
                        dataType: "cargoOrder",
                        title: "单价"
                    }, {
                        field: "amountMoney",
                        dataType: "String",
                        title: "金额"
                    },

                    {
                        field: "receiveStorageOrgName",
                        dataType: "String",
                        title: "收货库存组织"
                    }, {
                        field: "customerName",
                        dataType: "String",
                        title: "收货客户"
                    }, {
                        field: "receiveStorageName",
                        dataType: "String",
                        title: "收货仓库"
                    }, {
                        field: "receiveAddress",
                        dataType: "String",
                        title: "收货地址"
                    },
                ]
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
                        "field": "orderCode",
                        "dataType": "String",
                        "title": "订单编号",
                    }, {
                        "field": "orderDate",
                        "dataType": "Date",
                        "title": "订单日期",
                    }, {
                        "field": "otherOrderNum",
                        "dataType": "String",
                        "title": "对方订单号"
                    }, {
                        "field": "purchaseOrgName",
                        "dataType": "String",
                        "title": "采购组织",
                    }, {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                    }, {
                        "field": "purchasePersonName",
                        "dataType": "String",
                        "title": "采购员",
                    }, {
                        "field": "purchaseDeptName",
                        "dataType": "String",
                        "title": "采购部门",
                    },
                    /*{
                        "field": "totalGoodsNum",
                        "dataType": "float",
                        "title": "总数量",
                    },*/
                    {
                        "field": "totalAmountMoney",
                        "dataType": "float",
                        "title": "总金额",
                    }, {
                        "field": "status",
                        "dataType": "string",
                        "title": "订单状态",
                        "renderType": "statusRender",
                    }, {
                        "field": "remark",
                        "dataType": "string",
                        "title": "备注",
                    },
                ]
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
                        field: "rowNum",
                        dataType: "String",
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
                        field: "goodsVersion",
                        dataType: "String",
                        title: "商品版本"
                    }, {
                        field: "addStorageAmount",
                        dataType: "String",
                        title: "可安排数量"
                    }, {
                        field: "unitPrice",
                        dataType: "String",
                        title: "单价"
                    }, {
                        field: "amountMoney",
                        dataType: "String",
                        title: "金额"
                    },

                    {
                        field: "receiveStorageOrgName",
                        dataType: "String",
                        title: "收货库存组织"
                    }, {
                        field: "customerName",
                        dataType: "String",
                        title: "收货客户"
                    }, {
                        field: "receiveStorageName",
                        dataType: "String",
                        title: "收货仓库"
                    }, {
                        field: "receiveAddress",
                        dataType: "String",
                        title: "收货地址"
                    },
                ]
            },
        }
    };
    return new basemodel(model);
});