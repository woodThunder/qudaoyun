define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            customermanagermeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.SupplierDto"
                },
                meta: {
                    id: {type: "string"},//id
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"客户"}',
                        refparam: '{"EQ_isChannelCustomer":"1","EQ_isEnable":"1"}',
                        required: true
                    },
                    customerCode: { type: 'string' },
                    customerName: { type: 'string' },
                    mgtOrganizationId: {
                        type: 'string',
                        refmodel: JSON.stringify(refinfo['organization_ocm']),
                        refcfg: '{"ctx":"/uitemplate_web","refCode":"","refName":"管理组织"}',
                        refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'

                    },
                    mgtOrganizationCode: { type: 'string' },
                    mgtOrganizationName: { type: 'string' },
                    mgtCustomerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"上级管理客户"}',
                    },
                    mgtCustomerCode: { type: 'string' },
                    mgtCustomerName: { type: 'string' }
                },
                pageSize: 10
            },
            customermanagercategorymeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustomerManagerDto"
                },
                meta: {
                    id: {type: "string"},//id
                    customerCode: {type: "string", required: true},//客户code
                    customerName: {type: "string", required: true},//客户名称
                    marketAreaCode: {type: "string", required: true},//市场区域code
                    marketAreaName: {type: "string", required: true},//市场区域名称
                    customerCategoryCode: {type: "string", required: true},//客户分类code
                    customerCategoryName: {type: "string", required: true},//客户分类名称
                    customerLevelCode: {type: "string", required: true},//客户等级code
                    customerLevelName: {type: "string", required: true},//客户等级名称
                    channelTypeCode: {type: "string", required: true},//渠道类型code
                    channelTypeName: {type: "string", required: true},//渠道类型名称
                    mgtOrganizationCode: {type: "string", required: true},//管理组织code
                    mgtOrganizationName: {type: "string", required: true},//管理组织名称
                    isEnable: {type: "Integer"},// 状态
                    mgtCustomerCode: {type: "string", required: true},//上级管理客户code
                    mgtCustomerName: {type: "string", required: true},//上级管理客户名称
                },
                pageSize: 10
            },
            customermanageraccountmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.SupplierAccountDto"
                },
                meta: {
                    id: {type: 'string'},
                    customerManagerId: {type: 'string'},
                    departmentId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['department']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"部门"}',
                        // required: true
                    },
                    departmentCode: {type: 'string'},
                    departmentName: {type: 'string'},
                    personId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"业务员"}',
                        // required: true
                    },
                    personCode: {type: 'string'},
                    personName: {type: 'string'},
                    isDirector: {type: 'string'}
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
                key: "import",
                label: "导入",
                iconCls: "icon-import",
                click: "importHandle",
                auth: true
            }, {
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle",
                auth: true
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
                clickArg: "accountList",
                iconCls: "icon-plus"
            }, {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "accountList",
                iconCls: "icon-shanchu1"
            }]
        },
        // buttonmenus: {
        //     buttonmenu1: [{
        //         key: "import",
        //         label: "导入",
        //         iconCls: "icon-import",
        //         children: [{
        //             key: "importSupplier",
        //             label: "导入主表信息",
        //             click: "importSupplier"
        //         }, {
        //             key: "importAccount",
        //             label: "导入供应商银行账户",
        //             click: "importAccount"
        //         }]
        //     }, {
        //         key: "export",
        //         label: "导出",
        //         iconCls: "icon-export",
        //         children: [{
        //             key: "exportSupplier",
        //             label: "导出主表信息",
        //             click: "exportSupplier"
        //         }, {
        //             key: "exportAccount",
        //             label: "导出供应商银行账户",
        //             click: "exportAccount"
        //         }]
        //     }]
        // },
        searchs: {
            search1: [{
                type: "refer",
                key: "customer--id",
                label: "客户",
                refinfo: "customer",
                clientParam: {
                    "EQ_isChannelCustomer":"1",
                    "EQ_isEnable":"1"
                }
            }, {
                type: "refer",
                key: "mgtOrganization--id",
                label: "管理组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel":"01",
                    "EQ_isEnable":"1"
                }
            }, {
                type: "refer",
                key: "mgtCustomer--id",
                label: "上级管理客户",
                refinfo: "customer"
            }]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "customerId",
                label: "客户",
            }, {
                type: "refer",
                key: "mgtOrganizationId",
                label: "管理组织",
            }, {
                type: "refer",
                key: "mgtCustomerId",
                label: "上级管理客户",
            }]
        },
        cards: {
            card1: [{
                type: "refer",
                key: "customerId",
                label: "客户",
            }, {
                type: "refer",
                key: "mgtOrganizationId",
                label: "管理组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel":"01",
                    "EQ_isEnable":"1"
                }
            }, {
                type: "refer",
                key: "mgtCustomerId",
                label: "上级管理客户",
            }]
        },
        details: {
            detail1: [{
                key: "customerName",
                label: "客户",
            }, {
                key: "mgtOrganizationName",
                label: "管理组织",
            }, {
                key: "mgtCustomerName",
                label: "上级管理客户",
            }]
        },
        grids: {
            grid1: {
                domid: "supplier",
                umeta: {
                    id: "grid_supplier",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "customerName",
                    dataType: "String",
                    title: "客户",
                }, {
                    field: "mgtOrganizationName",
                    dataType: "String",
                    title: "管理组织",
                }, {
                    field: "mgtCustomerName",
                    dataType: "String",
                    title: "上级管理客户",
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
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }]
            },
            grid2: {
                domid: "supplierAccount",
                umeta: {
                    id: "grid_supplierAccount",
                    data: "accountList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "departmentId",
                    dataType: "String",
                    title: "部门",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    editOptions: {
                        validType: "string"
                    },
                    // showField: "currencyName",
                    required: true
                }, {
                    field: "personId",
                    dataType: "String",
                    title: "业务员",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    editOptions: {
                        validType: "string"
                    },
                    // showField: "currencyName",
                    required: true
                }]
            },
            grid3: {
                domid: "supplierAccount1",
                umeta: {
                    id: "grid_supplierAccount1",
                    data: "accountList",
                    type: "grid",
                    editable: false,
                    showNumCol: true
                },
                columns: [

                    {
                        field: "departmentName",
                        dataType: "String",
                        title: "部门",
                    },
                    {
                        field: "personName",
                        dataType: "String",
                        title: "业务员",
                    }
                ]
            },
        }
    };
    return new basemodel(model);
});
