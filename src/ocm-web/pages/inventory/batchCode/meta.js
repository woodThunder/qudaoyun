define(['ocm_basemodel'], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            batchList: {
                params: {},
                meta: {
                    id: {
                        type: 'string'
                    },
                    goodsId: {
                        type: 'string',
                        required: true
                    }, //商品
                    goodsCode: {
                        type: 'string'
                    },
                    goodsName: {
                        type: 'string'
                    },
                    batchCode: {
                        type: 'string',
                        maxLength: '40',
                        required: true
                    }, //批号
                    approvalNumber: {
                        type: 'string',
                        maxLength: '40'
                    }, //批准文号
                    registrationNumber: {
                        type: 'string',
                        maxLength: '40'
                    }, //注册证号
                    productionDate: {
                        type: 'date',
                        required: true
                    }, //生产日期
                    invalidDate: {
                        type: 'date'
                    }, //失效日期
                    note: {
                        type: 'string',
                        maxLength: '200'
                    }, //备注
                    isEnable: {
                        type: 'integer',
                        default: '0'
                    }, //是否启用
                    outerPackingId: {
                        type: 'string'
                    }, //外包装
                    outerPackingCode: {
                        type: 'string'
                    },
                    outerPackingName: {
                        type: 'string'
                    },
                    mediumPackingId: {
                        type: 'string'
                    }, //中包装
                    mediumPackingCode: {
                        type: 'string'
                    },
                    mediumPackingName: {
                        type: 'string'
                    },
                    internalPackingId: {
                        type: 'string'
                    }, //内包装
                    internalPackingCode: {
                        type: 'string'
                    }, 
                    internalPackingName: {
                        type: 'string'
                    }, 
                    dismantlingPackingId:{
                        type: 'string'
                    },//拆零包装
                    dismantlingPackingCode:{
                        type: 'string'
                    },
                    dismantlingPackingName:{
                        type: 'string'
                    },
                    outerSpecification: {
                        type: 'float'
                    }, //外包装规格
                    mediumSpecification: {
                        type: 'float'
                    }, //中包装规格
                    internalSpecification: {
                        type: 'float'
                    }, //内包装规格
                },
                pageSize: 10
            },
        },
        buttons: {
            buttonSource: [
                {
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "beforeEdit"
                },
                {
                    key: 'del',
                    label: '删除',
                    iconCls: 'icon-shanchu1',
                    click: 'del'
                },
                {
                    key: "enable",
                    label: "启用",
                    iconCls: "icon-qiyong",
                    click: "enable"
                },
                {
                    key: "disable",
                    label: "停用",
                    iconCls: "icon-tingyong",
                    click: "disable"
                }
            ]
        },
        searchs: {
            search: [
                {
                    type: 'text',
                    key: 'batchCode',
                    label: '项目追踪号号'
                },
                {
                    type: 'text',
                    key: 'firstBillCode',
                    label: '起始单据号'
                },
                {
                    type: 'text',
                    key: 'firstBillBnum',
                    label: '起始单据行号'
                },
                {
                    type: "refer",
                    key: "firstBillType",
                    label: "起始单据类型",
                    refinfo: "billtype",
                    refName: '起始单据类型'
                },
                {
                    type: "refer",
                    key: "firstTranType",
                    label: "起始交易类型",
                    refinfo: "trantype",
                    refName: '起始交易类型'
                },
                // {
                //     type: "refer",
                //     key: "goods",
                //     label: "商品",
                //     refinfo: "goods",
                //     refName: '商品'
                // },
                // {
                //     type: 'daterange',
                //     key: 'productionDate',
                //     label: '生产日期'
                // },
                // {
                //     type: 'daterange',
                //     key: 'invalidDate',
                //     label: '失效日期'
                // }
            ]
        },
        dialogs: {
            dialog: [{
                    type: 'text',
                    key: 'batchCode',
                    label: '产品批号'
                }
            ]
        },
        grids: {
            grid: {
                domid: "batchCode",
                umeta: {
                    id: "grid_batchCode",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码",
                        visible: false
                    },
                    {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称",
                        visible: false
                    },
                    {
                        field: "batchCode",
                        dataType: "String",
                        title: "项目追踪号"
                    },
                    {
                        field: "approvalNumber",
                        dataType: "String",
                        title: "批准文号",
                        visible: false
                    },
                    {
                        field: "registrationNumber",
                        dataType: "String",
                        title: "注册证号",
                        visible: false
                    },
                    {
                        field: "productionDate",
                        dataType: "Date",
                        title: "生产日期",
                        visible: false
                    },
                    {
                        field: "invalidDate",
                        dataType: "Date",
                        title: "失效日期",
                        visible: false
                    },
                    {
                        field: "outerPackingName",
                        dataType: "String",
                        title: "外包装",
                        visible: false
                    },
                    {
                        field: "mediumPackingName",
                        dataType: "String",
                        title: "中包装",
                        visible: false
                    },
                    {
                        field: "internalPackingName",
                        dataType: "String",
                        title: "内包装",
                        visible: false
                    },
                    {
                        field: "dismantlingPackingName",
                        dataType: "String",
                        title: "拆零包装",
                        visible: false
                    },
                    {
                        field: "outerSpecification",
                        dataType: "Float",
                        title: "外包装规格",
                        visible: false
                    },
                    {
                        field: "mediumSpecification",
                        dataType: "Float",
                        title: "中包装规格",
                        visible: false
                    },
                    {
                        field: "internalSpecification",
                        dataType: "Float",
                        title: "内包装规格",
                        visible: false
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
                        renderType: "enableRender",
                        visible: false
                    },
                    {
                        field: "note",
                        dataType: "String",
                        title: "备注",
                        visible: false
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
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    },
                ]
            }
        }
    };

    return new basemodel(model);
});