define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            SysParamMeta: {
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    moudleId: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refname":"业务模型","refCode":"BUSINESS_MODULE"}',
                    },//业务模型
                    valueTypeCode: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refname":"参数值类型","refCode":"PARAM_VALUE_TYPE"}',
                    },//参数值类型
                    valueTypeName: { type: 'string' },//参数值
                    valueText: { type: 'string', required: true },//参数值
                    valueBoolean: { type: 'string', required: true },//参数值
                    valueNumber1: { type: 'string', regExp: /^\d+$/, required: true, errorMsg: "只能输入整数" },//换算率
                    valueNumber2: { type: 'string', regExp: /^[1-9]\d{0,17}(\.\d{1,6})?$/, required: true, errorMsg: "只能输入数字" },//换算率
                    valueDate: { type: 'string', required: true },//参数值
                   
                    value: { type: 'string'},//参数实际值
                    displayValue: { type: 'string'},//参数显示值
                    remark: { type: 'string' },//描述
                    isEnable: { type: 'integer' },// 状态

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
                type: "combo",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '0', name: '未启用' },
                    { value: '1', name: '已启用' },
                    { value: '2', name: '已停用' }
                ]
            }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "combo",
                    key: "moduleCode",
                    required: true,
                    label: "模块",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=BUSINESS_MODULE",
                    namefield: "name",
                    valuefield: "code",
                    disableInEdit: true
                },
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
                    disableInEdit: true
                },
                {
                    type: "combo",
                    key: "valueTypeCode",
                    required: true,
                    label: "参数值类型",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=PARAM_VALUE_TYPE",
                    namefield: "name",
                    valuefield: "code",
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "valueText",
                    compid: "valueText",
                    label: "参数值"
                },
                {
                    type: "radio",
                    key: "valueBoolean",
                    compid: "valueBoolean",
                    label: "参数值",
                    dataSource: [
                        { value: '1', name: '是' },
                        { value: '0', name: '否' },
                    ]
                },
                {
                    type: "integer",
                    // validType:"integer",
                    compid: "valueNumber1",
                    key: "valueNumber1",
                    label: "参数值",
                },
                {
                    type: "integer",
                    compid: "valueNumber2",
                    key: "valueNumber2",
                    label: "参数值",
                },
                {
                    type: "date",
                    key: "valueDate",
                    compid: "valueDate",
                    label: "参数值",
                },
                {
                    type: "label",
                    key: "isEnable",
                    defaultvalue: '0',
                    label: "启用状态",
                },
                {
                    type: "textarea",
                    key: "remark",
                    label: "备注",
                    cls: "ui-textarea-item",
                    disableInEdit: true
                },
              
            ]
        },
        grids: {
            grid1: {
                domid: "sysParams",
                umeta: {
                    id: "grid_params",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "moduleName",
                        dataType: "string",
                        title: "模块"
                    },
                    {
                        field: "code",
                        dataType: "string",
                        title: "编码"
                    },
                    {
                        field: "name",
                        dataType: "string",
                        title: "名称"
                    },
                    {
                        field: "valueTypeName",
                        dataType: "string",
                        title: "参数值类型",
                    },
                    {
                        field: "displayValue",
                        dataType: "string",
                        title: "参数值",
                    },
                    {
                        field: "remark",
                        dataType: "string",
                        title: "备注",
                    },
                    {
                        field: "isEnable",
                        dataType: "string",
                        title: "状态",
                        renderType: "enableRender"
                    },
                    {
                        field: "creator",
                        dataType: "string",
                        title: "创建人",
                        visible: false
                    },
                    {
                        field: "modifier",
                        dataType: "string",
                        title: "修改人",
                        visible: false
                    },
                    {
                        field: "creationTime",
                        dataType: "Datetime",
                        title: "创建时间",
                        visible: false
                    },
                    {
                        field: "modifiedTime",
                        dataType: "Datetime",
                        title: "修改时间",
                        visible: false
                    },
                    {
                        field: "operation",
                        dataType: "string",
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

