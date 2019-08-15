define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            creditnolimitmeta: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
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
                    customerName: {
                        type: 'string',
                        required: true
                    },
                    isLimitCtrl: {
                        type: 'integer',
                        required: true
                    },
                    isAccountPeriodCtrl: {
                        type: 'integer',
                        required: true
                    },
                    customerLevelId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer-level']),
                        "refcfg": '{"ctx":"/uitemplate_web","refname":"客户等级","refCode":""}',
//                        required: true
                    }, //客户等级
                    customerLevelName: {
                        type: 'string'
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
            }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "creditCtrlStrategy--id",
                label: "信用控制策略",
                refinfo: "creditCtrlStrategy"
            }, {
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer",
                clientParam: {
                    "AUTH_refdim": "customer"
                }
            }]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "creditCtrlStrategyId",
                label: "信用控制策略",
                refinfo: "creditCtrlStrategy",
                domid: "creditCtrlStrategyId"
            }, {
                type: "refer",
                key: "customerId",
                label: "客户",
                refinfo: "customer",
                domid: "customerId",
                compid: "customerId",
            }, {
                type: "refer",
                key: "customerLevelId",
                label: "客户等级",
                refinfo: "customer-level",
                domid: "customerLevelId",
                compid: "customerLevelId",

            }, {
                type: "radio",
                key: "isLimitCtrl",
                label: "额度是否免检",
                dataSource: [{
                    value: '0',
                    name: '否'
                }, {
                    value: '1',
                    name: '是'
                }]
            }, {
                type: "radio",
                key: "isAccountPeriodCtrl",
                label: "账期是否免检",
                dataSource: [{
                    value: '0',
                    name: '否'
                }, {
                    value: '1',
                    name: '是'
                }]
            }]
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
                    field: "customerLevelName",
                    dataType: "String",
                    title: "客户等级",
                }, {
                    field: "isLimitCtrl",
                    dataType: "integer",
                    title: "额度是否免检",
                    renderType: "whetherRender"
                }, {
                    field: "isAccountPeriodCtrl",
                    dataType: "integer",
                    title: "账期是否免检",
                    renderType: "whetherRender"
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation",
                    fixed: true,
                    width: "160px"
                }]
            }
        }
    };
    return new basemodel(model);
});