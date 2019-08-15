define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            auditmeta: {
                meta: {
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
                        type: 'datetime'
                    },
                    persistStatus: {
                        type: 'string'
                    },
                    priority: {
                        type: 'string'
                    }, //编码
                    pluginName: {
                        type: 'string',
                        required: true
                    }, //名称
                    pluginClass: {
                        type: 'string',
                        required: true
                    }, //插件名称
                    isEnable: {
                        type: 'integer',
                    }, //是否启用
                    remark: {
                        type: 'string',
                    } //备注
                },
                pageSize: 10
            }
        },
        buttons: {
            button1: [{
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
                    showNumCol: true,
                },
                columns: [{
                    field: "pluginName",
                    dataType: "String",
                    title: "业务插件名称",
                }, {
                    field: "isEnable",
                    dataType: "String",
                    title: "是否启用",
                    renderType: "enableRender"
                }, {
                    field: "modifiedTime",
                    dataType: "Date",
                    title: "修改时间",
                    visible: false
                }, {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人",
                    visible: false
                }]
            }
        }
    };
    return new basemodel(model);
});