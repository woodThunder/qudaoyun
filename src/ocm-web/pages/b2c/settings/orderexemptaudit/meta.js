define(["ocm_basemodel"], function(basemodel) {
    var model = {
        metas: {
            orderexauditlist: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    isEnable: {
                        type: 'integer',
                    }, //是否自动免审
                    buyerMsg: {
                        type: 'integer',
                    }, //买家留言为空
                    sellerRemark: {
                        type: 'integer',
                    }, //卖家备注为空
                    ordersign: {
                        type: 'integer'
                    }, //订单无标记
                    isException: {
                        type: 'float'
                    }, //禁止异常订单审核通过
                    maxTotalReceivableFee: {
                        type: 'float'
                    }, //免审订单金额上限
                    minTotalReceivableFee: {
                        type: 'float'
                    }, //免审订单金额下限
                    orderGoods: {
                        type: 'integer'
                    }, //指定sku不免审
                    exemptAuditStore: {
                        type: "child",
                        meta: {
                            storeId: {
                                type: 'string'
                            },
                            platformName: {
                                type: 'string'
                            },
                            storeName: {
                                type: 'string'
                            },
                            storeId: {
                                type: 'string'
                            },
                            persistStatus: {
                                type: 'string'
                            }
                        }
                    },
                    exemptAuditGoods: {
                        type: "child",
                        meta: {
                            goodsCode: {
                                type: 'string'
                            },
                            goodsName: {
                                type: 'string'
                            },
                            goodsId: {
                                type: 'string'
                            },
                            persistStatus: {
                                type: 'string'
                            }
                        }
                    }
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
            platItem: {
                meta: {
                    storeId: {
                        type: 'string'
                    },
                    platformName: {
                        type: 'string',
                    }, //平台名称
                    storeName: {
                        type: 'string',
                    }, //店铺名称
                    persistStatus: {
                        type: 'string'
                    }
                }
            },
            skuItem: {
                meta: {
                    goodsCode: {
                        type: 'string',
                        required: true
                    }, //商品编码
                    goodsName: {
                        type: 'string',
                        required: true
                    }, //商品
                    goodsId: {
                        type: 'string'
                    },
                    persistStatus: {
                        type: 'string'
                    }
                },
            },
            ItemRef: {
                meta: {
                    productref: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods-no-version']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                    },
                    b2cStoreRef: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                    }
                }
            }
        },
        buttons: {
            button1: [{
                key: "plataddrow",
                label: "增行",
                iconCls: "icon-plus",
                click: "showAddPlatsRef"
            }, {
                key: "platdelrow",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delPlats",
            }],
            button2: [{
                key: "save",
                label: "保存",
                click: "saveBill",
                cls: "ui-btn-disabled",
            }],
            button3: [{
                key: "addrow",
                label: "增行",
                iconCls: "icon-plus",
                click: "showAddItemsRef"
            }, {
                key: "delrow",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delItems",
            }],
        },
        cards: {
            card1: [{
                type: "checkbox",
                key: "isEnable",
                label: "是否自动免审",
                default: 1,
                checkedValue: 1,
                unCheckedValue: 0
            }, ],
            card2: [{
                type: "checkbox",
                key: "buyerMsg",
                label: "买家留言为空",
                checkedValue: 1,
                unCheckedValue: 0
            }, {
                type: "checkbox",
                key: "sellerRemark",
                label: "卖家备注为空",
                checkedValue: 1,
                unCheckedValue: 0
            }, {
                type: "checkbox",
                key: "ordersign",
                label: "订单无标记",
                checkedValue: 1,
                unCheckedValue: 0
            }, {
                type: "checkbox",
                key: "isException",
                label: "禁止异常订单审核通过",
                checkedValue: 1,
                unCheckedValue: 0
            }, {
                type: "text",
                key: "maxTotalReceivableFee",
                label: " 免审订单金额上限",
            }, {
                type: "text",
                key: "minTotalReceivableFee",
                label: "免审订单金额下限",
            }, {
                type: "checkbox",
                key: "orderGoods",
                label: "指定sku不免审",
                checkedValue: 1,
                unCheckedValue: 0
            }]
        },
        grids: {
            grid1: {
                domid: "grid_platList_dom",
                umeta: {
                    "id": "grid_platList",
                    "data": "platList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "platformName",
                    "dataType": "String",
                    "title": "平台名称",
                }, {
                    "field": "storeName",
                    "dataType": "String",
                    "title": "店铺名称"
                }, ]
            },
            grid2: {
                domid: "grid_skuList_dom",
                umeta: {
                    "id": "grid_skuList",
                    "data": "skuList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "goodsCode",
                    "dataType": "String",
                    "title": "商品编码",
                }, {
                    "field": "goodsName",
                    "dataType": "String",
                    "title": "商品名称",
                }, ]
            },
        }
    }
    return new basemodel(model);
})