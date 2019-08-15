define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            ProductAttrmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.ProductAttributeDto"
                },
                meta: {
                    id: {type: "string"},//id
                    code: {type: "string", required: true},//编码
                    name: {type: "string", required: true},//名称
                    productAttrTypeCode: {
                        type: "string", required: true
                        // "refmodel": JSON.stringify(refinfo['custdocdef']),
                        // "refcfg": '{"ctx":"/uitemplate_web","refCode":"GOODS_LIFECYCLE","refName":"特征属性类型"}'
                    },//特征属性类型
                    productAttrTypeName: {type: "string", default: "0"},//特征属性类型
                    isEnable: {type: "integer", required: true},// 状态
                    remark: {type: "string"},//备注
                    custDocId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["custDoc"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                        //'referparam'
                    },
                    systemDocId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["sys-doc"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    }
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true
            },
            ProductAttrValuemeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.ProductAttributeValueDto"
                },
                meta: {
                    id: {type: "string"},//id
                    code: {type: "string", required: true},//编码
                    name: {type: "string", required: true},//名称
                    isEnable: {type: "integer", default: "0"}// 状态
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true
            },
            CustDocmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustDocDto"
                },
                meta: {
                    id: {type: "string"},//id
                    code: {type: "string", required: true},//编码
                    name: {type: "string", required: true},//名称
                    isEnable: {type: "integer"}// 状态
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true
            },
            SysDocmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.SysDocDto"
                },
                meta: {
                    id: {type: "string"},//id
                    code: {type: "string", required: true},//编码
                    name: {type: "string", required: true},//名称
                    isEnable: {type: "integer"}// 状态
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true
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
                    {value: "", name: "全部"},
                    {value: "0", name: "未启用"},
                    {value: "1", name: "已启用"},
                    {value: "2", name: "已停用"}
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
                click: "addItem"
            }, {
                key: "delrow",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delItems"
            },{
                key: "enableVal",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enableVal",
                auth: true
            }, {
                key: "disableVal",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disableVal",
                auth: true
            }],
            button4: [{
                key: "cancel",
                label: "关闭",
                click: "retListPanel"
            }],
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
                type: "combo",
                key: "productAttrTypeCode",
                label: "类型",
                dataSource: "productAttrTypeDatasource"
            }, {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: "0"
            }, {
                type: "text",//"textarea",
                key: "remark",
                label: "备注"
            }, {
                type: "refer",
                key: "custDocId",
                compid: "custDoc",
                domid: "custDocId",
                label: "自定义档案"
                //referId: "custDoc",
            }, {
                type: "refer",
                key: "systemDocId",
                compid: "systemDoc",
                label: "系统档案"
                //referId: "systemDoc",
            }]
        },
        details: {
            detail1: [{
                key: "code",
                label: "编码"
            }, {
                key: "name",
                label: "名称"
            }, {
                key: "productAttrTypeName",
                label: "类型"
            }, {
                key: "isEnable",
                label: "启用状态",
                computed: "enableFmt"
            }, {
                key: "remark",
                label: "备注"
            }, {
                key: "custDocName",
                compid: "custDoc1",
                domid: "custDocId1",
                label: "自定义档案"
            }, {
                key: "systemDocName",
                compid: "systemDoc1",
                label: "系统档案"
            }]
        },
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    "id": "grid_complex",
                    "data": "ProAttrDocList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "编码",
                    renderType: "detailRender"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "名称"
                }, {
                    "field": "remark",
                    "dataType": "String",
                    "title": "备注"
                }, {
                    "field": "productAttrTypeName",
                    "dataType": "integer",
                    "title": "类型"
                    // "renderType": "cateGrid"
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    "renderType": "enableRender"
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
                    "data": "ProductAttrValueList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "特征属性编码",
                    required: true
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "特征属性值",
                    required: true
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    "editable": false,
                    required: true,
                    "width": "220px",
                    "editOptions": {
                        "id": "isEnablePAV",
                        "type": "combo",
                        "datasource": "enableRadioSrc"
                    },
                    "editType": "combo",
                    "renderType": "enableRender"
                }]
            },
            grid3: {
                domid: "grid_custdoc_dom",
                umeta: {
                    "id": "grid_custdoc",
                    "data": "CustDocList",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "特征属性编码"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "特征属性值"
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    "width": "220px",
                    "editOptions": {
                        "id": "isEnablePAV",
                        "type": "combo",
                        "datasource": "enableRadioSrc"
                    },
                    "editType": "combo",
                    "renderType": "enableRender"
                }]
            },
            grid4: {
                domid: "grid_complexItem_dom",
                umeta: {
                    "id": "grid_complexItem1",
                    "data": "ProductAttrValueList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "特征属性编码",
                    required: true
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "特征属性值",
                    required: true
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    required: true,
                    "width": "220px",
                    "editOptions": {
                        "id": "isEnablePAV",
                        "type": "combo",
                        "datasource": "enableRadioSrc"
                    },
                    "editType": "combo",
                    "renderType": "enableRender"
                }]
            },
            grid5: {
                domid: "grid_custdoc_dom",
                umeta: {
                    "id": "grid_custdoc1",
                    "data": "CustDocList",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "特征属性编码"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "特征属性值"
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    "width": "220px",
                    "editOptions": {
                        "id": "isEnablePAV",
                        "type": "combo",
                        "datasource": "enableRadioSrc"
                    },
                    "editType": "combo",
                    "renderType": "enableRender"
                }]
            },
            grid6: {
                domid: "grid_sysdoc_dom",
                umeta: {
                    "id": "grid_sysdoc",
                    "data": "SysDocList",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "特征属性编码"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "特征属性值"
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    "width": "220px",
                    "editOptions": {
                        "id": "isEnablePAV",
                        "type": "combo",
                        "datasource": "enableRadioSrc"
                    },
                    "editType": "combo",
                    "renderType": "enableRender"
                }]
            },
            grid7: {
                domid: "grid_sysdoc_dom",
                umeta: {
                    "id": "grid_sysdoc1",
                    "data": "SysDocList",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "特征属性编码"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "特征属性值"
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    "width": "220px",
                    "editOptions": {
                        "id": "isEnablePAV",
                        "type": "combo",
                        "datasource": "enableRadioSrc"
                    },
                    "editType": "combo",
                    "renderType": "enableRender"
                }]
            },
        }
    };
    return new basemodel(model);
});
