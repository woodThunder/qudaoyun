define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            goodsSlotmeta: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    code: {
                        type: 'string',
                        required: true
                    }, //编码
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    fullName: {
                        type: 'string'
                    },
                    isEnable: {
                        type: 'integer',
                        default: '0'
                    }, //是否启用
                    // 父级ID
                    parentId: {
                        type: 'string'
                    },
                    // 所属库存组织
                    pkOrgId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },
                    pkOrgCode: {
                        type: 'string'
                    },
                    pkOrgName: {
                        type: 'string'
                    },
                    // 仓库
                    wareHouseId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['warehouse']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        'refparam': '{"EQ_isEnable":"1","ifSlotManage" : "1"}'
                    },
                    wareHouseCode: {
                        type: 'string'
                    },
                    wareHouseName: {
                        type: 'string'
                    },
                    // 路径编码
                    treePathCode: {
                        type: 'string'
                    },
                    // 货位容积
                    cubage: {
                        type: 'string'
                    },
                    // 保管员
                    storeKeeperId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"保管员"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    storeKeeperCode: {
                        type: 'string'
                    },
                    storeKeeperName: {
                        type: 'string'
                    },
                    // 是否末级
                    isFinal: {
                        type: 'string'
                    },
                    // 入库优先级
                    stockInLevel: {
                        type: 'string'
                    },
                    // 出库优先级
                    stockOutLevel: {
                        type: 'string'
                    },
                    // 备注
                    remark: {
                        type: 'string'
                    },
                    operation: {
                        type: 'string'
                    }
                },
                pageSize: 10,
            },
            queryparammeta: {
                meta: {
                    params: {
                        type: 'string'
                    }
                }
            }
        },
        buttons: {
            button1: [{
                    key: "add",
                    label: "确定",
                    cls: "ui-btn-green",
                    click: "confirm"
                },
                {
                    key: "del",
                    label: "重置",
                    click: "reset"
                }
            ],
            button2: [{
                key: "add",
                label: "保存",
                iconCls: "icon-tubiao-baocun",
                click: "batchSave"
            }],
        },
        dialogs: {
            dialog1: [{
                    type: "text",
                    key: "code",
                    label: "货位号",
                    required:true
                },
                {
                    type: "text",
                    key: "name",
                    label: "货位名称",
                    required:true
                },
                {
                    type: "refer",
                    key: "storeKeeperId",
                    label: "保管员",
                    refinfo: "person"
                },
                {
                    type: "text",
                    key: "cubage",
                    label: "货位容积"
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
                    cls:"ui-textarea-item"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "goodsSlot",
                umeta: {
                    id: "grid_goodsSlot",
                    data: "goodsSlotList",
                    type: "grid",
                    editable: true,
                    multiSelect: false,
                    showNumCol: true,
                },
                columns: [{
                        field: "code",
                        dataType: "String",
                        title: "货位号",
                        required:true
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "货位名称",
                        required:true
                    },
                    {
                        field: "storeKeeperId",
                        dataType: "String",
                        title: "保管员",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string"
                        },
                        "showField": "storeKeeperName",
                    },
                    {
                        field: "cubage",
                        dataType: "String",
                        title: "货位容积",
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
                        "editOptions": {
                            "id": "isEnableCombo",
                            "type": "combo",
                            "datasource": "statusSource"
                        },
                        "editType": "combo",
                        "renderType": "comboRender",
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注",
                    },
                ]
            }
        }
    };
    return new basemodel(model);
});