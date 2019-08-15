define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            strategyMatchMeta: {
                params: {
                    "cls": "com.yonyou.occ.price.service.dto.StrategyMatchDto"
                },
                meta: {
                    id: {type: 'string'},//id
                    organizationId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        'refcfg': '{"ctx":"/uitemplate_web", "refcode":"", "refname":"所属销售组织"}',
                        required:true
                    },// 所属销售组织ID
                    organizationCode: {type: 'string'}, // 所属销售组织编码
                    organizationName: {type: 'string'}, // 所属销售组织名称
                    productId:{
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['product']),
                        'refcfg': '{"ctx":"/uitemplate_web", "refcode":"", "refname":"产品"}'
                    }, // 产品ID
                    productCode:{type :"string"}, // 产品编码
                    productName:{type:"string"}, // 产品名称
                    goodsCategoryId: {
                        type:"string",
                        "refmodel": JSON.stringify(refinfo['goodsCategory']),
                        "refcfg":'{"ctx":"/uitemplate_web", "refcode":"", "refname":"商品分类"}'
                    }, // 商品分类ID
                    goodsCategoryCode:{type:'string'}, // 商品分类编码
                    goodsCategoryName:{type:'string'}, // 商品分类名称
                    customerId:{
                        type:'string',
                        "refmodel":JSON.stringify(refinfo['customer']),
                        "refcfg":'{"ctx":"/uitemplate_web", "refcode":"", "refname":"客户"}'
                    }, // 客户ID
                    customerCode:{type:'string'}, // 客户编码
                    customerName:{type:'string'}, // 客户名称
                    customerCategoryId:{
                        type:'string',
                        "refmodel":JSON.stringify(refinfo['customer_category']),
                        "refcfg":'{"ctx":"/uitemplate_web", "refcode":"", "refname":"客户分类"}'
                    }, // 客户分类ID
                    customerCategoryCode:{type:'string'}, // 客户分类编码
                    customerCategoryName:{type:'string'}, // 客户分类名称
                    shopId:{
                        type:'string',
                        "refmodel":JSON.stringify(refinfo['shopref']),
                        "refcfg":'{"ctx":"/uitemplate_web", "refcode":"", "refname":"门店"}'
                    }, // 门店ID
                    shopCode:{type:'string'}, // 门店编码
                    shopName:{type:'string'}, // 门店名称
                    strategyId:{
                        type:'string',
                        "refmodel":JSON.stringify(refinfo['strategys']),
                        "refcfg":'{"ctx":"/uitemplate_web", "refcode":"", "refname":"定价策略"}',
                        required:true
                    }, // 定价策略ID
                    strategyCode:{type:'string'}, // 定价策略编码
                    strategyName:{type:'string'}, // 定价策略名称
                    strategyOrganizationName:{type:'string'}, // 定价策略所属销售组织
                    strategyPriceItem:{type:'string'}, // 定价策略价格项
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
                    type: "refer",
                    key: "organization",
                    label: "所属销售组织",
                    refinfo: "organization_ocm",
                    clientParam:{
                        "EQ_orgFuncRel":"01",
                        "AUTH_refdim":"organization"
                    }
                }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type:'refer',
                    key:'organizationId',
                    label:'所属销售组织',
                    refinfo:'organization_ocm',
                    clientParam:{
                        "EQ_isEnable":"1", "EQ_orgFuncRel":"01"
                    },
                    required:true
                },
                {
                    type:'refer',
                    key:'productId',
                    label:'产品因素',
                    refinfo:'product',
                    clientParam:{
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type:'refer',
                    key:'goodsCategoryId',
                    label:'商品分类因素',
                    refinfo:'goodsCategory',
                    clientParam:{
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type:'refer',
                    key:'customerId',
                    label:'客户因素',
                    refinfo:'customer'
                },
                {
                    type:'refer',
                    key:'customerCategoryId',
                    label:'客户分类因素',
                    refinfo:'customer_category',
                    clientParam:{
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type:'refer',
                    key:'shopId',
                    label:'门店因素',
                    refinfo:'shopref',
                    clientParam:{
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type:'refer',
                    key:'strategyId',
                    label:'定价策略',
                    refinfo:'strategys',
                    domid:"strategyId",
                    clientParam:{
                        "EQ_organization":""
                    },
                    disableFilter:true,
                    required:true
                }
            ]
        },
        grids: {
            grid1: {
                domid: "grid_strategymatch",
                umeta: {
                    "id": "grid_strategymatch",
                    "data": "simpleList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "organizationName",
                        "dataType": "String",
                        "title": "所属销售组织"
                    },
                    {
                        "field": "productName",
                        "dataType": "String",
                        "title": "产品"
                    },
                    {
                        "field": "goodsCategoryName",
                        "dataType": "String",
                        "title": "商品分类",
                    },
                    {
                        "field":"customerName",
                        "dataType":"string",
                        "title":"客户",
                    },
                    {
                        "field":"customerCategoryName",
                        "dataType":"string",
                        "title":"客户分类"
                    },
                    {
                        "field":"shopName",
                        "dataType":"string",
                        "title":"门店"
                    },
                    {
                        "field":"strategyName",
                        "dataType":"string",
                        "title":"定价策略名称"
                    },
                    {
                        "field":"strategyOrganizationName",
                        "dataType":"string",
                        "title":"定价策略所属组织"
                    },
                    {
                        "field":"strategyPriceItem",
                        "dataType":"string",
                        "title":"定价策略价格项"
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
