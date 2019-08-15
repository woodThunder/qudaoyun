define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            custpursalemeta: {
                meta: {
                    id: {type: "string"},//id
                    saleCustomerId: {type: "string", required: true}, //上级客户
                    saleOrganizationId: {type: "string"},//销售组织
                    saleOrganizationCode: {type: "string"},//销售组织
                    saleOrganizationName: {type: "string"},//销售组织
                    productLineId: {type: "string"}, //产品线
                    productLineCode: {type: "string"}, //产品线编码
                    productLineName: {type: "string"}, //产品线名称
                    brandId: {type: "string"}, //品牌ID
                    brandCode: {type: "string"}, //品牌编码
                    brandName: {type: "string"}, //品牌名称
                    purchaseCustomerId: {type: "string", required: true}// 下级客户
                },
                pageSize: 10
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit"
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
            }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "saleCustomer--id",
                label: "上级客户",
                refinfo: "customer",
				refcfg: {"ctx":"/uitemplate_web","refCode":"","refName":"","isMultiSelectedEnabled": "true"},
				opr: "IN",
            },{
                type: "refer",
                key: "purchaseCustomer--id",
                label: "下级客户",
                refinfo: "customer",
				refcfg: {"ctx":"/uitemplate_web","refCode":"","refName":"","isMultiSelectedEnabled": "true"},
				opr: "IN",
            },{
                type: "refer",
                key: "productLine--id",
                label: "产品线",
                refinfo: "productLine",
				refcfg: {"ctx":"/uitemplate_web","refCode":"","refName":"","isMultiSelectedEnabled": "true"},
				opr: "IN",
            },{
                type: "refer",
                key: "brand--id",
                label: "品牌",
                refinfo: "brand",
				refcfg: {"ctx":"/uitemplate_web","refCode":"","refName":"","isMultiSelectedEnabled": "true"},
				opr: "IN",
            }]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "saleCustomerId",
                label: "上级客户",
                refinfo: "customer"
            }, {
                type: "refer",
                key: "productLineId",
                compid: "productLineId",
                label: "产品线",
                refinfo: "productLine",

            }, {
                type: "refer",
                key: "brandId",
                compid: "brandId",
                label: "品牌",
                refinfo: "brand",
                referId:"brandId"
            }, {
                type: "refer",
                key: "purchaseCustomerId",
                label: "下级客户",
                refinfo: "customer"
            }]
        },
        grids: {
            grid1: {
                domid: "potype",
                umeta: {
                    id: "grid_potype",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "saleCustomerCode",
                    dataType: "String",
                    title: "上级客户编码"
                }, {
                    field: "saleCustomerName",
                    dataType: "String",
                    title: "上级客户名称"
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
                    field: "purchaseCustomerCode",
                    dataType: "String",
                    title: "下级客户编码"
                }, {
                    field: "purchaseCustomerName",
                    dataType: "String",
                    title: "下级客户名称"
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
                    dataType: "Date",
                    title: "创建时间",
                    visible: false
                }, {
                    field: "modifiedTime",
                    dataType: "Date",
                    title: "修改时间",
                    visible: false
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }
                ]
            }
        }
    };
    return new basemodel(model);
});
