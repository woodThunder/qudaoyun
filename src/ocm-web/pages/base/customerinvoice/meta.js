define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            CustomerInvoicemeta: {
                meta: {
                    id: { type: 'string' },//id
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//客户
                    customerCode: { type: 'string' },//客户
                    customerName: { type: 'string' },//客户
                    //发票类型
                    invoiceTypeId: {  type: 'string',
                    "refmodel": JSON.stringify(refinfo['custdocdef']),
                    "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY128"}',},
                    invoiceTypeCode: { type: 'string' },
                    invoiceTypeName: { type: 'string' },
                    invoiceOrgName: { type: 'string' },//开票单位名称
                    taxpayerNo: { type: 'string' },//纳税人号
                    address: { type: 'string' },//公司地址
                    tel: { type: 'string' },//联系电话
                    bank: { type: 'string' },//开户银行
                    bankAccount: { type: 'string' },//银行账户
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
            ]
        },
        searchs: {
            search1: [
            {
                type: "refer",
                key: "customerId",
                label: "客户",
            },
            {
                type: "refer",
                key: "invoiceTypeId",
                label: "发票类型",
            },
            {
                type: "text",
                key: "invoiceOrgName",
                label: "开票单位名称",
            },
            {
                type: "text",
                key: "taxpayerNo",
                label: "纳税人号",
            },
            {
                type: "text",
                key: "address",
                label: "公司地址",
            },
            {
                type: "text",
                key: "tel",
                label: "联系电话",
            },
            ]
        },
        dialogs: {
            dialog1: [ {
                type: "refer",
                key: "customerId",
                label: "客户",
            },
            {
                type: "refer",
                key: "invoiceTypeId",
                label: "发票类型",
            },
            {
                type: "text",
                key: "invoiceOrgName",
                label: "开票单位名称",
            },
            {
                type: "text",
                key: "taxpayerNo",
                label: "纳税人号",
            },
            {
                type: "text",
                key: "address",
                label: "公司地址",
            },
            {
                type: "text",
                key: "tel",
                label: "联系电话",
            },

            {
                type: "text",
                key: "bank",
                label: "开户行",
            },
            {
                type: "text",
                key: "bankAccount",
                label: "银行账号",
            },
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
                    field: "customerName",
                    dataType: "String",
                    title: "客户"
                },
                {
                    field: "invoiceTypeName",
                    dataType: "String",
                    title: "发票类型"
                },
                {
                    field: "invoiceOrgName",
                    dataType: "String",
                    title: "开票单位名称",
                },
                {
                    field: "taxpayerNo",
                    dataType: "String",
                    title: "纳税人号",
                },
                {
                    field: "address",
                    dataType: "String",
                    title: "公司地址",
                },
                {
                    field: "tel",
                    dataType: "String",
                    title: "联系电话",
                },
                {
                    field: "bank",
                    dataType: "String",
                    title: "开户银行",
                },
                {
                    field: "bankAccount",
                    dataType: "String",
                    title: "银行账户",
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

