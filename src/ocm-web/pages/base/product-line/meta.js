define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            productLineMeta: {
                meta: {
                    id: { type: "string" },//id
                    code: { type: "string", required: true },//编码
                    name: { type: "string", required: true },//名称
                    remark: { type: "string" },//备注
                    isEnable: { type: "integer", required: true }// 启用状态
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
                    { value: '', name: '全部' },
                    { value: '0', name: '未启用' },
                    { value: '1', name: '已启用' },
                    { value: '2', name: '已停用' }
                ]
            }]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                disableInEdit: true
            }, {
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: '0'
            }, {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }]
        },
        grids: {
            grid1: {
                domid: "prodctline",
                umeta: {
                    id: "grid_prodctline",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码"
                }, {
                    field: "name",
                    dataType: "String",
                    title: "名称"
                }, {
                    field: "remark",
                    dataType: "String",
                    title: "备注",
                    visible: false
                }, {
                    field: "isEnable",
                    dataType: "String",
                    title: "启用状态",
                    renderType: "enableRender"
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

