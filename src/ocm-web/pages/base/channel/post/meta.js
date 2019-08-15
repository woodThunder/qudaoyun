define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            channelpostmeta: {
                meta: {
                    id: { type: 'string' },//id
                    organizationId: { type: 'string', required: true },//所属组织
                    organizationCode: { type: 'string' },//所属组织
                    organizationName: { type: 'string'  },//所属组织
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    jobBrief: { type: 'string', maxLength: 200 },//工作概要
                    isEnable: { type: 'integer' },// 状态
                },
                pageSize: 10,
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
            }
            ]
        },
        searchs: {
            search1: [
                // {
                //     type:"refer",
                //     key:"organization--id",
                //     label:"所属组织",
                //     refinfo:"organization_ocm",
                //     clientParam:{
                //         "EQ_isEnable":"1","EQ_dr":"0",
                //     },
                // },
                {
                type: "text",
                key: "code",
                label: "岗位编码"
            },
            {
                type: "text",
                key: "name",
                label: "岗位名称",
            },
            {
                type: "combo",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '0', name: '未启用' },
                    { value: '1', name: '已启用' },
                    { value: '2', name: '已停用' }
                ]
            }
            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "岗位编码",
                disableInEdit: true
            },
            {
                type: "text",
                key: "name",
                label: "岗位名称"
            },
            // {
            //     type:"refer",
            //     key:"organizationId",
            //     label:"所属组织",
            //     refinfo:"organization_ocm",
            //     clientParam:{
            //         "EQ_isEnable":"1","EQ_dr":"0"
            //     },
            // },
            {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue:'0'
            },
            {
                type: "textarea",
                key: "jobBrief",
                label: "工作概要",
                cls: "ui-textarea-item"
            }
            ]
        },
        grids: {
            grid1: {
                domid: "channelpost",
                umeta: {
                    id: "grid_channelpost",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "岗位编码"
                },
                {
                    field: "name",
                    dataType: "String",
                    title: "岗位名称"
                },
                // {
                //     field: "organizationName",
                //     dataType: "String",
                //     title: "所属组织"
                // },
                {
                    field: "jobBrief",
                    dataType: "String",
                    title: "工作概要",
                    visible: false
                },
                {
                    field: "isEnable",
                    dataType: "String",
                    title: "状态",
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
                    dataType: "Datetime",
                    title: "创建时间",
                    visible: false
                },
                {
                    field: "modifiedTime",
                    dataType: "Datetime",
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
                },
                ]
            }
        }
    };
    return new basemodel(model);
});
