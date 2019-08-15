define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            creditoccupymeta: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    code: {
                        type: 'string',
                        required: true
                    },
                    name: {
                        type: 'string',
                        required: true
                    },
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
                    saleOrgName: {
                        type: 'string',
                        required: true
                    },
                    saleOrgCode: {
                        type: 'string',
                        required: true
                    },
                    isUnsetAsZero: {
                        type: 'integer',
                        required: true
                    },
                    isAccountCtrl: {
                        type: 'integer',
                        required: true
                    },
                    editCreditLimit: {
                        type: 'integer',
                        required: true
                    },
                    purchaseCreditPointId: {
                        type: 'string',
                        required: false
                    },
                    purchaseCreditPointCode: {
                        type: 'string',
                        required: false
                    },
                    purchaseCreditPointName: {
                        type: 'string',
                        required: false
                    },
                    purchaseCreditCtrlId: {
                        type: 'string',
                        required: false
                    },
                    purchaseCreditCtrlCode: {
                        type: 'string',
                        required: false
                    },
                    purchaseCreditCtrlName: {
                        type: 'string',
                        required: false
                    },
                    purchaseAccountCtrlId: {
                        type: 'string',
                        required: false
                    },
                    purchaseAccountCtrlCode: {
                        type: 'string',
                        required: false
                    },
                    purchaseAccountCtrlName: {
                        type: 'string',
                        required: false
                    },
                    dataCenterCreditPoint: {
                        type: 'string',
                        required: false
                    },
                    dataCenterCreditPointName: {
                        type: 'string',
                        required: false
                    },
                    orderSaveCreditCtrlId: {
                        type: 'string',
                        required: false
                    },
                    dataCenterCreditCtrlName: {
                        type: 'string',
                        required: false
                    },
                    orderSaveCreditCtrlName: {
                        type: 'string',
                        required: false
                    },
                    orderSaveAccountCtrlId: {
                        type: 'string',
                        required: false
                    },
                    dataCenterAccountCtrlName: {
                        type: 'string',
                        required: false
                    },
                    orderSaveAccountCtrlName: {
                        type: 'string',
                        required: false
                    },
                    isOrderCommitCreditCtrl: {
                        type: 'integer',
                        required: false
                    },
                    orderCommitCreditCtrlId: {
                        type: 'string',
                        required: false
                    },
                    orderCommitCreditCtrlCode: {
                        type: 'string',
                        required: false
                    },
                    orderCommitCreditCtrlName: {
                        type: 'string',
                        required: false
                    },
                    orderCommitAccountCtrlId: {
                        type: 'string',
                        required: false
                    },
                    orderCommitAccountCtrlCode: {
                        type: 'string',
                        required: false
                    },
                    orderCommitAccountCtrlName: {
                        type: 'string',
                        required: false
                    },
                    trantypeId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["trantype"]),
                        refparam: '{"EQ_billTypeId":"SaleOrder"}',
                        refcfg: '{"ctx":"/uitemplate_web","refName":"销售订单类型" }'
                    },
                    trantypeCode: {
                        type: 'string',
                        required: true
                    },
                    trantypeName: {
                        type: 'string',
                        required: true
                    },
                    controletime: {
                        type: 'string',
                        required: true
                    }, //控制时点临时字段
                    dataCenterCreditPoint: {
                        type: 'string'
                    }, //代客下单信用控制点
                    dataCenterCreditBillType: {
                        type: 'string'
                    }, //中台信用控制单据类型
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
            }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "organization",
                label: "财务组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "07"
                }
            }, {
                type: "refer",
                key: "saleOrg",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "01"
                }
            }, {
                type: "refer",
                key: "trantype",
                label: "订单类型",
                refinfo: "trantype",
                clientParam: {
                    "EQ_isEnable": "1",
                    "EQ_billTypeId": "SaleOrder"
                }
            }, ]
        },
        dialogs: {
            dialog1: [{
                    type: "text",
                    key: "code",
                    label: "策略编码",
                }, {
                    type: "text",
                    key: "name",
                    label: "策略名称",
                }, {
                    type: "refer",
                    key: "organizationId",
                    label: "财务组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "07"
                    }
                }, {
                    type: "refer",
                    key: "saleOrgId",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "01"
                    }
                }, {
                    type: "refer",
                    key: "trantypeId",
                    keyfordisplay: "trantypeName",
                    label: "订单类型",
                    refinfo: "trantype",
                    clientParam: {
                        "EQ_isEnable": "1",
                        "EQ_billTypeId": "SaleOrder"
                    }
                }, {
                    type: "combo",
                    key: "purchaseCreditPoint",
                    label: "门户控制时点",
                    // enable: false,
                    required:true,
                    dataSource: [{
                        value: 'commit',
                        name: '订单提交'
                    }],
                    defaultvalue: 'commit'
                }, {
                    type: "combo",
                    key: "purchaseCreditCtrl",
                    label: "门户额度控制方式",
                    // compid: "controletimeid",
                    // enable: false,
                    dataSource: [{
                        value: '01',
                        name: '提示'
                    }, {
                        value: '02',
                        name: '严格控制'
                    }, {
                        value: '03',
                        name: '不控制'
                    }, ],
                    defaultvalue: '01'
                }, {
                    type: "combo",
                    key: "purchaseAccountCtrl",
                    label: "门户信用账期控制方式",
                    // compid: "controletimeid",
                    // enable: false,
                    dataSource: [{
                        value: '01',
                        name: '提示'
                    }, {
                        value: '02',
                        name: '严格控制'
                    }, {
                        value: '03',
                        name: '不控制'
                    }, ],
                    defaultvalue: '01'
                }, {
                    type: "combo",
                    key: "controletime",
                    label: "中台控制时点",
                    compid: "controletimeid",
                    // enable: false,
                    dataSource: [{
                        value: 'SaleOrdercommit',
                        name: '订单提交'
                    }, {
                        value: 'SaleOrderapprovepass',
                        name: '订单审核'
                    }, {
                        value: 'DeliveryOrdercommit',
                        name: '发货单提交'
                    }, {
                        value: 'DeliveryOrderapprovepass',
                        name: '发货单审核'
                    }, ]
                }, {
                    type: "combo",
                    key: "dataCenterCreditCtrl",
                    label: "中台额度控制方式",
                    // compid: "controletimeid",
                    // enable: false,
                    dataSource: [{
                        value: '01',
                        name: '提示'
                    }, {
                        value: '02',
                        name: '严格控制'
                    }, {
                        value: '03',
                        name: '不控制'
                    }, ],
                    defaultvalue: '02'
                }, {
                    type: "combo",
                    key: "dataCenterAccountCtrl",
                    label: "中台账期控制方式",
                    // compid: "controletimeid",
                    // enable: false,
                    dataSource: [{
                        value: '01',
                        name: '提示'
                    }, {
                        value: '02',
                        name: '严格控制'
                    }, {
                        value: '03',
                        name: '不控制'
                    }, ],
                    defaultvalue: '02'
                }, {
                    type: "radio",
                    key: "isUnsetAsZero",
                    label: "未设置额度按额度为0处理",
                    labelcls: "w220",
                    dataSource: [{
                        value: '1',
                        name: '是'
                    }, {
                        value: '0',
                        name: '否'
                    }, ],
                    defaultvalue: '1'
                },
                {
                    type: "radio",
                    key: "editCreditLimit",
                    label: "信用额度可编辑",
                    labelcls: "w220",
                    dataSource: [{
                        value: "1",
                        name: "是"
                    }, {
                        value: "0",
                        name: "否"
                    }],
                    defaultvalue: "1"
                },
                // {
                //     type: "radio",
                //     key: "isAccountCtrl",
                //     label: "是否进行账期控制",
                //     labelcls: "w220",
                //     dataSource: [{
                //         value: '1',
                //         name: '是'
                //     }, {
                //         value: '0',
                //         name: '否'
                //     }, ],
                //     defaultvalue: '1'
                // }
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
                    // maxHeaderLevel: 2,
                },
                columns: [{
                        field: "code",
                        dataType: "String",
                        title: "策略编码",
                    }, {
                        field: "name",
                        dataType: "String",
                        title: "策略名称",
                    }, {
                        field: "organizationName",
                        dataType: "String",
                        title: "财务组织",
                        width: "250px"
                    }, {
                        field: "saleOrgName",
                        dataType: "String",
                        title: "销售组织",
                        width: "250px"
                    }, {
                        field: "trantypeName",
                        dataType: "String",
                        title: "订单类型"
                    }, {
                        field: "isUnsetAsZero",
                        dataType: "Integer",
                        title: "未设置额度按额度为0处理",
                        renderType: "whetherRender",
                        width: "200px"
                    },
                    //  {
                    //     field: "isAccountCtrl",
                    //     dataType: "Integer",
                    //     title: "是否进行账期控制",
                    //     renderType: "whetherRender",
                    //     width: "200px"
                    // }, 
                    {
                        field: "editCreditLimit",
                        dataType: "Integer",
                        title: "信用额度可编辑",
                        renderType: "whetherRender",
                        width: "200px"
                    }, {
                        field: "purchaseCreditPointName",
                        dataType: "String",
                        title: "门户信用控制点",
                        renderType: "creditControlPointRender",
                        width: "200px"
                    }, {
                        field: "purchaseCreditCtrlName",
                        dataType: "String",
                        title: "门户信用控制方式",
                        width: "200px"
                    }, {
                        field: "purchaseAccountCtrlName",
                        dataType: "String",
                        title: "门户信用账期控制方式",
                        width: "250px"
                    }, {
                        field: "dataCenterCreditPointName",
                        dataType: "Integer",
                        title: "中台控制时点",
                        width: "250px"
                    }, {
                        field: "dataCenterCreditCtrlName",
                        dataType: "String",
                        title: "中台额度控制方式",
                        width: "250px"
                    }, {
                        field: "dataCenterAccountCtrlName",
                        dataType: "String",
                        title: "中台账期控制方式",
                        width: "250px"
                    },
                    //  {
                    //     field: "isOrderCommitCreditCtrl",
                    //     dataType: "Integer",
                    //     title: "代客下单订单提交是否控制信用",
                    //     renderType: "whetherRender",
                    //     width: "250px"
                    // }, {
                    //     field: "orderCommitCreditCtrlCode",
                    //     dataType: "String",
                    //     title: "代客下单订单提交信用控制方式",
                    //     renderType: "creditControlTypeRender",
                    //     width: "250px"
                    // }, {
                    //     field: "orderCommitAccountCtrlCode",
                    //     dataType: "String",
                    //     title: "代客下单订单提交审批信用账期控制方式",
                    //     renderType: "creditControlTypeRender",
                    //     width: "300px"
                    // },
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