define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            creditoccupymeta: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    organizationId: {
                        type: 'string',
                        required: true
                    },
                    organizationName: {
                        type: 'string',
                        required: true
                    },
                    organizationCode: {
                        type: 'string',
                        required: true
                    },
                    saleOrgId: {
                        type: 'string',
                        required: true
                    },
                    saleOrgCode: {
                        type: 'string',
                        required: true
                    },
                    saleOrgName: {
                        type: 'string',
                        required: true
                    },
                    creditCtrlStrategyId: {
                        type: 'string',
                        required: true
                    },
                    creditCtrlStrategyCode: {
                        type: 'string',
                        required: true
                    },
                    creditCtrlStrategyName: {
                        type: 'string',
                        required: true
                    },
                    customerId: {
                        type: 'string',
                        required: true
                    },
                    customerCode: {
                        type: 'string',
                        required: true
                    },
                    customerName: {
                        type: 'string',
                        required: true
                    },
                    productGroupId: {
                        type: 'string',
                        required: true
                    },
                    productGroupCode: {
                        type: 'string',
                        required: true
                    },
                    productGroupName: {
                        type: 'string',
                        required: true
                    },
                    currencyId: {
                        type: 'string',
                        required: true
                    },
                    currencyCode: {
                        type: 'string',
                        required: true
                    },
                    currencyName: {
                        type: 'string',
                        required: true
                    },
                    creditLimit: {
                        type: 'amountFloat',
                        required: true
                    },
                    startDate: {
                        type: 'date',
                        required: true
                    },
                    endDate: {
                        type: 'date',
                        required: true
                    },
                    creditBalance: {
                        type: 'float',
                        required: true
                    },
                    preoccupyBalance: {
                        type: 'amountFloat',
                        required: true
                    },
                    occupyBalance: {
                        type: 'amountFloat',
                        required: true
                    },
                    preoccupyLimit: {
                        type: 'amountFloat',
                        required: true
                    },
                    occupyLimit: {
                        type: 'amountFloat',
                        required: true
                    }
                },
                pageSize: 10
            }
        },
        buttons: {
            button1: [ {
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle"
              }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "organization",
                label: "财务组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "07",
                    "AUTH_refdim":"creditCtrlStrategy.organization"
                }
            }, {
                type: "refer",
                key: "saleOrg",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "01",
                    "AUTH_refdim":"creditCtrlStrategy.saleOrg"
                }
            }, {
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer-muliti",
                clientParam: {
                    "AUTH_refdim":"customer"
                },
                opr: "IN"
            }, {
                type: "refer",
                key: "productGroup",
                label: "产品线",
                refinfo: "productLine"
            }]
        },
        dialogs: {
            dialog1: []
        },
        grids: {
            grid1: {
                domid: "creditlimit",
                umeta: {
                    id: "grid_creditlimit",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "creditCtrlStrategyName",
                    dataType: "String",
                    title: "控制策略",
                    // comid: "organization"
                }, {
                    field: "organizationName",
                    dataType: "String",
                    title: "财务组织",
                }, {
                    field: "saleOrgName",
                    dataType: "String",
                    title: "销售组织",
                }, {
                    field: "customerName",
                    dataType: "String",
                    title: "客户"
                }, {
                    field: "productGroupName",
                    dataType: "String",
                    title: "产品线"
                }, {
                    field: "currencyName",
                    dataType: "String",
                    title: "币种",
                    visible: false
                }, {
                    field: "creditLimit",
                    dataType: "String",
                    title: "信用额度"
                }, {
                    field: "preoccupyLimit",
                    dataType: "String",
                    title: "信用预占"
                }, {
                    field: "occupyLimit",
                    dataType: "String",
                    title: "信用占用"
                }, {
                    field: "preoccupyBalance",
                    dataType: "String",
                    title: "预占余额",
                }, {
                    field: "occupyBalance",
                    dataType: "String",
                    title: "占用余额",
                }, {
                    field: "startDate",
                    dataType: "Date",
                    title: "有效期开始"
                }, {
                    field: "endDate",
                    dataType: "Date",
                    title: "有效期结束"
                }]
            }
        }
    };
    return new basemodel(model);
});