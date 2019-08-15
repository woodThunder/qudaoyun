define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            creditlimitmeta: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    // organizationId: {type: 'string', required: true},
                    // organizationName: {type: 'string', required: true},
                    // organizationCode: {type: 'string', required: true},
                    // saleOrgId: {type: 'string', required: true},
                    // saleOrgCode: {type: 'string', required: true},
                    // saleOrgName: {type: 'string', required: true},
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
                    creditLimitApprovalFormCode: {
                        type: 'string'
                    },
                    productGroupId: {
                        type: 'string',
                        required: false
                    },
                    productGroupCode: {
                        type: 'string',
                        required: false
                    },
                    productGroupName: {
                        type: 'string',
                        required: false
                    },
                    currencyId: {
                        type: 'string',
                        required: false
                    },
                    currencyCode: {
                        type: 'string',
                        required: false
                    },
                    currencyName: {
                        type: 'string',
                        required: false
                    },
                    editCreditLimit: {
                        type: 'integer'
                    },
                    creditLimit: {
                        type: 'float',
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
                    isEnable: {
                        type: 'integer',
                        default: "1"
                    }, //是否启用
                    preoccupyLimit: {
                        type: 'float',
                        required: true
                    }
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
                }, {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del"
                },
                /*
                //20180918 jira PTQDYGG-1039
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
                }*/
                {
                    key: "import",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importHandle"
                }, {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle"
                }
            ]
        },
        searchs: {
            search1: [
                // {
                //     type: "refer",
                //     key: "organization",
                //     label: "财务组织",
                //     refinfo: "organization_ocm",
                //     clientParam: {"EQ_isLegalPersonCorp": "1"}
                // },
                // {
                //     type: "refer",
                //     key: "saleOrg",
                //     label: "销售组织",
                //     refinfo: "organization_ocm",
                //     clientParam: {"EQ_isSale": "1"}
                // },
                {
                    type: "refer",
                    key: "creditCtrlStrategy",
                    label: "信用控制策略",
                    refinfo: "creditCtrlStrategy",
                    clientParam: {
                        "AUTH_refdim":"creditCtrlStrategy"
                    }
                }, {
                    type: "refer",
                    key: "customer",
                    label: "客户",
                    refinfo: "customer",
                    clientParam: {
                        "AUTH_refdim":"customer"
                    }
                }, {
                    type: "refer",
                    key: "productGroup",
                    label: "产品线",
                    refinfo: "productLine"
                },
                /*{
                    type: "combo",
                    key: "isEnable",
                    label: "启用状态",
                    dataSource: [
                        { value: '', name: '全部' },
                        { value: '0', name: '未启用' },
                        { value: '1', name: '已启用' },
                        { value: '2', name: '已停用' }
                    ]
                }*/
            ]
        },
        dialogs: {
            dialog1: [
                // {
                //     type: "refer",
                //     key: "organizationId",
                //     keyfordisplay: "organizationName",
                //     label: "财务组织",
                //     refinfo: "organization_ocm",
                //     clientParam: {"EQ_isLegalPersonCorp": "1"}
                // },
                // {
                //     type: "refer",
                //     key: "saleOrgId",
                //     keyfordisplay: "saleOrgName",
                //     label: "销售组织",
                //     refinfo: "organization_ocm",
                //     clientParam: {"EQ_isSale": "1"}
                // },
                {
                    type: "refer",
                    key: "creditCtrlStrategyId",
                    // keyfordisplay: "creditCtrlStrategyName",
                    label: "信用控制策略",
                    refinfo: "creditCtrlStrategy",
                    // clientParam:{"dr":"0"}
                    domid: "creditCtrlStrategyId"
                }, {
                    type: "refer",
                    key: "customerId",
                    keyfordisplay: "customerName",
                    label: "客户",
                    refinfo: "customer"
                }, {
                    type: "refer",
                    key: "productGroupId",
                    keyfordisplay: "productGroupName",
                    label: "产品线",
                    refinfo: "productLine"
                    // multi:true
                }, {
                    type: "float",
                    key: "creditLimit",
                    label: "信用额度",
                    compid: "creditLimitdialog",
                    domid: "creditLimitdialog",

                },
                // {
                //     type: "refer",
                //     key: "currencyId",
                //     keyfordisplay: "currencyName",
                //     label: "币种",
                //     refinfo: "currency"
                // },
                {
                    type: "datetime",
                    key: "startDate",
                    label: "有效期从",
                }, {
                    type: "datetime",
                    key: "endDate",
                    label: "有效期至",
                },
                /*{
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: "1"
                }*/
            ]
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
                columns: [
                    // {
                    //     field: "organizationName",
                    //     dataType: "String",
                    //     title: "财务组织",
                    // },
                    // {
                    //     field: "saleOrgName",
                    //     dataType: "String",
                    //     title: "销售组织",
                    // },
                    {
                        field: "creditCtrlStrategyCode",
                        dataType: "String",
                        title: "策略编码",
                    }, {
                        field: "creditCtrlStrategyName",
                        dataType: "String",
                        title: "策略名称",
                    }, {
                        field: "customerName",
                        dataType: "String",
                        title: "客户",
                    }, {
                        field: "productGroupName",
                        dataType: "String",
                        title: "产品线",
                    }, {
                        field: "creditLimit",
                        dataType: "Float",
                        title: "信用额度",
                    }, {
                        field: "currencyName",
                        dataType: "String",
                        title: "币种",
                    }, {
                        field: "creditLimitApprovalFormCode",
                        dataType: "String",
                        title: "审批单号",
                    }, {
                        field: "startDate",
                        dataType: "datetime",
                        title: "有效期开始",
                    }, {
                        field: "endDate",
                        dataType: "datetime",
                        title: "有效期结束",
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
                    },
                    // {
                    //     field: "isEnable",
                    //     dataType: "String",
                    //     title: "启用状态",
                    //     visible: false,
                    //     renderType: "enableRender"
                    // },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation",
                        fixed: true,
                        width: "160px"
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});