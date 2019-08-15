define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            discountMaintainmeta: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    code: {
                        type: 'string',
                        required: true
                    }, //编码
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    priceDiscountId: {
                        type: 'string',
                        required: true
                    }, //基准折扣模板
                    priceDiscountName: {
                        type: 'string'
                    }, //基准折扣模板名称
                    priceMaintainId: {
                        type: 'string'
                    }, //价目表
                    priceMaintainName: {
                        type: 'string'
                    }, //价目表名称
                    organizationId: {
                        type: 'string',
                        required: true
                    }, //销售组织id
                    organizationCode: {
                        type: 'string'
                    }, //销售组织
                    organizationName: {
                        type: 'string'
                    }, //销售组织
                    operation: {
                        type: 'string'
                    }
                },
                pageSize: 10,
            },
            discountMaintainDetailmeta: {
                meta: {
                    // 价目表维护ID
                    priceDiscountMaintainId: {
                        type: 'string'
                    },
                    // 商品ID
                    goodsId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['goods-no-version']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
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
                        'refparam': '{"EQ_isEnable":"1"}'
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
                    // 商品编码
                    adjustNumber: {
                        type: 'string'
                    },
                    // 价格项1
                    detailItemId1: {
                        type: 'string'
                    },
                    detailItemName1: {
                        type: 'string'
                    },
                    detailItemPrice1: {
                        type: 'string'
                    },
                    discountIndex1: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd1: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice1: {
                        type: 'string'
                    }, //新价格
                    /* impactObject1: {
                         type: 'string',
                         default:'1'
                     }, *///影响对象
                    // 价格项2
                    detailItemId2: {
                        type: 'string'
                    },
                    detailItemName2: {
                        type: 'string'
                    },
                    detailItemPrice2: {
                        type: 'string'
                    },
                    discountIndex2: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd2: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice2: {
                        type: 'string'
                    }, //新价格
                    /* impactObject2: {
                         type: 'string',
                         default:'1'
                     },*/ //影响对象
                    // 价格项3
                    detailItemId3: {
                        type: 'string'
                    },
                    detailItemName3: {
                        type: 'string'
                    },
                    detailItemPrice3: {
                        type: 'string'
                    },
                    discountIndex3: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd3: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice3: {
                        type: 'string'
                    }, //新价格
                    /* impactObject3: {
                         type: 'string',
                         default:'1'
                     }, *///影响对象
                    // 价格项4
                    detailItemId4: {
                        type: 'string'
                    },
                    detailItemName4: {
                        type: 'string'
                    },
                    detailItemPrice4: {
                        type: 'string'
                    },
                    discountIndex4: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd4: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice4: {
                        type: 'string'
                    }, //新价格
                    /* impactObject4: {
                         type: 'string',
                         default:'1'
                     }, *///影响对象
                    // 价格项5
                    detailItemId5: {
                        type: 'string'
                    },
                    detailItemName5: {
                        type: 'string'
                    },
                    detailItemPrice5: {
                        type: 'string'
                    },
                    discountIndex5: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd5: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice5: {
                        type: 'string'
                    }, //新价格
                    /* impactObject5: {
                         type: 'string',
                         default:'1'
                     },*/ //影响对象
                    // 价格项6
                    detailItemId6: {
                        type: 'string'
                    },
                    detailItemName6: {
                        type: 'string'
                    },
                    detailItemPrice6: {
                        type: 'string'
                    },
                    discountIndex6: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd6: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice6: {
                        type: 'string'
                    }, //新价格
                    /*impactObject6: {
                        type: 'string',
                        default:'1'
                    }, *///影响对象
                    // 价格项7
                    detailItemId7: {
                        type: 'string'
                    },
                    detailItemName7: {
                        type: 'string'
                    },
                    detailItemPrice7: {
                        type: 'string'
                    },
                    discountIndex7: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd7: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice7: {
                        type: 'string'
                    }, //新价格
                    /* impactObject7: {
                         type: 'string',
                         default:'1'
                     },*/ //影响对象
                    // 价格项8
                    detailItemId8: {
                        type: 'string'
                    },
                    detailItemName8: {
                        type: 'string'
                    },
                    detailItemPrice8: {
                        type: 'string'
                    },
                    discountIndex8: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd8: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice8: {
                        type: 'string'
                    }, //新价格
                    /*impactObject8: {
                        type: 'string',
                        default:'1'
                    },*/ //影响对象
                    // 价格项9
                    detailItemId9: {
                        type: 'string'
                    },
                    detailItemName9: {
                        type: 'string'
                    },
                    detailItemPrice9: {
                        type: 'string'
                    },
                    discountIndex9: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd9: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice9: {
                        type: 'string'
                    }, //新价格
                    /*impactObject9: {
                        type: 'string',
                        default:'1'
                    },*/ //影响对象
                    // 价格项10
                    detailItemId10: {
                        type: 'string'
                    },
                    detailItemName10: {
                        type: 'string'
                    },
                    detailItemPrice10: {
                        type: 'string'
                    },
                    discountIndex10: {
                        type: 'string'
                    }, //折扣价格指数
                    discountAdd10: {
                        type: 'string'
                    }, //折扣价格加成
                    newPrice10: {
                        type: 'string'
                    }, //新价格
                    /* impactObject10: {
                         type: 'string',
                         default:'1'
                     },*/ //影响对象
                },
                pageSize: 10,
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit"
            },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del"
                },
                {
                    key: "showMaintainPanel",
                    label: "基准折扣定义",
                    iconCls: "icon-edit",
                    click: "showMaintainPanel"
                },
            ],
            button2: [{
                key: "cancel",
                label: "取消",
                click: "cancelBill"
            },
                {
                    key: "save",
                    label: "保存",
                    click: "saveMaintain",
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
                }, {
                    key: "import",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importHandle_detail"
                }, {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle_detail"
                }
            ],
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "编码"
            },
                {
                    type: "text",
                    key: "name",
                    label: "名称",
                },
                {
                    type: "text",
                    key: "priceList--code",
                    label: "价目表定义编码"
                },
                {
                    type: "text",
                    key: "priceList--name",
                    label: "价目表定义名称",
                },
                {
                    type: "refer",
                    key: "priceList--organization",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    refName: "销售组织",
                    refparam: {
                        "EQ_orgFuncRel": "01",
                        "AUTH_refdim":"organization"
                    }
                },
                {
                    type: "refer",
                    key: "priceList--currency",
                    label: "币种",
                    refinfo: "currency"
                },
            ],
            search2: [{
                type: "refer",
                key: "goods",
                label: "商品",
                refinfo: "goods-no-version",
                clientParam: {
                    "AUTH_refdim": "goods"
                }
            },
                {
                    type: "refer",
                    key: "product",
                    label: "产品",
                    refinfo: "product"
                },
                {
                    type: "refer",
                    key: "productLine",
                    label: "产品线",
                    refinfo: "productLine"
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
                    refinfo: "goodsCategory",
                    clientParam: {
                        "AUTH_refdim": "goodsCategory"
                    }
                },
                {
                    type: "refer",
                    key: "customer",
                    label: "客户",
                    refinfo: "customer",
                    clientParam: {
                        "AUTH_refdim": "customer"
                    }
                },
                {
                    type: "refer",
                    key: "customerCategory",
                    label: "客户分类",
                    refinfo: "customer_category",
                    clientParam: {
                        "AUTH_refdim": "customerCategory"
                    }
                },
                {
                    type: "refer",
                    key: "shop",
                    label: "门店",
                    refinfo: "shopref"
                },
            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                disableInEdit: true
            },
                {
                    type: "text",
                    key: "name",
                    label: "名称",
                },
                {
                    type: "refer",
                    key: "organizationId",
                    referId: "organizationId",
                    refinfo: "organization_ocm",
                    label: "销售组织",
                    refName: "销售组织",
                    refparam: {
                        "EQ_orgFuncRel": "01",
                    }
                },
                {
                    type: "refer",
                    key: "priceDiscountId",
                    referId: "priceDiscountId",
                    label: "基准折扣模板",
                    refinfo: "priceDiscount",
                    disableFilter: true,
                    refName: "基准折扣模板(请先选择销售组织)",
                    refparam: {
                        "EQ_organization": "",
                    }
                },
                {
                    type: "textreadonly",
                    key: "priceMaintainName",
                    label: "价目表",
                },
            ]
        },
        grids: {
            grid1: {
                domid: "grid_discountMaintain",
                umeta: {
                    id: "grid_discountMaintain",
                    data: "discountMaintainList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称",
                    },
                    {
                        field: "organizationName",
                        dataType: "String",
                        title: "销售组织",
                    },
                    {
                        field: "priceDiscountName",
                        dataType: "String",
                        title: "基准折扣模板",
                    },
                    {
                        field: "priceMaintainName",
                        dataType: "String",
                        title: "价目表",
                    },
                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人",
                        visible: false
                    },
                    {
                        field: "modifier",
                        dataType: "String",
                        title: "修改人",
                        visible: false
                    },
                    {
                        field: "creationTime",
                        dataType: "Date",
                        title: "创建时间",
                        visible: false
                    },
                    {
                        field: "modifiedTime",
                        dataType: "Date",
                        title: "修改时间",
                        visible: false
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    },
                ]
            }
        }
    };
    return new basemodel(model);
});