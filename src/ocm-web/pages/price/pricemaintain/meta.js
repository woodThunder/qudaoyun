define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            priceMaintainmeta: {
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
                    priceListId: {
                        type: 'string',
                        required: true
                    }, //价目表定义id
                    priceListCode: {
                        type: 'string'
                    }, //价目表定义编码
                    priceListName: {
                        type: 'string'
                    }, //价目表定义定义名称
                    organizationId: {
                        type: 'string',
                        required: true
                    }, //销售组织id
                    organizationName: {
                        type: 'string'
                    }, //销售组织
                    currencyName: {
                        type: 'string'
                    }, //缺省币种
                    isEnable: {
                        type: 'integer',
                        default: 1
                    }, //是否启用
                    operation: {
                        type: 'string'
                    }
                },
                pageSize: 10,
            },
            priceMaintainDetailmeta: {
                meta: {
                    // 价目表维护ID
                    priceMaintainId: {
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
                    // 价目表调整单号
                    adjustmentNum: {
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
                        type: 'priceFloat'
                    },
                    // 价格项2
                    detailItemId2: {
                        type: 'string'
                    },
                    detailItemName2: {
                        type: 'string'
                    },
                    detailItemPrice2: {
                        type: 'priceFloat'
                    },
                    // 价格项3
                    detailItemId3: {
                        type: 'string'
                    },
                    detailItemName3: {
                        type: 'string'
                    },
                    detailItemPrice3: {
                        type: 'priceFloat'
                    },
                    // 价格项4
                    detailItemId4: {
                        type: 'string'
                    },
                    detailItemName4: {
                        type: 'string'
                    },
                    detailItemPrice4: {
                        type: 'priceFloat'
                    },
                    // 价格项5
                    detailItemId5: {
                        type: 'string'
                    },
                    detailItemName5: {
                        type: 'string'
                    },
                    detailItemPrice5: {
                        type: 'priceFloat'
                    },
                    // 价格项6
                    detailItemId6: {
                        type: 'string'
                    },
                    detailItemName6: {
                        type: 'string'
                    },
                    detailItemPrice6: {
                        type: 'priceFloat'
                    },
                    // 价格项7
                    detailItemId7: {
                        type: 'string'
                    },
                    detailItemName7: {
                        type: 'string'
                    },
                    detailItemPrice7: {
                        type: 'priceFloat'
                    },
                    // 价格项8
                    detailItemId8: {
                        type: 'string'
                    },
                    detailItemName8: {
                        type: 'string'
                    },
                    detailItemPrice8: {
                        type: 'priceFloat'
                    },
                    // 价格项9
                    detailItemId9: {
                        type: 'string'
                    },
                    detailItemName9: {
                        type: 'string'
                    },
                    detailItemPrice9: {
                        type: 'priceFloat'
                    },
                    // 价格项10
                    detailItemId10: {
                        type: 'string'
                    },
                    detailItemName10: {
                        type: 'string'
                    },
                    detailItemPrice10: {
                        type: 'priceFloat'
                    },
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
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
            }, {
                key: "showMaintainPanel",
                label: "维护价目表",
                iconCls: "icon-edit",
                click: "showMaintainPanel"
            }],
            button2: [{
                key: "cancel",
                label: "取消",
                click: "cancelBill"
            }, {
                key: "save",
                label: "保存",
                click: "saveMaintain",
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
            }],
            button4: [{
                key: "return",
                label: "返回",
                click: "retListPanel"
            }, {
                key: "edit",
                label: "价目表维护",
                click: "detail2bill",
                cls: "ui-btn-green",
            }],
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "编码"
            }, {
                type: "text",
                key: "name",
                label: "名称",
            }, {
                type: "text",
                key: "priceList--code",
                label: "价目表定义编码"
            }, {
                type: "text",
                key: "priceList--name",
                label: "价目表定义名称",
            }, {
                type: "refer",
                key: "priceList--organization",
                label: "销售组织",
                refinfo: "organization_ocm",
                refName: "销售组织",
                refparam: {
                    "EQ_orgFuncRel": "01",
                    "AUTH_refdim":"priceList.organization"
                }
            }, {
                type: "refer",
                key: "priceList--currency",
                label: "缺省币种",
                refinfo: "currency"
            }, ],
            search2: [{
                type: "refer",
                key: "goods",
                label: "商品",
                refinfo: "goods-no-version",
                clientParam: {"AUTH_refdim":"goods"}
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
                refinfo: "goodsCategory",
                clientParam: {"AUTH_refdim":"goodsCategory"}
            }, {
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer",
                clientParam: {"AUTH_refdim":"customer"}
            }, {
                type: "refer",
                key: "customerCategory",
                label: "客户分类",
                refinfo: "customer_category",
                clientParam: {"AUTH_refdim":"customerCategory"}
            }, {
                type: "refer",
                key: "shop",
                label: "门店",
                refinfo: "shopref"
            }, ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                disableInEdit: true
            }, {
                type: "text",
                key: "name",
                label: "名称",
            }, {
                type: "refer",
                key: "organizationId",
                referId: "organizationId",
                refinfo: "organization_ocm",
                keyfordisplay: "organizationName",
                label: "销售组织",
                disableInEdit: true,
                refName: "销售组织",
                refparam: {
                    "EQ_orgFuncRel": "01","AUTH_refdim":"priceList.organization"
                },
            }, {
                type: "refer",
                key: "priceListId",
                referId: "priceListId",
                label: "价目表定义",
                refinfo: "priceList",
                disableFilter: true,
                refName: "价目表定义(请先选择销售组织)",
                refparam: {
                    "EQ_organization": "",
                }
            }, ]
        },
        details: {
            detail1: [{
                key: "code",
                label: "编码",
            }, {
                key: "name",
                label: "名称",
            }, {
                key: "organizationName",
                label: "销售组织",
            }, {
                key: "priceListName",
                label: "价目表定义",
            }, ]
        },
        grids: {
            grid1: {
                domid: "grid_priceMaintain",
                umeta: {
                    id: "grid_priceMaintain",
                    data: "priceMaintainList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                        field: "code",
                        dataType: "String",
                        title: "编码",
                        renderType: "detailRender",
                    }, {
                        field: "name",
                        dataType: "String",
                        title: "名称",
                    }, {
                        field: "priceListCode",
                        dataType: "String",
                        title: "价目表定义编码",
                    }, {
                        field: "priceListName",
                        dataType: "String",
                        title: "价目表定义名称",
                    }, {
                        field: "organizationName",
                        dataType: "String",
                        title: "销售组织",
                    }, {
                        field: "currencyName",
                        dataType: "String",
                        title: "缺省币种",
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