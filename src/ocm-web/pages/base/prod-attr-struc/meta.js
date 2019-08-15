define(["ocm_basemodel"], function (basemodel) {
    var model = {
        metas: {
            prodAttrStruc: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.ProdAttrStrucDto"
                },
                meta: {
                    id: {
                        type: "string"
                    },
                    code: {
                        type: "string",
                        required: true
                    }, //编码
                    // 名称
                    name: {
                        type: "string",
                        required: true
                    },
                    // 备注
                    remark: {
                        type: "string",
                    },
                    // 是否启用
                    isEnable: {
                        type: "integer"
                    }
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true
                //是否启用前端缓存
                // pageCache: true
            },
            prodAttrStrucItem: {
                params: {
                    "cls": "com.yonyou.ocm.prom.service.dto.ProdAttrStrucItemDto"
                },
                meta: {
                    id: {
                        type: "string"
                    }, //idp
                    code: {
                        type: "string"
                    }, //编码
                    name: {
                        type: "string"
                    }, //名称
                    // productid: {type: 'string',required:true},//销售产品id
                    productAttrId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["productAttr"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        "refparam": "{\"EQ_isEnable\":\"1\"}"
                    }, //特征属性
                    productAttrCode: {
                        type: "string"
                    }, //特征属性编码
                    productAttrName: {
                        type: "string"
                    }, //特征属性名称
                    isKeyAttr: {
                        type: "integer",
                        default: 1
                    },
                    isOptionalAttr: {
                        type: "integer",
                        default: 0
                    },
                    isAffectPrice: {
                        type: "integer",
                        default: 0
                    },
                    displayOrder:{
                        type: "integer",
                    },
                    dr: {
                        type: "string"
                    } //修复删行报错
                },
                pageSize: 10
            },
            ItemRef: {
                meta: {
                    productattrRef: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["productInfo"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\": \"商品信息\",\"isMultiSelectedEnabled\":true}",
                        "refparam": "{\"EQ_isSaleProduct\":\"1\",\"EQ_isEnable\":\"1\"}"
                    }
                }
            }
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "编码"
            }, {
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "combo",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '0', name: '未启用' },
                    { value: '1', name: '已启用' },
                    { value: '2', name: '已停用' }
                ]
            }]
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "showAddBillPanel",
                auth: true
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del",
                auth: true
            }, {
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable",
                auth: true
            }, {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable",
                auth: true
            }, {
                key: "import",
                label: "导入",
                iconCls: "icon-import",
                click: "importHandle",
                auth: true
            }, {
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle",
                auth: true
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
                click: "addRow"
            }, {
                key: "delrow",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delItems"
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
            }]
        },
        cards: {
            card1: [{
                type: "text",
                key: "code",
                label: "编码",
                disableInEdit: true
            }, {
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "text",
                key: "remark",
                label: "备注"
            }, {
                type: "label",
                key: "isEnable",
                defaultvalue: "0",
                label: "启用状态"
            }]
        },
        details: {
            detail1: [
                {
                    key: "code",
                    label: "编码"
                },{
                key: "name",
                label: "名称"
            }, {
                key: "remark",
                label: "备注"
            }, {
                key: "isEnable",
                label: "启用状态",
                computed: "enableFmt"
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
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "编码",
                    "renderType": "detailRender"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "名称",
                }, {
                    "field": "remark",
                    "dataType": "String",
                    "title": "备注",
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    "renderType": "enableStatusRender"
                }, {
                    "field": "creator",
                    "dataType": "String",
                    "title": "创建人",
                    "visible": false
                }, {
                    "field": "creationTime",
                    "dataType": "Datetime",
                    "title": "创建时间",
                    "visible": false
                }, {
                    "field": "modifier",
                    "dataType": "String",
                    "title": "修改人",
                    "visible": false
                }, {
                    "field": "modifiedTime",
                    "dataType": "Datetime",
                    "title": "修改时间",
                    "visible": false
                }, {
                    "field": "operation",
                    "dataType": "String",
                    "title": "操作",
                    "renderType": "operation",
                    "fixed": true,
                    "width": "110px"
                }]
            },
            grid2: {
                domid: "grid_complexItem_dom",
                umeta: {
                    "id": "grid_complexItem",
                    "data": "complexItems",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true,
                    "onBeforeEditFun": "beforeEditCheck"
                },
                columns: [{
                    "field": "productAttrId",
                    "required": "true",
                    "dataType": "String",
                    "title": "属性",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "productAttrName",
                    "editOptions": {
                        "validType": "string",
                        "rel": { "refpk": "productAttrId", "refcode": "productAttrCode", "refname": "name" }
                    }
                }, {
                    "field": "name",
                    "required": "true",
                    "dataType": "String",
                    "title": "显示名称"
                }, {
                    "field": "isKeyAttr",
                    "dataType": "Integer",
                    "renderType": "booleanRender",
                    "title": "关键属性",
                    "defaultvalue": "1"
                }, {
                    "field": "isOptionalAttr",
                    "dataType": "Integer",
                    "renderType": "booleanRender",
                    "title": "选配属性",
                    "defaultvalue": "1"
                }, {
                    "field": "isAffectPrice",
                    "dataType": "Integer",
                    "renderType": "isAffectPriceRender",
                    "title": "是否影响价格",
                    "defaultvalue": 1
                }, {
                    "field": "displayOrder",
                    "dataType": "Integer",
                    "required": "true",
                    // "renderType": "booleanRender",
                    "title": "显示顺序",
                    // "defaultvalue": "1"
                }
                    // , {
                //     "field": "restrictAttrScope",
                //     "dataType": "Integer",
                //     "renderType": "booleanRender",
                //     "title": "限定可选值",
                //     "defaultvalue": "1"
                // }
                    ]
            },
            grid3: {
                domid: "grid_democomplexItem2_dom",
                umeta: {
                    "id": "grid_democomplexItem2",
                    "data": "complexItems",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": false,
                    "showNumCol": true
                },
                columns: [{
                    "field": "productAttrId",
                    "required": "true",
                    "dataType": "String",
                    "title": "属性",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "prodAttrName",
                    "editOptions": {
                        "validType": "string",
                        "rel": { "refpk": "productAttrId", "refcode": "productAttrCode", "refname": "productAttrName" }
                    }
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "显示名称"
                }, {
                    "field": "isKeyAttr",
                    "dataType": "Integer",
                    "renderType": "whetherRender",
                    "title": "关键属性",
                    "defaultvalue": "1"
                }, {
                    "field": "isOptionalAttr",
                    "dataType": "Integer",
                    "renderType": "whetherRender",
                    "title": "选配属性",
                    "defaultvalue": "1"
                }, {
                    "field": "isAffectPrice",
                    "dataType": "Integer",
                    "renderType": "whetherRender",
                    "title": "是否影响价格",
                    "defaultvalue": 1
                },{
                    "field": "displayOrder",
                    "dataType": "Integer",
                    "required": "true",
                    // "renderType": "booleanRender",
                    "title": "显示顺序",
                    // "defaultvalue": "1"
                }
                // , {
                //     "field": "isUseKeyVal",
                //     "dataType": "Integer",
                //     "renderType": "booleanRender",
                //     "title": "限定可选值",
                //     "defaultvalue": "1"
                // }
                ]
            }
        }
    };
    return new basemodel(model);
});
