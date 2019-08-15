define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            trantypemeta: {
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
                    isEnable: {
                        type: 'integer',
                        default: 1
                    }, //是否启用
                    trantypeExtends:{
                        type:'child',
                        meta:{
                            id:{
                                type: "string"
                            },
                            fieldName:{
                                type: "string"
                            },
                            fieldValue:{
                                type: "string"
                            }
                        }
                    },
                    operation: {
                        type: 'string'
                    }
                },
                pageSize: 10,
            },
            billtypemeta: {
                meta: {
                    id: {
                        type: "string"
                    }, //id
                    pid: {
                        type: "string"
                    }, //id
                    code: {
                        type: "string",
                        required: true
                    }, //编码
                    name: {
                        type: "string",
                        required: true
                    }, //名称
                    isEnable: {
                        type: "integer",
                        default: 1
                    }, //是否启用
                    operation: {
                        type: "string"
                    }
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
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del"
                },
                {
                    key: "enable",
                    label: "启用",
                    iconCls: "icon-qiyong",
                    click: "enable"
                },
                {
                    key: "disable",
                    label: "停用",
                    iconCls: "icon-tingyong",
                    click: "disable"
                },
            ]
        },
        searchs: {
            search1: [{
                    type: "text",
                    key: "code",
                    label: "交易类型编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "交易类型名称",
                }
            ]
        },
        dialogs: {
            dialog1: [{
                    type: "text",
                    key: "code",
                    label: "编码",
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "name",
                    label: "名称"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "trantype",
                umeta: {
                    id: "grid_trantype",
                    data: "trantypeList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                    onBeforeClickFun: "detail"
                },
                columns: [{
                        field: "code",
                        dataType: "String",
                        title: "编码",
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称",
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
                        renderType: "enableRender"
                    },
                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人",
                        visible: false
                    },
                    {
                        field: "modifier",
                        dataType: "String",
                        title: "修改人",
                        visible: false
                    },
                    {
                        field: "creationTime",
                        dataType: "Date",
                        title: "创建时间",
                        visible: false
                    },
                    {
                        field: "modifiedTime",
                        dataType: "Date",
                        title: "修改时间",
                        visible: false
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});