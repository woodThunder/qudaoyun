define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            platformBillmeta: {
                params: {
                    "cls": "com.yonyou.occ.stlb2c.service.dto.PlatformBillDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    documentNo: {
                        type: 'string',
                        required: true
                    }, //单据编号
                    documentName: {
                        type: 'string',
                        required: true
                    }, //单据名称
                    platformId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['b2cplatform']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                        refparam: '{}'                        
                    },//平台id                  
                    platformName: {
                        type: 'string'
                    },  //平台名称             
                    platformCode: {
                        type: 'string'
                    },//平台编码
                    storeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },//店铺id                  
                    storeName: {
                        type: 'string'
                    },  //店铺名称             
                    storeCode: {
                        type: 'string'
                    },//店铺编码
                    accountCompletionMark: {
                        type: 'integer', 
                        default:'0'                    
                    }, //对账完成标识
                     //单据日期
                     documentDate: {
                        type: 'date',
                    },
                     //操作时间
                     creationTime: {
                        type: 'date',
                    },
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true，
            },
            platformBillSonmeta: {
                meta: {
                    // 平台账单
                    platformBillId: {
                        type: 'string'
                    },
                    platformId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['b2cplatform']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },//平台id                  
                    platformName: {
                        type: 'string'
                    },  //平台名称             
                    platformCode: {
                        type: 'string'
                    },//平台编码
                    storeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },//店铺id                  
                    storeName: {
                        type: 'string'
                    },  //店铺名称             
                    storeCode: {
                        type: 'string'
                    },//店铺编码
                     // 账务流水号
                     accountRunningNumber: {
                        type: 'string'
                    },
                     // 业务流水号
                     businessRunningNumber: {
                        type: 'string'
                    },
                     // 商户订单号
                     merchantOrderNumber: {
                        type: 'string'
                    },
                     // 平台单号
                     platformNumber: {
                        type: 'string'
                    },
                     // 收支日期
                     revenueExpenditureTime: {
                        type: 'date'
                    },
                     // 对方账号
                     reciprocalAccount: {
                        type: 'string'
                    },
                    //收支类型id
                    revenueExpenditureTypeId:{
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['exacctType']),
                        "refcfg":'{"ctx":"/uitemplate_web"}',
                     },
                     revenueExpenditureTypeCode:{type: 'string'},
                     revenueExpenditureTypeName: {type: 'string'},
                     // 收支金额
                     revenueExpenditureMoney: {
                        type: 'float'
                    },
                     // 备注
                    remark: {
                        type: 'string',
                    },
                     // 对账标识
                     accountMark: {
                        type: 'integer',
                        default:'0' 
                    },
                     // 异常标识
                     exceptionalMark: {
                        type: 'integer',
                        default:'0' 
                    },
                    // 对账金额
                    accountMoney: {
                        type: 'float'
                    },
                    // 未对账金额
                    nonAccountMoney: {
                        type: 'float',
                        default:'0'
                    },
                     // 业务类型
                     businessType: {
                        type: 'string'
                    },
                     // 商品名称
                     goodsName: {
                        type: 'string'
                    },
                     // 勾兑时间
                     blendingTime: {
                        type: 'date'
                    },
                      // 对账人
                      checkMan: {
                        type: 'string'
                    },                  
                },
                pageSize: 10,
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
            },
            {
                key: "importPlatformBill",
                label: "导入",
                iconCls: "icon-import",
                click: "importHandle"
            }, {
                key: "exportPlatformBill",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle"
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
            },
            {
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
                clickArg: "postList",
                iconCls: "icon-plus"
            },
            {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "postList",
                iconCls: "icon-shanchu1"
            },],
        },
		
		
        //查询条件组
        searchs: {
            search1: [ {
                type: "refer",
                key: "platform",
                label: "平台名称",
                refinfo: "b2cplatform"
            },{
                type: "refer",
                key: "store",
                label: "店铺名称",
                refinfo: "b2cStoreRef"
            }, {
                type: "daterange",
                label: "收支日期",
                key: "platformBillSon--revenueExpenditureTime" 
            },
            {
                type: "combo",
                key: "platformBillSon--accountMark",
                label: "对账标识",
                dataSource:[
                    {value: '',name: '全部'},
                    {value:'0',name:"未对帐"},
                    {value:'1',name:"对账中"},
                    {value:'2',name:"已对账"},
                 ]
            },{
                type: "radio",
                key: "platformBillSon--exceptionalMark",
                label: "异常标识",
                dataSource:[
                    {value: '',name: '全部'},
                    {value:'0',name:"否"},
                    {value:'1',name:"是"},
                 ]
            },
        ],
        },
       
        cards: {
            card1: [ //新增主表
                {
                    type: "text",
                    key: "documentNo",
                    label: "单据编号",                  
                },{
                    
                    type: "text",
                    key: "documentName",
                    label: "单据名称",                  
                },{
                    type: "date",
                    key: "documentDate",
                    label: "单据日期",                  
                },{
                    type: "refer",
                    key: "platformId",
                    label: "平台名称",
                    refinfo: "b2cplatform",
                    disableFilter: true
                    
                }, {
                    type: "refer",
                    key: "storeId",
                    label: "店铺名称",
                    refinfo: "b2cStoreRef",
                    disableFilter: true
                  
                }, {
                    type: "label",
                    key: "accountCompletionMark",
                    label: "对账完成标识",
                    defaultvalue: "0",
                    datasource:[
                        {value:'0',name:"否"},
                        {value:'1',name:"是"},
                     ]
                },
            ],
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
                columns: [  {
                    field: "documentNo",
                    dataType: "String",
                    title: "单据编号",
                    renderType: "detailRender",
                },
                {
                    field: "documentName",
                    dataType: "String",
                    title: "单据名称",
                },
                {
                    field: "documentDate",
                    dataType: "Date",
                    title: "单据日期",
                },
                {
                    field: "platformName",
                    dataType: "String",
                    title: "平台名称",
                },
                {
                    field: "storeName",
                    dataType: "String",
                    title: "店铺名称",
                },
                {
                    field: "accountCompletionMark",
                    dataType: "String",
                    title: "对账完成标识",
                    "editOptions": {
                        "id": "isDefaultCA",
                        "type": "combo",
                        "datasource": "whetherSource",
                        defaultvalue: "0",
                    },
                    "editType": "combo",
                    defaultvalue: "0",
                    "renderType": "whetherRender"
                },
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
                }]
            },
            grid2: { //新增子表
                domid: "channelpost",
                umeta: {
                    id: "grid_channelpost",
                    data: "postList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                  //  "onBeforeEditFun": "beforeEditCheck"
                },
                columns: [

                    {
                        field: "platformId",
                        dataType: "String",
                        title: "平台名称   ",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
							"rel": {
								"refname": "platformName"
							}
                        },
							
                        "showField": "platformName",
                        //"required": true
                    },
                    {
                        field: "storeId",
                        dataType: "String",
                        title: "店铺名称",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
							"rel": {
								"refname": "storeName"
							}
                        },
                        "showField": "storeName",
                       // "required": true,
                    },
                    {
                        field: "accountRunningNumber",
                        dataType: "String",
                        title: "账务流水号",
                        editType:"string"
                    }, {
                        field: "businessRunningNumber",
                        dataType: "String",
                        title: " 业务流水号",
                        editType:"string"
                    }, {
                        field: "merchantOrderNumber",
                        dataType: "String",
                        title: "商户订单号",
                        editType:"string"
                    }, {
                        field: "platformNumber",
                        dataType: "String",
                        title: "平台单号",
                        editType:"string"
                    }, {
                        field: "revenueExpenditureTime",
                        dataType: "Date",
                        title: "收支日期",
                        editType:"date"
                    }, {

                        field: "reciprocalAccount",
                        dataType: "String",
                        title: "对方账号",
                        editType:"string"
                    }, {
                        field: "revenueExpenditureTypeId",
                        dataType: "String",
                        title: "收支类型",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
							"rel": {
								"refname": "revenueExpenditureTypeName"
							}
                        },
                        "showField": "revenueExpenditureTypeName",
                       // "required": true,
                    }, {
                        field: "revenueExpenditureMoney",
                        dataType: "Float",
                        title: "收支金额",
                        editType:"float"
                    }, {
                        field: "remark",
                        dataType: "String",
                        title: "备注",
                        editType:"string"
                    }, {
                        "field": "accountMark",
                        "dataType": "integer",
                        "title": "对账标识",
                       // "required": true,
                        "editOptions": {
                            "id": "isDefaultCA",
                            "type": "combo",
                            "datasource": "accountSource",
                            defaultvalue: "0",
                        },
                        editable: false,
                        "editType": "combo",
                        defaultvalue: "0",
                        "renderType": "comboRender"
                    },
                    {
                        "field": "exceptionalMark",
                        "dataType": "integer",
                        "title": "异常标识",
                        //"required": true,
                        "editOptions": {
                            "id": "isDefaultCA",
                            "type": "combo",
                            "datasource": "whetherSource",
                           defaultvalue: "0",
                        },
                        editable: false,
                       "editType": "combo",
                       defaultvalue: "0",
                        "renderType": "comboRender"
                    },
                    {
                        field: "accountMoney",
                        dataType: "Float",
                        title: "对账金额",
                        editable: false,
                        editType:"float"
                    }, {
                        field: "nonAccountMoney",
                        dataType: "Float",
                        title: "未对账金额",
                        default: "0",
                        editable: false,
                        editType:"float"
                    }, {
                        field: "businessType",
                        dataType: "String",
                        title: "业务类型",
                        editType:"string"
                    }, {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称",
                        editType:"string"
                    }, {
                        field: "blendingTime",
                        dataType: "Date",
                        title: "勾兑时间",
                        editable: false,
                        editType:"date"
                    }, {
                        field: "checkMan",
                        dataType: "String",
                        title: "对账人",
                        editable: false,
                        editType:"string"
                    }]
            },
            grid3: {  //子表详情
                domid: "channelpost",
                umeta: {
                    id: "grid_channelpost1",
                    data: "postList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "platformName",
                    dataType: "string",
                    title: "平台名称 "
                }, {
                    field: "storeName",
                    dataType: "string",
                    title: "店铺名称"
                }, {
                    field: "accountRunningNumber",
                    dataType: "string",
                    title: "账务流水号"
                }, {
                    field: "businessRunningNumber",
                    dataType: "string",
                    title: "业务流水号"
                }, {
                    field: "merchantOrderNumber",
                    dataType: "string",
                    title: "商户订单号"
                }, {
                    field: "platformNumber",
                    dataType: "string",
                    title: "平台单号"
                }, {
                    field: "revenueExpenditureTime",
                    dataType: "Date",
                    title: "收支日期"
                }, {
                    field: "reciprocalAccount",
                    dataType: "string",
                    title: "对方账号"
                }, {
                    field: "revenueExpenditureTypeName",
                    dataType: "string",
                    title: "收支类型"
                }, {
                    field: "revenueExpenditureMoney",
                    dataType: "float",
                    title: "收支金额"
                }, {
                    field: "remark",
                    dataType: "string",
                    title: "备注"
                }, {
                    field: "accountMark",
                    dataType: "string",
                    title: "对账标识",
                    "editOptions": {
                        "id": "isDefaultCA",
                        "type": "combo",
                        "datasource": "accountSource",
                        defaultvalue: "0",
                    },
                    "editType": "combo",
                    defaultvalue: "0",
                    "renderType": "comboRender"
                }, {
                    field: "exceptionalMark",
                    dataType: "string",
                    title: "异常标识",
                      //"required": true,
                      "editOptions": {
                        "id": "isDefaultCA",
                        "type": "combo",
                        "datasource": "whetherSource",
                        defaultvalue: "0",
                    },
                   "editType": "combo",
                   defaultvalue: "0",
                    "renderType": "comboRender"
                    
                }, {
                    field: "accountMoney",
                    dataType: "float",
                    title: "对账金额"
                }, {
                    field: "nonAccountMoney",
                    dataType: "float",
                    default: "0",
                    title: "未对账金额"
                }, {
                    field: "businessType",
                    dataType: "string",
                    title: "业务类型",                
                }, {
                    field: "goodsName",
                    dataType: "string",
                    title: "商品名称"
                }, {
                    field: "blendingTime",
                    dataType: "Date",
                    title: "勾兑时间"
                }, {
                    field: "checkMan",
                    dataType: "string",
                    title: "对账人"
                }]
            }
        },

        details: {
            detail1: [{  //主表详情
                key: "documentNo",
                label: "单据编号",
            },
            {
                key: "documentName",
                label: "单据名称",
            },
            {
                key: "documentDate",
                label: "单据日期",
            },
            {
                key: "platformName",
                label: "平台名称",
            },
            {
                key: "storeName",
                label: "店铺名称",
            },
            {
                key: "accountCompletionMark",
                label: "对账完成标识", 
                computed: "ifDepartureFmt" 
            }]
        }
    };
    return new basemodel(model);
});

