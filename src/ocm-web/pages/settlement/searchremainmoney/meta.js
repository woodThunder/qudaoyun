define(["ocm_basemodel"], function(basemodel) {
    var model = {
        metas: {
            complex: {
                params: {
                    "cls": "com.yonyou.ocm.prom.service.dto.complexDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    financeOrgId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
                    },
                    financeOrgName: {
                        type: 'string',
                    }, //财务组织
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"客户"}'
                    },
                    customerName: {
                        type: 'string',
                    }, //客户
                    saleOrgId: { //销售组织
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}' //销售组织
                    },
                    saleOrgCode: { //销售组织
                        type: 'string'
                    },
                    saleOrgName: { //销售组织
                        type: 'string'
                    },
                    initialBalance: {
                        type: 'float'
                    }, //期初余额
                    occurrenceOfThisPeriod: {
                        type: 'float'
                    }, //本期发生
                    currenTreceipts: {
                        type: 'float'
                    }, //本期收款
                    finalBalance: {
                        type: 'float'
                    }, //期末余额
                    creator: {
                        type: 'string'
                    },
                    creationTime: {
                        type: 'datetime'
                    },
                    modifier: {
                        type: 'string'
                    },
                    modifiedTime: {
                        type: 'datetime'
                    },
                    liaccountBalanceItemsGather: {
                        type: "child",
                        meta: {
                            creationTimeReceipt: {
                                type: 'datetime'
                            },
                            receiptCode: {
                                type: 'string'
                            },
                            receiptMoney: {
                                type: 'string'
                            },
                            srcBilltype: {
                                type: 'datetime'
                            },
                        }
                    },
                    liaccountBalanceItemsHappen: {
                        type: "child",
                        meta: {
                            beginBillcode: {
                                type: 'string'
                            },
                            calcType: {
                                type: 'string'
                            },
                            creationTimeReceivable: {
                                type: 'datetime'
                            },
                            goodsCode: {
                                type: 'string'
                            },
                            goodsId: {
                                type: 'string'
                            },
                            goodsName: {
                                type: 'string'
                            },
                            receivableCode: {
                                type: 'string'
                            },
                            receivableMoney: {
                                type: 'float'
                            },
                            srcBillcode: {
                                type: 'string'
                            },
                            srcBilltype: {
                                type: 'string'
                            }
                        }
                    }
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
            complexItem: {
                meta: {
                    id: {
                        type: 'string'
                    }, //idp
                    summary: {
                        type: 'string'
                    },
                    receiptMoney: {
                        type: 'float',
                    }, //收款金额
                    creationTimeReceipt: {
                        type: 'date',
                    }, //单据日期(创建日期)
                    receiptCode: {
                        type: 'string',
                    }, //收款单
                    srcBilltype: {
                        type: 'string'
                    }, //来源单据类型                    
                    calcType: {
                        type: 'integer',
                    }, //主表来源1为订单审批 2 为出库签字 3 应收单维护（主表来源与子表来源一致）
                    beginBillcode: {
                        type: 'string',
                    }, //源头单据号 订单号
                    srcBillcode: {
                        type: 'string',
                    }, //出库单号
                    receivableCode: {
                        type: 'string'
                    }, //应收单
                    creationTimeReceivable: {
                        type: 'date'
                    }, //单据日期(创建日期)
                    srcBilltype: {
                        type: 'string'
                    }, //来源单据类型
                    goodsName: {
                        type: 'date'
                    }, //商品
                    receivableMoney: {
                        type: 'string'
                    }, //收款金额
                    finalBalance: {
                        type: 'float'
                    }, //余额
                },
                pageSize: 10,
            },
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "financeOrg",
                label: "财务组织",
                refinfo: "organization_ocm",
                //isReturnCode: "true",
                clientParam: {
                    "EQ_orgFuncRel": "07",
                    "EQ_isEnable": "1"
                },
                required: true,
            }, {
                type: "refer",
                key: "saleOrg",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_isEnable": "1",
                    "EQ_orgFuncRel": "01"
                }, //销售组织
            }, {
                type: "daterange",
                key: "checkTime",
                label: "对账日期",
                required: true
            }, {
                type: "refer",
                key: "customer",
                label: "客户",
                referId: 'cstm01',
                refinfo: 'customer',
                clientParam: {
                    "EQ_isEnable": "1"
                },
            }, {
                type: "refer",
                key: "projectId",
                label: "项目",
                refinfo: "project"
            }, ]
        },
        buttons: {
            button1: [{
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle"
            }, ],
        },
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    "id": "grid_complex",
                    "data": "complexList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": false,
                    "showNumCol": true,
                    "onBeforeClickFun": "detail"
                },
                columns: [{
                        "field": "financeOrgName",
                        "dataType": "String",
                        "title": "财务组织",
                    }, {
                        "field": "saleOrgName",
                        "dataType": "String",
                        "title": "销售组织"
                    }, {
                        "field": "customerName",
                        "dataType": "String",
                        "title": "客户",
                    }, {
                        "field": "initialBalance",
                        "dataType": "Float",
                        "title": "期初业务应收余额",
                        "width": "200px"
                    }, {
                        "field": "occurrenceOfThisPeriod",
                        "dataType": "Float",
                        "title": "本期发生"
                    }, {
                        "field": "currenTreceipts",
                        "dataType": "Float",
                        "title": "本期收款"
                    }, {
                        "field": "finalBalance",
                        "dataType": "Float",
                        "title": "期末业务应收余额"
                    },
                    //  {
                    //     "field": "operation",
                    //     "dataType": "String",
                    //     "title": "操作",
                    //     "renderType": "operation",
                    //     "fixed": true,
                    //     "width": "100px"
                    // },
                ]
            },
            grid2: {
                domid: "grid_complexItem_dom",
                umeta: {
                    "id": "grid_complexItem",
                    "data": "complexItems",
                    "type": "grid",
                    "editable": false,
                    "columnMenu": false,
                    "canDrag": true,
                    "sortable": false,
                    "canSwap": false,
                    "groupField": "summary",
                    "groupSumRow": true,
                    "multiSelect": false,
                    "showNumCol": true,
                },
                columns: [{
                    "field": "summary",
                    "dataType": "String",
                    "title": "摘要",
                }, {
                    "field": "beginBillcode",
                    "dataType": "String",
                    "title": "订单号",
                }, {
                    "field": "srcBillcode",
                    "dataType": "String",
                    "title": "出库单号",
                }, {
                    "field": "receivableCode",
                    "dataType": "String",
                    "title": "应收单号",
                },{
                    "field": "creationTimeReceipt",
                    "dataType": "Date",
                    "title": "收款单日期",
                }, {
                    "field": "creationTimeReceivable",
                    "dataType": "Date",
                    "title": "应收单日期",
                }, {
                    "field": "goodsName",
                    "dataType": "String",
                    "title": "商品",
                }, {
                    "field": "receivableMoney",
                    "dataType": "Float",
                    "title": "应收金额",
                    "sumCol": true
                }, {
                    "field": "receiptCode",
                    "dataType": "String",
                    "title": "收款单号",
                }, {
                    "field": "receiptMoney",
                    "dataType": "Float",
                    "title": "收款金额",
                    "sumCol": true
                }, {
                    "field": "finalBalance",
                    "dataType": "Float",
                    "title": "余额",
                }, ]
            },
        }
    }
    return new basemodel(model);
})