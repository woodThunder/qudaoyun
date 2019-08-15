define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            ExacctRulemeta: {
                params: {
                    "cls": "com.yonyou.ocm.stlb2c.service.dto.ExacctRuleDto"
                },
                meta: {
                    // id: { type: 'string' },//id
                    sourcePlatform: { type: 'string', required: true,maxLength: 40 },//来源平台
                    exacctTypeId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['exacctType']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                        required: true
                    },
                    exacctTypeCode: { type: "string" },//收支类型编码
                    exacctTypeName: { type: "string" },//收支类型名称
                    billingTypeValue: { type: 'string', required: true ,maxLength: 40},//账单类型取值
                    billingTypeKey: { type: 'string', required: true ,maxLength: 40},//账单类型关键字匹配
                    platformNoValue: { type: 'string', required: true,maxLength: 40 },//平台单号取值
                    platformNoRule: { type: 'string', required: true,maxLength: 40 },//平台单号匹配规则
                    // isEnable: { type: 'integer', required: true},// 状态
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
            // {
            //     key: "enable",
            //     label: "启用",
            //     iconCls: "icon-qiyong",
            //     click: "enable"
            // },
            // {
            //     key: "disable",
            //     label: "停用",
            //     iconCls: "icon-tingyong",
            //     click: "disable"
            // }
            ]
        },
        searchs: {
            search1: [{
                type: "combo",
                key: "sourcePlatform",
                label: "来源平台",
                dataSource: [
                    { value: '1', name: '淘宝' },
                ]
            },
           
            {
                type: "refer",
                key: "exacctType--id",
                label: "收支类型",
                refinfo: "exacctType",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0",
                }
            },
            {
                type: "combo",
                key: "billingTypeValue",
                label: "账单类型取值",
                dataSource: [
                    { value: '1', name: '业务类型' },
                    { value: '2', name: '备注' }
                ]
            },
            {
                type: "combo",
                key: "platformNoValue",
                label: "平台单号取值",
                dataSource: [
                    { value: '1', name: '商户订单号' },
                    { value: '2', name: '备注' }
                ]
            }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "combo",
                    key: "sourcePlatform",
                    label: "来源平台",
                    dataSource: [
                        { value: '1', name: '淘宝' },
                    ]
                },
                {
                    type: "refer",
                    key: "exacctTypeId",
                    label: "收支类型",
                    refinfo: "exacctType",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0",
                    }
                },
                {
                    type: "combo",
                    key: "billingTypeValue",
                    label: "账单类型取值",
                    dataSource: [
                        { value: '1', name: '业务类型' },
                        { value: '2', name: '备注' }
                ]
                },
                {
                    type: "text",
                    key: "billingTypeKey",
                    label: "账单类型匹配规则",
                },
                {
                    type: "combo",
                    key: "platformNoValue",
                    label: "平台单号取值",
                    dataSource: [
                        { value: '1', name: '商户订单号' },
                        { value: '2', name: '备注' }
                    ]
                },
                {
                    type: "text",
                    key: "platformNoRule",
                    label: "平台单号匹配规则",
                }
            ]
        },
        grids: {
            grid1: {
                domid: "prodgroup",
                umeta: {
                    id: "grid_prodgroup",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "sourcePlatform",
                    dataType: "String",
                    title: "来源平台",
                    renderType:"sourcePlatformRender"
                },
                
                {
                    field: "exacctTypeName",
                    dataType: "String",
                    title: "收支类型"
                },
                {
                    field: "billingTypeValue",
                    dataType: "String",
                    title: "账单类型取值",
                    renderType:"billingTypeValueRender"
                },
                {
                    field: "billingTypeKey",
                    dataType: "String",
                    title: "账单类型匹配规则",
                    // renderType: "enableRender"
                },
                {
                    field: "platformNoValue",
                    dataType: "String",
                    title: "平台单号取值",
                    renderType:"platformNoValueRender"
                },
                {
                    field: "platformNoRule",
                    dataType: "String",
                    title: "平台单号匹配规则"
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

