define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            CustDocmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustDocDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    code: {
                        type: 'string',
                        required: true
                    }, //编码
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    remark: {
                        type: 'string'
                    }, //备注
                    isEnable: {
                        type: 'integer'
                    }, // 状态

                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
            CustDocDefmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustDocDefDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    code: {
                        type: 'string',
                        required: true
                    }, //编码
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    remark: {
                        type: 'string'
                    }, //备注
                    isEnable: {
                        type: 'integer'
                    }, // 状态
                    custDocId: {
                        type: 'string'
                    },
                    custDocName: {
                        type: 'string'
                    },
                    custDocCode: {
                        type: 'string',
                        required: true
                    },
                    custDocGroupId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["cusdoc_group"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}",
                        //"refparam": "{\"EQ_isEnable\":\"1\"}"
                    },
                    custDocGroupCode: {
                        type: 'string'
                    },
                    custDocGroupName: {
                        type: 'string'
                    }
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit",
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
            }],
            button2: [{
                key: "addrow",
                label: "增行",
                click: "addRow",
                cls: "ui-btn-orange",
                clickArg: "childList",
                iconCls: "icon-plus"
            }, {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "childList",
                iconCls: "icon-shanchu1"
            }, {
                key: "save",
                label: "保存",
                click: "saveCustdocdef",
                iconCls: "icon-tubiao-baocun"
            }],
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "档案定义编码"
            }, {
                type: "text",
                key: "name",
                label: "档案定义名称",
            }, {
                type: "combo",
                key: "isEnable",
                label: "启用状态",
                dataSource: [{
                    value: '',
                    name: '全部'
                }, {
                    value: '0',
                    name: '未启用'
                }, {
                    value: '1',
                    name: '已启用'
                }, {
                    value: '2',
                    name: '已停用'
                }]
            }]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "档案定义编码",
                disableInEdit: true
            }, {
                type: "text",
                key: "name",
                label: "档案定义名称"
            }, {
                type: "label",
                key: "isEnable",
                defaultvalue: '0',
                label: "启用状态",
            }, {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }]
        },
        grids: {
            grid1: {
                domid: "grid_CustDoc",
                umeta: {
                    "id": "grid_CustDoc",
                    "data": "simpleList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "code",
                    "dataType": "String",
                    "title": "档案定义编码"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "档案定义名称"
                }, {
                    "field": "remark",
                    "dataType": "String",
                    "title": "档案定义备注",
                    "visible": false
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "状态",
                    "renderType": "enableRender"
                }, {
                    "field": "creator",
                    "dataType": "String",
                    "title": "创建人",
                    "visible": false
                }, {
                    "field": "modifier",
                    "dataType": "String",
                    "title": "修改人",
                    "visible": false
                }, {
                    "field": "creationTime",
                    "dataType": "Datetime",
                    "title": "创建时间",
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
                    "width": "160px"
                }]
            },
            grid2: {
                domid: "grid_CustDocDef",
                umeta: {
                    "id": "CustDocDefList",
                    "data": "childList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                        "field": "code",
                        "dataType": "String",
                        "title": "内容编码"
                    }, {
                        "field": "name",
                        "dataType": "String",
                        "title": "内容名称"
                    }, {
                        field: "custDocGroupId",
                        dataType: "String",
                        title: "分组",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "custDocGroupName",
                        "required": true,
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "custDocGroupName": "custDocGroupName"
                            }
                        }
                    }
                    // {
                    //     "field": "operation",
                    //     "dataType": "String",
                    //     "title": "操作",
                    //     "renderType": "operation4single",
                    //     "fixed": true,
                    //     "width": "110px"
                    // }
                ]
            }
        }
    };
    return new basemodel(model);
});