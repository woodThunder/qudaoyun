define(["ocm_basemodel"], function (basemodel) {
    var complexItem ={
        id: {
            type: "string"
        },
        dr:{
          type:"string"
        },
        // 行号
        rowNum: {
            type: "string"
        },
        // 商品id
        goodsId: {
            type: "string"
        },
        goodsCode: {
            type: "string"
        },
        goodsName: {
            type: "string"
        },
        productId: {
            type: 'string'
        },
        productLineId: {
            type: 'string'
        },
        goodsSpecification: {
            type: "string"
        },
        goodsModel: {
            type: "string"
        },
        //批次号管理
        enableBatchNumberManage: {
            type: 'integer'
        },
        enableBatchNoManage:{
            type: 'string'
        },
        //库存状态管理
        enableInvStatusManage:{
            type:'integer'
        },
        isOptional : {
            type : "Integer"
        },
        //商品版本号
        goodsVersion: {
            type: 'string'
        },
        //单位
        unitId: {
            type: 'string'
        },
        unitCode: {
            type: 'string'
        },
        unitName: {
            type: 'string'
        },
        // 批号
        batchCodeId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.batchCode),
            refcfg: '{"ctx":"/uitemplate_web","refName":"批号"}'
        },
        batchCodeCode: {
            type: "string"
        },
        batchCodeName:{
            type: "string"
        },
        // 批次号
        batchNumId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.batchNumber),
            refcfg: '{"ctx":"/uitemplate_web","refName":"批次号"}'
        },
        batchNumCode: {
            type: "string"
        },
        batchNumName: {
            type: "string"
        },
        // 库存状态
        inventoryStateId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.inventorystate),
            refcfg: '{"ctx":"/uitemplate_web","refName":"库存状态"}'
        },
        inventoryStateCode: {
            type: "string"
        },
        inventoryStateName: {
            type: "string"
        },
        //数量
        adjustNum: {
            type: 'integer',
            min: 0
        },
        adjustTime:{
            type:"date",
        },
        // 转入货位
        goodsPositionInId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.goodsposition),
            refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
        },
        goodsPositionInCode: {
            type: "string"
        },
        goodsPositionInName: {
            type: "string"
        },
        // 转出货位
        goodsPositionOutId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.goodsposition),
            refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
        },
        goodsPositionOutCode: {
            type: "string"
        },
        goodsPositionOutName: {
            type: "string"
        },
      projectId:{
        type:'string',
        "refmodel": JSON.stringify(refinfo['project']),
          refcfg: '{"ctx":"/uitemplate_web"}'
      }, //项目
      projectCode: {
        type: 'string',
      }, //项目Name
      projectName: {
        type: 'string',
      }, //项目Code
        // 供应商
        supplierId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.suppliers),
            refcfg: '{"ctx":"/uitemplate_web","refName":"供应商"}'
        },
        supplierCode: {
            type: "string"
        },
        supplierName: {
            type: "string"
        },
        // 客户
        customerId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.customer),
            refcfg: '{"ctx":"/uitemplate_web","refName":"客户"}'
        },
        customerCode: {
            type: "string"
        },
        customerName: {
            type: "string"
        },
      originalGoodsId:{
        type: 'string',
      },  //原始版本商品
        goodsSelection:{
            type: 'string',
            required: true
        },  //商品选配项
      goodsSelectionDescription:{
        type: 'string',
      },//商品选项描述
    };
    var model = {
        metas: {
            complexItem: {
                meta: complexItem,
                pageSize: 10
            },
            BomItem:{
              meta: {
                id: {
                  type: "string"
                },
                // 行号
                rowNum: {
                  type: "string"
                },
                // 商品id
                goodsId: {
                  type: "string"
                },
                goodsCode: {
                  type: "string"
                },
                goodsName: {
                  type: "string"
                },
                goodsSpecification: {
                  type: "string"
                },
                goodsModel: {
                  type: "string"
                },
                //批次号管理
                enableBatchNumberManage: {
                  type: 'integer'
                },
                enableBatchNoManage:{
                  type: 'string'
                },
                //库存状态管理
                enableInvStatusManage:{
                  type:'integer'
                },
                //商品版本号
                goodsVersion: {
                  type: 'string'
                },
                //单位
                unitId: {
                  type: 'string'
                },
                unitCode: {
                  type: 'string'
                },
                unitName: {
                  type: 'string'
                },
                // 批号
                batchCodeId: {
                  type: "string",
                  refmodel: JSON.stringify(refinfo.batchCode),
                  refcfg: '{"ctx":"/uitemplate_web","refName":"批号"}'
                },
                batchCodeCode: {
                  type: "string"
                },
                batchCodeName:{
                  type: "string"
                },
                // 批次号
                batchNumId: {
                  type: "string",
                  refmodel: JSON.stringify(refinfo.batchNumber),
                  refcfg: '{"ctx":"/uitemplate_web","refName":"批次号"}'
                },
                batchNumCode: {
                  type: "string"
                },
                batchNumName: {
                  type: "string"
                },
                // 库存状态
                inventoryStateId: {
                  type: "string",
                  refmodel: JSON.stringify(refinfo.inventorystate),
                  refcfg: '{"ctx":"/uitemplate_web","refName":"库存状态"}'
                },
                inventoryStateCode: {
                  type: "string"
                },
                inventoryStateName: {
                  type: "string"
                },
                //数量
                adjustNum: {
                  type: 'integer',
                  min: 0
                },
                adjustTime:{
                  type:"date",
                },
                // 转入货位
                goodsPositionInId: {
                  type: "string",
                  refmodel: JSON.stringify(refinfo.goodsposition),
                  refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                },
                goodsPositionInCode: {
                  type: "string"
                },
                goodsPositionInName: {
                  type: "string"
                },
                // 转出货位
                goodsPositionOutId: {
                  type: "string",
                  refmodel: JSON.stringify(refinfo.goodsposition),
                  refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
                },
                goodsPositionOutCode: {
                  type: "string"
                },
                goodsPositionOutName: {
                  type: "string"
                },
                projectId:{
                  type:'string',
                  "refmodel": JSON.stringify(refinfo['project']),
                    refcfg: '{"ctx":"/uitemplate_web"}'
                }, //项目
                projectCode: {
                  type: 'string',
                }, //项目Name
                projectName: {
                  type: 'string',
                }, //项目Code
                // 供应商
                supplierId: {
                  type: "string",
                  refmodel: JSON.stringify(refinfo.suppliers),
                  refcfg: '{"ctx":"/uitemplate_web","refName":"供应商"}'
                },
                supplierCode: {
                  type: "string"
                },
                supplierName: {
                  type: "string"
                },
                // 客户
                customerId: {
                  type: "string",
                  refmodel: JSON.stringify(refinfo.customer),
                  refcfg: '{"ctx":"/uitemplate_web","refName":"客户"}'
                },
                customerCode: {
                  type: "string"
                },
                customerName: {
                  type: "string"
                },
                //------- 630后 新加bom包件字段 -------

                goodsVersion:{
                  type: 'string',
                  required: true
                },  //商品版本号
                goodsSelection:{
                  type: 'string',
                  required: true
                },  //商品选配项
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

                parentRowNum: {
                  type: 'string',
                }, //母件行号
                childGoodsQty:{
                  type: 'float',
                },
                originalGoodsId:{
                  type: 'string',
                },  //原始版本商品
                goodsSelectionDescription:{
                  type: 'string',
                },//商品选项描述
              },
            },
            complex: {
                meta: {
                    id: {
                        type: "string"
                    },
                    //审批状态
                    state: { type: "integer" },
                    // 库存组织
                    pkOrgId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.organization_ocm),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },
                    pkOrgCode: {
                        type: "string"
                    },
                    pkOrgName: {
                        type: "string"
                    },
                    // 单据号
                    billCode: {
                        type: "string",
                    },
                    // 单据日期
                    billDate: {
                        type: "string",
                        required: true
                    },
                    // 仓库
                    storageId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo.warehouse),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    storageCode: {
                        type: "string"
                    },
                    storageName: {
                        type: "string"
                    },
                    ifSlotManage:{
                        type:"integer"
                    },
                    //库管员
                    personId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.person),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"库管员"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    personCode: {
                        type: "string"
                    },
                    personName: {
                        type: "string"
                    },
                    // 备注
                    note: {
                        type: "string",
                        maxLength: 200
                    },
                    //子表
                    positionTransferItems: { 
                        type: 'child', 
                        meta: complexItem 
                    },
                    slotManage:{
                        type : "string"
                    }
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true
            },
            ItemRef: {
                meta: {
                    goodsref: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo.goods),
                        refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        refparam: '{"EQ_isEnable":"1","EQ_isServiceType":"0"}'
                    }
                }
            },
        },
        searchs: {
            search1: [
                {
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
                    label: "单据日期"
                },
                {
                    type: "refer",
                    key: "storage",
                    label: "仓库",
                    refinfo: "warehouse",
                    domid: "storage"
                },
                {
                    type: "text",
                    key: "billCode",
                    label: "单据号"
                },
                {
                    type: "refer",
                    key: "person",
                    label: "库管员",
                    refinfo: "person"
                },
                {
                    type: "refer",
                    key: "positionTransferItems--supplier",
                    label: "供应商",
                    refinfo: "suppliers"
                },
                {
                    type: "text",
                    key: "creator",
                    label: "制单人"
                },
                {
                    type: "refer",
                    key: "positionTransferItems--goods",
                    label: "库存商品",
                    refinfo: "goods"
                },
                {
                    type: "refer",
                    key: "positionTransferItems--batchNum--id",
                    label: "批次号",
                    refinfo: "batchNumber"
                },
                {
                    type: "refer",
                    key: "positionTransferItems--stockState--id",
                    label: "库存状态",
                    refinfo: "inventorystate",
                    clientParam: {
                        EQ_isEnable: "1"
                    }
                },
                {
                    type: "refer",
                    key: "positionTransferItems--project",
                    label: "项目",
                    refinfo:"project"
                },
                {
                    type: "daterange",
                    key: "positionTransferItems--adjustTime",
                    label: "调整日期"
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
                    key: "submit",
                    label: "提交",
                    iconCls: "icon-tubiao-tijiao",
                    click: "submitBtn"
                },
                {
                    key: "unsubmit",
                    label: "收回",
                    iconCls: "icon-tubiao-shouhui",
                    click: "unsubmitBtn"
                },
            {
                key: "approve",
                label: "审批通过",
                iconCls: "icon-tubiao-shenhe",
                click: "approve"
            },
                {
                    key: "approve",
                    label: "审批不通过",
                    iconCls: "icon-tubiao-shenhe",
                    click: "disapprove"
                },
            {
                key: "cancelApprove",
                label: "取消审批",
                iconCls: "icon-tubiao-quxiaoshenhe",
                click: "cancelApprove"
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
            },
            {
                key: "saveAndApprove",
                label: "保存并审批",
                click: "saveApproveBill",
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
                click: "delItems"
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
                label: "单据号"
            },
            {
                type: "date",
                key: "billDate",
                label: "单据日期"
            },
            {
                type: "refer",
                key: "pkOrgId",
                label: "库存组织"
            },
            {
                type: "refer",
                key: "storageId",
                referId: "storageId",
                "rel" : {"ifSlotManage" : "slotManage"},
                label: "仓库"
            },
            {
                type: "refer",
                key: "personId",
                label: "库管员"
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
                type: "textarea",
                key: "note",
                label: "备注",
                cls: "ui-textarea-item"
            }
            ],
            
        },
        grids: {
            grid1: {
                domid: "grid_complex_dom",
                umeta: {
                    id: "grid_complex",
                    data: "transferList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "billCode",
                    dataType: "String",
                    title: "单据号",
                    renderType: "detailRender"
                },
                {
                    field: "billDate",
                    dataType: "Date",
                    title: "单据日期"
                },
                {
                    field: "storageName",
                    dataType: "String",
                    title: "仓库"
                },
                {
                    field: "pkOrgName",
                    dataType: "String",
                    title: "库存组织"
                },
                {
                    field: "personName",
                    dataType: "String",
                    title: "库管员"
                },
                {
                    field: "state",
                    dataType: "Integer",
                    title: "审批状态",
                    renderType:"stateRender"
                },
                {
                    field: "note",
                    dataType: "String",
                    title: "备注"
                },
                {
                    field: "creator",
                    dataType: "String",
                    title: "创建人",
                    visible: false
                },
                {
                    field: "creationTime",
                    dataType: "Date",
                    title: "创建时间",
                    visible: false
                },
                {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人",
                    visible: false
                },
                {
                    field: "modifiedTime",
                    dataType: "Date",
                    title: "修改时间",
                    visible: false
                },
                {
                    field: "transferStatusCode",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation",
                    fixed: true,
                    width: "100px"
                }
                ]
            },

            gridEditGood: {
                domid: "grid_transferItems_goodEdit",
                umeta: {
                    id: "grid_transferItems_goodEdit",
                    data: "transferItems",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: false,
                    "onBeforeEditFun": "beforeEditCheck"
                },
                columns: [{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号",
                    editable: false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码",
                    editable: false
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false
                },
                {
                    field: "goodsVersion",
                    dataType: "String",
                    title: "商品版本",
                    editable: true
                },
                {
                    field: "goodsSpecification",
                    dataType: "String",
                    title: "规格",
                    editable: false
                },
                {
                    field: "goodsModel",
                    dataType: "String",
                    title: "型号",
                    editable: false
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位",
                    editable: false
                },
                    {
                        field: "goodsSelection",
                        dataType: "String",
                        title: "商品选配",
                        renderType: "goodsOpt",
                        editable: false,
                    },
                {
                    field: "inventoryStateId",
                    dataType: "String",
                    title: "库存状态",
                    editable: true,
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "inventoryStateName",
                    editOptions: {
                        "validType": "string"
                    }
                },
                {
                    field: "batchNumId",
                    dataType: "String",
                    title: "批次号",
                    editable: true,
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "batchNumCode",
                    editOptions: {
                        "validType": "string"
                    }
                },
                {
                    field: "adjustNum",
                    dataType: "Integer",
                    title: "数量",
                    editType:"integer",
                    required: true,
                    editable: true
                },
                {
                    field: "adjustTime",
                    dataType: "Date",
                    editType:"date",
                    title: "调整日期",
                    required: true,
                    editable: true
                },
                {
                    field: "goodsPositionOutId",
                    dataType: "String",
                    title: "转出货位",
                    renderType: "ncReferRender",
                    editable: true,
                    editType: "ncReferEditType",
                    showField: "goodsPositionOutName",
                    editOptions: {
                        "validType": "string"
                    }
                },
                
                {
                    field: "goodsPositionInId",
                    dataType: "String",
                    title: "转入货位",
                    renderType: "ncReferRender",
                    editable: true,
                    editType: "ncReferEditType",
                    showField: "goodsPositionInName",
                    editOptions: {
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
                            "validType": "string",
                            rel: {
                                refpk: "projectId",
                                refname: "projectName"
                            }
                        },
                        "editable": true,
                        "visible": false,
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
                        "field": "customerId",
                        "dataType": "String",
                        "title": "客户",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "customerName",
                        "visible": false,
                        "editOptions": {
                            "validType": "string"
                        }
                    },
                {
                    field: "batchCodeId",
                    dataType: "String",
                    title: "批号",
                    editable: true,
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "batchCodeCode",
                    editOptions: {
                        "validType": "string"
                    }
                },
                // {
                //     field: "batchCodeCode",
                //     dataType: "String",
                //     title: "批号",
                //     editable: false
                // },
                ]
            },
            gridEditBom: {
            domid: "grid_transferItems_BomEdit",
            umeta: {
              id: "grid_transferItems_BomEdit",
              data: "BomItems",
              type: "grid",
              editable: true,
              multiSelect: true,
              showNumCol: false,
            },
            columns: [{
              field: "rowNum",
              dataType: "Integer",
              title: "行号",
              editable: false
            },
              {
                "field": "parentGoodsName",
                "dataType": "String",
                "title": "母件商品名称",
                "editable": false
              },
              {
                field: "goodsCode",
                dataType: "String",
                title: "商品编码",
                editable: false
              },
              {
                field: "goodsName",
                dataType: "String",
                title: "商品名称",
                editable: false
              },
              {
                field: "goodsVersion",
                dataType: "String",
                title: "商品版本",
                  editable: false
              },
              {
                field: "goodsSpecification",
                dataType: "String",
                title: "规格",
                editable: false
              },
              {
                field: "goodsModel",
                dataType: "String",
                title: "型号",
                editable: false
              },
              {
                field: "unitName",
                dataType: "String",
                title: "单位",
                editable: false
              },
              {
                field: "inventoryStateId",
                dataType: "String",
                title: "库存状态",
                renderType: "ncReferRender",
                editType: "ncReferEditType",
                showField: "inventoryStateName",
                editOptions: {
                  "validType": "string"
                },
                editable: false
              },
              {
                field: "batchNumId",
                dataType: "String",
                title: "批次号",
                renderType: "ncReferRender",
                editType: "ncReferEditType",
                showField: "batchNumCode",
                editOptions: {
                  "validType": "string"
                },
                editable: false
              },
              {
                field: "adjustNum",
                dataType: "Integer",
                title: "数量",
                editType:"integer",
                editable: false
              },
              {
                field: "adjustTime",
                dataType: "Date",
                editType:"date",
                title: "调整日期",
                editable: false
              },
              {
                field: "goodsPositionOutId",
                dataType: "String",
                title: "转出货位",
                renderType: "ncReferRender",
                editType: "ncReferEditType",
                showField: "goodsPositionOutName",
                editOptions: {
                  "validType": "string"
                },
                editable: false
              },

              {
                field: "goodsPositionInId",
                dataType: "String",
                title: "转入货位",
                renderType: "ncReferRender",
                editType: "ncReferEditType",
                showField: "goodsPositionInName",
                editOptions: {
                  "validType": "string"
                },
                editable: false
              },
              {
                field: "projectName",
                dataType: "String",
                title: "项目",
                editable: false
              },
              {
                field: "supplierName",
                dataType: "String",
                title: "供应商",
                editable: false
              },
              {
                field: "customerName",
                dataType: "String",
                title: "客户",
                editable: false
              },
              {
                field: "batchCodeId",
                dataType: "String",
                title: "批号",
                  editable: false,
                renderType: "ncReferRender",
                editType: "ncReferEditType",
                showField: "batchCodeCode",
                editOptions: {
                  "validType": "string"
                }
              },

            ]
          },

            gridDetailGood: {
                domid: "grid_transferItems_GoodDetail",
                umeta: {
                    id: "grid_transferItems_GoodDetail",
                    data: "transferItems",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: false
                },
                columns:[{
                    field: "rowNum",
                    dataType: "Integer",
                    title: "行号",
                    editable: false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码",
                    editable: false,
                    required: true
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false,
                    required: true
                },
                {
                    field: "goodsVersion",
                    dataType: "String",
                    title: "商品版本",
                    required: true
                },
                {
                    field: "goodsSpecification",
                    dataType: "String",
                    title: "规格",
                    required: true
                },
                {
                    field: "goodsModel",
                    dataType: "String",
                    title: "型号",
                    required: true
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位",
                    editable: false
                },
                    {
                        field: "goodsSelection",
                        dataType: "String",
                        title: "商品选配",
                        renderType: "goodsOptDetails",
                        editable: false,
                    },
                {
                    field: "inventoryStateName",
                    dataType: "String",
                    title: "库存状态",
                    editable: false
                },
                {
                    field: "batchNumCode",
                    dataType: "String",
                    title: "批次号",
                    editable: false
                },
                // {
                //     field: "batchNumId",
                //     dataType: "String",
                //     title: "批次号",
                //     renderType: "ncReferRender",
                //     editType: "ncReferEditType",
                //     showField: "batchNumCode",
                //     editOptions: {
                //         "validType": "string"
                //     }
                // },
                {
                    field: "adjustNum",
                    dataType: "Integer",
                    title: "数量",
                    editable: false
                },
                {
                    field: "adjustTime",
                    dataType: "Date",
                    title: "调整日期",
                    editable: false
                },
                {
                    field: "goodsPositionInName",
                    dataType: "String",
                    title: "转入货位",
                    editable: false
                },
                {
                    field: "goodsPositionOutName",
                    dataType: "String",
                    title: "转出货位",
                    editable: false
                },
                // {
                //     field: "goodsPositionInId",
                //     dataType: "String",
                //     title: "转出货位",
                //     renderType: "ncReferRender",
                //     editType: "ncReferEditType",
                //     showField: "goodsPositionName",
                //     editOptions: {
                //         "validType": "string"
                //     }
                // },
                // {
                //     field: "goodsPositionOutId",
                //     dataType: "String",
                //     title: "转入货位",
                //     renderType: "ncReferRender",
                //     editType: "ncReferEditType",
                //     showField: "goodsPositionName",
                //     editOptions: {
                //         "validType": "string"
                //     }
                // },
                {
                    field: "projectName",
                    dataType: "String",
                    title: "项目",
                    editable: false
                },
                {
                    field: "supplierName",
                    dataType: "String",
                    title: "供应商",
                    editable: false
                },
                {
                    field: "customerName",
                    dataType: "String",
                    title: "客户",
                    editable: false
                },
                {
                    field: "batchCodeCode",
                    dataType: "String",
                    title: "批号",
                    editable: false
                },
                ]
            },
            gridDetailBom: {
            domid: "grid_transferItems_BomDetail",
            umeta: {
              id: "grid_transferItems_BomDetail",
              data: "BomItems",
              type: "grid",
              editable: false,
              multiSelect: false,
              showNumCol: false
            },
            columns:[{
              field: "rowNum",
              dataType: "Integer",
              title: "行号",
              editable: false
            },
              {
                "field": "parentGoodsName",
                "dataType": "String",
                "title": "母件商品名称",
                "editable": false
              },
              {
                field: "goodsCode",
                dataType: "String",
                title: "商品编码",
                editable: false,
                required: true
              },
              {
                field: "goodsName",
                dataType: "String",
                title: "商品名称",
                editable: false,
                required: true
              },
              {
                field: "goodsVersion",
                dataType: "String",
                title: "商品版本",
                required: true
              },
              {
                field: "goodsSpecification",
                dataType: "String",
                title: "规格",
                required: true
              },
              {
                field: "goodsModel",
                dataType: "String",
                title: "型号",
                required: true
              },
              {
                field: "unitName",
                dataType: "String",
                title: "单位",
                editable: false
              },
              {
                field: "inventoryStateName",
                dataType: "String",
                title: "库存状态",
                editable: false
              },
              {
                field: "batchNumCode",
                dataType: "String",
                title: "批次号",
                editable: false
              },
              // {
              //     field: "batchNumId",
              //     dataType: "String",
              //     title: "批次号",
              //     renderType: "ncReferRender",
              //     editType: "ncReferEditType",
              //     showField: "batchNumCode",
              //     editOptions: {
              //         "validType": "string"
              //     }
              // },
              {
                field: "adjustNum",
                dataType: "Integer",
                title: "数量",
                editable: false
              },
              {
                field: "adjustTime",
                dataType: "Date",
                title: "调整日期",
                editable: false
              },
              {
                field: "goodsPositionInName",
                dataType: "String",
                title: "转入货位",
                editable: false
              },
              {
                field: "goodsPositionOutName",
                dataType: "String",
                title: "转出货位",
                editable: false
              },
              // {
              //     field: "goodsPositionInId",
              //     dataType: "String",
              //     title: "转出货位",
              //     renderType: "ncReferRender",
              //     editType: "ncReferEditType",
              //     showField: "goodsPositionName",
              //     editOptions: {
              //         "validType": "string"
              //     }
              // },
              // {
              //     field: "goodsPositionOutId",
              //     dataType: "String",
              //     title: "转入货位",
              //     renderType: "ncReferRender",
              //     editType: "ncReferEditType",
              //     showField: "goodsPositionName",
              //     editOptions: {
              //         "validType": "string"
              //     }
              // },
              {
                field: "projectName",
                dataType: "String",
                title: "项目",
                editable: false
              },
              {
                field: "supplierName",
                dataType: "String",
                title: "供应商",
                editable: false
              },
              {
                field: "customerName",
                dataType: "String",
                title: "客户",
                editable: false
              },
              {
                field: "batchCodeCode",
                dataType: "String",
                title: "批号",
              },
            ]
          },
        },
        details: {
            detail: [{
                key: "billCode",
                label: "单据号"
            },
            {
                key: "billDate",
                label: "单据日期",
                computed: "billDateComputed"
            },
            {
                key: "pkOrgName",
                label: "库存组织"
            },
            {
                key: "storageName",
                label: "仓库"
            },
            {
                key: "personName",
                label: "库管员"
            },
            {
                key: "state",
                label: "单据状态",
                computed:"state"
            },
            {
                key: "note",
                label: "备注",
                cls: "ui-textarea-item"
            }
            ]
        }
    };
    return new basemodel(model);
});