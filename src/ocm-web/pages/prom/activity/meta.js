define(["ocm_basemodel"], function(basemodel) {
    "use strict";
    var model = {
        metas: {
            ProductAttrmeta: {
                params: {
                    cls: "com.yonyou.occ.prom.service.dto.ActivityDto"
                },
                meta: {
                    id: { type: "string" }, //id
                    code: { type: "string", required: false }, //编码
                    name: { type: "string", required: true }, //名称
                    state : {
                        type : "integer"
                    },
                    activeNodeId: {
                        type: "string",
                        //required: true,
                        refmodel: JSON.stringify(refinfo["activenode"]),
                        refcfg:
                            '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //销售组织ID
                    //activeNodeCode: { type: "string" }, //活动节点编码
                    //activeNodeName: { type: "string" }, //活动节点名称
                    saleOrgId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg:
                            '{"ctx":"/uitemplate_web","refName":"销售组织"}',
                        refparam: '{"EQ_isEnable":"1", "EQ_orgFuncRel": "01"}'
                    }, //销售组织ID
                    saleOrgCode: { type: "string" }, //销售组织编码
                    saleOrgName: { type: "string" }, //销售组织名称
                    startDate: { type: "date", required: true }, // 活动开始时间
                    endDate: { type: "date", required: true }, // 活动结束时间
                    activityStatusCode: { type: "string" }, // 状态编码
                    activityStatusName: { type: "string" }, // 状态名称
                    isMutual: { type: "integer" },
                    expDeliveryTar:{ type: "float" },
                    isAllCustomer: { type: "integer", required: true, default: 1 }, // 是否全部客户
                    isBuyGiftOrder: { type: "integer" },
                    isFullCutOrder: { type: "integer" },
                    isBuyGiftProduct: { type: "integer" },
                    isFullCutProduct: { type: "integer" }
                },
                pageSize: 10
            },
            ProductAttrValuemeta: {
                params: {
                    cls: "com.yonyou.occ.prom.service.dto.ActiCustRangeDto"
                },
                meta: {
                    id: { type: "string" }, //id
                    custId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["customer_sale_muliti"]),
                        refcfg: '{"ctx":"/uitemplate_web"}'
                    }, //
                    custName: { type: "string", required: true },
                    custCateId: {
                        type: "string",
                        required: true,
                     /*   refmodel: JSON.stringify(refinfo["customer_category"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1"}'*/
                        refmodel: JSON.stringify(refinfo["customer_category"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"客户分类" }',
                        refparam: '{"EQ_isEnable": "1"}'
                    }, //
                    custCateName: { type: "string", required: true },
                    channelTypeId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["channel-type"]),
                        refcfg: '{"ctx":"/uitemplate_web"}'
                    }, //
                    channelTypeName: { type: "string", required: true },
                    custLevelId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["customer-level"]),
                        refcfg: '{"ctx":"/uitemplate_web"}'
                    }, //
                    custLevelName: { type: "string", required: true },
                    // 市场区域
                    marketAreaId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["market"]),
                        refcfg: '{"ctx":"/uitemplate_web"}'
                    },
                    marketAreaCode: { type: "string"},
                    marketAreaName: { type: "string"},
                    // 合同编码
                    contractId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["contractSync"]),
                        refcfg: '{"ctx":"/uitemplate_web"}'
                    },
                    contractCode: {type: "string"},
                    contractName: { type: "string"},
                    // 是否包含
                    isExclude: { type: "integer", required: true },
                    customerStatus: { type: "integer"},
                    custOperation: { type: "string"},
                },
                pageSize: 10
            },
            ActivityRulelistmeta: {
                params: {
                    cls: "com.yonyou.occ.prom.service.dto.ActivityRulelistDto"
                },
                meta: {
                    id: { type: "string" }, //id
                    ruleId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["promotionRule"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1", "EQ_isShow": 1}'
                    }, //规则主键

                    ruleName: { type: "string", required: true }, //规则名称
                    ruleDescripe: { type: "string" }, //规则描述
                    promotionBench: { type: "integer", required: false }, //规则描述
                    isShow: { type: "integer" } // 是否显示
                },
                pageSize: 10
            },

            lowerOrgmeta: {
                meta: {
                    id: {
                        type: "string",
                        required: true
                    },
                    name: {
                        type: "string",
                        required: true
                    },
                    parentId: {
                        type: "string",
                        required: true
                    }
                }
            },

            FileMeta: {
                meta: {
                    id: { type: "string" }, //主键
                    filepath: { type: "string" }, //文件名称
                    filesize: { type: "string" }, //文件大小
                    filename: { type: "string" }, //文件名称
                    uploadtime: { type: "datetime" }, //上传时间
                    groupname: { type: "string" }, //
                    url: { type: "string" } //URL
                }
            },
            //活动执行结果
            ActivityExcuteMeta: {
                meta: {
                    id: { type: "string" }, //主键
                    activityId: { type: "string" }, //活动主键
                    ruleId: { type: "string" }, //规则主键
                    ruleName: { type: "string" }, //规则名称
                    giftId: { type: "string" }, //赠品主键
                    giftName: { type: "string" }, //赠品名称
                    matchId: { type: "string" }, //
                    matchName: { type: "string" }, //
                    num: { type: "integer" },
                    excuteNum: { type: "integer" }
                }
            }
        },
        searchs: {
            search1: [
                {
                    type: "refer",
                    key: "saleOrg",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    refName: "销售组织",
                    clientParam: {
                        EQ_isEnable: "1",
                        EQ_dr: "0",
                        EQ_orgFuncRel: "01"
                    }
                },
                {
                    type: "text",
                    key: "code",
                    label: "编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "名称"
                },{
                    type: "daterange",
                    key: "billDate",
                    label: "活动时间"
                },
                {
                    type: "radio",
                    key: "activityStatus",
                    label: "状态",
                    multi: false,
                    defaultvalue: " ",
                    dataSource: [
                        {
                            value: " ",
                            name: "全部"
                        },
                        {
                            value: "0",
                            name: "保存"
                        },
                        {
                            value: "1",
                            name: "生效"
                        },
                        {
                            value: "2",
                            name: "终止"
                        }
                    ]
                }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "refer",
                    key: "saleOrg",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    refName: "销售组织",
                    clientParam: {
                        EQ_isEnable: "1",
                        EQ_dr: "0",
                        EQ_orgFuncRel: "01"
                    }
                }
            ]
        },
        buttons: {
            button1: [
                {
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "showAddBillPanel",
                    auth: true
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del",
                    auth: true
                },
                {
                    key: "submit",
                    label: "复制",
                    iconCls: "icon-tijiao",
                    click: "showCopyBillPanel",
                    auth: true
                },
                {
                    key: "submit",
                    label: "提交",
                    iconCls: "icon-tijiao",
                    click: "submitBtn",
                    auth: true
                },
                {
                    key: "unsubmit",
                    label: "收回",
                    iconCls: "icon-unsubmit",
                    click: "unsubmitBtn",
                    auth: true
                },
                {
                    key: "approve",
                    label: "审核通过",
                    iconCls: "icon-shenhe",
                    click: "approve",
                    auth: true
                },
                {
                    key: "disapprove",
                    label: "审核不通过",
                    iconCls: "icon-shenhe",
                    click: "disapprove",
                    auth: true
                },
                {
                    key: "unapprove",
                    label: "取消审核",
                    iconCls: "icon-shenhe",
                    click: "unapprove",
                    auth: true
                },
                {
                    key: "import",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importHandle",
                    auth: true
                },
                {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle",
                    auth: true
                },
                {
                    key: "effectivefun",
                    label: "生效",
                    // iconCls: "icon-import",
                    click: "effective",
                    auth: true
                },
                {
                    key: "lssuedfun",
                    label: "下发",
                    // iconCls: "icon-export",
                    click: "lssuedActivityFun",
                    auth: true
                },
                {
                    key: "terminal",
                    label: "终止",
                    // iconCls: "icon-export",
                    click: "terminalFun",
                    auth: true
                },
                {
                    key: "viewExcute",
                    label: "查看执行结果",
                    // iconCls: "icon-export",
                    click: "viewExcuteResult",
                    auth: true
                },
                {
                    key: "change",
                    label: "变更",
                    // iconCls: "icon-export",
                    click: "changeActivity",
                    auth: true
                }
            ],
            button2: [
                {
                    key: "cancel",
                    label: "取消",
                    click: "cancelBill"
                },
                {
                    key: "save",
                    label: "保存",
                    click: "saveBill",
                    cls: "ui-btn-green"
                }
            ],
            button3: [
                {
                    key: "addrow",
                    label: "增行",
                    iconCls: "icon-plus",
                    click: "addItem"
                },
                {
                    key: "delrow",
                    label: "删行",
                    iconCls: "icon-shanchu1",
                    click: "delItems"
                }
            ],
            button33: [
                {
                    key: "addChangerow",
                    label: "增行",
                    iconCls: "icon-plus",
                    click: "addItem"
                }
            ],
            button4: [
                {
                    key: "addrow",
                    label: "增行",
                    iconCls: "icon-plus",
                    click: "addRuleItem"
                },
                {
                    key: "delrow",
                    label: "删行",
                    iconCls: "icon-shanchu1",
                    click: "delRuleItems"
                },
                {
                    key: "addRule",
                    label: "增加规则",
                    iconCls: "icon-add",
                    click: "addNewRule"
                }
            ],
            button44: [
                {
                    key: "addrow1",
                    label: "增行",
                    iconCls: "icon-plus",
                    click: "nothingDo"
                },
                {
                    key: "delrow1",
                    label: "删行",
                    iconCls: "icon-shanchu1",
                    click: "nothingDo"
                },
                {
                    key: "addRule1",
                    label: "增加规则",
                    iconCls: "icon-add",
                    click: "nothingDo"
                }
            ],
            button5: [
                {
                    key: "openUpload",
                    label: "上传",
                    iconCls: "icon-tubiao-shangchuan",
                    click: "onOpenUploadWin"
                },
                {
                    key: "fileDownload",
                    label: "下载",
                    iconCls: "icon-tubiao-xiazai",
                    click: "fileDownload"
                },
                {
                    key: "fileDelete",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "fileDelete"
                },
                {
                    key: "fileView",
                    label: "查看",
                    iconCls: "icon-tubiao-chakan",
                    click: "fileView"
                }
            ]
        },
        cards: {
            card1: [
                {
                    type: "refer",
                    key: "saleOrgId",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    refName: "销售组织",
                    clientParam: {
                        EQ_isEnable: "1",
                        EQ_dr: "0",
                        EQ_orgFuncRel: "01"
                    }
                },
                {
                    type: "text",
                    key: "code",
                    label: "活动编码",
                    enable:false
                },
                {
                    type: "text",

                    key: "name",
                    label: "活动名称",
                },

                /*{
                    type: "refer",
                    key: "activeNodeId",
                    label: "活动节点",
                    refinfo: "activenode",
                    refName: "活动节点",
                },*/
                {
                    type: "date",
                    key: "startDate",
                    label: "开始日期"
                },
                {
                    type: "date",
                    key: "endDate",
                    label: "结束日期"
                },
                {
                    type: "float",
                    key: "expDeliveryTar",
                    label: "预计提货目标"
                },
                {
                    type: "radio",
                    key: "isAllCustomer",
                    label: "是否全部客户",
                    multi: false,
                    renderType: "booleanRender",
                    domid: "isAllCustomerDomId1",
                    defaultvalue: 1,
                    default: 1,
                    dataSource: [
                        {
                            value: 0,
                            name: "否"
                        },
                        {
                            value: 1,
                            name: "是"
                        }
                    ]
                }
            ],
            card2: [
                {
                    type: "refer",
                    key: "saleOrgId",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    refName: "销售组织",
                    enable:false
                },
                {
                    type: "text",
                    key: "code",
                    label: "活动编码",
                    enable:false
                },
                {
                    type: "text",
                    key: "name",
                    label: "活动名称",
                    enable:false
                },

               /* {
                    type: "refer",
                    key: "activeNodeId",
                    label: "活动节点",
                    refinfo: "activenode",
                    refName: "活动节点",
                    enable:false
                },*/
                {
                    type: "date",
                    key: "startDate",
                    label: "开始日期"

                },
                {
                    type: "date",
                    key: "endDate",
                    label: "结束日期",

                },
                {
                    type: "label",
                    key: "state",
                    label: "审批状态",
                    defaultvalue: "0",
                    datasource: [{ name: "待处理", value: 0 },
                        { name: "已提交", value: 1 },
                        { name: "审批中", value: 2 },
                        { name: "审批通过", value: 3 },
                        { name: "审批不通过", value: 4}]
                },
                {
                    type: "float",
                    key: "expDeliveryTar",
                    label: "预计提货目标",
                    enable:false
                },
                //相同radio报错
                {
                    type: "radio",
                    key: "isAllCustomer",
                    domid: "isAllCustomerDomId2",
                    label: "是否全部客户",
                    multi: false,
                    renderType: "booleanRender",
                    dataSource: [
                        {
                            value: 0,
                            name: "否"
                        },
                        {
                            value: 1,
                            name: "是"
                        }
                    ]
                }
            ]
        },
        details: {
            detail1: [
                {
                    key: "code",
                    label: "编码"
                },
                {
                    key: "name",
                    label: "名称"
                },
                {
                    key: "saleOrgName",
                    label: "销售组织"
                },
               /* {
                    key: "activeNodeName",
                    label: "活动节点"
                },*/
                {
                    key: "startDate",
                    label: "开始日期"
                },
                {
                    key: "endDate",
                    label: "结束日期"
                },
                {
                    key: "state",
                    label: "审批状态",
                    computed: "state",
                },
                {
                    key: "expDeliveryTar",
                    label: "预计提货目标"
                },
                {
                    key: "isAllCustomer",
                    label: "是否全部客户",
                    computed: "isAllCustomerFormat"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    id: "grid_complex",
                    data: "ProAttrDocList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "saleOrgName",
                        dataType: "String",
                        title: "销售组织"
                    },
                    {
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
                        field: "startDate",
                        dataType: "date",
                        title: "活动开始时间"
                    },
                    {
                        field: "endDate",
                        dataType: "date",
                        title: "活动结束时间"
                    },
                    {
                        "field": "state",
                        "dataType": "String",
                        "title": "审批状态",
                        "renderType": "approveStateRender"
                    },
                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人"
                    },
                    {
                        field: "creationTime",
                        dataType: "Date",
                        title: "创建时间"
                    },
                    {
                        field: "activityStatusCode",
                        dataType: "radio",
                        title: "状态",
                        renderType: "statusRender"
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation",
                        fixed: true,
                        width: "150px"
                    }
                ]
            },
            grid2: {
                domid: "$",
                umeta: {
                    id: "grid_complexItem",
                    data: "ProductAttrValueList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                    onBeforeEditFun: "custRangeBeforeEdit"
                },
                columns: [
                    {
                        field: "custId",
                        dataType: "String",
                        title: "客户",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custName",
                        editOptions: {
                            validType: "string"
                            // rel: { refpk: "custId", refName: "custName" }
                        }
                    },
                    {
                        field: "custCateId",
                        dataType: "String",
                        title: "客户分类",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custCateName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "custCateId", refName: "custCateName" }
                        }
                    },
                    {
                        field: "channelTypeId",
                        dataType: "String",
                        title: "渠道类型",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "channelTypeName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "channelTypeId", refName: "channelTypeName" }
                        }
                    },
                    {
                        field: "custLevelId",
                        dataType: "String",
                        title: "客户级别",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custLevelName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "custLevelId", refName: "custLevelName" }
                        }
                    },
                    {
                        field: "marketAreaId",
                        dataType: "String",
                        title: "市场区域",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "marketAreaName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "marketAreaId", refName: "marketAreaName" }
                        }
                    },
                    {
                        field: "contractId",
                        dataType: "String",
                        title: "合同编码",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "contractName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "contractId", refName: "contractName" }
                        }
                    },
                    {
                        field: "isExclude",
                        dataType: "integer",
                        title: "是否排除",
                        renderType: "booleanRender"
                    }
                ]
            },
            grid22: {
                domid: "$",
                umeta: {
                    id: "grid_complexItem1",
                    data: "ProductAttrValueList",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "custId",
                        dataType: "String",
                        title: "客户",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "custId", refName: "custName" }
                        }
                    },
                    {
                        field: "custCateId",
                        dataType: "String",
                        title: "客户分类",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custCateName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "custCateId", refName: "custCateName" }
                        }
                    },
                    {
                        field: "channelTypeId",
                        dataType: "String",
                        title: "渠道类型",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "channelTypeName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "channelTypeId", refName: "channelTypeName" }
                        }
                    },
                    {
                        field: "custLevelId",
                        dataType: "String",
                        title: "客户级别",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custLevelName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "custLevelId", refName: "custLevelName" }
                        }
                    },
                    {
                        field: "marketAreaId",
                        dataType: "String",
                        title: "市场区域",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "marketAreaName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "marketAreaId", refName: "marketAreaName" }
                        }
                    },
                    {
                        field: "contractId",
                        dataType: "String",
                        title: "合同编码",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "contractName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "contractId", refName: "contractName" }
                        }
                    },
                    {
                        field: "isExclude",
                        dataType: "integer",
                        title: "是否排除",
                        renderType: "booleanRender"
                    }
                ]
            },
            grid222: {
                domid: "222",
                umeta: {
                    id: "grid_complexItem_222",
                    data: "ProductAttrValueList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                    onBeforeEditFun: "changeCustomerEditFun"
                },
                columns: [
                    {
                        field: "custId",
                        dataType: "String",
                        title: "客户",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "custId", refName: "custName" }
                        }
                    },
                    {
                        field: "custCateId",
                        dataType: "String",
                        title: "客户分类",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custCateName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "custCateId", refName: "custCateName" }
                        }
                    },
                    {
                        field: "channelTypeId",
                        dataType: "String",
                        title: "渠道类型",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "channelTypeName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "channelTypeId", refName: "channelTypeName" }
                        }
                    },
                    {
                        field: "custLevelId",
                        dataType: "String",
                        title: "客户级别",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "custLevelName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "custLevelId", refName: "custLevelName" }
                        }
                    },
                    {
                        field: "marketAreaId",
                        dataType: "String",
                        title: "市场区域",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "marketAreaName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "marketAreaId", refName: "marketAreaName" }
                        }
                    },
                    {
                        field: "contractId",
                        dataType: "String",
                        title: "合同编码",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "contractName",
                        editOptions: {
                            validType: "string",
                            rel: { refpk: "contractId", refName: "contractName" }
                        }
                    },
                    {
                        field: "isExclude",
                        dataType: "integer",
                        title: "是否排除",
                        renderType: "booleanRender"
                    }/*,
          {
            field: "customerStatus",
            dataType: "integer",
            title: "客户状态",
            renderType: "customerStatusRender"
          },
           {
            field: "custOperation",
            dataType: "String",
            editable: false,
            title: "操作",
            renderType: "customerChangeOp",
            fixed: true,
            width: "150px"
          }*/
                ]
            },
            grid3: {
                domid: "rule",
                umeta: {
                    id: "grid_complexRuleItem",
                    data: "ActivityRulelistList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "ruleId",
                        dataType: "String",
                        title: "规则",
                        renderType: "ncReferRender",
                        editType: "ncReferEditType",
                        showField: "ruleName",
                        editOptions: {
                            validType: "string",
                            rel: {
                                refpk: "ruleId",
                                refname: "ruleName",
                                refRuledescripe: "ruleDescripe"
                            }
                        }
                    },
                    {
                        field: "ruleDescripe",
                        dataType: "String",
                        title: "规则描述"
                    }
                ]
            },
            grid33: {
                domid: "rule",
                umeta: {
                    id: "grid_complexRuleItem1",
                    data: "ActivityRulelistList",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "ruleName",
                        dataType: "String",
                        title: "规则",
                        renderType: "ruleViewRender"
                        // "editType":"ncReferEditType",
                        // "showField":"ruleName",
                        // "editOptions":{
                        //   "validType":"string",
                        //   "rel":{"refpk":"ruleId","refName":"ruleName","refRuledescripe":"ruleDescripe","promotionBench":"promotionBench"}
                        // },
                    },
                    {
                        field: "ruleDescripe",
                        dataType: "String",
                        title: "规则描述"
                    }
                ]
            },
            grid4: {
                domid: "fileListId",
                umeta: {
                    id: "grid_file_list",
                    data: "FileList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "filename",
                        dataType: "String",
                        title: "文件名称"
                    },
                    {
                        field: "filesize",
                        dataType: "String",
                        title: "文件大小"
                    },

                    {
                        field: "uploaderName",
                        dataType: "String",
                        title: "上传人"
                    },
                    {
                        field: "uploadtime",
                        dataType: "String",
                        title: "上传时间"
                    }
                ]
            },
            grid5: {
                domid: "excute_list",
                umeta: {
                    id: "grid_excute_list",
                    data: "ActivityExcuteList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "ruleName",
                        dataType: "String",
                        title: "规则名称"
                    },
                    {
                        field: "giftName",
                        dataType: "String",
                        title: "赠品名称"
                    },

                    {
                        field: "matchName",
                        dataType: "String",
                        title: "匹配名称"
                    },
                    {
                        field: "excuteNum",
                        dataType: "String",
                        title: "执行数量"
                    },
                    {
                        field: "num",
                        dataType: "String",
                        title: "累计数量"
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});
