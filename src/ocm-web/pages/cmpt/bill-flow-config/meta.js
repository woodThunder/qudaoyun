define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            billFlowConfigMeta: {
                meta: {
                    id: {type: "string"}, // 主键
                    // 单据类型
                    billTypeId: {type: "String"},
                    billTypeCode: {type: "String"},
                    billTypeName: {type: "String"},
                    // 交易类型
                    tranTypeId: {type: "String"},
                    tranTypeCode: {type: "String"},
                    tranTypeName: {type: "String"},
                    // 审批流模型
                    actProcModelId: {type: "String"},
                    actProcModelCode: {type: "String"},
                    actProcModelName: {type: "String"},
                    // 启用状态
                    isEnable: {type: "Integer", default: 0}
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
                type: "refer",
                key: "billType--id",
                label: "单据类型",
                refinfo: "billtype"
            }, {
                type: "refer",
                key: "tranType--id",
                label: "交易类型",
                refinfo: "trantype"
            }, {
                type: "refer",
                key: "actProcModel--id",
                label: "审批流模型",
                refinfo: "act-proc-model"
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
                type: "refer",
                key: "billTypeId",
                label: "单据类型",
                refinfo: "billtype"
            }, {
                type: "refer",
                key: "tranTypeId",
                label: "交易类型",
                refinfo: "trantype",
                domid: "tranTypeIdinfo",
                compid: "tranTypeIdBase",
            }, {
                type: "refer",
                key: "actProcModelId",
                label: "审批流模型",
                refinfo: "act-proc-model",
                disableFilter: true
            }, {
                type: "label",
                key: "isEnable",
                defaultvalue: "0",
                label: "启用状态"
            }]
        },
        grids: {
            grid1: {
                domid: "rule",
                umeta: {
                    id: "grid_billFlowConfig",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: false
                },
                columns: [{
                    field: "billTypeName",
                    dataType: "String",
                    title: "单据类型"
                }, {
                    field: "tranTypeName",
                    dataType: "String",
                    title: "交易类型"
                }, {
                    field: "actProcModelName",
                    dataType: "String",
                    title: "审批流模型"
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
