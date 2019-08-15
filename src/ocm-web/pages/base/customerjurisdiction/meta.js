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
                    goodsCategoryId: { type: "string" },
                    goodsCategoryName: { type: "string" },
                    goodsCategoryCode: { type: "string" },
                    productSaleSeriesId: { type: "string"},
                    // productSaleSeriesName: { type: "string" },
                    // productSaleSeriesCode: { type: "string" },
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
                        "refmodel": JSON.stringify(refinfo['channel-type']),
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
                key: "edit",
                label: "编辑",
                iconCls: "icon-edit",
                click: "edit1",
                auth:true
            },
                {
                key: "import",
                label: "导入",
                iconCls: "icon-import",
                click: "importHandle",
                auth:true
            },
                {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle",
                    auth:true
                }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "customer--id",
                label: "客户",
                refinfo: "customer",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                type: "refer",
                key: "saleOrganization--id",
                keyfordisplay: "saleOrganizationName",
                label: "销售组织",
                refinfo: "organization_ocm",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                refparam: {
                    "EQ_orgFuncRel": "01"
                },
                opr: "IN",
            }, {
                type: "refer",
                key: "productLine--id",
                label: "产品线",
                refinfo: "productLine",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                type: "refer",
                key: "goodsCategory--id",
                label: "商品分类",
                refinfo: "goodsCategory",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            // },{
            //     type: "refer",
            //     key: "productSaleSeries--id",
            //     label: "销售系列",
            //     refinfo: "productSaleSeries",
            //     refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
            //     opr: "IN",
            },{
                type: "refer",
                key: "brand--id",
                label: "品牌",
                refinfo: "brand",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                type: "refer",
                key: "saleDepartment--id",
                domid: "saleDepartment--id",
                label: "销售部门",
                // enable:false,
                refinfo: "department",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                type: "refer",
                key: "customerManager--code",
                label: "客户经理",
                refinfo: "accountManager",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                type: "refer",
                key: "superiorCustomer--id",
                label: "渠道上级",
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
                compid:"saleOrganizationId",
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
                key: "goodsCategoryId",
                label: "商品分类",
                refinfo: "goodsCategory"
            // }, {
            //     type: "refer",
            //     key: "productSaleSeriesId",
            //     label: "销售系列",
            //     refinfo: "productSaleSeries"
            }, {
                type: "refer",
                key: "brandId",
                label: "品牌",
                refinfo: "brand"
            }, {
                type: "refer",
                key: "productSaleSeriesId",
                refinfo: "saleSerial",
                label: "销售系列",
                clientParam: {
                    "EQ_isEnable": "1"
                }
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
                domid:"marketAreaId",
                label: "市场区域",
                refinfo: "market",
            }, {
                type: "refer",
                key: "superiorCustomerId",
                label: "渠道上级",
                compid:"superiorCustomerId",
                refinfo: "customer",
            }, {
                type: "refer",
                key: "channelTypeId",
                label: "渠道类型",
                refinfo: "channel-type",
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
                    field: "goodsCategoryCode",
                    dataType: "String",
                    title: "商品分类编码"
                }, {
                    field: "goodsCategoryName",
                    dataType: "String",
                    title: "商品分类名称"
                },{
                    field: "productSaleSeriesCode",
                    dataType: "String",
                    title: "销售系列编码",
                    visible: false
                }, {
                    field: "productSaleSeriesName",
                    dataType: "String",
                    title: "销售系列名称",
                    visible: false
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
                    title: "渠道上级"
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
                }/*, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    enable:false,
                    width: "110px"
                }*/]
            }
        }
    };
    return new basemodel(model);
});
