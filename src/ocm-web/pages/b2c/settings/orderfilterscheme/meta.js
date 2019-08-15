define(["ocm_basemodel"], function(basemodel) {
    var model = {
        metas: {
            orderFilterScheme: {
                params: {
                    "cls": "com.yonyou.ocm.b2c.service.dto.OrderFilterSchemeDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    code: {
                        type: 'string',
                        required: true
                    }, //方案编码
                    name: {
                        type: 'string',
                        required: true
                    }, //方案名称
                    describe: {
                        type: 'string'
                    }, //方案描述
                    isEnable: {
                        type: 'integer',
                    }, //启用状态
                    // pkOrg: {
                    //   type: 'string',
                    //   required:true,
                    //   "refmodel": JSON.stringify(refinfo['organization_ocm']),
                    //   "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                    //   "refparam":'{"EQ_isAdministration": "1"}',
                    // },//组织
                    // pkOrgName: {type: 'string',required:true},//组织名称
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
                    }
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
            fieldConfigItem: {
                params: {
                    "cls": "com.yonyou.ocm.b2c.service.dto.OrderFilterFilterDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    },
                    fadId: {
                        type: 'string'
                    },
                    fieldsCode: {
                        type: 'string',
                    }, //字段编码
                    fieldsName: {
                        type: 'string',
                    }, //表名.字段名
                    fieldType: {
                        type: 'string',
                    },
                    computationRule: {
                        type: 'string'
                    }, //计算规则
                    showScope: {
                        type: 'string',
                        default: ' ',
                    },
                    scope: {
                        type: 'string',
                        default: ' '
                    }, //取值范围
                    scopeType: {
                        type: 'string'
                    },
                    scopeName: {
                        type: 'string'
                    },
                    dr: {
                        type: 'integer'
                    },
                    // productid: {type: 'string',required:true},//销售产品id
                    // productid: {
                    //     type: 'string',
                    //     // 'refmodel':JSON.stringify(refinfo['productInfo']),
                    //     // 'refcfg':'{"ctx":"/uitemplate_web"}',
                    //     // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
                    // },
                },
                pageSize: 10,
            },
            ItemRef: {
                meta: {
                    fieldschemeref: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['filerSchemeRef']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"defaultFieldCount": 1,"strFieldCode": ["refname"],"strFieldName": ["名称"]}',
                        'refparam': '{}',
                    },
                    logiComId: {
                        type: "string",
                        required: true,
                    },
                    showScope: {
                        type: 'string',
                        default: ' '
                    },
                    skuCode: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo['goods-no-version']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择","isMultiSelectedEnabled":true}',
                    }, //商品编码
                    //                  prototypeId: {
                    //                      type: 'string',
                    //                      "refmodel": JSON.stringify(refinfo['product']),
                    //                      "refcfg": '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                    //                      // "refparam": '{"EQ_productInfo.isUnconventionality":"0"}',
                    //                  }, //原型/异性产品ID
                    platformId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo['b2cplatform']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择","isMultiSelectedEnabled":true}'
                    }, //平台ID
                    storeId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择","isMultiSelectedEnabled":true}'
                    }, //平台IDb2cStoreRef
                    combineGoodsId: { //商品组合 
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['Combination']),
                        'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
                    },
                    provinceId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1"}',
                    }, //注册所在省份ID
                    cityId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2"}'
                    }, //注册所在城市ID
                    districtId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3"}'
                    }, //注册所在区/县
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4"}'
                    }, //注册所在街道/镇
                    scopecombo: {
                        type: "string"
                    },
                    scope: {
                        type: "float"
                    },
                    scope1: {
                        type: "float"
                    }, //条件值, 建立两个条件值是为了避免在增行的时候修改了新行而旧行受到影响
                    scopeStr: {
                        type: "string"
                    }, //条件值
                    scopeStr1: {
                        type: "string"
                    }, //条件值
                    scopeType: {
                        type: 'string'
                    },
                    scopeName: {
                        type: 'string'
                    },
                }
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "showAddBillPanel"
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
            }, {
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable"
            }, {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable"
            }, {
                key: "refresh",
                label: "刷新",
                iconCls: "icon-tubiao-huangou",
                click: "refresh"
            }],
            button2: [{
                key: "cancel",
                label: "取消",
                click: "cancelBill"
            }, {
                key: "save",
                label: "保存",
                click: "saveBill",
                cls: "ui-btn-green"
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
            button4: [{
                key: "return",
                label: "返回",
                click: "retListPanel"
            }, {
                key: "edit",
                label: "编辑",
                click: "detail2bill",
                cls: "ui-btn-green"
            }],
        },
        cards: {
            card1: [{
                type: "text",
                key: "code",
                label: "方案编码",
            }, {
                type: "text",
                key: "name",
                label: "方案名称",
            }, {
                type: "textarea",
                key: "describe",
                label: "方案描述",
                cls: "ui-textarea-item"
            }, {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                dataSource: CONST.ENABLESTATUS,
            }, ]
        },
        details: {
            detail1: [{
                key: "name",
                label: "方案名称",
            }, {
                key: "enableStatus",
                label: "启用状态",
                computed: "enableFmt"
            }, {
                key: "describe",
                label: "方案描述",
                cls: "ui-textarea-item-detail",
            }]
        },
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    "id": "grid_complex",
                    "data": "complexList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true,
                    "onBeforeClickFun": "detail"
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "方案编码",
                    // "renderType": "detailRender"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "方案名称"
                }, {
                    "field": "describe",
                    "dataType": "String",
                    "title": "方案描述"
                }, {
                    "field": "isEnable",
                    "dataType": "String",
                    "title": "启用状态",
                    "renderType": "enableStatusRender"
                }, {
                    "field": "creator",
                    "dataType": "String",
                    "title": "创建人"
                }, {
                    "field": "creationTime",
                    "dataType": "Datetime",
                    "title": "创建时间"
                }, {
                    "field": "modifier",
                    "dataType": "String",
                    "title": "修改人"
                }, {
                    "field": "modifiedTime",
                    "dataType": "Datetime",
                    "title": "修改时间"
                }, {
                    "field": "operation",
                    "dataType": "String",
                    "title": "操作",
                    "renderType": "operation",
                    "fixed": true,
                    "width": "100px"
                }, ]
            },
            grid2: {
                domid: "grid_complexItem_dom",
                umeta: {
                    "id": "grid_complexItem",
                    "data": "complexItems",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "fieldsName",
                    "dataType": "String",
                    "title": "字段名称",
                    "editable": false,
                    "required": true
                }, {
                    "field": "computationRule",
                    "dataType": "String",
                    "title": "计算规则",
                    "editType": "fieldsCombo",
                    "width": 300,
                    "renderType": "rules",
                    "required": true
                }, {
                    "field": "showScope",
                    "dataType": "String",
                    "title": "条件值",
                    "editable": true,
                    "width": 200,
                    "editType": "isRef",
                    "renderType": "comlogiCom",
                    "required": true
                }, ]
            },
            grid3: {
                domid: "grid_democomplexItem2_dom",
                umeta: {
                    "id": "grid_democomplexItem2",
                    "data": "complexItems",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": false,
                    "showNumCol": false,
                },
                columns: [{
                    "field": "fieldsName",
                    "dataType": "String",
                    "title": "字段名称",
                }, {
                    "field": "computationRule",
                    "dataType": "String",
                    "title": "计算规则",
                    "renderType": "rules",
                }, {
                    "field": "showScope",
                    "dataType": "String",
                    "title": "条件值",
                    "renderType": "comlogiCom",
                    "width": 200,
                }]
            },
        }
    }
    return new basemodel(model);
})