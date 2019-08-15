define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            strategyMeta: {
                params: {
                    "cls": "com.yonyou.occ.price.service.dto.StrategyDto"
                },
                meta: {
                    id: {type: 'string'},//id
                    name: { type: 'string' ,required:false},
                    code: { type: 'string',required:false},
                    organizationId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
						'refparam' :'{ "EQ_orgFuncRel": "01",}',
                        'refcfg': '{"ctx":"/uitemplate_web", "refcode":"", "refname":"所属销售组织"}',
                        required:true
                    }, 
                    organizationCode: {type: 'string'}, // 所属销售组织编码
                    organizationName: {type: 'string'}, // 所属销售组织名称
                    priceMaintainId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['priceMaintain']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    priceMaintainName:{type:'string'}, 
                    maintainOrganizationName:{type:'string'},
                    priceListItemId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['priceListItem']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    priceListItemName:{type:'string'},
                    discountOrg:{type:'string'},
                   // orderTypeId:{type:'string'},
					orderTypeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['trantype']),
                        clientParam: {"EQ_billTypeId":"SaleOrder"},
                        'refcfg': '{"ctx":"/uitemplate_web", "refcode":"", "refname":"客户订单类型"}',
                        required:true
                    }, 
                    orderTypeCode: {type: 'string'}, // 客户订单类型编码
                    orderTypeName: {type: 'string'}, // 客户订单类型名称
                    ladderEnable: {type: 'string'}, // 启用阶梯
                    ladderBench: {type: 'string', default: '1'}, // 阶梯基准
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
                },
                {
                    type: "text",
                    key: "code",
                    label: "定价策略编码"
                },
                {
                    key: "name",
                    type: "text",
                    label: "定价策略名称"
                },
                {
                    key: "priceMaintain--id",
                    refinfo: "priceMaintain",
                    type: "refer",
                    label: "价目表名称"
                },
                {
                    key: "discountOrg",
                    type: "combo",
                    label: "基准折扣所属组织",
                    dataSource: [
                        {value:'0', name:'价目表所属组织'},
                        {value:'1', name:'本销售组织'},
                    ],
                    onlySelect: true
                },
                {   
					type: "refer",
                    key: "orderTypeId",
                    label: "订单类型",
                    refinfo: "trantype",
                    disableFilter: true,
                    clientParam: {"EQ_billTypeId":"SaleOrder"}
                },
                {
                    key: "ladderEnable",
                    type: "combo",
                    label: "启用阶梯",
                    dataSource: [
                        {value:'', name:'全部'},
                        {value:'0', name:'未启用'},
                        {value:'1', name:'启用'},
                    ],
                    onlySelect: true
                }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "text",
                    key: "code",
                    label: "定价策略编码",
                    disableInEdit: true,
                    required:true
                },
                {
                    type: "text",
                    key: "name",
                    label: "定价策略名称",
                    required:true
                },
                {
                    type:'refer',
                    key:'organizationId',
                    label:'所属销售组织',
                    refinfo:'organization_ocm',
                    clientParam:{
                        "EQ_isEnable":"1",
						 "EQ_orgFuncRel":"01"
                    },
                    required:true
                },
                {
                    type:'refer',
                    key:'priceMaintainId',
                    domid:'priceMaintainIdRef',
                    label:'价目表',
                    refinfo:'priceMaintain',
                    clientParam:{
                        "EQ_priceList.organization":""
                    },
                    required:true
                },
                {
                    type:'refer',
                    key:'priceListItemId',
                    domid:'priceListItemIdRef',
                    label:'价格项',
                    refinfo:'priceListItem',
                    clientParam:{
                        "EQ_priceMaintainId":""
                    },
                },
                {
                    type:'combo',
                    key:'discountOrg',
                    label:'基准折扣所属组织',
                    dataSource:[
                        {value:'0', name:'价目表所属组织'},
                        {value:'1', name:'本销售组织'},
                    ],
                    onlySelect: true,
                    required:true
                },
                {              
					type:'refer',
                    key:'orderTypeId',
                    label:'订单类型',
                    refinfo:'trantype',
                    disableFilter: true,
                    clientParam: {"EQ_billTypeId":"SaleOrder"}
                },
                {
                    type: "checkbox",
                    key: "ladderEnable",
                    label: "启用阶梯",
                    checkedValue:1,
                    unCheckedValue:0,
                    defaultvalue: 0,
                    dataSource: [
                        {value:'0', name:'不启用'},
                        {value:'1', name:'启用'},
                    ]
                },
                {
                    type: "combo",
                    key: "ladderBench",
                    compid: "ladderBench",
                    label: "阶梯基准",
                    dataSource: [
                        {value:'1', name:'价目表'},
                    ],
                    defaultvalue: '1'
                }
            ]
        },
        grids: {
            grid1: {
                domid: "grid_strategy",
                umeta: {
                    "id": "grid_strategy",
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
                        "title": "定价策略编码"
                    },
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "定价策略名称"
                    },
                    {
                        "field": "organizationName",
                        "dataType": "String",
                        "title": "所属销售组织"
                    },
                    {
                        "field": "priceMaintainName",
                        "dataType": "String",
                        "title": "价目表名称"
                    },
//                  {
//                      "field": "maintainOrganizationName",
//                      "dataType": "String",
//                      "title": "价目表所属组织"
//                  },
                    {
                        "field": "priceListItemName",
                        "dataType": "String",
                        "title": "价格项名称"
                    },
                    {
                        "field": "discountOrg",
                        "dataType": "String",
                        "title": "基准折扣所属组织",
                        "renderType":"discountOrgSta"
                    },
                    {
                        "field": "orderTypeName",
                        "dataType": "String",
                        "title": "订单类型",
                    },
                    {
                        "field": "ladderEnable",
                        "dataType": "String",
                        "title": "启用阶梯",
                    },
                    {
                        "field": "ladderBench",
                        "dataType": "String",
                        "title": "阶梯基准",
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