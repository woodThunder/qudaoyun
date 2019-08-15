define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            rulemeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.ConRuleSettingDto"  //规则限制
                },
                meta: {
                    id: { type: 'string' },//id
                    contractTypeId: { type: 'string', required: true },//合同类型
                    contractTypeCode: { type: 'string'},
                    contractTypeName: { type: 'string'},
                    saleOrgId: { type: 'string', required: true },//销售组织
                    saleOrgCode: { type: 'string' },
                    saleOrgName: { type: 'string' },
                    debarProm: { type: 'integer'},//禁止促销
                    debarFee: { type: 'integer'},// 禁止费用冲抵
                    isOutRange: { type: 'integer'},//赠品超范围禁止下单
                    isEnable: { type: 'integer'},//是否启用
                    remark:{type:'string',maxLength: 500}
                    // dimensionId: {
                    //     type: 'string',
                    //     "refmodel": JSON.stringify(refinfo['custdocdef']),
                    //     "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY083","refName":"所属量纲"}'},//所属量纲
                    // dimensionCode: {type: 'string',  required: true},//所属量纲
                    // dimensionName: {type: 'string',  required: true},//所属量纲
                    // isBasicUnit: { type: 'integer',  required: true},//是否基本单位
                    // conversionRate: {type: 'string',regExp: /^[0-9]+([.]{1}[0-9]+){0,1}$/,errorMsg: '只允许输入数字'},//换算率

                },
                pageSize: 10,
                //启用前端缓存
                // pageCache: true
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
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable"
            },
            {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable"
            }]
        },
        searchs: {
            search1: [
                {
                    type: "refer",
                    key: "contractType",
                    label: "合同类型",
                    refinfo: "trantype",
                    clientParam: {
                         "EQ_billTypeId": "SaleContract"
                    }
                },
                {
                    type: "refer",
                    key: "saleOrg",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "01"
                    }
                },
                // {
                //     type: "combo",
                //     key: "dimension",
                //     label: "所属量纲",
                //     url: window.pathMap.base +"/cust-doc-defs/cust_doc_code?cust_doc_code=QY083",
                //     namefield: "name",
                //     valuefield: "code"
                // },
                // {
                //     type: "text",
                //     key: "symbol",
                //     label: "单位符号",
                // },
                // {
                //     type: "combo",
                //     key: "isEnable",
                //     label: "启用状态",
                //     dataSource: [
                //         { value: '', name: '全部' },
                //         { value: '0', name: '未启用' },
                //         { value: '1', name: '已启用' },
                //         { value: '2', name: '已停用' }
                //     ]
                // }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "refer",
                    key: "contractTypeId",
                    label: "合同类型",
                    refinfo: "trantype",
                    clientParam: {
                      "EQ_billTypeId": "SaleContract"
                    }
                },
                {
                    type: "refer",
                    key: "saleOrgId",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "01"
                    }
                },
                {
                    type: "radio",
                    key: "debarProm",
                    label: "禁止使用促销",
                    dataSource:[
                        {value:'1',name:'是'},
                        {value:'0',name:'否'},
                    ],
                },
                {
                    type: "radio",
                    key: "debarFee",
                    label: "禁止费用冲抵",
                    dataSource:[
                        {value:'1',name:'是'},
                        {value:'0',name:'否'},
                    ],
                },
                // {   type: "label",
                //     key: "isEnable",
                //     label: "启用状态",
                //     defaultvalue:"0"
                // },
                {
                    type: "radio",
                    key: "isOutRange",
                    label: "赠品超范围禁止下单",
                    dataSource:[
                        {value:'1',name:'是'},
                        {value:'0',name:'否'},
                    ],
                    // url: window.pathMap.base +"/cust-doc-defs/cust_doc_code?cust_doc_code=QY083",
                    // namefield: "name",
                    // valuefield: "code"
                },
                {
                    type: "textarea",
                    key: "remark",
                    label: "描述",
                    cls: "ui-textarea-item"
                }
                // {
                //     type:"radio",
                //     key:"isBasicUnit",
                //     label:"基本单位",
                //     dataSource:[
                //         {value:'1',name:'是'},
                //         {value:'0',name:'否'},
                //     ],
                //     defaultvalue:"0"
                // },
                // {
                //     type: "text",
                //     key: "conversionRate",
                //     label: "换算率",
                // },
                // {
                //     type: "label",
                //     key: "isEnable",
                //     label: "启用状态",
                //     defaultvalue:"0"
                // },
                // {
                //     type: "textarea",
                //     key: "description",
                //     label: "描述",
                //     cls: "ui-textarea-item"
                // }
            ]
        },
        grids: {
            grid1: {
                domid: "rulelimit",
                umeta: {
                    id: "grid_rulelimit",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "contractTypeName",
                        dataType: "String",
                        title: "合同类型"
                    },
                    {
                        field: "saleOrgName",
                        dataType: "String",
                        title: "销售组织"
                    },
                    {
                        field: "debarProm",
                        dataType: "String",
                        title: "禁止使用促销",
                        renderType: "whetherRender"
                    },
                    {
                        field: "debarFee",
                        dataType: "String",
                        title: "禁止费用冲抵",
                        renderType: "whetherRender"
                    },
                    {
                        field: "isOutRange",
                        dataType: "String",
                        title: "赠品超范围禁止下单",
                        renderType: "whetherRender"
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
                        renderType: "enableRender"
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注"
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
