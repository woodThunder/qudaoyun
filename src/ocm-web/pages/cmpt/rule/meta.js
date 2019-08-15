define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            rulemeta: {
                meta: {
                    id: {type: "string"}, // 主键
                    name: {type: "string", required: true}, // 名称
                    description: {type: "string", required: true}, // 描述
                    businessLevelId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"BUSINESS_LEVEL\",\"refName\":\"业务级别\"}"
                    },
                    businessLevelCode: {type: "String"},
                    businessLevelName: {type: "String"},
                    isCommon: {type: "Integer", default: 0}, // 是否为通用规则
                    abortOnError: {type: "Integer", default: 1}, // 出错时终止
                    isEditable: {type: "Integer", default: 1}, // 是否可修改
                    isEnable: {type: "Integer", default: 0}, // 是否启用
                    packageName: {type: "string", required: true}, // 包名
                    entityImports: {type: "string", required: true}, // 实体类型引用
                    componentImports: {type: "string", required: false}, // 组件类型引用
                    globals: {type: "string", required: false}, // 全局变量
                    salience: {type: "Integer", required: true}, // 执行顺序
                    whenClause: {type: "string", required: true}, // 条件语句
                    thenClause: {type: "string", required: true}, // 执行语句
                    content: {type: "string", required: true} // 内容
                },
                pageSize: 10
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
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable"
            }, {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable"
            }]
        },
        searchs: {
            search1: [{
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "text",
                key: "description",
                label: "描述"
            }, {
                type: "text",
                key: "packageName",
                label: "包名"
            }, {
                type: "text",
                key: "entityImports",
                label: "实体类型引用"
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
        dialogs: {
            dialog1: [{
                type: "text",
                key: "name",
                label: "名称",
                disableInEdit: true
            }, {
                type: "text",
                key: "description",
                label: "描述"
            }, {
                type: "combo",
                key: "businessLevelCode",
                label: "业务级别",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=BUSINESS_LEVEL",
                namefield: "name",
                valuefield: "code"
            }, {
                type: "radio",
                key: "abortOnError",
                label: "出错时终止",
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }],
                defaultvalue: "1"
            }, {
                type: "text",
                key: "packageName",
                label: "包名"
            }, {
                type: "textarea",
                key: "entityImports",
                label: "实体类型引用",
                cls: "ui-textarea-item"
            }, {
                type: "textarea",
                key: "componentImports",
                label: "组件类型引用",
                cls: "ui-textarea-item"
            }, {
                type: "textarea",
                key: "globals",
                label: "全局变量",
                cls: "ui-textarea-item"
            }, {
                type: "text",
                key: "salience",
                label: "执行顺序"
            }, {
                type: "textarea",
                key: "whenClause",
                label: "条件语句",
                cls: "ui-textarea-item"
            }, {
                type: "textarea",
                key: "thenClause",
                label: "执行语句",
                cls: "ui-textarea-item"
            }, {
                type: "textarea",
                key: "content",
                label: "内容",
                cls: "ui-textarea-item"
            }]
        },
        grids: {
            grid1: {
                domid: "rule",
                umeta: {
                    id: "grid_rule",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: false
                },
                columns: [{
                    field: "name",
                    dataType: "String",
                    title: "名称"
                }, {
                    field: "description",
                    dataType: "String",
                    title: "描述"
                }, {
                    field: "businessLevelName",
                    dataType: "String",
                    title: "业务级别"
                }, {
                    field: "abortOnError",
                    dataType: "String",
                    title: "出错时终止",
                    renderType: "whetherRender"
                }, {
                    field: "isEnable",
                    dataType: "String",
                    title: "启用状态",
                    renderType: "enableRender"
                }, {
                    field: "packageName",
                    dataType: "String",
                    title: "包名"
                }, {
                    field: "entityImports",
                    dataType: "String",
                    title: "实体类型引用"
                }, {
                    field: "componentImports",
                    dataType: "String",
                    title: "组件类型引用",
                    visible: false
                }, {
                    field: "globals",
                    dataType: "String",
                    title: "全局变量",
                    visible: false
                }, {
                    field: "salience",
                    dataType: "String",
                    title: "执行顺序"
                }, {
                    field: "whenClause",
                    dataType: "String",
                    title: "条件语句",
                    visible: false
                }, {
                    field: "thenClause",
                    dataType: "String",
                    title: "执行语句",
                    visible: false
                }, {
                    field: "content",
                    dataType: "String",
                    title: "内容",
                    visible: false
                }, {
                    field: "creator",
                    dataType: "String",
                    title: "创建人",
                    visible: false
                }, {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人",
                    visible: false
                }, {
                    field: "creationTime",
                    dataType: "Date",
                    title: "创建时间",
                    visible: false
                }, {
                    field: "modifiedTime",
                    dataType: "Date",
                    title: "修改时间",
                    visible: false
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }]
            }
        }
    };
    return new basemodel(model);
});
