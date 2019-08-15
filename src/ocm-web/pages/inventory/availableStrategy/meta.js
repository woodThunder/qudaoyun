define(["ocm_basemodel"], function(basemodel) {
    "use strict";
    var model = {
        metas: {
            availableStrategymeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.AvailableStrategyDto"
                },
                meta: {
                    id: {
                        type: "string"
                    }, //id
                    code: {
                        type: "string",
                        required: true
                    }, //编码
                    name: {
                        type: "string",
                        required: true
                    }, //名称
                    avaResource: {
                        type: "string",
                        required: true
                    }, //可用量来源
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true，
            },
            availableLinkWilloutmeta: {
                meta: {
                    id: {
                        type: "string"
                    }, //id
                    availableStrategyId: {
                        type: "string"
                    }, //可用量策略id
                    availableStrategyCode: {
                        type: "string"
                    }, //可用量策略code
                    availableStrategyName: {
                        type: "string"
                    }, //可用量策略name
                    stockWilloutId: {
                        type: "string"
                    }, //预计出库id
                    stockWilloutCode: {
                        type: "string"
                    }, //预计出库code
                    stockWilloutName: {
                        type: "string"
                    }, //预计出库name
                    limitType: {
                        type: "string",
                        default: 0
                    }, //控制方式
                    occupyTime: {
                        type: "string",
                        default: 0
                    }, //占用时点
                    bussiness: {
                        type: "string"
                    }, //业务
                    occupyBillId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['billtype']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_isEnable":"1","IN_code":"SaleOrder,DeliveryOrder,PurchaseBill,Transfer"}'
                    }, //占用单据
                    occupyBillCode: {
                        type: "string"
                    }, //占用单据
                    occupyBillName: {
                        type: "string"
                    }, //占用单据
                    isSelected: {
                        type: "string"
                    } //占用单据
                },
                pageSize: 10
            },
            availableLinkWillinmeta: {
                meta: {
                    id: {
                        type: "string"
                    }, //id
                    availableStrategyId: {
                        type: "string"
                    }, //可用量策略id
                    availableStrategyCode: {
                        type: "string"
                    }, //可用量策略code
                    availableStrategyName: {
                        type: "string"
                    }, //可用量策略name
                    stockWillinId: {
                        type: "string"
                    }, //预计出库id
                    stockWillinCode: {
                        type: "string"
                    }, //预计出库code
                    stockWillinName: {
                        type: "string"
                    }, //预计出库name
                    occupyTime: {
                        type: "string",
                        default: 0
                    }, //占用时点
                    bussiness: {
                        type: "string"
                    }, //业务
                    occupyBillId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['billtype']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_isEnable":"1","IN_code":"PurchaseBill,SaleOrder,Transfer"}'
                    }, //占用单据
                    occupyBillCode: {
                        type: "string"
                    }, //占用单据
                    occupyBillName: {
                        type: "string"
                    }, //占用单据
                    isSelected: {
                        type: "string"
                    } //占用单据
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
            }, {
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
                clickArg: "outChildList",
                iconCls: "icon-plus"
            }, {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "outChildList",
                iconCls: "icon-shanchu1"
            }],
            button5: [{
                key: "addrow",
                label: "增行",
                click: "addRow",
                cls: "ui-btn-orange",
                clickArg: "inChildList",
                iconCls: "icon-plus"
            }, {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "inChildList",
                iconCls: "icon-shanchu1"
            }]
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
                label: "名称"
            }, {
                type: "combo",
                key: "avaResource",
                label: "可用量来源",
                dataSource: [{
                    value: "0",
                    name: "默认"
                }, {
                    value: "1",
                    name: "NC可用量"
                }]
            }]
        },
        cards: {
            card1: [{
                type: "text",
                key: "code",
                label: "编码",
                disableInEdit: true
            }, {
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "combo",
                key: "avaResource",
                label: "可用量来源",
                dataSource: [{
                    value: "0",
                    name: "默认"
                }, {
                    value: "1",
                    name: "NC可用量"
                }]
            }],
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
                    "EQ_isEnable": "1"
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
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
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
                    title: "名称"
                }, {
                    field: "avaResource",
                    dataType: "string",
                    title: "可用量来源",
                    renderType: "avaResourceRender"
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }]
            },
            grid2: {
                domid: "stock_willout",
                umeta: {
                    id: "grid_stock_willout",
                    data: "outChildList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                    onBeforeEditFun: "outBeforeEditCheck"
                },
                columns: [{
                    field: "bussiness",
                    dataType: "String",
                    title: "业务",
                    editable: false,
                }, {
                    field: "occupyBillId",
                    dataType: "String",
                    title: "占用单据",
                    required: true,
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refname: "occupyBillName",
                        }
                    },
                    showField: "occupyBillName",
                }, {
                    field: "isSelected",
                    dataType: "integer",
                    title: "包含",
                    editOptions: {
                        id: "isDefaultCA",
                        type: "combo",
                        datasource: "whetherSource",
                        defaultvalue: "0",
                    },
                    editType: "combo",
                    defaultvalue: "0",
                    editable: false,
                    renderType: "whetherRender"
                }, {
                    field: "limitType",
                    dataType: "integer",
                    title: "检查方式",
                    editOptions: {
                        id: "isDefaultCA",
                        type: "combo",
                        datasource: "limitTypeSource",
                        defaultvalue: "0",
                    },
                    editType: "combo",
                    defaultvalue: "0",
                    renderType: "limitTypeRender"
                }, {
                    field: "occupyTime",
                    dataType: "integer",
                    title: "占用时点",
                    editOptions: {
                        id: "isDefaultCA",
                        type: "combo",
                        datasource: "occupyTimeSource",
                        defaultvalue: "0",
                    },
                    editType: "combo",
                    defaultvalue: "0",
                    renderType: "occupyTimeRender"
                }, ]
            },
            grid3: {
                domid: "stock_willin",
                umeta: {
                    id: "grid_stock_willin",
                    data: "inChildList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                    onBeforeEditFun: "inBeforeEditCheck"
                },
                columns: [{
                    field: "bussiness",
                    dataType: "String",
                    title: "业务",
                    editable: false,
                }, {
                    field: "occupyBillId",
                    dataType: "String",
                    title: "占用单据",
                    required: true,
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refname: "occupyBillName",
                        }
                    },
                    showField: "occupyBillName",
                }, {
                    field: "isSelected",
                    dataType: "integer",
                    title: "包含",
                    editOptions: {
                        id: "isDefaultCA",
                        type: "combo",
                        datasource: "whetherSource",
                        defaultvalue: "0",
                    },
                    editType: "combo",
                    defaultvalue: "0",
                    editable: false,
                    renderType: "whetherRender"
                }, {
                    field: "occupyTime",
                    dataType: "integer",
                    title: "占用时点",
                    editOptions: {
                        id: "isDefaultCA",
                        type: "combo",
                        datasource: "occupyTimeSource",
                        defaultvalue: "0",
                    },
                    editType: "combo",
                    defaultvalue: "0",
                    renderType: "occupyTimeRender"
                }, ]
            },
            grid4: {
                domid: "stock_willout_detail",
                umeta: {
                    id: "grid_stock_willout_detail",
                    data: "outChildList",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: false,
                },
                columns: [{
                    field: "bussiness",
                    dataType: "String",
                    title: "业务",
                }, {
                    field: "occupyBillName",
                    dataType: "String",
                    title: "占用单据",
                }, {
                    field: "isSelected",
                    dataType: "integer",
                    title: "包含",
                    renderType: "whetherRender"
                }, {
                    field: "limitType",
                    dataType: "integer",
                    title: "检查方式",
                    renderType: "limitTypeRender"
                }, {
                    field: "occupyTime",
                    dataType: "integer",
                    title: "占用时点",
                    renderType: "occupyTimeRender"
                }, ]
            },
            grid5: {
                domid: "stock_willin_detail",
                umeta: {
                    id: "grid_stock_willin_detail",
                    data: "inChildList",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: false,
                },
                columns: [{
                    field: "bussiness",
                    dataType: "String",
                    title: "业务",
                }, {
                    field: "occupyBillName",
                    dataType: "String",
                    title: "占用单据",
                }, {
                    field: "isSelected",
                    dataType: "integer",
                    title: "包含",
                    renderType: "whetherRender"
                }, {
                    field: "occupyTime",
                    dataType: "integer",
                    title: "占用时点",
                    renderType: "occupyTimeRender"

                }, ]
            },
        },
        details: {
            detail1: [{
                key: "code",
                label: "编码",
            }, {
                key: "name",
                label: "名称"
            }, {
                key: "avaResource",
                label: "可用量来源",
                computed: "avaResourceCom"
            }]
        }
    };
    return new basemodel(model);
});