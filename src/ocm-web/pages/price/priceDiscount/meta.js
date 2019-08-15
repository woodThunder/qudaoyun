define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            discountMeta: {
                params: {
                    "cls": "com.yonyou.occ.price.service.dto.StrategyMatchDto"
                },
                meta: {
                    id: {type: 'string'},//id
                    code: {type: 'string', required: true}, // 模板编码
                    name: {type: 'string', required: true}, // 模板名称
                    organizationId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        'refcfg': '{"ctx":"/uitemplate_web", "refcode":"", "refname":"所属销售组织"}',
                        required:true
                    },// 所属销售组织ID
                    organizationCode: {type: 'string'}, // 所属销售组织编码
                    organizationName: {type: 'string'}, // 所属销售组织名称
                    priceMaintainId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['priceMaintain']),
                        'refcfg': '{"ctx":"/uitemplate_web", "refcode":"", "refname":"价目表"}',
                        required:true
                    }, // 价目表ID
                    priceMaintainCode: {type: 'string'}, // 价目表编码
                    priceMaintainName: {type: 'string'}, // 价目表名称
                    maintainOrganizationName:{type:'string'}, // 价目表所属销售组织
                    useGoods: {
                        type: 'string',
                        default: "0",
                    }, //商品因素
                    useProduct: {
                        type: 'string',
                        default: "0",
                    }, //产品因素
                    useBrand: {
                        type: 'string',
                        default: "0",
                    }, //品牌因素
                    useGoodsCategory: {
                        type: 'string',
                        default: "0",
                    }, //商品分类因素
                    useProductLine: {
                        type: 'string',
                        default:'0',
                    }, // 产品线
                    useCustomer: {
                        type: 'string',
                        default: "0",
                    }, //客户因素
                    useCustomerCategory: {
                        type: 'string',
                        default: "0",
                    }, //客户分类因素
                    useShop: {
                        type: 'string',
                        default: "0",
                    }, //门店因素
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            }
        },
        buttons: {
            button1: [{
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "beforeEdit",
                    //auth: true
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del",
                    //auth: true
                }
            ]
        },
        searchs: {
            search1: [
                {
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
                    key: "organization",
                    label: "所属销售组织",
                    refinfo: "organization_ocm",
                    clientParam:{
                        "EQ_orgFuncRel":"01",
                        "AUTH_refdim":"organization"
                    }
                },
                {
                    type:'refer',
                    key:'priceMaintain--id',
                    label:'价目表',
                    refinfo:"priceMaintain",
                },
                {
                    type: "radio",
                    key: "useGoods",
                    label: "商品因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useProduct",
                    label: "产品因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useBrand",
                    label: "品牌因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useGoodsCategory",
                    label: "商品分类因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useProductLine",
                    label: "产品线因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useCustomer",
                    label: "客户因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useCustomerCategory",
                    label: "客户分类因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useShop",
                    label: "门店因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type:'string',
                    key:"code",
                    label:'模板编码',
                },
                {
                    type:'string',
                    key:"name",
                    label:'模板名称',
                },
                {
                    type:'refer',
                    key:'organizationId',
                    label:'所属销售组织',
                    refinfo:'organization_ocm',
                    clientParam:{
                        "EQ_isEnable":"1", "EQ_orgFuncRel": "01"
                    },
                    required:true
                },
                {
                    domid:'priceMaintainId',
                    type:'refer',
                    key:'priceMaintainId',
                    label:'价目表',
                    refinfo:'priceMaintain',
                    disableFilter:true,
                    clientParam:{
                        "EQ_priceList.organization":""
                    },
                    required:true
                },
                {
                    type: "radio",
                    key: "useGoods",
                    label: "商品因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useProduct",
                    label: "产品因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useBrand",
                    label: "品牌因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useGoodsCategory",
                    label: "商品分类因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useProductLine",
                    label: "产品线因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useCustomer",
                    label: "客户因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useCustomerCategory",
                    label: "客户分类因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
                {
                    type: "radio",
                    key: "useShop",
                    label: "门店因素",
                    dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
                },
            ]
        },
        grids: {
            grid1: {
                domid: "grid_discount",
                umeta: {
                    "id": "grid_discount",
                    "data": "simpleList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "模板编码"
                    },
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "模板名称"
                    },
                    {
                        "field": "organizationName",
                        "dataType": "String",
                        "title": "所属销售组织"
                    },
                    {
                        "field":"priceMaintainName",
                        "dataType": "String",
                        "title": "价目表"
                    },
                    {
                        "field": "useGoods",
                        "dataType": "String",
                        "title": "商品因素",
                        "renderType": "enableRender"
                    },
                    {
                        "field": "useProduct",
                        "dataType": "String",
                        "title": "产品因素",
                        "renderType": "enableRender"
                    },
                    {
                        "field": "useBrand",
                        "dataType": "String",
                        "title": "品牌因素",
                        "renderType": "enableRender"
                    },
                    {
                        "field": "useGoodsCategory",
                        "dataType": "String",
                        "title": "商品分类因素",
                        "renderType": "enableRender"
                    },
                    {
                        "field": "useProductLine",
                        "dataType": "String",
                        "title": "产品线因素",
                        "renderType": "enableRender"
                    },
                    {
                        "field": "useCustomer",
                        "dataType": "String",
                        "title": "客户因素",
                        "renderType": "enableRender"
                    },
                    {
                        "field": "useCustomerCategory",
                        "dataType": "String",
                        "title": "客户分类因素",
                        "renderType": "enableRender"
                    },
                    {
                        "field": "useShop",
                        "dataType": "String",
                        "title": "门店因素",
                        "renderType": "enableRender"
                    },
                    {
                        "field":"creator",
                        "dataType":"String",
                        "title":"创建人",
                        "visible":false
                    },
                    {
                        "field":"modifier",
                        "dataType":"String",
                        "title":"修改人",
                        "visible":false
                    },
                    {
                        "field":"creationTime",
                        "dataType":"Date",
                        "title":"创建时间",
                        "visible":false
                    },
                    {
                        "field":"modifiedTime",
                        "dataType":"Date",
                        "title":"修改时间",
                        "visible":false
                    },
                    {
                        "field":"operation",
                        "dataType":"String",
                        "title":"操作",
                        "renderType":"operation4single",
                        "fixed":true,
                        "width":"110px"
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});
