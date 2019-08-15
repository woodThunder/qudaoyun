define(['ocm_basemodel'], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            templateAllotList: {
                params: {},
                meta: {
                    // 业务对象编码
                    busiObjCode: {
                        type: "string",
                        required: true
                    },
                    // 模板类型
                    tmplTypeId: {
                        type: "string",
                        required: true
                    },
                    // 模板
                    tmplId: {
                        type: "string",
                        required: true
                    },
                    tmplCode: {
                        type: "string",
                    },
                    tmplName: {
                        type: "string"
                    },
                    // 授权类型
                    authTypeId: {
                        type: "string",
                        required: true
                    },
                    authTypeCode: {
                        type: "string"
                    },
                    authTypePriority: {
                        type: "string"
                    },
                    // 授权对象
                    authObjId: {
                        type: "refer",
                        refinfo: "wbUser",
                        required: true
                    },
                    // 应用菜单
                    appId: {
                        type: "refer",
                        refinfo: "applicationCode",
                        required: true
                    },
                    appCode: {
                        type: 'string'
                    },
                    appName: {
                        type: 'string'
                    }
                },
                pageSize: 10
            },
        },
        buttons: {
            buttonSource: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit"
            },
                {
                    key: 'del',
                    label: '删除',
                    iconCls: 'icon-shanchu1',
                    click: 'del'
                },
            ]
        },
        searchs: {
            search: [
                {
                    type: "refer",
                    key: "busiObjCode",
                    label: "业务对象编码",
                    refinfo: "busiobject"
                },
            ]
        },
        dialogs: {
            dialog: [
                {
                    type: "refer",
                    key: "busiObjCode",
                    label: "业务对象编码",
                    refinfo: "busiobject",
                    disableFilter: true,
                    required: true
                },
                {
                    type: "combo",
                    key: "tmplTypeId",
                    label: "模板类型",
                    dataSource: [
                        {value: 'pc-edit', name: 'PC编辑'},
                        {value: 'pc-detail', name: 'PC详情'},
                        {value: 'pc-list', name: 'PC列表'},
                        // {value: 'pc-search', name: 'PC查询'},
                    ]
                    // enable: false
                },
                // {
                //     type: "text",
                //     key: "tmplTypeId",
                //     label: "模板类型",
                //     enable: false
                // },
                {
                    type: "refer",
                    key: "tmplId",
                    label: "模板",
                    refinfo: "templateRef",
                    refName: '模板',
                    rel: {
                        refpk: "tmplId",
                        refcode: "tmplCode",
                        refname: "tmplName"
                    },
                    disableFilter: true,
                    required: true
                },
                {
                    type: "refer",
                    key: "appId",
                    label: "应用菜单",
                    refinfo: "applicationCode",
                    disableFilter: true
                },
                {
                    type: "combo",
                    key: "authTypeId",
                    label: "授权类型",
                    dataSource: [
                        {value: 'USER', name: '用户'},
                        {value: 'ROLE', name: '角色'},
                        // {value: 'TRAN_TYPE', name: '交易类型'},
                    ],
                    required: true
                },
                {
                    type: "refer",
                    key: "authObjId",
                    label: "授权对象",
                    refinfo: "wbUser",
                    referId: "authObjIdCls",
                    disableFilter: true,
                }
            ]
        },
        grids: {
            grid: {
                domid: "templateAllot",
                umeta: {
                    id: "grid_templateAllot",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "busiObjCode",
                        dataType: "String",
                        title: "业务对象编码"
                    },
                    {
                        field: "tmplTypeId",
                        dataType: "String",
                        title: "模板类型"
                    },
                    {
                        field: "tmplName",
                        dataType: "String",
                        title: "模板"
                    },
                    {
                        field: "appName",
                        dataType: "String",
                        title: "功能节点"
                    },
                    {
                        field: "authTypeCode",
                        dataType: "String",
                        title: "授权类型",
                        renderType: "authTypePriorityRender"
                    },
                    {
                        field: "authObjName",
                        dataType: "String",
                        title: "授权对象"
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    },
                ]
            }
        }
    };

    return new basemodel(model);
});
