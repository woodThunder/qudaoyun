define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            customerJurisdictionMeta: {
                meta: {
                    id: { type: "string" },
                    customerId: { type: "string", required: true },
                    customerCode: { type: "string", required: true },
                    customerName: { type: "string" },
                    saleOrganizationId: { type: "string" },
                    saleOrganizationCode: { type: "string" },
                    saleOrganizationName: { type: "string" },
                    productLineId: { type: "string" },
                    productLineName: { type: "string" },
                    productLineCode: { type: "string" },
                    brandId: { type: "string" },
                    brandCode: { type: "string" },
                    brandName: { type: "string" },
                    saleDepartmentId: { type: "string" },
                    saleDepartmentCode: { type: "string" },
                    saleDepartmentName: { type: "string" },
                    customerManagerId: { type: "string" },
                    customerManagerCode: { type: "string" },
                    customerManagerName: { type: "string" },
                    customerLevelId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer-level']),
                        "refcfg": '{"ctx":"/uitemplate_web","refname":"客户等级","refCode":""}',
                    },
                    customerLevelCode: { type: "string" },
                    customerLevelName: { type: "string" },
                    marketAreaId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['market']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    marketAreaCode: { type: "string" },
                    marketAreaName: { type: "string" },
                    superiorCustomerId: { type: "string" },
                    superiorCustomerCode: { type: "string" },
                    superiorCustomerName: { type: "string" },
                    channelTypeId: { type: "string" },
                    channelTypeCode: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['channeltype']),
                        "refcfg": '{"ctx":"/uitemplate_web","refname":"渠道类型","refCode":""}',
                    },
                    channelTypeName: { type: "string" },
                },
                pageSize: 10
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit",
                auth:true
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del",
                auth:true
            }, {
                key: "import",
                label: "导入",
                iconCls: "icon-import",
                click: "importHandle"
            },
                {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle"
                }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "saleOrganization--id",
                keyfordisplay: "saleOrganizationName",
                label: "销售组织",
                refinfo: "organization_ocm",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                type: "refer",
                key: "superiorCustomer--id",
                label: "上级客户",
                refinfo: "customer",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            },{
                type: "refer",
                key: "customer--id",
                label: "客户",
                refinfo: "customer",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "customerId",
                label: "客户",
                refinfo: "customer",
                required: true
            }, {
                type: "refer",
                key: "saleOrganizationId",
                keyfordisplay: "saleOrganizationName",
                domid: "saleOrganization",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: { "EQ_orgFuncRel": "01" },
            }, {
                type: "refer",
                key: "productLineId",
                label: "产品线",
                refinfo: "productLine"
            }, {
                type: "refer",
                key: "brandId",
                label: "品牌",
                refinfo: "brand"
            }, {
                referId: "departmentId",
                type: "refer",
                compid: "saleDepartmentId",
                key: "saleDepartmentId",
                label: "销售部门",
                domid: "saleDepartmentId",
                refinfo: "department",
                enable: false
            }, {
                referId: "personId",
                type: "refer",
                domid: "customerManager",
                compid: "customerManager",
                key: "customerManagerId",
                label: "客户经理",
                refinfo: "person",
                enable: false
            }, {
                type: "refer",
                key: "customerLevelId",
                label: "客户等级",
                refinfo: "customer-level",
            }, {
                type: "refer",
                key: "marketAreaId",
                label: "市场区域",
                refinfo: "market",
            }, {
                type: "refer",
                key: "superiorCustomerId",
                label: "上级客户",
                refinfo: "customer",
            }, {
                type: "refer",
                key: "channelTypeCode",
                label: "渠道类型",
                refinfo: "channeltype",
            }
            ]
        },
        grids: {
            grid1: {
                domid: "custorg",
                umeta: {
                    id: "grid_custorg",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "customerCode",
                    dataType: "String",
                    title: "客户编码"
                }, {
                    field: "customerName",
                    dataType: "String",
                    title: "客户名称"
                }, {
                    field: "productLineCode",
                    dataType: "String",
                    title: "产品线编码"
                }, {
                    field: "productLineName",
                    dataType: "String",
                    title: "产品线名称"
                }, {
                    field: "brandCode",
                    dataType: "String",
                    title: "品牌编码"
                }, {
                    field: "brandName",
                    dataType: "String",
                    title: "品牌名称"
                }, {
                    field: "saleOrganizationCode",
                    dataType: "String",
                    title: "销售组织编码"
                }, {
                    field: "saleOrganizationName",
                    dataType: "String",
                    title: "销售组织名称"
                }, {
                    field: "superiorCustomerName",
                    dataType: "String",
                    title: "上级客户"
                }, {
                    field: "saleDepartmentName",
                    dataType: "String",
                    title: "销售部门"
                }, {
                    field: "customerManagerName",
                    dataType: "String",
                    title: "客户经理"
                }, {
                    field: "customerLevelName",
                    dataType: "String",
                    title: "客户等级"
                }, {
                    field: "marketAreaName",
                    dataType: "String",
                    title: "市场区域"
                }, {
                    field: "channelTypeName",
                    dataType: "String",
                    title: "渠道类型"
                }, {
                    field: "creator",
                    dataType: "String",
                    title: "创建人",
                    visible: false
                }, {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人",
                    visible: false
                }, {
                    field: "creationTime",
                    dataType: "Datetime",
                    title: "创建时间",
                    visible: false
                }, {
                    field: "modifiedTime",
                    dataType: "Datetime",
                    title: "修改时间",
                    visible: false
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }]
            }
        }
    };
    return new basemodel(model);
});
