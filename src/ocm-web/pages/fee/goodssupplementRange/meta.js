define(["ocm_basemodel"], function (basemodel) {
    var model = {
        metas: {
        goodssupplementRange: {
                params: {
                    "cls": "com.yonyou.occ.fee.service.dto.GoodssupplementRangeDto"
                },
                meta: {
                    id: {
                        type: "string"
                    },
                    organizationId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["organization_ocm"]),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"", "EQ_orgFuncRel": "01"}',
                    },
                    organizationCode: {type: "string"},
                    organizationName: {type: "string"},
                    castTypeId: {type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["trantype"]),
                        clientParam: {"EQ_billTypeId":"CastType", "EQ_trantypeExtends.fieldName": "paymentMethod","EQ_trantypeExtends.fieldValue":"pay02"},
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    castTypeCode: {type: "string"},
                    castTypeName: {type: "string"},
                    customerCategoryId: {type: "string",
                        "refmodel": JSON.stringify(refinfo["customer_category"]),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}'
                    },
                    customerCategoryCode: {type: "string"},
                    customerCategoryName: {type: "string"},
                    customerId: {type: "string",
                        "refmodel": JSON.stringify(refinfo["customer"]),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    customerCode: {type: "string"},
                    customerName: {type: "string"},
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true
                //是否启用前端缓存
                // pageCache: true
            },
        goodssupplementRangeItem: {
                params: {
                    "cls": "com.yonyou.occ.fee.service.dto.GoodssupplementRangeItemDto"
                },
                meta: {
                    id: {
                        type: "string"
                    }, //idp
                    goodsCategoryId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["goodsCategory"]),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    goodsCategoryCode: {
                        type: "string"
                    },
                    goodsCategoryName: {
                        type: "string"
                    },
                    goodsId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["goods"]),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}'
                    },
                    goodsCode: {
                        type: "string"
                    },
                    goodsName: {
                        type: "string"
                    },
                    remove: {
                        type: "integer",
                        default: 0
                    },
                    version: {
                        type: "integer",
                    },
                    dr: {
                        type: "string"
                    } //修复删行报错
                },
                pageSize: 10
            },

    },
        searchs: {
            search1: [{
                type: "refer",
                key: "castType",
                label: "费用类型",
                refinfo: "trantype",
                clientParam: {"EQ_billTypeId":"CastType", "EQ_trantypeExtends.fieldName": "paymentMethod","EQ_trantypeExtends.fieldValue":"pay02"},
                multi:true
            }, {
                type: "refer",
                key: "organization",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: {"EQ_orgFuncRel":"01","EQ_isEnable":"1"},
                multi:true
            },{
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer",
                multi: true
            },{
                type: "refer",
                key: "customerCategory",
                label: "客户分类",
                refinfo: "customer_category",
                multi: true
            }
            ]
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "showAddBillPanel",
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del",
            }/*, {
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
            }*/],
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
                type: "refer",
                key: "organizationId",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: {"EQ_orgFuncRel":"01","EQ_isEnable":"1"},
            }, {
                type: "refer",
                key: "castTypeId",
                referId: "castTypeId",
                label: "费用类型",
                clientParam: {"EQ_billTypeId":"CastType", "EQ_trantypeExtends.fieldName": "paymentMethod","EQ_trantypeExtends.fieldValue":"pay02"},
            }, {
                type: "refer",
                key: "customerCategoryId",
                label: "客户分类",
                refinfo: "customer-category",
                compid: "customerCategoryIdBase",

            }, {
                type: "refer",
                key: "customerId",
                label: "客户",
                refinfo: "customers",
                compid: "customerIdBase",
            }]
        },
        details: {
            detail1: [{
                key: "organizationName",
                label: "销售组织",
            }, {
                key: "castTypeName",
                label: "费用类型",
            }, {
                key: "customerCategoryName",
                label: "客户分类",
            }, {
                key: "customerName",
                label: "客户",
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
                },
                columns: [{
                    "field": "organizationName",
                    "dataType": "String",
                    "title": "销售组织",
                    renderType: "detailRender",
                }, {
                    "field": "castTypeName",
                    "dataType": "String",
                    "title": "费用类型",

                }, {
                    "field": "customerCategoryName",
                    "dataType": "string",
                    "title": "客户分类",
                }, {
                    "field": "customerName",
                    "dataType": "string",
                    "title": "客户",
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
                    onBeforeEditFun: "ifCanEidtHandle"
                },
                columns: [{
                    "field": "goodsCategoryId",
                    "dataType": "String",
                    "title": "商品分类",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "goodsCategoryName",
                    "editOptions": {
                        "validType": "string",
                        "rel": {"refpk": "goodsCategoryId", "refcode": "goodsCategoryCode", "refname": "goodsCategoryName"}
                    }
                }, {
                    "field": "goodsId",
                    "dataType": "String",
                    "title": "商品",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "goodsName",
                    "editOptions": {
                        "validType": "string",
                        "rel": {"refpk": "goodsId", "refcode": "goodsCode", "refname": "goodsName","version":"version"}
                    }
                }, /*{
                    "field": "remove",
                    "dataType": "Integer",
                    "renderType": "booleanRender",
                    "title": "排除"
                }*/]
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
                    "field": "goodsCategoryId",
                    "required": "true",
                    "dataType": "String",
                    "title": "商品分类",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "goodsCategoryName",
                    "editOptions": {
                        "validType": "string",
                        "rel": {"refpk": "goodsCategoryId", "refcode": "goodsCategoryCode", "refname": "goodsCategoryName"}
                    }
                },{
                    "field": "goodsId",
                    "required": "true",
                    "dataType": "String",
                    "title": "商品",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "goodsName",
                    "editOptions": {
                        "validType": "string",
                        "rel": {"refpk": "goodsId", "refcode": "goodsCode", "refname": "goodsName","version":"version"}
                    }
                }, /*{
                    "field": "remove",
                    "dataType": "Integer",
                    "renderType": "booleanRender",
                    "title": "排除"
                }*/]
            }
        }
    };
    return new basemodel(model);
});
