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
                    }, //是否自动合并
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
                    creator: {
                        type: 'string'
                    },
                    creationTime: {
                        type: 'string'
                    },
                    persistStatus: {
                        type: 'string'
                    }
                }
            },
            ItemRef: {
                meta: {
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
        },
        cards: {
            card1: [{
                type: "checkbox",
                key: "isEnable",
                label: "是否自动合并",
                checkedValue: 1,
                unCheckedValue: 0
            }, ]
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
                }, {
                    "field": "creationTime",
                    "dataType": "Date",
                    "title": "创建时间"
                }, {
                    "field": "creator",
                    "dataType": "String",
                    "title": "创建人"
                }, ]
            },
        }
    }
    return new basemodel(model);
})