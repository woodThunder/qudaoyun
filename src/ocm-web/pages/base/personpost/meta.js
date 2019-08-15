define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            personpostmeta: {
                meta: {
                    id: { type: "string" },//id
                    personId: { type: "string" },//人员
                    personCode: { type: "string" },//人员
                    personName: { type: "string" },//人员
                    organizationId: { type: "string" },//任职组织
                    organizationCode: { type: "string" },//任职组织
                    organizationName: { type: "string" },//任职组织
                    departmentId: { type: "string" },//任职部门
                    departmentCode: { type: "string" },//任职部门
                    departmentName: { type: "string" },//任职部门
                    isMain: { type: "integer" },// 是否主职
                    postId: { type: "string" },//岗位
                    postCode: { type: "string" },//岗位
                    postName: { type: "string" },//岗位
                    postStartDate: { type: "Date" },//任职开始日期
                    postEndDate: { type: "Date" }//任职结束日期
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
            }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "person--id",
                label: "人员",
                refinfo: "person",
                clientParam: {}
            }, {
                type: "refer",
                key: "organization--id",
                label: "任职组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "02"
                }
            }, {
                type: "refer",
                key: "department--id",
                label: "任职部门",
                refinfo: "department"

            }, {
                type: "refer",
                key: "post--id",
                label: "岗位",
                refinfo: "post"
            }]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "personId",
                label: "人员",
                refinfo: "person",
                clientParam: {}
            }, {
                type: "refer",
                key: "organizationId",
                label: "任职组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "02"
                }
            }, {
                type: "refer",
                key: "departmentId",
                label: "任职部门",
                refinfo: "department"
            }, {
                type: "radio",
                key: "isMain",
                defaultvalue: "1",
                label: "是否主职",
                dataSource: [
                    { value: "1", name: "是" },
                    { value: "0", name: "否" }
                ]
            }, {
                type: "refer",
                key: "postId",
                label: "岗位",
                refinfo: "post"
            }, {
                type: "date",
                key: "postStartDate",
                label: "任职开始日期"
            }, {
                type: "date",
                key: "postEndDate",
                label: "任职结束日期"
            }]
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
                    showNumCol: true
                },
                columns: [{
                    field: "personName",
                    dataType: "String",
                    title: "人员名称"
                }, {
                    field: "organizationName",
                    dataType: "String",
                    title: "任职组织"
                }, {
                    field: "departmentName",
                    dataType: "String",
                    title: "任职部门"
                }, {
                    field: "isMain",
                    dataType: "String",
                    title: "是否主职",
                    renderType: "whetherRender"
                }, {
                    field: "postName",
                    dataType: "String",
                    title: "岗位"
                }, {
                    field: "postStartDate",
                    dataType: "Date",
                    title: "任职开始日期"
                }, {
                    field: "postEndDate",
                    dataType: "Date",
                    title: "任职结束日期"
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
