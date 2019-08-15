define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            ncSyncMonitorMeta: {
                meta: {
                    takeType: { type: 'string' },//操作类型
                    traceId: { type: 'string', required: true },//链路ID
                    buinessCode: { type: 'string'},//业务名称
                    buinessName: { type: 'string'},//业务名称
                    source: { type: 'string' },//来源
                    sendContent: { type: 'string' },//发送内容
                    isEnable: { type: 'integer'},// 状态
                },
                pageSize: 10,
            },
            childmeta: {
                meta: {
                    exceptionInfo: { type: 'string' },//异常信息
                    remark: { type: 'string', required: true },//提示信息
                    detailTopic: { type: 'string', required: true },//中转Topic
                    sendContent: { type: 'string' },
                    isEnable: { type: 'integer'},// 状态
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
                }]
        },
        searchs: {
            search1: [{
                type: "text",
                key: "buiness",
                label: "业务编码"
            },
                {
                    type: "combo",
                    key: "isEnable",
                    label: "状态",
                    dataSource: [
                        { value: '1', name: '成功' },
                        { value: '2', name: '失败' },
                        { value: '3', name: '进行中' }
                    ]
                }
            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "takeType",
                label: "操作类型",
            },
                {
                    type: "text",
                    key: "traceId",
                    label: "链路ID"
                },
                {
                    type: "text",
                    key: "buinessName",
                    label: "业务名称"
                },
                {
                    type: "text",
                    key: "source",
                    label: "来源"
                },
                {
                    type: "label",
                    key: "isEnable",
                    label: "状态",
                    defaultvalue:'0'
                }]
        },
        grids: {
            grid1: {
                domid: "simple",
                umeta: {
                    id: "grid_simple",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "traceId",
                        dataType: "String",
                        title: "链路ID",
                        renderType:"openDetailRender"
                    },
                    {
                        field: "takeType",
                        dataType: "String",
                        title: "操作类型",
                    },
                    {
                        field: "buinessCode",
                        dataType: "String",
                        title: "业务编码"
                    },
                    {
                        field: "buinessName",
                        dataType: "String",
                        title: "业务名称"
                    },
                    {
                        field: "source",
                        dataType: "String",
                        title: "来源"
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
                        title: "创建时间"
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
                    }
                ]
            },
            grid2: {
                domid: "childList",
                umeta: {
                    id: "grid_childList",
                    data: "childList",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true,
                },
                columns: [{
                    field: "exceptionInfo",
                    dataType: "String",
                    title: "异常信息",
                    renderType:"openDetailRender"
                },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "提示信息"
                    },
                    {
                        field: "detailTopic",
                        dataType: "String",
                        title: "中转Topic"
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "状态",
                        renderType: "enableRender"
                    },
                    {
                        field: "sendContent",
                        dataType: "String",
                        renderType: "appendRender",
                        title: "业务数据内容"
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});

