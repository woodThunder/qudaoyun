define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            ordermarkmeta: {
                meta: {
                    sequence: {
                        type: 'string',
                        required: true
                    },
                    color: {
                        type: 'string',
                        required: true
                    }, //id
                    name: {
                        type: 'string',
                        required: true
                    }, //编码
                    describe: {
                        type: 'string',
                        required: true
                    }, //名称
                    creator: {
                        type: 'string'
                    },
                    creationTime: {
                        type: 'string'
                    },
                    modifier: {
                        type: 'string'
                    },
                    modifiedTime: {
                        type: 'string'
                    },
                    operation: {
                        type: 'string',
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
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
            }, ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "sequence",
                label: "顺序",
                required: true
            }, {
                type: "combo",
                key: "color",
                label: "颜色",
                // url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY084',
                dataSource: [{
                    value: "RED",
                    name: "红"
                }, {
                    value: "ORANGE",
                    name: "橙"
                }, {
                    value: "YELLOW",
                    name: "黄"
                }, {
                    value: "GREEN",
                    name: "绿"
                }, {
                    value: "BLUE",
                    name: "蓝"
                }, {
                    value: "VIOLET",
                    name: "紫"
                }, {
                    value: "BLACK",
                    name: "黑"
                }],
                required: true
            }, {
                type: "text",
                key: "name",
                label: "名称",
                required: true
            }, {
                type: "textarea",
                key: "describe",
                label: "描述",
                required: true,
                cls: "ui-textarea-item"
            }]
        },
        grids: {
            grid1: {
                domid: "ordermark1",
                umeta: {
                    id: "grid_ordermark1",
                    data: "ordermarkList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "sequence",
                    dataType: "String",
                    title: "顺序"
                }, {
                    field: "color",
                    dataType: "String",
                    title: "颜色",
                    editOptions: {
                        "type": "combo",
                        "datasource": "colorEnum"
                    },
                    renderType: "comboRender"
                }, {
                    field: "name",
                    dataType: "String",
                    title: "名称",
                }, {
                    field: "describe",
                    dataType: "String",
                    title: "描述",
                }, {
                    field: "creationTime",
                    dataType: "Date",
                    title: "创建时间"
                }, {
                    field: "creator",
                    dataType: "String",
                    title: "创建人"
                }, {
                    field: "modifiedTime",
                    dataType: "Date",
                    title: "修改时间"
                }, {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人"
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }, ]
            }
        }
    };
    return new basemodel(model);
});