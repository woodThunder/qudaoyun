define(["ocm_basemodel"], function(basemodel) {
    var model = {
        metas: {
            deductMoneyField: {
                params: {
                    cls: "com.yonyou.occ.contract.dto.DeductMoneyDto"
                },
                meta: {
                    contractCode: {
                        type: 'string'
                    },
                    contractId:{ //
                        type:'string',
                        required: true,
                        refmodel: JSON.stringify(refinfo['contractSync']),
                        clientParam: {
                            "EQ_status": "1",
                        }
                    },
                    srcBillCode:{
                      type:"string"
                    },
                    contractName: {
                        type: 'string'
                    },
                    // 合同编码
                    billCode: {
                        // required: true,
                        type: 'string'
                    },
                    // 单据号
                    saleOrgId: {
                        type:'string',
                        required: true,
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        //     refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
                        //     refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
                    },
                    //销售组织id
                    saleOrgCode: {
                        type: 'string',
                        required:true
                    },
                    //销售组织编码
                    saleOrgName: {
                        type: 'string',
                        required: true,
                    },
                    //销售组织名称
                    financeOrgId:{
                        type:'string',
                        required: true,
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        // clientParam: {
                        //     "EQ_isEnable": "1",
                        //     "EQ_orgFuncRel": "07",
                        //     "AUTH_refdim": "account.financeOrg"
                        // }
                    },
                    //财务组织"
                    financeOrgCode:{
                        type:'string'
                    },
                    //财务组织编码
                    financeOrgName:{
                        type:'string',
                        required: true,
                    },
                    // 财务组织名称
                    projectId:{
                        type:'string',
                        required: true,
                        refmodel: JSON.stringify(refinfo["project"]),
                    },
                    //项目Id"
                    projectCode:{
                        type:'string'
                    },
                    //项目编码
                    projectName:{
                        type:'string',

                    },
                    // 项目名称
                    customerId:{
                        type:'string',
                        required: true,
                        refmodel: JSON.stringify(refinfo["customer"]),
                    },
                    //客户id
                    customerCode:{
                        type:'string'
                    },
                    //客户编码
                    customerName:{
                        type:'string',
                        required: true,
                    },
                    // 客户名称
                    currencyId:{   //币种
                        type: 'string',
                        refmodel: JSON.stringify(refinfo['currency']),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                    },
                    currencyCode:{
                      type:'string'
                    },// 币种
                   currencyName:{
                      type:'string'
                    },// 币种
                    money:{
                        type:'amountFloat'
                    },
                    remark: {
                        required: true,
                        type: 'string'
                    },
                    // 备注
                    srcBillType: {
                        required: true,
                        type: 'string'
                    },
                    // 来源单据类型

                    srcTransactionType: {
                        required: true,
                        type: 'string'
                    },
                    // 来源交易类型
                    srcBillId: {
                        required: true,
                        type: 'string'
                    },
                    // 来源单据ID

                    state:{
                        required: true,
                        type: 'string'
                    },
                    //审批状态
                    ext1:{
                        type: 'string'
                    },
                    // 扩展字段1
                    ext2:{
                        type: 'string'
                    },
                    // 扩展字段2
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
            deductMoneyFieldChilditem: {
                params: {
                    cls: "com.yonyou.occ.contract.dto.DeductDetailDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    },
                    //表体Dto
                    deductId:{    //扣款单ID
                        type: 'string'
                    }, name:{   //名称
                        type: 'string'
                    },currencyId:{   //币种
                        type: 'string',
                        refmodel: JSON.stringify(refinfo['currency']),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        clientParam: {
                            "EQ_status": "1"
                        },
                        required:true
                    },currencyCode:{    //
                        type: 'string'
                    },currencyName:{    //
                        type: 'string'
                    },money:{    //金额
                        type: "amountFloat"
                    },remark:{    //
                        type: 'string'
                    }
                },
                pageSize: 10
            }
        },
        searchs: {
            search1: [ {
                type: "refer",
                key: "contract--id",
                disableFilter:true,
                require:true,
                label: "合同",
                refinfo: "contractSync",
                clientParam: {
                    "EQ_status": "1"
                }
            },
            // {
            //     type: "type",
            //     require:true,
            //     key: "billCode",
            //     label: "单据号"
            // },
            // {
            //     type: "refer",
            //     key: "saleOrgId",
            //     require:true,
            //     label: "销售组织",
            //     refinfo: "organization_ocm",
            //     refinfo: "organization_ocm",
            //     clientParam: {
            //         "EQ_orgFuncRel": "01"
            //     }
            // },
            // {
            //     type: "refer",
            //     key: "financeOrgId",
            //     label: "结算财务组织",
            //     refinfo: "organization_ocm",  //参照结算组织档案
            //     clientParam: {
            //         "EQ_isEnable": "1",
            //         "EQ_orgFuncRel": "07",
            //         "AUTH_refdim": "account.financeOrg"
            //     }
            // },
            // {
            //     type: "refer",
            //     key: "projectId",
            //     label: "项目名称",
            //     refinfo: "project",  //项目档案
            //     // clientParam: {
            //     //     "EQ_orgFuncRel": "04"
            //     // },
            // },
            // {
            //     type: "refer",
            //     key: "customerId",
            //     label: "客户",
            //     refinfo: "customer",
            //     refName: "客户",
            //     clientParam: {
            //         EQ_isEnable: "1",
            //         EQ_isChannelCustomer: "1",
            //         AUTH_refcod: "saleorder",
            //         AUTH_refdim: "customer"
            //     }
            // },
            // {
            //     type: "combo",
            //     key: "srcBillType",
            //     label: "来源单据类型",
            //     dataSource: [{
            //         value: '1',
            //         name: '数量及单价'
            //     }, {
            //         value: '2',
            //         name: '仅单价'
            //     }],
            //     hasAll: false,
            // },
            // {
            //     type: "combo",
            //     key: "srcTransactionType",
            //     label: "来源交易类型",
            //     dataSource: [{
            //         value: '1',
            //         name: '数量及单价'
            //     }, {
            //         value: '2',
            //         name: '仅单价'
            //     }],
            //     // hasAll: false,
            // },
            // {
            //     type: "type",
            //     require:true,
            //     key: "srcBillId",
            //     label: "来源单据主键"
            // },
            // {
            //     type: "type",
            //     require:true,
            //     key: "billStatus",
            //     label: "单据状态"
            // },
            // {
            //     type: "combo",
            //     key: "billStatus",
            //     label: "单据状态",
            //     default:"0",
            //     dataSource: [{
            //         value: '0',
            //         name: '停用'
            //     }, {
            //         value: '1',
            //         name: '启用'
            //     }],
            //     // hasAll: false,
            // },
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
                // {
                //     key: "enable",
                //     label: "启用",
                //     iconCls: "icon-qiyong",
                //     click: "enable"
                // },
                // {
                //     key: "disable",
                //     label: "停用",
                //     iconCls: "icon-tingyong",
                //     click: "disable"
                // }
                // {
                //     key: "back",
                //     label: "收回",
                //     iconCls: "icon-tubiao-shenhe",
                //     click: "backBtn"
                // },
                {
                    key: "submit",
                    label: "提交",
                    iconCls: "icon-tubiao-shenhe",
                    click: "submitBtn"
                }, {
                    key: "back",
                    label: "收回",
                    iconCls: "icon-tubiao-shenhe",
                    click: "unsubmit"
                },
                {
                    key: "approve",
                    label: "审批通过",
                    iconCls: "icon-tubiao-shenhe",
                    click: "approve"
                }, {
                    key: "approve",
                    label: "审批不通过",
                    iconCls: "icon-tubiao-shenhe",
                    click: "disapprove"
                }, {
                    key: "unapprove",
                    label: "取消审核",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "cancelApprove"
                },
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
                    type: "refer",
                    key: "contractId",
                    disableFilter:true,
                    require:true,
                    label: "合同",
                    refinfo: "contractSync",
                },
                {
                    type: "type",
                    enable:false,
                    key: "billCode",
                    label: "单据号"
                },
                {
                    type: "type",
                    require:true,
                    enable: false,
                    key: "saleOrgName",
                    label: "销售组织"
                },
                {
                    type: "type",
                    require:true,
                    key: "financeOrgName",
                    enable: false,
                    label: "结算财务组织"
                },
                {
                    type: "type",
                    require:true,
                    key: "projectName",
                    enable: false,
                    label: "项目名称"
                },
                {
                    type: "type",
                    require:true,
                    enable: false,
                    key: "customerName",
                    label: "客户"
                },
                {
                    type: "text",
                    key: "money",
                    enable: false,
                    label: "扣款金额"
                }
                // {
                //     type: "refer",
                //     key: "saleOrgId",
                //     require:true,
                //     label: "销售组织",
                //     editable: false,
                //     // multi: true,
                //     refinfo: "organization_ocm",
                //     clientParam: {
                //         "EQ_orgFuncRel": "01"
                //     }
                // },
                // {
                //     type: "refer",
                //     key: "financeOrgId",
                //     label: "结算财务组织",
                //     // enable: false,
                //     refinfo: "organization_ocm",  //参照结算组织档案
                //     clientParam: {
                //         "EQ_isEnable": "1",
                //         "EQ_orgFuncRel": "07",
                //         "AUTH_refdim": "account.financeOrg"
                //     }
                // },
                // {
                //     type: "refer",
                //     key: "projectId",
                //     label: "项目名称",
                //     refinfo: "project",  //项目档案
                //     // clientParam: {
                //     //     "EQ_orgFuncRel": "04"
                //     // },
                // },
                // {
                //     type: "refer",
                //     key: "customerId",
                //     label: "客户",
                //     refinfo: "customer",
                //     refName: "客户",
                // },
                // {
                //     type: "refer",
                //     key: "currencyId",
                //     label: "币种",
                //     refinfo: "currency",
                //     clientParam: {
                //         "EQ_isEnable":"1",
                //     }
                // },

            ]
        },
        details: {
            detail1: [{key: "contractName",label: "合同名称"},
                {
                    key: "billCode",
                    label: "单据号"
                },
                {
                    key: "saleOrgName",
                    label: "销售组织"
                },
                {
                    key: "financeOrgName",
                    label: "财务组织"
                }, {
                    key: "financeOrgName",
                    label: "项目名称"
                }, {
                    key: "customerName",
                    label: "客户"
                },
                // {
                //     key: "currencyName",
                //     label: "币种"
                // },
                {
                    key: "money",
                    label: "扣款金额"
                },
                {
                    key: "remark",
                    label: "备注"
                },{
                    key: "srcBillTypeName",
                    label: "来源单据类型",
                    //     computed: "stateComputed"
                },{
                    key: "srcTransactionTypeName",
                    label: "来源交易类型",
                    // computed: "stateComputed"
                },
                // {
                //     key: "srcBillId",
                //     label: "来源单据ID"
                // },
                {
                    key: "state",
                    label: "状态",
                    computed: "stateComputed"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "grid_deduct_dom",
                umeta: {
                    "id": "grid_deduct",
                    "data": "deductList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    field: "contractCode",
                    dataType: "String",
                    title: "合同",
                    renderType: "detailRender",
                    width: "200px"
                }, {
                    field: "billCode",
                    dataType: "String",
                    title: "单据号",
                    renderType: "detailRender",
                }, {
                    field: "saleOrgName",
                    dataType: "String",
                    title: "销售组织"
                },
                {
                    field: "financeOrgName",
                    dataType: "String",
                    title: "财务组织",
                },
                {
                    field: "projectName",
                    dataType: "String",
                    title: "项目",
                },{
                    field: "customerName",
                    dataType: "String",
                    title: "客户",
                },
                //     {
                //     field: "srcBillId",
                //     dataType: "String",
                //     title: "来源单据ID",
                // },
                {
                    field: "srcBillTypeName",
                    dataType: "String",
                    title: "来源单据类型",
                    // renderType: "enableStatusRender"
                },
                {
                    field: "srcTransactionTypeName",
                    dataType: "String",
                    title: "来源交易类型",
                    // renderType: "enableStatusRender"
                },
                {
                    field: "state",
                    dataType: "String",
                    title: "单据状态",
                    renderType: "stateRender"
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
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
                domid: "grid_rebate_deductItem_dom",
                umeta: {
                    "id": "grid_rebate_deductItem",
                    "data": "deductItems",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        field: "name",
                        dataType: "String",
                        title: "名目"
                    },
                    {
                        "dataType": "String",
                        "field": "currencyId",
                        "title": "币种",
                        "required":true,
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "currencyName",
                        "clientParam": {
                            "EQ_isEnable":"1",
                        },
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "refpk": "currencyId",
                                "refname": "currencyName"
                            }
                        },
                    },
                    {
                        field: "money",
                        dataType: "String",
                        title: "金额",
                        required:true
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注"
                    }

                ]
            },
            grid3: {
                domid: "grid_rebate_deductDetailItem_dom",
                umeta: {
                    "id": "grid_rebate_deductDetailItem",
                    "data": "deductItems",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        field: "name",
                        dataType: "String",
                        title: "名目"
                    },{
                        field: "currencyName",
                        dataType: "String",
                        title: "币种",
                        required:true
                    },{
                        field: "money",
                        dataType: "String",
                        title: "金额",
                        required:true
                    },{
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