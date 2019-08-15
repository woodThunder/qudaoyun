define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            billconvertrulemeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.BillConvertRuleDto"
                },
                meta: {
                    srcBillTypeId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["billtype"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"单据类型\"}"
                    },//来源单据类型id
                    srcBillTypeCode: {type: "string"},//来源单据类型code
                    srcBillTypeName: {type: "string"},//来源单据类型name
                    srcTranTypeId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["trantype"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"交易类型\"}"
                    },//来源交易类型id
                    srcTranTypeCode: {type: "string"},//来源交易类型code
                    srcTranTypeName: {type: "string"},//来源交易类型name
                    destBillTypeId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["billtype"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"单据类型\"}"
                    },//目的单据类型id
                    destBillTypeCode: {type: "string"},//目的单据类型code
                    destBillTypeName: {type: "string"},//目的单据类型name
                    destTranTypeId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["trantype"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"交易类型\"}"
                    },//目的交易类型id
                    destTranTypeCode: {type: "string"},//目的交易类型code
                    destTranTypeName: {type: "string"},//目的交易类型name
                    isPreset: {type: "integer", default: 0}
                },
                pageSize: 10
                //启用前端缓存
                // pageCache: true
            },
            billsplitrulemeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.BillConvertRuleDto"
                },
                meta: {
                    billConvertRuleId: {
                        type: "string"
                    },//单据转换规则
                    destBillFieldCode: {type: "string"},//目的字段
                    destBillFieldName: {type: "string"},//目的字段
                    isDefault: {type: "integer"},//是否默认
                    isReadonly: {type: "integer", default: 0},//是否只读
                    isValid: {type: "integer", default: 0}//是否生效
                },
                pageSize: 10
                //启用前端缓存
                // pageCache: true
            },

            billfieldmaprulemeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.BillConvertRuleDto"
                },
                meta: {
                    billConvertRuleId: {
                        type: "string"
                    },//单据转换规则
                    billFieldMapTypeCode: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"FIELD_MAP_TYPE\",\"refName\":\"映射类型\"}"
                    },//映射类型
                    billFieldMapTypeName: {type: "string"},//映射类型name
                    srcBillFieldCode: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["billField"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"单据字段\"}"

                    },//来源字段
                    srcBillFieldName: {type: "string"},//来源字段
                    destBillFieldCode: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["billField"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"单据字段\"}"
                    },//目的字段
                    destBillFieldName: {type: "string"},//目的字段
                    isDefault: {type: "integer"},//是否默认
                    isReadonly: {type: "integer"},//是否只读
                    isValid: {type: "integer"},//是否生效
                    destAssignedValue: {type: "string"}//目的字段值
                },
                pageSize: 10
                //启用前端缓存
                // pageCache: true
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
            }, {
                key: "fieldMapping",
                label: "字段映射",
                iconCls: "icon-tingyong",
                click: "fieldMapping"
            }, {
                key: "splitRule",
                label: "分单规则",
                iconCls: "icon-tingyong",
                click: "splitRule"
            }],
            button2: [{
                key: "addrow",
                label: "增行",
                click: "addRow",
                cls: "ui-btn-orange",
                clickArg: "fieldMappingList",
                iconCls: "icon-plus"
            },
                {
                    key: "delrow",
                    label: "删行",
                    click: "delChild",
                    clickArg: "fieldMappingList",
                    iconCls: "icon-shanchu1"
                }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "srcBillType",
                label: "来源单据类型",
                refinfo: "billtype"
            }, {
                type: "refer",
                key: "srcTranType",
                label: "来源交易类型",
                refinfo: "trantype"
            }, {
                type: "refer",
                key: "destBillType",
                label: "目的单据类型",
                refinfo: "billtype"
            }, {
                type: "refer",
                key: "destTranType",
                label: "目的交易类型",
                refinfo: "trantype"
            }]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "srcBillTypeId",
                label: "来源单据类型"
            }, {
                type: "refer",
                key: "srcTranTypeId",
                label: "来源交易类型",
                domid: "srcTranTypeIdinfo",
                // enable: false,
                compid: "srcTranTypeIdBase"
            }, {
                type: "refer",
                key: "destBillTypeId",
                label: "目的单据类型"
            }, {
                type: "refer",
                key: "destTranTypeId",
                label: "目的交易类型",
                domid: "destTranTypeIdinfo",
                // enable: false,
                compid: "destTranTypeIdBase"
            }]
        },
        grids: {
            grid1: {
                domid: "billConvertRule",
                umeta: {
                    id: "grid_billConvertRule",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "srcBillTypeName",
                    dataType: "String",
                    title: "来源单据类型"
                }, {
                    field: "srcTranTypeName",
                    dataType: "String",
                    title: "来源交易类型"
                }, {
                    field: "destBillTypeName",
                    dataType: "integer",
                    title: "目的单据类型"
                }, {
                    field: "destTranTypeName",
                    dataType: "String",
                    title: "目的交易类型"
                }, {
                    field: "operation",
                    editable: false,
                    dataType: "String",
                    title: "操作",
                    renderType: "operation",
                    fixed: true,
                    width: "240px"
                }]
            },
            grid2: {
                domid: "splitRule",
                umeta: {
                    id: "grid_splitRule",
                    data: "splitRuleList",
                    type: "grid",
                    editable: true,
                    showNumCol: true
                },
                columns: [{
                    field: "destBillFieldName",
                    dataType: "String",
                    title: "字段名称",
                    editable: false
                }, {
                    field: "destBillFieldCode",
                    dataType: "String",
                    title: "字段代码",
                    editable: false
                }, {
                    "field": "isValid",
                    "dataType": "Integer",
                    "renderType": "booleanRender",
                    "title": "选择",
                    "defaultvalue": "1"
                }]
            },
            grid3: {
                domid: "fieldMapping",
                umeta: {
                    id: "grid_fieldMapping",
                    data: "fieldMappingList",
                    type: "grid",
                    editable: true,
                    showNumCol: true,
                    multiSelect: true,
                },
                columns: [

                    {
                        field: "destBillFieldCode",
                        dataType: "String",
                        title: "目的单据字段",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "refname": "destBillFieldName"
                            }
                        },
                        showField: "destBillFieldName"
                    },
                    {
                        field: "destBillFieldName",
                        dataType: "String",
                        title: "目的单据字段",
                        visible: false,
                        editable: false
                    },

                    // {
                    //     field: "billFieldMapTypeCode",
                    //     dataType: "String",
                    //     title: "规则类型",
                    //     "renderType": "ncReferRender",
                    //     "editType": "ncReferEditType",
                    //     "editOptions": {
                    //         "validType": "string",
                    //         "rel": {
                    //             "refname": "billFieldMapTypeName"
                    //         }
                    //     },
                    //     required: true,
                    //     showField: "billFieldMapTypeName"
                    // },

                    {
                        "field": "billFieldMapTypeCode",
                        "dataType": "integer",
                        "title": "规则类型",
                        "editOptions": {
                            "id": "billFieldMapType",
                            "type": "combo",
                            "datasource": "billFieldMapTypeSource",
                        },
                        "editType": "combo",
                        "renderType": "billFieldMapTypeRender"
                    },
                    {
                        field: "srcBillFieldCode",
                        dataType: "String",
                        title: "来源单据字段",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "refname": "srcBillFieldName"
                            }
                        },
                        showField: "srcBillFieldName"
                    },
                    {
                        field: "srcBillFieldName",
                        dataType: "String",
                        title: "来源单据字段",
                        visible: false,
                        editable: false
                    },
                    {
                        field: "destAssignedValue",
                        dataType: "String",
                        title: "目的单据字段值",
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});
