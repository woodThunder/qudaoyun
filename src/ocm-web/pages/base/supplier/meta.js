define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            suppliermeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.SupplierDto"
                },
                meta: {
                    id: {type: "string"},//id
                    code: {type: "string", required: true},//编码
                    name: {type: "string", required: true},//名称
                    abbreviation: {type: "string", required: true},//简称
                    supplierCategoryId: {type: "string", required: true},//供应商分类id
                    supplierCategoryName: {type: "string", required: true},//供应商分类name
                    supplierCategoryCode: {type: "string", required: true},//供应商分类code
                    supplierTypeCode: {
                        type: "string", required: true,
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"SUPPLIER_TYPE\",\"refName\":\"供应商类型\"}"
                    },//供应商类型code
                    supplierTypeName: {type: "string"},//供应商类型name
                    innerOrgId: {type: "string", required: false},//内部单位id
                    innerOrgName: {type: "string", required: false},//内部单位name
                    innerOrgCode: {type: "string", required: false},//内部单位code
                    address: {type: "string", required: false},//联系地址
                    contact: {type: "string", required: false},//联系人
                    tel: {type: "string", required: false},//联系电话
                    remark: {type: "string", required: false},//备注
                    isEnable: {type: "integer", required: true},// 状态
                    isCarrier: {type: "integer"},// 是否承运商
                    carrierType: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"CARRIER_TYPE\",\"refName\":\"承运商类型\"}"
                    },//承运商类型code
                    carrierTypeName: {type: "string"},//承运商类型name
                    customerId: {type: "string", required: false},//关联客商id
                    customerName: {type: "string", required: false},//关联客商name
                    customerCode: {type: "string", required: false},//关联客商code
                },
                pageSize: 10
            },
            suppliercategorymeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.SupplierCategoryDto"
                },
                meta: {
                    id: {type: "string"},//id
                    code: {type: "string", required: true},//编码
                    name: {type: "string", required: true},//名称
                    remark: {type: "string", required: false},//备注
                    parentId: {type: "string", required: false},//父供应商类型id
                    parentName: {type: "string", required: false},//父供应商类型name
                    parentCode: {type: "string", required: false},//父供应商类型code
                    isEnable: {type: "Integer"}// 状态
                },
                pageSize: 10
            },
            supplieraccountmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.SupplierAccountDto"
                },
                meta: {
                    id: {type: "string"},//id
                    supplierId: {
                        type: "string", required: true,
                        "refmodel": JSON.stringify(refinfo["suppliers"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    },//供应商
                    supplierCode: {type: "string", required: true},//供应商
                    supplierName: {type: "string", required: true},//供应商
                    depositBankId: {
                        type: "string", required: true,
                        "refmodel": JSON.stringify(refinfo["bank"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}",
                        "refparam": "{\"EQ_isEnable\":\"1\"}"
                    },//开户银行
                    depositBankCode: {type: "string", required: true},//开户银行
                    depositBankName: {type: "string", required: true},//开户银行
                    accountNumber: {type: "string", required: true},//银行帐号
                    accountName: {type: "string", required: true},//户名
                    accountNatureCode: {
                        type: "string",
                        required: true,
                        // "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        // "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"ACCOUNT_NATURE\",\"refName\":\"账户性质\"}"
                    },//账户性质
                    accountNatureName: {type: "string", required: true},//账户性质
                    currencyId: {
                        type: "string", required: true,
                        "refmodel": JSON.stringify(refinfo["currency"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}",
                        "refparam": "{\"EQ_isEnable\":\"1\"}"
                    },//币种
                    currencyCode: {type: "string", required: true},//币种
                    currencyName: {type: "string", required: true},//币种
                    bankCategoryName: {type: "string"},
                    contact: {type: "string"},//联系人
                    tel: {type: "string", required: true},//电话
                    isDefault: {type: "Integer"}// 默认
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
        buttonmenus: {
            buttonmenu1: [{
                key: "import",
                label: "导入",
                iconCls: "icon-import",
                children: [{
                    key: "importSupplier",
                    label: "导入主表信息",
                    click: "importSupplier"
                }, {
                    key: "importAccount",
                    label: "导入供应商银行账户",
                    click: "importAccount"
                }]
            }, {
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                children: [{
                    key: "exportSupplier",
                    label: "导出主表信息",
                    click: "exportSupplier"
                }, {
                    key: "exportAccount",
                    label: "导出供应商银行账户",
                    click: "exportAccount"
                }]
            }]
        },
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
                type: "refer",
                key: "supplierCategory--id",
                label: "供应商分类",
                refinfo: "suppliercategory"
            }, {
                type: "combo",
                key: "supplierType",
                label: "供应商类型",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=SUPPLIER_TYPE",
                namefield: "name",
                valuefield: "code",
                multi: true
            }, {
                type: "text",
                key: "contact",
                label: "联系人"
            }, {
                type: "text",
                key: "tel",
                label: "联系电话"
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
            }, {
                type: "combo",
                key: "isCarrier",
                label: "是否承运商",
                dataSource: [
                    {value: "", name: "全部"},
                    {value: "0", name: "否"},
                    {value: "1", name: "是"}
                ]
            }]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                required: true
            }, {
                type: "text",
                key: "name",
                label: "名称",
                required: true
            }, {
                type: "text",
                key: "abbreviation",
                label: "简称"
            }, {
                type: "refer",
                key: "supplierCategoryId",
                keyfordisplay: "supplierCategoryName",
                label: "供应商分类",
                refinfo: "suppliercategory"
            }, {
                type: "combo",
                key: "supplierTypeCode",
                label: "供应商类型",
                defaultvalue: "02",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=SUPPLIER_TYPE",
                namefield: "name",
                valuefield: "code"
            }, {
                type: "refer",
                key: "innerOrgId",
                keyfordisplay: "innerOrgName",
                label: "内部单位",
                refinfo: "organization_ocm"
                //clientParam: {"EQ_isSaleOrganization": "1"}
            }, {
                type: "text",
                key: "address",
                label: "联系地址"
            }, {
                type: "text",
                key: "contact",
                label: "联系人"
            }, {
                type: "text",
                key: "tel",
                label: "联系电话"
            }, {
                type: "radio",
                key: "isCarrier",
                label: "是否承运商",
                dataSource: "whetherSrc",
                defaultvalue: "0",
                renderType: "booleanRender"
            }, {
                type: "combo",
                key: "carrierType",
                label: "承运商类型",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=CARRIERTYPE",
                namefield: "name",
                valuefield: "code"
            },  {
                type: "refer",
                key: "customerId",
                keyfordisplay: "customerName",
                label: "关联客商",
                refinfo: "customers"
            }, {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: "0"
            }, {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }]
        },
        cards: {
            card1: [{
                type: "text",
                key: "code",
                label: "编码",
                required: true
            }, {
                type: "text",
                key: "name",
                label: "名称",
                required: true
            }, {
                type: "text",
                key: "abbreviation",
                label: "简称"
            }, {
                type: "refer",
                key: "supplierCategoryId",
                keyfordisplay: "supplierCategoryName",
                label: "供应商分类",
                refinfo: "suppliercategory"
            }, {
                type: "combo",
                key: "supplierTypeCode",
                label: "供应商类型",
                defaultvalue: "02",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=SUPPLIER_TYPE",
                namefield: "name",
                valuefield: "code"
            }, {
                type: "refer",
                key: "innerOrgId",
                compid: "innerOrgId",
                keyfordisplay: "innerOrgName",
                label: "内部单位",
                refinfo: "organization_ocm"
                //clientParam: {"EQ_isSaleOrganization": "1"}
            }, {
                type: "text",
                key: "address",
                label: "联系地址"
            }, {
                type: "text",
                key: "contact",
                label: "联系人"
            }, {
                type: "text",
                key: "tel",
                label: "联系电话"
            }, {
                type: "checkbox",
                key: "isCarrier",
                label: "是否承运商",
                checkedValue:1,
                unCheckedValue:0,
                defaultvalue: 0
            }, {
                type: "combo",
                key: "carrierType",
                compid: "carrierType",
                label: "承运商类型",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=CARRIERTYPE",
                namefield: "name",
                valuefield: "code",
                multi: true,
                enable: false
            },  {
                type: "refer",
                key: "customerId",
                keyfordisplay: "customerName",
                label: "关联客商",
                refinfo: "customers"
            }, {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: "0"
            }, {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }]
        },
        details: {
            detail1: [{
                key: "code",
                label: "编码"
            }, {
                key: "name",
                label: "名称"
            }, {
                key: "abbreviation",
                label: "简称"
            }, {
                key: "supplierCategoryName",
                label: "供应商分类"
            }, {
                key: "supplierTypeName",
                label: "供应商类型"
            }, {
                keyfordisplay: "innerOrgName",
                label: "内部单位"
            }, {
                key: "address",
                label: "联系地址"
            }, {
                key: "contact",
                label: "联系人"
            }, {
                key: "tel",
                label: "联系电话"
            }, {
                key: "isCarrier",
                label: "是否承运商",
                "computed": "enableFmt"
            }, {
                type: "combo",
                key: "carrierType",
                label: "承运商类型",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=CARRIERTYPE",
                namefield: "name",
                valuefield: "code",

            }, {
                key: "customerName",
                label: "关联客商"
            }, {
                key: "isEnable",
                label: "启用状态",
                "computed": "enableFmt"
            }, {
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
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
                    field: "code",
                    dataType: "String",
                    title: "编码",
                    "renderType": "detailRender"
                }, {
                    field: "name",
                    dataType: "String",
                    title: "名称"
                }, {
                    field: "abbreviation",
                    dataType: "String",
                    title: "简称"
                }, {
                    field: "supplierCategoryName",
                    dataType: "String",
                    title: "供应商分类"
                }, {
                    field: "supplierTypeName",
                    dataType: "String",
                    title: "供应商类型"
                }, {
                    field: "innerOrgName",
                    dataType: "String",
                    title: "内部单位"
                }, {
                    field: "address",
                    dataType: "String",
                    title: "联系地址"
                }, {
                    field: "contact",
                    dataType: "String",
                    title: "联系人"
                }, {
                    field: "tel",
                    dataType: "String",
                    title: "联系电话"
                }, {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                }, {
                    field: "isEnable",
                    dataType: "String",
                    title: "状态",
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
                    field: "depositBankId",
                    dataType: "String",
                    title: "开户银行",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "depositBankName",
                    "required": true,
                    "editOptions": {
                        "validType": "string",
                        "rel": {"bankCategoryName": "bankCategoryName"}
                    }
                }, {
                    field: "bankCategoryName",
                    dataType: "String",
                    title: "银行类别",
                    editable: false
                }, {
                    field: "accountNumber",
                    dataType: "String",
                    title: "银行账号",
                    "required": true
                }, {
                    field: "accountName",
                    dataType: "String",
                    title: "户名",
                    "required": true
                }, {
                    "field": "accountNatureCode",
                    // "dataType": "String",
                    "title": "账户性质",
                    "required": true,
                    "editOptions": {
                        "type": "combo",
                    },
                    "datasource": "accountNatureSource",
                    "editType": "combo",
                    "renderType": "comboRender"
                }, {
                    field: "currencyId",
                    dataType: "String",
                    title: "币种",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string"
                    },
                    "showField": "currencyName",
                    "required": true
                }, {
                    field: "contact",
                    dataType: "String",
                    title: "联系人"
                }, {
                    field: "tel",
                    dataType: "String",
                    title: "联系电话",
                    "required": true
                }, {
                    field: "isDefault",
                    dataType: "integer",
                    title: "是否默认",
                    // width: "220px",
                    editOptions: {
                        id: "isDefaultACC",
                        type: "combo",
                        datasource: "whetherSource"
                    },
                    editType: "combo",
                    renderType: "isDefaultRender"
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
                        field: "depositBankName",
                        dataType: "String",
                        title: "开户银行",
                    },
                    {
                        field: "bankCategoryName",
                        dataType: "String",
                        title: "银行类别",
                    },
                    {
                        field: "accountNumber",
                        dataType: "String",
                        title: "银行账号",
                    },
                    {
                        field: "accountName",
                        dataType: "String",
                        title: "户名",
                    },
                    {
                        field: "accountNatureName",
                        dataType: "String",
                        title: "账户性质",
                    },
                    {
                        field: "currencyName",
                        dataType: "String",
                        title: "币种",
                    },
                    {
                        field: "contact",
                        dataType: "String",
                        title: "联系人",
                    },
                    {
                        field: "tel",
                        dataType: "String",
                        title: "联系电话",
                    },
                    {
                        field: "isDefault",
                        dataType: "integer",
                        title: "是否默认",
                        renderType: "isDefaultRender"
                    }
                ]
            },
        }
    };
    return new basemodel(model);
});
