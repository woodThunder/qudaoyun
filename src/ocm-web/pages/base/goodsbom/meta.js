define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            goodsbommeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.GoodsBomDto"
                },
                meta: {
                    id: {type: "string"},//id
                    bomCode: {type: "string", required: true},//编码
                    parentGoodsId: {
                        type: "string", required: true,
                        "refmodel": JSON.stringify(refinfo["goods"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"isReturnCode\":true}",
                        "refparam": "{\"EQ_isEnable\":\"1\", \"EQ_enableStrucManage\": \"1\",\"AUTH_refdim\":\"parentGoodsId\"}"
                    },//父类商品名称
                    parentGoodsCode: {type: "string"},//父类商品名称
                    parentGoodsName: {type: "string"},//父类商品名称
                    bomTypeCode: {
                        type: "string",
                        default: "01",
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"BOM_TYPE\",\"refName\":\"bom类型\"}"
                    },//bom类型
                    bomTypeName: {type: "string", required: true},//bom类型
                    isEnable: {type: "string", required: true},// 状态
                    goodsBomChildren: {type: "string"}//子项集合
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true，
            },
            goodsbomchildmeta: {
                meta: {
                    id: {type: "string"},//id
                    goodsBomId: {type: "string"},//商品结构
                    goodsBomCode: {type: "string"},//商品结构
                    goodsBomName: {type: "string"},//商品结构
                    parentGoodsId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["goods"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}",
                        "refparam": "{\"EQ_isEnable\":\"1\",\"AUTH_refdim\":\"parentGoodsId\"}"
                    },//父类商品
                    parentGoodsCode: {type: "string"},//父类商品
                    parentGoodsName: {type: "string"},//父类商品
                    childGoodsId: {
                        type: "string", required: true,
                        "refmodel": JSON.stringify(refinfo["goods"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}",
                        "refparam": "{\"EQ_isEnable\":\"1\",\"AUTH_refdim\":\"goodsBomChildren.childGoodsId\"}"
                    },//子项商品
                    childGoodsCode: {type: "string", required: true},//子项商品
                    childGoodsName: {type: "string", required: true},//子项商品
                    childGoodsQty: {
                        type: "integer",
                        required: true,
                        regExp: /^[1-9]\d{0,17}(\.\d{1,6})?$/,
                        errorMsg: "只能0或正整数"
                    },// 数量
                    parentGoodsVersion: {type: "string"},//版本号
                    childGoodsSpecification: {type: "string"},
                    childGoodsVersion: {type: "string"},
                    childGoodsModel: {type: "string"},
                    childGoodsUnitName: {type: "string"},
                    isOptional: {type: "integer"}
                },
                pageSize: 10
            }
        },
        //操作按钮组
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
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable"
            }, {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable"
            }],
            button2: [{
                key: "return",
                label: "返回",
                cls: "ui-btn-green",
                click: "backPanel"
            }],
            button3: [{
                key: "save",
                label: "保存",
                click: "saveHandle",
                iconCls: "icon-tubiao-baocun"
            }, {
                key: "cancel",
                label: "取消",
                click: "cancelHandle",
                iconCls: "icon-tubiao-guanbi-anxing"
            }],
            button4: [{
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
            }]
        },

        //查询条件组
        searchs: {
            search1: [{
                type: "refer",
                key: "parentGoodsId",
                compid: "parentGoodsId",
                label: "父项",
                refinfo: "goods",
                clientParam: {
                    "EQ_enableStrucManage": "1",
                    "EQ_isEnable": "1",
                    "AUTH_refdim": "parentGoodsId"
                }
            }, {
                type: "refer",
                key: "goodsBomChildren--childGoodsId",
                compid: "goodsBomChildren--childGoodsId",
                label: "子项",
                refinfo: "goods",
                clientParam: {
                    "EQ_isEnable": "1",
                    "AUTH_refdim": "goodsBomChildren.childGoodsId"
                }
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
        cards: {
            card1: [{
                type: "refer",
                key: "parentGoodsId",
                label: "父项商品编码",
                rel: {
                    "refname": "parentGoodsName",
                    "version": "parentGoodsVersion",
                    "specification": "parentGoodsSpecification",
                    "model": "parentGoodsModel",
                    "basicUnitName": "parentGoodsUnitName"
                },
                clientParam: {
                    "EQ_enableStrucManage": "1",
                    "EQ_isEnable": "1"
                }
            }, {
                type: "text",
                key: "parentGoodsName",
                label: "父项商品名称",
                enable: false
            }, {
                type: "text",
                key: "parentGoodsVersion",
                label: "父项商品版本号",
                enable: false
            }, {
                type: "text",
                key: "parentGoodsSpecification",
                label: "规格",
                enable: false
            }, {
                type: "text",
                key: "parentGoodsModel",
                label: "型号",
                enable: false
            }, {
                type: "text",
                key: "parentGoodsUnitName",
                label: "单位",
                enable: false
            }, {
                type: "combo",
                key: "bomTypeCode",
                enable: true,
                defaultvalue: "01",
                label: "BOM类型",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=BOM_TYPE",
                namefield: "name",
                valuefield: "code"
            }, {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: "0"
            }]
        },
        grids: {
            grid1: {
                domid: "simple1",
                umeta: {
                    id: "grid_simple1",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "parentGoodsCode",
                    dataType: "String",
                    title: "父项商品编码",
                    renderType: "detailRender"
                }, {
                    field: "parentGoodsName",
                    dataType: "String",
                    title: "父项商品名称"
                }, {
                    field: "parentGoodsVersion",
                    dataType: "string",
                    title: "父项商品版本号"
                }, {
                    field: "isEnable",
                    dataType: "string",
                    title: "启用状态",
                    renderType: "enableRender"
                }, {
                    field: "creator",
                    dataType: "string",
                    title: "创建人",
                    visible: false
                }, {
                    field: "modifier",
                    dataType: "string",
                    title: "修改人",
                    visible: false
                }, {
                    field: "creationTime",
                    dataType: "Datetime",
                    title: "创建时间",
                    visible: false
                }, {
                    field: "modifiedTime",
                    dataType: "Datetime",
                    title: "修改时间",
                    visible: false
                }, {
                    field: "operation",
                    dataType: "string",
                    title: "操作",
                    renderType: "operation",
                    fixed: true,
                    width: "220px"
                }]
            },
            grid2: {
                domid: "childList",
                umeta: {
                    id: "grid_childList",
                    data: "childList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                    "onBeforeEditFun": "beforeEditCheck"
                },
                columns: [{
                    field: "childGoodsId",
                    dataType: "String",
                    title: "子项商品编码",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string",
                        "rel": {
                            "refname": "childGoodsName",
                            "refcode": "childGoodsCode",
                            "version": "childGoodsVersion",
                            "specification": "childGoodsSpecification",
                            "model": "childGoodsModel",
                            "basicUnitName": "childGoodsUnitName",
                            "isOptional": "isOptional"
                        }
                    },
                    "showField": "childGoodsCode",
                    "required": true
                }, {
                    field: "childGoodsName",
                    dataType: "string",
                    title: "子项商品名称",
                    editable: false
                }, {
                    field: "childGoodsVersion",
                    dataType: "string",
                    title: "子项商品版本号",
                    editable: false
                }, {
                    field: "childGoodsSpecification",
                    dataType: "string",
                    title: "规格",
                    editable: false
                }, {
                    field: "childGoodsModel",
                    dataType: "string",
                    title: "型号",
                    editable: false
                }, {
                    field: "childGoodsUnitName",
                    dataType: "string",
                    title: "单位",
                    editable: false
                }, {
                    field: "childGoodsQty",
                    dataType: "string",
                    title: "数量",
                    required: true
                }, {
                    field: "isOptional",
                    dataType: "integer",
                    title: "是否可选配",
                    renderType: "whetherRender",
                    visible: false,
                    enable: false
                    // required: true
                }]
            },
            grid3: {
                domid: "childList",
                umeta: {
                    id: "grid_childList1",
                    data: "childList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "childGoodsCode",
                    dataType: "String",
                    title: "子项商品编码"
                }, {
                    field: "childGoodsName",
                    dataType: "string",
                    title: "子项商品名称"
                }, {
                    field: "childGoodsVersion",
                    dataType: "string",
                    title: "子项商品版本号"
                }, {
                    field: "childGoodsSpecification",
                    dataType: "string",
                    title: "规格"
                }, {
                    field: "childGoodsModel",
                    dataType: "string",
                    title: "型号"
                }, {
                    field: "childGoodsUnitName",
                    dataType: "string",
                    title: "单位"
                }, {
                    field: "childGoodsQty",
                    dataType: "string",
                    title: "数量"
                }]
            }
        },

        details: {
            detail1: [{
                key: "parentGoodsCode",
                label: "父项商品编码"
            }, {
                key: "parentGoodsName",
                label: "父项商品名称"
            }, {
                key: "parentGoodsVersion",
                label: "父项商品版本号"
            }, {
                key: "parentGoodsSpecification",
                label: "规格"
            }, {
                key: "parentGoodsModel",
                label: "型号"
            }, {
                key: "parentGoodsUnitName",
                label: "单位"
            }, {
                key: "bomTypeName",
                label: "BOM类型"
            }, {
                key: "isEnable",
                label: "启用状态",
                computed: "isEnablecomp"
            }]
        }
    };
    return new basemodel(model);
});
