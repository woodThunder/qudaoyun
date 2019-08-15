define(["ocm_basemodel"], function (basemodel) {
    var model = {
        metas: {
            complex: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    // 库存组织
                    pkOrgId: {
                        type: 'string',
                        required: true,
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
                    // 单据编码
                    billCode: {
                        type: 'string'
                    },
                    // 单据日期
                    billDate: {
                        type: 'date'
                    },
                    // 单据类型
                    billType: {
                        type: 'string',
                        default: "Initializtionin"
                    },
                    //交易类型
                    billTranTypeId: {
                        type: 'string',
                        required: true,
                        default: "Initializtionin",
                        'refmodel': JSON.stringify(refinfo['trantype']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"交易类型"}',
                        'refparam': '{"EQ_billTypeId":"Initializtionin"}'
                    },
                    billTranTypeCode: {
                        type: 'string'
                    },
                    billTranTypeName: {
                        type: 'string'
                    },
                    // 仓库
                    storehouseId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['warehouse']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    storehouseCode: {
                        type: 'string'
                    },
                    storehouseName: {
                        type: 'string'
                    },
                    ifSlotManage: {
                        type: 'string'
                    },

                    // 库管员
                    storekeeperId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"库管员"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    storekeeperCode: {
                        type: 'string'
                    },
                    storekeeperName: {
                        type: 'string'
                    },
                    // 业务人员
                    bizId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['person']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"业务员"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    bizCode: {
                        type: 'string'
                    },
                    bizName: {
                        type: 'string'
                    },
                    // 部门
                    deptId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['department']),
                        'refcfg': '{"ctx":"/uitemplate_web","refName":"部门"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    deptCode: {
                        type: 'string'
                    },
                    deptName: {
                        type: 'string'
                    },
                    // 总数量
                    totalGoodsNum: {
                        type: 'string'
                    },
                    // 单据状态
                    billStatusId: {
                        type: 'string'
                    },
                    billStatusCode: {
                        type: 'string'
                    },
                    billStatusName: {
                        type: 'string'
                    },
                    // 签字人
                    approver: {
                        type: 'string'
                    },
                    // 签字时间
                    tauditTime: {
                        type: 'datetime'
                    },
                    // 备注
                    note: {
                        type: 'string'
                    },
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
            complexItem: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    // 库存期初主键
                    initializtioninId: {
                        type: 'string'
                    },
                    // 行号
                    rowNum: {
                        type: 'integer'
                    },
                    // 商品主键
                    goodsId: {
                        type: 'string'
                    },
                    // 商品编码
                    goodsCode: {
                        type: 'string'
                    },
                    // 商品名称
                    goodsName: {
                        type: 'string'
                    },
                    // 商品全称
                    goodsFullName: {
                        type: 'string'
                    },
                    goodsConversionRate: {
                        type: 'integer'
                    },
                    enableBatchNumberManage: {
                        type: 'string'
                    },
                    enableBatchNoManage:{
                        type: 'string'
                    },
                    enableInvStatusManage:{
                        type: 'string'
                    },
                    productId: {
                        type: 'string'
                    },
                    productLineId: {
                        type: 'string'
                    },
                    isOptional : {
                        type : "Integer"
                    },
                    // 货位
                    goodsPositionId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['goodsposition']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
                    },
                    goodsPositionCode: {
                        type: 'string'
                    },
                    goodsPositionName: {
                        type: 'string'
                    },
                    batchNumId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchNumber']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
                    },
                    batchNumCode: {
                        type: 'string'
                    },
                    batchNumName: {
                        type: 'string'
                    },
                    unitId: {
                        type: 'string'
                    },
                    unitCode: {
                        type: 'string'
                    },
                    unitName: {
                        type: 'string'
                    },
                    // 数量
                    goodsNum: {
                        type: 'float',
                        require: true
                    },
                    // 单价
                    unitPrice: {
                        type: 'float',
                        require: true
                    },
                    // 金额
                    amountMoney: {
                        type: 'float'
                    },
                    // 入库日期
                    storageDate: {
                        type: 'date'
                    },
                    // 行备注
                    bnote: {
                        type: 'string'
                    },
                    dr:{type:'string'},
                    //新加字段
                    goodsVersion:{
                        type: 'string',
                        required: true
                    },  //商品版本号
                  batchCodeId:{
                    type: 'string',
                    'refmodel': JSON.stringify(refinfo['batchCode']),
                    "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                  },//批号
                  batchCodeCode:{
                    type: 'string',
                  },
                  batchCodeName:{
                    type: 'string',
                  },
                    supplierId: {
                        type: 'string',
                        /*required: true,*/
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                    }, //供应商
                    supplierName: {
                        type: 'string',
                        /*required: true*/
                    }, //供应商Name
                    supplierCode: {
                        type: 'string',
                        /*required: true*/
                    }, //供应商Code
                  projectId:{
                    type:'string',
                    "refmodel": JSON.stringify(refinfo['project']),
                    "refcfg": '{"ctx":"/uitemplate_web"}',
                  }, //项目
                  projectCode: {
                    type: 'string',
                  }, //项目Name
                  projectName: {
                    type: 'string',
                  }, //项目Code
                    stockStateId:{
                        type:'string',
                        /*required: true,*/
                        "refmodel": JSON.stringify(refinfo['inventorystate']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    }, //库存状态
                    stockStateCode: {
                        type: 'string',
                        /* required: true*/
                    }, //库存状态
                    stockStateName: {
                        type: 'string',
                        /*required: true*/
                    }, //库存状态
                    customerId: {
                        type: 'string',
                        /*required: true,*/
                        "refmodel": JSON.stringify(refinfo['customers']),
                        "refcfg": '{"ctx":"/uitemplate_web"}',
                        "refparam": '{}'
                    }, //客户
                    customerCode: {
                        type: 'string'
                    }, //客户编码
                    customerName: {
                        type: 'string'
                    }, //客户名称
                    goodsSelection:{
                        type: 'string',
                        required: true
                    },  //商品选配项
                  originalGoodsId:{
                    type: 'string',
                  },  //原始版本商品
                  goodsSelectionDescription:{
                    type: 'string',
                  },//商品选项描述
                },
                pageSize: 10,
            },
            BomItem: {
              meta: {
              id: {
                type: 'string'
              }, //id
              // 库存期初主键
              initializtioninId: {
                type: 'string'
              },
              // 行号
              rowNum: {
                type: 'integer'
              },
              // 商品主键
              goodsId: {
                type: 'string'
              },
              // 商品编码
              goodsCode: {
                type: 'string'
              },
              // 商品名称
              goodsName: {
                type: 'string'
              },
              // 商品全称
              goodsFullName: {
                type: 'string'
              },
              goodsAssistUnitName: {
                type: 'string'
              },
              goodsConversionRate: {
                type: 'integer'
              },
              enableBatchNumberManage: {
                type: 'string'
              },
              enableBatchNoManage:{
                type: 'string'
              },
                  enableInvStatusManage:{
                      type: 'string'
                  },
              productId: {
                type: 'string'
              },
              productLineId: {
                type: 'string'
              },
              // 货位
              goodsPositionId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['goodsposition']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
              },
              goodsPositionCode: {
                type: 'string'
              },
              goodsPositionName: {
                type: 'string'
              },
              batchNumId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['batchNumber']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
              },
              batchNumCode: {
                type: 'string'
              },
                  batchNumName: {
                      type: 'string'
                  },
              unitId: {
                type: 'string'
              },
              unitCode: {
                type: 'string'
              },
              unitName: {
                type: 'string'
              },
              // 数量
              goodsNum: {
                type: 'float',
                require: true
              },
              // 单价
              unitPrice: {
                type: 'float',
                require: true
              },
              // 金额
              amountMoney: {
                type: 'float'
              },
              // 入库日期
              storageDate: {
                type: 'date'
              },
              // 行备注
              bnote: {
                type: 'string'
              },

              //------- 630后 新加bom包件字段 -------
              originalGoodsId:{
                type: 'string',
              },  //原始版本商品
              goodsSelectionDescription:{
                type: 'string',
              },//商品选项描述
              goodsVersion:{
                type: 'string',
                required: true
              },  //商品版本号
              goodsSelection:{
                type: 'string',
                required: true
              },  //商品选配项
                batchCodeId:{
                  type: 'string',
                  'refmodel': JSON.stringify(refinfo['batchCode']),
                  "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
                },//批号
                batchCodeCode:{
                  type: 'string',
                },
                batchCodeName:{
                  type: 'string',
                },
                supplierId: {
                    type: 'string',
                   /* required: true,*/
                    "refmodel": JSON.stringify(refinfo['suppliers']),
                    "refcfg": '{"ctx":"/uitemplate_web"}',
                }, //供应商
                supplierName: {
                    type: 'string',
                    /*required: true*/
                }, //供应商Name
                supplierCode: {
                    type: 'string',
                   /* required: true*/
                }, //供应商Code
                projectId:{
                  type:'string',
                  "refmodel": JSON.stringify(refinfo['project']),
                  "refcfg": '{"ctx":"/uitemplate_web"}',
                }, //项目
                projectCode: {
                  type: 'string',
                }, //项目Name
                projectName: {
                  type: 'string',
                }, //项目Code
                stockStateId:{
                    type:'string',
                   /* required: true,*/
                    "refmodel": JSON.stringify(refinfo['inventorystate']),
                    "refcfg": '{"ctx":"/uitemplate_web"}',
                    'refparam': '{"EQ_isEnable":"1"}'
                }, //库存状态
                stockStateName: {
                    type: 'string',
                   /* required: true*/
                }, //库存状态
                stockStateCode: {
                    type: 'string',
                    /* required: true*/
                }, //库存状态
                customerId: {
                    type: 'string',
                    /*required: true,*/
                    "refmodel": JSON.stringify(refinfo['customers']),
                    "refcfg": '{"ctx":"/uitemplate_web"}',
                    "refparam": '{}'
                }, //客户
                customerCode: {
                    type: 'string'
                }, //客户编码
                customerName: {
                    type: 'string'
                }, //客户名称
              parentGoodsId: {
                type: 'string',
                required: true
              }, //商品
              parentGoodsCode: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam': '{"EQ_isEnable":"1"}'
              }, //商品名称
              parentGoodsName: {
                type: 'string',
                required: true
              }, //商品Code
              childGoodsQty:{
                type: 'float',
              },
              parentRowNum: {
                type: 'string',
              }, //母件行号
              dr: {
                  type: 'integer'
              },
              persistStatus: {
                  type: 'string'
              },
            },
              pageSize: 10,
            },
            ItemRef: {
                meta: {
                    goodsref: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['goods']),
                        'refcfg': '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        'refparam': '{"EQ_isEnable":"1","EQ_isServiceType":"0"}'
                    }
                }
            }
        },
        searchs: {
            search1: [{
                    type: "refer",
                    key: "pkOrg",
                    label: "库存组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel":"03"
                    }
                },
                {
                    type: "daterange",
                    key: "billDate",
                    label: "单据日期",
                },
                {
                    type: "combo",
                    key: "billStatus",
                    label: "单据状态",
                    url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY106',
                    namefield: "name",
                    valuefield: "code",
                    hasAll: true,
                },
                {
                    type: "refer",
                    key: "storehouse",
                    label: "仓库",
                    refinfo: "warehouse",
                    domid:"storehouse"
                },
            ]
        },
        buttons: {
            button1: [{
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "showAddBillPanel"
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del"
                },
                {
                    key: "sign",
                    label: "签字",
                    iconCls: "icon-edit",
                    click: "sign"
                },
                {
                    key: "cancelsign",
                    label: "取消签字",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "cancelsign"
                },
                {
                    key: "import",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importHandle"
                },
                {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle"
                },
            ],
            button2: [{
                    key: "cancel",
                    label: "取消",
                    click: "retListPanel"
                },
                {
                    key: "save",
                    label: "保存",
                    click: "saveBill",
                    cls: "ui-btn-green"
                }
            ],
            button3: [{
                    key: "addrow",
                    label: "增行",
                    iconCls: "icon-plus",
                    click: "showAddItemsRef"
                },
                {
                    key: "delrow",
                    label: "删行",
                    iconCls: "icon-shanchu1",
                    click: "delItems",
                }
            ],
            button4: [{
                    key: "return",
                    label: "返回",
                    click: "retListPanel"
                },
                {
                    key: "edit",
                    label: "编辑",
                    click: "detail2bill",
                    cls: "ui-btn-green",
                    visible: "canEdit"
                }
            ],
        },
        cards: {
            card1: [{
                    type: "textreadonly",
                    key: "billCode",
                    label: "单据编码",
                },
                {
                    type: "date",
                    key: "billDate",
                    label: "单据日期",
                },
                {
                    type: "refer",
                    key: "billTranTypeId",
                    label: "交易类型",
                },
                {
                    type: "refer",
                    key: "pkOrgId",
                    label: "库存组织",
                },
                {
                    type: "refer",
                    key: "storehouseId",
                    referId: "storehouseId",
                    label: "仓库",
                },
                {
                    type: "refer",
                    key: "storekeeperId",
                    label: "库管员",
                },
                {
                    type: "refer",
                    key: "bizId",
                    label: "业务员",
                },
                {
                    type: "refer",
                    key: "deptId",
                    label: "部门",
                },
                {
                    type: "textreadonly",
                    key: "billStatusName",
                    label: "单据状态",
                },
                {
                    type: "textarea",
                    key: "note",
                    label: "备注",
                    cls: "ui-textarea-item"
                }
            ]
        },
        details: {
            detail1: [{
                    key: "billCode",
                    label: "单据编码",
                },
                {
                    key: "billDate",
                    label: "单据日期",
                    computed: "billDateComputed"
                },
                {
                    key: "billStatusName",
                    label: "单据状态",
                },
                {
                    key: "pkOrgName",
                    label: "库存组织",
                },
                {
                    key: "storehouseName",
                    label: "仓库",
                },
                {
                    key: "storekeeperName",
                    label: "库管员",
                },
                {
                    key: "bizName",
                    label: "业务员",
                },
                {
                    key: "deptName",
                    label: "部门",
                },
                {
                    key: "note",
                    label: "备注",
                    cls: "ui-textarea-item"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    "id": "grid_complex",
                    "data": "initializationList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                },
                columns: [
                  {
                        "field": "pkOrgCode",
                        "dataType": "String",
                        "title": "库存组织编码",
                        "visible": false
                    },
                    {
                        "field": "pkOrgName",
                        "dataType": "String",
                        "title": "库存组织",
                        "visible": false
                    },
                    {
                        "field": "billCode",
                        "dataType": "String",
                        "title": "单据编码",
                        "renderType": "detailRender",
                    },
                    {
                        "field": "billDate",
                        "dataType": "Date",
                        "title": "单据日期",

                    },
                    {
                        "field": "storehouseCode",
                        "dataType": "String",
                        "title": "仓库编码",
                    },
                    {
                        "field": "storehouseName",
                        "dataType": "String",
                        "title": "仓库",
                    },
                    {
                        "field": "storekeeperCode",
                        "dataType": "String",
                        "title": "库管员编码",
                    },
                    {
                        "field": "storekeeperName",
                        "dataType": "String",
                        "title": "库管员",
                    },
                    {
                        "field": "bizCode",
                        "dataType": "String",
                        "title": "业务员编码",
                    },
                    {
                        "field": "bizName",
                        "dataType": "String",
                        "title": "业务员",
                    },
                    {
                        "field": "deptCode",
                        "dataType": "String",
                        "title": "部门编码",
                    },
                    {
                        "field": "deptName",
                        "dataType": "String",
                        "title": "部门",
                    },
                    {
                        "field": "totalGoodsNum",
                        "dataType": "Float",
                        "title": "总数量",
                    },
                    {
                        "field": "billStatusName",
                        "dataType": "String",
                        "title": "单据状态",
                    },
                    {
                        "field": "approver",
                        "dataType": "String",
                        "title": "签字人",
                    },
                    {
                        "field": "tauditTime",
                        "dataType": "Datetime",
                        "title": "签字时间",
                    },
                    {
                        "field": "note",
                        "dataType": "String",
                        "title": "备注",
                    },
                    {
                        "field": "creator",
                        "dataType": "String",
                        "title": "创建人",
                        "visible": false
                    },
                    {
                        "field": "creationTime",
                        "dataType": "Date",
                        "title": "创建时间",
                        "visible": false
                    },
                    {
                        "field": "modifier",
                        "dataType": "String",
                        "title": "修改人",
                        "visible": false
                    },
                    {
                        "field": "modifiedTime",
                        "dataType": "Date",
                        "title": "修改时间",
                        "visible": false
                    },
                    {
                        "field": "billStatusCode",
                        "dataType": "String",
                        "title": "操作",
                        "renderType": "operation",
                        "fixed": true,
                        "width": "100px"
                    },
                ]
            },
            //商品信息
            grid2: {
                domid: "",
                umeta: {
                    "id": "grid_initializationItems_edit",
                    "data": "initializationItems",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": false,
                    "onBeforeEditFun": "beforeEditCheck"
                },
                columns: [{
                        "field": "rowNum",
                        "dataType": "Integer",
                        "title": "行号",
                        "editable": false
                    },
                    {
                        "field": "goodsCode",
                        "dataType": "String",
                        "title": "商品编码",
                        "editable": false,
                        "required": true
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称",
                        "editable": false,
                        "required": true
                    },
                    {
                        "field": "goodsNum",
                        "dataType": "Float",
                        "title": "数量",
                        "required": true,
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "Float",
                        "title": "单价",
                    },
                    {
                        "field": "unitName",
                        "dataType": "String",
                        "title": "单位",
                        "editable": false
                    },
                    {
                        "field": "amountMoney",
                        "dataType": "Float",
                        "title": "金额",
                        "editable": false
                    },
                    {
                        field: "goodsSelection",
                        dataType: "String",
                        title: "商品选配",
                        renderType: "goodsOpt",
                        editable: false,
                    },
                    {
                        "field": "goodsVersion",
                        "dataType": "String",
                        "title": "商品多版本",
                        "editable": false,
                        "visible": true,
                    },
                    {
                        "field": "batchCodeId",
                        "dataType": "String",
                        "title": "批号",
                        "visible": false,
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "batchCodeName",
                        "editOptions": {
                            "validType": "string"
                        }
                    },
                    {
                        "field": "supplierId",
                        "dataType": "String",
                        "title": "供应商",
                        "visible": false,
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "supplierName",
                        "editOptions": {
                            "validType": "string"
                        }
                    },
                  {
                    "field": "projectId",
                    "dataType": "String",
                    "title": "项目",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "projectName",
                    "editOptions": {
                      "validType": "string"
                    },
                    "editable": true,
                    "visible": false,
                  },
                    {
                        "field": "stockStateId",
                        "dataType": "String",
                        "title": "库存状态",
                        "visible": false,
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "stockStateName",
                        "editOptions": {
                            "validType": "string"
                        }
                    },
                    {
                        "field": "customerId",
                        "dataType": "String",
                        "title": "客户",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "customerName",
                        "editOptions": {
                            "validType": "string"
                        }
                    },
                    {
                        "field": "batchNumId",
                        "dataType": "String",
                        "title": "批次号",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "batchNumCode",
                        "editOptions": {
                            "validType": "string"
                        }
                    },
                    {
                        "field": "goodsPositionId",
                        "dataType": "String",
                        "title": "货位",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "goodsPositionName",
                        "editOptions": {
                            "validType": "string"
                        }
                    },
                    {
                        "field": "storageDate",
                        "dataType": "Date",
                        "title": "入库日期",
                        "editType": "date",
                    },
                    {
                        "field": "bnote",
                        "dataType": "String",
                        "title": "行备注",
                    }
                ]
            },
            grid3: {
                domid: "",
                umeta: {
                    "id": "grid_initializationItems_detail",
                    "data": "initializationItems",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": false
                },
                columns: [{
                        "field": "rowNum",
                        "dataType": "Integer",
                        "title": "行号",
                    },
                    {
                        "field": "goodsCode",
                        "dataType": "String",
                        "title": "商品编码",
                    },
                    {
                        "field": "goodsName",
                        "dataType": "String",
                        "title": "商品名称",
                    },
                    // {
                    //     "field": "goodsFullName",
                    //     "dataType": "String",
                    //     "title": "商品全称",
                    // },
                    {
                        "field": "goodsNum",
                        "dataType": "Float",
                        "title": "数量",
                    },
                    {
                        "field": "unitPrice",
                        "dataType": "Float",
                        "title": "单价",
                    },
                    {
                        "field": "unitCode",
                        "dataType": "String",
                        "title": "单位编码",
                        "visible": false
                    },
                    {
                        "field": "unitName",
                        "dataType": "String",
                        "title": "单位",
                    },
                    {
                        "field": "amountMoney",
                        "dataType": "Float",
                        "title": "金额",
                    },
                  {
                    field: "goodsSelection",
                    dataType: "String",
                    title: "商品选配",
                    renderType: "goodsOptDetails",
                    editable: false,
                  },
                    {
                        "field": "goodsVersion",
                        "dataType": "String",
                        "title": "商品多版本",
                        "editable": false,
                        "visible": true,
                    },
                    {
                        "field": "batchCodeName",
                        "dataType": "String",
                        "title": "批号",
                        "editable": false,
                        "visible": false,
                    },
                    {
                        "field": "supplierName",
                        "dataType": "String",
                        "title": "供应商",
                        "visible": false,
                    },
                    {
                        "field": "projectName",
                        "dataType": "String",
                        "title": "项目",
                        "editable": false,
                        "visible": false,
                    },
                    {
                        "field": "stockStateName",
                        "dataType": "String",
                        "title": "库存状态",
                        "editable": false,
                        "visible": false,
                    },
                    {
                        "field": "customerName",
                        "dataType": "String",
                        "title": "客户",
                        "editable": false,
                        "visible": false,
                    },
                    {
                        "field": "goodsPositionName",
                        "dataType": "String",
                        "title": "货位",
                    },
                    {
                        "field": "batchNumCode",
                        "dataType": "String",
                        "title": "批次号",
                    },
                    {
                        "field": "storageDate",
                        "dataType": "Date",
                        "title": "入库日期",
                    },
                    {
                        "field": "bnote",
                        "dataType": "String",
                        "title": "行备注",
                    }
                ]
            },

            //bom结构信息
            grid4: {
            domid: "",
            umeta: {
              "id": "grid_BomItems_edit",
              "data": "BomItems",
              "type": "grid",
              "editable": true,
              "multiSelect": true,
              "showNumCol": false,
            },
            columns: [{
              "field": "rowNum",
              "dataType": "Integer",
              "title": "行号",
              "editable": false
            },
                {
                    field: "parentRowNum",
                    title: "所属商品行号",
                    dataType: "Integer",
                    editable: false
                },
              {
                "field": "parentGoodsName",
                "dataType": "String",
                "title": "母件商品名称",
                "editable": false
              },
              {
                "field": "goodsCode",
                "dataType": "String",
                "title": "商品编码",
                "editable": false,
                "required": true
              },
              {
                "field": "goodsName",
                "dataType": "String",
                "title": "商品名称",
                "editable": false,
                "required": true
              },
              {
                "field": "goodsNum",
                "dataType": "Float",
                "title": "数量",
                "required": true,
                "editable": false,
              },
              {
                "field": "unitPrice",
                "dataType": "Float",
                "title": "单价",
              },
              {
                "field": "unitName",
                "dataType": "String",
                "title": "单位",
                "editable": false
              },
              {
                "field": "amountMoney",
                "dataType": "Float",
                "title": "金额",
                "editable": false
              },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    "field": "batchCodeId",
                    "dataType": "String",
                    "title": "批号",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "batchCodeName",
                    "editOptions": {
                        "validType": "string"
                    },
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "supplierId",
                    "dataType": "String",
                    "title": "供应商",
                    "visible": false,
                    "editable": false,
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "supplierName",
                    "editOptions": {
                        "validType": "string"
                    }
                },
              {
                "field": "projectId",
                "dataType": "String",
                "title": "项目",
                "renderType": "ncReferRender",
                "editType": "ncReferEditType",
                "showField": "projectName",
                "editOptions": {
                  "validType": "string"
                },
                "editable": false,
                "visible": false,
              },
                {
                    "field": "stockStateId",
                    "dataType": "String",
                    "title": "库存状态",
                    "visible": false,
                    "editable": false,
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "stockStateName",
                    "editOptions": {
                        "validType": "string"
                    }
                },
                {
                    "field": "customerId",
                    "dataType": "String",
                    "title": "收货客户",
                    "editable": false,
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "showField": "customerName",
                    "editOptions": {
                        "validType": "string"
                    }
                },
              {
                "field": "bnote",
                "dataType": "String",
                "title": "行备注",
                  "editable": false,
              }
            ]
          },
            grid5: {
            domid: "",
            umeta: {
              "id": "grid_BomItems_detail",
              "data": "BomItems",
              "type": "grid",
              "editable": false,
              "multiSelect": true,
              "showNumCol": false
            },
            columns: [{
              "field": "rowNum",
              "dataType": "Integer",
              "title": "行号",
            },
                {
                    field: "parentRowNum",
                    title: "所属商品行号",
                    dataType: "Integer",
                    editable: false
                },
              {
                "field": "parentGoodsName",
                "dataType": "String",
                "title": "母件商品名称",
                "editable": false
              },
              {
                "field": "goodsCode",
                "dataType": "String",
                "title": "商品编码",
              },
              {
                "field": "goodsName",
                "dataType": "String",
                "title": "商品名称",
              },
              {
                "field": "goodsNum",
                "dataType": "Float",
                "title": "数量",
              },
              {
                "field": "unitPrice",
                "dataType": "Float",
                "title": "单价",
              },
              {
                "field": "unitName",
                "dataType": "string",
                "title": "单位",
              },
              {
                "field": "amountMoney",
                "dataType": "Float",
                "title": "金额",
              },
                {
                    "field": "goodsVersion",
                    "dataType": "String",
                    "title": "商品多版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    "field": "batchCodeId",
                    "dataType": "String",
                    "title": "批号",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "supplierName",
                    "dataType": "String",
                    "title": "供应商",
                    "visible": false,
                },
                {
                    "field": "projectName",
                    "dataType": "String",
                    "title": "项目",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "stockStateName",
                    "dataType": "String",
                    "title": "库存状态",
                    "editable": false,
                    "visible": false,
                },
                {
                    "field": "customerName",
                    "dataType": "String",
                    "title": "客户",
                    "editable": false,
                    "visible": false,
                },
              {
                "field": "bnote",
                "dataType": "String",
                "title": "行备注",
              }
            ]
          }

        }
    }
    return new basemodel(model);
})