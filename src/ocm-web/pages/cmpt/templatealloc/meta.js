define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            templatealloc: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    tmplType: {
                        type: 'string'
                    },
                    tmplId: {
                        type: 'string',
                    },
                    tmplCode: {
                        type: 'string',
                    },
                    tmplName: {
                        type: 'string',
                    },
                    roleId: {
                        type: 'string',
                    },
                    roleName: {
                        type: 'string',
                    },
                    roleType: {
                        type: 'string',
                    }
                },
                pageSize: 10
            }
        },
        buttons: {
            button1: [
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del",
                    auth: true,
                }
            ]
        },
        searchs: {
            search1: [{
                type: "radio",
                key: "tmplType",
                label: "模版类型",
                dataSource: [{
                    value: 'SEARCH_TMPL',
                    name: '查询模版'
                },{
                    value: 'DISPLAY_TMPL',
                    name: '显示模版'
                }]
            }]
        },
        dialogs: {
            dialog1: []
        },
        grids: {
            grid1: {
                domid: "templatealloc",
                umeta: {
                    id: "grid_templatealloc",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                        field: "tmplType",
                        dataType: "String",
                        title: "模版类型",
                        renderType: "templateTypeRender"
                },
                    {
                        field: "tmplName",
                        dataType: "String",
                        title: "模版名称",
                    },
                    {
                        field: "tmplName",
                        dataType: "String",
                        title: "角色名称",
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});
