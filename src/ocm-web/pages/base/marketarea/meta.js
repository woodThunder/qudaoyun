define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            marketareameta: {
                meta: {
                    id: { type: 'string' },//id
                    organizationId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"所属组织"}',
                        required: true
                    },//所属组织
                    organizationName: { type: 'string' },//所属组织
                    parentId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['market']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"市场区域"}'
                    },
                    parentCode: { type: 'string' },
                    parentName: { type: 'string' },
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    principalId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"负责人"}'
                    },//负责人
                    principalName: { type: 'string' },//负责人
                    remark: { type: 'string' },//备注
                    isEnable: { type: 'integer' },// 状态
                    nodeLevel: { type: 'integer' },
                    marketAreaItems: { type: 'string' },
                },
                pageSize: 10,
            },
            marketareatreemeta: {
                meta: {
                    id: { type: 'string' },//id
                    organizationId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"所属组织"}',
                        required: true
                    },//所属组织
                    organizationName: { type: 'string' },//所属组织
                    parentId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['market']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"市场区域"}'
                    },
                    parentCode: { type: 'string' },
                    parentName: { type: 'string' },
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    principalId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"负责人"}'
                    },//负责人
                    principalName: { type: 'string' },//负责人
                    remark: { type: 'string' },//备注
                    isEnable: { type: 'integer' },// 状态
                    nodeLevel: { type: 'integer' },
                   
                },
                pageSize: 10,
            },
            marketareaitemmeta: {
                meta: {

                    marketAreaId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['market']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"市场区域"}'
                    },
                    marketAreaCode: { type: 'string' },
                    marketAreaName: { type: 'string' },
                    //国家
                    countryId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                    }, //注册国别ID
                    countryName: {
                        type: 'string'
                    }, //注册国家名称
                    provinceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1","EQ_isEnable":"1"}',
                    }, //注册所在省份ID
                    provinceName: {
                        type: 'string'
                    }, //注册所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2","EQ_isEnable":"1"}'
                    }, //注册所在城市ID
                    cityName: {
                        type: 'string'
                    }, //注册所在城市名称
                    cityCode: {
                        type: 'string'
                    },
                    countyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3","EQ_isEnable":"1"}'
                    }, //注册所在区/县
                    countyName: {
                        type: 'string'
                    }, //注册所在区/县名称
                    countyCode: {
                        type: 'string'
                    },
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
            ],
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
            button4: [
                {
                    key: "addrow",
                    label: "增行",
                    click: "addRow",
                    cls: "ui-btn-orange",
                    clickArg: "childList",
                    iconCls: "icon-plus"
                },
                {
                    key: "delrow",
                    label: "删行",
                    click: "delChild",
                    clickArg: "childList",
                    iconCls: "icon-shanchu1"
                },
            ],
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "编码"
            },
            {
                type: "text",
                key: "name",
                label: "名称",
            },
            {
                type: "refer",
                key: "organization--id",
                label: "所属组织",
                refinfo: "organization_ocm"
            },
            {
                type: "refer",
                key: "principal--id",
                label: "负责人",
                refinfo: "person",
                refName: "负责人",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0"
                }
            },
            {
                type: "refer",
                key: "parent--id",
                label: "市场区域",
                refinfo: "market",
                ifSeachTreeCode: true,
                referId: "marketKey"
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
            },
           
            ]
        },
        cards: {
            card1: [{
                type: "text",
                key: "code",
                label: "编码"
            },
            {
                type: "text",
                key: "name",
                label: "名称"
            },
            {
                type: "refer",
                key: "parentId",
                label: "上级市场区域",
                refinfo: "market",
                compid: "parentIdBase",
            },
            // {
            //     type: "integer",
            //     key: "nodeLevel",
            //     label: "节点级别",
            // },
            {
                type: "refer",
                key: "organizationId",
                label: "所属组织",
                refinfo: "organization_ocm"
            },
            {
                type: "refer",
                key: "principalId",
                label: "负责人",
                refinfo: "person",
                refName: "负责人",
                domid: "principalIdinfo",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0"
                }
            },
            {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: '0'
            },
            {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            },

            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                disableInEdit: true
            },
            {
                type: "text",
                key: "name",
                label: "名称"
            },
            {
                type: "refer",
                key: "countryId",
                label: "管辖国家",
                refinfo: "country",
                refName: "管辖国家",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0"
                }
            },
            {
                type: "refer",
                key: "provinceId",
                label: "管辖省",
                refinfo: "region",
                domid: "provinceIdinfo",
                compid: "provinceIdBase",
                refName: "管辖省",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0", "EQ_areaLevel": "1"
                }
            },
            {
                type: "refer",
                key: "cityId",
                label: "管辖市",
                refinfo: "region",
                domid: "cityIdinfo",
                compid: "cityIdBase",
                refName: "管辖市",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0", "EQ_areaLevel": "2"
                }
            }, {
                type: "refer",
                key: "countyId",
                label: "管辖区县",
                refinfo: "region",
                domid: "countyIdinfo",
                compid: "countyIdBase",
                refName: "区县",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0", "EQ_areaLevel": "3"
                }
            },
            {
                type: "refer",
                key: "parentId",
                label: "上级市场区域",
                refinfo: "market",
                compid: "parentIdBase",
                visableInEdit: false,
            }, {
                type: "text",
                key: "parentName",
                label: "上级市场区域",
                compid: "parentNameBase",
                editable: false,
            },
            // {
            //     type: "integer",
            //     key: "nodeLevel",
            //     label: "节点级别",
            // },
            {
                type: "refer",
                key: "organizationId",
                label: "所属组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0"
                },
            },
            {
                type: "refer",
                key: "principalId",
                label: "负责人",
                refinfo: "person",
                refName: "负责人",
                clientParam: {
                    "EQ_isEnable": "1", "EQ_dr": "0"
                }
            },
            {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: '0'
            },
            {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            },

            ]
        },
        details: {
            detail1: [{
                key: "code",
                label: "编码",
            },
            {
                key: "name",
                label: "名称"
            },
            {
                key: "parentName",
                label: "上级市场区域",
            }, {
                key: "parentName",
                label: "上级市场区域",
            },
            // {
            //     key: "nodeLevel",
            //     label: "节点级别",
            // },
            {
                key: "organizationName",
                label: "所属组织",
            },
            {
                key: "principalName",
                label: "负责人",
            },
            {
                key: "isEnable",
                label: "启用状态",
                "computed": "enableFmt",
            },
            {
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            },

            ]
        },
        grids: {
            grid1: {
                domid: "marketarea",
                umeta: {
                    id: "grid_marketarea",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                    renderType: "detailRender"
                },
                {
                    field: "name",
                    dataType: "String",
                    title: "名称"
                },
                {
                    field: "parentName",
                    dataType: "String",
                    title: "上级市场区域"
                },
                {
                    field: "organizationName",
                    dataType: "String",
                    title: "所属组织"
                },
                {
                    field: "countryName",
                    dataType: "String",
                    title: "国家",
                    visible: false
                },
                {
                    field: "provinceName",
                    dataType: "String",
                    title: "省",
                    visible: false
                },
                {
                    field: "cityName",
                    dataType: "String",
                    title: "市",
                    visible: false
                },
                {
                    field: "countyName",
                    dataType: "String",
                    title: "区县",
                    visible: false
                },
                {
                    field: "principalName",
                    dataType: "String",
                    title: "负责人",
                    visible: false
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注",
                    visible: false
                },
                {
                    field: "isEnable",
                    dataType: "String",
                    title: "状态",
                    renderType: "enableRender"
                },
                // {
                //     field: "nodeLevel",
                //     dataType: "integer",
                //     title: "节点级别",
                //     visible: false
                // },
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
                    dataType: "Date",
                    title: "创建时间",
                    visible: false
                },
                {
                    field: "modifiedTime",
                    dataType: "Date",
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
            },
            "grid2": {
                "domid": "grid_1521683062231_dom",
                "umeta": {
                    "id": "grid_MarketAreaItem",
                    "data": "childList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                "columns": [
                    // {
                    //     "field": "marketAreaId",
                    //     "required": "true",
                    //     "dataType": "String",
                    //     "title": "市场区域",
                    //     "renderType": "ncReferRender",
                    //     "editType": "ncReferEditType",
                    //     "showField": "marketAreaCode",
                    //     "editOptions": {
                    //         "validType": "string",
                    //         "rel": {
                    //             "refpk": "marketAreaId",
                    //             "refcode": "marketAreaCode",
                    //             "refname": "marketAreaName"
                    //         }
                    //     }
                    // },
                    // {
                    //     "field": "marketAreaName",
                    //     "dataType": "String",
                    //     "title": "市场区域名称",
                    //     "editable": false
                    // },
                    {
                        "field": "countryId",
                        "dataType": "String",
                        "title": "国别",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string"
                        },
                        "showField": "countryName",
                    }, {
                        "field": "provinceId",
                        "dataType": "String",
                        "title": "所在省份",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "refname": "provinceName"
                            }
                        },
                        "showField": "provinceName",
                    }, {
                        "id": "cityAddress",
                        "field": "cityId",
                        "dataType": "String",
                        "title": "所在城市",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "refname": "cityName"
                            }
                        },
                        "showField": "cityName",
                    }, {
                        "id": "countyAddress",
                        "field": "countyId",
                        "dataType": "String",
                        "title": "所在区/县",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "refname": "countyName"
                            }
                        },
                        "showField": "countyName",
                    }
                ]
            },
            "grid3": {
                "domid": "grid_1521683062231_dom1",
                "umeta": {
                    "id": "grid_MarketAreaItem1",
                    "data": "childList",
                    "type": "grid",
                    "editable": false,
                    "showNumCol": true
                },
                "columns": [
                    {
                        "field": "countryName",
                        "dataType": "String",
                        "title": "国别",
                    }, {
                        "field": "provinceName",
                        "dataType": "String",
                        "title": "所在省份",
                    }, {
                        "field": "cityName",
                        "dataType": "String",
                        "title": "所在城市",
                    }, {
                        "field": "countyName",
                        "dataType": "String",
                        "title": "所在区/县",
                    }
                ]
            },
        }
    };
    return new basemodel(model);
});

