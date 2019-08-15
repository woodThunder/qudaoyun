define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            SpRelOrganizationmeta: {
                meta: {
                    id: { type: 'string' },//id
                    serviceProviderId: {
                        type: 'string', required: true,
                     
                    },//服务商id
                    serviceProviderName: { type: 'string' },//服务商名称
                    organizationId: {
                        type: 'string', required: true,
                    
                    },//组织id
                    organizationName: { type: 'string' },//组织名称
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
                type: "refer",
                key: "serviceProvider--id",
                label: "服务商",
                refinfo:"customer",
                clientParam: {
                    "EQ_isServiceProvider": "1",
                    "EQ_isEnable":"1"
                }
            },
            {
                type: "refer",
                key: "organization--id",
                label: "组织",
                refinfo:"organization_ocm"
            },
            ]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "serviceProviderId",
                label: "服务商编码",
                refinfo:"customer",
                isReturnCode: "true",
                rel:{"refname":"serviceProviderName"},
                clientParam: {
                    "EQ_isServiceProvider": "1",
                    "EQ_isEnable":"1",
                    "AUTH_refcod":"spRelOrganization"
                }
            },
            {
                type: "text",
                key: "serviceProviderName",
                label: "服务商名称",
                enable:false
            },
            {
                type: "refer",
                key: "organizationId",
                label: "组织编码",
                refinfo:"organization_ocm",
                isReturnCode: "true",
                rel:{"refname":"organizationName"},
                clientParam: {
                    "AUTH_refcod":"spRelOrganization"
                }
            },
            {
                type: "text",
                key: "organizationName",
                label: "组织名称",
                enable:false
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
                    field: "serviceProviderCode",
                    dataType: "String",
                    title: "服务商编码"
                },
                {
                    field: "serviceProviderName",
                    dataType: "String",
                    title: "服务商名称"
                },
                {
                    field: "organizationCode",
                    dataType: "String",
                    title: "组织编码"
                },
                {
                    field: "organizationName",
                    dataType: "String",
                    title: "组织名称"
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

