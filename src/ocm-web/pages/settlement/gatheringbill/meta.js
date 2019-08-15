define(['ocm_basemodel'], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            someta: {
                meta: {
                    id: {
                        type: 'string'
                    },
                    financeOrgId: { //财务组织
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
                    },
                    financeOrgCode: { //财务组织
                        type: 'string'
                    },
                    financeOrgName: { //财务组织
                        type: 'string'
                    },
                    saleOrgId: { //销售组织
                        required: true,
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}' //销售组织
                    },
                    saleOrgCode: { //销售组织
                        type: 'string'
                    },
                    saleOrgName: { //销售组织
                        type: 'string'
                    },
                    customerId: { //客户
                        type: 'string',
                        required: true,
                        refmodel: JSON.stringify(refinfo["customer"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
                        refparam: '{"EQ_isEnable":"1","AUTH_refdim":"customer"}',
                    },
                    //交易类型
                    billreceiptTypeId: {
                        type: 'string',
                        required: true,
                        default: "BillReceipt",
                        'refmodel': JSON.stringify(refinfo['trantype']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"交易类型"}',
                        'refparam': '{"EQ_billTypeId":"BillReceipt"}'
                    },
                    billreceiptTypeCode: {
                        type: 'string'
                    },
                    billreceiptTypeName: {
                        type: 'string'
                    },
                    orderTypeId: {
                        type: 'String'
                        //2019年1月7日 11:01:00 去除默认值为1
                        // ,default: 1
                    }, //订单类型
                    orderTypeName: {
                        type: 'String'
                    },
                    dealObject: {
                        required: true,
                        type: 'string'
                    }, //往来对象
                    customerCode: { //客户
                        type: 'string'
                    },
                    customerName: { //客户
                        type: 'string'
                    },
                    gatherTypeId: { //交易类型
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['trantype']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"交易类型" }',
                        "refparam": '{"EQ_billTypeId":"GatheringBill"}'
                    },
                    gatherTypeCode: { //收款单号
                        type: 'string',
                    },
                    gatherTypeName: { //收款单号
                        type: 'string'
                    },
                    code: { //收款单号
                        type: 'string'
                    },
                    billreceiptTime: { //收款日期
                        type: 'datetime',
                        required: true,
                    },
                    settleMethodId: { //结算方式
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['settlementMode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"结算方式" }',
                        // "refparam":'{"EQ_billTypeId":"GatheringBill"}'
                    },
                    settleMethodCode: { //结算方式
                        type: 'string'
                    },
                    settleMethodName: { //结算方式
                        type: 'string'
                    },
                    payAccountId: { //付款银行账户
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['ent-bank-account']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"付款银行账户" }',
                        "refparam": '{"EQ_isEnable":"1"}'
                    },
                    payAccountAccountName: {
                        type: 'string',
                    },
                    payAccountBank: { //付款银行账户开户行
                        type: 'string'
                    },
                    payAccountOwner: { //付款银行账户人
                        type: 'string'
                    },
                    receiptAccountId: { //收款银行账户
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['ent-bank-account']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"付款银行账户" }',
                        "refparam": '{"EQ_isEnable":"1"}'
                    },
                    receiptAccountAccountName: { //收款银行账户
                        type: 'string'
                    },
                    gatherAccount: { //收款银行账户
                        type: 'string'
                    },
                    gatherAccountBank: { //收款银行账户开户行
                        type: 'string'
                    },
                    gatherAccountOwner: { //收款银行账户人
                        type: 'string'
                    },
                    currencyName: { //币种
                        type: 'string',
                        required: true,
                        // "refparam":'{"EQ_isEnable":"1"}'
                    },
                    departmentId: {
                        type: 'string',
                        required: true,
                        refmodel: JSON.stringify(refinfo["department"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    departmentCode: {
                        type: 'string'
                    },
                    departmentName: {
                        type: 'string'
                    },
                    salemanId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"业务员" }',
                        "refparam": '{"EQ_isEnable":"1"}'
                    },
                    salemanName: {
                        type: 'string'
                    }, //业务员
                    logisticsCompanyId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['logistics-company']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司" }',
                        "refparam": '{"EQ_isEnable":"1"}'
                    },
                    logisticsCompanyCode: {
                        type: 'string'
                    },
                    logisticsCompanyName: {
                        type: 'string'
                    },
                    note: {
                        type: 'string'
                    },
                    billreceiptState: { //收款单状态
                        type: 'string'
                    },
                    billreceiptStateName: { //收款单状态
                        type: 'string'
                    },
                    approver: { //审批人
                        type: 'string'
                    },
                    approveTime: {
                        type: 'datetime'
                    },
                    isRedflush: { //是否被红冲
                        type: 'integer',
                        default: 0
                    },
                    money: {
                        type: "amountFloat"
                    }
                },
                pageSize: 10
            },
            soitemmeta: {
                meta: {
                    id: {
                        type: 'string'
                    },
                    creator: {
                        type: 'string'
                    },
                    creationTime: {
                        type: 'datetime'
                    },
                    modifier: {
                        type: 'string'
                    },
                    modifiedTime: {
                        type: 'datetime'
                    },
                    fromCode: {
                        type: 'string'
                    }, //来源单据号
                    fromSerialnum: {
                        type: 'string'
                    }, //来源单据行号
                    saleOrgOrderNum: {
                        type: 'string'
                    }, //销售订单号
                    orderTypeId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['trantype']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"订单类型" }',
                        "refparam": '{"EQ_billTypeId": "SaleOrder"}'
                    }, //订单类型
                    orderTypeName: {
                        type: 'string'
                    }, //订单类型
                    serialnum: { //行号
                        type: 'string'
                    },
                    gatherId: { //收款单主键
                        type: 'string'
                    },
                    gatherCode: { //收款单code
                        type: 'string'
                    },
                    remainMoneyClaim: {
                        type: 'float',
                    }, //待认领金额
                    settleMethodId: { //结算方式
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['settlementMode']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"结算方式" }',
                        // "refparam":'{"EQ_billTypeId":"GatheringBill"}'
                    },
                    settleMethodCode: { //结算方式
                        type: 'string'
                    },
                    settleMethodName: { //结算方式
                        type: 'string'
                    },
                    saleOrgId: { //销售组织
                        type: 'string',
                        required: true,
                        refmodel: JSON.stringify(refinfo['organization_ocm']),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
                        refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}'
                    },
                    saleOrgCode: {
                        type: 'string'
                    },
                    saleOrgName: {
                        type: 'string'
                    },
                    payAccountId: {
                        type: 'string',
                    }, //付款银行账户
                    payAccountAccountName: {
                        type: 'string',
                    },
                    receiptAccountId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['ent-bank-account']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"付款银行账户" }',
                        "refparam": '{"EQ_isEnable":"1"}'
                    }, //收款银行账户
                    receiptAccountAccountName: {
                        type: 'string',
                    }, //收款银行账户
                    billreceiptTypeId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['settlementPaymentType']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"收付款类型" }',
                        "refparam": '{"EQ_isEnable":"1"}'
                    },
                    billreceiptTypeName: {
                        type: 'string',
                    },
                    projectId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['project']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"项目" }',
                        "refparam": '{"EQ_isEnable":"1"}'
                    },
                    projectName: {
                        type: 'string'
                    },
                    productLineId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['productLine']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    productLineName: { //产品线
                        type: 'string'
                    },
                    money: { //金额
                        type: 'amountFloat',
                        required: true,
                    },
                    alreadyMoney: { //已核销金额
                        type: 'amountFloat'
                    },
                    remainMoney: { //未核销金额
                        type: 'amountFloat'
                    },
                    accountMoney: { //累计认领金额
                        type: 'amountFloat'
                    },
                    payTerm: {
                        type: 'string'
                    }, //收款方式
                    claimId: { //认领单id
                        type: 'string'
                    },
                    caMoney: { //本次核销金额
                        type: 'amountFloat'
                    },
                    note: {
                        type: 'string'
                    },
                    orderId: { //订单号
                        type: 'string'
                    },
                    operation: {
                        type: 'string'
                    },
                    isRedflush: {
                        type: 'integer',
                        default: 0,
                    }, //是否红冲
                    dr: {
                        type: 'string'
                    }
                },
                pageSize: 10
            },
            currencyRefMeta: {
                meta: {
                    currency: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['currency']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"币种" }',
                    }
                },
                pageSize: 10
            },
            claimbillList: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    serialnum: {
                        type: 'string'
                    }, //行号
                    billclaimId: {
                        type: 'string',
                    }, //认领单主键
                    billclaimCode: {
                        type: 'string'
                    }, //认领单主键
                    remainMoney: {
                        type: 'float'
                    }, //余额
                    remainMoneyClaim: {
                        type: 'float',
                    }, //待认领金额
                    financeOrgId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
                    },
                    financeOrgCode: {
                        type: 'string',
                    },
                    financeOrgName: {
                        type: 'string',
                    }, //财务组织
                    customerId: {
                        type: 'string',
                        refmodel: JSON.stringify(refinfo["customer"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
                        refparam: '{"EQ_isEnable":"1"}',
                    },
                    customerName: {
                        type: 'string',
                    }, //客户
                    claimFrom: {
                        type: 'string',
                    }, //来源
                    code: {
                        type: 'string'
                    }, //单号
                    claimTime: {
                        type: 'string',
                        required: true,
                    }, //收款日期
                    settleMethodId: {
                        type: 'string'
                    }, //结算方式
                    settleMethodName: {
                        type: 'string'
                    }, //结算方式
                    payAccountId: {
                        type: 'string'
                    }, //付款银行账户
                    payAccountAccountName: {
                        type: 'string'
                    }, //付款银行账户
                    receiptAccountId: {
                        type: 'string',
                    }, //收款银行账户
                    receiptAccountAccountName: {
                        type: 'string',
                    }, //收款银行账户
                    currencyId: {
                        type: 'string',
                    },
                    currencyName: {
                        type: 'string'
                    }, //币种
                    note: {
                        type: 'string'
                    }, //备注
                    billreceiptState: {
                        type: 'string'
                    }, //认领单状态
                    creator: {
                        type: 'string'
                    }, //创建人
                    creationTime: {
                        type: 'datetime',
                    }, //创建时间
                    modifier: {
                        type: 'string'
                    }, //修改人
                    modifiedTime: {
                        type: 'datetime'
                    }, //修改时间
                    ts: {
                        type: 'string'
                    }, //时间戳
                    dr: {
                        type: 'integer'
                    }, //删除标志
                    payAccountBank: {
                        type: 'string',
                    }, //付款
                    gatherAccountBank: {
                        type: 'string'
                    }, //收款
                    saleOrgId: {
                        required: true,
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}' //销售组织
                    },
                    saleOrgCode: {
                        type: 'string'
                    },
                    saleOrgName: {
                        type: 'string'
                    }, //销售组织
                    dealObject: {
                        type: 'string'
                    }, //往来对象
                    departmentId: {
                        type: 'string'
                    }, //部门
                    departmentName: {
                        type: 'string'
                    }, //部门
                    salemanName: {
                        type: 'string'
                    }, //业务员
                    logisticsCompanyName: {
                        type: 'string'
                    }, //物流公司
                    ncOrder: {
                        type: 'string'
                    }, //nc单据号
                    cliamState: {
                        type: 'integer'
                    }, //认领状态
                    payTerm: {
                        type: 'string'
                    }, //收款方式
                    money: {
                        type: 'amountFloat'
                    }, //金钱
                    orderCode: {
                        type: 'string'
                    }, //订单号
                    projectId: {
                        type: 'string'
                    }, //项目
                    projectName: {
                        type: 'string'
                    }, //项目
                    // billreceiptType: {
                    //     type: 'string'
                    // }, //收付款业务类型
                    billclaimDetailDto: {
                        type: 'array'
                    }
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
        },
        buttons: {
            buttonList: [{
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "showAddBillPanel",
                    clickArg: "$data"
                }, {
                    key: "get",
                    label: "认领",
                    iconCls: "icon-tubiao-xuanpin",
                    click: "getbill",
                }, {
                    key: "submit",
                    label: "提交",
                    iconCls: "icon-tubiao-shenhe",
                    click: "submitCusReqForm",
                    auth: true
                }, {
                    key: "unsubmit",
                    label: "收回",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "unsubmitCusReqForm",
                    auth: true
                }, {
                    key: "approve",
                    label: "审批通过",
                    iconCls: "icon-tubiao-duigou-xianxing",
                    click: "approveCusReqForm",
                    auth: true
                }, {
                    key: "disapprove",
                    label: "审批不通过",
                    iconCls: "icon-tubiao-shibai",
                    click: "disapproveCusReqForm",
                    auth: true
                }, {
                    key: "cancelapprove",
                    label: "取消审批",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "cancelApproveCusReqForm",
                    auth: true
                },
                // {
                //     key: "audit",
                //     label: "审批",
                //     iconCls: "icon-qiyong",
                //     click: "audit"
                // },
                {
                    key: "reddel",
                    label: "红冲",
                    iconCls: "icon-shanchu1",
                    click: "reddel"
                }, {
                    key: "export",
                    label: " 导入",
                    iconCls: "icon-import",
                    click: "importHandle"
                }, {
                    key: "export",
                    label: " 导出",
                    iconCls: "icon-tingyong",
                    click: "exportHandle"
                }
            ],
            buttonEdit: [{
                key: "addline",
                label: "增行",
                iconCls: "icon-plus",
                click: "addLineHandler",
                clickArg: "$data"
            }, {
                key: "delline",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "delLineHandler",
                clickArg: "$data"
            }, ],
            buttonClaimSave: [{
                key: "addline",
                label: "取消",
                cls: "ui-btn-primary",
                // iconCls: "icon-plus",
                click: "retListClaim",
                clickArg: "$claim"
            }, {
                key: "delline",
                label: "确认",
                clickArg: "$confirm",
                // iconCls: "icon-shanchu1",
                cls: "ui-btn-green",
                click: "confirmClaim",
            }, ],
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "financeOrg",
                label: "财务组织",
                refinfo: "organization_ocm",
                //isReturnCode: "true",
                clientParam: {
                    "EQ_orgFuncRel": "07",
                    "EQ_isEnable": "1"
                },
                // multi: true,
                // opr: 'IN'
            }, {
                type: "refer",
                key: "saleOrg",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_isEnable": "1",
                    "EQ_orgFuncRel": "01"
                }, //销售组织
                // multi: true,
                // opr: 'IN'
            }, {
                type: "refer",
                key: "customer",
                label: "客户",
                referId: 'cstm01',
                refinfo: 'customer',
                clientParam: {
                    "EQ_isEnable": "1",
                    "AUTH_refdim":"customer"
                },
            }, {
                type: "daterange",
                key: "billreceiptTime",
                label: "收款日期"
            }, {
                type: "text",
                key: "code",
                label: "收款单号"
            }, {
                // billreceiptState
                type: "checkboxlist",
                key: "billreceiptState",
                label: "收款单状态",
                dataSource: [{
                    value: '0',
                    name: ''
                }, {
                    value: '1',
                    name: '保存'
                }, {
                    value: '2',
                    name: '提交'
                }, {
                    value: '3',
                    name: '审批'
                }],
                cls: "ui-checkboxes-item"
            }],
            search2: [{
                type: "refer",
                key: "financeOrg",
                label: "财务组织",
                refinfo: "organization_ocm",
                required: true,
                //isReturnCode: "true",
                clientParam: {
                    "EQ_orgFuncRel": "07",
                    "EQ_isEnable": "1"
                },
                // multi: true,
                // opr: 'IN'
            }, {
                type: "refer",
                key: "saleOrg",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_isEnable": "1",
                    "EQ_orgFuncRel": "01"
                }, //销售组织
                // multi: true,
                // opr: 'IN'
            }, {
                type: "refer",
                key: "customer",
                label: "客户",
                referId: 'cstm02',
                refinfo: 'customer',
                clientParam: {
                    "EQ_isEnable": "1"
                },
            }, {
                type: "text",
                key: "payAccount",
                label: "付款银行账户",
                // refinfo: "ent-bank-account",
                // multi: true,
                // opr: 'IN'
            }, {
                type: "daterange",
                key: "claimTime",
                label: "收款日期"
            }, {
                type: "text",
                key: "code",
                label: "收款认领单号"
            }, {
                type: "refer",
                key: "projectId",
                label: "项目",
                refinfo: "project"
            }, {
                type: "refer",
                key: "billreceiptType",
                label: "收付款类型",
                refinfo: "settlementPaymentType"
            }, ]
        },
        grids: {
            gridList: {
                domid: "gridList",
                umeta: {
                    id: "grid_salesorder",
                    data: "salesorderList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "收款单号",
                    renderType: "detailRender",
                    width: "200px"
                }, {
                    field: "financeOrgName",
                    dataType: "String",
                    title: "财务组织"
                }, {
                    field: "saleOrgName",
                    dataType: "String",
                    title: "销售组织"
                }, {
                    field: "logisticsCompanyName",
                    dataType: "String",
                    title: "物流公司"
                }, {
                    field: "billreceiptTypeName",
                    dataType: "String",
                    title: "交易类型",
                }, {
                    field: "isRedflush",
                    dataType: "String",
                    title: "是否红冲",
                    editOptions: {
                        type: "combo",
                        datasource: "redFlushRender"
                    },
                    renderType: "comboRender"
                }, {
                    field: "billreceiptTime",
                    dataType: "Date",
                    title: "收款日期"
                }, {
                    field: "payAccountAccountName",
                    dataType: "String",
                    title: "付款银行账户"
                }, {
                    field: "receiptAccountAccountName",
                    dataType: "String",
                    title: "收款银行账户"
                }, {
                    field: "currencyName",
                    dataType: "String",
                    title: "币种",
                }, {
                    field: "money",
                    dataType: "String",
                    title: "总金额",
                }, {
                    field: "billreceiptState",
                    dataType: "String",
                    title: "收款单状态",
                    editOptions: {
                        type: "combo",
                        datasource: "stateSrc"
                    },
                    renderType: "comboRender"
                }, {
                    field: "customerName",
                    dataType: "String",
                    title: "客户"
                }, {
                    field: "departmentName",
                    dataType: "String",
                    title: "部门"
                }, {
                    field: "salemanName",
                    dataType: "String",
                    title: "业务员"
                }, {
                    field: "approver",
                    dataType: "String",
                    title: "审批人",
                    visible: false
                }, {
                    field: "approveTime",
                    dataType: "Date",
                    title: "审批时间",
                    visible: false
                }, {
                    field: "creationTime",
                    dataType: "Datetime",
                    title: "创建时间",
                }, {
                    field: "note",
                    dataType: "String",
                    title: "备注",
                    visible: false
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation",
                    width: "200px",
                    fixed: true
                }, ]
            },
            gridDetailItem: {
                domid: "gridDetailItem",
                umeta: {
                    id: "grid_salesorder_item",
                    data: "saleOrderItems",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: false,
                },
                columns: [{
                    field: "serialnum",
                    dataType: "String",
                    title: "行号",
                    editable: false
                }, {
                    field: "fromCode",
                    dataType: "String",
                    title: "来源单号",
                }, {
                    field: "fromSerialnum",
                    dataType: "String",
                    title: "来源行号",
                }, {
                    field: "saleOrgOrderNum",
                    dataType: "String",
                    title: "销售订单号",
                }, {
                    field: "orderTypeName",
                    dataType: "String",
                    title: "订单类型"
                }, {
                    field: "productLineName",
                    dataType: "String",
                    title: "产品线",
                }, {
                    field: "billreceiptTypeName",
                    dataType: "String",
                    title: "收付款类型",
                }, {
                    field: "projectName",
                    dataType: "String",
                    title: "项目"
                }, {
                    field: "settleMethodName",
                    dataType: "String",
                    title: "结算方式"
                }, {
                    field: "isRedflush",
                    title: "是否被红冲",
                    dataType: "String",
                    editOptions: {
                        type: "combo",
                        datasource: "redFlushRender"
                    },
                    renderType: "comboRender"
                }, {
                    field: "money",
                    dataType: "String",
                    title: "金额",
                }, {
                    field: "payAccountAccountName",
                    dataType: "String",
                    title: "付款银行账户",
                }, {
                    field: "receiptAccountAccountName",
                    dataType: "String",
                    title: "收款银行账户",
                }, {
                    field: "alreadyMoney",
                    dataType: "String",
                    title: "已核销金额"
                }, {
                    field: "remainMoney",
                    dataType: "String",
                    title: "待核销金额"
                }, {
                    field: "note",
                    dataType: "String",
                    title: "备注"
                }, ]
            },
            gridRedDelItem: {
                domid: "grid_reddel_item_dom",
                umeta: {
                    id: "grid_reddel_item",
                    data: "saleOrderItems",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "serialnum",
                    dataType: "String",
                    title: "行号",
                }, {
                    field: "productLineName",
                    dataType: "String",
                    title: "产品线",
                }, {
                    field: "billreceiptTypeName",
                    dataType: "String",
                    title: "收付款类型",
                }, {
                    field: "projectName",
                    dataType: "String",
                    title: "项目",
                }, {
                    field: "money",
                    dataType: "String",
                    title: "金额",
                }, {
                    field: "payAccountAccountName",
                    dataType: "String",
                    title: "付款银行账户",
                }, {
                    field: "receiptAccountAccountName",
                    dataType: "String",
                    title: "收款银行账户",
                }, {
                    field: "alreadyMoney",
                    dataType: "Float",
                    title: "已核销金额",
                }, {
                    field: "remainMoney",
                    dataType: "String",
                    title: "待核销金额",
                }, {
                    field: "isRedflush",
                    title: "是否被红冲",
                    dataType: "String",
                    editOptions: {
                        type: "combo",
                        datasource: "redFlushRender"
                    },
                    renderType: "comboRender"
                }, {
                    field: "note",
                    dataType: "String",
                    title: "备注",
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "redDelOperation",
                    width: "200px",
                    fixed: true
                }, ]
            },
            gridEditItem: {
                domid: "grid_salesorder_edit_dom",
                umeta: {
                    id: "grid_salesorder_edit",
                    data: "saleOrderItems",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                },
                columns: [{
                    field: "serialnum",
                    dataType: "String",
                    title: "行号",
                    editable: false
                }, {
                    field: "fromCode",
                    dataType: "String",
                    title: "来源单号",
                    editable: false
                }, {
                    field: "fromSerialnum",
                    dataType: "String",
                    title: "来源行号",
                    editable: false
                }, {
                    field: "saleOrgOrderNum",
                    dataType: "String",
                    title: "销售订单号",
                    // editable: false,
                }, {
                    field: "orderTypeId",
                    dataType: "String",
                    title: "订单类型",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "orderTypeName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refpk: "orderTypeId",
                            refname: "orderTypeName"
                        }
                    },
                }, {
                    field: "productLineId",
                    dataType: "String",
                    title: "产品线",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "productLineName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refpk: "productLineId",
                            refname: "productLineName"
                        }
                    }
                }, {
                    field: "billreceiptTypeId",
                    dataType: "String",
                    title: "收付款类型",
                    refinfo: 'settlementPaymentType',
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "billreceiptTypeName",
                    required: true,
                    editOptions: {
                        validType: "string",
                        rel: {
                            refpk: "billreceiptTypeId",
                            refname: "billreceiptTypeName"
                        }
                    },
                }, {
                    dataType: "String",
                    field: "settleMethodId",
                    title: "结算方式",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "settleMethodName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refpk: "settleMethodId",
                            refname: "settleMethodName"
                        }
                    },

                }, {
                    field: "isRedflush",
                    dataType: "String",
                    title: "是否被红冲",
                    editable: false,
                    editOptions: {
                        type: "combo",
                        datasource: "redFlushRender"
                    },
                    renderType: "comboRender",
                }, {
                    field: "projectId",
                    dataType: "String",
                    title: "项目",
                    refinfo: 'project',
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "projectName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refpk: "projectId",
                            refname: "projectName"
                        }
                    },
                }, {
                    field: "money",
                    dataType: "String",
                    title: "金额",
                    required: true,
                    editOptions: {
                        validType: "float",
                    }
                }, {
                    field: "payAccountAccountName",
                    dataType: "String",
                    title: "付款银行账户",
                }, {
                    field: "receiptAccountId",
                    dataType: "String",
                    title: "收款银行账户",
                    refinfo: "ent-bank-account",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "receiptAccountAccountName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refpk: "receiptAccountId",
                            refname: "receiptAccountAccountName"
                        }
                    },
                }, {
                    field: "alreadyMoney",
                    dataType: "Float",
                    title: "已核销金额",
                    editable: false,
                }, {
                    field: "remainMoneyClaim",
                    dataType: "String",
                    title: "待认领金额",
                    editable: false,
                }, {
                    field: "note",
                    dataType: "String",
                    title: "备注"
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "claimOperation",
                    width: "200px",
                }, ]
            },
            gridClaimList: {
                domid: "grid_complex_dom",
                umeta: {
                    "id": "grid_complex",
                    "data": "claimList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true,
                    "height": "300px"
                },
                columns: [{
                    "field": "financeOrgName",
                    "dataType": "String",
                    "title": "财务组织",
                }, {
                    "field": "saleOrgName",
                    "dataType": "String",
                    "title": "销售组织",
                }, {
                    "field": "code",
                    "dataType": "String",
                    "title": "收款认领单号",
                }, {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "客户"
                }, {
                    "field": "claimTime",
                    "dataType": "Datetime",
                    "title": "收款日期"
                }, {
                    "field": "settleMethodName",
                    "dataType": "String",
                    "title": "结算方式"
                }, {
                    "field": "payAccountAccountName",
                    "dataType": "String",
                    "title": "付款银行账户",
                }, {
                    "field": "receiptAccountAccountName",
                    "dataType": "String",
                    "title": "收款银行账户",
                }, {
                    "field": "code",
                    "dataType": "String",
                    "title": "单号"
                }, {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                }, , {
                    "field": "billreceiptTypeName",
                    "dataType": "String",
                    "title": "收付款类型",
                }, {
                    "field": "money",
                    "dataType": "String",
                    "title": "收款金额",
                    "sumCol": true
                }, ]
            },
        },
        cards: {
            cardEdit: [{
                    type: "refer",
                    key: "financeOrgId",
                    label: "财务组织",
                    required: true,
                }, {
                    type: "refer",
                    key: "saleOrgId",
                    label: "销售组织",
                    required: true,
                }, {
                    type: "combo",
                    key: "dealObject",
                    label: "往来对象",
                    required: true,
                    dataSource: [{
                        value: '1',
                        name: '客户'
                    }, {
                        value: '2',
                        name: '部门'
                    }, {
                        value: '3',
                        name: '业务员'
                    }, {
                        value: '4',
                        name: '物流公司'
                    }],
                }, {
                    type: "refer",
                    key: "customerId",
                    label: "客户",
                    compid: "customerId",
                    domid: "customerId",
                    referId: 'cstm00',
                    cls: 'custormerv visibleFalse',
                    enable: false,
                }, {
                    referId: "departmentId",
                    type: "refer",
                    compid: "department",
                    key: "departmentId",
                    label: "部门",
                    domid: "department",
                    refinfo: "department",
                    cls: 'departmentv visibleFalse',
                    enable: false
                }, {
                    referId: "salemanId",
                    type: "refer",
                    key: "salemanId",
                    label: "业务员",
                    compid: "saleman",
                    refinfo: "person",
                    cls: 'salemanv visibleFalse',
                    enable: false
                }, {
                    type: "refer",
                    key: "logisticsCompanyId",
                    label: "物流公司",
                    refinfo: "logistics-company",
                    compid: "logisticsCompany",
                    refName: "物流公司",
                    cls: 'logisticsv visibleFalse',
                    enable: false
                }, {
                    type: "refer",
                    key: "billreceiptTypeId",
                    label: "交易类型",
                    refinfo: "trantype",
                    refName: "交易类型"
                }, {
                    type: "textreadonly",
                    key: "code",
                    label: "收款单号",
                    value: ''
                }, {
                    type: "datetime",
                    key: "billreceiptTime",
                    label: "收款日期"
                }, {
                    type: "text",
                    key: "payAccountAccountName",
                    label: "付款银行账户",
                }, {
                    type: "refer",
                    key: "receiptAccountId",
                    refinfo: "ent-bank-account",
                    label: "收款银行账户",
                    referId: 'receiptCard00',
                }, {
                    key: "currencyId",
                    type: "refer",
                    label: "币种",
                    refinfo: "currency",
                    referId: 'currencyRef',
                    required: true,
                }, {
                    type: "text",
                    key: "money",
                    label: "总金额",
                    enable: false
                }, {
                    type: "label",
                    key: "isRedflush",
                    label: "是否红冲",
                    height: "24px",
                    datasource: [{
                        value: '0',
                        name: '否'
                    }, {
                        value: '1',
                        name: '红冲单'
                    }, {
                        value: '2',
                        name: '否'
                    }, ]
                },
                // {
                //     type: "refer",
                //     key: "orderTypeId",
                //     referId: "orderTypeId",
                //     label: "订单类型",
                //     refinfo: "trantype",
                //     refName: "订单类型",
                //     clientParam: {
                //         "EQ_billTypeId": "SaleOrder"
                //     },
                //     required: true,
                // },
                {
                    type: "textarea",
                    key: "note",
                    label: "备注",
                    cls: "ui-textarea-item"
                },
                // {
                //     type: "combo",
                //     key: "state",
                //     label: "收款单状态",
                //     dataSource: "stateSrc"
                // }
            ],
        },
        details: {
            cardDetail: [{
                    key: "financeOrgName",
                    label: "财务组织",
                }, {
                    key: "saleOrgName",
                    label: "销售组织",
                }, {
                    key: "dealObject",
                    label: "往来对象",
                    computed: "dealObjectDetail"
                }, {
                    key: "customerName",
                    label: "客户",
                }, {
                    key: "departmentName",
                    label: "部门",
                }, {
                    key: "salemanName",
                    label: "业务员",
                }, {
                    key: "logisticsCompanyName",
                    label: "物流公司",
                }, {
                    key: "billreceiptTypeName",
                    label: "交易类型",
                }, {
                    key: "code",
                    label: "收款单号",
                }, {
                    key: "billreceiptTime",
                    label: "收款日期"
                }, {
                    key: "payAccountAccountName",
                    label: "付款银行账户",
                }, {
                    key: "receiptAccountAccountName",
                    label: "收款银行账户",
                }, {
                    key: "currencyName",
                    label: "币种",
                }, {
                    key: "money",
                    label: "总金额",
                }, {
                    key: "isRedflush",
                    label: "是否红冲",
                    computed: "isRedDel"
                },
                // {
                //     key: "orderTypeName",
                //     label: "订单类型",
                // },
                {
                    key: "note",
                    label: "备注"
                },
            ],
            detailRedDel: [{
                key: "financeOrgName",
                label: "财务组织"
            }, {
                key: "saleOrgName",
                label: "销售组织"
            }, {
                key: "customerName",
                label: "客户",
            }, {
                key: "code",
                label: "收款单号",
            }, {
                key: "billreceiptTime",
                label: "收款日期"
            }, {
                key: "settleMethodName",
                label: "结算方式",
            }, {
                key: "payAccountAccountName",
                label: "付款银行账户"
            }, {
                key: "receiptAccountAccountName",
                label: "收款银行账户"
            }, {
                key: "currencyName",
                label: "币种",
            }, {
                key: "note",
                label: "备注"
            }, {
                key: "isRedflush",
                label: "是否红冲",
                computed: "isRedDel"
            }, {
                key: "billreceiptState",
                label: "收款单状态",
                computed: "stateSrcDetail"
            }]
        },

    };
    return new basemodel(model);
});