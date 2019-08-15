define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            CustomerContactmeta: {
                meta: {
                    id: { type: 'string' },//id
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//客户
                    customerCode: { type: 'string' },//客户
                    customerName: { type: 'string' },//客户
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    //类别
                    contactTypeId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY118","refName":"联系人类别"}'
                    },
                    contactTypeCode: { type: 'string' },
                    contactTypeName: { type: 'string' },
                    tel: { type: 'string' },//电话
                    phone: { type: 'string' },//手机
                    fax: { type: 'string' },//传真
                    address: { type: 'string' },//地址
                    email: { type: 'string' },//邮箱
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
                type: "refer",
                key: "contactTypeId",
                label: "类别",
            },
            ]
        },
        dialogs: {
            dialog1: [{
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
                type: "refer",
                key: "customerId",
                label: "客户",
            },
            {
                type: "refer",
                key: "contactTypeId",
                label: "类别",
            },
            {
                type: "text",
                key: "tel",
                label: "电话"
            },
            {
                type: "text",
                key: "phone",
                label: "手机"
            },
            {
                type: "text",
                key: "fax",
                label: "传真"
            },
            {
                type: "text",
                key: "address",
                label: "地址"
            },
            {
                type: "text",
                key: "email",
                label: "邮箱"
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
                    field: "customerName",
                    dataType: "String",
                    title: "客户",
                },
                {
                    field: "contactTypeName",
                    dataType: "String",
                    title: "类别",
                },
                {
                    field: "ifPerfAppraisal",
                    dataType: "String",
                    title: "绩效考核",
                    renderType: "whetherRender"
                },
                {
                    field: "tel",
                    dataType: "String",
                    title: "电话",
                },
                {
                    field: "phone",
                    dataType: "String",
                    title: "手机",
                },
                {
                    field: "fax",
                    dataType: "String",
                    title: "传真",
                },
                {
                    field: "address",
                    dataType: "String",
                    title: "地址",
                },
                {
                    field: "email",
                    dataType: "String",
                    title: "邮箱",
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

