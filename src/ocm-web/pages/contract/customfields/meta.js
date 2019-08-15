define(["ocm_basemodel"], function(basemodel) {
    var model = {
        metas: {
            customField: {
                params: {
                    cls: "com.yonyou.occ.rebate.service.dto.SalesTargetDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    // 模板编码
                    code: {
                        required: true,
                        type: 'string'
                    },
                    // 模板编码
                    name: {
                        required: true,
                        type: 'string'
                    },
                    //销售组织
                    saleOrgId: {
                        required: true,
                        type: 'string'
                    },
                    saleOrgCode: {
                      type: 'string'
                    },
                    saleOrgName: {
                      type: 'string'
                    },
                    contractTypeId:{
                        required:true,
                        type:'string'
                    },
                    contractTypeCode:{
                      type:'string'
                    },
                    contractTypeName:{
                      type:'string'
                    },
                    isEnable: {
                        required: true,
                        type: 'string'
                    },
                    remark: {
                        type: 'string'
                    },

                    // saleOrg: {
                    //     type: "string",
                    //     required: true,
                    //     refmodel: JSON.stringify(refinfo["organization_ocm"]),
                    //     refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
                    //     refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
                    // },
                    // saleOrgCode: {
                    //     type: 'string'
                    // },
                    // saleOrgName: {
                    //     type: 'string'
                    // },
                    // year: {
                    //     required: true,
                    //     type: 'integer'
                    // },
                    // startTime: {
                    //     type: 'date',
                    //     required: true
                    // },
                    // endTime: {
                    //     type: 'date',
                    //     required: true
                    // },
                    // goodsRange: {
                    //     type: 'string'
                    // },
                    // state: {
                    //     required: true,
                    //     type: 'integer'
                    // },
                    // remark: {
                    //     type: 'string'
                    // },
                    // creator: { type: 'string' }, // 创建人
                    // createTime: { type: 'date' }, // 创建时间
                    // modifier: { type: 'string' }, // 修改人
                    // modifiedTime: { type: 'date' }, // 修改时间
                },
                pageSize: 10,
            },
            customFieldChilditem: {
                params: {
                    cls: "com.yonyou.occ.rebate.service.dto.SalesTargetDetailDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    },
                    //表体Dto
                    templateId:{    //模板
                        type: 'string'
                    }, filedName:{   //字段名称
                        type: 'string'
                    },showName:{   //显示名称
                        type: 'string'
                    },isShow:{    //是否显示
                        type: 'integer'
                    },isFill:{    //
                        type: 'integer'
                    },remark: {
                      type: 'string'
                    }
                },
                pageSize: 10
            }
        },
        searchs: {
            search1: [{
                type: "type",
                require:true,
                key: "name",
                label: "模板名称"
            },
            {
                type: "type",
                require:true,
                key: "code",
                label: "模板编码"
            },
            {
                type: "refer",
                key: "saleOrg",
                require:true,
                label: "适用销售组织",
                // multi: true,
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "01"
                }
            },
            {
                type: "refer",
                key: "contractType",
                require:true,
                label: "合同类型",
                refinfo: "trantype",
                clientParam: {
                    "EQ_billTypeId": "SaleContract"
                }
            },
            ]
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "showAddBillPanel"
            }, {
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
                key: "cancel",
                label: "取消",
                click: "cancelBill"
            }, {
                key: "save",
                label: "保存",
                click: "saveBill",
                cls: "ui-btn-green"
            }, {
                    key: "return",
                    label: "返回",
                    click: "retListPanel"
                }],
            button3: [{
                key: "addrow",
                label: "增行",
                iconCls: "icon-plus",
                click: "addItems"
            }, {
                key: "delrow",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delItems",
            }],
            button4: [{
                key: "return",
                label: "返回",
                click: "retListPanel"
            }]
        },
        cards: {
            card1: [
                {
                    type: "text",
                    key: "code",
                    label: "模板名称"
                },
                {
                    type: "text",
                    key: "name",
                    label: "模板编码"
                },
                {
                    type: "refer",
                    key: "saleOrgId",
                    label: "适用销售组织",
                    // multi: true,
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "01"
                    }
                },
                {
                    type: "refer",
                    key: "contractTypeId",
                    label: "合同类型",
                    require:true,
                    refinfo: "trantype",
                    clientParam: {
                        "EQ_billTypeId": "SaleContract"
                    }
                }
            ]
        },
        details: {
            detail1: [
                {
                    key: "code",
                    label: "模板编码"
                },
                {
                    key: "name",
                    label: "模板名称"
                },
                {
                    key: "saleOrgName",
                    label: "销售组织"
                },
                {
                    key: "contractTypeName",
                    label: "合同类型"
                },
                {
                    key: "remark",
                    label: "备注"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    "id": "grid_complex",
                    "data": "complexList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "模板编码",
                    renderType: "detailRender",
                    width: "200px"
                }, {
                    field: "name",
                    dataType: "String",
                    title: "模板名称",
                }, {
                    field: "saleOrgName",
                    dataType: "String",
                    title: "销售组织"
                },
                    {
                    field: "contractTypeName",
                    dataType: "String",
                    title: "合同类型",
                },
                {
                    field: "isEnable",
                    dataType: "String",
                    title: "启用状态",
                    renderType: "enableStatusRender"
                },
                // {
                //     field: "remark",
                //     dataType: "String",
                //     title: "备注"
                // },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation",
                        fixed: true,
                        width: "110px"
                    },
                ]
            },
            grid2: {
                domid: "grid_rebate_complexItem_dom",
                umeta: {
                    "id": "grid_rebate_complexItem",
                    "data": "complexItems",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                 columns: [
                    {
                        field: "filedName",
                        dataType: "String",
                        title: "字段名",
                        editOptions: {
                          type: "combo",
                          datasource: "customFieldSource"
                        },
                        required: true,
                        editType: "combo",
                        renderType: "comboRender",
                    },{
                        field: "showName",
                        dataType: "String",
                        title: "显示名称",
                        required: true,
                    },
                    {
                        field: "isShow",
                        dataType: "checkbox",
                        title: "是否显示",
                        editable: true,
                        renderType: "booleanRender",
                        // required: true,
                    },
                     {
                         "field": "isFill",
                         "dataType": "checkbox",
                         "editable": true,
                         "title": "是否必填",
                         "renderType": "booleanRender",
                     },
                     {
                         field: "remark",
                         dataType: "String",
                         title: "备注"
                     }
                    ]
            },
            grid3: {
                domid: "grid_rebate_complexChildItem_dom",
                umeta: {
                    "id": "grid_rebate_complexChildItem",
                    "data": "complexDetailItems",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": false,
                    "showNumCol": false
                },
                columns: [
                    {
                        field: "filedName",
                        dataType: "String",
                        title: "字段名",
                        editOptions: {
                            type: "combo",
                            datasource: "customFieldSource"
                        },
                        editType: "combo",
                        renderType: "comboRender",
                    },{
                        field: "showName",
                        dataType: "String",
                        title: "显示名称"
                    },
                    {
                        field: "isShow",
                        dataType: "String",
                        title: "是否显示",
                        // disabled: true,
                        renderType: "booleanRenders"
                        // required: true,
                    },
                    {
                        field: "isFill",
                        dataType: "String",
                        title: "是否必填",
                        disabled: true,
                        renderType: "booleanRenders"
                        // required: true,
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注"
                    }

                ]
            }
        }
    }
    return new basemodel(model);
})