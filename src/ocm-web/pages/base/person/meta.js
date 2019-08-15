define(["ocm_basemodel"], function (basemodel) {
    "use strict";
        var model = {
            metas: {
                personmeta: {
                    params: {
                        "cls": "com.yonyou.ocm.base.service.dto.PersonDto"
                    },
                    meta: {
                        id: { type: "string" },//id
                        code: { type: "string", required: true },//编码
                        name: { type: "string", required: true },//名称
                        idTypeCode: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['custdocdef']),
                            "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY022","refName":"商品生命周期"}'
                        },//证件类型
                        idTypeName: { type: "string" },//证件类型
                        idNo: { type: "string" },//证件号码
                        phone: { type: "string" },
                        email: { type: "string" },
                        homeAddress: { type: "string" },
                        sexCode: { type: "string" },
                        sexId: { type: "string" },
                        sexName: { type: "string" },
                        educationDegreeCode: { type: "string" },
                        educationDegreeId: { type: "string" },
                        educationDegreeName: { type: "string" },
                        dateOnBoard: { type: "string" },
                        departureDate: { type: "string" },
                        ifDeparture: { type: "integer", required: true },
                        isEnable: { type: "string", required: true }// 状态
                    },
                    pageSize: 10
                    //是否启用前端缓存
                    // pageCache: true，
                },
                personpostmeta: {
                    meta: {
                        id: { type: "string" },//id
                        personId: { type: "string" },//人员
                        personCode: { type: "string" },//人员
                        personName: { type: "string" },//人员
                        organizationId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['organization_ocm']),
                            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                            "refparam": '{"EQ_isEnable":"1"}',
                        },//任职组织
                        organizationCode: { type: "string" },//任职组织
                        organizationName: { type: "string" },//任职组织
                        departmentId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['department']),
                            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                            "refparam": '{  "EQ_isEnable":"1"}',
                        },//任职部门
                        departmentCode: { type: "string" },//任职部门
                        departmentName: { type: "string" },//任职部门
                        isMain: { type: "integer",default:1 },// 是否主职
                        postId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['post']),
                            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                            "refparam": '{ "EQ_isEnable":"1"}',
                        },//岗位
                        postCode: { type: "string" },//岗位
                        postName: { type: "string" },//岗位
                        postStartDate: { type: "Date" },//任职开始日期
                        postEndDate: { type: "Date" }//任职结束日期
                    },
                    pageSize: 10
                }
            },
            //操作按钮组
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
                },{
                    key: "importPerson",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importPerson"
                }, {
                    key: "exportPerson",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportPerson"
                }],
                button2: [{
                    key: "return",
                    label: "返回",
                    cls: "ui-btn-green",
                    click: "backPanel"
                }],
                button3: [{
                    key: "save",
                    label: "保存",
                    click: "saveHandle",
                    iconCls: "icon-tubiao-baocun"
                },
                    {
                        key: "cancel",
                        label: "取消",
                        click: "cancelHandle",
                        iconCls: "icon-tubiao-guanbi-anxing"
                    }],
                button4: [{
                    key: "addrow",
                    label: "增行",
                    click: "addRow",
                    cls: "ui-btn-orange",
                    clickArg: "postList",
                    iconCls: "icon-plus"
                },
                    {
                        key: "delrow",
                        label: "删行",
                        click: "delChild",
                        clickArg: "postList",
                        iconCls: "icon-shanchu1"
                    },],
            },
            //查询条件组
            searchs: {
                search1: [{
                    type: "text",
                    key: "code",
                    label: "编码"
                }, {
                    type: "text",
                    key: "name",
                    label: "姓名"
                }, {
                    type: "text",
                    key: "phone",
                    label: "手机"
                }, {
                    type: "refer",
                    key: "personPosts--organization--id",
                    label: "任职组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0"
                    }
                }, {
                    type: "refer",
                    key: "personPosts--department--id",
                    label: "任职部门",
                    refinfo: "department"
                }, {
                    type: "combo",
                    key: "isEnable",
                    label: "启用状态",
                    // defaultvalue:"0",
                    dataSource: [
                        { value: '', name: '全部' },
                        { value: '0', name: '未启用' },
                        { value: '1', name: '已启用' },
                        { value: '2', name: '已停用' }
                    ]
                }]
            },
            cards: {
                card1: [
                    {
                        type: "text",
                        key: "code",
                        label: "编码",
                        disableInEdit: true
                    }, {
                        type: "text",
                        key: "name",
                        label: "姓名"
                    }, {
                        type: "combo",
                        key: "sexCode",
                        label: "性别",
                        url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY020",
                        namefield: "name",
                        valuefield: "code"
                    }, {
                        type: "combo",
                        key: "idTypeCode",
                        label: "证件类型",
                        url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY022",
                        namefield: "name",
                        valuefield: "code"
                    }, {
                        type: "text",
                        key: "idNo",
                        label: "证件号码"
                    }, {
                        type: "text",
                        key: "phone",
                        label: "手机"
                    }, {
                        type: "text",
                        key: "email",
                        label: "邮箱"
                    }, {
                        type: "text",
                        key: "homeAddress",
                        label: "家庭住址"
                    }, {
                        type: "combo",
                        key: "educationDegreeCode",
                        label: "文化程度",
                        url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=EDUCATION_DEGREE",
                        namefield: "name",
                        valuefield: "code"
                    }, {
                        type: "date",
                        key: "dateOnBoard",
                        label: "入职时间"
                    }, {
                        type: "date",
                        key: "departureDate",
                        label: "离职时间"
                    },
                    {
                        type: "radio",
                        key: "ifDeparture",
                        label: "离职",
                        defaultvalue: "0",
                        dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],

                    }, {
                        type: "label",
                        key: "isEnable",
                        label: "启用状态",
                        defaultvalue: "0"
                    }
                ],
                card2: [{
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
                        "EQ_orgFuncRel": "02",
                        "EQ_isEnable":"1"
                    }
                }, {
                    type: "refer",
                    key: "departmentId",
                    label: "任职部门",
                    refinfo: "department",
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
                    domid: "simple1",
                    umeta: {
                        id: "grid_simple1",
                        data: "simpleList",
                        type: "grid",
                        editable: false,
                        multiSelect: true,
                        showNumCol: true
                    },
                    columns: [{
                        field: "code",
                        dataType: "String",
                        title: "编码",
                        renderType: "detailRender"
                    }, {
                        field: "name",
                        dataType: "String",
                        title: "姓名"
                    }, {
                        field: "sexName",
                        dataType: "string",
                        title: "性别"
                    }, {
                        field: "idTypeName",
                        dataType: "String",
                        title: "证件类型"
                    }, {
                        field: "idNo",
                        dataType: "String",
                        title: "证件号码"
                    }, {
                        field: "phone",
                        dataType: "string",
                        title: "手机"
                    }, {
                        field: "email",
                        dataType: "string",
                        title: "邮箱"
                    }, {
                        field: "homeAddress",
                        dataType: "string",
                        title: "家庭住址"
                    }, {
                        field: "educationDegreeName",
                        dataType: "string",
                        title: "文化程度"
                    }, {
                        field: "dateOnBoard",
                        dataType: "date",
                        title: "入职时间"
                    }, {
                        field: "departureDate",
                        dataType: "string",
                        title: "离职时间"
                    }, {
                        field: "ifDeparture",
                        dataType: "string",
                        title: "是否离职",
                        renderType: "whetherRender"
                    }, {
                        field: "isEnable",
                        dataType: "string",
                        title: "启用状态",
                        renderType: "enableRender"
                    }, {
                        field: "creator",
                        dataType: "string",
                        title: "创建人",
                        visible: false
                    }, {
                        field: "modifier",
                        dataType: "string",
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
                        dataType: "string",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    }]
                },
                grid2: {
                    domid: "channelpost",
                    umeta: {
                        id: "grid_channelpost",
                        data: "postList",
                        type: "grid",
                        editable: true,
                        multiSelect: true,
                        showNumCol: true,
                        "onBeforeEditFun": "beforeEditCheck"
                    },
                    columns: [

                        {
                            field: "organizationId",
                            dataType: "String",
                            title: "任职组织",
                            "renderType": "ncReferRender",
                            "editType": "ncReferEditType",
                            "editOptions": {
                                "validType": "string",
                                "rel": {
                                    "refname": "organizationName"
                                }
                            },
                            "showField": "organizationName",
                            "required": true
                        },
                        {
                            field: "departmentId",
                            dataType: "String",
                            title: "任职部门",
                            "renderType": "ncReferRender",
                            "editType": "ncReferEditType",
                            "editOptions": {
                                "validType": "string",
                                "rel": {
                                    "refname": "departmentName"
                                }
                            },
                            "showField": "departmentName",
                        },
                        {
                            "field": "isMain",
                            "dataType": "integer",
                            "title": "主职",
                            "required": true,
                            "editOptions": {
                                "id": "isDefaultCA",
                                "type": "combo",
                                "datasource": "whetherSource",
                                defaultvalue: "0",
                            },
                            "editType": "combo",
                            defaultvalue: "0",
                            "renderType": "whetherRender"
                        },
                        {
                            field: "postId",
                            dataType: "String",
                            title: "岗位",
                            "renderType": "ncReferRender",
                            "editType": "ncReferEditType",
                            "editOptions": {
                                "validType": "string",
                                "rel": {
                                    "refname": "postName"
                                }
                            },
                            "showField": "postName",
                        }, {
                            field: "postStartDate",
                            dataType: "Date",
                            title: "任职开始日期",
                            editType:"date"
                        }, {
                            field: "postEndDate",
                            dataType: "Date",
                            title: "任职结束日期",
                            editType:"date"
                        }]
                },
                grid3: {
                    domid: "channelpost",
                    umeta: {
                        id: "grid_channelpost1",
                        data: "postList",
                        type: "grid",
                        editable: false,
                        multiSelect: true,
                        showNumCol: true
                    },
                    columns: [{
                        field: "organizationName",
                        dataType: "string",
                        title: "任职组织"
                    }, {
                        field: "departmentName",
                        dataType: "string",
                        title: "任职部门"
                    }, {
                        field: "isMain",
                        dataType: "string",
                        title: "主职",
                        renderType: "whetherRender"
                    }, {
                        field: "postName",
                        dataType: "string",
                        title: "岗位"
                    }, {
                        field: "postStartDate",
                        dataType: "Date",
                        title: "任职开始日期"
                    }, {
                        field: "postEndDate",
                        dataType: "Date",
                        title: "任职结束日期"
                    }]
                }
            },

            details: {
                detail1: [{
                    key: "code",
                    label: "编码"
                }, {
                    key: "name",
                    label: "姓名"
                }, {
                    key: "sexName",
                    label: "性别"
                }, {
                    key: "idTypeName",
                    label: "证件类型"
                }, {
                    key: "idNo",
                    label: "身份证号"
                }, {
                    key: "phone",
                    label: "手机"
                }, {
                    key: "email",
                    label: "邮箱"
                }, {
                    key: "homeAddress",
                    label: "家庭住址"
                }, {
                    key: "educationDegreeName",
                    label: "文化程度"
                }, {
                    key: "dateOnBoard",
                    label: "入职时间"
                }, {
                    key: "departureDate",
                    label: "离职时间"
                }, {
                    key: "ifDeparture",
                    label: "是否离职",
                    computed: "ifDepartureFmt"
                }, {
                    key: "enableFmt",
                    label: "启用状态",
                    computed: "enableFmt"
                }]
            }
        };
        return new basemodel(model);
});

