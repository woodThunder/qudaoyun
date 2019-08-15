define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            rolemeta: {
                meta: {
                    id: {type: 'string'},//id
                    roleCode: {type: 'string', required: true},//编码
                    roleName: {type: 'string', required: true},//名称
                    labelName: {type: 'string', required: true},//名称
                },
                pageSize: 10,
            },
            appmeta: {
                meta: {
                    id: {type: 'string'},//id
                    code: {type: 'string', required: true},//编码
                    name: {type: 'string', required: true},//名称
                },
                pageSize: 10,
            },
            assignedmeta: {
                meta: {
                    id: {type: 'string'},//id
                    dimName: {type: 'string'},//维度名称
                    resName: {type: 'string'},//资源名称
                    typeName: {type: 'string'},//资源类型
                    dimId: {type: 'string'},//维度Id
                    resId: {type: 'string'},//资源Id
                    dimCode: {type: 'string'},//维度Code
                    resCode: {type: 'string'},//资源Code
                    typeVlaue: {type: 'string'},//资源类型
                },
                pageSize: 10,
            },
            assignedCombometa: {
                meta: {
                    assignedApp: {type: 'string'},//id
                },
                pageSize: 10,
            },
            assignwinmeta: {
                meta: {
                    id: {type: 'string'},//id
                    dimName: {type: 'string', required: true},//维度名称
                    resName: {type: 'string', required: true},//资源名称
                    typeName: {type: 'string', required: true},//资源类型
                    dimId: {type: 'string', required: true},//维度Id
                    resId: {type: 'string', required: true},//资源Id
                    dimCode: {type: 'string', required: true},//维度Code
                    resCode: {type: 'string', required: true},//资源Code
                    typeVlaue: {type: 'string', required: true},//资源类型
                },
                pageSize: 10,
            },
            itemmeta: {
                meta: {
                    id: {type: 'string'},//id
                    code: {type: 'string', required: true},//编码
                    name: {type: 'string', required: true},//名称
                },
                pageSize: 10,
            },
            assignedItemmeta: {
                meta: {
                    id: {type: 'string'},//id
                    valueName: {type: 'string', required: true},//名称
                },
                pageSize: 10,
            },
        },
        buttons: {
            button1: [{
                key: "assign",
                label: "资源对象",
                iconCls: "icon-plus",
                click: "showAssingWin"
            },
                {
                    key: "assign",
                    label: "规则",
                    iconCls: "icon-plus",
                    click: "showAssingWin2"
                },
                /*{
                    key: "unassign",
                    label: "取消分配",
                    iconCls: "icon-minus",
                    click: "beforeEdit"
                }*/
            ]
        },
        cards: {
            card1: [{
                type: "combo",
                key: "assignedApp",
                label: "已分配对象",
                dataSource: "assignedAppDataSource",
            }]
        },
        grids: {
            grid1: {
                domid: "role",
                umeta: {
                    id: "grid_role",
                    data: "roleList",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true,
                    // cancelFocus:false,
                    // contentFocus:true,
                    onBeforeClickFun: "clickRoleRow"
                },
                columns: [{
                    field: "roleCode",
                    dataType: "String",
                    title: "编码",
                },
                    {
                        field: "roleName",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "labelName",
                        dataType: "String",
                        title: "角色类型"
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation",
                        fixed: true,
                    },
                ]
            },
            grid2: {
                domid: "assigned",
                umeta: {
                    id: "grid_assigned",
                    data: "assignedList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                    onBeforeEditFun: "beforeEditCheck"
                },
                columns: [{
                    field: "dimName",
                    dataType: "String",
                    editable: false,
                    title: "维度名称",
                },
                    {
                        field: "resName",
                        dataType: "String",
                        editable: false,
                        title: "资源名称"
                    },
                    {
                        field: "typeName",
                        dataType: "String",
                        editable: false,
                        title: "资源类型"
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        editable: false,
                        renderType: "operation2",
                    },
                ]
            },
            grid3: {
                domid: "app",
                umeta: {
                    id: "grid_app",
                    data: "appList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称"
                    },
                ]
            },
            grid4: {
                domid: "assignWin",
                umeta: {
                    id: "grid_assignWin",
                    data: "assignWinList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "dimName",
                    dataType: "String",
                    title: "维度名称",
                },
                    {
                        field: "resName",
                        dataType: "String",
                        title: "资源名称"
                    },
                    {
                        field: "typeName",
                        dataType: "String",
                        title: "资源类型"
                    },
                ]
            },
            grid5: {
                domid: "itemWin",
                umeta: {
                    id: "grid_itemWin",
                    data: "itemWinList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称"
                    },
                ]
            },
            grid6: {
                domid: "assignedItemWin",
                umeta: {
                    id: "grid_assignedItemWin",
                    data: "assignedItemWinList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "valueName",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        editable: false,
                        renderType: "operation3",
                        fixed: true,
                        width: "110px"
                    },
                ]
            }
        }
    };
    return new basemodel(model);
});

