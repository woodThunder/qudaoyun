define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            unitmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.UnitDto"
                },
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true, maxLength: 50 },//名称
                    description: { type: 'string',  },//描述
                    symbol: {type: 'string'},// 单位符号
                    precision: { type: 'integer',  required: true},//小数位数
                    dimensionId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY083","refName":"所属量纲"}'},//所属量纲
                    dimensionCode: {type: 'string',  required: true},//所属量纲
                    dimensionName: {type: 'string',  required: true},//所属量纲
                    
                    isBasicUnit: { type: 'integer',  required: true},//是否基本单位
                    conversionRate: {type: 'string',regExp: /^[0-9]+([.]{1}[0-9]+){0,1}$/,errorMsg: '只允许输入数字'},//换算率
                    isEnable: { type: 'integer'},//是否启用
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
            }
            ]
        },
        searchs: {
            search1: [
                {
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
					type: "combo",
					key: "dimension",
					label: "所属量纲",
					url: window.pathMap.base +"/cust-doc-defs/cust_doc_code?cust_doc_code=QY083",
					namefield: "name",
					valuefield: "code"
				},
                {
                    type: "text",
                    key: "symbol",
                    label: "单位符号",
                },
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
                    type: "text",
                    key: "code",
                    label: "编码",
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "name",
                    label: "名称"
                },
                {
                    type: "text",
                    key: "precision",
                    label: "小数位数",
                },
                {
                    type: "text",
                    key: "symbol",
                    label: "单位符号",
                },
				{
					type: "combo",
					key: "dimensionCode",
					label: "所属量纲",
					url: window.pathMap.base +"/cust-doc-defs/cust_doc_code?cust_doc_code=QY083",
					namefield: "name",
					valuefield: "code"
				},
                {
                    type:"radio",
                    key:"isBasicUnit",
                    label:"基本单位",
                    dataSource:[
                        {value:'1',name:'是'},
                        {value:'0',name:'否'},
                    ],
                    defaultvalue:"0"
                },
                {
                    type: "text",
                    key: "conversionRate",
                    label: "换算率",
                },
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue:"0"
                },
                {
                    type: "textarea",
                    key: "description",
                    label: "描述",
                    cls: "ui-textarea-item"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "unit",
                umeta: {
                    id: "grid_unit",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "code",
                        dataType: "String",
                        title: "编码"
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "precision",
                        dataType: "integer",
                        title: "小数位数"
                    },
                    {
                        field: "symbol",
                        dataType: "String",
                        title: "单位符号"
                    },
                    {
                        field: "dimensionName",
                        dataType: "String",
                        title: "所属量纲"
                    },
                    {
                        field: "isBasicUnit",
                        dataType: "String",
                        title: "基本单位",
                        renderType: "whetherRender"
                    },
                    {
                        field: "conversionRate",
                        dataType: "Float",
                        title: "换算率",
                    },
                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人",
                        visible: false
                    },
                    {
                        field: "creationTime",
                        dataType: "Datetime",
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
                        dataType: "Datetime",
                        title: "修改时间",
                        visible: false
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
                        renderType: "enableRender"
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
