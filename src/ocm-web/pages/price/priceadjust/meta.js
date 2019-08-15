define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var priceAdjustDetailmeta = {
        // 价目表维护ID
        priceAdjustId: {
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
        // 前端冗余使用，给批量添加
        priceIndex: {
            type: 'string'
        },
        priceAdd: {
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
        priceIndex1: {
            type: 'string'
        },
        priceAdd1: {
            type: 'string'
        },
        newPrice1: {
            type: 'string'
        },
        priceAdjustRatio1: {
            type: 'string'
        },
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
        priceIndex2: {
            type: 'string'
        },
        priceAdd2: {
            type: 'string'
        },
        newPrice2: {
            type: 'string'
        },
        priceAdjustRatio2: {
            type: 'string'
        },
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
        priceIndex3: {
            type: 'string'
        },
        priceAdd3: {
            type: 'string'
        },
        newPrice3: {
            type: 'string'
        },
        priceAdjustRatio3: {
            type: 'string'
        },
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
        priceIndex4: {
            type: 'string'
        },
        priceAdd4: {
            type: 'string'
        },
        newPrice4: {
            type: 'string'
        },
        priceAdjustRatio4: {
            type: 'string'
        },
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
        priceIndex5: {
            type: 'string'
        },
        priceAdd5: {
            type: 'string'
        },
        newPrice5: {
            type: 'string'
        },
        priceAdjustRatio5: {
            type: 'string'
        },
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
        priceIndex6: {
            type: 'string'
        },
        priceAdd6: {
            type: 'string'
        },
        newPrice6: {
            type: 'string'
        },
        priceAdjustRatio6: {
            type: 'string'
        },
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
        priceIndex7: {
            type: 'string'
        },
        priceAdd7: {
            type: 'string'
        },
        newPrice7: {
            type: 'string'
        },
        priceAdjustRatio7: {
            type: 'string'
        },
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
        priceIndex8: {
            type: 'string'
        },
        priceAdd8: {
            type: 'string'
        },
        newPrice8: {
            type: 'string'
        },
        priceAdjustRatio8: {
            type: 'string'
        },
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
        priceIndex9: {
            type: 'string'
        },
        priceAdd9: {
            type: 'string'
        },
        newPrice9: {
            type: 'string'
        },
        priceAdjustRatio9: {
            type: 'string'
        },
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
        priceIndex10: {
            type: 'string'
        },
        priceAdd10: {
            type: 'string'
        },
        newPrice10: {
            type: 'string'
        },
        priceAdjustRatio10: {
            type: 'string'
        },
    };
    var model = {
        metas: {
            priceAdjustmeta: {
                meta: {
                    id: {
                        type: 'string',
                    }, //id
                    // 调价单号
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
                    // 调价日期
                    adjustTime: {
                        type: 'datetime',
                    },
                    // 生效日期
                    effectTime: {
                        type: 'datetime',
                    },
                    // 严格匹配
                    strictMatch: {
                        type: 'integer',
                        default: 1
                    },
                   /* // 审核状态
                    auditStatus: {
                        type: 'string',
                        default: '0'
                    },*/
                    // 审批状态
                    state: {
                        type: 'string',
                        default: 0
                    },
                    priceAdjustItems: {
                        type: 'child',
                        meta: priceAdjustDetailmeta
                    },
                    operation: {
                        type: 'string'
                    }
                },
                pageSize: 10,
            },
            priceAdjustDetailmeta: {
                meta: priceAdjustDetailmeta,
                pageSize: 10,
            }
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
            },/* {
                key: "audit",
                label: "审核",
                iconCls: "icon-tubiao-shenhe",
                click: "audit"
            }, {
                key: "reject",
                label: "驳回",
                iconCls: "icon-tubiao-quxiaoshenhe",
                click: "reject"
            },*/{
                key: "jointquery",
                label: "联查",
                iconCls: "icon-tubiao-guanlian",
                click: "jointquery"
            }, {
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
                  key: "cancelapprove",
                  label: "取消审批",
                  iconCls: "icon-tubiao-quxiaoshenhe",
                  click: "cancelApprove"
                },
               /* {
                    key: "cancelApprove",
                    label: "取消审批",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "cancelapprove"
                }*//*,
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
            }, {
                key: "save",
                label: "保存",
                click: "saveAdjust",
                cls: "ui-btn-green"
            }],
            button3: [{
                key: "addrow",
                label: "增行",
                iconCls: "icon-plus",
                click: "addItem"
            }, {
                key: "delrow",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delItems",
            }],
            button4: [{
                key: "detailSelect",
                label: "商品明细选中",
                click: "detailSelect"
            }],
            button5: [{
                key: "return",
                label: "返回",
                click: "retListPanel"
            }, {
                key: "edit",
                label: "编辑",
                click: "detail2bill",
                cls: "ui-btn-green",
                visible: "canEdit"
            }],
        },
        searchs: {
            search1: [{
                type: "text",
                key: "adjustNumber",
                label: "调价单号",
            }, {
                type: "refer",
                key: "organization",
                refinfo: "organization_ocm",
                label: "销售组织",
                refName: "销售组织",
                refparam: {
                    "EQ_orgFuncRel": "01",
                    "AUTH_refdim":"organization"

                }
            }, {
                type: "refer",
                key: "priceMaintain--id",
                label: "价目表",
                refinfo: "priceMaintain",
                disableFilter: true,
                refName: "价目表",
            }, {
                type: "daterange",
                key: "adjustTime",
                label: "调价日期",
            }, {
                type: "daterange",
                key: "effectTime",
                label: "生效日期",
            }, ],
            search2: [{
                type: "refer",
                key: "goods",
                label: "商品",
                refinfo: "goods-no-version"
            }, {
                type: "refer",
                key: "product",
                label: "产品",
                refinfo: "product"
            }, {
                type: "refer",
                key: "brand",
                label: "品牌",
                refinfo: "brand"
            }, {
                type: "refer",
                key: "goodsCategory",
                label: "商品分类",
                refinfo: "goodsCategory"
            }, {
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer"
            }, {
                type: "refer",
                key: "customerCategory",
                label: "客户分类",
                refinfo: "customer_category"
            }, {
                type: "refer",
                key: "shop",
                label: "门店",
                refinfo: "shopref"
            }, ]
        },
        cards: {
            card1: [{
                type: "textreadonly",
                key: "adjustNumber",
                label: "调价单号",
            }, {
                type: "refer",
                key: "organizationId",
                referId: "organizationId",
                refinfo: "organization_ocm",
                label: "销售组织",
                refName: "销售组织",
                compid: "organization",
                required: true,
                refparam: {
                    "EQ_orgFuncRel": "01",
                }
            }, {
                type: "refer",
                key: "priceMaintainId",
                referId: "priceMaintainId",
                label: "价目表",
                refinfo: "priceMaintain",
                compid: "priceMaintain",
                required: true,
                disableFilter: true,
                refName: "价目表",
                refparam: {
                    "EQ_priceList.organization": "",
                }
            }, {
                type: "textreadonly",
                key: "adjustTime",
                label: "调价日期",
                format: "billDateFormat"
            }, {
                type: "datetime",
                key: "effectTime",
                label: "生效日期",
            }, {
                type: "radio",
                key: "strictMatch",
                label: "严格匹配",
                dataSource: CONST.WHETHER
            }],
            card2: [{
                type: "refer",
                key: "goodsId",
                label: "商品",
            }, {
                type: "refer",
                key: "productId",
                label: "产品",
            }, {
                type: "refer",
                key: "brandId",
                label: "品牌",
            }, {
                type: "refer",
                key: "goodsCategoryId",
                label: "商品分类",
            }, {
                type: "refer",
                key: "customerCategoryId",
                label: "客户分类",
            }, {
                type: "refer",
                key: "customerId",
                label: "客户",
            }, {
                type: "text",
                key: "priceIndex",
                label: "价格项指数(%)",
            }, {
                type: "text",
                key: "priceAdd",
                label: "价格加成",
            }, ]
        },
        details: {
            detail1: [{
                key: "adjustNumber",
                label: "调价单号",
            }, {
                key: "organizationName",
                label: "销售组织",
            }, {
                key: "priceMaintainName",
                label: "价目表",
            }, {
                key: "adjustTime",
                label: "调价日期",
            }, {
                key: "effectTime",
                label: "生效日期",
            }, {
                key: "strictMatch",
                label: "严格匹配",
                computed: "strictMatchComputed"
            }]
        },
        grids: {
            grid1: {
                domid: "grid_priceAdjust",
                umeta: {
                    id: "grid_priceAdjust",
                    data: "priceAdjustList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                        field: "adjustNumber",
                        dataType: "String",
                        title: "调价单号",
                        renderType: "detailRender",
                    }, {
                        field: "organizationCode",
                        dataType: "String",
                        title: "销售组织",
                        visible: false
                    }, {
                        field: "organizationName",
                        dataType: "String",
                        title: "销售组织",
                    }, {
                        field: "priceMaintainName",
                        dataType: "String",
                        title: "价目表名称",
                    }, {
                        field: "adjustTime",
                        dataType: "Datetime",
                        title: "调价日期",
                        width: "150px"
                    }, {
                        field: "effectTime",
                        dataType: "Datetime",
                        title: "生效日期",
                        width: "150px"
                    }, {
                        field: "strictMatch",
                        dataType: "String",
                        title: "严格匹配",
                        renderType: "whetherRender"
                    },/* {
                        field: "auditStatus",
                        dataType: "String",
                        title: "审核状态",
                        renderType: "approveRender"
                    },*/ {
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
                        field: "modifier",
                        dataType: "String",
                        title: "修改人",
                        visible: false
                    }, {
                        field: "creationTime",
                        dataType: "Date",
                        title: "创建时间",
                        visible: false
                    }, {
                        field: "modifiedTime",
                        dataType: "Date",
                        title: "修改时间",
                        visible: false
                    },
                    // {
                    //     field: "isEnable",
                    //     dataType: "String",
                    //     title: "启用状态",
                    //     renderType: "enableRender"
                    // },
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