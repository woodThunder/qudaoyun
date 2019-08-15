define(["ocm_basemodel"], function (basemodel) {
    'use strict';

    var discountAdjustIteammeta={

    }
    var discountAdjustDetailmeta = {
        // 价目表维护ID
        discountAdjustId: {
            type: 'string'
        },
        detailSelect: {
            type: 'integer'
        },
        // 商品ID
        goodsId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goods-no-version']),
            'refcfg': '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isEnable":"1"}'
        },
        // 商品编码
        goodsCode: {
            type: 'string'
        },
        // 商品名称
        goodsName: {
            type: 'string'
        },
        // 商品名称
        goodsFullName: {
            type: 'string'
        },
        // 产品ID
        productId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['product']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
        },
        // 产品编码
        productCode: {
            type: 'string'
        },
        // 产品名称
        productName: {
            type: 'string'
        },
        // 品牌ID
        brandId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['brand']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
        },
        // 品牌编码
        brandCode: {
            type: 'string'
        },
        // 品牌名称
        brandName: {
            type: 'string'
        },
        // 商品分类ID
        goodsCategoryId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goodsCategory']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
        },
        // 商品分类编码
        goodsCategoryCode: {
            type: 'string'
        },
        // 商品分类名称
        goodsCategoryName: {
            type: 'string'
        },
        // 客户ID
        customerId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['customer']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
        },
        // 客户编码
        customerCode: {
            type: 'string'
        },
        // 客户名称
        customerName: {
            type: 'string'
        },
        // 客户分类ID
        customerCategoryId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['customer_category']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
        },
        // 客户分类编码
        customerCategoryCode: {
            type: 'string'
        },
        // 客户分类名称
        customerCategoryName: {
            type: 'string'
        },
        // 门店ID
        shopId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['shopref']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
        },
        // 门店编码
        shopCode: {
            type: 'string'
        },
        // 门店名称
        shopName: {
            type: 'string'
        },
        // 平台店铺
    /*    platstoreId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['b2cStoreRef2']),
            'refcfg': '{"ctx":"/uitemplate_web"}'
        },
        platstoreName: {
            type: 'string'
        },
        platstoreCode: {
            type: 'string'
        },*/
        //   产品线ID
        productLineId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['productLine']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
        },
        // 产品线编码
        productLineCode: {
            type: 'string'
        },
        // 产品线名称
        productLineName: {
            type: 'string'
        },
        // 币种ID
        currencyId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['currency']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
        },
        // 币种编码
        currencyCode: {
            type: 'string'
        },
        // 币种名称
        currencyName: {
            type: 'string'
        },
        // 前端冗余使用，给批量添加
        priceIndex: {
            type: 'string'
        },
        priceAdd: {
            type: 'string'
        },
        //价格项
        detailItemId1: {
            type: 'string'
        },
        detailItemName1: {
            type: 'string'
        },
        //原价格
        basePrice1: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex1: {
            type: 'string'
        },
       //元价格加成
        originalDiscountAdd1: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice1: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex1: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd1: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice1: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio1: {
            type: 'string'
        },

        //价格项
        detailItemId2: {
            type: 'string'
        },
        detailItemName2: {
            type: 'string'
        },
        //原价格
        basePrice2: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex2: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd2: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice2: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex2: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd2: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice2: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio2: {
            type: 'string'
        },

        //价格项
        detailItemId3: {
            type: 'string'
        },
        detailItemName3: {
            type: 'string'
        },
        //原价格
        basePrice3: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex3: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd3: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice3: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex3: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd3: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice3: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio3: {
            type: 'string'
        },

        //价格项
        detailItemId4: {
            type: 'string'
        },
        detailItemName4: {
            type: 'string'
        },
        //原价格
        basePrice4: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex4: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd4: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice4: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex4: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd4: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice4: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio4: {
            type: 'string'
        },

        //价格项
        detailItemId5: {
            type: 'string'
        },
        detailItemName5: {
            type: 'string'
        },
        //原价格
        basePrice5: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex5: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd5: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice5: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex5: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd5: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice5: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio5: {
            type: 'string'
        },

        //价格项
        detailItemId6: {
            type: 'string'
        },
        detailItemName6: {
            type: 'string'
        },
        //原价格
        basePrice6: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex6: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd6: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice6: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex6: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd6: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice6: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio6: {
            type: 'string'
        },

        //价格项
        detailItemId7: {
            type: 'string'
        },
        detailItemName7: {
            type: 'string'
        },
        //原价格
        basePrice7: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex7: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd7: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice7: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex7: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd7: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice7: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio7: {
            type: 'string'
        },

        //价格项
        detailItemId8: {
            type: 'string'
        },
        detailItemName8: {
            type: 'string'
        },
        //原价格
        basePrice8: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex8: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd8: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice8: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex8: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd8: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice8: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio8: {
            type: 'string'
        },

        //价格项
        detailItemId9: {
            type: 'string'
        },
        detailItemName9: {
            type: 'string'
        },
        //原价格
        basePrice9: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex9: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd9: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice9: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex9: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd9: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice9: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio9: {
            type: 'string'
        },


        //价格项
        detailItemId10: {
            type: 'string'
        },
        detailItemName10: {
            type: 'string'
        },
        //原价格
        basePrice10: {
            type: 'string'
        },
        //原价格指数
        originalDiscountIndex10: {
            type: 'string'
        },
        //元价格加成
        originalDiscountAdd10: {
            type: 'string'
        },
        //原折后价格
        originalDiscountPrice10: {
            type: 'string'
        },
        //新价格指数
        newDiscountIndex10: {
            type: 'string'
        },
        //新价格加成
        newDiscountAdd10: {
            type: 'string'
        },
        //新折后价格
        newDiscountPrice10: {
            type: 'string'
        },
        //调价比例
        priceAdjustRatio10: {
            type: 'string'
        },
        discountAdjustIteammeta: {
            meta: discountAdjustIteammeta,
            pageSize: 10,
        }
    };
    var model = {
        metas: {
            discountAdjustmeta: {
                meta: {
                    id: {
                        type: 'string',
                    }, //id
                    // 调整单号
                    adjustNumber: {
                        type: 'string',
                    },
                    // 销售组织
                    organizationId: {
                        type: 'string',
                        required: true
                    },
                    organizationCode: {
                        type: 'string',
                    },
                    organizationName: {
                        type: 'string',
                    },
                    // 价目表
                    priceMaintainId: {
                        type: 'string',
                        required: true
                    },
                    priceMaintainName: {
                        type: 'string',
                    },
                    //  折扣单
                    priceDiscountId: {
                        type: 'string',
                        required: true
                    },
                    priceDiscountName: {
                        type: 'string',
                    },
                    // 调整日期
                    adjustTime: {
                        type: 'datetime',
                    },
                    // 生效日期
                    effectTime: {
                        type: 'datetime',
                    },
                    // 审核状态
                    auditStatus: {
                        type: 'string',
                        default: '0'
                    },
                    // 审批状态
                    state: {
                        type: 'string',
                        default: '0'
                    },
                    // 生效状态
                    taskStatus: {
                        type: 'string',
                        default: '0'
                    },
                    creator: {
                        type: 'string',
                    },
                    modifier: {
                        type: 'string',
                    },
                    creationTime: {
                        type: 'datetime',
                    },
                    modifiedTime: {
                        type: 'datetime',
                    },
                    adjustDiscountItems: {
                        type: 'child',
                        meta: discountAdjustDetailmeta
                    },
                    operation: {
                        type: 'string'
                    }
                },
                pageSize: 10,
            },
            discountAdjustDetailmeta: {
                meta: discountAdjustDetailmeta,
                pageSize: 10,
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "showAddBillPanel"
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
                {
                    key: "disapprove",
                    label: "审批不通过",
                    iconCls: "icon-tubiao-shenhe",
                    click: "disapprove"
                },
                {
                    key: "cancelApprove",
                    label: "取消审批",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "cancelapprove"
                }/*,
                {
                    key: "audit",
                    label: "审核",
                    iconCls: "icon-tubiao-shenhe",
                    click: "audit"
                },
                {
                    key: "reject",
                    label: "驳回",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "reject"
                }*/
            ],
            button2: [{
                    key: "cancel",
                    label: "取消",
                    click: "cancelBill"
                },
                {
                    key: "save",
                    label: "保存",
                    click: "saveAdjust",
                    cls: "ui-btn-green"
                }
            ],
            button3: [{
                    key: "addrow",
                    label: "增行",
                    iconCls: "icon-plus",
                    click: "addItem"
                },
                {
                    key: "delrow",
                    label: "删行",
                    iconCls: "icon-shanchu1",
                    click: "delItems",
                }
            ],
            button5: [{
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
        },
        searchs: {
            search1: [{
                    type: "text",
                    key: "adjustNumber",
                    label: "调整单号",
                },
                {
                    type: "refer",
                    key: "organization",
                    refinfo: "organization_ocm",
                    label: "销售组织",
                    refName: "销售组织",
                    refparam: {
                        "EQ_orgFuncRel": "01",
                    }
                },
                {
                    type: "refer",
                    key: "priceMaintain--id",
                    label: "价目表",
                    refinfo: "priceMaintain",
                    disableFilter: true,
                    refName: "价目表",
                },
                {
                    type: "daterange",
                    key: "adjustTime",
                    label: "调整日期",
                },
                {
                    type: "daterange",
                    key: "effectTime",
                    label: "生效日期",
                },
            ],
            search2: [{
                    type: "refer",
                    key: "goods",
                    label: "商品",
                    refinfo: "goods-no-version"
                },
                {
                    type: "refer",
                    key: "product",
                    label: "产品",
                    refinfo: "product"
                },
                {
                    type: "refer",
                    key: "brand",
                    label: "品牌",
                    refinfo: "brand"
                },
                {
                    type: "refer",
                    key: "goodsCategory",
                    label: "商品分类",
                    refinfo: "goodsCategory"
                },
                {
                    type: "refer",
                    key: "customer",
                    label: "客户",
                    refinfo: "customer"
                },
                {
                    type: "refer",
                    key: "customerCategory",
                    label: "客户分类",
                    refinfo: "customer_category"
                },
                {
                    type: "refer",
                    key: "shop",
                    label: "门店",
                    refinfo: "shopref"
                },
            ]
        },
        cards: {
            card1: [{
                    type: "textreadonly",
                    key: "adjustNumber",
                    label: "调整单号",
                    domid: "adjustNumber"
                },
                {
                    type: "refer",
                    key: "organizationId",
                    referId: "organizationId",
                    refinfo: "organization_ocm",
                    label: "销售组织",
                    refName: "销售组织",
                    required: true,
                    refparam: {
                        "EQ_orgFuncRel": "01",
                    }
                },
                {
                    type: "refer",
                    key: "priceMaintainId",
                    referId: "priceMaintainId",
                    label: "价目表",
                    refinfo: "priceMaintain",
                    required: true,
                    disableFilter: true,
                    refName: "价目表",
                    refparam: {
                        "EQ_priceList.organization": "",
                    }
                },
                {
                    type: "textreadonly",
                    key: "priceDiscountName",
                    label: "基础折扣调整单"
                },
                {
                    type: "textreadonly",
                    key: "adjustTime",
                    label: "调整日期",
                    format: "billDateFormat"
                },
                {
                    type: "datetime",
                    key: "effectTime",
                    label: "生效日期",
                }
            ]
        },
        details: {
            detail1: [{
                    key: "adjustNumber",
                    label: "调整单号",
                },
                {
                    key: "organizationName",
                    label: "销售组织",
                },
                {
                    key: "priceMaintainName",
                    label: "价目表",
                },
                {
                    key: "adjustTime",
                    label: "调整日期",
                },
                {
                    key: "effectTime",
                    label: "生效日期",
                }
            ]
        },
        grids: {
            grid1: {
                domid: "grid_discountAdjust",
                umeta: {
                    id: "grid_discountAdjust",
                    data: "discountAdjustList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                        field: "adjustNumber",
                        dataType: "String",
                        title: "调整单号",
                        renderType: "detailRender",
                    },
                    {
                        field: "organizationCode",
                        dataType: "String",
                        title: "销售组织",
                        visible: false
                    },
                    {
                        field: "organizationName",
                        dataType: "String",
                        title: "销售组织",
                    },
                    {
                        field: "priceMaintainName",
                        dataType: "String",
                        title: "价目表名称",
                    },
                    {
                        field: "adjustTime",
                        dataType: "Datetime",
                        title: "调整日期",
                        width: "150px"
                    },
                    {
                        field: "effectTime",
                        dataType: "Datetime",
                        title: "生效日期",
                        width: "150px"
                    },
                    /*{
                        field: "auditStatus",
                        dataType: "String",
                        title: "审核状态",
                        renderType: "approveRender"
                    },*/
                    {
                        field: "state",
                        dataType: "String",
                        title: "审核状态",
                        renderType: "approveStateRender"
                    },
                    {
                        field: "taskStatus",
                        dataType: "String",
                        title: "生效状态",
                        renderType: "approveTaskStateRender"
                    },
                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人",
                        visible: true
                    },
                    {
                        field: "modifier",
                        dataType: "String",
                        title: "修改人",
                        visible: false
                    },
                    {
                        field: "creationTime",
                        dataType: "datetime",
                        title: "创建时间",
                        visible: true
                    },
                    {
                        field: "modifiedTime",
                        dataType: "datetime",
                        title: "修改时间",
                        visible: false
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation",
                        fixed: true,
                        width: "110px"
                    },
                ]
            }
        }
    };
    return new basemodel(model);
});