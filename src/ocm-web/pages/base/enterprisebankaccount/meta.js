define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            EnterpriseBankAccountMeta: {
                meta: {
                    id: {type: "string"},//id
                    financeOrganizationId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["organization_ocm"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        refparam: "{\"EQ_orgFuncRel\": \"07\",\"EQ_isEnable\":\"1\"}"
                    },//财务组织
                    financeOrganizationCode: {type: "string"},
                    financeOrganizationName: {type: "string"},
                    depositBankId: {//开户行
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["bank"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        refparam: "{\"EQ_isEnable\":\"1\"}"
                    },
                    depositBankCode: {type: "string"},//银行编码
                    depositBankName: {type: "string"},//银行名称
                    bankCategoryName: {type: "string"},//银行类型名称
                    bankCategoryCode: {type: "string"},//银行类型编码
                    accountNumber: {type: "string", required: true},//银行账号
                    accountName: {type: "string", required: true},//户名
                    openDate: {type: "string", required: true},//开户日期
                    receiptAttributeCode: {//收付属性
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"RECEIPT_ATTRIBUTE\",\"refName\":\"\"}"
                    },
                    receiptAttributeName: {type: "string"},//收付属性名称
                    currencyId: {//币种
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["currency"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\"}",
                        refparam: "{\"EQ_isEnable\":\"1\"}"
                    },
                    currencyCode: {type: "string", required: true},
                    currencyName: {type: "string", required: true},
                    isEnable: {type: "integer", required: true},//启用
                    enableTime: {type: "string"},
                    enabledBy: {type: "string"},
                    disableTime: {type: "string"},
                    disabledBy: {type: "string"},
                    isDefault: {type: "integer", required: true}// 是否默认
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
                key: "financeOrganization--id",
                label: "财务组织",
                refinfo: "organization_ocm",
                //isReturnCode: "true",
                clientParam: {
                    "EQ_orgFuncRel": "02",
                    "EQ_isEnable": "1"
                }
            }, {
                type: "text",
                key: "accountNumber",
                label: "账号"
            }, {
                type: "text",
                key: "accountName",
                label: "户名"
            }, {
                type: "combo",
                key: "depositBank--bankCategory",
                label: "银行类别",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=BANK_CATEGORY",
                namefield: "name",
                valuefield: "code"
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
                key: "financeOrganizationId",
                label: "财务组织"
            }, {
                type: "refer",
                key: "depositBankId",
                label: "开户银行"
            }, {
                type: "text",
                key: "accountNumber",
                label: "银行账号"
            }, {
                type: "text",
                key: "accountName",
                label: "户名"
            }, {
                type: "date",
                key: "openDate",
                label: "开户日期"
            }, {
                type: "combo",
                key: "receiptAttributeCode",
                label: "收付属性",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=RECEIPT_ATTRIBUTE",
                namefield: "name",
                valuefield: "code"
            }, {
                type: "refer",
                key: "currencyId",
                label: "币种"
            }, {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: "0"
            }, {
                type: "date",
                key: "enableTime",
                enable: false,
                label: "启用时间"
            }, {
                type: "text",
                key: "enabledBy",
                enable: false,
                label: "启用人"
            }, {
                type: "date",
                key: "disableTime",
                enable: false,
                label: "停用时间"
            }, {
                type: "text",
                key: "disabledBy",
                enable: false,
                label: "停用人"
            }, {
                type: "radio",
                key: "isDefault",
                label: "是否默认",
                defaultvalue: "0",
                dataSource: [
                    {value: "1", name: "是"},
                    {value: "0", name: "否"}
                ]
            }]
        },
        details: {
            detail1: [{
                key: "financeOrganizationName",
                label: "财务组织"
            }, {
                key: "depositBankName",
                label: "开户银行"
            }, {
                key: "accountNumber",
                label: "银行账号"
            }, {
                key: "accountName",
                label: "户名"
            }, {
                key: "openDate",
                dataType: "date",
                label: "开户日期"
            }, {
                key: "receiptAttributeName",
                label: "收付属性"
            }, {
                key: "currencyName",
                label: "币种"
            }, {
                key: "isEnable",
                "computed": "enableFmt",
                label: "状态"
            }, {
                type: "disabledDate",
                key: "enableTime",
                dataType: "date",
                label: "启用时间"
            }, {
                type: "disabledText",
                key: "enabledBy",
                label: "启用人"
            }, {
                type: "disabledDate",
                key: "disableTime",
                dataType: "date",
                label: "停用时间"
            }, {
                type: "disabledText",
                key: "disabledBy",
                label: "停用人"
            }]
        },
        grids: {
            grid1: {
                domid: "enterprisebankaccount",
                umeta: {
                    id: "grid_enterprisebankaccount",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "financeOrganizationName",
                    dataType: "String",
                    title: "财务组织"
                }, {
                    field: "accountNumber",
                    dataType: "String",
                    title: "账户"
                    // "renderType": "detailRender"
                }, {
                    field: "accountName",
                    dataType: "String",
                    title: "户名"
                }, {
                    field: "depositBankName",
                    dataType: "String",
                    title: "名称"
                }, {
                    field: "bankCategoryName",
                    dataType: "String",
                    title: "银行类别"
                }, {
                    field: "openDate",
                    dataType: "Date",
                    title: "开户日期"
                }, {
                    field: "receiptAttributeName",
                    dataType: "String",
                    title: "收付属性"
                }, {
                    field: "isDefault",
                    dataType: "String",
                    title: "是否默认",
                    renderType: "whetherRender"
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
            }
        }
    };
    return new basemodel(model);
});
